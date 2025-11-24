@dev @test
Feature: 20 Accessibility Testing

#This feature tests confirms that there are no accessibility issues on key pages of the front-end applications using axe-core

  Scenario: 01 Check accessibility on Payment management

#This scenario checks all pages of Payment management for accessibility issues

    Given I visit the "Payment management" homepage
    Then I confirm there are no accessibility issues on the page

#Manage holds page

    When I click on the "Manage holds" link
    Then I confirm there are no accessibility issues on the page

    And I click on the "Create new hold" link
    Then I confirm there are no accessibility issues on the page

#Create error message on page through invalid input and confirm accessibility again
    
    And I type "abc" in the "FRN" field
    And I click on the "Create" button
    Then I confirm there are no accessibility issues on the page
    And I click on the "Home" link

#Reports page

    When I click on the "Report List" link
    Then I confirm there are no accessibility issues on the page

#Payment request statuses v2 page

    When I click on the "Payment request statuses v2" link
    Then I confirm there are no accessibility issues on the page

    And I click on the "Download report" button
    Then I confirm there are no accessibility issues on the page

    When I click on the "Report List" link

#Combined transaction report page    

    When I click on the "Combined transaction report" link
    Then I confirm there are no accessibility issues on the page

    And I click on the "Download report" button
    Then I confirm there are no accessibility issues on the page

    When I click on the "Report List" link

#AP/AR Listing Report page

    When I click on the "AP-AR listing report" link
    Then I confirm there are no accessibility issues on the page

    When I click on the "Report List" link

#Claim Level Report page

    When I click on the "Claim level report" link
    Then I confirm there are no accessibility issues on the page

    And I click on the "Download report" button
    Then I confirm there are no accessibility issues on the page

    When I click on the "Report List" link

#Payment statement status report page

    When I click on the "Payment statement status report" link
    Then I confirm there are no accessibility issues on the page

    And I click on the "Home" link

#Alerts recipients page

    When I click on the "View all alert recipients" link
    Then I confirm there are no accessibility issues on the page

    And on the Add New Alert Recipient page I click the "Add recipient" button
    Then I confirm there are no accessibility issues on the page

    And I click on the "Create" button
    Then I confirm there are no accessibility issues on the page

    And I click on the "Home" link
    

#Manage schemes page

    When I click on the "Manage schemes" link
    Then I confirm there are no accessibility issues on the page

    And I click on the "Home" link

#Reset payment requests page
    When I click on the "Reset payment request" link
    Then I confirm there are no accessibility issues on the page

    And I click on the "Reset payment request" button
    Then I confirm there are no accessibility issues on the page

    And I click on the "Home" link

#Agreement closures page

    When I click on the "Manage closures" link
    Then I confirm there are no accessibility issues on the page

    And I click on the "Home" link
    And I click on the "Add closure" link
    Then I confirm there are no accessibility issues on the page

#Force error message on page through invalid input and confirm accessibility again

    And I click on the "Create" button
    Then I confirm there are no accessibility issues on the page

    And I click on the "Home" link
    And I click on the "Add bulk closures" link
    Then I confirm there are no accessibility issues on the page

#Force error message on page through invalid input and confirm accessibility again

    And I click on the "Create" button
    Then I confirm there are no accessibility issues on the page

    And I click on the "Home" link

#Monitoring page

    When I click on the "View events" link
    Then I confirm there are no accessibility issues on the page
    And I click on the "Home" link

    When I click on the "View processed payment requests" link
    Then I confirm there are no accessibility issues on the page

    Then I select "FDMR" from the monitor schemes dropdown

    And I click on the "Continue" button
    Then I confirm there are no accessibility issues on the page

    And I click on the "Home" link

#Manual Payment page

    When I click on the "Upload manual payment" link
    Then I confirm there are no accessibility issues on the page

#Force error message on page through invalid input and confirm accessibility again

    And I click on the "Upload" button
    Then I confirm there are no accessibility issues on the page
   

  Scenario: 02 Check accessibility on Request Editor

#This scenario checks all pages of Request Editor for accessibility issues

    Given I visit the "Request Editor" homepage
    Then I confirm there are no accessibility issues on the page

#Capture Reporting data page

#Following page will need to be checked manually as amount of data on page causes cypress to crash

    When I click on the "View all datasets" link

#Create new reporting dataset page

    And I click on the "Capture new dataset" link
    Then I confirm there are no accessibility issues on the page

# Force error message on page through invalid input and confirm accessibility again

    When I click on the "Continue" button
    Then I confirm there are no accessibility issues on the page

    When I click on the "Back" link

#Requests awaiting reporting data page

    When I click on the "View awaiting reporting data" link
    Then I confirm there are no accessibility issues on the page

    When on the Awaiting Reporting Data page I click the FRN number search button
    Then I confirm there are no accessibility issues on the page

    When I click on the "Back" link

#Manual ledger assignment page  

    When I click on the "View awaiting ledger assignment" link
    Then I confirm there are no accessibility issues on the page

    When on the Awaiting Reporting Data page I click the FRN number search button
    Then I confirm there are no accessibility issues on the page

#Review ledger assignment page    

    When I click on the "Review" link
    Then I confirm there are no accessibility issues on the page

#Force error message on page through invalid input and confirm accessibility again

    When I click on the "Continue" button
    Then I confirm there are no accessibility issues on the page

    When I click on the "Back" link
    When I click on the "Back" link

#Ledger assignments awaiting quality check page

    When I click on the "View awaiting quality check" link
    Then I confirm there are no accessibility issues on the page


#Force error message on page through invalid input and confirm accessibility again

    When on the Awaiting Reporting Data page I click the FRN number search button
    Then I confirm there are no accessibility issues on the page

    When I click on the "Review" link
    Then I confirm there are no accessibility issues on the page

#Force error message on page through invalid input and confirm accessibility again

    When I click on the "Submit" button
    Then I confirm there are no accessibility issues on the page
    

  Scenario: 03 Check accessibility on Payment Calculator

#This scenario checks all pages of Payment Calculator for accessibility issues

    Given I visit the "Calculate your delinked payment " homepage
    Then I confirm there are no accessibility issues on the page

    When on the Payment Calculator page I click the "start button"
    Then I confirm there are no accessibility issues on the page

#Force error message on page through invalid input and confirm accessibility again

    Then on the Enter your delinked payment reference amount page I click the "calculate button"
    Then I confirm there are no accessibility issues on the page

#Result screen    

    When on the Enter your delinked payment reference amount page I enter amount of "20000"
    Then on the Enter your delinked payment reference amount page I click the "calculate button"
    Then I confirm there are no accessibility issues on the page
