/* global Given, When, Then */

Given(/^I restart and clear the local doc environment$/, () => {
  cy.restartLocalDocEnv();
});

When(/^I insert (.*) test data into Statement Data service$/, (year) => {
  cy.insertStatementData(year);
  cy.wait(180000); // Wait for the data to be inserted and to be processed through all doc services
});

When(/^I send bulk test data into Statement Data service$/, () => {
  cy.insertBulkStatementData('2024');
  cy.insertBulkStatementData('2025');
  cy.wait(180000); // Wait for the data to be inserted and to be processed through all doc services
});

When(/^I send incorrect test data into (.*) service$/, (databaseName) => {
  cy.insertIncorrectData(databaseName);
  cy.wait(10000);

});

Then(/^I pull (.*) file from Azure Blob Storage and confirm that correct values have been generated$/, (fileType) => {
  cy.wait(20000);
  switch (fileType) {
  case '2025 statements':
    cy.task('fetchStatementsBlobById', {
      container: 'statements',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      year: '2025'
    });
    break;
  case '2024 statements':
    cy.task('fetchStatementsBlobById', {
      container: 'statements',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      year: '2024'
    });
    break;
  case 'glos payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'glos'
    });
    break;
  case 'imps payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'imps'
    });
    break;
  case 'genesis payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'genesis'
    });
    break;
  case 'dps payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'dps'
    });
    break;
  case 'vet visits':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'vet visits'
    });
    break;
  case 'cohtr':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'cohtr'
    });
    break;
  case 'cohtc':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'cohtc'
    });
    break;
  case 'cs payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'cs'
    });
    break;
  case 'bps payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'bps'
    });
    break;
  case 'lump sums payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'lump sums'
    });
    break;
  case 'sfi expanded payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'sfi expanded'
    });
    break;
  case 'sfi pilot payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'sfi pilot'
    });
    break;
  case 'delinked payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'delinked'
    });
    break;
  case 'sfi23 payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'sfi23'
    });
    break;
  case 'sfi22 payments':
    cy.task('fetchPaymentsBlobById', {
      container: 'dax',
      dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads',
      scheme: 'sfi22'
    });
    break;
  default: throw new Error(`Unknown scheme: ${fileType}`);
  }

});

Then(/^I confirm that test data has not been inserted into the (.*) database$/, (databaseName) => {
  var containerName = '';
  switch (databaseName) {
  case 'ffc-doc-statement-data':
    containerName = 'ffc-doc-statement-data-development';
    break;
  case 'ffc-doc-statement-constructor':
    containerName = 'ffc-doc-statement-constructor-development';
    break;
  case 'ffc-doc-statement-generator':
    containerName = 'ffc-doc-statement-generator-development';
    break;
  case 'ffc-doc-statement-publisher':
    containerName = 'ffc-doc-statement-publisher-development';
    break;
  }

  cy.confirmInvalidDataNotAdded(databaseName);

  // cy.task('getDockerLogs', containerName).then((logs) => {
  //   logs.split('\n').forEach((line) => {
  //     if (line.trim()) {
  //       console.log(line);
  //       cy.log(line);
  //     }
  //   });
  // });
  console.log(`✅ Test data was not inserted into the ${containerName} database`);
  cy.log(`✅ Test data was not inserted into the ${containerName} database`);
});

Then(/^I confirm that test data has been inserted into the (.*) database$/, (databaseName) => {
  var containerName = '';
  switch (databaseName) {
  case 'ffc-doc-statement-data':
    containerName = 'ffc-doc-statement-data-development';
    break;
  case 'ffc-doc-statement-constructor':
    containerName = 'ffc-doc-statement-constructor-development';
    break;
  case 'ffc-doc-statement-generator':
    containerName = 'ffc-doc-statement-generator-development';
    break;
  case 'ffc-doc-statement-publisher':
    containerName = 'ffc-doc-statement-publisher-development';
    break;
  }

  cy.queryDatabase(databaseName);

  cy.task('getDockerLogs', containerName).then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
  console.log(`✅ Test data has been inserted into the ${containerName} database`);
  cy.log(`✅ Test data has been inserted into the ${containerName} database`);
});

Then(/^I confirm that bulk test data has been inserted into the (.*) database$/, (databaseName) => {
  var containerName = '';
  switch (databaseName) {
  case 'ffc-doc-statement-data':
    containerName = 'ffc-doc-statement-data-development';
    cy.queryBulkStatementData('2024');
    // cy.queryBulkStatementData('2025');
    break;
  case 'ffc-doc-statement-constructor':
    containerName = 'ffc-doc-statement-constructor-development';
    cy.queryBulkStatementConstructor();
    break;
  case 'ffc-doc-statement-generator':
    containerName = 'ffc-doc-statement-generator-development';
    cy.queryBulkStatementGenerator();
    break;
  }

  cy.task('getDockerLogs', containerName).then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
  console.log(`✅ Bulk Test data has been inserted into the ${containerName} database`);
  cy.log(`✅ Bulk Test data has been inserted into the ${containerName} database`);
});