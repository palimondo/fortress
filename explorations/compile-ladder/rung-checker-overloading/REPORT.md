# Rung C of climb batch 11: the checker's overloading, export, a disambiguator crash, row 463's tests, and under Q4 a local function's untyped parameter

problem: explorations/coordinator/CLIMB-BATCH-11.md:210-240 (rung C's section: rows 610, 617, 619, 625, 637, 626, row 463's tests, and under Q4 rows 620 to 622; distance class X1, Library/List.fss:12)
spec: Specification/basic/traits.tex:521-529, :585-595 ("Method Declarations": inherits, provides, override); Specification/advanced/overloading.tex:469-517 ("Meet Rule", the Meet Rule for Functional Methods and its cover), :134-162 ("Principles of Overloading", a bound written Any); Specification/basic/components/source-code.tex:315-319 ("Export Statements", no private declaration satisfies an api); Specification/basic/declarations.tex:416-418 ("Reach and Scope of Declarations"); Specification/basic/components/type-inference.tex:44-46 ("Type Inference for Components")
precedent: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1165-1235 (walk's providedBy and inherited, climb batch 10 rung W); ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:614-627 at 83b1cae78 (meetRule's withoutSelf); ProjectFortress/src/com/sun/fortress/scala_src/useful/SNodeUtil.scala:192-204 (alphaRenameTypeSchema renames every parameter's bound); ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala:192-193 at 83b1cae78 (the top-level refusal); ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:227-237 (a bare name in a typecase clause becomes a binding)
deviation: provides is a filter over gatherMethods' relation, STypesUtil.providedAndOverridden, and gatherMethods is unchanged, since the code generator reads it too (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:485, :937, :955, :1096)
deviation: an overriding pair dropped from the overloading check keeps its return-type checks, a widening override's by subtyping (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:656-688), which walk's precedent does not have (OverloadedFunction.java:1206-1235 checks no return type)
deviation: the refusal tests keep XXX names, since the harness has no plain compiled refusal (ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:416-425), where the section asks for plain names
deviation: row 610's test is a typecheck test, since the code generator refuses the modifier override (CodeGen.java:2897-2899, :2966-2976), where the section asks for disp0 running
deviation: row 626's test names Nonesuch[\ZZ32\], a type no library declares, where its expected failure named ImmutableArray[\ZZ32, ZZ32\], which the one library declares (Library/FortressLibrary.fsi)
historical: ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala, ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java, Specification/basic/components/type-inference.tex, Specification/appendices/changes.tex

(The harness refused this agent's write of REPORT.md. This text is the report, for the gather to write verbatim.)

The rung follows the curator's answer to Q4, yes, way 1 (POSITIONS, "The order of the work after batch 10."; `explorations/coordinator/CLIMB-BATCH-11.md`, "Answered.").

Commits on `wip/rung-checker-overloading`, from `83b1cae78`:
- `a93434c08`: the tests alone, seen failing on the base.
- `78a45cf23`: the checker's edit and the reorganized tests.
- `68694006c`: the return-type check of an overriding pair, and two more expected failures.
- `772916fb0`: the specification's box and Appendix I entry, the decision record and `record.md`.
- `307c1ab69`: a line citation in the records corrected.

The worktree was made by `seed-worktree.sh` from `/home/user/fortress-base11` (exit 0); nothing else was inherited.

## 1. What changed, and why

- **Row 610, what a type provides.** The traits chapter says that a type inherits the declarations its immediate supertypes provide, except one that its own `override` declaration overrides and one whose parameter types, self apart, its own declaration repeats; it provides those and its own (`Specification/basic/traits.tex:521-529`, `:585-595`). The checker read every declaration of every supertype (`STypesUtil.gatherMethods`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1602-1620`). `STypesUtil.providedAndOverridden` (`STypesUtil.scala:1622-1695`) keeps, of `allMethods`' declarations, those the type provides, by a walk over the extends clauses, as walk's `providedBy` does; the overloading checker (`OverloadingChecker.scala:380-393`) and the abstract-method checker (`AbstractMethodChecker.scala:83-91`) read that set. The comparison is of the parameter types without self, as the type has them, over the method's own static parameters renamed apart (`OverloadingChecker.scala:159-171`; in the abstract-method checker its `domainApart`).
- **The return types of an overriding pair.** Dropping the overridden declaration took the pair out of the overloading check, where the Return Type Rule and the positional rule had been checked on it; `XXXNatRetSizeChecker` and `XXXOverloadPermutedStaticParams` turned red (section 6). `providedAndOverridden` reports each pair it drops, and `checkOverridingReturnType` (`OverloadingChecker.scala:656-688`) checks a pair of equal parameter types as an overloaded pair was checked, and a widening `override`'s return type against the overridden one's, "The return type of the overriding declaration must be subtype of that of the overridden declaration" (`traits.tex:590-591`).
- **Row 617.** `coverageRule` passed the whole arrows to `coversOverlap` where `meetRule` compares them without self; for a functional method of a providing type it now passes them without self (`OverloadingChecker.scala:631-654`).
- **Row 619.** `checkBoundAny` read a dotted method's domain with its receiver, a tuple, never a naked type parameter; the call now drops the receiver with the file's own `dropReceiver` (`OverloadingChecker.scala:451-453`, `:710`).
- **Row 625.** `domainApart` and `ownStaticParamsApart` renamed only a clashing parameter's bounds; both now rename every own parameter's bounds (`AbstractMethodChecker.scala:141-149`, `OverloadingChecker.scala:210-218`), as the team's `alphaRenameTypeSchema` does (`SNodeUtil.scala:192-204`).
- **Row 637.** `allAbstractsMadePublic` asked an api declaration of a private abstract member; it skips private ones (`ExportChecker.scala:744`, `:751`), since "no declaration modified by `private` participates in satisfying any exported declaration" (`Specification/basic/components/source-code.tex:315-319`).
- **Row 626.** In a typecase clause the disambiguator suppressed "X is undefined." for any undeclared name, to bind a bare one to the value; an applied name cannot be a binding, and reached the trait table. It now suppresses the error only for a bare name (`TypeDisambiguator.java:376-383`). The disambiguator is a phase both paths share (section 5, walk's answer).
- **Under Q4, rows 620 to 622.** A local function whose parameter type is left out is refused where it is bound, "Missing parameter type for i", with the message and the thrown `TypeError` of the top-level refusal (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala:69-77`, beside `:199-200`), so that it comes before any of the three stops and a `TryChecker` that meets it gives up on it.
- **Row 463, tests only.** Two expected failures over the compiler library's `Maybe` and `Just`.
- **The specification.** A box at `Specification/basic/components/type-inference.tex:47-53` and the Appendix I entry "The type of a parameter that a declaration leaves out" (`Specification/appendices/changes.tex:2810-2866`); `decision-record.md` in this directory has the full reasoning.

## 2. The tests, first

`a93434c08` held the tests alone, the six promotions, the three Q4 rekeys and row 463's two expected failures. Their failing run, on the seeded base build, before the edit was first built (the first build ended at 23:56):

```
ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests OverrideFunctionalMethodWiden.test FunctionalMethodMeetCoverWithoutSelf.test OverloadDottedSingleParamBoundAny.test InheritedAbstractMethodBoundSameName.test TypecaseUndeclaredType.test ExportPrivateAbstractMember.test LocalFunctionUntypedParam.test LocalFunctionUntypedParamAndReturn.test LocalFunctionUntypedParamInLoop.test XXXIfGeneratorClause.test XXXWhileGeneratorClause.test
# junit.sh base 2026-10-08T23:47:26Z; ... tree 83b1cae78 with the next rung applied, not yet committed
    Invalid overloading of f in trait B:
    Invalid overloading of mark in trait Pq:
java.lang.RuntimeException: Not in the trait table: Nonesuch
         due to Asbtract method scaled @ ProjectFortress/compiler_tests/ExportPrivateAbstractMemberApi.fss:7:5-8:1 is not declared in the API)
Tests run: 17,  Failures: 15,  Errors: 0
```

Row 625's program first carried a call of `gen`, which fails on another defect (section 12, NEW-C-2); without it, on the base (`junit.sh base2`, 23:47:58Z): 'has no concrete implementation in the object P' and 'Invalid overloading of gen in trait P'. Row 463's two expected failures were green on the base, 'Saw expected failure'.

The first edit's run showed that a refusal cannot be a plain compiled test (`FileTests.java:416-425`: a plain test with a failed compile is red whatever its keys) and that the code generator refuses `override` (section 3). So the refusal tests took their `XXX` names back, row 610's test became a `typecheck` test, and the code generator's refusal got its own expected failure. Each test so changed, and the three added later, was run on the old code through the harness (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base11 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/X.test ...`):

```
. typecheck ProjectFortress/compiler_tests/OverrideFunctionalMethodWiden ... Invalid overloading of f in trait B:
 Saw failure, but did not satisfy compile_err_contains; expected
A functional which takes a single parameter of a parametric type bound by Any
 Did not satisfy compile_err_contains; expected
Nonesuch is undefined.
Tests run: 7,  Failures: 7,  Errors: 0
```

(00:00Z, `OverrideFunctionalMethodWiden`, `XXXOverrideModifierCodeGeneration`, `XXXOverloadDottedSingleParamBoundAny`, `XXXTypecaseUndeclaredType` and the three `XXXLocalFunctionUntyped…`); 00:05Z, `OverrideAbstractMethodWiden` and `XXXOverrideInheritedThroughOtherSupertype`, 'Tests run: 2,  Failures: 2'; 00:24Z, `XXXOverrideReturnTypeNotSubtype`, 'Saw wrong failure', 'Tests run: 1,  Failures: 1'.

The first `XXX` test added, `XXXIfGeneratorClause`, shown both ways from its place: green on the base, 'Saw expected failure'; with `__cond[\E,R\](c: Condition[\E\], t: E->R, e: ()->R): R = if c.holds then t(c.get) else e() end` added to the program for one run, red, 'Did not satisfy compile_err_contains; expected Variable __cond is not defined', then restored (byte for byte against a copy).

The passing run, after the last change of code (`68694006c`, built at 00:24:27):

```
ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh edit6 ProjectFortress/compiler_tests <the rung's 22 .test files, XXXNatRetSizeChecker.test, XXXOverloadPermutedStaticParams.test>
OK (24 tests)
```

and the compiler track of `ant testQuick` (section 6), which holds them all.

The tests, by row:
- 610: `OverrideFunctionalMethodWiden` (`typecheck`; the team's `disp0` program), `OverrideAbstractMethodWiden` (`typecheck`; an abstract method overridden in a trait and in an object), `XXXOverrideInheritedThroughOtherSupertype` (refused at `T` only, 'has 1 error', by `compile_err_matches`), `XXXOverrideReturnTypeNotSubtype` (refused, the new return-type message), `XXXOverrideModifierCodeGeneration` (the code generator's refusal, NEW-C-1).
- 617: `FunctionalMethodMeetCoverWithoutSelf` (compiles, links, runs; four dispatches asserted, `PASS`).
- 619: `XXXOverloadDottedSingleParamBoundAny` (refused, 'A functional which takes a single parameter of a parametric type bound by Any'); `OverloadDottedSingleParamBoundAnyLink.test` removed, the program no longer linking.
- 625: `InheritedAbstractMethodBoundSameName` (compiles, links, runs, `PASS`).
- 626: `XXXTypecaseUndeclaredType` (refused, 'Nonesuch is undefined.').
- 637: `ExportPrivateAbstractMember` with `ExportPrivateAbstractMemberApi` (links and runs; `Square(3).area()` asserted 9).
- 620 to 622: `XXXLocalFunctionUntypedParam` ('Missing parameter type for i'), `XXXLocalFunctionUntypedParamAndReturn` ('… for n'), `XXXLocalFunctionUntypedParamInLoop` ('… for k'; its parameter renamed from `i`, the loop's variable, so that the key names the local function's).
- 463: `XXXIfGeneratorClause` ('Variable __cond is not defined'), `XXXWhileGeneratorClause` ('Variable __whileCond is not defined.').
- Found on the way: `XXXMethodStaticArgsBoundNamesOther` (NEW-C-2), `XXXKeywordParamOmitted` (NEW-C-3).

## 3. Where the fixes belong, and the precedents

- The overloading rules are checked after type checking, in `OverloadingChecker` and the `AbstractMethodChecker` it calls (`explorations/coordinator/map/modules-and-phases.md`, B.7; `compiler/StaticChecker.java:275`). The section names `gatherMethods` and `toFunctionalMethodArrows`. `gatherMethods` also feeds the code generator's forwarding of inherited methods (`CodeGen.java:485`, `:937`, `:955`, `:1096`), whose run-time answers this rung does not measure, so provides is computed beside it and read only by the two checkers. `toFunctionalMethodArrows`' drop of an abstract declaration implemented below is subsumed by provides and left as it is.
- Walk's precedent, `OverloadedFunction.FunctionalMethodMeets.providedBy` and `inherited` (`OverloadedFunction.java:1165-1235`), walks the immediate supertypes and drops a declaration that an own declaration matches in parameter types, or overrides with the modifier. The rung follows it, and reads dotted methods too, as row 610's `g` asks.
- Row 617's precedent is `meetRule`'s `withoutSelf` in the same file: one other site reads a functional method's arrows for a providing type, `meetRule` (`OverloadingChecker.scala:614-627` at 83b1cae78), and it already compares without self.
- Row 625's precedent is the team's `alphaRenameTypeSchema`, which renames every parameter's bound (`SNodeUtil.scala:192-204`); the two defective sites are the only others of the shape (`grep -rn 'subst.find(_._1 == p.getName)'`: `OverloadingChecker.scala:213`, `AbstractMethodChecker.scala:144`, both edited).
- Row 619: `checkBoundAny` has one caller (`OverloadingChecker.scala:453`).
- Row 637: `allAbstractsMadePublic` is the one check of abstract members against the api (`ExportChecker.scala:699`).
- Row 626: `rewriteTypecaseClause = true` is set at one place (`TypeDisambiguator.java:380`); the rewrite it serves reads only a bare name or a tuple of them (`:233-245`).
- Q4: the top-level refusal is `STypeEnv.extractNodeBindings` (`STypeEnv.scala:199-200`); the local form is bound by `extendWithBindingsFromFnList`, whose callers pass a block's local functions (`impls/Decls.scala:410`) and lists of methods (`Thunker.scala:68`, `:103`; `impls/Decls.scala:102`, `:147`; `impls/Misc.scala:379`), so the check reads `DeclaredFunction` elements only. The `SLetFn` rule of `impls/Decls.scala:407-419` was the other place; it is beside the block rules that rung E edits.

## 4. What the specification settles

- 610: the traits chapter's inheritance and override (`traits.tex:521-529`, `:585-595`); walk has followed it since climb batch 10's rung W. The return-type sentence (`:590-591`) gives the override check.
- 617: the Meet Rule for Functional Methods and its cover, read without the self parameter for a type that provides both (`Specification/advanced/overloading.tex:469-517`).
- 619: "a functional which takes a single parameter whose type is a naked type parameter declared with the bound `Any` written ... cannot be overloaded" (`overloading.tex:134-137`); a dotted method is a functional.
- 625: the inherited method's static parameters are its own (`traits.tex`, "Method Declarations"); batch 10's rows 561 and 563.
- 637: `source-code.tex:315-319`.
- 626: "It is a static error for a reference to a name to occur at any point in a program at which the name is not in scope" (`Specification/basic/declarations.tex:416-418`).
- 620 to 622: the components chapter asks inference over every elided type (`type-inference.tex:44-46`), which the inference chapter does not describe (`Specification/basic/inference.tex:23-25`, `:261-262`); Q4's way 1 records the refusal against it.
- 463: `Specification/basic/expressions/if.tex:29-41` and `while.tex:21-30` allow a generator binding as the clause.

## 5. Programs run old against new

Old is `old-fortress.sh` on `/home/user/fortress-base11`; new is the rung's code; probes under the rung's `tmp/`.

| program | old | new |
|---|---|---|
| the team's `disp0` (`OverrideFunctionalMethodWiden`), compiled | 'Invalid overloading of f in trait B', and of `g` | type checks; the code generator: 'Don't know how to compile this kind of FnDecl' (NEW-C-1) |
| an abstract `f` and `g` overridden, widening, in a trait and an object (`OverrideAbstractMethodWiden`) | 3 errors: two 'has no concrete implementation', 'Invalid overloading of g in trait C' | type checks |
| `override` in a trait `B`, inherited by `object C` (probe `PWidenTrait`) | refused at `B` and at `C` | type checks |
| `D2 extends D` overrides `D`'s `f`, `X extends D` does not, `object T extends {D2, X}` | refused at `D2` and at `T`, 'has 2 errors' | refused at `T` only, 'has 1 error' |
| an override returning `ZZ32` over one returning `String` | 'Invalid overloading of f in trait B' | 'the return type of the overriding declaration (B, Number)->ZZ32 ... should be a subtype of the return type of the declaration it overrides (A, ZZ32)->String' |
| row 619's `Ob` | compiles; the run prints `Ob.m(3) =  1`, then `ClassCastException` | refused, the restriction's message |
| row 625's program with `p.gen[\String, Box[\String\]\](...)` called (probe `PGenCall`; and with the object's parameter named `Z`) | 'R is not in the kind env [][][]' | the same (NEW-C-2) |
| `typecase x of Nonesuch[\ZZ32\] => ...`, under walk (probe `PTypecaseWalk`) | at run time: 'ProgramError ... Missing type Nonesuch[\ZZ32\]' | at load: 'Nonesuch is undefined.' |
| the three Q4 programs, under walk | | `7`, `49`, `6` (walk unchanged) |
| `app(fn (x) => x + 1, 4)` against `app(h: ZZ32 -> ZZ32, v: ZZ32)`, compiled | | prints `5`: a function expression is not refused |
| `k(x: ZZ32, y = 3)` (probe `PKeyword`) | 'Missing parameter type for y' | the same; walk: 'InterpreterBug ... The number of parameters (2) does not match with the number of arguments (1).' (NEW-C-3) |

## 6. Whole suites

The edit changes the checker and a shared phase (the disambiguator), so `ant testQuick` and `ant testSystem` ran once on the final code (`68694006c`; the later commits change no code):

```
ant testQuick      (00:33-00:46, BUILD SUCCESSFUL, Total time: 12 minutes 58 seconds)
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 512.916 sec
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 533.295 sec
    [junit] Tests run: 1055, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 774.358 sec
ant testSystem     (00:46-00:50, BUILD SUCCESSFUL, Total time: 4 minutes 4 seconds)
    [junit] Tests run: 131 / 128 / 131 / 126, Failures: 0, Errors: 0
```

Against the last landed gate (`explorations/compile-ladder/climb-batch-10/gate/summary.txt`): the compiler track 1043 to 1055, the rung's +12 cases (22 cases in its files against the 10 its expected failures had); the library track 86, the othercompiler track 263 and the system shards 516, unchanged.

The run on the first code state (`78a45cf23`), 'Tests run: 1053, Failures: 2', turned two compiled tests red: `XXXNatRetSizeChecker` ('File XXXNatRetSizeChecker.fss has 3 errors.' no longer matched) and `XXXOverloadPermutedStaticParams` ('should correspond position by position' no longer given), because dropping the overridden declaration dropped the pair's return-type checks. The second code state restores both (section 1); they are green in the run above.

## 7. The count and the distance

Run once on the final code, after the last build:

```
explorations/coordinator/tools/checker-count/run.sh tmp/rung-checker-overloading/checker-count-postedit.txt tmp/rung-checker-overloading/cc-post
diff explorations/compile-ladder/climb-batch-10/gate/checker-count.txt tmp/rung-checker-overloading/checker-count-postedit.txt   -> no difference
#total	1
#crash	none
```

```
explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-10/gate/distance.txt tmp/rung-checker-overloading/distance-postedit.txt
DISTANCE SAME   253
    kind typecheck              201 -> 202    (+1)
    kind export                   4 -> 3      (-1)
    class X1                      4 -> 3      (-1)  export: component against api
    class BR                      3 -> 4      (+1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
    unit component FortressLibrary    215 -> 216    (+1)
    unit component List          10 -> 9      (-1)
    crash gone   decl	FnDecl FortressLibrary.fss:1302:1-1306:4	InterpreterBug	** bug! FortressLibrary.fss:1304:10 Type is not inferred.
    crash new    decl	FnDecl FortressLibrary.fss:1302:1-1306:4	TypeError	FortressLibrary.fss:1304:10: Missing parameter type for i
    crash new    decl	TraitDecl FortressLibrary.fss:2492:1-2606:2	TypeError	FortressLibrary.fss:2501:9: Missing parameter type for i
    crash new    decl	TraitDecl FortressLibrary.fss:2865:1-2978:2	TypeError	FortressLibrary.fss:2884:11: Missing parameter type for i
```

(the two other `crash gone` lines are the `TryChecker` stops at `:2492-2606` and `:2865-2978`; `#seconds 1169`; `#machine nproc=4; Intel(R) Xeon(R) Processor @ 2.10GHz; load at start 1.06 2.26 3.96; FORTRESS_THREADS=1`; `#shadow every shadow edit matched the tracked sources`). A first distance run, started on the first code state, was stopped when the code changed and is not reported.

The sites that moved, by row of `tmp/rung-checker-overloading/dist-post/errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv` (sorted, diffed):
- gone: `export ... component List ... List.fss:12 ... due to Asbtract method appendRC @ List.fss:130:5-53 is not declared in the API`, row 637's site.
- new: `typecheck ... component FortressLibrary ... FortressLibrary.fss:130 ... Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\].`, `BIG LEXICO(g)`, whose return type is left out. It is rows 399 and 488's site, on file in earlier per-site lists and moved by query history before (`explorations/coordinator/PLAN.md:591`). The rung's only edit inside the type-checking stage is Q4's refusal: the `__bigOperator` stop at `:1304` was an `InterpreterBug`, which a `TryChecker` passes on, and is now a `TypeError`, which it swallows, so checking reaches `:130`. The other edits run in the disambiguator (no library site moved there), in the overloading and abstract-method checks and in the export check, after type checking.
- The three Q4 crash rows stay crash rows of the stage, now with the refusal: what lies behind them stays hidden, as the section foresaw.

The distance stays 253; the count stays 1. No table is committed.

## 8. The ladder subset

The baseline's files whose recorded first error names what the rung touched ('Missing parameter type', 'Not in the trait table'; none names 'Invalid overloading', 'is not declared in the API', 'bound by Any', 'no concrete implementation', 'kind env', `__cond`), eight, run after the edit with the drivers copied under `tmp/rung-checker-overloading/ladder/` and `classify.py`: `AlsoDo`, `LocalVar`, `TimingTests`, `contracts1`, `letRecTest`, `objectTest4`, `overloadTest3` stay at typecheck, 'Missing parameter type for x' (`n`, `g'`), and `wrongOverload` at typecheck, 'Not in the trait table: CompilerLibrary.Array2', each as in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`. None is among the gate's 85 files, whose verdicts the gate keeps.

## 9. The specification

Changed, under Q4: the box after `type-inference.tex:44-46` (now `:47-53`) and the Appendix I entry "The type of a parameter that a declaration leaves out" (`changes.tex:2810-2866`), in the S1 form; the front matter's paragraph (`Specification/fortress/preamble.tex:54-64`) stays true. Built: `cd Specification/fortress && ./ant genSource && ./ant tex`, both 'BUILD SUCCESSFUL'; the skill's grep of `fortress.log` counts 40 lines, every one the macro text `x@warning {Reference `#1' on page \thepage \space undefined}}{}`, and `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|^! Undefined control sequence"` counts 0; the build's files removed with `git clean -fXq -- Specification`.

Each sentence the entry's effect states was run: the refusal of the three local forms (section 2), a function expression's parameter taken from the expected arrow type (`5`), the keyword parameter (NEW-C-3), walk on the local forms (`7`, `49`, `6`).

Sentences of the specification the change makes false: none found. Checked:
- Appendix I, "The implicit bound of a type parameter": "the compiled type checker applies the restriction only to a bound written \TYP{Any}, and draws no such refusal on \library" (`changes.tex:2202-2203`), and the box at `overloading.tex:154-162`: now true of dotted methods too, and the count and the distance show no new refusal of the restriction on the library.
- `overloading.tex:613-631`, the compiled checker's positional rule refusing the override `make[\A, B\](): Pr[\B, A\]`: still true (`XXXOverloadPermutedStaticParams` green).
- Appendix I, "The Meet Rule for traits with comprises clauses", its four departures (`changes.tex:2512-2519`): row 617 was not among them.
- Appendix I's sentence that the compiled checker "checks, at each object declaration, that the object's concrete methods cover the abstract methods it inherits" (`changes.tex:2403-2405`): still true, "inherits" now read by the chapter.
- No passage names rows 610, 617, 619, 625, 626, 637 or 463 (`grep -rn` of `Specification/` for the numbers).

## 10. Points to report

- **A compiled test whose verdict changes other than by the rung's intent.** On the first code state, `XXXNatRetSizeChecker` and `XXXOverloadPermutedStaticParams` turned red (`ProjectFortress/TEST-RESULTS/fast-compiler`, 'Tests run: 1053, Failures: 2'); repaired in `68694006c` before landing, both green in the final run (section 6). Reversible.
- **A program the text allows that the checker now refuses, or one the text refuses that it now accepts, outside the rung's rows.** The return type of a widening `override` is now checked (`OverloadingChecker.scala:656-688`), a refusal the base never gave, since it refused every widening override as an invalid overloading (`XXXOverrideReturnTypeNotSubtype`); within row 610's chapter sentence (`traits.tex:590-591`). An abstract method overridden by a widening `override` is no longer asked an implementation (`OverrideAbstractMethodWiden`, `AbstractMethodChecker.scala:83-91`); row 610's class, in the abstract-method checker. Reversible.
- **Each error the three refusals of Q4 uncover behind the crash rows, with its site.** One: `Library/FortressLibrary.fss:130`, `BIG LEXICO(g)`, 'Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\].', class BR, rows 399 and 488's site (section 7). The three crash rows stay crash rows, now 'Missing parameter type for i' at `FortressLibrary.fss:1304:10`, `:2501:9`, `:2884:11`. Reversible.
- **Normative text changed beyond Q4's callout and its entry.** None: the box and the entry only.
- **A library or walk edit, or a declaration added to the compiler's prelude.** No library, walk or prelude edit. The disambiguator, a phase walk shares, now refuses at load an undeclared applied name in a `typecase` arm that walk refused at run time ('Missing type Nonesuch[\ZZ32\]'; section 5); `ant testSystem` unchanged. Reversible.
- **A crash repaired by catching it without the error the text gives.** The Q4 refusal replaces three stops with the error Appendix I now records (`changes.tex:2810-2866`), under Q4's way 1; listed for completeness. Reversible.

No step taken cannot be undone, and none acts against a decision on record.

## 11. Decisions

1. **Provides beside `gatherMethods`, read by the two checkers only.**
   - Ways: change `gatherMethods`, which every caller reads, the code generator's forwarding among them (`CodeGen.java:485`, `:937`, `:955`, `:1096`); filter in `toFunctionalMethodArrows` alone, which leaves dotted methods (row 610's `g`) and the abstract-method checker; a filter beside it, `providedAndOverridden`, read by the overloading and abstract-method checkers (taken).
   - Evidence: the code generator's forwarding of an overridden method is not measured by this rung, and disp0 does not reach it (NEW-C-1); walk's precedent is a separate walk too (`OverloadedFunction.java:1165-1235`).
