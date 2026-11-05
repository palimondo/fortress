<!-- The coordinator's own work among the review queue's items, moved out of explorations/coordinator/review-queue.md at its cleanup of 2026-11-05: the 53 items that ask no decision of the curator's, each with its number, its title and the work in one line, by kind (a line fix of an entry, a stale pointer, a check to run, a ledger row, a note for a later rung's brief, a change of a skill or a tool, an answer owed), and the stale pointers that the cleanup left in PLAN. The verdicts are three sort workers' on the queue of `40826f355`, checked by a judge; each item's whole text is in the queue at that commit (`git show 40826f355:explorations/coordinator/review-queue.md`). An item leaves this file when its work lands, with the commit named in the landing's message. -->

# The coordinator's work from the review queue, 2026-11-05

None of these asks his word. A record edit among them is the coordinator's under his standing rule of 08:1x UTC on 2026-10-31, "you don't need my approval to bring the record in line with reality" (held list), and is named in the next report to him; a change to a skill follows the `coordinator` skill's rules for skill changes.

## Line fixes of an entry of FACTS or POSITIONS (16)

- **218. Should P-42 keep "functions" among what `Any` holds and `Object` does not?** P-42: "functions" is true of the specification in the tree and of walk (F-70), so it stays under his rule of 23:21 UTC on 2026-10-21; check the example of arrays indexed by pairs against P-156, where a pair index is bounded by `Index`, and correct it if it is false as a case of the implicit bound (the closing docket, section 1, item 5, drafts `zip`'s pair).
- **238. Once he answers item 217, does P-38 take the clarity pass's rewrite (P-38)?** P-38: re-draft the clarity pass's body against today's entry, which climb batch 25's landing narrowed (`11d2d8764`), or drop it, with item 217 at its default.
- **241. Once he answers items 219 and 220, does P-43 take the clarity pass's rewrite (P-43)?** P-43: once items 219 and 220 are answered, apply the clarity pass's rewrite (`consolidation-2026-10-22/evidence/positions/p3/proposals.apply`) with their sentences, or drop it.
- **246. Once he answers item 224, does P-90 take the clarity pass's rewrite (P-90)?** P-90: once item 224 is answered, apply the clarity pass's text (`consolidation-2026-10-22/evidence/positions/p7/proposals.apply`) as the answer leaves it, with its "Not allowed!" example reworded.
- **250. Does F-19 take the clarity pass's rewrite, once its account of the compiled path's `also do` blocks is corrected (F-19)?** F-19: apply the clarity pass's rewrite with the corrected account of the compiled `do … also do … end` (the first block in place, the others forked where `forkIfProfitable` judges it worth it, `parloop` down to `FORTRESS_LOOP_CHUNK` elements), before phase 6's parallel work reads it.
- **251. Does F-125 take the clarity pass's rewrite?** F-125: apply the two blocks with the shift's overflow limited to a nonzero value (`BigNum.java:240-254`), or keep F-125.
- **252. Does F-140 take the clarity pass's rewrite, once its note from row 325 on the compiled path is corrected (F-140)?** F-140: apply the rewrite with the corrected sentence (a `nat` size above `ZZ32`'s range used as a `ZZ32` fails at run time on the compiled path; where it is refused is item 34), or keep F-140.
- **253. Does F-145 take the clarity pass's rewrite, whose clause on the compiled checker says too much (F-145)?** F-145: apply the rewrite with the row 725 clause limited to an object whose cover needs a split, or keep F-145.
- **254. Does F-147 take the clarity pass's rewrite, whose rule leaves out that the self parameter is not counted (F-147)?** F-147: apply the rewrite with "not counting the self parameter" in the rule (`Specification/basic/traits.tex:661-665`), or keep F-147.
- **256. How do F-238 and F-252 divide walk's second reading of a refused pair?** F-238 and F-252: merge F-238 into F-252 with the search's two details, or keep both.
- **257. Does F-258 take the clarity pass's rewrite, whose clause on the pairs that walk does not read is wrong for two of its three kinds (F-258)?** F-258: apply the rewrite with its clause limited to the `where` clause (F-257), or keep F-258.
- **258. Does F-259 take the clarity pass's split, now that F-246 is merged into it (F-259)?** F-259: apply the split with `FlatString`'s api line kept in F-259 and the pointer to F-246 turned to F-259, or keep F-259.
- **259. Does F-156 say that a program declares itself the array operations that the library lacks (F-156)?** F-156: state the sentence as a fact about C4's vocabulary and name the library as the home of such an operation, or keep F-156.
- **260. Does walk now load two generic declarations that differ only in the element type, and what then do F-155, F-252 and F-257 say (F-155, F-252, F-257)?** F-155, F-252 and F-257: the sort's walk run at `6f93de5d4` loaded and ran `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` (`loaded 1 2`, exit 0), so apply the item's "if the pair loads" edits: F-155's first claim for plain declarations only (row 416), F-252's whole-type reading for generic pairs, and row 416 out of F-257's list; then PLAN's row 806 line can move.
- **321. P-44 says that the `where` form of `AnyIntegral`'s commented clause is not built, but P-151 builds that form. Shall the sentence say what keeps the clause a comment?** P-44: correct its sentence to the present, the `where` form built (P-151) and neither path taking the clause yet (rows 831, 804), under his standing rule of 08:1x UTC on 2026-10-31 (the closing docket, section 2, item 5).
- **322. P-84's title says that an `RR64` array "is stored" as a Java `double[]`, which no array is yet. Shall the title say that this is the design to build?** P-84's title: "is to be stored" for the `RR64` array's `double[]`, or keep it as a statement of intent, as he read positions at 07:56 UTC on 2026-10-29.

