Feature: Documentation
  Provide documentation via webpage

  Scenario: All subpages of docs are working
    Given JsBattle open in the browser
    When visited all pages at "/docs"
    Then visited more than 30 pages
    And all visited pages loaded successfully
    And all visited images loaded successfully
