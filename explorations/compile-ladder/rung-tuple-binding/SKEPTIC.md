<!-- The skeptic's check of rung D of climb batch 32, a top-level tuple binding on the compiled path: what was checked, the programs run old against new, the fixes with their tests, and the verdict. -->

# Rung D, rung-tuple-binding: the skeptic's check

Head judged: `1852f7296f` (code `47aad62914`). Head after: this file's commit, over `c91b3ad3b5`. Verdict: **approved**, with the fixes below; none is contested.

Machine for every run: 4 CPUs, Intel Xeon 2.10 GHz, OpenJDK 25.0.4.1, one other agent of the batch working beside this one.

## What was checked

1. **The stages.** The worker's count table and distance table are those the report declares: `diff` of the count table with `explorations/compile-ladder/climb-batch-30/gate/checker-count.txt` prints nothing, and `explorations/coordinator/tools/distance/compare.sh` on the distance table prints `DISTANCE SAME   0`. The count stage started at 02:18:56 and the distance stage at 02:31:20, both after the last change of code (02:09:53, built 02:10). My own count runs, one session, the command of the skill's `compiler.md`, "The checker's time": base build 89.9 s, the worker's head 99.9 s (the worker: 92.6 s and 80.5 s), the same order of size. My two tables are equal, my head table equals the worker's and climb batch 30's, and the `run.txt` files are equal after each tree's path is replaced by one word (33 lines).
2. **Test first.** The worker's transcript shows the test failing through `junit.sh` on the base's code at 02:01:48 (`Tests run: 4,  Failures: 4`, '** bug! Result of typechecking still contains intermediate nodes.' and 'tupled lhs not handled'), the first edit of source at 02:04:56 and the first build at 02:05; the tests in their final form failing on the old code at 02:35:09 (`Tests run: 6,  Failures: 6`); and `OK (7 tests)` at 02:17:42, after the last change of code.
3. **The diff**, line by line, against the section, `Specification/basic/variables.tex`, "Top-Level Variable Declarations", P-9, P-173 and forks D1 and D2. The checker's edit types the rebuilt tuple and nothing else. The code generator's edit is confined to top-level variables. One defect and one device: below.
4. **Precedent.** The hidden variable and the typed getters follow the local form (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4482-4503`). `isWildcard` repeated `NodeUtil.isUnderscore` (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:710`): fixed.
5. **The tests** exercise the defect; their citations name file and section. Six of them carried more than one comment line: fixed.
6. **My own programs**, 40 under `tmp/rung-tuple-binding/skeptic/p/`, each on the compiled path with the rung's build at one thread and at four, under walk, and on the compiled path with the old code. Walk's code is not in the diff, so walk was run on the rung's tree only.
7. **Homes, ledger, siblings, names.** `ledger.py find` for 'tuple binding', 'tuple', 'nested tuple', 'initializer', 'declared type', 'tuple coercion', 'close method scope', 'numeral tuple': no row holds the defects below. No name that the rung adds has a competing declaration in the test folders or under `ProjectFortress/src/com/sun/fortress/`.
8. **The report**: its five provenance lines and every cited line opened; each says what the report claims. One line range moved with my fix and is corrected.

## Programs run old against new

`new` is the worker's head unless marked; `old` is the base build's code through `old-fortress.sh`. Every compiled run gave the same output at `FORTRESS_THREADS=1` and `=4`.

