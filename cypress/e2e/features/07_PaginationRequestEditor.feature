Feature: 07 Pagination - Request Editor

# npm run cypress:test:one -- "cypress\e2e\features\07_PaginationRequestEditor.feature"
# npm run cypress:dev:one -- "cypress\e2e\features\07_PaginationRequestEditor.feature"

  Background:
    Given I visit the "Request Editor" homepage
    
  @dev@test@local
  Scenario Outline: 00 Default records per page is displayed
    # The below command fills the LOCAL env with 11000 records of each type to request editor. it does not touch dev env
    # It WILL truncate all the request editor tables however, so make sure you don't have any data in here that you don't mind losing.
    Given I fill the local Request Editor with pagination data
    
    And I click on the "<link>" link
    Then "<number>" records per page is selected by default

    Examples:
      | link                                          | number |
      | View all datasets                             | 2500   |
      | View awaiting debt data                       | 100    |
      | View awaiting manual ledger assignment        | 100    |
      | View awaiting ledger assignment quality check | 100    |

  
  Scenario Outline: 01 "<number>" records per page on "<page>" page

    And I click on the "<link>" link
    #When I select "<number>" from the number of records per page dropdown
    And I select <number> records per page pagination link
    Then I can see at most <number> records displayed in the table

    @dev @test @local
    Examples:
      | link                                          | number | page                             |
      | View all datasets                             | 10000  | Unattached reporting datasets    |
      | View all datasets                             | 5000   | Unattached reporting datasets    |
      | View awaiting debt data                       | 1000   | Requests awaiting reporting data |
      | View awaiting debt data                       | 500    | Requests awaiting reporting data |
      | View awaiting manual ledger assignment        | 1000   | Awaiting ledger assignment       |
      | View awaiting manual ledger assignment        | 500    | Awaiting ledger assignment       |
      | View awaiting ledger assignment quality check | 1000   | Requests awaiting quality check  |
      | View awaiting ledger assignment quality check | 500    | Requests awaiting quality check  |



  @local @dev @test
  Scenario Outline: 02 Verify Next/Previous on first page of "<page>" page
    When I click on the "<link>" link
    Then the current pagination page number is "1"
    And I verify the pagination "next" is visible
    And I verify the pagination "previous" is not visible

    Examples:
      | link                                          | page                             |
      | View all datasets                             | Unattached reporting datasets    |
      | View awaiting debt data                       | Requests awaiting reporting data |
      | View awaiting manual ledger assignment        | Awaiting ledger assignment       |
      | View awaiting ledger assignment quality check | Requests awaiting quality check  |

  @local @dev @test
  Scenario Outline: 03 Verify Next/Previous on second page of "<page>" page
    And I click on the "<link>" link
    When I click on the "Next" link
    Then the current pagination page number is "2"
    And I verify the pagination "next" is visible
    And I verify the pagination "previous" is visible

    Examples:
      | link                                          | page                             |
      | View all datasets                             | Unattached reporting datasets    |
      | View awaiting debt data                       | Requests awaiting reporting data |
      | View awaiting manual ledger assignment        | Awaiting ledger assignment       |
      | View awaiting ledger assignment quality check | Requests awaiting quality check  |

  @local @dev @test
  Scenario Outline: 04 Verify Next/Previous on last page of "<page>" page
    And I click on the "<link>" link
    And I go to the last page of pagination results
    Then I verify the pagination "next" is not visible
    And I verify the pagination "previous" is visible

    Examples:
      | link                                          | page                             |
      | View all datasets                             | Unattached reporting datasets    |
      | View awaiting debt data                       | Requests awaiting reporting data |
      | View awaiting manual ledger assignment        | Awaiting ledger assignment       |
      | View awaiting ledger assignment quality check | Requests awaiting quality check  |

  @local @dev @test
  Scenario: 05 Search for a record from another page
    And I click on the "View all datasets" link
    And I select 10000 records per page pagination link
    And I go to the last page of pagination results
    And I get the FRN of the last capture record
    And I select 2500 records per page pagination link
    When I search for the FRN
    Then I should see the first capture FRN in the results matches the last record FRN