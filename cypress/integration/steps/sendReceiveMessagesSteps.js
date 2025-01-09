/* global Given, When, Then */

Given('I send the updated {string} message to the service bus topic {string}', (message, topicName) => {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${message}.json`;

  cy.readFile(inputFilePath).then((updatedMessageBody) => {
    cy.sendMessage(updatedMessageBody, topicName);
  });
  cy.wait(5000);
});

Given('I send the updated PPA message to the service bus topic {string}', (topicName) => {
  cy.get('@updatedReturnFileBodyPPA').then((updatedReturnFileBodyPPA) => {
    cy.sendMessage(updatedReturnFileBodyPPA, topicName);
    // Cypress.env('updatedMessageBody', updatedMessageBody);
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

Then('the {string} message should be received successfully for the service bus topic {string}', (message, topicName) => {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${message}.json`;
  const outputFilePath = `cypress/fixtures/messageTemplates/outputMessage/${topicName}.json`;

  cy.readFile(inputFilePath).then((expectedMessage) => {

    cy.fetchReceivedMessages(topicName).then((messages) => {
      expect(messages.length).to.be.greaterThan(0);
      console.log(messages);

      const receivedMessage = messages.find(message => message.frn === expectedMessage.frn);
      const { invoiceNumber, paymentRequestNumber, contractNumber, frn } = receivedMessage;
      const numericPartOfInvoice = invoiceNumber.match(/\d+/)[0];
      const paddedPaymentRequest = paymentRequestNumber.toString().padStart(3, '0');
      const regeneratedInvoiceNumber = `S${numericPartOfInvoice}${contractNumber}V${paddedPaymentRequest}`;

      cy.wrap(regeneratedInvoiceNumber).as('regeneratedInvoiceNumber');
      cy.wrap(paddedPaymentRequest).as('paddedPaymentRequest');
      cy.log('Regenerated Invoice Number:', regeneratedInvoiceNumber);
      Cypress.env('regeneratedInvoiceNumber', regeneratedInvoiceNumber);
      Cypress.env('paddedPaymentRequest', paddedPaymentRequest);
      cy.log('Regenerated FRN:', frn);
      cy.log('paddedPaymentRequest:', paddedPaymentRequest);
      Cypress.env('frn', frn);

      Object.keys(receivedMessage).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(expectedMessage, key)) {
          expect(receivedMessage[key], `${key}`).to.deep.equal(expectedMessage[key]);
        }
      });

      cy.writeFile(outputFilePath, JSON.stringify(receivedMessage, null, 2).replace(/: /g, ':'));
    });
  });

  cy.stopMessageReception();
});

Then('the PPA message should be received successfully for the service bus topic {string}', (topicName) => {
  cy.get('@updatedReturnFileBodyPPA').then((expectedMessage) => {

    cy.fetchReceivedMessages(topicName).then((messages) => {
      expect(messages.length).to.be.greaterThan(0);
      console.log(messages);

      const receivedMessage = messages.find(message => message.frn === expectedMessage.frn);

      Object.keys(receivedMessage).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(expectedMessage, key)) {
          expect(receivedMessage[key], `${key}`).to.deep.equal(expectedMessage[key]);
        }
      });
    });
  });

  cy.stopMessageReception();
});

Then('I check service bus topic {string} for received messages', (topicName) => {
  const updatedFRN = Cypress.env('updatedMessageBody').paymentRequest.frn;

  cy.fetchReceivedMessages(topicName).then((messages) => {
    expect(messages.length).to.be.greaterThan(0);
    console.log(messages);

    const receivedMessage = messages.find(message => message.frn === updatedFRN);
    cy.log(receivedMessage);
  });

  cy.stopMessageReception();
});

Then('the response message should be received successfully for the service bus topic {string}', (topicName) => {
  cy.get('@updatedReturnFileBody').then((expectedMessage) => {

    cy.fetchReceivedMessages(topicName).then((messages) => {
      expect(messages.length).to.be.greaterThan(0);

      const receivedMessage = messages.find(message => message.invoiceNumber === expectedMessage.invoiceNumber);

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

When('I create a message with the filename {string} and update the following keys to match the previous scenario:', (inputTopicName, dataTable) => {
  cy.updateReturnFilePPA(inputTopicName, dataTable);
});

Given('I synchronize keys in {string} with values from {string}', (file2, file1) => {
  cy.syncFixtureKeys(file1, file2);
});

Given('I regenerate the invoice number for {string}', (file) => {
  cy.regenerateInvoiceNumber(file);
});