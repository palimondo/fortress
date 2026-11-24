<!-- The brief of the trial "Draft record rule and trial", 09:03 UTC on 2026-10-13, copied from transcript line 966. -->
You are an Opus worker in the Fortress revival repository (`/home/user/fortress`, branch `main`). Your reader is the curator, Pavol, who reads on a phone, and then the coordinating session. This is a reading and writing task on the project's record. You build nothing and run no Fortress program. Do not read session transcripts: the curator's words you need are quoted below.

Load the `fortress-repo` skill and read its part `references/records.md`. Before you write the page, load the `artifact-design` skill.

## Why this task exists

Last night FACTS was consolidated and fell only 15% (303K to 258K characters). The median entry stayed at 1.15K. The longest, "The true distance to the switch-over", went from 9.1K to 6.6K. The curator expected a cut of about a quarter and entries of a few lines. The brief that night told workers to keep paths, line references, rows and test names, to keep anything "a decision could rest on", and that size mattered less than evenness; its only checks guarded against loss. Nothing pushed for the cut. Your task is to state the rule he asked for, with a measure, and to show on the largest entries that it gives the shrinkage he wants. Your default is to cut. A check that nothing is lost is not your goal; the history file and the reports already keep everything.

## The curator's words, verbatim

On 2026-10-12, 11:23 UTC: "this default habit of the model to to record the dates of everything and provenance of of every effect is. What collapses, like it doesn't scale. So that is a, I think, a correction that I require here because that's how this repo became write only in in certain aspects, or it, it became too unwieldy to fit into the context." And: "we are instructing workers to to write their stuff directly into the facts and there should be some post processing. Pass by the coordinator."

On 2026-10-12, 16:42 UTC: "we need to establish a lens for what is needed for a record to be in, in, in facts. Like, are those all actionable things? Like, do, do we all, do we need them all? Or do we just rec- Do we need to record just a provenance to a report file where you look up the details of numbers? Like, why would you need to fill your context with, I don't know, what kind of measured numbers you'd have? Some are useful. Some are just like, if you were dumping the statistic file into your context or, or a phone book, like, let's establish a rule or what, what should be kept and where and why. Like we need a principle for, for what to keep in the record and what just gets a pointer to the report file. Does that make any sense? Like it needs to be something that can influence your or workers' decisions during your and theirs regular work."

On 2026-10-13, 08:01 UTC: "Is too much detail or duplicated and there were some very long entries."

On 2026-10-13, 09:00 UTC: "we need for the coordinator skill define specifically uh, how a good record in fact should look like. Like how it takes the record from workers' report and how it gets written up in the facts history record and in the current facts record." And: "my optimized build is about capturing the current status quo. And the instructions for the model should be that when it needs to question the provenance, it uses the historical record. And can look up the full report when needed. ... we need to have a tiered system and I think the historical record and the optimized build are stages and the final full report is the is the final uh, instance."

The coordinator's proposal of 2026-10-12, 16:43 UTC, which he never answered and which is not his wording: "A FACTS entry holds what changes what we do next: the rule of the tree (how a thing behaves on each path), the one number a decision rests on now, the test that gates it, and a pointer to the report that holds the rest. A sentence that changes no decision of a worker or the coordinator is not a fact. It's history or detail, and it goes to the history file or stays in the report." With its example: the 9K distance entry "is a report restated. What a worker's decision needs from it is four lines: the current count and distance, that both are reported and never red, where the per-site list lives, and that the count's 1 is the component's first error."

## Part 1: what the record already says

Find and quote, with file and line, every sentence of the record that states what a FACTS or POSITIONS entry holds, how long it is, what goes to the history file and what stays in a report, when the history or a report is read, and how a worker's report becomes a FACTS entry. Look at least in: `explorations/coordinator/README.md` ("How they are kept"); POSITIONS, "The record's form: an optimized build and a debug build."; the header comments of `FACTS.md`, `POSITIONS.md`, `FACTS-history.md` and `POSITIONS-history.md`; `explorations/protocol.md` principle 6; the `fortress-repo` skill's `references/records.md`; the `coordinator` skill's `references/roles-and-records.md`; `explorations/coordinator/climb-batch-workflow.md` (what the gather and commit stages write into FACTS); `explorations/coordinator/process-engineering/coordinator-shape.md` section 5; `explorations/coordinator/record-keeping-proposal.md`; `explorations/coordinator/postmortem-2026-09-27-record-keeping.md`; `explorations/coordinator/postmortem-2026-09-29/consolidation-review.md`; `explorations/coordinator/process-engineering/measures-judgement.md` (its "write-only repository" question). Use bounded `grep` and `sed -n` reads; do not read whole reports. Name every sentence that pulls toward keeping detail in an entry (for example "at full informational fidelity", "Nothing a resumed coordinator needs is lost") and every sentence that contradicts another. Say plainly which parts of the curator's three tiers are already on record and which are not.

