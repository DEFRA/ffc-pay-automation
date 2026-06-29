import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import requestEditor from '../pages/requestEditorPage'
import capturePage from '../pages/capturePage'
const dayjs = require('dayjs')






// needs cleaned up and formatted, lots of not outdated functionality specifically for dev/test scenarios
When('I create a new reporting dataset with the following values', (datatable) => {

  Cypress.emit('log:step', 'I create a new reporting dataset with the following values')
  datatable.hashes().forEach((element) => {
    cy.get('#scheme').select(element.scheme)
    requestEditor.txtFrn().type(element.frn)
    if (element.agreementNumber !== '') {
      requestEditor.txtApplicationIdentifier().type(element.agreementNumber)
    }
    requestEditor.txtNetValue().type(element.netValue)
    requestEditor.inputByValue(element.typeOfDebt).click()

    if (element.dateDebtDiscovered === 'today') {
      const today = dayjs()
      const dayOfMonth = today.date()
      requestEditor.txtDay().type(dayOfMonth)

      const month = today.month()
      const monthNumber = month + 1
      requestEditor.txtMonth().type(monthNumber)

      const year = today.year()
      requestEditor.txtYear().type(year)
    }
  })
})

When('I verify my new reporting dataset with the following values', (datatable) => {
  const data = datatable.hashes()[0]

  const resolveTodaysDate = (value) => {
    if (value === 'today') {
      return dayjs().format('DD/MM/YYYY')
    }
    return value
  }

  const assertSummaryRow = (label, expectedValue) => {
    cy.contains('.govuk-summary-list__row', label)
      .within(() => {
        cy.get('.govuk-summary-list__value')
          .should('be.visible')
          .and('contain.text', expectedValue)
      })
  }

  const assertConfirmDetails = (data) => {
    assertSummaryRow('Scheme', data.scheme)
    assertSummaryRow('FRN (Firm Reference Number)', data.frn)
    assertSummaryRow('Agreement / claim number', data.agreementNumber)
    assertSummaryRow('Net value', data.netValue)
    assertSummaryRow('Debt type', data.typeOfDebt)
    assertSummaryRow('Date debt discovered',resolveTodaysDate(data.dateDebtDiscovered)
    )
  }
  assertConfirmDetails(data)
}
)

Then('I see a success message for {string}', (successMessage) => {
  cy.url().should('include', 'debtAdded=true')


  cy.get('.govuk-notification-banner')
    .within(() => {
      cy.contains('Success')
      cy.contains(successMessage)
    })

})


Then('I note the number of datasets displayed', () => {
  cy.get('body').then(($body) => {

    if ($body.find('table tbody tr').length > 0) {
      const count = $body.find('table tbody tr').length
      cy.wrap(count).as('initialCount')
    } else {
      cy.wrap(0).as('initialCount')
    }

  })
})


Then('I should see one more dataset in the table', () => {
  cy.get('@initialCount').then(initialCount => {
    cy.get('table tbody tr')
      .should('have.length', initialCount + 1)
  })
})

Then('the dataset {string} should be present', (agreementNumber) => {
  cy.contains('tr', agreementNumber).should('exist')
})


Then('I make a note of the dataset count', () => {

  Cypress.emit('log:step', 'I make a note of the dataset count')
  requestEditor
    .unattachedReportingDatasetsCount()
    .should('be.visible')
    .invoke('text').then(($datasetCount) => {
      cy.wrap(parseInt($datasetCount), { log: true }).as('initialDatasetCount')
    })
})


//Checks for the schemes based on the input given in the actual feature file. Can't use the saved file in /common/paymentholds.data.js because they don't match, atleast for now
Then('I should see the following schemes:', (dataTable) => {

  Cypress.emit('log:step', 'I should see the following schemes:')

  dataTable.hashes().forEach(row => {
    cy.get('#scheme')
      .find('option')
      .should('contain.text', row['Scheme Name'])

  })
})

Then('the extract is downloaded', () => {

  Cypress.emit('log:step', 'the extract is downloaded')
  cy.readFile('cypress/downloads/ffc-pay-debts-report.csv', { timeout: 15000 })
})

When(/^I search for FRN "(.*)"$/, (text) => {

  Cypress.emit('log:step', 'I search for FRN ' + text)
  requestEditor.getFrnSearchField().type(text)
})

