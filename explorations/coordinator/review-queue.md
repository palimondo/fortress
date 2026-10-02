<!-- The items waiting for Pavol's word or review across the record (the boot note's list, the held list, PLAN's lists for his review and its parked items), merged, each with its home, its state and its default, in the order they need him; built 2026-10-02 by a read-only worker at `99f68f37e`. Entry 4 (the merged-diff review) was answered at 15:39 UTC: kept (POSITIONS, "A blocking second review does not hold a green batch."). The coordinator keeps this file current as items are answered. -->

What waits for Pavol's word or review, 2026-10-02

I only read; nothing was edited. Line numbers are those of `main` at `99f68f37e`. "PLAN" is `explorations/coordinator/PLAN.md`, "POSITIONS" is `explorations/coordinator/POSITIONS.md`, "held list" is `explorations/coordinator/postmortem-2026-09-19/held-list.md`, and "synthesis" is `explorations/coordinator/postmortem-2026-09-29/synthesis.md`.

**Counts**
- Group 1, what shapes the next batch record or how batches run: 11 items, one of them not ripe yet.
- Group 2, what must be decided before phase 4: 7 items, one not ripe.
- Group 3, reviews of decisions already taken by default: 76 items.
- Group 4, housekeeping only he can do: 4 items.
- Group 5, the rest: 18 items.
- 116 open entries in all. The settled and stale items are listed at the end.

**Four things to know first**
- **POSITIONS contradicts itself on the `wip/` branches.** Line 101 says "The `wip/` branches stay as they are (branches are not deleted)". Line 102 says "the wip branches are cleaned up after the gate". The rewrite (`d11dfaf43`) did not settle it. `origin` has 64 `wip/` branches today; the held list still says nine.
- **Two items in the boot note exist in no file of the tree.**
  - The recommendation on the jars and the built PDFs. It is in the report the cleaning-by-kind worker returned on 2026-09-30, which survives only in the session transcript (`fe616d40….jsonl`, about line 51651). The boot note credits it to "the cleanup review", but `cleanup-review.md` has no such line.
  - The list of the ten largest non-rung FACTS entries. It was in the shortening worker's report; the message of `d4ddb06c4` does not carry it.
- **Answer 9's left-open items are not in PLAN.** POSITIONS:44 says section 10 of the overloading judgement "took the record's defaults, listed for his review". PLAN names none of them. Item 5 is live (entry 15), item 6 is settled, item 7 is a review (entry 25).
- **Group 3 should go to him by batch, not one item per message.** POSITIONS:98: "a rung's small items go to the ledger for review, not to him one per message." Most of group 3 is such items.

When batch 8 lands, its own section 1 "Read from the record, not asked" and its rungs' lists join group 3. They are not listed here.

## Group 1: shapes the next batch record or how batches run (11)

1. **Rung B's written bounds (item 20).** Do the `extends Object` bounds that batch 7's rung B wrote stay, once the checker binds a type parameter nothing fixes to its bound?
   - Home: PLAN:153; CLIMB-BATCH-8.md §1, "What the batch leaves out".
   - State: open, to be read again after batch 8's rung I lands.
   - Default: the line as landed, in force. POSITIONS:47 says the bounds "become unnecessary and may stay".
   - Waits on it: batch 9's record.
2. **The self-typed bodies (not ripe).** Distance class S1: 28 checker errors where a trait like `Integral[\I\]` returns `self` as `I`. A list of every way and a top-tier judgement come first, then his decision.
   - Home: CLIMB-BATCH-8.md §1, Q2 (answered (1)); boot note, held-list.md:7.
   - State: the judgement runs without asking under POSITIONS:105.
   - Default: none yet.
   - Waits on it: batch 9's record.
3. **This week's pacing.** Only batch 8 and its review run this week, because the weekly pool lasted about two days of batch work.
   - Home: boot note (held-list.md:7).
   - Default: this pacing, "unless he says otherwise"; in force.
   - Waits on it: when batch 9 launches under the standing go (POSITIONS:107).
