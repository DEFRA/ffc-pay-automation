
import requestEditor from '../integration/pages/requestEditorPage';

Cypress.Commands.add('emptyFolder', (folderPath) => {
  cy.task('emptyFolder', folderPath).then((status) => {
    cy.log(status);
  });
});

Cypress.Commands.add('sendMessage', (messageBody, topicName) => {
  cy.task('sendMessage', { messageBody, topicName }).then((status) => {
    cy.log(status);
  });
});

Cypress.Commands.add('sendMessagesBatch', (messages, topicName) => {
  cy.task('sendMessagesBatch',  messages, topicName);
});

Cypress.Commands.add('startMessageReception', (topicName) => {
  cy.task('startMessageReception', topicName);
});

Cypress.Commands.add('fetchReceivedMessages', (topicName) => {
  return cy.task('fetchReceivedMessages', topicName);
});

Cypress.Commands.add('stopMessageReception', () => {
  cy.task('stopMessageReception');
});

Cypress.Commands.add('generateJWT', (payload, secret, options) => {
  return cy.task('generateJWT', { payload, secret, options });
});

Cypress.Commands.add('clickNextButtonUntilOnLastPage', () => {
  cy.get('body').then((body) => {
    if (body.find('[rel="next"] > .govuk-pagination__link-title').length > 0) {
      requestEditor.btnNext().scrollIntoView().click({ force: true });
      cy.clickNextButtonUntilOnLastPage();
    }
  });
});

Cypress.Commands.add('startDPSService', () => {
  cy.task('startDPSService', null, { timeout: 15 * 60 * 1000 }).then((output) => {
    const lines = output.split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
});

Cypress.Commands.add('restartLocalEnv', () => {
  cy.task('restartLocalEnv', null, { timeout: 15 * 60 * 1000 }).then((output) => {
    const lines = output.split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
});

Cypress.Commands.add('restartLocalDocEnv', () => {
  cy.task('restartLocalDocEnv', null, { timeout: 15 * 60 * 1000 }).then((output) => {
    const lines = output.split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
});

Cypress.Commands.add('startLocalDocEnv', () => {
  cy.task('startLocalDocEnv', null, { timeout: 15 * 60 * 1000 });
});


Cypress.Commands.add('closeAllServices', () => {
  cy.task('closeAllServices', null, { timeout: 15 * 60 * 1000 }).then((output) => {
    const lines = output.split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
});

Cypress.Commands.add('databaseQuery', (databaseName, sqlStatement) => {
  cy.task('databaseQuery', databaseName, sqlStatement);
});

Cypress.Commands.add('databaseInsert', (databaseName, sqlStatement) => {
  cy.task('databaseInsert', databaseName, sqlStatement);
});

Cypress.Commands.add('fetchStatementsBlobById', (container, dir, year) => {
  cy.task('fetchStatementsBlobById', container, dir, year);
});

Cypress.Commands.add('fetchPaymentsBlobById', (container, dir, scheme) => {
  cy.task('fetchPaymentsBlobById', container, dir, scheme);
});

Cypress.Commands.add('uploadFileToBlobStorage', (container, dir, scheme) => {
  cy.task('uploadFileToBlobStorage', container, dir, scheme);
});


Cypress.Commands.add('getDockerLogs', () => {
  cy.task('getDockerLogs').then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
});