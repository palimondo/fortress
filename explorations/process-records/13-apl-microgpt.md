# Process record: the microGPT rung of the APL side quest

Written by the coordinating session itself, the same day, in the common format of `explorations/process-records/FORMAT.md`; the token figures are computed from the session transcript by the script of record 11, on both bases that record explains.

## Header

| field | content |
|---|---|
| run | the last rung of the APL-in-Fortress ladder (`explorations/apl/README.md`): the flat-style microGPT written inside `apl⦇ … ⦈` with Run C4 as the target form; result in `explorations/apl/microgpt/` (`DESIGN.md`, `INVENTORY.md`, `probes/`, `MicroGptApl.fss`/`.fsi`, `MicroGptAplCheck.fss`, `checks/`, `REPORT.md`), the five base additions in `explorations/apl/base/`, gap rows 86–93 in `explorations/apl/gaps.md`, and the ledger merge of closing step 3 |
| period | 2026-09-14T20:49:30Z (the user turn "read explorations/microgpt-run-c-handover.md and continue APL step 1", the first after a compaction) to FILL (the closing commit) |
| strategy | coordinator with delegated workers: the design, the report, the gap rows, the check runs and the record in the main thread; the inventory, the probes with the base additions, the component with its check, and the ledger merge to workers |
| models | main thread `claude-fable-5-1` (`message.model` on every assistant record); workers `opus` (the `model` field of each `Agent` call) |
| delegations | four, all to `opus`: the inventory (re-sent after the compaction killed the first), the probes and base additions, the component and check, the ledger merge |
| tokens, main thread | to 22:12: output 7.2e4 per message (41 messages) and 2.2e5 per record (114 records, the split-message double count record 11 explains); context processed 2.1e7. FILL at the close |
| tokens, workers | `subagent_tokens` of the completion notices: inventory 220,838; probes and base 285,685; component and check 211,514; merge FILL |
| wall time | FILL; the design took 17 min from the user turn to its revised commit, the probes-and-base worker 34 min, the component worker 22 min, the two check runs FILL, the merge worker FILL, with the report and the gap rows written alongside |
| gates | the handover's closing steps 1–3 and the design's worker section: probes before base changes; rungs 1–6 re-run green after every base change; the same 40 checks and goldens as C4 at both pool sizes; a correspondence table one row per Dyalog line; every reproducer re-run at the merge |
| outcome | `MicroGptApl.fss` 76 code lines with a 16-line APL `step` block (one line per Dyalog line L13–L28), 19 of the program's 25 lines as APL text; `checks/model_run.out` prints the oracle's five losses; `checks/threads1.txt` and `threads4.txt` FILL; `REPORT.md`; gap rows 86–93; ledger FILL rows; `gap-cross-run.md` with `run-c4` and `apl` columns; the ladder closed in `apl/README.md` |
| sources | `/root/.claude/projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6.jsonl` from record 25448; the four worker transcripts under `.../subagents/`; commits e139a4dea through FILL |

## Timeline

1. **20:49 to 20:57, the read-in and the inventory re-sent.** The handover after compaction; `apl/microgpt/INVENTORY.md` did not exist, so the inventory worker had died with the compaction and its brief was recovered verbatim from the transcript's `Agent` call and re-sent. While it ran: the Dyalog program, C4's glyph map, rung 6's design and beyond-chapter checks, the grammar's statement, dfn, function-value, atom, name and strand rules, the library's signatures for each, rank, product and the program's glyphs, C4's model and the corpus api. The design drafted from those: the component's shape (declarations with APL bodies, since the expander yields expressions), the line-by-line table, three base additions, what stays host. Commit e139a4dea.

