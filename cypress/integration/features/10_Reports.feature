Feature: 10 Reports

  # Background: Navigate to Payment management homepage
  #   Given I visit the "Payment management" homepage
  #   And I click on the "Report List" link
  
  @local
  Scenario: Scenario name
    Given the sample report data is loaded

  Scenario Outline: 01 Verify CSV file is downloaded when clicking "<link>"
    When I click on the "<link>" download link
    Then the CSV file is downloaded with "<title>" as the title

    @dev
    Examples:
      | link                     | title                         |
      | Payment request statuses | ffc-pay-mi-report-v2          |
      | Holds                    | ffc-pay-hold-report           |
      | Request Editor report    | ffc-pay-request-editor-report |
      # | Suppressed payment requests | ffc-pay-suppressed-report     |

    @test
    Examples:
      | link                        | title                         |
      | Payment request statuses    | ffc-pay-mi-report-v2          |
      | Holds                       | ffc-pay-hold-report           |
      | Request Editor report       | ffc-pay-request-editor-report |
      | Suppressed payment requests | ffc-pay-suppressed-report     |

  @dev @test
  Scenario Outline: 02 Verify "link" link works correctly
    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage

    Examples:
      | link                        | subPage             |
      | Payment request statuses v2 | payment-requests-v2 |
      | Combined transaction report | transaction-summary |
      | AP-AR listing report        | ap-ar-report        |
      | Claim level report          | claim-level-report  |

  @dev @ignore
  Scenario Outline: 03 Download Combined transaction report for <scheme>
    And I click on the "Combined transaction report" link
    And I am on the "transaction-summary" subpage
    And I select "<scheme>" from the "scheme" dropdown
    And I type "<year>" in the "year" field
    And I type "<prn>" in the "prn" field
    And I select "<revenueCapital>" from the "revenueCapital" dropdown
    When I click on the "Download report" button
    Then the CSV file is downloaded with "<title>" as the title

    Examples:
      | scheme             | year | prn | revenueCapital | frn        | title                                                            |
      | BPS                | 2018 | 1   |                |            | ffc-pay-combined-transaction-report_schemeId_6_year_2018_1       |
      | CS                 | 2023 |     | Revenue        |            | ffc-pay-combined-transaction-report_schemeId_5_year_2023_Revenue |
      | Delinked           | 2024 |     |                | 1102361569 | ffc-pay-combined-transaction-report_schemeId_13_year_2024        |
      | ES                 | 2023 |     |                |            | ffc-pay-combined-transaction-report_schemeId_9_year_2023         |
      | Expanded SFI Offer | 2024 |     |                | 1102491527 | ffc-pay-combined-transaction-report_schemeId_14_year_2024        |
      | FC                 | 2021 |     |                |            | ffc-pay-combined-transaction-report_schemeId_10_year_2021        |
      | FDMR               | 2017 |     |                |            | ffc-pay-combined-transaction-report_schemeId_7_year_2017         |
      | IMPS               | 2023 |     |                |            | ffc-pay-combined-transaction-report_schemeId_11_year_2023        |
      | Lump Sums          | 2022 |     |                |            | ffc-pay-combined-transaction-report_schemeId_3_year_2022         |
      | Manual Invoice     | 2023 |     |                |            | ffc-pay-combined-transaction-report_schemeId_8_year_2023         |
      | SFI Pilot          | 2022 |     |                |            | ffc-pay-combined-transaction-report_schemeId_2_year_2022         |
      | SFI22              | 2023 |     |                |            | ffc-pay-combined-transaction-report_schemeId_1_year_2023         |
      | SFI23              | 2023 |     |                | 1100016529 | ffc-pay-combined-transaction-report_schemeId_12_year_2023        |

  @test
  Scenario Outline: 03 Download Combined transaction report for <scheme>
    And I click on the "Combined transaction report" link
    And I am on the "transaction-summary" subpage
    And I select "<scheme>" from the "scheme" dropdown
    And I type "<year>" in the "year" field
    And I type "<prn>" in the "prn" field
    And I select "<revenueCapital>" from the "revenueCapital" dropdown
    When I click on the "Download report" button
    Then the CSV file is downloaded with "<title>" as the title

    Examples:
      | scheme             | year | prn | revenueCapital | frn        | title                                                            |
      | BPS                | 2018 | 1   |                |            | ffc-pay-combined-transaction-report_schemeId_6_year_2018_1       |
      | CS                 | 2023 |     | Revenue        |            | ffc-pay-combined-transaction-report_schemeId_5_year_2023_Revenue |
      | Delinked           | 2024 |     |                | 1102361569 | ffc-pay-combined-transaction-report_schemeId_13_year_2024        |
      | ES                 | 2023 |     |                |            | ffc-pay-combined-transaction-report_schemeId_9_year_2023         |
      | Expanded SFI Offer | 2024 |     |                | 1102491527 | ffc-pay-combined-transaction-report_schemeId_14_year_2024        |
      | FC                 | 2021 |     |                |            | ffc-pay-combined-transaction-report_schemeId_10_year_2021        |
      | FDMR               | 2017 |     |                |            | ffc-pay-combined-transaction-report_schemeId_7_year_2017         |
      | IMPS               | 2023 |     |                |            | ffc-pay-combined-transaction-report_schemeId_11_year_2023        |
      | Lump Sums          | 2022 |     |                |            | ffc-pay-combined-transaction-report_schemeId_3_year_2022         |
      | Manual Invoice     | 2023 |     |                |            | ffc-pay-combined-transaction-report_schemeId_8_year_2023         |
      | SFI Pilot          | 2022 |     |                |            | ffc-pay-combined-transaction-report_schemeId_2_year_2022         |
      | SFI22              | 2023 |     |                |            | ffc-pay-combined-transaction-report_schemeId_1_year_2023         |
      | SFI23              | 2023 |     |                | 1100016529 | ffc-pay-combined-transaction-report_schemeId_12_year_2023        |

  Scenario Outline: 04 Download <reportType>
    And I click on the "AP-AR listing report" link
    And I select "<reportType>" from the "reportType" dropdown
    And I type the "start" date as "<startDate>"
    And I type the "end" date as "<endDate>"
    When I click on the "Download report" button
    Then the CSV file is downloaded with "<title>" as the title

    @dev
    Examples:
      | reportType        | startDate  | endDate    | title                                                   |
      | AP Listing Report | 01-03-2024 | 16-10-2024 | ffc-pay-ap-listing-report_from_2024-03-01_to_2024-10-16 |
      # | AR Listing Report | 01-03-2024 | 16-10-2024 | ffc-pay-ar-listing-report_from_2024-03-01_to_2024-10-16 |

    @test
    Examples:
      | reportType        | startDate  | endDate    | title                                                   |
      | AP Listing Report | 01-05-2024 | 01-05-2025 | ffc-pay-ap-listing-report_from_2024-05-01_to_2025-05-01 |
      | AR Listing Report | 01-05-2024 | 01-05-2025 | ffc-pay-ar-listing-report_from_2024-05-01_to_2025-05-01 |

  @dev @ignore
  Scenario Outline: 05 Download Claim level report for <scheme>
    And I click on the "Claim level report" link
    And I am on the "claim-level-report" subpage
    And I select "<scheme>" from the "scheme" dropdown
    And I type "<year>" in the "year" field
    And I select "<revenueCapital>" from the "revenueCapital" dropdown
    And I type "<frn>" in the "FRN" field
    When I click on the "Download report" button
    Then the CSV file is downloaded with "<title>" as the title

    Examples:
      | scheme             | year | revenueCapital | frn        | title                                                           |
      | BPS                | 2018 |                |            | ffc-pay-claim-level-report_schemeId_6_year_2018                 |
      | CS                 | 2023 | Revenue        |            | ffc-pay-claim-level-report_schemeId_5_year_2023_Revenue         |
      | Delinked           | 2024 |                | 1102361569 | ffc-pay-claim-level-report_schemeId_13_year_2024_frn_1102361569 |
      | ES                 | 2023 |                |            | ffc-pay-claim-level-report_schemeId_9_year_2023                 |
      | Expanded SFI Offer | 2024 |                | 1102491527 | ffc-pay-claim-level-report_schemeId_14_year_2024_frn_1102491527 |
      | FC                 | 2021 |                |            | ffc-pay-claim-level-report_schemeId_10_year_2021                |
      | FDMR               | 2017 |                |            | ffc-pay-claim-level-report_schemeId_7_year_2017                 |
      | IMPS               | 2023 |                |            | ffc-pay-claim-level-report_schemeId_11_year_2023                |
      | Lump Sums          | 2022 |                |            | ffc-pay-claim-level-report_schemeId_3_year_2022                 |
      | Manual Invoice     | 2023 |                |            | ffc-pay-claim-level-report_schemeId_8_year_2023                 |
      | SFI Pilot          | 2022 |                |            | ffc-pay-claim-level-report_schemeId_2_year_2022                 |
      | SFI22              | 2023 |                |            | ffc-pay-claim-level-report_schemeId_1_year_2023                 |
      | SFI23              | 2023 |                | 1100016529 | ffc-pay-claim-level-report_schemeId_12_year_2023_frn_1100016529 |
      | Vet Visits         | 2023 |                |            | ffc-pay-claim-level-report_schemeId_4_year_2023                 |

  @test
  Scenario Outline: 05 Download Claim level report for <scheme>
    And I click on the "Claim level report" link
    And I am on the "claim-level-report" subpage
    And I select "<scheme>" from the "scheme" dropdown
    And I type "<year>" in the "year" field
    And I select "<revenueCapital>" from the "revenueCapital" dropdown
    And I type "<frn>" in the "FRN" field
    When I click on the "Download report" button
    Then the CSV file is downloaded with "<title>" as the title

    Examples:
      | scheme             | year | revenueCapital | frn        | title                                                           |
      | BPS                | 2018 |                |            | ffc-pay-claim-level-report_schemeId_6_year_2018                 |
      | CS                 | 2023 | Revenue        |            | ffc-pay-claim-level-report_schemeId_5_year_2023_Revenue         |
      | Delinked           | 2024 |                | 1102361569 | ffc-pay-claim-level-report_schemeId_13_year_2024_frn_1102361569 |
      | ES                 | 2023 |                |            | ffc-pay-claim-level-report_schemeId_9_year_2023                 |
      | Expanded SFI Offer | 2024 |                | 1102491527 | ffc-pay-claim-level-report_schemeId_14_year_2024_frn_1102491527 |
      | FC                 | 2021 |                |            | ffc-pay-claim-level-report_schemeId_10_year_2021                |
      | FDMR               | 2017 |                |            | ffc-pay-claim-level-report_schemeId_7_year_2017                 |
      | IMPS               | 2023 |                |            | ffc-pay-claim-level-report_schemeId_11_year_2023                |
      | Lump Sums          | 2022 |                |            | ffc-pay-claim-level-report_schemeId_3_year_2022                 |
      | Manual Invoice     | 2023 |                |            | ffc-pay-claim-level-report_schemeId_8_year_2023                 |
      | SFI Pilot          | 2022 |                |            | ffc-pay-claim-level-report_schemeId_2_year_2022                 |
      | SFI22              | 2023 |                |            | ffc-pay-claim-level-report_schemeId_1_year_2023                 |
      | SFI23              | 2023 |                | 1100016529 | ffc-pay-claim-level-report_schemeId_12_year_2023_frn_1100016529 |
      | Vet Visits         | 2023 |                |            | ffc-pay-claim-level-report_schemeId_4_year_2023                 |

  @dev @test
  Scenario Outline: 06 No data found for <reportType>
    And I click on the "AP-AR listing report" link
    And I select "<reportType>" from the "reportType" dropdown
    And I type the "start" date as "<startDate>"
    And I type the "end" date as "<endDate>"
    When I click on the "Download report" button
    Then I should see "No data was found for the selected report criteria. Please review your filters, such as date range or report type, and try again."

    Examples:
      | reportType        | startDate  | endDate    |
      | AP Listing Report | 01-01-2015 | 02-01-2015 |
      | AR Listing Report | 01-01-2015 | 02-01-2015 |