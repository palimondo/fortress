# Process record: Run C3

Reconstructed in the common format of `explorations/process-records/FORMAT.md` by a worker that did not take part in the run, with one extra section, "Delegation and its cost", that the coordinating session asked for.

## Header

| field | content |
|---|---|
| run | Run C3, the coordinating session's own attempt under the round-two brief `experiment/RUN_C2_BRIEF.md`; result in `explorations/run-c3/` (`src/`, `checks/`, `probes/`, `survey.md`, `design.md`, `gaps.md`, `tour.md`, `tour.html`, `README.md`) |
| period | 2026-09-14T07:37:47Z (the user turn "read explorations/microgpt-run-c-handover.md and start Run C3", one record after a compaction summary) to 2026-09-14T08:34:18Z (the closing report, 21 s after commit 439ec4ed9) |
| strategy | coordinator with delegated workers: the design, the three components and their apis, the check, `tour.md`, the gap rows, `design.md` and `README.md` stayed in the main thread; the library survey, the three alternatives probes, the `tour.html` render and the replication of every gap row went to workers |
| models | main thread `claude-fable-5-1` (`message.model` on all 179 assistant records); workers `opus` (the `model` field of each `Agent` call), recorded as `claude-opus-5` in each worker's own transcript |
| delegations | six, all to `opus`: the survey, the row-lift probe, the elementwise-algebra probe, the attention probe, the `tour.html` render, the gap-row replication |
| tokens, main thread | output 1.3e5; context processed 2.4e7 (102 assistant turns; `input_tokens + cache_creation_input_tokens + cache_read_input_tokens`). Counted the way `09-run-c.md` counted — once per assistant *record* rather than once per message — the same window reads 2.8e5 and 4.2e7, because 66 of the 102 messages are split across two or three records that each repeat the same usage block |
| tokens, workers | output 1.7e5; context processed 3.0e7, over 290 worker turns. Per worker — survey 17,846 / 3.8e6; row lift 39,631 / 6.0e6; algebra 21,747 / 4.0e6; attention 32,744 / 4.9e6; tour render 39,771 / 8.3e6; replication 22,886 / 3.3e6. The completion notices report a different measure, `subagent_tokens`: 154,458 / 159,691 / 154,355 / — / 163,774 / 135,730 |
| wall time | 56 min 31 s end to end; first commit 07:49:46, last 08:33:57. The thread has seven gaps over 90 s totalling 23 min 38 s: 6 min 41 s waiting on the probe workers (07:53:02–07:59:43), 5 min 5 s on the replication worker (08:24:21–08:29:26), 2 min 27 s on the tour render (08:30:52–08:33:19), 3 min 11 s while writing the first briefs, and three shorter waits on its own interpreter runs |
| gates | `experiment/RUN_C2_BRIEF.md` imposes: three components; one row lift built once; the elementwise algebra as `opr` declarations; no subscripts in the model, counted and reported; a line budget before and after; the guided tour as `tour.md` and a self-contained `tour.html`; a survey of the shipped array algebra written into `design.md` *before* any design; at least two forms of each of the three design places probed, rendered and compared before the rewrite, with the rejected form recorded; the check all-PASS at `FORTRESS_THREADS=1` and 4 with an aggregate verdict and a non-zero exit; a named reading list with exclusions; commit and push as you go with two fixed footers and no model identifier in files. All were applied, with three deliberate departures the run states: the deliverables go to `explorations/run-c3/` rather than `explorations/run-c/`, since round two by another session holds that directory; the survey is its own file `survey.md` with `design.md` carrying its essentials; and the brief's "delegate only mechanical work such as re-running the check" was not followed — six substantive delegations were made instead, under `protocol.md` §5 and `explorations/navigation-retrospective.md`. Turn 1 was not a `setup.sh` run: the coordinator was already in its own environment and sourced `experiment/env.sh`. The run is not blinded and says so |
| outcome | program `explorations/run-c3/src/MicroGptFlat.fss` (91 code lines, no subscripts) with `FlatArrays.fss` (109), `FlatData.fss` (101), their three `.fsi` (66) and `MicroGptFlatCheck.fss` (84). Verification: `checks/threads1.txt` and `checks/threads4.txt` each end `VERDICT: 36 PASS, 0 FAIL of 36 -- ALL PASS` and `exit status 0`, in 420 s and 248 s; every measured value identical between the two runs and identical to round one's digits (gradient 1.1e-16, parameters after Adam 8.3e-17, first loss 4.4e-16 then exact, worst finite difference 3.68e-10 against a 1e-8 bound). Article equivalent: `tour.md` and `tour.html` (31 rows, 1.7 MB, self-contained), not published as an artifact. Gap table `gaps.md`, 17 rows, 156 to 172. Own process files: `survey.md`, `design.md`, `probes/REPLICATION.md`, the three `probes/*_REPORT.md` |
| sources | `/root/.claude/projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6.jsonl`, records 23109–23898; the six worker transcripts under `.../bdff267d-67dc-5bb9-b970-8c3dfaa634b6/subagents/` (`agent-a8a0be18650eca6bc`, `a6d2050ea6adee5ae`, `adb1017461d7f391b`, `aea020615eee8a2ca`, `abb8fb85a86188628`, `a9296a7265afc7c88`); commits 0e93e2a43, 0a262f57a, 04a98b23b, 177cb1416, cfcacb55c, 4c4c5ccf2, 5b10f5a41, 4beb1abab, f0896f9a7, c2aab795b, 5439978c6, 9fbddee95, 439ec4ed9 |

