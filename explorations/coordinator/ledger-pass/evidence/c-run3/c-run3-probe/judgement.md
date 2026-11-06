# Judgement of c-run3-probe, base c124c6b65

Check: 9 pass, 8 fail; every failure is a correction made exactly from `check.md`. `mech.py --final`: `MECH: 15 lines, 0 failing, every check passes.` Applied 17 rows (13 rewrites, 2 closes, 2 with no line of their own), held 0.

- **135** close, `20474c144`, test `none`: applied. Correction: the note replaced by the check's text (the row's probe path in history, the untyped binding named, apostrophes restored).
- **747** no line: applied as the check passes it; the judge's line in `c10/final.rewrite` stands; the count-stage run is queued.
- **307** rewrite of c14's line: applied (check passes).
- **499** rewrite of c21's line: applied (check passes).
- **77** rewrite: applied with corrections: "the three calls (two in `Node`'s `tsum`, one in `run`)"; "Workaround, not run:".
- **78** rewrite: applied with correction: "the three calls (two in `tsum(t: Node)`, one in `run`)".
- **83** rewrite, `CONTESTED` kept: applied (check passes); retirement queued to the curator.
- **184** rewrite: applied (check passes); `final.silent`: defect.
- **30** rewrite: applied with correction: the bound sentence becomes "Walk also runs `SumReduction` at `W`, outside its bound `AdditiveGroup[\W\]`: a reading, not a row."
- **145** rewrite: applied with corrections: "Specified: only an operator followed by `:` is conditional, so every ... loop trips on it."; the run sentence shortened to "Run as `explorations/apl/rung-3/REPORT.md`, \"How to run\", says."
- **164** rewrite: applied with correction: "its `.fill(f)` (line 6) made `.tabulate(f)`".
- **240** close, `8f7e183d4`, test `ProjectFortress/tests/GenericReturningAny.fss`: applied (check passes); bisect queued as the other way.
- **258** rewrite of c33's line, `CONTESTED` kept: applied (check passes).
- **297** rewrite (the prober wrote none): applied as the check's line: notes from "siblings: 97, 159, 214." to before "Probes" replaced by the check's text. Two further corrections for `mech.py --final`, which failed bare file names as unresolved citations: "a reduced copy of `v18_postfix_pair.fss`" -> "a reduced copy of the first probe below"; `v18b_postfix_nat.fss` -> `explorations/run-c4/probes/vocabulary/v18b_postfix_nat.fss` (exists in `11bf69c39^`, checked with `git cat-file -e`). Close by bisect queued.
- **444** rewrite: applied with corrections: "With a size on `Tm`'s `m` (...) too: both print"; `explorations/` added to both `compile-ladder/` paths; "and `Sk2Inherited` beside it"; "By reading:".
- **229** keep of c43's line: applied (check passes), no line.
- **235** rewrite of c43's line: applied with corrections: "at c124c6b65, run as `explorations/apl/rung-3/REPORT.md`, \"How to run\", says, it stops at load"; "The closing delimiter is no barrier the gap can see. " deleted for length. `final.silent`: choice.

`final.dups`: empty (no `dups.txt` lines). `final.pairs`: empty (no `pairs.txt` in this folder). `final.silent`: `silent.txt` as written (184 defect, 235 choice).
