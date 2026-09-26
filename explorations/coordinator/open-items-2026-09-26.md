<!-- Written 2026-09-26 by a delegated worker (read-only everywhere except this file) for the coordinator, as the evidence under the plan Pavol asked for that day (POSITIONS.md:132): every item open for him, the remaining path from the tree at HEAD (65191b779) to microGPT compiled and running fast, and where the record disagrees with itself. It recommends no order. Sources: CLAUDE.md; explorations/protocol.md; coordinator/FACTS.md, POSITIONS.md, INDEX.md, PLAN.md, map/README.md, library-route-judgement.md, checker-gate-review.md, climb-batch-3-redesign.md, explorations-inventory.md, CLIMB-BATCH-3.md, CLIMB-BATCH-4.md, postmortem-2026-09-19/held-list.md (line 7, the boot note) and decisions-for-reapproval.md; microgpt-run-c-handover.md (first section); fortress-gap-ledger.md; compile-ladder/climb-batch-3/, -3.5/, -4/ RECORD.md and gate/; the rung records of rung-nat-checker, rung-interp-coercion, rung-walk-overflow, rung-shift-count, rung-analyzer-memo, rung-library-comments, rung-library-defects, rung-round-half-even, rung-exclusion-relax; compile-ladder/baseline-2026-09-19/microgpt-phase.md; reviews/spec-refused-examples-judgement.md, wrap-dependent-code.md, exclusion-design-brief.md, array-design-review.md, mie-probes/price-keep-the-rule.md, mie-probes/flat-world-for-users.md; perf-probes/nat/size-rung-probes.md, triage.md; perf-probes/prelude/desugar-codegen.md. One untracked file was read, not cited as record: tmp/gate-batch-4/checker-count/run.txt, the full checker output of batch 4's landing gate, used only to count the 125 errors by message. -->

# Open items and the path to a compiled microGPT, 2026-09-26

