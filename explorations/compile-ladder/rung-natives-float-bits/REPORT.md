<!-- Climb batch 25, rung D (rung-natives-float-bits): Float's 27 bit and rounding bindings and the top-level fromRawBits name 28 new one-line simpleDoubleArith helpers, each computing as its glue class does (P-58; F-303). -->

# Rung D: Float's bit and rounding operations, 27, and fromRawBits

- problem: the planner's table of N3 gives this rung 28 bindings whose helper does not exist yet, `Float`'s 27 and the top-level `fromRawBits`, each with its glue class's computation (`explorations/coordinator/CLIMB-BATCH-25.md:373`; `explorations/compile-ladder/plan-25/probes/n3-base.tsv:34`, `:39-65`); F-303 counts them among `Float`'s 32 still on glue classes (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:60-153` at 97a416b18)
- spec: none for the binding (`grep -rn builtinPrimitive Specification/basic Specification/basic-lib` prints nothing) nor for `isNaN`, `isInfinite`, `rawBits`, `nextUp`, `nextDown` or `fromRawBits` (`grep -rn 'nextUp\|rawBits\|isNaN\|fromRawBits' Specification/basic Specification/basic-lib` prints nothing); the directed roundings' modes are IEEE 754's, `Specification/basic/operators/opr-overview.tex:178-188` and `:211-219`, which no value of this rung changes
- precedent: the planner's `explorations/compile-ladder/plan-25/probes/sample-D.patch:1-82`; climb batch 24's rung F, `Float`'s 30 strings (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:55-193`, `5ecb7a841`) and its guards' forms, `ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss:1-256` and `ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled.fss:1-262`
- deviation: the sample's five helpers and strings as they are, without its source comment naming the planner (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:136`); the guards assert every float result through `asString`, which tells `-0.0` from `0.0` (`ProjectFortress/tests/NativeHelperFamilyFloatBitsWalk.fss:104`); one more walk test, the reproducer of row NEW-D-1 (`ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss:1-16`); the guards leave out a division by zero (row 863), a comparison, `MIN` or `MAX` with a NaN (row 672), the bits of a computed NaN, and `nextUp` of `-0.0` and `nextDown` of `0.0` (row NEW-D-1)
- historical: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `Library/FortressLibrary.fss`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java`

## How the rung ran

The worktree was seeded from `/home/user/fortress-base25` by `seed-worktree.sh` (exit 0, 4 s) and the branch pushed. The tests came first: the walk guard seen passing through the harness on the base's code at 00:09:01 UTC, the compiled guard seen failing through `junit.sh` on the base's code at 00:11:27, and the reproducer of NEW-D-1 seen passing there at 00:11:46, all before any source was edited; then the sample applied and the rest written, built ('BUILD SUCCESSFUL', 'Caches … started again, empty'), the library order (five jars), the tests on the edit, `ant testQuick`, `ant testSystem`, the count stage, the distance stage, the ladder subset, the old code beside the new, a one-binding mutant sweep of the walk guard, and the tests once more on the final code. Commits on `wip/rung-natives-float-bits`: `cebedcbfb` (the tests), `c0b8dc0ed` (the edit), and this report with `record.md`. The machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, openjdk 25.0.4.1, other rungs running beside (load 0.3 to 12.7); every build, suite, stage and program under `nice -n 19`, one JVM command at a time.

## What changed and why

- `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:136-246`: 28 public static helpers at the class's end, each one line that returns what its glue class's `f` returns (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java:94-98`, `:136-242`, `:250-254`, `:280-290`, `:394-434`): `doubleIsNaN` and `doubleIsInfinite` (`Double.isNaN`, `Double.isInfinite`), `doubleRawBits` (`Double.doubleToRawLongBits`, a `long`), `doubleNextUp` and `doubleNextDown` (`DirectedRounding.nextUp`, `nextDown`), `doubleToFloat` (`(float) a`, a `float`), `doubleNE` (`a != b`), `doubleMin` and `doubleMax` (`Math.min`, `Math.max`), the ten NaN-free roundings and roots `doubleAddUpNoNaN`, `doubleSubUpNoNaN`, `doubleMulUpNoNaN`, `doubleDivUpNoNaN`, `doubleSqrtUp`, `doubleAddDownNoNaN`, `doubleSubDownNoNaN`, `doubleMulDownNoNaN`, `doubleDivDownNoNaN`, `doubleSqrtDown` (`DirectedRounding.addUpNoNaN` to `sqrtDown`), the eight IEEE ones `doubleAddUp` to `doubleDivDown` (`DirectedRounding.addUp` to `divideDown`), and `doubleFromRawBits` (`Double.longBitsToDouble`). Each is named `double` and its glue class's name, as the sample's `doubleAddUpNoNaN`; `narrow` and `=/=` take the brief's `doubleToFloat` and `doubleNE`, beside `floatToDouble` and `doubleEQ`. `DirectedRounding` is named in full, as the sample does, so that nothing but the class's end changes. Every parameter and result is `double`, `float`, `long` or `boolean`, which the compiler prelude's wrapper maps, and the prelude's library order made its five jars with the new methods in the wrapper.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:61-153`, `value object Float`, 27 strings, each the one line after its header, one line for one: `isNaN` `:61`, `isInfinite` `:64`, `rawBits` `:67`, `nextUp` `:71`, `nextDown` `:74`, `narrow` `:78`, `=/=` `:84`, `MIN` `:96`, `MAX` `:98`, `PLUS_UP` to `SQRT_DOWN` `:119` to `:137`, `IEEE_PLUS_UP` to `IEEE_SLASH_DOWN` `:139` to `:153`.
- `Library/FortressLibrary.fss:4535`: `fromRawBits`'s string, `doubleFromRawBits`.
- Left on glue classes, as the brief gives: `Float`'s `^` at an `RR32` and at an `AnyIntegral` exponent, `atan2`, `|\self/|` and `|/self\|` (`FortressBuiltin.fss:157`, `:163`, `:177`, `:185`, `:189`), item 331; `:329` is `RR32`'s `^`, rung P's.
- Counted (`git grep -h -o 'builtinPrimitive("com.sun.fortress.nativeHelpers' <rev> -- Library ProjectFortress/LibraryBuiltin | wc -l`): 173 at `97a416b18`, 201 at `c0b8dc0ed`. By F-32's 449 live bindings, 201 name a helper and 248 a glue class, with this rung alone.
- Tests: `ProjectFortress/tests/NativeHelperFamilyFloatBitsWalk.fss` (the walk guard, 247 assertions over the 28), `ProjectFortress/compiler_tests/NativeHelperFamilyFloatBitsCompiled.fss` and `.test` (the compiled guard: `link`, `run`, `run_out_contains=PASS`; one top-level binding per helper of the 28 over `RR64`, `RR32`, `Boolean` and `ZZ64`, with seven bindings of existing helpers to build and read the values; 246 assertions), and `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss` (row NEW-D-1's reproducer, today's values).
- The guards' values: each of the 28 at 0.0, -0.0, ordinary values, 1.0E21, the smallest subnormal (made as `2.0^(-1074.0)` by the existing `^`, not by a binding under test), the infinities (made by an overflow, as climb batch 24's guards do) and NaN, where no row names the result as a departure; each directed rounding at an exact and an inexact operation (`0.1 PLUS_UP 0.2` is `0.30000000000000004` and `0.1 PLUS_DOWN 0.2` is `0.3`), at an underflow and an overflow, and the NaN-free ones at the operands where the IEEE ones give NaN (`infinity PLUS_UP -infinity` is `Infinity`, `infinity IEEE_PLUS_UP -infinity` is `NaN`); `fromRawBits` at 0, 1, the bits of 1.0, -1.0, -0.0, the largest finite value, the infinities and a NaN. Every inexact and overflowing case was checked against exact `BigDecimal` arithmetic rounded by `Math.nextUp` and `Math.nextDown`, independently of `DirectedRounding`; every one agrees.

## The failing run and the passing run

The compiled guard on the base's code, before the edit was first built (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NativeHelperFamilyFloatBitsCompiled.test`, 2026-11-03T00:11:27Z, tree 97a416b18 with the tests not yet committed):

    . link ProjectFortress/compiler_tests/NativeHelperFamilyFloatBitsCompiled ProjectFortress/compiler_tests/NativeHelperFamilyFloatBitsCompiled.fss:13:43-102:
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleDoubleArith.doubleIsNaN
    File NativeHelperFamilyFloatBitsCompiled.fss has 1 error.
    FAILURES!!!
    Tests run: 2,  Failures: 2,  Errors: 0

