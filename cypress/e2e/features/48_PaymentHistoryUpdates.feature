Feature: 48 Payment History Updates Feature

# npm run cypress:dev:one -- "\cypress\e2e\features\48_PaymentHistoryUpdates.feature"
# npm run cypress:local:one -- "\cypress\e2e\features\48_PaymentHistoryUpdates.feature"

  @dev
  Scenario: 01 insert test data via service bus message to ffc-pay-request

    Given I visit the "Payment management" homepage
    When I send "sfi23 payment" test data message to the service bus topic "ffc-pay-request-dev"

    Then I confirm that payment test data in dev has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data in dev has been inserted into the ffc-pay-submission database


    And I click on the "View payment events" link
    And I enter "current frn" into the "frn" field
    And I click on the "Search" button
    And I click "View" for table value "SFI-23"
    Then I should see the following table:
      | Activity                     | Status      |
      | Enriched with mandatory data | Completed   |
      | Final state calculated       | Completed   |
      | Submitted to payment ledger  | Completed   |
      | Acknowledged                 | In progress |
    Then I take a screenshot

    When I send "sfi23 return" test data message to the service bus topic "ffc-pay-return-dev"
    Then I confirm that "return" test data in dev has been inserted into ffc-pay-processing database
    And I wait for 10000 milliseconds
    And I click on the "View payment events" link
    And I enter "current frn" into the "frn" field
    And I click on the "Search" button
    And I click "View" for table value "SFI-23"
    Then I should see the following table:
      | Activity                     | Status      |
      | Enriched with mandatory data | Completed   |
      | Final state calculated       | Completed   |
      | Submitted to payment ledger  | Completed   |
      | Settled                      | Completed   |
      | Acknowledged                 | In progress |
    Then I take a screenshot



    When I send "sfi23 ppa" test data message to the service bus topic "ffc-pay-request-dev"
    Then I confirm that "ppa" test data in dev has been inserted into ffc-pay-processing database
    And I click on the "View payment events" link
    And I enter "current frn" into the "frn" field
    And I click on the "Search" button
    And I click "View" for table value "SFI-23"
    Then I should see the following table:
      | Activity                     | Status      |
      | Enriched with mandatory data | Completed   |
      | Final state calculated       | Completed   |
      | Submitted to payment ledger  | Completed   |
      | Settled                      | Completed   |
      | Acknowledged                 | In progress |
    Then I take a screenshot

  #The following steps complete the E2E journey in Request Editor using the values
  #from payment file  

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting debt data" link
    When I search for current FRN
    And I click on the "Enrich" link
    And I click on the "Irregular" radio button
    And I enter a valid debt discovered date in the past
    And I click on the "Continue" button
    And I click on the "Submit" button
    And I click on the "Sign out" link

    And I click on the "View awaiting manual ledger assignment" link
    When I search for current FRN
    And I click on the "Review" link
    And I click on the "Yes, I agree" radio button
    And I click on the "Continue" button
    And I see a success message for "has been updated and sent for quality checking."
    And I click on the "Sign out" link

    And I click on the "View awaiting ledger assignment quality check" link
    When I search for current FRN
    And I click on the "Review" link
    And I click on the "Yes" radio button
    And I click on the "Submit" button
    And I see a success message for "has been quality checked."

    Given I visit the "Payment management" homepage
    And I click on the "View payment events" link
    And I enter "current frn" into the "frn" field
    And I click on the "Search" button
    And I click "View" for table value "SFI-23"
    Then I should see the following table:
      | Activity                     | Status      |
      | Enriched with mandatory data | Completed   |
      | Final state calculated       | Completed   |
      | Submitted to payment ledger  | Completed   |
      | Settled                      | Completed   |
      | Acknowledged                 | In progress |
    Then I take a screenshot

  @dev
  Scenario:02 - Verify PPA and Return payment history (request ID 2 ):
    Given I visit the "Payment management" homepage
    And I click on the "View payment events" link
    And I enter "current frn" into the "frn" field
    And I click on the "Search" button
    And I click "View" for table value "£10,000.00"
    Then I should see the following table:
      | Activity                                        | Status      |
      | Enriched with mandatory data                    | Completed   |
      | Routed to Request Editor for debt data          | Completed   |
      | Payment Request Blocked                         | Paused      |
      | Debt data attached                              | Completed   |
      | Routed for Request Editor for ledger assignment | Completed   |
      | Ledger assigned                                 | Completed   |
      | Quality check passed                            | Completed   |
      | Final state calculated                          | Completed   |
      | Submitted to payment ledger                     | Completed   |
      | Acknowledged                                    | In progress |
    Then I take a screenshot


  @local
  Scenario: 01 insert test data via service bus message to ffc-pay-request

    Given I visit the "Payment management" homepage
    When I send "sfi23 payment" test data message to the service bus topic "ffc-pay-request-auto"

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database


    And I click on the "View payment events" link
    And I enter "current frn" into the "frn" field
    And I click on the "Search" button
    And I click "View" for table value "SFI-23"
    Then I should see the following table:
      | Activity                     | Status      |
      | Enriched with mandatory data | Completed   |
      | Final state calculated       | Completed   |
      | Submitted to payment ledger  | Completed   |
      | Acknowledged                 | In progress |
    Then I take a screenshot

    When I send "sfi23 return" test data message to the service bus topic "ffc-pay-return-auto"
    Then I confirm that "return" test data has been inserted into the "ffc-pay-processing" database
    And I wait for 10000 milliseconds
    And I click on the "View payment events" link
    And I enter "current frn" into the "frn" field
    And I click on the "Search" button
    And I click "View" for table value "SFI-23"
    Then I should see the following table:
      | Activity                     | Status      |
      | Enriched with mandatory data | Completed   |
      | Final state calculated       | Completed   |
      | Submitted to payment ledger  | Completed   |
      | Settled                      | Completed   |
      | Acknowledged                 | In progress |
    Then I take a screenshot



    When I send "sfi23 ppa" test data message to the service bus topic "ffc-pay-request-auto"
    Then I confirm that "ppa" test data has been inserted into the "ffc-pay-processing" database
    And I click on the "View payment events" link
    And I enter "current frn" into the "frn" field
    And I click on the "Search" button
    And I click "View" for table value "SFI-23"
    Then I should see the following table:
      | Activity                     | Status      |
      | Enriched with mandatory data | Completed   |
      | Final state calculated       | Completed   |
      | Submitted to payment ledger  | Completed   |
      | Settled                      | Completed   |
      | Acknowledged                 | In progress |
    Then I take a screenshot
