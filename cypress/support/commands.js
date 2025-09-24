
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

Cypress.Commands.add('startMessageReception', (topicName) => {
  cy.task('startMessageReception', topicName);
});

Cypress.Commands.add('fetchReceivedMessages', (topicName) => {
  return cy.task('fetchReceivedMessages', topicName);
});

Cypress.Commands.add('stopMessageReception', () => {
  cy.task('stopMessageReception');
});

Cypress.Commands.add('clickNextButtonUntilOnLastPage', () => {
  cy.get('body').then((body) => {
    if (body.find('[rel="next"] > .govuk-pagination__link-title').length > 0) {
      requestEditor.btnNext().scrollIntoView().click({ force: true });
      cy.clickNextButtonUntilOnLastPage();
    }
  });
});

Cypress.Commands.add('restartLocalEnv', () => {
  cy.task('restartLocalEnv', null, { timeout: 15 * 60 * 1000 }).then((output) => {
    const lines = output.split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        cy.log(line);
      }
    });
  });
});

Cypress.Commands.add('restartLocalDocEnv', () => {
  cy.task('restartLocalDocEnv', null, { timeout: 15 * 60 * 1000 }).then((output) => {
    const lines = output.split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        cy.log(line);
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
        cy.log(line);
      }
    });
  });
});

Cypress.Commands.add('getStatementData', () => {
  cy.task('getStatementData');
});

Cypress.Commands.add('insertStatementData', () => {
  cy.task('insertStatementData');
});

Cypress.Commands.add('insertIncorrectStatementData', () => {
  cy.task('insertIncorrectStatementData');
});

Cypress.Commands.add('insertIncorrectStatementConstructor', () => {
  cy.task('insertIncorrectStatementConstructor');
});

Cypress.Commands.add('insertIncorrectStatementGenerator', () => {
  cy.task('insertIncorrectStatementGenerator');
});

Cypress.Commands.add('insertIncorrectStatementPublisher', () => {
  cy.task('insertIncorrectStatementPublisher');
});

Cypress.Commands.add('confirmStatementDataNotAdded', () => {
  cy.task('confirmStatementDataNotAdded');
});

Cypress.Commands.add('confirmStatementConstructorNotAdded', () => {
  cy.task('confirmStatementConstructorNotAdded');
});

Cypress.Commands.add('confirmStatementGeneratorNotAdded', () => {
  cy.task('confirmStatementGeneratorNotAdded');
});

Cypress.Commands.add('confirmStatementPublisherNotAdded', () => {
  cy.task('confirmStatementPublisherNotAdded');
});

Cypress.Commands.add('confirmPayProcessingNotAdded', () => {
  cy.task('confirmPayProcessingNotAdded');
});

Cypress.Commands.add('getStatementConstructorData', () => {
  cy.task('getStatementConstructorData');
});

Cypress.Commands.add('getStatementGeneratorData', () => {
  cy.task('getStatementGeneratorData');
});

Cypress.Commands.add('getStatementPublisherData', () => {
  cy.task('getStatementPublisherData');
});

Cypress.Commands.add('getPayInjectionData', () => {
  cy.task('getPayInjectionData');
});

Cypress.Commands.add('getPayProcessingData', () => {
  cy.task('getPayProcessingData');
});

Cypress.Commands.add('confirmReturnPayProcessingData', () => {
  cy.task('confirmReturnPayProcessingData');
});

Cypress.Commands.add('getPaySubmissionData', () => {
  cy.task('getPaySubmissionData');
});

Cypress.Commands.add('fetchStatementsBlobById', (container, dir) => {
  cy.task('fetchStatementsBlobById', container, dir);
});

Cypress.Commands.add('fetchPaymentsBlobById', (container, dir, scheme) => {
  cy.task('fetchPaymentsBlobById', container, dir, scheme);
});

Cypress.Commands.add('getDockerLogs', () => {
  cy.task('getDockerLogs').then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        cy.log(line);
      }
    });
  });
});