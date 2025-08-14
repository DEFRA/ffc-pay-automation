require('dotenv').config();
const cucumber = require('cypress-cucumber-preprocessor').default;
const { emptyFolder } = require('../utils/empty-folder');
const { sendMessage } = require('../utils/sendMessage');
const { startReceivingMessages, stopReceivingMessages, getReceivedMessages } = require('../utils/receiveMessage');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const loadReportData = require('../utils/loadReportData');

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());

  on('task', {
    emptyFolder: (folderPath) => emptyFolder(folderPath),

    sendMessage ({ messageBody, topicName }) {
      return sendMessage({ messageBody, topicName });
    },

    startMessageReception (topicName) {
      startReceivingMessages(topicName);
      return null;
    },

    stopMessageReception () {
      stopReceivingMessages();
      return null;
    },

    fetchReceivedMessages (topicName) {
      return getReceivedMessages(topicName);
    },

    readFileIfExists (filePath) {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
      return null;
    },

    writeFile ({ filePath, data }) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return `File updated: ${filePath}`;
    },

    fileExists (filePath) {
      return fs.existsSync(path.resolve(__dirname, '../../', filePath));
    },

    restartLocalEnv () {
      const dir = process.env.WSL_TEST_DIR;

      if (!dir) {
        throw new Error('⚠️ WSL_TEST_DIR not set in .env');
      }

      const shellCommand = `cd ${dir} && echo '🔴 Stopping...' && ./stop -v && echo '⬇️ Pulling...' && ./pull && echo '🟢 Starting...' && ./start`;

      return new Promise((resolve, reject) => {
        console.log(`🚀 Restarting local env from: ${dir}`);

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
          output += line;
          console.error('🔴', line.trim());
        });

        child.on('close', (code) => {
          if (code === 0) {
            console.log('✅ restartLocalEnv completed');
            resolve(output);
          } else {
            reject(new Error(`restartLocalEnv failed with code ${code}`));
          }
        });
      });
    },

    loadReportData
  });

  return config;
};