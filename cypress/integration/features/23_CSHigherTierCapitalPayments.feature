@local
Feature: 23 CS Higher Tier Capital Payments

  Scenario: 01 insert incorrect COHTC test data via service bus message to ffc-pay-request

    Given I restart the local environment
    Given I visit the "Request Editor" homepage
    Then I take a screenshot for Feature 23 and Scenario 1
    When I send the updated "cohtcError-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that payment test data has not been inserted into the ffc-pay-processing database

  Scenario: 02 insert COHTC test data via service bus message to ffc-pay-request

    When I send the updated "cohtc-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#The following step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Pay Submission Service have been correctly added to the generated statement

    Then I pull cohtc file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 03 send COHTC return file message and confirm processing

#This scenario confirms that a return file message can be sent and processed correctly

    When I send the updated "cohtc-returnFileMessage" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that return test data has been inserted into the ffc-pay-processing database

  Scenario: 04 send COHTC PPA file message and confirm processing

    When I send the updated "cohtc-ppaFileMessage" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

  Scenario: 05 Approve payment from reporting data queue

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting reporting data" link
    When I search for FRN "1258445148"
    When I click on the FRN search button
    And I click on the "Enrich" link
    And I click on the "Irregular" debt type radio button
    And I enter a valid debt discovered date in the past
    Then I take a screenshot for Feature 23 and Scenario 5
    And I click on the "Continue" button
    And I click on the "Back" link
    And I click on the "Sign Out" link

  Scenario: 06 Approve payment in ledger assignment queue

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting ledger assignment" link
    When I search for FRN "1258445148"
    When I click on the FRN search button
    And I click on the "Review" link
    And I click on the "Yes" provisional values radio button
    Then I take a screenshot for Feature 23 and Scenario 6
    And I click on the "Continue" button
    And I am on the "quality-check" subpage
    And I click on the "Sign Out" link

  Scenario: 07 Approve payment from quality check queue

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting quality check" link
    When I search for FRN "1258445148"
    When I click on the FRN search button
    And I click on the "Review" link
    And I click on the "Yes" edited correctly radio button
    Then I take a screenshot for Feature 23 and Scenario 7
    And I click on the "Submit" button
