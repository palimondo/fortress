<!-- The POSITIONS audit's full run, chunk c1 (P-7, P-8, P-9, P-11, P-12, P-16, P-17, P-19, P-25, P-26): the corrected record proposed by the writer's brief (positions-audit/full/evidence/briefs/writer.md, rules 0 to 12), entry by entry, with each new sentence's source, what leaves POSITIONS and where it goes, the history lines, the questions for the curator and the pointers elsewhere; record.py run on a scratch copy only; nothing applied. -->

# Chunk c1 corrected: a proposal

Writer: one Opus session. Sources: `judgement-c1.md`; the ten scouts' reports in this folder (`P-7.md` to `P-26.md`); his page comments of 2026-10-21 (`positions-audit/evidence/curator-comments-2026-10-21.md`); and, where the text turned on them, his messages by `curator-profile/show.py` (2026-09-14T19:14, 2026-09-19T17:01, 2026-09-20T07:20 and 13:57, 2026-09-21T03:02, 2026-09-23T06:02 and 06:27, 2026-09-24T01:02, 2026-09-29T14:07, 2026-10-12T23:15, 2026-10-21T17:33), the coordinator's text of 2026-09-29T14:08:16.691Z (transcript B2:11908), item 7 of `reviews/decisions-review/judgement.md` (`:354-360`, and `:265`), the pre-numbering history (`git show a74f5a2b7:explorations/coordinator/POSITIONS-history.md`, `:388-394`, `:490-495`), `git show --stat a4e266faa`, `git grep -il porcupine`, `coordinator/lineage.md`, PLAN's "Off the path, parked", `run-c4/src/FlatData.fss:14-34`, `README.md:86-89`, `perf-probes/kernels/REPORT.md` and `curator-profile/evidence.md`. Nothing in the real record changed.

- The apply file is `corrections-c1.apply`, beside this file. `record.py` ran it on a copy of the record, in the scratch folder `positions-audit/full/fix-c1/root/`, with `--root`.
- `rewritten-c1.txt` holds the nine entries that stay, each as it would stand.
- `review-queue-items-c1.md` holds one drafted item, Q-?1, from P-17.
- Each entry's "Pointers elsewhere" is from `positions-audit/tools/pointers.py N`, run at HEAD `6601e811b`; its output is `fix-c1/pointers.txt`.

