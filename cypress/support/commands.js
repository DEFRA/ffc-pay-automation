import requestEditor from '../integration/pages/requestEditorPage';

Cypress.Commands.add('emptyFolder', (folderPath) => {
  cy.task('emptyFolder', folderPath).then((status) => {
    cy.log(status);
  });
});

Cypress.Commands.add('sendMessage', (messageBody, topicName) => {
  cy.task('sendMessage', { messageBody, topicName }).then((status) => {
    cy.log(status);
  });
});

Cypress.Commands.add('startMessageReception', (topicName) => {
  cy.task('startMessageReception', topicName);
});

Cypress.Commands.add('fetchReceivedMessages', (topicName) => {
  return cy.task('fetchReceivedMessages', topicName);
});

Cypress.Commands.add('stopMessageReception', () => {
  cy.task('stopMessageReception');
});

Cypress.Commands.add('clickNextButtonUntilOnLastPage', () => {
  cy.get('body').then((body) => {
    if (body.find('[rel="next"] > .govuk-pagination__link-title').length > 0) {
      requestEditor.btnNext().scrollIntoView().click({ force: true });
      cy.clickNextButtonUntilOnLastPage();
    }
  });
});

Cypress.Commands.add('syncFixtureKeys', (file1, file2) => {
  const updateExistingKeys = (target, source) => {
    for (const key of Object.keys(source)) {
      if (key === 'sourceSystem') {
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
          updateExistingKeys(target[key], source[key]);
        } else if (!Array.isArray(source[key]) || Array.isArray(target[key])) {
          target[key] = source[key];
        }
      }
    }
  };

  cy.readFile(`cypress/fixtures/messageTemplates/outputMessage/${file1}.json`).then((data1) => {
    cy.readFile(`cypress/fixtures/messageTemplates/inputMessage/${file2}.json`).then((data2) => {
      updateExistingKeys(data2, data1);

      cy.writeFile(`cypress/fixtures/messageTemplates/inputMessage/${file2}.json`, JSON.stringify(data2, null, 2).replace(/: /g, ':'));
    });
  });
});

Cypress.Commands.add('updatePaymentFile', (inputTopicName, dataTable) => {
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

  // Read the JSON file and process its content
  cy.readFile(inputFilePath).then(inputMessageBody => {
  // Validate that the file is loaded and is a valid object
    if (!inputMessageBody || typeof inputMessageBody !== 'object') {
      throw new Error(`Invalid or missing input file: ${inputFilePath}`);
    }

    // Convert the Gherkin data table to a flat array of updates
    const updates = dataTable.rawTable.flat();
    // const paymentRequest = inputMessageBody.paymentRequest;

    // Track old values for reference or assertions if needed
    const oldValues = {};

    // Update other specified keys based on the updates array
    updateKeys(inputMessageBody, updates, oldValues);

    // Write JSON with custom formatting to remove gaps around the `:`
    cy.writeFile(inputFilePath, JSON.stringify(inputMessageBody, null, 2).replace(/: /g, ':'));

    // Save the updated object to a Cypress alias for use in other steps
    // cy.wrap(inputMessageBody).as('updatedInputMessageBody');
  });
});

Cypress.Commands.add('regenerateInvoiceNumber', (inputTopicName) => {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;

  const regeneratedInvoiceNumber = Cypress.env('regeneratedInvoiceNumber');

  cy.readFile(inputFilePath).then((inputMessageBody) => {
    inputMessageBody.invoiceNumber = regeneratedInvoiceNumber;

    cy.writeFile(inputFilePath, JSON.stringify(inputMessageBody, null, 2).replace(/: /g, ':'));
  });
});

