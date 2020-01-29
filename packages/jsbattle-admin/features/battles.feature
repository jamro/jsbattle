Feature: Admin
  Manager Battles

  @smoke
  @integration
  Scenario: List battles
    Given admin open in the browser
    When open "Battles" section
    And the data table is displayed
    Then "Battles" section is selected

  Scenario: List battles (mock data)
    Given admin open in the browser
    When open "Battles" section
    And the data table is displayed
    Then "Battles" section is selected
    And data table contains 10 rows