| program | old, compiled | new, compiled | walk |
|---|---|---|---|
| the model's lines 17 to 19 with prints | '** bug! … intermediate nodes' | 1093, 1.8500100099999999, 1.0E-5, 1.0E-8 and the two paths | the same |
| `(a: ZZ64, b: RR64) = (x, r32)`, values that convert; `(c, d): (ZZ64, ZZ64) = two()` | 'tupled lhs not handled' | 3, 1.5, 7, 8 | the same |
| `var (hits, misses): (ZZ32, ZZ32) = (0, 1000)`, updated in `atomic` by 500 iterations of a parallel `for`; `(step, rounds) = bounds()` | 'tupled lhs not handled' | 1000, 500, PASS at one thread and at four | the same |
| `(a, b): (ZZ32, ZZ32) := (1, 2)`, `var (c: ZZ32, d: RR64) = (3, 2.5)`, `(k, m): ZZ32... = (8, 9)`, then `(a, b) := (b, a)` | 'tupled lhs not handled' | 2, 1, 11, 3.5, 9 | the same |
| `(huge, small) = (3000000000, 1)`, `(neg, f) = (-3, 2.5)`, `(u: NN32, v) = (5, 6)`, each read at `ZZ64`, `ZZ32`, `RR64`, `NN32` | 'tupled lhs not handled' | 3000000000, 4, 2.5, 5 | the same |
| `(u: NN32, v) = (-1, 6)` | 'The numeral -1 is out of range for NN32' | the same | 'Type mismatch binding' |
| `(t, n) = ((1, 2), 3)`; `(u, v): ((ZZ32, ZZ32), String) = nest()` | '** bug!', 'tupled lhs not handled' | 6; 30, s | the same |
| `total = nA + nB` above `(inc, nA) = (fn …, 10)` and `(nB, tag) = (twice(nA), "lbl")` | '** bug!' | 30, 25, lbl | the same |
| an api's `(width, title): (ZZ32, String)` and `var (tally, spare): (ZZ32, ZZ32)`, imported and assigned | 'tupled lhs not handled' | 50, wide | the same |
| `(o: Object, s: String) = (1, "x")`, then `k: ZZ32 = o` | 'Right-hand side has type Object, but declared type is ZZ32.' | the same | 1, x |
| `(a, b) = (1, 2, 3)`; `(a, b, c) = two()`; `(a, b) = 5` | '… but left-hand side is a tuple of 2 variables.' and its kin | the same | 1; a Java `IndexOutOfBoundsException`; 'Missing value: $0' |
| `(a, b) = (b + 1, a + 1)` | 'Cannot infer type for variable b because it has reference cycle' | the same | a Java `NullPointerException` |
| `(a, b): (ZZ32, ZZ32) = (b + 1, 5)` | 'tupled lhs not handled' | `ExceptionInInitializerError`, a `NullPointerException` on the hidden variable | a Java `NullPointerException` |
| `(_, _) = (note(), note())`, `(_, kept) = (note(), 4)`, `note` counting | '** bug!' | 4, then 1 call | 4, then 9 calls |
| **`(g: ZZ64, h) = two()`**, `two(): (ZZ32, ZZ32)` | 'tupled lhs not handled' | compiles; `VerifyError` in `S1Wide$g.<clinit>`; after `a29032ee89`: 3000000007, 8 | 3000000007, 8 |
| **`(e: String, f) = two()`**, then `e \|\| "!"` | 'tupled lhs not handled' | compiles; `ClassCastException`; after `a29032ee89`: 'Right-hand side has type (ZZ32, ZZ32), but declared type is (String, ZZ32).' | 'Type mismatch binding 7: ZZ32 (type ZZ32) to e (type String)' |
| after `a29032ee89`: `(g: ZZ64, h) = pair`, `(_, k: ZZ64) = two()`, `(g: ZZ64, h) = once()` with a counter | — | 3000000007, 8; 3000000008; true, 10, 10, 1 call | 3000000007, 8; 3000000008; false, 30, 30, 3 calls (NEW-D-1) |
| a local `(total: ZZ64, part) = two()` | compiles; `ClassCastException` | the same | 3000000007, 8 |
| a local `(m, n): (ZZ32, ZZ32) = if flag then (1, 2) else (3, 4) end` | 'Error trying to close method scope' | the same; at the top level an `ArrayIndexOutOfBoundsException` in ASM's `Frame.merge` | 3 |
| `pair(k: ZZ32): (ZZ32, ZZ32) = do (1, k) end` | 'NoClassDefFoundError: fortress/CompilerBuiltin$v' | the same | 6 |

The cyclic binding of the fourteenth line is a program in error on both paths: a single `a: ZZ32 = a + 1` ends the same way on the old code and on the new.

## Fixes

### 1. A defect of the change: a declared name beside names without a type was not checked (`a29032ee89`)

Finding. Where only some names of a top-level tuple binding declare a type, and the right side is no tuple expression of as many elements, the checker's general case typed the names without one from the right side and kept the declared ones as written, unchecked (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:318-323`). The base's code generator stopped every such program; the rung's code generator compiles it, so the program ran ill-typed: a loud stop became a quiet value or a failure of the JVM's verification.

Settled by: "The static type of expr must be a subtype of Type" (`Specification/basic/variables.tex:65`), "All forms can be used with tuple notation" (`:99`), and "There is a coercion from a tuple type X to a tuple type Y if …" (`Specification/basic/conversions-coercions.tex:768`), which the checker already applies where every name declares a type.

The ways: (a) signal where an element's type is no subtype of the declared type, which would refuse `(total: ZZ64, part) = two()` though the fully typed form and walk convert it; (b) check the right side again against the tuple of each name's type, declared or read from the first check. Taken: (b), in the top-level case only, 12 lines (`Decls.scala:324-336`). A single binding does not reach it: one name declares a type or none does. The local case has the same gap and is left as it is, since a local tuple binding's typing is a reserved point and the interpreter's library, which the count stage checks, has local tuple bindings: row NEW-D-4.