## Timeline

1. **07:37:47 to 07:40:41, read-in.** Goal: absorb the brief and round one before writing anything. The handover, then `git show origin/claude/worker-brief-fable-vnnuv8:experiment/RUN_C2_BRIEF.md` for the brief, round one's `MicroGptFlat.fss` whole, its `design.md`, the code-quality section of `explorations/reviews/run-c-phase1.md` (lines 188–236), the row view and rank-1 lift in `explorations/apl/base/AplCore.fss`, round one's check and `.fsi`, ledger rows 4, 41, 54, 55 and 140–155, the render pipeline (`bin/fortick`, `latex`, `dvisvgm`), the section headings of `run-b2/design.md` and `08-run-b2.md`, and the five process rules of `navigation-retrospective.md`. No Fortress file was run in this window.

2. **07:39:41, the survey worker.** Launched in the middle of the read-in, before any design: a worker is sent to inventory every operator and method on `Vector` and `Matrix` with line numbers in `Library/FortressLibrary.fss`, what `Indexed`/`Array1`/`Array2` add, how the library declares those operators generically, and what is absent — with runnable checks. This is the brief's "library and specification first" gate executed as a delegation.

3. **07:43:54 to 07:46:29, the three alternatives workers.** One brief each for the three places the brief names: the row lift (at least two of stack-by-first-result, a generator consumed by a comprehension, a `for` into a preallocated matrix), the elementwise algebra (operators on the shipped families against a wrapper type of one's own), and the attention block (round one's block loops against a per-head cell form). Each brief fixes the environment, the file-name prefix, the reading allowed, and asks for outputs, timings at one and four threads, and Fortify renders.

4. **07:46:42 to 07:49:44, the drafts, written while four workers run.** One small probe of its own first: `fail(s)` in a scratch component prints `FAIL: verdict FAIL` and exits non-zero, which settles the check's exit behaviour (later gap row 170). Then `src/FlatData.fss` at 07:48:09, `src/MicroGptFlat.fss` at 07:48:56 and `src/MicroGptFlatCheck.fss` at 07:49:31, written formula-first against spellings the probes had not yet settled; the model draft is forecast at "about 85 code lines". Commit 0e93e2a43, "drafts of the model, the data component and the check — probe workers running".

5. **07:51:51 to 07:53:02, the survey lands.** Copied from the scratchpad into `explorations/run-c3/survey.md` with its 34 runnable checks under `probes/survey/`, read in two passes, committed as 04a98b23b. It fixes what the vocabulary may not rewrite: `+`, `-`, unary `-`, scalar multiplication in both orders, `DOT` and juxtaposition, `t()` as a view, `map`/`fill`/`assign`, `SUM` and `BIG MAX` over any array; and what is absent: Hadamard, any `/`, scalar `+`/`-`, elementwise `SQRT`/`exp`/`log`/`MAX`, 0/1 comparisons. Then a 6 min 41 s wait with nothing started.

