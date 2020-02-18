Feature: Statistics
  Gather statistics about users behaviour

  Scenario: Notify about listing challenges
    Given JsBattle open in the browser
    When navigate to "Sandbox" section
    And navigate to "Challenges" section
    Then GA event "challenges/list" is sent

  Scenario Outline: Notify about opening challenge #<index>
    Given JsBattle open in the browser
    And all challenges unlocked
    And "Challenges" section open
    When open challenge <index>
    And wait for live code widget
    Then GA event "challenges/challenge_<index>/open" is sent

    Examples:
      | index |
      |     1 |
      |     2 |
      |     5 |

  Scenario: Notify about winning a challenge
    Given JsBattle open in the browser
    And "Challenges" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And open tab "code" of live code panel
    And type "<<jamro code>>" in AI Script editor
    And battle is completed
    And the challenge is won
    Then GA event "challenges/challenge_1/win" is sent

  Scenario: Notify about opening custom battle section
    Given JsBattle open in the browser
    And "Sandbox" section open
    Then GA event "sandbox/open" is sent

  Scenario: Notify about creating new AI Script
    Given JsBattle open in the browser
    And "Sandbox" section open
    When click create tank button
    Then GA event "sandbox/create" is sent

  Scenario: Notify about removing an AI Script
    Given JsBattle open in the browser
    And "Sandbox" section open
    And AI scripts named [alpha]
    When delete tank "alpha" and confirm
    Then GA event "sandbox/remove" is sent