When('I search for the FRN', () => {

  Cypress.emit('log:step', 'I search for the FRN')
  cy.get('@lastFRN').then((lastFRN) => {
    capturePage.captureTxtFrn().scrollIntoView().type(lastFRN+'{enter}')
  })
})

When('I enter the random FRN in the search field', () => {

  Cypress.emit('log:step', 'I enter the random FRN in the search field')
  cy.get('@frn').then((frn) => {
    requestEditor.getFrnSearchField().type(frn)
  })
})

When('I enter the newly generated FRN in the search field', () => {

  Cypress.emit('log:step', 'I enter the newly generated FRN in the search field')
  const updatedFRN = Cypress.env('updatedMessageBody').frn
  requestEditor.getFrnSearchField().type(updatedFRN)
})

Then('I should see the first FRN in the results matches the random FRN', () => {

  Cypress.emit('log:step', 'I should see the first FRN in the results matches the random FRN')
  cy.get('@frn').then((frn) => {
    requestEditor.firstFRN().should('have.text', frn)
  })
})

Then('I should see the first FRN in the results matches the newly generated FRN', () => {

  Cypress.emit('log:step', 'I should see the first FRN in the results matches the newly generated FRN')
  const updatedFRN = Cypress.env('updatedMessageBody').frn
  requestEditor.firstFRN().should('have.text', updatedFRN)
})

Then('I click on the FRN search button', () => {

  Cypress.emit('log:step', 'I click on the FRN search button')
  requestEditor.getFrnSearchButton().click()
})

When(/^I can see FRN "(.*)" in the table$/, (text) => {

  Cypress.emit('log:step', 'I can see FRN ' + text + ' in the table')
  requestEditor.firstFRNManualLedger().should('contain.text', text)
})

When('I can see the FRN in the table', () => {

  Cypress.emit('log:step', 'I can see the FRN in the table')
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.firstFRN().should('have.text', lastFRN)
  })
})

When('I should see the first FRN in the results matches the last record FRN', () => {

  Cypress.emit('log:step', 'I should see the first FRN in the results matches the last record FRN')
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.firstFRN().should('have.text', lastFRN)
  })
})

When('I should see the first capture FRN in the results matches the last record FRN', () => {

  Cypress.emit('log:step', 'I should see the first capture FRN in the results matches the last record FRN')
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.firstCaptureFRN().should('have.text', lastFRN)
  })
})

Then('the application identifier field header is visible with text {string}', (text) => {

  Cypress.emit('log:step', 'the application identifier field header is visible with text ' + text)
  requestEditor.applicationIdentifierHeader().should('be.visible').invoke('text').then((textFromElement) => {
    expect(textFromElement.trim()).to.eq(text)
  })
})

Then('the application identifier hint is visible with text {string}', (text) => {

  Cypress.emit('log:step', 'the application identifier hint is visible with text ' + text)
  requestEditor.applicationIdentifierHint().should('be.visible').invoke('text').then((textFromElement) => {
    expect(textFromElement.trim()).to.eq(text)
  })
})

When('on the Payment Holds Page I select {string} from the number of records per page dropdown', (number) => {

  Cypress.emit('log:step', 'on the Payment Holds Page I select ' + number + ' from the number of records per page dropdown')
  requestEditor.paymentHoldsRecordsPerPageDropdown().scrollIntoView().select(number)
})

When('I select {string} from the number of records per page dropdown', (number) => {

  Cypress.emit('log:step', 'I select ' + number + ' from the number of records per page dropdown')
  requestEditor.recordsPerPageDropdown().scrollIntoView().select(number)
})


Then('I can see at most {int} records displayed in the table', (number) => {

  Cypress.emit('log:step', 'I can see at most ' + number + ' records displayed in the table')
  requestEditor.dataSetRecords().should('have.length.at.most', number)
})

Then('I can see {string} in the page box', number => {

  Cypress.emit('log:step', 'I can see ' + number + ' in the page box')
  requestEditor.pageNumber().scrollIntoView().should('contain.text', number)
})

When('I click on the {string} page button', txt => {

  Cypress.emit('log:step', 'I click on the ' + txt + ' page button')
  if (txt === 'Next') {
    requestEditor.btnNext().click({ force: true })
  } else {
    throw new Error('Button not found')
  }
})

