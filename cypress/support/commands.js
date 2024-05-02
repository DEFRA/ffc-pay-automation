import requestEditor from '../integration/pages/requestEditorPage';

Cypress.Commands.add('emptyFolder', (folderPath) => {
  cy.task('emptyFolder', folderPath).then((status) => {
    cy.log(status);
  });
});

Cypress.Commands.add('sendMessageTopic', (messageBody) => {
  cy.task('sendMessageTopic', messageBody).then((status) => {
    cy.log(status);
  });
});

Cypress.Commands.add('sendMessageQueue', (messageBody) => {
  cy.task('sendMessageQueue', messageBody).then((status) => {
    cy.log(status);
  });
});

Cypress.Commands.add('startMessageReception', () => {
  cy.task('startMessageReception');
});

Cypress.Commands.add('fetchReceivedMessages', () => {
  return cy.task('fetchReceivedMessages');
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