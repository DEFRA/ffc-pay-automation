require('dotenv').config();
const cucumber = require('cypress-cucumber-preprocessor').default;
const { emptyFolder } = require('../utils/empty-folder');
const { sendMessage } = require('../utils/sendMessage');
const { startReceivingMessages, stopReceivingMessages, getReceivedMessages } = require('../utils/receiveMessage');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const loadReportData = require('../utils/loadReportData');
const queryDatabase = require('../utils/queryDatabase');
const insertStatementData = require('../utils/insertStatementData');
const downloadStatementsBlobById = require('../utils/downloadStatementsBlobById');
const downloadPaymentsBlobById = require('../utils/downloadPaymentsBlobById');
const { exec } = require('child_process');
const insertIncorrectData = require('../utils/insertIncorrectData');
const queryReturnPayProcessing = require('../utils/queryReturnPayProcessing');
const insertBulkStatementData = require('../utils/insertBulkStatementData');
const queryBulkStatementData = require('../utils/queryBulkStatementData');
const queryBulkStatementConstructor = require('../utils/queryBulkStatementConstructor');
const queryBulkStatementGenerator = require('../utils/queryBulkStatementGenerator');
const uploadFileToBlobStorage = require('../utils/uploadFileToBlobStorage');
const confirmInvalidDataNotAdded = require('../utils/confirmInvalidDataNotAdded');



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

      const shellCommand = `cd ${dir} && echo '🔴 Stopping...' && ./stop -v && echo '🟢 Starting...' && ./start`;

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

      const shellCommand = `cd ${dir} && echo '🔴 Stopping...' && ./stop -v && echo '🟢 Starting...' && ./start -S`;

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

    queryDatabase (database) {

      // This task retrieves data from the database and checks if it exists.
      console.log('🔍 Checking Database values entered successfully');
      queryDatabase(database);
      console.log('✅ Database values checked successfully');
      return null;
    },

    queryBulkStatementData (year) {

      // This task retrieves statement data from the database and checks if it exists
      console.log('🔍 Checking Database values entered successfully');
      queryBulkStatementData(year);
      console.log('✅ Database values checked successfully');
      return null;
    },

    queryBulkStatementConstructor () {

      // This task retrieves statement data from the database and checks if it exists
      console.log('🔍 Checking Database values entered successfully');
      queryBulkStatementConstructor();
      console.log('✅ Database values checked successfully');
      return null;
    },

    queryBulkStatementGenerator () {

      // This task retrieves statement data from the database and checks if it exists
      console.log('🔍 Checking Database values entered successfully');
      queryBulkStatementGenerator();
      console.log('✅ Database values checked successfully');
      return null;
    },

    insertStatementData (year) {

      // This task inserts test data into the Statement Data database
      console.log('🔄 Inserting test data into Statement Data for ' + year);
      insertStatementData(year);
      return null;
    },

    insertBulkStatementData (year) {

      // This task inserts 20 instances of test data into the Statement Data database, 10 for 2024 and 10 for 2025
      console.log('🔄 Inserting bulk test data into Statement Data');
      insertBulkStatementData(year);
      return null;
    },
    insertIncorrectData (database) {

      // This task inserts intentionally incorrect test data into the Statement Data database
      console.log('🔄 Inserting incorrect test data into ' + database);
      insertIncorrectData(database);
      return null;
    },

    confirmInvalidDataNotAdded (database) {

      // This task checks if incorrect data was correctly rejected by Pay Processing
      console.log('🔍 Checking Pay Processing values not entered');
      confirmInvalidDataNotAdded(database);
      console.log('✅ Values not present in Pay Processing');
      return null;
    },

    confirmReturnPayProcessingData () {

      //This task checks that Pay processing data has been updated correctly following return file upload
      console.log('🔍 Checking Pay Processor values entered successfully');
      queryReturnPayProcessing();
      console.log('✅ Pay Processor values checked successfully');
      return null;
    },

    async fetchStatementsBlobById ({container, dir, year}) {
      downloadStatementsBlobById(container, dir, year);
      return null;
    },

    async fetchPaymentsBlobById ({container, dir, scheme}) {
      downloadPaymentsBlobById(container, dir, scheme);
      return null;
    },

    async uploadFileToBlobStorage ({container, dir, scheme}) {
      await uploadFileToBlobStorage(container, dir, scheme);
      return null;
    },

    getDockerLogs (containerName) {

      // This task retrieves the logs from a specified Docker container.
      return new Promise((resolve, reject) => {
        exec('docker logs ' + containerName, (err, stdout, stderr) => {
          if (err) {
            return reject(err);
          }
          console.log(`Logs from container "${containerName}":\n`, stdout);
          console.log(`Logs from container "${containerName}":\n`, stdout);
          resolve(stdout);
        });
      });
    },

    loadReportData
  });

  return config;
};