# Skeptic: climb batch N, run 1, rung I (`rung-inference-checker`), second judgement

**Verdict: approved, with required corrections.** The repair round did what the judge ordered, and its two departures from the ruling are right. Σ′ is ranked whole, a generic in it is compared on its declared domain, and the numeral tie resolves over every candidate. The fallback of a call written `f(x)` reports the binding. Every defect the first judgement measured has its home.

My own probes found one thing neither the first judgement nor the judge found. It is present since the first pass. The first attempt is taken with the expected type, so a generic declaration that fits the call's arguments as they are, but whose result the expected type refuses, is not among its candidates. A plain declaration reached only by coercion, whose result the expected type takes, then wins in the second attempt.
- `k[\T extends N\](x: T): T` beside `k(x: V): V`, with `V` coercing from `N`: `a: V = k(NOf(1))` runs `k(V)` and prints 99. The base and walk run the generic and print 1 (`probes/skeptic/S2CtxConvWinsW.diff.txt:6`, `:14`, `:19`). The first pass's build prints 99 too (`probes/skeptic/S2CtxConvWinsW.r1.txt`).
- This is the stop the batch record reserves for Pavol: "a ranking that lets a declaration needing a conversion win over one that fits the call as it is". The worker reports it as not met.
- It departs from decision 1 of the conversion judgement: "a conversion is applied to make a call possible and never changes which declaration runs when one already fits". It also departs from the coercion chapter, whose Σ is "the set of parameter types of functional declarations of f that are applicable to the call", with no expected type in it (`Specification/basic/conversions-coercions.tex:529-537`, `:472-476`).
- At a method invocation the base already does this (`O.km(NOf(1))` prints 99 on both builds, `probes/skeptic/S2CtxConvWins.diff.txt:8`, `:17`). The rung extends that behaviour to a call written `f(x)`.

I do not refuse over it. The stop is one the batch record reserves for Pavol, and he ruled that such stops are reversible and land, listed for his review (POSITIONS 2026-09-27, on the stops a batch record reserves for him). But the record must say the stop is met, the defect is owed its gated expected failure in this batch, and its ledger row must be opened. Those are required corrections 1 to 3.

Below, `R/` stands for `explorations/compile-ladder/rung-inference-checker/`, and `F` for `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala` on the branch at `2348ea6b1`. The first judgement follows this one, below the rule.

## 1. What I read and ran

- **The briefing**, all three parts of `explorations/coordinator/tools/facts-extract.sh` with this role's keys:
  - the six POSITIONS entries;
  - rows 401, 388, 455, 447, 484 and 391;
  - the judgement's sections 1 and 4;
  - the shadow's sections 5 and 7;
  - the applicability section;
  - the applicability methods and `moreSpecificCandidate`;
  - the harness entry.

  The two keys naming the pre-rename `XXX` files were not found, since the rung renamed them. I read the renamed files.
- **The records.** Rung I's section of `explorations/coordinator/CLIMB-BATCH-N.md`, my first judgement (below) and the judge's ruling, `R/JUDGE.md`. Also the worker's structured result, whose `REPORT.md` the harness refused, and `R/record.md`, committed at `2348ea6b1`.
- **The branch.** Ten commits past `bce66f1fa`, a clean worktree. I read the net diff of the five Scala files, and the repair round's own diff (`git diff 13ba3f3f0 HEAD -- ProjectFortress/src/`), line by line.
- **The machine** for everything below: nproc 4, Intel Xeon @ 2.10 GHz, 2100 MHz, loads 0.06 to 1.30 at the starts, OpenJDK 25.0.4, `FORTRESS_THREADS=1`. The rung touches no mutable state, transaction or library code that writes, so every differential ran at one thread.
- **The builds.**
  - The rung's side is `ProjectFortress/build`, newer than every edited source, with `tmp/caches-after`, rebuilt by the repaired checker.
  - The base's side is `tmp/build-base` with `tmp/caches-base`.
  - The first pass's side is `tmp/build-r1` with `tmp/caches-r1`.
  - The driver is my first judgement's `R/probes/skeptic/skdiff.sh`.

## 2. The provenance block

Every line opened with `sed -n`:
- `problem: ProjectFortress/compiler_tests/NatLitArgChecker.fss:15` is `scale(Box[\3\](2), 3)`.
- `spec: Specification/basic/conversions-coercions.tex:472-476` is the order of choice, "we first determine whether there exists a declaration that is applicable without coercion". It is a prose chapter.
- `precedent: F:437-452` is `checkApplicableWithoutInference`'s coercion building.
- `deviation: explorations/reviews/inference-rule-shadow/rule.patch:200` begins the shadow's attempts.
- `historical:` names the five 2012-tree files the diff edits, each at an edited declaration: `F:126` `checkApplicable`, `Operators.scala:85`, `STypesUtil.scala:1073` `moreSpecificCandidate`, `CoercionOracle.scala:81` `moreSpecificDeclared`, `TraitTable.scala:101` `coercingTraits`.

The block holds.

## 3. The recorded failures

- **The first pass's** recorded failure (`R/probes/pre-edit/NatLitArgChecker.txt:5-6`) was checked in the first judgement and stands.
- **The repair round's** failures were captured at 03:25 UTC, "tree e16135bb1 with its working changes", on the first pass's build:
  - `R/probes/repair-pre/InferSigmaWhole.txt`: "FAIL: g(W2, Any) =/= g(W1, T)";
  - `R/probes/repair-pre/InferNumeralTie.txt:5`: the `pickb(3000000000)` refusal;
  - `R/probes/repair-pre/XXXInferSigmaTie.txt` and `R/probes/repair-pre/XXXInferFallbackMessage.txt`: "Saw wrong failure".
- **The order.** They were committed in `d85223560` at 03:31. The earliest source edit is `STypesUtil.scala`'s mtime, 03:26:27, and the edit was committed in `4a51a0ef4` at 03:53. So every failure predates the edit.

