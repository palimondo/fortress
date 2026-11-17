<!-- The record-landing workflow's evidence of PLAN.md at 257cae950: its headings, the lines that the batch added (647163a9c..00dd16a89) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

# PLAN.md

Print a section with `facts-extract.sh 'doc:explorations/coordinator/PLAN.md#HEADING'`, from the worktree.

## Its headings, with their lines

- 7: Where we stand (8 lines)
- 15: The principle for the batches (6 lines)
- 21: The phases (2 lines)
  - 23: Phase 1. Batch 5: what is decided and shares nothing (4 lines)
  - 27: Phase 2. Batch 6: the tower flips, the specification with it (4 lines)
  - 31: Phase 2b. The repair batch from the conformance reviews (4 lines)
  - 35: Phase 3. The checker at a true zero (6 lines)
  - 41: Phase 4. The switch-over (58 lines)
  - 99: Phase 5. microGPT compiles (20 lines)
  - 119: Phase 6. microGPT fast (12 lines)
- 131: Pavol's answers, in the order they are needed (91 lines)
- 222: Work that can start now, with no decision (23 lines)
- 245: Off the path, parked (44 lines)
  - 289: Phase 3's candidates at its end (24 lines)
  - 313: Climb batch N's first run, listed for his review (9 lines)
  - 322: Climb batch 6.5b, listed for his review (10 lines)
  - 332: Climb batch 7b, listed for his review (22 lines)
  - 354: Climb batch 8, listed for his review (17 lines)
  - 371: Climb batch 9, listed for his review (27 lines)
  - 398: Climb batch 10, listed for his review (16 lines)
  - 414: Climb batch 11, listed for his review (13 lines)
  - 427: Climb batch 12, listed for his review (15 lines)
  - 442: Climb batch 13, listed for his review (21 lines)
  - 463: Climb batch 14, listed for his review (16 lines)
  - 479: Climb batch 15, listed for his review (20 lines)
  - 499: Climb batch 15b, listed for his review (4 lines)
  - 503: Climb batch 16, listed for his review (10 lines)
  - 513: Climb batch 17, listed for his review (14 lines)
  - 527: Climb batch 18, listed for his review (15 lines)
  - 542: Climb batch 19, listed for his review (20 lines)
  - 562: Climb batch 20, listed for his review (16 lines)
  - 578: Climb batch 21, listed for his review (18 lines)
  - 596: Climb batch 21b, listed for his review (12 lines)
  - 608: Climb batch 22, listed for his review (13 lines)
  - 621: Climb batch 22c, listed for his review (22 lines)
  - 643: Climb batch 23, listed for his review (12 lines)
  - 655: Climb batch 24, listed for his review (16 lines)
  - 671: Climb batch 25, listed for his review (16 lines)
  - 687: Climb batch 26, listed for his review (17 lines)
  - 704: Climb batch 27, listed for his review (22 lines)
  - 726: Climb batch 28, listed for his review (24 lines)
  - 750: Climb batch 29, listed for his review (29 lines)
  - 779: Climb batch 29b, listed for his review (15 lines)
  - 794: Climb batch 30, listed for his review (14 lines)
  - 808: Climb batch 32, listed for his review (23 lines)
  - 831: Climb batch 31, listed for his review (33 lines)
  - 864: Climb batch 31b, listed for his review (10 lines)
  - 874: Not classified, to check (13 lines)
- 887: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 904: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 916: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, 647163a9c..00dd16a89

- PLAN.md:9, under "Where we stand":

- **Runs.** microGPT runs under walk: its quick walk check gave both programs 7 of 7 at every landing from climb batch 11 to climb batch 32 and at climb batch 31's run 1 (each gate's `summary.txt`, its `# microgpt-walk` line; `compile-ladder/climb-batch-31/gate/summary.txt`). The 52 team demos reach their end, except that `Generator2Demo` stops with `IntegerOverflow` on some of its random data, on the base too: 52 of 52 on the merged trees of climb batch 32 and climb batch 31's run 1 at their gathers, and 51 of 52 on climb batch 30's (F-283; row 986; `compile-ladder/climb-batch-31/RECORD.md`, "The tests on the merged tree"). Walk is not timed (`coordinator/PLAN-history.md`, "The timed pairs of the walk check dropped, 2026-10-23"). On the compiled path microGPT's 18 components stop at name resolution until the switch-over (F-97). In a scratch tree switched onto the one library, three small programs ran compiled, one that prints a line, one over an `Array1` and a dot product in the program's own loop; no matrix, none of the library's own array algebra and no microGPT (F-352). Nothing of it landed.

- PLAN.md:10, under "Where we stand":

- **The live thread.** Phase 4, the switch-over: one library, the interpreter's, becomes the library the compiler checks (P-37), the natives first (P-33). At the last landed gate, climb batch 31's (`7858d0e97b`, its run 1), the distance is 0 and the checker count 0 over the fourteen components, with no crash row (F-53; `compile-ladder/climb-batch-31/gate/`). Climb batch 29 built the numeral default and fold (P-173) and the strings (P-171) on both paths, and climb batch 29b rebuilt the numerals as the static numerals on both paths and in the specification (P-174, P-176). Climb batch 30 built the numerals' leftovers (F-348, F-349); on the compiled path, the join of every forked arm and the fork of a call's arguments, with a grain size of 16 in the one library's parallel range (P-175; F-350); and six repairs of the compiled transaction (F-351). Climb batch 32 built the model's notation: the signs `∑` and `∏` as accumulators and a postfix operator declared in an api (F-362); a superscript after a dotted access and after a parenthesised call (F-363); the checker's instantiation of a reduction that writes no static argument and of a generic function passed as a value (F-364, F-365); the numeral rule on both paths, so that `u = 0` is `true` for a zero `u` of `NN32` (F-366); under walk, a generic function as a value (F-367) and a typed array literal at the top level (F-368); and the compiled top-level tuple binding (F-369). Climb batch 31's run 1 built, on the compiled path, each inherited method written once and a body inherited through an api's trait (F-372), `label` and `exit` (F-373), `atomic` as an expression and an object's `var` field in a cell (F-374), the cast of `self` (F-377, F-225), and the Return Type Rule at an object type with the dispatcher's cast (F-75, F-376); and, under walk, its two repairs that come before the merge (F-375). What the two paths still do differently is in `reviews/batch-31-review.md`, section 1, "What the two paths still do differently after this run". 374 of the library's 402 live bindings name helpers of `nativeHelpers/`, and `Reflect`'s 28 are the only ones that still name glue classes, since the numerals' 24 left with the old numeral types (F-299, F-32). Row 895 is closed, and the checker reads `System` whole on climb batch 28's rung S tree; but `System`, `File` and `Reader` are outside the fourteen, so no gate stage checks them (F-321, F-290; `reviews/batch-28-review.md`, section 6). The code generator refused 24 declarations of the fourteen components in 8 kinds on `832f7d0d91`, before climb batch 31's run 1, measured on a patched scratch tree, since on the tree as it stands it stops three components whole at row 874; no stage has taken the count after run 1 (`reviews/batch-31-review.md`, section 3; F-34; `compile-ladder/plan-31/probes/planner/codegen-measure.sh`). Since climb batch 27's rung G it compiles a type assumption at a receiver, at a call whose every dispatched argument is one, and as a value, and since climb batch 28's rung T an object whose first supertrait is an imported api's trait (row 733) (F-320, F-325, F-338). P-160's two steps are built: walk's load check reads a program's generic operators between an array and a number beside a self-typed additive group's own (F-318), and `Number` has no `comprises` clause, `asFloat` or `=` (F-324). Of the readings under that zero, review-queue item 295 waits for his word, and items 309 and 326 are closed at the cleanup of 2026-11-05 (learning) (row 844; F-308); climb batch 32's rung C closed row 731's checker gap (F-364; `compile-ladder/climb-batch-32/RECORD.md`, "Rows closed"). What each batch moved is in its record and its review (`compile-ladder/climb-batch-*/RECORD.md`, `reviews/batch-*-review.md`); this section's earlier texts are in `microgpt-run-c-handover-history.md` and `coordinator/PLAN-history.md`.

