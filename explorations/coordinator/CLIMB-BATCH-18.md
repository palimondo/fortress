<!-- The record of climb batch 18, the next batch of the plan's phase 3, "the checker at a true zero", for the coordinating session, the curator and the batch's workers. Drafted 2026-10-17 by an Opus planning worker against `main` at `c2ac88ea1`, whose `Library/`, `ProjectFortress/`, `Specification/`, `build.xml` and `bin/` are those of `65c0cc463`, climb batch 17's landing (`git diff --stat 65c0cc463 c2ac88ea1` over them is empty), so batch 17's landed tables and the per-site list describe the base. The scope is the coordinator's: rung W, the row 766 repair by way A with walk's refusal message (the landing review's findings 1 and 3), then conditional extension for the list comparisons' site with rows 748, 749, 750 and 771; the gather's order (finding 2) is a script edit made before the launch (`coordinator/pending-script-edit.md`, its last section). Sources: PLAN.md, phase 3, item 16, "Pavol's answers", item 60, and "Work that can start now"; `reviews/batch-17-review.md`, its findings and section 6; the probe `perf-probes/trait-generic-method-inference/REPORT.md` with `way-a.patch`; `perf-probes/where-clauses/REPORT.md` B.3 and the shadow's diff in `/home/user/fortress-probe-where`, read only; `reviews/tuple-comparisons-judgement.md`; climb batch 17's gate (`compile-ladder/climb-batch-17/gate/`) and the per-site list; POSITIONS and FACTS by number; the ledger rows; the code at the sites. Nothing was built or run but greps, `git diff`, the extract tool and its `--check` on every briefing key, and the generator's Python and node checks (section 5). Reviewed in place on 2026-10-18 against `main` at `ac74e11c4`, whose original tree is `c2ac88ea1`'s (`git diff --stat c2ac88ea1 ac74e11c4` over `Library/`, `ProjectFortress/`, `Specification/`, `build.xml` and `bin/` is empty); the review read the code, the specification, the probe's report and patch, the ledger rows and the decisions the record cites, applied `way-a.patch` with `git apply --check`, and ran only the manifest's checks (`lists18.py`, `gen18.py`, `check18.js` on a scratch copy). Its changes: `validOnDeclaredDomains` ends at `:793`, not `:799` (rung W, twice); the lexicographic-order sentence of `algebraic-constraints.tex` is at `:519-522` (section 2 and rung X); the gather's order edit is marked done (`ac74e11c4`). Its text: `explorations/coordinator/climb-batch-18-review.md`. One line per paragraph. -->

# Climb batch 18

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. It runs a program without static types. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode.
- **The one library** is the interpreter's library (`Library/`, `ProjectFortress/LibraryBuiltin/`). At the **switch-over** the compiled path takes it over.
- **The distance** is the number of errors the checker reports on the one library. Each error has a **site** (a file and a line). **The count** is the checker's errors on the library's `FortressLibrary` component, read by the **count stage**, which also gives the checker's time.
- A **row** is an entry of the gap ledger, cited by number. An **item** is a numbered question in PLAN's list "Pavol's answers".
- A **rung** is one fix, built by one worker in its own copy of the tree and checked by a second worker, the skeptic. A **batch** is a few rungs, merged and tested together by the **gate** and landed at once. **The gather** lands the approved rungs on `main` one by one; a new row is written `NEW-X-1` and the like until the gather numbers it.
- **Test first.** Every fix starts with a test that shows the defect, seen failing before the edit and passing after. An **expected failure** is a test named `XXX...` that passes while the defect is there; when the fix lands it is **promoted** to a plain name.
- A **generic dotted method** is a method with static parameters of its own, called as `x.f(...)`. Its **bounds** are the types its static parameters must extend; its **coercion targets** are the types an argument may be converted into.
- **Way A** is the row 766 probe's fix: walk reads such a method's bounds and coercion targets in the trait's **method environment**, where the method's instances already read their parameter types, instead of the trait's **member environment**, which has no parent.
- **Conditional extension** is an `extends` entry with a `where` clause of constraints, as `List[\E\] extends LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] }`: a list is ordered exactly when its elements are. **B.3** is the where-clause probe's shadow of it in the checker.
- **P-148**, your rule of 14 October: a rung that changes the checker times the count stage before and after its change, then makes a second pass that makes the checker faster without changing what it accepts, refuses or says.

### Where the distance stands

- After climb batch 17 the distance is 35 and the count 31, the count stage 76 s and the distance stage 180 s ([gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-17/gate/distance.txt); F-53, F-240).
- What the batch moves: rung X, 1 site, `FortressLibrary.fss:2063`, `LexicographicOrder`'s `a CMP b` (class G1, row 634's list half), by the probe's measurement on its own base (37 to 36, nothing new) and by reading on this one; rung K none by reading; rung W changes walk only and moves nothing.
- **The distance expected after the batch: 34, by reading. The count: 30, by reading**, since `:2063` is a typecheck error of the `FortressLibrary` component, which the count holds. Neither is declared. Both are reported, never red (P-39).

### The batch: three rungs

- **W, walk reads a trait's generic method's bounds where the trait declares them (rows 766 and 765), and walk's load check names the rule that refuses a generic pair.** Today a generic dotted method that a trait declares gets quietly wrong instances under walk: `Maker.wrap(z, w)` on a `ZZ32` and a `ZZ64` gives `Box[\AnyIntegral\]` with the `ZZ32` not converted, and `Maker.make()` gives `Empty[\BOTTOM\]`, against P-46, P-48 and P-74. Way A is built and measured: +27 -4 lines in two walk files, both expected failures red on the base and green on it, `testSystem` 649 tests with no failure ([probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/trait-generic-method-inference/REPORT.md)). Beside it, walk's refusal of a generic pair still says "at least one pair of parameters must have excluding types", the rule P-45 removed; the message names the rule that failed, and the tests keyed on the old message are rekeyed (the landing review, finding 3).
- **X, conditional extension in the checker, for the list comparisons' site (row 634's list half).** P-151's last form: a trait that extends another under a `where` condition is that type only where it holds, and its members are checked with it holding. Built as the probe's shadow B.3, re-based onto climb batch 17's rungs A and L; `LexicographicOrder`'s element bounded by `StandardTotalOrder`, `List`'s entry under the condition, and a structural `=` kept on `List` so that a list of pairs keeps its equality ([where-clauses probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/where-clauses/REPORT.md), B.3; [tuple-comparisons judgement](https://github.com/palimondo/fortress/blob/main/explorations/reviews/tuple-comparisons-judgement.md), sections 2 and 3). The site goes, 35 to 34.
- **K, the `where` conditions checked where they apply (rows 748, 749, 750, 753 and 771).** A method's condition on its trait's parameter at a dotted call; a constraint whose bound names a `where`-clause variable, by inferring the variable; a trait's own constraint where its type is used; and a type `where`-clause variable bounded by its binding in the extender check (row 753) and by the clause's constraint at its opening (row 771). Row 771's own note says it waits on row 753, so 753 comes with it. Not probed; each traced to its lines.
- **Why two checker rungs, not one.** Conditional extension with rows 748, 749, 750 and 771, and 753 beside 771, would change seven checker files and five library files in one rung, of which only conditional extension has a shadow; batch 17's workers wrote 0.41M to 0.52M each, its biggest a re-based shadow (A, 0.52M). Split, each rung is the size of one of those, and the two share no declaration (section 3, "The rule the rungs keep").
- If the run must be shorter, K goes first, from its last rows back; W and X stay.

### What the batch leaves out (section 4)

- **Row 697 and P-152's probe**, PLAN's next two items after conditional extension: the coordinator's scope puts them after this batch. Row 697 is read against rung L's landed library first, and the probe starts from rung G's code.
- **Members scoped to the condition** (the coordinator's call on the peers' way, listed for you): it needs rung K's check of a condition at a dotted call, so it waits for the batch after, as a new row. **Walk's half of conditional extension** (walk reads the extension at every instance) waits too, as a new row with an expected-failure test. **The code generator's half** is row 701, after the switch-over.
- PLAN item 16's other candidates, each with what it waits on (section 4).

