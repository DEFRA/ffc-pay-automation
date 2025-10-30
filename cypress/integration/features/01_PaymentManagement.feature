@test @dev
Feature: 01 Payment management

  Background: Navigate to Payment management homepage
    Given I visit the "Payment management" homepage

  Scenario Outline: 01 Verify <link> links work correctly
    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage
    Then I take a screenshot for "<link>"

    Examples:
      | link                            | subPage               |
      | Manage holds                    | payment-holds         |
      | Manage schemes                  | payment-schemes       |
      | Reset payment request           | payment-request/reset |
      | View events                     | monitoring            |
      | View processed payment requests | monitoring/schemes    |
      | Manage closures                 | closure               |
      | Add closure                     | closure/add           |
      | Add bulk closures               | closure/bulk          |
      | Report List                     | report-list           |