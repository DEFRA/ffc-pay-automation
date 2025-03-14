/* global Given, When, Then */

Given('I send the updated {string} message to the service bus topic {string}', (message, topicName) => {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${message}.json`;

  cy.readFile(inputFilePath).then((updatedMessageBody) => {
    cy.sendMessage(updatedMessageBody, topicName);
  });
  cy.wait(5000);
});

Given('I start the messaging service for the service bus topic {string}', (topicName) => {
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

When('I create a message with the filename {string} and update the following keys:', (inputTopicName, dataTable) => {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;

  // Function to generate random values based on the key or existing value
  const generateRandomValue = (key, existingValue) => {
    // Generate an 8-digit random number as a string
    if (['agreementNumber', 'contractNumber'].includes(key)) {
      return Math.floor(10000000 + Math.random() * 90000000).toString();
    }
    // Generate a random invoice number prefixed with "SFI"
    if (['invoiceNumber', 'originalInvoiceNumber'].includes(key)) {
      return `SFI${Math.floor(1000000 + Math.random() * 9000000)}`;
    }
    // Generate a random negative value between 10,000 and 999,999
    if (key === 'value') {
      return `-${Math.floor(10000 + Math.random() * (999999 - 10000 + 1))}`;
    }
    // Generate a random reference number prefixed with "KJ"
    if (key === 'reference') {
      return `KJ${Math.floor(1000000 + Math.random() * 9000000)}`;
    }
    // Generate a 10-digit number starting with 1
    if (key === 'frn') {
      return '1' + Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
    }
    if (Array.isArray(existingValue)) {
      // Recursively update values in an array
      return existingValue.map(item => generateRandomValue(key, item));
    }
    if (typeof existingValue === 'object' && existingValue !== null) {
      // Recursively update values in a nested object
      return Object.fromEntries(
        Object.entries(existingValue).map(([nestedKey, value]) => [
          nestedKey,
          generateRandomValue(nestedKey, value),
        ])
      );
    }
    // Default case: return the existing value unchanged
    return existingValue;
  };

  // Function to recursively update keys in the object
  const updateKeys = (obj, updates, oldValues = {}, generatedValues = {}) => {
    Object.keys(obj).forEach(key => {
      if (updates.includes(key)) {
        if (!generatedValues[key]) {
          // Generate a new value only once per key and store it
          generatedValues[key] = generateRandomValue(key, obj[key]);
        }
        // Store the old value and update with the consistent new value
        oldValues[key] = obj[key];
        obj[key] = generatedValues[key];
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Recursively handle nested objects
        updateKeys(obj[key], updates, oldValues, generatedValues);
      }
    });
    return oldValues;
  };

  cy.readFile(inputFilePath).then(inputMessageBody => {
    if (!inputMessageBody || typeof inputMessageBody !== 'object') {
      throw new Error(`Invalid or missing input file: ${inputFilePath}`);
    }

    const updates = dataTable.rawTable.flat();

    const oldValues = {};

    updateKeys(inputMessageBody, updates, oldValues);

    cy.writeFile(inputFilePath, JSON.stringify(inputMessageBody, null, 2).replace(/: /g, ':'));
  });
});

Given('I synchronize keys in {string} with values from {string}', (file2, file1) => {
  const updateExistingKeys = (target, source, file2) => {
    const allowedKeys = file2 === 'ppa' ? ['agreementNumber', 'contractNumber', 'frn'] : null;

    for (const key of Object.keys(source)) {
      if (key === 'sourceSystem') {
        continue;
      }

      if (allowedKeys && !allowedKeys.includes(key)) {
        continue;
      }

      if (key in target) {
        if (
          typeof source[key] === 'object' &&
          source[key] !== null &&
          !Array.isArray(source[key]) &&
          typeof target[key] === 'object' &&
          target[key] !== null
        ) {
          updateExistingKeys(target[key], source[key], file2);
        } else if (!Array.isArray(source[key]) || Array.isArray(target[key])) {
          target[key] = source[key];
        }
      }
    }
  };

  cy.readFile(`cypress/fixtures/messageTemplates/outputMessage/${file1}.json`).then((data1) => {
    cy.readFile(`cypress/fixtures/messageTemplates/inputMessage/${file2}.json`).then((data2) => {
      updateExistingKeys(data2, data1, file2);

      cy.writeFile(`cypress/fixtures/messageTemplates/inputMessage/${file2}.json`, JSON.stringify(data2, null, 2).replace(/: /g, ':'));
    });
  });
});

Given('I regenerate the invoice number for {string} using the invoice number from {string}', (inputTopicName, reference) => {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;
  const referenceFilePath = `cypress/fixtures/messageTemplates/outputMessage/${reference}.json`;

  cy.readFile(referenceFilePath).then((referenceMessageBody) => {
    const { invoiceNumber, paymentRequestNumber, contractNumber } = referenceMessageBody;

    const numericPartOfInvoice = invoiceNumber.match(/\d+/)[0];
    const paddedPaymentRequest = paymentRequestNumber.toString().padStart(3, '0');

    const regeneratedInvoiceNumber = `S${numericPartOfInvoice}${contractNumber}V${paddedPaymentRequest}`;
    cy.log('Regenerated Invoice Number:', regeneratedInvoiceNumber);

    cy.readFile(inputFilePath).then((inputMessageBody) => {
      inputMessageBody.invoiceNumber = regeneratedInvoiceNumber;

      cy.writeFile(inputFilePath, JSON.stringify(inputMessageBody, null, 2).replace(/: /g, ':'));
    });
  });
});

Given('I increase the invoice number by "{int}" for {string} using the invoice number from {string}', (number, inputTopicName, reference) => {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;
  const referenceFilePath = `cypress/fixtures/messageTemplates/outputMessage/${reference}.json`;

  cy.readFile(referenceFilePath).then((referenceMessageBody) => {
    const { invoiceNumber } = referenceMessageBody;

    const currentPaddedPaymentRequest = invoiceNumber.match(/V(\d+)$/);

    const newPaddedPaymentRequest = (parseInt(currentPaddedPaymentRequest, 10) + number).toString().padStart(3, '0');

    const regeneratedInvoiceNumber = invoiceNumber.replace(/V\d+$/, `V${newPaddedPaymentRequest}`);
    cy.log('Regenerated Invoice Number:', regeneratedInvoiceNumber);

    cy.readFile(inputFilePath).then((inputMessageBody) => {
      inputMessageBody.invoiceNumber = regeneratedInvoiceNumber;

      cy.writeFile(inputFilePath, JSON.stringify(inputMessageBody, null, 2).replace(/: /g, ':'));
    });
  });
});