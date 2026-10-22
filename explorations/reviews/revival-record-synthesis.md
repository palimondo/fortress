<!-- A lightweight synthesis of six external suggestions for record keeping, checked against the Revival update process and its growth report. -->

# Keep Revival as current guidance

Review base: `main` at `f415fa913`, 2026-10-21. Proposal for the curator and coordinator; no skill or policy changes made.

## Recommendation

Change the question asked after a landing from **“What changed?”** to **“What must a worker understand differently about this tree?”** Update the existing explanation of that subject. Keep the source and the history in their existing homes.

The evidence points to a conflict in the writing instructions, not simply a writer forgetting to be concise. The landing requires each change, its contradiction and its reason. Revival gives those a permanent three-part form. The writer is also told to describe current rules and keep provenance elsewhere. A writer can satisfy much of both instructions and still produce a growing history of repairs.

Keep the lightweight parts of the six suggestions. Do not add a database, an extracted claim register, a formal ontology or a prerequisite graph. The project already has records with stable identifiers, evidence pointers and histories.

## What to take from the six responses

| Idea | Application here |
|---|---|
| Astra: check knowledge and presentation separately | Check the rule against evidence; then check whether a worker can understand and use it from the skill alone. Passing either check does not imply passing the other. |
| Astra, Grok: compare claims under explicit scope | Preserve the execution path, library, call form and conditions. Distinguish a scope difference from a contradiction. |
| Gemini: test a section without the surrounding research | Give the cold reader the normal skill prerequisites and changed section, without the batch story or sources. Ask what rule it understands and what it would do. |
| Grok: keep the original wording during reconciliation | Compare proposed guidance directly with its evidence. A second paraphrase is not an independent check. |
| DeepSeek: distinguish firm guidance from open questions | Do not turn a proposal, an uncertain explanation or a bounded observation into a rule of the tree. Preserve legitimate uncertainty in its proper home. |
| Opus: require exact quotations for a conflict | A flag identifies both passages, their scopes and the incompatible conclusion. Do not resolve a vague allegation by rewriting both. |
| Fable: distinguish explanation from reference | Revival explains the current differences that matter to working in this tree. Reports and sources retain the derivation and repair details. |

These are review lenses, not six new workflow stages. Use them in the existing writer and cold-read steps.

Reject the blanket rules to split every sentence containing “and”, to document every source finding in the central map, or to ban every hedge. A condition belongs with its claim. Selection is necessary. An uncertainty can be accurate. Extracting prose into a table can itself lose scope; subsequent judgement is not wholly mechanical.

The model responses' named tools and claims about formal methods were not independently verified for this review. No recommendation here depends on them. The useful checks can be applied directly to Markdown.

## What the existing process actually asks for

The following sources were read at the review base:

- `.claude/skills/fortress-repo/SKILL.md`, “The record”, “The parts”, and the maintenance-only instruction for `references/sources.md`.
- `fortress-repo/references/records.md`: FACTS and POSITIONS describe the present; their earlier forms go to history. Ledger rows describe gaps and have their own history.
- `.claude/skills/coordinator/references/record.md`: the pass preserves scope, checks related entries and moves dates, batches and corrections out of current entries. Its atomicity rule already keeps conditions and evidence with a claim.
- `coordinator/references/batch.md`, “The landing”: step 2 checks the FACTS fold; step 3 separately calls the skill writer to update Revival.
- `coordinator/references/skill-rewrite.md`: after each landing, the writer records “what the revival changed in the language, each change with its contradiction and its reason.”
- `explorations/coordinator/skill-writer-brief.md`: current rules belong in the skill; provenance belongs only in sources. It also exempts requested new content from the rule that a rewrite cannot grow.
- `explorations/coordinator/skill-cold-read-brief.md`: checks clarity and undefined terms, flags provenance, and limits review mainly to the changed text. It does not judge whether a rule is right.

Thus the skill update is a distinct post-landing step. It is not specified simply as a compressed copy of FACTS. Code checks are explicitly required before the writer states claims about code. That is useful for accuracy, but it does not decide which details the skill needs.

The present record has these separate jobs:

| Home | Job |
|---|---|
| FACTS | Established properties and their consequences for work, with evidence pointers. |
| POSITIONS | The curator's decisions, reasons and consequences. |
| Gap ledger | Known defects or gaps and their disposition. |
| Their history files | Earlier entry text and provenance of changes. |
| PLAN and PLAN-history | Work still to do; completed, answered or stale work moved out. |
| Revival and the other skill parts | Guidance a worker can use without reconstructing the project's research. |
| Skill sources | Maintenance provenance for the skill. Not required reading for a normal task. |
| Reports | Detailed findings, measurements and reasoning. |

The concern is principally the boundary between the last three homes, not the absence of a record system.

## Evidence of growth and its limits

`explorations/reviews/revival-part-use-2026-10-21.md` reports growth from **8,159 to 74,260 characters** between October 8 and 20: about **9.1 times**, not a measured token count.

Its breakdown attributes 37,816 added characters to seven post-landing writer updates and 8,414 to five writer fixes after cold reads. Earlier batch folds added another 14,875. It counts 54 entries, each with Original, Resolution and Reason bullets. Original accounts for 22,882 characters, Resolution 35,239 and Reason 11,979. Resolution itself also contains repair history.

The report found no whole-file reads by batch agents in batches 14–20, although targeted reads continued. This suggests a file used by lookup, not evidence that it is useless. The scout explicitly did not measure whether readers used what they read. Its transcript classifications are heuristic; this review did not rerun that study.

The initial version at `24af7743b` already used the three-part form and said it listed each change. The history orientation was present at creation; growth did not invent it. The original framing also serves a real purpose: explaining why an old source disagrees. The error is letting that purpose require the complete sequence of repairs.

A sample of `references/sources.md`, “Climb batch 20's changes” and its follow-up entries, records commits, FACTS and POSITIONS identifiers, code sites, tests and cold-read corrections. Sources are being maintained for those additions. This is not a full audit of source coverage for all 54 entries.

The standing writer brief has a growth loophole: requested new content is exempt from its non-growth rule. Combined with “each change”, this permits continuing expansion without violating the size instruction. Cold reads can then add definitions and qualifications to each addition without reconsidering whether the addition belongs there. The measured growth after cold reads is consistent with that mechanism, but does not establish the motive of any individual writer.

## A small change to the existing process

Replace the post-landing update instruction with a rule of this form:

> After a landing, update the skill where the landed tree changes what a worker must understand or do. Rewrite the existing explanation of that subject. State the current rule, its scope and the exceptions needed to use it. Keep a short contrast with the original Fortress only when it prevents a likely mistake. Put the repair history and supporting evidence in sources and reports. A landing does not require a new Revival entry.

Use the same intent in the writer's brief and Revival's introduction. Otherwise the old “each change” instruction remains a competing requirement. This is a proposed change of policy for approval, not a wording correction already applied.

Within the existing writer task:

1. Identify the current guidance affected by the landed findings. Decide whether to replace it, add a necessary qualification, link to its existing home, or make no skill change.
2. State the resulting rule without the batch narrative. Preserve path and library differences. An unresolved gap is current information when it changes how a worker must act.
3. Update sources for each changed rule. Use the guidance heading and exact evidence location. Keep the maintained text understandable without that evidence file.
4. Check nearby guidance and other entries that state the same behaviour. Do this by bounded search, not a whole-corpus rewrite.

In the existing cold read, add two questions:

> What would you do differently after reading this section? State the rule and its limits without opening the sources.

> Does this section contain repair history or detail that changes no action and prevents no misunderstanding?

The writer's evidence check remains separate. Retain the existing consolidation question:

> **Does this summary let a reader conclude more than the evidence establishes?**

Do not turn “no search” into “include every detail”. A worker should not need sources to understand the skill's rule. It can still follow a clear link to another skill part or a detailed report when its task requires that detail.

## Example of the boundary

The sampled “An integer power” entry mixes the current power rule with earlier behaviour, changed demo filenames, the `strToInt` repair, typed `fail`, api repairs and differences between the two libraries.