- PLAN.md:11, under "Where we stand":

- **Landed.** Phases 1 to 3 whole, phase 3 closed by climb batch 22c (`b81d86b75`); of phase 4, climb batches 23 to 30, climb batch 32 and climb batch 31's run 1 (phase 4's first eleven lines), climb batch 31's run 1 at `7858d0e97b` on 2026-11-17. Their items for him are in `coordinator/review-queue.md` and in their lists below.

- PLAN.md:12, under "Where we stand":

- **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the switch-over met sixteen walls on the way to three small compiled programs against the one library (F-352; `compile-ladder/plan-31/probes/switch-rehearsal.md`). The plan review sorted them into walls that a test against the prelude can show today and walls that only the switch shows, and put two orders of the remaining work, the whole switch-over first or the model's slice first (`reviews/plan-review-2026-11-10.md`, sections 7.1 and 7.2). Probe Y showed one build serving both libraries, which the second order needs (F-353). The pure-Java microGPT is written and timed (F-355, F-356), and the first compiled loop against the one library is of the order of 100 times from Java (F-358). The carriers' review gives the ways in which a run-time class carries a built-in type (`reviews/carriers-ways-2026-11-13.md`; F-359, F-379), and a probe merged the five number traits with their objects in scratch (F-361). Their rows are 988 to 1000 of the gap ledger. His decision of 2026-11-16 on the built-in number types is taken: each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` is one `value object` under its own name, and walk's native number objects `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` go, on both paths before the switch-over (P-178; review-queue items 371, 372 and 515, answered). The tree does not do it yet (row 1003), and the merge is phase 4's line on it: the one library's half is rung O of climb batch 31's run 2, not launched, and the prelude's half is in no run (fork H2, review-queue item 577). Two decisions of his stand first and are not taken: the carriers of the built-in types that P-178 does not cover, `Boolean`, `Char`, `String` with `FlatString` and the Java-backed traits (review-queue item 513, with 514), and the order of the remaining work (item 512). The other questions of these sources are items 516 to 524, 526 and 527. Of the merge's, 516, 518 and 519 stay open, 518 and 519 for his word before run 2 (items 97 and 98 under "Pavol's answers"); 517 and 520 are in the queue's part (a), since run 1 closed their rows 997, 998 and 542.

- PLAN.md:13, under "Where we stand":

- **Next.** Climb batch 31's run 1 landed (phase 4's eleventh line) at `7858d0e97b`, on his go of 23:04 UTC on 2026-11-16, and its post-batch review is committed (`44235432c2`). Its record-landing routes the review's list, and then the orientation update and the skill update run (`coordinator/climb-batch-workflow.md`, "After the landing: the coordinator's routing", steps 2 to 5). Then his word on the review's findings 3 and 4, forks O3 and O4 of run 2, before run 2 is launched; until he answers, each stands at its record's default (items 97 and 98 under "Pavol's answers"; review-queue items 518 and 519; `reviews/batch-31-review.md`, "The steps due before run 2", 1). Findings 1 and 2 hold no launch (items 99 and 100; review-queue items 572 and 562; the same steps, 8). The coordinator's own steps before run 2: the code generator's count on the landed tree, the trace of `compiler_tests/OverloadReturnObjectDomain.fss:26`, and run 2's sections read again, with a new base build (the same steps, 2, 5 and 6). Run 2, climb batch 31b, holds rungs T, O and E on run 1's landed tree, and starts when run 1 has landed, on the same go (`coordinator/CLIMB-BATCH-31.md`, "The go"). Its rung O is the one library's half of the merge of the five number types with their objects (P-178; phase 4's line on the merge); the prelude's half is in no run (fork H2, review-queue item 577). The findings of climb batch 32's review stand at their defaults (items 86 and 88; review-queue items 525 and 529); its finding 2 he reviewed as landed on 2026-11-16 (review-queue items 528, 533 and 530, in the queue's part (a)), and the model's four diffs are applied at his word of that day (`5ba4f78ed3`; items 547 to 550, in (a)). The findings of climb batch 30's review stand at their defaults as landed (items 80 to 82). What comes after climb batch 31, the walls that only the switch shows, waits on his decision on the carriers of the other built-in types (item 513) and on his decision on the order of the remaining work (item 512). The gap ledger's repair waits on review-queue items 265 and 267. What is in flight is `coordinator/BOOT.md`.

- PLAN.md:53, under "The phases > Phase 4. The switch-over":

- **Climb batch 31**, phase 4's eleventh batch, landed 2026-11-17 at `7858d0e97b`, its run 1, rungs M, K, L, A, V and X; its review is `reviews/batch-31-review.md`. Run 2, climb batch 31b, rungs T, O and E on run 1's landed tree, was launched on 2026-11-17 at his word of that day, with its forks at the planner's defaults; the list for the batch after is the record's (`coordinator/CLIMB-BATCH-31.md`, "For the batch after, in this order"); his word on finding 1 (item 99 under "Pavol's answers") can put rows 1051, 1050 and 1052 first in it.

- PLAN.md:66, under "The phases > Phase 4. The switch-over":

- The code generator over the one library (F-34): under the switch-over's setting it refused 24 declarations of the fourteen components in 8 kinds on `832f7d0d91`, before climb batch 31's run 1 (`compile-ladder/plan-31/probes/planner/codegen-measure.sh`, which patches a scratch worktree first, since the tree as it stands stops three components whole at row 874, so the count cannot be taken before the names work or without that patch). Each kind is in its ledger row: varargs 8 (row 624), `label` 4 (row 81), the kind environment 4 (rows 822 and 812), the range operators over pairs and triples 4 (row 819), a closure class written twice 2 (row 315), an intersection as a receiver 1 (row 540), and `atomic` as an expression 1 (row 875); behind a first wall can stand a second, as row 818 behind `SubString`'s `label`. Run 1 closed rows 81 and 875, and its record expects 19 to 21 (`coordinator/CLIMB-BATCH-31.md`, "The measure"); the count on the landed tree is due before run 2, and no stage has taken it (`reviews/batch-31-review.md`, "The steps due before run 2", 2). Climb batch 31b's rung T takes off 4. The count does not see a class that is emitted and fails when it loads: of rows 990, 991, 992 and 732, run 1's rungs M and K closed 990, 991 and 732, and row 992 is rung T's. Row 733, closed by climb batch 28's rung T, has its root in rows 940 and 942 (F-338), which the trait table's search by the prelude's names hides for the prelude's types; rows 889 to 892 are from climb batch 25's rung C (climb batch 30's rung X closed row 888, the nested `try`), with row 890 in review-queue item 350 (closed at the cleanup of 2026-11-05: settled); row 832 stands beside row 992. The library must emit, not only check, before the compiled tests can run against it, so they are cleared before the prelude is deleted with its tests kept (P-37; `reviews/phase3-exit/judgement.md`, section 2.4): several rungs, which the planner sizes from the kinds (the same, section 5.2, item 6). The judgement calls this phase 4's second zero, the code generator's over the same components as the checker's (section 6). Code-generator work goes on beside P-33's order (P-33).

- PLAN.md:67, under "The phases > Phase 4. The switch-over":

- Varargs (row 624) waits for a program compiled against the one library: its refusal reproduces under the prelude, but the repair has no test there, since the checker types a varargs parameter as the one library's `ImmutableArray[\T,ZZ32\]`, which the prelude does not declare. It is the first rung once a program compiles against the one library, because the library's `println` needs `WriteStream`, whose varargs methods refuse the whole trait (`coordinator/CLIMB-BATCH-31.md`, section 3, fork H1; `compile-ladder/plan-31/PROBES.md`, section 2).

- PLAN.md:68, under "The phases > Phase 4. The switch-over":

- What the rehearsal met and no other line of this phase holds (F-352; `compile-ladder/plan-31/probes/switch-rehearsal.md`, section 6). Walls that only the switch shows: the carriers beyond N5's table, that is the types that are objects in the one library (`Boolean`, `Char`, `NN32`, `RR32`, `FlatString`), the five number traits with one object each below them, whose bodies a carrier of the trait's class lacks, the second name that a carried type has in its RTTI (row 995), a carried parent named as a superinterface (row 866), the two array stores with no compiled value (row 874) and the Java stubs; the trait table's search by the prelude's api names (`TraitTable.scala:76-100`; row 942); the dispatch method's package in `OverloadSet` (row 994); `NN32`'s two getters (row 993); seven more source files that name the prelude; and the library order of fourteen compiles, about 200 s against the prelude's five. Walls that a test against the prelude shows, which climb batch 31 takes: the methods written twice into 27 classes of the library (row 990) and the missing cast that stops the library's static initializer at `QQ` (row 991), both closed by run 1 (`74f53ec886`, `6df780a7d0`), and the tuple index type, the wall of every matrix (row 992), rung T's in run 2. Whether the library's classes now pass the JVM's verifier is not measured (row 1051; review-queue item 572). Of rows 624, 81 and 315 on the path of a program that prints one line, run 1 closed row 81 (`3f7fd72814`), and rows 624 and 315 stand. Nothing measures what the JVM's verifier refuses in the emitted library: every compiled run of the rehearsal had it off. The order of the code generator's output follows identity hashes (row 996; F-354; review-queue item 522). For the five number types his decision is taken (P-178): each is merged with its one object before the switch-over (the next line), so the wall of the five number traits and that of a carried parent named as a superinterface (row 866) go with the merge; the merge was probed in scratch (F-361), and its open questions are review-queue items 516, 518 and 519. His decision on the carriers of the other built-in types comes first on either road (review-queue items 513 and 514).

- PLAN.md:69, under "The phases > Phase 4. The switch-over":

- The merge of the five number types with their objects, before the switch-over, on both paths (P-178; row 1003): each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` is declared `value object` under its own name in the one library, as `NN32` and `RR32` are, in place of a trait that comprises one native object, and `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` leave the library and walk. The one library's half is rung O of climb batch 31's run 2, not launched; the prelude's half is in no run (fork H2, review-queue item 577). The probe built it in a scratch tree, 12 files, 258 lines added and 308 deleted, with the checker count and the distance at 0, both microGPT quick checks at 7 of 7 and walk's suite at 829 of 830, the other an `XXX` test that passes for the wrong reason (F-361; row 550; `compile-ladder/plan-31/probes/number-object-merge.md`, "Result" and "What was built"). The probe's estimate, which is not a plan: "two rungs for the merge itself, and two that it should wait for", four in its list, tests first. Two repairs of the interpreter come first, since both defects stood at `NN32` and `RR32` and the merge brings them to the types that every program uses: a generic method of a trait whose type parameter is bounded by a value type (row 997), and the load check that loads a generic declaration beside a plain one over an object type against the Return Type Rule (row 998). Both are done: run 1's rung V closed the two rows (`b6fb208e23`; F-375). Then the merge itself: the library's text, walk's place for the five, the five constructor classes renamed and their dead natives deleted, the tests and comments that name the objects, and three passages of Appendix I. Then the checker's row 542, before the switch-over (the same note, "Estimate in rungs, tests first, on both paths"), which run 1's rung X closed before the merge (`1ce04203c5`; F-75). Not designed: how the compiled path takes this form before the switch-over, since the probe left the compiler's prelude, with its open traits, untouched, and did not build what the code generator makes of `value object ZZ32`; P-37 adds no declaration to the prelude. The two repairs first and row 542 before the merge are the defaults of forks O2 and O5 as landed, which go to him with the record's forks (review-queue item 578); items 517 and 520 are in the queue's part (a). His, not taken: where the five live, `round` of an `RR64`, and a `typecase` arm at a removed name (review-queue items 516, 518 and 519, with the record's defaults, forks O1, O3 and O4).

