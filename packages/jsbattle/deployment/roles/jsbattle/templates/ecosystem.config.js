module.exports = {
  apps : [{
    name: 'jsbattle',
    script: "jsbattle.js",
    cwd: __dirname,
    args: "start -h {{ jsbattle_address }} -p {{ jsbattle_port }} -l info -d {{ jsbattle_home }}/jsbattle-data",
    instances: 1,
    autorestart: true,
    watch: false,
    wait_ready: true
  }]
};
