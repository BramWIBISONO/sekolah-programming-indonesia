# DESIGN.md

# Master Design, UX, Content, Brand, dan Website Strategy

## Sekolah Programming Indonesia (SPI)

**Dokumen induk untuk evaluasi, perancangan ulang, pengembangan, dan
optimasi website**\
**Website utama:** https://www.sekolahprogrammingindonesia.com/\
**Tanggal penyusunan:** 14 Oktober 2026\
**Bahasa utama dokumen:** Bahasa Indonesia\
**Status:** Master brief dan design specification untuk tim desain,
konten, marketing, product, dan engineering

------------------------------------------------------------------------

# 0. Cara Menggunakan Dokumen Ini

Dokumen ini menggabungkan seluruh temuan audit, masukan pihak lain,
rekomendasi strategi, pembandingan website referensi, struktur konten,
prinsip visual, UX, konversi, dan roadmap implementasi yang telah
dibahas.

Dokumen ini harus dipakai sebagai **sumber acuan utama** ketika
merancang atau memperbaiki website SPI. Jangan langsung melakukan
redesign tanpa audit terlebih dahulu terhadap implementasi yang sedang
berjalan.

## 0.1 Prinsip penting

1.  Pertahankan bagian, komponen, route, aset, animasi, data, dan
    business logic yang masih benar dan berfungsi. Jangan menghapus
    fitur hanya karena desainnya akan diperbarui.
2.  Bedakan dengan jelas:
    -   **KEEP:** sudah baik dan sebaiknya dipertahankan.
    -   **STRENGTHEN:** sudah ada, tetapi perlu diperjelas atau
        ditingkatkan.
    -   **FIX:** ada masalah akurasi, konsistensi, kredibilitas, atau
        usability.
    -   **ADD:** benar-benar belum ada dan memiliki alasan kuat untuk
        ditambahkan.
3.  Jangan menambahkan section hanya untuk membuat homepage terlihat
    panjang. Setiap section harus memiliki fungsi bagi pengguna dan
    mendukung tujuan bisnis.
4.  Jangan membuat klaim, statistik, testimoni, daftar cabang, logo
    mitra, pencapaian, sertifikasi, atau hasil belajar yang tidak dapat
    diverifikasi.
5.  Jangan mengisi kekosongan dengan placeholder yang terlihat oleh
    pengunjung. Jika materi belum tersedia, sembunyikan section tersebut
    atau tampilkan pesan yang jujur dan berguna.
6.  Jangan menganggap semua website referensi sebagai kompetitor
    langsung. Sebagian merupakan benchmark desain, pembelajaran,
    komunikasi, teknologi, atau kepercayaan.
7.  Website harus membuktikan diferensiasi SPI, bukan sekadar meniru
    desain sekolah coding lain.
8.  Jangan mengubah identitas inti SPI menjadi sekadar website kursus
    coding. SPI harus diposisikan sebagai tempat mengembangkan cara
    berpikir dan kemampuan menciptakan solusi dengan teknologi.
9.  Semua rekomendasi dalam dokumen ini perlu divalidasi terhadap
    website aktual, kondisi bisnis, kapasitas tim, dan data operasional.
10. Gunakan bahasa yang jelas bagi orang tua, siswa, sekolah, dan mitra.
    Istilah teknis dapat digunakan, tetapi perlu diterangkan dengan
    manfaat konkretnya.

## 0.2 Batasan dan status bukti audit awal

Audit yang menjadi dasar dokumen ini adalah audit awal terhadap
informasi dan konten yang dapat ditemukan, bukan audit menyeluruh
terhadap source code, analytics, performa aktual, semua ukuran layar,
atau semua interaksi.

Karena itu, bedakan status berikut saat mengimplementasikan:

-   **Terindikasi/teramati dari konten:** misalnya adanya teks
    placeholder atau konten yang berulang dalam hasil konten yang
    terindeks.
-   **Hipotesis UX/strategi:** dugaan tentang dampak pada pemahaman,
    kepercayaan, atau konversi yang perlu diuji.
-   **Belum diverifikasi:** perilaku tombol, formulir, tampilan
    responsif, performa, aksesibilitas, SEO teknis, data cabang, dan
    informasi yang bisa berubah.
-   **Perlu validasi operasional:** harga, jadwal, format kelas, daftar
    lokasi aktif, jumlah siswa, mitra, pencapaian, dan klaim promosi.

Jangan menuliskan skor audit awal sebagai skor teknis objektif. Skor
tersebut hanya penilaian awal pada konten dan struktur yang dapat
diamati.

------------------------------------------------------------------------

# 1. Ringkasan Eksekutif

## 1.1 Diagnosis utama

Masalah website SPI bukan hanya soal apakah desainnya modern atau
menarik. Tantangan utamanya adalah memastikan pengunjung memahami:

1.  Apa itu SPI dan apa yang membedakannya dari tempat kursus coding
    lain.
2.  Apa manfaat yang akan diperoleh siswa dan orang tua.
3.  Program mana yang sesuai dengan usia, kemampuan, dan tujuan belajar.
4.  Apa yang benar-benar dibuat dan dipelajari siswa.
5.  Mengapa orang tua atau sekolah layak mempercayai SPI.
6.  Apa langkah selanjutnya untuk mencoba kelas, mendaftar, atau
    menjalin kerja sama.

SPI memiliki positioning yang relevan dengan perkembangan teknologi,
terutama computational thinking dan generasi AI-native. Namun istilah
tersebut harus diterjemahkan menjadi manfaat dan bukti yang mudah
dipahami oleh pengunjung.

## 1.2 Prinsip positioning

**"A School of Thinking, with Coding as the Tool."**

SPI bukan sekadar tempat menghafal sintaks atau mengikuti tutorial.
Coding adalah alat untuk melatih cara berpikir, merancang solusi,
menguji ide, dan menciptakan karya.

Arah visi yang digunakan:

**"Developing Computational Thinking for the AI-Native Generation."**

Kerangka pembelajaran:

**Think → Build → Innovate**

Pesan utama yang direkomendasikan untuk hero homepage:

**"Bukan Sekadar Belajar Coding. Anak Belajar Menciptakan Teknologi."**

Subheadline yang disarankan:

"Bantu anak mengembangkan cara berpikir logis, memecahkan masalah, dan
membangun proyek nyata melalui programming dan teknologi AI."

CTA utama: - **Coba Kelas Gratis** - **Jelajahi Program**

CTA tambahan yang sesuai: - Lihat Karya Siswa - Konsultasi Program -
Kerja Sama dengan Sekolah

Semua CTA harus mengarah ke tujuan yang nyata, bukan sekadar dekorasi.

## 1.3 Urutan prioritas

### P0: Kepercayaan dan akurasi

-   Hapus atau ganti testimoni placeholder.
-   Periksa teks instruksi editorial yang tampil kepada publik.
-   Verifikasi nomor telepon, WhatsApp, email, alamat, lokasi, jadwal,
    klaim, dan mitra.
-   Periksa domain utama, redirect, canonical, serta konten yang
    terindeks.
-   Pastikan tombol dan formulir penting benar-benar berfungsi.

### P1: Positioning dan konversi

-   Perjelas headline dan manfaat SPI.
-   Bedakan SPI Core, SPI Lab, SPI Engineering, dan SPI InSchool.
-   Pisahkan alur untuk orang tua/siswa dan sekolah/mitra.
-   Jelaskan hasil belajar, proyek, roadmap, dan pengalaman Free Trial.
-   Kurangi pengulangan konten.

### P2: Sistem visual dan konten

-   Perkuat hierarki visual, konsistensi komponen, dan keterbacaan.
-   Bangun showcase proyek siswa.
-   Perjelas metode Think → Build → Innovate.
-   Tambahkan profil mentor dan metode pembelajaran yang dapat
    diverifikasi.
-   Perbaiki struktur FAQ, cerita orang tua, mitra, lokasi, dan event.

### P3: Validasi teknis dan optimasi

-   Audit responsivitas mobile.
-   Audit aksesibilitas.
-   Audit SEO teknis dan konten.
-   Ukur Core Web Vitals dan performa.
-   Uji funnel CTA, formulir, WhatsApp, dan analytics.
-   Jalankan A/B testing setelah masalah dasar dibereskan.

------------------------------------------------------------------------

# 2. Identitas, Visi, dan Arsitektur Produk SPI

## 2.1 Identitas inti

-   **Nama:** Sekolah Programming Indonesia (SPI)
-   **Kategori:** pendidikan nonformal, computational thinking,
    programming, dan literasi teknologi
-   **Visi komunikasi:** Developing Computational Thinking for the
    AI-Native Generation
-   **Positioning:** A School of Thinking, with Coding as the Tool
-   **Kerangka pembelajaran:** Think → Build → Innovate
-   **Arah pengalaman:** siswa memahami masalah, membangun solusi,
    menguji hasil, memperbaiki karya, dan menjelaskan apa yang telah
    dipelajari.

## 2.2 Empat produk utama

### SPI Core

**Peran:** fondasi utama computational thinking dan programming.

Halaman SPI Core harus menjawab: - Untuk siapa program ini? - Rentang
usia atau tingkat kemampuan apa yang cocok? - Konsep apa yang
dipelajari? - Bagaimana siswa berkembang dari aktivitas dasar menuju
proyek? - Contoh karya apa yang dapat dibuat? - Bagaimana proses
evaluasi dan kenaikan tahap? - Bagaimana orang tua dapat mencoba kelas?

Contoh arah konten: - Logika dan urutan instruksi. - Pola, dekomposisi,
dan pemecahan masalah. - Programming visual seperti Scratch atau mBlock
jika sesuai dengan kurikulum aktif. - Pembuatan proyek yang menunjukkan
pemahaman, bukan sekadar mengikuti instruksi.

Jangan menyatakan bahwa setiap materi berlaku untuk semua usia. Cocokkan
materi dengan kurikulum aktual.

### SPI Lab

**Peran:** eksplorasi keterampilan digital praktis untuk kebutuhan
sehari-hari, kreativitas, dan produktivitas.

Halaman SPI Lab perlu menjelaskan: - Masalah atau kebutuhan apa yang
dibantu oleh program ini? - Alat digital dan AI apa yang dipelajari? -
Bagaimana siswa atau peserta menerapkan teknologi secara bertanggung
jawab? - Apa output yang akan dibuat? - Bagaimana program ini berbeda
dari SPI Core dan SPI Engineering?

Jangan menjadikan daftar aplikasi sebagai satu-satunya nilai jual.
Jelaskan manfaat, alur kerja, dan karya akhir.

### SPI Engineering

**Peran:** jalur teknologi lanjutan dan pengembangan sistem.

Area yang dapat ditampilkan jika memang tersedia dalam kurikulum: -
Software engineering. - Python dan pengembangan aplikasi. - Data science
dan machine learning. - AI. - Robotics. - Internet of Things (IoT). -
Pengembangan proyek yang lebih kompleks.