- PLAN.md:95, under "The phases > Phase 4. The switch-over":

- His answers needed before the switch-over: review-queue items 2, 21, 30, 35, 36, 39, 108, 212, 229, 230, 281, 295, 319, 339, 360, 374 to 376, 450, 455, 460, 477 and 558 (the queue's "Before the switch-over"), each with its default there or none; review-queue items 488, 500 and 501, the findings of climb batch 30's review, and items 525 and 529, those of climb batch 32's review, before the next batch or at their defaults; items 518 and 519, findings 3 and 4 of climb batch 31's review, before run 2 or at the record's defaults; and item 572, its finding 1, before the batch after climb batch 31 is planned; the phase 3 exit judgement recommends a default for those of them that it read (section 5.2).

- PLAN.md:97, under "The phases > Phase 4. The switch-over":

The phase carries out P-37: one library, the interpreter's, is the library that the compiler checks. By P-33's order the natives come first and the names after them; code-generator work goes on beside that order. Its gates keep the distance stage, report-only, until the switch-over lands (climb batch 23's question 1, P-39). Its first ten batches, climb batches 23 to 30 and climb batch 32, landed, and so did climb batch 31's run 1; its run 2 is planned on the same go and not launched, and the rest is not yet designed as briefs. The record's shape is at least two batches (`coordinator/library-route-judgement.md:37`), and the phase 3 exit judgement asks that phase 4's record name its batches before the names batch is briefed (section 4, J0929 item 5). The plan review's estimate from the rehearsal's rungs, which is not a plan: 11 to 15 rungs on the walls that the prelude can show, 3 to 5 batches, under either order; then, with the whole switch-over first, one landing of 3 to 5 batches that cannot be gated in parts, and a compiled matrix against the one library after 6 to 10 batches; with the model's slice first, the walls that only the switch shows met one at a time on `main` behind a selector, a compiled matrix after 3 to 5 batches, and the tests' move and the prelude's deletion beside or after the model (`reviews/plan-review-2026-11-10.md`, section 7.2; probe Y puts the second road's extra cost at two rungs, perhaps three, and about 200 s a gate, F-353). Which order is his decision, not taken (review-queue item 512); the phases' order here stays P-33's until he decides, and each line of this phase that names the names batch as one batch waits on it.

- PLAN.md:143, under "Pavol's answers, in the order they are needed":

96. M.skeptic.1 of climb batch 31's rung M (rows 573 and 1038): an object's dispatch method tests the receiver in place of the argument where `self` is not first, so `mark(1, Pq)` answers 3 with no error where walk answers 1. Should the repair, in `compiler/OverloadSet.java`, come before the switch-over? Default: no rung is planned for it; the two rows stay open with their expected failures. Review-queue item 558.

- PLAN.md:145, under "Pavol's answers, in the order they are needed":

Before run 2 of climb batch 31, or at its record's defaults, raised by climb batch 31's post-batch review (`reviews/batch-31-review.md`, Findings, 3 and 4):

- PLAN.md:147, under "Pavol's answers, in the order they are needed":

97. Finding 3, fork O3 of run 2: after the merge, does `round` of an `RR64` answer a `ZZ64`, the body that runs today, or a `ZZ`, as the trait declares and P-68 gives (row 1000)? Default: `ZZ64`, the record's fork O3; the review recommends it. Review-queue item 518.

- PLAN.md:148, under "Pavol's answers, in the order they are needed":

98. Finding 4, fork O4 of run 2: after the merge, a `typecase` arm at a removed name such as `Int` takes every value until row 959 is repaired. Does the merge wait for row 959? Default: it does not wait, and row 959 stays second in the list for the batch after, the record's fork O4; the review recommends it. Review-queue item 519.

- PLAN.md:150, under "Pavol's answers, in the order they are needed":

Holding no launch, raised by climb batch 31's post-batch review (`reviews/batch-31-review.md`, Findings, 1 and 2):

- PLAN.md:152, under "Pavol's answers, in the order they are needed":

99. Finding 1: after the merge every built-in integer type has the shape of `StandardTotalOrder`'s `MIN` and `MAX`, which fails the JVM's verification at an object instance (row 1051, with rows 1050 and 1052). One rung first in the batch after, a fourth rung of run 2, or parked? Default: parked, no rung placed; the review recommends the rung first in the batch after. Needed before the batch after climb batch 31 is planned. Review-queue item 572.

- PLAN.md:153, under "Pavol's answers, in the order they are needed":

100. Finding 2: three answers on `exit` that the record does not settle and that walk gives otherwise: which evaluation an exit leaves (row 1042), whether a `catch` clause takes an exit (rows 1040 and 890), and what an exit is after its label block has completed (row 1041). The specification's reading on all three, with walk repaired, or walk's reading on the first two? Default: as landed; the review recommends the specification's reading. Review-queue item 562.

- PLAN.md:303, under "Off the path, parked > Phase 3's candidates at its end":

- The other candidates of item 18, each with what it waits on, are in `coordinator/CLIMB-BATCH-20.md`, section 4: open among them, rows 444, 665, 691, 697, 700, 714, 716, 717, 719, 723, 725, 728, 746, 755 to 757, 760 to 764, 768, 770, 776 to 781, 785 and 787 to 790.

- PLAN.md:833, under "Off the path, parked > Climb batch 31, listed for his review":

The items for him that run 1 of climb batch 31 (`coordinator/CLIMB-BATCH-31.md`: rungs M, K, L, A, V and X, all six landed) left (`compile-ladder/climb-batch-31/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"); then, from its post-batch review (`reviews/batch-31-review.md`, Part 4), the lines that the group lacked: rows 1043, 1050, 1052 and 1053, fork V4, fork H2 and the record's forks. M.skeptic.1 is item 96 under "Pavol's answers", and the review's findings 1 to 4 are items 97 to 100 there. None of the lines below holds a launch. One line for each point, opening with the ids it holds: what is asked or told, its default, and its review-queue item, which holds its text, the other way, its cost and its evidence; the lines' texts before this routing are in `PLAN-history.md`, "Climb batch 31's landing, 2026-11-17".

- PLAN.md:835, under "Off the path, parked > Climb batch 31, listed for his review":

- M.worker.1 and the first part of M.skeptic.2 of climb batch 31's rung M, with fork M1 (row 1037): is an object valid that reaches one trait's method along two paths, one of them through a trait that declares the method again at the same parameter types, running the lower declaration, or must the object declare the method itself? Default: as landed, the lower declaration runs, the row open. Review-queue item 559.

- PLAN.md:836, under "Off the path, parked > Climb batch 31, listed for his review":

- M.worker.2 and the second part of M.skeptic.2 of climb batch 31's rung M: should a later rung bring the dispatch methods' gatherings onto the comparison at the instance? Default: left as they are; no rung is planned. Review-queue item 560.

- PLAN.md:837, under "Off the path, parked > Climb batch 31, listed for his review":

- L.worker.1 and L.skeptic.1 of climb batch 31's rung L, with fork L2 (row 1039): who builds the exit out of an `atomic` block, whose writes both paths discard and the specification retains? Default: not built, the row open with its two expected failures; no rung is planned. Review-queue item 561.

- PLAN.md:838, under "Off the path, parked > Climb batch 31, listed for his review":

- L.worker.2 and L.skeptic.2 of climb batch 31's rung L (rows 1040 and 1041, the second CONTESTED): is an exit that passes a `try` a `LabelException` that a `catch` clause may take? Default: as landed, the compiled path follows the specification and walk's answer is row 1040. Item 100 above; review-queue item 562.

- PLAN.md:839, under "Off the path, parked > Climb batch 31, listed for his review":

- L.worker.3 and L.skeptic.3 of climb batch 31's rung L (row 340), told: the natural spelling of a search, `exit found with i` beside a last `-1`, does not compile until row 340 is repaired; a program binds the number to a typed variable first. Default: as landed. Review-queue item 563.

- PLAN.md:840, under "Off the path, parked > Climb batch 31, listed for his review":

- Row 1043 of climb batch 31's rung A, told: the checker carries no declared type into the body of an atomic expression, so a numeral there is refused or fails verification; `atomic do ... end` runs. Default: as landed, the row open; the review proposes it to rung E of run 2 as kin, by a run. Review-queue item 563.

- PLAN.md:841, under "Off the path, parked > Climb batch 31, listed for his review":

- L.worker.4 and L.skeptic.4 of climb batch 31's rung L, with fork L1 (row 1042, CONTESTED): which evaluation does an exit leave where its label block is evaluated more than once? Default: as landed, fork L1, each evaluation with its own identity. Item 100 above; review-queue item 562.

- PLAN.md:842, under "Off the path, parked > Climb batch 31, listed for his review":

- V.worker.1 and V.skeptic.1 of climb batch 31's rung V (row 1044): should walk's load check refuse, at an object type, a more specific declaration that writes no return type beside a generic one, as it does at a trait type, or load it unjudged? Default: as landed, loaded unjudged, the row open with its expected failure. Review-queue item 564.

- PLAN.md:843, under "Off the path, parked > Climb batch 31, listed for his review":

- V.worker.2 and V.skeptic.2 of climb batch 31's rung V (row 1045): the team's `tests/XXXNonValueOfValue.fss` is green for a reason other than the one it was written for; repair it, or delete it for `tests/NonValueBelowValueTypeWalk.fss`? Default: the team's test left as it is, the row open. Review-queue item 565.

- PLAN.md:844, under "Off the path, parked > Climb batch 31, listed for his review":

- V.worker.3 of climb batch 31's rung V, with fork V3, told: the Effect of the entry `revival-expected-contexts` now names row 1036 beside row 1019, as the rung's skeptic corrected it. Default: as landed. Review-queue item 566.

- PLAN.md:845, under "Off the path, parked > Climb batch 31, listed for his review":

- X.worker.1 and X.skeptic.1 of climb batch 31's rung X (row 542): does row 542 close whole, or does its second pair as written get a row of its own under the positional restriction? Default: the row closes whole, the pair pinned by its expected failure. Review-queue item 567.

- PLAN.md:846, under "Off the path, parked > Climb batch 31, listed for his review":

- X.worker.2 and X.skeptic.2 of climb batch 31's rung X, with fork X1 (row 1048): should the Return Type Rule also set aside the instances that cannot meet at a tuple of object types, and read a trait whose `comprises` clause lists one object as that object (P-60)? Default: as landed, the object type alone. Review-queue item 568.

- PLAN.md:847, under "Off the path, parked > Climb batch 31, listed for his review":

- Fork V4 of climb batch 31's record, the coordinator's decision after the check of the record, told: walk's load check reads no `comprises` clause, so the valid pair at `ZZ64` (row 550) stayed an expected failure in run 1; rung O of run 2 makes `ZZ64` an object and promotes the test. Default: as landed. Review-queue item 568.

- PLAN.md:848, under "Off the path, parked > Climb batch 31, listed for his review":

- X.worker.3 and X.skeptic.3 of climb batch 31's rung X: keep the dispatcher's cast of an arm's result in `compiler/OverloadSet.java`, a file outside the rung's named ones, or take it out and record the run as an expected failure? Default: kept, as landed (F-376). Review-queue item 569.

- PLAN.md:849, under "Off the path, parked > Climb batch 31, listed for his review":

- X.skeptic.4 of climb batch 31's rung X (row 1049), told: walk loads the invalid pair of a generic declaration beside a plain one over an arrow type, and no gated test holds it. Default: the row open, no test yet. Review-queue item 570.

- PLAN.md:850, under "Off the path, parked > Climb batch 31, listed for his review":

- K.skeptic.1 of climb batch 31's rung K, with fork K1: keep the `checkcast` that the rung adds at a declared trait type strictly below self's trait, or narrow it to object types? Default: as landed, the cast kept. Review-queue item 571.

- PLAN.md:851, under "Off the path, parked > Climb batch 31, listed for his review":

- gather.1 of climb batch 31's gather, with review.1 of its merged-diff review and judge-review.1 of the review's judge (row 1051), told, and one placing asked: a self-typed trait's body `mx(self, other: T): T = if lt(other, self) then self else other end` still fails the JVM's verification at an object instance on the merged tree, and the one library's `MIN`, `MAX` and `MINMAX` of `StandardTotalOrder` have that shape. Where is the rung for it placed? Default: parked, no rung placed. Item 99 above; review-queue item 572.

- PLAN.md:852, under "Off the path, parked > Climb batch 31, listed for his review":

- Rows 1050 and 1052 of climb batch 31's rung K, told: a closure that returns `self` at a listed type or as the self parameter fails verification, and a default body that calls a method on a value of the self parameter dies with `ClassCircularityError` where the object lists the trait first. Default: the rows open, with row 1051's rung. Item 99 above; review-queue item 572.

- PLAN.md:853, under "Off the path, parked > Climb batch 31, listed for his review":

- review-routed.1 of climb batch 31's merged-diff review (row 1051), a test owed by the rung of item 99 above, since no rung of run 2 is given `CodeGen.forIf` or `castToTypeBelow` (`reviews/batch-31-review.md`, Part 4): the row's expected failure, `compiler_tests/XXXComprisesValueAtConditionalArmRun`, holds the conditional arm at a listed type only, and nothing gated holds it at a self-type parameter, the shape of the one library's `MIN` and `MAX` that the gather measured on the merged tree. That rung writes first an expected-failure run test with its link test, a trait `Tord[\T extends Tord[\T\]\]` with `mx(self, other: T): T = if lt(other, self) then self else other end` and an object that extends it, and names it in row 1051. Evidence: `explorations/compile-ladder/climb-batch-31/RECORD.md`, "The gather's own point"; `ProjectFortress/compiler_tests/XXXComprisesValueAtConditionalArmRun.fss:5-7`; `Library/FortressLibrary.fss:291-294`.

- PLAN.md:854, under "Off the path, parked > Climb batch 31, listed for his review":

- review-routed.2 of climb batch 31's merged-diff review (row 1049), a test owed by the batch after, or by run 2's gather as one expected-failure walk test with no code, since rung O's section puts walk's load check on its "Not" list (`reviews/batch-31-review.md`, Part 4): the row has no gated test, and the line of X.skeptic.4 above says why one can now be written. The test is an expected-failure walk test of `ident[\T\](x: T): T` beside `ident(x: Circle -> Circle): (Circle -> Circle)`, which loads where the Return Type Rule refuses it, named as the row's reproducer. Evidence: `explorations/compile-ladder/climb-batch-31/RECORD.md`, "The tests on the merged tree"; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:511-527`.

- PLAN.md:856, under "Off the path, parked > Climb batch 31, listed for his review":

- judge-gate.1 of climb batch 31's gate judge (row 1046), a decision taken where the record does not settle it: the gate was red on the row's `XXX` test, whose compile reaches the checker's crash or not by what the same JVM compiled before, and the repair withdrew the test and keeps the row and a probe. Keep it so, decide the tie in the checker in a rung of its own, or run each compile test in a JVM of its own? Default: as repaired, the defect ungated until the tie is decided. Review-queue item 573.

- PLAN.md:857, under "Off the path, parked > Climb batch 31, listed for his review":

- judge-gate.2 of climb batch 31's gate judge (rows 499, 1047 and 1046): a call tied among generic candidates is resolved by the order of the overloadings, which varies with what the JVM compiled before; where is the checker's tie repaired? Default: no rung is planned. Review-queue item 574.

- PLAN.md:858, under "Off the path, parked > Climb batch 31, listed for his review":

- judge-gate.3 of climb batch 31's gate judge, told: whether the verdict of the gated test `OverloadReturnObjectDomain` can vary with the head of the tie is not established. Default: the test as landed; whoever takes the tie's repair traces it first. Review-queue item 574.

- PLAN.md:859, under "Off the path, parked > Climb batch 31, listed for his review":

- judge-gate.4 of climb batch 31's gate judge, two tool remarks, neither red: the gate brief's `atomic_runs`, and the harness's message 'Saw failure, but did not satisfy'. Default: both left as they are; the first is the batch script's, between batches. Review-queue item 575.

- PLAN.md:860, under "Off the path, parked > Climb batch 31, listed for his review":

- Row 1053 of climb batch 31's rung K, told: an assignment from outside an object to its `var` field, of a value of a strict subtype, dies with `NoSuchMethodError`; the checker accepts it and walk runs it. Default: no rung planned; a program binds the value at the field's type first. Review-queue item 576.

- PLAN.md:861, under "Off the path, parked > Climb batch 31, listed for his review":

- Fork H2 of climb batch 31's record, consequential, a decision not taken: does the compiler's prelude take the form of P-178 by way (a), the classes that the code generator writes for a trait today, or by way (b), a value object that holds a JVM `int`, `long` or `double`? Default: a probe of way (a), then one rung, with the prelude's `NN32` and `RR32`. Review-queue item 577.

- PLAN.md:862, under "Off the path, parked > Climb batch 31, listed for his review":

- The record's forks of run 1, taken at their defaults (`coordinator/CLIMB-BATCH-31.md`, section 3): B1, B2, B3, H1, M2, A1, V1, V2, O2 and O5. Forks M1, L2, L1, V3, X1 with V4, and K1 are with review-queue items 559, 561, 562, 566, 568 and 571; H2 is item 577, and S is item 522. Default: as landed. Review-queue item 578.

- PLAN.md:864, under "Off the path, parked > Climb batch 31b, listed for his review":

### Climb batch 31b, listed for his review

- PLAN.md:866, under "Off the path, parked > Climb batch 31b, listed for his review":

The items for him that run 2 of climb batch 31 (`coordinator/CLIMB-BATCH-31.md`: rungs T, O and E, all three landed) left (`compile-ladder/climb-batch-31b/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"). None holds the batch or a launch: each is as landed until he answers.

- PLAN.md:868, under "Off the path, parked > Climb batch 31b, listed for his review":

- T.worker.1 and T.skeptic.1 of climb batch 31b's rung T: should `m[i, j] := v` reach a subscripted assignment `opr[i: I] := (v: E)` at a pair index, as `m[i, j]` reaches `opr[i: I]` with the pair as one index (P-156)? Both paths read the assignment's arguments as one list, the value and then each subscript, so `Cells[5, 6] := 7` against `opr[t: (ZZ32, ZZ32)] := (e: ZZ32)` is refused (walk: 'The number of parameters (2) does not match with the number of arguments (3)'), and the specification's section "Subscripted Assignment Operator Method Declarations" (`Specification/advanced/subscripting.tex`) does not say how the bracketed list meets one tuple-typed parameter. Default: nothing changed; the one library keeps its `opr[x:ZZ32,y:ZZ32]:=(v:T)` beside the form over `I`, as the rung's test does. Evidence: `explorations/compile-ladder/rung-tuple-parameter/REPORT.md:175`; `ProjectFortress/compiler_tests/TupleIndexMethodCompiled.fss:12`, `:19`.

- PLAN.md:869, under "Off the path, parked > Climb batch 31b, listed for his review":

- O.worker.1 and O.skeptic.1 of climb batch 31b's rung O: should the specification's library chapter present `ZZ`, `ZZ32`, `ZZ64`, `NN64` and `RR64` as objects, now that the one library declares each as a value object (P-178), or keep its api style of a trait, as it keeps for `Boolean`, which the library declares as a value object too? Default: the chapter's text left as it is. Evidence: `explorations/compile-ladder/rung-number-objects/REPORT.md:10`, `:178`; `Specification/basic-lib/basic-integers.tex:16`, `:106`, `:229`; `Specification/basic-lib/booleans.tex:80`; `Library/FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`.

- PLAN.md:870, under "Off the path, parked > Climb batch 31b, listed for his review":

- O.worker.2 of climb batch 31b's rung O, told, answered by its skeptic: the worker could not run the 163 expected-failure walk tests on the old code (the automatic permission check refused the base build's `harness-one.sh` run); the skeptic ran each on the old code and the new, and none moves between a refusal at load and a failure at run time, 158 printing the same and 5 differing in lists of overloads, an order or a race's counts. Default: nothing owed. Evidence: `explorations/compile-ladder/rung-number-objects/SKEPTIC.md:48`; `explorations/compile-ladder/rung-number-objects/REPORT.md:164-166`.

- PLAN.md:871, under "Off the path, parked > Climb batch 31b, listed for his review":

- O.worker.3 and O.skeptic.2 of climb batch 31b's rung O, told, reversible: the rung's brief said to leave `compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.fss` alone while its step 4 removed the rewriter's `UnsignedLong` clause, so the test's pinned message changed and was repinned, 'NN64->ZZ64 ...' to 'ZZ64->ZZ64 is not applicable to an argument of type UnsignedLong' (row 886's `UnsignedLong` half repaired); the skeptic agrees with the repin. Default: as landed. Evidence: `ProjectFortress/compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.test:3`; `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:189`; `explorations/compile-ladder/rung-number-objects/REPORT.md:204`; `explorations/compile-ladder/rung-number-objects/SKEPTIC.md:67`.

- PLAN.md:872, under "Off the path, parked > Climb batch 31b, listed for his review":

- review.1 of climb batch 31b's merged-diff review, told, not asked: rung E's commit on `main`, `d3095ca77f`, edits a file of the team's tree beyond the two that its `historical:` line names, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala` (its skeptic's fix `129e8c5bc8`, one `LetExpr` case); the gate runs on that commit, so its message stays as it is, and the rung's `REPORT.md` header now names the file. Default: as landed. Evidence: `git show --stat d3095ca77f`, 'ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala | 1 +'; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:602`; `explorations/compile-ladder/rung-numeral-block-end/REPORT.md:7`.


## The lines added after the landing, 00dd16a89..257cae950

None.

## The other lines that name a changed entry or row

- PLAN.md:37, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:54, under "The phases > Phase 4. The switch-over", 1075 characters, names F-299: Since climb batch 29, 374 of the 402 live bindings name helpers, and only `Reflect`'s 28 still name glue classes (F-299, F-32).
- PLAN.md:55, under "The phases > Phase 4. The switch-over", 314 characters, names F-299, F-303, F-305, F-307, F-323: - N1 and N2, A's 154 and B's 59: those moved are in F-299, F-303 and F-305 to F-307, the string family's 18 with climb batch 26's rung T (F-299), and `FlatString`'s `=` and `flatConcat` at a `Char` with climb batch 27's rung F (F-323);
- PLAN.md:58, under "The phases > Phase 4. The switch-over", 328 characters, names row 525: - The compiled defects that climb batch 6.5b's rung E gated: the compiled `ZZ32`, `NN32` and `NN64` `^`, rows 523, 524 and 525, each with its `XXX` test.
- PLAN.md:60, under "The phases > Phase 4. The switch-over", 376 characters, names F-330, F-332: - N4's two rungs (P-164) are built: the writer rung in climb batch 27 (F-330), and the reader rung, with `FileWriteStream`, in climb batch 28 (F-332), so the 36 are gone (F-32).
- PLAN.md:61, under "The phases > Phase 4. The switch-over", 2226 characters, names F-352: the rehearsal carried it in `FJavaString` by a hack, and its class cannot be stubbed in Java under the component's name (F-352;
- PLAN.md:70, under "The phases > Phase 4. The switch-over", 428 characters, names F-34: - Row 304, with the code generator's later rungs, beside F-34's kinds: since climb batch 26's rung L the code generator compiles a local function, but refuses three forms that the specification allows, a local function with static parameters of its own, two of one name in a block, and the `atomic` modifier, each with its `XXX` test (F-320).
- PLAN.md:72, under "The phases > Phase 4. The switch-over", 251 characters, names row 886: - The limits of the natives' rewrite that stand: rows 882, 883, 884 and 886, with the next rung that edits the rewrite;
- PLAN.md:74, under "The phases > Phase 4. The switch-over", 798 characters, names F-328: F-328).
- PLAN.md:79, under "The phases > Phase 4. The switch-over", 2125 characters, names F-296: Until it lands, `fortress compile` still bounds by `Object` a type parameter written without a bound in a generic that concatenates its value onto a `String` or prints it, for the prelude's `||`, `print` and `println` (F-296).
- PLAN.md:82, under "The phases > Phase 4. The switch-over", 245 characters, names row 528: - The compiler prelude's own defects retire with it, each gated (P-38): its range defects, rows 453, 479 and 481, and its `RR32`, rows 528 and 529, row 528 with the respelling of its test;
- PLAN.md:85, under "The phases > Phase 4. The switch-over", 466 characters, names F-79: the row's other half, `IntLiteral` stating its own, names a type that the one library no longer has (F-79;
- PLAN.md:89, under "The phases > Phase 4. The switch-over", 288 characters, names row 330: - After the names, P-68's library rung for row 330, and beside it the rung that makes `QQ` follow the same ruling (P-54): each gated, with `RR32`'s four sites that climb batch 6.5b's rung V added (`FortressBuiltin.fsi:112`, `:114-116`);
- PLAN.md:110, under "The phases > Phase 5. microGPT compiles", 1212 characters, names F-229: F-151, the element bound), and a factory that reads the element bound in place of its fixed list of the eight number types, since today `array1` and `array2` give a plain array at any other element type (F-229;
- PLAN.md:112, under "The phases > Phase 5. microGPT compiles", 1447 characters, names row 340: - The code generator's other gaps on microGPT's path, each row its own home: the APL base's `typecase` (row 340), by reading (C4's two local functions in `step` have the shapes that compile since climb batch 26's rung L, F-320;
- PLAN.md:127, under "The phases > Phase 6. microGPT fast", 449 characters, names F-356: In a Java model of the model's step in the library's fork/join shape, that costs 19 to 80 times at the library's grains, and 1.4 to 4.8 times with the product stopped at blocks of 16 (F-356;
- PLAN.md:184, under "Pavol's answers, in the order they are needed", 183 characters, names F-35: The dead sizes' diff: the 9 unused sizes (F-35, the api's 9 declarations with a dead size) and row 41 (the linker lookup) come with the switch-over's design.
- PLAN.md:238, under "Work that can start now, with no decision", 516 characters, names F-44, F-276: ...ule reads only shared files: climb batch 21b's gather wrote that no hunk moved a cited line, where rung C's prelude hunk and Appendix I lines and rung E's api text moved lines that rung D's and E's files and F-44, F-58 and F-276 cite (`compile-ladder/climb-batch-21b/RECORD.md:22-27`).... | ...shared files: climb batch 21b's gather wrote that no hunk moved a cited line, where rung C's prelude hunk and Appendix I lines and rung E's api text moved lines that rung D's and E's files and F-44, F-58 and F-276 cite (`compile-ladder/climb-batch-21b/RECORD.md:22-27`)....
- PLAN.md:284, under "Off the path, parked", 776 characters, names rows 1014, 1030, 1031: the homes are the reviewer's proposal, and the planner weighs each): rows 1014 and 1030, a numeral that ends a block, alone or in a tuple, at a declared return type dies at run time with one message, `CompilerBuiltin$v`; | row 1031, a tuple binding over an `if` with tuple branches stops the code generator;
- PLAN.md:294, under "Off the path, parked > Phase 3's candidates at its end", 518 characters, names F-344: P-154): it waited until walk runs the checker (P-12) or row 364 is fixed, and climb batch 29's rung G fixed row 364 (F-344), so it can come as a walk rung of its own (`coordinator/CLIMB-BATCH-29.md`, section 5, "Left out, each with its home");
- PLAN.md:300, under "Off the path, parked > Phase 3's candidates at its end", 321 characters, names row 959: - Row 959, opened by climb batch 29's rung N: on both paths a `typecase` arm that names a type no declaration defines loads, compiles and matches every value;
- PLAN.md:304, under "Off the path, parked > Phase 3's candidates at its end", 109 characters, names row 698: - Not candidates: rows 698 (the switch-over), 699, 706 and 537 (phase 5) and 705 (closed by the switch-over).
- PLAN.md:324, under "Off the path, parked > Climb batch 6.5b, listed for his review", 446 characters, names row 528: Row 528, which rung V put to him with no default, is on phase 4's line on the prelude's own defects with row 529, its default the switch-over by the one-library decision of 2026-09-21 (`reviews/batch-6.5b-review.md`, finding 3).
- PLAN.md:348, under "Off the path, parked > Climb batch 7b, listed for his review", 198 characters, names row 550: - Row 550: walk's lifted return rule keeps `pickFirst` refused, stricter than answer 9's rule over every instance;
- PLAN.md:486, under "Off the path, parked > Climb batch 15, listed for his review", 1033 characters, names F-229: F-229;
- PLAN.md:539, under "Off the path, parked > Climb batch 18, listed for his review", 413 characters, names row 550: the rename moves row 550's note that cites it.
- PLAN.md:589, under "Off the path, parked > Climb batch 21, listed for his review", 612 characters, names F-344: walk's half waited until walk runs the checker, P-12, or row 364 is fixed, and climb batch 29's rung G fixed row 364, F-344).
- PLAN.md:593, under "Off the path, parked > Climb batch 21, listed for his review", 1275 characters, names row 330: Settled by P-68, the coordinator's call, 2026-10-23: the api takes the component's types, `ZZ` for the brackets, as P-68 asks, and `RR64` for `truncate` until P-68's own rung after the switch-over makes it `ZZ` (row 330); | the default instead is the component's `RR64` declaring `ZZ64`, as the api and `Float` do, until P-68's own rung (row 330) makes them `ZZ`;
- PLAN.md:659, under "Off the path, parked > Climb batch 24, listed for his review", 647 characters, names F-308: Since climb batch 25's rung U the cost reaches `UnsignedLong`'s three bindings, 93 in all (F-308;
- PLAN.md:660, under "Off the path, parked > Climb batch 24, listed for his review", 452 characters, names row 863: - F.worker.1 and F.skeptic.1 of climb batch 24's rung F (row 863, `CONTESTED`): does the specification's "division by zero produces a NaN value" for floating-point results mean NaN, or IEEE 754's infinity for a nonzero dividend, which both paths give and the team's code relies on? Default: the row `CONTESTED`, neither of rung F's guards asserting a nonzero value divided by zero.
- PLAN.md:675, under "Off the path, parked > Climb batch 25, listed for his review", 436 characters, names row 880: - D.worker.1 and D.skeptic.2 of climb batch 25's rung D, with P.worker.2 and the second question of P.skeptic.1 of its rung P (row 880, `CONTESTED`): which reading of `nextUp` and `nextDown` at a signed zero governs on `RR64` and `RR32`, IEEE 754-2008's nextUp or the successor in IEEE's totalOrder that the team's `DirectedRounding` gives? Default: today's values.
- PLAN.md:679, under "Off the path, parked > Climb batch 25, listed for his review", 263 characters, names row 887: - N.worker.1 of climb batch 25's rung N (row 887): should `ZZ`'s `CHOOSE` give the specification's 0 at `k < 0` or `k > n` for a natural `n`? Default: as landed, the glue's 1.
- PLAN.md:714, under "Off the path, parked > Climb batch 27, listed for his review", 226 characters, names row 928: - W.skeptic.4 of climb batch 27's rung W (row 928): a program's object below `JavaBufferedWriter` or `JavaBufferedReader` stops at its first inherited native.

## The lines that look stale at 257cae950

From `plan-moves.py --stale-at 257cae950`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 515. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:13, under "Where we stand": list: it names items in (a) among open ones: 528, 530, 533. The line: - **Next.** Climb batch 31's run 1 landed (phase 4's eleventh line) at `7858d0e97b`, on his go of 23:04 UTC on 2026-11-16, and its post-batch review is committe
LOOK PLAN.md:91, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:243, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on
