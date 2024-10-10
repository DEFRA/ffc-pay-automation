@test
Feature: 10 Reports

  Background: Navigate to Payment management homepage
    Given I visit the "Payment management" homepage
    And I click on the "Report List" link

  Scenario Outline: 01 Combined transaction report
    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage
    And I select "<scheme>" from the "scheme" dropdown
    And I type "<year>" in the "year" field
    And I type "<paymentRequestNumber>" in the "paymentRequestNumber" field
    And I select "<revenueCapital>" from the "revenueCapital" dropdown
    And I type "<frn>" in the "FRN" field
    When the CSV file is downloaded with "<title>" as the title when I hit submit


    Examples:
      | link                        | subPage             | scheme | year | paymentRequestNumber | revenueCapital | frn        | title                                                                    |
      | Combined transaction report | transaction-summary | SFI23  | 2023 |                      |                | 1100016529 | ffc-pay-combined-transaction-report_schemeId_12_year_2023_frn_1100016529 |