<!-- DRAFT, CONTENT ONLY. The record of climb batch 16, the next batch of the plan's phase 3, "the checker at a true zero", for the coordinating session, the curator and the batch's workers. Reviewed in place on 2026-10-15 by the top-tier review (`coordinator/climb-batch-16-review.md`, one reason per change) against `main` at `b24e0770b`, whose one commit since the draft touches only `BOOT.md`; the review cut row 697 from rung W (its repair reaches the library's `distribute` pair, section 4), made the coordinator's call 6 concrete on the team's two `Maybe` tests, and corrected the records of rungs S, H and K as that note says. Drafted 2026-10-15 by a planning worker against `main` at `3f072048a`, whose `Library/`, `ProjectFortress/`, `Specification/`, `Documentation/`, `build.xml` and `bin/` are those of `3cf18a2b3`, climb batch 15b's gate commit (`git diff --stat 3cf18a2b3 HEAD` over them is empty), so 15b's landed tables and the per-site list describe the base. It launches on the standing go for phase 3 once its one question has an answer or its default (the `coordinator` skill's `references/batch.md`, "The go"). Section 5 holds the manifest's fields, which `explorations/compile-ladder/plan-16/manifest/gen16.py` reads. Sources: PLAN.md, "Where we stand", "The principle for the batches", phase 3 item 14 and the rows with no batch named, and the lists "Climb batch 15, listed for his review" and "Climb batch 15b, listed for his review"; climb batch 15b's gate (`compile-ladder/climb-batch-15b/gate/`) and its RECORD.md; the per-site list (49 rows); `reviews/batch-15-review.md` section 1; `coordinator/CLIMB-BATCH-15.md` section 4; `coordinator/climb-batch-15-review.md`; the checker-speed probe `perf-probes/checker-speed-2/REPORT.md` and its `SKEPTIC.md`; POSITIONS and FACTS by number; the ledger rows; the code at the sites. P-148's lines, which the planner's brief said were not yet in the batch script's prompts, landed in them before this draft (`dc06efbbc`, `36f7db77c`); each checker rung's section still states what P-148 asks, as the brief asked. No probe and no build: nothing run but greps, the extract tool on the ledger rows, POSITIONS and FACTS, and the generator's checks. Counts are by row and line (row 577). One line per paragraph. -->

# Climb batch 16

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. It runs a program without static types. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode.
- **The one library** is the interpreter's library (`Library/`, `ProjectFortress/LibraryBuiltin/`). At the **switch-over** the compiled path takes it over.
- **The distance** is the number of errors the checker reports on the one library. Each error has a **site** (a file and a line).
- **The count** is the checker's errors on the library's apis and its `FortressLibrary` component, read by the **count stage**, which also gives the checker's time. Since climb batch 15b nothing stops it, so the count is the component's own errors.
- A **row** is an entry of the gap ledger, cited by number. An **item** is a numbered question in PLAN's list "Pavol's answers" or the review queue.
- A **rung** is one fix, built by one worker in its own copy of the tree and checked by a second worker, the skeptic. A **batch** is a few rungs, merged and tested together by the **gate** and landed at once.
- **Test first.** Every fix starts with a test that shows the defect, seen failing before the edit and passing after. An **expected failure** is a test named `XXX...` that passes while the defect is there; when the fix lands it is **promoted** to a plain name.
- **P-148**, your rule of 14 October: a rung that changes the checker times the count stage before and after its change, then makes a second pass that makes the checker faster without changing what it accepts, refuses or says.
- An **identity hash** is a number the JVM gives an object the first time it is asked for one. It depends on what ran before, not on the object, so anything ordered by it can change order between two runs.
- A **memo** keeps an answer the checker computed, so that the same question asked again is answered at once.

### Where the distance stands