4. **Dropping the merged-diff review.** This is the one review of the merged batch beside the gate; its checks would move to the post-batch review. It saves about 7% more tokens, but a wrong specification sentence would then be fixed one batch later.
   - Home: synthesis §2(b) and §6 default 2; boot note.
   - State: answered 15:39 UTC 2026-10-02: kept. It would reverse his "Yes to both" (POSITIONS:104), so it waits for him.
   - Default: the review stays; in force.
   - Waits on it: how batch 9 runs.
5. **An expected-output file beside an interpreter test.** A `Foo.out` beside `Foo.fss`, compared when present: a standing net now that the output comparison is gone. One small harness rung.
   - Home: synthesis §2(a) and §6 default 1 ("Say so and it is briefed").
   - State: an open offer. Default: not built.
   - Waits on it: nothing until he asks.
6. **A protocol line: a worker's change is reviewed by reading the change, not its report.**
   - Home: PLAN:229, "Asked 2026-09-27".
   - State: open. No such line is in `explorations/protocol.md`; its principle 5 is now about delegation, since the protocol was renumbered.
   - Default: none.
   - Waits on it: how the skeptic and the review are briefed.
7. **A judge may not strike a candidate from a fork.** One sentence in the judge's instruction: list every candidate, recommend one, strike none.
   - Home: PLAN:232, second half; reviews/batch-3-conformance.md:307 and :375.
   - State: open. Neither the batch script nor its manual has the sentence (a grep for "strike" finds nothing).
   - Default: none. Waits on it: how batches run.
8. **Workflow option (b).** A skeptic or review approves with required corrections when the fix is already written.
   - Home: PLAN:285; POSITIONS:104 ("has not been put to him"); open-items-2026-09-26.md item 26.
   - State: parked, never put to him. Default: not taken. Waits on it: how batches run.
9. **A test-name comparison in the gate.** Red when a test that passed before is missing or failing.
   - Home: PLAN:285; POSITIONS:109 ("a script change put to him on its own").
   - State: parked. Default: not built. Waits on it: how batches run.
10. **The top-tier review's second script change.** The hard-coded standing stops would become "the stops the batch record's intro reserves for Pavol".
    - Home: PLAN:285; open-items item 27.
    - State: unclear. Since the post-mortem's rewrite the script carries `BATCH_INTRO` and `INTRO_LIFTED` (climb-batch-workflow.js:625-632). Whether that answers it is not verified.
    - Default: the script as it stands.
11. **The gap ledger.** What it is for; who writes rows, when and under which instruction; whether to re-sort it; that row numbers stay stable; whether grouping open rows by plan phase is the right principle; PLAN as the place; re-deriving its stale worklist and counts, which cover rows 1-310 only.
    - Home: held-list.md:13-21 (his message, 07:57 UTC 2026-09-27); PLAN:230; POSITIONS:77.
    - State: open. He wants to understand the proposal first and has given no go.
    - Default: none.
    - Waits on it: nothing blocks, since batch 9 is drafted from the distance table. It decides how ledger rows reach batches.

## Group 2: before phase 4 (7)

12. **Item 35: the one binding text for the natives.** Either `builtinPrimitive("…")` naming a static helper, or `import java` blocks as the compiler library writes them.
    - Home: PLAN:205; perf-probes/prelude/natives-shape.md §4.
    - State: open, no default. A top-tier judgement may run first without asking (POSITIONS:105).
    - Waits on it: N0, the first natives rung. The natives rungs may run beside phase 3, so this one could reach batch 9.
13. **Item 31: `widen` of a `ZZ` too large for `ZZ64`.** Keep the low 64 bits, as walk does today, or raise `IntegerOverflow`?
    - Home: PLAN:197; ledger rows 349 and 502.
    - State: open, no default.
    - Waits on it: phase 4's natives, since the compiled prelude has no `widen` on `ZZ`.
