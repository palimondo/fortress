<!-- The record-landing workflow's check of climb batch 26's first round (worktree at 61f1c6a93, landing a12ab5c60): for each change of owed.md, pass, or each failure with its class, its passage, its source and its correction. -->

# The check of climb batch 26's first round

Read: `owed.md`, the two reports, `record.apply`, `rows.rewrite`, `rows.add`, `mech-1.md`, and `git diff 61f1c6a93 -- explorations/ ':!explorations/coordinator/PLAN-history.md'` in `/home/user/fortress-landing-26`. `mech-1.md` cut `plan-moves.py`'s output at 12000 characters, so I ran `plan-moves.py --root /home/user/fortress-landing-26 --base 61f1c6a93` again (no file written): its 187 LOOK lines each map, by their text at 61f1c6a93, to a PLAN line that an `owed.md` change names (C52, C80 to C83, C91 to C273). The gate's figures in F-53 and F-240 are unchanged.

## FACTS: the pass

### C1 (F-318): pass
The method names and the long path went to the report. The scratch measure is now bounded, "measured once at `2fd5d653e`" (`rung-walk-vector-scalar/REPORT.md:52`, `:69`, section 4). "It builds P-157, on reading `self` so, and P-152, on the exclusion of two generic declarations" matches both positions' titles. Rows 893 and 894 are kept.

### C2 (F-319): pass
The old "both paths answer so" said more than its ground. The new text, "Walk answers so, and the compiled path at a NaN: its own library has no rational type and no `CMP` on floats", is the rung's decision 5 (`rung-spec-nan-comparison/REPORT.md:114`). The 22 characters that the entry grew are that correction.

### C3 (F-320): fail
- **form.** Passage: "Under the switch-over's setting, measured once, all nine of the library's declarations that stopped at 'Can't compile LetFn' emit (F-34)." The new "measured once" names no commit or code state, and that bound is what the rule keeps in the entry. Source: F-34, "Measured once, on `dbf4825e0`'s code", is the same `codegen.sh` run (`rung-codegen-local-functions/REPORT.md`, section 5). Correction: "Under the switch-over's setting, measured once on `dbf4825e0`'s code, all nine ...".

### C4 (F-321): fail
- **fidelity.** Passage: "So a binding can name only a helper class all of whose methods map to the one library's types". The writer's report says the old "the one library binds only helper classes" was false because `System`'s two bindings name `systemOps`. The new sentence keeps that flaw: the next sentence says that `System`'s `getEnvironment` and `getProperty` name `systemOps`. Source: the entry's own `System` sentence; row 895; `rung-string-natives/REPORT.md`, "A site that came, and went". Correction: "So a binding passes the checker only where every method of its helper class maps to the one library's types;". This states the condition, not a limit that the library breaks.

### C5 (F-299, the pass): fail
- **form.** Passage: "`ZZ64` 26 and `ZZ` 22 (F-306, with F-305, F-312 and F-314)". Three pointers lost the words on what each holds. The old text had them: "the five types' `REM` and `MOD` (F-312) and their divisors (F-314) ..., `ZZ32`'s and `ZZ64`'s `CHOOSE` ... (F-305)". Correction: "(F-306; their `CHOOSE` F-305, `REM` and `MOD` F-312, divisors F-314)".
- The rest passes: the 306 sum, "all but `=` and `flatConcat` at a `Char`" (13 natives in `Library/FlatString.fss`, those two on `FlatString$Eq` and `FlatString$Concat`), and the cut tests (each named by F-312, F-303, F-310, F-311 or F-314).

### C6 (F-252): pass
The size unification's code name went to the report. The pointer "F-253 gives the case of a generic dotted method, where one of the two declared domains can lie inside the other" leads to F-253, which states the whole rule ("exactly one ... walk chooses the inner one").

### C7 (F-277): pass
Kept, and `entries-report.md` gives the reason.

### C8 (F-34): pass
The probe's output lines went to the report. The tree is bounded by its commit, `dbf4825e0`. The 47's bound became the code state "before local functions compiled", which the rule allows, and F-34 still says what it blocks ("the code generator still stands between the library and bytecode").

### C9 (F-181): pass
"the four forms that F-320 names": F-320 names three refused forms and the varargs one (row 624).

### C10 (F-307): pass
Kept, with its reason (`Library/System.fss:51-55`, `FortressLibrary.fss:4628-4644`).

### C11 (F-32), C12 (F-53): pass (weight none)

