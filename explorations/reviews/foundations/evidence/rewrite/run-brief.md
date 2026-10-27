<!-- The run brief that the coordinator gave the clarity workflow run wf_36572c60-a05 on 2026-10-26 through the args.extra field it added (bedc80b01), copied from its scratchpad on 2026-10-27 as evidence of how the run was set up. -->

# This run's own brief: the reasons under thirteen POSITIONS entries, after the foundations review

You are a stage of the clarity workflow (`explorations/coordinator/tools/record-clarity/`): its writer, its fix round, its checker or its judge. Follow your stage's brief there, with the changes below. Where they differ, this brief wins. Change no tracked file. Commit nothing.

## What this run does that the clarity pass does not

- The clarity pass keeps each entry's meaning. This run also changes what the foundations review's judgement says to change: the reason an entry gives, the layer it states that reason in, the dates it ranks by, and the pieces the coordinator lacks to weigh a trade-off. Every other part of an entry keeps its meaning, as the clarity briefs require.
- The judgement is `explorations/reviews/foundations/judgement.md`. Its section 7 is the target: for each entry it lists what the new text must make the coordinator do. Each rewritten entry must produce every behaviour listed for it, and nothing that its sources do not hold.
- The reader that matters most is the coordinating session: after a compaction or a restart, when it plans a batch or a probe, and when it weighs one entry against another (the curator, 2026-10-26 07:48 UTC: "for your correct judgment after compactions and restarts ... we must resolve the potential contradictions in our positions with enough clarity ... so that you know how to weigh the trade-offs"). So each ground stands in its layer, with the context needed to weigh it, and two entries do not contradict each other.
- Not over-engineered: keep each entry as short as the behaviours allow. An entry is read whole at every boot.

## The entries

- Chunk c1: P-26, P-37, P-43, P-42, P-7, P-158.
- Chunk c2: P-33, P-12, P-59, P-17, P-84, P-85, P-58.

P-85 is in the run for one sentence only: the curator's lean of 2026-09-20 (judgement section 2, tenet 7; section 9, item 6), recorded as a lean to confirm, not a decision. Leave the rest of P-85 as it is.

## The sources of the new text

1. The judgement, whole: section 2 (each tenet, its sound reason and its layer, and where its entry misstates), section 3 (when a design of the compiler's prelude binds the one library), section 4 (the bound), section 5 (phase 3's close), section 7 (the target).
2. The curator's words of 2026-10-25 and 2026-10-26: `explorations/conversations/02-phase3-exit-foundations.md`, whole. `python3 explorations/coordinator/curator-profile/show.py TIME` prints any message of his. His goal for the switch-over (04:47 UTC on 10-26) is P-37's reason, in his words. His three layers are his frame (05:25 UTC on 10-26).
3. The evidence the judgement read, where a sentence needs it: `explorations/reviews/foundations/bound-archaeology.md`, `explorations/perf-probes/bound-any-compiled/REPORT.md`, `explorations/reviews/foundations/tenets-evidence.md`, `explorations/reviews/foundations/prelude-lens.md`.
4. Each entry's own provenance: `entries.py N` and `facts-extract.sh 'history:P-N'`.

Do not open `explorations/reviews/foundations/evidence/` or anything under it: it holds a test of this run's text.

## The rules for a reason

- **Whose reason.** A "Why:" holds the curator's reason or a reason he took. Where a new ground comes from the judgement, write it as the entry's ground, and mark each such sentence in `proposals.md` as "from the judgement, for his yes": he sees every new text before it enters the record. Never put the judgement's words in his mouth; keep his own words his.
- **The three layers.** Name each ground's layer in plain words: the language (the specification, the Working Draft, the papers, the 2012 Types chapter, and the team's library as their statement of the language's library); the team's implementation on the JVM (the compiled checker, the code generator, the class loader, the run time, the compiler's prelude, and walk); and Java interoperability. Define the three once, in P-26, and point to P-26 from the others. Do not write "L1", "L2" or "L3". A ground in one layer does not by itself decide a question in another.
- **"Later" is a date.** Where an entry ranks the team's sources, give the year of each ground it ranks.
- **One home for each rule.** The general rule for counting the team's code as the team's word on the language belongs in P-26 (section 7, P-26, behaviour 3). Its application to the compiler's prelude, when a prelude design binds the one library (section 3, with its three sharpenings), belongs in P-37, which points to P-26. P-43 and P-158 point to them and do not restate them.
- **Specialisation.** Use one word for each of the two things the record calls specialisation (section 2, tenet 2, point (c); section 7, P-26, behaviour 6): an overload for one instantiation chosen at run time (the language), and a class made for each instantiation (the implementation).
- **Measured against unmeasured.** Say which grounds were measured and which are read or unmeasured, as the judgement does (P-37's premise; P-12's size; P-59's premise; P-84's way A4).

## The curator's open answers, and the defaults you write under

At this writing four answers of his are open. Write each entry under its default, and list in `proposals.md`, per entry, each sentence that depends on an open answer and what it would say otherwise.

1. Phase 3 closes with climb batch 22c and its four rungs: row 816's repair (P-158); row 782, the export check reading top-level operators (P-155 read to cover it); `List`'s two imports, `CovariantCollection` and `OneShotFlag`; the bound `Any` for `fortress compile` (`Shell.java:372`). Its exit: the distance 0 over the fourteen components, under the compile command's own setting, with operators and `abstract` read the team's way. The fourteen are the distance stage's twelve (`explorations/coordinator/tools/distance/run.sh`, lines 85 to 87) and `List`'s two imports; the judgement writes "thirteen", a miscount, so write "fourteen". Default: yes. (P-33, P-42)
2. The 40 other library components block the step at which walk runs the checker (P-12), not the switch-over; each is cleared before that step or before the first program that needs it. Default: yes. (P-33, P-12)
3. Three one-word answers: drop "functions" from P-42; strike P-26's sentence "The implementers' later word also outweighs unfinished text."; move P-43's two "Why" sentences to history and write the language's grounds in their place. Defaults: yes to all three. (P-26, P-42, P-43)
4. His lean of 2026-09-20 for the class loader as the way to store an `RR64` vector as a `double[]`, recorded under P-85 as a lean to confirm. Default: record it. (P-85, and a pointer from P-84 if P-84 needs it)

P-58's informed yes is also owed before climb batch 23 (section 2, tenet 8). P-58 stands as decided; its text states the layer and the window in which its choice is cheap to undo.

## For the checker and the judge

- Fidelity here is checked against two things: against the entry as the record holds it, for every part that this run does not change; and against the judgement's section 7 and the sources above, for the parts it changes. A new ground that the judgement or his words do not hold is a failure. A behaviour of section 7 that the text does not produce is a failure.
- A sentence marked "from the judgement, for his yes" is not a failure for not being his words; a sentence that presents a judgement's ground as his reason is.
- The judge applies an entry only if it meets both checks and the second cold reader reads it the way section 7 intends; otherwise it holds it with its question. Nothing enters the record from this run: the coordinator runs a trap test on the applied texts and shows them to the curator first.
