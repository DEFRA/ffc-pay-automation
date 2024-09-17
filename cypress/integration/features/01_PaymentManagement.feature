@paymentManagement
Feature: 01 Payment management

  Background: Navigate to Payment management homepage
    Given I visit the "Payment management" homepage

  Scenario Outline: 01 Verify "<link>"" links work correctly
    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage

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

  Scenario Outline: 02 Verify "<link>"" link works correctly
    And I click on the "Report List" link
    When I click on the "<link>" download link
    Then the CSV file is downloaded with "<title>" as the title

    Examples:
      | link                        | title                         |
      | Payment request statuses    | ffc-pay-mi-report-v2          |
      | Suppressed payment requests | ffc-pay-suppressed-report     |
      | Holds                       | ffc-pay-hold-report           |
      | Request Editor report       | ffc-pay-request-editor-report |

  Scenario Outline: 03 Verify "link" link works correctly
    And I click on the "Report List" link
    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage

    Examples:
      | link                        | subPage             |
      | Combined transaction report | transaction-summary |
      | AP-AR listing report        | ap-ar-listing       |
      | Claim level report          | claim-level-report  |