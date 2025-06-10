Feature: 03 Agreement Closures

  Background: Navigate to Payment management homepage
    Given I visit the "Payment management" homepage

  Scenario: 01 View Agreement Closures
    Then I should see "Agreement closures"
    And I should see the number of closures
    And I should see "Add details of an agreement number closure"
    And I should see "Manage closures"
    And I should see "Add closure"
    And I should see "Add bulk closures"

  Scenario: 02 Access Agreement Closure Management
    When I click on the "Manage closures" link
    Then I am on the "closure" subpage

  Scenario: 03 Access Add Agreement Closure
    When I click on the "Add closure" link
    Then I am on the "closure/add" subpage

  Scenario: 04 Access Bulk Agreement Closures
    When I click on the "Add bulk closures" link
    Then I am on the "closure/bulk" subpage

  Scenario: 05 View Agreement Closures Page
    When I click on the "Manage closures" link
    Then I am on the "closure" subpage
    And I should see "Any agreements listed here are considered closed. Following the closure date listed, no accounts repayable will be processed."
    And I should see "Create new closure"
    And I should see "Create bulk closure"
    # And I should see "There are no agreement closures."

  Scenario: 06 Create New Closure
    And I click on the "Manage closures" link
    When I click on the "Create new closure" link
    Then I am on the "closure/add" subpage

  Scenario: 07 Create Bulk Closure
    And I click on the "Manage closures" link
    When I click on the "Create bulk closure" link
    Then I am on the "closure/bulk" subpage

  Scenario: 08 View Agreement Closure Page
    When I click on the "Add closure" link
    Then I am on the "closure/add" subpage
    And I should see "Any details you provide here will result in a suppression being applied to payments against a given FRN and agreement number."
    And I should see "If a 0 value request is provided to the Payment Hub, following the date supplied, any amount repayable will be suppressed and Dynamics 365 will be informed that the outstanding value should be reduced to 0."
    And I should see "It is assumed that any details provided are applicable to SFI22."
    And I should see "Want to upload in bulk? Click here."
    And I should see the "Firm reference number (FRN)" field
    And I should see the "Agreement number" field
    And I should see the "Closure date" field
    And I should see "Create"

  Scenario: 09 View Bulk Agreement Closure Page From Single Closure Page
    And I click on the "Add closure" link
    When I click the "upload in bulk" link
    # Todo: Below fails (Page Not Found)
    Then I am on the "closure/bulk" subpage

  Scenario: 10 View Agreement Closure Page From Bulk Closure Page
    And I click on the "Add bulk closures" link
    When I click the "upload single" link
    # Todo: Below fails (Page Redirect Error)
    Then I am on the "closure/add" subpage

  Scenario: 11 Empty fields
    And I click on the "Add closure" link
    When I click the "Create" link
    Then I should see "There is a problem"
    And I should see "Enter a 10-digit FRN"
    And I should see "Enter a valid agreement number"
    And I should see "Enter a valid day"
    And I should see "Enter a valid month"
    And I should see "Enter a valid year"

  Scenario Outline: 12 Invalid FRN
    And I click on the "Add closure" link
    And I type '<invalidFrn>' in the 'FRN' field
    When I click the "Create" link
    Then I should see "Enter a 10-digit FRN"
    Examples:
      | invalidFrn  |
      | 012345      |
      | 12345678901 |

  Scenario: 13 Invalid Agreement number
    And I click on the "Add closure" link
    And I type '123456789012345678901234567890123456789012345678901234567890' in the 'Agreement number' field
    When I click the "Create" link
    Then I should see "Enter a valid agreement number"

  Scenario: 14 Past Closure Date
    And I click on the "Add closure" link
    And I type a date prior to '01/01/2023' in the Closure date field
    When I click the "Create" link
    Then I should see "Enter a valid year"

  @ignoreLocal
  Scenario: 15 Successful Adding & Removing a Submission
    And I make a note of the closures count
    And I click on the "Add closure" link
    And I type a random FRN in the FRN field
    And I type '12345' in the 'Agreement number' field
    And I type a future date in the Closure date field
    And I click the "Create" link
    And I am on the "closure" subpage
    And I see the new submission in the table
    And I visit the "Payment management" homepage
    And the closure count has increased by 1
    And I visit the "Payment management" homepage
    And I click on the "Manage closures" link
    And I see the new submission in the table
    When I click on the Remove button next to the new submission
    Then I should not see the new submission in the table

  Scenario: 16 Empty File Upload
    And I click on the "Add bulk closures" link
    When I click the "Create" link
    Then I should see "There is a problem"
    And I should see "Provide a CSV file"

  Scenario: 17 Unsupported File Type
    And I click on the "Add bulk closures" link
    And I upload 'bulkUploadTxt.txt' file
    When I click the "Create" link
    Then I should see "There is a problem"
    And I should see "Provide a CSV file"

  @ignoreLocal
  Scenario: 18 Large File Upload
    And I click on the "Add bulk closures" link
    And I upload 'bulkUploadLarge.csv' file
    When I click the "Create" link
    Then the "The uploaded file is too large. Please upload a file smaller than 1 MB." error message is displayed on the Payment holds page

  @ignore
  Scenario: 19 Successful File Upload
    And I click on the "Add bulk closures" link
    And I upload 'bulkUploadValid.csv' file
    And I click the "Create" link
    And I am on the "closure" subpage
    And I see the new bulk upload submissions in the table
    And I should see a "Remove" link
    When I visit the "Payment management" homepage
    Then I should see "2" number of closures
    And I visit the "Payment management" homepage
    And I click on the "Manage closures" link
    And I click on the "Remove" button
    And I click on the "Remove" button

  Scenario: 20 Upload File Format Validation
    And I click on the "Add bulk closures" link
    And I upload 'bulkUploadInvalid.csv' file
    When I click the "Create" link
    Then I should see "There is a problem"
    And I should see "The file is not in the expected format"