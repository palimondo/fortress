# Rung F (climb batch 34, run 1): walk's native strings without the library's line that names the object FlatString

problem: under walk the native strings work only after the object `FlatString` has been made from its name, so the string component names it, `ignore(FlatString)`, and the compiled path refuses that line once `FlatString` is over a payload class (row 1090; explorations/compile-ladder/plan-34/probes/rehearsal.md:40)
spec: none: `grep -rn '~1090' Specification --include=*.tex` prints nothing, and row 1090's spec cell is `silent`; no passage of Specification/basic or basic-lib governs when walk registers a native object's constructor (none)
precedent: the native number objects of FortressLibrary, whose constructor walk applies as it binds the singleton (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:531-533, since f6e24650e7)
deviation: none from the precedent's form; the comment's wording names a native singleton and a string, not a number (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildNativeEnvironment.java:161-162)
historical: Library/FlatString.fss and ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildNativeEnvironment.java (Library/FlatString.fss:29-30 at a874948ac; BuildNativeEnvironment.java:144-162 at a874948ac, the singleton branch of forObjectDecl1)

One launch worked this rung. Branch `wip/rung-flatstring-name`, cut from the base 639eef1806 and seeded from `/home/user/fortress-base40` by `seed-worktree.sh` (exit 0). The fix and its test are commit 23b826efe6.

## 1. What changed and why

Walk's native objects keep their constructor in a static field of their values' Java class, which `makeNativeObject` sets (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FlatString.java:32-35`), and a value's type is read through it (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FNativeObject.java:38-40`). A native singleton's `makeNativeObject` ran only when its lazily evaluated cell was first read: when walk's fourth pass forced it (`BuildEnvironments.java:650`), or earlier by a read of its name. A string that a native function answers exists before that: the component's own top-level variable `lineSeparator: String = LineSeparator()` (`Library/FlatString.fss:23`) is a native string, and its typed cell checks its type. So the team's library named the object first: `FlatString;`, respelled by the revival `ignore(FlatString);` (`Library/FlatString.fss:29-30` at 639eef1806, under the comment "This initializes the constructor for FlatString before its type is used (in the next line)"; the team's spelling at a874948ac, the same line).

The change, in two files:

- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildNativeEnvironment.java:161-163` (`forObjectDecl1`, the branch of a singleton without static parameters): the native constructor is applied as soon as it is bound, `if (cl instanceof NativeConstructor) cl.applyConstructor(Collections.<FValue>emptyList());`, as `BuildEnvironments.forObjectDecl1` does for the native number objects (`BuildEnvironments.java:531-533`). Two imports (`:26`, `:33`).
- `Library/FlatString.fss`: the two lines taken out, the call and the end of its comment; `LineSeparator()` keeps its `do` block (`Library/FlatString.fss:28-30`).

Why it is ready there: `Driver.evalComponent` resets every native constructor first (`ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:81`, `Init.java:44`, `NativeApp.java:273-276`), then makes the first pass over every component (`Driver.java:218-222`), and only then the passes that build types, functions and the top-level variables (`Driver.java:224-249`). `FNativeObject.type()` reads only the constructor's `selfType`, which the constructor holds from its making (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:144`). Each native singleton's `makeNativeObject` only registers the constructor and answers a static value (`FlatString.java:32-35`, `Boolean.java:30-33`, `Char.java:33-36`, `NN32.java:34-37`, `RR32.java:33-36`, all under `interpreter/glue/prim/`), so applying it once more when the name is read changes nothing.

The singletons that the edit reaches are the five objects without parameters of walk's native components: `FlatString` (`Library/FlatString.fss:32`) and `RR32`, `NN32`, `Boolean` and `Char` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:65,262,369,405`). `Thread[\T\]` (`FortressBuiltin.fss:519`) and the objects of `Reflect` have parameters and take the other branches.

## 2. The test: its expected failure, the failing run, the pass

The test is `ProjectFortress/tests/NativeStringsReadyAtLoadWalk.fss`, a plain walk test: it binds a string at `String`, prints it, asserts its length, and prints and asserts the length of `lineSeparator`. Its set-up is the line taken out of `Library/FlatString.fss`, which preceded its failing run; the Java fix followed that run.

The expected failure, stated before the run: "harness-one.sh reports the test red with 'UNEXPECTED exception java.lang.NullPointerException' and 'Caused by: java.lang.NullPointerException: Cannot read field "selfType" because the return value of "com.sun.fortress.interpreter.evaluator.values.FNativeObject.getConstructor()" is null', raised while the FlatString component's lineSeparator is initialised, before the program's first println prints "ready"; the verdict line reads FAILURES!!! with Tests run: 1, Failures: 1."

