@test @dev @local
Feature: 09 Pagination - Payment Management

# npm run cypress:test:one -- "cypress\e2e\features\09_PaginationPaymentManagement.feature"
# npm run cypress:dev:one -- "cypress\e2e\features\09_PaginationPaymentManagement.feature"

  Background:
    Given I visit the "Payment management" homepage

 
  Scenario Outline: 00 Default records per page is displayed
    And I click on the "Manage payment holds" link
    And I click on the "<link>" link
    And I click on the "Search" button
    Then "<number>" records per page is selected by default
    Then I take a screenshot
    Examples:
      | link                      | number |
      | Search for a payment hold | 100    |

  Scenario Outline: 01 "<number>" records per page on "<page>" page
    And I click on the "Manage payment holds" link
    And I click on the "<link>" link
    And I click on the "Search" button
    And I select <number> records per page pagination link
    Then I can see at most <number> records displayed in the table
    Then I take a screenshot
    Examples:
      | link                      | number | page          |
      | Search for a payment hold | 500    | Payment holds |
      | Search for a payment hold | 1000   | Payment holds |

  Scenario Outline: 02 Verify Next/Previous on first page of "<page>" page
    When I click on the "<link>" link
    And I click on the "Search for a payment hold" link
    And I click on the "Search" button
    And the current pagination page number is "1"
    And I verify the pagination "next" is visible
    And I verify the pagination "previous" is not visible
    Then I take a screenshot
    Examples:
      | link                 | page          |
      | Manage payment holds | Payment holds |

  Scenario Outline: 03 Verify Previous on second page of "<page>" page
    And I click on the "<link>" link
    And I click on the "Search for a payment hold" link
    And I click on the "Search" button
    And I click the pagination "next"
    And the current pagination page number is "2"
    And I verify the pagination "previous" is visible
    Then I take a screenshot
    Examples:
      | link                 | page          |
      | Manage payment holds | Payment holds |

  Scenario Outline: 04 Verify Next/Previous on last page of "<page>" page
    And I click on the "<link>" link
    And I click on the "Search for a payment hold" link
    And I click on the "Search" button
    And I go to the last page of pagination results
    And I verify the pagination "next" is not visible
    And I verify the pagination "previous" is visible
    Then I take a screenshot
    Examples:
      | link                 | page          |
      | Manage payment holds | Payment holds |