## 4. The diff against the specification

The repair round touches `F` and `STypesUtil.scala` only, as the judge ordered (its step 4g). Checked against the ruling, point by point:
- **Σ′ ranked whole.** `holds` (`F:646-649`) counts only uncounted candidates in an attempt by subtyping. The coercion attempt reuses the plain candidates' entries (`F:626-632`, sound because `checkApplicableWithoutInference` takes no context). A generic of the coercion attempt carries its declared arrow (`F:639`).
- **The comparison.** `moreSpecificCandidate`'s `(true, true)` case is the judge's decision (d), and its `(false, false)` case is the first pass's (`STypesUtil.scala:1102-1110`). Called with two arguments it is the team's method, which the one other caller relies on (`CoercionOracle.scala:252`).
- **The numeral tie** keeps its gate over `top` and chooses over every candidate of the kept attempt, the reading's own Σ first. A bare type-parameter position of a declared generic is fitted by the parameter's bound (`F:695-739`). This is the judge's section 3.2 as ordered.
- **`counted`** (`F:645`) replaces `converted`, as the judge's step 4e orders.
- **The fallback's departure** for a call other than `f(x)` is right. The judge's form changed `XXX6bu`'s pinned message: I read `R/probes/repair/judge-fallback/suite-seed-1a0dba81ab2.txt:54-62` against `ProjectFortress/compiler_tests/XXX6bu.test` and `Compiled6.bu.fss:21`. The batch record names `XXX6bu` among the tests that keep their verdict. The judge's rule is not a decision of Pavol's, and the worker's form keeps the base's message for every call but `f(x)`.
- **The `XXX` run test's key.** `run_out_contains=REACHED` is right. `FileTests.java:534-537` sets `trueFailure` from the check key whatever the exit code, and `:583-585` fails the test on it before the expected-failure comparison. So the judge's `run_out_contains=PASS` could never pass as an expected failure.

**What is not as the report says** (section 9's "Not met ... no ranking lets a converted declaration win over one that fits"; section 3.3, item 3; the FACTS line's "when none fits as it is"):
- The attempts are ordered with the context first and coercion second: by subtyping with the context, then with coercion and the context, and only then by subtyping without the context (`F:652-656`).
- A generic whose instance fits the arguments by subtyping is refused by the first attempt when its result does not fit the context. `inferStaticParams` adds "range <: context" (`useful/STypesUtil.scala:932-947`).
- The second attempt then keeps any declaration reached by coercion whose result fits.
- **Measured** (`R/probes/skeptic/S2CtxConvWinsW.fss`: `trait V excludes { N }` coercing from `N`, `k[\T extends N\](x: T): T` beside `k(x: V): V`):
  - `a: V = k(NOf(1))` prints 99 on the rung's build (`S2CtxConvWinsW.diff.txt:6`), and 1 on the base's (`:14`) and under walk (`:19`).
  - Untyped, `b = k(NOf(1))` prints 1 everywhere (`:7`, `:15`, `:20`).
  - The first pass's build prints 99 (`S2CtxConvWinsW.r1.txt`), so the repair round did not introduce this.
- **The numeric twin** (`S2CtxConvWinsZ`, `k(x: ZZ64): ZZ64` beside `k[\T\](x: T): T`, `a: ZZ64 = k(z)`):
  - The rung runs `k(ZZ64)` and prints 64 (`S2CtxConvWinsZ.diff.txt:6`), where the base runs the generic.
  - Both then die of a pre-existing `VerifyError` in the generic's `ZZ32` instance (`:7-8`, `:32-33`; recommended row 2).
  - Walk refuses the set at load (`:58`).
- **At a method invocation** the base already takes the converted declaration: `c: V = O.km(NOf(1))` prints 99 on both builds (`S2CtxConvWins.diff.txt:8`, `:17`). So this is today's behaviour extended from a method invocation and an operator to a call written `f(x)`, where decision 3 keeps the context.
- **What the specification settles** (rule 4 of the brief: the specification settles it against the compiled run). The call's Σ is taken on the arguments alone (`conversions-coercions.tex:529-537`; applicability, `:417-432`). Answer 9 and decision 1 put inference after the choice ("inference instantiates the chosen declaration; it does not precede the comparison"). Decision 1 says a conversion "never changes which declaration runs when one already fits". Decision 3 keeps the context "with a retry without it, so that a binding's coercion still applies"; it does not order the retry after coercion. The shadow chose that order, and my first judgement and the judge accepted it without this case. So the answer is 1: the generic, whose result the binding then converts.
- **The repair lies outside what a second round can take.** It is a reorder of the attempts (subtyping without the context before coercion with it), and it moves the message and instance of other calls. The rung lands with the stop listed (the fourth case), a gated expected failure and a row (corrections 1 to 3). The alternative goes to Pavol.

Nothing else in the diff goes beyond the report. The edit is as small as the ruling allows: 327 lines of `Functionals.scala` net, of which the repair round's are the attempts, `holds` and `kept`, the fallback, `Ranked`, and the nested `numeralTie`.

## 5. The precedent search

- The worker's is right and cited: the shadow; the team's coercion building, oracle and trait-table iteration; and the overloading oracle's `lteq` for declared domains.
- For the new tests it followed `XXXShiftDeclRungI` (an `XXX` compiled test promoted at the switch-over, POSITIONS 2026-09-24, row 383), and `XXXCoercionAnyOverloadRungC` with its link test for the `REACHED` form. Both are the corpus's own ways.
- I found no library or test device it should have used instead.
- The count of sites stands: one ranking site, one comment where the check belonged, and one other caller of the ranking, left on the two-argument form.

## 6. The tests

