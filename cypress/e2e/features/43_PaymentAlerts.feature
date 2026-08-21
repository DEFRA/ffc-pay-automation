Feature: 43 Payment Alerts

# npm run cypress:local:one -- "cypress\e2e\features\43_PaymentAlerts.feature"
# npm run cypress:dev:one -- "cypress\e2e\features\43_PaymentAlerts.feature"

# This feature file is designed to test functionality of Payment Alerts section in Payment Management UI

  # @local @dev
  # Scenario: 01 Confirm initial elements on page

  # #This scenario confirms that all expected elements are present on initial page load

  #   #Given I restart the local environment
  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I should see the heading "Manage email alerts"
  #   Then I should see the paragraph "Email alerts are emails sent to a recipient when certain events happen."
  #   Then I should see the link "Manage by scheme"
  #   Then I should see the hint "View, edit and add alert recipients by individual scheme"
  #   Then I should see the link "Manage by recipient"
  #   Then I should see the hint "View, edit and add alert recipients by email address"
  #   Then I take a screenshot for Feature 43 and Scenario 1

  # @local @dev
  # Scenario: 02 Confirm correct alert types for SFI-22

  #  #This scenario confirms that correct alert types are present for SFI-22 scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "SFI22"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 2

  # @local @dev
  # Scenario: 03 Confirm correct alert types for SFI-Pilot

  #  #This scenario confirms that correct alert types are present for SFI-Pilot scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "SFI Pilot"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 3

  # @local @dev
  # Scenario: 04 Confirm correct alert types for Lump Sums

  #  #This scenario confirms that correct alert types are present for Lump Sums scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "Lump Sums"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 4

  # # @local @dev
  # # Not a valid scheme right now
  # # Scenario: 05 Confirm correct alert types for Vet Visits

  # #  #This scenario confirms that correct alert types are present for Vet Visits scheme

  # #   Given I visit the "Payment management" homepage
  # #   When I click on the "Manage email alerts" link
  # #   Then I click on the "Manage by scheme" link
  # #   And I select the scheme "Vet Visits"
  # #   And I click on the "Search" button

  # # #The following alert types should now be visible  

  # #   Then I should see "Batch Rejected"
  # #   Then I should see "Batch Quarantined"
  # #   Then I should see "Payment Rejected"
  # #   Then I should see "Payment Dax Rejected"
  # #   Then I should see "Payment Invalid Bank"
  # #   Then I should see "Payment Processing Failed"
  # #   Then I should see "Payment Settlement Unsettled"
  # #   Then I should see "Payment Settlement Unmatched"
  # #   Then I should see "Response Rejected"
  # #   Then I should see "Payment Request Blocked"
  # #   Then I should see "Payment Dax Unavailable"
  # #   Then I should see "Receiver Connection Failed"
  # #   Then I should see "Demographics Processing Failed"
  # #   Then I should see "Demographics Update Failed"
  # #   Then I should see "Event Save Alert"
  # #   Then I should see "Table Create Alert"
  # #   Then I should see "Responses Processing Failed"
  # #   Then I should see "Customer Update Processing Failed"
  # #   Then I should see "Tracking Update Failure"
  # #   Then I take a screenshot for Feature 43 and Scenario 5

  # @local @dev
  # Scenario: 06 Confirm correct alert types for Countryside Stewardship

  #  #This scenario confirms that correct alert types are present for Countryside Stewardship scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "CS"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 6

  # @local @dev
  # Scenario: 07 Confirm correct alert types for Basic Payment Scheme

  #  #This scenario confirms that correct alert types are present for Basic Payment Scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "BPS"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 7

  # @local @dev
  # Scenario: 08 Confirm correct alert types for Manual Invoice scheme

  #  #This scenario confirms that correct alert types are present for Manual Invoice scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "Manual Invoice"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 8

  # @local @dev
  # Scenario: 09 Confirm correct alert types for Environmental Stewardship scheme

  #  #This scenario confirms that correct alert types are present for Environmental Stewardship scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "ES"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 9

  # @local @dev
  # Scenario: 10 Confirm correct alert types for IMPS scheme

  #  #This scenario confirms that correct alert types are present for IMPS scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "IMPS"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 10

  # @local @dev
  # Scenario: 11 Confirm correct alert types for Forestry Commission scheme

  #  #This scenario confirms that correct alert types are present for Forestry Commission scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "FC"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 11

  # @local @dev
  # Scenario: 12 Confirm correct alert types for SFI-23 scheme

  #  #This scenario confirms that correct alert types are present for SFI-23 scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "SFI23"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 12

  # @local @dev
  # Scenario: 13 Confirm correct alert types for Delinked Payments scheme

  #  #This scenario confirms that correct alert types are present for Delinked Payments scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "Delinked"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 13

  # @local @dev
  # Scenario: 14 Confirm correct alert types for Expanded SFI Offer scheme

  #  #This scenario confirms that correct alert types are present for Expanded SFI Offer scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "Expanded SFI Offer"
  #   And I click on the "Search" button
    
  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 14

  # @local @dev
  # Scenario: 15 Confirm correct alert types for Countryside Stewardship Higher Tier (Revenue) scheme

  #  #This scenario confirms that correct alert types are present for Countryside Stewardship Higher Tier (Revenue) scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "COHT Revenue"
  #   And I click on the "Search" button

  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 15

  # @local @dev
  # Scenario: 16 Confirm correct alert types for Countryside Stewardship Higher Tier (Capital) scheme

  #  #This scenario confirms that correct alert types are present for Countryside Stewardship Higher Tier (Capital) scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "COHT Capital"
  #   And I click on the "Search" button
  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 16

  # @local @dev
  # Scenario: 17 Confirm correct alert types for Farm Payments Technical Test

  #  #This scenario confirms that correct alert types are present for Countryside Stewardship Higher Tier (Capital) scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "Farm Payments Technical Test"
  #   And I click on the "Search" button
  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 17

  # @local @dev
  # Scenario: 18 Confirm correct alert types for Woodland Management Plan

  #  #This scenario confirms that correct alert types are present for Countryside Stewardship Higher Tier (Capital) scheme

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "Woodland Management Plan"
  #   And I click on the "Search" button
  # #The following alert types should now be visible  

  #   Then I should see "Batch Rejected"
  #   Then I should see "Batch Quarantined"
  #   Then I should see "Payment Rejected"
  #   Then I should see "Payment Dax Rejected"
  #   Then I should see "Payment Invalid Bank"
  #   Then I should see "Payment Processing Failed"
  #   Then I should see "Payment Settlement Unsettled"
  #   Then I should see "Payment Settlement Unmatched"
  #   Then I should see "Response Rejected"
  #   Then I should see "Payment Request Blocked"
  #   Then I should see "Payment Dax Unavailable"
  #   Then I should see "Receiver Connection Failed"
  #   Then I should see "Demographics Processing Failed"
  #   Then I should see "Demographics Update Failed"
  #   Then I should see "Event Save Alert"
  #   Then I should see "Table Create Alert"
  #   Then I should see "Responses Processing Failed"
  #   Then I should see "Customer Update Processing Failed"
  #   Then I should see "Tracking Update Failure"
  #   Then I take a screenshot for Feature 43 and Scenario 18

  # @local @dev
  # Scenario: 17 Confirm that all schemes are successfully cascaded when Show All Sections is clicked

  # #This scenario confirms that all schemes are successfully cascaded when Show All Sections is clicked
  # #Please note, Cypress is unable to screenshot this scenario due to the extreme length of page when all schemes are cascaded

  #   Given I visit the "Payment management" homepage
  #   When I click on the "Manage email alerts" link
  #   Then I click on the "Manage by scheme" link
  #   And I select the scheme "Woodland Management Plan"
  #   And I click on the "Search" button
  #   And I click on the "Show all sections" button

  # #The following line confirms that all "Show" chevrons have converted to "Hide"

  #   Then on the Alerts page I confirm that all schemes have successfully cascaded

  @local @dev
  Scenario: 18 Confirm initial elements on Add new alert recipient page

    Given I visit the "Payment management" homepage
    When I click on the "Manage email alerts" link
    And I click on the "Manage by recipient" link
    

    #verify this page has correct content

    And I should see the heading "Manage email alerts by recipient"
    And I should see the paragraph "Update, add and remove email alerts using the recipient's email address."
    And I should see the paragraph "Details of the alert types including what the recipient should do, can be found on the"
    And I should see the link "alerts information page"

    And I should see the link "Update recipient alerts"
    And I should see the link "Add new recipient"
    And I should see the link "Remove recipient"

    And I should see the hint "View and/or update a recipient's email alerts"
    And I should see the hint "Add a new recipient and set email alerts for schemes"
    And I should see the hint "Remove a recipient and their email alerts"
    
    And I click on the "Add new recipient" link

    And I should see the heading "Add new alert recipient"
    And I should see the paragraph "Add a new recipient to all alerts or by alert type for all schemes."
    And I should see the paragraph "Find out more about alert types on the"

    And I should see the label "Email address"
    And I should see the field "email address" 


    Then on the Add new alert recipient page I confirm that "sub header" is displayed
    Then on the Add new alert recipient page I confirm that "email label" is displayed
    Then on the Add new alert recipient page I confirm that "email field" is displayed
    Then on the Add new alert recipient page I confirm that "select scheme label" is displayed
    Then on the Add new alert recipient page I confirm that "select scheme dropdown" is displayed

    #Following line confirms that there are 16 instances of all alert types, one for each current scheme

    Then on the Add new alert recipient page I confirm that all options are present when no filter selected
    Then I take a screenshot for Feature 43 and Scenario 18

  @local @dev
  Scenario: 19 Confirm filter by scheme is functioning correctly

    Given I visit the "Payment management" homepage
    When I click on the "Manage email alerts" link
    Then on the Alerts page I click the "add new alerts recipient button"

