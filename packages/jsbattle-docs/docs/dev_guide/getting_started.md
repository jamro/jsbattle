# Dev Getting Started

There are just a few steps to start development of **JsBattle**:

1. Clone the repo and checkout develop branch
```bash
git clone https://github.com/jamro/jsbattle.git
cd jsbattle
git checkout develop
```

2. Install dependencies in root package
```bash
npm install
```

3. Bootstrap Lerna and install package dependencies
```bash
npm run bootstrap
```

4. Build and launch **JsBattle**
```bash
npm run build
npm run start
```

See [Building Process](./dev_process/building.md) for more details and troubleshooting 