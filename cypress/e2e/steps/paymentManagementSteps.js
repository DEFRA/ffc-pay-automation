import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import paymentManagementPage from '../pages/paymentManagementPage'
import reportsPage from '../pages/reportsPage'
import manualPaymentsPage from '../pages/manualPaymentsPage'
import metricsDashboardPage from '../pages/metricsDashboardPage'
import constants from '../../support/constants.json'
import downloadStatementsPage from '../pages/downloadStatementsPage'
import resetPaymentRequestPage from '../pages/resetPaymentRequestPage'
import paymentEventMonitoringPage from '../pages/paymentEventMonitoringPage'
import paymentAlertsPage from '../pages/paymentAlertsPage'
import cookiesPage from '../pages/cookiesPage'
import accessibilityStatementPage from '../pages/accessibilityStatementPage'
import privacyNoticePage from '../pages/privacyNoticePage'
import homePageCards from '../../support/data/homePageCards.json'
const { getEnvironmentConfig } = require('../../support/configLoader')

const envConfig = getEnvironmentConfig()
const env = envConfig.env


console.log('Environment Config:', envConfig)

When(/^I can see "(.*)" as the header$/, (text) => {
  paymentManagementPage.header().should('be.visible').haveWithoutWhitespace(text)
})

Then(/^I take a screenshot for "(.*)"$/, (text) => {
  Cypress.emit('log:step', 'I take a screenshot for ' + text)

  cy.screenshot(text).then(() => {
    const existing = Cypress.env('screenshotNames') || []
    Cypress.env('screenshotNames', [...existing, text])
  })
})

Then(/^I am on the "(.*)" subpage$/, (text) => {

  Cypress.emit('log:step', 'I am on the ' + text + ' subpage')

  cy.url().should('include', text)

  if (text === 'metrics') {

    //Slightly different element identifier for sub header on this page

    paymentManagementPage
      .mainHeader()
      .should('be.visible')
      .haveWithoutWhitespace(constants[text].pageSubHeader)

  } else {

    paymentManagementPage
    //grabs the first subheader avail, otherwise if there is multiple subheaders it grabs all of them
      .subHeader().first()
      .should('be.visible')
      .haveWithoutWhitespace(constants[text].pageSubHeader)
  }
})

When(/^on the Home Page I click the "(.*)" button$/, (button) => {

  Cypress.emit('log:step', 'on the Home Page I click the ' + button + ' button')

  let element

  switch (button) {
  case 'accept cookies':  element = paymentManagementPage.cookieBannerAcceptBtn(); break
  case 'reject cookies':  element = paymentManagementPage.cookieBannerRejectBtn(); break
  case 'hide message': element = paymentManagementPage.cookieBannerHideBtn(); break
  case 'cookies accepted hide button': element = paymentManagementPage.cookieBannerAcceptedHideBtn(); break
  case 'cookies rejected hide button': element = paymentManagementPage.cookieBannerRejectedHideBtn(); break
  }
  element.click()
  cy.log('Clicked the ' + button + ' button')
  console.log('Clicked the ' + button + ' button')
})

Then(/^on the Home Page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step', `on the Home Page I confirm that ${element} is displayed`)

  if (homePageCards[element]) {
    const card = homePageCards[element]

    paymentManagementPage
      .cardHeader(card.title)
      .should('be.visible')
      .containsWithoutWhitespace( card.title)

    paymentManagementPage
      .cardDescription(card.title)
      .should('be.visible')
      .containsWithoutWhitespace( card.description)

    card.links.forEach(link => {
      paymentManagementPage
        .cardLink(card.title, link)
        .should('be.visible')
        .containsWithoutWhitespace( link)
    })

    cy.log(`Confirmed that ${element} is displayed`)
    return
  }

  switch (element) {
  case 'application header':
    paymentManagementPage.applicationHeader()
      .should('be.visible')
      .containsWithoutWhitespace( 'Payment management')
    break

  case 'sign out link':
    paymentManagementPage.signOutLink()
      .should('be.visible')
      .containsWithoutWhitespace( 'Sign out')
    break

  case 'page header':
    paymentManagementPage.pageHeader()
      .should('be.visible')
      .containsWithoutWhitespace( 'Payments and Documents Services')
    break

  case 'cookie banner header':
    paymentManagementPage.cookieBannerHeader()
      .should('be.visible')
      .containsWithoutWhitespace( 'Cookies on Payment management')
    break

  case 'cookie banner content':
    paymentManagementPage.cookieBannerContentOne()
      .should('be.visible')
      .containsWithoutWhitespace( 'We use some essential cookies to make this service work.')

    paymentManagementPage.cookieBannerContentTwo()
      .should('be.visible')
      .containsWithoutWhitespace('We’d like to set additional cookies so we can remember your settings, understand how people use the service and make improvements.')
    break

  case 'cookie banner accept button':
    paymentManagementPage.cookieBannerAcceptBtn()
      .should('be.visible')
      .containsWithoutWhitespace( 'Accept analytics cookies')
    break

  case 'cookie banner reject button':
    paymentManagementPage.cookieBannerRejectBtn()
      .should('be.visible')
      .containsWithoutWhitespace( 'Reject analytics cookies')
    break

  case 'cookie banner view link':
    paymentManagementPage.cookieBannerViewLink()
      .should('be.visible')
      .containsWithoutWhitespace( 'View cookies')
    break

  case 'cookie banner accepted message':
    paymentManagementPage.cookieBannerAcceptedMessage()
      .should('be.visible')
      .containsWithoutWhitespace('You’ve accepted analytics cookies. You can change your cookie settings at any time.')
    break

  case 'cookie banner accepted hide button':
    paymentManagementPage.cookieBannerAcceptedHideBtn()
      .should('be.visible')
      .containsWithoutWhitespace( 'Hide this message')
    break

  case 'cookie banner rejected message':
    paymentManagementPage.cookieBannerRejectedMessage()
      .should('be.visible')
      .containsWithoutWhitespace('You’ve rejected analytics cookies. You can change your cookie settings at any time.')
    break

  case 'cookie banner rejected hide button':
    paymentManagementPage.cookieBannerRejectedHideBtn()
      .should('be.visible')
      .containsWithoutWhitespace( 'Hide this message')
    break

  default:
    throw new Error(`Unknown home page element: ${element}`)
  }

  cy.log(`Confirmed that ${element} is displayed`)
})

Then(/^on the Home Page I confirm that "(.*)" is not displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Home Page I confirm that ' + element + ' is not displayed')

  let elementId

  switch (element) {
  case 'cookie banner header':
    elementId = paymentManagementPage.cookieBannerHeader(); break
  case 'cookie banner content':
    elementId = paymentManagementPage.cookieBannerContentOne(); break
  case 'cookie banner accept button':
    elementId = paymentManagementPage.cookieBannerAcceptBtn(); break
  case 'cookie banner reject button':
    elementId = paymentManagementPage.cookieBannerRejectBtn(); break
  case 'cookie banner view link':
    elementId = paymentManagementPage.cookieBannerViewLink(); break
  case 'cookie banner accepted message':
    elementId = paymentManagementPage.cookieBannerAcceptedMessage(); break
  case 'cookie banner accepted hide button':
    elementId = paymentManagementPage.cookieBannerAcceptedHideBtn(); break
  case 'cookie banner rejected message':
    elementId = paymentManagementPage.cookieBannerRejectedMessage(); break
  case 'cookie banner rejected hide button':
    elementId = paymentManagementPage.cookieBannerRejectedHideBtn(); break
  }

  elementId.should('not.be.visible')

  cy.log('Confirmed that ' + element + ' is not displayed')
  console.log('Confirmed that ' + element + ' is not displayed')
})


