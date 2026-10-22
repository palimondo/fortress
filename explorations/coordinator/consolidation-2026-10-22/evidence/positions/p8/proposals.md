<!-- The clarity pass, chunk p8 of the POSITIONS consolidation of 2026-10-22: nine entries (P-95 to P-98, P-102, P-103, P-124, P-125, P-150) rewritten so that a reader without the conversation can tell what the curator decided, each with its change of meaning, its sources and its questions, after a second round from the cold read and the check. -->

# The clarity pass, chunk p8

Each entry starts from its text in `POSITIONS.md` at HEAD, which the audit corrected. The sources are the audit's evidence: the scout's report `P-N.md` and the chunk's `judgement-cN.md`, `corrections-cN.md` and `takeaway-cN.md`, in `explorations/coordinator/positions-audit/full/evidence/` (P-150's in `positions-audit/trial/evidence/`). A time is the curator's message, in UTC. The second round fixed each failure of `check.md` and each reading that `cold-read.md` found ambiguous. `proposals.apply` ran on a scratch clone of the record at `30ee7ae4b` with `record.py apply --root`, and `record.py check --base HEAD` found no failure and refreshed no pointer words. Concepts that every worker needs are in `concepts.md`.

The nine entries hold 3,749 characters at HEAD and 6,733 here. The growth is the definitions, the named files and suites, the reasons after "Why:", the pointers' words, and the second round's limits. P-97 (1,164), P-96 (979), P-98 (785), P-150 (753), P-102 (704), P-95 (683), P-103 (648) and P-125 (609) stay over 600. P-97 and P-96 are long because each names the files and the parts that its cold reader could not find.

Pointers by title: `.claude/skills/fortress-repo/references/sources.md` and the climb-batch records quote the old titles of P-96, P-97 and P-124. They are provenance and records of their day, and need nothing. `review-queue.md`, item 109's "Home" line, quotes P-98's old title ("... so that it has `MIN` and ..."), which `record.py` does not rewrite: see "For the coordinator".

## P-95

> - P-95 **Every change to the specification is recorded with its reason.** When the revival changes the language, it updates `Specification/` with the change, so that the text and the implementation do not disagree. The original text and the reasoning are kept, so that route C stays open. Route C is the design that P-43 set aside: a nested number tower, under the forest rule of the team's 2012 patent applications (F-46 gives what a return to it would need). Every such change takes the revision form (P-96 gives its parts). The unrevised copy, `Specification-1.0-frozen/`, is never touched. Why: an open disagreement between the text and the implementation would confuse a reader.

Meaning: unchanged. The audit's cold reader could not tell which side gives way when the text and the implementation disagree (`takeaway-c7.md`, "P-95"). His words settle it: the specification is updated with the revival's change. So the second sentence now says so, and his purpose, no open disagreement to confuse a reader, stays as the reason. The general clause "No discrepancy ... stays open" read wider than his words, which tie it to the revival's own changes; the skill's `references/specification.md`, "When the text and an implementation disagree", covers the other cases. Second round: "Every such change" ties the revision form to the body's scope, the revival's changes of the language, so that the sentence no longer reads as every edit of the text (`check.md`, "P-95", failure 1). The title stays, since other lines cite it word for word.

Sources:
- The title, the update of the text, the original and the reasoning kept, route C open, and the reason: his message of 2026-09-24T07:03:57.849Z, "our plan needs to update the spec with the change that we do and ... properly record why ... so that there is no like open discrepancy between the spec and our implementation that would be confusing to people. We need to preserve the original historic record ... and preserve the option to go the route C" (`P-95.md`, "His quotes"; `judgement-c7.md`, "P-95").
- What route C is: P-43 and F-46, and `Specification/appendices/changes.tex`, "Route C, the alternative not taken". The gloss "the way back to the patents' forest rule" was the coordinator's, and fair (`judgement-c7.md`).
- "Every such change takes the revision form": his S1 choice, P-96, for "the change that we do". "Revision form" is the `fortress-repo` skill's name for it (`references/specification.md`).
- "The unrevised copy ... is never touched": the coordinator's clause, which he took for one rung (question 1). The tree keeps it: `git diff --stat 201834fa8 HEAD -- Specification-1.0-frozen` is empty (`P-95.md`, section 2).