14. **Item 17: row 446.** A call whose static type lies above a sized arm's domain reaches that arm at run time and dies reading its size. The row holds three candidate fixes.
    - Home: PLAN:191; the ledger's row 446 ("Pavol's to choose").
    - State: open, no default. Waits on it: the switch-over.
15. **The rest of item 12.**
    - The dead sizes' diff (25 api declarations, re-based 2026-09-29).
    - Row 41: an exported name fails to link when the component's name differs from its api's. This is the class-name half of row 320.
    - Answer 9's section 10 item 5: walk refuses an unused unknown size as the checker does. Its default is yes, after the dead sizes go.
    - Home: PLAN:149; POSITIONS:39; held-list.md:59; reviews/overloading-judgement.md §10.
    - Default: shown to him as diffs with the switch-over's design. Waits on it: phase 4's design.
16. **Where a size too large for `ZZ32`, used as a value, is refused.** Under walk such a function quietly answers a `ZZ64`.
    - Home: PLAN:381.
    - State: "still his to place"; no default.
    - Waits on it: Q-walk (walk's numeral as `IntLiteral`, phase 4), which meets this case.
17. **Whether and when walk carries the expected type into a generic call.** Row 510, plus the walk gaps of rows 21 and 364.
    - Home: PLAN:336.
    - Default: walk as it is, the gaps gated by tests; in force.
    - Waits on it: the switch-over's step that gives walk the checker's static types.
18. **The switch-over's own design (not ripe).** That design includes the step that gives walk static types, which PLAN says is "not yet designed". Q-walk's three restated team tests are "each shown to him".
    - Home: PLAN:101-111; POSITIONS:36 ("a plan put to him step by step").
    - State: not drafted. Waits on it: phase 4.

## Group 3: reviews of decisions already taken by default (76)

Unless an entry says otherwise, the default is the landed state, it is in force, and nothing waits on his review.

**The batch practice and decisions he took on recommendation**
19. Synthesis default 1: no rung runs the interpreter corpus to compare outputs; the one-time counts his decisions name are kept. Home: synthesis §2(a); POSITIONS:108; held-list.md:44-48.
20. Synthesis default 2: one skeptic per rung; one merged review beside the gate, whose judge and repair act on code defects only; no second review. Home: synthesis §2(b).
21. Synthesis default 3, which answers his 18:25 point (held-list.md:31): new tests are named by topic; the existing `Rung<X>` test files are not renamed. Home: synthesis §2(c). Its one-time strip of `.tex` line numbers is done (`dc0eee2fe`, `2040cd056`).
22. Item 22: `TotalComparison` extends `StandardMinMax`. He took it on recommendation and asked for a fuller explanation "when he has the energy". Home: PLAN:223; POSITIONS:88.
23. Rung S's inference sentence extends the POPL 2019 paper's run-time rule to static inference. Home: PLAN:224.
24. Item 30's clause departs from the paper where nothing constrains the type parameter. Home: PLAN:225.
25. Answer 9 §10 item 7: Naden's return-type-restricted instantiation is recorded as future work in the decision record, not given a ledger row. Home: overloading-judgement.md §10; POSITIONS:44. It is not in PLAN.
26. The conversion judgement's defaults. Walk promotes from run-time types, so walk and the compiled path can run a generic at different instances (row 509). The numeral tie rule is stated once. Home: PLAN:312.

**Batch 7b: questions he was asked, each with a default**
These are possible later checker or specification rungs.
27. gather.1 (row 546): keep the Meet Rule's closed-trait case for generic families in the specification, with the checker to follow, or scope it to declarations without static parameters. Home: PLAN:409 and :422. Default: the text as written; the checker's refusal gated.
28. Does an identical coercion on every candidate count as "fixed"? A yes also changes a Meet Rule sentence. Home: PLAN:397. Default: batch N's rule.
29. Should coverage of functional methods read the declarations of types below the type that provides them (`SkFnBetween`)? Home: PLAN:399. Default: as the text and the checker have it.
30. A written static argument on a name with a generic and a plain declaration: walk runs the generic, the compiled path the plain one, and the rule is open. Home: PLAN:410. Default: none; walk's answer pinned.
31. Do two parameter types exclude each other when only arguments a bound rules out could meet? Home: PLAN:402.
32. The Meet Rule for dotted methods keeps its exact-meet form. Home: PLAN:403.
33. Row 545: which of the specification's two rules governs a family that mixes a top-level function with functional methods. Home: PLAN:420.

**Batch 7b: defaults taken**
34. Row 542: the compiled Return Type Rule is stricter than the paper's for an object domain. Home: PLAN:394. CLIMB-BATCH-8.md §1 keeps it.
35. Row 543: typing a call by the intersection of return types is limited to families with no static parameters. Home: PLAN:395; POSITIONS:50.
36. The coverage check reads a functional method's self type by its trait. Home: PLAN:396.
37. The positional rule applies only when both declarations have as many static parameters of their own. Home: PLAN:398; POSITIONS:44.
38. The `makeSet` example keeps the Working Draft's explanation that the call is ambiguous. Home: PLAN:404.
39. Rung S revised three passages beyond its brief. Home: PLAN:406.
40. The POPL recheck's five defaults, as rung S wrote them. Home: PLAN:408; POSITIONS:47.
41. Rows 534 and 549 have the ledger row alone as their home, since no walk harness key can gate them. Home: PLAN:407 and :411; the harness key line is PLAN:97.
42. Row 550: walk's lifted return rule keeps `pickFirst` refused. Home: PLAN:412.
43. Row 551: walk trusts `comprises` clauses it never checks, so an invalid program now loads. Home: PLAN:413; POSITIONS:50. The repair is the walk rung after batch 8.
44. Row 539: walk refuses the paper's valid `ArrayList`/`List` set. Home: PLAN:414.
45. Row 547 (gather.2): a compiled verdict can depend on the components compiled before it in one JVM. Home: PLAN:415. Default: the row, for the checker phase.
46. Rung S's skeptic's stop "normative text for a rule neither path runs": met and lifted. Home: PLAN:421.
47. The C, S, W and L rungs' lists for him: on file, not sent. Home: PLAN:424-427.

**Batch N's first run**
48. `ZZ32` with `NN32` promotes to `ZZ64`. Home: PLAN:361.
49. Row 437 closes on walk only, with Q-walk; row 432 does not close by the numeral switch. Home: PLAN:363.
50. Walk converts a function body to its declared return type (row 387), in Q-walk. Home: PLAN:364.
51. `FloatLiteral` unchanged. Home: PLAN:365.
52. Left out and named so they are not lost: a self-naming bound beside a catch-all, and the fast shape of `=`. Home: PLAN:367.
53. The I, K, T and M rungs' lists: not sent. M's home-2 pair `XXXMaxNN32IntoZZ64RungM` is kept as landed. Home: PLAN:368-371.
54. Rung I reads a tied numeral, then resolves the call; a numeral too large for every declaration is refused. Home: PLAN:328.
55. Rung I's ranking of a generic among declarations reached by coercion. Home: PLAN:329.
56. Rung I's fallback when no attempt is kept. Home: PLAN:330.
57. Rows 391 and 455 stay open. Home: PLAN:332.
58. Rung K edits `Init.java`, outside its file list. Home: PLAN:334.
59. Row 512's home 2 (a gated expected-failure test) goes in rung K's repair. Home: PLAN:335.
60. `Coercions.addSource` leaves a generic `coerce` out; left as it is. Home: PLAN:337.
61. Answer 8's promotion reaches user coercions. Home: PLAN:338.
62. The inference chapter describes type, `nat` and `int` parameters only. Home: PLAN:339.
63. Row 325's faces: a numeral converts only into a type that holds it. Home: PLAN:341.
64. Rung T's wording decisions. Home: PLAN:342.
65. The gated inference gaps, rows 506, 507, 511 and 513. Home: PLAN:345-349.

**Batch 6.5b**
66. Walk's arithmetic in a size is refused at any operation that leaves `ZZ64`. Home: PLAN:378.
67. Row 527: a raw `NegativeArraySizeException` under walk; no batch named. Home: PLAN:382.
68. The printed bounds of `MIN # 0`'s empty range. Home: PLAN:383.
69. `XXXNatRangeChecker` reports 16 errors for 7 sites. Home: PLAN:385.
70. The E and V rungs' lists: not sent. Home: PLAN:387-388.

**Batch 6.5**
71. Rung G's dispatch answers for an unmeasured class (row 499), until phase 5. Home: PLAN:316.
72. Rung P: ℚ's listing gains four algebraic traits, with a sentence on their laws. Home: PLAN:319.
73. Rung P states `narrow` on `ZZ`, and `MaybeRungM`'s comment is reworded. Home: PLAN:320.
74. Rung P's harness shown red on a copy. Home: PLAN:322.
75. Rung P's stop: the `GCD` and `LCM` overflow text. Home: PLAN:323.
76. Row 500's `shift` properties are left as they are. Home: PLAN:321.
77. The G and P rungs' lists: not sent. Home: PLAN:327.

**Batch 7C**
78. Rung Y's code decides by names (rows 489 and 490); repairing it changes the 14 lines he approved. Home: PLAN:305.
79. The proviso that rejects the team's `where` spelling of `comprises`. Home: PLAN:306.
80. Rung X's wording decisions D1, D2 and D8, and the `SkTwoLevel` case. Home: PLAN:307.
81. `checkDeclComprises`'s header comment. Home: PLAN:304.
82. Row 22: walk never checks a `comprises` clause; walk stays as it is. Home: PLAN:315.
83. The Y and X rungs' lists: not sent. Home: PLAN:313.

**Batch 7R**
84. Row 452's test restated and renamed. Home: PLAN:301.
85. `BlockedRange` respelled over `ZZ32`. Home: PLAN:302.
86. Rung U's two notations: the factorial and the midpoint. Home: PLAN:311.

**Batch 7**
87. Row 458's changed behaviour of `ANDCOND`. Home: PLAN:289.
88. Rows 456 and 457 are not repaired, because each repair changes a value walk prints. Home: PLAN:291.
89. Where `fill` and `tabulate` sit in the array traits ("His to confirm"). Home: PLAN:295.
90. The `tabulatedArray*` names ("his to change"). Home: PLAN:296.
91. The 32 demo lines respelled, and row 464. Home: PLAN:297.
92. Rung B: rows 469-473, and its ten-line edit where the record counted eight. Home: PLAN:299-300.

**Batches 6b and 6**
93. Batch 6b's ten test files outside its file list. Home: PLAN:309.
94. Rung F's `=` on `Number` (its decision D1). Home: PLAN:232; reviews/batch-6-conformance.md:60.

## Group 4: housekeeping only he can do (4)

95. **The `wip/` branches.** First settle POSITIONS:101 against :102. Then delete the remote `wip/` branches (64 today) and the redundant `notes/postmortem-2026-09-19` in the GitHub UI.
    - Home: held-list.md:56; PLAN:288; boot note.
    - State: open; no default, since the two positions contradict each other.
96. **The cleaner pass of `main`.** The process record moves to its own branch and `main` is rewritten to hold only the Fortress changes, force-pushed from his machine. With it:
    - the two noise commits `8fcca6703` and `3e85b709c`;
    - the history rewrite that drops the four transcript files;
    - the GitHub-issues plan.
    - Home: held-list.md:57-58; PLAN:288; POSITIONS:112; synthesis §2(d).
    - State: open. The synthesis's precondition, one batch run clean under the new rules, is met by batch 7b (`b0eb41516`; reviews/batch-7b-review.md, "For Pavol").
    - Waits on it: his machine.
97. **The tracked jars and the built PDFs.** The jars in `ProjectFortress/third_party` (36 MB) would be fetched by a setup step, and the built PDFs would become release artifacts.
    - Home: the transcript only, plus the boot note.
    - State: an open recommendation, not done.
    - Two cautions. `Specification-1.0-frozen/fortress.1.0.pdf` sits in the directory POSITIONS:85 says is never touched. And removing files shrinks a checkout only together with entry 96.
98. **The skill-extraction session.**
    - Home: PLAN:288; open-items item 36.
    - State: his to start; the tree holds no detail beyond its name.

## Group 5: the rest (18)

99. **Item 14.** Rung S's sentence that refuses a `where`-clause variable as a static argument in an `extends` clause; it refuses more than the rule does. He wants a plain explainer first.
    - Home: PLAN:159. State: open. Default: the sentence stands.
100. **Item 13: the six array forks.** It absorbs item 15 (his Q4 answer) and his own unanswered question why microGPT uses `RR64` and not `RR32` (POSITIONS:75).
     - Home: PLAN:236.
     - State: placed after the switch-over (phase 5).
     - Note: forks 1-3 hold distance classes Z1, V1 and V2 (CLIMB-BATCH-8.md §1), so phase 3's "true zero" excludes them unless he moves those forks earlier.
101. **Rung T's number-chapter questions**, with no defaults:
     - does ℚ hold ±∞ and 0/0;
     - does `QQ` declare `check` and `check_star`;
     - the result of a negative integer power (row 441: walk 0.5, compiled 0, Working Draft 1/2);
     - what "(exact)" means for a numeral above 2^53 (row 443).
     - Home: PLAN:279. The natives rungs leave negative exponents to row 441.
102. **Row 360:** a numeral near a tie rounds as its nearest double; three options on file. Home: PLAN:282.
103. **Row 331's re-gating, and the judgement's candidate rows 2, 3 and 5.** Home: PLAN:281; POSITIONS:80 and :87.
104. **Re-approval rows 42, 44, 45, 46 and 48, and the ledger homes of rows 374-377.** Home: PLAN:280.
105. **A ledger row for code generation's refusal of `where` clauses, and a section for the cost rows** ("Pavol's call"). Home: PLAN:287.
106. **Typecase's binding syntax.** Default (a): a later specification rung revises the section to the grammar the implementation has. Home: PLAN:293.
107. **Row 533:** which side repairs the checker's refusal of the model's numeral powers. Home: PLAN:118. Waits on it: phase 5.
108. **The lineage cleanup**, the root README's line on `Specification-1.0-frozen/`, and the `clean-ladder`-to-`main` rename that was not carried out. Home: PLAN:286; POSITIONS:19.
109. **The inventory's move list.** It waits on his reading. Home: PLAN:286; POSITIONS:112. Re-check it before it is put to him, since the cleaning by kind removed much of `explorations/`.
110. **The testing archaeology's answer to his hypothesis:** "in part", and the cause is the coordinator's construction of the skeptic, not his request. Home: postmortem-2026-09-29/archaeology-testing.md §7.
111. **A review of the tests the batches added and changed** (his `PowChooseLcmRungE` question). Home: held-list.md:32. State: partly answered by characterization.md and review-fable.md:111; no review of the tests themselves was run. Ask whether he still wants one.
112. **Retitling the FACTS titles that carry a date, batch or rung.** Home: boot note; consolidation-review.md Part 1, recommendation 2. Five stale titles were already given a present-tense first clause in `a38c1e746`.
113. **The ten largest non-rung FACTS entries, left long.** Home: boot note. The list itself is in the transcript only.
114. **The tools reorganisation.** Home: consolidation-review.md Part 2, recommendations 1-5. Not done: `check-index.sh` is still in `coordinator/`.
115. **Pricing the project's tokens at API rates,** "whenever he asks". Home: PLAN:354.
116. **The leftovers of inventory item 36:** the map's §4 survey decisions, two explanations from 09-20 with no record of delivery, and "the scratchpad sweep", which is defined nowhere. Home: open-items items 29 and 36. State: unclear; ask once whether any still matters.

## Settled or stale: can leave the lists

**Held list**
- Line 23, the three worker questions, skeptic checks 11-13 and the gather's filing of his items. Answered at `362afb06f`; the checks are built (climb-batch-workflow.md:64 and :84).
- Line 23 and PLAN:231, a top-tier judge ruling overnight. Settled by POSITIONS:104-105 (a judge's second ruling is pre-approved) and :107 (overnight runs).
- Lines 26-48, the post-mortem blocks of 2026-09-29. Answered by `archaeology.md`, `characterization.md`, `review-opus.md` and `review-fable.md`. Settled by POSITIONS:101 and :108 and by the cleaning (`d2d5e83a8`, `8c6e858ce`). Only the review of the tests stays (entry 111), and the test names (entry 21).
- Line 52, the direction research. Acted on in POSITIONS:36.
- Line 59:
  - row 321 is built (POSITIONS:81);
  - the gate's thread count is pinned in `build.xml` (FACTS:87);
  - rows 346 and 348 are decided (POSITIONS:62 and :37);
  - row 320's class-name half moves into entry 15.
- Line 60, the 1.7M tokens spent on the wrong tier. Recorded in POSITIONS:103.

**PLAN, "Pavol's answers"**
- Items 2-11 are settled by POSITIONS:39, :87, :40, :63, :70, :68, :64, :44, :79 and :38, in that order.
- Item 12's first part is settled by POSITIONS:39 (row 400 closed).
- Item 19: row 79 goes to Q-walk (POSITIONS:66).
- Items 15 and 32 are answered at batch 8's Q4 and Q3.
- Items 16, 18, 22, 23, 26, 27, 30, 33 and 34, and R1-R11, are all marked answered.
- Phase 3 item 6's sub-bullet "if he takes item 32 … item 15 … here or later" is answered by Q3 and Q4.
- Answer 9 §10 item 6, `seq`'s device, is settled by Q1 (a).

**PLAN, "Off the path, parked"**
- Rung C's two points: closed by item 16 and POSITIONS:49.
- The closure accommodation: overtaken by POSITIONS:43.
- Rung H's stop: `SQCAP` and `isLeftZero` are in batch 8.
- Rung X's re-anchored citations: overtaken by `dc0eee2fe`.
- PLAN:317, rung W "promotes" the α-renamed pairs: stale, since rung W kept the refusal and item 32 is not taken.
- PLAN:310: a routing line only.
- Row 516: decided by the paper's instance rule.
- Lines that say "nothing is asked" or are information only:
  - rows 482, 498, 501, 514 and 460;
  - the two older home-2 tests;
  - `widen(0)`'s pick;
  - the O2Z64 crash;
  - answer 8's promotion on the compiler prelude;
  - `classify.py`;
  - rung H's two added test files;
  - the paragraph after the arrays figure;
  - `ant testSpecData`'s red count;
  - row 404's design note.

**Batch 6.5b's list**
- Row 531: in batch 8's rung M.
- The compiled powers and `CHOOSE`, the compiled `try` shapes, and row 522: "nothing is asked".
- Row 528: its default is the switch-over and nothing asks for an exception.
- The second run's default, the owed tests written in rung E: done.

**Batch 7b's list**
- Row 556, `DelegatedIndexed`, and rung L's stop: answered by Q1 (a).
- review-routed.1 and .2: in batch 8's rung M.
- The dynamic-applicability annotation and the Return Type Rule's repair: information only.
- Row 499's tie: routed to a later checker rung.
- The gather.1 stop line: a duplicate of entry 27.

**Batch N's list**
- Run 2 retired: settled.
- Rows 425 and 447: close in batch 8's rung I.
- Rung I's ambiguity check against item 26: item 26 is decided.

**Synthesis**
- Default 4, the cleaning's scope: overtaken by the cleaning by kind (`cleanup-review.md` §2; `d2d5e83a8`).
