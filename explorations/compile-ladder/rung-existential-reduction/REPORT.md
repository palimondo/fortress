# Rung P (rung-existential-reduction): exclusion read over the whole parameter type, on both paths

- problem: walk refused row 740's pair at load and the compiled checker refused it and row 741's `copyOf`, measured by the P-152 probe, with ledger rows 740 and 741, `explorations/perf-probes/existential-reduction/REPORT.md:5-18`
- spec: instantiation exclusion and a declaration with static parameters read over its instances, a plain one "the case with none"; the passage that states the reading, `Specification/advanced/overloading.tex:582-592`, is outside basic, `Specification/basic/types-vals-vars.tex:235-242`, `Specification/basic/overloading.tex:100-108`
- precedent: the probe's `walk.patch` and `checker.patch`; in walk, `oneInstance`'s union-find of instances of one generic type among two types and their supertypes; in the checker, `replaceTypeParametersWithInferenceVariables`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1364-1373`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:346`
- deviation: the whole body of `domainsExcludeTogether` inside its `try`, `OverloadedFunction.java:945`; `emptyED` through the file's own helper, its comment without "our paper", `TypeSchemaAnalyzer.scala:435-446`; the tests add a pair that excludes through a supertype and a second call of `copyOf`, `ProjectFortress/tests/GenericPairExcludesTogetherWalk.fss:23-27`; the specification's words add "or their elements at one position" to the brief's, `Specification/advanced/overloading.tex:585-586`
- historical: `OverloadedFunction.java`, `OverloadingOracle.scala`, `TypeSchemaAnalyzer.scala`, `Specification/advanced/overloading.tex` and `Specification/appendices/changes.tex`, `ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:326`

## 1. What changed and why

P-152 decides that exclusion between two declarations with static parameters is read over the whole parameter type, on both paths, as the type group's paper of 2011 decides it by existential reduction. The probe built both halves and measured them; this rung lands them.

- **Walk** (`OverloadedFunction.java`): a new `domainsExcludeTogether(o1, o2)` (`:920-1030`) reads two declared domains whole. At each position, every pair of instances of one generic type among the two parameter types and their supertypes is matched into one union-find over the static parameters (`matchApart`); the domains exclude where two such instances cannot be equal (`argsMayBeEqual`), where a class of the union-find holds two types that cannot be equal (`mayBeEqual`), or where, at the meet `meetParams` makes, the parameter types at some position exclude. It is asked in the Meet branch of `genericPairValid` (`:912`) and of `validOnDeclaredDomains`'s generic-beside-plain reading (`:794`), after the Meet Rule's search. `meetParams` (`:1175`) takes one more parameter, a list that receives g's static arguments, `null` at `genericMeetCovered`'s call (`:1136`). Where clauses, varargs and parameter lists of different lengths are not read, and any exception answers "not shown", so the method only turns a "fails the Meet Rule" into a load.
- **The checker**: `OverloadingOracle.excludes` (`OverloadingOracle.scala:322-327`) is `sa.subtypeED(md, BOTTOM) || sa.emptyED(md)`; the new `TypeSchemaAnalyzer.emptyED` (`TypeSchemaAnalyzer.scala:435-446`) is `reduceED`'s first premise alone: the existential's body, its static parameters read as inference variables, has a constraint of being other than Bottom that is False. `reduceED` is untouched; the bounds are not read. Since `excludes` runs only after both orders, the functional-method rule and the Meet Rule have failed (`typechecker/OverloadingChecker.scala:577-586`), the change can only turn an "Invalid overloading" into a valid pair.
- **`ownGeneric`'s comment** (`OverloadedFunction.java:2401-2410`) is the text of `explorations/compile-ladder/climb-batch-17/JUDGE-review.md`, section 4, checked against the code: `ownGeneric` is true of `FGenericFunction` and `GenericConstructor` and of `GenericFunctionalMethod.Own`, a functional method with static parameters of its own in a trait or object without (`interpreter/evaluator/types/FTraitOrObjectOrGeneric.java:119-122`), false of `GenericFunctionalMethod`, made for a generic trait or object (`:102`), and of `GenericMethod`, a dotted method, which `preferredDeclaration` compares on its declared domain where exactly one of two lies inside the other (`OverloadedFunction.java:2329-2335`, `methodDeclaredBelow` `:2349-2372`).
- **The specification**: `advanced/overloading.tex:582-606`, the existential reduction reads instantiation exclusion where the two parameter types, or their elements at one position, are or extend instances of one parameterized trait, with a revision box; Appendix I's "Overloading with static parameters" has the revision in its Change, Rationale and Original text, and its Effect states what each path now does and names row 759 (section 8).