- Every new or promoted `.fss` carries one comment line (checked over all nineteen). Assert messages carry the citations and nothing else.
- The home-1 assertions of the first judgement's defects are in place and pass: `InferSigmaWhole.fss:28-30`, `InferNumeralTie.fss:27-28`, `XXXInferSigmaTie`, `XXXInferFallbackMessage`.
- **My suite-shaped run** shuffled the twenty-seven `.test` files of `R/suite-list.txt` in one JVM from a cold cache under a seed of my own, 424242. It gave 54 of 54, 114 s (`R/probes/skeptic/S2-suite-seed-424242.txt`).
  - Every `XXX` file in it prints "Saw expected failure", its check key met.
  - `XXX6bu`, `XXXCoercionAnyOverloadRungC`, `NatRtBigSize` and `WitnessIdentityRungG` keep their verdicts.
- **The `.test` forms** are right:
  - `XXXInferPromoteNN32.test` is `run` with `run_out_contains=REACHED`, and `InferPromoteNN32Link.test` is `link`.
  - The compile `XXX` files use `compile_err_contains`.
  - `XXXInferPromoteNN32` was shown red on a deliberate fix, "Did not see expected failure" (`R/probes/xxx-red/XXXInferPromoteNN32-deliberate-fix.txt`).
- **`InferCoercionShapes`'s `P`, `Q`, `R` assertion** is a sound replacement for the `ZZ,ZZ` pin. Subtyping binds `OR(P,Q)` on the base (`R/probes/repair/PQRReveal.base.txt:4`), so the promotion is what answers `R,R`.

## 7. Competing declarations

- **Test components.** Each of the twenty test components the rung adds or renames is declared once across `compiler_tests/`, `tests/`, `Library/` and `LibraryBuiltin/`. `InferPromoteNN32Link` is a `.test` file only.
- **Scala names.** `checkApplicableWithCoercion`, `isNumeral`, `numeralReading`, `numeralTie`, `signalAmbiguity`, `moreSpecificDeclared`, `getCoercionTargetsFrom` and `coercingTraits` are each declared once across `ProjectFortress/src/com/sun/fortress/`.
- **Callers.** `checkApplication` has five callers (`F:882`, `:911`, `:1001`, `:1068`, `:1152`), all compiling against the new signature. `:1152` is batch 7R's rung J's `SCaseExpr` case, which passes `Some(Types.BOOLEAN)` and no fallback flag. It is untouched.

## 8. The record fragment

- **Rows 401, 455, 391, 388, 447, 485, 484, 390 and 442** are cited by number, and none is renumbered.
- **Rows 391 and 455** now stay open, as the first judgement and the judge required.
- **The provisional rows 504 to 507** are stated so that a reader can check them. Each cites a tracked capture (section 16).
- **What is untrue as written:**
  - The FACTS line's "An attempt by subtyping counts only candidates without a coercion the call needs, so when none fits as it is, the attempt with coercion ranks every declaration applicable with coercion" (correction 1). The attempt counts the candidates that fit *under the expected type*.
  - The report's section 9 "no ranking lets a converted declaration win over one that fits".
  - The worker's `stopsMet`, which omits the stop.
- **The rest** of the FACTS lines, the handover line and the row notes are true as written. I checked them against the captures they cite and against section 13's probes.

## 9. The three homes

| defect | measured by | home as landed | holds? |
|---|---|---|---|
| Σ′ split (`SkSigmaMore`, `SkSigmaTie`) | first skeptic | 1: `InferSigmaWhole.fss:28-29`, `XXXInferSigmaTie` | yes, passing in my suite run; also at a method and an infix operator (`S2SigmaForms.diff.txt:6-9` against `:16-19`) |
| a generic's instance outranking a plain declaration below its declared domain (judge 2.2) | judge | 1: `InferSigmaWhole.fss:30` | yes |
| the numeral tie by magnitude (`SkNumeralBig`) | first skeptic | 1: `InferNumeralTie.fss:27-28` | yes |
| the `f(x)` fallback's message (`SkCtxMsg`) | first skeptic | 1: `XXXInferFallbackMessage` | yes |
| `pick(z, u)` answering `ZZ` (row 442) | worker | 2: `XXXInferPromoteNN32` with its link test, shown red on a deliberate fix | yes |
| the untyped lambda and the 64-combination cap | first skeptic | 2: `XXXInferLambdaArg`, `XXXInferComboCap`, rows 507 and 506 | yes |
| row 455's argument and loose-juxtaposition faces | judge | 2: `XXXInferContextDrops` (3 errors) | yes |
| the solver's two behaviours; `c1`'s `VerifyError`; `SigmaResultOnly`'s `NoClassDefFoundError` | worker, first skeptic | 3: probes and rows 505 and 447; specification silent (`Specification/basic/inference.tex:24-25`) | yes |
| **the context keeping a generic that fits out of Σ, so a converted declaration wins** (`S2CtxConvWinsW`) | this judgement | none | **corrections 1 to 3: home 2** (`conversions-coercions.tex:529-537`, `:472-476`; decision 1). The draft test is `R/probes/skeptic/draft/XXXInferContextKeepsFit.fss`: REACHED then "FAIL: 99 =/= 1" on the rung's build (`draft/XXXInferContextKeepsFit.rung.txt`), PASS on the base's (`draft/XXXInferContextKeepsFit.base.txt`) |
| the `VerifyError` of an overloaded generic's instance beside a plain declaration with a wider result (`S2CtxConvWinsZ`) | this judgement | none | recommended row 2, a note on row 496. It is pre-existing: the base dies the same way |
| the tied declarations listed in a varying order in the ambiguity message | this judgement | none needed | the tests pin the message's head. Within one JVM the order differs between the compile and link steps (`R/probes/repair-pre/InferNumeralTie.txt:5` against `:9`). It is a message defect, noted and not required |

## 10. The count table

- **The count.** `R/probes/checker-count-repair.txt` reads `#total 75`, crash `none`, line for line the landed `explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt`.
- **The distance.** `R/probes/distance-repair.txt` reads `#total 626`, its `#crash` rows the landed table's. `R/probes/distance-sites-repair.tsv`, sorted, equals the landed `distance-sites.tsv`: `diff` prints nothing.
- **The report, the record and the structured result** all declare 75 and 626, so there is no mismatch.
- **The before.** `git log d9c62446e..bce66f1fa -- Library/ ProjectFortress/` prints nothing, so the landed tables are the right before.

