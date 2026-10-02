# Rung O, first skeptic: refused

**Verdict: refused.** The one thing that must change: the per-provider check, which now carries the Meet Rule for Functional Methods alone, must judge every trait or object that provides both declarations, at every self position. As built it skips the declarations a component's type inherits from an api, so a program the base refused now compiles and runs with no meet (finding 1), and it misjudges the meet when the self parameter is not first, so a type that declares its own meet is refused (finding 2). Each gets a home before the second skeptic: repaired with an assertion seen failing on the base, or an XXX test with a ledger row and the stop listed. The rest of the rung checks out: the three tests fail on the base and pass at the head as quoted, the capture and row 557 fixes give the verdicts the specification gives, row 477's crash rows are gone, and the tables match the report.

Tree: the branch `wip/rung-overloading-checker` at `10d1e672b`, base `493b4076f`, the test-only commit `573381500`. I built each state myself (`ant compileAll`, `global.map` restored, caches wiped, the library-order rebuild), the base twice and the head twice. My programs are under `tmp/rung-overloading-checker/skeptic/`. Below, "probe.sh" means `bin/fortress compile X.fss` then `bin/fortress run X` with the component's cache entries removed first, and "walk" means `bin/fortress X.fss`. Everything ran at one thread: the rung touches no mutable state, field, atomic block or write into a library's state.

## 1. Finding 1 (refusal): a component's type that inherits both functional methods from an api is checked by nothing

`toFunctionalMethodArrows` keeps only declarations with bodies when the unit is a component (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:137-139`). The declarations of an api's traits carry no body in the index. So when a component's type extends api traits, the functional methods it inherits from them are dropped from its per-provider check. The top-level relaxation (`:523`, `:548-557`) then accepts the pair, and no check is left for the type.

My program, `api/SkFmApi.fsi` with `.fss`: `trait Fa  pick(self): String end` and `trait Fb  pick(self): String end`. Then `api/SkFmUse.fss`, `import SkFmApi.{...}`, declares `object Z extends { Fa, Fb } end`, with no `pick` of its own, and runs `println(pick(Q))` for `object Q extends Fa`.

- **Base** (`573381500`, `bash tmp/.../skeptic/apirun.sh base`). The api is refused by the function rule, so the program is refused:
  ```
  ########## [base] compile SkFmUse.fss
      Invalid overloading of pick in API SkFmApi:
       SkFmApi.Fa->String @ SkFmApi.fsi:3:3-4:1
  File SkFmUse.fss has 1 error.
  ```
- **Head** (`10d1e672b`, `apirun.sh head`). The api compiles, as the text allows. `SkFmUse` compiles and its run prints `a` (rc=0).
- **The same declarations in one component** (`SkFmLocal.fss`) are refused at the head: "Invalid overloading of pick in trait Z: Fa->String ... and Fb->String".
- **What the specification says.** The program is invalid: `Z` provides both declarations and no declaration on their meet (`Specification/advanced/overloading.tex`, "Meet Rule", the Meet Rule for Functional Methods; "provides", `Specification/basic/traits.tex:528-529`). Walk prints `a` (row 544's walk defect).
- **The failure mode, loud to quiet.** `api/SkFmUse3.fss` binds `x: Fa = Z` and `y: Fb = Z` and prints `pick(x) " " pick(y)`. At the head it compiles, and the run prints `a   a` (walk prints `a a`). A call whose static type is `Fb` runs `Fa`'s declaration. The base refused the family at compile time; the head chooses `Fa`'s declaration silently.
- **The hole is older than the rung.** Its two-api form, `Fa` and `Fb` in two apis (`api/SkFmUse2.fss`, `apirun2.sh`), compiles and runs `a` on the base and on the head. On the base nothing refused it either: the top-level set of `SkFmUse2` holds no `pick`, and its per-provider check drops both declarations. The rung's relaxation widens the hole to the one-api case, which the base refused.

**What this falsifies in the report.**
- Section 5: "No pair the base checked goes unchecked". The base refused `SkFmUse`; the head checks `Z` nowhere.
- Section 12: "the Meet Rule is kept for every type that provides both functional methods". This meets the stop "The Meet Rule dropped for a type that provides both functional methods" (section 5 below).
- The decision "(4), taken: read what the top-level set reads". In a component it also drops every declaration a type inherits from an api, not only the component's own abstract ones. The report's decision does not name that case.

User programs live in components whose types extend the one library's api traits, so after the switch-over this hole covers every functional method they inherit.

## 2. Finding 2 (refusal): the per-provider check misjudges the meet when the self parameter is not first

`meetRule` asks `oa.isMeet(ha, fa, ga, isMethod, debug)` with `isMethod = true` in the per-provider check (`OverloadingChecker.scala:575`). `makeDomainFromArrow(a, true)` drops the domain's first element (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:67-72`). For a functional method that element is the self parameter only when self comes first. The worker read this ("Read, not measured", section 11), but gave it no test and no row. I measured it.