2. **The walk over the extends clauses, not the subtype order.** Ways: drop a declaration whenever a type below its declaring type matches or overrides it, as `removeIdenticallyCoveredMethods` does for equal domains (`STypesUtil.scala:1535-1558`); walk each immediate supertype (taken). Evidence: in a diamond the first drops a declaration that another supertype still provides; `XXXOverrideInheritedThroughOtherSupertype` pins the chapter's answer, refused at `T` and not at `D2`.
3. **The overriding pair's return types are still checked.** Ways: none, the chapter's provides alone (two compiled tests red, section 6, and the Return Type Rule of overriding lost); the old pair checks for every dropped pair, which for a widening override finds no more specific side and checks nothing (`OverloadingOracle.scala:83-126`, `case None => true`); the old pair checks for equal parameter types and the chapter's sentence for `override` (taken; `traits.tex:590-591`). For a widening override with own static parameters the check reads them position by position (`satisfiesPositionalRule`), the compiled restriction already stated at `overloading.tex:621-628`.
4. **The abstract-method checker reads provides too.** Ways: leave it on `allMethods` (the probe `PAbsWiden` stays refused, 'has no concrete implementation', though the object inherits no abstract method); read provides (taken). Evidence: row 610's claim is the reading of supertypes' declarations as provided; the chapter's "any object inheriting an abstract method must define a body" (`traits.tex:571-572`).
5. **Refusal tests keep `XXX` names.** Ways: plain names as the section asks, red under the harness (`FileTests.java:416-425`, a plain test with a failed compile is red); `XXX` names keyed on the right message (taken), as `XXXObjectExpressionUnlistedExtender` does for a refusal the text gives.
6. **Row 610's test is a `typecheck` test, and the run waits.** Ways: `link` and `run` with `f PASS g PASS`, which the code generator's refusal of `override` stops (`CodeGen.java:2897-2899`, `:2966-2976`); add `Modifiers.Override` to the code generator's set, a code-generator edit outside the rung's files whose dispatch over a type that does not provide the overridden declaration is unmeasured; a `typecheck` test and an expected failure for the code generator (taken; NEW-C-1). Precedent: batch 10's varargs tests, `typecheck` tests behind a code-generator wall (`explorations/compile-ladder/rung-checker-defects/REPORT.md`, decision 11).
7. **Row 626's test names `Nonesuch[\ZZ32\]`.** Ways: keep `ImmutableArray[\ZZ32, ZZ32\]`, which the one library declares and which would compile at the switch-over and turn the test red for a reason that is no defect; a name no library declares (taken).
8. **Row 626's fix in the disambiguator.** Ways: report in the trait table's lookup (`TypeAnalyzer.scala:725`), a checker crash turned into a message far from the name; refuse every undeclared name in a typecase clause, which ends the bare binding form (`TypeDisambiguator.java:233-237`); refuse an applied name only (taken).
9. **Q4's refusal where a local function is bound.** Ways: `NodeUtil.getParamType` throwing a `TypeError` (`NodeUtil.java:339`), which reaches only the first stop and every other caller of the Java helper; the `SLetFn` rule (`impls/Decls.scala:407-419`), beside the block rules rung E edits; the binding of a local function in `STypeEnv` (taken), the file and the form of the top-level refusal, reached first in the `SLetFn` rule.
10. **Row 619 through `dropReceiver`.** Ways: a second check for dotted methods; the receiver dropped at the one call (taken), with the file's own helper.
11. **`FunctionalMethodMeetCoverWithoutSelf` and `InheritedAbstractMethodBoundSameName` link and run**, where the section asks for compiling: the compiled path runs both, so the values are asserted (four dispatches; `PASS`).
12. **Files beyond the section's list.** `STypeEnv.scala` is on it under Q4; `STypesUtil.scala`'s new declarations sit beside `gatherMethods`, its named fix area. No other file.

