# Climb batch 14, rung W (`rung-walk-coverage`): walk's coverage rule for an inherited abstract method

- problem: P-147's "Still to build: batch 14's walk rung, which first repairs rows 668 and 669, then closes row 666", on the review's measurement that the coverage rule refuses the library without the two repairs: `explorations/reviews/walk-load-readings-check.md:54-62`; row 666, `explorations/fortress-gap-ledger.md:257`.
- spec: `Specification/basic/traits.tex:579-581` on the base, "An abstract method declaration declares an abstract method; any object inheriting an abstract method must define a body expression for the method", read with the covering words of `Specification/basic/functions.tex:431-434`.
- precedent: `OverloadedFunction.overlapCoveredBy`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:880-940`; `Library/Random.fss:186-187` (the proxy's `perturbed` delegating to `gen`), `Library/Random.fss:236` (`LinearCongruential`'s `reseed` returning `self`), `Library/Random.fss:241` (`perturbed` at `Generator[\ZZ32\]`); `Library/QuickCheck.fss:119` (`Gen`'s default `perturb`).
- deviation:
  - The split of a parameter type through `comprises` clauses is a new helper, `coverParts` (`Constructor.java:542-574`), not `overlapPieces`, which parts the intersection of two types and returns one part for a type and its subtype (`OverloadedFunction.java:1028-1035`).
  - A search that does not settle does not refuse, where `overlapCoveredBy` refuses (`OverloadedFunction.java:890`, `:894`).
  - The proxy's new `reseed` returns `SeededRandomGen[\U,Seed\]`, where the `perturbed` beside it says `SeededRandomGen[\T,Seed\]` (`Library/Random.fss:181`, `:186`).
  - The traits chapter's new sentence takes "with the same name and the self parameter (if any) at the same position" from the chapter's own `override` paragraph, and "together cover" from `functions.tex:431-434` (`Specification/basic/traits.tex:580-585`).
- historical: `Library/Random.fss`, `Library/Random.fsi`, `Library/QuickCheck.fss`, `Library/QuickCheck.fsi`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `Specification/basic/traits.tex`, `Specification/appendices/changes.tex`.

## 1. What changed and why

P-147 decides that an object defines an inherited abstract method when its bodies of that name at narrower parameter types together cover the abstract method's parameter types, with `comprises` clauses read as the compiled checker reads them. Walk's allowance of any one narrower body goes. The rule refuses two library sites that leaned on the allowance (the review's section 2.6). So the rung repairs them first, each test first. Then it changes walk's check, then the text.

**Row 668, `Library/Random.fss` and `.fsi`** (commit `8673192c2`).
- `SeededRandomGenWithDistribution` is the proxy that `SeededRandomGen.distributed` returns. It defined no body for the abstract `getter seedSize()` and `reseed(seedvec: Indexed[\Seed,ZZ32\])` (`Library/Random.fss:88`, `:99`). It now has:
  - `getter seedSize(): ZZ32 = gen.seedSize`;
  - `reseed(seedvec:Indexed[\Seed,ZZ32\]): SeededRandomGen[\U,Seed\] = do gen.reseed(seedvec); self end`.

  They are at `Library/Random.fss:179-182`, api `Library/Random.fsi:163`, `:165`. The trait's comment says the proxy "behaves as like the original generator for `reseed` and `perturbed` calls" (`:131-132`), and that `reseed` should "Return itself (not a copy of itself)" (`:92-97`). The proxy's `perturbed` already delegates to `gen` (`:186-187`), and its getters delegate the same way (`:175-178`).
- `MersenneTwisterInit` defined `perturbed` only at `Indexed[\ZZ32,ZZ32\]`, under the abstract `perturbed(perturbvec: Generator[\ZZ32\])` (`:126`). Its body only iterates `seq(perturbvec)`. So it now takes the abstract declaration's type, as `LinearCongruential`'s and `MersenneTwister`'s do (`Library/Random.fss:241`, `:315`). The edited line is `:345`, api `Library/Random.fsi:242`.
- `MersenneTwister`'s `perturbed` hands its `Generator` to `MersenneTwisterInit`'s (`:318`), so it too stopped walk for a generator that is not indexed. It no longer does (section 5).

**Row 669, `Library/QuickCheck.fss` and `.fsi`** (commit `e26f13335`).
- `AnyGen`, "A version of `Gen[\T\]` without static parameters", declared `perturb(obj: Any, g: AnySeededRandomGen)` abstract.
- Every generator defines `perturb` only at its element type: through `Gen`'s default `perturb(obj: T, g) = g` (`Library/QuickCheck.fss:119`), or its own.
- `AnyGen`'s `perturb` now has the body that `Gen`'s default has, `= g` (`Library/QuickCheck.fss:82`). Its api line, `Library/QuickCheck.fsi:60`, is no longer `abstract`.
- A generator given a value of its own type perturbs as before. Given a value of another type, it returns the random number generator as it is, where walk stopped.

**Row 666, walk's check** (commit `fb6ce967e`).
- `Constructor.checkForDef` (`Constructor.java:413-454`) passed an inherited abstract declaration when `definedBelow` found one body of its name and self position at or below its parameter types.
- `definedBelow` (`Constructor.java:462-540`) now gathers every such body. A body at the abstract declaration's own parameter types is the plain case, and defines it at once.
- Otherwise `coverParts` (`:542-574`) splits each parameter position into parts through `comprises` clauses. A part is split only while some gathered body's type at that position does not hold it and the part has a clause.
- Every combination of parts across the positions must lie inside one body's domain. `OverloadedFunction.someBelow` reads this, with the bounds of the Meet Rule check, `OVERLAP_STEPS` and `OVERLAP_PARTS`.
- The self parameter is not counted. `MethodClosure.getDomain` leaves it out (`MethodClosure.java:55-57`), and Welterweight's rule says so (`Papers/Welterweight/static.tick:46-47`).
- `someBelow` and the two bounds lose their `private` modifier so that the check shares them (`OverloadedFunction.java:865`, `:868`, `:942`). Nothing else in `OverloadedFunction.java` changed.
- A search that does not settle does not refuse (decision 2). This covers a domain walk cannot read, a cycle, a symbolic type and a bound reached.

**The specification** (commit `b00f75310`).
- The traits chapter's sentence is revised in place with a box (`Specification/basic/traits.tex:579-600`).
- Appendix I's entry "Traits with comprises clauses read at the level of values" is amended (`Specification/appendices/changes.tex:2618-2620`, `:2649-2658`, `:2697-2724`, `:2736-2745`, `:2769-2773`). See section 4.

## 2. The failing runs and the passing runs

All failing runs are on the base's code and library, before the first library edit and the first build of the Java edit.

The five new and promoted tests ran through the harness at 2026-10-14T01:47:03Z on tree `5bf8a7c84`, with `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-coverage/h-base ProjectFortress/tests/SeededRandomGenAbstractMethods.fss ProjectFortress/tests/AnyGenPerturbOtherType.fss ProjectFortress/tests/AbstractMethodPartlyDefinedWalk.fss ProjectFortress/tests/AbstractMethodPartlyDefinedWalk.test ProjectFortress/tests/AbstractMethodCoveredWalk.fss ProjectFortress/tests/AbstractMethodNotCoveredWalk.fss ProjectFortress/tests/AbstractMethodNotCoveredWalk.test`:

    . interpret tmp/rung-walk-coverage/h-base/tests/AbstractMethodPartlyDefinedWalk
     Missing expected refusal at load
    F. interpret tmp/rung-walk-coverage/h-base/tests/AbstractMethodNotCoveredWalk
     Missing expected refusal at load
    ** bug! MethodClosure perturb(obj:Any,g:Random.AnySeededRandomGen):Random.AnySeededRandomGenLibrary/QuickCheck.fss:82:5-83:1 has neither body nor def instanceof Method
    Tests run: 5,  Failures: 4,  Errors: 0

- `AbstractMethodCoveredWalk` passed in the same run (`PASS`, ` OK (time = 809ms)`). It should: it guards the covered shape.
- In that run `SeededRandomGenAbstractMethods` failed on a slip of my own: "Equality testing expressions should be parenthesized" in its filter's predicate. I corrected it, and renamed its variable from `odd`, a library functional method, to `odds`.
- It ran again on the base, still before any edit, at 01:48:06Z, with the same command on that file alone:

    ** bug! MethodClosure seedSize():FortressLibrary.ZZ32Library/Random.fss:88:5-98:30 has neither body nor def instanceof Method
    Tests run: 1,  Failures: 1,  Errors: 0

The test's later parts also fail on the base by themselves, measured with `old-fortress.sh` on probe programs (section 5).

The passing runs are all on the final code (`fb6ce967e`, built at 02:12):
- Each repair's own test, right after its edit: `SeededRandomGenAbstractMethods` `OK (1 test)` at 01:49:46Z (`8673192c2`'s edit), and `AnyGenPerturbOtherType` `OK (1 test)` (`e26f13335`'s edit).
- The rung's tests with every test the section names to keep its verdict, 31 files, at 02:13:23Z: `OK (22 tests)`.
  - `AbstractMethodPartlyDefinedWalk` and `AbstractMethodNotCoveredWalk`: ` OK Saw expected refusal at load`.
  - `XXXUnimplementedMethod`: ` OK Saw expected exception`.
  - `PairsRunRangesWalk`, `AbstractMethodCoveredWalk`, `AnyGenPerturbOtherType` and `SeededRandomGenAbstractMethods`: `PASS`.
- `ant testSystem`, once on the final code: `BUILD SUCCESSFUL`, `Total time: 3 minutes 49 seconds`. The shards hold 144 + 146 + 148 + 146 = 584 tests, 0 failures, 0 errors.
- After that run, `SeededRandomGenAbstractMethods` gained one assertion (`068a183e6`, on `MersenneTwister`'s `perturbed`, section 5). This was a test edit, with no code edit after it.
  - On the old code it is red, through the base build's harness (`FORTRESS_HOME=/home/user/fortress-base14 /home/user/fortress-base14/explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-coverage/tmp/old-harness /home/user/fortress-coverage/ProjectFortress/tests/SeededRandomGenAbstractMethods.fss`), at 02:20:54Z: `Tests run: 1,  Failures: 1,  Errors: 0`.
  - On the new code it is green, at 02:21:29Z on `fb6ce967e`: `OK (1 test)`. This is the last run.

`XXXAbstractMethodPartlyDefinedWalk` was promoted before the base run: `git mv` to `AbstractMethodPartlyDefinedWalk`, with its `component` line. Its `.test` key stays `load_exception_contains=does not define an abstract method declared in type S`. Its comment now says that the narrower body "does not cover the abstract method's". No new `XXX` test was added, so none was shown red on a deliberate fix.

## 3. Where the fix belongs, and the precedent search

- **The place.** Walk's load check of inherited abstract methods is `Constructor.checkForDef` and `definedBelow` alone (F-145; the skill's `interpreter.md`, "What walk checks"). The compiled checker's coverage rule (`AbstractMethodChecker.scala:81-122`) is P-147's model, and is not this rung's.
- **The shape.** Walk's own coverage reader is the Meet Rule check's: `overlapCoveredBy` (`OverloadedFunction.java:880-940`) and `meetProvided` (`:1268-1322`). They split each position into parts, and ask that each combination lie inside one declaration's domain. The new check follows that shape, and shares `someBelow` and the two bounds.
- **Row 668's precedents** are in its own file.
  - Every other `SeededRandomGen` object defines `seedSize` and `reseed`: `LinearCongruential`, `MersenneTwister` and `MersenneTwisterInit`, 3 sites.
  - Every other `perturbed` is at `Generator[\ZZ32\]`: `LinearCongruential`, `MersenneTwister` and the proxy, 3 sites.
  - `grep -n 'perturbed(perturbvec:Indexed' Library/*.fss Library/*.fsi` prints nothing now.
- **Row 669's precedent** is `Gen`'s own default (`Library/QuickCheck.fss:119`).
  - Row 628 retired the same `Any` device for `simpleJoin` by typing it at the implementer's static parameter (`aadd02f23`). `AnyGen` has no static parameter.
  - In `Library/QuickCheck.fss` no other abstract declaration takes `Any` as a parameter type. Its only other abstract declaration that mentions `Any` is `AnyGen`'s `generate`, and that one takes a `TestContext`.

## 4. What the specification settles, and the text

- **The rule.** P-147 settles the rule. P-60 settles the reading of a `comprises` clause at the level of values, which `coverParts` reads as `overlapPieces` does (`getComprises`). The review's sections 2.2-2.5 give the sources:
  - Steele's checker of May 2012, which reads `comprises` clauses since `59fdeff62` (`TypeAnalyzer.scala:159-164`);
  - Welterweight's Covered rule (`Papers/Welterweight/static.tick:27-47`);
  - the functions chapter's covering words.
- **The traits chapter's sentence** now reads: "any object inheriting an abstract method must define a body expression for the method: a method definition with the same name and the self parameter (if any) at the same position whose parameter type, not counting the type of the self parameter, is that of the abstract method declaration, or definitions whose parameter types are subtypes of it and together cover it (\secref{internal-types}), or it is a static error."
  - Its box (`revival-covering`) gives the Working Draft's words, the rule with `comprises` clauses read, and its sources.
  - The box also says why the objects chapter's requirement stays true.
- **The objects chapter** (`Specification/basic/objects.tex:149-154`) is not revised. "It must define all abstract methods inherited from its supertraits" points to the traits chapter's section for what defining an abstract method is. The box there says that the requirement is read in that sense.
- **Appendix I.**
  - The traits chapter's section joins the Affected sections.
  - The Change gains the amendment.
  - The Rationale gains the decision of 13 October 2026 and its reasons: the checker, Welterweight, the chapter's sentence on functional methods, `Pairs` and `FileConversion`. It points to the review for the full reasoning.
  - The Effect gains what walk now accepts and refuses, and its two limits: row 665, and a search that does not settle.
  - The Original text gains `Specification-1.0-frozen/basic/traits.tex:510-512`.
  - The Route C item stays true. So do the box at `functions.tex:435-445` and the Effect's sentence on the compiled checker.
- **No decision record is written.** The brief asks for one only where the section does. The full reasoning is the review that the Appendix entry cites, `explorations/reviews/walk-load-readings-check.md`, section 2.
- **The specification builds.**
  - `./ant genSource` and `./ant tex` in `Specification/fortress` both end `BUILD SUCCESSFUL`, with 671 pages.
  - `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log` prints 41. Every one of the 41 is the echoed macro body ``x@warning {Reference `#1' on page \thepage \space undefined}}{}`` of the build's tracing; `grep -n '^LaTeX Warning: Reference'` prints nothing.
  - The build's files were removed with `git clean -fXq -- Specification`.
  - The small wording fix in `b00f75310` after the build ("objects with static parameters") changed no macro.

## 5. Old against new

Each program ran on the old code with `/home/user/fortress-base14/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base14 /home/user/fortress-coverage/tmp/old-caches P.fss`, and on the new with `bin/fortress P.fss`, from a scratch folder. None is kept.

- **`MersenneTwisterInit`'s `perturbed`.** The program runs `MersenneTwisterInit(1).perturbed(1, 3, 5).random()`, then `MersenneTwisterInit(1).perturbed((0#6).filter(fn (i: ZZ32): Boolean => ((i MOD 2) = 1))).random()`.
  - Old: `indexed 3131353415`, then `** bug! MethodClosure perturbed(perturbvec:Generator[\FortressLibrary.ZZ32\]):Random.SeededRandomGen[\T,Seed\]/home/user/fortress-base14/Library/Random.fss:126:5-128:46 has neither body nor def`.
  - New: the test asserts 3131353415 for both. I computed the value by hand from the body's recurrence, `(1812433253 (s BITXOR p) + 1) BITAND (2^32-1)` over 1, 3, 5, from 1.
- **The proxy's `reseed`.** The program runs `d = MersenneTwisterInit(1).distributed[\ZZ32\](UniformDistribution[\ZZ32\](2:9)); d.random(); d.reseed(array[\ZZ64\](1).fill(5))`.
  - Old: `random 2`, then `** bug! MethodClosure reseed(seedvec:Indexed[\Seed,FortressLibrary.ZZ32\]):Random.SeededRandomGen[\T,Seed\]/home/user/fortress-base14/Library/Random.fss:99:5-103:5 has neither body nor def`.
  - New: the test asserts:
    - `seedSize` is 1;
    - `reseed` returns the proxy itself (`SEQV`);
    - the generator's next value is 5;
    - eight values equal those of a fresh proxy over a generator reseeded alike.
- **`MersenneTwister`'s `perturbed`.** The program runs `mersenneTwister(1).perturbed(1, 3, 5).random()`, then `mersenneTwister(1).perturbed(odds).random()` with the filtered range.
  - Old: `indexed 2892507058`, then `** bug! MethodClosure perturbed(perturbvec:Generator[\FortressLibrary.ZZ32\]):Random.SeededRandomGen[\T,Seed\]/home/user/fortress-base14/Library/Random.fss:126:5-128:46 has neither body nor def`, from inside `Random.fss:314:23-52`.
  - New: `indexed 2892507058`, `filtered 2892507058`. `SeededRandomGenAbstractMethods` now asserts it.

## 6. What walk now refuses and accepts

I measured it with a scratch build of the final check. It logged each coverage search with its outcome, and each refusal. That build is not committed, and the final build is without it. It ran over:
- `ant testSystem` (green, 584);
- the 62 demos under `ProjectFortress/demos/`. Each was loaded under walk from that folder with a 15 s limit, and the `Syntax`, `DynamicSemantics`, `Satisfiability` and `GenomeUtil*` files were skipped, as the harness skips them;
- the 32 specification examples that declare an object (`grep -l '^object\|^ *object ' SpecData/examples/*/*.fss`). Each ran from its folder, and all exit 0.

The results:
- **Searches that cover.** All settled:
  - `Pairs`'s `RunRanges` `BOXPLUS` in `SingleRange` and `RangeSet` (bodies over `SingleRange` and `RangeSet`), in `PairsRunRangesWalk` and the 20 `BirdCount` demos that import `Pairs`;
  - `FileConversion`'s `dna` `OPLUS` in `dnaSequence` (bodies over `dnaSequence` and `EmptySequence`), and the same `dna` in `BirdCount1m` to `1p`;
  - the demos' own `SampleEvents` `BOXPLUS` (bodies over `MatchRun` and `RangeSet`) in `BirdCount1m` to `1r`;
  - the rung's `AbstractMethodCoveredWalk`: `f` over `P` and `Q`, and `g` over `(P,P)`, `(P,Q)` and `(Q,D)`.
- **Searches that refuse.** Only the rung's two tests:
  - `AbstractMethodPartlyDefinedWalk`: `tag(self, x: Number)` under one body at `ZZ32`. `Number`'s clause lists `RR64`, `RR32`, `QQ`, `AnyIntegral` and `IntLiteral`, and the part `RR64` lies in no body.
  - `AbstractMethodNotCoveredWalk`.
- **Refusals with no body below at all,** the same as on the base:
  - `AbstractMethodUndefinedWalk`, `AbstractMethodUndefinedObjectExpressionWalk`, `AbstractOverrideUndefinedWalk` and `XXXUnimplementedMethod` (the team's);
  - `ReductionSimpleJoinAtAnyWalk`, whose `simpleJoin` is only at `Any`, above;
  - in the demos, row 670's three: `FileBasedReadList` under `nextRange()` (`GenomeUtil1z.fss:68`, `GenomeUtil2a.fss:74`), and `npbft.fss`'s `Complex` under `asFloat`.
- **Nothing moved.** No library type, team test, demo or specification example is newly refused or newly accepted.
  - Without the repairs of rows 668 and 669, the rule would refuse `MersenneTwisterInit`, and the 14 generators without static parameters in `QuickCheck` and `ReflectiveQuickCheck` (the review's section 2.6).
  - With them, seven tests keep their verdicts: `LibraryMeetDeclarations`, `QuickCheckTest`, `RandomTest`, `ReflectiveNumberTypes`, `ReflectiveQuickCheckTest`, `UniformDistributionStridedRange` and `XXXUniformDistributionRangeType`. The values they assert are unchanged, since the suite is green.
- **No search failed to settle.** By reading, a search fails to settle only in these cases, and in each the object is not refused (decision 2):
  - a parameter type that walk cannot read (a `FortressException` in `getDomain` or `subtypeOf`);
  - a symbolic type in a domain, which needs static parameters (generic objects are not checked, row 665);
  - a cyclic `comprises` clause;
  - more than 10,000 steps or 4,096 combinations.
- **Getters.** `MethodClosure.getDomain` of a getter is empty, so any body of its name with no parameters defines an abstract getter, as before.

## 7. The checker count and the distance

The rung changed library files (`Library/Random.*`, `Library/QuickCheck.*`), and the stages' list of paths that no stage reads does not hold them. So both stages ran once on the final code (`fb6ce967e`).

- **Count.** The command was `explorations/coordinator/tools/checker-count/run.sh tmp/rung-walk-coverage/checker-count-postedit.txt tmp/rung-walk-coverage/cc-post`.
  - `diff explorations/compile-ladder/climb-batch-13b/gate/checker-count.txt tmp/rung-walk-coverage/checker-count-postedit.txt` prints nothing: `#total 1`, `#locations 1`, `#crash none`, every api 0.
  - It took about 6 minutes, not the brief's 20 s. A first run under a 280 s `timeout` was cut, and its JVM stopped by pid; the second ran detached.
