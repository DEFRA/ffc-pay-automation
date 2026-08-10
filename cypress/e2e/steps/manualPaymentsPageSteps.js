import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import manualPaymentsPage from '../pages/manualPaymentsPage'



When(/^on the Manual Payments page I enter "(.*)" as the file to upload$/, (fileName) => {

  Cypress.emit('log:step', 'on the Manual Payments page I enter ' + fileName + ' as the file to upload')

  if (fileName.includes('Duplicate')) {

    cy.get('#main-content > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)').invoke('text').then((text) => {
      const originalFileName = text
      const tempPath = `cypress/fixtures/${originalFileName}`

      // Write the CSV to the new temp file
      cy.writeFile(tempPath, 'Test data for duplicate file upload')
      manualPaymentsPage.chooseFileBtn().selectFile(tempPath)
    })

  } else if (fileName.includes('TEST') || fileName.includes('Invalid')) {

    const originalPath = 'cypress/fixtures/' + fileName
    manualPaymentsPage.chooseFileBtn().selectFile(originalPath)

  } else if (fileName.includes('Empty')) {

    // Build timestamp string yyyyMMddHHmm
    const now = new Date()
    const yyyy = now.getFullYear()
    const MM = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const HH = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')

    const timestamp = `${yyyy}${MM}${dd}${HH}${mm}`


    // Create new filename
    const tempFilename = `FFC_Manual_Batch_${timestamp}.csv`
    const tempPath = `cypress/fixtures/${tempFilename}`

    // Write the updated CSV to the new temp file
    cy.writeFile(tempPath, '')
    manualPaymentsPage.chooseFileBtn().selectFile(tempPath)

  } else {

    const originalPath = 'cypress/fixtures/' + fileName

    cy.readFile(originalPath, 'utf8').then((csvText) => {
      const lines = csvText.split('\n')

      const header = lines[0]
      const dataRows = lines.slice(1)

      // Helper: increment a Z + 7 digits value
      const incrementZValue = (value) => {
        const number = parseInt(value.substring(1), 10) + 1
        const padded = number.toString().padStart(7, '0')
        return `Z${padded}`
      }

      // Update all rows
      const updatedRows = dataRows.map((row) => {
        if (!row.trim()) {
          return row
        }
        const cols = row.split(','); [1, 3, 17].forEach(() => {
          cols[1] = parseInt(cols[1]) + 1
          cols[3] = incrementZValue(cols[3])
          cols[17] = parseInt(cols[17]) + 1
        })

        return cols.join(',')
      })

      const updatedCsv = [header, ...updatedRows].join('\n')

      // Overwrite original file
      cy.writeFile(originalPath, updatedCsv)

      // Build timestamp string yyyyMMddHHmm
      const now = new Date()
      const yyyy = now.getFullYear()
      const MM = String(now.getMonth() + 1).padStart(2, '0')
      const dd = String(now.getDate()).padStart(2, '0')
      const HH = String(now.getHours()).padStart(2, '0')
      const mm = String(now.getMinutes()).padStart(2, '0')

      const timestamp = `${yyyy}${MM}${dd}${HH}${mm}`

      let filePrefix

      if (fileName.includes('Text')) {
        filePrefix = 'txt'
      } else {
        filePrefix = 'csv'
      }

      // Create new filename
      const tempFilename = `FFC_Manual_Batch_${timestamp}.${filePrefix}`
      const tempPath = `cypress/fixtures/${tempFilename}`

      // Write the updated CSV to the new temp file
      cy.writeFile(tempPath, updatedCsv)
      manualPaymentsPage.chooseFileBtn().selectFile(tempPath)
    })

  }

  cy.log(`The file ${fileName} is attached successfully`)
  console.log(`The file ${fileName} is attached successfully`)
})

When(/^on the Manual Payments page I click the "(.*)"$/, (button) => {

  Cypress.emit('log:step', 'on the Manual Payments page I click the ' + button)
  switch (button) {
  case 'upload button': manualPaymentsPage.uploadBtn().click(); break
  case 'manual payments guidance link': manualPaymentsPage.manualPaymentsGuidanceLink().click(); break
  case 'return button': manualPaymentsPage.returnButton().click(); break
  }

  cy.log(`Clicked on the ${button} successfully`)
  console.log(`Clicked on the ${button} successfully`)
})

