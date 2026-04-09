@dev
Feature: 38 Management Information

# This feature file is designed to test functionality of Management Information page in Payment Management UI

  Scenario: 01 Confirm Management Information page loads correctly

    Given I visit the "Payment management" homepage
    When I click on the "View management information" link

#Click on help link to ensure that all possible screen elements are visible simultaneously

    And on the Management Information page I click on the "help with this page" button

#Confirms present of elements on page

    And on the Management Information page I confirm that "page title" is displayed
    And on the Management Information page I confirm that "page description" is displayed
    And on the Management Information page I confirm that "help dropdown" is displayed
    And on the Management Information page I confirm that "help description" is displayed
    And on the Management Information page I confirm that "show all description" is displayed
    And on the Management Information page I confirm that "year to date description" is displayed
    And on the Management Information page I confirm that "by year description" is displayed
    And on the Management Information page I confirm that "by month description" is displayed
    And on the Management Information page I confirm that "this month description" is displayed
    And on the Management Information page I confirm that "last 7 days description" is displayed
    And on the Management Information page I confirm that "last 24 hours description" is displayed
    And on the Management Information page I confirm that "payment values description" is displayed
    And on the Management Information page I confirm that "print and post description" is displayed
    And on the Management Information page I confirm that "time period filter dropdown" is displayed
    And on the Management Information page I confirm that "time period filter button" is displayed
    And on the Management Information page I confirm that "payment metrics sub header" is displayed
    And on the Management Information page I confirm that "payments panel" is displayed
    And on the Management Information page I confirm that "payments count" is displayed
    And on the Management Information page I confirm that "total value panel" is displayed
    And on the Management Information page I confirm that "total value amount" is displayed
    And on the Management Information page I confirm that "breakdown description" is displayed
    And on the Management Information page I confirm that "payment scheme column" is displayed
    And on the Management Information page I confirm that "total payments column" is displayed
    And on the Management Information page I confirm that "total value column" is displayed
    And on the Management Information page I confirm that "pending column" is displayed
    And on the Management Information page I confirm that "processed column" is displayed
    And on the Management Information page I confirm that "documents metrics sub header" is displayed
    And on the Management Information page I confirm that "documents issued" is displayed
    And on the Management Information page I confirm that "documents count" is displayed
    And on the Management Information page I confirm that "documents breakdown description" is displayed
    And on the Management Information page I confirm that "documents scheme column" is displayed
    And on the Management Information page I confirm that "year column" is displayed
    And on the Management Information page I confirm that "total documents column" is displayed
    And on the Management Information page I confirm that "print and post column" is displayed
    And on the Management Information page I confirm that "print and post cost column" is displayed
    And on the Management Information page I confirm that "email column" is displayed

    Then I take a screenshot for Feature 38 and Scenario 1
  
  Scenario: 02 Confirm filter functionality and options

    Given I visit the "Payment management" homepage
    When I click on the "View management information" link

#Confirm available options in Time Period filter dropdown and that it can be interacted with

    Then on the Management Information page I select "Year to date" in Time Period filter
    Then on the Management Information page I select "By year" in Time Period filter
    Then on the Management Information page I select "By month" in Time Period filter
    Then on the Management Information page I select "This month" in Time Period filter
    Then on the Management Information page I select "Last 7 days" in Time Period filter
    Then on the Management Information page I select "Last 24 hours" in Time Period filter
    Then on the Management Information page I select "Show all" in Time Period filter

#Confirm that no additional options appear when selecting options other than By year and By month

    Then on the Management Information page I select "Show all" in Time Period filter
    Then on the Management Information page I confirm that "select year filter dropdown" is not displayed
    Then on the Management Information page I confirm that "select month filter dropdown" is not displayed

    Then on the Management Information page I select "Year to date" in Time Period filter
    Then on the Management Information page I confirm that "select year filter dropdown" is not displayed
    Then on the Management Information page I confirm that "select month filter dropdown" is not displayed

    Then on the Management Information page I select "This month" in Time Period filter
    Then on the Management Information page I confirm that "select year filter dropdown" is not displayed
    Then on the Management Information page I confirm that "select month filter dropdown" is not displayed

    Then on the Management Information page I select "Last 7 days" in Time Period filter
    Then on the Management Information page I confirm that "select year filter dropdown" is not displayed
    Then on the Management Information page I confirm that "select month filter dropdown" is not displayed

    Then on the Management Information page I select "Last 24 hours" in Time Period filter
    Then on the Management Information page I confirm that "select year filter dropdown" is not displayed
    Then on the Management Information page I confirm that "select month filter dropdown" is not displayed

