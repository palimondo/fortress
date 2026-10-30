<!-- Climb batch 23, rung W (rung-natives-walk): walk loads a builtinPrimitive string that names a static helper of nativeHelpers, and the first family, 19 of ZZ32's bindings and Int's two getters, moves onto helpers (P-58; rows 796, 336, 521). -->

# Rung W: walk's half of P-58 and the first family

- problem: walk loaded a `builtinPrimitive` string only as a glue class, 'Native class … not found.' for a helper's name (row 796; the shape probe, `explorations/perf-probes/prelude/natives-shape.md:38-40`; on the base, `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:196-203` at 3cd653815, the `Class.forName` path and its refusal)
- spec: `Specification/basic/operators/opr-overview.tex:164-165` for the division ("For integer results, division by zero throws a DivisionByZero."); for `builtinPrimitive` none in `basic/` or `basic-lib/` (`grep -rn builtinPrimitive Specification/basic Specification/basic-lib` prints nothing): its one passage is the api comment the specification prints, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`, input at `Specification/library/default-libraries.tex:37-39`
- precedent: the planner's `explorations/compile-ladder/plan-23/probes/rung-W.patch:1-518` (the shape probe's loader re-based); the raise of `Int.overflow()`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:258-261`; the refusal at load of a missing glue class, `NativeApp.java:210-211` (`:202-203` at the base)
- deviation: a declared parameter or result type that no Java type carries is refused at load, where the patch text took it as a wildcard (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:97-111`); the patch's "Probe" header replaced by a class comment, with no licence header, as the revival's other new Java files (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:1`); the comment's `glue.primitive` corrected to `glue.prim` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:26`)
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java`, `Library/FortressLibrary.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `Specification/appendices/changes.tex`

## How the rung ran

The worktree existed when this launch began: an earlier launch of this rung had seeded it (`seed-worktree.sh` from `/home/user/fortress-base23`), pushed `wip/rung-natives-walk`, committed the five tests of the patch (`9e93b85e0`) and two more (`db80ea79b`), each after its failing run through the harness on the base's code and before any build of the edit, then applied the patch's code, improved the loader and built it, when a restart of the machine ended it (`uptime` 5 minutes at this launch's start; `git log origin/wip/rung-natives-walk` the same commits, `git status` the patch's code uncommitted). This launch read that transcript, rebuilt (`ant compileAll`, 'Caches … kept'), showed the failing run again through the base build's harness, checked the patch text once against the improvement, and went on. The base build `/home/user/fortress-base23` is at `a1f8c4b8b`, an ancestor of the base whose diff to it touches only `explorations/` and `.claude/` (`git diff --name-only 3cd653815 a1f8c4b8b`), so its code is the base's.

## What changed and why

- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`, new, 225 lines: a `NativeMeth` for a string `com.sun.fortress.nativeHelpers.Class.method`. `find` (`:87-128`) loads the class, collects its public static methods of that name, and refuses at load: 'Native helper class … not found.', 'Native helper … names no static method of ….', '…: no Java type carries the declared type of parameter ….', '…: no Java type carries the declared result type.', '… has no overload that fits the declaration's types.', '… has N overloads that fit ….'. A method fits when its Java parameters are the declaration's at the Java types that carry them (`javaFor`, `:47-58`), one more in front for a dotted method's `self` (fork 9), `self` first for a functional method (fork 8), and its result type carries the declared one (fork 6). `call` (`:162-180`) unboxes each argument by the Java type (a `Char` as its code point), boxes the result at the declared type (`box`, `:205-224`: an `int` as `ZZ32`, `NN32` or `Char`, a `long` as `ZZ64` or `NN64`; fork 7), and turns a helper's `FortressImplementationError` 'fortress.<Api>$<Name>' into walk's `FortressError` of the library's `<Name>` (`raised`, `:182-191`; fork 11), as `Int.overflow()` raises `IntegerOverflow`.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:194-201`: the hook in `checkAndLoadNative`, before the glue class's load: a helper string goes to `StaticNativeApp`, a refusal is walk's `bug` at the declaration, as a missing glue class's (fork 10).
- `Library/FortressLibrary.fss:741-810`: 19 strings of trait `ZZ32` (`=`, `<`, the unary `-` and `DOTMINUS`, `+`, `DOTPLUS`, the binary `-` and `DOTMINUS`, `DOT`, `TIMES`, juxtaposition, `DOTTIMES`, `DIV`, `BITAND`, `BITOR`, `BITXOR`, `BITNOT`, `widen`, `unsigned`), and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:371`, `:373`, `Int`'s `asString` and `asExprString`, each naming the helper that the prelude binds or that computes it, by the patch's exact text (fork 12; `explorations/compile-ladder/plan-23/probes/movable-base.tsv`).
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`: `builtinPrimitive`'s comment revised, in its sixteen lines; `Specification/appendices/changes.tex`, the entry "A native binding that names a static helper" (`revival-native-helpers`); `explorations/compile-ladder/rung-natives-walk/decision-record.md`.
- Tests in `ProjectFortress/tests/`: the patch's five (`NativeHelperBindingWalk`, `NativeHelperRaiseWalk`, `NativeHelperMisspeltWalk` with its `.test`, `ZZ32DivisionByZeroWalk`, the guard `NativeHelperFamilyZZ32Walk`), two for the refusals the patch did not test (`NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, each with its `.test`), and one that records a defect (`NativeHelperNonFlatStringWalk`, home 3).

Not mine and not touched: `CHOOSE` and `Int`'s `asFloat` (fork 12), every other binding, the compiled rewrite and the foreign-type reading (rung C), the helpers' Java, the glue classes, row 521's fix.

### The patch text and the improvement

The patch's `find` read a declared type that no Java type carries, such as `AnyIntegral`, as `null` and let it match any Java parameter (`want.get(i - off) != null && …`, `rung-W.patch:232`). A `ZZ64` value then reaches an `int` parameter through `FLong.getInt`, which truncates (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FLong.java:23-26`). Checked once on the patch text (its `StaticNativeApp.java` built for one run, then restored and rebuilt):

    ant compileAll && harness-one.sh …/h-patchtext ProjectFortress/tests/NativeHelperUncarriedWalk.fss …/NativeHelperUncarriedWalk.test && (cd tmp/rung-natives-walk/probes && FORTRESS_CACHES=… ../../../bin/fortress LooseProbe.fss)
     Missing expected refusal at load
    Tests run: 1,  Failures: 1,  Errors: 0
    loose(4000000000, 5) = true

`LooseProbe` is `loose(a:AnyIntegral, b:ZZ32):Boolean = builtinPrimitive("…simpleIntArith.intLT")` called at a `ZZ64` 4000000000: the answer is `false`. The improvement refuses such a declaration at load (`StaticNativeApp.java:97-111`); a declaration without a result type still reaches `NativeApp.init`'s 'Please specify a Fortress return type.' (`NativeApp.java:72`). The rest of the patch is taken as written; `find` now collects the methods of the name first, so that 'names no static method' does not depend on the declaration's types.

## Tests

The failing run, on the old code, through the base build's harness (this launch's; the earlier launch's runs, before the first build, gave 'Tests run: 5,  Failures: 4' and 'Tests run: 2,  Failures: 2', in the messages of `9e93b85e0` and `db80ea79b`):

    FORTRESS_HOME=/home/user/fortress-base23 /home/user/fortress-base23/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-natives-walk/h-old <tree>/ProjectFortress/tests/{NativeHelperBindingWalk.fss,NativeHelperRaiseWalk.fss,NativeHelperMisspeltWalk.fss,NativeHelperMisspeltWalk.test,ZZ32DivisionByZeroWalk.fss,NativeHelperMisfitWalk.fss,NativeHelperMisfitWalk.test,NativeHelperUncarriedWalk.fss,NativeHelperUncarriedWalk.test,NativeHelperFamilyZZ32Walk.fss}
    # harness-one 2026-10-30T04:19:08Z; tree a1f8c4b8b; … cache empty
    Caused by: java.lang.ArithmeticException: / by zero
    Native class com.sun.fortress.nativeHelpers.simpleIntArith.intLT not found.
     Refused at load, but did not satisfy load_exception_contains; expected
    Tests run: 7,  Failures: 6,  Errors: 0

