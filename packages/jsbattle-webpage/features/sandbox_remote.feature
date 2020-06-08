Feature: Sandbox (remote)
Allow editing, storing and testing custom AI scripts (when logged in)

  @integration
  @snapshot_sandbox
  Scenario: Remove AI Scripts
    Given JsBattle open in the browser
    And Click Sign in button
    And Click "mock" auth method
    And click "#register-form button"
    And "Sandbox" section open
    When click create tank button
    And list of AI scripts contains 1 items
    And click remove button of AI Script no 1
    And confirm removal of AI Script no 1
    Then list of AI scripts contains 0 items

  @integration
  @snapshot_sandbox
  Scenario: Rename AI Script
    Given JsBattle open in the browser
    And Click Sign in button
    And Click "mock" auth method
    And click "#register-form button"
    And "Sandbox" section open
    When click create tank button
    And list of AI scripts contains 1 items
    And AI Script no 1 open
    When click AI Script rename button
    And type "myAwesomeAI" as AI Script name
    And confirm renaming AI Script name
    And "Sandbox" section open
    Then list of AI scripts consists of [myAwesomeAI]

  @integration
  @snapshot_sandbox
  Scenario: Save changes in edited script
    Given JsBattle open in the browser
    And Click Sign in button
    And Click "mock" auth method
    And click "#register-form button"
    And "Sandbox" section open
    When click create tank button
    And list of AI scripts contains 1 items
    And AI Script no 1 open
    When type "//some test code" in AI Script editor
    And wait 1000 miliseconds
    And "Sandbox" section open
    And edit AI Script no 1
    Then AI Script editor contains "//some test code"
