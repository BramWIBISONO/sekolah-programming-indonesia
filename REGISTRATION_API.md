# Kontrak API Form Pendaftaran SPI

Website mengirim `POST` JSON saat form pendaftaran disubmit.

- **URL:** env `VITE_DS_API_URL` (default: `https://spidigitalsystem.com/api/register`)
- **Headers:** `Content-Type: application/json`, `Accept: application/json`, dan `Authorization: Bearer <VITE_DS_API_KEY>` bila env diisi
- **Sukses:** HTTP 2xx dengan body JSON. Selain itu dianggap gagal dan user diminta mencoba lagi.
- **CORS:** domain website harus diizinkan, termasuk preflight `OPTIONS`.

## Body

| Field | Tipe | Keterangan |
|---|---|---|
| `parent_name` | string | Nama lengkap orang tua |
| `student_name` | string | Nama lengkap siswa |
| `phone` | string | Sudah dinormalisasi ke `62xxxxxxxxxx` (input user bisa `08`, `62`, `+62`) |
| `birth_date` | string | `YYYY-MM-DD`, tidak boleh masa depan |
| `programming_experience` | string | `never`, `previously_learned`, `currently_learning` |
| `program_category` | string | Lihat daftar di bawah |
| `school` | string | Nama sekolah |
| `branch` | string | `jakarta_barat`, `jogja`, `solo`, `surabaya`, `malang` |
| `terms_accepted` | boolean | Selalu `true` (form tidak bisa dikirim kalau tidak dicentang) |
| `form_type` | string | `Pendaftaran Kelas SPI` atau `Free Trial Class` |

### `program_category`

- SPI Core: `spi_core_1_0`, `spi_core_1_1`, `spi_core_1_2`, `spi_core_2_0`, `spi_core_2_1`, `spi_core_2_2`, `spi_core_2_3`, `spi_core_2_4`, `spi_core_3_0`
- SPI Lab: `spi_lab_word`, `spi_lab_excel`, `spi_lab_powerpoint`, `spi_lab_ai_for_work`, `spi_lab_ai_for_learning`
- Lainnya: `consultation`

Label lengkap ada di `src/components/modals/registrationForm.ts`. Nilai `branch` perlu dicocokkan dengan ID cabang di Digital System.

## Contoh

```json
{
  "parent_name": "Budi Santoso",
  "student_name": "Rara Santoso",
  "phone": "6281234567890",
  "birth_date": "2014-05-20",
  "programming_experience": "never",
  "program_category": "spi_core_1_0",
  "school": "SDN 01 Jakarta",
  "branch": "jakarta_barat",
  "terms_accepted": true,
  "form_type": "Pendaftaran Kelas SPI"
}
```
