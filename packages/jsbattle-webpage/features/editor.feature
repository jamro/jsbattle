  Feature: Editor
  Allow editing and storing AI scripts

  Scenario: List of AIs is empty by default
    Given there is JsBattle open in the browser
    When navigate to "Editor" section
    Then list of AI scripts contains 0 items

  Scenario: Create AI Script
    Given there is JsBattle open in the browser
    And "Editor" section is open
    When click create tank button
    Then list of AI scripts contains 1 items

  Scenario: Creation of AI Script renders a unique name
    Given there is JsBattle open in the browser
    And "Editor" section is open
    When click create tank button
    And click create tank button
    And click create tank button
    And click create tank button
    Then all tank names are unique

  Scenario: List AI Scripts
    Given there is JsBattle open in the browser
    And "Editor" section is open
    And there are AI scripts named [alpha, beta, delta, gamma]
    Then list of AI scripts consists of [alpha, beta, delta, gamma]

  Scenario: Remove AI Scripts
    Given there is JsBattle open in the browser
    And "Editor" section is open
    And there are AI scripts named [alpha, beta, gamma]
    When click remove button of AI Script no 2
    And confirm removal of AI Script no 2
    Then list of AI scripts consists of [alpha, gamma]

  Scenario: Abort removal of AI Script
    Given there is JsBattle open in the browser
    And "Editor" section is open
    And there are AI scripts named [a001, b002, c003, d004, e005, f006]
    When click remove button of AI Script no 3
    And abort removal of AI Script no 3
    Then list of AI scripts consists of [a001, b002, c003, d004, e005, f006]

  Scenario: Rename AI Script
    Given there is JsBattle open in the browser
    And "Editor" section is open
    And there are AI scripts named [alpha, beta, gamma]
    And AI Script no 2 is open
    When click AI Script rename button
    And type "my awesome AI" as AI Script name
    And confirm renaming AI Script name
    And stop editing AI Script
    Then list of AI scripts consists of [alpha, my awesome AI, gamma]

  Scenario: Abort renaming of AI Script
    Given there is JsBattle open in the browser
    And "Editor" section is open
    And there are AI scripts named [alpha, beta, gamma]
    And AI Script no 2 is open
    When click AI Script rename button
    And type "my awesome AI" as AI Script name
    And abort renaming AI Script name
    And stop editing AI Script
    Then list of AI scripts consists of [alpha, beta, gamma]

  Scenario: Renamed script must be unique
    Given there is JsBattle open in the browser
    And "Editor" section is open
    And there are AI scripts named [alpha, beta, gamma]
    And AI Script no 2 is open
    When click AI Script rename button
    And type "alpha" as AI Script name
    And confirm renaming AI Script name
    Then there is an error "name must be unique"

  Scenario: Save changes in edited script
    Given there is JsBattle open in the browser
    And "Editor" section is open
    And there are 2 AI scripts
    And AI Script no 2 is open
    When type "//some test code" in AI Script editor
    And click save AI Script
    And stop editing AI Script
    And edit AI Script no 2
    Then AI Script editor contains "//some test code"

  Scenario: Confirm on warning before exiting unsaved script
    Given there is JsBattle open in the browser
    And "Editor" section is open
    And there are 2 AI scripts
    And AI Script no 2 is open
    When type "//some test code" in AI Script editor
    And stop editing AI Script
    And confirm saving AI Script on exit warning
    And edit AI Script no 2
    Then AI Script editor contains "//some test code"

  Scenario: Abort on warning before exiting unsaved script
    Given there is JsBattle open in the browser
    And "Editor" section is open
    And there are AI scripts named [alpha]
    And code of AI Script "alpha" is "//some initial code"
    And AI Script no 1 is open
    When type "//some test code" in AI Script editor
    And stop editing AI Script
    And abort saving AI Script on exit warning
    And edit AI Script no 1
    Then AI Script editor contains "//some initial code"
