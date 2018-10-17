module.exports = {
  apps : [{
    name: 'jsbattle',
    script: "jsbattle.js",
    cwd: "jsbattle/dist",
    args: "start -h {{ jsbattle_address }} -p {{ jsbattle_port }}",
    instances: 1,
    autorestart: true,
    watch: false
  }]
};
