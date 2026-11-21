# Publishing lucide-hover-trace

This repository publishes through the GitHub-hosted workflow `.github/workflows/publish.yml`.
The current public npm package is **2.0.0**; **2.0.1** is the prepared next release, not yet published.

## 1. Connect npm Trusted Publishing

Authenticate as npm package owner `firexcore` and configure the following under
`https://www.npmjs.com/package/lucide-hover-trace/access` or the package settings UI:

- Provider: GitHub Actions
- Organization/user: `FireXCore`
- Repository: `lucide-hover-trace`
- Workflow filename: `publish.yml` (not the path)
- GitHub environment: `npm-publish`
- Allowed action: **Allow npm publish**

CLI alternative (npm 11.15.0+ and account 2FA required):

```sh
npm trust github lucide-hover-trace --repo=FireXCore/lucide-hover-trace --file=publish.yml --env=npm-publish --allow-publish
npm trust list lucide-hover-trace
```

On GitHub, create environment `npm-publish` under
`Settings → Environments`. Optional: require a human approval to release.
Do not add npm publish tokens or NODE_AUTH_TOKEN to the workflow.

**Important:** The first successful OIDC publication must complete within
48 hours of creating the new npm trusted-publisher configuration. After it
has successfully published, the configuration no longer expires unused.

## 2. Publish the reviewed release

1. Confirm `main` CI is green.
2. Confirm `npm view lucide-hover-trace version` is still `2.0.0`.
3. Confirm `npm trust list lucide-hover-trace` includes the exact GitHub
   publisher and environment.
4. Create and publish a new non-prerelease GitHub Release tagged `v2.0.1`,
   selecting the tested commit from `main`.
5. Watch the `Publish to npm (OIDC)` GitHub Actions workflow.
6. Verify `npm view lucide-hover-trace@2.0.1 version` returns `2.0.1`.
7. Verify the npm page shows provenance attestation referencing the expected
   GitHub commit and workflow.

The workflow refuses tags that do not match `package.json`, refuses commits
outside `main`, runs the dependency audit, typecheck, builds, and tests, then
publishes using a short-lived OIDC token.

## 3. Lock down npm authentication

Only after successful OIDC publishing, use the package settings
`Publishing access` to require two-factor authentication and disallow
classic tokens. OIDC trusted publishing is still allowed.