All times are UTC. Each is a message of his or of the coordinating session. No entry of this chunk has a comment of his on a page (each scout's section 7). "Rule n" is the brief's rule n.

## The verdicts

- **P-7**: kept, word for word. Its sources go to the history, since the block of 2026-10-13 says his words of 09-29 are there and they are not.
- **P-8**: rewritten. "So a review checks his decisions ...; its items are decisions in this file. Detail: ..." is struck: his one request of 09-29 for a review, carried out that day, which the rewrite of 10-13 put in a present tense that reads as a standing practice (rule 3). The rest stays word for word.
- **P-9**: rewritten. The quote, not his string, is dropped, since the title states the decision. "The two sources ..." is struck as a remark (rule 6). "C4 fell short" is dropped as a premise false today: his later words make C4 the target program (rules 8 and 12). Polishing in the vocabulary stays, pointing to P-87.
- **P-11**: kept, word for word.
- **P-12**: rewritten. "and sees it as low-hanging fruit" is dropped as a premise false today (rule 8). The last sentence stays: the option he took for after the switch-over joins walk's static coercions to the checker on interpreter programs. Here I differ from the judgement, which reads it as a default for the queue.
- **P-16**: struck, as a remark on the project's history that says what nobody does (rule 6), as he struck P-18. Its facts were the coordinator's, partly wrong, and his later words weigh against its reading.
- **P-17**: rewritten. The measuring sentence leaves. His instruction was one test, which was carried out (rule 3). The standing rule that the rewrite of 10-13 made of it goes to the review queue as drafted item Q-?1, its premise corrected (rules 2 and 8).
- **P-19**: rewritten. The `clean-ladder` sentence is struck as the state of the project, which F-165 holds. His later words of 09-23 put the cleaning in a pass of `main` (rules 6 and 12). `lineage.md`'s list, which the entry cites, is stale; that is noted for the coordinator.
- **P-25**: kept, word for word.
- **P-26**: kept, word for word, and a question for him: "The implementers' later word also outweighs unfinished text." has no source of his, and his yes of 09-24 to the brief's question 2 weighs the other way (rule 5).

## P-7

**Before and after.** Kept, word for word:

> - P-7 **The goal is to finish what the designers intended, measured by one program, microGPT, compiled to bytecode and running fast.** The judge is `Specification/`, the Working Draft of February 2011 as the revival revises it, with the 2012 Types chapter cited beside it (P-25). The language is not redesigned. The specification is a living document that states the revival's changes (P-95). The floor to measure against is a pure-Java microGPT, not yet written (PLAN phase 6).

**The parts.** Each is his decision, his yes, or a correct name (rules 0 and 1; `judgement-c1.md`, "P-7"):
- The title and "The language is not redesigned.": his decision, in his own words, at 2026-09-16T22:43:26.489Z. The message was unprompted: the coordinator's turn before it is "No response requested.". He said that he wants to finish the ideas as the original designers intended them, that he sees no reason to make the language something it was not designed to be, and that the focus is on getting this one program running fast. The coordinator's reflection of 22:44:25.808Z said "The measuring stick is one program", and he answered "word" at 22:46:21.111Z. "Measured by" is the reflection's word, and it is fair.
- The judge and the living document: his yes to item 11 of the decisions review, at 2026-09-29T15:49:10.603Z, to the coordinator's list of 13:09:55.448Z ("Correct the goal's wording about which draft is the standard"). He read the change as wording only, so that it is clear that the specification has become a living document that reflects the revival's changes, and he said to adjust it. "The latest one committed in this repository" is his 09-16 word. The Types chapter beside it is his yes of 09-26 (P-25).
- "The Working Draft of February 2011": no word of his, and none is needed. It is the record's correct name for the copy (F-163; P-96), and it replaced "the July 2012 draft", a label of the revival's that the review corrected.
- The pure-Java floor: his own words, hedged ("we will probably take and rewrite the micro GPT algorithm in pure Java to know where our baseline lies"), taken in the reflection that he answered "word". "Not yet written (PLAN phase 6)" is what is still to build, one short line with its PLAN item (rule 9). The phase is in the plan that he approved at 2026-09-26T09:04:41.396Z (P-33), and `PLAN.md`, "Phase 6", still names the timing against a pure-Java microGPT, not written yet. No tracked Java file holds one (scout §2c).

**What leaves POSITIONS.** Nothing.

**History line.** Listed under "History lines the tool cannot write". The block of 2026-10-13 19:07Z says: "His words of 2026-09-29 on the living document are in this history". Today's `POSITIONS-history.md` does not hold them. They survive only in the pre-numbering history (`a74f5a2b7`, `:388` and `:494`). The lines below put them back.

**Questions for him.** None.

**Pointers elsewhere.** None: `pointers.py 7` lists only the entry itself. The tag and test-first editing that left P-7 on 10-13 stand in the `fortress-repo` skill (scout §2d), which needs nothing.

## P-8

**Before.**

> - P-8 **Where the designers left no word, he decides by the goal, a compiled microGPT running fast, not by type-theoretic purity, and stays true to the spirit of Fortress.** He accepts the language's unfinished corners rather than stall in theory. He has not read the specification, the type papers or the library, and takes the designers to have known more than he does. So a review checks his decisions against their intent, for errors of commission and of omission; its items are decisions in this file. Detail: `reviews/decisions-review/judgement.md`, "In short".

**After.**

> - P-8 **Where the designers left no word, he decides by the goal, a compiled microGPT running fast, not by type-theoretic purity, and stays true to the spirit of Fortress.** He accepts the language's unfinished corners rather than stall in theory. He has not read the specification, the type papers or the library, and takes the designers to have known more than he does.

**Each part and its source.** All from one message, 2026-09-29T12:17:07.180Z. It answers no question: the reply chain gives the coordinator's batch status of 12:06:04.017Z.
1. The title and "He accepts the language's unfinished corners ...": unchanged (rule 1). These are his words, condensed fairly: he does not care about type-theoretical purity, and he accepts all the unfinished corners of the language, because he wants a compiled microGPT; getting this one program running fast is the guiding star, and along the way he wants to stay true to the spirit of Fortress. He also said that he started to make his judgement calls where the designers left no clues on record.
2. "He has not read ... more than he does.": unchanged (rule 0). His words: he has not read the specification, the papers on its type system or even the library, and he assumes that the designers knew much more than he does. His later words keep it true ("I feel extremely out of my depth here.", 2026-10-14T00:07:32.184Z). The judgement calls it a remark about himself, which rule 6 strikes. I kept it, because it is his, it is true, and its second half is the weight he gives the designers' record where it speaks, the other side of the title's "where the designers left no word". P-26 says the same of the type group ("it knows less than they did"). See "The rules, where they fit badly".
3. Struck: "So a review checks his decisions against their intent, for errors of commission and of omission; its items are decisions in this file. Detail: `reviews/decisions-review/judgement.md`, "In short"." It is a one-time request, carried out, that carries no standing rule (rule 3).
   - In the same message he asked once whether a thorough review of his decisions so far could be commissioned, to make sure he had committed no cardinal sin of omission or of commission ("so far").
   - Carried out: the review was written that day (`reviews/decisions-review/evidence.md`, `judgement.md`, `popl-recheck.md`), and he answered its eleven items the same day. They became entries: P-42, P-49 and P-59 are three of them.
   - The entry of 09-30 told it in the past tense: "The check he asked for is a thorough top-tier review of every decision of his against the designers' intent". The rewrite of 10-13 (`b87a17de5`) made it "So a review checks", which reads as a standing practice that he never set.
   - "Its items are decisions in this file" was the state of one day.
   - The "Detail" pointer leaves with the sentence. "In short" is that review's verdict on one day ("He has not gone astray"), not the detail of how he weighs his calls. His words are the detail, and the history keeps them.

**What leaves POSITIONS, and where it goes.** The struck sentence and its pointer, to the history. Nothing goes to the queue. No skill or PLAN line names a standing review of his decisions (a grep for "commission" and "omission" in the skills and the coordinator's files finds no line that sets one).

**History line.** The tool writes one block, given whole under "What record.py wrote". It names his message of 12:17 with its question, as block :630 does.

**Questions for him.** None. His "so far" makes the review a single review.

**Pointers elsewhere.** None: `pointers.py 8` lists only the entry itself.

## P-9

**Before.**

> - P-9 **The search is for microGPT's most readable expression.** In his words, "we are searching for the optimal expression of the microGPT algorithm for readability." The two sources are Fortress's mathematical notation and Iverson's APL notation, with Hsu's data design for data-flow algorithms. The flat program in Hsu's style, C4, fell short, so polishing happens in the vocabulary, the operations the model is written in. C4 is the APL program's target form. Its hyperparameters are tuple bindings, the form an APL strand assignment expands to; the semicolon form of those lines is set aside.

**After.**

> - P-9 **The search is for microGPT's most readable expression.** In the flat program in Hsu's style, C4, polishing happens in the vocabulary, the operations the model is written in (P-87). C4 is the APL program's target form. Its hyperparameters are tuple bindings, the form an APL strand assignment expands to; the semicolon form of those lines is set aside.

**Each sentence and its source.**
1. The title: unchanged (rule 1). His words at 2026-09-15T07:35:36.514Z: the toy exercise is microGPT, and the search is for the optimal expression of the microGPT algorithm for readability.
2. The quote: dropped. Quote marks promise his exact words, and these are not his string. He dictated "we are searching for the optimal expression of Micro GPT algorithm for. Readability" (scout §1: `quote.py` NO MATCH). By his standing word, quote him only where the exact words are the decision. Here the title states the decision in plain words, and the history keeps his.
3. Struck: "The two sources are Fortress's mathematical notation and Iverson's APL notation, with Hsu's data design for data-flow algorithms." It is a remark (rule 6): his account, in the same message, of how the search began. Fortress claims a mathematical notation, APL is in Iverson's tradition, and Hsu's lessons on data structures struck him. "The two sources" is the coordinator's framing (its 07:36:06.737Z). The sentence says nothing that a writer of model lines does. His verdict of 09-16 has since narrowed its first source: Fortress's mathematical notation is "a neat gimmick, but not a good idea at all" (P-11; rule 12).
4. "In the flat program in Hsu's style, C4, polishing happens in the vocabulary, the operations the model is written in (P-87)." (changed). The old sentence was "The flat program in Hsu's style, C4, fell short, so polishing happens in the vocabulary, ...".
   - "Fell short" is dropped as a premise false today (rules 8 and 12). On 09-15 he hedged: the Fortress code of the Hsu-style side quest looked suboptimal to his eye (07:28:31.808Z), and they got "few lumps of coal", though he had not looked at the programs in detail (07:35:36). His later words make C4 the target: "and C4 was our final target" (2026-09-19T17:01:32.913Z); C4 is derived from APL and Hsu's data structures (2026-09-21T03:02:13.683Z); "our target program, MicroGPT in expression C4" (2026-10-21T17:33:34.460Z).
   - Polishing in the vocabulary was the coordinator's point, in its rung 4b ask of 07:29:57.748Z, which his yes to the rewrite did not take up. His own rule now says the same, in P-87: the model's text is the notation, and the vocabulary is repaired around it. So the clause stays, with P-87 as its source (rule 12).
   - "The flat program in Hsu's style, C4" stays, as the only place that says what C4 is before the next sentence names it. C4 merges C2 and C3, both in Hsu's flat style (`run-c4/design.md:1-3`), and P-29 calls it "the flat model program".
   - His message of 09-19 also asked that the algorithm be composed from the standard array operations. That message asks a question, and P-27 and P-88 hold what the library takes. I did not add it.
5. "C4 is the APL program's target form.": unchanged (rule 1). He asked whether a synthesis of C2 and C3 should be the target of the APL expression (2026-09-14T16:09:10.799Z). The coordinator proposed C4 as the reference target (16:10:00.779Z), and he wrote "read explorations/microgpt-run-c-handover.md and start C4" (19:14:11.380Z). The APL program expands into C4's lines (`apl/mg/MicroGptApl.fss:1-4`).
6. The tuple bindings and the semicolon form: unchanged (rule 1). His words at 2026-09-14T20:12:12.623Z: the C2 hyperparameter notation is the one to use, and the one-line semicolon form has no use for the APL sub-language. The coordinator confirmed at 20:12:33 that a strand assignment expands to a tuple binding (APL gaps, row 80). The clause states the sub-language's rule. The APL program itself writes these lines as host lines (scout §2).

**What leaves POSITIONS, and where it goes.** The quote, the "two sources" sentence and "fell short, so", to the history. Nothing goes to the queue.

**History line.** The tool writes one block, given whole under "What record.py wrote". It names the three messages that no block of P-9 named (`judgement-c1.md`, "P-9", "Sources to put back").

**Questions for him.** None.

**Pointers elsewhere.** None by number: `pointers.py 9` lists only the entry itself. By its words: `coordinator/process-engineering/record-rule-draft.md:148` gives this quote as its example of a quote that is the decision. That draft's quote is the entry's, not his string. It needs nothing for this proposal, and it is noted here only so that the coordinator can decide whether the draft keeps the example.

## P-11

**Before and after.** Kept, word for word:

> - P-11 **The 2D notation is a gimmick: no work on it unless he asks.** Fortify's mathematical rendering bakes one view of a computation into the syntax, though the same mathematics can be written many ways. APL's one glyph for each transformation does that better. It is presentation only, off the path, and no argument for Fortress.

**The parts.**
- The verdict and its reasons: his decision, condensed fairly (rule 1). It is his message of 2026-09-16T22:43:26.489Z, unprompted, inside his request for a map. He said that his impression is that the notation is a neat gimmick but not a good idea at all; that it encodes a specific perspective onto the code, always tied to the execution; that it is not an essential part of the language; that APL seems a much purer realization of the idea; and that the mathematical notation is what first drew him to the language. That last remark is why "no argument for Fortress" is fair.
- "no work on it unless he asks": his yes, a weak one, to a statement that the entry words fairly (rule 1). He asked when the revival would touch Fortify. The coordinator's reflection of 22:44:25.808Z answered: only if the specification's LaTeX build changed or the microGPT article were typeset that way, and "Given your verdict on the notation, that is a no." He answered "word" (22:46:21.111Z), which was also the go for the survey workers. His later asks to restore a Fortify figure and the removed folder (2026-10-12T23:28:00.980Z, 23:29:43.807Z) fit the "unless he asks". It is a rule on what is not pursued, so it is actionable.
- The same reflection told him that the Unicode operators are in the language and that Fortify only typesets. The title confines the verdict to the 2D rendering. Both "bakes one view ... into the syntax" and "presentation only" are his, and I left them.

**What leaves POSITIONS.** Nothing.

**History line.** Listed under "History lines the tool cannot write". Block :648 names his words by date only, and it cites `notation-collaboration/README.md`, which holds no verdict (scout §3).

**Questions for him.** None.

**Pointers elsewhere.** None: `pointers.py 11` lists only the entry itself. `curator-profile/evidence.md:288` holds the same verdict as a profile note, by its words, and needs nothing.

## P-12

**Before.**

> - P-12 **The type checker on interpreter programs comes after the switch-over.** He wants the checker usable on the programs that walk runs, and sees it as low-hanging fruit. Today it checks only against the compiler's prelude (F-9). It comes once walk also takes the static coercions that the checker inserts (P-59).

**After.**

> - P-12 **The type checker on interpreter programs comes after the switch-over.** He wants the checker usable on the programs that walk runs. Today it checks only against the compiler's prelude (F-9). It comes once walk also takes the static coercions that the checker inserts (P-59).

**Each sentence and its source.**
1. The title: unchanged (rule 1). Item 7 of the decisions review offered "1. Accept it" now, and "2. Make walk match: needs static types under walk, which is the checker on interpreter programs, after the switch-over" (`reviews/decisions-review/judgement.md:354-360`). He answered at 2026-09-29T14:07:20.452Z: "item seven as recommended. So one now and two after the switch." He added that walk is not touched until the library is switched, and that once the checker runs in walk, walk gains types and can switch.
2. "He wants the checker usable on the programs that walk runs.": kept (rule 1). It rewords his question of 2026-09-15T10:42:06.544Z: running the checker optionally in walk, which he took to be on the ledger already. "Usable" keeps his "optionally". The earlier form of the same wish is his question of 2026-09-08T21:16:25.193Z, why the interpreter does not use type checking.
3. Dropped: "and sees it as low-hanging fruit". It is a premise false today, and stale (rules 0 and 8). That was his view of 09-15, inside a question. The record has since found that the checker cannot check the interpreter's library (row 69; F-9), that the work waits on the switch-over, "the largest and least designed piece" of the plan (`reviews/decisions-review/judgement.md`, "In short"), and that walk's step to static types is not yet designed (`PLAN.md`, phase 4). The coordinator told him on 2026-09-29T14:08:16.691Z that walk must then also take the coercions that the checker inserts, "a small change of its own". A reader who takes the work for low-hanging fruit would weigh it wrong.
4. "Today it checks only against the compiler's prelude (F-9).": unchanged. It is true today (scout §2: `Shell.java:403-424`), and it is the reason why the work waits for the switch-over.
5. "It comes once walk also takes the static coercions that the checker inserts (P-59).": unchanged (rule 1). The judgement reads it as the coordinator's condition, its 14:08:16 answer to his "Am I missing anything?", and so as a default for the review queue (rule 2). I read it as his yes:
   - Option 2 of item 7, which he took for after the switch-over, already joins the two halves. "Make walk match" means walk taking the coercions statically. It "needs static types under walk, which is the checker on interpreter programs". The review's own recommendation adds that option 2 "is already your wish of 2026-09-15".
   - His own words in the same message join them too: once the checker runs in walk, walk gains types and can switch.
   - The coordinator's 14:08:16 adds one fact of the code: walk will not use the types by itself, so taking the inserted coercions is a change of its own. That is a fact, not a choice. P-59, his decision from the same review, holds it ("After the switch-over walk takes the static coercions that the checker inserts.").
   - One reading stays open: a check of walk's programs by `fortress typecheck` alone, without walk using the result. The review's `:265` says that this check "arrives with the switch-over". The sentence reads "once ... also", the two together, and does not bar that check. I left it word for word (rule 0). See "The rules, where they fit badly".

**What leaves POSITIONS, and where it goes.** "and sees it as low-hanging fruit", to the history. Nothing goes to the queue.

**History line.** The tool writes one block, given whole under "What record.py wrote". It holds the three messages that no block of P-12 named.

**Questions for him.** None.

**Pointers elsewhere.**
- `FACTS.md`, F-9, "The checker reaches walk's programs after the switch-over (P-12).": needs nothing.

## P-16

**Before.**

> - P-16 **He reads the project's end as the price of doing no work on performance.** DARPA's HPCS did not take Sun into its third phase in 2006, and the project went on at Sun Labs until 2012. The team worked on syntax, and the compiler that was to make the mathematical types fast never came; the funding was cut for good reason.

**After.** Struck.

**Why.** It is a remark: his reading of the project's history (rule 6). By his test of 2026-10-21 (20:10 and 23:05 UTC, on the audit trial's page), an entry is actionable when it says what someone does, what is not pursued, or what must keep working. This one says none of them. It is the same kind of entry as P-18, which he struck at 20:10 as a subjective observation that changes nothing about the project. The judgement agrees (`judgement-c1.md`, "P-16").
- His words are condensed fairly. At 2026-09-15T10:42:06.544Z he said that the team did zero work on performance, that it worked on the syntax in the belief that a sufficiently advanced compiler would one day make the mathematical expressions and types fast, which is not true, and that the DARPA funding died for a very good reason. An hour earlier, at 09:49:52.021Z, he had said that they lost the DARPA funding because they worked on syntax and not on high-performance computing.
- Its facts were the coordinator's (its text of 09:51:20.618Z: HPCS phase three, 2006, Sun Labs until 2012), and one of them is partly wrong. Sun was acquired in 2010, and the repository's README says that Oracle Labs concluded the project in the summer of 2012 (`README.md:88-89`). The scout found no source in the tree for "phase three" (scout §2).
- His later words weigh against its reading. On 2026-09-23T07:26:28.248Z he said that the type group tried to make the language run and that its goal was performance. That is P-26's premise, so "doing no work on performance" and P-26 now disagree. On 2026-10-09T23:21:17.345Z he named another possible reason for the project's end, the exponential cost of static type analysis (the README quotes Steele looking back in 2016 on the "exponential cost" where the type-system work stalled, `README.md:79-84`).
- The lesson that a reader could draw, that the revival must work on performance, is P-7's and P-17's.

**What leaves POSITIONS, and where it goes.** The entry, to the history. Nothing goes to the queue. The curator profile already holds his reading as background, apart from P-16: `curator-profile/evidence.md:268` (2026-09-08), `:283` and `:285` (2026-09-15).

**History line.** The tool writes one block, given whole under "What record.py wrote". It names both messages of 09-15 and his two later ones.

**Questions for him.** None.

**Pointers elsewhere.** None names P-16 by number (`pointers.py 16`). Three skill lines name its section, "History he knows (do not re-explain)", by heading:
- `.claude/skills/coordinator/SKILL.md:74`: "Take as known to the curator the section "History he knows (do not re-explain)" of `POSITIONS.md`, and every decision in it."
- `SKILL.md:139`: "POSITIONS' "History he knows" holds the project history that you do not explain again."
- `.claude/skills/coordinator/references/sources.md:8`, the source of both.

With P-16 struck, and P-18 struck by the trial's proposal, the section holds P-17 and P-19, two decisions and no history. Line 139 would then point at no history. Each line would need either the section renamed (or its two entries moved to "Decisions on record") and the "do not re-explain" knowledge pointed at the curator profile, which holds it (`curator-profile/evidence.md`), or the section kept as it is. That is the coordinator's to choose with the trial's P-18. Nothing in this proposal edits a skill.

## P-17

**Before.**

> - P-17 **Unboxed doubles and arrays of doubles are required: without them the revival misses its point.** The code generator boxes every number, and boxing is the main cost on microGPT's array kernels (F-11). Boxing is measured on microGPT-shaped kernels, not on a scalar loop with literals and a `:=` accumulator, which microGPT never runs. The storage is P-84's decision; unboxed arithmetic is PLAN phase 6 (P-33).

**After.**

> - P-17 **Unboxed doubles and arrays of doubles are required: without them the revival misses its point.** The code generator boxes every number, and boxing is the main cost on microGPT's array kernels (F-11). The storage is P-84's decision; unboxed arithmetic is PLAN phase 6 (P-33).

**Each sentence and its source.**
1. The title: unchanged (rule 1). His words at 2026-09-15T10:42:06.544Z: performance needs doubles that are not boxed and an array of doubles that the JVM's compiler can optimise, so that goes straight onto the priority list, "like without this, what are we even doing here?". His later words at 2026-09-19T18:32:48.384Z: arrays must be double arrays for performance, with no question about it, since a high-performance language cannot box them. "Required" and "misses its point" are a fair rewording.
2. "The code generator boxes every number, and boxing is the main cost on microGPT's array kernels (F-11).": unchanged (rules 0 and 11). The first half is true today (scout §2). The second half rests on one probe, of Java models of the three kernels, since no such kernel compiles yet. F-11 holds the numbers, the scope ("In Java models of microGPT's three kernels") and "No such kernel compiles yet". The entry keeps the reason in words, with the pointer, which is what rule 11 asks. A Fortress measurement would change F-11, not this decision.
3. Leaves: "Boxing is measured on microGPT-shaped kernels, not on a scalar loop with literals and a `:=` accumulator, which microGPT never runs." (rules 3, 2 and 8).
   - His word was one instruction, carried out. At 2026-09-15T22:34:55.554Z, on the boxing probe that the coordinator reported at 21:42:29.833Z, he said that the test seemed to meet an edge case that the microGPT experiments had not met, float literals parsed from strings, and asked for a fairer and better test. The kernels probe did it (`perf-probes/kernels/REPORT.md`, sections 1 and 2; F-11).
   - The texts until 2026-10-13 told this as history: "The first measurement's scalar loop was an edge case microGPT never hits ...; the fairer test he asked for agreed with him". The consolidation of that day kept it "as the rule on what to measure" (block :668). As a standing rule it is the coordinator's, in his spirit (P-7 measures the goal by microGPT), and he was never asked about it. So it goes to the review queue as drafted item Q-?1 (rule 2).
   - Its premise is partly false (rule 8). MicroGPT's kernels run no such loop, but C4's weight loader does: `parseFloat` keeps `m: RR64 := 0.0` and runs `m := 10.0 m + ...` in a `while` loop (`run-c4/src/FlatData.fss:16-30`). The drafted item says "which microGPT's kernels do not run".
4. "The storage is P-84's decision; unboxed arithmetic is PLAN phase 6 (P-33).": unchanged. These are fair pointers to his decisions: P-84 holds `double[]` storage, and P-33 the plan he approved.

**What leaves POSITIONS, and where it goes.** The measuring sentence: its history to the history, and the standing rule to the review queue as drafted item Q-?1 (`review-queue-items-c1.md`).

**History line.** The tool writes one block, given whole under "What record.py wrote". It names the three messages that no block of P-17 named.

**Questions for him.** None here. Q-?1 puts the rule to him through the queue.

**Pointers elsewhere.** None: `pointers.py 17` lists only the entry itself. `curator-profile/evidence.md:396` holds his objection of 09-15 as a profile note, with the same "which microGPT never exercises". That is the profile's own wording of a past event, and it needs nothing.

## P-19

**Before.**

> - P-19 **The tree is not described as the third-party port's migration grafted on its history.** The files that still say so wait for the lineage cleanup (PLAN, "Off the path, parked"), which `coordinator/lineage.md`, "Files that still repeat it", lists. His plan to make the graft-free `clean-ladder` branch `main` is not carried out (F-165).

**After.**

> - P-19 **The tree is not described as the third-party port's migration grafted on its history.** The files that still say so wait for the lineage cleanup (PLAN, "Off the path, parked"), which `coordinator/lineage.md`, "Files that still repeat it", lists.

**Each sentence and its source.**
1. The title: unchanged (rule 1). He rejected the coordinator's boot line "plus pluckyporcupine's Scala/Java migration graft": it is incorrect, find the true facts by archaeology and correct the record (2026-09-23T05:28:37.640Z). After the archaeology he wrote that he still prefers that the record not mislead anyone into thinking that the tree is built on the port's graft, "because it is not" (06:33:41.521Z). The archaeology's verdict is that his recollection is wrong on the history and largely right on the working code (`lineage.md`, "Verification against Pavol's recollection"). `main` does descend from the graft commit `8fe1daa8f`, and F-165 states it. The rule forbids describing the tree as the port's migration. It does not forbid stating the commit.
2. "The files that still say so wait for the lineage cleanup ...": unchanged (rules 0 and 9). It is what is still to do, in one short line, with its PLAN item: `PLAN.md`, "Off the path, parked", names "the lineage cleanup".
   - First he held the task: a cleanup pass once the facts are established, but hold that task (06:02:13.771Z, on the coordinator's 05:39:00.265Z "Cleaner pass, or now?"). Then he gave a go: if a worker now has enough information, it may do a cleanup and commit it (06:33:41). A worker did it at `a4e266faa` (06:39:10Z), twelve files.
   - What was left went to PLAN's parked list (`886a06e1d`, 2026-09-27), inside the plan that he approved as a whole on 09-26. The judgement calls that parking a default. Parking a task that he had himself held is not a choice made in his place, so I left the sentence in POSITIONS.
   - The list that the sentence cites is stale. `lineage.md`'s section was written before `a4e266faa`, and that commit did not touch it. It lists thirteen groups of files. The commit rewrote five of them, which no longer say it: `README.md`, `research/authorship.md`, `explorations/repo-internals.md`, `explorations/modernization-plan.md` and `coordinator/INDEX.md`. It gave seven more a dated correction beside the old words: `c2-proposal.md`, `rung-rr64-functions/round-history.md`, `process-audit.md`, `readme-plan.md`, `rebuild-plan.md`, `test-baseline-jdk8.md` and `research/extracts/SteeleJuliaCon2016-extract.md` (`git show a4e266faa`, and a grep of the files at HEAD). Only `coordinator/oracle-headers.md:47` stands as it was. The fix belongs to `lineage.md`, a report, not to the entry: once its list is current, the entry's pointer is true. It is listed under "Pointers elsewhere".
3. Struck: "His plan to make the graft-free `clean-ladder` branch `main` is not carried out (F-165)." It is the state of the project, about a plan of his that his later words replaced (rules 6 and 12).
   - The plan was his of 2026-08-22 and 2026-08-23: he would still rename the main branch to `clean-ladder` (2026-08-23T19:13:01.806Z).
   - On 09-23 he put the cleaning in a pass of `main` instead. At 06:02:13, at a certain point the main branch is cleaned up and committed. At 06:27:28.143Z, he never got to the rename, and he asked whether a later cleanup that cherry-picks the commits that move the work forward is where it gets cleaned. PLAN parks that cleaner pass of `main` (`PLAN.md`, "Off the path, parked", housekeeping: "the cleaner pass, as he set it").
   - The fact stays where it belongs: F-165 says that `clean-ladder` "never replaced `main`".

**What leaves POSITIONS, and where it goes.** The `clean-ladder` sentence, to the history. Nothing goes to the queue.

**History line.** The tool writes one block, given whole under "What record.py wrote". It holds the four messages that no block of P-19 named.

**Questions for him.** None.

**Pointers elsewhere.**
- `.claude/skills/fortress-repo/references/sources.md:614` names P-19 with its title's opening words, which are unchanged: needs nothing.
- `coordinator/lineage.md`, "Files that still repeat it, for the cleaner pass or for a decision": not a pointer, but the source that the kept sentence cites. It needs the five files that `a4e266faa` rewrote taken out of its list, and the seven that it corrected marked "a dated correction stands beside it (`a4e266faa`)", so that only `coordinator/oracle-headers.md:47` reads as untouched.
- F-165 does not name P-19. With the struck sentence gone, P-19 no longer points to F-165, the fact that a worker needs in order to describe the lineage correctly. By the record's rule a POSITIONS entry lists no FACTS entries, so the link would go the other way: F-165 could end "It bears on P-19." That is a change to FACTS, which this proposal does not make. It is noted for the coordinator.

## P-25

**Before and after.** Kept, word for word:

> - P-25 **The specification stays the standard, the Types chapter beside it.** Where the Types chapter of the team's unfinished 2012 restart (F-166) covers a topic, it is cited beside `Specification/` as the designers' later word. On the rules that the revival revises, it is their latest intent, which the goal is to finish. It covers the exclusion rule, as instantiation exclusion in its two-part form, the `covariant` modifier, and `Bottom`, which no program can write.

**The parts.** His yes to a question that the entry states fairly (rule 1; `judgement-c1.md`, "P-25"):
- The ask was the coordinator's text of 2026-09-26T07:56:16.747Z: should the Types chapter count as the designers' later word wherever it covers something, with yes meaning that `Specification/` stays the standard and the chapter is cited wherever it covers something. It named the three passages and ended "I recommend yes: on the rule S revises, it is the designers' latest intent, and the goal is to finish what they intended." The coordinator withdrew the ask at 07:58:18.451Z, as overlapping P-26. He answered by quoting that recommendation and writing "Agreed." (08:01:03.475Z), so his yes takes the ask of 07:56.
- "On the rules that the revival revises": the ask said "the rule S revises". The plural follows from the main question ("wherever it covers something"), so it does not go beyond his yes.
- "In its two-part form": not in the ask. It comes from the S2 judgement (`reviews/spec-refused-examples-judgement.md:134`), whose verdicts he took later (P-97, which points back here). It neither narrows nor adds (rule 7).
- The premises hold today: `types.tick` is unchanged since 2012, at the cited lines (scout §2).

**What leaves POSITIONS.** Nothing.

**History line.** Listed under "History lines the tool cannot write". Block :684 names "the sentence he agreed to on 2026-09-26", by date only.

**Questions for him.** None.

**Pointers elsewhere.** None needs a change: P-7 ("(P-25)"), P-97 ("Luchangco's two-part form (P-25)") and `reviews/open-asks-2026-10-16.md:134` ("The later word: P-25 and P-26").

## P-26

**Before and after.** Kept, word for word:

> - P-26 **The type group's late positions outweigh the specification's early text where they conflict.** The early text was a wish. The type group then made the language run, for performance and with specialization a must, and learned what is feasible. So their later word wins: the exclusion rule, specialization kept, the compiler prelude's tower flattened in 2009 and 2010 (P-43), Naden's 2012 write-up, the POPL 2019 paper. The implementers' later word also outweighs unfinished text. The revival does not second-guess them: it knows less than they did.

**The parts.**
- The title, the reason and "does not second-guess them": his decision, condensed fairly (rule 1). It is his message of 2026-09-23T07:26:28.248Z, which answers the coordinator's 07:16:28.611Z ("Here is the whole thing in plain words"), quoted at its start. He said that the specification was written in a vacuum early on; that the type group then tried to make the language run, so it knew much better what is feasible; that the goal was performance and specialization a must; that the specification cannot be authoritative on what was written as a wish, and when the wish met reality the specification must change; and that the revival knows nothing here and will not re-speculate how to implement the letter of the specification. He restated the rule at 2026-09-29T12:17:07.180Z: the team's latest positions on record are valued above whatever they said earlier, because programming is a learning exercise.
- The list of instances: the coordinator's terms (07:10:43, 07:16:28) for "the type group's trade", which he took ("So I think this is the route that we must pursue."). The dates are his correction of 2026-10-12T22:20:54.637Z. The flattening stands by his later "Agreed. Route A it is." (2026-09-24T14:41:40.798Z, P-43). Kept (rule 7: it neither narrows nor adds).
- "the POPL 2019 paper": added by the coordinator on 09-30 with no source named. He has used it as his own since, so his words settle it (rule 5, its exception; rule 12). On 2026-10-10T06:09:08.402Z he took the coordinator's "Your position says the type group's late word, POPL 2019 included, outweighs earlier text" and asked that the gap be plugged, so that the paper written after the repository enters the record used for decisions. On 2026-10-13T23:23:46.460Z he asked whether that paper helps decide a question. And P-48, his decision of 09-29, rests on it ("The rule is the team's later word (POPL 2019).").
- "The implementers' later word also outweighs unfinished text.": no source of his (rule 5). The coordinator added it in the rewrite of 09-30 (`bc8902f47`) with no source named (scout §3). The text stays as it is, and it becomes a question for him (question 1). Two words of his come near it:
  - "when later work in compiler or type papers contradict the original spec, we updated it to match the current state of the implementation in the revival" (2026-10-12T23:15:30.246Z, on a draft letter). This speaks of the original specification, the title's early text, not of unfinished text.
  - "Yes, because that was the teams last record on how to do the "Fortress" way." (2026-09-24T01:02:52.634Z), in a message that opened by saying that he was not deciding yet. It answers the exclusion brief's question 2: does he weigh the patents' forest rule, the team's latest text but never built, above the implemented flattening? This weighs a later, unbuilt text above an implemented one, the other way from the clause. He then chose route A, the implemented flattening, at 14:41.
  - The judgement reads the clause as an agent's default for the review queue (rule 2). Rule 5, his word of 2026-10-21, 23:29 UTC, says that a text with no source of his stays and becomes a question, and does not leave POSITIONS on that ground alone. I followed rule 5. See "The rules, where they fit badly".

**What leaves POSITIONS.** Nothing.

**History line.** Listed under "History lines the tool cannot write". Block :690 names his words of 2026-09-23 by date and quotes them.

**Questions for him.**
1. P-26 says: "The implementers' later word also outweighs unfinished text." The coordinator added the sentence on 2026-09-30, and no word of yours stands behind it. On 2026-09-24 (01:02 UTC) you weighed the patents' forest rule, a later text that was never built, above the flattening that the team implemented, "because that was the teams last record", and you then chose route A, the implemented flattening. On 2026-10-12 (23:15 UTC) you wrote that where later work in the compiler or the type papers contradicts the original specification, the revival updates the specification; that is the title's early text, not unfinished text. Confirm the sentence, or strike it?

**Pointers elsewhere.** None needs a change for this proposal, which keeps the entry: F-223, P-152, P-153 and P-154 name it as the team's later word; `reviews/open-asks-2026-10-16.md:134`; the `coordinator` skill's `SKILL.md:82` ("the team's later word (P-26)") and `references/sources.md:105`; the `fortress-repo` skill's `references/sources.md:648`, `:654` and `:681`. If he strikes the sentence of question 1, none of these needs a change either: none of them rests on "unfinished text".

## History lines the tool cannot write

The tool has no route for these lines. An entry line equal to the entry is skipped, and a call that changes nothing is refused. I tried it on a second copy: P-7's line, unchanged, with a note, gives `record.py apply: nothing changes`, exit 1, and the files' `md5sum` is the same before and after (`fix-c1/probe-unchanged-out.txt`, `md5-before.txt`, `md5-after.txt`). The lines are in the history's provenance form, ready for a provenance-only block once the tool has one. Each gives his message's time and a fair rewording. A quote appears only where a short answer is itself the decision (rule 10).

**P-7**
- 2026-09-16T22:43:26.489Z · his words: finish the ideas as the original designers intended them; no reason to make the language something it was not designed to be; the latest specification committed in this repository, not 1.0; the focus on getting this one program running fast; and probably, at a certain point, a pure-Java microGPT as the baseline · unprompted (the coordinator's turn before it, 22:43:26.362Z, is "No response requested.").
- 2026-09-16T22:46:21.111Z · his words: "word" · answering the coordinator's 2026-09-16T22:44:25.808Z reflection (the guiding constraint: finish what the designers intended, judged by the latest specification, no redesign; the measuring stick is one program, microGPT compiled to bytecode and running fast; a pure-Java microGPT later gives the floor to aim at).
- 2026-09-29T15:49:10.603Z · his yes to item 11 of the decisions review: the goal's wording is adjusted, so that it is clear that the specification has become a living document that reflects the revival's changes · answering item 11 of the coordinator's list of 2026-09-29T13:09:55.448Z (the reply chain gives the item-4 turn of 15:26:31.509Z).
- 2026-09-26T09:04:41.396Z · his words: "Yes, this order and workers are go." · to the plan whose phase 6 holds the timing against a pure-Java microGPT (P-33).
- The block of 2026-10-13 19:07Z says that his words of 2026-09-29 on the living document are in this history. They are not: they stand only in the pre-numbering history (`git show a74f5a2b7:explorations/coordinator/POSITIONS-history.md`, `:388` and `:494`). The line of 15:49:10 above names them.

**P-11**
- 2026-09-16T22:43:26.489Z · his verdict: Fortress's mathematical notation is a neat gimmick but not a good idea at all, and not an essential part of the language, since it encodes one perspective onto the code; APL is the purer realization of the idea · unprompted, inside his request for a map (the coordinator's turn before it, 22:43:26.362Z, is "No response requested.").
- 2026-09-16T22:46:21.111Z · his words: "word" · answering the coordinator's 2026-09-16T22:44:25.808Z reflection (Fortify would be touched only if the specification's LaTeX build changed or the microGPT article were typeset with it, and given his verdict, that is a no), which was also the go for the survey workers.
- Block :648 names his words by date only, and cites `notation-collaboration/README.md`, "Where the presentation is controlled", which holds no verdict (scout §3).

**P-25**
- 2026-09-26T08:01:03.475Z · his words: "Agreed." · to the recommendation that he quoted, from the coordinator's 2026-09-26T07:56:16.747Z ask (the Types chapter counts as the designers' later word wherever it covers something; `Specification/` stays the standard), which the coordinator had withdrawn at 07:58:18.451Z as overlapping P-26; the reply chain gives the 07:58 turn.

