# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.5] - 2017-08-21
### Fixed
- info object not passed to tanks outside a sandbox
- info object passed in a wrong field to AI Scripts
- clearing PIXI.TextField.setText warnings

## [1.4.2] - 2017-08-21
### Added
- Publishing of the package via Bower

## [1.4.1] - 2017-08-15
### Changed
- update of jamro.tank.js to v1.2.0 (support for cooperative mode)

### Fixed
- fixing critical bug in chicken.tank.js

## [1.4.0] - 2017-08-15
### Added
- Cooperative Mode

### Changed
- Usability improvements in AI script editor
- Development Guide update

## [1.3.3] - 2017-08-14
### Added
- Adding new bundled tank AI: Chicken

### Changed
- Improved performance of battle simulation

## [1.3.2] - 2017-08-13
### Added
- code autocomplete in scripts editor

### Changed
- extended developers guide
- update of jamro.tank.js (ver 1.1.0)
- small UI improvements

## [1.3.1] - 2017-08-11
### Fixed
- Being hit by another tank is not reported as state.collisions.enemy

## [1.3.0] - 2017-08-10
### Added
- Built-in, web based scripts editor. Now you can play the game over the web without downloading and launching it locally.
- possibility to exit from the battle without refreshing of the window

## [1.2.0] - 2017-08-09
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


## [1.1.2] - 2017-08-04
### Added
- More powerful AI - jamro.tank.js
- bundling http-server with NPM package

### Fixed
- minor UI improvements and bugfixes

## [1.1.0] - 2017-08-03
### Added
- New Graphics
- Introducing radar indicator
- Keep battle’s settings between restarts (simulation speed, debug tank)

### Changed
- Extend battle duration if there are more than two tanks
- Documentation update (install via NPM)

### Fixed
- Bugfixes and optimisation

## [1.0.2] - 2017-07-30
### Added
- Restarting simulation without reloading of the page

### Changed
- Responsive design
- More extreme super speed and super slow modes
- Relaxing AI performance restrictions (better for slow connections)
