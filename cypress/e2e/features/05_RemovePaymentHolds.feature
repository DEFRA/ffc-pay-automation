@dev @test @local
Feature: 05 Remove Payment Holds via CSV Upload

# npm run cypress:test:one -- "cypress\e2e\features\05_RemovePaymentHolds.feature"
# npm run cypress:dev:one -- "cypress\e2e\features\05_RemovePaymentHolds.feature"
# npm run cypress:local:one -- "cypress\e2e\features\05_RemovePaymentHolds.feature"

  Background:
    Given I visit the "Payment management" homepage
    And I click on the "Manage payment holds" link
    And I click on the "Manage payment holds in bulk" link

  Scenario: 01 Uploading a CSV file with incorrect FRN format
    And I click on the "Remove payment holds in bulk" link
    And I upload bulk payment holds file 'frnsBulkUploadInvalid.csv'
    Then on the Payment Holds page I enter "COHT Capital" in the scheme filter box
    And I click on the "Remove holds" button
    Then the 'There was a problem validating your uploaded data.' error message is displayed on the Bulk upload page
    Then I take a screenshot for Feature 5 and Scenario 1

  Scenario: 02 Uploading a file that is not a CSV
    And I click on the "Remove payment holds in bulk" link
    And I upload bulk payment holds file 'bulkUploadTxt.txt'
    Then on the Payment Holds page I enter "COHT Capital" in the scheme filter box
    And I click on the "Remove holds" button
    Then the 'Provide a CSV file' error message is displayed on the Payment holds page
    Then I take a screenshot for Feature 5 and Scenario 2

  Scenario: 03 Removing holds selectively based on hold category
    And I click on the "Add payment holds in bulk" link
    And I upload bulk payment holds file 'selectiveFrnUpload.csv'
    Then on the Payment Holds page I enter "COHT Capital" in the scheme filter box
    And I click on the "Add holds" button

    And I click on the "Manage payment holds" link
    And I click on the "Search for a payment hold" link
    And the new holds in 'selectiveFrnUpload.csv' are visible along with the correct timestamp

    And I click on the "Manage payment holds" link
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Remove payment holds in bulk" link
    And I upload bulk payment holds file 'selectiveFrnRemove.csv'
    Then on the Payment Holds page I enter "COHT Capital" in the scheme filter box
    And I click on the "Remove holds" button

    And I click on the "Manage payment holds" link
    And I click on the "Search for a payment hold" link
    And the payment requests related to the "selectiveFrnRemove.csv" CSV are not in the table
    Then I take a screenshot for Feature 5 and Scenario 3

  Scenario: 04 Attempting to remove holds without selecting a hold category
    And I click on the "Remove payment holds in bulk" link
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    And I click on the "Remove holds" button
    Then the 'Category is required' error message is displayed on the Payment holds page
    Then I take a screenshot for Feature 5 and Scenario 4