Commits on `wip/rung-existential-reduction`: `3f5d813eb` (the tests, before the fix), `a93fb3bfd` (the code), `ff576359e` (the specification and `record.md`).

## 2. The tests, their failing and passing runs

The tests come from the patches, written into the tree before any build of the edit: `git mv` of `tests/XXXGenericPairExcludesTogetherWalk.fss` to `GenericPairExcludesTogetherWalk.fss` (row 740's pair and its two assertions, with the patch's renamed, size, `pairOf` and `plainOf` pairs, and my `viaR` pair, which excludes through a supertype), new `tests/GenericPairFreeArgumentWalk.fss` and `.test` (`load_exception_contains=fails the Meet Rule`, the guard), `git mv` of `compiler_tests/XXXGenericPairSharedSupertypeExclusion.{fss,test}` to `GenericPairSharedSupertypeExclusion` (compile, link, run, `run_out_contains=PASS`, with my second call, `copyOf(ThawedZ)`), new `compiler_tests/GenericPairExcludesTogether.{fss,test}` (compile, link, run) and `compiler_tests/XXXGenericPairFreeArgument.{fss,test}` (`compile_err_contains=Invalid overloading of o in component XXXGenericPairFreeArgument`, the guard). The patches' test files were checked equal to mine before my additions (`git apply --check -R --include='ProjectFortress/*tests/*'` of each patch).

The failing runs, on the base's code (the seeded build), 00:48:03 to 00:48:41 UTC, before the edit was first built (00:53):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-existential-reduction/h-walk-base \
        ProjectFortress/tests/GenericPairExcludesTogetherWalk.fss ProjectFortress/tests/GenericPairFreeArgumentWalk.fss ProjectFortress/tests/GenericPairFreeArgumentWalk.test
    Overloading of o[\T\](x:Q[\T\],b:Box[\T\]):FortressLibrary.String... and o[\T\](x:P[\T\],b:Box[\T\]):FortressLibrary.String...
    F. interpret tmp/rung-existential-reduction/h-walk-base/tests/GenericPairFreeArgumentWalk
     OK Saw expected refusal at load
    Tests run: 2,  Failures: 1,  Errors: 0

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests \
        GenericPairSharedSupertypeExclusion.test GenericPairExcludesTogether.test XXXGenericPairFreeArgument.test
        Invalid overloading of copyOf in component GenericPairSharedSupertypeExclusion:
        Invalid overloading of o in component GenericPairExcludesTogether:      (and of r, viaR, pairOf and plainOf)
     Saw expected failure
    Tests run: 7,  Failures: 6,  Errors: 0

The passing runs, after the last change of code (`a93fb3bfd`, built, with the library order):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-existential-reduction/h-walk-new \
        <the same three files> ProjectFortress/tests/GenericPairExcludingWalk.fss
    OK (3 tests)

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh new ProjectFortress/compiler_tests <the same three .test files>
    . run ProjectFortress/compiler_tests/GenericPairSharedSupertypeExclusion (786ms) PASS
    . run ProjectFortress/compiler_tests/GenericPairExcludesTogether (821ms) PASS
    OK (7 tests)

**The first `XXX` test, red when the defect does not show.** `XXXGenericPairFreeArgument` with its second declaration changed for one run to `o[\T\](x: Q[\T\], b: Box[\T\])`, then restored (`git diff` empty):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh red ProjectFortress/compiler_tests XXXGenericPairFreeArgument.test
     Saw failure, but did not satisfy compile_err_contains; expected
    1) ProjectFortress/compiler_tests/XXXGenericPairFreeArgument(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

## 3. Where the fix belongs, and the precedent

- The map: overloading's checker classes are `overloading/OverloadingOracle.scala` and `typechecker/OverloadingChecker.scala`, walk's is `values/OverloadedFunction.java` (`explorations/coordinator/map/spec-to-implementation.md:214`); walk's check at load and the checker are separate code, so each path has its own half (`map/modules-and-phases.md`, B.7). No phase both paths run, no library and no code generator is touched.
- The library holds no site: the distance has no overloading error before or after (section 6), and walk loads every library component on the base.
- Precedent in the file, walk: two other sites read instances of one generic type into a union-find over static parameters, `genericMeetCovered` position by position (`OverloadedFunction.java:1133`) and `oneInstance` over a type and its supertypes at one position (`:1364-1373`); neither reads across positions. The new method follows `oneInstance`'s loop and `genericMeetCovered`'s use of `Apart` and `meetParams`. The checker: one exclusion test (`OverloadingOracle.scala:326`, `BOTTOM`'s only use in the file); two sites in `TypeSchemaAnalyzer.scala` turn static parameters into inference variables, `replaceTypeParametersWithInferenceVariables` (`:346`, called nowhere before, `:130` names it in a comment) and `reduceED` (`:366-380`); `emptyED` calls the first.
- Ways the code offers, for the checker: (a) `emptyED` beside `subtypeED` in `excludes` (taken); (b) `reduceED` or `normalizeED` returning Bottom for an empty existential, which would reach `lteq`, `equiv`, `isMeet` and the Return Type Rule's arrow, unmeasured (the probe's decision 2); (c) reading the bounds into the False test, which no measured pair needs and which would move `tint` (P-152's fork, kept). For walk: (a) a whole-domain reading beside the Meet search, in both Meet branches (taken); (b) only between two generic declarations, which leaves `h[\T\](R[\T\], R[\T\])` beside `h(V, M)` loaded by the checker and refused by walk (the probe's decision 1); (c) widening `genericMeetCovered`'s match across positions, which changes the Meet Rule's search of row 539, not this rung's.

## 4. What the specification settles

The revised text reads two parameter types with static parameters by existential reduction, "each static parameter stands for any type within its bound", with instantiation exclusion (`advanced/overloading.tex:582-592` at 612869b4a); instantiation exclusion is `basic/types-vals-vars.tex:235-242`; a plain declaration "is the case with none" (`basic/overloading.tex:108`). The paper reads every pair of the two types' ancestors (`Papers/Types/fig-exclusion.tick:136-147`) and tuples element by element (`:55-57`), and reads an intersection of excluding types as having "the same extent as \Bottom" (`Papers/Types/exc-reduction.tick:7-21`). The text's "mention one parameterized trait" was narrower than the paper: `copyOf`'s two parameter types exclude only through `Readable`, which neither mentions. The text does not settle `tint`: Bottom is within both bounds (`advanced/overloading.tex:584`) and "cannot be written in a program" (`basic/types-vals-vars.tex:106-107`); P-152's fork keeps it as it is on both paths, with a row (row 786).

## 5. Old against new, both paths

Each program under walk, then compiled (compile, and run where it compiled): old with `/home/user/fortress-base19/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base19 <tree>/tmp/old-caches`, new with this tree's `bin/fortress`. The first twelve are the probe's programs, copied; the last four are mine. Every run asserts its calls.

| shape | walk old | walk new | checker old | checker new |
|---|---|---|---|---|
| row 740, `o[\T\](P[\T\], Box[\T\])` beside `o[\T\](Q[\T\], Box[\T\])` | fails the Meet Rule | PASS | Invalid overloading of o | PASS |
| the same, renamed | fails the Meet Rule | PASS | Invalid overloading of o | PASS |
| row 741, `copyOf` | PASS | PASS | Invalid overloading of copyOf | PASS |
| `tint` | PASS | PASS | Invalid overloading of tint | Invalid overloading of tint |
| through a supertype, `R[\T\]` beside `SubR[\U\]` | fails the Meet Rule | PASS | Invalid overloading of o | PASS |
| no forcing, `R[\T\]` beside `S[\U\]` | fails the Meet Rule | fails the Meet Rule | Invalid overloading of o | Invalid overloading of o |
| free argument | fails the Meet Rule | fails the Meet Rule | Invalid overloading of o | Invalid overloading of o |
| sizes | fails the Meet Rule | PASS | PASS | PASS |
| two forced types, generic | fails the Meet Rule | PASS | Invalid overloading of h2 | PASS |
| the same beside a plain declaration | fails the Meet Rule | PASS | Invalid overloading of h | PASS |
| a bound against a ground argument, plain and generic | PASS | PASS | PASS | PASS |
| microGPT's old pair, `mul` over `Array` beside `Vector` and `Matrix` (walk only) | fails the Meet Rule | PASS | | |
| mine: a bound against a ground argument through a supertype, `g[\T extends Red\](x: SubR[\T\])` beside `g(x: R[\Blue\])` | fails the Meet Rule | PASS | PASS | PASS |
| mine: row 759, `g[\T\](a: T)` beside `g(a: Any)` | fails because their parameter lists have the same types | the same | runs, prints `generic` | the same |
| mine: `g[\T extends Fruit\](a: T)` beside `g(a: Fruit)` | the same as above | the same | There are multiple declarations of g with the same parameter type | the same |
| mine: `g[\T extends Object\](a: T)` beside `g(a: Object)` | the same as above | the same | There are multiple declarations of g with the same parameter type: T | the same |

The commands, from `tmp/rung-existential-reduction/shapes/` (scratch): `./run-shapes.sh new /home/user/fortress-existential/bin/fortress` and `./run-shapes.sh old <old-fortress.sh> /home/user/fortress-base19 /home/user/fortress-existential/tmp/old-caches`, then `./summarize.sh out-new` and `out-old`; for example:

    CTint           walk: PASS        rc=0   | compile: Invalid overloading of tint      rc=255 | run: -
    CBoundSup       walk: PASS        rc=0   | compile: ok                                rc=0   | run: PASS rc=0
    C759            walk: fails because their parameter lists have the same types rc=1 | compile: ok rc=0 | run: generic rc=0

Every shape of the probe's table gives the probe's verdict on both paths, old and new. The paths agree on every shape but `tint`. Walk now also agrees with the checker on the bound through a supertype, which walk refused before. Row 759 holds on the head. The checker refuses the pair at an explicit `Object` bound, which suggests the cause of row 759: the compiled path reads an unbounded `T` as bounded by `Object` (row 412), and that puts `g[\T\](a: T)` strictly inside `g(a: Any)`.

## 6. Suites and stages

On `a93fb3bfd`, built, one run each, nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, beside rung S's runs:

    ant testQuick     Tests run: 1276 / 86 / 263, Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 9 minutes 10 seconds
    ant testSystem    Tests run: 162 / 160 / 171 / 164 (657), Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 4 minutes 39 seconds
    ant testSpecData  Tests run: 130, Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 52 seconds

The landed gate ran 1,270 compiler-track and 656 system tests (`explorations/compile-ladder/climb-batch-18/gate/summary.txt`). The six more compiled cases are the promotion's link and run, the new test's three and the guard's one. The one more system test is `GenericPairFreeArgumentWalk`. No test's verdict moved beyond the promotions and the new tests.

**The count.** The after is the change's timed run, `explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/change.txt $W/tmp/count/change`, since no code changed after it. Against the landed table:

    diff tmp/count/change.txt explorations/compile-ladder/climb-batch-18/gate/checker-count.txt    (prints nothing)
    #total 30   #locations 29   #crash none

**The distance**, `explorations/coordinator/tools/distance/run.sh tmp/rung-existential-reduction/distance-postedit.txt tmp/rung-existential-reduction/dist-post`, 134 s:

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-18/gate/distance.txt tmp/rung-existential-reduction/distance-postedit.txt
    DISTANCE SAME   34
    diff explorations/compile-ladder/gate/distance-sites.tsv tmp/rung-existential-reduction/dist-post/errors.tsv    (prints nothing)

No site moved: the 35 rows of the per-site list (with its header) are equal by row; the two tables differ only in their `#seconds` and `#machine` lines.

**The ladder subset.** I took the 27 files of the baseline's `ladder.tsv` whose names hold "verload". No recorded first error, in the baseline or in the landed `ladder.tsv`, names an overloading refusal, so I took the overloading tests instead. The drivers are copied under `tmp/rung-existential-reduction/ladder/` as `gate.md`, "The ladder regression", gives them. I compared the ten files the gate runs with the landed `explorations/compile-ladder/climb-batch-18/gate/ladder/ladder.tsv`, and the rest with the baseline's `ladder.tsv`. 25 are the same. Two moved against the baseline of 2026-09-19:
- `OverloadBuiltinParam.fss`: its first error is now "Cannot infer type for function +[\T extends Number, nat n, nat m\]...", where the baseline has "Not yet implemented".
- `overloadTest6.fss`: it now reaches codegen, "Can't compile VarArgs yet", where the baseline stopped at typecheck.

Each gives the same first error on the base's code (`old-fortress.sh ... compile`), so neither move is this change's.

## 7. The checker's time (P-148)

The same command, `time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N`, in one session, each in the background:

| run | tree | seconds | load at start | table |
|---|---|---|---|---|
| base | `/home/user/fortress-base19` (612869b4a) | 67.8 | 0.71 | the landed one |
| change | this tree, `a93fb3bfd` | 75.4 | 3.27 | equal to base's |
| pass | none: the pass made no edit (below) | | | |

The results are the same: `diff tmp/count/base.txt tmp/count/change.txt` prints nothing, and the two `run.txt` files are equal (`diff` prints nothing) once each tree's path is replaced by `TREE`. Rung S's suites ran beside the change's run. The difference is within that load, and no slowdown of several times shows.

**The profile.** One JFR run of the count stage on the change, from a copy of `run.sh` with `-XX:StartFlightRecording=...,settings=profile`; its table equals the change's. It took 4,852 execution samples:
- `emptyED` has none.
- `OverloadingOracle.excludes` is in 620 (12.8%), all inside `meetED` and `subtypeED`, the team's code that ran before the change.
- The top frames by self time (`jfr view hot-methods`): `Walker.walkCases7$` 5.77%, `BoxesRunTime.equals2` 4.14%, `Statics.anyHash` 3.54%, `Walker.walkCases4` 3.03%, `List.prependedAll` 2.97%, `Walker.walkCases5` 2.80%, `Walker.walkCases2` 2.47%, `Walker.walkCases6` 2.45%.

**An instrumented copy.** A copy of `OverloadingOracle.scala`, compiled into scratch ahead of the build and never in the tree, counted the exclusion test on the library and computed `emptyED` on every call:
- 691 calls, with `subtypeED` true on all 691, so the tree's `||` never reaches `emptyED` on the library.
- `emptyED` is true on 287 of them, and never where `subtypeED` is false.
- `subtypeED` took 3.8 s and `emptyED` 1.6 s over the 691 calls, among which are 483 distinct arrow pairs.

The tables of both instrumented runs equal the change's.

**The pass.** The added code shows no sample and is never reached on the library, so the profile shows no gain in it. I did not take:
- `emptyED` before `subtypeED`: by the audit's times it costs as much as now, 1.6 s plus 404 calls of `subtypeED` against 3.8 s.
- A memo of `excludes` on the arrow pair: it would save at most the 208 repeated calls, about 1 s of 75, within the noise, and it is a reuse of the kind the count stage turns off (`-Dfortress.analyzer.overload.cache=false`).

With no edit, the pass's code state is the change's. A pass count and a second `ant testQuick` would repeat the change's runs, so I ran neither (`SKILL.md`, "Reuse each result").

## 8. Sentences made false

Edited, in the revision form:
- `Specification/advanced/overloading.tex:584-586` at 612869b4a: "where the two parameter types mention one parameterized trait, instantiation exclusion (\secref{trait-types}) lets them meet only where the static arguments of those mentions are the same". It now reads "where the two parameter types, or their elements at one position, are or extend instances of one parameterized trait, ... of those instances", with a `\revision{revival-overloading}` box (`:594-606`).
- `Specification/appendices/changes.tex:2844-2850` at 612869b4a: "The compiled type checker and the interpreter both refuse two declarations with static parameters whose parameter types exclude only together ... (row~740), and the compiled type checker refuses two pairs ... one whose parameter types exclude through the one instance of a supertype they share and one whose static parameters' bounds exclude each other (row~741)". It now states what each path does, `tint`'s departure and row 786 (`:2864-2879`).
- `Specification/appendices/changes.tex:2826-2830`, the No Duplicates sentence, claims that the checker refuses every pair whose parameter types are each a subtype of the other. It is now followed by its departure, row 759 (`:2844-2850`).
- The entry's Change (`:2721-2724`), Rationale (`:2800-2808`) and Original text (`:2932-2937`) state the revision.

Made false, not edited (for the gather):
- `Specification/appendices/future.tex:280-284`, the internal document's box: "instantiation exclusion lets two parameter types that mention one parameterized trait meet only where its static arguments are the same". It is narrower than the revised passage, as the passage was.
- FACTS F-238, "A pair that excludes only through a static argument that another position fixes is refused (row 740).", and its test `XXXGenericPairExcludesTogetherWalk`; F-252, "a pair whose parameter types exclude only together is refused (row 740)", and the same test.
- POSITIONS P-45, "and rows 740 and 741 wait on P-152"; P-152, "Still to build: the reading on both paths, after the probe for its algorithm (PLAN phase 3, item 17)."
- The skill's `references/revival-changes.md:58` (row 740's bullet), `:61` (its `copyOf` half; the `tint` half stays, now row 786) and `:56` ("In seven cases": six stay).

Checked and still true:
- `advanced/overloading.tex`'s box on the interpreter's reading "where no pair of their parameter types excludes each other" (`:640-643`).
- The Effect's sentence on row 539.
- The preamble's paragraph (`Specification/fortress/preamble.tex:52-63`).
- `Specification/appendices/changes.tex:4035-4040` at 612869b4a ("Passages not yet revised"), on bounds that rule out the forced static argument, since `emptyED` reads no bounds. On my bound-through-a-supertype program (section 5) the checker, on base and head, excludes through an ancestor. That passage's "not where it would reason through the ancestors" cites the `CAP` shape of functional methods in generic traits (`explorations/coordinator/PLAN-history.md:512`), which I did not run.

The specification builds: `cd Specification/fortress && ./ant genSource && ./ant tex`, both `BUILD SUCCESSFUL`. The skill's `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log` prints 42, and each of the 42 is the traced definition text "x@warning {Reference `#1' on page \thepage \space undefined}}{}". `grep -c "LaTeX Warning: Reference\|^! Undefined control sequence\|LaTeX Warning: Label .* multiply defined"` prints 0. The PDF shows the revised passage, its box and the Change. The build's ignored files were removed (`git clean -fXq -- Specification`).

## 9. Points to report

- **The patches, taken with changes.** Both applied as they are (`git apply`), then:
  - The whole body of `domainsExcludeTogether` sits inside its `try` (`OverloadedFunction.java:945`), so that an exception anywhere answers "not shown", as the brief says. In the patch the first loop and `Apart.of` were outside it, and an exception there reached `genericPairValid`'s catch, `NOT_READ`, and changed the refusal's message.
  - `emptyED` goes through `replaceTypeParametersWithInferenceVariables` (`TypeSchemaAnalyzer.scala:444-446`). That is the same computation, since a meet's `where` clause is empty: `meetED` builds the meet with `insertStaticParams` on a cleared intersection (`:242-243`), and `clearStaticParams` drops the `where` (`useful/STypesUtil.scala:461`). Its comment no longer says the team's "our paper".
  - The tests' `viaR` pair and second `copyOf` call (section 2).
- **Shapes of the probe's table given otherwise**: none, on either path (section 5).
- **Each count run's seconds**: base 67.8 s, change 75.4 s, no pass run. The profile shows no sample in `emptyED`, and the instrumented copy shows it is never reached on the library (section 7).
- **A verdict changed beyond the promotions and new tests**: none in the suites, the specification's examples or the ladder subset (section 6). Outside the tests, walk now loads my bound-through-a-supertype program, which the checker accepted before and after.
- **`tint`**: walk loads it (`GenericPairExcludingWalk`, `PASS` in the passing run, section 2). The checker refuses it, 'Invalid overloading of tint in component CTint: [\T extends Blue\]Box[\T\]->String ... and [\T extends Red\]Box[\T\]->String' (`bin/fortress compile CTint.fss`, the probe's program). It is row 786, CONTESTED, in `record.md`.
- **Team lines changed**:
  - In the checker's exclusion test, `OverloadingOracle.scala:326`: `sa.subtypeED(md, BOTTOM)` (David Chase, 2012-07-19) becomes `sa.subtypeED(md, BOTTOM) || sa.emptyED(md)`.
  - `TypeSchemaAnalyzer.scala:434`: a blank line of two spaces made empty (the patch's).
  - In walk's load check only revival lines change (`git blame` at 612869b4a): the two Meet branches (`:794`, `:912`, 5262a2412 and 9879d4386) and the comments above them, `meetParams`'s signature and its `geG.putType` loop (9879d4386), `genericMeetCovered`'s call, and `ownGeneric`'s comment (8f7e183d4).
- **Sentences made false, and the specification's sentences edited**: section 8.
- **Files beyond those named; library, desugaring or code-generator edits**: none.

## 10. Decisions

1. **The patches' code taken, with two changes** (section 9's first point). Not taken:
   - the patch as it is, whose first loop could escape the `try` (the brief: "any exception answers 'not shown'");
   - a copy of `reduceED`'s setup lines in `emptyED`, when the file has a helper that computes the same (`TypeSchemaAnalyzer.scala:346`).
2. **The tests extended**: a pair that excludes through a supertype in both new tests, and a call of each declaration in the promoted compiled test. Not taken: the patches' tests alone. They leave the probe's own supertype shape of the whole parameter type without a gated test, and dispatch to `copyOf`'s `Thawed` arm unasserted on the compiled path.
3. **The specification's words**: "where the two parameter types, or their elements at one position, are or extend instances of one parameterized trait". Not taken:
   - The brief's "where the two parameter types are or extend instances of one parameterized trait" alone. A parameter type is the declaration's whole parameter, a tuple where there are several (`basic/overloading.tex:139-140`, "a functional has a single parameter, which may be a tuple"), and a tuple is no trait's instance. Those words alone would leave row 740's own pair, which the old "mention" covered, outside the sentence.
   - The old "mention", which is narrower than the paper's ancestors.

   The paper reads tuples element by element (`fig-exclusion.tick:55-57`).
4. **No speed pass** (section 7). Not taken: `emptyED` first; a memo of `excludes`.
5. **No pass count and no second `testQuick`**: the code state after the pass is the change's. Not taken: running them again, a repeat of the same code state.
6. **The count's after is the change's timed run**, `tmp/count/change.txt`, on the final code. Not taken: a second run into `tmp/rung-existential-reduction/checker-count-postedit.txt`, a repeat.
7. **`tint` kept on both paths, with row 786 CONTESTED** (P-152's fork, the probe's question 1 default). Its class is `design limit (checker)`, since the checker's reduction cannot show the merged bound empty; which path moves is open.
8. **The ladder subset**: the 27 overloading tests. Not taken: an empty subset. The rule "each file whose recorded first error names something the change touched" gives none, since no recorded first error is an overloading refusal.
9. **`future.tex:280-284` left to the gather**: the brief names the files I edit, and the gather corrects what my section does not have me edit.

## 11. Defects and their homes

- **Row 740** (walk and the checker): home 1, repaired; `tests/GenericPairExcludesTogetherWalk` and `compiler_tests/GenericPairExcludesTogether`.
- **Row 741** (the checker, `copyOf`): home 1, repaired; `compiler_tests/GenericPairSharedSupertypeExclusion`.
- **`tint`**, row 786: home 3, because the paths disagree and no decision settles which is right (P-152 keeps both). `tests/GenericPairExcludingWalk` asserts walk's half, and the row's notes give the checker's command and output.
- **Row 759** (the checker accepts `g[\T\](a: T)` beside `g(a: Any)`): not repaired, since it is not this rung's code. Appendix I now names it, and its note gives the `Object` bound's measurement (`record.md`).
- No other defect measured. Not measured: a pair with a `where` clause, which `domainsExcludeTogether` does not read (its comment and section 1).

## 12. For FACTS

The entry is in `record.md`, "FACTS.md": walk and the compiled checker read exclusion over the whole parameter type, with its tests, and the entries it makes false.

## 13. Commands

- The probe's programs on both paths, old and new: `tmp/rung-existential-reduction/shapes/run-shapes.sh <label> <fortress command...>`, a copy of the probe's `run-all.sh` with four more programs, and `summarize.sh <out-dir>`, which prints one line per program.
- The JFR profile of the count stage: a copy of `run.sh` whose `java` line adds `-XX:FlightRecorderOptions:stackdepth=2048 -XX:StartFlightRecording=filename=$JFR_OUT,settings=profile,dumponexit=true`; then `jfr view hot-methods <file>` and `jfr print --events jdk.ExecutionSample --stack-depth 2048 <file> | grep -c <method>`.
- The instrumented checker on the count stage: the copy of `OverloadingOracle.scala` compiled with `java -cp "$CP" scala.tools.nsc.Main -nowarn -classpath "$CP" -d <dir> -encoding UTF-8 <file>`, with its `Unit` written `scala.Unit` because `compiler.index.Unit` shadows it, and a copy of `run.sh` whose `-cp` starts with `<dir>`.

## 14. Questions for the curator

- `tint` (row 786), the probe's question 1, is still open. Walk loads two declarations whose type parameters' bounds exclude, and the checker refuses them. Bottom is within both bounds (`advanced/overloading.tex:584`). The default keeps both paths as they are.
