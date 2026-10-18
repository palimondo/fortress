# Climb batch 18, rung K: the where conditions checked where they apply

- problem: rows 748, 749, 750, 753 and 771 of the gap ledger, `explorations/fortress-gap-ledger.md:211`, `:212`, `:213`, `:216`, `:225`
- spec: `Specification/basic/trait-parameters.tex:313` ("Where Clauses"); rows 753 and 771 also rest on `Specification/basic/traits.tex`, "Trait Declarations"
- precedent: the fold of a constraint into a declaration's arrow, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:189-204` at the base; the drop of a candidate whose written static argument fails its bound, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:974-978` at the base; the bound check of a trait type, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:234-244`; the where-size inference variables of the extender check, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:318-325` and `:420-421` at the base; the binding's bound of an opened type, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:867-868` and `:908-910` at the base
- deviation: a dotted call none of whose candidates meets its where clause gets a message of its own; the precedent's drop ends in "No such method", `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1024`
- deviation: a constraint whose bound names the method's own static parameters or a where-clause variable is not read at a dotted call, nor at a type's use, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:973-978`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:245-248`
- deviation: the solver fixes, once, the sizes that the solved type variables' bounds leave; this edit is beyond the five named files, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:649-656`
- deviation: the extender check's three helpers carry the bounds, beyond `checkDeclComprises`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:386-438`
- deviation: the arrow binds a where clause's variables only when the clause has a trait constraint, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:195-221`
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala`, `Specification/appendices/changes.tex`; each is in the team's last commit, `a874948ac`

Base: `db8fecd22`. Commits on `wip/rung-checker-where-checks`:
- `abf898756`: the tests, red on the base.
- `294a4990d`: the change, P-148's step 1.
- `bd82e4fcc`: one more test, and the Appendix I clauses.
- `43bca5e63`: NEW-K-2's walk test.
- `32cf49fb6`: record.md.

## 1. What changed and why

All five rows are built, in the order the section gives.

- **Row 748.** `getCandidatesForMethod` (`Functionals.scala:973-1029`) now drops a candidate whose where clause constrains its trait's or object's static parameter, where the receiver's static argument breaks the constraint.
  - The dropped candidate is not applicable, so another overload is chosen.
  - The methods come instantiated at the receiver. The argument for the trait's parameter is read off the instantiated method's self type, at the position that parameter has in its original's self type. `SelfParamDisambiguator.scala:56-81` builds both from the declaration's static parameters, in order.
  - When every candidate is dropped, the call is refused: "Method Holder[\String\].showIt is not applicable: its where clause requires String to extend Shows."
  - The fold of a functional method's lifted arrow (`STypesUtil.scala:212-221`) is kept.
  - Both callers of `getCandidatesForMethod` get the check: the subscript (`Functionals.scala:1100`) and the method invocation (`:1129`).
- **Row 749.** `makeArrowFromFunctional` (`STypesUtil.scala:195-221`) binds the where clause's own type, `nat` and `int` variables as static parameters of the arrow, after the declared ones, so the call infers them.
  - That alone did not build the row. The arrow `[\U extends Object X[\n\], V extends Object Y[\n\], nat n\](U, V)->String` was still "not applicable to an argument of type (O, P)".
  - The cause is in the solver (`Formula.scala:644-652` at the base). It fixes `U` and `V` from their lower bounds, then finds the size constraint `O <: X[\$n\]` left over and gives up. Its own comment says so: "TODO: We can solve more constraints if we iterate 1), 2) 3) until we hit a fixed point" (`Formula.scala:578`, the team's line; `:441` at `a874948ac`).
  - `Formula.slv` now solves, once, what the type variables' solutions leave when that is sizes alone (`Formula.scala:649-656`). The retry runs only where the first attempt failed, so no call accepted before changes its solution.
  - `GenericFnWithExcludes.fss:44`, `g(O, P)` with `P` a `Y[\2\]`, stays refused: no `n` meets both constraints.
- **Row 750.** The trait-type case of `TypeWellFormedChecker.walk` (`TypeWellFormedChecker.scala:245-275`) checks the declaration's own trait constraints on its static parameters at the type's static arguments, with the bound's message.
  - The constructor calls `Wrap[\String\]("s")` and `Wrap("s")` (no static argument) are refused through this case, at the call's type: "Ill-formed type: Wrap[\String\] The static argument String does not satisfy the corresponding bound Shows.", at `XXXWhereConstraintTypeUseChecker.fss:14:27-42`.
  - They are not refused through the constructor's arrow, whose where clause (`STypesUtil.scala:178-181`) is not read at a call.
- **Row 753.** `checkDeclComprises` (`TypeHierarchyChecker.scala:318-333`) gives each type where-clause variable's inference variable its bounds.
  - The bounds are a conjunct of the formula that `comprisesContains` solves (`:422-438`), passed down through `isEligibleToExtend` and `everyKnownSubtypeListed`.
  - `object NBox[\E extends Object\](item: E) extends AnyNumBox` is refused; `NBox[\E extends Number\]` is taken.
- **Row 771.** `whereSizes` (`TypeAnalyzer.scala:856-882`) bounds a type where-clause variable by its binding and by each trait constraint of the clause on it.
  - So `openWhereSizes`, unchanged, bounds the opened type by both.
  - The extender check of row 753 reads the same bounds (`XXXComprisesWhereConstraintExtenderChecker`).
- **Specification.** Appendix I's entry "The traits that extend a closed trait": its clauses on rows 771 and 753 are revised in the revision form, with the dates (`Specification/appendices/changes.tex:1486-1501`). The specification build ended in BUILD SUCCESSFUL twice, with no undefined reference.

## 2. The failing runs and the passing runs

### Before the change

This ran on the base's code, before any build of the edit; the tree held only the tests.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests XXXWhereBoundDottedCallChecker.test WhereBoundDottedCallChecker.test WhereVariableBoundCallChecker.test XXXWhereVariableBoundCall.test XXXWhereConstraintTypeUseChecker.test XXXWhereConstraintExtendsChecker.test XXXComprisesWhereBoundExtenderChecker.test ComprisesWhereBoundExtenderChecker.test OpenTypeWhereConstraintChecker.test XXXOpenTypeWhereConstraintChecker.test XXXStaticArgBoundNestedCall.test <14 guards>

    # junit.sh base 2026-10-18T00:59:26Z; ... tree db8fecd22; ...
    1) ProjectFortress/compiler_tests/XXXWhereBoundDottedCallChecker(...)junit.framework.AssertionFailedError: Saw wrong failure. typecheck
    2) ProjectFortress/compiler_tests/WhereVariableBoundCallChecker(...)junit.framework.AssertionFailedError: Must satisfy FAIL or fail should not appear in output typecheck
    3) ProjectFortress/compiler_tests/XXXWhereConstraintTypeUseChecker(...)junit.framework.AssertionFailedError: Saw wrong failure. typecheck
    4) ProjectFortress/compiler_tests/XXXWhereConstraintExtendsChecker(...)junit.framework.AssertionFailedError: Saw wrong failure. typecheck
    5) ProjectFortress/compiler_tests/XXXComprisesWhereBoundExtenderChecker(...)junit.framework.AssertionFailedError: Saw wrong failure. typecheck
    6) ProjectFortress/compiler_tests/OpenTypeWhereConstraintChecker(...)junit.framework.AssertionFailedError: Must satisfy FAIL or fail should not appear in output typecheck
    Tests run: 25,  Failures: 6,  Errors: 0

In the same run, these were green:
- `XXXWhereVariableBoundCall` and `XXXOpenTypeWhereConstraintChecker` (' Saw expected failure');
- the 14 guards;
- `XXXStaticArgBoundNestedCall`.

`XXXComprisesWhereConstraintExtenderChecker` was added after the change, and run on the old code through the harness:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base18 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/XXXComprisesWhereConstraintExtenderChecker.test
    1) ...XXXComprisesWhereConstraintExtenderChecker(...)AssertionFailedError: Saw wrong failure. typecheck
    Tests run: 1,  Failures: 1,  Errors: 0

### After the change

This ran on `294a4990d`, built, with the library order run.
- The same list, as `new1`, printed ' Saw expected failure' for each new `XXX` test and 'OK' for each plain one.
- The two `XXX` originals turned red:
  - `XXXWhereVariableBoundCall`: 'Did not satisfy compile_err_contains'. Its compile now stops at row 701's wall: 'Don't know how to compile this kind of FnDecl'.
  - `XXXOpenTypeWhereConstraintChecker`: 'Saw wrong failure'. It now typechecks.
- The two originals were then removed, and their plain promotions kept.
- `junit.sh new2 ... XXXComprisesWhereConstraintExtenderChecker.test` printed 'OK (1 test)'.

The last run after the last change of code is `ant testQuick` on `294a4990d`'s code:

    ant testQuick
    BUILD SUCCESSFUL
    Total time: 6 minutes 11 seconds
    fast-compiler 1260 tests, 0 failures; fast-library 86, 0; fast-othercompiler 263, 0

The compiler track's 1260 is nine more than the landed gate's 1251 (`explorations/compile-ladder/climb-batch-17/gate/summary.txt:2`).
- This rung's files add eight cases: ten new, two removed. Each runs once in the track's log.
- Where the ninth comes from was not traced. The commands of the track's `.test` files number 1018 at the gate and at the base, and 1026 now.

### The red demonstration and the walk test

The first `XXX` test added, `XXXWhereBoundDottedCallChecker`, was shown red on a deliberate fix:
- Its two calls were replaced by `println("s")`.
- `junit.sh reddemo ... XXXWhereBoundDottedCallChecker.test` printed 'Saw wrong failure. typecheck' and 'Tests run: 1,  Failures: 1'.
- The file was restored, and `git status` was clean.

`XXXWhereBoundDottedCallWalk` (NEW-K-2) through the harness:

    harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/XXXWhereBoundDottedCallWalk.fss ProjectFortress/tests/XXXWhereBoundDottedCallWalk.test

It printed 'h', ' Saw expected failure: loaded and ran, not refused at load' and 'OK (1 test)'.

## 3. Where the fix belongs, and the precedent search

The brief named the five sites by reading. `explorations/coordinator/map/spec-to-implementation.md:237` (where clauses) dates from September and names only the bindings' `NI.nyi`. Before the build, I confirmed each site by compiling the edited file into a scratch folder and running the row's test.

- **Row 748.** The team's precedent, in the same function, is the drop of a candidate whose written static argument fails its bound.
  - It is at `Functionals.scala:974-978` at the base, through `staticInstantiationForApp` and `staticArgsMatchStaticParamsForApp` (`STypesUtil.scala:712-814` at the base).
  - It is the one such site in the file. `getCandidatesForMethod` has two callers, and both are covered.
  - The where calculus checks a method's bounds at the call (`Specification/appendices/calculi/where/static.tex:287-324`, the invocation rule). So the check is at the candidates, before applicability.
- **Row 749.** Rung L's fold (`STypesUtil.scala:189-204` at the base) is the precedent.
  - The where variables' static parameters are made as `KindEnv.extractNodeBindings` makes them (`KindEnv.scala:145-158`).
  - The solver's retry follows the team's TODO (`Formula.scala:578`).
- **Row 750.** The precedent is the bound check in the same case (`TypeWellFormedChecker.scala:234-244`), the one such site in the file. Its message is reused, since P-151 reads a constraint as a bound.
- **Rows 753 and 771.** The precedents are rung A's where-size inference variables (`TypeHierarchyChecker.scala:318-325` at the base) and its `openWhereSizes` (`TypeAnalyzer.scala:901-916`).
  - `comprisesContains` has three callers in the file (`:94`, `:390`, `:414`). The two in the extender check get the bounds. The object-expression check reads opened types, which `openWhereSizes` already bounds.
  - `whereSizes` has four callers (`TypeAnalyzer.scala:887`, `:896`, `:907`, `TypeHierarchyChecker.scala:321`). Each reads the new bound.

## 4. What the specification settles

- **Rows 748, 749 and 750.** A constraint holds for the declaration and bounds the variable it names (`Specification/basic/trait-parameters.tex`, "Where Clauses"). The where calculus:
  - checks a method's bounds at a dotted call (`static.tex:287-324`, the invocation rule);
  - asks for witnesses of the where-clause variables (`static.tex:241-257`, validWitness);
  - reads a type as well-formed where its arguments meet the declaration's bounds at some witnesses (`static.tex:399-410`).
- **Rows 753 and 771.** A comprises clause lists a type at every value of its where-clause variable, and an extender is a subtype of a listed type (`Specification/basic/traits.tex`, "Trait Declarations").
- **NEW-K-1.** How many times, and where, a checker reports one ill-formed type: the specification is silent.

No normative sentence changes.

## 5. Programs run old against new

| program | old (`/home/user/fortress-base18`) | new |
|---|---|---|
| the eleven tests of §2 | §2 | §2 |
| `probe/WrapInferred.fss`, `Wrap("s").twice()` | accepted | 'Ill-formed type: Wrap[\String\]', at the call |
| `probe/ConstraintExtender.fss`, an extender outside a where constraint | accepted | 'Invalid comprises clause: AnyBox ...' |
| `probe/WhereVarNoValue.fss`, `g(O, P)` with `P` a `Y[\2\]`, and `h(O)` | both refused ('has 2 errors') | `g` refused, `h` accepted ('has 1 error') |
| `probe/WhereVarNoValue.fss` under walk | prints `OPO` | (walk unchanged) |
| `probe/WalkDottedWhere.fss` under walk, `Holder[\String\]("s").showIt()` | prints `h` | (walk unchanged; NEW-K-2) |
| `probe/NestedBoundCall.fss`, the judge's nested call | 'has 2 errors': `:11:36-46`, the inner call of `both`, and `single`'s call | (the error places are unchanged; NEW-K-1) |
| the ladder subset's nine moved files, `typecheck` | the same first error as new, for each | the same as old |

The probes are scratch, under the tree's `tmp/rung-checker-where-checks/probe/`.

## 6. The checker's time, the count and the distance

### The count stage's time

Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. Every run was under `nice -n 19`, beside rung X.

| run | code | seconds | load at start |
|---|---|---|---|
| base | the base build, `/home/user/fortress-base18` | 75.1 (`real 1m15.100s`) | 0.09 |
| change | `294a4990d` | 77.0 (`real 1m16.975s`) | 5.66 (rung X running; one 3 s old-code harness run of mine overlapped its start) |
| pass | none: no second-pass edit (decision 9) | | |

Each run used this command, in a call set up for its own tree:

    time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N

The results are the same:
- `diff tmp/count/base.txt tmp/count/change.txt` printed nothing: '#total 31', '#locations 30', '#crash none'.
- `diff <(sed "s#/home/user/fortress-base18#TREE#g" tmp/count/base/run.txt) <(sed "s#/home/user/fortress-wherechecks#TREE#g" tmp/count/change/run.txt)` printed nothing.
- No code changed after `294a4990d`, so the change's count run is also the count's after-run. Its before is the landed gate's `explorations/compile-ladder/climb-batch-17/gate/checker-count.txt`, the same table.

### The profile

The profile is JFR on the count stage's checker over the change (`-XX:StartFlightRecording=...,settings=profile`, 5,385 samples). I read it with a scratch `jdk.jfr.consumer` program that gives inclusive shares.

- **The code this rung added has no samples:** `unmetWhere` 0; the trait-type case's where check (`NodeUtil.getWhereClause`, its finder) 0; `whereSizes` 1 (0.02 %); `comprisesContains` 0.
- **The hot frames:**
  - the generated walker's cases: `Walker.walkCases7$` 5.68 %, `walkCases0` 4.07 %, `walkCases2` 3.77 %;
  - `Statics.anyHash` 3.83 % and `BoxesRunTime.equals2` 3.60 %;
  - inclusive: `OverloadingChecker` 43.6 %, `STypeChecker` 39.4 %, `TypeAnalyzer.subtype` 24.2 %.
- **Inside the rung's declarations**, the one share above 1 % is the trait-type case's existing bound check, `wfStaticArgs`, at 4.94 %, all of it in `TypeAnalyzer.subtype`.
  - An instrumented copy of the case (scratch, never in the tree) counted 2,177 bound checks over the library. 945 of them repeat a check of the same analyzer, argument and bound.
  - A memo of them would save at most about 2 % of the run. That is under the difference between two runs here (75.1 s and 77.0 s), and the memo would need an audit.
  - `getCandidatesForMethod` is 0.95 % in all, its two `makeArrowFromFunctional` calls 0.80 %.

`ant testQuick` ran once, on the change. With no second-pass edit there is no second code state.

### The distance

On the final code:

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-17/gate/distance.txt tmp/rung-checker-where-checks/distance-postedit.txt
    DISTANCE SAME   35

- Every row of `tmp/rung-checker-where-checks/dist-post/errors.tsv` equals its row of `explorations/compile-ladder/gate/distance-sites.tsv` (35 sites). The comparison was row by row: whole rows, and by kind, location and message. No site comes or goes.
- The stage took 157 s ('#seconds 157 FortressLibrary 112').

### The ladder subset

The subset is the 43 files of the baseline (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`) whose first error names any of these:
- a where clause;
- a comprises clause;
- a missing method;
- an ill-formed type;
- a refused call (`Could not check`, `not applicable`).