### Before the batch runs

- **Two questions for you, each with its default** (section 2): item 60, row 766's way (default A); and whether a list of floats gets a partial order under conditional extension (default no). Neither holds the batch: each default can be undone, and none reverses a decision of yours.
- The coordinator first makes the pending script edit (the gather's order, `coordinator/pending-script-edit.md`, its last section; done at `ac74e11c4`), then splices `plan-18/manifest/`, builds the base build, and keeps `/home/user/fortress-probe-where` until the batch lands, since rung X reads its diff.

### Cost

- About 4.0M tokens written, from 3.6M if no fix is contested to 4.7M with a judge and a repair round; a red gate adds about 0.5M. Batch 17 wrote 6.52M for five rungs, 1.30M a rung (`reviews/batch-17-review.md`, section 5).
  - Workers about 1.5M: X 0.55M (a shadow to re-base, five library files, the specification's box and entry, the stages), K 0.55M (five rows by reading in five files, the stages), W 0.40M (a patch that exists, a message, eight test files).
  - Skeptics about 1.3M; the fixed roles about 1.2M.
- About 5 hours at two agents at once (batch 17: 5 h 28 min for five rungs).

## 2. Your answers this batch takes, and the coordinator's calls it builds

### Two questions for you, one per item, each with its default

1. **Item 60, row 766: which way walk repairs a trait's generic dotted method.** Way A reads the method's bounds and coercion targets in the trait's method environment, where its instances already read their types (`way-a.patch`); every trait value then equals the same method's in an object and as a function, and the compiled values do not move (the probe, section 5). Way D gives every trait method that environment, which reaches the overload comparisons and member lookup, and the team kept the two apart ("not yet, it changes overloading semantics", `GenericMethod.java:91-92`). Way C restores the base's loud refusal, which keeps P-48 by stopping and gives none of the checker's values. **Default: A**, rung W. It reverses nothing: P-46, P-48 and P-74 ask for these values.
2. **A list of floats: ordered or not under conditional extension.** The rung bounds `LexicographicOrder`'s element by `StandardTotalOrder`, as the judgement's bound and the team's advanced library do (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`), so the checker gives no order to a list of `RR64`, `QQ` or `Range` values, which are partially ordered; the text says such a list is "partial or total depending on whether the ordering of the elements is partial or total" (`Specification/advanced-lib/algebraic-constraints.tex:519-522`). A second entry under `StandardPartialOrder` would need a lexicographic partial order that the team did not write. Walk keeps today's behaviour for such lists until walk's half lands. **Default: one entry, no order for such a list on the checker**, by P-151's "add nothing it did not", stated in Appendix I's new entry. It can be undone: the other way adds an entry and its trait later.

### The coordinator's calls this batch builds, listed for your review

Each is settled by the record's principles and is reversible; none reverses a decision of yours, so none holds the batch.

1. **Way A's two measured lines kept as the probe left them.** The bound read at `EvaluatorBase.java:491` is kept, since a bound that names another static parameter needs it; `inferByUnification` at `:875` is left, since reading the bound there moved no value and turned one refusal into the function path's internal error (the probe, section 4).
2. **The message names the rule by the specification's name**, as the checker names its own: the No Duplicates Rule keeps walk's message for equal domains, "fails because their parameter lists have the same types"; the Return Type Rule and the Meet Rule each get theirs. Six tests key on the old message, not two: `GenericReturnRuleInvariantWalk` and `GenericReturnRuleOuterParamWalk`, which the review names because they pass on any refusal, and `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk`, `GenericOverloadInstancesApartWalk` and `GenericBoundsNoMeetWalk`. Each is rekeyed to the rule its own comment names.
3. **Conditional extension split from the four rows**, for its size, and row 753 added to rung K, since row 771's note says it waits on 753.
4. **Members checked under the condition, as P-151 says, and not yet scoped to it.** A member so checked stays callable where the condition fails, the probe's hole. Scoping it needs a dotted call's check of a condition on the trait's parameter, which rung K builds as row 748, so it waits for the batch after; rung X files it as NEW-X-1. The team's own note foresaw it: "With conditional subtyping (or conditional methods), we may also not be able to tell whether a trait has a particular method" (`Specification/appendices/internal-document.tex`, its subsection "No Wrapped Fields Whose Types Are Naked Type Variables").
5. **Walk's half waits.** Walk reads an extension under a `where` clause as holding at every instance, and checks an override under it since climb batch 13 (`e8d377669`). Rung X files the reading as NEW-X-2 with an expected-failure walk test. Building it would change walk's values: a list of tuples or of floats would lose its `<` under walk.
6. **A structural `=` on `List`, outside the condition**, with `LexicographicOrder`'s body, as the judgement asks: without it a list of pairs, not ordered, falls to the identity `=` on the checker (`NumberOrderListDeclarations.fss:48` compares such lists).
7. **Only an `extends` clause of constraints alone is conditional**; a clause that binds a new variable keeps today's reading (the probe's B.6), and Appendix I's "Where-clause variables in extends clauses" bars such a variable from an `extends` clause.
8. **The team's comment "a hack to avoid the error of overloaded methods"** (`FortressLibrary.fss:3232`), now above the team's real generic `distribute`, is removed by rung X, the next library rung, as PLAN's default for the review's finding 7 says.
9. **Row 749's repair makes the checker refuse a call that the team's walk test runs**: `GenericFnWithExcludes.fss:44`, `g(O, P)` with `P` a `Y[\2\]`, which no `n` meets, refused by the text. The test runs under walk only, so its verdict stays; the point is listed.

### Points the batch lists for you, not questions

- **Team lines changed:** walk's inference of a trait's generic method and its load check's messages (W); `LexicographicOrder`'s static parameters, `List`'s and `PureList`'s `extends` lines, the comment at `:3232`, and the checker's subtype case of a trait type, its trait and object declaration checks (X); the checker's dotted call, its arrow of a declaration, its trait-type check and its extender check (K).
- **What walk does differently:** a trait's generic dotted method takes the instance its object's own method takes, the `ZZ32` converted, its bound where nothing fixes it (W); an inherited generic functional method beside a plain one is chosen where only it fits (W, row 765); a refused generic pair names its rule (W). The library change moves no walk value (X).
- **What the checker does differently:** a list is ordered only where its elements are totally ordered (X); calls and types that break a `where` condition are refused where they were accepted, and a call that a `where`-clause variable can satisfy is accepted where it was refused (K).
- **Where a rung holds a line:** K, if one of its rows refuses a declaration of the compiler's own library; it lands the rest and reports.

## 3. The rungs

Line numbers are on `c2ac88ea1`, whose `Library/`, `ProjectFortress/` and `Specification/` are those of `65c0cc463`. Each rung's tests come first: written, run through the harness on the base and seen failing, and committed before the edit. A value that matters is asserted inside the test (P-103). A checker rung follows P-148, in its words: "A rung that changes the checker measures how the change affects the time that the checker needs. First the rung makes the change correct. Then it does a second pass that makes the checker faster. This pass must not change the checker's results: the checker accepts and refuses the same programs as before, with the same errors at the same places. The rung's skeptic checks the time and the results." The skill's `compiler.md`, "The checker's time", gives the steps: the count stage once on the base build and once on the correct change, a profile and a second pass, the count stage once after it, the tables equal by `diff` and the whole outputs equal once the tree's path is masked; the timing is a smoke test; your skeptic times the count stage on the base build and on your commit. A rung whose every path is walk's evaluator, a test folder or the specification runs neither stage, as the batch manual's rule on stages that cannot move and F-111 give it.

### W. Walk reads a trait's generic method's bounds where the trait declares them (rows 766 and 765), and its load check names the rule that refuses a generic pair

**The answers this rung follows.** P-46: both paths infer static arguments with coercion and the same promotion; P-74: a call over mixed widths infers the narrowest type that both sides coerce into; P-48: a type parameter that a call's arguments do not fix takes its bound, never Bottom. Row 766 breaks all three for a generic dotted method that a trait declares (the batch 17 landing review, explorations/reviews/batch-17-review.md, finding 1). PLAN's item 60: repair it first in this batch, by walk's bound rules, reading the bounds where the trait declares them; its default is way A of the probe, explorations/perf-probes/trait-generic-method-inference/REPORT.md: walk reads a trait's method's bounds and coercion targets in the trait's method environment, where its instances already read their parameter types (sections 2 to 4), built as way-a.patch beside the report, +27 -4 lines in two walk files, both expected failures red on the base and green on it, ant testSystem 649 tests with no failure (section 6). The patch also repairs row 765. P-45: walk's load check reads every pair of generic declarations on its declared domains by the checker's rules, with no parameter pair required to exclude; the landing review's finding 3: a pair refused there still gets the message of the rule P-45 removed, and two tests pass on any refusal. This record's section 2, calls 1 and 2, settle the two lines the probe measured and the message's form.

**What you build.**
- Rows 766 and 765, from the probe's patch: explorations/perf-probes/trait-generic-method-inference/way-a.patch (its commit 814c1300c is on the local branch wip/probe-row766, not pushed; the patch applies to the base). Write your tests and see them fail on the base first; then take the patch's code, or improve it, and say which.
- What the patch does: GenericMethod.getTypeEnv returns a trait's method's evaluationEnv and any other method's getWithin(); EvaluatorBase.declarationEnv returns it for a GenericMethod and getWithin() for any other generic; boundAtInstances (EvaluatorBase.java:491) and inferWithCoercionOrFail (the bounds at :557, the coercion targets in narrowest's two calls at :634-640) read there. inferByUnification (:875) stays as it is (section 2, call 1). Way D, the trait's method given the method environment as its own, is not yours.
- The message. A pair of declarations with static parameters that the parameter check finds neither excluding nor ordered, and that validOnDeclaredDomains (OverloadedFunction.java:763-793) or genericPairValid (:844) refuses on its declared domains, is reported by describeOverloadingFailure (:568-656) with 'with generic type, at least one pair of parameters must have excluding types' (:582). Name the rule that failed instead, by the specification's name (Specification/advanced/overloading.tex, "Declarations with Static Parameters"): the Return Type Rule and the Meet Rule each with its own message, and the No Duplicates Rule with walk's message for it, 'fails because their parameter lists have the same types' (completeOverloadingCheck, :533-540). Carry the rule that failed out of validOnDeclaredDomains and genericPairValid as you see fit. A pair refused for any other reason keeps today's message; say which pairs those are.

