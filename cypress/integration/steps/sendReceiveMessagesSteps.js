/* global Given, When, Then */

import RandExp from 'randexp';

Given('I send the updated message to the service bus topic {string}', (topicName) => {
  cy.get('@updatedInputMessageBody').then((updatedMessageBody) => {
    cy.sendMessage(updatedMessageBody, topicName);
    Cypress.env('updatedMessageBody', updatedMessageBody);
  });
  cy.wait(5000);
});

Given('I send the updated response message to the service bus topic {string}', (topicName) => {
  cy.get('@updatedContent').then((updatedContent) => {
    cy.sendMessage(updatedContent, topicName);
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

Then('the response message should be received successfully for the service bus topic {string}', (topicName) => {
  cy.get('@updatedContent').then((expectedMessage) => {

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

When('I create a message for the service bus topics {string} and {string} and update the following keys:', (inputTopicName, responseTopicName, dataTable) => {
  createMessageForServiceBusTopics(inputTopicName, responseTopicName, dataTable);
});

When('I create a message for the service bus topic {string} and update the following keys:', (inputTopicName, dataTable) => {
  createMessageForServiceBusTopics(inputTopicName, null, dataTable);
});

When('I create a message with the filename {string} and update the following keys:', (inputTopicName, dataTable) => {
  createMessageForServiceBusTopics(inputTopicName, null, dataTable);
});

function createMessageForServiceBusTopics (inputTopicName, responseTopicName, dataTable) {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;
  const responseFilePath = responseTopicName ? `cypress/fixtures/messageTemplates/outputMessage/${responseTopicName}.json` : null;

  const generateRandomValue = (key, existingValue) => {
    if (key === 'schedule') {
      const options = ['Q1', 'Q2', 'Q3', 'Q4'].filter(option => option !== existingValue);
      return options[Math.floor(Math.random() * options.length)];
    } else if (key === 'agreementNumber') {
      return 'SIP' + Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
    } else if (key === 'frn' || key === 'sbi') {
      return existingValue.toString().replace(/\d/g, () => Math.floor(Math.random() * 10));
    } else if (typeof existingValue === 'string') {
      let pattern = '^';
      for (const char of existingValue) {
        if (char.match(/\d/)) {
          pattern += '\\d';
        } else if (char.match(/[a-zA-Z]/)) {
          pattern += '[a-zA-Z]';
        } else {
          pattern += '\\' + char;
        }
      }
      pattern += '$';
      return new RandExp(pattern).gen();
    } else if (typeof existingValue === 'number') {
      return Math.floor(Math.random() * 10000);
    } else if (typeof existingValue === 'boolean') {
      return Math.random() < 0.5;
    } else if (existingValue instanceof Array) {
      return existingValue.map(item => generateRandomValue(key, item));
    } else if (existingValue instanceof Object) {
      const newObj = { ...existingValue };
      for (const nestedKey in newObj) {
        newObj[nestedKey] = generateRandomValue(nestedKey, newObj[nestedKey]);
      }
      return newObj;
    }
    return null;
  };

  const generateRandomAgreementNumber = () => {
    const randomDigits = Math.floor(1000000000000 + Math.random() * 9000000000000);
    return `SIP${randomDigits}`;
  };

  const updateKeys = (obj, updates, valuesMap = {}, excludedKeys = []) => {
    let keyUpdated = false;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          const updated = updateKeys(obj[key], updates, valuesMap, excludedKeys);
          if (updated) {
            keyUpdated = true;
          }
        } else if (updates.includes(key) && !excludedKeys.includes(key)) {
          if (!(key in valuesMap)) {
            valuesMap[key] = generateRandomValue(key, obj[key]);
          }
          obj[key] = valuesMap[key];
          keyUpdated = true;
        }
      }
    }
    return keyUpdated;
  };

  const updateInvoiceNumbers = (obj, currentAgreementNumber, newAgreementNumber, allowedKeys = ['agreementNumber', 'invoiceLines']) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          updateInvoiceNumbers(obj[key], currentAgreementNumber, newAgreementNumber, allowedKeys);
        } else if (allowedKeys.includes(key) && typeof obj[key] === 'string' && obj[key].includes(currentAgreementNumber)) {
          obj[key] = obj[key].split(currentAgreementNumber).join(newAgreementNumber);
        }
      }
    }
  };

  cy.readFile(inputFilePath).then((inputMessageBody) => {
    const updates = dataTable.rawTable.flat();
    const currentAgreementNumber = inputMessageBody.agreementNumber;
    const newAgreementNumber = generateRandomAgreementNumber();

    inputMessageBody.agreementNumber = newAgreementNumber;
    if (inputMessageBody.invoiceLines) {
      inputMessageBody.invoiceLines.forEach(line => (line.agreementNumber = newAgreementNumber));
    }
    updateInvoiceNumbers(inputMessageBody, currentAgreementNumber, newAgreementNumber, ['invoiceLines', 'agreementNumber']);

    const valuesMap = {};
    const inputKeyExists = updateKeys(inputMessageBody, updates, valuesMap, ['excludedKey1', 'excludedKey2']);

    cy.wrap(inputMessageBody).as('updatedInputMessageBody');

    if (responseFilePath) {
      cy.readFile(responseFilePath).then((outputMessageBody) => {
        outputMessageBody.agreementNumber = newAgreementNumber;
        if (outputMessageBody.invoiceLines) {
          outputMessageBody.invoiceLines.forEach(line => (line.agreementNumber = newAgreementNumber));
        }
        updateInvoiceNumbers(outputMessageBody, currentAgreementNumber, newAgreementNumber, ['invoiceLines', 'agreementNumber']);

        const responseKeyExists = updateKeys(outputMessageBody, updates, valuesMap, ['excludedKey1', 'excludedKey2']);

        if (!inputKeyExists && !responseKeyExists) {
          cy.log('None of the specified keys were found in either message body');
        }

        cy.wrap(outputMessageBody).as('updatedOutputMessageBody');
      });
    } else {
      cy.log('No response topic name provided, skipping response file updates');
      if (!inputKeyExists) {
        cy.log('None of the specified keys were found in the input message body');
      }
    }
  });
}

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