<!-- The record-landing workflow's check of climb batch 24's first round: each change of owed.md judged for coverage, fidelity, form and routing against its ground, with each failure's passage, source and correction, then the mechanical checks of mech-1.md. -->

# The check of climb batch 24's landing, round 1

Read against `owed.md` and the evidence of this folder, the worktree's changes (`git -C /home/user/fortress-landing-24-replay diff 43cd61b62 -- explorations/`), `entries-report.md` and `routing-report.md`, with the rules of `.claude/skills/coordinator/references/record.md` ("What an entry is", "The pass"), the clarity checker's step 1 and the routing's step 2 (`climb-batch-workflow.md`, "After the landing"). "Old" is the line at `43cd61b62`; "new" is the line in the worktree.

## FACTS: the pass

### C1 (F-24): pass
Old "so a division by zero elsewhere ends the run (rows 336, 848)"; new "so `REM` and `MOD` by zero on these five types end the run (rows 336, 848)". Rows 336 (`ZZ32`, `ZZ64`) and 848 (`NN32`, `NN64`, `ZZ`) hold exactly these (rows.md). The tests by pattern name the same five files. 959 characters, question 1 named.

### C2 (F-32): 1 failure
- **fidelity (evidence).** Passage: new "Detail: `perf-probes/prelude/natives-shape.md` section 2; `reviews/batch-24-review.md`, "6. The natives after phase 4's second batch"", where the old cited `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count". The entry keeps the 449's classes ("Matched against the helpers before any binding moved, the 449 were: 154 ...") and `IntLiteral`'s 24 ("4 among the 154 and 20 among the 158") and cut their lines (`FortressBuiltin.fss:489-554`). Source: the measurement of the 449 on the new base is `CLIMB-BATCH-23.md`, section 4 (`:229`, 'all A=154 B= 59 C=158 D1= 36 D2= 42 total=449'; `:246`, the 24 placed, `FortressBuiltin.fss:489-554`); `natives-shape.md` section 2 holds the 425 of `f55fd68e2`, and the review's section 6 cites F-32 itself for the classes ("The probe's classes at `a1f8c4b8b` (F-32)"), so the new Detail leaves those claims citing a section that cites them back. The pass's step 3: "The cited report section holds what the entry left out." Correction: keep `coordinator/CLIMB-BATCH-23.md`, section 4, "The count", in the Detail beside the review's section 6 (which holds the present 173 and 276 and the 173 by type).
- Otherwise sound: the 173 by declaring type and "The 276 are the 158, the 78, and 40 of the first two kinds" are the review's section 6 ("the 276 on glue classes are the 40 of A and B above, C's 158, D1's 36 and D2's 42"); "the rest of the 42 ... are off microGPT's path" holds by `natives-shape.md` section 2 (D2: reflection, `Thread`, the arrays, the task trace, `getProgramArgsPrim`; microGPT's path: `nanoTime`, `getProgramArgsPrim`, `NativeArray`). F-32 as the count's one owner is recorded as a decision not taken; see C34 for the pointers it leaves.

### C3 (F-34): pass for the pass; F-34's form failure is listed under C18, which wrote the passage

### C4 (F-53): pass, weight none
No line; F-53 unchanged, as the brief's rule on the gate's figures asks.

### C5 (F-132): pass
The `CHOOSE` sentence moved before "Its known gaps"; no word of a claim changed (1187 to 1187 characters).

### C6 (F-181): 1 failure
- **fidelity (broader).** Passage: new "It still refuses a function or method with a contract (row 701), which walk checks, raising `CallerViolation`". Old: "Walk checks a function's `requires` clause and raises `CallerViolation`." Source: row 701's claim, "walk runs the contract, and a broken `requires` raises `CallerViolation`" (rows.md). The new clause reads as every broken contract, `ensures` and `invariant` too, raising `CallerViolation`, which neither the old entry nor the row says. Correction: "It still refuses a function or method with a contract (row 701); walk runs the contract, and a broken `requires` raises `CallerViolation`."
- Otherwise sound: the title now holds one claim; row 812's sentence now names a `where`-clause variable, as row 812's claim does.

### C7 (F-240): pass, weight none beyond C20

### C8 (F-270): pass
Kept, with the questions named; the gather's code-generator sentence agrees with row 307 (rows.md).

### C9 (F-281): pass
Only `OverloadingChecker.scala:766-773` moved to the report.

