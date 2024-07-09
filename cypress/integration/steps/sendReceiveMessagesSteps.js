/* global Given, Then */

Given('I send a message to the service bus topic {string}', (inputTopicName) => {
  cy.fixture('services.json').then((services) => {
    const topicName = services[inputTopicName].topicName;

    cy.fixture('messageBody.json').then((messageBody) => {
      cy.sendMessage(messageBody, topicName);
    });
  });
});

Then('the message should be received successfully for topic {string}', (inputTopicName) => {
  cy.fixture('services.json').then((services) => {
    const topicName = services[inputTopicName].topicName;

    cy.startMessageReception(topicName);
    cy.fetchReceivedMessages().then((messages) => {
      expect(messages.length).to.be.greaterThan(0);

      cy.fixture('messageBody.json').then((expectedMessage) => {
        // Find the message that matches the expected one
        const receivedMessage = messages.find(message => message.correlationId === expectedMessage.correlationId);

        expect(receivedMessage).to.deep.equal(expectedMessage);
      });
    });
  });
});

Given('I create a message with a unique agreement number', () => {
  // Function to generate a random agreement number
  function generateRandomAgreementNumber (prefix) {
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