- **Distance.** The command was `explorations/coordinator/tools/distance/run.sh tmp/rung-walk-coverage/distance-postedit.txt tmp/rung-walk-coverage/dist-post`, detached, 1624 s (`#seconds 1624 FortressLibrary 899`).
  - `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-13b/gate/distance.txt tmp/rung-walk-coverage/distance-postedit.txt` prints `DISTANCE SAME   85`.
  - Read by row, `diff <(sort explorations/compile-ladder/gate/distance-sites.tsv) <(sort tmp/rung-walk-coverage/dist-post/errors.tsv)` prints nothing. Each list has 86 lines: 85 sites and the header.
  - No site moved. Neither `Random` nor `QuickCheck` is among the twelve components.

## 8. The ladder subset

- **No file is selected by the rule.** No file's recorded first error in the baseline names a declaration that the rung touched. `grep -i -E 'Random|QuickCheck|AnyGen|SeededRandomGen|MersenneTwister|perturb|reseed|seedSize' explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` names only the three tests below, and their first errors are names of the compiler's library.
- **The subset I ran** is the seven tests that import the two changed apis. The drivers were copied under `tmp/rung-walk-coverage/ladder/` (`run-subset.sh`, `classify.py`, with the gate's `sed` lines), and the driver built its own library caches.
- **The comparison.** None of the seven is in the newest landed `ladder.tsv` (`climb-batch-13b/gate/ladder/ladder.tsv`). Three are in the baseline's `ladder.tsv`, and they are unchanged:

    tests	QuickCheckTest.fss		disambiguate	ImmutableArray is undefined.
    tests	RandomTest.fss		disambiguate	LexicographicOrder is undefined.
    tests	ReflectiveQuickCheckTest.fss		disambiguate	ImmutableArray is undefined.

- **The four newer ones** also stop at disambiguate on names of the compiler's library, with no record to compare:
  - `LibraryMeetDeclarations`: `LexicographicOrder is undefined.`;
  - `ReflectiveNumberTypes`: `ImmutableArray is undefined.`;
  - `UniformDistributionStridedRange` and `XXXUniformDistributionRangeType`: `Indexed is undefined.`

## 9. Sentences made false

- **In the specification: none left.** The change made one sentence false of walk, `Specification/basic/traits.tex:579-581` on the base, and that sentence is the one revised. The Appendix I entry's Effect now says what walk does. `Specification/basic/functions.tex:435-445` and the entry's Effect on the compiled checker stay true. `objects.tex:149-154` stays true in the sense that the box gives.
- **Outside the specification,** for the gather. These are not edited here, as the brief asks:
  - F-145 (`explorations/coordinator/FACTS.md:137`): "A check of them would refuse `Random`'s `SeededRandomGenWithDistribution`, which defines no `seedSize` or `reseed` (row 668). A body at narrower parameter types passes (row 666), which `Pairs` and the QuickCheck generators need (row 669)."
  - The skill's `references/interpreter.md`, "What walk checks": "an object or object expression without static parameters that inherits an abstract method and provides no declaration with a body of its name at or below its parameter types", and "leaves an inherited abstract method without a body at or below its parameter types".
  - The skill's `references/revival-changes.md`, entry "An abstract method without a body, and an `override` that overrides nothing, under walk":
    - its Resolution's sentences from "A declaration with a body of the method's name ..." to "(ledger rows 668 and 669)";
    - its Reason's sentences on `Pairs`, `QuickCheck` and `MersenneTwisterInit`.

    `record.md`, "Revival change", gives the new text.
- The comments of `checkForDef` and `definedBelow` were rewritten in the same commit as the check.

## 10. Points to report

- **Each library repair's precedent line, and each team declaration changed, with its api line:**
  - `SeededRandomGenWithDistribution` gains `getter seedSize(): ZZ32 = gen.seedSize` (`Library/Random.fss:179`; api `Library/Random.fsi:163`). Precedent: its getters (`Library/Random.fss:175-178`).
  - It gains `reseed(seedvec:Indexed[\Seed,ZZ32\]): SeededRandomGen[\U,Seed\] = do gen.reseed(seedvec); self end` (`Library/Random.fss:181-182`; api `Library/Random.fsi:165`). Precedents: its `perturbed` (`:186-187`), and `LinearCongruential`'s `reseed` (`:236`).
  - `MersenneTwisterInit`'s `perturbed` takes `Generator[\ZZ32\]` (`Library/Random.fss:345`; api `Library/Random.fsi:242`). Precedents: `Library/Random.fss:241` and `:315`.
  - `AnyGen`'s `perturb` gets the body `= g` and is no longer abstract (`Library/QuickCheck.fss:82`; api `Library/QuickCheck.fsi:60`). Precedent: `Library/QuickCheck.fss:119`.
- **What the coverage check does where its search does not settle:** it does not refuse (`Constructor.java:501-503`, `:514`, `:517`).
  - In the suite, the demos and the specification examples, no search failed to settle, so no type was left undecided.
  - No walk value changed in a test that imports `Random` or `QuickCheck` (section 6).
- **Not reached:**
  - No library type, team test or demo is newly refused or accepted at load (section 6).
  - No normative text changed beyond the traits chapter's sentence and the Appendix I entry.
  - There is no checker or code-generator edit, and no walk edit beyond the check and the access of `someBelow`, `OVERLAP_STEPS` and `OVERLAP_PARTS`.
  - No count or distance site moved (section 7).

## 11. Decisions

1. **How the check reads coverage.**
   - Chosen:
     - Gather every body of the name and self position at or below the abstract parameter types.
     - A body at those types is the plain case.
     - Otherwise, split each position lazily through `comprises` clauses: a part is split only while some gathered body's type at that position does not hold it.
     - Then ask that every combination of parts lie inside one body's domain.
   - Not taken:
     - Split every position to the leaves of its clauses. It is sound, but walks clauses for nothing, and meets symbolic or unreadable types that the plain case never needs.
     - Stop splitting when some body holds a part. It is wrong across positions: for `g(self, x: D, y: D)` with bodies `(P,P)`, `(P,Q)` and `(Q,D)`, the second position's `D` would stay whole, and the combination `(Q,D)` would meet no body over `P` and `Q`, though the bodies cover. `AbstractMethodCoveredWalk` gates the shape.
     - The review's suggestion to read the parts with `overlapPieces`. It parts the intersection of two types and returns one part, the smaller, when one is below the other (`OverloadedFunction.java:1028-1035`). So it never splits a type into the types its clause lists.
   - Evidence: section 6. Every library and demo search settled and covered, as P-147 expects.
2. **A search that does not settle does not refuse.**
   - Not taken: refusing, as `overlapCoveredBy` does (`OverloadedFunction.java:890`, `:894`).
   - Chosen with two precedents:
     - walk's other check of what a type provides, `meetProvided`, "true where the search does not settle" (`OverloadedFunction.java:1263-1266`);
     - the base's `definedBelow`, which accepted a domain it could not read (`Constructor.java:482-484` on the base, kept at `:501-503`).
   - Why the two Meet Rule checks differ from this one: a call that no body defines stops walk at run time with "has neither body nor def", never silently. An ambiguous overload runs one declaration silently, so refusing where unsure is worth more there.
   - No decision of the curator covers it. It is reversible: change three `return true` to `return false`.
3. **Sharing the helpers.**
   - Chosen: `someBelow`, `OVERLAP_STEPS` and `OVERLAP_PARTS` lose `private`, giving package access; `Constructor` is in the same package. This is what the brief asks: "by widening their access, not by a copy".
   - Not taken: a new coverage helper in `OverloadedFunction.java`, a walk edit there beyond access; a copy of `someBelow`.
4. **Row 669's repair: `AnyGen`'s `perturb` gets `Gen`'s default body.**
   - Not taken:
     - A covering `perturb(obj: Any, g) = g` in `Gen[\T\]`. At `Gen[\Any\]`, the type of `ReflectiveQuickCheck`'s `genAnyOf'`, `genAnyLifted` and `genStaticArgs` (`Library/ReflectiveQuickCheck.fss:80`, `:97`, `:242`), it would give two bodies at `(Any, AnySeededRandomGen)`. This is by reading, not run.
     - Removing `AnyGen`'s `perturb`. It removes a team api declaration; no library caller goes through `AnyGen`, but the api declares it.
     - A `perturb(obj: Any, g)` in each of the 14 generators: 14 edits, where `Gen` already has the default.
   - With the chosen way, at `Gen[\Any\]` `Gen`'s own `perturb` has `AnyGen`'s parameter types, so `AnyGen`'s is not inherited (`traits.tex:530-536`).
5. **Row 668's repair: delegate, and return the proxy itself.**
   - Not taken:
     - `reseed` returning `gen.reseed(seedvec).distributed(dist)`, a new proxy. That goes against "Return itself (not a copy of itself)" (`Library/Random.fss:95`).
     - A constant `seedSize` of 1. It is wrong for `MersenneTwister`, whose seed size is its degree (`:275`).
     - A second `perturbed` body at `Generator[\ZZ32\]` in `MersenneTwisterInit`, beside the indexed one: two bodies of one loop.
6. **The proxy's `reseed` returns `SeededRandomGen[\U,Seed\]`.** That is the instance the object extends (`:173`), so it is the trait's `reseed` type there, and it is the type of `self`. Not taken: `SeededRandomGen[\T,Seed\]`, as the `perturbed` beside it is spelled, which names the generator's element type (noticed in section 12).
7. **The objects chapter stays.** Its requirement is read through the traits chapter's box. Not taken: revising `objects.tex:149-154` in the same words, a second box for a sentence that is not false.
8. **No decision record.** The Appendix entry cites the review for the full reasoning (section 4).
9. **`SeededRandomGenAbstractMethods` also asserts `MersenneTwister`'s `perturbed`,** after the probe showed it stopping on the base. The assertion compares the two spellings, since I do not compute the twister's value by hand.
10. **The ladder subset** is the seven importers of the changed apis. The gate's rule ("each file whose recorded first error ... names something that your change touched") selects none.
11. **`ant testSpecData` was not run.** It is the gate's suite. Instead, the 32 specification examples that declare an object were loaded under the logging build: no search, no refusal, all exit 0.

## 12. Defects and their homes

- Row 668, both parts, and its face through `MersenneTwister.perturbed`: home 1, repaired; `ProjectFortress/tests/SeededRandomGenAbstractMethods.fss`.
- Row 669: home 1, repaired; `ProjectFortress/tests/AnyGenPerturbOtherType.fss`.
- Row 666: home 1, repaired; `ProjectFortress/tests/AbstractMethodPartlyDefinedWalk.fss` (promoted) and `AbstractMethodNotCoveredWalk.fss`. `AbstractMethodCoveredWalk.fss` guards the covered shape.
- No new defect was measured, and no new row was written.

Noticed, not measured:
- `SeededRandomGenWithDistribution` and `RandomGenWithDistribution` declare their getters `Maybe[\T\]` and `random(): T`, and the seeded one declares its `perturbed` `SeededRandomGen[\T,Seed\]`. Here `T` is the wrapped generator's element type, but the values are the distribution's `U` (`Library/Random.fss:159-164`, `:175-178`, `:184`, `:186`).
- Walk runs them, since it checks no declared return type there; the suite's `RandomTest` uses the proxies.
- The compiled checker would refuse them, but no stage checks `Random`. No row, since nothing measured it; it is a question for the curator.

## 13. Commands worked out

- **The coverage logging probe.**
  - A copy of the final `Constructor.java` with `probeLog` lines at each search outcome and each refusal, built.
  - Then three runs, the log grouped with `sort | uniq -c`:
    - `ant testSystem`;
    - a loop over the demos, each `timeout -k 5 15 ../../bin/fortress X.fss` from `ProjectFortress/demos`;
    - a loop over each `SpecData` example that declares an object, run from its folder.
  - The final file was restored from a saved copy, and built again before every measured run on the final code.
- **The checker count** now takes several minutes; the 13b gate's summary says 387 s. Run it detached, with the `nohup` line of the distance.
