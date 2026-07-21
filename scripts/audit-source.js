#!/usr/bin/env node
/**
 * audit-source.js — mobile-ui-port production runtime kaynak taraması.
 *
 * Amaç: UI portunun gerçek DietBridge mobil uygulamasına aktarılmadan önce
 * web kalıntısı, backend erişimi veya preview bağımlılığı içermediğini
 * bağımsız olarak doğrulamak.
 *
 * Kurallar:
 * - Yalnızca mobile-ui-port/ altındaki .js runtime dosyaları taranır.
 * - mobile-ui-port/preview/ klasörü production taramasından AYRIDIR
 *   (previewData yalnız orada kullanılabilir).
 * - Markdown/dokümantasyon dosyaları taranmaz; yalnız .js.
 * - Eşleşme bulunursa dosya + satır raporlanır ve process 1 ile çıkar.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT_DIR = path.join(ROOT, 'mobile-ui-port');
const EXCLUDED_DIRS = new Set(['preview']);

// Desenler: [etiket, RegExp]
const PATTERNS = [
  ['web <div', /<div/],
  ['web <span', /<span/],
  ['web <button', /<button/],
  ['web <input', /<input/],
  ['web className=', /className=/],
  ['react-dom', /react-dom/],
  ['lucide-react', /lucide-react/],
  ['window.', /\bwindow\./],
  ['document.', /\bdocument\./],
  ['localStorage', /\blocalStorage\b/],
  ['supabase', /supabase/i],
  ['fetch(', /\bfetch\s*\(/],
  ['axios', /axios/i],
  ['AsyncStorage', /AsyncStorage/],
  ['rpc(', /\.rpc\s*\(|\brpc\s*\(/],
  ['.from(', /\.from\s*\(/],
  ['auth.', /\bauth\./],
  ['storage.', /\bstorage\./],
  ['channel(', /\.channel\s*\(|\bchannel\s*\(/],
  ['previewData', /previewData/],
];

/** mobile-ui-port/ altındaki .js dosyalarını özyinelemeli toplar (preview hariç). */
function collectJsFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) collectJsFiles(full, out);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

function main() {
  const files = collectJsFiles(PORT_DIR).sort();
  const findings = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const [label, pattern] of PATTERNS) {
        if (pattern.test(line)) {
          findings.push({ file: rel, line: i + 1, label, text: line.trim() });
        }
      }
    });
  }

  if (findings.length > 0) {
    console.error(`audit-source: BAŞARISIZ — ${findings.length} eşleşme bulundu:\n`);
    for (const f of findings) {
      console.error(`  ${f.file}:${f.line}  [${f.label}]`);
      console.error(`    ${f.text.length > 120 ? `${f.text.slice(0, 117)}…` : f.text}`);
    }
    console.error(
      '\nProduction runtime (.js, preview/ hariç) web kalıntısı, backend erişimi ' +
        'veya preview bağımlılığı içermemelidir.',
    );
    process.exit(1);
  }

  console.log(
    `audit-source: TEMİZ — ${files.length} production .js dosyası tarandı, eşleşme yok ` +
      '(preview/ klasörü taramadan ayrı tutuldu).',
  );
}

main();