Then(/^on the Cookies Page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step', `on the Cookies Page I confirm that ${element} is displayed`)

  const verify = (method, texts) => {
    texts.forEach(text => {
      cookiesPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'page header':
    verify('heading', ['Cookies'])
    break

  case 'description':
    verify('paragraph', ['Cookies are small files saved on your phone, tablet or computer when you visit a website.', 'We use cookies to make the Defra Payment management site work and to collect information about how you use our service.'])
    break

  case 'essential cookies subheader':
    verify('heading', ['Essential cookies'])
    break

  case 'essential cookies description':
    verify('paragraph', ['Essential cookies keep your information secure while you use this service. We do not need to ask permission to use them.'])
    break

  case 'essential cookies name':
    cookiesPage.tableCell('cookies_policy')
      .should('be.visible')
    break

  case 'essential cookies purpose':
    cookiesPage.tableCell(
      'cookies_policy',
      'Saves your cookie consent settings'
    ).should('be.visible')
    break

  case 'essential cookies expires':
    cookiesPage.tableCell(
      'cookies_policy',
      '1 year'
    ).should('be.visible')
    break

  case 'analytics cookies subheader':
    verify('heading', ['Analytics cookies (optional)'])
    break

  case 'analytics cookies description':
    verify('paragraph', ['With your permission, we use Google Analytics to collect data about how you use this service. This information helps us to improve our service.', 'Google is not allowed to use or share our analytics data with anyone.', 'Google Analytics stores anonymised information about:'])
    break

  case 'analytics cookies bullet points':
    verify('listItem', ['how you got to this service', 'the pages you visit on this service and how long you spend on them', 'any errors you see while using this service'])
    break

  case 'analytics cookies names':
    cookiesPage.tableCell('_ga')
      .should('be.visible')

    cookiesPage.tableCell('_gid')
      .should('be.visible')
    break

  case 'analytics cookies purposes':
    cookiesPage.tableCell(
      '_ga',
      'Helps us count how many people visit this service by tracking if you have visited before'
    ).should('be.visible')

    cookiesPage.tableCell(
      '_gid',
      'Checks if you’ve visited this before. This helps us count how many people visit our site.'
    ).should('be.visible')
    break

  case 'analytics cookies expirations':
    cookiesPage.tableCell('_ga', '2 years')
      .should('be.visible')

    cookiesPage.tableCell('_gid', '24 hours')
      .should('be.visible')
    break

  case 'accept analytics cookies subheader':
    verify('heading', ['Do you want to accept analytics cookies?'])
    break

  case 'accept analytics cookies description':
    verify('legend', ['Do you want to accept cookies that measure website use?'])
    break

  case 'accept analytics cookies option buttons':
    verify('radioLabel', ['Yes', 'No'])
    break

  case 'save cookie settings button':
    verify('button', ['Save cookie settings'])
    break

  case 'cookie preference banner':
    verify('notificationBannerTitle', ['Success'])

    verify('notificationBannerHeading', ['You’ve set your cookie preferences'])

    verify('notificationBannerLink', ['Go back to the page you were looking at'])
    break
  }

  cy.log(`Confirmed that ${element} is displayed`)
  console.log(`Confirmed that ${element} is displayed`)
})

Then(/^on the Accessibility Statement Page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step', `on the Accessibility Statement Page I confirm that ${element} is displayed`)

  const verify = (method, texts) => {
    texts.forEach(text => {
      accessibilityStatementPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'page header':
    verify('heading', ['Accessibility statement'])
    break

  case 'description':
    verify('paragraph', ['This service is run by Defra. We want as many people as possible to be able to use this website.', 'For example, that means you should be able to:', 'We have also made the website text as simple as possible to understand.', 'AbilityNet has advice on making your device easier to use if you have a disability.'])

    verify('listItem', ['change colours, contrast levels and fonts', 'zoom in up to 200% without the text spilling off the screen', 'navigate most of the website using just a keyboard', 'navigate most of the website using speech recognition software', 'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)'])
    break

  case 'how accessible this website is':
    verify('heading', ['How accessible this website is'])

    verify('paragraph', ['We believe this website is fully accessible. If you find any accessibility issues, please contact us using the details below.'])
    break

  case 'feedback and contact info':
    verify('heading', ['Feedback and contact information'])

    verify('paragraph', ['If you find any problems not listed on this page or think we\'re not meeting accessibility requirements, contact us at: contentteam@defra.gov.uk.'])
    break

  case 'enforcement procedure':
    verify('heading', ['Enforcement procedure'])

    verify('paragraph', ['The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’).', 'If you\'re not happy with how we respond to your complaint, contact the Equality Advisory and Support Service (EASS).'])
    break

  case 'technical info':
    verify('heading', ['Technical information about this website’s accessibility'])

    verify('paragraph', ['Defra is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.'])
    break

  case 'compliance status':
    verify('heading', ['Compliance status'])

    verify('paragraph', ['This website is fully compliant with the Web Content Accessibility Guidelines version 2.2 AA standard.'])
    break

  case 'improving accessiblity':
    verify('heading', ['What we\'re doing to improve accessibility'])

    verify('paragraph', ['We are committed to maintaining accessibility standards. Our ongoing activities include:'])

    verify('listItem', ['conducting regular accessibility audits', 'training our team on accessibility best practices'])
    break

  case 'preparation of statement':
    verify('heading', ['Preparation of this accessibility statement'])

    verify('paragraph', ['This statement was prepared on', 'It was last reviewed on', 'This website was last tested on', 'The test was carried out using automated testing tools against WCAG 2.2 AA criteria.'])
    break
  }

  cy.log(`Confirmed that ${element} is displayed`)
  console.log(`Confirmed that ${element} is displayed`)
})


Then(/^on the Privacy Notice Page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step', `on the Privacy Notice Page I confirm that ${element} is displayed`)

  const verify = (method, texts) => {
    texts.forEach(text => {
      privacyNoticePage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'page header':
    verify('heading', ['Privacy notice'])
    break

  case 'description':
    verify('paragraph', ['Payment management is provided by Defra.', 'If you follow a link to a service provided by another government department, agency or local authority, that organisation will:'])

    verify('listItem', ['be the data controller', 'be responsible for processing any data you share with them', 'publish and manage their own privacy notice with details of how to contact them'])

    verify('verifyText', ['Defra is the data controller for pages starting with ffc-pay-web', 'A data controller determines how and why personal data is processed.', 'Data Protection Public Register'])
    break

  case 'what data we collect':
    verify('heading', ['What data we collect'])

    verify('paragraph', ['The personal data we collect from you includes:', 'Google Analytics processes information about:', 'We will not combine analytics information with other data sets in a way that would directly identify who you are.'])

    verify('listItem', ['your Internet Protocol (IP) address, and details of which version of web browser you used', 'information on how you use the site, using cookies and page tagging techniques', 'the pages you visit on GOV.UK', 'how long you spend on each GOV.UK page', 'how you got to the site', 'what you click on while you’re visiting the site'])

    verify('verifyText', ['Where you provide your consent, we use Google Analytics to collect information about how you use GOV.UK.', 'This includes IP addresses.'])

    verify('link', ['Find out more about how we use Google Analytics and other cookies on this service'])
    break

  case 'why we need your data':
    verify('heading', ['Why we need your data'])

    verify('paragraph', ['We collect your personal data in order to:', 'We use the information we collect through Google Analytics to see how you use the service and to see how well the site performs on your device.', 'We do this to help:'])

    verify('listItem', ['gather feedback to improve our services', 'monitor use of the site to identify security threats', 'monitor the performance of the site to identify inefficiencies and JavaScript errors', 'make sure the service is meeting the needs of its users', 'make improvements', 'make performance improvements, for example improving page load time and data usage'])
    break

  case 'what we do with your data':
    verify('heading', ['What we do with your data'])

    verify('paragraph', ['The data we collect with Google Analytics cookies is transferred and stored with Google where we analyse it with Google Analytics software (Universal Analytics). We do not allow Google to use or share this data for their own purposes.', 'We will not:'])

    verify('listItem', ['sell or rent your data to third parties', 'share your data with third parties for marketing purposes'])
    break

  case 'where your data is processed and stored':
    verify('heading', ['Where your data is processed and stored'])

    verify('paragraph', ['All personal data is stored in the European Economic Area (EEA). Data collected by Google Analytics may be transferred outside the EEA for processing.'])
    break

  case 'how we protect your data':
    verify('heading', ['How we protect your data and keep it secure'])

    verify('paragraph', ['We are committed to doing all that we can to keep your data secure. We have set up systems and processes to prevent unauthorised access or disclosure of your data - for example, we protect your data using varying levels of encryption.'])
    break

  case 'your rights':
    verify('heading', ['Your rights'])

    verify('paragraph', ['You have the right to request:', 'You can also:', 'If you have any of these requests, get in contact with our Privacy Team.'])

    verify('listItem', ['information about how your personal data is processed', 'a copy of that personal data', 'that anything inaccurate in your personal data is corrected immediately', 'raise an objection about how your personal data is processed', 'request that your personal data is erased if there is no longer a justification for it', 'ask that the processing of your personal data is restricted in certain circumstances'])
    break

  case 'links to other websites':
    verify('heading', ['Links to other websites', 'Following a link to another website'])

    verify('paragraph', ['This service contains links to other websites.', 'This privacy notice only applies to Calculate my progressive reductions, and does not cover other government services and transactions that we link to. These services, have their own terms and conditions and privacy policies.', 'If you go to another website from this one, read the privacy policy on that website to find out what it does with your information.'])
    break

  case 'contact us':
    verify('heading', ['Contact us or make a complaint'])

    verify('paragraph', ['You can contact our Data Protection Officer (DPO):'])

    verify('verifyText', ['DefraGroupDataProtectionOfficer@defra.gov.uk', 'Department for the Environment, Food and Rural Affairs', '2 Marsham Street', 'SW1P 4DF'])
    break

  case 'last updated notice':
    verify('insetText', ['This notice was last updated on'])
    break
  }

  cy.log(`Confirmed that ${element} is displayed`)
  console.log(`Confirmed that ${element} is displayed`)
})

When(/^the CSV file is downloaded with "(.*)" as the title$/, (text) => {

  Cypress.emit('log:step', 'the CSV file is downloaded with ' + text + ' as the title')

  if (text === 'ffc-pay-mi-report-v2' || text === 'ffc-pay-hold-report' || text === 'ffc-pay-suppressed-report') {
    const relativePath = `cypress/downloads/${text}.csv`

    const checkFileExists = (attempt = 0, maxAttempts = 10) => {
      return cy.task('fileExists', relativePath, {timeout: 3000}).then((exists) => {
        if (exists) {
          return true
        }
        if (attempt >= maxAttempts) {
          throw new Error(`File "${relativePath}" not found after ${maxAttempts} attempts.`)
        }
        return cy.wait(1000).then(() => checkFileExists(attempt + 1, maxAttempts))
      })
    }

    checkFileExists().should('eq', true)
  } else {
    cy.contains('Your report has been successfully downloaded. You may now close this window.', { timeout: 50000 }).should('be.visible')
  }
})

Then('I should see the number of closures', () => {

  Cypress.emit('log:step', 'I should see the number of closures')
  paymentManagementPage.noOfClosures().should('be.visible')
})

Then('I make a note of the closures count', () => {

  Cypress.emit('log:step', 'I make a note of the closures count')
  paymentManagementPage
    .noOfClosures()
    .should('be.visible')
    .invoke('text').then(($closureCount) => {
      cy.wrap(parseInt($closureCount), { log: true }).as('initialClosureCount')
    })
})

Then('the closure count has increased by {int}', (increment) => {

  Cypress.emit('log:step', 'the closure count has increased by ' + increment)
  cy.get('@initialClosureCount').then((initialCount) => {
    const expectedCount = Number(initialCount) + increment

    paymentManagementPage
      .noOfClosures()
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const currentCount = parseInt(text, 10)
        expect(currentCount).to.equal(expectedCount)
      })
  })
})

Then('I should see {string} number of closures', (count) => {

  Cypress.emit('log:step', 'I should see ' + count + ' number of closures')
  paymentManagementPage
    .noOfClosures()
    .should('be.visible')
    .containsWithoutWhitespace( count)
})
//this should probably be split into two generic helpers one for radio and one for dropdown (i think the only thing that still uses dropdown is scheme), this is not good quality code
When('I select {string} from the {string} dropdown or radio', (text, dropdown) => {

  Cypress.emit('log:step', 'I select ' + text + ' from the ' + dropdown + ' dropdown')
  if (['COHT Capital', 'COHT Revenue'].includes(text) ) {
    cy.wait(60000)
    cy.log('Wait for all payments to process')
  } else if (text === '') {
    return
  } else if (['revenueCapital', 'reportType', 'statusReportScheme'].includes(dropdown)) {
    cy.contains('label', text)
      .scrollIntoView()
      .click()
  }
  if (dropdown === 'scheme') {
    reportsPage.schemeDropdown().then($dropdown => {
      const options = $dropdown.find('option')

      const selectedOption = [...options].find(option => option.innerText.trim() === text)

      if (selectedOption) {
        reportsPage.schemeDropdown().scrollIntoView().select(text)

        const schemeId = selectedOption.value
        Cypress.env('formData', { ...Cypress.env('formData'), schemeId })
      } else {
        throw new Error(`Option "${text}" not found in the scheme dropdown.`)
      }
    })
  }
})

When(/^I select the first visible year for the "(.*)" scheme$/, (schemeKey) => {

  Cypress.emit('log:step', 'I select the first visible year for the ' + schemeKey + ' scheme')
  const schemeMap = {
    'delinked': 'delinked-payment-statement',
    'sfi-23': 'sustainable-farming-incentive'
  }

  const valueToSelect = schemeMap[schemeKey.toLowerCase()]
  if (!valueToSelect) {
    throw new Error(`No mapping found for scheme "${schemeKey}"`)
  }

  cy.log(`Selecting <option> with value: "${valueToSelect}"`)

  reportsPage.statusReportSchemeDropdown().then(($select) => {
    const selectEl = $select[0]
    const option = [...selectEl.options].find(opt => opt.value === valueToSelect && !opt.hidden)

    if (!option) {
      throw new Error(`No visible <option> with value "${valueToSelect}" found`)
    }

    selectEl.value = option.value
    selectEl.dispatchEvent(new Event('change', { bubbles: true }))

    cy.log(`Selected "${option.textContent.trim()}"`)
    expect(selectEl.value).to.eq(option.value)
  })
})

When('I type the {string} date as {string}', (dateType, date) => {

  Cypress.emit('log:step', 'I type the ' + dateType + ' date as ' + date)
  const [day, month, year] = date.split('-')

  if (dateType === 'start') {
    reportsPage.startDateDayField().type(day)
    reportsPage.startDateMonthField().type(month)
    reportsPage.startDateYearField().type(year)
    Cypress.env('formData', { ...Cypress.env('formData'), 'start-date-day': day })
    Cypress.env('formData', { ...Cypress.env('formData'), 'start-date-month': month })
    Cypress.env('formData', { ...Cypress.env('formData'), 'start-date-year': year })
  } else if (dateType === 'end') {
    reportsPage.endDateDayField().type(day)
    reportsPage.endDateMonthField().type(month)
    reportsPage.endDateYearField().type(year)
    Cypress.env('formData', { ...Cypress.env('formData'), 'end-date-day': day })
    Cypress.env('formData', { ...Cypress.env('formData'), 'end-date-month': month })
    Cypress.env('formData', { ...Cypress.env('formData'), 'end-date-year': year })
  } else {
    throw new Error(`Unknown date type: ${dateType}`)
  }
})

Given('the sample report data is loaded', () => {

  Cypress.emit('log:step', 'the sample report data is loaded')
  cy.task('loadReportData').then((result) => {
    expect(result.success, result.error).to.be.true
  })
})

When('I click on an available report', () => {

  Cypress.emit('log:step', 'I click on an available report')
  reportsPage.availableReports().first().scrollIntoView().click({ force: true })
})

When('on the Available reports page I select first available report', () => {

  Cypress.emit('log:step', 'on the Available reports page I select first available report')
  cy.get(':nth-child(1) > .govuk-link')
    .invoke('attr', 'href')
    .then(url => {
      cy.request(url).then(res => {
        expect(res.status).to.eq(200)
        expect(res.headers['content-type']).to.include('text/html; charset=utf-8')
      })
    })
})

When(/^the user downloads the status report with text "(.*)"$/, (linkText) => {

  Cypress.emit('log:step', 'the user downloads the status report with text ' + linkText)
  const { paymentManagementUrl } = getEnvironmentConfig()

  cy.contains('a.govuk-link', linkText)
    .should('have.attr', 'href')
    .then((relativeHref) => {
      const baseUrl = paymentManagementUrl.replace(/\/$/, '')
      const path = relativeHref.startsWith('/') ? relativeHref : `/${relativeHref}`
      const fullUrl = `${baseUrl}${path}`

      const decodedHref = decodeURIComponent(relativeHref)
      const filePathParam = decodedHref.split('file-name=')[1]

      const rawFileName = filePathParam.replace(/\//g, '_')
      const sanitizedFileName = rawFileName.replace(/:/g, '_')
      const filePath = `cypress/downloads/${sanitizedFileName}`

      cy.request({
        url: fullUrl,
        encoding: 'utf8'
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.writeFile(filePath, response.body)
      })

      cy.wrap(sanitizedFileName).as('downloadedFileName')
    })
})

When(/^the status report is downloaded with "(.*)" as the title$/, function (title) {

  Cypress.emit('log:step', 'the status report is downloaded with ' + title + ' as the title')
  cy.get('@downloadedFileName').then((fileName) => {
    const expectedFileName = `${title}.csv`
    expect(fileName).to.include(expectedFileName)

    const relativePath = `cypress/downloads/${fileName}`
    const checkFileExists = (attempt = 0, maxAttempts = 10) => {
      return cy.task('fileExists', relativePath, {timeout: 3000}).then((exists) => {
        if (exists) {
          return true
        }
        if (attempt >= maxAttempts) {
          throw new Error(`File "${relativePath}" not found after ${maxAttempts} attempts.`)
        }
        return cy.wait(1000).then(() => checkFileExists(attempt + 1, maxAttempts))
      })
    }


    checkFileExists().should('eq', true)
  })
})

Then(/^I select "(.*)" from the monitor schemes dropdown$/, (scheme) => {

  Cypress.emit('log:step', 'I select ' + scheme + ' from the monitor schemes dropdown')
  paymentEventMonitoringPage.selectSchemeDropdown().scrollIntoView().select(scheme)
  cy.log(`Selected ${scheme} from the monitor schemes dropdown`)
  console.log(`Selected ${scheme} from the monitor schemes dropdown`)
})

Then(/^I confirm that payment for "(.*)" scheme with "(.*)" payment installments totalling "(.*)" is displayed$/, (scheme, payments, value) => {

  Cypress.emit('log:step', 'I confirm that payment for ' + scheme + ' scheme with ' + payments + ' payment installments totalling ' + value + ' is displayed')
  cy.wait(2000) // Waiting for data load
  cy.get('main').within(() => {
    cy.contains(scheme).should('be.visible')
    cy.contains(payments).should('be.visible')
    cy.contains(value).should('be.visible')
  })
  cy.log(`Confirmed that payment for ${scheme} scheme with ${payments} payment installments totalling ${value} is displayed`)
  console.log(`Confirmed that payment for ${scheme} scheme with ${payments} payment installments totalling ${value} is displayed`)
})

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

When (/^on the Add New Alert Recipient page I click the "(.*)" button$/, (button) => {

  Cypress.emit('log:step', 'on the Add New Alert Recipient page I click the ' + button)
  switch (button) {
  case 'Add recipient':
    paymentAlertsPage.addNewRecipientButton().click(); break
  }
  cy.log(`Clicked on the ${button} button successfully`)
  console.log(`Clicked on the ${button} button successfully`)
})

Then (/^on the Metrics Dashboard page I confirm that "(.*)" is not displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Metrics Dashboard page I confirm that ' + element + ' is not displayed')
  switch (element) {
  case 'select year filter dropdown':
    metricsDashboardPage.selectYearFilterDropdown().should('not.be.visible'); break
  case 'select month filter dropdown':
    metricsDashboardPage.selectMonthFilterDropdown().should('not.be.visible'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that' + element + ' is not displayed on the Metrics Dashboard page')
  cy.log('Confirmed that' + element + ' is not displayed on the Metrics Dashboard page')
})


Then(/^on the Metrics Dashboard page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit(
    'log:step',
    `on the Metrics Dashboard page I confirm that ${element} is displayed`
  )

  const verify = (method, texts) => {
    texts.forEach(text => {
      metricsDashboardPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'page title':
    verify('heading', ['Metrics dashboard'])
    break

  case 'page description':
    verify('paragraph', ['This dashboard provides operational metrics for payments and documents. You can view payment and document metrics filtered by time period.'])
    break

  case 'time period filter dropdown':
    metricsDashboardPage.timePeriodFilterDropdown()
      .should('be.visible')
    break

  case 'time period filter button':
    verify('button', ['Apply filters'])
    break

  case 'payment metrics sub header':
    verify('heading', ['Payment Metrics'])
    break

  case 'payments panel':
    verify('panel', ['Payments'])
    break

  case 'payments count':
    metricsDashboardPage.panelValue('Payments')
      .should('be.visible')
    break

  case 'total value panel':
    verify('panel', ['Total Value'])
    break

  case 'total value amount':
    metricsDashboardPage.panelValue('Total Value')
      .should('be.visible')
    break

  case 'breakdown description':
    metricsDashboardPage.tableCaption(
      'Payments by scheme breakdown',
      'Breakdown of payments and values by scheme'
    ).should('be.visible')
    break

  case 'payment scheme column':
    metricsDashboardPage.tableHeader(
      'Payments by scheme breakdown',
      'Scheme'
    ).should('be.visible')
    break

  case 'total payments column':
    metricsDashboardPage.tableHeader(
      'Payments by scheme breakdown',
      'Total Payments'
    ).should('be.visible')
    break

  case 'total value column':
    metricsDashboardPage.tableHeader(
      'Payments by scheme breakdown',
      'Total Value (£)'
    ).should('be.visible')
    break

  case 'pending column':
    metricsDashboardPage.tableHeader(
      'Payments by scheme breakdown',
      'Pending'
    ).should('be.visible')
    break

  case 'processed column':
    metricsDashboardPage.tableHeader(
      'Payments by scheme breakdown',
      'Processed'
    ).should('be.visible')
    break

  case 'documents metrics sub header':
    verify('heading', ['Document Metrics'])
    break

  case 'documents issued':
    verify('panel', ['Documents Issued'])
    break

  case 'documents count':
    metricsDashboardPage.panelValue('Documents Issued')
      .should('be.visible')
    break

  case 'documents breakdown description':
    metricsDashboardPage.tableCaption(
      'Statements by scheme and delivery method',
      'Breakdown of statements by scheme showing delivery methods and costs'
    ).should('be.visible')
    break

  case 'documents scheme column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Scheme'
    ).should('be.visible')
    break

  case 'year column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Year'
    ).should('be.visible')
    break

  case 'total documents column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Total Documents'
    ).should('be.visible')
    break

  case 'print and post column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Print & Post'
    ).should('be.visible')
    break

  case 'print and post cost column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Print & Post Cost (£)'
    ).should('be.visible')
    break

  case 'email column':
    metricsDashboardPage.tableHeader(
      'Statements by scheme and delivery method',
      'Email'
    ).should('be.visible')
    break

  case 'select year filter dropdown':
    metricsDashboardPage.selectYearFilterDropdown()
      .should('be.visible')
    break

  case 'select month filter dropdown':
    metricsDashboardPage.selectMonthFilterDropdown()
      .should('be.visible')
    break

  case 'no payment data message':
    verify('warningText', ['Warning No metrics data is available for the selected period from either payment or document services. This may indicate no activity has been recorded yet.'])
    break

  case 'no document data message':
    verify('verifyText', ['No document data available for the selected period.'])
    break

  case 'clear filters':
    metricsDashboardPage.clearFiltersButton()
      .should('be.visible')
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(
    `Confirmed that ${element} is displayed on the Metrics Dashboard page`
  )

  cy.log(
    `Confirmed that ${element} is displayed on the Metrics Dashboard page`
  )
})

