@dev @test @local
Feature: 04 Upload and Process Payment Holds via CSV

# npm run cypress:test:one -- "cypress\e2e\features\04_UploadPaymentHolds.feature"
# npm run cypress:dev:one -- "cypress\e2e\features\04_UploadPaymentHolds.feature"
# npm run cypress:local:one -- "cypress\e2e\features\04_UploadPaymentHolds.feature"

  Background:
    Given I visit the "Payment management" homepage
    And I click on the "Manage payment holds" link
    And I am on the "payment-holds" subpage

  Scenario: 01 Successfully uploading a CSV file applying holds & uploading a CSV file removing holds
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Add payment holds in bulk" link
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    Then on the Payment Holds page I enter "COHT Capital" in the scheme filter box
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Add holds" button

    And I click on the "Manage payment holds" link
    And I click on the "Search for a payment hold" link
    And the new holds in 'frnsBulkUploadValid.csv' are visible along with the correct timestamp

    And I click on the "Manage payment holds" link
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Remove payment holds in bulk" link
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    Then on the Payment Holds page I enter "COHT Capital" in the scheme filter box
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Remove holds" button
    
    And I click on the "Manage payment holds" link
    And I click on the "Search for a payment hold" link
    Then I take a screenshot for Feature 4 and Scenario 1
    And the payment requests related to the "frnsBulkUploadValid.csv" CSV are not in the table


  Scenario: 02 Uploading a file that is not a CSV
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Add payment holds in bulk" link
    And I upload bulk payment holds file 'bulkUploadTxt.txt'
    Then on the Payment Holds page I enter "COHT Capital" in the scheme filter box
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Add holds" button
    Then I take a screenshot for Feature 4 and Scenario 2
    Then the 'Provide a CSV file' error message is displayed on the Payment holds page


  Scenario: 03 Uploading a CSV file with incorrect FRN format
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Add payment holds in bulk" link
    And I upload bulk payment holds file 'frnsBulkUploadInvalid.csv'
    Then on the Payment Holds page I enter "COHT Capital" in the scheme filter box
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Add holds" button
    Then I take a screenshot for Feature 4 and Scenario 3
    Then the 'There was a problem validating your uploaded data.' error message is displayed on the Bulk upload page


  Scenario: 04 Uploading a CSV file which is too large
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Add payment holds in bulk" link
    And I upload bulk payment holds file 'frnsBulkUploadBulk.csv'
    Then on the Payment Holds page I enter "COHT Capital" in the scheme filter box
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Add holds" button
    Then I take a screenshot for Feature 4 and Scenario 4
    Then the 'The uploaded file is too large. Please upload a file smaller than 1 MB.' error message is displayed on the Payment holds page