They ran with the drivers copied under `tmp/rung-checker-where-checks/ladder/`.
- None of them is in the landed `explorations/compile-ladder/climb-batch-17/gate/ladder/ladder.tsv`, which holds the 85 passing programs.
- Against the baseline, nine moved: `FailInference2` to pass, `expTest` to disambiguate, `overloadTest6` to codegen, and six first errors changed.
- Each of the nine typechecks to the same first error on the old code as on the new, so none of them moved because of this change.
- `GenericFnWithExcludes`'s message now prints the arrow's `nat n`.

## 7. Sentences made false

Edited, in the revision form: `Specification/appendices/changes.tex:1489-1493` and `:1494-1498` of the base, in the entry "The traits that extend a closed trait" (now `:1489-1501`).

No other sentence of `Specification/` is made false. I searched `Specification/` with grep for the rows, for "dotted call", and for "where" with "constraint" and "condition".

Made false outside the specification, for the gather and the skill writer:

- **F-250:** "Four holes remain: a method's condition on its trait's parameter is not checked at a dotted call (row 748), ...; a trait's or object's own constraint is not checked where its type is used (row 750); ...; and a constraint whose bound names a `where`-clause variable refuses every call (row 749, `XXXWhereVariableBoundCall`)." Three of the four are now built; row 470's stays.
- **F-244:** "A method's constraint on its trait's parameter bounds that parameter inside the method and is not checked at a dotted call (row 748; F-250)" and "The built forms' other departures are rows 749 to 753 and 771."
- **F-251:** "bounded as the binding is": the opened type is now also bounded by the clause's constraints.
- **The skill's revival-changes part:** `.claude/skills/fortress-repo/references/revival-changes.md:189-193` ("Four cases are not built yet") and `:220` ("the checker and walk read the extenders at every type of a bounded variable (ledger rows 753 and 754)").

