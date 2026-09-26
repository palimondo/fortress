<!-- The working plan. First written 2026-09-17 by the coordinating session on Pavol's request for a plan that can be followed, as the actionable form of map/README.md §5. Rewritten 2026-09-26 by a delegated worker (W4) from the plan Pavol approved that day, "Yes, this order and workers are go." (coordinator/POSITIONS.md, 2026-09-26, the plan; the coordinator's page https://claude.ai/artifact/3CKVcCdTRC5SJA2hz5Fk5C), which was built from the inventory coordinator/open-items-2026-09-26.md. The inventory cites a source for every line; the references in brackets below point into it (its items 1-36, its section B1's steps, its section C). The rule for every edit, the testing techniques and the stop conditions are kept from the plan of 2026-09-17, with what has changed marked; the last section says what the new order replaces. Sizes are in batches and rungs, never days. -->

# Plan: microGPT compiled on the JVM

The order Pavol approved on 2026-09-26 (`coordinator/POSITIONS.md`, 2026-09-26, the plan). The evidence under it is the inventory `coordinator/open-items-2026-09-26.md`.

## Where we stand, 2026-09-26

- **Runs.** microGPT runs under walk. Both check programs pass 40 of 40 from an empty cache (inventory B3).
- **Stops.** On the compiled path, all 18 of microGPT's components stop at name resolution. The compiler's own library has no `Array`, `Char`, `ImmutableArray` or `Vector`. This has not moved since the baseline, and it is expected: the fix is the switch-over, not new names in the compiler's library (inventory B3).
- **Decided.** One library, the interpreter's, becomes the library the compiler checks (09-21). The exclusion rule is kept and the number tower flattened, with walk taught coercion first (route A, 09-24). Sizes get a descriptor at run time (design B, 09-24). The array design comes after the switch-over.
- **Landed.** Batches 1 to 4. Batch 4 taught walk coercion, taught the compiled checker `nat` and `int` sizes, and fixed the `ZZ32` shift count. The checker reports 125 errors on the interpreter's library (`compile-ladder/climb-batch-4/RECORD.md`).
- **Decided, not built.** The specification rung S (S1 and S2 answered on 09-26); the wrapping operators ∔ ∸ ⨰, then rung O's overflow check; the run-time size rung; the flattening.

## The principle for the batches

Every batch lands with the specification, the library and both paths agreeing. So the work is grouped by what has to change together, not split finer.

Two rules of the batch machinery shape the order: two rungs in one batch may not change the same declaration, and a rung cannot build on another rung of its own batch, since every rung branches from the batch's base (`coordinator/climb-batch-workflow.js:370`, batch rule 1). That is why the wrapping operators and the flattening sit in different batches, and why rung O's check follows the operators.

## The phases

### Phase 1. Batch 5: what is decided and shares nothing

- The wrapping operators ∔ ∸ ⨰ declared in the interpreter's library. The library bodies and the five team tests that rely on wrapping are rewritten with them. No output changes (inventory B1 step 13; POSITIONS 2026-09-26, rung O).
- Rung S: the specification revised for route A, except the number chapters. Everything it describes already runs on both paths (inventory B1 step 10; POSITIONS 2026-09-26, S1, S2 and the number chapters).
- The run-time size rung (design B): a sized program compiles, loads and dispatches on its size. Row 402's size case in the exclusion rule can land at its gather (inventory B1 step 12; POSITIONS 2026-09-24, design B).

Needs answers 1 to 5 below.

### Phase 2. Batch 6: the tower flips, the specification with it

- The flattening rung. `ZZ`, `QQ` and `RR64` become siblings under `Number`, a wider type converts from a narrower one by `coerce`, and `SUM`'s catch-all is replaced (inventory B1 step 9; POSITIONS 2026-09-24, route A).
- The three number chapters of the specification, in the same batch (POSITIONS 2026-09-26, the number chapters).
- Rung O: the ten natives raise `IntegerOverflow`, with the count of changed tests measured again and expected at zero (inventory B1 step 13).

