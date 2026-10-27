# Known World development ledger

This repository is exclusively the Known World / BECMI Text RPG project.

## Recovery and authority

GitHub `main` at its newest accepted commit, together with `ROADMAP-COVERAGE.md`,
`site-progress.json`, `pipeline-state.md`,
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

## Whole-product roadmap — REQUIRED for all workers

**Single authoritative prospective whole-product roadmap:** [DEVELOPMENT-ROADMAP.md](DEVELOPMENT-ROADMAP.md).
The full 100-point accepted-evidence gate ledger lives in [ROADMAP-COVERAGE.md](ROADMAP-COVERAGE.md)
and is mirrored in [site-progress.json](site-progress.json),
which powers [status.html](status.html) and the optional [playable status view](play.html)
through `site-progress.js`. The full-screen production `index.html` contains a self-contained, generated
revision/whole-roadmap header badge; its game-rule JavaScript is unchanged.
The optional `play.html` iframe is presentation, not a second rules engine.
The complete prospective [DEVELOPMENT-ROADMAP.md](DEVELOPMENT-ROADMAP.md)
controls detailed phase ordering and remaining objectives; its 100-point
status accounting is exclusively governed by the weighted evidence scorecard.
The long-form [Design 21](BECMI-Text-RPG-Design-21-Long-Term-Project-Direction-v6.md)
establishes the approved ultimate OSR service vision. Its **historical**
v0.4.223 launch checkpoint is not current; current accepted main and the top
pipeline/audit record control the next executable dependency.

On **every development continuation**, read the detailed roadmap, the weighted scorecard, the manifest, the
latest accepted main/pipeline/audit and the current Actions state *before*
choosing a checkpoint. The roadmap defines total scope and gate acceptance;
the pipeline defines immediate work order. Neither replaces the other.
Do not merge the separate 110-point `work/roadmap-whole-product-status` draft
into the approved 100-point ledger: it omits the later generalized OSR product
scope and has a different progress denominator.

On **every accepted gameplay, infrastructure, or scope milestone**:
1. Record the checkpoint and exact evidence in the newest audit and pipeline
   entry using the existing acceptance process.
2. Review the applicable approved roadmap gate(s), acceptance criteria, phase
   dependencies and actual evidence. Reclassify a gate only when its **entire**
   exit criterion is met; partial work never earns the whole gate weight.
3. Update `DEVELOPMENT-ROADMAP.md`, `ROADMAP-COVERAGE.md` and `site-progress.json` together:
   current revision, reviewed date, bounded milestone, gate status/evidence
   and total weighted completion. Preserve all 100 points and unique gate IDs.
   Do not confuse the completion of one checkpoint with overall scope.
4. Run `node tools/sync-progress-status.mjs` to regenerate the self-contained
   in-game badge and exact production manifest after a material accepted
   revision or scope change; `node tools/sync-progress-status.mjs --check`
   is mandatory CI. Also run `node validation/roadmap-governance.mjs` and
   `node validation/roadmap-playable-status.mjs` (Playwright/Chromium) in
   addition to the full
   required ten-job CI. A green roadmap check validates ledger consistency,
   **not** the truth of a claim of gameplay completion; underlying game
   acceptance tests and reviewed evidence remain mandatory.
5. Verify exact-main required CI and Pages before claiming deployment.
   Publish roadmap changes on the same accepted branch/promotion path; do
   not bump the displayed game revision on a documentation-only change.

Changes to total scope, gate weight, status criteria, or versioning policy must
be explicit, justified, versioned in the roadmap change log and reflected in
the machine-readable manifest and CI. Never auto-increment roadmap progress from
a version number, task count, or unreviewed code presence.

## Current continuation

As of the **2026-10-27** roadmap review, game **v0.4.347** remains accepted
and deployed. The **v0.4.348** contextual physical natural-attack damage
checkpoint is the next pipeline-prescribed gameplay dependency, in a separate
source-reviewed acceptance. The full product roadmap reports **20/100
conservatively accepted points**, *not* 20% of code implemented. Current
source/procedure authority must be recovered from main at each session rather
than assuming these historical snapshot numbers remain current.

The earlier v0.4.334–337 migration instructions are historical, not current
authorization. Preserve original workbook/source hierarchy and RAW/AAE/context
isolation. Do not silently expand scope, lower acceptance gates, or attempt
unapproved graphical cartography while implementing the current dependency.
