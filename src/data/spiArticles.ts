/**
 * Articles written by the SPI team. The text is Indonesian; the interface around it is translated.
 * Every statement comes from what SPI already publishes on the site (programs, pathway, AI literacy) or from the
 * Digital Promise AI Literacy Framework. There are no invented students, results, figures or testimonials.
 */
import type { SpiIconName } from '../components/illustrations/SpiIcon';

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface SpiArticle {
  slug: string;
  category: string;
  /** Icon shown on the article card when there is no cover image. */
  icon?: SpiIconName;
  title: string;
  excerpt: string;
  sections: ArticleSection[];
  source?: { label: string; href: string };
}

export const SPI_ARTICLES: SpiArticle[] = [
  {
    slug: 'computational-thinking-lebih-dari-coding',
    category: 'Computational Thinking',
    icon: 'think',
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
    icon: 'community',
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
    icon: 'ai',
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
    icon: 'grad',
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
  {
    slug: 'apa-artinya-generasi-ai-native',
    category: 'AI Native',
    icon: 'innovate',
    title: 'Apa artinya generasi AI-native untuk anak kita?',
    excerpt: 'Anak yang tumbuh bersama AI perlu lebih dari kemampuan memakai aplikasi. Mereka perlu cara berpikir yang kritis dan kemampuan membangun sesuatu sendiri.',
    sections: [
      {
        heading: 'AI-native itu apa?',
        paragraphs: [
          'AI-native menggambarkan generasi yang tumbuh ketika AI sudah ada di sekitar mereka: di mesin pencari, di aplikasi belajar, di kamera ponsel, dan di rekomendasi tontonan. Bagi mereka, AI bukan teknologi baru yang harus dipelajari dari nol, melainkan bagian dari keseharian.',
          'Namun, sekadar akrab dengan AI belum berarti paham cara kerjanya. Pertanyaan yang lebih penting bukan lagi "anak bisa memakai AI atau tidak", melainkan "anak paham apa yang sedang ia pakai".',
        ],
      },
      {
        heading: 'Tiga kemampuan yang perlu dilatih',
        bullets: [
          'Berpikir kritis: memeriksa jawaban AI, tidak langsung percaya.',
          'Memahami cara kerja: mengerti bahwa sistem belajar dari data dan bisa keliru.',
          'Membangun solusi: memakai AI untuk membuat sesuatu yang nyata, bukan hanya menjadi penonton.',
        ],
      },
      {
        heading: 'Bagaimana SPI memulainya',
        paragraphs: [
          'Di SPI, anak belajar dari logika dan proyek lebih dulu, lalu bertahap menuju AI. Gerakan AI Literacy Indonesia, yang dibuka 28 Oktober, bertepatan dengan Hari Sumpah Pemuda, juga menjadi ruang bagi sekolah dan komunitas untuk ikut belajar tentang AI yang bertanggung jawab.',
        ],
      },
    ],
  },
  {
    slug: 'dari-prompt-ke-proyek-membimbing-anak-memakai-ai',
    category: 'AI Native',
    icon: 'projects',
    title: 'Dari prompt ke proyek: membimbing anak memakai AI tanpa kehilangan logika',
    excerpt: 'Prompt yang baik lahir dari pemahaman masalah. AI paling membantu ketika anak sudah tahu apa yang ingin mereka buat.',
    sections: [
      {
        heading: 'Mulai dari masalah, bukan dari perintah',
        paragraphs: [
          'Anak sering langsung mengetik perintah ke AI sebelum tahu apa yang ingin dicapai. Hasilnya jawaban yang panjang, tetapi tidak selalu sesuai dengan kebutuhan. Ajak anak menuliskan masalahnya dalam satu kalimat dulu, lalu baru bertanya.',
        ],
      },
      {
        heading: 'Pertanyaan yang melatih berpikir',
        bullets: [
          'Apa tujuan dari yang ingin saya buat?',
          'Bagian mana yang paling sulit untuk saya pahami?',
          'Bagaimana saya tahu jawaban ini sudah benar?',
        ],
      },
      {
        heading: 'Dari jawaban ke proyek kecil',
        paragraphs: [
          'Ambil satu jawaban dari AI, ubah menjadi program kecil, lalu uji apakah hasilnya berjalan. Di sinilah logika anak diuji. Kalau hasilnya salah, mereka harus menelusuri langkahnya satu per satu, dan itu justru latihan yang paling berharga.',
        ],
      },
    ],
  },
  {
    slug: 'mengapa-belajar-coding-dimulai-dari-blok',
    category: 'Coding untuk Anak',
    icon: 'build',
    title: 'Mengapa belajar coding dimulai dari blok, bukan langsung teks?',
    excerpt: 'Pemrograman berbasis blok membuat anak fokus pada logika: urutan, perulangan, dan kondisi, tanpa terganggu oleh tanda baca.',
    sections: [
      {
        heading: 'Logika dulu, sintaks kemudian',
        paragraphs: [
          'Dalam pemrograman teks, satu tanda baca yang terlewat bisa membuat program gagal. Anak yang baru belajar bisa kehilangan semangat sebelum sampai ke ide yang ingin mereka buat. Pemrograman berbasis blok, seperti Scratch dan mBlock, mengurangi hambatan itu.',
        ],
      },
      {
        heading: 'Yang dipelajari lewat blok',
        bullets: [
          'Urutan: menjalankan langkah sesuai urutannya.',
          'Perulangan: mengulang pola tanpa menulis ulang langkah yang sama.',
          'Kondisi: menentukan apa yang terjadi jika sesuatu benar atau salah.',
          'Variabel: menyimpan nilai, misalnya skor permainan.',
        ],
      },
      {
        heading: 'Jembatan ke bahasa teks',
        paragraphs: [
          'Konsep yang sudah dipahami di blok akan lebih mudah dikenali saat anak kelak menulis Python atau JavaScript. Di jalur belajar SPI, pemrograman blok dan robotika dipelajari sebelum anak masuk ke pemrograman teks.',
        ],
      },
    ],
  },
  {
    slug: 'debugging-belajar-dari-kesalahan-di-setiap-proyek',
    category: 'Coding untuk Anak',
    icon: 'solver',
    title: 'Debugging: belajar dari kesalahan di setiap proyek',
    excerpt: 'Program yang belum berjalan bukan kegagalan. Itu kesempatan melatih cara berpikir yang paling berguna: menelusuri langkah demi langkah.',
    sections: [
      {
        heading: 'Kesalahan adalah bagian dari proyek',
        paragraphs: [
          'Hampir semua proyek pertama anak tidak langsung berjalan dengan benar. Itu wajar. Yang membedakan adalah apa yang dilakukan setelah program gagal.',
        ],
      },
      {
        heading: 'Langkah menelusuri masalah',
        bullets: [
          'Tuliskan apa yang seharusnya terjadi dan apa yang terjadi sebenarnya.',
          'Periksa bagian kecil satu per satu, mulai dari yang paling dekat dengan masalah.',
          'Ubah satu hal dalam satu waktu, lalu uji lagi.',
          'Catat apa saja yang sudah dicoba, supaya tidak mengulang langkah yang sama.',
        ],
      },
      {
        heading: 'Peran orang tua dan guru',
        paragraphs: [
          'Tidak perlu langsung memberi jawaban. Coba tanyakan, "Coba jelaskan apa yang dilakukan program kamu di bagian ini?" Pertanyaan seperti itu membuat anak berpikir, bukan menunggu.',
        ],
      },
    ],
  },
];

export const getArticle = (slug: string): SpiArticle | undefined => SPI_ARTICLES.find((a) => a.slug === slug);
