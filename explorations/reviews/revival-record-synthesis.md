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

## Review limits

This review sampled Revival and its sources. It did not reread the whole file, audit FACTS or POSITIONS, inspect transcripts, run builds, or test the numerical claims anew. Growth measurements are attributed to the existing scout report.

No need has been established for new permanent metadata or a new review role. Keep source checking and cold reading, but change their target from completeness of the landed changes to sufficiency of current guidance.

For the curator: approve or reject that selection rule and the removal of the mandatory Original / Resolution / Reason form. A useful contrast or reason may stay; it should earn its place by helping the reader understand or use the present system.
