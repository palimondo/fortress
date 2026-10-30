<!-- Climb batch 22c, rung B (rung-bound-any): fortress compile bounds a type parameter declared without a bound by Any, as P-42 asks (row 412); the distance stage runs under the compile command's own setting; ten compiled tests and the team's doubledOverloading respelled. -->

# Rung B: the bound `Any` for `fortress compile` (P-42; row 412)

- problem: `fortress compile`, `link`, `build` and `typecheck` give a type parameter declared without a bound the bound `Object` (row 412), so the distance stage under the compile command's setting gave 685 errors, 580 of them on the bound `Object` (F-289) — `explorations/coordinator/FACTS.md:124`
- spec: "If a type parameter does not have an extends clause, it has an implicit "extends Any" clause." — `Specification/basic/trait-parameters.tex:52-53`
- precedent: `useInterpreterLibraries()`'s `setExtendsObjectPreDesugaring(false)`, the setting walk runs under — `ProjectFortress/src/com/sun/fortress/Shell.java:380`; for the four `comprises` tests, the library's `comprises { List[\E\] } where [\E\]` — `Library/List.fsi:56`
- deviation: `ImplicitBoundAny.test` checks its run with `run_out_WIcontains` where the brief wrote `run_out_contains`, since the compiler's prelude juxtaposes strings with `|||` and the run prints two spaces after `->` — `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:406`
- deviation: two compiled tests and the team's `doubledOverloading.fss` write `extends Object` where the specification's spelling leaves the bound out, each to keep the value it checks — `ProjectFortress/tests/doubledOverloading.fss:37`
- deviation: the new run-time pair's component carries no `XXX` prefix, since the defect needs a name that begins with `Tuple`; the `XXX` is on its run `.test` file — `ProjectFortress/compiler_tests/TupleNamedComponentGenericParam.fss:2`
- historical: `ProjectFortress/src/com/sun/fortress/Shell.java:372`; `ProjectFortress/compiler_tests/XXX6bu.test:16`; `ProjectFortress/compiler_tests/XXX6bv.test:16`; `ProjectFortress/tests/doubledOverloading.fss:36-41`; `Specification/basic/trait-parameters.tex:62-64`; `Specification/basic/inference.tex:37-38`; `Specification/appendices/changes.tex:3100-3109`

## 1. What changed, and why

