<!-- The judge's account of climb batch 30's record-landing (d89fc0fda4): one line per change that changed a file; 73 applied, 0 held, 17 owed nothing or kept their text. -->

# Climb batch 30's record-landing

## FACTS

- C3, F-19, the pass: one statement of the forked arguments, with "joins: F-350", rows 982 and 987 for the calls not counted, and the strided range at `RangeInternals.fss:1498-1585`. Ground: check.md C3; `ParallelismAnalyzer.java:204-226` (read).
- C4, F-134, the pass: "(row 497, fixed; …)" out; the arm sentence states what holds. Ground: RECORD.md, the review's corrections.
- C5, F-347, the pass: "row 971, fixed" out; the task runs inside the root task (F-348).
- C6, F-348, the pass, +161: the start costs about 40 ms more, "five runs twice each"; the arguments are set before the classes initialize. Ground: the review, section 2 (`:82`); `MainWrapper.java:92-95` (read).
- C7, F-349, the pass: row 958 out; the chain of three is "(a probe, no test)". Ground: rung N's SKEPTIC.md:24.
- C8, F-350, the pass, +348: the range "splits only a range of more than `grainSize`, 16, elements"; by reading, microGPT's widths 16, 16, 4, 4 fork nothing on either path. Ground: the review, finding 1; `RangeInternals.fss:1320` (read).
- C9, F-351, the pass: the title states the fact; the block starts again for an abort "that names that transaction or names none"; row 984 as "Open". Ground: `BaseTask.java:293-314` (read).
- C10, F-57, made false: walk refuses both, out of range and rounding to an infinity, when the typed place runs. Ground: row 967.
- C11, F-341, stale, +532: the infinity clause; walk's load check of a numeral type extended or as a static argument (row 981); six tests. Ground: rung N's report, section 1.
- C12, F-283, stale: "(row 986)".
- C13 to C17, F-175, F-268, F-302, F-315, F-337: cited lines re-anchored. Ground: check.md, each range compared by diff.

## POSITIONS (his rule of 2026-10-31)

- C18, P-175, made false: "and splits down to single elements (`…:1308-1342`); the code generator evaluates a call's arguments in order (F-19, row 951), under the team's comment … (`CodeGen.java:7068`), so every `SUM` … would run … once compiled programs run …" becomes "and split down to single elements when the curator decided (`…:1312-1350`); the code generator evaluated …, under the team's comment …, so every `SUM` … would have run … once compiled programs ran …"; "does not do (`CodeGen.genParallelExprs` joins on the normal path only, row 947; …)" becomes "did not do (`CodeGen.genParallelExprs` joined on the normal path only; …); F-350 gives what it does now"; decision unchanged. Ground: `76b21f4981`; rows 947, 951 closed.
- C19, P-174, made false: "Rows 960 and 974 … and walk running a numeral type written as a static argument or as a type that an object or a trait extends" becomes "Rows 960 and 981 … and walk running a numeral type written in a `comprises` clause"; decision unchanged. Ground: row 974 closed, `f36a651243`; row 981.
- C20, P-176, made false: "Rows 957 and 971 hold … a type parameter, and a coercion that spawns a task" becomes "Row 957 holds … a type parameter"; decision unchanged. Ground: row 971 closed, `f36a651243`.

## The ledger

- C24, row 987, new, section 11, CONTESTED, no reproducer: the analyzer counts a call as worth a task by where its function is declared, one declared below the call not; by reading. Ground: rung P's SKEPTIC.md, "Which calls count"; `ParallelismAnalyzer.java:204-226` (read).

## PLAN

