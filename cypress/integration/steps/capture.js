import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import capturePage from '../pages/capturePage';

When('I enter {string} in the FRN number search field', (frnNumber) => {
  capturePage.captureTxtFrn().type(frnNumber);
});

When('I select {string} in the scheme dropdown', (scheme) => {
  capturePage.sltScheme().select(scheme);
});

When('I click the FRN number search button', () => {
  capturePage.btnFrnSearch().click();
});

When('I click the Scheme search button', () => {
  capturePage.btnSchemeSearch().click();
});

Then('each record in the table has the FRN number {string}', (frnNumber) => {
  capturePage.tableRows().each(($row) => {
    cy.wrap($row).find('td').eq(1).should('have.text', frnNumber);
  });
});

Then('each record in the table has the Scheme {string}', (scheme) => {
  capturePage.tableRows().each(($row) => {
    cy.wrap($row).find('td').eq(0).should('have.text', scheme);
  });
});

Then('{string} are displayed', (txt) => {
  capturePage.errorMessage().should('be.visible').and('contain.text', 'No records could be found for that FRN/scheme combination.');
  capturePage.noDataSetsMessage().should('be.visible').and('contain.text', txt);
});