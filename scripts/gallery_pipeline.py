"""Pipeline galeri dokumentasi SPI.

  python scripts/gallery_pipeline.py build
      Membuat turunan WebP (dengan watermark logo SPI) untuk kandidat di dokumentasi/_web
      (tidak ikut deploy), dan menulis src/data/gallery-manifest.ts. Path sumber tidak ditulis ke manifest.
      Status publikasi dan nama acak (token) yang sudah ada dipertahankan.
      Foto HEIC/HEIF didekode langsung, jadi tidak perlu dikonversi manual.

  python scripts/gallery_pipeline.py publish
      Menyalin turunan hanya untuk entri berstatus "published" ke public/assets/gallery.
      Turunan yang statusnya bukan lagi "published" dihapus dari public/.

Foto asli di dokumentasi/ tidak pernah diubah.
Sebelum publish: ubah publication_status dari "review" ke "published" di gallery-manifest.ts
setelah persetujuan (termasuk izin/consent orang tua untuk foto yang memuat anak).

Catatan: watermark dan nama acak hanya menghambat penyalinan biasa. Tidak bisa mencegah
screenshot atau pengambilan lewat alat pengembang browser.
"""
import csv
import json
import secrets
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:  # HEIC tidak bisa dibaca tanpa pillow-heif (pip install pillow-heif)
    pillow_heif = None

REPO = Path(__file__).resolve().parent.parent
DOK = REPO / "dokumentasi"
MIGRATION_CSV = DOK / "_manifest" / "migration_manifest.csv"
WEB_REVIEW = DOK / "_web"
PUBLIC_GALLERY = REPO / "public" / "assets" / "gallery"
DATA_FILE = REPO / "src" / "data" / "gallery-manifest.ts"
LOGO = REPO / "public" / "assets" / "brand" / "spi-logo-header.webp"

LONG_EDGE = 1600
THUMB_EDGE = 640
IMAGE_EXT = {".jpg", ".jpeg", ".png"}
HEIF_EXT = {".heic", ".heif"}

# Judul album untuk teks alt/caption. Hanya deskripsi folder yang bisa diverifikasi dari nama album.
ALBUM_LABELS = {
    "Classroom_Process": "Proses belajar di kelas",
    "Competition_Process": "Persiapan dan suasana kompetisi",
    "Winners_Awards": "Penghargaan dan prestasi",
    "SPI_InSchool": "Kegiatan SPI InSchool",
    "Innovation_Festival": "Innovation Festival",
    "Community_Fellowship": "Komunitas dan fellowship",
    "Mall_Exhibitions": "Pameran dan booth teknologi",
    "Webinars": "Webinar",
}

# Urutan tampil: competition dulu, lalu InSchool, kelas, foto bersama, lalu sisanya. Selfie di akhir.
ALBUM_RANK = {
    "Competition_Process": 1,
    "Winners_Awards": 2,
    "SPI_InSchool": 3,
    "Classroom_Process": 4,
    "Community_Fellowship": 5,
    "Innovation_Festival": 6,
    "Mall_Exhibitions": 7,
    "Webinars": 8,
}
SELFIE_RANK = 9
# Nomor urut (sequence di migration_manifest.csv) foto selfie di COMMUNITY AND FELLOWSHIP, hasil tinjauan visual.
COMMUNITY_SELFIE_SEQ = {10, 16, 21, 37, 38, 39, 40, 64, 71, 72}


def album_slug(album):
    return album.lower().replace("_", "-")


def read_manifest():
    """Membaca manifest dari file TypeScript: isinya objek JSON di antara 'export const ... =' dan ';'."""
    text = DATA_FILE.read_text(encoding="utf-8")
    return json.loads(text[text.index("{"): text.rindex("}") + 1])


def load_existing():
    """Status publikasi dan token acak per id, supaya build ulang tidak mengubah keputusan yang sudah ada."""
    if not DATA_FILE.exists():
        return {}
    return {e["id"]: e for e in read_manifest()["photos"]}


def watermark(im):
    """Menempelkan logo SPI di pojok kanan bawah pada chip putih. Dibakar ke piksel, jadi ikut tersimpan."""
    base = im.convert("RGBA")
    logo = Image.open(LOGO).convert("RGBA")
    chip_w = max(96, int(base.width * 0.2))
    logo_w = int(chip_w * 0.8)
    logo_h = int(logo.height * logo_w / logo.width)
    logo = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    pad = int(chip_w * 0.1)
    chip = Image.new("RGBA", (logo_w + 2 * pad, logo_h + 2 * pad), (0, 0, 0, 0))
    ImageDraw.Draw(chip).rounded_rectangle(
        [0, 0, chip.width - 1, chip.height - 1], radius=int(pad * 1.4), fill=(255, 255, 255, 228)
    )
    chip.alpha_composite(logo, (pad, pad))
    margin = int(base.width * 0.025)
    base.alpha_composite(chip, (base.width - chip.width - margin, base.height - chip.height - margin))
    return base.convert("RGB")


