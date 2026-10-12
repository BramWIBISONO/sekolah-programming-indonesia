const oldUrl = 'https://script.google.com/macros/s/AKfycbwWJdxcbxuBawq3TGjhsDyEOIWRaufQBZpyVwgbY8mIOmxgqv4RRmPkj0AiB-J-Io4/exec';
const newUrl = 'https://script.google.com/macros/s/AKfycbyfDSJhH_8VSA6txBcLdvm5LayzGxckaKwM-01fLpFpukbEcOYpQY3afB0gm7OMKhQ/exec';

async function checkUrl(name, url) {
  console.log(`Checking ${name}: ${url}`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ test: true })
    });
    const text = await res.text();
    console.log(`STATUS ${name}:`, res.status, 'BODY:', text.substring(0, 300));
  } catch (err) {
    console.error(`ERROR ${name}:`, err);
  }
}

checkUrl('OLD', oldUrl).then(() => checkUrl('NEW', newUrl));
