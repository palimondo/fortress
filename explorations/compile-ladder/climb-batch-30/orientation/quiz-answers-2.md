# Quiz answers, reader 2

## 33. Two numerals at the edge of the floats

### (a) `inf: RR64 = 10^400` inside `run()`

**Decision.** The binding neither runs under walk nor compiles. I do not write it. The test gets its infinity from run-time arithmetic that overflows:

```
t: RR64 = 10.0^308
inf: RR64 = t TIMES 10.0
```

`inf` is `Infinity` under walk. To test a function's result for an infinity without a comparison value, write `x.isInfinite`.

Why the binding fails: `10^400` is an expression of numerals alone, with an exponent below 4096, so it folds exactly to one constant before the checker, on both paths. The constant then converts as a numeral does at the typed binding's type, `RR64`. It rounds to an infinity there, so it is refused. A typed operand is needed for run-time arithmetic: `t` is a variable, so `t TIMES 10.0` is not folded. (`10.0^308` itself folds, but it fits `RR64`, so it binds.)

**Path and scope.**

- Walk: refused when the binding runs, so at run time inside `run()`, not at load. The message depends on the place; the orientation gives the message only for a top-level binding, so I would not assert a message text for a local binding without running it once.
- Compiled path: the checker refuses it statically, so the compile stops. This holds before and after the switch-over. Before the switch-over there is a second cause: the compiler's `RR64` converts only an `RR32` and a numeral with a radix point, so an integer constant at `RR64` is refused anyway (`compiler.md`, ledger row 442).
- The replacement is stated for walk ("`t TIMES 10.0` is `Infinity` under walk"), which is the path of the test in `ProjectFortress/tests/`.

**Passages relied on.**

- Orientation, "Numbers", "A numeral converts where it stands (P-173)": "A numeral outside the type's range, or that rounds to an infinity there, is refused: by the checker statically, by walk when the place runs. ... To get an infinity, overflow run-time arithmetic: for `t: RR64 = 10.0^308`, `t TIMES 10.0` is `Infinity` under walk. `x.isInfinite` tests for one."
- Orientation, "Numbers", "An expression of numerals alone folds exactly before the checker, on both paths (P-173)": the fold covers "`^` up to the exponent 4096"; the result "is one exact constant, which converts as a numeral does at one of the eight number types"; "A test of run-time arithmetic ... needs a variable operand".
- `references/compiler.md`, the limit on `RR64`'s conversions until the switch-over (ledger row 442).

### (b) `wide: RR32 = 340282356779733661637539395458142568448` at the top level

**Decision.** I conclude that today's tree is right and that my test asserted a departure of walk which a fix has since removed. The numeral lies above the largest `RR32` and rounds to an infinity there, so the rule refuses it. A week ago walk gave `Infinity` with no error; that was a known departure (ledger row 967), not the rule. The refusal 'Type mismatch binding' is exactly the message that the rule gives for a top-level binding under walk. So this is no regression and no new gap: I do not change walk, and I do not record a defect.

One thing I would look up first: `references/interpreter.md`, "How walk evaluates a program", still lists the old behaviour ("A numeral that rounds to an infinity at `RR32` or `RR64` gives `Infinity`, with no error (ledger row 967)"), against the orientation's rule. I would read row 967 in the gap ledger with the queries of `references/records.md` to confirm that the row is closed by the fix. If it is, the line in `interpreter.md` is stale, and I report that as a finding. If the row were still open and unchanged, the two would disagree with what I see, and I would report that instead of guessing.

What I do with the test: it was wrong to assert the departure in a plain test. I rewrite it, by what it is meant to show:

- If it is meant to show the refusal: keep the program, and put `Name.test` beside `tests/Name.fss` with `load_exception_contains=Type mismatch binding`. A failure while the top-level variables are initialised counts as a refusal at load, so the plain test is green.
- If it only needs an `RR32` infinity to print or compare: remove the numeral, and make the infinity by run-time overflow from a variable operand that fits, as in (a), at `RR32`; check it with `isInfinite`.

Then I run the one test through the harness (`harness-one.sh`), not a whole suite.

**Path and scope.** Walk, top-level binding: refused when the place runs, which for a top-level variable is at load, with 'Type mismatch binding'. On the compiled path the checker refuses the same numeral statically, before and after the switch-over. The test in question is a walk test.

**Passages relied on.**

- Orientation, "Numbers", "A numeral converts where it stands (P-173)": "A numeral outside the type's range, or that rounds to an infinity there, is refused: by the checker statically, by walk when the place runs. Walk's message depends on the place: a top-level binding gives 'Type mismatch binding'."
- Orientation, opening: "A sentence that cites a ledger row states a known departure from a rule, or an open question. A fix can change it, so do not assert it as correct in a plain test (`tests-writing.md`)." And: "An old note, a team test and your training can be right about the team's walk and wrong here".
- `references/interpreter.md`, "How walk evaluates a program": walk's departures hold "until each fix lands", and the line on ledger row 967.
- `references/tests-writing.md`: "For a refusal at load, put `Name.test` beside `tests/Name.fss`, with `load_exception_contains=<message>`. ... A failure while the top-level variables are initialised counts as a refusal."
- `SKILL.md`, "Rules for every task": look for the ledger's rows before investigating a defect; "When to explore": a rule is questioned only on new evidence, and there is none here.
