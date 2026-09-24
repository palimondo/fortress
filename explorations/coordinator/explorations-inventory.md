<!-- Housekeeping prep, 2026-09-20, at tree b302393dd: what shapes `explorations/` is stored in today, whether its indexes match the tree, and the smallest move list that would leave one shape per job. A proposal only — nothing in the tree was moved, renamed or deleted to write it. The freshness check is reproducible: `explorations/coordinator/check-index.sh`. -->

# Inventory of `explorations/`

32 directories and 55 files at the top level; 6,809 files on disk, 6,695 of them
tracked (the 114 others are gate logs and `__pycache__` under `.gitignore`).
297 `.md` files in all, of which 117 are standalone notes by the rule in §2 and
the rest are reports and captures inside evidence directories.

## 1. The storage patterns in use

### 1a. A run or experiment: one directory, sources and evidence inside

Eleven directories. The convention inside is `README.md` + `src/` + `probes/` +
`checks/`, with `figures/`, `goldens/`, `tools/`, `reference/` as needed — the
second-level names that recur are `probes` (7), `src` (6), `checks` (6),
`tools` (4), `figures` (4).

| directory | size | files | notes |
|---|---|---|---|
| `compile-ladder/` | 13.7 MB | 2,586 | one directory per ladder run; no README (`CLIMB.md` instead) |
| `run-b/` | 18.4 MB | 460 | `article/ build/ checks/ figures/ probes/ reference/ src/ tools/` |
| `run-b2/` | 10.1 MB | 355 | same minus README |
| `run-c4/` | 7.3 MB | 509 | adds `cold-cache/`, `tour/` |
| `run-c/` | 7.4 MB | 239 | adds `goldens/`, `tour/` |
| `run-c3/` | 5.7 MB | 317 | |
| `blinded-fable/` | 9.9 MB | 182 | adds `notes/` |
| `astra/` | 5.9 MB | 280 | `archive/ evidence/ render-check/ render-tools/ worker/` |
| `apl/` | 3.6 MB | 541 | `rung-1…rung-6`, `base/ goldens/ mg/ microgpt/ reference/` + two probe dirs |
| `notation-collaboration/` | 256 KB | 25 | README + 5 notes + `evidence/ figures/` + a probe and a script |
| `fortify/` | 4.9 MB | 72 | flat: 24 `.tic` + 48 `.svg` render sheets, no README, no note |

Run C2 has no tree: its review and its review probes are in `reviews/`, its
process record is `process-records/10-run-c2.md`, and nothing in the repo cites
an `explorations/run-c2/` path.

### 1b. A note with a same-named evidence directory

Three: `c4-parallelism.md` + `c4-parallelism/` (`audit.md`, `probes/`,
`measurements/`), `coordinator/repair-batch-review.md` +
`coordinator/repair-batch-review/` (parser + CSV), `coordinator/next-climb.md` +
`coordinator/next-climb/` (three survey notes).

### 1c. Probes as a `<topic>-probes/` sibling of the note

Fifteen at the top level: `perf-probes/` (11.1 MB, 342 files, five
`<area>/REPORT.md` sub-probes), `run-b2-review-probes/` (10.6 MB),
`run-b-review-probes/` (3.5 MB), `compiler-probes/` (640 KB, 146),
`fable-review-probes/` (628 KB), `apl-probes/` (456 KB, 102),
`gap-ledger-probes/` (424 KB), `libvector-probes/` (220 KB),
`spec-probes/` (188 KB), `alias-units-probes/` (164 KB), `sum-probes/`
(132 KB), `matrix-ad-probes/` (104 KB), `named-spaces-probes/` (80 KB),
`sigma-probes/` (60 KB), `run-b-vs-run-b2-probes/` (24 KB). Three more sit
under `reviews/` and two inside `apl/`.

### 1d. Reviews

`reviews/` — 25.2 MB, 79 files: 18 `.md`, one rendered `.html`, three probe
directories (`run-c-review-probes/`, `run-c2-review-probes/`,
`run-c2-vs-run-c3-pairs/`) and `tools/` (two Python scripts). Sixteen of the
18 `.md` are reviews; two are plans (§1f).

### 1e. The coordinator's record