Question for the curator (carried from the audit, `corrections-c7.md`, "P-95", question 1; the wording is kept until he answers):
1. P-95 says that `Specification-1.0-frozen/` is never touched. You agreed to it for the specification rung of climb batch 4 ("the frozen copy untouched", 2026-09-24, 14:36 UTC). The coordinator made it a standing rule, which fits your wish to keep the original record. Is it your standing rule? Confirm it, or strike it.

Note for the coordinator (`check.md`, "P-95"): nothing of his settles whether a correction of the text that changes no meaning, such as a typo, takes the revision form. The team edited its own corrections in place with no mark (`reviews/spec-change-form.md`, section 5, "For corrections"); the skill's `specification.md`, "Changing the text", says that every change has the four parts. The entry now claims only the revival's changes of the language. If the case must be decided, it is a question for the curator.

## P-96

> - P-96 **A change of the specification is shown in layers, as the team showed its own changes in the 1.0 release of 2008 and in the working draft of 2009.** This form is the revision form; P-80 and P-147 call it the S1 form. A callout that prints in every build marks each changed passage; a `\note` will not do, since a release build hides it. Appendix I's revival section has an entry for each change: its reason, its original text, what a return to route C would mean for it (P-95 says what route C is), and the decision that it follows. The front matter has one paragraph on the revision, and a document in the repository holds the full reasoning. Citations call the unrevised copy, `Specification-1.0-frozen/`, the Working Draft of February 2011: the copy is that draft byte for byte, and only its `fortress.1.0.pdf` is the 1.0 release (F-163). The `fortress-repo` skill's `references/specification.md` gives each part in full, including what else an Appendix I entry holds.

Meaning: unchanged. The cold reader could not tell how 1.0, the 2009 draft, the February 2011 draft and `Specification-1.0-frozen/` relate, or which is the original text (`takeaway-c7.md`, "P-96"). The entry now dates the team's two layered revisions and puts the copy's path beside its citation name, as the ask that he took did. Second round (`check.md`, "P-96"): the citation sentence says what the copy is, from F-163's title, where a bare pointer did not resolve it for the reader; the old name "S1 form" is tied to the two entries that still use it, since no skill defines it; and the last sentence says that the skill's list of an Appendix I entry's contents is fuller than the entry's, so that a reader of the entry alone does not leave out the change's effect.

Sources:
- The layers, the callout, Appendix I, the front matter and the repository document: his "S1 — 1, teams’ way." of 2026-09-26T07:48:29.318Z, to option 1 of the coordinator's 01:56:02.857Z: "a labelled mark at each changed passage that prints in every build, a revival section in Appendix I with the reason, the original sentences and route C, a paragraph in the front matter, and the full reasoning in a repository document". "Not a `\note`" is from the same text: a `\note` "would also vanish in a release build" (`judgement-c7.md`, "P-96").
- "The 1.0 release of 2008 and the working draft of 2009": `explorations/reviews/spec-change-form.md`, section 5: a front-matter statement and Appendix F in the 1.0 release, notes at the passage and the internal appendix in the 2009 draft.
- "What a return to route C would mean for it": the option's "route C". Each of Appendix I's 41 entries has a "Route C" item, most often "The same under route C." (`Specification/appendices/changes.tex`; `P-96.md`, section 2).
- "The decision that it follows": his item 23, option (a), in 2026-09-29T17:44:02.015Z, to the coordinator's 15:53:50.678Z: each entry names its decision.
- The citation name: his "Option 1, agreed." of 2026-09-26T09:19:58.593Z, to the coordinator's 09:08:39.457Z, which named the copy by its path and called it the Working Draft of February 2011. "The copy is that draft byte for byte, and only its `fortress.1.0.pdf` is the 1.0 release": F-163's title.
- "This form is the revision form; P-80 and P-147 call it the S1 form": the skill's name (`references/specification.md`, "Changing the text: the revision form"). "S1" was the label of the coordinator's question of 2026-09-26; P-80 and P-147 still say "the S1 form (P-96)" (`concepts.md`).
- The pointer to the skill, and "including what else an Appendix I entry holds": the coordinator's; `specification.md`, item 1, also asks for the affected sections, the change and its effect, with each departure and its ledger row.

Questions for the curator: none.

