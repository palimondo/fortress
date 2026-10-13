<!-- An adversarial review of the record store's design, written 2026-10-13 before an Opus worker builds it: what breaks, what is over-built, what is missing, the curator's eight comments answered with evidence from the files, the design as it should be built with each change marked, tonight's consolidation run through it, and the decisions for the curator's morning. -->

# The record store's design, reviewed

The design is right in its shape: numbered one-line entries, a history of provenance beside them, one writer and one reader, the gap ledger's way. Build it. Four things change before the builder starts. The history is rebuilt, not frozen: the curator said so at 17:01, and nothing live reads the old texts. A pointer is a number alone, not a number with title words that the tool keeps in step. The kinds of change are derived by the tool, never typed by a writer. And three queries and two checks are not built tonight. With these cuts the tool is about two thirds of the design's size.

The sections: 1 what I checked, 2 his comments answered, 3 the design as it should be built, 4 tonight's run, 5 the decisions for the morning, 6 how the figures were taken.

## 1. What I checked

- Every entry is one line. `FACTS.md` has 195 entries on lines 7 to 219 and `POSITIONS.md` 113 on lines 7 to 145; neither file has a continuation line. The longest entries are 6,558 and 8,236 characters. 161 of 195 and 64 of 113 are over 600.
- `ledger.py` does what the design cites: the lock (`ledger.py:595-606`), the history appended before the file is replaced (`:656-661`), the one-step write (`:618-630`), `check --base` row by row (`:890-912`), the vacant number (`:119`). Its section parser reads `## ` headings only (`:241`). `POSITIONS.md` has `###` subsections, so the record's parser needs both levels.
- `facts-extract.sh` runs `facts-extract.py`. A title query matches the words inside the bold title (`facts-extract.py:187-201`, `:714-729`). The parser would read `- F-87 **Title**` as an entry with no title, so the numbering commit breaks every title query unless `title_of` skips the number in the same commit. The design does not say this.
- The only query that reads a history file is `positions:DATE WORDS`, which falls back to `POSITIONS-history.md` (`:687-694`). It is used by dated notes alone: the batch manifests of plans 6.5 and 7b and the `CLIMB-BATCH-*` notes. The live batch script uses `positions:TITLE` keys only (`climb-batch-workflow.js:288-585`).
- Who cites an entry by title: 1,324 lines in 193 tracked files. In the skills, only the three `sources.md` files (124, 41 and 16 lines); no skill text does. Live documents: `PLAN.md` 51, `review-queue.md` 43, `climb-batch-workflow.md` 27, the kit's `key.md` 21, `BOOT.md` 1, `HELD.md` 1. The rest, about 1,000 lines, are dated notes.
- The record test's `fill.py` replaces `{FACTS n}` by line n of the file. Its README already says the line numbers drift between bases (step 4). After the first `apply`, lines shift, so the design's "its line numbers are the new numbers" (3.6.8) holds only at the numbering commit. `fill.py` must find the line that starts `- F-n ` instead; one line of code.
- The record files are unchanged since the kit's base `0f54a698b` but for one corrected sentence each (`c836b1f2d`, `8583d31d7`), so the kit's and the draft's line numbers are today's lines.
- `check-verbatim.py` compares whole entries as sets against a base (`check-verbatim.py:23-48`). It cannot check the numbering commit, as the design says.

## 2. His comments, answered

**16:46, on `trace`: does this replace the fact shell script; the workers' skill; backwards compatibility; one line.**

