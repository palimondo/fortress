# Climb batch 20: the gather's record

Written at the gather stage of climb batch 20 (2026-10-20), the run of `explorations/coordinator/CLIMB-BATCH-20.md` (rungs I and A), on `main` from the base `97ccd5f1f9f8ae69c2c9ff4f3dfca7c7fd102059`. `main` was at `56d084018` when the gather began, five coordinator commits above the base that touch only `explorations/coordinator/BOOT.md`, `HELD.md`, `INDEX.md`, `review-queue.md`, `process-engineering/task-list-archaeology.md` and `tools/sweep-tasks.py` (`git diff --name-only 97ccd5f1f 56d084018`), no file a rung touches. Both rungs were approved by their skeptics, with no contested fix, no judge and no repair round. No branch is a parent of anything on `main`, and each branch stays as it is.

**Preconditions.** `git status --porcelain` printed nothing, and `97ccd5f1f` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0).

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff 97ccd5f1f...<branch>`. One tree was seeded outside the main tree from the batch's base build, with `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base20 /home/user/fortress-gather20 - 97ccd5f1f9f8ae69c2c9ff4f3dfca7c7fd102059` ("seeded from /home/user/fortress-base20 (97ccd5f1f) in 4 s"); nothing was built or run in the main tree or in the base build. In `/home/user/fortress-gather20` the two patches were applied in the order below with `git apply --3way --index` (no conflict), then `ant compileAll` ("Caches /home/user/fortress-gather20/default_repository/caches started again, empty", "BUILD SUCCESSFUL", "Total time: 49 seconds") and the library order (five compiles, each `rc=0`, five jars in `default_repository/caches/bytecode_cache/`). The closing tests and the interaction check ran there. `diff <(git diff 97ccd5f1f HEAD -- ProjectFortress Library build.xml Specification) <(git -C /home/user/fortress-gather20 diff --cached 97ccd5f1f -- ProjectFortress Library build.xml Specification)`, run on `main` at `408910f26`, printed nothing: the code, tests and specification the tests ran on are `main`'s.

## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | I, `rung-integer-power` | `wip/rung-integer-power` at `981fd6fef` | `5ad4a9957` |
| 2 | A, `rung-array-sites` | `wip/rung-array-sites` at `f3858cf85` | `e487cec2d` (its net change), `444f37018` (its record and message) |
| | the rows' closes | | `408910f26` |

No rung declares `landsOnlyWith`, so the first rule orders nothing.

**Rung A's change is in a commit the gather did not write.** The gather applied rung A's patch with `git apply --3way --index` to `main`'s index after committing rung I, and before it folded A's record the coordinating session committed its boot note, `e487cec2d` ("Boot note: the next check-in", 08:41 UTC), with a commit that took the whole index: `git show --stat e487cec2d` lists rung A's `Library/FortressLibrary.fss` and `.fsi`, its three test files, its `REPORT.md`, `SKEPTIC.md` and `record.md`, beside `explorations/coordinator/BOOT.md`. It was pushed to `origin/main` with `5ad4a9957` (`git branch -r --contains e487cec2d`: `origin/main`, `origin/claude/worker-brief-fable-vnnuv8`, `origin/blinded-fable`). Rewriting it would need a force-push of `main`, which cannot be undone and which the gather did not take (gather.3, below). So rung A's code and tests are `e487cec2d`'s, exactly the branch's net change on rung I's commit (`git diff --stat 5ad4a9957 e487cec2d` lists the eight files of rung A's patch and `BOOT.md`; `git diff e487cec2d 408910f26 -- Library ProjectFortress Specification` prints nothing), and `444f37018` carries the rung's title, its message with the reason, its record's fold, the placeholders numbered and `record.md` taken out again. Row 678 is closed by `e487cec2d`, the commit that holds its fix. The gather's two later commits, the closes and this record, each staged and committed in one command, so that no other commit could take their paths.

## The order the rungs were applied in

I, then A: the manifest's order, and the order of the lowest edited lines. The two rungs share two files, `Library/FortressLibrary.fss` and `Library/FortressLibrary.fsi` (`comm -12` of the two lists `git diff --name-only 97ccd5f1f...<branch>`). In each, I's lowest edited line comes first: `FortressLibrary.fss` I `:642` (`QQ`'s power), A `:2524` (`Vector`'s `fill`); `FortressLibrary.fsi` I `:283` (`MultiplicativeRing`'s power), A `:1499` (`immutableArray`), from `git diff -U0 97ccd5f1f...<branch>`'s hunk headers. The two files order the pair the same way, as the batch record has it ("The gather applies I, then A, by their lowest edited lines"). Both patches applied with `git apply --3way --index` and no conflict, each file cleanly or after git's fallback to direct application, on `main` and in the gather tree alike.

**Lines moved.** Rung I's hunks move every line of rung A's files below them: `FortressLibrary.fss` by two (I's `typecase` at `:641-648` adds two lines; its `strToInt` hunk replaces one line with one), `FortressLibrary.fsi` by one (`RR64`'s new line at `:366`). So rung A's citations of its own tree read two more in the component and one more in the api on `main`: `Col` and `Row` `:2705`, `:2709` are `:2707`, `:2711`; `Array2.subarray` `:2727-2731` is `:2729-2733`; `Array3.subarray` `:3128-3133` is `:3130-3135`; `array3(v)` `fsi:1867` is `:1868`; the api's `Array2` `fsi:1705-1708` is `:1706-1709`. The folded record (the new rows 793 and 794, the closes, the FACTS entry, the PLAN entries) cites `main`'s lines, re-anchored by symbol; the rung files (`REPORT.md`, `SKEPTIC.md`) cite their own rung's tree and are not re-anchored in place. One citation the order could not keep: rung A's hunks, below rung I's lowest line but above `strToInt`, move I's `strToInt` sixteen lines down, `Library/FortressLibrary.fss:4545` on I's tree and at `5ad4a9957` being `:4561` on `main`. The folded note on row 747 names `strToInt` without a line, and rung I's revival change below gives the line on `main`.

## The tests on the merged tree

From `/home/user/fortress-gather20` (the two patches on `97ccd5f1f`, whose code and tests are `main`'s):
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1` with 64 walk programs, none with a `.test` file: every one the two rungs add or promote (I's `IntegerPowerContractWalk` and `QQPowerExponent`; A's `VectorMatrixCastsWalk`, `XXXArray2SliceAtNonzeroBase`, `XXXArray3SliceAtNonzeroBase`), the three team tests I respelled, the 30 of I's census (its `REPORT.md` section 2) and the 40 array tests of A's section 5, the two lists overlapping:
  `# harness-one 2026-10-20T08:33:11Z; tree 97ccd5f1f; nproc=4; load 0.64 0.55 0.67; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty`
  `. interpret tmp/h1/tests/IntegerPowerContractWalk` / `PASS`; `. interpret tmp/h1/tests/QQPowerExponent` / `REACHED` / `PASS`; `. interpret tmp/h1/tests/VectorMatrixCastsWalk` / `PASS`
  `FAIL: a Int: 22 =/= a Int: 11; the column's first element is a[b0,b1]; ranges.tex, section "Ranges": the implicit range : is treated as l:u` / ` OK Saw expected exception` (`XXXArray2SliceAtNonzeroBase`); `FAIL: a Int: 222 =/= a Int: 111; ...` / ` OK Saw expected exception` (`XXXArray3SliceAtNonzeroBase`)
  `OK (64 tests)`
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh merged20 ProjectFortress/compiler_tests` with rung I's skeptic's pair and the six compiled power tests its report ran: `IntegerPowerContractCompiledLink`, `XXXIntegerPowerContractCompiled`, `PowZZ32CompiledRungELink`, `PowNN32CompiledRungELink`, `PowNN64CompiledRungELink`, `XXXPowZZ32CompiledRungE`, `XXXPowNN32CompiledRungE`, `XXXPowNN64CompiledRungE`:
  `# junit.sh merged20 2026-10-20T08:37:27Z; nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 0.16 0.71 0.76; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; ...`
  `. run ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled (305ms) REACHED` / `FAIL:  0 =/= OVF; ZZ32 2^(-1) is no integer and throws IntegerOverflow; basic-integers.tex, section "Integers", opr ^` / `Saw expected failure (Exit code != 0)`
  `OK (8 tests)`
