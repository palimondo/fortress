# Rung N (climb batch 13, `rung-size-expressions`): arithmetic in a size, and a size known only at run time

problem: the gate's per-site list, `explorations/compile-ladder/gate/distance-sites.tsv:12-21` (fork 3's ten calls), `:136-143` and `:149-153` (item 15's thirteen), and the two crash rows of `explorations/compile-ladder/climb-batch-12/gate/distance.txt:34-35`
spec: `Specification/basic/types-vals-vars.tex:51-52` (identical types, unfinished for sizes); `Specification/basic/expressions/constant.tex:20-23` (a static expression's value); `Specification/basic/traits.tex:238-240` (the comprises proviso); `Specification/basic/trait-parameters.tex:80-102` ("Nat and Int Parameters")
precedent: the team's commented clause `ProjectFortress/LibraryBuiltin/NatReflect.fss:24` with its reading at `:15-21`; the team's comment that size calculations are "converted to RPN, to be simplified at instantiation", `ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:186-189`; the union case's use of a trait's listed types, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:154-159`; walk's symbolic size for a `nat` static parameter, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/SingleFcn.java:172-173`
deviation: two different static parameters still count as different sizes, where the Q&A's reasoning would make them possibly equal, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:135-139`
deviation: the class loader computes a size without checking it against its parameter's kind (nats and ints share one spelling), `ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1234-1253`
deviation: a size inference variable binds a static parameter or a numeral, never an expression with a static parameter in it, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:155` (`isNatTerm`, unchanged)
deviation: only a `nat` or `int` where-clause variable is opened, where the widened proviso admits any where-clause variable, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:754-768`
historical: `Library/FortressLibrary.fss`, `ProjectFortress/LibraryBuiltin/NatReflect.fsi`, `ProjectFortress/LibraryBuiltin/NatReflect.fss`, `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiationMap.java`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala`, `Specification/appendices/changes.tex`, `Specification/basic/trait-parameters.tex`, `Specification/basic/traits.tex`, `Specification/basic/types-vals-vars.tex` (each in the tree at `a874948ac`)

Branch `wip/rung-size-expressions`, cut from `a1a75716a`; the worktree `/home/user/fortress-sizes` was seeded from the base build `/home/user/fortress-base13` (the script exited 0). Commits: `f623ce187` (item 15, 15a with (b), and its tests), `4db778294` (fork 3, way 4a: the clause, the checker, walk's loader, the typed row parameters, and their tests), `15ea9a30d` (the specification, and the tests of two measured departures), `415fd00bb` (`XXXWhereBoundChecker`), `9d323883f` (an opened argument opened once per call in the checker's coercion path). Part (b) and 15a were built and committed before the clause, as the judgement requires.

## 1. What changed and why

**Item 15, 15a with its part (b)** (POSITIONS, "Arithmetic in a size: the checker compares size expressions by their written form after folding numerals, and a size name may equal a numeral (item 15, 15a with (b))."):

- The compiled checker no longer refuses arithmetic in a size: `hasSizeArithmetic` and its three uses are gone (`scala_src/typechecker/TypeWellFormedChecker.scala`, at the base `:41-47`, `:83-84`, `:148-149`, `:187-188`). The range check of a literal size (`sizeOutOfRange`, `:48-51`) folds the size first, so a size computed from numerals is checked as a numeral is: `Box[\4294967295 + 1\]` is refused, "The static argument 4294967296 is out of range for a nat parameter, whose values are those of NN32, 0 to 4294967295."
- `Formula.foldSize` (`scala_src/typechecker/Formula.scala:101-116`) computes each operation whose operands are numerals, `+`, `-`, juxtaposition and `^`, by the run time's own `Naming.sizeOp` (`runtimeSystem/Naming.java:1205-1218`), and keeps the rest as written. `nEq` (`Formula.scala:119-131`) compares written forms once folded: `2 3` is `6`, `s0 s1` is `s0 s1`, not `s1 s0`.
- Part (b): `nDiffer` (`Formula.scala:135-139`) says when two sizes are known to differ: two different numerals, or, as before, two different static parameters; a name or an operation beside a numeral is not known to differ from it. `TypeAnalyzer.pEqv` on sizes (`types/TypeAnalyzer.scala:368-378`) answers `pTrue` when `nEq`, `pFalse` when `nDiffer`, and `False` otherwise, which under negation reads "not known to differ": the `N[\0\]` arm of a `typecase N[\b0\]` is reachable. `Formula.definitelyNotEqualNat` uses `nDiffer` too (`:498-502`).
- The compiled path: the name mangler computes an operation on numerals when it spells a size (`compiler/NamingCzar.java:1904-1905`), and the class loader computes the rest when it instantiates a template, after it puts the static arguments in (`runtimeSystem/InstantiationMap.java:393-394`, by `Naming.foldSize`, `Naming.java:1220-1253`). So `Box[\2 + 1\]` and `Box[\3\]` name one class, and `Box[\k + 1\]` in a template instantiated at `k = 2` names the class of `Box[\3\]`. The team already spelled a size expression in postfix, with a comment that it was "to be simplified at instantiation" (`Naming.java:186-189`); the simplification was never written.

**Fork 3, way 4a, under Q13.3** (`explorations/reviews/array-fork3-judgement.md`, sections 2.9, 4 and 5):

- The team's clause is uncommented in both files: `trait NatParam comprises { N[\n\] } where [\ nat n \]` (`ProjectFortress/LibraryBuiltin/NatReflect.fsi:23`, `NatReflect.fss:24`).
- `KindEnv` takes a `nat` or `int` where-clause binding as a size parameter (`scala_src/typechecker/staticenv/KindEnv.scala:124-132`), where it stopped with "non-type where clause bindings: Not yet implemented".
- `TypeAnalyzer`: `whereSizes` lists a trait declaration's `nat` and `int` where-clause variables when it has a comprises clause (`types/TypeAnalyzer.scala:754-768`), `opensSizes` says whether a type is such a trait (`:770-777`), and `openWhereSizes` replaces each variable by a fresh name no program can write, as `n#7` (`:780-787`; `Formula.openedSizeName`, `Formula.scala:146-153`). `comprisesClause` and `comprisedTypes` give the listed types so opened (`:742-748`, `:809`). A new case of `pSubInner` (`:266-278`) says such a trait is below a trait type when its parents are, or when each opened listed type is: a `NatParam` passed where `N[\$n\]` is expected binds `$n` to the opened size, and the call's result type carries it. `pSub`'s memo is bypassed for such a type (`:114`), so two openings never share a name, and the history guards the cycle through the listed type's own `extends NatParam`. An opened size is not known to differ from any size (`Formula.scala:137`), so a comprises clause never makes a typecase clause `N[\m\]` unreachable.
- The checker's coercion path admits each argument again after inference (`scala_src/typechecker/impls/Functionals.scala:384-389`), where a fresh opening met another size; an argument of such a trait with one listed type is opened once for the call there (`:327-339`). The library's `shift`s need it: they pass a literal stride.
- `TypeHierarchyChecker` reads a listed type at every value of its where-clause sizes when it checks an extender: it puts inference variables in their place (`scala_src/typechecker/TypeHierarchyChecker.scala:237-245`) and accepts a solvable subtype formula (`:336-341`), so `value object N[\nat m\] extends NatParam` is accepted whatever its parameter's name.
- Walk: `processWhereClauses` binds a `nat` or `int` where-clause variable to a symbolic size, as a symbolic instantiation binds a `nat` static parameter (`interpreter/evaluator/BuildEnvironments.java:930-939`), so `comprises { N[\n\] }` evaluates when the trait loads; the comprises check at load reads such a variable as any term, the same one at each of its places (`:1154-1170`, `:1364-1389`, `:1477`). Walk's dispatch is untouched: it binds an argument's size at a call, as before.
- The two crash rows: the local parameters of `row(i)`, `row(i,k)` and, beside it, `plane(k)` are typed `ZZ32` (`Library/FortressLibrary.fss:2500`, `:2899`, `:2903`).

**The specification**, in the S1 form (section 6).

## 2. The tests, their failing runs and their passing runs

Item 15 and part (b), `ProjectFortress/compiler_tests/`: `XXXNatArithChecker` promoted by `git mv` to `NatArithSize` (its program unchanged but the component name; `link`, `run`, `run_out_contains=PASS`); new `NatArithClass` (the loader's half: `Box[\2 + 1\]`, a sum and a product of static parameters, each the class of `Box[\3\]`), `NatZeroArm` (part (b): `typecase Nt[\b0\] of Nt[\0\]` in a generic function, its arm reached for `b0 = 0`; `Nt`, since an all-capital name of two letters is an operator), `XXXNatArithFormChecker` (refusal: `s0 s1` is not `s1 s0`, beside an accepted `s0 s1` and a folded `2 3`), `XXXNatArithRangeChecker` (refusal: a folded `nat` and `int` size out of range, beside an accepted `0 - 2` for an `int`).

The failing run, on the base's code before the first build of the edit (that build started about 16:51):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NatArithSize.test XXXNatArithFormChecker.test XXXNatArithRangeChecker.test NatZeroArm.test NatOpenChecker.test XXXNatOpenKeepChecker.test
    # junit.sh base 2026-10-09T16:48:58Z; ...
        Ill-formed type: Box[\k+1\]
        Arithmetic on nat static arguments is not supported by the type checker; use a nat parameter or a literal.
        The typecase clause, Nt[\0\], is unreachable.
    java.lang.Error: non-type where clause bindings: Not yet implemented
    Tests run: 9,  Failures: 9,  Errors: 0

`NatArithClass`, written after the first build, failed on the old code through the harness (`old-fortress.sh /home/user/fortress-base13 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/NatArithClass.test`, 16:53:33Z): "Ill-formed type: Box[\2+1\]", "Tests run: 3,  Failures: 3,  Errors: 0".

The first `XXX` test, `XXXNatArithFormChecker`, through the harness: as written, "Saw expected failure" (`junit.sh e1`, 16:56:37Z); with `swap`'s return type changed to `Store[\s0 s1\]` for one run, then restored, "Saw wrong failure. compile", "Tests run: 1,  Failures: 1" (`junit.sh red`, 16:56:56Z).

Fork 3: `NatOpenChecker` (`typecheck`: a trait `NatParamT comprises { Nt[\n\] } where [\nat n\]` of its own, since `compiler_tests/` cannot import `NatReflect` (row 307); `size(mk())` answering `n` as a `ZZ32`, `take(mk())` widened to an unsized parent, `sizePlus(mk(), 1)` beside a numeral, and the reachable `typecase mk() of Nt[\0\]`), `XXXNatOpenKeepChecker` (refusal: `y: Nt[\3\] = keep(mk())`, "Right-hand side has type Nt[\n#3\], but declared type is Nt[\3\].", and `two(mk(), mk())`, two values opened in one call), `XXXNatOpenRun` (the compiled run, behind the code generator's refusal of a trait with a where clause, `compile_exception_contains=Can't compile TraitDecl NatParamT`; row 307), and under walk `ProjectFortress/tests/NatOpenWalk.fss` (the clause in a main component: an `Nt` at every size extends it, `size(mk(3))`, the reachable arm) and `NatOpenUnlistedExtender.fss` with its `.test` (a refusal at load of an extender the clause does not list).

Their failing runs: `NatOpenChecker` and `XXXNatOpenKeepChecker` in the run above; `NatOpenWalk` under walk on the base, before any edit:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/NatOpenWalk.fss ProjectFortress/tests/NatReflectTest.fss
    # harness-one 2026-10-09T16:49:14Z; tree a1a75716a; ...
    Missing type n
    Tests run: 2,  Failures: 1,  Errors: 0

The failing run of walk's edit, with the clause uncommented and walk unedited (16:58:52Z, the same command): every program stops at load, since the interpreter's library imports `NatReflect`:

    ProjectFortress/LibraryBuiltin/NatReflect.fss:24:18:
    Missing type n
    Tests run: 2,  Failures: 2,  Errors: 0

`NatOpenUnlistedExtender` on the old code (`FORTRESS_HOME=<base> <base>/explorations/compile-ladder/rung-inference-walk/harness-one.sh`, 17:04:29Z): "Refused at load, but did not satisfy load_exception_contains", "Missing type n", "Tests run: 1,  Failures: 1". The revised `XXXNatOpenKeepChecker` and `XXXNatOpenRun` on the old code (from 17:08:00Z): "non-type where clause bindings: Not yet implemented", each "Tests run: 1,  Failures: 1". The coercion path's case, `sizePlus(mk(), 1)`, on the build before `9d323883f` (17:49:47Z): "Could not check call to function sizePlus - [\nat n\](Nt[\n\], ZZ32)->ZZ32 is not applicable to an argument of type (NatParamT, IntLiteral).", "Tests run: 1,  Failures: 1".

The passing runs, after the last change of code (`9d323883f`, built with the library order at 17:51):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh nat3 ProjectFortress/compiler_tests <every *Nat*.test> XXXWhereBoundChecker.test
    # junit.sh nat3 2026-10-09T17:52:07Z; ...
    OK (107 tests)

The walk tests passed in `ant testSystem` on the final code (section 3).

Kept verdicts: the 19 `NatRt*`, `NatArgRungS`, `NatDispArmChecker`, `NatOverrideChecker`, `XXXNatBoolChecker` and every other `*Nat*` compiled test are among the 107; the seven walk array tests (`vectorOps`, `matrixOps`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, `FlatTowerRungF`, `TabulateRungA`, `sparseMatrix`) and `NatReflectTest` ("OK", "OK") passed through `harness-one.sh` ("OK (10 tests)", 17:05:02Z) and in both runs of `ant testSystem`.

## 3. The suites

    ant testQuick        (17:53, code 9d323883f)
    BUILD SUCCESSFUL
    Total time: 13 minutes 31 seconds
    compiler 1,102, library 86, othercompiler 263; Failures: 0, Errors: 0

    ant testSystem       (18:06, code 9d323883f)
    BUILD SUCCESSFUL
    Total time: 5 minutes 32 seconds
    shards 138 + 139 + 140 + 140 = 557; Failures: 0, Errors: 0

The compiler track's 1,102 is batch 12's 1,086 and the 16 cases of the new and promoted `.test` files; the interpreter suite's 557 is batch 12's 554 and the three new walk tests. Both suites also ran once on `4db778294`, before `9d323883f`: testQuick "BUILD SUCCESSFUL", 9 minutes 57 seconds, compiler 1,098; testSystem "BUILD SUCCESSFUL", 4 minutes 18 seconds, 557.

## 4. The checker count and the distance

The count, on the final code: `explorations/coordinator/tools/checker-count/run.sh tmp/rung-size-expressions/checker-count-postedit.txt tmp/rung-size-expressions/cc-post` exits 0, and `diff explorations/compile-ladder/climb-batch-12/gate/checker-count.txt` against its table prints nothing: `#total 1`, `#locations 2`, `#crash none`.

The distance, on the final code (`explorations/coordinator/tools/distance/run.sh tmp/rung-size-expressions/distance-postedit.txt tmp/rung-size-expressions/dist-post`, started 17:56, `#seconds 1249`), and `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-12/gate/distance.txt` against it:

    DISTANCE DOWN   153 -> 132 (-21)
        kind wellformed              17 -> 6      (-11)
        kind typecheck              129 -> 119    (-10)
        class Z1                     11 -> 0      (-11)  sizes: arithmetic on nat static arguments
        class V2                     28 -> 16     (-12)  arrays: a sized array's body or factory (sizes lost in joins and factories)
        class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
        class OT                     16 -> 19     (+3)  other body errors (one-off library slips and checker limits)
        unit component FortressLibrary    143 -> 125    (-18)
        unit component NatReflect      3 -> 0      (-3)
        crash gone   decl  TraitDecl FortressLibrary.fss:2491:1-2605:2  TypeError  FortressLibrary.fss:2500:9: Missing parameter type for i
        crash gone   decl  TraitDecl FortressLibrary.fss:2880:1-2993:2  TypeError  FortressLibrary.fss:2899:11: Missing parameter type for i
        crash new    decl  TraitDecl FortressLibrary.fss:2880:1-2993:2  InterpreterBug  ** bug! TryChecker returned an untyped expr: FnExpr at FortressLibrary.fss:2916.13 fn (k) => do r := r " ;;" // " " plane(k) end Expected ty...

By row and line (row 577), the after's `errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv`, matched by location and message (no edit moved a line):

- Gone, 24. Fork 3's ten, rows 12-21: `FortressLibrary.fss:2114` (`__arr1`), `:2116` (`__arr2`), `:2118` (`__arr3`), `:2132` (`__imm1`), `:2151` (`__parr`), `:2156` (`__piarr`), `:2307` and `:2315` (`__subarray`), `:2249` and `:2257` (`__subarrayI`). Item 15's thirteen: rows 136-137 (`:2423`, `:2434`, the unreachable `N[\0\]` arms), 138-140 (`NatReflect.fss:45`, `:47` twice), 141-143 and 149-151 (`:2619`, `:2783`, `:3006`, each twice), 152-153 (`NativeArray.fsi:12` twice). Beyond the 23: row 131, `FortressLibrary.fss:130`, "Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\]." (BR); by reading no edit of the rung touches `BIG LEXICO`. (Skeptic's correction: the site is row 488's variation, the BR family whose sites move with what the checker queried earlier in the same run; rung G's distance run in this batch lost the same site with no edit of it.)
- The four hidden calls: Array2's `:2537` (range subscript) and `:2574` (shift) are on neither list after, so they are cleared; Array3's `:2948` and `:2959` stay hidden behind the new crash.
- Come, 3, all the unhidden `Array2`: `FortressLibrary.fss:2561`, "Could not check call to function Col - [\T, nat b0, nat s0\]Array2[\T,b0,s0,0,1\]->Col[\T,b0,s0\] is not applicable to an argument of type Array[\T,(ZZ32, ZZ32)\]." and `:2565`, the same for `Row` (NEW-N-4); `:2518`, "Function body has type OR((ZZ32, ZZ32),()), but declared return type is (ZZ32, ZZ32)." (NEW-N-5). The crash that now hides `Array3` (`:2880-2993`) is NEW-N-6.

The stage ran twice. Its first run, at 17:26 on `4db778294`, gave 135 and showed `:2249`, `:2307` and `:2574` still refused, each passing a numeral beside the opened size: the coercion path's second admission. `9d323883f` followed, with `NatOpenChecker`'s `sizePlus(mk(), 1)` as its test; the run above is the after. The count gave the same table both times.

## 5. Where the fix belongs, and the precedent

`explorations/coordinator/map/spec-to-implementation.md` puts static arguments in the checker's `TypeWellFormedChecker` and `TypeAnalyzer`, and sizes at run time in the class loader; the judgement names fork 3's files (section 4). The precedents followed: for 15a, the team's design comment, sizes spelled in postfix "to be simplified at instantiation" (`runtimeSystem/Naming.java:186-189`), so the loader computes where a template's static arguments are put in (`InstantiationMap.maybeBareVar`, the one place that substitutes them), and the checker uses the same arithmetic (`Naming.sizeOp`); for the opening, the union case beside it, which already proves a closed trait below a type through its listed types (`TypeAnalyzer.scala:154-159`); for walk, `SingleFcn.createSymbolicInstantiation`, which binds a `nat` static parameter to a `SymbolicNat` (`values/SingleFcn.java:172-173`). The same defect in the same files: the arithmetic refusal had three uses in its file, all removed; `pEqv` on sizes is `TypeAnalyzer`'s one size comparison, and the exclusion's own literal-only comparison (`TypeAnalyzer.scala:480`) counts two literals only and is unchanged.

The ways the language and the library offer, item 15: 15a (written form after folding), 15b (the storage made at run time), 15c (a solver), 15d (a native store per rank), with or without part (b); the decision is 15a with (b). Fork 3: 4a (the team's clause and the opening), 4b (`reflect` built in), 4c (sizes stay unsized), 4d (no run-time sizes in the model), 4e (a typecase that binds a size); 4a is built on the curator's standing go, listed for his review.

## 6. What the specification settles, and its text

The text allows arithmetic in a size (`Specification/appendices/grammars/concrete-syntax.tex:540-547`) and fixes its value once the static parameters are known (`Specification/basic/expressions/constant.tex:20-23`), but never said when two size expressions are identical (`types-vals-vars.tex:51-52`, beside the team's note "It isn't complete in any case"). The team's Q&A refuses `T[\n+1\]` beside `T[\0\]` and allows `T[\1\]` beside `T[\0\]` (`Specification/appendices/internal-document.tex:167-198`). The revisions, in the S1 form:

- `Specification/basic/types-vals-vars.tex:53-69`: two sentences after the identity sentence, which is unchanged, and the callout `\revision{revival-sizes}`; a new Appendix I entry, "When two sizes are the same" (`Specification/appendices/changes.tex:3178-3245`), before "Passages not yet revised", with the reason, the original sentence from `Specification-1.0-frozen/basic/types-vals-vars.tex:51-52`, the effect with rows NEW-N-1 and NEW-N-2, and route C.
- Under Q13.3, `Specification/basic/traits.tex:238-246`: the proviso widened to a where-clause variable of the declaration, which the listed type holds at every value of, with `NatParam` as the example; one sentence added to the existing callout `\revision{revival-comprises}` (`:274-276`).
- Under Q13.3, `Specification/basic/trait-parameters.tex:103-118`: one sentence in "Nat and Int Parameters" stating the opening, and a callout `\revision{revival-comprises}` quoting the team's comment.
- The entry "The traits that extend a closed trait" (`changes.tex:1297-1448`) amended in each part: affected sections, the change, the reason (the team's comment since 2007; the determination rule of 28 September did not consider where-clause variables, which "Where Clauses" allows), the effect, the unchanged passage of the frozen copy (`Specification-1.0-frozen/basic/trait-parameters.tex:76-90`), and route C (the clause back in a comment, and row 664's refusals).

The full reasoning for both entries is this report. The front matter's paragraph (`Specification/fortress/preamble.tex:54-65`) stays true. The specification builds: `./ant genSource` and `./ant tex` "BUILD SUCCESSFUL"; `fortress.log` has no "LaTeX Warning: Reference", "multiply defined" or "! Undefined control sequence" line (the skill's own pattern also matches 41 lines of macro text the log echoes); the new sentences are in the PDF's text.

## 7. Programs run old against new

- `NatArithClass`, `XXXNatOpenKeepChecker`, `XXXNatOpenRun`, `NatOpenUnlistedExtender`: red on the old code, green on the new (section 2).
- The ladder subset's moved files with `old-fortress.sh` beside the new: `NatReflectTest` stops at its run on both, "Unable to read serialized data for NatReflect$N??"; `instantiateNatParam` prints 20, 21, 23 on both; `GenericFnWithExcludes` stops at the checker on both, "non-type where clause bindings: Not yet implemented" on the old code and "No such method U.f." on the new.
- Probes in the scratch folder, not kept: `ProbeBeyond` compiled, `next[\5\]()` 6, `pw[\5\]()` 32 (`2^k`), `next[\4294967295\]()` 4294967296 (NEW-N-1); `ProbeWalkPow` under walk, `Box[\2 + 3\]` read as 5 and `Box[\2^3\]` stopping with "EvalType: class com.sun.fortress.nodes.IntBinaryOp is not yet implemented." (NEW-N-2); `ProbeOpen` typechecked, `one(mk())` accepted with `Nt[\nat m\]` named apart from the clause's `n`, `two(mk(), mk())` refused.

## 8. The ladder subset

Files whose first error in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` names what the change touched: `GenericFnWithExcludes`, `NatParamOverloading`, `bogusNatParams`, `instantiateNatParam`, `NatReflectTest`, `newlineTest`, `typecaseBlockTest`, `typecaseTest`, `typecaseVarTest`. None is in batch 12's landed `ladder/ladder.tsv`, so the baseline's rows are the comparison. Drivers copied under `tmp/rung-size-expressions/ladder/` as `gate.md` says, run on `9d323883f`:

    tests  GenericFnWithExcludes.fss  typecheck  No such method U.f.              (baseline: typecheck, non-type where clause bindings: Not yet implemented)
    tests  NatParamOverloading.fss    typecheck  head of empty list               (same)
    tests  NatReflectTest.fss         link       Unable to read serialized data for NatReflect$N??   (baseline: codegen; the same on the base a1a75716a)
    tests  bogusNatParams.fss         typecheck  head of empty list               (same)
    tests  instantiateNatParam.fss    pass                                         (baseline: typecheck; passes on the base a1a75716a)
    tests  newlineTest.fss, typecaseBlockTest.fss, typecaseTest.fss, typecaseVarTest.fss: typecheck, the same unreachable-clause errors

So the rung moves one file, `GenericFnWithExcludes`, at the same phase with another first error (NEW-N-3); the other two moves predate the rung.

## 9. Sentences of the specification made false

- `Specification/basic/trait-parameters.tex:15`, a `\note`: "Non-type static parameters and static expressions are not yet supported." The compiled checker now takes static expressions in sizes (it took `nat` and `int` parameters already).
- `Specification/basic/expressions/constant.tex:15`, a `\note`: "Static expressions are not yet supported." The same.
- FACTS, "A size beyond `NN32` or `ZZ32` is refused on both paths": "beside its refusal of arithmetic in a size" (record.md). No Effect of another Appendix I entry says the checker refuses arithmetic in a size.
- FACTS, "The compiled type checker checks `nat` and `int` static parameters" (`explorations/coordinator/FACTS.md:72`): "A size is a symbol or a literal compared by equality" and "Arithmetic in a size and a `bool`, `dim` or `unit` parameter are refused by name" (skeptic's addition; record.md rewrites both).
- The rung's own Effect of "When two sizes are the same" said the checker computes and range-checks each operation on numerals, false for a power above the exponent 4096 until the skeptic's fix `7dd0adf0c`, and named its inference departure by the wrong example (`k` from `Box[\k+1\]`, which the written-form rule itself refuses); the skeptic corrected both, with rows NEW-N-7 and NEW-N-9, and added NEW-N-8 to the Effect of "The traits that extend a closed trait".

## 10. Points to report

- **A ladder file that moves.** `GenericFnWithExcludes` stays at `typecheck` with another first error, from "non-type where clause bindings: Not yet implemented" to "No such method U.f." (`ProjectFortress/tests/GenericFnWithExcludes.fss:39-40`): the checker now reads its `nat` where binding and not yet its constraints (NEW-N-3). No compiled test's verdict changed other than by intent.
- **Every site the unhidden traits bring, and every site gone beyond the 23 and the 4.** Section 4: `Array2` brings `:2561`, `:2565` and `:2518`; `Array3` stays hidden behind a new crash at `:2916`; `FortressLibrary.fss:130` is gone, row 488's variation (skeptic's correction).
- **The class loader's computed size.** A class name now carries the value of a size computed from numerals, or in a template from its static arguments once put in; a stamped descriptor is `RTTIsize.of` of that value, read as a literal by `MethodInstantiater.isSizeLiteral`. No compiled test moved (`ant testQuick`); the loader makes a computed size beyond `NN32` (NEW-N-1, `NatArithBeyondRun`).
- **A walk value that changes, or a library type walk now refuses at load.** None: `ant testSystem` passes whole. The clause's load check refuses an unlisted extender (`NatOpenUnlistedExtender`); `NatReflect`'s own clause, in another component, is not checked at load (row 22's limit, unchanged).
- **A size opened twice in one call, or an opened size reaching a declared type.** In the tests, by design: `XXXNatOpenKeepChecker` (`keep(mk())` assigned to `Nt[\3\]`, and `two(mk(), mk())`). In the library: none; no site of the after list names an opened size.
- **A program the checker refused that it now accepts, outside sizes**: a `nat` or `int` where binding no longer stops the checker by name, so such declarations reach later checks; the one met, `GenericFnWithExcludes`, is still refused.
- Not reached: normative text beyond the identity sentence, the proviso, the size chapter's sentence and their entries (the callouts carry the rest); a library edit beyond `NatReflect`'s clause and the typed parameters of `row` and `plane`, which the brief names; a team test line.

## 11. Decisions

1. **Where a size is computed.** Chosen: the checker folds at comparison and at the range check; the name mangler computes an operation on numerals; the class loader computes the rest when it puts a template's static arguments in; one `Naming.foldSize` for both. Not taken: folding the tree in the phase that folds integer literals (the templates' symbolic sums stay for the loader anyway); the loader alone (code that is not a template asks the JVM for the class named with the spelled `2+1`, which cannot be answered with the class of `Box[\3\]`); the mangler alone (cannot compute a sum of static parameters). Evidence: `NatArithClass`; `Naming.java:186-189`.
2. **Part (b)'s reach.** Chosen: a name or an operation beside a numeral, and an operation beside any size not written alike, is not known to differ; two different numerals differ; two different static parameters still differ, as before. Not taken: only numerals known to differ (the Q&A's reasoning carried to two names, which the decision does not state, and which would change verdicts where two size names tell overloads or arms apart); a name beside a numeral only (would keep `n+1` known to differ from `0`, against the Q&A). Listed for the curator.
3. **No size inference to an expression.** A size inference variable binds a static parameter or a numeral (folded), never `k + 1`; `NatArithSize` writes `unboxNext[\3\]` as the team's test did. Not taken: binding to an expression, which no site of the 23 needs.
4. **Where the opening lives.** Chosen: a case of `pSubInner` beside the union case, as the judgement places it, with `pSub`'s memo bypassed for an opening type and the history guarding the cycle, and one opening per call in the coercion path. Not taken: the memo kept (two arguments would share one opened size, accepting `two(reflect(3), reflect(4))`); reusing an opened name when the target names one (would accept `var z = take(mk()); z := mk()`); opening only at calls (`NatParam`'s other checks would lose the rule). Evidence: `ProbeOpen`; the stack overflow of `XXXNatOpenKeepChecker`'s first run before the guard; the first distance run.
5. **An opened size is not known to differ from any size**, so a comprises exclusion through `NatParam` never calls a typecase clause `N[\m\]` unreachable. Not taken: the old rule that a fresh name differs from every other name.
6. **The hierarchy check** reads the listed type's where-clause sizes as inference variables and accepts a formula that solves. Not taken: names compared as text (accepts `N[\nat n\]` by coincidence of the name, refuses `N[\nat m\]`); opened names (refuses every extender).
7. **Walk's load check** reads a where-clause variable as any term, the same at each of its places. Not taken: skipping a clause that names one (loses the check); a fresh instance (walk's `Term` compares declarations).
8. **The loader's range.** Not checked: nats and ints share one spelling ("nats and ints go with same encoding", `compiler/NamingCzar.java:1829-1833`), so the loader does not know the kind; NEW-N-1.
9. **The proviso's reach.** The text admits any where-clause variable, as the judgement's sentence does; the Effect says the checker opens only `nat` and `int` ones (row 636 for a type). Not taken: a proviso limited to sizes.
10. **`plane(k)` typed beside `row(i,k)`**, as the brief allows; the loop's parameter at `:2916` is a desugared function expression, not a local parameter written untyped, and is left (NEW-N-6).
11. **The tests' form.** Refusals are `XXX` compile tests, the folder's convention (all 224 `compile_err_equals` tests are); `NatOpenChecker` is a `typecheck` test since the code generator refuses a trait with a where clause, and its compiled run is `XXXNatOpenRun`; `Nt` for `NT`, an operator; `sizePlus` for `at`, a keyword.
12. **The distance stage ran twice**: the first run, on `4db778294`, measured the coercion path's refusals that `9d323883f` repairs; the after is the second, on the final code.
13. **The full reasoning** is in this report, cited by both Appendix I entries, since the section asks for no decision record.

## 12. Defects and their homes

- Arithmetic in a size refused; sizes compared without folding: home 1, `NatArithSize`, `NatArithClass`, `XXXNatArithFormChecker`, `XXXNatArithRangeChecker`.
- The `N[\0\]` arm called unreachable: home 1, `NatZeroArm`.
- A `NatParam` refused where `N[\n\]` is expected (row 664), and a `nat` where binding refused by name: home 1, `NatOpenChecker` (row 664 closes); `XXXNatOpenKeepChecker` keeps the right refusals.
- Walk unable to load the restored clause: home 1, `NatReflectTest`, `NatOpenWalk`, `NatOpenUnlistedExtender`.
- The compiled run of an opened size: home 2, `XXXNatOpenRun`, under row 307.
- NEW-N-1, the loader makes a computed size beyond `NN32`: the specification settles that a `nat` is an `NN32` value, but the defect is a run that succeeds, which no `XXX` test can show failing; home 3's form, `NatArithBeyondRun` asserting today's value, and the row.
- NEW-N-2, walk stops on a power in a size: home 2, `tests/XXXNatArithPowerWalk.fss`, and the row.
- NEW-N-3, the checker reads no where-clause constraint as a bound: home 2, `compiler_tests/XXXWhereBoundChecker`, and the row; the same on the base.
- NEW-N-4 and NEW-N-5, the unhidden `Array2`'s sites: home 3, rows whose reproducer is the gate's per-site list, as row 664's is.
- NEW-N-6, the `TryChecker` crash hiding `Array3`: home 3, the row; the checker crashes, so no gated test can pass while it shows on the library, and a compiler-world program of the same shape typechecks.
- Added by the skeptic: a power of numerals above the exponent 4096 neither folded nor range-checked (`Box[\2^5000\]` compiled and ran) and a power of one at a large exponent stopping the class loader: home 1, fixed in `7dd0adf0c`, `XXXNatArithRangeChecker` and `NatArithClass`; NEW-N-7, no size inference to an expression with a static parameter in it: home 2, `compiler_tests/XXXNatArithInferChecker`; NEW-N-8, a declaration taking an opening trait beside a generic one at its listed type refused as duplicates: home 3, `compiler_tests/XXXNatOpenOverloadChecker` (today's refusal), unsettled; NEW-N-9, two size parameters counted as different: home 3, `compiler_tests/XXXNatTwoParamArmChecker` (today's refusal, also the base's), unsettled.
