/* global Given, When, Then */

import environments from '../../support/environments.json';

Given(/^I visit the "(.*)" homepage$/, (text) => {
  var url;

  switch (text) {
  case 'Payment management':
    url = environments.paymentManagement.devUrl;
    break;
  case 'Request Editor':
    url = environments.requestEditor.devUrl;
    break;
  }

  cy.visit(url);
});

When(/^I click on the "(.*)" button$/, (text) => {
  cy.get('button').contains(text).scrollIntoView().click();
});

When(/^I click on "(.*)"$/, (text) => {
  cy.contains(text).scrollIntoView().click();
});

Then(/^I should see "(.*)"$/, (text) => {
  cy.contains(text);
});