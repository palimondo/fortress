# Judge: climb batch N, run 1, rung I (`rung-inference-checker`), after the skeptic's refusal

**Decision: repair.** The skeptic's refusal holds. As built, the checker does not rank Σ′ whole. The Σ′ in question is the set of declarations applicable to a call only with coercion (`Specification/basic/conversions-coercions.tex:533-553`). A generic declaration that applies only with coercion is never compared with the plain declarations that apply only with coercion.

The repair round:
- ranks Σ′ whole, comparing each generic on its declared domain;
- resolves a numeral tie over every candidate rather than only the tied ones;
- moves the one assertion that pins a library defect into an expected-failure test;
- reports the typing without context when a call written `f(x)` fits no attempt;
- gives every face measured and not repaired its gated expected failure;
- corrects the record.

The skeptic's other corrections are right, with two refinements (section 2.3, section 2.9). I add one thing it did not name (section 2.2).

Below, `R/` stands for `explorations/compile-ladder/rung-inference-checker/`, `F` for `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala` and `S` for `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala`. Line numbers in `F` and `S` are the branch's at `13ba3f3f0`.

## 1. What I read

- **The briefing slice**, all three parts of `explorations/coordinator/tools/facts-extract.sh` with the judge's keys:
  - the six POSITIONS entries;
  - rows 401, 388, 455, 447, 484 and 391;
  - the conversion judgement's sections 1 and 4, and the shadow's sections 5 and 7;
  - the applicability section;
  - `F:126-488` and `S:1071-1104`;
  - the harness entry.
- **The batch record's rung I section**, `explorations/coordinator/CLIMB-BATCH-N.md:97-171`. That covers the tests it asks for (`:57-81`), the stops (`:113-122`) and what it closes (`:129`). Also read: the judgement's section 5 (`explorations/reviews/conversion-overloading-judgement.md:143-153`).
- **The branch**: the net diff against `bce66f1fa` in the five Scala files, and the five commits `4dc6f90c4` to `13ba3f3f0`.
- **The two reports**: the worker's structured result (`REPORT.md` and `record.md` were refused by the harness, so they are not on the branch) and `R/SKEPTIC.md`.
- **The specification**, read whole around each citation:
  - `Specification/basic/conversions-coercions.tex:90-105`, `:391-466`, `:470-553`;
  - `Specification/basic-lib/basic-integers.tex:14-40`;
  - `Specification/basic/expressions/var-ref.tex:30-42`;
  - `Specification/advanced/overloading.tex:186-216`.
- **The code**: `F:540-729`, and the `CoercionOracle.scala` and `TraitTable.scala` hunks.
- **The skeptic's programs and captures** in `R/probes/skeptic/`: `SkSigmaMore`, `SkSigmaTie`, `SkNumeralBig`, `SkCtxMsg`, `SkLambdaArg`, `SkComboCap`, `SkBottomRun` and `SkCtxForms`. Also `R/probes/solver/SolverResultOnly.{base,after}.txt`.
- **Ledger rows 442 and 455 in full**, measurement D section 1.3 (`explorations/reviews/numerics-plan-coordinator/measure-D.md:71-90`) and `probes-B/BCtxCk.fss`.
- **The test precedents**:
  - `XXXNatLitArgChecker.test` and `XXXCoercionGenericFnCompiledRungC.test` as they were at `bce66f1fa`;
  - `XXXCoercionAnyOverloadRungC.test` with `CoercionAnyOverloadRungCLink.test`;
  - `XXXShiftDeclRungI.test` with POSITIONS 2026-09-24, row 383.

I built nothing and ran nothing.

## 2. The ruling, point by point

### 2.1 Σ′ is split (the refusal): the skeptic is right, and the worker's defence does not hold

**The mechanism.**
- The first attempt is `applicable(context, false)` (`F:622-631`, `:640`).
- For a candidate without static parameters, `checkApplicable` goes to `checkApplicableWithoutInference` whatever the `coerce` switch (`F:162-169`). That method builds a coercion for any argument that is not a subtype (`F:442-449`). So the first attempt already holds every plain declaration applicable only with coercion.
- For a generic candidate, the first attempt is `checkApplicableWithInference`, by subtyping (`F:167`).
- `kept` accepts any attempt with a candidate whose result converts to the context (`F:633-637`). So when any plain declaration applies with coercion, the coercion attempt (`F:640`) is never reached, and that attempt is the only place a generic is admitted with coercion.