My two programs differ only in the self position. Two traits each declare `pick`, and `object C extends { A, B }` declares its own `pick`, the meet for `C`:
- `probes/SkSelfAtZero.fss`, `pick(self, n: ZZ32)`.
  - Head, probe.sh: compiles; the run prints `C`, `A`.
  - Walk: `C`, `A`.
- `probes/SkSelfAtOne.fss`, `pick(n: ZZ32, self)`.
  - Head, probe.sh:
    ```
    ########## [head] SkSelfAtOne: compile
        Invalid overloading of pick in trait C:
         (ZZ32, A)->String @ SkSelfAtOne.fss:4:3-35
     and (ZZ32, B)->String @ SkSelfAtOne.fss:7:3-35
    File SkSelfAtOne.fss has 1 error.
    ```
  - Walk: `C`, `A`.
  - Base: both this error and the top-level one.
- `probes/SkInAtOne.fss`, the library's own shape, `opr IN(n: ZZ32, self)`.
  - Head: "Invalid overloading of IN in trait C: (ZZ32, A)->Boolean ... and (ZZ32, B)->Boolean".
  - Walk: `true`.

**What the specification says.** It settles this against the compiled run, under the one reading the rung's own test needs. The Meet Rule for Functional Methods gives the self position no role beyond `i = j`. `FunctionalMethodMeetPerProvider` is valid only if the declaration in the providing object counts as the meet for that object, and `SkSelfAtOne` is that program with the self parameter second.

**What it does to the rung's figures and to the record.**
- 26 of the 64 new per-provider api sites are `IN`, with self second:
  - 23 in `api RangeInternals`;
  - 3 in `FullRange`, `CompactFullRange` and `StridedFullRange`.
- None of those types declares its own `IN`, so the sites are real under a correct check too.
- A declaration on the meet would not clear them while this defect stands: `SkInAtOne` declares one and is refused. The report's line for Pavol, "Each wants a library device of rung M's kind", is wrong for these 26 as the checker stands.
- The same defect sits under every family of the library whose self parameter is second: `IN` in the component and in the api.

## 3. The failure, seen by me (check 3)

On `573381500`, built from scratch (`ant compileAll`, `BUILD SUCCESSFUL`, the five library compiles rc=0), I ran `bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skbase ProjectFortress/compiler_tests FunctionalMethodMeetPerProvider.test GenericTraitExcludesKindEnv.test InheritedMethodStaticParamSameName.test`:
```
    Invalid overloading of toSeq in component FunctionalMethodMeetPerProvider:
     AsFilt->String @ ProjectFortress/compiler_tests/FunctionalMethodMeetPerProvider.fss:9:5-32
Tests run: 3,  Failures: 3,  Errors: 0
I is not in the kind env [][][]
Tests run: 3,  Failures: 3,  Errors: 0
 and [\R extends Object\](Gen[\Pair[\R\]\], Pair[\R\]->R)->R @ ProjectFortress/compiler_tests/InheritedMethodStaticParamSameName.fss:6:5-7:1
Tests run: 3,  Failures: 3,  Errors: 0
```
On `10d1e672b`, rebuilt, the same command with label `skhead`:
- `. run ProjectFortress/compiler_tests/FunctionalMethodMeetPerProvider (292ms) PASS`
- `. run ProjectFortress/compiler_tests/GenericTraitExcludesKindEnv (326ms) PASS`
- `. run ProjectFortress/compiler_tests/InheritedMethodStaticParamSameName (505ms) PASS`

