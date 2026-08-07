Feature: 40 Download Statements

# npm run cypress:dev:one -- "cypress\e2e\features\40_DownloadStatements.feature"

# This feature file is designed to test functionality of Statements tile page in Payment Management UI

  
  @local
  Scenario: 00 Data setup for local env
  #This scenario sets up statements in the environment so we can download them. Local only since statements already exist in Dev
    Given I restart the local environment
    Then I insert Delinked Payments specific data into Statement Data service
    Then I insert SFI 23 specific data into Statement Data service
   #we restart the process here because it ensure we pick up the new data we have put in, otherwise it doesnt manage it in time
    And I restart the statement data service
  #Cant verify its there just yet as seems to be hardcoded for a sbi we are not using atm - needs to be fixed
  #But it works
  
  
  @local @dev
  Scenario: 01 Confirm Download Statements page loads correctly

  #This scenario confirms that the initial elements on the Download Statements page are displayed correctly 

    Given I visit the "Payment management" homepage
    When I click on the "Download payment statements" link

    Then on the Download Statements page I confirm that "page title" is displayed
    Then on the Download Statements page I confirm that "page description" is displayed
    Then on the Download Statements page I confirm that "page instructions" is displayed
    #Then on the Download Statements page I confirm that "instruction examples" is displayed
    #Then on the Download Statements page I confirm that "filename field" is displayed
    #Then on the Download Statements page I confirm that "individual criteria instructions" is displayed
    Then on the Download Statements page I confirm that "select scheme SFI Radio" is displayed
    Then on the Download Statements page I confirm that "select scheme Delinked Radio" is displayed
    Then on the Download Statements page I confirm that "marketing year label" is displayed
    Then on the Download Statements page I confirm that "marketing year field" is displayed
    Then on the Download Statements page I confirm that "frn label" is displayed
    #Then on the Download Statements page I confirm that "frn search instructions" is displayed
    Then on the Download Statements page I confirm that "frn field" is displayed
    Then on the Download Statements page I confirm that "timestamp label" is displayed
    Then on the Download Statements page I confirm that "timestamp search instructions" is displayed
    Then on the Download Statements page I confirm that "timestamp field" is displayed
    Then on the Download Statements page I confirm that "search statements button" is displayed
    Then on the Download Statements page I confirm that "clear button" is displayed

#Confirm correct selections available in Scheme radio buttons
    Then I click on the "Delinked" radio button
    Then I click on the "SFI" radio button
    Then I take a screenshot for Feature 40 and Scenario 1

  @local @dev
  Scenario: 02 Search by scheme

  #This scenario confirms that statements can be searched for by scheme and 
  #that the correct elements are displayed after carrying out search, 
  #as well as confirming that the correct number of results are displayed based on the search criteria

    Given I visit the "Payment management" homepage
    When I click on the "Download payment statements" link
    Then I click on the "Delinked" radio button
    Then I click on the "Search" button

#Confirm new elements are displayed correctly upon search

    Then on the Download Statements page I confirm that "statements sub header and number of results" is displayed
    Then on the Download Statements page I confirm that "scheme column" is displayed
    Then on the Download Statements page I confirm that "year column" is displayed
    Then on the Download Statements page I confirm that "frn column" is displayed
    Then on the Download Statements page I confirm that "timestamp column" is displayed
    Then on the Download Statements page I confirm that "action column" is displayed
    Then on the Download Statements page I confirm that "next button" is displayed
    Then I take a screenshot for Feature 40 and Scenario 2
  
  @dev
  Scenario: 03 Confirm next and previous buttons work correctly

  #This scenario confirms functionality of next/previous in results section
  #Dev only rn because I havent added in a system to have enough data in the local env for a run yet
    Given I visit the "Payment management" homepage
    When I click on the "Download payment statements" link
    Then I click on the "Delinked" radio button
    Then I click on the "Search" button

#Confirm Next and previous buttons work correctly and page number updates accordingly    

    Then I click the pagination "next"
    Then the current pagination page number is "2"
    Then I verify the pagination "previous" is visible
    Then I take a screenshot for Feature 40 and Scenario 3

    Then I click the pagination "previous"
    Then the current pagination page number is "1"
    Then I verify the pagination "previous" is not visible

  @dev
  Scenario: 04 Search by full filename

  #This scenario confirms that statements can be searched for by filename and that statements 
  #can be downloaded successfully from the results section.

    Given I visit the "Payment management" homepage
    When I click on the "Download payment statements" link

    Then I enter "FFC_PaymentDelinkedStatement_DP_2025_1105607649_2025101415310344.pdf" into the "filename" field
    Then I click on the "Search" button

