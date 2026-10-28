<!-- Genesis of the run brief for the POSITIONS rewrite of 2026-10-26 (clarity workflow run wf_36572c60-a05): the brief's text, the source of each instruction, the coordinator's statements and tool calls from 07:54 to 08:41 UTC, and its context size; quotes and pointers only, no judgement; made 2026-10-28 by a Sonnet scout. -->

# Brief genesis: the run brief of 10-26 08:37 UTC

**Key.** C curator; K coordinator. `L<n>` is a line of the live transcript (print it with the command at the top of `evidence/timeline-10-26-to-10-28.md`). Times are UTC, 2026-10-26. `J:n` is a line of `explorations/reviews/foundations/judgement.md`; `W:n` of `explorations/coordinator/tools/record-clarity/writer.md`; `R:n` of `.claude/skills/coordinator/references/record.md`; `S:n` of the coordinator `SKILL.md`; `JB:n` of the scratchpad `foundations/judge-brief.md`; `CN:n` of `explorations/conversations/02-phase3-exit-foundations.md`; `check.md`, `judge.md`, `README.md`: `tools/record-clarity/`. Skills and clarity briefs: unchanged since 10-23 (`git log`). A script checked every quote against its source; `...` is a cut. "None found": searched by the words and by close paraphrase in the judgement, the curator's messages (also `scope-recheck.md` section 4), the skills and the clarity briefs.

## 1. The files

| file (scratchpad `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/foundations/`) | bytes | mtime |
|---|---|---|
| `judge-brief.md` (Fable judge; `Write` L62328; the prompt of L62381 differs in three sentences) | 6581 | 07:58:56.648 |
| `rewrite-brief.md` (`Write` L62978 08:37:42.629; no later edit) | 7729 | 08:37:42.640 |
| `key-s2.md` (trap key, scenario 2; Bash L62883; commit 837cabc32) | 7657 | 08:34:47 |
| repo `explorations/reviews/foundations/evidence/rewrite/run-brief.md` (commit 8aadd994a) | 7965 | 10-27 07:49:26 |

