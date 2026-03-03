
Goal: eliminate the Vercel ERESOLVE failure caused by `vite-imagetools` peer requirements and ensure the deployed commit is the one with the fix.

What I found from the current codebase:
- `package.json` currently does NOT include `vite-imagetools`.
- `vite.config.ts` currently has no `imagetools()` plugin import/use.
- `package-lock.json` also does NOT include `vite-imagetools`.
- `bun.lock` still contains `vite-imagetools` entries (v7.x), which indicates mixed package-manager history.
- Your Vercel log says root depends on `vite-imagetools@10.0.0`, so Vercel is likely building a different/stale commit or wrong root directory.

Implementation plan:
1) Verify deployment source mismatch
- Check GitHub `main` at commit shown by Vercel (`f34a681`) and confirm whether `package.json` there still has `vite-imagetools`.
- Confirm Vercel Project Settings:
  - Production Branch = `main`
  - Root Directory points to this app (not another folder).

2) Normalize dependency files to one package manager (npm)
- Remove `bun.lock` and `bun.lockb` from repo to avoid ambiguity.
- Keep `package-lock.json` as single source of truth.
- Ensure no `vite-imagetools` in any manifest/config.

3) Regenerate clean install state locally
- Delete `node_modules` + `package-lock.json`.
- Run `npm install`.
- Confirm: `npm ls vite-imagetools` returns empty/not found.

4) Commit and push the clean state
- Commit updated lockfile + removed Bun lockfiles.
- Push to `main` and ensure Vercel deploy references the new commit hash.

5) Force clean redeploy in Vercel
- Trigger “Redeploy” with “Clear build cache”.
- Keep install command as default npm (`npm install` or `npm ci`).

Validation checklist:
- Build logs no longer mention `vite-imagetools@10`.
- Install step completes without peer-dependency ERESOLVE.
- App builds and routes load correctly (including direct URL refresh due existing `vercel.json` rewrites).
- End-to-end check: open site, submit contact form, and verify admin dashboard loads leads.

Technical notes:
- Root cause is most likely deployment of stale commit/config, not current Lovable workspace code.
- If mismatch persists after push, we’ll inspect Vercel’s linked repo/branch/root path and webhook target to ensure correct source is being built.
