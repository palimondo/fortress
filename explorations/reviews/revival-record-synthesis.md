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

## Bounds and decisions left open

This review sampled Revival and its sources. It did not reread the whole file, audit FACTS or POSITIONS, inspect transcripts, run builds, or test the numerical claims anew. Growth measurements are attributed to the existing scout report.

No need has been established for new permanent metadata or a new review role. Keep source checking and cold reading, but change their target from completeness of the landed changes to sufficiency of current guidance.

For the curator: approve or reject that selection rule and the removal of the mandatory Original / Resolution / Reason form. A useful contrast or reason may stay; it should earn its place by helping the reader understand or use the present system.