- No. `facts-extract.sh` stays the one reader. `record.py` is the one writer, as `ledger.py` is for the ledger. The design's new queries are queries of `facts-extract.sh`, and section 3 cuts `trace:` down to `history:F-87`.
- The writer is the coordinator's and the gather's tool. In a batch nothing changes for a worker: it writes the entry as prose in `record.md`, and the gather folds it in, now through `record.py apply` (`climb-batch-workflow.md:97-99`, `:160`). A lone worker whose brief lets it write FACTS runs `record.py add` instead of a hand edit (`records.md:73`). The `fortress-repo` skill's `records.md` changes in about six lines: cite an entry by its number, as a row is cited (`records.md:37` says by its bold title today); the queries `F-87`, `F-87+` and `history:F-87`; and the write call for a worker allowed to write. The skill writer makes that change tonight at step 5; until then `record.py --help` carries it.
- Backwards compatibility: the only change a reader sees is `F-87 ` after `- `. Title queries, `section:` and `positions:TITLE` work unchanged once `title_of` skips the number. A citation by title in a dated note resolves as now while the title holds, and through the former-titles line of the history (3.2 below) after a retitle. `fill.py` gets its one-line change. The dated `positions:DATE` fallback into the history stops finding anything after the rebuild; the dated notes that use it are history themselves, and `git show` answers them.
- One line: the record is already one line per entry, in both files, and the tool makes it a rule: `add` and `set` refuse a line break. The number stands at the line's start, so `grep F-87 FACTS.md` returns the whole entry, and `grep -c '^- F-' FACTS.md` counts the record. The history keeps the same property: each earlier text is one line, `- F-87 **...**`, so `grep '^- F-87 '` across both files lists every text the entry has had.

**16:54, on the ways: the ledger's, the same system everywhere.** Agreed; the design is way 1. Three places where it leaves the ledger's way are brought back: the ledger cites a row by number alone ("duplicate of row M"), has no frozen part with a hash, and prints a row with `show` and its history by number, not a trace through other files. Section 3 does the same.

**16:58, on pointers: sections, a flat file, no tags.** The sections stay as they are: FACTS's nine `##` sections and POSITIONS's `##` sections with `###` subsections. An entry's group is the heading it stands under, and that is the whole structure: no tags, no typed links, no stored index. A pointer is a number inside a sentence, and the sentence says what the link means. The consolidation moves a few entries between sections (the outline's 3.2.4 and 3.2.5); `set --section` does that and the tool records the move.

**17:01, on the frozen history: rebuild it now.** His comment wins over the design's "frozen byte for byte", on two grounds. It is his word, later than the position on record that the history holds "every earlier text" (`POSITIONS.md:130`), and that sentence of the position is rewritten tonight to say what the history now holds; this is decision 1 of section 5. And nothing live reads the old texts: no skill, no live document and no query but the dated `positions:` fallback.

- After the rebuild the history holds, under each number: one `numbered` block from the numbering script, naming the entry's line at the base and the titles it had before (from the old history's texts that match the entry by title: 487 exact and 92 opening matches of FACTS's 959 texts, 63 of POSITIONS's 328); then one block per change from the consolidation on, with its provenance line and the line it replaced. The provenance is what the scouts gather tonight: the report sections, the establishing commit, his dated words.
- What leaves the files: the 959 and 328 old texts, 2.5M bytes, in their dated sections. Of them, 334 and 251 match no current title and were never linked to an entry. Nothing leaves git: the parent of the numbering commit holds both files, and the new header names that commit, so `git show HASH:explorations/coordinator/FACTS-history.md` prints them. The scouts read the old texts from there tonight.
- The 46 "similar" matches the design leaves for the builder to confirm are not linked: that is judgement, not a script's work, and a missed match costs one citation its fallback.
- What keeps the dated notes' title citations working: the former-titles line, written once by the numbering script (about 580 titles, 70K bytes), and from then on the earlier text of each block, which holds the title at the time. A title query that matches no current title searches those and prints the entry with a line saying it was retitled (the design's 3.4.5, kept).

**17:02, on the history block: "sounds like YAML".** It is a record with fields: when, what kind, from where, which commit, who, why. Keep it as the ledger's Markdown block, with the provenance as one line the tool writes in a fixed order of fields. No YAML: a YAML block needs a parser the tools do not use, breaks the one-line grep, and is not the ledger's form. The writer never writes the line; it gives `--from`, `--commit`, `--by` and `--note`, and the tool stamps the time from the clock. If he wants the line as YAML later, it is one function of the tool.

