<!-- Climb batch 36, rung K (rung-checker-most-specific): the compiled checker chooses among a call's declarations by their signatures as declared, in an order of place that no hash decides, and refuses a tie that the rules leave; the code generator casts self where the call takes a listed type's declaration. Worker's report. -->

# Rung K: the checker chooses among a call's declarations by their signatures as declared

- problem: climb batch 35's gate tie of `QQ`'s and `Ratio`'s `denominator` at a call on `self`, kept by the JVM's identity hashes (`explorations/compile-ladder/climb-batch-35/REPAIR-gate.md:41-51`), and the planner's count of 66 ties in the one library and 1,598 in the compiles of `compiler_tests/` (`explorations/compile-ladder/plan-36/probes/fixes-36.md:42-57`)
- spec: `Specification/basic/overloading.tex:353-372`, with `Specification/basic/expressions/var-ref.tex:53-69`
- precedent: the plain reading of a self type from the F-bound in `FunctionalMethod.parameters()` (`ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java:153-166` at b5a758846d); `CoercionOracle.moreSpecificDeclared` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:85-88`); F-377's `castToTypeBelow` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:8255` at b5a758846d)
- deviation: a tie that the rules leave is refused at the call except where the overloading check judges its declarations, all of the unit being checked or equivalent by their declared domains (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1170-1204`), which fork K3 does not name
- deviation: a dotted method's declared signature is read from its original method with its trait's static parameters, which the overloading node's schema lacks (`Functionals.scala:970-976`)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `Specification/basic/expressions/var-ref.tex`, `Specification/appendices/changes.tex` (each in the 2012 tree, `git cat-file -e a874948ac:<path>`)

One launch of this role worked the rung. Commits on `wip/rung-checker-most-specific`: `a6a9149594` (the tests), `8f5f1912ab` (the code and the turned tests), and the commit of the specification and this folder.

## What changed and why

1. **The signature (fork K1).** `FunctionalMethod.parameters()` (`FunctionalMethod.java:153-168`) reads a functional method's `self` parameter at its plain trait type wherever its declared type is a `TraitSelfType` that lists types: a trait whose `comprises` clause lists types, the prelude's `comprises T` spelling, and the self type from the F-bound as before. It copies the parameter list only where it changes a parameter. The bodies keep the meet: they are checked from the declaration's own AST (`ast()`), and the overloading check's exclusion test reads the own parameters through `selfTyped` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:556-577`), which now finds them different from `parameters()` in a `comprises` trait too. So `Ratio`'s `denominator(self)` is strictly more specific than `QQ`'s, and the instance comparison of the partial order decides the self ties with no special case: in the logged census below no self tie reaches the tie at all.
2. **The order (fork K4).** `candidatesOf` (`Functionals.scala:931-946`) takes each attempt's candidates in the order of their declarations' places, file then line then column. A candidate's place is its index entry's span, or, for a function's overloading, which has none, the span of the overloading's unambiguous name, which the declaration's span makes (`NodeFactory.java:468-472`). `PartialOrder` keeps the input order where neither candidate precedes, so the sort's head, the head of P-60's tie and the call the code generator writes from it are the program's in every run.
3. **The tie (forks K2, K3, K5).** In `resolved` (`Functionals.scala:1153-1206`), where `top` holds two or more:
   - one declaration met twice, by its span, counts once (`sameDeclaration`, `distinct`): `Library/List.fss:96-97`, whose candidates are `List.fss:130` or `:131` twice;
   - the one that `moreSpecificDeclared` puts strictly above every other on its declared arrow decides (`above`, `decided`). The declared arrow (`declaredOf`, `:958-976`) is the overloading's schema, with no static argument inferred; for a dotted method, its original method's arrow with the trait's static parameters lifted, since the schema leaves them free and the comparison crashed, 'T is not in the kind env', on `TraitOwnMethodBesideInheritedCompiled` in the first cut; and `self` at its trait wherever a `TraitSelfType` lists types (`atTrait`), as a dotted method's receiver has it in the index. This decides the generic pairs on their declared domains (P-45) and a dotted method beside its redeclaration below;
   - a tie with a coercion keeps the numeral rule and the coercion ambiguity as before;
   - P-60's tie keeps the first in the order of place and is typed by the intersection (`tieType`, `:977-1001`) where the tied declarations have no static parameters and no declaration with static parameters that is more specific than one of them, by its declared domain, may run at the call, no argument's type excluding its parameter type (`mayRun`). The whole family was read before (`groundFamily`), so row 543's `choose[\X\](b: Box[\X\])`, which cannot take an `M`, kept the call from the intersection;
   - a tie among arrows that no declaration gives (an intersection type's arrows, `ArrowClauseBindRungG.fss:36`, `:42`) keeps the first, as before;
   - a tie among declarations all of the unit being checked, or whose declared domains are equivalent (`duplicates`), keeps the first and is left to the overloading check, whose refusal is the one reported (deviation, below);
   - any other tie is a static error, 'Ambiguous call to function f: of the declarations applicable to an argument of type T, none is more specific than every other: ...', `signalAmbiguity`'s form without "coercion" (`:1302-1330`).
   `traitOfSelf`, `takesSelfAtTrait` and the branch of `head` that read them, the gate repair's case (`b7b5b0c02b`), are gone. The call's type is the decider's return type where one decides.
4. **The cast (fork K6).** `CodeGen.castToTypeBelow` (`CodeGen.java:8255-8260`) reads a declared `TraitSelfType` that lists no types, the chosen declaration's `self` parameter, as its named type, so the one-argument call `twin(self)` in `trait Q comprises { R }`, which now takes `R`'s declaration, passes `self` cast to `R`. Every caller of the method gets it; only an arrow's domain holds such a type.
5. **The expected failures that the change turns** (section "The tests").

## The tests

The order, as the skill's `tests-writing.md` gives it: the tests written, then run through the harness on the base's code by `old-fortress.sh` and the base build, with their expected failures echoed, at 02:00:42 UTC, before the first build of the edit (02:03); then the fix; then the pass. The calls' lines:

```
Expected failure: GenericTiesDeclaredCompiled's run fails its assertion, 'FAIL: <n> =/= 12; each direct call on a Box runs the declaration on Box, the more specific by its declared parameter types', n below 12 and varying from JVM to JVM
Expected failure: ComprisesSelfListedTypeCompiled's compile fails, 'Function body has type Q, but declared return type is R.'
Expected failure: ComprisesFunctionalMethodNarrowedReturn's compile fails, '... should be a subtype of the return type of R->R'
Expected failure: CoverageReturnGenericFamily's compile fails, '... but declared type is RightResult' (or LeftResult)
Expected pass: ComprisesSelfAbstractFunctionalMethodCall passes on the base in the default hash mode
```

`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-wsuite <worktree>/tmp/.../old-caches junit <the five .test files>`:

```
. run .../compiler_tests/GenericTiesDeclaredCompiled (426ms) FAIL:  2 =/= 12; each direct call on a Box runs the declaration on Box, the more specific by its declared parameter types
    Function body has type Q, but declared return type is R.
the return type of (Q & {R})->Q @ .../ComprisesFunctionalMethodNarrowedReturn.fss:6:5-7:1 should be a subtype of the
    Right-hand side has type RightResult, but declared type is LeftResult.
F. run .../compiler_tests/ComprisesSelfAbstractFunctionalMethodCall (233ms) PASS
Tests run: 15,  Failures: 10,  Errors: 0
```

The first number of `GenericTiesDeclaredCompiled`'s failure varies by JVM (5 and 6 in the planner's runs, 2 here); each failed as echoed.

