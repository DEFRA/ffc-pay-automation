/* global Given, Then */

Given('I send a message to the service bus {string}', (type) => {

  if (type === 'queue') {
    const messageBody = 'I am sending a message through Cypress!';
    cy.sendMessageQueue(messageBody);
  } else {
    cy.fixture('topicMessageBody.json').then((messageBody) => {
      cy.log(messageBody);
      cy.sendMessageTopic(messageBody);
    });
  }
});

Then('the message should be received successfully', () => {
  cy.fetchReceivedMessages().then((messages) => {
    expect(messages.length).to.be.greaterThan(0);
    cy.log(messages);
  });
});