## 8. Points to report

- **Rows built:** 748, 749, 750, 753 and 771, all five.
- **A declaration of the one library or the compiler's own library refused:** none.
  - The count's table and output are unchanged.
  - After the build, the library order compiled the compiler's five components with exit 0.
  - SumReduction's two `distribute` overloads (`Library/FortressLibrary.fss:3418`, `:3420`): no dotted call in the library has a `SumReduction` receiver. `Library/Generator2.fss:73`, `:79`, `:168` and the rest call `r.distribute(q)` on an `ActualReduction[\R,L2\]`, whose own `distribute[\K\]` (`FortressLibrary.fss:3233`) has no where clause.
- **The count and distance tables before and after:** the same (§6). No site comes or goes.
- **Count runs:** base 75.1 s, change 77.0 s, no pass run.
- **Tests promoted:** `XXXWhereVariableBoundCall` became `WhereVariableBoundCallChecker` (`typecheck`), and `XXXOpenTypeWhereConstraintChecker` became `OpenTypeWhereConstraintChecker` (`typecheck`). None rekeyed.
- **The team test `GenericFnWithExcludes.fss:44`,** `g(O,P)` with `P` a `Y[\2\]`: the compiled checker still refuses it, as the text does, since no `n` meets both constraints; its message now names `nat n` in the arrow. Walk runs it, and the test expects it to run (`:45`).
- **The judge's nested call reproduced (§5):** NEW-K-1.
- **Sentences made false:** §7. The Appendix I clauses edited are `changes.tex:1489-1501`.
- **Edits beyond the five named checker files and declarations:**
  - a sixth checker file, `Formula.scala` (`slv`, `:649-656`);
  - inside `TypeHierarchyChecker`, three declarations beyond the named one: `isEligibleToExtend`, `everyKnownSubtypeListed` and `comprisesContains` (`:386-438`).
  - No library, walk or code-generator edit.