Each ended "OK (3 tests)". This is as the report quotes.

The rung's expected failures, at the head through `junit.sh skhead-xxx` (link tests before their run tests):
- `ComprisesMeetGenericTraitLink` and `GenericTraitGenericFunctionalMethodLink`: "OK (1 test)".
- `XXXComprisesMeetGenericTrait`: "ClassCastException", "Saw expected failure (Exit code != 0)".
- `XXXGenericTraitGenericFunctionalMethod`: "REACHED", "NoSuchFieldError", "Saw expected failure".
- `XXXGenericTraitFunctionalMethodOverride`: "OK Saw expected exception".
- `XXXComprisesMeetGenericFunctions`, `XXXInheritedAbstractMethodStaticParamSameName` and `XXXFunctionalMethodMeetBetweenTraits`: "Saw expected failure".
- Batch 7b's `CoverageReturnGood`, `ComprisesMeetFunctionalMethod`, `XXXCoverageReturnGenericFamily` and `XXXComprisesMeetFunctionalMethodUncovered` keep their verdicts.
- The walk file, through `bash explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> ProjectFortress/tests/XXXGenericTraitGenericFunctionalMethodWalk.fss`: "OK Saw expected exception", "OK (1 test)".

The compiler and library tracks were not run again. The worker ran them once on `fff55e16b` (`tmp/rung-overloading-checker/tracks/`: "OK (973 tests)", "OK (86 tests)"). The code is unchanged since `bf759afcb`: `git diff bf759afcb 10d1e672b -- ProjectFortress/src Library ProjectFortress/LibraryBuiltin` is empty.

## 4. The memo: a test that fails on the base exists (required correction)

The report says no test file can show the memo's defect failing on the base under the harness (section 7, and the decision "The memo's test"). That is not so.

My program `probes/SkBetween.fss` has the same shape as the worker's, with other names and a different declaration order:
- `Left comprises { Mid, Both }` and `Right comprises { Both, Other }`, each declaring `side(self)`;
- `Mid extends Left excludes Other`;
- `Join extends { Left, Right } comprises { Both }`;
- `Both extends Join`, declaring `side(self)`.

**On the base** (`bash tmp/.../skeptic/memo.sh base SkBetween ...`, memo on and off by `-Dfortress.analyzer.overload.cache`):
- `SkBetween`: memo on "rc=0"; memo off "Invalid overloading of side in trait Join".
- `SkBetweenC`: the same.
- `SkBetweenB` and `SkBetweenD`: refused both ways.

**Through the harness on the base.** The program as `XXXSkBetween.fss`, with a `.test` of `compile` and `compile_err_contains=Invalid overloading of side in trait Join`, run by `junit.sh skbase-memo tmp/.../skeptic/jt2 XXXSkBetween.test`. In three runs of three:
```
 Saw failure, but did not satisfy compile_err_contains; expected
Invalid overloading of side in trait Join
Tests run: 1,  Failures: 1,  Errors: 0
```

**At the head:**
- all four orders are refused with the memo on and off;
- the harness gives "Saw expected failure", "OK (1 test)".

The worker's `XXXFunctionalMethodMeetBetweenTraits` does not fail on the base. My copy of it, through `ONE_JVM=1 junit.sh` after `CoverageReturnGood` in both orders on `573381500`, gave "Saw expected failure", "OK (4 tests)". It guards the head, but it is not the memo's failing test.

The hit still depends on hash order, so the gate's whole-suite JVM may differ on the base. On the head the verdict no longer depends on the order.

## 5. Stops met