The essential current explanation is that integer power in the interpreter's library preserves the base type, including defined exceptional behaviour at negative exponents. A float or rational base is needed for fractional results. The compiler-library and `IntLiteral` exceptions must remain visible: removing those would widen the claim incorrectly.

The list of demos rewritten from `10^(-k)` to `10.0^(-k)` is repair history. Keep it in the report or sources. The typed `fail` rule is independently useful, but belongs with result typing or library-writing guidance, not buried inside integer power. Link to that home if necessary. This is selection and relocation, not deletion of evidence.

Use this one entry as a trial before rewriting the whole file. Verify that the shorter version preserves the operational distinctions and that its sources still support them. Then apply the same boundary to one topic section. Compare length and cold-reader answers; length alone is not success.

## Addendum: restore a whole-readable worker orientation

The curator clarified the intended split after reading this review: the coordinator loads the full current record; a worker loads a much smaller Revival orientation whole. Revival selects the facts needed to correct its working model, rather than reproducing the full record. This clarification changes the proposed end state: a useful lookup file alone is not sufficient.

### FACTS has not been replaced

Both channels still exist in the process and in recent commits:

- `climb-batch-workflow.js:526` asks each rung for a FACTS entry, ledger updates, and separate material for the skill writer. Its gather instruction at line 923 folds the record. Its review instruction at line 998 checks both the folded record and the separate Revival material.
- The landing instructions check the FACTS fold before requesting the skill update. The skill update does not substitute for it.
- Commit `bd33a2f8b` updates FACTS and FACTS-history during batch 20's routing and consolidation. Commit `408910f26` closes the ledger rows fixed by batch 20. These are evidence of actual maintenance, not only instructions to do it.

This confirms that both are maintained; it does not establish that every finding was transferred correctly. No exhaustive batch-to-record audit was made.

### Intended use versus the written instructions

The coordinator skill's boot order explicitly reads FACTS, POSITIONS and INDEX whole, with FACTS paged to fit the Read tool. The worker skill says to read slices of the record as needed. This supports the different roles the curator describes.

However, the current worker skill tells the reader to load Revival **when an old source or training disagrees**, and Revival itself says to search by construct. It does not require every worker to load Revival whole. The growth report records whole-file cold reads in earlier batches, but that is not a universal worker loading rule.

Thus the curator is clarifying a coherent intended architecture, not inventing an unrelated purpose. But the current instructions do not fully enforce it. The proposal should explicitly state the small orientation's purpose and loading rule. Workers may still follow task-specific record pointers; “orientation whole” does not mean “no other evidence ever”.

The hypothesis that read limits caused the lack of whole reads is plausible, but not established by the scout's counts. They include previews, partial reads and changed briefing instructions. No conclusion about the exact cause is needed to restore a whole-readable orientation.

### Consolidation procedure

This is a one-time consolidation followed by the smaller update rule above. Do not shorten each of the 54 entries independently: that preserves the wrong unit of organization.

1. **Set the reading contract.** Revival is the short account of current departures from the original Fortress that workers must know before work. Core skill definitions may be assumed. Batch history and the coordinator's full record may not be assumed.
2. **Choose a provisional budget.** Aim for 8–12 thousand characters, near the original scale. This is a proposed editorial target, not a known tool limit or a reason to omit necessary qualifications. Verify that the complete file can be returned without truncation by the actual worker reading tool. Also judge its cost alongside the core skill.
3. **Draft a current-state outline.** Start with the existing language topics: dispatch, traits, static parameters and sizes, numerics, generators and reductions, and implementation limits. Organize by concepts workers use, not by repairs. Merge several repairs when together they establish one rule.
4. **Account for the old content in a temporary review table.** For each old entry, name its destination: retained current rule; merged rule; detail already in an area skill or report; history in sources; or unresolved discrepancy. This table is a review artifact, not another permanent registry. Check an actual destination before dropping unique information. If a useful fact exists only in the skill, flag it for the normal FACTS pass rather than silently discarding it.
5. **Write from the outline.** Give the current rule, the scope and exceptions required to apply it, and at most a short contrast or example where it prevents a likely error. Link to the relevant area skill for specialist detail. Keep essential path differences in the orientation itself. Do not require sources to understand a rule.
6. **Check preservation and comprehension separately.** Compare the draft against the source-backed old rules and the disposition table. Then cold-read the whole draft with the core skill, without the old Revival or batch reports. Ask a few concrete questions about the distinctions that must survive, including walk versus compiled behaviour and numeric result types. A shorter file that produces wrong answers fails.
7. **Publish the consolidation with its provenance.** Update sources so a maintainer can trace each new heading to the old entries and supporting evidence. Keep historical source entries; add a mapping for renamed or merged headings. Update the core skill's description and the post-landing instruction together. Thereafter replace affected explanations rather than append repair narratives.

