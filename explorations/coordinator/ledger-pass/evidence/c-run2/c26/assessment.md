# Chunk c26 assessment (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency.

## Row 17: close
- scope pass; present meaning FAIL: "the spec's declaration-site covariance idiom ... is rejected" cites `Specification-1.0-frozen/`; today's `Specification/basic/trait-parameters.tex`, "Where Clauses" (commit 3924e7ec3, in the base's history, before the row's last write) says "A where-clause variable may not appear as a static argument in an extends clause" and marks this very declaration "Not allowed!", with `widen` as the way to write covariance; P-97 is the curator's decision. The refusal the row records is what the text now requires.
- evidence FAIL: the probe `explorations/spec-probes/p16_covar.fss` is gone (old path kept in the history); the pin `KindEnv.scala:184-188` "at e8a842d97", a commit not in the base's history. Comprehension FAIL: "(climb batch 18 rung X)" is a batch story; "Root cause of most static-argument ascriptions" is unsupported. Ownership pass. Consistency: FACTS F-21 already says "Today's specification refuses the form in any case".
- Disposition: close, 3924e7ec3, test none (a refusal that is correct needs no promotion; the spec text is the settlement). Facts dropped and homes: the frozen spec's idiom, the `extendsConditions` behaviour and the CovariantCollection workaround stay in the history, row 17; covariance as future work is P-62 and row 404; the `widen` shape is the spec's own text. If the landing prefers it, RETIRED is the alternative status; that is the curator's word.
- Read beyond evidence: `Specification/basic/trait-parameters.tex:395-560`, POSITIONS P-25, P-62, P-97, FACTS F-21.

## Row 390: measure
- scope pass; present meaning UNSURE: `checkApplication` was rewritten after the row (`Functionals.scala:605-631` at c124c6b65: "An attempt by subtyping counts only the candidates that fit without a coercion the call needs"), so "the checker keeps the candidates applicable only with coercion beside one applicable without" may no longer hold; the XXX test is gated and still fails, but how is unknown. evidence FAIL: pin `Functionals.scala:430-453` has shifted (+13) and names no commit. comprehension FAIL: "rung I (`8dc1a74d9`) kept that ranking" is a repair story. ownership, consistency pass.
- Disposition: measure (questions.md); the rewrite follows the run's outcome.
- Read beyond evidence: `Functionals.scala` at the base (lines 579-725), `compiler_tests/XXXCoercionAnyOverloadRungC.{test,fss}`, `references/tests-running.md` (compiler_tests is gated).

## Row 513: keep
- All six pass. The XXX test is gated and the newest gate holds, so it still fails. The pins' lines are unchanged since ae4f8e38a and hold their text (`Coercions.java:117` skips a coercion whose static parameters differ in count from the target's). Sibling 389 is closed, but it is the fixed half (a coercion without its own static parameter) that this row is defined against; naming it is useful. FACTS F-? at FACTS.md:184 agrees ("a coercion with its own static parameter (row 513)").

## Row 754: rewrite
- comprehension FAIL: "Since rung A", "Climb batch 18 rung K: the compiled sibling, row 753, is fixed; walk is unchanged." evidence FAIL: no commit on the pins. Others pass; XXX gated, still fails.
- New line: pins at c124c6b65 (`:1463-1467` hold; `:1513` is the where-variable term inside `named`), the compiled sibling's state as "(row 753, fixed)".
- Dropped: "The base refuses the clause, 'E is undefined.'" (the state before rung A): history, row 754.

## Row 755: rewrite
- comprehension FAIL: "the type face since rung A, which puts the variable in scope in the members". evidence: pins without commit; `BuildTraitEnvironment.java:148` is `fcn.finishInitializing();` inside `forFnDecl3` (now cited at `:126`, `:148`); `processWhereClauses` begins at `:943`. Others pass.
- Dropped: the rung-A history of the type face: history, row 755.

## Row 756: rewrite (status stays CONTESTED)
- comprehension FAIL: "Since rung A; the base refuses the clause, 'E is undefined.'", "Tried on main at 08c95c708 (climb batch 22's planner): the crash stands; row 809's repair does not reach it." Evidence: pins at 08c95c708, unchanged. CONTESTED reason (the spec is silent on the call's type) holds and stays. Reproducer `none` with the crash message in the claim; no gated test since the refusal is a crash.
- New notes keep "Row 809's fix, for a functional method, does not reach it" without the story. Dropped: the trial's provenance and the pre-rung-A refusal: history, row 756.

## Row 777: rewrite
- comprehension FAIL: "The compiled checker refuses the call since climb batch 18 rung K". evidence: no walk mechanism with a pinned line; none is in the evidence, and I did not find one without a run; noted here as a gap for a later reader. Others pass; XXX gated.
- Dropped: when the compiled check landed: history, row 777.

## Row 778: keep
- scope, present meaning, comprehension, ownership, consistency pass (FACTS.md:112 agrees). The commit-says-fixed signal is false: 396e4ed8d's Appendix I names row 778 among walk's departures, not a fix. Evidence: the mechanism has no pinned line. A lead, not a finding: a trait without static parameters binds its where-clause variables in its component's environment (`processWhereClauses`, `BuildEnvironments.java:961` at c124c6b65, and the comment at `:1463-1465`), which matches the error's component span; adding it needs a run, so the line is kept as it stands.

## Row 805: rewrite
- evidence FAIL: pins "at 20138d56c", a commit not in the base's history; the lines (`:452`, `:494`, `:481`) are unchanged and hold their text at c124c6b65. Others pass; `none` reproducer with the probe command and output in the notes; FACTS.md:119 agrees.
- Change: the pin commit only. Nothing dropped.

## Row 831: rewrite
- evidence FAIL: the reproducer `explorations/perf-probes/anyintegral-comprises-where/REPORT.md` is a report, not a program (the folder holds only it); the cell becomes `none`, and the program with its output is already in the notes. Siblings: 17 dropped, since row 17 closes (the extends case is now forbidden by the text). Others pass; FACTS.md:178 and POSITIONS.md:41 agree.
- Dropped: "at the clause" (the place of the error) and "here" to fit 700; the report's path stays as the fix's home.

## Row 868: keep
- All pass; written 2026-10-31 at the rows' current form; XXX gated. The mechanism has no pinned line (none is known); the siblings and the compiled sibling 867 are named.

## Row 869: rewrite
- comprehension FAIL: "since rung G both run compiled". New line: "both run compiled". Nothing else changed.

## Files
- closes.txt: 17. questions.md: 390. pairs.txt, dups.txt, silent.txt: empty (no pair across chunks; no duplicate; no NEGATIVE-VERIFIED row beside `silent`: 756 is CONTESTED).
