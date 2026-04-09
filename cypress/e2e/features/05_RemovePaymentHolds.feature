@dev @test @local
Feature: 05 Remove Payment Holds via CSV Upload

  Background:
    Given I visit the "Payment management" homepage
    And I click on the "Manage holds" link
    And I am on the "payment-holds" subpage
    And I click on the "Add or remove holds in bulk" link

  Scenario: 01 Uploading a CSV file with incorrect FRN format
    And the user selects to "Remove" holds
    And the 'Remove' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadInvalid.csv'
    And I click the hold category option for "COHT Capital"
    When I click the Create bulk payment holds button
    Then the 'There was a problem validating your uploaded data.' error message is displayed on the Bulk upload page
    Then I take a screenshot for Feature 5 and Scenario 1

  Scenario: 02 Uploading a file that is not a CSV
    And the user selects to "Remove" holds
    And the 'Remove' holds option is selected
    And I upload bulk payment holds file 'bulkUploadTxt.txt'
    And I click the hold category option for "COHT Capital"
    When I click the Create bulk payment holds button
    Then the 'Provide a CSV file' error message is displayed on the Payment holds page
    Then I take a screenshot for Feature 5 and Scenario 2

  Scenario: 03 Removing holds selectively based on hold category
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'selectiveFrnUpload.csv'
    And I click the hold category option for "COHT Capital"
    And I click the Create bulk payment holds button
    And I am on the "payment-holds" subpage
    And the new holds in 'selectiveFrnUpload.csv' are visible along with the correct timestamp
    And I click the "Add or remove holds in bulk" link
    And the user selects to "Remove" holds
    And the 'Remove' holds option is selected
    And I upload bulk payment holds file 'selectiveFrnRemove.csv'
    And I click the hold category option for "COHT Capital"
    When I click the Create bulk payment holds button
    Then I am on the "payment-holds" subpage
    And the payment requests related to the "selectiveFrnRemove.csv" CSV are not in the table
    Then I take a screenshot for Feature 5 and Scenario 3

  Scenario: 04 Attempting to remove holds without selecting a hold category
    And the user selects to "Remove" holds
    And the 'Remove' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    When I click the Create bulk payment holds button
    Then the 'Category is required' error message is displayed on the Payment holds page
    Then I take a screenshot for Feature 5 and Scenario 4