## 11. The ledger and the sibling sites

- **The ledger.** I searched it for the expected type, coercion, dispatchers and `VerifyError`. No row holds the context case of section 4. Row 455 records the kept context and its retry, not the choice between declarations.
- **The nearest dispatcher row** is 496, a generic declaration beside a plain one dying on the `ZZ32` spelling or a cast. `S2CtxConvWinsZ`'s `VerifyError` is a further face of it (recommended row 2).
- **The sibling sites of the repaired defect.**
  - Every application goes through the one `checkApplication` (section 7).
  - Σ′ ranked whole holds at a method invocation, an infix operator and a typed `f(x)` alike (`S2SigmaForms.diff.txt:6-9`).
  - The subscript's form (`F:882`) takes the same attempts.
  - Walk's sibling, its coercion pass skipping generic declarations, is rung K's (row 389).

## 12. The decisions on record

- **The numerics plans' decision 3**: the context kept at `f(x)` with a retry. Built as worded.
- **The conversion judgement's decision 1**: Σ′ over all declarations, specificity on declared domains, the numeral tie. Built, with one exception: the context case above. There the landed rule is narrower than the decision. It takes applicability under the expected type where the decision takes it on the declared, quantified domain. That is a finding for repair, carried here as corrections 1 to 3 since the stop is Pavol's.
- **Answer 8**: the promotion. Built; the `ZZ` under the compiler library is gated as row 442's expected failure.
- **A numeral's type** (2026-09-27). The one library's `IntLiteral` is rung Q's; the rung reads a numeral through either library's `IntLiteral` (`numeralReading`, `F:408-421`).
- **The JVM principle**: the `ZZ32` default. Honoured.
- **The stops a batch record reserves**: applied to the solver stop by the worker, and to the context case by me.
- **For the gather's check of rung T's chapter:** T may state decision 1's rule, that a conversion never changes the declaration when one fits. Rung I's build departs from it only in the case the new expected failure pins. So that mismatch is settled by the decisions and is not blocking.

## 13. The differentials

Each program is mine, compiled and run on the rung's build and on the base's, and run under walk; the three answers are in `R/probes/skeptic/<Name>.diff.txt`.

| program | rung (compiled) | base (compiled) | walk | outcome under rule 4 |
|---|---|---|---|---|
| `S2CtxConvWinsW`: `a: V = k(NOf(1))`, `k[\T extends N\](x: T): T` beside `k(x: V): V` | 99 (`:6`) | 1 (`:14`) | 1 (`:19`) | the specification settles it against the compiled run (section 4); a gated expected failure and a row |
| `S2CtxConvWins`: the same, and `O.km(NOf(1))` | 99; 99 (`:6`, `:8`) | 1; 99 (`:15`, `:17`) | stops at the generic method (row 21) | the method form is the base's |
| `S2CtxConvWinsZ`: `a: ZZ64 = k(z)`, `k(x: ZZ64): ZZ64` beside `k[\T\](x: T): T` | 64, then `VerifyError` at `b = k(z)` | `VerifyError` | refuses the set at load | the same as the first row; the `VerifyError` is pre-existing |
| `S2TieBound`: `f[\T extends ZZ32\](x: T, y: W)` beside `f(x: NN32, y: W)`, `f(3, NOf(1))` | `f[T<:ZZ32](ZZ32, W)` (`:6`) | `f(NN32, W)` (`:16`) | "Failed to find any matching overload" (its coercion pass skips generics; rung K) | Q1's default, a numeral read as `ZZ32` |
| `S2TieBound`: `g[\T extends Number\](x: T, y: W)` beside `g(x: NN32, y: W)`, `g(3, NOf(1))` | `g(NN32, W)` (`:7`) | `g(NN32, W)` (`:17`) | not reached | decision 1: the plain domain lies below the generic's declared one |
| `S2TieBound` and `S2Walk`: `q(x: ZZ64, y: W)` beside `q(x: NN64, y: W)`, `q(3, NOf(1))` and `q(3000000000, NOf(1))` | `q(ZZ64, W)` twice | `q(NN64, W)` twice (`S2TieBound.diff.txt:18-19`); `q(ZZ64, W)` (`S2Walk.diff.txt:14-15`) | `q(ZZ64, W)` twice (`S2Walk.diff.txt:19-20`) | agree with walk. The base's pick varies by program, which is row 391's unstable pick |
| `S2TieCross`: `r(x: ZZ32, y: ZZ64)` beside `r(x: ZZ64, y: ZZ32)`, `r(3, 4)` | refused, "Ambiguous coercion" (`:5`) | `r(ZZ32, ZZ64)` (`:19`) | "Ambiguous coercion" (`:24`) | agree with walk and the specification; the lifted stop "refuses a call with no most specific declaration that it compiles today" |
| `S2SigmaForms`: `g[\T\](x: W1, y: T)` beside `g(x: W2, y: Any)` as a method, an infix operator, and `f(x)` under `String` and `Object` | the generic, all four (`:6-9`) | the plain declaration, all four (`:16-19`) | stops at the generic method (row 21) | Σ′ ranked whole at every form |

## 14. The failure-mode question

- **`S2CtxConvWinsW`.** A quiet answer (1) became another quiet answer (99). Nothing is loud on either side, so the next person to meet it gets a different number and no message. The expected failure of correction 2 is what makes it visible.
- **`SigmaResultOnly`**, measured by the worker. A quiet `q(W2)` became a loud `NoClassDefFoundError` at run time: a quiet-to-loud move, listed under the solver stop.
- **`S2TieCross`.** The base's silent pick became a static refusal, quiet to loud and the specification's answer.
- **`pickn(-1)`**, from the first judgement. A run-time "Not in range for NN32" became `ZZ32`, the decision's answer.
- **`pick3(z, u, w)`**, from the first judgement. A `NoSuchMethodError` became `ZZ` under the compiler library, where the specification says `ZZ64` (row 442, gated by `XXXInferPromoteNN32` for the two-argument case).