Note for the coordinator (`check.md`, "For the coordinator"): `specification.md`, item 1, asks for "what a reversal to the alternative not taken would need", where his option 1, this entry and every Appendix I entry say route C. The cold reader could not tell which a change unrelated to numbers needs. The skill's writer should say route C there, or say why it is wider. When P-80 and P-147 say "the revision form (P-96)", P-96's clause on the S1 form can go.

## P-97

> - P-97 **The specification's examples that break the exclusion rule take the library's shapes, and each original stays, marked "Not allowed".** The Working Draft offered such examples as legal. Each now shows the shape that the library uses for the same thing, with the original beside it under the specification's own mark, "Not allowed". The specification states the rule, which it calls instantiation exclusion, once, in the two parts of Luchangco's Types chapter of 2012 (`Documentation/Specification/Prose/Language/types.tick`; P-25): `Specification/basic/types-vals-vars.tex` says which instantiations exclude each other, and `basic/traits.tex` says that a declaration may not extend two that do. The covariance example, a trait that extends other instantiations of itself, is rewritten and marked in the same way. Its callout adds one sentence: the type group's later design, in the same Types chapter, declares variance with a `covariant` modifier, which neither walk nor the compiled path implements (gap-ledger row 404 records the gap). The calculi of Appendix A keep their rules as the team wrote them, under a callout that they predate the rule. Built.

Meaning: unchanged. The title's handle "(S2)" and "the one library's shapes, under one statement of instantiation exclusion" needed the conversation. The entry now says what the rule is, by pointing to the skill's term and P-25, what happens to each refused example, and what the two parts of the rule are. Second round (`check.md`, "P-97"):
- The first round's "gets a callout" dropped that the covariance example is rewritten and marked like the others, and that the decision was one sentence in its callout. The tree settles it: the declaration stands marked "Not allowed!" beside the library's widening function, and `\revision{revival-covariance}` carries the sentence (`Specification/basic/trait-parameters.tex:409-454`).
- "The rule is stated once" had two readings. The subject is now the specification, with the two files that state the two parts, and the Types chapter is named by its path.
- "Built." comes back. Consolidation chunk P1 cut it on 2026-10-13 (`bc8902f47`) because F-167 builds P-97; without it, the cold reader could not tell whether the work is done. It is true of the tree (F-167; `trait-parameters.tex` above). The coordinator may cut it again if the record's rule is that a FACTS entry carries the state.

Sources:
- The library's shapes, "Not allowed" and the rule stated once: his "S2 yes, take the verdicts for rung S" of 2026-09-26T08:07:48.939Z and "Yes. Sure." of 08:18:07.238Z, to the coordinator's 08:00:01.931Z: each example "becomes what the library already does", the originals each stay "marked "Not allowed"", and the rule is "stated once, in the two-part form from Luchangco's 2012 Types chapter" (`judgement-c7.md`, "P-97").
- "The Working Draft offered such examples as legal": `Specification/basic/trait-parameters.tex`, the callout before the examples (`:404-407`).
- The name of the rule: `Specification/basic/types-vals-vars.tex:242`, "This property is called instantiation exclusion".
- The two parts: `Specification/basic/types-vals-vars.tex:234-262` (which instantiations exclude each other) and `Specification/basic/traits.tex:379-398` (the rule on declarations) (`P-97.md`, section 2).
- The Types chapter's path: the skill's `references/specification.md`, line 7; P-25 and F-166.
- The covariance example and its callout: his "Option 2, agreed." of 09:29:33.563Z, to the coordinator's 09:25:29.526Z, option 2 of three (one sentence in the callout, against "record only" and "specify it"): the later design declares variance with a `covariant` modifier, implemented on neither path. "A trait that extends other instantiations of itself", "rewritten and marked in the same way" and "in the same Types chapter": the tree, `trait-parameters.tex:409-454` (the callout's "the team's later Types chapter, Luchangco, 2012"). "The type group" is the skill's term (`references/exploring.md`). Row 404 is NEGATIVE-VERIFIED.
- The calculi: his "Agreed." of 18:59:23.595Z, to option 1 of the coordinator's 18:11:02.962Z, "leaving the formal rules as the team wrote them". Four calculi carry the callout; the entry gives no count.
- "Built.": F-167 builds P-97; P-97's history, the block of 2026-10-13 19:07Z.
- Moved to the note line: the handle "S2".

Questions for the curator: none.

## P-98