### C10 (F-298): 1 failure
- **fidelity (less than the old text, not reported as a meaning change).** Passage: new "the rewrite puts a transfer helper around that argument or around the call (F-308)"; old "the rewrite puts the matching transfer helper around that argument or the call, so the checker reads the composition (F-308)". The new words drop which transfer goes in and that the checker reads the composition; `entries-report.md` gives F-298's only meaning change as row 865. Source: F-308, "the rewrite puts the matching transfer around that argument or around the call". Correction: "the rewrite puts the matching transfer helper around that argument or around the call, so the checker reads the composition (F-308)."

### C11 (F-299): pass
The count and its list by family moved to F-32 (C2); "F-32 counts these bindings" points there. The pointers in FACTS to F-299 (F-24, F-298, F-111, F-180, P-58) mean the loader, not the count. For the PLAN and queue pointers that still give F-299 for the count, see C34.

### C12 (F-303): pass
The list of the 30 is in its Detail ([S14]); "F-32 counts the bindings that name a helper" follows C2.

### C13 (F-304): 1 failure
- **fidelity (evidence).** Passage: new "The specification asks for "at most one floating-point rounding error"." with no source; old "(`basic/expressions/literals.tex:187-190`)". `entries-report.md` says "Cut: the line numbers of the specification", but the file went too, and the cited Detail section, "Defects, each with its home" ([S15]), does not hold it (the report has it at `rung-natives-float/REPORT.md:104`, under its decisions). Correction: "The specification (`basic/expressions/literals.tex`) asks for "at most one floating-point rounding error"."

### C14 (F-305): pass
"the helpers agree with the exact value and with walk's glue classes" is the sweeps' result (`choose.md:13`; `rung-natives-choose/REPORT.md:159`, `:196`, `:321`).

### C15 (F-306): pass with C19

### C16 (F-307): pass
Only the sites and `NamingCzar.java`'s lines moved to the report.

### C17 (F-308): pass with C22
"the checker accepts the composition whatever the helper computes" names who checks; "four behind rows 326, 860 and 861" are fork 18's four (`CLIMB-BATCH-24.md:123`).

## FACTS: sentences made false or stale, sizes, and facts owed

### C18 (F-34): 1 failure
- Fidelity passes: old title "Under the switch-over's setting the code generator refuses 52 declarations" and "at 52 declarations at least" are gone; new "Four of the 52 met a `where` clause in their own header as their first wall. The code generator now compiles such a clause (F-181), so the present count is not measured." is the review's finding 6.
- **form (batch in an entry).** Passage: new title "**On climb batch 22's code, under the switch-over's setting, the code generator refused 52 declarations ...**" and, kept by the pass (C3), "On climb batch 21b's base the dispatch generator refused none". The brief: no date, batch or commit in an entry; those go to its history, which keeps `2bff2fe23` and `aa5c67d48`. Correction: bound the measurement by the tree's state, not the batch: title "**Under the switch-over's setting the code generator refused 52 declarations of the library's twelve components, all of them declarations that the checker passes, measured once before it compiled a `where` clause in a declaration's own header.**", and "Measured once on an earlier base, the dispatch generator refused none of `FortressLibrary`'s 178 overload sets."

### C19 (F-306): pass
Old "end the run at a zero divisor (row 336)"; new "end the run at a zero divisor: on `ZZ64` row 336, on `ZZ` row 848." Rows 336 and 848 (rows.md).

### C20 (F-240): pass
Old "From climb batch 22's gate to climb batch 23's it stayed between about 150 s and 170 s, which no batch moved beyond noise"; new "... to climb batch 24's ...". One word; the review, section 2: "The count stage: about 150 s ... No move beyond noise." The gate's figures (150 s, 198 s, `FortressLibrary` 152 s, load 1.84, 240 s (174 s) at 1.54) are unchanged.

### C21 (F-299): pass
2789 to 2105 characters, with the questions named in `entries-report.md`.

### C22 (F-308): pass
2330 to 2002 characters, with the questions named.

### C23 (F-298): pass
2156 to 2049 characters, with the questions named.

### C24 (F-298): pass
New "The rewrite reaches only a component's top-level declarations and its traits' and objects' members: such a body in a local function or in an object expression's method stays a call of `builtinPrimitive`, and its compile stops 'Variable builtinPrimitive is not defined.', where walk runs it (row 865)." Row 865's claim and notes (rows.md).

### C25 (F-220): pass
Old "the checker count's three errors (F-53) do not include it"; new "The distance stage and the checker count find no error at the line (F-53)." F-53 gives 0.

### C26 (F-309, new): pass
`hard-set.md`, section 9, "For FACTS" (a), and section 4.2, "2a" (`ForeignJava.java:451`, `:492`; runs 2a-1 to 2a-3); in "The checker and the one library"; "No test checks it." 981 characters, question 6 and the evidence sentence named.

