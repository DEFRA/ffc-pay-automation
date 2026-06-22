import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

import paymentManagementPage from '../pages/paymentManagementPage'
import reportsPage from '../pages/reportsPage'
import manualPaymentsPage from '../pages/manualPaymentsPage'
import managementInformationPage from '../pages/managementInformationPage'
import constants from '../../support/constants.json'
import downloadStatementsPage from '../pages/downloadStatementsPage'
import resetPaymentRequestPage from '../pages/resetPaymentRequestPage'
import paymentEventMonitoringPage from '../pages/paymentEventMonitoringPage'
import paymentAlertsPage from '../pages/paymentAlertsPage'
import cookiesPage from '../pages/cookiesPage'
import accessibilityStatementPage from '../pages/accessibilityStatementPage'
import privacyNoticePage from '../pages/privacyNoticePage'

const { getEnvironmentConfig } = require('../../support/configLoader')

const envConfig = getEnvironmentConfig()
const env = envConfig.env
console.log('Environment Config:', envConfig)

When(/^I can see "(.*)" as the header$/, (text) => {
  paymentManagementPage.header().should('be.visible').and('have.text', text)
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
      .and('have.text', constants[text].pageSubHeader)

  } else {

    paymentManagementPage
      .subHeader()
      .should('be.visible')
      .and('have.text', constants[text].pageSubHeader)
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

  Cypress.emit('log:step', 'on the Home Page I confirm that ' + element + ' is displayed')

  switch (element) {

  case 'application header':
    paymentManagementPage.applicationHeader().should('be.visible').and('contain.text', 'Payment management')
    break
  case 'sign out link':
    paymentManagementPage.signOutLink().should('be.visible').and('contain.text', 'Sign out')
    break
  case 'page header':
    paymentManagementPage.pageHeader().should('be.visible').and('contain.text', 'Payment management')
    break
  case 'reports card':
    paymentManagementPage.reportsHeader().should('be.visible').and('contain.text', 'Reports')
    paymentManagementPage.reportsDescription().should('be.visible').and('contain.text', 'Generate and download reports')
    paymentManagementPage.reportsLink().should('be.visible').and('contain.text', 'Reports')
    break
  case 'payment events card':
    paymentManagementPage.paymentEventsHeader().should('be.visible').and('contain.text', 'Payment events')
    paymentManagementPage.paymentEventsDescription().should('be.visible').and('contain.text', 'View payment and events and requests')
    paymentManagementPage.monitoringLink().should('be.visible').and('contain.text', 'Monitoring')
    paymentManagementPage.schemesLink().should('be.visible').and('contain.text', 'Schemes')
    break
  case 'payment holds card':
    paymentManagementPage.paymentHoldsHeader().should('be.visible').and('contain.text', 'Payment holds')
    paymentManagementPage.paymentHoldsDescription().should('be.visible').and('contain.text', 'View, add or remove payment holds')
    paymentManagementPage.manageHoldsLink().should('be.visible').and('contain.text', 'Manage payment holds')
    break
  case 'manual payments card':
    paymentManagementPage.manualPaymentsHeader().should('be.visible').and('contain.text', 'Manual payments')
    paymentManagementPage.manualPaymentsDescription().should('be.visible').and('contain.text', 'Manually upload payment files')
    paymentManagementPage.manualPaymentUploadLink().should('be.visible').and('contain.text', 'Manual payment upload')
    break
  case 'agreement closures card':
    paymentManagementPage.agreementClosuresHeader().should('be.visible').and('contain.text', 'Agreement closures')
    paymentManagementPage.agreementClosuresDescription().should('be.visible').and('contain.text', 'Update, add and remove payment suppressions')
    paymentManagementPage.manageClosuresLink().should('be.visible').and('contain.text', 'Manage closures')
    paymentManagementPage.agreementClosuresLink().should('be.visible').and('contain.text', 'Agreement closure')
    paymentManagementPage.bulkAgreementClosuresLink().should('be.visible').and('contain.text', 'Bulk agreement closure')
    break
  case 'email alerts card':
    paymentManagementPage.emailAlertsHeader().should('be.visible').and('contain.text', 'Email alerts')
    paymentManagementPage.emailAlertsDescription().should('be.visible').and('contain.text', 'Manage where payment alerts are sent by the scheme or recipient')
    paymentManagementPage.alertsLink().should('be.visible').and('contain.text', 'Alerts')
    break
  case 'statements card':
    paymentManagementPage.statementsHeader().should('be.visible').and('contain.text', 'Statements')
    paymentManagementPage.statementsDescription().should('be.visible').and('contain.text', 'Download payment statements and view payment status reports')
    paymentManagementPage.downloadStatementsLink().should('be.visible').and('contain.text', 'Download statements')
    break
  case 'metrics card':
    paymentManagementPage.metricsHeader().should('be.visible').and('contain.text', 'Metrics')
    paymentManagementPage.metricsDescription().should('be.visible').and('contain.text', 'View payment and document metrics by scheme')
    paymentManagementPage.managementInformationLink().should('be.visible').and('contain.text', 'Management information')
    break
  case 'reset payment requests card':
    paymentManagementPage.resetPaymentRequestsHeader().should('be.visible').and('contain.text', 'Reset payment requests')
    paymentManagementPage.resetPaymentRequestsDescription().should('be.visible').and('contain.text', 'Manually reset payment requests')
    paymentManagementPage.resetPaymentRequestsLink().should('be.visible').and('contain.text', 'Reset payment request')
    break
  case 'cookie banner header':
    paymentManagementPage.cookieBannerHeader().should('be.visible').and('contain.text', 'Cookies on Payment management')
    break
  case 'cookie banner content':
    paymentManagementPage.cookieBannerContentOne().should('be.visible').and('contain.text', 'We use some essential cookies to make this service work.')
    paymentManagementPage.cookieBannerContentTwo().should('be.visible').and('contain.text', 'We’d like to set additional cookies so we can remember your settings, understand how people use the service and make improvements.')
    break
  case 'cookie banner accept button':
    paymentManagementPage.cookieBannerAcceptBtn().should('be.visible').and('contain.text', 'Accept analytics cookies')
    break
  case 'cookie banner reject button':
    paymentManagementPage.cookieBannerRejectBtn().should('be.visible').and('contain.text', 'Reject analytics cookies')
    break
  case 'cookie banner view link':
    paymentManagementPage.cookieBannerViewLink().should('be.visible').and('contain.text', 'View cookies')
    break
  case 'cookie banner accepted message':
    paymentManagementPage.cookieBannerAcceptedMessage().should('be.visible').and('contain.text', 'You’ve accepted analytics cookies. You can change your cookie settings at any time.')
    break
  case 'cookie banner accepted hide button':
    paymentManagementPage.cookieBannerAcceptedHideBtn().should('be.visible').and('contain.text', 'Hide this message')
    break
  case 'cookie banner rejected message':
    paymentManagementPage.cookieBannerRejectedMessage().should('be.visible').and('contain.text', 'You’ve rejected analytics cookies. You can change your cookie settings at any time.')
    break
  case 'cookie banner rejected hide button':
    paymentManagementPage.cookieBannerRejectedHideBtn().should('be.visible').and('contain.text', 'Hide this message')
    break
  }

  cy.log('Confirmed that ' + element + ' is displayed')
  console.log('Confirmed that ' + element + ' is displayed')
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

When(/^on the Cookies Page I click the "(.*)" button$/, (button) => {

  Cypress.emit('log:step', 'on the Cookies Page I click the ' + button + ' button')

  let element

  switch (button) {
  case 'accept cookies': element = cookiesPage.acceptAnalyticsYesBtn(); break
  case 'reject cookies': element = cookiesPage.acceptAnalyticsNoBtn(); break
  case 'save cookie settings': element = cookiesPage.saveCookieSettingsBtn(); break
  }

  element.click()
  cy.log('Clicked the ' + button + ' button')
  console.log('Clicked the ' + button + ' button')
})

Then(/^on the Cookies Page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Cookies Page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'page header':
    cookiesPage.pageHeader().should('be.visible').and('contain.text', 'Cookies')
    break
  case 'description':
    cookiesPage.descriptionOne().should('be.visible').and('contain.text', 'Cookies are small files saved on your phone, tablet or computer when you visit a website.')
    cookiesPage.descriptionTwo().should('be.visible').and('contain.text', 'We use cookies to make the Defra Payment management site work and to collect information about how you use our service.')
    break
  case 'essential cookies subheader':
    cookiesPage.essentialCookiesSubheader().should('be.visible').and('contain.text', 'Essential cookies')
    break
  case 'essential cookies description':
    cookiesPage.essentialCookiesDescription().should('be.visible').and('contain.text', 'Essential cookies keep your information secure while you use this service. We do not need to ask permission to use them.')
    break
  case 'essential cookies name':
    cookiesPage.essentialCookiesName().should('be.visible').and('contain.text', 'cookies_policy')
    break
  case 'essential cookies purpose':
    cookiesPage.essentialCookiesPurpose().should('be.visible').and('contain.text', 'Saves your cookie consent settings')
    break
  case 'essential cookies expires':
    cookiesPage.essentialCookiesExpires().should('be.visible').and('contain.text', '1 year')
    break
  case 'analytics cookies subheader':
    cookiesPage.analyticsCookiesSubheader().should('be.visible').and('contain.text', 'Analytics cookies (optional)')
    break
  case 'analytics cookies description':
    cookiesPage.analyticsDescriptionOne().should('be.visible').and('contain.text', 'With your permission, we use Google Analytics to collect data about how you use this service. This information helps us to improve our service.')
    cookiesPage.analyticsDescriptionTwo().should('be.visible').and('contain.text', 'Google is not allowed to use or share our analytics data with anyone.')
    cookiesPage.analyticsDescriptionThree().should('be.visible').and('contain.text', 'Google Analytics stores anonymised information about:')
    break
  case 'analytics cookies bullet points':
    cookiesPage.analyticsBulletPointOne().should('be.visible').and('contain.text', 'how you got to this service')
    cookiesPage.analyticsBulletPointTwo().should('be.visible').and('contain.text', 'the pages you visit on this service and how long you spend on them')
    cookiesPage.analyticsBulletPointThree().should('be.visible').and('contain.text', 'any errors you see while using this service')
    break
  case 'analytics cookies names':
    cookiesPage.analyticsCookiesNameOne().should('be.visible').and('contain.text', '_ga')
    cookiesPage.analyticsCookiesNameTwo().should('be.visible').and('contain.text', '_gid')
    break
  case 'analytics cookies purposes':
    cookiesPage.analyticsCookiesPurposeOne().should('be.visible').and('contain.text', 'Helps us count how many people visit this service by tracking if you have visited before')
    cookiesPage.analyticsCookiesPurposeTwo().should('be.visible').and('contain.text', 'Checks if you’ve visited this before. This helps us count how many people visit our site.')
    break
  case 'analytics cookies expirations':
    cookiesPage.analyticsCookiesExpiresOne().should('be.visible').and('contain.text', '2 years')
    cookiesPage.analyticsCookiesExpiresTwo().should('be.visible').and('contain.text', '24 hours')
    break
  case 'accept analytics cookies subheader':
    cookiesPage.acceptAnalyticsCookiesSubheader().should('be.visible').and('contain.text', 'Do you want to accept analytics cookies?')
    break
  case 'accept analytics cookies description':
    cookiesPage.acceptAnalyticsCookiesDescription().should('be.visible').and('contain.text', 'Do you want to accept cookies that measure website use?')
    break
  case 'accept analytics cookies option buttons':
    cookiesPage.acceptAnalyticsYesBtn().should('be.visible')
    cookiesPage.acceptAnalyticsNoBtn().should('be.visible')
    break
  case 'save cookie settings button':
    cookiesPage.saveCookieSettingsBtn().should('be.visible').and('contain.text', 'Save cookie settings')
    break
  case 'cookie preference banner':
    cookiesPage.cookiePreferencesBannerHeader().should('be.visible').and('contain.text', 'Success')
    cookiesPage.cookiePreferencesBannerDescription().should('be.visible').and('contain.text', 'You’ve set your cookie preferences')
    cookiesPage.backToPageLink().should('be.visible').and('contain.text', 'Go back to the page you were looking at')
  }
  cy.log('Confirmed that ' + element + ' is displayed')
  console.log('Confirmed that ' + element + ' is displayed')
})

