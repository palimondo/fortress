<!-- The clarity workflow's check of chunk p8 (P-95 to P-98, P-102, P-103, P-124, P-125, P-150): each rewritten entry against the record and the curator's words, the cold reader's answers against the source meaning, and each failure classed with a proposed fix. -->

# Check of chunk p8, positions

Checker: one Opus session, 2026-10-22. Read: `proposals.md`, `clean.txt`, `proposals.apply` (its entry lines equal `proposals.md`'s and `clean.txt`'s), `concepts.md` and `cold-read.md` in this folder; `entries.py` for the nine entries; the audit's evidence (`positions-audit/full/evidence/P-95.md` to `P-98.md`, `P-102.md`, `P-103.md`, `P-124.md`, `P-125.md`, `judgement-c7.md`, `judgement-c8.md`, `corrections-c7.md`, `corrections-c8.md`, `takeaway-c7.md`, `takeaway-c8.md`; `positions-audit/trial/evidence/P-150.md`, `judgement.md`, `corrections.md`); his messages by `show.py`; his page comment of 2026-10-06 17:28 in the transcript (`fe616d40-...until-2026-10-08T15-41.jsonl.parts/003.jsonl:7798`); and the tree where an entry names it (`Specification/basic/trait-parameters.tex`, `types-vals-vars.tex`, `appendices/changes.tex`, `Library/FortressLibrary.fsi`, `CLIMB-BATCH-7.md` item 22, `process-engineering/fresh-jvm-commands.md`, the `fortress-repo` skill's `SKILL.md`, `specification.md`, `tests-running.md`, `exploring.md`). All times UTC.

## Summary

| Entry | Fidelity | Comprehension | Failures, by class |
|---|---|---|---|
| P-95 | holds | gaps | wording 1; concepts 2 (in `concepts.md`) |
| P-96 | holds | gaps | wording 3; a skill disagreement for the coordinator |
| P-97 | one shift, settled | gaps | uncertain fidelity 1 (settled); wording 3; concept 1 (in `concepts.md`) |
| P-98 | holds | gaps | wording 1; concepts 2 (not in `concepts.md`) |
| P-102 | holds | gaps | wording 1; concept 1 (not in `concepts.md`) |
| P-103 | one broadening | gaps | wording 2 |
| P-124 | holds | one gap | wording 1 |
| P-125 | holds | matches | pass |
| P-150 | one overreach, settled | gaps | uncertain fidelity 1 (settled); wording 1; concept 1 (not in `concepts.md`) |

## P-95

**Fidelity.** Holds. Each sentence matches its source.
- "When the revival changes the language, it updates `Specification/` with the change, so that the text and the implementation do not disagree": his 2026-09-24T07:03:57.849Z, "our plan needs to update the spec with the change that we do ... so that there is no like open discrepancy between the spec and our implementation". It settles which side gives way, as `takeaway-c7.md` asked.
- The route C gloss matches P-43, F-46 and `changes.tex:4119-4149` (the 2012 patent applications, a chain of instantiations, the nested tower).
- "never touched" stays with the audit's question 1, as the brief says.
- One mismatch of scope, which the rewrite makes. The title says "Every change to the specification", and the body now opens with "When the revival changes the language". So "Every change takes the revision form" can read as every edit of the text, which is wider than his "the change that we do".

**Comprehension.** The reader's points:
- "Forest rule" and the route letters: concepts it lacked. `concepts.md` already lists "Route A and route C" and defines the forest rule there; I agree with it. The reader was barred from the patents note, and the entry's own gloss was enough to act on.
- A correction that changes no meaning: the reader could not tell whether it needs an Appendix I entry. This follows from the mismatch above.
- F-46 and P-43 "only cited": the entry gives F-46 a few words, which is the brief's rule. No failure.

**Failures.**
1. Wording. Change "Every change takes the revision form (P-96 gives its parts)." to "Every such change takes the revision form (P-96 gives its parts)." This ties the form to the body's scope, which his words hold. Keep the title, since five lines elsewhere cite it word for word. Nothing of his settles a correction that changes no meaning. The team's own corrections were edited in place with no mark (`reviews/spec-change-form.md`, section 5, "For corrections"). The skill's "Every change of the text has the four parts" (`specification.md`, "Changing the text") is wider. If the coordinator wants that case decided, it is a question for him, not for this entry.
2. Concepts: route A and route C, and the forest rule, as `concepts.md` proposes.

