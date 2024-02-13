@requestEditor
Feature: 02 Request Editor

  Background: Navigate to Request Editor homepage
    Given I visit the "Request Editor" homepage

  Scenario: 01 Validate Dataset Count Increment After Adding a New Reporting Dataset
    And I make a note of the dataset count
    And I click on the "Capture new dataset" link
    And I create a new reporting dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | SIP000000000001 | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I am on the "Request Editor" homepage
    And the dataset count has increased by 1

  Scenario: 02 Verify all schemes are displayed correctly
    When I click on the "Capture new dataset" link
    Then I should see the following schemes:
      | Scheme Name |
      | SFI22       |
      | SFI Pilot   |
      | Lump Sums   |
      | Vet Visits  |
      | CS          |
      | BPS         |
      | FDMR        |
      | SFI23       |

  Scenario: 03 Download Extract
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    When I click on the "Download an extract" link
    Then the extract is downloaded