- `compiler_tests/GenericTiesDeclaredCompiled` (new, from the planner's `P36GenericTiesDeclaredCompiled`): twelve pairs `fK[\T\](x: T)` beside `fK[\U\](x: Box[\U\])`, the sum of the direct calls on a `Box` asserted 12. Rows 935 and 499's direct call.
- `compiler_tests/ComprisesSelfListedTypeCompiled` (new, from `P36ComprisesSelfListedTypeCompiled`): `getter next(): R = twin(self)` in `trait Q comprises { R }`, `twin(self): R` in `R`; `q.next.n` asserted 2. Rows 1112 and 1100, and the cast.
- `compiler_tests/ComprisesFunctionalMethodNarrowedReturn`, promoted from `XXXComprisesFunctionalMethodNarrowedReturn` (`git mv`, its component renamed, its `.test` now `compile`, `link`, `run`, `run_out_contains=PASS`). Row 1127.
- `compiler_tests/CoverageReturnGenericFamily`, promoted from `XXXCoverageReturnGenericFamily`, the same way, its two bindings `left` and `right` both accepted. Row 543.
- `compiler_tests/OverloadGenericObjectTwoParams` (new): row 1046's program made twelve pairs `keepK[\T\](x: T): T` beside `keepK[\U, V\](x: Duo[\U, V\])`, since the planner's one pair passed on the base through the harness, 'OK (3 tests)' (its run at 02:23:38), the tie falling the right way in that JVM. The twelve pairs on the base:

```
Expected failure: OverloadGenericObjectTwoParams's compile crashes the checker on the base, 'V is not in the kind env' (or 'U is not in the kind env'), at the first of its twelve pairs whose tie keeps the generic declaration on T, and its link and run fail with it
. compile .../compiler_tests/OverloadGenericObjectTwoParams .../OverloadGenericObjectTwoParams.fss:5:8-12:
V is not in the kind env [][][]
Tests run: 3,  Failures: 2,  Errors: 0
```

  (`old-fortress.sh ... junit .../OverloadGenericObjectTwoParams.test`, 02:24:02; its run step 'PASS' read the one-pair jar that the earlier call had left in the private caches.)
- `compiler_tests/XXXComprisesDottedMethodNarrowedReturn` (new, an expected failure, row 1094's form for a `comprises` trait): `g(): Q` in `trait Q comprises { R }` beside `g(): R` in `object R`. Shown as the skill's "Writing an `XXX` test" asks, on the edit, through `junit.sh`: as it is, 'Saw expected failure', 'OK (1 test)'; with `R`'s `g` at `Q` and its assertion replaced for one run, 'Saw wrong failure. compile', 'Tests run: 1,  Failures: 1'; then restored.

The pass, the last run after the last change of code, `ant testQuick` on `8f5f1912ab` with the comments of `Functionals.scala` as committed:

```
    [junit]  run ProjectFortress/compiler_tests/GenericTiesDeclaredCompiled (822ms) Passed
    [junit]  run ProjectFortress/compiler_tests/ComprisesSelfListedTypeCompiled (777ms) Passed
    [junit]  run ProjectFortress/compiler_tests/ComprisesFunctionalMethodNarrowedReturn (550ms) Passed
    [junit]  run ProjectFortress/compiler_tests/CoverageReturnGenericFamily (554ms) Passed
    [junit]  run ProjectFortress/compiler_tests/OverloadGenericObjectTwoParams (876ms) Passed
    [junit]  run ProjectFortress/compiler_tests/ComprisesSelfAbstractFunctionalMethodCall (642ms) Passed
    [junit]  compile ProjectFortress/compiler_tests/XXXComprisesDottedMethodNarrowedReturn  Saw expected failure
```

### The expected failures that the change turns, and what was done with each

- `XXXComprisesFunctionalMethodNarrowedReturn` (row 1127) and `XXXCoverageReturnGenericFamily` (row 543): promoted, above.
- `XXXNumeralEqualsRR32Compiled` (row 528), fork K8: `c = 0` for `c: RR32` under the prelude is now refused, 'Ambiguous coercion in call to operator =: of the declarations applicable to an argument of type (RR32, NaturalNumeral[\1,10,0\]) only by coercion, none is more specific than every other: (RR64, RR64)->Boolean; (CompilerAlgebra.Equality[...', since `Equality[\RR32\]`'s `self` reads at the trait. The plain link test `NumeralEqualsRR32CompiledLink.test` is deleted and `XXXNumeralEqualsRR32Compiled.test` is now `compile` with `compile_err_contains=Ambiguous coercion in call to operator =`; the program is unchanged. The library's pair for row 528, `library_tests/RR32EqualityRungVLink` and `XXXRR32EqualityRungV`, is unchanged and stays green: `a = a`, `a = b` and `a = 1.5` compile and the run overflows the stack, 'Saw expected failure (Exit code != 0)', 'OK (2 tests)' (`junit.sh rr32 ProjectFortress/library_tests RR32EqualityRungVLink.test XXXRR32EqualityRungV.test`).
- `XXXApiFunctionalMethodOfComprisedObject` (row 770): no longer refused by the overloading check, and not passing: the export check, which runs after it, refuses the api, 'Unmatched declarations: { (TraitDecl Q ..., due to different method num @ ...fsi:4:3-5:1, ..., Asbtract method num @ ...fss:6:3-7:1 is not declared in the API) }'. The same refusal on the base for the plain form, `trait Q` and `object R extends Q`, each with `num(self): ZZ32`, in an api and its component (`old-fortress.sh ... compile ApiFmPlain.fss`), so it is the export check's, not this change's; on the base the overloading check stopped row 770's program first. The `.test` key is now `compile_err_contains=due to different method num`; row 770 is rewritten, not closed.
- `XXXSelfTypedMethodNarrowedReturn` (row 1094, fork K7): unchanged, 'Saw expected failure'.
- Row 1046's program (fork K7): it compiles and runs after, 'PASS', where the base crashed alone, 'V is not in the kind env [][][]': the same edit repairs it, so it becomes the run test above and row 1046 closes.

## Where the fix belongs, and the precedent

`explorations/coordinator/map/modules-and-phases.md`, B.6 and B.7: the checker's call resolution is `Functionals.scala`'s, which `typedApplicationOfChecked` holds for functions, operators and dotted methods alike; the signature is the index's (`compiler/index/`), which overloading, the Return Type Rule and call resolution read; the call's descriptor is the code generator's, from the chosen arrow. The precedents in their files:

- the plain reading of a self type in a signature: one site, `FunctionalMethod.parameters()`, which the change widens; `OverloadingChecker.selfTyped` (one site) gives the exclusion test the meet from the own parameters wherever they differ, so it needed no edit;
- the declared comparison: `CoercionOracle.moreSpecificDeclared`, called at two sites of `Functionals.scala` before (`numeralAttempt` and the generic candidates with coercion in `moreSpecificCandidate`); the tie is the third;
- the gate repair's case for the self tie: one site, removed;
- F-377's cast of `self`: `castToTypeBelow`, with seven callers in `CodeGen.java` (`:3382`, `:4080`, `:4233`, `:4676`, `:4686`, `:5830`, `:8239`); the change is inside the method, and only the two argument callers (`:5830`, `:8239`) can pass a declared `TraitSelfType`.

The ways the language and the record offer, and the choice: in the decisions below.

## What the specification settles

A declaration is more specific when its declared parameter types, a dotted method's receiver among them, are strict subtypes of the other's; declarations with static parameters on their declared domains, no static argument inferred (`Specification/basic/overloading.tex:353-372`; P-45). The type of `self` is the type of the trait being declared (`var-ref.tex:53-54`); the Working Draft's sentence on a `comprises` clause names no place (`var-ref.tex:64-69`), and fork K1 reads it for the bodies and the exclusion test, as P-146 reads the self-typed traits. A redeclaration below at the same parameter types hides the inherited one (`Specification/basic/traits.tex:584-590`). P-60's tie is typed by the intersection within the boundary of `Specification/appendices/changes.tex:3745-3749`. The text says nothing of the order of a call's candidates; any order is the implementation's.

The specification is changed in the revision form (`decision-record.md` beside this file):

- `Specification/basic/expressions/var-ref.tex:64-84`: the `comprises` sentence gives the meet "in the bodies of its methods", and goes on "the \KWD{self} parameter keeps the type `\EXP{T}' in the signature of each method declaration, which overloading and the choice of a declaration at a call read, save the test of whether two overloaded declarations' parameter types exclude each other, which reads it as that intersection", with the box `\revision{revival-self-comprises}`.
- `Specification/appendices/changes.tex:4509-4578`: the new entry `revival-self-comprises`.
- `Specification/appendices/changes.tex:3750-3753`: row 543's clause out (section "Sentences of the specification").

The specification builds: `( cd Specification/fortress && ./ant genSource && ./ant tex )`, each 'BUILD SUCCESSFUL', and the count of reference, label and undefined-control-sequence warnings in `Specification/fortress/fortress.log` is 0; the build's files were removed after (`git clean -fXq -- Specification`).

## Programs run old against new

Each on the base through `old-fortress.sh` and on the edit through the tree's `bin/fortress`:

| program | base | edit |
|---|---|---|
| the five tests of the first call | 'Tests run: 15,  Failures: 10' (above) | pass (above) |
| `OverloadGenericObjectTwoParams` (twelve pairs) | 'V is not in the kind env [][][]' | 'PASS' |
| row 1046's probe `rung-return-rule-object/probes/XXXOverloadGenericObjectTwoParams.fss`, compiled alone | 'V is not in the kind env [][][]', exit 255 | compiles, run 'PASS' |
| `ComprisesDottedNarrowed.fss` (scratch: `g(): Q` in `trait Q comprises { R }`, `g(): R` in `R`, `r.g().n` printed) | 'Q has no getter called n' | 'the return type of (Q & {R})->Q ... should be a subtype of the return type of R->R' |
| the same without the read of `n` | the same refusal as the edit's | as the base |
| `ApiFmPlain.fss` (scratch: row 770's api without `comprises`) | 'due to different method num', 'Asbtract method num ... is not declared in the API' | not run |

## The ties

A copy of `Functionals.scala` that logs each tie of `top` (two or more) and the branch that takes it, compiled into a scratch folder and put first on the class path (`compiler.md`, "Testing an edit here"), never in the tree. Each run is a probe:

- **The one library**, the distance stage's java line with the copy first (`DistanceMulti -order check`, the fourteen components, one JVM), on the final code: 24 ties, every one decided: 22 by the declared signature (the dotted method `I->E->T` and `E->T` of `Library/FortressLibrary.fss:2559-2560` beside their redeclarations at `:2576`, `:2580` and `:2673`, called at `:2668` to `:3471`; and `Library/RangeInternals.fss:539`, `:570`), and 2 by one declaration met twice (`Library/List.fss:96`, `:97`). None is left; the 42 self ties of the planner's count do not arise.
- **The prelude**, its five compiles into an empty private caches folder, on the final code: no tie.
- **The compiled suite**, `fortress junit compiler_tests/*.test` in one JVM, on the final code: 'OK (1783 tests)', and 104 ties, against the planner's 1,598 on the base:
  - 44 decided by the declared signature: the generic pairs (`GenericTiesDeclaredCompiled.fss:35`, twelve; `OverloadGenericObjectTwoParams`, twelve; `OverloadReturnObjectDomain.fss:22`, `:26`, `:28`; `OverloadGenericBesidePlain.fss:13`, `:17`; `OverloadBoundNamesForced.fss:13`, `:15`; `InferO2Z64.fss:18`; and the expected failures `XXXGenericPositionalBox.fss:16`, `XXXOverloadTwoGenericBare.fss:15`, `XXXOverloadReturnTupleDomain.fss:11`, `XXXOverloadReturnObjectDomainOtherType.fss:12`, `XXXOverloadGenericObjectDomainByPosition.fss:11`, `XXXOverloadExistentialMeet.fss:18`, `XXXGenericBoundsMeet.fss:18`, which stay green), and a dotted method beside its redeclaration below (`TraitOwnMethodBesideInheritedCompiled.fss`, four; `XXXComprisesDottedMethodNarrowedReturn.fss:15`, whose refusal is the overloading check's);
  - 41 P-60 coverage ties, typed by the intersection (`CoverageReturn*.fss`, `ComprisesBetweenTwoClosed.fss:19`, `:20`, `CoverageReturnGenericFamily.fss:27`, `:28` among them);
  - 5 ties with a coercion, which the numeral rule or 'Ambiguous coercion' takes as before (`Compiled5.bu.fss:19`, `NumeralTieDefaultCompiled.fss:15`, `XXXInferAmbiguousCoercion.fss:24`, `XXXInferSigmaTie.fss:24`, `XXXNumeralEqualsRR32Compiled.fss:8`);
  - 2 among an intersection type's arrows, the first kept (`ArrowClauseBindRungG.fss:36`, `:42`);
  - 9 among declarations of the unit that its overloading check refuses, the first kept and the check's refusal reported (`DottedMethodMeetBothBodies.fss:15`, `GenericBoundsNoMeet.fss:16`, `XXXGenericPairFreeArgument.fss:15`, `NoDuplicatesRule.fss:12`, `XXXNoDuplicatesRuleAbstract.fss:13`, `XXXNoDuplicatesRuleSelfPositions.fss:13`, `XXXNoDuplicatesRuleSelfPositionsOperator.fss:13`, `XXXNoDuplicatesRuleSelfPositionsPlain.fss:13`, `XXXOverrideOverStaticParameterCompiled.fss:14`);
  - 3 among duplicates through an import or an alias, kept, their refusals as before (`Compiled7.e.fss:18`, the team's `XXX7e.test`; `XXXImportExceptOperator.fss:10`; `XXXImportExplicitHidesOnDemand.fss:9`). The log names these three 'ERROR', since its own copy of the branch test has no case for duplicates; the checker's `duplicates` keeps them, and each test is green in the run.

  An earlier census, on the code before the dotted declared arrow and the deferral of duplicates (section "Decisions", 3 and 4), gave 'Tests run: 1779,  Failures: 6': these three tests 'Saw wrong failure', the call's error masking their pinned refusals, and `TraitOwnMethodBesideInheritedCompiled` a crash of the dotted comparison, 'T is not in the kind env', its compile and link and run.

What the checker now says at each tie that the rules leave: at P-60's, the intersection, as before; at an intersection type's arrows, the first arrow, as before; at a set that the overloading check refuses, that check's refusal, as before; elsewhere 'Ambiguous call ...', which no program of the library, the prelude or the compiled suite reaches.

## The two stages, and the checker's time

Both on `8f5f1912ab`, the final code, after its build (`ant compileAll`, 'BUILD SUCCESSFUL', at 02:25); no code changed after either started.

- **The count stage** (`explorations/coordinator/tools/checker-count/run.sh tmp/.../checker-count-postedit.txt tmp/.../cc-post`, timed): 'FortressLibrary	0', '#total	0', '#locations	0', '#crash	none'. `diff explorations/compile-ladder/climb-batch-35b/gate/checker-count.txt` against it prints nothing.
- **The distance stage** (`explorations/coordinator/tools/distance/run.sh tmp/.../distance-postedit.txt tmp/.../dist-post`): '#total	0', '#crash	none', '#seconds	108	FortressLibrary 67'. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-35b/gate/distance.txt tmp/.../distance-postedit.txt` prints 'DISTANCE SAME   0'. `dist-post/errors.tsv` holds its header only, as `explorations/compile-ladder/gate/distance-sites.tsv` does: no site moved.

**The checker's time** (`compiler.md`, "The checker's time"; P-148). Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.30GHz, 2300 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, each run under `nice -n 19`:

| run | tree | load at start | real | user |
|---|---|---|---|---|
| base | `/home/user/fortress-wsuite` (4b0e3abd6a, the base's code) | 0.28 | 65.7 s | 108.7 s |
| change | `8f5f1912ab` | 2.40 | 68.6 s | 107.8 s |

The two tables are equal (`diff` prints nothing), and the two `run.txt` files are equal after each tree's path is replaced by `TREE` (`diff` prints nothing, 33 lines each). The second pass: a JFR profile of the count stage's checker on the change (`-XX:StartFlightRecording=settings=profile`, `WorldFlip -stop check Library/FortressLibrary.fss`), 5,298 execution samples. The members that the change adds or widens are in 8: `place` (inside `candidatesOf`) 3, `atTrait` 1, `FunctionalMethod.parameters` 4; `declaredOf`, `mayRun`, `duplicates`, `sameDeclaration` and `tieType` in none. The top frames are the checker's walk of the tree, not the change: `Walker.walkCases7$` 7.63 %, `ASTGenHelper$.scalaify` 4.25 %, `Walker.walkCases4` 4.08 %, `Walker.walkCases5` 3.72 %, `Walker.walkCases0` 3.32 %, `BoxesRunTime.equals2` 3.10 %. No gain to take, so the pass changed no code and `change`'s results stand for `pass`'s.

## Whole suites

On `8f5f1912ab`, once:

- `ant testQuick`: 'Tests run: 1823, Failures: 0' (compiler), 'Tests run: 86, Failures: 0' (library), 'Tests run: 263, Failures: 0' (othercompiler); 'BUILD SUCCESSFUL', 'Total time: 11 minutes 58 seconds'.
- `ant testOneLibrary`: 'Tests run: 41, Failures: 0'; 'BUILD SUCCESSFUL', 'Total time: 3 minutes 3 seconds'. Its `OneLibraryRunHello` runs the one library's `QQ`, whose calls on `self` of `numerator` and `denominator` now take `Ratio`'s declarations, cast.

## The interpreter's suite on the compiled path

`tmp/.../suite-list.tsv`: the 63 programs of `ProjectFortress/tests/` that `explorations/compile-ladder/gate/suite-compiled.tsv` does not hold, that did not pass under both libraries in `explorations/compile-ladder/suite-compiled-2026-11-24/programs.tsv`, and that the change can reach (a `comprises` clause with a functional method on `self`, or two generic declarations of one name), each on two lines. `explorations/coordinator/tools/suite-compiled/run.sh tmp/.../suite-list.tsv - tmp/.../suite tmp/.../suite-out`: 126 verdicts, 126 'FAIL' (`suite-out/verdicts.tsv`), each refused or failing as before by its reason, as 'refused at compile, not as its .test names: load_exception_contains=...' for the programs whose walk test is a refusal at load. No program joins the gate's list.

## Sentences of the specification

Made false by the change, before and after:

- `Specification/appendices/changes.tex:3750-3753` (`revival-meet`, Effect), edited: before, "The compiled type checker departs from this in three ways: it types such a call by the intersection only in a family none of whose declarations has static parameters, and otherwise by one of its most specific declarations (row~543 of the revival's gap ledger); it refuses ... (row~546); and ... (row~547)."; after, "The compiled type checker departs from this in two ways: it refuses the case for declarations with static parameters (row~546 of the revival's gap ledger); and its verdict ... (row~547)."
- `Specification/basic/expressions/var-ref.tex:64-69`, edited: before, the type of `self` in a trait with a `comprises` clause "is instead" the intersection; after, the intersection "in the bodies of its methods", the signatures at the trait (above).
- `Specification/appendices/changes.tex:5538-5546` (the numeral entry, `revival-numerals`, Effect), not edited, for the gather: "so for \EXP{c\COLON\mathbb{R}32 = 0} the compiled type checker refuses \EXP{c \neq 0}, and \EXP{c = 0} compiles and overflows the stack when it runs (rows~1059 and~528 of the revival's gap ledger; ..., and the expected failure \nolinkurl{XXXNumeralEqualsRR32Compiled.fss}, which asserts \VAR{true})". After the change `c = 0` is refused statically, 'Ambiguous coercion in call to operator =', since `Equality`'s `=` and `RR64`'s are unordered. That sentence stands in rung N's entry, outside its listed sentences (`changes.tex:5202-5205`, `:5255-5257`, `:5437-5439`).

The rows that the rung closes, `grep -rn '~<row>' Specification --include=*.tex` for each: `~1100`, `~935`, `~1112`, `~1127` and `~1046` print nothing; `~543` printed `Specification/appendices/changes.tex:3752` on the base, the clause taken out, and prints nothing after. For the rows rewritten: `~770` and `~499` print nothing; `~528` prints `changes.tex:5543`, the sentence above, which the change makes false; `~1094` prints `changes.tex:4465` (`revival-self-type`, Effect: the dotted check reads the self-typed trait's receiver as the meet), still true, and `:4564`, the new entry's departure, true.

## Points to report

1. The readings as built, by file and member: `FunctionalMethod.parameters()` (`FunctionalMethod.java:153-168`); `Functionals.scala`, `typedApplicationOfChecked`: `declarationSpan`, `place`, `candidatesOf` (`:931-946`), `atTrait`, `declaredOf`, `schemaOf`, `mayRun`, `tieType`, `callType` (`:958-1006`), `resolved`'s `sameDeclaration`, `distinct`, `above`, `decided`, `unitFile`, `ofThisUnit`, `duplicates`, `head` (`:1153-1206`), `signalAmbiguity` (`:1302-1330`); `CodeGen.castToTypeBelow` (`CodeGen.java:8255-8260`). The gate repair's case, `traitOfSelf`, `takesSelfAtTrait` and their branch of `head`, removed (`git show 8f5f1912ab -- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`).
2. Each test, failing on the base in the JVM's default hash mode and passing after, and the expected failures that the change turns: section "The tests".
3. Every tie that the rules leave in the one library, the compiled suite and the prelude, and what the checker now says at it: section "The ties". The one library and the prelude have none; the compiled suite's are the sets that their overloading checks refuse and the duplicates, which keep their refusals.
4. The two stages' tables on the final tree against the comparand, and the checker's timing: section "The two stages".
5. Each sentence of the specification that the change makes false: section "Sentences of the specification"; one of them, `changes.tex:5538-5546`, left for the gather.
6. A file edited beyond those named: `Specification/appendices/changes.tex:4509-4578`, the new entry `revival-self-comprises`, which the revision form that the section asks for at `var-ref.tex` needs; it sits between `revival-self-type` and "The index type of a subscript", away from the lines that rungs G, N and C edit, and moves their later lines by 70. The tests' files beyond those the section names: `NumeralEqualsRR32CompiledLink.test` deleted and `XXXApiFunctionalMethodOfComprisedObject.test`'s key, rows 528's and 770's tests; `OverloadGenericObjectTwoParams` (row 1046, fork K7) and `XXXComprisesDottedMethodNarrowedReturn` (row 1094's form), new. No team test's checked value or pinned message changed; no line of the libraries is refused (the count and the distance are 0); no model line changed.

None holds the push: each is reversible, and none acts against a decision on record.

## Decisions

1. **The signature at the trait in `FunctionalMethod.parameters()` (fork K1).** Ways not taken: the meet kept in the signature with the tie decided for the type below, which hides the trait's (`traits.tex:584-590`); the meet kept with the gate repair's case. Evidence: the probe's distance 0 with the change, and the count and distance 0 here; the tests above.
2. **The order by place in `candidatesOf`, inside the checker (fork K4).** Ways not taken: the disambiguator's list sorted (`ExprDisambiguator.scala:431`, `:482`), a phase that both paths run, which K4 leaves out; the index's entries given a hash of their content, which F-232 leaves to identity. Sorting in `candidatesOf` orders every attempt, the kept attempt's `callType` included, not only the tie.
3. **The static error at a tie, with the overloading check's sets left to it (fork K3).** Ways not taken: the error at every tie that the rules leave, measured: it masked the overloading check's refusal in `XXX7e.test`, the team's, and in two more expected failures, all three 'Saw wrong failure' (section "The ties"), and in the nine sets that the unit's own check refuses, whose pinned messages are the overloading check's; and no error, the head kept, which leaves a call that no check refuses to an arbitrary, if now stable, declaration. The ties so kept are in programs that the checker refuses anyway, and `StaticChecker` reports only the errors of the first stage that finds any (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:269-279`), so the call's error would replace the more exact refusal. Changing `StaticChecker` to report both would break the count stage's shadow copy, a tool this rung does not edit. No decision on record covers the exception; the curator's question is below.
4. **The dotted method's declared arrow from its original method, with the trait's static parameters lifted (fork K2's declared reading).** Way not taken: the overloading node's schema, which leaves the trait's parameters free: 'T is not in the kind env' at `TraitOwnMethodBesideInheritedCompiled`'s dotted calls in the first cut (`fortress compile -debug stacktrace`, `CoercionOracle.moreSpecificDeclared` from `Functionals.scala`'s `above`); a catch of the crash, which hides it.
5. **P-60's boundary over the tied declarations and the generic declarations more specific than one of them that the call may run (fork K5),** "may run" read as no argument's static type excluding the declaration's parameter type at its position, its static parameters in scope. Ways not taken: the whole family, as before; the tied declarations only, which would type by the intersection a call whose run may reach a generic declaration below.
6. **The cast inside `castToTypeBelow` (fork K6).** Ways not taken: a cast in `evalArg` before the call, which every caller of the method then needs; the trait's arrow kept at the call, the gate repair's way.
7. **Row 528 (fork K8):** the link test deleted and the expected failure moved to the compile; the program unchanged. Way not taken: a declaration of `=` in the prelude's `RR32` (P-37).
8. **Row 770:** the test kept as an expected failure with the export check's message, the row rewritten. Ways not taken: the export check repaired here, outside the rung's files; a new row for the export check, where row 770's program and reproducer already show it.
9. **Row 1046 closed with a new run test (fork K7, "unless the same edit does").** Its program as twelve pairs, since one pair passed on the base in the harness's JVM. Way not taken: the row left open with its probe.
10. **Row 1100 closed with `ComprisesSelfListedTypeCompiled`**, which fails on the base and needs both the signature and the cast; the brief names `GenericTiesDeclaredCompiled` as rows 935's and 1100's test in the default hash mode, and it closes row 935. Way not taken: 1100 closed by `GenericTiesDeclaredCompiled`, which has no `comprises` trait.
11. **The dotted form of row 1094 in a `comprises` trait recorded, not repaired (fork K7):** an expected failure, `XXXComprisesDottedMethodNarrowedReturn`, and row 1094 rewritten to hold both forms, the new text naming it as the departure. Way not taken: a new row, where the mechanism and the site are row 1094's.

## Defects and their homes

- The tie that `self`'s type makes, and the uncast `self` at the listed type's declaration (row 1100): home 1, `ComprisesSelfListedTypeCompiled`.
- The order of a call's candidates by the JVM's hashes (row 935): home 1, `GenericTiesDeclaredCompiled`.
- The trait's return type at a call on `self` (row 1112): home 1, `ComprisesSelfListedTypeCompiled`.
- An object's narrower return type refused (row 1127): home 1, `ComprisesFunctionalMethodNarrowedReturn`.
- A coverage tie typed by its first candidate in a family with a generic declaration (row 543): home 1, `CoverageReturnGenericFamily`.
- The crash at a tie of a generic declaration beside one on an object with two static parameters (row 1046): home 1, `OverloadGenericObjectTwoParams`.
- The direct call of row 499's pair by the compiling JVM: home 1, `GenericTiesDeclaredCompiled`; the dispatcher's half stays row 499's, home 2, `XXXGenericPositionalBox`.
- The export check's refusal of an api whose trait and an object below both declare a functional method of one name (row 770, rewritten): home 2, `XXXApiFunctionalMethodOfComprisedObject`, since the specification lets an api declare both (`basic/traits.tex`, "Method Declarations").
- `c = 0` at `RR32` under the prelude, now an ambiguity (row 528, rewritten): home 2, `XXXNumeralEqualsRR32Compiled`.
- The dotted method's receiver read as the meet in a `comprises` trait (row 1094, rewritten): home 2, `XXXComprisesDottedMethodNarrowedReturn`, since the new text keeps the trait's type in each signature.

## Commands worked out

- The tie census: `python3 tmp/.../instr/make-instr.py` writes a copy of `Functionals.scala` with a logging block before `head`; `java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d <scratch>/classes -encoding UTF-8 <copy>`; then the run with `-Dfortress.tielog=<file>` and `<scratch>/classes` first on the class path: `fortress junit compiler_tests/*.test` for the suite, the distance stage's `DistanceMulti` java line (`explorations/coordinator/tools/distance/run.sh:126-128`) with the stage's own `shadow-classes` and `classes` for the library, and `Shell compile` of the five prelude components into an empty caches folder.
- The profile: the count stage's java line (`explorations/coordinator/tools/checker-count/run.sh:95-97`) with `-XX:StartFlightRecording=filename=<f>.jfr,settings=profile`; `jfr view hot-methods <f>.jfr`; `jfr print --events jdk.ExecutionSample --stack-depth 64` for the samples in a member.

## For the curator

- Fork K3's exception: a tie among declarations of the unit being checked, or among duplicates, is left to the overloading check, so that its refusal, which the gated tests pin (the team's `XXX7e.test` by `compile_err_equals`), stays the one reported. Is that the reading of "a tie that the rules leave is a static error", or should the call's ambiguity be reported there too, with the pinned messages changed? Evidence: `Functionals.scala:1170-1204`; the measured masking in section "The ties"; `StaticChecker.java:269-279`.
- Row 770: the export check's refusal of an api whose trait and an object below both declare a functional method, with or without a `comprises` clause (`ExportChecker.scala:791-800`, `:829-850`), is untraced, and no rung holds it.
- Row 1094 now holds the dotted form in a `comprises` trait too; the new text of `var-ref.tex:70-74` keeps the trait's type "in the signature of each method declaration", which the overloading check departs from for a dotted method in both kinds of trait.
