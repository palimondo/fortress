# Quiz answers, reader 1

## 33 (a) `inf: RR64 = 10^400` inside `run()`

**Decision.** The binding is refused on both paths. I do not write it.

- `10^400` is an expression of numerals alone, with an exponent below 4096, so it folds before the checker into one exact constant, 10^400. That constant then converts at `RR64` as a numeral does. It rounds to an infinity there, so it is refused.
- Compiled path: it does not compile. The checker refuses it statically.
- Walk: it loads, and stops when the binding runs (when `run()` reaches it), with 'Type mismatch binding' and the numeral.

**How the test gets the infinity.** From run-time arithmetic on a variable operand, which does not fold:

    m: RR64 = 10^200
    inf: RR64 = m m

`10^200` folds to an exact constant that converts into `RR64` with one rounding and is finite, so the first binding is valid. `m m` is a run-time `RR64` product that overflows. A division by a variable zero, `z: RR64 = 0.0`, then `1.0 / z`, is the other candidate (the fold also leaves a literal division by zero alone, but a variable operand is the documented form for a test of run-time arithmetic).

I have no passage that says a run-time `RR64` overflow or a float division by zero gives `Infinity` and no exception (only integer overflow and integer `DIV`/`REM`/`MOD` by zero are stated to raise). So I run the two lines once under walk through the harness before I rely on them, and assert in the test that `inf` is what I expect (for example `assert(inf > m, "inf")` and `assert(inf = inf + 1.0, ...)`).

**Path and scope.** Both paths, before and after the switch-over: the fold and the numeral conversion run before the checker on both. The test is a walk test in `ProjectFortress/tests/`, so walk's behaviour is what it meets. One stale-looking sentence: `references/interpreter.md` still lists, as a departure of walk, "A numeral that rounds to an infinity at `RR32` or `RR64` gives `Infinity`, with no error (ledger row 967)". A sentence that cites a ledger row states a departure that a fix can change, and must not be asserted as correct, so even on a tree where walk still gave `Infinity` I would not build the test on `10^400`.

**Passages relied on.**

- Orientation, "Numbers", "A numeral converts where it stands (P-173)": "At a number type, the numeral converts from its exact value: exactly into the five integer types and `QQ`, and with one rounding into `RR64` and `RR32` (P-76, P-172). ... A numeral outside the type's range, or that rounds to an infinity there, is refused: by the checker statically, by walk when the binding runs, with 'Type mismatch binding' and the numeral."
- Orientation, "Numbers", "An expression of numerals alone folds exactly before the checker, on both paths (P-173)": "The fold covers the arithmetic operators, `^` up to the exponent 4096 ... It leaves alone ... a division by zero ... Any other result is one exact constant, which converts as a numeral does at one of the eight number types, or takes its default. ... A test of run-time arithmetic or concatenation needs a variable operand".
- Orientation, preamble: "A sentence that cites a ledger row states a known departure of one path from a bold rule. A fix can change it, so do not assert it as correct in a test."
- `references/interpreter.md`, "How walk evaluates a program": the row 967 line quoted above, and "A test of one of these cases asserts the rules' answer, as an `XXX` test".
- `references/tests-writing.md`, "A test program": "A test of run-time arithmetic or concatenation needs a variable operand, not a literal".

## 33 (b) `wide: RR32 = 340282356779733661637539395458142568448` at the top level now stops at load

**Conclusion.** Today's tree is right, and my test was wrong. No regression, no new defect, nothing to explore or to add to the ledger.

- The numeral rounds to an infinity at `RR32`, so the rule refuses it. The `Infinity` that the test printed a week ago was walk's known departure from the rule (ledger row 967). A fix of that row has landed since. My test relied on the departure, which the rules say not to assert as correct.
- It stops "at load" and not inside `run()` because the binding is at the top level: walk refuses when the binding runs, and a top-level variable is initialised at load.
- I check the claim against the record before I act: the row 967 query of the gap ledger (`references/records.md`), to see that the row is closed by a fix, and I reproduce the stop once through the harness (`harness-one.sh`) on today's tree.

**What I do with the test.** I do not restore the old output and I do not make it an `XXX` test (the tree gives the rule's answer). I turn it into a test of the refusal, which is the rule:

- add `ProjectFortress/tests/<Name>.test` beside `<Name>.fss`, with `load_exception_contains=Type mismatch binding`. A plain test with that key is green if walk refuses the program at load as named, and "A failure while the top-level variables are initialised counts as a refusal";
- see it green through the harness;
- if another gated test already covers this refusal (the fix of row 967 should have promoted or written one; the row's reproducer names it), delete mine instead of keeping a duplicate;
- if the test's real purpose was to have an `RR32` infinity in hand, get it as in (a), from run-time arithmetic on a variable operand, and assert its value with `assert`, not by printing.

I say in my report that the test changed, with its before and after, and that it had asserted a departure.

**Path and scope.** Walk, today's tree, before and after the switch-over. On the compiled path the same binding is refused statically by the checker, so the program would not compile there either.

**Passages relied on.**

- Orientation, "Numbers", "A numeral converts where it stands (P-173)": "A numeral outside the type's range, or that rounds to an infinity there, is refused: by the checker statically, by walk when the binding runs, with 'Type mismatch binding' and the numeral."
- Orientation, preamble: "A sentence that cites a ledger row states a known departure of one path from a bold rule. A fix can change it, so do not assert it as correct in a test." and "An old note, a team test and your training can be right about the team's walk and wrong here".
- `references/interpreter.md`, "How walk evaluates a program": "Walk departs from the rules of `revival-changes.md`, "Numbers", in these ways, until each fix lands. ... A numeral that rounds to an infinity at `RR32` or `RR64` gives `Infinity`, with no error (ledger row 967)."
- `references/tests-writing.md`, "Where a test goes, and how it passes": "For a refusal at load, put `Name.test` beside `tests/Name.fss`, with `load_exception_contains=<message>`. A plain test is green if walk refuses the program at load as named. A failure while the top-level variables are initialised counts as a refusal."
- `SKILL.md`, "Rules for every task": "Assert every value that matters inside the test, with the harness's own checks", "Reproduce a behaviour before you explain it", and "Before you investigate a defect ... look for its rows in the gap ledger".