Then(/^on the Metrics Dashboard page I select "(.*?)" in (.*?) filter$/, (option, filter) => {

  Cypress.emit('log:step', 'on the Metrics Dashboard page I select ' + option + ' in ' + filter + ' filter')

  if (filter === 'Time Period') {
    metricsDashboardPage.timePeriodFilterDropdown().scrollIntoView().select(option)
  } else if (filter === 'Select Year') {
    metricsDashboardPage.selectYearFilterDropdown().scrollIntoView().select(option)
  } else if (filter === 'Select Month') {
    metricsDashboardPage.selectMonthFilterDropdown().scrollIntoView().select(option)
  } else {
    throw new Error(`Unknown filter: ${filter}`)
  }

  cy.log(`Selected ${option} option in ${filter} filter`)
  console.log(`Selected ${option} option in ${filter} filter`)
})

When(/^on the Metrics Dashboard page I click on the "(.*)" button$/, (button) => {

  Cypress.emit('log:step', 'on the Metrics Dashboard page I click on the ' + button + ' button')

  switch (button) {
  case 'clear filters':
    metricsDashboardPage.clearFiltersButton().scrollIntoView().click(); break
  default:
    throw new Error('invalid button name')
  }

  cy.log('Clicked' + button + 'on Metrics Dashboard page')
  console.log('Clicked' + button + 'on Metrics Dashboard page')
})