- Each closing test passed there: `IntegerPowerContractWalk` (438); `QQPowerExponent` (445); `VectorMatrixCastsWalk` (678).

**The interaction check.** The two rungs meet in `Library/FortressLibrary.fss` and `.fsi` and in walk's suite: no declaration is changed by both (the batch record, "The rule the rungs keep"), and no array body uses an integer power (A's brief, by a grep of the array code). The 64-program run above holds both rungs' tests and the census of each, side by side on one tree: every one passes or fails as expected.

`python3 explorations/coordinator/tools/ledger.py check --base 97ccd5f1f9f8ae69c2c9ff4f3dfca7c7fd102059` after the closes: "793 rows, 10 fail the template; rows (or places) failing each rule: spec-path 8, reproducer-path 2, base-numbers 1, spec-section 1", the base's ten and "base-numbers: ... gone none; new 791, 792, 793, 794". `python3 explorations/coordinator/tools/record.py check --base 97ccd5f1f9f8ae69c2c9ff4f3dfca7c7fd102059` after the last FACTS write: "FACTS.md 201 entries, POSITIONS.md 84 entries; 0 failures; reported: size 2".

The specification's PDF was not built here; the commit stage builds it once, `Specification/` having changed. No suite, count or distance was run: the gate measures the merged tree. By the planner's measurement of the two rungs' library text together, the distance goes 31 to 5 and the count 28 to 3; rung I measured 31 to 25 and 28 to 22 on its tree, rung A 31 to 11 and 28 to 9.

## Rows opened