### C27 (F-305): pass, weight none, writer none

## POSITIONS: cut only, under his rule of 2026-10-31

### C28 (P-73): pass
- Old: "On the compiled path the rule holds as the specification's (P-25, the standard), and the compiled path departs from it at `^` (rows 523 to 525) and at `CHOOSE` (row 521)." New: "... departs from it at `^` (rows 523 to 525)."
- Decided, before and after: "Under walk, fixed-width integer arithmetic raises `IntegerOverflow` when its result does not fit, on the unsigned `NN32` and `NN64` too." Where it applies, before and after: "The rule covers every operation whose result can leave its type, `^`, `CHOOSE` and `LCM` included"; "The decision is walk's." What it requires, before and after: "Code that means to wrap uses the specification's wrapping operators ... fully parenthesised". Unchanged; words-subset 0 added words.

### C29 (P-151): pass
- Old: "Row 773: ... Row 774: walk's half of conditional extension. Row 701: the code generator's half." New: the same without "Row 701: the code generator's half."
- Decided, before and after: "Only the `where`-clause forms that the team wrote down are built: conditional extension, a function's or a method's condition, and `AnyList`'s `comprises` clause." Its reach and its requirement ("He has such a feature built where the team left enough design intent for it, or where it is on the critical path ...") unchanged.

### C30 (P-156): pass
- Old: "... where { I extends Index }`, the library's form for a member that applies at some instances only; after the switch-over the code generator's refusal of a method with a `where` clause stops it too, as it stops `SumReduction`'s two `distribute`s (row 701)." New: "... applies at some instances only."
- Decided, before and after: "A collection's index type extends `Index`, a trait that the ranges exclude, and a tuple of indices is an `Index`."; where it applies, "Every index parameter of the library's generic indexed types is bounded `I extends Index`", `BoundedRange` keeping its method condition; what it requires, that bound. Unchanged.

### C31 (P-156): pass
- Old: "A `where` constraint `I excludes Range[\I\]` was weighed and not taken: the team left such a constraint as an open question, and the code generator refuses a `where` clause in a declaration's header." New: "... as an open question."
- The decision not to take the constraint stands; one of its two reasons goes, as the sort allows, and `entries-report.md` puts the question to him. The landing report's naming is the coordinator's (C116).

## The gap ledger

### C32: pass, weight none, writer none
### C33: pass, writer none (a new row by `ledger.py add`, the coordinator's)

## PLAN: "Where we stand"

### C34 (PLAN:9): 1 failure
- **fidelity (a pointer that C21 made stale).** Passage: "At climb batch 24's landing, at which walk runs 173 of the library's bindings through helpers of `nativeHelpers/`, its float arithmetic among them (F-299)". Source: after C21 F-299 holds no count ("F-32 counts these bindings"); F-32 holds the 173, F-303 the float bindings. Correction: "(F-32, F-303)". The rest holds: 7 of 7 on both programs, all 52 demos (the review, section 5; `climb-batch-24/gate/summary.txt`).

### C35 (PLAN:11): 1 failure
- **fidelity (pointer).** Passage: "now with 173 of the library's 449 bindings read as calls of their helpers ...; 276 still name glue classes (F-299, F-32)". Source as C34. Correction: "(F-32)". The rest holds by the sort's ground: the gate at `25238e60c`, 0 and 0, '#crash none', 150 s and 198 s (F-240), and the three readings (item 326, way 2b; item 309; item 295).

### C36 (PLAN:12): pass
### C37 (PLAN:13): pass
The steps before climb batch 25 and its record, Fable review and go are the review's steps 1 to 6.

## PLAN: phase 4

### C38 (PLAN:46 moved): pass
In PLAN-history under "Phase 4. The switch-over".

### C39 (PLAN:46 new): 1 failure
- **fidelity (pointer).** Passage: "now with 173 bindings read as calls of their helpers (F-53, F-299, F-308)". Source as C34. Correction: "(F-53, F-32, F-308)". The rest holds: rungs, `25238e60c`, the pre-approved go of 08:2x (`CLIMB-BATCH-24.md:62`), Question 2 under the half-hour rule (`:92`).

### C40 (PLAN:47, climb batch 25): pass
The review's step 6 and `CLIMB-BATCH-24.md:629`; "not yet planned"; the go his.

### C41 (PLAN:49): 1 failure
- **fidelity (pointer).** Passage: "Since climb batch 24, 173 bindings name helpers and 276 still name glue classes (F-299, F-32)." Source as C34. Correction: "(F-32)". Old line in PLAN-history.

