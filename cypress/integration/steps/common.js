/* global Given, When, Then */

import paymentManagementPage from '../pages/paymentManagementPage';
const { getEnvironmentConfig } = require('../../support/configLoader');

const envConfig = getEnvironmentConfig();
const env = envConfig.env;
console.log('Environment Config:', envConfig);

Given(/^I visit the "(.*)" homepage$/, (text) => {
  var url;

  switch (text) {
  case 'Payment management':
    url = envConfig.paymentManagementUrl;
    break;
  case 'Request Editor':
    url = envConfig.requestEditorUrl;
    break;
  case 'Calculate your delinked payment ':
    url = envConfig.paymentCalculatorUrl;
    break;
  }
  cy.log("URL to open " + url);
  console.log("URL to open " + url);

  cy.visit(url);
  cy.wait(2000);
  cy.wrap(url).as('baseUrl');

  const envFilePath = 'cypress/fixtures/env.json';

  cy.task('readFileIfExists', envFilePath).then((existingData) => {
    let existingEnv = existingData ? existingData.env : null;

    if (existingEnv !== env) {
      cy.task('writeFile', { filePath: envFilePath, data: { env } })
        .then(() => cy.log(`🔄 Environment changed: Writing new env (${env}) to fixture file`));
    } else {
      cy.log(`✅ Environment unchanged (${env}). No file update needed.`);
    }
  });
});

Given(/^I am on the "(.*)" homepage$/, (text) => {
  var url;

  switch (text) {
  case 'Payment management':
    url = envConfig.paymentManagementUrl;
    break;
  case 'Request Editor':
    url = envConfig.requestEditorUrl;
    break;
  }

  cy.url().should('eq', url);
  paymentManagementPage.header().should('be.visible').and('have.text', text);
});

When(/^I click on the "(.*)" button$/, (text) => {
  cy.get('button').contains(text).first().scrollIntoView().click();
});

When(/^I click on "(.*)"$/, (text) => {
  cy.contains(text).scrollIntoView().click();
});

Then(/^I should see "(.*)"$/, (text) => {
  cy.contains(text);
});

When(/^I click on the "(.*)" link$/, (text) => {
  if (text === 'View awaiting ledger assignment') {
    cy.wait(30000);
    cy.log('Waiting for data to process');
    cy.reload();
    cy.wait(1000);
  }
  cy.get('a').contains(text).scrollIntoView().click();
  cy.wait(1000);
});

Then(/^I confirm there are no accessibility issues on the page$/, () => {
  cy.injectAxe();
  //If certain tests are to be excluded, they can be passed as the second argument to cy.checkA11y as rules array
  cy.checkA11y(null, {
    rules: {
      region: { enabled: false }
    }
  }, (violations) => {
    // Log each violation with its details
    violations.forEach(({ id, impact, description, help, helpUrl, nodes }) => {
      cy.log(`Violation ID: ${id}`);
      cy.log(`Impact: ${impact}`);
      cy.log(`Description: ${description}`);
      cy.log(`Help: ${help}`);
      cy.log(`More info: ${helpUrl}`);
      cy.log(`Affected nodes:`);

      nodes.forEach(({ html, target }) => {
        cy.log(`  - HTML: ${html}`);
        cy.log(`    Target: ${target.join(', ')}`);
      });
    });
  });
});

When(/^I verify status of external link - "(.*)"$/, (text) => {
  // Verify status of external link
  var pageUrl = '';
  switch (text) {
  case 'Rural Payments service.':
    pageUrl = 'https://www.ruralpayments.service.gov.uk/customer-account/login'; break;
  }
  console.log('Verifying status of external link:', pageUrl);
  cy.log('Verifying status of external link:', pageUrl);
  cy.request('https://external-site.com').then((response) => {
    expect(response.status).to.eq(200);
  });
});

When(/^I click on the "(.*)" download link$/, (text) => {
  if (text === 'Request Editor report') {
    cy.contains(text).click();
  } else {
    cy.get('a')
      .contains(text)
      .scrollIntoView()
      .then((el) => {
        el.attr('download', '');
      })
      .click();
  }
});