The failing run, on the base's walk (the seeded build of 639eef1806) with the library line out, 2026-11-20 16:09:09 to 16:09:26 UTC; the Java edit was made at 16:10:05 and first built at 16:11:21:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-flatstring-name/h1 ProjectFortress/tests/NativeStringsReadyAtLoadWalk.fss

     UNEXPECTED exception
    java.lang.NullPointerException
    Caused by: java.lang.NullPointerException: Cannot read field "selfType" because the return value of "com.sun.fortress.interpreter.evaluator.values.FNativeObject.getConstructor()" is null
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

It printed nothing of the program. The Java stack of the same program on the same code (`cd ProjectFortress && ../bin/fortress -debug stacktrace tests/NativeStringsReadyAtLoadWalk.fss`, with a private caches folder) shows the site: a top-level variable's cell initialised in the fourth pass (`BuildEnvironments.forVarDecl4`, `BuildEnvironments.java:817`) reads a string-typed variable whose cell checks its value's type:

    at com.sun.fortress.interpreter.evaluator.values.FNativeObject.type(FNativeObject.java:39)
    at com.sun.fortress.interpreter.evaluator.types.FType.typeMatch(FType.java:112)
    at com.sun.fortress.interpreter.evaluator.values.Coercions.coerceToDeclared(Coercions.java:346)
    at com.sun.fortress.interpreter.env.LazilyEvaluatedCell.getValueNull(LazilyEvaluatedCell.java:75)

The pass, after the last change of code, 16:11:30 UTC, same command:

    ready
    line separator length 1
     OK (time = 14579ms)
    OK (1 test)

and in `ant testSystem` on the same code (section 6): `interpret .../ProjectFortress/tests/NativeStringsReadyAtLoadWalk  OK (time = 862ms)`.

## 3. Where the fix belongs, and the precedent search

The defect is walk's start-up, not the library's: walk's code is under `interpreter/` (the skill's interpreter part), and a native component's objects are bound in `BuildNativeEnvironment.forObjectDecl1` (map `modules-and-phases.md`, "B.12 Native code and Java interop"; `interpreter/env/CUWrapper.java:122` chooses it for a native component). The precedent is the revival's own repair of the same need for the native number objects of the non-native `FortressLibrary`: f6e24650e7 (climb batch 31b, rung O) applies the constructor as it binds the singleton, with the comment "A native number's values are made before its singleton is first read, by a top-level variable of the component: the constructor registers itself with its values' class." (`BuildEnvironments.java:531-533`). Its file has that one site; `BuildNativeEnvironment.java` has two sites that make a non-generic native constructor, the singleton branch (`:159-163`, edited) and the branch of an object with a parameter list (`:136-143`, not edited: its constructor takes arguments, and a value is made only by a call of it).

The ways the tree offers, before the choice:

