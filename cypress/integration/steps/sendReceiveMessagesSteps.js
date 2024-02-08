/* global Given, Then */

Given('I send a message to the service bus {string}', (type) => {

  if (type === 'queue') {
    const messageBody = 'I am Kiran and sent message through JavaScript!';
    cy.sendMessageQueue(messageBody);
  } else {
    cy.fixture('topicMessageBody.json').then((messageBody) => {
      cy.sendMessageQueue(messageBody);
    });
  }
});

Then('the message should be received successfully', () => {
  cy.fetchReceivedMessages().then((messages) => {
    expect(messages.length).to.be.greaterThan(0);
  });
});