Retain the one-entry trial as calibration, then consolidate the whole orientation to this outline. Merely demonstrating a shorter integer-power entry does not solve the 74K-file problem.

### Acceptance and maintenance

The consolidation is done when the file can be read whole, the scope distinctions survive, no unique finding is lost without a destination, and a cold reader can state how to work differently. Report the before/after character counts and any remaining size exception. If the target cannot be met without losing essential meaning, expose that conflict instead of compressing the prose into unexplained shorthand.

For each later landing, continue to record established findings in FACTS and gaps in the ledger, with their existing histories. Then ask which of those findings changes the small worker orientation. Many will change only a specialist skill part or no skill text at all. New content must compete for space through consolidation; it must not bypass the budget merely because it is new.

## Sources audit and provenance during consolidation

A follow-up check at the same review base, `f415fa913`, confirms that skill sources were maintained as Revival grew:

- Of 40 commits changing `revival-changes.md`, 34 also changed `sources.md`.
- The six without a same-commit sources edit were review and cold-read corrections in batches 11–13: `79ce86fd1`, `9928f59d8`, `5ac066690`, `3711db681`, `510e80b8f` and `29e4b4bd8`. Sources contains later sections for those batches' corrections, including explicit references to review and cold-read findings. A missing same-commit edit is therefore not sufficient evidence of missing provenance. Each correction was not individually reconciled.
- Of the 54 current entry headings, 49 occur verbatim in sources. The other five have corresponding entries under shorter or combined names: `comprises`, the bound `Any`, Sizes, the string's `left` and `right`, and a parameter whose type is left out.

Method: list commits touching Revival, inspect their changed paths for sources, compare the current bold entry headings with sources, then inspect the unmatched topics and the batch-correction sections. These are structural checks and targeted reads, not a sentence-by-sentence proof that every current claim is supported. A source entry's existence does not establish its adequacy or currency.

**Conclusion:** preserve and reuse the existing provenance. Do not launch a wholesale reconstruction from transcripts. The immediate need is to retain traceability when headings and explanations are consolidated, and repair specific gaps encountered.

During consolidation:

1. For each new heading, list the old entries it replaces or combines in the temporary disposition table.
2. Find the evidence for the resulting current rule and its exceptions, including later corrections. Merely linking the earliest source can preserve an obsolete rule.
3. Add a dated consolidation entry to `sources.md`, mapping each new heading to its supporting source entries and exact report sections or revision-specific code references. Preserve the older historical entries; do not rewrite them to pretend that the new organization existed earlier.
4. When a detail moves to another skill part, update its maintenance mapping there. When it remains only in a report, retain that destination in the consolidation account.
5. For missing or ambiguous support, trace the specific passage through its skill-edit commit, the post-landing writer's cited material and the relevant batch report or record. Use transcripts only if these fail. Mark unresolved support explicitly; do not infer authority from the fact that a sentence survived earlier rewrites.
6. Publish the consolidated guidance and its source mapping together. Check that every retained substantive rule has a usable evidence trail and that merged headings have not stranded their exceptions.

The mapping can be ordinary Markdown bullets in the existing sources file. No new permanent registry is needed. Normal workers still do not load sources: the smaller orientation must explain its rules itself. Maintenance evidence need not shrink in proportion to the reader-facing guidance.

## Recovered pretraining audit and the missing regression check

A bounded read-only search by a Luna worker found the original Fortress-worker artifacts. The findings were checked against their relevant passages. No transcript search was needed to locate them.

