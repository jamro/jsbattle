Feature: Navigation
  Allow navigation across sections via top menu links

  Scenario: Challenges opened by default
    Given JsBattle open in the browser
    Then "Challenges" section is selected in the navigation bar

  @smoke
  @integration
  Scenario Outline: Navigate from <page1> to <page2>
    Given JsBattle open in the browser
    When navigate to <page1> section
    And navigate to <page2> section
    Then <page2> section is selected in the navigation bar

    Examples:
        | page1           | page2           |
        | "Battlefield"   | "Challenges"    |
        | "Challenges"    | "Editor"        |
        | "Editor"        | "Battlefield"   |

  Scenario: Open documentation
    Given JsBattle open in the browser
    When navigate to "Docs" section
    Then new tab named "JsBattle Docs" is open