P-42: a type parameter declared without a bound has the implicit bound `Any`. The compile command gave it `Object`: `Shell.useCompilerLibraries()`, which `compile`, `link`, `build` and `typecheck` call, opened with `setExtendsObjectPreDesugaring(true)` (`ProjectFortress/src/com/sun/fortress/Shell.java:372`; Steele, 2012, `afb02f41d`). `PreDisambiguationDesugaringVisitor.forStaticParam` then wrote `extends Object` into every empty `extends` clause (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:194-208`). Walk runs with the switch off (`Shell.java:380`).

The changes, in five commits on `wip/rung-bound-any`:

- `b3791c4d7`, the tests first: `XXXImplicitBoundAny` promoted to `ImplicitBoundAny` (`git mv`), and the nine compiled tests and the team's `tests/doubledOverloading.fss` respelled to keep the value each checks (section 9).
- `7964e59b7`, the fix: `Shell.java:372` reads `setExtendsObjectPreDesugaring(false)`. This is the planner's `bound412`, the same blob as `rung-B.patch` (`1df7072b8`). `ImplicitBoundAny.test` checks its run with collapsed whitespace (decision 2).
- `e2bc63d1a`, the stage: `DistanceMulti -setting compile` takes the switch from the line that opens `Shell.useCompilerLibraries()` in the tracked `Shell.java`, at each run, and stops if that line is not there (`explorations/coordinator/tools/distance/DistanceMulti.java:49`, `:79-92`). `run.sh`'s default setting is `compile` (`explorations/coordinator/tools/distance/run.sh:82`). The code is the planner's `stageCompile` byte for byte. Both headers now say so (`DistanceMulti.java:12-16`, `run.sh:24-36`), which the patch did not.
- `a6041f749`: a run-time `XXX` pair for a defect the probes measured, unrelated to the bound (section 11, row 840).
- `8d5efafda`, the specification: the box of "Type Parameters", the two boxes of the inference chapter, and their Appendix I entries (section 8).

## 2. The failing run and the passing run

The ten compiled tests, in one JVM, on the base's code (the tree held only the test edits, and nothing was built), at 23:20:22 UTC:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests ImplicitBoundAny.test XXX6bu.test XXX6bv.test XXXInferCallArgumentControls.test OpenTypeChecker.test ComprisesWhereFunctionalMethodChecker.test ComprisesWhereOverrideChecker.test XXXComprisesWhereFunctionalMethodBounds.test XXXOverrideGenericReturnTypeNotSubtype.test CoercionGenericFnCompiledRungC.test

    . link ProjectFortress/compiler_tests/ImplicitBoundAny ProjectFortress/compiler_tests/ImplicitBoundAny.fss:5:9-17:
        Ill-formed type: Seal[\Any\]
        The static argument Any does not satisfy the corresponding bound Object.
    F. compile ProjectFortress/compiler_tests/Compiled6.bu ...  Saw failure, but did not satisfy compile_err_equals
    Tests run: 13,  Failures: 9,  Errors: 0

The 9 failures are in 8 tests: `ImplicitBoundAny` (link and run), `Compiled6.bu`, `Compiled6.bv`, `XXXInferCallArgumentControls`, and the four `comprises` tests ('The static argument E does not satisfy the corresponding bound Object.'). The two guards pass on the base too: `XXXOverrideGenericReturnTypeNotSubtype` ('Saw expected failure') and `CoercionGenericFnCompiledRungC` (compile, link, run).

The same command on the final code, after the build and the library order, at 23:25:57 UTC (label `after2`):

    OK (13 tests)

A first run after the fix (23:25:16 UTC, label `after`) gave 'Tests run: 13, Failures: 1'. `ImplicitBoundAny`'s run printed 'kind of a Seal at Any ->  Seal at Any', with two spaces, against the brief's `run_out_contains=kind of a Seal at Any -> Seal at Any`; hence decision 2.

`tests/doubledOverloading.fss` under walk, through `explorations/compile-ladder/rung-inference-walk/harness-one.sh`, before the edit of `Shell.java` (23:21:32 UTC) and after the last change of code (23:43:32 UTC): 'OK, accepted statically.' and 'OK (1 test)' both times.

The 23 `.test` files of the compiled tests that import `CompilerSystem` (F-292), in one JVM, after the change (label `csys`): `Compiled2`, `XXX2h` to `XXX2s` without `XXX2q`, `Compiled90`, `XXX4a`, `XXX4b`, `XXX4c`, `Compiled4`, `XXX5f`, `Compiled5.h`, `XXX5j`, `Compiled7`, `XXX5n` and `AfterTypeChecking`.

    OK (138 tests)

`ant testQuick`, once, on the final code (the edit changes no checker code, but the brief asks for it):

    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 131.865 sec
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 206.079 sec
    [junit] Tests run: 1318, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 373.514 sec
    BUILD SUCCESSFUL
    Total time: 6 minutes 22 seconds

The three lines are library, othercompiler and compiler, in that order. The compiler track's 1318 is the last gate's 1315 (`explorations/compile-ladder/climb-batch-22/gate/summary.txt`), plus `ImplicitBoundAny`'s run and the new pair's two tests. On the four rungs' text the planner had 13 failures, these ten tests' 12 and rung A's one; this tree has none.

## 3. Where the fix belongs, and the precedent search

The record places it. Row 412 names `Shell.java:372` and `forStaticParam`. The foundations judgement, section 4, "Defaults", and the batch record's forks 11 to 14 set the rung. `explorations/coordinator/map/modules-and-phases.md`, "B.5 Desugaring", says that `Shell`'s flags choose which desugarings run, and that this is where the two paths differ.

The precedent is the line beside it: `useInterpreterLibraries()` sets the same switch false (`Shell.java:380`). The switch has one reader (`PreDisambiguationDesugaringVisitor.java:196`) and one other setter, the property default `fortress.compile.predesugar.extendsobject`, which is false (`Shell.java:1282`). It is one site, so there are no other sites to count.

For the test respellings, the library's own way: `AnyList comprises { List[\E\] } where [\E\]` (`Library/List.fsi:56`, `Library/List.fss:87`), the form the four `comprises` tests now take.

## 4. What the specification settles

`Specification/basic/trait-parameters.tex:52-53`: an unbounded type parameter has the implicit clause `extends Any`. `:67`: "Type parameters are instantiated with types such as trait types, tuple types, and arrow types". P-42 decides it, and the type group's paper of 2019 says the same: "By default, each type parameter has an upper bound Any" (`research/extracts/ParkPOPL2019.txt:418`). So the compile command's `Object` was the departure, and each test that pinned it pinned the departure.

## 5. Programs run old against new

Each program was compiled from `tmp/rung-bound-any/probes/` by a script. For the old code it runs `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 <caches> compile|run`; for the new, `bin/fortress compile|run` with a private copy of this tree's caches. The runs are at `FORTRESS_THREADS=4`.

| Program | Old code | This tree | Home |
|---|---|---|---|
| `IdTuple`: `id[\T\](x: T): T`, `q = id((3, 4))`, `println("q + 1 = " (q + 1))` | rc 0, prints 'q + 1 =  4' (it ran `id(3)`) | rc 255, 'Could not check call to operator +', among its lines '(ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type ((IntLiteral, IntLiteral), IntLiteral).' | row 691 |
| `WrapTuple`: `b.wrap[\(ZZ32,ZZ32)\]((2, 3))` for `wrap[\U\](y: U): U` | rc 255, 'No such method Box[\ZZ32\].wrap.' | compiles; the run prints 'REACHED' and dies, 'java.lang.ClassCastException' | row 832 |
| `VoidArg`: `h[\T\](x: T): ZZ32 = 1`, `h[\()\](())` written | compiles (row 470 lets the written argument pass); the run dies, 'java.lang.AbstractMethodError' | the same | row 339 |
| `VoidArgInferred`: the same, `h(())` | rc 255, '[\T extends Object\]T->ZZ32 is not applicable to an argument of type ().' | compiles; the run dies, 'java.lang.AbstractMethodError' | row 339 |
| `VoidExpected`: `nothingAt[\T\](): Maybe[\T\]`, `m: Maybe[\()\] = nothingAt()` | rc 255, 'Right-hand side has type Maybe[\Object\], but declared type is Maybe[\()\].' | rc 0, 'PASS' | `inference.tex:356-360`, as revised |
| `TupleBoxItem`: `Box[\(ZZ32, String)\]((7, "seven"))`, its getter bound to `(n, s)` | rc 255, 'The static argument (ZZ32, String) does not satisfy the corresponding bound Object.' | rc 0, 'n =  7  s =  seven', 'PASS' | row 412 |
| `TupleIdPair`: `p: (ZZ32, String) = id((7, "seven"))` | not run | rc 0, 'PASS' | row 412 |
| `ConcatAny`: `show[\T\](y: T): String = "got " \|\| y` | rc 0, 'got 3' | rc 255, '(String, Object)->String is not applicable to an argument of type (String, T).' | the prelude, until the switch-over |
| the team's `doubledOverloading.fss` as written | rc 0, 'OK, accepted statically.' | rc 255, 'For a, the return type of ()->() @ doubledOverloading.fss:37:1-39:70 should be a subtype of the return type of [\E\]E->A[\E\] @ doubledOverloading.fss:36:1-35', and the same for `b` | respelled (section 9) |
| `TupleBox`, `TupleBoxNoBind`, `TupleBoxWritten` (generic functions over `Box[\T\]` in components named `Tuple...`, at a pair) | refused by the bound ('... does not satisfy the corresponding bound Object.'); `TupleBoxAny`, with `extends Any` written, compiles and dies, 'java.lang.VerifyError: Bad type on operand stack' | each compiles and dies, 'java.lang.VerifyError: Bad type on operand stack'; so do `TupleBoxCount` and `TupleBoxZZ` | row 840 |

The last row is not the bound's; narrowed on this tree:

- `count[\T\](b: Box[\T\]): ZZ32 = 1` called as `count(b)` fails verification in a component named `TupleBoxCount` (three runs, every time). It fails in `TupleBoxZZ` too, at `T = ZZ32`, with no tuple at all.
- The same text as `component PairBoxCount` runs.
- The function with a second parameter (`TupleBoxTwo`) runs, and so does `id[\T\](x: T)` in a component named `TupleIdPair`.
- The failure is in the closure: 'Type '\=Tuple?com\|sun\|fortress\|compiler\|runtimeValues\|FZZ32?' (current frame, stack[1]) is not assignable to 'TupleBoxZZ$\=Box?com\|sun\|fortress\|compiler\|runtimeValues\|FZZ32?''.

Not traced: a grep of the tree (`startsWith("Tuple`, `indexOf("Tuple`) finds no test of a `Tuple` prefix by name, and `Naming.TUPLE_OX` is `Tuple⟦` (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1196`). Several variants on the way passed under names that did not begin with `Tuple` (`VPrintCount`, `VBindFirst`, `XBind`, `XAssert`, `XOther`, `XPrintAssert`, `XPrintStr`); `PairBoxCount` shows that the name decides it for `TupleBoxCount`'s text. A first `XXXGenericFnTupleInstance` passed through the harness for the same reason, and was deleted before any commit.

## 6. The stages

The edit changes `ProjectFortress/src/com/sun/fortress/Shell.java`, which is outside the paths that cannot move a stage. So both stages ran once on the final tree, after the build.

**The count stage** (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-bound-any/checker-count-postedit.txt tmp/rung-bound-any/cc-post`). Its table equals climb batch 22's landed table: `diff explorations/compile-ladder/climb-batch-22/gate/checker-count.txt tmp/rung-bound-any/checker-count-postedit.txt` prints nothing.

    #total	0
    #locations	0
    #crash	none

It took about 175 s of wall time: its first file was written at 23:46:09 UTC and its log's last line at 23:49:02. It ran under `nice -n 19` beside other agents, at load 4.91 5.24 4.23, on nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. The stage runs walk's setting (`tools/checker-count/WorldFlip.java:41`), which the rung does not change (fork 16), so it cannot see the flip. No checker code changed, so there is no speed pass (fork 14).

**The distance stage** (`explorations/coordinator/tools/distance/run.sh tmp/rung-bound-any/distance-postedit.txt tmp/rung-bound-any/dist-post`, with no third argument, so under the new default):

    #distance	setting compile; -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false; 12 components in one JVM (DistanceMulti -order check)
    #total	0
    #kind	bound-Object	0
    #crash	none
    #seconds	226	FortressLibrary 169

- Every `#kind` row is 0 (exclusion, comprises, overloading, return-type, abstract-method, bound-Object, wellformed, typecheck, export), and the `#shadow` row reads 'every shadow edit matched the tracked sources'.
- The machine: nproc 4, Intel Xeon @ 2.10 GHz, load at start 9.69 8.01 5.70, `FORTRESS_THREADS=1`, under `nice -n 19`.
- The run's first line is '### order=check setting=compile (extendsObject=false compiledExpr=true) prelude=INTERPRETER ...'. All 12 '### done' lines have rc=0, and all 168 '@@SC STAGE' lines read 'errors=0'.

`explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-22/gate/distance.txt tmp/rung-bound-any/distance-postedit.txt`:

    SETTING CHANGED   was setting any, now setting compile: the counts below are not like for like
    DISTANCE SAME   0

The sites: `tmp/rung-bound-any/dist-post/errors.tsv` and `explorations/compile-ladder/gate/distance-sites.tsv` each hold only their header row, so no site came or went. The next gate's comparison against climb batch 22's table will print the same SETTING CHANGED line. The change of setting is this rung's, declared here. Before the change, the compile setting gave 685 (F-289); it was not run on the base again.

The driver's other two cases, one JVM each, with no targets, from a scratch folder that holds a `Shell.java` at the path the driver reads:

    the base's Shell.java:   ### order=check setting=compile (extendsObject=true compiledExpr=true) prelude=INTERPRETER targets=[] overloadCache=default(true)
    line 372 removed:        Exception in thread "main" java.lang.RuntimeException: Shell.useCompilerLibraries() does not open with setExtendsObjectPreDesugaring    (rc=1)

So when the line is gone, the stage prints '#total none: the run ended without its last line' (`run.sh:146`) and exits 1.

## 7. The ladder

The ladder regression of the rung's own subset, run after the edit as the skill's `gate.md`, "The ladder regression", gives it. The drivers were copied under `tmp/rung-bound-any/ladder/`, the caches were copied twice from the tree's after the library order, and `subset.txt` holds `tests	doubledOverloading.fss`.

    tests/doubledOverloading.fss crc=0 rrc=0 3s
    pass: tests
      doubledOverloading.fss

Its `ladder.tsv` row, 'tests	doubledOverloading.fss		pass	3', equals the newest landed one, 'tests	doubledOverloading.fss		pass	2' (`explorations/compile-ladder/climb-batch-22/gate/ladder/ladder.tsv`). Its run output equals the baseline's with `Operation took` masked: 'OK, accepted statically.' (`explorations/compile-ladder/baseline-2026-09-19/raw/tests/doubledOverloading.fss.run`).

As the team wrote it, the file is refused under the flip (section 5), so it would move from `pass` to `typecheck`. The respelling keeps it at `pass`. The rung ran no other ladder file. The planner's whole regression on the four rungs' text moved this file alone ('DOWN tests/doubledOverloading.fss pass -> typecheck', `explorations/coordinator/CLIMB-BATCH-22c.md`, "The planner's probes").

## 8. The specification: sentences made false, and those revised

Revised by the rung, each to what the code now does, and each checked by a run in section 5. The revision boxes and the Appendix I entries are the revival's text in the team's chapters.

- `Specification/basic/trait-parameters.tex:62-65` (base), the box's last sentence, said: "The compiled path still gives such a type parameter of a program's own declarations the bound \TYP{Object} (row~412 of the revival's gap ledger), a divergence that lasts until the compiled path is switched over to the interpreter's library." Now `:62-64` says that the compiled path gives it the bound `Any` too, and that some instances at `()` or a tuple type still fail at run time there (`\secref{revival-bound}`).
- `Specification/appendices/changes.tex:3089-3092` (base) had the same sentence in revival-bound's Effect. Now `:3100-3109`:
  - the instantiation holds on the compiled path as in the interpreter;
  - the instances that fail at run time there are named, rows 339 and 832 (`VoidArgInferred`, `WrapTuple`);
  - until the switch-over, the compiler's library concatenates a `String` only with an `Object` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37`; `ConcatAny`).
  The entry's Change records the box's old and new last sentence (`:3068-3073`).
- `Specification/basic/inference.tex:37-40` (base) said: "the compiled path still takes \TYP{Object} for such a parameter of a program's own declarations (row~412 ...)". Now `:37-38`: bounded by `Any`, "on the compiled path as in the interpreter".
- `Specification/basic/inference.tex:358-362` (base) said: "on the compiled path a type parameter of a program's own declaration that is declared without an \KWD{extends} clause is bounded by \TYP{Object} (row~412 ...), so that a call that fixes such a parameter by nothing else, where the expected type is one that \TYP{Object} excludes, such as \TYP{()}, is a static error there." Now `:356-360`: it is bounded by `Any` there too, so that the expected type alone may fix it at a type that `Object` excludes (`VoidExpected`).
- `Specification/appendices/changes.tex:2003-2008`, revival-inference's Change, says that the box after the list says "what the compiled path's bound \TYP{Object} makes of it". A sentence added after `:2009` (`:2010-2016`) records the two boxes' new text.

`grep -rn 'row~412' Specification` now prints only the two Change sentences. The other sentences on an `Object` bound stay true:

- `changes.tex:1311` is revival-tabulate's rationale, which revival-bound's Effect already marks as written before the change.
- `changes.tex:2256` speaks of a parameter bounded by `Object`, as one written so still is.
- `advanced/overloading.tex:156` is the Working Draft's bound, in the past tense.
- The front matter (`Specification/fortress/preamble.tex:54-64`) stays true.

The build, `cd Specification/fortress && ./ant genSource && ./ant tex`, ends 'BUILD SUCCESSFUL' both times. `grep -c 'LaTeX Warning: Reference' Specification/fortress/fortress.log` prints 0, and 'Undefined control sequence' and 'multiply defined' 0 each. The skill's grep (`'Reference .* undefined\|...'`) prints 47, but every match is the macro's own text, '\@latex@warning {Reference `#3' on page \thepage \space undef', which the log traces.

Made false and outside the rung's files, for the gather and the record pass (each is revival-change material, in `record.md`'s "Revival change" section):

- P-42, the curator's text: "The compiled path departs from it until the switch-over, which ends the departure: while it uses the compiler's prelude, it bounds such a parameter by `Object`, and so refuses a generic instantiated at a tuple (row 412)." (`explorations/coordinator/POSITIONS.md:39`). The rewrite's text, which is not in POSITIONS (`grep -c 'fortress compile still sets it' explorations/coordinator/POSITIONS.md` prints 0): "`fortress compile` still sets it (`Shell.java:372`, in `useCompilerLibraries()`), and so refuses a generic instantiated at a tuple (row 412), or in some calls compiles it wrong (row 691). The switch-over does not end this by itself;" (`explorations/reviews/foundations/evidence/rewrite/combined.apply:9`).
- F-289's title and body: "The distance's zero holds under the bound `Any`, which the compile command does not set yet", and "`fortress compile` still sets it" (`explorations/coordinator/FACTS.md:124`).
- F-291's "with row 412's switch (`Shell.java:372`) turned off by a patch that did not land" and "Under the compile command's bound `Object`, they are refused (row 412)" (`FACTS.md:25`).
- F-292's "With the bound `Any`, the compiled test tracks give 12 failures in 10 tests" (`FACTS.md:126`): the ten tests are respelled, and the tracks now give no failure.
- F-38's "The dispatcher skips the bound `Object` that the compile path gives a size parameter (row 412)" (`FACTS.md:33`).
- F-55's "On the compile path, a parameter with no written bound is bounded by `Object`, not `Any` (row 412), so a parameter that nothing fixes takes `Object` there (F-78)" (`FACTS.md:50`).
- F-129's "the compiled path gives every static parameter with no `extends` clause, a size among them, the bound `Object`, not the specification's `Any` (row 412)" (`FACTS.md:164`).
- F-173's "It bounds a type parameter written without an `extends` clause by `Object`, not `Any`, as the chapter's callouts say (row 412, P-42)" (`FACTS.md:229`).
- The `fortress-repo` skill's `references/compiler.md:69`, the trap "Before disambiguation, the compiled path bounds an unbounded type parameter by `Object`, not `Any`. Walk does not. So the compiled path rejects every generic that is instantiated at a tuple type, until the switch-over (ledger row 412)."
- Row 412's claim, which the gather closes.
- Added by the skeptic (`SKEPTIC.md`), the sentences that row 759's repair makes false: Appendix I's revival-overloading Effect, "It accepts one such pair, ... and runs the first for a call to which both apply" (`Specification/appendices/changes.tex:2914-2920` before `1bd87dcf7`, which corrects it); F-274's "and the compiled checker accepts that pair (row 759)" (`explorations/coordinator/FACTS.md:200`); P-45's "walk and the checker disagree on four kinds of pair (rows 759 and 786 to 788)" (`explorations/coordinator/POSITIONS.md:42`); the skill's `references/compiler.md:80`, "It accepts `g[\T\](a: T)` beside `g(a: Any)`, whose declared domains are equal, and runs the generic one (ledger row 759)."; and row 759's claim, which the gather closes.
- Added by the skeptic, made false by the flip itself: the comment at `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1501`, "a size has no bound its descriptor could meet; the compile path gives it extends Object" (the code beside it stays right); row 470's note "So under the compile command's bound `Object` (row 412), ... compile and run"; and the skill's `references/sources.md:383`, "The `Object` bound: ledger row 412 (`compiler_tests/XXXImplicitBoundAny.test`)".

## 9. Each test line changed

The team's lines are marked **team**.

| File:line | Before | After |
|---|---|---|
| `compiler_tests/XXX6bu.test:16` **team** (5a68404fd, 2012) | `\ - [\\T extends Object\\](T, T)->T is not applicable to an argument of type (ZZ32, ZZ32).\n\` | `\ - [\\T\\](T, T)->T is not applicable to an argument of type (ZZ32, ZZ32).\n\` |
| `compiler_tests/XXX6bv.test:16` **team** (5a68404fd, 2012) | `\ - [\\T extends Object\\](T, String)->T is not applicable ...` | `\ - [\\T\\](T, String)->T is not applicable ...` |
| `tests/doubledOverloading.fss:36` (a new line in the **team**'s file of 2007) | none | `(*) The bound Object keeps a(v) apart from a(), and b(v) from b(): under the bound Any, v may be (), the argument that a() and b() take.` |
| `tests/doubledOverloading.fss:37` **team** | `a[\E\](v: E): A[\E\] = fail("a(v)")` | `a[\E extends Object\](v: E): A[\E\] = fail("a(v)")` |
| `tests/doubledOverloading.fss:41` **team** | `b[\F\](v: F): A[\F\] = fail("b(v)")` | `b[\F extends Object\](v: F): A[\F\] = fail("b(v)")` |
| `compiler_tests/XXXImplicitBoundAny.fss` → `ImplicitBoundAny.fss:2` | `component XXXImplicitBoundAny` | `component ImplicitBoundAny` |
| `compiler_tests/XXXImplicitBoundAny.test` → `ImplicitBoundAny.test` | `tests=XXXImplicitBoundAny`, `compile`, `compile_err_contains=does not satisfy the corresponding bound Object` | `tests=ImplicitBoundAny`, `link`, `run`, `run_out_WIcontains=kind of a Seal at Any -> Seal at Any` |
| `compiler_tests/XXXInferCallArgumentControls.test:4` | `... argument of type BoxT.{2}Object.{2}[.] - BoxT.{2}ZZ64.{2}->ZZ32 is not applicable to an argument of type BoxT.{2}Object.{2}[.] ...` | the same, with `BoxT.{2}Any.{2}` twice |
| `compiler_tests/OpenTypeChecker.fss:5` | `trait AnyBox comprises { Box[\E\] } where [\E extends Object\]` | `... where [\E\]` |
| `compiler_tests/ComprisesWhereFunctionalMethodChecker.fss:5` | `trait AnyC comprises { C[\E\] } where [\E extends Object\]` | `... where [\E\]` |
| `compiler_tests/ComprisesWhereOverrideChecker.fss:9` | `... comprises { S[\E, F\] } where [\F extends Object\]` | `... where [\F\]` |
| `compiler_tests/XXXComprisesWhereFunctionalMethodBounds.fss:6` | `trait AnyC comprises { C[\E\] } where [\E extends Object\]` | `... where [\E\]` (its two `cat[\T extends Object\]`, the bounds the test reads, kept) |
| `compiler_tests/XXXOverrideGenericReturnTypeNotSubtype.fss:6-7` | `f[\T\](x: T): T = x` | `(*) T is bounded by Object so that B's f at Any widens f; under the implicit bound Any the two domains are equal, B's f overrides nothing, and the checker does not refuse that (row 653 of the gap ledger).` and `f[\T extends Object\](x: T): T = x` |
| `compiler_tests/CoercionGenericFnCompiledRungC.fss:20-21` | `gf[\T\](x: Wide, y: T): String = "gf got " \|\| x.big \|\| " and " \|\| y` | `(*) T is bounded by Object because the compiler's prelude declares String's \|\| at Object, not at Any, until the switch-over.` and `gf[\T extends Object\](x: Wide, ...)` |

Each edit keeps every assertion. Under the flip:

- `XXXOverrideGenericReturnTypeNotSubtype` still gives its two errors, now with `[\T extends Object\](A, T)->T` and `[\T\](B, T)->String` in them;
- `XXXComprisesWhereFunctionalMethodBounds` still gives its 'Invalid overloading of cat';
- the three `comprises` typecheck tests type-check.

## 10. Decisions

1. **The fix: `Shell.java:372` set `false`, the brief's form.** Ways not taken:
   - deleting the line, which would leave the switch to whatever ran before in the JVM (the property default is false, `Shell.java:1282`, but a junit JVM uses both libraries in turn);
   - reading the property `fortress.compile.predesugar.extendsobject` there, a user switch nobody asked for;
   - removing the pre-desugaring, the team's code (`PreDisambiguationDesugaringVisitor.java:194-208`), which a reversal would need.
   Evidence: P-42; row 412; the precedent `Shell.java:380`.
2. **`ImplicitBoundAny`'s run is checked with `run_out_WIcontains=kind of a Seal at Any -> Seal at Any`**: the brief's text, with runs of whitespace collapsed. Ways not taken: `run_out_contains` with two spaces, which pins the prelude's `|||` (`CompilerBuiltin.fss:406`) and would break at the switch-over; changing the program's string, the revival's test text. Evidence: the `after` run (section 2).
3. **The test respellings are as the brief gives them**, each keeping the value it checks. `XXXOverrideGenericReturnTypeNotSubtype`'s comment names row 653, as the brief and the foundations judgement ask, although the skill's `tests-writing.md` asks for no pointer to a record in a test's comment: the brief holds. Way not taken for `CoercionGenericFnCompiledRungC`: an `XXX` test until the switch-over (fork 11's other way).
4. **The stage reads the line's text, the planner's `stageCompile`.** Ways not taken: calling `Shell.useCompilerLibraries()` from the driver, which crashed on 214 declarations, 'Undefined API: CompilerBuiltin' (the planner's c1); a property passed by `run.sh`, which would not follow `Shell.java`. The header paragraph of `run.sh` keeps its 13 lines (`:24-36`), so that rung L's lines below it (`:58`, `:85-87`, `:115-116`) do not move.
5. **The specification's Appendix I entries record their boxes' change**: revival-bound's Change (`changes.tex:3068-3073`) and revival-inference's (`:2010-2016`), as the revision form asks of every change of the text. Way not taken: leaving them for the gather. The Effect names rows 339 and 832 and the prelude's concatenation. Way not taken: naming row 840, which the bound does not cause.
6. **Row 840 at home 2.** The checker accepts the program, and it fails the JVM's verification. The specification is silent on a component's name and so does not forbid it (`basic/components/source-code.tex`, "Components"). It is recorded by a run-time pair whose component's name begins with `Tuple`. Ways not taken: home 3, a row only, since a gated test can show it; an `XXX`-named component that imports a `Tuple`-named helper, two more files for the same essence.
7. **The four rows' changes are whole new lines for `ledger.py rewrite`, not notes.** Rows 653, 339, 832 and 691 have 4, 130, 36 and 68 characters left in their notes cells, and 48 to 115 in the row, too few for the notes the brief names. Each line passes `ledger.py check --rows` (`record.md`).
8. **The ladder subset holds `tests/doubledOverloading.fss` alone**, the brief's list. Its output was compared with the baseline's by hand, since `ladder_compare` reads the whole pass list.

## 11. Defects, each with its home

- **Row 412**, the compile command's bound `Object`: home 1, fixed. Tests: `compiler_tests/ImplicitBoundAny` (promoted) and the nine respelled tests.
- **row 840**, a component whose name begins with `Tuple` fails verification at the call of a generic function whose one parameter has a generic type of the component: home 2, `compiler_tests/TupleNamedComponentGenericParamLink.test` and `compiler_tests/XXXTupleNamedComponentGenericParam.test`, with the row in `record.md`. It is on the old code too: `old-fortress.sh ... junit` of the pair gives 'Saw expected failure (Exit code != 0)' and 'OK (2 tests)'. It was shown through the harness twice, as `tests-writing.md`, "Writing an `XXX` test", asks. As it is:

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxx-asis ProjectFortress/compiler_tests TupleNamedComponentGenericParamLink.test XXXTupleNamedComponentGenericParam.test
      . run ProjectFortress/compiler_tests/TupleNamedComponentGenericParam (377ms) REACHED
      java.lang.VerifyError
      Saw expected failure (Exit code != 0)
      OK (2 tests)

  Then with `count` given a second parameter `k: ZZ32` for one run (label `xxx-fixed`), then restored (checked by `cmp` against the saved copy):

      . run ProjectFortress/compiler_tests/TupleNamedComponentGenericParam (725ms) REACHED
      PASS
      Did not see expected failure
      Tests run: 2,  Failures: 1,  Errors: 0

- **Row 759**, the compiled checker's acceptance of `g[\T\](a: T)` beside `g(a: Any)`, whose cause was row 412: home 1, repaired by the same commit. Its test, `compiler_tests/XXXNoDuplicatesRuleUnboundedBesideAny.test` over `NoDuplicatesRuleUnboundedBesideAny.fss`, is the skeptic's (`1bd87dcf7`, `SKEPTIC.md`).
- **Rows 691, 832, 339 and 653**: the flip touches them and fixes none (section 5). Each keeps its home, and its line is rewritten in `record.md`.
- **The prelude's `String` concatenation at `Object`** (`CompilerBuiltin.fsi:37`): a limit of the compiler's library until the switch-over, not a defect to fix in the prelude (the skill's `compiler.md`, "The compiler's prelude, until the switch-over"). `CoercionGenericFnCompiledRungC` records it in its comment, and Appendix I's Effect names it.

## 12. Points to report

- **rung-B.patch, taken or changed**: taken. `Shell.java` is the patch's blob. `DistanceMulti.java`'s code and `run.sh:82` are the patch's lines: `patch -p1` of `rung-B.patch` on the base's three files, then `diff` with the tree, shows only the header lines differ. Changed: the two headers (`DistanceMulti.java:12-16`, `run.sh:24-36`), which the brief asks for ("both headers say so") and the patch lacks.
- **Each test line changed**: section 9. The team's are `XXX6bu.test:16`, `XXX6bv.test:16` and `tests/doubledOverloading.fss:36-41`.
- **The distance table under the new default, the count table, the count stage's seconds**: section 6.
- **The ladder file that moves**: `tests/doubledOverloading.fss` would go from `pass` to `typecheck` as the team wrote it; its respelling keeps it at `pass` (section 7). The rung ran no other ladder file.
- **Compiled programs that the bound `Any` now refuses, accepts or runs differently, beyond the probe's** (section 5):
  - accepted and run: `VoidExpected` (an expected type fixing `T` at `()`) and `TupleBoxItem` (a generic object at a pair, its getter bound to a tuple);
  - refused: `ConcatAny` (the prelude's `||` at `Object`) and the team's `doubledOverloading.fss` as written;
  - now reaching known rows: `VoidArgInferred` (row 339) and `WrapTuple` (row 832);
  - row 840 runs the same on both codes.
- **Rows 691, 832 and 339 as the flip leaves them, and row 412's close**: all three stay open, each line rewritten in `record.md`. Row 412 is closed by the gather, test `ImplicitBoundAny`.
- **Every sentence made false, P-42's among them**: section 8.
- **A file edited beyond those named**: `ProjectFortress/compiler_tests/TupleNamedComponentGenericParam.fss`, `TupleNamedComponentGenericParamLink.test` and `XXXTupleNamedComponentGenericParam.test`, row 840's home; and, in `Specification/appendices/changes.tex`, lines beyond `:3089-3092`: revival-bound's Change (`:3068-3073`) and revival-inference's Change (`:2010-2016`).

## 13. Commands worked out

- `tmp/rung-bound-any/probes/oldnew.sh` (scratch, not committed). For each named program it runs `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 <dir>/old-caches compile P.fss`, then `run P`; and `FORTRESS_CACHES=<dir>/new-caches bin/fortress compile P.fss`, then `run P`, where the new caches are a fresh copy of the tree's. `SIDES=new` runs only the new side.
- `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 <tree>/tmp/rung-bound-any/old-junit-caches junit <tree>/ProjectFortress/compiler_tests/A.test <tree>/ProjectFortress/compiler_tests/B.test`: a run-time `XXX` pair on the old code.
- `python3 explorations/coordinator/tools/ledger.py check --rows FILE`: lints row lines without writing the ledger.
- The patch check: `git archive <base> <paths> | tar x` in a scratch folder, then `patch -p1 < rung-B.patch`, then `diff` with the tree. A `git apply` there, inside the worktree, skips every path.
- The driver's stop check: `java -cp <dist-post>/shadow-classes:<dist-post>/classes:$CP DistanceMulti -order check -setting compile`, run with no targets from a folder that holds `ProjectFortress/src/com/sun/fortress/Shell.java`.
