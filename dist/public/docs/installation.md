# Installation

## Prerequisites

You will need these before you start:

 - [**NodeJS**](https://nodejs.org/) - NodeJS and NPM is heavily used during building process. You cannot start without it.


## Option 1: Download from GitHub

Download sources of the latest release from here: [https://github.com/jamro/jsbattle/releases](https://github.com/jamro/jsbattle/releases) and unpack the archive.

Go to the directory with the game and install all NPM dependencies:

```bash
  npm install
```

## Option 2: Use NPM

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
[PM2] App [jsbattle] launched (1 instances)
┌──────────┬────┬─────────┬──────┬──────┬────────┬─────────┬────────┬─────┬───────────┬──────────┬──────────┐
│ App name │ id │ version │ mode │ pid  │ status │ restart │ uptime │ cpu │ mem       │ user     │ watching │
├──────────┼────┼─────────┼──────┼──────┼────────┼─────────┼────────┼─────┼───────────┼──────────┼──────────┤
│ jsbattle │ 0  │ 2.0.3   │ fork │ 8473 │ online │ 0       │ 0s     │ 0%  │ 49.6 MB   │ jsbattle │ disabled │
└──────────┴────┴─────────┴──────┴──────┴────────┴─────────┴────────┴─────┴───────────┴──────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
[TAILING] Tailing last 5 lines for [jsbattle] process (change the value with --lines option)
/Users/kjamroz/.pm2/logs/jsbattle-out-0.log last 5 lines:
0|jsbattle | 2018-10-25 13:15:16.681   INFO     -               Creating data folder for battle store at ~/jsbattle/dist/jsbattle-data
0|jsbattle | 2018-10-25 13:15:16.719   INFO     -               hello seneca sy8hfass9gcx/1540479923643/8413/3.7.0/-
0|jsbattle | 2018-10-25 13:15:16.737   INFO     -               webserver started at http://localhost:8080

```

Open your favorite web browser and navigate to URL from the previous step

```
  http://localhost:8080
```

It will open battle starting page

![alt text](/docs/img/start_screen_001.png)

Just click the **Start** button to watch the battle.

## Stopping JsBattle

Run following command to stop JsBattle server:
```bash
  npm stop
```
