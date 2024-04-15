/* global Given, Then */

Given('I send a message to the service bus topic', () => {
  cy.fixture('topicMessageBody.json').then((messageBody) => {
    cy.log(messageBody);
    cy.sendMessage(messageBody);
  });
});

Given(/^I send a message to the service bus topic with "(.*)" set to "(.*)"$/, (field, newValue) => {
  cy.fixture('topicMessageBody.json').then((messageBody) => {
    // Log the original message body
    cy.log('Original message body:', JSON.stringify(messageBody));

    // Function to set a new value at a specific path in an object
    function setFieldValueAtPath (obj, path, value) {
      const fields = path.split('.');
      const lastField = fields.pop();
      const lastObj = fields.reduce((o, f) => o[f], obj);
      lastObj[lastField] = value;
      cy.log(`Updated "${path}" to "${newValue}"`);  // Log the path and new value
    }

    // Set the new value at the specified path
    setFieldValueAtPath(messageBody, field, newValue);

    // Log the updated message body
    cy.log('Updated message body with new value:', JSON.stringify(messageBody));

    // Send the updated message
    cy.sendMessage(messageBody);
  });
});

Then('the message should be received successfully', () => {
  cy.fetchReceivedMessages().then((messages) => {
    expect(messages.length).to.be.greaterThan(0);
    cy.log(messages);
  });
});