`coordinator/` — 2.1 MB, 59 files: the knowledge base (`README.md`, `FACTS.md`,
`FACTS-history.md`, `POSITIONS.md`, `INDEX.md`), six decision records
(`PLAN.md`, `CLIMB-BATCH-1.md`, `CLIMB-BATCH-2.md`, `REPAIR-BATCH.md`,
`batch-2-open-decisions.md`, `batched-climb-plan.md`), five process reviews
(`batched-climb-review.md`, `process-decisions-review-1.md`,
`repair-batch-review.md`, `test-discipline.md`, `iteration-cost.md`), three
Workflow scripts (`*.js`, indexed), a design document (`array-design.md`), an
operating manual (`remote-container.md`), and four subdirectories: `map/`
(five survey notes + README), `next-climb/`, `postmortem-2026-09-19/` (11
notes, `_prior/`, two parsers, three `.tsv`), `transcript-backup/`,
`repair-batch-review/`.

### 1f. Plans

Six at the top level (`modernization-plan.md`, `rebuild-plan.md`,
`readme-plan.md`, `microgpt-iteration2-plan.md`, `performance-roadmap.md`,
`c2-proposal.md`), six in `coordinator/` (§1e), two in `reviews/`
(`nat-checking-plan.md`, `template-checking-plan.md`).

### 1g. Numbered narrative records

`process-records/` — `01-microgpt-port.md` … `14-apl-rung-4b.md`, `FORMAT.md`,
`recovered-reports/` (three recovered worker reports). And `conversations/`,
one file, same numbering: `01-apl-close-and-rung-4b.md`.

### 1h. Following no pattern

- `ci/` — one file, `gate.yml`, a deliverable parked for Pavol's machine.
- `conversations/` — one file (§1g).
- `fortify/` — 72 render sheets with no README and no owning note; the two
  notes that produced them are `microgpt-paper-impl-report.md` and
  `notation-collaboration/`.
- `names.txt` — 228 KB of training data at the top level; 70 mentions in 42
  files and the `.fss` programs open it by relative path.
- `prng-chart.svg`, `training-dynamics-chart.svg` — a note's figure loose
  beside the note, where every run keeps figures in `figures/`.
- `modernization-tags.sh` — the only script at the top level; the others are in
  `coordinator/`, `reviews/tools/`, a run's `tools/`, or beside their probes.
- 15 `.fss` programs at the top level. Four are the README's demos; the rest
  are probes and benchmarks (`mgbench`, `mgnative_a/b/c`, `nprobe`,
  `tparallel`, `micrograd`) and four are deliverables (`microgpt.fss`,
  `microgpt2.fss`, `microgpt_native.fss`, `microgpt_paper.fss`).

### 1i. The parallel patterns — the same job done in different places

1. **Review probes have three homes.** Top level:
   `run-b-review-probes/`, `run-b2-review-probes/`,
   `run-b-vs-run-b2-probes/`, `fable-review-probes/`. Under `reviews/`:
   `run-c-review-probes/`, `run-c2-review-probes/`,
   `run-c2-vs-run-c3-pairs/`. Under another topic's probe directory:
   `compiler-probes/array-design-review/`, which belongs to
   `reviews/array-design-review.md`.
2. **Plans have three homes** — top level, `coordinator/`, and `reviews/`
   (§1f). The two in `reviews/` are the clearest case: `nat-checking-plan.md`
   and `template-checking-plan.md` are engineering plans, and
   `reviews/array-design-review.md` reviews the design *against* them.
3. **Reviews have three homes** — `reviews/` (16), the top level
   (`expressiveness-review.md`, `process-audit.md`,
   `navigation-retrospective.md`), `coordinator/` (five process reviews).
   There is a distinction available here that needs no moves: `reviews/`
   reviews the tree and our deliverables, `coordinator/` reviews how we
   worked.
4. **One topic's probes in two or three places.** APL: `apl-probes/` at the
   top level, `apl/v1-probes/` and `apl/probes-4b/` inside the run. Compiler:
   `compiler-probes/`, `perf-probes/`, `run-c4/probes/types/`.
