/* global Given, When, Then */

import RandExp from 'randexp';

Given('I send the updated message to the service bus topic {string}', (topicName) => {
  cy.get('@updatedInputMessageBody').then((updatedMessageBody) => {
    cy.sendMessage(updatedMessageBody, topicName);
    Cypress.env('updatedMessageBody', updatedMessageBody);
  });
  cy.wait(5000);
});

Given('I send the updated return file message to the service bus topic {string}', (topicName) => {
  cy.get('@updatedReturnFileBody').then((updatedReturnFileBody) => {
    cy.sendMessage(updatedReturnFileBody, topicName);
  });
  cy.wait(5000);
});

Given('I start the messaging service on for the service bus topic {string}', (topicName) => {
  cy.startMessageReception(topicName);
});

Given('I stop the messaging service', () => {
  cy.stopMessageReception();
});

Then('the message should be matching the output message for the service bus topic {string}', (topicName) => {
  cy.get('@updatedOutputMessageBody').then((expectedMessage) => {

    cy.fetchReceivedMessages(topicName).then((messages) => {
      expect(messages.length).to.be.greaterThan(0);

      // Find the message that matches the expected one
      const receivedMessage = messages.find(message => message.invoiceNumber === expectedMessage.invoiceNumber);

      // Iterate over each field in receivedMessage and check if it exists in expectedMessage
      Object.keys(receivedMessage).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(expectedMessage, key)) {
          expect(receivedMessage[key], `${key}`).to.deep.equal(expectedMessage[key]);
        }
      });
    });
  });

  cy.stopMessageReception();
});

Then('the message should be received successfully for the service bus topic {string}', (topicName) => {
  cy.get('@updatedInputMessageBody').then((expectedMessage) => {

    cy.fetchReceivedMessages(topicName).then((messages) => {
      expect(messages.length).to.be.greaterThan(0);
      console.log(messages);

      const receivedMessage = messages.find(message => message.frn === expectedMessage.frn);

      const { invoiceNumber, paymentRequestNumber, contractNumber } = receivedMessage;

      const numericPartOfInvoice = invoiceNumber.match(/\d+/)[0]; // Extract numeric part of invoice number
      const paddedPaymentRequest = paymentRequestNumber.toString().padStart(3, '0'); // Pad payment request to 3 digits

      const regeneratedInvoiceNumber = `S${numericPartOfInvoice}${contractNumber}V${paddedPaymentRequest}`;

      cy.wrap(regeneratedInvoiceNumber).as('regeneratedInvoiceNumber');
      cy.log('Regenerated Invoice Number:', regeneratedInvoiceNumber);
      Cypress.env('regeneratedInvoiceNumber', regeneratedInvoiceNumber);

      // });

      // Iterate over each field in receivedMessage and check if it exists in expectedMessage
      Object.keys(receivedMessage).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(expectedMessage, key)) {
          expect(receivedMessage[key], `${key}`).to.deep.equal(expectedMessage[key]);
        }
      });
    });
  });

  cy.stopMessageReception();
});

Then('the response message should be received successfully for the service bus topic {string}', (topicName) => {
  cy.get('@updatedReturnFileBody').then((expectedMessage) => {

    cy.fetchReceivedMessages(topicName).then((messages) => {
      expect(messages.length).to.be.greaterThan(0);

      // Find the message that matches the expected one
      const receivedMessage = messages.find(message => message.invoiceNumber === expectedMessage.invoiceNumber);

      // Iterate over each field in receivedMessage and check if it exists in expectedMessage
      Object.keys(receivedMessage).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(expectedMessage, key)) {
          expect(receivedMessage[key], `${key}`).to.deep.equal(expectedMessage[key]);
        }
      });
    });
  });

  cy.stopMessageReception();
});

When('I create a message with the filename {string} and update the following keys:', (inputTopicName, dataTable) => {
  cy.updatePaymentFile(inputTopicName, dataTable);
});

When('I create a return file message with the filename {string} and update the following keys:', (inputTopicName, dataTable) => {
  cy.updateReturnFile(inputTopicName, dataTable);
});

Given('I update the message {string} with the existing frn and invoice number', (fixtureFileName) => {
  const updatedMessageBody = Cypress.env('updatedMessageBody');

  // Extract frn and invoiceNumber from the environment variable
  const { frn, invoiceNumber } = updatedMessageBody;

  const filePath = `cypress/fixtures/messageTemplates/inputMessage/${fixtureFileName}.json`;

  cy.readFile(filePath).then((fileContent) => {
    // Update the file content with the frn and invoiceNumber
    fileContent.frn = frn;
    fileContent.invoiceNumber = invoiceNumber;

    // Alias the updated content for further use in tests
    cy.wrap(fileContent).as('updatedContent');
  });
});