**17:04, on the kinds of change, old titles, and garbage collection now, incremental later.**

- The writer never names a kind. The tool derives it: a new number is `added`; the section changed is `moved`; the number gone is `removed`, or `merged into F-n` when `merge` was run; anything else is `rewritten`. A retitle shows in the earlier text, so there is no `title was` field. The kinds exist for one check: a number that vanished was removed on purpose, not lost.
- Old titles served as the link, as he says, and numbers end that inside the record. Outside it, 1,324 lines cite entries by title, 181 of them in the skills' `sources.md` files. The numbering script rewrites the live documents' citations to numbers; the dated notes are not edited and resolve through the former-titles line. That line is a lookup table, not a link, and costs no writer anything.
- The picture is right: tonight one full pass, then small ones. After a batch the gather runs `apply` on the rungs' entries; after a lone worker the coordinator runs `set` or `add`. One correction: the small passes also retitle and merge. Today's one consolidation of FACTS retitled 56 of 209 entries and merged 10 (the "titles changed" tables of `facts-slice-1.md` to `-7.md`), so the tool keeps the former titles itself rather than leaving that to a writer.

**17:08, on what the history adds over git, and whether merges, moves and retitles happen.**

- They happen. Retitles: 56 of 209 entries today; about 56 comment lines of `FACTS-history.md` mention a retitle or a renaming, against 457 that say "same title". Merges: 10 today; 13 when POSITIONS was split on 2026-09-27 ("merged in POSITIONS.md with ..."); 24 of the ledger history's 698 blocks are duplicates. Moves between sections: FACTS was regrouped once, on 2026-09-24 (`FACTS-history.md:306-394`), and tonight moves a few entries. Splits: a few in each history; four comment lines of each mention one. Rewrites in place are the bulk: 150 of POSITIONS-history's 325 comment lines, and most of FACTS-history's 904 "moved from" texts.
- `merge` and `remove` are commands because pointers must follow: `merge` rewrites every `F-n` to `F-m`, and `remove` refuses while a pointer to the entry remains. That is integrity, not provenance.
- Commit messages do not cite FACTS entries; reports and tests cite entries and rows, and commits cite rows. Nothing changes there. The history is not for tracing a code change: `git log -S'F-87' --oneline -- FACTS.md` lists the commits that touched an entry once the numbers are in.
- What the history adds over git, honestly: the reason and the source per entry, which a commit message gives per commit over dozens of entries; the earlier line beside that reason in one read, with no git and in a shallow clone; and the identity of an entry through a merge. The earlier line costs the writer nothing, since the tool copies it. What the writer must give is `--from` or `--note`, the one thing git cannot give per entry. So the history is worth keeping at exactly that price and no more.

## 3. The design as it should be built

For the builder's brief. Each item ends with its status against the design: as designed, changed, or new.

**The entry.**

- One line: `- F-87 **Title.** Text.` in `FACTS.md`, `- P-48 **Title.** Text.` in `POSITIONS.md`. A number is never reused or changed. The title and the text are rewritten freely. (as designed)
- The tool refuses an entry with a line break. (new)
- A pointer is the target's number in the sentence that needs it: `It builds P-48.` Words beside it are the writer's and are not checked. The tool checks only that the number resolves to a live entry. No refresh of other entries' lines on a retitle. (changed: 3.1.2 and decision 4)
- A link is written once, in the entry whose sentence needs it. No "Built:" lists; `P-48+` lists the entries that build a position. (as designed)
- The detail's home is the report's path and a heading in quotes, resolved as `doc:` resolves one. (as designed)

**The history.**

