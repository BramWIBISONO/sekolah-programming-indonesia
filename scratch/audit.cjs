const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'scratch') continue;
    if (fs.statSync(full).isDirectory()) results = results.concat(walk(full));
    else results.push(full);
  }
  return results;
}

const files = walk('.');
const results = [];

for (const file of files) {
  if (file.includes('package-lock.json') || file.includes('package.json')) continue;
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('/assets/') || l.includes('assets/') || l.includes('/images/') || l.includes('/uploads/')) {
      results.push({ file, line: idx + 1, text: l.trim() });
    }
  });
}

console.log('Total asset string matches:', results.length);
results.forEach(r => console.log(`${r.file}:${r.line} -> ${r.text}`));