**P-26**
- 2026-09-23T07:26:28.248Z · his words: the specification was an early wish; the type group tried to make the language run, so it knew what is feasible, with performance its goal and specialization a must; where the wish met reality the specification must change, and the revival does not re-speculate how to implement its early letter · answering the coordinator's 2026-09-23T07:16:28.611Z ("Here is the whole thing in plain words"), which he quotes; the reply chain gives 07:18:30.986Z.
- 2026-09-29T12:17:07.180Z · his words: the team's latest positions on record are valued above whatever they said earlier, because programming is a learning exercise · unprompted on this point, after the coordinator's 2026-09-29T12:06:04.017Z (a batch status).
- 2026-10-10T06:09:08.402Z · his acceptance in use of the coordinator's "the type group's late word, POPL 2019 included", and his ask that the papers written after the project enter the record used for decisions · answering the coordinator's text that he quotes (on why the judges missed the POPL paper).
- 2026-10-12T22:20:54.637Z · his request to fix the Steele attribution in POSITIONS and the reports, which gave the flattening its authors and dates · after the coordinator's 22:18:23.501Z.

**A defect common to the chunk's history.** Each block of 2026-10-13 19:07Z, by consolidation chunk P1, gives `commit bc8902f47`. That is the commit of 2026-09-30 that wrote the text each block replaced. The rewrite itself is `b87a17de5` (2026-10-13T19:07:21Z, "POSITIONS: chunk P1 consolidated, P-7 to P-33 and P-95 to P-98"; `git show -s`). The history is append-only, so the old blocks stay. The six new blocks below follow them, and the fact is noted here.

