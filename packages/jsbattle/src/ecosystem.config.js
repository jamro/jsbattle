module.exports = {
  apps : [{
    name: 'jsbattle',
    script: "jsbattle.js",
    cwd: __dirname,
    args: "start -h localhost -p 8080 -l info",
    instances: 1,
    autorestart: true,
    watch: false,
    wait_ready: true
  }]
};
