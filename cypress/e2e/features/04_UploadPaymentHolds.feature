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
    And I select the scheme "COHT Capital"
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Add holds" button

    And I click on the "Manage payment holds" link
    And I click on the "Search for a payment hold" link
    And the new holds in 'frnsBulkUploadValid.csv' are visible along with the correct timestamp

    And I click on the "Manage payment holds" link
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Remove payment holds in bulk" link
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    And I select the scheme "COHT Capital"
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Remove holds" button
    
    And I click on the "Manage payment holds" link
    And I click on the "Search for a payment hold" link
    Then I take a screenshot
    And the payment requests related to the "frnsBulkUploadValid.csv" CSV are not in the table


  Scenario: 02 Uploading a file that is not a CSV
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Add payment holds in bulk" link
    And I upload bulk payment holds file 'bulkUploadTxt.txt'
    And I select the scheme "COHT Capital"
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Add holds" button
    Then I take a screenshot
    And I see an error message for "Provide a CSV file"



  Scenario: 03 Uploading a CSV file with incorrect FRN format
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Add payment holds in bulk" link
    And I upload bulk payment holds file 'frnsBulkUploadInvalid.csv'
    And I select the scheme "COHT Capital"
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Add holds" button
    And I see an error message for "There was a problem validating your uploaded data."
    Then I take a screenshot


  Scenario: 04 Uploading a CSV file which is too large
    And I click on the "Manage payment holds in bulk" link
    And I click on the "Add payment holds in bulk" link
    And I upload bulk payment holds file 'frnsBulkUploadBulk.csv'
    And I select the scheme "COHT Capital"
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I click on the "Add holds" button
    And I see an error message for "The uploaded file is too large. Please upload a file smaller than 1 MB."
    Then I take a screenshot