5. **A note's evidence takes four shapes** — a same-named directory
   (`c4-parallelism/`), a `-probes` sibling (15), loose beside the note
   (`prng-chart.svg`), or inside a run tree
   (`run-c4/probes/vocabulary/REPORT.md`).
6. **Two numbered record series** — `process-records/` (14 files) and
   `conversations/` (1 file).
7. **A worker's report has two names.** `REPORT.md` inside an evidence
   directory (54 files, e.g. `apl-probes/REPORT.md`,
   `perf-probes/kernels/REPORT.md`, `compile-ladder/rung3/REPORT.md`) or
   `<topic>-report.md` as a top-level note (`aliases-units-report.md`,
   `libvector-report.md`, `sum-experiment-report.md`,
   `microgpt-native-impl-report.md`, `microgpt-paper-impl-report.md`,
   `microgpt2-diet-report.md`). The 54 `REPORT.md` files are invisible to
   `INDEX.md`; the six notes are indexed.
8. **`compile-ladder/`'s own directory names run in four families** —
   `rung0`…`rung8` (9), `rung-<name>` (7), `climb-batch-1/2`,
   `repair-r1-…`/`repair-r2-…`/`repair-batch`, plus `baseline-2026-09-19`,
   `gate-baseline`, `after`, `raw`.

## 2. Are the indexes fresh?

`coordinator/check-index.sh` defines the note set — every `*.md` under
`explorations/` except the eleven run/experiment trees (which document
themselves in their own README), any `*-probes/` or `*-pairs/` directory, and
the generic evidence directory names (`probes checks goldens figures evidence
measurements raw src tools gate cold-cache reference archive build article
worker notes recovered-reports _prior __pycache__ existing-tests failed png
regen tic-regen tour pairs combos`). That gives 118 notes against 80 index
entries (the 118th is this inventory).

**42 notes have no line in `INDEX.md`.** Whole families are absent: all 15 of
`process-records/`, all 11 of `coordinator/postmortem-2026-09-19/`, all 6 of
`notation-collaboration/`, three of the coordinator's own knowledge-base files
(`README.md`, `FACTS.md`, `POSITIONS.md`), `conversations/`, and the two
newest reviews (`reviews/array-design-review.md`,
`reviews/library-scalar-extension-review.md`) with the two plans beside them.

**0 index lines name a file that no longer exists** (as an entry key).

**1 index entry falls outside the note set**:
`compiler-probes/maybe-inference/inference.md` — a note living inside a probe
directory, indexed because it is a note in substance.

**2 paths named in a line's prose resolve nowhere**:
`astra-review/phase1.md` and `fable-review/phase1.md`, in the descriptions of
`reviews/blinded-fable-phase1.md` and `reviews/blinded-fable-vs-astra.md`.
They are the pre-`reviews/` layout, and the same descriptions also cite
`astra-review/astra/experiment/worker/`.

`explorations/README.md` is a front door, not an index: its table names five
files (all present) and five more elsewhere in the text (all present). It
names 4 of the 15 top-level `.fss` programs and 1 of the 36 top-level `.md`
notes, so nothing in it is stale and most of the directory is simply not in
it.

`coordinator/map/README.md` names three `explorations/` paths —
`apl/mg/`, `ci/gate.yml`, `run-c4/src/` — all present. Its other 31 path-like
tokens are source basenames in the original tree (`CodeGen.java`,
`FortressAst.scala`), not paths, and resolve by search.

### The check, run at b302393dd

