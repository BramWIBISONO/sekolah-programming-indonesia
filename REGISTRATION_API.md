# Kontrak API Form Pendaftaran SPI → Digital System

Website mengirim `POST` JSON saat form pendaftaran disubmit (kode: `src/utils/dsApi.ts`).

- **URL:** env `VITE_DS_API_URL` (default sementara: `https://spidigitalsystem.com/api/register`, belum dikonfirmasi)
- **Headers:** `Content-Type: application/json`, `Accept: application/json`, dan `Authorization: Bearer <VITE_DS_API_KEY>` bila env diisi
- **Sukses:** HTTP 2xx. Selain itu dianggap gagal dan user diminta mencoba lagi.
- **CORS:** domain website harus diizinkan, termasuk preflight `OPTIONS`.

## Body

| Field DS | Isi dari form | Format |
|---|---|---|
| `first_name` | Nama Lengkap Siswa | string |
| `custom_guardian_full_name` | Nama Lengkap Orang Tua | string |
| `student_mobile_number` | Nomor HP | string `62xxxxxxxxxx` (input user `08`, `62`, `+62` dinormalisasi) |
| `custom_school` | Sekolah | string |
| `date_of_birth` | Tanggal Lahir Siswa | `YYYY-MM-DD` |
| `custom_coding_status` | Pernah Belajar Programming | label: `Belum Pernah`, `Pernah Belajar`, `Sedang Belajar` |
| `program` | Minat Kategori Program | label: `Focus`, `Partner`, `School` |
| `branch` | Cabang | label: `Jakarta Barat`, `Yogyakarta`, `Solo`, `Surabaya`, `Malang` |

## Contoh

```json
{
  "first_name": "Rara Santoso",
  "custom_guardian_full_name": "Budi Santoso",
  "student_mobile_number": "6281234567890",
  "custom_school": "SDN 01 Jakarta",
  "date_of_birth": "2014-05-20",
  "custom_coding_status": "Belum Pernah",
  "program": "Focus",
  "branch": "Jakarta Barat"
}
```

## Pertanyaan untuk tim DS

1. Endpoint dan metode autentikasi yang benar (Bearer token, atau format lain seperti `token key:secret`)?
2. `student_mobile_number` bertipe apa? Contoh JSON hanya menulis `8`. Apakah string `62812…`, angka, atau nomor tanpa `0`/`62`?
3. Nilai `custom_coding_status`, `program`, dan `branch` harus persis seperti apa? Website kirim label (di atas); kalau DS pakai kode/ID, kirim daftar pemetaannya.