- `explorations/reviews/fortress-pretraining-quiz.md`, added in `9764aefe1` on October 8, records a fresh Opus session run outside the repository with no tools. The prompt asks for Fortress knowledge from memory, with confidence labels, for a programmer familiar with Java, Scala, Haskell and Julia. Question 10 asks for likely traps.
- `explorations/reviews/skills-distillation-audit.md`, added in `91906f99a`, grades that answer against the skill and project evidence. Section B.10 grades fourteen trap claims. Section A5 identifies concrete first-test traps and their operational cost.
- One important correction is not merely a language fact: a worker must not resolve a specification/implementation disagreement by automatically trusting the code. A curator decision settles it; otherwise the conflict must be explored.

These artifacts establish a pretraining elicitation followed by an evidence-based audit. They do not, by themselves, establish a controlled before/after trial showing that workers given the rewritten skill avoided every trap. This bounded search does not exclude additional experiments elsewhere.

### What survived in the instructions

The current `skill-cold-read-brief.md` describes a reader who knows Java and Scala but not Fortress or the repository. It asks for missing gotchas and passages that would send a worker wrong. The original concern therefore survives in general form.

However, neither that brief nor the skill-writing method explicitly requires replaying the Fortress quiz, retaining an approved set of trap cases, or comparing the resulting answers against expected behaviour. The specific regression check is not encoded there.

The baseline interview still named in `coordinator/references/skill-rewrite.md` is for new models of the coordinating session. Its README confirms that scope. It is not a substitute for the Fortress-worker check.

### A small test to preserve through consolidation

Keep the quiz and audit as historical evidence. Select a small set of consequential wrong assumptions from them and actual worker failures, then update the expected answers against the current record. The October 8 audit itself contains statements that later work may have changed; do not use its old answers as a timeless oracle.

For the whole-Revival consolidation, give a fresh reader the core skill, the proposed whole orientation and neutral task questions, without the audit or answer key. Grade concrete choices, including the path and scope qualifications, rather than its ability to repeat headings. For example: how to run a source program; what to do when the specification and an implementation disagree; and whether a numeric relationship or conversion assumed from another language holds here. Include a case where the right action is to follow a task-specific pointer or explore, not invent an answer.

The reviewer has the expected answers and evidence. Record missed corrections and new false assumptions. Compare old and new skill versions on the same cases when judging a consolidation regression. For later small edits, rerun only the affected cases; refresh the pretraining-only baseline when a materially different worker model makes that useful. This is a proposed bounded regression practice, not a claim that the earlier experiment already implemented it.

### Do named frameworks help?

ASD-STE100 is already named in the writer's standing brief and the writing principles, with concrete instructions about terminology, sentence structure and descriptive versus procedural text. The project uses an adaptation (“halfway”), not a demonstrated certification of compliance.

The useful ideas from the other responses should likewise become observable checks: introduce required concepts before relying on them; supply context at entry points; preserve a claim's conditions and evidence; and test whether a reader can make the intended decision. Much of this is already in the writing principles and cold reads.

Do not add Knowledge Space Theory, RST, GSN or other labels to the mandatory writer brief merely to sound more grounded. This review has not verified the external responses' descriptions of those frameworks, and no recommendation depends on those descriptions. If a framework later supplies a useful technique, record its source and the particular check it motivates in maintenance material. Naming a framework is not a substitute for specifying the reader failure to prevent.

## Recovered admission rule, workflow runs and transcript search pointers

Follow-up on October 22: the curator clarified that each Revival entry must earn its place by correcting a worker's default mental model to match **revived Fortress**. This is an admission test for each addition or edit, and a retention test during consolidation, not merely a final readability check.

### The original rule is on record

`explorations/reviews/skills-review-style.md`, Lens 10, gives the test verbatim:

> Test: name an agent that acts differently without the sentence. Name the record or transcript that shows the failure. If there is neither, cut it.

The same review records the curator's October 8 goal: use the agents' pretraining knowledge to guide them toward a correct mental model of Fortress. Section 2, M3 links that goal to the pretraining quiz and distillation audit. M4 records the October 5 05:54 request for a fresh reader and scenarios containing traps; it says this became cold reads given only the skill, followed by fixes and work on triggering/routing. Those times are as recorded in the artifact; their timezone was not independently verified.

