<!-- The corrections run of 2026-10-28 and 2026-10-29 in one page: the eighteen POSITIONS entries by chunk with their old and new lengths, whether they changed and the questions the runs left for the curator, the nine trap scenarios' final scores, new against old, and the tokens written by the runs and their checks; written by the Opus worker that ran the checks (p/checks.md, p/checks-2.md, c1/checks.md, c2/checks.md), saved by the coordinator. -->

# The corrections run: summary

Lengths are in characters, from `length-table.py` over copy p (the old entries at `d4d5fa990`) and copy q (all three chunks applied). Nothing is applied on `main`. Each entry's questions are counted in two parts: "new" is a question added to its chunk's `queue.md`, and "item" is a review-queue item that the run asks again.

## The eighteen entries

- P-37, p: 1056 to 1653, changed. Questions: 2 new.
- P-26, p: 1166, unchanged. Questions: 4 new, 1 item (215).
- P-43, p: 662 to 950, changed. Questions: 2 items (219, 220).
- P-158, p: 867 to 983, changed. Questions: 1 item (280).
- P-7, c1: 890, unchanged. Questions: 1 new.
- P-27, c1: 452 to 754, changed. Questions: 1 item (216).
- P-146, c1: 1284 to 1568, changed. Questions: none.
- P-153, c1: 1142 to 1257, changed. Questions: 1 new.
- P-154, c1: 1115 to 1270, changed. Questions: 1 new.
- P-12, c1: 656 to 1100, changed. Questions: none.
- P-17, c1: 495 to 754, changed. Questions: 1 new.
- P-33, c2: 913 to 1060, changed. Questions: 2 new, 1 item (283).
- P-42, c2: 639 to 1126, changed. Questions: none (the new text answers item 218).
- P-58, c2: 1148 to 1376, changed. Questions: 1 item (282).
- P-59, c2: 930 to 774, changed by a strike only. Questions: none (the strike answers item 221).
- P-84, c2: 938 to 1138, changed. Questions: none.
- P-85, c2: 851, unchanged. Questions: 1 new.
- P-155, c2: 1080, unchanged. Questions: 1 item (279); item 288 stands.

In all: 16,284 to 19,750 characters (+21%). 14 entries changed and 4 are unchanged. The runs left 13 new questions and asked 8 items again. No judge held an entry. Five entries grew beyond half again: P-37 (+57%), P-27 (+67%), P-12 (+68%), P-17 (+52%) and P-42 (+76%).

## The nine trap scenarios, new against old, of 3

These are the final readings. A second reading was run where the first put the new texts lower. Scenarios 1 to 4 also carry the old entries' 10-26 score as a bar.

- 1, the tuple-typed dotted method (P-26, P-42, P-77): new 3, old 3 (10-26: 3).
- 2, the order traits' self type (P-26, P-37, P-146, P-27), with all four entries in their final form: new 3, old 3 (10-26: 2). The earlier readings with only the pilot's texts gave new 2 and 2.
- 3, the `case` guard (P-37, P-43, P-77, F-133): new 2 then 3, old 3 then 3 (10-26: 3).
- 4, `System` after the switch-over (P-37, P-33, F-32, F-290): new 2 then 1, old 3 then 3 (10-26: 2). Fail. It traces to P-37's "does not say whether `CompilerSystem` goes" and P-33's "are not part of phase 3".
- 5, the export rule (P-158, P-26, P-95): new 3, old 2 (old 3 against the pilot's first texts).
- 6, a self-typed trait at an element type (P-146, P-27): new 2 then 3, old 3 then 3.
- 7, the integer power's helper (P-153, P-26, P-8): new 2, old 2. Both readers kept "the team's later code" as the ground for the power's type.
- 8, the tuples' order (P-154, P-26, P-8): new 1 then 3, old 3 then 1.
- 9, the symbolic operators (P-155, P-33, F-287): new 3, old 3.

On each scenario's better reading, the new texts are not below the old ones in eight of the nine scenarios. Scenario 4 is below on both readings.

## Tokens written

Tokens written means input plus cache creation. For each workflow run, the figure is its journal's agent transcripts (`spend.py`) plus the headless writer stream's JSON in `tmp/record-writer/`. For the checks, it is each headless run's result plus the checking worker's own transcript.

- p, first run (`wf_6fca2a6e-cc0`): 0.68M agents, 0.14M writer, 0.82M in all.
- p, second run (`wf_cbab4b96-2dd`): 0.58M agents, 0.13M writer, 0.71M in all.
- c1 (`wf_96f3286c-7a6`): 0.76M agents, 0.17M writer, 0.93M in all.
- c2 (`wf_f19921b3-005`): 0.73M agents, 0.14M writer, 0.87M in all.
- The checks' 18 readers and 7 graders: 1.58M (p 0.25M, 0.27M, 0.16M; c1 0.28M, 0.19M; c2 0.25M, 0.17M).
- The checking worker's own transcript, over the four check tasks: 0.94M.

Runs 3.33M and checks 2.52M, so 5.85M in all, against the run note's estimate of 4.6M to 6.3M. This leaves out the coordinating session and the page writers.