## What record.py wrote

**How it ran.** The scratch root `fix-c1/root/` holds copies of the four record files from `explorations/coordinator/`: `POSITIONS.md`, `POSITIONS-history.md`, `FACTS.md` and `FACTS-history.md`. Every other path in it is a symbolic link into the real tree, so that the `from` paths resolve. The tool was the real `explorations/coordinator/tools/record.py`. It ran with `--root` on the copy, with `GIT_DIR` set to the real repository, read only, so that `check --base` can read the base. The base was HEAD at the run, `2348e3c8d`. The four record files there are the same as in the working tree and as at `6601e811b`, where `pointers.py` ran (`git diff --stat` empty). The commands, run from the scratch folder:

    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base HEAD --root root
    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py apply /home/user/fortress/explorations/coordinator/positions-audit/full/evidence/corrections-c1.apply --root root
    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base HEAD --root root

**check before the apply** (`fix-c1/check-before.txt`), exit 0:

    record.py check: FACTS.md 198 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2

**apply** (`fix-c1/apply-out.txt`), exit 0:

    P-8: rewritten
    P-9: rewritten
    P-12: rewritten
    P-16: removed
    P-17: rewritten
    P-19: rewritten

**check after the apply** (`fix-c1/check-after.txt`), exit 0:

    reported, not failing:
      FACTS.md: size: 85 entries over 600 characters: ...
      POSITIONS.md: size: 18 entries over 600 characters: P-40 1129, P-43 662, P-45 1678, P-46 887, P-48 724, P-51 696, P-60 805, P-146 727, P-147 669, P-148 632, P-149 812, P-151 1095, P-152 1303, P-154 948, P-155 831, P-79 836, P-153 986, P-85 653
    record.py check: FACTS.md 198 entries, POSITIONS.md 82 entries; 0 failures; reported: size 2

