Feature: UBD Schema
  Hosts UBD schema files

  @integration
  Scenario Outline: Hosts schema v<version>
    Given JsBattle open in the browser
    When open URI "schema/ubd-schema-v<version>.json"
    Then server response is ok
    And server response is valid JSON

    Examples:
        | version |
        | 1       |
        | 2       |
        | 3       |