This is stronger recovered support than the general “flag gotchas” instruction alone. The writer should require a default assumption, the correction for revived Fortress, and the consequential mistake avoided. Keep supporting evidence in sources or the evaluation record, not as another compulsory three-part paragraph in Revival.

### Actual automated work, distinguished from the unverified paired test

| Artifact | What it establishes |
|---|---|
| `explorations/reviews/fortress-repo-rewrite-points.md`, opening | A completed rewrite Workflow run, **`wf_185878c8-0fb`**, on October 8: sixteen writers, one per part, then three cold readers and fixes. Commits: `24af7743b` rewrite, `9a9c30d95` cold-read fixes, `cae2a0ad5` comparison. |
| `explorations/reviews/skills-description-optimization.md` | Executed skill-creator scripts on October 4, 20:05–20:40 UTC: 20 trigger/near-miss queries per skill, repeated runs, training/test split and description optimization. Fortress triggering improved from 52/60 to 59/60 runs. “Before/after” here means description versions, not worker answers without/with the skill. The evaluation files were outside git in `scratchpad/skills-description-optimization/`. |
| `explorations/reviews/skills-review-style.md`, M4 | Scenario/trap cold-reading was requested and performed according to the historical review. It does not give a paired no-skill/with-skill scoring protocol. |
| `explorations/coordinator/process-engineering/skill-effect.md` | A comparison of actual earlier and later batch behaviour, not a controlled per-entry admission experiment. Concurrent workflow changes limit attribution to the skill. |

The October 4 held note also records an initial trigger/routing experiment that the curator stopped and replaced with the skill-creator's normal description optimization. See `explorations/coordinator/postmortem-2026-09-19/held-list.md` at `9e17a6937` (19:55:58 UTC) and `8806c5360` (20:03:36 UTC). The planned `skills-trigger-test.md` must not be cited as a completed result.

The evidence therefore confirms real automated evaluation and a real rewrite Workflow. It does **not yet verify** that the specific paired mental-model test remembered by the curator ran as a workflow. Do not conflate these procedures or conclude it never ran.

### Precise breadcrumbs for Claude's transcript search

The relevant commits carry Claude session **`session_01AmiXNpJxQ6TBwec4vJZHDB`**. Start in that session's history with:

- October 4, 19:55–20:40 UTC: initial testing worker, its cancellation, then skill-creator optimization.
- October 5, 05:54 as recorded in the style review: request for scenarios containing traps, then cold-reader launches.
- October 8: pretraining quiz, distillation audit, and Workflow **`wf_185878c8-0fb`**. Resolve its full ID in the workflow journal; the report preserves only this prefix.
- Search phrases: “scenarios that contain traps”, “name an agent that acts differently”, and the workflow ID.

Remote branches `transcripts` and `transcripts-blinded` were confirmed to exist. Their contents were not downloaded for this bounded review. Thus these are session, time and run pointers recovered from repository artifacts, **not an independently verified JSONL path or message ID**. Claude should inspect the actual launch briefs and results before claiming to have recovered the exact paired protocol.

### Operationalize the admission test, not another writing ritual

For consolidation, apply the admission test to each candidate correction. For later landings, apply it to each proposed addition or substantive edit. An established trap can reuse its evidence; do not rerun a baseline merely to satisfy a form. When necessity is uncertain, use a fresh-reader test.

A small Claude Workflow could separate three jobs: a scenario author establishes the expected decision and its evidence; fresh readers answer neutral matched scenarios with and without the candidate correction; a grader compares answers against the evidence. For an incremental edit, the baseline should normally be the existing skill **without the candidate**, not an entirely unassisted worker. Otherwise the test cannot show that this particular addition is needed. A no-skill baseline remains useful for discovering broader pretraining assumptions.

The scenario author and grader may see the record; test readers must not see the expected answers or each other's responses. Require correct decisions and scope, not recitation. A candidate earns space when it addresses an evidenced wrong assumption or consequential missing knowledge; if the baseline already handles the case, seek evidence from other relevant failures before retaining it. One passing answer is not proof that every future worker will know it.

