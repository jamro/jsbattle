# Files Structure

```
+-- JsBattle
    |-- app
    |   |-- engine
    |   |-- tanks
    |   +-- webpage
    |-- build
    |-- dist
    |   |-- css
    |   |-- docs
    |   |-- fonts
    |   |-- img
    |   |-- js
    |   |   |-- jsbattle.min.js
    |   |   +-- webpage.min.js
    |   |-- tanks
    |   |-- vendor
    |   +-- index.html
    |-- docs
    |-- node_modules
    |-- resources
    |   |-- brody
    |   |-- ...
    |   +-- images.js
    |-- test
    |-- tmp
    |-- gulpfile.js
    |-- package.json
    +-- ...

```

* **`/app`** - source codes of the projects. They are split into 3 sub-folders
  * `/app/engine` - engine of battle simulation
  * `/app/tanks` - pre-built AI scripts of tanks and libraries used imported by those scripts
  * `/app/website` - source codes of website where battle simulation is embedded
* **`/build`** - Gulp tasks. Each file is a separate task imported by `/gulpfile.js`. Configuration of Gulp is kept in `config.js`
* **`/dist`** - build output goes here. It contains built version of the game.
  * `dist/css` - style sheets files
  * `dist/docs` - this documentation in HTML format (via [Docsify](https://docsify.js.org/))
  * `dist/fonts` - web fonts used in the website
  * `dist/img` - images of the website and sprite sheets of the battle renderer
  * `dist/js` - JavaScript code of JsBattle.
    * `dist/js/jsbattle.min.js` - compiled battle simulation scripts
    * `dist/js/webpage.min.js` - compiled webpage scripts
  * `dist/tanks` - code of bundled tanks
  * `dist/vendor` - third party libraries
* **`/docs`** - Documentation in markdown format. There is an `index.html` in the directory that comes from [Docsify](https://docsify.js.org/) and allows to display docs as HTML
* **`/node_modules`** - NPM dependencies
* **`/resources`** -  graphical assets that are used in the game. Each directory has contains assets of different renderer. Graphics are converted to sprite sheets by [Pixi Packer](https://github.com/gamevy/pixi-packer). ``images.js`` contains information about conversion process. For more documentation read documentation of [Pixi Packer](https://github.com/gamevy/pixi-packer)
* **`/test`** - Test scripts
