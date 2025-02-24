const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const { emptyFolder } = require('./cypress/utils/empty-folder');
const { sendMessage } = require('./cypress/utils/sendMessage');
const { startReceivingMessages, stopReceivingMessages, getReceivedMessages } = require('./cypress/utils/receiveMessage');

module.exports = defineConfig({
  chromeWebSecurity: false,
  watchForFileChanges: false,
  viewportHeight: 720,
  viewportWidth: 1280,
  defaultCommandTimeout: 10000,
  e2e: {
    async setupNodeEvents (on, config) {
      // Set up the ESBuild bundler with Cucumber plugin
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);

      // Define custom tasks
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
        }
      });

      console.log(on);
      console.log(config);

      return config;
    },
    specPattern: 'cypress/integration/features/**/*.feature',
    chromeWebSecurity: false,
    excludeSpecPattern: ['*.js', '*.md'],
    experimentalMemoryManagement: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});