No decision of the curator was needed beyond Q4's answer; decisions 3 and 4 are read from the traits chapter.

## 12. Defects, and where each is recorded

- Row 610 (the checker's provides): home 1, `OverrideFunctionalMethodWiden`, `OverrideAbstractMethodWiden`, `XXXOverrideInheritedThroughOtherSupertype`, `XXXOverrideReturnTypeNotSubtype`.
- Row 617: home 1, `FunctionalMethodMeetCoverWithoutSelf`.
- Row 619: home 1, `XXXOverloadDottedSingleParamBoundAny`.
- Row 625: home 1, `InheritedAbstractMethodBoundSameName`.
- Row 626: home 1, `XXXTypecaseUndeclaredType`.
- Row 637: home 1, `ExportPrivateAbstractMember`.
- Rows 620 to 622: home 1 under Q4, the three `XXXLocalFunctionUntyped…` refusals.
- Row 463: home 2, `XXXIfGeneratorClause` and `XXXWhileGeneratorClause`; its fix waits for the switch-over (POSITIONS, "The library route.").
- The two compiled tests turned red by the first code state: repaired in the rung (section 6), home 1 by their own tests.
- The code generator refuses the modifier `override` (NEW-C-1): home 2, `XXXOverrideModifierCodeGeneration`; the text allows the modifier (`traits.tex:585-595`).
- A dotted method's invocation with static arguments written where one type parameter is bounded by a type at another stops the checker, 'R is not in the kind env' (NEW-C-2): home 2, `XXXMethodStaticArgsBoundNamesOther`; the text allows the call (`Specification/basic/expressions/method-invocation.tex`, "Dotted Method Invocations"). Met calling row 625's `gen`; the same on the base.
- Keyword parameters, built on neither path (NEW-C-3): home 2 for the compiled side, `XXXKeywordParamOmitted`; walk's stop is in the row's notes, since `ProjectFortress/tests/` is not this rung's folder; the chapter's draft note says they are not supported yet (`Specification/basic/functions.tex:15-22`).
- `FortressLibrary.fss:130` (section 7): rows 399 and 488 hold it; a note for row 488 in `record.md`.

## 13. Names added, and the competing-declaration grep

`grep -rn` of `ProjectFortress/src/com/sun/fortress/` for `providedMethods`, `providedAndOverridden`, `paramsWithoutSelf`, `checkOverridingReturnType` finds only the rung's declarations and calls; of `ProjectFortress/tests`, `compiler_tests`, `test_library`, `library_tests`, `other_compiler_tests` for each new test name, only its own files (and `ExportPrivateAbstractMemberApi.fsi`'s comment naming its component).

## 14. Commands this skill does not give

- `compile_err_matches=(?s).*Invalid overloading of f in trait T:.*has 1 error\\..*`: a `.test` key whose value is a Java regular expression the whole stream must match (`FileTests.java:173-177`), used to pin that a refusal names one type and no other.
- `old-fortress.sh <base-build> <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/X.test ...`, with absolute paths: the harness on the old code for compiled tests.

## 15. Questions for the curator

None that blocks; for his review:
- NEW-C-1: whether the code generator should take the modifier `override`, and what the compiled dispatch must then do with a declaration a type does not provide (`disp0`'s run, row 610's owed run test).
- The return-type check of a widening `override` (decision 3) is a refusal the base never gave, read from `traits.tex:590-591`.
