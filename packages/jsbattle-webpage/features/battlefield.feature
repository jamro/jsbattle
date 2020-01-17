Feature: Battlefield
  Allows fighting in custom battles to test the AI

  Scenario: Tank list contains all bundled scripts
    Given JsBattle open in the browser
    And "Battlefield" section open
    Then list of tanks consists of [crawler, crazy, dummy, chicken, dodge, sniper, jamro, kamikaze]

  Scenario: All tanks are selected by default
    Given JsBattle open in the browser
    And "Battlefield" section open
    Then there are 8 tanks selected for a battle
    And list of tanks contains 8 items
    And there is 1 "crawler" tank selected
    And there are 1 "crazy" tanks selected
    And there are 1 "dummy" tanks selected
    And there are 1 "chicken" tanks selected
    And there are 1 "dodge" tanks selected
    And there are 1 "sniper" tanks selected
    And there are 1 "jamro" tanks selected
    And there are 1 "kamikaze" tanks selected

  @smoke
  Scenario: Changing amount of tanks
    Given JsBattle open in the browser
    And "Battlefield" section open
    When press plus button of "crawler" tank
    Then there are 9 tanks selected for a battle
    And there are 2 "crawler" tanks selected

  Scenario: amount of tanks cannot be decreased below zero
    Given JsBattle open in the browser
    And "Battlefield" section open
    When press minus button of "crawler" tank 10 times
    Then there are 0 "crawler" tanks selected

  Scenario: amount of tanks cannot be increased above ten
    Given JsBattle open in the browser
    And "Battlefield" section open
    When press plus button of "crawler" tank 20 times
    Then there are 10 "crawler" tanks selected

  @smoke
  @integration
  Scenario: Create a custom tank
    Given JsBattle open in the browser
    And "Battlefield" section open
    When click create tank button
    Then list of tanks contains 9 items

  Scenario: Removal of a custom tank
    Given JsBattle open in the browser
    And "Battlefield" section open
    And AI scripts named [alpha]
    When delete tank "alpha" and confirm
    Then list of tanks contains 8 items
    And list of tanks does not contain "alpha" tank

  Scenario: Aborting during removal of a custom tank
    Given JsBattle open in the browser
    And "Battlefield" section open
    And AI scripts named [alpha]
    When delete tank "alpha" and abort
    Then list of tanks contains 9 items
    And list of tanks contains "alpha" tank

  Scenario: The battle can be started when there are at least two tanks
    Given JsBattle open in the browser
    And no tanks selected for the battle
    And "Battlefield" section open
    When press plus button of "crawler" tank
    And press plus button of "crazy" tank
    Then there are 2 tanks selected for a battle
    And Start Battle button is enabled

  Scenario: The battle cannot be started when not enough tanks
    Given JsBattle open in the browser
    And no tanks selected for the battle
    And "Battlefield" section open
    When press plus button of "crawler" tank
    Then there are 1 tank selected for a battle
    And Start Battle button is disabled

  @smoke
  Scenario: Editing custom tank
    Given JsBattle open in the browser
    And "Battlefield" section open
    And AI scripts named [alpha]
    When edit tank "alpha"
    Then "Editor" section is selected in the navigation bar
    And Edited AI Script name is "alpha"