6. **07:59:45 to 08:01:56, two probes report and two forms are chosen.** The algebra worker returns first: form A, operators on the shipped families, 24 `opr` overloads beside the library's own with no ambiguity, against form B's wrapper type at 70 lines, unwraps in the softmax and 1.26× the Adam time. Form A taken. The lift worker returns next with three working forms and their timings; form C (a parallel `for` through `Row` views of a preallocated matrix) is taken on the four-thread numbers, 208/433 ms against A's 710/1790 and B's 295/622. The coordinator reads `lift_c.fss`, `lift_b.fss` and `lift_hdr.txt` directly rather than trusting the report's prose.

7. **08:02:45 to 08:08:26, the vocabulary component, six rejections.** `src/FlatArrays.fss` written at 08:02:45 and its `.fsi` by heredoc at 08:03:42. In order: `FlatArrays.fsi:16:1: Syntax Error` on the postfix `^T` declaration in an api; `Variable rows is already declared.` in the two `.fsi` files; `Operator postfix ^T is not defined.` once the api declaration is removed; `N is undefined.` at four positions for a missing `import NatReflect`; `Variable rows is already declared.` again, this time in `FlatArrays.fss` itself; and an untyped lambda taking the wrong `rows` overload. Between them, at 08:04:34 to 08:05:37, five api spellings of `^T` are probed and the cause is traced into `ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:171-172`. The attention report lands at 08:04:57 and its `cells` lift is folded in at 08:06:23. At 08:08:15 the model runs: five steps, losses 3.3659669475848513 down the list, 28.6 s. Commit 4c4c5ccf2.

8. **08:10:07 to 08:12:40, the check.** The first check start is thrown away by `MicroGptFlatCheck.fss:33:5-7: Variable rows is already declared.`, exit 255 — a local named after the vocabulary's `rows`. Renamed `lines`; a 130 s foreground run shows the first lines passing; the full one-thread run is then backgrounded and the four-thread run chained after it.

9. **08:12:49 to 08:20:12, the documents and two more workers, written while the check runs.** A line-counting script over both rounds; `tour.md` at 08:15:15, 31 rows of formula, Dyalog, Fortress, note; the tour render worker at 08:15:58; the gap reproducers built at 08:16:48 (four interpreter runs, and `g175_fail_exit` renamed `g170_fail_exit`); `gaps.md` at 08:18:05; the replication worker at 08:18:22; `design.md` at 08:19:59 and `README.md` at 08:20:12. Commit 5b10f5a41.

10. **08:20:20 to 08:24:21, the numbers.** The one-thread verdict is read into `design.md` by script (36 PASS, 420 s), the attention render is checked by eye from `att_b.png`, and at 08:24:01 the four-thread output is diffed against the one-thread output outside the timing lines: identical, 248 s. Commits 4beb1abab and f0896f9a7.

11. **08:29:22 to 08:30:44, the replication applied.** All 17 rows reproduce; nine carry corrections to cited line numbers, quoted text and counts. The coordinator applies them, and for the one correction that says row 160's third clause had no cited reproducer it writes a new one, `probes/g160_literal_infer/G160.fss`, and runs it. Commit c2aab795b.

12. **08:30:52 to 08:34:18, close.** A 2 min 27 s wait on the last worker with nothing else started, stated as such. `tour.html` arrives at 08:33:16; the coordinator renders the top of the page with headless Chromium and looks at it, adds the layout note to `README.md`, marks Run C3 done in `explorations/microgpt-run-c-handover.md`, commits 9fbddee95 and 439ec4ed9, fast-forwards `main`, and reports.

## Dead ends

