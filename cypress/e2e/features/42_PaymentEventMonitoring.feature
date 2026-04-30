@local
Feature: 42 Payment Event Monitoring

# npm run cypress:local:one -- "cypress\e2e\features\42_PaymentEventMonitoring.feature"

#####################################READ BEFORE RUNNING##########################################

#As the later scenarios in this feature file are intended to test the ordering and processing of payment request following PPAs,
#Before running this script, 32_SFI23Payments.feature should be ran.
#This will create the data needed for this feature.

##################################################################################################

# This feature file is designed to test functionality of Payment Event Monitoring section in Payment Management UI

  Scenario: 01 Confirm initial elements on View events page

# This scenario confirms that the correct elements are displayed on initial View events page load  

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

  Scenario: 03 Search by FRN on View events page

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
    Then I take a screenshot for Feature 42 and Scenario 3

  Scenario: 04 Search by Batch name on View events page

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
    Then I take a screenshot for Feature 42 and Scenario 4


  Scenario: 05 Click View in Actions column and confirm page

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

    Then I take a screenshot for Feature 42 and Scenario 5

  Scenario: 06 Confirm page elements when no results found

#This scenario confirms that correct page elements are displayed when no results are found in View Events

    Given I visit the "Payment management" homepage
    When I click on the "View events" link

    Then on the View events page I enter "1111111111" into the "frn" field
    Then on the View events page I click the "frn search button"

    Then I should see "No payments found for FRN 1111111111."
    Then I take a screenshot for Feature 42 and Scenario 6

  Scenario: 07 View processed payment requests by scheme

#This scenario confirms that correct page elements are displayed when viewing processed payment requests by scheme

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link

    Then on the View processed payment requests page I select "SFI23" in scheme dropdown
    Then on the View processed payment requests page I click the Continue button

    Then on the View processed payment requests page I confirm that "processed payment requests label" is displayed
    Then on the View processed payment requests page I confirm that "scheme column" is displayed
    Then on the View processed payment requests page I confirm that "number of payments column" is displayed
    Then on the View processed payment requests page I confirm that "value column" is displayed
    Then I take a screenshot for Feature 42 and Scenario 7

  Scenario: 08 Confirm correct message when no results found

#This scenario confirms that correct page elements are displayed when no results are found in View processed payment requests

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link

    Then on the View processed payment requests page I select "SFI" in scheme dropdown
    Then on the View processed payment requests page I click the Continue button
    Then I should see "No processed payment requests found."
    Then I take a screenshot for Feature 42 and Scenario 8

  Scenario: 09 Confirm that payment request data is processed and ordered correctly

    Given I visit the "Payment management" homepage
    When I click on the "View events" link

    Then on the View events page I enter "1258445148" into the "frn" field
    Then on the View events page I click the "frn search button"

  #Confirm that rows are ordered correctly by payment request number  

    Then on the View events page I confirm that rows are ordered correctly by payment request

  #Confirm that first payment request entry has original payment request value of £100,000.00

    Then on the View events page I confirm that "value" of entry number "1" in table is "100,000.00"
    Then on the View events page I confirm that "value" of entry number "2" in table is "10,000.00"

  #Confirm that no fields are blank

    Then on the View events page I confirm that "scheme" of entry number "1" in table is "SFI23"
    Then on the View events page I confirm that "agreement" of entry number "1" in table is "40770826"
    Then on the View events page I confirm that "payment request" of entry number "1" in table is "1"
    Then on the View events page I confirm that "status" of entry number "1" in table is "Settled by payment ledger"
    Then on the View events page I confirm that "last updated" of entry number "1" in table is "Today"

    Then on the View events page I confirm that "scheme" of entry number "2" in table is "SFI23"
    Then on the View events page I confirm that "agreement" of entry number "2" in table is "40770826"
    Then on the View events page I confirm that "payment request" of entry number "2" in table is "2"
    Then on the View events page I confirm that "status" of entry number "2" in table is "Submitted to payment ledger"
    Then on the View events page I confirm that "last updated" of entry number "2" in table is "Today"

    Then I take a screenshot for Feature 42 and Scenario 9
    