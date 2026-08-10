import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import privacyNoticePage from '../pages/privacyNoticePage'



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