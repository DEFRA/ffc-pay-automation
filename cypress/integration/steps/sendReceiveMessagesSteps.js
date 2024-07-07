/* global Given, Then */

Given('I send a message to the service bus topic', () => {
  cy.fixture('messageBody.json').then((messageBody) => {
    cy.sendMessage(messageBody);
  });
});

Given(/^I send a message to the service bus topic with "(.*)" set to "(.*)"$/, (field, newValue) => {
  cy.fixture('messageBody.json').then((messageBody) => {
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

    // Read the JSON file using cy.fixture for comparison
    cy.fixture('messageBody.json').then((expectedMessage) => {
      // Find the message that matches the expected one
      const receivedMessage = messages.find(message => message.correlationId === expectedMessage.correlationId);

      // Assert that the received message matches the expected message
      expect(receivedMessage).to.deep.equal(expectedMessage);
    });
  });
});



Given('I create a message with a unique agreement number', () => {
// Function to generate a random agreement number
function generateRandomAgreementNumber(prefix) {
  const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
  return `${prefix}${randomDigits}`;
}
  // Read the JSON file using cy.fixture
  cy.fixture('messageBody.json').then((messageBody) => {
    // Extract the current agreement number and generate a new one
    const currentAgreementNumber = messageBody.agreementNumber;
    const prefix = currentAgreementNumber.charAt(0);
    const newAgreementNumber = generateRandomAgreementNumber(prefix);

    // Update the agreement number in the main object and invoice lines
    messageBody.agreementNumber = newAgreementNumber;
    messageBody.invoiceLines.forEach(line => {
      line.agreementNumber = newAgreementNumber;
    });

    // Update the agreement number in the invoice number
    const invoiceNumberParts = messageBody.invoiceNumber.split(currentAgreementNumber);
    messageBody.invoiceNumber = invoiceNumberParts.join(newAgreementNumber);

    // Write the updated data back to the JSON file
    const updatedMessageBody = JSON.stringify(messageBody, null, 2);

    // Save the updated messageBody back to the fixture file
    cy.writeFile('cypress/fixtures/messageBody.json', updatedMessageBody);
  });
});