- The files stay `FACTS-history.md` and `POSITIONS-history.md`. The numbering commit rewrites each from scratch: a header that names the commit holding the old file, then one `numbered` block per entry. Nothing is frozen and no hash is kept. (changed: 3.2.1)
- A block is the ledger's: `### F-87`, a blank line, one provenance line, a blank line, the earlier line verbatim. The provenance line, in this order: the UTC time from the clock, the kind, `from` each report section, `commit` the hash, `by` who, then the note after a colon. The `numbered` block has no earlier line; its note gives the line at the base and the former titles, each in quotes. (as designed in form; the `numbered` block's content changed)
- The kinds are derived by the tool: `added`, `rewritten`, `moved`, `merged into F-n`, `removed`, `numbered`. No `title was`. (changed: 3.2.3)
- The block keeps the earlier line. (as designed, decision 2)
- A POSITIONS change's `--note` holds his words with their UTC time where they are the reason. (as designed)

**The write.** `record.py` beside `ledger.py`, importing its lock, its one-step write and its word matching. Its commands:

- `add F|P --section TITLE FILE PROVENANCE`: the highest number ever used plus one, at the end of the section. (as designed)
- `set N [FILE] [--section TITLE] PROVENANCE`: the whole new line, with or without its number; the tool derives the kind. (as designed, the kind now derived)
- `merge N --into M FILE PROVENANCE`: removes N, rewrites M, rewrites every `F-N` pointer to `F-M`, one block each. (as designed)
- `remove N PROVENANCE`: refuses while a pointer to N remains, naming each. (as designed)
- `apply FILE PROVENANCE`: many changes from one file, checked against the resulting state, then written under one lock, or none. A new entry is written as `F-?1`, `F-?2` and so on, under its `## Section` heading, and the placeholder is replaced by the number everywhere in the file at apply, as the gather replaces `NEW-<rung>-<n>` for ledger rows (`climb-batch-workflow.md:160`). Each entry line may be followed by one indented line, its own provenance: `  from: PATH, "HEADING"; commit: HASH; note: WHY`. (as designed; the check against the resulting state and the placeholders are new)
- Provenance options: `--from PATH#HEADING` (repeatable; refused unless exactly one heading of the file holds it), `--commit HASH` (refused unless in `HEAD`'s history), `--by WHO`, `--note WHY`. A write with neither `--from` nor `--note` is refused. (as designed)
- Refused only for what breaks the store: a bad number, a pointer that does not resolve, no provenance, a line break. Never for size. (as designed)
- The lock file beside the record; the history appended first; the file replaced in one step. The tool does not commit. (as designed)
- The section parser reads `## ` and `### ` headings; an entry's section is the nearest heading above it of either level. (new)

**The read.** In `facts-extract.sh`:

- `F-87`, `P-48`: the entry. (as designed)
- `F-87+`: the entry, the entries it points to and the entries that point to it, each once, one level. (as designed)
- `history:F-87`: the entry's blocks, oldest first. Nothing else: the linked entries are `F-87+`, and the report sections are a scout's `doc:` read. (changed: replaces `trace:`)
- A title query that matches no current title searches the former titles in the history and prints the entry with one line saying it was retitled. (as designed)
- `title_of` skips the number, in the numbering commit. (new)
- Not built: `history-find:`. The old texts are in git, and `grep` over `git show HASH:FILE` finds them. (changed)

**The checks.** `record.py check [--base COMMIT]`. The first four fail; the rest are reported.

1. Every entry is one line of the form `- F-n **...**`; no number is on two lines.
2. Every number in a file has a `numbered` or `added` block, and every number in a history is in its file or its last block is `merged into` or `removed`.
3. Every `F-n` and `P-n` in either file resolves to a live entry.
4. With `--base`: every entry at COMMIT is its line now, or its line at COMMIT is the earlier line of a block in its history.
5. Reported: every `--from` path and every report section an entry cites resolves; the entries over 600 characters, with their sizes.

(as designed for 1 to 5 and 7 to 8; the quoted-words rule of 4, the frozen-part hash of 6 and `--outside` of 9 are dropped: changed)

**The numbering.** One commit by a script, `tools/record-number.py`, before the consolidation moves any line.

- Each entry's number is its line at the base: FACTS lines 7 to 219, POSITIONS 7 to 145. The unused numbers stay unused. (as designed)
- The script rewrites both history files as above, with the former titles matched by exact title and by a shared opening of 60 characters. (changed: 3.6.3)
- It converts the pointers by title inside the record to numbers where one entry matches (about 83 inside FACTS, 67 from FACTS to POSITIONS, 21 the other way), and lists the ambiguous ones. It does the same in `PLAN.md`, `review-queue.md`, `climb-batch-workflow.md`, `BOOT.md`, `HELD.md` and the kit's `key.md`, keeping the quoted words after the number. (as designed)
- It changes `fill.py` to resolve `{FACTS n}` by the number. (new)
- It checks that each entry is its line at the base with the number added and nothing else changed, that every title citation in a tracked file that resolved before resolves to the same entry after, and that `record.py check` passes. `check-verbatim.py` is retired after it. (as designed)
- The dated notes and the three `sources.md` files are not edited. (as designed)

**The tests.** `tools/test_record.py`, over a temporary copy of the record, as `test_ledger.py` does: one test per command, the refusals, `apply` all-or-none with a placeholder, `check --base` catching a hand edit, the title fallback, a `###` section. (as designed, the list new)

**The cost.** About 450 lines for `record.py`, 80 in `facts-extract.py`, 200 for the tests, 200 for the numbering script. One Opus worker, about 0.8M tokens written; it stops and reports at 1.2M. The record test's estimate ran 56 percent over (2.49M against 1.6M), so the stop is the figure to watch. (changed: the design's 1M for 1,300 lines)

