@requestEditor
Feature: 02 Request Editor

  Background: Navigate to Request Editor homepage
    Given I visit the "Request Editor" homepage

  Scenario: 01 Validate Dataset Count Increment After Adding a New Reporting Dataset
    And I make a note of the "Unattached reporting datasets" count
    And I click on the "Capture new dataset" link
    And the application identifier field header is visible with text "Agreement/claim number"
    And the application identifier hint is visible with text "Enter the agreement/claim number, for example SIP000000000001 or 1234567"
    And I create a new reporting dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | SIP000000000001 | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I am on the "Request Editor" homepage
    And the "Unattached reporting datasets" count has increased by 1

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

  @ignore
  Scenario: 03 Download Extract
    And I click on the "View all datasets" link
    And I am on the "capture" subpage
    When I click on the "Download an extract" download link
    Then the extract is downloaded

  @ignore
  Scenario Outline: 04 Verify "<link>"" links work correctly
    When I click on the "<link>" link
    Then I am on the "<subPage>" subpage

    Examples:
      | link                            | subPage       |
      | View awaiting ledger assignment | manual-ledger |
      | View awaiting reporting data    | enrich        |

  @ignoreLocal
  Scenario: 05 FRN Search Function
    And I click on the "View awaiting ledger assignment" link
    And I search for FRN "1102142158"
    When I click on the FRN search button
    Then I can see FRN "1102142158" in the table

  Scenario: 06 Debt data reference is less than 5 characters
    And I click on the "Capture new dataset" link
    And I create a new reporting dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | 1234            | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I see the 'The agreement/claim number must be at least 5 characters long.' application identifier error message
    And I see the 'There is a problem' error summary title
    And I see the 'The agreement/claim number must be at least 5 characters long.' error summary item

  Scenario: 07 Debt data reference is not provided
    And I click on the "Capture new dataset" link
    And I create a new reporting dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 |                 | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I see the 'The agreement/claim number is required.' application identifier error message
    And I see the 'There is a problem' error summary title
    And I see the 'The agreement/claim number is required.' error summary item

  Scenario: 08 Debt data reference is not alphanumeric
    And I click on the "Capture new dataset" link
    And I create a new reporting dataset with the following values
      | scheme | frn        | agreementNumber | netValue | typeOfDebt | dateDebtDiscovered |
      | SFI22  | 1234567891 | !@£$%^&%*       | 10000    | irr        | today              |
    When I click on the "Continue" button
    Then I see the 'The agreement/claim number must be a string consisting of alphanumeric characters and underscores.' application identifier error message
    And I see the 'There is a problem' error summary title
    And I see the 'The agreement/claim number must be a string consisting of alphanumeric characters and underscores.' error summary item
  
  Scenario Outline: 01 Add an entry to the "<box>" box on Request Editor
    Given I start the messaging service on for the service bus topic "<sendToTopicName>"
    And I make a note of the "<box>" count
    And I create a message with the filename "<sendToTopicName>" and update the following keys:
      | sbi           |
      | frn           |
      | value         |
      | invoiceNumber |
    When I send the updated message to the service bus topic "<sendToTopicName>"
    Then the "<box>" count has increased by 1
    And I stop the messaging service

    @test
    Examples:
      | sendToTopicName                | box                              |
      | ffc-pay-debt-data-test         | Requests awaiting reporting data |
      | ffc-pay-manual-check-data-test | Awaiting ledger assignment       |

    @dev
    Examples:
      | sendToTopicName               | box                              |
      | ffc-pay-debt-data-dev         | Requests awaiting reporting data |
      | ffc-pay-manual-check-data-dev | Awaiting ledger assignment       |