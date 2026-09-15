# Process record: APL rung 4b, the focused base

Written by the coordinating session itself, the same day, in the common format of `explorations/process-records/FORMAT.md`; the token figures are computed from the session transcript by the script of record 11, on both bases that record explains.

## Header

| field | content |
|---|---|
| run | rung 4b of the APL side quest: the ladder's calling convention (rung 4's frame stack) replaced by a focused base that keeps only the microGPT subset over C4's vocabulary, with every rule expanding to a typed entry; result in `explorations/apl/mg/` (`DESIGN.md`, `AplMgSyntax.fsi`, `AplMg.fss/.fsi`, `MicroGptApl.fss/.fsi`, `MicroGptAplCheck.fss`, `checks/`, `REPORT.md`, `NOTES-worker.md`), probes in `explorations/apl/probes-4b/`; alongside, the Fable review of C4's vocabulary in `explorations/run-c4/probes/vocabulary/` |
| period | 2026-09-15T07:35Z (Pavol's "So on the B4 rewrite, we should do the rewrite") to 2026-09-15T09:40Z (the closing commit) |
| strategy | coordinator with delegated workers: the design, the ledger rows, the check runs and this record in the main thread; the two probes, the build, and the vocabulary review to workers |
| models | main thread `claude-fable-5-1` (`message.model` on every assistant record); the probe and build workers `opus`, the vocabulary review `fable` (the `model` field of each `Agent` call, the last at Pavol's request) |
| delegations | three: the probes y01–y04 (opus), the build (opus), the vocabulary review (fable) |
| tokens, main thread | output 6.1e4 per message (43 messages) and 1.7e5 per record (94 records, the split-message double count record 11 explains); context processed 4.5e7 |
| tokens, workers | `subagent_tokens` of the completion notices: probes 126,352; build (no notice: ended by a stop while writing its last files, its notes and report complete on disk, its transcript not summed); vocabulary review 302,214 |
| wall time | 2 h 5 min from the decision to the closing commit; the design 4 min after the probes' brief, the probes 12 min, the build about 80 min, the review 28 min in parallel with the build; the recorded checks 8 and 4 min plus two C4 samples of 9 min |
| gates | the design's: the same 40 checks at both pool sizes with identical values; cost equal to C4's on the same host within noise; the `step` block's expansion checked against C4:51–72; no `aplCall`, no frame stack, no `Any`, no `Object` |
| outcome | `mg/MicroGptApl.fss` 70 code lines, 19 of 25 lines APL text, the Dyalog's own tacit spelling on L16 restored; forward pass identical to C4's bit for bit (`checks/diag_fwd.out`); `checks/threads1.txt` 40 of 40 in 439 s and `threads4.txt` 40 of 40 in 254 s against C4's 528 s (second sample C4SECOND s) and 263 s; the grammar 446 lines (73 rules, 124 name lines) against the universal base's 899, the glue 11 declarations against the universal library's 2,343 lines; gap rows 95–98 (ledger 284–287); the vocabulary review: 10 habits and 19 narrow shapes among C4's 40 declarations, `FlatArrays2` with 28, nine candidate rows |
| sources | the session transcript from the user turn at 07:35; the three worker transcripts under `.../subagents/`; commits a56e7d48b through the closing commit |

## Timeline

1. **07:35 to 07:39, the design.** Pavol's decision came with the goal restated: the readable expression of microGPT, Iverson's notation for the data flow, Fortress's for the pieces. The ledger's row 204 (hygiene) settled that `⍵` in a user-written dfn body can never be a typed parameter, so the design drops dfn bodies from the subset: the program's four vector functions are typed host declarations used by name, the two inline dfns become the Dyalog's tacit spellings, every operator pattern is one rule to one typed entry of C4's `FlatArrays`, keys stay `ZZ32`. `mg/DESIGN.md`, commit a56e7d48b; the handover updated, 14d489e49. The probe worker launched on the two mechanisms the design rests on.

2. **07:38 to 07:50, the probes.** y01: a template-written free identifier naming a typed host function reaches `rows`' arrow-typed overload. y02, y03: a typed lambda written whole by one template works and dispatches by its arrow type. y04: a binder in one template and its reference in another never meet, `Variable w is not defined.` at the grammar api's line 1. One constraint found on the way: a host `Expr` gap followed by `⋄` never matches, because `⋄` is Fortress's DIAMOND operator. Commit 2b7d71736; ledger rows 284–285.

3. **07:50 to 09:05, the build, and the vocabulary review beside it.** The build worker wrote the grammar (73 rules, 124 name lines), the glue (11 declarations), the component and the check copy, ran the model twice, compared the whole forward pass against C4's lines inside one component (every intermediate maxdiff 0.0), and ran the check smoke to the end (40 of 40, 454 s). One real bug found: a template that writes the host caret drops its right operand silently, which made the mask `-10` instead of `-1E10` and every loss wrong from the seventh digit; fixed by a one-line `pow` in the glue. Meanwhile Pavol asked whether C4's vocabulary was "Scala written in Fortress" and asked for a Fable worker: its report separates 10 habits and 19 narrow shapes from 11 irreducible declarations, with 24 probes, a `FlatArrays2` sketch of 28 declarations that passes the same smoke, two measured non-habits (the library's row slice at 5×, a diagonal as a matrix view at 13–54×), and nine candidate gap rows. Commits 0fae5a3f8, b66820e46 (snapshots), 88467851c (the build).

4. **09:05 to 09:12, the build's end and Pavol's inventory.** The build worker's completion notice never arrived; a stop from the iOS client ended it after its last files were on disk. Pavol asked for an inventory of what was running: nothing was. The component reviewed against the design's table: line for line, with the departures the worker recorded (`ravel` generic in the element type, `gatherV`, `pow`, `tally`). Rows 286–287 entered (the caret; rule order inside a nonterminal against inside a bracket, with ledger row 65 met again). Commit e4811edee.

5. **09:13 to 09:36, the recorded runs.** Pool size 1: 40 of 40, 439 s; pool size 4: 40 of 40, 254 s; values identical across pool sizes. Against C4's 528 s and 263 s on the same host the focused base is not slower at either pool size, and faster at pool size 1 by more than run-to-run noise usually is, so a second C4 sample was taken: C4SECOND s. The cost section, the ladder row 4b, the handover written while it ran.

6. **09:36 to 09:40, the close.** This record; tasks closed. Open for Pavol: whether to swap `FlatArrays2` in as the focused base's backend (one import line and the two check runs), and the ledger review he has named as the next major step, into which the nine vocabulary rows go.

## Dead ends

| attempt | why it was dropped | evidence |
|---|---|---|
| the design's `s^t` in a template | the caret's right operand is dropped silently; `pow` glue instead | `mg/checks/model_run.out.1`, ledger row 286 |
| `ravel` as two declarations over `ZZ32` and `RR64` matrices | refused at load: generic parameters must exclude; one declaration generic in `T extends Number` | `mg/checks/model_run.out.0` |
| `⋄` between two host `Expr` gaps in a probe rule | `⋄` is the host's DIAMOND operator; the gap swallows it | `probes-4b/y01_named.out.0`, `.out.1`, ledger row 284 |
| four grammar shapes for the fold rule | the failure was ledger row 65 (a bare macro bracket as a juxtaposed argument), not the grammar | `probes-4b/y06_fold.out.0` |
| the vocabulary review's ring route (`×` inherited by declaring a carrier in the multiplicative ring) | accepted unchecked, turns the product elementwise, breaks the inherited `+` | `run-c4/probes/vocabulary/` v02, v02b |
| the library's row slice and a `Diag` as a `Matrix` view | correct and 5× and 13–54× slower | v20, v07 |

## Delegations

| # | task as briefed | model | tokens | what came back |
|---|---|---|---|---|
| 1 | the two mechanisms (named function through a template; typed lambda written whole) and the negative control | opus | 126,352 | `probes-4b/y01–y04`, `PROBES.md`, one constraint found |
| 2 | the focused grammar, glue, component, check copy, model run, smoke; report draft | opus | not summed (no notice) | `mg/` whole; `NOTES-worker.md`; `REPORT.md` draft; y05, y06 |
| 3 | is C4's vocabulary forced or habit, with probes and a sketch | fable | 302,214 | `run-c4/probes/vocabulary/REPORT.md`, `FlatArrays2.fsi/.fss`, 24 probes, nine candidate rows |

## Delegation and its cost

Three workers, about 430k tokens counted plus the build's uncounted transcript, against the main thread's 6.1e4 output tokens per message. The probes paid for themselves in the first hour: the design was written on the ledger's rows and the probes confirmed both mechanisms before a grammar line was written, and the one thing the probes did not cover, a host caret inside a template, is the one bug the build met. The build worker's forward-pass diff against C4 inside one component (`diag_fwd.fss`) was its own idea and is the strongest evidence in the rung. The Fable worker answered a question the Opus workers would not have asked of themselves: it tried the trait-based forms rather than assuming they fail, and measured the two that work but cost. The stop-button loss of the build's notice cost nothing but a status check.

## Gaps found

`apl/gaps.md` rows 95–98, entered as ledger 284–287 the same day; nine candidate rows in the vocabulary review, not yet entered (they belong to the ledger review's merge pass, with their reproducers re-run).

## Findings

The calling convention was the whole cost. With the frame stack gone, the sub-language's expansion is C4's program and it costs what C4 costs; at pool size 4 the universal base's 1.49× became 0.97×, at pool size 1 its 1.12× became RATIO1. What made the rewrite possible was not a new mechanism but a narrower subset: the program never nests a dfn, never passes a glyph as a value, and its two inline functions have tacit spellings in the source, so nothing it needs crosses a rule boundary untyped. What the rewrite could not have done is keep dfn bodies: the ledger's row 204 says a rule can never name the argument for the programmer, and the specification has no placeholder expression that would let `⍵` be nameless; Fortress's only function form names its parameter. The vocabulary review is the second finding: Fortress gives the trait inheritance it promises to the types that declare it, the library's own arrays get `+` and `-` for free, and everything else in C4's vocabulary is hand-written because the shipped library has no `×` on arrays by design, no algebraic trait at rank 3, no scalar extension, no reshape, gather, outer product or ravel, and never shipped the algebraic-constraints library the specification describes. Ten of the forty declarations are habits and nineteen are narrower than the language would say; the habits are the specialisations, and the reviewers' verdict of Phase 2 holds again.