### C13 (F-240, the pass): pass
The commit stage's figures are unchanged: about 180 s; 246 s, `FortressLibrary` 182 s, load 0.34; against 271 s (205 s) at 0.59.

## FACTS: sentences made false or left short

### C14 (F-240): fail
- The entry passes. "From climb batch 22's gate to climb batch 26's it took between about 150 s and 180 s, one run at each gate, and no batch moved it by a measured difference" and "That fall has no measured cause: ... at both gates the stage started about 10 s before `testFast`" match the review's section 2 (178 s or 181 s against 158 s; 12 s and 9 s). The new Detail pointer is the clause the change owes.
- **fidelity (its history note).** Passage: FACTS-history, F-240's block of 23:54Z: "The count stage's band now runs to climb batch 25's gate (158 s, about 160 s), with 26's about 180 s beside it". The entry instead runs the band to climb batch 26's gate, 150 s to 180 s, so the note does not describe the change it records. Correction: "The count stage's band now runs from climb batch 22's gate to 26's, about 150 s to 180 s (26's 178 s by the log's file times, 181 s by the gate's call times)". The writer gives this text in `record.apply`'s note for F-240.

### C15 (F-299, the `self` half): pass
"and so would a helper bound in a method of the trait `String`, as `self`; the library binds no helper there" is finding C (`batch-26-review.md:327`; `StaticNativeApp.java:103-112`, `:282`).

### C16 (F-257): pass
The reading's reach now includes a functional method of a generic trait that declares none of its own (F-318). The example of a pair that is not read changed to "two functional methods of generic traits", which the writer read in `validOnDeclaredDomains`. The messages, cut to their opening words, stand whole in the report that the entry names, `rung-walk-trait-method-bounds/REPORT.md` section 1. The entry shrank.

### C17 (F-34's history): pass
F-34's block of 23:54Z holds the review's correction: measured on rung L's tree, `dbf4825e0`; rung T's three overloads over `String` not measured.

### C18 (F-322, new): pass
The text matches its ground: the review's note (i) and rung T's decision 2, "so the stages accept a parameter that walk refuses" (`rung-string-natives/REPORT.md:208`). Its pointers carry words, and it holds no history.
- `record.py` put it at the end of "The checker and the one library" (`FACTS.md:148`), not beside F-298 and F-299 (`:133-134`). The writer named this as the tool's placement and left the move to the coordinator. This is not a writer's failure. For the coordinator: move it to follow F-299, or leave it.

## FACTS: entries past 600 characters

### C19 (F-299), C20 (F-252), C21 (F-318), C22 (F-320), C23 (F-321), C24 (F-319), C25 (F-34): pass
- Each entry shrank, apart from F-319's 22 characters, the correction that C2 owes.
- Each report section names the question that keeps the entry's length.
- One sentence is past 600 characters: F-299's "The 306 by type" (733). Its count, which F-299 owns, keeps it, and the report says so (C5's form correction makes it a few characters longer).

### C26: pass (writer none)

## POSITIONS

### C27 (P-159): pass
- Before: "Both sentences are to be revised, in the form of Appendix I, ... and the infinities are ordered. Row 672: that edit, which closes the row."
- After: "Both sentences are revised, ... and the infinities are ordered (F-319). Row 672 closed with that edit."
- This is the sort's text, the fewest words, under his rule of 2026-10-31. What he decided (`false` and `Unordered` on both paths, with no raise), where it applies (`RR64` and `RR32`, both paths), and what it requires (the overview's two sentences in Appendix I's form) are unchanged. That requirement is now met.
- For the coordinator: P-159's earlier sentence, "The specification's overview of operators says that this comparison throws that error, and the sentence before it that a rational comparison at 1/0 or 0/0 throws `RationalComparisonError`", is false too since `3eabf8435`. No change of `owed.md` names it. The writer names it, with its fewest words ("said", "threw" twice). His rule of 2026-10-31 already covers such a fix, so it needs no question to him.

### C28 (P-160): pass
- Before: "The clause stays until the first step lands: without it, walk refuses the library's array operators at load, and with them most programs."
- After: "The clause stayed until the first step landed (F-318): without it, walk refused ...".
- This is the sort's text, less its commit. The decision (`Number`'s clause goes, in two steps), its reach and the second step's requirements are unchanged.

### C29, C30: pass (writer none)

## The gap ledger

