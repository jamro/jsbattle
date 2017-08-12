# Development Guide

This section is unnecessary to play JsBattle however, if you would like to extend or develop JsBattle you may find useful information here. If you just want to build your own tank and test it in the battle please read [**Getting Started**](/docs/getting_started.md).

## Project Dependencies

At the beginning, download JsBattle as described in [**Getting Started**](/docs/getting_started.md). Next, go to directory with the project where `package.json` is located and install all dependencies:

```bash
  npm install
```
During the building process, sprite sheets are generated with [Pixi Packer](https://github.com/gamevy/pixi-packer). This tool requires [ImageMagick](http://www.imagemagick.org/script/index.php). Make sure you have installed it locally. On OSX you can do so via `brew install imagemagick`, other operating systems will vary.

## Build Process

The building process can be started via npm:

```bash
  npm run-script build
```

Above command will rebuild the whole project and put results to `/dist` directory. As you may see, building workflow is based on [Gulp](https://gulpjs.com/). It is recommended to install Gulp globally to start it by a simple `gulp` command.

Let's install gulp globally:
```bash
  npm install -g gulp
```

There are several Gulp tasks that could be useful for you:

 Task Name      | Description
 ---------------|-------------------------------------
 default        | Rebuild the whole project
 watch          | Watch project folders for changes and rebuild the project if any files have changed. Always use with --dv option (it will make whole process much faster)
 clean          | Clears `/dist` directory
 clean-tmp      | Clears `/tmp` where the cache of sprite sheets is stored. Could be useful to rebuild sprite sheets what is a time consuming process.
 engine.test    | Runs unit tests of battle simulation engine
 engine.jshint  | Checks source codes of battle simulation engine
 webpage.jshint | Checks source codes of the website


## Starting the Battle

AI Scripts are run inside Web Workers. That is why the game cannot be started from local disk but must be hosted on a web server. JsBattle is bundled with [http-server](https://github.com/indexzero/http-server) which can be started via npm:

```bash
  npm start
```

It serves content of `/dist` at [http://127.0.0.1:8080](http://127.0.0.1:8080) (port number may vary and is always displayed after running `npm start` command)

## Files Structure

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


## Toolset

Some of the tools used during JsBattle Development

### Libraries

Tool                                                 | Description
-----------------------------------------------------|-----------------------------------------
[PixiJS](http://www.pixijs.com/)                     | HTML5 Rendering engine
[CodeMirror](https://codemirror.net/)                | Source codes editor
[React](https://facebook.github.io/react/)           | User Interface library used to build components of the web page
[Bootstrap](http://getbootstrap.com/)                | HTML and CSS framework used to build the web page
[jQuery](https://jquery.com/)                        | Minor usage, mostly as Bootstrap dependency. The website is based rather on React.
[Font Awesome](http://fontawesome.io/)               | Icons for user interface
[SatJS](https://github.com/jriecken/sat-js)          | Collision detection library
[Docsify](https://docsify.js.org/)                   | Displays markdown documentation as a HTML so it can be bundled with the game

### Build and Development

Tool                                                 | Description
-----------------------------------------------------|-----------------------------------------
[NPM](https://www.npmjs.com/)                        | Package manager
[Gulp](https://gulpjs.com/)                          | Build automation
[Weback](https://webpack.github.io/)                 | Module bundler
[BabelJs](https://babeljs.io/)                       | Converts ES6 to most web browsers compliant code
[Pixi Packer](https://github.com/gamevy/pixi-packer) | Build sprite sheets
[http-server](https://github.com/indexzero/http-server) | Lightweight NPM web server used to run the game


### Tests and code validation

Tool                                                 | Description
-----------------------------------------------------|-----------------------------------------
[Mocha](https://mochajs.org/)                        | Unit Tests Framework
[SinonJS](http://sinonjs.org/)                       | Test spies, stubs and mocks for unit tests
[JSHint](http://jshint.com/)                         | JavaScript code validation




.
