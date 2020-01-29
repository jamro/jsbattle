Feature: Admin
  Manager users

  @smoke
  @integration
  Scenario: List users
    Given admin open in the browser
    When open "Users" section
    And the data table is displayed
    Then "Users" section is selected

  Scenario: List users (mock data)
    Given admin open in the browser
    When open "Users" section
    And the data table is displayed
    Then "Users" section is selected
    And data table contains 10 rows
