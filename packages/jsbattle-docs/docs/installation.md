# Installation

## Prerequisites

You will need these before you start:

 - [**NodeJS**](https://nodejs.org/) - JsBattle is written in JavaScript so NodeJS and NPM are required


## Install NPM package

Install JsBattle in selected directory:

```bash
  npm install jsbattle
```

Go to `node_modules/jsbattle` directory

## Run the game

Start web server that is required to run JsBattle simulator:

```bash
  npm start
```

The command will output URL of the server:

```
2019-03-10 12:57:41.816   INFO     -               Creating data folder for battle store at /Users/kjamroz/Documents/dev/jsbattle/...
2019-03-10 12:57:41.879   INFO     -               webserver started at http://localhost:8080
```

Open your favorite web browser and navigate to URL from the previous step

```
  http://localhost:8080
```

It will open JsBattle:

![alt text](./img/challenges.png)

## Stopping JsBattle

Run following command to stop JsBattle server:
```bash
  npm stop
```