### C42 (PLAN:50): 1 failure
- **fidelity (pointer).** Passage: "and climb batch 24's 76, `Float`'s 30, `ZZ64`'s 21 with its `CHOOSE`, `ZZ`'s 16, `ZZ32`'s `CHOOSE` and eight small ones (F-299)". Source: F-299 no longer lists the bindings by family (C21); the families are F-303 (`Float`), F-306 (`ZZ64`, `ZZ`), F-305 (`CHOOSE`) and F-307 (the eight), the count F-32. Correction: "(F-32; F-303, F-305, F-306, F-307)". The counts hold: 97 of the 104, the 7 left (the review, section 6; `CLIMB-BATCH-24.md:421-422`).

### C43 (PLAN:51, the 109): 1 failure
- Fidelity passes: way 2b at the probe's default under his half-hour rule (`CLIMB-BATCH-24.md:92`), 76 moved (F-308), the 27 with items 331 and 332, no default on record.
- **form (a typo in the line).** Passage: "(`CLIMB-BATCH-23.md`, section 4); For the 82 over `Char`, `NN32` and `NN64`, climb batch 24 took way 2b". Correction: "(`CLIMB-BATCH-23.md`, section 4). For the 82 ...", with `IntLiteral`'s 4 kept with N5.

### C44 (PLAN:51's built parts moved): pass
The old line whole in PLAN-history; the built parts named there (rung K, rows 521 and 855; rung Z; row 848's `DIV` half, rung H; row 847, rung W).

### C45 (PLAN:52): pass
`NN32`'s `CHOOSE`; the four "whose helpers change a value under walk" (fork 18, `CLIMB-BATCH-24.md:123`, measured); `FlatString`'s five after item 63; rows 336's and 848's rest with their `XXX` reproducers.

### C46 (PLAN:53): pass
### C47 (PLAN:62): pass
The 52 in the past tense, four header `where` clauses made to compile, "the count since is unmeasured" (F-34); row 701's contract half and row 812 for these rungs (rows.md).

### C48 (row 701's line moved): pass
### C49 (row 862's line): pass
### C50 (row 864's line): pass
### C51 (PLAN:258, rows 868 to 870): pass
### C52 (row 872's line): pass
### C53 (PLAN:662, the rewrite's limits): pass
The review's finding 10; rung H's three are `rung-natives-hard/REPORT.md`, section 11a; "review-routed.1 below" is row 865's test (`PLAN.md:663`).

### C54 (PLAN:258, row 701's half): pass
### C55 (PLAN:83): pass

## PLAN: the lists for his review, and work that can start now

### C56 (climb batch 23's finding 7 moved): pass
### C57 (PLAN:635): pass
### C58 (PLAN:653): pass
### C59 (K.worker.1 moved): pass
Answered by his rule of 2026-10-31 (08:1x UTC), cited with its time in PLAN-history's heading paragraph.

### C60 (gather.1 moved): pass
Same citation.

### C61 (PLAN:183 moved): 1 failure
- **routing (a built move without its commit).** Passage: PLAN-history, "Climb batch 24's landing, 2026-10-31": "Built: ... and the commit stage's fold of F-240's figures, under "Work that can start now"." The move's reason names no commit; the other built moves name their rungs, which landed at `25238e60c`, but this one was built before the base. Source: the review, Part 2, "The commit stage's fold of FACTS": "Climb batch 22's finding 4, that the commit stage write F-240, is built (`40302280c`, 2026-10-30)"; the routing's rule: built, by a named commit. Correction: "and the commit stage's fold of F-240's figures (`40302280c`), under "Work that can start now"."

### C62 (X.worker.5 moved): pass
### C63 (PLAN:194, finding 3): pass
### C64 (PLAN:195, finding 4): pass
Its overlap with `:190` is named in `routing-report.md`.

### C65 (PLAN:196, finding 5): pass
### C66 (PLAN:180, finding 8 met again): pass
### C67 (PLAN:193, rule 4's case met again): pass
The review's split 5 and Part 4, "The manual".

### C68: pass, weight none, writer none

## The review queue

### C69 (the head): pass
302 open, 100 consequential, 202 routine (queue-check); the next batch climb batch 25 with 326; 182 and 327 to (a), each with its citation.

### C70 (item 182 to (a)): pass
"Rewritten by climb batch 24's rung G (`c324b841c`)"; its head line `:27` gone.

### C71 (item 309): 1 failure
- **fidelity (pointer).** Passage: "every other string, each of the 276 glue strings left since climb batch 24 among them (F-299, F-32)". Source as C34. Correction: "(F-32)". The figure 276 holds; "Its cost" also reads 276.

### C72 (item 310): pass
`StaticNativeApp.java:231` (row 846's notes); "Needed by" the string family's batch.

### C73 (item 321): pass
### C74 (item 264): pass
"about 150 s with the memo on (F-240)".

### C75 (item 326): pass
Question 2 with the cost of split 1, the other way (a transfer that is not an identity), default as landed, reversible; "Needed by" climb batch 25 if it moves a binding over `NN32`, `NN64` or `Char`, marked as the workflow's, its reading of the sort's "before the next batch that moves ..." named in `routing-report.md`.

### C76 (item 327, in (a)): pass
His scope of 08:2x and his "all defaults" of 08:21 UTC on item 310, the coordinator's 09:4x (`CLIMB-BATCH-24.md:78`); PLAN's "until item 62 is asked again" is the record's "until item 310 is asked again" (PLAN item 62 is item 310).

### C77 (item 328): pass
### C78 (item 329): pass
### C79 (item 330): pass

### C80 (item 331): 1 failure
- **fidelity (less than the ground).** Passage: "The 27 that no way of that batch reaches: the seven over `AnyIntegral` and `ZZ32`'s `big`, `Float`'s 5, `RR32`'s 2 and `Int`'s `asFloat`, `FlatString`'s `=` and `flatConcat(self, b:Char)`, `Object`'s 2, `SEQV` and `random`, and `IntLiteral`'s 4". These are 25. Source: `CLIMB-BATCH-24.md:425` gives the same list and then "`FlatString`'s `get` and `javaIndexOf` fit way 2b by the probe's reading and go with the string family"; `hard-set.md`, section 2's table (82 + 2 + 2 + 7 + 8 + 4 + 4 = 109) and section 8's Q2, which lists the 25. Correction: after the list, add "and `FlatString`'s `get` and `javaIndexOf`, which fit way 2b by the probe's reading and go with the string family (`CLIMB-BATCH-24.md:425`)"; the question, its "No default on record" and its "Needed by" stand.

### C81 (item 332): pass
### C82 (item 333): pass
No default on record; "Needed by: never", marked as the workflow's.

### C83 (item 334): pass
The audit's default (b), with the draft row filed.

### C84 (item 335): pass
"adopt it, a part of it, or neither" is the audit's question 2; no default on record.

### C85 (item 336, PLAN:657): pass
### C86 (item 337, PLAN:658): pass
"Default: none on record; today's values stand"; its other way follows row 856's "keep the low bits or raise" and item 20.

### C87 (item 338, PLAN:659): pass
### C88 (item 339, PLAN item 63): pass
### C89 (item 340, PLAN:660): pass
### C90 (item 341, PLAN:661): pass
### C91: pass, weight none, writer none

## INDEX and other notes

### C92 (seven INDEX lines): pass
Each line is its note's header comment, or its first sentence where it has none; `check-index.sh` passes.

### C93: pass, weight none, writer none
### C94 (`climb-batch-24/RECORD.md:173`): pass
"On four branches ... S (`3163eb21a`)", the review's finding 5.

### C95 (the map's B.12): pass
`NativeApp.java:164-229` and `:200-207` hold `checkAndLoadNative` and its helper branch at `43cd61b62`.

### C96: pass, weight none, writer none
### C97: pass, weight none, writer none

## For the coordinator (C98 to C117)

Each has writer none; nothing in this round is owed by the writers for them, so each passes here: C98, C99, C100, C101, C102, C103, C104, C105, C106, C107, C108, C109, C110, C111, C112, C113, C114, C115, C116, C117. `routing-report.md`, "For the coordinator", hands on BOOT.md's `PLAN.md:648`, now `:651`, and the new item numbers for "Waiting on him" (C113).

## The mechanical checks of `mech-1.md`

None failed: every check of round 1 passes. Reported, not failing: `record.py check`'s sizes (the changed entries past 600 are each named in `entries-report.md` with their questions; the rest predate the run), and `check-index.sh`'s one prose path that resolves nowhere, `library-scalar-extension-review-probes/run-all.sh`, an INDEX line at `43cd61b62`, not this run's.

## Counts

117 changes: 103 pass, 14 fail, 14 failures: coverage 0; fidelity 11 (C2, C6, C10, C13, C34, C35, C39, C41, C42, C71, C80); form 2 (C18, C43); routing 1 (C61). By writer: entries 5 (C2, C6, C10, C13, C18); routing 9 (C34, C35, C39, C41, C42, C43, C61, C71, C80).
