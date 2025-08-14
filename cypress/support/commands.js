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