Then(/^on the Metrics Dashboard page I confirm that (.*) value is (.*)$/, (field, expectedValue) => {

  Cypress.emit('log:step', 'on the Metrics Dashboard page I confirm that ' + field + ' is ' + expectedValue)

  let fieldNumber

  switch (field) {
  case 'number of payments': fieldNumber = 0; break
  case 'payment amount': fieldNumber = 1; break
  case 'number of documents': fieldNumber = 2; break
  default:
    throw new Error('invalid field name')
  }

  let actualValue

  cy.get('.metrics-panel').eq(fieldNumber)
    .find('.metrics-panel__body')

    .invoke('text')
    .then((text) => {
      actualValue = text.trim()   // "0"

      console.log(`Expected Value = ${expectedValue}. Actual Value = ${actualValue}`)
      cy.log(`Expected Value = ${expectedValue}. Actual Value = ${actualValue}`)

      if (expectedValue === actualValue) {
        console.log(`Confirmed that ${field} is ${expectedValue}`)
        cy.log(`Confirmed that ${field} is ${expectedValue}`)
      } else {
        console.log(`${field} is not ${expectedValue}, Actual value is ${actualValue}`)
        cy.log(`${field} is not ${expectedValue}, Actual value is ${actualValue}`)
        throw new Error('Incorrect value')
      }
    })
})