Setiap halaman atau jalur harus menyatakan prasyarat, tingkat kesulitan,
kompetensi, proyek, dan hasil yang realistis. Jangan memberi kesan bahwa
semua peserta otomatis menguasai semua teknologi tersebut.

### SPI InSchool

**Peran:** program kemitraan dan implementasi teknologi untuk sekolah
formal.

Halaman SPI InSchool harus memiliki jalur konversi berbeda dari program
siswa perorangan.

Jelaskan: - Siapa yang dapat bekerja sama, misalnya sekolah atau
institusi pendidikan. - Jenis kolaborasi yang tersedia. - Apakah SPI
menawarkan program ekstrakurikuler, kurikulum, pelatihan guru, workshop,
atau pendampingan implementasi teknologi, sesuai layanan aktual. -
Bagaimana proses konsultasi dan penjajakan kerja sama. - Apa informasi
yang perlu disiapkan sekolah. - CTA seperti **Diskusikan Kerja Sama
Sekolah**.

## 2.3 Jangan membuat produk terlihat saling tumpang tindih

Gunakan satu pola informasi konsisten untuk semua produk: 1. Ringkasan
program. 2. Target peserta. 3. Masalah atau kebutuhan yang dijawab. 4.
Kompetensi yang dikembangkan. 5. Materi atau jalur belajar. 6. Proyek
dan hasil belajar. 7. Format, durasi, jadwal, dan prasyarat yang sudah
diverifikasi. 8. Cara evaluasi. 9. FAQ. 10. CTA yang sesuai.

Jelaskan hubungan ant produk sebagai ekosistem, tetapi jangan memaksakan
semua orang mengikuti urutan yang sama jika jalur belajar aktual
memungkinkan pilihan berbeda.

------------------------------------------------------------------------

# 3. Audit Konten dan Temuan Website Awal

Bagian ini merupakan daftar hal yang terindikasi dari pemeriksaan konten
awal dan harus diverifikasi kembali pada website live.

## 3.1 Temuan yang perlu diperiksa

### A. Testimoni dan social proof

Konten terindeks menunjukkan label seperti: - "Siswa SPI
(Placeholder)" - "Guru Mitra SPI (Placeholder)" - Bagian cerita orang
tua yang menyatakan bahwa cerita masih dikumpulkan.

**Risiko:** calon orang tua bisa meragukan autentisitas website jika
elemen contoh masih terlihat seperti konten publik.

**Tindakan:** - Ganti dengan materi nyata dan izin publikasi yang
sesuai. - Jika belum ada, sembunyikan sementara bagian yang belum
siap. - Gunakan proyek siswa dan dokumentasi kegiatan sebagai bukti
alternatif. - Hindari membuat testimoni fiktif atau mengedit makna
kutipan.

### B. Bagian alumni

Konten terindeks menunjukkan teks yang tampak seperti instruksi
editorial, misalnya: - "Tampilkan universitas tempat alumni SPI
melanjutkan pendidikan" - "Dan universitas lainnya"

**Risiko:** instruksi internal yang terlihat publik membuat website
tampak belum selesai dan dapat menimbulkan pertanyaan mengenai
keakuratan klaim alumni.

**Tindakan:** - Hapus instruksi editorial. - Publikasikan hanya data
alumni yang benar-benar terverifikasi. - Jika belum ada data yang siap,
ganti dengan bukti belajar lain yang relevan atau hilangkan section.

### C. Konten yang berulang

Konten awal menunjukkan beberapa pengulangan, antara lain: - Deskripsi
"Why Kids Choose SPI?" yang muncul dua kali. - Urutan/deskripsi produk
"From Curiosity to Creation" yang tampak berulang beberapa kali. -
Alamat Jakarta yang muncul dua kali dalam konteks lokasi.

**Tindakan:** - Audit seluruh section dan komponen untuk menemukan
pengulangan yang tidak memiliki fungsi. - Bedakan pengulangan yang
disengaja untuk navigasi/CTA dari pengulangan konten yang tidak perlu. -
Gunakan satu sumber data untuk alamat dan informasi kontak agar tidak
terjadi inkonsistensi.

### D. Event

Bagian event terindikasi menggunakan pesan bahwa informasi akan tersedia
segera.

**Tindakan:** - Jika event aktif belum tersedia, jangan biarkan section
kosong atau berulang. - Tampilkan event yang sudah terkonfirmasi, atau
arahkan ke aktivitas yang memang tersedia. - Jika section tidak berguna
saat ini, sembunyikan sementara.

### E. AI Idea Generator

Homepage memiliki fitur AI Idea Generator menurut konten awal.

**Tindakan:** - Verifikasi bahwa fitur benar-benar berjalan. - Uji
kondisi loading, error, hasil kosong, dan penggunaan di mobile. -
Jelaskan apa yang dilakukan fitur, siapa yang cocok menggunakannya, dan
bagaimana hasilnya dapat menjadi inspirasi proyek. - Jika fitur belum
siap atau tidak berfungsi, jangan menampilkan seolah-olah fitur aktif.

### F. Proyek siswa

Contoh tema proyek yang terindikasi pada konten: - Python inventory
management. - Arduino automatic door. - Game menggunakan Python/Tkinter.

**Tindakan:** - Verifikasi bahwa proyek benar-benar dibuat oleh siswa
atau tim SPI yang diklaim. - Tambahkan konteks tantangan, proses
berpikir, teknologi, iterasi, dan hasil belajar. - Gunakan gambar,
video, demo, atau tangkapan layar yang sah dan sesuai izin.

### G. Lokasi dan cabang

Konten awal memuat informasi lokasi dan alamat Jakarta. Feedback pihak
lain juga menyebut Jakarta (Kalideres), Surabaya (Lagoon Avenue Mall),
Malang, Solo, dan Yogyakarta.

**PENTING:** daftar lokasi tersebut harus diverifikasi sebelum
ditampilkan sebagai daftar cabang resmi. Jangan menganggap semua
informasi yang disampaikan pihak lain pasti benar atau masih aktif.

Pisahkan dengan jelas: - Lokasi operasional yang sudah terkonfirmasi
aktif. - Kelas online. - Area yang menerima calon mitra atau peluang
kemitraan. - Lokasi yang masih dalam tahap rencana.

Catatan dari arahan SPI sebelumnya: lokasi aktif yang disebutkan untuk
ditampilkan dalam konteks kemitraan adalah Jakarta Barat, Surabaya,
Malang, Solo, dan Jogja. Wilayah Sumatera, Kalimantan, Sulawesi, Papua,
serta wilayah lain harus dibedakan sebagai peluang kemitraan terbuka
jika status tersebut masih berlaku. Validasi ulang sebelum implementasi.

### H. Domain dan hasil pencarian

Konten yang terindeks pada variasi domain www dan non-www tampak
berbeda. Ada hasil indeks yang menggunakan positioning "Architecting the
AI-Native Generation", struktur Foundation to Research, iCode 2025, dan
SPI Connect, sedangkan konten lain menggunakan "Developing Computational
Thinking for the AI-Native Generation" dan empat produk utama.

Hal ini mungkin merupakan indeks lama, konten yang belum diperbarui,
atau perbedaan versi. Jangan langsung menyimpulkan bahwa ada duplikasi
live sebelum diperiksa.

**Tindakan teknis:** - Tentukan satu domain kanonis. - Pastikan redirect
www/non-www konsisten. - Audit canonical tags, sitemap, robots
directives, metadata, dan URL yang terindeks. - Pastikan konten lama
yang tidak relevan tidak terus muncul sebagai representasi utama SPI. -
Verifikasi apakah route lama perlu dialihkan, dipertahankan, atau
dihapus secara terencana.

## 3.2 Skor audit awal

Skor berikut hanya merupakan penilaian awal terhadap konten dan struktur
yang dapat diamati, bukan skor teknis atau hasil pengujian pengguna.

  ------------------------------------------------------------------------
  Area                                     Skor awal Interpretasi
  --------------------- ---------------------------- ---------------------
  Brand positioning                             7/10 Arah strategis cukup
                                                     relevan, tetapi perlu
                                                     dibuat lebih konkret
                                                     bagi orang tua dan
                                                     siswa

  First impression                              6/10 Ada potensi, tetapi
                                                     pesan dan bukti harus
                                                     lebih kuat

  Information                                   6/10 Struktur produk perlu
  architecture                                       dijelaskan dan
                                                     dipisahkan dengan
                                                     lebih jelas

  UX                                            5/10 Perjalanan pengguna
                                                     dan jalur konversi
                                                     perlu diuji dan
                                                     diperbaiki

  Product communication                         6/10 Ekosistem sudah ada,
                                                     diferensiasi ant
                                                     produk perlu
                                                     diperjelas

  Learning methodology                          7/10 Think → Build →
                                                     Innovate punya
                                                     potensi sebagai
                                                     kerangka diferensiasi

  Trust and credibility                         4/10 Placeholder dan
                                                     konten editorial
                                                     perlu dibereskan

  Conversion                                    5/10 CTA dan funnel harus
                                                     diukur dan diuji

  Content quality                               5/10 Perlu perbaikan
                                                     pengulangan,
                                                     kelengkapan,
                                                     konsistensi, dan
                                                     bukti

  Visual design                        Belum dinilai Perlu audit visual
                                                     langsung pada desktop
                                                     dan mobile

  Mobile experience                    Belum dinilai Perlu pengujian pada
                                                     perangkat dan
                                                     viewport nyata

  Accessibility                        Belum dinilai Perlu pengujian
                                                     aksesibilitas

  SEO                                  Belum dinilai Perlu audit teknis
                                                     dan konten

  Technical performance                Belum dinilai Perlu pengukuran
                                                     nyata, tidak boleh
                                                     ditebak

  Overall brand                                 6/10 Ringkasan penilaian
  experience                                         awal terhadap
                                                     pengalaman merek
                                                     berdasarkan bukti
                                                     konten yang tersedia
  ------------------------------------------------------------------------

------------------------------------------------------------------------

# 4. Target Audiens dan Kebutuhan Pengguna

## 4.1 Orang tua dan calon siswa

Pertanyaan utama mereka: - Apakah program sesuai dengan usia dan
kemampuan anak? - Apa manfaat belajar programming selain bisa menulis
kode? - Apakah anak akan membuat sesuatu yang nyata? - Apakah metode
pengajarannya cocok untuk pemula? - Berapa lama program berlangsung? -
Bagaimana perkembangan anak dievaluasi? - Berapa biaya dan apa saja yang
termasuk? - Bagaimana cara mencoba kelas? - Siapa pengajarnya? - Apa
bukti bahwa pembelajaran benar-benar terjadi?

**Kebutuhan desain:** bahasa sederhana, program yang mudah dibandingkan,
bukti karya nyata, informasi proses belajar, biaya atau panduan biaya
yang jelas, FAQ, dan CTA trial.

## 4.2 Siswa

Pertanyaan utama: - Proyek apa yang dapat saya buat? - Apakah saya bisa
membuat game, aplikasi, robot, atau karya AI? - Apakah kelas cocok untuk
pemula? - Apa yang akan saya pelajari setelah tahap awal? - Bagaimana
cara melihat hasil proyek saya?

