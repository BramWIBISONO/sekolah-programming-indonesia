import { run } from './db.js';

const seed = async () => {
  const achievements = [
    {
      title: 'Juara 2 STEAM National Competition Sampoerna Academy 2024',
      heading: 'Juara 2 STEAM National Competition Sampoerna Academy 2024',
      year: '2024',
      category: 'SD',
      level: 'National',
      rank_label: 'Juara 2',
      status: 'published'
    },
    {
      title: 'Juara 2 STEAM National Competition Sampoerna Academy 2025',
      heading: 'Juara 2 STEAM National Competition Sampoerna Academy 2025',
      year: '2025',
      category: 'SD',
      level: 'National',
      rank_label: 'Juara 2',
      status: 'published'
    },
    {
      title: 'Juara 2 STEAM National Competition Sampoerna Academy 2025',
      heading: 'Juara 2 STEAM National Competition Sampoerna Academy 2025',
      year: '2025',
      category: 'SMP',
      level: 'National',
      rank_label: 'Juara 2',
      status: 'published'
    },
    {
      title: 'Juara 1 Kategori Robotik Ajang Kreatifitas Pemuda Kota Jakarta Barat',
      heading: 'Juara 1 Kategori Robotik Ajang Kreatifitas Pemuda Kota Jakarta Barat',
      year: 'N/A',
      category: 'Robotik',
      level: 'Local',
      rank_label: 'Juara 1',
      status: 'published'
    },
    {
      title: '10 Besar National Competition Sampoerna Academy 2025',
      heading: '10 Besar National Competition Sampoerna Academy 2025',
      year: '2025',
      category: 'SMA',
      level: 'National',
      rank_label: '10 Besar',
      status: 'published'
    }
  ];

  for (const ach of achievements) {
    await run(
      `INSERT INTO achievements (title, heading, year, category, level, rank_label, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [ach.title, ach.heading, ach.year, ach.category, ach.level, ach.rank_label, ach.status]
    );
  }
  console.log('Seed complete.');
};

seed().catch(console.error);
