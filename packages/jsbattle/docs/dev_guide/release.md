# Release procedure (Internal)

Follow those steps to release a new version of JsBattle

1. Add version number and release date to **Unreleased** changes in `/CHANGELOG.md` file.

2. Make sure that `/package.json` and `/package-lock.json` have proper version number.

3. Rebuild the project to make sure that new version number is included in the **distribution**.

4. Commit and push changes to **GitHub** repository. Use new version number in commit message.

5. Create release in **GitHub**. Tag and Release Title should have format of "v1.0.0"

6. Publish new version to NPM by `npm publish`.

7. Increase version in `/package.json` and `/package-lock.json` so you will not introduce more changes to the released version.