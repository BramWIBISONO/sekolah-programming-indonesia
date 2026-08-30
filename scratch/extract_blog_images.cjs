const https = require('https');

const urls = {
  christopherPetFeeder: "https://innindonesia.com/2022/10/17/wow-christoper-dari-sekolah-programming-indonesia-sulap-rongsokan-jadi-pet-feeder/",
  computationalThinking: "https://innindonesia.com/2022/10/28/terapkan-computational-thinking-dalam-pembelajaran-sekolah-programming-indonesia-siap-cetak-sdm-handal-di-bidang-teknologi/",
  jocelynBelajarBaca: "https://innindonesia.com/2022/10/31/belajar-programming-di-spi-jocelyn-purnomo-cipta-aplikasi-belajar-baca/",
  innovationFest: "https://innindonesia.com/2025/12/03/siswi-homeschooling-raih-project-terfavorit-di-inovation-fest/",
  infest2025: "https://innindonesia.com/2025/10/18/infest-2025-melatih-generasi-pencipta-teknologi-bukan-sekadar-pengguna/",
  spiSolo: "https://innindonesia.com/2024/12/20/bersama-spi-solo-menuju-masa-depan-cerah-dengan-teknologi-the-future-is-now/",
  aiMusicEducation: "https://innindonesia.com/2026/05/04/quo-vadis-pendidikan-musik-di-era-ai-rekonfigurasi-kreativitas-literasi-teknis-dan-taksonomi-pembelajaran/",
  aiComposer: "https://innindonesia.com/2025/11/13/ai-sebagai-komposer-baru-krisis-revolusi-dan-reinterpretasi-musikalitas/"
};

function fetchImage(key, url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const match = html.match(/<meta\s+property=\"og:image\"\s+content=\"([^\"]+)\"/i) || 
                      html.match(/<meta\s+name=\"twitter:image\"\s+content=\"([^\"]+)\"/i);
        if (match) {
          resolve({ key, image: match[1] });
        } else {
          resolve({ key, image: null });
        }
      });
    }).on('error', () => resolve({ key, image: null }));
  });
}

async function run() {
  const results = {};
  for (const [key, url] of Object.entries(urls)) {
    const res = await fetchImage(key, url);
    results[res.key] = res.image;
    console.log(res.key, '->', res.image);
  }
  console.log('RESULTS:', JSON.stringify(results, null, 2));
}

run();
