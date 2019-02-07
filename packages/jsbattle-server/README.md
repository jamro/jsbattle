# JsBattle Engine - Internal package

This is an internal package of **JsBattle**. See `jsbattle` package for more info.

## Usage

```javascript
let jsbattle = require('./jsbattle-server.js');

let gateway = new jsbattle.Gateway();
gateway.init({
  data: './',
  webroot: './',
  host: 'localhost',
  port: '8181',
  loglevel: 'info'
})
.then(() => gateway.start())
.catch(console.error);
```
