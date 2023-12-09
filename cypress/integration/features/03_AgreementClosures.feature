Feature: 03 Agreement Closures

  Scenario: View Agreement Closures
    Given I visit the "Payment management" homepage
    Then I should see "Agreement closures"
    And I should see the number of closures
    And I should see "Add details of an agreement number closure"
    And I should see "Manage closures"
    And I should see "Add closure"
    And I should see "Add bulk closures"

  Scenario: Access Agreement Closure Management
    Given I visit the "Payment management" homepage
    When I click on the "Manage closures" link
    Then I should be redirected to the Agreement Closure Management page

  Scenario: Access Add Agreement Closure
    Given I visit the "Payment management" homepage
    When I click on the "Add closure" link within the "Agreement Closures" box
    Then I should be redirected to the Add Agreement Closure page

  Scenario: Access Bulk Agreement Closures
    Given I visit the "Payment management" homepage
    When I click on the "Add bulk closures" link within the "Agreement Closures" box
    Then I should be redirected to the Bulk Agreement Closures page

  Scenario: View Agreement Closures Page
    Given I navigate to the "Manage closures" page
    Then I should see the heading "Agreement closures"
    And I should see the description "Any agreements listed here are considered closed. Following the closure date listed, no accounts repayable will be processed."
    And I should see a button labeled "Create new closure"
    And I should see a button labeled "Create bulk closure"
    And I should see a message "There are no agreement closures."

  Scenario: Create New Closure
    Given I navigate to the "Manage closures" page
    When I click the "Create new closure" button
    Then I should be redirected to the "Add Agreement Closure" page

  Scenario: Create Bulk Closure
    Given I navigate to the "Manage closures" page
    When I click the "Create bulk closure" button
    Then I should be redirected to the "Bulk Agreement Closures" page

  Scenario: View Agreement Closure Page
    Given I navigate to the "Add closure" page
    Then I should see the heading "Agreement closure"
    And I should see the description "Any details you provide here will result in a suppression being applied to payments against a given FRN and agreement number."
    And I should see additional information about closure and suppression
    And I should see a link to "upload in bulk" with the text "here"
    And I should see form fields for "Firm reference number (FRN)" and "Agreement number"
    And I should see a form field for "Closure date" with day, month, and year inputs
    And I should see a "Create" button

  Scenario: View Bulk Agreement Closure Page
    Given I navigate to the "Add closure" page
    When I click the "upload in bulk" link
    Then I should be redirected to the "Bulk Agreement Closures" page

  Scenario: Empty fields
    Given I navigate to the "Add closure" page
    And I click the "Create" button
    Then I should see "Enter a 10-digit FRN"
    And I should see "Enter a valid agreement number"
    And I should see "Enter a valid day"
    And I should see "Enter a valid month"
    And I should see "Enter a valid year"

  Scenario: Invalid FRN
    Given I navigate to the "Add closure" page
    When I fill in an invalid "Firm reference number (FRN)" with more/less than 10 digits
    And I click the "Create" button
    Then I should see "Enter a 10-digit FRN"

  Scenario: Past Closure Date
    Given I navigate to the "Add closure" page
    And I fill in a "Closure date" prior to 01/01/2023
    And I click the "Create" button
    And I should see "Enter a valid year"

  Scenario: Successful Submission
    Given I navigate to the "Add closure" page
    When I fill in a valid "Firm reference number (FRN)"
    And I fill in a valid "Agreement number"
    And I fill in a valid "Closure date"
    And I click the "Create" button
    Then I should be redirected to the "Agreement Closure" page
    And I see the new submission in the table
    And I should see a "Remove" link
    And I visit the "Payment management" homepage
    Then I should see "1" number of closures

  Scenario: Remove Submission
    Given I navigate to the "Agreement Closure" page
    And I see the new submission in the table
    When I click the "Remove" link
    Then I should see "There are no agreement closures."
    And I visit the "Payment management" homepage
    Then I should see "0" number of closures

  Scenario: Empty File Upload
    Given I navigate to the "Add bulk closures" page
    When I leave the "Upload a file" field empty
    And I click the "Create" button
    Then I should see "Provide a CSV file"

  Scenario: Unsupported File Type
    Given I navigate to the "Add bulk closures" page
    When I upload a file with an unsupported file type (e.g., .txt)
    And I click the "Create" button
    Then I should see "Provide a CSV file"

  Scenario: Large File Upload
    Given I navigate to the "Add bulk closures" page
    When I upload a large file (exceeding the allowed size)
    And I click the "Create" button
    Then I should see "File size exceeded"

  Scenario: Successful File Upload
    Given I navigate to the "Add bulk closures" page
    When I upload a valid file (e.g., .csv) containing closure data
    And I click the "Create" button
    Then I should be redirected to the "Agreement Closure" page
    And I see the new submission in the table
    And I should see a "Remove" link
    And I visit the "Payment management" homepage
    Then I should see "1" number of closures

  Scenario: Upload File Format Validation
    Given I navigate to the "Add bulk closures" page
    When I upload a file with an invalid format (e.g., missing required columns)
    And I click the "Create" button
    Then I should see "Provide a CSV file"
