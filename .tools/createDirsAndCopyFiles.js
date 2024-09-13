const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper function to create directories recursively
function createDirectories(dirs) {
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    } else {
      console.log(`Directory already exists: ${dir}`);
    }
  });
}

// Helper function to copy files
function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
  console.log(`Copied file from ${src} to ${dest}`);
}

// Directories to be created
const directories = [
  path.join('report', 'HTML'),
  path.join('report', 'JSON'),
  path.join('cypress', 'screenshots')
];

// Create directories
createDirectories(directories);

// Source and destination for the file copy
const srcFile = path.join('.tools', 'createTestFromScenario.js');
const destFile = path.join('node_modules', 'cypress-cucumber-preprocessor', 'lib', 'createTestFromScenario.js');

// Copy the file
copyFile(srcFile, destFile);