Numbered by `ledger.py add` in the order the rungs were applied, each rung's rows in the order of their placeholders, each in the section its record names. Each placeholder was replaced by its number in the rung's `REPORT.md` and `SKEPTIC.md` (where a sentence speaks of the record's draft, the placeholder stays beside the number), and in the FACTS entries, PLAN entries, handover lines and revival changes below, before the rung's commit; no test and no sentence of the specification cites a placeholder. Every row was accepted as its record wrote it, rung A's two with `main`'s lines in place of their lines at `48d809df2` and their siblings numbered.

| Row | Placeholder | Rung | Section | Claim, in short |
|---|---|---|---|---|
| 791 | NEW-I-1 | I | 7 | the team demos `BiCGSTAB` and `BiCGSTAB2` stop under walk after their solve, at `ss = t / 1000000000.0` with `t` a `ZZ64` from `nanoTime()`, 'Failed to find any matching overload' |
| 792 | NEW-I-2 | I | 6 | the integer chapter's listing writes `throws IntegerDivisionByZero` on ÷, `REM`, `MOD`, `DIVREM` and `DIVMOD`, an exception neither library declares (`CONTESTED`) |
| 793 | NEW-A-1 | A | 9 | under walk, a column, a row or a range subscript of an `Array2` based above zero reads the wrong elements (`XXXArray2SliceAtNonzeroBase`) |
| 794 | NEW-A-2 | A (its skeptic) | 9 | under walk, a range subscript or the whole subscript `a[:]` of an `Array3` based above zero reads the wrong elements or raises (`XXXArray3SliceAtNonzeroBase`) |

No row opened by plan.

## Rows closed

Each by `ledger.py close N --commit <the rung's commit on main> --test <the test>`, after its test passed on the merged tree as the rung last ran it, in `408910f26`, with the record's note in the close (its "fixed <hash>" left to the tool, the branch's commits named in the note):
- Rung I, `5ad4a9957`: 438 (`IntegerPowerContractWalk`, with the distance stage's five sites and `strToInt`'s gone on the rung's tree); 445 (`QQPowerExponent`, promoted from `XXXQQPowerExponent`).
- Rung A, `e487cec2d`: 678 (`VectorMatrixCastsWalk`, its column and row assertions at the eight number types, with the distance stage's two sites gone on the rung's tree; its record in `444f37018`).

## Each rung

### I (`rung-integer-power`), landed first as `5ad4a9957`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The skeptic's `1cff513e5` wrote the worker's `REPORT.md` and `record.md` from the journal, the harness having refused the worker's write; no repair round, and the gather wrote no file from the journal. `git diff 97ccd5f1f 5ad4a9957 -- Library ProjectFortress Specification` equals the branch's net change.

**Skeptic's fixes**, all corrections, none contested, no ruling:
- `1cff513e5`: the branch lacked the worker's `REPORT.md` and `record.md`; written byte for byte from the run's journal by `journal-text.py` (both exit 0).
- `f39076fa8`: `ProjectFortress/tests/IntegerPowerContractWalk.fss:121`, `:126`, `:133` cited `basic-integers.tex`'s `opr ^` entry for an overflow at a positive exponent, which that entry does not say; each now cites `opr-overview.tex`'s "For integer results, overflow throws an IntegerOverflow" too, and `:133`'s "beyond 32 bits" for `2^31` says "beyond the int's range".
- `4ae8b80ea`: row 441's compiled half (compiled `2^(-1)` is 0, `0^(-1)` a raw `RuntimeException`) had no home 2, though the revised method entry settles it and phase 4 defers it: `ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled.test` with `IntegerPowerContractCompiledLink.test`, an expected failure on the base and the head.
- `57142f4c9`: `REPORT.md`'s "17 array sites" (19) and "21 `fail(` calls" (20 on the base); the report's section 12 and `record.md` overclaimed the numeral type's own type under walk (row 578); F-84 and row 533 added to the sentences made false; NEW-I-2's (row 792's) `fsi:1113` made `:1114`; row 441's compiled half's home; row 336's note.
- `2f78e98ce`: `record.md`'s NEW-I-1 (row 791) stated its repair, `asFloat(t) / 1000000000.0`, without running it; run, both demos complete with it (row 791's notes).

**Folded.** F-263 ("Every integer power answers its base's own type; at a negative exponent the bases 1 and -1 give their exact power, 0 raises `DivisionByZero`, and any other base `IntegerOverflow` (contract E).") at the end of "Landed semantics", its list joined into one line, with "on the rung's tree" after its "31 to 25" and the skeptic's `XXXIntegerPowerContractCompiled` named beside rows 441 and 523. Rows 791 and 792. The note on row 747 written, its `fss:4545` dropped (above, "Lines moved"); the notes on rows 441, 523, 533 and 336 refused (below, "Ledger notes not written"). Rows 438 and 445 closed. Its items for the curator in `PLAN.md`.

**Corrections.** The skeptic's four `leftForGather` items:
- F-84's "Left: `QQ`'s power (rows 438, 445)." is false once the rows close: rewritten by `record.py set` to "The integer powers answer their base's own type, and `QQ`'s power takes an exponent of any integer (F-263)." (`explorations/coordinator/FACTS.md:77`).
- Row 441's note with the compiled half's reproducer, `ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled.test`: tried with the reproducer in place of the record's "(row 523)" and refused, the row's notes already at 702 of 700 characters; the tool edits no note in place, so the worker's note could not be shortened (below).
- The notes for row 533 and row 336: tried and refused (below).
- The worker's first commit `b1b944089` carries the session's suggested footer: it is a branch commit and does not land; every commit of the gather carries the skill's footer. Nothing to change.

`REPORT.md` section 7's sentences of the specification: `basic-integers.tex:320` and `:534-542`, and `changes.tex`'s "The integer trait" and "Passages not yet revised", are the rung's own edits; `Specification/basic/operators/opr-overview.tex:73`, "This operation is defined in the usual way on numerals.", is left by the batch record's fork 16 and is no Effect or note on walk or the compiled path; the report found no other Appendix I Effect or note that says what the integer power answers, and the gather's grep of `Specification/` for a negative power (`grep -rn -i 'negative power\|negative exponent\|\^{-[0-9]'`) found no Effect or note beyond the rung's own edits. It found one passage the report does not list, the dimensions chapter's unit factors with an integer base at a negative exponent (`Specification/advanced/defining-dimensions.tex:217`, `:224-225`, `:310-319`); that is the specification's own normative text, not an Effect, so it stands and goes to the curator (gather.2). Its record sentences: F-241, F-247 and P-153's "Still to build" are the coordinator's consolidation (below); rows 438 and 445 closed; row 441's first clause, row 747's claim and row 523's notes, below.

### A (`rung-array-sites`), landed second as `e487cec2d` and `444f37018`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not (it came in with `e487cec2d` and left in `444f37018`). The skeptic's `c258a3b5f` wrote the worker's `REPORT.md` and `record.md` from the journal, the harness having refused the worker's write; no repair round, and the gather wrote no file from the journal. The library edit is the probe's two patches, as the skeptic checked ("SAME-AS-PATCHES").

**Skeptic's fixes**, all corrections, none contested, no ruling:
- `c258a3b5f`: the worker's `REPORT.md` and `record.md`, byte for byte from the run's journal.
- `6b1a256ab`: `ProjectFortress/tests/VectorMatrixCastsWalk.fss:128-141` and `XXXArray2SliceAtNonzeroBase.fss:9-14` cited "ranges.tex, implicit ranges", no heading (the file's one section is "Ranges", `Specification/basic/expressions/ranges.tex:12`); four of the guard's messages said a column or row is 0-based, which ranges.tex does not say; they now cite the section, and the base by the library's extraction.
- `fe3fc362c`: `record.md`'s NEW-A-1 left `Array3.subarray` unmeasured; measured on the old and new code (a range subscript reads `a[2,2,2]` at `(0,0,0)`, and `a[:]` raises `IndexOutOfBounds`): `ProjectFortress/tests/XXXArray3SliceAtNonzeroBase.fss` and NEW-A-2 (row 794), with NEW-A-1 (row 793) naming it as a sibling.
- `b7b787c78`: `record.md`'s FACTS entry and revival change said no walk value moves; one does, for a `Vector` or `Matrix` whose `replica` is not one (SkOddView: old 'odd v+v is a Vector false is an Array1 true 4.0', new `CastError` at `Library/FortressLibrary.fss:36` from `Vector`'s `+`); row 465's note overran the row and said no other case was met; row 782's "17 entries" is now stale; the report's specification grep prints four lines, not none.
- `3baae9302`: every matrix of the guard was 2 by 2; `nonSquare` asserts a 2 by 3 matrix's `tabulate`, `matrix(v)`, `+`, `-`, unary `-`, `scale`, `fill`, `rmul` and `lmul`, and its transpose's `+`, at the eight types.
- `788107fd6`: the skeptic's own row 465 note said the api's `Array2` declares only one-argument subscripts, where `Library/FortressLibrary.fsi:1705` (`:1706` on `main`) is a two-index assignment.

**Folded.** F-264 ("The array code's 19 typecheck sites and the api's first export error are gone: ...") at the end of "The library's arrays and algebra", with "on the rung's tree" after its "31 to 11 and the count 28 to 9". Rows 793 and 794 at `main`'s lines. Row 782's note cut to fit; row 465's refused (below). Row 678 closed. Its items for the curator in `PLAN.md`.

**Corrections.** The skeptic's two `leftForGather` items:
- The FACTS and PLAN sentences made false, by `record.py set` for FACTS:
  - F-35's "has 25 declarations with a dead size" now 8, with the 25 and rung A's diff named, its "Six vector `DOT` and juxtaposition operators have this shape ... and give one of the distance's export errors (F-53)" in the past with the error gone (F-264), and its "P-40 lets the dead sizes go only by a diff shown to the curator with the switch-over's design" made "the other dead sizes", as P-40 now reads.
  - F-260: a sentence, "Climb batch 20's rung A built these ways with E3, 31 to 11 on its tree (F-264)."; its probe's measurement stands.
  - F-53's "led by the sized arrays (F-54)" made "by root cause (F-54)"; its numbers stay the last landed gate's, the commit stage's to rewrite.
  - F-54's title "..., and the sized arrays and the one-off body errors lead." made "The gate classes the distance to the switch-over by root cause.", with the sentence "At climb batch 19's gate the sized arrays (class V2, 17 of 31) and the one-off body errors (class OT, 9) led; climb batch 20's rung A took class V2 to 0 on its tree (F-264)." (`explorations/compile-ladder/climb-batch-19/gate/distance.txt:13`, `:16`).
  - F-58's "3 `DOT` calls that fail on the api's unused sizes (F-35)" made "that failed on the api's unused sizes, gone since climb batch 20's rung A and not measured again (F-35)".
  - F-158: "`Vector` and `Matrix` also redeclare them at their own type, with the meet's bodies (F-264)."
  - `PLAN.md:67`, phase 3's item 18 candidate on the arrays: "both built by climb batch 20's rung A (F-264)" after the first export error's diff; `PLAN.md:134`, item 12: "by climb batch 20's rung A (F-264)"; `PLAN.md:198`, item 112's entry: a sentence that two leaves now declare `fill` and `tabulate` beside the meet's bodies, which also holds A.worker.2 and A.skeptic.2.
- The ledger work: row 678 closed, rows 793 and 794 added by `ledger.py add`, row 782's note cut to fit and row 465's refused.

`REPORT.md` section 7 lists no sentence of the specification made false, and the gather's reading agrees: Part IV is the api rendered (`Specification/library/default-libraries.tex:27`); the arrays chapter's table of `fill` and `tabulate` and Appendix I's "Initializing an array from a function" stay true. Its record sentences: F-35, F-260, F-53, F-54, F-58, F-158 and the three PLAN lines, above; row 678's claim, closed; row 465's example and row 782's "17 entries", below.

### Text mismatches

None between one rung's specification text and another rung's code: rung A edits no sentence of the specification, and rung I's sentences speak of the integer power, which no array body uses. No record entry of one rung is made false by the other's code: F-263 and F-264 each hold on the merged tree, and the second export error's 43 entries by rung I's reading stand beside rung A's "44 entries stay", each of its own tree (the gate measures them together).

## Files written from the journal

None by the gather: every branch carried its `REPORT.md`, `record.md` and `SKEPTIC.md`, no `SKEPTIC.md` was only the word "committed", and no rung had a repair round. On the branches, each skeptic wrote what the harness had refused its worker from the journal with `journal-text.py`: I `1cff513e5` (`REPORT.md` and `record.md`), A `c258a3b5f` (`REPORT.md` and `record.md`).

## The rungs that did not land

None: every rung of the batch was approved.

## Ledger notes not written

`ledger.py note` refuses a note that would take a row past 700 characters of notes or 1,200 of line, and a closed row. The texts it refused, five, in the records' words with the rows' numbers put in, for the coordinator (gather.1):
- Row 441 (I, with its skeptic's reproducer): "Contract E (P-153): the specification gives it (`basic-integers.tex`, "Integers", opr ^) and walk builds it (`IntegerPowerContractWalk`); compiled, `2^(-1)` is still 0 and `0^(-1)` a raw RuntimeException (`compiler_tests/XXXIntegerPowerContractCompiled.test`), until phase 4's natives." Refused: row 1,330, notes 985 (the notes were at 702 before it).
- Row 523 (I): "Its negative branch now has its contract, E (P-153), as walk's natives give it." Refused: row 1,276, notes 759.
- Row 533 (I's skeptic): "`MultiplicativeRing`'s api power is now `abstract opr ^(self, other:AnyIntegral): T` (`Library/FortressLibrary.fsi:283`) and `RR64`'s api declares `opr ^(self, b:AnyIntegral):RR64` (`:366`), climb batch 20 rung I; the tie with this text is not measured." Refused: row 1,418, notes 943.
- Row 336 (I's skeptic): "Walk now has `Int.divisionByZero()` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:263-266`), the helper the fix names, raised by the integer powers at a base of 0 (climb batch 20 rung I)." Refused: row 1,379, notes 904.
- Row 465 (A, its skeptic's 155 characters): "Batch 20 rung A: the api declares `array3(v)` (fsi:1868); another case: `Array2`'s `m[:, j]` and `m[i, :]` (fss:2707, :2711) are not in the api's `Array2`." Refused: notes 826. The record's count of the row's room (1,030 of 1,200) left out the notes' own limit of 700, at which the row stood at 673.

One was cut to fit and written, its full text here: row 782 (A), "Climb batch 20 rung A: the claim's 17 entries, the first export error before that rung, are gone after it (`compile-ladder/rung-array-sites/REPORT.md` section 4); the 165 is not measured again.", refused at row 1,299 and notes 838, written as "Batch 20 rung A: those 17 entries are gone." One was written whole but for its line: row 747 (I), the record's "`strToInt` writes `fail[\ZZ32\]` (`fss:4545`), its site gone; ..." without "(`fss:4545`)", since rung A's hunks move that line to `Library/FortressLibrary.fss:4561` on `main`.

## Handover lines

Each rung's handover line, as its record gives it, with the rows' numbers put in. The hashes in them are the branches'; each rung's commits on `main` are in the table above.

**I.**

Rung I built contract E (P-153). Every integer power answers its base's own type. At a negative exponent walk's six power natives raise `IntegerOverflow`, or `DivisionByZero` at a base of 0, and they read an exponent of any integer type. `QQ`'s power takes the library's `typecase`, `strToInt` writes `fail[\ZZ32\]`, and the ring's and `RR64`'s api powers match their components. The team tests `realArith`, `compoundArray` and `simpleExp` and the demos `BiCGSTAB`, `BiCGSTAB2` and `npbft` now write a float base. Rows 438 and 445 close. On the rung's tree the distance is 25 and the count 22.

**A.**

Climb batch 20, rung A (the array sites) on `wip/rung-array-sites`: `ways.patch` and `e3-rebased.patch` applied unchanged, the distance 31 to 11 and the count 28 to 9 with nothing come, the count stage 67 s; `VectorMatrixCastsWalk` passing on the base and after, walk's 40 array tests, `ant testSystem` (666), `ant testSpecData` (130) and microGPT's quick pair unchanged; row 678 to close, rows 465 and 782 noted, two new rows (793, `XXXArray2SliceAtNonzeroBase`; 794, `XXXArray3SliceAtNonzeroBase`, the skeptic's).

## Points to report

None holds the push by a step the gather took: every point below is reversible, and the gather took no step that cannot be undone or that acts against a decision on record. One step that cannot be undone was taken outside the gather, the coordinating session's commit and push of `e487cec2d` with rung A's change in it (above, "The landed commits"); the gather did not force-push to undo it (gather.3). Where the worker and the skeptic listed one point twice, it is listed once, with both measurements where they differ. Lines are on the rung's tree, with `main`'s where rung I's hunks moved them (above).

Rung I:
- Whether `power.patch` was taken as it is or changed: taken as it is; it applied (`git apply --check explorations/compile-ladder/plan-20/probes/power.patch` on `97ccd5f1f` printed nothing) and moved exactly its measured sites; `git diff 97ccd5f1f -- Library ProjectFortress/LibraryBuiltin | diff - explorations/compile-ladder/plan-20/probes/power.patch` printed nothing (`0bf22171b`).
- Each team line changed, before and after, and whether each demo completes: each `10^(-k)` became `10.0^(-k)`: `ProjectFortress/tests/realArith.fss:54`, `:57`; `compoundArray.fss:17-18`, `:27`, `:32`, `:33-34`; `simpleExp.fss:18-20`; `ProjectFortress/demos/BiCGSTAB.fss:211`, `BiCGSTAB2.fss:198`, `npbft.fss:130`. No demo completes, before or after: `BiCGSTAB` and `BiCGSTAB2` stop at their timing line (`BiCGSTAB.fss:177`, 'Failed to find any matching overload, args = (61962592400: ZZ64,1.0E9)', after the same 29 residuals as the base; `BiCGSTAB2.fss:163`), row 791; `npbft` is refused at load before and after (row 670). Copies with the timing line respelled `asFloat(t)` complete (the skeptic).
- Each walk value that moves: an integer to a negative power raises `IntegerOverflow`, or `DivisionByZero` at 0, where it answered an `RR64`; `1^(-1)` and `(-1)^(-1)` answer the base's own type; `(1/2)^(big(3))` is `1/8` where walk stopped; `QQ` `(1/2)^(unsigned(3))` and `^(NN64 3)` are `1/8` where they raised `IntegerOverflow`; an `NN32` or `NN64` all-ones base at a negative exponent raises where it gave `-1.0`; an `NN64` exponent of 2^63 or more is positive (`0^(2^63)` was `1.0`); a `ZZ` base beyond the int's range follows the base's rules (`3^(2^32)` was 1). No test's message or verdict changed beyond the promotion: `ant testSystem` 'Tests run: 160', '172', '164', '169', Failures: 0 (665 against batch 19's 664) (`ProjectFortress/tests/IntegerPowerContractWalk.fss:36`; the skeptic's `SkPowEdgesB.fss`, old against new, 'QQ (1/2)^(unsigned(3)) raises IntegerOverflow|QQ (1/2)^(unsigned(3)) = 1/8 : QQ').
- The distance and count tables before and after: `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-19/gate/distance.txt tmp/rung-integer-power/distance-postedit.txt` 'DISTANCE DOWN   31 -> 25 (-6)'; six sites gone (`fss:642` three times, `:643`, `:4540`, `:4556`; `explorations/compile-ladder/gate/distance-sites.tsv:6-7`, `:10-12`, `:32`), none come; the second export error 44 entries to 43 (`MultiplicativeRing`'s gone, `QQ`'s naming `isNaN` alone); the count '#total 28' to '#total 22', locations 27 to 22.
- The count stage's seconds: about 64 s at climb batch 19's gate, about 71 s after (started 07:34:04Z, `EXIT=` written 07:35:15Z; load at start 6.25, beside rung A).
- Where row 747's reproducer went: its program is in `REPORT.md` section 8 and the row's note points there, since the compiled path refuses an `if` with a generator clause first ('Variable __cond is not defined.'; `ProjectFortress/compiler_tests/XXXIfGeneratorClause.test:3`).
- Every sentence made false, and the specification sentences edited: edited `Specification/basic-lib/basic-integers.tex:320-324` and `:534-542`, `Specification/appendices/changes.tex`'s "The integer trait" (`:898-903`, `:908-925`, `:935-943`, `:1040-1051`) and "Passages not yet revised"; listed `Specification/basic/operators/opr-overview.tex:73`, F-241, F-247, F-84 (the skeptic's), P-153's "Still to build", rows 438, 441, 445, 747 and 523, and row 533 (the skeptic's) (`explorations/coordinator/FACTS.md:77`; `explorations/fortress-gap-ledger.md:169`).
- A ladder file, compiled test, specification example or microGPT component whose verdict, phase or first error changes: none; `expTest` and `transposition` keep the old code's first errors; the eighteen microGPT phases equal batch 19's but for seconds; `ant testSpecData` 130 of 130; the compiled power tests 'OK (6 tests)'. One compiled test is new, the expected-failure pair `XXXIntegerPowerContractCompiled` with `IntegerPowerContractCompiledLink`, green as an expected failure on the base, the head and the merged tree (above).
- A file edited beyond those named, or any checker, code-generator or array edit: the skeptic's three compiled test files (`ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled.fss:2`, `.test`, `IntegerPowerContractCompiledLink.test:1`); no checker, code-generator or array edit; `WellKnownNames.java` gains one constant, which only walk's natives read (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:87`).

Rung A:
- Whether `ways.patch` and `e3-rebased.patch` were taken as they are: as they are (`48d809df2`; the skeptic's scratch application to the base's two files, diffed against the head, 'SAME-AS-PATCHES'; `Library/FortressLibrary.fss:2525-2540`, `:2527-2542` on `main`).
- The distance and count tables before and after: `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-19/gate/distance.txt tmp/rung-array-sites/distance-postedit.txt` 'DISTANCE DOWN   31 -> 11 (-20)'; `compare-sites.py` 'landed 17 entries, now 0' for the first export error and 44 to 44 for the second; the count '#total 28' to '#total 9'; 20 rows of the landed list gone, none come.
- The count stage's seconds: about 64 s at climb batch 19's gate, 67 s on the head ('real 1m7.256s').
- Each walk value that moves, any cast that fails at an element type, and each test whose message or verdict changes: none in the tree's tests and demos (`harness-one.sh` over 42 files, base and edit, 'OK (42 tests)' both); no cast fails at the eight types (`ProjectFortress/tests/VectorMatrixCastsWalk.fss`); one value moves in a program outside the tree, a `Vector` whose `replica` is not a `Vector`, from a value to `CastError` (SkOddView, `SKEPTIC.md` section 2); the two array tests' messages now cite ranges.tex by its section (`6b1a256ab`).
- The declarations that leave or join the api, and so Part IV: `immutableArray`'s ranks 2 and 3 leave (`Library/FortressLibrary.fsi:1500-1503`, `:1501-1504` on `main`); `array3(v)` joins (`:1867`, `:1868`); `Vector`'s and `Matrix`'s `fill` and `tabulate` join (`:1624-1625`, `:1746-1747`; `:1625-1626`, `:1747-1748`); the 17 operators' headers shorten (`:1653-1680`, `:1780-1802`; `:1654-1681`, `:1781-1803`); Part IV renders the api (`Specification/library/default-libraries.tex:27`).
- Every sentence made false: none of the specification; of the record F-35, F-260, F-53, F-54, F-58, F-158, `PLAN.md:67`, `:134`, `:198`, row 678's claim, row 465's example and row 782's "17 entries" (corrected or noted, above).
- A ladder file, compiled test, specification example or microGPT component whose verdict, phase or first error changes: none (the ladder subset 17 of 17 equal to `baseline-2026-09-19/ladder.tsv`; the microGPT phase table equal to climb batch 19's; `ant testSpecData` 'Tests run: 130, Failures: 0, Errors: 0'; mg-run 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' twice).
- A file edited beyond those named: two gated expected failures, `ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss` (the worker's, `73e47c30d`) and `ProjectFortress/tests/XXXArray3SliceAtNonzeroBase.fss` (the skeptic's, `fe3fc362c`), the homes of rows 793 and 794; no edit of the number traits, walk, the checker or the code generator.
- The guard's reach at a base above zero is a column's and a row's type and size, not their elements, since the base reads them at the wrong offset (row 793; `ProjectFortress/tests/VectorMatrixCastsWalk.fss:136-141`, `:164-170` after the skeptic's block; the skeptic's SkA2Col 'col0=22').

The gather reached three of its own: rung A's change committed outside the gather and pushed (above, gather.3); the order's one citation it could not keep, `strToInt`'s line, re-anchored by symbol (above, "Lines moved"); and the dimensions chapter's integer bases at a negative exponent, which the revised power entry makes throw (gather.2).

## Items for the curator, and where each is in `PLAN.md`

Every entry is under "Off the path, parked": none asks for an answer before work on the path can go on, and each default is reversible. In the new subsection "Climb batch 20, listed for his review" (`explorations/coordinator/PLAN.md:516`), one entry for each point, opening with the ids it holds:
- I.worker.1 and I.skeptic.1, one point: "I.worker.1 and I.skeptic.1 of climb batch 20's rung I: the integer chapter's listing writes `throws IntegerDivisionByZero` ..." (`PLAN.md:520`). Default: `DivisionByZero` (row 792).
- I.worker.3 and I.skeptic.3, one point: "I.worker.3 and I.skeptic.3 of climb batch 20's rung I: under walk a `ZZ` or numeral power whose exponent lies beyond the int's range ..." (`PLAN.md:522`). Default: as built.
- I.worker.4 and I.skeptic.4, one point: "I.worker.4 and I.skeptic.4 of climb batch 20's rung I: no `decision-record.md` was written for contract E ..." (`PLAN.md:524`). Default: none.
- A.worker.1 and A.skeptic.1, one point: "A.worker.1 and A.skeptic.1 of climb batch 20's rung A: under walk a column, a row or a range subscript of an `Array2` based above zero ..." (`PLAN.md:526`). No default on record.
- A.skeptic.3: "A.skeptic.3 of climb batch 20's rung A: the cast bodies of `Vector` and `Matrix` now rely on ..." (`PLAN.md:528`). No default on record.
- A.skeptic.4: "A.skeptic.4 of climb batch 20's rung A: should the api declare `Array2`'s column and row subscripts ..." (`PLAN.md:530`). No default on record.
- gather.2: "gather.2 of climb batch 20's gather: the dimensions chapter writes its unit factors with an integer numeral base at a negative exponent ..." (`PLAN.md:532`). No default on record.
- gather.3: "gather.3 of climb batch 20's gather: rung A's net change, which the gather had applied to main's index, was committed by ..." (`PLAN.md:534`). No default on record; as it is.

In an entry already there:
- I.worker.2 and I.skeptic.2 (the demos' timing line, row 791): a sentence in "The team's demos: those that write no static argument for a generic reduction stay as they are ..." (`PLAN.md:226`), the entry that holds his word on the demos ("Until he says, no demo is edited."). Default: as they are.
- A.worker.2 and A.skeptic.2 (item 112's wording): a sentence in "`fill` and `tabulate` sit where the array diamond meets ..." (`PLAN.md:198`), review-queue item 112, which also corrects its sentence made false.
- gather.1 (five notes refused, one cut to fit): a sentence in "gather.1 of climb batch 15's gather: seven of the records' eight ledger notes refused, ..." (`PLAN.md:428`), as climb batch 16's to 19's gathers added one. Review-queue item 165.

## FACTS and POSITIONS left for the coordinator

The batch record gives these to the coordinator's consolidation (`coordinator/CLIMB-BATCH-20.md`, "After the landing"):
- Rung I: F-241 ("The integer power's declared `RR64` holds five of the distance's sites; ..."), whose sites are gone, and F-247 ("Under walk, the integer power already answers the integer at a nonnegative exponent, ..."), whose "Only the declared type says `RR64` (row 438)" is false, whose three team tests now write a float base and whose two demos are three (`compile-ladder/rung-integer-power/REPORT.md` section 7); the gather left both as written, with F-263 beside them. P-153's "Still to build", built, with three demos where it names two.
- Rung A: F-35 and F-260, whose sentences made false the gather corrected (above), for their consolidation with F-264; P-40's "built with the array sites' other fixes", built.
- F-53's numbers are the commit stage's, as at climb batches 17 to 19; the gather rewrote only its "led by the sized arrays".
- Ledger sentences no tool can reach: row 441's first clause, "a negative power of an integer has no specified result", and its walk values, false since rung I (the row stays open by fork 13, its compiled half home 2); row 747's claim, "so `strToInt`'s `SUM[\ZZ32\]` ... is refused", false (its note says so); row 523's notes' "binding it as it stands would decide row 441", past; row 533's claim, whose `MultiplicativeRing` declaration changed (not measured); row 465's example, now a declared call. The texts the tool refused are above.
- F-263 and F-264 are past the record's 600 characters (1,478 and 1,144, `record.py check`), as the records wrote them.

## Revival changes, for the skill writer

Each landed rung's "Revival change" section, both its parts word for word, in the order the rungs landed, with the rows' numbers in place of the placeholders and its headings set one level down. Where a line it cites moved on `main`, the line on `main` follows the copy; then the skill sentences the rung's report lists as made false, which the batch does not edit.

### I (`rung-integer-power`, `5ad4a9957`)

#### The change

1. **An integer power's type, and its value at a negative exponent.**
   - The team's sources:
     - The library declared every integer `^` as answering `RR64`: `opr ^(self, b:AnyIntegral):RR64` on `Integral` and each integer type (`Library/FortressLibrary.fss:721`, `:799-801`, `:892-894`, `:975-977`, `:1074-1076`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:460-462`, `:552-554`, at `97ccd5f1f`).
     - Walk's natives answered the integer at a nonnegative exponent and `1.0 / pow(base, -exp)` at a negative one (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:220-230` and its five kin, at `97ccd5f1f`): `2^(-1)` was `0.5` and `0^(-1)` was `Infinity`.
     - The Working Draft gave `2^(-1)` as `1/2` through the rational power (`Specification-1.0-frozen/basic-lib/numbers.tex:344-355`).
     - The compiler's prelude types the `ZZ32` power `ZZ32` at a `ZZ32` exponent (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:267`), and answers 0 at a negative one (row 523).
   - What the tree now does:
     - Each integer `^` answers its base's own type (under walk the numeral object's power answers a `ZZ32` value, as all its arithmetic does; row 578).
     - The compiled path's own library still answers 0 at a negative exponent, and a Java exception no `catch` sees at a base of 0 (rows 441 and 523; `ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled.test`).
     - At a negative exponent the bases 1 and -1 give their exact power, 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`.
     - A fraction is written with a float or rational base, `2.0^(-1)`.
     - The integer chapter's method entry says so (`Specification/basic-lib/basic-integers.tex:534-539`).
     - Test: `ProjectFortress/tests/IntegerPowerContractWalk.fss`.
   - The reason:
     - The compiled checker refuses the library as written: 'Function body has type RR64, but declared return type is QQ.' in the rational power (`Library/FortressLibrary.fss:642` at `97ccd5f1f`), and 'ZZ32->ZZ32 is not applicable to an argument of type RR64' in `strToFloat` (`:4556`). On the flat tower an `RR64` holds no integer value.
     - The team's later code types an integer power by its integer at a signed exponent (`CompilerBuiltin.fsi:267`).
     - No type carries the sign of a numeral, so no overload can tell `10^16` from `10^(-16)`: the checker types every integer numeral `IntLiteral` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:468-469`).
2. **The rational power over any integer.**
   - The team's library: `if -other > 0 then (denominator(self)/numerator(self))^(-other) else (numerator(self))^other / (denominator(self))^other end` (`Library/FortressLibrary.fss:641-646` at `97ccd5f1f`), under the comment "Way too clever by half". The api declared its exponent `ZZ64` (`Library/FortressLibrary.fsi:430`).
   - What the tree now does: a `typecase` over the five integer types negates only inside a signed type (`fss:641-648`), and the api takes `AnyIntegral` (`fsi:431`). Tests: `ProjectFortress/tests/QQPowerExponent.fss`, `RationalTest.fss`.
   - The reason: the checker's 'Could not check call to operator -', since `AnyIntegral` declares no `-` (`fss:642`, `:643` at `97ccd5f1f`). Under walk an unsigned exponent's negation wraps, so it recursed (row 445).
3. **`strToInt`'s `fail`.**
   - The team's library: `fail("strToInt(" … ")")` in the `else` of a generator clause inside `SUM[\ZZ32\]` (`Library/FortressLibrary.fss:4543` at `97ccd5f1f`).
   - What the tree now does: `fail[\ZZ32\](…)` (`fss:4545`). Test: the distance stage, where the site is gone.
   - The reason: the checker's 'ZZ32->ZZ32 is not applicable to an argument of type Any' (`fss:4540` at `97ccd5f1f`), its result-only `T` taking the bound `Any` there.
4. **The ring's power in the api.**
   - The team's api: `opr ^(self, other:ZZ64): T` (`Library/FortressLibrary.fsi:283` at `97ccd5f1f`), where the component has `opr ^(self, other:AnyIntegral): T` (`fss:377`). `RR64`'s api had no power over any integer, while its component has one (`fss:486-487`, under the team's comment "Shouldn't need this extra declaration.").
   - What the tree now does: `abstract opr ^(self, other:AnyIntegral): T` (`fsi:283`) and `RR64`'s `opr ^(self, b:AnyIntegral):RR64` (`fsi:366`). Test: the distance stage, where the export error's `MultiplicativeRing` entry is gone.
   - The reason: the checker's export error, '(TraitDecl MultiplicativeRing …, due to different method ^ …)'.
5. **Walk's reading of an exponent.**
   - The team's natives: every power read its exponent with `getLong` (`Int.java:223`, `BigNum.java:114` at `97ccd5f1f`), which a `ZZ` refuses, 'Value 3 might not fit in ZZ64.'. An `NN64` of 2^63 or more read as negative (`0^(2^63)` was `1.0`), and the ZZ power cast its exponent to an int (`(big(3))^(2^32)` was `1`).
   - What the tree now does: an exponent of any integer type is read by its sign and parity (`Int.java:268-282`), and the ZZ and numeral powers apply the base's rules past the int's range (`BigNum.java:304-324`). Tests: `IntegerPowerContractWalk.fss` (`exponentTypes`), `QQPowerExponent.fss`.
   - The reason: the measured failures above; `AnyIntegral`, the declared exponent type, comprises `ZZ` (`Library/FortressLibrary.fsi:442`).
6. **The team's tests and demos with a negative power.**
   - The team's lines: `10^(-k)` as a decimal scale (`ProjectFortress/tests/realArith.fss:54`, `:57`; `compoundArray.fss:17-18`, `:27`, `:32`, `:33-34`; `simpleExp.fss:18-20`; `ProjectFortress/demos/BiCGSTAB.fss:211`, `BiCGSTAB2.fss:198`, `npbft.fss:130`, at `97ccd5f1f`).
   - What the tree now does: each base numeral takes a `.0`, as `10.0^(-k)`, with the same values. The tests pass; the demos stop where they stopped before.
   - The reason: under the change each of these lines raises `IntegerOverflow`, as the unrespelled `BiCGSTAB` does at `:211`.

#### Provenance

- P-153 (contract E, PLAN item 58), whose default is the Fable judgement's section 6 (`explorations/reviews/integer-power-fable-judgement.md`); P-26, P-73, P-76, P-80; F-241, F-247, F-262.
- The integer-power probe (`explorations/perf-probes/integer-power/REPORT.md`, sections 3.1 and 4), and the planner's `explorations/compile-ladder/plan-20/probes/power.patch`.
- Climb batch 20's forks 3 and 7 to 17: the ring's api text (c), `QQ`'s api exponent, `QQ`'s `typecase`, `IntLiteral`'s power, the exponent's reading, row 747's reproducer, row 441's note, the `WellKnownNames` constant, the float bases, the specification's text, and no speed pass.
- Rows 438 and 445 (closed); 441, 747 and 523 (noted); 791 and 792 (new).
- Climb batch 20, rung I.

Lines on `main`: the change cites the base `97ccd5f1f` and the rung's tree, whose lines are `main`'s but one: `strToInt`'s `fail[\ZZ32\](…)`, `fss:4545` on the rung's tree and at `5ad4a9957`, is `Library/FortressLibrary.fss:4561` on `main`, rung A's hunks above it adding sixteen lines; `fss:641-648`, `fsi:283`, `:366`, `:431` and `:442`, the natives and `basic-integers.tex:534-539` stand. The provenance's "441, 747 and 523 (noted)": only row 747's note was written; those of rows 441 and 523 were refused for length (above, "Ledger notes not written"). Skill sentences made false: none, by the rung's report (section 7: no sentence of `.claude/skills/fortress-repo/` gives the integer power's type or a negative power's value); the skill's part on revival changes gains this change.

### A (`rung-array-sites`, `e487cec2d`, its record `444f37018`)

#### The change

- The team's sources: the library's api declared the vector and matrix products and the vector `+` and `-` with static sizes that occur in no parameter, result or body, as `opr DOT[\ T extends Number, nat n, nat m, nat p \](me : Vector[\T,n\], other : Vector[\T,n\]):T`, where the component declares `[\T, nat n\]` (`Library/FortressLibrary.fsi:1495-1525`, `:1621-1645` at `a874948ac`); it declared `immutableArray`'s ranks 2 and 3 (`.fsi:1352-1353` at `a874948ac`), which the component had only in a comment (`.fss:1941-1952` at `a874948ac`), with no immutable array of rank 2 or 3 in the library; it declared `array3()` alone where the component also defines `array3(v)` (`.fsi:1701`, `.fss:2814-2818` at `a874948ac`). The component's `Vector` and `Matrix` answered their `+`, `-`, unary `-`, `scale` and `pmul` with the parent array's `map` or `ivmap`, typed `Array1` or `Array2`, under a declared `Vector` or `Matrix`, and so did `vector(v)`, `tabulatedVector`, `rmul`, `lmul` and `matrix(v)` through the parent's `fill` and `tabulate`; the size-tested arms of `__builtinFactory1` and `__builtinFactory2`, and `Col` and `Row`'s argument, had the same shape (`Library/FortressLibrary.fss:2189-2202`, `:2359`, `:2363` at `a874948ac`).
- What the tree now does: the api's operators carry only the sizes they use (`Library/FortressLibrary.fsi:1653-1680`, `:1780-1802`); `immutableArray`'s ranks 2 and 3 are in a comment in the api too (`.fsi:1500-1503`); the api declares `array3[\T, nat s0, nat s1, nat s2\](v:T)` (`.fsi:1867`); `Vector` and `Matrix` declare `fill` and `tabulate` at their own type (`.fsi:1624-1625`, `:1746-1747`; `.fss:2525-2532`, `:2846-2853`); and their operations, the factories' base-0 arms and `Col` and `Row`'s argument return through the library's `cast` to the declared sized type (`.fss:2534-2540`, `:2855-2859`, `:2562`, `:2573`, `:2963`, `:2705`, `:2709`). Under walk every value of the tree's tests and demos is as before; a `Vector` or `Matrix` whose `replica` answers an array that is not one now raises `CastError` at its `+`, `-`, unary `-`, `scale` or `pmul`, where the base answered that array. Tests: `ProjectFortress/tests/VectorMatrixCastsWalk.fss` (each operation's type and elements at the eight number types); the compiled checker, run over the library, reports none of these sites and no api declaration missing from the component.
- The reason: the compiled checker's refusals, "Function body has type Array1[\T,0,s0\], but declared return type is Vector[\T,s0\]." and its `Matrix` and factory-arm twins, "Could not check call to function Col ... is not applicable to an argument of type Array[\T,(ZZ32, ZZ32)\].", and "Component FortressLibrary exports API FortressLibrary but does not define all declarations in FortressLibrary. Missing declarations {...}" over the 14 products, `array3()` and the two ranks; and the specification's export rule, "The header and type of d' must be the same as the header and type of d" (`Specification/basic/components/apis.tex:249-256`). The `cast` and the leaf redeclaration are the library's own devices for a result's precise type (`Library/FortressLibrary.fss:33-37`, `:2407-2414`, `:2585-2592`).

#### Provenance

- P-40: the unused sizes of the api's 17 vector and matrix operators by decision E's diff, which the curator read and took (ask 3, 2026-10-20; `explorations/perf-probes/array-sites/e3-rebased.patch`), built with the array sites' other fixes; F-35 for the sizes' history.
- P-27, the library's own practice as the standard; P-85's three array questions left open, which these ways need none of; P-87, no model line changed.
- F-260 and the array probe, `explorations/perf-probes/array-sites/REPORT.md` with `ways.patch`; the ways note, `explorations/reviews/array-sites-ways.md`, sections 1 to 5 (1a, 1c, 2a, 3d, 4d, 4f).
- The batch record's forks 4 (the ways as the patch), 5 (the two ranks commented out of the api, a point for the curator's review) and 6 (the walk guard at the eight number types), at their defaults.
- Rows 678 (closed) and 465 (noted); climb batch 20, rung A.

Lines on `main`: the change cites the team's tree at `a874948ac`, and the rung's tree for what the tree now does; rung I's hunks put each of those one line lower in the api and two lower in the component on `main`: the operators `Library/FortressLibrary.fsi:1654-1681`, `:1781-1803`; the ranks' comment `.fsi:1501-1504`; `array3(v)` `.fsi:1868`; the leaves' `fill` and `tabulate` `.fsi:1625-1626`, `:1747-1748`, `.fss:2527-2534`, `:2848-2855`; the casts `.fss:2536-2542`, `:2857-2861`, `:2564`, `:2575`, `:2965`, `:2707`, `:2711`; the precedents `.fss:2409-2416`, `:2587-2594` (`cast` itself, `:33-37`, stands). The provenance's "465 (noted)": the note was refused for length (above). Skill sentences made false: none, by the rung's report (section 7: `library.md:26` and `revival-changes.md:79-83` on `fill` and `tabulate` stay true); the skill's part on revival changes gains this change.
