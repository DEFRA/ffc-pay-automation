import 'cypress-axe';
import addContext from 'mochawesome/addContext';

Cypress.on('uncaught:exception', (err) => {
  if (err.message && err.message.includes('cross-origin frame')) {
    return false;
  }
});

let stepLog = [];
let pendingContext = [];
let screenshotPathsThisTest = [];

// STEP LOGGING

Cypress.on('log:step', (step) => {
  stepLog.push(step);
});

// SCREENSHOT CAPTURE

Cypress.Screenshot.defaults({
  onAfterScreenshot (_details, results) {
    if (results && results.path) {
      screenshotPathsThisTest.push(results.path);
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

  // Convert each screenshot to a base64 data URI so that embedded screenshots are not lost upon file transfer
  screenshotPathsThisTest.forEach((screenshotPath) => {
    cy.task('readScreenshotAsBase64', screenshotPath, { log: false }).then((base64) => {
      if (base64) {
        pendingContext.push({
          title: 'Screenshot',
          value: `data:image/png;base64,${base64}`
        });
      }
    });
  });
  screenshotPathsThisTest = [];
});

Cypress.on('test:after:run', (test) => {
  pendingContext.forEach(({ title, value }) => {
    addContext({ test }, { title, value });
  });
  pendingContext = [];
});

// ERROR LOGGING

Cypress.on('fail', (error, runnable) => {
  addContext({ test: runnable }, {
    title: 'Error',
    value: error.message
  });

  throw error;
});