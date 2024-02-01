Feature: 04 Upload and Process Payment Holds via CSV

  Background:
    Given I visit the "Payment management" homepage
    And I click on the "Manage holds" link
    And I am on the "payment-holds" subpage

  Scenario: 01 Successfully uploading a CSV file and applying holds
    When I click on the "Add or remove holds in bulk" link
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    And I click the hold category option
    When I click the Create bulk payment holds button
    Then I am on the "payment-holds" subpage
    And the new holds in 'frnsBulkUploadValid.csv' are visible along with the correct timestamp

  Scenario: 02 Uploading a CSV file with no selected hold reason
    And I click on the "Add or remove holds in bulk" link
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    When I click the Create bulk payment holds button
    Then the 'Category is required' error message is displayed on the Payment holds page

  Scenario: 03 Uploading a file that is not a CSV
    And I click on the "Add or remove holds in bulk" link
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'bulkUploadTxt.txt'
    And I click the hold category option
    When I click the Create bulk payment holds button
    Then the 'Provide a CSV file' error message is displayed on the Payment holds page

  Scenario: 04 Uploading a CSV file with incorrect FRN format
    And I click on the "Add or remove holds in bulk" link
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadInvalid.csv'
    And I click the hold category option
    When I click the Create bulk payment holds button
    Then the 'A provided FRN is not in the required format' error message is displayed on the Payment holds page