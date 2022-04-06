# Dependencies Update

## Backward compatible updates
- go to each package
- run `npm outdated` to list dependencies
- safely updated dependencies to the _wanted_ version by `npm update`
- build `npm run build` and test `npm run test` the project to validate changes

## Braking changes (major version update)
- go to each package
- run `npm outdated` to list dependencies
- updated a single dependency by `npm install [packageName]@latest`
- build `npm run build` and test `npm run test` the project to validate changes

