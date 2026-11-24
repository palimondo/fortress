# Assessment, chunk pilot-1 (FACTS)

Rubric: `explorations/reviews/revival-record-synthesis.md`, "For Claude: assess all FACTS, rewrite only failing entries"; `.claude/skills/coordinator/references/record.md`, "What an entry is". Sources: `scout.md` in this folder, the entries by `facts-extract.sh`, and bounded spot checks of the tree (named per row). No experiment rerun, no transcript searched.

Marks: P pass, F fail, U unresolved.

## Summary table

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-374 | P | P | P | F | F | P | reorganize |
| F-351 | P | P | F | F | F | P | reorganize |
| F-279 | F | P | P | P | P | P | reword |
| F-157 | P | P | P | P | F | P | reorganize |
| F-63 | P | F | U | F | F | U | investigate |
| F-286 | P | P | F | P | P | F | reword |
| F-297 | P | P | P | P | F | P | reorganize |
| F-64 | P | P | P | P | P | P | keep |
| F-240 | P | F | P | F | F | P | reorganize |
| F-111 | P | P | F | P | F | P | reorganize |
| F-43 | P | P | P | P | P | U | investigate |
| F-179 | P | P | P | P | P | P | keep |
| F-102 | P | P | F | P | P | P | reword |
| F-103 | P | P | P | P | P | P | keep |
| F-104 | P | P | P | P | P | P | keep |
| F-383 | P | P | P | P | F | P | reorganize |
| F-108 | P | P | P | P | P | P | keep |

Counts: keep 5 (F-64, F-179, F-103, F-104, F-108); reword 3 (F-279, F-286, F-102); reorganize 7 (F-374, F-351, F-157, F-297, F-240, F-111, F-383); investigate 2 (F-63, F-43).

## Per entry

### F-374 — reorganize
- Scope: pass. Title's two clauses each match the body; rows 319, 875 FIXED, 112, 322, 1043 NEGATIVE-VERIFIED, 641 NEGATIVE-BOUNDED agree (scout).
- Present meaning: pass. States the current code shape; the planner's choice is marked as not the curator's.
- Evidence: pass. Report sections "What changed and why" and "The bytecode" found; `Lazy.fss` found; three tests named.
- Comprehension: fail. Two subjects joined in one paragraph, and the second "So" sentence has an unclear referent: "So a change of the transaction's variable code reaches fields with no second edit, and a new kind of nested context must capture a var field's cell as it does a top-level `var`'s." It follows the `atomic e` sentence, though it concludes from the cell design two sentences earlier.
- Ownership: fail. The atomic-expression claims belong to F-351's subject (compiled transactions and atomic expressions): "`atomic e` is compiled by `CodeGen.forAtomicBlock` on the block that holds `e` (row 875, fixed), with the block's limits (row 322); a numeral as its value at a place of declared type is refused or fails verification, since the checker carries no declared type into it (row 1043)." "(row 319, fixed)" is history.
- Consistency: pass. F-12 and F-358 on row 641 agree (scout).
- Action: move the `atomic e` sentence and row 1043 to F-351; keep the var-field cell, its check cost (row 641) and the `value`-object equivalence gap (row 112); move "row 319, fixed" to the history.

### F-351 — reorganize
- Scope: pass. Title and body agree on the compiled path.
- Present meaning: pass. Current behaviour; row 984 open.
- Evidence: fail (cites moved). "`compiler/codegen/CodeGen.java:2148-2180` (`forAtomicBlock`), `:2490-2494` (`forTry`)": `forAtomicBlock` is now at `:2155` (helper `:2142`), `forTry` at `:2485` (checked). `ArrayStoreJUTest` is at `compiler/runtimeValues/ArrayStoreJUTest.java`, not among `compiler_tests/`, which the list reads as. The claims are supported by the report (scout).
- Comprehension: fail. One sentence carries five branches: "it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), commits the transaction on an exit, a `LabelExit`, and throws the exit on, or takes the abort path where that commit fails (F-401), and throws everything else on, after a nested transaction has handed its reads to its parent."
- Ownership: fail. The exception-table ordering is a code-generator fact for F-373's subject: "The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first." Line-numbered sources are detail for the report.
- Consistency: pass. F-401 on the exit commit agrees.
- Action: receive F-374's atomic-expression claims; move the exception-table sentence to F-373; move line numbers to the report; split the handler sentence; locate `ArrayStoreJUTest` correctly.