The walk guard on the base's code (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-float-bits/h-walk-base ProjectFortress/tests/NativeHelperFamilyFloatBitsWalk.fss`, 2026-11-03T00:09:01Z, tree 97a416b18): '. interpret …/NativeHelperFamilyFloatBitsWalk', ' OK (time = 9904ms)', 'OK (1 test)'. The reproducer of NEW-D-1 the same way at 00:11:46: 'OK (1 test)'.

The last runs, on the final code (`c0b8dc0ed`, after the mutant sweep restored the library file, `git diff --quiet c0b8dc0ed -- ProjectFortress Library`):

- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-float-bits/h-walk-final ProjectFortress/tests/NativeHelperFamilyFloatBitsWalk.fss ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss ProjectFortress/tests/NativeHelperFloatCarriedWalk.fss ProjectFortress/tests/realArith.fss`, 2026-11-03T00:43:02Z: 'OK (5 tests)'.
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests NativeHelperFamilyFloatBitsCompiled.test NativeHelperFamilyFloatCompiled.test NativeHelperBindingCompiled.test`, 2026-11-03T00:43:15Z: '. link ProjectFortress/compiler_tests/NativeHelperFamilyFloatBitsCompiled  OK (time = 8260ms)', '. run ProjectFortress/compiler_tests/NativeHelperFamilyFloatBitsCompiled (350ms) PASS', 'OK (6 tests)'.