Then(/^on the Accessibility Statement Page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Accessibility Statement Page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'page header':
    accessibilityStatementPage.pageHeader().should('be.visible').and('contain.text', 'Accessibility statement')
    break
  case 'description':
    accessibilityStatementPage.descriptionOne().should('be.visible').and('contain.text', 'This service is run by Defra. We want as many people as possible to be able to use this website.', 'For example, that means you should be able to:')
    accessibilityStatementPage.bulletPointOne().should('be.visible').and('contain.text', 'change colours, contrast levels and fonts')
    accessibilityStatementPage.bulletPointTwo().should('be.visible').and('contain.text', 'zoom in up to 200% without the text spilling off the screen')
    accessibilityStatementPage.bulletPointThree().should('be.visible').and('contain.text', 'navigate most of the website using just a keyboard')
    accessibilityStatementPage.bulletPointFour().should('be.visible').and('contain.text', 'navigate most of the website using speech recognition software')
    accessibilityStatementPage.bulletPointFive().should('be.visible').and('contain.text', 'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)')
    accessibilityStatementPage.descriptionTwo().should('be.visible').and('contain.text', 'We have also made the website text as simple as possible to understand.')
    accessibilityStatementPage.descriptionThree().should('be.visible').and('contain.text', 'AbilityNet has advice on making your device easier to use if you have a disability.')
    break
  case 'how accessible this website is':
    accessibilityStatementPage.howAccessibleSubheader().should('be.visible').and('contain.text', 'How accessible this website is')
    accessibilityStatementPage.howAccessibleDescription().should('be.visible').and('contain.text', 'We believe this website is fully accessible. If you find any accessibility issues, please contact us using the details below.')
    break
  case 'feedback and contact info':
    accessibilityStatementPage.feebackSubheader().should('be.visible').and('contain.text', 'Feedback and contact information')
    accessibilityStatementPage.feedbackDescription().should('be.visible').and('contain.text', 'If you find any problems not listed on this page or think we\'re not meeting accessibility requirements, contact us at: contentteam@defra.gov.uk.')
    break
  case 'enforcement procedure':
    accessibilityStatementPage.enforcementProcedureSubheader().should('be.visible').and('contain.text', 'Enforcement procedure')
    accessibilityStatementPage.enforcementProcedureDescription().should('be.visible').and('contain.text', 'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’).', 'If you\'re not happy with how we respond to your complaint, contact the Equality Advisory and Support Service (EASS).')
    break
  case 'technical info':
    accessibilityStatementPage.technicalInformationSubheader().should('be.visible').and('contain.text', 'Technical information about this website’s accessibility')
    accessibilityStatementPage.technicalInformationDescription().should('be.visible').and('contain.text', 'Defra is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.')
    break
  case 'compliance status':
    accessibilityStatementPage.complianceStatusSubheader().should('be.visible').and('contain.text', 'Compliance status')
    accessibilityStatementPage.complianceStatusDescription().should('be.visible').and('contain.text', 'This website is fully compliant with the Web Content Accessibility Guidelines version 2.2 AA standard.')
    break
  case 'improving accessiblity':
    accessibilityStatementPage.improvingAccessibilitySubheader().should('be.visible').and('contain.text', 'What we\'re doing to improve accessibility')
    accessibilityStatementPage.improvingAccessibilityDescription().should('be.visible').and('contain.text', 'We are committed to maintaining accessibility standards. Our ongoing activities include:')
    accessibilityStatementPage.improvingAccessibilityBulletPointOne().should('be.visible').and('contain.text', 'conducting regular accessibility audits')
    accessibilityStatementPage.improvingAccessibilityBulletPointTwo().should('be.visible').and('contain.text', 'training our team on accessibility best practices')
    break
  case 'preparation of statement':
    accessibilityStatementPage.preparationSubheader().should('be.visible').and('contain.text', 'Preparation of this accessibility statement')
    accessibilityStatementPage.preparationDescriptionOne().should('be.visible').and('contain.text', 'This statement was prepared on', 'It was last reviewed on')
    accessibilityStatementPage.preparationDescriptionTwo().should('be.visible').and('contain.text', 'This website was last tested on',  'The test was carried out using automated testing tools against WCAG 2.2 AA criteria.')
    break
  }
  cy.log('Confirmed that ' + element + ' is displayed')
  console.log('Confirmed that ' + element + ' is displayed')
})

