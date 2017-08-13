# Building Process

## Project Dependencies

At the beginning, download JsBattle as described in [**Getting Started**](/docs/getting_started.md). Next, go to directory with the project where `package.json` is located and install all dependencies:

```bash
  npm install
```
During the building process, sprite sheets are generated with [Pixi Packer](https://github.com/gamevy/pixi-packer). This tool requires [ImageMagick](http://www.imagemagick.org/script/index.php). Make sure you have installed it locally. On OSX you can do so via `brew install imagemagick`, other operating systems will vary.

## Build Process

### NPM

The building process can be started via npm:

```bash
  npm run-script build
```

Above command will rebuild the whole project and put results to `/dist` directory.

### Gulp

As you may see, building workflow is based on [Gulp](https://gulpjs.com/). It is recommended to install Gulp globally to start it by a simple `gulp` command.

Let's install gulp globally:
```bash
  npm install -g gulp
```

There are several Gulp tasks that could be useful for you:

 Task Name      | Description
 ---------------|-------------------------------------
 all            | Rebuild the whole project
 default        | Rebuild the whole project
 watch          | Watch project folders for changes and rebuild the project if any files have changed. The task serves the project at `http://127.0.0.1:8080` and reload it after each rebuild. Use with `--dev` option to make the whole process much faster.
 test           | Run tests of all components
 clean-all      | Clear all build artifacts. Could be useful to rebuild sprite sheets what is a time consuming process.

### Dev Mode

 Gulp tasks may be executed with `--dev` option. It will make the process faster by skipping some parts that are not mandatory during development (e.g. minification):

 ```bash
   gulp watch --dev
 ```

### Artifacts output

During the build (`gulp all`) all artifacts are output to `tmp/dist` directory. When all tests are passed they are copied to `/dist`. Running `gulp watch` will not update `/dist` and the whole process will stop at `tmp/dist` directory.


## Begin the development

AI Scripts run inside Web Workers. That is why the game cannot be started from local disk but must be hosted on a web server. Run `gulp watch` to start a web server at `http://localhost:8080`. Each change in sources will result in automatic rebuild and refresh of that website. Port of the URL may vary depending on local configuration. Please verify it in console output

```bash
gulp watch --dev
[11:56:06] Using gulpfile gulpfile.js
[11:56:06] Starting 'watch'...
[11:56:06] Finished 'watch' after 212 ms
[11:56:06] Development Server started http://localhost:8080
```

Alternatively the web server may be started by `npm start` however, it will not monitor for files changes.
