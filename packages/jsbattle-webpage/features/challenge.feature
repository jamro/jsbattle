Feature: Challenge
  Go through set of challenges to develop your AI step by step


  Scenario: List all challenges
    Given JsBattle open in the browser
    And "Challenges" section open
    Then list of challenges contains 6 items
    And challenge [1] are unlocked
    And challenge [2, 3, 4, 5, 6] are locked
    And challenge [1, 2, 3, 4, 5, 6] are incomplete

  Scenario Outline: Lose challenge #<index>
    Given JsBattle open in the browser
    And "Challenges" section open
    And all challenges unlocked
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge <index>
    And close challenge info
    And challenge battle is completed
    Then the challenge is lost
    And challenge battle is restarted

    Examples:
    | index |
    |     1 |
    |     2 |
    |     3 |
    |     4 |
    |     5 |
    |     6 |

  Scenario: Win a challenge
    Given JsBattle open in the browser
    And "Challenges" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And close challenge info
    And type "<<jamro code>>" in AI Script editor
    And challenge battle is restarted
    And challenge battle is completed
    Then the challenge is won

  Scenario: Unlock a challenge
    Given JsBattle open in the browser
    And "Challenges" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And close challenge info
    And type "<<jamro code>>" in AI Script editor
    And challenge battle is restarted
    And challenge battle is completed
    And the challenge is won
    And click next challenge
    Then list of challenges contains 6 items
    And challenge [1, 2] are unlocked
    And challenge [3, 4, 5, 6] are locked
    And challenge [1] are complete
    And challenge [2, 3, 4, 5, 6] are incomplete
