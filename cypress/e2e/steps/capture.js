import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import capturePage from '../pages/capturePage';

When('I enter {string} in the FRN number search field', (frnNumber) => {

  Cypress.emit('log:step', 'I enter ' + frnNumber + ' in the FRN number search field');
  capturePage.captureTxtFrn().type(frnNumber);
});

When('I select {string} in the scheme dropdown', (scheme) => {

  Cypress.emit('log:step', 'I select ' + scheme + ' in the scheme dropdown');
  capturePage.sltScheme().select(scheme);
});

When('I click the FRN number search button', () => {

  Cypress.emit('log:step', 'I click the FRN number search button');
  capturePage.btnFrnSearch().click();
  cy.wait(10000);
});

When('I click the Scheme search button', () => {

  Cypress.emit('log:step', 'I click the Scheme search button');
  capturePage.btnSchemeSearch().click();
  cy.wait(10000);
});

Then('each record in the table has the FRN number {string}', (frnNumber) => {

  Cypress.emit('log:step', 'each record in the table has the FRN number ' + frnNumber);
  //Wait for page load
  cy.wait(10000);
  capturePage.tableRows().each(($row) => {
    cy.wrap($row).find('td').eq(1).should('have.text', frnNumber);
  });
});

Then('each record in the table has the Scheme {string}', (scheme) => {

  Cypress.emit('log:step', 'each record in the table has the Scheme ' + scheme);
  capturePage.tableRows().each(($row) => {
    cy.wrap($row).find('td').eq(0).should('have.text', scheme);
  });
});

Then('{string} are displayed', (txt) => {

  Cypress.emit('log:step', txt + ' are displayed');
  capturePage.errorMessage().should('be.visible').and('contain.text', 'No records could be found for that FRN/scheme combination.');
  capturePage.noDataSetsMessage().should('be.visible').and('contain.text', txt);
});