- After climb batch 15b the distance is 49 and the count 39 (`compile-ladder/climb-batch-15b/gate/distance.txt`, `checker-count.txt`; gate `3cf18a2b3`). The count stage took 325 s at that gate, beside other stages; idle, 333 s and 352 s (the probe's `SKEPTIC.md` section 4, `REPORT.md` section 6).
- The 49 by what each waits on (`reviews/batch-15-review.md` section 1; unchanged at 15b):
  - 21, the arrays: 14 bodies typed by their parent trait, 3 sizes tested in a branch, 2 export errors, row 678's `Col` and `Row` 2.
  - 12, your other open items: the integer power 6, item 38's `String` pairs 3, row 634's list half 1, item 46's fused arm 1, row 631's `embiggen` 1.
  - 12, the `where` clauses; 3, row 731 (row 425's corrected text); 1, row 488.
- **No site is free to fix.** Every one waits on your answer, a language feature not built, or a checker project. So this batch moves no site on purpose. It makes the checker faster, makes its output the same from run to run, and repairs rows outside the distance on both paths.
- What the batch does to the tables. S: nothing, by design; its test is that nothing changes. H: nothing by reading, but the order of three messages may change once, and row 488's site at `:130` may go or stay, then stays put. K: two sites move to the lines of the calls they are about (`:3405` to `:3422`, `:3411` to `:3424`), by reading; none comes or goes. W: nothing; it edits walk only, which the stages do not read.
- **The distance expected after the batch: 49, or 48 if `:130` goes with H.** **The count: 39, or 38 likewise.** Both are reported, never red.

### The rungs, two sentences each

- **S, the checker's solver faster, and a guard on the build's long methods.** About 95 % of the checker's time over the library component is the solver normalizing the same meets again and again; S makes it reuse those answers, or reduce less often, by whichever way a profile shows a gain, and proves on one full run that every reused answer equals the one computed fresh. It also adds one test that fails when any method of the build grows past the length HotSpot compiles, with today's few on an allow-list.
- **H, the syntax tree's hashes apart from the JVM's identity hashes.** Every node's hash starts from a number the JVM picks for its class, so the checker's output can change order with an unrelated edit, and row 488's site comes and goes; H starts each hash from the class's name instead. Its test is that the checker's whole output is one and the same however the JVM's numbers fall.
- **K, the checker reads a component's own abstract methods, and reports a broken bound at the call.** With your answer to Q1, refuse (P-149), the checker reads a trait's abstract functional methods as it already reads abstract dotted ones, so two duplicate declarations are refused by the checker instead of crashing the code generator (row 727), and an object that inherits an abstract method from one trait and a body from another is refused (row 572). A static argument that breaks the callee's bound is reported at the call, not at the callee's declaration (row 720).
- **W, walk's generic overload check and `if`.** Walk refuses at load two generic declarations whose domains overlap (row 373), as the checker does. It refuses an `if` on a value that is neither a `Boolean` nor a `Maybe`, which the team's own `maybeTest` keeps (row 673), and gives a user's big operator its element type through its declared result (row 718). Row 697, walk's object-type shortcut, waits (section 4): by reading, its repair would make walk refuse the library's `distribute` pair, row 433's, and every `SUM` with it.

### What the batch leaves out, and why (section 4 gives each home)

- Rows 714, 691, 444, 695 and 700, row 665's abstract half with rows 723, 725 and 728, and row 719: each needs a trace or a run the record does not hold, named in section 4.
- Row 681: its repair changes a function the solver reads, which S changes, so it waits for S to land.
- The 49 sites, rows 716, 717, 721, 722, 726, 584, 585, 712, 713, 729, 698, 699, 706, 537, 705 and 710: your answers, the switch-over or phase 5, as PLAN places them.

### Before the batch runs

- Q1 answered: refuse (P-149; section 2). This record and its generator on `main`, a review in place, the base build, the splice and the scenarios (section 5, "Before the launch").
- No probe: S and H start from the checker-speed probe of 15b; K and W from rows already traced to their lines.

### Cost

- About 4.4M tokens written, from 4.2M if no fix is contested to 5.2M if a rung goes to a judge and a repair round. A red gate adds about 0.5M.
  - Workers about 1.7M: S 0.5M (a profile, a design, an audit run, four count runs), H 0.45M (a generator change over 936 files, the identity-hash runs, both suites), K 0.45M (two checker files, three rows), W 0.3M (three rows in walk, four promotions).
  - Skeptics about 1.5M: the three checker skeptics now time the count stage themselves (P-148), about 0.4M each; W's about 0.3M.
  - The fixed roles about 1.15M, at batch 15's figures (`reviews/batch-15-review.md` section 2).
- About 7 hours at two agents at once (batch 15: 5 h 03 for four). The three checker rungs and their skeptics run about 20 count stages, 6 to 9 minutes each, and wait for an idle machine before each timed run.

## 2. Your questions, in the order they block the batch

### Q1. May the checker refuse an object that inherits an abstract method from one trait and its body from another (rows 572 and 727; review-queue item 62)?

**The question in plain words.** A functional method is declared with `self` among its parameters and called `pick(x)`. A trait may leave one abstract, with no body. Take:

```
trait A  pick(self): String  end           (* abstract *)
trait B  pick(self): String = "b"  end     (* a body *)
object O extends { A, B } end              (* declares no pick of its own *)
```

`pick(O)` has two candidates, `A`'s and `B`'s, and neither is more specific. The specification refuses `O` twice: an object must define each abstract method it inherits (`Specification/basic/traits.tex:628-633`), and a type that provides two such declarations must provide one on their meet (`Specification/advanced/overloading.tex`, "Meet Rule"; "provides" includes abstract declarations, `traits.tex:580-581`). Today the compiled path accepts `O` and runs `B`'s body, also for a call typed by `A`; walk refuses `O` at load, by its per-provider Meet check (F-142; row 572). The cause is one filter: in a component the checker reads no abstract functional method of a trait the component declares (`OverloadingChecker.scala:138-141`), while it reads abstract dotted methods (`:183-193`), where it refuses the same shape written `o.m()`. The same filter lets a trait declare `f(self, y: S): ZZ32` abstract beside `f(self, y: S): ZZ32 = 2`, two identical declarations, and the code generator then crashes on them (row 727).

**Why it comes to you.** Climb batch 8's judge chose not to read those declarations (its decision 1, way (b)), and that default is on your review list as item 62, "default left with the row". Reading them, the judge's way (a), refuses both shapes. The sources split: the specification, the type group's rules (P-26) and the team's own dotted check refuse; the team's own abstract-method check accepts, counting a body `O` inherits as the implementation (`AbstractMethodChecker.scala:94-107`, the team's lines), so the team's two checks part by the shape; Java refuses `O` too ("inherits abstract and default"); Scala accepts it, a concrete member implementing an abstract one from any trait. For row 727's single-trait shape the specification, Java and Scala refuse a method declared twice; the type group's Welterweight calculus admits an abstract and a concrete declaration at one domain (`No-Dup-Abs-Conc`, `Papers/Types/fig-meetrule.tick:14`), which P-149 does not take.

**The ways.** (a) The checker reads them, keeping today's rule that an abstract declaration implemented by a subtype's body with the same parameter types is not checked against it; rows 727 and 572 close, the code generator's crash becomes the checker's refusal. (b) Leave them unread, item 62's default; the rows stay. Item 62's other way, an abstract-method check that demands the object's own declaration, refuses row 572 only.

**Answered at 06:23 UTC on 2026-10-15: (a), refuse (P-149), and rung K builds it.** Walk refuses both rows' shapes at load and the library loads, and the Q1 probe found no type in the one library or the compiler's library that inherits an abstract functional method and a sibling's body without their meet (`explorations/perf-probes/abstract-sibling-body/REPORT.md`). K holds the line and reports if the library or the compiler's own library is refused.

### The coordinator's calls this batch builds, listed for your review

Each is settled by the record's principles and is reversible; none reverses a decision of yours. Calls 1 to 3 are the coordinator's calls of climb batch 15b, now built; calls 4 to 6 are drafted here for its confirmation.

1. **Q2 of the checker-speed probe is built as its own rung, S** (PLAN, "Climb batch 15b, listed for his review"). P-148 puts the checker's speed right after its correctness; S changes no result, which its tables, the checker's whole output and an audit of every reused answer show. The way, a memo of normalized meets shared across analyzers or fewer reductions in `Formula.and`'s fold, is the rung's, by its profile. The precedent for a shared memo is the tree's own: row 688's ground memo shares an answer that read no context across every analyzer over one trait table (`TraitTable.scala:100-115`).
2. **The skeptic's wider guard is built in S** (the probe's `SKEPTIC.md`, "For the curator", 3): one test that scans the whole build for methods over HotSpot's 8,000-byte limit, with an allow-list of today's, so that a new long method or a regenerated one turns the misc track red. Splitting today's few waits for a profile that shows them costing anything (section 4).
3. **Q3 of the probe is built, rung H: a node's hash no longer depends on the JVM's identity hashes.** The team gave the nodes' base class a counter for its hash, "a more deterministic replay than Object.hashCode()" (`nodes_util/UIDObject.java:26-34`); the revival already post-processes the generated nodes so that a rebuild writes them byte for byte (`build.xml:667-677`); javac and scalac aim at the same output from the same input, the reproducible-builds practice. The cost, named in Q3: the order of the apis' checks and of a union's members in a message changes once, and row 488's `:130` may go or stay.
4. **Row 720: a static argument that breaks the callee's bound is reported at the call** (rung K). The specification is silent on where; javac and scalac report a bound violation at the type argument's use. By reading two sites of the distance move to their calls (`:3405` to `:3422`, `:3411` to `:3424`, row 433's).
5. **K reads abstract functional methods only where the check already reads names** (rung K): operators the overloading check skips stay skipped (row 584), so `FlatString`'s api pair (row 726) and `String`'s four families (row 585) stay item 38's. Item 38's line names row 727 among "the duplicate pairs the checker skips"; after K that is row 726 alone.
6. **Walk's `if` keeps a `Maybe` clause, `Just` true and `Nothing` false, and refuses every other clause value that is not a `Boolean`** (rung W, row 673). The chapter says a clause without a binding "must be an expression of type Boolean" (`Specification/basic/expressions/if.tex:54`), and the checker refuses the rest; walk's line that takes an object named `Just` as true is the team's (`Evaluator.java:593`, `5a68404fd`), with no rule behind it, and every other object falls to the `else` branch. The team's own gated tests take a `Maybe` so: `tests/maybeTest.fss:21-22` and `tests/naturalsTest.fss:21-22` (`5a68404fd`) write `if a then` on a `Nothing` and `if b then` on a `Just`. So the call keeps a `Maybe` and refuses the rest, `object O` of row 673's program and a number or a string among them; the library's `if` clauses are `Boolean` by reading (the review's grep). The other way, the chapter's letter, refuses a `Maybe` too and respells the two tests' four lines, team lines changed. Reversible: one branch of `forIf`. Listed for your review.

### Points the batch lists for you, not questions

- **Team lines changed:** the hash line of 936 generated node classes, through the build's post-processing and the three in-repo generators, and of 21 checked-in classes outside the generated nodes that start from `getClass().hashCode()` (H); walk's `if` (W).
- **Messages that change:** the checker's api order and up to three unions printed the other way, once (H); two wellformed errors at the call's line (K); row 727's pair refused by the checker's No Duplicates message instead of the code generator's crash (K).
- **Programs walk now refuses** (W): any program, the library's included, with row 373's pair at load, or with an `if` on a value that is neither a `Boolean` nor a `Maybe`; each one found is listed with its message.
- **Where a rung holds a line** (S if the audit finds a difference, K if a library is refused, W if the library is refused at load), it lands the rest and reports.

### Questions on file that this batch does not need

Each is yours, with its home in section 4: item 38 (symbolic operators, rows 584, 585 and 726); B.worker.1's entry (row 716); C.skeptic.1 and C.skeptic.2's entries (rows 713 and 712); L.worker.1's (row 729); the arrays' item 13; items 26, 46 and 43's sites; row 710.

## 3. The rungs

Line numbers are on `3f072048a`, whose `Library/`, `ProjectFortress/` and `Specification/` are those of `3cf18a2b3`. Site counts are by reading the landed per-site list, grouped by row and line. Each rung's tests come first: written, run through the harness on the base and seen failing, and committed before the edit. A value that matters is asserted inside the test (P-103). A checker rung follows P-148, in its words: "A rung that changes the checker measures how the change affects the time that the checker needs. First the rung makes the change correct. Then it does a second pass that makes the checker faster. This pass must not change the checker's results: the checker accepts and refuses the same programs as before, with the same errors at the same places. The rung's skeptic checks the time and the results." The skill's `compiler.md`, "The checker's time", gives the steps: the count stage on the base build and then on the correct change, a pair on an idle machine in one session, then after the speed pass; the tables equal by `diff` and the whole outputs equal once the tree's path is masked, a line that differs only in order counted equal; the skeptic times the count stage on the base build and on the worker's commits and compares.

### S. The checker's solver: the same meets normalized once, and a guard on the build's long methods (Q2; the precedents of rows 688 and 730)

**The answers this rung follows.** P-148 and the coordinator's call on Q2 of the checker-speed probe, listed for review (PLAN, "Climb batch 15b, listed for his review"): pursue the solver's re-normalization of meets, with a pass that changes no result. After the walker split about 95 % of the component's typeCheck is the solver (explorations/perf-probes/checker-speed-2/REPORT.md section 2.3): inferStaticParamsHelper 96.7 % inclusive, Formula.reduce 94.8 % through tSimplify and minTypes (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:358-369, :459), TypeAnalyzer.meet 94.7 %, normConjunct 94.9 %, nearly all at its pair test (scala_src/types/TypeAnalyzer.scala:721); in the apis the overloading check holds 90.2 %, normConjunct and dExc 80.9 %. Few questions are computed again, 1.3 to 1.6 computations per distinct question; they are asked again on a vast scale and answered from memos, and Formula.and reduces after every step of its fold (Formula.scala:178-193), each step simplifying every variable's bounds again by a meet and a join. The probe names two ways: a memo of normalized meets shared across analyzers (18,608 analyzers are made over the component and 196,970 over the apis, each with its own normalize memos, TypeAnalyzer.scala:563-573), or fewer reductions in the fold. The precedent for sharing is the tree's own, row 688's ground memo (scala_src/typechecker/TraitTable.scala:100-115, 3c67d5204): an answer that read neither the analyzer's kind environment nor its cycle history, counted by contextReads, is shared by every analyzer over one trait table; the normalize memos already mark a key whose value read the context (TypeAnalyzer.scala:569-573). The guard is the probe skeptic's decision not taken, built by the coordinator's call 2: one test over the whole build for methods past HotSpot's 8,000-byte limit, with an allow-list of today's.

**What you build.**
- The speed change. Profile first, on the base build's count stage (the skill's compiler.md, "The checker's time", step 5; JFR read with the probe's program, its section 11, "Commands worked out"). Take the way the profile shows a gain for: one of the probe's two, both, or one you find. List every way you weigh with what you measured for it.
- Its correctness is that nothing changes. A reused answer is right only if its key holds every input the answer read: the trait table, the analyzer's kind environment (bounds of type variables, KindEnv), the cycle history (history: Set[hType]) and the negation flag where it applies. Share an answer across analyzers only where it read none of the context, as the ground memo does (readsBefore against contextReads), or key it by what it read.
- The audit (compiler.md step 7): in an instrumented copy, never in the tree, compute each reused answer again on one full count run, without the memo and in the analyzer and history where it was asked, as the ground memo's audit did (explorations/perf-probes/checker-speed/REPORT.md section 7, 0 mismatches), and compare; report the number of reuses and of differences. Any difference: fix the reuse or drop it, then run the comparisons again.
- The results. The base, change and pass tables equal by diff; the whole outputs equal once the tree path is masked, each order-only line shown and named. Your change may ask for identity hashes at other moments than the base does, so a union's members can print the other way and row 488's :130 can go, with no answer wrong (F-232). Where your audit shows no difference, report such a move with its diff as F-232's, not as a result your change made; any other difference fails.
- The time. The base and change runs are a pair on an idle machine in one session, the pass run after them; each run's seconds and the load at its start; the gain against the base, read past the 6 % two idle runs of one tree differ by. Your skeptic times the count stage on the base build and on your commits and checks the times and the results. For scale: 325 s at climb batch 15b's gate beside other stages; 333 s and 352 s idle (the probe's SKEPTIC.md section 4, REPORT.md section 6).
- The guard. A JUnit test in the misc track that reads every class under ProjectFortress/build with java.lang.classfile, as WalkerJUTest reads Walker (ProjectFortress/src/com/sun/fortress/scala_src/nodes/WalkerJUTest.java:59-76), and fails on any method over 8,000 bytes of bytecode that its allow-list does not name, naming each with its size. The allow-list is what your scan finds on the base, each entry with its size and what runs it; the probe and its skeptic found Misc.checkExprMisc 12,893 bytes, ExprDisambiguator.walk 8,518, HygienicRenamer.walk 11,599, NodeReader.readNode 14,026, and the parsers' pCharLiteralContent 23,717 in three copies (REPORT.md section 2.2; SKEPTIC.md section 5). An entry that shrinks under the limit fails the test too, so that the list stays true. WalkerJUTest stays as it is.

**Rows.**
- A new row, NEW-S-1, if your change lands a gain: the compiled checker normalizes the same meets again, about 95 % of its time over the library component after the walker split (the probe's section 2.3), in row 730's form (section 15, "Performance and program shape"; added FIXED with its commit, class implementation gap (checker), spec silent, reproducer your test). Write it in record.md; the gather adds it.
- Notes, not repairs: row 688 (your memo beside its ground memo, or why not); row 730 (the guard and its allow-list); row 488 (a move of :130 under your change, with the audit's count); row 577.

**Distance sites.** None, by design. Run the distance stage once on your final tree: its errors.tsv equal to the per-site list but for an order-only line, which you name. The count stays 39.

**Files.**
- ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala (meet, normalize, pNorm, normConjunct and their memos, :78-81, :559-735).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala (a shared memo beside the ground memo, :100-115).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala (and, :178-193; reduce, :356-457; minTypes and maxTypes, :459-463).
- Your tests: the change's under ProjectFortress/src/com/sun/fortress/scala_src/ beside FormulaJUTest and TypeAnalyzerJUTest, the guard in the misc track.
- Not: Formula.isNatTerm (:155, row 681, kept out); OverloadingChecker.scala and TypeWellFormedChecker.scala (rung K's); the AST nodes, their generators and build.xml (rung H's); walk; the library.

**Tests, first.**
- The change's test, red on the base: a JUnit test that pins what your change brings, for example a meet asked by a second analyzer over one trait table answered from the shared memo with the first's answer, or Formula.and over several formulas reducing once. Beside it a test that the reuse must not cross a context: the same meet over a type variable in two analyzers whose bounds for it differ, each answered by its own bounds; green on the base and after.
- The guard: green on the base by construction, so shown red once, for that run only, with one entry dropped from its allow-list, naming that method; record the run.
- Keep their verdicts: TypeAnalyzerJUTest, TypeSchemaAnalyzerJUTest, FormulaJUTest, ConstraintJUTest, WalkerJUTest; the compiler and library tracks.
- After the change and again after the pass: ant testQuick (compiler.md step 6); your misc-track tests through ant testOnly; the count stage three times and the audit run; the distance stage once.

**Specification.** None: no rule changes, and the text names no time. List as revival-change material every sentence your change makes false: the skill's compiler.md names WalkerJUTest as the one guard of a long method.

**Overlaps by file.**
- K edits the checker in OverloadingChecker.scala and TypeWellFormedChecker.scala; H the AST nodes, their generators and build.xml. No file is shared.
- The solver is yours alone in this batch: H's and K's second passes stay within the declarations their changes edit, and where their profiles point at the solver they say so and take nothing there.

### H. The syntax tree's hashes apart from the JVM's identity hashes (Q3; row 488; F-232)

**The answers this rung follows.** The coordinator's call on Q3 of the checker-speed probe, listed for review (PLAN, "Climb batch 15b, listed for his review"; section 2, call 3): make the syntax tree's hashing independent of the JVM's identity hashes. F-232: every node's hash starts from its class's identity hash (generateHashCode, ProjectFortress/src/com/sun/fortress/nodes/TraitType.java:103-114, in 936 generated classes; AbstractNode.hashCode caches it, nodes/AbstractNode.java:49-52), so the order of every hash map and set of nodes, the apis StaticChecker.checkApis takes in turn among them (compiler/StaticChecker.java:125), moves whenever any code asks for an identity hash at another moment. The probe's H runs, a driver copy that asks for N identity hashes before the phases: at N = 1 the api checks ran in a wholly other order and three messages printed a union's members the other way (FortressLibrary.fss:1463, :3367, :3384); at N = 1000 one did; the two instrumented runs that hash nodes lost row 488's site at :130 (explorations/perf-probes/checker-speed-2/REPORT.md sections 7 and 9). The team gave the nodes' base class a counter for its hash, for "a more deterministic replay than Object.hashCode()" (nodes_util/UIDObject.java:26-34); the revival already post-processes ASTGen's output so that regeneration is byte for byte (build.xml:667-677, 3c4dcdabc); javac and scalac aim at the same output from the same input. P-148 holds: the change is correct when the output no longer moves with the hash sequence, and your pass keeps that output.

**What you build.**
- Every hashCode under ProjectFortress/src whose value starts from getClass().hashCode() starts instead from a value the class fixes, such as getClass().getName().hashCode(), which the definition of String.hashCode fixes, and stays consistent with equals. The places, by grep: the 936 generated node classes, of which 213 have the line from ASTGen's own template in ProjectFortress/third_party/astgen/astgen.jar, so a replaceregexp in the makeAST target beside the timestamp's (build.xml:655-690) keeps the checked-in nodes equal to what the build writes, and 723, the TemplateGap, _Ellipses and _SyntaxTransformation classes, 241 each, have it from the three in-repo generators that ASTGen runs (astgen/TransformationNode.java:190, EllipsesNode.java:195, TemplateGapClass.java:204), whose lines change with them; the 18 classes of parser_util/precedence_opexpr/, checked in with no generator in the build; useful/Cons.java, useful/Empty.java and interpreter/evaluator/_WrappedFValue.java. Change each, or say why one stays.
- ErrorMsgMaker.for_InferenceVarType prints an inference variable by its id's identity hash (nodes_util/ErrorMsgMaker.java:393-399): change it if your runs show it in a stage's output, else say it does not reach one. An inference variable's id is a bare Object (nodes_util/NodeFactory.java:1166-1168, make_InferenceVarType), and the node's hash takes the id's (Fortress.ast:1061), so _InferenceVarType's hash stays an identity hash after your change: where your H runs still differ through it, give the id a counter's value there, which for_InferenceVarType then prints as it is.
- What else reads a node's hash, by reading: the code generator keys an overload set's functions by their arrow types' hashes (compiler/OverloadSet.java:135-137), so the order of its dispatch tests among cases neither more specific than the other can move once, with no result changed for a valid overloading, which the ladder's compiled files would show; NamingCzar hashes strings (compiler/NamingCzar.java:237, :245) and ForeignJava ASM types (repository/ForeignJava.java:419-429), the caches' entries are named by the source path's hash and written by NodeWriter without hashes, and walk's own orders come from FType's counters and identity hashes (row 430): none of these moves with your change.
- After the regeneration, the build writes the nodes byte for byte: run ant compileAll twice from a clean generation and compare, as the probe's skeptic did for the walker (SKEPTIC.md section 2).
- Your measure, the H runs on your tree: the count stage's driver copied into tmp/, asking for N identity hashes first (-Dprobe.hashes=N, the probe's section 9 and "Commands worked out"), at N = 0, 1 and 1000, give one table and one whole output. Their before is the probe's three runs on the base, which you do not run again. Where outputs still differ, find the next source and say what it is; if it lies outside the AST, report it and stop there.
- P-148's runs: the count stage on the base build, on the change and after the pass, the first two a pair on an idle machine in one session, the third after a speed pass that stays in your declarations. Your skeptic times the stage on the base build and on your commits and checks the times and the results. The base and change tables and outputs differ by your change's reordering: give their diff line by line, each line named as an api's place in the order, a union's members, or a site, :130 among them. The change and pass outputs are equal exactly.

**Rows.**
- Row 488, 1 site (:130): its mechanism is unknown, F-232 its lead. Close it only if your runs show its moves gone: one output under the H runs, and :130 the same with a copy that hashes nodes as the probe's audit run did (REPORT.md section 7). Otherwise write its note in record.md; its notes hold 686 of their 700 characters, so the gather lists the text for the coordinator.
- Notes, not repairs: row 430 (walk's own: FType's counters and FunctionClosure's identity hash, F-108; not yours); row 730 (the walker the probe split, which your change regenerates unchanged); row 577.

**Distance sites.** None by reading; row 488's :130 may go or stay, and three messages may print a union's members the other way, which shows in errors.tsv against the per-site list as a row gone and one come (compare.sh compares the kinds, classes, units and crash rows, not the sites, so it prints DISTANCE SAME). Run the distance stage once on your final tree and give each such pair by line.

**Files.**
- build.xml (the makeAST target, :655-690), ProjectFortress/src/com/sun/fortress/astgen/ (the three generators), ProjectFortress/src/com/sun/fortress/nodes/ (regenerated), parser_util/precedence_opexpr/, useful/Cons.java, useful/Empty.java, interpreter/evaluator/_WrappedFValue.java, nodes_util/ErrorMsgMaker.java and nodes_util/NodeFactory.java (make_InferenceVarType) if your runs need them.
- Your test, in the misc track.
- Not: the checker's Scala (rungs S and K); walk's FType and FunctionClosure (row 430); UIDObject; the library.

**Tests, first.**
- A JUnit test in the misc track, red on the base: a node's hash does not depend on the JVM's identity-hash sequence. For example, the hashes of a few nodes printed by two child JVMs, one of which asks for identity hashes first, are equal; or another form you choose, said in your report.
- Keep their verdicts: ASTJUTest, NodeFactoryJUTest, WalkerJUTest and the misc track; the compiler and library tracks; the interpreter suite.
- After the edit: ant testFast and ant testSystem once each, since both paths build nodes; ant testSpecData once, since the phases both paths run keep maps of nodes, whose order changes (P-124); the count stage three times (P-148), the H runs, the distance once; your change's ladder subset as the skill's gate.md, "The ladder regression", gives it, since a file whose output moves turns the gate red unless declared: report one at once.

**Specification.** None. List as revival-change material every sentence your change makes false: the skill's compiler.md, "The checker's time", on the identity-hash sequence and on lines that differ only in order; F-232; F-53's 2 to 4 moved errors; the coordinator skill's line that the gate's comparisons hide identity hashes.

**Overlaps by file.**
- No other rung edits the AST, its generators, build.xml or the parser's support classes.
- S and K change the checker, whose output order your change moves: their comparisons run on their own trees, without your change; the gate's tables on the merged tree are the first with all three.

### K. The checker reads a component's own abstract functional methods, and reports a broken bound at the call (rows 727, 572 and 720)

**The answers this rung follows.** Rows 727 and 572 follow Q1's answer, (a), refuse (P-149; section 2): the per-provider check reads a component's own abstract functional methods as the team's dotted check reads abstract dotted methods (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:183-193, no body filter), keeping the implemented filter (:151-156); that is reading (a) of climb batch 8's judge (explorations/compile-ladder/rung-overloading-checker/JUDGE.md section 7, decision 1), in place of (b), today's (:138-141). The rules it applies: the No Duplicates Rule, restated on the non-strict relation (Specification/advanced/overloading.tex:548-549, row 696), as the type group's 2011 and 2019 papers state it (P-26); the Meet Rule over what a type provides, abstract declarations included (traits.tex:580-581); and an object defines each abstract method it inherits (traits.tex:628-633). Row 720 follows the coordinator's call 4: an error is reported at the call whose static argument breaks the bound. K reads operators only as the check already reads names, by the coordinator's call 5: isDeclaredName and validOp stay as they are (row 584, item 38).

**Rows.**
- Row 727, no site: in a component, toFunctionalMethodArrows keeps a functional method that has a body or whose trait the unit does not declare (OverloadingChecker.scala:138-141), so f(self, y: S): ZZ32 beside f(self, y: S): ZZ32 = 2 in one trait passes, and the code generator stops: 'Likely bug in static analysis, apparently malformed overload set not rejected' (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:409-411). The repair: drop the body condition for a functional method of a trait the unit declares, the implemented filter kept, so a type's set holds its abstract functional methods as toMethodArrows holds abstract dotted ones. An abstract f(self, y: S) beside a concrete f(x: S, self) then meets row 707's check, which reads any self positions. The top-level set reads declarations with a body (getFunctions, :80-104); every top-level function of a component has one.
- Row 572, no site: SkAbsConc (rung-overloading-checker/SKEPTIC.md section 4): A's abstract pick(self) and B's concrete one, object O extends { A, B } with none of its own. With A's declaration read, O provides pick at A and at B and none on their meet, which the check refuses as it refuses the dotted twin SkAbsConcDot, 'Invalid overloading of m in trait O'. Walk refuses O at load, 'Invalid overloading of pick in O' (F-142): not yours.
- Row 720, two sites move: the well-formedness walk reports a static argument that breaks its bound at the type node (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:148-170, the error at :158-165), and the type of a call keeps the spans of the callee's declared type, so the reproducer's two errors name its line 11, the callee's result, not the call on line 16 (explorations/perf-probes/checker-bound-defects/repro/FactoryUnboundedCaller.fss). The repair: report at the nearest enclosing expression wherever the type node's span lies outside it; the way is yours, with the ways weighed. By reading two wellformed sites of the distance are this case: 'Ill-formed type: MaxSumReductionPair[\T\] ...' at Library/FortressLibrary.fss:3405 and the MinSumReductionPair one at :3411 are the objects' declarations, and the calls are at :3422 and :3424 in SumReduction's distribute; the sites at :3421 and :3423 are parameter types written there and stay. Grep the per-site list for any other.
- The guard: the compiler's own library, which every compiled test compiles against, and the one library. If your row 727 repair refuses a declaration of either, report it; a refusal in the compiler's library turns the compiler track red, so then do not land rows 727 and 572's line: land row 720, and report the declarations and messages. The compiler's own library declares abstract functional operators in its api (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37-40, abstract opr || and others), symbolic and api-side; with the filter lifted, the Q1 probe found the count and distance stages unchanged and neither row's shape in either library (explorations/perf-probes/abstract-sibling-body/REPORT.md), so that track should stand; the one library declares such methods in 18 files, 61 in FortressLibrary.fss, so your distance run decides for it. Walk refuses both rows' shapes at load and the library loads, so the one library holds neither; your distance run, which reads the component's overloading with your repair in, confirms it; report any it shows. The judge's note on reading (a), that each per-provider site of an api would appear again in its component, finds nothing: the apis' checks report 0.
- Notes, not repairs: row 584 and row 726 (FlatString's api pair, symbolic, still the code generator's stop; an api error would stop the count stage before any component, compiler/phases/TypeCheckPhase.java:45-46); row 707; row 433 (its two sites' new lines); row 577.

**Distance sites.** The count stays 39: the count stage does not reach the component's overloading check while its typecheck errors stand (F-42), and row 720's repair moves two sites without adding one. The distance stays 49, :3405 and :3411 at their calls by reading; a site that comes from row 727's repair is a point to report. Run the distance once on your final tree, before from climb batch 15b's landed tables. P-148's runs, as the skill's compiler.md, "The checker's time", gives them: the count stage on the base build before your edit and on your correct change, a pair on an idle machine in one session; then a speed pass that stays in your two declarations, and the count stage again; the change's and the pass's tables equal by diff, and their whole outputs equal once the tree path is masked, a line that differs only in order counted equal; each run's seconds and load in your report. Your skeptic times the stage on the base build and on your commits and checks the times and the results.

**Files.**
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala (toFunctionalMethodArrows, :135-160, only).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala (walk, :101-231, and a helper).
- Specification/appendices/changes.tex: the Effect's sentence on row 727 in "Overloading with static parameters" (:2622-2627).
- New and rekeyed files in ProjectFortress/compiler_tests/.
- Not: isDeclaredName and NodeUtil.validOp (row 584); AbstractMethodChecker.scala (item 62's other way); TypeAnalyzer.scala, TraitTable.scala, Formula.scala (rung S's); the code generator; walk; the library; the AST.

**Tests, first.**
- Row 727: XXXNoDuplicatesRuleAbstract is keyed on the code generator's stop. A refusal at compile time stays an XXX compile test (the skill's tests-writing.md, "Writing an XXX test"): rekey it to the checker's refusal, and beside it write the pair abstract f(self, y: S) beside concrete f(x: S, self), keyed the same. Each says 'Saw wrong failure' on the base.
- Row 572: SkAbsConc as an XXX compile test keyed on the checker's refusal; on the base it compiles, which the harness reads as a failure of an XXX compile test. SkAbsConcDot as a compile test of the dotted refusal, green before and after.
- Row 720: from the reproducer, an XXX compile test keyed on the error at the call's line; on the base, 'Saw wrong failure', the error naming line 11.
- Keep their verdicts: XXXNoDuplicatesRuleSelfPositions and XXXNoDuplicatesRuleSelfPositionsPlain (row 707), XXXNoDuplicatesRule (dup's pair), XXXNoDuplicatesRuleSelfPositionsOperator (row 726, still the code generator's), FunctionalMethodMeet*, the OverloadTwoBounds* tests.
- After the change and again after the pass: ant testQuick; the count stage three times; the distance once.

**Specification.** No normative sentence changes: the No Duplicates Rule, the Meet Rule and the traits chapter already refuse both shapes. The Effect's sentence "It checks no overloading of an operator whose name is not a word of capitals (row~584 ...), and reads no abstract functional method of a trait that the component it checks declares (row~727): ... and only its code generator refuses them, as a malformed overload set (rows~726 and~727)." (Specification/appendices/changes.tex:2622-2627) becomes half false: correct it to what the checker then does (P-95, P-96). The next sentence, on row 373 (:2628-2631), is made false by rung W and corrected by the gather after your hunk: do not edit it. List every other sentence your change makes false, F-80's "Unchecked" among them, as revival-change material.

**Overlaps by file.**
- S edits the checker in TypeAnalyzer.scala, TraitTable.scala and Formula.scala; you in OverloadingChecker.scala and TypeWellFormedChecker.scala. Your second pass stays in your two declarations.
- Specification/appendices/changes.tex: you alone edit it; the gather corrects rung W's sentence after yours.
- ProjectFortress/compiler_tests/: yours alone.

### W. Walk's generic overload check at load, its if, and a user big operator's declared result (rows 373, 673 and 718)

**The answers this rung follows.** The overloading chapter's rules as the type group's 2019 paper tests them (P-26), made tests by climb batch 14's rung P (explorations/reviews/popl2019-examples.md, A6, B4), whose expected failures gate row 373: declarations may differ in their static parameters, each domain read over its own instances, as the checker reads them (P-45). An if clause without a binding must be a Boolean (Specification/basic/expressions/if.tex:47-56); walk keeps a Maybe clause, which the team's own tests take, and refuses every other value that is not a Boolean, by the coordinator's call 6. Row 718: a type parameter that nothing at a call fixes takes its bound, constrained by the call's static return type (P-48), and walk reads a big operator's declared result for that only where it is named BigReduction, Comprehension or BigOperator (F-228); a user's declared result reaches the same through its BigOperator supertype. Read each row against its row first: their lines cite older commits.

**Rows.**
- Row 373: two generic declarations are read at one instantiation, so p1.excludesOther(p2) (:454) finds P[\T\] and Q[\T\] excluding, and o[\T\](x: P[\T\]) beside o[\T\](x: Q[\T\]) runs one of them for an object extending P[\ZZ32\] and Q[\String\]. Two generic declarations keep this check (validOnDeclaredDomains, :730-760, returns false for them). The repair: read each declaration's domain over its own instances, its static parameters renamed apart, as the checker does. XXXGenericBoundsNoMeetWalk (A6) and XXXNoDuplicatesRuleWalk (B4), each keyed 'at least one pair of parameters must have excluding types', are its expected failures; run the row's own program too.
- Row 673: forIf (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:582-609) takes an object whose type is named Just as true (:593, the team's line) and any other object as false, refusing only (), a tuple or a function. The team's own gated tests take a Maybe so: ProjectFortress/tests/maybeTest.fss:21-22 and tests/naturalsTest.fss:21-22 (5a68404fd, no .test file) write if a then on a Nothing[\ZZ32\] and if b then on a Just[\Boolean\](true). The repair, by the coordinator's call 6: a Boolean by its value; a Maybe by whether it holds, Just true and Nothing false, by its type or its holds getter as you choose; every other value refused, 'If clause did not return boolean', a number and a string among them (the row's note). The library's if clauses without a binding are Boolean by reading (every bare identifier and call so tested is declared or returns Boolean); any library line, team test, demo or specification example that takes a value that is neither as a clause is a point to report. XXXIfClauseObjectWalk is its expected failure; its load_exception_contains key stays, since the if initialises a top-level variable.
- Row 718: resultArgOf (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:277-297) reads the element and result types only off a declared result named BigReduction, Comprehension or BigOperator, so opr BIG CATOP[\T\](): CatOperator[\T\], with trait CatOperator[\T\] extends BigOperator[\List[\T\],...\], gets no hint, T takes Any, and __replay's cast throws CastError. The repair is the row's: read the declared result's BigReduction, Comprehension or BigOperator supertype, its static arguments substituted. XXXUserBigOperatorResultTraitWalk is its expected failure.
- The guard on row 373: any library, team-test, demo or specification-example declaration your repair refuses at load is a point to report; if the library is refused, do not land the line, land the rest and report the pair and the message. The microGPT walk check runs only at the commit stage, where it holds nothing: read the model's components (explorations/run-c4/src/, explorations/apl/mg/) for a generic pair or an if on a value that is neither a Boolean nor a Maybe, and report what you find.
- Notes, not repairs: row 697 (not yours: its repair, an object type excluding only a type it is not below, would make walk compare the return types of SumReduction's distribute pair with ActualReduction's, row 433's, which are not below each other, so every SUM would stop; section 4 of the record; its expected failure XXXReturnRuleObjectParamWalk keeps its verdict); row 444 (its expected failure XXXDottedMethodMeetBothBodiesWalk keeps its verdict; its site, by reading: Constructor builds one OverloadedMethod of an object's inherited and declared methods of one name, values/Constructor.java:383-388, whose pair analysis, OverloadedFunction.java:242 through :1333-1338, compares the parameter lists without the receiver); row 549 (one generic declaration beside a plain one at its bound, the other half of the Appendix I sentence on row 373); row 716 (an empty clause form no declared type directs, not yours); row 577.

**Distance sites.** None: every path you change is under walk's evaluator, which neither stage reads; run neither.

**Files.**
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java (OverloadComparisonResult's generic case, :454, and validOnDeclaredDomains, :730-760, as row 373 needs; not the object-type shortcut at :432-433 and :486, row 697's).
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java (forIf, :582-609).
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java (resultArgOf, :277-297, and a helper beside it).
- Promoted files in ProjectFortress/tests/.
- Not: Constructor.java's coverage check; the checker; the library; Specification/, whose four clauses on rows 373 and 718 (below) the gather corrects after rung K's hunk: give each its corrected text in REPORT.md.

**Tests, first.**
- The four expected failures, each turned to 'Missing expected failure' by your repair, then promoted to a name by topic: XXXGenericBoundsNoMeetWalk and XXXNoDuplicatesRuleWalk (373) and XXXIfClauseObjectWalk (673), each with its load_exception_contains key kept; XXXUserBigOperatorResultTraitWalk (718), which has no .test file and is promoted by its rename alone.
- Beside row 673, a walk test of an if on a number and on a string, asserted refused, red on the base; an if on a Nothing and on a Just stays as the team's maybeTest runs it. Beside row 373, a generic pair whose domains exclude, asserted to load and dispatch, green before and after.
- Keep their verdicts: F-145's load tests; TwoTraitsNoMeetWalk, DispatchCrossingMeetWalk, DispatchSymmetricSortedWalk, GenericBoundsMeetWalk; XXXDottedMethodMeetBothBodiesWalk (444) and XXXReturnRuleObjectParamWalk (697); maybeTest and naturalsTest; the Unwritten*Walk tests and UnwrittenListMapComprehensionWalk (F-228).
- After the edit: ant testSystem once, and ant testSpecData once, since a specification example that walk now refuses at load turns the gate red (P-124).

**Specification.** No normative sentence changes: the chapter's static parameters and the if chapter already say what walk then does, but for the Maybe clause walk keeps, which reads past if.tex:54's letter as the team's line did: name it as revival-change material. Four revival clauses become half false, which the gather corrects after rung K's hunk: the Appendix I sentence on row 373 (changes.tex:2628-2631), and the three on row 718, changes.tex:1128-1132 (the Effect of "Reductions whose element type nothing fixes"), :2095-2097 (the Effect of "The inference of a call's static arguments") and Specification/basic/inference.tex:394-398 (the chapter's revision box, :342). Give each its corrected text in REPORT.md. List every other sentence your change makes false, F-145 and F-228's "left open" among them, and the skill's, as revival-change material.

**Overlaps by file.**
- You alone edit walk in this batch.
- K edits the sentence before yours in changes.tex; your four clauses are the gather's.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another rung of the same batch (PLAN, "The principle for the batches"). S is the solver: TypeAnalyzer's meets, normal form and memos, TraitTable's memo, Formula's fold and reduction. H is the syntax tree's hash lines, their generators and build.xml's makeAST. K is the overloading check's per-provider set and the well-formedness walk. W is walk's generic pair check, if and big-operator hint.
- No two rungs share a source file. Specification/appendices/changes.tex is K's alone; W's sentence there, the next after K's, goes to the gather's corrections after K's hunk lands.
- The solver is S's alone. H's and K's second passes under P-148 stay in the declarations their changes edit; where a profile shows the gain in the solver, they say so with its top frames.
- S, H and K each time the count stage, and their skeptics time it again. Two agents run at once, so each waits for another tree's java to end before a timed run, for up to 30 minutes, as the skill gives it; the scatter starts W beside S so that the first pair holds one checker rung.
- H moves the order of the checker's output; S's and K's comparisons run on their own trees without it. They meet in the tracks, H's nodes reaching every phase on both paths, and in the interpreter suite with W. The gate measures and runs the merged tree.

## 4. What the batch leaves out, each with its home

**Kept out for want of a measurement.** Each needs a trace or a run the record does not hold; none blocks a rung.
- **Row 714,** a call whose type parameter has a bound naming itself and that no argument fixes, refused: not traced. A trace of the checker's choice rule at such a parameter. Home: a checker rung once traced.
- **Row 691,** a generic call with more arguments than parameters accepted: no reproducer and no trace. Home: a checker rung once traced.
- **Row 444,** walk's check of a dotted method inherited beside one an object declares: its site is not located. A trace from XXXDottedMethodMeetBothBodiesWalk into Constructor's provided sets. Home: the next walk rung.
- **Row 665's abstract half, with rows 723, 725 and 728:** the logging build of walk's check at each generic declaration under coverage, over the suite and the demos, that climb batch 15's section 4 names. Row 725 alone would make the checker accept the objects walk refuses at load (row 723), against P-147's agreement of the two paths. Home: the next walk rung, with the checker's half.
- **Row 719,** a comprehension over a long sequential generator overflowing walk's stack: the fix's shape, an iterative cata or a balanced join in CovariantCollection, run against `<| i MOD 7 | i <- seq(0#50000) |>` and the comprehension tests. Home: a library rung once probed.
- **Row 695,** the code generator's missing cast: a trace of the cast's place. **Row 700** and `Random`'s two proxies: a run at another modulus.
- **The long methods on the guard's allow-list:** after the walker split they hold 9 of 14,819 samples of the checker's profile; a gain from splitting them needs a profile of the phases that run them, walk's disambiguation and the cache reads among them, and walk's speed decides nothing (P-29). Home: the allow-list, until a profile shows one.

**Kept out by the method or a decision.**
- **Row 697,** walk's object-type shortcut (`OverloadedFunction.java:432-433`, `:486`): its repair, an object type excluding only a type it is not below, reaches the library's `distribute` pair. `Constructor` builds one `OverloadedMethod` of an object's inherited and declared methods of one name, and that constructor runs the pair analysis at once (`values/Constructor.java:383-388`, "This will pop an error if the set of defined functions is a bad overload"; `OverloadedFunction.java:1333-1338`, `:242`), as the team's comment "a hack to avoid the error of overloaded methods" (`Library/FortressLibrary.fss:3232`, `5a68404fd`) says it did. `SumReduction` declares `distribute` at `MaxReduction[\T\]` and `MinReduction[\T\]`, objects (`:3456`, `:3447`), beside `ActualReduction`'s `distribute(r: Any)` (`:3233`, `:3421-3424`); today the pair passes by the shortcut, and under the repair the object type is below `Any`, so the return types are compared, `PossibleReductionPair[\Maybe[\T\]\]` against `PossibleReductionPair[\T\]`, not below it: the checker's two return-type sites (row 433). So walk would refuse `SumReduction` at its first instantiation, and every `SUM` with it. Home: after row 433's pair, the `where` clauses (PLAN's line); `XXXReturnRuleObjectParamWalk` stays its expected failure, and W notes the row.
- **Row 681,** a static argument written with a static parameter in it, not inferred: its repair widens Formula.isNatTerm (`Formula.scala:155`), which Formula.reduce (`:427`) and the solver (`:763`) read, and which S changes around it. Home: the next checker rung after S lands.
- **Rows 717 and 719 beside row 716** (B.worker.1's entry, yours) and row 20. Row 718 is in W: its repair does not wait on that entry.
- **Rows 721 and 722 beside row 364,** walk's run-time class at a generic factory: row 364's site is not located, and row 722's repair is a library line, which would make W read the stages. Home: the next walk rung on row 364.
- **Row 430,** walk's own unstable order (FType's counters, FunctionClosure's identity hash; F-108): not H's. Home: the next walk rung.
- **Item 38's rows 584, 585 and 726** (the symbolic operators), **C.skeptic.1's and C.skeptic.2's rows 713 and 712, L.worker.1's row 729:** your answers.
- **The 49 sites:** the arrays' 21 (item 13; the export errors with decision E); your other items' 12; the `where` clauses' 12 (PLAN's line, with rows 677 and 652); row 731's 3, a checker project before the switch-over; row 488's 1, whose moves H may settle but whose error stays.
- **Rows 698** (the switch-over), **699 and 706** (phase 5's dispatcher), **537** (phase 5's code generation), **705** (closed by the switch-over), **710** (your word).
- **Row 425's citations,** to be pointed to row 731 by the next rung that edits them: no rung here does.

**What PLAN gives batch 16, and where each goes** (phase 3 item 14):
- Q2, the solver: S. Q3, AST hashing: H. The skeptic's wider guard: S; its six methods: out, above.
- The checker rows: 727 and 720 in K, with 572 by Q1; 714, 691: out, a trace; 725: out, with row 723; 681: out, after S.
- The walk rows: 373, 673, 718 in W; 697: out, after row 433's pair; 444: out, a trace; 665's abstract half, 728, 723: out, the logging build; 717, 719: out with 716; 721, 722: out with 364.
- Row 695: out, a trace. Row 700 and `Random`'s proxies: out, a run. Row 425's repointing: no rung touches its citations.
- P-148's lines: built before this draft (`dc06efbbc`); each checker rung's section states them.

## 5. How it is run

The batch runs on the workflow of batch 15 with P-148's lines: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`. Each rung's worker does its rung test first; a checker rung times the count stage before and after its change and makes its speed pass; its skeptic checks it, times the count stage itself where the rung changes the checker, and fixes what it finds, test first; a judge rules only on a fix the skeptic marks contested, on a rung the skeptic refuses, or on a worker's stop; the gather lands the rungs on `main` and folds their record lines and their ledger rows through `coordinator/tools/ledger.py`; the merged-diff review and the gate run side by side; the commit stage lands the gate's tables, runs the quick microGPT walk check and pushes. The batch writes no skill text: each rung's revival-change material goes into the batch's `RECORD.md` for the skill writer. Section 3 is each worker's brief word for word, with the answers line it opens with; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-16/manifest/gen16.py` reads with the briefings of `lists16.py` beside it, and `check16.js` checks.

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry. "Its test is the stage" means the checker count and the distance are the rung's failing-then-passing test; no rung here has that, since none is meant to move a site. "Joins the gate" names a step the gate gains once the rung lands; none does, and `ant testSpecData` runs because 15b's landed summary has it. No rung declares a checker count: S, K and W leave it at 39 by reading, and H's may read 38, which the review ties to H. The expected minutes order the scatter only: W's are set above its own estimate, about 90, so that it starts beside S and the first pair holds one checker rung. The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands (the `coordinator` skill's `references/batch.md`, "Reserved points and repairs"); only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### S
- **slug:** `rung-solver-speed`
- **worktree:** `/home/user/fortress-solverspeed`
- **expected minutes:** 150
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** under P-148 and the coordinator's call on the checker-speed probe's Q2, the compiled checker's solver reuses normalized meets, or reduces its fold less often, by whichever way a profile shows a gain, every reused answer audited on one full run and the tables and whole output unchanged; and one misc-track test fails on any method of the build past HotSpot's 8,000-byte limit not on its allow-list of today's; no site; Scala in TypeAnalyzer.scala, TraitTable.scala and Formula.scala, and two tests.
- **points to report:**
  - Each count run's seconds and load at start, base, change and pass, and the gain against the base.
  - The way taken and the ways weighed, each with its measure; the memo's key and why every input of its answer is in it.
  - The audit: reuses and differences on one full run.
  - Any difference in a table or a whole output, each line named; a move of row 488's :130 with the audit beside it.
  - The guard's allow-list, each method with its size and what runs it.
  - A checker file edited beyond the three named, or any library, walk or AST edit.

#### H
- **slug:** `rung-ast-hashes`
- **worktree:** `/home/user/fortress-asthashes`
- **expected minutes:** 130
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** by the coordinator's call on the checker-speed probe's Q3, every syntax-tree hash that starts from its class's identity hash starts from the class's name, through the build's post-processing of the 936 generated nodes, the three in-repo generators and the hand-written classes, so the checker's whole output is one under any identity-hash sequence (the probe's H runs) and row 488's site stops moving; the api order and up to three unions print differently once; no site by reading; Java in astgen/, nodes/, parser_util/ and useful/, and build.xml.
- **points to report:**
  - The H runs at 0, 1 and 1000: one output, or what still differs and its source.
  - The diff of the base and change outputs, each line named: an api's place, a union's members, a site; row 488's :130 kept or gone, and the row closed or noted.
  - Each class changed and each left, with why; whether the build writes the nodes byte for byte.
  - Each count run's seconds and load, base, change and pass.
  - A test of either suite or a specification example whose verdict or printed order changes, and a ladder file that moves.
  - Every revival sentence made false, the skill's among them.

#### K
- **slug:** `rung-checker-abstract-callsite`
- **worktree:** `/home/user/fortress-abstractsite`
- **expected minutes:** 120
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** with Q1's answer, refuse (P-149), the compiled checker's per-provider overloading check reads a component's own abstract functional methods as it reads abstract dotted ones, so row 727's duplicate pair is the checker's refusal and row 572's object is refused by the Meet Rule, operators left as row 584 leaves them; and a static argument that breaks the callee's bound is reported at the call (row 720), two of row 433's sites moving to their calls by reading; the Appendix I sentence on row 727 corrected; Scala in OverloadingChecker.scala and TypeWellFormedChecker.scala.
- **points to report:**
  - A declaration of the one library or the compiler's own library that the check now refuses, and whether rows 727 and 572's line landed.
  - The messages rows 727, 572 and 720 now print, and the error's place for row 720.
  - A count or distance site that comes, goes or moves beyond :3405 and :3411, by row and line.
  - Each count run's seconds and load, base, change and pass.
  - A compiled test whose verdict changes beyond the rows' own, or a ladder file that moves.
  - Normative text changed beyond the one Effect sentence, and every sentence made false.
  - A checker file edited beyond the two named, or any library, walk or code-generator edit.

#### W
- **slug:** `rung-walk-overload-if`
- **worktree:** `/home/user/fortress-walkovl`
- **expected minutes:** 140
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** walk's load check reads two generic declarations each over its own instances (row 373), as the checker does; walk's if keeps a Maybe clause, which the team's maybeTest takes, and refuses every other clause value that is not a Boolean, by the coordinator's call (row 673); a user big operator's declared result gives its element type through its BigOperator supertype (row 718); four expected failures promoted; no site; Java in walk's OverloadedFunction.java, Evaluator.java and EvaluatorBase.java.
- **points to report:**
  - A declaration of the library, a team test, a demo or a specification example that walk now refuses at load, with its message, and whether row 373's line landed.
  - What a reading of microGPT's components finds of rows 373 and 673's shapes.
  - A library line, team test, demo or specification example beyond maybeTest and naturalsTest whose if clause is neither a Boolean nor a Maybe, and what was kept.
  - A walk test whose verdict changes beyond the four promotions and the new tests.
  - The team lines changed, forIf among them.
  - The four revival clauses on rows 373 and 718, each with its corrected text, and every other sentence made false.
  - A walk edit beyond the three files named, or any checker or library edit.

### What every agent of the run reads first

This run is climb batch 16, the record CLIMB-BATCH-16.md, phase 3's next batch after climb batch 15b, toward the checker at a true zero. No site of the distance is free to fix: every one waits on a decision of the curator, a language feature not built or a checker project. So the batch makes the checker faster and its output fixed, and repairs rows outside the distance: one rung on the checker's solver with a guard on the build's long methods (the checker-speed probe's Q2 and its skeptic's guard, the coordinator's calls), one on the syntax tree's hashes (Q3, the coordinator's call), one checker rung on a component's abstract functional methods and a broken bound's error place (rows 727, 572 and 720, by Q1's answer), and one walk rung on its generic overload check at load, its if and a user big operator's result (rows 373, 673 and 718). The distance stands at 49 and the count at 39 after climb batch 15b (compile-ladder/climb-batch-15b/gate/), the count stage 325 s at its gate. The three checker rungs follow P-148: the count stage timed on the base build, on the correct change and after a speed pass that keeps every result, as the skill's compiler.md, "The checker's time", gives the steps, and their skeptics time it again. The rungs meet only in a measure: no two rungs change one declaration, and no rung builds on another. S edits the checker's TypeAnalyzer.scala, TraitTable.scala and Formula.scala; H the AST's generated nodes, their generators, build.xml's makeAST and the parser's support classes; K the checker's OverloadingChecker.scala and TypeWellFormedChecker.scala and one Appendix I sentence; W walk's OverloadedFunction.java, Evaluator.java and EvaluatorBase.java. The solver is S's alone: H's and K's speed passes stay in their own declarations. W's Appendix I sentence, next to K's, is corrected by the gather after K's hunk. H moves the order of the checker's output, which S's and K's comparisons on their own trees do not see. ant testSpecData runs in the gate because climb batch 15b's landed summary has it.

### Before the launch

The coordinator, in this order:
1. Q1's answer, refuse (P-149; section 2), which K builds. This record with its generator on `main`, and its review in place on the standing pre-approval of such reviews. The base is `main`'s head after them, its full hash, passed as `args.base`.
2. The base build at `/home/user/fortress-base16`, as the manual's "Before the launch" steps 2 and 3 give it (`ant compileAll`, the library order, one passing walk test, `git status --porcelain` empty), passed as `args.baseBuild`; one trial seed (`/home/user/fortress-seedcheck`, removed after) and one `old-fortress.sh` run of `BooleanOps.fss` from the main tree prove it. The checker rungs and their skeptics time the count stage on it, so nothing else builds or runs there.
3. No probe (section 1, "Before the batch runs").
4. The briefings checked on the base: `python3 explorations/compile-ladder/plan-16/manifest/lists16.py`, every key matching one place. The block generated and spliced: `python3 explorations/compile-ladder/plan-16/manifest/gen16.py`, then `node explorations/compile-ladder/plan-16/manifest/check16.js`, which splices it into a scratch copy and checks it; then the same splice into the script itself (`check16.js --write`), `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. No launch value is set by hand: the gather numbers the batch's new rows through `ledger.py add`.
5. `df -h /` against four seeded worktrees (about 206 MB each), the base build, and the count stages' scratch folders, several per checker rung and skeptic; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`.
6. Check-ins armed for the run's length, about 7 hours, 45 minutes apart, and one after the session's next predicted process stop, which the boot note names (the `coordinator` skill's `references/delegating.md`, "Watching a run"); a run stopped there is resumed with `resumeFromRunId`.

The launch: `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of the base>', baseBuild: '/home/user/fortress-base16'}})`. The arguments are kept byte for byte in the session's scratchpad, since a resume needs them.

### The gate, and what it should show

The comparands are climb batch 15b's `summary.txt`, `checker-count.txt` (39) and `distance.txt` (49), with `distance-sites.tsv`.
- `testSystem`: the comparand's sum (621: 149, 161, 150 and 161 over the four shards) plus the files W adds; a promotion moves nothing.
- `testFast`: the compiler track 1,212 plus the cases K adds; the library track 86, the othercompiler track 263; the misc track's 46 classes and 427 tests plus S's and H's.
- `testSpecData`: 130 green, run because the last landed summary has it.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: no rung declares a move; H's change of hash orders is the one that could move a file's output, a point to report.
- The checker count: 39 by reading, `#locations 38`; 38 if H's tree loses row 488's `:130`. Its time is read against 15b's 325 s, with S's change in; a pair it is not.
- The distance, reported and never red: 49, or 48 with `:130` gone; K's two sites at `:3422` and `:3424`; up to three messages with a union's members in another order, which show in `errors.tsv` against the per-site list as a row gone and one come (`compare.sh` compares kinds, classes, units and crash rows only), each tied to H by the review.
- A repair after the review or the gate runs the gate again only when it changed a path the gate reads (`ProjectFortress/` but test files, `Library/`, `build.xml`).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather, in the order it applies the rungs (its `RECORD.md` says which order and why); until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>` for its number, and the gather replaces every placeholder with the number `ledger.py` gives. The row the rungs open by plan: NEW-S-1, the solver's normalizing the same meets again, added FIXED with S's commit if S lands a gain, as row 730 was. Rows the rungs close (`ledger.py close`, after the rung's commit is on `main`), each as its test passes on the merged tree: 727 and 572 (K, under Q1's default), 720 (K); 373, 673 and 718 (W); 488 (H, only if its runs show its moves gone). Notes: 688, 730 (S); 488 if not closed, 430 (H); 433, 584, 726 (K); 444, 549 and 697 (W). Where `ledger.py` refuses a note for length or a closed row, the gather lists the text for the coordinator; row 488's notes are full.

### After the landing

The coordinator: the landing report; the routing of every item for the curator into PLAN, Q1's answer and calls 1 to 6 of section 2 among them, item 62's line and item 38's mention of row 727 brought up to date, and a PLAN line for every row the batch opens; FACTS consolidated (F-53 to the new figures and, with H, its sentence on moved errors; F-232 rewritten or retired by H; F-80's "Unchecked" made false by K; F-145 and F-228's open rows made false by W); the post-batch review, which reports this batch's measures against batches 11 to 15 as `process-engineering/batch-redesign.md`, "The measures", defines them, and the count stage's time with and without the timed runs P-148 adds; batch 17's lists, from section 4, row 681 first among the checker's.
