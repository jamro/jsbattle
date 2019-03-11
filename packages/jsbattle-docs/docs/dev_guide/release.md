# Release procedure (Internal)

Follow those steps to release a new version of JsBattle

1. Make sure that all changes are merged to `master` branch and switch to `master`.

2. Check if current version on develop is stable (see build server logs)

3. Increase the version by `lerna version --conventional-commits -y` (it will push changes to git)

4. Rebuild project by `npm run-script all` to build version number to app (eg footer).

5. Create release in **GitHub**. Tag and Release Title should have format of "v1.0.0"

6. Publish new version to NPM by `lerna publish from-package`.
