<!-- The one deliverable of the post-mortem of 2026-09-19, written 2026-09-20 after climb batch 2
landed. Pavol's brief: "the goal of this post-mortem really is just to find out what were the open
decisions that were really something I needed to take, but in the end the model has, without
authorization, taken the initiative and made some decisions on its own without my approval. So I
want to be fully aware of those decisions and re-approve them post hoc or revert them if I deem it
necessary." Nothing here is reverted or defended; it is a docket. -->

# Decisions taken without Pavol's approval, 2026-09-19 06:38 UTC .. 2026-09-20 10:43 UTC

A row is here when the decision is **his** by his own standard — a goal or direction of the
project, the model's text, the standard library, anything under the sealed tree, what lands on
`main`, what the measuring stick is — and **no explicit yes from him preceded it**. The
coordinator's process and housekeeping decisions are not his and are not listed; the
classification of every item in every list the coordinator put in front of him is
`decision-lists.md`, which counts 45 of 90 items as the coordinator's own.

Not here, because they are still open rather than taken: row 321 (what an object with no
`asString` prints), row 342 (the interpreter caches a component before the overload check), which
of microGPT's other invented families move into the library, and the three unruled questions of
`array-design.md` §6 — except that letting the last stand as defaults is itself row 17 below.

| when (UTC) | what was decided | who took it | where it is recorded | reverting would take |
|---|---|---|---|---|
| 09-19 10:37 | `floor` and `ceiling` on `RR64`/`RR32` return a float, where `basic-lib/numbers.tex:457-462` returns an integer | rung F of climb batch 1 | `b70ed4590`, ledger row 330, `compile-ladder/rung-rr64-functions/record.md` | two return types in the prelude, and the `⌊…⌋`/`⌈…⌉` operators that follow them |
| 09-19 10:37 | `round` on a float sends an exact half to even, so the two paths disagree at 2.5 and the interpreter is the one declared wrong | rung F | `b70ed4590`, ledger row 329 | one native body, or an erratum against the interpreter |
| 09-19 10:43 | `Maybe`'s empty case is spelled as the specification spells it, which makes the interpreter corpus's `Nothing[\T\]` a static error in the compiled world | rung M of climb batch 1 | `6823d52b6`, ledger row 331, `compile-ladder/rung-maybe/record.md` | rename one prelude object and its api line |
| 09-19 10:43 | row 321's unrepaired `asString` divergence is extended to a second member-less prelude object, deliberately not patched | rung M | `6823d52b6`, `rung-maybe/record.md:36` (append to row 321) | nothing to undo; the decision was to widen a known gap |
| 09-19 10:46 | `LSHIFT`/`RSHIFT` mask the shift count, so any count outside `0..31`/`0..63` answers differently from the interpreter, which saturates | rung N of climb batch 1 | `d928b9a54`, ledger row 335, `compile-ladder/rung-integral-ops/record.md` | two prelude bodies |
| 09-19 10:46 | `GCD`/`LCM` are nonnegative per the specification, so the interpreter's negative answers become the divergence | rung N | `d928b9a54`, ledger row 334 | two prelude bodies |
| 09-19 10:46 | the divisor `-1` is guarded in the two `REM` bodies rather than in the six native methods that overflow on it | batch 1's judge, on the rung's refusal | `d928b9a54`, `rung-integral-ops/REPORT.md` | move the guard into `nativeHelpers` |
| 09-19 11:33 | two divergences the specification settles against the compiled path land unrepaired: `0 DIV -1`, `\|0\|` and `-0` throw `IntegerOverflow` where the answer is `0`, on `ZZ32` and `ZZ64` | the coordinator, at batch 1's gather | `261fedd71`, ledger row 333 | a `.java` rung against six native methods |
| 09-19 14:56 | `floor`/`ceiling` keep the float result and row 330 becomes a note rather than a decision he takes | the coordinator, in a list he said he had not read | `24a7da450`, POSITIONS 2026-09-19 | re-open row 330 as his |
| 09-19 15:13 | `Maybe` stays as landed, settled by the coordinator on evidence (the checker cannot infer a bare generic object's static argument) instead of by his preference | the coordinator | `e0504b3c3`, `compiler-probes/maybe-inference/` | re-open row 331 as his |
| 09-19 20:24 | the library's scalar-extension block is generalised over `T extends Number` and lands under the sealed `Library/` — no explicit go, and the diff was never shown, against the standing order set seven hours earlier | the coordinator and the landing worker | `02d09a39f`, `run-c4/cold-cache/repair/`, `array-thread.md` §2.5 | revert one commit; C4 and the APL base then need `8590d7a9e` reverted with it |
| 09-19 20:24 | a reversed non-commutative operator gets its meaning: `y - x` on an array is elementwise `y - e`, a shape with no precedent anywhere in the library | the landing worker; named only afterwards, by the blinded review | `02d09a39f`, `reviews/library-scalar-extension-review.md:60-66` | four declarations in `FortressLibrary.fss` |
| 09-19 20:24 | the block returns the unsized `Array[\T,I\]`, so rank and size leave the static type — a departure from the `Vector`/`Matrix` precedent it cites | the landing worker; named only by the review | `02d09a39f`, `library-scalar-extension-review.md:66-72` | eight declarations, plus deciding whether sized overloads are added instead |
| 09-19 20:24 | `AnyIntegral comprises { ZZ }` closes the numeric tower's last open link, sealing what may ever sit below the integers and making the library's hand-written exclusions derivable | the landing worker | `02d09a39f`, `library-scalar-extension-review.md:239-268` | one clause in `FortressLibrary.fss`/`.fsi`; the scalar block then stops loading |
| 09-19 20:24 | `Array3 excludes AnyAdditiveGroup`: user operators over `Matrix`/`Array3` are chosen over a future rank-3 additive group. The review says this one is his and that the reason belongs in a comment | the landing worker | `02d09a39f`, `library-scalar-extension-review.md:396-409` | one clause; the choice itself is between two futures and cannot be had both ways |
| 09-19 20:39 | C4 and the APL base drop six scalar declarations and the diagonal product because the library now serves them — no go, no diff shown (both model files stay byte-identical) | the same worker | `8590d7a9e`, `array-work-brief.md` §3, `array-thread.md` §2.6 | revert one commit; only the vocabulary files move |
| 09-19 20:39 | the three questions of `array-design.md` he did not answer stand at the worker's defaults: native stores per element type under the library's generic objects, the nat carried as a field before the name-to-constant substitution, and a run-time-sized factory returning the unsized `Array` | the coordinator, by leaving them | `array-design.md` §6c-§6e, §8 | a ruling; no code exists yet for any of it |
| 09-20 07:32 | row 320 is repaired only in its mutable half; the class-name half is reclassified as the repository's missing api-to-component discovery step and gated as an expected failure instead of fixed | rung X of climb batch 2 | `4e4b80253`, `compile-ladder/rung-export-var/record.md` §Decisions | a `.java` rung on `Linker.whoIsImplementingMyAPI` or the reserved forwarder |
| 09-20 07:32 | a second gated test, `compiler_tests/XXXExportVarRungXFrozen`, is added to the original tree at the gather stage, outside any rung's approved brief, to pin a refusal the widened check must not lose | the gather stage | `4e4b80253`, gather's `correctionsClosed` | delete two files |
| 09-20 07:46 | `narrow` out of range throws `IntegerOverflow` rather than truncating as the interpreter does, which makes the shipped `tests/UnsignedTest.fss:210-211` unpassable on the compiled path | rung W of climb batch 2 | `d98024425`, ledger row 346, `compile-ladder/rung-int-conversions/record.md:23` | one prelude body (`jLongWrappingToUnsignedInt` is imported and unused) |
| 09-20 07:56 | a team-commented object is revived: `TryAtomicFailure` goes live in `CompilerLibrary`, and with it `TryAtomicFailure` becomes an unusable spelling for a user declaration in any compiled component | rung B of climb batch 2 | `4ed46558d`, `compile-ladder/rung-tryatomic/record.md`, ledger row 262 as the authority | re-comment two declarations; the gated test goes with them |
| 09-20 08:15 | rung X's provisional row 344 is refuted at the gather and replaced by row 343, and row 347 is re-classified as having a gated home after all — the ledger's claims about what the specification requires change without him | the gather stage | `162beaecc`, gather's `notLandedFolded`/`recommendedRows` | re-open 344 and re-state 347 |
| 09-20 08:43 | two specification-settled divergences land unrepaired as ledger rows rather than being fixed: row 353 (`tryatomic` has no codegen at all) and row 352 (the throws-clause static check performed on neither path) | the review's judge | `fd6ad55c6`, repair `a27e27ef0`, `compile-ladder/climb-batch-2/JUDGE-review.md` | a `.java` rung for `forTryAtomicExpr`; row 352 has no gated shape at all |
| 09-20 10:03 | the gate's own criterion changes: the four `testSystem` shards are compared by their sum instead of one by one, and the stronger test-name comparison is deferred | the gate's judge | `a3dcd1a5b`, `JUDGE-gate.md`, script change in `c766f6cc5` | restore the per-shard comparison in `coordinator/climb-batch-workflow.js` |
| 09-20 10:14 | this run's own gate summary lands as the comparand for its own second gate run, replacing the independent `gate-baseline` reference | the gate's repair | `c766f6cc5`, `compile-ladder/climb-batch-2/gate/summary.txt` | restore `gate-baseline/summary.txt` as the comparand and re-derive it |

Twenty-five rows. Six touch the standard library or the model's own vocabulary (`02d09a39f`, the
four decisions inside it, and `8590d7a9e`). Nine are language semantics a rung chose under a
silent or contradicted specification (rows 329, 330, 331, 334, 335, 346; the `REM` guard's place;
the revived `TryAtomicFailure` name; row 320 repaired in half). Three are divergences the
specification settles and that land unrepaired anyway (row 333, rows 352 and 353, and row 321's
widened reach). Four are what the measuring stick is, what the record asserts, or what lands on
`main` outside a brief. Three are decisions of his that the coordinator closed on evidence or let
stand as a worker's default.

