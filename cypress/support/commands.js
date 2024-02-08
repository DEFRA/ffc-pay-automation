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