## P-96

**Fidelity.** Holds.
- The layers, the callout, Appendix I, the front matter and the repository document: his "S1 — 1, teams’ way." (2026-09-26T07:48:29.318Z), which took option 1 of the coordinator's 01:56:02.857Z text.
- The citation name: his "Option 1, agreed." (09:19:58.593Z).
- The decision named in each Appendix I entry: item 23 (a) in his 2026-09-29T17:44:02.015Z message.
- "The 1.0 release of 2008 and the working draft of 2009" matches `spec-change-form.md`, section 5.
- "What a return to route C would mean for it" is what he took ("route C" in option 1). It is also what the tree does: every one of Appendix I's 41 entries has a "Route C" item, most often "The same under route C." (`P-96.md`, section 2).

**Comprehension.** The reader's points:
- Route C for a change that has nothing to do with numbers. The entry is right, and the tree settles it as above. The disagreement is in the skill. `specification.md`, item 1, asks for "what a reversal to the alternative not taken would need", and his option and Appendix I say route C. This is for the skill's writer, not this entry (see "For the coordinator").
- "S1 form": a handle of a past conversation (the S1 question of the coordinator's list of 2026-09-26). No skill defines it (grep of `.claude/skills/` for "S1 form"). The entry keeps it because P-80 and P-147 still say "the S1 form (P-96)".
- `Specification-1.0-frozen/` against "the Working Draft of February 2011": the pointer "(F-163 says what the copy holds)" did not resolve it. The reader found the answer in the skill.
- The entry's list of an Appendix I entry's contents reads as complete. `specification.md` asks for more: the affected sections, the change and its effect, with each departure and its ledger row. The four contents in the entry are his option. The rest is the skill's, and the entry's last sentence points to it. But a reader of the entry alone would leave out the effect.

**Failures.**
1. Wording. Give the pointer's content: "Citations call the unrevised copy, `Specification-1.0-frozen/`, the Working Draft of February 2011: the copy is that draft byte for byte, and only its `fortress.1.0.pdf` is the 1.0 release (F-163)." Source: F-163's title.
2. Wording. Make the last sentence say that the skill's list is fuller: "The `fortress-repo` skill's `references/specification.md` gives each part in full, including what else an Appendix I entry holds."
3. Wording, with `concepts.md`'s plan. Repoint P-80 and P-147 to "the revision form (P-96)", then drop "also called the S1 form". Until that happens, the alias is the lesser harm. The reader called it harmless.

## P-97

**Fidelity.** One shift, settled.
- The library's shapes, "Not allowed" and the rule stated once: his "S2 yes, take the verdicts for rung S" (2026-09-26T08:07:48.939Z), to the coordinator's 08:00:01.931Z.
- The calculi: his "Agreed." (18:59:23.595Z), to option 1.
- "The Working Draft offered such examples as legal" matches `trait-parameters.tex:404-407`.
- The shift. HEAD says "The covariance example's callout adds that ...". The decision was option 2 of three at 09:25:29.526Z: one sentence added to the callout, against "record only" and "specify it". The rewrite says that the example "gets a callout: ...". That drops the fact that the example is refused like the others and that the decision was the one sentence. The tree settles it. The covariance declaration stands marked "Not allowed!", beside the library's widening function, and `\revision{revival-covariance}` carries the sentence (`trait-parameters.tex:409-454`).

**Comprehension.** The reader's points:
- Whether the covariance example is also rewritten and marked: it is, as above.
- "The rule is stated once, in the two parts of Luchangco's 2012 Types chapter": two readings, and the wrong one is natural. The source means that the revised specification states the rule once, in the chapter's two-part form, in two places: `types-vals-vars.tex:234-262` (which instantiations exclude each other) and `traits.tex:379-398` (the rule on declarations) (`P-97.md`, section 2).
- "Luchangco's 2012 Types chapter": the skill names it `Documentation/Specification/Prose/Language/types.tick` (`specification.md`, line 7), not by author and year. The reader guessed right.
- "The type group's later design": the skill defines the type group (`exploring.md`, line 16). The document is the same Types chapter (F-166; the callout's own words, "the team's later Types chapter, Luchangco, 2012").
- Which instantiations exclude each other: a concept the reader lacked. `concepts.md` already proposes adding the operator-argument exception and the name to the core's bullet "Traits and objects, no classes". I agree.
- Whether it is built: the entry has no state line. HEAD's "Built." was cut on 2026-10-13 because F-167 builds it. A reader of the entry cannot tell.
- How a "Not allowed" original fares in `ant testSpecData`: no extracted example holds one (grep of `SpecData/` for "not allowed" finds none). The question is outside this entry.

**Failures.**
1. Uncertain fidelity, settled by `trait-parameters.tex:409-454`. Wording: "The covariance example, a trait that extends other instantiations of itself, is refused in the same way, and its callout adds one sentence: the type group's later design, in the same Types chapter, declares variance with a `covariant` modifier, which neither walk nor the compiled path implements (gap-ledger row 404 records the gap)."
2. Wording: "The specification states the rule once, in the two-part form of the Types chapter of the team's 2012 restart, by Luchangco (`Documentation/Specification/Prose/Language/types.tick`; P-25): the chapter on types says which instantiations exclude each other, and the chapter on traits that a declaration may not extend two that do."
3. Wording: end the entry with "Built." It was true when cut and is true now (F-167; the tree above). It is also the only way a reader of the entry can tell. `record.md` lists no FACTS entries in a POSITIONS entry, so "Built." alone, as P-124 and P-125 have it.
4. Concept: instantiation exclusion and its exception, in the `fortress-repo` core, as `concepts.md` proposes.

## P-98

**Fidelity.** Holds.
- The parent, the api and the component, and the five members: option (b) of item 22 (`CLIMB-BATCH-7.md:46-56`) and the tree (`FortressLibrary.fsi:121-132`).
- "Why: it is the library's own device, which its other ordered types use": the ask's "The library's own device for a partial order that also has `MIN` and `MAX`", which his 17:44:02 restates ("follows other precedent in the library"). The tree bears out "its other ordered types": `StandardTotalOrder` extends `StandardMinMax` (`FortressLibrary.fsi:229-230`), and so do `RR64`, `QQ` and `RR32`.
- "It stands and blocks no work": his "the default stays, it doesn't block the run".
- One point stays thin, as the audit found. His 17:44:02 makes the explanation conditional on the batch ("If it goes into this batch ... if it doesn't go into this batch, we should go over it one more time later"). The entry states it plainly, as HEAD did. PLAN.md:156-158 reads it the same way. No change.

**Comprehension.** The reader's points:
- "So that it has `MIN` and `MAX`": two readings, since the body says that the type restates `MIN` and `MAX` by hand. The title is HEAD's. It comes from the ask's heading, "`TotalComparison` gets back `MIN` and `MAX` by extending `StandardMinMax`", which meant: as a `StandardMinMax`, the bound that `BIG MIN` and `BIG MAX` require (`FortressLibrary.fsi:2013-2046`). The body's third sentence says the effect; the title should say it.
- `TotalComparison`, `StandardMinMax`, `MINMAX`: library concepts the reader lacked. `concepts.md` says that P-98 defines the `StandardMinMax` parent itself, but the entry defines none of them. `TotalComparison` is also in P-57, so it is not this entry's alone.
- "The coordinator", "Pavol", "PLAN": concepts the reader lacked. It guessed them right from `CLAUDE.md` and "he".

**Failures.**
1. Wording. Title: "`TotalComparison` extends `StandardMinMax[\TotalComparison\]`, so that the library's `BIG MIN` and `BIG MAX` work over total comparisons." The body's third sentence can then go, or stay as "Before, they failed under walk (gap-ledger row 461)." Source: item 22's measured cost and option (b), "Row 461 closes".
2. Concept: `TotalComparison` (the result type of a comparison in a total order: `LessThan`, `EqualTo`, `GreaterThan`) and `StandardMinMax` (the trait that gives `MIN`, `MAX` and `MINMAX`, and the bound of the big operators). Define them in the area part `references/library.md`, since P-57 also uses `TotalComparison`.
3. Concept: the curator (Pavol), the coordinator, and the record's files with their paths (`explorations/coordinator/PLAN.md`, `POSITIONS.md`, `FACTS.md`). Define them in the short orientation that replaces the revival part.

## P-102

**Fidelity.** Holds.
- The steps: his 2026-09-17T16:50:18.180Z, "The workers should be writing the failing test, verifying that it is failing, doing the fix, and proving that it is working."
- "Must pass when the work lands; need not pass after every edit": the same message. He answered the coordinator's question, which he quoted: per edit, or "four edits land, then the suite is checked". He wrote "So the reinterpretation as per batch is fully in line with this." "When the work lands" is a fair rewording of per landed batch.
- The reason: the same message, against one-off validation scripts.
- Source code only: his page comments of 2026-10-06. At 17:28 he refused the list "Java, Scala, the grammars and the library" as "overly specific long and not that clarifying" (`003.jsonl:7798`, read).
- "Or of documentation" is the skill's word (`SKILL.md:160`), not his. It follows from "source code", whose examples in his 17:28 are Java, Scala and the library in Fortress. It is not a broadening.

**Comprehension.** The reader's points:
- "The full suite must pass": which suite? There are three suites in the gate today: `ant testFast` and `ant testSystem`, and `ant testSpecData`, which P-124 added to the gate. The source's "full suite" of 2026-09-17 predates P-124.
- "Source code": build files, scripts, `Fortress.ast`? He set the scope at "source code" with no list on purpose (17:28). He was unsure only of the grammars ("I wouldn't know how to write failing test for grammars"). The skill's term "original tree" is defined (`SKILL.md:16`); "source code" is not.
- An edit that no test can observe (a refactor, a speed change): the sources are silent, as `takeaway-c8.md` found. Not a failure of the entry.

**Failures.**
1. Wording: "The gate's suites, `ant testFast`, `ant testSystem` and `ant testSpecData` (P-124), must pass when the work lands; they need not pass after every edit." This names what "the full suite" is today, and adds nothing that P-124 does not already require.
2. Concept: "source code in the original tree", in the `fortress-repo` core, next to "original tree". By his 17:28 word, the definition cannot be a list. It can say what source code is not: the specification, documentation and the record. If the grammars (`parser/*.rats`), `build.xml` or `Fortress.ast` must be settled, that is a question for him, not a rewording.

## P-103

**Fidelity.** One broadening.
- Pass or fail, and values checked inside the test: his 2026-09-29T18:52:49.920Z, "Those values must be part of the test.", and his 2026-10-02T15:48:05.965Z.
- The two checks: the coordinator's gloss, true of the tree (`P-103.md`, section 2).
- "Does not count": his 19:03:33.775Z.
- The reason: his 15:48:05, word for word in substance.
- The broadening. The rewrite says "neither they nor a comparison of a test's printed output are proposed to the curator again". HEAD said "none of it", which meant what a test prints beyond its checks, and the expected-output files. What he refused was two offers, both about output beyond the test's checks:
  - the "before" outputs of the interpreter tests, taken once per base and compared (the coordinator's 18:07:00.343Z, quoted in his 18:52:49);
  - expected-output files (15:40:56.635Z).

  "A comparison of a test's printed output" also covers a `run_out_equals` key, which is literally such a comparison and which the entry itself requires. It also covers the gate's own comparisons, which `SKILL.md:161` keeps as exceptions. The reader saw the first reading.

**Comprehension.** The reader's points:
- The two readings of "a comparison", as above.
- The skill's exceptions: `SKILL.md:161` already frames them ("Do not compare the output of a whole run of tests with a saved copy ... The gate's comparisons, and a comparison of outputs that your brief asks for, are the exceptions"). With the fix below, the entry and the skill agree. The masks in `gate.md`, "Comparing with an earlier run", stay the coordinator's note in `proposals.md`.
- "Its output needs no control": "control" is his word, and the reader found it awkward.

**Failures.**
1. Wording: "So no expected-output files are added, and neither they nor a comparison of what a test prints beyond its checks with an earlier run are proposed to the curator again." Sources: the two offers above.
2. Wording: "Why: when the suite's designers let a test pass without a further check, what it prints need not be checked." His "it is not needed to control its outputs" (15:48:05), in plain words.

## P-124

**Fidelity.** Holds.
- His "Yep. Option one." (2026-10-04T20:27:30.337Z) took option 1 of the coordinator's 20:24:58.453Z. Option 2 was a list of known red names; option 3 was "Respell the five examples ... a text change in the revision form, to cover a gap in walk". Neither was taken.
- The general form stays with the audit's question 1.
- "The gate fails if any of them fails" matches `gate.md`, step 4, and `gate_compare`.
- `proposals.md`'s "Meaning" says that the entry "now says ... what kind of respelling is refused: a change of the example to get around a gap in walk". The clean entry does not say that. It says only "not respelled to suit walk".

**Comprehension.** The reader's points:
- "Not respelled to suit walk" against P-97, which does revise examples. The reader drew the line rightly, but the entry does not. This is the gap that the "Meaning" line says was closed.
- Whether a new example joins the 130, and how a "Not allowed" original is handled: about the extraction, not this decision. No extracted example is a "Not allowed" one (grep of `SpecData/`).
- The compiled path: the reader read it as intended.

**Failures.**
1. Wording, in option 3's own words: "When an example fails, the implementation is fixed: the example is not respelled to get around a gap in walk, and no list of examples allowed to fail is kept." This keeps P-97's revisions, which follow a decision of the language, outside the ban, and it makes the "Meaning" line true.

## P-125

**Fidelity.** Holds.
- The reason and the rule for a test that parallelism makes fail: his 2026-10-08T15:53:33.559Z, "if parallelism makes something flaky, then the test is written wrong. Something needs to be atomic.", and the blind spot.
- The pin at four: his "So yeah, pin it to four. That's good." (18:11:36.440Z).
- The two suites: `build.xml:1186` and `:1431`.
- The two fixes of `takeaway-c8.md` ("on every run or only on some"; "running at one thread") are in.

**Comprehension.** Matches. The reader's extension to `harness-one.sh` and `junit.sh` comes from the skill and is true (`harness-one.sh:36`, `junit.sh:18`). The entry does not claim it. `ant testSpecData`'s thread count is the coordinator's note in `proposals.md`.

**Failures.** None. Pass.

## P-150

**Fidelity.** One overreach, settled.
- The title, the checker as the place for the speed work, and "not taken up again unless something significant changes": his 2026-10-16T09:15:00.365Z, "you did some research and why it is not worth doing" and "so that we do not reattempt it unless something significant changes", with the coordinator's 08:56:38.403Z conclusion.
- The definition matches the coordinator's 07:40:53.963Z.
- The overreach. The rewrite says "a measurement over the workers' transcripts found that a resident compiler would save too little of their time to be worth building". The measurement found less than that:
  - It counted only the Fortress commands that the workers typed (6.4 % of their time, start-up at most 1.8 %).
  - It left the suites, builds and stages unexamined: "What runs inside (b) and (c) was not examined" (`fresh-jvm-commands.md:11`), and "If a resident compiler could serve those, the bound would change by a factor I did not measure" (`:188`).
  - "Not worth building" is the coordinator's conclusion from it, which he took at 09:15.

  The parenthetical "the suites already run in one JVM each" then reads as if the suites were covered. HEAD had the same claim with "(F-234)" as its evidence. The rewrite makes the measurement its subject, which a reader takes as broader. His decision stands either way.
- "The suites already run in one JVM each" is F-234's wording ("The suites already run each suite in one JVM"), but it is not true of the tree as the skill describes it. `ant testFast` runs four tracks and `ant testSystem` four shards, each a JVM (`tests-running.md`, lines 3-7). The point of the source is that a suite runs many tests in each JVM, not one JVM per test. That answers his premise at 07:39:59.688Z, that each test starts the compiler fresh.

**Comprehension.** The reader's points:
- "Rung": a concept it lacked. Only the `coordinator` skill defines it (`SKILL.md:23`: "A rung is one task of it, with its own worker and worktree"). Six other lines of POSITIONS use it.
- "One JVM each" against `tests-running.md`: as above. The reader's own reading was right.
- "Unless something significant changes": his own words. No failure.

**Failures.**
1. Uncertain fidelity, settled by `fresh-jvm-commands.md:11` and `:188`. Wording for the reason: "Why: a measurement over the workers' transcripts found that the Fortress commands that a worker runs one at a time, each in a fresh JVM, take a small share of its time, so a resident compiler would save too little to be worth building (F-234). The suites already run many tests in each of their JVMs, and what a resident compiler could save inside the suites and builds was not measured."
2. Concept: "rung", for every worker: the short orientation, or the `fortress-repo` core, since a worker's brief is often a rung's section of a batch record.

## For the coordinator

These are outside the nine entries' text, or for another pass.
- `specification.md`, item 1, third bullet, asks for "what a reversal to the alternative not taken would need". P-96, his option 1 and every Appendix I entry say route C. The skill's writer should say route C there, or say why it is wider.
- F-234's "The suites already run each suite in one JVM" has the same fault as P-150's parenthetical. It is for the facts pass.
- `concepts.md` lacks three concepts that the cold read shows a worker needs:
  - "rung" (P-150);
  - the curator, the coordinator and the record's files (P-98);
  - "source code in the original tree" (P-102).

  Its line on P-98 ("defines ... the library's `StandardMinMax` parent of `TotalComparison` itself") is not borne out: the entry defines neither type, and P-57 uses `TotalComparison` too.
- `record.md`, "What an entry is", says a POSITIONS entry "lists no FACTS entries". The rewrite adds pointers to F-46 (P-95), F-163 (P-96) and F-114 (P-124), each with a few words, as the writer's brief allows. HEAD already had F-77, F-234 and others. The coordinator may want one rule.
- `proposals.md`'s "Meaning" line for P-124 claims a change that the clean entry does not make. P-124's failure 1 makes it true.

## His quotes

HIS 2026-09-24T07:03:57.849Z | Also, I think our plan needs to update the spec with the change that we do and, and somehow properly record why, why we decided that way, so that there is no like open discrepancy between the spec and our implementation that would be confusing to people.
HIS 2026-09-24T14:41:40.798Z | Agreed. Route A it is.
HIS 2026-09-26T07:48:29.318Z | S1 — 1, teams’ way.
HIS 2026-09-26T09:19:58.593Z | Option 1, agreed.
HIS 2026-09-26T08:07:48.939Z | S2 yes, take the verdicts for rung S
HIS 2026-09-26T09:29:33.563Z | Option 2, agreed.
HIS 2026-09-26T18:59:23.595Z | Agreed.
HIS 2026-09-29T17:44:02.015Z | You're saying that the recommendation B is like an obvious choice that follows other precedent in the library.
HIS 2026-09-29T17:44:02.015Z | If it goes into this batch and item 23, if it doesn't go into this batch, we should go over it one more time later where you explain it to me in more detail when I have more energy.
HIS 2026-09-29T17:44:02.015Z | So just 22 is something I need to understand better, but the default stays, it doesn't block the run.
HIS 2026-09-17T16:50:18.180Z | So the reinterpretation as per batch is fully in line with this.
HIS 2026-09-17T16:50:18.180Z | This was meant as a rule. to eliminate some kind of one-off validation scripts that are then not part of the future builds.
HIS 2026-09-17T16:50:18.180Z | The workers should be writing the failing test, verifying that it is failing, doing the fix, and proving that it is working.
HIS 2026-09-29T18:52:49.920Z | Those values must be part of the test.
HIS 2026-09-29T19:03:33.775Z | Because the other interpretation is that the test suite is not caring about them printing different things because it does not fucking matter.
HIS 2026-10-02T15:48:05.965Z | When the designers of the test suite decided that it passes without any additional check, it is not needed to control its outputs.
HIS 2026-10-04T20:27:30.337Z | Yep. Option one.
HIS 2026-10-08T15:53:33.559Z | if if if, if parallelism makes something flaky, then the test is written wrong. Something needs to be atomic.
HIS 2026-10-08T18:11:36.440Z | So yeah, pin it to four. That's good.
HIS 2026-10-16T07:39:59.688Z | But each time we are compiling one of those tests from test suite, we are running the Fortress compiler fresh.
HIS 2026-10-16T09:15:00.365Z | Like, you did some research and why it is not worth doing.
HIS 2026-10-16T09:15:00.365Z | This feels like something that should be recorded so that we do not reattempt it unless something significant changes.
PAGE 2026-10-06T17:28 (003.jsonl:7798) | I wouldn’t know how to write failing test for grammars. Couldn’t they just stay with the wake source code like what is editing Java, Scala and library which is in Fortress, add to the rule? like it’s overly specific long and not that clarifying in my mind
