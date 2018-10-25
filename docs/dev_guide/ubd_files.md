# UBD files
Ultimate Battle Descriptor (UBD) contains all the information required to replay a battle. Battle launched from UBD file is deterministic and always has the same outcome.

## UBD Player
Distribution of JsBattle contains command line tool that allows processing of UBD files to get result of the battle without watching it. It is located in `/dist/server/ubdplayer.js`. You can run as any shell command (`./ubdplayer.js`) or via NodeJs (`node ubdplayer.js`). For more information, run `./ubdplayer.js --help`.

## Changelog

Date       | Version | Schema Location                 | Description                 
-----------|---------|---------------------------------|-----------------------------
2018-05-31 |       1 | `app/schema/ubd-schema-v1.json` | Initial Version
2018-06-04 |       2 | `app/schema/ubd-schema-v1.json` | Adding teamMode information


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

## UBD example

```json
{
  "version": 2,
  "rngSeed": 0.850067584253805,
  "teamMode": false,
  "aiList": [
    {
      "name": "User Created Tank",
      "team": "10i42s2ca",
      "code": "//AI code ...",
      "initData": null,
      "useSandbox": true,
      "executionLimit": 100
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
