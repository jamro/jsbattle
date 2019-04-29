Feature: Challenge
  Go through set of challenges to develop your AI step by step

  Scenario: List all challenges
    Given JsBattle open in the browser
    And "Challenges" section open
    Then list of challenges contains 10 items
    And challenge [1] are unlocked
    And challenge [2, 3, 4, 5, 6, 7, 8, 9, 10] are locked
    And challenge [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] are incomplete

  Scenario Outline: Lose challenge #<index>
    Given JsBattle open in the browser
    And "Challenges" section open
    And all challenges unlocked
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge <index>
    And close challenge info
    And start current challenge
    And battle view is displayed
    And battle is completed
    Then the challenge is lost

    Examples:
    | index |
    |     1 |
    |     2 |
    |     3 |
    |     4 |
    |     5 |
    |     6 |
    |     7 |
    |     8 |
    |     9 |
    |    10 |

  Scenario: Win a challenge
    Given JsBattle open in the browser
    And "Challenges" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And close challenge info
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
    And close challenge info
    And type "<<jamro code>>" in AI Script editor
    And start current challenge
    And battle view is displayed
    And battle is completed
    And the challenge is won
    And click next challenge
    Then list of challenges contains 10 items
    And challenge [1, 2] are unlocked
    And challenge [3, 4, 5, 6, 7, 8, 9, 10] are locked
    And challenge [1] are complete
    And challenge [2, 3, 4, 5, 6, 7, 8, 9, 10] are incomplete

  Scenario: Open challenge info modal
    Given JsBattle open in the browser
    And all challenges unlocked
    And "Challenges" section open
    When open challenge 1
    And close challenge info
    And open challenge info
    Then challenge info is shown
    And challenge info description is not empty

  Scenario: Close challenge info modal
    Given JsBattle open in the browser
    And all challenges unlocked
    And "Challenges" section open
    When open challenge 1
    And close challenge info
    Then challenge info is not shown


  Scenario: Show challenge info only at the beginning
    Given JsBattle open in the browser
    And "Challenges" section open
    And all challenges unlocked
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And challenge info is shown
    And close challenge info
    And start current challenge
    And battle view is displayed
    And battle is completed
    And the challenge is lost
    And retry challenge
    Then challenge info is not shown

  Scenario Outline: Show challenge #<index> info
    Given JsBattle open in the browser
    And all challenges unlocked
    And "Challenges" section open
    When open challenge <index>
    Then challenge info is shown
    And challenge info description is not empty
    And all links in challenge info work

    Examples:
    | index |
    |     1 |
    |     2 |
    |     3 |
    |     4 |
    |     5 |
    |     6 |
    |     7 |
    |     8 |
    |     9 |
    |    10 |
