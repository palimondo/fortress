# Judgement of chunk c10, run c-run3, base c124c6b65

Final mech (`mech.py --final`): "MECH: 6 lines, 0 failing, every check passes." Applied 7 (six rewrites and one keep), held 5.

- **900: apply** (rewrite), with the check's one correction: "which the review's option (b) does" replaced by "a step that option (b) of `explorations/reviews/io-objects-carrier-2026-11-06.md` (point 16) allows and its rung may leave out" (the review's line 362 allows the step, it does not take it).
- **901: apply** (rewrite), as written; the check passes it.
- **747: apply** (rewrite, NEGATIVE-BOUNDED kept), the check's correction made: the question dropped (it needs an edited library copy in a seeded worktree and a bisect, not a run from the main tree), the line written as the check gives it: the claim names the shape, not `strToInt`; the notes say the one site now writes `fail[\ZZ32\]` (`Library/FortressLibrary.fss:4597`, at c124c6b65) so no stage shows it, give the measure (the count stage on a copy with `fail(` there, seeded worktree, not run since `0856f3e6a`), and the workaround `fail[\T\]`; "(distance 44 to 43)" dropped (home: history, row 747); 'Variable __cond is not defined' kept with `ProjectFortress/compiler_tests/XXXIfGeneratorClause.test`. Reproducer cell left as it was. My own form fix for the notes limit (708 of 700): "The one site" written "Its site", "Workaround: write" written "Workaround:".
- **49: apply** (rewrite), with the check's three corrections: "is passed on as an unfinished paste" replaced by "is passed on as a paste, an `IUOTuple` never built into an array" (`Evaluator.java:859-861` calls `paste.finish()`); the garbled `Array`k`[...]` replaced by "`Arrayk[\T, 0, n0, …, 0, nk-1\]` (`Array1` to `Array3` in the library)" (`aggregate.tex:129-135`); "Bites `RR64` as hard as a user type." replaced by "`RR64` elements fail as a user type's do."
- **106: apply** (rewrite), as written; the check passes it.
- **142: apply** (rewrite), as written; the check passes it.
- **107: keep, passes.** The check passes it; the row keeps its line, nothing to apply.
- **135: hold.** The writer's verdict was "measure"; no prober ran the question of `questions.md` (no `runs.md` in the run), so whether `20474c144` fixed `BIG UNION` over maps under walk is unsettled. The row keeps its line; the question goes to `queue.md`.
- **104: hold.** The check's correction (the 2×2 grid sentence from `e879b6a44^:explorations/gap-ledger-probes/g19.fss`) makes the notes 719 of 700; no cut is given by the check's sources, so it cannot be made exactly.
- **343: hold.** The check's three corrections (the claim's "walk fails at run time, not with the static error"; "The compiled path has no clash"; the environments of `getValueRaw` and `putValueRaw`) make the row 1290 of 1,200 and the notes 787 of 700; no exact cut.
- **344: hold.** The check's two corrections (the citation of `references/compiler.md`, "The compiler's prelude, until the switch-over"; "the clash of row 343") make the notes 748 of 700; no exact cut.
- **841: hold.** The check's four corrections (P-12's home, "when the object defines the method", the `Specification/` root, `WalkOther`) make the row 1263 of 1,200 and the notes 816 of 700; no exact cut.

Pairs, dups, closes: none (`final.pairs`, `final.dups`, `final.closes` empty). Silent: 900 and 901 `defect`, both upheld by the check (`Library/File.fsi:102`, `:131` against `Library/File.fss:66-94`); `final.silent` holds both. `XXX` tests believed to pass: none.