The mutant sweep: each of 26 moved strings swapped alone for a helper of the same Java signature (`isNaN` and `isInfinite` for each other, `rawBits` for `doubleTruncate`, `nextUp` and `nextDown`, `=/=` for `doubleEQ`, `MIN` and `MAX`, each NaN-free rounding for its IEEE twin, each IEEE rounding and each root for its other direction), the walk guard run through `harness-one.sh` on each: 26 of 26 caught, as 'MUTANT 119 doubleAddUpNoNaN->doubleAddUp CAUGHT | FAIL: J3/0:NaN =/= J8/0:Infinity; infinity PLUS_UP -infinity' and 'MUTANT 139 doubleAddUp->doubleAddDown CAUGHT | FAIL: J3/0:0.3 =/= J19/0:0.30000000000000004; IEEE_PLUS_UP, inexact'; the file restored ('RESTORED clean'). `narrow` and `fromRawBits` have no helper of their Java signature (`float(double)`, `double(long)`) in `nativeHelpers/` to swap in (`grep -rn 'public static double [a-zA-Z]*(long [a-z]*)\|public static float [a-zA-Z]*(double [a-z]*)' ProjectFortress/src/com/sun/fortress/nativeHelpers/` prints only the two new ones); their guard values (`fromRawBits(1)` is `4.9E-324`, `narrow(0.1)`'s bits are 1036831949) are none that a conversion of the number gives.

## Where the fix belongs, and the precedent search

The place: a binding's string and a helper of `nativeHelpers/` (P-58; `explorations/coordinator/map/modules-and-phases.md`, B.12; the skill's `library.md`, "Designing a change": "Write a new native as a public static method of a class under `nativeHelpers/`"), in `simpleDoubleArith`, the class of `RR64`'s helpers (the batch's fork 2), at its end. The precedent: climb batch 24's rung F moved `Float`'s 30 bindings onto existing helpers of this class, one line for one, with a walk guard and a compiled guard (`5ecb7a841`); the planner's sample gives five of this rung's 28 at the class's end in the same form. After this rung, `value object Float` has 5 strings on glue classes (`FortressBuiltin.fss:157`, `:163`, `:177`, `:185`, `:189`), all out of this rung by the brief.

The ways the language and the library offer, and the one taken:

1. A `builtinPrimitive` string naming a new static helper of `simpleDoubleArith` that computes as the glue class: taken (P-58; fork 2).
2. A new helper class for N3's float helpers: not taken; fork 2 keeps one class per number type.
3. Helpers over Java's own `Math.nextUp`, `Math.nextDown` and a hand-written directed rounding: not taken; `Math.nextUp(-0.0)` is `4.9E-324` where the glue class gives `0.0`, so a value would move (row NEW-D-1); the brief asks for the glue class's computation.
4. Fortress bodies over existing natives, as `=/=` by `NOT (self = b)` or `MIN` by `<`: not taken; P-58 keeps a native binding's form, and `Math.min` at the signed zeros and NaN is not `<`'s choice.
5. An `import java` written in the library: not taken (P-58).

