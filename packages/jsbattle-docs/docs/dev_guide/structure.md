# Files Structure

The project is a mono repo. [Lerna](https://github.com/lerna/lerna) is used to manage it properly. To learn more about packages see [Monorepo section](./monorepo.md)
The repo's structure is:
```
+-- JsBattle
    |-- packages
    |   |-- ...
    |-- package.json
    |-- lerna.json
    |-- ...
```
* **`/packages`** - Lerna packages. The main package is `jsbattle`
* **`/package.json`** - main package.json file. Please keep in mind that each Lerna package has its own `package.json` inside
* **`/lerna.json`** - Lerna configuration

## Packages

![Package dependencies](./img/puml/packages.png)

- **jsbattle** - the main package with the app. It integrates all other packages.
- **jsbattle-server** - JsBattle server. It hosts static files and provide API for backend services
- **jsbattle-webpage** - frontend part of the application.
- **jsbattle-engine** - Battle engine that simulate fights between tanks
- **jsbattle-docs** - documentation for the project
