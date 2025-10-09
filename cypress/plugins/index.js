require('dotenv').config();
const cucumber = require('cypress-cucumber-preprocessor').default;
const { emptyFolder } = require('../utils/empty-folder');
const { sendMessage } = require('../utils/sendMessage');
const { startReceivingMessages, stopReceivingMessages, getReceivedMessages } = require('../utils/receiveMessage');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const loadReportData = require('../utils/loadReportData');
const queryStatementData = require('../utils/queryStatementData');
const insertStatementData = require('../utils/insertStatementData');
const queryStatementConstructor = require('../utils/queryStatementConstructor');
const queryStatementGenerator = require('../utils/queryStatementGenerator');
const queryStatementPublisher = require('../utils/queryStatementPublisher');
const downloadStatementsBlobById = require('../utils/downloadStatementsBlobById');
const downloadPaymentsBlobById = require('../utils/downloadPaymentsBlobById');
const { exec } = require('child_process');
const insertIncorrectStatementData = require('../utils/insertIncorrectStatementData');
const insertIncorrectStatementConstructor = require('../utils/insertIncorrectStatementConstructor');
const insertIncorrectStatementGenerator = require('../utils/insertIncorrectStatementGenerator');
const insertIncorrectStatementPublisher = require('../utils/insertIncorrectStatementPublisher');
const confirmStatementDataNotAdded = require('../utils/confirmStatementDataNotAdded');
const confirmStatementConstructorNotAdded = require('../utils/confirmStatementConstructorNotAdded');
const confirmStatementGeneratorNotAdded = require('../utils/confirmStatementGeneratorNotAdded');
const confirmStatementPublisherNotAdded = require('../utils/confirmStatementPublisherNotAdded');
const confirmPayProcessingNotAdded = require('../utils/confirmPayProcessingNotAdded');
const queryPayInjection = require('../utils/queryPayInjection');
const queryPayProcessing = require('../utils/queryPayProcessing');
const queryPaySubmission = require('../utils/queryPaySubmission');
const queryReturnPayProcessing = require('../utils/queryReturnPayProcessing');
const insert2024BulkStatementData = require('../utils/insert2024BulkStatementData');
const insert2025BulkStatementData = require('../utils/insert2025BulkStatementData');
const query2024BulkStatementData = require('../utils/query2024BulkStatementData');
const query2025BulkStatementData = require('../utils/query2025BulkStatementData');
const queryBulkStatementConstructor = require('../utils/queryBulkStatementConstructor');
const queryBulkStatementGenerator = require('../utils/queryBulkStatementGenerator');


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

    getStatementData () {

      // This task retrieves statement data from the database and checks if it exists for the expected SBI.
      // It uses the queryStatementData module to perform the database query and return the results.
      console.log('🔍 Checking Database values entered successfully');
      queryStatementData();
      console.log('✅ Database values checked successfully');
      return null;
    },

    query2024BulkStatementData () {

      // This task retrieves statement data from the database and checks if it exists
      console.log('🔍 Checking Database values entered successfully');
      query2024BulkStatementData();
      console.log('✅ Database values checked successfully');
      return null;
    },

    query2025BulkStatementData () {

      // This task retrieves statement data from the database and checks if it exists
      console.log('🔍 Checking Database values entered successfully');
      query2025BulkStatementData();
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

    insert2024BulkStatementData () {

      // This task inserts 20 instances of test data into the Statement Data database, 10 for 2024 and 10 for 2025
      console.log('🔄 Inserting bulk test data into Statement Data');
      insert2024BulkStatementData();
      return null;
    },

    insert2025BulkStatementData () {

      // This task inserts 20 instances of test data into the Statement Data database, 10 for 2024 and 10 for 2025
      console.log('🔄 Inserting bulk test data into Statement Data');
      insert2025BulkStatementData();
      return null;
    },

    insertIncorrectStatementData () {

      // This task inserts intentionally incorrect test data into the Statement Data database
      console.log('🔄 Inserting incorrect test data into Statement Data');
      insertIncorrectStatementData();
      return null;
    },

    insertIncorrectStatementConstructor () {
      // This task inserts intentionally incorrect test data into the Statement Constructor database
      console.log('🔄 Inserting incorrect test data into Statement Constructor');
      insertIncorrectStatementConstructor();
      return null;
    },

    insertIncorrectStatementGenerator () {
      // This task inserts intentionally incorrect test data into the Statement Generator database
      console.log('🔄 Inserting incorrect test data into Statement Generator');
      insertIncorrectStatementGenerator();
      return null;
    },

    insertIncorrectStatementPublisher () {
      // This task inserts intentionally incorrect test data into the Statement Publisher database
      console.log('🔄 Inserting incorrect test data into Statement Publisher');
      insertIncorrectStatementPublisher();
      return null;
    },

    confirmStatementDataNotAdded () {

      // This task checks if incorrect data was correctly rejected by Statement Data
      console.log('🔍 Checking Statement Data values not entered');
      confirmStatementDataNotAdded();
      console.log('✅ Values not present in Statement Data');
      return null;
    },

    confirmStatementConstructorNotAdded () {

      // This task checks if incorrect data was correctly rejected by Statement Constructor
      console.log('🔍 Checking Statement Constructor values not entered');
      confirmStatementConstructorNotAdded();
      console.log('✅ Values not present in Statement Constructor');
      return null;
    },

    confirmStatementGeneratorNotAdded () {

      // This task checks if incorrect data was correctly rejected by Statement Generator
      console.log('🔍 Checking Statement Generator values not entered');
      confirmStatementGeneratorNotAdded();
      console.log('✅ Values not present in Statement Generator');
      return null;
    },

    confirmStatementPublisherNotAdded () {

      // This task checks if incorrect data was correctly rejected by Statement Publisher
      console.log('🔍 Checking Statement Publisher values not entered');
      confirmStatementPublisherNotAdded();
      console.log('✅ Values not present in Statement Publisher');
      return null;
    },

    confirmPayProcessingNotAdded () {

      // This task checks if incorrect data was correctly rejected by Pay Processing
      console.log('🔍 Checking Pay Processing values not entered');
      confirmPayProcessingNotAdded();
      console.log('✅ Values not present in Pay Processing');
      return null;
    },

    getStatementConstructorData () {

      // This task retrieves statement constructor data from the database and checks if it exists for the expected SBI.
      console.log('🔍 Checking Statement Constructor values entered successfully');
      queryStatementConstructor();
      console.log('✅ Statement Constructor values checked successfully');
      return null;
    },

    getStatementGeneratorData () {

      // This task retrieves statement generator data from the database and checks if it contains the expected SBI value.
      console.log('🔍 Checking Statement Generator values entered successfully');
      queryStatementGenerator();
      console.log('✅ Statement Generator values checked successfully');
      return null;
    },

    getStatementPublisherData () {

      // This task retrieves statement publisher data from the database and checks if the statement data exists for the expected SBI.
      // It then retrieves the statement ID based on the SBI and checks if there are any deliveries associated with that statement ID.
      console.log('🔍 Checking Statement Publisher values entered successfully');
      queryStatementPublisher();
      console.log('✅ Statement Publisher values checked successfully');
      return null;
    },

    getPayInjectionData () {

      // This task checks that Pay injection data has been entered correctly
      console.log('🔍 Checking Pay Injection values entered successfully');
      queryPayInjection();
      console.log('✅ Pay Injection values checked successfully');
      return null;
    },

    getPayProcessingData () {

      // This task checks that Pay processing data has been entered correctly
      console.log('🔍 Checking Pay Processor values entered successfully');
      queryPayProcessing();
      console.log('✅ Pay Processor values checked successfully');
      return null;
    },

    confirmReturnPayProcessingData () {

      //This task checks that Pay processing data has been updated correctly following return file upload
      console.log('🔍 Checking Pay Processor values entered successfully');
      queryReturnPayProcessing();
      console.log('✅ Pay Processor values checked successfully');
      return null;
    },

    getPaySubmissionData () {

      // This task checks that Pay Submission data has been entered correctly
      console.log('🔍 Checking Pay Submission values entered successfully');
      queryPaySubmission();
      console.log('✅ Pay Submission values checked successfully');
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

    getDockerLogs (containerName) {

      // This task retrieves the logs from a specified Docker container.
      return new Promise((resolve, reject) => {
        exec('docker logs ' + containerName, (err, stdout, stderr) => {
          if (err) {
            return reject(err);
          }
          console.log(`Logs from container "${containerName}":\n`, stdout);
          resolve(stdout);
        });
      });
    },

    loadReportData
  });

  return config;
};