## Part 2: the draft rule

Write the rule the coordinator skill will hold, short, in plain sentences, each marked (his words), (on record) or (new). It covers:
1. What a FACTS entry is: the current status quo only. Its title states the fact. It keeps the one number a decision rests on now, the test that gates it (one test or its name pattern, not a list) and a pointer to the report and section that hold the rest. A measure: a few lines; for this trial, under about 600 characters, and an entry over that says in your report which decision needs the extra. Line references, lists of sites, measurement narratives, timings, counts no decision rests on, and every account of how the fact was found stay in the report or go to the history.
2. What a POSITIONS entry is: what he decided, and why, in a breath; his words only where they are the position; what was built and the argument stay in the cited review or the history.
3. The three tiers and when each is read: the optimized build at every boot and in briefs; the history when a fact's provenance is in question; the report when the detail is needed. Say who reads which: the coordinator, and a worker given an entry in its brief.
4. The ingest: how a worker's report becomes a FACTS entry (who writes it, when, in what form), and what the coordinator's post-processing pass does to it before the next boot or batch reads it.
5. For each sentence of Part 1 that pulls the other way or contradicts, the one-line change that makes it agree.

## Part 3: the trial

Apply the draft rule to the eight largest FACTS entries and two POSITIONS entries, which the files hold now at these lines:
- FACTS 53 (6.6K, "The true distance to the switch-over ..."), 55 (4.3K, "Static arguments are inferred with coercion ..."), 166 (4.1K, "The team's latest word on types ..."), 94 (3.5K, "The compiled checker keeps a type parameter's bound list ..."), 145 (3.4K, "Walk refuses at load an object ..."), 87 (3.3K, "The compiled checker gives a call its expected type ..."), 58 (3.2K, "MicroGPT's own programs through the compiled checker ..."), 201 (3.2K, "A restart of the session's own process kills its background runs ...").
- POSITIONS 48 (2.7K, "A type parameter the arguments do not fix takes its bound ...") and 60 (2.2K, "The `comprises` passages read at the level of values ...").

For each entry: the new text; its size against the old; and each kind of thing cut, with where it lives now (the report and section, checked with one bounded `grep` that the report holds it, or "the history file" for provenance). Keep the opening words of a title that citations quote, as `facts-extract.sh --check` resolves them. Then give the totals for the ten, the new median and longest, and what FACTS and POSITIONS would come to if the trial's ratio held across each file. Do not edit `FACTS.md`, `POSITIONS.md` or their history files: the new texts live in your report until the curator approves the rule.

## What you write

1. The report, `explorations/coordinator/process-engineering/record-rule-draft.md`, with a one-sentence header comment, Parts 1 to 3 in that order, and a line at the end of `explorations/coordinator/INDEX.md` in the form of the lines there.
2. A page for the curator, as an HTML file at `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/record-rule/page.html`, titled "Record Rule Draft"; the coordinator publishes it. Its order: the rule (Part 2), short; what is on record and what is new; the trial, each entry's new text with its old and new size and the old text in a collapsed `<details>`; the totals. Plain short sentences with contractions, no tables, lists, numbers as K. Each larger section has a Select button beside its heading that selects that section's text for iOS Speak, and its evidence and references are gathered at the section's bottom, numbered by point, outside what the Select button selects. It works at phone width.

Commit only the report and the INDEX line, in one command (`git add -- <paths> && git commit -m … -- <paths>`), ending the message with exactly these two lines:

```
Co-Authored-By: Claude <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB
```

Do not push. Do not write a model identifier anywhere. Your final message is short: the commit hash, the page's path, the trial's totals (old and new size of the ten, the new median and longest), what of the three tiers is already on record, and any entry you could not bring under the measure, with why.
