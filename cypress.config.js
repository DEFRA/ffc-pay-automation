const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    TAGS: 'not @ignore',
  },
  chromeWebSecurity: false,
  watchForFileChanges: false,
  viewportHeight: 720,
  viewportWidth: 1280,
  videoUploadOnPasses: false,
  defaultCommandTimeout: 5000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents (on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    excludeSpecPattern: ['*.js', '*.md'],
    specPattern: 'cypress/integration/**/*.feature',
  },
});