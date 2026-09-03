Feature: 02 Request Editor

# npm run cypress:test:one -- "cypress\e2e\features\02_RequestEditor.feature"
# npm run cypress:dev:one -- "cypress\e2e\features\02_RequestEditor.feature"
# npm run cypress:local:one -- "cypress\e2e\features\02_RequestEditor.feature"

  Background: Navigate to Request Editor homepage
    Given I visit the "Request Editor" homepage

#####################################################################################################################
#                                                                                                                   #
#                                               EXAMPLES:                                                           #
#     | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |                        #
#     | SFI22  | 1234567891 | SIP000000000001 | 10000    | irr        | today              |                        #
#     | SFI22  | 1234567891 | SIP000000000001 | 10000    | irr        | 11/11/2021         |                        #
#                                                                                                                   #
#     NOTES                                                                                                         #
#     - Running Scenario 14 onwards requires a fresh environment in order for the flow to complete succesfully.     #
#     - This is why we restart the environment in Scenario 01, if you already have a fresh env just comment it out. # 
#                                                                                                                   #
#     TODO                                                                                                          #
#      - Need to retire capturePage.js and have all in the one RequestEditorPage                                    #
#      - more tests can be added to dev to mirror local testing                                                     #
#                                                                                                                   #
#####################################################################################################################

###################################################################   
#                                                                 #
# "Unattached reporting datasets" section of Request editor       #
#                                                                 #
###################################################################


  @dev @local
  Scenario: 01 Validate Dataset Count Increment After Adding a New Reporting Dataset
    #Given I restart the local environment
    And I click on the "View all datasets" link
    And I note the number of datasets displayed
    And I click on the "Create new dataset" link
    And the application identifier field header is visible with text 'Agreement / claim number'
    And the application identifier hint is visible with text 'For example, SIP000000000001 or 12345678'
    And I create a new debt dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | SIP000000000001 | 10000    | irr        | today              |
    When I click on the "Continue" button
    And I verify my new debt dataset with the following values on the confirmation screen
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | SIP000000000001 | 10000    | irr        | today              |
    And I click on the "Save" button
    And I see a success message for "New reporting dataset has been successfully created."
    And I click the "Home" breadcrumb
    And I click on the "View all datasets" link
    Then I take a screenshot
    Then I should see one more dataset in the table
    And the dataset value "SIP000000000001" should be present

  @test @dev @local
  Scenario: 02 Verify all schemes are displayed correctly for creating a new reporting dataset
    And I click on the "View all datasets" link
    When I click on the "Create new dataset" link
    Then I take a screenshot
    Then I should see the following schemes:
      | Scheme Name                        |
      | Annual Health and Welfare Review   |
      | SFI22                              |
      | SFI Pilot                          |
      | Lump Sums                          |
      | CS                                 |
      | BPS                                |
      | Delinked                           |
      | Expanded SFI Offer                 |
      | Combined Offer Higher Tier Revenue |
      | Combined Offer Higher Tier Capital |
      | SFI23                              |
      | Farm Payments Technical Test       |

  @test @dev @local
  Scenario: 03 Download Extract
    And I click on the "View all datasets" link
    When I click on the "Download as CSV" download link
    Then the extract is downloaded

  @test @dev
  Scenario Outline: 04 Verify "<link>"" links work correctly
    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage

    Examples:
      | link                                          | subPage       |
      | View all datasets                             | capture       |
      | View awaiting debt data                       | enrich        |
      | View awaiting manual ledger assignment        | manual-ledger |
      | View awaiting ledger assignment quality check | quality-check |

  Scenario Outline: 05 FRN Search Function
    And I click on the "View all datasets" link
    And I search for FRN "<frn>"
    When I click on the "Search" button
    Then I take a screenshot
    Then the dataset value "<frn>" should be present

    @test
    Examples:
      | frn        |
      | 1101991879 |

    @dev
    Examples:
      | frn        |
      | 1230521262 |

  @dev @local
  Scenario: 06 Agreement/Claim Number is less than 5 characters
    And I click on the "View all datasets" link
    And I click on the "Create new dataset" link
    And I create a new debt dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | 1234            | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I take a screenshot
    Then I see the 'The Agreement / claim number must be at least 5 characters long' application identifier error message
    And I see the 'There is a problem' error summary title
    And I see the 'The Agreement / claim number must be at least 5 characters long' error summary item

  @dev @local
  Scenario: 07 Agreement/Claim Number is not provided
    And I click on the "View all datasets" link
    And I click on the "Create new dataset" link
    And I create a new debt dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 |                 | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I see the 'The Agreement / claim number is required' application identifier error message
    Then I take a screenshot
    And I see the 'There is a problem' error summary title
    And I see the 'The Agreement / claim number is required' error summary item

  @dev @local
  Scenario: 08 Agreement/Claim Number is not alphanumeric
    And I click on the "View all datasets" link
    And I click on the "Create new dataset" link
    And I create a new debt dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | !@£$%^&%*       | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I see the 'The Agreement / claim number must be a string consisting of alphanumeric characters and underscores' application identifier error message
    Then I take a screenshot
    And I see the 'There is a problem' error summary title
    And I see the 'The Agreement / claim number must be a string consisting of alphanumeric characters and underscores' error summary item

  Scenario Outline: 09 Unattached reporting datasets - Searching based on FRN number displays only records related to that FRN number
    And I click on the "View all datasets" link
    And I enter "<frn>" into the "frn" field
    When I click on the "Search" button
    Then each record in the table has the FRN number '<frn>'
    Then I take a screenshot

    @test
    Examples:
      | frn        |
      | 1104642379 |

    @dev
    Examples:
      | frn        |
      | 1234567891 |

  @dev @ignore
  Scenario: 10 Unattached reporting datasets - Searching based on scheme displays only records related to that scheme
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    And I select 'Combined Offer Higher Tier Capital' in the scheme dropdown
    When I click on the "Search" button
    Then each record in the table has the Scheme 'Combined Offer Higher Tier Capital'

  @test
  Scenario: 10 Unattached reporting datasets - Searching based on scheme displays only records related to that scheme
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    And I select 'Combined Offer Higher Tier Capital' in the scheme dropdown
    When I click on the "Search" button
    Then each record in the table has the Scheme 'Combined Offer Higher Tier Capital'

  @test @dev @local
  Scenario: 11 Unattached reporting datasets - Searching based on FRN number & scheme displays only records related to both that FRN number & scheme
    And I click on the "View all datasets" link
    And I enter "1234567891" into the "frn" field
    And I select 'SFI22' in the scheme dropdown
    When I click on the "Search" button
    Then I take a screenshot
    And each record in the table has the Scheme 'SFI22'

  @test @dev @local
  Scenario: 12 Unattached reporting datasets - Searching based on FRN number that returns no datasets
    And I click on the "View all datasets" link
    And I enter "9999999999" into the "frn" field
    When I click on the "Search" button
    Then I should see "No datasets were found for 9999999999. Check your details and try again"
    Then I take a screenshot

  @test @dev @local
  Scenario: 13 Unattached reporting datasets - Searching based on scheme that returns no datasets
    And I click on the "View all datasets" link
    And I select 'Annual Health and Welfare Review' in the scheme dropdown
    When I click on the "Search" button
    Then I should see "No datasets were found for Annual Health and Welfare Review. Check your details and try again"
    Then I take a screenshot
