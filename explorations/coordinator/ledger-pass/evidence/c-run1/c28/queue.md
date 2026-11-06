# Queue items from chunk c28, run c-run1

- **Row 24, held: what a `T^n` parameter accepts under walk.** The row says `T^n` denotes the Number-only library `Vector`/`Matrix`; walk builds its own `FTypeMatrix` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:594-601`) and the checker desugars only `T^(n BY m)` (`compiler/typechecker/TypeNormalizer.java:144-160`). Its probe is gone; no prober ran it in this pass.
   - Landed: the row's present line (`tmp/ledger-pass/c-run1/c28/evidence/24.md`, the guard's line, sha 6736632a66b8f8cf). Default: the row's present line.
   - The other way: run `tmp/ledger-pass/c-run1/c28/questions.md`, "Row 24", with the check's corrections (`bin/fortress walk tmp/T24.fss`; if both are accepted, `bin/fortress compile tmp/T24.fss` decides close or a compiled-only claim), then rewrite or close per the outcome.
   - Its cost: one walk run, perhaps one compile, of a 12-line probe; minutes.
   - Home: `tmp/ledger-pass/c-run1/c28/questions.md`, `assessment.md`, `check.md`, row 24.
   - Needed by: the ledger's repair; the next prober run of the pass.
- **Row 53, held: which vector and matrix operations run on a user ring element under the bound `{ Number, MultiplicativeRing[\T\] }`.** The row predates the bound (F-151, `Library/FortressLibrary.fsi:1645`, `:1757`) and says `dot` dies at `cast[\Number\]`, where `dot` is now `SUM[\T\]` (`Library/FortressLibrary.fss:2555-2556`). No prober ran it.
   - Landed: the row's present line (`tmp/ledger-pass/c-run1/c28/evidence/53.md`, the guard's line, sha 0f9d721e639603a0). Default: the row's present line.
   - The other way: run `tmp/ledger-pass/c-run1/c28/questions.md`, "Row 53" (passed the check), and rewrite or close per its outcomes.
   - Its cost: one walk run of a short probe; minutes.
   - Home: `tmp/ledger-pass/c-run1/c28/questions.md`, `assessment.md`, `check.md`, row 53.
   - Needed by: the ledger's repair; the next prober run of the pass.
- **Row 254, held: does a mismatched `DOT` on runtime-built matrices still escape `catch`?** The reproducer `explorations/apl/rung-6/w01_dot.fss` stops at load ("Could not find an implementation for API AplCore", `tmp/ledger-pass/c-run1/run/repro/254.txt`), its mismatch case is a comment, and the cited outputs are gone. No prober ran it.
   - Landed: the row's present line (`tmp/ledger-pass/c-run1/c28/evidence/254.md`, the guard's line, sha 6246993f22374b43). Default: the row's present line.
   - The other way: run `tmp/ledger-pass/c-run1/c28/questions.md`, "Row 254", with the check's correction (build `m` and `n` as `array[\RR64\](r, c).fill(1.0)` at `r: ZZ32 = 2`, `c: ZZ32 = 3`), then rewrite with reproducer `none` or close per the outcomes.
   - Its cost: one walk run of a 15-line probe; minutes.
   - Home: `tmp/ledger-pass/c-run1/c28/questions.md`, `assessment.md`, `check.md`, row 254.
   - Needed by: the ledger's repair; the next prober run of the pass.
