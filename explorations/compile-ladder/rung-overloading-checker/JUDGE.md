# Rung O, judge on the first skeptic's refusal: repair

*The gather of climb batch 8 corrected the provisional row numbers to the final ones, each two higher: 559 to 568 are rows 561 to 570. The second skeptic's recommended rows R1 to R4 are rows 571 to 574.*

**Ruling: repair.** The skeptic is right on its two refusal grounds, and both repairs fit within the rung's files. The worker's approach is sound and stays: the rule at the top level, the per-provider check as the place where the meet is asked, the capture fix, the memo key, and the fixes for rows 557 and 477. What fails is that the per-provider check, which now carries the Meet Rule for Functional Methods by itself, misses two cases:
- in a component it reads nothing a type inherits from an api (finding 1);
- it compares the meet as if the self parameter were always first (finding 2).

The skeptic is also right that a base-failing test for the memo exists, and that the capture's functional-method branch has no assertion. It is wrong on one citation (section 5). The repair round makes two edits in `OverloadingChecker.scala`, adds the tests below, runs the gate's stages once, and corrects the report and the record lines (section 8).

Tree read: `wip/rung-overloading-checker` at `aaeaed9a2`, base `493b4076f`, test-only commit `573381500`, last code commit `bf759afcb`. I ran no build or test. My evidence is the code and the specification at the lines cited, together with the logs of the worker and the skeptic under `tmp/rung-overloading-checker/`. Those logs are quoted in `SKEPTIC.md`, and in the worker's `reportText`, which the repair round writes out as `REPORT.md`.

## 1. Finding 1: a component's type that inherits both functional methods from an api is checked by no rule. The skeptic is right.

**The mechanism.** `toFunctionalMethodArrows` keeps a functional method in a component only if it has a body (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:137-139`). An api's declarations have no body in its index. So for an object in a user component that extends api traits, every functional method it inherits from them is dropped from its per-provider check. The new top-level test (`:523`, `:552-557`) accepts the pair in the api. So no check judges the type that provides both.

**The skeptic's measurements** (`SKEPTIC.md`, section 1; `tmp/rung-overloading-checker/skeptic/api-head.log:5-17`):
- `SkFmUse` compiles at the head and runs `a`.
- The base refused it, "Invalid overloading of pick in API SkFmApi".
- `SkFmUse3`, a call through an `Fb`-typed variable, runs `Fa`'s declaration: loud to quiet.
- The two-api form `SkFmUse2` was already accepted on the base. That hole is older than the rung, and the same repair closes it.

**What the specification says.** The program is invalid:
- `Z` provides both declarations, since a trait provides what it declares or inherits (`Specification/basic/traits.tex:518-529`).
- `Z` provides no declaration on their meet (`Specification/advanced/overloading.tex:469-485`, the Meet Rule for Functional Methods).

**Which of the worker's claims this falsifies:**
- The worker's decision (4) was named "read what the top-level set reads", but the edit does not do that. The top-level set reads only declarations with bodies from the unit's own index in a component (`getFunctionsFromCompilationUnit`, `:80-83`). It reads every declaration of an imported api, with no body filter (`getFunctions(index, f)` delegates with `onlyConcrete = false`, `:85-88`; used for imports at `:216`, `:220`, `:233`). So the worker's own precedent supports finding 1's repair. The worker's text read the precedent as "bodies only in a component", which is the defect.
- Section 5's "No pair the base checked goes unchecked" is false.
- Section 12's "the Meet Rule is kept for every type that provides both functional methods" is false.
- The stop "the Meet Rule dropped for a type that provides both functional methods" is met at `10d1e672b`, as the skeptic lists it.

**The repair (a decision; alternatives in section 7).** In a component, the per-provider check keeps:
- a functional method that has a body;
- every functional method whose declaring trait or object is not declared in this compilation unit.

The `implemented` filter (`:149-154`) is applied as before. The component's own abstract declarations stay unread, as in 2012 and as the worker listed for Pavol.

## 2. Finding 2: the per-provider meet is compared as if self were first. The skeptic is right.

**The mechanism.** `meetRule` asks `oa.isMeet(ha, fa, ga, isMethod, debug)` (`OverloadingChecker.scala:573`; the skeptic's `:575` is off by two). The per-provider loop passes `isMethod = true` (`checkMethodOverloading`, `:381-386`). `makeDomainFromArrow(a, true)` drops the first element of the domain (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:67-72`).
- That element is the receiver of a dotted method's arrow, built as `(selfType, params...)` by `toMethodArrows` (`:157-166`).
- A functional method's arrow is its parameter list with self at `selfPosition` (`:143-147`), so the element dropped is self only when self comes first.