- **"A compiled test whose verdict changes other than by this rung's intent".** The worker named this one. `ProjectFortress/compiler_tests/XXXComprisesMeetGenericTrait.test:1-3`: row 546's expected failure moved from a compile-stage refusal to a run-stage `ClassCastException`, against the record's "the expected failures of rows 543 and 546" keeping their verdict. I agree with the worker's reading. Under the Meet Rule for Functional Methods the program is valid: `V[\X\]`, the only type that provides both, provides its own `tag`. The new verdict is the specification's, and the run-time failure has its home-2 test. Reversible.
- **"The Meet Rule dropped for a type that provides both functional methods".** The worker did not name this one. `OverloadingChecker.scala:137-139` with `:523`: `SkFmUse` (finding 1) is refused on the base and compiles and runs at the head, with `Z` checked nowhere. Reversible, but it is a defect, and I refuse on it.

## 6. The diff against the specification (check 4)

- **The top-level relaxation** (`:523`, `:548-557`): two functional methods at one self position, with `!isMethod`. It matches the rule's first condition, `i = j`. A function beside a functional method is untouched. `probes/SkMixedTop.fss` is refused the same on the base and the head, "Invalid overloading of tag in component SkMixedTop: (T & {V, W})->ZZ32 ... and S->ZZ32", and walk refuses it ("first parameters s:[S] and self:[T] are unrelated"): row 545 unchanged. `probes/SkUnrelatedOnly.fss` (two unrelated traits, no type providing both) is refused on the base and runs `A B` at the head; walk prints `AB`.
- **The per-provider check still refuses a provider that lacks the meet.** `probes/SkNoMeetTwoParams.fss` (self first) and `probes/SkNoMeetSelfAtOne.fss` (self second) are refused at the head, "Invalid overloading of pick in trait D". Walk prints `A` for both (row 544). The check is sound where it reads; findings 1 and 2 are about what it does not read and how it compares.
- **The `implemented` filter** (`:149-154`) drops an abstract declaration only when a strict subtype's declaration has an equivalent arrow, self included. That is narrower than the specification's inheritance rule, which compares parameter types without self (`Specification/basic/traits.tex:520-527`), and harmless where the Subtype Rule settles the rest.
- **The capture** (`:173-191`, called at `:142` and `:162`): only clashing names are renamed, before the replacer, to the first free `R$n`. Both branches are verified against renamed copies:
  - Dotted, the worker's test.
  - Functional method, mine: `probes/SkCapFmGen.fss`, `Gen[\E\].gen[\R\](self, x: E, f: E -> R)` inherited by `Pair[\R\] extends Gen[\Pair[\R\]\]`, which declares `gen[\G\]`.
    - Base: "Invalid overloading of gen in trait Pair: ... [\R extends Object\](Gen[\Pair[\R\]\], Pair[\R\], Pair[\R\]->R)->R".
    - Head: the checker passes and code generation stops with "java.util.zip.ZipException: duplicate entry", the same verdict the renamed copy `SkCapFmGenRenamed` (`gen[\Q\]`) gives on the base and the head. That is row 563's defect.
    - Walk: "Missing type G" for both.
  - The functional-method branch has no gated assertion (required correction 3).
  - `probes/SkCapCall.fss` calls an inherited generic method through `h: Holder[\ZZ32\]`, where `Holder[\R\] extends Box[\R\]` and the method is `mapIt[\R\]`. It compiles and prints `v 5` (walk `v5`), as its renamed copy does. The `STypesUtil.inheritedMethods` site shows no capture at a call.
- **The memo** (`:481-486`, `:497-498`, `:328`, `:362`): the key holds everything `validOverloadingInner` reads. A valid answer is reused only under equal arrows, signature sets, `isMethod` and static parameters in scope. AST equality is structural (`nodes/ArrowType.java:96-111`).
- **Row 557** (`TypeAnalyzer.scala:438`, `:760-774`): the reciprocal entry's free parameters are read as rigid variables. That can only miss an exclusion, never invent one, and the forward clause finds it (`excludesClause` is transitive, `:776-791`). My variant `probes/SkKindEnvSub.fss` has a two-parameter `Rg[\I, J\] excludes { Txt0 }`, and the function's second parameter is a subtrait `Txt1` of the excluded `Txt0`.
  - Base: "I is not in the kind env [][][]".
  - Head: compiles and prints `true`, `false`.
  - Walk: `true`, `false`.
