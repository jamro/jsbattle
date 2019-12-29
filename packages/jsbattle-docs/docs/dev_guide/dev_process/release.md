# Release procedure (Internal)

Follow those steps to release a new version of JsBattle

1. Make sure that all changes are merged to `master` branch and switch to `master`.

```bash
git checkout master
git merge develop
```
2. Make sure that you have `lerna` installed

```bash
lerna -v
```

3. If command is not found, install `lerna`

```bash
npm install -g lerna
```

4. Run following commands:

```bash
lerna version --conventional-commits -y
npm run all
lerna publish from-package -y
```
