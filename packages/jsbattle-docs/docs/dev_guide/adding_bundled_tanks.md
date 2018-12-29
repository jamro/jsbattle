# Adding bundled tanks

In some cases, you may wish to extend or modify set of [bundled tanks](/docs/manual/bundled_tanks.md)
that comes with the distribution of JsBattle. It requires just a few simple steps.

## Create `*.tank.js` file
Create script of your tank as described in [**AI Script**](/docs/manual/ai_script.md) section.
Save the file in `/tanks/` folder of JsBattle. If you are a developer and you wish to add the
tank to source codes to include it within each built, the file should be stored in
`/src/tanks/`. Remember to follow the file name convention:
`[tankName].tank.js`

## Update `index.json`
List of all bundled tanks is stored in `/tanks/index.json`. If you are a developer and you
wish to add the tank to source codes to include it within each built, you should be looking
for `src/tanks/index.json` file. Its structure is simple and stores names
of all bundled tanks (without `.tank.js` extension).

```json
[
  "dummy",
  "crawler",
  "crazy",
  "chicken",
  "dodge",
  "sniper",
  "kamikaze",
  "jamro"
]
```
Add name of your tank to the list.