> - P-98 **`TotalComparison` extends `StandardMinMax[\TotalComparison\]`, so that the library's `BIG MIN` and `BIG MAX` work over total comparisons.** It does so in the library's api and component, `Library/FortressLibrary.fsi` and `.fss`. It keeps the five members that it restates by hand: `MIN`, `MAX`, `MINMAX`, `<=` and `>=`. Without the parent, walk finds no overload of `BIG MIN` or `BIG MAX` that takes total comparisons (gap-ledger row 461). Why: it is the library's own device, which its other ordered types use. The curator took it on the coordinator's recommendation. It stands and blocks no work, but he wants it explained to him in more detail when he has the energy: `PLAN.md`, "Pavol's answers, in the order they are needed", lists that explanation as owed. Built (F-77).

Meaning: unchanged. "He", "the api and the component", "five restated members" and the purpose of `MIN` and `MAX` needed the conversation; "on the list for his review" made a cautious reader hold off (`takeaway-c7.md`, "P-98"). The entry now names the files, the five members and the effect, and says in his words that the decision stands and only an explanation is owed. Second round (`check.md`, "P-98", failure 1): the title said "so that it has `MIN` and `MAX`", which the cold reader read two ways, since the body says the type restates them by hand. The title now says the effect, and the body says what fails without the parent. The title is new, so `record.py` refreshes any entry's pointer words; none quotes it.

Sources:
- The parent, the api and the component: option (b) of the coordinator's 2026-09-29T15:53:50.678Z, "one header line in the api, one in the component and a test", recommended, which he took at 17:44:02.015Z (`judgement-c7.md`, "P-98").
- The five members and the files: the tree, `Library/FortressLibrary.fsi:121-132` and `.fss:159-176`; the coordinator's account of the build (`P-98.md`, section 2).
- The title's effect, and "without the parent, walk finds no overload ...": gap-ledger row 461, "under `walk`, `BIG MIN` and `BIG MAX` over total comparisons stop the run with "Failed to find any matching overload"" against the bounds `StandardMin` and `StandardMax`, FIXED by `070ef39e5`, gated by `ProjectFortress/tests/LibraryOverloadFamilies.fss:45-48`. The ask's heading, "`TotalComparison` gets back `MIN` and `MAX` by extending `StandardMinMax`", meant this effect (`CLIMB-BATCH-7.md`, item 22). `StandardMinMax` extends `StandardMin` and `StandardMax` (`FortressLibrary.fsi:216-221`).
- "Why": the option's "The library's own device", and his "You're saying that the recommendation B is like an obvious choice that follows other precedent in the library." (17:44:02). `RR64`, `QQ`, `RR32` and `StandardTotalOrder` extend `StandardMinMax` (`FortressLibrary.fsi`).
- Taken on the recommendation, it stands, and the explanation owed: his "I'll have to rely on your recommendation there", "the default stays, it doesn't block the run" and "we should go over it one more time later where you explain it to me in more detail when I have more energy" (17:44:02). `PLAN.md`, "Pavol's answers, in the order they are needed", its list "For his review; nothing waits on them", and review-queue item 109 hold the explanation owed. His words make the explanation conditional on the batch ("If it goes into this batch ..."); the entry states it plainly, as HEAD and `PLAN.md` do (`check.md`, "P-98").
- "Built (F-77)": F-77 names it; `070ef39e5`.

Questions for the curator: none.

## P-102

> - P-102 **Test first, the test kept.** Every edit of source code in the original tree starts from a failing test. The worker adds the test to the test suite, sees it fail, makes the fix, and sees it pass. The test then stays in the suite for good. An edit of the specification or of documentation is not source code and needs no test. The gate's three test runs, `ant testFast`, `ant testSystem` and `ant testSpecData` (P-124), must pass when the work lands; they need not pass after every edit. The test and the fix may land in one commit. Why: the rule replaces one-off validation scripts, which no later build runs. The `fortress-repo` skill's `references/tests-writing.md` says how to write the test.

Meaning: unchanged. The audit's cold reader could not tell whether "the full suite stays green" holds at every commit or when the work lands (`takeaway-c8.md`, "P-102"). His answer to exactly that question is per landed batch, so the entry now says so. The exclusion of the specification and documentation is the consequence of "source code" that his page comment gave as its reason. His reason for the rule is added after "Why:". Second round (`check.md`, "P-102", failure 1): "the full suite" left the reader unsure which runs it means. It is named as the gate's three test runs of today. His word of 2026-09-17 predates `ant testSpecData`'s place in the gate, which P-124 gave it, so the entry requires at landing nothing that P-124 does not already require.

