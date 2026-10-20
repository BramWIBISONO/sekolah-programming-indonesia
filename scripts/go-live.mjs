// Turns on the Gerakan AI Literacy registration form on the live site.
// 1. Sets VITE_AI_LITERACY_API_URL and VITE_AI_LITERACY_WA_GROUP_URL for Production on Vercel. Values come from .env.local.
// 2. Redeploys Production. Vite reads VITE_ variables at build time, so a redeploy is required.
// Run with: npm run go-live. Set DRY_RUN=1 to check everything and show the steps without changing Vercel.
// Run npm run publish:live first, so that origin/main already contains the code you want live.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const API_VAR = 'VITE_AI_LITERACY_API_URL';
const GROUP_VAR = 'VITE_AI_LITERACY_WA_GROUP_URL';
const DRY_RUN = process.env.DRY_RUN === '1';
const APPS_SCRIPT_URL = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/;
const WA_GROUP_URL = /^https:\/\/chat\.whatsapp\.com\/\S+$/;

const capture = (cmd) => execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

const fail = (message) => {
  console.error(`\nBerhenti: ${message}`);
  process.exit(1);
};

const readLocalValue = (name) => {
  if (!fs.existsSync('.env.local')) fail('file .env.local tidak ditemukan. Isi variabel-variabel AI Literacy di sana dulu.');
  const line = fs
    .readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .find((l) => l.startsWith(`${name}=`));
  if (!line) fail(`${name} tidak ada di .env.local.`);
  return line.slice(name.length + 1).trim().replace(/^"(.*)"$/, '$1');
};

const main = async () => {
  // Vercel stores the link in project.json, or in repo.json when the project is linked through Git.
  if (!fs.existsSync('.vercel/project.json') && !fs.existsSync('.vercel/repo.json')) {
    fail('folder ini belum terhubung ke project Vercel. Jalankan dulu: npx vercel link');
  }

  if (capture('git status --porcelain -- . ":!graphify-out"')) {
    fail('masih ada perubahan yang belum di-commit. Commit atau bersihkan dulu.');
  }

  execSync('git fetch origin', { stdio: 'inherit' });
  const head = capture('git rev-parse HEAD');
  const live = capture('git rev-parse origin/main');
  if (head !== live) {
    fail('kode di folder ini belum sama dengan origin/main. Jalankan dulu: npm run publish:live');
  }

  const apiValue = readLocalValue(API_VAR);
  if (!APPS_SCRIPT_URL.test(apiValue)) fail(`nilai ${API_VAR} bukan URL Web App Apps Script (https://script.google.com/macros/s/.../exec).`);

  // Optional: the group link shown on the success screen. Skipped when it is not in .env.local.
  const hasGroup = fs.existsSync('.env.local') && fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).some((l) => l.startsWith(`${GROUP_VAR}=`));
  const groupValue = hasGroup ? readLocalValue(GROUP_VAR) : '';
  if (hasGroup && !WA_GROUP_URL.test(groupValue)) fail(`nilai ${GROUP_VAR} bukan link undangan grup WhatsApp.`);

  console.log(`\nAkan dilakukan:
  1. Mengisi ${API_VAR} untuk Production di Vercel.${hasGroup ? `\n  2. Mengisi ${GROUP_VAR} untuk Production di Vercel.` : ''}
  ${hasGroup ? 3 : 2}. Redeploy Production dari kode origin/main (${live.slice(0, 7)}).

PERHATIAN: setelah ini formulir pendaftaran terbuka untuk umum, dan setiap pendaftaran masuk ke spreadsheet asli.
Pastikan baris uji sudah dibersihkan.`);

  if (DRY_RUN) {
    console.log('\nDRY_RUN selesai. Vercel tidak diubah.');
    return;
  }

  const rl = readline.createInterface({ input, output });
  const answer = await rl.question('\nKetik "ya" untuk membuka pendaftaran sekarang: ');
  rl.close();
  if (answer.trim().toLowerCase() !== 'ya') {
    console.log('Dibatalkan. Vercel tidak diubah.');
    return;
  }

  const setVar = (name, value) => {
    // Replace an existing value so the command can be run again safely.
    try {
      execSync(`npx --yes vercel env rm ${name} production --yes`, { stdio: 'inherit' });
    } catch {
      console.log(`(${name} belum ada di Production, lanjut menambahkan.)`);
    }
    console.log(`\n> Menambahkan ${name} untuk Production`);
    execSync(`npx --yes vercel env add ${name} production`, { input: `${value}\n`, stdio: ['pipe', 'inherit', 'inherit'] });
  };

  setVar(API_VAR, apiValue);
  if (hasGroup) setVar(GROUP_VAR, groupValue);

  console.log('\n> Redeploy Production');
  execSync('npx --yes vercel --prod --yes', { stdio: 'inherit' });

  console.log('\nSelesai. Buka https://www.sekolahprogrammingindonesia.com/ai-literacy/daftar lalu tekan Ctrl+F5.');
};

main().catch((err) => fail(err.message));
