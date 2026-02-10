@local
Feature: 15 Manual Payments
 
# This feature file is designed to test the Manual Payments page in Payment Management.
 
  Scenario: 01 Confirm Manual Payments page elements are visible

  #This scenario confirms that the Manual Payments page is accessible from the Payment Management homepage
  #and that all the expected elements are present on the page

  #First line will clear out and restart all payment services to ensure a clean environment for the tests

    Given I restart the local environment
    Given I visit the "Payment management" homepage
    When I click on the "Upload manual payment" link
    Then I am on the "manual-payments" subpage
    Then I take a screenshot for Feature 15 and Scenario 01
    Then on the Manual Payments page I confirm that "page title" is present
    Then on the Manual Payments page I confirm that "page description" is present
    Then on the Manual Payments page I confirm that "choose file button" is present
    Then on the Manual Payments page I confirm that "upload button" is present
    Then on the Manual Payments page I confirm that "manual payments guidance link" is present
    Then on the Manual Payments page I confirm that "upload history table" is present

  Scenario: 02 Confirm that valid Manual Payments file can be processed successfully

#This scenario confirms that a valid Manual Payments CSV file can be uploaded and processed successfully

    Given I visit the "Payment management" homepage
    When I click on the "Upload manual payment" link
    Then I am on the "manual-payments" subpage
    When on the Manual Payments page I enter "FFC_Manual_Batch_202309121043.csv" as the file to upload
    When on the Manual Payments page I click the "upload button"
    Then on the Manual Payments page I confirm that "file upload confirmation message" is present
    Then on the Manual Payments page I confirm that "return button" is present
    Then I take a screenshot for Feature 15 and Scenario 02
    When on the Manual Payments page I click the "return button"
    Then on the Manual Payments page I confirm that entry with filename "FFC_Manual_Batch_202309121043.csv" has been added to Upload History
    Then I confirm that payment test data has been inserted into the ffc-pay-injection database

    Then I pull manual payments file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 03 Confirm that attempting to upload duplicate file produces appropriate error message

#This scenario confirms that attempting to upload a file that has already been processed produces the correct error message  

    Given I visit the "Payment management" homepage
    When I click on the "Upload manual payment" link
    Then I am on the "manual-payments" subpage
    When on the Manual Payments page I enter "FFC_Manual_Batch_202309121043.csv" as the file to upload
    When on the Manual Payments page I click the "upload button"
    Then on the Manual Payments page I confirm that "duplicate file error message" is present
    Then on the Manual Payments page I confirm that "error return button" is present
    Then I take a screenshot for Feature 15 and Scenario 03

  Scenario: 04 Confirm that invalid Manual Payments file type produces appropriate error message

#This scenario confirms that attempting to upload a file that is not a CSV produces the correct error message

    Given I visit the "Payment management" homepage
    When I click on the "Upload manual payment" link
    Then I am on the "manual-payments" subpage
    When on the Manual Payments page I enter "FFC_Manual_Batch_202309121043.txt" as the file to upload
    When on the Manual Payments page I click the "upload button"
    Then on the Manual Payments page I confirm that "invalid file type error message" is present
    Then I take a screenshot for Feature 15 and Scenario 04

  Scenario: 05 Confirm that invalid Manual Payments filename produces appropriate error message

#This scenario confirms that attempting to upload a file with an incorrect filename produces the correct error message

    Given I visit the "Payment management" homepage
    When I click on the "Upload manual payment" link
    Then I am on the "manual-payments" subpage
    When on the Manual Payments page I enter "FFC_TEST_Manual_Batch_202309121043.csv" as the file to upload
    When on the Manual Payments page I click the "upload button"
    Then on the Manual Payments page I confirm that "invalid name error message" is present
    Then I take a screenshot for Feature 15 and Scenario 05

  Scenario: 06 Confirm that invalid file size produces appropriate error message

#     #This scenario confirms that attempting to upload a file with an invalid filesize produces the correct error message

    Given I visit the "Payment management" homepage
    When I click on the "Upload manual payment" link
    Then I am on the "manual-payments" subpage
    When on the Manual Payments page I enter "FFC_Manual_Batch_202309121044.csv" as the file to upload
    When on the Manual Payments page I click the "upload button"
    Then on the Manual Payments page I confirm that "invalid file size message" is present
    Then I take a screenshot for Feature 15 and Scenario 06

  Scenario: 07 Confirm that empty file produces appropriate error message

#     #This scenario confirms that attempting to upload an empty file produces the correct error message

    Given I visit the "Payment management" homepage
    When I click on the "Upload manual payment" link
    Then I am on the "manual-payments" subpage
    When on the Manual Payments page I enter "FFC_Manual_Batch_202309121045.csv" as the file to upload
    When on the Manual Payments page I click the "upload button"
    Then on the Manual Payments page I confirm that "empty file message" is present
    Then I take a screenshot for Feature 15 and Scenario 07

  Scenario: 08 Upload History table

#This scenario confirms that the View Payment status link directs to the correct page and that expected FRN values are present  

    Given I visit the "Payment management" homepage
    When I click on the "Upload manual payment" link
    Then I am on the "manual-payments" subpage
    Then on the Manual Payments page I click the View payment status link and confirm that expected FRN values are present
    Then I take a screenshot for Feature 15 and Scenario 08