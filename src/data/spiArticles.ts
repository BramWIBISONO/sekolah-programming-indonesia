/**
 * Articles written by the SPI team. The text is Indonesian; the interface around it is translated.
 * Every statement comes from what SPI already publishes on the site (programs, pathway, AI literacy) or from the
 * Digital Promise AI Literacy Framework. There are no invented students, results, figures or testimonials.
 */
export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface SpiArticle {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  sections: ArticleSection[];
  source?: { label: string; href: string };
}

export const SPI_ARTICLES: SpiArticle[] = [
  {
    slug: 'computational-thinking-lebih-dari-coding',
    category: 'Computational Thinking',
    title: 'Computational Thinking: lebih penting daripada sekadar coding',
    excerpt: 'Coding adalah alat. Yang membuat anak mampu memakai alat itu dengan baik adalah cara berpikirnya.',
    sections: [
      {
        heading: 'Apa itu Computational Thinking?',
        paragraphs: [
          'Computational Thinking (CT) adalah cara berpikir untuk memahami sebuah masalah, memecahnya menjadi bagian yang lebih kecil, menyusun langkah penyelesaiannya, membuat model, lalu menguji solusinya.',
          'CT bukan sekadar coding. Komputer hanyalah salah satu tempat cara berpikir ini dipakai. Anak yang terbiasa berpikir terstruktur akan membawanya ke pelajaran matematika, menulis cerita, menyusun rencana belajar, atau mengatur kegiatan sehari-hari.',
        ],
      },
      {
        heading: 'Empat kebiasaan yang bisa dilatih',
        paragraphs: ['Kebiasaan ini bisa dilatih sejak kecil, bahkan sebelum anak menyentuh laptop.'],
        bullets: [
          'Memecah masalah: membagi tugas besar menjadi langkah-langkah yang bisa dikerjakan satu per satu.',
          'Mengenali pola: melihat kesamaan dalam urutan, bentuk, atau kejadian, lalu memakainya untuk memperkirakan apa yang terjadi berikutnya.',
          'Menyederhanakan: membuang detail yang tidak penting supaya inti masalahnya terlihat.',
          'Menyusun langkah: menulis urutan tindakan yang jelas, yang bisa diikuti orang lain atau mesin.',
        ],
      },
      {
        heading: 'Contoh sederhana di rumah',
        paragraphs: [
          'Menyiapkan sarapan adalah contoh algoritma yang sering kita lakukan tanpa sadar: ambil piring, isi nasi, tambahkan lauk, lalu sajikan. Jika urutannya diubah, hasilnya bisa berbeda. Dari sini anak belajar bahwa urutan langkah itu penting.',
          'Saat menyusun puzzle, anak juga melatih dekomposisi. Ia tidak mulai dari potongan acak, tetapi mengelompokkan warna atau bentuk lebih dulu. Itu cara memecah masalah besar menjadi bagian kecil.',
        ],
      },
      {
        heading: 'Bagaimana orang tua dan guru bisa membantu',
        paragraphs: [
          'Pertanyaan yang baik lebih membantu daripada jawaban yang langsung diberikan. Coba tanyakan: "Langkah pertama yang kamu lakukan apa?" atau "Kalau hasilnya belum sesuai, bagian mana yang bisa kita coba ubah?"',
          'Biarkan anak mencoba ulang saat salah. Kesalahan adalah bagian dari proses berpikir, dan cara memperbaikinya sering lebih berharga daripada hasil yang benar di percobaan pertama.',
        ],
      },
      {
        heading: 'Bagaimana SPI melatihnya',
        paragraphs: [
          'Di SPI Core, pembelajaran dimulai dari fondasi berpikir. Untuk anak yang masih kecil, logika dasar, pola, dan kreativitas dilatih lewat aktivitas visual dan permainan edukatif. Setelah itu, siswa berkembang melalui tiga tahap: berpikir, membangun, lalu menciptakan dampak.',
        ],
      },
    ],
  },
  {
    slug: 'panduan-orang-tua-mendampingi-anak-menggunakan-ai',
    category: 'Untuk Orang Tua',
    title: 'Panduan orang tua mendampingi anak menggunakan AI',
    excerpt: 'AI sudah ada di ponsel dan tablet anak. Pendampingan yang tepat membuat AI menjadi alat belajar, bukan sekadar jawaban instan.',
    sections: [
      {
        heading: 'Mulai dari tujuannya',
        paragraphs: [
          'Sebelum anak memakai AI, tanyakan dulu: apa yang ingin ia pelajari atau kerjakan? Pertanyaan ini membantu anak melihat perbedaan antara meminta jawaban dan meminta bantuan untuk memahami sesuatu.',
        ],
      },
      {
        heading: 'Ajak anak memeriksa jawaban AI',
        paragraphs: [
          'AI bisa keliru, dan kekeliruannya sering terdengar meyakinkan. Biasakan anak bertanya, "Dari mana kita tahu ini benar?" Periksa fakta penting melalui sumber yang dapat dipercaya, misalnya buku, sumber resmi, atau gurunya.',
        ],
      },
      {
        heading: 'Jaga data pribadi anak',
        paragraphs: [
          'Jangan memasukkan data pribadi anak ke alat AI tanpa dasar dan izin yang jelas. Yang termasuk di sini antara lain nama lengkap, alamat, nama sekolah, nomor telepon, dan foto. Data anak perlu perhatian khusus.',
        ],
      },
      {
        heading: 'Minta anak menjelaskan ulang',
        paragraphs: [
          'Setelah AI memberi jawaban, minta anak menjelaskannya dengan kata-katanya sendiri. Jika ia bisa menjelaskan prosesnya dan alasannya, berarti ia sedang belajar. Jika belum, ajak ia mencoba lagi bersama.',
        ],
      },
      {
        heading: 'Tentukan kapan AI dipakai dan kapan tidak',
        paragraphs: [
          'Setiap keluarga bisa menyepakati aturannya sendiri. Contohnya: AI boleh dipakai untuk mencoba ide atau mencari contoh, tetapi tugas yang harus dipikirkan sendiri tetap dikerjakan sendiri. Aturan ini bisa disesuaikan seiring anak bertambah besar.',
        ],
      },
      {
        heading: 'Kapan perlu lebih banyak berbicara',
        paragraphs: [
          'Perhatikan jika anak mulai kesulitan membedakan fakta dan jawaban AI, atau mulai menyerahkan semua keputusan kepadanya. Itu tanda anak perlu lebih banyak pendampingan, bukan larangan.',
        ],
      },
    ],
  },
  {
    slug: 'literasi-ai-dari-memakai-ke-memahami',
    category: 'Literasi AI',
    title: 'Dari memakai ke memahami: apa itu literasi AI?',
    excerpt: 'Memakai AI itu mudah. Memahami kapan AI membantu, kapan ia keliru, dan bagaimana memeriksanya, itulah literasi AI.',
    sections: [
      {
        heading: 'Definisinya',
        paragraphs: [
          'Literasi AI adalah kemampuan memahami, berinteraksi dengan, dan mengevaluasi sistem kecerdasan buatan secara kritis dan bertanggung jawab. Ini lebih dari sekadar bisa mengoperasikan aplikasinya.',
        ],
      },
      {
        heading: 'Tiga cara berinteraksi dengan AI',
        paragraphs: [
          'AI Literacy Framework dari Digital Promise membagi cara orang berinteraksi dengan AI menjadi tiga: memahami cara kerja dan kemampuan AI, mengevaluasi apakah sebuah alat andal, adil, dan sesuai tujuan, serta menggunakannya untuk mencapai tujuan yang jelas.',
          'Tujuan penggunaannya pun beragam: berinteraksi, berkreasi, dan memecahkan masalah.',
        ],
      },
      {
        heading: 'Memakai dan memahami itu berbeda',
        paragraphs: ['Perbedaannya terlihat dari kebiasaan sehari-hari:'],
        bullets: [
          'Menyalin jawaban yang dihasilkan, atau memeriksa dan menilai jawaban itu.',
          'Menganggap keluaran AI selalu benar, atau memahami keterbatasan dan potensi kesalahannya.',
          'Mengejar hasil secepat mungkin, atau memahami proses, menguji, dan memperbaiki hasilnya.',
          'Menyerahkan keputusan kepada AI, atau mempertahankan tanggung jawab dan penilaian manusia.',
        ],
      },
      {
        heading: 'Kenapa penting sekarang',
        paragraphs: [
          'AI sudah ada di sekitar kita: chatbot, pembuat gambar, asisten menulis, analisis data, dan otomasi. Kemampuan mengakses teknologi tidak otomatis berarti seseorang tahu cara memakainya dengan baik.',
          'Literasi AI membantu seseorang menghindari informasi yang keliru, menjaga data pribadi, memperhatikan hak cipta dan bias, serta tetap menjadi pengambil keputusan.',
        ],
      },
      {
        heading: 'Gerakan AI Literacy Indonesia',
        paragraphs: [
          'SPI sedang menyiapkan Gerakan AI Literacy Indonesia, yang dibuka pada 28 Oktober, bertepatan dengan Hari Sumpah Pemuda. Detail gerakan, termasuk indikator dan metode pengukurannya, akan diumumkan setelah ditinjau.',
        ],
      },
    ],
    source: {
      label: 'AI Literacy Framework, Digital Promise',
      href: 'https://digitalpromise.org/initiative/artificial-intelligence-in-education/ai-literacy/',
    },
  },
  {
    slug: 'jalur-belajar-spi-dari-pemula-ke-inovator',
    category: 'Jalur Belajar',
    title: 'Jalur belajar SPI: dari pemula sampai inovator',
    excerpt: 'Setiap anak memulai dari titik yang berbeda. Jalurnya bertahap, dari fondasi berpikir sampai spesialisasi dan penelitian.',
    sections: [
      {
        heading: 'Mulai dari titik yang sesuai',
        paragraphs: [
          'Tidak semua anak memulai dari tempat yang sama. Sebagian sudah akrab dengan gawai, sebagian belum pernah menyentuh pemrograman. Jalur SPI disusun bertahap, sehingga setiap siswa bisa mulai dari kemampuannya, bukan dari label usianya.',
        ],
      },
      {
        heading: 'Preschool: fondasi berpikir',
        paragraphs: [
          'Tahap awal berfokus pada logika dasar, pola, kreativitas, permainan visual, dan berhitung awal. Semuanya dilatih lewat aktivitas dan permainan edukatif.',
        ],
      },
      {
        heading: 'Foundation: berpikir dan membangun',
        bullets: [
          'Build the Brain: pemrograman blok, dengan konsep algoritma, urutan, variabel, logika, dan perulangan.',
          'Connect the Body: robotika dan Arduino, dengan input-output digital, sensor, motor, dan otomatisasi.',
          'Create the Experience: pengembangan aplikasi mobile dengan MIT App Inventor, dengan antarmuka, komponen, aliran data, dan basis data.',
        ],
      },
      {
        heading: 'Development: membangun solusi digital',
        bullets: [
          'Think with Python: logika, OOP, struktur data, dan aplikasi desktop.',
          'Build for the Web: HTML, CSS, JavaScript, DOM, antarmuka responsif, dan deployment.',
          'Connect Smart Systems: Python, ESP32, MQTT, sensor, dan otomatisasi IoT.',
          'Build Intelligent Systems: literasi data, dasar machine learning, prompt engineering, dan pengembangan AI.',
        ],
      },
      {
        heading: 'Exploration: memilih bidang',
        paragraphs: [
          'Pada tahap ini siswa dibantu memilih dan mendalami bidang yang sesuai dengan minat, kemampuan, dan tujuannya, misalnya AI, machine learning, web development, mobile apps, robotika, atau game development.',
        ],
      },
      {
        heading: 'Research: menciptakan dampak',
        paragraphs: [
          'Kompetensi yang sudah dibangun dipakai untuk penelitian, pengembangan inovasi, dan solusi nyata, misalnya makalah ilmiah, prototipe startup, inovasi sosial, proyek industri, atau kompetisi.',
        ],
      },
      {
        heading: 'Catatan',
        paragraphs: [
          'Jalur ini menggambarkan kemungkinan langkah yang bisa ditempuh siswa sesuai kesiapan dan minatnya, bukan jadwal wajib. Konsultasi program di awal membantu menentukan titik mulai yang paling tepat.',
        ],
      },
    ],
  },
];

export const getArticle = (slug: string): SpiArticle | undefined => SPI_ARTICLES.find((a) => a.slug === slug);
