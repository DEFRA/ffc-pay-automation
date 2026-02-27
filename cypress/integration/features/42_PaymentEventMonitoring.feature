@local
Feature: 42 Payment Event Monitoring

# This feature file is designed to test functionality of Payment Event Monitoring section in Payment Management UI

  Scenario: 01 Confirm initial elements on View events page

# This scenario confirms that the correct elements are displayed on initial View events page load  

    Given I restart the local environment
    Given I visit the "Payment management" homepage
    When I click on the "View events" link

    Then on the View events page I confirm that "sub header" is displayed
    Then on the View events page I confirm that "frn search instructions" is displayed
    Then on the View events page I confirm that "frn search example" is displayed
    Then on the View events page I confirm that "frn search field" is displayed
    Then on the View events page I confirm that "frn search button" is displayed
    Then on the View events page I confirm that "batch search instructions" is displayed
    Then on the View events page I confirm that "batch search example" is displayed
    Then on the View events page I confirm that "batch search field" is displayed
    Then on the View events page I confirm that "batch search button" is displayed
    Then I take a screenshot for Feature 42 and Scenario 1


  Scenario: 02 Confirm initial elements on View processed payment requests page

# This scenario confirms that the correct elements are displayed on initial View processed payment requests page load  

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link

    Then on the View processed payment requests page I confirm that "sub header" is displayed
    Then on the View processed payment requests page I confirm that "select scheme label" is displayed
    Then on the View processed payment requests page I confirm that "select scheme dropdown" is displayed
    Then on the View processed payment requests page I confirm that "select scheme button" is displayed
    Then I take a screenshot for Feature 42 and Scenario 2

  Scenario: 03 Load payment test data for later scenarios

# This scenario loads payment data for use in following scenarios  

    When I send the updated "sfi23-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#The following step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Pay Submission Service have been correctly added to the generated statement

    Then I pull sfi23 payments file from Azure Blob Storage and confirm that correct values have been generated

#Send return file

    When I send the updated "sfi23-returnFileMessage" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that return test data has been inserted into the ffc-pay-processing database

  Scenario: 04 Search by FRN on View events page

#This scenario confirms that correct page elements are displayed when searching events by FRN  

    Given I visit the "Payment management" homepage
    When I click on the "View events" link

    Then on the View events page I enter "1258445148" into the "frn" field
    Then on the View events page I click the "frn search button"

    Then on the View events page I confirm that "sub header" is displayed
    Then on the View events page I confirm that "frn searched label" is displayed
    Then on the View events page I confirm that "scheme column" is displayed
    Then on the View events page I confirm that "agreement column" is displayed
    Then on the View events page I confirm that "payment request column" is displayed
    Then on the View events page I confirm that "value column" is displayed
    Then on the View events page I confirm that "status column" is displayed
    Then on the View events page I confirm that "last updated column" is displayed
    Then on the View events page I confirm that "actions column" is displayed
    Then I take a screenshot for Feature 42 and Scenario 4

  Scenario: 05 Search by Batch name on View events page

#This scenario confirms that correct page elements are displayed when searching events by Batch name  

    Given I visit the "Payment management" homepage
    When I click on the "View events" link

    Then on the View events page I enter "SITISFIA0001_AP_20230810085609205.dat" into the "batch" field
    Then on the View events page I click the "batch search button"

    Then on the View events page I confirm that "sub header" is displayed
    Then on the View events page I confirm that "view batch label" is displayed
    Then on the View events page I confirm that "scheme column" is displayed
    Then on the View events page I confirm that "batch frn column" is displayed
    Then on the View events page I confirm that "batch year column" is displayed
    Then on the View events page I confirm that "batch agreement column" is displayed
    Then on the View events page I confirm that "batch request column" is displayed
    Then on the View events page I confirm that "batch value column" is displayed
    Then on the View events page I confirm that "batch status column" is displayed
    Then on the View events page I confirm that "batch actions column" is displayed
    Then I take a screenshot for Feature 42 and Scenario 5


  Scenario: 06 Click View in Actions column and confirm page

#This scenario confirms that correct page elements are displayed when clicking View link in the Actions column

    Given I visit the "Payment management" homepage
    When I click on the "View events" link

    Then on the View events page I enter "1258445148" into the "frn" field
    Then on the View events page I click the "frn search button"
    Then on the View events page I click the "view link"

    Then on the View events page I confirm that "sub header" is displayed
    Then on the View events page I confirm that "view frn label" is displayed

  #Confirm expected entries are present in table  

    Then I should see "Enriched with mandatory data"
    Then I should see "Final state calculated"
    Then I should see "Submitted to payment ledger"
    Then I should see "Settled"
    Then I should see "Acknowledged"

    Then I take a screenshot for Feature 42 and Scenario 6

  Scenario: 07 Confirm page elements when no results found

#This scenario confirms that correct page elements are displayed when no results are found in View Events

    Given I visit the "Payment management" homepage
    When I click on the "View events" link

    Then on the View events page I enter "1111111111" into the "frn" field
    Then on the View events page I click the "frn search button"

    Then I should see "No payments found for FRN 1111111111."
    Then I take a screenshot for Feature 42 and Scenario 7

  Scenario: 08 View processed payment requests by scheme

#This scenario confirms that correct page elements are displayed when viewing processed payment requests by scheme

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link

    Then on the View processed payment requests page I select "SFI23" in scheme dropdown
    Then on the View processed payment requests page I click the Continue button

    Then on the View processed payment requests page I confirm that "processed payment requests label" is displayed
    Then on the View processed payment requests page I confirm that "scheme column" is displayed
    Then on the View processed payment requests page I confirm that "number of payments column" is displayed
    Then on the View processed payment requests page I confirm that "value column" is displayed
    Then I take a screenshot for Feature 42 and Scenario 8

  Scenario: 09 Confirm correct message when no results found

#This scenario confirms that correct page elements are displayed when no results are found in View processed payment requests

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link

    Then on the View processed payment requests page I select "SFI" in scheme dropdown
    Then on the View processed payment requests page I click the Continue button
    Then I should see "No processed payment requests found."
    Then I take a screenshot for Feature 42 and Scenario 9