**Kebutuhan desain:** visual proyek, contoh hasil, bahasa yang
membangkitkan rasa ingin tahu, penjelasan singkat, dan jalur belajar
yang mudah dipahami.

## 4.3 Sekolah dan institusi

Pertanyaan utama: - Layanan apa yang ditawarkan SPI untuk sekolah? -
Bagaimana program dapat disesuaikan dengan siswa dan kebutuhan
institusi? - Apa kebutuhan fasilitas dan pengajar? - Bagaimana struktur
program, jadwal, dan evaluasi? - Bagaimana proses kemitraan dimulai?

**Kebutuhan desain:** halaman B2B yang jelas, format program, proses
kerja sama, hasil pembelajaran, bukti implementasi yang terverifikasi,
dan CTA konsultasi.

## 4.4 Mitra dan calon lokasi kemitraan

Pertanyaan utama: - Bentuk kemitraan apa yang tersedia? - Area mana yang
sudah memiliki lokasi aktif? - Area mana yang masih terbuka untuk
kemitraan? - Apa persyaratan dan proses penjajakan?

**Kebutuhan desain:** halaman kemitraan khusus, peta Indonesia
interaktif jika layak secara teknis, status lokasi yang jelas, dan CTA
untuk mengajukan kemitraan.

------------------------------------------------------------------------

# 5. Struktur Informasi dan Navigasi

## 5.1 Usulan navigasi utama

Navigasi harus ringkas, menggunakan bahasa yang mudah dipahami, dan
tidak menempatkan semua informasi pada satu menu panjang.

Usulan: - Beranda - Program - SPI Core - SPI Lab - SPI Engineering - SPI
InSchool - Karya Siswa - Metode Belajar - Tentang SPI - Lokasi - Artikel
atau Insight, jika kontennya aktif - CTA utama: Coba Kelas Gratis

Jika menu kemitraan perlu ditonjolkan, tampilkan pada navigasi utama
atau sebagai CTA yang berbeda untuk audiens institusi.

## 5.2 Pisahkan jalur B2C dan B2B

### Jalur B2C: siswa dan orang tua

Beranda → pilih program → pahami hasil belajar → lihat karya → cek FAQ →
Free Trial/konsultasi → pendaftaran.

### Jalur B2B: sekolah dan institusi

Beranda atau SPI InSchool → pahami layanan → lihat pendekatan dan bukti
→ konsultasi → diskusi kebutuhan → proposal atau langkah kerja sama.

Jangan memaksa orang tua dan sekolah melewati funnel yang sama. Keduanya
memiliki pertanyaan, keputusan, dan siklus konversi yang berbeda.

## 5.3 Halaman yang disarankan

-   Homepage.
-   Halaman SPI Core.
-   Halaman SPI Lab.
-   Halaman SPI Engineering.
-   Halaman SPI InSchool.
-   Halaman Karya Siswa.
-   Halaman Metode Belajar.
-   Halaman Tentang SPI dan mentor.
-   Halaman Lokasi dan Kemitraan.
-   Halaman Free Trial atau pendaftaran.
-   FAQ.
-   Artikel/insight jika tim mampu menjaga kualitas dan konsistensi
    publikasi.

Halaman baru tidak wajib dibuat jika informasi yang sama sudah tersedia
dengan baik pada halaman yang ada. Prioritaskan memperbaiki konten dan
jalur pengguna yang ada sebelum menambah route.

------------------------------------------------------------------------

# 6. Rekomendasi Homepage Secara Detail

Urutan berikut merupakan struktur yang direkomendasikan. Audit
implementasi yang sudah ada sebelum menambahkan section baru.

## 6.1 Hero section

**Tujuan:** dalam beberapa detik, pengunjung memahami siapa SPI, apa
manfaatnya, dan apa langkah selanjutnya.

Headline: **"Bukan Sekadar Belajar Coding. Anak Belajar Menciptakan
Teknologi."**

Subheadline: "Bantu anak mengembangkan cara berpikir logis, memecahkan
masalah, dan membangun proyek nyata melalui programming dan teknologi
AI."

CTA utama: - Coba Kelas Gratis

CTA sekunder: - Jelajahi Program - atau Lihat Karya Siswa, jika showcase
adalah pembeda utama yang ingin diangkat.

Prinsip desain: - Satu pesan utama. - Hierarki tipografi yang kuat. -
Kontras yang memadai. - Hindari terlalu banyak tombol dengan tingkat
prioritas sama. - Visual utama sebaiknya menunjukkan siswa sedang
membuat atau menguji karya, bukan sekadar gambar laptop generik. -
Pastikan hero tidak terlalu tinggi sampai informasi penting berikutnya
hilang dari layar pada mobile. - Jika menggunakan animasi, jangan
mengganggu keterbacaan atau memperlambat halaman. - Gunakan bukti nyata
dan jangan menyajikan visual stok seolah-olah dokumentasi SPI.

## 6.2 Section: Why SPI

**Tujuan:** menjelaskan alasan memilih SPI dengan manfaat yang konkret.

Jangan hanya menggunakan kata-kata generik seperti inovatif,
menyenangkan, modern, dan berkualitas. Jelaskan perilaku atau hasil
belajar yang mendukung setiap klaim.

Contoh dimensi: - Belajar memahami masalah. - Belajar merancang
solusi. - Belajar membuat dan menguji proyek. - Belajar memperbaiki
kesalahan. - Belajar menggunakan teknologi secara bertanggung jawab. -
Belajar menjelaskan ide dan hasil karya.

Setiap poin perlu didukung metode, contoh, atau bukti yang sesuai.

## 6.3 Section: AI-Native Generation

**Tujuan:** menjelaskan relevansi visi SPI tanpa membuatnya terasa
abstrak atau sekadar mengikuti tren AI.

Jelaskan bahwa anak tidak hanya menggunakan teknologi, tetapi juga
perlu: - Memahami bagaimana teknologi digunakan. - Mengajukan pertanyaan
yang tepat. - Mengevaluasi hasil. - Memecahkan masalah. - Membuat
solusi. - Menggunakan AI secara kritis dan bertanggung jawab.

Jangan menjanjikan bahwa anak otomatis menjadi ahli AI. Gunakan klaim
yang proporsional dengan usia, kurikulum, dan hasil belajar yang nyata.

## 6.4 Section: Program SPI

Tampilkan empat produk dalam kartu yang konsisten, tetapi dengan
perbedaan yang jelas.

Setiap kartu memuat: - Nama produk. - Audiens atau target. - Manfaat
utama. - Contoh materi. - Contoh proyek atau output. - CTA menuju
halaman yang relevan.

Hindari hanya menampilkan nama teknologi. Orang tua harus dapat
membedakan tujuan SPI Core, SPI Lab, SPI Engineering, dan SPI InSchool.

## 6.5 Section: What Students Build / Karya Siswa

**Tujuan:** menjadikan hasil karya sebagai bukti nyata.

Gunakan contoh yang sudah terverifikasi, misalnya jika benar-benar
tersedia: - Game berbasis programming visual. - Aplikasi Python. -
Sistem inventori sederhana. - Proyek Arduino atau robotika. - Proyek
data atau AI.

Setiap kartu proyek sebaiknya memiliki: 1. Nama proyek. 2. Tingkat/usia
atau level, jika boleh dipublikasikan. 3. Tantangan yang diselesaikan.
4. Cara berpikir atau konsep yang digunakan. 5. Teknologi yang dipakai.
6. Hasil atau demo. 7. Pelajaran penting dari proses. 8. Tautan ke studi
kasus lengkap jika tersedia.

Jangan mengukur keberhasilan hanya berdasarkan seberapa canggih proyek
terlihat. Proyek pemula dapat menunjukkan pemahaman yang kuat jika
konteks pembelajarannya dijelaskan.

## 6.6 Section: Learning Journey

Tampilkan perjalanan yang mudah dipahami: - Fondasi. - Pengembangan. -
Penerapan. - Inovasi.

Nama tahap, durasi, prasyarat, dan hasil belajar harus disesuaikan
dengan kurikulum resmi yang berlaku. Jangan mencantumkan durasi atau
urutan yang belum dikonfirmasi.

Gunakan visual roadmap yang menunjukkan: - Titik awal. - Kompetensi. -
Proyek yang dibuat. - Kriteria perkembangan. - Kemungkinan jalur
lanjutan.

## 6.7 Section: Think → Build → Innovate

Jadikan kerangka ini sebagai sistem pembelajaran yang terlihat nyata,
bukan hanya tagline.

### Think

-   Memahami kebutuhan atau masalah.
-   Memecah masalah menjadi bagian lebih kecil.
-   Mengenali pola dan membuat rencana.
-   Menjelaskan alasan di balik solusi.

### Build

-   Membuat solusi dengan alat yang sesuai.
-   Menulis kode atau menyusun sistem.
-   Menguji apakah solusi bekerja.
-   Menemukan dan memperbaiki kesalahan.

### Innovate

-   Mengevaluasi hasil.
-   Memperbaiki berdasarkan pengujian.
-   Menambahkan ide atau fungsi yang relevan.
-   Menjelaskan manfaat karya dan apa yang dipelajari.

Gunakan contoh proyek yang menghubungkan ketiga tahap tersebut.

## 6.8 Section: Mentor dan metode mengajar

Tampilkan informasi yang benar-benar membantu calon orang tua memahami
kualitas pengajaran: - Profil pengajar. - Pengalaman atau kompetensi
yang relevan dan terverifikasi. - Pendekatan mengajar. - Cara
mendampingi siswa dengan tingkat kemampuan berbeda. - Cara memberikan
feedback. - Cara mengevaluasi pemahaman.

Jangan hanya menggunakan foto dan gelar tanpa menjelaskan peran pengajar
dalam pengalaman belajar.

## 6.9 Section: Testimoni dan bukti sosial

Gunakan testimoni asli, izin publikasi yang sesuai, dan konteks yang
cukup.

Bukti sosial yang mungkin: - Pengalaman siswa. - Pengalaman orang tua. -
Pengalaman sekolah mitra. - Karya siswa. - Dokumentasi kegiatan. - Data
program yang dapat diverifikasi.

Jika belum ada testimoni yang siap, jangan menampilkan placeholder.
Gunakan karya siswa atau penjelasan metode yang dapat dibuktikan.

## 6.10 Section: Sekolah dan mitra

Jelaskan jalur SPI InSchool dan kemitraan dengan bahasa yang jelas.

Gunakan logo hanya jika izin dan hubungan kerja sama sudah dikonfirmasi.
Jangan memberi kesan bahwa sebuah organisasi merupakan mitra aktif jika
statusnya belum jelas.

CTA: - Diskusikan Program untuk Sekolah - Ajukan Kemitraan

## 6.11 Section: Lokasi dan jangkauan

Tampilkan lokasi aktif hanya setelah verifikasi. Bedakan lokasi aktif,
kelas online, dan peluang kemitraan.

