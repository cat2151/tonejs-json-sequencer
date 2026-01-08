const fs = require('fs');
const path = require('path');

// Rename .js files to .mjs in dist/esm
const esmDir = path.join(__dirname, '../dist/esm');

function renameFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist`);
    return;
  }

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      renameFiles(filePath);
    } else if (file.endsWith('.js')) {
      const newPath = filePath.replace(/\.js$/, '.mjs');
      try {
        fs.renameSync(filePath, newPath);
        console.log(`Renamed: ${filePath} -> ${newPath}`);
      } catch (err) {
        console.error(`Failed to rename ${filePath} to ${newPath}:`, err);
        process.exit(1);
      }
    }
  });
}

renameFiles(esmDir);

// Copy index.mjs to dist/
const indexMjs = path.join(esmDir, 'index.mjs');
const distIndexMjs = path.join(__dirname, '../dist/index.mjs');
if (fs.existsSync(indexMjs)) {
  try {
    fs.copyFileSync(indexMjs, distIndexMjs);
    console.log(`Copied: ${indexMjs} -> ${distIndexMjs}`);
  } catch (err) {
    console.error(`Failed to copy ${indexMjs} to ${distIndexMjs}:`, err);
    process.exit(1);
  }
}
