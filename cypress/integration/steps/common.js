/* global Given, When, Then */

import paymentManagementPage from '../pages/paymentManagementPage';
const { getEnvironmentConfig } = require('../../support/configLoader');

const envConfig = getEnvironmentConfig();
const env = envConfig.env;

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
  cy.get('a').contains(text).scrollIntoView().click();
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