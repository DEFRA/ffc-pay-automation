@ignoreLocal
Feature: 07 Pagination - Request Editor

  Background:
    Given I visit the "Request Editor" homepage

  Scenario Outline: 01 "<number>" records per page on "<page>" page
    And I click on the "<link>" link
    When I select "<number>" from the number of records per page dropdown
    Then I can see <number> records displayed in the table

    Examples:
      | link                            | number | page                             |
      | View all datasets               | 2500   | Unattached reporting datasets    |
      | View all datasets               | 5000   | Unattached reporting datasets    |
      | View all datasets               | 10000  | Unattached reporting datasets    |
      | View awaiting reporting data    | 100    | Requests awaiting reporting data |
      | View awaiting reporting data    | 500    | Requests awaiting reporting data |
      | View awaiting reporting data    | 1000   | Requests awaiting reporting data |
      | View awaiting ledger assignment | 100    | Awaiting ledger assignment       |
      | View awaiting ledger assignment | 500    | Awaiting ledger assignment       |
      | View awaiting ledger assignment | 1000   | Awaiting ledger assignment       |

    @test
    Examples:
      | link                        | number | page                            |
      | View awaiting quality check | 100    | Requests awaiting quality check |
      | View awaiting quality check | 500    | Requests awaiting quality check |
      | View awaiting quality check | 1000   | Requests awaiting quality check |

  Scenario Outline: 02 Verify Next/Previous on first page of "<page>" page
    When I click on the "<link>" link
    Then I can see "1" in the page box
    And I can see the "Next" button
    And I cannot see the "Previous" button

    Examples:
      | link                            | page                             |
      | View all datasets               | Unattached reporting datasets    |
      | View awaiting reporting data    | Requests awaiting reporting data |
      | View awaiting ledger assignment | Awaiting ledger assignment       |

    @test
    Examples:
      | link                        | page                            |
      | View awaiting quality check | Requests awaiting quality check |

  Scenario Outline: 03 Verify Next/Previous on second page of "<page>" page
    And I click on the "<link>" link
    When I click on the "Next" page button
    Then I can see "2" in the page box
    And I can see the "Next" button
    And I can see the "Previous" button

    Examples:
      | link                            | page                             |
      | View all datasets               | Unattached reporting datasets    |
      | View awaiting reporting data    | Requests awaiting reporting data |
      | View awaiting ledger assignment | Awaiting ledger assignment       |

    @test
    Examples:
      | link                        | page                            |
      | View awaiting quality check | Requests awaiting quality check |

  Scenario Outline: 04 Verify Next/Previous on last page of "<page>" page
    And I click on the "<link>" link
    When I visit the last page
    Then I cannot see the "Next" button
    And I can see the "Previous" button

    Examples:
      | link                            | page                             |
      | View all datasets               | Unattached reporting datasets    |
      | View awaiting reporting data    | Requests awaiting reporting data |
      | View awaiting ledger assignment | Awaiting ledger assignment       |

    @test
    Examples:
      | link                        | page                            |
      | View awaiting quality check | Requests awaiting quality check |

  @test
  Scenario: 05 Search for a record from another page
    And I click on the "View all datasets" link
    And I select "10000" from the number of records per page dropdown
    And I get the FRN of the last record
    And I select "2500" from the number of records per page dropdown
    When I search for the FRN
    Then I can see the FRN in the table