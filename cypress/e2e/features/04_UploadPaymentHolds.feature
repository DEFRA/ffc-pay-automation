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

  Scenario: 05 Manage payment hold types - Create
    And I click on the "Manage payment hold types" link
    And I click on the "Create a new payment hold type" button
    And I select the scheme "COHT Capital"
    And I enter "Test" into the "payment hold type name" field
    And I click on the "Save" button
    And I see a success message for "Test has been successfully created"
    And I expand the accordion section "COHT Capital"
    And I see "Test" in the table
    Then I take a screenshot

  Scenario: 06 Manage payment hold types - Edit
    And I click on the "Manage payment hold types" link
    And I expand the accordion section "COHT Capital"
    And I see "Test" in the table
    And I click "Edit" for table value "Test"
    And I enter "Edited Test" into the "payment hold type name" field
    And I click on the "Save" button
    And I see a success message for "Edited Test has been successfully renamed."
    And I expand the accordion section "COHT Capital"
    And I see "Edited Test" in the table
    Then I take a screenshot


  Scenario: 07 Manage payment hold types - Delete
    And I click on the "Manage payment hold types" link
    And I expand the accordion section "COHT Capital"
    And I see "Edited Test" in the table
    And I click "Remove" for table value "Edited Test"
    And I click on the "Yes, remove" button
    And I see a success message for "Edited Test has been successfully removed."
    And I expand the accordion section "COHT Capital"
    And I do not see "Edited Test" in the table
    Then I take a screenshot