Sources:
- The steps: his 2026-09-17T16:50:18.180Z, "The workers should be writing the failing test, verifying that it is failing, doing the fix, and proving that it is working." (`judgement-c8.md`, "P-102").
- "Source code in the original tree", and no test for the specification or documentation: his page comments on the `fortress-repo` skill, 2026-10-06 17:19 UTC (agents were confused about tests for specification edits) and 17:28 UTC ("source code", no list). "Documentation" is the skill's word (`SKILL.md`, "Rules for every task"), which follows from his "source code".
- "Stays in the suite for good": his 2026-09-17T01:31:22.625Z ("those tests down") and 16:50:18.
- "Must pass when the work lands; need not pass after every edit": his 16:50:18, "So the reinterpretation as per batch is fully in line with this.", answering the coordinator's 16:26:23.623Z, whether the clause holds per edit or per landed batch.
- "The gate's three test runs, `ant testFast`, `ant testSystem` and `ant testSpecData` (P-124)": the skill's `references/gate.md`, step 4, "All three must have zero failures"; P-124.
- "The test and the fix may land in one commit": his "Yes." on the skill page, 2026-10-04 01:25 UTC, after his 01:08 comment on the ceremony burden.
- "Why": 16:50:18, "This was meant as a rule. to eliminate some kind of one-off validation scripts that are then not part of the future builds."
- The pointer to `references/tests-writing.md`: the coordinator's; the part exists.

Questions for the curator: none. The cold reader asked which files count as source code (`build.xml`, scripts, `Fortress.ast`, the grammars). He set the scope at "source code" with no list on purpose (17:28), and was unsure only of the grammars. The entry keeps his word; `concepts.md` lists the term. If a case must be settled, it is a question for him, not a rewording.

## P-103

> - P-103 **The suite's verdict is the check.** A test's result is pass or fail, as the team designed the suites. A value that matters is checked inside the test, with the checks that the harness already has: an `assert` call in an interpreter test, a `run_out_equals` key in a compiled test's `.test` file. What a test prints beyond its checks does not count. So no expected-output files are added. They are not proposed to the curator again, and neither is a comparison of what a test prints beyond its checks with an earlier run's output. Why: when the suite's designers let a test pass without a further check, what it prints need not be checked.

Meaning: unchanged. "None of it is offered to him again" left "it" open (`takeaway-c8.md`, "P-103"). The entry now names what he refused: expected-output files, and a comparison of what a test prints beyond its checks with an earlier run. It names the two checks by their place, and gives his reason. Second round (`check.md`, "P-103"): the first round's "a comparison of a test's printed output" broadened the ban. It also covered a `run_out_equals` key, which is such a comparison and which the entry requires, and the gate's own comparisons, which the skill keeps (`SKILL.md`, "Rules for every task"). The ban is now his two refused offers. The reason says "checked" for his "control".

Sources:
- Pass or fail, and a value that matters checked in the test: his 2026-09-29T18:52:49.920Z, "Those values must be part of the test.", to the coordinator's 18:07:00.343Z offer to share "before" outputs per base; and 2026-10-02T15:48:05.965Z, "The test suite original design does have a mechanism for checking values that are important to check." (`judgement-c8.md`, "P-103").
- The two checks: the coordinator's gloss of his "mechanism", true of the tree: `FileTests.java` reads `run_out_equals`, and 341 interpreter tests call `assert` (`P-103.md`, section 2).
- "Does not count": his 2026-09-29T19:03:33.775Z, "it does not fucking matter".
- No files, and no new offer: his 15:48:05, to the coordinator's 15:40:56.635Z offer of expected-output files: "It was decided in the post-mortem." and "shut the fuck up about it already." The comparison with an earlier run: the coordinator's 18:07:00.343Z offer of "before" outputs, taken once per base and compared, which his 18:52:49 refused.
- "Why": 15:48:05, "When the designers of the test suite decided that it passes without any additional check, it is not needed to control its outputs."

Questions for the curator: none.

