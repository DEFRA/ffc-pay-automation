import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import agreementClosuresPage from '../pages/agreementClosuresPage'
import {getFutureDateParts,getFormattedFutureDate,getDatePriorTo} from '../../utils/date'
import capturePage from '../pages/capturePage'
import gdsGenericPage from '../pages/gdsGenericPage'


When('I see the new submission in the table', () => {

  Cypress.emit('log:step', 'I see the new submission in the table')

  cy.get('@randomFrn').then((randomFrn) => {
    cy.contains(randomFrn).should('be.visible')
  })
})


When('I should not see the new submission in the table', () => {

  Cypress.emit('log:step', 'I should not see the new submission in the table')

  cy.get('@initialClosureCount').then((initialCount) => {
    if (initialCount === 0) {
      cy.contains('There are no agreement closures.').should('be.visible')
    } else {
      cy.get('@randomFrn').then((randomFrn) => {
        agreementClosuresPage.lastFRN().should('not.have.text', randomFrn)
      })
    }
  })
})

When('I see the new bulk upload submissions in the table', () => {
  Cypress.emit('log:step', 'I see the new bulk upload submissions in the table')

  cy.fixture('bulkClosureUploadValid.csv').then((csvData) => {
    const rows = csvData.trim().split(/\r?\n/)
    const data = rows.map((row) => row.split(',')).reverse()

    data.forEach((row) => {
      const [, frn] = row.map(cell => cell.trim())

      agreementClosuresPage
        .agreementClosureEnterFrnField()
        .clear()
        .type(frn)

      cy.contains('button', 'Filter').click()
      cy.wait(1000)
      cy.get('.govuk-table__body')
        .should('contain.text', frn)
    })
  })
})

When('I click on the Remove button next to the new submission', () => {

  Cypress.emit('log:step', 'I click on the Remove button next to the new submission')

  cy.get('@randomFrn').then((randomFrn) => {
    capturePage.tableRows().contains('td', randomFrn).parent().contains('Remove').click()
  })
})



When('I type a future date in the Closure date field', () => {
  Cypress.emit('log:step', 'I type a future date in the Closure date field')

  const { day, month, year } = getFutureDateParts()

  Cypress.env('futureDate', getFormattedFutureDate())

  gdsGenericPage.field('day').type(day)
  gdsGenericPage.field('month').type(month)
  gdsGenericPage.field('year').type(year)
})

When('I type a date prior to {string} in the Closure date field', (date) => {
  Cypress.emit('log:step', `I type a date prior to ${date} in the Closure date field`)

  const { day, month, year } = getDatePriorTo(date)

  gdsGenericPage.field('day').type(day)
  gdsGenericPage.field('month').type(month)
  gdsGenericPage.field('year').type(year)
})

When('I enter frn {int} on the search for agreement closure page', (frn) => {
  gdsGenericPage.field('agreement number').type(frn)
})

When(
  'I randomize the FRN and agreement number for {string}',
  (fileName) => {
    Cypress.emit(
      'log:step',
      `I randomize the FRN and agreement number for "${fileName}"`
    )

    cy.task('randomizeBulkClosureCsv', fileName)
  }
)