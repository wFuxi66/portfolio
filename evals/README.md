# Evals

Lightweight offline checks that run on the repo *without* spinning up a browser.

Unlike `tests/`, which drives the deployed preview with Playwright, these evals read files on disk and assert invariants: copy quality, accessibility markup, bundle budgets, and data shape.

## Running

```
node evals/run.js
```

The runner exits non-zero on any failure and prints a summary line per eval.

## Current evals

- `evals/no-em-dash.eval.js`: forbids em dashes in tracked source (strong AI-slop signal).
- `evals/data-shape.eval.js`: guards the shape of `src/data/projects.js` so the list page keeps rendering after content edits.
- `evals/bundle-budget.eval.js`: if a `dist/` build exists, asserts the gzipped JS is within the budget from `.claude/CLAUDE.md`.

## Adding a new eval

1. Create `evals/<name>.eval.js`.
2. Export a default `async function run()` that throws on failure.
3. The runner auto-discovers anything matching `*.eval.js` in this folder.
