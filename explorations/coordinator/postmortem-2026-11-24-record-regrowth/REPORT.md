<!-- Post-mortem of FACTS's regrowth from 90K to 427K characters (2026-10-13 to 2026-11-24): the rules and checks in place, what put the text into the entries, and why none stopped it; for the curator, written 2026-11-24 from the five scouts' files in evidence/ and checks at source. -->

# FACTS regrew: what went wrong

Dates are 2026, times UTC. Sizes are characters. "Shown": the evidence shows it. "Inference": this report concludes it. A source (file, "heading") is a scout's file in `evidence/`. "Checked": checked here at its source.

## 1. The answer in short

FACTS grew from 90K characters on 10-13 to 427K on 11-24. The rules on length were in place the whole time. No rule on length was enforced: the checks print lists, the one hold covers only growth, and no stage had the job of cutting.

What put the text in:
- Rung commits, whose workers' draft entries stayed at the length written: 58% of the growth. New entries came in at a median of 1.2K, 165 of 182 over 600. Workers are told to spend no effort on wording, since a later pass rewrites it. No batch stage ran that pass. From 11-03 the record-landing workflow ran it: 342 entry rewrites in 16 runs added 5K and brought 2 entries net under 600. (shown)
- The clarity rewrite of 10-22: 25%. The curator accepted that growth as the cost of clarity. Nothing trimmed it later. (shown)
- The coordinator's own filings: 15%. (shown)

Why nothing stopped it:
- The landing judge holds only an entry already over 600 that grows by more than its owed clause. It let 140 of 155 such growths through. A new long entry, or one that stays long, passes every check. (shown)
- `record.py` and `lengths.py` list the long entries and exit 0. At its own record writes the coordinator saw the list grow from 228 to 285, and acted on none. Reviews of 11 batches named long entries and left them to the coordinator, who ran no consolidation. (shown)
- The coordinator knew on 11-02 that the drafts were not cut, and first named the count to the curator on 11-24. (shown, checked)

## 2. The occurrences

- **09-27.** Boot rose from about 125K to 245K tokens. The curator refused a FACTS target under 25K. Decided: no size target; FACTS consolidated before each batch (P-130).
- **09-30.** FACTS peaked at 352K (08:00, `720db2671`); a consolidation at the curator's order ended the day at 309K (checked).
- **10-02.** Cause found: rung entries, about 14 KB a batch. The curator chose "option 2": a rung's entry "in a few lines, a few hundred bytes", cut by the gather if longer (`6a9661477e`). 65 entries shortened; 309K to 228K.
- **10-08.** The batch redesign removed "a few hundred bytes" and the cut (`e020159857`, checked).
- **10-13.** Seven slices took FACTS from 302K to 258K, median unchanged. The record rule's consolidation then cut it from 257.6K to 90.2K (`b67abe3d2`, 20:13). Rule: "near 600 characters", "a check, not a cap".
- **10-22.** The clarity workflow: 140K to 223K; entries over 600 from about 85 to 161.
- **11-02.** The record-landing workflow replaced "before each batch launches" (`5114bfeceb`, checked); its judge holds growth past 600 (`575d555945`).
- **11-16.** Light-boot post-mortem: FACTS 95K to 363K bytes. Decided: a light boot. No size rule changed.
- **11-23.** Process review: 290K to 403K bytes; "No rule sets a size at which the inflow stops." No rule changed.
- **11-24.** Full boot 590K tokens. FACTS 427K, 339 entries, 299 over 600, median 1,198 (checked). A cleanup, proposed as new, rejected at 07:35.

Sources: (words-and-prior-alarms.md, "Timeline"); (rules-text-history.md, "0", "8").

## 3. What the growth is

FACTS grew by 337,199 characters. By kind of commit (growth-by-source.md, "Totals per kind"; clarity and landing checked):