def open_oriented(path):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if im.mode == "RGB":
        return im
    if im.mode in ("RGBA", "LA", "P"):
        rgba = im.convert("RGBA")
        bg = Image.new("RGB", rgba.size, (255, 255, 255))
        bg.paste(rgba, mask=rgba.split()[-1])
        return bg
    return im.convert("RGB")


def build():
    if not MIGRATION_CSV.exists():
        raise SystemExit(f"Manifest migrasi belum ada: {MIGRATION_CSV}")
    with open(MIGRATION_CSV, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    if pillow_heif is None and any(Path(r["final_path"]).suffix.lower() in HEIF_EXT for r in rows):
        raise SystemExit("Ada foto HEIC, install dulu: python -m pip install pillow-heif")

    # Semua foto yang disalin ikut (video dilewati; duplikat persis tidak disalin sejak awal)
    candidates = [
        r for r in rows
        if r["status"] == "copied" and Path(r["final_path"]).suffix.lower() in IMAGE_EXT | HEIF_EXT
    ]

    existing = load_existing()
    shutil.rmtree(WEB_REVIEW, ignore_errors=True)
    WEB_REVIEW.mkdir(parents=True, exist_ok=True)

    photos = []
    for r in candidates:
        album = r["album"]
        seq = int(r["sequence"])
        pid = f"{album_slug(album)}-{seq:03d}"
        selfie = album == "Community_Fellowship" and seq in COMMUNITY_SELFIE_SEQ
        rank = SELFIE_RANK if selfie else ALBUM_RANK[album]
        prev = existing.get(pid, {})
        token = prev.get("token") or secrets.token_hex(8)

        im = open_oriented(DOK / r["final_path"])
        width, height = im.size

        full = im.copy()
        full.thumbnail((LONG_EDGE, LONG_EDGE), Image.Resampling.LANCZOS)
        full = watermark(full)
        full.save(WEB_REVIEW / f"{token}.webp", "WEBP", quality=82, method=6)

        thumb = full.copy()
        thumb.thumbnail((THUMB_EDGE, THUMB_EDGE), Image.Resampling.LANCZOS)
        thumb.save(WEB_REVIEW / f"{token}-thumb.webp", "WEBP", quality=80, method=6)

        orientation = "landscape" if width > height else "portrait" if width < height else "square"
        photos.append({
            "id": pid,
            "token": token,
            "category": r["category"],
            "album": album,
            "src": f"/assets/gallery/{token}.webp",
            "thumb": f"/assets/gallery/{token}-thumb.webp",
            "alt": f"Foto {ALBUM_LABELS[album].lower()} di Sekolah Programming Indonesia",
            "caption": ALBUM_LABELS[album],
            "width": width,
            "height": height,
            "orientation": orientation,
            "featured": r["is_cover_candidate"] == "yes",
            "order": rank * 1000 + seq,
            "section": "community-selfie" if selfie else album_slug(album),
            "section_title": "Momen selfie komunitas" if selfie else ALBUM_LABELS[album],
            "selfie": selfie,
            "publication_status": prev.get("publication_status", "review"),
            "consent_status": "unknown",
        })

    body = json.dumps({"photos": photos}, ensure_ascii=False, indent=2)
    DATA_FILE.write_text(
        "// Dibuat oleh scripts/gallery_pipeline.py. Ubah publication_status di sini, lalu jalankan publish.\n"
        f"export const GALLERY_MANIFEST = {body};\n",
        encoding="utf-8",
    )
    heic = sum(1 for p in candidates if Path(p["final_path"]).suffix.lower() in HEIF_EXT)
    print(f"Kandidat: {len(photos)} foto (termasuk {heic} HEIC) -> {WEB_REVIEW}")
    print(f"Manifest: {DATA_FILE}")


def publish():
    published = [p for p in read_manifest()["photos"] if p["publication_status"] == "published"]
    wanted = set()

    for p in published:
        for key in ("src", "thumb"):
            rel = p[key].removeprefix("/assets/gallery/")
            source = WEB_REVIEW / rel
            if not source.exists():
                raise SystemExit(f"Turunan tidak ada, jalankan build dulu: {source}")
            target = PUBLIC_GALLERY / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(source.read_bytes())
            if target.stat().st_size != source.stat().st_size:
                raise SystemExit(f"Ukuran tidak cocok: {target}")
            wanted.add(target.resolve())

    # hapus turunan yang sudah tidak berstatus published
    removed = 0
    if PUBLIC_GALLERY.exists():
        for f in PUBLIC_GALLERY.rglob("*.webp"):
            if f.resolve() not in wanted:
                f.unlink()
                removed += 1

    print(f"Dipublikasikan: {len(published)} foto | dihapus dari public: {removed}")


if __name__ == "__main__":
    if len(sys.argv) != 2 or sys.argv[1] not in ("build", "publish"):
        raise SystemExit(__doc__)
    build() if sys.argv[1] == "build" else publish()
