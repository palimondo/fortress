# c30 assessment (base c124c6b65)

Marks: scope / present meaning / evidence / comprehension / ownership / consistency.

## Row 23: measure
- Scope pass. Present meaning unresolved: the only run predates the walk unification changes (`FType.java`, touched by 153887360, 369982d85). Evidence fail: "Probe `explorations/fable-review-probes/RvwNatArray.fss`, in the parent of `e879b6a44`" is the only support, no run since; notes carry no mechanism line. Comprehension pass. Ownership pass. Consistency pass (F-20 agrees).
- Disposition: measure (questions.md). Read beyond evidence: the probe from history; `FType.java:576` (the "Cannot unify" site) at the base.

## Row 27: rewrite
- Scope pass. Present meaning pass. Evidence fail: "One line in `OtherDecl.rats:73-78`" resolves to no file (the Specification copy has 54 lines); the parser's rule is at `ProjectFortress/src/com/sun/fortress/parser/OtherDecl.rats:75-83`. Comprehension fail: "a null dereference in the error path" is not the mechanism; the absent clause's `null` fails `instanceof Id` and is logged as a unit name. Ownership pass. Consistency pass.
- Rewrite: claim restated from the rule's code (the message is the one the row quotes); mechanism pinned; probe path kept. Dropped: nothing.
- Read beyond evidence: `OtherDecl.rats` at the base; the probe from history.

## Row 153: duplicate of 387
- Scope pass. Present meaning fail: "siblings: 22. Walk does not check the declared return type (row 22's mechanism)": row 22 is now a duplicate of 551 (closed `Number` extension), unrelated. Evidence: the probe is gone. Comprehension fail: "row 51's trap" (51 is a duplicate). Ownership fail: the defect is row 387's: a function expression is a `FunctionClosure` < `NonPrimitive` < `Simple_fcn`, whose `check` at `Simple_fcn.java:45` is jammed on; `Fcn.java:101,106,124` call it for every apply. One site, one path (walk), both rows in this chunk. Consistency: see ownership.
- Duplicate of 387, no TEXT: 387's new line carries the `fill` case "(row 153)" and the workaround (`1.0 headDim`, `1.0`/`0.0`). The probe's printed rows `0 1 10 11` / ... stay in the history, row 153.
- Read beyond evidence: `Evaluator.java:566` (`forFnExpr` makes a `FunctionClosure`), the class chain, `Fcn.java` callers of `check`.

## Row 387: rewrite
- Scope pass. Present meaning fail: "`Library/String.fss:529`'s `avFlat(): RR32` over an `RR64` body is a declaration the specification refuses, row 531, not this": row 531 is FIXED and the line now narrows (`narrow(asFloat(...))`). Evidence pass (gated XXX test; the gate a12ab5c60 holds). Comprehension pass. Ownership pass. Consistency pass (F-? at FACTS.md:184, :195 agree).
- Rewrite: the avFlat sentence dropped (home: history, row 387, and row 531); the pin moved to `:45` at c124c6b65; row 153's function-expression case and workaround folded in. "assignment" in the list of places walk converts was cut for length (home: FACTS.md:184, which lists them, and history, row 387).

## Row 393: measure
- Scope pass. Present meaning fail: "Walk refused the program before rung C only because it had no coercion" is a batch story. Evidence unresolved: the run is from climb batch 4; the probe is gone. Comprehension pass. Ownership pass. Consistency pass. Also wrong: "The answer is a static error, so no test can gate it": an `XXX` compile test with `compile_err_contains` gates a missing refusal (`tests-writing.md`, "Writing an `XXX` test").
- Disposition: measure, since the checker's coercion code changed a great deal since; a grep of `scala_src/typechecker/` finds no cycle check. questions.md gives the line each outcome gives.

## Row 408: keep
- All pass. `FZZ32Vector.java:79` still declares `RTTIv`; `MethodInstantiater.java:137` still asks `Naming.stemClassToRTTIclass(owner)`. The XXX compiled test pair exists (`XXXVecCtorLoad.test`, `VecCtorLoadLink.test`). FACTS.md:185, :270 agree. Its bold claim and the missing "at HASH" are presentation only; lines hold at the base.

