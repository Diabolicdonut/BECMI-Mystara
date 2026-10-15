# Known World v0.4.334 candidate — NOT ACCEPTED

Accepted production remains **v0.4.333**. This session has accepted **zero** new checkpoints. No v0.4.335 implementation has begun.

The only game-logic change is the ordinary RAW Cureall poison availability clause:

```javascript
if(subject.poisoned||subject.fatalPoisonDueMinute||subject.baldandarPoisonSleep)available.push('poison');
```

The version is marked 0.4.334 in the candidate and eight bounded regressions are added. Every earlier implementation and regression body is preserved. No private validation exports are included in the candidate.

Local Node VM checks, using inert DOM stubs:
- Reproduction on accepted v0.4.333: five expected defect cases fail; three controls pass; state isolation preserved.
- Candidate targeted checks: **8/8** pass; state isolation preserved.
- Focused suite: **1232/1232** pass; state isolation preserved; no local runtime errors.
- Complete production regression suite: **2316/2316** pass; state isolation preserved; no local runtime errors. Ordered result names are unique and the focused report is the exact ordered v0.4.200+ subset.

These local checks are not Chromium or native browser acceptance. Required fresh Chromium slices, native commands and actual browser boot/save-reload have not been completed. Local Chromium is not installed, and its official installer returned invalid/empty downloads. Automatic approval review rejected opening the private Known World project server in the managed cloud browser because transmitting project contents to that destination was not authorized. No project contents were opened there.

Next exact checkpoint remains **v0.4.334 — Ordinary Cureall Baldandar poison discovery only**. Complete its required validation and write back acceptance before any subsequent implementation. The ordinary multi-condition wounds-default fallback and natural-language parser work remain separate dependencies. Never build on this candidate as an accepted baseline.

The accepted HTML, newest accepted audit entry and pipeline agree on v0.4.333. All work uses only Known World project files and its authorized source PDFs. Hidden-world cartography and contextual weapon rules remain deferred.