| kind | commits | net | share |
|---|---|---|---|
| rung commits: code, tests, draft entries | 128 | +194K | 58% |
| clarity workflow, 10-22 | 5 | +83K | 25% |
| coordinator's edits and filings | 57 | +49K | 15% |
| review folds and repairs | 31 | +7K | 2% |
| record-landing runs | 16 | +5K | 2% |
| consolidation | 1 | −2K | −1% |

By entry (same file, "3. New entries against grown entries"; checked):

| part | characters | share |
|---|---|---|
| 182 new entries, at birth | 220K | 65% |
| the same entries, growth after birth | 40K | 12% |
| 157 older entries, growth | 77K | 23% |

Rung commits wrote 129 of the births (169K), the coordinator's edits 41 (38K), the clarity workflow 11 (12K). The clarity workflow added 62K of the older entries' 77K.

What the added characters are. Each sentence counts once, in the first class whose marker it holds (entry-anatomy.md, "1. The parts, by script"):

| class | added | share |
|---|---|---|
| list of tests | +28K | 8% |
| "Detail:" pointer to a report | +23K | 7% |
| cites code by file and line | +41K | 12% |
| names a ledger row | +48K | 14% |
| points to another entry | +50K | 15% |
| commit hash, date, batch or rung | +9K | 3% |
| a repair or change word | +4K | 1% |
| bold title | +39K | 12% |
| the rest | +91K | 27% |
| prefixes, spaces, other lines | +3K | 1% |

The classes are markers, not judgements. Entries that cite file and line: 8 to 126; that hold a date, batch or rung: 90 to 267; a commit hash: 2 to 28. Test names per entry: median 1 to 2, largest 3 to 19 (same file, "2."). Of the 1,324 "rewritten" blocks in `FACTS-history.md`, 198 re-anchor line citations that a landing moved (this report's regex count).

## 4. Each rule and each check

Terms. A **rung** is one worker's part of a climb batch: code, tests, and draft entries. The **gather** folds the drafts into FACTS. The **commit stage** writes the gate's figures. **The pass** rewrites drafts into the record's form (`record.md`, "The pass"). The **record-landing workflow** brings the record in line with a batch after it lands, from climb batch 25: a sorter lists each change owed, a writer writes it, a checker checks it, an Opus judge applies or holds it. An **owed clause** is the text that a listed change needs. **`lengths.py`** prints each changed entry's length and names each entry already over 600 that grew.

**(a) The 600 measure.** "Keep an entry near 600 characters. This is a check, not a cap, and no reason to split: an entry may pass it if a question below keeps a sentence." (`record.md:31`; first at `7b434aae52`, 10-13 19:22; checked). Applied by: not named. In fact: entries over 600, 38 to 299. Why: no one is named to act on it, and it lets a long entry stay. The draft's budget, "a chunk's total stays under 600 characters times its entries", never reached `record.md`; "Name that reason in the pass's report" was cut 24 minutes after the first text (`f6bc1aa753`). (shown: rules-text-history.md, "1b", "1c")

**(b) The six questions.** Question 3 sends "a date, a batch, a correction" to the history; question 4 keeps "a line number, a list of sites, a timing" in the report. Applied by: a writer who reads `record.md`. In fact: see section 3. Why: the batch script quotes no question (checked), so rung workers and the gather never see them. The landing writer does, but its judge checks growth only. (shown)

**(c) What an entry holds.** "The test that gates it" and "the report section that holds the detail"; since 10-22 (`b6f5268e1d`, `6becc28f95`) also the conditions, the kind of evidence, and the decision "by number and subject" (`record.md:18`, checked). The landing brief adds the commit that bounds a measurement, and the landing's figures for a claim it extends (`entries.md:36-37`, checked). These parts match classes that grew: tests +28K, "Detail:" +23K, pointers to entries +50K. The rule names one test and one report section; entries now hold up to 19 test names and 12 report paths. Clauses that name a worker's or planner's choice: none at `b67abe3d2`, 17 clauses, 2.4K, at `9de4c69bc8` (this report's count). (words shown; lists inferred)

