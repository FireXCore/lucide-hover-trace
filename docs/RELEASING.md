# Publishing lucide-hover-trace

The npm package is **lucide-hover-trace@2.0.1** (latest as of 2026-11-21).
The stable GitHub Release **v2.0.1** and the first npm Trusted Publishing
(OIDC) workflow run completed successfully.

- Release: https://github.com/FireXCore/lucide-hover-trace/releases/tag/v2.0.1
- OIDC publishing run: https://github.com/FireXCore/lucide-hover-trace/actions/runs/44880672242
- Sigstore transparency: https://search.sigstore.dev/?logIndex=4031995546

## Trusted Publisher configuration

- Provider: GitHub Actions
- GitHub owner: `FireXCore`
- Repository: `lucide-hover-trace`
- Workflow: `publish.yml`
- Environment: `npm-publish`
- Permission: `publish` (and stage publish)

The connection has been exercised successfully. OIDC uses short-lived
credentials: do not add npm authentication tokens or `NODE_AUTH_TOKEN`
secrets to the publishing workflow.

## Releasing a future version

1. Submit a PR that updates `package.json` and `package-lock.json` to the
   next SemVer version. Do not attempt to republish an already published version.
2. Confirm the full CI suite passes (npm audit, typecheck, both builds, tests,
   npm pack smoke test).
3. Merge the PR into `main`.
4. Create a non-prerelease GitHub Release tagged `vX.Y.Z` at the tested
   `main` commit, with the tag matching `package.json` exactly.
5. A human-created Release triggers `.github/workflows/publish.yml` using
   `release.published`.
6. If a release was created by a workflow using `GITHUB_TOKEN`, GitHub will
   **not** trigger a second workflow via the release event. In that case use
   `workflow_dispatch` on the exact release tag (via `gh workflow run
   publish.yml --ref vX.Y.Z`). This is checked against the package version
   and `main` ancestry before publication.
7. Verify the successful publishing run, npm package version, and provenance
   attestation before marking the release complete.

## Hardening

GitHub environment `npm-publish` can require approval and limit permitted
release tags. Set allowed tags to `v*` or a more restrictive pattern. Package
settings can require 2FA and prohibit long-lived tokens while permitting
Trusted Publishing. Protect `main`, and require CI checks and PR review for
changes to `.github/workflows/publish.yml`.