## Stale pointers and lines in other files (2)

- **93. Two cases are named so they are not lost: a self-naming bound beside a catch-all, and the fast shape of `=`.** Give each case a home: the fast shape of `=` is item 22's (phase 6); a generic declaration with a self-naming bound beside a catch-all gets a ledger row or a line in PLAN's phase 5.
- **169. The root README calls `Specification-1.0-frozen/` the frozen 1.0 specification; only its PDF is 1.0.** `README.md:111-113`: the folder `Specification-1.0-frozen/` is the Working Draft of February 2011, and only its `fortress.1.0.pdf` is 1.0 (P-96, F-163).

## Checks to run (4)

- **255. Does F-248 take the clarity pass's rewrite, whose definition of a fused reduction has the direction reversed, and do its three pairs still take the fused path (F-248)?** F-248: turn the fused reduction's definition (the inner reduction distributes over the outer, `Library/Generator2.fss:72-73`), after a walk run of `GeneratorDeclarations` and `NestedReductionFusion` with `generate2`'s trace lines made live on a scratch copy of the library.
- **263. Does only a numeral size still reach the class loader for a descriptor, now that sizes hold arithmetic (F-36)?** F-36: read `MethodInstantiater.rttiReference` and `CodeGen.generateTypeReference`, or compile one size spelled as an operation, then reword or correct F-36, before phase 5 compiles the model's sized types.
- **264. Does the count stage still pass its 900-second limit with the trait table's memo off (F-94)?** F-94: one count-stage run with `-Dfortress.analyzer.ground.cache=false`, then F-94 scoped to that run or its 17 minutes dated.
- **277. Does the compiled checker still refuse the model's numeral powers, and over which tie (row 533)?** Row 533: the probe that the item describes (`10.0^(-5)`, `-(10.0^10)` and `0.85^t` against the one library, one JVM of about 3 to 15 minutes), now or at phase 5's first check of the model; with no error, close row 533; with an "Ambiguous coercion", name the two declarations in the row and put the repair to him then.

## Ledger rows to file, note or settle (10)

