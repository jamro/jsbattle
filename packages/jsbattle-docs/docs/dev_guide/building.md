# Building Process

## Install JsBattle

The process is described in details in [Installation](../installation.md) section.

## Prerequisites

You will need these before you start:
- [Graphviz](http://www.graphviz.org/) - required by PlantUML to generate UML diagrams in documentation
- [Java SE Development Kit](https://www.oracle.com/technetwork/java/javase/downloads/index.html) - required by PlantUML to generate UML diagrams in documentation

## Build Process

### NPM

The building process can be started via npm:

```bash
  npm run build
```

Above command will rebuild the whole project and put results to `/packages/jsbattle/dist` directory. To learn more about packages see [Monorepo section](./monorepo.md)

### NPM Scripts
Script Name     | Description
----------------|-------------------------------------
start           | Starts JsBattle
stop            | Stop JsBattle
restart         | Restart JsBattle
clean           | clean distribution directores for all [packages](./monorepo.md)
lint            | analyzes source codes for all [packages](./monorepo.md)
build           | build all [packages](./monorepo.md)
test            | run tests for all [packages](./monorepo.md)
all             | execute clean, lint, build and test
ci              | runs in CI environemnt
