import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


const { getEnvironmentConfig } = require('../../support/configLoader');
import requestEditor from '../pages/requestEditorPage';

const envConfig = getEnvironmentConfig();
const env = envConfig.env;
console.log('Environment Config:', envConfig);


let nextFRN;
let nextContractNumber;
let nextAgreementNumber;
let nextSBI;
let nextVendor;
let nextTrader;
let nextInvoiceNumber;

Given('I send the updated {string} message to the service bus topic {string}', (message, topicName) => {

  Cypress.emit('log:step', 'I send the updated ' + message + ' message to the service bus topic ' + topicName);
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${message}.json`;

  cy.readFile(inputFilePath).then((messageBody) => {
    Cypress.env('updatedMessageBody', messageBody);
    cy.task('sendMessage', {messageBody, topicName });
  });
  //Wait for file to be processed
  cy.wait(40000);
});

Given('I start the messaging service for the service bus topic {string}', (topicName) => {

  Cypress.emit('log:step', 'I start the messaging service for the service bus topic ' + topicName);
  cy.task('startMessageReception', topicName);
});

Given('I stop the messaging service', () => {

  Cypress.emit('log:step', 'I stop the messaging service');
  cy.task('stopMessageReception');
});

Then('the {string} message should be received successfully for the service bus topic {string}', (message, topicName) => {

  Cypress.emit('log:step', 'the ' + message + ' message should be received successfully for the service bus topic ' + topicName);
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${message}.json`;
  const outputFilePath = `cypress/fixtures/messageTemplates/outputMessage/${topicName}.json`;

  const readFileWithRetry = (filePath, retries = 3) => {
    cy.log(`Attempting to read file: ${filePath} with up to ${retries} retries`);
    console.log(`Attempting to read file: ${filePath} with up to ${retries} retries`);
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
    cy.log(`Getting messages from topic: ${topicName}`);
    console.log(`Getting messages from topic: ${topicName}`);
    cy.task('fetchReceivedMessages', topicName).then((messages) => {
      cy.log(`Received ${messages.length} messages from topic: ${topicName}`);
      console.log(`Received ${messages.length} messages from topic: ${topicName}`);
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

  cy.task('stopMessageReception');
});

Then('I check service bus topic {string} for received messages', (topicName) => {

  Cypress.emit('log:step', 'I check service bus topic ' + topicName + ' for received messages');
  const updatedFRN = Cypress.env('updatedMessageBody').frn;

  cy.task('fetchReceivedMessages', topicName).then((messages) => {
    expect(messages.length).to.be.greaterThan(0);
    console.log(messages);

    const receivedMessage = messages.find(message => message.frn === updatedFRN);
    cy.log(receivedMessage);
  });

  cy.task('stopMessageReception', topicName);
});

When('I update the {string} in message {string} to {string}', (key, inputTopicName, value) => {

  Cypress.emit('log:step', 'I update the ' + key + ' in message ' + inputTopicName + ' to ' + value);

  //This function updates a specific key in the JSON message file with a new value
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;

  if (key === 'value') {
    value = parseInt(value, 10);
  }

  cy.readFile(inputFilePath).then(inputMessageBody => {
    if (!inputMessageBody || typeof inputMessageBody !== 'object') {
      throw new Error(`Invalid or missing input file: ${inputFilePath}`);
    }

    // Update the specified key with the provided value
    inputMessageBody[key] = value;

    cy.writeFile(inputFilePath, JSON.stringify(inputMessageBody, null, 2));
  });
});

When('I create a message with the filename {string} and update the following keys:', (inputTopicName, dataTable) => {

  Cypress.emit('log:step', 'I create a message with the filename ' + inputTopicName + ' and update the following keys: ' + JSON.stringify(dataTable.rawTable));
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

  Cypress.emit('log:step', 'I synchronize keys in ' + file2 + ' with values from ' + file1);
  const updateExistingKeys = (target, source, file2) => {
    const allowedKeys = file2 === 'ppa' ? ['agreementNumber', 'contractNumber', 'frn'] : null;

    for (const key of Object.keys(source)) {
      if (key === 'sourceSystem') {
        continue;
      }

      if (allowedKeys && !allowedKeys.includes(key)) {
        if (
          typeof source[key] === 'object' &&
          source[key] !== null &&
          typeof target[key] === 'object' &&
          target[key] !== null
        ) {
          updateExistingKeys(target[key], source[key], file2);
        }
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
        } else if (
          Array.isArray(source[key]) &&
          Array.isArray(target[key])
        ) {
          for (let i = 0; i < source[key].length; i++) {
            if (
              typeof source[key][i] === 'object' &&
              typeof target[key][i] === 'object'
            ) {
              updateExistingKeys(target[key][i], source[key][i], file2);
            }
          }
        } else {
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

  Cypress.emit('log:step', 'I regenerate the invoice number for ' + inputTopicName + ' using the invoice number from ' + reference);
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

  Cypress.emit('log:step', 'I increase the invoice number by ' + number + ' for ' + inputTopicName + ' using the invoice number from ' + reference);
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

Given('I update the value of {string} to "{int}"', (inputTopicName, number) => {

  Cypress.emit('log:step', 'I update the value of ' + inputTopicName + ' to ' + number);
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;

  cy.readFile(inputFilePath).then((inputMessage) => {
    if (Object.prototype.hasOwnProperty.call(inputMessage, 'value')) {
      inputMessage.value = number;
    }

    if (Array.isArray(inputMessage.invoiceLines)) {
      inputMessage.invoiceLines.forEach((line) => {
        if (Object.prototype.hasOwnProperty.call(line, 'value')) {
          line.value = number;
        }
      });
    }

    cy.writeFile(inputFilePath, inputMessage);
  });
});

Given('I update the {string} file with the newly generated FRN', (inputTopicName) => {

  Cypress.emit('log:step', 'I update the ' + inputTopicName + ' file with the newly generated FRN');
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${inputTopicName}.json`;

  cy.readFile(inputFilePath).then((inputMessage) => {
    cy.get('@randomFrn').then((randomFrn) => {
      if (Object.prototype.hasOwnProperty.call(inputMessage, 'frn')) {
        inputMessage.frn = randomFrn;
      }

      cy.writeFile(inputFilePath, inputMessage);
    });
  });
});

Given('I send email to Notify API', () => {

  Cypress.emit('log:step', 'I send email to Notify API');

  let jwtToken = '';


  cy.task('generateJWT').then((token) => {
    expect(token).to.be.a('string');
    jwtToken = token;
    cy.log('Generated JWT Token:', jwtToken);
    console.log('Generated JWT Token:', jwtToken);

    cy.request({
      method: 'POST',
      url: "https://api.notifications.service.gov.uk/v2/notifications/email",
      headers: {
        "Authorization": 'Bearer ' + jwtToken,
        "Content-Type": "application/json"
      },
      body: {
        "email_address": "fakeaccount@gmail.com",
        "template_id": "4c492baa-be4b-47ba-a102-04b93d92df00",
        personalisation: {
          "agreementNumber": "12345678",
          "filename": "TestFile.bat"
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      let jsonReportData = JSON.stringify(response.body, null, 2);
      console.log('Notify API response:', jsonReportData);

      cy.log('Notify API response:', jsonReportData);

      cy.writeFile('cypress/fixtures/apiUpload.json', jsonReportData);

    });
  });
});

When('I pull new email from Notify API', () => {

  Cypress.emit('log:step', 'I pull new email from Notify API');

  let jwtToken = '';

  cy.fixture('apiUpload.json').then((data) => {
    const id = data.id;

    cy.task('generateJWT').then((token) => {
      expect(token).to.be.a('string');
      jwtToken = token;
      cy.log('Generated JWT Token:', jwtToken);
      console.log('Generated JWT Token:', jwtToken);

      cy.request({

        method: 'GET',
        url: "https://api.notifications.service.gov.uk/v2/notifications/" + id,
        headers: {
          "Authorization": 'Bearer ' + jwtToken,
          "Content-Type": "application/json"
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        let jsonReportData = JSON.stringify(response.body, null, 2);
        console.log('Notify API response:', jsonReportData);

        cy.log('Notify API response:', jsonReportData);

        cy.writeFile('cypress/fixtures/apiResults.json', jsonReportData);
      });
    });
  });
});

Then('I confirm that received email contains expected values', () => {

  Cypress.emit('log:step', 'I confirm that received email contains expected values');

  cy.fixture('apiUpload.json').then((uploadData) => {
    cy.fixture('apiResults.json').then((resultData) => {
      expect(resultData.id).to.eq(uploadData.id);
      expect(resultData.template.id).to.eq(uploadData.template.id);
      expect(resultData.body).to.eq(uploadData.content.body);
      expect(resultData.email_address).to.eq('fakeaccount@gmail.com');
      expect(resultData.subject).to.eq('12345678 Payment Schedule');
      expect(resultData.type).to.eq('email');
    });
  });
});

When(/^I send 5000 payment messages using template "(.*)" to the service bus topic "(.*)"$/, (message, topicName) => {

  Cypress.emit('log:step', 'I send 5000 payment messages using template ' + message + ' to the service bus topic ' + topicName);
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${message}.json`;
  cy.readFile(inputFilePath).then((template) => {
    const startFrn = 10000; // adjust depending on which batch you're sending
    const startInvoice = 10000;
    const startAgreement = 10000;
    const startContract = 10000;
    const messages = Array.from({ length: 5000 }, (_, i) => ({
      body: {
        ...template,
        frn: '10000' + (startFrn + i),
        invoiceNumber: 'SFI22' + (startInvoice + i),
        agreementNumber: '100' + (startAgreement + i),
        contractNumber: '100' + (startContract + i) } }));
    cy.task('sendMessagesBatch', { messages, topicName }).then(() =>
      cy.log(`Finished sending ${messages.length} messages to topic: ${topicName}`));
  });
});

When('I send 5000 return messages using template {string} to the service bus topic {string}', (message, topicName) => {

  Cypress.emit('log:step', 'I send 5000 return messages using template ' + message + ' to the service bus topic ' + topicName);
  const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${message}.json`;

  cy.readFile(inputFilePath).then((template) => {
    const startFrn = 10000; // adjust depending on which batch you're sending
    const startInvoice = 10000;
    const messages = Array.from({ length: 5000 }, (_, i) => ({
      body: {
        ...template,
        frn: '10000' + (startFrn + i),
        invoiceNumber: 'S22' + (startInvoice + i) + '100' + (startInvoice + i) + 'V001'
      }
    }));
    cy.task('sendMessagesBatch', { messages, topicName }).then(() =>
      cy.log(`Finished sending ${messages.length} messages to topic: ${topicName}`));
  });
});

When (/^I send "(.*)" test data message to the service bus topic "(.*)"$/, function (messageType, topicName) {

  Cypress.emit('log:step', 'I send "' + messageType + '" test data message to the service bus topic "' + topicName + '"');

  //This step is specifically for dev

  let messageTemplate;
  let sqlStatement;
  let databaseName;


  switch (messageType) {
  case 'sfi23 payment':
    messageTemplate = 'sfi23-paymentFileMessage'; break;
  case 'sfi23 error':
    messageTemplate = 'sfi23Error-paymentFileMessage'; break;
  case 'sfi23 return':
    messageTemplate = 'sfi23-returnFileMessage'; break;
  case 'sfi23 ppa':
    messageTemplate = 'sfi23-ppaFileMessage'; break;
  case 'sfi22 payment':
    messageTemplate = 'sfi22-paymentFileMessage'; break;
  case 'sfi22 error':
    messageTemplate = 'sfi22Error-paymentFileMessage'; break;
  case 'sfi22 return':
    messageTemplate = 'sfi22-returnFileMessage'; break;
  case 'sfi22 ppa':
    messageTemplate = 'sfi22-ppaFileMessage'; break;
  case 'sfi pilot payment':
    messageTemplate = 'sfiPilot-paymentFileMessage'; break;
  case 'sfi pilot error':
    messageTemplate = 'sfiPilotError-paymentFileMessage'; break;
  case 'sfi pilot return':
    messageTemplate = 'sfiPilot-returnFileMessage'; break;
  case 'sfi pilot ppa':
    messageTemplate = 'sfiPilot-ppaFileMessage'; break;
  case 'sfi expanded payment':
    messageTemplate = 'sfiExpanded-paymentFileMessage'; break;
  case 'sfi expanded error':
    messageTemplate = 'sfiExpandedError-paymentFileMessage'; break;
  case 'sfi expanded return':
    messageTemplate = 'sfiExpanded-returnFileMessage'; break;
  case 'sfi expanded ppa':
    messageTemplate = 'sfiExpanded-ppaFileMessage'; break;
  case 'cs payment':
    messageTemplate = 'cs-paymentFileMessage'; break;
  case 'cs error':
    messageTemplate = 'csError-paymentFileMessage'; break;
  case 'cs return':
    messageTemplate = 'cs-returnFileMessage'; break;
  case 'cs ppa':
    messageTemplate = 'cs-ppaFileMessage'; break;
  case 'cshtc payment':
    messageTemplate = 'cohtc-paymentFileMessage'; break;
  case 'cshtc error':
    messageTemplate = 'cohtcError-paymentFileMessage'; break;
  case 'cshtc return':
    messageTemplate = 'cohtc-returnFileMessage'; break;
  case 'cshtc ppa':
    messageTemplate = 'cohtc-ppaFileMessage'; break;
  case 'cshtr payment':
    messageTemplate = 'cohtr-paymentFileMessage'; break;
  case 'cshtr error':
    messageTemplate = 'cohtrError-paymentFileMessage'; break;
  case 'cshtr return':
    messageTemplate = 'cohtr-returnFileMessage'; break;
  case 'cshtr ppa':
    messageTemplate = 'cohtr-ppaFileMessage'; break;
  case 'delinked payment':
    messageTemplate = 'delinked-paymentFileMessage'; break;
  case 'delinked error':
    messageTemplate = 'delinkedError-paymentFileMessage'; break;
  case 'delinked return':
    messageTemplate = 'delinked-returnFileMessage'; break;
  case 'delinked ppa':
    messageTemplate = 'delinked-ppaFileMessage'; break;
  case 'lump sums payment':
    messageTemplate = 'lumpSums-paymentFileMessage'; break;
  case 'lump sums error':
    messageTemplate = 'lumpSumsError-paymentFileMessage'; break;
  case 'lump sums return':
    messageTemplate = 'lumpSums-returnFileMessage'; break;
  case 'lump sums ppa':
    messageTemplate = 'lumpSums-ppaFileMessage'; break;
  case 'bps payment':
    messageTemplate = 'bps-paymentFileMessage'; break;
  case 'bps error':
    messageTemplate = 'bpsError-paymentFileMessage'; break;
  case 'bps return':
    messageTemplate = 'bps-returnFileMessage'; break;
  case 'bps ppa':
    messageTemplate = 'bps-ppaFileMessage'; break;
  case 'glos payment':
    messageTemplate = 'glos-paymentFileMessage'; break;
  case 'glos error':
    messageTemplate = 'glosError-paymentFileMessage'; break;
  case 'glos return':
    messageTemplate = 'glos-returnFileMessage'; break;
  case 'vet visits payment':
    messageTemplate = 'vetVisits-paymentFileMessage'; break;
  case 'vet visits error':
    messageTemplate = 'vetVisitsError-paymentFileMessage'; break;
  case 'vet visits return':
    messageTemplate = 'vetVisits-returnFileMessage'; break;
  case 'genesis payment':
    messageTemplate = 'genesis-paymentFileMessage'; break;
  case 'genesis error':
    messageTemplate = 'genesisError-paymentFileMessage'; break;
  case 'genesis return':
    messageTemplate = 'genesis-returnFileMessage'; break;
  case 'imps payment':
    messageTemplate = 'imps-paymentFileMessage'; break;
  case 'imps error':
    messageTemplate = 'impsError-paymentFileMessage'; break;
  case 'imps return':
    messageTemplate = 'imps-returnFileMessage'; break;
  case 'fptt payment':
    messageTemplate = 'fptt-paymentFileMessage'; break;
  case 'fptt error':
    messageTemplate = 'fpttError-paymentFileMessage'; break;
  case 'fptt return':
    messageTemplate = 'fptt-returnFileMessage'; break;
  case 'fptt ppa':
    messageTemplate = 'fptt-ppaFileMessage'; break;
  case 'd365 acknowledgement':
    messageTemplate = 'd365Rejection-acknowledgementMessage'; break;
  }

  ///////////////////////////////////GLOS SECTION///////////////////////////////////////////////////

  if (messageType.includes('glos')) {

    if (messageType.includes('payment') || messageType.includes('error')) {
      sqlStatement = `SELECT
  MAX(CASE WHEN "frn"::text ~ '^1[0-9]*' THEN "frn" END) AS max_frn,
  MAX(CASE WHEN "invoiceNumber"::text ~ '^[0-9]{5} 1$' THEN "invoiceNumber" END) AS max_invoice_number
FROM "paymentRequests";
`;
      databaseName = 'ffc-pay-processing';

      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {

          const row = result.rows?.[0];

          if (!row) {
            throw new Error('No rows returned from database query');
          }

          const {
            max_frn,
            max_invoice_number
          } = row;

          cy.log(max_frn, max_invoice_number);


          console.log("Max FRN:", max_frn);
          console.log("Max INVOICE_NUMBER:", max_invoice_number);

          nextFRN = parseInt(max_frn) + 1;

          //The following code separates the main body of the invoice number from the lone digit at the end
          // and iterates the main body by 1 before joining back together

          const baseInvoice = parseInt(max_invoice_number.substring(0, 5));
          const incremented = baseInvoice + 1;
          const padded = incremented.toString().padStart(5, "0");

          nextInvoiceNumber = `${padded} 1`;


          const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
          cy.readFile(inputFilePath).then((template) => {

            let messageBody =
          {
            ...template,
            frn: nextFRN.toString(),
            invoiceNumber: nextInvoiceNumber
          };

            cy.task('sendMessage', { messageBody, topicName }).then(() =>
              cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
            cy.wait(40000);
          });
        });

    } else if (messageType.includes('return')) {

      sqlStatement = 'SELECT "invoiceNumber" FROM "paymentRequests" WHERE "frn" = ' + nextFRN;

      cy.log("SQL statement = " + sqlStatement);
      databaseName = 'ffc-pay-processing';

      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {

          const currentInvoiceNumber = result.rows[0].invoiceNumber;
          cy.log(currentInvoiceNumber);


          const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
          cy.readFile(inputFilePath).then((template) => {

            const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      invoiceNumber: currentInvoiceNumber
    };

            cy.task('sendMessage', { messageBody, topicName }).then(() =>
              cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
            cy.wait(40000);

          });
        });
    }

    //////////////////////////////////VET VISITS SECTION///////////////////////////////////////////////////

  } else if (messageType.includes('vet visits')) {

    if (messageType.includes('payment') || messageType.includes('error')) {
      sqlStatement = `SELECT
  MAX(CASE WHEN "frn"::text ~ '^[0-9]' THEN "frn" END) AS max_frn,
  MAX(CASE WHEN "sbi"::text ~ '^[0-9]' THEN "sbi" END) AS max_sbi,
  MAX(CASE WHEN "agreementNumber"::text ~ '^[0-9]' THEN "agreementNumber" END) AS max_agreement_number
  FROM "paymentRequests"`;
      databaseName = 'ffc-pay-processing';

      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {

          const row = result.rows?.[0];

          if (!row) {
            throw new Error('No rows returned from database query');
          }

          const {
            max_frn,
            max_sbi,
            max_agreement_number
          } = row;

          cy.log(max_frn, max_sbi, max_agreement_number);


          console.log("Max FRN:", max_frn);
          console.log("Max SBI:", max_sbi);
          console.log("Max AGREEMENT_NUMBER:", max_agreement_number);

          const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
          cy.readFile(inputFilePath).then((template) => {
            nextFRN = parseInt(max_frn) + 1;
            nextSBI = parseInt(max_sbi) + 1;
            nextAgreementNumber = parseInt(max_agreement_number) + 1;

            const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      sbi: nextSBI.toString(),
      agreementNumber: nextAgreementNumber.toString()
    };

            cy.task('sendMessage', { messageBody, topicName }).then(() =>
              cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
            cy.wait(40000);
          });
        });

    } else if (messageType.includes('return')) {

      sqlStatement = 'SELECT "invoiceNumber" FROM "paymentRequests" WHERE "frn" = ' + nextFRN;

      cy.log("SQL statement = " + sqlStatement);
      databaseName = 'ffc-pay-processing';

      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {

          const currentInvoiceNumber = result.rows[0].invoiceNumber;
          cy.log(currentInvoiceNumber);

          const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
          cy.readFile(inputFilePath).then((template) => {

            const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      invoiceNumber: currentInvoiceNumber
    };

            cy.task('sendMessage', { messageBody, topicName }).then(() =>
              cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
            cy.wait(40000);

          });
        });
    }

    ///////////////////////////////////GENESIS SECTION////////////////////////////////////////////////////

  } else if (messageType.includes('genesis')) {

    if (messageType.includes('payment') || messageType.includes('error')) {
      sqlStatement = `SELECT
  MAX(CASE WHEN "frn"::text ~ '^[0-9]' THEN "frn" END) AS max_frn,
  MAX(CASE WHEN "vendor"::text ~ '^[0-9]' THEN "vendor" END) AS max_vendor,
  MAX(CASE WHEN "contractNumber"::text LIKE 'AG00%' THEN "contractNumber" END) AS max_contract_number
  FROM "paymentRequests"`;
      databaseName = 'ffc-pay-processing';

      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {

          const row = result.rows?.[0];

          if (!row) {
            throw new Error('No rows returned from database query');
          }

          const {
            max_frn,
            max_vendor,
            max_contract_number
          } = row;

          cy.log(max_frn, max_vendor, max_contract_number);


          console.log("Max FRN:", max_frn);
          console.log("Max VENDOR:", max_vendor);
          console.log("Max CONTRACT_NUMBER:", max_contract_number);

          const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
          cy.readFile(inputFilePath).then((template) => {
            nextFRN = parseInt(max_frn) + 1;
            nextVendor = parseInt(max_vendor) + 1;

            const contractPrefix = max_contract_number.substring(0,2);
            const contractSuffix = max_contract_number.substring(2, max_contract_number.length);

            nextContractNumber = contractPrefix + '00' + (parseInt(contractSuffix) + 1).toString();

            const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      vendor: nextVendor.toString(),
      contractNumber: nextContractNumber.toString()
    };

            cy.task('sendMessage', { messageBody, topicName }).then(() =>
              cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
            cy.wait(40000);
          });
        });

    } else if (messageType.includes('return')) {

      const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
      cy.readFile(inputFilePath).then((template) => {

        const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      transactionNumber: nextContractNumber
    };

        cy.task('sendMessage', { messageBody, topicName }).then(() =>
          cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
        cy.wait(40000);
      });
    }

    ////////////////////////////////////IMPS SECTION//////////////////////////////////////////////////////

  } else if (messageType.includes('imps')) {

    if (messageType.includes('payment') || messageType.includes('error')) {
      sqlStatement = `SELECT
  MAX(CASE WHEN "frn"::text ~ '^[0-9]' THEN "frn" END) AS max_frn,
  MAX(CASE WHEN trader LIKE 'J%' AND trader ~ 'J[0-9]+' THEN trader END) AS max_trader
  FROM "paymentRequests"`;
      databaseName = 'ffc-pay-processing';

      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {

          const row = result.rows?.[0];

          if (!row) {
            throw new Error('No rows returned from database query');
          }

          const {
            max_frn,
            max_trader
          } = row;

          cy.log(max_frn, max_trader);


          console.log("Max FRN:", max_frn);
          console.log("Max VENDOR:", max_trader);

          const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
          cy.readFile(inputFilePath).then((template) => {
            nextFRN = parseInt(max_frn) + 1;

            const traderPrefix = max_trader.substring(0,1);
            const traderSuffix = max_trader.substring(2, max_trader.length);

            nextTrader = traderPrefix + '0' + (parseInt(traderSuffix) + 1).toString();

            nextInvoiceNumber = 'FVR/' + nextTrader;

            const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      trader: nextTrader.toString(),
      invoiceNumber: nextInvoiceNumber.toString(),
      invoiceLines: template.invoiceLines.map(line => ({
        ...line,
        invoiceNumber: nextInvoiceNumber.toString()
      }))
    };

            cy.task('sendMessage', { messageBody, topicName }).then(() =>
              cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
            cy.wait(40000);
          });
        });

    } else if  (messageType.includes('return')) {

      const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
      cy.readFile(inputFilePath).then((template) => {

        const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      trader: nextTrader.toString(),
      transactionNumber: nextInvoiceNumber.toString()
    };

        cy.task('sendMessage', { messageBody, topicName }).then(() =>
          cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
        cy.wait(40000);

      });
    }

    ///////////////////////////////////FPTT SECTION//////////////////////////////////////////////////////

  } else if (messageType.includes('fptt')) {

    if (messageType.includes('payment') || messageType.includes('error')) {
      sqlStatement = `SELECT
  MAX(CASE WHEN "frn"::text ~ '^[0-9]' THEN "frn" END) AS max_frn,
  MAX(CASE WHEN "sbi"::text ~ '^[0-9]' THEN "sbi" END) AS max_sbi,
  MAX(CASE WHEN "contractNumber" LIKE 'R%' AND "contractNumber" ~ 'R[0-9]+' THEN "contractNumber" END) AS max_contract_number,
  MAX(CASE WHEN "agreementNumber"::text ~ '^[0-9]' THEN "agreementNumber" END) AS max_agreement_number
  FROM "paymentRequests"`;
      databaseName = 'ffc-pay-processing';

      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {

          const row = result.rows?.[0];

          if (!row) {
            throw new Error('No rows returned from database query');
          }

          const {
            max_frn,
            max_sbi,
            max_contract_number,
            max_agreement_number
          } = row;

          cy.log(max_frn, max_sbi, max_contract_number, max_agreement_number);


          console.log("Max FRN:", max_frn);
          console.log("Max SBI:", max_sbi);
          console.log("Max CONTRACT:", max_contract_number);
          console.log("Max AGREEMENT_NUMBER:", max_agreement_number);

          const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
          cy.readFile(inputFilePath).then((template) => {
            nextFRN = parseInt(max_frn) + 1;
            nextSBI = parseInt(max_sbi) + 1;

            const contractPrefix = max_contract_number.substring(0,1);
            const contractSuffix = max_contract_number.substring(1, max_contract_number.length);

            nextContractNumber = contractPrefix + (parseInt(contractSuffix) + 1).toString();
            nextAgreementNumber = parseInt(max_agreement_number) + 1;

            const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      sbi: nextSBI.toString(),
      contractNumber: nextContractNumber.toString(),
      agreementNumber: nextAgreementNumber.toString(),
      invoiceNumber: nextContractNumber.toString() + '-V001Q1',
      invoiceLines: template.invoiceLines.map(line => ({
        ...line,
        agreementNumber: nextAgreementNumber.toString()
      }))
    };

            cy.log('Message details = ' + messageBody);

            cy.task('sendMessage', { messageBody, topicName }).then(() =>
              cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
            cy.wait(40000);
          });
        });

    } else if (messageType.includes('return')) {

      sqlStatement = 'SELECT "invoiceNumber" FROM "paymentRequests" WHERE "frn" = ' + nextFRN;

      cy.log("SQL statement = " + sqlStatement);
      databaseName = 'ffc-pay-processing';

      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {

          const currentInvoiceNumber = result.rows[0].invoiceNumber;
          cy.log(currentInvoiceNumber);


          const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
          cy.readFile(inputFilePath).then((template) => {

            const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      invoiceNumber: currentInvoiceNumber
    };

            cy.task('sendMessage', { messageBody, topicName }).then(() =>
              cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
            cy.wait(40000);
          });
        });

    } else if (messageType.includes('ppa')) {

      const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
      cy.readFile(inputFilePath).then((template) => {

        const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      sbi: nextSBI.toString(),
      contractNumber: nextContractNumber.toString(),
      agreementNumber: nextAgreementNumber.toString(),
      invoiceNumber: nextContractNumber.toString() + '-V002Q1',
      invoiceLines: template.invoiceLines.map(line => ({
        ...line,
        agreementNumber: nextAgreementNumber.toString()
      }))
    };

        cy.task('sendMessage', { messageBody, topicName }).then(() =>
          cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
        cy.wait(40000);
      });
    }

    ////////////////////////////////////D365 ACKNOWLEDGEMENT//////////////////////////////////////////////

  } else if (messageType.includes('acknowledgement')) {

    sqlStatement = 'SELECT "invoiceNumber" FROM "paymentRequests" WHERE "frn" = ' + nextFRN;

    cy.log("SQL statement = " + sqlStatement);
    databaseName = 'ffc-pay-processing';

    cy.task('databaseQuery', { env, databaseName, sqlStatement })
      .then((result) => {

        const currentInvoiceNumber = result.rows[0].invoiceNumber;
        cy.log(currentInvoiceNumber);


        const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
        cy.readFile(inputFilePath).then((template) => {

          const messageBody =
    {
      ...template,
      frn: nextFRN,
      invoiceNumber: currentInvoiceNumber
    };

          cy.task('sendMessage', { messageBody, topicName }).then(() =>
            cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
          cy.wait(40000);
        });
      });

    ////////////////////////////////////ALL OTHER SCHEMES/////////////////////////////////////////////////


  } else {

    if (messageType.includes('payment') || messageType.includes('error')) {
      sqlStatement = `SELECT
  MAX(CASE WHEN "frn"::text ~ '^[0-9]' THEN "frn" END) AS max_frn,
  MAX(CASE WHEN "contractNumber"::text ~ '^[0-9]' THEN "contractNumber" END) AS max_contract,
  MAX(CASE WHEN "agreementNumber"::text ~ '^[0-9]' THEN "agreementNumber" END) AS max_agreement_number
  FROM "paymentRequests"`;
      databaseName = 'ffc-pay-processing';

      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {

          const row = result.rows?.[0];

          if (!row) {
            throw new Error('No rows returned from database query');
          }

          const {
            max_frn,
            max_contract,
            max_agreement_number
          } = row;

          cy.log(max_frn, max_contract, max_agreement_number);


          console.log("Max FRN:", max_frn);
          console.log("Max CONTRACT:", max_contract);
          console.log("Max AGREEMENT_NUMBER:", max_agreement_number);

          const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
          cy.readFile(inputFilePath).then((template) => {
            nextFRN = parseInt(max_frn) + 1;
            nextContractNumber = parseInt(max_contract) + 1;
            nextAgreementNumber = parseInt(max_agreement_number) + 1;

            Cypress.env('nextFRN', nextFRN);
            Cypress.env('nextContractNumber', nextContractNumber);
            Cypress.env('nextAgreementNumber', nextAgreementNumber);

            const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      contractNumber: nextContractNumber.toString(),
      agreementNumber: nextAgreementNumber.toString()
    };

            cy.task('sendMessage', { messageBody, topicName }).then(() =>
              cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
            cy.wait(40000);
          });
        });

    } else if (messageType.includes('return')) {

      sqlStatement = 'SELECT "invoiceNumber" FROM "paymentRequests" WHERE "frn" = ' + nextFRN;

      cy.log("SQL statement = " + sqlStatement);
      databaseName = 'ffc-pay-processing';

      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {

          const currentInvoiceNumber = result.rows[0].invoiceNumber;
          cy.log(currentInvoiceNumber);
          Cypress.env('currentInvoiceNumber', currentInvoiceNumber);


          const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
          cy.readFile(inputFilePath).then((template) => {

            const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      invoiceNumber: currentInvoiceNumber
    };

            cy.task('sendMessage', { messageBody, topicName }).then(() =>
              cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
            cy.wait(40000);

          });
        });
    } else if (messageType.includes('ppa')) {

      const inputFilePath = `cypress/fixtures/messageTemplates/inputMessage/${messageTemplate}.json`;
      cy.readFile(inputFilePath).then((template) => {

        const messageBody =
    {
      ...template,
      frn: nextFRN.toString(),
      contractNumber: nextContractNumber.toString(),
      agreementNumber: nextAgreementNumber.toString()
    };

        cy.task('sendMessage', { messageBody, topicName }).then(() =>
          cy.log(`Finished sending ${messageBody} to topic: ${topicName}`));
        cy.wait(40000);
      });
    }
  }

  console.log('Sent ' + messageType + ' message to service bus topic ' + topicName);
  cy.log('Sent ' + messageType + ' message to service bus topic ' + topicName);

});

Then(/^I confirm that payment test data in dev has been inserted into the (.*) database$/, (databaseName) => {

  Cypress.emit('log:step', 'I confirm that payment test data in dev has been inserted into the ' + databaseName + ' database');
  let sqlStatement = '';
  switch (databaseName) {
  case 'ffc-pay-injection':
    sqlStatement = 'SELECT * FROM "manualUploads" WHERE "uploadId" = 1';
    break;
  case 'ffc-pay-processing':
    sqlStatement = 'SELECT * FROM "paymentRequests" WHERE "frn" = ' + nextFRN;
    break;
  case 'ffc-pay-submission':
    sqlStatement = 'SELECT * FROM "paymentRequests" WHERE "frn" = ' + nextFRN;
    break;
  default:
    throw new Error(`Unknown database: ${databaseName}`);
  }

  cy.task('databaseQuery', { env, databaseName, sqlStatement })
    .then((results) => {
      const data = results.rows[0];
      console.log('Data retrieved:', data);
      if (results.rows.length > 0) {
        console.log('✅ Data exists in the database');
      } else {
        throw new Error('Data is not in database');
      }

      console.log(`✅ Test data has been inserted into the ${databaseName} database`);
      cy.log(`✅ Test data has been inserted into the ${databaseName} database`);
    });
});

Then('I confirm that {string} test data in dev has been inserted into ffc-pay-processing database', (fileType) => {

  Cypress.emit('log:step', 'I confirm that ' + fileType + ' test data in dev has been inserted into ffc-pay-processing database');
  let containerName;
  let sqlStatement;

  switch (fileType) {
  case 'return': sqlStatement = 'SELECT "settledValue" FROM "completedPaymentRequests" WHERE "frn" = ' + nextFRN; break;
  case 'ppa': sqlStatement = 'SELECT "invoiceNumber" FROM "paymentRequests" WHERE "frn" = ' + nextFRN; break;
  case 'd365 rejection': sqlStatement = 'SELECT "holdCategoryId" FROM "holds" WHERE "frn" = ' + nextFRN; break;
  case 'resubmission': sqlStatement = 'SELECT "paymentRequestId" FROM "completedPaymentRequests" WHERE "frn" = ' + nextFRN; break;
  default:
    throw new Error(`Unknown file type: ${fileType}`);
  }

  cy.log('Querying ffc-pay-processing with statement - ' + sqlStatement);

  const databaseName = 'ffc-pay-processing';
  containerName = 'ffc-pay-processing-ffc-pay-processing-1';
  cy.task('databaseQuery', { env, databaseName, sqlStatement })
    .then((results) => {

      cy.log('Results - ' + JSON.stringify(results));

      if (fileType === 'd365 rejection') {

        let holdCategoryId = results.rows[0].holdCategoryId;

        if (holdCategoryId === 1) {
          console.log('✅ Correct data has been added from ' + fileType + ' file');
        } else {
          throw new Error('Correct data has not been added from ' + fileType + ' file');
        }
      } else if (fileType === 'return') {

        let settledValue = results.rows[0].settledValue;

        if (settledValue != null) {
          cy.log('✅ Settled value is ' + settledValue);
          console.log('✅ Settled value is ' + settledValue);
        }

      } else if (fileType === 'ppa') {

        if (results.rowCount === 2) {
          console.log('✅ Correct data has been added from ' + fileType + ' file');
        } else {
          throw new Error('Correct data has not been added from ' + fileType + ' file');
        }

      } else {

        if (results.rowCount >= 1) {
          console.log('✅ Correct data has been added from ' + fileType + ' file');
        } else {
          throw new Error('Correct data has not been added from ' + fileType + ' file');
        }
      }
    });

  cy.task('getDockerLogs', containerName).then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
  console.log(`✅ Test data was updated in the ${containerName} database`);
  cy.log(`✅ Test data was updated in the ${containerName} database`);
});

Then(/^I confirm that payment test data in dev has not been inserted into the (.*) database$/, (databaseName) => {

  Cypress.emit('log:step', 'I confirm that payment test data in dev has not been inserted into the ' + databaseName + ' database');
  let sqlStatement = '';
  switch (databaseName) {
  case 'ffc-pay-injection':
    sqlStatement = 'SELECT * FROM "manualUploads" WHERE "uploadId" = 1';
    break;
  case 'ffc-pay-processing':
    sqlStatement = 'SELECT * FROM "paymentRequests" WHERE "frn" = ' + nextFRN;
    break;
  case 'ffc-pay-submission':
    sqlStatement = 'SELECT * FROM "paymentRequests" WHERE "frn" = ' + nextFRN;
    break;
  default:
    throw new Error(`Unknown database: ${databaseName}`);
  }

  cy.task('databaseQuery', { env, databaseName, sqlStatement })
    .then((results) => {
      const data = results.rows[0];
      console.log('Data retrieved:', data);
      if (results.rows.length > 0) {
        throw new Error('Data was found in database');
      } else {
        console.log('✅ Data does not exist in the database');
      }

      console.log(`✅ Test data has not been inserted into the ${databaseName} database`);
      cy.log(`✅ Test data has not been inserted into the ${databaseName} database`);
    });
});

When(/^I search for current FRN$/, () => {

  Cypress.emit('log:step', 'I search for current FRN');

  requestEditor.getFrnSearchField().type(nextFRN);
  requestEditor.getFrnSearchButton().click();
  console.log('Searched for current FRN - ' + nextFRN);
  cy.log('Searched for current FRN - ' + nextFRN);
});

Then('I confirm that payment for current FRN has scheme code of {string} in ffc-pay-processing database', (schemeCode) => {

  Cypress.emit('log:step', 'I confirm that payment for current FRN has scheme code of ' + schemeCode + ' in ffc-pay-processing database');
  const description = 'G00 - 2026-03-05: AHWR Poultry';

  const sqlStatement = `
  SELECT "schemeCode"
  FROM "invoiceLines"
  WHERE "description" = '${description}'
`;
  const databaseName = 'ffc-pay-processing';

  cy.task('databaseQuery', { env, databaseName, sqlStatement })
    .then((results) => {
      console.log('Expected scheme code: ' + schemeCode + ', Actual scheme code: ' + results.rows[0].schemeCode);
      cy.log('Expected scheme code: ' + schemeCode + ', Actual scheme code: ' + results.rows[0].schemeCode);
      if (results.rows[0].schemeCode === schemeCode) {
        console.log('✅ Correct scheme code found in the database');
      } else {
        throw new Error('Correct scheme code not found in the database');
      }
    });
});