Jika menggunakan peta Indonesia interaktif: - Gunakan SVG yang ringan
dan dapat diakses. - Marker lokasi harus menunjukkan status dengan
jelas. - Tooltip harus tersedia tanpa bergantung pada hover saja. -
Gunakan animasi secara terbatas. - Sediakan daftar lokasi dalam bentuk
teks sebagai alternatif peta. - Pastikan keyboard navigation, focus
state, dan reduced-motion support. - Jangan menampilkan titik lokasi
yang belum resmi atau belum beroperasi.

## 6.12 Section: FAQ

FAQ harus menjawab pertanyaan yang benar-benar memengaruhi keputusan: -
Program untuk usia atau tingkat apa? - Apakah pemula bisa ikut? - Apa
yang dipelajari? - Proyek apa yang dibuat? - Bagaimana format kelas? -
Berapa durasi dan frekuensi kelas? - Berapa biaya atau bagaimana cara
mengetahui biaya? - Apakah ada kelas percobaan? - Bagaimana perkembangan
siswa dievaluasi? - Apa yang perlu disiapkan? - Bagaimana jika siswa
sudah memiliki pengalaman? - Bagaimana sekolah dapat bekerja sama dengan
SPI?

Jawaban harus konsisten dengan informasi admin dan kebijakan
operasional.

## 6.13 Final CTA

Akhiri homepage dengan langkah yang jelas.

Untuk orang tua/siswa: **"Mulai dari rasa ingin tahu, lanjutkan dengan
karya nyata."** CTA: Coba Kelas Gratis.

Untuk sekolah: **"Bangun pengalaman belajar teknologi yang relevan
bersama SPI."** CTA: Diskusikan Kerja Sama.

Jangan mencampur semua CTA menjadi satu pesan yang membingungkan.

------------------------------------------------------------------------

# 7. Transparansi Harga, Silabus, dan Free Trial

## 7.1 Transparansi biaya

Feedback eksternal menyebut harga paket dan biaya per modul belum tampak
langsung di homepage. Kondisi ini perlu diverifikasi terhadap halaman
aktual.

Rekomendasi: - Jika harga dapat dipublikasikan, tampilkan harga atau
kisaran yang jelas beserta apa yang termasuk. - Jika harga bervariasi
berdasarkan program, durasi, lokasi, atau format, jelaskan faktor yang
memengaruhi biaya. - Jika kebijakan bisnis mengharuskan konsultasi
terlebih dahulu, sediakan penjelasan tentang proses mendapatkan
penawaran dan apa yang akan dibahas. - Hindari memaksa pengunjung
menghubungi admin hanya untuk mendapatkan informasi dasar yang
seharusnya dapat dijelaskan secara terbuka. - Jangan mencantumkan harga
lama atau perkiraan yang belum disetujui.

## 7.2 Silabus ringkas

Sediakan ringkasan jalur belajar berdasarkan usia atau kemampuan, bukan
sekadar daftar teknologi.

Contoh pengelompokan yang dapat dipertimbangkan, jika sesuai dengan
kurikulum aktual: - Pemula dan fondasi. - Pengembangan keterampilan. -
Proyek dan penerapan. - Jalur teknologi lanjutan.

Feedback eksternal memberikan contoh rentang usia 7 sampai 12 tahun dan
13 sampai 18 tahun. Itu adalah contoh pengelompokan, bukan ketentuan
final. Gunakan rentang usia resmi SPI setelah divalidasi.

Untuk setiap tahap, jelaskan: - Tujuan belajar. - Kompetensi. - Contoh
aktivitas. - Contoh proyek. - Prasyarat. - Cara evaluasi. - Tahap
lanjutan.

## 7.3 Free Trial

Jangan hanya menampilkan tombol "Free Trial". Jelaskan: - Siapa yang
bisa mengikuti. - Apa yang akan dialami. - Berapa lama sesi berlangsung,
jika telah ditetapkan. - Apakah siswa membuat proyek mini. - Apa yang
perlu disiapkan. - Apakah orang tua dapat melihat hasil. - Apa langkah
setelah trial.

Uji seluruh alur: - CTA. - Formulir. - Validasi input. - Pesan sukses. -
WhatsApp atau kanal tindak lanjut. - Pencatatan prospek. - Pengalaman
mobile.

------------------------------------------------------------------------

# 8. Benchmark Website: Apa yang Dipelajari SPI

Daftar referensi mencakup sekolah coding, platform edukasi, perusahaan
teknologi, lembaga, organisasi sosial, dan eksperimen web interaktif.
Tidak semuanya kompetitor langsung. Tujuannya adalah mengambil prinsip
yang relevan, bukan menyalin tampilan atau klaim.

**Catatan bukti:** ringkasan benchmark ini bersifat strategis dan tidak
berarti setiap halaman dari setiap situs telah diaudit secara mendalam.
Angka, klaim, program, dan fitur pihak ketiga dapat berubah dan harus
diperiksa ulang sebelum digunakan dalam materi publik.

## 8.1 EdTech dan pendidikan coding anak

### Ruangguru

Pelajaran yang relevan: - Komunikasi program pendidikan yang mudah
dipahami orang tua. - Segmentasi layanan dan kebutuhan belajar. -
Penjelasan manfaat, dukungan, dan langkah berikutnya.

Yang bisa diadopsi: - Informasi program yang terstruktur. - Bahasa yang
berorientasi pada kebutuhan siswa dan orang tua. - Jalur konversi yang
jelas.

Yang tidak boleh dilakukan: - Meniru semua kategori produk atau
kompleksitas platform jika tidak sesuai skala SPI. - Menggunakan klaim
hasil tanpa data.

Catatan: hasil pencarian yang tersedia sebelumnya merujuk pada Ruang
GTK, bukan audit langsung lengkap terhadap homepage Ruangguru. Detail
visual dan fitur aktual Ruangguru perlu diverifikasi.

### Brain Academy

Pelajaran yang relevan: - Menjelaskan layanan dan pengalaman belajar
untuk orang tua. - Memperjelas format pembelajaran dan manfaat. -
Menampilkan dukungan serta pengalaman siswa secara terstruktur.

Yang dapat diadopsi: - Bahasa yang menjawab kebutuhan orang tua. -
Penjelasan tentang bagaimana program berjalan. - CTA yang terhubung
dengan layanan nyata.

### Coding Bee

Pelajaran benchmark: - Perhatikan bagaimana sekolah coding anak
menjelaskan program, hasil belajar, dan pengalaman orang tua. -
Bandingkan struktur program, bukti pembelajaran, dan CTA, bukan sekadar
warna atau ilustrasi.

Yang perlu divalidasi: - Program aktif, struktur halaman, klaim, dan
detail operasional saat audit implementasi dilakukan.

### Koding Next

Pelajaran yang relevan: - Pengelompokan program coding, robotika, dan
AI. - CTA Free Trial yang mudah ditemukan. - Penyampaian bukti sosial
dan informasi skala layanan. - Pilihan online/offline dan informasi
lokasi.

Sumber hasil pencarian sebelumnya: `turn571418search5`,
`turn571418search15`.

Yang dapat diadopsi: - Pengunjung cepat menemukan program yang
relevan. - Trial diperlakukan sebagai jalur konversi utama. - Bukti
sosial ditempatkan secara strategis.

Peringatan: - Angka jumlah orang tua, kursus, instruktur, mitra, lokasi,
atau lama operasi hanya boleh digunakan sebagai benchmark yang dikutip
dan diperiksa ulang. SPI tidak boleh meniru atau mengadopsi angka pihak
lain sebagai klaim SPI.

### KodeKiddo

Pelajaran yang relevan: - Personalisasi pembelajaran. - Tantangan
kelompok. - Komunikasi program after-school dan holiday classes. - Rasio
pengajar terhadap siswa sebagai informasi yang mungkin membantu orang
tua, jika benar dan relevan.

Sumber hasil pencarian sebelumnya: `turn571418search11`.

Yang dapat diadopsi: - Jelaskan cara pembelajaran disesuaikan dengan
tingkat siswa. - Tampilkan bentuk kolaborasi dan tantangan kelompok. -
Jika rasio kelas merupakan pembeda nyata SPI, tampilkan dengan data yang
terverifikasi.

### Kalananti

Pelajaran yang relevan: - Pengelompokan program berdasarkan usia dan
level. - Jalur dari ScratchJr/Scratch menuju Roblox atau Python, jika
sesuai kurikulum mereka. - FAQ, kelas percobaan, serta penjelasan
proyek. - Penjelasan online/offline dan lokasi.

Sumber hasil pencarian sebelumnya: `turn571418search0`,
`turn571418search6`, `turn571418search14`.

Yang dapat diadopsi: - Struktur level yang mudah dipahami. - FAQ yang
membantu keputusan. - Penjelasan apa yang dipelajari dan apa yang
dibuat. - CTA trial yang jelas.

### Timedoor Academy

Pelajaran yang relevan: - Menghubungkan coding dengan problem solving,
creative thinking, grit, confidence, dan communication. - Menjelaskan
opsi online/offline, trial, serta informasi program. - Memudahkan
pengunjung memahami nilai pembelajaran selain coding.

Sumber hasil pencarian sebelumnya: `turn571418search4`,
`turn571418search13`. Hasil lain dari Timedoor IT bukan halaman yang
sama dengan Timedoor Academy, sehingga jangan mencampur data keduanya.

Yang dapat diadopsi: - Terjemahkan kompetensi nonteknis ke dalam
aktivitas dan bukti konkret. - Jelaskan manfaat belajar tanpa membuat
janji berlebihan. - Pastikan jalur trial dan informasi lokasi mudah
ditemukan.

### The LabX / Kodland

Pelajaran yang relevan: - Pencarian program berdasarkan usia, minat,
atau kategori. - Pilihan program dan level. - Trial atau pengenalan
program. - Review orang tua jika autentik dan relevan. - Struktur
katalog yang memudahkan eksplorasi.

Sumber hasil pencarian sebelumnya untuk Kodland: `turn887789search3`,
`turn887789search6`, `turn887789search10`, `turn887789search13`,
`turn887789search14`.

Yang dapat diadopsi: - Program finder sederhana berdasarkan usia dan
minat. - Filter yang benar-benar membantu memilih program. - Penjelasan
prasyarat dan hasil belajar.

Jangan menambahkan filter rumit jika jumlah program SPI belum
memerlukannya.

### Citra Kasih

Pelajaran benchmark: - Perhatikan cara institusi pendidikan formal
membangun kepercayaan melalui identitas, nilai pendidikan, fasilitas,
aktivitas, dan komunikasi kepada orang tua. - Gunakan pelajaran tentang
kredibilitas institusi, bukan meniru struktur sekolah formal secara
mentah.

Detail spesifik situs perlu diverifikasi pada audit langsung.

### Merry Riana

Pelajaran benchmark: - Storytelling, personal branding, narasi aspirasi,
dan komunikasi yang memotivasi. - Hubungkan narasi dengan bukti dan
program yang nyata.

