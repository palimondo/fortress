<!-- DRAFT, for the Fable review in place. The record of climb batch 17, the next batch of the plan's phase 3, "the checker at a true zero", for the coordinating session, the curator and the batch's workers. Drafted 2026-10-17 by a planning worker against `main` at `5f339c4d6`, whose `Library/`, `ProjectFortress/`, `Specification/`, `build.xml` and `bin/` are those of `f98ad813f`, climb batch 16's landing (`git diff --stat f98ad813f 5f339c4d6` over them is empty), so batch 16's landed tables and the per-site list describe the base. It launches on the curator's word of 12:38 UTC on 2026-10-17 (BOOT.md): order and launch batch 17, its two core rungs and the candidates the planner clears, with Fable's review and the established processes; a decision that cannot be undone or that reverses one of his decisions holds the batch, and any other takes its recommended default and goes on the review list. Sources: PLAN.md, phase 3, item 15, "Batch 17", and "Pavol's answers", items 56 to 58; the probes `perf-probes/walk-generic-static/REPORT.md` (sections 2, 3, 5 and 8) with commit `fd7056abf` on the local branch `wip/probe-generic-distribute`, `perf-probes/generic-distribute/REPORT.md`, `perf-probes/where-clauses/REPORT.md`, `perf-probes/symbolic-operators/REPORT.md` and `SORT.md`, `perf-probes/integer-power/REPORT.md`; the four probe worktrees' diffs against their bases and their `tmp/` folders, read only; `reviews/batch-16-review.md`, section 1 and Part 4; climb batch 16's gate (`compile-ladder/climb-batch-16/gate/`) and the per-site list; POSITIONS and FACTS by number; the ledger rows; the code at the sites. Nothing was built or run but greps, `git diff`, the extract tool and its `--check` on every briefing key, and the draft generator's Python and node checks (section 5). Section 5 holds the manifest's fields; the generator is not committed (section 5, "The generator"). One line per paragraph. -->

