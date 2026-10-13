<!-- A design, written 2026-10-13 at the curator's request before the FACTS and POSITIONS consolidation, for how the record is stored and written: six ways compared, the gap ledger's own first, and the one recommended (each entry one line under a permanent number, the history a dated provenance line per change with the earlier text the tool copies, one write call in a new `record.py` beside `ledger.py` that lands both, number queries in `facts-extract.sh` that return an entry with its linked entries and its history, the checks that replace `check-verbatim.py`, the numbering and the carry-over of the history files and of every citation by title, and its cost), with what not to build and the decisions left to him. -->

# The record's store and its tool: a design

The curator's question, 2026-10-13 (10:30, 15:32 and 15:51 UTC, dictated): before the consolidation of `FACTS.md` and `POSITIONS.md`, settle how the record is stored and written, so that the workers who consolidate it in chunks and the coordinator after them use one tool. One call writes an entry and its provenance, so nothing is written twice. A lookup surfaces an entry with the entries linked to it, "like a second level cache" behind the compressed record in context. The model's habit of a dated project memory is channelled into the history. Nothing is over-engineered.

Terms used here. An *entry* is one bullet of `FACTS.md` or `POSITIONS.md`. The *history* is `FACTS-history.md` or `POSITIONS-history.md`. *Provenance* is when an entry changed, what changed, where the change came from (a report and its section, a commit), who made it and why. A *pointer* is one entry naming another. A *chunk worker* is a worker that consolidates a slice of entries.

## 1. The recommendation

1. Each entry stays one line of `FACTS.md` or `POSITIONS.md`, with a permanent number in front: `- F-53 **The true distance to the switch-over is ...** ...`. A pointer is the other entry's number, in the sentence that needs it.
2. The history keeps, under each number, one dated block per change: a line of provenance, then the text the change replaced. The writer gives the provenance. The tool copies the earlier text. No one writes anything twice.
3. One call, `record.py set F-53 FILE --from 'REPORT#SECTION' --note WHY`, rewrites the entry and appends its history block, under one lock. `record.py apply FILE` does a chunk of entries in one call. The chunk workers and the coordinator use the same commands.
4. One query, `facts-extract.sh 'trace:F-53'`, prints the entry, the entries it points to and the entries that point to it, its history oldest first, and the report sections it cites. `facts-extract.sh 'F-53+'` prints only the entry and its linked entries, which is a brief's slice.
5. `record.py check` replaces `check-verbatim.py`, and keeps every pointer resolving.
6. A new script, `explorations/coordinator/tools/record.py`, built on `ledger.py`'s model; about 1M tokens written by one Opus worker. The first numbering is a script, with no model.

This is the gap ledger's way, applied to FACTS and POSITIONS: numbered rows never renumbered, one tool that is the only writer and appends the history in the same call, and `facts-extract.sh` reading through the tool's parser (POSITIONS, "The gap ledger's form."; FACTS, "The ledger's rows stand in fifteen topic sections ..."; `ledger.py:633-663`, `append_history` and `replace_rows`; `facts-extract.py:25`, `:259`). It is also the shape both models give by default for project memory: a short current-state file rewritten in place, and a dated history apart from it, each item with its date, who produced it, the commit and a pointer to the report (`baseline-interview/answers/opus-5.5.md:17`, `:35-38`; `fable-5.1.md:5`, `:9`).

## 2. The ways

For each: the entry, what the history holds, how one write lands both, how a lookup returns an entry with its linked entries and its history, and what it costs to build.