**(d) The workers' rule.** "Put its detail in a section of your report: the file:line citations, the commands with their output, and the measured numbers." And: "Spend no effort on the entry's wording: it is rewritten to the record's form after your work." (`fortress-repo` `records.md:82`, checked, no number; since `8ca0d7e615`, 10-13). In fact: births at a median of 1,192, 165 of 182 over 600. Why: it leaves the length to the pass (item f). (shown)

**(e) The batch script.** Rung brief: "its evidence (the file:line, the command with its output, the test) ... Completeness is yours; the record pass owns the final wording", the entry "in a few lines" (`climb-batch-workflow.js:623`). Gather: "in a few lines" (`:1045`). Commit stage: "0 failures" (`:1622`). No 600 for an entry, and no quote of "The pass" (checked). Why: the brief asks for file and line, and no batch stage cuts the draft. (shown: rules-text-history.md, "5")

**(f) The pass.** "In a batch, the commit stage runs it, with this part quoted in its prompt. After a lone worker, you run it." Step 5: "Report each entry over 600 characters, with the question that keeps its extra sentence." (`record.md:73`, `:84`; checked). No reader is named. In fact, 10-14 to 11-02: the commit stage never ran it. By hand, one pass after batch 14 cut 6K (`15a6d4365`); after batch 24 a record writer cut 3 of 17 long entries and left 11 untouched. Why: the script never received it; the passes by hand cut little. (shown: guards-in-action.md, "4")

