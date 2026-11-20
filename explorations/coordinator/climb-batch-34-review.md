<!-- The check of climb batch 34's record, `CLIMB-BATCH-34.md`, with its probe notes `compile-ladder/plan-34/probes/rehearsal.md`, before any launch and before the curator's go, by a fresh reader on Fable on 2026-11-20, by reading only: run 1's citations at their sources on `main`'s code (`95611a87c5`), each repair against the team's sources, each rung against the decisions on record, the forks, the merge, the measures and the estimate, and the section for the curator; no reproducer was run, since the session's permission mode refused every executable; one fork is named consequential (fork L1's fallback, against P-102), and the record is corrected in place. -->
<!-- Sources: the reviewer's brief; `coordinator/CLIMB-BATCH-34.md` as of `db56455c82`; `compile-ladder/plan-34/probes/rehearsal.md` and its programs; POSITIONS P-9, P-33, P-37, P-87, P-102, P-148, P-164, P-169, P-178 and POSITIONS-history's blocks of P-33 and P-178 (2026-11-17 and 2026-11-18); FACTS F-34, F-58, F-352, F-353, F-381, F-388; review-queue items 513, 514, 521, 597, 599, 601; ledger rows 818, 993, 1076, 1078, 1082, 1090; `reviews/carriers-ways-2026-11-13.md`, ways C and D; `compile-ladder/rung-number-payload-objects/REPORT.md`, fork N4; `coordinator/CLIMB-BATCH-33.md`, fork N4; `reviews/batch-33-review.md` and `batch-33b-review.md`, section 5; `coordinator/climb-batch-workflow.md` and `.js`; the `coordinator` skill, "The curator's role and decisions"; the `fortress-repo` skill; the code and the specification at the sites named below. -->
<!-- Section B8 added on 2026-11-20 by a worker on Opus that could run programs: check 2, the failing programs of rungs P, T, G and F run once on a worktree seeded from the base build `/home/user/fortress-base40` (`2676c8009c`), and the record brought in line with what the runs show. -->

# The check of climb batch 34's record before its launch

## For the curator

**What I checked.** I read the record for you, as a reader who did not write it. For run 1 (rungs L, P, T, G and F), I checked each citation at its source, each repair against the specification and the library, and each rung against your decisions. For both runs, I checked the forks, the merge, the measures, the cost and the section that is written for you.

**What I could not do.** I ran nothing. This session's permission mode refused every program: the script that makes a worktree, the script that prints a decision, and Java itself. So I did not see one test fail. Every verdict here is from reading the code and the record. The five failing programs still need one run each before the launch. That takes a session that can run programs about ten minutes.

**What I found.**

- **One choice is yours before the launch.** Rung L repairs a fault that no small program shows yet. Its worker must first find a small test that fails. If the worker shows that no such test can exist, the record's default lands the repair anyway, on the evidence of a scratch tree. That bends your rule P-102: every edit of source code starts from a failing test. Climb batch 33 put work off for exactly this reason (its fork N4). The other way: in that case the repair waits for run 2, inside rung C, where `Hello`'s run can fail first. I recommend the other way.
- **The rest of the plan holds.** The five rungs of run 1 edit separate parts of the code and can merge with no conflict. Rung C does need a run of its own. No rung changes a line of microGPT. The parts of rung C follow your decisions P-33, P-178, P-164 and P-169, and two defaults that are on your review list (items 513 and 521).
- **Two plans of repair need a sharper word before the launch,** and the coordinator can give it. Rung P's rule for choosing a declaration can pick the wrong one in one case. Rung G describes the checker as lacking a rule that it already has for methods; the gap is for getters only.
- **Two tests may not fail first as the record says.** Rung F's test fails only after the worker takes the library's line out. One of rung G's two tests may already pass today. The run before the launch settles both.
- **The cost estimate fits** the two runs of climb batch 33. Run 1: about 5.3 million tokens, 6.1 million with the reserve. Run 2: about 2.4 million, 3.0 million with the reserve. The disk has room for run 1: 13.4 GiB free, 11.5 GiB needed.

**What I changed in the record.**

- Six line numbers in the code generator's file, each one too high since the last change of the code.
- One sentence of rung G that the checker's code contradicts, and rung F's list of walk's classes, which missed `ZZ32` and `ZZ64`.
- In your section: each rung now lists its choices, with the default and the other way. The words "probe", "fork", "getter" and "label block" are defined. Rung T's title said "a value of a generic type"; it is a value whose type is a type parameter. A new line says how far the batch brings microGPT. The line "all by decisions on record" now names the two defaults among them. The disk figures are in the unit that the script uses.
- Your section and section 3 now name the choice on rung L as yours.

## The method, and its limit

Every check is a file read on `main` at `db56455c82`, whose code is `95611a87c5` (`git diff --stat 2676c8009c HEAD -- . ':!explorations' ':!docs' ':!.claude'` prints nothing). The Bash tool answered "This command requires approval" to `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base40 /home/user/fortress-rv34 -`, to `explorations/coordinator/tools/facts-extract.sh 'P-33'` and to `java -version`, and it refused to list or enter a folder outside `/home/user/fortress`. By the skill's rule (`references/session.md`, "When the automatic permission check refuses a call") I tried no other route. So:

- No worktree was seeded, and none is left to remove.
- Check 2, the reproducers, was not run. Section B1 gives what the reading shows for each rung, and the commands still owed.
- The decisions were read with `grep` on `POSITIONS.md`, `POSITIONS-history.md`, `FACTS.md` and `review-queue.md`, not with `facts-extract.sh`. The manifest's keys were not checked again with `facts-extract.sh --check`; the generator's step does that before the launch.

## A. Changes of the record that I made

Each change has one reason. None changes a heading, a key or a field of section 1, so the manifest needs no change, and the generator was not touched.

**A1. Six line citations of `CodeGen.java`, each lowered by one.** In sections P, T and F, and in "The rule the rungs keep": `assumedArgumentsCall` `:7257` to `:7256`; its call in `forFunctionalRef` `:4469` to `:4468`; `forMethodInvocation` `:7314` to `:7313`; the cast `:7405` to `:7404`; `intersectionMethodOwner` `:7602` to `:7601`; the refusal of a number type as a value `:7020` to `:7019`. Reason: `main`'s code is `95611a87c5`, which took one line out before them (`grep -n` of each member on `main`). Section 4's opening sentence and section 6, "Before the launch", step 3, now say which sections cite which code. `forLabel` `:1942` and `forExit` `:1987` lie before the change and were right.

**A2. Rung G's sentence on the checker.** The record said that a declaration below one that it inherits at the same parameter types gets no rule of return types. The checker's code says otherwise: `checkOverridingReturnType` (`scala_src/typechecker/OverloadingChecker.scala:702`) checks such a pair as an overloading (`:712-714`, by its comment at `:696-701`: "Where their parameter types are the same, the two are checked as the pair of an overloading was"). The gatherer of inherited methods holds the getters too (`scala_src/useful/STypesUtil.scala:1524`); whether the pair of getters reaches the check I could not trace by reading. The sentence now says what the code checks, and that the getter passes all the same by the planner's run, so the gap is the getter's. Reason: the sentence contradicted its source.

**A3. Rung F's list of walk's classes that set a constructor in `makeNativeObject`.** `ZZ32` and `ZZ64` were missing (`interpreter/glue/prim/ZZ32.java:37`, `ZZ64.java:31`); the list now holds them, with the `grep` that lists all, and a word on `ZZ.java` and `IntLiteral.java`. Reason: the list was given as whole and was not.

**A4. Rung T's title in the curator's section.** "A method called on a value of a generic type" is now "A generic method called on a value whose type is a type parameter", with both terms defined. Reason: section 4's T and the program have `x: F`, where `F` is a type parameter.

**A5. "The parts, all by decisions on record."** Now "each by a decision on record or by a default on your review list", with fork C1 and fork C2 marked. Reason: review-queue item 513 says of way C's form 2 for the other types "Recommended ... and not a decision" and "Also the planner's, not his"; item 521's default, files of their own, is "the planner's from its probe".

**A6. Row 994's file.** The curator's section and fork B2 said that no rung edits it. Rung P's list of files names `OverloadSet.java`, row 994's file, "if the dispatch over several is written there". Both sentences now say so. Reason: the two places disagreed.

**A7. F-34 in the record's words.** F-34 on `main` already reads "refuses 2 declarations ... the measure's script counts 1 of them". The measures' "Before", the review list's line and "For the record-landing workflow" now quote it so. Reason: they quoted F-34's older text.

**A8. The disk's unit.** The script's floor is in GiB (`climb-batch-workflow.js:417-425`). 14,181,964 blocks of 1,024 bytes are 13.5 GiB, not "14.2 G". The line now gives GiB, and today's figure: 14,024,248 blocks, 13.4 GiB, against 11.5 GiB for run 1.

**A9. Words of the curator's section.** "Probe", "fork", "default", "getter", "label block", "rung N" and "fork N4" are defined in its word list; "hacks" is "temporary fixes", the term that the section defined. Reason: each was used with no definition.

**A10. Each rung's choices in the curator's section.** Under each rung, a line for each fork with its default and the other way, from section 3: L1; P1 and P2; T1; G1 and G2; F1 with what a program that writes `ignore(FlatString)` gets; C1 to C6. Reason: the section sent the reader to section 3 for them, and he judges each rung from his own section.

**A11. How far the batch brings microGPT.** A line under the measures: after run 2 one program that prints a line runs against the one library; microGPT's arrays stop at rows 994 and 1091; then the checker stops its flat program at 42 places (F-58). Reason: the section did not say it.

**A12. The consequential fork named in the record.** "The go", "Your review list" and section 3's "The consequential fork" now say that the planner found none and that this check names one, with a pointer to C1 below. Reason: finding C1.

**A13. Row 1082 cited with its item.** Rung F's line in the curator's section names review-queue item 599 beside row 1082. Reason: the item is where his open question stands.

## B. Points for the coordinator to decide before the launch

**B1. The reproducers were not run. What the reading shows, rung by rung.** The record has no line "Seen failing on the base" in any rung's section (`grep -c 'Seen failing' CLIMB-BATCH-34.md` prints 0), where climb batch 33's sections had one each. The skeptic checks the worker's `Expected failure:` line "or the failure the section names" (`climb-batch-workflow.md:128`), so each section must name it as the harness reports it.

- **L. No test can fail first today.** The cause is not known, and the planner's two copies of the shape verify against the prelude. The test is the rung's own second product. See C1 for the fallback.
- **P. Named, and the best grounded.** `compiler_tests/XXXAsIfPartialCallCompiled.test` pins `compile_exception_contains=Can't compile a dispatched call whose arguments are not all type assumptions`, and climb batch 33b's gate passed it on this code. Promoted to a run test, it fails on the base at its compile with that message.
- **T. Named in the mission; seen by the planner by hand, not through the harness.** The cast is there for every receiver in the branch with static arguments (`CodeGen.java:7404`), so `programs/VarRecv.fss` must crash by reading. It is a Java exception of the compiler, not a refusal. The section does not say how the harness reports it.
- **G. Two tests, one not shown to fail.** The test from `programs/WidenGetter.fss` pins the checker's message; on the base it fails with the code generator's message in its place, by the planner's run. The second, under the selector, binds `n.zero` to an `NN32` and is "refused on the base ('Number' is not an `NN32`)". Nobody ran it. `NN32` has two declarations of `zero`, its own at `Number` and the inherited one at `NN32`; if the checker types the call by the inherited one, or by both, the binding compiles on the base and the test cannot fail first.
- **F. Its test fails only after the rung's own first edit.** With `ignore(FlatString)` in the library, every walk test passes on the base. The section's order is "the line taken out; a walk test ... fails". `tests-writing.md`, "The order", step 2, asks for the failing run "on the base's code" and, under walk, "before you edit a library source that the test reads". The failure itself, the `NullPointerException`, was seen by the planner in a scratch tree that held eight other temporary fixes.

Owed before the launch, in a session that can run programs, on a worktree seeded from `/home/user/fortress-base40`: `VarRecv` and `WidenGetter` compiled; the promoted form of `XXXAsIfPartialCallCompiled` through `junit.sh`; a five-line program under `FORTRESS_LIBRARY=one` with `n: NN32 = 5` and `z: NN32 = n.zero`, compiled; `Library/FlatString.fss:29` without its `ignore` and one walk test through `harness-one.sh`. Then a line "Seen failing on the base:" in each section's step 1, in the harness's words. For F, the coordinator decides whether the section names its order as its own (the line out is the test's set-up), so that the skeptic does not read it as a breach.

**B2. Fork P1's rule can pick the wrong declaration.** P1 chooses "among the declarations that are applicable when each assumed argument has its assumed type and each other argument its static type: where one is left, the call names it". A declaration that is more specific at an argument without an assumption is not applicable at that argument's static type, and can be at its run-time type. Take `pair(x: Named, y: Named)` beside `pair(x: Named, y: Leaf)`, and the call `pair(a asif Named, n)` with `n: Named = Leaf`. At the static types one declaration is left, and P1 calls it directly. The specification gives the assumption only to the assumed expression ("considers both the static and the dynamic type of the value of the expression to be the specified type", `basic/expressions/type-annotation.tex:44-47`), so the other argument dispatches on its run-time type, and `pair(x: Named, y: Leaf)` runs. Walk does so: it wraps only the assumed value (`interpreter/evaluator/Evaluator.java:109-116`, `FAsIf`). The set must hold every declaration that takes the assumed types at the assumed places and that the other arguments' static types do not exclude. The record asks for "a second case where two declarations stay applicable at the assumed types"; the case above is the one that tells the two rules apart. This is a design point of the fork, so I changed no word of it.

**B3. Fork G1's scope and message.** G1 has the checker refuse "a getter or a method" with "the message that it gives an `override` (`OverloadingChecker.scala:726`)". By A2, a method at the same parameter types is already checked, with the message of `returnTypeCheck` (`:742-743`: "the return type of ... should be a subtype of the return type of ..."). So the consistent default is the getter alone, with that message. The worker pins a message in its first test, so the fork should say which. The team's rule behind it: `basic/traits.tex:673-679` speaks of a declaration with `override`; the Subtype Rule for dotted methods (`advanced/overloading.tex:203-207`) asks for strictly narrower parameter types, which a getter does not have. The ground for the same parameter types is the Return Type Rule as the revised chapter states it (`advanced/overloading.tex:555-558`) and the checker's own check for methods. The record cites the Subtype Rule's section and `traits.tex`, "Method Declarations"; the worker should cite `:555-558`.

**B4. Fork F1's consequence reaches item 599.** After run 2, `ignore(FlatString)`, and a `Boolean` or a `Char` named as a value, are refused under the selector with row 1082's message. That is item 599's landed default, the code generator's wall, carried from the seven number types to three more. The record says so for `FlatString`. Item 599's entry should name the three after run 2.

**B5. The estimate fits, with two risks.** The record's prices are climb batch 33b's roles: W 703 thousand, R about 840, N 919, G 1,049; the fixed roles 1.31 million; the reserve's spending 0.53 million (`reviews/batch-33b-review.md`, section 5). Each figure in the record matches. Run 1 prices five rungs at 4.0 million, 0.80 million a rung, between run 1 of 33's 0.71 and run 2's 0.88. Both runs of 33 ended 21 and 24 % over their estimate without the reserve, and within 3 % of it with the reserve. So expect run 1 near 6 million, not 5.3. The risks: rung L builds a scratch library more than once and its skeptic does too in the fallback; and the skeptic's trim, new since the record, adds a build and a suite to a rung whose skeptic trims. Run 2's rung C is priced at a worker of 0.85 million, above any worker of 33 (658 thousand at most); a worker that long is likely to be compacted once. The range's top, 3.6 million, covers it.

**B6. The measures.** The first measure's "Before" is right: 2, of which the script counts 1 (F-34). The measure's patch edits `NamingCzar.java`, `FortressMethodAdapter.java`, `Naming.java` and `TraitTable.scala` only, which no rung of run 1 edits, so the script still runs after run 1 and should print 0 if nothing stands behind `__bigOperator2`. The script's header still says that the patch holds `NN32`'s two getters; it does not. The second measure, programs that run, is none on `main` (row 1062) and moves only in run 2.

**B7. For run 2's re-read.** Item 601 cites `CodeGen.java:7904` and `:4708` as sites of `FZZ32.make`. On `main` the text `FZZ32` stands in `CodeGen.java` only at `:5871` and `:5888`. Find the two sites by their members when section C is read again.

## C. A point that would change a decision of the curator's

**C1. Fork L1's fallback lands a repair with no test that fails first (P-102).** Consequential by the rule: it bends a decision of the curator's.

- P-102: "Every edit of source code in the original tree starts from a failing test. The worker adds the test to the test suite, sees it fail, makes the fix, and sees it pass."
- Fork L1: "If no test against the prelude can show row 1078's cause, the rung lands its repair with the scratch tree's evidence, its test `one_library_tests/XXXOneLibraryRunHello` written as an expected failure, which C promotes."
- On run 1's tree that expected-failure test fails at row 1062's wall, 'NoClassDefFoundError: fortress/FortressLibrary$String', before and after the repair. It does not fail for row 1078, and it does not change with the repair. So nothing in the suite shows the repair until run 2.
- The precedent on record goes the other way. Fork N4 of climb batch 33 put the one library's seven number objects off "by the rule of the test first (P-102): ... their entries would land with no test that can fail" (`CLIMB-BATCH-33.md`, section 3, item 18).
- The fallback is likely enough to plan for: the planner's two copies of the function's shape verify against the prelude (`rehearsal.md`, section 3, wall 2: "so its test needs the one library").

The options, in the record's terms:

1. **Fork L1's default as written:** "a test against the prelude first; the fallback only if the worker shows why none can be written, and the skeptic checks the repair in the same scratch tree."
2. **Fork B3's way not taken, for the fallback only:** "the repair inside C". If no test against the prelude can be written, rung L lands the cause as found and its evidence, and no edit of the code generator. Rung C then makes the repair, with `Hello`'s run with the verifier on as the test that fails first. The record's reason against it: it "would put the run's whole risk on one rung".

My recommendation is option 2: it keeps P-102 whole, as fork N4 did, and rung C's worker starts from a cause already traced. Its cost is a larger rung C. The repair can be undone under either option.

**No other fork is consequential.** One line each, by the rule of the `coordinator` skill:

- B1, two runs: not consequential; the workflow's rule, and it can be undone.
- B2, what the batch takes: not consequential; rows 994 and 1091 wait with a row each.
- B3, rung L in run 1: not consequential in itself; its fallback is C1.
- P1: not consequential; the specification and walk agree on the form (but see B2 above for its rule).
- P2: not consequential; the other forms stay refused as today.
- T1: not consequential; rung I's precedent, no decision touched.
- G1: not consequential; the checker's own rule for methods, and no program that the probe shows compiling is refused (see B3).
- G2: not consequential; a team test's changed value is reserved for him.
- F1: not consequential; it leaves item 599 open, as the record says.
- C1: not consequential; item 513 leaves the form to the builder, and way A is ruled out by the item's correction of 2026-11-16 (`Boolean` and `Char` "stay so").
- C2: not consequential; item 521's default, inside P-33's one build, and it can be undone.
- C3, C4, C5, C6: not consequential; implementation inside P-33 and P-37.

What the record says is settled, checked at each source: P-33 and its history of 2026-11-18 08:14Z, word for word; P-178's detail, way D with way C's code generator, and its history of 2026-11-17 15:26Z ("way (b), for the prelude's half as for the one library's, built once for both libraries"); F-388 and fork N4; P-164 and P-169; items 513, 521 and 597 at their defaults. P-37 holds: rung C adds no declaration to the prelude. P-87 and P-9 hold: every rung's files say "Not: ... microGPT", and no rung declares a model line.

## The merge

- **Run 1 merges clean by declaration, with no `landsOnlyWith`.** L names `forLabel` (`CodeGen.java:1942`) and `forExit` (`:1987`); P names `assumedArgumentsCall` (`:7256`), its call (`:4468`) and `OverloadSet.java`; T names `forMethodInvocation` (`:7313`) and a new member beside `intersectionMethodOwner` (`:7601`). Between P's member and T's stands `refuseGenericAssumption` (`:7297-7311`), so their hunks do not touch. G edits `OverloadingChecker.scala` and `FortressBuiltin.fss`; F edits walk's Java and `FlatString.fss`. No two rungs share a member, and G and F share no file with any rung.
- **The order L, P, T** is the gather's rule, the lowest edited line in the shared file (`climb-batch-workflow.md:174`). It holds unless L's cause lies outside `forLabel` and `forExit`, which the script then orders by itself.
- **No pair changes one behaviour two ways, and none needs another's result.** Each rung's test is against the prelude or walk, on the base. P's compile of `String` under the selector, T's measure and L's scratch tree each stand alone.
- **Rung C's own run: the reason holds.** Its tests are the fourteen compiles and `Hello`'s run. `String` needs P, `FortressLibrary` needs T, `FortressBuiltin` needs G, `FlatString` needs F, and the run with the verifier on needs L. A rung's tree is seeded from the run's base, so C cannot have them in run 1.

## What I did not do

- Run any program, build or stage (see "The method, and its limit").
- Check run 2's citations or its repairs: the brief gave run 2 checks 4 to 7 only.
- Check the briefing keys of section 1 with `facts-extract.sh --check`.

## B8. The reproducers, run

Check 2, which the reading above could not do: the failing program of each of rungs P, T, G and F, run once, on the base's code. Rung L has none yet (B1, C1), so nothing of it was run. A worker on Opus that could run programs ran them on 2026-11-20 in a worktree of its own, `/home/user/fortress-rv34run`, seeded from the base build by `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base40 /home/user/fortress-rv34run - HEAD` (detached at `2676c8009c`), and removed after. `main`'s code is the same: `git diff --stat 2676c8009c HEAD -- . ':!explorations' ':!docs' ':!.claude'` printed nothing at `e70926dc23`. Machine: 4 CPUs, Intel Xeon @ 2.10 GHz, load 0.19 at start, OpenJDK 25.0.4.1, `FORTRESS_THREADS=4` in the harness. The scratch tests were in the worktree's `tmp/`; each is given below. The compiled tests of runs 1 to 4 ran in one JVM: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh b34 tmp/b34c AsIfPartialCallCompiled.test AsIfPartialDispatch.test VarRecv.test WidenGetter.test`, which ended 'Tests run: 7, Failures: 7, Errors: 0'.

**Run 1. Rung P, `XXXAsIfPartialCallCompiled` promoted to a run test.** The program is `compiler_tests/XXXAsIfPartialCallCompiled.fss` with its component renamed `AsIfPartialCallCompiled`, and its `.test` is `tests=AsIfPartialCallCompiled`, `link`, `run`, `run_out_contains=PASS`. It fails on the base at its link with the pinned message, and its run fails after it:

    . link tmp/b34c/AsIfPartialCallCompiled
     UNEXPECTED exception
    com.sun.fortress.exceptions.CompilerError:
    tmp/b34c/AsIfPartialCallCompiled.fss:18:12-14:
        Can't compile a dispatched call whose arguments are not all type assumptions node = pair
    F. run tmp/b34c/AsIfPartialCallCompiled (177ms) Could not load AsIfPartialCallCompiled

**Run 2. Rung P, the case of B2.** The program `AsIfPartialDispatch` declares `trait Named` with `getter name()`, `object Leaf(k: ZZ32) extends Named`, `pair(x: Named, y: Named): String = "Named, Named"` and `pair(x: Named, y: Leaf): String = "Named, Leaf"`. Its `run()` binds `a = Leaf(1)` and `n: Named = Leaf(2)`, then `r = pair(a asif Named, n)`, then `println(r)`, `assert(r, "Named, Leaf", ...)` and `println("PASS")`. Its `.test` has the keys of run 1. Under walk, with `cd tmp/b34w && ../../bin/fortress walk AsIfPartialDispatch.fss`, exit 0:

    Named, Leaf
    PASS

So walk runs `pair(x: Named, y: Leaf)`: the other argument dispatches on its run-time type, as B2 read it. Compiled, in the call above, the link fails as in run 1:

    . link tmp/b34c/AsIfPartialDispatch
    tmp/b34c/AsIfPartialDispatch.fss:19:9-11:
        Can't compile a dispatched call whose arguments are not all type assumptions node = pair
    F. run tmp/b34c/AsIfPartialDispatch (197ms) Could not load AsIfPartialDispatch

The run bears out the review's reading. Fork P1's earlier rule would call `pair(x: Named, y: Named)` directly, and it is restated.

**Run 3. Rung T, `programs/VarRecv.fss`.** `VarRecv.test` is `tests=VarRecv`, `link`, `run`, `run_out_contains=7`, since the program prints `7`. The harness reports the code generator's crash as an exception of the link step, and the run then finds no class:

    . link tmp/b34c/VarRecv
     UNEXPECTED exception
    java.lang.ClassCastException: class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.TraitType (...)
    F. run tmp/b34c/VarRecv (163ms) Could not load VarRecv
    3) tmp/b34c/VarRecv(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: link

**Run 4. Rung G.** First, `programs/WidenGetter.fss` as the section's test would be: `WidenGetter.test` is `tests=WidenGetter`, `compile`, `compile_err_contains=should be a subtype of the`, which is `returnTypeCheck`'s message (`OverloadingChecker.scala:742-743`). It fails on the base, the compile reporting the code generator's static error:

    F. compile tmp/b34c/WidenGetter # WidenGetter..Oz.zero():Number
    # WidenGetter..(Tz[\Oz\] & {Oz}).zero():Oz
    Likely bug in static analysis, apparently malformed overload set not rejected for
    WidenGetter..Oz.zero():Number
    File WidenGetter.fss has 1 error.
    4) tmp/b34c/WidenGetter(...$CommandTest)junit.framework.AssertionFailedError: Must satisfy compile_err_contains; expected should be a subtype of the compile

Second, under the selector, the program `OneLibraryNN32ZeroGetter`, whose `run()` is `n: NN32 = 5`, `z: NN32 = n.zero`, `println(z)`. Its `.test` is `tests=OneLibraryNN32ZeroGetter`, `compile`, as a test of `one_library_tests/` has it. It ran through the same script with `FORTRESS_LIBRARY=one` exported, as the onelibrary track's JVM has it (`build.xml`, the macro `fastTrack`, `FORTRESS_LIBRARY` set to `@{library}`): `ONE_JVM=1 .../junit.sh b34g tmp/b34g OneLibraryNN32ZeroGetter.test`. It compiled:

    . compile tmp/b34g/OneLibraryNN32ZeroGetter  OK (time = 23982ms)
    OK (1 test)

The compile read the one library: `default_repository/caches-one/analyzed_cache/` then held `FortressBuiltin-7ec55c39.tfi` and `FortressLibrary-2a2f0082.tfi` beside the program's entry, and its `bytecode_cache/` held `OneLibraryNN32ZeroGetter.jar`. So the binding is not refused on the base, and this test cannot fail first, as B1 feared. The section now says so, and says what a test of the two lines needs. That is for the coordinator to settle before the launch.

**Run 5. Rung F.** In the worktree only, `Library/FlatString.fss:29-30` taken out: `ignore(FlatString);` and the end of its comment, since line 30 closes the comment that line 29 opens. The walk test `FlatStringWithoutName` imports `FlatString.{...}`. Its `run()` binds `s: String = "a string"`, then `println(s)` and `assert(|lineSeparator|, 1, "the line separator's length")`. It ran with `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 tmp/b34f/FlatStringWithoutName.fss` (cache empty), and the line was put back after:

    . interpret tmp/h1/tests/FlatStringWithoutName
     UNEXPECTED exception
    java.lang.NullPointerException
    Caused by: java.lang.NullPointerException: Cannot read field "selfType" because the return value of "com.sun.fortress.interpreter.evaluator.values.FNativeObject.getConstructor()" is null
    Tests run: 1,  Failures: 1,  Errors: 0

Nothing printed before the exception, so walk dies before the program's first `println`. The failure needs the one edit of the library. The section now names that edit as the test's set-up.

**What I changed in the record** (`CLIMB-BATCH-34.md`):

- Rung P, step 1: the line "Seen failing on the base:" from run 1, and B2's case as the second test, with walk's answer from run 2, in place of "a second case where two declarations stay applicable". Step 2 states fork P1's rule anew.
- Fork P1 (section 3): restated. The set holds every declaration that takes the assumed types at the assumed places and that the other arguments' static types do not exclude, and the call dispatches among them on the other arguments' run-time types. The grounds are `type-annotation.tex:44-47` and `Evaluator.java:109-116`, and run 2 is the example. The manifest's P entry already said "by run-time type at the others", so it is unchanged.
- Rung T, step 1: the line "Seen failing on the base:" from run 3, with how the harness reports the crash, and that the program prints `7`, not `PASS`.
- Rung G, step 1: the line "Seen failing on the base:" from run 4 for the first test, its pinned message named (`returnTypeCheck`'s). For the second test, that it compiles on the base, and what a test of the two lines needs: a check that reads the getter's own declaration. Fork G1's checker refusing `FortressBuiltin.fss:264-265` under the selector would be one, which puts that run after step 3 and before step 2. The form and the order are the coordinator's. The section's "Specification." line now names the Return Type Rule's section too.
- Fork G1 (section 3): narrowed to the getter, with `returnTypeCheck`'s message (`OverloadingChecker.scala:742-743`) in place of the `override`'s (`:726`). It notes that a method redeclared at the same parameter types is already checked (`:712-714`). Its reason is now the Return Type Rule (`Specification/advanced/overloading.tex:555-559`, section "Declarations with Static Parameters"; the rule's text ends at `:559`, one line past B3's `:558`), and the checker's check for methods. The manifest's G entry swaps its briefing key `advanced/overloading.tex#Subtype Rule` for `#Declarations with Static Parameters`, still one of 11 keys and 7 checks. `facts-extract.sh --check` matches it at `Specification/advanced/overloading.tex:531-674`, 8,203 bytes. LaTeX's `\item` is not a list item to its `@` filter, so the key prints the whole section.
- Rung F, step 1: taking the line out is the test's set-up, so the failing run follows that one edit of the library and precedes the fix. Also the line "Seen failing on the base:" from run 5.
- The record's header notes this check.

**Rows.** None added. Each failure seen is a row's: 818 (runs 1 and 2), 1076 (run 3), 993 (run 4: the checker accepts the widening getter, and under the selector it also accepts `z: NN32 = n.zero`), and 1090 (run 5).
