<!-- Climb batch 24, rung K (rung-natives-choose): the skeptic's check of the CHOOSE helpers' fix and the two moved bindings, with two corrections and no contested fix. -->

# Rung K's skeptic: approved, with two corrections

- Head judged: `00e620a3f`, the worker's last commit. My commits: `755ea104f` (the worker's report and record, from the run's journal), `17929b443` (a test correction), `603a98bd6` (a report correction), and this file.
- Verdict: **approved**. The change is right, small and the precedent's; the record is honest. Neither correction changes code, so no suite and no stage ran after them. The report's count and distance tables are those of the worker's head `00e620a3f`, and the gate's tables on the merged tree are the record.

## 1. The stages

The report's tables are the worker's files. `tmp/rung-natives-choose/checker-count-postedit.txt` reads '#total	0', '#locations	0', '#crash	none', and `diff` against `explorations/compile-ladder/climb-batch-23/gate/checker-count.txt` prints nothing. `count-run.txt` ends 'real	2m27.019s'. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-23/gate/distance.txt tmp/rung-natives-choose/distance-postedit.txt` prints 'DISTANCE SAME   0', and the table reads '#crash	none', '#seconds	213	FortressLibrary 161'. The diff changes no checker code (only `nativeHelpers/`, the library and tests), so I ran no count stage of my own.

## 2. Test first, in the worker's transcript

Transcript `agent-a03efbd5c6dbe7228.jsonl`, times UTC, call ids' last six characters:

- 12:50:23 (`15kaiN`): the probe's tests applied with `git apply --include` of the test paths only; 12:50:30 (`vRoPDu`) the `git mv` of the `XXX` pair; 12:51:28 to 12:51:50 the `ZZ64` tests.
- 12:52:00 to 12:52:17 (`bMY1Sd`, `FGdQ1a`): `harness-one.sh .../h-before` on the five walk files: 'Wrapped exception java.lang.ArrayIndexOutOfBoundsException: Index 15 out of bounds for length 15', '... Index 32 out of bounds for length 32', 'Tests run: 5,  Failures: 2,  Errors: 0'; the guards `ChooseZZ32Walk` and `ChooseZZ64Walk` and `PowChooseLcmRungE` 'OK'.
- 12:52:35 to 12:52:46 (`dpqP4e`, `wvqegq`): `ONE_JVM=1 junit.sh before ...`: 'F. run ProjectFortress/compiler_tests/ChooseHelperZZ64Compiled (290ms) java.lang.ArrayIndexOutOfBoundsException', 'F. run ProjectFortress/compiler_tests/ChooseTableCompiledRungE (259ms) REACHED', 'Tests run: 7,  Failures: 3,  Errors: 0'.
- The first edit of code: 13:00:49 (`2RQupr`, the two helpers), 13:00:59 (`hFmHic`, the two library strings); the build 13:03:58 (`kBCPLj`), 'Caches ... started again, empty', then the library order. Every failing run ended before these.
- After the last change of code: 13:05:24 (`9HpZV7`) 'OK (5 tests)'; 13:05:57 (`5CJ5zP`) 'OK (7 tests)' and 'OK (27 tests)' for `library_tests/Integer.test`; 13:11:52 (`MSBfA3`) `ant testQuick` 'BUILD SUCCESSFUL' (86, 263, 1343, no failure); 13:17:53 (`TcEN34`) `ant testSystem` 'BUILD SUCCESSFUL' (182, 171, 170, 175). No source or library edit follows 13:00:59; the commit `00e620a3f` at 13:27:46 (`UEM2kF`) holds that code.

The full helper tests stop at their first overflow past the table on the base, before their parallel loops. The worker showed the race by itself with scratch copies holding only the loop, 3 of 3 failing on each path, as the probe did. I take that as the order's step 2 for the loops.

## 3. The diff

`git diff b0f6cd6b7...00e620a3f -- ProjectFortress/src Library`: in each helper, the static scratch array removed and a per-call `new int[k]` / `new long[k]` in the slow path; the guard `k > maxIntChooseN` / `kk > maxLongChooseN` replaced by `k - 2 >= maxIntChooseSafeN.length` / `kk - 2 >= maxLongChooseSafeN.length`; the two strings at `Library/FortressLibrary.fss:789` and `:882`. `simpleIntArith` is the probe's patch byte for byte (its hunk, `explorations/compile-ladder/plan-24/probes/choose.patch:76-107`); `simpleLongArith` is its form.

The guards are exact. Past the table the folded `k` is at least 17 (`ZZ32`, `n` at least 34) or 34 (`ZZ64`, `n` at least 68), and for `k` up to `n/2` the coefficient grows in both `n` and `k`, so every such coefficient is at least `34 CHOOSE 17` = 2,333,606,220 or `68 CHOOSE 34` = 28,453,041,475,240,576,740, past the type. Python's `math.comb` gives the first overflowing `n` for each `k`, from `k` = 2 to 16 on `ZZ32` (65537, 2346, 478, ..., 34) and 2 to 33 on `ZZ64` (4294967297, 3810780, ..., 67), and my programs (section 5) test the values on each side of each one. After the guard, `(int)kk` meets only `kk` at most 33, and the per-call array has at most 16 or 33 entries, the old arrays' sizes. The static initialisers fill the Pascal tables through the table branch, which comes before the new guard. The edit does what the report says, and only that. P-58 ('Every native binding is a `builtinPrimitive` call naming a static helper', `explorations/coordinator/POSITIONS.md:55`) gives the two strings their form.

## 4. Where the fix belongs, and the sibling sites

The defects are in the two helpers, which both paths run. The worker's count of the precedent's sites holds on the base build: `grep -n 'static[^(]*\[\]' nativeHelpers/*.java` prints six arrays, the two scratch arrays (`simpleIntArith.java:121`, `simpleLongArith.java:105`), two Pascal tables and two constant bound tables. No other line of `nativeHelpers/` declares a static field outside those two classes but `DeterministicRandom.NUMBER_OF_MIXES`, a constant. The other widths: `NN32`'s compiled `CHOOSE` goes through `simpleUnsignedIntArith.unsignedIntOverflowingChoose` (`simpleUnsignedIntArith.java:80-82`) to the `ZZ64` helper and gains both fixes; `NN64` has no compiled `CHOOSE`; `ZZ`'s compiled `CHOOSE` is Fortress code (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:555`) and walk's is `BigNum$Choose`, untouched. Walk's glue `Int.choose` (`interpreter/glue/prim/Int.java:360-386`) keeps no state. No other library string names `Int$Choose` or `Long$Choose`.

## 5. My programs, the differential

Under `tmp/rung-natives-choose/skeptic/`, scratch. Each program checks `CHOOSE` against its own oracle, the multiplicative formula over `ZZ64` with a `GCD` and an overflow test (no `CHOOSE` in it), and prints `MISMATCH` for each disagreement and `DONE` at its end. Each ran four ways, each at `FORTRESS_THREADS=1` and `=4` (the diff removes shared state):

    bin/fortress P.fss                                          # walk, the rung's build
    old-fortress.sh /home/user/fortress-base23 /home/user/fortress-natives-choose/tmp/old-caches P.fss      # walk, old code
    bin/fortress compile P.fss && bin/fortress run P            # compiled, the rung's build
    old-fortress.sh ... compile P.fss && old-fortress.sh ... run P                                         # compiled, old code

- `ChooseSkA`: every `n` from -3 to 140 with every `k` from -3 to `n+3`, and 1,494 pairs at the edges of both safe-bound tables and at each first overflowing `n`, on `ZZ32` and `ZZ64`, nothing past the tables. A counting copy under walk: 'A rc=0 checked=14759 ovf=4813 zero=1722'. Walk new and old, 1 and 4 threads: 0 mismatches, 'DONE'. Compiled new, 1 and 4: 0, 'DONE'. Compiled old, 1 thread: 0, 'DONE'; 4 threads: 'MISMATCH ZZ32 40 CHOOSE 30 got -1 want 847660528', 'MISMATCH ZZ32 101 CHOOSE 6 got -1 want 1267339920', then 'java.lang.UnknownError', rc=1.
- `ChooseSkB`: every pair past the tables, `n` from 34 to 140 on `ZZ32` and 68 to 200 on `ZZ64`, and `MAX CHOOSE MAX DIV 2`, all expected `IntegerOverflow`. Walk new and old, both counts: 0, 'DONE'. Compiled new, both: 0, 'DONE'. Compiled old, both: 'Caused by: java.lang.ArrayIndexOutOfBoundsException: Index 15 out of bounds for length 15', rc=1.
- `ChooseSkC`: the slow paths in parallel loops, every `k` from 2 to 16 (`ZZ32`) and 2 to 33 (`ZZ64`) between its safe-bound entry and its first overflowing `n`, up to 3,000 values each: 'C rc=0 checked=18264'. Walk new and old, both counts: 0, 'DONE'. Compiled new, both: 0, 'DONE'. Compiled old, 1 thread: 0, 'DONE'; 4 threads: 'MISMATCH ZZ32 47873 CHOOSE 2 got 1075529010 want 1145888128', four more, then 'FortressException: class fortress.CompilerBuiltin$IntegerOverflow with string Integer overflow', rc=1.
- `ChooseSkD`, walk only: `CHOOSE` through a generic over `Integral[\I\]` at `ZZ32`, `ZZ64` and `ZZ`, on two numerals, on a `ZZ32` and a `ZZ64` (promoted), and inside `SUM` and `BIG MAX`. New and old, 1 and 4 threads, equal line for line: 'generic ZZ32 40 CHOOSE 20: OVF', 'generic ZZ64 40 CHOOSE 20: v 137846528820', 'numerals 68 CHOOSE 34: OVF', 'mixed ZZ32 50 CHOOSE ZZ64 25: v 126410606437752', 'SUM 62 CHOOSE k: 4611686018427387904', 'BIG MAX n CHOOSE 3: 2146453540'.
- `ChooseSkE`, `NN32`'s `CHOOSE` against the oracle, compared as text: every pair to `n` = 140 and the slow paths at `k` = 2, 3 and 4. Compiled new at 1 and 4 threads and old at 1: 793 lines each, every one row 326's rendering of an `NN32` above its signed half (`got` + 2^32 = `want`, as 'MISMATCH NN32 34 CHOOSE 17 got -1961361076 want 2333606220'), no other. Old at 4: 82 such lines, then 'java.lang.UnknownError: THIS SHOULDN'T HAPPEN in longSlowCautiousChoose'. Walk, where `NN32`'s `CHOOSE` stays on its glue class: 0, new and old.
- `ChooseSkF`, `NN32` past the table (`68 CHOOSE 34`, `1000 CHOOSE 40`, `100 CHOOSE 50`, `MAX CHOOSE MAX DIV 2`): compiled new 0, 'DONE'; old 'Caused by: java.lang.ArrayIndexOutOfBoundsException: Index 32 out of bounds for length 32'.
- `ChooseSkU`, walk: an uncaught `ZZ64` `68 CHOOSE 34`. New and old print the same lines: 'IntegerOverflow', 'Context:'.

So walk and the compiled path agree with each other and with the oracle on the new code, at both thread counts. Under walk no value moves (about 48,000 checks, and D). On the compiled path the old code's only departures are the two rows'.

A first spelling of these programs, a function whose body is `try widen(n CHOOSE k) catch e IntegerOverflow => -1 end` at result type `ZZ64`, stopped the code generator on both builds, 'Error trying to close method scope'. Row 340 already holds it: its notes name 'a `ZZ32` function's `try` body with a numeral `catch` value'. The `NN32` lines are row 326. Neither is new, and neither is this rung's.

## 6. The three homes

- Row 521, all three halves: home 1, in the plain gated tests: `ChooseHelperWalk`, `ChooseHelperCompiled`, `ChooseHelperZZ64Walk`, `ChooseHelperZZ64Compiled` (with `NN32` at its lines 71 to 74 on my head) and the promoted `ChooseTableCompiledRungE`.
- Row 855, both halves: home 1, in the parallel loops of the same four helper tests.
- My programs measured no other defect.

## 7. The ledger

`ledger-find` for `CHOOSE`, `binomial`, `scratch`, `static array`, `simpleLongArith`, `simpleIntArith`, `safe-bound`, `longOverflowingChoose`, `Int$Choose` and `parallel helper` gives rows 521 and 855, and these: 327 (`ChooseTest3.fss`, which no `.test` names), 334, 337, 379, 519 and 520 (walk, closed), 350 (the compiled `IntegerOverflow` carries no value), 381, 441, 523 and 524 (other operators), 845 (a written `import java` under walk). None changes with this rung, and none is a sibling of its defects. The record's close of 521 and 855 by `00e620a3f` with the tests the brief names is right, and the close of 521 must come before `ledger.py landing-check`, since the row's reproducer is the renamed `XXX` file.

## 8. The report

- The five provenance lines: each cited line opened. Row 521 at `explorations/fortress-gap-ledger.md:538`, row 855 at `:548`, `explorations/coordinator/CLIMB-BATCH-23.md:43`; `Specification/basic-lib/basic-integers.tex:607-611`; `Specification/basic/operators/opr-overview.tex:155`, `:258-260`; `simpleIntArith.java:64`, the raise of `intOverflowingAdd`; `Library/FortressLibrary.fss:741-810`, 18 `simpleIntArith` strings and `unsigned`'s at the base, 19; `ChooseHelperZZ64Walk.fss:17`; `ChooseHelperZZ64Compiled.fss:72-75` (71 to 74 after my correction); `ChooseTableCompiledRungE.fss:1`; `simpleLongArith.java:177`. Each says what the report claims, except the patch citation, corrected (section 9).
- The record's citations at `a874948ac`: `simpleIntArith.java:121`, `:209`, `:211`; `simpleLongArith.java:114`, `:191`, `:194`; `CompilerBuiltin.fss:604`, `:666`, `:729`. Each holds what it says.
- Sentences made false: the worker's list is whole. The Effect's three sentences at `Specification/appendices/changes.tex:4466`, `:4473` and `:4474-4477` (for the gather, fork 7); the rest of the Effect (`:4478-4502`) stays true, and no other sentence of `Specification/` names the helpers, their table or the two rows. F-299's count and its "`ZZ32`'s `CHOOSE` among them (row 521)"; F-32's 428; F-132's "`CHOOSE` past its helper's table dies with a Java exception (row 521)"; P-73's "and at `CHOOSE` (row 521)"; `PLAN.md:51-52`. F-125's "`CHOOSE` answers 0 for `k < 0` or `k > n`" stays true. The skill names no `CHOOSE` behaviour.
- The suites: the skill's `tests-running.md`, "When to run a whole suite", asks both for a class under `nativeHelpers/` that a library string names; both ran once, on the head's code, as section 2 gives.
- The record's FACTS entry, findings, rows and Revival change are true as written. Its count of 23 helper bindings is this tree's (21 + 2).
- Competing names: each of the seven new test names occurs only in its own files, in `ProjectFortress/` whole and in the six sibling worktrees.

## 9. Corrections

1. **Each new test carried two comment lines** (at `00e620a3f`: `ProjectFortress/tests/ChooseHelperWalk.fss:20`, `ChooseZZ32Walk.fss:18`, `ChooseHelperZZ64Walk.fss:22`, `ChooseZZ64Walk.fss:22`, `ProjectFortress/compiler_tests/ChooseHelperCompiled.fss:20`, `ChooseHelperZZ64Compiled.fss:32`): the probe's form, a second comment holding the specification citation. The skill's rule is one comment line (`.claude/skills/fortress-repo/references/tests-writing.md:134`, "Give it one comment line that says what it checks, with no pointer to a record."), and the tree's precedents cite in messages (`tests/PowChooseLcmRungE.fss`, `compiler_tests/ChooseTableCompiledRungE.fss`). The citation moves into the messages of each file's first exact value and first overflow, by file and section (`tests-writing.md:135`); no assertion or value changes. Through the harness on my head: `harness-one.sh .../h-head` on the four walk tests 'OK (4 tests)'; `ONE_JVM=1 junit.sh skhead ProjectFortress/compiler_tests ChooseHelperCompiled.test ChooseHelperZZ64Compiled.test` 'OK (4 tests)'. On the old code: `FORTRESS_HOME=/home/user/fortress-base23 .../harness-one.sh .../h-base` 'Wrapped exception java.lang.ArrayIndexOutOfBoundsException: Index 15 out of bounds for length 15', 'Tests run: 4,  Failures: 2' (the two guards 'OK'); `old-fortress.sh ... junit` 'Tests run: 4,  Failures: 2'. Commit `17929b443`. Where I differ from the worker: its report says the probe's tests were taken as written, which they were; this is the one change to their text.
2. **The patch citation** `explorations/compile-ladder/plan-24/probes/choose.patch:76-111` (REPORT.md, the precedent line and section 3) ran four lines into the next file's header; the hunk is `:76-107`. Commit `603a98bd6`.

## 10. The failure-mode question

The rung turns two loud failures into the specification's answers. Past the table, a raw `ArrayIndexOutOfBoundsException`, which no `catch` sees and which ends the run, becomes a catchable `IntegerOverflow` (`opr-overview.tex`, "Multiplication, Division, Modulo, and Remainder Operators": "For integer results, overflow throws an IntegerOverflow."). In parallel calls, a raw `UnknownError` or a false `IntegerOverflow` becomes the coefficient (`basic-integers.tex`, section "Integers", opr `CHOOSE`). No loud failure becomes a quiet wrong value: past the table every coefficient overflows (section 3), and my programs found no value the oracle disputes. Under walk nothing changes, since the glue class already raised `IntegerOverflow`.

## 11. Points to report, and the curator

The worker's seven points stand as listed, with their evidence. My two corrections edit test files in `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/` and this rung's report, inside the section's files. The worker's question on P-73's `CHOOSE` clause (`explorations/coordinator/POSITIONS.md:80`) stands; I have no other.
