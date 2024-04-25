/* global When, Then */

import requestEditor from '../pages/requestEditorPage';
const dayjs = require('dayjs');

When('I create a new reporting dataset with the following values', (datatable) => {
  datatable.hashes().forEach((element) => {
    requestEditor.inputByValue(element.scheme).click();
    requestEditor.txtFrn().type(element.frn);
    requestEditor.txtApplicationIdentifier().type(element.agreementNumber);
    requestEditor.txtNetValue().type(element.netValue);
    requestEditor.inputByValue(element.typeOfDebt).click();

    if (element.dateDebtDiscovered === 'today') {
      const today = dayjs();
      const dayOfMonth = today.date();
      requestEditor.txtDay().type(dayOfMonth);

      const month = today.month();
      const monthNumber = month + 1;
      requestEditor.txtMonth().type(monthNumber);

      const year = today.year();
      requestEditor.txtYear().type(year);
    }
  });
});

Then('I make a note of the dataset count', () => {
  requestEditor
    .unattachedReportingDatasetsCount()
    .should('be.visible')
    .invoke('text').then(($datasetCount) => {
      cy.wrap(parseInt($datasetCount), { log: true }).as('initialDatasetCount');
    });
});

Then('the dataset count has increased by 1', () => {
  cy.get('@initialDatasetCount').then((initialCount) => {
    requestEditor
      .unattachedReportingDatasetsCount()
      .should('be.visible')
      .invoke('text').then(($datasetCount) => {
        const currentCount = parseInt($datasetCount);
        expect(currentCount).to.equal(initialCount + 1);
      });
  });
});

Then('I should see the following schemes:', (dataTable) => {
  dataTable.hashes().forEach(row => {
    requestEditor.getSchemeRadioButton(row['Scheme Name']).should('exist');
  });
});

Then('the extract is downloaded', () => {
  cy.readFile('cypress/downloads/ffc-pay-debts-report.csv');
});

When(/^I search for FRN "(.*)"$/, (text) => {
  requestEditor.getFrnSearchField().type(text);
});

Then('I click on the FRN search button', () => {
  requestEditor.getFrnSearchButton().click();
});

When(/^I can see FRN "(.*)" in the table$/, (text) => {
  requestEditor.firstFRN().should('have.text', text);
});

Then('the application identifier field header is visible with text {string}', (text) => {
  requestEditor.applicationIdentifierHeader().should('be.visible').invoke('text').then((textFromElement) => {
    expect(textFromElement.trim()).to.eq(text);
  });
});

Then('the application identifier hint is visible with text {string}', (text) => {
  requestEditor.applicationIdentifierHint().should('be.visible').invoke('text').then((textFromElement) => {
    expect(textFromElement.trim()).to.eq(text);
  });
});