The FACTS size line is cut here at "..."; it is the same, entry for entry, as before the apply (`diff check-before.txt check-after.txt` differs only in the POSITIONS count).

What changed, against the run before the apply:
- POSITIONS has 82 entries, one fewer: P-16 is struck.
- The size list is the same, before and after: no entry of this chunk was over 600 characters, and none is now. The whole lines, before and after: P-8 567 to 371, P-9 597 to 359, P-12 317 to 283, P-17 416 to 283, P-19 343 to 254.
- No failure, and no section or `from` citation reported as unresolved.
- FACTS and its history are unchanged (`fix-c1/FACTS.diff` and `FACTS-history.diff` are empty).
- The first run of the apply, on an earlier copy, was the same but for one note. In P-9's note I then reworded two of his phrases that I had quoted, by rule 10, and ran it again on a fresh copy. The output above is of the second run.

**POSITIONS.md.** Five lines rewritten, each as in its "After", and P-16's line gone; P-7, P-11, P-25 and P-26 unchanged (`fix-c1/POSITIONS.diff`). The blocks that the tool appended to `POSITIONS-history.md` are below, verbatim, from `fix-c1/history-blocks.txt`. The time is the copy's clock. A real apply would stamp its own time and name its own `by`.

```
### P-8

2026-10-22 02:09Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c1.md`, "P-8" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c1.md`, "P-8" · by the POSITIONS audit's writer for chunk c1 (Opus), proposed for his review: "So a review checks his decisions against their intent, for errors of commission and of omission; its items are decisions in this file. Detail: `reviews/decisions-review/judgement.md`, "In short"." struck, with its pointer, as a one-time request, carried out, that carries no standing rule. At 2026-09-29T12:17:07.180Z he asked once whether a thorough review of his decisions so far could be commissioned, to make sure that he had committed no cardinal sin of omission or of commission; the review was written that day (`reviews/decisions-review/`), he answered its eleven items the same day, and they became entries (P-42, P-49 and P-59 among them). The entry of 2026-09-30 told it in the past ("The check he asked for is ..."); the rewrite of 2026-10-13 put it in a present tense that reads as a standing practice, which he never set. "In short" is that review's verdict of one day. The rest kept. Its source: the same message, unprompted on this point, after the coordinator's 2026-09-29T12:06:04.017Z (a batch status): where the designers left no clues on record he started to make his own judgement calls; he does not care about type-theoretical purity and accepts all the unfinished corners of the language because he wants a compiled microGPT; getting this one program running fast is the guiding star, and along the way he wants to stay true to the spirit of Fortress; he has not read the specification, the papers on its type system or even the library, and assumes that the designers knew much more than he does.

- P-8 **Where the designers left no word, he decides by the goal, a compiled microGPT running fast, not by type-theoretic purity, and stays true to the spirit of Fortress.** He accepts the language's unfinished corners rather than stall in theory. He has not read the specification, the type papers or the library, and takes the designers to have known more than he does. So a review checks his decisions against their intent, for errors of commission and of omission; its items are decisions in this file. Detail: `reviews/decisions-review/judgement.md`, "In short".

### P-9

2026-10-22 02:09Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c1.md`, "P-9" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c1.md`, "P-9" · by the POSITIONS audit's writer for chunk c1 (Opus), proposed for his review: three changes. The quote "we are searching for the optimal expression of the microGPT algorithm for readability" dropped: it is not his string (he dictated "we are searching for the optimal expression of Micro GPT algorithm for. Readability"), and the title states the decision. "The two sources are Fortress's mathematical notation and Iverson's APL notation, with Hsu's data design for data-flow algorithms." struck as a remark: his account, in the same message, of how the search began, framed by the coordinator as two sources; his verdict of 2026-09-16 (P-11) has since narrowed its first source. "Fell short, so" dropped as a premise false today: on 2026-09-15 he said that the Hsu-style side quest's Fortress code looked suboptimal to his eye (07:28:31.808Z) and gave few lumps of coal, though he had not looked at it in detail (07:35:36.514Z); his later words make C4 the target: C4 was the final target (2026-09-19T17:01:32.913Z), C4 is derived from APL and Hsu's data structures (2026-09-21T03:02:13.683Z), and microGPT in the C4 expression is the target program (2026-10-21T17:33:34.460Z). Polishing in the vocabulary, the coordinator's point in its rung 4b ask of 2026-09-15T07:29:57.748Z, is his own rule in P-87, to which it now points. The rest kept. Its sources: 2026-09-15T07:35:36.514Z, answering that ask: the toy exercise is microGPT, the search is for its optimal expression for readability, and a go for the rung 4b rewrite; 2026-09-14T19:14:11.380Z, his go to start C4, the synthesis of C2 and C3, after the coordinator's 16:10:00.779Z proposal of C4 as the APL program's reference target, which answered his own question of 16:09:10.799Z; 2026-09-14T20:12:12.623Z: the C2 tuple form of the hyperparameters is the one to use, and the one-line semicolon form has no use for the APL sub-language, after the coordinator's 19:59:41.321Z (C4 has them as three untyped tuple bindings) and his own 20:02:12.210Z; the coordinator confirmed at 20:12:33 that a strand assignment expands to a tuple binding.

- P-9 **The search is for microGPT's most readable expression.** In his words, "we are searching for the optimal expression of the microGPT algorithm for readability." The two sources are Fortress's mathematical notation and Iverson's APL notation, with Hsu's data design for data-flow algorithms. The flat program in Hsu's style, C4, fell short, so polishing happens in the vocabulary, the operations the model is written in. C4 is the APL program's target form. Its hyperparameters are tuple bindings, the form an APL strand assignment expands to; the semicolon form of those lines is set aside.

### P-12

2026-10-22 02:09Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c1.md`, "P-12" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c1.md`, "P-12" · by the POSITIONS audit's writer for chunk c1 (Opus), proposed for his review: "and sees it as low-hanging fruit" dropped as a premise false today: it was his view of 2026-09-15, inside a question; the record has since found that the work waits on the switch-over (row 69; F-9), and the coordinator told him at 2026-09-29T14:08:16.691Z that walk must then also take the coercions that the checker inserts, a change of its own. The rest kept. Its sources: 2026-09-29T14:07:20.452Z, his yes to item 7 of the decisions review, "So one now and two after the switch.": option 1 now, accept walk's run-time choice of coercions; option 2 after the switch-over, make walk match, which needs static types under walk, that is the checker on interpreter programs; with his reading that walk is not touched until the library is switched, and that once the checker runs in walk, walk gains types and can switch; answering item 7 of the coordinator's list of 2026-09-29T13:09:55.448Z and of the review's page; 2026-09-15T10:42:06.544Z, his question whether running the checker optionally in walk, which he took to be a low-hanging fruit, was already on the ledger, in his message on the coordinator's 09:51:20.618Z (the checker that walk never runs); 2026-09-08T21:16:25.193Z, his question why the interpreter does not use type checking, answered by the coordinator's 21:17:58.819Z.

- P-12 **The type checker on interpreter programs comes after the switch-over.** He wants the checker usable on the programs that walk runs, and sees it as low-hanging fruit. Today it checks only against the compiler's prelude (F-9). It comes once walk also takes the static coercions that the checker inserts (P-59).

### P-16

2026-10-22 02:09Z · removed · from `explorations/coordinator/positions-audit/full/evidence/corrections-c1.md`, "P-16" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c1.md`, "P-16" · by the POSITIONS audit's writer for chunk c1 (Opus), proposed for his review: struck as a remark, by his test of 2026-10-21 (20:10 and 23:05 UTC, on the audit trial's page): it says how he reads the project's history, not what anyone does, like P-18, which he struck at 20:10. Its facts were the coordinator's (2026-09-15T09:51:20.618Z: HPCS's third phase, 2006, Sun Labs until 2012), and "at Sun Labs until 2012" is partly wrong: Oracle Labs concluded the project in the summer of 2012 (the root README, "2012: wind-down"). His later words weigh against its reading: at 2026-09-23T07:26:28.248Z the type group tried to make the language run and its goal was performance (P-26); at 2026-10-09T23:21:17.345Z he named another possible reason for the project's end, the exponential cost of static type analysis. The curator profile's evidence keeps his reading as background (`curator-profile/evidence.md`, the lines of 2026-09-08 and 2026-09-15). Its sources: 2026-09-15T10:42:06.544Z, in his message on the coordinator's 09:51:20.618Z (the DARPA sentence): the team did zero work on performance and counted on a future compiler to make its mathematical notation and types fast, so the DARPA funding was cut for a very good reason; with his request for a preamble, so that what he already knows is not rehashed; 2026-09-15T09:49:52.021Z, unprompted, in his reply to the coordinator's 09:43:56.338Z: they lost the DARPA funding because they worked on syntax and not on high-performance computing.

- P-16 **He reads the project's end as the price of doing no work on performance.** DARPA's HPCS did not take Sun into its third phase in 2006, and the project went on at Sun Labs until 2012. The team worked on syntax, and the compiler that was to make the mathematical types fast never came; the funding was cut for good reason.

### P-17

2026-10-22 02:09Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c1.md`, "P-17" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c1.md`, "P-17" · by the POSITIONS audit's writer for chunk c1 (Opus), proposed for his review: "Boxing is measured on microGPT-shaped kernels, not on a scalar loop with literals and a `:=` accumulator, which microGPT never runs." leaves. His word was one instruction, carried out: at 2026-09-15T22:34:55.554Z, on the boxing probe that the coordinator reported at 21:42:29.833Z, he said that the test seemed to meet an edge case that the microGPT experiments had not met, float literals parsed from strings, and asked for a fairer and better test; the kernels probe did it (`perf-probes/kernels/REPORT.md`, sections 1 and 2; F-11). The texts until 2026-10-13 told it as history; the rewrite of that day kept it as the rule on what to measure, a standing rule of the coordinator's that he was never asked about, so it goes to the review queue as a drafted item. Its premise was partly false: microGPT's kernels run no such loop, but C4's weight loader does (`parseFloat` in `run-c4/src/FlatData.fss`). The rest kept. Its sources: 2026-09-15T10:42:06.544Z, in his message on the coordinator's 10:14:12.408Z (the measured 6.8 to 8.9 times, with everything boxed): doubles that are not boxed and an array of doubles that the JVM's compiler can optimise go straight onto the priority list, since without them, what are we even doing here; 2026-09-19T18:32:48.384Z, answering fork 1 of the coordinator's array design (18:24:23.475Z: boxed objects or Java `double[]`): arrays must be double arrays for performance, with no question about it, since a high-performance language cannot box them (P-84).

- P-17 **Unboxed doubles and arrays of doubles are required: without them the revival misses its point.** The code generator boxes every number, and boxing is the main cost on microGPT's array kernels (F-11). Boxing is measured on microGPT-shaped kernels, not on a scalar loop with literals and a `:=` accumulator, which microGPT never runs. The storage is P-84's decision; unboxed arithmetic is PLAN phase 6 (P-33).

### P-19

2026-10-22 02:09Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c1.md`, "P-19" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c1.md`, "P-19" · by the POSITIONS audit's writer for chunk c1 (Opus), proposed for his review: "His plan to make the graft-free `clean-ladder` branch `main` is not carried out (F-165)." struck as the state of the project, which F-165 states (`clean-ladder` never replaced `main`), about a plan that his later words replaced: at 2026-08-23T19:13:01.806Z he would still rename the main branch to `clean-ladder`; on 2026-09-23 he put the cleaning in a pass of `main` instead: at 06:02:13.771Z, at a certain point the main branch is cleaned up and committed; at 06:27:28.143Z, he never got to the rename, and he asked whether a later cleanup that cherry-picks the commits that move the work forward is the place to clean it; PLAN parks that cleaner pass of `main` ("Off the path, parked"). The rest kept; the list in `lineage.md` that it cites predates `a4e266faa` and is stale. Its sources: 2026-09-23T05:28:37.640Z, answering the coordinator's boot text of 05:26:14.840Z, which he quotes: the port-graft line is incorrect; find the true facts by archaeology and correct the record; 2026-09-23T06:02:13.771Z, answering the coordinator's 05:39:00.265Z ("Cleaner pass, or now?"), which he quotes: the stale port-graft record in CLAUDE.md is what needs correcting, a cleanup pass of the other files comes once the facts are established, but hold that task; 2026-09-23T06:33:41.521Z, in reply to the coordinator's 06:27:47.426Z on the lineage: the record must not mislead anyone into thinking that the tree is built on the port's graft, and a worker may do the cleanup and commit it, which `a4e266faa` did for twelve files.

- P-19 **The tree is not described as the third-party port's migration grafted on its history.** The files that still say so wait for the lineage cleanup (PLAN, "Off the path, parked"), which `coordinator/lineage.md`, "Files that still repeat it", lists. His plan to make the graft-free `clean-ladder` branch `main` is not carried out (F-165).
```

**What check does not see.** It checks pointers only inside FACTS and POSITIONS, and only for a live target and its quoted words. The lines elsewhere that this proposal makes stale, or that were stale before it, pass. Each entry's "Pointers elsewhere" lists them:
- the `coordinator` skill's `SKILL.md:74` and `:139`, and `references/sources.md:8`, on the section "History he knows (do not re-explain)" (P-16, with the trial's P-18);
- `coordinator/lineage.md`, "Files that still repeat it", which P-19 cites (stale before this proposal);
- F-165, which does not name P-19 (P-19);
- `coordinator/process-engineering/record-rule-draft.md:148`, whose example is P-9's dropped quote (P-9).

## The rules, where they fit badly

- **Rule 0 against rule 6, on P-8's "He has not read ...".** The judgement calls it a remark about himself, which rule 6 strikes. It is his, it is true today, and rule 0 keeps such a sentence. Its second half also acts: it is the weight he gives the designers' record where it speaks, beside the title's "where the designers left no word". I kept it. If he reads it as a remark, it can go with no loss: the profile holds the same (`curator-profile/PROFILE.md:110`), and P-26 holds the weight.
- **Rule 6 on a sentence of P-9.** "The two sources ..." is his account, condensed, so rule 0 would keep it if it were still correct. His later verdict (P-11) narrows its first source, so it is no longer his as it stands (rule 12), and it is a remark. I struck it rather than reword it.
- **Rule 1 against the judgement's rule 2, on P-12's last sentence.** The judgement reads "It comes once walk also takes the static coercions ..." as the coordinator's condition, a default for the queue. The option he took for after the switch-over, item 7's option 2, already joins the two halves, and so do his own words of the same message. I kept the sentence. One reading stays open and is not barred by it: `fortress typecheck` checking walk's programs as soon as the switch-over lands, before walk uses the result.
- **Rule 2 against rule 5, on P-26's "The implementers' later word also outweighs unfinished text."** The judgement reads it as an agent's default for the queue (rule 2). It has no source of his, and rule 5, his word of 2026-10-21, 23:29 UTC, keeps such a text in POSITIONS and makes it a question. Rule 5 is the narrower rule and the later one, so I followed it (P-26, question 1).
- **Rules 3, 2 and 8 together, on P-17's measuring sentence.** His instruction was one test, carried out (rule 3). The standing rule was the coordinator's (rule 2). Its premise was partly false (rule 8). So the sentence leaves POSITIONS, the history keeps the instruction, and the queue gets the rule with its premise corrected (Q-?1).
- **Rule 9 against the judgement, on P-19's cleanup sentence.** The judgement calls the parking of the rest of the cleanup a default. He held the cleanup himself (06:02:13), and the parked line is its PLAN item, so rule 9 keeps it as one short line of what is still to do. The list it cites is stale, but the fix is the list's, in `lineage.md`, not the entry's.
- **Rules 6 and 12 on P-19's `clean-ladder` sentence.** It reads as the state of the project, which F-165 holds. It also names a plan of his that his later words replaced with a pass of `main`. Both rules lead to the strike.
- **Rule 10 and the history.** I quoted his words only where a short answer is the decision: "word", "Agreed.", "So one now and two after the switch." and "Yes, this order and workers are go.". P-9's note also quotes his dictated sentence, since the change is that the entry's quote was not his string. His longer messages are reworded.
- **The brief's "edit none" and the tool.** No strike in this chunk needs another entry's pointer rewritten (`pointers.py 16` lists only the entry itself), so the apply touches only the chunk's own lines.
