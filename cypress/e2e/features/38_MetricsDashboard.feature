@dev
Feature: 38 Metrics Dashboard

# npm run cypress:dev:one -- "cypress\e2e\features\38_ManagementInformation.feature"

# This feature file is designed to test functionality of Metrics Dashboard page in Payment Management UI

  Scenario: 01 Confirm Metrics Dashboard page loads correctly

    Given I visit the "Payment management" homepage
    When I click on the "View metrics dashboard" link


#Confirms present of elements on page

    And on the Metrics Dashboard page I confirm that "page title" is displayed
    And on the Metrics Dashboard page I confirm that "page description" is displayed
    And on the Metrics Dashboard page I confirm that "time period filter dropdown" is displayed
    And on the Metrics Dashboard page I confirm that "time period filter button" is displayed
    And on the Metrics Dashboard page I confirm that "payment metrics sub header" is displayed
    And on the Metrics Dashboard page I confirm that "payments panel" is displayed
    And on the Metrics Dashboard page I confirm that "payments count" is displayed
    And on the Metrics Dashboard page I confirm that "total value panel" is displayed
    And on the Metrics Dashboard page I confirm that "total value amount" is displayed
    And on the Metrics Dashboard page I confirm that "breakdown description" is displayed
    And on the Metrics Dashboard page I confirm that "payment scheme column" is displayed
    And on the Metrics Dashboard page I confirm that "total payments column" is displayed
    And on the Metrics Dashboard page I confirm that "total value column" is displayed
    And on the Metrics Dashboard page I confirm that "pending column" is displayed
    And on the Metrics Dashboard page I confirm that "processed column" is displayed
    And on the Metrics Dashboard page I confirm that "documents metrics sub header" is displayed
    And on the Metrics Dashboard page I confirm that "documents issued" is displayed
    And on the Metrics Dashboard page I confirm that "documents count" is displayed
    And on the Metrics Dashboard page I confirm that "documents breakdown description" is displayed
    And on the Metrics Dashboard page I confirm that "documents scheme column" is displayed
    And on the Metrics Dashboard page I confirm that "year column" is displayed
    And on the Metrics Dashboard page I confirm that "total documents column" is displayed
    And on the Metrics Dashboard page I confirm that "print and post column" is displayed
    And on the Metrics Dashboard page I confirm that "print and post cost column" is displayed
    And on the Metrics Dashboard page I confirm that "email column" is displayed

    Then I take a screenshot
  
  Scenario: 02 Confirm filter functionality and options

    Given I visit the "Payment management" homepage
    When I click on the "View metrics dashboard" link

#Confirm available options in Time Period filter dropdown and that it can be interacted with

    Then on the Metrics Dashboard page I select "Year to date" in Time Period filter
    Then on the Metrics Dashboard page I select "By year" in Time Period filter
    Then on the Metrics Dashboard page I select "By month" in Time Period filter
    Then on the Metrics Dashboard page I select "This month" in Time Period filter
    Then on the Metrics Dashboard page I select "Last 7 days" in Time Period filter
    Then on the Metrics Dashboard page I select "Last 24 hours" in Time Period filter
    Then on the Metrics Dashboard page I select "All dates" in Time Period filter

#Confirm that no additional options appear when selecting options other than By year and By month

    Then on the Metrics Dashboard page I select "All dates" in Time Period filter
    Then on the Metrics Dashboard page I confirm that "select year filter dropdown" is not displayed
    Then on the Metrics Dashboard page I confirm that "select month filter dropdown" is not displayed

    Then on the Metrics Dashboard page I select "Year to date" in Time Period filter
    Then on the Metrics Dashboard page I confirm that "select year filter dropdown" is not displayed
    Then on the Metrics Dashboard page I confirm that "select month filter dropdown" is not displayed

    Then on the Metrics Dashboard page I select "This month" in Time Period filter
    Then on the Metrics Dashboard page I confirm that "select year filter dropdown" is not displayed
    Then on the Metrics Dashboard page I confirm that "select month filter dropdown" is not displayed

    Then on the Metrics Dashboard page I select "Last 7 days" in Time Period filter
    Then on the Metrics Dashboard page I confirm that "select year filter dropdown" is not displayed
    Then on the Metrics Dashboard page I confirm that "select month filter dropdown" is not displayed

    Then on the Metrics Dashboard page I select "Last 24 hours" in Time Period filter
    Then on the Metrics Dashboard page I confirm that "select year filter dropdown" is not displayed
    Then on the Metrics Dashboard page I confirm that "select month filter dropdown" is not displayed

