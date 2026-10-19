# Pendaftaran Gerakan AI Literacy Indonesia: panduan deploy

Website mengirim pendaftaran ke sebuah **Google Apps Script Web App**. Script ini menulis ke worksheet **AI Literacy** di spreadsheet yang sudah ada, membatasi pendaftaran sampai 300 peserta, dan mencegah email ganda.

File: `apps-script/ai-literacy-registration.gs`

## Yang perlu disiapkan

- Akses edit ke spreadsheet pendaftaran (ID `1E4vP3G_pCZ6kROdmfJ0jkVenNLxoEA5uUdJysVqSlpo`). Script akan berjalan di akun Google yang melakukan deploy, jadi gunakan akun SPI yang berhak mengedit spreadsheet itu.
- Link undangan grup WhatsApp dari admin SPI. Link ini **tidak** ditulis di kode. Anda akan memasukkannya di langkah 4.

## 1. Pasang script

1. Buka spreadsheet pendaftaran, lalu pilih **Extensions > Apps Script**.
2. Hapus isi file default, lalu tempel seluruh isi `ai-literacy-registration.gs`. Simpan.
3. Di dropdown fungsi, pilih `setupSheet`, lalu klik **Run**. Berikan izin akses saat diminta.
   - Jika worksheet `AI Literacy` belum ada, script membuatnya dengan baris header.
   - Jika sudah ada, header yang kurang ditambahkan di kolom paling kanan. Tidak ada baris yang dihapus atau dipindahkan.
   - Worksheet lain tidak disentuh.
   - Jika worksheet `AI Literacy` sudah ada dengan data lama, pastikan kolom email bernama **Email** dan kolom status (jika ada) bernama **Status Pendaftaran**. Baris lama yang memakai nama kolom lain tidak akan terhitung dalam kuota.

## 2. Deploy sebagai Web App

1. **Deploy > New deployment**, pilih tipe **Web app**.
2. *Execute as*: **Me**.
3. *Who has access*: **Anyone**. Ini diperlukan agar website bisa mengirim pendaftaran. Data tidak bisa dibaca dari URL ini.
4. Klik **Deploy**, lalu salin **Web app URL** (berakhiran `/exec`).

Setiap kali script diubah, buat deployment baru atau kelola versi deployment. Jika tidak, website tetap memakai versi lama.

## 3. Hubungkan website

Di Vercel (Project Settings > Environment Variables), tambahkan:

```
VITE_AI_LITERACY_API_URL = <Web app URL dari langkah 2>
```

Lalu deploy ulang website. Variabel ini dibaca saat build, jadi perubahan tidak berlaku sebelum build ulang.

## 4. Pengaturan admin (Script properties)

Di Apps Script: **Project Settings > Script Properties > Add script property**.

| Property | Nilai | Keterangan |
| --- | --- | --- |
| `WA_GROUP_URL` | `https://chat.whatsapp.com/...` | Link grup. Hanya dikirim setelah pendaftaran berhasil. Bisa juga diatur dengan `aturLinkWhatsAppGroup(url)`. |
| `CAPACITY` | `300` | Opsional. Jika kosong, nilainya 300. Bisa juga diatur dengan `aturKapasitas(n)`. |
| `REGISTRATION_OPEN` | `true` atau `false` | Opsional. Jika kosong, pendaftaran dibuka. |

Untuk membuka atau menutup pendaftaran, jalankan dari editor: `bukaPendaftaran()` atau `tutupPendaftaran()`. Data pendaftar yang sudah ada tidak berubah saat pendaftaran ditutup.

## Aturan yang ditegakkan di server

- **Kuota 300.** Pemeriksaan kuota dan penulisan baris berjalan di dalam satu kunci skrip (`LockService`). Dua permintaan bersamaan untuk slot terakhir tidak bisa keduanya lolos.
- **Satu email, satu pendaftaran.** Email dinormalisasi dengan huruf kecil dan spasi di pinggir dihapus. Titik dan `+tag` tidak digabung, supaya dua alamat yang berbeda tidak dianggap sama.
- **Hanya yang berhasil disimpan yang dihitung.** Upaya yang ditolak tidak ditulis ke spreadsheet. Baris dengan status `Dibatalkan` atau `Ditolak` tidak memakai kuota.
- **Sukses hanya setelah tersimpan.** Website menampilkan pendaftaran berhasil hanya jika server membalas `ok: true` setelah baris ditulis dan di-flush.
- **Nilai dari pengunjung disanitasi.** Teks yang diawali `=`, `+`, `-`, atau `@` diberi awalan `'` supaya tidak dijalankan sebagai rumus.
- **Honeypot.** Kolom tersembunyi yang tidak diisi manusia. Jika terisi, pendaftaran ditolak tanpa disimpan.

## Uji sebelum dibuka untuk publik

Jangan uji dengan data pendaftar sungguhan di spreadsheet utama.

1. Buat salinan spreadsheet (**File > Make a copy**), lalu deploy script di salinan itu sebagai Web App terpisah.
2. Arahkan `VITE_AI_LITERACY_API_URL` ke URL salinan saat menguji di lokal, lalu kembalikan ke URL asli sebelum rilis.
3. Uji: pendaftaran baru, email yang sama dikirim dua kali, form dengan kuota penuh (ubah `CAPACITY` ke angka kecil untuk menguji), dan pendaftaran saat `REGISTRATION_OPEN` = `false`.

## Yang belum bisa diverifikasi dari sisi website

- **Respons dari Web App harus bisa dibaca browser.** Website membaca JSON dari Apps Script dengan `fetch`. Perilaku CORS Apps Script perlu diuji langsung dari website yang sudah di-deploy. Jika respons tidak bisa dibaca, website menampilkan pesan gagal. Pendaftaran bisa saja tersimpan, jadi periksa worksheet sebelum menyebarkan link.
- **Dashboard admin di website belum dibuat.** Admin mengelola lewat Script properties dan fungsi di editor. Dashboard dengan login terpisah adalah pekerjaan berikutnya.
- **Spreadsheet asli belum dibaca oleh saya.** Script mencocokkan kolom berdasarkan nama header. Jika header di worksheet berbeda, kolom baru ditambahkan di kanan dan data lama tetap ada.
