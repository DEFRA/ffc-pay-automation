Feature: 01 Payment management

# npm run cypress:test:one -- "cypress\e2e\features\01_PaymentManagement.feature"
# npm run cypress:dev:one -- "cypress\e2e\features\01_PaymentManagement.feature"
# npm run cypress:local:one -- "cypress\e2e\features\01_PaymentManagement.feature"

  Background: Navigate to Payment management homepage
    Given I visit the "Payment management" homepage

  @test @dev @local
  Scenario Outline: 01 Verify <link> links work correctly

  #This scenario confirms that the links for all of Pay Management's sections are functioning correctly

    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage
    Then I take a screenshot for "<link>"

    Examples:
      | link                                     | subPage                           |
      | Download reports                         | download-report-list              |
      | Generate payment request statuses report | generate-payment-request-statuses |
      | AP/AR listing report                     | generate-ap-ar-listing-report     |
      | View payment events                      | monitoring                        |
      | View payment events by scheme            | monitoring/schemes                |
      | Manage payment holds                     | payment-holds                     |
      | Upload manual payments                   | manual-payments                   |
      | Manage agreement closures                | closure                           |
      | Manage email alerts                      | alerts                            |
      | Download payment statements              | download-statements               |
      | Download statement status report         | status-report                     |
      | View metrics dashboard                   | metrics                           |
      | Reset payment request                    | payment-request/reset             |
     
  
  @test @dev @local
  Scenario Outline: 02 Confirm content on home page

    Then on the Home Page I confirm that "application header" is displayed
    Then on the Home Page I confirm that "sign out link" is displayed
    Then on the Home Page I confirm that "page header" is displayed
    Then on the Home Page I confirm that "reports card" is displayed
    Then on the Home Page I confirm that "payment events card" is displayed
    Then on the Home Page I confirm that "payment holds card" is displayed
    Then on the Home Page I confirm that "manual payments card" is displayed
    Then on the Home Page I confirm that "agreement closures card" is displayed
    Then on the Home Page I confirm that "email alerts card" is displayed
    Then on the Home Page I confirm that "statements card" is displayed
    Then on the Home Page I confirm that "metrics card" is displayed
    Then on the Home Page I confirm that "reset payment requests card" is displayed
    Then I take a screenshot

  @test @dev
  Scenario Outline: 03 Confirm cookie banner displays correctly on page load

  #This scenario confirms the the cookie preferences banner displays correctly when Pay Management loads

    Then I should see the cookie banner heading "Cookies on Payment management"
    And I should see the cookie banner content "We use some essential cookies to make this service work."
    And I should see the cookie banner content "We’d like to set additional cookies so we can remember your settings, understand how people use the service and make improvements."
    And I should see the cookie banner button "Accept analytics cookies"
    And I should see the cookie banner button "Reject analytics cookies"
    And I should see the cookie banner link "View cookies"

    Then I take a screenshot

  @test @dev
  Scenario Outline: 04 Confirm accept cookies functions correctly

  #This scenario confirms that cookies can be accepted successfully from cookie preferences banner
    
    When I click on the "Accept analytics cookies" button
    Then I should see the cookie banner message "You’ve accepted analytics cookies. You can change your cookie settings at any time."
    And I should see the cookie banner button "Hide this message"
    Then I take a screenshot

    When I click on the "Hide" button



    And I should not see the cookie banner heading "Cookies on Payment management"
    And I should not see the cookie banner button "Accept analytics cookies"
    And I should not see the cookie banner button "Reject analytics cookies"
    And I should not see the cookie banner link "View cookies"

  @test @dev
  Scenario Outline: 05 Confirm reject cookies functions correctly

  #This scenario confirms that cookies can be rejected successfully from cookie preferences banner

    When I click on the "Reject analytics cookies" button

    Then I should see the cookie banner message "You’ve rejected analytics cookies. You can change your cookie settings at any time."
    And I should see the cookie banner button "Hide this message"

    And I should not see the cookie banner heading "Cookies on Payment management"
    And I should not see the cookie banner button "Accept analytics cookies"
    And I should not see the cookie banner button "Reject analytics cookies"
    And I should not see the cookie banner link "View cookies"


    Then I take a screenshot

    When I click on the "Hide" button

    Then I should not see the cookie banner message "You’ve accepted analytics cookies. You can change your cookie settings at any time."
    And I should not see the cookie banner button "Hide this message"

  @test @dev
  Scenario Outline: 06 Confirm content on cookies page

  #This scenario confirms that content on the Cookies Page is displayed correctly and that cookie preferences can
  #be set from here

    When I click on the "View cookies" link

    Then I should see the heading "Cookies"

    And I should see the paragraph "Cookies are small files saved on your phone, tablet or computer when you visit a website."
    And I should see the paragraph "We use cookies to make the Defra Payment management site work and to collect information about how you use our service."

    And I should see the heading "Essential cookies"

    And I should see the paragraph "Essential cookies keep your information secure while you use this service. We do not need to ask permission to use them."

    And I should see the table cell "cookies_policy"
    And I should see the table cell "Saves your cookie consent settings"
    And I should see the table cell "1 year"

    And I should see the heading "Analytics cookies (optional)"

    And I should see the paragraph "With your permission, we use Google Analytics to collect data about how you use this service. This information helps us to improve our service."
    And I should see the paragraph "Google is not allowed to use or share our analytics data with anyone."
    And I should see the paragraph "Google Analytics stores anonymised information about:"

    And I should see the list item "how you got to this service"
    And I should see the list item "the pages you visit on this service and how long you spend on them"
    And I should see the list item "any errors you see while using this service"
    And I should see the table cell "_ga"
    And I should see the table cell "_gid"
    And I should see the table cell "Helps us count how many people visit this service by tracking if you have visited before"
    And I should see the table cell "Checks if you’ve visited this before. This helps us count how many people visit our site."
    And I should see the table cell "2 years"
    And I should see the table cell "24 hours"

    And I should see the heading "Do you want to accept analytics cookies?"
    And I should see the verify text "Do you want to accept cookies that measure website use?"
    And I should see the label "Yes"
    And I should see the label "No"
    And I should see the button "Save cookie settings"


    And I click on the "Save cookie settings" button
 
    And I should see the verify text "Success"
    And I should see the verify text "You’ve set your cookie preferences"

    And I should see the link "Go back to the page you were looking at"
    Then I take a screenshot

  @test @dev @local
  Scenario Outline: 07 Confirm content on Accessibility Statement page

  #This scenario confirms that content on the Accessibility Statement Page is displayed correctly

    When I click on the "Accessibility statement" link

    Then I should see the heading "Accessibility statement"
    And I should see the paragraph "This service is run by Defra. We want as many people as possible to be able to use this website."
    And I should see the paragraph "For example, that means you should be able to:"
    And I should see the list item "change colours, contrast levels and fonts"
    And I should see the list item "zoom in up to 200% without the text spilling off the screen"
    And I should see the list item "navigate most of the website using just a keyboard"
    And I should see the list item "navigate most of the website using speech recognition software"
    And I should see the list item "listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)"
    And I should see the paragraph "We have also made the website text as simple as possible to understand."
    And I should see the paragraph "AbilityNet has advice on making your device easier to use if you have a disability."

    Then I should see the heading "How accessible this website is"
    And I should see the paragraph "We believe this website is fully accessible. If you find any accessibility issues, please contact us using the details below."

    Then I should see the heading "Feedback and contact information"
    And I should see the paragraph "If you find any problems not listed on this page or think we're not meeting accessibility requirements, contact us at: contentteam@defra.gov.uk."

    Then I should see the heading "Enforcement procedure"
    And I should see the paragraph "The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’)."
    And I should see the paragraph "If you're not happy with how we respond to your complaint, contact the Equality Advisory and Support Service (EASS)."

    Then I should see the heading "Technical information about this website’s accessibility"
    And I should see the paragraph "Defra is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018."

    Then I should see the heading "Compliance status"
    And I should see the paragraph "This website is fully compliant with the Web Content Accessibility Guidelines version 2.2 AA standard."

    Then I should see the heading "What we're doing to improve accessibility"
    And I should see the paragraph "We are committed to maintaining accessibility standards. Our ongoing activities include:"
    And I should see the list item "conducting regular accessibility audits"
    And I should see the list item "training our team on accessibility best practices"

    Then I should see the heading "Preparation of this accessibility statement"
    And I should see the paragraph "This statement was prepared on"
    And I should see the paragraph "It was last reviewed on"
    And I should see the paragraph "This website was last tested on"
    And I should see the paragraph "The test was carried out using automated testing tools against WCAG 2.2 AA criteria."
    Then I take a screenshot

  @test @dev @local
  Scenario Outline: 08 Confirm content on Privacy Notice page

  #This scenario confirms that content on the Privacy Notice Page is displayed correctly

    When I click on the "Privacy" link

    Then I should see the heading "Privacy notice"

    Then I should see the paragraph "Payment management is provided by Defra."
    And I should see the paragraph "If you follow a link to a service provided by another government department, agency or local authority, that organisation will:"
    And I should see the list item "be the data controller"
    And I should see the list item "be responsible for processing any data you share with them"
    And I should see the list item "publish and manage their own privacy notice with details of how to contact them"
    And I should see the verify text "Defra is the data controller for pages starting with ffc-pay-web"
    And I should see the verify text "A data controller determines how and why personal data is processed."
    And I should see the verify text "Data Protection Public Register"

    Then I should see the heading "What data we collect"
    And I should see the paragraph "The personal data we collect from you includes:"
    And I should see the paragraph "Google Analytics processes information about:"
    And I should see the paragraph "We will not combine analytics information with other data sets in a way that would directly identify who you are."
    And I should see the list item "your Internet Protocol (IP) address, and details of which version of web browser you used"
    And I should see the list item "information on how you use the site, using cookies and page tagging techniques"
    And I should see the list item "the pages you visit on GOV.UK"
    And I should see the list item "how long you spend on each GOV.UK page"
    And I should see the list item "how you got to the site"
    And I should see the list item "what you click on while you’re visiting the site"
    And I should see the verify text "Where you provide your consent, we use Google Analytics to collect information about how you use GOV.UK."
    And I should see the verify text "This includes IP addresses."
    And I should see the link "Find out more about how we use Google Analytics and other cookies on this service"

    Then I should see the heading "Why we need your data"
    And I should see the paragraph "We collect your personal data in order to:"
    And I should see the paragraph "We use the information we collect through Google Analytics to see how you use the service and to see how well the site performs on your device."
    And I should see the paragraph "We do this to help:"
    And I should see the list item "gather feedback to improve our services"
    And I should see the list item "monitor use of the site to identify security threats"
    And I should see the list item "monitor the performance of the site to identify inefficiencies and JavaScript errors"
    And I should see the list item "make sure the service is meeting the needs of its users"
    And I should see the list item "make improvements"
    And I should see the list item "make performance improvements, for example improving page load time and data usage"

    Then I should see the heading "What we do with your data"
    And I should see the paragraph "The data we collect with Google Analytics cookies is transferred and stored with Google where we analyse it with Google Analytics software (Universal Analytics). We do not allow Google to use or share this data for their own purposes."
    And I should see the paragraph "We will not:"
    And I should see the list item "sell or rent your data to third parties"
    And I should see the list item "share your data with third parties for marketing purposes"

    Then I should see the heading "Where your data is processed and stored"
    And I should see the paragraph "All personal data is stored in the European Economic Area (EEA). Data collected by Google Analytics may be transferred outside the EEA for processing."
    And I should see the link "European Economic Area"

    Then I should see the heading "How we protect your data and keep it secure"
    And I should see the paragraph "We are committed to doing all that we can to keep your data secure. We have set up systems and processes to prevent unauthorised access or disclosure of your data - for example, we protect your data using varying levels of encryption."

    Then I should see the heading "Your rights"
    And I should see the paragraph "You have the right to request:"
    And I should see the list item "information about how your personal data is processed"
    And I should see the list item "a copy of that personal data"
    And I should see the list item "that anything inaccurate in your personal data is corrected immediately"
    And I should see the paragraph "You can also:"
    And I should see the list item "raise an objection about how your personal data is processed"
    And I should see the list item "request that your personal data is erased if there is no longer a justification for it"
    And I should see the list item "ask that the processing of your personal data is restricted in certain circumstances"
    And I should see the paragraph "If you have any of these requests, get in contact with our Privacy Team."

    Then I should see the heading "Links to other websites"
    And I should see the paragraph "This service contains links to other websites."
    And I should see the paragraph "This privacy notice only applies to Calculate my progressive reductions, and does not cover other government services and transactions that we link to. These services, have their own terms and conditions and privacy policies."

    Then I should see the heading "Following a link to another website"
    And I should see the paragraph "If you go to another website from this one, read the privacy policy on that website to find out what it does with your information."

    Then I should see the heading "Contact us or make a complaint"
    And I should see the paragraph "You can contact our Data Protection Officer (DPO):"
    And I should see the verify text "DPO"
    And I should see the verify text "DefraGroupDataProtectionOfficer@defra.gov.uk"
    And I should see the verify text "Defra"
    And I should see the verify text "Department for the Environment, Food and Rural Affairs"
    And I should see the verify text "2 Marsham Street"
    And I should see the verify text "London"
    And I should see the verify text "SW1P 4DF"
    Then I take a screenshot
