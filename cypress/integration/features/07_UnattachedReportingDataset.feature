Feature: 07 Unattached Reporting Dataset

  Background:
    Given I visit the "Request Editor" homepage
    And I click on the "View all datasets" link

  Scenario Outline: 01 Number of records per page dropdown - "<number>"
    When I select "<number>" from the number of records per page dropdown
    Then I can see <number> records displayed in the table

    Examples:
      | number |
      | 2500   |
      | 5000   |
      | 10000  |

  Scenario: 02 Verify Next/Previous on first page
    Then I can see "1" in the page box
    And I can see the "Next" button
    And I cannot see the "Previous" button

  Scenario: 03 Verify Next/Previous on second page
    When I click on the "Next" page button
    Then I can see "2" in the page box
    And I can see the "Next" button
    And I can see the "Previous" button

  Scenario: 04 Verify Next/Previous on last page
    When I visit the last page
    Then I cannot see the "Next" button
    And I can see the "Previous" button