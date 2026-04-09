@dev
Feature: 40 Download Statements

# This feature file is designed to test functionality of Download Statements page in Payment Management UI

  Scenario: 01 Confirm Download Statements page loads correctly

  #This scenario confirms that the initial elements on the Download Statements page are displayed correctly and
  #that correct options are available in the select scheme dropdown

    Given I visit the "Payment management" homepage
    When I click on the "Download statements" link

    Then on the Download Statements page I confirm that "page title" is displayed
    Then on the Download Statements page I confirm that "page description" is displayed
    Then on the Download Statements page I confirm that "page instructions" is displayed
    Then on the Download Statements page I confirm that "instruction examples" is displayed
    Then on the Download Statements page I confirm that "filename field" is displayed
    Then on the Download Statements page I confirm that "individual criteria instructions" is displayed
    Then on the Download Statements page I confirm that "select scheme label" is displayed
    Then on the Download Statements page I confirm that "select scheme dropdown" is displayed
    Then on the Download Statements page I confirm that "marketing year label" is displayed
    Then on the Download Statements page I confirm that "marketing year field" is displayed
    Then on the Download Statements page I confirm that "frn label" is displayed
    Then on the Download Statements page I confirm that "frn search instructions" is displayed
    Then on the Download Statements page I confirm that "frn field" is displayed
    Then on the Download Statements page I confirm that "timestamp label" is displayed
    Then on the Download Statements page I confirm that "timestamp search instructions" is displayed
    Then on the Download Statements page I confirm that "timestamp field" is displayed
    Then on the Download Statements page I confirm that "search statements button" is displayed
    Then on the Download Statements page I confirm that "clear button" is displayed

#Confirm correct selections available in Select scheme dropdown

    Then on the Download Statements page I select "SFI" from the select scheme dropdown
    Then on the Download Statements page I select "Delinked" from the select scheme dropdown
    Then I take a screenshot for Feature 40 and Scenario 1

  Scenario: 02 Search by scheme

  #This scenario confirms that statements can be searched for by scheme and 
  #that the correct elements are displayed after carrying out search, 
  #as well as confirming that the correct number of results are displayed based on the search criteria

    Given I visit the "Payment management" homepage
    When I click on the "Download statements" link

#Confirm that result elements are not displayed before search is carried out

    Then on the Download Statements page I confirm that "results sub header" is not displayed
    Then on the Download Statements page I confirm that "number of results" is not displayed
    Then on the Download Statements page I confirm that "scheme column" is not displayed
    Then on the Download Statements page I confirm that "year column" is not displayed
    Then on the Download Statements page I confirm that "frn column" is not displayed
    Then on the Download Statements page I confirm that "timestamp column" is not displayed
    Then on the Download Statements page I confirm that "action column" is not displayed
    Then on the Download Statements page I confirm that "next button" is not displayed

    Then on the Download Statements page I select "Delinked" from the select scheme dropdown
    Then on the Download Statements page I click the "search" button

#Confirm new elements are displayed correctly upon search

    Then on the Download Statements page I confirm that "results sub header" is displayed
    Then on the Download Statements page I confirm that "number of results" is displayed
    Then on the Download Statements page I confirm that "scheme column" is displayed
    Then on the Download Statements page I confirm that "year column" is displayed
    Then on the Download Statements page I confirm that "frn column" is displayed
    Then on the Download Statements page I confirm that "timestamp column" is displayed
    Then on the Download Statements page I confirm that "action column" is displayed
    Then on the Download Statements page I confirm that "next button" is displayed
    Then I take a screenshot for Feature 40 and Scenario 2

  Scenario: 03 Confirm next and previous buttons work correctly

  #This scenario confirms functionality of next/previous in results section

    Given I visit the "Payment management" homepage
    When I click on the "Download statements" link
    Then on the Download Statements page I select "Delinked" from the select scheme dropdown
    Then on the Download Statements page I click the "search" button

