# Known World development ledger

This repository is exclusively the Known World / BECMI Text RPG project.

## Recovery and authority

GitHub `main` at its newest accepted commit, together with `pipeline-state.md`,
the production `index.html`, and the newest/topmost accepted `audit.md` entry,
is the authoritative development ledger. Known World Project Library copies are
recovery/reference material. Inspect main, active `work/...` branches, CI results,
and pipeline state before changes. Never redo, roll back, or overwrite an accepted
checkpoint. Historical baseline numbers in direction/controller documents are
superseded by the current accepted files.

Use only this repository, `/Known World/`, and already authorized Known World
governing references. Mentzer BECM is primary, compatible Rules Cyclopedia is
secondary, source-specific modules govern their own content, and Immortals is
excluded. Preserve deterministic authority, sparse data distinctions, save and
migration integrity, rule toggles, nonnumeric Special, and planning-only ships.

## Candidate and acceptance policy

`main` contains fully accepted game checkpoints only. Work on a single bounded
checkpoint on `work/vX.Y.Z`, branching from synchronized accepted main. Candidate
HTML may replace `index.html` on that branch, but audit/pipeline must explicitly
retain the accepted baseline and unaccepted candidate status until acceptance.

A candidate may merge only after every required check is green, missing procedure
blockers are resolved, and audit/pipeline record acceptance of those exact game
bytes. Use one clear acceptance commit per checkpoint, for example
`v0.4.334 — Ordinary Cureall Baldandar poison discovery`. Do not combine future
checkpoints. CI success by itself never changes acceptance or merges a branch.

Run the procedures documented in `validation/README.md`; do not reduce thresholds,
skip failures, or substitute supplemental smoke checks for an unrecovered native
suite. No temporary validation bridge belongs in production HTML. Record new
evidence separately from inherited historical acceptance results.

## Current migration boundary

Accepted main is v0.4.333. v0.4.334 is an unaccepted preserved candidate. The exact
next checkpoint is **v0.4.334 — Ordinary Cureall Baldandar poison discovery only**:
complete its required validation and acceptance record first. No v0.4.335 work is
authorized during the one-time migration session. Cartography, contextual weapon
rules, and unrelated Phase 1 work remain deferred.