### C31 (row 846): pass
The `self` half is added to the notes cell (`StaticNativeApp.java:282`). The claim, the status and the other cells are unchanged. The cut test path of the refusal is named by F-299.

### C32 (new row): pass
`rows.add` holds the row, but no step applied it. The writer's report names the change as left, with its reason: `rows.rewrite` refuses a new number, and the brief gives no file for a new row. The report gives the command, `ledger.py add --section '10. Strings, maps and printing'`. The row's text matches split 7 and rung T's "Values that move": `""` on the base and on the tree, `EmptyString` since rung T. The ledger is still at 894 rows (`mech-1.md`, `ledger.py check`). For the coordinator: the row is owed before the landing, and C49's PLAN line takes its number after it.

### C33, C34: pass (writer none)

## PLAN: "Where we stand" and phase 4

### C35 to C42: pass
- C35: through climb batch 26, section 5.
- C36: `a12ab5c60`; 306 and 143; 304 of 306 read (F-321, review section 1); the 38 in 10 on rung L's tree, the merged tree not measured; P-160's first step (F-318).
- C37: 23 to 26.
- C38: the review's step 5, item by item.
- C39: one line, in the form of lines 41-43.
- C40: the text on items 310 and 340 left; the rest kept.
- C41: four batches.
- C42: the new P-160 line, with item 357 beside it. P-160 states the step.

### C43: pass (writer none)

### C44, C48 (the N5 line): pass

### C45 (the names line): fail
- **coverage.** Passage: the names line ends "(fork 21; review-queue item 360; `reviews/batch-26-review.md`, Part 4, "Two notes owed", (i))". It does not cite the new FACTS entry, which C45's ground asks for ("with its new FACTS entry"). The routing report left it because the entry had no number. Since `record.py apply` it is F-322 (`mech-1.md`, "F-322: added"), so that reason no longer holds. Correction: add "F-322" to the names line, and to item 360's "Home".

### C46: pass

### C47 (row 440's line): fail
- **fidelity.** Passage: "where the specification, revised by P-159, gives `false` and `Unordered` (F-319)". The revision of P-159 gives `false` for the four ordering operators at the rational 0/0. It names `CMP` for floats only (`rung-spec-nan-comparison/REPORT.md:111`, decision 2). The `Unordered`, and `false` for `=`, at 0/0 against itself come from the rationals chapter (`:92`: "Row 440's 0/0 against itself is settled by the chapter (`false`, `Unordered`)"). Correction: "where the rationals chapter gives `false` and `Unordered` (F-319; row 440)".

### C49 (`getProperty`'s line): fail
- **fidelity.** Passage: "raises Java's `IllegalArgumentException`, which no `catch` sees, under walk since climb batch 26's rung T". A flat `""` name raised so on the base too. Only the `EmptyString` name is new with rung T. Source: `batch-26-review.md:202` and `:327` ("on the base for `""` and now for `EmptyString`"); `rung-string-natives/REPORT.md:135`. Correction: "under walk: at `""` on climb batch 26's base already, and at an `EmptyString` since its rung T". Add the row's number once C32's row is filed.

### C50 to C52: pass (writer none)

## PLAN and the queue: items for the curator

### C53, C54 (items 62 and 63): pass
Both moved as made stale by a landed change (`93884be8d`). Their queue items 310 and 340 stay open in (b), and both are on the batch's list "default as landed". The Fable judge's default is not shown as his word, and "within his 30 minutes" is `CLIMB-BATCH-26.md:119`.

### C55 (item 64, queue item 355): pass
"No default on record", and the review's proposal named as the review's. Consequential. "Needed by" is the batch record's group heading.

### C56 (item 356): fail
- **fidelity.** Passage: item 356, "Its cost: Either way, one path and its tests change; not measured." The routing report says that its "The other way" and "Its cost" are "my reading of the question as the skeptic put it; no source states them". The item itself does not say so, so an unsourced cost reads as the record's. Correction: "Its cost: not sized by any source." For "The other way": cite `rung-walk-vector-scalar/SKEPTIC.md:74` for the yes and no that the skeptic puts, or mark it as the routing's reading. The rest passes: "No default on record", the "Needed by" set by the workflow, and the head under "Parked rungs".

### C57 (item 357): pass
Default (a), P-146's "walk is unchanged", is the record's and the review's. Way (b) is finding A's. "Needed by: before P-160's second step" is set by the workflow. Consequential.

### C58 (item 358): pass (its head line fails under C75)