**What the specification says.**
- It defines Σ and Σ′ over all declarations, generic or not: "If Σ is empty but Σ′ is not ... Let T ∈ C be the most specific element of C" (`conversions-coercions.tex:533-553`).
- Decision 1 of the conversion judgement (POSITIONS 2026-09-28, the two decisions of Fable's judgement) reads the chapter's order with "applicability and specificity taken on declared, quantified domains ... (a generic declaration fits when some instance within its bound fits)".
- The judgement's resolution adds: "where they do not, the call is a static error" (`explorations/reviews/conversion-overloading-judgement.md:111`).

**Measured.**
- `SkSigmaMore` runs `g(W2, Any)`, where `g[\T\](x: W1, y: T)`'s declared domain lies below `(W2, Any)` (`R/probes/skeptic/SkSigmaMore.diff.txt:6`).
- `SkSigmaTie` compiles and prints `f(B, Any)` (`SkSigmaTie.diff.txt:4-6`), where its all-plain twin is refused (`SkSigmaTiePlain.diff.txt:5`).
- The worker's own FACTS line says such a call is refused.

**The worker's defence.** It rests on the attempts' order being the shadow's and decision 3's. But decision 3 (POSITIONS 2026-09-27, the numerics plans) orders the expected type and its retry. It says nothing about which declarations are compared together. That plain converted declarations sit in the subtyping attempt is an artefact of `checkApplicableWithoutInference` building coercions in either mode, not a choice anyone made. Decision 1 postdates the shadow and settles the point.

**Not a fourth case.** The fix is in the rung's own method and is the rung's charge (`CLIMB-BATCH-N.md`, rung I: "declarations are chosen by the coercion chapter's order on their declared, quantified domains, a generic declaration applicable when some instance within its bounds is"). So it is not a deferral with a ledger row.

### 2.2 Ranking Σ′ whole also needs the generic compared on its declared domain (not named by the skeptic)

Once generics join Σ′, a generic from the coercion attempt is compared on its instance. `S:1102` falls to `coercions.moreSpecific(newDomain1, newDomain2)`, because only a promoted candidate carries its declared arrow (`F:626`). That lets a generic's narrow instance outrank a plain declaration whose domain lies below the generic's declared one.

**The example** (by reading, not measured): `h[\T\](x: W2, y: T)` beside `h(x: W2, y: ZZ64)`, called `h(NOf(1), 3)`.
- The coercion attempt gives `T` the narrowest type, `IntLiteral` (`F:336-343`, `:384`).
- `IntLiteral` excludes `ZZ64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390`), coerces to it, and rejects it, so `(W2, IntLiteral) ≻ (W2, ZZ64)` (`conversions-coercions.tex:494-499`). The generic would run with the numeral unconverted.
- Decision 1 compares declared, quantified domains (answer 9: `explorations/reviews/overloading-judgement.md` section 3.4). There `(W2, ZZ64)` lies below `∃T.(W2, T)`, so the plain declaration runs with `3` converted.
- Today the rung's build takes the plain declaration only because the generic never enters the set.

So the repair carries the declared arrow for every generic candidate of the coercion attempt, with its coercions still counted. How the two domains are compared is a decision under a silent specification (section 3.1).

### 2.3 The numeral tie reads only the tied maximal candidates: the skeptic is right, with a refinement

`numeralTie` is handed `top` only (`F:683`).
- In `SkNumeralBig`, `pickn(ZZ64)` is not maximal, since `ZZ32 ≻ ZZ64` by `:494-499`, so `top` is `{NN32, ZZ32}`.
- The reading `ZZ64` fits neither, and the call is refused (`SkNumeralBig.diff.txt:5`).

The judgement's section 4 reads the numeral as a type (`conversion-overloading-judgement.md:141`). A call whose argument has that type resolves by the coercion chapter's order (`conversions-coercions.tex:472-476`): first the declarations the reading fits without coercion, then those it fits with coercion. So the choice runs over every candidate of the attempt, with the reading's own Σ first. That is the refinement of the skeptic's "every applicable candidate the reading fits".