- **Row 477** (`Types.java:65`, `:79`, `:86`): `Shell` switches `WellKnownNames` before `Types` (`Shell.java:375-376`, `:384-385`). The worker's after-table has no `Character` row; the four other crash rows remain. The six new errors are in bodies the crashes hid (`String.fss:325-331`, `FortressLibrary.fss:4309`, `:4325`): `assert` on two strings, and `ZZ32->ZZ32` applied to an `RR64`. None of them names `Char`. `probes/SkCharLit.fss` (compiler world) prints `q` and `char  q` on the base and the head; walk prints `char q`. The extra space is row 76.

## 7. The rest of the checks

- **Provenance block (check 2).** Every cited line says what the block says (opened with `sed -n` at the base or the head as each line states):
  - `triage.md:76`, `:24-27`; `distance.txt:51-55`;
  - `overloading.tex:465-529`, `traits.tex:220-235`, `:518-532`, `literals.tex:40`;
  - `OverloadingChecker.scala:79-82`, `:120`, base `:133`, `:282-320`;
  - `SNodeUtil.scala:192-204`, `:239`, `:344-356`; `STypesUtil.scala:1522-1545`;
  - base `Types.java:77-88`; `FortressBuiltin.fsi:207`.

  One citation is off by a line: "`OverloadingChecker.scala:201` at the base" is `:200`. The `historical:` line names all three 2012 files the diff edits.