**Rows.**
- Row 766: the gather closes it with TraitGenericMethodInference.
- Row 765: the gather closes it with InheritedGenericFunctionalMethodBesidePlain.
- Notes, not repairs: row 772 (the compiled path's counterpart, which waits for the switch-over); row 539 (the Meet Rule's limited search, whose refusals now name the rule); rows 21 and 364 (the siblings in row 766's notes).

**Distance sites.** None: every path you change is under walk's evaluator, the test folder and the specification's text, which neither stage reads; run neither.

**Files.**
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java (boundAtInstances, :481-504, and a new private declarationEnv after it; inferWithCoercionOrFail, :535-707, its reads at :557 and :634-640 only).
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java (a new getTypeEnv after the constructor, :86-96).
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java (completeOverloadingCheck's refusal, :531-545; describeOverloadingFailure, :568-656; validOnDeclaredDomains, :763-793; genericPairValid, from :844).
- ProjectFortress/tests/: XXXTraitGenericMethodInference.fss renamed TraitGenericMethodInference.fss, with the patch's three assertions; XXXInheritedGenericFunctionalMethodBesidePlain.fss renamed InheritedGenericFunctionalMethodBesidePlain.fss; the six .test files keyed on the old message (below); your new tests.
- Specification/basic/inference.tex (walk's revision box: :290-293, :299-304, :422-424) and Specification/appendices/changes.tex (the entry "The inference of a call's static arguments": :2162-2164 and :2172-2177, only).
- Not: inferByUnification; the library; the checker; any other walk file.

**Tests, first.**
- TraitGenericMethodInference: the patch's text, with Maker.pair, Over.same and Holder.held asserted; on the base 'FAIL: ... other =/= ... Box[ZZ64]' and 'Tests run: 1, Failures: 1'.
- InheritedGenericFunctionalMethodBesidePlain: on the base 'Failed to find any matching overload, args = (Square)'.
- The six tests keyed on 'at least one pair of parameters must have excluding types': GenericReturnRuleInvariantWalk and GenericReturnRuleOuterParamWalk (the Return Type Rule), NoDuplicatesRuleWalk and NoDuplicatesRuleSizeWalk (the No Duplicates Rule), GenericOverloadInstancesApartWalk and GenericBoundsNoMeetWalk (the Meet Rule, an overlap that nothing covers), each by its own comment. Rekey each to the message of its rule first, and see it fail on the base, which gives the old message; after your change it passes. Where a pair's refusal comes another way, keep its key and say why.
- Keep their verdicts: the probe's 14 (its section 6), among them MethodStaticArgCases, MethodStaticArgOverloadedReceiver, NestedReductionFusion and LibraryOverloadFamilies; GenericReturnRuleHoldsWalk, DispatchRenamedGenericArmWalk, DispatchSwappedGenericArmWalk, GenericBesideGenericSameDomain, GenericBesidePlainSameDomain, GenericPairNestedBoundsWalk and XXXOverloadExistentialMeetWalk (row 539).
- After the edit: ant testSystem once, and ant testSpecData once (P-124).

**Specification.** No normative sentence changes: the chapter already infers a method's static arguments with coercion and at its bound. Sentences of walk's revision box in Specification/basic/inference.tex become false, and you edit them in the revision form, since no other rung edits that file: the sentence on row 765 (:290-293), the one on row 766 (:299-304), and the exception for a bounded parameter of a method that a trait declares (:422-424). In Specification/appendices/changes.tex, the entry "The inference of a call's static arguments", the same two sentences (:2162-2164, :2172-2177). No sentence of the specification quotes the message. List every other sentence made false, FACTS F-253's exception and the message as F-155, F-238 and F-252 give it among them, as revival-change material.

**Overlaps by file.**
- No other rung edits walk's sources, inference.tex or your tests.
- changes.tex: rung X adds an entry after "Where-clause variables in extends clauses", and rung K edits the entry "The traits that extend a closed trait"; you edit only "The inference of a call's static arguments".

### X. Conditional extension in the checker, for the list comparisons' site (row 634's list half)

**The answers this rung follows.** P-151: only the where forms the team wrote down are built; a trait that extends another under a where condition is that type only where the condition holds, and its members are checked under the condition; still to build. The curator accepted that reading on 2026-10-16, at 12:35 UTC (the coordinating session's boot note, explorations/coordinator/BOOT.md): the condition holds inside the declaration while its members and overrides are checked, as Swift, Rust and Haskell check it. For lists, the tuple-comparisons judgement's way 3 (explorations/reviews/tuple-comparisons-judgement.md, sections 2 and 3): LexicographicOrder's element bounded by StandardTotalOrder, List's entry under that condition, and a structural = kept on List outside it. The where-clause probe built the checker's half as a shadow, B.3 of explorations/perf-probes/where-clauses/REPORT.md: the site clears, 37 to 36 on its base and nothing new, with ZeroIndexed[\E\] written outside the condition (without it 22 sites came). This record's section 2: question 2 (one entry, under StandardTotalOrder), and calls 4 to 8. P-148 holds; this section's opening gives the count stage's runs.

**What you build.**
- The checker, from B.3's lines of the shadow in /home/user/fortress-probe-where (git -C /home/user/fortress-probe-where diff; its base 528438ac5 is before climb batches 16 and 17). TypeAnalyzer: parents leaves out a parent whose where clause holds constraints only (isConditional); conditionalParents gives each such parent with its conditions at the type's static arguments; the subtype case of a trait type counts a conditional parent where its conditions hold, as a formula. KindEnv.withExtendsConditions adds a declaration's extends conditions to its where clause, so that rung L's constraintBounds (KindEnv.scala:116-131) reads them as bounds. Decls.scala's trait and object cases (:87, :132) and TypeWellFormedChecker's trait and object declaration cases (:193, :203) check the declaration with them holding. Take only B.3's lines: the shadow's B.1 and B.2 lines landed in climb batch 17 as rungs A and L built them, and the shadow's library diff holds Part A's lines too.
- Re-base it onto climb batch 17. The subtype case of a trait type (TypeAnalyzer.scala:299-314) now holds rung A's reading of a parent that opens (:303-309): keep it, and add the conditional parents beside it. parents is memoized (traits.memoParents), and pSub keeps its answers in pSubMemo and in rung S's ground answers (:112-123), which a call of traits.readContext() keeps from storing an answer that read the kind environment, as rung A's case does (:293): check that every memo key that can hold a conditional answer still holds every input that answer reads, the bounds of a type variable among them where a condition names one.
- The library. LexicographicOrder[\T extends LexicographicOrder[\T,E\], E extends StandardTotalOrder[\E\]\] (Library/FortressLibrary.fsi:1344, Library/FortressLibrary.fss:2058). List[\E\] extends { AnyList, ZeroIndexed[\E\], LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] } } (Library/List.fsi:67, Library/List.fss:106), and PureList's List the same without AnyList (Library/PureList.fss:41). One entry, under StandardTotalOrder (question 2's default). A structural = on List outside the condition, opr =(self, other: List[\E\]): Boolean with LexicographicOrder's body (FortressLibrary.fss:2067-2069), in List.fsi and List.fss, so that a list of pairs keeps its = where pairs are not ordered; say how the checker and walk read it beside LexicographicOrder's = where the condition holds.
- The team's comment at FortressLibrary.fss:3232, "a hack to avoid the error of overloaded methods", which sits above the team's real generic distribute since climb batch 17: remove it, a team line changed (call 8).
- Not built here, each filed: a member checked under the condition stays callable where it fails (the probe's XXXCondExtendMemberChecker), NEW-X-1, which waits for rung K's check of a condition at a dotted call; walk reads an extension under a where clause as holding at every instance, NEW-X-2 (calls 4 and 5); the code generator's half, row 701. Other readers of a type's extends clause than parents read it unconditionally (ExclusionOracle.scala:186, TypeHierarchyChecker.scala, STypesUtil's inherited members): leave them, and list what each does with a conditional parent.

**Under walk.** The library change moves no walk value: walk reads the extension at every instance, as in the probe, whose whole walk folder ran as on the base (B.0). List's own = has LexicographicOrder's body. Report any walk test or specification example whose verdict changes.

**Rows.**
- Row 634: its last site, :2063, LexicographicOrder's a CMP b (class G1); the tuple half was built in climb batch 13, rung O (item 43, its default as built). The gather closes the row if the site goes; item 43 stays open for the curator.
- NEW-X-1: a member that a conditional extension's condition checked is callable where the condition fails: Lst[\Fn\](...).lt(...) is accepted (the probe's XXXCondExtendMemberChecker, /home/user/fortress-probe-where/ProjectFortress/compiler_tests/). A refusal not made has no green expected failure: the row only, its reproducer none, the program and the output in its notes.
- NEW-X-2: walk reads an extends entry under a where clause as holding at every instance (Constructor.boundsUnread and its comment, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:725-737): an XXX walk test that a type test of an instance whose condition fails answers false, seen as an expected failure on the base, and the row. No fix.
- Notes, not repairs: row 701; row 752 (rung A's reading in the same subtype case); row 17 (a clause that binds a new variable, which keeps today's reading).

**Distance sites.** 1, :2063: 35 to 34 on your tree. Run the distance stage once on your final tree; its before is climb batch 17's landed list; any site that comes is a point to report. The count: 31 to 30 by reading; not declared, give its table. P-148's runs as this section's opening gives them, with a second pass that stays in your declarations.

**Files.**
- ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala (the subtype case of a trait type in pSubInner, :299-314; parents, :919-924; two new members right after parents, isConditional and conditionalParents).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala (a new member withExtendsConditions at the end of object KindEnv, after lookupOpened).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala (the trait and object cases' extend, :87 and :132).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala (the trait and object declaration cases of walk, :187-206, only).
- Library/FortressLibrary.fsi (:1344) and Library/FortressLibrary.fss (:2058; the comment at :3232); Library/List.fsi and Library/List.fss (List's extends line and its =); Library/PureList.fss (:41).
- Specification/basic/trait-parameters.tex (a revision box in "Where Clauses") and Specification/appendices/changes.tex (a new entry, after "Where-clause variables in extends clauses", :127-154).
- New files in ProjectFortress/compiler_tests/ and ProjectFortress/tests/.
- Not: TypeAnalyzer's whereSizes and openWhereSizes, TypeWellFormedChecker's trait-type case, STypesUtil.scala, Functionals.scala and TypeHierarchyChecker.scala (rung K's); walk's evaluator; the rest of the library.

**Tests, first.**
- CondExtendChecker, a typecheck test: a pair is ordered when its elements are, and a vector adds when its elements do (the probe's file in /home/user/fortress-probe-where/ProjectFortress/compiler_tests/). On the base 4 errors, among them 'Ill-formed type: Ord[\E\]' and 'No such method E.lt.'.
- XXXCondExtendRefuseChecker, a compile test keyed on 'has 2 errors': a pair of functions is not ordered and a vector of strings does not add. On the base 'Saw wrong failure'.
- The XXX walk test of NEW-X-2.
- The library part's test is the distance stage, before and after, site by site.
- Keep their verdicts: NumberOrderListDeclarations, OverrideConditionalExtensionWalk, XXXOverrideNothingConditionalExtensionWalk, conditionalExtension, the list, where-clause and generator tests of walk; OpenTypeChecker, the open-type tests and NatOpen; the compiler, library and other-compiler tracks.
- After the change and again after the pass: ant testQuick; ant testSystem once and ant testSpecData once, since the library changes what walk loads (P-124); your change's ladder subset as the skill's gate.md, "The ladder regression", gives it.

**Specification.** The meaning of an extends entry's where clause is stated nowhere: the traits chapter gives its grammar only, and the front matter lists "where clauses and conditional extension" as not supported (Specification/fortress/preamble.tex:95), which stays true while the code generator refuses where clauses (row 701). Add a revision box in Specification/basic/trait-parameters.tex, "Where Clauses", in the S1 form: a declaration that extends a type under a where clause of constraints is that type exactly where the constraints hold, and its members are checked with them holding. Its Appendix I entry, new, after "Where-clause variables in extends clauses": the change, P-151 as the reason, and as Effect what each path does: the checker as built; walk at every instance (NEW-X-2); members callable where the condition fails (NEW-X-1); the code generator's refusal (row 701); a list of partially ordered elements given no order, against Specification/advanced-lib/algebraic-constraints.tex:519-522 (question 2). Specification/basic/operators/opr-overview.tex:293-295, lists compared when their elements support the comparison, holds for the checker after your change. List every sentence made false, F-243, F-244 and the open-asks note's account of walk among them, as revival-change material.

**Overlaps by file.**
- TypeAnalyzer.scala: rung K changes whereSizes and openWhereSizes (:860-916); you change the subtype case of a trait type, parents, and add two members after parents. No declaration in common.
- TypeWellFormedChecker.scala: rung K changes the trait-type case (:225-249); you change the trait and object declaration cases (:187-206).
- changes.tex: rung W edits "The inference of a call's static arguments" and rung K "The traits that extend a closed trait"; your new entry is the only hunk near :155.
- No other rung edits KindEnv.scala, Decls.scala or the library.

### K. The where conditions checked where they apply (rows 748, 749, 750, 753 and 771)

**The answers this rung follows.** P-151: only the where forms the team wrote down are built, and a method's where condition bounds its static parameters; climb batch 17 built the checker's reading of a constraint as a bound (rung L, F-250) and the opening of a type where-clause variable at a call (rung A, F-251), and left the checks of this rung as rows. The rules: a where clause's constraints hold for the declaration and bound the variables they name (Specification/basic/trait-parameters.tex, "Where Clauses"); the team's where calculus checks a method's bounds at a dotted call (Specification/appendices/calculi/where/static.tex, the invocation rule at :282), and the coordinator's call on the peers' way, listed for the curator, says the same (PLAN, phase 3, the line on where clauses): row 748. A call is applicable where some value of the clause's variable meets every constraint: row 749. A trait's or object's own constraint holds at each instance of its type, as walk already refuses 'String must subtype Shows': row 750. A comprises clause lists a type at every value of its where-clause variable, the types below its bound, and an extender must be a subtype of a listed type (Specification/basic/traits.tex, "Trait Declarations"): row 753; the clause's constraint on the variable bounds it: row 771, whose own note says it waits on row 753, so the two go together, 753 first. P-148 holds; this section's opening gives the count stage's runs.

**What you build.**
- Row 748: a dotted call of a method whose where clause constrains its trait's or object's static parameter checks the constraint at the receiver's static arguments; a candidate whose constraint fails is not applicable. The site, by reading: getCandidatesForMethod (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:950-983), whose methods come instantiated at the receiver, beside the fold that already checks a constraint on the declaration's own parameter (STypesUtil.scala:189-204). A functional method's lifted arrow is already checked (row 748's note): keep it.
- Row 749: makeArrowFromFunctional (STypesUtil.scala:157-213) binds the where clause's own variables, the nat n of where [\nat n\]{...}, as static parameters of the arrow, to be inferred at the call, so that a constraint whose bound names one is met where some value of it meets every constraint.
- Row 750: the trait-type case of TypeWellFormedChecker's walk (:225-249) checks a trait's or object's own where constraints at the type's static arguments, beside each argument's bound; the constructor call Wrap[\String\]("s") is reached through that case or through the constructor's arrow, which makeArrowFromFunctional builds with the Constructor's where (:178-181): say which.
- Row 753: checkDeclComprises (TypeHierarchyChecker.scala:273-368) reads a listed type at a type where-clause variable at the types below the variable's bound: its inference variable (:319-323) carries the binding's bound.
- Row 771, after 753: whereSizes (TypeAnalyzer.scala:860-877) bounds a type where-clause variable also by a trait constraint of the clause on it, as where [\E\] { E extends Foo }, so that openWhereSizes's opened type (:901-916) carries it, and the extender check of row 753 reads the same bound.
- Take the rows in that order, each as far as it is traced; a row not built keeps its test as it is, with a note of where it stopped.
- Since you edit TypeWellFormedChecker.scala, reproduce once the residual case of climb batch 16's rung K's judge (explorations/compile-ladder/rung-checker-abstract-callsite/JUDGE.md, section 5, item 4): next[\T\](next[\T\](x)) with a bounded next, the inner call ill-formed. If the outer call gives no error of its own, write the row as NEW-K-1, no fix: its code, the error places of TypeWellFormedChecker.scala:50-56, is no rung's.
- The guard: a declaration of the one library or the compiler's own library that your change refuses is a point to report; if it refuses one of the compiler's own library, hold that row's line and land the rest. SumReduction's two distribute overloads carry a method condition on the trait's T (Library/FortressLibrary.fss:3418, :3420): read the dotted calls that reach them, Generator2.fss's r.distribute(q) among them, against row 748's check, and report.

**Rows.**
- Row 748: the gather closes it with your new test.
- Row 749: XXXWhereVariableBoundCall then passes the checker and stops at the code generator (row 701): promote it to a typecheck test named by its topic; the gather closes the row. The team test GenericFnWithExcludes.fss:44, g(O, P) with P a Y[\2\], is refused by the text and runs under walk: a note (section 2, call 9).
- Row 750: the gather closes it with your new test.
- Row 753: the gather closes it with your new test.
- Row 771: XXXOpenTypeWhereConstraintChecker then passes: promote it; the gather closes the row.
- NEW-K-1, only if the judge's nested call reproduces, as above.
- Notes, not repairs: row 470 (a static argument written at a top-level call, not checked against a folded bound); row 754 (walk's sibling of row 753 at load); rows 677 and 701.

**Distance sites.** None by reading: the library's one type where-clause variable in a comprises clause, AnyList's E, has neither a bound nor a constraint; no trait or object of the library has a where constraint of its own; and its one method condition on a trait's parameter is SumReduction's. Run the distance stage once on your final tree; its before is climb batch 17's landed list; any site that comes is a point to report. The count is not declared: give its table. P-148's runs as this section's opening gives them, with a second pass that stays in your declarations.

**Files.**
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala (getCandidatesForMethod, :950-983).
- ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala (makeArrowFromFunctional, the four-argument form, :157-213).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala (the trait-type case of walk, :225-249, only).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala (checkDeclComprises, :273-368).
- ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala (whereSizes, :860-877, and openWhereSizes, :901-916, only).
- Specification/appendices/changes.tex (the entry "The traits that extend a closed trait": the clauses on rows 771 and 753, :1486-1498, only).
- New, promoted and rekeyed files in ProjectFortress/compiler_tests/.
- Not: TypeAnalyzer's pSubInner, parents and the members rung X adds after it; TypeWellFormedChecker's trait and object declaration cases; Decls.scala and KindEnv.scala (rung X's); walk; the library.

**Tests, first.**
- Row 748: an XXX test keyed on the refusal of Holder[\String\]("s").showIt() for showIt(): String where { T extends Shows } in Holder[\T\] (the probe's XXXWhereBoundCallChecker, /home/user/fortress-probe-where/ProjectFortress/compiler_tests/, its dotted half); on the base the call is accepted.
- Row 749: XXXWhereVariableBoundCall, keyed on 'is not applicable to an argument of type (O, P)': green on the base; with your fix it fails as the call passes; then promoted.
- Row 750: an XXX test keyed on the refusal of the type Wrap[\String\] for object Wrap[\T\](x: T) where { T extends Shows }, and of object Ob extends Tr[\String\] for trait Tr[\T\] where { T extends Shows } (row 750's programs); on the base both are accepted.
- Row 753: an XXX test keyed on the refusal of object NBox[\E extends Object\](item: E) extends AnyNumBox for trait AnyNumBox comprises { NBox[\E\] } where [\E extends Number\] (row 753's program); on the base it is accepted.
- Row 771: XXXOpenTypeWhereConstraintChecker, keyed on 'is not applicable to an argument of type AnyBox.': green on the base; with your fix it fails as the call passes; then promoted.
- Keep their verdicts: WhereBoundMethodChecker, XXXWhereBoundFunctionCall, XXXWhereBoundChecker (row 701's wall), OpenTypeChecker and the open-type tests, NatOpen and the other where-size tests; the compiler, library and other-compiler tracks.
- After the change and again after the pass: ant testQuick.

**Specification.** No normative sentence changes: the where clauses' chapter and the traits chapter already state these rules. In Specification/appendices/changes.tex, the entry "The traits that extend a closed trait", the clauses on row 771 (:1490-1493) and on row 753 (:1494-1498) become false as each row is repaired: edit them in the revision form, since no other rung edits that entry. No sentence of the specification names rows 748, 749 or 750. List every other sentence made false, F-250's holes and F-251's among them, as revival-change material.

**Overlaps by file.**
- TypeAnalyzer.scala and TypeWellFormedChecker.scala with rung X, different declarations, as rung X's section gives them.
- changes.tex: rungs W and X edit other entries.
- No other rung edits Functionals.scala, STypesUtil.scala or TypeHierarchyChecker.scala.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another rung of the same batch (PLAN, "The principle for the batches"). No rung lands only with another.
- The declarations each rung changes. W: EvaluatorBase.boundAtInstances and inferWithCoercionOrFail, a new declarationEnv; GenericMethod's new getTypeEnv; OverloadedFunction.OverloadComparisonResult's completeOverloadingCheck and describeOverloadingFailure, validOnDeclaredDomains and genericPairValid. X: TypeAnalyzer's subtype case of a trait type in pSubInner and parents, two new members after parents; KindEnv's new withExtendsConditions at the end of object KindEnv; Decls' trait and object cases; TypeWellFormedChecker's trait and object declaration cases; LexicographicOrder in the api and the component; List's extends line and its new = in List.fsi and List.fss; PureList's List; the comment at FortressLibrary.fss:3232. K: Functionals.getCandidatesForMethod; STypesUtil.makeArrowFromFunctional; TypeWellFormedChecker's trait-type case; TypeHierarchyChecker.checkDeclComprises; TypeAnalyzer's whereSizes and openWhereSizes.
- Files two rungs share, each in different declarations, as climb batch 17 counted a case of a match as its own declaration (rung A's and the conditional extension's two cases of pSubInner): TypeAnalyzer.scala (X at :299-314, :919-924 and after; K at :860-916); TypeWellFormedChecker.scala (X at :187-206; K at :225-249); changes.tex (X, a new entry near :155; K, :1486-1498; W, :2162-2177). Each rung edits its own sentences; the gather merges the hunks and changes no wording.
- The gather's order on the shared files: X, then K, then W, by each rung's lowest edited line in those files, the same under the script's rule today and under the edit made before the launch.
- X and K time the count stage, and their skeptics time it again, a smoke test each. W runs neither stage.
- They meet in the measures: X and K each run the distance on their own trees; the gate's tables on the merged tree are the first with both. They meet in walk's suite: W's change and X's library reach walk, and the gate runs them together.

## 4. The candidates, and what the batch leaves out

### PLAN's order for batch 18

- **Row 766's repair (item 60), with walk's message (finding 3).** A patch exists and is measured (the probe): 2 walk files, +27 -4; the message, 1 walk file by reading. No declaration in common with any rung. **Goes in, rung W, first.**
- **Conditional extension, for the list comparisons' site (row 634's list half; F-243), 1 site.** The shadow B.3 in `/home/user/fortress-probe-where`: `TypeAnalyzer.scala` about +31 -2, `KindEnv.scala` about +15, `Decls.scala` +4 -2, `TypeWellFormedChecker.scala` +4 -2; the library 5 files, +5 -5, and the structural `=` beside it. It built on rung A's subtype case and rung L's `constraintBounds`, both landed now. **Goes in, rung X.**
- **Rows 748, 749, 750 and 771, with row 753.** Not probed; each traced to its lines in its row (`STypesUtil.scala:189-204`, `KindEnv.scala:113-128`, `TypeAnalyzer.scala:868`, `TypeHierarchyChecker.scala:319-323`). 5 files by reading. **Goes in, rung K**, apart from rung X for size (section 1).
- **Row 697**, walk's object-type shortcut (`OverloadedFunction.java:486`), read against rung L's landed library and rung W of batch 16's readings first, since its notes are full. Not read yet. It would share `OverloadedFunction.java` with rung W, in another declaration. **Waits** for the batch after, by the coordinator's scope.
- **P-152's probe** for the algorithm on both paths (rows 740 and 741), starting from rung G's code. No probe taken. **Waits**, by the coordinator's scope.

### The other candidates of PLAN's item 16, each with what it waits on

- The checker's rows 714, 725 and 691; rows 756, 758, 759 (its text fix, the landing review's finding 4), 764, 768 and 770. Not traced, or not in scope. **Wait.** K.judge.3's nested call, for the next rung that edits `TypeWellFormedChecker.scala`, is rung K's reproduction, a row only if it fails.
- The walk rows 444, 665's abstract half with 728 and 723, 717 and 719, 721 and 722, 746, and climb batch 17's 755, 760, 761 and 762: each on the reading, probe or logging build its PLAN line gives. **Wait.**
- The three `String` sites, on row 743; the integer power's 5 sites, on item 58; rows 695, 700 and 425; the Scala walker in the visitor's shape, on a profile; rows 763 and 757. **Wait.**
- Not candidates: the arrays' 21 sites, item 46's fused arm, row 731's 3, rows 698, 699, 706, 537, 705 and 710 (PLAN, item 16).

### Not in this batch, and why

- **Members scoped to the condition** (F-244; the coordinator's call on the peers' way): it needs a dotted call's check of a condition on the trait's parameter, which rung K builds as row 748, and conditional extension, which rung X builds; no rung builds on another. NEW-X-1 records it.
- **Walk's half of conditional extension** (NEW-X-2): its own rung, and a walk change of values (section 2, call 5).
- **The code generator's half of `where` clauses** (row 701): after the switch-over.
- **The gather's order** (the landing review's finding 2): a script change, made before the launch (section 5, "Before the launch", step 1).
- **The review's minor items** (finding 7): the comment at `:3232` goes in rung X; `XXXExpectedTypeFixRungT.fss` line 1 waits for the next batch that edits that file, none here.

## 5. How it is run

The batch runs on the workflow of batch 17: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`, with the gather's order of `coordinator/pending-script-edit.md`, its last section. Each rung's worker does its rung test first; a checker rung times the count stage before and after its change and makes its speed pass; its skeptic checks it, times the count stage itself where the rung changes the checker, and fixes what it finds, test first; a judge rules only on a fix the skeptic marks contested, on a rung the skeptic refuses, or on a worker's stop; the gather lands the rungs on `main` and folds their record lines and their ledger rows through `coordinator/tools/ledger.py`; the merged-diff review and the gate run side by side; the commit stage lands the gate's tables, runs the quick microGPT walk check and pushes. The batch writes no skill text. Section 3 is each worker's brief word for word; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-18/manifest/gen18.py` reads with the briefings of `lists18.py` beside it, and `check18.js` checks.

### The generator

`plan-18/manifest/` is committed with this record: `gen18.py`, `lists18.py` and `check18.js`, made from `plan-17/manifest/`. Changed from batch 17's: the batch's values; the three rungs W, X and K; `check18.js` checks that no rung declares `landsOnlyWith`, that X and K state P-148 and the count stage, and that W says neither stage runs. On `c2ac88ea1`: `lists18.py`, 78 briefing keys, every one matching one place, 0 problems; `gen18.py`, then `check18.js` on a scratch copy of the script, 0 problems; `workflow-scenarios.js` on the spliced scratch copy, 0 problems, and again on that copy with the pending script edit's three script changes applied, 0 problems, the gather's brief then reading "here: none in this batch". The tracked script is not spliced: the coordinator makes the script edit and then the splice ("Before the launch", steps 1 and 3).

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry. "Its test is the stage" means the checker count or the distance is the rung's failing-then-passing test; no rung here has that, since each has a test file first. "Joins the gate" names a step the gate gains once the rung lands; none does, and `ant testSpecData` runs because 17's landed summary has it. No rung declares a checker count: it is reported, never red, and by reading it falls by one. The expected minutes order the scatter only. The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands; only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### W
- **slug:** `rung-walk-trait-method-bounds`
- **worktree:** `/home/user/fortress-traitbounds`
- **expected minutes:** 110
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** walk reads the bounds and coercion targets of a generic dotted method that a trait declares in the trait's method environment, way A of the row 766 probe (rows 766 and 765, both expected failures promoted), and its load check names the overloading rule that refuses a generic pair instead of the excluding pair P-45 removed, the six tests keyed on the old message rekeyed; no site; Java in walk's EvaluatorBase.java, GenericMethod.java and OverloadedFunction.java, and walk's sentences in inference.tex and Appendix I.
- **points to report:**
  - Whether you took way-a.patch's code as it is or changed it, and why.
  - Each value of the probe's table that your build gives otherwise.
  - A walk test whose verdict changes beyond the two promotions and the rekeyed tests.
  - Each test keyed on the old message, with its new key and the rule its pair breaks; each pair still refused with the old message, and why.
  - The team lines changed in walk's inference and in its load check's messages.
  - Every sentence made false, and the specification sentences you edited.
  - A walk edit beyond the three files named, or any library or checker edit.

#### X
- **slug:** `rung-checker-conditional-extension`
- **worktree:** `/home/user/fortress-condextend`
- **expected minutes:** 160
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** by P-151, conditional extension in the compiled checker: a trait that extends another under a where clause of constraints is that type only where they hold, its members checked with them holding (the where-clause probe's B.3, re-based onto climb batch 17's rungs A and L); LexicographicOrder's element bounded by StandardTotalOrder, List's entry under that condition, and a structural = kept on List (row 634's list half); 35 to 34 by reading; Scala in TypeAnalyzer.scala, KindEnv.scala, Decls.scala and TypeWellFormedChecker.scala, the library's FortressLibrary, List and PureList, trait-parameters.tex and Appendix I.
- **points to report:**
  - The distance and count tables before and after, site by site; :2063 and any site that comes.
  - Each count run's seconds, base, change and pass, and how every memo key that can hold a conditional answer stays whole.
  - The other readers of a type's extends clause and what each does with a conditional parent.
  - A walk test or a specification example whose verdict changes, and any walk value that moves.
  - NEW-X-1 and NEW-X-2, with their programs and outputs.
  - The team lines changed in the library, the comment at :3232 among them, and the structural = added.
  - Every sentence made false, and the specification text you added or edited.
  - A checker file edited beyond the four named, or any walk edit.

#### K
- **slug:** `rung-checker-where-checks`
- **worktree:** `/home/user/fortress-wherechecks`
- **expected minutes:** 150
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the compiled checker checks where conditions where they apply: a method's condition on its trait's parameter at a dotted call (row 748), a constraint whose bound names a where-clause variable by inferring the variable (row 749), a trait's own constraint where its type is used (row 750), and a type where-clause variable bounded by its binding in the extender check and by the clause's constraint at its opening (rows 753 and 771); no site by reading; Scala in Functionals.scala, STypesUtil.scala, TypeWellFormedChecker.scala, TypeHierarchyChecker.scala and TypeAnalyzer.scala, and Appendix I's clauses on rows 771 and 753.
- **points to report:**
  - Which rows you built, and where each row you did not build stopped.
  - A declaration of the one library or the compiler's own library that your change refuses, and whether its row's line landed.
  - The count and distance tables before and after; any site that comes or goes.
  - Each count run's seconds, base, change and pass.
  - Each test promoted or rekeyed, with its new key, and the team test GenericFnWithExcludes's call at its line 44.
  - Whether the judge's nested call reproduced, and NEW-K-1 if it did.
  - Every sentence made false, and the Appendix I sentences you edited.
  - A checker file edited beyond the five named, or any library, walk or code-generator edit.

### What every agent of the run reads first

This run is climb batch 18, the record CLIMB-BATCH-18.md, phase 3's next batch after climb batch 17, toward the checker at a true zero. Its three rungs: W, walk reads the bounds and coercion targets of a generic dotted method that a trait declares in the trait's method environment, way A of the row 766 probe, which repairs rows 766 and 765, and walk's load check names the overloading rule that refuses a generic pair; X, conditional extension in the compiled checker by P-151, for the list comparisons' site (row 634's list half), with LexicographicOrder's element bounded by StandardTotalOrder, List's entry under that condition and a structural = kept on List; K, the where conditions checked where they apply, rows 748, 749, 750, 753 and 771. The distance stands at 35 and the count at 31 after climb batch 17 (compile-ladder/climb-batch-17/gate/), the count stage 76 s at its gate; by reading the distance falls to 34 and the count to 30. The two checker rungs, X and K, follow P-148: the count stage timed once on the base build and once on the correct change, a profile and a second pass that keeps every result, as the skill's compiler.md, "The checker's time", gives the steps, and their skeptics time it again. W changes walk only and runs neither stage. No two rungs change one declaration, and no rung builds on another. W edits walk's EvaluatorBase.java, GenericMethod.java and OverloadedFunction.java's pair messages; X TypeAnalyzer's subtype case of a trait type and parents, KindEnv, Decls' trait and object cases, TypeWellFormedChecker's declaration cases, and the library's LexicographicOrder, List and PureList; K Functionals' dotted call, STypesUtil's arrow, TypeWellFormedChecker's trait-type case, TypeHierarchyChecker's extender check and TypeAnalyzer's where-clause variables. Each rung edits its own specification sentences, in entries no other rung edits. ant testSpecData runs in the gate because climb batch 17's landed summary has it.

### Before the launch

The coordinator, in this order:
1. The pending script edit, the gather's order (`coordinator/pending-script-edit.md`, its last section): the script's gather brief and the manual's "Gather", "The order", with `node explorations/coordinator/tools/workflow-scenarios.js` on the edited script; its commit on `main`. Done: `ac74e11c4`, marked applied in `843967112`.
2. This record's questions put to the curator, one per message, or taken at their defaults under the standing go (the `coordinator` skill's `references/batch.md`, "The go"), and the review of the record in place before the launch, as `batch.md`, "The go", gives it.
3. The briefings checked on the base: `python3 -B explorations/compile-ladder/plan-18/manifest/lists18.py`, every key matching one place. The block generated and spliced: `python3 -B explorations/compile-ladder/plan-18/manifest/gen18.py`, then `node explorations/compile-ladder/plan-18/manifest/check18.js`, which splices it into a scratch copy and checks it; then `check18.js --write`, `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. The base is `main`'s head after that commit, its full hash, passed as `args.base`; no launch value is set by hand.
4. After step 3's commit, the base build at `/home/user/fortress-base18`, cut at the base, as the manual's "Before the launch" steps 2 and 3 give it (`ant compileAll`, the library order, one passing walk test, `git status --porcelain` empty), passed as `args.baseBuild`; one trial seed (`/home/user/fortress-seedcheck`, removed after) and one `old-fortress.sh` run of `BooleanOps.fss` from the main tree prove it. The checker rungs and their skeptics time the count stage on it, so nothing else builds or runs there.
5. The probe worktree `/home/user/fortress-probe-where` kept until the batch lands (rung X reads its diff and its untracked tests, rung K one test); the branch `wip/probe-row766` kept beside `way-a.patch`.
6. `df -h /` against three seeded worktrees (about 206 MB each), the base build, and the count and distance stages' scratch folders; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`.
7. Check-ins armed for the run's length, about 5 hours, 45 minutes apart, and one after the session's next predicted process stop; a run stopped there is resumed with `resumeFromRunId`.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base18'}})`. The arguments are kept byte for byte in the session's scratchpad, as `batch18/launch-args.json`, since a resume needs them: `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', resumeFromRunId: '<the run id>'})`.

### The briefings, rung by rung

Each key is a `facts-extract.sh` key, read whole by the worker first; a key marked (check) is also read by the skeptic, a judge and a repair round. The reasons are in `lists18.py` and rendered at the end of the worker's brief; every key matched exactly one place on `c2ac88ea1`. `EV` is `ProjectFortress/src/com/sun/fortress/interpreter/evaluator`; `SC` is `ProjectFortress/src/com/sun/fortress/scala_src` and `TC` is `SC/typechecker`; TGM is the probe `perf-probes/trait-generic-method-inference/REPORT.md` and WC the where-clause probe's report, under `explorations/`.

- **W**, 27 keys, 11 checks: P-46 (check), P-48 (check), P-74, P-45 (check); F-253 (check), F-252, F-155; ledger 766 (check), 765 (check), 772, 539; TGM "2. The cause" (check), "3. The ways", "4. The patch" (check), "5. Values", "6. Tests", "8. Sentences made false"; the batch 17 review's findings; inference.tex "The Static Arguments of a Call" (check); overloading.tex "Declarations with Static Parameters"; the code of EvaluatorBase's boundAtInstances (check) and inferWithCoercionOrFail, GenericMethod's fields and constructor, OverloadedFunction's describeOverloadingFailure (check), validOnDeclaredDomains and genericPairValid, and XXXTraitGenericMethodInference.fss.
- **X**, 29 keys, 11 checks: P-151 (check), P-148 (check), P-42, P-27; F-243 (check), F-244 (check), F-251; ledger 634 (check), 752, 748, 701; WC "B.3" (check), "A.2.4", "A.6", "B.6"; the tuple-comparisons judgement's "2. The ways" and "3. The recommendation" (check); the open asks' "Ask 1"; trait-parameters.tex "Where Clauses" (check); opr-overview.tex "Comparisons Operators"; changes.tex "Where-clause variables in extends clauses"; the code of TypeAnalyzer's subtype case of a trait type (check) and parents (check), object KindEnv, Decls' trait and object cases, TypeWellFormedChecker's declaration cases, LexicographicOrder (check), List's trait, NumberOrderListDeclarations' lists.
- **K**, 22 keys, 12 checks: P-151 (check), P-148 (check); F-250 (check), F-251, F-244; ledger 748, 749, 750, 753, 771 (each check), 470, 754; WC "B.2"; trait-parameters.tex "Where Clauses" (check); the where calculus's "Static Semantics"; changes.tex "The traits that extend a closed trait"; the code of STypesUtil.makeArrowFromFunctional (check), Functionals.getCandidatesForMethod (check), TypeWellFormedChecker's trait-type case, TypeHierarchyChecker.checkDeclComprises (check), TypeAnalyzer's whereSizes to parents; climb batch 16 rung K's judge, "5. What lands unmeasured".

### The gate, and what it should show

The comparands are climb batch 17's `summary.txt`, `checker-count.txt` (31) and `distance.txt` (35), with `distance-sites.tsv`.
- `testSystem`: 649, the comparand's sum (156, 171, 157 and 165 over the four shards), plus the files W and X add; a promotion or a rekey moves nothing.
- `testFast`: the compiler track 1,251 plus the cases X and K add; the library track 86, the other-compiler track 263; the misc track's 51 classes and 439 tests.
- `testSpecData`: 130 green.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: no rung declares a move; X's library change is the one that could move a file's output, a point to report.
- The checker count: reported, not declared; 30 by reading (`:2063`).
- The distance, reported and never red: 34 by reading; `:2063` gone, nothing new.
- microGPT's quick pair at the commit stage, both programs `ALL PASS`, 7 of 7 each (P-30; 47 s and 40 s at batch 17).
- A repair after the review or the gate runs the gate again only when it changed a path the gate reads (`ProjectFortress/` but test files, `Library/`, `build.xml`).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather, in the order it applies the rungs; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`. The rows the rungs open by plan: NEW-X-1 (a member checked under a conditional extension's condition is callable where it fails) and NEW-X-2 (walk reads an extension under a `where` clause at every instance); NEW-K-1 only if climb batch 16's rung K's judge's nested call reproduces. Rows the rungs close, each as its test passes on the merged tree: 766 and 765 (W); 634 (X, if `:2063` goes); 748, 749, 750, 753 and 771 (K, each it builds). Notes: 772, 539, 21, 364 (W); 701, 752, 17 (X); 470, 754, 677, 701 (K). Where `ledger.py` refuses a note for length or a closed row, the gather lists the text for the coordinator.

### After the landing

The coordinator: the landing report; the routing of every item for the curator into PLAN, item 60 and this record's questions and calls among them; P-151's "Still to build" narrowed to walk's half and the members' scope; FACTS consolidated (F-253 by W, F-243 and F-244 by X, F-250 and F-251 by K, F-155, F-238 and F-252's message by W); the skill writer's task; the post-batch review; batch 19's lists: row 697, P-152's probe, members scoped to the condition and walk's half of conditional extension.

## 6. Files cited, with their links

- Records: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [BOOT.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/BOOT.md), [CLIMB-BATCH-17.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-17.md), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md), [climb-batch-workflow.js](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.js), [pending-script-edit.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/pending-script-edit.md), [batch-redesign.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/process-engineering/batch-redesign.md), [plan-17/manifest/gen17.py](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-17/manifest/gen17.py), [the batch 17 review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-17-review.md), [open-asks-2026-10-16.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/open-asks-2026-10-16.md), [the tuple-comparisons judgement](https://github.com/palimondo/fortress/blob/main/explorations/reviews/tuple-comparisons-judgement.md), [batch 17's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-17/gate/summary.txt), [the per-site list](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/gate/distance-sites.tsv).
- Probes: [trait-generic-method-inference](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/trait-generic-method-inference/REPORT.md) with [way-a.patch](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/trait-generic-method-inference/way-a.patch), [where-clauses](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/where-clauses/REPORT.md). The worktree `/home/user/fortress-probe-where` and the branch `wip/probe-row766` are local, not on GitHub.
- Library: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi), [List.fss](https://github.com/palimondo/fortress/blob/main/Library/List.fss), [List.fsi](https://github.com/palimondo/fortress/blob/main/Library/List.fsi), [PureList.fss](https://github.com/palimondo/fortress/blob/main/Library/PureList.fss), [Generator2.fss](https://github.com/palimondo/fortress/blob/main/Library/Generator2.fss).
- Walk: [EvaluatorBase.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java), [GenericMethod.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java), [OverloadedFunction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java), [Constructor.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java).
- Checker: [TypeAnalyzer.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala), [KindEnv.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala), [Decls.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala), [TypeWellFormedChecker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala), [Functionals.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala), [STypesUtil.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala), [TypeHierarchyChecker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala), [ExclusionOracle.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExclusionOracle.scala).
- Tests: [XXXTraitGenericMethodInference.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/XXXTraitGenericMethodInference.fss), [XXXInheritedGenericFunctionalMethodBesidePlain.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/XXXInheritedGenericFunctionalMethodBesidePlain.fss), [GenericReturnRuleInvariantWalk.test](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/GenericReturnRuleInvariantWalk.test), [NumberOrderListDeclarations.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/NumberOrderListDeclarations.fss), [GenericFnWithExcludes.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/GenericFnWithExcludes.fss), [XXXWhereVariableBoundCall.test](https://github.com/palimondo/fortress/blob/main/ProjectFortress/compiler_tests/XXXWhereVariableBoundCall.test), [XXXOpenTypeWhereConstraintChecker.test](https://github.com/palimondo/fortress/blob/main/ProjectFortress/compiler_tests/XXXOpenTypeWhereConstraintChecker.test).
- Specification: [inference.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/inference.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex), [overloading.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced/overloading.tex), [trait-parameters.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/trait-parameters.tex), [traits.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/traits.tex), [opr-overview.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/operators/opr-overview.tex), [algebraic-constraints.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced-lib/algebraic-constraints.tex), [the where calculus](https://github.com/palimondo/fortress/blob/main/Specification/appendices/calculi/where/static.tex), [internal-document.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/internal-document.tex), [preamble.tex](https://github.com/palimondo/fortress/blob/main/Specification/fortress/preamble.tex).