- Rewritten, 16 lines: C26 to C29, C31, C35 to C38, C61, C77, and the PLAN lines of C67, C70, C71, C72, C75; with them the opening paragraphs of climb batches 28's, 29's and 29b's lists (not in `owed.md`).
- New, 12 lines: C30 (the batch's line), C39 (parked: rows 983, 640, 987), C48 (items 80 to 82, the findings), C62 (one list line), C63 (items 83, 84), C64 (item 85), with two group lines.
- Built, to PLAN-history: C32, C33, C40 (item 74), C46 (items 78 and 79), C59, C65, C68, C73, C76.
- Answered, to PLAN-history: C42 (item 76, his go of 07:4x), C44 (item 77, his answer of 11:3x).
- Cut to a pointer, 7 lines: C52 to C58.
- C29, "Next", for the coordinator to read: the three findings at their defaults, his numeral rule into POSITIONS, then climb batch 30b on his go of 07:4x; the sentence on the Fable review is not carried over (the queue's head keeps it).
- 42 lines left PLAN; each stands word for word in PLAN-history, "Climb batch 30's landing, 2026-11-10".

## The review queue

- C50, item 500, new, consequential: is the grain 16 kept, at the model's width of 16; default (a), as landed, until measured after the switch-over; needed by before the next batch, or at the default.
- C51, item 501, new, consequential: P-175's three readings by rung P (no joins on a JVM error, later arms' exceptions dropped, the analyzer kept; row 987); default as landed; needed by as item 500.
- C47, item 488, reworded, open in (b), consequential: fork N1 as landed, four ways, about 40 ms; default as landed; needed by as item 500.
- C53, item 502, new, consequential: row 980, an untyped numeral that rounds to an infinity; no default on record; needed by no planned work (set by the landing workflow; "set" below).
- C54, item 503, new, routine: row 981 and fork N3; default as landed; no planned work (set).
- C55, item 504, new, consequential: row 984; default open, not repaired; needed by with item 510's answer (set).
- C56, item 505, new, consequential: a nested block restarts, not throws; default as landed; no planned work (set).
- C57, item 506, new, consequential (kind set): row 985, when walk is repaired; no default on record; no planned work (set).
- C58, item 507, new, routine (kind set): row 986, told; default the row open; no planned work (set).
- C62, item 508, new, routine: nine forks, each as landed; no planned work (set).
- C63, items 509 and 510, new, consequential (kind set): D1 and D2, not yet asked; no default on record; no planned work (set).
- C64, item 511, new, routine (kind set): row 876; no default on record; no planned work (set).
- C49, item 489, reworded and moved from (b) to (c), routine (kind set): fork N2, told; default as landed; no planned work (set).
- C67, item 418, reworded, open: fork X5 built its other way; default now as landed.
- C70, C71, C72, C75, C78: items 459, 457, 470, 495, and the "Needed by" lines of 450, 461 and 462, brought to the landing.
- To (a), a decision of his: C43, item 449; C45, item 487. To (a), a closed row: C41, item 408 (row 933); C66, item 413 (rows 934, 937, 888); C69, item 425; C74, item 493 (row 974).
- C79, C80: the head's groups and counts (185 open, 74 consequential, 111 routine); eight items' homes in PLAN-history.

## INDEX and the other notes

- C81, `map/modules-and-phases.md:423`, `map/compile-path-walkthrough.md:519-522`: `MainWrapper.main` sets the arguments (`:94`), initializes the classes (`:30-46`, `:95`), then invokes `main`. INDEX: no change.

## Held

- None.

## For the curator

- POSITIONS changed without his yes, under his rule: P-175, P-174, P-176, with the words above. Unchanged, waiting on him (C22): P-175 against the JVM error and the grain of 16, P-176 against the order of a coercion's effects.
- His word needed: items 500, 488, 501 (the review's findings 1, 2, 3); then 502, 504, 505, 506; 509 and 510 once written for him.
- No default on record: items 502, 506, 509, 510, 511.
- Set by the workflow: kinds of 489 (routine), 506 (consequential), 507 (routine), 509 and 510 (consequential), 511 (routine); "Needed by" of 489, 502 to 508, 509 to 511, 418, 459, 461, 495 (no planned work; 504 with item 510), 450 (before the names batch) and 462 (with climb batch 30b's rung C).
- (a), "Answered by a decision of his": 449, "numeral batch as my go, but together with the parallelism work." (07:4x UTC, 2026-11-10; `BOOT.md` at `4f66eaab35`:13); 487, "I think one is fine and I don't think I have categorically excluded it before." (11:3x UTC; `HELD.md`).

## For the coordinator

- `owed.md`, "For the coordinator", stands whole; first C21: his numeral rule into P-46, P-49, P-173 by a record writer before climb batch 30b.
- To confirm: row 987's status, CONTESTED against NEGATIVE-BOUNDED; item 489's kind, routine by `owed.md`, though the review lists fork N2 as consequential for him; F-341 holding the load check, against a new entry.
- The boot note: "Next" as PLAN's; item 408 went to (a) by the closed row; 3.13M is 2.92M. The held list lacks his go of 07:4x, which item 449's (a) entry cites from the boot note.
- Item 495 names a leftover in no batch: `tests/NumeralTypesWalk.fss:41`'s message.
- Not written, by the entries writer's note: F-351 on a nested block's restart (item 505 holds it); F-349 on a cycle of coercions.
- For the skill writer: "rung", "root task" and "springboard" are not in the `fortress-repo` skill.

## Checks

- reset: the six record files at f592b7c0f.
- words-subset.py: no cut-only change; POSITIONS lines: exit 1, information (P-175, P-174, P-176 add words).
- record.py apply final.apply: pass, 18 blocks. No final.rewrite. ledger.py add, rows.add: pass, row 987.
- record.py check --base f592b7c0f: pass. ledger.py check: pass. landing-check 9d0147ff9: pass.
- check-index.sh: pass.
- plan-moves.py: pass; LOOK `:84` (C34), `:204` (C88), kept.
- queue-check.py: pass; 12 new, 185 open.
- lengths.py: pass; 4 past 600 grew, F-283, F-341, F-348, F-350, each by its owed clause.
- git diff --stat f592b7c0f: 10 files.

## Next

- The two commits: the workflow result's `land.commits` gives them as landed on `main`.
- `Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/orientation/orientation.js', args: { mode: 'update', out: '/home/user/fortress/explorations/compile-ladder/climb-batch-30/orientation/', stream: 'orientation-b30', facts: ['F-19', 'F-53', 'F-57', 'F-134', 'F-175', 'F-240', 'F-268', 'F-283', 'F-302', 'F-315', 'F-337', 'F-341', 'F-347', 'F-348', 'F-349', 'F-350', 'F-351', 'P-174', 'P-175', 'P-176'] } })`