Needs answers 6 to 8. By inference, the checker count after it is about 44, not the 22 on record, because rung N uncovered 22 `fill` errors the flattening does not touch (inventory B2, C10).

What batch 6's brief must carry beyond the above (added 2026-09-26, after batch 5 landed):

- Answer 7 (POSITIONS 2026-09-26, answer 7): one generic sum and one generic product reduction over the algebra bounds, the identity chosen from the static argument by the `() -> T` witness `typecase` over all eight leaves. The two approved C4 diffs, together so the goldens are measured once: `MicroGptFlat.fss:43` becomes `SUM[\ZZ32\][j <- 0#i] matCount(j)`, and `:28`'s `BIG MAX[t <- z] t` becomes `BIG MAX z`. With them `FlatArrays.fss:181`, five check-program lines, the APL program's same lines, 11 library sites, 32 test lines (flagged as edits to the team's tests) and the S1-form note at `reductions.tex:23-25`. Its three defects are already ledger rows 424-426, not reopened at the gather.
- The three `Number`-typed big operators `BIG MAXN`, `BIG MINN` and `BIG MINMAXN` dropped in the flattening rung, with their reduction objects, fusion pairs and `distribute` overloads, api and component, and one line in the brief saying why (POSITIONS 2026-09-26; `reviews/max-min-identities-judgement.md` § 4). The gather records the drop on row 423.
- From the max-min judgement's § 5, on answer 7: the nine lines `Generator2Test.fss:58-60`, `:66-68`, `:74-76` (`BIG MAX[\Number\]` and `SUM[\Number\]` over a `Number[10]` array, `:53`) break on the flat tower and are on no list yet, so the array's element type changes with them, flagged like the 32; the witness `typecase` lists each leaf before any of its supertypes, narrowest first, `ZZ` and `QQ` before `RR64`, so the rung's copy is right even on the nested tower (a first commit, a bisect); C4's `BIG MAX z` is still unmeasured under walk (it rests on `RR64` being a `StandardMax[\RR64\]` on the flat tower, by reading), and the rung's gate is where it shows.
- Answer 6: the subtype lists of `basic-lib/numbers.tex` and `basic-lib/basic-integers.tex` rewritten as the library's run-time check methods (`check`/`check_star`, returning `Maybe`); `advanced-lib/numbers-advanced.tex` kept word for word and marked superseded in the S1 form, the original design recorded, pointing to worklist item 12 and row 404; no library or compiler work (POSITIONS 2026-09-26, answer 6).
- Answer 8: each wider integer type declares a `coerce` from each narrower one, and `ZZ32` and integer literals coerce into `RR64`; `ZZ64` into `RR64` stays explicit; a generic call or range over mixed widths writes its static argument until row 388's fix in phase 3; no model line changes (POSITIONS 2026-09-26, answer 8).
- Answer 10: `fill` redeclared in the leaf array traits, and its function form renamed `tabulate` (about 30 library call sites, 11 test lines, the function row of the specification's arrays figure, 12 vocabulary lines). It lands beside the flattening if the two share no declaration, else in phase 3 (POSITIONS 2026-09-26, answer 10).
- Astra's checks (POSITIONS 2026-09-26, the entry on Astra's review): the generic `Vector`/`Matrix` bodies checked per operation's required capability, with no blanket ring bound that would exclude integer arrays; the `SUM` replacement accepted on the empty sum's type as well as its value; a tiny `PView`/transpose product with its controls.
- The D follow-up (POSITIONS 2026-09-26, rung D's stop): rung D lands on `main` as a follow-up to batch 5, one worker applying `wip/rung-wrap-operators`, gating once and pushing if green. Rung O builds on D's operators, so the brief states whether D has landed. D's provisional rows 405 and 407 are already rows 427 (`HeapShakedown`) and 428 (`QQ`'s `opr <`), and its unary ∔ candidate is row 429, so D's landing opens only its provisional 406, the message order. Row 428's `XXX` walk test is owed no later than rung O. Rows 416 and 418 owe their `XXX` walk tests to whichever rung owns `ProjectFortress/tests/`.
- The rule for run-to-run output differences (POSITIONS 2026-09-26, rung D's stop): an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is not a stop; it is a ledger row. With it, the judge's advice for the flattening's and rung O's comparisons: list `XXXInheritedOverload` among the unstable files, citing D's order row (`compile-ladder/rung-wrap-operators/JUDGE.md` section 6).

### Phase 3. The checker at a true zero

- The count cannot see the whole distance. The `FortressLibrary` api stops at its first errors, and behind them waited 203 more (measured 09-22, 72 after cheap fixes). The library's component is never checked. The compile path's own setting that gives every static parameter `extends Object` added 712 errors. Overload dispatch generation did not finish on this library (inventory B2; FACTS § The checker and the one library).
- The largest open fork is the specification's sentence that overloads may not differ in static parameters. It covers 35 errors and rows 398 and 400, and route A does not decide it. It touches the specification, the interpreter and the compiler, so it goes through the clean list and a top-tier judgement (inventory item 10; protocol § 6).
- Also: the `fill` pairs (22 visible, 77 hidden); 32 Meet Rule errors that need a checker change; the `Condition[\()\]` site; rung N's decision 3 and the dead sizes (inventory B1 step 11, items 11 and 12).

Needs answers 9 to 12, and a measurement first (W1 below).

### Phase 4. The switch-over

- The natives: 29 of walk's 108 bindings with no compiler helper written, and the 231 of `FortressBuiltin` matched to existing helpers. Re-approval row 41 (an api whose component has another name fails to link) becomes live work here (inventory item 13).
- The names: the compiled path reads the interpreter's library, and the compiler's three prelude files are deleted with their tests kept. At least 48 compiler tests are respelled, the reversed wrap spellings of row 348 among them, and rows 381 and 383 close (inventory B1 step 15).

Not yet designed as briefs. The record's shape is at least two batches (`coordinator/library-route-judgement.md:37`).

### Phase 5. microGPT compiles

- The model's static types (decision D). As written today, nothing in microGPT passes the checker whatever the storage, because its arrays are unsized in its types (inventory B1 step 17; `reviews/array-design-review.md:13`).
- The array design: row 40's three questions, the element width (`RR32` or `RR64`), and what puts `double[]` under the sized traits (decision A) (inventory B1 step 18, items 15 and 16).
- Code-generation holes, by reading: C4's `step` declares two local functions (row 304), and the APL base has a `typecase` (row 340). The 37 microGPT sites that reach `Number`'s catch-alls get re-measured (inventory B1 step 19, B2).

### Phase 6. microGPT fast

- Unboxed arithmetic chosen by static type in generated code (decision B). On array code boxing costs 6.3 to 6.5 times (inventory B1 step 18; FACTS § Execution model).
- Timing against a pure-Java microGPT, which is not written yet; then compiled parallelism (inventory B1 steps 20 and 21).

## Pavol's answers, in the order they are needed

One per message, as usual. Each has its recommendation or the default on record.

Before batch 5:

1. What S's citations call the unrevised copy. `Specification-1.0-frozen/` holds the 2011 working draft, not 1.0. The proposal comes with the ask: name it by what it is, the 2011 draft, with its path (inventory item 1). Answered 2026-09-26, "Option 1, agreed.": "the Working Draft of February 2011", each citation with its path and line in `Specification-1.0-frozen/`, which stays untouched (POSITIONS 2026-09-26, the first of the batch-5 answers).
2. Do sizes and boolean arguments count in the exclusion rule? The Fable judgement: yes, every static argument except operator arguments; the checker's fix (row 402) lands with the run-time size rung (inventory item 2).
3. Is the 2012 `covariant` keyword mentioned in the specification's text? Default: no, the decision record only (inventory item 3).
4. Loader or factory for a size's descriptor. Both give the same answers on nine programs. The worker's reading: the factory, since a size made at run time gets its descriptor directly (inventory item 7).
5. Do `NN32` and `NN64` stop wrapping under walk too? Row 379's natives do not cover them, and `UnsignedTest` relies on the wrap. No default on record; it decides how far the wrapping rung reaches (inventory item 8).

Before batch 6:

6. Does `RationalQuantity` survive as the specification's design for sign-refined rationals? The library never had it. No default (inventory item 4).
7. The replacement for `SUM`'s and `PROD`'s catch-all on `Number`, shown as a diff if it touches C4. On record: an empty sum of 0; the choice among the three shapes is open (inventory item 5).
8. Mixed-width ranges and real widening. What `lo:hi` infers over mixed widths, and which outputs change when a binding really widens. No default (inventory item 6).

Before the switch-over:

9. The overload sentence (`Specification/basic/overloading.tex:100-107`): drop it as both implementations have, or restructure the library. It goes through a clean list (W2) and a top-tier judgement, with his yes for Fable (inventory item 10).
10. The `fill` pairs. A clean list first (W3). One way is measured, renaming the function-taking `fill`, but it touches 23 calls in C4 and the APL base (inventory B1 step 11).
11. The count as the switch-over's measure. It became report-only on 09-23 without his yes, and it cannot see the whole distance. Proposal: keep reporting it, and measure the full distance separately (W1) (inventory item 14, C11).
12. Rung N's decision 3 (a size left unknown at a call is refused there), the dead sizes' diff (25 api declarations), and row 41 (the linker lookup). Rung N's reading is the default; the other two come with the switch-over's design (inventory items 11, 12 and 13).

After the switch-over:

13. The array questions and the element width. Through the clean-list method, the library's own way first (his ruling on row 40, POSITIONS 2026-09-25) (inventory items 15 and 16).

## Work that can start now, with no decision

Evidence only. Nothing lands on `main` except notes and record fixes. Each is one Opus worker, about 0.4M tokens by the inventory worker's cost. The four went out on 2026-09-26 with the plan's yes (POSITIONS 2026-09-26, the plan).

- **W1. The true distance to the switch-over.** Count everything the gate cannot see on today's tree: behind the api's early return, the library's component, and both desugaring settings. Re-run desugaring and code generation once, and time the dispatch generator. Shadow copies only.
- **W2. The clean list for the overload sentence.** Every way the language and the library offer, the library's way first, by a worker that has not read our notes.
- **W3. The clean list for the `fill` pairs.** The same method, with what each way changes in the library, the tests and C4.
- **W4. Record repairs.** The inventory found twelve stale spots (inventory C), among them the handover's "what comes next", four FACTS lines, ledger rows 348 and 403, and the re-approval table. `PLAN.md` is rewritten from the page once he says yes to it: this file.

## Off the path, parked

None of these blocks a batch or the switch-over. The default is to park each until it becomes relevant, and to bring it to Pavol then. His unanswered re-approval rows are here: none of them takes priority, except row 41, which joins the switch-over's design.

- Re-approval rows 42, 44, 45, 46 and 48, and the ledger homes 374 to 377 (inventory items 17-22).
- Row 331's bare `Nothing` re-gated on type inference (the judgement proposes it), and the judgement's candidate rows 2, 3 and 5 (it says yes to each) (inventory items 24 and 25).
- Row 360, a numeral within half an ulp of a tie, which rounds as its nearest double on both paths (inventory item 23).
- Rung C's two reported points: route A's price is wider than first put to him, and the judge's scope for tuple coercions (inventory item 35).
- The closure accommodation he approved on 09-21, which the flattening makes moot (inventory C8).
- Workflow option (b), the review's second script change, and the test-name comparison in the gate (inventory items 26-28).
- The root README's line on `Specification-1.0-frozen/`, the lineage cleanup, and the inventory's move list (inventory items 30-32).
- A ledger row for code generation refusing any declaration with a `where` clause; a section for the cost rows (inventory items 33 and 34).
- Housekeeping: the remote `wip/` branches, the scratchpad sweep, the GitHub-issues plan, the cleaner pass of `main`, the skill-extraction session (inventory items 29 and 36).

## The rule for every edit under the sealed tree (kept from 2026-09-17)

Test first: a program that fails today is added to the compiler's own corpus (`ProjectFortress/library_tests/` for library rungs, `ProjectFortress/compiler_tests/` for checker and codegen rungs; a `.fss` that prints `PASS` plus a `.test` file naming `link`, `run`, `run_out_contains=PASS`, the format of `library_tests/Boolean.test` except for its check line: `run_out_WIcontains`, which that file writes, is not implemented by the harness and silently falls back to the default check (FACTS, R1 of the repair batch, `FileTests.java:147`; corrected 2026-09-19).
- Changed since: the harness implements `run_out_WIcontains` as whitespace-insensitive containment since `a0fcf0a96` (2026-09-19; `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:155-163`; FACTS § The harness and the gate), so `Boolean.test`'s format holds whole.
- Changed since: a rung on walk's side adds its test to the interpreter corpus, `ProjectFortress/tests/`, where a file named `XXX*` is a gated expected failure (FACTS § The harness and the gate), as climb batch 4's rung C did. The discipline is Pavol's of 2026-09-17: the test is written and seen failing before the fix, and stays in the corpus (POSITIONS 2026-09-17); every measured and repaired defect gets a gated assertion, a deferred one the specification settles an `XXX` test (POSITIONS 2026-09-19).

Then the edit, as small as the test needs.

Then the check: the new test passes; `ant compileAll` (only when Java or Scala changed), `ant testFast`, `ant testSystem` stay green; the ladder subset that stopped on this rung's name is re-run and moves up with nothing moving down.
- Changed since: in a batch the gate runs once on the merged tree: `compileAll`, `testFast`, `testSystem`, the four-thread `atomic` runs, the ladder regression over `compile-ladder/baseline-2026-09-19/pass-list.txt`, and the checker count, reported and never red on its own (`coordinator/climb-batch-workflow.md`; FACTS § The harness and the gate, § The checker and the one library).

Then one commit: the edit, the test, the FACTS line, the handover state line, and a note on the ledger row it closes (rows are never renumbered; a closed row gets "fixed <commit>" appended to its notes). Footer as in `protocol.md`. Push the branch and fast-forward main.
- Changed since: in a batch each rung lands as one commit composed at the gather from its branch's net change, and the batch record names each (`compile-ladder/climb-batch-*/RECORD.md`); pushes follow protocol § 4, and a worker commits its own files as it goes (protocol § 5, 2026-09-26).

Shadow first when the edit is in Java or Scala and the outcome is uncertain (`perf-probes/template-check/run-all.sh` is the recipe); library edits need no shadow, `fortress compile` reads the `.fss` directly. A fork a probe can settle is probed before the batch is briefed (POSITIONS 2026-09-22).

## Testing techniques adopted, decided 2026-09-17 (kept)

One corpus, both backends: the interpreter tests (`ProjectFortress/tests/`, 381 programs then, one `assert` per operator where it matters) are the ladder for the compiler path; the ladder driver in `explorations/compile-ladder/` runs them unchanged through `fortress compile` and `run` and records the phase each reaches. Progress is the count that passes. Kotlin's box tests are the model. Since 2026-09-19 the ladder is a gate stage over the measured pass list, 85 of 410 files at batch 4's gate (inventory B1 step 2; FACTS § The harness and the gate).

Golden output where a value matters: a run test may carry a `run_out_equals` expectation (the harness already supports it, `FileTests.java:140-271`) instead of only "contains PASS". Scala's `.check` files are the model. Applied per test, not retrofitted.

Tiers named: positive (compiles and runs), negative (`XXX` prefix, `compile_err_equals`), conformance (`SpecData/examples/`, 133 spec programs, today outside the gate). `ant testSpecData` joins the gate when its red count is known.

Not adopted: rewriting the harness on lit and FileCheck, inline diagnostic annotations. Cost without gain on the path.

## Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept)

Any source in the tree may be edited under the rule above; which file it is in is not a decision. What stops the climb: a design fork (the array representation, boxed against `double[]`/`int[]`; the library route, the interpreter's library as prelude against growing the compiler library beyond what one rung needs; any change of semantics against the spec; deleting a test to get green); a rung's gate red twice after one repair (revert, record, continue with the next name); disk under 500 MB after sweeping `/tmp/fortress*rats`, `ProjectFortress/test-tmp` and `ProjectFortress/test-caches`; a permission denied.
- Changed since: the two forks named are decided. The storage is `double[]`, unboxed, with the `nat` sizes (POSITIONS 2026-09-19), and the array design's remaining questions come after the switch-over (POSITIONS 2026-09-22, 2026-09-25 on row 40). The library route is one library, the interpreter's (POSITIONS 2026-09-21).
- Changed since: on a red gate over a merged batch, Pavol's rule of 2026-09-17 applies: the source of the conflict is found holistically and that part is reworked in the merged batch, and dropping a rung is taken only when its approach is wrong, not its code (POSITIONS 2026-09-17; `coordinator/climb-batch-workflow.js:645`). What reaches him are the forks already reserved, not new ones invented at the point of difficulty (POSITIONS 2026-09-17). A batch's own stops are in its manifest (`coordinator/CLIMB-BATCH-*.md`).

## What the order of 2026-09-26 replaces

The steps of 2026-09-17, and what became of each:
- Step 0, tag `sealed-tree` at `75cca6683`: done.
- Step 1, the ladder baseline (`explorations/compile-ladder/REPORT.md`), marked "running": done; its pass list is the ladder-regression stage's baseline (`compile-ladder/baseline-2026-09-19/pass-list.txt`).
- Step 2, the two one-line runtime defects (rows 302, 303): done at `53362cb88` (FACTS § Execution model).
- Step 3, the climb of library rungs in `Library/CompilerLibrary.fss` or `LibraryBuiltin/CompilerBuiltin.fss`, and its batch 1: stopped for prelude names by the one-library decision of 2026-09-21, while code-generator rungs continue (POSITIONS 2026-09-21). Climb batches 1 to 4 landed; their records are under `compile-ladder/`.
- Step 4, `nat` static parameters in the checker: done for `nat` and `int` by rung N of climb batch 4 (`3f297441c`); `bool`, `dim` and `unit` are refused by name and row 307 stays open for them (FACTS § The checker and the one library). The run-time half is phase 1's run-time size rung.
- Step 5, the array types and the algebra above `Number` with the representation decided up front: replaced. The array types reach the compiled path with the interpreter's library at the switch-over (phase 4), and the array design is phase 5 (POSITIONS 2026-09-22, 2026-09-25; inventory C3).
- Step 6, the codegen holes the program hits: phase 5.
- Step 7, the kernels and C4 compiled and run, the differential check against the interpreter, the timing against the Java baseline: phases 5 and 6.
- "Steps 3 and 4 are therefore one climb", with rung 1 as the `Equality` knot: the eight-rung climb it describes ran on 2026-09-17 (`compile-ladder/CLIMB.md`), and the work has gone in batches since, run by `coordinator/climb-batch-workflow.js`.

Also replaced:
- The paragraph of 2026-09-21, "The order and the first step's shape are put to Pavol as a plan after the exclusion trace (`perf-probes/prelude/exclusion-trace.md`) lands": this plan is that plan (inventory C3).
- The territory map's order (`map/README.md` § 5, 2026-09-16), of which the plan of 2026-09-17 was the actionable form. The map predates the one-library decision: its step 2's two routes were decided on 2026-09-21, walk's coercion, "not on the path" there, landed as route A's first rung (`b628871a2`), and its step 4 opens on rows 302 and 303, fixed at `53362cb88` (inventory C4).
- The step order of `coordinator/library-route-judgement.md` § 2, whose destination Pavol took on 2026-09-21: it puts decision D's diff "as soon as step 3 lands and before any array rung" (`:39`); decision D is phase 5, after the switch-over (POSITIONS 2026-09-22; inventory C9).

Refused rungs: rung 1, `Equality`, 2026-09-17, under the old boundary: recorded in `compile-ladder/rung1/REPORT.md`; re-opened under the widened rule and landed the same day (`1bd8d3ad1`).
