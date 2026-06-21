# Bun and Next 16 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the repository from npm/Node-oriented project tooling to latest Bun, then upgrade Next.js, React, React DOM, and TypeScript to their latest releases without changing product behavior.

**Architecture:** Keep application and business logic unchanged. Restrict edits to package manager/runtime metadata, scripts, generated lockfiles, documentation, and code that must change for Next.js 16 compatibility. Any unavoidable behavior change from Next.js 16 must be reported separately for user judgment before intentional behavior changes are made.

**Tech Stack:** Bun 1.3.14, Next.js 16.2.9, React 19.2.7, React DOM 19.2.7, TypeScript 6.0.3, App Router, next-intl, NextAuth, Drizzle.

---

### Task 1: Bun Tooling Migration

**Files:**
- Modify: `package.json`
- Modify: `.husky/pre-commit`
- Modify: `.husky/commit-msg`
- Modify: `plop/component/generator.ts`
- Modify: `plop/context/generator.ts`
- Modify: `README.md`
- Modify: `.gitignore`
- Delete: `package-lock.json`
- Create: `bun.lock`

- [x] **Step 1: Update package manager metadata and scripts**

Set `packageManager` to `bun@1.3.14`, remove the `volta.node` pin, remove `--turbopack` from `dev` because Next.js 16 enables Turbopack by default, and replace `next lint` with the ESLint CLI.

- [x] **Step 2: Replace npm/npx command entry points**

Use `bunx` in Husky hooks, and use `bun x prettier` from Plop formatting actions so generated files continue to be formatted without invoking `npx`.

- [x] **Step 3: Regenerate dependencies with Bun**

Run: `bun install`

Expected: `bun.lock` is created or updated, `node_modules` is installed from Bun, and `package-lock.json` is no longer needed.

- [x] **Step 4: Update README commands**

Replace npm setup/build/lint/plop examples with Bun equivalents and document Bun 1.3.14 as the required package manager/runtime.

### Task 2: Framework and TypeScript Upgrade

**Files:**
- Modify: `package.json`
- Modify: `bun.lock`
- Modify if needed: `next.config.ts`
- Modify if needed: `eslint.config.ts`
- Modify if needed: `configs/eslint/*.ts`

- [x] **Step 1: Upgrade core packages**

Run: `bun add next@latest react@latest react-dom@latest`

Expected direct versions: `next@16.2.9`, `react@19.2.7`, `react-dom@19.2.7`.

- [x] **Step 2: Upgrade TypeScript and matching framework types**

Run: `bun add -d typescript@latest @types/react@latest @types/react-dom@latest @types/node@latest eslint-config-next@latest`

Expected direct versions: `typescript@6.0.3`, `@types/react@19.2.17`, `@types/react-dom@19.2.3`, `@types/node@26.0.0`, `eslint-config-next@16.2.9`.

- [x] **Step 3: Apply only required Next.js 16 compatibility edits**

Update code only when verification or official Next.js 16 migration guidance proves the old API is removed or now typed differently. Do not enable new caching, React Compiler, Partial Prerendering, or other features unless required for compatibility.

### Task 3: Next.js 16 Behavior Audit

**Files:**
- Inspect: `src/middleware.ts`
- Inspect: `src/app/**/page.tsx`
- Inspect: `src/app/**/layout.tsx`
- Inspect: `src/app/**/route.ts`
- Inspect: `src/i18n/**/*.ts`
- Inspect: `src/app/**/opengraph-image.*`
- Inspect: `src/app/**/sitemap.*`

- [x] **Step 1: Check breaking-change hotspots**

Search for request-time APIs, route params/searchParams, metadata image generation, sitemap generation, middleware/proxy convention, image config, runtime config, `next lint`, and `devIndicators` removed options.

- [x] **Step 2: Preserve behavior or escalate**

If an affected API has a behavior-preserving migration, apply it. If Next.js 16 changes runtime behavior and no behavior-preserving migration exists, document it as a user decision item instead of guessing.

### Task 4: Verification

**Files:**
- Inspect generated output only; do not change business logic to satisfy tests unless the failure is a compatibility issue from the upgrade.

- [x] **Step 1: Verify package manager and lockfile state**

Run: `bun --version`

Expected: `1.3.14`.

Run: `bun install --frozen-lockfile`

Expected: dependency resolution succeeds with `bun.lock`.

- [x] **Step 2: Verify static checks**

Run: `bun run lint`

Expected: ESLint completes without errors, or any existing unrelated lint failures are recorded with file paths.

Run: `bunx tsc --noEmit`

Expected: TypeScript completes without errors, or compatibility errors are fixed without changing business logic.

- [x] **Step 3: Verify production build**

Run: `bun run build`

Expected: Next.js 16 production build completes, or any remaining Next.js 16 behavior decisions are reported separately for user judgment.