Yang dapat diadopsi: - Cerita yang membuat visi mudah diingat. - Pesan
yang emosional tetapi tetap konkret.

Jangan menjadikan motivasi sebagai pengganti bukti pembelajaran.

## 8.2 Platform developer education

### Hacktiv8

Pelajaran yang relevan: - Kejelasan jalur program. - Fokus pada
keterampilan dan hasil. - Portofolio dan outcome. - Pemisahan solusi
individu dan korporat.

Sumber hasil pencarian sebelumnya: `turn571418search2`,
`turn571418search8`, `turn571418search9`.

Yang dapat diadopsi: - Jelaskan hasil yang dapat ditunjukkan. - Pisahkan
layanan untuk individu dan organisasi. - Tampilkan proyek sebagai bukti
kompetensi.

Penyesuaian untuk SPI: - SPI melayani anak dan generasi muda serta
institusi pendidikan, sehingga bahasa dan klaim harus sesuai usia,
tujuan, dan konteks pendidikan. Jangan menyalin janji karier bootcamp
dewasa.

### Dicoding

Pelajaran yang relevan: - Learning path dan spesialisasi. - Struktur
pembelajaran yang membantu peserta mengetahui langkah selanjutnya. -
Kompetensi yang disusun berurutan.

Yang dapat diadopsi: - Roadmap yang menunjukkan progres. - Penjelasan
prasyarat dan kompetensi. - Hubungan antar tahap belajar. - Karya atau
proyek yang menguatkan kompetensi.

### Codepolitan

Pelajaran yang relevan: - Ekosistem belajar developer. - Roadmap,
komunitas, proyek, dan konten. - Beragam pintu masuk bagi peserta dengan
kebutuhan berbeda.

Sumber hasil pencarian sebelumnya: `turn571418search1`,
`turn571418search7`.

Yang dapat diadopsi: - Roadmap yang jelas. - Showcase karya. - Komunitas
atau aktivitas belajar jika SPI benar-benar mampu mengelolanya. - Konten
pendukung yang terhubung dengan produk.

### Coding Studio

Pelajaran benchmark: - Perhatikan cara materi dan jalur skill teknologi
dijelaskan. - Bandingkan katalog program, penjelasan hasil, dan
penempatan CTA.

Detail spesifik perlu diperiksa pada situs aktual sebelum membuat klaim
lebih jauh.

### Course-Net

Pelajaran benchmark: - Struktur program pelatihan teknologi. - Kejelasan
sasaran peserta, materi, dan hasil. - Jalur individu dan perusahaan jika
layanan tersebut tersedia.

Jangan mengadopsi struktur katalog besar jika tidak sesuai jumlah
program SPI.

### Udemy

Pelajaran yang relevan: - Katalog yang mudah dicari. - Filter
kategori. - Ringkasan kursus yang mudah dibandingkan. - Informasi
tingkat kesulitan dan materi.

Yang dapat diadopsi: - Program SPI mudah dibandingkan berdasarkan
target, level, tujuan, dan output. - Ringkasan program konsisten. -
Pencarian atau filter hanya ditambahkan jika jumlah program sudah cukup
banyak untuk membutuhkannya.

## 8.3 Platform dan pengalaman belajar

### Khan Academy

Pelajaran yang relevan: - Pemisahan kebutuhan siswa, keluarga, guru, dan
sekolah. - Pembelajaran yang berorientasi pada latihan dan
perkembangan. - Struktur progres yang membantu peserta memahami apa yang
telah dikuasai.

Sumber hasil pencarian sebelumnya: `turn887789search7`,
`turn887789search11`.

Yang dapat diadopsi: - Jika sistem SPI mendukungnya, tampilkan progres
kompetensi dan hasil proyek. - Buat penjelasan tahap yang membantu siswa
mengetahui langkah berikutnya. - Hindari klaim personalisasi jika
prosesnya tidak benar-benar personal.

### TED-Ed

Pelajaran yang relevan: - Storytelling edukatif. - Konsep kompleks yang
dijelaskan melalui narasi dan visual. - Video dan materi yang memancing
rasa ingin tahu.

Sumber hasil pencarian sebelumnya: `turn887789search5`,
`turn887789search9`, `turn887789search15`, `turn887789search16`,
`turn887789search20`.

Yang dapat diadopsi: - Jelaskan konsep computational thinking melalui
cerita atau contoh masalah. - Gunakan video singkat untuk menjelaskan
metode atau proyek. - Pastikan visual memiliki tujuan edukatif, bukan
sekadar dekorasi.

### Genially

Pelajaran yang relevan: - Presentasi interaktif. - Hotspot, tooltip,
animasi, kuis, dan skenario. - Konten interaktif yang membantu
eksplorasi.

Sumber hasil pencarian sebelumnya: `turn887789search0`,
`turn887789search1`, `turn887789search2`, `turn887789search17`,
`turn887789search19`.

Yang dapat diadopsi: - Interaksi kecil untuk menjelaskan Think → Build →
Innovate. - Demo sederhana yang menunjukkan bagaimana proyek
berkembang. - FAQ atau roadmap interaktif bila interaksi membantu
pemahaman.

Peringatan: - Jangan menambahkan interaksi hanya karena bisa dibuat. -
Pertimbangkan performa, aksesibilitas, keyboard, touch, dan reduced
motion. - Semua interaksi harus tetap memiliki versi yang dapat dipahami
tanpa animasi.

### Neal.fun

Pelajaran yang relevan: - Eksperimen web yang sederhana, interaktif, dan
memicu rasa ingin tahu. - Satu ide dapat dijelaskan melalui pengalaman
langsung.

Sumber hasil pencarian sebelumnya: `turn887789search21`.

Yang dapat diadopsi: - Demo kecil yang membantu pengguna memahami ide
teknologi. - Pengalaman eksploratif yang memiliki tujuan jelas.

Jangan menyalin eksperimen yang tidak relevan dengan tujuan pendaftaran
atau pembelajaran SPI.

### Google Plus

Google Plus merupakan referensi historis, bukan benchmark produk aktif
untuk ditiru. Jangan menjadikannya acuan strategi produk atau komunitas
modern tanpa konteks yang jelas.

### Code.org

Pelajaran yang relevan: - Materi dan sumber daya pendidikan. - Dukungan
untuk guru dan sekolah. - Kurikulum yang dapat digunakan dalam konteks
pembelajaran.

Sumber hasil pencarian sebelumnya: `turn874340search0`,
`turn874340search1`, `turn874340search8`.

Yang dapat diadopsi: - Penjelasan program yang dapat dipahami sekolah. -
Materi atau panduan untuk pendidik jika SPI memang menawarkannya. -
Sumber belajar yang mendukung produk utama.

## 8.4 Merek teknologi dan disiplin desain

Merek teknologi tidak selalu merupakan kompetitor SPI. Gunakan mereka
sebagai referensi komunikasi produk, sistem visual, dan pengalaman
merek.

### Apple

Pelajaran: - Fokus visual. - Satu pesan utama per section. - Tipografi
dan ruang kosong yang disiplin. - Visual produk yang berkualitas. -
Storytelling yang konsisten.

Sumber hasil pencarian sebelumnya: `turn887789search18`.

Yang dapat diadopsi: - Kurangi kebisingan visual. - Prioritaskan satu
gagasan per section. - Gunakan visual yang mendukung pesan. - Jaga
konsistensi jarak, tipografi, dan hierarki.

Jangan meniru estetika Apple secara literal jika menghilangkan
kehangatan, aksesibilitas, dan karakter pendidikan anak yang dibutuhkan
SPI.

### Samsung

Pelajaran: - Arsitektur produk dan ekosistem. - Penjelasan hubungan
antar produk. - Navigasi untuk keluarga produk yang besar.

Yang dapat diadopsi: - Menjelaskan hubungan SPI Core, Lab, Engineering,
dan InSchool. - Memperlihatkan perbedaan dan hubungan antar produk tanpa
membuat pengguna bingung.

### Xiaomi

Pelajaran: - Kategori produk yang mudah ditemukan. - Informasi fitur,
manfaat, dan dukungan. - Struktur dukungan dan service center.

Sumber hasil pencarian sebelumnya: `turn887789search4`,
`turn887789search8`.

Yang dapat diadopsi: - Navigasi program yang terstruktur. - Informasi
lokasi dan kontak yang konsisten. - Penjelasan manfaat program, bukan
sekadar daftar fitur.

### POCO

Pelajaran: - Diferensiasi yang jelas dan pesan yang tegas. - Menonjolkan
alasan utama memilih produk.

Yang dapat diadopsi: - Setiap produk SPI memiliki value proposition yang
berbeda. - Hindari empat kartu produk yang hanya berbeda nama dan warna.

### OPPO dan vivo

Pelajaran: - Visual storytelling. - Menghubungkan fitur dengan manfaat
pengguna. - Menampilkan hasil atau pengalaman yang dapat dibayangkan.

Yang dapat diadopsi: - Tunjukkan apa yang bisa dibuat siswa dan mengapa
itu penting. - Jangan berhenti pada daftar teknologi.

### Huawei dan OnePlus

Pelajaran: - Konsistensi merek dan presentasi produk. - Penyampaian
manfaat yang terstruktur.

Yang dapat diadopsi: - Konsistensi layout, warna, typography, dan pola
informasi antar halaman.

### Evercoss

Pelajaran benchmark: - Komunikasi praktis dan informasi dukungan yang
mudah ditemukan.

Yang dapat diadopsi: - Kontak, FAQ, dan langkah bantuan yang jelas. -
Jangan membuat pengguna harus menebak ke mana harus bertanya.

### Gree

Pelajaran benchmark: - Menerjemahkan fitur teknis menjadi manfaat bagi
pengguna.

Yang dapat diadopsi: - Jelaskan manfaat program dalam bahasa yang
relevan bagi orang tua, siswa, dan sekolah. - Hindari hanya menampilkan
nama teknologi atau istilah teknis.

## 8.5 Pemerintah, lembaga, dan organisasi sosial

### Singapore Government

Pelajaran: - Informasi yang terstruktur. - Bahasa yang jelas. - Navigasi
dan kategori yang membantu pengguna menemukan jawaban.

Yang dapat diadopsi: - Halaman informasi yang konsisten. - Label menu
yang jelas. - FAQ dan jalur layanan yang mudah ditemukan.

Jangan membuat website SPI terasa seperti portal pemerintahan yang
terlalu formal. Adaptasi prinsip kejelasan, bukan gaya visual secara
literal.

### Fire Generation Indonesia

Pelajaran benchmark: - Penyampaian misi, identitas, kegiatan, dan dampak
komunitas.

Sumber hasil pencarian sebelumnya: `turn887789search12`.

Yang dapat diadopsi: - Cerita dampak yang autentik. - Penjelasan misi
yang disertai aktivitas nyata. - Dokumentasi yang menjelaskan siapa yang
terlibat dan apa hasilnya.

### Yayasan Saluran Berkat untuk Negeri