#Cycle through options in Select Scheme dropdown to confirm all expected are present

    Then on the Add new alert recipient page I select "SFI-22" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "SFI-Pilot" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Lump Sum Payments" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Vet Visits" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Countryside Stewardship" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Basic Payment Scheme" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Manual Injection" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Environmental Stewardship" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "IMPS" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Forestry Commission" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "SFI-23" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Delinked Payments" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Expanded SFI Offer" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Countryside Stewardship Higher Tier (Revenue)" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Countryside Stewardship Higher Tier (Capital)" from Select Scheme dropdown

#Filter by SFI-22 and confirm that all other scheme options are no longer displayed

    Then on the Add new alert recipient page I select "SFI-22" from Select Scheme dropdown
    Then on the Add new alert recipient page I confirm that only one set of options is displayed
    Then I take a screenshot for Feature 43 and Scenario 19

  @local @dev
  Scenario: 20 Confirm that correct error message is displayed when invalid email used

  #This scenario confirms that correct error message is displayed when email with invalid format is used

    Given I visit the "Payment management" homepage
    When I click on the "Manage email alerts" link
    Then on the Alerts page I click the "add new alerts recipient button"

    Then on the Add new alert recipient page I enter "test@gmail.com" in the email field
    Then on the Add new alert recipient page I select "SFI-22" from Select Scheme dropdown
    Then on the Alerts page I click the "sfi22 all alerts button"
    Then on the Alerts page I click the "create new alert recipient button"
    Then on the Add new alert recipient page I confirm that "invalid email error message" is displayed
    Then I take a screenshot for Feature 43 and Scenario 20

  @local
  Scenario: 21 Confirm that new alert recipient can be successfully added

  #This scenario confirms that new alert recipient can be successfully added to all alert types

    Given I visit the "Payment management" homepage
    When I click on the "Manage email alerts" link
    Then on the Alerts page I click the "add new alerts recipient button"

    Then on the Add new alert recipient page I enter "fake.user@atos.net" in the email field
    Then on the Add new alert recipient page I select "SFI-22" from Select Scheme dropdown
    Then on the Alerts page I click the "sfi22 all alerts button"
    Then on the Alerts page I click the "create new alert recipient button"
    Then on the Alerts page I click the "sfi22 show button"

    Then on the Add new alert recipient page I confirm that recipient "fake.user@atos.net" has been added for each alert type
    Then I take a screenshot for Feature 43 and Scenario 21

  @dev
  Scenario: 21 Confirm that new alert recipient can be successfully added

  #This scenario confirms that new alert recipient can be successfully added to all alert types

    Given I visit the "Payment management" homepage
    When I click on the "Manage email alerts" link

  #For this to be repeatable in Dev, dummy email address will need to be deleted prior to being
  #added again.

    Then on the Alerts page I click the "sfi pilot show button"
    Then on the Alerts page I click the "edit button"
    Then on the Alerts page I click the "remove email button"
    Then on the Alerts page I click the "remove email button"

    Then on the Alerts page I click the "add new alerts recipient button"

    Then on the Add new alert recipient page I enter "john.doe@defra.gov.uk" in the email field
    Then on the Add new alert recipient page I select "SFI-Pilot" from Select Scheme dropdown
    Then on the Alerts page I click the "sfi pilot all alerts button"
    Then on the Alerts page I click the "create new alert recipient button"
    Then on the Alerts page I click the "sfi pilot show button"

    Then on the Add new alert recipient page I confirm that recipient "john.doe@defra.gov.uk" has been added for each alert type
    Then I take a screenshot for Feature 43 and Scenario 21