**The skeptic's measurements** (`SKEPTIC.md`, section 2; `tmp/rung-overloading-checker/skeptic/probes-head.log:1-26`):
- `SkSelfAtOne` and `SkInAtOne` are refused "in trait C", although `C` declares its own `pick` and `IN`.
- `SkSelfAtZero`, the same program with self first, is accepted.
- Walk runs all three.

**What the specification says.** The text settles this.
- The Meet Rule for Functional Methods gives the self position no role beyond `i = j` (`overloading.tex:469-485`). The paragraph before it says that "any type that extends both can include a new declaration that disambiguates them" (`:462-467`).
- The Meet Rule for Dotted Methods compares the receiver by subtyping, `R_0 <: P_0 ∩ Q_0`, and the other parameters by the meet (`:417-446`).
- A trait compares parameter types "not including the type of the self parameter" when it decides what it inherits (`traits.tex:520-527`).
- Read together, the self parameter of a functional method takes the receiver's role wherever it sits. `SkSelfAtOne` must therefore have the verdict of `SkSelfAtZero`. The rung's own promoted test, `FunctionalMethodMeetPerProvider`, fixes that verdict as valid.

**Why this rung repairs it.** The defect is older than the rung: the base refused `SkSelfAtOne` in trait `C` too. Even so, row 556's repair is the per-provider check's rule, and without this repair:
- it holds at self position 0 only;
- the 26 per-provider `IN` sites with self second cannot be cleared by a declaration on the meet (`SKEPTIC.md`, section 2), so the worker's line for Pavol, "Each wants a library device of rung M's kind", is false for them.

The change goes in `OverloadingChecker.meetRule`, a file the rung may edit, and does not touch `coverageRule`, `coversOverlap` or answer 9's rules.

## 3. The memo's test: a base-failing program exists. The skeptic is right.

The record asks for "one new test whose verdict the memo hides" and allows the count-stage evidence only "if none does" (`explorations/coordinator/CLIMB-BATCH-8.md`, section 3, rung O, "The test, first").
- `XXXSkBetween` failed on `573381500` through `junit.sh` in three runs of three (`tmp/rung-overloading-checker/skeptic/harness-memo-base.log:2-12`, `harness-memo-base2.log`, `harness-memo-base3.log`).
- The harness's line "Saw failure, but did not satisfy compile_err_contains" is printed whenever the expected text is missing, whether or not the compile failed (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:383-398`). No error was printed, so the compile was clean: the memo hid the refusal.
- The worker's `XXXFunctionalMethodMeetBetweenTraits` passes on the base (`SKEPTIC.md`, section 4). It guards the head and stays, but it is not the memo's failing test.
- The worker's "No test file can show the defect failing on the base under the harness" (its report, section 7, and its decision "The memo's test") is wrong. So is its defect-home line for the memo.

## 4. The capture's functional-method branch has no assertion. The skeptic is right.

The capture is repaired in both branches (`OverloadingChecker.scala:142-146`, `:162-166`, `:173-192`), but only the dotted branch has a test (`InheritedMethodStaticParamSameName`). `SkCapFmGen` is refused on the base with the captured arrow, "[\R extends Object\](Gen[\Pair[\R\]\], Pair[\R\], Pair[\R\]->R)->R". At the head it passes the checker and stops at code generation on row 565's defect (`SKEPTIC.md`, section 6).
- A `typecheck` test asserts the checker's verdict without reaching code generation. `typecheck` is one of the harness's commands (`FileTests.java:1044-1046`), used by `compiler_tests/VarianceTest.test` and `AfterTypeChecking.test`.
- The skeptic's fallback, an XXX compile test keyed on "duplicate entry", would tie the capture's test to row 565. It is used only if `typecheck` does not run the overloading checker (step 6).

## 5. Where the skeptic was wrong, and what stands

**Wrong: "`OverloadingChecker.scala:201` at the base should be `:200`."** At `493b4076f`, line 201 is `checkFunctionOverloading(kindAndName, f, set, globalOracle)`, and line 200 is the comment `// debugging probe`. The worker's citation is right, and the repair round does not change it.

**Both right: row 546's verdict change**, a reversible stop. Under the Meet Rule for Functional Methods, `V[\X\]` is the only type that provides both declarations, and it provides its own `tag` (`overloading.tex:469-485`), so the program is valid. The new run-time failure has a home 2 test pair:
- `XXXComprisesMeetGenericTrait.test`, which uses `run_out_does_not_contain=PASS`. That key goes red the day the program prints `PASS`, the same signal as the prefix's `REACHED` form.
- `ComprisesMeetGenericTraitLink.test`.

It stays in `stopsMet` with `liftedBy` POSITIONS, "Reversible stops do not hold a batch."

