@dev @test
Feature: 03 Agreement Closures

# npm run cypress:test:one -- "cypress\e2e\features\03_AgreementClosures.feature"
# npm run cypress:dev:one -- "cypress\e2e\features\03_AgreementClosures.feature"

 
 ##TODO - future scenarios
 ##Duplicates - same frn scheme and agreement number as an existing entry - should error 
 ## Bulk duplicates -- have a bulk upload with files should show an error message if theres duplicates in the file itself

  Background: Navigate to Payment management homepage
    Given I visit the "Payment management" homepage

  Scenario: 01 View Agreement Closures
    Then I should see "Agreement closures"
    And I should see "Manage agreement closures"

  Scenario: 02 Access Agreement Closure Management
    When I click on the "Manage agreement closures" link
    Then I am on the "closure" subpage

  Scenario: 03 Manage Agreement Closures page
    When I click on the "Manage agreement closures" link
    And I should see "To comply with privacy laws and regulations we need to record agreement closure dates in the system."
    And I should see "Agreement closures are automatically provided for most schemes; however some schemes and scenarios need a manual process. You can search for and update an existing closure, or add new closures individually or in bulk."
    And I should see "Any data stored following an agreement closure will be kept in line with our data retention policy."
    And I should see "Search agreement closures"
    And I should see "Create a new agreement closure"
    And I should see "Bulk add agreement closures"
    Then I take a screenshot for Feature 3 and Scenario 3

  Scenario: 05 Search Agreement Closures Page
    When I click on the "Manage agreement closures" link
    Then I am on the "closure" subpage
    And I click on the "Search agreement closures" link
    And I should see "Any agreements listed here are considered closed. This allows the Payment Hub to manage data retention for the data it holds related to payment requests."
    Then I take a screenshot for Feature 3 and Scenario 5

  Scenario: 06 Create New Closure
    And I click on the "Manage agreement closures" link
    When I click on the "Create a new agreement closure" link
    Then I am on the "closure/add" subpage
    Then I should see "Adding a new agreement closure allows the Payment Hub to manage data retention for the data it holds related to payment requests."
    Then I take a screenshot for Feature 3 and Scenario 6

  Scenario: 07 Create Bulk Closure
    And I click on the "Manage agreement closures" link
    When I click on the "Bulk add agreement closures" link
    Then I am on the "closure/bulk" subpage
    Then I should see "Bulk adding new agreement closures allows the Payment Hub to manage data retention for the data it holds related to payment requests."
    Then I take a screenshot for Feature 3 and Scenario 7


  Scenario: 09 View Bulk Agreement Closure Page From Single Closure Page
    And I click on the "Manage agreement closures" link
    When I click on the "Create a new agreement closure" link
    And I click the "add agreement closures in bulk" link
    Then I am on the "closure/bulk" subpage
    Then I take a screenshot for Feature 3 and Scenario 9


  Scenario: 10 View Agreement Closure Page From Bulk Closure Page
    And I click on the "Manage agreement closures" link
    When I click on the "Bulk add agreement closures" link
    When I click the "create a singular agreement closure" link
    Then I am on the "closure/add" subpage
    Then I take a screenshot for Feature 3 and Scenario 10

  Scenario: 11 Empty fields
    And I click on the "Manage agreement closures" link
    When I click on the "Create a new agreement closure" link
    When I click on the "Continue" button
    Then I should see "There is a problem"
    And I should see "Enter a 10-digit FRN"
    And I should see "Enter a valid agreement number"
    And I should see "Enter a valid day"
    And I should see "Enter a valid month"
    And I should see "Enter a valid year"
    Then I take a screenshot for Feature 3 and Scenario 11

  Scenario Outline: 12 Invalid FRN
    And I click on the "Manage agreement closures" link
    When I click on the "Create a new agreement closure" link
    And I type '<invalidFrn>' in the 'FRN' field
    When I click on the "Continue" button
    Then I take a screenshot for Feature 3 and Scenario 12
    Then I should see "Enter a 10-digit FRN"
    Examples:
      | invalidFrn  |
      | 012345      |
      | 12345678901 |

  Scenario: 13 Invalid Agreement number
    And I click on the "Manage agreement closures" link
    When I click on the "Create a new agreement closure" link
    And I type '123456789012345678901234567890123456789012345678901234567890' in the 'Agreement number' field
    And I click on the "Continue" button
    Then I should see "Enter a valid agreement number"
    Then I take a screenshot for Feature 3 and Scenario 13

  Scenario: 14 Past Closure Date
    And I click on the "Manage agreement closures" link
    When I click on the "Create a new agreement closure" link
    And I type a date prior to '01/01/2000' in the Closure date field
    And I click on the "Continue" button
    Then I should see "Enter a valid year"
    Then I take a screenshot for Feature 3 and Scenario 14

  Scenario: 15 Successful Adding & Removing a Submission
    And I click on the "Manage agreement closures" link
    When I click on the "Create a new agreement closure" link
    And I type a random FRN in the FRN field
    And I type '12345' in the 'Agreement number' field
    And I type a future date in the Closure date field
    And I select "BPS" from the monitor schemes dropdown
    And I click on the "Continue" button
    And I see the new submission in the table
    And I click on the "Add closure" button
    And I am on the "closure" subpage
    And I visit the "Payment management" homepage
    And I click on the "Manage agreement closures" link
    And I click on the "Search agreement closures" link
    And I search for my new submission
    And I see the new submission in the table
    When I click on the Remove button next to the new submission

  Scenario: 16 Empty File Upload
    And I click on the "Manage agreement closures" link
    When I click on the "Bulk add agreement closure" link
    When I click on the "Add closures" button
    Then I should see "There is a problem"
    And I should see "Provide a CSV file"
    Then I take a screenshot for Feature 3 and Scenario 16

  Scenario: 17 Unsupported File Type
    And I click on the "Manage agreement closures" link
    When I click on the "Bulk add agreement closure" link
    And I upload 'bulkUploadTxt.txt' file
    When I click on the "Add closures" button
    Then I should see "There is a problem"
    And I should see "Provide a CSV file"
    Then I take a screenshot for Feature 3 and Scenario 17

  Scenario: 18 Large File Upload
    And I click on the "Manage agreement closures" link
    When I click on the "Bulk add agreement closure" link
    And I upload 'bulkUploadLarge.csv' file
    When I click on the "Add closures" button
    Then the 'The uploaded file is too large. Please upload a file smaller than 1 MB.' error message is displayed on the Payment holds page
    Then I take a screenshot for Feature 3 and Scenario 18

  Scenario: 19 Successful File Upload
    And I click on the "Manage agreement closures" link
    When I click on the "Bulk add agreement closure" link
    And I upload 'bulkClosureUploadValid.csv' file
    When I click on the "Add closures" button
    And I am on the "closure" subpage
    And I visit the "Payment management" homepage
    And I click on the "Manage agreement closures" link
    And I click on the "Search agreement closures" link
    And I see the new bulk upload submissions in the table
    

  Scenario: 20 Upload File Format Validation
    And I click on the "Manage agreement closures" link
    When I click on the "Bulk add agreement closures" link
    And I upload 'bulkUploadInvalid.csv' file
    When I click on the "Add closures" button
    Then I should see "There is a problem"
    And I should see "The file is not in the expected format"
    Then I take a screenshot for Feature 3 and Scenario 20

  Scenario: 21 Download agreement closures as CSV
    And I click on the "Manage agreement closures" link
    And I click on the "Search agreement closures" link
    And I click on the "Download all agreement closure data as CSV" download link


  Scenario:22 Record already exists bulk upload
    And I click on the "Manage agreement closures" link
    When I click on the "Bulk add agreement closure" link
    And I upload 'bulkClosureUploadInvalidDuplicateEntries.csv' file
    When I click on the "Add closures" button
    Then I should see "There is a problem"
    And I should see "One or more of the supplied closure records already exist."
    Then I take a screenshot for Feature 3 and Scenario 22


  Scenario:23 Duplicate record inside csv file
    And I click on the "Manage agreement closures" link
    When I click on the "Bulk add agreement closure" link
    And I upload 'bulkClosureUploadInvalidDuplicateEntries2.csv' file
    When I click on the "Add closures" button
    Then I should see "There is a problem"
    And I should see "The uploaded file contains duplicate records."
    Then I take a screenshot for Feature 3 and Scenario 23
  