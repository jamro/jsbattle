# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
