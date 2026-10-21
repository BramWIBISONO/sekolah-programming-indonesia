"""Ubah gambar PNG/JPG di public/assets menjadi WebP, lalu perbarui referensinya di kode.

  python scripts/images_to_webp.py

- Setiap PNG/JPG di public/assets dibuat versi .webp dengan nama yang sama (transparansi tetap).
  Dua file dengan nama dasar sama di satu folder (mis. x.jpg dan x.png) diberi akhiran ekstensi
  (x-jpg.webp, x-png.webp) supaya tidak saling menimpa.
- File aslinya dipindah ke asset-originals/ (di-ignore git), tidak lagi bisa diakses dari situs.
- File yang gagal dibaca dibiarkan di tempatnya, tidak dipindah, dan dicetak di akhir.
- JPG/PNG yang terpotong dipulihkan sebagian (sisa datanya dipakai) dan dicetak di akhir.
- Path di src/ dan index.html diganti ke .webp. Favicon (assets/brand/spi-logo) ikut diubah tipenya.
- Galeri (public/assets/gallery) tidak disentuh, karena sudah WebP.
- Aman dijalankan ulang: yang sudah dikonversi dilewati, pemetaan dibangun dari public/ dan asset-originals/.
"""
import re
import shutil
from pathlib import Path

from PIL import Image, ImageFile, ImageOps

REPO = Path(__file__).resolve().parent.parent
PUBLIC = REPO / "public"
ORIGINALS = REPO / "asset-originals"
SKIP_DIRS = {"gallery"}
RASTER = {".png", ".jpg", ".jpeg"}
MAX_EDGE = 2000
QUALITY = 85

CODE_GLOBS = ["src/**/*.ts", "src/**/*.tsx", "src/**/*.css", "index.html"]


def load_image(src: Path) -> tuple[Image.Image, bool]:
    """Buka gambar. Kalau datanya terpotong, sisa yang bisa dibaca tetap dipakai (flag True)."""
    try:
        with Image.open(src) as im:
            im.load()
            return im.copy(), False
    except OSError:
        ImageFile.LOAD_TRUNCATED_IMAGES = True
        try:
            with Image.open(src) as im:
                im.load()
                return im.copy(), True
        finally:
            ImageFile.LOAD_TRUNCATED_IMAGES = False


def to_webp(src: Path, dst: Path) -> bool:
    """Tulis dst sebagai WebP. Mengembalikan True kalau sumbernya terpotong."""
    im, truncated = load_image(src)
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        im = im.convert("RGBA")
    elif im.mode != "RGB":
        im = im.convert("RGB")
    im.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    try:
        im.save(dst, "WEBP", quality=QUALITY, method=6)
    except Exception:
        dst.unlink(missing_ok=True)
        raise
    return truncated


def find_sources() -> dict[Path, Path]:
    """Gambar raster per path relatif ke public/ -> lokasi sekarang (public/ atau asset-originals/)."""
    sources: dict[Path, Path] = {}
    for root in (PUBLIC, ORIGINALS):
        base = root / "assets"
        if not base.exists():
            continue
        for path in base.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in RASTER:
                continue
            rel = path.relative_to(root)
            if len(rel.parts) > 2 and rel.parts[1] in SKIP_DIRS:
                continue
            sources.setdefault(rel, path)
    return sources


def webp_names(sources: dict[Path, Path]) -> dict[Path, Path]:
    """Nama WebP per sumber. Kalau satu folder punya dua file dengan nama dasar sama, keduanya diberi akhiran ekstensi."""
    groups: dict[tuple[Path, str], int] = {}
    for rel in sources:
        key = (rel.parent, rel.stem)
        groups[key] = groups.get(key, 0) + 1
    names: dict[Path, Path] = {}
    for rel in sources:
        if groups[(rel.parent, rel.stem)] == 1:
            names[rel] = rel.with_suffix(".webp")
        else:
            names[rel] = rel.with_name(f"{rel.stem}-{rel.suffix.lstrip('.').lower()}.webp")
    return names


def fix_link_types(text: str) -> str:
    """Tag <link> yang mengarah ke .webp tapi masih bertipe PNG/JPG (favicon) dibetulkan tipenya."""
    def fix(match: re.Match[str]) -> str:
        tag = match.group(0)
        if ".webp" not in tag:
            return tag
        return re.sub(r'type="image/(png|jpe?g)"', 'type="image/webp"', tag)

    return re.sub(r"<link\b[^>]*>", fix, text)


def rewrite_code(mapping: dict[str, str]) -> int:
    updated = 0
    paths = sorted({p for pattern in CODE_GLOBS for p in REPO.glob(pattern)})
    for path in paths:
        with open(path, encoding="utf-8", newline="") as f:
            text = f.read()
        new_text = text
        for old_rel, new_rel in mapping.items():
            new_text = new_text.replace(old_rel, new_rel)
        new_text = fix_link_types(new_text)
        if new_text != text:
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(new_text)
            updated += 1
    return updated


def main() -> None:
    sources = find_sources()
    names = webp_names(sources)
    mapping: dict[str, str] = {}
    moved = 0
    salvaged: list[str] = []
    failed: list[str] = []

    for rel in sorted(sources):
        current = sources[rel]
        dst = PUBLIC / names[rel]
        if not dst.exists():
            try:
                if to_webp(current, dst):
                    salvaged.append(rel.as_posix())
            except Exception as err:
                failed.append(f"{rel.as_posix()}: {err}")
                continue
        if current == PUBLIC / rel:
            target = ORIGINALS / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(current), str(target))
            moved += 1
        mapping[rel.as_posix()] = names[rel].as_posix()

    updated_files = rewrite_code(mapping)

    print(f"Dikonversi/dipindah: {len(mapping)} gambar ({moved} asli dipindah ke asset-originals/)")
    print(f"Referensi diperbarui di {updated_files} file")
    if salvaged:
        print(f"Terpotong, dipulihkan sebagian ({len(salvaged)}):")
        for item in salvaged:
            print(f"  - {item}")
    if failed:
        print(f"GAGAL, tetap di tempatnya dan tidak diubah ({len(failed)}):")
        for item in failed:
            print(f"  - {item}")


if __name__ == "__main__":
    main()
