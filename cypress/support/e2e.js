import 'cypress-axe';
import addContext from 'mochawesome/addContext';

// ------------------------------------------------------------
// STEP LOGGING
// ------------------------------------------------------------

Cypress.on('log:step', (step) => {
  // This event is triggered manually from steps if you want step logs
  cy.once('test:after:run', (test) => {
    addContext({ test }, {
      title: 'Step',
      value: step
    });
  });
});

// Helper for step logging inside step definitions:
//   Cypress.emit('log:step', 'Given I do something');
//
// This avoids using Cucumber hooks (which cannot access Mocha test context).

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