1. Apply the constructor where the singleton is bound, in `BuildNativeEnvironment.forObjectDecl1` (chosen; the precedent's form).
2. Register the constructor in each glue class's Java constructor (`FlatString(Environment, FTypeObject, ObjectConstructor)` and its four siblings): five files of `glue/prim/`, and a form the precedent does not use.
3. Register it in `nativeConstructorOfClass` (`BuildNativeEnvironment.java:53-106`), which also makes the constructors of objects with parameters and those of the number objects: it would apply a constructor with parameters to no arguments.
4. Force the singleton's cell earlier, for example at the end of the first pass: an evaluation of a Fortress expression before the types are built.
5. Keep the library's line and compile `FlatString` as a value on the compiled path: fork F1's way not taken, which answers row 1082, the curator's open question.

## 4. What the specification settles

Nothing: when walk registers a native object's constructor is an implementation matter. `grep -rn '~1090' Specification --include=*.tex` prints nothing. The specification's sentences on `FlatString` (`Specification/appendices/changes.tex:4841`, `:4855`, `:4890`) speak of its natives' bindings, not of its start-up. What the name of such an object denotes as a value is row 1082's open question (`basic/objects.tex`, "Object Declarations"), which this rung leaves open.

## 5. Programs run old against new

Each program ran on the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base40 /home/user/fortress-flatstring-name/tmp/old-caches P.fss`, the base's walk and library, the line in) and on the new (`bin/fortress P.fss` in this tree, a private caches folder), and the outputs were compared after the `Operation took` mask:

- `explorations/claude_demo.fss`: rc 0 both, the same 6 lines.
- A scratch program that binds and prints a value of each native singleton at its declared type, `s: String = "flat"`, `b: Boolean = true`, `c: Char = 'x'`, `u: NN32 = 7`, `r: RR32 = 1.5`, then `|lineSeparator|` and `s || c`: rc 0 both, the same output, `flat true x 7 1.5`, `|lineSeparator| = 1`, `s || c = flatx`.

No interpreter output changed.

## 6. The suites

The edit changes walk's Java and the library, and the rung's section asks for both suites once, on the final code (23b826efe6, no edit after):

    ant testSystem    # BUILD SUCCESSFUL, Total time: 5 minutes 23 seconds
                      # shards 223 + 221 + 218 + 217 = 879 tests, Failures: 0, Errors: 0
    ant testFast      # BUILD SUCCESSFUL, Total time: 9 minutes 47 seconds
                      # compiler 1766, library 86, onelibrary 14, othercompiler 263, misc 471; Failures: 0, Errors: 0

The last landed gate (`explorations/compile-ladder/climb-batch-33b/gate/summary.txt`) has 878 system tests; the one more is this rung's test. The testFast tracks hold the same counts as there. No test failed with the line out.

## 7. The stages

Both ran once, on 23b826efe6, after the last build, each in the background into `tmp/rung-flatstring-name/`. The comparand is the last landed gate's tables, `explorations/compile-ladder/climb-batch-33b/gate/`.

- The count (`explorations/coordinator/tools/checker-count/run.sh`): every api 0, `#total 0`, `#crash none`, `#shadow matches the tracked StaticChecker`. `diff` against `climb-batch-33b/gate/checker-count.txt` prints nothing.
- The distance (`explorations/coordinator/tools/distance/run.sh`): `#total 0`, every `#kind` 0, `#crash none`, `#seconds 122 FortressLibrary 81`, `#shadow every shadow edit matched the tracked sources`; its targets include `Library/FlatString.fss` (`api FlatString ... errors=0` at each stage). `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-33b/gate/distance.txt tmp/rung-flatstring-name/distance-postedit.txt` prints `DISTANCE SAME   0`. No site moved: the run's `errors.tsv` and `explorations/compile-ladder/gate/distance-sites.tsv` hold their headers only.

## 8. The ladder subset

Empty. No file of the ladder's recorded first errors names what the change touched: `awk -F'\t' 'NR>1 && $11 ~ /FlatString|lineSeparator|LineSeparator|getConstructor|NativeConstructor|BuildNativeEnvironment/'` over `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` (410 files) and over the newest landed `explorations/compile-ladder/climb-batch-33b/gate/ladder/ladder.tsv` prints no row, and `grep -rl` of the same names over the baseline's `raw/` finds no file. The compiled path under the prelude reads neither file of the change.

## 9. Sentences of the specification made false

None. The grep for row 1090 prints nothing; no `\revision`, `\note{}` or Appendix I effect states that walk needs the library to name a native object, and the three sentences that name `FlatString` (`Specification/appendices/changes.tex:4841`, `:4855`, `:4890`) stay true.

## 10. Points to report

1. **Where walk now sets the constructor, by file and member, and why it is ready there.** `BuildNativeEnvironment.forObjectDecl1`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildNativeEnvironment.java:161-163`, in the first pass, after the run's reset of the native constructors and before any top-level variable is initialised (section 1).
2. **The line taken out; walk's suites and the compiled tracks with it out; each test that failed, with its cause.** `Library/FlatString.fss:29-30` at 639eef1806. `ant testSystem` 879 tests and `ant testFast` (with the onelibrary track's 14) all green on 23b826efe6; no test failed (section 6).
3. **Every other native object whose constructor walk sets only when its name is evaluated, and whether a line of the libraries names one for that.** `Boolean`, `Char`, `NN32` and `RR32` (`FortressBuiltin.fss:65,262,369,405`): on the base set when walk's fourth pass reads their names (`BuildEnvironments.java:650`), named by no line of the libraries; now set in the first pass by the same edit. `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64`: set in the first pass since f6e24650e7 (`BuildEnvironments.java:531-533`). The constructor objects `ReflectCollection()` and `ReflectMethod()` (`Library/Reflect.fss:234,257`): set only when called, which `Library/Reflect.fss:365-367` does for that, in two private top-level variables; left as they are (decision 3). `IntLiteral` and `FloatLiteral` (`interpreter/glue/prim/IntLiteral.java:34-37`, `FloatLiteral.java:28-30`): no library declares an object of either name, so walk never makes either constructor.
4. **The two stages' tables on the final tree against the comparand.** Count 0 against 0, no diff; distance `DISTANCE SAME   0`, no site moved (section 7).
5. **A file edited beyond those named.** Not reached: the edit is in `Library/FlatString.fss` and `BuildNativeEnvironment.java`, both named, and the test.

Reserved points: no model line changed; no interpreter output changed (section 5).

## 11. Decisions

1. **The constructor is applied where the native singleton is bound, in `BuildNativeEnvironment.forObjectDecl1`.** Ways not taken: each glue class's Java constructor (five files, a form the precedent does not use); `nativeConstructorOfClass` (it also makes constructors with parameters, which it would apply to no arguments); an earlier forcing of the singleton's cell (an evaluation before the types exist); the compiled path compiling `FlatString` as a value (fork F1's way not taken; row 1082 open). Evidence: the precedent `BuildEnvironments.java:531-533`; fork F1 of `explorations/coordinator/CLIMB-BATCH-34.md`, "Forks the batch takes".
2. **Every native singleton, not `FlatString` alone.** The branch applies each native singleton's constructor, as the precedent applies each it makes. Way not taken: a test of the name `FlatString`, which leaves `Boolean`, `Char`, `NN32` and `RR32` set only when walk's fourth pass reads their names. Evidence: the five `makeNativeObject` bodies only register and answer a static value (section 1); `ant testSystem` and `ant testFast` green.
3. **`Reflect`'s two constructor objects and their library lines are left as they are.** They are objects with a parameter list, whose values the library makes by a call (`Library/Reflect.fss:365-367`), a valid expression on both paths, and `Reflect` is not one of the fourteen components of the one library (`Library/Reflect.fss` is not among the distance stage's targets). Way not taken: apply them at binding too and take the two lines out, an edit of `Library/Reflect.fss` beyond the rung's files.
4. **The two lines alone are taken out; `LineSeparator()` keeps its `do` block.** Ways not taken: `private LineSeparator(): String = natLineSeparator()`, or `lineSeparator` bound to `natLineSeparator()` directly; each moves more lines for no gain. The two lines moved the lines below them two up, so record.md gives the whole new lines of the three rows that cite them without naming a commit (rows 138, 141, 674), each cited line's text checked the same at its new number; rows 607, 912, 913, 914 and 915 cite them at a named commit and stay as they are.
5. **A plain walk test, not an `XXX` test.** The change repairs the defect (the first home of tests-writing.md). Named by its topic, `NativeStringsReadyAtLoadWalk`; it asserts a bound string's length and the line separator's, and prints both. No competing declaration: `grep -rn NativeStringsReadyAtLoadWalk` over `ProjectFortress/tests`, `ProjectFortress/*_tests` and `ProjectFortress/src/com/sun/fortress` finds only the test's own `component` line.
6. **Both suites, `ant testFast` and `ant testSystem`, once.** The rung's section asks for both; the brief's order of work names `ant testSystem` for an edit of walk. The section's list holds.

## 12. Defects and their homes

- **Row 1090**, walk's native strings work only after the object `FlatString`'s name is evaluated: home 1, repaired by this change; the assertion is in `ProjectFortress/tests/NativeStringsReadyAtLoadWalk.fss`. Row 1090 closes for walk (record.md).
- No new defect measured. The `IntLiteral` and `FloatLiteral` constructors that walk never makes are an observation: no run of this rung asked the type of such a value.

## 13. For FACTS, the ledger, the handover

In `explorations/compile-ladder/rung-flatstring-name/record.md`: the FACTS entry, row 1090's close, the three moved rows' new lines (linted: `explorations/coordinator/tools/ledger.py check --rows`, "3 rows, 0 fail the template"; a simulation of row 1090's closed line, 974 characters, also "0 fail the template"), no new row, the handover line and the section "Revival change".

## 14. Commands worked out

- The ladder subset's selection (section 8): `awk -F'\t' 'NR>1 && $11 ~ /NAMES/' ladder.tsv`, column 11 being `first_error`.
- The citations' move: each cited line of `Library/FlatString.fss` at 639eef1806 compared with the line two above it in this tree (`git show 639eef1806:Library/FlatString.fss | sed -n Np` against `sed -n (N-2)p Library/FlatString.fss`).

## 15. Questions for the curator

None.
