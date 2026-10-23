<!-- The record of climb batch 21, the next batch of the plan's phase 3, "the checker at a true zero", in two runs (climb batch 21 and climb batch 21b), for the coordinating session, the curator and the batch's workers. Drafted 2026-10-23 by an Opus planning worker against `main` at `aa5ff2423`, whose `Library/`, `ProjectFortress/`, `Specification/`, `build.xml` and `bin/` are those of `510fac459`, climb batch 20's landing (`git diff --stat 510fac459 aa5ff2423` over them is empty), and those of each probe's base (`d97001d19`, `0c7e7be18`, `23878af0e`, `4463902e9`): so climb batch 20's landed tables and the per-site list describe the base, and the five probes' measurements hold on it. Commits after the base while the record was drafted changed record files only. While it was drafted the coordinator changed the brief after the Fable judgement of the curator's type decisions (`reviews/type-decisions-review/judgement.md`, `28b6e27a0`, its V1 to V3 and section 2): P-156's rung records the tuple rule as a departure and makes the checker's exclusion side consistent, `BoundedRange`'s `atMost` became question 2, P-157's change became rung V, which the batch can drop, and row 774 left the batch, its `Equality` line and `=/=` row going into rung N. Reviewed in place by a Fable reviewer on 2026-10-23 (`climb-batch-21-review.md`), at `e9043d54a`, whose `Library/`, `ProjectFortress/`, `Specification/`, `build.xml` and `bin/` are `aa5ff2423`'s: it wrote in probe A1's result (`dd9d7619a`) and the other branch of rung V, a checker rung in its place; moved the count stage's blind spot (fork 21) from rung E to the coordinator; made run 1's intro true with or without V; corrected five line citations; said in S's and V's sections that the full-check stage is their test where the brief's role text names the stock stages; and fixed two fork numbers in `lists21.py`'s reasons. -->
<!-- Sources: PLAN.md, phase 3, item 19 and its candidates, and items 38 and 59; POSITIONS P-155, P-156, P-157, P-154, P-79, P-151, P-146, P-88, P-45, P-42, P-56, P-148 and the others cited by number; FACTS by number; climb batch 20's gate (`compile-ladder/climb-batch-20/gate/`) and the per-site list; the five probes, taken as findings: `perf-probes/symbolic-operators-2/REPORT.md` with its patches and generators, `perf-probes/export-check-full/REPORT.md` with `library-4h.patch` and `export-check-shadow.patch`, `perf-probes/walk-conditional-extension/REPORT.md` with its patch, `perf-probes/team-demos/REPORT.md` with `demos-repairs.patch`, and rows 793 and 794; `perf-probes/immutable-arrays/REPORT.md`, weighed; the ledger rows 584, 585, 611, 726, 774, 775, 783, 784, 793, 794, 800 to 802, 364, 449, 464, 468, 670, 710 and 791; the code at the sites; the specification's sections cited. -->
<!-- The planner's probe (section 4): worktrees seeded from the base build `/home/user/fortress-base21` at `aa5ff2423`, detached, removed after; nothing run in the base build. (1) The base's full check, the symbolic-operator probe's `run-shadow.sh catch` on the unchanged library: '#total 191', three crash lines, the probe's figure reproduced on this base. (2) Run 1's text together (rung S's known fixes with the `abshead` variant, rung V's vectors, rung B's index bound with the checker's and walk's tuple rule built, rung N's three lines and its `Equality` line, and, before the change of brief, the walk probe's row-774 patch with its two test lines and QuickCheck's map): the stock distance and count, the full check's distance and count, walk's two suites, microGPT's quick pair, and the 52 team demos with the demos probe's repairs. (2b) Question 2's text, `atMost` kept under a method condition: the stock and full-check stages; and, on (2c)'s checker, the line kept as written, without the condition. (2c) On (2b), rung B's checker at its defaults (fork 7's exclusion case, question 1's desugarer line): the stock and full-check stages; then, without the row-774 parts, walk's suites, microGPT's quick pair and a program of question 1 under walk. (3) Run 2's library text on top of run 1's (the export probe's 4h text re-based by hand, its 19 follow-on lines, `Array2`'s two subscripts): the stock and full-check stages. (4) The compiled path with the full check built: the compiler's prelude and `ant testFast`, before and after its repairs. Four worktrees in all. Machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` for the stages, load 4 to 25 with the three probes beside each other: no timing here is one to compare. Its patches are under `compile-ladder/plan-21/probes/`. One line per paragraph. -->

# Climb batch 21

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. It runs a program without static types. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode. The compiled path still uses its own small library, the **prelude**, until the **switch-over**, when it takes over the interpreter's library, the **one library**.
- **The distance** is the number of errors the checker reports on the one library. Each error has a **site**. **The count** is the checker's errors on the library's `FortressLibrary` component, read by the **count stage**, which also gives the checker's time.
- **The full check** is the checker's overloading check reading the symbolic operators too (`+`, `-`, `=`, `||`, the subscripts `[ ]` and the rest). Today it reads only operators named by a word of capitals, such as `MAX` (row 584); P-155 turns it on. The **shadow** is a copy of the checker with the full check on, compiled beside the build; the symbolic-operator probe measured with it.
- An **api** is a component's interface (a `.fsi` file); the **component** is its code (a `.fss` file). The **export error** is one error that lists every declaration where an api and its component differ; each declaration it lists is an **entry**.
- A **tuple** is a value such as `(1, 2)`. An array of rank 2 is indexed by a pair: `m[i, j]` passes the pair `(i, j)`.
- A **row** is an entry of the gap ledger, cited by number. An **item** is a numbered question in PLAN's list "Pavol's answers".
- A **rung** is one fix, built by one worker in its own copy of the tree and checked by a second worker, the skeptic. A **batch** is a few rungs, merged and tested together by the **gate** and landed at once. **Two runs of one record** are two batches, the second launched after the first lands, as batches 6 and 6b and 7 and 7b ran.
- **Test first.** Every fix starts with a test that shows the defect, seen failing before the edit and passing after. An **expected failure** is a test named `XXX...` that passes while the defect is there; when the fix lands it is **promoted** to a plain name. A **guard** is a test that passes before and after.

### Where the distance stands

- After climb batch 20 the distance is 5 and the count 3 ([gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-20/gate/distance.txt); F-53). Its five: the second export error, 43 entries; row 731's 3 (`BIG MIN` twice and `List.fss:146`); item 46's fused arm (row 632).
- With the full check on, the same library gives 191: the 5 and 186 more, three of them crashes on `AnyList`'s `||` (F-245; the planner reproduced it on this base, section 4).
- **This batch's aim is the full check on at the gate's 5.** It cannot move the 5 themselves: row 731's 3 and the fused arm are left out by the brief, and the export error stays while its `Maybe` and `String` entries do.

### The batch: two runs, seven rungs

**Run 1, climb batch 21**, the library and walk changes that the full check needs, and two that share nothing with them:

- **S, the symbolic operators' library fixes (P-155; rows 585, 611, 784).** The probe's seven known fixes: `String`'s four concatenation operators as top-level operators, as juxtaposition's already are; `EmptyString`'s meet; `Integral`'s and `ZZ`'s `=`; `|_|` by `String`'s api header; `Maybe`'s meets; the api's six vector and matrix operators that the component lacks out; `Float`'s `^` meet. Library only. The full check: 191 to 137.
- **B, the index bound with the tuple rule (P-156; row 783).** A trait `Index`; `ZZ32` an `Index`; ranges exclude it; every index parameter of the library's generic indexed types bounded by it; a tuple of indices an `Index` on both paths and in the specification, recorded as the revival's departure from the designers' tuple-type text. The full check: 191 to 67, its 124 subscript errors gone. **It needs your answers to questions 1 and 2 below.**
- **V, vectors that are not additive groups (P-157).** `Vector` and `Matrix` leave `AdditiveGroup`, and arrays exclude every additive group. Six library lines; the full check: 191 to 183. **A rung apart so that it can be dropped:** the type-decisions judgement says P-157 should wait for a checker probe, A1, and you decide on its result. A1 has run (`perf-probes/self-type-exclusion/REPORT.md`; section 4, "Probe A1"): two changes of the overloading check's exclusion test together clear the same 8 sites with no library line, the full check 191 to 183, and move nothing else; neither alone does. So your choice is V, or no V and a checker rung in its place that builds those two changes and keeps the team's `Vector` and `Matrix` additive groups (rung V's section, "The other branch"). Dropped with nothing in its place, the 8 vector sites stay as known errors under P-155, and nothing else in the batch moves.
- **N, two small library repairs under walk.** The slices of an `Array2` or `Array3` based above zero (rows 793, 794), three lines, the offset `Array1` already subtracts; and a list's `=` through `Equality` (`List extends Equality[\List[\E\]\]`, the library's way for maps), with the defect it works around filed: the library's `=/=` and `assert` compare by identity a value whose own `=` they cannot see. The specification's two sentences that order every list take P-154's revision note.

**Run 2, climb batch 21b**, after run 1 lands:

- **C, the full check itself (P-155; row 584).** The checker's three loops read every symbolic operator. With it: the `AnyList` crash repaired; a fault the planner found, an api's operator set counted twice where a prefix and an infix operator share a name; and the prelude's one invalid `=`. The distance 5 to 5, now with every operator checked.
- **E, the api aligned with its component, and the export check brought to its rule (rows 800 to 802).** The export probe's 66 lines with the 19 they bring; the check's three defects and its reading of `abstract` brought to the specification; `Array2`'s column and row subscripts in the api. The export error from 43 entries to about 15, still one site.
- **D, the team demos running (P-79).** The demos probe's repairs, so all 52 of the team's demos run to their end under walk, with row 468's test first, and `trips.fss`'s order (row 710).

**Why two runs.** The full check (C) shows the library's 186 errors until S's and B's fixes are in the same tree, and its run is red on the crash until C's own fix is in; B edits the checker's subtype and exclusion code (`TypeAnalyzer`'s `pSubInner` and `pExcInner`), through which the crash that C repairs runs. The export alignment (E) edits `Integral`, `ZZ`, `ZZ32`, `Range`, `BoundedRange` and `FullRange` in the api, which S and B edit too; its text must be written on theirs. The demos (D) must run on the library that runs them, after S's, B's, V's and N's changes. PLAN's rule: no two rungs change one declaration, and no rung builds on another of its batch. One run would need S, B and C as one rung, about 2M for one worker. The price of the second run is one more gather, review, gate and commit, about 1.2M.

**Why these rungs are not cut finer, and V apart.** S's seven fixes are all library text that only the full check reads, measured together by the probe and by the planner. B's library bound and both paths' tuple rule land together or not at all: without the checker's rule the stock distance gains 73 errors at the tuple indices, and without walk's, walk stops microGPT (the probe, section 3.1). V is cut out of S only so that the batch can drop it on your word about P-157 without touching another rung.

### What the batch leaves out (section 4)

- **Row 731's three sites** (`BIG MIN` twice, `List.fss:146`): a checker project of its own, by the brief.
- **Row 632's fused arm:** waits on your answer to item 46.
- **Row 731's demo half** (P-79's last named repair): needs the checker run over each demo first; no probe has.
- **The export error's other 25 differences** (17 that need a way of their own, 6 that need a decision, among them the two the export probe asked) and `Maybe`'s 5 and `String`'s 13: after this batch, the error stays at one site.
- **Row 774, walk's half of conditional extension:** waits until walk runs the checker (P-12) or row 364 is fixed, by the type-decisions judgement (its V3): today walk would take the order from every list of unwritten numerals or strings, row 364's loss and not P-154's. `XXXConditionalExtensionTypeTestWalk` stays an expected failure; the `Equality` line lands now, in N.
- **Row 773** (waits on queue item 177), **`tint`** (row 786), **row 782** (the export check reading symbolic names), the immutable arrays of rank 2 and 3.

### Before the batch runs

- **Two questions for you hold run 1** (section 2), both on rung B: question 1, where `Index` stands, so that a tuple of indices is an `Index` without becoming an `Object` (default: outside `Object`, as `Any` is); and question 2, whether `BoundedRange`'s narrowed `atMost` goes or stays under a method condition (default: section 2).
- **Your word on P-157, with probe A1's result, decides rung V:** kept; dropped from run 1 before the launch; or dropped and the checker rung of its "The other branch" written into run 1 in its place, whose section and manifest entry a planner writes before the launch.
- Three of the brief's defaults, the export probe's two questions, and the coordinator's default for row 774 (the `Equality` line and the `=/=` row now, walk's half later) are on your review list (section 2), not questions.
- The coordinator generates and splices `plan-21/manifest/` for run 1, builds the base build at the base, and checks the briefings there (section 5). Run 2's sections are re-read against run 1's landed tree before its launch.

### Cost

