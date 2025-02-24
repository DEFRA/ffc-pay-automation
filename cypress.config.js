const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  watchForFileChanges: false,
  viewportHeight: 720,
  viewportWidth: 1280,
  defaultCommandTimeout: 10000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents (on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    excludeSpecPattern: ['*.js', '*.md'],
    specPattern: 'cypress/integration/**/*.feature',
    experimentalMemoryManagement: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});