Feature: Auth
  Sign-up, sign-in and permissons

  @integration
  Scenario: Not signed in by default
    Given JsBattle open in the browser
    Then Sign in button is available

  @snapshot_oauth_all
  Scenario: List all auth methods
    Given JsBattle open in the browser
    When Click Sign in button
    Then "mock" auth method is available
    And "facebook" auth method is available
    And "google" auth method is available
    And "github" auth method is available

  @snapshot_oauth_all
  @integration
  Scenario: Login
    Given JsBattle open in the browser
    When Click Sign in button
    And Click "mock" auth method
    And user name is "Mock User"

  @snapshot_oauth_all
  @smoke
  @integration
  Scenario: Logout
    Given JsBattle open in the browser
    When Click Sign in button
    And Click "mock" auth method
    And Click Logout button
    Then Sign in button is available

  @snapshot_oauth_all
  Scenario: Admin not visible for user role
    Given JsBattle open in the browser
    When Click Sign in button
    And Click "mock" auth method
    Then Admin link is not visible

  @snapshot_admin
  Scenario: Admin visible for admin role
    Given JsBattle open in the browser
    When Click Sign in button
    And Click "mock" auth method
    Then Admin link is visible

  @snapshot_unregistered
  Scenario: Ask for username at the first time
    Given JsBattle open in the browser
    When Click Sign in button
    And Click "mock" auth method
    Then register form is shown
    And input "#register-form #username" has value "mock"
    And input "#register-form #displayname" has value "Mock User"

  @snapshot_oauth_all
  Scenario: Do not ask for username when registered
    Given JsBattle open in the browser
    When Click Sign in button
    And Click "mock" auth method
    Then register form is not shown

  @snapshot_unregistered
  @integration
  Scenario: Update profile when registered
    Given JsBattle open in the browser
    When Click Sign in button
    And Click "mock" auth method
    And register form is shown
    And type "mock-registred" in "#register-form #username" input
    And type "Reg User" in "#register-form #displayname" input
    And click "#register-form button"
    Then register form is not shown
    And user name is "Reg User"

  Scenario: Continue as guest
    Given JsBattle open in the browser
    When Click Sign in button
    And Click "guest" auth method
    Then "Challenges" section is selected in the navigation bar
    And challenge [1] are unlocked

  @integration_only
  Scenario: submit chalenges when registering
    Given JsBattle open in the browser
    And "Challenges" section open
    And battle quality set to "0"
    And battle speed set to "50"
    When open challenge 1
    And close challenge info
    And type "<<jamro code>>" in AI Script editor
    And battle is completed
    And the challenge is won
    And Click Sign in button
    And Click "mock" auth method
    And register form is shown
    And type "mock-registred" in "#register-form #username" input
    And type "Reg User" in "#register-form #displayname" input
    And click "#register-form button"
    And "Challenges" section open
    Then challenge [1, 2] are unlocked

  @integration_only
  Scenario: submit scripts when registering
    Given JsBattle open in the browser
    And "Sandbox" section open
    When click create tank button
    And Click Sign in button
    And Click "mock" auth method
    And register form is shown
    And type "mock-registred" in "#register-form #username" input
    And type "Reg User" in "#register-form #displayname" input
    And click "#register-form button"
    And "Sandbox" section open
    Then list of AI scripts contains 1 items
