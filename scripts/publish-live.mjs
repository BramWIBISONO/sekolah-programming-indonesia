// Publishes the current website branch to the live site (main, which Vercel deploys).
// Run with: npm run publish:live
// Set DRY_RUN=1 to run every check and show each step without pushing anything.
import { execSync } from 'node:child_process';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const BRANCH = 'website-update-2026-10';
const LIVE_BRANCH = 'main';
const DRY_RUN = process.env.DRY_RUN === '1';

const capture = (cmd) => execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

const step = (label, cmd, { remote = false } = {}) => {
  console.log(`\n> ${label}`);
  if (DRY_RUN && remote) {
    console.log(`  (DRY_RUN) would run: ${cmd}`);
    return;
  }
  execSync(cmd, { stdio: 'inherit' });
};

const fail = (message) => {
  console.error(`\nBerhenti: ${message}`);
  process.exit(1);
};

const main = async () => {
  const current = capture('git branch --show-current');
  if (current !== BRANCH) {
    fail(`branch aktif adalah "${current}". Pindah dulu ke "${BRANCH}" dengan: git checkout ${BRANCH}`);
  }

  // graphify-out is generated and changes on every graph query, so it is not counted as a change.
  if (capture('git status --porcelain -- . ":!graphify-out"')) {
    fail('masih ada perubahan yang belum di-commit. Commit dulu, lalu jalankan ulang.');
  }

  step('Mengambil update dari GitHub', 'git fetch origin');

  const behind = Number(capture(`git rev-list --count HEAD..origin/${LIVE_BRANCH}`));
  if (behind > 0) {
    step(`Menggabungkan ${LIVE_BRANCH} terbaru ke ${BRANCH}`, `git merge --no-edit origin/${LIVE_BRANCH}`);
  } else {
    console.log(`\n${LIVE_BRANCH} sudah termasuk di ${BRANCH}, tidak perlu digabung.`);
  }

  step('Mengecek tipe (lint)', 'npm run lint');
  step('Build produksi', 'npm run build');

  step(`Mengirim branch ${BRANCH} ke GitHub`, `git push origin ${BRANCH}`, { remote: true });

  if (DRY_RUN) {
    console.log('\nDRY_RUN selesai. Tidak ada yang dikirim ke GitHub.');
    return;
  }

  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(
    `\nIni akan mengirim perubahan ke ${LIVE_BRANCH} dan langsung men-deploy situs live.\nKetik "ya" untuk lanjut: `,
  );
  rl.close();
  if (answer.trim().toLowerCase() !== 'ya') {
    console.log('Dibatalkan. Branch sudah dikirim, tetapi situs live belum berubah.');
    return;
  }

  step(`Mengirim ke ${LIVE_BRANCH} (live)`, `git push origin HEAD:${LIVE_BRANCH}`, { remote: true });
  console.log(`\nSelesai. Vercel akan men-deploy ${LIVE_BRANCH}. Cek status di dashboard Vercel, lalu tekan Ctrl+F5 di situs.`);
};

main().catch((err) => fail(err.message));
