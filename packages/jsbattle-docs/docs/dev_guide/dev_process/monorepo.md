# Monorepo

## Rationale
There are a number of potential advantages to a monorepo over individual repositories:
- **Ease of code reuse** – Similar functionality can be abstracted into shared libraries and directly included by projects, without the need of a dependency package manager.
- **Simplified dependency management** – In a multiple repository environment where multiple projects depend on a third-party dependency, that dependency might be downloaded or built multiple times. In a monorepo the build can be easily optimized, as referenced dependencies all exist in the same codebase.
- **Atomic commits** – When projects that work together are contained in separate repositories, releases need to sync which versions of one project work with the other. And in large enough projects, managing compatible versions between dependencies can become dependency hell. In a monorepo this problem can be negated, since developers may change multiple projects atomically.
- **Large-scale code refactoring** – Since developers have access to the entire project, refactors can ensure that every piece of the project continues to function after a refactor.

## Tooling
The repository is managed by [Lerna](https://github.com/lerna/lerna). Most important operations handler by Lerna are:

- **Bootstrapping** - link internal dependencies between packages
- **Batch execution** - run command across all packages (e.g. build, test, etc...)
- **Versioning** - update version in modified packages
- **Publish** - publish packages to NPM repository

### Adding new package
Follow those steps to add new monorepo package (private, not published to NPM)

1. Create npm package:
```bash
mkdir packages/PackageName
cd packages/PackageName
npm init -y
```
2. Update `package.json`. Make the package private, update version and other required fields:
```json
{
  "name": "PackageName",
  "private": true,
  "version": "2.1.4",
  "license": "MIT"
  ...
}
```
3. Add npm-scripts (replace placeholders by real scripts):
```json

  "scripts": {
    "clean": "echo \"Error: no clean script specified\" && exit 1",
    "lint": "echo \"Error: no lint script specified\" && exit 1",
    "build": "echo \"Error: no build script specified\" && exit 1",
    "test": "echo \"Error: no test script specified\" && exit 1"
  }
}
```
4. (Optional) Add dependencies on other packages to `package.json`. Remember to add package name to **bundledDependencies** to avoid missing dependecy error during npm install (private packages must be bundled because they are not published to NPM repository).
```json
{
  ...
  "dependencies": {
    "AnotherPackageName": "*"
  },
  "bundledDependencies": [
    "AnotherPackageName"
  ]
}
```
5. Link all internal dependencies by running `lerna bootstrap`

6. Update sonar config at `sonar-project.properties`:

```
...
sonar.modules=jsbattle,...,packageName
...
packageName.sonar.projectName=packageName
packageName.sonar.sources=src
packageName.sonar.projectBaseDir=packages/packageName

```

### Managing Monorepo

All common operation can be done from root directory of the project by calling proper npm script (`npm run scriptName`). Check `package.json` for more details. Some examples are:

- `npm run clean` - clean distribution folders for all packages
- `npm run build` - build all packages
- `npm run all` - run a clean build and execute tests across all packages

All bulk actions on multiple packages are done in the order that resolves dependencies properly. Releasing process from the repo is described [here](release.md). Further information can be found in [Lerna Documentation](https://github.com/lerna/lerna).