#By year option will result in another filter Select Year being displayed alongside it.

    Then on the Management Information page I select "By year" in Time Period filter
    Then on the Management Information page I confirm that "select year filter dropdown" is displayed

    Then on the Management Information page I select "2026" in Select Year filter
    Then on the Management Information page I select "2025" in Select Year filter
    Then on the Management Information page I select "2024" in Select Year filter
    Then on the Management Information page I select "2023" in Select Year filter
    Then on the Management Information page I select "2022" in Select Year filter
    Then on the Management Information page I select "2021" in Select Year filter
    Then on the Management Information page I select "2020" in Select Year filter
    Then on the Management Information page I select "2019" in Select Year filter
    Then on the Management Information page I select "2018" in Select Year filter
    Then on the Management Information page I select "2017" in Select Year filter
    Then on the Management Information page I select "2016" in Select Year filter
    Then on the Management Information page I select "2015" in Select Year filter

    Then on the Management Information page I select "Show all" in Time Period filter

#By Month option results in 2 additional filters being displayed, Select Year and Select Month.    

    Then on the Management Information page I select "By month" in Time Period filter
    Then on the Management Information page I confirm that "select year filter dropdown" is displayed
    Then on the Management Information page I confirm that "select month filter dropdown" is displayed

    Then on the Management Information page I select "2026" in Select Year filter
    Then on the Management Information page I select "January" in Select Month filter
    Then on the Management Information page I select "February" in Select Month filter
    Then on the Management Information page I select "March" in Select Month filter
    Then on the Management Information page I select "April" in Select Month filter
    Then on the Management Information page I select "May" in Select Month filter
    Then on the Management Information page I select "June" in Select Month filter
    Then on the Management Information page I select "July" in Select Month filter
    Then on the Management Information page I select "August" in Select Month filter
    Then on the Management Information page I select "September" in Select Month filter
    Then on the Management Information page I select "October" in Select Month filter
    Then on the Management Information page I select "November" in Select Month filter
    Then on the Management Information page I select "December" in Select Month filter
    Then I take a screenshot for Feature 38 and Scenario 2

  Scenario: 03 Confirm that correct messages are displayed when no data is available

    Given I visit the "Payment management" homepage
    When I click on the "View management information" link

#Jan 2015 selected here due to no data for this time in Dev environment    

    Then on the Management Information page I select "By month" in Time Period filter
    Then on the Management Information page I select "2015" in Select Year filter
    Then on the Management Information page I select "January" in Select Month filter

    When on the Management Information page I click on the "apply filters" button

#All values should be 0    

    Then on the Management Information page I confirm that number of payments is 0
    Then on the Management Information page I confirm that payment amount is £0
    Then on the Management Information page I confirm that number of documents is 0

#A message should appear under both the Payments and Documents panel advising that there is no data available for selected period    

    Then on the Management Information page I confirm that "no payment data message" is displayed
    Then on the Management Information page I confirm that "no document data message" is displayed
    Then I take a screenshot for Feature 38 and Scenario 3

  Scenario: 04 Confirm that correct amounts are displayed when data is available

    Given I visit the "Payment management" homepage
    When I click on the "View management information" link

#IMPORTANT - this date and subsequent values may need to be altered following change to data in Dev
#such as database cleanouts

    Then on the Management Information page I select "By month" in Time Period filter
    Then on the Management Information page I select "2025" in Select Year filter
    Then on the Management Information page I select "December" in Select Month filter
    
    When on the Management Information page I click on the "apply filters" button

 #Payments should be 10, Amount should be £104,284 and Documents should be 80,129 

    Then on the Management Information page I confirm that number of payments is 10
    Then on the Management Information page I confirm that payment amount is £104,284
    Then on the Management Information page I confirm that number of documents is 80,129

  #Confirm that Clear filters button is functioning correctly

    Then on the Management Information page I confirm that "clear filters" is displayed

    When on the Management Information page I click on the "clear filters" button
    Then on the Management Information page I confirm that "select year filter dropdown" is not displayed
    Then on the Management Information page I confirm that "select month filter dropdown" is not displayed
    Then I take a screenshot for Feature 38 and Scenario 4
