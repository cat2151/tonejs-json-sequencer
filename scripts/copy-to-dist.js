const fs = require('fs');
const path = require('path');

// Copy index.js and index.d.ts from dist/cjs to dist/
const cjsDir = path.join(__dirname, '../dist/cjs');
const distDir = path.join(__dirname, '../dist');

const indexJs = path.join(cjsDir, 'index.js');
const distIndexJs = path.join(distDir, 'index.js');
if (fs.existsSync(indexJs)) {
  fs.copyFileSync(indexJs, distIndexJs);
  console.log(`Copied: ${indexJs} -> ${distIndexJs}`);
}

const indexDts = path.join(cjsDir, 'index.d.ts');
const distIndexDts = path.join(distDir, 'index.d.ts');
if (fs.existsSync(indexDts)) {
  fs.copyFileSync(indexDts, distIndexDts);
  console.log(`Copied: ${indexDts} -> ${distIndexDts}`);
}