- **Run 1:** about 3.6M tokens written, from 3.2M if no fix is contested and the review blocks nothing, to 4.5M with a judge and a repair round on a rung and on the review. Workers about 1.35M (B 0.6M with its speed pass, S 0.4M, N 0.2M, V 0.15M), skeptics about 1.1M (B's runs the count stage twice), the fixed roles about 1.15M. About 3.5 hours at two agents at once. Without V, about 0.3M less; with the checker rung of V's other branch in its place, about 0.9M more (a checker worker with its speed pass about 0.6M and its skeptic about 0.55M, as rung B's, against V's 0.3M).
- **Run 2:** about 3.7M, from 3.3M to 4.6M. Workers about 1.55M (C 0.6M and E 0.55M, each with a speed pass; D 0.4M, 52 demo runs), skeptics about 1.05M, the fixed roles about 1.1M. About 3.5 hours.
- Batch 20 wrote about 2.6M for two rungs, 1.32M a rung with every role, in 2 hours 10 minutes: workers 454K and 394K, skeptics 397K and 360K, the fixed roles 1.04M (`reviews/batch-20-review.md`, "What came up in this run").

## 2. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of yours; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### Question 1, consequential: where the trait `Index` stands

**The question.** P-156 makes a tuple of indices an `Index`. The specification's rule makes every trait except `Any` and `Object` extend `Object`, and P-42 says that `Object` holds no tuple. So `Index` cannot be an ordinary trait: if it extends `Object`, a tuple of indices becomes an `Object`. Where does `Index` stand?

**Primer.** In Fortress every trait you declare is below `Object`, whose values are objects; tuples, functions and `()` are not objects, and only `Any` holds them (P-42; `Specification/basic/types-vals-vars.tex`, "Tuple Types": "A tuple type excludes any non-tuple type other than `Any`."). P-156 adds:

    trait Index end                              (* what a subscript takes *)
    trait ZZ32 extends { ..., Index }
    trait Indexed[\E, I extends Index\] ...      (* every index parameter so bounded *)
    m: Array2[\RR64,0,3,0,4\]
    m[1, 2]                                      (* passes the pair (1, 2) at I = (ZZ32, ZZ32) *)

For `m[1, 2]` to check, `(ZZ32, ZZ32)` must be an `Index`. But the desugaring writes `trait Index end` as `trait Index extends Object end` (`Specification/basic/traits.tex`, "Trait Declarations": "every trait except `Any` and `Object` implicitly extends the trait `Object`"; `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:76`, `:123-126`, which rewrites even an explicit `extends Any`). Then `(ZZ32, ZZ32)` is an `Index`, and an `Index` is an `Object`, so the pair is an `Object`, and `f(x: Object)` would take `(1, 2)`.

**The probes' shadows did not meet it.** Both the checker's and walk's rule test "a tuple below `Index`" directly, and neither makes the pair an `Object` (`perf-probes/symbolic-operators-2/checker-tupleindex.patch`, `walk-tupleindex.patch`): the subtype relation they built is not transitive at `Index`. Nothing in the library or the suites showed it. The planner built option 1's checker half, the desugarer keeping `Index` as written, with the exclusion side of fork 7: no site moves in either stage, and walk's suites give what they gave without it (section 4, "Rung B's checker at its defaults"). So no measurement moves with the choice.

**The team's earlier and later word.** The proposed-features appendix wants "a type, say, `Index`" and "a magic to convert that tuple argument expression to something of type `Index`" (`Specification/appendices/future.tex:186-207`). The specification's own library declares the trait of all tuples outside `Object`: `trait Tuple extends Any excludes { Object }` (`Specification/basic-lib/objects.tex:180-186`), against its own implicit-`Object` rule; the batch-19 gather left that conflict to you as gather.2, with the coordinator's default to name `Tuple` beside `Any` and `Object` when a library first declares it ("Climb batch 19, listed for his review"). The team never wrote `Index`.

**The library's way.** No trait of the library is outside `Object` but `Any` itself (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32` declares `trait Object extends Any`).

**Options.**

1. **`Index` outside `Object`, as `Any` and `Object` are:** declared `trait Index extends Any`, kept as written by the desugaring and by walk, and the traits chapter's sentence naming it beside `Any` and `Object`. A tuple of indices is an `Index` and an `Any`, never an `Object`; `ZZ32` is both an `Index` and an `Object`. Cost: a third exception to a rule of the language, by name, as gather.2's default would make for `Tuple`; one more line in the desugarer and in walk.
2. **`Index` an `Object`, and a tuple of indices an `Object` too:** the relation transitive. Cost: it bends P-42 and the types chapter's exclusion sentence for every tuple of indices; `f(x: Object)` takes `(1, 2)`; a later `Tuple excludes Object` would contradict it.
3. **As the probes built it:** `Index` an `Object`, a tuple of indices an `Index` and not an `Object`. Cost: the subtype relation is not transitive at `Index`; the specification cannot state it as a subtype rule; nothing shows the gap until a program meets it.
4. **The rule as a bound rule only:** a tuple of indices satisfies a bound `I extends Index` at an instantiation and is no `Index` elsewhere. Cost: it reads P-156's "is itself an `Index`" anew, as a second relation beside subtyping.

**Default: option 1.** It keeps P-156 and P-42 both, follows the team's one statement of a trait above tuples (`Tuple extends Any excludes { Object }`), and can be undone with the rest of rung B. It is consequential because it adds an exception to the language's rule that every trait is an `Object`, and because gather.2, the same question for `Tuple`, is still yours.

### Question 2, consequential: whether `BoundedRange`'s narrowed `atMost` goes

**The question.** The bound `I extends Index` cannot be put on `BoundedRange[\I\]`: `Range`'s `truncL` and `truncR` return a `BoundedRange`, and `Range` stays unbounded so that the open range `(:)` stays a range of `Any` (P-56). But `BoundedRange` narrows `Range`'s `atMost(n: I): Range[\I\]` to `atMost(n: I): FullRange[\I\]` (`Library/FortressLibrary.fsi:2251`, `.fss:4099`), and a `FullRange[\I\]` now needs `I extends Index`. The probe dropped the narrowing (its section 3.1); you asked at 06:57 UTC whether it could be kept (the type-decisions evidence, `reviews/type-decisions-review/evidence.md:207`). Does it go?

**Primer.** A range that knows one end, such as `3:`, limited to a size, gives a range that knows both ends:

    r = (3:)                      (* a LeftRange: a BoundedRange that knows its left end *)
    r.atMost(2)                   (* [3,4]: today typed FullRange[\ZZ32\] through BoundedRange's narrowing *)

Dropped, the narrowing leaves `Range`'s `atMost(n: I): Range[\I\]`, so `r.atMost(2)` is typed a `Range[\ZZ32\]` where a caller holds only a `BoundedRange`; every concrete range keeps its own narrower `atMost` (`Library/RangeInternals.fsi:54-422`, `FullScalarRange` and the rest), and walk's values do not move. Kept, it needs a condition that only applies the narrowing where the index type is an `Index`: `atMost(n: I): FullRange[\I\] where { I extends Index }`, a method's condition on its trait's parameter, a `where` form that P-151 builds and the checker checks at a call (F-256).

**The team's earlier and later word.** The team's library declares the narrowing (`a874948ac`, the same lines); the team never wrote `Index`, and no text of theirs speaks to this method. P-151 builds method conditions because the team wrote them down.

**The library's way.** The library already writes method conditions where a member applies only at some instances: `distribute(r: MaxReduction[\T\]): ... where { T extends StandardMax[\T\] }` and its `MIN` twin (`Library/FortressLibrary.fss:3435-3437`).

**What it costs after the switch-over.** The code generator refuses a declaration whose own header carries a `where` clause (row 701). For a function or a method the guard is `forFnDecl`'s: it compiles a declaration only if `header.getWhereClause().isNone()`, and stops with 'Don't know how to compile this kind of FnDecl.' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2965-2976`). Every method of an object or a trait, abstract or not, passes through it: `dumpTraitDecls` (`:755-761`) visits each `FnDecl`, called from `forObjectDecl` (`:4053`) and from `forTraitDecl` (`:5136`, `:5159`). Today two methods of the twelve components carry such a clause: `SumReduction`'s two `distribute`s (`Library/FortressLibrary.fss:3435`, `:3437`). Kept, `BoundedRange`'s abstract `atMost` would be the third; each stops the compile of `FortressLibrary`, by reading, not run. So row 701's fix is needed at the switch-over either way; keeping `atMost` adds to it an abstract method of a trait, where the two `distribute`s are concrete methods of an object. The `where` of an `extends` entry, as `List`'s, compiles (row 701's notes).

**Measured** (section 4, "Question 2's three texts"), on run 1's text with the full check on:
- **Kept under the condition:** the checker accepts it. The full check's distance 5 and count 3, the stock distance 5 and count 3, the same five sites as with the drop, the export error's 43 entries the same; nothing come. The earlier probe's 2 bound errors on the line are gone.
- **Kept as written, without the condition:** those 2 errors come back, and nothing else moves: '#total 7', 'wellformed 2', at `FortressLibrary.fsi:2240` and `FortressLibrary.fss:4105` of run 1's text (the base's `:2251` and `:4099`), 'Ill-formed type: FullRange[\I\] The static argument I does not satisfy the corresponding bound Index.' So the condition is what clears them.
- **Dropped:** the distance 5 and count 3 with the full check on and off, the same five sites.
- **Walk, with the drop and with the condition:** both load, and the four interpreter tests that call `atMost` keep their verdicts: `RangeDeclarations`, `LibraryMeetDeclarations` and `RangePrototype` 'OK', and `TrivialOpenRangeAtMostStop` 'Saw expected refusal at load' (its `(:).atMost(3)` reaches `TrivialOpenRange`'s own failing `atMost`). Walk's suite of 668 tests has no red test that `atMost` explains, either way (section 4). No compiled test calls `atMost`.
- So the stages and the suites do not choose between options 1 and 2; the cost after the switch-over (above) does.

**Options.**

1. **Drop it**, as the probe did. Cost: a team declaration leaves the api and Part IV; a caller holding a `BoundedRange` gets a `Range` from `atMost`. Nothing in the suites, the demos or microGPT calls it on a `BoundedRange` (the uses are `RangeInternals`' own narrower `atMost`s and the tests of concrete ranges).
2. **Keep it with the method condition `where { I extends Index }`.** Cost: one more declaration behind row 701 after the switch-over, beside the two `distribute`s; a `BoundedRange` over a non-`Index` type, as `(:)`'s, has no narrowed `atMost`.
3. **Keep it unconditional and bound `FullRange` no more.** Cost: `FullRange` extends `Indexed[\I,I\]`, which needs the bound, so the subscript pair is invalid again at a `FullRange` over a non-`Index` type: it reads P-156 anew.

**Default: option 2**, since it keeps the team's declaration at no measured cost before the switch-over, in the library's own form for a member that applies at some instances only (the two `distribute`s), and its cost after the switch-over is row 701, which the two `distribute`s already need. It is consequential because it adds a declaration to row 701's work and decides what P-156 does to a team declaration that it did not name. Rung B builds option 1 instead if you answer so: the probe's patch already drops the line.

### Defaults already taken, on your review list

1. **`|_|` repaired by `String`'s api header**, which extends `DelegatedIndexed[\Char,ZZ32\]` as its component does, in place of api lines for `SubString` and `FlatString` (rung S). It also takes "different extends clauses" out of `String`'s export entry.
2. **The `AnyList` crash repaired in this batch** (rung C), with its row.
3. **`Float`'s `^(self, b:RR64)` given its meet**, `Float$Pow`, `SORT.md`'s own line (rung S).
4. **The export probe's question on `RR64`'s rounding** (`|\x/|`, `|/x\|` and `truncate` answer `ZZ64` in the api and `ZZ` or `RR64` in the component): no default taken; the three differences stay in the export error (rung E leaves them). Not consequential here: they move no site, since the error stays.
5. **The export probe's question on which of `Condition` and `Maybe` extends `ZeroIndexed`:** no default taken; the three differences stay, beside `Maybe`'s five that wait on P-90.
6. **Row 774 out; the `Equality` line and the `=/=` row in** (the coordinator's change of the brief, after the type-decisions judgement, its V3 and section 2, item 3). Walk's half of conditional extension waits until walk runs the checker (P-12) or row 364 is fixed; `XXXConditionalExtensionTypeTestWalk` stays an expected failure; `List extends Equality[\List[\E\]\]` lands in `List.fsi` and `List.fss` (the walk probe's way E), and the `=/=` defect is filed with its `XXX` test (rung N). The walk probe's other respellings (its A and Q) were for the fix and stay out.

### Forks the batch takes, none consequential

Each default can be undone, and none reverses a decision of yours.

1. **Two runs: run 1 S, B, V, N; run 2 C, E, D.** Default: so (section 1). A choice of how the work is cut, forced by the declarations two rungs would share and by C's need of S and B.
2. **S and V apart.** Default: V, P-157's six lines, a rung of its own, which the coordinator drops from run 1's manifest if you hold P-157 on probe A1's result (the type-decisions judgement, its V1 and section 2, item 2; `perf-probes/self-type-exclusion/REPORT.md`), with or without the checker rung of V's other branch in its place. Dropped with nothing in its place, C's distance in run 2 reads 13, the 8 vector sites known errors under P-155; with the checker rung, 5. S's seven fixes stay one rung: all library text only the full check reads, measured together.
3. **S's and V's test is the full-check stage, its before the planner's base table** (`compile-ladder/plan-21/probes/full-check-base.tsv`, the base's 191 sites). Default: so. The stock stages cannot see these sites; the table spares the rungs a run on their base.
4. **S: `String`'s four families with today's bodies (the probe's JC), as top-level operators beside juxtaposition's three.** Default: as the probe. It is item 59's answer, "at the probe's defaults", and the library's own device for the same shape (`Library/FortressLibrary.fss:4476-4478`).
5. **S: `XXXFunctionalMethodMeetOperator`, row 611's gated expected failure,** which walk refuses at load with S's text for another reason than its key says (the probe, section 2). The planner's run names the pair: the library's new top-level `opr ||(a:String, b:Any)` beside the test's `opr ||(self, b: ZZ32)` in its trait `T`, "first parameters a:[String,Any] and self:[T,ZZ32] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present" (section 4). By the Meet Rule the refusal is right: `T` and `String` can meet, and no declaration covers `(String & T, ZZ32)`; the same pair stood before, with `String`'s functional method, where walk's load check did not compare it. Default: the test's two traits exclude `String`, so the program keeps its subject, an object inheriting two symbolic operators with no meet, which walk's meet check still skips (row 611), and its key. A point to report: under walk, a program's own trait with a functional `||`, `|||`, `//` or `///` beside `String`'s now needs the exclusion, as the rules ask; no other test or demo has one (the planner's runs).
6. **B: the library's `Index` named by its qualified name** in the checker's and walk's rule (`WellKnownNames`), not by the bare text `Index` as the probes did. Default: so. A program's own trait `Index` is not read as the library's.
7. **B: the checker's exclusion side made consistent with its subtyping side.** The probe built subtyping only, so its checker said a tuple of `Index` types is an `Index` and also excludes it (`TypeAnalyzer.scala:560`). Default: in `pExcInner` beside the `pSubInner` rule, a tuple excludes `Index` only where one of its elements excludes `Index`, the dual of the subtype rule (an `or` over the elements where subtyping takes an `and`), so a tuple of `Index` types neither excludes `Index` nor is excluded by it, as walk's half already has it; the coordinator's change of the brief, after the type-decisions judgement (its section 2, item 1(a)). The planner measured it with question 1's default in the checker: no site moves in either stage (section 4, "Rung B's checker at its defaults"; `compile-ladder/plan-21/probes/checker-tupleindex-exclusion.patch`).
8. **B: only `ZZ32` extends `Index`.** Default: so, as the probe; the library indexes by `ZZ32` and its tuples alone. A program with an index type of its own declares it an `Index`; none in the suites does.
9. **B: the tuple rule recorded as the revival's departure.** Default, the coordinator's change of the brief after the judgement (its V2 and section 2, item 1(b)): Appendix I's entry states the rule as a departure from the designers' tuple-type text, quoting the Working Draft (`Specification-1.0-frozen/basic/types-vals-vars.tex:214-215`, `:265`, `:272-273`) and the 2012 Types chapter (`types.tick:341`, `:424`), quotes the team's "magic to convert", names S5 (a `where` constraint `I excludes Range[\I\]`) and W3 (range subscripts only at fixed-index types) as the ways kept open, and revises the two sentences of the revised text it contradicts (`Specification/basic/types-vals-vars.tex:232`, `:323-324`); it does not call the rule the team's own fix. The `Index` bound itself is recorded as finishing the team's wish.
10. **N: the `=/=` defect filed with its expected failure.** Under walk, the library's `=/=` and three-argument `assert` compare by identity two values whose own `=` is not a functional method of a `FortressLibrary` trait (the walk probe, section 7). Default: a row and an `XXX` test in rung N; the fix is not built.
11. **N: revision notes at the specification's two sentences that order every list** (`Specification/advanced-lib/algebraic-constraints.tex:519-522`, `Specification/basic/operators/opr-overview.tex:293-295`), PLAN's candidate, which P-154 bounds. Default: in rung N, naming walk's departure (row 774). Appendix I's sentence that the interpreter keeps every list's order (`Specification/appendices/changes.tex:242-248`) stays true.
12. **N: the slices and the list's equality in one small rung.** Default: so. Each is a few lines of walk-visible library, neither shares a declaration with another rung, and one worker and one skeptic cost less than two.
13. **C: the full check's reach.** The three loops read every symbolic operator; `isDeclaredName`, which the export check reads, is unchanged, so row 782 stays latent. Default: so, as the probe's shadow.
14. **C: the double count fixed in the checker.** In `checkOverloading`, an api's functions are added to an operator's set once for each name of that api with the operator's text, so an api with a prefix and an infix `-` adds its `-` twice, and the checker refuses each declaration as a duplicate of itself (section 4, the compiled path). Default: once per api, a new row.
15. **C: the prelude's `=`.** Under the full check the prelude's top-level `opr =(left:GeneratorZZ32, right:GeneratorZZ32)` (`Library/CompilerLibrary.fsi:129`), whose body answers `false` (`.fss:314`; row 481), has no meet with `RR64`'s, `Character`'s, `String`'s and `Equality`'s `=`. The prelude takes no new declaration (the `fortress-repo` skill's `compiler.md`, "The compiler's prelude"). Default: the planner's measured repair (section 4): `GeneratorZZ32` extends `Equality[\GeneratorZZ32\]` and excludes `Number`, `Character` and `String` too, and the always-false `=` goes, so a range's `=` is `Equality`'s identity; taking the `=` out alone leaves ranges with no `=`, and `RangeEqRungJLink` fails. The prelude is deleted at the switch-over.
16. **C: compiled tests the full check refuses.** The planner's run found one, row 726's expected failure, which the check now refuses as it should (section 4). Default: each such test judged by the overloading rules; one whose program is an invalid overloading is respelled to keep its subject or promoted, each a point to report; a refusal the rules do not support is a defect of the check, fixed or recorded.
17. **C: walk's meet check left as it is,** skipping symbolic operators (row 611's walk half). Default: so. P-155 names the compiled checker; P-45's list of where the paths still differ gains no new kind.
18. **C: row 726 closed by the check,** which now refuses its pair of `||` at two `self` positions before the code generator meets it. Default: closed with its expected failure promoted.
19. **E: the 4h text written on run 1's landed api,** with the 19 lines it brings and `Integral`'s new `=` written `abstract` too. Default: one rung, as the export probe advises (its section 8).
20. **E: the check brought to `apis.tex`'s rule (4i):** an api member written `abstract` needs no matching definition (`Specification/basic/components/apis.tex:252-257`), and the "missing members" count counts the api's other members only. Default: in rung E, the team's own text.
21. **The count stage's blind spot, the coordinator's between the runs, not rung E's.** Today the stage reads a library that does not parse as its parse-error count (`File FortressLibrary.fss has 4 errors.` as `#total 4`; the export probe's section 6, item 4, found the distance stage's twin). Default: the coordinator makes such a run write no table and exit 1, which the gate's `checker_compare` reads as `NO TOTAL`, red, with a test of the reading on a canned run output, on `main` before run 2's launch, as `c21177829` did for the distance stage. Not a rung's: a rung worker does not edit the tools (`climb-batch-workflow.md`, "Rung worker"), a tool change is made when no batch is being spliced or launched (PLAN, "Work that can start now, with no decision"), and the gate's step 8 runs this tool on the merged tree, so a rung's change of it would change the instrument inside the batch it measures.
22. **E: `Array2`'s column and row subscripts in the api,** which walk runs and the api lacks (A.skeptic.4 of climb batch 20). Default: so, the review's default.
23. **D: the demos probe's patch lands as P-79's rewrite,** with row 468's test first. Default: so.
24. **D: `ProjectFortress/demos/GenomeUtil2d.fsi` added,** the team's `GenomeUtil2c.fsi` under the name `BirdCount2d` imports; no commit ever added it. Default: so; a point to report.
25. **D: no new rows for the demo defects it repairs;** the existing rows it repairs close (791, 670, 449, 464, 468, 710), and the probe's nine drafts stay in its report. Default: so. The demos run in no suite, so a row opened and closed in one batch records nothing the report does not.
26. **D: `npbft.fss`'s `Complex` an `AdditiveGroup[\Complex\]` and no longer a `Number`,** whose closed `comprises` does not list it (`Library/FortressLibrary.fss:380-381`). Default: the probe's repair. The demo defines its own complex type, so it does not wait on the specified one.
27. **D: row 710's `trips.fss`,** whose `generator` extends `StandardTotalOrder[\trip\]` though it is no `trip`: it extends `StandardTotalOrder[\generator\]`, the order its own `CMP` defines (`ProjectFortress/demos/trips.fss:97-100`). Default: so, checked by the checker's driver over the demo as row 710's reproducer runs.
28. **No rung declares a checker count, a crash or a ladder move.** Default: none; the count and the distance reported.
29. **Speed passes.** B, C and E change the checker: each makes P-148's second pass. S, V, N and D do not.

### Points the batch lists for you, not questions

- **Team lines changed:** `String`'s four concatenation families, the api's six vector and matrix operators, `Float`'s `|self|` (S); the index parameters of the library's generic indexed types and `BoundedRange`'s `atMost` (B); `Vector`'s and `Matrix`'s headers, `HasRank`'s exclusion (V); `Array2`'s and `Array3`'s `subarray`, `Array3`'s `[:]` and `List`'s header (N); the prelude's `GeneratorZZ32` (C); 66 api lines of the 4h text and the 19 that follow (E); 22 team demos and `Generator22D`'s `rects` (D).
- **What walk does differently:** slices of arrays based above zero read the right elements (N); `String`'s concatenation reaches top-level operators, so a program's own trait with a functional `||` beside `String`'s needs to exclude `String` (S, fork 5; no other value moves by the probe); `SUM` and `zero` no longer take vectors (V); the demos run (D). Every list keeps its order under walk (row 774 held).
- **What the checker does differently:** it checks every symbolic operator (C); a tuple of indices is an `Index` (B); the export check compares names and fields and reads `abstract` (E); and, if the checker rung of V's other branch runs in V's place, its exclusion test reads a self-typed trait's `self` as the implementing type too and the static parameters' bounds.
- **What the specification says differently:** the tuple rule and `Index`, as the revival's departure (B); a list's order, with walk's departure (N); Part IV, the api rendered, in S's, B's, V's and E's lines.
- **Where a rung holds a line:** none, by plan; any walk test, compiled test, specification example, ladder file or demo whose verdict changes beyond the record's promotions and respellings is a point to report.

## 3. The rungs

Line numbers of run 1's rungs are on aa5ff2423, whose Library/, ProjectFortress/ and Specification/ are those of 510fac459. Run 2's sections, C, E and D, are written against the same tree, and are re-read against run 1's landed tree before run 2 launches (section 5, "The two runs"). Each rung's tests come first: written, run through the harness on the base and seen failing, or for a guard seen passing, and committed before the edit. A value that matters is asserted inside the test (P-103).

### S. The symbolic operators' library fixes (P-155; rows 585, 611, 784)

**The answers this rung follows.** P-155: the compiled checker checks the overloads of symbolic operators before the switch-over, by the rules it applies to any function, so that the distance reaches zero with them checked. PLAN item 59, answered: String's four families, |_|, EmptyString, ^ and the AnyList crash go with the known fixes, at the probe's defaults. P-27: the library's own way. F-245: the full check adds 186 errors on this base's code, 54 of them cleared by the known fixes. The probe is explorations/perf-probes/symbolic-operators-2/REPORT.md: its shadow in section 1.1, the families in 1.2, the known fixes in section 2 with known-fixes.patch and known-fixes.py. This record's section 2, the review list's items 1 and 3 and forks 2 to 5, give the defaults you build; the planner measured your text with the run's other rungs' (section 4): the full check 191 to 5 for the run together, nothing come.

**What you build.**
- The library, by the probe's two generators on your tree, which apply each edit by exact text and stop before writing anything if one does not match: python3 -I explorations/perf-probes/symbolic-operators-2/known-fixes.py <your tree> empty str4 eq abshead maybeidx vecops floatpow. Take the text, or improve it and say why. Its edits:
  - empty (row 611's library half): EmptyString's meet opr ||(self, _:EmptyString): String = self after Library/String.fss:317, and String's api states Concatenable's and EmptyString's three || (Library/String.fsi:16-28).
  - str4 (row 585): String's four concatenation families, ||, |||, // and ///, leave String's trait, where each pairs (a:Any, self) with (self, b:Any) (Library/FortressLibrary.fsi:2496-2522, fss:4398-4443), and become three top-level operators each, at (a:Any, b:String), (a:String, b:String) and (a:String, b:Any), with today's bodies, as juxtaposition's three already are (fsi:2532-2534, fss:4476-4478); the || of two strings dispatches on its first argument by typecase, as the generator writes it.
  - eq (row 784): Integral's opr =(self,b:I):Boolean, without a body, in api and component, after opr DOTMINUS(self):I (fsi:451, fss:701), the meet of Number's = and StandardPartialOrder's; and ZZ's api states the opr =(self, b:ZZ) its component declares.
  - abshead (|_|, row 784; the review list's item 1): String's api header extends DelegatedIndexed[\Char,ZZ32\] as its component does (fsi:2438 against fss:4326); Maybe's meet opr |self| : ZZ32 in api and component; Float's opr |self| answers RR64 where it writes Number (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:79).
  - maybeidx: Maybe's subscript meet opr [i:ZZ32]:T throws NotFound, in api and component.
  - vecops (row 784): the api's six top-level Vector and Matrix + and - (fsi:1654-1661, :1764-1771), which the component never defines, leave the api.
  - floatpow (the review list's item 3): Float's meet opr ^(self, b:RR64):RR64, the native Float$Pow, after FortressBuiltin.fss:156.
- The expected failure that moves, fork 5: ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss, row 611's gated test, keyed load_exception_contains=Invalid overloading of ||, is refused at load with your text for another reason, so the harness reports it red. The planner's run names the pair: the new top-level opr ||(a:String, b:Any) beside the test's opr ||(self, b: ZZ32) in its trait T, first parameters a:[String,Any] and self:[T,ZZ32] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present (the record's section 4). By the Meet Rule the refusal is right: T and String can meet and nothing covers the meet. The default: the test's traits S and T exclude String, so that it keeps its subject, an object that inherits two overlapping symbolic operators with no meet, which walk's meet check still skips, and keeps its key; run it through the harness on your tree, where it loads and runs, its expected failure. A point to report, with the rule: under walk a program's own trait with a functional ||, |||, // or /// beside String's now needs the exclusion.
- Not yours: the check itself (rung C, in the batch's second run); the subscripts' index bound (rung B); the vectors (rung V); walk's meet check, which skips symbolic operators (row 611's walk half); the export check's reading of symbolic names (row 782); String's other export entries; FlatString's api.

**Rows.**
- Row 585: the gather closes it with your full-check site list (String's 40 gone) and your walk guard.
- Row 784: the gather closes it with the full-check site list (its 11 gone).
- Row 611: a note: its library half, EmptyString's ||, is fixed; walk's meet check still skips symbolic operators; and what became of its test (fork 5).
- Row 584: a note: under the full check the library's 62 symbolic-operator errors outside the subscripts are gone.

**Distance sites.** Your test for the library's sites is the full-check distance stage: the probe's explorations/perf-probes/symbolic-operators-2/run-shadow.sh <out-file> <scratch> catch, the gate's distance stage with the overloading checker's three loops reading every symbolic operator, in a shadow compiled beside the build, where a crash on one name prints a line and the check goes on. Its before is the planner's table on this base, explorations/compile-ladder/plan-21/probes/full-check-base.tsv: 191 errors, three of them the AnyList crash's lines. Its after runs once, on your final tree; compare the two with python3 -I explorations/perf-probes/array-sites/compare-sites.py. By the probe, 191 to 137: the known fixes' 54 gone, nothing come. The stock stages: run the count stage and the distance stage once each on your final tree; by the planner's measurement of the run's text the distance stays 5 and the count 3, String's export entry losing "different extends clauses". Any site that comes in either is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass. Where your brief's role text says the checker count and the distance are this rung's test, with the landed tables as their before, this section holds: the full-check stage is the test, and the stock stages run once each.

**Files.**
- Library/FortressLibrary.fsi and .fss: Integral's =, ZZ's api =, Maybe's |self| and subscript, String's trait and its api header, the top-level concatenation operators beside juxtaposition's, the api's six vector and matrix operators, only.
- Library/String.fsi and Library/String.fss: Concatenable and EmptyString only.
- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: Float's |self| and ^ only.
- ProjectFortress/tests/: your guards; XXXFunctionalMethodMeetOperator.fss and its .test as fork 5 says.
- Not: the checker; walk's Java; the index parameters, ZZ32 and the ranges (rung B); HasRank, Vector and Matrix (rung V); List (rung N).

**Tests, first.**
- A walk guard of the concatenation families, named by its topic, such as StringConcatenationFamiliesWalk: each of ||, |||, // and /// with a String on either side and on both, and a number, a Char, (), a pair and a triple on the other side; EmptyString on each side of ||; the values asserted. It passes on the base and after: the probe found no walk value moved.
- The full-check stage, as above.
- Keep their verdicts: the walk suite but fork 5's test, ant testSpecData's 130, and the compiler, library and other-compiler tracks.
- After the change: ant testSystem once and ant testSpecData once (P-124), since the library changes; your change's ladder subset as the skill's gate.md, "The ladder regression", gives it, with the eighteen microGPT components' phase step, since a Library api changes.

**Specification.** Part IV renders the api (Specification/library/default-libraries.tex:27-37): String's four families move from String's members to top-level operators there, the six vector and matrix operators leave it, and Integral, ZZ, Maybe and String's header gain their lines. List each as a point to report; they need no edit. Grep Specification/ outside library/apis/ for a sentence that makes String's concatenation operators its methods, and list every sentence made false as revival-change material: F-245's count of the 54, rows 585 and 784's claims, among them.

**Overlaps by file.** Rungs B and V edit Library/FortressLibrary.fsi and .fss too, B in the index-typed traits, ZZ32's header, the ranges and the scalar block's index parameters, V in HasRank, Vector's and Matrix's headers, and no declaration of yours. The gather applies you first, since your lowest edited lines in both files (fsi:451, fss:701) come before B's (fsi:533, fss:729) and V's (fsi:1207, fss:1909). Rung N edits the component's Array2 and Array3 bodies and List.fsi and List.fss. The planner applied the run's library text together, the generators in the order S, B, V and N's lines after, with no conflict (section 4). You meet in walk's suite and both stages.

### B. The index bound with the tuple rule (P-156; row 783)

**The answers this rung follows.** P-156: every index parameter of the library's generic indexed types is bounded I extends Index; ZZ32 extends Index, and Range excludes it, so a subscript that takes one index and a subscript that takes a range never apply to the same value and the pair is a valid overloading at every instance; a tuple type whose elements are all Index types is itself an Index, on both paths and in the specification, a typing rule that changes no value, so m[i, j] passes its tuple (i, j) as before; it is the team's own fix for this pair (Specification/appendices/future.tex:186-207), its magic read as subtyping. The Fable judgement of the curator's type decisions (explorations/reviews/type-decisions-review/judgement.md, V2 and section 2, item 1) keeps the decision and reads it so: the Index bound finishes the team's wish; the tuple rule makes a tuple type a subtype of a trait type, which the designers' tuple-type text forbids (Specification-1.0-frozen/basic/types-vals-vars.tex:214-215, :265, :272-273; the 2012 Types chapter, types.tick:341, :424), so it is recorded as the revival's departure, and the team asked for a conversion, not a subtype. P-42: an unbounded type parameter is bounded by Any, which holds tuples, functions and (), which Object does not. P-56: the open range (:) stays an OpenRange[\Any\], so Range stays unbounded. P-155. F-245. This record's questions 1 and 2, answered or at their defaults: where Index stands, so that a tuple of indices is an Index and never an Object; and whether BoundedRange's narrowed atMost goes. The probe is explorations/perf-probes/symbolic-operators-2/REPORT.md, section 3.1, with subscripts-index-bound.patch (designs.py subS1), checker-tupleindex.patch and walk-tupleindex.patch: with both paths' rule the full check loses its 124 subscript errors and gains none, and walk's suites, the specification's examples, 30 demos and microGPT's quick pair are unchanged; without the checker's rule the bound brings 73 errors at the tuple indices, and without walk's, walk stops microGPT at MicroGptFlat.fss:60. This record's section 2, questions 1 and 2 and forks 6 to 9, give the defaults you build.

**What you build.**
- The tests first. (1) A walk test of the rule, named by its topic, such as TupleIndexBoundWalk: a function and a trait of its own with a parameter bounded I extends Index, used at ZZ32 and at the pairs and triples of ZZ32; a Matrix with a number added on either side and with MAX, the probe's failures without walk's rule (ArrayScalarExtension, ArrayOperatorsBesideLibrary: Failed to find any matching overload, args = (__DefaultMatrix[\RR64,2,2\],1.0)); an Array2 read and written at a[i, j]; and a type test that a pair of ZZ32 is an Index and, by question 1's default, no Object. On the base it fails at load, since no Index is declared. (2) A compiled test, where the compiler's own library can state it, of the checker's rule; if it cannot, since the prelude declares no Index and takes no new declaration (the skill's compiler.md, "The compiler's prelude"), say so: the stages are then the checker's test. (3) The stages, below.
- The library: subscripts-index-bound.patch, which applies to this base (git apply --check): trait Index; ZZ32 extends it (fsi:533, fss:729); Range excludes it (fsi:2183, fss:3994); I extends Index on Indexed, DelegatedIndexed, MutableIndexed, ReadableArray, ImmutableArray, Array, both Standard...ArrayType traits, FullRange, CompactFullRange, StridedFullRange, opr : over a FullRange, SimpleMappedSeqIndexed and the eight scalar operators over Array[\T,I\] (fsi:2702-2711, fss:4906-4915), and the component's SimpleMappedIndexed, SimpleIndexValuePairs, ReversedIndexed and SimpleReversedIndexed; and BoundedRange's narrowed atMost(n:I): FullRange[\I\] (fsi:2251, fss:4099) as question 2's answer gives it: by its default kept under the method condition where { I extends Index }, which the patch drops. Index's own declaration as question 1's answer gives it.
- The checker, ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala: in pSubInner, a tuple type whose elements are each a subtype of Index is a subtype of Index (the probe's case, beside the tuple cases at :326-328); and in pExcInner, a tuple excludes Index only where one of its elements excludes Index, the dual of the subtype rule, so that a tuple of Index types neither excludes Index nor is excluded by it (the tuple cases at :553-561, where a tuple excludes every trait type today, fork 7; the planner's case is in explorations/compile-ladder/plan-21/probes/checker-tupleindex-exclusion.patch, measured with no site moved): the probe's patch left the two sides contradicting each other. Name the library's Index by its qualified name, as the checker names the library's other traits (ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java), not by the bare text the probe matched (fork 6).
- Walk, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeTuple.java: subtypeOf, meet and excludesOther as walk-tupleindex.patch has them, by the same qualified name.
- Question 1: by its default, Index extends Any and stays so: the desugarer's forTraitDecl names it beside Any and Object (ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:123-126, whose rewriteExtendsClause makes a trait that names only Any extend Object, :76), by the library's qualified name; both paths run this desugarer (ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java, interpreterPhaseOrder and compilerPhaseOrder), and the planner's run of the line found walk taking a pair as an Index and no Object with no other walk edit (section 4); if walk makes a trait an Object anywhere else, keep Index out there too. The traits chapter's sentence names it (below). If the curator answers otherwise, build his answer.
- You change the checker: do what the skill's compiler.md, "The checker's time", says: time the count stage on the base build before your edit and on your tree once the change is correct, then make the second pass (P-148).
- Not yours: Range's own bound (P-56); the other integer types as indices (fork 8); the known fixes (rung S); the vectors (rung V); the full check (rung C); RangeInternals, which needs no edit with the rule (the probe's subS1m).

**Rows.**
- Row 783: the gather closes it with your walk test and your full-check site list (the 124 gone).
- Row 584: a note: under the full check the 124 subscript errors are gone by the bound and the tuple rule.

**Distance sites.** Your stock stages: run the count stage and the distance stage once each on your final tree; the distance stays 5 and the count 3 by the planner's measurement of the run's text with both paths' rule built, and again with the exclusion side, question 1's desugarer line and question 2's default added (section 4, "Rung B's checker at its defaults"); without the checker's rule the distance would gain 73 bound errors at the tuple indices, so every one that comes is a point to report. Your full-check stage: the probe's run-shadow.sh <out-file> <scratch> catch, once on your final tree, its before the planner's base table, explorations/compile-ladder/plan-21/probes/full-check-base.tsv (191); by the probe 191 to 67, the 124 subscript errors gone, nothing come; compare with explorations/perf-probes/array-sites/compare-sites.py. You change the checker: report the count stage's seconds before your edit, after it and after your speed pass.

**Files.**
- Library/FortressLibrary.fsi and .fss: the patch's declarations and Index, only.
- ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala (pSubInner's and pExcInner's tuple cases), ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java (a name), ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeTuple.java; for question 1, the desugarer named above, and walk's code only if it makes a trait an Object elsewhere.
- Specification/basic/types-vals-vars.tex, Specification/basic/traits.tex, Specification/appendices/future.tex, Specification/appendices/changes.tex (below).
- ProjectFortress/tests/ and a compiled test folder: your tests.
- Not: the known fixes, the vectors, String or List; the overloading checker.

**Tests, first.**
- Your walk test (1): on the base, refused at load, since no Index is declared; after, it passes.
- Your compiled test (2), if the prelude can state it.
- The stages, as above.
- Keep their verdicts: the walk suite (the probe: 668 tests, 0 failures with both rules), ArrayScalarExtension and ArrayOperatorsBesideLibrary, the 40 array tests of climb batch 20's probe, ant testSpecData's 130, and the compiler, library and other-compiler tracks.
- After the change: ant testQuick once for the checker and ant testSystem once for walk (the skill's tests-running.md), ant testSpecData once (P-124); your change's ladder subset with the eighteen microGPT components' phase step, since a Library api changes.

**Specification.** In the S1 form. Specification/basic/types-vals-vars.tex, "Tuple Types": state the rule, that a tuple type whose element types are all subtypes of Index is a subtype of Index, and correct the exclusion sentences, as the Appendix I entry below says. Specification/basic/traits.tex, "Trait Declarations": by question 1's default, the sentence "every trait except Any and Object implicitly extends the trait Object" (:186-188) names Index beside them. Specification/appendices/future.tex, "Traits and Objects": the array-indexing item (:186-207) gains a revision box of the form of the revival-meet box at :307, Done, naming the bound and the rule. Specification/appendices/changes.tex: a new entry for the index bound and the tuple rule, fork 9: the bound as finishing the team's wish, the tuple rule as the revival's departure from the designers' tuple-type text, quoting the Working Draft (Specification-1.0-frozen/basic/types-vals-vars.tex:214-215, :265, :272-273) and the 2012 Types chapter (types.tick:341, :424), with the team's "magic to convert" quoted and S5 and W3 named as the ways kept open (the probe's section 3.1); not called the team's own fix; with its effect (the bound, the rule, Index's place, atMost as question 2's answer gives it). Revise both sentences of the revised text that the rule contradicts: Specification/basic/types-vals-vars.tex:232, "Every trait type also excludes every arrow type and every tuple type", and :323-324, "A tuple type excludes any non-tuple type other than Any.". Part IV renders the new trait and the bounds: list them. List every sentence made false as revival-change material: F-245's 124, row 783's claim, the skill's sentences on tuples and Object among them.

**Overlaps by file.** Rungs S and V edit Library/FortressLibrary.fsi and .fss too, S in Integral, ZZ, Maybe, String and the api's vector operators, V in HasRank, Vector and Matrix, and no declaration of yours; the gather applies S first, then you (fsi:533, fss:729), then V. Rung N edits the component's Array2 and Array3 bodies, which you do not touch. The batch's second run's rung C may edit TypeAnalyzer.scala after you have landed, since the crash it repairs runs through pExcInner; nobody else in this run edits the checker. You meet in walk's suite and both stages.

### V. Vectors that are not additive groups (P-157)

**The answers this rung follows.** P-157: Vector and Matrix are not additive groups for now, so the arrays' scalar + and - stand beside the vectors' own; they keep their own +, - and unary -, but no longer extend AdditiveGroup, and arrays exclude every additive group, as Array3 already does; so generic code over AdditiveGroup, such as SUM over vectors or zero, no longer takes them; vectors may become additive groups again once the checker reads self as the implementing type in the overload check. P-88: the scalar block that microGPT uses stays. P-146: the overload check reads a self-typed trait's self in a signature as the plain trait type. F-245: the full check's 8 vector errors. The probe is explorations/perf-probes/symbolic-operators-2/REPORT.md, section 3.2, with vector-not-additive-group.patch (designs.py vecA2): the 8 gone, none new; walk's suites, the specification's examples, 30 demos and microGPT's quick pair unchanged. This rung stands apart so that the batch can drop it: the Fable judgement of the curator's type decisions (explorations/reviews/type-decisions-review/judgement.md, V1 and section 2, item 2) says P-157 should wait for a checker probe, A1, and the curator decides on its result before the launch. A1 has run (explorations/perf-probes/self-type-exclusion/REPORT.md; this record's section 4, "Probe A1"): the overloading check's exclusion test reading a self-typed trait's self as C[\X\] & X, and its existential reduction reading the static parameters' bounds, clear together the same 8 sites with no library line, the full check 191 to 183, and move nothing else. If this rung runs, his decision stands as P-157 reads, and that checker change stays the road back that P-157 names.

**What you build.**
- The library, by the probe's generator on your tree: python3 -I explorations/perf-probes/symbolic-operators-2/designs.py <your tree> vecA2, or vector-not-additive-group.patch: Vector (Library/FortressLibrary.fsi:1616-1617, fss:2524-2525) and Matrix (fsi:1736-1737, fss:2845-2846) no longer extend AdditiveGroup, and HasRank excludes AnyAdditiveGroup too (fsi:1207, fss:1909), as Array3 does (fsi:1812-1817).
- A walk guard of what P-157 keeps: at RR64, a Vector's and a Matrix's own +, - and unary -, and the scalar block's + and - with a number on either side, the values asserted; it passes on the base and after.
- Not yours: the known fixes (rung S), among them the api's six top-level vector and matrix operators; the checker; the vectors' bound.

**Rows.** Row 584: a note: under the full check the 8 vector errors are gone by P-157.

**Distance sites.** Your test for the library's sites is the full-check distance stage, as rung S's: explorations/perf-probes/symbolic-operators-2/run-shadow.sh <out-file> <scratch> catch, once on your final tree, its before the planner's table explorations/compile-ladder/plan-21/probes/full-check-base.tsv (191); by the probe 191 to 183, the 8 gone, nothing come; compare with explorations/perf-probes/array-sites/compare-sites.py. The stock stages: run the count stage and the distance stage once each on your final tree; by the planner's measurement of the run's text both stay as they are, 5 and 3. You change no checker code: report the count stage's seconds, and make no speed pass. Where your brief's role text says the checker count and the distance are this rung's test, with the landed tables as their before, this section holds: the full-check stage is the test, and the stock stages run once each.

**Files.** Library/FortressLibrary.fsi and .fss: HasRank, Vector's and Matrix's headers, only. ProjectFortress/tests/: your guard.

**Tests, first.**
- Your guard, passing on the base and after; the full-check stage, as above.
- Keep their verdicts: the 40 array tests of climb batch 20's probe, ArrayScalarExtension, ArrayOperatorsBesideLibrary, InferCoercionRungK and ArrayElementAlgebra (the tests the probe's other way moved), and the compiler, library and other-compiler tracks.
- After the change: ant testSystem once and ant testSpecData once (P-124), since the library changes.

**Specification.** Part IV renders the api: Vector and Matrix lose AdditiveGroup from their headers, and HasRank's exclusion grows; list them. Grep Specification/ outside library/apis/ for a sentence that makes a vector or matrix an additive group, or that sums vectors with SUM, and list every sentence made false as revival-change material.

**Overlaps by file.** Rungs S and B edit Library/FortressLibrary.fsi and .fss too, in other declarations; the gather applies S, then B, then you (fsi:1207, fss:1909). Rung N edits the component's Array2 and Array3 bodies, which you do not touch. You meet in walk's suite and both stages.

**The other branch, if the curator withdraws P-157 on A1's result: a checker rung in this rung's place in run 1, not this rung's work.** It builds A1's two shadows into the tracked checker, in the exclusion test only, as the probe measured them (its self-exclusion.patch and bound-exclusion.patch, on aa5ff2423): (i) OverloadingChecker.scala's toFunctionArrows (:124-135) and toFunctionalMethodArrows (:170-185) keep, beside the plain arrow of a functional method whose self type was read from the F-bound, an arrow made from the declaration's own parameters, and validOverloadingInner's exclusion test (:585) reads that arrow; (ii) TypeSchemaAnalyzer.scala gains, after emptyED (:444), the meet of two domains read with each top-level static parameter as its bounds, and OverloadingOracle.excludes (:322-327) takes it as a third way to be valid. Specificity, the Meet Rule's meet, the coverage rule, the duplicate check and the Return Type Rule keep the plain arrows: P-146's sentence on signatures read anew for the exclusion test only (the judgement's section 4, change 1). Where it goes: run 1, since it shares no file with S, B or N (B edits TypeAnalyzer.scala's tuple cases, through which this exclusion test runs, and no declaration of it), and C then reads 5 in run 2, not 13; in run 2 it would share OverloadingChecker.scala with C, whose three loops and import-star loops are other declarations but whose AnyList crash runs through the same exclusion test. Its tests first, compiled tests in ProjectFortress/compiler_tests/ from A1's section 5 with a word operator: VecPairs and VecPairsLeft, refused on the base and accepted after; VecLib, the library's shape, 4 errors to 0; and as guards NegLeft, NegRight, NegShared and row 786's tint, refused before and after. Its test for the 8 sites is the full-check stage, as S's and this rung's: the probe's run-shadow.sh catch on its final tree, whose shadow edits the three loops and the catch wrappers that (i) does not touch, before the planner's base table (191), after 183 by A1, compared with compare-sites.py; the stock stages once each, 5 and 3; and, since it changes the checker, the count stage timed before and after and the second pass that the skill's compiler.md, "The checker's time", asks for (A1: no stall, 230 to 279 s against 253 and 272 s under the full check alone). Not its: the global variant (A1's question 2, default the exclusion test only); tint's acceptance (A1's question 3, default the refusal stays, row 786 CONTESTED); A1's drafted row on the solver's recursion, the coordinator's to file (A1's question 4). Rows 584 and 786: notes. Specification: Appendix I's self-type entry gains the exclusion test's reading; P-157's withdrawal is the coordinator's record edit, not the rung's. Cost: about 0.6M for the worker with its speed pass and 0.55M for its skeptic, as rung B's. Before the launch its section goes into section 3 and its manifest entry into section 5 under a new letter, in V's place, and lists21.py (RUNS['1'] and its briefing), check21.js (RUN_IDS and CHECKER_RUNGS) and run 1's intro are changed to match.

### N. Two library repairs under walk: array slices based above zero (rows 793, 794), and a list's equality through Equality

**The answers this rung follows.** Rows 793 and 794: under walk a column, a row or a range subscript of an Array2, and a range subscript or a[:] of an Array3, based above zero read the wrong elements or raise, since each subarray hands its SubArray, whose offsets are 0-based, the offset in the array's own index space, and Array3's opr[_:TrivialOpenRange] passes (0,0,0); both the team's. Array1.subarray subtracts the base (Library/FortressLibrary.fss:2456-2459): the library's own way (P-27). Walk only: the compiled path's library has no Array2. P-154: a list is ordered only where its element type is totally ordered, though its = stays. The Fable judgement of the curator's type decisions (explorations/reviews/type-decisions-review/judgement.md, V3 and section 2, item 3): walk's half of conditional extension (row 774) waits until walk runs the checker (P-12) or row 364 is fixed; lands now instead List extends Equality[\List[\E\]\], the walk probe's way E, with the =/= defect filed and its expected failure; XXXConditionalExtensionTypeTestWalk stays an expected failure. The walk probe, explorations/perf-probes/walk-conditional-extension/REPORT.md, mechanism B in section 3.1, way E in 3.2, the defect in section 7. This record's section 2, the review list's item 6 and forks 10 to 12, give the defaults you build.

**What you build.**
- The slices. The tests first: ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss and XXXArray3SliceAtNonzeroBase.fss, the rows' gated expected failures, pass with the fix: promote both. The fix, Library/FortressLibrary.fss: Array2.subarray hands SubArray2 (o0-b0, o1-b1) (:2733); Array3.subarray hands SubArray3 (o0-b0, o1-b1, o2-b2) (:3135); Array3's opr[_:TrivialOpenRange] passes (b0,b1,b2) (:3113), as Array2's passes (b0,b1) (:2687).
- The list's equality. The test first: the =/= defect's expected failure (fork 10), an XXX test asserting NOT (P(1) =/= P(1)) and assert(P(1), P(1), message) for an object P(x: ZZ32) with its own opr =(self, other: P), as the walk probe's section 7 gives it; it fails as expected on the base and after. Then List extends Equality[\List[\E\]\] outside its conditional entry, in Library/List.fsi:67 and Library/List.fss:106, as Map, IntMap and PrefixMap extend Equality (Library/Map.fsi:24-25, Library/IntMap.fsi:21, Library/PrefixMap.fsi:36); a walk guard of a list's = and =/= element by element, through the library's assert, at ZZ32, RR64 and a pair type, passing on the base and after.
- Not yours: walk's half of conditional extension (row 774), the walk probe's patch and its other respellings; PureList's api (row 355); the immutable arrays of ranks 2 and 3; every other array body.

**Rows.**
- Rows 793 and 794: the gather closes each with its promoted test.
- A new row, NEW-N-1, the =/= defect, from the walk probe's draft (its section 7), with your XXX test as its reproducer.
- Row 774: a note: List extends Equality[\List[\E\]\], so a list's = stays element by element once walk reads the condition; walk's half waits for P-12 or row 364.

**Distance sites.** Library/FortressLibrary.fss and List.fsi and List.fss are among the twelve components the stages read: run the count stage and the distance stage once each on your final tree; both stay as they are, 5 and 3, by the planner's measurement of the run's text, and the full check gains nothing from the Equality line (section 4). You change no checker code: report the count stage's seconds, and make no speed pass.

**Files.**
- Library/FortressLibrary.fss: Array2.subarray, Array3.subarray and Array3's opr[_:TrivialOpenRange], only.
- Library/List.fsi and Library/List.fss: List's header, one line each.
- ProjectFortress/tests/: the two promotions; your XXX test and guard.
- Specification/basic/operators/opr-overview.tex and Specification/advanced-lib/algebraic-constraints.tex (below).
- Not: walk's Java; QuickCheck; PureList.

**Tests, first.**
- The two promotions: on the base each fails as expected, (a[:,1])[0] reading a[2,2] and a[:] raising; after, each passes under its plain name.
- The =/= expected failure and the equality guard, as above.
- Keep their verdicts: the 40 array tests of climb batch 20's probe, VectorMatrixCastsWalk and Array2SubscriptInBounds among them; XXXConditionalExtensionTypeTestWalk failing as expected; the list tests the walk probe names (its section 3.1).
- After the change: ant testSystem once and ant testSpecData once (P-124), since the library changes.

**Specification.** In the S1 form, fork 11: Specification/advanced-lib/algebraic-constraints.tex:519-522 and Specification/basic/operators/opr-overview.tex:293-295, which order lists, gain revision notes: a list is ordered only where its element type is totally ordered (P-154), and the interpreter still orders every list (row 774). Appendix I's sentence that the interpreter keeps every list's order (Specification/appendices/changes.tex:242-248) stays true. No sentence names the array bodies: grep Specification/ for subarray outside library/apis/. List every sentence made false as revival-change material.

**Overlaps by file.** Rungs S, B and V edit Library/FortressLibrary.fss too, in other declarations; the gather applies S, B, V, then you, by your lowest line (fss:2733). No other rung edits List. You meet in walk's suite and both stages.

### C. The full check of symbolic operators (P-155; row 584), with the AnyList crash and the prelude

**The answers this rung follows.** P-155: the compiled checker checks the overloads of symbolic operators before the switch-over; today its overloading check reads an operator only if its name is a word of capitals, such as MAX, so +, ^, ||, the subscripts and the other symbolic operators pass unchecked; the check must read them by the rules that it applies to any function, so that the distance to the switch-over reaches zero with them checked; a zero with them unchecked would hide known errors. P-148: a rung that changes the checker also makes the change fast. P-151: AnyList comprises List[\E\] where [\E\] is live. F-245: the full check adds 186 errors on the base of the batch's first run, three of them crashes on AnyList's ||; the batch's first run (rungs S, B and V) cleared the other 183, or 175 if V was dropped, its 8 vector sites then known errors under P-155. F-251: a comprises clause's where-variable is opened at a call. The probe is explorations/perf-probes/symbolic-operators-2/REPORT.md: the shadow in section 1.1 with checker-full-check.patch, the crash in section 1.3. The planner's probe found two faults that the full check meets on the compiled path itself (this record's section 4, "The compiled path under the full check"). This record's section 2, the brief's default 3 and forks 13 to 18, give the defaults you build.

**What you build.**
- The tests first, compiled tests in ProjectFortress/compiler_tests/. (1) Row 584's reproducer: opr +(x:A, y:A) beside opr +(x:B, y:B) over two unrelated traits, refused with compile_err_contains naming Invalid overloading of +; on the base it compiles. (2) The crash, the probe's section 1.3: trait AnyC comprises { C[\E\] } where [\E extends Object\] with cat(self, f: AnyC): AnyC, and trait C[\E\] extends AnyC defining it; on the base the compile stops, E is not in the kind env; after, it compiles. (3) The double count, fork 14: a component that imports an api of its own declaring a prefix and an infix opr -, and declares its own top-level opr -; with the check reading symbolic names and without your fix it is refused as duplicates of itself; it passes on the base and after, a guard. (4) Row 726's pair, fork 18: opr ||(self, y: S) beside opr ||(x: S, self) in one trait, refused as duplicates where the code generator stops today; its expected failure, ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositionsOperator, is the test to promote.
- The check: the three loops of OverloadingChecker.checkOverloading and its trait check (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:255, :402, :411) read every symbolic operator, as the probe's checker-full-check.patch has them without its catch wrappers; isDeclaredName itself, which the export check reads (ExportChecker.scala:275), stays as it is (fork 13).
- The double count, fork 14: in checkOverloading's two import-star loops (OverloadingChecker.scala:273-284 and :307-318) an api's functions are added to the operator's set once for each name of that api whose text is the operator's, so an api with a prefix and an infix - adds its set twice, and the duplicate check (:458-467) refuses each declaration as a duplicate of itself; the planner's probe added them once per api and the prelude's seven duplicate errors went. A new row, NEW-C-2.
- The crash, NEW-C-1, the probe's draft row (its section 5), sibling of rows 775 and 789. The planner traced it on the probe's program (the record's section 4, "The compiled path under the full check"): E is not in the kind env [E$1 -> KindBinding(E$1,E$1 extends Object)], from pExcInner's checkCC (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:525-527) through checkP (:542-551) to pEqv and staticParam (:1039), under OverloadingOracle.equiv from OverloadingChecker.toFunctionArrows (:157-159). The kind environment holds the variable E$1 that comprisesClause opens (openWhereSizes, :908-924); the type compared with it holds the plain E, by reading from the functional method's self type, whose comprised list removeSelf (:566-577) does not open. Find where it belongs, fix it there, and try row 775's program on your fix.
- The prelude, fork 15: under the full check the prelude's apis give 17 errors on the base, which stop the library order and so every compiled test: the seven duplicate sets of -, and CompilerLibrary's top-level opr =(left:GeneratorZZ32, right:GeneratorZZ32) (Library/CompilerLibrary.fsi:129, .fss:314, whose body answers false, row 481) beside RR64's, Character's, String's and Equality's = with no meet. The prelude takes no new declaration (the skill's compiler.md, "The compiler's prelude"). The planner's measured repair, explorations/compile-ladder/plan-21/probes/prelude-full-check.patch: GeneratorZZ32 extends Equality[\GeneratorZZ32\] and excludes Number, Character and String too (fsi:111, fss:301), and the always-false = goes from api and component, so a range's = is Equality's identity; with it the prelude compiles, and taking the = out alone leaves ranges with no =, RangeEqRungJLink failing. Take it, or improve it and say why.
- The compiled tests the full check refuses, fork 16: in the planner's run (the record's section 4), with the repairs above, the compiler track failed one test of 1,282, row 726's XXXNoDuplicatesRuleSelfPositionsOperator, which the check now refuses as duplicates: promote it to test (4), or respell it so. The library track's 86 and the other-compiler track's 263 passed. Any other test whose verdict moves on your tree: judge it by the overloading rules; a program that is an invalid overloading by them is respelled to keep its subject, its before and after a point to report; a refusal the rules do not support is a defect of the check: fix it, or record it in one of the three homes.
- P-148: do what the skill's compiler.md, "The checker's time", says: time the count stage on the base build before your edit and on your tree once the change is correct, then the second pass.
- Not yours: walk's meet check (row 611's walk half, fork 17); the export check's symbolic names (row 782); the library's fixes, which the first run landed.

**Rows.**
- Row 584: the gather closes it with test (1) and the stages.
- NEW-C-1, the crash: closed with test (2). Row 775: a note, or closed if your fix clears its program, with its test.
- NEW-C-2, the double count: closed with test (3) and the prelude's library order.
- Row 726: closed with test (4).
- Row 611: a note: the checker's half is fixed; walk's skips symbolic operators.

**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is the first run's landed tables. By the planner's measurement of the first run's text under the full check, the distance stays 5, with the crash's three lines caught, and the count 3; with your crash fix there is no crash line. If the first run dropped rung V and landed nothing in its place, the distance reads 13, its 8 vector sites known errors; if the checker rung of V's other branch landed in its place, 5. Any site that comes is a point to report, with the rule that refuses it. Report the count stage's seconds before your edit, after it and after your speed pass: the check reads more names, so it may be slower.

**Files.**
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala; ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala, or where the crash lies.
- Library/CompilerLibrary.fsi and .fss: GeneratorZZ32's line and its =, as fork 15 gives it.
- ProjectFortress/compiler_tests/: your tests; the compiled tests fork 16 respells.
- Not: the interpreter's library; walk; the export check.

**Tests, first.**
- (1) to (4) above, each seen failing on the base's code where it can fail there.
- Keep their verdicts: the compiler, library and other-compiler tracks but fork 16's tests; ant testSystem's interpreter tests, which this edit cannot reach.
- After the change: ant testQuick once (the skill's tests-running.md); your change's ladder subset as the skill's gate.md gives it, with the eighteen microGPT components' phase step, since the checker changes what it refuses.

**Specification.** The specification already overloads operators as functions (Specification/advanced/overloading.tex): grep it and Appendix I for a sentence that says the checker skips symbolic operators, and correct each. List every sentence made false as revival-change material: F-245's "the checker as built skips them (row 584)", rows 584's and 726's claims among them.

**Overlaps by file.** Rung E edits ExportChecker.scala and the interpreter's api; rung D the demos and Library/Generator22D.fss; neither edits your files. The batch's first run's rung B edited TypeAnalyzer.scala's tuple cases, which are on your tree. If run 1 landed the checker rung of V's other branch in V's place, its changes to OverloadingChecker.scala (toFunctionArrows, toFunctionalMethodArrows and validOverloadingInner's exclusion test), TypeSchemaAnalyzer.scala and OverloadingOracle.scala are on your tree too; your loops and the crash's place are other declarations. Under the full check E's api lines are read too: the planner measured both runs' library text together (section 4).

### E. The api aligned with its component, and the export check brought to its rule (rows 800 to 802)

**The answers this rung follows.** The specification's rule (Specification/basic/components/apis.tex, "Component and API Identity"): every declaration of an api needs a definition with the same name in the component, other than the methods or fields declared abstract (:252-257). P-27: the library's own way. P-90 holds Maybe's entries, and P-155's later work String's. Rows 800 to 802: the export check matches members without their names, compares a field by its type only, and compares its component-to-api half with its arguments swapped. The probe is explorations/perf-probes/export-check-full/REPORT.md: the 115 differences in its section 2, sorted in section 3, the 4h text measured in section 4 with library-4h.patch and the 19 follow-on lines of section 4.3, the defects in section 6. The planner wrote the 4h text on the first run's api and measured both runs' text (this record's section 4). This record's section 2, the brief's defaults 5 and 6 and forks 19 to 22, give the defaults you build.

**What you build.**
- The tests first, compiled tests in ProjectFortress/compiler_tests/, each an api and its component, from the probe's shapes: (1) row 800: api trait T f(): ZZ32 end, component trait T g(): ZZ32 = 1 end: refused, compile_err_contains naming the different method; it compiles on the base. (2) Row 801: api object O x: ZZ32 end, component object O var y: ZZ32 := 1 end: refused naming the field; it compiles on the base. (3) Row 802: api trait Q comprises { ... } abstract num(self): ZZ32 end, component trait Q comprises { R } abstract num(self): ZZ32 end with object R extends Q defining num: accepted; on the base refused, Asbtract method num ... is not declared in the API. (4) 4i: an api member written abstract whose component member has a body: accepted; refused on the base.
- The check, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala: row 800, equalFnHeaders compares the names (:600); row 801, equalLValue's comparison of names and modifiers joined to its type match in one expression (:812-821); row 802, allAbstractsMadePublic calls equalMember with the api's member first (:752, :791); 4i, fork 20: an api member written abstract needs no matching definition, and the missing-members count counts the api's other members only (:768-769).
- The library, Library/FortressLibrary.fsi only, fork 19: library-4h.patch written on the first run's landed api: its 56 abstract lines, 3 added declarations, 6 changed lines and the misspelt asDebugStriing removed; with Integral's = from the first run written abstract too, and BoundedRange's atMost line as the first run's rung B left it (by question 2's default kept under its condition, so written abstract atMost(n: I): FullRange[\I\] where { I extends Index }; dropped, the 4h line goes with it); and the 19 follow-on lines the abstract lines need (the probe's section 4.3: ZZ32's and ZZ64's ^ over any integer, ZZ's 15 members, OpenRange's shiftLeft and shiftRight). The planner's text is explorations/compile-ladder/plan-21/probes/run2-api.patch, against the first run's api as the planner composed it; take it, or improve it and say why. Fork 22: Array2's column and row subscripts, opr[_:TrivialOpenRange, i1:ZZ32] and opr[i0:ZZ32, _:TrivialOpenRange], declared in the api as the component has them (FortressLibrary.fss:2707, :2711).
- P-148: you change the checker: do what the skill's compiler.md, "The checker's time", says.
- Not yours: the 17 differences that need a way of their own and the 6 that need a decision (the probe's sections 3.3 and 3.4), RR64's rounding and Condition's place among them (the brief's defaults 5 and 6); Maybe's 5 (P-90) and String's 13; the export check's reading of symbolic names (row 782); rows 768 and 769; the count stage's reading of a library that does not parse (fork 21, the coordinator's, between the runs): you edit no tool.

**Rows.** Rows 800, 801 and 802: the gather closes each with its test. Row 782: a note if your edits change what it measures.

**Distance sites.** Run the count stage and the distance stage once each on your final tree, their before the first run's landed tables. The distance stays 5, the export error one site, its entries from 43 to about 15 by the probe's arithmetic (20 after 4h and its follow-on, 15 with 4i; row 802's fix then takes QQ's last two, and row 800's brings TotalComparison's hidden =); the planner's measurement of the text is in section 4. Give the entries before and after, entry by entry, with compare-sites.py. Any site that comes, in another component above all, is a point to report. Report the count stage's seconds before your edit, after it and after your speed pass.

**Files.**
- Library/FortressLibrary.fsi: the 4h lines, the follow-on lines and Array2's two subscripts, only.
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala.
- ProjectFortress/compiler_tests/: your tests.
- Not: the component's bodies; the overloading checker; Maybe's and String's entries.

**Tests, first.**
- (1) to (4) above, each seen failing first.
- Keep their verdicts: the compiler, library and other-compiler tracks; walk's suite, which runs the component (the probe: microGPT's quick pair and nine walk tests unchanged with the 4h text).
- After the change: ant testQuick once, and ant testSpecData once since the api changes (P-124); your change's ladder subset with the eighteen microGPT components' phase step.

**Specification.** Part IV renders the api: 56 declarations become abstract, three join, EqualTo's <, Indexed1 to Indexed3's headers, ZeroIndexed's bounds and ReductionPair's header change, asDebugStriing goes, the 19 lines and Array2's two subscripts join: list them. apis.tex's rule is now what the check does: grep Appendix I and the components chapter for a sentence that says otherwise. List every sentence made false as revival-change material: the probe's count of 115 and rows 800 to 802's claims among them.

**Overlaps by file.** Rung C edits the overloading checker and the prelude, rung D the demos and Generator22D; neither edits your files. The first run's rungs S and B edited the api's traits you edit; your text is written on theirs.

### D. The team demos running (P-79)

**The answers this rung follows.** P-79: every team demo is kept running as the tree changes; if a change breaks a demo and the way to repair it is known, the batch that makes the change also rewrites the demo; the demos known to fail today are respelled where the way is known: the five that walk refuses at load (row 670), trips.fss (row 710), the timing line of BiCGSTAB.fss and BiCGSTAB2.fss (row 791). P-74: a ZZ64 converts to RR64 only by asFloat. The probe is explorations/perf-probes/team-demos/REPORT.md: 30 of the 52 demos the team's DemoTests runs reach their end on the base and 22 stop; with demos-repairs.patch all 52 do (its sections 2 and 3). The planner ran the 52 with the patch on the first run's text (this record's section 4). This record's section 2, forks 23 to 27, give the defaults you build.

**What you build.**
- Row 468's test first: a walk test of Generator22D's rects, named by its topic, which imports Generator22D and asserts the rectangles rects gives for a small grid; on the base it stops, Failed to find any matching overload, args = (Ratio,Ratio) (Library/Generator22D.fss:146); after the fix, DIV in place of / at :144, :145 and :150, it passes.
- demos-repairs.patch, which applies to this base (git apply --check): 22 demo files, Library/Generator22D.fss (the fix above) and ProjectFortress/demos/GenomeUtil2d.fsi (fork 24), each repair as the probe's section 3.1 gives it.
- Row 710, fork 27: trips.fss's generator extends StandardTotalOrder[\generator\] (ProjectFortress/demos/trips.fss:97-100), checked by the checker's driver over the demo, as row 710's reproducer runs it.
- Run all 52 under walk on your final tree, one at a time, each from ProjectFortress/demos with a 600 s limit and an empty standard input, wordcount2 from the tree's root, tennisRanking with the arguments the team's test gives it (the probe's section 1); each must exit 0 and print no fail. A demo that the batch's first run broke and whose repair is known is respelled; one whose repair is not known is a point to report, with a row.
- Not yours: row 731's demo half; the saved outputs BirdCount2c-output.txt and BirdCount2d-output.txt, which no test reads.

**Rows.** The gather closes rows 791, 670, 449, 464 and 468 (with your test) and 710, each by the demo runs. The probe's nine drafted rows stay in its report (fork 25); a defect you meet that it did not draft gets a row.

**Distance sites.** Library/Generator22D.fss and the demos are not among the twelve components the count stage and the distance stage read (explorations/coordinator/tools/distance/run.sh, COMPONENTS): run neither stage, and say so with the paths. You change no checker code: no speed pass.

**Files.** ProjectFortress/demos/: the 22 files of the patch, GenomeUtil2d.fsi (new), and trips.fss's generator line; Library/Generator22D.fss (:144, :145, :150); ProjectFortress/tests/: row 468's test. Not: the library's other files; walk.

**Tests, first.**
- Row 468's test, failing on the base, passing after.
- The 52 demo runs on your final tree; their before is the probe's base run (its section 2: 30 reach their end), which is not run again; each demo's line before and after in your report.
- After the change: your own test only; the gate runs the suites.

**Specification.** None: the demos are the team's programs, not the specification's text. Say so.

**Overlaps by file.** No other rung edits your files. The first run's rungs S, B, V and N changed the library that runs the demos; your runs are on it.

### The rule the rungs keep, and how they meet

- No two rungs of one run change one declaration, and no rung builds on another rung of its run (PLAN, "The principle for the batches"). No rung lands only with another.
- The declarations each rung changes. S: Integral's =, ZZ's api =, Maybe's |self| and subscript, String's trait and api header and four concatenation families, the api's six vector and matrix operators, EmptyString and Concatenable, Float's |self| and ^. B: Index, ZZ32's header, the index parameters of Indexed, DelegatedIndexed, MutableIndexed, ReadableArray, ImmutableArray, Array, the two Standard...ArrayType traits, FullRange, CompactFullRange, StridedFullRange, opr :, SimpleMappedSeqIndexed and its three siblings and the eight scalar operators, Range's excludes, BoundedRange's atMost; TypeAnalyzer's tuple cases of pSubInner and pExcInner; FTypeTuple's three methods; the desugarer's forTraitDecl. V: HasRank, Vector's and Matrix's headers. N: Array2.subarray, Array3.subarray, Array3's opr[:]; List's header. C: OverloadingChecker's three loops and two import-star loops; the crash's place; the prelude's GeneratorZZ32. E: ExportChecker's equalFnHeaders, equalLValue, allAbstractsMadePublic and missing-members count; the api's 4h, follow-on and Array2 lines. D: 22 demos, GenomeUtil2d.fsi, trips.fss's generator, Generator22D's rectsImpl.
- Files two rungs of run 1 share: Library/FortressLibrary.fsi (S, B, V) and Library/FortressLibrary.fss (S, B, V, N). The gather applies S, B, V, N by their lowest edited lines. V can be dropped without touching another rung. Run 2's rungs share no file.
- B, C and E change the checker and make P-148's second pass; S, V, N and D do not.
- They meet in walk's suite and both stages: each run's gate tables on its merged tree are the first with all of its rungs, and the planner's measurements of each run's text together expect 5 and 3 (section 4).

## 4. The candidates, and what the batch leaves out

### PLAN's order for batch 21

PLAN's phase 3, item 19, lists the candidates with what each waits on. PLAN's method ("The principle for the batches") puts first what is decided and free to fix, then the decisions ready to build. The five probes the brief names ran first.

- **P-155's symbolic operators, with P-156 and P-157:** decided (item 59, answered 2026-10-23); probed (F-245). **In: rungs S, B and V in run 1, C in run 2**; V droppable, or replaced by a checker rung (rung V's section, "The other branch"), since the type-decisions judgement asks that P-157 wait on the A1 probe, which has run (below, "Probe A1").
- **The export alignment and rows 800 to 802:** probed (`perf-probes/export-check-full/`); the rows filed with their shapes. **In: rung E, run 2.**
- **Row 774, walk's half of conditional extension:** decided (P-154); probed (`perf-probes/walk-conditional-extension/`). **Out**, by the coordinator's change of the brief after the type-decisions judgement (its V3): it waits until walk runs the checker (P-12) or row 364 is fixed. The probe's way E, `List extends Equality[\List[\E\]\]`, and its `=/=` row: **in, rung N.**
- **The team demos (P-79):** probed (`perf-probes/team-demos/`). **In: rung D, run 2.**
- **Rows 793 and 794:** nothing waits. **In: rung N, run 1.**
- **The specification's two sentences that order every list:** with N (fork 11).
- **`BoundedRange`'s narrowed `atMost`:** a question (question 2), by the coordinator's change of the brief.
- **`Array2`'s column and row subscripts in the api** (A.skeptic.4 of climb batch 20): with E (fork 22).

### The planner's probe

Three worktrees seeded from the base build at `aa5ff2423`: one for the compiled path with the full check built, one for run 1's text with both paths' tuple rule and walk's conditional extension built, one for the base's full check and then run 2's text with the checker's tuple rule built. The stages are the gate's own (`tools/distance/run.sh`, `tools/checker-count/run.sh`); the full check is the symbolic-operator probe's `run-shadow.sh` with the word `catch`, and for the count a copy of the count stage's `run.sh` with the shadow's classes first on its class path. Site lists compared with `perf-probes/array-sites/compare-sites.py`. The load ran from 4 to 25, the three worktrees side by side; no time here is one to compare.

**The base's full check:** '#total 191', '#kind overloading 182', 'return-type 1', 'typecheck 4', 'export 1', 'other/overloading 3', and three `@@PROBE CRASH` lines on `||` in `List`'s api and component and `String`'s component: the probe's `full-catch` figure, on this base. Its site list is `compile-ladder/plan-21/probes/full-check-base.tsv`, the before of rungs S's and B's full-check stage.

**Run 1's text together, as first drafted** (`compile-ladder/plan-21/probes/run1-text.patch`: S's seven fixes with the `abshead` variant, V's `vecA2`, B's `subS1` with the probes' two tuple rules, N's three lines and its `Equality` line, and the walk probe's row-774 patch with its two test lines and QuickCheck's map, which the coordinator's change of the brief took out after these runs; the generators applied in that order with no conflict). The stages read none of the row-774 parts (walk's Java, QuickCheck and the tests are not among their twelve components), so the stage figures below are run 1's as it now stands; walk's figures are with the row-774 patch, and the run without it is the next paragraph's:
- The stock distance: '#total 5', 'typecheck 4', 'export 1', '#crash none'; against the landed list, 'landed 5 now 5', the export error's 43 entries kept, `String`'s narrowed ("different extends clauses" gone).
- The stock count: '#total 3', every api 0, '#crash none'.
- The full check's distance: '#total 5', the same five, three crash lines caught; against the base's full check, 'landed 191 now 5', nothing come.
- The full check's count: '#total 3', '#crash none' (the crash caught per name).
- Walk, `ant testSystem`, with the row-774 patch: 668 tests, 4 red, each a planned move: three "Missing expected failure" (`XXXConditionalExtensionTypeTestWalk`, the row-774 fix's promotion; `XXXArray2SliceAtNonzeroBase` and `XXXArray3SliceAtNonzeroBase`, N's), and `XXXFunctionalMethodMeetOperator`, 'Refused at load, but did not satisfy load_exception_contains', the pair of fork 5: 'Library/FortressLibrary.fss:4473:1-65: and .../XXXFunctionalMethodMeetOperator.fss:10:3-33: first parameters a:[String,Any] and self:[T,ZZ32] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present'. So, with the row-774 patch and its respellings, the walk probe's 10 moved tests and S's, B's and V's walk changes leave nothing else.
- Walk, `ant testSpecData`: 'Tests run: 130, Failures: 0'.
- microGPT's quick pair (`tools/mg-run.sh`): both 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', rc 0.

**Run 1 as it now stands under walk:** the tree of "Rung B's checker at its defaults" below (question 2's default and question 1's desugarer line in), with the row-774 patch, QuickCheck's map and the two test lines taken out, and everything built again:
- `ant testSystem`: 668 tests, 3 red, each a planned move: `XXXArray2SliceAtNonzeroBase` and `XXXArray3SliceAtNonzeroBase`, 'Missing expected failure' (N's promotions), and `XXXFunctionalMethodMeetOperator`, 'Refused at load, but did not satisfy load_exception_contains', the pair of fork 5. `XXXConditionalExtensionTypeTestWalk` 'Saw expected exception': an expected failure still, as the change of the brief keeps it.
- `ant testSpecData`: 'Tests run: 130, Failures: 0'.
- microGPT's quick pair: both 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', rc 0.
- A program of question 1 under walk (`f[\I extends Index\](x: I)`, `g(x: Object)` beside `g(x: Any)`, and two `typecase`s): `f` takes `3` and `(1, 2)`; `g(3)` runs `Object`'s declaration and `g((1, 2))` `Any`'s; `(1, 2)` is an `Index` and no `Object`. Walk's tuple rule made a pair no `Object` already, since it tests `Index` directly, so the program shows the defaults working together under walk, not that walk needs the desugarer's line.

### Question 2's three texts

Run 1's text with `BoundedRange`'s `atMost` kept as `atMost(n: I): FullRange[\I\] where { I extends Index }` in api and component, in place of the drop, the checker built with the tuple rule:
- The stock distance: '#total 5', 'typecheck 4', 'export 1'; against the drop's list, 'landed 5 now 5', the export error's 43 entries the same.
- The stock count: '#total 3', '#crash none'.
- The full check's distance: '#total 5', the same five sites, those below the kept line one line later (`BIG MIN` at `FortressLibrary.fss:4392` and `:4398`), three crash lines caught; the full check's count: '#total 3', '#crash none'.
- Under walk, on the same text with rung B's checker at its defaults (below; the walk paragraph above): `RangeDeclarations`, `LibraryMeetDeclarations` and `RangePrototype` 'OK', `TrivialOpenRangeAtMostStop` 'Saw expected refusal at load', as with the drop (run 1's text as first drafted, the paragraph above it).

The same line without its condition, `atMost(n: I): FullRange[\I\]`, on the checker of "Rung B's checker at its defaults" below (one change from it): the full check's distance '#total 7', 'wellformed 2', 'typecheck 4', 'export 1', '#crash none', the two new sites 'Ill-formed type: FullRange[\I\] The static argument I does not satisfy the corresponding bound Index.' at `FortressLibrary.fsi:2240` and `FortressLibrary.fss:4105` of run 1's text (the base's `:2251` and `:4099`), the other five unchanged; the stock distance '#total 7', the same. The earlier probe's 2 bound errors (its section 3.1), on this text.

### Rung B's checker at its defaults

On question 2's text above, the checker's half of question 1's default and fork 7's exclusion side added (`compile-ladder/plan-21/probes/checker-tupleindex-exclusion.patch`, by the bare name `Index` as the probe's rule): the desugarer leaves a trait named `Index` as written instead of making it extend `Object`, and `pExcInner` gains the case that a tuple excludes `Index` only where one of its elements excludes `Index`. Everything built:
- The stock distance: '#total 5', 'typecheck 4', 'export 1', '#crash none'; the stock count: '#total 3'.
- The full check's distance: '#total 5', the same five sites with the same messages as question 2's text, the export error's entries among them; the full check's count: '#total 3', '#crash none'. The stage took 232 s, FortressLibrary 166 s, against 219 s and 156 s on question 2's text at a lower load: no stall.
- So neither change moves a site. The stages do not show whether the library meets the new exclusion case; rung B's tests do.

### The demos on the first run's text

`perf-probes/team-demos/demos-repairs.patch` applied as it stands on run 1's text as first drafted (with the row-774 parts, above), with `GenomeUtil2d.fsi` added (fork 24) and walk built; the 52 programs of `DemoTests` one at a time by the demos probe's driver, with its 600 s limit:
- All 52 exit 0 and none prints "fail". The longest, `Generator2Demo`, took 366 s; the 52 took 34 minutes, beside the other probes.
- The same tree's walk suites, with the demos patch too: `ant testSystem` red at the same four tests as above; `ant testSpecData` 'Tests run: 130, Failures: 0'; microGPT's quick pair 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS'.
- So run 1's library changes, S's top-level `||` and B's bound among them, stop no demo, and D's patch needs no change for them. Not run without the row-774 parts: the demos probe ran the patch on the base without them, 52 of 52 (its section 3.2), and rung D runs the demos on run 1's landed tree.

### Run 2's library text on the first run's

`compile-ladder/plan-21/probes/run2-api.patch`, on `run1-text.patch`: the export probe's `library-4h.patch` with its three hunks that met S's and B's lines written by hand (`Integral`'s new `=` written `abstract` too; `BoundedRange`'s `atMost` line gone with B, since the patch was written on the drop, where question 2's default keeps the line, written `abstract` with its condition; `FullRange`'s `extent` beside B's bound), the probe's 19 follow-on lines, and `Array2`'s two subscripts. The checker as built, with the tuple rule:
- The stock distance: '#total 5', '#kind abstract-method 0', nothing come; the export error's entries 'landed 43 entries, now 20', as the export probe's run B: 26 gone, and `Array2`, `QQ` and `String` narrowed to one difference each (`Array2`'s `bounds`, `QQ`'s `numerator`, which row 802's fix takes, and `String`'s members).
- The stock count: '#total 3'.
- The full check's distance: '#total 5', three crash lines caught; the full check's count: '#total 3'. So E's api lines bring no error under the full check either.
- Not measured: rung E's checker changes (4i and rows 800 to 802), whose effect on the entries is the export probe's arithmetic (its sections 3.2 and 6): 4i 20 to 15; row 802's fix takes `QQ`'s entry; row 800's fix brings `TotalComparison`'s hidden `=` and narrows nothing else.

### The compiled path under the full check

The full check built into the tree (the three loops of `OverloadingChecker.scala` reading every symbolic operator, without the probe's catch), then the prelude's library order and `ant testFast`:
- **The prelude refuses itself.** Each of the five library compiles stops, 'File AnyType.fss has 17 errors.': two 'Invalid overloading of = in API CompilerLibrary' (`(GeneratorZZ32, GeneratorZZ32)->Boolean @ Library/CompilerLibrary.fsi:129:1-56 and (RR64, RR64)->Boolean @ ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:445:5-36`, and the same against `Character`'s at `:521`), and 'There are multiple declarations of - with the same parameter type: (ZZ, ZZ)' at `CompilerBuiltin.fsi:116`, each declaration against itself, and the same for `ZZ64`, `ZZ32`, `NN32`, `NN64`, `IntLiteral` and `RR64`. So every compiled test fails: the library track 'Tests run: 86, Failures: 86', the other-compiler track 'Tests run: 263, Failures: 263'.
- **The double count is a fault of the check.** In `checkOverloading`'s import-star loops (`OverloadingChecker.scala:273-284`, `:307-318`), an api's functions are added once for each of its names whose text is the operator's, and `CompilerBuiltin` has a prefix and an infix `-`. Added once per api (fork 14), the seven duplicate errors go and nothing else moves: 'File AnyType.fss has 2 errors.'
- **The prelude's `=`.** With `GeneratorZZ32` excluding `Number` and `Character` too, two pairs remain: against `Equality[\T\]`'s `=` (`Library/CompilerAlgebra.fsi:25`) and `String`'s (`CompilerBuiltin.fsi:30`). With the always-false top-level `=` also taken out, the prelude compiles, and `ant testFast` gives: the compiler track 'Tests run: 1282, Failures: 3', the library track 86 and the other-compiler track 263 with none. The three: `XXXNoDuplicatesRuleSelfPositionsOperator`, row 726's expected failure, 'Saw failure, but did not satisfy compile_err_contains; expected Likely bug in static analysis, apparently malformed overload set not rejected', now refused by the checker, 'There are multiple declarations of || with the same parameter type: (S)' (fork 18); and `RangeEqRungJLink` and `XXXRangeEqRungJ`, row 481's, whose `(1:3) = (1#3)` then finds no `=`, '(ZZ32, ZZ32)->Boolean is not applicable to an argument of type (Range, Range).'
- **Fork 15's default, measured.** `GeneratorZZ32` extends `Equality[\GeneratorZZ32\]` and excludes `Number`, `Character` and `String` too, and the always-false top-level `=` leaves api and component (`compile-ladder/plan-21/probes/prelude-full-check.patch`, with the full check and the double count's fix). The prelude compiles, and `ant testFast` gives the compiler track 'Tests run: 1282, Failures: 1', row 726's test alone; the library track 86 and the other-compiler track 263 with none. `RangeEqRungJLink` links again: a range's `=` is now `Equality`'s identity, which `XXXRangeEqRungJ` still fails as expected (row 481, 'FAIL:  ranges.tex, section "Ranges"'). No declaration is added: an `extends` entry and an `excludes` clause change, and one declaration goes.
- **What this could not show:** the three units' `||` checks that the `AnyList` crash hides (`List`'s api and component, `String`'s component); they run once C's crash fix is in, and what they find is C's to repair.
- **The crash, traced on the probe's program** (`bin/fortress typecheck -debug stacktrace`): 'E is not in the kind env [E$1 -> KindBinding(E$1,E$1 extends Object)]', from `TypeAnalyzer.pExcInner`'s `checkCC` (`:525-527`) through its `checkP` (`:542-551`) to `pEqv` and `staticParam` (`:1039`), under `OverloadingOracle.equiv` from `OverloadingChecker.toFunctionArrows` (`:157-159`). The kind environment holds the opened variable `E$1` that `comprisesClause` makes (`openWhereSizes`, `:908-924`); the type compared with it holds the plain `E`, by reading from the functional method's self type, whose comprised list `removeSelf` (`:566-577`) does not open.

### Probe A1, after the record was drafted

`perf-probes/self-type-exclusion/REPORT.md` (`dd9d7619a`, an Opus worker, on the base `aa5ff2423` seeded from `/home/user/fortress-base21`; the review wrote this paragraph from it). Two checker shadows of the overloading check's exclusion test, on top of the full check with crashes caught: (i) a self-typed trait's `self` read as `C[\X\] & X` in that test only (`self-exclusion.patch`: `OverloadingChecker.scala`'s `toFunctionArrows`, `toFunctionalMethodArrows` and `validOverloadingInner`'s `oa.excludes` call); (ii) the exclusion test's existential reduction reading each top-level static parameter as its bounds (`bound-exclusion.patch`: `TypeSchemaAnalyzer.meetEmptyWithBounds` after `emptyED`, and `OverloadingOracle.excludes` taking it as a third way to be valid). The patches apply to `aa5ff2423` alone and together, and together with `run1-text.patch`, `checker-tupleindex-exclusion.patch` and `prelude-full-check.patch` (the review's `git apply --check`).
- The full check's distance: 191 with no shadow (twice, the planner's 191 sites); 191 under (i), none of the 8 cleared; 187 under (ii), the four scalar-on-the-left pairs cleared (`FortressLibrary.fsi:2703`, `:2708`, `.fss:4907`, `:4912`); **183 under both, all 8 cleared, nothing else gone or come**, the same 183 as rung V's A2 with no library line. The fancy rule's three errors name another pair of the same family under (i), a change of iteration order; the caught `AnyList` crash is printed with another span.
- The count stage: 3 as the gate runs it; under the full check 102, 102 under (i), 100 under (ii), 98 under both; only the api's four scalar pairs move.
- The compiled tests: 35 `.test` files, 52 tests, `OK (52 tests)` with no shadow, under the full check and under both, their output identical; the team's `XXX10k` and `AfterTypeChecking` too.
- Time: 230 to 279 s for the stage under the shadows, against 253 and 272 s with the full check alone; no stall, `#crash none`.
- A first form of (ii), the parameter kept beside its F-bound, sends the constraint solver into a recursion without end (`Formula.tImplies` and `primImp`), a `StackOverflowError` at a 1 GB stack: a row drafted, not filed (its section 8). Row 786's `tint` stays refused under (ii).
- Its questions, with its defaults: withdraw P-157 and brief the checker rung (default); (ii) in the exclusion test only, not in every reduction (default); `tint`'s refusal kept, row 786 `CONTESTED` (default); the solver's row filed now (default). Against the judgement: its conclusion holds, its split does not ("(i) alone clears the four scalar-on-the-right pairs" is false for the library's generic block).

### Left out, each with its home

- **Row 731's three sites** (`BIG MIN` at `Library/FortressLibrary.fss:4386` and `:4392`, `List.fss:146`): a checker project of its own, by the brief. Home: PLAN, phase 3, item 19's "Not candidates"; row 731.
- **Row 632's fused arm:** waits on the curator's answer to item 46 (review-queue item 40). Home: PLAN item 46.
- **Row 731's demo half** (P-79's fourth named repair, the static arguments of the demos' big operators): no probe has run the checker over the demos, so which reductions it refuses is not known. Home: PLAN item 19's demos line; a probe of the checker's driver over each demo first.
- **The export error's 25 other differences** (the export probe's sections 3.3 and 3.4: 17 that need a way of their own, such as `BigReduction`'s and `Comprehension`'s getters and `DelegatedIndexed`'s `size`, and 6 that need a decision, `RR64`'s rounding and `Condition`'s place among them), **`Maybe`'s 5 and `String`'s 13:** the error stays at one site after this batch. Homes: the probe's report; P-90; P-155's later work.
- **Row 773** (the members scoped to the condition): waits on review-queue item 177 (ask 8). **`tint`** (row 786): held for the curator. **Row 782** (the export check reading symbolic names, 165 entries): a defect of the check's matching, latent while `isDeclaredName` stays (fork 13). Homes: their rows and PLAN.
- **The immutable arrays of rank 2 and 3** (`perf-probes/immutable-arrays/REPORT.md`): weighed and left out. The switch-over neither needs nor is blocked by them, and nothing uses them; the probe's own default is not to build them. Its blind spot of the distance stage is fixed (`c21177829`), and the count stage's twin is the coordinator's between the runs (fork 21). Its row on a second `init` of an immutable element is a walk defect off the distance and microGPT's path. Home: the probe's report and its drafted rows, for the coordinator.
- **The other candidates of item 18** (the checker's rows 714, 725, 691, 756, 758, 759, 764, 768, 770, 775, 776, 781 and 789; walk's rows; P-45's rows 759, 779, 780 and 786 to 788 and row 539): as climb batch 20's record lists them (its section 4); C notes row 775 if its crash fix clears it.

## 5. How it is run

The batch runs on the workflow of batch 20: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`. Each rung's worker does its rung test first; its skeptic checks it and fixes what it finds, test first; a judge rules only on a fix the skeptic marks contested, on a rung the skeptic refuses, or on a worker's stop; the gather lands the rungs on `main` and folds their record lines and their ledger rows through `coordinator/tools/ledger.py`; the merged-diff review and the gate run side by side; the commit stage lands the gate's tables, runs the quick microGPT walk check and pushes. The batch writes no skill text. Section 3 is each worker's brief word for word; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-21/manifest/gen21.py` reads with the briefings of `lists21.py` beside it, and `check21.js` checks.

### The two runs

- **Run 1 is climb batch 21:** rungs S, B, V and N, its block generated by `gen21.py --run 1` (`BATCH` `21`, its folder `compile-ladder/climb-batch-21/`). It launches on the answers to questions 1 and 2 and the curator's word on P-157, or on their defaults under his go. If he holds P-157, the coordinator drops V: `gen21.py --run 1 --without V` writes the block without it, and `check21.js --run 1 --without V` checks it. If he withdraws P-157 and takes the checker rung of V's other branch (rung V's section), a planner writes its section into section 3 and its manifest entry into section 5 under a new letter, in V's place, adds its briefing and the letter to `lists21.py` (`RUNS['1']`), the letter to `check21.js` (`RUN_IDS`, `CHECKER_RUNGS`) and the rung to run 1's intro; the Fable review reads the new section; then the steps below, with `--without V`.
- **Run 2 is climb batch 21b:** rungs C, E and D, its block generated by `gen21.py --run 2` (`BATCH` `21b`, its folder `compile-ladder/climb-batch-21b/`). It launches once run 1 has landed with S and B among its landed rungs: C reads the full check on their library, E's text is written on their api, and D runs the demos on the library run 1 leaves. If S or B did not land, run 2 waits for a planner to rewrite C's and E's sections on what landed.
- **Between the runs**, on run 1's landed tree, the coordinator or a planner reads C's, E's and D's sections against it: their line numbers; their before, which is run 1's landed tables; `run2-api.patch` checked to apply on the landed api (`git apply --check`), or written again on it; the briefing keys through `lists21.py --run 2`; and the block through `gen21.py --run 2` and `check21.js --run 2`. A new base build at run 2's base.

### The generator

`plan-21/manifest/` is committed with this record: `gen21.py`, `lists21.py` and `check21.js`, made from `plan-20/manifest/`. Changed from batch 20's: the batch's values; seven rungs in two runs, each manifest block naming its run, and `--run 1` or `--run 2` choosing the block's rungs, its `BATCH`, its intro and its output file (`manifest21.js`, `manifest21b.js`); run 1's rungs in the order S, B, V, N and run 2's C, E, D, as the gather applies them; `--without V` leaves V out of run 1's block. `check21.js` checks, for the run it is given, that no rung declares `landsOnlyWith`, a checker count, a crash or a ladder move; that S's and V's tests are the stage and no other's; that every section names the count stage and the distance stage; that the sections of B, C and E, which change the checker, name P-148 and its speed pass, and those of S, V, N and D say they make no speed pass; and that the record holds no copy of the block. On `aa5ff2423` with this record: `lists21.py` 'bad lists 0' for both runs; `gen21.py --run 1`, `--run 1 --without V` and `--run 2`, each block checked by `check21.js` with the same arguments on a scratch splice, 'problems: 0' each; and `coordinator/tools/workflow-scenarios.js` on each of the three splices, 'problems: 0'. The tracked script is not spliced: the coordinator splices it ("Before the launch", step 2).

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry. "Its test is the stage" means the checker count or the distance is the rung's failing-then-passing test: S's and V's are, the full-check stage, since their every edit is library text that only the full check reads, beside walk guards; the others have a test first. "Joins the gate" names a step the gate gains once the rung lands; none does, and `ant testSpecData` runs because the last landed summary has it. No rung declares a checker count: it is reported, never red. The expected minutes order the scatter only. The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands; only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### S
- **run:** 1
- **slug:** `rung-symbolic-library`
- **worktree:** `/home/user/fortress-symlib`
- **expected minutes:** 110
- **its test is the stage:** yes
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the symbolic operators' library fixes (P-155, item 59): String's four concatenation families as top-level operators beside juxtaposition's, EmptyString's meet, Integral's and ZZ's =, |_| by String's api header, Maybe's meets, the api's six vector and matrix operators out, Float's ^ meet; rows 585 and 784 closed; the full check 191 to 137 by the probe; library only.
- **points to report:**
  - Whether you took the generators' text as it is or changed it, and why.
  - The full-check tables before and after, site by site, and any site that comes; the stock count and distance tables.
  - The count stage's seconds.
  - XXXFunctionalMethodMeetOperator: the pair walk refuses, and what you did with the test (fork 5).
  - Each walk value that moves, and each test whose message or verdict changes.
  - The declarations that leave, join or change in the api, and so Part IV: String's four families, the six vector and matrix operators, Integral, ZZ and Maybe.
  - Every sentence made false.
  - A ladder file, compiled test, specification example or microGPT component whose verdict, phase or first error changes.
  - A file edited beyond those named, or any edit of the checker, walk's Java or the index parameters.

#### B
- **run:** 1
- **slug:** `rung-index-bound`
- **worktree:** `/home/user/fortress-indexbound`
- **expected minutes:** 150
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the index bound with the tuple rule (P-156): trait Index, ZZ32 an Index, ranges excluding it, every index parameter of the library's generic indexed types bounded by it, BoundedRange's narrowed atMost by question 2, and a tuple of indices an Index in the checker on both sides, in walk and in the specification as the revival's departure, Index's place by question 1; row 783 closed; the full check 191 to 67 by the probe; a walk test first; the checker's speed pass.
- **points to report:**
  - Whether you took the probe's patches as they are or changed them, and why; how the rule names Index.
  - Questions 1's and 2's answers as built, and the lines of the desugarer and of walk they needed.
  - The stock tables and the full-check table before and after, site by site, and any site that comes.
  - The count stage's seconds before your edit, after it and after your speed pass, and the comparison that shows the results the same.
  - Each walk value that moves, and each test whose verdict changes.
  - The declarations the bound reaches, and so Part IV.
  - Every sentence made false, and the specification sentences you edited.
  - A ladder file, compiled test, specification example or microGPT component whose verdict, phase or first error changes.
  - A file edited beyond those named.

#### V
- **run:** 1
- **slug:** `rung-vectors-not-groups`
- **worktree:** `/home/user/fortress-vectors`
- **expected minutes:** 50
- **its test is the stage:** yes
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** vectors that are not additive groups (P-157): Vector and Matrix leave AdditiveGroup and arrays exclude every additive group, as Array3 already does; the full check 191 to 183 by the probe; library only; a rung apart so that the batch can drop it on the curator's word after the A1 probe.
- **points to report:**
  - Whether you took the generator's text as it is or changed it, and why.
  - The full-check tables before and after, site by site, and any site that comes; the stock count and distance tables.
  - The count stage's seconds.
  - Each walk value that moves, SUM or zero over a vector or a matrix above all, and each test whose message or verdict changes.
  - The declarations that change in the api, and so Part IV.
  - Every sentence made false.
  - A file edited beyond those named.

#### N
- **run:** 1
- **slug:** `rung-slices-list-equality`
- **worktree:** `/home/user/fortress-slicelist`
- **expected minutes:** 70
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** two library repairs under walk: the slices of an Array2 or Array3 based above zero (rows 793, 794), each subarray handing its view the offset less the base as Array1's does; and a list's = through Equality, List extends Equality[\List[\E\]\] as the maps do, with the =/= defect filed and its expected failure; the specification's list order revised; row 774 held.
- **points to report:**
  - The two promotions, before and after.
  - The new row and its test.
  - The stock count and distance tables, and any site that comes.
  - The count stage's seconds.
  - Each walk value that moves beyond the two promotions.
  - Every sentence made false, and the specification sentences you edited.
  - A file edited beyond those named.

#### C
- **run:** 2
- **slug:** `rung-symbolic-check`
- **worktree:** `/home/user/fortress-symcheck`
- **expected minutes:** 150
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the full check (P-155, row 584): the overloading checker's three loops read every symbolic operator; the AnyList crash repaired; an api's operator set no longer counted once per name of the same text; the prelude's invalid = repaired without a new declaration; row 726's pair refused; compiled tests first; the distance 5 to 5 with every operator checked; the checker's speed pass.
- **points to report:**
  - Whether you took the probe's shadow as it is or changed it, and why; where the crash lay.
  - The prelude's repair (fork 15), each line with its before and after.
  - Each compiled test whose verdict changes, with its before and after and the rule (fork 16), row 726's among them.
  - The stock tables before and after, site by site, any site that comes, and what the three units' || checks found once the crash was fixed.
  - The count stage's seconds before your edit, after it and after your speed pass, and the comparison that shows the results the same.
  - The new rows and their tests.
  - Every sentence made false.
  - A ladder file or microGPT component whose phase or first error changes.
  - A file edited beyond those named, or any edit of the interpreter's library or walk.

#### E
- **run:** 2
- **slug:** `rung-export-align`
- **worktree:** `/home/user/fortress-exportalign`
- **expected minutes:** 140
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the api aligned with its component and the export check brought to its rule (rows 800 to 802): the 4h text on the first run's api with its 19 follow-on lines and Array2's two subscripts, the check comparing names and fields, its halves the right way round, abstract members needing no definition; the export error 43 entries to about 15; compiled tests first; the checker's speed pass.
- **points to report:**
  - Whether you took run2-api.patch and the check's edits as they are or changed them, and why.
  - The export error's entries before and after, entry by entry, and any site that comes in any component.
  - The count stage's seconds before your edit, after it and after your speed pass, and the comparison that shows the results the same.
  - The declarations that join or change in the api, and so Part IV.
  - Each compiled test whose verdict changes.
  - Every sentence made false.
  - A file edited beyond those named, or any edit of the component's bodies.

#### D
- **run:** 2
- **slug:** `rung-team-demos`
- **worktree:** `/home/user/fortress-teamdemos`
- **expected minutes:** 130
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the team demos running (P-79): the demos probe's repairs, so that all 52 demos the team's test runs reach their end under walk, with row 468's test first for Generator22D, the api file GenomeUtil2d.fsi the team never committed, and trips.fss's order (row 710); rows 791, 670, 449, 464, 468 and 710 closed; neither stage.
- **points to report:**
  - Each demo's line before and after, and whether each reaches its end.
  - Each repair that departs from the probe's, and why.
  - GenomeUtil2d.fsi, a new file in the team's folder.
  - Row 710's repair, and the checker's driver on trips.fss before and after.
  - Any demo that the batch's first run broke, and its repair.
  - A file edited beyond those named.

### What every agent of run 1 reads first

This run is climb batch 21, the first of the two runs of the record CLIMB-BATCH-21.md, phase 3's next batch after climb batch 20, toward the checker at a true zero with every symbolic operator checked (P-155). Its rungs: S, the symbolic operators' library fixes (P-155): String's four concatenation families as top-level operators beside juxtaposition's, EmptyString's meet, Integral's and ZZ's =, |_| by String's api header, Maybe's meets, the api's six vector and matrix operators out, and Float's ^ meet; B, the index bound with the tuple rule on both paths and in the specification (P-156), recorded as the revival's departure from the designers' tuple-type text; N, the slices of an Array2 or Array3 based above zero (rows 793, 794) and a list's = through Equality with the =/= defect filed; and V, Vector and Matrix no longer additive groups (P-157), a rung apart that is in this run only if the curator kept P-157 after probe A1 (the batch table says whether it is). Walk's half of conditional extension (row 774) waits. The second run, climb batch 21b, turns the full check on (rung C), aligns the api with its component (rung E) and runs the team demos (rung D), after this run lands. The distance stands at 5 and the count at 3 after climb batch 20 (compile-ladder/climb-batch-20/gate/); with the full check the same library gives 191 (F-245). By the planner's measurement of this run's text together, the stock stages stay at 5 and 3 and the full check goes from 191 to 5 with V and to 13 without it, nothing come; the specification's examples and microGPT's quick pair pass. S's test is the full-check stage, the probe's run-shadow.sh with catch, its before the planner's base table, and so is V's where it runs; B and N have walk tests first. B changes the checker and makes P-148's speed pass; S, N and V do not. No two rungs change one declaration, and no rung builds on another; S, B and N edit Library/FortressLibrary.fss, S and B its api, and V both where it runs; the gather applies S, B, V where it runs, then N. ant testSpecData runs in the gate because climb batch 20's landed summary has it.

### What every agent of run 2 reads first

This run is climb batch 21b, the second of the two runs of the record CLIMB-BATCH-21.md, after climb batch 21, which landed rungs S, B and N, and V unless the curator held P-157 (then nothing in its place, or the checker rung of V's other branch), toward the checker at a true zero with every symbolic operator checked (P-155). Its three rungs: C, the full check: the overloading checker's three loops read every symbolic operator, with the AnyList crash repaired, an api's operator set counted once, and the prelude's invalid = repaired; E, the api aligned with its component and the export check brought to the specification's rule (rows 800 to 802); D, the team demos running under walk (P-79), all 52. The distance and the count stand as climb batch 21's gate left them (compile-ladder/climb-batch-21/gate/). By the planner's measurement of both runs' library text, the distance stays 5 (13 if V was dropped and nothing landed in its place) and the count 3 with every operator checked, nothing come, and the export error goes from 43 entries to 20 by the api's lines alone. C and E change the checker and make P-148's speed pass; D runs neither stage. No two rungs share a file. ant testSpecData runs in the gate because the landed summary has it.

### Before the launch

The coordinator, for run 1:
1. Questions 1 and 2 put to the curator, one per message, and his word on P-157 on probe A1's result (V kept, dropped, or replaced by the checker rung of its other branch); the record's other forks taken at their defaults under the standing go (the `coordinator` skill's `references/batch.md`, "The go"), after the Fable review of the record in place.
2. The briefings checked on the base: `python3 -B explorations/compile-ladder/plan-21/manifest/lists21.py --run 1`, every key matching one place. The block generated and spliced: `python3 -B explorations/compile-ladder/plan-21/manifest/gen21.py --run 1` (with `--without V` if V is dropped), then `node explorations/compile-ladder/plan-21/manifest/check21.js --run 1` (the same), which splices it into a scratch copy and checks it; then `check21.js --run 1 --write`, `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. The base is `main`'s head after that commit, its full hash, passed as `args.base`.
3. The base build at `/home/user/fortress-base21`, which is at `aa5ff2423`: it serves if the base differs from it only in record files (`git diff --stat aa5ff2423 <base> -- Library ProjectFortress Specification build.xml bin` empty); otherwise a new one at the base, as the manual's "Before the launch" steps 2 and 3 give it. One trial seed and one `old-fortress.sh` run of `BooleanOps.fss` from the main tree prove it.
4. `compile-ladder/plan-21/probes/` and the probes' patches (`perf-probes/symbolic-operators-2/`) on `main`.
5. `df -h /` against four seeded worktrees (about 206 MB each), the base build, and the stages' scratch folders; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`.
6. Check-ins armed for the run's length, about 3.5 hours, 45 minutes apart; a run stopped by the session's process stop is resumed with `resumeFromRunId`.

For run 2, after run 1's landing and its routing: the steps of "The two runs", above; the count stage's reading of a library that does not parse fixed on `main` with its test (fork 21), as `c21177829` did for the distance stage; then steps 2 to 6 with `--run 2`, a base build at run 2's base (`/home/user/fortress-base21b`), three seeded worktrees, and about 4.5 hours of check-ins.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 2>', baseBuild: '/home/user/fortress-base21'}})` for run 1, and the same with run 2's base and `/home/user/fortress-base21b` for run 2. The arguments of each are kept byte for byte in the session's scratchpad, as `batch21/launch-args.json` and `batch21b/launch-args.json`, since a resume needs them.

### The briefings, rung by rung

Each key is a `facts-extract.sh` key, read whole by the worker first; a key marked (check) is also read by the skeptic, a judge and a repair round. The reasons are in `lists21.py` and rendered at the end of the worker's brief. SO is the symbolic-operator probe, `perf-probes/symbolic-operators-2/REPORT.md`, with its files beside it; EX the export probe, `perf-probes/export-check-full/REPORT.md`; WC the walk probe, `perf-probes/walk-conditional-extension/REPORT.md`; TD the demos probe, `perf-probes/team-demos/REPORT.md`; TJ the Fable judgement of the curator's type decisions, `reviews/type-decisions-review/judgement.md`; all under `explorations/`; REC this record.

- **S**, 20 keys, 8 checks, about 18K tokens: P-155 (check), P-27; F-245 (check); ledger 585 (check), 784 (check), 611 (check), 584, 545; SO "0. In short", "1.1 The shadow", "1.2 The families", "2. The known fixes (step 2)" (check), "3.3 Everything together"; `known-fixes.py` (check), `run-shadow.sh`; REC "The planner's probe" (check); the code of juxtaposition's top-level operators, the api's `String`, and `EmptyString`; the test `XXXFunctionalMethodMeetOperator` whole.
- **B**, 26 keys, 13 checks, about 38K tokens: P-156 (check), P-42 (check), P-56, P-155, P-148 (check); F-245; ledger 783 (check), 584; SO "3.1 Subscripts over an unbounded index type (row 783)" (check); `subscripts-index-bound.patch` (check), `checker-tupleindex.patch` (check), `walk-tupleindex.patch` (check); `plan-21/probes/checker-tupleindex-exclusion.patch` (check); REC "Question 1, consequential: where the trait Index stands" (check) and "Question 2, consequential: whether BoundedRange's narrowed atMost goes" (check); TJ V2 and "2. Batch 21's three type items" (check); `types-vals-vars.tex` "Tuple Types" (check), `future.tex` "Traits and Objects", `changes.tex` "The implicit bound of a type parameter"; the code of `TypeAnalyzer`'s `pSubInner` and `pExcInner`, `FTypeTuple.subtypeOf`, the desugarer's `rewriteExtendsClause`, and the api's `Indexed` and `BoundedRange`.
- **V**, 11 keys, 4 checks, about 12K tokens: P-157 (check), P-88, P-146; F-245 (check); SO "3.2 A vector plus a number beside a vector plus a vector" (check); `vector-not-additive-group.patch` (check), `designs.py`, `run-shadow.sh`; TJ V1; the code of the api's `HasRank` and `Vector`.
- **N**, 15 keys, 5 checks, about 13K tokens: ledger 793 (check), 794 (check), 774; P-27, P-154; TJ V3; WC "3.2 The respellings, and what they clear", "7. Defects" (check); `opr-overview.tex` "Comparisons Operators"; the code of `Array1`, `Map`, the library's `=/=` and `List`'s header; the tests `XXXArray2SliceAtNonzeroBase` (check) and `XXXArray3SliceAtNonzeroBase` (check) whole.
- **C**, 22 keys, 10 checks, about 22K tokens: P-155 (check), P-148 (check), P-151, P-45; F-245 (check), F-251; ledger 584 (check), 775 (check), 789, 726 (check), 611, 782, 481; SO "1.1 The shadow", "1.3 The crash" (check); `checker-full-check.patch` (check); `plan-21/probes/prelude-full-check.patch` (check); REC "The compiled path under the full check" (check); the code of `checkOverloading`, `isDeclaredName`, `checkCC` and the prelude's `GeneratorZZ32`.
- **E**, 17 keys, 8 checks, about 18K tokens: P-27, P-90, P-148 (check); ledger 800 (check), 801 (check), 802 (check), 782; EX "In short", "3.1 4h, 66" (check), "3.2 4i, 8" (check), "4.3 Each new error", "6. Defects found on the way"; `plan-21/probes/run2-api.patch` (check); `apis.tex` "Component and API Identity" (check); the code of `equalFnHeaders`, `allAbstractsMadePublic` and `equalLValue`.
- **D**, 16 keys, 7 checks, about 30K tokens: P-79 (check), P-74; ledger 791 (check), 670 (check), 449, 464, 468 (check), 710 (check); TD "In short", "1. How it was run", "3.1 Demo by demo" (check), "5. Defects, and the draft ledger rows", "6. Decisions"; `demos-repairs.patch` (check); REC "The demos on the first run's text"; `Library/Generator22D.fss` whole.

### The gate, and what it should show

**Run 1.** The comparands are climb batch 20's `summary.txt`, `checker-count.txt` (3) and `distance.txt` (5), with `distance-sites.tsv`.
- `testSystem`: 668, the comparand's sum (162, 171, 162 and 173 over the four shards), plus S's guard, B's walk test, V's guard and N's expected failure and guard; the two promotions and fork 5's respelling move nothing.
- `testFast`: the compiler track 1,282 plus B's compiled test, if any; the library track 86; the other-compiler track 263; the misc track's tests as landed.
- `testSpecData`: 130 green.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: no rung declares a move; S, B and V change an api the compiled path can read, a point to report.
- The checker count: reported, not declared; 3 by the planner's measurement.
- The distance, reported and never red: 5, the same five sites; the export error's 43 entries, `String`'s narrowed.
- microGPT's quick pair at the commit stage, both programs `ALL PASS`, 7 of 7 each (P-30; 47 s and 41 s at batch 20).

**Run 2.** The comparands are climb batch 21's tables.
- `testFast`: the compiler track 1,282 plus C's and E's compiled tests, with row 726's expected failure promoted and any test fork 16 respells; the library track 86; the other-compiler track 263.
- `testSystem`: run 1's sum plus D's test.
- `testSpecData`: 130 green.
- The count: 3, `#crash none`; the distance: 5 (13 if run 1 dropped V and landed nothing in its place), `#crash none`, every symbolic operator now checked; the export error's entries 43 to about 15.
- microGPT's quick pair: both `ALL PASS`.
- A repair after the review or the gate runs the gate again only when it changed a path the gate reads (`ProjectFortress/` but test files, `Library/`, `build.xml`).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather, in the order it applies the rungs; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`. Rows opened by plan: NEW-N-1, the `=/=` defect (N); NEW-C-1, the `AnyList` crash, and NEW-C-2, the double count (C). Rows the rungs close, each as its test passes on the merged tree: 585 and 784 (S), 783 (B), 793 and 794 (N); 584, 726, NEW-C-1 and NEW-C-2 (C), 800, 801 and 802 (E), 791, 670, 449, 464, 468 and 710 (D). Notes: 611 and 584 (S, B, V, C), 774 (N), 775 (C), 782 (E). Where `ledger.py` refuses a note for length or a closed row, the gather lists the text for the coordinator.

### After the landing

After run 1: the landing report; the routing of every item for the curator into PLAN, questions 1's and 2's answers and this record's forks of run 1 among them; P-155's, P-156's and P-157's "Still to build" narrowed, and row 774's wait written into P-154's; FACTS consolidated (F-245 by S, B and V); the skill writer's task; the post-batch review; then "The two runs" for run 2. After run 2: the same, P-155's and P-79's lines narrowed; FACTS (F-245, F-53, the export error's entries); batch 22's lists: row 731, item 46's arm, the export error's 25 differences and its `Maybe` and `String` entries, row 731's demo half, row 782, row 774 when walk runs the checker or row 364 is fixed, and A1's checker change if the curator takes it and run 1 did not carry it in V's place.

## 6. Files cited, with their links

- Records: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-20.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-20.md), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md), [climb-batch-workflow.js](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.js), [batch 20's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-20/gate/summary.txt), [the per-site list](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/gate/distance-sites.tsv).
- Probes: [the symbolic-operator probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/symbolic-operators-2/REPORT.md), [the export probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/export-check-full/REPORT.md), [the walk probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/walk-conditional-extension/REPORT.md), [the demos probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/team-demos/REPORT.md), [the immutable-arrays probe](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/immutable-arrays/REPORT.md); the planner's [full-check-base.tsv](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-21/probes/full-check-base.tsv), [run1-text.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-21/probes/run1-text.patch), [run2-api.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-21/probes/run2-api.patch), [prelude-full-check.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-21/probes/prelude-full-check.patch) and [checker-tupleindex-exclusion.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-21/probes/checker-tupleindex-exclusion.patch).
- Library: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi), [String.fss](https://github.com/palimondo/fortress/blob/main/Library/String.fss), [List.fsi](https://github.com/palimondo/fortress/blob/main/Library/List.fsi), [QuickCheck.fss](https://github.com/palimondo/fortress/blob/main/Library/QuickCheck.fss), [CompilerLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/CompilerLibrary.fsi), [Generator22D.fss](https://github.com/palimondo/fortress/blob/main/Library/Generator22D.fss).
- Checker: [OverloadingChecker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala), [TypeAnalyzer.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala), [ExportChecker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala), [PreDisambiguationDesugaringVisitor.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java); the code generator's [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java).
- Walk: [FTypeTuple.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeTuple.java), [BuildEnvironments.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java).
- Specification: [types-vals-vars.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/types-vals-vars.tex), [traits.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/traits.tex), [future.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/future.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex), [apis.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/components/apis.tex), [objects.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic-lib/objects.tex).