2. **21:00 to 21:02, the inventory lands and corrects the draft.** 65 construct rows with citations. Two open items confirmed as gaps (`N⍴` with a name, dyadic `⍤1` over two rank-3 arrays) and promoted to additions 4 and 5; one measured limit added (`⍎( … )` cannot stand on a binding's right-hand side, so every conversion moves to host code); the mask's sign fixed (`¯10*10` is positive). Commit f65e31b4c.

3. **21:09, Pavol: "Go ahead autonomously until you close the side APL quest."** Tasks 28–30 opened; the probes-and-base worker launched with the design's worker section as its brief.

4. **21:12 to 21:46, the probes and the base.** Seven questions in four probe files (x01–x04). All seven answered as the design hoped, with corrections: the underscore's character class must be `` [`_] `` and `rmsn_b` must stand above `rmsn`; the tuple assembly is for matrix cells only, because the wider reading broke rung 5's Y20 (rung 5 red, then green); the tuple's declared `Object` result is not type-correct by the spec and is the only declarable type; the (Array3, Array3) overload goes last in its family. Rungs 1–6 re-run byte-identical. The base: `AplSyntax.fsi` 752 → 899, `AplCore.fss` 2243 → 2343. The design got an "After the probes" section. Commit 2327a29ee; handover updated, 7225d01a3.

5. **21:48, two workers in parallel.** The component worker (the design's deliverable 3 minus the two full check runs, which a worker cannot deliver: record 12's lesson) and the merge worker (the 85 APL rows and C4's four into the ledger, every reproducer re-run, rows 1–35 from a worktree of the retired base), on disjoint files.

6. **21:48 to 22:10, the component.** Written first time against the table; one failed run (`aplOfInt`'s locals `rows cols` collide with the imported `rows`); the model prints the five losses in 72 s (about 9 s a step, with the merge worker's reproducers running alongside); the check smoke stopped at the 12-minute mark at 35 of 40, every line PASS. Reviewed here against the design's table: line for line. Commit 8c744d90b.

7. **22:10 to 22:13, the report and the gap rows.** `REPORT.md` with the correspondence table (Dyalog line, `MicroGptApl.fss` line, C4 line, form), the departures, the base's growth; gap rows 86–93. Commit 11dbaf571. The pool-1 check started under the `Monitor` tool at 22:13.

8. FILL: the check runs, the merge, the ladder row, the close.

## Dead ends

| attempt | why it was dropped | evidence |
|---|---|---|
| the first inventory worker | killed by the compaction before writing its file; the brief was re-sent unchanged | the handover's "State on 2026-09-14 after C4" paragraph; `apl/microgpt/` absent at 20:49 |
| the design's mask `(¯10*10)×…` | `¯10*10` is `(-10)^10`, positive; the inventory pass caught it | `DESIGN.md` L7 row, f65e31b4c |
| `bb←⍎(aplOfInt(b))` inside the block | `⍎( … )` on a binding's right-hand side is a Syntax Error (rung 6) | `rung-6/REPORT.md:113-116`, `INVENTORY.md` section 4 |
| the design's fallback spellings `Bt1 Bt2 rmsnb smb` | not needed: both contested spellings work | `probes/x01_names.out` |
| `¨` assembling any non-scalar cell into a tuple | broke rung 5's Y20 (`{⍳⍵}¨1 2 3` must stay a catchable violation) | `probes/PROBES.md`, the worker's report |
| nine `apl⦇ … ⦈` uses in one expression (a probe's comparison vector) | does not parse; eight do | `probes/x04_gram.out.0`, `.out.1` |
| `wrapped` as a probe function name; `rows cols` as `aplOfInt`'s locals | a keyword; an imported name | `probes/x02_host.out.0`; `checks/model_run.out.0` |

## Delegations

| # | task as briefed | model | tokens | what came back |
|---|---|---|---|---|
| 1 | the construct inventory of the Dyalog program against the base, with citations (re-sent) | opus | 220,838 | `apl/microgpt/INVENTORY.md`, 130 lines, 65 rows |
| 2 | seven probes, five base additions, name lines, rungs 1–6 re-run | opus | 285,685 | `probes/` (x01–x04, `PROBES.md` 332 lines), the base changes |
| 3 | the component, api and check; model run; check smoke | opus | 211,514 | `MicroGptApl.fss/.fsi`, `MicroGptAplCheck.fss`, `checks/model_run.out`, the smoke, `NOTES-worker.md` |
| 4 | the ledger merge of 89 rows with re-runs; the cross-run columns | opus | FILL | FILL |

## Delegation and its cost

Four workers, about 1.1 million tokens between them (FILL exact), against the main thread's FILL output tokens. Every delegation delivered: the inventory's 65 rows were the design's citations; the probes turned the design's five open items into answers before any base line was written, and caught the two mistakes the design would otherwise have shipped (the wider tuple reading that broke rung 5, the sign of the mask was caught by the inventory pass); the component came back matching the design's table line for line after one failed run; the merge re-ran 74 rung probes and 49 retired-base checks and found six wrong citations in the source rows. The two full check runs stayed in this thread under the `Monitor` tool, as record 12's lesson says, and cost nothing but wall time. What delegation cost was timing: the merge worker's reproducers ran alongside the first pool-1 check and the component worker's model run, which is why the pool-1 check was run twice (FILL) and the report's cost row is from the quiet run.

## Gaps found

`apl/gaps.md` rows 86–93, all new (the closed-set spellings, the tuple assembly and its type, the dynamic dispatch of an adapter, the tuple-returning block, the nine-expander limit, keywords and imported names, chained indexing from a library, the fold order). Row 92 is the ledger's row 1 reached from a library. FILL: their ledger numbers.

## Findings

The flat-style microGPT is APL text inside Fortress for 19 of its 25 lines, and the expansion of that text is C4's program: every `+.×` is the shipped `DOT`, every `⍤1` is C4's `rows`, the rank-3 attention block is C4's batched juxtaposition through `aplRankD2`, `⊃,/,¨` is C4's `flat`, and the strand of nine views is C4's tuple binding. The six host lines are the six things the sub-language was never given: a top-level statement, a nested array, a system function, characters, rank 4, a write to an outer name. Each of the five base additions was one grammar rule or one library overload; the name lines, 96 of them, were the largest change, and they are the price of the closed name sets (row 194) paid once more. The cost: FILL against C4's 873 s and 396 s, which prices the general per-plane and per-row route of the rank operator for the first time (rung 6 had only priced per-element frame pushes, row 256). The ledger grew from 174 to 263 rows in one day, 42 of them in a section the ledger had not had, on extending Fortress rather than writing in it. What the rung did not do: rungs 7 and 8 (tacit, nested arrays) stay unbuilt by decision, the program's one tacit form rewritten as a dfn; the feasibility table at the end of `apl-probes/REPORT.md` (about twenty rows) is still unmerged, as the merge worker noted.
