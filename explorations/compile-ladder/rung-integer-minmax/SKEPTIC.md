# Skeptic, rung M (`rung-integer-minmax`): first judgement

**Verdict: approved, with four required corrections.** The fifteen declarations do what the report says, and only that. The recorded failure is real, was committed before the edit, and reproduces. The test fails on the base and passes on the edit, and the expected failure for the compiled path reproduces with its control. What the rung left unaccounted for: the sibling operators `MAXNUM` and `MINNUM`. `Integral` gives them to the same five types by `self MAX other`, and they keep row 484's tie under `walk`. The specification's `ZZ` declares them beside `MAX` and `MIN`, so they are owed a home-2 test in this batch. The report also calls `TotalComparison`'s three declarations the team's, but climb batch 7 added them. The corrections are in section 12.

Worktree `/home/user/fortress-minmax`, branch `wip/rung-integer-minmax` at `a7df9bfbe`, base `bce66f1fa`. The branch holds four commits by the worker: `d398aef08` (the failing test and its capture), `4eeb9603a` (the edit), `422ba0bd8` and `a7df9bfbe` (the measurements). REPORT.md and record.md are not on the branch because the harness refused the worker's write. I read their texts from the structured result.

Machine for every run below: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4, `FORTRESS_THREADS=1`. The load average was 0.21 at the first run (03:04 UTC) and up to 8.9 while three walk JVMs and the compiled runs shared the box. Each capture carries its own machine line.

## 1. The recorded failure (check 3)

- **The capture.** `explorations/compile-ladder/rung-integer-minmax/probes/newtest-preedit.txt` was committed in `d398aef08` at 01:36:41 UTC, before the edit commit `4eeb9603a` at 01:57:49. It records "Ambiguous coercion, args = (3: ZZ64,1: ZZ32)" at `ProjectFortress/tests/IntegerMinMaxRungM.fss:35:18` (`b MAX 1`), rc 1.
- **My reproduction on the base.** I built a sandbox, `tmp/skbase`: the four library files at `bce66f1fa`, every other entry a symlink into the worktree, selected by `FORTRESS_HOME` and `FORTRESS_AUTOHOME` (`ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:24-34`). On it the unmodified test stops at the same line with the same message, rc 1 (`probes/skeptic/rerun-IntegerMinMaxRungM-base.txt`).
- **My reproduction on the edit.** It prints `PASS`, rc 0 (`probes/skeptic/rerun-IntegerMinMaxRungM-walk.txt`).
- **The sandbox is the base.** A control program, `b MAX 1` for a `ZZ64`, refuses on the sandbox and answers `3 : ZZ64` on the edit (`probes/skeptic/walk-base/ControlMaxNumZZ64.txt`, `walk-edit/ControlMaxNumZZ64.txt`).

## 2. The provenance block (check 2)

I opened every cited line with `sed -n`.

- **problem:** correct. `explorations/reviews/before-n-questions/walk-max/summary.txt:1` is `MaxNumZZ64 b MAX 1 ... Ambiguous coercion`, and `probes/newtest-preedit.txt:8` is the `ProgramError` line.
- **spec:** correct, and all cites are prose chapters, none under `Specification/library/apis/`.
  - `Specification/basic/conversions-coercions.tex:533-553` is the rewriting rule and its uniqueness guarantee.
  - `:486-500` is "rejects" and "no less specific".
  - `Specification/advanced/overloading.tex:224-235` is the Meet Rule.
  - `Specification/basic-lib/basic-integers.tex:263-264` is `ZZ`'s `MAX` and `MIN`, and `:642-645` says they return the larger and the smaller argument.