### F-279 — reword
- Scope: fail. The title names one exception, but the body names more failures: title "except a shifted `Array2`"; body "a shift of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`".
- Present meaning: pass. Current walk behaviour, row 808 open.
- Evidence: pass. Line cites hold; three tests found; row 808 NEGATIVE-VERIFIED (scout).
- Comprehension: pass, narrowly ("hand their 0-based views the offset less the base" is technical but restatable).
- Ownership: pass. One subject (walk: array slices at a nonzero base). The line numbers are detail and may go to the report.
- Consistency: pass.
- Action: title states both limits (a slice of a shifted `Array2` reads wrong elements; shifts of slices, columns and rows throw); line numbers to the report.

### F-157 — reorganize
- Scope: pass. Override scoped "under walk only"; timings scoped to `b176a4b79`.
- Present meaning: pass. Timings are explicitly bounded measurements.
- Evidence: pass. Rows 298, 299 POSITIVE-VERIFIED; report sections found; the 54 vs 58-63 discrepancy is stated.
- Comprehension: pass.
- Ownership: fail. Three questions that change apart: the view idiom (title), the walk `mul` override, and the cost of library views: "In two measurements under walk at `b176a4b79`, views through the library cost more. On lifting a function over the rows ... (row 298). The library's product with a diagonal ... (row 299, which says 54)." The timings answer what views cost, not what a view is.
- Consistency: pass. F-90 names `TransposedMatrix` alike.
- Action: keep the idiom and the walk override; let rows 298 and 299 carry the timings, with a pointer, or split the cost into its own entry.

### F-63 — investigate
- Scope: pass. "The one library's api" names its scope.
- Present meaning: fail. Mostly how the four forms came about: "In their earlier forms, the pair declared twice and `List`'s `zip[\F\](other: List[\F\])`, the checker refused the api (measured). The other repairs tried ... read the same count".
- Evidence: unresolved. The `QQ` form holds in the tree (`FortressLibrary.fsi:397` `comprises { ... }`; `.fss:628` `comprises { Ratio }`, checked). But the scout's check marks "no test gates that edit" false in part today, and the ground of the `Condition.map` error (override rule or export check) unsettled: "The `Condition.map` error was seen only under a checker change that did not land; otherwise it is read from the export check's comparison of return types, and no test gates that edit."
- Comprehension: fail. "read the same count" has no named count; "that edit" has a far referent.
- Ownership: fail. Four separate api repairs (`split` pair, `zip`, `Condition.map`, `QQ`); the `split` pair is F-286's subject, the `QQ`/F-64 sentence F-72's.
- Consistency: unresolved. Same claim as F-286 and F-297 for the `split` pair; rows 355 and 357, open per scout, are not named.
- Question: Does any test or the distance stage's per-site list now gate `Condition.map`'s return type `Condition[\G\]`, and does the api's earlier form fail by the export check's return-type comparison or by the override rule? Answer it, then split by subject.

### F-286 — reword
- Scope: pass. 14 `abstract` members counted in `FortressLibrary.fsi:2583-2658` (checked: 14).
- Present meaning: pass.
- Evidence: fail (one cite moved). "`AnyList` states its exclusion of `String` itself (`Library/List.fsi:55`)": line 55 is in a comment; the declaration is `:57` (checked).
- Comprehension: pass.
- Ownership: pass. One subject (`String` api against its component), with the string objects as the witness; "So `String` has no entry in the ... export error (F-282)" is a pointer, not a copied count.
- Consistency: fail. F-282 says "the 66 members written `abstract`, `String`'s nine among them", against this entry's 14; F-297's seven are a different scope (members the component lacked) and say so. The conflict is in F-282, but neither entry states it.
- Action: fix the `List.fsi` cite; repair F-282's "nine" (outside this chunk) or state the scope difference.