## 9. Decisions

1. **Row 748's check filters the candidates in `getCandidatesForMethod`.** Evidence: the precedent at `Functionals.scala:974-978`; the brief's site. Not taken:
   - a field on `PreAppCandidate` that `checkApplicable` reads. It would print the call's arrow as "not applicable to an argument of type ()", naming no constraint, and it would change a declaration of `STypesUtil` that the brief does not name;
   - lifting the trait's parameter into the dotted method's arrow, as a functional method's is. The method arrives instantiated, and the code generator reads the arrow's static parameters;
   - a check of the chosen candidate only. It would not pass over a candidate for another overload.
2. **A refusal message of its own** when every candidate fails its where clause, instead of the precedent's "No such method ...": the method exists. Not taken:
   - `NoSuchMethod`;
   - an `ApplicationError` built from `NotApplicableError`s, which needs the call's checked arguments, not yet there.
3. **The receiver's argument is read off the instantiated method's self type.** Not taken:
   - the analyzer's ancestors of the receiver, a second search for what the instantiation already did;
   - re-running the instantiation's replacer, which `instantiateMethodApart` (`STypesUtil.scala:1854`) does not keep.
4. **A constraint whose bound names the method's own static parameters or a where-clause variable is not read at a dotted call or at a type's use.** Evidence: P-151 builds the forms the team wrote, and the library's one method condition, `T extends StandardMax[\T\]`, names neither. Not taken: checking such a constraint by inference at the candidate.
5. **The where-clause variables become unlifted static parameters, after the declared ones, made only when the clause has a trait constraint.** A call that writes its static arguments clears these variables along with the declared parameters (row 470's territory). Not taken:
   - lifted parameters, which `inferLiftedStaticParams` infers only for a method (`STypesUtil.scala:1089-1093`);
   - making them for every clause with bindings. A variable named only in a parameter type would then change inference beyond the row.
6. **The size that the type variables leave is solved in `Formula.slv`, once.** Evidence: the quick-loop run of the arrow change alone still printed 'is not applicable to an argument of type (O, P)'. Not taken:
   - stopping row 749 at the solver, with a note;
   - a retry in `inferStaticParamsHelper` (`STypesUtil.scala:1014`), which sees only the solver's failure;
   - iterating to a fixed point, whose termination the team's TODO warns about.
7. **Row 750 goes through the call's type, not the constructor's arrow.** Evidence: `XXXWhereConstraintTypeUseChecker` reports the call at `:14:27-42` as an ill-formed type; `probe/WrapInferred.fss` does the same. Not taken: folding the constructor's where clause into its arrow as well.
8. **Row 753 carries the bound as a conjunct of the solved formula.** Not taken:
   - a check of the solution after solving, which would repeat `comprisesContains` inside `checkDeclComprises`;
   - an opened variable in place of the inference variable. An opened variable equals only itself, so no extender would be listed.
9. **No second-pass edit.** compiler.md, "The checker's time", step 3: where the profile shows no gain, say so. The profile (§6) shows no sample in the code this rung added. The one share above 1 % in its declarations is the bound check that was already there; a memo of it would give about 2 % at most, under the difference between two runs, at the cost of a memo and its audit. Not taken:
   - that memo;
   - one `makeArrowFromFunctional` call per candidate instead of two (0.80 %).
10. **NEW-K-1's home is 3:** a test that asserts today's placement, and a row. The specification says nothing of how often a checker reports one error. Not taken: the row alone.
11. **The promotions ran in both orders, the brief's and tests-writing.md's.** Before the originals were removed:
    - the `XXX` originals ran on the base (green) and on the change (red);
    - their plain-named copies ran on the base (red) and on the change (green).

No decision of the curator covers 1 to 11 beyond P-151 and P-148.

## 10. Defects and their homes

| defect | home | where |
|---|---|---|
| row 748 | 1, repaired | `XXXWhereBoundDottedCallChecker`, `WhereBoundDottedCallChecker` |
| row 749 | 1, repaired | `WhereVariableBoundCallChecker` |
| row 750 | 1, repaired | `XXXWhereConstraintTypeUseChecker`, `XXXWhereConstraintExtendsChecker` |
| row 753 | 1, repaired | `XXXComprisesWhereBoundExtenderChecker`, `ComprisesWhereBoundExtenderChecker` |
| row 771 | 1, repaired | `OpenTypeWhereConstraintChecker`, `XXXComprisesWhereConstraintExtenderChecker` |
| NEW-K-1, the outer of two nested calls is not reported | 3: the specification is silent on placement | `XXXStaticArgBoundNestedCall`, and the row |
| NEW-K-2, walk runs a dotted call that breaks a method's where condition | 2: the specification settles it | `ProjectFortress/tests/XXXWhereBoundDottedCallWalk.fss` and `.test`, and the row |

Walk's run of a `g(O, P)` that no `n` meets is already in row 749's notes ("Walk runs both").

## 11. Commands worked out

- **Quick loop for a Scala file of the checker:**
  - compile: `java -Xss16m -cp "$CP" scala.tools.nsc.Main -nowarn -classpath "$Q/classes:$CP" -d $Q/classes -encoding UTF-8 <file>.scala`;
  - run: `java $JAVA_FLAGS -Dfortress.caches=$Q/caches -cp "$Q/classes:$CP" com.sun.fortress.Shell typecheck <test>.fss`.
  - A trait such as `Functionals` compiles alone: Scala 2.13 puts its bodies in the interface.
- **Inclusive JFR shares by method name:** a single-file program over `jdk.jfr.consumer.RecordingFile`. For each name given, it counts the `jdk.ExecutionSample` events whose stack holds a frame whose `type.method` contains that name.
- **Linting a ledger row without adding it:** `python3 explorations/coordinator/tools/ledger.py check --rows FILE`, with a number in the `#` cell.