- **precedent:** the lines say what the block says:
  - `Library/FortressLibrary.fss:172-175` (`TotalComparison`) and `:285-288` (`StandardTotalOrder`);
  - `:582-591` (`QQ`) and `:427-429` (`RR64`);
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:198-200`.

  Their provenance is misstated in the report's section 3; see section 4.
- **deviation:** two lines check out: `CompilerBuiltin.fss:649-651` has the `<=`/`>=` bodies, and `Library/FortressLibrary.fsi:615-617` puts the three after `ZZ`'s coercions. The third is wrong on its own citation. It says `MINMAX` is declared on `ZZ` "where the specification's `ZZ` lists only `MAX` and `MIN` (`Specification/basic-lib/basic-integers.tex:263-266`)". Lines 265 and 266 are `MAXNUM` and `MINNUM`. The specification's `ZZ` lists `MAX`, `MIN`, `MAXNUM` and `MINNUM`, and no `MINMAX` (required correction 3).
- **historical:** names all four files of the 2012 tree that the diff edits, and nothing else of that tree is touched (`git diff --stat bce66f1fa -- Specification Library/CompilerLibrary* ProjectFortress/LibraryBuiltin/Compiler* ProjectFortress/src explorations/run-c4/src explorations/apl/mg` is empty).

None of this is a ground to refuse: every line exists and cites a prose chapter, and the historical line is complete.

## 3. The diff (check 4)

The diff adds fifteen declarations, 35 lines, and nothing else in the library:
- `Library/FortressLibrary.fss:707-710` (`ZZ32`), `:795-798` (`ZZ64`), `:867-870` (`NN64`) and `:948-951` (`ZZ`);
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:403-406` (`NN32`);
- the matching signatures in the two `.fsi` files.

Each body is `StandardTotalOrder`'s (`Library/FortressLibrary.fss:285-288`) at the type's own type, calling the type's own `<`: a native on four types, `cmp` on `ZZ` (`:943`). Each signature is the compiler library's api form (`CompilerBuiltin.fsi:198-200`). That is the smallest edit decision 2 describes (POSITIONS 2026-09-28, the two decisions of the conversion judgement, decision 2).

For two equal arguments, `MIN` returns `self` and `MAX` returns `other`. Within one type these are the same value, which `basic-integers.tex:642-645` requires.

## 4. The precedent search (check 5)

**The precedent followed is right, but the report misstates its provenance.**

What the report claims:
- the one library "already solves this problem the same way five times";
- `TotalComparison`'s three are "the form copied";
- "All of these are already present at the history's earliest reachable commit (`5a68404fd`, 2012-07-19), so they are the team's."

What the blame shows:
- **`TotalComparison`'s `MIN`, `MAX` and `MINMAX` are not the team's.** Blame puts `Library/FortressLibrary.fss:172-175` at `952892a00` (2026-09-28): climb batch 7, rung H, whose message reads "restating >=, <=, MIN, MAX and MINMAX at itself", modelled on the compiler prelude. The team's comment above them (`:161-163`, `5a68404fd`) speaks of `CMP` and `>=`, not of `MIN` or `MAX`.
- **`RR64`'s three and `Float`'s and `RR32`'s own are the team's device in a revised form.** They were declared at `Number` in 2012 (`git show 5a68404fd:Library/FortressLibrary.fss`, lines 371-373; `FortressBuiltin.fss`, lines 95-99 and 263-267 there) and retyped by `d846e3644` (2026-09-27).
- **These are the team's (`5a68404fd`):**
  - `StandardTotalOrder`'s bodies (`:276-289`);
  - `QQ`'s own three (`:582-587`);
  - `ZZ64`'s own `>`, `>=`, `<=` and `CMP` under "Argh!" (base `:782-790`);
  - `ZZ`'s comparisons (base `:931-935`);
  - the compiler library's three on every integer type (`CompilerBuiltin.fsi:137-139`, `:198-200`, `:261-263`, `:318-320`, `:378-380`, `:425-427`).

The edit is unaffected, because the bodies are the team's `StandardTotalOrder` bodies and the device is the team's (`QQ`, the float types and the compiler library). But POSITIONS 2026-09-19 makes "the library's own practice" the standard, so a revival copy must not be presented as that practice (required correction 2).

**The site count is incomplete.** The report says "the types in the one library that inherit the family from a generic order trait and meet `QQ`'s or `RR64`'s declaration through a conversion are exactly the five integer types, so the fifteen declarations cover every such site." That holds for `MIN`, `MAX` and `MINMAX`. The same five types also inherit `MINNUM` and `MAXNUM` from the generic `Integral`:
- `opr MINNUM(self, other:I):I = self MIN other` and `opr MAXNUM(self, other:I):I = self MAX other` (`Library/FortressLibrary.fss:661-662`, api `.fsi:470-471`);
- once a conversion is needed, these meet `QQ`'s `MINNUM` and `MAXNUM` (`:628-631`) in exactly row 484's tie.