# Climb batch 17

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. It runs a program without static types. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode.
- **The one library** is the interpreter's library (`Library/`, `ProjectFortress/LibraryBuiltin/`). At the **switch-over** the compiled path takes it over.
- **The distance** is the number of errors the checker reports on the one library. Each error has a **site** (a file and a line). **The count** is the checker's errors on the library's `FortressLibrary` component, read by the **count stage**, which also gives the checker's time.
- A **row** is an entry of the gap ledger, cited by number. An **item** is a numbered question in PLAN's list "Pavol's answers".
- A **rung** is one fix, built by one worker in its own copy of the tree and checked by a second worker, the skeptic. A **batch** is a few rungs, merged and tested together by the **gate** and landed at once.
- **Test first.** Every fix starts with a test that shows the defect, seen failing before the edit and passing after. An **expected failure** is a test named `XXX...` that passes while the defect is there; when the fix lands it is **promoted** to a plain name.
- A **static argument** is what fills a static parameter, as `ZZ32` fills `T` in `Box[\ZZ32\]`. A **generic method** is a method with static parameters of its own, such as `get[\T\](b: Box[\T\])`.
- A **probe** measures a change before a batch. A **shadow patch** is a probe's change kept in its own copy of the tree, never committed to `main`.
- **L4** is the generic-distribute probe's fourth library variant: the team's commented generic `distribute` made live with its result over its own static parameter `K`, the old catch-all `distribute(r: Any)` removed, `leftDistribute` and `rightDistribute` given the same `K`, and the two method `where` conditions.
- **The gather** lands the approved rungs on `main` one by one after the run; the **merged tree** is `main` with all of them, which the gate tests. A **new row**'s number is written `NEW-W-1` and the like until the gather adds it to the ledger.
- **B.1, B.2 and B.3** are the three forms of the where-clauses probe's Part B: a type variable opened from a `comprises` clause at a call, a `where` constraint read as a bound, and conditional extension. **A.2.2** and **A.2.3** are its Part A's library edits for rows 636 and 436. A site's **class**, such as I3 (a numeral where a type parameter is expected) or X1 (an export error), is the gate's grouping by cause.
- **P-148**, your rule of 14 October: a rung that changes the checker times the count stage before and after its change, then makes a second pass that makes the checker faster without changing what it accepts, refuses or says. Since 17 October the skill reads the timing as a smoke test, one run of each tree (fortress-repo's `compiler.md`, "The checker's time").

### Where the distance stands

- After climb batch 16 the distance is 49 and the count 39, the count stage 82 s and the distance stage 217 s ([gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-16/gate/distance.txt); F-53, F-240).
- What the batch moves, by the probes' measurements and by reading: rung L, 9 sites (row 433's 6, measured; row 436's 2, measured; row 631's 1, by reading); rung A, 4 (row 636's, by reading of two measured parts); rung C, 1 (`FortressLibrary.fss:130`, row 737, for good). Rungs W and G change walk only and move nothing.
- **The distance expected after the batch: 35, by reading.** The count is not declared; by reading it falls by up to 10, the `FortressLibrary` sites of rows 433, 436, 631 and 737. Both are reported, never red (P-39).

### The core of the batch: two rungs that land together

- **W, walk infers a generic dotted method's own static arguments (row 21).** Today walk cannot call `O.get(Box[\ZZ32\](z))` for `get[\T\](b: Box[\T\])` without writing `[\ZZ32\]`. The probe's fix, two Java files and +46 -9 lines, makes it infer them: part A for a plain receiver, part B for a receiver whose method name is overloaded ([walk-generic-static report](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/walk-generic-static/REPORT.md), sections 2 and 8).
- **L, the team's generic `distribute` live, and the fusion pairs' method conditions (rows 433 and 677), with the identities' cast (row 436) and `embiggen` typed (row 631).** L4 takes the distance from 49 to 42 alone, exactly row 433's 6 sites and `:130` ([generic-distribute report](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/generic-distribute/REPORT.md), section 4). It needs W under walk: without W, `LibraryOverloadFamilies` fails at its line 37 and a sum of sums over a generator of generators stops (F-248; the walk report, section 8). With W, the probe ran all 629 walk tests green and microGPT's quick pair 7 of 7 (section 5). So L lands only with W.
- **They change no declaration in common.** From the two diffs: W's commit `fd7056abf` changes `DottedMethodApplication.java`, `OverloadedFunction.java` and one test's name; L4 with its checker shadow changes `Library/FortressLibrary.fss`, `KindEnv.scala` and `STypesUtil.scala`. The two lists share no file (section 3, "The rule the rungs keep"). Neither branch holds the other's code: L needs W's fix only to pass under walk, which the gate tests on the merged tree.

### The candidates that go in beside them, one line each

- **A, `AnyList`'s comprises clause live, the rest of `AnyList` moved into `List` (row 636), 4 sites.** Built as a shadow in `/home/user/fortress-probe-where`: about 4 files and +65 -12 lines of checker and walk, 2 library files and about +5 -10, 4 tests. Shares no declaration with any rung.
- **C, four checker rows (737, 738, 739, 681), 1 site.** Not probed, each traced to its line: 3 files, tens of lines by reading. Shares no declaration with any rung.
- **G, walk's load check reads every pair of generic declarations by the checker's rules (row 159, your answer in P-45), with rows 742 and 549.** Not probed: 1 file by reading. Shares the file `OverloadedFunction.java` with W, not a declaration.
- **The identities' cast (row 436, 2 sites) and `embiggen` (row 631, 1 site)** go in rung L: the cast is a shadow of 2 lines in `/home/user/fortress-probe-where`; `embiggen` is probed only, about 7 files by reading.
- If the run must be shorter, G goes first, then A. W and L go together or not at all.

### The candidates that overlap or wait

- **Overlap:** conditional extension (row 634's list half) shares `TypeAnalyzer.pSubInner`'s trait-type case with rung A and builds on rung L's `KindEnv.constraintBounds`; row 697 shares `OverloadedFunction.OverloadComparisonResult` with rung G and waits for L's library.
- **Wait:** the three `String` sites on row 743; the integer power on item 58; rows 714, 691 and 695 on a trace; row 725 on row 723; row 444 on a probe on L's landed library; rows 665, 723 and 728 on a logging build; rows 717 and 719 on row 716's entry; rows 721 and 722 on row 364's site; row 700 on a run; the walker in the visitor's shape on a profile. Section 4 gives each.

### What the batch leaves out, and why (section 4, "Not in this batch")

- **Exclusion between generic declarations read over the whole parameter type (P-152, rows 740 and 741):** your decision needs a probe first, for the algorithm on both paths. Rung G changes the same walk check, so that probe starts from G's landed code.
- **Two new walk defects** that the walk probe found on the base: a `bool` static parameter of a method, and a generic trait method bounded by the trait's parameter. Each gets its ledger row and an expected-failure test, written by rung W, and no fix.
- **The symbolic-operator sort** ([SORT.md](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/symbolic-operators/SORT.md)): its 205 errors exist only when the checker reads symbolic operators, your open item 38, so its library fixes are latent and stay out; its design choices are your item 59.

### Before the batch runs

- No question blocks it: items 56 and 57 take your word of 12:38 UTC and the default on record (section 2).
- The coordinator writes `plan-17/manifest/` from section 5 (a draft is in the session's scratchpad), builds the base build, checks the briefings and the splice, and keeps the probe worktrees `/home/user/fortress-probe-distribute` and `/home/user/fortress-probe-where` until the batch lands, since rungs L, W and A read their diffs.

### Cost

- About 5.4M tokens written, from 5.0M if no fix is contested to 6.5M with a judge and a repair round; a red gate adds about 0.5M. Batch 16 wrote 6.01M for four rungs (`reviews/batch-16-review.md`, section 3).
  - Workers about 2.4M: L 0.55M (a checker shadow, three library items, the count and distance stages), A 0.55M (a shadow to re-base onto rung S's memos), C 0.5M (four rows, three files), W 0.4M (a patch that exists, five tests, three rows), G 0.4M (one file, four promotions).
  - Skeptics about 1.8M; the fixed roles about 1.2M.
- About 8 to 9 hours at two agents at once (batch 16: 7 h 17 min for four rungs).

## 2. Your answers this batch takes, and the coordinator's calls it builds

### Items 56 and 57, by your word and the default on record

- **Item 56** (PLAN, "Pavol's answers"): the generic `distribute` written with its result over its own `K`, `PossibleReductionPair[\K\]` with the body `NoReductionPair[\K\]`. Default on record: yes, by Emoto's comment that the lifting type "should be replaced with the type L of ReductionPair[\R, L\] returned by r.distribute(q)" ([Generator2.fss:170-173](https://github.com/palimondo/fortress/blob/main/Library/Generator2.fss)). Taken. Its further choice has no default on record: `leftDistribute` and `rightDistribute` given the same `K` (distance 42) or left (44, two new errors). The batch takes the same `K`: nothing in the library or the tests calls the two methods (the generic-distribute report, section 5), and their api declarations already differ from the component's. Listed for your review.
- **Item 57:** what walk does about the call `r.distribute(q)` once the `Any` method goes. Your word of 12:38 UTC: walk's fix, parts A and B, lands with the library rung, and the library change waits for it. That is way (a), fix row 21 in walk first.

### The coordinator's calls this batch builds, listed for your review

Each is settled by the record's principles and is reversible; none reverses a decision of yours.

1. **L builds the method condition only where the probe measured it.** A method's `where` condition on its own static parameter is checked at calls; one on its trait's parameter, as `SumReduction`'s two conditions are, is read as a bound inside the method but not checked at a dotted call (F-244). The calls listed for you on the peers' way say it is to be checked at calls; no probe built that, so it gets a new row and waits.
2. **`embiggen` typed in L** (row 631), the call already listed for the next library rung (review-queue item 124): it changes the declared type of one team test, `tests/WordCountSmall.fss:74-76`. Your word that no team demo is edited until you say (PLAN, "Off the path, parked") is read as covering the demos in `ProjectFortress/demos/`, not this test; if the review reads it otherwise, L holds this item and lands the rest.
3. **The identities' cast in L** (row 436), P-151's list: it clears the two sites, not the row's defect, an empty sum over a non-number group.
4. **A builds P-151's combination as one change**: the comprises clause opened at calls, and `AnyList`'s `addLeft`, `addRight` and the comprehension's unwrap moved into `List`. Each part was measured; the two together were not.
5. **C takes the review's checker rows in its order, as far as each is traced**: 737, 738, 739 and 681. Row 739's default on your list is "built in climb batch 17's checker rung".
6. **G reads rows 742 and 549 with row 159**: once walk reads a generic pair on its declared domains, the same reading refuses the two pairs whose declared domains are equal, as the No Duplicates Rule does.
7. **W gives row 21's other cases rows of their own** when row 21 closes: the expected type to row 510, the generic method beside a plain one at load to a new row.
8. **Each rung edits its own specification sentences**, in entries no other rung edits, and the gather only merges: the batch 16 review's proposal, after the gather's rewording failed twice there (PLAN, "Work that can start now").

### Points the batch lists for you, not questions

- **Team lines changed:** `ActualReduction`'s three methods and `SumReduction`'s two overloads, the identities' fallbacks, `MIMapReduceReduction` and `embiggen` and four callers, the team test `WordCountSmall`'s declared type (L); walk's dotted method call and overload choice (W); `AnyList`'s commented clause made live and its two bodies (A); the checker's choice of an api declaration, its top-level set's filter and one message word (C); walk's pair check at load (G).
- **What walk does differently:** it infers a generic dotted method's static arguments (W); it loads generic pairs it refused, row 159's, and refuses two pairs with equal declared domains that it loaded (G); it loads `comprises { List[\E\] } where [\E\]` (A).
- **Messages that change:** an object named "object", not "trait", in the per-provider overloading message (C, row 738); the error at `FortressLibrary.fss:130` gone (C).
- **Where a rung holds a line** (L if `embiggen` moves a walk value; C if row 739's set refuses a library declaration; G if the library is refused at load), it lands the rest and reports.

## 3. The rungs

Line numbers are on `5f339c4d6`, whose `Library/`, `ProjectFortress/` and `Specification/` are those of `f98ad813f`. Each rung's tests come first: written, run through the harness on the base and seen failing, and committed before the edit. A value that matters is asserted inside the test (P-103). A checker rung follows P-148, in its words: "A rung that changes the checker measures how the change affects the time that the checker needs. First the rung makes the change correct. Then it does a second pass that makes the checker faster. This pass must not change the checker's results: the checker accepts and refuses the same programs as before, with the same errors at the same places. The rung's skeptic checks the time and the results." The skill's `compiler.md`, "The checker's time", gives the steps: the count stage once on the base build and once on the correct change, a profile and a second pass, the count stage once after it, the tables equal by `diff` and the whole outputs equal once the tree's path is masked, the one error of row 737 excepted; the timing is a smoke test; your skeptic times the count stage on the base build and on your commit. A rung whose every path is walk's evaluator, a test folder or the specification runs neither stage, as the batch manual's rule on stages that cannot move and F-111 give it.

### W. Walk infers a generic dotted method's own static arguments (row 21, parts A and B)

**The answers this rung follows.** P-45: walk dispatches on declared domains and infers a generic declaration's static arguments from the arguments' run-time types, as Specification/basic/inference.tex, "The Static Arguments of a Call", and walk's revision box there say. The curator's word of 12:38 UTC on 2026-10-17: walk's fix, parts A and B of the walk-generic-static probe, lands with rung L, and the library change waits for it; that is item 57's way (a), row 21 repaired in walk first (PLAN, the curator's answers, item 57). The probe sized the fix at two Java files, +46 -9 (explorations/perf-probes/walk-generic-static/REPORT.md sections 2, 3 and 5), and found that part A alone leaves every receiver whose generic method sits in an overloaded method set failing (section 8): both parts are yours.

**What you build.**
- Start from the probe's commit, `git -C /home/user/fortress show fd7056abf` (local branch wip/probe-generic-distribute, not pushed; its parent 07c83a40a holds the base's ProjectFortress/src). Write your tests and see them fail on the base first; then take the commit's code, or improve it, and say which.
- Part A, in DottedMethodApplication.java: applyInnerPossiblyGeneric applies, for the symbolic instance of a generic method that an object holds, the instance that the arguments' types infer, through EvaluatorBase.inferAndInstantiateGenericFunction in the generic method's evaluation environment, not the trait method's member environment, which is empty (section 2). Two helpers beside it, instanceFor and isSymbolicInstance.
- Part B, in OverloadedFunction.java: bestMatchWithCoercion and bestMatchInternal treat such a symbolic instance as its generic method when they choose and instantiate an overload, through two helpers after bestMatchInternal, genericOf and inferenceEnv, which return what they returned before for a real generic function.
- Part B infers again on every call of an overloaded method, since OverloadedMethod keeps no cache (section 7). Walk's speed decides nothing (P-29): report your system suite's time beside the base's as a smoke test; a slowdown of several times is a point to report.
- Not yours, each left as it is: explicit static arguments on an overloaded receiver (row 744, typeApply in the same file); an expected type that alone fixes the argument; a generic method beside a plain one in an object's own declarations; bool static parameters (section 4, "Not covered").

**Rows.**
- Row 21: its claim's case and the cases section 4 lists as covered pass with your fix; the gather closes the row with MethodStaticArgInference. First give each case its notes hold that your fix leaves a home of its own: the expected type that fixes a method's argument is the method form of row 510 (a note there; XXXExpectedTypeFixRungT re-cited to row 510); a generic dotted method beside a plain one in an object's own declarations, 'Missing type T' at load, GenericMethod.finishInitializing typing the parameters in the declaring environment, is a new row NEW-W-1, which XXXDispatchGenericMethodBesidePlain then cites; bool is row 307 and NEW-W-2.
- NEW-W-2, the probe's first new defect (section 6): an object method with its own bool static parameter stops with 'InterpreterBug: subtypeCompareTo(BoolArg, BoolArg) is not implemented', written or inferred; nodes_util/NodeComparator.java has no BoolArg comparison. An XXX walk test from the probe's program (/home/user/fortress-probe-distribute/tmp/q21/progs4/MBool.fss), seen as an expected failure on the base, and the row. No fix. Run the program compiled once too, since the probe did not, and say in the row which paths show it.
- NEW-W-3, the second: a generic trait's method whose own static parameter is bounded by the trait's parameter, pick[\K extends R\](x: K) in trait Tr[\R\], stops at the extending object with 'Missing type R' (the probe's tmp/q21/progs4/MTraitBound.fss); the dotted sibling of row 567, fixed for functional methods. An XXX walk test, seen as an expected failure on the base, and the row. No fix. Run it compiled once too.
- Notes, not repairs: row 744 (your fix leaves it: typeApply refuses any OverloadedMethod); row 364 (a lone T taken from a ZZ32 argument becomes Int under your fix, as on the function path); row 723 (the functional-method sibling of NEW-W-1). Each new row goes in record.md in the row template, numbered NEW-W-<n>.

**Distance sites.** None: every path you change is under walk's evaluator, the test folder and the specification's text, which neither stage reads; run neither.

**Files.**
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java (applyInnerPossiblyGeneric, :165-167, and two helpers beside it).
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java (bestMatchWithCoercion, :1905-1952; bestMatchInternal, :1964-2016; two helpers after it). Not OverloadComparisonResult, overloadOk or validOnDeclaredDomains, which rung G changes, nor the object-type shortcut, row 697's.
- ProjectFortress/tests/: XXXMethodStaticArgRungT.fss renamed MethodStaticArgInference.fss with its component line (it has no .test file); your new tests; the citations of XXXDispatchGenericMethodBesidePlain.fss and XXXExpectedTypeFixRungT.fss.
- Specification/basic/inference.tex: walk's sentences on row 21 (below).
- Not: the library, Library/Generator2.fss among it (rung L's or no rung's); EvaluatorBase.java; the checker.

**Tests, first.**
- MethodStaticArgInference: XXXMethodStaticArgRungT shows 'Saw expected exception' on the base and 'Missing expected failure' with your fix; then promoted, renamed by its topic. Part A's test.
- A new walk test of the overloaded receiver, red on the base: a trait's generic distribute[\K\](r: Red[\R,K\]): Pair[\K\], inherited alone by one object and beside a plain overload distribute(r: Mx[\T\]) in another, each called with no static argument, asserting which pair each call returns, as the probe's MTraitLone.fss and MTraitOver.fss print it (/home/user/fortress-probe-distribute/tmp/q21/progs/). On the base: 'Unification error' and 'Failed to find any matching overload'. With part A alone the call beside the plain overload stays red: part B's test.
- The cases section 4 lists as covered, asserted in that test or one beside it: a size (idx), mixed widths (sameR gives [3:ZZ64,4:ZZ64]), a vector, a plain argument (O.id(z)), a generic receiver. Red on the base.
- A nested-reduction test, green on the base and after: __bigOperator2 over inits of <|1, 3, 2|>, as GeneratorDeclarations's fusedMax calls it, with dispatching off and on, asserting a SUM of SUMs 11, a MAX of MAXes 3, and the fused pairs MAX over SUM 6, MIN over SUM 1 and SUM over PROD 10 (the probe's FuseSumSum.fss and its siblings in /home/user/fortress-probe-distribute/tmp/probe/fusion/; generic-distribute REPORT section 5). Rung L's library stops the first two without your fix (F-248), so this test in your branch guards the two rungs at the gate.
- The XXX tests of NEW-W-2 and NEW-W-3.
- Keep their verdicts: LibraryOverloadFamilies, GeneratorDeclarations, Generator2Test, ExclusionRemainderRungH, XXXExpectedTypeFixRungT, XXXDispatchGenericMethodBesidePlain, and the walk tests that write static arguments on dotted calls (the probe's 66, section 5).
- After the edit: ant testSystem once, and ant testSpecData once (P-124).

**Specification.** No normative sentence changes: the chapter already infers a method's static arguments. Sentences of walk's revision boxes in Specification/basic/inference.tex become false, and you edit them in the revision form, since no other rung edits that file: "It compares declarations with static parameters on the parameter types they declare, except generic dotted methods (row~21 of the revival's gap ledger)" (:283-285); "and it leaves a generic method's static parameters uninstantiated (row~21)" (:401-402), true after your fix only where the expected type alone fixes them (row 510); and the bool sentence's "rows~21 and~307" (:406-409), which then names row 307 and NEW-W-2. List every other sentence made false, F-248's among them, as revival-change material.

**Overlaps by file.**
- OverloadedFunction.java: rung G changes OverloadComparisonResult and validOnDeclaredDomains, far above your two methods; no declaration in common.
- No other rung edits DottedMethodApplication.java, inference.tex or your tests.
- Rung L's library needs your fix under walk. Your branch does not hold L's change, and L's does not hold yours: the gate on the merged tree is the first run of both.

### L. The team's generic distribute live, the fusion pairs' method conditions, the identities' cast and embiggen typed (rows 433, 677, 436 and 631)

**The answers this rung follows.** P-151: only the where forms the team wrote down are built; a method's where condition bounds its static parameters; SUM's fusion with MAX and MIN stays, the team's commented generic distribute measured for its two type errors; the identities' fallback by the library's cast (PLAN, phase 3, the line on where clauses). Item 56's default, yes: the generic's result over its own K, PossibleReductionPair[\K\] with the body NoReductionPair[\K\], reading Emoto's comment (Library/Generator2.fss:170-173) over the team's literal [\R\]; and leftDistribute and rightDistribute given the same K, the probe's L4 (explorations/perf-probes/generic-distribute/REPORT.md sections 2, 4 and 9): 42 with them, 44 and two new errors without. The curator's word of 12:38 UTC on 2026-10-17: the library change lands with rung W's walk fix and waits for it (item 57's way (a)), so this rung lands only with W. Row 631 is the coordinator's call for the next library rung, by P-27, the library's own typed shape (explorations/reviews/open-asks-2026-10-16.md section 4; review-queue item 124). The checker part is the method-condition part of the where shadow, B.2 of explorations/perf-probes/where-clauses/REPORT.md: KindEnv.constraintBounds with its two callers and the fold in STypesUtil, the generic-distribute probe's own copy (its section 2). P-148 holds for it; this section's opening gives the count stage's runs.

**What you build.**
- The library, in Library/FortressLibrary.fss, L4 as section 2 of the generic-distribute report quotes it. In ActualReduction (:3219-3238): leftDistribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\] and rightDistribute the same, both still = distribute(r); the live distribute(r: Any) removed, and the team's commented generic made live over K, distribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\] = NoReductionPair[\K\]. The hack's comment line stays where it is, since a comment edit moves spans. In SumReduction (:3417-3425) the two overloads take where { T extends StandardMax[\T\] } and where { T extends StandardMin[\T\] }. The api's ActualReduction (FortressLibrary.fsi:1877-1891) stays: it differed from the component before, in the export class X1, and L4 was measured so.
- The identities (:3366-3398): additiveIdentity's else => 0 and multiplicativeIdentity's else => 1 become cast[\T\](0) and cast[\T\](1) (where-clauses REPORT A.2.3). It clears their two I3 sites, :3367 and :3384, and not row 436's defect.
- embiggen (:3700-3715): MIMapReduceReduction[\R\] extends MonoidReduction[\R\] with j: (R,R)->R, and embiggen[\T\] answering Comprehension[\T,T,T,T\], in the shape of MapReduceReduction just above it (:3691-3695); its api line (FortressLibrary.fsi:2152) with it; then the callers' declared types: Library/Map.fss:197-204, Library/IntMap.fss:738-745, Library/PrefixMap.fss:419-426, Library/Pairs.fss:75-113, and the team test ProjectFortress/tests/WordCountSmall.fss:74-76 (row 631; climb batch 10 rung G's REPORT section 8). No probe built it: weigh the ways and say which you take. If a walk value moves, hold this item, land the rest and report.
- The checker, B.2: in KindEnv.scala the two extend methods with a where clause (:44-58) add the bounds of KindEnv.constraintBounds, a new member of object KindEnv placed right after makeFresh; in STypesUtil.scala makeArrowFromFunctional (:157-198) folds a constraint on the declaration's own static parameter into that parameter's bound. Neither file changed since the probe's base. Drop the probe's comments; keep its meaning.
- Not built here: a method's condition on its trait's parameter checked at a dotted call (F-244, the hole). No probe built it; file it as NEW-L-1.

**Under walk, alone and with W.** Your branch alone fails one gated line, ProjectFortress/tests/LibraryOverloadFamilies.fss:37, SumReduction[\ZZ32\].distribute(ProdReduction[\ZZ32\]), 'Failed to find any matching overload' (walk-generic-static REPORT sections 5 and 8), and every nested reduction over a generator of generators whose inner reduction has no fused pair (F-248). That is rung W's fix, which your branch does not hold. With W's parts A and B and L4 the probe ran the whole system suite green, 629 in four shards, and microGPT's quick pair 7 of 7 each (section 5). So report that line as expected, with its message, and change nothing to make it pass on your branch; your skeptic checks that it is the only red line and that its message is that one. Any other red line is yours.

**Rows.**
- Row 433, 6 sites: the two return-type errors at :3233 against :3421 and :3423, and the four wellformed errors at :3421 to :3424. L4 clears exactly these against the shadow's own control (generic-distribute REPORT section 4). The gather closes the row.
- Row 677, no site: the checker reads a where constraint as a bound. Its reproducer, XXXWhereBoundChecker, then compiles past the checker and stops in the code generator, 'Don't know how to compile this kind of FnDecl' (where-clauses REPORT B.2): rekey it to the code generator's wall, cited to row 701, and the gather closes row 677.
- Row 436, 2 sites, :3367 and :3384: they clear; the row stays open, its defect not repaired (F-243). A note.
- Row 631, 1 site, :3715: the gather closes it if the site goes.
- NEW-L-1: a method's where condition on its trait's parameter is not checked at a dotted call: Holder[\String\]("s").showIt() with showIt(): String where { T extends Shows } is accepted (the probe's XXXWhereBoundCallChecker, /home/user/fortress-probe-where/ProjectFortress/compiler_tests/). A refusal not made has no green expected failure: the row only, its reproducer none, the program and the output in its notes, as row 739's are.
- Notes, not repairs: row 701 (row 677's reproducer now reaches it); row 737 (:130 may move with your shadow, as it did in the probe); row 744; row 21.

**Distance sites.** By the probe: 49 to 42 with L4, :130 moving with the shadow (row 737); with the identities' cast 40 and with embiggen 39, by reading. Run the distance stage once on your final tree; its before is climb batch 16's landed list. The count is not declared: give its table. P-148's runs as this section's opening gives them, with a second pass that stays in your two checker declarations.

**Files.**
- Library/FortressLibrary.fss (ActualReduction's three methods, :3219-3238; SumReduction's two distribute overloads, :3421-3424; additiveIdentity and multiplicativeIdentity, :3366-3398; MIMapReduceReduction and embiggen, :3700-3715).
- Library/FortressLibrary.fsi (embiggen, :2152, only).
- Library/Map.fss, Library/IntMap.fss, Library/PrefixMap.fss, Library/Pairs.fss (the declared types of embiggen's callers only), and ProjectFortress/tests/WordCountSmall.fss:74-76.
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala (class KindEnv's extend(node, where) and extend(nodes, where), :44-58; a new member constraintBounds of object KindEnv right after makeFresh).
- ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala (makeArrowFromFunctional, the four-argument form, :157-198).
- New and rekeyed files in ProjectFortress/compiler_tests/.
- Not: Library/Generator2.fss; the api's ActualReduction; object EmptyKindEnv and the end of object KindEnv, where rung A adds its members; TypeAnalyzer.scala (rung A's); walk.

**Tests, first.**
- WhereBoundMethodChecker, a typecheck test: a method's where condition on its trait's parameter bounds it inside the method, x.show() found (the probe's file in /home/user/fortress-probe-where/ProjectFortress/compiler_tests/). On the base: 'No such method T.show.'
- An XXX compile test that a call breaking a function's own where constraint is refused, g("s") for g[\U\](u: U): String where { U extends Shows }, keyed on 'is not applicable to an argument of type String'. On the base the body itself is refused, 'No such method U.show.': 'Saw wrong failure'.
- XXXWhereBoundChecker rekeyed to the code generator's 'Don't know how to compile this kind of FnDecl': on the base 'Saw wrong failure', after it green.
- The library part's test is the distance stage, before and after, site by site.
- Keep their verdicts: GeneratorDeclarations, Generator2Test, ExclusionRemainderRungH, WordCountSmall, XXXEmptyGroupSumRungF, the compiler, library and other-compiler tracks; LibraryOverloadFamilies red at its line 37 alone, as above.
- After the change and again after the pass: ant testQuick; ant testSystem once and ant testSpecData once, since the library changes what walk loads (P-124); your change's ladder subset as the skill's gate.md, "The ladder regression", gives it.

**Specification.** No normative sentence changes: the where clauses' chapter already reads a constraint as a bound. The team's note in Specification/basic/functions.tex:15-19, "where clauses ... are not supported yet", stays true, since the code generator refuses a function with a where clause (row 701): name it in your report. List every sentence your change makes false, F-242, F-244 and F-248 among them, as revival-change material.

**Overlaps by file.**
- KindEnv.scala: rung A adds members to object EmptyKindEnv and at the end of object KindEnv; you change class KindEnv's two extend methods and add constraintBounds after makeFresh. No declaration in common.
- No other rung edits the library but rung A, in List.fss and List.fsi.
- Your walk behaviour needs rung W's fix; see "Under walk, alone and with W".

### A. AnyList's comprises clause live, and the rest of AnyList moved into List (row 636)

**The answers this rung follows.** P-151: the team's comment AnyList comprises List[\E\] where [\E\] becomes live, and the rest of AnyList moves into List. The team wrote the clause as "Not yet: comprises List[\E\] where [\E\]" (Library/List.fsi:56, List.fss:87). The where-clause probe built the clause as a checker shadow, a type variable opened from a comprises clause at a call, with its refusal tests (explorations/perf-probes/where-clauses/REPORT.md B.1), and moved AnyList's bodies where the element type is known (A.2.2); P-151's combination is the coordinator's call 4, listed for review. P-148 holds; this section's opening gives the count stage's runs.

**What you build.**
- The checker and walk, from the shadow in /home/user/fortress-probe-where (git -C /home/user/fortress-probe-where diff; its base is 528438ac5, before climb batch 16). Take only B.1's lines, which B.1 lists: TypeDisambiguator.forTraitDecl puts a trait's where-bound type variables in scope in its comprises clause, self type, parameters and members, not its extends clause; TypeAnalyzer's whereSizes takes type bindings, openWhereSizes makes a fresh name E#k bounded by its binding's bounds at the trait's arguments, and the trait-type case of pSubInner does not open a comprising trait reached as a parent; KindEnv keeps the opened names (EmptyKindEnv.lookup and a registry); walk's BuildEnvironments.processWhereClauses binds a type where-variable as a symbolic type. Leave out B.2 (rung L's) and B.3 (conditional extension, not in this batch).
- Re-base it: rung S of climb batch 16 changed TypeAnalyzer.scala after the shadow's base (memos, traits.readContext, memoParents; F-235). A memo must not reuse an answer across two openings: an opened name is fresh at each opening; check that every memo key that can hold one still holds every input its answer reads.
- The library: List.fsi:56 and List.fss:87 take the clause comprises { List[\E\] } where [\E\]; AnyList's addLeft and addRight become singleton(e) || self and self || singleton(e), the private addL and addR removed (A.2.2); the list comprehension's unwrap (List.fss:178-179) takes cast[\CovariantCollection[\T\]\](cc). The || of AnyList stays app(self, f), now accepted through the opened type. Part A's appendAny and appendedTo are not needed with the clause live: take them only if your distance run shows || still refused, and say so.
- In KindEnv.scala put your members at the end of object KindEnv, after extractNodeBindings, since rung L adds a member right after makeFresh.

**Rows.**
- Row 636, 4 sites: List.fss:88 (app), :89 (addL), :90 (addR), :179 (toImmutableArray). B.1 alone cleared app with the team's spelling; Part A's bodies cleared all four without it; the two together were not measured. The gather closes the row if all four go; otherwise note which stay and why.
- Notes, not repairs: row 682 (the opening of a size at a call, which yours widens to types); row 701 (the code generator does not compile a trait with a where clause, after the switch-over); row 307.

**Distance sites.** 4 by reading, 49 to 45 on your tree. Run the distance stage once on your final tree; its before is climb batch 16's landed list; any site that comes is a point to report. The count is not declared: List is not the component the count reads. P-148's runs as this section's opening gives them, with a second pass that stays in your declarations.

**Files.**
- ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java (forTraitDecl, :86-111).
- ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala (the two trait-type cases of pSubInner, from :290 and from :299; whereSizes and openWhereSizes, :853-887, and their two calls, :846 and :908).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala (object EmptyKindEnv; new members at the end of object KindEnv).
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java (processWhereClauses, :943-1004).
- Library/List.fsi and Library/List.fss (AnyList, the private addL and addR, the list comprehension's unwrap).
- Specification/appendices/changes.tex (the entry "The traits that extend a closed trait", :1480-1486, only).
- New files in ProjectFortress/compiler_tests/ and ProjectFortress/tests/.
- Not: class KindEnv's extend methods and constraintBounds (rung L's); Decls.scala and TypeWellFormedChecker.scala (B.3's); STypesUtil.scala; the rest of the library.

**Tests, first.**
- OpenTypeChecker, a typecheck test: a value whose trait lists Box[\E\] where [\E\] opens at a call to a Box at a type of its own. On the base the checker refuses the name E as not defined, the probe's message (B.1).
- XXXOpenTypeEscapeChecker, XXXOpenTypeTwoChecker and XXXOpenTypeBoundEvidenceChecker, each keyed on the refusal the probe recorded (B.1): an opened type does not escape, two values are not taken as one, the Amin and Tate shape is refused. On the base each says 'Saw wrong failure', since the base refuses the name E itself. The probe's files are in /home/user/fortress-probe-where/ProjectFortress/compiler_tests/.
- A walk test that a program with trait AnyBox comprises { Box[\E\] } where [\E\] loads and runs; on the base walk stops at load, 'Missing type E'.
- Keep their verdicts: the list, where-clause and generator tests of walk (the probe's 19), NatOpen and the other where-size compiler tests, the compiler, library and other-compiler tracks.
- After the change and again after the pass: ant testQuick; ant testSystem once and ant testSpecData once, since walk loads the new clause (P-124).

**Specification.** No normative sentence changes. The Appendix I sentence "It does not yet open a type where-clause variable, as in List's commented clause (row~636)" (Specification/appendices/changes.tex:1480-1481) and the next one, on how the interpreter binds such a variable (:1484-1486), become false: edit them in the revision form, since no other rung edits that entry. List every other sentence made false, F-243 and F-244 among them, as revival-change material.

**Overlaps by file.**
- KindEnv.scala with rung L, different members, as above.
- changes.tex: rungs C and G edit other entries, "When two sizes are the same" and "Overloading with static parameters".
- No other rung edits TypeAnalyzer.scala, TypeDisambiguator.java, BuildEnvironments.java or List.

### C. Four checker rows: an api declaration chosen by its parameter types, the per-provider message, the top-level set's abstract functional methods, and a static argument written with a static parameter (rows 737, 738, 739 and 681)

**The answers this rung follows.** The batch 16 review's order for the checker's rows (explorations/reviews/batch-16-review.md, Part 4; PLAN, phase 3, item 15): 681 first, then 737, 739, 738; the rest are not traced (section 4 of this record). Row 737: "Type Inference for Components" (Specification/basic/components/type-inference.tex) gives a component's function that leaves out its return type the return type of the api declaration with its own parameter types; the review: repairing it takes :130 out for good, the count to 38 and the distance to 48 on the base. Row 739: P-149's reasons reach it, the Meet Rule for functions (Specification/advanced/overloading.tex, "Meet Rule") and the type group's rules (P-26) agree, and its default on the curator's list is "built in climb batch 17's checker rung". Row 738: the per-provider message names a trait or an object by its kind. Row 681: the identity of types (Specification/basic/types-vals-vars.tex, "Types") makes IBox[\$i\] and IBox[\i-1\] one type once $i is i-1, so the call infers it; it waited for rung S, which landed. P-148 holds; this section's opening gives the count stage's runs.

**What you build.**
- Row 737: ApiTypeExtractor.isExported for a FnDecl (:68-132) picks the first declaration of the name, functions.matchFirst(name) at :117, comparing no parameter types; choose the api declaration whose parameter types are the component function's. Row 488's :130, BIG LEXICO(g), then takes TotalComparison (Library/FortressLibrary.fsi:98).
- Row 738: the kind word at OverloadingChecker.scala:338 tests compilation_unit where it means the trait or object; test traitOrObject.
- Row 739: toFunctionArrows keeps only declarations with a body when onlyConcrete (:118-121), so the top-level set reads no abstract functional method of the component's own trait; read them as rung K of climb batch 16 did for the per-provider set (toFunctionalMethodArrows, :134-153), keeping the implemented filter. The guard: if the change refuses a declaration of the one library or the compiler's own library, report it, and if it refuses one of the compiler's own library, hold this row's line and land the rest.
- Row 681: Formula.isNatTerm (:157) lets a size inference variable bind a static parameter or a numeral only; widen it to a size term over static parameters and numerals, so that $i = i-1 has a solution. Formula.reduce (:436) and the solver (:772) read it: say what each then does, and check that no memo of rung S's keeps an answer that read the old rule.

**Rows.**
- Row 737, 1 site, :130: the gather closes it. Row 488 is its duplicate.
- Row 738, no site: the message changes for every object; the gather closes it.
- Row 739, no site by reading; any site that comes is a point to report; the gather closes it.
- Row 681, no site (no library line needs it); the gather closes it.
- Notes, not repairs: row 683 (two different static parameters counted as different sizes, beside row 681); row 727 (row 739's sibling, repaired); row 714 and row 691 (not traced, section 4).

**Distance sites.** 1, :130, for good: 49 to 48 on your tree. Run the distance stage once on your final tree; its before is climb batch 16's landed list. The count: 39 to 38 by the review's reading; not declared, give its table. P-148's runs as this section's opening gives them; the base and change tables differ by :130 alone, which is your change, not row 737's flicker: say so. A second pass that stays in your four declarations.

**Files.**
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ApiTypeExtractor.scala (isExported for a FnDecl, :68-132).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala (toFunctionArrows, :118-133; the kind word in checkOverloading, :338).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala (isNatTerm, :157-167).
- Specification/appendices/changes.tex (the entry "When two sizes are the same", :3611-3616, only).
- New, promoted and rekeyed files in ProjectFortress/compiler_tests/.
- Not: toFunctionalMethodArrows (rung K's of climb batch 16, left as it is); TypeAnalyzer.scala, KindEnv.scala, STypesUtil.scala (rungs A and L); TypeWellFormedChecker.scala; walk; the library.

**Tests, first.**
- Row 737: XXXOmittedReturnTypeFromApi, keyed on 'but declared return type is': on the base green; with your fix 'Saw wrong failure' as the program compiles; then promoted to a compile and run test.
- Row 681: XXXNatArithInferChecker, keyed on 'is not applicable to an argument of type IBox[\\i-1\\]': the same, then promoted; walk's pred[\0\]() is -1, which the compiled run asserts.
- Row 739: a new XXX compile test from rung K's skeptic's probe (explorations/compile-ladder/rung-checker-abstract-callsite/SKEPTIC.md section 6): h(self): ZZ32 abstract in trait S beside a top-level h(x: String): ZZ32, keyed on 'Invalid overloading of h'; on the base it compiles and runs, 'Saw wrong failure'. The concrete twin, refused before and after, beside it.
- Row 738: XXXDottedMethodMeetAbstractSibling and every .test file whose key says 'in trait' for an object (grep -l 'in trait' ProjectFortress/compiler_tests/*.test lists seven files; those whose type is an object change), rekeyed to 'in object'; each 'Saw wrong failure' with your change before its rekey.
- Keep their verdicts: XXXNoDuplicatesRule* and FunctionalMethodMeet* (row 727's family), the compiler, library and other-compiler tracks.
- After the change and again after the pass: ant testQuick.

**Specification.** No normative sentence changes. The Appendix I sentence "and it does not infer a static argument written with a static parameter in it: ... (row~681)" (Specification/appendices/changes.tex:3611-3616) becomes false: edit it in the revision form. If your row 739 change makes a sentence of the entry "Overloading with static parameters" false, give its corrected text word for word in REPORT.md and do not edit that entry, which rung G edits; the gather applies it after G's hunk. List every other sentence made false, F-53's "An edit can move one error" and the skill's exception for row 737 in compiler.md among them, as revival-change material.

**Overlaps by file.**
- No other rung edits ApiTypeExtractor.scala, OverloadingChecker.scala or Formula.scala.
- changes.tex: rungs A and G edit other entries.

### G. Walk's load check reads every pair of generic declarations by the checker's rules (rows 159, 742 and 549)

**The answers this rung follows.** P-45, by the curator's answer of 19:47 UTC on 2026-10-16: walk's load check reads every pair of generic declarations on their declared domains by the checker's rules, with no parameter pair required to exclude, so that walk and the checker accept the same pairs (row 159); still to build in this batch. Climb batch 16's rung W built that reading for one case, two own generics whose exclusion is withdrawn, each read over its own instances (F-238; explorations/compile-ladder/rung-walk-overload-if/REPORT.md, "Row 373"): you widen it to every pair. Rows 742 and 549 are the coordinator's call 6: the same reading of declared domains refuses two declarations whose declared domains are equal, as the No Duplicates Rule does (Specification/advanced/overloading.tex, "Declarations with Static Parameters"). P-152, reading exclusion over the whole parameter type, changes the same check after a probe and is not yours: rows 740 and 741 keep their expected failures.

**What you build.**
- In OverloadedFunction.java: today overloadOk (:544-563) refuses two generic declarations that saw a symbolic parameter pair neither excluding nor ordered, unless their exclusion was withdrawn, and validOnDeclaredDomains (:760-799) reads a pair of two generics on its declared domains only when withdrawn. Read every pair of two generic declarations that the parameter-by-parameter check does not settle on its declared domains, each over its own instances, by the No Duplicates, Return Type and Meet Rules, as genericPairValid does for a withdrawn pair.
- Rows 742 and 549: a pair that the parameter check passes because it reads T as a strict subtype of its bound Wide (p1better), while the declared domains are equal, (Wide, Wide) at the bound, is read on its declared domains too, and refused with the message of equal parameter types, 'fails because their parameter lists have the same types'.
- The two source comments that climb batch 16's review judge left (explorations/compile-ladder/climb-batch-16/JUDGE-review.md section 6), in OverloadComparisonResult (:467-468) and validOnDeclaredDomains's comment (:747-758): correct them to F-238's reading.
- The guard: any declaration of the library, a team test, a demo or a specification example that your change refuses at load is a point to report; if the library is refused, hold the line and report the pair and the message. Read microGPT's components (explorations/run-c4/src/, explorations/apl/mg/) for a generic pair whose verdict your change moves, and report what you find; their opr times pair passes today through a Diag object (row 159's workaround), and no model line changes (P-45).
- A guard for rung L's library: a self-contained walk test of its shape, a trait's generic distribute[\K\](r: Red[\R,K\]): Pair[\K\] inherited beside an object's plain distribute(r: Mx[\T\]) under a where clause, whose domain lies inside the generic's, asserted to load, green before and after.

**Rows.**
- Row 159: XXXDispatchRenamedArmWalkRungG and XXXDispatchSwappedArmWalkRungG turn to 'Missing expected failure'; promoted by topic; the gather closes the row.
- Row 742: XXXGenericBesideGenericSameDomain, green today because walk loads the pair, turns red once walk refuses it at load with its keyed message; promoted, the key kept; closed.
- Row 549: XXXGenericBesidePlainSameDomain the same way; closed.
- Notes, not repairs: row 740 (P-152's; XXXGenericPairExcludesTogetherWalk keeps its verdict); row 741 (the compiled half); row 697 (the object-type shortcut in the same class, not yours, waits for rung L's library); row 373.

**Distance sites.** None: every path you change is under walk's evaluator, the test folder and the specification's text, which neither stage reads; run neither.

**Files.**
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java (OverloadComparisonResult's pair loop and overloadOk, :294-563; validOnDeclaredDomains with its comment, :747-799; genericPairValid, from :801). Not the object-type shortcut (:443-446, :513, row 697's), nor bestMatchWithCoercion and bestMatchInternal, rung W's.
- Specification/advanced/overloading.tex (:626-629, the sentence that the interpreter refuses the pair allowed above, row 159).
- Specification/appendices/changes.tex (the entry "Overloading with static parameters": the clauses on row 159, :2612-2617, and on rows 549 and 742, :2633-2638).
- Promoted and new files in ProjectFortress/tests/.

**Tests, first.**
- The four expected failures above, each turned by your change, then promoted to a name by topic, each with its load_exception_contains key kept or rekeyed as walk's new verdict needs.
- A walk test of a generic pair that no parameter pair excludes and that the rules accept on its declared domains, one more specific than the other, asserted to load and dispatch to each: on the base walk refuses it, 'at least one pair of parameters must have excluding types'.
- The guard test for rung L's shape, above.
- Keep their verdicts: F-145's and F-238's load tests, TwoTraitsNoMeetWalk, DispatchCrossingMeetWalk, GenericBoundsMeetWalk, GenericPairExcludingWalk, XXXGenericPairExcludesTogetherWalk (740), XXXReturnRuleObjectParamWalk (697), XXXDottedMethodMeetBothBodiesWalk (444).
- After the edit: ant testSystem once, and ant testSpecData once, since a specification example that walk now refuses or loads moves the gate (P-124).

**Specification.** No normative sentence changes: the chapter's rules already allow and refuse these pairs. The revival sentences named in Files become false or half false: edit them in the revision form, since no other rung edits them. List every other sentence made false, F-155 and F-238 among them, as revival-change material.

**Overlaps by file.**
- OverloadedFunction.java: rung W changes bestMatchWithCoercion and bestMatchInternal and adds two helpers after them; no declaration in common.
- changes.tex: rungs A and C edit other entries; rung C gives any sentence of your entry to the gather instead of editing it.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another rung of the same batch (PLAN, "The principle for the batches"). Rung L needs rung W's fix only to pass under walk, not to build or to be checked: it lands only with W (landsOnlyWith), as climb batch 6's T landed only with F (the batch manual, "The manifest and the scatter").
- W and L, from their diffs. W, commit fd7056abf (git diff --name-only fd7056abf^ fd7056abf, with renames): interpreter/evaluator/values/DottedMethodApplication.java (+21 -1), interpreter/evaluator/values/OverloadedFunction.java (+25 -8), ProjectFortress/tests/XXXMethodStaticArgRungT.fss renamed MethodStaticArgInference.fss (+1 -1). L, L4 and its checker shadow (git -C /home/user/fortress-probe-distribute diff --name-only): Library/FortressLibrary.fss (+6 -9), scala_src/typechecker/staticenv/KindEnv.scala (+24 -2), scala_src/useful/STypesUtil.scala (+19 -1). comm -12 of the two sorted lists prints nothing: no file in common, so no declaration in common. L's other two items, the identities' cast and embiggen, are in FortressLibrary.fss, the four callers and one team test, none of which W touches.
- The declarations each rung changes. W: DottedMethodApplication.applyInnerPossiblyGeneric and two new helpers; OverloadedFunction.bestMatchWithCoercion, bestMatchInternal and two new helpers. L: ActualReduction's leftDistribute, rightDistribute and distribute; SumReduction's two distribute overloads; additiveIdentity; multiplicativeIdentity; MIMapReduceReduction; embiggen and its api line; six declared types of embiggen's callers; class KindEnv's two extend methods with a where clause; object KindEnv's new constraintBounds; STypesUtil.makeArrowFromFunctional. A: TypeDisambiguator.forTraitDecl; TypeAnalyzer's trait-type cases of pSubInner, whereSizes and openWhereSizes; object EmptyKindEnv's lookup; new members at the end of object KindEnv; BuildEnvironments.processWhereClauses; AnyList, its private addL and addR, and the list comprehension's unwrap. C: ApiTypeExtractor.isExported for a FnDecl; OverloadingChecker.toFunctionArrows and the kind word in checkOverloading; Formula.isNatTerm. G: OverloadedFunction.OverloadComparisonResult and its overloadOk; validOnDeclaredDomains and genericPairValid.
- Files two rungs share, each in different declarations: OverloadedFunction.java (W low in the file, G high); KindEnv.scala (L in class KindEnv and after makeFresh, A in EmptyKindEnv and at the end of object KindEnv); changes.tex (A, "The traits that extend a closed trait"; G, "Overloading with static parameters"; C, "When two sizes are the same"). Each rung edits its own sentences; the gather merges the hunks and changes no wording.
- L, A and C time the count stage, and their skeptics time it again, a smoke test each. W and G run neither stage.
- They meet in the measures: L, A and C each move the distance on their own trees; the gate's tables on the merged tree are the first with all three, and two rungs' changes do not add. They meet in walk's suite: W's, G's, L's and A's changes all reach walk, and the gate runs them together.

## 4. The candidates, and what the batch leaves out

Each candidate of PLAN's phase 3, item 15, with its prototype, its size, the declarations it changes, what it shares with rungs W and L or another candidate, and its verdict.

### P-151's where forms

- **The method condition as a bound (row 677) and the generic distribute (row 433; items 56 and 57).** Shadows in `/home/user/fortress-probe-distribute` (the [generic-distribute report](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/generic-distribute/REPORT.md); B.2 of the [where-clauses report](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/where-clauses/REPORT.md)): 3 files, +49 -12. **The core rung L.**
- **The identities' fallback by cast (row 436), 2 sites.** Shadow in `/home/user/fortress-probe-where` (`tmp/partA-library.patch`, two of its lines; the where-clauses report A.2.3): 1 file, +2 -2. Changes `additiveIdentity` and `multiplicativeIdentity` in [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), which no rung or other candidate changes. **Goes in, carried by rung L.**
- **`AnyList`'s comprises clause live, the rest of `AnyList` moved into `List` (row 636), 4 sites.** Shadow in `/home/user/fortress-probe-where` (B.1 and A.2.2 of the where-clauses report). Its part of the worktree's diff, by the report's line list: `TypeDisambiguator.java` +17 -5, `BuildEnvironments.java` +9, `KindEnv.scala` about +12, `TypeAnalyzer.scala` about +27 -7; the library, `List.fsi` and `List.fss`, about +5 -10; four compile tests. It shares the file `KindEnv.scala` with rung L, not a declaration. **Goes in, rung A.** Its shadow predates climb batch 16's `TypeAnalyzer.scala`, so it is re-based.
- **Conditional extension, for the list comparisons' site (row 634's list half), 1 site.** Shadow in `/home/user/fortress-probe-where` (B.3): `TypeAnalyzer.scala` about +31 -2, `KindEnv.scala` about +15, `Decls.scala` +4 -2, `TypeWellFormedChecker.scala` +4 -2; the library, 5 files, +5 -5. **Overlaps: it changes `TypeAnalyzer.pSubInner`'s trait-type case, which rung A changes, and it builds on rung L's `KindEnv.constraintBounds`**, since its conditions reach the kind environment as a where clause through `extend(nodes, where)`. The coordinator's call listed for you, members scoped to the condition, is built by no probe. **Waits** for the next batch, after A and L land.

### The checker's rows

- **Rows 737, 738, 739 and 681.** Not probed; each traced to its line ([ApiTypeExtractor.scala:117](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ApiTypeExtractor.scala), [OverloadingChecker.scala:118-121 and :338](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala), [Formula.scala:157](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala)). 3 files, tens of lines by reading; no diff exists. No declaration in common with any rung. **Goes in, rung C.**
- **Row 714**, a call whose type parameter has a bound naming itself and that no argument fixes: not traced. **Waits** on a trace.
- **Row 725**, the abstract-method split at a method with its own static parameters: traced (`AbstractMethodChecker.scala:136-145`), but alone it would make the checker accept the objects walk refuses at load (row 723), against P-147. **Waits** on row 723.
- **Row 691**, more arguments than parameters accepted: no reproducer, no trace. **Waits.**
- **Rung K's judge's nested call** (`next[\T\](next[\T\](x))`): for the next rung that edits `TypeWellFormedChecker.scala`; none here. **Waits.**

### The walk rows

- **Row 159's limit lifted (P-45), with rows 742 and 549.** Not probed; your decision. 1 file by reading ([OverloadedFunction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java), `OverloadComparisonResult`, `overloadOk`, `validOnDeclaredDomains`); four promotions. Shares that file with rung W, not a declaration. **Goes in, rung G**, with the two source comments of the batch 16 judge, which sit in its declarations.
- **Row 697**, walk's object-type shortcut. Not probed. **Overlaps: it changes `OverloadedFunction.OverloadComparisonResult`, which rung G changes**, and its blocker is the `distribute` pair that rung L replaces. **Waits** for the next batch, read against L's landed library.
- **Row 444**, a dotted method inherited beside one an object declares. Not probed; its site by reading (`Constructor.java:383-388`, `OverloadedFunction.java:1761-1773`). Its repair reaches `SumReduction`'s new set of `distribute` methods. **Waits** on a probe on L's landed library.
- **Row 665's abstract half, with rows 728 and 723:** **wait** on the logging build at each generic declaration under coverage.
- **Rows 717 and 719:** **wait** on row 716's entry, yours (B.worker.1), and a probe of 719's fix.
- **Rows 721 and 722:** **wait** on row 364's site.
- **The revision box beside `if.tex:54` (row 746):** for the next rung that edits that chapter; none here. **Waits.**

### The other candidates

- **The three `String` sites (F-246).** Probed in `/home/user/fortress-probe-strings` (the [symbolic-operators report](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/symbolic-operators/REPORT.md), sections 2.2, 2.3 and 3: its way C, the library's own conversion, with F, `FlatString`'s two api lines). The worktree now holds that probe's way JC, a device for the symbolic operators of item 38, not this candidate. Size, from the report's patch: 2 files, +3 -4: `String`'s `opr ||(a:Any, self)` and `opr ||(self, b:Any)` in `FortressLibrary.fss`, and `object FlatString` in `FlatString.fsi`. No declaration in common with any rung. **Waits** on row 743: with the conversion the team test `extendAny` stops with `CastError`, since an object declared `extends Any` is not an `Object` on either path, and that row is not traced on either path.
- **The integer power's 5 sites, and `strToInt`'s sixth with row 747.** Shadows in `/home/user/fortress-probe-power/tmp/dist/` (the [integer-power report](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/integer-power/REPORT.md)): 4 files each, `FortressLibrary.fsi`, `FortressLibrary.fss`, `FortressBuiltin.fsi`, `FortressBuiltin.fss`; E and Z +29 -27 (+30 -28 with `strToInt`'s typed `fail`), R +91 -29, X +57 -31, and 11 lines of walk natives for E. It changes `^` in `Integral`, `ZZ32`, `ZZ64`, `NN64`, `ZZ`, `NN32` and `IntLiteral`, `QQ`'s power and `strToInt`: no declaration in common with any rung. **Waits** on item 58, what a negative power gives, no default on record.
- **Row 631's `embiggen`, 1 site.** Probed only, by reading, in climb batch 10 (its rung G's REPORT section 8). About 7 files. **Goes in, carried by rung L**, the next library rung.
- **Row 695**, the code generator's missing cast: **waits** on a trace of the cast's place.
- **Row 700 and `Random`'s two proxies:** **wait** on a run at another modulus.
- **Row 425's citations, to row 731:** for the rung that edits them; none here. **Waits.**
- **The Scala walker in the shape of the team's update visitor:** **waits** on a profile of the checker after rung S.
- **Not candidates:** the arrays' 21 sites, item 46's fused arm, row 731's 3, rows 698, 699, 706, 537, 705 and 710 (PLAN, item 15).

### Not in this batch, and why

- **Exclusion between two generic declarations read over the whole parameter type (P-152, rows 740 and 741).** Your decision says: a probe to find the algorithm on both paths, then a rung on each. No probe is taken, so it is not in this batch. Rung G changes the same walk check, so the probe starts from G's landed code; G leaves rows 740 and 741 and their expected failures as they are.
- **The two new walk defects of the walk probe** (its section 6): a method's own `bool` static parameter stops with `subtypeCompareTo(BoolArg, BoolArg)`, and a generic trait method bounded by the trait's parameter stops with "Missing type R". Each needs its ledger row and an expected-failure test, and no fix: rung W writes both, as NEW-W-2 and NEW-W-3, and runs each program compiled once.
- **Row 21's other cases and row 744** (the walk probe's section 4, "Not covered"): an expected type that fixes the argument (row 510), a generic method beside a plain one at load (NEW-W-1), explicit static arguments on an overloaded receiver (row 744). Rows only, no fix.
- **The symbolic operators** ([SORT.md](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/symbolic-operators/SORT.md)): its 205 errors appear only when the checker reads symbolic operators, your open item 38. Its library fixes (`String`'s four families, `FlatString`'s pair, `EmptyString`'s, `=`, `|_|`, `Maybe`'s subscript, the `Vector` and `Matrix` top-level operators) are latent on the path until that is answered, and stay out. Its design choices (the subscripts, `^`, scalar `+` and `-`) are yours, item 59. The three `String` sites of today's 49 are a different question and wait on row 743, above.
- **Conditional extension and row 697:** they overlap, above.

## 5. How it is run

The batch runs on the workflow of batch 16: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`. Each rung's worker does its rung test first; a checker rung times the count stage before and after its change and makes its speed pass; its skeptic checks it, times the count stage itself where the rung changes the checker, and fixes what it finds, test first; a judge rules only on a fix the skeptic marks contested, on a rung the skeptic refuses, or on a worker's stop; rung L is withheld if rung W does not land; the gather lands the rungs on `main` and folds their record lines and their ledger rows through `coordinator/tools/ledger.py`; the merged-diff review and the gate run side by side; the commit stage lands the gate's tables, runs the quick microGPT walk check and pushes. The batch writes no skill text. Section 3 is each worker's brief word for word; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-17/manifest/gen17.py` reads with the briefings of `lists17.py` beside it, and `check17.js` checks.

### The generator

No generator is committed with this record: the planner's brief commits the record only. A draft of the three files, made from `plan-16/manifest/` and checked against this record, is in the coordinating session's scratchpad, `plan-17/manifest/` (`gen17.py`, `lists17.py`, `check17.js`). Changed from batch 16's: the batch's values; the five rungs W, L, A, C and G; a field `lands only with`, which `gen16.py` has no reader for, written as `landsOnlyWith`; `check17.js` checks that L lands only with W and that no other rung declares it. The coordinator commits them under `explorations/compile-ladder/plan-17/manifest/` before the launch.

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry. "Its test is the stage" means the checker count or the distance is the rung's failing-then-passing test; no rung here has that, since each has a test file first. "Joins the gate" names a step the gate gains once the rung lands; none does, and `ant testSpecData` runs because 16's landed summary has it. No rung declares a checker count: it is reported, never red, and by reading it falls. The expected minutes order the scatter only: W's are set above its own estimate, about 110, so that it starts beside L. The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands; only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### W
- **slug:** `rung-walk-method-sargs`
- **worktree:** `/home/user/fortress-methodsargs`
- **expected minutes:** 150
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** walk infers a generic dotted method's own static arguments from the arguments' types, part A for a plain receiver and part B for an overloaded method set, from the walk probe's commit fd7056abf (row 21); one expected failure promoted, a nested-reduction test that guards rung L's library, rows for the cases left and the probe's two new defects; no site; Java in walk's DottedMethodApplication.java and OverloadedFunction.java, and inference.tex's walk sentences.
- **points to report:**
  - Whether you took fd7056abf's code as it is or changed it, and why.
  - A walk test whose verdict changes beyond the promotion and your new tests.
  - The system suite's time beside the base's; a slowdown of several times.
  - The cases row 21's notes hold, each with its new home; the two new defects, each with the paths that show it.
  - The team lines changed in walk's dotted call and overload choice.
  - Every sentence made false, and the specification sentences you edited.
  - A walk edit beyond the two files named, or any library or checker edit.

#### L
- **slug:** `rung-library-distribute`
- **worktree:** `/home/user/fortress-libdistribute`
- **expected minutes:** 160
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** W
- **blurb:** by item 56's default and the curator's word of 12:38 UTC, the team's generic distribute made live over its own K with leftDistribute and rightDistribute the same, the Any method removed, and SumReduction's two overloads under method where conditions, which the checker reads as bounds (rows 433 and 677, B.2); the identities' fallback by cast (row 436) and embiggen in the typed shape (row 631); lands only with W; 49 to 39 by reading; FortressLibrary.fss and four callers, KindEnv.scala and STypesUtil.scala.
- **points to report:**
  - LibraryOverloadFamilies at its line 37 on your branch alone, with its message, and any other red line.
  - The distance and count tables before and after, site by site, and :130.
  - Each count run's seconds, base, change and pass.
  - embiggen's way, the team test WordCountSmall's line, and any walk value that moves.
  - NEW-L-1 and its program and output.
  - Team lines changed in the library, and the api left as it is.
  - A checker file edited beyond the two named, or any walk edit.

#### A
- **slug:** `rung-anylist-comprises`
- **worktree:** `/home/user/fortress-anylist`
- **expected minutes:** 145
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** by P-151, the team's comment AnyList comprises List[E] where [E] made live: the checker opens a type where-variable of a comprises clause at a call and walk binds it at load (the where-clause probe's B.1, re-based onto climb batch 16's TypeAnalyzer), and AnyList's addLeft, addRight and the comprehension's unwrap moved where the element type is known (row 636); 4 sites by reading; Scala in TypeAnalyzer.scala and KindEnv.scala, Java in TypeDisambiguator.java and BuildEnvironments.java, List.fsi and List.fss.
- **points to report:**
  - The distance before and after, site by site; which of row 636's four went and any site that came.
  - Each count run's seconds, base, change and pass, and how the re-based shadow keeps every memo key whole.
  - The refusal tests' messages.
  - A walk test or a specification example whose verdict changes.
  - Whether Part A's appendAny was needed.
  - Every sentence made false, and the Appendix I sentences you edited.
  - A checker file edited beyond the four named, or any edit of B.2's or B.3's lines.

#### C
- **slug:** `rung-checker-four-rows`
- **worktree:** `/home/user/fortress-checkrows`
- **expected minutes:** 140
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the compiled checker gives a component function that leaves out its return type the api declaration's of its own parameter types (row 737, :130 out for good), names an object as an object in its per-provider message (row 738), reads a component's own abstract functional methods in its top-level set (row 739), and infers a static argument written with a static parameter in it (row 681); 49 to 48; Scala in ApiTypeExtractor.scala, OverloadingChecker.scala and Formula.scala.
- **points to report:**
  - A declaration of the one library or the compiler's own library that row 739's change refuses, and whether its line landed.
  - The count and distance tables before and after; :130 and any other site that comes or goes.
  - Each count run's seconds, base, change and pass.
  - The tests rekeyed for row 738, each with its new key.
  - What Formula.reduce and the solver do with the widened isNatTerm.
  - Every sentence made false, the one you edited, and any you gave the gather.
  - A checker file edited beyond the three named, or any library, walk or code-generator edit.

#### G
- **slug:** `rung-walk-generic-pairs`
- **worktree:** `/home/user/fortress-genpairs`
- **expected minutes:** 100
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** by P-45, the curator's answer, walk's load check reads every pair of generic declarations on its declared domains by the checker's rules, no parameter pair required to exclude (row 159), and so refuses two pairs whose declared domains are equal (rows 742 and 549); four expected failures promoted; rows 740 and 741 left for P-152's probe; no site; Java in walk's OverloadedFunction.java, and the revival sentences on those rows.
- **points to report:**
  - A declaration of the library, a team test, a demo or a specification example that walk now refuses or newly loads, with its message, and whether the line landed.
  - What a reading of microGPT's components finds.
  - A walk test whose verdict changes beyond the four promotions and your new tests.
  - The team lines changed in walk's pair check, the two comments among them.
  - Every sentence made false, and the specification sentences you edited.
  - A walk edit beyond the one file named, or any checker or library edit.

### What every agent of the run reads first

This run is climb batch 17, the record CLIMB-BATCH-17.md, phase 3's next batch after climb batch 16, toward the checker at a true zero. Its core is two rungs that land together: W, walk infers a generic dotted method's own static arguments (row 21, the walk probe's parts A and B), and L, the team's generic distribute made live over its own K with SumReduction's two overloads under method where conditions that the checker reads as bounds (rows 433 and 677), with the identities' cast (row 436) and embiggen typed (row 631). L needs W's fix under walk: on its own branch the gated test LibraryOverloadFamilies fails at its line 37, as the probe measured, so L lands only with W. Beside them: A, AnyList's comprises clause made live and its other bodies moved into List (row 636, P-151); C, four checker rows (737, 738, 739 and 681); G, walk's load check reading every pair of generic declarations by the checker's rules (row 159 by P-45, with rows 742 and 549). The distance stands at 49 and the count at 39 after climb batch 16 (compile-ladder/climb-batch-16/gate/), the count stage 82 s at its gate; by reading the distance falls to 35. The three checker rungs, L, A and C, follow P-148: the count stage timed once on the base build and once on the correct change, a profile and a second pass that keeps every result, as the skill's compiler.md, "The checker's time", gives the steps, and their skeptics time it again. W and G change walk only and run neither stage. The rungs meet only in a measure: no two rungs change one declaration, and no rung builds on another. W edits walk's DottedMethodApplication.java and OverloadedFunction.java's two overload choices; G that file's pair check at load; L the library's reductions, KindEnv's extend methods and STypesUtil's arrow; A TypeAnalyzer's where-clause opening, TypeDisambiguator, KindEnv's empty environment and BuildEnvironments, and List; C ApiTypeExtractor, OverloadingChecker's top-level set and message, and Formula.isNatTerm. Each rung edits its own specification sentences, in entries no other rung edits. ant testSpecData runs in the gate because climb batch 16's landed summary has it.

### Before the launch

The coordinator, in this order:
1. This record, its review in place, and `plan-17/manifest/` (from the scratchpad draft) on `main`; the base is `main`'s head after them, its full hash, passed as `args.base`.
2. The probe worktrees `/home/user/fortress-probe-distribute` and `/home/user/fortress-probe-where` kept until the batch lands: rungs W and L read the first (commit `fd7056abf`, the L4 diff and `tmp/`), rung A the second (its uncommitted diff and untracked tests). The branch `wip/probe-generic-distribute` kept, since `fd7056abf` is on it alone.
3. The base build at `/home/user/fortress-base17`, as the manual's "Before the launch" steps 2 and 3 give it (`ant compileAll`, the library order, one passing walk test, `git status --porcelain` empty), passed as `args.baseBuild`; one trial seed (`/home/user/fortress-seedcheck`, removed after) and one `old-fortress.sh` run of `BooleanOps.fss` from the main tree prove it. The checker rungs and their skeptics time the count stage on it, so nothing else builds or runs there.
4. The briefings checked on the base: `python3 explorations/compile-ladder/plan-17/manifest/lists17.py`, every key matching one place (the draft passed on `5f339c4d6`: 119 briefing keys, 0 problems). The block generated and spliced: `python3 explorations/compile-ladder/plan-17/manifest/gen17.py`, then `node explorations/compile-ladder/plan-17/manifest/check17.js`, which splices it into a scratch copy and checks it; then `check17.js --write`, `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. No launch value is set by hand: the gather numbers the batch's new rows through `ledger.py add`.
5. `df -h /` against five seeded worktrees (about 206 MB each), the base build, and the count and distance stages' scratch folders; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`.
6. Check-ins armed for the run's length, about 9 hours, 45 minutes apart, and one after the session's next predicted process stop, which the boot note names; a run stopped there is resumed with `resumeFromRunId`.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 4>', baseBuild: '/home/user/fortress-base17'}})`. The arguments are kept byte for byte in the session's scratchpad, as `batch17/launch-args.json`, since a resume needs them: `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', resumeFromRunId: '<the run id>'})`.

### The briefings, rung by rung

Each key is a `facts-extract.sh` key, read whole by the worker first; a key marked (check) is also read by the skeptic, a judge and a repair round. The reasons are rendered at the end of the worker's brief. `lists17.py` holds the same keys and reasons; every key matched exactly one place on `5f339c4d6`. `SRC` is `ProjectFortress/src/com/sun/fortress`; `EV` is `SRC/interpreter/evaluator`; `TC` is `SRC/scala_src/typechecker`; the probe reports are `perf-probes/walk-generic-static/REPORT.md` (WGS), `perf-probes/generic-distribute/REPORT.md` (GD) and `perf-probes/where-clauses/REPORT.md` (WC), under `explorations/`.

- **W**, 24 keys, 8 checks: P-45 (check), F-248 (check), ledger 21 (check), 744, 510, 723, 307, 567, 364; WGS "1. On base", "2. The smallest fix" (check), "3. The nested cases", "4. Which cases of entry 21", "5. Walk tests and microGPT", "6. Defects found", "8. Part A alone" (check); GD "5. Walk"; inference.tex "The Static Arguments of a Call" (check); the code of DottedMethodApplication.applyInnerPossiblyGeneric (check), OverloadedFunction.bestMatchWithCoercion and bestMatchInternal (check), EvaluatorBase.inferAndInstantiateGenericFunction, XXXMethodStaticArgRungT.fss, and Generator2.fss's distributes with the team's notes.
- **L**, 34 keys, 11 checks: P-151 (check), P-148 (check), P-27; F-242 (check), F-248 (check), F-243, F-244, F-53; ledger 433 (check), 677 (check), 436, 631, 701, 737; GD "1. In short", "2. What I built", "3. The checker on the bound-free shape", "4. The distance stage, per variant" (check), "5. Walk", "9. Decisions"; WC "B.2" (check), "A.2.3 Row 436"; WGS "8. Part A alone" (check); trait-parameters.tex "Where Clauses"; overloading.tex "Declarations with Static Parameters"; the code of ActualReduction's three methods, the fusion pairs and SumReduction, the identities, MIMapReduceReduction and embiggen, Generator2.fss's distributes, KindEnv's extend methods (check), STypesUtil.makeArrowFromFunctional (check), LibraryOverloadFamilies.fss's distribute assertion; climb batch 10 rung G's REPORT "8. The sites left".
- **A**, 19 keys, 8 checks: P-151 (check), P-148 (check); F-243, F-244; ledger 636 (check), 682, 701; WC "B.0 In short", "B.1" (check), "A.2.2 Row 636" (check), "B.6 Decisions"; trait-parameters.tex "Where Clauses"; changes.tex "The traits that extend a closed trait" (check); the code of TypeAnalyzer's whereSizes to parents (check) and its opening trait case, TypeDisambiguator.forTraitDecl, BuildEnvironments.processWhereClauses, object KindEnv, and List.fss's AnyList (check).
- **C**, 23 keys, 10 checks: P-148 (check), P-149 (check), P-26; F-53, F-232, F-42; ledger 737 (check), 738 (check), 739 (check), 681 (check), 727, 683; the batch 16 review "1. The count 39"; type-inference.tex "Type Inference for Components" (check); overloading.tex "Meet Rule"; inference.tex "The Static Arguments of a Call"; changes.tex "When two sizes are the same"; rung K's SKEPTIC.md "6. My programs"; the code of ApiTypeExtractor.isExported for a FnDecl (check), OverloadingChecker.toFunctionArrows (check) and toFunctionalMethodArrows, the kind word, Formula.isNatTerm (check).
- **G**, 19 keys, 8 checks: P-45 (check), P-152 (check), P-26, P-124; F-238, F-145, F-155; ledger 159 (check), 742 (check), 549 (check), 740, 697; overloading.tex "Declarations with Static Parameters" (check); changes.tex "Overloading with static parameters"; climb batch 16 rung W's REPORT "Row 373"; the batch 16 review judge's "6. Left as it is"; the code of OverloadedFunction.OverloadComparisonResult (check), overloadOk, validOnDeclaredDomains (check).

### The gate, and what it should show

The comparands are climb batch 16's `summary.txt`, `checker-count.txt` (39) and `distance.txt` (49), with `distance-sites.tsv`.
- `testSystem`: 630, the comparand's sum (160, 155, 159 and 155 over the four shards) and the one test the review's repair added (its `# repair-tests` line), plus the files W, G and A add; a promotion moves nothing.
- `testFast`: the compiler track 1,224 plus the cases L, A and C add; the library track 86, the other-compiler track 263; the misc track's 51 classes and 439 tests.
- `testSpecData`: 130 green.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: no rung declares a move; L's library change is the one that could move a file's output, a point to report.
- The checker count: reported, not declared; by reading it falls by up to 10 (the `FortressLibrary` sites of rows 433, 436, 631 and 737).
- The distance, reported and never red: 35 by reading; L's 9 sites, A's 4 and C's `:130` gone, nothing new.
- microGPT's quick pair at the commit stage, both programs `ALL PASS`, 7 of 7 each, as the probe ran it with W and L4 (P-30; 65 s and 58 s at batch 16).
- A repair after the review or the gate runs the gate again only when it changed a path the gate reads (`ProjectFortress/` but test files, `Library/`, `build.xml`).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather, in the order it applies the rungs; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`. The rows the rungs open by plan: NEW-W-1 (a generic dotted method beside a plain one in an object's own declarations stops at load), NEW-W-2 (a method's own `bool` static parameter), NEW-W-3 (a generic trait method bounded by the trait's parameter), NEW-L-1 (a method's condition on its trait's parameter unchecked at a dotted call). Rows the rungs close, each as its test passes on the merged tree: 21 (W); 433, 677 and 631 (L); 636 (A, if its four sites go); 737, 738, 739 and 681 (C); 159, 742 and 549 (G). Notes: 510, 744, 364, 723 (W); 436, 701, 737 (L); 682, 701 (A); 683, 727, 488 (C); 740, 741, 697 (G). Where `ledger.py` refuses a note for length or a closed row, the gather lists the text for the coordinator.

### After the landing

The coordinator: the landing report; the routing of every item for the curator into PLAN, items 56 and 57 and the calls of section 2 among them; FACTS consolidated (F-242 and F-248 by L and W, F-243 and F-244 by L and A, F-53 by C, F-155 and F-238 by G); the skill writer's task, the compiler.md exception for row 737 among it; the post-batch review; batch 18's lists from section 4, conditional extension, row 697 and P-152's probe first.

## 6. Files cited, with their links

- Records: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [BOOT.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/BOOT.md), [CLIMB-BATCH-16.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-16.md), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md), [climb-batch-workflow.js](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.js), [batch-redesign.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/process-engineering/batch-redesign.md), [plan-16/manifest/gen16.py](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-16/manifest/gen16.py), [the batch 16 review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-16-review.md), [open-asks-2026-10-16.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/open-asks-2026-10-16.md), [batch 16's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-16/gate/summary.txt), [the per-site list](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/gate/distance-sites.tsv), [batch 16's review judge](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-16/JUDGE-review.md), [batch 16 rung W's report](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/rung-walk-overload-if/REPORT.md), [batch 16 rung K's skeptic](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/rung-checker-abstract-callsite/SKEPTIC.md), [batch 10 rung G's report](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/rung-generator-slips/REPORT.md).
- Probes: [walk-generic-static](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/walk-generic-static/REPORT.md), [generic-distribute](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/generic-distribute/REPORT.md), [where-clauses](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/where-clauses/REPORT.md), [symbolic-operators](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/symbolic-operators/REPORT.md), [SORT.md](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/symbolic-operators/SORT.md), [integer-power](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/integer-power/REPORT.md). Their worktrees and commit `fd7056abf` are local, not on GitHub.
- Library: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi), [Generator2.fss](https://github.com/palimondo/fortress/blob/main/Library/Generator2.fss), [List.fss](https://github.com/palimondo/fortress/blob/main/Library/List.fss), [List.fsi](https://github.com/palimondo/fortress/blob/main/Library/List.fsi), [Map.fss](https://github.com/palimondo/fortress/blob/main/Library/Map.fss), [IntMap.fss](https://github.com/palimondo/fortress/blob/main/Library/IntMap.fss), [PrefixMap.fss](https://github.com/palimondo/fortress/blob/main/Library/PrefixMap.fss), [Pairs.fss](https://github.com/palimondo/fortress/blob/main/Library/Pairs.fss), [FlatString.fsi](https://github.com/palimondo/fortress/blob/main/Library/FlatString.fsi), [FortressBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss).
- Walk: [DottedMethodApplication.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java), [OverloadedFunction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java), [EvaluatorBase.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java), [BuildEnvironments.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java).
- Checker: [KindEnv.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala), [STypesUtil.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala), [TypeAnalyzer.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala), [TypeDisambiguator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java), [ApiTypeExtractor.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ApiTypeExtractor.scala), [OverloadingChecker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala), [Formula.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala), [AbstractMethodChecker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala), [Decls.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala), [TypeWellFormedChecker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala).
- Tests: [XXXMethodStaticArgRungT.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/XXXMethodStaticArgRungT.fss), [LibraryOverloadFamilies.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/LibraryOverloadFamilies.fss), [GeneratorDeclarations.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/GeneratorDeclarations.fss), [WordCountSmall.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/WordCountSmall.fss), [XXXExpectedTypeFixRungT.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/XXXExpectedTypeFixRungT.fss), [XXXDispatchGenericMethodBesidePlain.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/XXXDispatchGenericMethodBesidePlain.fss), [XXXDispatchRenamedArmWalkRungG.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/XXXDispatchRenamedArmWalkRungG.fss), [XXXGenericBesideGenericSameDomain.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/XXXGenericBesideGenericSameDomain.fss), [XXXGenericBesidePlainSameDomain.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/tests/XXXGenericBesidePlainSameDomain.fss), [XXXWhereBoundChecker.test](https://github.com/palimondo/fortress/blob/main/ProjectFortress/compiler_tests/XXXWhereBoundChecker.test), [XXXOmittedReturnTypeFromApi.test](https://github.com/palimondo/fortress/blob/main/ProjectFortress/compiler_tests/XXXOmittedReturnTypeFromApi.test), [XXXNatArithInferChecker.test](https://github.com/palimondo/fortress/blob/main/ProjectFortress/compiler_tests/XXXNatArithInferChecker.test), [XXXDottedMethodMeetAbstractSibling.test](https://github.com/palimondo/fortress/blob/main/ProjectFortress/compiler_tests/XXXDottedMethodMeetAbstractSibling.test).
- Specification: [inference.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/inference.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex), [overloading.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced/overloading.tex), [trait-parameters.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/trait-parameters.tex), [type-inference.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/components/type-inference.tex), [functions.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/functions.tex).
