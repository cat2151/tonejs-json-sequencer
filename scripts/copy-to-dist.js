const fs = require('fs');
const path = require('path');

// Copy index.js and index.d.ts from dist/cjs to dist/
const cjsDir = path.join(__dirname, '../dist/cjs');
const distDir = path.join(__dirname, '../dist');

const indexJs = path.join(cjsDir, 'index.js');
const distIndexJs = path.join(distDir, 'index.js');
if (fs.existsSync(indexJs)) {
  try {
    fs.copyFileSync(indexJs, distIndexJs);
    console.log(`Copied: ${indexJs} -> ${distIndexJs}`);
  } catch (err) {
    console.error(`Failed to copy ${indexJs} to ${distIndexJs}:`, err);
    process.exit(1);
  }
}

const indexDts = path.join(cjsDir, 'index.d.ts');
const distIndexDts = path.join(distDir, 'index.d.ts');
if (fs.existsSync(indexDts)) {
  try {
    fs.copyFileSync(indexDts, distIndexDts);
    console.log(`Copied: ${indexDts} -> ${distIndexDts}`);
  } catch (err) {
    console.error(`Failed to copy ${indexDts} to ${distIndexDts}:`, err);
    process.exit(1);
  }
}
