/* global Given, When, Then */

import paymentManagementPage from '../pages/paymentManagementPage';
const { getEnvironmentConfig } = require('../../support/configLoader');

const envConfig = getEnvironmentConfig();

Given(/^I visit the "(.*)" homepage$/, (text) => {
  var url;

  switch (text) {
  case 'Payment management':
    url = envConfig.paymentManagementUrl;
    break;
  case 'Request Editor':
    url = envConfig.requestEditorUrl;
    break;
  }

  cy.visit(url);
  paymentManagementPage.header().should('be.visible').and('have.text', text);
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
  cy.get('a').contains(text).scrollIntoView().click();
});

When(/^I click on the "(.*)" download link$/, (text) => {
  cy.get('a')
    .contains(text)
    .scrollIntoView()
    .then((el) => {
      el.attr('download', '');
    })
    .click();
});