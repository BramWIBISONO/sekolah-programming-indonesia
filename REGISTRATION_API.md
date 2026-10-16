# Kontrak API Class Registration → SPI_API

`ClassRegistrationSection.tsx` mengirim data melalui `src/utils/studentApplicantApi.ts`.

- **Base URL:** env `VITE_SPI_API_BASE_URL`, contoh lokal `http://localhost:8000/api/v1`. Nilai ini wajib diatur saat build production.
- **Daftar cabang:** `GET {baseUrl}/guest/branches?paginate=false`
- **Pendaftaran:** `POST {baseUrl}/student-applicant`
- **Headers:** `Content-Type: application/json` dan `Accept: application/json`
- **Sukses:** hanya HTTP 2xx yang menampilkan status berhasil.
- **Validasi gagal:** HTTP 422 dipetakan kembali ke field form.

## Body

| Field API | Isi dari form | Format |
|---|---|---|
| `first_name` | Nama Lengkap Siswa | string |
| `custom_guardian_full_name` | Nama Lengkap Orang Tua | string opsional |
| `student_mobile_number` | Nomor HP | string `62xxxxxxxxxx` (input user `08`, `62`, `+62` dinormalisasi) |
| `student_email_id` | Email Siswa | email opsional |
| `custom_school` | Sekolah | string |
| `date_of_birth` | Tanggal Lahir Siswa | `YYYY-MM-DD` |
| `custom_coding_status` | Pernah Belajar Programming | boolean |
| `program` | Minat Kategori Program | `Focus`, `Partner`, `Group`, atau `School` |
| `branch` | Cabang | nilai `endpoint` dari API daftar cabang |

## Contoh

```json
{
  "first_name": "Rara Santoso",
  "custom_guardian_full_name": "Budi Santoso",
  "student_mobile_number": "6281234567890",
  "student_email_id": null,
  "custom_school": "SDN 01 Jakarta",
  "date_of_birth": "2014-05-20",
  "custom_coding_status": false,
  "program": "Focus",
  "branch": "https://server-cabang.example.com"
}
```

## Field backend yang tidak ditampilkan

Request backend juga menerima `address_line_1`, `custom_email_guardian`,
`custom_info_from`, dan `custom_input_from` sebagai field opsional untuk request
guest. Form publik tidak meminta data tersebut karena belum dibutuhkan untuk tindak
lanjut pendaftaran.

Endpoint guest cabang hanya boleh mengembalikan data publik. `admin_key` tetap
disembunyikan, termasuk ketika request memakai `paginate=false`.
