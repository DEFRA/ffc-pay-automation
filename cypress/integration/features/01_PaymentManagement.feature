@paymentManagement
Feature: 01 Payment management

  Background: Navigate to Payment management homepage
    Given I visit the "Payment management" homepage

  Scenario Outline: 01 Verify "<link>"" links work correctly
    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage

    Examples:
      | link                            | subPage                                    |
      | Manage holds                    | payment-holds                              |
      | Manage schemes                  | payment-schemes                            |
      | Reset payment request           | payment-request/reset                      |
      | View events                     | monitoring                                 |
      | View processed payment requests | monitoring/view-processed-payment-requests |
      | Manage closures                 | closure                                    |
      | Add closure                     | closure/add                                |
      | Add bulk closures               | closure/bulk                               |

  Scenario Outline: 02 Verify "<link>"" link works correctly
    And I click on the "Report List" link
    When I click on the "<link>" download link
    Then the CSV file is downloaded with "<title>" as the title

    Examples:
      | link                        | title                               |
      | Payment request statuses    | ffc-pay-mi-report-v2                |
      | Combined transaction report | ffc-pay-combined-transaction-report |
      # | Suppressed payment requests | ffc-pay-suppressed-report           |
      | Holds | ffc-pay-hold-report |

  Scenario: 03 Verify "AP Listing Report" link works correctly
    And I click on the "Report List" link
    When I click on the "AP Listing Report" link
    Then I am on the "ap-listing" subpage