Note for the coordinator, from the audit (`judgement-c8.md`, "P-103"): `references/gate.md`, "Comparing with an earlier run", still gives masks for printed output when a brief asks for a comparison with a base run, and does not say how that meets this entry. The skill's `SKILL.md` names the gate's comparisons and a comparison a brief asks for as the exceptions; with the second round's wording, the entry and that sentence agree.

## P-124

> - P-124 **The specification's examples are a step of the gate, and every one must pass.** `ant testSpecData` runs the examples extracted from `Specification/` under walk (F-114 says which 130 it runs), and the gate fails if any of them fails. When an example fails, the implementation is fixed: the example is not respelled to get around a gap in walk, and no list of examples allowed to fail is kept. Built.

Meaning: unchanged. "Zero red", "known red" and "respelled for walk" were project shorthand. The entry now says that the gate fails on any failing example, what is fixed instead, and what kind of respelling is refused: a change of the example to get around a gap in walk. Second round (`check.md`, "P-124"): the first round's clean entry said only "not respelled to suit walk", which the cold reader could not tell apart from P-97's revisions; the entry now uses option 3's own words, so this line is true of it.

Sources:
- The gate step, every example to pass, and no list of known failures: his "Yep. Option one." of 2026-10-04T20:27:30.337Z, to the coordinator's 20:24:58.453Z, "Should `testSpecData` join the gate?": option 1, "the target joins the gate at zero red"; option 2, a list of known red names, not taken (`judgement-c8.md`, "P-124").
- "Not respelled to get around a gap in walk": option 3, "Respell the five examples ... a text change in the revision form, to cover a gap in walk", not taken. P-97's revisions follow a decision of the language, so they stay outside it. For every example, the general form is consolidation chunk P3's (`ab933086b`), a fair extension of his option 1 (question 1).
- "Built" and "the gate fails if any of them fails": `references/gate.md`, step 4, "All three must have zero failures"; every gate summary from climb batch 11 on holds `SpecDataJUTest 130 0 0 0`. F-114 says which 130 examples run.

Question for the curator (carried from the audit, `corrections-c8.md`, "P-124", question 1; the wording is kept until he answers):
1. On 2026-10-04 you chose option 1 over respelling the five failing examples. P-124 makes that a rule for every example: an example that fails later is not respelled to get around a gap in walk, and the implementation is fixed. Keep it as a rule for every example? Or strike it as done with the five?

## P-125

> - P-125 **The suites run Fortress in parallel, pinned at four threads in `build.xml`.** `build.xml` sets `FORTRESS_THREADS` to 4 for the two suites, `ant testFast` and `ant testSystem`, so that every run of them uses four threads, whatever the calling shell sets. A test that parallelism makes fail, on every run or only on some, is written wrong, for example a write that needs `atomic`, or it shows a defect. Either is fixed, never hidden by running at one thread. Why: Fortress is parallel by default, so a suite at one thread has a blind spot, and sparing the four-CPU machine is no reason for one. Built.

Meaning: unchanged. Two kept phrases misled the audit's cold reader (`takeaway-c8.md`, "P-125"). "Fails or varies" read as varying printed output, which P-103 makes harmless; he meant a flaky verdict. "Never hidden by a pin" read against the pin at four that the entry requires; he meant the old pin at one thread. Both now say what he meant. "The suites" are named: the pin is in the two suites' targets only. Second round: `check.md` passes it; no change.

Sources:
- Parallel suites, the reason, and the rule for a test that parallelism makes fail: his 2026-10-08T15:53:33.559Z, to the coordinator's 15:31:57.152Z: "we turned off parallelism, which is the native part of Fortress", "We basically activated a blind spot", "if parallelism makes something flaky, then the test is written wrong. Something needs to be atomic.", the four-core machine no reason, and "What, what if there are any correctness issues?" (`judgement-c8.md`, "P-125").
- "Or it shows a defect: either is fixed": the coordinator's fair wording of his question on correctness issues.
- The pin at four, and "whatever the calling shell sets": his "So yeah, pin it to four. That's good." of 18:11:36.440Z, to the coordinator's 18:07:13.987Z, first asked at 17:42:19.408Z, option 1, "Pin them at 4 ... independence from the calling shell".
- "The two suites, `ant testFast` and `ant testSystem`": the suites of the asks he answered, and `build.xml:1186` (`fastTrack`) and `:1431` (`systemShard`). "Fortress is parallel by default": `fortress-repo`, `SKILL.md`, "Parallelism and mutable state".
- "Built": `build.xml:1186` and `:1431` set `FORTRESS_THREADS` to 4; F-99.

