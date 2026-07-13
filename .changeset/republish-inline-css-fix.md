---
"capsule-capsulate": patch
---

Re-release the inline-CSS error-detail fix. 1.2.2 was versioned but never
published: the `release.yml` workflow added in the pnpm 11 migration omitted
`id-token: write`, so the OIDC/trusted publish failed. The redundant `.yml`
workflows are removed and `release.yaml` (which already has OIDC) is moved to
pnpm 11, matching capsule-lint. This publishes 1.2.3 with that fix.