## Row 486: rewrite
- Scope pass. Present meaning fail: "Rung K's inference does not reach it: the refusal is the binding's, not a call's" (a batch's scope) and "Related: row 485" (485 is FIXED). Evidence fail: "Probe: `explorations/compile-ladder/rung-spec-ranges/probes/skeptic/SkNatType.fss` (`differential2.txt:58-97` ...)" names gone files without saying so; the XXX test is the reproducer. Comprehension pass. Ownership pass. Consistency pass (F-74: `Int` is `ZZ32`'s value object; FACTS.md:71, :193, POSITIONS.md:84 agree).
- Rewrite: mechanism pinned at `LHSEvaluator.java:218-226` (the typed binding's `Coercions.coerce`, then the quoted error); workaround is the test's own control (`z: ZZ32 = n`). Dropped: the probe paths and differential line numbers (history, row 486); the rung K sentence (history); the 485 relation (row 485 and history).

## Row 509: rewrite
- Scope pass. Present meaning pass. Evidence fail: "`compiler/OverloadSet.java:1609`" is an `ALOAD` of a lower-bound check, not the join; the join of two run-time types without a union is `joinStackNoUnion` at `OverloadSet.java:1887-1906`. Programs gone, with no parent commit named. Comprehension fail: "The value stays inside the declared type in the number tower" (unclear, and Fortress's numbers are siblings, not a tower). Ownership pass. Consistency pass (FACTS.md:193; P-59).
- Rewrite: pin corrected; P-59 cited; programs' parent commit `84aef6a4f` named. Dropped: the "number tower" sentence (history, row 509). Status kept beside `silent` (silent.txt: choice).
- Read beyond evidence: `OverloadSet.java` at the base; O2Wide from history (`op[\T extends Number\]`, so 1bc0a9083's bound change does not reach it).

## Row 527: rewrite
- Scope pass. Present meaning fail: "Since row 418's fix such a size is a `ZZ64` value" is told as a repair; "siblings: 418" names a FIXED row. Evidence fail: reproducer `none` but the notes say only "probe and full text: history", not the probe's old path. Comprehension: "POSITIONS, 'a size's range'" now P-40. Ownership pass. Consistency pass (FACTS.md:196, POSITIONS.md:37).
- Rewrite: row 418 cited as the reason, not as a sibling; P-40 by number; the probe path `.../rung-size-range/probes/skeptic/SkArraySize.fss` and its parent `ab067d9b6`; lines pinned at c124c6b65 (all hold). Status kept beside `silent` (silent.txt: defect).

## Row 575: rewrite (status stays CONTESTED)
- Scope pass. Present meaning pass. Evidence fail: reproducer `explorations/compile-ladder/rung-numeral-library/REPORT.md` is a report, not a test or probe; the measurement is of a copy of the library, so the reproducer is `none` with the report section in the notes. Comprehension fail: "(R9)", "answer 8" are batch names; they are P-75 (the coercion, decided) and P-74 (the narrowest common type). Ownership pass. Consistency pass with P-75 (POSITIONS.md:83), which leaves the way to build it to the curator: not settled, so the status stays.
- Rewrite: claim in P-75/P-74 terms. Dropped: "(the team's)" for two tests and `pick(z, u)` at `ZZ32` detail (history, row 575; REPORT.md section 8).

## Row 683: rewrite (status stays CONTESTED)
- Scope pass. Present meaning fail: "Rung N lists it for the curator. Unchanged by row 681's repair (climb batch 17 rung C)" and "the revision of 9 October" (a date; the text is `types-vals-vars.tex:59-62` and its `revival-sizes` revision). Evidence fail: pin `7dd0adf0c` is not in the base's history, and "the base a1a75716a refuses it alike" names a batch manifest commit. Comprehension pass. Ownership pass. Consistency pass (FACTS.md:202).
- Rewrite: pinned at `Formula.scala:137` at c124c6b65 (the `IntRef`/`IntRef` case); siblings 767 named. Dropped: the batch story and the a1a75716a sentence (history, row 683). No POSITIONS entry settles it; status stays.

## Row 767: rewrite
- Scope pass. Present meaning pass. Evidence fail: pin `TypeAnalyzer.scala:390-397 at 9697e3838`, a commit not in the base's history; at the base those lines are the `Op` case; the `IntExpr` `pEqv` is at `:402-409`. Comprehension pass. Ownership: "siblings: 681" names a FIXED row. Consistency pass (FACTS.md:202, :257).
- Rewrite: pin moved; walk's mechanism pinned at `IntNat.java:133-146` (from F-? at FACTS.md:257); siblings 683 only. Dropped: 681 as a sibling (row 681 and history).

## mech.py
`python3 explorations/coordinator/tools/ledger-pass/mech.py tmp/ledger-pass/c-run2/c30/`, last line: `MECH: 9 lines, 0 failing, every check passes.` (first run failed 509 on a bare `O2Lone.fss`; corrected). Tokens it lists as dropped are each accounted for above.
