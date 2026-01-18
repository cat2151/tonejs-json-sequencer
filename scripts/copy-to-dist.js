const fs = require('fs');
const path = require('path');

// Copy all files from dist/cjs to dist/ (recursively)
const cjsDir = path.join(__dirname, '../dist/cjs');
const distDir = path.join(__dirname, '../dist');

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    // Copy contents
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    // Copy file
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  }
}

// Copy all CJS files to dist root
try {
  copyRecursive(cjsDir, distDir);
} catch (err) {
  console.error('Failed to copy CJS files to dist:', err);
  process.exit(1);
}
