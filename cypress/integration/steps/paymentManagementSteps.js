/* global When, Then */

import paymentManagementPage from '../pages/paymentManagementPage';
import constants from '../../support/constants.json';

When(/^I can see "(.*)" as the header$/, (text) => {
  paymentManagementPage.header().should('be.visible').and('have.text', text);
});

Then(/^I am on the "(.*)" subpage$/, (text) => {
  cy.url().should('include', text);

  paymentManagementPage
    .subHeader()
    .should('be.visible')
    .and('have.text', constants[text].pageSubHeader);
});

When(/^the CSV file is downloaded with "(.*)" as the title$/, (text) => {
  cy.readFile(`cypress/downloads/${text}.csv`, { timeout: 15000 }).should('exist');
});

Then('I should see the number of closures', () => {
  paymentManagementPage.noOfClosures().should('be.visible');
});

Then('I should see {string} number of closures', (count) => {
  paymentManagementPage
    .noOfClosures()
    .should('be.visible')
    .and('contain.text', count);
});