## 15. Stops met

The worker's five entries stand. To them I add the reserved stop "a ranking that lets a declaration needing a conversion win over one that fits the call as it is", met at `a: V = k(NOf(1))` (`R/probes/skeptic/S2CtxConvWinsW.diff.txt:6` against `:14`, `:19`). It is lifted by POSITIONS 2026-09-27, on the stops a batch record reserves for him.

The other reserved stops of rung I are not met as far as measured:
- no compiled test's diagnostics other than the rung's own change;
- no distance site is new;
- no ladder file moves;
- no edit reaches the solver, `StaticChecker.java`, a shadowed file, the library, walk or the specification;
- no line of `explorations/run-c4/src/` or `explorations/apl/mg/` is touched.

## 16. Tracked paths

- **This file.** The prefix's loop over it prints one line once this commit lands: `MISSING` for the worker's `REPORT.md`, which the next line quotes and which the gather writes. Every other path it cites exists and is tracked, the `R/`-abbreviated ones included.
- **`R/record.md`.** The loop prints one line, `MISSING explorations/compile-ladder/rung-inference-checker/REPORT.md`. That is the file the harness refused, which the gather writes from the worker's `reportText`. Every relative `probes/` and `compile-ladder/` citation in it exists and is tracked.

## 17. Required corrections, for the commit stage

1. **The record states the stop.**
   - `stopsMet` gains "a ranking that lets a declaration needing a conversion win over one that fits the call as it is", evidence `R/probes/skeptic/S2CtxConvWinsW.diff.txt:6` against `:14` and `:19`, liftedBy POSITIONS 2026-09-27, on the stops a batch record reserves for him.
   - The report's section 9 ("Not met: ... no ranking lets a converted declaration win over one that fits"), section 3.3 item 3, and the FACTS line's "so when none fits as it is" are corrected. The first attempt is by subtyping under the expected type. A declaration that fits the call's arguments but whose result the expected type refuses is not among its candidates, so a declaration reached by coercion whose result fits can win. This is new at a call written `f(x)` and the base's at a method invocation.
   - `R/probes/stops-met.txt` and `R/probes/for-pavol.txt` gain the entry.