Failing, on the worker's head, before the edit:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests TopLevelTupleBindingMixedTypes.test XXXTopLevelTupleBindingMixedRefused.test LocalTupleBindingMixedTypesLink.test XXXLocalTupleBindingMixedTypes.test
    . compile ProjectFortress/compiler_tests/TopLevelTupleBindingMixedRefused
     Saw failure, but did not satisfy compile_err_contains; expected
    F. run ProjectFortress/compiler_tests/TopLevelTupleBindingMixedTypes (516ms) java.lang.VerifyError
        TopLevelTupleBindingMixedTypes$total.<clinit>()V @8: putstatic
    Tests run: 6,  Failures: 2,  Errors: 0

Passing, after the last change of code:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skfinal ProjectFortress/compiler_tests TopLevelTupleBindingMixedTypes.test XXXTopLevelTupleBindingMixedRefused.test … TopLevelTupleBindingCompiled.test XXXTopLevelTupleBindingType.test TopLevelTupleBindingImport.test XXXTopLevelVarByAssignExport.test
    . compile ProjectFortress/compiler_tests/TopLevelTupleBindingMixedRefused … Saw expected failure
    . run ProjectFortress/compiler_tests/TopLevelTupleBindingMixedTypes (474ms) PASS
    OK (16 tests)

### 2. `isWildcard` asks `NodeUtil.isUnderscore` (`ddfd231caf`)

The rung compared the name's text with "_" where the tree has `NodeUtil.isUnderscore`. No behaviour changes; the wildcard lines of `TopLevelTupleBindingCompiled` pass before and after.

### 3. Corrections

- `0ab8dc21a1`: one comment line in each of six tests of the rung; no assertion changed.
- `2e52c7ec0c`: three home-2 tests of defects that my programs met and the base has too, each green as an expected failure on the head and on the old code (`OK (16 tests)` above; on the old code '. compile …/XXXTupleBindingIfBranchesCompiled … OK Saw expected exception', and both run tests print REACHED and then fail). The first, `XXXLocalTupleBindingMixedTypes`, with its binding fully typed for one run: 'Did not see expected failure', `Tests run: 2,  Failures: 1`; then restored.
- `c91b3ad3b5`: `record.md`'s finding, suite line, rows NEW-D-4 to NEW-D-6, handover line and revival change; `REPORT.md`'s line range `Decls.scala:248-338`, `:349-438`, and a last section that names these commits.

### The whole suite

The checker edit's suite, once, after the last fix of code (the code of `ddfd231caf`):

    $ ant testQuick
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0
    [junit] Tests run: 1585, Failures: 0, Errors: 0, Skipped: 0
    BUILD SUCCESSFUL

The run held `XXXTupleBindingFloatElementCompiled`, a first form of NEW-D-5's test whose essence was wrong; `XXXBlockEndsInTupleOfNumeralCompiled` replaced it afterwards, two cases for two, and is in the `OK (16 tests)` run. No count or distance stage ran after the fixes: the report's tables are those of the worker's head, and the gate's tables on the merged tree are the record. The atomic runs were not repeated: the fixes change no code of a mutable variable's class.

## Where I differ from the worker's account

- The record's finding said that the form holds for names typed one by one over a call. It did not where other names had no type; it does after fix 1.
- Decision 3 of the report, a binding of wildcards only emits nothing: the right side is then never evaluated on the compiled path (`(_, _) = (note(), note())` above). It follows the lazy single variable and is part of the worker's second question for the curator; I add it there.
- The report's "before" for the model's lines is the planner's run, not a run of the worker's on the base; the planner's note holds it (`explorations/compile-ladder/plan-31/probes/model-closure-check.md:45-58`), and my own program of the three lines stops on the old code as that note says.

## The failure-mode question

The rung turned a stop of the compile into a running program. Where the value is quiet: a wildcard-only binding's right side never runs, and a binding's right side runs at the first read of a name, not at load (the worker's second question). The mixed binding's unchecked name was the one quiet wrong value, repaired by fix 1. A cyclic binding with declared types ends in a Java exception on both paths, as a single cyclic variable does.

## Verdict

Approved. The change does what the section asks, test first; with fix 1 a declared name of a top-level tuple binding is checked in every form. Rows 988 and 474 close as `record.md` says; rows NEW-D-1 to NEW-D-6 are new.
