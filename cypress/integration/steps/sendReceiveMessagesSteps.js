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

  const readFileWithRetry = (filePath, retries = 3) => {
    return new Cypress.Promise((resolve, reject) => {
      const tryRead = (attemptsLeft) => {
        cy.readFile(filePath).then((content) => {
          if (Object.keys(content).length > 0) {
            resolve(content);
          } else if (attemptsLeft > 0) {
            cy.wait(500);
            tryRead(attemptsLeft - 1);
          } else {
            reject(new Error(`Failed to read non-empty content from file: ${filePath}`));
          }
        });
      };
      tryRead(retries);
    });
  };

  readFileWithRetry(inputFilePath).then((expectedMessage) => {
    cy.fetchReceivedMessages(topicName).then((messages) => {
      expect(messages.length).to.be.greaterThan(0);
      console.log(messages);

      const receivedMessage = messages.find((msg) => msg.frn === expectedMessage.frn);

      Object.keys(receivedMessage).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(expectedMessage, key)) {
          expect(receivedMessage[key], `${key}`).to.deep.equal(expectedMessage[key]);
        }
      });

      cy.writeFile(outputFilePath, JSON.stringify(receivedMessage, null, 2).replace(/: /g, ':'));
    });
  }).catch((error) => {
    throw new Error(`Error in reading expected message: ${error.message}`);
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

Given('I regenerate the invoice number for {string} using the invoice number from {string}', (file, reference) => {
  cy.regenerateInvoiceNumber(file, reference);
});

Given('I increase the invoice number by "{int}" for {string} using the invoice number from {string}', (number, file, reference) => {
  cy.increaseInvoiceNumber(number, file, reference);
});