- **67. Naden's return-type-restricted instantiation is recorded as future work in the decision record, with no ledger row.** Naden's return-type-restricted instantiation: file a row, or leave it in `reviews/overloading-judgement.md`, section 10, item 7.
- **86. Walk leaves a generic `coerce` out of the sources it ranks, so a choice between two coercions into a generic trait can only be ambiguous.** Walk's `Coercions.addSource`, which leaves a generic `coerce` out of the sources it ranks: file a row, or close it as is.
- **100. An expected failure gives 16 checker errors for 7 written sites.** `XXXNatRangeChecker`'s 16 checker errors for 7 written sites: file a row, or close it.
- **115. `lift`'s api and component disagree after batch 8's device.** `lift`'s api against its component: align the api (`lift(r: Any)`, one line), or file a row.
- **119. `uncheckedSubstring` stays unguarded against a strided range.** `uncheckedSubstring`, unguarded against a strided range: file a row, or close it.
- **181. `PureList`'s `List` without an element-wise `=`.** Row 355: note that `PureList`'s `List` needs the element-wise `=` that `List`'s has.
- **195. `IntegerDivisionByZero` in the integer listing (row 792).** Row 792: record its route, climb batch 20's review's default, which both libraries and the prose agree with: `DivisionByZero` written into the integer listing by the next rung that edits `Specification/basic-lib/basic-integers.tex`.
- **300. A component trait field declaration of several names is not matched against several abstract api getters. Leave it?** The export check's field declaration of several names against several api getters: file a row, or close it.
- **346. Which ASCII operator is the specification's "round toward positive infinity" addition (and product): `PLUS_UP` or `IEEE_PLUS_UP`?** The specification's `\upplus` has no ASCII spelling (`opr-overview.tex:216-218`): file a specification row, or close it.
- **347. Should a binding over `NN32`, `NN64` or `Char` to a helper with several methods of one name and arity compile on the compiled path (row 885)?** Row 885: settle its status, CONTESTED, as an open limit of the natives' rewrite beside rows 882 to 884 and 886.

## Notes for a later rung's brief (10)

- **88. Walk's inference trace switch stays in a 2012 file, inert unless set, but for one eager list.** `fortress.inference.trace`, a 2012 switch inert unless set: keep it, or remove it in a walk rung with the interpreter suite run.
- **149. Row 587's expected failure asserts only a supertype, leaving the typed control ungated.** Row 587: a plain test that keeps the typed control, with the next rung on row 587.
- **153. Row 693's second shape, a generic object, owes an expected failure beside the row's reproducer.** Row 693: the owed expected failure for a generic object, in the brief of row 774's walk rung.
- **168. `checkDeclComprises`'s header comment lists three cases, not the fourth.** `TypeHierarchyChecker.scala:257-271`: the fourth case in `checkDeclComprises`'s header comment, for the next rung that edits the file.
- **179. Row 773 recorded by its row alone.** Row 773: its reproducer in the testing guide's form (a plain `link` test and an `XXX` `run` test), in the brief of row 773's rung.
- **185. An expected failure that is green while walk is right.** `XXXGenericBesidePlainReturnRule.fss`: its rename to a plain refusal test keyed on "fails the Return Type Rule", with row 550's note, in the next walk rung's brief.
- **299. Should the revised export clause say "(possibly implicit)" for the method declaration it asks?** The revised export clause (`Specification/basic/components/source-code.tex:386`) and its Appendix I quotation: "(possibly implicit)", for the next rung that revises the clause.
- **301. The export check's comment quotes the Working Draft's export rule as "From the spec". Correct it in the next change that edits the file?** `ExportChecker.scala:327-332`: its comment quotes the revised export rule (`source-code.tex:381-388`), at the next change of the file.
- **314. `builtinPrimitive`'s printed comment says "For examples, see the end of this file.".** `FortressBuiltin.fsi:20`: "For examples, see the end of this file." points to `FortressBuiltin.fss` or goes, at the next rung that revises the comment.
- **345. Climb batch 25 spells its square-root roundings two ways. Should one spelling be chosen?** The helpers' square-root roundings, `doubleSqrtUp` and `doubleSqrtDown` beside `floatSQRTUp` and `floatSQRTDown`: one spelling at the next edit of those helpers, or both kept.

## The skills, the tools and the process (10)