Then(/^on the Privacy Notice Page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Privacy Notice Page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'page header':
    privacyNoticePage.pageHeader().should('be.visible').and('contain.text', 'Privacy notice')
    break
  case 'description':
    privacyNoticePage.descriptionOne().should('be.visible').and('contain.text', 'Payment management is provided by Defra.')
    privacyNoticePage.descriptionTwo().should('be.visible').and('contain.text', 'Defra is the data controller for pages starting with ffc-pay-web -', 'for example, the site\'s accessibility statement.')
    privacyNoticePage.descriptionThree().should('be.visible').and('contain.text', 'If you follow a link to a service provided by another government department, agency or local authority, that organisation will:')
    privacyNoticePage.bulletPointOne().should('be.visible').and('contain.text', 'be the data controller')
    privacyNoticePage.bulletPointTwo().should('be.visible').and('contain.text', 'be responsible for processing any data you share with them')
    privacyNoticePage.bulletPointThree().should('be.visible').and('contain.text', 'publish and manage their own privacy notice with details of how to contact them')
    privacyNoticePage.descriptionFour().should('be.visible').and('contain.text', 'A data controller determines how and why personal data is processed.', 'For more information, read the Cabinet Office’s entry in the Data Protection Public Register.')
    break
  case 'what data we collect':
    privacyNoticePage.whatDataSubheader().should('be.visible').and('contain.text', 'What data we collect')
    privacyNoticePage.whatDataDescriptionOne().should('be.visible').and('contain.text', 'The personal data we collect from you includes:')
    privacyNoticePage.whatDataBulletPointOne().should('be.visible').and('contain.text', 'your Internet Protocol (IP) address, and details of which version of web browser you used')
    privacyNoticePage.whatDataBulletPointTwo().should('be.visible').and('contain.text', 'information on how you use the site, using cookies and page tagging techniques')
    privacyNoticePage.whatDataDescriptionTwo().should('be.visible').and('contain.text', 'Where you provide your consent, we use Google Analytics to collect information about how you use GOV.UK.', 'This includes IP addresses.')
    privacyNoticePage.whatDataDescriptionThree().should('be.visible').and('contain.text', 'Google Analytics processes information about:')
    privacyNoticePage.whatDataBulletPointThree().should('be.visible').and('contain.text', 'the pages you visit on GOV.UK')
    privacyNoticePage.whatDataBulletPointFour().should('be.visible').and('contain.text', 'how long you spend on each GOV.UK page')
    privacyNoticePage.whatDataBulletPointFive().should('be.visible').and('contain.text', 'how you got to the site')
    privacyNoticePage.whatDataBulletPointSix().should('be.visible').and('contain.text', 'what you click on while you’re visiting the site')
    privacyNoticePage.whatDataDescriptionFour().should('be.visible').and('contain.text', 'We will not combine analytics information with other data sets in a way that would directly identify who you are.')
    privacyNoticePage.whatDataMoreInfoLink().should('be.visible').and('contain.text', 'Find out more about how we use Google Analytics and other cookies on this service')
    break
  case 'why we need your data':
    privacyNoticePage.whyWeNeedDataSubheader().should('be.visible').and('contain.text', 'Why we need your data')
    privacyNoticePage.whyWeNeedDataDescriptionOne().should('be.visible').and('contain.text', 'We collect your personal data in order to:')
    privacyNoticePage.whyWeNeedDataBulletPointOne().should('be.visible').and('contain.text', 'gather feedback to improve our services')
    privacyNoticePage.whyWeNeedDataBulletPointTwo().should('be.visible').and('contain.text', 'monitor use of the site to identify security threats')
    privacyNoticePage.whyWeNeedDataBulletPointThree().should('be.visible').and('contain.text', 'monitor the performance of the site to identify inefficiencies and JavaScript errors')
    privacyNoticePage.whyWeNeedDataDescriptionTwo().should('be.visible').and('contain.text', 'We use the information we collect through Google Analytics to see how you use the service and to see how well the site performs on your device.')
    privacyNoticePage.whyWeNeedDataDescriptionThree().should('be.visible').and('contain.text', 'We do this to help:')
    privacyNoticePage.whyWeNeedDataBulletPointFour().should('be.visible').and('contain.text', 'make sure the service is meeting the needs of its users')
    privacyNoticePage.whyWeNeedDataBulletPointFive().should('be.visible').and('contain.text', 'make improvements')
    privacyNoticePage.whyWeNeedDataBulletPointSix().should('be.visible').and('contain.text', 'make performance improvements, for example improving page load time and data usage')
    break
  case 'what we do with your data':
    privacyNoticePage.whatWeDoSubheader().should('be.visible').and('contain.text', 'What we do with your data')
    privacyNoticePage.whatWeDoDescriptionOne().should('be.visible').and('contain.text', 'The data we collect with Google Analytics cookies is transferred and stored with Google where we analyse it with Google Analytics software (Universal Analytics).', 'We do not allow Google to use or share this data for their own purposes.')
    privacyNoticePage.whatWeDoDescriptionTwo().should('be.visible').and('contain.text', 'We will not:')
    privacyNoticePage.whatWeDoBulletPointOne().should('be.visible').and('contain.text', 'sell or rent your data to third parties')
    privacyNoticePage.whatWeDoBulletPointTwo().should('be.visible').and('contain.text', 'share your data with third parties for marketing purposes')
    break
  case 'where your data is processed and stored':
    privacyNoticePage.whereDataIsProcessedSubheader().should('be.visible').and('contain.text', 'Where your data is processed and stored')
    privacyNoticePage.whereDataIsProcessedDescription().should('be.visible').and('contain.text', 'All personal data is stored in the European Economic Area (EEA).', 'Data collected by Google Analytics may be transferred outside the EEA for processing.')
    break
  case 'how we protect your data':
    privacyNoticePage.howWeProtectDataSubheader().should('be.visible').and('contain.text', 'How we protect your data and keep it secure')
    privacyNoticePage.howWeProtectDataDescription().should('be.visible').and('contain.text', 'We are committed to doing all that we can to keep your data secure.', 'We have set up systems and processes to prevent unauthorised access or disclosure of your data - ', 'for example, we protect your data using varying levels of encryption.')
    break
  case 'your rights':
    privacyNoticePage.yourRightsSubheader().should('be.visible').and('contain.text', 'Your rights')
    privacyNoticePage.yourRightsDescriptionOne().should('be.visible').and('contain.text', 'You have the right to request:')
    privacyNoticePage.yourRightsBulletPointOne().should('be.visible').and('contain.text', 'information about how your personal data is processed')
    privacyNoticePage.yourRightsBulletPointTwo().should('be.visible').and('contain.text', 'a copy of that personal data')
    privacyNoticePage.yourRightsBulletPointThree().should('be.visible').and('contain.text', 'that anything inaccurate in your personal data is corrected immediately')
    privacyNoticePage.yourRightsDescriptionTwo().should('be.visible').and('contain.text', 'You can also:')
    privacyNoticePage.yourRightsBulletPointFour().should('be.visible').and('contain.text', 'raise an objection about how your personal data is processed')
    privacyNoticePage.yourRightsBulletPointFive().should('be.visible').and('contain.text', 'request that your personal data is erased if there is no longer a justification for it')
    privacyNoticePage.yourRightsBulletPointSix().should('be.visible').and('contain.text', 'ask that the processing of your personal data is restricted in certain circumstances')
    privacyNoticePage.yourRightsDescriptionThree().should('be.visible').and('contain.text', 'If you have any of these requests, get in contact with our Privacy Team.')
    break
  case 'links to other websites':
    privacyNoticePage.otherLinksSubheader().should('be.visible').and('contain.text', 'Links to other websites')
    privacyNoticePage.otherLinksDescriptionOne().should('be.visible').and('contain.text', 'This service contains links to other websites.')
    privacyNoticePage.otherLinksDescriptionTwo().should('be.visible').and('contain.text', 'This privacy notice only applies to Calculate my progressive reductions, and does not cover other government services and transactions that we link to.', 'These services, have their own terms and conditions and privacy policies.')
    privacyNoticePage.followingLinksSubheader().should('be.visible').and('contain.text', 'Following a link to another website')
    privacyNoticePage.followingLinksDescription().should('be.visible').and('contain.text', 'If you go to another website from this one, read the privacy policy on that website to find out what it does with your information.')
    break
  case 'contact us':
    privacyNoticePage.contactInfoSubheader().should('be.visible').and('contain.text', 'Contact us or make a complaint')
    privacyNoticePage.contactInfoDescription().should('be.visible').and('contain.text', 'You can contact our Data Protection Officer (DPO):')
    privacyNoticePage.contactInfoAddress().should('be.visible').and('contain.text', 'DPO', 'DefraGroupDataProtectionOfficer@defra.gov.uk', 'Defra', 'Department for the Environment, Food and Rural Affairs', '2 Marsham Street', 'London', 'SW1P 4DF')
    break
  case 'last updated notice':
    privacyNoticePage.lastUpdatedNotice().should('be.visible').and('contain.text', 'This notice was last updated on')
    break
  }
  cy.log('Confirmed that ' + element + ' is displayed')
  console.log('Confirmed that ' + element + ' is displayed')
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
    .and('contain.text', count)
})