This is a workflow outline for Claude to reconcile with the recovered run, not a claim about how that run was implemented. Keep the writer's instruction small: **identify the mistaken assumption, show why it is expected, and verify that the correction prevents the mistake without introducing another.** Preserve evaluation evidence in maintenance records. No skill files or workflow code were changed in this review.

## P45: fidelity and comprehensibility are separate checks

On October 22 the curator supplied a screenshot and copied text of a proposed P-45 revision from the positions audit. The artifact URL could not be retrieved; this review concerns the supplied example, not the entire list. The screenshot distinguishes deletions from retained text; the copied text alone mixes both. The original ruling and its provenance have not been re-audited here.

**Finding:** removing historical material improves the entry but does not by itself make the remaining decision understandable. The difficulty is visible in the formulation, not necessarily a lack of Fortress knowledge on the reader's part.

- It mixes requirements with statements of implementation behaviour. “The checker runs” and “walk and the checker accept the same pairs” read as established facts, while “Still to build” points to remaining disagreements. State clearly whether agreement is a requirement or an achieved result.
- “No parameter pair required to exclude”, “refused families” and “reads otherwise” conceal important meaning in compressed technical wording. Name the objects and the operation precisely.
- “The paper's three overloading rules” neither identifies the paper precisely nor states enough of the decision to orient the reader. A reference may supply detail; it should not replace the explanation of what was decided.
- “No model line changes” compresses a consequential constraint into project shorthand. Identify the microGPT model program and state the exact restriction established by the ruling.
- A tracked diff makes historical and current wording compete for attention. Show the clean proposed entry first, with the diff available underneath.

### Proposed form, subject to checking the ruling

Lead with the decision. Follow with its essential scope, reason and exact technical conditions. Distinguish any remaining implementation work and point to its proper record. Preserve conditions that limit the decision; do not simplify away those conditions merely to improve fluency.

An illustrative opening is:

> **P-45 — Use the 2011 overloading model in the specification and both execution paths.** Allow overloads whose static parameters differ. The compiler's checker and the interpreter must apply the same rules when deciding which overload declarations are permitted.

This is a presentation example, **not a verified replacement for P45**. It must be checked against the curator's actual ruling before adoption, and it does not replace the technical requirements omitted from this short opening. In the final entry, identify the 2011 source precisely. Do not turn an implementation default or a writer's inference into the curator's decision.

### Two checks in the existing rewrite process

1. **Fidelity:** compare the proposed entry with the recorded ruling and its qualifications. Distinguish the curator's words from the coordinator's interpretation, an implementation choice and a fact about the current tree. Keep the provenance in history.
2. **Comprehensibility:** give a cold reader the clean entry and its declared prerequisite context, without the original discussion. Ask it to paraphrase what the curator decided, where it applies, what it requires, and what remains unfinished. Compare that paraphrase with the source-backed meaning. If the reader has to reconstruct the original discussion to resolve the wording, revise the entry.

The acceptance question is:

> Can a reader distinguish what Pavol decided, what the implementation currently does, and what remains unfinished?

A citation establishes where a statement came from; it does not establish that the statement communicates its meaning. This check does not require a type-theory lesson inside every position. It requires enough context to identify the decision before following pointers for technical detail.

This is a proposed improvement to positions writing, distinct from Revival's admission rule. A ruling remains part of POSITIONS even when a worker would already agree with it by default. No POSITIONS entry, skill or audit proposal was edited here.

## Review limits

This review sampled Revival and its sources. It did not reread the whole file, audit FACTS or POSITIONS, inspect transcripts, run builds, or test the numerical claims anew. Growth measurements are attributed to the existing scout report.

No need has been established for new permanent metadata or a new review role. Keep source checking and cold reading, but change their target from completeness of the landed changes to sufficiency of current guidance.

For the curator: approve or reject that selection rule and the removal of the mandatory Original / Resolution / Reason form. A useful contrast or reason may stay; it should earn its place by helping the reader understand or use the present system.
