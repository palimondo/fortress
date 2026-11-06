# c32: questions for the prober

All runs under walk, from the main tree, with the APL rungs' source path (the evidence's runs of 44 and 223 died on `Could not find an implementation for API AplCore`, because the run used the default path; `explorations/apl/rung-1/Rung1.fss:9-11` gives this one):

    cd explorations/apl/rung-1 && FORTRESS_SOURCE_PATH=".:$PWD/../base:$PWD/../../../ProjectFortress/LibraryBuiltin:$PWD/../../../Library:$PWD/../../../ProjectFortress/test_library" ../../../bin/fortress FILE

## Row 44: does SUM still refuse a generator of RR64 arrays?

At the base `opr SUM` is `[\T extends AdditiveGroup[\T\]\]` with no `cast[\Number\]` (`Library/FortressLibrary.fss:3455-3459`, since d846e3644), and `Vector` extends `AdditiveGroup[\Vector[\T,s0\]\]` (`Library/FortressLibrary.fsi:1645-1646`). So the row's "sealed by `T extends Number` and `cast[\Number\]`" is false; what remains open is whether `SUM` over a generator of `Array[\RR64,ZZ32\]` still fails.

- Program: `explorations/apl/rung-1/r14_nested.fss`, whole, with FILE = `r14_nested.fss`, walk.
- Outcomes:
  - it prints a summed vector after `SUM over the cells:` → row 44 is fixed by d846e3644: its close needs a gated test that asserts a `SUM` of RR64 arrays (none exists; r14_nested.fss asserts nothing), so the prober or a worker writes it, then `ledger.py close 44` names d846e3644 and that test.
  - `CastError` → the claim stands but its mechanism is new: rewrite the notes from the trace.
  - a dispatch failure (`Failed to find any matching overload` / bound failure on `T`) → rewrite: "SUM reduces only an `AdditiveGroup`; a plain `Array[\RR64,ZZ32\]` is not one, only a `Vector` is", reproducer r14_nested.fss.

## Row 216: do `,`, `|` and prefix `,` still refuse a declaration?

The row's reproducer `r04_glyphs.fss` prints only the half that works (the evidence's run: twenty arities, exit 0). The failing half rests on probes that the evidence did not run.

- Programs: `explorations/apl/rung-1/r05a_comma.fss`, `r05e_ravel.fss`, `r05c_bar.fss`, each whole, walk, default path (`cd explorations/apl/rung-1 && ../../../bin/fortress FILE`; they import no APL library).
- Outcomes: `r05a` and `r05e` `Syntax Error` at `:6:5`, and `r05c` refuses the prefix `|` → rewrite with reproducer `explorations/apl/rung-1/r05a_comma.fss` (the `⌈ ⌊` half stays with row 280, whose reproducer r05b_ceil.fss the evidence ran: `Unmatched delimiter "|/"`). Any of them now loads → rewrite the claim to drop that glyph.

## Row 219: is a Char array beside an RR64 vector in one overload family still refused?

The evidence's run of `r07_edge.fss` passes walk's load (it prints `zilde: |e| = 0   tally = 0.0` and `tally(2.5) = 1.0`) and then dies at `r07_edge.fss:9:54-76`, `Unification error: ... fill param 1 (v:RR64) got arg FnExpr ... ZZ32->RR64`, before `tally(c)`. So walk no longer refuses the family at load, and the program does not reach the call that would show what dispatch does.

- Program (a probe for the prober; the main tree is not changed): r07_edge.fss with `.fill(f)` on line 9 and `.fill(fn ...)` on line 10 replaced by `.tabulate(...)`, the function form (`Library/FortressLibrary.fss` builds `tabulatedArray3` with `.tabulate(f)`), walk, default path; then the same program under `bin/fortress compile`.
- Outcomes:
  - walk prints `tally(c) = 5.0` → walk accepts the family; if compile refuses it with the excluding-types or Meet Rule message, rewrite to "(checker)" with that message; if compile also accepts, close row 219 at the commit that changed walk's rule (candidate 5262a2412, "names the overloading rule"; the prober confirms by bisect) with a test to be written.
  - walk refuses at load with `fails the Meet Rule` → the probe differs from the evidence run; rewrite with the new message (batch 18's refused note: "`r07_edge.fss` now 'fails the Meet Rule'").
- The `fill(f)` failure itself (a function given to `fill`, which takes a value) is a probe bug or a separate row: the prober says which.

## Row 223: does a computed left argument of `⍴` still fail to parse?

- Program: `explorations/apl/rung-1/r15_runtimerank.fss`, whole, FILE = `r15_runtimerank.fss`, walk, with the source path above.
- Outcomes: `Error occurred while instantiating and executing a temporary parser: … (r15_runtimerank.fss:12:46: Syntax Error)` or another column of line 12 → keep (a column change needs no new line); it parses and prints → close is not owed (the rung's choice); rewrite the claim as the grammar now stands.

## XXX tests believed to pass now

None.
