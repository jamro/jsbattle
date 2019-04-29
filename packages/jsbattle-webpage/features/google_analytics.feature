Feature: Statistics
  Gather statistics about users behaviour

  Scenario: Notify about listing challenges
    Given JsBattle open in the browser
    When navigate to "Battlefield" section
    And navigate to "Challenges" section
    Then GA event "challenges/list" is sent

  Scenario: Notify about opening a challenge
    Given JsBattle open in the browser
    And "Challenges" section open
    When open challenge 1
    Then GA event "challenges/challenge_1/open" is sent

  Scenario Outline: Notify about starting challenge #<index> battle
    Given JsBattle open in the browser
    And all challenges unlocked
    And "Challenges" section open
    When open challenge <index>
    And close challenge info
    And start current challenge
    Then GA event "challenges/challenge_<index>/battle" is sent

    Examples:
      | index |
      |     1 |
      |     2 |
      |     5 |
      |     8 |

  Scenario: Notify about winning a challenge
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
    Then GA event "challenges/challenge_1/win" is sent

  Scenario: Notify about losing a challenge
    Given JsBattle open in the browser
    And "Challenges" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And close challenge info
    And start current challenge
    And battle view is displayed
    And battle is completed
    And the challenge is lost
    Then GA event "challenges/challenge_1/lose" is sent

  Scenario: Notify about opening custom battle section
    Given JsBattle open in the browser
    And "Battlefield" section open
    Then GA event "custom_battle/open" is sent

  Scenario: Notify about starting a custom battle (free for all)
    Given JsBattle open in the browser
    And tanks [dummy, jamro] selected for the battle
    And "Battlefield" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When press play battle button
    And battle view is displayed
    Then GA event "custom_battle/start/free_for_all" is sent

  Scenario: Notify about starting a custom battle (team mode)
    Given JsBattle open in the browser
    And tanks [dummy, jamro] selected for the battle
    And "Battlefield" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When select team mode
    And press play battle button
    And battle view is displayed
    Then GA event "custom_battle/start/team_mode" is sent

  Scenario: Notify about completing a custom battle
    Given JsBattle open in the browser
    And tanks [dummy, jamro] selected for the battle
    And "Battlefield" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When press play battle button
    And battle view is displayed
    And battle results are shown
    Then GA event "custom_battle/complete" is sent

  Scenario: Notify about choosing a tank for a custom battle
    Given JsBattle open in the browser
    And "Battlefield" section open
    And no tanks selected for the battle
    And 2 "jamro" tanks selected for the battle
    And 5 "sniper" tanks selected for the battle
    And 1 "crazy" tanks selected for the battle
    And battle quality set to "0"
    And battle speed set to "50"
    When press play battle button
    And battle view is displayed
    Then GA event "custom_battle/tank/jamro/2" is sent
    And GA event "custom_battle/tank/sniper/5" is sent
    And GA event "custom_battle/tank/crazy/1" is sent

  Scenario: Notify about creating new AI Script from custom battle section
    Given JsBattle open in the browser
    And "Battlefield" section open
    When click create tank button
    Then GA event "editor/create" is sent

  Scenario: Notify about creating new AI Script from editor section
    Given JsBattle open in the browser
    And "Editor" section open
    When click create tank button
    Then GA event "editor/create" is sent

  Scenario: Notify about removing an AI Script from custom battle section
    Given JsBattle open in the browser
    And "Battlefield" section open
    And AI scripts named [alpha]
    When delete tank "alpha" and confirm
    Then GA event "editor/remove" is sent

  Scenario: Notify about removing an AI Script from editor section
    Given JsBattle open in the browser
    And "Editor" section open
    And AI scripts named [alpha, beta, gamma]
    When click remove button of AI Script no 2
    And confirm removal of AI Script no 2
    Then GA event "editor/remove" is sent