A numeral too large for every declaration stays refused, as the decision's words give. For example, `pickn(3000000000)` with only `pickn(NN32)` and `pickn(ZZ32)`: the reading `ZZ64` fits neither. It is listed for Pavol (the skeptic's second item; section 5).

### 2.4 `InferCoercionShapes.fss:50` pins row 442: the skeptic is right

The assertion expects `"ZZ,ZZ"` for `pick(z, u)`. That is the compiler prelude's answer, because its `ZZ64` declares no coercion from `NN32` (`CompilerBuiltin.fsi:147-149`). Row 442 records that gap (ledger `:453`). The row is "Closed by the switch-over ... the prelude takes no new declaration before it", as POSITIONS 2026-09-21, the library route, requires.

The specification gives `ZZ64` coercing from `NN32` (`Specification/basic-lib/basic-integers.tex:25`, `:36-37`). Answer 8 (POSITIONS 2026-09-26) and the batch record's test list both ask for `ZZ64` (`CLIMB-BATCH-N.md`, rung I, "The test, first").

A deferred defect that the specification settles belongs in an `XXX` test asserting the specification's answer, not in a green assertion of the defect. The precedents for that are:
- an `XXX` compiled test promoted at the switch-over (POSITIONS 2026-09-24, row 383, `XXXShiftDeclRungI`);
- an `XXX` run step with a plain link test beside it (`XXXCoercionAnyOverloadRungC.test` and `CoercionAnyOverloadRungCLink.test`).

The worker's measurement, `ZZ` under this library, is right and stays in the report. What the assertion was also doing is covering a narrowest type that is neither argument's own. The repair keeps that coverage with the test's own traits.

### 2.5 The fallback for `f(x)` reports a false refusal: the skeptic is right

When no attempt is kept, `F:643-645` falls back to `withoutContext`, the subtyping attempt. For `s: String = scale64(bS, 3)` that attempt finds nothing. So the call is reported as "not applicable to an argument of type (BoxT[\String\], IntLiteral)" (`SkCtxMsg.diff.txt:6`), although the fourth attempt accepts it.

The words are today's, but today they were true and now they are not. The worker's aim was that a refusal be "reported where and as it is without the context" (its decision 3). Its fallback meets that aim only when the attempt without the context is the first that finds a candidate. The plain twin reports the binding (`:8`), and so must the generic.

### 2.6 The two sibling faces of row 401: the skeptic is right

Two faces of row 401's shape stay refused:
- an untyped lambda argument, refused outright at `F:303` (`SkLambdaArg.diff.txt:6`);
- three lone parameters fixed by numerals, refused by the 64-combination cap at `F:356` (`SkComboCap.diff.txt:6`).

The specification settles both: a coercion at an argument whose declared parameter type is the target (`conversions-coercions.tex:95-98`), and applicability with coercion (`:417-432`). This batch measured them, so each is owed a gated expected failure now (the three homes, home 2).

Repairing them is not required. The cap cannot simply be made per parameter, since the context couples the chosen parameters (`F:365-367`). The lambda case needs the argument-inference loop of `checkApplicableWithInference` (`F:193-277`) inside the coercion attempt. Both are recorded as rows.

### 2.7 Row 391 is not closed: the skeptic is right

Row 391's specification answer is that the declarations are refused (`Specification/advanced/overloading.tex:196-216`, the incompatibility rule; `:247-273`, the Meet rule). The rung refuses the call. The declarations still compile, and the row's own note says the repair of the declarations belongs in `OverloadingChecker`.

The batch record's "Row 391 (fixed: the non-numeral tie refused as walk refuses it ...)" (`CLIMB-BATCH-N.md`, rung I, "What it closes") is read as the call-site half. The row stays open for the declarations. The difference from the record is listed for Pavol.

### 2.8 Row 455 is not closed whole (not named by the skeptic as a closure, but its measurement shows it)

Row 455's claim names three faces:
- a call written `f(x)`;
- the method, prefix and infix forms under a context, whose numerals the context refused;
- "an enclosing call's parameter (`takesBox64(wrapT(3))`, `takesBox64(mk())`)".

The rung repairs the first and the second (`SkCtxForms.diff.txt:4-5` against `:17-30`). Measurement D section 1.3 says arguments still drop the context. The skeptic measured the loose juxtaposition `wrapV 3` still dropping it (`SkCtxForms.diff.txt:4-5`).