Pelajaran benchmark: - Transparansi misi dan aktivitas sosial. -
Dokumentasi kegiatan dan dampak. - Kejelasan informasi organisasi.

Yang dapat diadopsi jika relevan: - Narasi dampak yang berbasis kegiatan
nyata. - Bukti dan dokumentasi yang mudah dipahami. - Identitas
institusi yang konsisten.

Detail spesifik website perlu diperiksa langsung sebelum menyimpulkan
kualitas desain atau fitur.

## 8.6 Ringkasan prinsip yang paling layak diadopsi

  -----------------------------------------------------------------------
  Referensi                           Prinsip yang relevan untuk SPI
  ----------------------------------- -----------------------------------
  Koding Next                         Struktur program, Free Trial, dan
                                      bukti sosial

  Kalananti                           Jalur usia/level, FAQ, proyek, dan
                                      kejelasan program

  Timedoor Academy                    Soft skills dan manfaat belajar
                                      selain coding

  KodeKiddo                           Personalisasi dan tantangan
                                      kelompok, jika benar-benar tersedia

  Kodland                             Program finder sederhana
                                      berdasarkan usia atau minat

  Ruangguru / Brain Academy           Komunikasi yang mudah dipahami
                                      orang tua

  Hacktiv8                            Outcome, portofolio, dan pemisahan
                                      B2C/B2B

  Dicoding                            Learning path dan spesialisasi

  Codepolitan                         Roadmap, karya, komunitas, dan
                                      konten pendukung

  Udemy                               Katalog yang mudah dibandingkan

  Khan Academy                        Progres dan penguasaan kompetensi

  TED-Ed                              Storytelling edukatif

  Genially                            Interaksi yang membantu pemahaman

  Neal.fun                            Eksperimen sederhana yang memicu
                                      rasa ingin tahu

  Apple                               Fokus, hierarki visual, dan
                                      disiplin desain

  Samsung                             Arsitektur produk dan ekosistem

  Xiaomi                              Kategori, manfaat, dan dukungan

  POCO                                Diferensiasi produk

  OPPO / vivo                         Visual storytelling berbasis
                                      manfaat

  Huawei / OnePlus                    Konsistensi merek

  Evercoss                            Informasi praktis dan dukungan

  Gree                                Mengubah fitur teknis menjadi
                                      manfaat

  Singapore Government                Kejelasan dan ketercarian informasi

  Fire Generation / Yayasan Saluran   Misi, cerita dampak, dan
  Berkat                              dokumentasi autentik

  Code.org                            Sumber belajar dan dukungan
                                      institusi pendidikan
  -----------------------------------------------------------------------

**Prioritas benchmark:** jangan mencoba meniru semuanya. Untuk keputusan
desain awal, fokus pada Koding Next dan Kalananti untuk kejelasan
program, Dicoding dan Codepolitan untuk learning path dan portofolio,
Khan Academy untuk progres, TED-Ed untuk storytelling, Genially dan
Neal.fun untuk interaksi yang memiliki tujuan, serta Apple untuk
disiplin visual.

------------------------------------------------------------------------

# 9. Sistem Visual dan UI Design Direction

## 9.1 Palet warna

Arah warna SPI yang pernah digunakan: - **SPI Blue:** `#176DF8` - **Dark
Navy:** `#041A5A` - **Accent Yellow:** `#FFC928` - **White:**
`#FFFFFF` - **Light Gray Background:** `#F7F8FC`

Catatan: arahan warna SPI pernah mengalami beberapa iterasi, termasuk
`#2F6FDB`, `#1683FF`, dan `#186BF6`. Sebelum implementasi final,
tetapkan satu token warna resmi dan gunakan konsisten. Untuk dokumen
ini, `#176DF8` dan `#041A5A` menjadi acuan utama berdasarkan arahan
brand yang paling sering digunakan.

## 9.2 Karakter visual

Arah desain: - Bersih dan modern. - Edukatif, ramah, dan percaya diri. -
Memiliki energi dan rasa ingin tahu. - Tidak terlihat seperti website
korporat generik. - Tidak terlihat seperti katalog kursus yang penuh
kartu tanpa narasi. - Memadukan kejelasan produk dengan pengalaman
belajar yang terasa menyenangkan.

Arahan visual sebelumnya juga menyebut pendekatan playful dan tactile
yang terinspirasi dari pengalaman edukasi seperti Duolingo, dipadukan
dengan identitas SPI, ilustrasi panda, canvas putih, border yang tegas,
dan tipografi kuat. Gunakan inspirasi ini sebagai karakter, bukan
menyalin aset atau identitas merek lain.

## 9.3 Tipografi

Arah font yang pernah dipertimbangkan: - Poppins. - Inter.

Prinsip: - Gunakan skala tipografi yang konsisten. - Hindari terlalu
banyak ukuran dan bobot font. - Pastikan body text nyaman dibaca di
mobile. - Gunakan heading yang menyatakan manfaat atau gagasan, bukan
label generik semata. - Jaga line length dan line height agar paragraf
tidak terasa padat.

## 9.4 Komponen UI

Bangun sistem komponen konsisten: - Button utama dan sekunder. - Kartu
program. - Kartu proyek. - Kartu testimoni. - Badge level. - Roadmap
atau learning path. - FAQ accordion. - Formulir trial. - Formulir
konsultasi sekolah. - Kartu lokasi. - Navigasi desktop dan mobile. -
Footer. - State loading, error, empty, success, dan disabled.

Setiap komponen harus memiliki state interaksi dan aturan responsif yang
jelas.

## 9.5 Spacing, radius, dan border

-   Gunakan sistem spacing yang konsisten.
-   Gunakan ruang kosong untuk mengelompokkan informasi.
-   Jangan membuat setiap section memiliki gaya yang berbeda tanpa
    alasan.
-   Gunakan border dan radius untuk membangun karakter, bukan dekorasi
    berlebihan.
-   Pastikan shadow tidak menggantikan hierarki visual.
-   Jangan mengandalkan warna saja untuk membedakan status.

## 9.6 Ilustrasi dan aset

-   Utamakan foto, video, dan dokumentasi nyata SPI jika tersedia.
-   Ilustrasi panda dapat menjadi elemen identitas jika sudah sesuai
    brand.
-   Jangan mencampur gaya ilustrasi, foto stok, 3D, dan ikon secara
    acak.
-   Beri alt text pada gambar informatif.
-   Gunakan gambar dengan ukuran yang sesuai kebutuhan tampilan.
-   Hindari gambar besar yang memperlambat halaman.
-   Jangan menyajikan gambar stok sebagai dokumentasi siswa SPI.

## 9.7 Animasi

Animasi harus mendukung pemahaman: - Scroll reveal yang ringan. - Hover
dan focus state yang jelas. - Transisi sederhana pada kartu dan menu. -
Marker lokasi yang bergerak secara halus bila diperlukan. - Animasi
interaksi pada demo belajar jika memiliki tujuan.

Persyaratan: - Dukung `prefers-reduced-motion`. - Jangan membuat konten
utama bergantung pada animasi. - Jangan memblokir interaksi selama
animasi berjalan. - Hindari animasi berulang yang mengganggu. - Uji
performa di perangkat kelas menengah dan jaringan seluler.

------------------------------------------------------------------------

# 10. Lokasi dan Peta Kemitraan Indonesia

Peta interaktif dapat membantu SPI menjelaskan lokasi dan peluang kerja
sama, tetapi harus dibuat berdasarkan data operasional yang
terverifikasi.

## 10.1 Informasi yang harus dibedakan

-   Lokasi aktif.
-   Layanan online.
-   Area yang terbuka untuk kemitraan.
-   Lokasi rencana atau belum aktif.

Jangan menggunakan satu warna atau satu simbol untuk semua status.

## 10.2 Arahan desain peta

-   Peta Indonesia berbasis SVG yang ringan.
-   Warna dasar netral.
-   Marker lokasi aktif menggunakan warna SPI Blue.
-   Tooltip atau popover yang menyebut nama kota dan status.
-   Garis penghubung atau animasi yang sangat halus jika membantu
    narasi.
-   Hover bukan satu-satunya cara membuka informasi.
-   Sediakan daftar lokasi dalam teks.
-   Pastikan dapat digunakan dengan keyboard dan screen reader.
-   Dukung reduced motion.
-   Di mobile, peta tidak boleh menjadi satu-satunya cara mengakses
    lokasi.

## 10.3 Data lokasi

Arahan sebelumnya menyebut Jakarta Barat, Surabaya, Malang, Solo, dan
Jogja sebagai lokasi aktif untuk konteks kemitraan. Feedback terbaru
menyebut Jakarta (Kalideres), Surabaya (Lagoon Avenue Mall), Malang,
Solo, dan Yogyakarta. Daftar ini harus diselaraskan dengan data
operasional terbaru sebelum dirilis.

Sumatera, Kalimantan, Sulawesi, Papua, dan wilayah lain sebelumnya
diarahkan sebagai peluang kemitraan terbuka, bukan lokasi aktif.
Verifikasi status ini sebelum publikasi.

------------------------------------------------------------------------

# 11. Bahasa dan Internasionalisasi

Arahan SPI sebelumnya menetapkan: - Bahasa Indonesia harus sepenuhnya
berbahasa Indonesia. - Bahasa Inggris harus sepenuhnya berbahasa
Inggris. - Bahasa Mandarin harus menggunakan Mandarin Sederhana. -
Jangan mencampur bahasa secara tidak sengaja. - Jangan ada translation
key yang hilang atau fallback diam-diam ke Bahasa Indonesia. - Nama
merek dan nama resmi harus dipertahankan. - Selector bahasa harus
persis: **🇮🇩 ID, 🇬🇧 EN, 🇨🇳 CN**.

Implementasi: 1. Audit semua teks yang terlihat, termasuk tombol,
placeholder form, error message, tooltip, metadata, footer, dan teks
aksesibilitas. 2. Pastikan setiap route memiliki terjemahan lengkap. 3.
Jangan mengubah nama produk resmi. 4. Hindari campuran bahasa yang tidak
perlu dalam satu mode bahasa. 5. Pertahankan konsistensi istilah teknis,
dan berikan penjelasan bila diperlukan. 6. Uji pergantian bahasa pada
seluruh halaman, bukan hanya homepage. 7. Jangan membiarkan teks
placeholder atau label internal muncul karena key terjemahan tidak
tersedia.

------------------------------------------------------------------------

# 12. Formulir, Kontak, dan Konversi

## 12.1 Kontak resmi

Feedback eksternal menyebut nomor seperti `+62 812-3456-7890` terasa
seperti format umum dan berbeda dari kontak cabang yang muncul di media
sosial. Ini perlu diperlakukan sebagai **indikasi yang harus
diverifikasi**, bukan bukti bahwa nomor tersebut pasti palsu.

Audit: - Nomor telepon. - WhatsApp utama. - Email. - Alamat. - Kontak
tiap lokasi. - Link media sosial. - Google Business Profile. - Tombol
WhatsApp pada setiap halaman. - Formulir trial dan konsultasi.

