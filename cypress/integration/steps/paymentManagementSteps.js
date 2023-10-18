/* global When, Then */

import paymentManagementPage from '../pages/paymentManagementPage';
import constants from '../../support/constants.json';

When(/^I can see "(.*)" as the header$/, (text) => {
  paymentManagementPage.header().should('be.visible').and('have.text', text);
});

Then(/^I am on the "(.*)" subpage$/, (text) => {
  cy.url().should('include', text);

  if (text === 'view-processed-payment-requests') {
    paymentManagementPage
      .tableCaption()
      .should('be.visible')
      .and('have.text', constants[text].caption);
  } else {
    paymentManagementPage
      .subHeader()
      .should('be.visible')
      .and('have.text', constants[text].pageSubHeader);
  }
});

Then('the CSV file is downloaded', () => {
  cy.readFile('cypress/downloads/ffc-pay-mi-report-v2.csv');
});