**The order.** Build and test on a copy of the record. Number at one commit, with the history rebuilt and `title_of` changed in it. Then the chunks run through `apply`. The skill text follows at the skill writer's step. (as designed, the rebuild moved into the numbering commit)

**Not built.** Ways 2 to 5; a stored index or typed links; anchors to report lines; a refusal by size; links beyond one level; a second tool for the coordinator (as designed). And: a frozen history, `trace:`, `history-find:`, `--outside`, the refresh of pointer words, the `title was` field, a YAML form, a `dry-run` flag (a writer applies in its own worktree and hands over the file). (changed)

## 4. Tonight's run through it

- The chunks are the sections, 20 to 32 entries each. FACTS: "The checker and the one library" in three (63 entries); "Landed semantics" (32); "Execution model" with "The harness and the gate" (41, in two if the writer's context asks); the arrays, the specification, the map and the ledger (32). "The container" waits for the `cloud-container` step, as the outline's 3.2.5 says. POSITIONS: "The goal", "History he knows", "The standard and the sources" and "The specification's revision" (23); "The one library and the compiled checker" (26); "Numbers" and "Arrays and the model program" with the three staying entries of "How we work" (26). Nine chunks. The evicted entries are not rewritten; they leave whole to the history at the skill's step, with `remove --note` naming the home.
- The Sonnet scout of a chunk writes one file, at most 1,500 characters per entry: the number and title; for each report section the entry cites, whether `--check 'doc:PATH#HEADING'` resolves it, and its opening line; the commit that established the entry and the last that changed it (`git log --format='%h %ad %s' -S'<title words>' -- FACTS.md`); the status word of each ledger row named; the line of the latest earlier text under the same title in the old history (`git show HASH:FILE`) and its size; the entries that point to it (`F-n+`); for POSITIONS, his dated words on the entry from the old history's dated lines and the `CLIMB-BATCH-*` notes, each at most 300 characters with its date and time.
- The Opus writer of a chunk reads the entry definition, the chunk's entries and the scout's file. It writes the apply file: each entry's new line in the register, with its pointers by number, its merges and its removals; under each, its provenance line with `from` the sections that keep what it cut, `commit` the establishing commit, and a note saying why. It runs `apply` and `check --base` in its own worktree, reads the sizes, and hands the apply file to the coordinator with a short note: the points for the checker and each entry over 600 with the decision that needs it. The coordinator applies the file on `main`, runs `check --base`, commits the two files and pushes. Chunks apply one after another; the placeholders get their numbers there.
- The pilot: the checker's second chunk and POSITIONS's "The one library and the compiled checker", which hold the kit's FACTS 53, 55 and 58 and POSITIONS 48 and 60. Then the record test as its README says, with one change: one reader on the pilot copy only, and the grader against `key.md`. The pass mark is the first run's totals (27 of 30 for either copy, `grades.md`, "3. Totals") with no scenario below the new entries' first-run score. The scenarios whose entries the pilot did not rewrite read the same text and are the control. A loss is repaired entry by entry, as his 10:14 rule says, and the pilot runs again on those entries before the rest.
- Tokens written, an estimate: nine scouts at about 0.15M, 1.4M; nine writers at about 0.35M, 3.2M; the coordinator's applies, checks and commits, 0.3M; the test, one reader and a grader, about 1.0M. About 6M for the run, beside the builder's 0.8M. The last estimate of this kind ran 56 percent over.

## 5. Decisions for the morning

1. The history is rebuilt: the old texts leave the files, git keeps them at the commit the header names, and the sentence of "The record's form" (`POSITIONS.md:130`) that says the history holds every earlier text is rewritten to say it holds the provenance and the earlier lines from the numbering on. Default: yes, by his 17:01.
2. Each change's block keeps the earlier line, which the tool copies, against provenance only with git for the text. Default: keep the line; it costs disk only, and `check --base` and the record test then need no git.
3. The first numbers are the entries' lines at the base, with gaps, against 1 to N. Default: the lines; they keep the draft's, the outline's and the kit's names.
4. A pointer is the number alone, the words beside it free and unchecked, against the design's number with title words the tool keeps true. Default: the number alone; it removes the one cross-entry rewrite from the tool and is the ledger's way.
5. The former titles are kept, one line per entry, so that a dated note's citation by title resolves after a retitle. Default: keep; it costs 70K bytes once and no writer's time.
6. The history's form is the ledger's Markdown block with one provenance line, not YAML. Default: the block.
7. No "Built:" list in a POSITIONS entry; `P-48+` lists the entries that build it. Default: none.
8. The pilot is two chunks and a one-reader record test with the first run as the baseline, against the kit's two-copy blind run. Default: one reader; the first run's grades are the other arm.

## 6. How the figures were taken

At `69185928d`, 2026-10-13, in `/home/user/fortress`.

- Entries and lines: `grep -c '^- '` on both files; continuation lines by `awk` over the lines that are not entries, headings, comments or blank (0 in both); lengths by `awk` over the entry lines.
- The history files: `grep -c '^- '` (959 and 328 texts); `grep -c '^<!--'` (939 and 325 comment lines); the kinds by `grep -oE` on the comment lines' first words and on the words "same title", "retitl", "renamed", "merged in", "split", the last two with a few false hits ("merged-diff", a `split` function); the `## ` headings by their first word. The ledger history: `grep -c '^### Row'` (698) and the line after each heading, counted.
- Today's slices: the rows of the "The titles changed" tables of `facts-slice-1.md` to `-7.md` (56 rows, 10 "merged into", 4 "moved to the history"); the entry counts before and after from `facts-consolidation-check.md`, "The size" (209 to 195).
- Citations by title: `git grep -c -E '(FACTS|POSITIONS),? "'` over the tracked files (193 files, 1,324 lines) and over `.claude/skills` with `sources.md` excluded (0). Pointers inside the record: the design's own patterns, re-run (83, 67, 21). "Built:" in POSITIONS: 4.
- The dated `positions:` query's users: `git grep -c -E 'positions:20[0-9]{2}-'`.
- The record files against the kit's base: `git diff --stat 0f54a698b HEAD` on both (one line each).
- Section sizes: `awk` counting entries under each `##` or `###` heading.
