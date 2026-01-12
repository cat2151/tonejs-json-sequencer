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

function updateImports(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist`);
    return;
  }

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      updateImports(filePath);
    } else if (file.endsWith('.mjs')) {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace .js extensions in various import/export statement patterns with .mjs
        let updated = content;
        // Handle: from './file.js'
        updated = updated.replace(/(from\s+['"])([^'"]+)\.js(['"])/g, '$1$2.mjs$3');
        // Handle: export { ... } from './file.js'
        updated = updated.replace(/(export\s+\{[^}]+\}\s+from\s+['"])([^'"]+)\.js(['"])/g, '$1$2.mjs$3');
        // Handle: import './file.js' (side-effect imports)
        updated = updated.replace(/(import\s+['"])([^'"]+)\.js(['"])/g, '$1$2.mjs$3');
        // Handle: import('./file.js') (dynamic imports)
        updated = updated.replace(/(import\s*\(\s*['"])([^'"]+)\.js(['"])/g, '$1$2.mjs$3');
        
        if (content !== updated) {
          fs.writeFileSync(filePath, updated, 'utf8');
          console.log(`Updated imports in: ${filePath}`);
        }
      } catch (err) {
        console.error(`Failed to update imports in ${filePath}:`, err);
        process.exit(1);
      }
    }
  });
}

renameFiles(esmDir);
updateImports(esmDir);

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