Then(/^on the Download Statements page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit(
    'log:step',
    `on the Download Statements page I confirm that ${element} is displayed`
  )

  const verify = (method, texts) => {
    texts.forEach(text => {
      downloadStatementsPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'page title':
    verify('heading', ['Download payment statements'])
    break

  case 'page description':
    verify('paragraph', ['Statements provide customers with payment details.'])
    break

  case 'page instructions':
    verify('label', ['Full filename'])
    break

  case 'instruction examples':
    verify('hint', ['Examples:', 'FFC_PaymentDelinkedStatement_DP_2024_1100021264_2025101508224868.pdf', 'FFC_PaymentSfi23QuarterlyStatement_DP_2024_1100021264_2025101508224868.pdf'])
    break

  case 'filename field':
    downloadStatementsPage.input('#filename')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
    break

  case 'individual criteria instructions':
    verify('paragraph', ['Or search by individual criteria:'])
    break

  case 'select scheme Delinked Radio':
    downloadStatementsPage.input('#schemeId-1')
      .should('exist')
    break

  case 'select scheme SFI Radio':
    downloadStatementsPage.input('#schemeId-2')
      .should('exist')
    break

  case 'marketing year label':
    verify('label', ['Marketing year'])
    break

  case 'marketing year field':
    downloadStatementsPage.input('#marketingYear')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
    break

  case 'frn label':
    verify('label', ['Firm reference number (FRN)'])
    break

  case 'frn search instructions':
    verify('hint', ['Enter a 10-digit FRN'])
    break

  case 'frn field':
    downloadStatementsPage.input('#frn')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
    break

  case 'timestamp label':
    verify('label', ['Timestamp'])
    break

  case 'timestamp search instructions':
    verify('hint', ['For example, 06-01-2026 18:00'])
    break

  case 'timestamp field':
    downloadStatementsPage.input('#timestamp')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
    break

  case 'search statements button':
    downloadStatementsPage.input('#report-submit')
      .should('be.visible')
      .and('have.class', 'govuk-button')
    break

  case 'clear button':
    downloadStatementsPage.button('Clear')
      .should('be.visible')
      .and('have.attr', 'type', 'button')
    break

  case 'statements sub header and number of results':
    verify('heading', ['Statements'])
    break

  case 'scheme column':
    verify('tableHeader', ['Scheme'])
    break

  case 'year column':
    verify('tableHeader', ['Year'])
    break

  case 'frn column':
    verify('tableHeader', ['FRN'])
    break

  case 'timestamp column':
    verify('tableHeader', ['Timestamp'])
    break

  case 'action column':
    verify('tableHeader', ['Action'])
    break

  case 'next button':
    if (!env.includes('local')) {
      downloadStatementsPage.paginationLink('Next')
        .should('be.visible')
    } else {
      downloadStatementsPage.paginationLink('Next')
        .should('not.exist')
    }
    break

  case 'previous button':
    downloadStatementsPage.paginationLink('Previous')
      .should('be.visible')
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(`Confirmed that ${element} is displayed on the Download Statements page`)
  cy.log(`Confirmed that ${element} is displayed on the Download Statements page`)
})



Then(/^on the Download Statements page I confirm that the text on "(.*)" reads "(.*)"$/, (element, expectedText) => {

  Cypress.emit('log:step', 'on the Download Statements page I confirm that the text on ' + element + ' reads ' + expectedText)
  let selectedElement

  switch (element) {
  case 'number of results':
    selectedElement = downloadStatementsPage.numberOfResults(); break
  default:
    throw new Error('invalid element')
  }

  selectedElement.should('be.visible').invoke('text').then((text) => {
    if (text.includes(expectedText)) {
      console.log(`Confirmed that the text on ${element} reads ${expectedText}`)
      cy.log(`Confirmed that the text on ${element} reads ${expectedText}`)
    } else {
      console.log(`The text on ${element} does not read ${expectedText}, actual value is ${text}`)
      cy.log(`The text on ${element} does not read ${expectedText}, actual value is ${text}`)
      throw new Error('Incorrect text')
    }
  })
})

Then(/^on the Download Statements page I confirm that statement can be downloaded$/, () => {

  Cypress.emit('log:step', 'on the Download Statements page I confirm that statement can be downloaded')
  cy.request('/download-statements/download/FFC_PaymentDelinkedStatement_DP_2025_1105607649_2025101415310344.pdf')
    .its('status') .should('eq', 200)
})


Then('on the Download Statements page I confirm that no statement results are displayed', () => {
  downloadStatementsPage.resultsTable()
    .should('not.exist')
})

Then (/^on the Reset payment request page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Reset payment request page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'page title':
    resetPaymentRequestPage.pageTitle().should('be.visible').haveWithoutWhitespace('Reset payment request'); break
  case 'page description':
    resetPaymentRequestPage.pageDescription().should('be.visible').containsWithoutWhitespace( 'Invoice number'); break
  case 'page instructions':
    resetPaymentRequestPage.pageInstructions().should('be.visible').containsWithoutWhitespace( 'For example S123456789012345V001'); break
  case 'invoice number field':
    resetPaymentRequestPage.invoiceNumberField().should('be.visible').and('have.attr', 'type', 'text'); break
  case 'reset button':
    resetPaymentRequestPage.resetButton().should('be.visible').and('have.attr', 'type', 'submit'); break
  case 'payment request does not exist error':
    resetPaymentRequestPage.errorTitle().should('be.visible').containsWithoutWhitespace( 'There is a problem')
    resetPaymentRequestPage.errorMessage().should('be.visible').containsWithoutWhitespace( 'Payment request', 'does not exist'); break
  case 'enter a valid invoice number error':
    resetPaymentRequestPage.errorTitle().should('be.visible').containsWithoutWhitespace( 'There is a problem')
    resetPaymentRequestPage.errorMessage().should('be.visible').containsWithoutWhitespace( 'Error: Enter an invoice number'); break
  case 'payment request successfully reset message':
    resetPaymentRequestPage.successTitle().should('be.visible').containsWithoutWhitespace( 'has been successfully reset and will be reprocessed by Payment Hub'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that' + element + 'is displayed on the Reset payment request page')
  cy.log('Confirmed that' + element + 'is displayed on the Reset payment request page')
})

Then (/^on the Reset payment request page I enter "(.*)" into the "(.*)" field$/, (text, field) => {

  Cypress.emit('log:step', 'on the Reset payment request page I enter ' + text + ' into the ' + field + ' field')

  switch (field) {
  case 'invoice number':
    resetPaymentRequestPage.invoiceNumberField().scrollIntoView().type(text); break
  default:
    throw new Error('invalid field name')
  }

  console.log(`Entered ${text} into the ${field} field on the Reset payment request page`)
  cy.log(`Entered ${text} into the ${field} field on the Reset payment request page`)
})

Then (/^on the Reset payment request page I use current invoice number in the invoice number field$/, () => {

  Cypress.emit('log:step', 'on the Reset payment request page I use current invoice number in the invoice number field')
  const currentInvoiceNumber = 'S2795919' + Cypress.env('nextContractNumber').toString() + 'V001'

  resetPaymentRequestPage.invoiceNumberField().scrollIntoView().type(currentInvoiceNumber)
})


Then (/^on the Reset payment request page I click the "(.*)"$/, (button) => {

  Cypress.emit('log:step', 'on the Reset payment request page I click the ' + button)

  switch (button) {
  case 'reset button': resetPaymentRequestPage.resetButton().scrollIntoView().click(); break
  default:
    throw new Error('invalid button name')
  }
  cy.log(`Clicked on the ${button} successfully`)
  console.log(`Clicked on the ${button} successfully`)
})

Then(
  /^I confirm that second completedPaymentRequest entry has been made in database for invoice number "(.*)"$/,
  (invoiceNumber) => {
    Cypress.emit(
      'log:step',
      `I confirm that second completedPaymentRequest entry has been made in database for invoice number ${invoiceNumber}`
    )

    if (invoiceNumber.includes('Current')) {
      invoiceNumber = `S2795919${Cypress.env('nextContractNumber')}V001`
    }

    const sqlStatement = `
      SELECT *
      FROM "completedPaymentRequests"
      WHERE "invoiceNumber" = '${invoiceNumber}'
    `

    const databaseName = 'ffc-pay-processing'

    const pollForSecondEntry = (attempt = 1, maxAttempts = 20) => {
      cy.task('databaseQuery', { env, databaseName, sqlStatement })
        .then((result) => {
          const data = result.rows

          cy.log(
            `Attempt ${attempt}: Found ${data.length} completedPaymentRequest entries for invoice number ${invoiceNumber}`
          )

          if (data.length >= 2) {
            cy.log(
              `Confirmed that second completedPaymentRequest entry has been made in database for invoice number ${invoiceNumber}`
            )
            return
          }

          if (attempt >= maxAttempts) {
            throw new Error(
              `Expected at least 2 completedPaymentRequest entries for invoice number ${invoiceNumber}, but found ${data.length}`
            )
          }

          cy.wait(5000)
          pollForSecondEntry(attempt + 1, maxAttempts)
        })
    }

    pollForSecondEntry()
  }
)

Then(/^on the View events page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step',`on the View events page I confirm that ${element} is displayed`)

  const verify = (method, texts) => {
    texts.forEach(text => {
      paymentEventMonitoringPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'sub header':
    verify('heading', ['View payment events'])
    break

  case 'frn search instructions':
    verify('paragraph', ['Search and view payment events and activity by Firm Reference Number (FRN) or batch payment file name.'])
    break

  case 'frn search field':
    paymentEventMonitoringPage.searchField('frn')
      .should('be.visible')
      .and('have.attr', 'type', 'search')
    break

  case 'frn search button':
    paymentEventMonitoringPage.searchButton('frn')
      .should('be.visible')
      .and('have.attr', 'type', 'submit')
    break

  case 'batch search field':
    paymentEventMonitoringPage.searchField('batch')
      .should('be.visible')
      .and('have.attr', 'type', 'search')
    break

  case 'batch search button':
    paymentEventMonitoringPage.searchButton('batch')
      .should('be.visible')
      .and('have.attr', 'type', 'submit')
    break

  case 'frn searched label':
    verify('heading', ['1258445148'])
    break

  case 'scheme column':
    verify('tableHeader', ['Scheme'])
    break

  case 'agreement column':
    verify('tableHeader', ['Agreement'])
    break

  case 'payment request column':
    verify('tableHeader', ['Payment request'])
    break

  case 'value column':
    verify('tableHeader', ['Value'])
    break

  case 'status column':
    verify('tableHeader', ['Status'])
    break

  case 'last updated column':
    verify('tableHeader', ['Last updated'])
    break

  case 'view frn label':
    verify('heading', ['1000000001 - 00000001'])
    break

  case 'view batch label':
    verify('heading', ['SITISFIA0001_AP_20230810085609205.dat'])
    break

  case 'activity column':
    verify('tableHeader', ['Activity'])
    break

  case 'batch sub header':
    verify('heading', ['View batch file payments and their status'])
    break

  case 'batch frn column':
    verify('tableHeader', ['FRN'])
    break

  case 'batch year column':
    verify('tableHeader', ['Year'])
    break

  case 'batch agreement column':
    verify('tableHeader', ['Agreement'])
    break

  case 'batch request column':
    verify('tableHeader', ['Request'])
    break

  case 'batch value column':
    verify('tableHeader', ['Value'])
    break

  case 'batch status column':
    verify('tableHeader', ['Status'])
    break

  case 'batch actions column':
    verify('tableHeader', ['Activity'])
    break

  case 'frn payment history':
    verify('heading', ['FRN payment history'])
    break

  case 'frn payment request history':
    verify('heading', ['FRN payment request history'])
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(`Confirmed that ${element} is displayed on the View events page`)
  cy.log(`Confirmed that ${element} is displayed on the View events page`)
})

Then(/^on the View processed payment requests page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step',`on the View processed payment requests page I confirm that ${element} is displayed`)

  const verify = (method, texts) => {
    texts.forEach(text => {
      paymentEventMonitoringPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'sub header':
    verify('heading', ['View payment events by scheme'])
    break

  case 'select scheme label':
    verify('paragraph', ['Select a scheme to view how many payments have been made and the combined value.'])
    break

  case 'select scheme dropdown':
    paymentEventMonitoringPage.selectSchemeDropdown()
      .should('be.visible')
      .and('have.class', 'govuk-select')
    break

  case 'select scheme button':
    paymentEventMonitoringPage.selectSchemeButton()
      .should('be.visible')
      .and('have.attr', 'type', 'submit')
    break

  case 'processed payment requests label':
    verify('tableCaption', ['Scheme payment event details'])
    break

  case 'scheme column':
    verify('tableHeader', ['Scheme'])
    break

  case 'number of payments column':
    verify('tableHeader', ['Number of payments'])
    break

  case 'value column':
    verify('tableHeader', ['Value'])
    break

  default:
    throw new Error(`Invalid element: ${element}`)
  }

  console.log(`Confirmed that ${element} is displayed on the View processed payment requests page`)
  cy.log(`Confirmed that ${element} is displayed on the View processed payment requests page`)
})


Then(/^on the View processed payment requests page I select "(.*)" in scheme dropdown$/, (selection) => {
  Cypress.emit('log:step',`on the View processed payment requests page I select ${selection} in scheme dropdown`)

  paymentEventMonitoringPage.selectSchemeDropdown()
    .select(selection)

  console.log(`Selected ${selection} in Scheme dropdown`)
  cy.log(`Selected ${selection} in Scheme dropdown`)
})

Then(/^on the View events page I enter "(.*)" into the "(.*)" field$/, (value, field) => {
  Cypress.emit('log:step',`on the View events page I enter ${value} into the ${field} field`)

  switch (field) {
  case 'frn':
    paymentEventMonitoringPage.searchField('frn')
      .scrollIntoView()
      .clear()
      .type(value)
    break

  case 'batch':
    paymentEventMonitoringPage.searchField('batch')
      .scrollIntoView()
      .clear()
      .type(value)
    break

  default:
    throw new Error(`Invalid field name: ${field}`)
  }

  console.log(`Entered ${value} into the ${field} field on the View events page`)
  cy.log(`Entered ${value} into the ${field} field on the View events page`)
})

Then(/^on the View events page I click the "(.*)"$/, (button) => {
  Cypress.emit('log:step',`on the View events page I click the ${button}`)

  switch (button) {
  case 'frn search button':
    paymentEventMonitoringPage.searchButton('frn')
      .scrollIntoView()
      .click()
    break

  case 'batch search button':
    paymentEventMonitoringPage.searchButton('batch')
      .scrollIntoView()
      .click()
    break

  case 'view link':
    paymentEventMonitoringPage.viewLink()
      .scrollIntoView()
      .click()
    break

  default:
    throw new Error(`Invalid button name: ${button}`)
  }

  cy.log(`Clicked on the ${button} successfully`)
  console.log(`Clicked on the ${button} successfully`)
})

Then(/^on the View events page I confirm that rows are ordered correctly by payment request$/, () => {
  Cypress.emit('log:step','on the View events page I confirm that rows are ordered correctly by payment request')

  paymentEventMonitoringPage.paymentRequestCell(1)
    .should('be.visible')
    .containsWithoutWhitespace('1')

  paymentEventMonitoringPage.paymentRequestCell(2)
    .should('be.visible')
    .containsWithoutWhitespace('2')

  console.log('Confirmed that rows are ordered correctly by payment request')
  cy.log('Confirmed that rows are ordered correctly by payment request')
})

Then(
  /^on the View events page I confirm that "(.*)" of entry number "(.*)" in table is "(.*)"$/,
  (columnName, rowNumber, expectedValue) => {
    Cypress.emit('log:step',`on the View events page I confirm that ${columnName} of entry number ${rowNumber} in table is ${expectedValue}`)

    const columnMap = {
      scheme: 1,
      agreement: 2,
      'payment request': 3,
      value: 4,
      status: 5,
      'last updated': 6
    }

    if (!columnMap[columnName]) {
      throw new Error(`Invalid column name: ${columnName}`)
    }

    if (columnName === 'last updated') {
      const today = new Date()
      const day = String(today.getDate()).padStart(2, '0')
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const year = today.getFullYear()

      expectedValue = `${day}/${month}/${year}`

      console.log(expectedValue)
      cy.log(expectedValue)
    }

    paymentEventMonitoringPage.tableCell(rowNumber, columnMap[columnName])
      .should('be.visible')
      .containsWithoutWhitespace(expectedValue)

    console.log(`Confirmed value of table entry ${rowNumber} is ${expectedValue}`)
    cy.log(`Confirmed value of table entry ${rowNumber} is ${expectedValue}`)
  }
)

Then (/^on the Alerts page I confirm that "(.*)" is displayed$/, (element) => {

  // The order of elements on the Alerts page is different for local and dev environments, as a result
  // dev version of this script has page elements adjusted to account for this0

  Cypress.emit('log:step', 'on the Alerts page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'sub header': paymentAlertsPage.subHeader().should('be.visible').containsWithoutWhitespace( 'Manage alerts'); break
  case 'page description': paymentAlertsPage.pageDescription().should('be.visible').containsWithoutWhitespace(
    'This section allows users to see payment alerts that are in place for each scheme and',
    'manage who is set up to receive each type of alert. If a payment is rejected, alerts are',
    'used to notify people so that the error preventing payment can be resolved. Some',
    'users are alerted for information, but some will be required to resolve the payment issue')
    break
  case 'find out more': paymentAlertsPage.findOutMore().should('be.visible').containsWithoutWhitespace(
    'Find out more about each alert type by visiting our alerts information page, or by clicking on any of the alert type names below.')
    break
  case 'alerts information link': paymentAlertsPage.alertsInformationLink().should('be.visible').and('have.attr', 'class', 'govuk-link'); break
  case 'add new recipient button': paymentAlertsPage.addNewRecipientButton().should('be.visible').and('have.attr', 'class', 'govuk-button'); break
  case 'show all sections button': paymentAlertsPage.showAllSectionsButton().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'sfi22 label': paymentAlertsPage.sfi22Label().should('be.visible').containsWithoutWhitespace( 'SFI-22'); break
  case 'sfi22 show button': paymentAlertsPage.sfi22Show().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'sfi pilot label': paymentAlertsPage.sfiPilotLabel().should('be.visible').containsWithoutWhitespace( 'SFI-Pilot'); break
  case 'sfi pilot show button': paymentAlertsPage.sfiPilotShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'lump sums label': paymentAlertsPage.lumpSumsLabel().should('be.visible').containsWithoutWhitespace( 'Lump Sum Payments'); break
  case 'lump sums show button': paymentAlertsPage.lumpSumsShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'vet visits label': paymentAlertsPage.vetVisitsLabel().should('be.visible').containsWithoutWhitespace( 'Vet Visits'); break
  case 'vet visits show button': paymentAlertsPage.vetVisitsShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'countryside stewardship label': paymentAlertsPage.countrysideStewardshipLabel().should('be.visible').containsWithoutWhitespace( 'Countryside Stewardship'); break
  case 'countryside stewardship show button': paymentAlertsPage.countrysideStewardshipShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'basic payment scheme label': paymentAlertsPage.basicPaymentSchemeLabel().should('be.visible').containsWithoutWhitespace( 'Basic Payment Scheme'); break
  case 'basic payment scheme show button': paymentAlertsPage.basicPaymentSchemeShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'manual injection label':
    if (env.includes('local')) {
      paymentAlertsPage.manualInjectionLabel().should('be.visible').containsWithoutWhitespace( 'Manual Injection')
    } else if (env.includes('dev')) {
      paymentAlertsPage.expandedSFIOfferLabel().should('be.visible').containsWithoutWhitespace( 'Manual Injection')
    }
    break
  case 'manual injection show button':
    paymentAlertsPage.manualInjectionShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'environmental stewardship label':
    if (env.includes('local')) {
      paymentAlertsPage.environmentalStewardshipLabel().should('be.visible').containsWithoutWhitespace( 'Environmental Stewardship')
    } else if (env.includes('dev')) {
      paymentAlertsPage.manualInjectionLabel().should('be.visible').containsWithoutWhitespace( 'Environmental Stewardship')
    }
    break
  case 'environmental stewardship show button': paymentAlertsPage.environmentalStewardshipShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'imps label':
    if (env.includes('local')) {
      paymentAlertsPage.impsLabel().should('be.visible').containsWithoutWhitespace( 'IMPS')
    } else if (env.includes('dev')) {
      paymentAlertsPage.environmentalStewardshipLabel().should('be.visible').containsWithoutWhitespace( 'IMPS')
    }
    break
  case 'imps show button': paymentAlertsPage.impsShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'forestry commission label':
    if (env.includes('local')) {
      paymentAlertsPage.forestryCommissionLabel().should('be.visible').containsWithoutWhitespace( 'Forestry Commission')
    } else if (env.includes('dev')) {
      paymentAlertsPage.impsLabel().should('be.visible').containsWithoutWhitespace( 'Forestry Commission')
    }
    break
  case 'forestry commission show button': paymentAlertsPage.forestryCommissionShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'sfi23 label':
    if (env.includes('local')) {
      paymentAlertsPage.sfi23Label().should('be.visible').containsWithoutWhitespace( 'SFI-23')
    } else if (env.includes('dev')) {
      paymentAlertsPage.forestryCommissionLabel().should('be.visible').containsWithoutWhitespace( 'SFI-23')
    }
    break
  case 'sfi23 show button': paymentAlertsPage.sfi23Show().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'delinked payments label':
    if (env.includes('local')) {
      paymentAlertsPage.delinkedPaymentsLabel().should('be.visible').containsWithoutWhitespace( 'Delinked Payments')
    } else if (env.includes('dev')) {
      paymentAlertsPage.sfi23Label().should('be.visible').containsWithoutWhitespace( 'Delinked Payments')
    }
    break
  case 'delinked payments show button': paymentAlertsPage.delinkedPaymentsShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'expanded sfi label':
    if (env.includes('local')) {
      paymentAlertsPage.expandedSFIOfferLabel().should('be.visible').containsWithoutWhitespace( 'Expanded SFI Offer')
    } else if (env.includes('dev')) {
      paymentAlertsPage.delinkedPaymentsLabel().should('be.visible').containsWithoutWhitespace( 'Expanded SFI Offer')
    }
    break
  case 'expanded sfi show button': paymentAlertsPage.expandedSFIOfferShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'csht revenue label': paymentAlertsPage.cshtRevenueLabel().should('be.visible').containsWithoutWhitespace( 'Countryside Stewardship Higher Tier (Revenue)'); break
  case 'csht revenue show button': paymentAlertsPage.cshtRevenueShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'csht capital label': paymentAlertsPage.cshtCapitalLabel().should('be.visible').containsWithoutWhitespace( 'Countryside Stewardship Higher Tier (Capital)'); break
  case 'csht capital show button': paymentAlertsPage.cshtCapitalShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  default:
    throw new Error('invalid element')
  }
  console.log('Confirmed that'+ element + ' is displayed on the Alerts page')
  cy.log('Confirmed that' + element + ' is displayed on the Alerts page')
})

Then (/^on the Alerts page I click the "(.*)"$/, (element) => {

  Cypress.emit('log:step', 'on the Alerts page I click the ' + element)

  switch (element) {
  case 'show all sections button': paymentAlertsPage.showAllSectionsButton().scrollIntoView().click(); break
  case 'alerts information link': paymentAlertsPage.alertsInformationLink().scrollIntoView().click(); break
  case 'add new alerts recipient button': paymentAlertsPage.addNewRecipientButton().scrollIntoView().click(); break
  case 'sfi22 show button': paymentAlertsPage.sfi22Show().scrollIntoView().click(); break
  case 'sfi pilot show button': paymentAlertsPage.sfiPilotShow().scrollIntoView().click(); break
  case 'lump sums show button': paymentAlertsPage.lumpSumsShow().scrollIntoView().click(); break
  case 'vet visits show button': paymentAlertsPage.vetVisitsShow().scrollIntoView().click(); break
  case 'countryside stewardship show button': paymentAlertsPage.countrysideStewardshipShow().scrollIntoView().click(); break
  case 'basic payment scheme show button': paymentAlertsPage.basicPaymentSchemeShow().scrollIntoView().click(); break
  case 'manual injection show button': paymentAlertsPage.manualInjectionShow().scrollIntoView().click(); break
  case 'environmental stewardship show button': paymentAlertsPage.environmentalStewardshipShow().scrollIntoView().click(); break
  case 'imps show button': paymentAlertsPage.impsShow().scrollIntoView().click(); break
  case 'forestry commission show button': paymentAlertsPage.forestryCommissionShow().scrollIntoView().click(); break
  case 'sfi23 show button': paymentAlertsPage.sfi23Show().scrollIntoView().click(); break
  case 'delinked payments show button': paymentAlertsPage.delinkedPaymentsShow().scrollIntoView().click(); break
  case 'expanded sfi show button': paymentAlertsPage.expandedSFIOfferShow().scrollIntoView().click(); break
  case 'csht revenue show button': paymentAlertsPage.cshtRevenueShow().scrollIntoView().click(); break
  case 'csht capital show button': paymentAlertsPage.cshtCapitalShow().scrollIntoView().click(); break
  case 'sfi22 all alerts button': paymentAlertsPage.addNewSFI22All().scrollIntoView().click(); break
  case 'sfi pilot all alerts button': paymentAlertsPage.addNewSFIPilotAll().scrollIntoView().click(); break
  case 'create new alert recipient button': paymentAlertsPage.createNewAlertRecipientButton().scrollIntoView().click(); break
  case 'edit button': paymentAlertsPage.editButton().scrollIntoView().click(); break
  case 'remove email button': paymentAlertsPage.removeEmailButton().scrollIntoView().click(); break
  default:
    throw new Error('invalid element')
  }
  console.log('Clicked '+ element + ' on the Alerts page')
  cy.log('Clicked '+ element + ' on the Alerts page')
})

Then (/^on the Alerts page I confirm that all schemes have successfully cascaded$/, () => {

  Cypress.emit('log:step', 'on the Alerts page I confirm that all schemes have successfully cascaded')

  cy.get('.govuk-accordion__section-toggle-text') .should($els => {
    // Convert to array and check each element's text
    const allAreHide = [...$els].every(el => el.textContent.trim() === 'Hide')
    expect(allAreHide).to.be.true
  })
})

Then (/^on the Add new alert recipient page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'sub header': paymentAlertsPage.addNewSubHeader().should('be.visible').containsWithoutWhitespace( 'Add new alert recipient'); break
  case 'email label': paymentAlertsPage.addNewEmailLabel().should('be.visible').containsWithoutWhitespace( 'Email address'); break
  case 'email field': paymentAlertsPage.addNewEmailField().should('be.visible').and('have.attr', 'type', 'text'); break
  case 'select scheme label':paymentAlertsPage.addNewSelectSchemeLabel().should('be.visible').containsWithoutWhitespace( 'Select a scheme to view alerts for'); break
  case 'select scheme dropdown': paymentAlertsPage.addNewSelectSchemeDropdown().should('be.visible').and('have.attr', 'class', 'govuk-select'); break
  case 'invalid email error message': paymentAlertsPage.addNewInvalidEmailError().should('be.visible').containsWithoutWhitespace( 'The email address is not allowed. Please contact the Payment & Document Services team if you believe this is a mistake.'); break
  default:
    throw new Error('invalid element')
  }
  console.log('Confirmed that '+ element + ' is displayed on the Add new alert recipient page')
  cy.log('Confirmed that ' + element + ' is displayed on the Add new alert recipient page')
})

Then(/^on the Add new alert recipient page I confirm that all options are present when no filter selected$/, () => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I confirm that all options are present when no filter selected')

  const stringsToCheck = ['Receive all alerts for this scheme', 'Batch Rejected', 'Batch Quarantined', 'Payment Rejected', 'Payment Dax Rejected', 'Payment Invalid Bank', 'Payment Processing Failed', 'Payment Settlement Unsettled', 'Payment Settlement Unmatched', 'Response Rejected', 'Payment Request Blocked', 'Payment Dax Unavailable', 'Receiver Connection Failed', 'Demographics Processing Failed', 'Demographics Update Failed', 'Event Save Alert', 'Table Create Alert', 'Responses Processing Failed', 'Customer Update Processing Failed', 'Tracking Update Failure']

  cy.document().then(doc => {
    const pageText = doc.body.innerText
    stringsToCheck.forEach(str => {
      const count = (pageText.match(new RegExp(str, 'g')) || []).length
      expect(count, `Occurrences of "${str}"`).to.eq(17)
    })
  })
  console.log('Confirmed that all options are present when no filter selected')
  cy.log('Confirmed that all options are present when no filter selected')
})

Then(/^on the Add new alert recipient page I confirm that only one set of options is displayed$/, () => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I confirm that only one set of options is displayed')

  const stringsToCheck = ['Receive all alerts for this scheme', 'Batch Rejected', 'Batch Quarantined', 'Payment Rejected', 'Payment Dax Rejected', 'Payment Invalid Bank', 'Payment Processing Failed', 'Payment Settlement Unsettled', 'Payment Settlement Unmatched', 'Response Rejected', 'Payment Request Blocked', 'Payment Dax Unavailable', 'Receiver Connection Failed', 'Demographics Processing Failed', 'Demographics Update Failed', 'Event Save Alert', 'Table Create Alert', 'Responses Processing Failed', 'Customer Update Processing Failed', 'Tracking Update Failure']

  cy.document().then(doc => {
    const pageText = doc.body.innerText
    stringsToCheck.forEach(str => {
      const count = (pageText.match(new RegExp(str, 'g')) || []).length
      expect(count, `Occurrences of "${str}"`).to.eq(1)
    })
  })
  console.log('Confirmed that only one set of options is displayed when scheme filter is used')
  cy.log('Confirmed that only one set of options is displayed when scheme filter is used')
})

Then (/^on the Add new alert recipient page I select "(.*)" from Select Scheme dropdown$/, (option) => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I select ' + option + ' from Select Scheme dropdown')

  paymentAlertsPage.addNewSelectSchemeDropdown().select(option)
  console.log('Selected ' + option + ' from Select Scheme dropdown')
  cy.log('Selected ' + option + ' from Select Scheme dropdown')
})

