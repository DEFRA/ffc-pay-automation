require('dotenv').config();
const cucumber = require('cypress-cucumber-preprocessor').default;
const { emptyFolder } = require('../utils/empty-folder');
const { sendMessage } = require('../utils/sendMessage');
const sendMessagesBatch = require('../utils/sendMessagesBatch');
const { startReceivingMessages, stopReceivingMessages, getReceivedMessages } = require('../utils/receiveMessage');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const loadReportData = require('../utils/loadReportData');
const downloadStatementsBlobById = require('../utils/downloadStatementsBlobById');
const downloadPaymentsBlobById = require('../utils/downloadPaymentsBlobById');
const uploadFileToBlobStorage = require('../utils/uploadFileToBlobStorage');
const generateJWT = require('../utils/generateJWT');
const databaseQuery = require('../utils/databaseQuery');
const databaseInsert = require('../utils/databaseInsert');
const generateAccessToken = require('../utils/generateAccessToken');

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());

  on('task', {
    emptyFolder: (folderPath) => emptyFolder(folderPath),

    sendMessagesBatch ({ messages, topicName }) {
      return sendMessagesBatch({ messages, topicName });
    },

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

    generateJWT ({ payload, secret, options }) {
      return generateJWT(payload, secret, options);
    },

    generateAccessToken () {
      return generateAccessToken();
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

    startDPSService () {
      const dir = process.env.WSL_TEST_DIR;

      if (!dir) {
        throw new Error('⚠️ WSL_TEST_DIR not set in .env');
      }

      const shellCommand = `cd ${dir} && ./stop -v && cd .. && cd ffc-pay-dps && cd scripts && echo '🟢 Starting...' && ./start`;

      return new Promise((resolve) => {
        console.log(`🚀 Restarting local env from: ${dir}`);

        const child = spawn('wsl', ['bash', '-ic', shellCommand], {
          stdio: 'pipe',
        });

        let output = '';

        // Automatically kill the child process after 30 seconds to prevent hanging
        const timeout = setTimeout(() => {
          console.log('⏱️ Timeout reached: shutting down child process...');
          child.kill('SIGTERM'); // Use 'SIGKILL' if SIGTERM doesn't work
        }, 30000);

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
          console.log(`Child process exited with code ${code}`);
          clearTimeout(timeout); // Cancel timeout if process ends early
          console.log('✅ Start DPS completed');
          resolve(output);
        });
      });
    },

    restartLocalEnv () {
      const dir = process.env.WSL_TEST_DIR;

      if (!dir) {
        throw new Error('⚠️ WSL_TEST_DIR not set in .env');
      }

      const shellCommand = `cd ${dir} && echo '🔴 Stopping...' && ./stop -v && echo '🟢 Starting...' && ./start -p`;

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

    restartLocalDocEnv () {

      // This task restarts the local document environment by stopping and starting the services in the specified directory.
      // It uses the WSL_TEST_DIR environment variable to determine the directory to operate in.
      const dir = process.env.WSL_TEST_DIR;

      if (!dir) {
        throw new Error('⚠️ WSL_TEST_DIR not set in .env');
      }

      const shellCommand = `cd ${dir} && echo '🔴 Stopping...' && ./stop -v && echo '🟢 Starting...' && ./start -d`;

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

    closeAllServices () {

      // This task stops all services in the local document environment by executing a shell command in the specified directory.
      // It uses the WSL_TEST_DIR environment variable to determine the directory to operate in.
      const dir = process.env.WSL_TEST_DIR;

      if (!dir) {
        throw new Error('⚠️ WSL_TEST_DIR not set in .env');
      }

      const shellCommand = `cd ${dir} && echo '🔴 Stopping...' && ./stop -v`;

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
            console.log('✅ closeAllServices completed');
            resolve(output);
          } else {
            reject(new Error(`closeAllServices failed with code ${code}`));
          }
        });
      });

    },

    async startLocalDocEnv () {

      // This task starts the local document environment by executing a shell command in multiple directories.
      // It uses the WSL_DOC_STATEMENT_DATA_DIR, WSL_DOC_STATEMENT_CONSTRUCTOR_DIR, WSL_DOC_STATEMENT_GENERATOR_DIR,
      // WSL_DOC_STATEMENT_PUBLISHER_DIR, and WSL_DOC_STATEMENT_RECEIVER_DIR environment variables to determine the directories to operate in.

      const dirs = [
        process.env.WSL_DOC_STATEMENT_DATA_DIR,
        process.env.WSL_DOC_STATEMENT_CONSTRUCTOR_DIR,
        process.env.WSL_DOC_STATEMENT_GENERATOR_DIR,
        process.env.WSL_DOC_STATEMENT_PUBLISHER_DIR,
        process.env.WSL_DOC_STATEMENT_RECEIVER_DIR
      ];

      const tasks = dirs.map(dir => {
        const shellCommand = `cd ${dir} && echo '🟢 Starting...' && ./start`;

        console.log(`🚀 Restarting local env from: ${dir}`);
        const child = spawn('wsl', ['bash', '-ic', shellCommand], {
          stdio: 'pipe',
          detached: true // Optional: allows child to run independently
        });

        child.unref(); // Detach from parent so it doesn't block

        return Promise.resolve(); // Immediately resolve
      });

      await Promise.all(tasks);
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(60000);
      return '✅ All local doc environments restarted successfully';
    },

    async databaseQuery ({env, databaseName, sqlStatement,}) {

      console.log('🔍 Checking Database values entered successfully');
      return databaseQuery(env, databaseName, sqlStatement);

    },

    async databaseInsert ({env, databaseName, sqlStatement}) {

      console.log('🔍 Inserting Database values');
      return databaseInsert(env, databaseName, sqlStatement);

    },

    async fetchStatementsBlobById ({container, dir, year}) {
      downloadStatementsBlobById(container, dir, year);
      return null;
    },

    async fetchPaymentsBlobById ({env, container, dir, scheme}) {
      downloadPaymentsBlobById(env, container, dir, scheme);
      return null;
    },

    async uploadFileToBlobStorage ({container, dir, scheme}) {
      await uploadFileToBlobStorage(container, dir, scheme);
      return null;
    },

    getDockerLogs (containerName) {

      const { spawn } = require('child_process');

      return new Promise((resolve, reject) => {
        const proc = spawn('docker', ['logs', containerName]);
        let output = '';

        proc.stdout.on('data', (data) => output += data.toString());
        proc.stderr.on('data', (data) => output += data.toString());

        proc.on('close', () => resolve(output));
        proc.on('error', reject);

      });
    },

    loadReportData
  });

  return config;
};