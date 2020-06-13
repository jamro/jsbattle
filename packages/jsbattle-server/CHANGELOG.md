# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.1.1](https://github.com/jamro/jsbattle/compare/v3.1.0...v3.1.1) (2020-06-13)

**Note:** Version bump only for package jsbattle-server





# [3.1.0](https://github.com/jamro/jsbattle/compare/v3.0.0...v3.1.0) (2020-06-13)


### Features

* **jsbattle-admin:** add league view in admin panel ([103543e](https://github.com/jamro/jsbattle/commit/103543e90595ab12484a60abc7ded96a590b5b62))
* **jsbattle-admin:** display info about all nodes ([c1ef38d](https://github.com/jamro/jsbattle/commit/c1ef38dbf70ca143238d3c1d3bc6b6231b34984d))
* **jsbattle-webpage:** inform about new version of script for the league ([cc995ee](https://github.com/jamro/jsbattle/commit/cc995ee6fe03b88d4ddb1349f9b17d6613cdd3fe))





# [3.0.0](https://github.com/jamro/jsbattle/compare/v2.7.1...v3.0.0) (2020-06-09)


### Bug Fixes

* **jsbattle:** add puppeteer dependency ([6742ea8](https://github.com/jamro/jsbattle/commit/6742ea89dace3a2076b3f59da776cba4496f29c8))
* **jsbattle-admin:** fix storage name for list of battles ([10f42f4](https://github.com/jamro/jsbattle/commit/10f42f4fc00371f1b0944b79c9d17807628eb681))
* **jsbattle-server:** default values of config are not assigned properly ([1fc0433](https://github.com/jamro/jsbattle/commit/1fc04334de9382d39adbb49feb1434c007649271))
* **jsbattle-server:** fix winner selection ([9d1af70](https://github.com/jamro/jsbattle/commit/9d1af70ac47ec413f7026a62e9304fa45c47871d))
* **jsbattle-server:** make UBD repetitive ([168112c](https://github.com/jamro/jsbattle/commit/168112cb8a8aea785b5f0fdd6de449a8922e5225))
* **jsbattle-server:** store challenge data in proper collection ([6dadcca](https://github.com/jamro/jsbattle/commit/6dadccae6c976bc5282b768b016534d854ccff59))
* **jsbattle-webpage:** fix fights against sandbox opponnents for registered players ([e369fc5](https://github.com/jamro/jsbattle/commit/e369fc53ea56ba55b79d2467586ccb82615067e3))


### Features

* **jsbattle:** add league for registered users ([eff6a70](https://github.com/jamro/jsbattle/commit/eff6a70db82e9478736fe20aa6d40c14631d368f))
* **jsbattle:** ask new users for name ([bd1841b](https://github.com/jamro/jsbattle/commit/bd1841b5e7020d6f72293b106acb591f8154e955))
* **jsbattle:** list recent league battles ([492e2c9](https://github.com/jamro/jsbattle/commit/492e2c94204f59d154a55b7775916bd4d9b38daa))
* **jsbattle:** move config to config files ([d81b5c9](https://github.com/jamro/jsbattle/commit/d81b5c97c4d778624fb2ba5b7912e1e00afdea14))
* **jsbattle:** store challenge progress on server side ([393ecf1](https://github.com/jamro/jsbattle/commit/393ecf11d24f6abdb3e799b186bcddc4e83c87cf))
* **jsbattle:** store current progress when registering ([594b548](https://github.com/jamro/jsbattle/commit/594b5482454d34de1b46e1108361a4466641d5c8))
* **jsbattle:** store sandbox scripts on server side ([ca0a72b](https://github.com/jamro/jsbattle/commit/ca0a72bbc08b6131309eff64161edbe20312f3df))
* **jsbattle-admin:** list users and battles in admin panel ([d510add](https://github.com/jamro/jsbattle/commit/d510add005b190f47ecd1d702712676de461f946))
* **jsbattle-admin:** show system info in admin panel ([c4e6b55](https://github.com/jamro/jsbattle/commit/c4e6b55b17f0927499d577a0db81678e4d4b5a7d))
* **jsbattle-server:** add OAuth to admin services ([1d85641](https://github.com/jamro/jsbattle/commit/1d85641b7ec88a44d9f1c673c68d9ff09a5a1722))
* **jsbattle-server:** drop share battle ([6005f58](https://github.com/jamro/jsbattle/commit/6005f58957e98658ea4b8db9324d70e05dbb6b4e))
* **jsbattle-server:** run league battles in the background ([0f44d81](https://github.com/jamro/jsbattle/commit/0f44d81e2e984b93ec7141b2a6048815a5df0fdc))
* **jsbattle-server:** store history of league battles ([449409a](https://github.com/jamro/jsbattle/commit/449409a53a74c6be8db26e1944bc1f5bd2877cd5))
* **jsbattle-server:** support for MongoDB ([c91a770](https://github.com/jamro/jsbattle/commit/c91a77076791dd9a0a8b62e7a340ffbf9440144f))
* **jsbattle-webpage:** add league opponents to sandbox mode ([d5966a1](https://github.com/jamro/jsbattle/commit/d5966a12397e479ad9f4a4f92101e2a651c9153b))
* **jsbattle-webpage:** add OAuth integration ([7b16260](https://github.com/jamro/jsbattle/commit/7b162608057c0109a59f9418e9148e822a0b5833))
* **jsbattle-webpage:** add preview of leagueu for unregistered users ([6239185](https://github.com/jamro/jsbattle/commit/6239185920ea4e433d502465f23808e314b8a50f))
* **jsbattle-webpage:** automaticly refresh league when a battle is over ([ff1f0ee](https://github.com/jamro/jsbattle/commit/ff1f0ee8ee30588314733c83108578285cda0c49))
* **jsbattle-webpage:** replay league battles ([7eb85c9](https://github.com/jamro/jsbattle/commit/7eb85c9985fb6f122a5b5bdd3f3664149a4242f3))
* **jsbattle-webpage:** show recent league battles of player ([dd6477e](https://github.com/jamro/jsbattle/commit/dd6477eab94208df44a691240569824f294973f3))


### BREAKING CHANGES

* **jsbattle-admin:** server-side persistance layer changed (Moleculer DB Adapter)





# [2.7.0](https://github.com/jamro/jsbattle/compare/v2.6.1...v2.7.0) (2020-01-09)


### Features

* **jsbattle-engine:** add battle time limt to UBD schema ([667a599](https://github.com/jamro/jsbattle/commit/667a599278acb06a7863f740885d583736ecbbc2))





## [2.6.1](https://github.com/jamro/jsbattle/compare/v2.6.0...v2.6.1) (2019-11-27)


### Bug Fixes

* **jsbattle-server:** fix serving images ([c47f881](https://github.com/jamro/jsbattle/commit/c47f881050bba16eb4a873446a6056e9ab3e5dc8))





# [2.6.0](https://github.com/jamro/jsbattle/compare/v2.5.0...v2.6.0) (2019-11-27)


### Bug Fixes

* **jsbattle-server:** add missing dependency on string-replace-middleware ([5b21992](https://github.com/jamro/jsbattle/commit/5b21992acbc89b9e8a46f699b1cad94faf97022c))
* **jsbattle-server:** add missing uuid package dependency ([9ccf708](https://github.com/jamro/jsbattle/commit/9ccf70839cefc07b72438fc56f14193d95b0b0ed))
* **jsbattle-webpage:** improve challenge description ([492443d](https://github.com/jamro/jsbattle/commit/492443dfb7204a35b87417c9e571829a2516d2d4))


### Features

* **jsbattle-server:** remove babel and webpack dependency ([e19cde0](https://github.com/jamro/jsbattle/commit/e19cde0c9f49a9c6dcf832230be401c31616bcae))





# [2.5.0](https://github.com/jamro/jsbattle/compare/v2.4.0...v2.5.0) (2019-04-29)


### Features

* **jsbattle-server:** add JsBattle Server runner (for package testing/debugging purposes) ([ecad5ee](https://github.com/jamro/jsbattle/commit/ecad5ee))
* **jsbattle-webpage:** add basic GA tracking ([2f023d3](https://github.com/jamro/jsbattle/commit/2f023d3))





# [2.4.0](https://github.com/jamro/jsbattle/compare/v2.2.1...v2.4.0) (2019-03-11)

**Note:** Version bump only for package jsbattle-server
