Feature: League
Fight against other players

  @snapshot_league
  Scenario: Show leaderboard
    Given JsBattle open in the browser
    And Click Sign in button
    And Click "mock" auth method
    And click "#register-form button"
    When "League" section open
    Then League leaderboard is not empty

  @snapshot_league
  Scenario: Replay league battle
    Given JsBattle open in the browser
    And Click Sign in button
    And Click "mock" auth method
    And click "#register-form button"
    And "League" section open
    When click watch of league battle number 1
    And battle quality set to "0"
    And battle speed set to "50"
    Then battle is completed