| attempt | why it was dropped | evidence |
|---|---|---|
| declaring the postfix `opr (m: Matrix[\RR64,r,c\])^T` in `FlatArrays.fsi` so the vocabulary exports it | the api file is a `Syntax Error` at the following line; removing it then leaves `Operator postfix ^T is not defined.` in the importing component. The operator was moved into the model component, one line, and the api does not export it | `FlatArrays.fsi:16:1: Syntax Error` at 08:03:46; `Smoke.fss:16:32: Operator postfix ^T is not defined.` at 08:04:20; gap row 156 |
| three further api spellings of the same operator (`opr[\nat r, nat c\] (m: …)^T`, `opr (m: AnyMatrix)^T`, `^T^`) | the first two are the same syntax error; `^T^` parses but gives "The operator, ^, is always an infix operator but it is declared to be postfix"; a plain postfix `!` in an api runs, which bounds the claim | `probes/g156_api_postfix/UseTr1.fss`, `UseTr4.fss`, `UseTr5.fss`; transcript 08:04:34 and 08:05:28 |
| parameters named `rows` and `cols` in `FlatArrays`, `block` in `FlatData` | each collides with a function of the same component or its imports: `Variable rows is already declared.` and `Variable block is already declared.`, reported at the api file. Renamed `nr`/`nc` and `blk`; the same clash then recurred inside `FlatArrays.fss` — three compile rounds in all | 08:04:00 (`FlatArrays.fsi:11:47-49`, `12:73-75`, `FlatData.fsi:20:26-29`), 08:04:09, 08:04:16, 08:06:28 (`FlatArrays.fss:59:15-17`, `112:6-8`, `115:59-61`), 08:06:34; gap rows 163, 164 |
| a local named `rows` in the check | the same rule again, one round later and after the first check run had been started: `MicroGptFlatCheck.fss:33:5-7: Variable rows is already declared.`, `exit 255`. Renamed `lines` | 08:10:17; `design.md`, "Two mistakes this run made" |
| the untyped lambda `rows(fn (r) => SUM r, x)` for the scalar-result lift | an untyped lambda has no arrow type at dispatch, so it silently took the vector-result overload; typed to `fn (r: Array[\RR64,ZZ32\]): RR64 => SUM r`. The model's other lambdas stay untyped, because there the overloads differ in another argument | 08:06:48; `probes/g158_untyped_overload/G158.fss`; gap row 158 |
| `reflect` without `import NatReflect` in `FlatArrays.fss` | `N is undefined.` at four positions; the import was added at 08:06:23 | 08:05:37 result; round one hit the same thing |
| the row lift as stack-by-first-result through an `Array[\Any\]` (the APL base's way) | built, checked, timed and rendered by the worker, then rejected: every row function's result rank is known here, so the `Any` round trip costs without buying rank inference. 710/1790 ms at four threads | `probes/lift_a.fss`, `lift_a.t4.out`, `lift_REPORT.md`; `design.md` |
| the row lift as a generator of `Row` views consumed by a list comprehension | the closest form to APL at the declaration and 1.6× faster than A at four threads, but it needs a `List`, a `stack` and a generator of views for what form C does with one loop, and the call site reads the same | `probes/lift_b.fss`; `design.md` |
| the elementwise algebra on a wrapper object of one's own | 70 declaration lines against 43, a `.a` unwrap inside the softmax and a wrap at every construction site, the library's product and `.t()` reachable only through hoisted helpers, and 51.9 s against 41.3 s on the Adam benchmark | `probes/alg_b.fss`, `alg_b.out`, `alg_REPORT.md` |
| the attention block as round one's two `for d, h` loops over block views | seventeen lines of index arithmetic in the middle of the program, against six for the `cells` lift, for a 7 % speed advantage | `probes/att_a.fss`, `att_REPORT.md` |
| the attention block as per-head cells in a rank-3 array with `heads`/`unheads` | the same six model lines but twenty more helper lines, 4096 floats of pure relayout per step, and 21 % slower than the block loops | `probes/att_c.fss`; `design.md` |
| within the chosen `cells` form, writing results through block views into a preallocated matrix | that form must evaluate cell (0, 0) twice; results are collected into an `Array[\Any\]` and assembled by one `mat` fill instead | `att_REPORT.md`; `design.md` |
| `g175_fail_exit` as the reproducer directory name | a numbering slip; renamed `g170_fail_exit` when `gaps.md` was written | 08:16:48 |
| a four-column `tour.html` (formula, Dyalog, Fortress, note side by side) | four columns shrink the two renders below legibility; the page puts the formula beside the Fortress with the Dyalog and the note beneath | `README.md`; the render worker's report |

## Delegations

| # | task as briefed, in one line | model | tokens | what came back and where it lives now |
|---|---|---|---|---|
| 1 | Survey every operator and method the library declares on `Vector` and `Matrix`, with line numbers, what the array traits add above them, how the library declares those operators generically, and what is absent — with runnable checks | opus | output 17,846; context 3.8e6 | A 531-line inventory with 34 runnable components, separating what is given from what is absent and naming the five spec rules that govern a user `opr`. `explorations/run-c3/survey.md`, `probes/survey/` |
| 2 | Probe the row lift in three forms, with outputs, timings at one and four threads, and renders; achieve each form rather than confirm a failure | opus | output 39,631; context 6.0e6 | Three working forms, all spelling the call `rows(f, m)`, with identical checksums across six runs, plus the finding that four `rows` overloads differing only in arrow type coexist. `probes/lift_REPORT.md`, `lift_*` |
| 3 | Probe the elementwise algebra in two forms: operators on the shipped families against a wrapper type | opus | output 21,747; context 4.0e6 | Both forms run the five formulas; 24 `opr` plus four function overloads coexist with the library's number operators with no ambiguity; the wrapper costs 70 lines, two unwraps and 1.26× the time. `probes/alg_REPORT.md`, `alg_*` |
| 4 | Probe the attention block in three forms: round one's block loops, a `cells` lift, and rank-3 cells with copies | opus | output 32,744; context 4.9e6 | Three forms agreeing to the last digit, with block lines, helper lines, floats copied and timings tabulated per form. `probes/att_REPORT.md`, `att_*` |
| 5 | Turn `tour.md` into a self-contained `tour.html`: formula by LaTeX, Fortress by Fortify, no external resources, readable at phone width and in a dark theme | opus | output 39,771; context 8.3e6 | 31 of 31 rows with all four cells, every `.tic` and formula compiling clean, and three rendering defects found and fixed (glyph-ID collisions between inlined SVGs, a missing charset, two formula cells that mix prose). `tour.html`, `probes/tour/` with the rebuild recipe |
| 6 | Re-run every reproducer cited by `gaps.md` rows 156–172 and judge whether each row's wording is exactly what the output shows | opus | output 22,886; context 3.3e6 | All 17 rows reproduce; nine carry corrections to cited line numbers, quoted text, counts and one unobservable inference. `probes/REPLICATION.md` |

## Delegation and its cost

Launches, completions and cost. "Finished" is the completion notice where there is one; the attention worker produced no notice, so its last transcript record is used.

| # | worker (description) | launched | finished | wall | tokens (output / context) | notice `subagent_tokens` | tool uses | delivered | taken into the tree | rejected |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Survey shipped array algebra | 07:39:41 | 07:51:51 | 12 min 10 s | 17,846 / 3.8e6 | 154,458 | 38 | `survey.md`, 531 lines, 34 runnable checks | copied whole into `explorations/run-c3/survey.md`; its essentials condensed into `design.md`'s survey section; it fixed which operators the vocabulary declares and which it must not rewrite | nothing recorded |
| 2 | Probe row lift forms and gates | 07:44:58 | 08:01:17 | 16 min 19 s | 39,631 / 6.0e6 | 159,691 | 58 | three working lift forms with timings and renders, a shared header with `rmsn`, `sm`, `rmsnB` at vector level, and six gap findings | form C and the `Row` view went into `FlatArrays.fss`; the header's vector-level row functions went into the model; gap rows 157, 159, 160, 161, 165, 166 | forms A and B, with the reason and the numbers recorded in `design.md` |
| 3 | Probe elementwise algebra forms | 07:45:43 | 07:59:40 | 13 min 57 s | 21,747 / 4.0e6 | 154,355 | 43 | two algebras, each running five formulas, with declaration counts, wrap counts and an Adam benchmark | form A's operator declarations went into `FlatArrays.fss`; gap rows 168 and 172 | form B, the wrapper type |
| 4 | Probe attention block forms | 07:46:29 | 08:05:28 | 18 min 59 s | 32,744 / 4.9e6 | — (no notice) | 49 | three attention forms with block lines, helper lines, floats copied and timings | form B's `cells` lift went into `FlatArrays.fss` in its generic form; gap rows 162, 163, 171 | forms A and C; and inside form B, the variant that writes through block views |
| 5 | Render tour.html with Fortify | 08:15:58 | 08:33:16 | 17 min 18 s | 39,771 / 8.3e6 | 163,774 | 77 | `tour.html`, 1.7 MB, 31 rows, self-contained, plus sources and a rebuild recipe | taken whole; the coordinator screenshotted the top of the page and added the worker's layout reasoning to `README.md` | nothing |
| 6 | Replicate C3 gap rows | 08:18:22 | 08:29:22 | 11 min 0 s | 22,886 / 3.3e6 | 135,730 | 41 | a row-by-row verdict table and nine corrections | all nine corrections applied to `gaps.md`; one of them prompted a new reproducer, `probes/g160_literal_infer/G160.fss`, written and run by the coordinator | nothing |
| | total | | | | 174,625 / 3.0e7 | | 306 | | | |

The coordinator's own cost over the same period: 102 assistant turns across 179 records, output 132,886 tokens, context processed 2.4e7. Tool calls by kind:

| tool | calls |
|---|---|
| Bash | 71 |
| Write | 8 |
| Agent | 6 |
| Read | 3 |
| Edit | 1 |
| total | 89 |

Of the 71 Bash calls, 16 invoke the interpreter, 22 invocations in all: one `fail` probe, ten compile-and-run rounds on the components and the smoke test, five api spellings of `^T`, four gap reproducers, one five-step model run and the two check runs. Thirteen calls are `git commit`; one is the backgrounded check. The three `Read` calls are the handover, `att_b.png` and the screenshot of `tour.html` — every other file was read through `cat`, `sed` or `grep` in Bash.

Wall-clock overlap. The period is 56 min 31 s. The union of the six worker intervals is 43 min 5 s, in two blocks: 07:39:41 to 08:05:28 (the survey and the three probes) and 08:15:58 to 08:33:16 (the render and the replication). For 13 min 26 s — the 07:37:47 to 07:39:41 read-in, the 08:05:28 to 08:15:58 stretch that contains the vocabulary's last fixes, the model run, the check start and `tour.md`, and the 08:33:16 to 08:34:18 close — no worker was running. The coordinator was not idle for most of the covered time either: its own longest waits inside those blocks are 6 min 41 s at 07:53 and 5 min 5 s at 08:24, and it states both as waits and starts nothing else.

What waited on a worker and what did not. The vocabulary component `FlatArrays.fss` is the critical-path artifact: it was first written at 08:02:45, after the algebra report (07:59:40) and the lift report (08:01:17), and it was still being changed at 08:06:23 to take the attention worker's `cells` lift. Every design decision the brief asked to be probed — which lift, which algebra, which attention shape — waited for its worker and is argued in `design.md` from the worker's numbers. `survey.md` likewise could not exist before its worker. `tour.html` gated the close of the run: the final commits at 08:33:41 and 08:33:57 follow the render report at 08:33:16 by 25 seconds. The replication gated the last edits to `gaps.md` at 08:29:58.

What did not wait: the model, the data component and the check were drafted while all four early workers ran. `FlatData.fss` was first written at 07:48:09, `MicroGptFlat.fss` at 07:48:56 and `MicroGptFlatCheck.fss` at 07:49:31 — eight to eleven minutes after the survey worker went out and two to three minutes after the last probe worker. They were written formula-first against spellings the probes had not settled, and the model draft was forecast at "about 85 code lines" before any probe reported; it landed at 91. `tour.md` (08:15:15), `gaps.md` (08:18:05), `design.md` (08:19:59) and `README.md` (08:20:12) were all written while the one-thread check ran in the background and, for the last three, while the render worker ran.

Comparison with round one, which did the same program alone.

| | Run C, round one | Run C3 |
|---|---|---|
| wall time | 50 min 50 s | 56 min 31 s |
| strategy | single long context, no delegation | coordinator with six opus workers |
| coordinator output tokens | 1.4e5 (6.2e5 as `09-run-c.md` states it) | 1.3e5 (2.8e5 on the same basis) |
| coordinator context processed | 2.9e7 (6.2e7 as stated) | 2.4e7 (4.2e7 on the same basis) |
| worker output tokens | none | 1.7e5 |
| worker context processed | none | 3.0e7 |
| total output tokens | 1.4e5 | 3.1e5 |
| total context processed | 2.9e7 | 5.4e7 |

The two bases differ because a single assistant message is often split across two or three transcript records that each repeat the same `usage` block. `09-run-c.md` summed over records; summing over messages gives 136,027 output and 2.9e7 context for round one, against 132,886 and 2.4e7 for Run C3. On either basis the coordinator's own consumption is slightly below round one's while the run is six minutes longer, and the delegation roughly doubles the total: the workers spent more output tokens than the thread that directed them.

## Gaps found

The run's gap table is `explorations/run-c3/gaps.md`, 17 rows numbered 156 to 172 in the eight-column format of `explorations/fortress-gap-ledger.md`. The ledger stood at 155 rows, so all 17 are new by construction of the numbering; the run states that Run C2's rows, on another branch, are not visible to it and will be renumbered at the merge. Findings that only repeat an existing row are cited inside a related row rather than given a row of their own: rows 18, 20, 50, 102 and 147 came up again and were not rewritten. Ten rows are negative, seven positive, several carrying both marks. Every row was replicated by a separate worker; no re-verification was done for this record.

| row | one line |
|---|---|
| 156 | an api cannot declare a postfix operator whose name is an exponent operator (`^T`), though a component can and a plain postfix `!` can; the cause is a missing `/` before `caret` in `Parameter.rats:171-172` |
| 157 | a `nat`-generic function cannot be passed as a function value; the diagnostic is a unification error with type `null` |
| 158 | two overloads differing only in the arrow type of a function parameter are resolved by a typed lambda but not by an untyped one, and the wrong one is taken without a diagnostic |
| 159 | an operator is not a function value; `(×)` in argument position gives an `InterpreterBug` |
| 160 | an array literal whose elements are matrices is array pasting, not a vector of matrices; an untyped literal in a body cannot infer its element type |
| 161 | parenthesising a call still does not allow a postfix operator after it |
| 162 | static parameters after the value parameters of an ordinary function are a bare syntax error; only the postfix `opr` form allows that placement |
| 163 | a top-level value may not share its name with a `nat` static parameter of a function in the same component |
| 164 | row 92's no-shadowing rule holds in api files too: a parameter may not be named like a function the api declares |
| 165 | a rank-2 indexed assignment takes two scalar indices only; a vector into a row slice fails to find an overload |
| 166 | a vector is written into a row, and a matrix into a view of a vector, by `assign` through the view's `put` |
| 167 | overload resolution does distinguish declarations differing only in the arrow type of a function parameter when the argument is typed |
| 168 | twenty-four user operator overloads on `Vector` and `Matrix` coexist with the library's number operators with no ambiguity |
| 169 | an object with methods declared in an api is constructed in its component and used through the api, including as the type of an exported top-level value; top-level mutable counters work |
| 170 | `fail(s)` ends the program with exit status 1 after flushing prior output |
| 171 | parallel `for` over cells into `Any` slots and over rows through `Row` views give results identical to the last digit at one and four threads |
| 172 | `/` on two `ZZ32`s yields a rational, so a learning-rate schedule written that way is exact `QQ` arithmetic |

## Findings

The run put its first delegation out one minute fifty-four seconds after it started, before it had finished reading round one, and the last three within nine minutes of the start. That is the shape of the whole run: the coordinator never ran an exploratory probe of its own except the two-minute `fail` check at 07:46:57 and the five `^T` api spellings it could not hand off because it was already inside the failure. Every claim in `gaps.md` that says something cannot be done came from a worker that had been told to achieve the thing, and the two positive rows about overloading (167, 168) are by-products of workers trying to build what they were asked for rather than of a hunt for gaps.

The three-way probe was not cheap and it changed two of the three answers. The row lift's fastest form at four threads was the least APL-like of the three, and the run took it and said so in `design.md`; the attention's chosen form is 7 % slower at one thread than the loops it replaced and was taken for six lines against seventeen. Only the algebra probe confirmed the obvious choice. The numbers are in the record because the workers were asked for timings at one and four threads, not because the coordinator measured anything itself: of its 22 interpreter invocations, two are the checks and one is the five-step model run.

Time was lost in one place, and it was the same mistake four times. Naming a parameter after a function of the same component or its imports produced `Variable X is already declared.` at 08:04:00, 08:04:16, 08:06:28 and 08:10:17 — three compile rounds on the components and one on the check, the last of which threw away a check run that had already been started. The rule was in the ledger as row 92; the run recognised it only in its api form, added it as row 164, and wrote it into `design.md` as one of two mistakes it admits. Against that, the model itself ran at the first attempt after the smoke test and its five losses matched the goldens without an intermediate failure.

The prior work in the tree was used as material and the run says plainly that it is not blinded: it read round one's program, its design table and the Phase 1 review's punch list in the first three minutes, and it accepted the review's diagnosis as the premise of the rewrite. What it did not read is round two's tree on the other branch, and it records that as the reason Phase 2 is somebody else's job. The brief's own line "delegate only mechanical work; the point is one focused context" was overridden, which the run does not hide — `design.md` lists the six delegations in its Process section — but the record should note that the brief and the run disagree here, and that the disagreement is the run's single largest structural choice.

The result against the effort: 469 code lines across four components and three apis, 36 of 36 checks passing at both thread counts with values identical to round one's digits, a 2× speed-up over round one at one thread that came out of choosing between probed forms rather than out of any tuning, 31 tour rows rendered, and 17 gap rows all replicated. The model missed the brief's line target by 41 lines, and the run priced the miss rather than arguing with it: 45 lines are the step, the row functions, Adam, the mask and the loop, and each of the other 46 is named with the Fortress limit that forces it.

## Recovered reports

The six workers' reports are already in the tree beside the probes they cite — `explorations/run-c3/survey.md`, `probes/lift_REPORT.md`, `probes/alg_REPORT.md`, `probes/att_REPORT.md`, `probes/REPLICATION.md`, and the render worker's sources and recipe in `probes/tour/`. None carries the two-line provenance comment the format asks for; adding it was outside this record's write scope.

The coordinator's own summaries to Pavol at the ends of its phases, verbatim:

07:50:11, after the four early launches and the three drafts:

> Four Opus workers are running in parallel: the library and specification survey (the brief's inventory table with line numbers), and the three alternatives probes the brief requires, each in two or three forms with renders and timings at one and four threads: the row lift, the elementwise algebra, and the attention block. All probes land under `explorations/run-c3/probes/`.

07:52:30, on the survey:

> It settles the vocabulary's ground: the library gives array `+`/`-`, scalar multiplication both orders, `DOT` and juxtaposition products, `t()` as a view, and reductions over any array as a generator; absent are Hadamard, any `/`, scalar `+`/`-`, elementwise transcendentals and 0/1 comparisons, all of which a top-level `opr` fills (five forms verified). The three alternatives probes on the row lift, the algebra and the attention block are still running; the design waits on them.

07:59:45, on the first probe to report:

> Form A of the algebra is settled: operators on the shipped families, 28 overloads, no ambiguity, and the Adam line parses as the formula without extra parentheses. Two spellings for the model follow from it: `SUM v` works but `BIG MAX v` does not, so the softmax keeps its generator. Waiting on the lift and attention probes.

08:20:54, on the one-thread check:

> The one-thread check passes 36 of 36 with an ALL PASS verdict and exit status 0, in 420 s against round one's 855 s; the measured differences are the same digits as round one's.

08:30:21, on the replication:

> The replication confirmed all seventeen gap rows and its corrections are applied and pushed. The only item still outstanding is the tour render worker; nothing else depends on anything but its report, so I wait for it.

08:34:18, closing, on the line budget:

> **Line budget, honestly.** The model misses the brief's target of about 50 lines: 91, of which the step and the row functions, Adam, the mask and the loop are 45. The other 46 are declarations Fortress refuses to shorten, each named with its reason in `design.md`: fourteen hyperparameters one per line, `flat` with nine typed parameters because an array literal of matrices is pasting and type aliases are unimplemented, the two `heads` wrappers for the same reason, and the transpose operator in the model because an api cannot declare a postfix `^T`.

and, in the same message, on the method:

> A worker surveyed the shipped array algebra with line numbers before any design (`survey.md`, 34 runnable checks). Three workers probed the alternatives in two or three forms each with renders and timings at one and four threads: the row lift (form C, a parallel `for` through row views, taken over stack-by-first-result and list comprehension), the elementwise algebra (operators on the shipped families, taken over a wrapper type), and the attention block (a `cells` lift over block views with the heads side by side, zero copy, six lines for the Dyalog's six, taken over round one's loops and over rank-3 copies). The rejected forms and the numbers are in `design.md`.