Questions for the curator: none.

Note for the coordinator, from the audit (`takeaway-c8.md`, "P-125"): `ant testSpecData`, the gate's third step (P-124), sets no `FORTRESS_THREADS`. It runs at the shell's count, or at half the CPUs when none is set. The entry names the two suites, so it does not claim the pin for it.

## P-150

> - P-150 **No resident compiler is built.** A resident compiler is a JVM that stays running in the background and serves each Fortress command, as Scala 2's `fsc` did. The speed work goes to the checker's own speed instead (P-148: the task that adds code to the checker also makes that code fast). The idea is not taken up again unless something significant changes. Why: a measurement over the workers' transcripts found that the Fortress commands that a worker runs one at a time, each in a fresh JVM, take a small share of its time, so a resident compiler would save too little to be worth building (F-234). The suites already run many tests in each of their JVMs, and what a resident compiler could save inside the suites and builds was not measured.

Meaning: unchanged. "Resident compiler" was not defined, the reason and the decision were in one sentence, and "not tried again" suggested an earlier attempt (`trial/evidence/takeaway-check.md`, "P-150"). The entry now defines the term, gives the reason after "Why:", and gives his "reattempt" as "not taken up again". Second round (`check.md`, "P-150"):
- The first round made the measurement find that a resident compiler "would save too little of their time". It found less: it counted only the Fortress commands that the workers ran one at a time, and it left the suites, builds and stages unexamined. The reason now says what it found, and what it left out. "Not worth building" is the coordinator's conclusion from it, which he took at 09:15.
- "The suites already run in one JVM each" was F-234's wording, but `ant testFast` and `ant testSystem` run four JVMs each (the skill's `references/tests-running.md`). Its point is that a suite runs many tests in each JVM, not one JVM per test, which answers his premise at 07:39:59.688Z.
- P-148's "rung" is said as "task", since the cold reader lacked the term; `concepts.md` lists it.

His decision stands either way.

Sources:
- The title and the checker as the place for the speed work: his 2026-10-16T09:15:00.365Z, "you did some research and why it is not worth doing", which took in the coordinator's 08:56:38.403Z, "So a resident compiler isn't worth building, and I won't propose it. The lever is the checker's own speed" (`trial/evidence/judgement.md`, "P-150").
- "As Scala 2's `fsc` did": the coordinator's 07:40:53.963Z, answering his 07:39:59.688Z, which recalled it.
- "Not taken up again unless something significant changes": his 09:15:00, "so that we do not reattempt it unless something significant changes".
- "Why" and its pointer: F-234, the measurement over 267 worker transcripts, which holds the figures that left the entry at his yes of 2026-10-21 (a number from one measurement is not his position). What it counted and what it left unmeasured: `explorations/coordinator/process-engineering/fresh-jvm-commands.md`, "Summary" ("What runs inside (b) and (c) was not examined") and "Decisions not taken" ("If a resident compiler could serve those, the bound would change by a factor I did not measure").
- "Many tests in each of their JVMs": F-234's "whose harness calls the shell for every test", and `tests-running.md`, four tracks and four shards.
- P-148's words: its body, "A rung that adds to the checker first makes the change correct, then, in the same rung, makes the new code fast".

Questions for the curator: none.

## For the coordinator

These are outside the nine entries' text, or for another pass (`check.md`, "For the coordinator").
- `review-queue.md`, item 109, "Home" line, quotes P-98's old title ("... so that it has `MIN` and ..."). Requote it from the new title when the chunk is applied.
- `specification.md`, item 1: see the note under P-96.
- F-234's title sentence "The suites already run each suite in one JVM" has the same fault as P-150's first round: each suite runs four JVMs. It is for the facts pass.
- `record.md`, "What an entry is", says that a POSITIONS entry "lists no FACTS entries". The rewrite points to F-46 (P-95), F-163 (P-96), F-114 (P-124) and F-234 (P-150), each with a few words, as the writer's brief allows; HEAD already had F-77, F-234 and others. The coordinator may want one rule, which also decides P-97's "Built." (see P-97).
