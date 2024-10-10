@test
Feature: 10 Reports

  Background: Navigate to Payment management homepage
    Given I visit the "Payment management" homepage
    And I click on the "Report List" link

  Scenario Outline: 01 Combined transaction report - <scheme>
    And I click on the "Combined transaction report" link
    And I am on the "transaction-summary" subpage
    And I select "<scheme>" from the "scheme" dropdown
    And I type "<year>" in the "year" field
    And I type "<prn>" in the "prn" field
    And I select "<revenueCapital>" from the "revenueCapital" dropdown
    When I type "<frn>" in the "FRN" field
    Then the CSV file is downloaded with "<title>" as the title when I send the request

    Examples:
      | scheme     | year | prn | revenueCapital | frn | title                            |
      | SFI22      | 2023 |     |                |     | schemeId_1_year_2023             |
      | SFI Pilot  | 2022 |     |                |     | schemeId_2_year_2022             |
      | Lump Sums  | 2022 |     |                |     | schemeId_3_year_2022             |
      | Vet Visits | 2023 |     |                |     | schemeId_4_year_2023             |
      | CS         | 2023 |     | Revenue        |     | schemeId_5_year_2023_prn_Revenue |
      # | BPS                | 2023 |     |                |            | schemeId_6_year_2023_frn_1100016529  |
      # | FDMR               | 2017 |     |                |            | schemeId_7_year_2023_frn_1100016529  |
      | Manual Invoice | 2023 |  |  |  | schemeId_8_year_2023  |
      | ES             | 2023 |  |  |  | schemeId_9_year_2023  |
      | IMPS           | 2023 |  |  |  | schemeId_11_year_2023 |
      # | FC                 | 2023 |  |  | 1100016529 | schemeId_11_year_2023_frn_1100016529 |
      | SFI23 | 2023 |  |  | 1100016529 | schemeId_12_year_2023_frn_1100016529 |
      # | Delinked           | 2023 |  |  | 1100016529 | schemeId_13_year_2023_frn_1100016529 |
      # | Expanded SFI Offer | 2023 |  |  | 1100016529 | schemeId_14_year_2023_frn_1100016529 |

  Scenario Outline: 02 <reportType>
    And I click on the "AP-AR listing report" link
    And I select "<reportType>" from the "reportType" dropdown
    And I type the "start" date as "<startDate>"
    And I type the "end" date as "<endDate>"

    Examples:
      | reportType        | startDate  | endDate    |
      | AR Listing Report | 02-01-2020 | 01-12-2024 |
      | AR Listing Report | 02-01-2020 | 01-12-2024 |

  Scenario Outline: 03 Claim level report - <scheme>
    And I click on the "Claim level report" link
    And I am on the "claim-level-report" subpage
    And I select "<scheme>" from the "scheme" dropdown
    And I type "<year>" in the "year" field
    And I type "<prn>" in the "prn" field
    And I select "<revenueCapital>" from the "revenueCapital" dropdown
    When I type "<frn>" in the "FRN" field
    Then the CSV file is downloaded with "<title>" as the title when I send the request

    Examples:
      | scheme     | year | prn | revenueCapital | frn | title                            |
      | SFI22      | 2023 |     |                |     | schemeId_1_year_2023             |
      | SFI Pilot  | 2022 |     |                |     | schemeId_2_year_2022             |
      | Lump Sums  | 2022 |     |                |     | schemeId_3_year_2022             |
      | Vet Visits | 2023 |     |                |     | schemeId_4_year_2023             |
      | CS         | 2023 |     | Revenue        |     | schemeId_5_year_2023_prn_Revenue |
      # | BPS                | 2023 |     |                |            | schemeId_6_year_2023_frn_1100016529  |
      # | FDMR               | 2017 |     |                |            | schemeId_7_year_2023_frn_1100016529  |
      | Manual Invoice | 2023 |  |  |  | schemeId_8_year_2023  |
      | ES             | 2023 |  |  |  | schemeId_9_year_2023  |
      | IMPS           | 2023 |  |  |  | schemeId_11_year_2023 |
      # | FC                 | 2023 |  |  | 1100016529 | schemeId_11_year_2023_frn_1100016529 |
      | SFI23 | 2023 |  |  | 1100016529 | schemeId_12_year_2023_frn_1100016529 |
      # | Delinked           | 2023 |  |  | 1100016529 | schemeId_13_year_2023_frn_1100016529 |
      # | Expanded SFI Offer | 2023 |  |  | 1100016529 | schemeId_14_year_2023_frn_1100016529 |