Then (/^on the Add new alert recipient page I enter "(.*)" in the email field$/, (email) => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I enter ' + email + ' in the email field')

  paymentAlertsPage.addNewEmailField().scrollIntoView().type(email)
  console.log('Entered ' + email + ' into the email field')
  cy.log('Entered ' + email + ' into the email field')
})

Then (/^on the Add new alert recipient page I confirm that recipient "(.*)" has been added for each alert type$/, (email) => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I confirm that recipient ' + email + ' has been added for each alert type')

  //This step confirms that recipient has been added for all 19 alert types
  //The element locator is the same for each location aside from the nth-child integer at the beginning
  //Which increases by 2 for each entry

  for (let i=2; i<38; i+=2) {
    cy.get(':nth-child(' + i + ') > .govuk-table__body > .govuk-table__row > :nth-child(1)').should('be.visible').containsWithoutWhitespace( email)
  }
  console.log('confirmed that recipient ' + email + ' has been added for each alert type')
  cy.log('confirmed that recipient ' + email + ' has been added for each alert type')
})

Then('I store the number of payments and total value of payments for the current scheme', () => {

  Cypress.emit('log:step', 'I store the number of payments and total value of payments for the current scheme')

  paymentEventMonitoringPage
    .processedRequestsNumberOf()
    .invoke('text')
    .then(text => text.trim())
    .as('numberOfPayments')

  paymentEventMonitoringPage
    .processedRequestsValue()
    .invoke('text')
    .then(text => text.trim())
    .as('totalValueOfPayments')

})

