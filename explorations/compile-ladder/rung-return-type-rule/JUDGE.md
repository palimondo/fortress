# Judge: rung C's refusal (climb batch 7b, `rung-return-type-rule`)

*Gather's note (climb batch 7b): the provisional ledger rows 534 to 541 are cited by their final numbers, 536 to 543, as the gather assigned them in manifest order. The provisional row 542 of instruction 5's fallback was not opened, since the repair round took home 1.*

**Decision: repair.** The skeptic's one refusal ground (D1) is right and is repaired in the rung, with a test (home 1). Each of the five defects the skeptic measured and left without a home gets one below: D4 is repaired (home 1, with a fallback to home 2), and D2, D3, D5 and D6 are gated as expected failures (home 2), each with a provisional ledger row. Three statements of the record are corrected. No stop is met, and none is met by the repair as instructed.

Read for this ruling: the briefing's four parts; `git diff 811053f15...HEAD` and the branch's seven milestones; `SKEPTIC.md`, `record.md` and `decision-record.md` in this directory; the worker's report text, which the workflow carries in its structured result, since the harness refused its `REPORT.md`; rung C's section of `explorations/coordinator/CLIMB-BATCH-7.md` (the paragraphs on the call between two closed traits, Astra's boundary, the fallback and the stops); `Specification/advanced/overloading.tex:224-310` and `:370-446`; `Specification/basic/types-vals-vars.tex:138-164` and `:252-258`; `Papers/Types/rules.tick:174-180` and `Papers/Types/overloading-check.tick:166-184`; `ProjectFortress/src/com/sun/fortress/compiler/typechecker/StaticTypeReplacer.java:101-119`, `:189-210`; `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:150-163`, `:486-514`; `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:340-418`; and the skeptic's six probe programs. I ran no build and no test.

## 1. Rulings, point by point

### D1, the refusal ground: the skeptic is right

At `ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:105-111`, `kept` keeps each unforced static parameter of the less specific declaration as it was declared, bound included. `str` replaces only the forced parameters, and only in `d2` and `r2` (`:113-114`). Then `ta.extend(nsp1, None)` puts the kept parameters into the analyzer's environment while the forced ones are gone. So a kept parameter whose bound names a forced parameter names a variable the environment does not hold. The skeptic's program is `g[\X, Y extends Box[\X\]\](x: Box[\X\], y: Y): String` beside `g(x: Box[\ZZ32\], y: SubBox): String`. `X` is forced to `ZZ32`, since `Box` is invariant, and `Y` is kept with bound `Box[\X\]`. The head refuses it with "X$7 is not in the kind env" (`SKEPTIC.md`, check 4).

- **The base did not have this defect.** It substituted every parameter (`new StaticTypeReplacer(sp2, newargs)` in the `-` lines of the diff) and kept only unsolved sizes, which have no bounds that name other parameters.
- **The program is valid under the rules answer 9 adopts.** Both declarations return `String`, so the Return Type Rule (`Papers/Types/rules.tick:174-180`) holds for every instance.
- **The base compiles and runs it**, printing `plain   generic` and `PASS`.

The worker's claim that the only verdicts that moved are its intended ones is true of the corpora, which do not contain this shape. It is not true of the rule: a valid program that ran on the base now fails with an internal error. The repair substitutes the forced solutions into the kept parameters' bounds. The special arrow's where clause is `None` on the base and on the head alike (`:111`, `:114`), so there is no where clause to substitute into.

### D2, a method call on the intersection-typed result crashes code generation: the skeptic is right, home 2

`choose(m).left()` in `CoverageReturnGood`'s family dies at `CodeGen.forMethodInvocation` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6236`, "IntersectionType cannot be cast to NamedType").

- **The specification settles the answer.** The call's type is the intersection of its candidates' return types (item 26's decision), and that intersection has `left()`.
- **The repair is code generation's.** That is outside this rung's files, which are the checker under `scala_src/` (C's section, "Files it may touch").
- **Why a crash is home 2.** A program the checker accepts and that then fails in a later stage is settled under every reading, so its home is 2 (the prefix, "What a measured defect is worth").

The typing is Pavol's decision. The rung must not weaken it to avoid the crash.

### D3, inference on an intersection-typed argument keeps one conjunct: the skeptic is right, home 2

`pass[\X\](x: X): X` applied to `choose(m)` binds `X` to one conjunct, chosen by declaration order.

- **The inference chapter settles the answer:** the argument's type.
- **The repair is in the constraint solver the checker shares.** Changing it is the fallback's condition and a stop of this rung (C's section, "Stops": "a change to the verdicts of the checker's shared subtyping, meet, equivalence or normalizer").
- **The base fails the same program**, typing the call by the sort's head.

### D4, functional methods declared in the closed traits are not covered: the skeptic is right, and I rule home 1

`listed` (`OverloadingOracle.scala:206-214`) cuts only a `TraitType`. The self parameter of a functional method has a `TraitSelfType` (`S & {U, V}` in the message; `ProjectFortress/astgen/Fortress.ast:1047`, `TraitSelfType(BaseType named, List<NamedType> comprised)`). So `tag(self)` declared in `S`, `T` and `V` is never cut and stays refused. Yet the decision record's section 3 ("Its scope: functions and functional methods"), the comment at `OverloadingChecker.scala:524-526`, the report and the second FACTS entry all claim functional methods. Walk runs the program and prints `tag(s) = 3`.

- **What the specification says.** Its Meet Rule for functional methods asks for a declaration of the meet in each type that provides both (`Specification/advanced/overloading.tex:396-411`). Here that type is `V`, and `V` declares one. Item 26's closed-trait case covers the same overlap through the clauses. Both readings accept the program.
- **Why the cut is sound.** A value of `S & {U, V}` is an `S`, and `TypeAnalyzer.removeSelf` reads it as `S ∩ (U ∪ V)` (`TypeAnalyzer.scala:486-498`). Cutting it by `S`'s clause, with the static arguments substituted by `comprisesClause` as for a `TraitType`, therefore gives parts that hold every value of the overlap. The subtype queries the check already makes accept a `TraitSelfType` on either side (`TypeAnalyzer.scala:160-162`).
- **Why it can only accept more.** `coverageRule` runs only after the Subtype, Meet and exclusion tests fail (`OverloadingChecker.scala:475-479`). The change turns refusals into acceptances and nothing else. No compiled test or ladder file moves, since every one of them compiles today.

**A decision under the rung's section.** The alternative is home 2: an `XXX` compile test pinned by "Invalid overloading of tag", with the scope narrowed in four places. I take home 1 for three reasons. The change is one case in the rung's own new function. It makes the record's claim true, rather than narrowing the claim to the less common form: a functional method whose closed trait sits at a parameter other than self is already covered (`SkFnMethodCoverArg`). And it keeps the two paths agreeing on the common form. If the case alone does not make the program compile, link and run, the repair falls back to home 2 (instruction 5).

### D5, the Return Type Rule is stricter than the paper where the more specific declaration's domain is an object type: the skeptic is right, home 2

`ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, with `object Circle`, is refused by the head.

- **The paper's rule accepts the pair.** It quantifies over the types `T ≢ Bottom` to which the more specific declaration applies (`Papers/Types/rules.tick:174-180`). An object trait type "excludes any type that is not its supertype" (`Specification/basic/types-vals-vars.tex:256-258`), so the only such type is `Circle`, and every instance of the generic that applies to `Circle` returns a supertype of `Circle`.
- **Why the construction refuses it.** The construction of the overloading judgement's section 3.5 (`explorations/reviews/overloading-judgement.md:93`) keeps `T` quantified. It then checks instances whose domain meet `Circle ∩ T` is `Bottom`, which the paper's theorem sets aside ("with U ≢ Bottom", `Papers/Types/overloading-check.tick:176-178`).
- **What the base did.** It compiled the program, and the run died with `VerifyError: Bad return type`. So a valid program moves from a run-time crash to a compile-time refusal, loud to loud.

The construction is the one answer 9 adopted ("Agreed, the judgement's recommendation"). Making it see object domains is a type-theoretic change to a decided rule, and it goes to Pavol, not into a repair round. Home 2, a provisional row, and a sentence in the first FACTS entry.

### D6, a call between two closed traits is typed by the sort's head in a family with a generic member: the skeptic is right on the facts, and I rule home 2

`groundFamily` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:683`) requires every declaration of the family to have no static parameters. Astra's boundary, as C's section quotes it, excludes only "generic overloads requiring runtime instantiation". A generic member that cannot run for the argument, such as `choose[\X\](b: Box[\X\])` with `object Box[\X\]` beside a call on an `M`, is outside what the boundary excludes. So the worker's scope is narrower than the boundary. It is not an extension of the typing beyond the boundary, and no stop is met. In such a family the call keeps the base's typing, the head of the sort, and that typing depends on declaration order. C's section says the new typing "must not depend on the order the declarations are written in". The record's fallback, in turn, keeps today's typing wherever the new one does not apply.

**A decision.** The candidates were these:
1. Narrow the condition to the declarations that may run for the call: every declaration whose existential domain does not provably exclude the argument's static type must be ground. `OverloadingOracle.excludes` (`OverloadingOracle.scala:319-324`) and the construction precedent at `CoercionOracle.scala:82` are there for it.
2. Keep the worker's scope, gate the shape, and put the narrowing to Pavol.

I take 2, for three reasons:
- **Candidate 1 widens what reaches code generation.** It sends the intersection type into every tie in families with generic members, the library's among them, and D2 shows code generation crashing on that type. A second new path to the same crash, found only by the ladder and the distance stage, is a larger risk than this round should take.
- **It rests on one more exclusion judgement per call over existential domains.** An error there is exactly the fallback's condition.
- **The worker already reported its scope to Pavol**, as the conservative reading.

The order-dependence stays where it was on the base. It is sound, since whatever runs is below the head and so returns a subtype of the head's return type (the Return Type Rule). It is gated by an expected failure. What must change is the record's wording. The FACTS entry calls the ground-family scope "Astra's boundary", and it is narrower than that.

### The special arrow's domain: not a defect

The head meets `d1` with `str.replaceIn(d2)` where the base met it with the solved `newgd` (the skeptic's check 4). Both `d1` and `d2` are the arrows' own domains, without the receiver, so the new meet compares like with like. P1's shadow made the same change, and no count moved but the `cond` pair. No change is needed. The report's section 3 already describes the domain.

### The between call with a common coercion (`SkBetweenCoerced`): not a defect of this rung

C's section keeps "a tie that involves a coercion ... under batch N's ambiguity rule as it landed". "Ambiguous coercion" is that rule. Whether an identical coercion on every candidate counts as fixed is a question for Pavol (the proof addendum, "Coercion is a separate choice"). It is not the rung's to change: to Pavol, no test, no row.

### The provenance and `REPORT.md`: the skeptic is right

The precedent line `OverloadingOracle.scala:92-100` means rung N's `escaped` block at `811053f15`; at the head, `:92-96` is the rung's own comment. The line must say "at 811053f15". The four deviation lines are a format point and stay. `REPORT.md` is not on the branch, and the record and the decision record cite it.

### What the worker got right, confirmed by the skeptic's own runs

- **The failure and the pass.** On the base 18 of the rung's 45 harness tests fail; at the head all 45 pass; `compiler_tests/` passes whole (902) and so does `library_tests/` (86).
- **The shared analyzer is untouched.** `TypeAnalyzer.scala` and `TypeHierarchyChecker.scala` are not in the diff, and `coversOverlap` has one caller.
- **The guards hold.** `SkBetweenAssign` is still refused. `CoverageReturnBad` is refused on the Return Type Rule. `CoverageReturnGood` passes in both declaration orders.
- **The measurements match.** The count is 75 → 77 and the distance 624 → 626, both the `cond` pair.
- **The judgement's construction was chosen over the team's commented-out theorem**, which refuses the prelude's `nest` (P1).
- **The positional rule's scope** (as many static parameters of their own) is within answer 9's words, "Java's overriding rule", which compares methods with as many type parameters. The worker put it to Pavol.
- **The expected-failure pairs** of defect 3, rows 496 and 499, the paper's instance and the unbounded lone parameter, and the rewrite of `XXXInferLoneBoundUnion` to the written bound.

## 2. What the specification settles

- **D1.** The pair is valid: the Return Type Rule over every instance (`Papers/Types/rules.tick:174-180`), which answer 9 adopts, holds because both declarations return `String`. The repair is home 1.
- **D2.** The call's type is the intersection of the candidates' return types (item 26's decision, which rung S states), and a method of either conjunct may be called on it. The crash is code generation's, home 2.
- **D3.** A lone type parameter fixed by one argument takes that argument's type (the inference chapter). The argument's type is the intersection, home 2.
- **D4.** The program is valid by the Meet Rule for functional methods (`Specification/advanced/overloading.tex:396-411`) and by item 26's closed-trait case. Home 1.
- **D5.** The pair is valid by the paper's rule, since an object trait type has no subtype but itself and `Bottom` (`Specification/basic/types-vals-vars.tex:256-258`). The construction answer 9 adopted refuses it. Home 2, with the construction's refinement for Pavol.
- **D6.** Item 26's decision types the call by the intersection. Astra's boundary does not exclude a generic member that cannot run. The worker's narrower scope keeps today's typing. Home 2, and the narrowing goes to Pavol.
- **The coercion tie.** Settled for this rung by C's section, which keeps batch N's rule. The broader reading goes to Pavol.

## 3. Instructions for the repair round

1. **Set up.** Work in `/home/user/fortress-rtr` on `wip/rung-return-type-rule`, each shell set up as the prefix says (`source explorations/experiment/env.sh`, `TMPDIR`, `JAVA_FLAGS`, and a check that `FORTRESS_HOME` is this worktree).
   - Read this file, `SKEPTIC.md`, `decision-record.md` and `record.md` in this directory.
   - Read the worker's report text, which the workflow carries in the worker's structured result (`reportText`).
   - Confirm that the current build is of HEAD's three Scala files. `git status` must be clean, and `ProjectFortress/build`'s checker classes must be newer than the last commit that touched `scala_src/`. If either fails, run `ant compileAll` and the library-order cache rebuild before step 3.

2. **Write the two home-1 tests first**, each in `ProjectFortress/compiler_tests/` with one comment line in plain words and messages that cite no specification line, ledger row or record entry:
   - `OverloadBoundNamesForced.fss` with `OverloadBoundNamesForced.test` (`compile`, `link`, `run`, `run_out_contains=PASS`). The program is the skeptic's `SkRtrDangling2`, component renamed: `trait Box[\X\]`, `object SubBox extends Box[\ZZ32\]`, `object PlainBox[\X\] extends Box[\X\]`, `g[\X, Y extends Box[\X\]\](x: Box[\X\], y: Y): String = "generic"` beside `g(x: Box[\ZZ32\], y: SubBox): String = "plain"`. It asserts `g(PlainBox[\ZZ32\], SubBox)` is `"plain"` and `g(PlainBox[\ZZ32\], PlainBox[\ZZ32\])` is `"generic"`, then prints `PASS`.
   - `ComprisesMeetFunctionalMethod.fss` with `ComprisesMeetFunctionalMethod.test` (`compile`, `link`, `run`, `run_out_contains=PASS`). The program is the skeptic's `SkFnMethodCover`: `trait S comprises { U, V }` with `tag(self): ZZ32 = 1`, `trait T comprises { V, W }` with `= 2`, `trait U extends S excludes W`, `trait V extends { S, T }` with `= 3`, `trait W extends T`, `object Vo extends V`. It asserts `tag(s)` is 3 for `s: S = Vo`, then prints `PASS`.
   - Beside the second, one control: `XXXComprisesMeetFunctionalMethodUncovered.fss` with `.test` (`compile`, `compile_err_contains=Invalid overloading of tag`). It is the same program with `V` declaring no `tag`, so `V` inherits two declarations and no declaration is below both.

3. **Show the two home-1 tests failing on the current head.** Run all three files through the harness in one JVM (`ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> ProjectFortress/compiler_tests <the three .test files>`, output captured to a file under `tmp/rung-return-type-rule/repair/`).
   - `OverloadBoundNamesForced` must fail with the kind-environment error.
   - `ComprisesMeetFunctionalMethod` must fail with "Invalid overloading of tag".
   - The control must be counted as an expected failure.
   - Commit the three tests alone and push.

4. **Repair D1** in `OverloadingOracle.satisfiesReturnTypeRule` (`OverloadingOracle.scala:105-111`).
   - Build `str` from the forced parameters before `kept`, then make `kept` the unforced parameters with `str` applied to their bounds, for instance `str.replaceStaticParam(p)` (`StaticTypeReplacer.java:117-119`).
   - If that does not substitute in the extends clause, rebuild each parameter with `NodeFactory.makeStaticParam(p, name, bounds)`, mapping the bounds through `str.replaceIn`, as `StaticTypeReplacer.java:189-205` does.
   - Leave the where clause as it is (`None`, base and head). Change nothing else in the function.
   - Count, per the prefix's rule 2, the sites in the three edited Scala files where `ta.extend` receives a declaration's static parameters after some parameters of the same declaration were substituted away, and report the number with each site's line. By my reading the count is one, this site: `forcedArgs` extends the full list (`:133`, `:135`), and `satisfiesPositionalRule` substitutes none of the parameters it extends (`:169`).

5. **Repair D4** in `coversOverlap`'s `listed` (`OverloadingOracle.scala:206-214`). Add one case that reads a `TraitSelfType` by its named trait, for instance `case ts: TraitSelfType => listed(ts.getNamed)`, so that the named trait's clause is read, its static arguments substituted, by the same `comprisesClause` path. Change nothing else in the search.
   - Update the comment at `OverloadingChecker.scala:524-526` only if its wording then needs it.
   - **Fallback to home 2.** Revert the case if, with it, any of these holds: `ComprisesMeetFunctionalMethod` does not compile, link and run printing `tag(s) = 3` and `PASS`; the control is accepted; any test whose verdict was settled before this round changes.
     - Then rename the program to `XXXComprisesMeetFunctionalMethod` with a compile test pinned by `compile_err_contains=Invalid overloading of tag`, and open a provisional row 542 for it (checker gap, home 2).
     - Narrow the scope to "functions, and functional methods whose closed traits sit at a parameter other than self" in the comment at `OverloadingChecker.scala:524-526`, in the decision record's section 3, in the second FACTS entry of `record.md` and in the report.

6. **Write the home-2 tests of D2, D3, D5 and D6** in `ProjectFortress/compiler_tests/`, each an `XXX` compile test over a program that asserts the specification's answer and prints `PASS`, with one comment line.
   - **D2:** `XXXCoverageReturnMethodCall.fss` with `.test`, pinned by the crash. The program is `CoverageReturnGood`'s family with `left(): String = "left"` in `LeftResult` and `right(): String = "right"` in `RightResult`, and it asserts `choose(m).left()` is `"left"` and `choose(m).right()` is `"right"` for `m: M = Vo`. Pin it by the crash's text through whichever key the harness matches, `compile_err_contains=` or `compile_exception_contains=` (`FileTests.java:129-137`, `:340-365`), with the text `IntersectionType cannot be cast`.
     - This is the batch's first `XXX` test whose failure is a compiler exception, so show it through the harness: counted as an expected failure (`OK Saw expected exception` or `Saw expected failure`).
     - Also show a stand-in failing: the same program with `takeLeft(choose(m))` in place of the method calls, so that the compile succeeds and the harness reports the missing expected failure.
   - **D3:** `XXXCoverageReturnInferred.fss` with `.test`, pinned by `compile_err_contains=but declared type is`. The program is `CoverageReturnGood`'s family with `pass[\X\](x: X): X = x`, `y = pass(choose(m))`, `l: LeftResult = y`, `r: RightResult = y`.
   - **D5:** `XXXOverloadReturnObjectDomain.fss` with `.test`, pinned by `compile_err_contains=the return type of Circle->Circle @`. The program is the skeptic's `SkRtrLeaf`: `trait Shape`, `object Circle extends Shape`, `object Square extends Shape`, `ident[\T\](x: T): T = x` beside `ident(x: Circle): Circle = x`, with `c: Circle = ident(Circle)` and `s: Square = ident(Square)`.
   - **D6:** `XXXCoverageReturnGenericFamily.fss` with `.test`, pinned by `compile_err_contains=but declared type is`. The program is `CoverageReturnGood`'s family plus `object Box[\X\] end` and `choose[\X\](b: Box[\X\]): BothResult = BothResult`, with `left: LeftResult = choose(m)` and `right: RightResult = choose(m)`. The key matches in either declaration order.

7. **Rebuild and re-run.**
   - Run `ant compileAll`, then the library-order cache rebuild from an emptied `default_repository/caches`. Record each step's exit code and time.
   - Run the rung's 29 `.test` files together with the 8 to 10 this round adds, through the harness in one JVM. Every plain test must pass and every `XXX` test must be counted as expected. `OverloadBoundNamesForced` and `ComprisesMeetFunctionalMethod` pass (or the fallback's `XXX` file is counted).
   - Run all of `ProjectFortress/compiler_tests/` and all of `ProjectFortress/library_tests/`, one JVM each, and quote each `OK (N tests)` line.
   - Commit the edit and the home-2 tests, and push.

8. **Measure once on the final build.** Run the checker count (`explorations/coordinator/tools/checker-count/run.sh`) and the distance stage (`explorations/coordinator/tools/distance/run.sh`, setting `any`), each once, in the background with `run_bg` and `wait_for`, into `tmp/rung-return-type-rule/repair/`.
   - Compare each with the gate's tables and per-site list (`explorations/compile-ladder/climb-batch-6.5b/gate/`) and with the worker's after (77 and 626).
   - **By my reading neither D1 nor D4 can newly refuse anything.** D1 turns an internal error into the rule's verdict, and D4 turns refusals into acceptances. So any move is a library pair newly accepted by D4, or the variation family BR (row 488).
   - Name each newly accepted library pair with its covering declaration. Tie every other moved site to an edit, or quote it as the BR family's variation.
   - A library declaration newly refused other than the `cond` pair is a stop. So is a stack overflow in the meet search.
   - The ladder is not re-run. Every ladder file compiles today, and the repair only turns refusals into acceptances or an internal error into the rule's verdict. Say so in the report.

9. **Correct `record.md`.**
   - **The first FACTS entry:** add that a kept parameter's bound is read with the forced parameters' solutions substituted, gated by `OverloadBoundNamesForced`. Add that the construction is stricter than the paper where the more specific declaration's domain is an object type: it checks instances whose domain meet is `Bottom`, which the paper sets aside, so `ident[\T\]` beside `ident(Circle)` with `object Circle` is refused, gated by `XXXOverloadReturnObjectDomain`.
   - **The second FACTS entry:**
     - add that functional methods declared in the closed traits are covered through the self type's named trait (`ComprisesMeetFunctionalMethod`, with its control), or the fallback's narrower wording;
     - replace "(Astra's boundary)" by "narrower than Astra's boundary, which excludes only generic declarations that may run", and add that a family with any declaration with static parameters keeps the sort's head, which depends on declaration order (`XXXCoverageReturnGenericFamily`);
     - add that a method call on the intersection-typed result crashes code generation (`XXXCoverageReturnMethodCall`), and that generic inference on it keeps one conjunct (`XXXCoverageReturnInferred`);
     - replace "No library pair is newly accepted" by the measured result of step 8.
   - **New provisional rows** in the ledger table's format:
     - 540: D2, code generation, `CodeGen.java:6236`, home 2, phase 5's list.
     - 541: D3, checker inference on an intersection-typed argument, home 2, beside rows 515 and 518.
     - 542: D5, the Return Type Rule's construction stricter than the paper on object domains, home 2, for Pavol. Its reproducers are `XXXOverloadReturnObjectDomain` and the `SkPosIdiom` shape, quoted in the row: `f[\T\](x: T): T` beside `f[\U\](x: Box[\U\]): Box[\U\]` with `object Box[\U\]`.
     - 543: D6, the intersection typing's scope, home 2, for Pavol.
     - Each row states the base's behaviour as the skeptic measured it: D2 refused, D3 refused by order, D5 compiled and died with `VerifyError: Bad return type`, D6 refused.
   - **The handover line:** update the count of `.test` files, and the count and distance if step 8 moved them.

10. **Correct `decision-record.md`.**
    - Section 1: one paragraph on D1, the bounds substituted and why the base did not need it.
    - Section 3: the scope sentence, per step 5's outcome.
    - Section 4: the ground-family scope stated as narrower than Astra's boundary, with this ruling's two candidates (narrowing to the declarations that may run, with its cost; keeping the scope) and the choice.
    - A short section on D5: the paper's `T ≢ Bottom` and the object-type exclusion, the construction's refusal, the base's `VerifyError`, and why it is left to Pavol.

11. **Write `REPORT.md`.** Take the worker's report text and correct the provenance block's precedent line to "`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:92-100` at 811053f15". Add a section "The repair round". It gives:
    - what this ruling required;
    - each new test's failing run on the pre-repair head (two to five lines, with the command) and its passing or expected-failure run after;
    - the D2 stand-in's verdict line;
    - the sibling count of step 4;
    - step 8's tables and per-site comparison;
    - the list for Pavol, the worker's with this ruling's added.

    Update section 13 (Stops) and the defect table of section 9 with D1 to D6. If the harness refuses the write of `REPORT.md`, say so and carry the repair section in full in the structured result, so that the gather composes `REPORT.md` from the worker's text and yours.

12. **Commit and push.** Commit `record.md`, `decision-record.md` and `REPORT.md`, if written, and push `wip/rung-return-type-rule`. Every commit ends with the prefix's two footer lines.

## 4. For Pavol

- **D5, the Return Type Rule as built for answer 9 is stricter than the paper.** Where the more specific declaration's domain is an object type, it refuses pairs the paper accepts: `ident[\T\](x: T): T` beside `ident(x: Circle): Circle` with `object Circle`, and the common shape `f[\T\](x: T): T` beside `f[\U\](x: Box[\U\]): Box[\U\]` with `object Box[\U\]`.
  - **Why.** The construction checks instances whose domain meet is `Bottom`. The paper excludes those, and an object type has no other subtype (`Specification/basic/types-vals-vars.tex:256-258`).
  - **What the base did.** Both compiled and died with `VerifyError: Bad return type`.
  - **The candidates.** Keep the refusal (conservative, one XXX test); or refine the construction to set aside instances whose domain meet is `Bottom` (a type-theoretic change to the decided rule, in `OverloadingOracle.satisfiesReturnTypeRule`, for batch 8 or later).
- **D6, the intersection typing's scope, a decision taken by this judge.** The rung types a call between two closed traits by the intersection only in a family none of whose declarations has static parameters (`Functionals.scala:683`). That is narrower than Astra's boundary, which excludes only generic declarations that may run. So a family with a generic member that cannot run for the argument keeps the sort's head, which depends on declaration order; it is gated by `XXXCoverageReturnGenericFamily`.
  - **The candidates.** Narrow the condition to the declarations whose domain does not provably exclude the argument's static type, using `OverloadingOracle.excludes`. Or keep it.
  - **Why I kept it.** The narrowing sends the intersection type into more ties, the library's among them, and code generation crashes on a method call on that type (D2).
- **D4, a decision taken by this judge.** The coverage check is extended to a functional method's self type, so that functional methods declared in the closed traits are covered, rather than narrowing the rung's claim and gating the shape as an expected failure. If the extension fails (instruction 5), the claim is narrowed instead, and the report says which happened.
- **The coercion tie, from the skeptic.** A call between two closed traits whose other argument needs the same coercion for every candidate (`choose(S, ZZ64)`, `choose(T, ZZ64)`, `choose(V, ZZ64)` called with a `ZZ32`) is an "Ambiguous coercion" error under batch N's rule as landed. The proof addendum's "once a conversion is fixed" reading would type it by the intersection. That is batch N's rule, kept by C's section, and a question for Pavol, not a defect of this rung.