Terms, once:
- **walk** is the interpreter (`fortress file.fss`); the **compiled path** is `fortress compile` plus `fortress run`.
- A **prelude** is the library a path reads without an import. Today the compiled path reads its own (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`), walk reads `FortressLibrary` and `FortressBuiltin`.
- **The switch-over** is the step where the compiled path reads walk's library and the compiler prelude's files are deleted, their tests kept (POSITIONS.md:46).
- A **rung** is one fix, built test-first by one worker and judged by a second (the skeptic). A **batch** is several rungs merged and run through **the gate** (the full suite, the four-thread `atomic` runs, the ladder regression, and the checker count).
- **The checker count** is the number of errors the compiled type checker reports over walk's library's apis, a stage of the gate since climb batch 3 (FACTS.md:53).
- **The exclusion rule** (the team's "multiple instantiation exclusion") forbids a type from being two different instantiations of one generic (FACTS.md:42). **Route A** keeps it and **flattens** the library's number tower, with walk taught coercion first (POSITIONS.md:92).
- **Design B** gives a `nat` size at run time the same descriptor object a type argument has (POSITIONS.md:93).
- A measured defect has one of three **homes**: 1 repaired with a gated assertion, 2 deferred with an expected-failure (`XXX`) test because the specification settles it, 3 deferred with a probe and a ledger row because the specification is silent (`coordinator/climb-batch-workflow.js:569`).

## A. What is open for Pavol

Thirty-six items are open. Nine bear on the next batch's rungs; five bear on the switch-over; two on the array work; twenty sit off the path. Each entry gives what it decides, where it is, what it blocks, and any recommendation or default on record.

What the record names as the next batch (batch 5):
- the specification rung S (POSITIONS.md:111);
- the flattening rung (POSITIONS.md:92, "a library rung of the batch after"; CLIMB-BATCH-4.md:30);
- the run-time size rung (POSITIONS.md:93; CLIMB-BATCH-4.md:31).

The wrapping-operator library rung and rung O again are decided but not placed in a batch (POSITIONS.md:108). The wrapping rung may not share a batch with the flattening: both edit the `ZZ32`, `ZZ64` and `Integral` declarations, and batch rule 1 forbids two rungs changing one declaration (`compile-ladder/rung-walk-overflow/JUDGE.md:80`, `:105`; `reviews/wrap-dependent-code.md:171`; `coordinator/climb-batch-workflow.js:370`).

### A1. Items that bear on the next batch's rungs

1. **What rung S's citations call the unrevised copy of the specification.** The unrevised copy is `Specification-1.0-frozen/`, which holds the 2011 draft, not 1.0 (FACTS.md:104). Source: POSITIONS.md:109, :129. It blocks rung S's text. No default on record. The lineage note it waited on has landed (FACTS.md:106).

2. **Whether sizes and boolean arguments count in the exclusion rule, and where the checker's size case goes.** Source: POSITIONS.md:123; `reviews/spec-refused-examples-judgement.md:216`, § 6. It blocks how rung S states the rule. It also blocks where row 402's `checkP` repair lands; row 402 says that repair is "owed once rung S's revision of the prose lands" (`fortress-gap-ledger.md:413`). The Fable judgement recommends that the rule counts every static argument except operator arguments, with the checker change placed at the run-time size rung's gather (judgement § 6, § 13).

3. **Whether the 2012 `covariant` keyword is mentioned in the specification's text.** Source: POSITIONS.md:127; judgement:218. It affects rung S's text only. Default on record: record only, not in the text (judgement:218).

4. **Whether `RationalQuantity` survives as the specification's design for sign-refined rationals.** The library never had it. Source: POSITIONS.md:126; judgement:217, which calls it "a question for the flattening rung's brief". It blocks the flattening rung's brief, and the number chapters, which land in the same batch (POSITIONS.md:132). No default on record.

5. **The replacement for `SUM`'s (and `PROD`'s) catch-all on `Number`.** Route A removes that catch-all, and the replacement decides whether C4's text stands. Sources: POSITIONS.md:92 (it "comes to him before it is built", as a diff if it would touch a line of C4); `reviews/exclusion-design-brief.md:141` ("which of the three `SUM`/`PROD` replacements"); `reviews/mie-probes/flat-world-for-users.md:115`. It blocks the flattening rung. POSITIONS.md:92 names "its empty sum of `0`" as the shape; the choice among the three is not recorded.

6. **The flattening rung's other questions that "come back to him".** They are generic inference over mixed widths (`lo:hi`), and how many interpreter outputs change when a wide binding really widens (`reviews/exclusion-design-brief.md:141`; flat-world-for-users.md:115). They bear on the flattening rung. POSITIONS.md:92 decides only that the sites are "kept in text and their outputs re-measured". No default on record for the mixed-width join.

7. **Loader or factory for a number's descriptor under design B.** Under (a) the loader writes a holder class per number; under (b) a factory keeps one descriptor per number with no holder class. Source: `perf-probes/nat/size-rung-probes.md:17`, `:130`; POSITIONS.md:93 (the probe result goes to him with the rung's brief). It blocks the run-time size rung's brief. The worker's reading, not a decision, is (b), the factory. The two give the same answers on nine programs (FACTS.md:39).

8. **`NN32` and `NN64` wrapping under walk.** Row 379's ten natives do not cover them, and `UnsignedTest.fss:195-211` relies on the wrap. Source: POSITIONS.md:108 ("Open, for the rung's manifest"); `reviews/wrap-dependent-code.md:187`; CLIMB-BATCH-4.md:34. It blocks the wrapping rung's manifest and rung O again. The wrap note calls it "the same question as this note's, larger", to come "when the unsigned natives are checked" (wrap-dependent-code.md:187). No default. Beside it, one small point: O's judge recommends two rungs, the library rung first and then rung O (`rung-walk-overflow/JUDGE.md:134`). POSITIONS.md:108 gives the sequence but does not say two rungs.

9. **His question whether the batch's steps should be split so that each stays in sync.** Source: POSITIONS.md:132. It frames the next batch's make-up. The coordinator's plan is the answer; nothing is on record.

### A2. Items that bear on the switch-over

10. **The specification's sentence that overloads of one name may not differ in static parameters** (`Specification/basic/overloading.tex:100-107`). Sources: CLIMB-BATCH-4.md:33, :236; `perf-probes/nat/triage.md:92`, `:113`; FACTS.md:41, :56; `compile-ladder/rung-nat-checker/record.md:85`, `:88`.
    - The checker errors under it: 35 of the 203 behind the checker's early return, among them `CAP` 12 and `openRangeHelper` 3, which are in today's count.
    - Two rows it repairs: 398 (an override that permutes its own static parameters type-checks and dies) and 400 (a dead-size arm dropped statically but chosen at run time).
    - It blocks the checker reaching zero on walk's library, and so the switch-over (section B). Route A does not decide it (CLIMB-BATCH-4.md:236).
    - Triage's framing: drop the sentence, as both implementations have, and give the pairs exclusions or meets; or restructure the library (triage.md:92). No default labelled.

11. **Decision 3 of rung N: a size left unknown in a call's static arguments is refused at the call.** Under the type twin's rule the call compiles, so sizes are stricter than types. Source: `rung-nat-checker/record.md:84`; handover:23. It bears on the switch-over: the library's six vector `DOT` declarations need E3 (item 12) either way, and "nothing reaches them before the switch-over" (record.md:84). The rung's reading, kept by its judge, is the default. The alternatives are a bottom size, defaulting to 0 (which he declined as E1), and a rule that looks at the body.

12. **E3: deleting the dead size parameters from the api**, shown to him as a diff. Source: POSITIONS.md:47. The shadow found 25 such declarations, not six (FACTS.md:32). It bears on the switch-over (item 11). Default on record: the diff is shown before it is built.

13. **Re-approval row 41: row 320's class-name half.** An exported name fails to link when the component's name differs from its api's (FACTS.md:22). Rung X gated it as an expected failure instead of fixing it. Source: `postmortem-2026-09-19/decisions-for-reapproval.md:41`. What reverting takes: a `.java` rung on `Linker.whoIsImplementingMyAPI`. It bears on the switch-over's natives batch. If the natives are one text plus a small binding component per world, this lookup becomes live work (FACTS.md:111; `library-route-judgement.md:37`). No recommendation on record.

14. **The checker-count stage and its report-only change, never approved on record.**
    - Sources: POSITIONS.md:44 (no yes on 09-20), :78 (to be checked against the transcript "before the stage is re-engineered"); `checker-gate-review.md:25` ("never approved the stage separately"); `checker-gate-review.md:101` (recommends (b), report only).
    - The change: `a2b4809a5` (2026-09-23 07:26 UTC) made the total never red on its own.
    - His word on the number: "get the count to zero" (`checker-gate-review.md:18`).
    - What it decides: whether the count is the switch-over's measure of distance.
    - Not on record as put to him (inferred from the absence of a POSITIONS entry).

### A3. Items that bear on the array work (after the switch-over)

15. **Array decisions A, B and D, and row 40's three questions.**
    - A: what puts `double[]` under the sized traits. B: where loops run unboxed. D: the model's own static types.
    - Sources: POSITIONS.md:70 (they stay after the switch-over, with plain explainers first); POSITIONS.md:102 (row 40 closed as no decision; the questions return through protocol § 6's method); `reviews/array-design-review.md:135-173`.
    - Decided in principle: `double[]` storage and `nat` sizes as the team designed them (POSITIONS.md:41).
    - The review's labelled defaults, not taken: probe A2 first; B2; D1 with D3. POSITIONS.md:102 says none of row 40's three stands as a default.

16. **The element width, `RR32` against `RR64`.** Source: POSITIONS.md:102 ("recommended to join the returning array questions, unanswered"). It bears on the array work. Recommendation on record: join the array questions.

### A4. Items off the path

17. **Re-approval row 42.** The gather added `compiler_tests/XXXExportVarRungXFrozen` outside any brief (decisions-for-reapproval.md:42). Reverting deletes two files. No recommendation.

18. **Re-approval row 44.** Rung B revived a team-commented `TryAtomicFailure` in `CompilerLibrary`, which reserves the name in compiled components (decisions-for-reapproval.md:44). Reverting re-comments two declarations. By inference, the switch-over deletes `CompilerLibrary` anyway.

19. **Re-approval row 45.** The gather refuted provisional row 344, replaced it with row 343, and re-classified row 347's home (decisions-for-reapproval.md:45). No recommendation.

20. **Re-approval row 46.** Rows 353 (`tryatomic` has no code generation) and 352 (the throws-clause check on neither path) landed as rows rather than fixes (decisions-for-reapproval.md:46). No recommendation.

21. **Re-approval row 48.** Batch 2's own gate summary became the comparand, replacing `gate-baseline` (decisions-for-reapproval.md:48). POSITIONS.md:103: "not taken; batch 4 runs under it as it stands". Still listed as open in the boot note at 07:43 UTC (held-list.md:7).

22. **The four ledger homes 374-377, which the landing worker chose on its own** (`compile-ladder/climb-batch-3/RECORD.md:130-136`):
    - row 374, a function value printed: walk's half home 2, the compiled half home 3;
    - row 375, object expressions on the compiled path: home 2;
    - row 376, an unparenthesised arrow domain: home 3;
    - row 377, `import java`: home 3.
    The alternative, rows without tests, is at RECORD.md:136. The item was put on his list on 09-23 (held-list.md:59) and is still open at 07:43 UTC (held-list.md:7). By a grep of C4 and the APL port, not a record, neither program uses an object expression.

23. **Row 360's fork: a numeral near a tie rounds as its nearest double on both paths.** The options are (a) a narrow patch of about 30 lines, (b) numerals as rationals, (c) the team's design recorded as a decision (`fortress-gap-ledger.md:371`; `rung-round-half-even/record.md:44`). It is in no open list of POSITIONS or the boot note. It interacts with row 330 and the float hot paths. No default.

24. **Row 331's future work re-gated on static-argument inference**, or the bare `Nothing` simply closed. Source: POSITIONS.md:124; judgement:214, § 8. It touches the ledger only. The judgement proposes the re-gate.

25. **The judgement's candidate ledger rows 2, 3 and 5.** Row 2: the acyclicity check reads a coercion's source by name. Row 3: an operator argument is not substituted into an inherited abstract method. Row 5: code generation throws on `Any` in an extends clause. Source: POSITIONS.md:128, :131; judgement § 9. Candidate 1 is decided (row 404), and candidate 4 is row 402 (POSITIONS.md:131). The judgement says yes to each.

26. **Workflow option (b): approve with required corrections when the fix is already written**, for skeptics and for the review. Source: POSITIONS.md:83 ("Not yet put to him"); `climb-batch-3-redesign.md:104-105`; handover:13. It changes how a batch runs and blocks no rung. The coordinator picked it on 2026-09-23 (POSITIONS.md:83).

27. **The Fable review's second script change.** The two hard-coded standing stops at `climb-batch-workflow.js` rule 4 and the judge's stop question would become "the stops the batch record's intro reserves for Pavol" (CLIMB-BATCH-4.md:488). Held-list.md:7 records it as not made, with `BATCH_INTRO` covering it. The review calls it advisable, not red without it.

28. **The test-name comparison** in the gate: red when a test that passed before is missing or failing. Source: POSITIONS.md:103 ("comes later as a script change put to him on its own").

29. **"The scratchpad sweep".** It is named in the boot note's open list (held-list.md:7, at 01:31 and 07:43 UTC) and defined nowhere in the tree (by search).

30. **The inventory's move list**: ten `git mv` lines, 139 citations, and the `apl-probes/` move left to him. Source: POSITIONS.md:86; `coordinator/explorations-inventory.md:280-363`. It waits on his reading. Group E (`experiment/`) is done (`7bc8177a3`).

31. **The root README's line calling `Specification-1.0-frozen/` "the frozen Fortress 1.0 specification"**, which only the PDF is (FACTS.md:106; the boot note at 07:57 UTC, held-list.md:7).

32. **The lineage cleanup**: the other files that still repeat the port-graft sentence, "left for his decision" (POSITIONS.md:20; `coordinator/lineage.md`; handover:13).

33. **Whether code generation's refusal of any declaration with a `where` clause or a contract becomes a ledger row.** FACTS.md:112 says "Pavol's call"; the judgement § 9 notes it. By reading, neither microGPT program declares a `where` clause, and `canCompile` refused nothing in walk's library (`desugar-codegen.md`, § 5.1).

34. **Whether the ledger's five cost rows get a section of their own.** FACTS.md:134 says "Pavol's call".

35. **Rung C's reported items with no answer on record** (`compile-ladder/rung-interp-coercion/record.md:52`, `:54`):
    - route A's price is wider than first put to him: any argument whose static type needs a coercion while its run-time type matches another overload, gated as `XXXCoercionStaticNarrowRungC`;
    - the judge's scope decision: tuple bindings repaired; an overloaded function's tuple parameter and tuple-typed fields gated (row 395).
    No decision is asked. POSITIONS.md:59 says a decision inside a report is to be flagged to him.

36. **Housekeeping he owns, with no date**:
    - deleting remote `wip/` branches: nine as of 09-20, and those of batches 3-4 since (held-list.md:39);
    - the two noise commits and the transcript-file history rewrite, for the cleaner pass (held-list.md:40-41);
    - the GitHub-issues plan, whose sentence was cut off and is held (POSITIONS.md:70);
    - the cleaner pass of `main` (POSITIONS.md:68);
    - the skill-extraction session (held-list.md:31);
    - two explanations he asked for on 09-20 (held-list.md:29), with no record of delivery found;
    - the map's § 4 list of survey decisions, never put to him as asks (`map/README.md:77-93`). One of them bears on the path: an interpreter-against-compiler differential test (map step 0, `map/README.md:101-109`).

### Decided or superseded, so not open

- Rows 379, 380/381 and 383, the three batch 3.5 handed back: POSITIONS.md:88-90.
- The route: POSITIONS.md:92. The run-time size design: :93.
- Rows 39, 40 and 47 of the re-approval table: POSITIONS.md:99, :102, :103. Row 30: :91.
- The judge's tier: POSITIONS.md:104.
- Rung C's stop, "(a), push": POSITIONS.md:106.
- Rung O's fork, the specification's wrapping operators first, which also decides row 348's spelling: POSITIONS.md:108.
- S1's form: POSITIONS.md:109. The later Types chapter cited beside the specification: :110. S2's per-example verdicts: :111.
- The two `covariant` ledger entries (row 404, worklist item 12): POSITIONS.md:131.
- The number chapters with the flattening rung's batch: POSITIONS.md:132.
- The correction of CLIMB-BATCH-4.md's S2 option (b): made when S is briefed (POSITIONS.md:130).
- The five questions of 09-24 on the exclusion brief: answered by route A (POSITIONS.md:92, answering :82 (1)).
- The tower closure `AnyIntegral comprises { ZZ }`: approved (POSITIONS.md:48). Route A withdraws its five-line accommodation as moot (`exclusion-design-brief.md:140`); see C8.
- The checker-gate review's recommendation (b) was taken in the script (`a2b4809a5`), without a recorded yes (item 14).
- The judgement's (§ 11) and the boot note's other items: S2, tower chapters, item 12, candidate row 1.

## B. The path to the goal

The record gives the order in two places.
- `coordinator/library-route-judgement.md` § 2, steps 0-7. Pavol took its destination on 09-21 (POSITIONS.md:46); the steps are "a plan put to him step by step".
- `coordinator/PLAN.md`'s steps 6-7, which follow the array work: the code-generation holes, then the kernels and C4 compiled, checked against walk and timed against a pure-Java baseline (PLAN.md:46-48; POSITIONS.md:24).

POSITIONS.md changes the judgement's order in three ways:
- route A's coercion rung first and the flattening in the batch after (:92);
- design B's run-time rung in the batch after 4 (:93);
- array decisions A, B and D after the switch-over (:70).

### B1. The steps, in dependency order

1. **Tag the sealed tree.** Done: `sealed-tree` at `75cca6683` (PLAN.md:32).

2. **The ladder baseline.** Done. 85 of 410 files pass compiled, unchanged through batch 4's gate (`compile-ladder/climb-batch-4/RECORD.md:169`).

3. **The two one-line runtime defects** (rows 302, 303). Done: `53362cb88` (FACTS.md:13-14).

4. **Stop adding to the compiler prelude.** Code-generator rungs continue. Decided 09-21 (POSITIONS.md:46; library-route-judgement.md:25).

5. **The checker count as a gate stage, and the api defects with no question attached.**
   - Done: the stage in batch 3 (`99c4715ac`, FACTS.md:53); report-only since `a2b4809a5`.
   - Rung L's five api repairs (`a7ced6764`, FACTS.md:50).

6. **The three probes of the judgement's step 2.** Done:
   - the exclusion trace (`perf-probes/prelude/exclusion-trace.md`);
   - the `nat` shadow (`perf-probes/nat/`);
   - the `import java` probe (`perf-probes/prelude/import-java-interpreter.md`; FACTS.md:111).

7. **Sizes in the compiled checker.** Done for `nat` and `int`: `3f297441c`, rung N (FACTS.md:54). `bool`, `dim` and `unit` are refused by name; row 307 stays open for them.

8. **Coercion in walk, route A's first rung.** Done: `b628871a2`, rung C (FACTS.md:86).

9. **The flattening rung.** Decided, not built; batch 5 (POSITIONS.md:92).
   - Size: route A was priced at "two rungs, each gated on the full suite", the library rung the larger (`exclusion-design-brief.md:139`). One remains.
   - Scope: 14 declaration headers (FACTS.md:43). The sites that rely on the subtyping stay in text and are re-measured: 160 library, 207 test, 37 microGPT (POSITIONS.md:92).
   - Depends on: step 8, done; items 4, 5 and 6; not sharing a batch with step 13.

10. **The specification rung S.** Decided, not built; batch 5 (POSITIONS.md:111). The number chapters change only in the flattening rung's batch (POSITIONS.md:132). No size on record beyond its list (judgement § 7). Depends on items 1, 2 and 3.

11. **The checker's remaining errors on walk's library, to zero.** Not yet designed as rungs; section B2 has the detail.
    - Measured fixes, on api copies, before rung N and with no suite run: 11 api lines; a `fill` rename of 11 lines; about 6 more lines (triage.md:85-91); and about 15 lines for `.fsi:2526` (FACTS.md:40).
    - What is left after those: the 35 under item 10's sentence; 32 Meet Rule errors that need a checker change, unmeasured; 5 in the tower (triage.md:92-95).
    - Depends on: item 10; step 9.

12. **The run-time size rung (design B).** Decided, not built; batch 5 (POSITIONS.md:93).
    - Size, in code lines: B's about 60, 17 of them written; the per-literal emitter, about 30, or the factory, about 20; the value-position piece, 25; B's dispatcher, 29; the extends-clause piece, 14; a one-method hash fix (FACTS.md:36, :38, :39).
    - Gate: the five sized compiler tests and the four probe programs (POSITIONS.md:93).
    - Depends on: step 7, done; item 7.
    - Inferred: the switch-over needs it. Four of the five code-generation refusals on cleanly checked library declarations are a numeric static argument: `__DefaultVector`, and `Rank1`, `Rank2`, `Rank3` in extends clauses (`perf-probes/prelude/desugar-codegen.md`, § 5.1, "The five").

13. **The wrapping operators in walk's library, then rung O again.** Decided, not built; no batch named (POSITIONS.md:108).
    - Size: about 50 library lines; eight small native classes; about 21 site lines in four library files; about 12 lines in five tests; one gated test (`reviews/wrap-dependent-code.md:170`). Then O's `natives.patch`, with its count re-measured.
    - Depends on: rung K, landed (`57600bc27`); item 8; not in the flattening's batch.
    - Inferred: the switch-over needs it too. The compiled path already throws on these bodies, so at the switch-over they raise there (FACTS.md:87).

14. **The library through desugaring and code generation once.** Measured on 2026-09-20 with the checker stepped around (`perf-probes/prelude/desugar-codegen.md`). Not re-run since rung N (inferred: no later record). The holes are listed in B2.

15. **The switch-over.** Not yet designed as briefs. The judgement's shape: "at least two gated batches" (library-route-judgement.md:37).
    - The natives batch: the 29 of walk's 108 `builtinPrimitive` bindings with no compiler helper written, and the 231 of `FortressBuiltin` matched to the compiler's helpers.
    - The names batch: 38 sources re-pointed; the two worlds collapsed with the `extends Object` setting kept; the compile recipe cut from five files to three; the prelude files deleted; at least 48 compiler-side tests rewritten to the specification's spellings.
    - Items fixed to "at the switch-over":
      - row 381's compiled half and row 383, with `XXXShiftDeclRungI` promoted and `shift` reserved (POSITIONS.md:89-90);
      - row 348's reversed spellings respelled in 10 compiled test files, 138 lines (wrap-dependent-code.md:171);
      - the `REM` guard, which goes with the prelude (POSITIONS.md:91);
      - rung M's prelude block (POSITIONS.md:51).
    - Not settled: whether `FZZ32` implements `FortressLibrary.ZZ32` or `FortressBuiltin.Int`; and the linker step of item 13 (library-route-judgement.md:37).
    - Preconditions: B2.

16. **Library rungs placed after the switch-over.** Row 330, `floor`/`ceiling`/`round`/`truncate` to ℤ (POSITIONS.md:49). Row 360's compiled half, if (a) is taken (item 23). Decided, not built.

17. **Decision D, the model's static types.** A diff, no code. The judgement puts it "as soon as step 3 lands and before any array rung" (library-route-judgement.md:39); POSITIONS.md:70 puts it after the switch-over (C9). Blocked on item 15.

18. **The array rungs.** Blocked on items 15 and 16; not yet designed.
    - Decision A's `.java` rungs, "at least three gated batches".
    - Then decision B, unboxing by static type in generated code, "the largest codegen work in the plan", with no size on record (library-route-judgement.md:41).
    - The array review found that as the model is written, nothing in microGPT passes the checker, whatever the storage (`reviews/array-design-review.md:13`).

19. **The code-generation holes microGPT hits.** PLAN.md:46; `map/README.md:135-143`. Not yet designed. By reading, not measured:
    - C4's `step` declares two local functions, `h` and `u` (`run-c4/src/MicroGptFlat.fss:54-55`), row 304's `Can't compile LetFn`;
    - `apl/mg/FlatArrays2.fss:137` has a `typecase`, row 340 if it is a whole body needing a coercion.
    The construct inventory the map proposed "doable now" (`map/README.md:141`) is not found on record (by search).

20. **The kernels and both programs compiled and run.** A differential check against walk, then timing against a pure-Java microGPT (PLAN.md:48; POSITIONS.md:24). Not built. Java models of the three kernels exist (FACTS.md:11); the whole-program Java baseline is not written (`map/README.md:165-167`).

21. **Parallelism on the compiled path.** Not yet designed (`map/README.md:157-163`).

### B2. The switch-over: what it consists of, and what must be true first

**What it is.** The compiled path's prelude becomes `AnyType`, `FortressBuiltin` and `FortressLibrary`, and `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra` are deleted, their tests kept (POSITIONS.md:46; library-route-judgement.md:23). Its two batches are step 15 above.

**The stated precondition.** The judgement's stop for the checker phase is "the stage prints zero errors and no crash, and `FlatArrays.fsi` type-checks with no error of its own". Its milestone is `fortress typecheck -fortress-lib` working on interpreter programs (library-route-judgement.md:33). Pavol's own words on 09-22: "get the count to zero" (`checker-gate-review.md:18`). The review adds that "when the switch-over is near, the real test of the milestone is a program": a gated test compiling a small program against walk's library (`checker-gate-review.md:97`).

**Why a zero count is necessary but not sufficient.** The record gives five reasons, and one inference.
- The count is masked. The `FortressLibrary` api stops at its hierarchy errors. Clearing `.fsi:2526` alone took that api from 2 errors to 260 in the zero probe. The component itself is never type-checked (`reviews/mie-probes/price-keep-the-rule.md:129-131`; `StaticChecker.java:268-272`, FACTS.md:40). Behind the early return: 203 errors, which the measured cheap fixes bring to 72 (triage.md:5-12, :92-95).
- The compile path's own desugaring gives every unbounded static parameter `extends Object`. The checker then refuses every generic instantiated at a tuple type: 712 more errors in the apis, 618 in the component (`desugar-codegen.md`, § 4.3; FACTS.md:31). The judgement's names batch keeps that setting (library-route-judgement.md:37).
  - Inferred: the gate's count runs under walk's setting and does not see these. Its per-api rows (`FortressLibrary` 110, `FortressBuiltin` 18) are the interpreter-setting column of § 4.3.
- Overload dispatch generation did not terminate on this library's exclusion graph: 1.05K s, stopped by hand (FACTS.md:31).
- Code generation refused 313 declarations and emitted 275 (desugar-codegen.md, § 5.1):
  - 227 are missing type annotations downstream of the checker;
  - 53 `Juxt`, all on declarations the checker crashed on or refused, "the checker's shadow" (desugar-codegen.md, § 6);
  - 1 `Label` (row 81);
  - 14 plus 4 a numeric static argument (step 12);
  - 7 malformed overload sets;
  - 6 type-reference refusals.
- The natives batch and its binding shape (step 15; item 13).
- By inference: the wrapping rung (step 13), so that the library's wrap-reliant bodies do not raise once compiled.

**The 125 errors today, by kind.** The committed table has 125 errors at 71 locations: `FortressLibrary` 55, `RangeInternals` 39, `NativeArray` 22, `FortressBuiltin` 9 (the table's rows count each error twice) (`compile-ladder/climb-batch-4/gate/checker-count.txt`; CLIMB-BATCH-3.md:160). By message, counted from the untracked full output (`tmp/gate-batch-4/checker-count/run.txt`) and matched to the committed classification of the 103 (price-keep-the-rule.md:123-127) and batch 4's added 22 (`climb-batch-4/RECORD.md:149`):
- **61, the exclusion rule on the number tower and the comparisons**: 35 "X excludes Y but it extends Y", 26 "Types X and Y exclude each other".
- **1 more "excludes but extends"**: `RelationalPredicateCondition`'s `excludes Condition[\()\]` at `FortressLibrary.fsi:2526`.
- **2 `comprises` errors**: `QQ`'s ellipsis at `.fsi:409` (row 354) and the `AnyIntegral` closure at `.fsi:411-412`.
- **22 `Invalid overloading of fill`**, in `PrimImmutableArray` and `PrimitiveArray`, uncovered by rung N.
- **36 overloading errors in `RangeInternals`**: `CAP` 17, `combine2D` 7, `combine3D` 7, `openRangeHelper` 3, `map` 2.
- **3 return-type errors** in `RangeInternals` (`atMost` 2, `every` 1; `:257`, `:259`, `:319` against `BoundedRange`).

**What the flattening removes.** Measured on the 103, on a library copy before batch 4 (price-keep-the-rule.md:124-127):
- 82 go: all 61 exclusion errors, both `comprises` errors, and 19 `RangeInternals` overloading errors (`combine2D` 7, `combine3D` 7, `CAP` 5), "by a mechanism not traced";
- 1 appears: `IN`;
- 21 stay: 17 `RangeInternals` overloading errors (`CAP` 12, `openRangeHelper` 3, `map` 2), the 3 return-type errors, and `.fsi:2526`.
- Inferred, not measured: the 22 `fill` errors are untouched, so today's tree would read 44 after flattening, not the 22 POSITIONS.md:92 expects.
- Of the 21 that stay, `CAP` and `openRangeHelper` are under the static-parameter sentence (item 10), and `map` under the Meet Rule (triage.md:92-94).

**Between the switch-over and microGPT compiling.**
- The run-time size rung (step 12).
- Decision D and the array rungs (steps 17-18).
- Code-generation refusals (step 19). `Juxt` is not one: it follows the checker. `Label` (row 81) is not used by either program, by grep. `where` clauses are not declared by either program, by reading, and not refused anywhere in walk's library (desugar-codegen.md, § 5.1, class C: 0).
- The 37 microGPT sites that reach `Number`'s catch-alls under the flattening (POSITIONS.md:92).
- Unboxing: decision B, and row 306's 6.3-6.5× on array code (FACTS.md:11).

### B3. Where microGPT's two programs stand

- **Under walk:** both run. `MicroGptFlatCheck` and `MicroGptAplCheck` give 40 of 40 PASS from an empty cache (FACTS.md:76). The diagonal's override landed in both vocabularies (POSITIONS.md:99).
- **Compiled:** all 18 components stop at disambiguation. The names they stop on are `Array` 8, `Char` 5, `ImmutableArray` 3, `Vector` 2, undefined in the compiler's prelude (`compile-ladder/baseline-2026-09-19/microgpt-phase.md`). They did not move at batch 4's gate (`compile-ladder/climb-batch-4/gate/ladder/microgpt-phase.md`, `microgpt-comparison.txt` empty; RECORD.md:169). The gate compiles them and records the phase only, never runs them (POSITIONS.md:42).
- **Under walk's library as the compiled prelude:** `FlatArrays.fsi` type-checks with no error of its own (FACTS.md:47), and after the `nat` work no size error is left in either vocabulary (FACTS.md:32). The model's unsized static types are the next wall (array-design-review.md:13; item 15).

## C. Where the record disagrees with itself, or is stale

1. **The handover's "What comes next" (`microgpt-run-c-handover.md:13`) is behind POSITIONS.**
   - It lists batch 4's manifest as next, but batch 4 landed at `cb5bd2dd5` (climb-batch-4/RECORD.md).
   - It lists "the rows batch 3.5 handed back" (379, 380/381, 383), all decided on 09-24 (POSITIONS.md:88-90).
   - It lists "the ten re-approval rows": 39, 40 and 47 are decided since (POSITIONS.md:99, :102, :103).
   - `:15` still says "The last landing is climb batch 3.5", and `:17` says its landing paragraph "follows when it lands".
   - `:27` leaves rung C's stop as "his", decided "(a), push" (POSITIONS.md:106).
   - `:29` says O's fork "waits on Pavol", decided (POSITIONS.md:108).
   - Nothing in it names batch 5, the S1/S2 decisions or the open list of POSITIONS.md:121-129.

2. **"The count may only fall or declare its rise" is said in two boot files but is no longer the rule.**
   - The two places: `microgpt-run-c-handover.md:9` and FACTS.md:53.
   - The rule since `a2b4809a5` (2026-09-23): the total is "REPORTED and is never red on its own" (`climb-batch-workflow.js:1065`; `climb-batch-workflow.md:60`).
   - FACTS.md:53 also still reads "103 since climb batch 3". The landed comparand is now 125 (`climb-batch-4/gate/checker-count.txt`).

3. **PLAN.md is unchanged since 2026-09-21** (`3e85b709c`).
   - It says "Step 1, running" (PLAN.md:34).
   - It frames step 5 as the compiler library's arrays with `double[]` and `int[]` decided up front (PLAN.md:44). POSITIONS.md:70 and :102 now put the array fork after the switch-over.
   - It has no switch-over step, no route A and no design B.
   - It promises "the order and the first step's shape are put to Pavol as a plan after the exclusion trace lands" (PLAN.md:29). No such plan is on record. `library-route-judgement.md` § 2 is the nearest.

4. **The territory map (`map/README.md`, 2026-09-20) predates the one-library decision.**
   - Its step 2 is "Pavol's deferred decision" between two routes (`:125`), decided 09-21.
   - It puts walk's coercion "not on the path" (`:175`). That is now route A's first rung, landed.
   - Its step 4 opens on rows 302/303, fixed at `53362cb88`.

5. **The re-approval table (`decisions-for-reapproval.md`) records decisions only up to row 39.** Row 40 closed on 09-25, row 47 was agreed on 09-26 and row 48 was not taken (POSITIONS.md:102-103). None of the three is in its "Decisions taken by Pavol" section.

6. **FACTS lines still call decided things open.**
   - `:49`: the closure is "Pavol's, item 14". Approved 09-21 (POSITIONS.md:48).
   - `:87`: O's way forward "is Pavol's". Decided 09-26 (POSITIONS.md:108).
   - `:31` counts `Juxt` (53) among "the two missing visitors". Its source says those failures are "the checker's shadow, not the code generator's" (desugar-codegen.md, § 6).
   - `:134` anchors the worklist and the counts at `fortress-gap-ledger.md:591` and `:731`. They are at `:592` and `:732` since row 404 was added.

7. **Ledger rows 348 and 403 do not carry the O decision of 09-26.** Row 403 still says "The repair route waits on Pavol's answer to the judge's fork" (`fortress-gap-ledger.md:414`). Row 348 still says "the decision is Pavol's" with no append (`:359`), though POSITIONS.md:108 decides it for the specification's spelling. The worklist, re-derived 2026-09-15/16, still frames item 2 as growing `CompilerLibrary` (`:609`) and item 19 as coercion on both paths (`:626`). Item 44 still lists rows 302 and 303, fixed at `53362cb88` (`:651`). Only item 12 was reworded, on 09-26.

8. **The closure's five-line checker accommodation has three statuses.**
   - POSITIONS.md:48: it "goes into the first library batch".
   - CLIMB-BATCH-3.md:166: it was left out as "a departure from POSITIONS 2026-09-21".
   - `exclusion-design-brief.md:140`: route A withdraws it "as moot".
   POSITIONS.md:92, the route decision, does not say it withdraws the accommodation. Batches 3.5 and 4 did not build it.

9. **Decision D's place in the order.** The judgement puts the diff "as soon as step 3 lands and before any array rung" (library-route-judgement.md:39), which is before the switch-over. POSITIONS.md:70 puts A, B and D after the switch-over.

10. **The expected count after the flattening.** POSITIONS.md:92 says "the count expected at 22 on the flat library", measured on the 103 before rung N. Rung N added 22 `fill` errors the flattening does not reach (climb-batch-4/RECORD.md:149). So the expectation on today's tree is 44, by inference.

11. **The switch-over's precondition and its instrument disagree.** The judgement's stop is a zero on the count stage (library-route-judgement.md:33). But:
    - the stage cannot see the component, or the hidden layer behind the `FortressLibrary` api's early return (price-keep-the-rule.md:129-131);
    - by inference, it runs under walk's desugaring setting, while the same judgement keeps the compile path's `extends Object` setting at the switch-over (`:37`), which adds 712 errors (desugar-codegen.md, § 4.3).
    Neither the dispatch generator's non-termination (FACTS.md:31) nor the 712 is a ledger row (by search). Neither are the two code-generator defects and the symbolic-operator blindness that the exclusion brief says are "not in the ledger yet" (`exclusion-design-brief.md:141`; FACTS.md:42).

12. **Smaller.**
    - protocol.md:195 gives the gate as `testSystem` 382; batch 4 landed at 407 (climb-batch-4/RECORD.md:169).
    - INDEX.md:109 gives the walkthrough's checker fates as 237/97/112. Since rung N they are 286/155/5 (FACTS.md:54).
    - The boot note's "scratchpad sweep" has no definition in the tree (item 29).
