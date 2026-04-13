const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;

module.exports = defineConfig({
  e2e: {
    taskTimeout: 15 * 60 * 1000, // 15 minutes
    specPattern: "cypress/e2e/features/**/*.feature",

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );


      // ---------------------------------------------------------
      // Custom tasks for managing local environment and database interactions
      // ---------------------------------------------------------

      const fs2 = require("fs");
      const path2 = require("path");
      const { spawn } = require("child_process");

      const { emptyFolder } = require("./cypress/utils/empty-folder");
      const { sendMessage } = require("./cypress/utils/sendMessage");
      const sendMessagesBatch = require("./cypress/utils/sendMessagesBatch");
      const {
        startReceivingMessages,
        stopReceivingMessages,
        getReceivedMessages
      } = require("./cypress/utils/receiveMessage");

      const loadReportData = require("./cypress/utils/loadReportData");
      const downloadStatementsBlobById = require("./cypress/utils/downloadStatementsBlobById");
      const downloadPaymentsBlobById = require("./cypress/utils/downloadPaymentsBlobById");
      const uploadFileToBlobStorage = require("./cypress/utils/uploadFileToBlobStorage");
      const generateJWT = require("./cypress/utils/generateJWT");
      const databaseQuery = require("./cypress/utils/databaseQuery");
      const databaseInsert = require("./cypress/utils/databaseInsert");
      const generateAccessToken = require("./cypress/utils/generateAccessToken");

      try{
      on("task", {
        emptyFolder: (folderPath) => emptyFolder(folderPath),

        sendMessagesBatch({ messages, topicName }) {
          return sendMessagesBatch({ messages, topicName });
        },

        sendMessage({ messageBody, topicName }) {
          return sendMessage({ messageBody, topicName });
        },

        startMessageReception(topicName) {
          startReceivingMessages(topicName);
          return null;
        },

        stopMessageReception() {
          stopReceivingMessages();
          return null;
        },

        fetchReceivedMessages(topicName) {
          return getReceivedMessages(topicName);
        },

        generateJWT() {
          return generateJWT();
        },

        generateAccessToken() {
          return generateAccessToken();
        },

        readFileIfExists(filePath) {
          if (fs2.existsSync(filePath)) {
            return JSON.parse(fs2.readFileSync(filePath, "utf8"));
          }
          return null;
        },

        writeFile({ filePath, data }) {
          fs2.writeFileSync(filePath, JSON.stringify(data, null, 2));
          return `File updated: ${filePath}`;
        },

        fileExists(filePath) {
          return fs2.existsSync(path2.resolve(__dirname, filePath));
        },

        startDPSService() {
          const dir = process.env.WSL_TEST_DIR;
          if (!dir) throw new Error("⚠️ WSL_TEST_DIR not set in .env");

          const shellCommand = `cd ${dir} && ./stop -v && cd .. && cd ffc-pay-dps && cd scripts && ./start`;

          return new Promise((resolve) => {
            const child = spawn("wsl", ["bash", "-ic", shellCommand], { stdio: "pipe" });
            let output = "";

            const timeout = setTimeout(() => child.kill("SIGTERM"), 30000);

            child.stdout.on("data", (d) => (output += d.toString()));
            child.stderr.on("data", (d) => (output += d.toString()));

            child.on("close", () => {
              clearTimeout(timeout);
              resolve(output);
            });
          });
        },

        restartLocalEnv() {
          const dir = process.env.WSL_TEST_DIR;
          if (!dir) throw new Error("⚠️ WSL_TEST_DIR not set in .env");

          const shellCommand = `cd ${dir} && ./stop -v && ./start -p`;

          return new Promise((resolve, reject) => {
            const child = spawn("wsl", ["bash", "-ic", shellCommand], { stdio: "pipe" });
            let output = "";

            child.stdout.on("data", (d) => (output += d.toString()));
            child.stderr.on("data", (d) => (output += d.toString()));

            child.on("close", (code) => {
              code === 0 ? resolve(output) : reject(new Error(`restartLocalEnv failed with code ${code}`));
            });
          });
        },

        restartLocalDocEnv() {
          const dir = process.env.WSL_TEST_DIR;
          if (!dir) throw new Error("⚠️ WSL_TEST_DIR not set in .env");

          const shellCommand = `cd ${dir} && ./stop -v && ./start -d`;

          return new Promise((resolve, reject) => {
            const child = spawn("wsl", ["bash", "-ic", shellCommand], { stdio: "pipe" });
            let output = "";

            child.stdout.on("data", (d) => (output += d.toString()));
            child.stderr.on("data", (d) => (output += d.toString()));

            child.on("close", (code) => {
              code === 0 ? resolve(output) : reject(new Error(`restartLocalDocEnv failed with code ${code}`));
            });
          });
        },

        closeAllServices() {
          const dir = process.env.WSL_TEST_DIR;
          if (!dir) throw new Error("⚠️ WSL_TEST_DIR not set in .env");

          const shellCommand = `cd ${dir} && ./stop -v`;

          return new Promise((resolve, reject) => {
            const child = spawn("wsl", ["bash", "-ic", shellCommand], { stdio: "pipe" });
            let output = "";

            child.stdout.on("data", (d) => (output += d.toString()));
            child.stderr.on("data", (d) => (output += d.toString()));

            child.on("close", (code) => {
              code === 0 ? resolve(output) : reject(new Error(`closeAllServices failed with code ${code}`));
            });
          });
        },

        async startLocalDocEnv() {
          const dirs = [
            process.env.WSL_DOC_STATEMENT_DATA_DIR,
            process.env.WSL_DOC_STATEMENT_CONSTRUCTOR_DIR,
            process.env.WSL_DOC_STATEMENT_GENERATOR_DIR,
            process.env.WSL_DOC_STATEMENT_PUBLISHER_DIR,
            process.env.WSL_DOC_STATEMENT_RECEIVER_DIR
          ];

          dirs.forEach((dir) => {
            const child = spawn("wsl", ["bash", "-ic", `cd ${dir} && ./start`], {
              stdio: "pipe",
              detached: true
            });
            child.unref();
          });

          await new Promise((res) => setTimeout(res, 60000));
          return "All local doc environments restarted successfully";
        },

        async databaseQuery({ env, databaseName, sqlStatement }) {
          return databaseQuery(env, databaseName, sqlStatement);
        },

        async databaseInsert({ env, databaseName, sqlStatement }) {
          return databaseInsert(env, databaseName, sqlStatement);
        },

        async fetchStatementsBlobById({ env, container, dir, year }) {
          downloadStatementsBlobById(env, container, dir, year);
          return null;
        },

        async fetchPaymentsBlobById({ env, container, dir, scheme }) {
          downloadPaymentsBlobById(env, container, dir, scheme);
          return null;
        },

        async uploadFileToBlobStorage({ container, dir, scheme }) {
          await uploadFileToBlobStorage(container, dir, scheme);
          return null;
        },

        getDockerLogs(containerName) {
          return new Promise((resolve, reject) => {
            const proc = spawn("docker", ["logs", containerName]);
            let output = "";

            proc.stdout.on("data", (d) => (output += d.toString()));
            proc.stderr.on("data", (d) => (output += d.toString()));

            proc.on("close", () => resolve(output));
            proc.on("error", reject);
          });
        },

        loadReportData
      });
    } catch (err) {
  console.error("TASK REGISTRATION FAILED:", err);
    }
  return config;
  },
  
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/mocha",
      overwrite: false,
      html: false,
      json: true,
      charts: true,
      code: true,
      autoOpen: false,
      quiet: true,
      screenshotOnRunFailure: true,
      inlineAssets: true
    }
  }
});