The specification's `ZZ` declares both right beside `MAX` and `MIN` (`Specification/basic-lib/basic-integers.tex:263-266`, `:637-640`) and says what they return (`:642-645`, "For all four"). The team's draft does the same (`Library/incomplete/basic/Fortress.Number.fsi:144-147`; the report cites `:144-145` and stops one line short of `MAXNUM`). Measured in section 9: required corrections 1 and 4.

## 5. The test (check 6)

`ProjectFortress/tests/IntegerMinMaxRungM.fss` carries one comment line (`:4`, a pointer to REPORT.md) and no provenance in the source.

What it exercises:
- `b MAX 1`, `b MIN 1` and `b MINMAX 1` for a `ZZ64` and a `ZZ` (the refusals of row 484);
- `1 MAX b`, and a negative `ZZ64` against a numeral in both directions;
- eight mixed-variable calls, which reach the own declarations of `ZZ64`, `NN64` and `ZZ` through a conversion.

The run on the base stops at the first `ZZ64` call, so the mixed-variable assertions were first seen failing in the matrix (`probes/matrix/compare.txt`), not in the test. That is acceptable, since each of them answered `QQ` or refused there.

Nothing in the gated test reaches `NN32`'s own declarations, and nothing distinguishes `ZZ32`'s own from the inherited ones. That is expected: in this run no conversion leads into `NN32` or `ZZ32`, so those six declarations change no answer until rung Q's numeral switch. My `EdgeNN32NN32Min` shows `NN32`'s own `MIN` keeps the unsigned order (`u MIN t = 1 : NN32` with `u = 4294967295`). I do not require an assertion for it.

The `XXX` pair in `ProjectFortress/compiler_tests/` follows the shape FACTS records for a run-time defect ("The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only, and a run-time defect needs two `.test` files"), and the precedent `XXXDispatchMethodArmRungG.test` with `DispatchMethodArmRungGLink.test`. I re-ran `xxx-compiled.sh` (`probes/skeptic/rerun-xxx-compiled.txt`):
- the compiled run prints `REACHED`, then `FAIL: ZZ =/= ZZ64`;
- the link test is OK;
- the `XXX` test reads "Saw expected failure (Exit code != 0)";
- the control with `ZZ` expected prints `PASS`, and the same `.test` file reads "Did not see expected failure" (FAILURES);
- `walk` prints `PASS`.

## 6. The competing-declaration grep (check 7)

I searched for declarations of the family, `opr (MIN|MAX|MINMAX|MAXNUM|MINNUM)`:
- **The one library** (`Library/FortressLibrary.*`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.*`) has the fifteen, the generic traits' declarations (`.fss:242-287`), `Integral`'s `MINNUM`/`MAXNUM` (`:661-662`), `TotalComparison`, `RR64`, `QQ`, `Float` and `RR32`, and the array-scalar block (`:4633-4636`).
- **Every other `.fsi`/`.fss` under `Library/` and `LibraryBuiltin/`,** except the compiler prelude and `incomplete/`/`archive/`, has none.
- **The corpora.** `ProjectFortress/tests/`, `compiler_tests/`, `library_tests/` and `test_library/` hold the declarations the worker's `probes/competing-grep.txt` lists, and no `MAXNUM` or `MINNUM` declaration. The only files calling `MAXNUM` or `MINNUM` are `testRR32.fss`, `realArith.fss` and `RationalTest.fss`, over floats and rationals.
- **`ProjectFortress/src/com/sun/fortress/` whole**, for `"MAX"`, `"MIN"`, `"MINMAX"`, `"MAXNUM"`, `"MINNUM"`: only the precedence table (`parser_util/precedence_resolver/PrecedenceMap.java:533`) and the compile path's literal folding (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:83-87`). Neither is on `walk`'s path, and neither is touched.

No competing declaration changes what the rung should do.

## 7. The record fragment (check 8)

**The ledger notes.**
- Rows 484, 442 and 430 exist (`explorations/fortress-gap-ledger.md`). The notes append and renumber nothing.
- Row 484's new status follows row 421's form.
- The row 430 note matches `probes/order/`: the base names each order in 4 of 8 runs for `XXXInheritedOverload`, and 6 against 2 for `XXXCoercionTupleOverloadRungC`; the edit gives 8 against 0 and 6 against 2.

