@test @dev @local
Feature: 01 Payment management

# npm run cypress:test:one -- "cypress\e2e\features\01_PaymentManagement.feature"
# npm run cypress:dev:one -- "cypress\e2e\features\01_PaymentManagement.feature"
# npm run cypress:local:one -- "cypress\e2e\features\01_PaymentManagement.feature"

  Background: Navigate to Payment management homepage
    Given I visit the "Payment management" homepage

  Scenario Outline: 01 Verify <link> links work correctly
    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage
    Then I take a screenshot for "<link>"

    Examples:
      | link                   | subPage               |
      | Manage holds           | payment-holds         |
      | Alerts                 | alerts                |
      | Reset payment request  | payment-request/reset |
      | Monitoring             | monitoring            |
      | Manage closures        | closure               |
      | Reports                | report-list           |
      | Manual payment upload  | manual-payments       |
      | Management information | metrics               |
      | Download statements    | download-statements   |