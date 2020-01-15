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
[2020-01-15 16:47:42.426] INFO  BROKER: Moleculer is starting...
[2020-01-15 16:47:42.429] INFO  BROKER: Namespace: jsbattle
[2020-01-15 16:47:42.430] INFO  BROKER: Serializer: JSONSerializer
[2020-01-15 16:47:42.567] INFO  API: API Gateway created!
[2020-01-15 16:47:42.580] INFO  APIGATEWAY: webserver started at http://localhost:8080
[2020-01-15 16:47:43.561] INFO  BROKER: ServiceBroker is started successfully.
```

Open your favourite web browser and navigate to URL from the previous step

```
  http://localhost:8080
```

It will open JsBattle:

![challenges screen](./img/challenges.png)