**(g) "Run it on FACTS before each batch launches."** (P-130, 09-27; `record.md` from 10-13; checked). In fact: from 10-13 to 11-02 the commits that cut FACTS total 14K, against 193K added (this report's count); one is labelled a consolidation (`bd33a2f8b`, −2K). Replaced 11-02. (shown)

**(h) `record.py check`.** `SIZE = 600  # ...; reported, never refused`. It lists the long entries under "reported, not failing" and does not fail on them (`record.py:126`, `:1198-1201`, `:1303`; checked). No write command tests length (rules-text-history.md, "4"). In fact: it printed 228 long FACTS entries on 11-08, 252 on 11-16, 285 on 11-23. Why: it never refuses, and no one acted on the list. (shown: guards-in-action.md, "5")

**(i) The record-landing workflow.** Sorter: every entry the batch added or changed gets "the pass" (`sort.md:40`). Writer: "An entry already past 600 characters grows only by the clause that its change owes" (`entries.md:38`). Checker: a sentence past 600 stays with a named question (`check.md:27`). `lengths.py`: "Information only; exit 0". Judge: "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth" (`judge.md:24`). All checked. In fact, in 16 runs:
- 342 FACTS entry rewrites; FACTS +5K net; entries over 600 down by 2 net (guards-in-action.md, "1. The sixteen runs").
- `lengths.py` named 155 grown entries; the judge applied 140, held 15 (checked), 14 of them for length.
- No held text landed later. Held entries grew by other routes: F-405 1,613 to 2,307, F-333 1,445 to 1,759 (same file, "The held changes").
- The sorter named 47 changes "past 600 characters", against 343 of "the pass". Of the 43 FACTS entries so named, 27 shrank, by 3.7K in all; 9 grew; 7 stayed (this report's count).

Why: the hold covers only growth of an entry already long; nothing asks a new or long entry to shrink. The owed clause is itself new text, so most growth passes by the rule's own terms (inference). The workflow "takes no pilot", though its design note says "Only the curator's read of a small pilot caught length, register, history in an entry and the wrong home" (`record-landing-workflow.md:76`, checked). (shown)

**(j) The clarity writer.** "Keep each entry near 600 characters as a check, not a cap. Clarity comes first." (`record-clarity/writer.md:36`). Its judge judges meaning only. In fact: +83K on 10-22. Why: the brief puts clarity first, and the curator accepted the growth. (shown: rules-text-history.md, "7")

**(k) The reports, and what the coordinator did with each.**
- `record.py`'s list at its own writes, 11-08 to 11-23: no step on length (guards-in-action.md, "5").
- Workers' hand-backs: "All 11 are over 600 characters" (11-08), "Every new entry is over 600 characters" (11-13). No step on length.
- The judges' "each by its owed clause", 16 runs: each run landed as judged. Of the 15 held changes, it rewrote four entries of batch 26 by hand 34 minutes later, with other texts (`7ecb207b0`).
- Reviews of batches 17 to 25 and the batch records named long entries, some with "Home: the coordinator's consolidation" (checked). It ran no such consolidation. All 30 entries so named are still over 600; 25 are as long or longer than on 11-03 (F-252 2,086 to 4,330).
- 11-02 00:09, to the curator: "all 17 entries that batch 24 added or changed stand over the record's 600-character check, and the writer trimmed six" (checked). It then proposed the record-landing workflow, whose checks hold only growth.
- From 11-07 to 11-24 07:05 its chat named no count of long entries (checked). At 07:05 it put the growth to the curator as a new problem.

## 5. What the curator said and decided about the record's size

- **09-27 02:21** (checked): "I found your target of FACTS under 25k too aggressive." 05:52: "consolidation of facts skills happen before starts of batches, as workers read these and pay the cost". Became: P-130, then `record.md`'s "before each batch launches"; replaced 11-02.
- **09-29 21:27** (checked): "the target token count is, is not the important thing. Important thing is the fidelity of the record." Became: no size target in any rule.
- **10-02 10:52** (checked): "FACTS option 2 now. Before we launch batch 8." Became: "a few hundred bytes"; gone from the script 10-08.
- **10-12 11:23**, on recording dates and provenance: "What collapses, like it doesn't scale"; "there should be some post processing. Pass by the coordinator." Became: the history files and the pass.
- **10-13 17:23** (checked): "I really hope that the consolidated record is significantly smaller than before. Like that is a goal." At 15:38, in the coordinator's rendering only: "600 or 1,000, an entry needs a reason to be large". Became: the 600 check; its stated reason cut that evening (item a).
- **10-22 08:19** (checked): "I think that's just the cost we are willing to pay for Clarity." And: "The process needs to be encoded in the skill ... If the record starts drifting again." Became: the clarity tool; no rule says when the record drifts.
- **10-28 07:37** (checked; on POSITIONS): "We already invented this process. ... We have probably failed to encode how to use it correctly next time."
- **11-02**: yes to the record-landing workflow's eight defaults. Became: the workflow, with no pilot.
- **11-07 05:54**: "landing should trigger full load of POSITIONS and FACTS". **11-16 22:47**: a light boot, FACTS searched. Became: boot rules; no size rule.
- **11-24 07:03** (checked): "Full boot is now 590k of your context. ... We should probably run some garbage collection on FACT". 07:35 (checked): "Regarding your proposal on splitting the index and trimming the facts, reject it."

Source: (words-and-prior-alarms.md, "1", "3A", "4").

## 6. What the evidence does not show

- Why the 600 and the pass never reached the batch script on 10-13; why "a few hundred bytes" left it on 10-08; why the reason clause and the chunk budget were dropped. No commit message says.
- Whether the 140 applied growths were truly owed. Only the judges' words support it.
- Whether shorter entries keep decisions as good: the record test ran on 10-13 only.
- What "the rest", +91K, holds. The classes are regex markers.
- Why the sorter named only 47 "past 600" changes while 204 to 295 entries stood over 600.
- Whether the curator approved that `record.py` never refuses for size. His words on it were not found.
- The coordinator's chat before 11-07 was searched here with one pattern, not read.

Claims marked "checked" or "this report's count" were checked at source; all else is from the scouts' files as cited.