**Both right: the walk test in `ProjectFortress/tests/`.** It is a new, distinct file that section 4 of the record does not name, so it is not a stop. The gather is told that it moves the `testSystem` shards (the shared prefix, "A file added to `ProjectFortress/tests/` moves the testSystem shards").

**Worker right, skeptic confirming.** None of these changes:
- row 557's fix (`TypeAnalyzer.scala:438`, `:760-774`; the skeptic's `SkKindEnvSub` agrees with walk);
- row 477's fix (`Types.java:65`, `:79`, `:86`);
- the capture's renaming;
- the memo's key (`OverloadingChecker.scala:484-498`);
- the counts 89 and 568 on the first pass.

**Not a refusal ground: a component's own abstract declarations stay unread.** The text's "provides" includes them (`traits.tex:528-529`). The worker listed this for Pavol and the skeptic agreed. Section 7 gives why the repair does not widen to them.

## 6. What the specification settles, and what it leaves

- **It settles** that a type providing two functional methods without a declaration on their meet is an invalid overloading. This holds wherever the declarations come from, an api included (`overloading.tex:469-485`; `traits.tex:518-529`).
- **It settles** that the self parameter's position plays no part in the meet beyond `i = j` (`overloading.tex:469-485`, `:518-523`, with `:417-446` and `traits.tex:520-527` for how self is compared).
- **It does not distinguish** a component's own abstract declarations from concrete ones. The 2012 checker's convention of reading only bodies in a component is kept as a decision (section 7).

## 7. Decisions taken here, reported to Pavol

1. **What the per-provider check reads in a component.** Three readings were considered:
   - (a) Every declaration, abstract included, with the `implemented` filter. This is closest to the letter of "provides". It would also read a component's own abstract re-declarations of its api's traits, so each per-provider site in an api would appear a second time in the component that implements it. An object below such a trait must implement every abstract method it inherits, and its own declaration is then the meet, so these pairs carry no run-time ambiguity.
   - (b) Taken: bodies, plus every declaration whose declaring trait is not declared in the unit. This is the top-level set's own convention (`OverloadingChecker.scala:80-88`). It closes finding 1 and the older two-api hole, and adds no check of a component's own abstract pairs.
   - (c) Bodies only. This is finding 1.

   (b) is the narrowest reading that closes every run-time ambiguity the skeptic measured.
2. **How the self parameter is compared in the per-provider meet.** As the receiver is in the Meet Rule for Dotted Methods: by subtyping, which `oa.lteq(ha, fa)` and `oa.lteq(ha, ga)` already check on the full domains, with the meet of the other parameters compared without it. At self position 0 this computes exactly what the base computes (`TypeSchemaAnalyzer.scala:67-72`). The alternative, dropping from `allMethods` the declarations that `C`'s own declaration keeps it from inheriting (`traits.tex:520-527`), needs a transitive inheritance computation in `STypesUtil.scala`, rung I's file. It was not taken.

## 8. Instructions for the repair round

The numbered steps are in this ruling's structured result, which the repair worker receives. They are summarised here so that the second skeptic can check them.
- **Tests first.** Seven new files in `ProjectFortress/compiler_tests/`: an api and its component, and six tests.
  - (b) `XXXFunctionalMethodMeetInheritedFromApi`: finding 1's refusal.
  - (c) `FunctionalMethodMeetInheritedFromApi`: a positive control.
  - (d) `FunctionalMethodMeetSelfSecond`: finding 2.
  - (e) `XXXFunctionalMethodMeetSelfSecondNoMeet`: a guard.
  - (f) `XXXFunctionalMethodMeetJoinOfClosedTraits`: the memo.
  - (g) `InheritedFunctionalMethodStaticParamSameName`, a `typecheck` test: the capture's functional-method branch.

  They are run on the pre-repair head and on the base, and committed alone.
- **The edit**, in `OverloadingChecker.scala` only, in two places:
  - `toFunctionalMethodArrows` at `:137-139`, for finding 1;
  - `meetRule` at `:573`, for finding 2.
- **Then:** the library-order rebuild, the new tests and the rung's tests, the compiler and library tracks once, the ladder subset, the probes `SkFmUse2` and `SkFmUse3`, and the count and distance stages once.
- **A fallback for each edit**, if it changes the verdict of a compiled test other than the repair's own, or refuses a unit of the compiler's prelude.
- **The report and record lines corrected**, as listed in the steps.

The second skeptic checks:
- each new test's verdict on the base, on the pre-repair head and on the repair's head;
- that `FunctionalMethodMeetPerProvider` and batch 7b's coverage tests keep their verdicts (the tracks' result, read and not re-run);
- the per-provider sites the distance gains in components, against the text's rule;
- the corrected `reportText` and `recordText`, which no skeptic has yet checked.
