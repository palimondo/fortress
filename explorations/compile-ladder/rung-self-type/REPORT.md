# Rung S, climb batch 14: the checker's self type, read from a trait's F-bound, with its extender check

- problem: the distance's classes S1 and R4, 29 of its 85 sites, the self-typed bodies of the library that return or pass `self` where the trait's parameter is declared: explorations/compile-ladder/climb-batch-13b/gate/distance.txt:16-17
- spec: the type of `self`, "the type of the trait or object being declared", with the self-type idiom under a `comprises` clause after it: Specification/basic/expressions/var-ref.tex:53-54
- precedent: the checker's own self type under a `comprises` clause, which rule (a) reads from the bound instead, at the base ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala:68-69; the judgement's measured patch (explorations/reviews/self-typed-bodies-judgement.md:241-360); for rule (b)'s object expressions, checkObjectExprComprises, at the base ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:70-100
- deviation: the self parameter is also read through a bound naming a self-typed trait that the trait extends at it (the coordinator's default), so the pass now takes the name environment: ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala:139-195, ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java:145
- deviation: the patch's own-name test also accepts the trait's own name written api-qualified: ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala:124
- deviation: the specification names the trait's static parameter a self-type parameter, since "self parameter" already names a method's `self`; the checker's message keeps the brief's "self parameter": Specification/basic/traits.tex:285-286
- historical: ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala, ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java, ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala, Specification/basic/expressions/var-ref.tex, Specification/basic/traits.tex, Specification/appendices/changes.tex:3296

Base `5bf8a7c84`, branch `wip/rung-self-type`, worktree `/home/user/fortress-selftype`, seeded from `/home/user/fortress-base14` (the script exited 0). Commits: `0c257d40f` (the tests), `7612a9477` (the checker), `65148acda` (the specification and the decision record), `20193383e` (a citation in the decision record).

## 1. What changed and why

P-146 decides way 6: in a trait `C[\X\]` with no `comprises` clause whose parameter `X` extends `C[\X\]`, `self` in the method bodies is `C[\X\] & X`; the signatures keep `C[\X\]`; whatever extends such a trait at another type is refused. The coordinator's default, on the review list, adds a second way to be the self parameter: a parameter bounded by a self-typed trait that the trait extends at that parameter (`ContainmentBySubset[\T extends Containment[\T\]\] extends Containment[\T\]`), never an object's.

- Rule (a), `SelfParamDisambiguator.scala`. The judgement's patch, applied with `git apply` on the base with no offset (114 lines, two files), then widened. `selfParam` (`:106-110`) returns the self parameter as a `VarType`, and the trait's self type lists it (`:74-79`), so `TypeAnalyzer.removeSelf` gives `C[\X\] & X` as under `comprises X`. `selfIndex` (`:112-135`): first the patch's test, a type parameter bounded by the trait at its own parameters (`:116-130`); then, with an environment, `throughBound` (`:139-156`): the bound is a trait type that the trait's own `extends` clause lists too (compared by `NodeComparator`, `:175-176`), its trait is resolved as `TypeDisambiguator` resolves a type name (`resolveTrait`, `:178-195`: `apiName` and `hasQualifiedTypeCons` for a qualified name, else `explicitTypeConsNames`, then `onDemandTypeConsNames`, one result, `typeConsIndex`), and that trait's self position holds `X`. The bound's own self position is read from its self type when it was disambiguated already (an analysed api), else from its header by the same two tests, with a set of names visited (`selfIndexOf`, `:158-173`). The companion's `selfParamPosition` (`:237-254`) reads a declaration's self position back from its self type, for rule (b). `Disambiguator.java:145`, `:300` pass the `TopLevelEnv` built just before; with no environment the pass reads the F-bound alone (`:44-45`).
- The confinement, `FunctionalMethod.java`, the judgement's patch unchanged: when the trait's self type was read from the F-bound (no clause, a non-empty self list), the index entry's self type and its self parameter's type are the plain trait type (`:43-61`, `:66-67`, `:88`, `:152-166`); the body's `self` is bound from the declaration's own parameters (`typechecker/impls/Decls.scala:198`) and keeps the intersection.
- Rule (b), `TypeHierarchyChecker.scala`. `checkDeclSelfParams` (`:105-133`), called beside `checkDeclComprises` (`:62`), which it does not touch: for each extended `C[\A\]` whose `C` has a self position `k` (`selfParamArg`, `:170-181`), the declaration's self type (its own type, or `D[\..\] & Y` when it has a self parameter `Y`) must be a subtype of `A_k`, else "D extends C[\A\], whose self parameter is A_k, but D is not a subtype of A_k." `checkObjectExprSelfParams` (`:135-168`, called at `:65`), in the shape of `checkObjectExprComprises`: every object expression, its static parameters in scope, its type the intersection of what it extends, "An object expression extends C[\A\], whose self parameter is A_k, but the object expression is not a subtype of A_k."
- The specification, in the S1 form: rule (a)'s sentence in the self paragraph (`Specification/basic/expressions/var-ref.tex:70-79`, callout `:80-90`); the self-type parameter and rule (b) in "Trait Declarations" with a Not-allowed example (`Specification/basic/traits.tex:285-316`, callout `:317-326`); a callout at the sentence that a functional method's `self` "implicitly has the type of the enclosing trait or object" (`traits.tex:599-603`), which stays true of the signature; the Appendix I entry `revival-self-type` before "Passages not yet revised" (`Specification/appendices/changes.tex:3296-3412`); the decision record (`decision-record.md`). Built: both `ant` targets "BUILD SUCCESSFUL", "Output written on fortress.pdf (673 pages, 2305229 bytes)"; `grep -c "LaTeX Warning: Reference\|multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` prints 0; the outputs removed with `git clean -fXq -- Specification`.

No library line, no walk file and no code-generator file changed.

## 2. The tests: failing on the base, passing after

Nine `.test` files over eight components in `ProjectFortress/compiler_tests/`: `SelfTypeFromBound` (typecheck), `SelfTypeReturnSelfRunLink` and `XXXSelfTypeReturnSelfRun` (row 695's pair over `XXXSelfTypeReturnSelfRun.fss`), `XXXSelfTypeExtenderWrong` (compile), `SelfTypeExtenderThroughOwn` (typecheck), `XXXSelfTypeObjectExprWrong` (typecheck), `SelfTypeMixinBound` (typecheck), `XXXSelfTypeMixinExtenderWrong` (compile), `XXXSelfTypeMixinObject` (compile).

The failing run, on the base's code, before the patch was applied and before the first build (it ended 01:00:13Z; the patch and the build followed the commit of the tests, `0c257d40f`):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests SelfTypeFromBound.test SelfTypeReturnSelfRunLink.test XXXSelfTypeReturnSelfRun.test XXXSelfTypeExtenderWrong.test SelfTypeExtenderThroughOwn.test XXXSelfTypeObjectExprWrong.test SelfTypeMixinBound.test XXXSelfTypeMixinExtenderWrong.test XXXSelfTypeMixinObject.test
    # junit.sh base 2026-10-14T01:00:07Z; ... tree 5bf8a7c84; ...
    . typecheck ProjectFortress/compiler_tests/SelfTypeFromBound ProjectFortress/compiler_tests/SelfTypeFromBound.fss:7:21-23:
        Function body has type Shape[\S\], but declared return type is S.
    3) ProjectFortress/compiler_tests/XXXSelfTypeExtenderWrong(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 9,  Failures: 9,  Errors: 0

The mixin's body on the base: "SelfTypeMixinBound.fss:8:22-24: Function body has type Sub[\T\], but declared return type is T."; the other three `XXX` compile and typecheck tests report "Saw wrong failure", since the base accepts their programs; the link of row 695's component fails on its body, and its run finds no class.

The passing run, after the build and the library order (`EXIT=0`, five jars):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh edit1 ProjectFortress/compiler_tests <the same nine>
    . compile ProjectFortress/compiler_tests/XXXSelfTypeExtenderWrong ProjectFortress/compiler_tests/XXXSelfTypeExtenderWrong.fss:8:20-29:
        Bad extends Shape[\Pt\], whose self parameter is Pt, but Bad is not a subtype of Pt.
    . run ProjectFortress/compiler_tests/XXXSelfTypeReturnSelfRun (1107ms) REACHED
    Caused by: java.lang.VerifyError: Bad return type
    OK (9 tests)

The first `XXX` test shown red on a deliberate fix, `Bad` changed to extend `Shape[\Bad\]` for one run and restored (`git diff --stat` empty after):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh redcheck ProjectFortress/compiler_tests XXXSelfTypeExtenderWrong.test
    1) ProjectFortress/compiler_tests/XXXSelfTypeExtenderWrong(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

The last run after the last change of code is `ant testQuick` (section 4), whose compiler track runs the nine with the rest: "Tests run: 1127, Failures: 0, Errors: 0".

The team's tests whose verdicts the rung keeps, run on the edit (`junit.sh keep`, `keeplib`): `XXX10k` "Saw expected failure" with its six pinned errors; `AfterTypeChecking.test` (`Compiled10.l`, `Compiled10.m` among its typecheck tests), `Compiled17defgh.test` (`run_out_equals=34`), `ComprisesGenericSubtrait.test` (`PASS`) and `XXX10o.test` ("Saw expected failure"): "OK (113 tests)"; `library_tests/EqualityRung1.test` and `MaybeGetter.test`, which drives `MaybeTest9`: "OK (11 tests)". `Compiled17ee` stays undriven and does not compile: "Compiled17ee.fss:21:22: Syntax Error" on the edit (`bin/fortress compile` with a private caches copy) and on the old code (`old-fortress.sh /home/user/fortress-base14 tmp/old-caches compile Compiled17ee.fss`), its parameter named `Self`.

## 3. Where the fix belongs, and the precedent search

- Place. `explorations/coordinator/map/spec-to-implementation.md`, "Chapter 10, Traits; Chapter 11, Objects": the hierarchy checker is the trait rule's home (`TypeHierarchyChecker.scala`); `SelfParamDisambiguator` gives `self` its type, in the disambiguation phase walk shares, before `TypeDisambiguator` qualifies names (`Disambiguator.java:145-154`, `:300-308`; "it needs to occur during disambiguation but before the TypeDisambiguator pass", `SelfParamDisambiguator.scala:30-31`).
- Precedent. The judgement's patch is the measured rule (a) and confinement; the checker's own `comprises` self type is the shape rule (a) reuses; `checkObjectExprComprises` (the revival's, `aa07efb31`) is the shape of rule (b)'s object-expression walk, and `checkDeclComprises`'s loop over `extendsTypes` that of its declaration check. No earlier repair read a self type from a bound, so there are no other sites of the same repair to count. The library's way is kept: its 29 bodies are unchanged (P-27) and no clause enters it (P-43, P-44).
- The ways, listed before each choice, are in section 9.

## 4. Whole suites, the count, the distance, the ladder

Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1; `FORTRESS_THREADS=1` for the stages.

- `ant testQuick` (the edit changes the checker), on `7612a9477`'s code: "BUILD SUCCESSFUL", "Total time: 13 minutes 56 seconds"; `TEST-RESULTS/fast-compiler`: "Tests run: 1127, Failures: 0, Errors: 0, Skipped: 0" (13b's gate 1118, plus the nine); `fast-library`: "Tests run: 86, Failures: 0, Errors: 0"; `fast-othercompiler`: "Tests run: 263, Failures: 0, Errors: 0". No compiled test's verdict changed but by the rung's intent.
- `ant testSystem` (the disambiguator is a phase walk shares), same code: "BUILD SUCCESSFUL", "Total time: 4 minutes 8 seconds"; shards "Tests run: 146", "149", "141", "144", each "Failures: 0, Errors: 0", 13b's counts. No walk verdict moved.
- The count, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-self-type/checker-count-postedit.txt tmp/rung-self-type/cc-post`: "#total 1", "#locations 1", "#crash none"; `diff` against `explorations/compile-ladder/climb-batch-13b/gate/checker-count.txt` prints nothing.
- The distance, `explorations/coordinator/tools/distance/run.sh tmp/rung-self-type/distance-postedit.txt tmp/rung-self-type/dist-post` (nohup, the brief's form), then `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-13b/gate/distance.txt tmp/rung-self-type/distance-postedit.txt`:

      DISTANCE DOWN   85 -> 55 (-30)
          kind typecheck               72 -> 42     (-30)
          class S1                     29 -> 0      (-29)  self type: a generic trait's self is not its type parameter
          class R4                      1 -> 0      (-1)  StandardMinMax's (T,T) slip in bodies (row 421)
          class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
          class OT                     16 -> 17     (+1)  other body errors (one-off library slips and checker limits)
          unit component FortressLibrary     79 -> 49     (-30)

  Its time: "#seconds 1552 FortressLibrary 847" (13b's "#seconds 2246 FortressLibrary 1318"), load at start 2.35 4.26 3.38 (13b's 0.70); no stall, every target done ("### all seconds=1551 rc=0").
- Read by row and line (row 577), the run's `errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv`, matched by location and message (no library line moved, so no mapping is needed):
  - gone, the 29 of the brief, by the per-site list's row: 16, 17 (`:360`, `:363`); 20, 21, 27, 36 (`:226` two, `:231`, `:233`); 22, 23, 24, 25, 26, 34, 37, 38, 39, 60, 74, 75 (`:285` two, `:289`, `:290` three, `:291` three, `:293` three, R4's tuple among them); 31, 54, 55, 56, 57, 58, 59 (`:713`, `:691-693`, `:722-724`); 70, 71, 72, 73 (`:2182`, `:2186`, `:2190`, `:2194`);
  - gone beyond the 29: row 76, `FortressLibrary.fss:130`, "Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\]." (class BR, row 488's site, which has come and gone between landings);
  - respelled, not come: row 78, `FortressLibrary.fss:688`, now "Right-hand side has type (Integral[\I\] & {I}), but declared type is ZZ.", filed under OT, as the brief expected (rung L's site);
  - come: none. The unconfined rule's 21 (18 Return Type Rule errors at `CMP`, `CMP` bodies typed `Comparison` near `:1004`, `:1930`, `:4178`) are absent.
- The ladder subset (`gate.md`, "The ladder regression", its end). No file of the ladder declares a trait bounded by itself (grep over the baseline's 410 files), so no recorded first error names what the rung changed; the subset is the 15 files that declare or extend a bounded generic trait, or whose first error is in the hierarchy check or the disambiguator: `not_working_library_tests/` GenTest4, GenTest5, HelperTest1, HelperTest2, HelperTest3, MaybeTest1, MaybeTest2, MaybeTest5, MaybeTest10; `tests/` XXXextendObject, XXXextendOprParam2, conditionalExtension, spuriousSelf, EqualityOverloadBug, wrapZZ. The drivers copied to `tmp/rung-self-type/ladder/` (`run-subset.sh`, `classify.py`), with two copies of the caches after the library order. None is in the landed `ladder.tsv` (the gate's 85 passes), so each was compared with `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`: all 15 at the same phase with the same first error. No ladder file moved.

## 5. What the specification settles

- The text gave `self` the trait's type, with the clause's intersection under a `comprises` clause (`var-ref.tex:53-54`, `:64-69`), and said nothing of a self type read from a bound or of an extender check. P-146 settles both; the revision states them (section 1), the confinement among them: the `self` parameter keeps `T` in the signatures.
- The 2019 paper has no self types; its assumption that declared types hold no type parameter in an intersection (pp. 11:21-22) and its Return Type Rule over declared domains (p. 11:13) are the confinement's reason (`explorations/reviews/array-judgements-popl-check.md`, section 5), stated in the entry's rationale and in the decision record.
- `Specification/basic/overloading.tex:180-182`, "Note that the static type of the self parameter is the trait or object trait type in which the declaration occurs", stays true under the confinement.

## 6. Old against new

- Under walk, the eight test programs, run from `tmp/rung-self-type/walk/` with the edit (`bin/fortress X.fss`) and with the old code (`old-fortress.sh /home/user/fortress-base14 tmp/old-caches X.fss`): identical, `PASS` for each, `REACHED PASS` for `XXXSelfTypeReturnSelfRun`. Walk runs a body returning `self` as `S` and loads `object Bad extends Shape[\Pt\]`, which rule (b) refuses: walk has no static types.
- `Compiled17ee`, compiled with each: the same syntax error (section 2).
- The checker on the four declarations of the batch record's review, with the stage's driver and shadow classes from the distance run's scratch over other targets, a command this rung worked out (none of these components is among the stage's twelve): `java -Xmx4g -Xss64m -Dfortress.caches=<fresh> -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false -cp <dist-post>/shadow-classes:<dist-post>/classes:<fortress classpath> DistanceMulti -order check -setting any Library/Containment.fss Library/Relation.fss Library/PureList.fss ProjectFortress/demos/trips.fss`, then `Library/Relation.fss` and `Library/PureList.fss` each as the first target, so that their apis print their errors.

## 7. Points to report

1. A site gone beyond the 29: `FortressLibrary.fss:130` (per-site list row 76, class BR), row 488's site, which has come and gone between landings. No site came; `:688` respelled under OT, as the brief expected. Evidence: the comparison and the by-row list (section 4).
2. The distance stage's FortressLibrary time: 847 s against 13b's 1,318 s; the stage 1,552 s against 2,246 s; load at start 2.35 against 0.70; no stall. Evidence: "#seconds 1552 FortressLibrary 847".
3. Rule (b) and the tree. The two declarations the review named are refused, by measurement: the team demo's `object generator(doc:String, max:ZZ32, fun:ZZ32->List[\trip\]) extends StandardTotalOrder[\trip\]` (`ProjectFortress/demos/trips.fss:97-98`): "trips.fss:98:13-38: generator extends StandardTotalOrder[\trip\], whose self parameter is trip, but generator is not a subtype of trip."; `PureList`'s `trait List[\E\] extends { Equality[\E\], ZeroIndexed[\E\] }` (`Library/PureList.fsi:41`): "PureList.fsi:41:27-38: PureList.List[\E\] extends Equality[\E\], whose self parameter is E, but PureList.List[\E\] is not a subtype of E.", beside row 355's "Ill-formed type: Equality[\E\]". The widened reading accepts the mixins and their extenders: `Containment`'s api and component check with no error at any stage, the mixins' bodies included ("@@TC DECL-OK TraitDecl .../Containment.fss:42:1-54:2 errors=0", ":57:1-63:2 errors=0", ":66:1-68:2 errors=0", "@@TC COMPONENT Containment errors=0"); `Relation` passes the hierarchy stages ("@@SC STAGE api Relation acyclic errors=0", "@@SC STAGE component Relation acyclic errors=0"; its other errors are an overloading of `relation` and body errors that no self type enters). By grep, no other declaration in the library, the demos or the test folders extends a self-typed trait at another type. No program the text allows is refused outside self types: the suites are green with 13b's counts plus the rung's nine.
4. The patch changed from the judgement's: `SelfParamDisambiguator.selfParam` takes the `extends` clause and reads through the environment (the coordinator's default), and its own-name test accepts an api-qualified name; `FunctionalMethod.java` is the patch unchanged. Reason: the default needs the bound's declaration, which the measured `selfParam` never read (the brief, "Rule (b) and the tree").
5. A phase walk shares was edited: `SelfParamDisambiguator.scala` and `Disambiguator.java` (disambiguation). No walk test's verdict changed (`ant testSystem`, section 4); walk reads a self type by its named trait alone (`interpreter/evaluator/EvalType.java:51-53`, `:535-537`).
6. Not reached: no compiled test's verdict changed but by intent, no ladder file moved, `XXX10k`'s verdict held, `Compiled17ee` does not compile; no normative text beyond the self paragraph, rule (b)'s passage, their callouts and their entry; the callout at `traits.tex:599-603` is the one the brief asked for.

None of these holds the push: each is reversible, and none acts against a decision on record.

## 8. Sentences of the specification made false

None found. Searched with `grep -rn` for "type of \KWD{self}", "self-type idiom", "self type", "self parameter", "self-typed" and "F-bound" over `Specification/` outside the new text, and `Specification/appendices/changes.tex` for "default bod", "minimal complete" and `self`. The sentences on `self`'s type that stand stay true: `var-ref.tex:53-54` now has its second exception after the idiom's, and `traits.tex:598` and `overloading.tex:180-182` speak of the declaration's signature, which the confinement keeps plain. The Appendix I entry's effect names the departures: walk loads what rule (b) refuses (walk's standing limit, no row), and the compiled run of a body returning `self` fails verification (row 695).

## 9. Decisions, each with the ways not taken

1. The widened reading's form: the bound is a trait type that the trait's own `extends` clause lists too (same trait, same arguments), and that trait's self position holds the parameter. Not taken: any bound naming a self-typed trait at the parameter, whether or not the trait extends it (past the default's words, "that the trait extends at that parameter"); a syntactic test with no reading of the bound's trait (would self-type `trait Foo[\T extends Bar[\T\]\] extends Bar[\T\]` for an unbounded `Bar` and refuse its legitimate extenders); the measured patch alone, P-146's letter (refuses the team's mixins; the default's way back). Evidence: `explorations/coordinator/CLIMB-BATCH-14.md:86`; the probe on `Containment` (section 7, point 3).
2. Resolving the bound's trait: through the `TopLevelEnv`, as `TypeDisambiguator.handleTypeName` resolves a type name (`compiler/disambiguator/TypeDisambiguator.java:343-396`; `TopLevelEnv.java:324`, `:617`), an analysed trait's self position read from its self type and a raw one's from its header, with a visited set. Not taken: moving the pass after `TypeDisambiguator` (the team placed it before, `SelfParamDisambiguator.scala:30-31`, in a phase walk shares); a pre-pass over the unit's own traits only (misses `Containment` when `Relation` is compiled); matching names by text alone (could read another trait of the same name).
3. A clause that lists only `...` is read as no clause for rule (a), as the patch's confinement reads it (`FunctionalMethod.java:48-54`). Not taken: any clause, even one listing nothing, blocks rule (a). Evidence: no trait with an F-bound has `comprises { ... }` (grep over `Library/`, `LibraryBuiltin/` and the test folders), so nothing measured moves either way.
4. Rule (b) reads the extended trait's self position back from its disambiguated self type, through `SelfParamDisambiguator.selfParamPosition`, one reader for the pass and the checker. Not taken: recomputing it from the header in the checker (a second implementation that can disagree); a new AST field (an `astgen` change). Evidence: `TypeHierarchyChecker.scala:170-181`.
5. Rule (b) compares the declaration's disambiguated self type, so a trait with its own self parameter `Y` stands as `D & Y` (rule (b) as the judgement words it). Not taken: the plain declared type, which refuses `trait Lex[\T extends Lex[\T,E\], E\] extends Shape[\T\]` and `Integral[\I\]`'s extension of `StandardTotalOrder[\I\]`. Evidence: `SelfTypeExtenderThroughOwn` green; "@@SC STAGE api FortressLibrary acyclic errors=0" in the probe; no rule (b) error among the distance's sites.
6. Rule (b) for object expressions: a walker of its own, `checkObjectExprSelfParams`, in the shape of `checkObjectExprComprises`, which stays untouched. Not taken: a call inside that walker (edits the precedent); a check in `STypesUtil.getObjectExprType` (no error list and no scope there). Evidence: `TypeHierarchyChecker.scala:135-168`.
7. The confinement kept where the judgement measured it, `FunctionalMethod.java`, unchanged. Not taken: confining in `STypesUtil.makeArrowFromFunctional` or in the overloading oracle (other readers would still see the intersection; unmeasured). Evidence: the distance, no site come, the unconfined rule's 21 absent.
8. The specification's word: "self-type parameter" for the trait's static parameter. Not taken: "self parameter", which the text uses for a method's `self` (`overloading.tex:167-182`, `traits.tex:577`, `:591`, `:631`, `:644`, `preliminaries/overview.tex:1140-1146`). The checker's message keeps the brief's wording, "whose self parameter is A"; the Appendix I entry quotes the message.
9. The tests' commands: `SelfTypeFromBound` typecheck only, since the compiled run of a body returning `self` dies (row 695); `XXXSelfTypeObjectExprWrong` typecheck, since the code generator has no case for an object expression (`map/spec-to-implementation.md`, "object expressions", "no `forObjectExpr`"); row 695's pair with `run_out_contains=REACHED` and a program that asserts the value and then prints `PASS`, ready for its promotion. Not taken: compile tests for these, red for a reason that is not the defect.
10. The ladder subset: the literal criterion matches no file, so the subset is the 15 files above, compared with the baseline's `ladder.tsv`. Not taken: an empty subset; the whole ladder (the gate's).
11. The extenders that rule (b) refuses are recorded and left, as the brief says: the demo's object as a new row (row 710), `PureList` as a note on row 355. Not taken: editing the demo or `PureList`, not this rung's files.

## 10. Defects, with their homes

- The 29 self-typed bodies the checker refused: home 1, repaired; `SelfTypeFromBound`, `SelfTypeMixinBound`, `SelfTypeExtenderThroughOwn` assert the rule, the distance stage the 29 sites.
- Unsound extenders the checker accepted (an object, an object expression, a mixin's extender at another type, a generic object at its own parameter): home 1, repaired; `XXXSelfTypeExtenderWrong`, `XXXSelfTypeObjectExprWrong`, `XXXSelfTypeMixinExtenderWrong`, `XXXSelfTypeMixinObject` (must-fail tests, green now).
- Row 695, a compiled default body returning `self` that fails verification at class load: home 2, deferred, the program is valid by the specification; `SelfTypeReturnSelfRunLink.test` and `XXXSelfTypeReturnSelfRun.test`, with a note on the row.
- The trips demo's `generator`, refused by rule (b): home 3, a ledger row only (row 710): no gated test reads the demo under the checker, and walk cannot observe it; the reproducer is the demo, the probe in the notes.
- `PureList`'s `List`, refused by rule (b): row 355's home, a note on that row.

## 11. For FACTS

See record.md: the compiled checker reads a self-typed trait's `self` as the implementing type, from its F-bound, keeps the signatures plain, and refuses an extender at another type.

## 12. Questions for the curator

The coordinator's default, already on the review list (`explorations/coordinator/CLIMB-BATCH-14.md:86`), built and measured here (section 7, point 3). No other.
