Feature: Challenge (remote)
  Go through set of challenges to develop your AI step by step

  @snapshot_challenges_default
  Scenario: List all challenges
    Given JsBattle open in the browser
    And Click Sign in button
    And Click "mock" auth method
    And click "#register-form button"
    And "Challenges" section open
    Then list of challenges contains 6 items
    And challenge [1] are unlocked
    And challenge [2, 3, 4, 5, 6] are locked
    And challenge [1, 2, 3, 4, 5, 6] are incomplete

  @integration
  @snapshot_challenges_default
  Scenario: Unlock challenge
    Given JsBattle open in the browser
    And Click Sign in button
    And Click "mock" auth method
    And click "#register-form button"
    And "Challenges" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And close challenge info
    And type "<<jamro code>>" in AI Script editor
    And battle is completed
    And the challenge is won
    And click next challenge
    Then list of challenges contains 6 items
    And challenge [1, 2] are unlocked
    And challenge [3, 4, 5, 6] are locked
    And challenge [1] are complete
    And challenge [2, 3, 4, 5, 6] are incomplete

  @integration
  @snapshot_challenges_default
  Scenario: Edit challenge code
    Given JsBattle open in the browser
    And Click Sign in button
    And Click "mock" auth method
    And click "#register-form button"
    And "Challenges" section open
    And open challenge 1
    And close challenge info
    When type "//some test code" in AI Script editor
    And wait 1000 miliseconds
    And "Challenges" section open
    And open challenge 1
    And close challenge info
    Then AI Script editor contains "//some test code"