2. **The owed gated expected failure** (home 2; `Specification/basic/conversions-coercions.tex:529-537`, `:472-476`; the conversion judgement's decision 1).
   - Add `ProjectFortress/compiler_tests/XXXInferContextKeepsFit.fss` and `XXXInferContextKeepsFit.test` (`run`, `run_out_contains=REACHED`), with `InferContextKeepsFitLink.test` (`link`) beside it, as drafted in `R/probes/skeptic/draft/`.
   - Add both to `R/suite-list.txt`'s suite-shaped run.
   - The manifest's JUnit count for rung I becomes 42.
3. **The ledger row.** Open recommended row 1, citing that test.

## 18. For Pavol

Carried in the structured result, one entry each with its evidence: the context case and the ways to order the attempts.

---

# Skeptic: climb batch N, run 1, rung I (`rung-inference-checker`), first judgement

**Verdict: refused.** The one thing that must change:
- Rank Σ′ whole. A generic declaration that applies to a call only with coercion must be compared and tie-checked together with the plain declarations that apply only with coercion. That is the coercion chapter's order (`Specification/basic/conversions-coercions.tex:533-553`) and decision 1 of the conversion judgement (POSITIONS 2026-09-28, the two decisions of the conversion judgement): "declarations are chosen by the coercion chapter's order ... (a generic declaration fits when some instance within its bound fits)".
- As built, `checkApplication` keeps the first attempt that finds any candidate. That attempt already holds every plain declaration applicable with coercion, because `checkApplicableWithoutInference` builds its coercions. So the coercion attempt, the only place a generic declaration is admitted with coercion, is never reached while a plain declaration applies with coercion (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:622-645`).
- Measured, `probes/skeptic/`:
  - `SkSigmaMore`: `g[\T\](x: W1, y: T)` beside `g(x: W2, y: Any)`, with `W1 <: W2` and both coercing from `N`, called `g(NOf(1), 5)`. It runs `g(W2, Any)` (`SkSigmaMore.diff.txt:6`). The coercion chapter's order takes the generic, whose declared domain is below the plain one's. The all-plain twin `p(W1, Any)` beside `p(W2, Any)` takes `p(W1, Any)` (`:7`).
  - `SkSigmaTie`: `f[\T\](x: A, y: T)` beside `f(x: B, y: Any)`, with `A` and `B` coercing from `N` and excluding each other. It compiles and prints `f(B, Any)` (`SkSigmaTie.diff.txt:4-6`). Its all-plain twin `SkSigmaTiePlain` is refused, "Ambiguous coercion in call to function f" (`SkSigmaTiePlain.diff.txt:5`).
  - Walk answers as the rung's build does on both today (`SkSigmaMore.diff.txt:19`, `SkSigmaTie.diff.txt:17`), because walk's coercion pass skips generic declarations. Rung K removes that skip, so after the merge the two paths part on these shapes.
- This contradicts the decision in a case it names, and it contradicts the rung's own FACTS line, which says the checker "refuses a call reached only by coercion with no most specific declaration unless the tie is a numeral's".
- The run-2 switch makes Σ empty for every call whose numeral argument meets a declared number type. That is when Σ′ mixes generic and plain declarations most.

After the repair, both shapes need an assertion in the rung's gated tests before the second skeptic runs: a plain test that `g(NOf(1), 5)` runs `g(W1, T)`, and an `XXX` compile test pinned to the ambiguity message for `SkSigmaTie`'s call. The repair round also has to close the required corrections in section 12.

Below, `R/` stands for `explorations/compile-ladder/rung-inference-checker/`.

## 1. What I read and ran

- The briefing, parts 1 to 3 of `explorations/coordinator/tools/facts-extract.sh`: the six POSITIONS entries, rows 401, 388, 455, 447, 484 and 391, the judgement's sections 1 and 4, the shadow's sections 5 and 7, the applicability section, the applicability methods, `moreSpecificCandidate` and the harness entry. Two keys, the pre-rename `XXXNatLitArgChecker.fss` and `XXXCoercionGenericFnCompiledRungC.fss`, were not found because the rung renamed them. I read the renamed files.
- Rung I's section of `explorations/coordinator/CLIMB-BATCH-N.md`, and its section 1.
- The branch: four commits past `bce66f1fa` (`4dc6f90c4` the failing tests and base captures, `8de87af6c` the edit, `5a949ad17` and `3e3a8adbf` the measurements), clean. `REPORT.md` and `record.md` are not on the branch, since the harness refused their writes. I read them from the worker's structured result.
- The machine for everything below: nproc 4, Intel Xeon @ 2.10 GHz, 2100 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`. Loads at the start of runs were 7.7 to 9.4, with the batch's other rungs on the machine.
- The rung touches no mutable state, transaction or library code that writes. So the differentials ran at one thread only.
- Base comparisons use the worker's snapshot of the base's classes (`tmp/build-base`; checked: it lacks `checkApplicableWithCoercion` and `getCoercionTargetsFrom`) with the base-built library cache `tmp/caches-base`. The rung's side uses `ProjectFortress/build` (newer than every edited source) with `tmp/caches-after`.
- The driver is `R/probes/skeptic/skdiff.sh`. For each program it compiles and runs on the rung's build and on the base's, and runs walk. Each capture, `<Name>.diff.txt`, holds the three.

## 2. The provenance block

Every line opened with `sed -n`:
- `problem: ProjectFortress/compiler_tests/NatLitArgChecker.fss:15` is `scale(Box[\3\](2), 3)`. It says what the block says.
- `spec: Specification/basic/conversions-coercions.tex:472-476` is "For a given functional call, we first determine whether there exists a declaration that is applicable without coercion ...". It is a prose chapter.
- `precedent: .../Functionals.scala:437-452` is `checkApplicableWithoutInference`'s coercion building, at its post-edit line numbers.
- `deviation: explorations/reviews/inference-rule-shadow/rule.patch:200` is the shadow's attempts.
- `historical:` names all five 2012-tree files the diff edits (`Functionals.scala:126`, `Operators.scala:85`, `STypesUtil.scala:1071`, `CoercionOracle.scala:81`, `TraitTable.scala:101`). Each line is an edited declaration.

The block holds.

## 3. The recorded failure

It exists and predates the edit. `R/probes/pre-edit/NatLitArgChecker.txt:5-6` ("not applicable to an argument of type (Box[\3\], IntLiteral)") was captured at 23:10 on the base and committed in `4dc6f90c4` at 23:18. The edit was committed in `8de87af6c` at 23:51.
- The three conversion-rule tests fail on the base with their stock lines (`R/probes/pre-edit/InferOpAnyZW.txt`, `InferO2Z64.txt`, `InferO2Num.txt`).
- `InferNumeralTie` fails with "NN32 =/= ZZ32".
- `XXXInferAmbiguousCoercion` compiles, "Saw wrong failure".
- The guards pass.

## 4. The diff against the specification

What it does is as the report says, with these exceptions.
1. **Σ′ is split** (the refusal, above). The attempts' order is the shadow's, and decision 3 does not fix it. But decision 1 postdates the shadow and fixes the choice among declarations, and the split contradicts it.
2. **The numeral tie by magnitude reads only among the tied maximal candidates.** `numeralTie` is handed `top` only (`Functionals.scala:683`), so a declaration the reading fits but that is not maximal is never a choice.
   - `SkNumeralBig`: `pickn(x: NN32)`, `pickn(x: ZZ32)` and `pickn(x: ZZ64)`, called `pickn(3000000000)`. It is refused, "Ambiguous coercion in call to function pickn ... NN32->String; ZZ32->String" (`SkNumeralBig.diff.txt:5`). The base compiled it (`:19`, `NN32`), and walk answers `ZZ64` (`:23`).
   - Q1's default reads this numeral as `ZZ64` (the judgement's section 4: "the numeral is read as ZZ32, or ZZ64 or ZZ by magnitude"). A `ZZ64` fits `pickn(ZZ64)` as it is. So the refusal is against the decision it implements.
   - The report's claim ("takes the most specific declaration that reading is substitutable for") is untrue here.
   - The small cases hold: `pickn(3)`, `pickn(-1)`, a method `O.m(3)`, an operator `3 FOO 4` and `q(3, z)` all take the `ZZ32` declaration, as walk does (`SkNumeralSmall.diff.txt:6-10` against `:23-27`).
   - On the base, `pickn(3)` took `NN32` and `pickn(-1)` died at run time, "Not in range for NN32: -1" (`:17-19`). The rung repairs that.
3. **The fallback for `f(x)` reports a call the rule accepts as not applicable.**
   - `SkCtxMsg`: `s: String = scale64(bS, 3)`, the rung's own row-401 call under a context its result does not fit. It reports "[\T extends Object\](BoxT[\T\], ZZ64)->ZZ64 is not applicable to an argument of type (BoxT[\String\], IntLiteral)" (`SkCtxMsg.diff.txt:6`).
   - The call is applicable under the rule: the fourth attempt, with coercion and without the context, finds it. The fallback takes the third attempt, by subtyping, which finds nothing.
   - The plain twin, `t: String = plain64(bS, 3)`, reports the binding, "Right-hand side has type ZZ64, but declared type is String" (`:8`).
   - The text is today's, as the worker says, but today it was true and now it is false.
4. **Messages.** The report says the rung changes one line of its solver probe (section 6.6). Its own capture shows two.
   - `c3(): Seen = bAny()` goes from "Could not infer static argument T extends Any without context" to "[\T extends Any\]()->BoxA[\T\] is not applicable to an argument of type ()". That is `R/probes/solver/SolverResultOnly.base.txt:12-14` against `.after.txt:9-11`, through TestsD, `fortress typecheck`'s setting.
   - Through `fortress compile` the same program keeps the base's message (`SkSolverCopy.diff.txt:10-12` against `:35-37`), so the change depends on the phase order.
   - The stop is lifted, but the report has to say it.
5. **Row 455's other faces.** Beyond `f(x)`, the method, prefix and infix forms of row 455 are now accepted under a context: `Fac.wrap(3)`, `BOXOF 3`, `3 OPLUS 4` and `(wrapV(3))` (`SkCtxForms.diff.txt:4-5` against `:17-30`). The loose juxtaposition `wrapV 3` still drops the context, as measurement D section 1.3 has it (`:4-5`). The report does not mention these faces.
6. **Promotion forms.** A method `O.pk(z, w)`, an operator `z PK w` and `pick(idt(z), w)` promote to `ZZ64` (`SkPromoteForms.diff.txt:6-10`). `pick(z, "s")` keeps its union.
   - `pick3(z, u, w)`, for a `ZZ32`, an `NN32` and a `ZZ64`, is `ZZ` (`:8`). The base died there, `NoSuchMethodError: Union$RTTIc.factory` with three arguments (`:20-21`).
   - Walk cannot run the method form (row 21, `SkPromoteFormsW.diff.txt`).
7. **Line citations.** Section 3.1's `Functionals.scala:842` and `:1028` point inside the subscript and operator cases. The calls are at `:838` and `:1024`. Every other `Functionals.scala` line I opened says what the report says.

The size of the edit is what the rule needs. It touches nothing outside the five files and the tests.

## 5. The precedent search

- The worker followed the shadow and the team's pieces, and cites each: `checkApplicableWithoutInference`'s coercions, `buildCoercion`, `noLessSpecific`, the overloading oracle's `lteq`, and the trait table's memo and iteration.
- It counted the sites: one ranking, one comment where the most-specific check belonged, and one other caller of the ranking (`CoercionOracle.scala:252` on the branch).
- I found no library device it should have used instead.
- The precedent for a prelude gap under a gated compiled test is POSITIONS 2026-09-24, row 383: an `XXX` compiled test promoted at the switch-over. That bears on correction 2.

## 6. The tests

- Every test file carries one comment line, pointing at the rung's report (the two promoted keep their own).
- Assertion messages carry the citations.
- My own suite-shaped run shuffled the nineteen `.test` files of `R/suite-list.txt` in one JVM from a cold cache under a seed of my choosing, 20260929 (the worker's was 1790391622322). It passes 44 of 44 (`R/probes/skeptic/suite-seed-20260929.txt:110`).
- The tests exercise the defects they name, with one exception. `InferCoercionShapes.fss:50` asserts `pick(z, u)` is `"ZZ,ZZ"`.
  - That is the answer the compiler prelude gives because its `ZZ64` declares no coercion from `NN32` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:147-149`).
  - The specification says `ZZ64` "coerces from ZZ32 and NN32" (`Specification/basic-lib/basic-integers.tex:25`, and `:36-37`), and answer 8 names `ZZ64` for this pair. Row 442 already records the prelude's missing coercion.
  - The batch record's own test list asks for "`ZZ32` with `NN32` giving `ZZ64`".
  - So the assertion pins a recorded defect as the expected answer (correction 2).

## 7. Competing declarations

- The new Scala names (`checkApplicableWithCoercion`, `isNumeral`, `numeralReading`, `numeralTie`, `signalAmbiguity`, `moreSpecificDeclared`, `getCoercionTargetsFrom`, `coercingTraits`) are each declared once across `ProjectFortress/src/com/sun/fortress/`.
- The twelve test components are each declared once across `compiler_tests/`, `tests/`, `Library/` and `LibraryBuiltin/`.
- Every caller of the changed signatures compiles: the single-argument `checkApplication` has two callers, `:867` and `:957`.

## 8. The record fragment

These parts are wrong as written:
- **The FACTS line and the handover line** say a call reached only by coercion with no most specific declaration is refused. `SkSigmaTie` compiles. They also say a converted numeral tie reads by magnitude. `SkNumeralBig` is refused.
- **Row 391 is closed as POSITIVE-VERIFIED.** The row's specification answer is a refusal of the declarations (`Specification/advanced/overloading.tex:196-216`, the incompatibility rule; `:247-273`, the Meet rule). The rung does not build it, and its own note says so. So the row stays open with its call-site half fixed.
- **Row 505 and the note on row 447** describe the newly accepted `c1(): ZZ32 = fAny()` as bound to `BottomType` and say nothing of what it does. Compiled and run, it fails JVM verification (section 10).

Rows 401, 455, 388, 484, 485 and 390 are cited by number, and none is renumbered. Every capture they cite exists and is tracked (section 13). The provisional rows 504 and 505 are stated so that a reader can check them.

## 9. The three homes

| defect | measured by | home as landed | holds? |
|---|---|---|---|
| rows 401, 388 (compiled half), 455; answer 8's promotion; the O2Z64 union instance (504) | worker | 1: promoted and new tests | yes: they pass in my suite run |
| row 391 (all-plain tie) and the numeral tie | worker | 1: `XXXInferAmbiguousCoercion`, `InferNumeralTie` | yes. The `XXX` was shown red on a deliberate fix (`R/probes/xxx-red/XXXInferAmbiguousCoercion-deliberate-fix.txt:6`, `:11`). |
| the solver's two behaviours (505) | worker | 3: `R/probes/SolverResultOnly.fss` with its two captures; specification silent (`Specification/basic/inference.tex:24-25`) | yes |
| Σ′ split (`SkSigmaMore`, `SkSigmaTie`) | skeptic | none | the refusal: home 1 after the repair |
| the numeral tie by magnitude (`SkNumeralBig`) | skeptic | none | correction 1: home 1 |
| `pick(z, u)` pinned at `ZZ` (row 442's prelude gap) | worker | a plain assertion of the defect's answer | correction 2: home 2 |
| the fallback message (`SkCtxMsg`) | skeptic | none | correction 3: home 1 |
| an untyped lambda argument (`SkLambdaArg`) | skeptic | none | correction 4: home 2, or repaired |
| the 64-combination cap (`SkComboCap`) | skeptic | none | correction 4: home 2, or repaired |
| `c1` now compiles and fails verification (`SkBottomRun`) | skeptic | none | correction 5: a note on row 447 and row 505, home 3 (specification silent, `inference.tex:24-25`) |

## 10. The failure-mode question

- **`c1(): ZZ32 = fAny()`, with `fAny[\T extends Any\](): T = throw InvalidRange`.**
  - On the base the checker refused it with a clear message, "Could not infer static argument T extends Any without context" (`SkBottomRun.diff.txt:26`).
  - The rung's build compiles it (rc 0). The compiled run dies loading the class, "java.lang.VerifyError: Bad return type ... Type 'java/lang/Object' ... is not assignable to 'com/sun/fortress/compiler/runtimeValues/FZZ32'" (`:4-6`). Walk prints `c1: -1` (`:38`).
  - So a loud, Fortress-level refusal became a loud, JVM-level failure at run time. This is row 447's naked-`T` shape, now reached under the bound `Any` too.
  - This is the reserved stop the worker met. The stop lands, and this is what it costs.
- **`pick3(z, u, w)`.** A run-time `NoSuchMethodError` became the answer `ZZ`. That is the rule's answer under the prelude, and not the specification's `ZZ64` (row 442).
- **`pickn(-1)`.** A run-time "Not in range for NN32" became `ZZ32`, the decision's answer.

## 11. The count table

- The rung declares 75 and 626, and `R/probes/checker-count-postedit.txt` reads `#total 75`, crash `none`.
- It is identical to `explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt`.
- `R/probes/distance-postedit.txt` reads `#total 626`, and `R/probes/distance-sites-postedit.tsv`, sorted, equals the landed `distance-sites.tsv`.
- `git log d9c62446e..bce66f1fa -- Library/ ProjectFortress/` prints nothing, so the landed tables are the right before.
- No mismatch.

**Timing, not a finding.** The worker's ctests captures read 214 s on the base against 605 s after. Run back to back on one machine and load, over the same five files, twice (`R/probes/skeptic/sktime.txt`), the base took 97 s and 99 s and the rung's build 99 s and 104 s. So the checker is not materially slower, and the worker's figure was the machine's load. One file with refused calls, `Compiled10.c.fss`, goes from 1.0-1.2 s to 2.1-2.6 s, as its calls try every attempt.

## 12. Required corrections, for the repair round and the commit stage

1. `numeralTie` chooses among every applicable candidate the reading fits, not only the tied maximal ones. `SkNumeralBig`'s `pickn(3000000000)` beside a `pickn(x: ZZ64)` must take `pickn(ZZ64)`, asserted in `InferNumeralTie.fss` (home 1).
2. `InferCoercionShapes.fss:50` must not assert row 442's answer. The case moves to an `XXX` compiled test asserting `pick(z, u)` is `"ZZ64,ZZ64"` (`Specification/basic-lib/basic-integers.tex:25`, `:36-37`; answer 8), promoted at the switch-over as `XXXShiftDeclRungI` is (POSITIONS 2026-09-24, row 383). Row 442 gets a note that names it.
3. The fallback for `f(x)` takes the first attempt without the context that found a candidate, so that `SkCtxMsg`'s `s: String = scale64(bS, 3)` reports "Right-hand side has type ZZ64, but declared type is String", as its plain twin does. It gets an `XXX` compile test pinned by `compile_err_contains` (home 1).
4. The two sibling faces of row 401 that the coercion attempt refuses get a gated expected failure each (home 2; `Specification/basic/conversions-coercions.tex:95-98`, `:417-432`), unless the round repairs them. Row 401's note names both.
   - An untyped lambda argument: `appl(bS, fn x => x, 3)` (`SkLambdaArg.diff.txt:6`), where the typed lambda is accepted.
   - Three lone type parameters fixed by numerals beside a converted declared parameter: `g3(1, 2, 3, 4)` (`SkComboCap.diff.txt:6`), where `g2(1, 2, 4)` and `g3(z, z, z, 4)` are accepted.
5. The record:
   - Row 391 stays open for its declarations. Its note says the call-site half is fixed, for plain ties and, after the repair, generic ones.
   - The FACTS and handover lines state what is built.
   - Section 6.6 names `c3`'s changed message and its phase-order dependence.
   - Section 3.1's `:842` and `:1028` become `:838` and `:1024`.
   - The solver stop's evidence and the notes on rows 447 and 505 carry `SkBottomRun`'s `VerifyError`.
   - Row 455's note adds the method, prefix, infix and parenthesised faces now accepted, and the loose juxtaposition still dropped (`SkCtxForms`).
6. After the Σ′ repair, the compiler tests' diagnostics, the count, the distance and the ladder are captured again on the repaired tree, since the attempts change. Each error the repair adds is named with its call.

## 13. The tracked paths

The prefix's loop over this file prints nothing once this commit lands. The worker's `R/`-abbreviated citations, 55 of them opened by name, all exist and are tracked.

## 14. Stops met, recommended rows, for Pavol

These are in the structured result:
- the stops met, all lifted by the decisions the intro names;
- the rows for the combination cap and the lambda face;
- for Pavol, the `c1` failure mode, and Q1's reading of a numeral too large for every tied declaration.
