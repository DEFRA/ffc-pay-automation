Feature: 02 Request Editor

  Background: Navigate to Request Editor homepage
    Given I visit the "Request Editor" homepage

  @dev @local
  Scenario: 01 Validate Dataset Count Increment After Adding a New Reporting Dataset
    And I make a note of the dataset count
    And I click on the "Capture new dataset" link
    And the application identifier field header is visible with text "Agreement/claim number"
    And the application identifier hint is visible with text "Enter the agreement/claim number, for example SIP000000000001 or 1234567"
    And I create a new reporting dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | SIP000000000001 | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I am on the "Request Editor" homepage
    And the dataset count has increased by 1

  @test @dev @local
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

  @test @dev @local
  Scenario: 03 Download Extract
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    When I click on the "Download an extract" download link
    Then the extract is downloaded

  @test @dev
  Scenario Outline: 04 Verify "<link>"" links work correctly
    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage

    Examples:
      | link                            | subPage       |
      | View awaiting ledger assignment | manual-ledger |
      | View awaiting reporting data    | enrich        |

  Scenario Outline: 05 FRN Search Function
    And I click on the "View awaiting ledger assignment" link
    And I search for FRN "<frn>"
    When I click on the FRN search button
    Then I can see FRN "<frn>" in the table

    @test
    Examples:
      | frn        |
      | 1102142158 |

    @dev
    Examples:
      | frn        |
      | 1266744588 |

  @dev @local
  Scenario: 06 Debt data reference is less than 5 characters
    And I click on the "Capture new dataset" link
    And I create a new reporting dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | 1234            | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I see the 'The agreement/claim number must be at least 5 characters long.' application identifier error message
    And I see the 'There is a problem' error summary title
    And I see the 'The agreement/claim number must be at least 5 characters long.' error summary item

  @dev @local
  Scenario: 07 Debt data reference is not provided
    And I click on the "Capture new dataset" link
    And I create a new reporting dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 |                 | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I see the 'The agreement/claim number is required.' application identifier error message
    And I see the 'There is a problem' error summary title
    And I see the 'The agreement/claim number is required.' error summary item

  @dev @local
  Scenario: 08 Debt data reference is not alphanumeric
    And I click on the "Capture new dataset" link
    And I create a new reporting dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | !@£$%^&%*       | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I see the 'The agreement/claim number must be a string consisting of alphanumeric characters and underscores.' application identifier error message
    And I see the 'There is a problem' error summary title
    And I see the 'The agreement/claim number must be a string consisting of alphanumeric characters and underscores.' error summary item

  Scenario Outline: 09 Unattached reporting datasets - Searching based on FRN number displays only records related to that FRN number
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    And I enter '<frn>' in the FRN number search field
    When I click the FRN number search button
    Then each record in the table has the FRN number '<frn>'

    @test
    Examples:
      | frn        |
      | 1104642379 |

    @dev
    Examples:
      | frn        |
      | 1651658001 |

  @dev @ignore
  Scenario: 10 Unattached reporting datasets - Searching based on scheme displays only records related to that scheme
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    And I select 'FDMR' in the scheme dropdown
    When I click the Scheme search button
    Then each record in the table has the Scheme 'FDMR'

  @test
  Scenario: 10 Unattached reporting datasets - Searching based on scheme displays only records related to that scheme
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    And I select 'FDMR' in the scheme dropdown
    When I click the Scheme search button
    Then each record in the table has the Scheme 'FDMR'

  @test @dev @local
  Scenario: 11 Unattached reporting datasets - Searching based on FRN number & scheme displays only records related to both that FRN number & scheme
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    And I enter '1234567891' in the FRN number search field
    And I click the FRN number search button
    And I select 'SFI22' in the scheme dropdown
    When I click the Scheme search button
    Then each record in the table has the FRN number '1234567891'
    And each record in the table has the Scheme 'SFI22'

  @test @dev @local
  Scenario: 12 Unattached reporting datasets - Searching based on FRN number that returns no datasets
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    And I enter '9999999999' in the FRN number search field
    When I click the FRN number search button
    Then 'No reporting datasets' are displayed

  @test @dev @local
  Scenario: 13 Unattached reporting datasets - Searching based on scheme that returns no datasets
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    And I select 'Vet Visits' in the scheme dropdown
    When I click the Scheme search button
    Then 'No reporting datasets' are displayed