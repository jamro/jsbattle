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
    Then challenge [1] are unlocked

  @snapshot_unregistered
  @integration
  Scenario: update profile when registered
    Given JsBattle open in the browser
    When Click Sign in button
    And Click "mock" auth method
    And register form is shown
    And type "mock-registred" in "#register-form #username" input
    And type "Registered Mock User" in "#register-form #displayname" input
    And click "#register-form button"
    Then challenge [1] are unlocked
    And user name is "Registered Mock User"