#By year option will result in another filter Select Year being displayed alongside it.

    Then on the Metrics Dashboard page I select "By year" in Time Period filter
    Then on the Metrics Dashboard page I confirm that "select year filter dropdown" is displayed

    Then on the Metrics Dashboard page I select "2026" in Select Year filter
    Then on the Metrics Dashboard page I select "2025" in Select Year filter
    Then on the Metrics Dashboard page I select "2024" in Select Year filter
    Then on the Metrics Dashboard page I select "2023" in Select Year filter
    Then on the Metrics Dashboard page I select "2022" in Select Year filter
    Then on the Metrics Dashboard page I select "2021" in Select Year filter
    Then on the Metrics Dashboard page I select "2020" in Select Year filter
    Then on the Metrics Dashboard page I select "2019" in Select Year filter
    Then on the Metrics Dashboard page I select "2018" in Select Year filter
    Then on the Metrics Dashboard page I select "2017" in Select Year filter
    Then on the Metrics Dashboard page I select "2016" in Select Year filter
    Then on the Metrics Dashboard page I select "2015" in Select Year filter

    Then on the Metrics Dashboard page I select "All dates" in Time Period filter

#By Month option results in 2 additional filters being displayed, Select Year and Select Month.    

    Then on the Metrics Dashboard page I select "By month" in Time Period filter
    Then on the Metrics Dashboard page I confirm that "select year filter dropdown" is displayed
    Then on the Metrics Dashboard page I confirm that "select month filter dropdown" is displayed

    Then on the Metrics Dashboard page I select "2026" in Select Year filter
    Then on the Metrics Dashboard page I select "January" in Select Month filter
    Then on the Metrics Dashboard page I select "February" in Select Month filter
    Then on the Metrics Dashboard page I select "March" in Select Month filter
    Then on the Metrics Dashboard page I select "April" in Select Month filter
    Then on the Metrics Dashboard page I select "May" in Select Month filter
    Then on the Metrics Dashboard page I select "June" in Select Month filter
    Then on the Metrics Dashboard page I select "July" in Select Month filter
    Then on the Metrics Dashboard page I select "August" in Select Month filter
    Then on the Metrics Dashboard page I select "September" in Select Month filter
    Then on the Metrics Dashboard page I select "October" in Select Month filter
    Then on the Metrics Dashboard page I select "November" in Select Month filter
    Then on the Metrics Dashboard page I select "December" in Select Month filter
    Then I take a screenshot

  Scenario: 03 Confirm that correct messages are displayed when no data is available

    Given I visit the "Payment management" homepage
    When I click on the "View metrics dashboard" link

#Jan 2015 selected here due to no data for this time in Dev environment    

    Then on the Metrics Dashboard page I select "By month" in Time Period filter
    Then on the Metrics Dashboard page I select "2015" in Select Year filter
    Then on the Metrics Dashboard page I select "January" in Select Month filter

    And I click on the "Apply filters" button

#All values should be 0    

    Then on the Metrics Dashboard page I confirm that number of payments value is 0
    Then on the Metrics Dashboard page I confirm that payment amount value is £0.00
    Then on the Metrics Dashboard page I confirm that number of documents value is 0

#A message should appear under both the Payments and Documents panel advising that there is no data available for selected period    

    Then on the Metrics Dashboard page I confirm that "no payment data message" is displayed
    Then on the Metrics Dashboard page I confirm that "no document data message" is displayed
    Then I take a screenshot

  Scenario: 04 Confirm that correct amounts are displayed when data is available

    Given I visit the "Payment management" homepage
    When I click on the "View metrics dashboard" link

#IMPORTANT - this date and subsequent values may need to be altered following change to data in Dev
#such as database cleanouts

    Then on the Metrics Dashboard page I select "By month" in Time Period filter
    Then on the Metrics Dashboard page I select "2026" in Select Year filter
    Then on the Metrics Dashboard page I select "July" in Select Month filter
    
    And I click on the "Apply filters" button

 #Payments should be 10, Amount should be £104,284 and Documents should be 80,129 

    Then on the Metrics Dashboard page I confirm that number of payments value is 2,691
    Then on the Metrics Dashboard page I confirm that payment amount value is £105,028,810.96
    Then on the Metrics Dashboard page I confirm that number of documents value is 41

  #Confirm that Clear filters button is functioning correctly

    Then on the Metrics Dashboard page I confirm that "clear filters" is displayed

    When on the Metrics Dashboard page I click on the "clear filters" button
    Then on the Metrics Dashboard page I confirm that "select year filter dropdown" is not displayed
    Then on the Metrics Dashboard page I confirm that "select month filter dropdown" is not displayed
    Then I take a screenshot
