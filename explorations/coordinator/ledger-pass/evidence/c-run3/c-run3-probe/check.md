# Check of c-run3-probe (the prober's lines), base c124c6b65

`mech.py` rerun: `MECH: 14 lines, 0 failing, every check passes.` (12 rewrites, 2 closes; `ledger.py check` and `check --base c124c6b65` on the copies exit 0). Form passes for every line. Every history path the lines cite exists in its named parent (`git cat-file -e`: `c69cb2064^` p20/p10, `4ebf80aec^` run-c/probes/api/ and g145_and.fss, `1ee3b0bc5^` p06_cross/p10_eqv/x03_lib/x04_gram, `e879b6a44^` g10.fss, `a0a0c7c99^` G158.fss, `ab067d9b6^` Sk2InheritedPlain/Sk2Inherited, `1ee3b0bc5^` Rung2.out.0). The probe copies in `probe/` equal their sources except where `runs.md` names a change (checked by diff for p20, p10, G158T, NatReflectTest, XXXGenericPositionalFixed; V18Pair differs more, see row 297).

Counts: 9 pass, 8 fail.

## Row 135 (close, 20474c144, test none): FAIL
- Commit `20474c144` is in the base's history; by its message it instantiates an unwritten big operator by its value's declared type, else its elements' join; the run (`runs.md`) shows both bindings print the map under walk, the path the row names. Test `none` with a note is allowed by `ledger.py close`. The close stands.
- Failure (fidelity, reproducer): the note, which `ledger.py close` writes into the row's notes cell, names the program as "bin/fortress G1eBigUnion1.fss (the row old probe g1e_bigunion1.fss)": `G1eBigUnion1.fss` is in no tree (it is `tmp/.../probe/p135/`), and it is the old probe plus an untyped binding (`c10/questions.md`, row 135), which the note does not say. Its apostrophes are also dropped ("the row old probe", "its value declared type", "its elements join").
- Correction: the 4th field of `closes.txt`, row 135, becomes: `no gated test asserts a BIG UNION over a generator of maps without static arguments; at c124c6b65 the row's probe explorations/run-b2/probes/g1e_bigunion1.fss (in the parent of 22ea0cd90), with an untyped binding c = BIG UNION[ m <- seq(ss) ] m added, prints typed = {a|->1, b|->2, c|->30} and untyped = the same under walk, exit 0; 20474c144 instantiates an unwritten big operator by its value's declared type, else by its elements' join (by reading, not bisected)`

## Row 747 (not run, queued): PASS
- No line written; the judge's line in `c10/final.rewrite` stands. The queue item is narrow, names its edit (`Library/FortressLibrary.fss:4597`, `fail[\ZZ32\](` to `fail(`) and its command (`checker-count/run.sh` in a seeded worktree), and points to the question's outcomes.

## Row 307 (rewrite of the judge's line): PASS
- Differs from `c14/final.rewrite` only in "exit 1 (at c124c6b65)" for "(at `a1a75716a`)"; `runs.md` shows compile exit 0, run exit 1, the quoted message, on a copy equal to `ProjectFortress/tests/NatReflectTest.fss` at the base. Dropped `a1a75716a`, `9d323883f`: superseded by the run at the base (history keeps them). Status kept. The cold read's items (three defects in one row, `dim`/`unit`) belong to the judge's line, not to this change.

## Row 499 (rewrite of the judge's line): PASS
- One sentence changed: "answers `tag` for `fixed` compiled; walk answers `fixed` (at c124c6b65)". `runs.md`: walk on a copy equal to `compiler_tests/XXXGenericPositionalFixed.fss` prints `REACHED`, `PASS`, its asserts wanting `fixed`. "compiled" is the gated `XXX` test's expected failure. Dropped tokens are the judge's (re-pinned `OverloadSet.java`, `Functionals.scala:824-832`, `e2f1aa7e8`/`row 159` replaced by F-75 and the measured walk answer).

