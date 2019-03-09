Feature: Challenge
  Go through set of challenges to develop your AI step by step

  Scenario: List all challenges
    Given JsBattle open in the browser
    And "Challenges" section open
    Then list of challenges contains 7 items
    And challenge [1] are unlocked
    And challenge [2, 3, 4, 5, 6, 7] are locked
    And challenge [1, 2, 3, 4, 5, 6, 7] are incomplete

  Scenario: Lose a challenge
    Given JsBattle open in the browser
    And "Challenges" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And start current challenge
    And battle view is displayed
    And battle is completed
    Then the challenge is lost

  Scenario: Win a challenge
    Given JsBattle open in the browser
    And "Challenges" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And type "<<jamro code>>" in AI Script editor
    And start current challenge
    And battle view is displayed
    And battle is completed
    Then the challenge is won

  Scenario: Unlock a challenge
    Given JsBattle open in the browser
    And "Challenges" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And type "<<jamro code>>" in AI Script editor
    And start current challenge
    And battle view is displayed
    And battle is completed
    And the challenge is won
    And click next challenge
    Then list of challenges contains 7 items
    And challenge [1, 2] are unlocked
    And challenge [3, 4, 5, 6, 7] are locked
    And challenge [1] are complete
    And challenge [2, 3, 4, 5, 6, 7] are incomplete
