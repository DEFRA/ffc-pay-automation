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
      | Suppressed payment requests     | report/suppressed-payments                 |
      | View events                     | monitoring                                 |
      | View processed payment requests | monitoring/view-processed-payment-requests |
      | Manage closures                 | closure                                    |
      | Add closure                     | closure/add                                |
      | Add bulk closures               | closure/bulk                               |

  Scenario: 02 Verify "Payment Request Statuses" link works correctly
    When I click on the "Payment request statuses" link
    Then the CSV file is downloaded