Cypress.Commands.add('updateReturnFile', (inputTopicName, dataTable) => {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;

  const generateRandomValue = (key, existingValue) => {
    if (key === 'schedule') {
      return ['Q1', 'Q2', 'Q3', 'Q4'].find(option => option !== existingValue);
    }
    if (key === 'reference') {
      return `KJ${Math.floor(1000000 + Math.random() * 9000000)}`;
    }
    if (typeof existingValue === 'string') {
      return existingValue
        .replace(/\d/g, (match, index) => {
          if (index === 0) {
            return '1';
          }
          return Math.floor(Math.random() * 10);
        })
        .padEnd(10, '0')
        .slice(0, 10);
    }
    if (Array.isArray(existingValue)) {
      return existingValue.map(item => generateRandomValue(key, item));
    }
    if (typeof existingValue === 'object' && existingValue !== null) {
      return Object.fromEntries(
        Object.entries(existingValue).map(([nestedKey, value]) => [
          nestedKey,
          generateRandomValue(nestedKey, value),
        ])
      );
    }
    return existingValue;
  };

  const updateKeys = (obj, updates, newValues = {}) => {
    updates.forEach(key => {
      if (key in obj && !['frn', 'invoiceNumber'].includes(key)) {
        obj[key] = newValues[key] || generateRandomValue(key, obj[key]);
        newValues[key] = obj[key];
      }
    });
  };

  const updatedFRN = Cypress.env('updatedMessageBody').frn;
  const regeneratedInvoiceNumber = Cypress.env('regeneratedInvoiceNumber');

  cy.log('frn is ' + updatedFRN);
  cy.log('regeneratedInvoiceNumber is ' + regeneratedInvoiceNumber);

  cy.readFile(inputFilePath).then(inputMessageBody => {
    const updates = dataTable.rawTable.flat();

    inputMessageBody.frn = updatedFRN;
    inputMessageBody.invoiceNumber = regeneratedInvoiceNumber;

    updateKeys(inputMessageBody, updates);

    cy.wrap(inputMessageBody).as('updatedReturnFileBody');
  });
});

Cypress.Commands.add('updateReturnFilePPA', (inputTopicName, dataTable) => {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;

  const generateRandomValue = (key, existingValue) => {
    if (key === 'schedule') {
      return ['Q1', 'Q2', 'Q3', 'Q4'].find(option => option !== existingValue);
    }
    if (key === 'reference') {
      return `KJ${Math.floor(1000000 + Math.random() * 9000000)}`;
    }
    if (typeof existingValue === 'string') {
      return existingValue
        .replace(/\d/g, (match, index) => {
          if (index === 0) {
            return '1';
          }
          return Math.floor(Math.random() * 10);
        })
        .padEnd(10, '0')
        .slice(0, 10);
    }
    if (Array.isArray(existingValue)) {
      return existingValue.map(item => generateRandomValue(key, item));
    }
    if (typeof existingValue === 'object' && existingValue !== null) {
      return Object.fromEntries(
        Object.entries(existingValue).map(([nestedKey, value]) => [
          nestedKey,
          generateRandomValue(nestedKey, value),
        ])
      );
    }
    return existingValue;
  };

  const updateKeys = (obj, updates, newValues = {}) => {
    updates.forEach(key => {
      if (key in obj && !['frn', 'invoiceNumber'].includes(key)) {
        obj[key] = newValues[key] || generateRandomValue(key, obj[key]);
        newValues[key] = obj[key];
      }
    });
  };

  const updatedFRN = Cypress.env('updatedMessageBody').frn;
  const regeneratedInvoiceNumber = Cypress.env('regeneratedInvoiceNumber');
  const updatedAgreementNumber = Cypress.env('updatedMessageBody').agreementNumber;
  const updatedContractNumber = Cypress.env('updatedMessageBody').contractNumber;
  const paddedPaymentRequest = Cypress.env('paddedPaymentRequest');

  const prefix = regeneratedInvoiceNumber.slice(0, -4);

  const incrementedValue = (parseInt(paddedPaymentRequest, 10) + 1).toString().padStart(3, '0');

  const regeneratedInvoiceNumberPlus1 = `${prefix}V${incrementedValue}`;

  cy.log('frn is ' + updatedFRN);
  cy.log('regeneratedInvoiceNumber is ' + regeneratedInvoiceNumber);
  cy.log('regeneratedInvoiceNumberPlus1 is ' + regeneratedInvoiceNumberPlus1);
  cy.log('updatedAgreementNumber is ' + updatedAgreementNumber);
  cy.log('updatedContractNumber is ' + updatedContractNumber);

  cy.readFile(inputFilePath).then(inputMessageBody => {
    const updates = dataTable.rawTable.flat();

    inputMessageBody.frn = updatedFRN;
    inputMessageBody.invoiceNumber = regeneratedInvoiceNumber;
    inputMessageBody.agreementNumber = updatedAgreementNumber;
    inputMessageBody.contractNumber = updatedContractNumber;

    updateKeys(inputMessageBody, updates);

    cy.wrap(inputMessageBody).as('updatedReturnFileBodyPPA');
  });
});