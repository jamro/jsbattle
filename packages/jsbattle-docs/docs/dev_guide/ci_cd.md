# Continuous Integration and Continuous Delivery

## Git Branches
There are two main branches of the project:
- **master** - always a stable version. All releases goes from here. No direct development is allowed here.
- **develop** - development branch. It may contain unstable version of the product. Regular development takes place here

## Build server
[CodeShip](https://app.codeship.com) service builds, tests and deploys the app.

### Building
Following script is used by CI to build the project:

```bash
npm install
npm run clean
npm run lint
npm run build

# SonarCloud analytics
cd /home/rof/src/github.com/jamro/jsbattle
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.3.0.1492-linux.zip
unzip sonar-scanner-cli-3.3.0.1492-linux.zip
./sonar-scanner-3.3.0.1492-linux/bin/sonar-scanner -Dsonar.branch.name=$CI_BRANCH
```
The script requires setting `SONAR_TOKEN` environmental variable to access Sonar Cube service

### Testing
Following script is used by CI to test the project:

```bash
npm run test
```

### Deployment

#### Develop branch
All passed builds from **develop** branch are automatically deployed to dev server.

```bash
# prepare the package
cd /home/rof/src/github.com/jamro/jsbattle/packages/
tar -zchvf jsbattle.tar.gz jsbattle

# transfer the package
scp jsbattle.tar.gz $DEPLOY_DEV_USER@$DEPLOY_DEV_HOST:~/
ssh $DEPLOY_DEV_USER@$DEPLOY_DEV_HOST 'tar -xvzf jsbattle.tar.gz'

# restart the service
ssh $DEPLOY_DEV_USER@$DEPLOY_DEV_HOST 'pm2 delete ecosystem.config.js || true'
ssh $DEPLOY_DEV_USER@$DEPLOY_DEV_HOST 'pm2 start ecosystem.config.js'
```

The sript requires:
- `$DEPLOY_DEV_USER` environment variable to be set to name of user that is running **JsBattle** on dev server (e.g. tankdev)
- `$DEPLOY_DEV_HOST` environment variable to be set to host name of dev server (e.g. box.jmrlab.com)
- dev server to be accessible over SSH at `$DEPLOY_DEV_HOST` host name
- user `$DEPLOY_DEV_USER` to exist at dev server with permissions required to run **JsBattle*
- **CodeShip** SSH Public Key to be added to `~$DEPLOY_DEV_USER/.ssh/authorized_keys`
- **NodeJs** installed on dev server
- **PM2** installed on dev server
- `~$DEPLOY_DEV_USER/ecosystem.config.js` file to be configured to run **JsBattle** on dev server

Example of `ecosystem.config.js`:

```javascript
module.exports = {
  apps : [{
    name: 'jsbattle',
    script: "/home/tankdev/jsbattle/dist/jsbattle.js",
    cwd: __dirname,
    args: "start -h 127.0.0.1 -p 8090 -l info -d /home/tankdev/jsbattle-data",
    instances: 1,
    autorestart: true,
    watch: false,
    wait_ready: true
  }]
};
```
