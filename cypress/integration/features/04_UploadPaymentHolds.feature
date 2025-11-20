@dev @local
Feature: 04 Upload and Process Payment Holds via CSV

  Background:
    Given I visit the "Payment management" homepage
    And I click on the "Manage holds" link
    And I am on the "payment-holds" subpage

  Scenario: 01 Successfully uploading a CSV file applying holds & uploading a CSV file removing holds
    And I click on the "Add or remove holds in bulk" link
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    And I click the hold category option for "FDMR"
    And I click the Create bulk payment holds button
    And I am on the "payment-holds" subpage
    And the new holds in 'frnsBulkUploadValid.csv' are visible along with the correct timestamp
    And I click the "Add or remove holds in bulk" link
    And the user selects to "Remove" holds
    And the 'Remove' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    And I click the hold category option for "FDMR"
    When I click the Create bulk payment holds button
    Then I am on the "payment-holds" subpage
    Then I take a screenshot for Feature 4 and Scenario 1
    And the payment requests related to the "frnsBulkUploadValid.csv" CSV are not in the table

  @test
  Scenario: 02 Uploading a CSV file with no selected hold reason
    And I click on the "Add or remove holds in bulk" link
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    When I click the Create bulk payment holds button
    Then I take a screenshot for Feature 4 and Scenario 2
    Then the 'Category is required' error message is displayed on the Payment holds page

  @test
  Scenario: 03 Uploading a file that is not a CSV
    And I click on the "Add or remove holds in bulk" link
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'bulkUploadTxt.txt'
    And I click the hold category option for "FDMR"
    When I click the Create bulk payment holds button
    Then I take a screenshot for Feature 4 and Scenario 3
    Then the 'Provide a CSV file' error message is displayed on the Payment holds page

  @test
  Scenario: 04 Uploading a CSV file with incorrect FRN format
    And I click on the "Add or remove holds in bulk" link
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadInvalid.csv'
    And I click the hold category option for "FDMR"
    When I click the Create bulk payment holds button
    Then I take a screenshot for Feature 4 and Scenario 4
    Then the 'There was a problem validating your uploaded data.' error message is displayed on the Bulk upload page

  @test
  Scenario: 05 Uploading a CSV file which is too large
    And I click on the "Add or remove holds in bulk" link
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadBulk.csv'
    And I click the hold category option for "FDMR"
    When I click the Create bulk payment holds button
    Then I take a screenshot for Feature 4 and Scenario 5
    Then the 'The uploaded file is too large. Please upload a file smaller than 1 MB.' error message is displayed on the Payment holds page