The guard there: `NativeHelperFamilyZZ32Walk` ' OK (time = 598ms)'. The passing run, the last after the last change of code (the content of `e74428c71` and `dd00fced7`, uncommitted at the run):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-natives-walk/h-final ProjectFortress/tests/{the same ten files,NativeHelperNonFlatStringWalk.fss}
    OK (8 tests)

Each refusal there reads ' OK Saw expected refusal at load'.

## Suites

Once each, on the final code (`e74428c71`, `dd00fced7`), under `nice -n 19` beside rung C:

    ant testSystem    → 'Tests run: 176', '169', '178', '170', each 'Failures: 0, Errors: 0'; 'BUILD SUCCESSFUL', 'Total time: 5 minutes 32 seconds'
    ant testSpecData  → 'Tests run: 130, Failures: 0, Errors: 0, Skipped: 0'; 'BUILD SUCCESSFUL'

693 tests against the landed gate's 685 (climb batch 22c, 178 + 165 + 169 + 173): the eight new files, and no test changed its verdict; `PowChooseLcmRungE` and `IntegerPowerContractWalk` among the green. The examples, 130 as landed. The compiled tracks: my Java is walk's only and reaches none of them; not run (`tests-running.md`, "When to run a whole suite"). The 52 demos: left to the gather on the merged tree (fork 19), where the brief holds over the skill.

## Where the fix belongs, and the precedents

