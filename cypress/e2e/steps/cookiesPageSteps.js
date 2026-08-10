import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import cookiesPage from '../pages/cookiesPage'


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