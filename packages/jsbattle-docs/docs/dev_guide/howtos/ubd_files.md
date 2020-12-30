# UBD files
Ultimate Battle Descriptor (UBD) contains all the information required to replay a battle. Battle launched from UBD file is deterministic and always has the same outcome.

## Changelog

Date       | Version | Schema Location                 | Description                 
-----------|---------|---------------------------------|-----------------------------
2018-05-31 |       1 | `src/schema/ubd-schema-v1.json` | Initial Version
2018-06-04 |       2 | `src/schema/ubd-schema-v2.json` | Adding teamMode information
2019-12-09 |       3 | `src/schema/ubd-schema-v3.json` | Adding timeLimit information
2020-06-01 |       4 | `src/schema/ubd-schema-v4.json` | Allow multiplication of AI entires to reduce memory footprint

## UBD Format
UBD is a JSON file of the following format

### .version
An integer that represents the version of UBD file. Each version may introduce changes that brake the compatibility.

### .rngSeed
Seed used by the random number generator. Using the same seed ensures that outcome of the game is predictive and the same each time. It could be any number.

### .teamMode
Determine if the battle is played in cooperative mode. Possible values are true or false.

### .aiList
Array of AI definitions that participate in the battle. Each AI definition is a JSON object.

### .timeLimit
Maximum duration of the battle in milliseconds, or zero if unlimited

## UBD example

```json
{
  "version": 4,
  "rngSeed": 0.850067584253805,
  "teamMode": true,
  "timeLimit": 30000,
  "aiList": [
    {
      "name": "User Created Tank",
      "team": "10i42s2ca",
      "code": "//AI code ...",
      "initData": null,
      "useSandbox": true,
      "executionLimit": 100,
      "count": 10
    },
    {
      "name": "crawler",
      "team": "10i4054sb",
      "code": null,
      "initData": null,
      "useSandbox": true,
      "executionLimit": 100
    }
  ]
}
```

## Updating UBD schema

Follow those steps when releasing new version of UBD schema

1. Create JSON Schema in `packages/jsbattle-engine/src/schema/ubd-schema-v[version].json`
2. Update version number in ubd-schema file (`"$id": "http://jsbattle.jmrlab.com/schema/ubd-schema-v[version].json"`)
3. Update documentation at `packages/jsbattle-docs/docs/dev_guide/ubd_files.md`
   - modify change log
   - describe changed fields
4. update version of schema at `packages/jsbattle-engine/src/engine/UltimateBattleDescriptor.js`
    ```javascript
    import schema from '../schema/ubd-schema-v[version].json';
    // ...

    class UltimateBattleDescriptor {
        constructor() {
            this._version = [version];
        }
    }
    ```
5. update `encode` and `decode` methods of at `UltimateBattleDescriptor`
6. Update UbdValidator at `packages/jsbattle-server/app/services/ubdValidator/ubdValidator.js`

    ```javascript
    const schema_v[version] = JsBattleSchema.getVersion([version]);

    // ...

    function validate(msg, respond ) {
        // ...
        switch (version) {
            // ...
            case [version]:
            schema = schema_v[version];
            break;
        }
    }
    ```
7. Update other files:
 - `packages/jsbattle-server/app/services/LeagueScheduler.service.js`
 - `packages/jsbattle-server/app/services/ubdPlayer/www/index.html`
 - `packages/jsbattle-webpage/src/containers/LeagueReplayScreen.js`