The two largest clusters have one shape in common: a decision was reachable only by reading a
rung's `record.md` or a review written afterwards, and the paragraph that reported it to him
named the repair, not the choice.

## Decisions taken by Pavol, 2026-09-21

- The four rows of `02d09a39f` dated 09-19 20:24 other than the closure — the scalar-extension block generalised over `T extends Number`, the meaning of `y - x`, the unsized result type, and `Array3 excludes AnyAdditiveGroup` — are **approved** as landed, together with the `AnyAdditiveGroup` marker trait, which had no row of its own ("Others approved", after the three changes were explained one by one with the blinded review's verdicts). The explainer's comments (what `s - a` means; why `Array3` carries the clause) still go in.
- The closure row (`AnyIntegral comprises { ZZ }`) is **held** until the exclusion trace lands (`perf-probes/prelude/exclusion-trace.md`): the team's own pattern for a level whose only extender is a generic trait is an open level, a `NOT YET` comment and hand-written `excludes` (`FortressLibrary.fss:1294-1297`, `:1373`, `:1587-1589`); whether that pattern carries the float operators is what the trace measures. A `NOT YET`-style comment at the line goes in either way.
- Later the same day, after the exclusion trace landed (`859780242`): the closure row is **approved** as landed too; the `NOT YET` comment and the checker's small accommodation go into the first library batch. All five rows of `02d09a39f` are closed.
- Rows 24 and 32 (`floor`/`ceiling` on floats, 09-19 10:37 and 14:56): **decided** by Pavol on 2026-09-21 for the specification's rule, ℤ for every spelling (POSITIONS 2026-09-21; ledger row 330 appended). Row 24's prelude lines are moot under one library; row 32's closing is reversed.
- Row 25 (`round` on an exact half, 09-19 10:37): **agreed** by Pavol on 2026-09-21, half to even on both paths, the interpreter's one-token fix as a gated rung; historical evidence requested first (`compile-ladder/rung-rr64-functions/round-history.md`).
- Rows 26 and 33 (`Maybe`'s empty case, 09-19 10:43 and 15:13): **decided** by Pavol on 2026-09-21 — the team's parametric `Nothing[\T\]` stays as the one library's spelling; rung M approved as landed; the specification's spelling is future work gated on `where` clauses (ledger row 331 appended). Row 25's history landed (`round-history.md`); the "agreed" stands.
- Row 27 (row 321's reach widened by rung M, 09-19 10:43): **closed** 2026-09-22 — rung M's restraint approved; the rendering decided per `reviews/default-rendering-judgement.md`: the bare Fortress type name on both paths; a rung in the first library batch.
- Row 28 (shifts) **decided** 2026-09-22 (ledger row 335 appended; the two-operation reading). Row 29 (`GCD`/`LCM`) **approved as recommended** 2026-09-22: rung N stands, the interpreter's natives fixed to match in batch 4's integer rung (ledger row 334).
- Row 31 (`0 DIV -1`, `|0|`, `-0`) **approved as recommended** 2026-09-22: the record stands; the six-guard fix with its test goes into batch 4's integer rung (ledger row 333).
- Row 43 (`narrow` out of range) **approved as recommended** 2026-09-22: truncation on both paths, rung W reversed on this point; batch 4's integer rung (ledger row 346).
- Row 30 (the divisor `-1` guarded in the two compiled `REM` bodies rather than in the six natives, 09-19 10:46): **approved as landed** 2026-09-24 ("Row 30 approve as landed"); the guard dies with the prelude at the switch-over (POSITIONS 2026-09-24).
- Row 39 (C4 and the APL base dropping seven vocabulary declarations, 09-19 20:39): **decided** 2026-09-24 — the six scalar drops approved as landed; the diagonal's specialised product restored, as an override of `mul` on `Diag extends Matrix` if the probe after the weekly reset passes, else as the old operator (POSITIONS 2026-09-24; ledger row 299 to be appended at the probe). **Closed** 2026-09-25: the probe passed at the first attempt in both vocabularies, the override landed, ledger row 299 appended (`run-c4/probes/vocabulary/diag-override.md`).
