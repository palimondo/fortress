# Check of chunk c26 (run c-run2, base c124c6b65)

mech.md: 8 lines, 0 failing. Read: assessment.md, rows.rewrite, closes.txt, dups.txt, questions.md, pairs.txt, silent.txt, cold-read.md, evidence/*.md; sources opened at c124c6b65 as cited below.

Result: 10 pass, 2 fail (756, 805).

## Row 17 (close, 3924e7ec3, test none): pass
- 3924e7ec3 is in the base's history (`git merge-base --is-ancestor`). `Specification/basic/trait-parameters.tex:396-421` at the base: "A where-clause variable may not appear as a static argument in an extends clause", and `trait C[\S\] extends C[\T\] where {S extends T, T extends Object}` is marked "Not allowed!", with `widen` as the way to write it (`:427-443`). The refusal the row records is what the text now requires; "both paths refuse it, T is undefined" is FACTS.md:15's statement. FIXED by a landed commit fits the template (ledger header, line 19); no test is needed for a refusal that a spec change made correct.
- Dropped facts have homes: the `KindEnv.extendsConditions` note (an entry's `where` clause that binds a variable is read as a parent at every instance) is held by FACTS F-255 ("A clause that binds a variable ... is read as before: as a parent at every instance"), not only by the history as the assessment says; covariance as future work by P-62 and row 404; the gone probe and the pin at e8a842d97 by the history.

## Row 390 (question to measure): pass
- `checkApplication`'s doc comment at `Functionals.scala:606-629` at the base does say an attempt by subtyping "counts only the candidates that fit without a coercion the call needs", so the claim may have moved; the question is narrow. `bin/fortress junit` exists (`Shell.java:410`), the commands run from the main tree, `compiler_tests/XXXCoercionAnyOverloadRungC.{fss,test}` exist, and each of the three outcomes maps to a line or a close.

## Row 513 (keep): pass
- `Coercions.java:117` at the base: `if (g.getStaticParams().size() != targs.size()) continue;`, the skip the row describes. Sibling 389 being closed is the half this row is defined against.

## Row 754 (rewrite): pass
- `BuildEnvironments.java:1463-1467` at the base is `termOf`'s where-variable case calling `named`; `:1513` is `named`'s where-variable term (`named` begins at `:1509`). Row 753 is FIXED. No batch story remains. The dropped "The base refuses the clause, 'E is undefined.'" is pre-change state, history. The cold read's three wording items do not block a worker: the file and lines answer them.

## Row 755 (rewrite): pass
- `BuildTraitEnvironment.java:126` opens `forFnDecl3`, `:148` is `fcn.finishInitializing()` in it; `processWhereClauses` begins at `BuildEnvironments.java:943`, its bindings loop at `:952-970`. The reproducer `tests/XXXWhereVariableMemberWalk.fss` holds the type face, `getter item(): E`. mech's "in the old, not the new" tokens are both present in the new line (format only).
- Note, not a failure: "on the base 3aea3da53 too" uses "the base" beside the line's own pin at c124c6b65 (the cold read stumbled); the judge may write "at 3aea3da53 too".

## Row 756 (rewrite, CONTESTED kept): FAIL
- Reproducer: the cell is `none`, and the notes give the program's shape and the message but no command and no place for the whole program (the claim omits `object Box`, `mk()`); the cold read had to guess ("write the program from the claim and run fortress typecheck"). The program and its command exist: `explorations/compile-ladder/plan-22/probes/NOTES.md:96-109` at the base, "Row 756's program", run by `bin/fortress typecheck -debug stacktrace`.
- Correction: append to the notes (572 of 700, room for it): " Probe: `bin/fortress typecheck` on \"Row 756's program\" in `compile-ladder/plan-22/probes/NOTES.md`."
- Otherwise pass: pins `TypeAnalyzer.scala:1077`, `:208`, `Functionals.scala:458` at 08c95c708 are unchanged at the base and hold their text; status CONTESTED stays with its reason; no story remains.

## Row 777 (rewrite): pass
- Only "since climb batch 18 rung K" removed; the compiled refusal is present state (row 748 FIXED). FACTS.md:112 agrees. No walk site is pinned; none is in the evidence, and the cold read notes it without being misled.

## Row 778 (keep): pass
- The commit-says-fixed signal is false: 396e4ed8d names row 778 among walk's departures in Appendix I. No cited line; the commits since touch only the compiled path. FACTS.md:112 agrees.

## Row 805 (rewrite): FAIL
- Fidelity: pass. The pin moves from 20138d56c (not in the base's history) to c124c6b65; `Functionals.scala:452`, `:494`, `:481` hold the cited code. The claim's message and the accepted forms match `explorations/compile-ladder/rung-index-bound/REPORT.md:153-157` at the base.
- Reproducer: the cell is `none` and the notes' command, "the count stage's `WorldFlip -stop typecheck`", names no file a worker can find; the cold read could not locate it (`references/compiler.md` names only `checker-count/run.sh`). The tool is `explorations/coordinator/tools/checker-count/WorldFlip.java` (`-stop typecheck` is its option, `:12`, `:34`).
- Correction: in the notes replace "Probe: the count stage's `WorldFlip -stop typecheck` on such a call" with "Probe: `WorldFlip -stop typecheck` (`coordinator/tools/checker-count/`) on such a call" (notes stay under 700).

## Row 831 (rewrite): pass
- `REPORT.md` is not a program, so `none` is right; the program and its two commands (walk, `fortress disambiguate`) and outputs are in the notes. Pins at 2be634867 unchanged and hold. Sibling 17 dropped as it closes in this pass (if the judge keeps 17 open, restore "17, "). "at the clause" (the error's place) is in the history.
- Note, not a failure: the class `implementation gap (checker)` for a front-end refusal on both paths read two ways to the cold reader; unchanged from the old line.

## Row 868 (keep): pass
- Written 2026-10-31 by c324b841c in the current form; nothing since touches it; row 867 open as named.

## Row 869 (rewrite): pass
- Only "since rung G" removed; c324b841c (the row's own last write) is the commit that compiles where-clause headers, so "both run compiled" is present state.

## Files
- dups.txt, pairs.txt, silent.txt empty: pass (no NEGATIVE-VERIFIED row of the chunk is beside `silent`; 756 is CONTESTED).
