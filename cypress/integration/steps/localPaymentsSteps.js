/* global Given, When, Then */

Given('I restart the local environment', () => {
  cy.restartLocalEnv();
});

Then(/^I confirm that payment test data has been inserted into the (.*) database$/, (databaseName) => {
  var containerName = '';
  switch (databaseName) {
  case 'ffc-pay-injection':
    containerName = 'ffc-pay-injection-ffc-pay-injection-postgres-1';
    cy.getPayInjectionData();
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