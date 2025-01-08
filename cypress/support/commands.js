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

Cypress.Commands.add('updatePaymentFile', (inputTopicName, dataTable) => {
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;

  const generateRandomValue = (key, existingValue) => {
    if (key === 'schedule') {
      return ['Q1', 'Q2', 'Q3', 'Q4'].find(option => option !== existingValue);
    }
    if (key === 'agreementNumber' || key === 'contractNumber') {
      return Math.floor(10000000 + Math.random() * 90000000).toString();
    }
    if (key === 'invoiceNumber' || key === 'originalInvoiceNumber') {
      return `SFI${Math.floor(1000000 + Math.random() * 9000000)}`;
    }
    if (key === 'value') {
      return `-${Math.floor(10000 + Math.random() * (999999 - 10000 + 1))}`;
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
    Object.keys(obj).forEach(key => {
      if (updates.includes(key)) {
        obj[key] = newValues[key] || generateRandomValue(key, obj[key]);
        newValues[key] = obj[key];
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        updateKeys(obj[key], updates, newValues);
      }
    });
  };

  const updateAgreementNumbers = (obj, oldAgreementNumber, newAgreementNumber) => {
    if (!oldAgreementNumber || !newAgreementNumber) {
      return;
    }
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'string' && value.includes(oldAgreementNumber)) {
        obj[key] = value.replaceAll(oldAgreementNumber, newAgreementNumber);
      } else if (typeof value === 'object' && value !== null) {
        updateAgreementNumbers(value, oldAgreementNumber, newAgreementNumber);
      }
    });
  };

  cy.readFile(inputFilePath).then(inputMessageBody => {
    if (!inputMessageBody) {
      throw new Error(`File not found or invalid structure: ${inputFilePath}`);
    }

    const updates = dataTable.rawTable.flat();

    const paymentRequest = inputMessageBody.paymentRequest;
    const oldAgreementNumber = paymentRequest && paymentRequest.agreementNumber;
    const newAgreementNumber = oldAgreementNumber
      ? Math.floor(10000000 + Math.random() * 90000000).toString()
      : undefined;

    if (paymentRequest && oldAgreementNumber && newAgreementNumber) {
      updateAgreementNumbers(inputMessageBody, oldAgreementNumber, newAgreementNumber);
    }

    updateKeys(inputMessageBody, updates);

    cy.wrap(inputMessageBody).as('updatedInputMessageBody');
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