Then(/^on the Manual Payments page I confirm that "(.*)" is present$/, (element) => {

  Cypress.emit('log:step', 'on the Manual Payments page I confirm that ' + element + ' is present')
  switch (element) {
  case 'page title':
    manualPaymentsPage.pageTitle().should('be.visible').haveWithoutWhitespace('Manual payment upload'); break
  case 'page description':
    manualPaymentsPage.pageDescription().should('be.visible').containsWithoutWhitespace( 'This section allows teams to upload manual payment files into Payment Hub. Once uploaded, these files will automatically feed into the standard payment process'); break
  case 'choose file button':
    manualPaymentsPage.chooseFileBtn().should('be.visible').and('have.attr', 'type', 'file'); break
  case 'upload button':
    manualPaymentsPage.uploadBtn().should('be.visible').and('have.attr', 'type', 'submit'); break
  case 'manual payments guidance link':
    manualPaymentsPage.manualPaymentsGuidanceLink().should('be.visible').containsWithoutWhitespace( 'Manual Payments Guidance (PDF)'); break
  case 'file upload confirmation message':
    manualPaymentsPage.statusText().should('be.visible').containsWithoutWhitespace( 'Your manual payment file has been successfully processed. To make another upload, please click the link below to return to the manual payments page.'); break
  case 'duplicate file error message':
    manualPaymentsPage.errorText().should('be.visible').containsWithoutWhitespace( 'This file has already been uploaded. The file has not been re-processed. Please ensure you are uploading the correct and most recent file.'); break
  case 'invalid file type error message':
    manualPaymentsPage.typeErrorText().should('be.visible').containsWithoutWhitespace( 'Invalid file type - We were unable to upload your manual payment file as the uploaded file is not a .CSV file. Only .CSV files are permitted.'); break
  case 'invalid name error message':
    manualPaymentsPage.nameErrorText().should('be.visible').containsWithoutWhitespace( 'Invalid filename - We were unable to upload your manual payment file. Filenames must start with "FFC_Manual_Batch_". Optionally include a scheme (e.g. "SFI_" or "SFI23_"), then a timestamp in one of these formats: YYYYMMDDHHmm or YYYYMMDDHHmmss. The filename must end with ".csv". Examples: FFC_Manual_Batch_SFI23_202510231609.csv, FFC_Manual_Batch_202510231609.csv.'); break
  case 'invalid file size message':
    manualPaymentsPage.nameErrorText().should('be.visible').containsWithoutWhitespace( 'File too large - The uploaded file is too large. Please upload a file smaller than 1 MB.'); break
  case 'empty file message':
    manualPaymentsPage.nameErrorText().should('be.visible').containsWithoutWhitespace( 'We couldn’t process your upload because the file is empty. Please upload a file that contains data.'); break
  case 'return button':
    manualPaymentsPage.returnButton().should('be.visible').haveWithoutWhitespace('Return'); break
  case 'error return button':
    manualPaymentsPage.errorReturnButton().should('be.visible').haveWithoutWhitespace('Return'); break
  case 'upload history table':
    manualPaymentsPage.uploadHistoryTable().should('be.visible'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that ' + element + ' is present on the Manual Payments page')
  cy.log('Confirmed that ' + element + ' is present on the Manual Payments page')
})

Then(/^on the Manual Payments page I confirm that entry with filename "(.*)" has been added to Upload History$/, (filename) => {

  Cypress.emit('log:step', 'on the Manual Payments page I confirm that entry with filename ' + filename + ' has been added to Upload History')
  manualPaymentsPage.uploadHistoryFilename().should('be.visible').containsWithoutWhitespace( filename)

  console.log('Confirmed that entry with filename ' + filename + ' has been added to Upload History')
  cy.log('Confirmed that entry with filename ' + filename + ' has been added to Upload History')
})

Then(/^on the Manual Payments page I click the View payment status link and confirm that expected FRN values are present$/, () => {

  Cypress.emit('log:step', 'on the Manual Payments page I click the View payment status link and confirm that expected FRN values are present')
  cy.wait(240000) // Waiting for the all payments to be processed and displayed on the Payment Status page

  cy.get('a').contains('View payment status').scrollIntoView().click()

  cy.readFile('cypress/fixtures/FFC_Manual_Batch_Correct.csv').then((text) => {
    const rows = text.trim().split('\n')

    // Skip header row and extract index 1 from each row
    const values = rows.slice(1).map(row => row.split(',')[1])

    cy.log(JSON.stringify(values))
    values.forEach(frn => {
      cy.contains(frn)
    })
  })
  console.log('Confirmed that expected FRN values are present on the Payment Status page')
  cy.log('Confirmed that expected FRN values are present on the Payment Status page')
})

Then(/^on the Processed Payment Requests page I confirm that entry is present for "(.*)" scheme with "(.*)" payments and a value of "(.*)"$/, (scheme, payments, value) => {

  Cypress.emit('log:step', 'on the Processed Payment Requests page I confirm that entry is present for ' + scheme + ' scheme with ' + payments + ' payments and a value of ' + value)
  cy.wait(2000) // Waiting for data load
  cy.contains(scheme).should('be.visible')
  cy.contains(payments).should('be.visible')
  cy.contains(value).should('be.visible')
})