## Row 77 (rewrite): FAIL
- Holds: `runs.md`, compile exit 255 with `No such method Tree.tsum.` at `8:18-24`, `8:29-35`, `12:18-24`; walk `p20 3.0`; probe equals `git show c69cb2064^:explorations/compiler-probes/p20.fss`. Nothing dropped. Status as the template defines.
- Failure 1 (fidelity): "Workaround: declare `tsum()` abstract in `Tree`." is stated as fact, but `assessment.md` row 77 says it was not run.
- Failure 2 (cold read): "at each of the three calls" while the line shows one call; the reader could not tell which three (`cold-read.md`, row 77). The probe has two in `Node`'s `tsum` (line 8) and one in `run` (line 12).
- Correction: "at each of the three calls" -> "at each of the three calls (two in `Node`'s `tsum`, one in `run`)"; "Workaround: declare" -> "Workaround, not run: declare". Notes 425 -> 473.

## Row 78 (rewrite): FAIL
- Holds: compile exit 255, the quoted messages at `7:23-30`, `7:35-42`, `10:18-23`; walk `p10 3.0`; probe equals `c69cb2064^`'s. Nothing dropped.
- Failure (cold read): "at each of the three calls", as in row 77; the three are the two in `tsum(t: Node)` (line 7) and the one in `run` (line 10).
- Correction: "at each of the three calls" -> "at each of the three calls (two in `tsum(t: Node)`, one in `run`)". Notes 364 -> 403.

## Row 83 (rewrite, CONTESTED): PASS
- `runs.md`: walk `first 3.0`, `second 10.0`, `first again 3.0`, exit 0; compiled `NatApi.fsi:2:18-22: Array1 is undefined.` `explorations/run-c/probes/api/` is in `4ebf80aec^` (Chk.fss, Prog.fsi, Prog.fss). Status `CONTESTED` kept, the retirement left to the curator (queue). Dropped `.fsi`/`.fss` (the "needs a fresh pair" sentence): false now, the pair was built and run. The cold read's "mis-unify" is the row's unreproduced original claim; a worker stops at `CONTESTED`.

## Row 184 (rewrite): PASS
- `runs.md`: `before`, then `** bug! Expect all oprefs to be top level EQV`, exit 1; `probe/p184/EqvUser.fss` is the plain `a ≡ b` the notes describe. `Evaluator.java:896` at the base is `bug("Expect all oprefs to be top level " + op);` inside `getOp`. The library at the base declares no `≡`/`EQV` (`git grep` over `Library` and `LibraryBuiltin`: only `NEQV`, `SEQV`). Dropped `0ff5eae27~1`, `explorations/apl/v1/base`: the old verification's worktree, superseded by the run at the base (history keeps it); `p10_eqv.fss` is kept as `explorations/apl/v1-probes/p10_eqv.fss`. `silent.txt`: defect, consistent with the class.

## Row 30 (rewrite): FAIL
- Holds: `runs.md`, `user top-level +: W(3.0)` then 'Failed to find any matching overload, args = (W,W)' at `FortressLibrary.fss:3448:27`, candidates the library's `+` only; `:3448` is `join(a: T, b: T): T = a + b` in `object SumReduction[\T extends AdditiveGroup[\T\]\]` (`:3445`); probe equals `e879b6a44^:explorations/gap-ledger-probes/g10.fss` but for its name and a comment. Dropped `6.0`, `RR64`, `W(6.0)`: the old output, false at the base. Status and class stand.
- Failure (cold read): "Walk takes `SUM` at `W` though `W` does not extend `AdditiveGroup[\W\]`, the reduction's bound." reads as a second defect inside the row; the reader could not tell whether it is part of the row or recorded elsewhere (`cold-read.md`, row 30). `assessment.md` calls it a lead, not a row.
- Correction: that sentence -> "Walk also runs `SumReduction` at `W`, outside its bound `AdditiveGroup[\W\]`: a reading, not a row." Notes 664 -> 668.