### F-297 — reorganize
- Scope: pass.
- Present meaning: pass.
- Evidence: pass. `ExportChecker.scala:831`, `:863-875`, `traits.tex:722-723` agree; rows 841, 842 NEGATIVE-VERIFIED; five tests found (scout).
- Comprehension: pass.
- Ownership: fail. F-282 states the rule nearly whole ("It asks the component to declare each api member written `abstract`, at its header, with a body or without one, and an abstract getter also by a field ..."); this entry adds the code tour and the library list: "The 12 members the component's traits lacked (`String`'s `depth`, ... `AnyMaybe`'s `holds`) are declared bodyless; the compiler's prelude declares its 85." Line numbers and the member list are report detail; the library's match is F-286's subject.
- Consistency: pass. Counts differ from F-286 but by stated scope (the members lacked).
- Action: keep the rule, the getter-by-field case, rows 842 and 841 and the tests; move line numbers and the 12-member list to the report; point to F-282 and F-286.

### F-64 — keep
- Scope: pass. "every type that an api declares ... whether the clause lists it or not", limited to the api check.
- Present meaning: pass. Row 354 open.
- Evidence: pass. Row 354 NEGATIVE-VERIFIED; `XXX3q`, `XXX10p` found; `traits.tex` heading found (scout).
- Comprehension: pass.
- Ownership: pass. The specification sentence is the ground that makes the refusal a defect, kept beside the claim; it is not a separate subject here.
- Consistency: pass. F-63's "No api-declared type extends `QQ`" and F-72 agree.

