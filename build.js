const fs = require('fs-extra');
const path = require('path');

const filesToCopy = ['index.html', 'styles.css', 'main.js'];
const distDir = path.join(__dirname, 'dist');

// Ensure the dist directory exists
fs.ensureDirSync(distDir);

// Copy each file to the dist directory
filesToCopy.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copySync(src, dest);
    console.log(`${file} copied to dist`);
  } else {
    console.error(`File not found: ${file}`);
  }
});