1. **The ledger's way (recommended).** The entry is a numbered line in the Markdown file, read whole at boot. The history holds, per number, a provenance line and the earlier text. One command takes the lock, appends the block to the history, then rewrites the line (`ledger.py:656-663` does this for a row). A lookup reads the files: pointers are parsed from the text, the entries that point back are found by a scan of the two files (360K bytes), and the history blocks by number. About 1M tokens to build (section 3.7).
2. **Provenance only, the earlier texts left to git.** The same entry and tool, but the block holds only the provenance line and a commit; the earlier text is read back with `git log -G '^- F-53 '` and `git show`. Its new blocks are about a quarter the size, since a provenance line is shorter than an entry. A lookup walks git: `FACTS.md` has 309 commits and a `git log -p` of 10.9M bytes, and a clone with shallow history cannot answer at all (the platform's session tool clones 50 commits unless told otherwise). It saves disk, not tokens, since no one reads the history whole. About the same to build, plus the git reader.
3. **The history as the source, FACTS and POSITIONS built from it** (event sourcing: the record is its list of changes, and the current file is computed from it). The entry is the same, in a generated file. The history holds every text each entry has had, the current one included, with its provenance. A write appends an event and rebuilds the file. It turns "optimized build" into a literal build, but a hand edit of `FACTS.md` is lost at the next build, the current text is stored twice, and the 900 earlier texts must be turned into events. The model edits a current-state file directly by default. About 1.5M.
4. **A database** (SQLite, or JSON lines) with Markdown views for the boot read. Entries, events and links are tables, and a lookup is a join. Diffs in git become unreadable, the views are a second form of the record to keep in step, and it is the flat-file database he does not want engineered. About 2M.
5. **One file per entry**, as architecture decision records are kept: `record/F-53.md` holds the entry and its history, and `git log` of the file is its history for free. The boot reads 308 files, or a build joins them into FACTS. About 1.5M.
6. **Numbers only, no write tool** (the draft's item 10). The entry is numbered and `facts-extract.sh` resolves numbers and lists the entries that point back. The history is copied by hand, as now, and checked by `check-verbatim.py`. 0.3M to 0.5M. It keeps the double write he calls wasteful, and the hand copy has failed before: the POSITIONS split's first pass lost 20 entries' text (`cda7d86a6`, `tools/check-verbatim.py:7-8`), and climb batch 6.5b's gather needed a follow-up commit for three texts it had replaced (`compile-ladder/climb-batch-6.5b/RECORD.md:119`).

## 3. The design

### 3.1 The entry

1. Form: `- F-87 **Title.** Text.` on one line, `F` for FACTS and `P` for POSITIONS. Every entry is one line today, in both files. A number is never reused or changed; a merged or removed entry's number stays in the history (the draft's items 5 to 7; he said yes to the numbers at 11:05, and the pointer's form is new). The title and the text are rewritten freely.
2. A pointer is the target's number, with the opening words of its title in quotes where the sentence needs them: `It builds P-48 ("A type parameter the arguments do not fix ...").` When the target is retitled, the tool rewrites those words in both files in the same call (3.3), and the check refuses words that do not open the target's title (3.5). So a pointer is never stale.
3. A link is written once, in the entry whose sentence it belongs to. Its reverse is not written: the read finds it (3.4). A FACTS entry says which decision it builds, and a POSITIONS entry carries no "Built:" list, since `P-48+` lists the entries that build it. This answers the first question that Part 3b of the record rule draft left with him (a "Built:" pointer of about 260 characters per entry), if he agrees.
4. The report section that holds the detail is named in a form the check can resolve to one heading: the path, then the section's heading words in quotes (`Detail: \`compile-ladder/rung-instance-bound/REPORT.md\`, "The four timings"`).
5. What an entry holds, and its size, are the record rule's (draft, Part 2); the store does not change them.

### 3.2 The history

1. The files stay `FACTS-history.md` and `POSITIONS-history.md`. Their text today stays byte for byte, frozen above a heading `## By number` that the numbering adds. The tool appends only below it.
2. A block has the form of the ledger history's `### Row N` blocks (`ledger.py:633-640`): the number, one line of provenance, the earlier text verbatim.

       ### F-87

       2026-10-20 14:05Z · rewritten · from `compile-ladder/rung-instance-bound/REPORT.md`, "The question" · commit `1a2b3c4d5` · by consolidation chunk 3 · cut to the form; the sites stay in the report

       - F-87 **The compiled checker gives a call ...** (the line as it stood)

3. The kinds of change: `added` (no earlier text), `rewritten` (the tool adds `title was "..."` when the title changed), `moved` (to another section), `merged into F-n`, `removed`, and `numbered`, once per entry, at the numbering, naming the lines of the frozen part that hold the entry's earlier texts (3.6).
4. It holds both provenance and earlier texts. The provenance is what is new: a history text today carries only "moved DATE from FACTS.md § SECTION" and sometimes a comment (`FACTS-history.md:7`, `:3150`). The earlier text costs the writer nothing, since the tool copies it, and costs only disk, since no one reads the history whole.
5. What it adds over `git log -p`:
   - Why, and from where, per entry. A commit message covers a commit that changes up to dozens of entries, and does not say which report section each came from.
   - One entry's story in one read. `FACTS.md`'s 309 commits are 10.9M bytes of diff, and an entry is one long line, so a diff shows only that the line changed.
   - Identity through a merge, a move to another section or a retitle. Git sees one line deleted and another added.
   - The texts from before the numbers, which git cannot find by number.
   - The same answer in a shallow clone.
6. The habit it channels: the urge to write "corrected on 14 Oct: the row-590 sentence was false" inside an entry goes into the call's `--note`. The tool stamps the date and time from the clock, so the writer never types one. The entry stays timeless, and the story is kept where the history's reader finds it.
7. A POSITIONS change's `--note` holds his words with their UTC time, where they are the reason (the draft's item 25: his quotes go to the history at their dates).

### 3.3 The write

1. `record.py add F|P --section TITLE FILE [provenance]` gives the entry the highest number ever used in its file plus one, puts it at the end of the section, and appends an `added` block.
2. `record.py set N [FILE] [--section TITLE] [provenance]` rewrites entry N in place (FILE holds the whole new line, with or without its number), or moves it, appends a `rewritten` or `moved` block with the earlier line, and refreshes the quoted title words of every pointer to N in both files.
3. `record.py merge N --into M FILE [provenance]` removes N, writes M's new text from FILE, appends a block to each, and rewrites every pointer to N in both files to M. A split is an `add` with `--note "split from F-87"` and a `set` of F-87; no command of its own.
4. `record.py remove N [provenance]` removes N and appends its last text. It refuses while a pointer to N remains, and names each.
5. `record.py apply FILE [provenance]` does many of these from one file: each entry's line as it should stand (`F-?` for a new one under its `## Section` heading), each optionally followed by its own provenance line. It checks all of them first, then writes all of them under one lock, or none. This is the chunk worker's call and the gather's.
6. Provenance: `--from PATH#HEADING` (repeatable; refused if no heading of the file holds the words, resolved as `facts-extract.sh doc:` resolves one), `--commit HASH` (refused unless in `HEAD`'s history, as `ledger.py close` checks), `--by WHO` (`coordinator`, `climb batch 14 gather`, `consolidation chunk 3`), `--note WHY`. The tool stamps the date and time. A write with neither `--from` nor `--note` is refused: the provenance is what the history is for.
7. A write is refused only for what would break the store: a bad number, a pointer that does not resolve, missing provenance. Never for size: the 600-character measure is reported (3.5), since the draft makes it a check and not a target.
8. Order and safety, as `ledger.py`: a lock file beside the record (`ledger.py:595-606`), the history appended first, then the file replaced in one step (`write_text`, `:618-630`). The tool does not commit; the caller commits the entry file and its history together.
9. Who uses it:
   - A chunk worker reads its slice (`facts-extract.sh 'section:HEADING'`), writes the new texts in an apply file with `--from` each report section that keeps what it cut, runs `record.py apply FILE --by 'consolidation chunk N'`, then `record.py check --base BASE`, and commits the two files.
   - In a batch, the section writers hand their apply files to the gather, which runs them one after another, as a gather folds a rung's `record.md` today (the draft's item 41). So parallel writers never meet in one file, and new numbers come from one writer at a time (the ledger's D7, numbering during parallel batches, is still open).
   - The coordinator, after a lone worker: `set` or `add` with `--from` the worker's report section and `--by` the worker.
   - A worker whose brief lets it write FACTS: the same, with `--from` its own report.

### 3.4 The read

`facts-extract.sh` stays the one reader of the record, its new queries reading through `record.py`'s parser, as its ledger queries read through `ledger.py`'s (POSITIONS, "The gap ledger's form.").

1. `F-87`, `P-48`: the entry.
2. `F-87+`: the entry, every entry it points to and every entry that points to it, each once. One level: the rest of the record is in context.
3. `trace:F-87`: the entry; its linked entries both ways; its history oldest first, the provenance lines first and the earlier texts after them; and the report sections the entry and its history cite, printed through `doc:`. The output comes in facts-extract's parts of 28K bytes (`facts-extract.py:47`), part 1 opening with what was found and the size of each piece, so `--check` shows the sizes alone.
4. `history-find:WORDS`: one line for each text of a history file that holds every word: its line, its dated section and its opening. This reaches the earlier texts the numbering could not link to a number (3.6). Today no query reads `FACTS-history.md` at all (the draft's item 8).
5. A title query that matches no current title falls back to every title an entry has had (from its `title was` lines and the earlier texts linked to it), and prints the current entry with a line saying it was retitled. So a citation by title in a dated note keeps resolving after the title is rewritten.

His questions of 10:30, answered by these:
- To follow a pointer: the entry is in context; `F-87` prints it, `F-87+` with its neighbours.
- To list the positions on a fact, or the facts on a position: `F-87+` or `P-48+`.
- To look it up in the detail records: `trace:F-87 --check`, then part 1 for the provenance lines. The earlier texts and the report sections are a Sonnet scout's read, as the draft's item 37 says.

A brief's slice: the brief names the numbers it hands over, and `facts-extract.sh 'F-87+' 'P-48+'` prints each entry once, verbatim, under its number, for the brief to quote word for word (the draft's item 34) or for the worker to run. A rung's briefing in the batch script is such a command, with numbers where it has titles today.

### 3.5 The checks

`record.py check [--base COMMIT] [--outside]` replaces `check-verbatim.py`. It fails on the first six; the rest are reported.

1. Every entry has the form `- F-n **...**` or `- P-n **...**`, and no number is on two lines.
2. Every number in a file has a history, a `numbered` or an `added` block.
3. Every number in a history is in its file, or its last block is `merged into` or `removed`. No number vanishes. This is `check-verbatim.py`'s "in neither".
4. Every pointer in either file resolves to a live entry, and its quoted words open that entry's title.
5. With `--base COMMIT`: every entry at COMMIT is its line now, or its line at COMMIT is the earlier text of a block in its history. This catches a hand edit that skipped the tool, entry by entry, as `check-verbatim.py` does file by file and `ledger.py check --base` does row by row (`ledger.py:890-912`).
6. The frozen part of each history file has the hash its `## By number` heading records.
7. Every `--from` path and every report section an entry cites resolves.
8. The entries over 600 characters, with their sizes.
9. With `--outside`: every `F-n` or `P-n` in the tracked files is a number ever used.

The pass runs `check --base` before its commit, in place of `check-verbatim.py` (the draft's items 49 and 51). Its tests go in `tools/test_record.py`, over a temporary copy of the record, as `tools/test_ledger.py` does for the ledger.

### 3.6 Numbering, and carrying over the history and the citations

One commit, by a script, before the consolidation moves any line.

1. Each entry's number is its line at that commit: FACTS' 195 entries stand on lines 7 to 219, POSITIONS' 113 on lines 7 to 145. This keeps the names the record rule draft, its page and the record test already use: the draft's FACTS 53, 58, 76, 78, 87, 94, 141, 145, 166, 175 and 201, and POSITIONS 48 and 60, are those lines today, and the test kit's `{FACTS n}` "stands for the entry on line n" (`record-test/README.md:9`). The draft and the kit hold about 240 such citations. The unused numbers (24 in FACTS, 32 in POSITIONS) stay unused, as the ledger's row 148 does (`ledger.py:119`), and a new entry takes the highest number ever used plus one. The other way, file order from 1, loses those names.
2. The script checks that each entry now is its line at the base with the number added, and nothing else changed. `check-verbatim.py` cannot check this commit, since every line changes; it is retired after it.
3. The earlier texts already in the history files stay where they are, unchanged. The script links each to the entry it belongs to, in that entry's `numbered` block, where the match is by title. Measured with facts-extract's own parser: of FACTS-history's 959 texts, 487 have a current title exactly and 92 more open with one; 46 are similar (difflib ratio at least 0.6), and 334 match none. Of POSITIONS-history's 328, only 63 match a title, since its older entries are dated lines with no bold title. The exact and opening matches are linked; the similar ones are listed for the builder to confirm; the rest stay unlinked and are found by `history-find:`. Nothing is lost, since no text moves.
4. The pointers by title inside the record become numbers: about 80 between FACTS entries ("... below", "... under SECTION"), 67 from FACTS to POSITIONS and 21 from POSITIONS to FACTS. Each must resolve to the same entry before and after; an ambiguous one is listed for a fix by hand.
5. The live documents get the same rewrite: `PLAN.md` (56 citations), `review-queue.md` (40), `climb-batch-workflow.md` (29), `BOOT.md` and `HELD.md`.
6. The skills: `fortress-repo`'s `references/records.md` gets the new queries and the write call when the skill text is written (he: "we will describe the usage of that in the skill"). The two `references/sources.md` files keep their titles, which resolve through the fallback of 3.4.
7. The dated notes (reviews, rung records, the `CLIMB-BATCH-*` files, the process notes: about 950 lines citing an entry by title) are not edited. Their citations resolve through the fallback. The script checks that every title key in a tracked file that resolved before the numbering resolves to the same entry after it.
8. The record test kit then runs on the consolidated record as it stands: its line numbers are the new numbers.

### 3.7 The tool, its commands, and the cost

1. A new script, `explorations/coordinator/tools/record.py`, beside `ledger.py`, importing its lock, its one-step write and its word matching. Not an extension of `ledger.py`, whose 975 lines are one format's tool, most of them the eight-cell row template, which a FACTS entry does not have. Not an extension of `facts-extract.py`, which is the reader; the ledger set the split of one writer and one reader.
2. Its commands: `add`, `set`, `merge`, `remove`, `apply` and `check`. The reads are `facts-extract.sh`'s: `F-n`, `F-n+`, `trace:F-n`, `history-find:WORDS`, and the title fallback.
3. One general `set` that takes the whole new line, not a command for each kind of change. `ledger.py`'s narrow commands left writes with no route: 16 notes of climb batch 11's records not written, no command to correct a claim or set a reproducer, and a `CONTESTED` row that cannot be closed (`PLAN.md`, gather.1 of batch 11 and gather.2 of batch 12).
4. A one-off script, `tools/record-number.py`, for 3.6, kept for the record as the other tools are.
5. The estimate: `record.py` about 600 lines, the queries about 150 in `facts-extract.py`, `test_record.py` about 300, `record-number.py` about 250. One Opus worker, about 1M tokens written, 0.8M to 1.5M. The last estimate, the record test's, ran half again over (1.6M estimated, 2.49M written; the draft, Part 4, "The cost"). The skill text is the skill writer's, about 0.1M to 0.2M more.
6. The order: build and test on a copy of the record; number at one commit; write the skill text; then the consolidation runs its chunks through `apply`.

## 4. What I would not build

1. A database, a generated `FACTS.md`, or one file per entry (ways 3 to 5). The Markdown files stay the record, read whole at boot and edited in place, as the model does by default; each of those adds a second form of the record to keep in step.
2. A stored index of links, or typed links (builds, rests on, contradicts). The links are in the text, where a reader sees them; the reverse links are computed at each read, over 360K bytes. A stored index is a copy, and copies go stale, which is the problem one home solves. The sentence around a pointer says what the link means.
3. Anchors to lines of a report. The unit is the section: a report's lines move when it is edited, and the report is the final instance. A line goes in an entry only where no report holds the fact (the draft's item 19).
4. Any edit of the frozen history texts, or of the citations in dated notes. Both are reached by query, and nothing in them is lost.
5. A history read from git (way 2). It cannot say why or from where, needs a full clone and a walk of 309 commits, and cannot find the texts from before the numbers.
6. A refusal by size, or a tool that shortens text. The text is the writer's judgment; the tool records it and reports sizes.
7. Links followed more than one level, and a second tool for the coordinator. The rest of the record is in context, and one tool for the chunk workers and the coordinator is what he asked for.

## 5. Decisions not taken, for him

1. Should the first numbers be each entry's line, which keeps "FACTS 53" of the draft, its page and the test kit, with gaps, or the file order from 1, with no gaps? Recommended: the line.
2. Should the history keep the earlier text beside the provenance (way 1), or the provenance only, with git for the texts (way 2)? Recommended: both, since the tool writes the copy and only disk pays for it.
3. Should a POSITIONS entry carry no "Built:" list, the entries that build it being found by `P-48+`? Recommended: no list. It answers Part 3b's first question.
4. Should a pointer carry the opening words of its target's title, kept true by the tool, or the number alone? Recommended: the words, which cost about 50 characters a pointer and spare the reader a lookup.

## The figures, and how they were taken

At `77ab93037`, 2026-10-13, in `/home/user/fortress`.

- Entries, lines, one line each: `grep -n '^- ' explorations/coordinator/FACTS.md` (195 entries, first on line 7, last on line 219; POSITIONS 113, lines 7 to 145); no line of either file is a continuation (`awk` over the lines that are not entries, headings or comments: 0).
- The draft's numbers are lines: `sed -n 'Np'` on both files for the 14 numbers of the draft's Parts 3 and 3b; each prints the title the draft names.
- Git: `git log --oneline -- explorations/coordinator/FACTS.md | wc -l` is 309; `git log -p --format=%h -- explorations/coordinator/FACTS.md | wc -c` is 10,949,012.
- The history's texts matched to titles: `facts-extract.py`'s `parse_bullets` and `norm` over both files, exact title, a shared opening of 60 characters, then `difflib` ratio at least 0.6 on the first 200; FACTS-history 959 texts, 487, 92, 46, 334; POSITIONS-history 328, 62, 1, 14, 251.
- Citations by title: `git grep -o -E '(FACTS|POSITIONS),? "[^"]{8,}'` over the live documents (FACTS 62, POSITIONS 21, PLAN 56, review-queue 40, `climb-batch-workflow.md` 29, BOOT 1, HELD 1); `grep -o -E '\.\.\." (below|above)|" under [A-Z][a-z]+' FACTS.md` (83); `git grep -c -F -e 'FACTS, "' -e 'POSITIONS, "'` over all tracked files (1,319 lines).
- No `F-n` or `P-n` token occurs in the record today: `grep -oE '\b[FP]-[0-9]+\b'` on both files prints nothing.
