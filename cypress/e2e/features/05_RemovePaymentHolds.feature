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
    And I select the scheme "COHT Capital"
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Remove holds" button
    And I see an error message for "There was a problem validating your uploaded data."
    Then I take a screenshot

  Scenario: 02 Uploading a file that is not a CSV
    And I click on the "Remove payment holds in bulk" link
    And I upload bulk payment holds file 'bulkUploadTxt.txt'
    And I select the scheme "COHT Capital"
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Remove holds" button
    And I see an error message for "Provide a CSV file"
    Then I take a screenshot

  Scenario: 03 Removing holds selectively based on hold category
    And I click on the "Add payment holds in bulk" link
    And I upload bulk payment holds file 'selectiveFrnUpload.csv'
    And I select the scheme "COHT Capital"
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Add holds" button
    And I wait for 1000 milliseconds

    And I click on the "Manage payment holds" link
    And I click on the "Search for a payment hold" link
    And the new holds in 'selectiveFrnUpload.csv' are visible along with the correct timestamp

    And I click on the "Manage payment holds" link
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Remove payment holds in bulk" link
    And I upload bulk payment holds file 'selectiveFrnRemove.csv'
    And I select the scheme "COHT Capital"
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Remove holds" button

    And I click on the "Manage payment holds" link
    And I click on the "Search for a payment hold" link
    And the payment requests related to the "selectiveFrnRemove.csv" CSV are not in the table
    Then I take a screenshot

  Scenario: 04 Attempting to remove holds without selecting a hold category
    And I click on the "Remove payment holds in bulk" link
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    And I click on the "Remove holds" button
    Then I see an error message for "Scheme is required"
    Then I take a screenshot