```
INDEX.md check — b302393dd
notes in scope: 118   index entries: 80

== notes missing from INDEX.md (42) ==
explorations/conversations/01-apl-close-and-rung-4b.md
explorations/coordinator/FACTS.md
explorations/coordinator/POSITIONS.md
explorations/coordinator/README.md
explorations/coordinator/explorations-inventory.md
explorations/coordinator/postmortem-2026-09-19/README.md
explorations/coordinator/postmortem-2026-09-19/agents.md
explorations/coordinator/postmortem-2026-09-19/array-thread.md
explorations/coordinator/postmortem-2026-09-19/array-work-brief.md
explorations/coordinator/postmortem-2026-09-19/boots.md
explorations/coordinator/postmortem-2026-09-19/compactions.md
explorations/coordinator/postmortem-2026-09-19/decision-lists.md
explorations/coordinator/postmortem-2026-09-19/decisions-for-reapproval.md
explorations/coordinator/postmortem-2026-09-19/model-names.md
explorations/coordinator/postmortem-2026-09-19/review-patterns.md
explorations/coordinator/postmortem-2026-09-19/script-vs-tactics.md
explorations/coordinator/transcript-backup/README.md
explorations/notation-collaboration/ASTRA-EVALUATION.md
explorations/notation-collaboration/CONTINUITY.md
explorations/notation-collaboration/DISCUSSION.md
explorations/notation-collaboration/QUESTIONS.md
explorations/notation-collaboration/README.md
explorations/notation-collaboration/sol-candidate-framework.md
explorations/process-records/01-microgpt-port.md
explorations/process-records/02-microgpt-native.md
explorations/process-records/03-microgpt-paper.md
explorations/process-records/04-microgpt2.md
explorations/process-records/05-astra.md
explorations/process-records/06-blinded-fable.md
explorations/process-records/07-run-b.md
explorations/process-records/08-run-b2.md
explorations/process-records/09-run-c.md
explorations/process-records/10-run-c2.md
explorations/process-records/11-run-c3.md
explorations/process-records/12-run-c4.md
explorations/process-records/13-apl-microgpt.md
explorations/process-records/14-apl-rung-4b.md
explorations/process-records/FORMAT.md
explorations/reviews/array-design-review.md
explorations/reviews/library-scalar-extension-review.md
explorations/reviews/nat-checking-plan.md
explorations/reviews/template-checking-plan.md

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (1) ==
explorations/compiler-probes/maybe-inference/inference.md

== paths named in a line's prose that resolve nowhere (2) ==
astra-review/phase1.md
fable-review/phase1.md
```

## 3. A proposed regular shape

Nine rules, each one the majority practice in the tree already.

1. **A run or experiment is one directory** named for the run, holding its own
   `README.md`, `src/`, `probes/`, `checks/` and figures. Nothing about a run
   lives outside it, and it is not indexed — its README is its index.
2. **A note is a `.md` directly under `explorations/`.** Its evidence lives in
   exactly one directory named after it: `<note>/` when the evidence is
   measurements and captures, `<note>-probes/` when it is probe programs.
   Nothing loose beside the note.
3. **Probes have one owner.** A run's probes are inside the run; a note's
   probes are in that note's directory; a review's probes are under
   `reviews/`.
4. **`reviews/` holds reviews and only reviews**, one `.md` per review with
   its probe directory beside it. A plan is not a review.
5. **Plans and proposals are notes** under `explorations/`, `*-plan.md` /
   `*-proposal.md`. A per-batch decision record is not a plan and stays in
   `coordinator/`.
6. **`coordinator/` is the coordinator's record**: the knowledge base, the
   decision records, the Workflow scripts, `map/`, and reviews of *how we
   worked*. Reviews of the tree go to `reviews/`.
7. **One numbered record series**, `process-records/NN-<slug>.md`, governed by
   `FORMAT.md`.
8. **A worker report that is not part of a run tree is a note**
   (`<topic>-report.md`). A `REPORT.md` inside an evidence directory is
   evidence, is not promoted, and is not indexed.
9. **`INDEX.md` carries one line per note** in the scope of rules 2, 4, 5, 6
   and 7. `coordinator/check-index.sh` is the check.

### The move list

Ten `git mv`s, grouped. Each line is `path → path`; the count after it is the
citations that would break, as `grep -rI` counts them over the whole tree
(mentions / files containing them).

Group A — review probes under `reviews/` (rule 3; removes parallel 1):

```
explorations/run-b-review-probes/            → explorations/reviews/run-b-review-probes/             4 / 1
explorations/run-b2-review-probes/           → explorations/reviews/run-b2-review-probes/           29 / 6
explorations/run-b-vs-run-b2-probes/         → explorations/reviews/run-b-vs-run-b2-probes/          7 / 5
explorations/fable-review-probes/            → explorations/reviews/fable-review-probes/            54 / 5
explorations/compiler-probes/array-design-review/ → explorations/reviews/array-design-review-probes/ 6 / 5
```

Group B — plans out of `reviews/` (rules 4, 5; removes parallel 2):