Then('I take a screenshot for Feature {int} and Scenario {int}', (featureNumber, scenarioNumber) => {
  var featureString = '';
  var scenarioString = '';

  switch (featureNumber) {
  case 1: featureString = '01_PaymentManagement.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 Verify <link> links work correctly'; break;
    }
    break;
  case 2: featureString = '02_RequestEditor.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 Validate Dataset Count Increment After Adding a New Reporting Dataset'; break;
    case 2: scenarioString = '02 Verify all schemes are displayed correctly'; break;
    case 3: scenarioString = '03 Download Extract'; break;
    case 4: scenarioString = '04 Verify "<link>"" links work correctly'; break;
    case 5: scenarioString = '05 FRN Search Function'; break;
    case 6: scenarioString = '06 Debt data reference is less than 5 characters'; break;
    case 7: scenarioString = '07 Debt data reference is not provided'; break;
    case 8: scenarioString = '08 Debt data reference is not alphanumeric'; break;
    case 9: scenarioString = '09 Unattached reporting datasets - Searching based on FRN number displays only records related to that FRN number'; break;
    case 10: scenarioString = '10 Unattached reporting datasets - Searching based on scheme displays only records related to that scheme'; break;
    case 11: scenarioString = '11 Unattached reporting datasets - Searching based on FRN number & scheme displays only records related to both that FRN number & scheme'; break;
    case 12: scenarioString = '12 Unattached reporting datasets - Searching based on FRN number that returns no datasets'; break;
    case 13: scenarioString = '13 Unattached reporting datasets - Searching based on scheme that returns no datasets'; break;
    }
    break;
  case 3: featureString = '03_AgreementClosures.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 View Agreement Closures'; break;
    case 2: scenarioString = '02 Access Agreement Closure Management'; break;
    case 3: scenarioString = '03 Access Add Agreement Closure'; break;
    case 4: scenarioString = '04 Access Bulk Agreement Closures'; break;
    case 5: scenarioString = '05 View Agreement Closures Page'; break;
    case 6: scenarioString = '06 Create New Closure'; break;
    case 7: scenarioString = '07 Create Bulk Closure'; break;
    case 8: scenarioString = '08 View Agreement Closure Page'; break;
    case 9: scenarioString = '09 View Bulk Agreement Closure Page From Single Closure Page'; break;
    case 10: scenarioString = '10 View Agreement Closure Page From Bulk Closure Page'; break;
    case 11: scenarioString = '11 Empty fields'; break;
    case 12: scenarioString = '12 Invalid FRN'; break;
    case 13: scenarioString = '13 Invalid Agreement number'; break;
    case 14: scenarioString = '14 Past Closure Date'; break;
    case 15: scenarioString = '15 Successful Adding & Removing a Submission'; break;
    case 16: scenarioString = '16 Empty File Upload'; break;
    case 17: scenarioString = '17 Unsupported File Type'; break;
    case 18: scenarioString = '18 Large File Upload'; break;
    case 19: scenarioString = '19 Successful File Upload'; break;
    case 20: scenarioString = '20 Upload File Format Validation'; break;
    }
    break;
  case 4: featureString = '04_UploadPaymentHolds.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 Successfully uploading a CSV file applying holds & uploading a CSV file removing holds'; break;
    case 2: scenarioString = '02 Uploading a CSV file with no selected hold reason'; break;
    case 3: scenarioString = '03 Uploading a file that is not a CSV'; break;
    case 4: scenarioString = '04 Uploading a CSV file with incorrect FRN format'; break;
    case 5: scenarioString = '05 Uploading a CSV file which is too large'; break;
    }
    break;
  case 5: featureString = '05_RemovePaymentHolds.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 Uploading a CSV file with incorrect FRN format'; break;
    case 2: scenarioString = '02 Uploading a file that is not a CSV'; break;
    case 3: scenarioString = '03 Removing holds selectively based on hold category'; break;
    case 4: scenarioString = '04 Attempting to remove holds without selecting a hold category'; break;
    }
    break;
  case 11: featureString = '11_PPAE2EJourneyCredit.feature -- ';
    switch (scenarioNumber) {
    case 3: scenarioString = '03 Send PPA message and verify queue increment (payment2)'; break;
    case 4: scenarioString = '04 Approve payment in ledger assignment queue'; break;
    case 5: scenarioString = '05 Approve payment in quality check queue'; break;
    }
    break;
  case 12: featureString = '12_PPAE2EJourneyDebit.feature -- ';
    switch (scenarioNumber) {
    case 3: scenarioString = '03 Send debit PPA message and verify queue increment (payment2)'; break;
    case 4: scenarioString = '04 Approve payment from reporting data queue'; break;
    case 5: scenarioString = '05 Approve payment from ledger assignment queue'; break;
    case 6: scenarioString = '06 Approve payment from quality check queue'; break;
    }
    break;
  case 13: featureString = '13_PaymentHolds.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 Send debit payment request message (payment1)'; break;
    case 2: scenarioString = '02 Confirm scheme filter functional'; break;
    }
    break;
  case 15: featureString = '15_ManualPayments.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 Confirm Manual Payments page elements are visible'; break;
    case 2: scenarioString = '02 Confirm that valid Manual Payments file can be processed successfully'; break;
    case 3: scenarioString = '03 Confirm that attempting to upload duplicate file produces appropriate error message'; break;
    case 4: scenarioString = '04 Confirm that invalid Manual Payments file type produces appropriate error message'; break;
    case 5: scenarioString = '05 Confirm that invalid Manual Payments filename produces appropriate error message'; break;
    case 6: scenarioString = '06 Confirm that invalid file size produces appropriate error message'; break;
    case 7: scenarioString =  '07 Confirm that empty file produces appropriate error message'; break;
    case 8: scenarioString = '08 Upload History table'; break;
    }
    break;
  case 17: featureString = '17_PaymentCalculator.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 Confirm elements on Calculate your delinked payment homepage'; break;
    case 2: scenarioString = '02 Confirm elements on Enter your delinked payment reference amount'; break;
    case 3: scenarioString = '03 Confirm elements on Delinked payment calculation page'; break;
    case 4: scenarioString = '04 Confirm amount format error message on Delinked payment reference amount page'; break;
    case 5: scenarioString = '05 Confirm that delinked payments guidance link functions correctly'; break;
    case 6: scenarioString = '06 Confirm that new schemes and grants link functions correctly'; break;
    case 7: scenarioString = '07 Confirm that replacing the Basic Payment Scheme link functions correctly'; break;
    case 8: scenarioString = '08 Confirm that Rural Payments service link functions correctly'; break;
    }
    break;
  case 22: featureString = '22_CSHigherTierRevenuePayments.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 insert incorrect COHTR test data via service bus message to ffc-pay-request'; break;
    case 5: scenarioString = '05 Approve payment from reporting data queue'; break;
    case 6: scenarioString = '06 Approve payment in ledger assignment queue'; break;
    case 7: scenarioString = '07 Approve payment from quality check queue'; break;
    case 8: scenarioString = '08 Confirm payment request processed in Payment Management'; break;
    }
    break;
  case 23: featureString = '23_CSHigherTierCapitalPayments.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 insert incorrect COHTC test data via service bus message to ffc-pay-request'; break;
    case 5: scenarioString = '05 Approve payment from reporting data queue'; break;
    case 6: scenarioString = '06 Approve payment in ledger assignment queue'; break;
    case 7: scenarioString = '07 Approve payment from quality check queue'; break;
    case 8: scenarioString = '08 Confirm payment request processed in Payment Management'; break;
    }
    break;
  case 32: featureString = '32_SFI23Payments.feature -- ';
    switch (scenarioNumber) {
    case 1: scenarioString = '01 insert incorrect SFI23 test data via service bus message to ffc-pay-request'; break;
    case 5: scenarioString = '05 Approve payment from reporting data queue'; break;
    case 6: scenarioString = '06 Approve payment in ledger assignment queue'; break;
    case 7: scenarioString = '07 Approve payment from quality check queue'; break;
    case 8: scenarioString = '08 Confirm payment request processed in Payment Management'; break;
    }
    break;
  }
  const screenshotName = featureString + scenarioString;
  console.log('Screenshot Name:', screenshotName);
  cy.screenshot(screenshotName);
});