<!-- Rung D of climb batch 32: a top-level tuple binding on the compiled path, the checker's typing of each name and the code generator's case; with the runs, the stages, the decisions and the defects met on the way. -->

# Rung D: a top-level tuple binding on the compiled path

- problem: `fortress compile` of `(nEmbd, blockSize) = (16, 4)` with `println(nEmbd)` stops, '** bug! Result of typechecking still contains intermediate nodes.', and behind it the code generator throws 'tupled lhs not handled' (ledger rows 988 and 474; `explorations/compile-ladder/plan-31/probes/model-closure-check.md:45`)
- spec: "All forms can be used with tuple notation to declare multiple variables together" (`Specification/basic/variables.tex:99`)
- precedent: the local tuple binding's code, which takes the elements out of the tuple by its typed getters (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4436`), and walk's desugaring of the top-level form into a temporary and one declaration for each name (`ProjectFortress/src/com/sun/fortress/interpreter/rewrite/DesugarerVisitor.java:857`)
- deviation: the hidden variable is a class of the code generator, `<Component>$tuple$<first name>`, not a declaration in the tree as walk's temporary is; a right side that is a tuple of as many elements is evaluated whole into that variable, not element by element into the names as the local form does (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6528`)
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:272`)

The code is commit `47aad62914` on `wip/rung-tuple-binding`, cut from `db352c1776`. Machine for every run below: 4 CPUs, Intel Xeon 2.10 GHz, OpenJDK 25.0.4.1, one other agent of the batch building and testing beside this one.

## What changed and why

**The checker** (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:272-277`). A top-level variable's type is read lazily: `Thunker.primeVariables` gives each name of a declaration a thunk that checks the whole declaration once and takes the name's element out of the right side's type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Thunker.scala:198-205`). The checker has a case of its own for a binding of several names to a tuple expression of as many elements (`Decls.scala:250`). It checks each element against its name, then builds a new tuple from the checked elements with `ExprFactory.makeTupleExpr`, which gives the tuple no type. So the thunk read no type, for every name. That is where the names' types were lost. A reference to a name without a type returns its expression unchecked and reports nothing (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:634`): this is row 474's "accepted anywhere" and its block that ends without an error, and the unchecked expression is the intermediate node of row 988's stop. The repair gives the rebuilt tuple the tuple type of its checked elements. The case for any other right side, a call or a variable, already typed its names; it is not changed, and neither is a single binding or a local tuple binding.

**The code generator** (`CodeGen.java:6481-6570`). `forVarDeclPrePass` threw for a left side of more than one name. It now hands such a declaration to `forTupleVarDeclPrePass`:

- the right side becomes the value of one hidden top-level variable of the right side's tuple type, a class `<Component>$tuple$<first name>` made by the same `generateVarDeclInnerClass` that makes every top-level variable's class;
- each name gets its own class, as a top-level variable has, whose initializer reads the hidden variable's field and calls the tuple's typed getter for its element; a mutable name's field holds a `MutableFValue` cell, as a single mutable variable's does;
- `addTopLevelVarBinding` registers each name's binding before any code is generated, as it does for a single variable, so a name is visible to initializers above it and to importing components under the usual class name;
- a wildcard `_` binds nothing and gets no class; the hidden class is named after the first name that is no wildcard, and a binding of wildcards only emits nothing.

`generateVarDeclInnerClass` gained an overload that takes the code that pushes the value; the old signature calls it with `exp.accept`.

## The failing runs and the passing run

On the base's code, in my tree before the edit was built (the first form of the test; 2026-11-16T02:01:48Z):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests TopLevelTupleBindingCompiled.test TopLevelTupleBindingType.test
    . compile ProjectFortress/compiler_tests/TopLevelTupleBindingCompiled ** bug! Result of typechecking still contains intermediate nodes.
    F. compile ProjectFortress/compiler_tests/TopLevelTupleBindingType
        VarDecl (nHead:ZZ32,headDim:ZZ32)=TupleExpr at … tupled lhs not handled.
    Tests run: 4,  Failures: 4,  Errors: 0

The tests in their final form (the wildcard lines, the counter declared first, the refusal's `.test` under the folder's `XXX` name, the import test), on the old code from the base build (2026-11-16T02:35:09Z):

    $ explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base33 <tree>/tmp/rung-tuple-binding/old-caches junit <tree>/ProjectFortress/compiler_tests/TopLevelTupleBindingCompiled.test …/XXXTopLevelTupleBindingType.test …/TopLevelTupleBindingImport.test
    . compile …/TopLevelTupleBindingCompiled ** bug! Result of typechecking still contains intermediate nodes.
    F. link …/TopLevelTupleBindingImport … TopLevelTupleBindingApi.fss:4:1-29: VarDecl (width:ZZ32,title:String)=TupleExpr … tupled lhs n
    Tests run: 6,  Failures: 6,  Errors: 0

On the edit, the last run after the last change of code (the code of `47aad62914`):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh fix4 ProjectFortress/compiler_tests TopLevelTupleBindingCompiled.test XXXTopLevelTupleBindingType.test TopLevelTupleBindingImport.test XXXTopLevelVarByAssignExport.test
    . compile ProjectFortress/compiler_tests/TopLevelTupleBindingType … Right-hand side has type ZZ32, but declared type is String. … Saw expected failure
    . run ProjectFortress/compiler_tests/TopLevelTupleBindingCompiled (564ms) PASS
    . run ProjectFortress/compiler_tests/TopLevelTupleBindingImport (559ms) PASS
    OK (7 tests)

The whole suite for a checker edit, once, at `47aad62914`:

    $ ant testQuick
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0
    [junit] Tests run: 1576, Failures: 0, Errors: 0, Skipped: 0
    BUILD SUCCESSFUL

The four-thread atomic runs of the skill's `gate.md`, since the edit passes through the code that makes a mutable top-level variable's class: 66 lines, 66 `PASS`.

## The tests

- `ProjectFortress/compiler_tests/TopLevelTupleBindingCompiled` (compile, link, run): integer and float numerals, used in arithmetic; `width: ZZ32 = nEmbd` and `share: RR64 = half`, which pin a numeral element's default at each name; names typed one by one and by one tuple type; a right side that is a call; a `var` binding, assigned; wildcards; and a call with a counter, which pins that the right side runs once however many names are read.
- `ProjectFortress/compiler_tests/XXXTopLevelTupleBindingType.test` over `TopLevelTupleBindingType.fss`: `z: String = headDim` is refused, 'Right-hand side has type ZZ32, but declared type is String.' The `.test` file has the `XXX` prefix because the harness reads a compile that must fail so (as `XXXCoverageReturnBad.test` over `CoverageReturnBad.fss`); it is no expected failure. The section's note that row 474 "says passes today" holds in the sense that the base's checker passes the line: on the base the test is red on the code generator's throw.
- `ProjectFortress/compiler_tests/TopLevelTupleBindingImport` with `TopLevelTupleBindingApi.fsi` and `.fss`: names bound by tuple bindings, one mutable, exported through an api and read and assigned by an importing component.

## Where the fix belongs, and the precedent search

The feature map puts top-level variable declarations at `Decls.scala` for the checker and `CodeGen.forVarDecl` for the code generator (`explorations/coordinator/map/spec-to-implementation.md:200`). The checker's defect is in the one case that rebuilds the right side; the two other `SVarDecl` cases and the three `SLocalVarDecl` cases of the file keep the checked right side or build it typed, so there is one site, not a family (`Decls.scala:248-338`, `:349-438`). The code generator's precedents are two: the local form (`CodeGen.java:4436`), which evaluates a tuple-valued right side once and picks its pieces with `INVOKEINTERFACE` on the tuple's typed getters, and walk's desugaring, whose comment states the team's design: "Introduce a temporary, then initialize elements piece-by-piece" (`DesugarerVisitor.java:858-859`). The edit follows both: one temporary, pieces by the typed getters.

## What the specification settles

`Specification/basic/variables.tex:99-120`: every form of a top-level declaration can be used with tuple notation, with the types beside the names, as one tuple type, or left out; "especially helpful when a function application returns a tuple of values". `:63` and `:74`: a variable's value "is computed to be the value of the initializer expression", so one evaluation. `:122`: an initializer can refer to variables declared later. P-173 gives a numeral element its default at an untyped name. Nothing there says when a top-level initializer runs; `Specification/basic/components/initialization.tex:15` asks only that every variable is initialized before its use.

## The binding as compiled

- When: the right side is evaluated when the first of its names is first read, in the static initializer of the hidden class, which the JVM runs once. A single top-level variable is evaluated the same way today: `x = one()` with a printing `one` prints 'run starts' before 'one runs'.
- How many times: once. `TopLevelTupleBindingCompiled` asserts `calls = 1` after three reads of the two names at four threads.
- What each name is: a top-level variable of its own class `<Component>$<name>`, immutable or a `MutableFValue` cell, typed by its declared type or its element's type; importing components read it as any exported variable.

## Programs run old against new

The before of each is the record's: rows 988 and 474 and the planner's probe (`model-closure-check.md`). I ran them on my code only.

| program | before (the record) | after |
|---|---|---|
| row 988's reproducer, `explorations/compile-ladder/plan-31/probes/model-closure/TupleTopPlain.fss` | '** bug! Result of typechecking still contains intermediate nodes.' | compiles; the gated test covers it |
| row 474: `z: String = headDim` | passes | 'Right-hand side has type ZZ32, but declared type is String.' |
| row 474: `zz0: ZZ32 = beta1` | passes | 'Right-hand side has type RR64, but declared type is ZZ32.' |
| row 474: `y = beta1 x`, `x: RR64` | ends the block's check without an error | compiles and prints 1.7 |
| row 474: `w = 1.0 headDim` | ends the block's check without an error | under the prelude, 'Could not check call to operator juxtaposition … (RadixPointNumeral[\2,1,10,10\], ZZ32)': the prelude has no product of an `RR64` and a `ZZ32` (row 442) |
| `(a, b): (ZZ32, ZZ32) := (1, 2)`, `(c, d): ZZ32... = (3, 4)`, `(e: ZZ64, f) = (5, 6.5)`, `(g, h) = pair`, `(m, n) = (later, later + 1)` with `later` declared below, `(p, q) = swap(g, h)` | — | compiled: `11 , 2 , 3 , 4 , 5 , 6.5 , 7 , 8 , 40 , 41 , 8 , 7`; walk prints the same values |
| `(inc, t) = (fn …, (1, 2))`, `(o: Object, s: String) = (1, "x")`, `(u: NN32, z: ZZ64) = (5, 6)` | — | compiled and walk: 4, 1, x, 5, 6 |
| `(_, b) = (1, 2)` and `(_, d) = (3, 4)` | — | compiled and walk: 6 |

**The model's lines 17 to 19.** The planner's command, on my code:

    $ explorations/compile-ladder/plan-31/probes/model-closure/run.sh check <out> explorations/run-c4/src <tree>/Library/FortressLibrary.fss <tree>/Library/System.fss <tree>/Library/FileSupport.fss <tree>/Library/File.fss FlatArrays.fss FlatData.fss MicroGptFlat.fss
    @@TC COMPONENT	FortressLibrary	errors=0
    @@TC COMPONENT	FlatArrays	errors=144
    @@TC COMPONENT	FlatData	errors=9
    @@TC COMPONENT	MicroGptFlat	errors=27

No error is at lines 17 to 19, before or after. `MicroGptFlat.fss` held 8 distinct sites and holds 9: `:41` is gone, and `:77` is new, twice.

- `:41`, `matShape`'s `if` of pairs "typed `((), ())`" in the planner's table, was this defect: its pairs are `(vocabSize, nEmbd)` and the like, names of line 17.
- `:77:10-16` and `:77:21-32`, `m' = beta1 m + (1 - beta1) g`: 'Could not check call to operator juxtaposition … not applicable to an argument of type (RR64, Array[\RR64,ZZ32\])'. The product of an `RR64` and an unsized array, of the kind of the `DOT` sites at `:27`, `:31` and `:34`. Row 474 hid it: `beta1` had no type, so the statement was left unchecked.

The same driver with `full`, which goes on into the code generator:

    @@CG OK	VarDecl [nEmbd:ZZ32, blockSize:ZZ32, nHead:ZZ32, headDim:ZZ32, vocabSize:ZZ32, bosId:ZZ32]	…/MicroGptFlat.fss:17:1-78
    @@CG OK	VarDecl [epsilon:RR64, lr0:RR64, beta1:RR64, beta2:RR64, epsilon_A:RR64, nSteps:ZZ32]	…/MicroGptFlat.fss:18:1-97
    @@CG OK	VarDecl [corpusPath:String, weightsDir:String]	…/MicroGptFlat.fss:19:1-22:82

Before, the driver met 'tupled lhs not handled' at each of the three (`model-closure-check.md:58`). No line of the model or of its helper files is changed.

## The stages and the timing

Both stages ran once, on `47aad62914`, the final tree: no code changed after their start.

**The count stage.** Against climb batch 30's gate table:

    $ diff explorations/compile-ladder/climb-batch-30/gate/checker-count.txt <the table of 47aad62914>
    (nothing)
    #total	0
    #locations	0
    #crash	none

**The distance stage.**

    $ explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-30/gate/distance.txt <the table of 47aad62914>
    DISTANCE SAME   0
    #seconds	127	FortressLibrary 79
    #shadow	every shadow edit matched the tracked sources

`errors.tsv` of the run and `explorations/compile-ladder/gate/distance-sites.tsv` hold a header and no site, so no site moved. The stage took 129 s of wall time, load at start 3.77.

**P-148's runs** (the skill's `compiler.md`, "The checker's time"), one session, the same command, the other agent's work beside both:

| run | tree | seconds (real) |
|---|---|---|
| base | the base build, `/home/user/fortress-base33` | 92.6 |
| change | `47aad62914` | 80.5 (load at start 2.94) |

The two tables are equal (`diff` prints nothing), and the two `run.txt` files are equal after each tree's path is replaced by one word (`diff` prints nothing; 33 lines each). The second pass changed no code, so there is no `pass` run and no second `ant testQuick`: the interpreter's library has no top-level tuple binding (`grep -n '^(.*) *=' Library/*.fss ProjectFortress/LibraryBuiltin/*.fss` finds none outside comments), so the count stage never runs the changed case, and a JFR profile of the stage (4,809 samples, an instrumented copy of the script under `tmp/`) shows no frame of it. Its top frames are the generated walker's: `Walker.walkCases7$` 361, `walkCases5` 211, `walkCases0` 178, `walkCases2` 173, `ASTGenHelper$.scalaify` 163. The added work is one tuple type for each top-level tuple binding of a tuple expression.

**The ladder subset** of my change: the three files of the baseline whose recorded first error is 'tupled lhs not handled' (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`: `tests/TupleBinding.fss`, `tests/TupleBinding2.fss`, `tests/Variable.VarWTypes.fss`, each at `codegen`). The gate's 85 do not hold them, so the comparison is with the baseline. After the edit, by `run-subset.sh` and `classify.py` copied under `tmp/rung-tuple-binding/ladder/`:

    tests	TupleBinding.fss		pass
    tests	TupleBinding2.fss		pass
    tests	Variable.VarWTypes.fss		pass

Three files UP, from `codegen` to `pass`. The microGPT components stop at disambiguation under the prelude ('Array is undefined.'), which this change does not reach.

## Sentences of the specification made false

None. `grep -n -i 'tuple binding\|tuple notation\|top-level tuple\|tupled' -r Specification --include=*.tex` outside `Specification-1.0-frozen` finds `basic/variables.tex:99`, `:137` and `basic/expressions/bindings.tex:44`, each the language's rule and none a note on what either path does; `appendices/changes.tex` has no entry on top-level variables.

## Points to report

1. **Where the names' types were lost, and the repair.** `Decls.scala:272-277`, above.
2. **The binding as compiled.** Above: once, at the first read of any name; each name a top-level variable.
3. **Row 988's reproducer and row 474's cases, a numeral element's type, a var binding, a typed one, a call.** The table above and `TopLevelTupleBindingCompiled`.
4. **The model's lines 17 to 19 under the distance stage's driver.** Above: no checker error before or after; the code generator's three throws are three `@@CG OK`; the file's sites go from 8 to 9 (`:41` gone, `:77` twice new).
5. **The count and distance tables, their commit, their seconds, P-148's runs.** Above.
6. **Each sentence of the specification made false.** None.
7. **A file edited beyond those named.** None outside the two named files. Inside `CodeGen.java`, beside `forVarDeclPrePass`, the edit touches `generateVarDeclInnerClass` (an overload added, `:6436-6462`) and `addTopLevelVarBinding` (each name registered, `:6572-6583`), both called only for top-level variables, and adds `forTupleVarDeclPrePass`, `tupleVarDeclHolderClass` and `isWildcard`.
8. **A model line.** None changed. One model line newly reported by the checker against the one library, `MicroGptFlat.fss:77`, above.
9. **A change of how a single top-level binding or a local tuple binding is typed.** None: the edited case runs only for several names.

## Decisions

1. **The right side goes whole into one hidden variable; each name takes its element from it.** Ways not taken: (a) for a right side that is a tuple expression, each name's class evaluates its own element, as the local form does (`CodeGen.java:4436`): each element would then run at the first read of its own name, at different moments, and a right side that is a call would still need the hidden variable, so two mechanisms; (b) a desugaring before the code generator into `t = e; a = t.1 …`: the language has no expression for a tuple's element, and walk's own desugaring of this kind is where its defect is (NEW-D-1). Evidence: fork D1, "the right side is evaluated once"; walk's comment (`DesugarerVisitor.java:858-859`).
2. **The hidden class is named `tuple$<first name>`.** Ways not taken: walk's `WellKnownNames.tempTupleName`, `*tuple_` and the declaration's position, which holds a file path and cannot be a class name; a counter, which would make the name depend on the order of generation. A top-level name is unique in its component and no identifier holds `$`, so the name cannot collide.
3. **A wildcard binds nothing; a binding of wildcards only emits nothing.** Way not taken: a class `<Component>$_`, which two bindings would write twice ('duplicate entry: Wild$tuple$_.class' was the first form's failure). Such a right side is then never evaluated on the compiled path, as an unread single variable's is not.
4. **The checker's repair types the rebuilt tuple; the case stays.** Way not taken: delete the special case and let the general case check the tuple against the tuple of declared types: the special case is the one that gives each untyped name its element's default beside typed names, as `(e: ZZ64, f) = (5, 6.5)`, and that is not this rung's to redo.
5. **The refusal test's `.test` file has the `XXX` prefix and its program a plain name.** Way not taken: a plain `.test` name, which the harness reads as a compile that must succeed (it was red so on the fixed code). The folder's precedent: `XXXCoverageReturnBad.test` over `CoverageReturnBad.fss`.
6. **The three defects met on the way are recorded, not repaired.** Walk is outside this rung's files, and the export check is another declaration of the checker. Each has an `XXX` test and a row.
7. **The compiled path's moment of evaluation is not recorded as a defect.** A top-level variable is initialized at its first read on the compiled path and at load under walk (row 152). The specification asks that a variable is initialized before its use (`initialization.tex:15`), which both do, and the tuple binding follows the single variable. No decision of the curator covers it; I acted on the reading that it is no defect, and list it for the curator.

## Defects and their homes

| defect | home | where |
|---|---|---|
| the checker loses the names' types (rows 988, 474) | 1, repaired | `compiler_tests/TopLevelTupleBindingCompiled`, `XXXTopLevelTupleBindingType.test` |
| the code generator has no case for several names (row 988's notes) | 1, repaired | `compiler_tests/TopLevelTupleBindingCompiled`, `TopLevelTupleBindingImport` |
| under walk the right side of a top-level tuple binding runs once for each name and once more | 2, the specification settles it (`variables.tex:63`, `:74`) | `tests/XXXTopLevelTupleBindingOnceWalk.fss`, row NEW-D-1 |
| under walk an initializer's call that reads a later mutable variable fails | 2 (`variables.tex:122`) | `tests/XXXInitializerCallReadsLaterMutableWalk.fss`, row NEW-D-2 |
| the export check refuses `:=` without `var` under the api's `var` | 2 (`variables.tex:85`) | `compiler_tests/XXXTopLevelVarByAssignExport.test`, row NEW-D-3 |

The first `XXX` test, `XXXTopLevelTupleBindingOnceWalk`, through `harness-one.sh`: as it is, 'FAIL: a ZZ32: 3 =/= a ZZ32: 1; the right side ran once … OK Saw expected exception', `OK (2 tests)` with the second; with its three expected values set to what walk gives (3, 2, 30) for one run, then restored, 'Missing expected failure', `Tests run: 1,  Failures: 1`.

NEW-D-1 in detail. `DesugarerVisitor.forVarDecl` makes a temporary for the right side and then builds each name's initializer as a field reference `$i` on `init`, the right side's expression, not on the temporary (`DesugarerVisitor.java:865-875`). So for n names the right side runs n + 1 times, and each name holds an element of a run of its own:

    $ bin/fortress WalkOnce2.fss        # (a1, a2) = pairA(); (b1, b2, b3) = tripleB(); each prints when it runs
    A runs
    A runs
    A runs
    B runs
    B runs
    B runs
    B runs

Row 152 says of an earlier model program's `(corpusTokens, corpusLengths) = loadCorpus(corpusPath)` that "the corpus loads once, on import as on run"; by this defect that right side runs three times; I did not run that program, which is only in git history. Today's two model programs bind only tuples of literals this way (`explorations/run-c4/src/MicroGptFlat.fss:17-19`, `explorations/apl/mg/MicroGptApl.fss:26-28`), so they pay only the cost of `10.0^(-5)` seven times.

## Commands worked out

- The count stage under JFR: a copy of `explorations/coordinator/tools/checker-count/run.sh` under `tmp/` with `-XX:StartFlightRecording=filename=<file>,settings=profile` put before `-Xmx4g` on its `java` line; then `jfr print --events jdk.ExecutionSample --stack-depth 64 <file>` and a count of the first frame of each sample.

## Questions for the curator

1. Walk's defect NEW-D-1 is one word of `DesugarerVisitor.java:873`: the field reference should be on the temporary. It is outside this rung. Repair it in a rung of walk, or leave it until walk is retired?
2. The moment of a top-level variable's initialization differs between the paths: at load, in declaration order, under walk (row 152); at the first read on the compiled path, also for a single variable. A program whose initializers write mutable state can see it. Is the compiled path's lazy initialization the design, or a gap to record?

## Added by the skeptic

The account above is the worker's, of `47aad62914`. `SKEPTIC.md`, beside this file, holds the check. What it changed:

- A defect of the change, repaired in `a29032ee89`: where only some names of a top-level tuple binding declare a type and the right side is no tuple expression of as many elements, the checker left the declared names unchecked (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:324-336` is the repair). `(total: ZZ64, part) = two()` compiled and failed the JVM's verification at class load; `(word: String, part) = two()` compiled and ran. Tests: `ProjectFortress/compiler_tests/TopLevelTupleBindingMixedTypes.test` and `XXXTopLevelTupleBindingMixedRefused.test` over `TopLevelTupleBindingMixedRefused.fss`.
- `ddfd231caf`: `CodeGen.isWildcard` asks `NodeUtil.isUnderscore` (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:710`).
- `0ab8dc21a1`: each of the rung's tests keeps one comment line.
- `2e52c7ec0c`: three defects that the base has too, each with a gated `XXX` test and a row in `record.md`: NEW-D-4 (`XXXLocalTupleBindingMixedTypes.test`), NEW-D-5 (`XXXBlockEndsInTupleOfNumeralCompiled.test`), NEW-D-6 (`XXXTupleBindingIfBranchesCompiled.test`).
- The whole suite for the checker edit, once, on the code of `ddfd231caf`: `ant testQuick`, `Tests run: 86`, `263` and `1585`, each with 0 failures, `BUILD SUCCESSFUL`.
- The count and distance tables above are those of `47aad62914`; neither stage ran after the skeptic's fixes. The interpreter's library has no top-level tuple binding, so the count stage does not run the repaired case.