### C59 (item 359): fail
- **fidelity.** Passage: item 359, "where the revised overview gives `false` and `Unordered` (F-319)". This is the same error as C47: the revised overview does not give `Unordered` for `QQ`'s 0/0. Correction: "where the rationals chapter gives `false` and `Unordered` (F-319)".

### C60, C61 (items 360, 361): pass
Defaults "as landed, the step taken" and "as landed, each native public and bare". The head's "not covered, as landed" for 361 is the record's reading, that item 332 is not needed. "Needed by" is set by the workflow, as `owed.md` gives it.

### C62, C63, C64: pass
- C62: kept word for word.
- C63: moved, each of its fixes made at this landing.
- C64: rewritten in climb batch 25's form. It says which lines hold no default.

### C65 to C70 (items 362 to 367): pass
Each default is the one `owed.md` gives, and each "Needed by" is marked as set by the workflow. 365 names fork 9's sibling fields (split 8), and 366 names finding B's correction and split 7.

### C71, C72 (items 310, 340): pass
"Landed" is rewritten to rung T at the Fable judge's default. Both stay open in (b), 310's "His word" is untouched, and no move to (a) is made.

### C73 (item 331), C74 (item 284): pass

### C75 (the queue's head): fail
- **routing.** Passage: the head's new group, "**Climb batch 26's defaults, for his review; ...** Each landed at its default, ..." and "- **358.** ... Default: left, as landed." Item 358 holds "Default: no default on record; as landed, it stays", as does C58's ground. The head shows as a default what the record does not hold. Correction: "- **358.** ... No default on record; as landed, it stays." Also make the group's opening "Each landed as it stands, at its default where it has one". The counts and the other groups pass (`queue-check.py`: 78 open, 49 consequential, 29 routine).

### C76 (row 672's line, climb batch 13): fail
- **routing.** A move as answered needs the curator's word on that same item, cited with its time. PLAN-history's opening and the routing report cite "by P-159 (row 672 closed by `3eabf8435`)", with no time. Correction: "Answered: ... by his P-159 of 2026-11-05 (row 672 closed by `3eabf8435`)". The date is `owed.md`'s ground ("his decision of 2026-11-05") and P-159's in Appendix I (`rung-spec-nan-comparison/REPORT.md:17`).

### C77, C78, C79: pass
- C77 and C78: built by `c41c3d2b0` and `93884be8d`.
- C79: the 14 of the queue's group, plus 355 and 360, and item 20 placed.

### C80 to C83: pass (writer none)

## Other notes and INDEX

### C84: pass

### C85 (`compile-path-walkthrough.md:475-476`): fail
- **fidelity.** Passage: "Since climb batch 26's rung L a local function compiles as a closure, but for three forms, each refused with its own message (F-320; ledger 304)." F-320 names a fourth form that does not compile: a varargs local function stops at 'Can't compile VarArgs yet' (row 624). F-181 was corrected to "four forms" for the same reason (C9). Correction: "... but for three forms, each refused with its own message (ledger 304), and a varargs one, which stops at 'Can't compile VarArgs yet' (ledger 624) (F-320)".

### C86 (`spec-to-implementation.md:201`): fail
- **fidelity.** Passage: "`CodeGen.forLetFn` compiles a local function as a closure, but for three forms (F-320)" and the status "works (both), but for three compiled forms of local function". The varargs form is left out, as in C85. The status cell also leaves the map's status words, "**interp** and **comp** each read `works` / `partial` / `absent`". Correction: "`CodeGen.forLetFn` compiles a local function as a closure, but for four forms (F-320)", with the status "interp works / comp partial", and rows "304, 624".

### C87 (INDEX.md:569): pass

### C88 to C273: pass (weight none, writer none)

## The failures of mech-1.md

- None fails. Every check passes.
- `words-subset.py` on POSITIONS, exit 1, is information: P-159 adds "with, f-319, closed", and P-160 adds "stayed, landed, f-318, refused". Neither change is cut only (C27, C28), and the words are the sort's.
- `lengths.py`: F-240 (+20), F-319 (+22) and P-160 (+10) grew past 600. Each grew by the clause its change owes (C14, C2, C28).
- `check-index.sh`: two paths named in prose resolve nowhere, `library-scalar-extension-review-probes/run-all.sh` and `tests/ComprisesOwnTypeParameter.fss`. Neither is in a line this run changed, so no change owns them.
- `mech-1.md` has no check of `rows.add`, so C32's row reached no check and is not in the ledger (C32).
