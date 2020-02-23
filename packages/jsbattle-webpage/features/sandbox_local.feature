Feature: Sandbox (local)
Allow editing, storing and testing custom AI scripts

  Scenario: List of AIs is empty by default
    Given JsBattle open in the browser
    When navigate to "Sandbox" section
    Then list of AI scripts contains 0 items

  Scenario: Create AI Script
    Given JsBattle open in the browser
    And "Sandbox" section open
    When click create tank button
    Then list of AI scripts contains 1 items

  Scenario: Creation of AI Script renders a unique name
    Given JsBattle open in the browser
    And "Sandbox" section open
    When click create tank button
    And click create tank button
    And click create tank button
    And click create tank button
    And click create tank button
    Then all tank names are unique

  Scenario: List AI Scripts
    Given JsBattle open in the browser
    And "Sandbox" section open
    And AI scripts named [alpha, beta, delta, gamma]
    Then list of AI scripts consists of [alpha, beta, delta, gamma]

  Scenario: Remove AI Scripts
    Given JsBattle open in the browser
    And "Sandbox" section open
    And AI scripts named [alpha, beta, gamma]
    When click remove button of AI Script no 2
    And confirm removal of AI Script no 2
    Then list of AI scripts consists of [alpha, gamma]

  Scenario: Abort removal of AI Script
    Given JsBattle open in the browser
    And "Sandbox" section open
    And AI scripts named [a001, b002, c003, d004, e005, f006]
    When click remove button of AI Script no 3
    And abort removal of AI Script no 3
    Then list of AI scripts consists of [a001, b002, c003, d004, e005, f006]

  Scenario: Rename AI Script
    Given JsBattle open in the browser
    And "Sandbox" section open
    And AI scripts named [alpha, beta, gamma]
    And AI Script no 2 open
    When click AI Script rename button
    And type "myAwesomeAI" as AI Script name
    And confirm renaming AI Script name
    And "Sandbox" section open
    Then list of AI scripts consists of [alpha, myAwesomeAI, gamma]

  Scenario: Abort renaming of AI Script
    Given JsBattle open in the browser
    And "Sandbox" section open
    And AI scripts named [alpha, beta, gamma]
    And AI Script no 2 open
    When click AI Script rename button
    And type "my awesome AI" as AI Script name
    And abort renaming AI Script name
    And "Sandbox" section open
    Then list of AI scripts consists of [alpha, beta, gamma]

  Scenario: Renamed script must be unique
    Given JsBattle open in the browser
    And "Sandbox" section open
    And AI scripts named [alpha, beta, gamma]
    And AI Script no 2 open
    When click AI Script rename button
    And type "alpha" as AI Script name
    And confirm renaming AI Script name
    Then there is an error "name must be unique"

  Scenario Outline: Name <name> is not allowed for scripts
    Given JsBattle open in the browser
    And "Sandbox" section open
    And AI scripts named [alpha, beta, gamma]
    And AI Script no 2 open
    When click AI Script rename button
    And type <name> as AI Script name
    And confirm renaming AI Script name
    Then there is an error "Wrong script name"

    Examples:
    | name                  |
    | ""                    |
    | "a"                   |
    | "name with space"     |
    | "no/slash"            |
    | "no^$pecia!$"         |
    | "too_long901234567890"|

  Scenario: Save changes in edited script
    Given JsBattle open in the browser
    And "Sandbox" section open
    And 2 AI scripts
    And AI Script no 2 open
    When type "//some test code" in AI Script editor
    And wait 1000 miliseconds
    And "Sandbox" section open
    And edit AI Script no 2
    Then AI Script editor contains "//some test code"

  Scenario: Play sanbox battle
    Given JsBattle open in the browser
    And "Sandbox" section open
    And AI script named [alpha]
    And battle quality set to "0"
    And battle speed set to "50"
    When AI Script no 1 open
    And type "<<jamro code>>" in AI Script editor
    And battle is completed
    Then sandbox results are displayed
    And winner tank is "alpha"
    And loser tank is "dummy"

  Scenario: Restart sanbox battle
    Given JsBattle open in the browser
    And "Sandbox" section open
    And AI script named [alpha]
    And battle quality set to "0"
    And battle speed set to "50"
    When AI Script no 1 open
    And type "<<jamro code>>" in AI Script editor
    And battle is completed
    And sandbox results are displayed
    And restart the battle
    Then battle is completed