#Confirm Next and previous buttons work correctly and page number updates accordingly    

    Then on the Download Statements page I click the "next" button
    Then on the Download Statements page I confirm that the page number on Results sub header is "2"
    Then on the Download Statements page I confirm that "previous button" is displayed
    Then I take a screenshot for Feature 40 and Scenario 3

    Then on the Download Statements page I click the "previous" button
    Then on the Download Statements page I confirm that the page number on Results sub header is "1"
    Then on the Download Statements page I confirm that "previous button" is not displayed

  Scenario: 04 Search by full filename

  #This scenario confirms that statements can be searched for by filename and that statements 
  #can be downloaded successfully from the results section.

    Given I visit the "Payment management" homepage
    When I click on the "Download statements" link

    Then on the Download Statements page I enter "FFC_PaymentDelinkedStatement_DP_2025_1105607649_2025101415310344.pdf" into the "filename" field
    Then on the Download Statements page I click the "search" button

    Then on the Download Statements page I confirm that the page number on Results sub header is "1"

    Then on the Download Statements page I confirm that the text on "number of results" reads "Showing items 1 to 1 on this page (1 items)"

#Due to a known limitation with Cypress where any click of a link will expect a new page to load, clicking the download
#button is causing Cypress to be caught in an endless wait for page loop as the link results in a file download rather than a page load. 
#To get around this, a direct request to the URL of the file is made to confirm it is downloadable, rather than clicking the download button.

    Then on the Download Statements page I confirm that statement can be downloaded
    Then I take a screenshot for Feature 40 and Scenario 4

  Scenario: 05 Search by marketing year

  #This scenario confirms that statements can be searched for by marketing year

    Given I visit the "Payment management" homepage
    When I click on the "Download statements" link

    Then on the Download Statements page I enter "2025" into the "marketing year" field
    Then on the Download Statements page I click the "search" button

    Then on the Download Statements page I confirm that the page number on Results sub header is "1"
    Then on the Download Statements page I confirm that the text on "number of results" reads "Showing items 1 to 50 on this page (50 items)"
    Then I take a screenshot for Feature 40 and Scenario 5

  Scenario: 06 Search by FRN

  #This scenario confirms that statements can be searched for by FRN

    Given I visit the "Payment management" homepage
    When I click on the "Download statements" link

    Then on the Download Statements page I enter "1105607649" into the "frn" field
    Then on the Download Statements page I click the "search" button

    Then on the Download Statements page I confirm that the page number on Results sub header is "1"
    Then on the Download Statements page I confirm that the text on "number of results" reads "Showing items 1 to 5 on this page (5 items)"
    Then I take a screenshot for Feature 40 and Scenario 6

  Scenario: 07 Search by Timestamp

  #This scenario confirms that statements can be searched for by timestamp

    Given I visit the "Payment management" homepage
    When I click on the "Download statements" link

    Then on the Download Statements page I enter "2025101415310344" into the "timestamp" field
    Then on the Download Statements page I click the "search" button

    Then on the Download Statements page I confirm that the page number on Results sub header is "1"
    Then on the Download Statements page I confirm that the text on "number of results" reads "Showing items 1 to 1 on this page (1 items)"
    Then I take a screenshot for Feature 40 and Scenario 7

  Scenario: 08 Clear and start again

  #Confirm that page displays correct behaviour when Clear and start again is clicked after carrying out search

    Given I visit the "Payment management" homepage
    When I click on the "Download statements" link

    Then on the Download Statements page I enter "2025101415310344" into the "timestamp" field
    Then on the Download Statements page I click the "search" button

    Then on the Download Statements page I confirm that the page number on Results sub header is "1"
    Then on the Download Statements page I confirm that the text on "number of results" reads "Showing items 1 to 1 on this page (1 items)"
    Then on the Download Statements page I click the "clear" button

#Confirm that elements from results section are no longer displayed after clicking Clear and start again

    Then on the Download Statements page I confirm that "results sub header" is not displayed
    Then on the Download Statements page I confirm that "number of results" is not displayed
    Then on the Download Statements page I confirm that "scheme column" is not displayed
    Then on the Download Statements page I confirm that "year column" is not displayed
    Then on the Download Statements page I confirm that "frn column" is not displayed
    Then on the Download Statements page I confirm that "timestamp column" is not displayed
    Then on the Download Statements page I confirm that "action column" is not displayed
    Then on the Download Statements page I confirm that "next button" is not displayed
    Then I take a screenshot for Feature 40 and Scenario 8
