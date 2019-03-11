# Release procedure (Internal)

Follow those steps to release a new version of JsBattle

1. Make sure that all changes are merged to `master` branch and switch to `master`.

2. Run following commands:

```bash
lerna version --conventional-commits -y
npm run all
lerna publish from-package -y
```