## Row 145 (rewrite): FAIL
- Holds: `runs.md` (APL path) `false AND bump()` runs `bump` once, the thunk zero times, `true OR bump()` once, exit 0; `Library/FortressLibrary.fsi:2648`-`:2651` at the base are `OR`, `AND` (Boolean), `OR`, `AND` (thunk), as cited; `REPORT.md` "How to run" sets `FORTRESS_SOURCE_PATH` with `explorations/apl/base`. Dropped `Library/FortressLibrary.fsi:2607-2609` (stale pin, re-pinned), the `⍋` guard's text and `Index of dimension 1 out of bounds` (history keeps them).
- Failure (nothing lost, cold read): the old line's "Specified" is gone, so the line no longer says why the class is `deliberate`; the reader could not tell what `conditionalops.tex:13-27` states (`cold-read.md`, row 145). The section (lines 13-27 at the base) makes conditional only a binary operator immediately followed by `:`.
- Correction: "Every `while (i < n) AND (s[i] …)` loop trips on it, as APL's `⍋` did." -> "Specified: only an operator followed by `:` is conditional, so every `while (i < n) AND (s[i] …)` loop trips on it."; and, for length, "Run with `explorations/apl/base` on `FORTRESS_SOURCE_PATH`, as `explorations/apl/rung-3/REPORT.md`, \"How to run\", says." -> "Run as `explorations/apl/rung-3/REPORT.md`, \"How to run\", says." Notes 695 -> 684.

## Row 164 (rewrite): FAIL
- Holds: `runs.md`, G158T (the history probe with `.fill(f)` made `.tabulate(f)` on line 6, otherwise equal but for its name and comment) prints (1)-(4) as quoted; `FunctionClosure.java:257` at the base is `FType ft = EvalType.getFTypeFromOption(rt, env, BottomType.ONLY);`, so the inference is a reading, as the line says. Dropped `G158.fss:7`, `G158.fss`: the old line number (history), the path kept in full.
- Failure (cold read, reproducer): "with `fill` written `tabulate`" can be read as "already says `tabulate`" (`cold-read.md`, row 164); the history probe calls `.fill(f)` and stops at `fill param 1 (v:RR64) got arg FnExpr` unless it is changed (`runs.md`).
- Correction: "with `fill` written `tabulate`" -> "its `.fill(f)` (line 6) made `.tabulate(f)`". Notes 672 -> 685.

## Row 240 (close, 8f7e183d4, test GenericReturningAny.fss): PASS
- `8f7e183d4` is in the base's history, and its date (2026-09-30) is after the row was first recorded (`e26d254f3`, 2026-09-14). It adds `MakeInferenceSpecific.forAnyType`, the walk path the row names; `ProjectFortress/tests/GenericReturningAny.fss` asserts an overloaded family with `Any` results (`peekBeside`) dispatching under walk. `runs.md`: the row's `A01AnyResult` (with `tabulate`) prints `anyres(f, v) = 1.5`. The attribution is by reading, not bisected; `queue.md` records the bisect as the other way.

## Row 258 (rewrite of the judge's line, CONTESTED): PASS
- One sentence changed, "An `Any` result now dispatches (row 240, closed), so `Object` is not forced.", following row 240's close above. `AplCore.fss:1726-1731` (`aplTup ... : Object`, returning tuples) and `:1743` (`elif aplAllMat(rs) then aplTup(rs)`) hold at the base. Status `CONTESTED` kept. `aplAllMat` has its home in `:1743`; `x04_gram.fss` is kept as its full path.

