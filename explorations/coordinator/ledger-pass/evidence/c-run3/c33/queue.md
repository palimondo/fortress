# Queue items from chunk c33, run c-run3

- **Row 30, held: does `SUM` over a user `Number` whose `+` is top-level still fall back silently to a library overload, since the flat number tower (P-43)?** No prober ran this pass's question. The row's `6.0` came from a library `+` that P-43's `Number` without catch-all operators may have removed, and its probe `g10.fss` (from `e879b6a44^`) has not run since. Outcomes: `6.0` keeps the row with the probe pinned; `W(6.0)` closes it or makes it POSITIVE-VERIFIED beside rows 31 and 215; a dispatch error drops "silently falls back"; a refusal at load naming `W` or `Number` (the check's correction to the question): the notes take the refusal's text, reproducer `none`, the status kept, and the claim marked unmeasured since P-43.
   - Landed: the row's present line (`tmp/ledger-pass/c-run3/c33/evidence/30.md`, the guard's line, sha ce311ee19e6d07be). Default: the row's present line.
   - The other way: run the question's program, then rewrite the row to the measured behaviour, or close it against the commit that changed it.
   - Its cost: one walk run of a 15-line probe on a cold private caches folder, under a few minutes of a prober's time.
   - Home: `tmp/ledger-pass/c-run3/c33/questions.md`, `assessment.md` and `check.md`, row 30; row 30.
   - Needed by: the ledger's repair; the next prober run of the pass.
- **Row 145, held: does a bare `false AND bump()` still run `bump` once under walk, and the thunk form zero times?** No prober ran this pass's question. The reproducer `explorations/apl/rung-3/t03_and.fss` exits 255 as the evidence ran it, without `explorations/apl/base` on `FORTRESS_SOURCE_PATH`; the pin `FortressLibrary.fsi:2607-2609` now points at a doc comment (the declarations are at `:2649` and `:2651`), and the APL `⍋` sentence is story. Each outcome's line is laid out in the questions file.
   - Landed: the row's present line (`tmp/ledger-pass/c-run3/c33/evidence/145.md`, the guard's line, sha a2215690374ccbcc). Default: the row's present line.
   - The other way: run the question's program, then rewrite the row to the measured behaviour, or close it against the commit that changed it.
   - Its cost: one walk run with `rung-3/REPORT.md`'s command, under a few minutes of a prober's time.
   - Home: `tmp/ledger-pass/c-run3/c33/questions.md`, `assessment.md` and `check.md`, row 145; row 145.
   - Needed by: the ledger's repair; the next prober run of the pass.
- **Row 164, held: does an untyped lambda still take the first declared of two overloads that differ only in a function parameter's arrow type?** No prober ran this pass's question. Walk's dispatch changed much since run-c3; the probe `G158.fss` (from `a0a0c7c99^`) has not run since; no site is pinned.
   - Landed: the row's present line (`tmp/ledger-pass/c-run3/c33/evidence/164.md`, the guard's line, sha 15cd8146e3e57da7). Default: the row's present line.
   - The other way: run the question's program, then rewrite the row to the measured behaviour, or close it against the commit that changed it.
   - Its cost: one walk run of a 15-line probe, under a few minutes of a prober's time.
   - Home: `tmp/ledger-pass/c-run3/c33/questions.md`, `assessment.md` and `check.md`, row 164; row 164.
   - Needed by: the ledger's repair; the next prober run of the pass.
- **Row 240, held: does an overloaded function whose declared result is `Any` still fail every call under walk?** No prober ran this pass's question. Its neighbour row 157 is FIXED and walk's overload code changed since; the probe `a01_any_result.fss` (from `e879b6a44^`) has not run since. Row 258's sentence "`Any` as the result kills the family's dispatch (row 240)", applied in this chunk, waits on the answer.
   - Landed: the row's present line (`tmp/ledger-pass/c-run3/c33/evidence/240.md`, the guard's line, sha 664a06231f9383f0). Default: the row's present line.
   - The other way: run the question's program, then rewrite the row to the measured behaviour, or close it against the commit that changed it.
   - Its cost: one walk run of a 20-line probe, under a few minutes of a prober's time.
   - Home: `tmp/ledger-pass/c-run3/c33/questions.md`, `assessment.md` and `check.md`, row 240; row 240.
   - Needed by: the ledger's repair; the next prober run of the pass.
- **Row 297, held: is the `^T` pair over `Matrix[\RR64,r,c\]` and the plain `Array[\RR64,(ZZ32,ZZ32,ZZ32)\]` still refused at load, and is the refusal row 416's?** No prober ran this pass's question. Walk's load check of generic pairs was rewritten after the row (`6d187d069`, `14e91723f`, `c41c3d2b0`); the probes import the gone `FlatArrays2`. The diagnosis "`Array[\E,I\]` carries no `Rank`" omits that `Matrix` extends a rank-2 instantiation of `Array` (`FortressLibrary.fsi:1553-1554`, `:1715-1717`, `:1757-1758`), which excludes the rank-3 one: the pair 297/416 of `pairs.txt` is held with this row, not put in `final.pairs`. The questions file has a self-contained program.
   - Landed: the row's present line (`tmp/ledger-pass/c-run3/c33/evidence/297.md`, the guard's line, sha 99d4a7a3c5eda43b). Default: the row's present line.
   - The other way: run the question's program, then rewrite the row to the measured behaviour, or close it against the commit that changed it.
   - Its cost: one walk run of a 12-line probe, under a few minutes of a prober's time.
   - Home: `tmp/ledger-pass/c-run3/c33/questions.md`, `assessment.md` and `check.md`, row 297; row 297.
   - Needed by: the ledger's repair; the next prober run of the pass.
- **Row 444, held: does walk still accept and dispatch a dotted method's overloading across inheritance that the Meet Rule refuses, plain and with a size parameter?** No prober ran this pass's question. Walk's load check changed after the row (`6d187d069`, `14e91723f`, `c41c3d2b0`), and the size-arm variant is generic; the probes `Sk2InheritedPlain.fss` and `Sk2Inherited.fss` (from `ab067d9b6^`) have not run since. Its sentence "Diamond: `XXXDottedMethodMeetInheritedWalk` (batch 12 W's skeptic)" names row 735's shape, and row 735, applied here, now takes that test as its reproducer; the rewrite after the measure drops the sentence.
   - Landed: the row's present line (`tmp/ledger-pass/c-run3/c33/evidence/444.md`, the guard's line, sha 6707c5acf766b045). Default: the row's present line.
   - The other way: run the question's program, then rewrite the row to the measured behaviour, or close it against the commit that changed it.
   - Its cost: two walk runs of 15-line probes, under a few minutes of a prober's time.
   - Home: `tmp/ledger-pass/c-run3/c33/questions.md`, `assessment.md` and `check.md`, row 444; row 444.
   - Needed by: the ledger's repair; the next prober run of the pass.

No `XXX` test is believed to pass: `XXXDottedMethodMeetInheritedWalk` is green as an expected failure under gate `a12ab5c60`.
