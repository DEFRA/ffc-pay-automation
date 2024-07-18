/* global Given, When, Then */

import RandExp from 'randexp';

Given('I send the updated message to the service bus topic {string}', (topicName) => {
  cy.get('@updatedMessageBody').then((updatedMessageBody) => {
    cy.sendMessage(updatedMessageBody, topicName);
  });
});

Then('the message should be received successfully for the service bus topic {string}', (topicName) => {
  cy.startMessageReception(topicName);
  cy.fetchReceivedMessages().then((messages) => {
    expect(messages.length).to.be.greaterThan(0);

    cy.get('@updatedMessageBody').then((expectedMessage) => {
      // Find the message that matches the expected one
      const receivedMessage = messages.find(message => message.correlationId === expectedMessage.correlationId);

      expect(receivedMessage).to.deep.equal(expectedMessage);
    });
  });
});

When('I create a message for the service bus topic {string} and update the following keys:', (topicName, dataTable) => {
  const filePath = `cypress/fixtures/messageTemplates/${topicName}.json`;

  // Utility function to generate a random value based on custom rules
  const generateRandomValue = (key, existingValue) => {
    if (key === 'schedule') {
      // Ensure schedule is one of Q1, Q2, Q3, or Q4 and not the existing value
      const options = ['Q1', 'Q2', 'Q3', 'Q4'].filter(option => option !== existingValue);
      return options[Math.floor(Math.random() * options.length)];
    } else if (key === 'agreementNumber') {
      // Ensure the first 3 letters are always SIP and followed by 13 random digits
      return 'SIP' + Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
    } else if (key === 'invoiceNumber') {
      // Preserve all letters, only change the integers, and keep the part V001 intact
      return existingValue.replace(/\d(?![^V]*$)/g, () => Math.floor(Math.random() * 10));
    } else if (key === 'frn' || key === 'sbi') {
      // Preserve the length of FRN and SBI
      return existingValue.toString().replace(/\d/g, () => Math.floor(Math.random() * 10));
    } else if (typeof existingValue === 'string') {
      // General pattern for strings
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
      // If the value is a number
      return Math.floor(Math.random() * 10000);
    } else if (typeof existingValue === 'boolean') {
      // If the value is a boolean
      return Math.random() < 0.5;
    } else if (existingValue instanceof Array) {
      // If the value is an array
      return existingValue.map(item => generateRandomValue(key, item));
    } else if (existingValue instanceof Object) {
      // If the value is an object
      const newObj = { ...existingValue };
      for (const nestedKey in newObj) {
        newObj[nestedKey] = generateRandomValue(nestedKey, newObj[nestedKey]);
      }
      return newObj;
    }
    return null;
  };

  // Function to update the specified keys in the message body
  const updateKeys = (obj, updates, valuesMap = {}) => {
    let keyUpdated = false;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          const updated = updateKeys(obj[key], updates, valuesMap);
          if (updated) {
            keyUpdated = true;
          }
        } else if (updates.includes(key)) {
          // Use the same new value for all instances of the same key
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

  // Function to generate a random agreement number with SIP prefix
  const generateRandomAgreementNumber = () => {
    const randomDigits = Math.floor(1000000000000 + Math.random() * 9000000000000); // Generates a random 13-digit number
    return `SIP${randomDigits}`;
  };

  // Function to update nested invoice numbers
  const updateInvoiceNumbers = (obj, currentAgreementNumber, newAgreementNumber) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          updateInvoiceNumbers(obj[key], currentAgreementNumber, newAgreementNumber);
        } else if (typeof obj[key] === 'string' && obj[key].includes(currentAgreementNumber)) {
          obj[key] = obj[key].split(currentAgreementNumber).join(newAgreementNumber);
        }
      }
    }
  };

  cy.readFile(filePath).then((messageBody) => {
    // Convert data table to an array of keys
    const updates = dataTable.rawTable.flat();

    // Extract the current agreement number and generate a new one
    const currentAgreementNumber = messageBody.agreementNumber;
    const newAgreementNumber = generateRandomAgreementNumber();

    // Update the agreement number in the main object and invoice lines
    messageBody.agreementNumber = newAgreementNumber;
    messageBody.invoiceLines.forEach(line => {
      line.agreementNumber = newAgreementNumber;
    });

    // Update the agreement number in the invoice number
    updateInvoiceNumbers(messageBody, currentAgreementNumber, newAgreementNumber);

    const keyExists = updateKeys(messageBody, updates);

    if (!keyExists) {
      cy.log('None of the specified keys were found in the message body');
    }

    cy.wrap(messageBody).as('updatedMessageBody');
    cy.log(`Message for topic ${topicName} created and updated`);
    cy.log('Updated keys:', updates); // Log the updated keys
  });
});