**The FACTS line.** It is true as far as it goes, and a reader can check it. It sits under "Landed semantics" after "The one library's number tower is flat" (`FACTS.md:115`). Three things must change (required corrections 2 and 4):
- It presents `TotalComparison` as the model. It must present the team's `StandardTotalOrder` bodies and the team's per-type device.
- It must say that `MAXNUM` and `MINNUM` keep the tie.
- Row 484's closing note and the handover line must say the same about `MAXNUM` and `MINNUM`.

**The gather notes** (re-anchoring for rung T, Part IV, the risen distance rows) are accurate.

## 8. The count table and the distance (check 10)

**The count table.** `probes/checker-count-postedit.txt` equals the landed `explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt` line for line: `#total 75`, `#locations 62`, `#crash none`. REPORT.md, record.md and the structured report each declare 75, and `expectedCheckerCount: 75` agrees.

**The base has not moved under the table.** `git log d9c62446e..bce66f1fa -- Library/ ProjectFortress/` prints nothing, `d9c62446e` being the commit that landed the table.

**The distance.** I re-ran `sites-compare.py bce66f1fa` over the landed `distance-sites.tsv` and `probes/distance-sites-postedit.tsv`. Its output equals `probes/distance-sites-compare.txt`: 619 rows the same, 7 gone and 8 new. The gone and new rows are:
- four array-scalar `MIN`/`MAX` messages that now also list the new declarations;
- the export check and `^` at `FortressBuiltin.fss:327`, reordered;
- BR's `BIG MAXNUM`, `BIG //` and `BIG SQCAP`.

**What the table's class moves are.** `classify.py` hard-codes `TUPLECMP_FL = (4320, 4425)` and `ANYINTEGRAL_FL = (3886, 3966)` (`explorations/coordinator/tools/distance/classify.py:25`, `:32`), which the 16 inserted lines shift. So the table's I1, G1 and OT moves are the tool reading moved lines, and the one error left is BR's. FACTS records that family as moving between setups and under unrelated edits (the entry "The written bound `Object` on the three result-only parameters ...", `FACTS.md:76`).

**Are the bodies checked?** The checker's overloading pass lifts trait functional methods into an operator's set: the landed list pairs the array-scalar `MAX` with `StandardMax`'s and `StandardMinMax`'s (`distance-sites.tsv`, the `MAX` and `MIN` rows of kind `overloading`). So "checked" is supported by the stage's own rows. No error falls on an inserted line (`probes/new-lines-check.txt`).

## 9. The differential (my own programs)

I wrote 37 one-call programs the worker did not write (`probes/skeptic/make-programs.py`). Each ran under `walk` on the base sandbox and on the edit, with a private empty cache (`run-walk.sh`). The 24 whose setup the compiler prelude can express also ran through `fortress compile` then `fortress run` against the worktree's bytecode cache (`run-compiled.sh`). The whole table is `probes/skeptic/differential.txt`.

