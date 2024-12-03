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
    if (key === 'agreementNumber') {
      return Math.floor(10000000 + Math.random() * 90000000).toString();
    }
    if (key === 'invoiceNumber') {
      return `SFI${Math.floor(1000000 + Math.random() * 9000000)}`; // SFI0 followed by 7 digits
    }
    if (typeof existingValue === 'string') {
      return existingValue.replace(/\d/g, () => Math.floor(Math.random() * 10));
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
      if (key in obj) {
        obj[key] = newValues[key] || generateRandomValue(key, obj[key]);
        newValues[key] = obj[key];
      }
    });
  };

  const updateAgreementNumbers = (obj, oldAgreementNumber, newAgreementNumber) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'string' && value.includes(oldAgreementNumber)) {
        obj[key] = value.replaceAll(oldAgreementNumber, newAgreementNumber);
      } else if (typeof value === 'object' && value !== null) {
        updateAgreementNumbers(value, oldAgreementNumber, newAgreementNumber);
      }
    });
  };

  cy.readFile(inputFilePath).then(inputMessageBody => {
    const updates = dataTable.rawTable.flat();
    const oldAgreementNumber = inputMessageBody.agreementNumber;
    const newAgreementNumber = Math.floor(10000000 + Math.random() * 90000000).toString();

    inputMessageBody.agreementNumber = newAgreementNumber;
    updateAgreementNumbers(inputMessageBody, oldAgreementNumber, newAgreementNumber);
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
      return `KJ${Math.floor(1000000 + Math.random() * 9000000)}`; // KJ followed by 7 random digits
    }
    if (typeof existingValue === 'string') {
      return existingValue.replace(/\d/g, () => Math.floor(Math.random() * 10));
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

    // Update 'frn' and 'invoiceNumber' once
    inputMessageBody.frn = updatedFRN;
    inputMessageBody.invoiceNumber = regeneratedInvoiceNumber;

    // Perform updates for other keys
    updateKeys(inputMessageBody, updates);

    cy.wrap(inputMessageBody).as('updatedReturnFileBody');
  });
});