- **46. A rule on engineering taste.** The coordinator skill: one line on engineering taste (an obstacle gets an attempt to engineer around it, its recurring cost priced, before it is called impossible), by his way c of 08:2x UTC on 2026-11-05, or drop it.
- **47. The gate, the commit and the microGPT check on Sonnet.** The tier of the gate, the commit and the microGPT check: square `references/delegating.md`, "Which tier runs what", with the record-landing workflow's stages on the cheaper tier (`record-landing.js:6-10`), within his tier rules (held list, 2026-10-21 18:02 and 18:14), and strike the line from `process-engineering/README.md`, "Waiting on Pavol".
- **48. A clean test of the skill.** The clean test of the skill: run it in the skills' minimal pass if it helps decide what to cut, or strike it.
- **49. A test-name comparison in the gate.** A gate step that goes red when a test that passed before is missing or failing (`fortress-repo`, `references/gate.md`): build it, or drop it; P-123 was struck as a one-time approval carried out.
- **50. The library-extension bullet in the skill.** `fortress-repo`'s `references/library.md`, "Designing a change", its first bullet: bring it in line with P-27 as rewritten at his word (`8c99e258e`).
- **163. A project agent type per role.** Per-role agent types under `.claude/agents/`: register them at a planned restart of the session's process, or drop the idea.
- **266. Is a new gap-ledger row held to 900 characters when it is written?** A 900-character budget for a new ledger row: decide it in the brief of the ledger's repair.
- **297. When an Appendix I entry revises one sentence of a subsection, which is the "new text" whose departures its Effect names?** `fortress-repo`'s `references/specification.md`, the revision form: state the landed reading, that an Appendix I entry's Effect names the departures from the revised sentence and the rules it invokes.
- **298. Should the distance stage also read the `@@TC COMPONENT-CRASH` lines?** `tools/distance/table.py:61-77`: read the `@@TC COMPONENT-CRASH` lines too, with a canned case in `test_classify.py`, between any two batches.
- **351. An allow rule for walk guards run with the base build's own `harness-one.sh`?** `fortress-repo`'s `references/worktrees.md:66-68`: give the route that worked in climb batch 25, the base's build in the rung's own tree before the edit, in the skills' minimal pass, or bring him the one allow entry then.

## An answer owed to him (1)

- **156. Why `PowChooseLcmRungE` has 50 checks: an answer owed.** Read `PowChooseLcmRungE` and its rung's report, and write him the reason for its 50 checks in one line (held list, 2026-09-27).

## Stale pointers that the cleanup leaves in PLAN (not items)

The cleanup changed PLAN only in its lists "listed for his review", where each line whose item moved names where it went. These lines elsewhere in PLAN name items that left the queue; each can be brought in line, or move to PLAN-history, at the next edit of PLAN. Line numbers are those of PLAN at `40826f355`, which the cleanup's edits did not move.

- "Where we stand", "The live thread" (PLAN.md:10): of "the readings under that zero that wait for his word", items 309 and 326 moved to the learning file; 295 stays an ask.
- Phase 4, the natives line and its sub-lines (PLAN.md:47 to :50): item 327 is settled (it repeats 310), 326 and 311 moved to the learning file, and 214 is settled (P-37 and P-38 exclude its other way).
- Phase 4 (PLAN.md:56, :57, :59, :60): items 350 (settled, row 890), 341 (learning), 347 (here, row 885) and 190 (learning).
- Phase 4, the Q-walk line (PLAN.md:73): of the answers it needs, 91 is settled (the line itself holds row 387's return conversion) and 252 is here (a FACTS wording; its decision is item 34).
- Phase 4, "His answers needed before the switch-over" (PLAN.md:77): 194 and 214 are settled. The asks before the switch-over are the queue's first section's group.
- Phase 5 (PLAN.md:85, :93, :94): on row 533's line, 29 is settled and 277 is here; 159 and 158 are settled (rows 499 and 559).
- Phase 5, "His answers needed before microGPT compiles" (PLAN.md:95): 29, 54, 158, 159, 206, 216, 237 and 324 are settled, and 50, 93, 263 and 277 are here. The queue's group before microGPT compiles also holds 58, 60, 245 and 248, which the list does not name.
- Phase 6, "His answers needed before microGPT runs fast" (PLAN.md:106): 250 is here; the asks are 22 and 205.
- "Pavol's answers", item 14 (PLAN.md:116, :118): item 41 moved to the learning file. "For his review; nothing waits on them" (PLAN.md:148): item 109 moved to the learning file, and item 3 is an ask before microGPT compiles, as phase 5's list says.
- "Off the path, parked" (PLAN.md:192 to :225), 31 lines whose one item left: 13, 25, 28, 52, 53, 85, 87, 96, 97, 111, 112, 113, 139, 140, 141, 142, 143, 145, 146 and 147 moved to the learning file; 54, 110, 144, 154, 155, 159, 160 and 167 are settled; 86, 168 and 169 are here.
- "Phase 3's candidates at its end" (PLAN.md:232, :236): row 774's line names 153 and 246, both here; row 806's line waits on item 260's walk run, which the sort made (item 260 here).
