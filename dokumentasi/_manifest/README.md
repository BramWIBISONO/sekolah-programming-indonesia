# Manifest dokumentasi galeri

Folder ini dibuat otomatis. Foto asli tidak diubah atau dihapus.

Folder sumber (CLASS, COMPETITION, pameran, dst.) sekarang ada di `dokumentasi/_sumber_asli/`. Foto yang sudah dikelompokkan ada di folder bernomor. Kolom `original_folder` di `migration_manifest.csv` masih menyebut nama folder lama, jadi cari di `_sumber_asli/`.

## Hasil migrasi (salin, bukan pindah)

- `migration_manifest.csv`: 404 baris, satu per file sumber.
  - `status = copied`: 393 file disalin ke struktur final dan hash SHA-256 salinannya dicocokkan dengan sumber.
  - `status = duplicate_not_copied`: 11 file yang isinya persis sama dengan file lain. Kolom `duplicate_of` menunjuk ke salinan yang dipakai.
- `_web/`: turunan WebP (1600 px dan thumbnail 640 px) untuk 45 kandidat. Folder ini tidak ikut deploy. Isinya dipindahkan ke `public/assets/gallery` hanya lewat `scripts/gallery_pipeline.py publish`, dan hanya untuk entri berstatus `published`.

## Pemetaan sumber ke struktur final

| Folder sumber | Tujuan | Catatan |
|---|---|---|
| CLASS | 01_Learning_Experience/Classroom_Process | Foto kelompok sesudah kelas belum dipisah ke Student_Group_Photos. Perlu tinjauan manual. |
| COMPETITION | 02_Competitions_Achievements/Competition_Process | |
| COMPETITION (`achievement-*`, `steam-2025-*`) | 02_Competitions_Achievements/Winners_Awards | Hanya 3 file. Bukan bukti kemenangan sampai diverifikasi. |
| SPI INSCHOOL | 03_School_Partnerships/SPI_InSchool | Program belum diverifikasi per foto. |
| INNOVATION FESTIVAL | 04_Innovation_Projects/Innovation_Festival | Foto proyek siswa belum dipisah ke Student_Projects. |
| COMMUNITY AND FELLOWSHIP | 05_Events_Community/Community_Fellowship | |
| pameran | 05_Events_Community/Mall_Exhibitions | Lokasi per foto belum diverifikasi. |
| webinar | 06_Webinars_Online/Webinars | |

## Status publikasi

Semua 45 kandidat berstatus `review` dan `consent_status = unknown`. Foto memuat anak-anak, jadi publikasi menunggu tinjauan izin dari SPI.

Untuk menampilkan foto:
1. Ubah `publication_status` menjadi `published` di `src/data/gallery-manifest.ts`.
2. Jalankan `python scripts/gallery_pipeline.py publish`.

Untuk mengembalikan ke review, ubah statusnya lagi dan jalankan `publish` lagi. Turunan yang tidak lagi `published` dihapus dari `public/`.