### F-240 — reorganize
- Scope: pass. Each time is bound to its gate.
- Present meaning: fail. The entry is a log of batches: "At climb batch 15b's gate they took 325 s and 1,075 s ... From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s ... Both stages about halved at climb batch 27's gate". The lasting content is how to read a stage time.
- Evidence: pass. `climb-batch-36/gate/distance.txt` and the twelve reviews found (scout).
- Comprehension: fail. "Its rise from about 90 s" — "Its" has no clear antecedent (count stage or distance stage); "the distance stage (`FortressLibrary` 75 s), over fourteen components, ran at a start load of 0.29, then beside the first minutes of `testFast` ... against 130 s (85 s) at 0.55" packs unexplained parentheticals.
- Ownership: fail. Repair chronology and per-batch times hide the subject; the title is a copied value that changes at each gate.
- Consistency: pass.
- Action: keep the reading rule (times from the gate log's file times; load can more than double a stage; compare only under like load) and, if wanted, the latest times as one bounded measurement; move the batch log to the history and the reviews.

### F-111 — reorganize
- Scope: pass. The "cannot move" conclusion is stated as read in the code, not measured.
- Present meaning: pass.
- Evidence: fail (false today). "The count stage calls `Shell.compilerPhases` with `PhaseOrder.compilerPhaseOrder`": since 2026-10-24 the count stage runs `WorldFlip -stop check`, `compilerPhaseOrder` up to and including the type check (`checker-count/run.sh:97`, `WorldFlip.java` header and `throughChecker`, checked). The cited `WorldFlip.java:25`, `:42` moved.
- Comprehension: pass.
- Ownership: fail. A code tour with line numbers: "`checker-count/WorldFlip.java:25` and `:42`; `distance/DistanceMulti.java:40-43` and `distance/run.sh:127`; `compiler/phases/PhaseOrder.java:125-147`". Map also merges F-289 into it.
- Consistency: pass.
- Action: correct the count stage's phases (both stages stop after the type check); move the line numbers to a named source; take in F-289 as the map says.

### F-43 — investigate
- Scope: pass.
- Present meaning: pass.
- Evidence: pass. `OverloadingChecker.scala:79` (property, default true) and the memo at `:580-600` found; `triage.md` section 1 cited; the gate's use of the flag found in `distance.txt` (scout).
- Comprehension: pass.
- Ownership: pass. One subject; the gate's flag is the consequence, not a copied count.
- Consistency: unresolved. F-80 says "The checker's overloading memo is keyed on all the inputs of the check, so a pair accepted at the top level is not reused unchecked in a trait that provides it", while F-43 says "a pair valid for one trait is taken as valid for the next". The key at `:592-593` holds both arrows, their indices, the signature set, `isMethod` and the static parameters in scope, but not the `OverloadingOracle` `oa`, the trait-dependent input.
- Question: With the memo on, can a pair with the same signature set and static parameters be reused across two traits whose oracles differ, so that F-43 still holds and F-80's "all the inputs" overstates; or did a change to the key make F-43 stale?

### F-179 — keep
- Scope: pass. Two directories named.
- Present meaning: pass.
- Evidence: pass. Map section "B.11 The runtime" found; row 302 FIXED (scout). Evidence kind (the territory map's reading) is implied by the pointer.
- Comprehension: pass.
- Ownership: pass.
- Consistency: pass. The skill's `SKILL.md:111` says it alike (scout).

### F-102 — reword
- Scope: pass.
- Present meaning: pass.
- Evidence: fail. The pointer does not hold its claim: "(F-29: walk's load check and its `load_exception_contains` key)". F-29 is the walk comprises load check and names no `load_exception_contains` key; F-383 holds the `load_` key rule.
- Comprehension: pass.
- Ownership: pass. One subject (`XXX` tests in the interpreter corpus).
- Consistency: pass. F-103 and F-383 agree.
- Action: repoint the refusal-at-load pointer to F-383 (or the skill's `tests-writing.md`); the `FileTests.java` line numbers may go to the source pointer.

### F-103 — keep
- Scope: pass. Bound to `compiler_tests/` and `library_tests/`.
- Present meaning: pass.
- Evidence: pass. Report section "The measured defect, and its home" found; skill `tests-writing.md` agrees (scout). Kind: the report's measured defect.
- Comprehension: pass.
- Ownership: pass.
- Consistency: pass.

### F-104 — keep
- Scope: pass.
- Present meaning: pass.
- Evidence: pass. `REPAIR-review.md` section 2 found; `Shell.java` names no `CompilerError`; 36 tests use the key (scout).
- Comprehension: pass.
- Ownership: pass. The three-stream and uncaught-`CompilerError` sentences are the mechanism of the title's claim, not separate subjects.
- Consistency: pass.

### F-383 — reorganize
- Scope: pass.
- Present meaning: pass.
- Evidence: pass. `FileTests.java` `thrownAtLoad`, the test and report section "10. Decisions" found (scout).
- Comprehension: pass.
- Ownership: fail. The last claim is F-103's subject and repeats it: "A compiled refusal test is still `XXX`-named: a plain-named compile test is red whenever the compile reports errors." (F-103: "A compile-stage failure needs one `XXX` compile test.")
- Consistency: pass.
- Action: move that sentence to F-103 (or replace it by a pointer to F-103); state the evidence kind with the source.

### F-108 — keep
- Scope: pass. Bound to walk and to the three flags; what is not known is stated.
- Present meaning: pass.
- Evidence: pass. Observed, `JUDGE.md` sections 3 to 5.
- Comprehension: pass.
- Ownership: pass. The harness sentence is the consequence for the work.
- Consistency: pass among entries (F-232 on row 430). Outside FACTS: the skill's `fortress-repo/references/interpreter.md` says "On one core, the order is fixed", which claims more than this entry's evidence (which of three flags fixes it is not known). The skill needs the correction, not the entry.
