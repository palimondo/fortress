# Rung C of climb batch 33: four of the checker's smaller gaps

- problem: rows 1005, 1028, 1029 and 1060, each held by an expected-failure test that the compiled path failed on the base (`explorations/fortress-gap-ledger.md:92`, `:360`, `:361`, `:1061`).
- spec: `Specification/basic/operators/juxtameaning.tex:164-168` (a non-expression item applies to the element before it); `Specification/basic/variables.tex:85-95` (`var` is optional where `:=` is used) with `Specification/basic/components/source-code.tex:343` (the mutability must be the same); `Specification/basic/variables.tex:65`, `:107-111` and `:195-198` (a declared type, also beside names without one, also in a block); `Specification/basic/expressions/literals.tex:211-217` with `Specification/basic/expressions/blocks.tex:54-57` (the default where nothing fixes a type; a block's value is its last expression's).
- precedent: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1373-1376` (`joinInto`'s cases for a local declaration and a local function, row 1014's repair, d3095ca77); `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:324-336` (the top-level tuple binding's second check, row 474's repair, 060f3ec096); `ProjectFortress/src/com/sun/fortress/compiler/desugarer/AssignmentAndSubscriptDesugarer.scala:75-80` (a subscript written as a call of the subscript operator's method); `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:697` and `:908` (`equalParams` and `equalLValue` compare modifiers without `var`).
- deviation: `Operators.scala:313-321` builds the subscript's call inline with the desugarer's factory calls instead of calling the desugarer, since the checker has no instance of it; none in the other three repairs, which copy their precedent's form; the specification's spelling is kept.
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala` and `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala` (all four files are in the 2012 tree, `git cat-file -e a874948ac:<file>`; the two members edited in `Functionals.scala` are the revival's, from 53a6074ed7).

One launch of the worker's role worked this rung.

## What changed and why

Four gaps of the compiled checker, repaired in the order the brief gives, each test first.

1. **Row 1060, a block's numeral at an untyped binding** (commit 9df73b2d1b). The checker's default for a numeral at a place that fixes no type (`defaultNumeral`, `Functionals.scala:1259`) finds the numerals in a join's result positions through `joinNumerals`, and a tuple of them through `tupleJoin`. Neither had a case for a local declaration or a local function, whose body holds the rest of the block, so `x = do k: ZZ32 = 3; 4 end` left `x` a `NaturalNumeral[\1,10,4\]`, and `y: ZZ32 = x` died at run time. `joinNumerals` now reads a `LetExpr`'s body (`Functionals.scala:1332-1333`), and `tupleJoin` a `LocalVarDecl`'s and a `LetFn`'s (`:1290-1294`), as `numeralResult` (`:1317`) and `joinInto` (`:1373-1376`) do since row 1014's repair. The precedent's file has four members that walk a join's result positions; it repaired two, and this rung the other two.
2. **Row 1005, a subscript followed by a superscript** (commit d7ec58bdf3). The parser builds a `MathPrimary` of two or more math items for `x[5]^2`, and the checker reassociates it (`Operators.scala`, `checkExprOperators`, case `SMathPrimary`). Where every item applied in turn to the front, the reassociation left one application and no element after it; the checker then tried a juxtaposition of that one element, which no declaration takes, and returned the application unchecked, so the compile stopped: 'Result of typechecking still contains intermediate nodes.' The checker now checks that one application at the expected type (`Operators.scala:360-362`). With that, the code generator stopped on the subscript: 'Should not be a subscriptExpr here in codegen!' (`compiler/codegen/CodeGen.java:5729`), because the desugaring before the checker writes every subscript expression as a call of the subscript operator's method (`AssignmentAndSubscriptDesugarer.scala:75-80`) and the reassociation wrote a subscript expression. The reassociation now writes the call as the desugarer does (`Operators.scala:313-321`). The same repair compiles a subscript after a subscript, `g[1][2]`, which stopped the compile with the same message on the base (probe below), and `Maker.f()[5]^2`.
3. **Row 1029, a local tuple binding's declared name** (commit 102b1cd1fc). Where only some names of a local tuple binding declare a type and the right side is no tuple expression of as many elements, the checker typed the other names from the right side and left the declared ones unchecked (`Decls.scala`, `checkExprDecls`, the general `SLocalVarDecl` case). It now checks the right side again against each name's type (`Decls.scala:431-443`), as the top-level form does since row 474's repair (`:324-336`): an element converts where the name's type has a coercion from it, as `ZZ32` into `ZZ64`, and the binding is refused where it has none. The precedent's file has two such cases, the top-level and the local; the precedent repaired the first, and this rung the second.
4. **Row 1028, a top-level variable made mutable by `:=`** (commit 89819a591d). The export check compared a top-level variable's modifiers with `var` among them (`ExportChecker.scala`, `checkExports`' loop over the api's variables), so `tally: ZZ32 := 0` did not satisfy the api's `var tally: ZZ32`, though `:=` declares the variable mutable without the modifier. The check now compares the other modifiers (`ExportChecker.scala:232-235`), and the mutability as before (`:236`), as `equalParams` and `equalLValue` compare a field's and a value parameter's modifiers without `var` (`:697`, `:908`). The team's `XXX1an.test` pins 'due to different modifiers, different mutabilities' for `test var y: String` against `y: String = "init"`; it still holds (run below).

A fifth defect, measured beside row 1060, is recorded and not repaired: a `try` whose block and catch clause end in numerals, at an untyped binding, keeps a numeral type, and the compile refuses it (row 1074, `compiler_tests/XXXNumeralEndsUntypedTryCompiled.test`, commit b0f95e758d).

## The tests: failing on the base, passing after

Each expected-failure test was promoted by its topic, before the first edit was built: `XXXNumeralEndsUntypedBlockCompiled` to `NumeralEndsUntypedBlockCompiled` (a run-time pair: `NumeralEndsUntypedBlockCompiledLink.test` and `NumeralEndsUntypedBlockCompiled.test`), `XXXSubscriptThenSuperscriptCompiled` to `SubscriptThenSuperscriptCompiled`, `XXXLocalTupleBindingMixedTypes` to `LocalTupleBindingMixedTypes` (a run-time pair) and `XXXTopLevelVarByAssignExport` to `TopLevelVarByAssignExport`. New beside them: `LocalTupleBindingMixedRefused.fss` with `XXXLocalTupleBindingMixedRefused.test` (the refusal, in the team's form of an expected compile failure), and `TopLevelVarByAssignImport` (a program that reads and assigns both names through the api). The promoted programs gained cases: a float numeral, a numeral after a local function and a tuple (1060); a declared type, a parenthesized call as the front, a dotted call as the front and a subscript after a subscript (1005); a `String` beside an untyped name (1029); a tuple binding by `:=` (1028).

The failing run, on the base's code (the tree at 1609258002 with the tests renamed, before the first build, 2026-11-17T17:47:47Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh fail ProjectFortress/compiler_tests NumeralEndsUntypedBlockCompiledLink.test NumeralEndsUntypedBlockCompiled.test SubscriptThenSuperscriptCompiled.test LocalTupleBindingMixedTypesLink.test LocalTupleBindingMixedTypes.test XXXLocalTupleBindingMixedRefused.test TopLevelVarByAssignExport.test TopLevelVarByAssignImport.test

    . link ProjectFortress/compiler_tests/SubscriptThenSuperscriptCompiled ** bug! Result of typechecking still contains intermediate nodes.
        (var tally:ZZ32,
         due to different modifiers),
    Caused by: java.lang.NoClassDefFoundError: fortress/CompilerBuiltin$v
    Caused by: java.lang.ClassCastException: class com.sun.fortress.compiler.runtimeValues.FZZ32 cannot be cast to class com.sun.fortress.compiler.runtimeValues.FZZ64
    Tests run: 12,  Failures: 8,  Errors: 0

(`LocalTupleBindingMixedRefused`: 'Saw wrong failure. compile', since the base compiles it.)

Each repair's test passed in its own run after the repair was built (`junit.sh pass1060`, `pass1005`, `pass1029`, `pass1028`: 'OK (3 tests)', 'OK (2 tests)', 'OK (4 tests)', 'OK (9 tests)'; the last with `XXX1an.test`, `ExportVarRungX.test`, `TopLevelTupleBindingImport.test` and `ExportVarObjectParameter.test`). The last run after the last change of code is `ant testFast` at b0f95e758d:

    [junit]  run .../compiler_tests/LocalTupleBindingMixedTypes (1026ms) Passed
    [junit]  run .../compiler_tests/NumeralEndsUntypedBlockCompiled (1162ms) Passed
    [junit]  run .../compiler_tests/SubscriptThenSuperscriptCompiled (784ms) Passed
    [junit]  run .../compiler_tests/TopLevelVarByAssignImport (1496ms) Passed
    [junit]  compile .../compiler_tests/LocalTupleBindingMixedRefused  Saw expected failure

The dotted call as the front, `Maker.f()[5]^2`, was added to `SubscriptThenSuperscriptCompiled` after the last change of code (commit c66d3d22e5). The test fails on the base's code and passes on this tree:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base37 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/SubscriptThenSuperscriptCompiled.test
    . link .../compiler_tests/SubscriptThenSuperscriptCompiled ** bug! Result of typechecking still contains intermediate nodes.
    Tests run: 2,  Failures: 2,  Errors: 0

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh pass1005b ProjectFortress/compiler_tests SubscriptThenSuperscriptCompiled.test
    . run ProjectFortress/compiler_tests/SubscriptThenSuperscriptCompiled (348ms) PASS
    OK (2 tests)

### The expected-failure test of row 1074, shown red

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxxtry ProjectFortress/compiler_tests XXXNumeralEndsUntypedTryCompiled.test
    . compile ProjectFortress/compiler_tests/XXXNumeralEndsUntypedTryCompiled ...
        NaturalNumeral cannot be written in a program except as a parameter's type.
     Saw expected failure
    OK (1 test)

With the binding declared `x: ZZ32 = try`, for one run, then restored (`diff` against the saved copy printed nothing):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxxtryred ProjectFortress/compiler_tests XXXNumeralEndsUntypedTryCompiled.test
    1) ProjectFortress/compiler_tests/XXXNumeralEndsUntypedTryCompiled(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

## The whole compiled suite

`ant testFast` once, after the four repairs, at b0f95e758d (2026-11-17T18:02:14Z, under the batch's load, 14 min 52 s):

    BUILD SUCCESSFUL
    Total time: 14 minutes 52 seconds

The tracks: compiler 1701 tests, 0 failures, 0 errors (the landed gate of climb batch 31b: 1694; the seven more are this rung's: +1 for each of the three promoted run-time tests, +1 for the refusal, +2 for the import program, +1 for row 1074's test); library 86, 0, 0; othercompiler 263, 0, 0; misc 471, 0, 0 (`grep 'Tests run' ProjectFortress/TEST-RESULTS/fast-*/*.txt`). The specification, walk and the interpreter tests are untouched: the edits are in the compiled checker only.

## Where the fix belongs, and the precedent search

The four sites are where the tests show the cause (fork C1): each failing run names the checker's phase (the intermediate-node check after `TYPECHECK`, `compiler/StaticChecker.java:264-266`; the export check; a binding's type that the checker gives and the code generator then compiles). `explorations/coordinator/map/modules-and-phases.md` B.6 puts the type checker in `scala_src/typechecker/`, and the export check in `ExportChecker.scala`.

The ways each repair could take:

- Row 1060: add the cases to `joinNumerals` and `tupleJoin` (taken); give a `LocalVarDecl` and a `LetFn` their body's type in `defaultNumeral` alone (not taken: the join's other members would still stop at the declaration, as `joinInto` did before row 1014); default the variable's type where the binding is checked, in `Decls.scala` (not taken: the default belongs to the numeral, never to an expression of a numeral type, P-173).
- Row 1005: check the one application where no element follows it (taken); fold the case into the multifix branch with a one-element juxtaposition (not taken: no declaration takes one element, and the specification's reassociation leaves no juxtaposition there, `juxtameaning.tex:164-170`). For the subscript: write the call as the desugarer does (taken); keep the subscript expression and teach the code generator it (not taken: the code generator refuses it by design, `CodeGen.java:5729`, and every other subscript reaches it as a call); call `AssignmentAndSubscriptDesugarer.desugarSubscriptExpr` (not taken: it would edit a file of `compiler/desugarer/`, outside the rung's files, to share the member, or make a desugarer per subscript).
- Row 1029: check the right side again against each name's type, as the top-level form does (taken); check only the declared names' elements one by one (not taken: the tuple's coercion converts element by element already, `conversions-coercions.tex`, section "Coercions for Tuple and Arrow Types", and the two forms would differ); share one helper with the top-level case (not taken: the file keeps the two cases apart, and a shared helper would edit the top-level case too).
- Row 1028: compare the modifiers without `var`, and the mutability as before (taken, as `equalParams` and `equalLValue` do); add `var` to a `:=` declaration's modifiers at the parse (not taken: it changes the tree that walk and the other phases read, for a check that one comparison settles).

## What the specification settles

- 1005: `juxtameaning.tex:164-168`: a non-expression element is applied to the element before it, and the result is an expression; so `x[5]^2` is `(x[5])^2` and `g[1][2]` is `(g[1])[2]`. The only static errors of the form are an exponentiation followed by a subscript or an exponentiation (`:150-151`).
- 1028: `variables.tex:85-95`: the modifier `var` is optional where `:=` is used; `source-code.tex:343`: the modifiers, the mutability among them, must be the same. The mutability of `tally: ZZ32 := 0` is the api's.
- 1029: `variables.tex:65` (the initializer's type is a subtype of the declared type), `:107-111` (types alongside the names, some elided), `:195-198` (the local form is the top-level form's).
- 1060 and row 1074: `literals.tex:211-217` (where a variable is declared without a type, a numeral takes its default) and `blocks.tex:54-57` (a block's value and type are its last expression's); P-173.

## Each program, old against new, and under walk

| program | base (old code) | this rung | walk |
|---|---|---|---|
| `NumeralEndsUntypedBlockCompiled` | links; run dies, `NoClassDefFoundError: fortress/CompilerBuiltin$v` | PASS | PASS |
| `SubscriptThenSuperscriptCompiled` | compile stops, intermediate nodes | PASS | 'Closure/Constructor for _[_] param 1 (i:ZZ32) got arg (): ()' (row 1, walk's gap) |
| `SubSubProbe` (`g[1][2]` alone, below) | compile stops, intermediate nodes | (in the test above) | not run |
| `LocalTupleBindingMixedTypes` | links; run dies, `ClassCastException` `FZZ32` to `FZZ64` | PASS | PASS |
| `LocalTupleBindingMixedRefused` | compiles, prints 8 | refused: 'Right-hand side has type (ZZ32, ZZ32), but declared type is (String, ZZ32).' | refused when it runs: 'RHS expression type ZZ32 is not assignable to LHS type String' |
| `TopLevelVarByAssignExport` / `Import` | refused: 'due to different modifiers' | compiles; the import prints PASS | PASS |
| `XXXNumeralEndsUntypedTryCompiled` | refused: 'NaturalNumeral cannot be written in a program except as a parameter's type.' | the same (not repaired) | PASS |

Commands: the old code through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base37 <tree>/tmp/old-caches compile|run|junit`, on copies of the test programs and on the probes below; walk as `../bin/fortress compiler_tests/<P>.fss` from `ProjectFortress/` (from `compiler_tests/` for the import program, whose api is found there). Walk gives the compiled answer on every program but `SubscriptThenSuperscriptCompiled`, where it fails as row 1 records; the refusal is static on the compiled path and at the binding's run under walk.

## The two stages and the checker's time

Both stages ran once on the final tree's code, at b0f95e758d (the code of 89819a591d; b0f95e758d adds only the expected-failure test of row 1074, and the later c66d3d22e5 only a case of a test, so no change of code followed either stage's start). Their comparand is the last landed gate's tables, `explorations/compile-ladder/climb-batch-31b/gate/checker-count.txt` and `distance.txt`, with the per-site list `explorations/compile-ladder/gate/distance-sites.tsv`.

**The count stage** (start 2026-11-17T18:17:26Z, load 10.10 from the batch's other agents):

    nohup bash -c '( time nice -n 19 explorations/coordinator/tools/checker-count/run.sh tmp/rung-checker-small-gaps/checker-count-postedit.txt tmp/rung-checker-small-gaps/cc-post ) >> tmp/rung-checker-small-gaps/count-run.txt 2>&1; ...' &
    #total	0
    #locations	0
    #crash	none

`diff explorations/compile-ladder/climb-batch-31b/gate/checker-count.txt tmp/rung-checker-small-gaps/checker-count-postedit.txt` prints nothing.

**The distance stage** (start 2026-11-17T18:22:44Z, load 4.41):

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-31b/gate/distance.txt tmp/rung-checker-small-gaps/distance-postedit.txt
    DISTANCE SAME   0

`diff` of the two tables prints only the `#seconds` row (150, FortressLibrary 96, against 169, FortressLibrary 112) and the `#machine` row (the load at start, 0.31 against 4.41). `tmp/rung-checker-small-gaps/dist-post/errors.tsv` holds its header and no row, as the per-site list holds none: no site moved.

**The checker's time (P-148).** One run of each tree, the same command, `time nice -n 19 explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`; the machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, the stage's JVM at `FORTRESS_THREADS=1`.

| run | tree | start | load at start | real |
|---|---|---|---|---|
| base | `/home/user/fortress-base37` (the base's code), before the first edit | 2026-11-17T17:45:58Z | 0.26 | 1m32.229s (92 s) |
| change | this tree at b0f95e758d | 2026-11-17T18:17:26Z | 10.10 | 1m59.042s (119 s) |

The change ran under the load of the batch's other agents, the base on an idle machine; the difference is within what that load gives, and no slowdown of several times shows. The results are the same: `diff tmp/count/base.txt tmp/rung-checker-small-gaps/checker-count-postedit.txt` prints nothing, and the two `run.txt` files (33 lines each) are equal after each run's tree path and scratch path are replaced by one word:

    diff <(sed 's|/home/user/fortress-base37|TREE|g; s|/home/user/fortress-checker-small-gaps/tmp/count/base|SCRATCH|g' tmp/count/base/run.txt) \
         <(sed 's|/home/user/fortress-checker-small-gaps/tmp/rung-checker-small-gaps/cc-post|SCRATCH|g; s|/home/user/fortress-checker-small-gaps|TREE|g' tmp/rung-checker-small-gaps/cc-post/run.txt)

prints nothing.

**The second pass.** A profile of the count stage on the change (a copy of `run.sh` with JFR on its `java` line; a profiled run, neither timed nor compared), 6,410 execution samples. `jfr view hot-methods`:

    com.sun.fortress.scala_src.nodes.Walker.walkCases7$(Walker, Object)     459   7.16%
    com.sun.fortress.scala_src.nodes.Walker.walkCases4(Object)              254   3.96%
    scala.collection.immutable.List.prependedAll(IterableOnce)              254   3.96%
    com.sun.fortress.scala_src.nodes.Walker.walkCases5(Object)              242   3.78%
    scala.runtime.BoxesRunTime.equals2(Object, Object)                      236   3.68%

Samples whose stack holds an edited member: `defaultNumeral` 45 (0.7 %), `tupleJoin` 1, `joinNumerals` 0, the `MathPrimary` reassociation (`associateMathItems`, `isFunctionItem`, `exponentiationStaticCheck`) 0, `ExportChecker` 30 (0.5 %). The edited code shows no gain to take, so the pass changes no code: there is no `pass` run, no second `ant testQuick`, and `pass`'s results are `change`'s. The pass adds no memo, so no audit.

**The ladder subset.** The thirteen files of `ProjectFortress/tests/` whose first error in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` names what the rung touched, run after the edit only with the drivers copied under `tmp/rung-checker-small-gaps/ladder/` (`run-subset.sh`, `classify.py`). None of them is in the newest landed `ladder.tsv` (climb batch 31b's, the pass list), so each is compared with the baseline's row:

| file | baseline 2026-09-19 | this tree |
|---|---|---|
| `ImplicitBlocks.fss`, `InferTest.fss`, `genericTest3.fss`, `rangeOperators.fss` | typecheck, 'Could not check call to operator juxtaposition' | the same |
| `transposition.fss` | typecheck, 'Could not check call to operator ^' | the same |
| `XXXTypeError.fss`, `objectTest8.fss` | typecheck, 'Right-hand side has type …' | the same |
| `expTest.fss` | typecheck, 'Could not check call to operator ^' | disambiguate, 'Variable asFloat is not defined.' |
| `simpleExp.fss` | typecheck, 'Right-hand side has type ZZ32, but declared type is RR64.' | typecheck, 'Could not check call to operator NE' |
| `ho.fss` | typecheck, 'Right-hand side has type IntLiteral, …' | the same message with `NaturalNumeral[\1,10,0\]` |
| `TupleBinding.fss`, `TupleBinding2.fss`, `Variable.VarWTypes.fss` | codegen, 'VarDecl … at tupled lhs not handled.' | pass |

The moves follow from work landed since the baseline, not from this rung: the three passes from the top-level tuple binding's compile (row 988's repair, 060f3ec096; their first error names a top-level `VarDecl`); `expTest` stops in name binding, before the checker, on `asFloat`, which `Number` no longer declares (P-165); `simpleExp`'s numeral now converts where it stands (P-173), and its next error is the prelude's missing `=/=` at `RR64` (row 1059); `ho`'s message names the numeral type by its revived name (P-174). None of the thirteen holds a subscript before a superscript or a subscript (`grep -n '\]\^\|\]\[' ` prints nothing).

## Names added

The rung adds no name to the Java or Scala; it adds the test components `NumeralEndsUntypedBlockCompiled`, `SubscriptThenSuperscriptCompiled`, `LocalTupleBindingMixedTypes`, `LocalTupleBindingMixedRefused`, `TopLevelVarByAssignExport` (an api and its component), `TopLevelVarByAssignImport` and `XXXNumeralEndsUntypedTryCompiled`. `grep -rlw --include=*.fss --include=*.fsi "component <name>\|api <name>" ProjectFortress Library` finds each only in its own file, and `find ProjectFortress -name '*<name>*'` outside `compiler_tests/` finds only the suites' cache entries. The objects and functions the programs declare (`Mat`, `Grid`, `Maker`, `mk`, `two`, `named`) are their components' own.

## The specification

The rung edits no text of the specification (`git diff --name-only 1609258002 -- Specification` prints nothing); see "Sentences of the specification made false".

## Sentences of the specification made false

None. The four repairs bring the compiled path to what `juxtameaning.tex`, `variables.tex`, `literals.tex` and `blocks.tex` say; no Appendix I Effect names rows 1005, 1028, 1029 or 1060 (`grep -n '1005\|1028\|1029\|1060' Specification/appendices/changes.tex` prints none). The Effect of the numerals' entry lists the implementations' departures from its text (`Specification/appendices/changes.tex:5466-5480`); row 1074 is a departure that the list does not name, for the gather.

## Points to report

- **Each repair, by file and member, and its rule.** `Functionals.scala`, `joinNumerals` and `tupleJoin`: a numeral at a place that fixes no type takes its default, P-173, through a block's last expression after a local declaration (`literals.tex:211-217`, `blocks.tex:54-57`). `Operators.scala`, `checkExprOperators`, case `SMathPrimary`, and its `reassociateMathItems`: the reassociation of `juxtameaning.tex:164-168`, and a subscript written as the desugarer writes it. `Decls.scala`, `checkExprDecls`, case `SLocalVarDecl`: a declared name's element is checked against its type (`variables.tex:65`, `:195-198`). `ExportChecker.scala`, `checkExports`: `var` is the mutability, which `:=` gives too (`variables.tex:85-95`, `source-code.tex:343`). Evidence: the four commits above.
- **Rows 1005, 1028, 1029 and 1060: each expected-failure test promoted, failing on the base and passing after; each program under walk.** The table above: walk gives the same answer for 1028, 1029 and 1060, and fails on 1005's program (row 1, walk's gap, unchanged).
- **Every existing test whose pinned message changed.** None. The renamed tests drop their expected-failure keys as promoted tests do; `XXX1an.test`'s pinned 'due to different modifiers, different mutabilities' still holds (`junit.sh pass1028`: 'Saw expected failure').
- **The two stages' tables on the final tree against the comparand, and the checker's timing.** Below in "The two stages and the checker's time".
- **Each sentence of the specification that the change makes false.** None.
- **A file edited beyond those named.** None: the four files are under `scala_src/typechecker/`.
- **Reserved point: a program that compiled and is now refused.** `LocalTupleBindingMixedRefused.fss`: the base compiles it and prints 8; the rung refuses it, `LocalTupleBindingMixedRefused.fss:8:28-31: Right-hand side has type (ZZ32, ZZ32), but declared type is (String, ZZ32).` A second class, by the same rule as P-173's `q: QQ = x`: a variable bound without a type to a block that ends in a numeral after a local declaration is now a `ZZ32`, so a later use that only the numeral's own type took is refused where the base compiled it and died at run time (row 1060's `NoClassDefFoundError`); the probe `BlockNumeralAtFloatProbe` ("Probe programs", below), `x = do k: ZZ32 = 3; 4 end` then `half(x)` for `half(r: RR64)`: the base compiles it and the run dies, `NoClassDefFoundError: fortress/CompilerBuiltin$v`; the rung refuses it, 'Could not check call to function half - RR64->RR64 is not applicable to an argument of type ZZ32.', because the compiler's prelude converts no `ZZ32` value into `RR64` (row 442); walk prints 2.0, through the one library's coercion. Both refusals follow from the repairs' rules, and no test of the suites compiled before and is refused now (`ant testFast` green).
- **Reserved point: a model line.** None: no line of microGPT or its helper files changes.

## Decisions

1. **The failing runs of the four rows in one harness run on the base's code, before the first build, then each repair in the brief's order (1060, 1005, 1029, 1028), each built and its test run before the next.** Ways not taken: each row's failing run on the old code just before its repair (the same base code, through `old-fortress.sh junit`, four runs instead of one); all four repairs in one build. Evidence: `tests-writing.md`, "The order", asks the failing run before the first build; the brief asks each row in turn.
2. **Each repair's form**, as "Where the fix belongs" gives, with the ways not taken there.
3. **Promoted tests named by the old names without the prefix,** and the promoted programs extended with the cases the rows' notes name (`B.f()[5]^2`, the tuple ending a block, `(e: String, f) = two()`, a tuple binding by `:=`). Way not taken: new names by topic. The old names already name the topic.
4. **The refusal of a declared name's mismatch is a test of its own, in the team's form** (`XXXLocalTupleBindingMixedRefused.test` over `LocalTupleBindingMixedRefused.fss`, as `XXXTopLevelTupleBindingMixedRefused.test` over `TopLevelTupleBindingMixedRefused.fss`). Way not taken: no refusal test (the repair would then be held by the conversion alone).
5. **The `try` defect (row 1074) is recorded as an expected failure with a new row, not repaired.** Way not taken: a case for `STry` in `joinNumerals`, one line beside this rung's. Evidence: fork C1 repairs the four rows where their tests show the cause; the brief's step 5 keeps the edit as small as the tests need.
6. **The checker's second pass changes no code.** The profile of the count stage on the change shows none of the edited members among the hot frames (below). Way not taken: a speed change elsewhere in the checker, which this rung's change did not slow.
7. **The ladder subset is the thirteen files of `tests/` whose first error in the baseline names what the rung touched** (the juxtaposition, `^`, a tuple binding, 'Right-hand side … declared'). Way not taken: the files whose first error is a name binding, which the checker never reaches.

No decision of the curator covers 1 to 7 beyond fork C1, P-173 and P-148, which they follow.

## Defects and their homes

- Row 1060: home 1, repaired; `NumeralEndsUntypedBlockCompiled`.
- Row 1005: home 1, repaired; `SubscriptThenSuperscriptCompiled`. The same defect for a subscript after a subscript, `g[1][2]`, which the row's claim does not name: repaired by the same change, asserted in the same test.
- Row 1029: home 1, repaired; `LocalTupleBindingMixedTypes` and `LocalTupleBindingMixedRefused`.
- Row 1028: home 1, repaired; `TopLevelVarByAssignExport` and `TopLevelVarByAssignImport`.
- Row 1074, a `try` ending in numerals at an untyped binding refused on the compiled path: home 2, the specification settles it (`literals.tex:211-217`, P-173); `compiler_tests/XXXNumeralEndsUntypedTryCompiled.test`, shown red on a deliberate fix.
- Row 1, walk's subscript before a superscript: unchanged, walk's gap; the rung's program meets it under walk.

## For FACTS

See record.md: one new entry, and three entries that the change makes wrong in part (F-363, F-369, F-380).

## Commands worked out

- A profile of the count stage: a copy of `explorations/coordinator/tools/checker-count/run.sh` under `tmp/` whose `java` line adds `-XX:FlightRecorderOptions:stackdepth=256 -XX:StartFlightRecording=filename=$PROFJFR,settings=profile,dumponexit=true`; then `jfr view hot-methods <file>.jfr`, and `jfr print --events jdk.ExecutionSample --stack-depth 256` counted by awk for the samples whose stack holds a member's name.

## Probe programs

`SubSubProbe`, a subscript after a subscript alone; on the base, `compile` prints '** bug! Result of typechecking still contains intermediate nodes.':

    component SubSubProbe
    export Executable
    object Mat(v: ZZ32)
        opr [i: ZZ32]: ZZ32 = v + i
    end
    object Grid(v: ZZ32)
        opr [i: ZZ32]: Mat = Mat(v + i)
    end
    run(): () = do
        g = Grid(7)
        println(g[1][2])
    end
    end

`BlockNumeralAtFloatProbe`, the reserved point's second class; on the base it compiles and its run dies, `NoClassDefFoundError: fortress/CompilerBuiltin$v`; on the rung `compile` prints 'Could not check call to function half' and '- RR64->RR64 is not applicable to an argument of type ZZ32.'; walk prints 2.0:

    component BlockNumeralAtFloatProbe
    export Executable
    half(r: RR64): RR64 = r / 2.0
    run(): () = do
        x = do
            k: ZZ32 = 3
            4
          end
        println(half(x))
    end
    end

`TryNumeralProbe` is the program of `XXXNumeralEndsUntypedTryCompiled.fss` under another name; the base refuses it as the rung does.
