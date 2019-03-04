Feature: UBD Schema
  Hosts UBD schema files

  Scenario: Hosts schema v1
    Given JsBattle open in the browser
    When open URI "schema/ubd-schema-v1.json"
    Then server response is ok
    And server response is valid JSON


  Scenario: Hosts schema v2
    Given JsBattle open in the browser
    When open URI "schema/ubd-schema-v2.json"
    Then server response is ok
    And server response is valid JSON
