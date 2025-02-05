@test
Feature: 08 Quality Check

  Background:
    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting quality check" link
    
  Scenario: 01 Successfully search and find a random FRN
    And I have a random FRN from the list of FRNs
    And I enter the random FRN in the search field
    When I click on the FRN search button
    Then I should see the first FRN in the results matches the random FRN