# Check, chunk r1 (reconcile run, base aa6e4ebee)

mech.md: 4 lines, 0 failing; apply and `ledger.py check` (with and without `--base aa6e4ebee`) exit 0. No closes, no duplicates, no pairs, no questions to measure.

## Row 349 (rewrite): FAIL (cold read)

Fidelity passes: at the base `Library/FortressLibrary.fsi:645-646` is `trait ZZ64`'s `narrow`/`widen` and `:698-699` `trait ZZ`'s; `CompilerBuiltin.fsi:103-145` (`trait ZZ`) has neither, `:147-208` (`trait ZZ64`) has `narrow` only (`:206`); `CompilerBuiltin.fss:580` is `coerce(x: ZZ32) = jIntToLong(x)`. P-161 is in POSITIONS.md:92 and `FortressLibrary.fsi:698-699` still holds `ZZ`'s two, so "not yet landed" holds. Nothing lost: the old line's "not landed at de6d905f5" keeps its pin on the walk citations. Present, form, status (NEGATIVE-VERIFIED) pass. Reproducer `XXXZZNarrowRungP` asserts `narrow` of a `ZZ` (compile_err_contains "Could not check call to function narrow").

Failure, cold read: passage "P-161 (not yet landed) deletes `ZZ`'s `narrow` and `widen`, which closes the `narrow` half; the `widen` half closes at the switch-over with row 442, its probe ...". The reader could not tell which library P-161 deletes from (the claim says the prelude's `ZZ` already lacks both), nor whether `XXXZZNarrowRungP` asserts an answer P-161 makes wrong, nor which test holds the `widen` half ("its probe" read as row 442's). Source: POSITIONS.md:92 (P-161 deletes `ZZ`'s `narrow` and `widen` from the one library and moves the test `XXXZZNarrowRungP` onto `.asZZ32`/`.asZZ64`); `git show ab067d9b6^:explorations/compile-ladder/rung-int-conversions/probes/skeptic/SK3Tower.fss` prints `narrow` of a `ZZ32` and `widen` of a `ZZ64`; no compiled test names `widen` of a `ZZ64` for this row. Correction: replace that passage with
"P-161 (not landed) deletes walk's `ZZ` `narrow`/`widen`, moving its test off them: the `narrow` half closes. The untested `widen` half (probe `explorations/compile-ladder/rung-int-conversions/probes/skeptic/SK3Tower.fss`, parent of ab067d9b6) closes at the switch-over. full text: history, row 349"
(notes 696 of 700, row 1157 of 1,200; "row 442" stays in `siblings:`).

## Row 71 (rewrite): FAIL (reproducer, cold read)

Fidelity passes: `Library/CovariantCollection.fsi:19,25` (`ImmutableArray`), `:26,27` (`Array`), `:53` (`MonoidReduction`), `:61` (`Comprehension`) and `Library/List.fsi:69,70,116,119,126,137` read as cited; no prelude file (`CompilerBuiltin.fsi`, `CompilerLibrary.fsi`, `CompilerAlgebra.fsi`) declares any of the eight; `CompilerLibrary.fsi:272` `HasRank`, `:221` `Maybe`. Nothing lost: `List.fsi` is now spelled `Library/List.fsi`. Present, form, status pass; `siblings: 288` matches 288's own `siblings: 71`.

Failure: passage "(12 errors, rc=255, `tests/ListTest.fss` at `cc47b637d`)". The reproducer is `none` but the notes give no command, and `tests/` has no root; the cold reader had to infer both. Source: the file is `ProjectFortress/tests/ListTest.fss` at the base (line 13 `import List.{...}`). Correction: replace "`tests/ListTest.fss` at `cc47b637d`" with "`bin/fortress compile ProjectFortress/tests/ListTest.fss` at `cc47b637d`" (notes 663 of 700, row 1086).

## Row 442 (rewrite): pass

At the base `CompilerBuiltin.fsi` has no `/` on `ZZ32` (only `RR64`'s at `:448`), no `^` on `ZZ64`, `GCD`/`LCM`/`LSHIFT`/`RSHIFT` only on `ZZ64` (`:178-179`, `:196-197`) and `ZZ32` (`:241-242`, `:259-260`), no `check`/`check_star`, no `asFloat` anywhere, `asRR64` only on `ZZ32`, `NN32` (and the literals); `RR64` coerces from `FloatLiteral`, `RR32` (`:434-435`), `ZZ64` from `IntLiteral`, `ZZ32` (`:148-149`); `CompilerAlgebra.fsi:16-22` has no `MIN`/`MAX`; `ZZ64`, `NN32`, `NN64` do not extend `StandardTotalOrder` (`ZZ32` does, `:210`). Dropped "`narrow` on `ZZ`" and `XXXZZNarrowRungP`: home in row 349 (claim and reproducer). `XXXInferPromoteNN32` asserts `pick(z, u)` is `ZZ64,ZZ64`. The refused batch-21 note is kept by `climb-batch-21/RECORD.md:176`, as the claim already holds `asFloat`. Cold read items ("revised number chapters", `check`/`check_star`, "promotion") are resolved by POSITIONS P-80 and FACTS 194/254; a worker would not be blocked. The reader's "the `widen` of `ZZ64` that 349 hands to this row" goes once row 349's correction drops "with row 442".

## Row 732 (rewrite): pass

`CodeGen.java:968` is `if (!fnl.body().isSome()) {` in `dumpMethodChaining` (`:915`), `:934-940` seeds `alreadyIncluded` from the first extended trait; unchanged since c124c6b65. The two reworded clauses keep their meaning; nothing lost; `siblings: 733` matches 733. Reproducer `none`: the notes give the probe program and its output inline (no command line, as in the old line); the cold read reproduced it from them. Minor, not a failure: the implementing component of `Q1ApiB` is unnamed.

## Row 733 (keep): pass

`CodeGen.java:1009` holds `typeAnalyzer.equiv(alreadyType,tupTrait)`, unchanged since pin c124c6b65; no commit or signal since; names 732.

## Row 288 (keep): pass

Citations unchanged since pin c124c6b65 (`FortressSyntax.fsi:14`, `FortressAst.fsi:6`, `WellKnownNames.java:116-129`, `GraphRepository.java:815-823`, `PhaseOrder.java:137-147`); no commit or signal since; NEGATIVE-VERIFIED beside `silent` keeps its status (item 265), listed in silent.txt.