Semua informasi harus bersumber dari satu data operasional resmi agar
tidak terjadi perbedaan antarhalaman.

## 12.2 Formulir Free Trial

Gunakan field sesedikit mungkin, tetapi cukup untuk menindaklanjuti
calon peserta.

Pertimbangkan: - Nama orang tua atau calon peserta. - Usia atau jenjang
siswa. - Program yang diminati. - Lokasi atau pilihan online/offline
jika tersedia. - Kontak yang dapat dihubungi. - Persetujuan terkait
komunikasi dan penggunaan data jika diperlukan.

Jangan meminta data sensitif yang tidak diperlukan.

## 12.3 Formulir kerja sama sekolah

Pisahkan dari formulir trial siswa.

Field yang dapat dipertimbangkan: - Nama sekolah/institusi. - Nama dan
jabatan kontak. - Email atau nomor kontak. - Kebutuhan atau bentuk
program yang ingin dibahas. - Kota/lokasi. - Perkiraan jumlah peserta
jika relevan.

## 12.4 Prinsip konversi

-   Satu CTA utama per konteks.
-   CTA harus konsisten dengan isi halaman.
-   Beri feedback jelas saat formulir dikirim.
-   Tampilkan error yang dapat dipahami.
-   Jangan menghilangkan input pengguna saat terjadi error.
-   Uji semua link dan alur.
-   Pastikan event analytics tidak menghitung klik yang gagal sebagai
    pendaftaran berhasil.
-   Jangan mengklaim konversi meningkat tanpa data.

------------------------------------------------------------------------

# 13. SEO, Aksesibilitas, Responsivitas, dan Performa

Area ini belum dinilai secara objektif dalam audit konten awal dan harus
diuji secara teknis.

## 13.1 SEO

Periksa: - Domain kanonis. - Redirect www/non-www. - Sitemap XML. -
Robots directives. - Canonical tags. - Title dan meta description. -
Heading hierarchy. - Internal links. - Struktur URL. - Alt text. -
Structured data jika relevan. - Halaman program yang memiliki tujuan dan
konten berbeda. - Konten yang terindeks tetapi sudah tidak relevan. -
Konsistensi nama, lokasi, dan kontak. - Konten lokal untuk lokasi yang
benar-benar aktif.

Jangan membuat halaman tipis hanya untuk mengejar keyword. Konten harus
membantu calon pelanggan membuat keputusan.

## 13.2 Core Web Vitals

Gunakan pengukuran nyata, misalnya PageSpeed Insights, Lighthouse, atau
data field jika tersedia.

Ambang referensi umum Core Web Vitals: - LCP: 2,5 detik atau lebih
cepat. - INP: 200 milidetik atau lebih cepat. - CLS: 0,1 atau lebih
rendah.

Ambang ini adalah referensi teknis, bukan klaim bahwa website SPI sudah
lulus atau gagal. Ukur pada halaman dan kondisi yang representatif.

## 13.3 Mobile responsiveness

Uji sekurang-kurangnya: - Homepage. - Semua halaman program. - Showcase
proyek. - Formulir trial. - Halaman lokasi. - FAQ. - Menu mobile. -
Footer.

Periksa: - Tidak ada horizontal overflow. - Heading tidak terpotong. -
Tombol mudah ditekan. - Form field nyaman digunakan. - Kartu tidak
terlalu padat. - Gambar tidak merusak layout. - CTA penting mudah
ditemukan. - Interaksi bekerja dengan touch. - Konten tetap bisa
dipahami tanpa hover.

## 13.4 Accessibility

Periksa: - Kontras teks. - Keyboard navigation. - Focus state. -
Struktur heading. - Label formulir. - Pesan error yang dapat dibaca
teknologi bantu. - Alt text. - Link yang memiliki label bermakna. -
Penggunaan warna yang tidak menjadi satu-satunya penanda. - Reduced
motion. - Komponen interaktif yang dapat dioperasikan dengan keyboard. -
Bahasa halaman dan atribut bahasa yang benar.

## 13.5 Kinerja

-   Kompres gambar.
-   Gunakan format gambar modern bila sesuai.
-   Hindari JavaScript berlebihan.
-   Lazy-load media yang tidak berada di area awal jika tepat.
-   Kurangi font dan dependency yang tidak diperlukan.
-   Jangan menjalankan animasi berat di seluruh halaman.
-   Pastikan fitur AI Idea Generator memiliki batas waktu, error state,
    dan fallback yang layak.
-   Uji jaringan lambat dan perangkat mobile.

------------------------------------------------------------------------

# 14. Konten dan Editorial Governance

## 14.1 Standar konten

Setiap klaim harus dapat menjawab: - Apa yang dimaksud? - Siapa yang
mendapatkan manfaat? - Apa bukti atau contoh konkretnya? - Apakah
informasi masih berlaku? - Siapa pemilik informasi yang
memverifikasinya? - Kapan terakhir diperbarui?

## 14.2 Hal yang tidak boleh tampil pada website publik

-   Placeholder.
-   Instruksi internal editorial.
-   Lorem ipsum.
-   Nomor telepon contoh.
-   Klaim yang belum diverifikasi.
-   Logo mitra tanpa izin atau hubungan yang jelas.
-   Testimoni yang direkayasa.
-   Daftar cabang yang tidak aktif atau belum dikonfirmasi.
-   Link yang rusak.
-   Event lama yang ditampilkan seolah-olah akan datang.
-   Pesan "coming soon" tanpa nilai bagi pengguna jika section dapat
    dihilangkan.
-   Campuran bahasa yang tidak disengaja.

## 14.3 Pengelolaan pembaruan

Tentukan pemilik untuk: - Program dan kurikulum. - Harga dan jadwal. -
Kontak dan lokasi. - Testimoni dan izin publikasi. - Karya siswa. -
Profil mentor. - Kemitraan. - Event. - Terjemahan. - SEO dan metadata.

Setiap perubahan penting harus diperiksa sebelum publikasi.

------------------------------------------------------------------------

# 15. Measurement Plan dan KPI

Jangan mengandalkan kesan subjektif saja. Setelah perbaikan dasar, ukur
perilaku pengguna.

## 15.1 KPI funnel B2C

-   Pengunjung homepage.
-   Klik ke halaman program.
-   Pengunjung halaman program.
-   Klik Free Trial.
-   Formulir trial dimulai.
-   Formulir trial berhasil dikirim.
-   Klik WhatsApp.
-   Prospek yang berhasil dihubungi.
-   Trial terjadwal.
-   Trial dihadiri.
-   Pendaftaran setelah trial.

## 15.2 KPI funnel B2B

-   Kunjungan ke halaman InSchool.
-   Klik konsultasi.
-   Formulir konsultasi dimulai.
-   Formulir konsultasi berhasil.
-   Prospek sekolah yang memenuhi kriteria.
-   Pertemuan yang terjadwal.
-   Proposal yang dikirim.
-   Kemitraan yang disepakati.

## 15.3 KPI konten dan produk

-   Kunjungan ke halaman showcase.
-   Interaksi dengan proyek.
-   Klik ke studi kasus.
-   Klik ke roadmap.
-   Pertanyaan FAQ yang dibuka.
-   Penggunaan AI Idea Generator, jika fitur aktif.
-   Penggunaan program finder, jika dibuat.

## 15.4 Prinsip pengukuran

-   Definisikan event sebelum memasang analytics.
-   Hindari menghitung klik sebagai konversi akhir.
-   Gunakan event yang tidak mengandung data pribadi yang tidak perlu.
-   Jangan membuat target angka tanpa baseline.
-   Catat perubahan desain dan tanggal rilis agar hasil dapat
    dibandingkan.
-   A/B testing dilakukan setelah masalah kredibilitas dan fungsi dasar
    dibereskan.

------------------------------------------------------------------------

# 16. Roadmap Implementasi

Roadmap ini merupakan usulan prioritas. Durasi aktual perlu disesuaikan
dengan ukuran tim, kapasitas, dan kondisi kode.

## Phase 0: Audit dan baseline

-   Inventarisasi halaman, route, komponen, dan aset.
-   Dokumentasikan semua CTA dan tujuan link.
-   Periksa konten aktual pada desktop dan mobile.
-   Catat bagian KEEP, STRENGTHEN, FIX, dan ADD.
-   Verifikasi semua klaim dan data operasional.
-   Ambil baseline analytics dan performa jika tersedia.

**Output:** audit terverifikasi, daftar masalah, dan daftar risiko.

## Phase 1: Trust and accuracy

-   Hapus placeholder.
-   Hapus instruksi editorial.
-   Verifikasi kontak dan lokasi.
-   Verifikasi mitra dan pencapaian.
-   Perbaiki konten berulang.
-   Verifikasi domain kanonis dan redirect.
-   Uji formulir dan link.

**Output:** website publik tidak menampilkan konten contoh atau
informasi yang belum valid.

## Phase 2: Positioning and conversion

-   Perjelas hero.
-   Perjelas empat produk.
-   Pisahkan jalur B2C dan B2B.
-   Perjelas manfaat, kurikulum, dan output.
-   Perbaiki Free Trial.
-   Perjelas CTA sekolah dan kemitraan.

**Output:** pengunjung lebih mudah memahami produk dan langkah
berikutnya.

## Phase 3: Learning proof and storytelling

-   Bangun showcase proyek siswa.
-   Buat studi kasus yang menjelaskan proses berpikir.
-   Perjelas Think → Build → Innovate.
-   Perbaiki roadmap.
-   Tambahkan profil mentor dan metode yang terverifikasi.
-   Tambahkan testimoni autentik jika tersedia.

**Output:** positioning SPI didukung bukti pembelajaran.

## Phase 4: Visual system and responsive design

-   Tetapkan design tokens.
-   Rapikan tipografi dan spacing.
-   Standarkan komponen.
-   Perbaiki mobile.
-   Optimalkan gambar dan animasi.
-   Terapkan reduced motion.
-   Audit aksesibilitas.

**Output:** pengalaman visual yang konsisten dan mudah digunakan.

## Phase 5: Technical optimization and measurement

-   SEO teknis.
-   Core Web Vitals.
-   Analytics dan event tracking.
-   Pengujian funnel.
-   A/B testing yang memiliki hipotesis jelas.
-   Audit berkala terhadap konten dan link.

**Output:** website dapat dioptimalkan berdasarkan bukti, bukan asumsi.

------------------------------------------------------------------------

# 17. Acceptance Criteria

Website tidak dianggap selesai hanya karena tampilannya sudah
diperbarui.

## 17.1 Trust and content

-   [ ] Tidak ada placeholder yang terlihat publik.
-   [ ] Tidak ada instruksi editorial internal.
-   [ ] Testimoni memiliki dasar nyata dan izin publikasi yang sesuai.
-   [ ] Kontak, alamat, jadwal, harga, dan lokasi diverifikasi.
-   [ ] Semua klaim dan logo mitra memiliki dasar yang jelas.
-   [ ] Tidak ada konten berulang tanpa tujuan.
-   [ ] Tidak ada link rusak pada alur penting.

