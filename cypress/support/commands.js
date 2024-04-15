Cypress.Commands.add('emptyFolder', (folderPath) => {
  cy.task('emptyFolder', folderPath).then((status) => {
    cy.log(status);
  });
});

Cypress.Commands.add('sendMessage', (messageBody) => {
  cy.task('sendMessage', messageBody).then((status) => {
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