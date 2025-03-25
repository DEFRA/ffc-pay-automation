@ignoreLocal
Feature: 09 Pagination - Payment Management

  Background:
    Given I visit the "Payment management" homepage

  Scenario Outline: 01 "<number>" records per page on "<page>" page
    And I click on the "<link>" link
    When I select "<number>" from the number of records per page dropdown
    Then I can see at most <number> records displayed in the table

    Examples:
      | link         | number | page          |
      | Manage holds | 100    | Payment holds |
      | Manage holds | 500    | Payment holds |
      | Manage holds | 1000   | Payment holds |

  Scenario Outline: 02 Verify Next/Previous on first page of "<page>" page
    When I click on the "<link>" link
    Then I can see "1" in the page box
    And I can see the "Next" button
    And I cannot see the "Previous" button

    Examples:
      | link         | page          |
      | Manage holds | Payment holds |

  Scenario Outline: 03 Verify Next/Previous on second page of "<page>" page
    And I click on the "<link>" link
    When I click on the "Next" page button
    Then I can see "2" in the page box
    And I can see the "Next" button
    And I can see the "Previous" button

    Examples:
      | link         | page          |
      | Manage holds | Payment holds |

  Scenario Outline: 04 Verify Next/Previous on last page of "<page>" page
    And I click on the "<link>" link
    When I visit the last page
    Then I cannot see the "Next" button
    And I can see the "Previous" button

    Examples:
      | link         | page          |
      | Manage holds | Payment holds |