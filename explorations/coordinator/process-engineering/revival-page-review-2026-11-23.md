<!-- The review of 2026-11-23 of the revival page (`revival-story.html`, published as version 43, and `revival-story.md`), at the curator's word that night that it is again out of date and its chart needs care: each statement of fact checked against `main` at `a736555c44`, the record chart judged by the `dataviz` skill and his rule of few numbers, the words a new reader cannot follow, and the three decisions of his that the findings touch, with options, written read-only by an Opus worker for the coordinator. -->

# The revival page, reviewed on 2026-11-23

## What was asked

The curator, tonight: "I think we need to review this page. It is again out of date. Also the charts needs some TLC." This note checks every statement of fact on the page against the tree and the record as they stand on `main` at `a736555c44`, judges the chart, and lists the words that a reader new to the project cannot follow. It changes no file of the page and publishes nothing.

The page's purpose, in his words (`coordinator/HELD.md`, "Held in chat (2026-11-03)" 19:4x and "Held in chat (2026-11-04)" 20:0x and 20:1x): it closes his gap on what happened since the tree was unsealed, and gives every outside reader, such as Professor Ryu, an overview. It has little internal lingo, explains the process of batches, has few numbers, each explained once, and tells no process failures. It is one page, kept current after each landing, "or at least after each phase ends". On 2026-11-05 he also asked for a small set of pages that are "reviewed after each landing" ("Held in chat (2026-11-05)", 12:3x).

`revival-story.md` and `revival-story.html` hold the same text, word for word, apart from two things. The HTML has a date line at the top, and the two files give the chart different alt text. A word diff of the two shows this (command 1 below). So each finding below holds for both files. It also holds for the public copy on GitHub Pages, `docs/revival-story/index.html`, which is the HTML wrapped as a whole document.

## Summary

- **Fifteen statements are stale.** Nine are out of date or false (S1 to S9), and six are true but no longer the best summary (S10 to S15).
- **The most visible:**
  - The date at the top says 5 November, but the block below it is dated 23 November (S1).
  - The account of phase 4 is three paragraphs written at batch 25. It says that batches still move the native bindings "group by group" (S5 to S7). That work ended on 11-08, and fifteen batches since are not told.
  - The page contradicts itself on the reading under the distance's zero. The block "Where it stands" says that it landed at its default. Section 5 says that the curator has still to decide it (S3, S4). The contradiction began today at 17:25 UTC.
- **Who updates what.** The script rewrites only the block "Where it stands" and the chart. Nobody updates any other part of the page. The body was rebuilt on 2026-11-05 at batch 25, and since then it has had two sentence edits, both on 11-16.
- **The chart.** It is broken since 11-16:
  - The rows line runs off its panel, and since 11-21 so does the FACTS line.
  - Their labels are gone, and two stray dots sit outside their panels.
  - On a phone its text is about 6 px high.
  - In the dark theme it is a white slab.
  - It prints about a dozen numbers that the text never explains, and it names its series by file names that the page never uses.
  - Its rows panel counts every row ever filed: 1,126, of which 446 are closed and 118 record things that work.
- **Three findings would change a decision of his:**
  - D1: the page's rule that its body changes only when a phase ends.
  - D2: the fixed form of the block "Where it stands".
  - D3: his word that "the record chart stays".

## 1. Stale statements

### Who updates what

`explorations/coordinator/tools/revival-page/update.py` runs at each landing (its README). It does these things:

- It rewrites the block between `<!-- stand:begin -->` and `<!-- stand:end -->` in both files. The block has a fixed form: a heading, then seven labelled bullets.
- It regenerates the chart. It adds the landing's row to `record-growth/landings.csv`, runs `measure.py`, then runs `chart.py`.
- It sets the end date in the HTML chart's alt text.
- It writes the GitHub Pages copy.

It writes no prose. Its README says that "the form is a new decision, and this script changes with it".

Nobody updates the rest:

- the date line at the top of the HTML;
- the glossary;
- sections 1, 2, 3, 5, 6 and 7, and the introduction to section 4;
- the chart's caption;
- `chart.py` itself, last changed on 2026-11-05 (`713b16f3f0`), with fixed axis limits and fixed annotation texts.

The body was rebuilt as version 26 on 2026-11-05 at 07:39 UTC (`713b16f3f0`), at batch 25's landing. Since then, two commits on 11-16 changed one sentence each: `901fc9e488` (the reductions) and `a07d7e7e89` (the numerals). Every other commit since is a landing's run of the script (`git log -- explorations/coordinator/process-engineering/revival-story.html`).

### Out of date or false

| # | Place on the page | What it says | What is true now | Source | Stale since |
|---|---|---|---|---|---|
| S1 | Top, the date line (HTML only, line 85) | "5 November 2026" | The page was last updated at climb batch 35b's landing on 23 November. The block below the date says so. | `ec113ac4d4`; the block's heading | 2026-11-06 (`0868faa519`, batch 26, the first landing after the rebuild) |
| S2 | Section 3, "A batch": "Batches are numbered in sequence. A letter or a decimal..." | "A letter or a decimal, as in 6b or 6.5, marks a batch added between two numbers." The glossary has "batch: ... land together". | Since climb batch 31b, a letter marks a batch's second run, made on the first run's landed tree: 31b, 33b, 34b and 35b. Batch 35 was split into two runs because the disk holds about five tasks a run, so a batch can now land in two parts. The block's heading names "batch 35b" with no word on what the "b" means. Batch 32 also landed before batch 31. | PLAN.md, phase 4's batch lines; `coordinator/CLIMB-BATCH-35.md`, "The two runs" | 2026-11-17 (`479a455250`, the first block to name 31b) |
| S3 | Section 3, "The two measures", the last paragraph: "A reading is one interpretation..." | "Then the curator decides whether that reading stands." | Since his answer "1" of 11-23 (11:2x UTC), a default that is not consequential lands, is recorded, and does not go to him. The one reading under the zero is recorded as "landed, and not consequential". | `coordinator/HELD.md`, "Held in chat (2026-11-23)"; PLAN.md:39 | 2026-11-23 |
| S4 | Section 5, phase 3, the last paragraph: "The distance's zero holds under one reading..." | "...which the curator has still to decide." | The reading landed, and it is not consequential. The block in section 4 has said "landed at its default (section 5, phase 3)" since today, and it points the reader to this sentence, which says the opposite. | PLAN.md:39; F-294; `c989641990` (update.py's new form) | 2026-11-23 17:25 UTC (`c989641990`) |
| S5 | Section 4, the introduction: "A script rewrites the block below..." | "The rest of the page changes only when a phase ends." | The body changed on 11-16, mid-phase (`901fc9e488`, `a07d7e7e89`). As a rule, it has left 15 of phase 4's 18 batches untold (S13). | `git log` of the page | 2026-11-16 |
| S6 | Section 5, phase 4, paragraph 1: "The curator set the phase's order..." | "the native bindings first, then the switch-over" | The bindings are done (S7, S10). His decision of 12:34 UTC on 11-17 (P-33, review-queue item 512) sets the order now: the rest of the switch-over takes microGPT's slice first. The compile command can select the interpreter's library beside the compiler's, and each wall that only that library shows is fixed as its own gated task. The deletion of the compiler's library comes last. | P-33; `14c3e7e50f` | 2026-11-17 |
| S7 | Section 5, phase 4, paragraphs 2 and 3: "So each binding now names a static Java method..." and "The first batch of the phase built that form; later batches move the bindings group by group." | Every binding names a static method, and batches go on moving them. | 373 of the 401 bindings name a static helper, and so does every other binding except the 28 of `Reflect`. Those stay on the interpreter's glue by his answer of 14:03 UTC on 2026-11-10, since they are off microGPT's path. After batch 28, 52 bindings named glue: `Reflect`'s 28 and 24 of the numerals'. The numerals' 24 left the library with batch 29, and the count has not grown since. | F-299, F-32; PLAN.md, phase 4, the line on D2's 42; the block's history (372 of 424 on 11-08, then 374 of 402 on 11-09) | 2026-11-09 (batch 29) for "group by group"; 2026-11-10 for "each" |
| S8 | The block "Where it stands", "Next" | "no batch is planned yet; by the curator's decision, the rest of the switch-over takes microGPT's slice first." | The bullet has read "no batch is planned yet" at seven landings in a row, from 31b to 35b, while six batches were planned and run. The script has one other form, and it fits only a planned batch about "the natives and the code generator" (`update.py:192-217`). No batch since 11-09 was about the natives. Batches 35 and 35b were about something else: P-180, his decision of 11-23 that batches fix the defects that make the two implementations behave differently. "microGPT's slice" is not defined on the page (section 3 below). | `update.py:192-217`; PLAN.md, "Next" and phase 4's lines; P-180 | 2026-11-17 |
| S9 | Section 5, the heading "Phase 4, from 30 October: before the switch-over, open" | It gives no count of batches, though every earlier heading gives one. | Phase 4 has 18 batches so far: climb batches 23 to 35b. | PLAN.md, "Landed" and phase 4's lines | Since the rebuild, by design. Its count was 3 then. |

### True, but no longer the best summary

| # | Place on the page | What it says | What would serve the reader now | Source | Since |
|---|---|---|---|---|---|
| S10 | The block, "Native bindings that both implementations can call" | "373 of 401." | The number is right, but it reads as 28 bindings of work still to do. That step of phase 4 is finished. The 28 stay under the interpreter by his decision, off microGPT's path. The figure has stood at 372 to 374 since 11-08. | F-299, F-32 | 2026-11-08 |
| S11 | The block, "microGPT on the compiler" | "both programs stop at names that only the library declares, until the switch-over." | This is true of the default compile (F-97). It leaves out phase 4's largest step. With `FORTRESS_LIBRARY=one` the compile command reads the interpreter's library, and every gate compiles its fourteen core components to jars. A program compiled against them runs, as one that prints a line does (F-381, F-396, F-34). Against that library, the checker finds 42 error sites in the flat program, 23 of them array index bounds that its helpers do not write. That is phase 5's work (F-58, measured after batch 32). | F-381, F-396, F-34, F-58; PLAN.md, "Runs" | 2026-11-21 (batch 34b) |
| S12 | The block, "Checker count" and "Distance" | "0." and "0, under one reading..." | Both have been 0 since 24 October, through 23 batches. His word of 11-04 (20:1x): "no distance or checker count repeated for the climbs, since no reader of the page cares". Section 3 already gives both measures once, with their start and their zero. | F-53; HELD 2026-11-04 | 2026-11-05 (the rebuild's form) |
| S13 | Section 5, phase 4, the whole chapter | Three paragraphs on the bindings | It tells none of the 15 batches since batch 25, nor the probes of 11-10 to 11-13. A reader cannot learn these things from the page: (a) each built-in number type is now one `value object`, and the interpreter's own number objects `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` are gone, on both paths (P-178; batches 31b, 33b, 34b). (b) The numerals were rebuilt as the Working Draft's numeral types, which exist only at compile time (P-173, P-174, P-176; batches 29, 29b). Section 6 tells this, under the heading "at phase 3's close". (c) The interpreter's library can be selected, it compiles to jars, and compiled programs run against it (S11). (d) A rehearsal of the switch-over in a scratch tree ran three small compiled programs. The first compiled loop was about 100 times slower than Java (F-352, F-358). (e) The plain Java microGPT, the page's own yardstick ("as fast as a version written in plain Java", section 1), is written and timed at about 0.1 ms a step (F-355). His word of 11-04 kept "microGPT's timings" on the page. One caution: the page's 22 ms for Python (section 5) and F-355's 132 ms come from two different configurations, so the two cannot be compared as they stand. (f) The new rule of P-180 for batches (S8). | PLAN.md, "Where we stand" and phase 4; the entries named | It grew with each batch from 11-07 (batch 27) on. |
| S14 | Section 6, the introduction: "Section 5 tells the main changes..." | "This section adds the others, by area, at phase 3's close." | Its "Numbers" part was brought to phase 4's numerals on 11-16, so the section is now part phase 3 and part phase 4. Phase 4's other changes by area are missing. Examples: the number types as value objects (P-178), `override` compiled and checked, `≡` and `≢` over two booleans, and an exit from an `atomic` block that keeps its writes on both paths (F-400, F-403, F-401). | `a07d7e7e89`; PLAN.md, the live thread | 2026-11-16 |
| S15 | Section 3, "A batch", the seven steps and "The gate runs both implementations' test suites and counts the two measures below." | Seven steps, and a gate of suites and the two measures | The steps still hold in outline. Three things are missing. (a) Since 11-23, each batch also fixes defects where the two implementations differ (P-180). (b) After each landing, the agents' standing instructions (the skills) are updated and then read cold. The curator spends much of his reading on these. (c) Since 11-21 every gate also compiles the interpreter's library to jars on the compiled path (F-34). Point (b) is a judgement: it is internal, and it may rightly stay off the page. | `coordinator/climb-batch-workflow.md`, "Gate" and "After the landing: the coordinator's routing"; P-180; F-34 | 2026-11-21 and 2026-11-23 |

### Checked and still true

The following are as the rebuild of 11-05 left them, and nothing in the record since contradicts them.

- Sections 1 and 2: the team, the dates, the rule, the three sources and how a contradiction is decided. `Specification-1.0-frozen/fortress/fortress.tex:85` is the Working Draft. The revision boxes are headed "Revised by the 2026 revival" (`Specification/appendices/changes.tex:29`).
- Section 3's plan of six phases (P-33; PLAN.md, phases 4 to 6). Phase 5 still holds the instance rule of the POPL 2019 paper, and phase 6 still holds unboxed arithmetic.
- The historical parts of section 5. The first port's 10.9 s a step against Python's 22 ms is in `explorations/microgpt-port.md:233`. Phase 3 closed at `b81d86b75` on 2026-10-30. The revival's first commits are of 2026-08-18.
- The caption's "The ledger grows mostly while batches run" still holds. Since 10-14, the batches' run windows are 13 % of the clock (129 of 983 hours), and they hold 68 % of the new rows and 67 % of the new characters (command 3). It was 89 % to 10-13 (`record-growth/README.md`).
- Section 6's "still unbuilt ... complex numbers". The library declares none. His `CC64` is a test program (PLAN.md, phase 4, the stress test).

## 2. The chart

### What it shows

`record-growth.png` is 2160 by 3240 pixels, drawn by `record-growth/chart.py` from `series.csv` and `landings.csv`. It has three panels on one time axis, from 09-08 to 11-23:

- the gap ledger's size in characters;
- the gap ledger's rows;
- the characters of FACTS, INDEX and POSITIONS.

A hairline marks each of the 52 batch landings, and a band above the panels names each batch with a slanted leader line. Five annotations tell the record's rewrites:

- "peak 1.25M at batch 10";
- "10-08 rewrite: 1.25M to 541K, rows cut to 1,200 characters";
- "-92K: rung entries cut to the fact";
- "FACTS and POSITIONS 361K to 124K";
- "-55K rewrite".

### Does it still serve the page?

He kept it for one reason: it shows the batches, which the page explains ("Held in chat (2026-11-03)" and "(2026-11-04)": "the record chart stays"). It still shows when batches landed. But what it measures is the size of four internal files. An outside reader can read that as progress, as bloat, or as nothing. The page's text explains none of its numbers, and the chart's own text calls the batches "climb batches", "ladder" and "repair", words that the page never uses. Its annotations tell the record's own corrections: the ledger grew to 1.25M characters and was cut by 57 %. That comes close to the process failures that he asked the page not to tell.

### What is wrong with it, by the `dataviz` skill and his rule of few numbers

1. **Lines run off their panels: rows since 11-16, FACTS since 11-21.** `chart.py:81` fixes the rows axis at 0 to 1,000, and `chart.py:91` fixes the third panel at 0 to 400K. The ledger passed 1,000 rows on 2026-11-15 at 23:23 UTC and now has 1,126. FACTS passed 400K on 2026-11-21 at 00:10 UTC and now holds 421K (`series.csv`'s last row; command 2). Matplotlib does not draw an annotation whose point lies outside its axes. So the rows panel has no end label, FACTS has no end label, and there is no "FACTS peak" note. The end dots are drawn with `clip_on=False` (`chart.py:57`), so they land outside their panels. The rows dot sits at the 0 line of the characters panel, where it reads as a value of 0. The FACTS dot floats in the gap above the third panel. The first regenerations that showed these faults were `528872b3f1` (11-16) and `1327606f0d` (11-21).
2. **One annotation is wrong by construction.** `chart.py:104` labels the maximum of FACTS as "at batch 7b (09-30)". The maximum is now today's value, so the label would be false if it were drawn.
3. **Panel titles are covered.** The box "peak 1.25M" cuts "Gap ledger, characters", and the box "-92K" cuts "FACTS, INDEX and POSITIONS, characters". The skill asks for each rendered chart to be looked at for label collisions.
4. **It cannot be read on a phone.** The PNG is 7.2 inches wide at 300 dpi. A phone column is about 343 CSS px, which shows the image at 0.16 of its size. The 9 pt labels and ticks then render about 6 px high, and the 8.5 pt batch names about 5.6 px. The page's own text is 16 px. On a desktop column of about 740 px they are about 13 px. The figure is about 515 px tall on a phone and about 1,110 px tall on a desktop, more than one screen.
5. **It does not follow the dark theme.** The page defines dark tokens and a theme toggle. The PNG's surface is a fixed `#fcfcfb`, so in dark mode it is a bright slab the size of a screen. The skill asks for dark mode to be chosen, with its own colour steps checked against the dark surface. The ledger's near-black ink, `#3d3c39`, would vanish on the page's dark surface, `#1b211f`. On the light surface, the palette passes the validator, with a WARN for aqua at 2.74:1 contrast, which INDEX's direct label meets. Used on the page's dark surface unchanged, it FAILS the lightness band (orange L 0.671). The palette's own dark steps (`#3987e5`, `#d95926`, `#199e70`) pass every check against `#1b211f` (command 4).
6. **It has too many numbers and labels.** There are 52 batch names in a crowded band, among them "ladder", "repair", "N", "7C", "7R", "3.5", "6.5b". Batch 32 landed before batch 31, so their leader lines cross. About a dozen figures are printed: 1.25M, 541K, 1,200, 906K, -92K, -55K, 361K, 124K, 388K and 119K, plus the axis ticks. His rule is few numbers, each explained once. The text explains none of these.
7. **Its names do not match the text's.** The chart says FACTS, POSITIONS and INDEX. The text says "the list of facts, the list of the curator's decisions, and an index" (section 7).
8. **The rows panel overstates.** It counts every row ever filed. Of the 1,126 rows: 412 are fixed and 34 are duplicates or retired (446 closed), 118 record something that works, and 562 are open (command 5). The panel only rises, so it reads as "1,126 gaps, and growing", and it cannot show a fix. From batch 11 (10-09) to batch 35b (11-23), closed rows went from 152 to 446 and open rows from 389 to 562 (command 6). Both facts are part of the story, and the chart shows neither.
9. **It has no hover and no table view.** The skill asks an HTML chart for a hover layer and a table twin. The CSVs exist beside the chart, but the page does not link them.

The chart does follow some of the skill's rules. Each panel has one axis, with no dual axis. Categorical hues are in the palette's fixed order. There is a legend with direct end labels. Gridlines and axes are recessive.

### What I would change

The fix depends on D3 below. These are the changes I would make:

- **Replace the PNG with an inline SVG.** `update.py` can write it from the CSVs at each landing, in the page's own colour tokens, so that it follows both themes and stays legible at 343 px.
- **Use two small panels.**
  - The first shows the 52 batches as marks on a time axis, in bands for the phases: before the plan, phases 1 and 2, phase 3, and phase 4. Its labels are the phases, not the batches. This is the process that the page explains, and it matches the text's counts of batches per phase.
  - The second shows the gap ledger's rows as fixed against open, stacked over time, with only the two end values labelled.
- **Move the rest to the record's own README.** That covers the characters panels, FACTS, POSITIONS and INDEX, and the rewrite annotations. They belong to `record-growth/README.md`, not to an outside reader.
- **Take the axis limits from the data**, and add a table view in a `<details>` under the chart.

If the PNG stays, the smallest repair is this:

- limits from the data, and annotations computed from the data;
- no batch-name band;
- type at least 1.6 times larger;
- the page's names for the three files;
- a dark version. A `<picture>` element with a `prefers-color-scheme` source follows the operating system's theme but not the page's toggle.

Either way, `update.py` requires exactly one `<img src="record-growth.png">` with its alt-text form (its README, "When it stops"), so the script changes with the chart.

## 3. Words a new reader cannot follow

- **In the block "Where it stands":**
  - "batch 35b": the "b" means a second run, which the page explains otherwise (S2).
  - "landed at its default": "default" is not defined anywhere on the page.
  - "microGPT's slice": not defined.
  - "373 of 401": the page does not say what the 28 others are, or that they stay by decision.
  - Two measures of one zero, "checker count" and "distance". Their definitions need the checker's "stages", which is heavy for an outsider, and both have stood at 0 for a month.
- **In the chart:**
  - "climb batch", "ladder", "the eight-rung climb", "repair batch", and "rung entries cut to the fact";
  - the file names FACTS, INDEX and POSITIONS;
  - "first-parent commits of main";
  - batch labels such as "N", "7C" and "7R".
- **What is defined:** the glossary defines the rest of the page's terms before they are used, and each glossary entry is used on the page. It lacks entries for "run", "default" and "slice", which the block now uses.

## 4. Findings that would change a decision of his

**D1. The rule that the body changes only when a phase ends.** This was the rebuild's design: section 4's introduction, and the proposal of 11-03 ("phase 4's changes wait for its close"). His word of 11-03 was "kept up to date after each landing, or at least after each phase ends", and his word of 11-05 was "reviewed after each landing". Phase 4 has run 24 days and 18 batches, so under this rule the page has fallen out of date (S5 to S9, S13, S14). The options:

- (a) Keep the rule, but bring section 5's phase 4 chapter and section 6 up to today once now, and again at phase 4's close.
- (b) Make the body current after each landing. The step after the landing that already runs the orientation update would also carry the page's prose: a writer adds the landing's changes to the current phase's chapter, and a fresh reader checks them. This costs one more task a landing.
- (c) Give the current phase a short list "So far in this phase", one line a batch, which the script builds from PLAN's batch lines and the batch records' header sentences. This needs no writer, but those sentences are in the record's language, so the lingo comes back.

**D2. The block's fixed form.** It is seven bullets in a form fixed by `update.py`, and its README calls a change of form "a new decision". Three bullets no longer orient anyone. The checker count and the distance have been 0 since 10-24 (S12). The bindings are finished (S10). "Next" has been stuck since 11-17 (S8). The block also leaves out what moved (S11). The options:

- (a) Keep a fixed form with new bullets: the phase; microGPT under the interpreter; microGPT on the compiler, with the one-library step; and the next batch's subject, taken from its record's header sentence whatever the batch is about. Drop the checker count, the natives and the reading.
- (b) Cut the block to three bullets: the phase, microGPT on each implementation, and next.
- (c) Keep it as it is, and only fix "Next" so that it can name a planned batch of any subject.

**D3. "The record chart stays."** This was his word of 11-03 and 11-04, read then as no chart of measures per batch. The chart now fails on its own terms (section 2), and what it measures is not what the page tells. The options:

- (A) Repair the record chart in place, by the smallest repair of section 2.
- (B) Replace it with the chart of batches by phase and of fixed against open rows, as an inline SVG in both themes. The record's growth chart moves to `record-growth/README.md`.
- (C) Take B for the page, and keep the record chart, repaired, in the README for the record's own readers.

The open rows rise too, from 389 to 562 since 10-09, beside 294 more fixed. Option B shows both, and he may count the rise among what the page should not tell.

## The rest of a report

- **Defects.** These are defects of a tool of the record, not of the tree. `chart.py` fixes its axis limits (`:81`, `:91`) and its annotation texts (`:104`), so the chart clips and loses its labels as the record grows (section 2, items 1 and 2). `update.py`'s "Next" has one form for a planned batch, and that form fits only batches about natives and the code generator (`:192-217`; S8). No ledger row is filed for either: the ledger records gaps of the tree.
- **Decisions.**
  - I counted a statement as stale only where a source on `main` contradicts it, or where it leaves out something that has a FACTS or POSITIONS entry since the rebuild. Process detail that the page left out by design is not counted, except S15, which is marked as a judgement.
  - I took the reading's status from PLAN.md:39 and F-294, not from POSITIONS, which holds no entry of its own for it.
  - I counted open rows as `NEGATIVE-VERIFIED`, `NEGATIVE-BOUNDED` and `CONTESTED`, and closed rows as `FIXED`, `DUPLICATE` and `RETIRED`, by the row template's definitions.
- **For FACTS.** None.
- **Commands** (run from `/home/user/fortress`):
  1. The word diff of the HTML's text against the Markdown's: tags, styles and scripts stripped from the HTML, Markdown marks from the `.md`, then `difflib.SequenceMatcher` over the words. Only the date line, the title and the alt text differ.
  2. The last values of the series and when each passed its axis limit: Python over `record-growth/series.csv`, the first `utc` where `ledger_rows > 1000` (2026-11-15 23:23:23Z) and `facts_chars > 400000` (2026-11-21 00:10:44Z). The last row is `5ba0b04cd`: 1,126 rows, 906,122 ledger characters, FACTS 420,987, POSITIONS 119,452 and INDEX 388,040.
  3. The share of growth inside the batches' run windows since 2026-10-14. The windows run from `landings.csv`'s `run_start_utc` to the landing commit's time in `series.csv`, and the share sums the positive steps of each column whose commit falls inside a window: rows 291 of 425, ledger characters 312K of 462K, with windows of 129 of 983 hours.
  4. The palette checks: `node scripts/validate_palette.js "#2a78d6,#eb6834,#1baf7a" --mode light` (all pass, a WARN for aqua at 2.74:1); the same with `--mode dark --surface "#1b211f"` (FAIL for the lightness band, orange L 0.671); and `"#3987e5,#d95926,#199e70" --mode dark --surface "#1b211f"` (all pass), run from the `dataviz` skill's folder.
  5. The ledger's rows by status: split each line that matches `^\| *\d+ *\|` above `## Revival worklist` in `explorations/fortress-gap-ledger.md` on unescaped `|`, and count the third cell. The result is 489 `NEGATIVE-VERIFIED`, 412 `FIXED`, 118 `POSITIVE-VERIFIED`, 42 `CONTESTED`, 31 `NEGATIVE-BOUNDED`, 29 `DUPLICATE` and 5 `RETIRED`.
  6. The same count at each landing commit of `landings.csv` from batch 11 on, by `git show <commit>:explorations/fortress-gap-ledger.md`. Before the rewrite of 10-08 the status cells carried free text, so batches 9 and 10 do not sort. The counts run from 389 open and 152 closed at batch 11 (10-09) to 562 and 446 at batch 35b (11-23).
- **Questions for the curator.** D1, D2 and D3 above.