#Commented out for now as the pagination changes are not here yet 
    #Then the current pagination page number is "1"

    #Then on the Download Statements page I confirm that the text on "number of results" reads "Showing items 1 to 1 on this page (1 items)"

#Due to a known limitation with Cypress where any click of a link will expect a new page to load, clicking the download
#button is causing Cypress to be caught in an endless wait for page loop as the link results in a file download rather than a page load. 
#To get around this, a direct request to the URL of the file is made to confirm it is downloadable, rather than clicking the download button.

    Then on the Download Statements page I confirm that statement can be downloaded
    Then I take a screenshot for Feature 40 and Scenario 4
  @dev @local
  Scenario: 05 Search by marketing year

  #This scenario confirms that statements can be searched for by marketing year

    Given I visit the "Payment management" homepage
    When I click on the "Download payment statements" link

    Then I enter "2024" into the "marketing year" field
    Then I click on the "Search" button

    Then the current pagination page number is "1"
   # Below does not show anymore, keeping as it may be added back at somepoint. Even if result is over 100 it just shows [123] statements with 100 viewable minimum at a time
   # Then on the Download Statements page I confirm that the text on "number of results" reads "Showing items 1 to 50 on this page (50 items)"
    Then I take a screenshot for Feature 40 and Scenario 5

  @dev
  Scenario: 06 Search by FRN - dev

  #This scenario confirms that statements can be searched for by FRN

    Given I visit the "Payment management" homepage
    When I click on the "Download payment statements" link

    Then I enter "1105607649" into the "frn" field
    Then I click on the "Search" button

    Then the current pagination page number is "1"
    #Then on the Download Statements page I confirm that the text on "number of results" reads "Showing items 1 to 6 on this page (6 items)"
    Then I take a screenshot for Feature 40 and Scenario 6


  @local
  Scenario: 07 Search by FRN - local

  #This scenario confirms that statements can be searched for by FRN

    Given I visit the "Payment management" homepage
    When I click on the "Download payment statements" link

    Then I enter "1234567890" into the "frn" field
    Then I click on the "Search" button

    Then on the Download Statements page I confirm that the page number is "[1]"
    #Then on the Download Statements page I confirm that the text on "number of results" reads "Showing items 1 to 6 on this page (6 items)"
    Then I take a screenshot for Feature 40 and Scenario 7

  @dev
  Scenario: 08 Search by Timestamp

  #This scenario confirms that statements can be searched for by timestamp

    Given I visit the "Payment management" homepage
    When I click on the "Download payment statements" link

    Then I enter "29-06-2026 13:38" into the "timestamp" field
    Then I click on the "Search" button

    Then the current pagination page number is "1"
    #Then on the Download Statements page I confirm that the text on "number of results" reads "Showing items 1 to 1 on this page (1 items)"
    Then I take a screenshot for Feature 40 and Scenario 8

  @local @dev
  Scenario: 09 Clear and start again

  #Confirm that page displays correct behaviour when Clear and start again is clicked after carrying out search

    Given I visit the "Payment management" homepage
    When I click on the "Download payment statements" link

    Then I click on the "Delinked" radio button
    Then I click on the "Search" button
    
    Then on the Download Statements page I confirm that "statements sub header and number of results" is displayed
    Then on the Download Statements page I confirm that "scheme column" is displayed
    Then on the Download Statements page I confirm that "year column" is displayed
    Then on the Download Statements page I confirm that "frn column" is displayed
    Then on the Download Statements page I confirm that "timestamp column" is displayed
    Then on the Download Statements page I confirm that "action column" is displayed
    Then on the Download Statements page I confirm that "next button" is displayed

    Then I click on the "start a new search" link

#Confirm that the table is no longer displayed after clicking Clear and start again

    Then on the Download Statements page I confirm that no statement results are displayed
    Then I take a screenshot for Feature 40 and Scenario 9
    
