/* global Given, When, Then */

Given(/^I restart and clear the local doc environment$/, () => {
  cy.restartLocalDocEnv();
});

When(/^I insert test data into Statement Data service$/, () => {
  cy.insertStatementData();
  cy.wait(180000); // Wait for the data to be inserted and to be processed through all doc services
});

When(/^I insert incorrect test data into (.*) service$/, (databaseName) => {
  switch (databaseName) {
  case 'Statement Data':
    cy.insertIncorrectStatementData();
    cy.wait(10000);
    break;
  case 'Statement Constructor':
    cy.insertIncorrectStatementConstructor();
    cy.wait(10000);
    break;
  case 'Statement Generator':
    cy.insertIncorrectStatementGenerator();
    cy.wait(10000);
    break;
  case 'Statement Publisher':
    cy.insertIncorrectStatementPublisher();
    cy.wait(10000);
    break;
  }
});

Then(/^I pull file from Azure Blob Storage and confirm that correct values have been generated$/, () => {
  cy.task('fetchBlobById', {
    container: 'statements',
    dir: 'C:/ffc-automation/ffc-pay-automation/cypress/downloads'
  });

});

Then(/^I confirm that test data has not been inserted into the (.*) database$/, (databaseName) => {
  var containerName = '';
  switch (databaseName) {
  case 'ffc-doc-statement-data':
    containerName = 'ffc-doc-statement-data-ffc-doc-statement-data-postgres-1';
    cy.confirmStatementDataNotAdded();
    break;
  case 'ffc-doc-statement-constructor':
    containerName = 'ffc-doc-statement-constructor-ffc-doc-statement-constructor-postgres-1';
    cy.confirmStatementConstructorNotAdded();
    break;
  case 'ffc-doc-statement-generator':
    containerName = 'ffc-doc-statement-generator-ffc-doc-statement-generator-postgres-1';
    cy.confirmStatementGeneratorNotAdded();
    break;
  case 'ffc-doc-statement-publisher':
    containerName = 'ffc-doc-statement-publisher-ffc-doc-statement-publisher-postgres-1';
    cy.confirmStatementPublisherNotAdded();
    break;
  }

  cy.task('getDockerLogs', containerName).then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line);
        cy.log(line);
      }
    });
  });
  console.log(`✅ Test data was not inserted into the ${containerName} database`);
  cy.log(`✅ Test data was not inserted into the ${containerName} database`);
});

Then(/^I confirm that test data has been inserted into the (.*) database$/, (databaseName) => {
  var containerName = '';
  switch (databaseName) {
  case 'ffc-doc-statement-data':
    containerName = 'ffc-doc-statement-data-ffc-doc-statement-data-postgres-1';
    cy.getStatementData();
    break;
  case 'ffc-doc-statement-constructor':
    containerName = 'ffc-doc-statement-constructor-ffc-doc-statement-constructor-postgres-1';
    cy.getStatementConstructorData();
    break;
  case 'ffc-doc-statement-generator':
    containerName = 'ffc-doc-statement-generator-ffc-doc-statement-generator-postgres-1';
    cy.getStatementGeneratorData();
    break;
  case 'ffc-doc-statement-publisher':
    containerName = 'ffc-doc-statement-publisher-ffc-doc-statement-publisher-postgres-1';
    cy.getStatementPublisherData();
    break;
  }

  cy.task('getDockerLogs', containerName).then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line);
        cy.log(line);
      }
    });
  });
  console.log(`✅ Test data has been inserted into the ${containerName} database`);
  cy.log(`✅ Test data has been inserted into the ${containerName} database`);
});