Then(
  'I confirm that number of payments has increased by {int} and total value of payments has increased by {string}',
  function (paymentIncrease, valueIncrease) {
    Cypress.emit(
      'log:step', `I confirm that number of payments has increased by "${paymentIncrease}" and total value of payments has increased by "${valueIncrease}"`)

    const previousCount = parseInt(this.numberOfPayments)
    const previousValue = parseFloat(
      this.totalValueOfPayments.replace(/[^0-9.-]+/g, '')
    )

    const expectedCount = previousCount + paymentIncrease
    const expectedValue =
      previousValue +
      parseFloat(valueIncrease.replace(/[^0-9.-]+/g, ''))

    const verifyPayments = (attempt = 1) => {
      paymentEventMonitoringPage
        .processedRequestsNumberOf()
        .invoke('text')
        .then(countText => {
          const actualCount = parseInt(countText)

          paymentEventMonitoringPage
            .processedRequestsValue()
            .invoke('text')
            .then(valueText => {
              const actualValue = parseFloat(
                valueText.replace(/[^0-9.-]+/g, '')
              )

              const expectedRounded = parseFloat(expectedValue.toFixed(2))
              const actualRounded = parseFloat(actualValue.toFixed(2))

              if (
                actualCount === expectedCount &&
                actualRounded === expectedRounded
              ) {
                cy.log('Expected payment values found')
                return
              }

              if (attempt >= 20) {
                throw new Error(
                  `Expected count ${expectedCount} and value ${expectedRounded}, but found count ${actualCount} and value ${actualRounded}`
                )
              }

              cy.log(
                `Attempt ${attempt}/20 failed. Refreshing page and retrying...`
              )

              cy.wait(15000)
              cy.reload()

              verifyPayments(attempt + 1)
            })
        })
    }

    verifyPayments()
  }
)