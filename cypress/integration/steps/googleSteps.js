/* global Given, When */

import googlePage from '../pages/googlePage';

Given(/^I visit the "(.*)" homepage$/, (text) => {

  var url;

  switch (text) {
  case 'Google':
    url = googlePage.googleURL;
    break;
  }

  cy.visit(url);
});

When(/^I search for "(.*)"$/, (text) => {
  cy.get(googlePage.searchBar).type(text+'{enter}');
});

When(/^I click on the "(.*)" button$/, (text) => {
  cy.get('button').contains(text).click();
});

When(/^I should see "(.*)"$/, (text) => {
  cy.contains(text);
});