Then('I can see the {string} button', btnText => {

  Cypress.emit('log:step', 'I can see the ' + btnText + ' button')
  if (btnText === 'Next') {
    requestEditor.btnNext().scrollIntoView().should('be.visible').and('contain.text', btnText)
  } else if (btnText === 'Previous') {
    requestEditor.btnPrevious().scrollIntoView().should('be.visible').and('contain.text', btnText)
  } else {
    throw new Error('Button not found')
  }
})

Then('I cannot see the {string} button', btnText => {

  Cypress.emit('log:step', 'I cannot see the ' + btnText + ' button')
  if (btnText === 'Next') {
    requestEditor.btnNext().should('not.exist')
  } else if (btnText === 'Previous') {
    requestEditor.btnPrevious().should('not.exist')
  } else {
    throw new Error('Button not found')
  }
})

When('I visit the last page', () => {

  Cypress.emit('log:step', 'I visit the last page')
  cy.task('clickNextButtonUntilOnLastPage')
})

When('I get the FRN of the last record', () => {

  Cypress.emit('log:step', 'I get the FRN of the last record')
  requestEditor.lastFRN().invoke('text').then((text) => {
    cy.wrap(text.trim()).as('lastFRN')
  })
})

When('I enter the last record FRN in the search field', () => {

  Cypress.emit('log:step', 'I enter the last record FRN in the search field')
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.getFrnSearchField().type(lastFRN)
  })
})

When('I get the FRN of the last capture record', () => {

  Cypress.emit('log:step', 'I get the FRN of the last capture record')
  capturePage.lastCaptureFRN().invoke('text').then((text) => {
    cy.wrap(text.trim()).as('lastFRN')
  })
})

Then('I see the {string} application identifier error message', error => {

  Cypress.emit('log:step', 'I see the ' + error + ' application identifier error message')
  requestEditor.applicationIdentifierError().scrollIntoView().should('be.visible').and('contain.text', error)
})

Then('I see the {string} error summary title', (errorTitle) => {

  Cypress.emit('log:step', 'I see the ' + errorTitle + ' error summary title')
  requestEditor.errorSummaryTitle().scrollIntoView().should('be.visible').and('contain.text', errorTitle)
})

Then('I see the {string} error summary item', (errorItem) => {

  Cypress.emit('log:step', 'I see the ' + errorItem + ' error summary item')
  requestEditor.errorSummaryItem().scrollIntoView().should('be.visible').and('contain.text', errorItem)
})

Then('I make a note of the {string} count', (text) => {

  Cypress.emit('log:step', 'I make a note of the ' + text + ' count')
  cy.contains('.govuk-heading-m', text)
    .parent()
    .find('.govuk-heading-xl')
    .invoke('text')
    .then((count) => {
      cy.wrap(count.trim()).as(`${text}Count`)
    })
})

Then('the {string} count has increased by 1', (text) => {

  Cypress.emit('log:step', 'the ' + text + ' count has increased by 1')
  cy.wait(30000)
  cy.reload()
  cy.get(`@${text}Count`).then((oldCount) => {
    const previous = parseInt(oldCount, 10)

    cy.contains('.govuk-heading-m', text)
      .parent()
      .find('.govuk-heading-xl')
      .invoke('text')
      .then((newCountText) => {
        const current = parseInt(newCountText.trim(), 10)
        expect(current).to.eq(previous + 1)
      })
  })
})

Then('the {string} count has decreased by 1', (text) => {

  Cypress.emit('log:step', 'the ' + text + ' count has decreased by 1')
  cy.wait(20000)
  cy.reload()
  cy.get(`@${text}Count`).then((oldCount) => {
    const previous = parseInt(oldCount, 10)

    cy.contains('.govuk-heading-m', text)
      .parent()
      .find('.govuk-heading-xl')
      .invoke('text')
      .then((newCountText) => {
        const current = parseInt(newCountText.trim(), 10)
        expect(current).to.eq(previous - 1)
      })
  })
})



Then('I enter a valid debt discovered date in the past', () => {

  Cypress.emit('log:step', 'I enter a valid debt discovered date in the past')
  requestEditor.dayInput().clear().type('15')
  requestEditor.monthInput().clear().type('06')
  requestEditor.yearInput().clear().type('2018')
})

When('on the Awaiting Reporting Data page I click the FRN number search button', () => {

  Cypress.emit('log:step', 'on the Awaiting Reporting Data page I click the FRN number search button')
  requestEditor.awaitingRepFRNSearchBtn().click()
})