## 17.2 Brand and product

-   [ ] Hero menjelaskan manfaat SPI dengan jelas.
-   [ ] Positioning computational thinking terlihat.
-   [ ] Think → Build → Innovate dijelaskan melalui contoh nyata.
-   [ ] SPI Core, Lab, Engineering, dan InSchool memiliki perbedaan yang
    jelas.
-   [ ] Setiap program menyebut audiens, manfaat, dan hasil belajar.
-   [ ] Jalur B2C dan B2B dibedakan.

## 17.3 Conversion

-   [ ] CTA Free Trial mudah ditemukan.
-   [ ] Proses Free Trial dijelaskan.
-   [ ] Formulir berfungsi dan memiliki state error/success.
-   [ ] WhatsApp mengarah ke nomor resmi.
-   [ ] Jalur konsultasi sekolah bekerja.
-   [ ] Analytics tidak menganggap klik sebagai pendaftaran selesai.

## 17.4 Learning proof

-   [ ] Showcase memakai karya yang terverifikasi.
-   [ ] Proyek menjelaskan tantangan dan proses berpikir.
-   [ ] Roadmap sesuai kurikulum resmi.
-   [ ] Profil mentor akurat.
-   [ ] Tidak ada hasil belajar yang dijanjikan secara berlebihan.

## 17.5 Visual and technical

-   [ ] Design tokens konsisten.
-   [ ] Tidak ada horizontal overflow pada mobile.
-   [ ] Keyboard navigation berfungsi.
-   [ ] Focus state terlihat.
-   [ ] Kontras dan label aksesibilitas diperiksa.
-   [ ] Reduced motion didukung.
-   [ ] Performa diukur, bukan ditebak.
-   [ ] SEO teknis dan canonical diperiksa.
-   [ ] Selector bahasa dan semua terjemahan berfungsi jika multilingual
    aktif.

------------------------------------------------------------------------

# 18. Master Prompt untuk AI atau Tim Desain yang Mengimplementasikan DESIGN.md

Gunakan instruksi berikut ketika meminta AI coding assistant, designer,
atau developer mengevaluasi dan mengimplementasikan website SPI.

## Persona

Bertindak sebagai tim multidisiplin yang terdiri dari: - Principal
Product Designer. - Senior UX Researcher. - Senior UI Designer. - Brand
Strategist. - Education Product Strategist. - Conversion Rate
Optimization Specialist. - Content Strategist. - Technical SEO
Specialist. - Accessibility Specialist. - Frontend Architect. - QA
Engineer.

Tim memiliki pengalaman mendesain website pendidikan dan produk digital
yang berorientasi pada kejelasan, kredibilitas, aksesibilitas, performa,
dan konversi.

## Konteks

Sekolah Programming Indonesia adalah lembaga pendidikan yang ingin
mengembangkan computational thinking untuk generasi AI-native.
Positioning-nya adalah **"A School of Thinking, with Coding as the
Tool."** Kerangka belajarnya **Think → Build → Innovate**.

Ekosistem produk: - SPI Core. - SPI Lab. - SPI Engineering. - SPI
InSchool.

Tujuan website: - Membantu orang tua dan siswa memahami manfaat dan
program. - Menunjukkan bukti hasil belajar melalui proyek nyata. -
Meningkatkan kepercayaan. - Meningkatkan pendaftaran Free Trial. -
Membuka jalur konsultasi dan kemitraan sekolah. - Menampilkan identitas
SPI yang konsisten dan berbeda dari sekolah coding lain.

## Instruksi kerja

1.  Audit implementasi aktual terlebih dahulu sebelum mengubah kode.
2.  Baca seluruh route, komponen, design tokens, aset, data, dan
    business logic yang relevan.
3.  Inventarisasi apa yang sudah ada.
4.  Kelompokkan temuan menjadi KEEP, STRENGTHEN, FIX, dan ADD.
5.  Jangan menghapus fitur yang masih berfungsi tanpa alasan yang jelas.
6.  Jangan membuat ulang seluruh website hanya demi tampilan yang
    berbeda.
7.  Perbaiki P0 terlebih dahulu: placeholder, konten editorial, kontak,
    klaim, domain, dan alur penting.
8.  Perbaiki positioning dan perbedaan produk sebelum mengerjakan
    dekorasi.
9.  Tampilkan proyek nyata dan jelaskan proses berpikirnya.
10. Gunakan benchmark hanya sebagai prinsip, bukan untuk menyalin
    desain, konten, kode, atau identitas merek.
11. Jangan mengarang data, harga, jadwal, lokasi, testimoni, mitra,
    statistik, atau pencapaian.
12. Jika data belum tersedia, tandai sebagai kebutuhan data dan jangan
    tampilkan sebagai fakta.
13. Jaga responsivitas, aksesibilitas, performa, dan konsistensi bahasa.
14. Uji seluruh CTA, form, link, menu, dan state interaksi.
15. Laporkan apa yang diubah, alasan perubahan, file yang terdampak,
    risiko, hasil pengujian, dan hal yang masih belum terverifikasi.

## Output yang harus dihasilkan

-   Audit kondisi awal.
-   Daftar masalah dengan tingkat prioritas.
-   Rekomendasi per halaman dan per section.
-   Struktur informasi.
-   Design tokens dan component system.
-   Content specification.
-   Implementasi atau desain yang konsisten dengan sistem tersebut.
-   QA checklist.
-   Daftar data yang perlu dikonfirmasi oleh tim SPI.
-   Ringkasan perubahan dan bukti pengujian.

## Aturan desain

-   Gunakan SPI Blue `#176DF8`, Dark Navy `#041A5A`, Accent Yellow
    `#FFC928`, White `#FFFFFF`, dan Light Gray `#F7F8FC` sebagai arah
    awal, setelah token final disetujui.
-   Utamakan keterbacaan, hierarki, dan ruang kosong.
-   Gunakan visual nyata jika tersedia.
-   Jangan membuat UI penuh kartu generik.
-   Jangan menambahkan animasi yang tidak membantu.
-   Dukung reduced motion.
-   Jangan menjadikan hover sebagai satu-satunya interaksi.
-   Jangan mengorbankan kecepatan demi efek visual.
-   Pastikan desain dapat digunakan pada layar kecil.

## Aturan konten dan bahasa

-   Jangan ada placeholder yang terlihat publik.
-   Jangan ada klaim yang tidak terverifikasi.
-   Jangan ada instruksi internal yang tampil ke pengunjung.
-   Jangan ada tautan atau CTA palsu.
-   Bahasa Indonesia harus konsisten saat mode ID aktif.
-   Bahasa Inggris harus konsisten saat mode EN aktif.
-   Bahasa Mandarin harus menggunakan Mandarin Sederhana saat mode CN
    aktif.
-   Selector bahasa harus persis `🇮🇩 ID`, `🇬🇧 EN`, `🇨🇳 CN`.
-   Nama resmi produk dan merek dipertahankan.

------------------------------------------------------------------------

# 19. Referensi dan Jejak Sumber Benchmark

Daftar berikut mencatat referensi pencarian yang digunakan dalam
analisis awal. Ini adalah jejak sumber untuk membantu verifikasi ulang,
bukan pengganti audit langsung terhadap setiap halaman. Konten dan fitur
situs dapat berubah.

## SPI

-   Homepage: https://www.sekolahprogrammingindonesia.com/
-   Referensi konten terindeks SPI: `turn952910search0`,
    `turn952910search1`
-   Pemeriksaan variasi domain: `turn794961view1`

## Sekolah coding dan pendidikan

-   Kalananti: `turn571418search0`, `turn571418search6`,
    `turn571418search14`
-   Codepolitan: `turn571418search1`, `turn571418search7`
-   Hacktiv8: `turn571418search2`, `turn571418search8`,
    `turn571418search9`
-   Ruang GTK: `turn571418search3`
-   Timedoor Academy: `turn571418search4`, `turn571418search13`
-   Koding Next: `turn571418search5`, `turn571418search15`
-   KodeKiddo: `turn571418search11`

## Learning platforms dan interactive learning

-   Genially: `turn887789search0`, `turn887789search1`,
    `turn887789search2`, `turn887789search17`, `turn887789search19`
-   Kodland: `turn887789search3`, `turn887789search6`,
    `turn887789search10`, `turn887789search13`, `turn887789search14`
-   TED-Ed: `turn887789search5`, `turn887789search9`,
    `turn887789search15`, `turn887789search16`, `turn887789search20`
-   Khan Academy: `turn887789search7`, `turn887789search11`
-   Neal.fun: `turn887789search21`
-   Code.org: `turn874340search0`, `turn874340search1`,
    `turn874340search8`

## Teknologi dan desain

-   Xiaomi: `turn887789search4`, `turn887789search8`
-   Apple: `turn887789search18`

## Performa web

-   Core Web Vitals thresholds: dokumentasi web.dev, termasuk LCP ≤ 2,5
    detik, INP ≤ 200 ms, dan CLS ≤ 0,1. Verifikasi ambang terbaru saat
    audit teknis dilaksanakan.

------------------------------------------------------------------------

# 20. Penutup: Prinsip yang Tidak Boleh Hilang

SPI tidak perlu menjadi tiruan Ruangguru, Koding Next, Dicoding, Khan
Academy, Apple, atau platform lainnya. Setiap referensi memiliki konteks
dan kekuatannya masing-masing.

SPI harus mengambil prinsip yang relevan: - Dari Koding Next dan
Kalananti: kejelasan program dan trial. - Dari Dicoding dan Codepolitan:
learning path, kompetensi, dan portofolio. - Dari Khan Academy: progres
belajar dan penguasaan kompetensi. - Dari TED-Ed: storytelling
edukatif. - Dari Genially dan Neal.fun: interaksi yang menumbuhkan rasa
ingin tahu. - Dari Apple: disiplin visual dan satu pesan utama per
section. - Dari Samsung: penjelasan ekosistem produk. - Dari Singapore
Government: ketercarian dan kejelasan informasi. - Dari Hacktiv8:
outcome dan pemisahan audiens individu dengan organisasi. - Dari
organisasi sosial: cerita dampak yang autentik dan dapat
dipertanggungjawabkan.

Namun diferensiasi SPI tetap harus menjadi pusat semua keputusan.

**SPI bukan hanya tempat belajar menulis kode. SPI adalah tempat siswa
belajar berpikir, membangun, menguji, memperbaiki, dan menciptakan
solusi dengan teknologi.**

Setiap halaman, komponen, gambar, animasi, teks, CTA, kurikulum, dan
bukti sosial harus membantu pengunjung memahami dan mempercayai gagasan
tersebut.

Jika suatu elemen tidak memperjelas positioning, tidak membantu
pengguna, tidak menunjukkan bukti, tidak mempermudah keputusan, dan
tidak mendukung tujuan pembelajaran atau bisnis, evaluasi kembali apakah
elemen tersebut benar-benar diperlukan.

**Prinsip final: clarity before decoration, evidence before claims,
learning before technology lists, and trust before conversion tricks.**