The repo copy is `rewrite-brief.md` plus a two-line HTML comment on top (`diff`). Not briefs: `page.html`, `old-entries.txt`, `texts-page*.html`, `msgs.py` (transcript printer), `sweep-final.txt` (a worker's hand-back), `filled-old.md` (trap-test reader prompt). The judge's brief asks, among five rulings: "5. **The POSITIONS rewrites.** For each entry to rewrite, what the new text must make the coordinator do, in plain words, so that a writer can draft it and a trap test can check it. Do not draft the text." (JB:35).

### The brief, whole, numbered by instruction

Repo copy, lines 3 to 54. `[In]` marks an instruction; the text after the bar is verbatim.

> l.3 | # This run's own brief: the reasons under thirteen POSITIONS entries, after the foundations review
> l.5 [I1] | You are a stage of the clarity workflow (`explorations/coordinator/tools/record-clarity/`): its writer, its fix round, its checker or its judge.
> l.5 [I2] | Follow your stage's brief there, with the changes below. Where they differ, this brief wins.
> l.5 [I3] | Change no tracked file. Commit nothing.
> l.7 | ## What this run does that the clarity pass does not
> l.9 [I4] | - The clarity pass keeps each entry's meaning. This run also changes what the foundations review's judgement says to change: the reason an entry gives, the layer it states that reason in, the dates it ranks by, and the pieces the coordinator lacks to weigh a trade-off. Every other part of an entry keeps its meaning, as the clarity briefs require.
> l.10 [I5] | - The judgement is `explorations/reviews/foundations/judgement.md`. Its section 7 is the target: for each entry it lists what the new text must make the coordinator do. Each rewritten entry must produce every behaviour listed for it, and nothing that its sources do not hold.
> l.11 [I6] | - The reader that matters most is the coordinating session: after a compaction or a restart, when it plans a batch or a probe, and when it weighs one entry against another (the curator, 2026-10-26 07:48 UTC: "for your correct judgment after compactions and restarts ... we must resolve the potential contradictions in our positions with enough clarity ... so that you know how to weigh the trade-offs"). So each ground stands in its layer, with the context needed to weigh it, and two entries do not contradict each other.
> l.12 [I7] | - Not over-engineered: keep each entry as short as the behaviours allow. An entry is read whole at every boot.
> l.14 | ## The entries
> l.16 [I8] | - Chunk c1: P-26, P-37, P-43, P-42, P-7, P-158.
> l.17 [I8] | - Chunk c2: P-33, P-12, P-59, P-17, P-84, P-85, P-58.
> l.19 [I9] | P-85 is in the run for one sentence only: the curator's lean of 2026-09-20 (judgement section 2, tenet 7; section 9, item 6), recorded as a lean to confirm, not a decision. Leave the rest of P-85 as it is.
> l.21 | ## The sources of the new text
> l.23 [I10] | 1. The judgement, whole: section 2 (each tenet, its sound reason and its layer, and where its entry misstates), section 3 (when a design of the compiler's prelude binds the one library), section 4 (the bound), section 5 (phase 3's close), section 7 (the target).
> l.24 [I11] | 2. The curator's words of 2026-10-25 and 2026-10-26: `explorations/conversations/02-phase3-exit-foundations.md`, whole. `python3 explorations/coordinator/curator-profile/show.py TIME` prints any message of his. His goal for the switch-over (04:47 UTC on 10-26) is P-37's reason, in his words. His three layers are his frame (05:25 UTC on 10-26).
> l.25 [I12] | 3. The evidence the judgement read, where a sentence needs it: `explorations/reviews/foundations/bound-archaeology.md`, `explorations/perf-probes/bound-any-compiled/REPORT.md`, `explorations/reviews/foundations/tenets-evidence.md`, `explorations/reviews/foundations/prelude-lens.md`.
> l.26 [I13] | 4. Each entry's own provenance: `entries.py N` and `facts-extract.sh 'history:P-N'`.
> l.28 [I14] | Do not open `explorations/reviews/foundations/evidence/` or anything under it: it holds a test of this run's text.
> l.30 | ## The rules for a reason
> l.32 [I15] | - **Whose reason.** A "Why:" holds the curator's reason or a reason he took. Where a new ground comes from the judgement, write it as the entry's ground, and mark each such sentence in `proposals.md` as "from the judgement, for his yes": he sees every new text before it enters the record. Never put the judgement's words in his mouth; keep his own words his.
> l.33 [I16] | - **The three layers.** Name each ground's layer in plain words: the language (the specification, the Working Draft, the papers, the 2012 Types chapter, and the team's library as their statement of the language's library); the team's implementation on the JVM (the compiled checker, the code generator, the class loader, the run time, the compiler's prelude, and walk); and Java interoperability. Define the three once, in P-26, and point to P-26 from the others. Do not write "L1", "L2" or "L3". A ground in one layer does not by itself decide a question in another.
> l.34 [I17] | - **"Later" is a date.** Where an entry ranks the team's sources, give the year of each ground it ranks.
> l.35 [I18] | - **One home for each rule.** The general rule for counting the team's code as the team's word on the language belongs in P-26 (section 7, P-26, behaviour 3). Its application to the compiler's prelude, when a prelude design binds the one library (section 3, with its three sharpenings), belongs in P-37, which points to P-26. P-43 and P-158 point to them and do not restate them.
> l.36 [I19] | - **Specialisation.** Use one word for each of the two things the record calls specialisation (section 2, tenet 2, point (c); section 7, P-26, behaviour 6): an overload for one instantiation chosen at run time (the language), and a class made for each instantiation (the implementation).
> l.37 [I20] | - **Measured against unmeasured.** Say which grounds were measured and which are read or unmeasured, as the judgement does (P-37's premise; P-12's size; P-59's premise; P-84's way A4).
> l.39 | ## The curator's open answers, and the defaults you write under
> l.41 [I21] | At this writing four answers of his are open. Write each entry under its default, and list in `proposals.md`, per entry, each sentence that depends on an open answer and what it would say otherwise.
> l.43 [I22] | 1. Phase 3 closes with climb batch 22c and its four rungs: row 816's repair (P-158); row 782, the export check reading top-level operators (P-155 read to cover it); `List`'s two imports, `CovariantCollection` and `OneShotFlag`; the bound `Any` for `fortress compile` (`Shell.java:372`). Its exit: the distance 0 over the fourteen components, under the compile command's own setting, with operators and `abstract` read the team's way. The fourteen are the distance stage's twelve (`explorations/coordinator/tools/distance/run.sh`, lines 85 to 87) and `List`'s two imports; the judgement writes "thirteen", a miscount, so write "fourteen". Default: yes. (P-33, P-42)
> l.44 [I23] | 2. The 40 other library components block the step at which walk runs the checker (P-12), not the switch-over; each is cleared before that step or before the first program that needs it. Default: yes. (P-33, P-12)
> l.45 [I24] | 3. Three one-word answers: drop "functions" from P-42; strike P-26's sentence "The implementers' later word also outweighs unfinished text."; move P-43's two "Why" sentences to history and write the language's grounds in their place. Defaults: yes to all three. (P-26, P-42, P-43)
> l.46 [I25] | 4. His lean of 2026-09-20 for the class loader as the way to store an `RR64` vector as a `double[]`, recorded under P-85 as a lean to confirm. Default: record it. (P-85, and a pointer from P-84 if P-84 needs it)
> l.48 [I26] | P-58's informed yes is also owed before climb batch 23 (section 2, tenet 8). P-58 stands as decided; its text states the layer and the window in which its choice is cheap to undo.
> l.50 | ## For the checker and the judge
> l.52 [I27] | - Fidelity here is checked against two things: against the entry as the record holds it, for every part that this run does not change; and against the judgement's section 7 and the sources above, for the parts it changes. A new ground that the judgement or his words do not hold is a failure. A behaviour of section 7 that the text does not produce is a failure.
> l.53 [I28] | - A sentence marked "from the judgement, for his yes" is not a failure for not being his words; a sentence that presents a judgement's ground as his reason is.
> l.54 [I29] | - The judge applies an entry only if it meets both checks and the second cold reader reads it the way section 7 intends; otherwise it holds it with its question. Nothing enters the record from this run: the coordinator runs a trap test on the applied texts and shows them to the curator first.

## 2. The source of each instruction

"Own" = no source found.

- **I1.** Own. Mechanism: commit bedc80b01 (08:37:54), "The clarity workflow takes a run's own brief (args.extra) for the writer, the fix round, the checker and the judge".
- **I2.** Own. The Workflow call (L62993) `extra`: "This run has its own brief, which wins where it differs from the brief above". No rule that a run brief overrides a stage brief.
- **I3.** W:5 "Change no tracked file but the files in your folder."; W:3 "you commit nothing".
- **I4.** Sets aside W:14 "Keep the meaning." What changes: J:8 "right, but its entry states a weaker, misplaced or wrong reason, or lacks the reason the coordinator needs to weigh a trade-off"; J:15. K 08:24:58 (L62468): "The rewrites fix the reasons, and no decision turns."
- **I5.** J:150 "Scope: the writer drafts; the trap test checks. For each entry, the behaviour the text must produce in the coordinator at a fork, in plain words. Not the text."; "nothing that its sources do not hold": W:33 "Do not add a claim, a reason or a scope that the sources do not hold."
- **I6.** C 07:48:49 (L62233), through JB:13 and CN:14. The brief quotes the middle of that message; the message also says "let's not over-engineer stuff" and "So yes, rewrites need to be done very carefully." Last sentence of I6: none found as such.
- **I7.** C 07:48:49 "let's not over-engineer stuff". Length: W:35 and R:29 "near 600 characters"; the brief gives no number. "Read whole at every boot": S:217 "each whole".
- **I8.** What C approved: 07:42:15 (L62207) "Yes, to both rewording of or refinements of P37 and P26."; K's plan he agreed to on 07:48:49 (L62222) "3. **Rewrite P-26 and P-37 with the clarity workflow,** in one run.". J:152-161 names 12 entries; P-85 is not among them. The scope "every entry the judgement names": K 07:49:25 (L62247) "They also cover every other entry that the judgement says bends or lacks its real reason."; boot note d23349944:22 "the clarity workflow rewrites P-26, P-37 and every entry the judgement names". No message of C asks for it. Chunks c1, c2, and "thirteen" (6 + 7): own.
- **I9.** J:159 "(3) hold his 09-20 class-loader lean under P-85 as a lean to confirm"; J:201. "For one sentence only": own.
- **I10.** Sections: the judgement's (J:21, 88, 109, 125, 148); the choice: own.
- **I11.** CN:13 "(his frame, 05:25:27 on 10-26)"; CN:35 "(04:47:50)" and "P-37 lacks this reason; it goes in with the rewrites (section 8)."; J:153 P-37 (1) "carry his reason of 10-26".
- **I12.** JB:21-25, the Fable judge's inputs.
- **I13.** W:21-22: `entries.py`; "'history:F-N'" for facts. "'history:P-N'" for positions: none found.
- **I14.** Own. Boot note d23349944:10, on the trap files: "keep them from the clarity writer".
- **I15.** W:28 "For a position, the reason after "Why:", only if the curator gave one or accepted it in the question.". The exception: J:53 "The "Why" becomes the L1 grounds above" (P-43); J:199 "Move the two sentences of P-43's "Why" to history and write the language's grounds in their place.". Also S:109 "Keep a proposal of yours marked as yours until the curator says yes.". The marker "from the judgement, for his yes", and "in his mouth": none found.
- **I16.** J:7 (L1 to L3; "A ground in one layer does not by itself decide a question in another."); JB:17; C 05:25:27 (L61866). "Define the three once, in P-26": K's draft of 07:38:21 (L62134, item 2) "A ground is weighed in its own layer: what the language says", C's yes 07:42:15. "Point to P-26 from the others": none found. "Do not write L1, L2 or L3": none found (J:7 uses them); nearest W:30 "Use no handle of a past conversation or batch".
- **I17.** J:152 P-26 (2) "rank the team's language texts by date and by consistency, with the 2019 paper last", (4) "date a code commit against the texts before calling it "later""; J:96 ""Later" is a date, and a stub is a stub by the team's words." "The year of each ground": none found.
- **I18.** J:152 P-26 (3); J:153 P-37 (3) "apply ruling 3's rule when a prelude shape differs from the library's"; J:191; R:28 (an entry owns a conclusion, others point to it). "P-43 and P-158 point to them and do not restate them": none found; J:161 on P-158 "Not a rewrite of substance; one sentence."
- **I19.** J:33 (c) ""Specialization kept" names an L1 thing in P-26 (an overload for one instantiation, chosen at run time) and an L2 thing" ... "(a class per instantiation)"; J:152 (6) "use one word for each of the two things called specialisation".
- **I20.** J:40 (P-37); J:65 "A4 is unmeasured"; J:77 "says the size is unmeasured" (P-12); J:158 (1) and (3).
- **I21.** JB:37 "Give each ruling a default."; J:196-201 each end in "Default:". K 08:40:51 (L63064): "It writes under the defaults of the questions still open, and it marks each sentence that depends on one of your answers." "List ... what it would say otherwise": none found. Contrast W:33 "keep the current wording for that part and write a question for the curator".
- **I22.** J:196 (item 1), J:18, J:125-133. "Fourteen": own (K's check of `run.sh` lines 85-87), told to C at 08:40:51: "Both judgements wrote "thirteen", which is a miscount."
- **I23.** J:197 (item 2); J:156 (3). **I24.** J:199 (item 4); J:35 "Strike the "unfinished text" sentence"; J:155 (2). **I25.** J:201 (item 6); J:159 (3). **I26.** J:200 (item 5); J:67 "Holds; his informed yes owed"; J:160.
- **I27.** `check.md:13` "Compare the rewritten entry with the entry as the record holds it and with its sources." The split into two checks and the failure rule on section 7: none found.
- **I28.** `check.md:13` "present an implementation fact or a default as the curator's decision" as a failure. The exemption for "from the judgement, for his yes": none found.
- **I29.** `judge.md:9-10` (apply, hold). "Nothing enters the record from this run": C 07:48:49 "Yes, run the text, fix the rerun, yes."; K 07:42:53 (L62222) "Nothing enters POSITIONS until the text passes."; R:66. "Shows them to the curator first": K 08:40:51 "Nothing goes into POSITIONS before the trap test passes and you have seen the new texts."

Rules of the clarity writer brief and `record.md` that the run brief does not mention: W:35 and R:29 (near 600 characters); R:19 "one or two sentences"; R:30 "Write halfway to ASD-STE100."; the register comes only through W:3 (`skill-writer-brief.md` sections 1 to 4).

## 3. The coordinator's statements, 07:54 to 08:41

Thirteen assistant text blocks, all to the main session, and the compaction summary. Thinking blocks are empty in the transcript (signature only). Just before: K 07:49:25 (L62247) and boot note 9da6126fd (07:49:11), in `timeline-10-26-to-10-28.md`.

- **07:59:21.588, L62344**:
  > the approved plan for the POSITIONS rewrites with the trap test.
  > the rewrites with the trap test;
  > **The Fable judge's brief, drafted now** while I still have the context. It quotes your goal, your worry, your framing and your three layers, and it names the exclusion-fork notes for the judge to read directly.
- **08:11:31.441, L62401:** "When the judgement returns, I commit it, read it in full and bring you its verdict. After that come the rewrites and the trap test."
- **08:24:58.611, L62468** (2677 characters; verdict and question 1):
  > The layers were mixed in the reasons written under your decisions, not in the decisions. The rewrites fix the reasons, and no decision turns.
  > The judgement brings six decisions, each with a default. This is the first.
- **08:33:03 L62814:** "Page published. Now reconciling the trap key's scenario 2 with the judgement's ruling on `comprises T`, then the rewrites." **08:35:26 L62918:** "Reading the clarity workflow and the record-test kit before I set up the rewrites." **08:36:59 L62961:** "Setting up the rewrite run: a small change so the clarity workflow can carry this run's extra brief, then the brief itself." **08:38:19 L62998:** "The rewrite workflow is running." (then the routing of findings)
- Not about the rewrite: 08:30:03 L62616, 08:30:52 L62704, 08:31:31 L62759 (boot progress); 08:39:39 L63036 (the boot note); 08:40:57 L63071 ".".
- **08:40:51.446, L63064** (970 characters; the first message to C after the compaction; the rest: the page link, "thirteen" corrected to "fourteen", question 1 repeated):
  > **The rewrites have started, as you approved.** The clarity workflow is rewriting the reasons under the entries that the judgement names. It writes under the defaults of the questions still open, and it marks each sentence that depends on one of your answers. Nothing goes into POSITIONS before the trap test passes and you have seen the new texts.
- **Compaction summary, 08:29:38.761, L62534** (22653 characters; "line n" = line n of its text):
  > line 25: 07:48:49: POSITIONS are for the coordinator's judgement after compactions and restarts, and when planning batches and probes. Contradictions must be resolved with enough context to weigh trade-offs. Rewrites are done very carefully. He approved the plan: wait for the Fable judgement, write the traps, run the test, fix and rerun.
  > line 175: 3: the rewrites proceed (already approved; tell him, no ask);
  > line 184: **The rewrites:** the clarity workflow on P-26, P-37, P-43, P-42, P-33, P-7, P-12, P-59, P-17 with P-84, P-58 and P-158, per judgement section 7. Then the record-test (Opus readers in old and new copies, a blind Opus grader), fix and rerun. Nothing enters POSITIONS until it passes.
- **K, later, on the brief** (outside the window). L64654 (19:22:55), on 08:37: "at 466K, after a fresh boot, I wrote the writer's brief, the one that ordered the dates and made Fable's list the target." ... "Its plan came from the boot note." ... "The fresh session carried the plan out without checking it against `record.md`." L64684 (19:27:02): "The writer's brief came 90K of work after the boot ended. Most of that work was reading Fable's judgement and our dialogue, which is where the brief's content came from."

## 4. Tool calls that wrote the brief's files or the clarity script

| time | L | tool, file | first lines written (every `BOOT.md` begins with the same standing comment, "The boot note: what is in flight ...") |
|---|---|---|---|
| 07:56:21 | 62278 | Write `explorations/conversations/02-phase3-exit-foundations.md` (16926 chars; fcadc7781) | "<!-- The dialogue of the phase 3 exit review and the foundations review, 2026-10-25 18:50 UTC to 2026-10-26 07:55 UTC, written by the coordinating session" ... |
| 07:57:06 | 62292 | Write `explorations/coordinator/BOOT.md` (10606 chars) | line 16: "the clarity workflow rewrites P-26, P-37 and every entry the judgement names" |
| 07:58:56 | 62328 | Write scratchpad `judge-brief.md` (6568 chars) | "You are the Fable judge of the foundations review of the Fortress revival, in `/home/user/fortress` (main tree, branch `main`)." |
| 08:37:11 | 62966 | Bash, python3 replace in `explorations/coordinator/tools/record-clarity/record-clarity.js` | adds "const EXTRA = args.extra ? String(args.extra) : ''" |
| 08:37:42 | 62978 | Write scratchpad `rewrite-brief.md` (7729 chars) | "# This run's own brief: the reasons under thirteen POSITIONS entries, after the foundations review" |
| 08:37:53 | 62982 | Bash, git commit bedc80b01 (`record-clarity.js` only), pushed | |
| 08:38:04 | 62993 | Workflow `record-clarity.js`, args `kind: "positions"`, `stream: "foundations"`, `extra` (I2), chunks c1, c2 | |
| 08:40:16 | 63037 | Write `BOOT.md` (10875 chars) | line 9: "it gives the judgement's section 7 as the target, the three layers, the dating rule, one home per rule, and writes under the defaults of the open asks, marking each dependent sentence" |

Also 08:34:47 L62883 (Bash heredoc, `key-s2.md`). After the window: 10-27 commit 8aadd994a (07:49:26) copies the brief into the repo; commit 18788035c (22:14:42) restores `record-clarity.js`.

## 5. The context size of the coordinating session

Context of a call = `input_tokens + cache_creation_input_tokens + cache_read_input_tokens` of its record's `usage`.

| time | L | tokens | event |
|---|---|---|---|
| 07:49:25 | 62247 | 684771 | K widens the scope (I8) |
| 07:55:16 | 62273 | 686988 | first call after C's 07:54:36 message |
| 07:58:56 | 62328 | 713880 | judge-brief written |
| 08:29:38 | 62530 | 795745, then 48969 | `compact_boundary`: `preTokens`, `postTokens`, trigger "auto" |
| 08:29:49 | 62569 | 123830 | first call after it |
| 08:37:42 | 62978 | 465867 | rewrite-brief written |
| 08:38:04 | 62993 | 469573 | Workflow launched |

C named it: 07:54:36 (L62271) "What I'm worried about now is your contacts is at 686k."; 19:22:12 (L64647) "What was your context length at the time you made the critical mistakes?"; 19:26:12 (L64658) "after fresh boot you are supposed to be at most around 300 something.". K's answers (L64654, L64684) agree: 685K at 07:49, 714K at 07:58, 466K at 08:37; after the compaction 124K, +17K skills, +235K boot read, +90K work before the brief.