So row 455 stays open for those faces. The faces this rung measured and did not repair get one gated expected failure, since the specification settles them: "the static arguments are statically inferred from the context of the function call" (`Specification/basic/expressions/var-ref.tex:35-40`).

### 2.9 The record's other corrections: the skeptic is right on each

- **`c3`'s message changes under `TestsD`.** It goes from "without context" to "not applicable to an argument of type ()" (`R/probes/solver/SolverResultOnly.base.txt:12-14` against `.after.txt:9-11`). Under `fortress compile` it does not change (`SkSolverCopy.diff.txt`). The report says one line of the probe changed, when two did. The repair explains the path, since section 2.5's fallback may change it again.
- **The newly accepted `c1(): ZZ32 = fAny()` compiles and dies at load** with "java.lang.VerifyError: Bad return type" (`SkBottomRun.diff.txt:4-6`, `:26`, `:38`). This is the cost of the reserved stop the worker met. It is row 447's naked-`T` shape, which batch 7's rung B's skeptic recorded under a written bound, now reached under `Any` too. The stop lands as the worker listed it. The record carries the cost.
- **The citation lines.** `F:842` and `F:1028` should be `:838` and `:1024` (checked: `:838` is the subscript's `checkApplication`, `:1024` the operator's).
- **Row 455's faces.** They are as in section 2.8.

### 2.10 What the worker got right, which the skeptic confirms and I do not reopen

- The recorded failure predates the edit.
- The provenance block holds.
- The count, 75, and the distance, 626, match the landed tables site for site. The ladder is unchanged.
- The promotion, its lookup, the ranking of a promoted candidate on its declared domain, the kept-only-if-it-converts rule (`CtxOverload`), the maximal-element tie check and the ambiguity message are what the decisions ask.
- The judgement's five programs print what section 5 of the judgement asks.

## 3. Decisions taken under a silent specification

### 3.1 How a generic in Σ′ is compared (section 2.2)

The chapter defines `⪯` on types (`conversions-coercions.tex:486-513`). Decision 1 applies it to "declared, quantified domains". Neither defines `⪯` on a domain with a static parameter in it. The ways:

- **(a) The coercion chapter's `⪯` on the instances**, today's comparison.
  - Cost: a generic's narrow instance outranks a plain declaration whose domain lies below the generic's declared one (section 2.2's `h`), against decision 1.
- **(b) The overloading oracle's `lteq` alone** (subtyping on existential domains; `scala_src/overloading/OverloadingOracle.scala:66-70`).
  - Cost: it loses the chapter's ranking of an excluding, converting, rejecting type over another at a position that is not a static parameter.
  - Example: `f[\T\](x: ZZ32, y: T)` beside `f(x: ZZ64, y: Any)`, called `f(3, 5)`. By `⪯` on the declared domains the generic is more specific. By `lteq` neither is, and the numeral tie then takes the plain declaration.
- **(c) `⪯` built on quantified domains.** A bare parameter is read at its bound, a structured position by existential subtyping, and every other position elementwise by `⪯`.
  - This is the principled one.
  - Cost: a new relation in the oracle that the specification does not state, and more code than the repair round should carry.
- **(d), taken: `lteq` strictly one way decides; when it relates neither, (a) decides.**
  - It reuses the two relations already in the tree.
  - By reading, it agrees with (c) wherever `lteq` decides, and in the example of (b).
  - It departs from (c) where (c) finds a tie and the instance's narrower type at a parameter position decides. Example: `f[\T\](x: ZZ32, y: T)` beside `f(x: ZZ64, y: ZZ32)`. Under the full overloading rules such sets are invalid (`Specification/advanced/overloading.tex:196-216`, `:247-273`: both reached from one coercion source, so a Meet is required). That half of row 391 is unbuilt.
  - Listed for Pavol.

### 3.2 Where a numeral's reading fits a generic

At a numeral position whose declared type is a bare type parameter, the reading fits when it is substitutable for that parameter's bound. It is not tested against the instance's type there, which is `IntLiteral` whenever numerals alone fix the parameter.
- The alternative, the instance's type, would exclude such a generic from every numeral reading.
- A generic chosen this way keeps its instance, as the instantiation step gives it. That is the judgement's two steps: the choice of a declaration, then its instantiation.

The skeptic's other points are settled by the decisions, not by me: the numeral read by magnitude (the judgement's section 4) and the fallback's truthfulness (section 2.5).

