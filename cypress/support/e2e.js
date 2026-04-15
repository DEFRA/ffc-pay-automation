import 'cypress-axe';
import addContext from 'mochawesome/addContext';

Cypress.on('uncaught:exception', (err) => {
  if (err.message && err.message.includes('cross-origin frame')) {
    return false;
  }
});

// Step log for the current test
let stepLog = [];

// Context objects staged for the current test
let pendingContext = [];

// Screenshot paths for the current test
let screenshotsThisTest = [];

// ------------------------------------------------------------
// STEP LOGGING
// ------------------------------------------------------------

Cypress.on('log:step', (step) => {
  stepLog.push(step);
});

// ------------------------------------------------------------
// SCREENSHOT CAPTURE
// ------------------------------------------------------------

Cypress.Screenshot.defaults({
  onAfterScreenshot(_details, results) {
    // results.path is the full path to the screenshot file
    if (results && results.path) {
      screenshotsThisTest.push(results.path);
    }
  }
});

afterEach(() => {
  if (stepLog.length > 0) {
    stepLog.forEach((step) => {
      pendingContext.push({ title: 'Step', value: step });
    });
    stepLog = [];
  }
});

// ------------------------------------------------------------
// Attach steps + screenshots + errors
// ------------------------------------------------------------

Cypress.on('test:after:run', (test) => {
  // Attach steps
  pendingContext.forEach(({ title, value }) => {
    addContext({ test }, { title, value });
  });
  pendingContext = [];

  // Attach screenshots
  screenshotsThisTest.forEach((path) => {
    const relativePath = path.replace(/^cypress[\\/]/, '../../');
    addContext({ test }, {
      title: 'Screenshot',
      value: relativePath
    });
  });
  screenshotsThisTest = [];
});


// ------------------------------------------------------------
// ERROR LOGGING
// ------------------------------------------------------------

Cypress.on('fail', (error, runnable) => {
  addContext({ test: runnable }, {
    title: 'Error',
    value: error.message
  });

  throw error;
});