## What the specification settles

Nothing of the binding's form, and none of the getters: the specification names no `nextUp`, `rawBits`, `isNaN`, `isInfinite`, `narrow` of a float or `fromRawBits` (grep above). Its operator chapter names the rounding modes ("round toward positive infinity" by `\upplus` and `\upminus`, `opr-overview.tex:211-219`; by `\uptimes` and `\upslash`, `:178-188`) and refers the floats' overflow, underflow and division by zero to IEEE 754 (`:154-168`, `:195-203`). The library's `PLUS_UP` family and its `IEEE_` twins are the library's own spellings; this rung changes no value of either.

## The old code beside the new

A value program printing every result of the 28 at the guards' values and 19 pairs, 136 lines, 458 results, run on the base's code before the edit and on the edit (`bin/fortress ValFloatBits.fss` from the tree's scratch), `diff` of the two outputs printed nothing. Among its lines, the same on both: '0.1 , 0.2 PLUS_UP 0.30000000000000004 PLUS_DOWN 0.3 MINUS_UP -0.1 MINUS_DOWN -0.1'; 'Infinity , -Infinity IEEE_PLUS_UP NaN IEEE_PLUS_DOWN NaN IEEE_MINUS_UP Infinity IEEE_MINUS_DOWN Infinity'; '-0.0 nextUp 0.0 nextDown -4.9E-324 narrow -0.0'; 'nan isNaN true isInfinite false rawBits -2251799813685248'; 'fromRawBits nan NaN rt 9221120237041090560'.

## The suites

- `ant testQuick`, once, on `c0b8dc0ed` (the compiler's prelude imports `simpleDoubleArith`, fork 12): 'Tests run: 86, Failures: 0, Errors: 0' (library), 'Tests run: 263, Failures: 0, Errors: 0' (other compiler), 'Tests run: 1381, Failures: 0, Errors: 0' (compiler: climb batch 24's gate's 1379 and this rung's link and run), 'BUILD SUCCESSFUL', 'Total time: 7 minutes 19 seconds'.
- `ant testSystem`, once, on `c0b8dc0ed`: 'Tests run: 179, Failures: 0', '182, Failures: 0', '183, Failures: 0', '181, Failures: 0', 725 tests (the gate's 723 and this rung's two), 'BUILD SUCCESSFUL', 'Total time: 6 minutes 5 seconds'.
- No test changed its verdict; climb batch 24's `NativeHelperFamilyFloatWalk`, `NativeHelperFamilyFloatCompiled`, `NativeHelperFloatCarriedWalk` and the team's `realArith` pass.

## The stages

Both ran once, on `c0b8dc0ed`, after the build; the before is climb batch 24's landed tables (`explorations/compile-ladder/climb-batch-24/gate/`).

- The count (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-float-bits/checker-count-postedit.txt tmp/rung-natives-float-bits/cc-post`, under `time`, started 00:29:14 UTC at load 11.5): '#total 0', '#locations 0', '#crash none'; `diff explorations/compile-ladder/climb-batch-24/gate/checker-count.txt` against it printed nothing. Its seconds: 'real 2m36.896s', 157 s. No checker code changed, so no speed pass.
- The distance (`explorations/coordinator/tools/distance/run.sh tmp/rung-natives-float-bits/distance-postedit.txt tmp/rung-natives-float-bits/dist-post`, started 00:32:04 at load 4.6): '#total 0', every '#kind' 0, '#crash none', '#seconds 224 FortressLibrary 163'; `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-24/gate/distance.txt <it>` printed 'DISTANCE SAME   0'. Its `errors.tsv` holds only its header, and `explorations/compile-ladder/gate/distance-sites.tsv` only its header: no site moved or came.

## The ladder subset

The files whose recorded first error in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` names an operation this rung touched: `tests/realArith.fss` ('Operator PLUS_UP is not defined.') and `tests/testRR32.fss` ('Variable narrow is not defined.'). The drivers copied under the tree's scratch as `gate.md`, "The ladder regression", says, with this `subset.txt`: both stop at `disambiguate`, their recorded phase; `realArith.fss` at its recorded first error, `testRR32.fss` at 'Operator PLUS_UP is not defined.', which the old code gives too (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base25 <caches> compile testRR32.fss`: 'testRR32.fss:53:12-17:', 'Operator PLUS_UP is not defined.'), so the baseline's line is older than this base. Neither is in the landed `ladder.tsv` of climb batch 24, which runs only the 85 programs that pass. Considered and left out: `NumberPrintTest.fss` and `UnsignedTest.fss`, whose missing names list `narrow` but whose first errors name `big` and `unsigned`; the `builtinPrimitive` tests, whose bindings are their own.

## Sentences made false

None that this rung edits (the brief; fork 10). The gather's:

- `Specification/appendices/changes.tex:4469`: "173 of the 449 bindings of \library\ name a helper:" (201 now).
- `Specification/appendices/changes.tex:4478-4481`: "… forty of \TYP{Char} and thirty of \TYP{Float}; the getters … and the function \VAR{char}." (fifty-seven of `Float`, and the function `fromRawBits` beside `char`).
- `Specification/appendices/changes.tex:4482`: "The other 276 still name a glue class, which the compiled code cannot call." (248).
- `explorations/coordinator/FACTS.md:30`, F-32: "of its 449 live bindings, 276 name one" and "F-299 holds the 173 that name one".
- `explorations/coordinator/FACTS.md:134`, F-299: "173 of the one library's 449 live bindings name one", "`Float` 30 (F-303)", "the other 276 name glue classes".
- `explorations/coordinator/FACTS.md:135`, F-303: "`Float`'s 30 bindings that fit a helper name `simpleDoubleArith`'s" and "its other 32 have no fitting helper and still name glue classes: the predicates `isNaN` and `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX`, the 18 directed roundings, …".
- The fortress-repo skill's `interpreter.md`, "Natives": no sentence names `Float`'s glue classes; its "Most bindings name one." stays true at 248 of 449. `library.md:39` ("they call `Float`'s natives, which answer `ZZ64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:184-191`)") stays true: the brackets still name glue classes and the lines did not move.

## Points to report

- The sample: `sample-D.patch` applied by `git apply` (clean), its five helpers and strings kept, its source comment naming the planner dropped (provenance goes in commits and reports, the skill's `committing.md`); the other 23 written in its form. All 28 bindings moved; none of the 28 left on its glue class (`FortressBuiltin.fss:61-153`, `FortressLibrary.fss:4535`).
- The two guards: the walk guard passed through `harness-one.sh` on the base (00:09:01) and on the final code (00:43:02); the compiled guard failed through `junit.sh` on the base ('builtinPrimitive names no static helper: …doubleIsNaN', 00:11:27) and passed on the final code ('OK (6 tests)', 00:43:15).
- The tables on the final tree: the count '#total 0', equal to climb batch 24's, 157 s; the distance '#total 0', 'DISTANCE SAME   0'; no site came.
- No walk value moved (458 results, `diff` empty); no test's verdict changed in `ant testQuick` or `ant testSystem`.
- One defect met: row NEW-D-1, `nextUp` of `-0.0` and `nextDown` of `0.0` (home 3: `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss` and the row, `CONTESTED`, for the curator).
- The sentences made false: above, all the gather's.
- No file edited beyond those the brief names: the three sources at the named places, and tests under `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/`.

## Decisions

1. **The sample taken with one change: its comment dropped.** Ways not taken: the comment kept (it names the planner, provenance that the skill puts in commits and reports, and the class has no other comment); a new comment over the block. Evidence: `sample-D.patch:59-60`; the skill's `committing.md`, "Put provenance and rationale in commit messages and reports, not in source comments."
2. **Each helper named `double` and its glue class's name** (`doubleSubUpNoNaN`, `doubleSqrtUp`, `doubleDivDown`), and the brief's `doubleToFloat` and `doubleNE` for `narrow` and `=/=`. Ways not taken: `DirectedRounding`'s names (`doubleSubtractUpNoNaN`); `doubleSQRTUp` after the class's `doubleSQRT`. Evidence: fork 2, "Each new helper is named as its class names its others"; the sample's `doubleAddUpNoNaN`; the brief's list.
3. **`DirectedRounding` named in full in each helper**, as the sample does. Way not taken: an `import com.sun.fortress.numerics.DirectedRounding;` at the class's head, which edits outside the class's end (the brief: "the 28 helpers at the class's end, only").
4. **Every float result in the guards asserted through `asString`.** Ways not taken: `assert(x, 0.3, …)` against a numeral, which calls `-0.0` and `0.0` equal; `isNaN` for a NaN, which is one of the bindings under test. Evidence: climb batch 24's guards use `asString` for the signed zeros and NaN (`NativeHelperFamilyFloatWalk.fss:23-38`).
5. **The smallest subnormal made by `2.0^(-1074.0)`**, the existing `doublePow`. Ways not taken: `fromRawBits(1)` or `0.0.nextUp`, both under test.
6. **Left out of both guards**: `=/=`, `MIN` and `MAX` with a NaN operand (row 672; fork 9); every division by zero of the four directed divisions (row 863 contests the reading for `/`, and these give the same infinities); the bits of a computed NaN, which are the machine's (finding 3 of `record.md`), asserted instead by a read-back; `nextUp` of `-0.0` and `nextDown` of `0.0` (row NEW-D-1; fork 9 keeps a value a row names as a departure out of the guards). Way not taken: asserting today's value of each, as the brief's "the infinities and a not-a-number value" would have them where no row names them.
7. **NEW-D-1 recorded in home 3**, a `CONTESTED` row and a test asserting today's values, outside the guards. Ways not taken: home 2, an `XXX` test asserting IEEE 754-2008's `4.9E-324`, since the specification names no `nextUp` and so does not settle it; no record, though the api's "next higher IEEE float" (`Library/FortressLibrary.fsi:323`) is not met. No decision of the curator covers it; the question is in `forCurator`.
8. **The ladder subset: `realArith.fss` and `testRR32.fss`.** Ways not taken: `NumberPrintTest.fss` and `UnsignedTest.fss` (first errors on `big`, `unsigned`), the `builtinPrimitive` tests (their own bindings). Evidence: `baseline-2026-09-19/ladder.tsv`, the rows of those files.
9. **A one-binding mutant sweep of the walk guard, 26 of the 28**, each swap to a sibling of the same Java signature so that walk loads it. Way not taken: a mutant helper added for `narrow` and `fromRawBits`, which needs a Java edit and a build.
10. **The compiled guard's `ZZ64` minimum built as `maxNeg - 1` at `ZZ64`**, not as an integer-literal expression whose folding the guard need not test.
11. **`RR32` results read in the walk guard by `RR32`'s `asString` and `rawBits`** (glue classes on this tree, rung P's), and in the compiled guard by the existing `floatToDouble` and `doubleToString`. Way not taken: `asFloat` of the `RR32`, rung A's binding.

## Defects and their homes

- `nextUp` of `-0.0` is `0.0` and `nextDown` of `0.0` is `-0.0` (row NEW-D-1): home 3. The specification names no `nextUp`; the team's code (`DirectedRounding.java:111-127`) and the api's comment (`FortressLibrary.fsi:323-326`) disagree, and IEEE 754-2008 sides with the comment; so the row is `CONTESTED`, and `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss` asserts today's values. The same holds for `RR32` under walk and for the helpers on the compiled path (probes quoted in `record.md`).
- No other defect: the computed NaN's bits (record finding 3) are IEEE 754's freedom, and the directed divisions by zero (finding 4) are row 863's question, which stays open.

## Commands worked out

- The independent check of the directed roundings: a scratch Java program computing each case's exact result in `BigDecimal` (`new BigDecimal(x).add(new BigDecimal(y))`, `.multiply`, `.divide(…, new MathContext(2000))`, `.sqrt(…)`), rounded up and down by comparing `e.doubleValue()` with the exact value and stepping by `Math.nextUp` or `Math.nextDown`, with an overflow taken to the infinity or the largest finite value; run as `java Check.java`.
- The mutant sweep: for each line, `sed -i "${line}s/simpleDoubleArith\.${from}\")/simpleDoubleArith.${to}\")/" ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` from a kept copy, then `harness-one.sh` on the walk guard, then the copy put back and `git diff --quiet` checked.
- A row linted without writing the ledger: `python3 explorations/coordinator/tools/ledger.py check --rows FILE`, with a number in the row's first cell.

## For FACTS

In `record.md`, "For FACTS": F-303's new text, and the counts of F-32 and F-299.
