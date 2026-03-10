require('dotenv').config();
const { spawn } = require('child_process');

async function generateAccessToken () {

  return new Promise((resolve, reject) => {
    const shellCommand = `az account get-access-token --resource-type oss-rdbms --query accessToken --output tsv`;

    console.log('Getting access token');

    const child = spawn('wsl', ['bash', '-ic', shellCommand], {
      stdio: 'pipe',
    });

    let output = '';

    child.stdout.on('data', (data) => {
      const line = data.toString();
      output += line;
      console.log('🟢', line.trim());
    });

    child.stderr.on('data', (data) => {
      const line = data.toString();
      console.error('🔴', line.trim());
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('Generated access token');
        resolve(output.trim());
      } else {
        reject(new Error('Failed to get access token'));
      }
    });
  });
}

module.exports = generateAccessToken;