**The groups** (they are not in the worker's matrix, which uses only 3 and 4):
- the sibling operators `MAXNUM`/`MINNUM`;
- mixed calls with `QQ` and `RR64`;
- values above the signed range and beyond 64 bits;
- equal arguments at mixed widths;
- numerals beyond `ZZ32` and `ZZ64`;
- the family inside a generic function bounded by `StandardTotalOrder`, and inside `BIG MAX`/`BIG MIN`;
- a bare `NN64` print.

**Walk, base against edit:** 14 answers changed and 23 stayed the same.

*The 14 that changed.* Every one is a `MIN`, `MAX` or `MINMAX` call over integer types. It now answers with the same value, at the narrowest type both arguments coerce into:
- `u MAX z` for `u = unsigned(-1)` and `z = -1`: `4294967295 : QQ` becomes `4294967295 : ZZ64`, and `u MIN z` is `-1 : ZZ64`;
- `v MAX u` at `NN64` for 2^64−1 against 2^32−1: "Ambiguous coercion" becomes `18446744073709551615 : NN64`;
- `v MAX w` for a negative `ZZ64` `w`: `18446744073709551615 : ZZ`;
- `g MAX w` for a `ZZ` of 2^93 magnitude: `9903520300447984150353281023 : ZZ`;
- `w MAX z` with equal values: "Ambiguous coercion" becomes `3 : ZZ64`;
- `u MINMAX z` with equal values: `(3, 3) : (ZZ64, ZZ64)`;
- `z MAX 3000000000`: `ZZ64`, and `w MAX 100000000000000000000`: `ZZ`, since walk's numeral takes a width by magnitude.

*The 23 that stayed the same:*
- the `QQ` mixes (`QQ` answers);
- `z MAX 2.5` (`3.0 : RR64`);
- `ZZ64` or `NN32` against `RR64`, refused on both trees; `RR64` coerces only from `ZZ32` and numerals (`Specification/basic-lib/numbers.tex:43`), so the refusal is right;
- `NN32` with `NN32` and `NN64` with `NN64` in the unsigned order;
- the generic function (`7 : ZZ64`, `7 : NN32`, and `bigger[\ZZ64\](w, z)` = `7 : ZZ64`);
- `BIG MAX` and `BIG MIN`;
- the five `MAXNUM`/`MINNUM` refusals below.

**The sibling defect: `MAXNUM` and `MINNUM`.** These five calls stop with "Ambiguous coercion" on the base and still on the edit:
- `b MAXNUM 1` and `b MINNUM 1` for a `ZZ64`;
- `b MAXNUM 1` for a `ZZ`;
- `w MAXNUM z` for a `ZZ64` and a `ZZ32`;
- `v MAXNUM u` for an `NN64` and an `NN32`.

In each, the candidates are `Integral`'s `MAXNUM`, as `(Integral[\ZZ64\],ZZ64)->ZZ64` at `FortressLibrary.fss:662`, and `QQ`'s at `:630` (`walk-edit/MaxnumNumZZ64.txt`). The controls `b MAXNUM 1` for a `ZZ32` and `w MAXNUM y` for two `ZZ64`s answer.

In a second sandbox, `tmp/skfix`, I added only `ZZ64`'s own `MINNUM` and `MAXNUM` in `Integral`'s body form (`probes/skeptic/fix-diff.txt`). There the three `ZZ64` calls answer `3 : ZZ64`, `1 : ZZ64` and `4 : ZZ64` (`walk-fix/`). So the defect and its cure are row 484's, and the specification settles the answer as it does for `MAX`: `basic-integers.tex:265-266` and `:642-645`, with `conversions-coercions.tex:533-553` and the Meet Rule, `advanced/overloading.tex:224-235`.

Decision 2 names `MIN`, `MAX` and `MINMAX`, and an edit beyond the fifteen is a stop the record reserves for M. So this is home 2 in this batch: required correction 1, recommended row 1, and a point for Pavol.

**Walk on the edit against the compiled run (the prelude).** They agree on 12 programs, two of them by refusing on both paths: the control, `NN32`/`NN32`, `NN64`/`NN64`, `NN64`/`ZZ64`, `ZZ32`/`ZZ64`, `ZZ`/`ZZ64` both ways, the `ZZ64` numeral 3000000000, the two equal-value `ZZ64` calls, and both `RR64` refusals. They diverge on 12. Under rule 4:
- **`NN32` with `ZZ32`, answering `ZZ` compiled and `ZZ64` under walk** (`EdgeNN32ZZ32Max`, `EdgeNN32ZZ32Min`, `EqualNN32ZZ32Minmax`). The specification settles it for `walk` (`basic-integers.tex:25`). This is row 442's face, repaired at the switch-over, and gated by the rung's `XXXMaxNN32IntoZZ64RungM`. That is the fourth outcome, handled.
- **`z MAX 3000000000` for a `ZZ32`** dies compiled at run time with "Not in range for ZZ32: 3000000000", and **`w MAX 100000000000000000000`** with "Not in range for ZZ64". Walk answers at `ZZ64` and `ZZ`, which is what the numeral tie rule of the conversion judgement reads by magnitude (POSITIONS 2026-09-28, decision 1). The specification settles it against the compiled run (`Specification/basic/expressions/literals.tex:83-86`). It is row 325's defect, outside this rung's scope; recommended row 2 is a note on row 325.
- **`u MIN 3000000000` for an `NN32`** answers `3 : NN32` compiled and `3 : ZZ64` under walk. This is the numeral's type, rung Q's in run 2, as the record's section 3 says for M.
- **`NN64` values above the signed half print `-1` compiled** (`CEdgeNN64NN32Max`; `CPrintNN64` with no `MAX` at all). This is row 326, an existing row.
- **`z MAX 2.5` for a `ZZ32`** is refused compiled. This is row 442's `ZZ32`-into-`RR64` face, an existing row.
- **The three generic programs** are refused compiled, "Could not check call to operator MAX ... not applicable to an argument of type (T, T)". The prelude's `StandardTotalOrder` declares no `MIN`, `MAX` or `MINMAX` (`Library/CompilerAlgebra.fsi:16-22`), and `ZZ64`, `NN32` and `NN64` do not extend it (`CompilerBuiltin.fsi:147`, `:273`, `:332`). This is a prelude gap closed by the switch-over; recommended row 3 is a note on row 442.

**Threads.** One thread (`FORTRESS_THREADS=1`) for every run. The diff adds pure functional methods and touches no mutable variable, field, atomic block or library state.

## 10. The failure-mode question

The rung turns loud failures into computed values:
- 16 of the worker's matrix calls and 3 more of mine (`EdgeNN64NN32Max`, `EdgeZZZZ64Max`, `EqualZZ64ZZ32Max`) went from "Ambiguous coercion" to an answer;
- 25 of the matrix calls and 10 of mine went from a `QQ` answer to an integer-typed one.

The new value is the larger or smaller argument, or the ordered pair for `MINMAX`, at the narrowest type both arguments coerce into. I checked it against `basic-integers.tex:642-645` on:
- unsigned values above the signed half, where the unsigned order is kept;
- a `ZZ` beyond 64 bits;
- negative values;
- equal arguments.

Every value is the specification's, and no value changed, only types and refusals. The loud failure reported a defect of the library's overload set, not a mistake in the program, so nothing a user could have learned from it is lost.

One quiet effect remains: a result that was a `QQ` is now an integer. Code that went on to use it as a rational now meets integer operators instead. Over the 429 interpreter tests no output changed for that reason (`probes/passes/compare-normalised.txt`).

## 11. Ledger, sibling sites and decisions (checks 11 and 12)

**Ledger rows bearing on the rung.** I searched with my own terms (`MAXNUM`, `MINNUM`, `Not in range`, `NN64` rendering, `StandardTotalOrder`, `CompilerAlgebra`):
- 484, 421 and 472 (the family's library slips);
- 430 (the ambiguity message's order);
- 442 (the prelude's conversions);
- 325 (numerals out of range, compiled);
- 326 (signed rendering, compiled);
- 391 (the compiled checker picks one of two coercion candidates).

None changes what this rung should do. No row covers `MAXNUM`/`MINNUM` on the integer types (rows 399 and 440 mention them for `BIG` operators and `QQ`'s `0/0`).

**Sibling sites.**
- The widths are all covered for the family.
- The other path is the compiler prelude, which already declares the three per type.
- The one sibling left is `MAXNUM`/`MINNUM` (section 9).

**Decisions.** The landed text matches each decision in scope and words:
- decision 2 of the conversion judgement (POSITIONS 2026-09-28): the fifteen, on the five types, in the compiler library's api form;
- the library's practice (2026-09-19) and the library route (2026-09-21): the one library is edited, the compiler library is not;
- answer 8 (2026-09-26): the mixed-width answers are the narrowest common type;
- the stops (2026-09-27).

No landed text contradicts a decision. The FACTS line's "the family" must not be read as covering `MAXNUM`/`MINNUM`, which the specification groups with `MAX` and `MIN` (required correction 4).

**The comparison's changed outputs.** The 19 changed files are the 17 files that vary on their own and row 430's two (`probes/passes/compare-normalised.txt`). The base names both orders from run to run (`probes/order/order-repeat-base-*.txt`), so by POSITIONS 2026-09-26, rung D's stop, these are row 430's and not a stop.

**The microGPT checks.** Both print 40 of 40 on the base and the edit, with identical printed values (`probes/mg/mg-compare.txt`).

**A possible overlap in the order repeats.** The worker checked the four library files out at the base inside the worktree at 02:25:46 UTC. The microGPT edit runs, started at 02:11:54 and 02:11:55, lasted 771 s and 789 s, so both ended by 02:25:04, before the checkout. Their values are the edit's.

## 12. Required corrections, recommended rows, points for Pavol

**Required corrections** (the commit stage must close each, even on this approval):

1. **Home 2 for `MAXNUM` and `MINNUM` on the integer types**, owed in this batch. Add an expected-failure walk test in `ProjectFortress/tests/`, for instance `XXXIntegerMaxNumRungM.fss`, with at most one comment line.
   - It asserts, in `IntegerMinMaxRungM.fss`'s form, what the specification gives:
     - `b MAXNUM 1` is `3 : ZZ64` and `b MINNUM 1` is `1 : ZZ64` for a `ZZ64` `b`;
     - `g MAXNUM 1` is `3 : ZZ` for a `ZZ` `g`;
     - `w MAXNUM z` is `4 : ZZ64` for a `ZZ64` and a `ZZ32`;
     - `v MAXNUM u` is `4 : NN64` for an `NN64` and an `NN32`.
   - Each message cites the new ledger row with `basic-integers.tex:265` or `:266` and `:642-645`, and `conversions-coercions.tex:533-553`.
   - Capture it failing under `walk` on the tree, and as an expected failure through `harness-one.sh`.
   - It is the rung's first `XXX` file in `tests/`, so show it going red on a deliberate local fix that is never committed: the five types' own `MINNUM`/`MAXNUM` in a sandbox, as `probes/skeptic/walk-fix/` does for `ZZ64` (FileTests.java:853's warning).
   - Commit every capture as `.txt`.
2. **REPORT.md section 3 and the FACTS line: the precedents' provenance.**
   - `TotalComparison`'s `MIN`, `MAX` and `MINMAX` were added by climb batch 7 rung H (`952892a00`, 2026-09-28), not by the team.
   - `RR64`'s, `Float`'s and `RR32`'s are the team's device, declared at `Number` in `5a68404fd` and retyped by `d846e3644`.
   - Replace "All of these are already present at ... `5a68404fd` ... so they are the team's" with the list the blame gives (section 4).
   - Make the team's `StandardTotalOrder` bodies (`FortressLibrary.fss:285-288`), `QQ` (`:582-587`) and the compiler library the precedent followed, with `TotalComparison` named as the revival's restatement of the same bodies.
3. **The provenance block's deviation line.** It must say that the specification's `ZZ` lists `MAX`, `MIN`, `MAXNUM` and `MINNUM` and no `MINMAX` (`Specification/basic-lib/basic-integers.tex:263-266`), not "only `MAX` and `MIN`". Widen section 3's draft citation to `Library/incomplete/basic/Fortress.Number.fsi:144-147`.
4. **The site count and the record lines must name the sibling that is left.** Update each of:
   - REPORT.md sections 3 and 10: add `Integral`'s `MINNUM` and `MAXNUM` (`Library/FortressLibrary.fss:661-662`, api `.fsi:470-471`), inherited by the five types, which keep row 484's tie with `QQ`'s (`:628-631`). Cite the five refusals, before and after (`probes/skeptic/differential.txt`), and their home (correction 1).
   - The FACTS line: add one sentence that `MAXNUM` and `MINNUM` still stop with "Ambiguous coercion".
   - Row 484's closing note: point to the new row.
   - The handover line: say row 484 is closed for `MIN`, `MAX` and `MINMAX` only.

**Recommended rows** (the gather opens or refuses each):

1. A new row. Claim: under `walk`, `MAXNUM` and `MINNUM` over the integer types stop with "Ambiguous coercion" once a conversion is needed:
   - `b MAXNUM 1` and `b MINNUM 1` for a `ZZ64`, `b MAXNUM 1` for a `ZZ`, `w MAXNUM z` for a `ZZ64` and a `ZZ32`, and `v MAXNUM u` for an `NN64` and an `NN32`;
   - the candidates are `Integral`'s `MAXNUM`/`MINNUM` at `(Integral[\ZZ64\], ZZ64)` (`Library/FortressLibrary.fss:661-662`) and `QQ`'s (`:628-631`), incomparable for the reason row 484 gives.

   The rest of the row:
   - status NEGATIVE-VERIFIED;
   - class: library gap, as row 484;
   - spec: `Specification/basic-lib/basic-integers.tex:265-266` with `:637-645`, `Specification/basic/conversions-coercions.tex:533-553`, and `Specification/advanced/overloading.tex:224-235`;
   - reproducer: `compile-ladder/rung-integer-minmax/probes/skeptic/walk/Maxnum*.fss` and `MinnumNumZZ64.fss`, with `walk-base/` and `walk-edit/`;
   - repair: the same device, each integer type's own `MINNUM` and `MAXNUM` (`walk-fix/`, `fix-diff.txt`);
   - home 2: required correction 1.
2. A note on row 325:
   - Through `MAX` on the compile path, `z MAX 3000000000` for a `ZZ32` compiles and dies at run time with "Not in range for ZZ32: 3000000000". So does `w MAX 100000000000000000000` for a `ZZ64`, with "Not in range for ZZ64". The checker takes the narrower type's `MAX` and converts the numeral into it.
   - `walk` answers `3000000000 : ZZ64` and `100000000000000000000 : ZZ`, which the numeral tie rule of the conversion judgement also gives (POSITIONS 2026-09-28, decision 1).
   - Probes: `compile-ladder/rung-integer-minmax/probes/skeptic/compiled-out/CNumeralBigZZ32.txt`, `CNumeralHugeZZ64.txt`, and `walk-edit/NumeralBigZZ32.txt`, `NumeralHugeZZ64.txt`.
3. A note on row 442 (or a new row):
   - The prelude's `StandardTotalOrder` (`Library/CompilerAlgebra.fsi:16-22`) declares no `MIN`, `MAX` or `MINMAX`, and `ZZ64`, `NN32` and `NN64` do not extend it (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:147`, `:273`, `:332`).
   - So `bigger[\T extends StandardTotalOrder[\T\]\](a: T, c: T): T = a MAX c` is refused on the compile path, with "Could not check call to operator MAX ... not applicable to an argument of type (T, T)". `walk` answers `7 : ZZ64` and `7 : NN32`.
   - Probes: `compile-ladder/rung-integer-minmax/probes/skeptic/compiled-out/CGeneric*.txt` and `walk-edit/Generic*.txt`.
   - Closed by the switch-over. Its gated home, as row 442's other faces have, would be an `XXX` `compile` test with `compile_err_contains=Could not check call to operator MAX`.

**For Pavol:**

1. **Whether the integer types get their own `MAXNUM` and `MINNUM`, and in which batch.** Decision 2 names `MIN`, `MAX` and `MINMAX` (POSITIONS 2026-09-28, the two decisions of the conversion judgement). But:
   - the specification's `ZZ` declares `MAXNUM` and `MINNUM` beside them (`Specification/basic-lib/basic-integers.tex:263-266`, `:637-645`), and so does the team's draft (`Library/incomplete/basic/Fortress.Number.fsi:144-147`);
   - under `walk` they keep row 484's tie (`probes/skeptic/differential.txt`), and the same device repairs it (`probes/skeptic/walk-fix/`).

   Ten declarations would complete it. Rung Q in run 2 meets `b MAXNUM 1` once numerals switch, and batch 7b's rung L owns the neighbouring generic headers.

## 13. What I wrote

Everything is under `explorations/compile-ladder/rung-integer-minmax/probes/skeptic/`:
- **The programs:** `make-programs.py`, `list.txt`, and the programs in `walk/` and `compiled/`.
- **The runners:** `run-walk.sh` (trees `base`, `edit`, `fix`), `run-compiled.sh` and `summarise.sh`.
- **The captures:** `walk-base/`, `walk-edit/`, `walk-fix/` and `compiled-out/`; `differential.txt`, `fix-diff.txt` and `df-before-walk.txt`; `rerun-IntegerMinMaxRungM-base.txt`, `rerun-IntegerMinMaxRungM-walk.txt` and `rerun-xxx-compiled.txt`.

The sandboxes `tmp/skbase` and `tmp/skfix` are under the ignored `tmp/` and were deleted after the runs. I did not touch the worker's source changes, and I ran neither `ant testFast` nor `ant testSystem`.
