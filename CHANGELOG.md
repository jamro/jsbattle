# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.2.1](https://github.com/jamro/jsbattle/compare/v3.2.0...v3.2.1) (2020-06-20)


### Bug Fixes

* **jsbattle-server:** use proper username for sandbox after changing it ([1fbdab5](https://github.com/jamro/jsbattle/commit/1fbdab5c548509d6e03d14376c6c31a535ba4658))





# [3.2.0](https://github.com/jamro/jsbattle/compare/v3.1.3...v3.2.0) (2020-06-20)


### Features

* **jsbattle-admin:** list open user sessions in admin panel ([0d7f429](https://github.com/jamro/jsbattle/commit/0d7f429d5ade1866bb73a56b96f1b568f2913edc))
* **jsbattle-admin:** list stored scripts in admin panel ([d73ab78](https://github.com/jamro/jsbattle/commit/d73ab787653e119b4475c78d8d4d988778098ae7))





## [3.1.3](https://github.com/jamro/jsbattle/compare/v3.1.2...v3.1.3) (2020-06-16)


### Bug Fixes

* **jsbattle-server:** fix github integration ([4125d84](https://github.com/jamro/jsbattle/commit/4125d8482070766788bbe0d2d7600eb4d1ed15ac))





## [3.1.2](https://github.com/jamro/jsbattle/compare/v3.1.1...v3.1.2) (2020-06-13)


### Bug Fixes

* **jsbattle-server:** set proper cluster name ([6d17a68](https://github.com/jamro/jsbattle/commit/6d17a68f466087001d24d1238bd8f701c577ecb2))





## [3.1.1](https://github.com/jamro/jsbattle/compare/v3.1.0...v3.1.1) (2020-06-13)

**Note:** Version bump only for package root





# [3.1.0](https://github.com/jamro/jsbattle/compare/v3.0.0...v3.1.0) (2020-06-13)


### Features

* **jsbattle-admin:** add league view in admin panel ([103543e](https://github.com/jamro/jsbattle/commit/103543e90595ab12484a60abc7ded96a590b5b62))
* **jsbattle-admin:** display info about all nodes ([c1ef38d](https://github.com/jamro/jsbattle/commit/c1ef38dbf70ca143238d3c1d3bc6b6231b34984d))
* **jsbattle-webpage:** add links to start a fight against opponents from the league ([c28c1c6](https://github.com/jamro/jsbattle/commit/c28c1c6c659776633a21f6f71ac03fe72655008c))
* **jsbattle-webpage:** inform about new version of script for the league ([cc995ee](https://github.com/jamro/jsbattle/commit/cc995ee6fe03b88d4ddb1349f9b17d6613cdd3fe))





# [3.0.0](https://github.com/jamro/jsbattle/compare/v2.7.1...v3.0.0) (2020-06-09)


### Bug Fixes

* **jsbattle:** add puppeteer dependency ([6742ea8](https://github.com/jamro/jsbattle/commit/6742ea89dace3a2076b3f59da776cba4496f29c8))
* **jsbattle-admin:** fix storage name for list of battles ([10f42f4](https://github.com/jamro/jsbattle/commit/10f42f4fc00371f1b0944b79c9d17807628eb681))
* **jsbattle-engine:** fix error handling when creating AI from incorrect input ([9da1a1e](https://github.com/jamro/jsbattle/commit/9da1a1e02f5f706685538eee6c9602f3e937af2b))
* **jsbattle-server:** default values of config are not assigned properly ([1fc0433](https://github.com/jamro/jsbattle/commit/1fc04334de9382d39adbb49feb1434c007649271))
* **jsbattle-server:** fix winner selection ([9d1af70](https://github.com/jamro/jsbattle/commit/9d1af70ac47ec413f7026a62e9304fa45c47871d))
* **jsbattle-server:** make UBD repetitive ([168112c](https://github.com/jamro/jsbattle/commit/168112cb8a8aea785b5f0fdd6de449a8922e5225))
* **jsbattle-server:** store challenge data in proper collection ([6dadcca](https://github.com/jamro/jsbattle/commit/6dadccae6c976bc5282b768b016534d854ccff59))
* **jsbattle-webpage:** display current submission to the leage when editing it ([861b3d6](https://github.com/jamro/jsbattle/commit/861b3d690edbf7b8ad52f24efd23e4873d718def))
* **jsbattle-webpage:** fix fights against sandbox opponnents for registered players ([e369fc5](https://github.com/jamro/jsbattle/commit/e369fc53ea56ba55b79d2467586ccb82615067e3))
* **jsbattle-webpage:** make stored challenge codes backward compatible ([a9ba212](https://github.com/jamro/jsbattle/commit/a9ba212bd5d22bbdbbdca53791b7907b7ec88bcd))


### Features

* **jsbattle:** add league for registered users ([eff6a70](https://github.com/jamro/jsbattle/commit/eff6a70db82e9478736fe20aa6d40c14631d368f))
* **jsbattle:** ask new users for name ([bd1841b](https://github.com/jamro/jsbattle/commit/bd1841b5e7020d6f72293b106acb591f8154e955))
* **jsbattle:** bundle circler tank ([7154d61](https://github.com/jamro/jsbattle/commit/7154d61e657d29002b60fa9758b44cc3c8050011))
* **jsbattle:** list recent league battles ([492e2c9](https://github.com/jamro/jsbattle/commit/492e2c94204f59d154a55b7775916bd4d9b38daa))
* **jsbattle:** move config to config files ([d81b5c9](https://github.com/jamro/jsbattle/commit/d81b5c97c4d778624fb2ba5b7912e1e00afdea14))
* **jsbattle:** store challenge progress on server side ([393ecf1](https://github.com/jamro/jsbattle/commit/393ecf11d24f6abdb3e799b186bcddc4e83c87cf))
* **jsbattle:** store current progress when registering ([594b548](https://github.com/jamro/jsbattle/commit/594b5482454d34de1b46e1108361a4466641d5c8))
* **jsbattle:** store sandbox scripts on server side ([ca0a72b](https://github.com/jamro/jsbattle/commit/ca0a72bbc08b6131309eff64161edbe20312f3df))
* **jsbattle-admin:** add admin panel ([b0ca6e8](https://github.com/jamro/jsbattle/commit/b0ca6e8abf1c48d4b95dc80b0123b02a2f7b7241))
* **jsbattle-admin:** list users and battles in admin panel ([d510add](https://github.com/jamro/jsbattle/commit/d510add005b190f47ecd1d702712676de461f946))
* **jsbattle-admin:** show system info in admin panel ([c4e6b55](https://github.com/jamro/jsbattle/commit/c4e6b55b17f0927499d577a0db81678e4d4b5a7d))
* **jsbattle-server:** add OAuth to admin services ([1d85641](https://github.com/jamro/jsbattle/commit/1d85641b7ec88a44d9f1c673c68d9ff09a5a1722))
* **jsbattle-server:** drop share battle ([6005f58](https://github.com/jamro/jsbattle/commit/6005f58957e98658ea4b8db9324d70e05dbb6b4e))
* **jsbattle-server:** run league battles in the background ([0f44d81](https://github.com/jamro/jsbattle/commit/0f44d81e2e984b93ec7141b2a6048815a5df0fdc))
* **jsbattle-server:** store history of league battles ([449409a](https://github.com/jamro/jsbattle/commit/449409a53a74c6be8db26e1944bc1f5bd2877cd5))
* **jsbattle-server:** support for MongoDB ([c91a770](https://github.com/jamro/jsbattle/commit/c91a77076791dd9a0a8b62e7a340ffbf9440144f))
* **jsbattle-webpage:** add league opponents to sandbox mode ([d5966a1](https://github.com/jamro/jsbattle/commit/d5966a12397e479ad9f4a4f92101e2a651c9153b))
* **jsbattle-webpage:** add live coding to sandbox mode ([d83b66a](https://github.com/jamro/jsbattle/commit/d83b66a8dfdc6854e460fe77d5373dd323851847))
* **jsbattle-webpage:** add OAuth integration ([7b16260](https://github.com/jamro/jsbattle/commit/7b162608057c0109a59f9418e9148e822a0b5833))
* **jsbattle-webpage:** add preview of leagueu for unregistered users ([6239185](https://github.com/jamro/jsbattle/commit/6239185920ea4e433d502465f23808e314b8a50f))
* **jsbattle-webpage:** ask for sign in at the beginning ([3bbc013](https://github.com/jamro/jsbattle/commit/3bbc0134b7c43cecadf65caf2778b789045e77f7))
* **jsbattle-webpage:** automaticly refresh league when a battle is over ([ff1f0ee](https://github.com/jamro/jsbattle/commit/ff1f0ee8ee30588314733c83108578285cda0c49))
* **jsbattle-webpage:** replay league battles ([7eb85c9](https://github.com/jamro/jsbattle/commit/7eb85c9985fb6f122a5b5bdd3f3664149a4242f3))
* **jsbattle-webpage:** show recent league battles of player ([dd6477e](https://github.com/jamro/jsbattle/commit/dd6477eab94208df44a691240569824f294973f3))


### BREAKING CHANGES

* **jsbattle-admin:** server-side persistance layer changed (Moleculer DB Adapter)





## [2.7.1](https://github.com/jamro/jsbattle/compare/v2.7.0...v2.7.1) (2020-01-09)


### Bug Fixes

* **jsbattle-react:** make jsbattle-react package public ([888ff9b](https://github.com/jamro/jsbattle/commit/888ff9b7409466b5e6daaaa22c0b90f85608dad9))





# [2.7.0](https://github.com/jamro/jsbattle/compare/v2.6.1...v2.7.0) (2020-01-09)


### Bug Fixes

* **jsbattle-engine:** set state.radar.enemy.speed to negative values when the tank is going backward ([6f53ff1](https://github.com/jamro/jsbattle/commit/6f53ff166aff7bf05bf1e7289ec72f23af8abb0b))
* **jsbattle-webpage:** fix not working custom tanks in battle mode ([3c05049](https://github.com/jamro/jsbattle/commit/3c05049ba6aacb47bbcda600cfc9ca77f6e2492e))
* **jsbattle-webpage:** update display name of tank when changing script name ([d16c1ef](https://github.com/jamro/jsbattle/commit/d16c1efd6745d1c24ce32f3498fb058337363e28))


### Features

* **jsbattle-docs:** add walkthroughs ([eb21a06](https://github.com/jamro/jsbattle/commit/eb21a069f1c42db9f962f493b3502d0fe0581c05))
* **jsbattle-engine:** add battle time limt to UBD schema ([667a599](https://github.com/jamro/jsbattle/commit/667a599278acb06a7863f740885d583736ecbbc2))
* **jsbattle-engine:** add custom finish conditions for battles ([441d69a](https://github.com/jamro/jsbattle/commit/441d69a4a0b2490bb719ad2396b74d6ade4bb6ec))
* **jsbattle-webpage:** add code folding ([573e33a](https://github.com/jamro/jsbattle/commit/573e33aa5a578e8ff3746d51444fdbb627dc95cd))
* **jsbattle-webpage:** add images to challenge descriptions ([d9c590d](https://github.com/jamro/jsbattle/commit/d9c590da95e4d3e8c1a37341d4a74089802f1ccf))
* **jsbattle-webpage:** add live preview to challenges ([a9ef92e](https://github.com/jamro/jsbattle/commit/a9ef92e6bbcc3b42a0e8221b9c1fb6e0a7354d3d))
* **jsbattle-webpage:** improve challenge set ([05d139d](https://github.com/jamro/jsbattle/commit/05d139d7aa2e903957dec58912f30a311da9affa))





## [2.6.1](https://github.com/jamro/jsbattle/compare/v2.6.0...v2.6.1) (2019-11-27)


### Bug Fixes

* **jsbattle-server:** fix serving images ([c47f881](https://github.com/jamro/jsbattle/commit/c47f881050bba16eb4a873446a6056e9ab3e5dc8))





# [2.6.0](https://github.com/jamro/jsbattle/compare/v2.5.0...v2.6.0) (2019-11-27)


### Bug Fixes

* upgrade lerna to include security fixes ([e9f5ddc](https://github.com/jamro/jsbattle/commit/e9f5ddcd6c9a8371e77a96076674b0846cd0e6c6))
* **jsbattle-server:** add missing dependency on string-replace-middleware ([5b21992](https://github.com/jamro/jsbattle/commit/5b21992acbc89b9e8a46f699b1cad94faf97022c))
* **jsbattle-server:** add missing uuid package dependency ([9ccf708](https://github.com/jamro/jsbattle/commit/9ccf70839cefc07b72438fc56f14193d95b0b0ed))
* **jsbattle-server:** fix sonar cube ([22f74ec](https://github.com/jamro/jsbattle/commit/22f74ecee1a50c54523365a4b6f5f89786f2f9ab))
* **jsbattle-webpage:** improve challenge description ([492443d](https://github.com/jamro/jsbattle/commit/492443dfb7204a35b87417c9e571829a2516d2d4))
* **jsbattle-webpage:** make Google Analytics optional ([9e6c6de](https://github.com/jamro/jsbattle/commit/9e6c6de6c6708562c0cf185e852dfcb4a3977c4c)), closes [#25](https://github.com/jamro/jsbattle/issues/25)


### Features

* **jsbattle-server:** remove babel and webpack dependency ([e19cde0](https://github.com/jamro/jsbattle/commit/e19cde0c9f49a9c6dcf832230be401c31616bcae))





# [2.5.0](https://github.com/jamro/jsbattle/compare/v2.4.0...v2.5.0) (2019-04-29)


### Bug Fixes

* fix security issues by upgrade of old npm packages ([08ed1c6](https://github.com/jamro/jsbattle/commit/08ed1c6))


### Features

* **jsbattle-docs:** add algorithms sections to docs to improve learning curve ([e0d3765](https://github.com/jamro/jsbattle/commit/e0d3765))
* **jsbattle-engine:** allow changing of renderers ([6cf532b](https://github.com/jamro/jsbattle/commit/6cf532b))
* **jsbattle-engine:** allow manual placement of tanks in the battlefield ([6e44133](https://github.com/jamro/jsbattle/commit/6e44133))
* **jsbattle-server:** add JsBattle Server runner (for package testing/debugging purposes) ([ecad5ee](https://github.com/jamro/jsbattle/commit/ecad5ee))
* **jsbattle-webpage:** add basic GA tracking ([2f023d3](https://github.com/jamro/jsbattle/commit/2f023d3))
* **jsbattle-webpage:** add description to each challenge ([5be7ec1](https://github.com/jamro/jsbattle/commit/5be7ec1))
* **jsbattle-webpage:** add resizing of coding area in script editor ([0bc5bcd](https://github.com/jamro/jsbattle/commit/0bc5bcd))
* **jsbattle-webpage:** add simpler challanges at the begining ([346d0d7](https://github.com/jamro/jsbattle/commit/346d0d7))
* **jsbattle-webpage:** extend GA statistics (new events) ([284b580](https://github.com/jamro/jsbattle/commit/284b580))





# [2.4.0](https://github.com/jamro/jsbattle/compare/v2.2.1...v2.4.0) (2019-03-11)


### Bug Fixes

* **jsbattle-webpage:** fix blank page after starting a challenge with empty script ([1f924cb](https://github.com/jamro/jsbattle/commit/1f924cb))


### Features

* **jsbattle-webpage:** add buildno to the version in footer ([d51b42c](https://github.com/jamro/jsbattle/commit/d51b42c))


# [2.2.1](https://github.com/jamro/jsbattle) (2019-03-10)

### Fixed
- version in the footer

# [2.2.0](https://github.com/jamro/jsbattle) (2019-03-10)

### Changed
- simplify release process
- make challenge battles predictive
- change default log level to info

### Removed
- PM2 dependency

# [2.1.11](https://github.com/jamro/jsbattle) (2019-03-09)

### Changed
- documentation improvements (style, linking, etc)

### Security
- Update Bootstrap to fix security issue CVE-2019-8331

# [2.1.4](https://github.com/jamro/jsbattle) (2018-12-26)
### Added
- Share battle link
- Challenges section
- Deployment scripts (see [ansible-role-jsbattle](https://github.com/jamro/ansible-role-jsbattle))
- Tracking build numbers
- Introducing LernaJS (refactoring to monorepo)
- UBD files schemas

### Changed
- documentation update

### Security
- UBD cannot set useSandbox, executionLimit and initData of AI

### Removed
- UBD replays (use battle sharing instead)

# [2.0.2](https://github.com/jamro/jsbattle) (2018-09-26)
### Added
- adding spritesheets as static resources

### Changed
- tests of website are based on Puppeteer + Mocha instead of PhantomJS + CasperJS ([PhantomJS project is discontinued](https://github.com/ariya/phantomjs/issues/15344))
- refactoring of the website
- build process revised and simplified
- documentation update (related with changes in build process)
- dependencies/libraries update

### Fixed
- Bugfix: renaming of AI script to the same name results in removing it

### Removed
- removed CasperJS dependency (replaced by Mocha)
- removed PhantomJS dependency (replaced by Puppeteer)
- removed Pixi Packer dependency
- removed ImageMagic / GraphicsMagic dependency
- removing gulp-mocha dependency (running Mocha directly)
- removing building spritesheets from build process to make it simpler

# [2.0.1](https://github.com/jamro/jsbattle) (2018-07-15)
### Added
- documentation of release procedure

### Fixed
- fixing missing UML diagrams in docs

# [2.0.0](https://github.com/jamro/jsbattle) (2018-07-15)
### Added
- JsBattle server (hosting of static content)
- UBD Player (command line tool)

### Changed
- structure of /dist folder holds server and client parts
- update of external libs
- UI improvements

### Fixed
- calculation of simulation step duration is more precise
- fixing tests (basing on local instance of Mocha to remove global dependency)

### Removed
- http-server is no more bundled with JsBattle. Dedicated web-server is used

# [1.5.0](https://github.com/jamro/jsbattle) (2018-06-09)
### Added
- Replays of battles (export to UBD files)
- Architecture documentation

### Changed
- adding and improving more automatic tests (CasperJS)

### Fixed
- making battles predictable when the same seed for RNG is used

# [1.4.7](https://github.com/jamro/jsbattle) (2018-05-26)
### Changed
- update of libraries to latest versions
- migration from Bootstrap v3 to v4
- Documentation improvements

### Fixed
- unit tests fix

### Security
- Fixing vulnerability in handlebars.js 3.0.3 by lib upgrade (CVE-2015-8861)
- Fixing vulnerability in hoek 2.16.3 by lib upgrade (CVE-2018-3728)
- Fixing vulnerability in marked 0.3.6 by lib upgrade (CVE-2017-1000427, CVE-2017-17461)
- Fixing vulnerability in UglifyJS2 2.3.6 by lib upgrade (CVE-2015-8858, CVE-2015-8857)

# [1.4.6](https://github.com/jamro/jsbattle) (2017-12-31)
### Added
- warn before exiting without saving AI Script
- Building also unminified version of JsBattle (dist/js/jsbattle.js)
- SonarQube support
- This changelog :)

### Fixed
- explosion of last tank is not shown

### Changed
- technical debt reduction

# [1.4.5](https://github.com/jamro/jsbattle) (2017-08-21)
### Fixed
- info object not passed to tanks outside a sandbox
- info object passed in a wrong field to AI Scripts
- clearing PIXI.TextField.setText warnings

# [1.4.2](https://github.com/jamro/jsbattle) (2017-08-21)
### Added
- Publishing of the package via Bower

# [1.4.1](https://github.com/jamro/jsbattle) (2017-08-15)
### Changed
- update of jamro.tank.js to v1.2.0 (support for cooperative mode)

### Fixed
- fixing critical bug in chicken.tank.js

# [1.4.0](https://github.com/jamro/jsbattle) (2017-08-15)
### Added
- Cooperative Mode

### Changed
- Usability improvements in AI script editor
- Development Guide update

# [1.3.3](https://github.com/jamro/jsbattle) (2017-08-14)
### Added
- Adding new bundled tank AI: Chicken

### Changed
- Improved performance of battle simulation

# [1.3.2](https://github.com/jamro/jsbattle) (2017-08-13)
### Added
- code autocomplete in scripts editor

### Changed
- extended developers guide
- update of jamro.tank.js (ver 1.1.0)
- small UI improvements

# [1.3.1](https://github.com/jamro/jsbattle) (2017-08-11)
### Fixed
- Being hit by another tank is not reported as state.collisions.enemy

# [1.3.0](https://github.com/jamro/jsbattle) (2017-08-10)
### Added
- Built-in, web based scripts editor. Now you can play the game over the web without downloading and launching it locally.
- possibility to exit from the battle without refreshing of the window

# [1.2.0](https://github.com/jamro/jsbattle) (2017-08-09)
### Added
- You can now customize look of your tank
- Retina support (on Macs it looks awesome :))
- Automatic adjustments of graphics quality to keep proper speed of the battle
- Selection of tanks for the battle from the UI
- Development guide

### Changed
- Usability improvements of the website

### Fixed
- optimization and bugfixing

# [1.1.2](https://github.com/jamro/jsbattle) (2017-08-04)
### Added
- More powerful AI - jamro.tank.js
- bundling http-server with NPM package

### Fixed
- minor UI improvements and bugfixes

# [1.1.0](https://github.com/jamro/jsbattle) (2017-08-03)
### Added
- New Graphics
- Introducing radar indicator
- Keep battle’s settings between restarts (simulation speed, debug tank)

### Changed
- Extend battle duration if there are more than two tanks
- Documentation update (install via NPM)

### Fixed
- Bugfixes and optimisation

# [1.0.2](https://github.com/jamro/jsbattle) (2017-07-30)
### Added
- Restarting simulation without reloading of the page

### Changed
- Responsive design
- More extreme super speed and super slow modes
- Relaxing AI performance restrictions (better for slow connections)
