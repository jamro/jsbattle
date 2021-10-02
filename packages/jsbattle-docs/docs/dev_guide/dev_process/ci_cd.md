# Continuous Integration and Continuous Delivery

## Git Branches
There are two main branches of the project:
- **master** - always a stable version. All releases goes from here. No direct development is allowed here.
- **develop** - development branch. It may contain unstable version of the product. Regular development takes place here

## Build server
[CircleCI](https://app.circleci.com) service builds, tests and deploys the app.

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
unzip sonar-scanner-cli-3.3.0.1492-linux.zip > /dev/null 2>&1
./sonar-scanner-3.3.0.1492-linux/bin/sonar-scanner -Dsonar.branch.name=$CI_BRANCH > /dev/null 2>&1
```
The script requires setting `SONAR_TOKEN` environmental variable to access Sonar Cube service

### Testing
Following script is used by CI to test the project:

```bash
npm run test
```