## Row 297 (no line; queued for a bisect): FAIL
- `runs.md`: walk loads `probe/p297/V18PairT.fss` and prints `m^T` and `t^T`, exit 0, warm and cold; the row's present line says the pair "is refused at declaration". So the ledger would keep a line its own run contradicts at the base: a keep that hides a change. `V18PairT` is a reduced copy of `11bf69c39^:explorations/run-c4/probes/vocabulary/v18_postfix_pair.fss`: no `import FlatArrays2.{...}`, the rank-3 body `= t` for `transpose(t)`, its part (3) removed, `fill` made `tabulate`.
- Correction: a rewrite of row 297, status kept until the close, its notes from "siblings: 97, 159, 214." to before "Probes" replaced by: "siblings: 97, 159, 214. Not reproduced at c124c6b65: walk loads the pair and prints `m^T` and `t^T`, exit 0, cold and warm, for a reduced copy of `v18_postfix_pair.fss` (no `FlatArrays2` import, the rank-3 body `t`, `fill` made `tabulate`); the plain rank-2 `Array` member beside the rank-3 one is still refused, 'are unrelated ... no excluding pair is present' (row 416). The close waits on its commit, by bisect (candidates `6d187d069`, `14e91723f`, `c41c3d2b0`)." The `Array3` workaround and `Smoke2` sentences go (history keeps them).

## Row 444 (rewrite): FAIL
- Holds: `runs.md`, both programs print `1`, `2`, exit 0, cold; `Constructor.java:383-388` at the base holds the loop that builds `new OverloadedMethod(ent.getKey(), s, getWithin())`. Dropped `XXXDottedMethodMeetInheritedWalk` (home: row 735's judged line in `c33/final.rewrite`, and 735 is added to `siblings:`), `OverloadedFunction.java:1761-1773` (stale, its words moved), `Constructor.java:383-388` (kept with its folder), `Sk2Inherited.fss` (kept as `Sk2Inherited`).
- Failure (cold read, fidelity): the paths `compile-ladder/rung-unknown-size-arm/...` and `compile-ladder/rung-walk-overload-if/REPORT.md` lack `explorations/`; `git show ab067d9b6^:compile-ladder/...` finds nothing (the files are under `explorations/compile-ladder/`). "the trait's arm": "arm" is undefined (`cold-read.md`, row 444).
- Correction: "Also with a size on the trait's arm (`m[\nat n\](x: ZZ32)`): both print" -> "With a size on `Tm`'s `m` (`m[\nat n\](x: ZZ32)`) too: both print"; "`compile-ladder/rung-walk" -> "`explorations/compile-ladder/rung-walk"; "Probes `compile-ladder/" -> "Probes `explorations/compile-ladder/"; "and its `Sk2Inherited` beside it" -> "and `Sk2Inherited` beside it"; "Site by reading:" -> "By reading:". Notes 686 -> 697.

## Row 229 (keep of the judge's line): PASS
- `runs.md`: `s07_chain.fss:8:51-59: Variable apl is not defined.`, exit 255, as the line says; the file's last change is `adf939654`, before the row; `Rung2.out.0` is in `1ee3b0bc5^`.

## Row 235 (rewrite of the judge's line): FAIL
- Holds: `runs.md`, `t02_gram.fss` stops at load, 'Overloading of BY(...) ... fails because their parameter lists have the same types' for `Library/FortressLibrary.fss:462` (`opr TIMES(self,b:RR64):RR64`) and `explorations/apl/base/AplCore.fss:1209` (`opr ×(a: RR64, b: RR64): RR64 = a b`); `T02Syn.fsi:30`, `:32` and `AplSyntax.fsi:212` hold the quoted words. Reproducer `none`, the stop stated. `silent.txt`: choice.
- Failure (reproducer): with the cell `none`, the notes must give the command; the rewrite dropped the judge's "Run as `explorations/apl/rung-3/REPORT.md`, \"How to run\", says, with `explorations/apl/base` on the source path", so the stop is reported without how it was run (the APL path of `runs.md`).
- Correction: "at c124c6b65 it stops at load" -> "at c124c6b65, run as `explorations/apl/rung-3/REPORT.md`, \"How to run\", says, it stops at load"; and, for length, delete "The closing delimiter is no barrier the gap can see. " (the claim's "inside a delimited rule" carries it). Notes 682 -> 694.
