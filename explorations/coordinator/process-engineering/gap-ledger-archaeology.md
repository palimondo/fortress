<!-- How the 638 rows of the gap ledger were written and read, how consistent they are, how many repeat each other, and a proposed form (row template, a consolidation that keeps every row number, a tool, the skill's text); read-only archaeology of 2026-10-08 for the curator -->

# The gap ledger: how its rows were written and read, and a form for them

Reader: the curator. This note proposes and changes nothing. Section 4 holds the proposal and the decisions it leaves to the curator.

## 0. Scope, terms and method

Scope.

- Read-only. Main was at `a6b594799` when I started. The ledger last changed in `0cf66dbdb` (2026-10-03), so every number below is for that text.
- The ledger is `explorations/fortress-gap-ledger.md`: 1,250,447 bytes, 1,219 lines.

Terms.

- **Row**: a table line that starts `| N |` above the heading `## Revival worklist`. There are 638.
- **Cell**: one of the eight columns `# | claim | status | class | spec citation | reproducer | found by | notes / workaround`.
- **Closed row**: a row whose defect was fixed. Section 2.7 shows five ways the ledger marks one.
- **Restatement** (this note's word for a duplicate): a later row that records the same defect at the same site as an earlier row, so that its claim could be one sentence of the earlier row.
- **Sibling**: a row with the same mechanism as another row at a different site, operation or path. It needs its own reproducer and fix.
- **Era**: a span of dates in which rows were entered the same way (the table in 1.1).
- **Length**: characters of the whole table line, counted by script. `awk` `length` counts bytes and gives totals 0.3% higher.
- **Climb batch**: one run of the batch workflow script (`explorations/coordinator/climb-batch-workflow.js`). It starts rung workers in parallel worktrees. **Rung**: one unit of a batch's work. **Skeptic**: an agent that checks a rung worker's work. **Judge**: an agent that rules between a worker and a skeptic. **Gather**: the stage that folds every rung's `record.md` (its finished lines for FACTS, the ledger and the handover) into the record files. **Merged-diff review**: the last review of a folded batch.
- **Run**: one of the microGPT ports of era A (`run-b`, `run-b2`, `run-c`, ...), each with its own `gaps.md`.
- **Home**: where a defect that a rung measures and does not repair is recorded (`climb-batch-workflow.js:1014-1018`). Home 1: repaired, with a passing assertion in the rung's test. Home 2: the specification settles it; an expected-failure test whose file name starts `XXX`. Home 3: the specification is silent; a test that pins today's behaviour and a ledger row.

Method.

- Rows. A script split each row on ` | ` and checked the result against `awk '/^## Revival worklist/{exit} /^\| [0-9]+ \|/'`. Row 83 sits in a seven-column table (section 1.5, item 2); every other row has eight cells.
- History. I read the file at each of the 175 commits that touch it (`git log --format='%h %ad %s' --date=short -- explorations/fortress-gap-ledger.md` and `git show <commit>:explorations/fortress-gap-ledger.md`). A row's era is the date of the first commit that holds its number.
- Instructions. I read `explorations/coordinator/climb-batch-workflow.js` (search "ledger"), the batch `RECORD.md` files, the reviews and the skill.
- Transcripts. 735 agent transcripts sit under `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/` (316 top-level, 419 under `workflows/`). A script printed only the tool calls whose input names the ledger, with each result's size. It found 5,756 calls in 562 transcripts. The earliest is 2026-09-18T23:01. I did not read the coordinating sessions' own transcripts, and the transcripts of era A (2026-09-08 to 09-16) are not in this directory.
- Duplicates and siblings were found by script and labelled by reading. Their counts are floors (section 3.1).

## 1. How rows were written and read

### 1.1 Who wrote rows, and when

| Era | Dates | Commits that touch the ledger | Rows entered | How they were written |
|---|---|---|---|---|
| A | 2026-09-08 to 09-16 | 17 | 309 (rows 1-310, 148 vacant) | Each microGPT run and the APL study wrote a `gaps.md` "in the ledger's column format". A merge worker re-ran every reproducer, gave each row its ledger number and folded repeats (`b9c8ee33e`, `6f97fe3af`, `2b43a3e7e`, `e26d254f3`, `b176a4b79`). |
| B | 09-17 to 09-21 | 37 | 43 (311-353) | Ladder rungs 1 to 8, the repair batch, the first climb batches. The coordinating session committed a rung's row with the rung. A follow-up commit added the closing hash, as in "Ledger row 80: record the commit that closed it" (`0be58b257`). |
| C | 09-22 to 09-27 | 57 | 102 (354-455) | Climb batches 3 to 6b. A rung worker wrote `record.md`; a gather agent folded it into the ledger. |
| D | 09-28 to 09-30 | 43 | 103 (456-558) | Climb batches 6.5, 7, 7R, 7C, N, 7b, the same way. |
| E | 10-02 to 10-03 | 21 | 81 (559-639) | Climb batches 8 to 10, the same way. |

Facts about the 175 commits.

- 88 add rows. 146 change an existing row.
- By subject line: 71 are code, library or specification changes that carried a ledger edit; 36 touch the ledger alone; 17 are "Fold the review's corrections"; 17 are "Record the landed commits' hashes and the gate summary"; 21 are batch, plan or facts routing; 8 are ladder rungs; 5 are in-progress snapshots of a merge.
- Edits to an existing row almost never shorten it. Of 759 edits, 497 made the row longer and 199 shorter. The largest cut is 35 characters (row 185, 2026-09-15). 146 of the 199 shorter edits cut four characters or fewer, the size of `<short hash>` becoming a hash. The rows gained 308,062 characters after they were entered and lost 814.
- At least 60 agents edited the ledger text with an ad hoc command (97 calls; 87 are `python3` or `sed` heredocs and 10 are the Edit tool). The count is a floor, because I read the first 600 characters of each command. Example (`agent-a9883e548a5299e81.jsonl`, 2026-09-26T18:07): a `python3` heredoc that reads the ledger into `s`, sets `old` to a phrase of one row, runs `assert s.count(old)==1`, and writes back `s.replace(old, new)`.

### 1.2 What the writers were told

1. Era A. `explorations/experiment/RUN_C_BRIEF.md:42`: "`gaps.md`: new rows in the ledger's column format (`#`, claim, status, class, spec citation, reproducer, found by, notes / workaround), numbered from 140 upward, with a runnable reproducer for each; rows that only repeat a ledger row are cited by number, not rewritten." Run B2's worker also wrote that every row has "10 pipe-separated fields with `\|` escaped, same as the ledger" (`explorations/run-b2/probes/REPORT-gaps.md:4`).
2. The ledger's own legend, `explorations/fortress-gap-ledger.md:45-55`. It lists five status words and seven class words and says "One row per claim." Its text is the first commit's:

        $ git log --format='%h %ad %s' --date=short -S'**class** — ' -- explorations/fortress-gap-ledger.md
        b9c8ee33e 2026-09-08 Merge the three microGPT runs' gap findings into one verified ledger

3. The batch script, first written in `cb242a2d8` (2026-09-19) and unchanged in this respect:
    - `climb-batch-workflow.js:1029`: `record.md` carries "the ledger note (which row, and exactly what to append - rows are never renumbered or moved, they are cited from thirty-five reports)".
    - `:1140`: "Number a new row provisionally from [LEDGER_FROM] in record.md and say that it is provisional: another rung may open one too, and the gather assigns the final numbers in manifest order".
    - `:1643`: the gather appends the note "to the notes of the row it names", writes the literal `<short hash>` where a hash is needed, appends each new row "to the ledger's last table" and corrects every citation of a provisional number.
    - `:1265`: a skeptic's check 11 is to "search explorations/fortress-gap-ledger.md with terms of your own for rows that bear on the rung".
    - `:1288` and `:1645`: a skeptic may propose rows in `recommendedRows`; the gather opens or refuses each.
4. Closing a row. `PLAN.md:619` (first written in `94cbbb9f3`, 2026-09-17): "a closed row gets 'fixed <commit>' appended to its notes". The skill says only "Close a fixed row in place" (`.claude/skills/fortress-repo/references/records.md:11`).
5. The skill, created 2026-10-04 (`70736a81d`). `records.md:7` repeats the five status words and seven class words. `records.md:13` was added today (`917b37939`) and tells the reader how to find rows.

No text says what each of the eight cells holds, how long a row may be, what a closed row looks like, or when a row is a restatement. Two terms in use are in no legend: `FIXED` (55 rows) and `MEASURED` (3 rows).

### 1.3 How they found the format

They read it from the rows.

- **The last rows and the header.** The first ledger commands of the repair-R2 agent (`workflows/wf_9777a563-c5e/agent-aeb1a8e0cf57ed883.jsonl`, 2026-09-18T23:01 to 23:15) find the file, print row 317, then find the highest number: `grep -oE "^\| [0-9]+ \|" explorations/fortress-gap-ledger.md | grep -oE "[0-9]+" | sort -n | tail -3`. About 150 commands have a description (a field the tool call carries) that mentions the row format, the columns, the header or the highest row number (a count by words, so approximate).
- **The vocabulary, counted from the data.** At least 21 agents ran a command described as a check of the status or class words, or of how fixed rows are marked. Examples:
    - `workflows/wf_3b5a273c-a80/agent-ae00790bb0279c246.jsonl`, 2026-09-19T08:31, "Check the ledger's class vocabulary": `grep -oE '\| (NEGATIVE-VERIFIED|POSITIVE-VERIFIED|UNVERIFIED[A-Z-]*) \| [a-z][^|]*\|' ... | sort | uniq -c`. It guesses a word, `UNVERIFIED`, that the ledger does not use.
    - `agent-a9883e548a5299e81.jsonl`, 2026-09-26T18:02, "List status values used in ledger rows": `awk -F' \\| ' '/^\| [0-9]+ \|/{print $3}' ... | sort | uniq -c | sort -rn | head -30`.
    - `workflows/wf_8a018276-f71/agent-a9ccb449d77f6d3ed.jsonl`, 2026-09-28T00:51, "See the status wording of a fixed row": `grep -c "POSITIVE-VERIFIED (fixed"`.
    - `workflows/wf_4ba3c084-2b3/agent-a368e1e3b5dc1fb4a.jsonl`, 2026-09-29T06:38, "Check ledger status vocabulary": `grep -n 'POSITIVE-VERIFIED (the fix' ...; grep -c 'FIXED'`.
- **Each writer found a different convention** because the ledger holds several (section 2.7). A batch gather then checked the result by counting cells, the number sequence and "no duplicate" (for example `explorations/compile-ladder/climb-batch-6b/RECORD.md:98`: "every row eight columns ... 379's and 427's status cells take the fixed-row form").

### 1.4 How they read the ledger

A second script paired each ledger command with the size of its result.

| How the ledger was read | Calls | Median result (characters) | 90th percentile | Largest | Results over 10,000 |
|---|---|---|---|---|---|
| `grep` with `cut -c`, `-o`, `-c` or `wc` | 2,049 | 1,605 | 6,690 | 27,287 | 107 |
| `grep` without them | 394 | 1,396 | 10,294 | 29,004 | 42 |
| `sed -n`, `awk`, `head`, `cat` on the file | 598 | 2,031 | 9,972 | 26,274 | 59 |
| `facts-extract.sh 'ledger:ROW'` | 348 | 3,056 | 24,487 | 27,656 | 93 |
| a script that opens the file | 167 | 561 | 5,078 | 27,136 | 6 |
| other | 61 | 877 | 2,268 | 22,887 | 1 |
| **all** | **3,617** | | | | **308** |

- The ledger returned 12.3 million characters to agents in these calls. No result is over 30,000, which is where the Bash tool cuts.
- Bounding the width is a habit nobody wrote down: 84% of the 2,443 `grep` calls already use `cut -c`, `-o`, `-c` or `wc`. The skill's rule to "never print whole matching lines" (`records.md:13`) names the habit.
- The per-row reader came late. `ledger:ROW` first appears in `facts-extract.py` in `7feff615d` (2026-09-27), 11 days after the ledger reached 310 rows. `ledger-find` is from today (`324101232`). Until then the only way to find a row by its words was `grep`.
- Reading is concentrated on long rows. Of 605 rows fetched by `ledger:ROW` (a call may fetch several), rows over 3,000 characters (15% of the rows) account for 57% of the fetches; ten rows account for 44% of the characters. Row 447 (9,979 characters) was fetched 26 times. Lengths are at the head; rows were shorter when some fetches happened.
- The ledger as a whole is about 400K tokens (`records.md:13`). The 12.3 million characters returned are about 4 million tokens at the same ratio.

### 1.5 What went wrong

1. **Rows with the wrong number of cells.**
    - A claim or a note held an unescaped `|` (for example `||` or `|x|`), so a renderer splits the row. 13 rows had a cell count other than eight at some commit. Six still do: 314, 369, 374, 377, 470, 473. Row 314 has been so since `b52a32ac2` (2026-09-17), 152 commits.
    - The merged-diff review of batch 10 found three: "310, unescaped pipes in three ledger rows (the review)" (`explorations/reviews/batch-10-review.md:306`). Its commit: "The ledger's notes on rows 433, 488 and 604 have their pipes escaped, so each row is one table row again" (`c14bbce87`). Rows 628 and 636 were repaired one commit later inside a rung's commit (`833420ce4`).
    - The gather's cell-count check lives with a fixed list of exceptions: "the seven rows without ten are the base's seven (83, 314, 369, 374, 377, 470, 473)" (`explorations/compile-ladder/climb-batch-6.5b/RECORD.md:132`).
    - A validator existed in era A (run B2's worker "validated: every row has 10 pipe-separated fields", `REPORT-gaps.md:4`). It was not kept. `explorations/coordinator/tools/` has no ledger script.
2. **A table with another set of columns.** Row 83 sits under "Contested / unsettled" in a table `# | claim | status | class | reproducer | found by | why unsettled`: seven cells, no spec citation.
3. **Statuses outside the set.** 174 of 638 rows (27%) (section 2.1).
4. **Classes outside the set.** 417 of 638 rows (65%) (section 2.2).
5. **Rows in the wrong section.** The sections are "by area" (`records.md:7`). All 329 rows from 311 on, entered after 2026-09-16, are in section 10, "Bytecode-compiler path (a different execution path)". 101 of them do not name the compiled path, the checker or code generation (a keyword test on the claim and class cells; for example row 345, "the interpreter's api declares `NN64.signed`...").
6. **A number used twice.** No number is used twice in the file, and no row's claim was replaced by another claim in 175 commits. Row 148 is vacant on purpose (`fortress-gap-ledger.md:947-949`: it "duplicated row 8 and was merged into its notes, and the gap is kept"). Number clashes happened in parallel streams and were settled at merge: runs B and B2 both numbered from 84 (`explorations/process-records/07-run-b.md:67`, `08-run-b2.md:85`), and runs C2 and C3 both from 156 (`explorations/run-c3/gaps.md:3`: "Run C2's rows ... took 156 to 163 at the merge", with a map such as "156 → 133 (folded), 157 → 156 (folded), 158 → 164").
7. **A row opened without searching.** In batch 6.5b "Provisional row 521 was the ledger's row 337, fix and all. *The ledger not searched; not in the briefing*" (`explorations/reviews/batch-6.5b-review.md:342`). A review of the workers' myopia counted "what the ledger already held (four cases)" (`explorations/reviews/worker-global-decisions.md:9`).
8. **Derived parts that nobody maintains.** The ledger's "Counts by status" ends in `| **total rows** | **309** |` (`fortress-gap-ledger.md:938`); the table has 638. The revival worklist was "Re-derived 2026-09-15 over rows 1-287" and extended to row 310 (`:829`). `FACTS.md:210` says the counts "are derived by script". No such script is in the repository.
9. **Citations of the ledger by line.** 149 citations of the form `fortress-gap-ledger.md:LINE` stand in 88 files outside the ledger. They break when a row grows. `FACTS.md:210` cites `:886` for the counts (they are at `:967`) and `:746` for the worklist (at `:827`).
10. **Closed rows marked five ways** (section 2.7).
11. **Rows only grow.** See 1.1: +308,062 characters after entry, −814.

## 2. Consistency, measured

### 2.1 Status words

The legend names five: `POSITIVE-VERIFIED`, `NEGATIVE-VERIFIED`, `NEGATIVE-BOUNDED`, `CONTESTED`, `RETIRED`.

    $ awk '/^## Revival worklist/{exit} /^\| [0-9]+ \|/' explorations/fortress-gap-ledger.md | awk -F' \\| ' '{print $3}' | sort | uniq -c | sort -rn | head -4
        354 NEGATIVE-VERIFIED
        100 POSITIVE-VERIFIED
         17 FIXED
         12 NEGATIVE-VERIFIED + POSITIVE-VERIFIED

| What the status cell holds | Rows |
|---|---|
| exactly one of the five words | 464 |
| two statuses (`NEGATIVE-VERIFIED + POSITIVE-VERIFIED`, or `NEGATIVE-VERIFIED (at <hash>), POSITIVE-VERIFIED (the fix, <hash>)`) | 72 |
| `FIXED` alone (17) or `FIXED (climb batch 8, rung I, <hash>)` (38) | 55 |
| one of the five and a qualifier (`(measurement)`, `(not narrowed)`) | 44 |
| `MEASURED (climb batch 8, rung Q)` | 3 |

By first word: `NEGATIVE-VERIFIED` 437, `POSITIVE-VERIFIED` 132, `FIXED` 55, `NEGATIVE-BOUNDED` 6, `RETIRED` 3, `MEASURED` 3, `CONTESTED` 1, other 1. Three of the five legend words are nearly unused.

### 2.2 Class words

The legend names seven.

| What the class cell holds | Rows |
|---|---|
| exactly one of the seven | 221 |
| `—` (all 108 in era A; no row since has an empty class) | 108 |
| one of the seven and a parenthesis, such as `implementation gap (code generation)` | 142 |
| a word outside the seven | 167 |

The commonest outside words: `checker defect` 39, `interpreter defect` 28, `library defect` 10, `divergence, specification silent` 10, `library design gap` 9, `codegen defect` 6. The workers added the area (checker, walk, code generation, library) because the legend has no cell for it and the sections stopped carrying it (1.5, item 5). The parentheses carry it too: `(interpreter)` 16, `(code generation)` 12, `(checker)` 8.

### 2.3 Rows by length

Characters of the table line (script count; the same rows by `awk` bytes are within 0.3%).

| Length | Rows | Characters | Share of characters |
|---|---|---|---|
| under 500 | 57 | 18,521 | 1.6% |
| 500 to 999 | 145 | 112,805 | 9.5% |
| 1,000 to 1,499 | 144 | 176,134 | 14.8% |
| 1,500 to 1,999 | 96 | 164,619 | 13.8% |
| 2,000 to 2,999 | 100 | 243,360 | 20.5% |
| 3,000 to 3,999 | 39 | 133,131 | 11.2% |
| 4,000 to 5,999 | 33 | 157,354 | 13.2% |
| 6,000 to 7,999 | 17 | 117,843 | 9.9% |
| 8,000 to 9,999 | 6 | 53,062 | 4.5% |
| 10,000 and over | 1 | 12,075 | 1.0% |

Total 1,188,904 characters; mean 1,863; median 1,373; 90th percentile 3,702; longest 12,075 (row 341). The 96 rows over 3,000 characters (15%) hold 40% of the text. 273 rows are at most 1,200 characters.

### 2.4 Length by the era in which the row was entered

| Era | Rows | At entry: mean / median | At the head: mean / median | Characters at the head |
|---|---|---|---|---|
| A (09-08 to 09-16) | 309 | 842 / 812 | 1,005 / 909 | 310,551 |
| B (09-17 to 09-21) | 43 | 2,586 / 2,307 | 4,028 / 3,716 | 173,198 |
| C (09-22 to 09-27) | 102 | 2,053 / 1,881 | 3,125 / 2,654 | 318,728 |
| D (09-28 to 09-30) | 103 | 1,806 / 1,787 | 2,503 / 2,180 | 257,822 |
| E (10-02 to 10-03) | 81 | 1,418 / 1,416 | 1,588 / 1,533 | 128,605 |

A row entered in eras B to D is two to three times as long as an era A row at entry and grew another 40 to 55% afterwards. 281 rows (44%) were edited after entry (759 edits; the most edited are rows 447 with 12, 424 and 516 with 11, 379 and 442 with 10).

### 2.5 Columns: share of the text, empty, overloaded

| Cell | Share of characters | Median | Longest | Empty or `—` | Overloaded |
|---|---|---|---|---|---|
| claim | 23.4% | 376 | 2,822 (row 331) | 0 | 212 rows over 500: they carry the commands and error text, not only the claim |
| status | 1.4% | 17 | 223 (row 400) | 0 | 61 over 60: they carry hashes and qualifiers |
| class | 1.3% | 18 | 232 (row 159) | 108 | 70 over 50: area and qualifier |
| spec citation | 7.8% | 120 | 917 (row 341) | 65, and 78 more begin `—`, `none` or `no` | 69 over 300: quoted passages; 359 cite `.tex:LINE` |
| reproducer | 9.3% | 137 | 1,288 (row 334) | 2 begin `none` (rows 500, 638) | 92 over 300; the path base is mixed (below) |
| found by | 1.9% | 21 | 384 (row 503) | 0 | 43 over 100: a date and a role, as in `ours (climb batch 7, rung B's skeptic, 2026-09-28)` |
| notes / workaround | 53.3% | 612 | 9,295 | 2 | the account of the row: mechanism, repair design, gating, closure, next steps |

- The legend says reproducer paths are "relative to `explorations/`". In the rows, 118 cells name `ProjectFortress/...` (a repository path), 77 name `explorations/...`, 289 give a bare path under `explorations/`, and 51 mix the styles in one cell.
- 28 rows write the reproducer as `gNN` (`gap-ledger-probes/gNN.fss`), a shorthand from the first merge.
- 12 claims begin with an external label (`G1 —` to `G12 —`, rows 71 to 82), a numbering from a source that the ledger has not kept.
- The found-by cell names a work stream, not a person: `ours` 280 rows, `apl ...` 109, `climb batch ...` 106, then the runs. 49 rows name two or more sources (runs, or a rung and its skeptic): the same defect found twice and entered once.

### 2.6 Tone: one claim, or an account

Era A rows are one claim with a short note. Row 14, complete (262 characters):

    | 14 | there is no exponent notation in numerals (`1e-5`) | NEGATIVE-VERIFIED | design limit | `basic/lexical-structure.tex:1099-1100` | `g06` | blinded | Error text is the spec's own sentence: `a numeral contains letters and does not have a radix specifier`. |

From era B the claim cell holds the claim and its evidence (median 771 characters in era B, 515 in era E), and the notes hold an account that later batches extend. The end of row 447, which has been edited 12 times (command: `explorations/coordinator/tools/facts-extract.sh 'ledger:447'`):

    ... The three candidates above are superseded ... To be fixed by batch 8's checker rung that binds an inference variable with no lower bound to its bounds ... Item 18's nine steps and its Fable judgement are not run: the decision settles the question. Closed by climb batch 8's rung I (POSITIONS 2026-09-29, the paper's instance rule): the compiled checker binds a type parameter that nothing at a call fixes to the intersection of its upper bounds ... Tests: `ProjectFortress/compiler_tests/InferResultOnlyCoerced` (+`Link`, promoted from `XXXInferResultOnlyCoerced`) and `InferResultOnlyOverloaded` (new ...)

What the 638 rows hold besides the defect (rows that contain the marker):

| Marker | Rows |
|---|---|
| names "climb batch" | 335 |
| names a skeptic, a judge or a gather | 248 |
| carries "gated" or "XXX" (test bookkeeping) | 233 |
| carries a date | 234 |
| carries "Home 1", "Home 2" or "Home 3" (the three homes of a defect) | 106 |
| cites `REPORT.md` | 88 |
| names the curator | 82 |
| carries a repair design ("The fix is", "Repair:", "To be fixed") | 81 |
| cites POSITIONS | 78 |

By era, the share of rows that name a batch or rung in the notes is 28% in A, 81% in B, 85% in C, 88% in D and 65% in E; that name a skeptic, judge or gather, 4%, 53%, 58%, 56%, 17%. A closed row keeps its claim in the present tense. Row 345 still opens "the interpreter's api declares `NN64.signed` returning `NN64`..." and is `FIXED`; a reader who does not look at the status reads a live defect.

### 2.7 How a closed row is marked

There is no one way. The five forms, with the commit that first used each:

| Form | Rows | First used |
|---|---|---|
| A. the status is `FIXED` and the hash is in the notes | 17 | `041682188` (2026-09-29) |
| B. the status is `FIXED (climb batch 8, rung I, <hash>)` | 38 | `041682188` |
| C. the status is `NEGATIVE-VERIFIED (at <hash>), POSITIVE-VERIFIED (the fix, <hash>)` or `POSITIVE-VERIFIED (fixed ...)` | 40 | `ce0c7f453` (2026-09-24); the words "POSITIVE-VERIFIED (the fix" occur earlier, in row 265 (2026-09-14), for a fix measured in a probe |
| D. the notes end "**Fixed `<hash>`**" | 9 | `ce0c7f453` |
| E. the notes end "fixed <hash> (date)" | 8 | `b45ac2982` (2026-09-17) |

109 rows carry at least one form (three carry two). They are 17% of the rows and 28% of the characters (329,587). Seven of them name an open part in the status (146, 388, 400, 492, 516, 555, 604); the other 102 are closed. About 100 name a hash near the word "fixed"; about 55 name a `.test` or `XXX` file. A word search finds about 60 more rows that mention a fix in other words.

### 2.8 Other inconsistencies

- 61,543 bytes (4.9%) of the file lie outside the rows: the merge provenance and legend (lines 1-54, 3.7K), the contested table and 16 resolved disagreements (802-826, 6.6K), the worklist (827-928, 23.5K), the counts and the narratives of seven merges (929-1219, 19.8K). All of it describes the state of 2026-09-16.
- The legend says the cited chapters "are byte-identical in `Specification-1.0-frozen/`" (`:52`). That held on 2026-09-08. The specification is edited by rungs since (for example `aa07efb31` edits `Specification/basic`), and 359 spec cells cite by line. Row 317's `:557` was stale after `2027f519b` (`explorations/reviews/rung-conformance-5-8.md:297`).
- The test corpora cite the specification by file and section, never by line (FACTS, "The test corpora cite the specification by file and section, never by line"). The ledger cites by line.

## 3. Duplicates

### 3.1 How I counted

I looked for pairs of rows by three signals, then read both rows of every pair and labelled it **restatement**, **sibling** or **unrelated** (terms in section 0).

| Signal | Pairs | Of which restatements |
|---|---|---|
| a shared code citation (same file name and line in the claim, spec or reproducer cell; a citation held by five or more rows left out) | 29 | 1 |
| a shared reproducer path (full path; paths held by five or more rows left out, such as `apl/base/AplCore.fss`) | 49 | 0 |
| close wording (cosine of at least 0.4 over the claim and the first 500 characters of the notes, words held by 2 to 12 rows) | 98 | 6 |
| any of the three | 170 | 6 |

I also read the 136 pairs with wording cosine 0.27 to 0.4 where both rows are numbered 311 or higher, and the claims of the 63 rows whose claim cell cites another row. The claims found a seventh group (rows 228, 238, 241, 253).

Why citations miss: rows written weeks apart cite different lines of the same site. Row 345 cites `Library/FortressLibrary.fsi:461` and its twin, row 439, cites `:502`, for one declaration. This is why the counts below are floors: a repeat in other words, at other lines, with another probe, is not found.

### 3.2 The count

- **Restatements: 9 rows, in 7 groups (16 rows in all).** Each later row repeats an earlier one.
- **Siblings: about 59 groups of 2 to 12 rows, 196 rows in all (31% of the ledger)**, by transitive closure of my labels. They are not duplicates. Their rows need a cross-reference, not a merge.
- **Text repeated word for word: 3.0%.** 5,034 of 166,533 words sit in a run of 12 words that an earlier row already holds. The cases are in 3.4.

### 3.3 Ten examples of restatement

| Later row | Earlier row | The defect | Evidence |
|---|---|---|---|
| 263 | 1 | chained indexing, `x[i][j]` or `rs[k][j]`, calls the first subscript with `args = ()` | row 263's notes: "The same defect as row 1 (`args = ()`), reached from a library rather than a program." The notes say it twice. |
| 439 | 345 | `NN64.signed` is declared `NN64` and answers `ZZ64` | both `FIXED`; row 439's notes: "Fixed by climb batch 10, rung N (`a1b5c253d`), with row 345", and row 345's say the same with "row 439". The output of `ledger-find` is below the table. |
| 382 | 378 | the compiled `ZZ64` multiply rejects a product equal to `Long.MIN_VALUE` | row 378's claim: "ten more `x == (-x)` guards ... the twins of row 333 ... and the long multiply's overflow check also rejects a product equal to the minimum". Row 382 is that clause alone. Both name `longOverflowingMul` at `simpleLongArith.java:70-85` and both were fixed by `ce0c7f453`. |
| 505 | 447 | the compiled checker binds a type parameter that only the result mentions to `BottomType` | both cite `Formula.scala:524` (`killIvars`); both are `FIXED (climb batch 8, rung I, f3032eed8)`. Row 505 is the solver's view of row 447. |
| 342 | 98 | the interpreter's overload check runs once, so a rejection "appears exactly once and never again" | row 98: "that rejection is **cache-dependent**"; row 342 gives its mechanism (the component is cached before the check runs). |
| 158 | 144 | a call followed by a postfix operator, `(onehot(ks, 5))^T dx`, is the static error of row 4 | row 158's claim: "is still row 144's error: row 4's workaround `(f())[i]` does not carry over". |
| 238 | 228 | a line break does not separate two statements when the next line can extend the phrase | row 238: "row 228 widens with the glyph set". |
| 241 | 228, 238 | the same rule, now for the operand of a dfn | row 241: "rows 228 and 238 widen once more". |
| 253 | 228, 238, 241 | the same rule, now for two names | row 253: "rows 228, 238 and 241 widen once more". |
| 521 (provisional) | 337 | the interpreter's `CHOOSE` answers `1` where the specification requires `0` | "Provisional row 521 was the ledger's row 337, fix and all" (`batch-6.5b-review.md:342`). A skeptic caught it before it landed, so it is not a row; it shows the cost of not searching. |

Rows 228, 238, 241 and 253 are one rule recorded four times, each time a rung met a new face of it.

The two rows of the second example, as `ledger-find` prints them (command and the first 150 characters of each claim):

    $ explorations/coordinator/tools/facts-extract.sh 'ledger-find:NN64 signed'
    345 | FIXED | **the interpreter's api declares `NN64.signed` returning `NN64` where its own glue returns a `ZZ64`**: `Library/FortressLibrary.fsi:461` declares ...
    439 | FIXED | **`NN64.signed` is declared to answer `NN64` and answers a `ZZ64`**: `signed(self):NN64` (`Library/FortressLibrary.fsi:502`, `Library/FortressLibrary.fss:903`) is ...

Related and already pointing at each other, so not counted: rows 10, 32 and 87 are `RETIRED` and cite the row that replaced them (row 87 ends "Only the tight form fails — row 88").

### 3.4 Siblings and repeated text

Siblings. The largest group has 12 rows (401, 420, 425, 447, 455, 505, 507, 508, 515, 516, 518, 535): how the compiled checker binds a lone type parameter. Others: 540, 541, 543, 559, 616 (intersection types); 561, 563, 564, 565, 625 (a captured static parameter, in three checkers); 387, 388, 392, 395 (coercion not applied); 440, 456, 457, 461, 462, 582 (total comparisons); 188, 189, 283, 330, 360, 361, 579, 635 (floor, ceiling, round). The rows of a group have different reproducers and fixes, and the batches often read one without the others.

Repeated text. A script took every run of 12 words in each row and looked for it in lower-numbered rows. 11 rows have 30% or more of their words from an earlier row. The commonest case is one sentence copied into many rows:

    $ grep -c 'worktree of `0ff5eae27~1`' explorations/fortress-gap-ledger.md
    35

- Rows 179 to 213 (the APL rows on the retired first library) each carry a 44-word provenance sentence, "Verified in this merge on the retired first library, from a git worktree of `0ff5eae27~1` ...". Rows 22, 53, 55, 77, 150 and 226 carry one note from batch 7C ("Climb batch 7C's rung X (`d8e0cd28e`) replaced the note's first sentence this row cites ...").
- Row 497 holds 122 words of row 322's notes: the batch 6.5 judge's account of the expected-failure test for the `do ... also` arm. The gather appended the same account to both rows.
- A shared sentence is a fact about a group, not about a row. It belongs in the first row of the group, or in the report the rows cite.

### 3.5 Why there are few restatements

- The early merges folded repeats and recorded them: row 148; six of run C3's 17 rows ("156 → 133 (folded)" and so on); seven APL rows (subject of `e26d254f3`). 49 rows name two or more sources.
- Since then, writers have searched the ledger by `grep`; the skeptic's check 11 asks for it; `ledger-find` makes it one command. One miss is on record in the reviews I searched (521, caught by a skeptic).
- What no check catches is a repeat that is a new face of a known defect: the `228`-`253` chain. Each batch added a row because the rows did not say "widen this row".

## 4. Proposal, for the curator to decide

### 4.1 The row template

Keep the eight cells and their order, so that the 638 rows stay valid and every habit holds.

| Cell | What goes in it | Limit | Rule |
|---|---|---|---|
| `#` | the next free number | | Never reused, never moved. 148 stays vacant. |
| claim | one sentence: what fails or what holds, where | 300 characters; the first 150 name the defect, because `ledger-find` prints 150 | Present tense. A bold lead is optional. No mechanism, no history, no commands. Write `\|` for a pipe. |
| status | exactly one word of the set | | `NEGATIVE-VERIFIED` (reproduces, specification settles it), `NEGATIVE-BOUNDED`, `POSITIVE-VERIFIED` (works), `CONTESTED`, `RETIRED` (a source claim falsified), `FIXED`, `DUPLICATE`. No parenthesis, no second status. |
| class | `kind` or `kind (area)` | | kind: the legend's seven. Area: `parser`, `walk`, `checker`, `codegen`, `runtime`, `library`, `prelude`, `specification`, `tests`, `tools`. `—` only for `POSITIVE-VERIFIED` and `RETIRED`. |
| spec citation | the file and the section: `basic/operators/juxtameaning.tex, "Juxtaposition"` | | A line number only against `Specification-1.0-frozen/`. `silent` when the specification does not say (home 3). |
| reproducer | the test that checks it (name of the `.test` file; `XXX` if it is an expected failure), else a probe path | 200 characters | Paths from the repository root. One reproducer. If no program can observe the defect, write `none` and put the command and two to five output lines in the notes. |
| found by | the stream: `climb batch 8 rung I`, `run-c3`, `apl rung 2` | 60 characters | No date (git has it), no role. |
| notes / workaround | the mechanism in one to three sentences with file:line and the commit it was true at; the workaround; `siblings: N, M` first if there are any; for a closed row, `fixed <hash>; test <name>` | 700 characters | |

The whole row is at most 1,200 characters. 273 rows are that short now, and 191 meet the length, claim, status and class rules as they stand.

A row that fits, and the same defect closed and as a pointer (only the closed rows' wording is new; the row numbers and cells are the ledger's):

    | 14 | there is no exponent notation in numerals (`1e-5`) | NEGATIVE-VERIFIED | design limit | `basic/lexical-structure.tex:1099-1100` | `g06` | blinded | Error text is the spec's own sentence: `a numeral contains letters and does not have a radix specifier`. |
    | 439 | `NN64.signed` is declared to answer `NN64` and answers a `ZZ64` | FIXED | library bug (library) | silent | `ProjectFortress/tests/NumberOrderListDeclarations.fss` | climb batch 6 rung F | fixed `a1b5c253d` with row 345; full text: history, row 439 |
    | 263 | chained indexing on an array of arrays, `rs[k][j]`, fails with `args = ()` | DUPLICATE | implementation gap (walk) | — | `apl/microgpt/probes/x03_lib.out.0` | apl microgpt rung | duplicate of row 1; full text: history, row 263 |

What does not go in a row, and where it goes instead (the counts are rows that carry it now, section 2.6):

| Not in a row | Rows now | Where it goes |
|---|---|---|
| the design of the repair, its options and cost | 81 | the rung's `REPORT.md` or PLAN; the row says `repair: see <report>` |
| test bookkeeping: "gated as an expected failure by `XXX...`", promotion, the key set | 233 | the `.test` file and the batch `RECORD.md`; the row names the test once |
| the batch's story: skeptic, judge, gather, review | 248 | the batch `RECORD.md` and the review |
| the curator's words and decisions | 82, 78 | `POSITIONS.md`; the row cites the entry by title |
| a fact about the tree as it now stands | | `FACTS.md`; the row points to the entry |
| measurement tables and probe output beyond five lines | | the report; the row cites it |
| the home (1, 2 or 3) | 106 | the other cells: a spec cell of `silent` is home 3, a reproducer that is an `XXX` test is home 2, a closed row is home 1 |
| dates, hashes of the run that found it, who found it | 234 | git |
| a closed row's full account | 102 | the history file |

### 4.2 The consolidation that keeps every row number

Rule. A row is never deleted, renumbered or moved. A row that is closed or repeated becomes one line in the same place. Its full text moves, word for word, to a history file, as `FACTS-history.md` and `POSITIONS-history.md` hold the text moved out of FACTS and POSITIONS (`explorations/coordinator/README.md`, "How they are kept").

The history file: `explorations/fortress-gap-ledger-history.md`, with a heading `### Row N`, a comment line that says what became of the row (`closed by <hash>`, `duplicate of N`, `rewritten to the template`), and the original table line unchanged.

Steps.

1. **Closed rows to one line.** 102 closed rows with no open part become
   `| N | <the claim's first sentence, at most 150 characters> | FIXED | <class> | <spec> | <test> | <found by> | fixed <hash> (<batch, rung>); full text: history, row N |`
   (about 350 characters). The seven that name an open part (146, 388, 400, 492, 516, 555, 604) stay as they are until the open part has a row of its own. A script can fill the hash for the about 100 closed rows that name one and the test for the about 55 that name a `.test` or `XXX` file; a worker supplies the rest, about 50 test names, from the closing commit's diff.
2. **Duplicates to a pointer.** In each group a worker picks the row that holds the content (usually the earlier row, not always), moves into it in one sentence whatever the other lacks, and turns the other into a `DUPLICATE` row of about 160 characters. The six later rows not yet closed are 263 (to row 1), 158 (to 144), 238, 241 and 253 (to 228) and 342 (to 98, or 98 to 342, because 342 holds the mechanism and the five ablations). The three that are already closed (439, 382, 505) shrink with step 1.
3. **Sections.** Leave rows where they are. Sections 1 to 16 are frozen. New rows go to a last table, "17. Rows in order of entry", which is what section 10 already is for rows from 311 on. The area is in the class cell.
4. **Derived parts out of the ledger.** The legend stays (about 2K, rewritten as the template). The counts by status, class and area are printed by `ledger.py count` and never stored. The worklist is a view generated from the rows; today it is stale. The narratives of the seven merges and the 16 resolved disagreements move to the history file with their lines unchanged. Row 83 stays where it is, in its seven-column table, and `check` accepts that table (4.5, D6).
5. **Fix the six rows with unescaped pipes** (314, 369, 374, 377, 470, 473) by writing `\|`. This changes the row text, so the history file keeps the old line.
6. **Verify.** `ledger.py check <base>` (4.3) proves that every row at the base is either unchanged or a one-liner whose full line is in the history file, that no row is in both, and that numbers are contiguous but 148.

Size, estimated. Characters of row text; the file is 1,250,447 bytes and 61,543 of them are not rows. Tokens at the skill's ratio (1.25M bytes is about 400K tokens, so 3.1 bytes a token).

| State | Rows | File | Tokens whole |
|---|---|---|---|
| now | 1,188,904 | 1.25M bytes | about 400K |
| after steps 1, 2 and 4 | 923,318 (78%) | about 0.93M bytes (−26%) | about 300K |
| and every open row cut to 1,200 characters (phase 2) | 558,943 (47%) | about 0.57M bytes (−54%) | about 185K |

- Phase 1 (steps 1, 2, 4, 5): 102 rows × 350 characters replace 293,008 characters; six rows × 160 replace 9,238. The history file gets about 358K characters. Cost: a script for the 100 hashes and 55 test names, and a worker for about 60 rows (50 test names and the six pointers). The worker reads the 102 closed rows (293,008 characters, about 95K tokens) and writes a line for each. With a check pass the estimate is under 0.3M tokens; I did not measure it.
- Phase 2: 272 open rows exceed 1,200 characters, 364,375 characters in excess. A cut is a rewrite by a worker, not a mechanical split, because the notes hold mixed content. It reads about 800K characters (260K tokens) and writes about 270K (90K tokens), then needs a second reader. Estimate under 1M tokens. The cut text goes to the history file, so nothing is lost. Alternative: cut a row when it is next edited, and enforce the limit only on new text.
- Read cost. A `ledger:ROW` result has a median of 3,056 characters now. A closed row read costs 350.

### 4.3 What a tool does

One script, `explorations/coordinator/tools/ledger.py`. `facts-extract.sh` keeps `ledger:ROW` and `ledger-find:` and calls it. All writes check the template; a failed check prints the rule and exits 1.

- **`find WORDS [--open] [--cites FILE[:LINE]]`.** Today's `ledger-find` plus: `--open` leaves out `FIXED`, `DUPLICATE` and `RETIRED`; `--cites FILE` lists the rows that cite that file, with the lines they cite, so that a writer about to describe `NN64.signed` in `FortressLibrary.fsi` sees rows 345 and 439 side by side. It prints the class beside the status. A writer runs it before `add`.
- **`show ROW [--short]`.** `ledger:ROW`; with `--short`, the claim and the notes' first 300 characters.
- **`add FILE`.** The file holds the eight cells.
    - It checks the template: eight cells after splitting on unescaped pipes, status and class in the sets, claim at most 300 and row at most 1,200 characters, reproducer path exists, spec file exists.
    - It runs `find` on the backticked words and the citations of the claim. If a row shares a code citation, or shares two rare words, it lists that row and refuses unless the call says `--sibling-of N` (and then the notes begin `siblings: N`) or `--add-to N`.
    - It takes a lock (`flock` on `explorations/.ledger.lock`), numbers the row `max + 1`, appends it to the last table, prints `row 640`, and writes nothing else.
    - In a batch worktree, `add --draft` validates the row and writes it into the rung's `record.md` fragment with a provisional number `P1`, `P2`. `fold` at the gather replaces the provisional numbers in the ledger, FACTS, the handover and the reports in one pass, which today a gather agent does by hand (`climb-batch-workflow.js:1643`).
- **`note ROW "TEXT"`.** Appends a sentence to the notes. It refuses when the row would pass 1,200 characters, so rows stop growing without bound.
- **`close ROW --commit HASH --test NAME`.** After the fix has landed.
    - It checks that the hash is a commit in `HEAD`'s history (`git merge-base --is-ancestor`), that the test exists under the test folders, that the row is not already closed, and that the status is not `RETIRED` or `CONTESTED`.
    - It moves the row's line to the history file, writes the one-line row of 4.2, and sets the status to `FIXED`.
    - The hash of a commit cannot be inside that commit, which is why `<short hash>` exists today (`climb-batch-workflow.js:2132`). `close` runs in the commit stage that already exists ("Record the landed commits' hashes and the gate summary"), so the placeholder goes away and no agent edits hashes by hand.
- **`duplicate ROW --of OTHER [--add "TEXT"]`.** Writes the pointer row, moves the old line to the history, and appends `TEXT` to the notes of `OTHER` if the earlier row lacked it.
- **`check [BASE]`.** Lints every row (cell count, sets, lengths, number sequence, paths, a pipe left unescaped). With `BASE` it also does what `tools/check-verbatim.py` does for FACTS: each row at `BASE` is the same line, or the history holds its full line and the live row is a one-liner; no row is in both. The batch gather and the merged-diff review run it instead of the hand check of "cell count, no gap, no duplicate" in each `RECORD.md`.
- **`count`.** Prints the counts by status, class and area. Nothing is stored.

### 4.4 What the skill's text should say

A draft to replace the ledger paragraphs of `records.md` (lines 5 to 13). It has the rules a writer needs and nothing the tool does.

    ## The gap ledger

    The gap ledger, `explorations/fortress-gap-ledger.md`, is the project's issue tracker: one row for each defect, gap or established behaviour. Reports cite a row by its number (`row 424`), so a number never changes and is never reused. Cite a row by number, never by the ledger's line.

    Read it with `ledger-find:WORDS` (two or three words of your defect: a function, a type, an error message) and `ledger:ROW`. Never read the ledger whole and never print whole matching lines from it.

    Find before you write. If a row holds your defect at the same site, do not open a row: add your reproducer or your new case to that row in one sentence (`ledger.py note`). If a row holds the same mechanism at another site, open a row and begin its notes with `siblings: ROW`. Otherwise open a row with `ledger.py add`.

    A row has eight cells. Claim: one sentence, 300 characters. Status: one of NEGATIVE-VERIFIED, NEGATIVE-BOUNDED, POSITIVE-VERIFIED, CONTESTED, RETIRED, FIXED, DUPLICATE. Class: a kind (implementation gap, library gap vs spec, library bug, design limit, deliberate, typesetter, packaging) and the area in parentheses. Spec citation: file and section. Reproducer: the test that checks it, from the repository root. Found by: the stream. Notes: the mechanism, the workaround, the siblings. The row is at most 1,200 characters; `ledger.py check` tells you what fails.

    What does not go in a row: the design of the repair, the test's bookkeeping, the story of who reviewed what, the curator's words, a fact about the tree. Put it in the report, the test, POSITIONS or FACTS, and name it in the row.

    Close a row only after its fix has landed: `ledger.py close ROW --commit HASH --test NAME`. Do not edit a closed row. Its full text is in `fortress-gap-ledger-history.md`.

### 4.5 Decisions for the curator

Each is a decision not taken. The first alternative is what the proposal assumes.

- **D1. The status set.** Seven words (the legend's five, `FIXED`, `DUPLICATE`); no second status, no qualifier; the 72 two-status rows and 44 qualified rows keep their text until touched. Alternatives: a ninth cell for the life cycle (open, fixed, duplicate), which rewrites all 638 rows and every writer's habit; or keep one more word for a row with an open negative half and a verified positive half.
- **D2. The class cell.** `kind (area)` from the closed list of ten areas. Alternative: bring back the area as the section, which means moving rows, and moving is what the number rule avoids.
- **D3. The spec citation.** File and section, a line only against the frozen copy. Alternative: keep lines and add the tree's commit to each, which tells a reader which text the line was true in.
- **D4. The length limit.** 1,200 characters. For the 272 open rows over it: a worker rewrites them all (phase 2), or each is cut when next edited. The second costs nothing now and leaves the read cost where it is.
- **D5. The history file.** One file, `explorations/fortress-gap-ledger-history.md`. Alternative: one file for each era, which keeps each under 150K characters.
- **D6. Sections and row 83.** Freeze sections 1 to 16, add a last table, keep row 83 where it is. Alternative: move row 83 into a main table with an eight-cell form (it is `CONTESTED` and has no spec cell), which changes its line.
- **D7. Numbering with parallel worktrees.** Provisional numbers and a fold at the gather (today's rule, now checked by a tool). Alternative: no provisional numbers. A rung worker calls `add` against the main tree's ledger and a lock gives numbers in the order of the calls. That removes the fold step, changes the order of a batch's rows from manifest order to call order, and makes a rung edit the ledger, which the batch script forbids today (`climb-batch-workflow.js:1033`).
- **D8. Who does the first pass.** A script and one worker for phase 1 (the tool is built first, as a small commit with its test); phase 2 only if D4 says so. The coordinating session is not the place for either: phase 1 reads about 95K tokens of closed rows, and `coordinator/references/delegation.md` sends ledger rows to a worker.
