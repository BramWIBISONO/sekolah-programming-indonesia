const urls = [
  "https://innindonesia.com/2022/10/28/terapkan-computational-thinking-dalam-pembelajaran-sekolah-programming-indonesia-siap-cetak-sdm-handal-di-bidang-teknologi/",
  "https://innindonesia.com/2022/10/17/wow-christoper-dari-sekolah-programming-indonesia-sulap-rongsokan-jadi-pet-feeder/",
  "https://innindonesia.com/2022/10/31/belajar-programming-di-spi-jocelyn-purnomo-cipta-aplikasi-belajar-baca/",
  "https://innindonesia.com/2025/12/03/siswi-homeschooling-raih-project-terfavorit-di-inovation-fest/",
  "https://innindonesia.com/2025/10/18/infest-2025-melatih-generasi-pencipta-teknologi-bukan-sekadar-pengguna/",
  "https://innindonesia.com/2024/12/20/bersama-spi-solo-menuju-masa-depan-cerah-dengan-teknologi-the-future-is-now/",
  "https://innindonesia.com/2026/05/04/quo-vadis-pendidikan-musik-di-era-ai-rekonfigurasi-kreativitas-literasi-teknis-dan-taksonomi-pembelajaran/",
  "https://innindonesia.com/2025/11/13/ai-sebagai-komposer-baru-krisis-revolusi-dan-reinterpretasi-musikalitas/"
];

async function fetchOgImage(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const match = text.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
}

async function run() {
  const results = {};
  for (const url of urls) {
    const img = await fetchOgImage(url);
    results[url] = img;
  }
  console.log(JSON.stringify(results, null, 2));
}

run();