- **The tests (check 6).** Each new file has one comment line, a name by topic and no specification line number. The messages state the check in plain words and cite no section. The walk test sits in `ProjectFortress/tests/`, which section 4 gives to Q and M. It is a new, distinct file, so it is no stop (no file section 4 names), but it is outside O's file list. The worker reports this as a decision, on the three-homes rule.
- **Competing declarations (check 7).** Each of the nine new components is declared once across `ProjectFortress/tests/` and every `*_tests/`. `ownStaticParamsApart`, `functionalMethodsAtOnePosition` and `staticParamsInScope` occur only in `OverloadingChecker.scala`, and `withClauseParams` only in `TypeAnalyzer.scala`, over `src/com/sun/fortress/`.
- **record.md (check 8).** Not checked: the branch carries no `record.md`, and its text (`recordText`) was not in my brief.
- **Count table (check 10).**
  - `tmp/rung-overloading-checker/count/checker-count-off.txt:14` and `checker-count-on.txt:14`: `#total 89`.
  - `distance/distance.txt:2`: `#total 568`.
  - Both match the report's 89 and 568.
  - Before: the landed `climb-batch-7b/gate/checker-count.txt` 59 and `distance.txt` 598. `git log b0eb41516..493b4076f -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing.
  - Both stages must run again after the repair.
- **Ledger and sibling sites (check 11).** No existing row covers finding 1 or finding 2: I searched for "isMeet", "self position", "functional method" and "api". Row 544 is walk's acceptance in both. Row 547's shape is `SkBetween`'s; my one-JVM base run did not reproduce its acceptance with the worker's program. The worker's provisional rows 559 to 565 are new. Row 21 is walk's generic-method inference, near 565 but not it.
- **Decisions (check 12).**
  - "The specification stays the standard": followed in what the rung reads. The rule as built still departs from the text in findings 1 and 2.
  - "The library route.": no prelude declaration.
  - "The library's own practice is the standard.": no library edit, and no workaround in the library for the capture.
  - Answer 9 and the coverage check: untouched (`satisfiesReturnTypeRule`, `satisfiesPositionalRule`, `coverageRule` and `coversOverlap` are not in the diff). The top level now runs `returnTypeCheck` on pairs of functional methods it accepts, which is answer 9's rule applied to more pairs, not changed.

## 8. Differentials

| program | walk | compiled, base | compiled, head | verdict |
|---|---|---|---|---|
| `SkSelfAtZero` | C, A | refused at top level | C, A | agree; specification valid |
| `SkSelfAtOne` | C, A | refused, top level and trait C | refused in trait C | specification against compiled: finding 2 |
| `SkInAtOne` | true | refused, both | refused in trait C | finding 2 |
| `SkNoMeetTwoParams`, `SkNoMeetSelfAtOne` | A | refused, both | refused in trait D | compiled right; walk is row 544 |
| `SkUnrelatedOnly` | AB | refused at top level | A B | agree; specification valid |
| `SkFmUse` (one api) | a | refused in the api | runs `a` | compiled head wrong: finding 1 |
| `SkFmUse2` (two apis) | a | runs `a` | runs `a` | both wrong, pre-existing |
| `SkFmUse3` | a a | refused in the api | `a   a` | loud to quiet |
| `SkFmLocal` | a | refused, both | refused in trait Z | compiled right |
| `SkCapFmGen`, renamed | Missing type G | refused (captured), renamed ZipException | ZipException, both | capture fixed; row 563 |
| `SkCapDot`, `SkCapCall`, renamed | v5 | v 5 | v 5 | unchanged controls |
| `SkKindEnvSub` | true, false | I is not in the kind env | true, false | agree |
| `SkCharLit` | q, char q | q, char  q | q, char  q | unchanged; row 76 |
| `SkMixedTop` | refused | refused | refused | unchanged; row 545 |
| `SkBetween`, `SkBetweenC` | B | memo on accepted, off refused | refused both | memo fixed; finding in section 4 |

## 9. Required corrections (besides the refusal's one thing)

1. Findings 1 and 2: each needs a home before the second skeptic.
   - Repaired (home 1): an assertion that fails on `573381500` and passes at the head. Finding 1's api form fails on the base with "in API", finding 2's with "in trait C".
   - Deferred (home 2): an XXX test, a ledger row, the stop "The Meet Rule dropped ..." in stopsMet, and Pavol's line.
   - Either way, the count and distance stages run again.
2. The memo's gated test: add a program the memo hid on the base under the harness (section 4), seen failing on `573381500` through `junit.sh` and passing at the head. Correct the report's sentence that none exists, and the defectHomes line for the memo.
3. The capture's functional-method branch (`OverloadingChecker.scala:142-146`): an assertion seen failing on the base, for example `SkCapFmGen`'s program keyed on what the head gives.
4. In the report and forPavol:
   - section 5's "No pair the base checked goes unchecked";
   - section 12's "the Meet Rule is kept for every type that provides both functional methods";
   - "Each wants a library device of rung M's kind", wrong for the 26 `IN` sites while finding 2 stands;
   - `:201` should be `:200`.
5. The gather writes `record.md` from `recordText`. No skeptic has checked it.

## 10. Recommended ledger rows (if not repaired in the repair round)

- **A component's type that inherits two functional methods of one name from apis, with no meet, is not checked by the compiled overloading checker.** `toFunctionalMethodArrows` keeps only declarations with bodies in a component, and an api's declarations carry none. `SkFmUse2`, two apis, compiles and runs `a` on the base and the head. The one-api `SkFmUse` is refused on the base and runs at the head. Specification: the Meet Rule for Functional Methods, and "provides" (`traits.tex:528-529`).
- **The per-provider check compares the meet without the domain's first element, which is the self parameter only when self is first.** `SkSelfAtOne` and `SkInAtOne` are refused "in trait C" though `C` declares the meet. `SkSelfAtZero` is accepted. Walk runs all three. Cause: `OverloadingChecker.scala:575`, `TypeSchemaAnalyzer.scala:67-72`.

## 11. For Pavol

- Finding 1's case, as a decision of the rule's scope: in a component, the per-provider check reads declarations with bodies only. That leaves out a component's own abstract declarations, which the worker listed, and every declaration inherited from an api, which is finding 1. User programs, microGPT among them, are such components.
- Finding 2's consequence for the library: the 26 `IN` per-provider api sites cannot be cleared by declarations on the meet until the check reads the self position.
