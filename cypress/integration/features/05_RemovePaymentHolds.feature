@dev
Feature: 05 Remove Payment Holds via CSV Upload

  Background:
    Given I visit the "Payment management" homepage
    And I click on the "Manage holds" link
    And I am on the "payment-holds" subpage
    And I click on the "Add or remove holds in bulk" link

  @test
  Scenario: 01 Uploading a CSV file with incorrect FRN format
    And the user selects to "Remove" holds
    And the 'Remove' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadInvalid.csv'
    And I click the hold category option for "FDMR"
    When I click the Create bulk payment holds button
    Then the 'A provided FRN is not in the required format' error message is displayed on the Payment holds page

  @test
  Scenario: 02 Uploading a file that is not a CSV
    And the user selects to "Remove" holds
    And the 'Remove' holds option is selected
    And I upload bulk payment holds file 'bulkUploadTxt.txt'
    And I click the hold category option for "FDMR"
    When I click the Create bulk payment holds button
    Then the 'Provide a CSV file' error message is displayed on the Payment holds page

  Scenario: 03 Removing holds selectively based on hold category
    And the 'Add' holds option is selected
    And I upload bulk payment holds file 'selectiveFrnUpload.csv'
    And I click the hold category option for "FDMR"
    And I click the Create bulk payment holds button
    And I am on the "payment-holds" subpage
    And the new holds in 'selectiveFrnUpload.csv' are visible along with the correct timestamp
    And I click the "Add or remove holds in bulk" link
    And the user selects to "Remove" holds
    And the 'Remove' holds option is selected
    And I upload bulk payment holds file 'selectiveFrnRemove.csv'
    And I click the hold category option for "FDMR"
    When I click the Create bulk payment holds button
    Then I am on the "payment-holds" subpage
    And the payment requests related to the "selectiveFrnRemove.csv" CSV are not in the table

  @test
  Scenario: 04 Attempting to remove holds without selecting a hold category
    And the user selects to "Remove" holds
    And the 'Remove' holds option is selected
    And I upload bulk payment holds file 'frnsBulkUploadValid.csv'
    When I click the Create bulk payment holds button
    Then the 'Category is required' error message is displayed on the Payment holds page