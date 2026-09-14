# Process record: Run C4

Written by the coordinating session itself, the same day, in the common format of `explorations/process-records/FORMAT.md`; the token figures are computed from the session transcript by the script of record 11, on both bases that record explains.

## Header

| field | content |
|---|---|
| run | Run C4, the synthesis of rounds two and three decided in Phase 2 (`explorations/reviews/run-c2-vs-run-c3.md`, section H); result in `explorations/run-c4/` (`src/`, `checks/`, `design.md`, `tour.md`, `tour.html`, `tour/`, `probes/types/`, `README.md`) |
| period | 2026-09-14T19:14:11Z (the user turn "read explorations/microgpt-run-c-handover.md and start C4", one record after a compaction summary) to 2026-09-14T19:56Z for the deliverables; the type-annotation probe that Pavol's question added ran on after that (its end is in the Delegations table) |
| strategy | coordinator with delegated workers: the merge itself, the tour generator, the design note, the README, the Phase 2 addendum and the handover in the main thread; the tour render and its verification, the fix of C2's tour page and the type-annotation probe to workers; the two check runs ended up in the main thread (see Dead ends) |
| models | main thread `claude-fable-5-1` (`message.model` on every assistant record); workers `opus` (the `model` field of each `Agent` call) |
| delegations | four, all to `opus`: the check runs (failed, see Dead ends), the tour render and verification, the C2 tour page fix, the type-annotation probe |
| tokens, main thread | to 19:56: output 7.7e4 per message (67 messages) and 2.2e5 per record (163 records, the split-message double count record 11 explains); context processed 3.7e7 |
| tokens, workers | `subagent_tokens` of the completion notices: check runs 59,749 (no result); tour render 81,252; C2 tour fix 112,686; type probe 81,120; 335k in all |
| wall time | 42 min from the first turn to the filled-in design note; the merged sources were written and smoke-tested in the first 6 min, and the rest is the two check runs (873 s and 396 s, sequential, 10 min lost to the false starts in Dead ends) with the tour work and Pavol's two mid-run requests done alongside |
| gates | the handover's decision section: a merge and not a new design; the same check and goldens; checks at both pool sizes; a short design note; the tour by C2's generator; new gap rows only if something new appears |
| outcome | `src/MicroGptFlat.fss` 71 code lines (step 20), `FlatArrays.fss` 141, `FlatData.fss` 101 (C3's), three `.fsi` 70, `MicroGptFlatCheck.fss` 85 with 40 checks; `checks/threads1.txt` and `threads4.txt` each `VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS`, exit 0, 873 s and 396 s, identical values; tour 28 rows, published at https://claude.ai/artifact/FyUD5p9Tzd91rD9ixb8iTm; no new gap rows from the merge; the probe's rows, if any, in `probes/types/REPORT.md` |
| sources | `/root/.claude/projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6.jsonl` from record 24335; commits a92569f83 through dbf8ba028 and the ones that add this record and the probe |

## Timeline

1. **19:14 to 19:18, read-in and the merge.** The handover, both source trees whole (seven files each), section H of Phase 2, the Dyalog reference, C2's tour generator and the two checks' differences. The model written as C2's with C3's data side dropped in: the corpus object's four key methods replace C2's five-line keys block, `loadParams(dir, name, count, total)` replaces C2's four-line loader, `x DOT x` and `SUM e` replace the generators; the vocabulary derived from C2's by a script that cuts `Block`, `Ravel`, the vector `gather` and `valid` and renames `viewAt` to `view`; the check is C3's with C2's four single-document reports added.

2. **19:18 to 19:20, the smoke run.** The five-step driver, first attempt: compiles, five losses equal to the oracle's to fifteen digits, 8.1 s per step. No compile round was needed; every mechanism had been proven in one round or the other. Commit a92569f83; the check worker launched.

3. **19:20 to 19:24, the tour generator and the notes.** C2's generator pointed at C4's source, eight rows rewritten for the changed lines, the per-cell id prefix added to its HTML; a dry run verifies all 28 snippets against the source. The render worker launched. `design.md` with the merge table, the line budget by the Phase 2 script (model 71, vocabulary 141, total 398) and placeholders for the timings; `README.md`; commit.

4. **19:25 to 19:33, the render lands, the check run does not.** The render worker: 56 SVGs, 1,686 ids all distinct, every row clean by eye. The check worker reports "waiting on the monitor" and stops; its run dies with it six checks from the end. Three false starts follow (Dead ends), then the pool-size-1 run is started under a Monitor whose command is the run itself, which outlives the shell's ten-minute limit.

5. **19:33 to 19:41, the addendum and the handover drafted** with placeholders, while the check runs.

6. **19:41 to 19:45, Pavol's first request: the tours.** C2's and C4's five-column pages are worse than C3's, and C3's could follow the device theme. C4's generator gets C3's page section (a section per row, formula and Fortress side by side, Dyalog and note beneath); both C3's builder and C4's get `.render svg{fill:currentColor}` on a themed panel, which works because dvisvgm's paths and rects carry no fill; screenshots in light and forced-dark mode; C4's page published, C3's republished at its link.

7. **19:45 to 19:51, Pavol's second request: C2's page too, and the type question.** A worker grafts C4's page section onto C2's generator and verifies all 28 rows, the eight the review had flagged first; C2's page republished. The type question answered from the ledger (rows 21, 131, 164, 171) as an assessment with one open group, the untyped named function handed to a typed function parameter, and a probe brief written for it, queued behind the check so the timings stay clean.

8. **19:47 to 19:56, the checks end.** Pool size 1: 40 of 40, 873 s. Read against C2's re-run on this host (941 s, `reviews/run-c2-review-probes/`), this is C2's cost, and Phase 2's "1.45×" for the rank-3 attention is found to have mixed hosts; on one host it is 2.1×. Pool size 4 started under a monitor, 40 of 40, 396 s, values identical. The numbers filled into the design note, the addendum and the handover; the probe worker launched.

9. **After 19:56, Pavol's questions.** The type-annotation probe (delegation 4) answers the question of which annotations are necessary. Pavol's remark that the typed hyperparameter lines and the tuple trick were both ugly leads to a ten-second probe of six untyped declarations to a line, semicolon-separated (`probes/semicolon`), adopted into the model, smoke-tested to the same losses and put through the check; then set aside when Pavol recalls that the APL sub-language expands a strand assignment to a tuple binding, which is C2's form, so the model is reverted to it (byte-identical to the checked source) and the semicolon variant's own check output is kept as evidence beside its probe. The finding stays as gap row 175.

## Dead ends

| attempt | why it was dropped | evidence |
|---|---|---|
| the check runs as a worker task | the worker started the run in a background shell, stopped to wait on a monitor, and its run was killed with it; a second worker attempt relaunched and collided with the main thread's own run (both writing `threads1.txt`, both killed) | the notifications "Waiting on the monitor" and "Run is in progress", the null-padded `threads1.txt` at 19:31 |
| `pkill -f MicroGptFlatCheck` before a relaunch | matched the shell running it and killed the tool call itself (exit 144) | the transcript at 19:30 |
| a `setsid nohup` script detached from the tool call | died when the tool call ended; the harness reclaims what a call leaves behind | `threads1.txt` with only the header, 19:31 |
| a Bash `run_in_background` run of both checks | the tool's ten-minute ceiling is under the pool-size-1 run's 14 min | stopped at 19:31 before it could be cut off |
| C2's five-column table page for C4's tour | the renders shrink below legibility; Pavol's feedback at 19:41 | the first `tour.html`, commit 74514646f, superseded by d7d98231c |
| the hyperparameters as six untyped semicolon-separated declarations to a line | binds and passes the check, but the APL sub-language expands a strand assignment to a tuple binding, so the tuple form is the target's; kept as gap row 175 | `run-c4/probes/semicolon/`, its `threads1.txt` |
| the always-light render panel of C3's page | it defeats the dark theme; the strokes carry no colour of their own, so `currentColor` does it | `run-c3/probes/tour/build_tour.py` before and after |

## Delegations

| # | task as briefed | model | tokens | what came back and where it lives now |
|---|---|---|---|---|
| 1 | run the check at pool sizes 1 and 4, sequentially, report verdicts, timings and whether the values agree | opus | 59,749 | nothing usable: the run died with the worker; the main thread ran both checks (`checks/`) |
| 2 | render the 28-row tour, confirm 56 SVGs, check id uniqueness, screenshot and read every row against its ASCII source | opus | 81,252 | 56 SVGs in `tour/`, 1,686 distinct ids, 28 of 28 clean; its per-row table is in Recovered reports |
| 3 | give C2's tour page C4's page section, rebuild without re-rendering, verify ids and every row in both themes | opus | 112,686 | `run-c/tour/mktour.py` and `run-c/tour.html`, screenshots in `run-c/tour/`, 28 of 28 clean, the eight flagged rows fixed; its table in Recovered reports |
| 4 | the type-annotation probe: seven variants of the model with one category of annotation removed each, run the driver, report compiles/runs/losses/time | opus | 81,120 | `run-c4/probes/types/` with `REPORT.md` and nine variant trees with their outputs: every annotation but the mutable locals' declared type is redundant to the interpreter; its paragraph on overload resolution overclaims and is corrected at the report's end; gap rows 176–178 |

## Delegation and its cost

The merge needed no probes, so delegation bought only the check runs (which it failed to deliver) and the rendering and page work (which it delivered cleanly, about 200k worker tokens for three verified pages). The main thread's own cost is 77k output tokens for the merge, the notes, the two page rebuilds and the run management. The lesson of the check-run failure is procedural: a worker that starts a long run and then stops loses the run, so a long run belongs in the thread that will wait for it, under a Monitor whose command is the run.

## Gaps found

`run-c4/gaps.md`: row 175, semicolon-separated untyped top-level declarations (from Pavol's remark that the typed hyperparameter lines and the tuple trick were both ugly; a ten-second probe in the thread), plus the type probe's findings from `run-c4/probes/types/REPORT.md`. None from the merge itself. To be entered into `explorations/fortress-gap-ledger.md` by the next ledger merge.

## Findings

- The synthesis costs what C2 costs (8.0 s against 8.2 s per batch-1 step on this host), so the pieces taken from C3 are outside the hot path and the rank-3 attention is the whole of the price.
- Phase 2's "1.45×" compared the two rounds across hosts; on one host the rank-3 form is 2.1× the cell lift. The addendum records the correction.
- dvisvgm's SVGs carry no fill, so one CSS rule makes Fortify and LaTeX renders follow the viewer's theme; all three tour pages now share one page design and are clean row by row.
- The line budget forecast held: Phase 2 said "about 75" for the model and it is 71.

## Recovered reports

The render worker's per-row verdict (delegation 2), verbatim: all 28 rows clean; row 1 "epsilon lr0 beta1 beta2 epsilon_A set as ε, lr₀, β₁, β₂, ε_A; 10.0^(-5)/10.0^(-8) as true superscripts"; row 2 "SQRT(...) as a radical, x DOT x as x·x, |x| as bars"; row 3 "BIG MAX[t <- z] as a large MAX with the generator under it; SUM e as ∑e"; row 7 "longest cell, shrunk to fit but legible at zoom; all 5 declarations match"; row 25 "transpose(onehot(...)) dX — no ^T, as the note says"; row 27 "β₁ β₂ ε_A; beta1^t/beta2^t as superscript t; primes on m′ v′ p′"; the rest "clean" with the identifiers named.

The C2 fix worker's per-row verdict (delegation 3), the eight rows the Phase 1 review had flagged: row 1 "both tuples at full size; the 'read only by squinting' scale fault is gone"; row 7 "seven lines, legible at native weight"; row 8 "nested do … end and flat(w(0)…w(8)) all readable"; row 15 "SQRT (1.0 headDim) now a radical with overline — the lost radical is fixed"; row 21 "the =-for-/ and p-for-radical garble is gone"; row 25 "the nesting is visible again (was transpose_onehot(...))"; row 27 "primes are primes, not superscript zeros"; row 28 "/ and = no longer swapped; the lambda's ⇒ is present". Residual, by design: rows 4, 7 and 12 hold lines wider than the panel, kept at 80 % of natural size and scrolled rather than shrunk.