- The maps: `explorations/coordinator/map/modules-and-phases.md:441-455` (B.12): walk binds natives in `NativeApp.checkAndLoadNative`, loading the class reflectively; `map/spec-to-implementation.md:157`: the foreign import is absent on walk ('interpreter uses `builtinPrimitive` instead'). So the loader goes beside `NativeApp`, in `interpreter/glue/`, and changes walk only.
- The ways the language and library offer, for a native both paths call: (1) a `builtinPrimitive` string that names a helper, with walk's loader beside its glue classes (P-58; taken); (2) `import java` declarations in the library (P-58's way not taken; F-180: five gaps stop it on walk); (3) a glue class per helper that calls the helper (the compiled path still cannot call a glue class, F-32); and for `ZZ32`'s `DIV` by zero alone, (4) a zero test in `Int$Div` (row 336's fix text), not needed once the binding names `intOverflowingDiv`, which tests for zero (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:79`).
- The raise: the precedent is `Int.overflow()` and `Int.divisionByZero()` (`Int.java:258-266`). In `Int.java`, 13 sites `throw overflow()` and 1 `throw divisionByZero()` (`:291`, the powers at a base of 0, the precedent that repaired a division's Java exception); `Int.divisionByZero()` elsewhere at `BigNum.java:320` and `UnsignedLong.java:342`. The same defect stays at 3 more sites of `Int.java`: `Int$Div` `x / y` (`:126`, no longer bound by `ZZ32`; no binding of the library names it now), `Int$Rem` (`:132`) and `Int.mod` (`:389`); and in `Long.java:140`, `:146` and `BigNum.java:160` (row 336).
- A revival-added Java file's header: `Coercions.java` and `RTTIsize.java` begin with their `package` line, no licence header (the skill's rule against claiming credit); the patch's header named the planner's probe.
- Competing declarations: `git grep -l -w` over `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `other_compiler_tests`, `test_library` and `ProjectFortress/src/com/sun/fortress` for each new test component, `StaticNativeApp` and `isHelperString`: each only in its own file (and `NativeApp.java` for the two Java names). Rung C's patch adds `BuiltinPrimitiveRewriter.java` in `compiler/` and three compiled tests, none of these names.

## What the specification settles

"For integer results, division by zero throws a DivisionByZero." (`Specification/basic/operators/opr-overview.tex:164-165`): `ZZ32DivisionByZeroWalk` asserts it, and the rung makes it hold for `ZZ32`'s `DIV` under walk. Nothing in `Specification/basic` or `basic-lib` speaks of `builtinPrimitive` (grep above); `Specification/basic/components/source-code.tex:513-518`, "Native Components", leaves an unsafe component's semantics to the implementation. So the loader's rules (overload by declared types, values at declared types, refusals) are the record's forks 6 to 11, and the comment that the specification prints is revised to say them.

## Programs run old against new

- The ten test files above: old (base build) 'Tests run: 7,  Failures: 6', new 'OK (8 tests)' with the eighth.
- The family's values: the guard `NativeHelperFamilyZZ32Walk`, the 21 operations at ordinary values and at each overflow, and `asFloat`, asserted alike on both codes: OK on both. So no walk value of the family moves but `ZZ32`'s `DIV` by zero, which now raises `DivisionByZero` where it ended the run.
- `LooseProbe` on the patch text against the final: 'loose(4000000000, 5) = true' against the refusal at load (`NativeHelperUncarriedWalk`, the same declaration).
- `CatProbe`, on the final code only (on the old code the helper does not load): '|s| = 52, slen(s) = 9, slen(s.asFlatString) = 52' and the glue binding `printWithThread(s)` ' Thread 26: CatString'.

## The checker count and the distance

The edit changes `Library/` and `ProjectFortress/LibraryBuiltin/`, outside the paths that cannot move the stages, so both ran once on the final tree (`e74428c71`, `dd00fced7`), into `tmp/rung-natives-walk/`, under `nice -n 19` beside rung C; before: climb batch 22c's landed tables.

The count: `explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-walk/checker-count-postedit.txt tmp/rung-natives-walk/cc-post`, 04:43:33Z to 04:46:14Z, 161 s (nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, load 7.6 at start, another rung's runs beside it):

    #total	0
    #locations	0
    #crash	none

`diff explorations/compile-ladder/climb-batch-22c/gate/checker-count.txt tmp/rung-natives-walk/checker-count-postedit.txt` prints nothing: the same thirteen rows, each 0. Without rung C's rewrite on this tree the checker reads the 21 moved strings as calls of `builtinPrimitive` (row 560), as every glue string, so nothing moves; the merged tree is the first on which the stages read them through the rewrite.

The distance: `explorations/coordinator/tools/distance/run.sh tmp/rung-natives-walk/distance-postedit.txt tmp/rung-natives-walk/dist-post`, from 04:51:05Z, its own '#seconds 215 FortressLibrary 158' (load 7.5 at start, rung C's runs beside it):

    #total	0
    #crash	none
    #shadow	every shadow edit matched the tracked sources

with every `#kind` 0 and '### order=check setting=compile (extendsObject=false compiledExpr=true) prelude=INTERPRETER', the fourteen targets. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-22c/gate/distance.txt tmp/rung-natives-walk/distance-postedit.txt` prints 'DISTANCE SAME   0'; `diff` of the two tables differs only in the '#seconds' and '#machine' rows. The sites: `tmp/rung-natives-walk/dist-post/errors.tsv` holds only its header row, as the per-site list `explorations/compile-ladder/gate/distance-sites.tsv` does, so no site moved, by row or by class. On the merged tree the stages read the 21 through rung C's rewrite; by the planner's runs of the two texts together, 0 and 0 there too, and a new row `com.sun.fortress.nativeHelpers 0` in the count's table (`explorations/coordinator/CLIMB-BATCH-23.md`, "The planner's probes").

No checker code changed: no speed pass (fork 17).

## The ladder subset

The five files whose recorded first error in the baseline names something this rung touched, `builtinPrimitive` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`): `tests/XXXarityTestFn.fss`, `XXXfailTestFn.fss`, `XXXnoclassNativeFn.fss`, `nativeTestFn.fss`, `testPrim.fss`, none in the newest landed `climb-batch-22c/gate/ladder/ladder.tsv` (its 85). The drivers copied under `tmp/rung-natives-walk/ladder/` as `gate.md` gives, `bash run-subset.sh && python3 classify.py`: each 'disambiguate', 'Variable builtinPrimitive is not defined.', as in the baseline (`diff` of the four columns prints nothing). No move: the compiled ladder reads neither walk's loader nor the one library's strings.

## The specification

- The comment (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`), in its sixteen lines so that no later line of the api moves (354 citations of `FortressBuiltin.fsi:<line>` under `explorations/` name lines below it): the string names either a glue class, which only the interpreter runs, or a helper, a public static method of a class of `com.sun.fortress.nativeHelpers`, which both the interpreter and the compiled code call; walk loads a helper beside its glue classes, by the declared types, `self` first, values at the declared types; the compiler rewrites such a body before type checking into a call checked against the helper's Java signature; a string under the package that names no such method is an error on both; and the second paragraph's `glue.primitive`, a package the tree does not have, reads `glue.prim`. The callout `\revision{revival-native-helpers}{…}` stands in the comment: the api's typesetting carries it, the PDF printing the box under the first paragraph ('REVISED BY THE 2026 REVIVAL', 'SEE', 'Section I.1.44', `pdftotext` of the built PDF).
- Appendix I, `Specification/appendices/changes.tex`, the entry "A native binding that names a static helper", before "Passages not yet revised": affected section `\secref{FortressBuiltin}`; the change; the rationale, the decision of 10 October 2026 (P-58), the way not taken (`import java` in the library) and the reversal, with the decision record's path; the effect: the 21 bindings, the 428 on glue classes, `CHOOSE` (row 521), the compiled code checking but not yet running them until the switch-over, `ZZ32`'s `DIV` by zero now as the operators chapter says, and `REM`, `MOD`, `ZZ64`'s three and `ZZ`'s `DIV` still ending the run (row 336), the natives over `String` (row NEW-W-1); the original text quoted from the `.fsi`, since `Specification-1.0-frozen/library/default-libraries.tex:39` inputs a generated `library/apis/FortressBuiltin.tex` that neither tree keeps (the build typesets it, `Specification/fortress/build.xml:129-139`); route C the same.
- `Specification/fortress/preamble.tex:54-64`: still true (it describes the revision in general); not edited.
- The build: `cd Specification/fortress && ./ant genSource && ./ant tex`, both 'BUILD SUCCESSFUL', and the count of reference, label and undefined-control-sequence warnings 0, on the comment's final text; once more after two phrasings of the entry's rationale changed (the library macro with a possessive), both 'BUILD SUCCESSFUL', warnings 0, the entry typeset as 'I.1.44 A native binding that names a static helper'. The build's files removed (`git clean -fXq -- Specification`).
- Other sentences of `Specification/` on these topics (`grep -rn -i 'builtinPrimitive\|native component\|nativeHelpers\|division by zero\|DivisionByZero' Specification --include=*.tex`): `opr-overview.tex:164-165`, now true for `ZZ32`'s `DIV` under walk; `basic/components/source-code.tex:513-518`, untouched; `appendices/changes.tex:2473`, a past refusal of calls of `builtinPrimitive` (row 560), still true as written; `basic/evaluation/completion.tex:29-31` and the number chapters, on `/` and `QQ`, untouched.

## Sentences made false

- `Specification/`: none outside the revised comment, whose original Appendix I keeps.
- POSITIONS P-58: "Every binding still names a glue class." (`explorations/coordinator/POSITIONS.md:55`): 21 name helpers.
- FACTS F-24 (`explorations/coordinator/FACTS.md:18`, the skeptic's addition): "Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes, so a division by zero ends the run (row 336).": `ZZ32`'s `DIV` by zero raises `DivisionByZero`.
- FACTS F-32 (`explorations/coordinator/FACTS.md:28`): its count is of glue bindings; 428 of the 449 live bindings now name glue classes, 21 helpers. F-180 (`FACTS.md:243`): "P-58 chose another way, not yet built": walk's half is built.
- Ledger row 796's claim (closed by this commit) and row 336's claim, "`DIV` … by zero on `ZZ32`" (rewritten).
- The skill: `interpreter.md`, "Natives": "The library binds each of walk's natives by a string in its `.fss` files: `builtinPrimitive("com.sun.fortress.interpreter.glue.prim.X")`. The classes are in `interpreter/glue/prim/`." (21 now name helpers), and "A `catch` sees no other Java exception, so any other exception from a native ends the run, a division by zero too." (`ZZ32`'s `DIV` raises `DivisionByZero`, and a helper's compiled raise is translated); `library.md`, "Designing a change": "A new native is a Java class under `interpreter/glue/prim/` …" (a native can be a helper of `nativeHelpers/`).
- The map `explorations/coordinator/map/modules-and-phases.md:445` (B.12): the interpreter loads "that class — a subclass of `NativeFn0..3`/`NativeMeth0..3`": a helper string loads a static method.

## Points to report

- rung-W.patch taken with one change of substance: a declared type that no Java type carries is refused at load (evidence above), plus its header, the order of `find`'s refusals and a guard on a missing result type; two tests added for the refusals. Each of the 21 bindings moved as the patch writes it (`Library/FortressLibrary.fss:741-810`, `FortressBuiltin.fss:371`, `:373`). Left on glue among `ZZ32`'s and `Int`'s: `CHOOSE` (`FortressLibrary.fss:789`, row 521), `Int`'s `asFloat` (`FortressBuiltin.fss:375`), and `REM`, `MOD`, `GCD`, `LCM`, `LSHIFT`, `RSHIFT`, `^`, `partitionL`, `big`, none in the family.
- The tests before and after through the harness: 'Tests run: 7,  Failures: 6' (the patch's four, Misfit and Uncarried; the guard OK) and 'OK (8 tests)'.
- The count table the same as landed, '#total 0', 161 s; the distance '#total 0', 'DISTANCE SAME   0', 215 s by its '#seconds'; no site came.
- Walk values: none moves beyond `ZZ32`'s `DIV` by zero (the guard on both codes); no test changes its verdict in `ant testSystem` (693, no failure) or `ant testSpecData` (130, no failure).
- Row 336's rewritten line, row 796's close and row 521's note (with a rewrite, since the note does not fit): `record.md`, "Ledger".
- The specification's revision: the comment, its callout, the Appendix I entry, the decision record; each of its three builds 'BUILD SUCCESSFUL' with 0 warnings (the first on an earlier wording of the callout).
- Every sentence made false: the section above.
- Files beyond those named: none (`ProjectFortress/tests/`, my tests; `explorations/compile-ladder/rung-natives-walk/`, this folder). No edit of `compiler/`, `Shell.java`, `nativeHelpers/`, `interpreter/glue/prim/` or the tools (`git diff --name-only 3cd653815`).

## Decisions

1. **The patch text improved, not taken as it is.** Chosen: refuse at load a declared parameter or result type that `javaFor` does not carry. Not taken: the patch's wildcard (a wrong value, `loose(4000000000, 5) = true`); a conversion at the call (no single Java type carries `AnyIntegral` or `Number`); a check at each call (a refusal at load is walk's practice for a missing glue class, `NativeApp.java:210-211`, and fork 10's). Evidence: the run on the patch text above; `FLong.java:23-26`.
2. **Two refusal tests added** (`NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`). Not taken: the patch's one refusal test only, which leaves fork 10's 'no overload that fits' and the improvement untested.
3. **The non-flat `String` argument recorded, not repaired** (home 3: `NativeHelperNonFlatStringWalk`, asserting today's 9, and NEW-W-1). Not taken: flatten the argument in the loader through the Fortress getter `asFlatString` (no glue class calls a Fortress method, `grep -rn 'asFlatString' ProjectFortress/src/com/sun/fortress/interpreter` prints nothing; beyond the edit the tests need); refuse a `String` parameter at load (it would refuse the patch's `cat` and `len` in `NativeHelperBindingWalk` and part from the compiled reading of a Java `String` as `String`, fork 5); an error at the call. No binding of the family has a `String` parameter. No decision covers it; question 1 below.
4. **The comment kept to its sixteen lines.** Not taken: a reflow that moves every later line of the api (354 citations under `explorations/`).
5. **`glue.primitive` corrected in the revised comment.** Not taken: the team's wrong package name left in a passage the revision vouches for. "For examples, see the end of this file." is left as the team wrote it, though the `.fsi` holds no example (question 2).
6. **The callout in the comment.** Not taken: a sentence in the entry only; the api's typesetting carries the box (the built PDF).
7. **Row 521: the note's text, and a rewrite since the note does not fit** (1,183 characters; `ledger.py note` refuses past 1,200). Not taken: the note alone, which the tool would refuse.
8. **Row 336's reproducer stays `none`.** `ZZ32DivisionByZeroWalk` tests the fixed half, so it goes in the notes. Not taken: naming it as the reproducer of a gap it does not show; an `XXX` test for `REM` and `MOD` (not measured here).
9. **The ladder subset: the five files whose first error names `builtinPrimitive`.** Not taken: an empty subset (`builtinPrimitive` is a name the rung touches).
10. **The failing run shown again on the old code in this launch.** Not taken: citing only the earlier launch's runs, which its transcript holds; the base build's harness runs the base's code, as `worktrees.md` gives.
11. **No demos.** Fork 19 gives them to the gather on the merged tree; the brief holds over `tests-running.md`.
12. **`nice -n 19`, one JVM command at a time**, beside rung C (`session.md`).

## Defects and their homes

- Row 796, walk loads a string only as a glue class: home 1, `NativeHelperBindingWalk` (with `NativeHelperRaiseWalk`, `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`).
- Row 336, `ZZ32`'s `DIV` by zero: home 1, `ZZ32DivisionByZeroWalk`; the rest of the row is the row as it stood (not measured here).
- The patch text's wildcard for an uncarried type (a defect of the planner's text, not of the tree): home 1, `NativeHelperUncarriedWalk`, red on the patch text.
- A native over `String` given a non-flat string: home 3, `NativeHelperNonFlatStringWalk` and the new row NEW-W-1; the specification is silent on what a native receives.
- The comment's `glue.primitive`: prose, corrected in the revision; no test.
- Row 521 on walk: the planner's measurement (`CLIMB-BATCH-23.md`, "The planner's probes"), not run here; its note.

## Questions for the curator

1. A binding over `String` (the movable `printlnWithThread`, `Library/FortressLibrary.fss:4632`, and `getProperty`, `Library/System.fss:45`): should walk's loader flatten a non-flat argument before the call, or should such bindings be declared over `FlatString`, as the library's other natives over strings are? Evidence: `StaticNativeApp.java:199`, `interpreter/glue/prim/Util.java:286`, `NativeHelperNonFlatStringWalk`. Default if unanswered: neither; the next family that moves such a binding meets NEW-W-1.
2. The comment's "For examples, see the end of this file." (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:20`) points at the api, which holds no example (`grep -c builtinPrimitive` of the `.fsi` prints 3, the comment and the declaration); the bindings are in `FortressBuiltin.fss`. Correct it in a later revision of the comment, or leave the team's sentence?

## Commands worked out

- The failing run on the old code with the base build's harness and absolute paths of the tests in the rung's tree (above).
- `python3 explorations/coordinator/tools/ledger.py check --rows FILE`, to lint a row line before handing it over (read-only).
- `pdftotext Specification/fortress/fortress.pdf out.txt`, to read whether the api's typesetting carries a callout.
