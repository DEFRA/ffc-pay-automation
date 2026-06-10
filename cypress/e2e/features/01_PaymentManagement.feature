Feature: 01 Payment management

# npm run cypress:test:one -- "cypress\e2e\features\01_PaymentManagement.feature"
# npm run cypress:dev:one -- "cypress\e2e\features\01_PaymentManagement.feature"
# npm run cypress:local:one -- "cypress\e2e\features\01_PaymentManagement.feature"

  Background: Navigate to Payment management homepage
    Given I visit the "Payment management" homepage

  @test @dev @local
  Scenario Outline: 01 Verify <link> links work correctly

  This scenario confirms that the links for all of Pay Management's sections are functioning correctly

    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage
    Then I take a screenshot for "<link>"

    Examples:
      | link                   | subPage               |
      | Manage holds           | payment-holds         |
      | Alerts                 | alerts                |
      | Reset payment request  | payment-request/reset |
      | Monitoring             | monitoring            |
      | Schemes                | monitoring/schemes    |
      | Manage closures        | closure               |
      | Agreement closure      | closure/add           |
      | Bulk agreement closure | closure/bulk          |
      | Reports                | report-list           |
      | Manual payment upload  | manual-payments       |
      | Management information | metrics               |
      | Download statements    | download-statements   |

  
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
    Then I take a screenshot for Feature 1 and Scenario 2

  @test @dev
  Scenario Outline: 03 Confirm cookie banner displays correctly on page load

  #This scenario confirms the the cookie preferences banner displays correctly when Pay Management loads

    Then on the Home Page I confirm that "cookie banner header" is displayed
    Then on the Home Page I confirm that "cookie banner content" is displayed
    Then on the Home Page I confirm that "cookie banner accept button" is displayed
    Then on the Home Page I confirm that "cookie banner reject button" is displayed
    Then on the Home Page I confirm that "cookie banner view link" is displayed

    Then I take a screenshot for Feature 1 and Scenario 3

  @test @dev
  Scenario Outline: 04 Confirm accept cookies functions correctly

  #This scenario confirms that cookies can be accepted successfully from cookie preferences banner

    When on the Home Page I click the "accept cookies" button

    Then on the Home Page I confirm that "cookie banner header" is not displayed
    Then on the Home Page I confirm that "cookie banner content" is not displayed
    Then on the Home Page I confirm that "cookie banner accept button" is not displayed
    Then on the Home Page I confirm that "cookie banner reject button" is not displayed
    Then on the Home Page I confirm that "cookie banner view link" is not displayed
    
    Then on the Home Page I confirm that "cookie banner accepted message" is displayed
    Then on the Home Page I confirm that "cookie banner accepted hide button" is displayed

    Then I take a screenshot for Feature 1 and Scenario 4

    When on the Home Page I click the "cookies accepted hide button" button

    Then on the Home Page I confirm that "cookie banner accepted message" is not displayed
    Then on the Home Page I confirm that "cookie banner accepted hide button" is not displayed

  @test @dev
  Scenario Outline: 05 Confirm reject cookies functions correctly

  #This scenario confirms that cookies can be rejected successfully from cookie preferences banner

    When on the Home Page I click the "reject cookies" button

    Then on the Home Page I confirm that "cookie banner header" is not displayed
    Then on the Home Page I confirm that "cookie banner content" is not displayed
    Then on the Home Page I confirm that "cookie banner accept button" is not displayed
    Then on the Home Page I confirm that "cookie banner reject button" is not displayed
    Then on the Home Page I confirm that "cookie banner view link" is not displayed
    
    Then on the Home Page I confirm that "cookie banner rejected message" is displayed
    Then on the Home Page I confirm that "cookie banner rejected hide button" is displayed

    Then I take a screenshot for Feature 1 and Scenario 5

    When on the Home Page I click the "cookies rejected hide button" button

    Then on the Home Page I confirm that "cookie banner rejected message" is not displayed
    Then on the Home Page I confirm that "cookie banner rejected hide button" is not displayed

  @test @dev
  Scenario Outline: 06 Confirm content on cookies page

  #This scenario confirms that content on the Cookies Page is displayed correctly and that cookie preferences can
  #be set from here

    When I click on the "View cookies" link

    Then on the Cookies Page I confirm that "page header" is displayed
    Then on the Cookies Page I confirm that "description" is displayed
    Then on the Cookies Page I confirm that "essential cookies subheader" is displayed
    Then on the Cookies Page I confirm that "essential cookies description" is displayed
    Then on the Cookies Page I confirm that "essential cookies name" is displayed
    Then on the Cookies Page I confirm that "essential cookies purpose" is displayed
    Then on the Cookies Page I confirm that "essential cookies expires" is displayed
    Then on the Cookies Page I confirm that "analytics cookies subheader" is displayed
    Then on the Cookies Page I confirm that "analytics cookies description" is displayed
    Then on the Cookies Page I confirm that "analytics cookies bullet points" is displayed
    Then on the Cookies Page I confirm that "analytics cookies names" is displayed
    Then on the Cookies Page I confirm that "analytics cookies purposes" is displayed
    Then on the Cookies Page I confirm that "analytics cookies expirations" is displayed
    Then on the Cookies Page I confirm that "accept analytics cookies subheader" is displayed
    Then on the Cookies Page I confirm that "accept analytics cookies description" is displayed
    Then on the Cookies Page I confirm that "accept analytics cookies option buttons" is displayed
    Then on the Cookies Page I confirm that "save cookie settings button" is displayed

    When on the Cookies Page I click the "accept cookies" button
    When on the Cookies Page I click the "save cookie settings" button

    Then on the Cookies Page I confirm that "cookie preference banner" is displayed
    Then I take a screenshot for Feature 1 and Scenario 6

  @test @dev @local
  Scenario Outline: 07 Confirm content on Accessibility Statement page

  #This scenario confirms that content on the Accessibility Statement Page is displayed correctly

    When I click on the "Accessibility statement" link

    Then on the Accessibility Statement Page I confirm that "page header" is displayed
    Then on the Accessibility Statement Page I confirm that "description" is displayed
    Then on the Accessibility Statement Page I confirm that "how accessible this website is" is displayed
    Then on the Accessibility Statement Page I confirm that "feedback and contact info" is displayed
    Then on the Accessibility Statement Page I confirm that "enforcement procedure" is displayed
    Then on the Accessibility Statement Page I confirm that "technical info" is displayed
    Then on the Accessibility Statement Page I confirm that "compliance status" is displayed
    Then on the Accessibility Statement Page I confirm that "improving accessiblity" is displayed
    Then on the Accessibility Statement Page I confirm that "preparation of statement" is displayed
    Then I take a screenshot for Feature 1 and Scenario 7

  @test @dev @local
  Scenario Outline: 08 Confirm content on Privacy Notice page

  #This scenario confirms that content on the Privacy Notice Page is displayed correctly

    When I click on the "Privacy" link

    Then on the Privacy Notice Page I confirm that "page header" is displayed
    Then on the Privacy Notice Page I confirm that "description" is displayed
    Then on the Privacy Notice Page I confirm that "what data we collect" is displayed
    Then on the Privacy Notice Page I confirm that "why we need your data" is displayed
    Then on the Privacy Notice Page I confirm that "what we do with your data" is displayed
    Then on the Privacy Notice Page I confirm that "where your data is processed and stored" is displayed
    Then on the Privacy Notice Page I confirm that "how we protect your data" is displayed
    Then on the Privacy Notice Page I confirm that "your rights" is displayed
    Then on the Privacy Notice Page I confirm that "links to other websites" is displayed
    Then on the Privacy Notice Page I confirm that "contact us" is displayed
    Then on the Privacy Notice Page I confirm that "last updated notice" is displayed
    Then I take a screenshot for Feature 1 and Scenario 8