When('I select {string} from the {string} dropdown', (text, dropdown) => {

  Cypress.emit('log:step', 'I select ' + text + ' from the ' + dropdown + ' dropdown')
  if (text === 'COHT Capital') {
    cy.wait(60000)
    cy.log('Wait for all payments to process')
  } else if (text === 'COHT Revenue') {
    cy.wait(60000)
    cy.log('Wait for all payments to process')
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
  } else if (dropdown === 'revenueCapital') {
    reportsPage.revenueCapitalDropdown().scrollIntoView().select(text)
    Cypress.env('formData', { ...Cypress.env('formData'), revenueOrCapital: text })
  } else if (dropdown === 'reportType') {
    reportsPage.reportTypeDropdown().scrollIntoView().select(text)
  } else if (dropdown === 'statusReportScheme') {
    reportsPage.statusReportSchemeDropdown().scrollIntoView().select(text)
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
  cy.get(':nth-child(1) > .govuk-task-list__name-and-hint > .govuk-link')
    .invoke('attr', 'href')
    .then(url => {
      cy.request(url).then(res => {
        expect(res.status).to.eq(200)
        expect(res.headers['content-type']).to.include('text/csv')
      })
    })
})

When(/^the user downloads the status report with text "(.*)"$/, (linkText) => {

  Cypress.emit('log:step', 'the user downloads the status report with text ' + linkText)
  const { paymentManagementUrl } = getEnvironmentConfig()

  cy.contains('a.govuk-task-list__link', linkText)
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
  cy.wait(120000) //Wait for all PRs, returns and PPAs to process
  paymentEventMonitoringPage.selectSchemeDropdown().scrollIntoView().select(scheme)
  cy.log(`Selected ${scheme} from the monitor schemes dropdown`)
  console.log(`Selected ${scheme} from the monitor schemes dropdown`)
})

Then(/^I confirm that payment for "(.*)" scheme with "(.*)" payment installments totalling "(.*)" is displayed$/, (scheme, payments, value) => {

  Cypress.emit('log:step', 'I confirm that payment for ' + scheme + ' scheme with ' + payments + ' payment installments totalling ' + value + ' is displayed')
  cy.wait(2000) // Waiting for data load
  cy.contains(scheme).should('be.visible')
  cy.contains(payments).should('be.visible')
  cy.contains(value).should('be.visible')
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
    manualPaymentsPage.pageTitle().should('be.visible').and('have.text', 'Manual payment upload'); break
  case 'page description':
    manualPaymentsPage.pageDescription().should('be.visible').and('contain.text', 'This section allows teams to upload manual payment files into Payment Hub. Once uploaded, these files will automatically feed into the standard payment process'); break
  case 'choose file button':
    manualPaymentsPage.chooseFileBtn().should('be.visible').and('have.attr', 'type', 'file'); break
  case 'upload button':
    manualPaymentsPage.uploadBtn().should('be.visible').and('have.attr', 'type', 'submit'); break
  case 'manual payments guidance link':
    manualPaymentsPage.manualPaymentsGuidanceLink().should('be.visible').and('contain.text', 'Manual Payments Guidance (PDF)'); break
  case 'file upload confirmation message':
    manualPaymentsPage.statusText().should('be.visible').and('contain.text', 'Your manual payment file has been successfully processed. To make another upload, please click the link below to return to the manual payments page.'); break
  case 'duplicate file error message':
    manualPaymentsPage.errorText().should('be.visible').and('contain.text', 'This file has already been uploaded. The file has not been re-processed. Please ensure you are uploading the correct and most recent file.'); break
  case 'invalid file type error message':
    manualPaymentsPage.typeErrorText().should('be.visible').and('contain.text', 'Invalid file type - We were unable to upload your manual payment file as the uploaded file is not a .CSV file. Only .CSV files are permitted.'); break
  case 'invalid name error message':
    manualPaymentsPage.nameErrorText().should('be.visible').and('contain.text', 'Invalid filename - We were unable to upload your manual payment file. Filenames must start with "FFC_Manual_Batch_". Optionally include a scheme (e.g. "SFI_" or "SFI23_"), then a timestamp in one of these formats: YYYYMMDDHHmm or YYYYMMDDHHmmss. The filename must end with ".csv". Examples: FFC_Manual_Batch_SFI23_202510231609.csv, FFC_Manual_Batch_202510231609.csv.'); break
  case 'invalid file size message':
    manualPaymentsPage.nameErrorText().should('be.visible').and('contain.text', 'File too large - The uploaded file is too large. Please upload a file smaller than 1 MB.'); break
  case 'empty file message':
    manualPaymentsPage.nameErrorText().should('be.visible').and('contain.text', 'We couldn’t process your upload because the file is empty. Please upload a file that contains data.'); break
  case 'return button':
    manualPaymentsPage.returnButton().should('be.visible').and('have.text', 'Return'); break
  case 'error return button':
    manualPaymentsPage.errorReturnButton().should('be.visible').and('have.text', 'Return'); break
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
  manualPaymentsPage.uploadHistoryFilename().should('be.visible').and('contain.text', filename)

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

Then (/^on the Management Information page I confirm that "(.*)" is not displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Management Information page I confirm that ' + element + ' is not displayed')
  switch (element) {
  case 'select year filter dropdown':
    managementInformationPage.selectYearFilterDropdown().should('not.be.visible'); break
  case 'select month filter dropdown':
    managementInformationPage.selectMonthFilterDropdown().should('not.be.visible'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that' + element + ' is not displayed on the Management Information page')
  cy.log('Confirmed that' + element + ' is not displayed on the Management Information page')
})


Then (/^on the Management Information page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Management Information page I confirm that ' + element + ' is displayed')
  switch (element) {
  case 'page title':
    managementInformationPage.pageTitle().should('be.visible').and('have.text', 'Management information'); break
  case 'page description':
    managementInformationPage.pageDescription().should('be.visible').and('contain.text', 'View payment and document metrics filtered by time period.'); break
  case 'help dropdown':
    managementInformationPage.helpDropdown().should('be.visible').and('contain.text', 'Help with this page'); break
  case 'help description':
    managementInformationPage.helpDescription().should('be.visible').and('contain.text', 'This dashboard provides operational metrics for payments and documents.'); break
  case 'show all description':
    managementInformationPage.showAllDescription().should('be.visible').and('have.text', '\n              Show all - View complete dataset with no date filtering (includes year breakdown)'); break
  case 'year to date description':
    managementInformationPage.yearToDateDescription().should('be.visible').and('have.text', '\n              Year to date - View data from 1 January of the current year to today'); break
  case 'by year description':
    managementInformationPage.byYearDescription().should('be.visible').and('have.text', '\n              By year - Select a specific year to view annual data'); break
  case 'by month description':
    managementInformationPage.byMonthDescription().should('be.visible').and('have.text', '\n              By month - Select a specific year and month to view monthly data'); break
  case 'this month description':
    managementInformationPage.thisMonthDescription().should('be.visible').and('have.text', '\n              This month - View data for the current calendar month'); break
  case 'last 7 days description':
    managementInformationPage.last7DaysDescription().should('be.visible').and('have.text', '\n              Last 7 days - View recent weekly activity'); break
  case 'last 24 hours description':
    managementInformationPage.last24HoursDescription().should('be.visible').and('have.text', '\n              Last 24 hours - View real-time daily activity'); break
  case 'payment values description':
    managementInformationPage.paymentValuesDescription().should('be.visible').and('have.text', 'Payment values are displayed in pounds (£)'); break
  case 'print and post description':
    managementInformationPage.printAndPostDescription().should('be.visible').and('have.text', 'Print & Post costs are calculated based on actual postage rates'); break
  case 'time period filter dropdown':
    managementInformationPage.timePeriodFilterDropdown().should('be.visible'); break
  case 'time period filter button':
    managementInformationPage.timePeriodFilterButton().should('be.visible').and('contain.text', 'Apply filters'); break
  case 'payment metrics sub header':
    managementInformationPage.paymentMetricsSubHeader().should('be.visible').and('have.text', 'Payment Metrics'); break
  case 'payments panel':
    managementInformationPage.paymentsPanel().should('be.visible').and('contain.text', 'Payments'); break
  case 'payments count':
    managementInformationPage.paymentsCount().should('be.visible'); break
  case 'total value panel':
    managementInformationPage.totalValuePanel().should('be.visible').and('contain.text', 'Total Value'); break
  case 'total value amount':
    managementInformationPage.totalValueAmount().should('be.visible'); break
  case 'breakdown description':
    managementInformationPage.breakdownDescription().should('be.visible').and('contain.text', 'Breakdown of payments and values by scheme'); break
  case 'payment scheme column':
    managementInformationPage.paymentSchemeColumn().should('be.visible').and('have.text', 'Scheme'); break
  case 'total payments column':
    managementInformationPage.totalPaymentsColumn().should('be.visible').and('have.text', 'Total Payments'); break
  case 'total value column':
    managementInformationPage.totalValueColumn().should('be.visible').and('have.text', 'Total Value (£)'); break
  case 'pending column':
    managementInformationPage.pendingColumn().should('be.visible').and('have.text', 'Pending'); break
  case 'processed column':
    managementInformationPage.processedColumn().should('be.visible').and('have.text', 'Processed'); break
  case 'documents metrics sub header':
    managementInformationPage.documentsMetricsSubHeader().should('be.visible').and('have.text', 'Document Metrics'); break
  case 'documents issued':
    managementInformationPage.documentsIssued().should('be.visible').and('contain.text', 'Documents Issued'); break
  case 'documents count':
    managementInformationPage.documentsCount().should('be.visible'); break
  case 'documents breakdown description':
    managementInformationPage.docBreakdownDescription().should('be.visible').and('contain.text', 'Breakdown of documents by scheme showing delivery methods and costs'); break
  case 'documents scheme column':
    managementInformationPage.docSchemeColumn().should('be.visible').and('have.text', 'Scheme'); break
  case 'year column':
    managementInformationPage.yearColumn().should('be.visible').and('have.text', 'Year'); break
  case 'total documents column':
    managementInformationPage.totalDocumentsColumn().should('be.visible').and('have.text', 'Total Documents'); break
  case 'print and post column':
    managementInformationPage.printAndPostColumn().should('be.visible').and('have.text', 'Print & Post'); break
  case 'print and post cost column':
    managementInformationPage.printAndPostCostColumn().should('be.visible').and('have.text', 'Print & Post Cost (£)'); break
  case 'email column':
    managementInformationPage.emailColumn().should('be.visible').and('have.text', 'Email'); break
  case 'select year filter dropdown':
    managementInformationPage.selectYearFilterDropdown().should('be.visible'); break
  case 'select month filter dropdown':
    managementInformationPage.selectMonthFilterDropdown().should('be.visible'); break
  case 'no payment data message':
    managementInformationPage.noPaymentDataMessage().should('be.visible').and('have.text', 'No payment data available for the selected period.'); break
  case 'no document data message':
    managementInformationPage.noDocumentDataMessage().should('be.visible').and('have.text', 'No document data available for the selected period.'); break
  case 'clear filters':
    managementInformationPage.clearFiltersButton().should('be.visible').and('have.text', 'Clear filters'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that' + element + 'is displayed on the Management Information page')
  cy.log('Confirmed that' + element + 'is displayed on the Management Information page')
})

Then(/^on the Management Information page I select "(.*?)" in (.*?) filter$/, (option, filter) => {

  Cypress.emit('log:step', 'on the Management Information page I select ' + option + ' in ' + filter + ' filter')

  if (filter === 'Time Period') {
    managementInformationPage.timePeriodFilterDropdown().scrollIntoView().select(option)
  } else if (filter === 'Select Year') {
    managementInformationPage.selectYearFilterDropdown().scrollIntoView().select(option)
  } else if (filter === 'Select Month') {
    managementInformationPage.selectMonthFilterDropdown().scrollIntoView().select(option)
  } else {
    throw new Error(`Unknown filter: ${filter}`)
  }

  cy.log(`Selected ${option} option in ${filter} filter`)
  console.log(`Selected ${option} option in ${filter} filter`)
})

When(/^on the Management Information page I click on the "(.*)" button$/, (button) => {

  Cypress.emit('log:step', 'on the Management Information page I click on the ' + button + ' button')

  switch (button) {
  case 'help with this page':
    managementInformationPage.helpDropdown().scrollIntoView().click(); break
  case 'apply filters':
    managementInformationPage.timePeriodFilterButton().scrollIntoView().click(); break
  case 'clear filters':
    managementInformationPage.clearFiltersButton().scrollIntoView().click(); break
  default:
    throw new Error('invalid button name')
  }

  cy.log('Clicked' + button + 'on Management Information page')
  console.log('Clicked' + button + 'on Management Information page')
})

Then(/^on the Management Information page I confirm that (.*) value is (.*)$/, (field, expectedValue) => {

  Cypress.emit('log:step', 'on the Management Information page I confirm that ' + field + ' is ' + expectedValue)

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

Then (/^on the Download Statements page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Download Statements page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'page title':
    downloadStatementsPage.pageTitle().should('be.visible').and('have.text', 'Download statements'); break
  case 'page description':
    downloadStatementsPage.pageDescription().should('be.visible').and('contain.text', 'Search for payment statements. At least one field is required.'); break
  case 'page instructions':
    downloadStatementsPage.pageInstructions().should('be.visible').and('contain.text', 'Search using the full filename if known.'); break
  case 'instruction examples':
    downloadStatementsPage.instructionExamples().should('be.visible').and('contain.text', 'Examples:', 'FFC_PaymentDelinkedStatement_DP_2024_1100021264_2025101508224868.pdf', 'FFC_PaymentSfi23QuarterlyStatement_DP_2024_1100021264_2025101508224868.pdf\n  '); break
  case 'filename field':
    downloadStatementsPage.filenameField().should('be.visible').and('have.attr', 'type', 'text'); break
  case 'individual criteria instructions':
    downloadStatementsPage.individualCriteriaInstructions().should('be.visible').and('contain.text', 'Or search by individual criteria:'); break
  case 'select scheme label':
    downloadStatementsPage.selectSchemeLabel().should('be.visible').and('contain.text', 'Select the scheme to view data for'); break
  case 'select scheme dropdown':
    downloadStatementsPage.selectSchemeDropdown().should('be.visible').and('have.attr', 'class', 'govuk-select'); break
  case 'marketing year label':
    downloadStatementsPage.marketingYearLabel().should('be.visible').and('contain.text', 'Marketing year'); break
  case 'marketing year field':
    downloadStatementsPage.marketingYearField().should('be.visible').and('have.attr', 'type', 'text'); break
  case 'frn label':
    downloadStatementsPage.frnLabel().should('be.visible').and('contain.text', 'Firm reference number (FRN)'); break
  case 'frn search instructions':
    downloadStatementsPage.frnSearchInstructions().should('be.visible').and('contain.text', 'Enter a 10-digit FRN'); break
  case 'frn field':
    downloadStatementsPage.frnField().should('be.visible').and('have.attr', 'type', 'text'); break
  case 'timestamp label':
    downloadStatementsPage.timestampLabel().should('be.visible').and('contain.text', 'Timestamp'); break
  case 'timestamp search instructions':
    downloadStatementsPage.timestampSearchInstructions().should('be.visible').and('contain.text', '16 digits, e.g. 2025101508224868'); break
  case 'timestamp field':
    downloadStatementsPage.timestampField().should('be.visible').and('have.attr', 'type', 'text'); break
  case 'search statements button':
    downloadStatementsPage.searchStatementsButton().should('be.visible').and('have.attr', 'class', 'govuk-button'); break
  case 'clear button':
    downloadStatementsPage.clearButton().should('be.visible').and('have.attr', 'type', 'button'); break
  case 'results sub header':
    downloadStatementsPage.resultsSubHeader().should('be.visible').and('contain.text', 'Results'); break
  case 'number of results':
    downloadStatementsPage.numberOfResults().should('be.visible').and('contain.text', 'Showing items', 'on this page'); break
  case 'scheme column':
    downloadStatementsPage.schemeColumn().should('be.visible').and('contain.text', 'Scheme'); break
  case 'year column':
    downloadStatementsPage.yearColumn().should('be.visible').and('contain.text', 'Year'); break
  case 'frn column':
    downloadStatementsPage.frnColumn().should('be.visible').and('contain.text', 'FRN'); break
  case 'timestamp column':
    downloadStatementsPage.timestampColumn().should('be.visible').and('contain.text', 'Timestamp'); break
  case 'action column':
    downloadStatementsPage.actionColumn().should('be.visible').and('contain.text', 'Action'); break
  case 'next button':
    downloadStatementsPage.nextButton().should('be.visible').and('have.attr', 'class', 'govuk-link govuk-pagination__link'); break
  case 'previous button':
    downloadStatementsPage.previousButton().should('be.visible').and('have.attr', 'class', 'govuk-link govuk-pagination__link'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that' + element + 'is displayed on the Download Statements page')
  cy.log('Confirmed that' + element + 'is displayed on the Download Statements page')
})

Then (/^on the Download Statements page I confirm that "(.*)" is not displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Download Statements page I confirm that ' + element + ' is not displayed')

  switch (element) {
  case 'page title':
    downloadStatementsPage.pageTitle().should('not.exist'); break
  case 'page description':
    downloadStatementsPage.pageDescription().should('not.exist'); break
  case 'page instructions':
    downloadStatementsPage.pageInstructions().should('not.exist'); break
  case 'instruction examples':
    downloadStatementsPage.instructionExamples().should('not.exist'); break
  case 'filename field':
    downloadStatementsPage.filenameField().should('not.exist'); break
  case 'individual criteria instructions':
    downloadStatementsPage.individualCriteriaInstructions().should('not.exist'); break
  case 'select scheme label':
    downloadStatementsPage.selectSchemeLabel().should('not.exist'); break
  case 'select scheme dropdown':
    downloadStatementsPage.selectSchemeDropdown().should('not.exist'); break
  case 'marketing year label':
    downloadStatementsPage.marketingYearLabel().should('not.exist'); break
  case 'marketing year field':
    downloadStatementsPage.marketingYearField().should('not.exist'); break
  case 'frn label':
    downloadStatementsPage.frnLabel().should('not.exist'); break
  case 'frn search instructions':
    downloadStatementsPage.frnSearchInstructions().should('not.exist'); break
  case 'frn field':
    downloadStatementsPage.frnField().should('not.exist'); break
  case 'timestamp label':
    downloadStatementsPage.timestampLabel().should('not.exist'); break
  case 'timestamp search instructions':
    downloadStatementsPage.timestampSearchInstructions().should('not.exist'); break
  case 'timestamp field':
    downloadStatementsPage.timestampField().should('not.exist'); break
  case 'search statements button':
    downloadStatementsPage.searchStatementsButton().should('not.exist'); break
  case 'clear button':
    downloadStatementsPage.clearButton().should('not.exist'); break
  case 'results sub header':
    downloadStatementsPage.resultsSubHeader().should('not.exist'); break
  case 'number of results':
    downloadStatementsPage.numberOfResults().should('not.exist'); break
  case 'scheme column':
    downloadStatementsPage.schemeColumn().should('not.exist'); break
  case 'year column':
    downloadStatementsPage.yearColumn().should('not.exist'); break
  case 'frn column':
    downloadStatementsPage.frnColumn().should('not.exist'); break
  case 'timestamp column':
    downloadStatementsPage.timestampColumn().should('not.exist'); break
  case 'action column':
    downloadStatementsPage.actionColumn().should('not.exist'); break
  case 'next button':
    downloadStatementsPage.nextButton().should('not.exist'); break
  case 'previous button':
    downloadStatementsPage.previousButton().should('not.exist'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that' + element + 'is not displayed on the Download Statements page')
  cy.log('Confirmed that' + element + 'is not displayed on the Download Statements page')
})

Then(/^on the Download Statements page I select "(.*)" from the select scheme dropdown$/, (scheme) => {

  Cypress.emit('log:step', 'on the Download Statements page I select ' + scheme + ' from the select scheme dropdown')
  downloadStatementsPage.selectSchemeDropdown().scrollIntoView().select(scheme)
  cy.log(`Selected ${scheme} from the select scheme dropdown`)
  console.log(`Selected ${scheme} from the select scheme dropdown`)

})

Then(/^on the Download Statements page I click the "(.*)" button$/, (button) => {

  Cypress.emit('log:step', 'on the Download Statements page I click the ' + button + ' button')

  switch (button) {
  case 'search':
    downloadStatementsPage.searchStatementsButton().scrollIntoView().click(); break
  case 'clear':
    downloadStatementsPage.clearButton().scrollIntoView().click(); break
  case 'next':
    downloadStatementsPage.nextButton().scrollIntoView().click(); break
  case 'previous':
    downloadStatementsPage.previousButton().scrollIntoView().click(); break
  default:
    throw new Error('invalid button name')
  }
})

Then(/^on the Download Statements page I confirm that the page number on Results sub header is "(.*)"$/, (expectedValue) => {

  Cypress.emit('log:step', 'on the Download Statements page I confirm that the page number on Results sub header is ' + expectedValue)
  downloadStatementsPage.resultsSubHeader().should('be.visible').invoke('text').then((text) => {

    if (text.includes(`Page ${expectedValue}`)) {
      console.log(`Confirmed that the page number on Results sub header is ${expectedValue}`)
      cy.log(`Confirmed that the page number on Results sub header is ${expectedValue}`)
    } else {
      console.log(`Page number on Results sub header is not ${expectedValue}, actual value is ${text}`)
      cy.log(`Page number on Results sub header is not ${expectedValue}, actual value is ${text}`)
      throw new Error('Incorrect page number')
    }
  })
})

Then(/^on the Download Statements page I enter "(.*)" into the "(.*)" field$/, (filename, field) => {

  Cypress.emit('log:step', 'on the Download Statements page I enter ' + filename + ' into the ' + field + ' field')

  switch (field) {
  case 'filename':
    downloadStatementsPage.filenameField().scrollIntoView().type(filename); break
  case 'marketing year':
    downloadStatementsPage.marketingYearField().scrollIntoView().type(filename); break
  case 'frn':
    downloadStatementsPage.frnField().scrollIntoView().type(filename); break
  case 'timestamp':
    downloadStatementsPage.timestampField().scrollIntoView().type(filename); break
  default:
    throw new Error('invalid field name')
  }

  console.log(`Entered ${filename} into the ${field} field on the Download Statements page`)
  cy.log(`Entered ${filename} into the ${field} field on the Download Statements page`)
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

Then (/^on the Reset payment request page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the Reset payment request page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'page title':
    resetPaymentRequestPage.pageTitle().should('be.visible').and('have.text', 'Reset payment request'); break
  case 'page description':
    resetPaymentRequestPage.pageDescription().should('be.visible').and('contain.text', 'Invoice number'); break
  case 'page instructions':
    resetPaymentRequestPage.pageInstructions().should('be.visible').and('contain.text', 'Enter the DAX formatted invoice number, for example S1234567S1234567V001'); break
  case 'invoice number field':
    resetPaymentRequestPage.invoiceNumberField().should('be.visible').and('have.attr', 'type', 'text'); break
  case 'reset button':
    resetPaymentRequestPage.resetButton().should('be.visible').and('have.attr', 'type', 'submit'); break
  case 'payment request does not exist error':
    resetPaymentRequestPage.errorTitle().should('be.visible').and('contain.text', 'There is a problem')
    resetPaymentRequestPage.errorMessage().should('be.visible').and('contain.text', 'Payment request', 'does not exist'); break
  case 'enter a valid invoice number error':
    resetPaymentRequestPage.errorTitle().should('be.visible').and('contain.text', 'There is a problem')
    resetPaymentRequestPage.errorMessage().should('be.visible').and('contain.text', 'ValidationError: Enter a valid invoice number'); break
  case 'payment request successfully reset message':
    resetPaymentRequestPage.successTitle().should('be.visible').and('contain.text', 'Payment request successfully reset')
    resetPaymentRequestPage.successMessage().should('be.visible').and('contain.text', 'Invoice number'); break
  case 'what happens next subheader':
    resetPaymentRequestPage.whatHappensNextSubheader().should('be.visible').and('contain.text', 'What happens next'); break
  case 'what happens next message':
    resetPaymentRequestPage.whatHappensNextMessage().should('be.visible').and('contain.text', 'The payment request will be reprocessed and resent to D365.'); break
  case 'perform another action link':
    resetPaymentRequestPage.performAnotherActionLink().should('be.visible').and('contain.text', 'Perform another action'); break
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
  case 'perform another action link': resetPaymentRequestPage.performAnotherActionLink().scrollIntoView().click(); break
  default:
    throw new Error('invalid button name')
  }
  cy.log(`Clicked on the ${button} successfully`)
  console.log(`Clicked on the ${button} successfully`)
})

Then(/^I confirm that second completedPaymentRequest entry has been made in database for invoice number "(.*)"$/, (invoiceNumber) => {

  Cypress.emit('log:step', 'I confirm that second completedPaymentRequest entry has been made in database for invoice number ' + invoiceNumber)

  if (invoiceNumber.includes('Current')) {
    invoiceNumber = 'S2795919' + Cypress.env('nextContractNumber').toString() + 'V001'

  }
  const sqlStatement = `SELECT * FROM "completedPaymentRequests" WHERE "invoiceNumber" = '${invoiceNumber}'`
  const databaseName = 'ffc-pay-processing'

  cy.task('databaseQuery', { env, databaseName, sqlStatement })
    .then((result) => {
      const data = result.rows
      cy.log(`Found ${data.length} completedPaymentRequest entries for invoice number ${invoiceNumber}`)
      if (data.length >= 2) {
        console.log(`Confirmed that second completedPaymentRequest entry has been made in database for invoice number ${invoiceNumber}`)
        cy.log(`Confirmed that second completedPaymentRequest entry has been made in database for invoice number ${invoiceNumber}`)
      } else {
        console.log(`Expected at least 2 completedPaymentRequest entries for invoice number ${invoiceNumber}, but found ${data.length}`)
        cy.log(`Expected at least 2 completedPaymentRequest entries for invoice number ${invoiceNumber}, but found ${data.length}`)
        throw new Error('Second completedPaymentRequest entry has not been made in database')
      }
    })
})

Then (/^on the View events page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the View events page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'sub header':
    paymentEventMonitoringPage.subHeader().should('be.visible').and('contain.text', 'Monitoring'); break
  case 'frn search instructions':
    paymentEventMonitoringPage.searchByFRNInstructions().should('be.visible').and('contain.text', 'Search for payments by Firm Reference Number (FRN)'); break
  case 'frn search example':
    paymentEventMonitoringPage.searchByFRNExample().should('be.visible').and('contain.text', 'For example, 1234567890'); break
  case 'frn search field':
    paymentEventMonitoringPage.searchByFRNField().should('be.visible').and('have.attr', 'type', 'search'); break
  case 'frn search button':
    paymentEventMonitoringPage.searchByFRNButton().should('be.visible').and('have.attr', 'type', 'submit'); break
  case 'batch search instructions':
    paymentEventMonitoringPage.searchByBatchInstructions().should('be.visible').and('contain.text', 'Search for payments by payment batch name'); break
  case 'batch search example':
    paymentEventMonitoringPage.searchByBatchExample().should('be.visible').and('contain.text', 'For example, SITISFI0001_AP_20230525095030.dat'); break
  case 'batch search field':
    paymentEventMonitoringPage.searchByBatchField().should('be.visible').and('have.attr', 'type', 'search'); break
  case 'batch search button':
    paymentEventMonitoringPage.searchByBatchButton().should('be.visible').and('have.attr', 'type', 'submit'); break
  case 'frn searched label':
    paymentEventMonitoringPage.frnSearchedLabel().should('be.visible').and('contain.text', '1258445148'); break
  case 'scheme column':
    paymentEventMonitoringPage.schemeColumn().should('be.visible').and('contain.text', 'Scheme'); break
  case 'agreement column':
    paymentEventMonitoringPage.agreementColumn().should('be.visible').and('contain.text', 'Agreement'); break
  case 'payment request column':
    paymentEventMonitoringPage.paymentRequestColumn().should('be.visible').and('contain.text', 'Payment request'); break
  case 'value column':
    paymentEventMonitoringPage.valueColumn().should('be.visible').and('contain.text', 'Value'); break
  case 'status column':
    paymentEventMonitoringPage.statusColumn().should('be.visible').and('contain.text', 'Status'); break
  case 'last updated column':
    paymentEventMonitoringPage.lastUpdatedColumn().should('be.visible').and('contain.text', 'Last updated'); break
  case 'actions column':
    paymentEventMonitoringPage.actionsColumn().should('be.visible').and('contain.text', 'Actions'); break
  case 'view frn label':
    paymentEventMonitoringPage.frnSearchedLabel().should('be.visible').and('contain.text', '1258445148 - 40770826 - PR1'); break
  case 'view batch label':
    paymentEventMonitoringPage.frnSearchedLabel().should('be.visible').and('contain.text', 'SITISFIA0001_AP_20230810085609205.dat'); break
  case 'activity column':
    paymentEventMonitoringPage.activityColumn().should('be.visible').and('contain.text', 'Actions'); break
  case 'batch frn column':
    paymentEventMonitoringPage.batchFRNColumn().should('be.visible').and('contain.text', 'FRN'); break
  case 'batch year column':
    paymentEventMonitoringPage.batchYearColumn().should('be.visible').and('contain.text', 'Year'); break
  case 'batch agreement column':
    paymentEventMonitoringPage.batchAgreementColumn().should('be.visible').and('contain.text', 'Agreement'); break
  case 'batch request column':
    paymentEventMonitoringPage.batchRequestColumn().should('be.visible').and('contain.text', 'Request'); break
  case 'batch value column':
    paymentEventMonitoringPage.batchValueColumn().should('be.visible').and('contain.text', 'Value'); break
  case 'batch status column':
    paymentEventMonitoringPage.batchStatusColumn().should('be.visible').and('contain.text', 'Status'); break
  case 'batch actions column':
    paymentEventMonitoringPage.batchActionsColumn().should('be.visible').and('contain.text', 'Actions'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that' + element + 'is displayed on the View events page')
  cy.log('Confirmed that' + element + 'is displayed on the View events page')
})

Then (/^on the View processed payment requests page I confirm that "(.*)" is displayed$/, (element) => {

  Cypress.emit('log:step', 'on the View processed payment requests page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'sub header':
    paymentEventMonitoringPage.subHeader().should('be.visible').and('contain.text', 'Monitoring by scheme'); break
  case 'select scheme label':
    paymentEventMonitoringPage.selectSchemeLabel().should('be.visible').and('contain.text', 'Select the scheme to view data for'); break
  case 'select scheme dropdown':
    paymentEventMonitoringPage.selectSchemeDropdown().should('be.visible').and('have.attr', 'class', 'govuk-select'); break
  case 'select scheme button':
    paymentEventMonitoringPage.selectSchemeButton().should('be.visible').and('have.attr', 'type', 'submit'); break
  case 'processed payment requests label':
    paymentEventMonitoringPage.processedRequestLabel().should('be.visible').and('contain.text', 'Processed payment requests'); break
  case 'scheme column':
    paymentEventMonitoringPage.processedRequestsSchemeColumn().should('be.visible').and('contain.text', 'Scheme'); break
  case 'number of payments column':
    paymentEventMonitoringPage.processedRequestsNumberOfColumn().should('be.visible').and('contain.text', 'Number of payments'); break
  case 'value column':
    paymentEventMonitoringPage.processedRequestsValueColumn().should('be.visible').and('contain.text', 'Value'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that'+ element + ' is displayed on the View processed payment requests page')
  cy.log('Confirmed that' + element + ' is displayed on the View processed payment requests page')
})

Then (/^on the View processed payment requests page I click the Continue button$/, () => {

  Cypress.emit('log:step', 'on the View processed payment requests page I click the Continue button')
  paymentEventMonitoringPage.selectSchemeButton().click()
  console.log('Clicked Continue button')
  cy.log('Clicked Continue button')
})

Then (/^on the View processed payment requests page I select "(.*)" in scheme dropdown$/, (selection) => {

  Cypress.emit('log:step', 'on the View processed payment requests page I select ' + selection + ' in scheme dropdown')
  paymentEventMonitoringPage.selectSchemeDropdown().select(selection)
  console.log('Selected ' + selection + ' in Scheme dropdown')
  cy.log('Selected ' + selection + ' in Scheme dropdown')
})

Then (/^on the View events page I enter "(.*)" into the "(.*)" field$/, (filename, field) => {

  Cypress.emit('log:step', 'on the View events page I enter ' + filename + ' into the ' + field + ' field')

  switch (field) {
  case 'frn':
    paymentEventMonitoringPage.searchByFRNField().scrollIntoView().type(filename); break
  case 'batch':
    paymentEventMonitoringPage.searchByBatchField().scrollIntoView().type(filename); break
  default:
    throw new Error('invalid field name')
  }

  console.log(`Entered ${filename} into the ${field} field on the View events page`)
  cy.log(`Entered ${filename} into the ${field} field on the View events page`)
})

Then (/^on the View events page I click the "(.*)"$/, (button) => {

  Cypress.emit('log:step', 'on the View events page I click the ' + button)

  switch (button) {
  case 'frn search button': paymentEventMonitoringPage.searchByFRNButton().scrollIntoView().click(); break
  case 'batch search button': paymentEventMonitoringPage.searchByBatchButton().scrollIntoView().click(); break
  case 'view link': cy.get(':nth-child(7) > a').then(($elements) => {
    if ($elements.length > 0) {
      $elements[0].click() // Native JS click on the first element
    } else {
      throw new Error('No elements found for selector - nth-child(7) > a')
    }
  })
    break
  }
  cy.log(`Clicked on the ${button} successfully`)
  console.log(`Clicked on the ${button} successfully`)
})

Then (/^on the View events page I confirm that rows are ordered correctly by payment request$/, () => {

  Cypress.emit('log:step', 'on the View events page I confirm that rows are ordered correctly by payment request')

  paymentEventMonitoringPage.firstPaymentRequestNumber().should('be.visible').and('contain.text', '1')
  paymentEventMonitoringPage.secondPaymentRequestNumber().should('be.visible').and('contain.text', '2')

  console.log('Confirmed that rows are ordered correctly by payment request')
  cy.log('Confirmed that rows are ordered correctly by payment request')
})

Then (/^on the View events page I confirm that "(.*)" of entry number "(.*)" in table is "(.*)"$/, (columnName, rowNumber, expectedValue) => {

  Cypress.emit('log:step', 'on the View events page I confirm that ' + columnName + ' of entry number ' + rowNumber + ' in table is ' + expectedValue)

  let element

  const today = new Date()

  let day = today.getDate()
  let month = today.getMonth() + 1
  let year = today.getFullYear()

  day = String(day).padStart(2, '0')
  month = String(month).padStart(2, '0')

  const formattedDate = `${day}/${month}/${year}`

  console.log(formattedDate)
  cy.log(formattedDate)

  switch (columnName) {
  case 'scheme': element = cy.get('.govuk-table__body > :nth-child(' + rowNumber + ') > :nth-child(1)'); break
  case 'agreement': element = cy.get('.govuk-table__body > :nth-child(' + rowNumber + ') > :nth-child(2)'); break
  case 'payment request': element = cy.get('.govuk-table__body > :nth-child(' + rowNumber + ') > :nth-child(3)'); break
  case 'value': element = cy.get('.govuk-table__body > :nth-child(' + rowNumber + ') > :nth-child(4)'); break
  case 'status': element = cy.get('.govuk-table__body > :nth-child(' + rowNumber + ') > :nth-child(5)'); break
  case 'last updated': element = cy.get('.govuk-table__body > :nth-child(' + rowNumber + ') > :nth-child(6)')

    console.log(formattedDate)
    cy.log(formattedDate)
    expectedValue = formattedDate
    break

  default:
    throw new Error('invalid element')
  }
  element.should('be.visible').and('contain.text', expectedValue)

  console.log('Confirmed value of table entry ' + rowNumber + ' is ' + expectedValue)
  cy.log('Confirmed value of table entry ' + rowNumber + ' is ' + expectedValue)
})

Then (/^on the Alerts page I confirm that "(.*)" is displayed$/, (element) => {

  // The order of elements on the Alerts page is different for local and dev environments, as a result
  // dev version of this script has page elements adjusted to account for this

  Cypress.emit('log:step', 'on the Alerts page I confirm that ' + element + ' is displayed')

  switch (element) {
  case 'sub header': paymentAlertsPage.subHeader().should('be.visible').and('contain.text', 'Manage alerts'); break
  case 'page description': paymentAlertsPage.pageDescription().should('be.visible').and('contain.text',
    'This section allows users to see payment alerts that are in place for each scheme and',
    'manage who is set up to receive each type of alert. If a payment is rejected, alerts are',
    'used to notify people so that the error preventing payment can be resolved. Some',
    'users are alerted for information, but some will be required to resolve the payment issue')
    break
  case 'find out more': paymentAlertsPage.findOutMore().should('be.visible').and('contain.text',
    'Find out more about each alert type by visiting our alerts information page, or by clicking on any of the alert type names below.')
    break
  case 'alerts information link': paymentAlertsPage.alertsInformationLink().should('be.visible').and('have.attr', 'class', 'govuk-link'); break
  case 'add new recipient button': paymentAlertsPage.addNewRecipientButton().should('be.visible').and('have.attr', 'class', 'govuk-button'); break
  case 'show all sections button': paymentAlertsPage.showAllSectionsButton().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'sfi22 label': paymentAlertsPage.sfi22Label().should('be.visible').and('contain.text', 'SFI-22'); break
  case 'sfi22 show button': paymentAlertsPage.sfi22Show().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'sfi pilot label': paymentAlertsPage.sfiPilotLabel().should('be.visible').and('contain.text', 'SFI-Pilot'); break
  case 'sfi pilot show button': paymentAlertsPage.sfiPilotShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'lump sums label': paymentAlertsPage.lumpSumsLabel().should('be.visible').and('contain.text', 'Lump Sum Payments'); break
  case 'lump sums show button': paymentAlertsPage.lumpSumsShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'vet visits label': paymentAlertsPage.vetVisitsLabel().should('be.visible').and('contain.text', 'Vet Visits'); break
  case 'vet visits show button': paymentAlertsPage.vetVisitsShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'countryside stewardship label': paymentAlertsPage.countrysideStewardshipLabel().should('be.visible').and('contain.text', 'Countryside Stewardship'); break
  case 'countryside stewardship show button': paymentAlertsPage.countrysideStewardshipShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'basic payment scheme label': paymentAlertsPage.basicPaymentSchemeLabel().should('be.visible').and('contain.text', 'Basic Payment Scheme'); break
  case 'basic payment scheme show button': paymentAlertsPage.basicPaymentSchemeShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'manual injection label':
    if (env.includes('local')) {
      paymentAlertsPage.manualInjectionLabel().should('be.visible').and('contain.text', 'Manual Injection')
    } else if (env.includes('dev')) {
      paymentAlertsPage.expandedSFIOfferLabel().should('be.visible').and('contain.text', 'Manual Injection')
    }
    break
  case 'manual injection show button':
    paymentAlertsPage.manualInjectionShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'environmental stewardship label':
    if (env.includes('local')) {
      paymentAlertsPage.environmentalStewardshipLabel().should('be.visible').and('contain.text', 'Environmental Stewardship')
    } else if (env.includes('dev')) {
      paymentAlertsPage.manualInjectionLabel().should('be.visible').and('contain.text', 'Environmental Stewardship')
    }
    break
  case 'environmental stewardship show button': paymentAlertsPage.environmentalStewardshipShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'imps label':
    if (env.includes('local')) {
      paymentAlertsPage.impsLabel().should('be.visible').and('contain.text', 'IMPS')
    } else if (env.includes('dev')) {
      paymentAlertsPage.environmentalStewardshipLabel().should('be.visible').and('contain.text', 'IMPS')
    }
    break
  case 'imps show button': paymentAlertsPage.impsShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'forestry commission label':
    if (env.includes('local')) {
      paymentAlertsPage.forestryCommissionLabel().should('be.visible').and('contain.text', 'Forestry Commission')
    } else if (env.includes('dev')) {
      paymentAlertsPage.impsLabel().should('be.visible').and('contain.text', 'Forestry Commission')
    }
    break
  case 'forestry commission show button': paymentAlertsPage.forestryCommissionShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'sfi23 label':
    if (env.includes('local')) {
      paymentAlertsPage.sfi23Label().should('be.visible').and('contain.text', 'SFI-23')
    } else if (env.includes('dev')) {
      paymentAlertsPage.forestryCommissionLabel().should('be.visible').and('contain.text', 'SFI-23')
    }
    break
  case 'sfi23 show button': paymentAlertsPage.sfi23Show().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'delinked payments label':
    if (env.includes('local')) {
      paymentAlertsPage.delinkedPaymentsLabel().should('be.visible').and('contain.text', 'Delinked Payments')
    } else if (env.includes('dev')) {
      paymentAlertsPage.sfi23Label().should('be.visible').and('contain.text', 'Delinked Payments')
    }
    break
  case 'delinked payments show button': paymentAlertsPage.delinkedPaymentsShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'expanded sfi label':
    if (env.includes('local')) {
      paymentAlertsPage.expandedSFIOfferLabel().should('be.visible').and('contain.text', 'Expanded SFI Offer')
    } else if (env.includes('dev')) {
      paymentAlertsPage.delinkedPaymentsLabel().should('be.visible').and('contain.text', 'Expanded SFI Offer')
    }
    break
  case 'expanded sfi show button': paymentAlertsPage.expandedSFIOfferShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'csht revenue label': paymentAlertsPage.cshtRevenueLabel().should('be.visible').and('contain.text', 'Countryside Stewardship Higher Tier (Revenue)'); break
  case 'csht revenue show button': paymentAlertsPage.cshtRevenueShow().should('be.visible').and('have.attr', 'class', 'govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down'); break
  case 'csht capital label': paymentAlertsPage.cshtCapitalLabel().should('be.visible').and('contain.text', 'Countryside Stewardship Higher Tier (Capital)'); break
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
  case 'sub header': paymentAlertsPage.addNewSubHeader().should('be.visible').and('contain.text', 'Add new alert recipient'); break
  case 'email label': paymentAlertsPage.addNewEmailLabel().should('be.visible').and('contain.text', 'Email address'); break
  case 'email field': paymentAlertsPage.addNewEmailField().should('be.visible').and('have.attr', 'type', 'text'); break
  case 'select scheme label':paymentAlertsPage.addNewSelectSchemeLabel().should('be.visible').and('contain.text', 'Select a scheme to view alerts for'); break
  case 'select scheme dropdown': paymentAlertsPage.addNewSelectSchemeDropdown().should('be.visible').and('have.attr', 'class', 'govuk-select'); break
  case 'invalid email error message': paymentAlertsPage.addNewInvalidEmailError().should('be.visible').and('contain.text', 'The email address is not allowed. Please contact the Payment & Document Services team if you believe this is a mistake.'); break
  default:
    throw new Error('invalid element')
  }
  console.log('Confirmed that '+ element + ' is displayed on the Add new alert recipient page')
  cy.log('Confirmed that ' + element + ' is displayed on the Add new alert recipient page')
})

Then(/^on the Add new alert recipient page I confirm that all options are present when no filter selected$/, () => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I confirm that all options are present when no filter selected')

  const stringsToCheck = [
    'Receive all alerts for this scheme',
    'Batch Rejected',
    'Batch Quarantined',
    'Payment Rejected',
    'Payment Dax Rejected',
    'Payment Invalid Bank',
    'Payment Processing Failed',
    'Payment Settlement Unsettled',
    'Payment Settlement Unmatched',
    'Response Rejected',
    'Payment Request Blocked',
    'Payment Dax Unavailable',
    'Receiver Connection Failed',
    'Demographics Processing Failed',
    'Demographics Update Failed',
    'Event Save Alert',
    'Table Create Alert',
    'Responses Processing Failed',
    'Customer Update Processing Failed',
    'Tracking Update Failure'
  ]

  cy.document().then(doc => {
    const pageText = doc.body.innerText
    stringsToCheck.forEach(str => {
      const count = (pageText.match(new RegExp(str, 'g')) || []).length
      expect(count, `Occurrences of "${str}"`).to.eq(16)
    })
  })
  console.log('Confirmed that all options are present when no filter selected')
  cy.log('Confirmed that all options are present when no filter selected')
})

Then(/^on the Add new alert recipient page I confirm that only one set of options is displayed$/, () => {

  Cypress.emit('log:step', 'on the Add new alert recipient page I confirm that only one set of options is displayed')

  const stringsToCheck = [
    'Receive all alerts for this scheme',
    'Batch Rejected',
    'Batch Quarantined',
    'Payment Rejected',
    'Payment Dax Rejected',
    'Payment Invalid Bank',
    'Payment Processing Failed',
    'Payment Settlement Unsettled',
    'Payment Settlement Unmatched',
    'Response Rejected',
    'Payment Request Blocked',
    'Payment Dax Unavailable',
    'Receiver Connection Failed',
    'Demographics Processing Failed',
    'Demographics Update Failed',
    'Event Save Alert',
    'Table Create Alert',
    'Responses Processing Failed',
    'Customer Update Processing Failed',
    'Tracking Update Failure'
  ]

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
    cy.get(':nth-child(' + i + ') > .govuk-table__body > .govuk-table__row > :nth-child(1)').should('be.visible').and('contain.text', email)
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

Then('I confirm that number of payments has increased by {int} and total value of payments has increased by {string}',
  function (paymentIncrease, valueIncrease) {

    Cypress.emit('log:step', `I confirm that number of payments has increased by "${paymentIncrease}" and total value of payments has increased by "${valueIncrease}"`)

    const previousCount = parseInt(this.numberOfPayments)
    const previousValue = parseFloat(this.totalValueOfPayments.replace(/[^0-9.-]+/g, ''))

    const expectedCount = previousCount + paymentIncrease
    const expectedValue = previousValue + parseFloat(valueIncrease.replace(/[^0-9.-]+/g, ''))

    paymentEventMonitoringPage
      .processedRequestsNumberOf()
      .invoke('text')
      .then(text => {
        expect(parseInt(text)).to.eq(expectedCount)
      })

    paymentEventMonitoringPage
      .processedRequestsValue()
      .invoke('text')
      .then(text => {
        const numeric = parseFloat(text.replace(/[^0-9.-]+/g, '')).toFixed(2)
        expect(Number(numeric)).to.eq(parseFloat(Number(expectedValue).toFixed(2)))
      })
  })