## 4. The repair, in order

The steps are in the structured result's `instructions` and are the same as below. They are ordered so that every assertion of a home-1 defect exists, fails on the first pass's build and passes on the repaired one before the second skeptic runs.

1. **Set up.**
   - Worktree `/home/user/fortress-infer`, branch `wip/rung-inference-checker`. The shell is as the shared prefix says, plus `source tmp/h.sh` (the rung's drivers use it). Read `df -h /home/user`.
   - Snapshot the first pass's build and cache before touching any source: `cp -a ProjectFortress/build tmp/build-r1` and `cp -a tmp/caches-after tmp/caches-r1`.
   - `tmp/build-base` and `tmp/caches-base` stay as they are.
   - The first pass's `reportText` and `recordText` are in its structured result, which the workflow hands you as it handed the skeptic (`R/SKEPTIC.md` section 1). They are the texts you correct.
2. **Write the tests** in `ProjectFortress/compiler_tests/`. Each file has one comment line pointing at `explorations/compile-ladder/rung-inference-checker/REPORT.md`. Each assert message is its citation and nothing else.
   - a. **`InferSigmaWhole.fss` and `.test`** (compile, link, run, `run_out_contains=PASS`). `SkSigmaMore`'s traits and objects (`R/probes/skeptic/SkSigmaMore.fss:4-17`), with:
     - `g(NOf(1), 5)` = `"g(W1, T)"`, message: decision 1, POSITIONS 2026-09-28; `conversions-coercions.tex:533-553`;
     - `p(NOf(1), 5)` = `"p(W1, Any)"`;
     - the guard of section 2.2: `h[\T\](x: W2, y: T)` beside `h(x: W2, y: ZZ64)`, `h(NOf(1), 3)` = `"h(W2, ZZ64)"`.
   - b. **`XXXInferSigmaTie.fss` and `.test`** (`compile`, `compile_err_contains=Ambiguous coercion in call to function f`). `SkSigmaTie.fss` as it is, with the component renamed.
   - c. **`InferNumeralTie.fss`**: add a family `pickb(x: NN32)`, `pickb(x: ZZ32)`, `pickb(x: ZZ64)` with `pickb(3000000000)` = `"ZZ64"` and `pickb(3)` = `"ZZ32"`, message: the conversion judgement's decision 1, POSITIONS 2026-09-28. The existing `pickn` lines stay unchanged.
   - d. **`XXXInferFallbackMessage.fss` and `.test`** (`compile`, `compile_err_contains=Right-hand side has type ZZ64, but declared type is String.`). `SkCtxMsg.fss` with only its `scale64` line (`:10`) and what that line needs.
   - e. **`InferCoercionShapes.fss:50`**: remove the `"ZZ,ZZ"` assertion. In its place, a narrowest type neither argument's, with the test's own traits: two traits `P` and `Q`, each excluding the other, and a trait `R` declaring a coercion from each, with objects for all three; `pick`-shaped over `T`, asserting `"R,R"` through a typecase on `R`, `P` and `Q`. First check on `tmp/build-r1` (`R/comp.sh` with `BUILD=tmp/build-r1` and `tmp/caches-r1`) that subtyping binds that call to a union, since the promotion runs only there (`F:624`). If the solver binds a named supertype instead, choose traits for which it binds the union, and say which in the report.
   - f. **`XXXInferPromoteNN32.fss`**, **`XXXInferPromoteNN32.test`** (`run`, `run_out_contains=PASS`) and **`InferPromoteNN32Link.test`** (`tests=XXXInferPromoteNN32`, `link`). It asserts `pick(z, u)` = `"ZZ64,ZZ64"` for `z: ZZ32`, `u: NN32`, message: `Specification/basic-lib/basic-integers.tex:25`; answer 8, POSITIONS 2026-09-26; ledger row 442.
   - g. **`XXXInferLambdaArg.fss` and `.test`** (`compile`, `compile_err_contains=is not applicable to any type of the form (BoxT[\\String\\], _->_, IntLiteral)`). `SkLambdaArg.fss`'s untyped line (`:10`) only.
   - h. **`XXXInferComboCap.fss` and `.test`** (`compile`, `compile_err_contains=is not applicable to an argument of type (IntLiteral, IntLiteral, IntLiteral, IntLiteral)`). `SkComboCap.fss`'s `g3(1, 2, 3, 4)` only.
   - i. **`XXXInferContextDrops.fss` and `.test`** (`compile`, `compile_err_contains=File XXXInferContextDrops.fss has N errors.`). Row 455's faces that `tmp/build-r1` still drops:
     - the loose juxtaposition `e: BoxV[\ZZ64\] = wrapV 3` (`SkCtxForms.fss:28`);
     - `b07(): ZZ32 = takesBox64(wrapT(3))` and `b11(): ZZ32 = takesBox64(mk())` (`explorations/reviews/numerics-plan-coordinator/probes-B/BCtxCk.fss:17`, `:21`).

     Check each on `tmp/build-r1` first and include only those it refuses. `N` is their count.
3. **Capture every test of step 2 on the first pass's build** before any Scala edit, while `ProjectFortress/build` is still that build: `R/runtests.sh one tmp/caches-r1 R/probes/repair-pre <Name>` for each.
   - Expected: a, b, c, d and e red. The `XXX` files b and d report "Saw wrong failure". f, g, h and i report "Saw expected failure".
   - The link test passes. The guard in a passes, which is the reason it is there.
   - Then show `XXXInferPromoteNN32` red on a deliberate local fix: change its expected string to `"ZZ,ZZ"` for one run, capture `R/probes/xxx-red/XXXInferPromoteNN32-deliberate-fix.txt`, and restore it. It is the rung's first `XXX` test of the run-step form (`FileTests.java:853`).
   - Commit and push.
4. **Edit `F` and `S`, and nothing else.**
   - a. **The representation.** A ranked candidate is `(AppCandidate, declared: Option[ArrowType], promoted: Boolean)`. In `applicable` (`F:622-631`):
     - the promoted case is `(Left(promoted), Some(pc.arrow), true)`;
     - in the coercion attempt (`coerce = true`), a candidate whose `pc.arrow` has static parameters other than lifted ones is `(Left(c), Some(pc.arrow), false)`;
     - every other entry is `(e, None, false)`.
     - Update `Attempt`, `candidatesOf`, `moreSpecific` (`F:613-615`, `:632`) and the unfixed-size check (`F:661-664`) to match.
   - b. **`moreSpecificCandidate`** (`S:1071-1104`). Add `promoted1: Boolean = false, promoted2: Boolean = false`.
     - `coercionK = !promotedK && argsK.exists(_.isInstanceOf[CoercionInvocation])`.
     - `(true, false)` gives `false` and `(false, true)` gives `true`, as today.
     - `(false, false)` with a declared arrow on either side: `coercions.moreSpecificDeclared` as built.
     - `(true, true)` with a declared arrow on either side:
       - `true` when `moreSpecificDeclared(d1, d2)`;
       - `false` when `moreSpecificDeclared(d2, d1)`;
       - otherwise `coercions.moreSpecific(newDomain1, newDomain2)` (section 3.1 (d)). Here `dK` is `declaredK.getOrElse(candidateK.arrow)`.
     - No declared arrow on either side: the team's code, unchanged. The two-argument caller (`CoercionOracle.scala`, `moreSpecificCandidate(c1, c2)`) keeps today's behaviour.
   - c. **`kept`** (`F:633-637`) takes whether the attempt is by coercion. An attempt by subtyping is kept only when it holds a candidate without a counted coercion (not converted, or promoted), and its head's result converts to the context as now. So when Σ is empty, Σ′ is ranked whole in the coercion attempt, which holds the plain declarations applicable with coercion too (`F:169` in either mode). You may reuse the first attempt's entries for candidates without static parameters in the coercion attempt, since they come from the same call. Say so in the report if you do.
   - d. **The fallback when no attempt is kept** (`F:643-645`):
     - With `fallBackWithoutContext` and a context, take the first of the third and fourth attempts that holds a candidate under step 4c's rule without the context condition; if neither does, take the third.
     - Otherwise, take the first attempt, in order, that holds a candidate under that rule; if none does, take the first.
   - e. **`converted`** (`F:673`) is `!promoted && args.exists(_.isInstanceOf[CoercionInvocation])`.
   - f. **`numeralTie`** (`F:683`, `:690-708`). Keep its gate over `top`: the tied candidates differ only where the argument is a numeral, and every numeral there has a reading. Then choose over every candidate of the kept attempt:
     - it fits when, at every position whose argument is a numeral, that numeral's reading (`numeralReading` of that numeral alone) is substitutable for the candidate's parameter type there;
     - for a candidate with a declared arrow, at a position whose declared type is a bare type parameter, fit means substitutable for that parameter's bound (section 3.2);
     - of the fits, those the readings are subtypes of at every numeral position come first;
     - take that set's one element that no other in it is more specific than, by `moreSpecific`; if that set is empty, take the same among all fits;
     - if there is no single such element, signal the ambiguity over `top` as now.
   - g. **Leave alone**: the solver, `Operators.scala`, `checkApplicableWithCoercion`'s cap and lambda refusal (`F:303`, `:356`), `CoercionOracle.scala` and `TraitTable.scala`.
5. **Build.**
   - `ant compileAll` through `run_bg` and `wait_for`.
   - Rebuild `tmp/caches-after` from empty in library order with the repaired checker, capturing `R/probes/libcache-repair.txt` (five components, each rc and time).
   - If any component fails to compile, find the call. Do not land a tree whose library does not compile. Return `stopped` with the call, the candidates and why they tie.
6. **Capture after.**
   - `R/runtests.sh one tmp/caches-after R/probes/repair-post <Name>` for every test of step 2 and every test the first pass added or promoted. Each must pass, or print "Saw expected failure" for an `XXX` test.
   - Then the suite-shaped run of `R/suite-list.txt` with the new tests added, under the seed `1a0dba81ab2_16` and under the skeptic's `20260929`: `R/probes/repair-post/suite-seed-*.txt`, 0 failures.
   - Commit and push.
7. **Measure the repaired tree**, reading `df` before each run and deleting each run's scratch after its outputs are captured. Name every changed file or site with its call and cause.
   - a. **The compiler tests' diagnostics**: `R/ctests.sh` over `R/probes/ctests/gate-list.txt` into `R/probes/ctests/typecheck-repair.txt`, with `diff-repair.txt` against `typecheck-after.txt` and against `typecheck-base.txt`.
   - b. **The checker-count stage and the distance stage** against the landed `explorations/compile-ladder/climb-batch-6.5/gate/` tables, into `R/probes/checker-count-repair.txt`, `R/probes/distance-repair.txt` and `R/probes/distance-sites-repair.tsv`. Classify each new site as unmasked or caused, and use row 488's control for any move in the BR family.
   - c. **The ladder's 85 files**: `R/run-subset.sh` into `R/probes/ladder/results-repair.tsv` and `compare-repair.txt`.
   - d. **The one library**: `R/onelib.sh` for `RuleL`, `RuleLI`, `DCtx`, `DArg`, `DMore` and `OneShapeW` on L0 and A0, compared by `R/compare-onelib.py`, into `R/probes/onelib/*.repair.*.txt`.
   - e. **`R/probes/SolverResultOnly.fss`** through `TestsD` and through `fortress compile`, into `R/probes/solver/SolverResultOnly.repair.txt` and `.repair-compile.txt`. Explain `c3` under each: which `checkApplication` form and flag reached it, and why the message is what it is.
   - f. **The skeptic's programs** `SkSigmaMore`, `SkSigmaTie`, `SkSigmaTiePlain`, `SkNumeralBig`, `SkNumeralSmall`, `SkCtxMsg`, `SkCtxForms`, `SkPromoteForms` and `SkBottomRun`, each compiled and run on the repaired build, the base's and walk's, into `R/probes/repair/<Name>.diff.txt`. Use a copy of `R/probes/skeptic/skdiff.sh` that writes there, so that the skeptic's captures are not overwritten.
   - g. **Timing**, back to back, base against repair, on the skeptic's five files (`R/probes/skeptic/sktime.sh`), into `R/probes/repair/sktime.txt`, with the machine line.
   - Commit and push.
8. **The stops.** Check the batch record's rung I stops against these measurements.
   - A reserved stop the repair meets is finished as its section says and listed in `stopsMet` with `liftedBy` POSITIONS 2026-09-27, on the stops a batch record reserves for him. The reserved stops include: a compiled test's verdict other than the rung's own; a new caused checker error unaccounted for; a binding chosen for a type parameter nothing at the call fixes. The repair can newly reach the last where a generic with a result-only parameter joins Σ′.
   - A declaration needing a conversion winning over one that fits the call as it is must not occur. Show it does not with `InferO2Pos`, `CtxOverload` and `XXXCoercionAnyOverloadRungC`.
9. **Write `R/REPORT.md` and `R/record.md`** from the first pass's texts with these corrections. If the harness refuses the writes, say so, carry both texts whole in the structured result, and update `R/probes/for-pavol.txt` and `R/probes/stops-met.txt` either way.
   - A section "The repair round": what changed and why (this ruling, by section), the new tests with their before and after captures, every measurement of step 7, and the decisions of section 3 with their alternatives.
   - The FACTS lines and the handover line state only what is built after the repair: Σ′ ranked whole with a generic compared on its declared domain; the numeral tie resolved over every candidate.
   - **Row 391** stays open. Status appends "the call-site half POSITIVE-VERIFIED (`8dc1a74d9`)". The note says the declarations half (`Specification/advanced/overloading.tex:196-216`, `:247-273`; `OverloadingChecker`) remains, that the batch record's "fixed" is read as the call-site half, and names `XXXInferAmbiguousCoercion` and `XXXInferSigmaTie`.
   - **Row 455** stays open. Status appends the faces fixed: `f(x)`, and the method, prefix, infix and parenthesised forms (`R/probes/skeptic/SkCtxForms.diff.txt`). The note names `XXXInferContextDrops` for the faces still dropped, and keeps measurement D section 1.3's other drops.
   - **Row 442**: a note naming `XXXInferPromoteNN32` with `InferPromoteNN32Link` as its gated expected failure, promoted at the switch-over as `XXXShiftDeclRungI` is.
   - **Row 401**: a note naming the two sibling faces and their tests `XXXInferLambdaArg` and `XXXInferComboCap`.
   - **Two new rows** (provisional 506 and 507, the gather numbering them): the 64-combination cap (`F:355-356`) and the untyped lambda argument (`F:303`), from the skeptic's `recommendedRows`, each citing its `XXX` test (home 2).
   - **Rows 447 and 505** carry `c1`'s `VerifyError` (`R/probes/skeptic/SkBottomRun.diff.txt:4-6`, `:26`, `:38`), as does the solver stop's evidence.
   - **Report section 3.1**: `F:838` and `F:1024`.
   - **Report section 6.6**: `c3` under both paths, from step 7e.
   - **Report section 9**: row 455's faces.
   - The count of compiler-track JUnit tests that the manifest gains, recounted.
10. **Run the prefix's tracked-paths loop** over `R/REPORT.md` and `R/record.md`, or over the explicit list if they were refused, and fix every line it prints. Commit and push.

## 5. For Pavol, from this ruling

- **How a generic in Σ′ is compared** (section 3.1): the overloading oracle's subtyping on declared domains decides when it can, and the coercion chapter's `⪯` on the instances otherwise. The alternatives, with their costs, are in section 3.1.
- **A numeral too large for every declaration**: `pickn(3000000000)` with only `pickn(NN32)` and `pickn(ZZ32)` is refused, since the reading `ZZ64` fits neither. The base compiled it to `NN32`, which holds the value. The alternative is the narrowest declaration whose type holds the value.
- **The reserved stop's cost.** `c1(): ZZ32 = fAny()` for `fAny[\T extends Any\](): T`, refused on the base, now compiles and fails JVM verification at load (`SkBottomRun.diff.txt:4-6`). The alternative is not to keep an attempt with the context that binds a result-only type parameter to `BottomType` where the attempt without it refuses the call, which restores the base's refusal. Row 447's choice is his (`PLAN.md` items 18 and 20).
- **Rows 391 and 455 stay open**, against the batch record's "What it closes". Row 391 stays open for the declarations the overloading rules refuse. Row 455 stays open for the argument and loose-juxtaposition faces.