```
explorations/reviews/nat-checking-plan.md      → explorations/nat-checking-plan.md                  16 / 10
explorations/reviews/template-checking-plan.md → explorations/template-checking-plan.md              9 / 6
```

Group C — a note's loose evidence into the note's directory (rule 2; removes
parallel 5):

```
explorations/prng-chart.svg             → explorations/prng-findings/prng-chart.svg                  8 / 3
explorations/training-dynamics-chart.svg → explorations/training-dynamics/training-dynamics-chart.svg 5 / 2
```

Group D — one record series (rule 7; removes parallel 6):

```
explorations/conversations/01-apl-close-and-rung-4b.md → explorations/conversation-apl-close-and-rung-4b.md  1 / 1
```

139 mentions in 33 files in total — 23 `.md`, five probe captures, two HTML
renders, a transcript, a `.txt` and one shell script; 6 of the files are in
`reviews/`, 5 at the top level, 4 inside the moved `array-design-review/`
itself, 3 in `coordinator/`. Nothing outside `explorations/` cites a moved
path, and no `.fss` program or build file does, so the only executable
breakage is one line: `explorations/fable-review-probes/run_probes.sh:8`
invokes `./bin/fortress explorations/fable-review-probes/$n.fss` by
repo-relative path and must be re-pointed with the move. The rest are prose
and captured records.

Group D's target keeps the slug and puts the file beside `backend-options.md`,
which is already a conversation digest at the top level; that removes the
one-file directory rather than starting a second numbered series.

Group E — the top level (added 2026-09-24, done the same day):

```
experiment/ → explorations/experiment/
```

The run briefs, `env.sh`, `setup.sh` and the Run C goldens, moved with one
`git mv` because everything of the revival's belongs under `explorations/`
(POSITIONS 2026-09-24). Every reference that a program executes or reads was
re-pointed in the same commit, including the way `env.sh` and `setup.sh`
derive the repository root from their own location; prose citations in
records, reports, captures, reviews and the post-mortem still name
`experiment/` and are left as history. The `experiment/` paths in
`astra/`'s scripts name that run's own tree, now `explorations/astra/`, and
were not changed.

### One move left to the owner

`explorations/apl-probes/` (456 KB, 102 files) is the APL sublanguage
question, answered by probes, with its own `REPORT.md` and no owning note —
so under rule 1 it belongs inside `apl/`, and under rule 8 its `REPORT.md`
should become a note. Either shape is a move; both cost more than any other
line above: 126 mentions in 28 files, 85 of them in 18 files outside the
directory. The two options are

```
explorations/apl-probes/ → explorations/apl/probes-sublanguage/     (rule 1)
explorations/apl-probes/REPORT.md → explorations/apl-sublanguage.md (rule 8, then the directory is its -probes sibling)
```

and neither is proposed without a decision, because both invent a name the
tree does not yet use.

### What stays as is

- The eleven run/experiment trees, untouched. They already follow rule 1.
- `compile-ladder/`'s four families of directory names (parallel 8). It is the
  largest directory in `explorations/` (2,586 files), `after/` alone has 38
  mentions in 22 files, and the names encode which campaign produced each
  run. Renaming buys consistency inside one directory at the highest citation
  cost in the tree.
- The 14 remaining top-level `*-probes/` directories: each is rule 2's
  `<note>-probes/` with its note beside it.
- `names.txt` at the top level. The `.fss` programs open it by relative path,
  so moving it breaks runs and not just citations.
- The 15 top-level `.fss` programs, `modernization-tags.sh`, `ci/gate.yml`,
  `fortify/`.
- `coordinator/`, `process-records/`, `reviews/`, `notation-collaboration/`
  shapes.
- Parallel 3 (reviews in three homes) and parallel 7 (`REPORT.md` vs
  `<topic>-report.md`) are settled by rules 6 and 8 without moving anything.

### The index work the moves imply

After the moves, `INDEX.md` needs 42 new lines (or a narrower stated scope),
two prose references corrected (`astra-review/phase1.md`,
`fable-review/phase1.md`), and 11 entry keys rewritten for Group A and B.
`check-index.sh` reports all of it and exits non-zero while any note is
missing.
