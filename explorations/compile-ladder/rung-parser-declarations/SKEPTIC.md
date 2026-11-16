# Rung P: the skeptic's check

Verdict: **approved.** The change is right as the worker left it at `434c8290f2`; two corrections were made, neither of the grammar, none contested. Head after: the commit of this file.

The branch already carried REPORT.md and record.md (`434c8290f2`), so nothing was written from the run's journal.

## What was checked

1. **The stages.** Read from the worker's files: the count table equals climb batch 30's gate table (`diff` prints nothing; `#total 0`, `#locations 0`, `#crash none`), and `explorations/coordinator/tools/distance/compare.sh` prints `DISTANCE SAME   0`. In the worker's transcript the last change of code is at 00:53:02 UTC (the tests; the grammars at 00:51:23), the count stage starts at 01:11:22 and the distance stage at 01:13:04, both after the code commit `285255aa77`. The diff changes no Scala of the checker, so no count stage of mine was due. The report's tables are those of the worker's head.
2. **Test first.** In the transcript the walk tests fail through `harness-one.sh` at 00:47:33 (`Syntax Error` at `SumSignAccumulator.fss:20:13` and `ApiPostfixExponentOpLib.fsi:7:1`, `Tests run: 2,  Failures: 2`) and the compiled tests through `junit.sh` at 00:50:37 (`Tests run: 6,  Failures: 6`), before the first grammar edit at 00:51:12; they pass at 00:53:02 (`OK (2 tests)`) and 00:54:03 (`OK (6 tests)`), after the last change. The tests changed between the two runs (a trait in the api, a name for the sized object, an import of `List`), as the report says; so I ran the final files on the base's code, below.
3. **The diff.** `parser/Parameter.rats:171`: one `/`, which makes the api's alternative the component's (`:141-143`), the grammar of `Specification/appendices/grammars/concrete-syntax.tex`, section "Parameters", `AbsOpHeaderFront`. `parser/Symbol.rats:255-260`: `SUM` and `PROD` take the signs; `:175-181`: `singleOp` no longer does. Nothing else by hand; the two generated parsers follow. What `SUM` and `PROD` in ASCII parse to is unchanged (programs W1a, C1a, O3 below print the same on both trees). Fork P1 is built as it is worded.
4. **Precedent and sibling sites.** The exclusion of the words is `NodeUtil.validOp` (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1471`); a sign never reaches it, so the grammar is where the sign is kept out. `MethodParam.rats` inherits both alternatives: a trait's `opr (self)^T` and `opr ∑(self)` in an api ran in my programs. The pre-parser and the import collector keep their own `SUM`; every program of mine and the four tests pass through both.
5. **The tests.** Each exercises its defect and cites the file and the section. Each carried more than one comment line: corrected, fix 1.
6. **The differential,** my programs, old code from the base build against the rung's build, `FORTRESS_THREADS=1` (the diff touches no mutable state):

   | program | walk, old | walk, new | compiled, old | compiled, new |
   |---|---|---|---|---|
   | W1: the signs in 18 places (an argument, a tuple, a `case` arm, `:=`, `+=`, a function expression, a list, nested, across a line break, no space before the operand) | `Syntax Error` at 7:11 | 18 lines | | |
   | W1a: W1 with the words | the same 18 lines | the same 18 lines | | |
   | C1: the signs under the prelude, 7 places | | | `Syntax Error` at 7:24 | `22 4 30 6 10 10` |
   | C1a: C1 with the words | | | `22 4 30 6 10 10` | `22 4 30 6 10 10` |
   | A1: an api with `^T`, `^T[\nat r, nat c\]` answering `Mat[\c,r\]`, `^*`, `!`, and a trait's `opr (self)^T` | `Syntax Error` in the api | `103 203 303 5 50 51` | | |
   | Pfx: an api with `^T`, `^*`, `!`; `(y^T)^T` | | | `Syntax Error` at the api's 3:1 | `103 203 303 203` |
   | A3: an abstract `opr (self)^T` in a component's trait | `Syntax Error` at 5:1 | `50` | | |
   | A2, A4: a bare caret as a postfix operator, in an api and in a component | api: `Syntax Error`; component: `The operator, ^, is always an infix operator but it is declared to be postfix.` | that message for both | | |
   | Sg: `opr ∑`, `opr ∏` and a trait's `opr ∑(self)` declared in an api, applied by sign and by word | stops at `SUM b`: `Failed to find any matching overload` | `1007 1007 2007 77 6` | | |
   | O1: own prefix `opr ∑(x: ZZ32) = x + 1`, `∑ y` | `4` | `4` | `4` | `4` |
   | O6: own prefix `opr ∑(x: ZZ32) = 2 x`, `∑ y + 10`, y = 3 | `16` | `26` | `16` | `26` |
   | O2: own infix `opr ∑(a, b)`, `y ∑ y` | `7` | `Syntax Error` at 6:13 | | |
   | O5: `opr BIG ∑(x)`, `BIG ∑ y` | `4` | `Syntax Error` at 6:15, as `BIG SUM y` | | |
   | O3: `opr SUM`, `opr PROD` in ASCII | `4 5` | `4 5` | | |

   Walk and the compiled path agree wherever both ran. The commands are the brief's: `old-fortress.sh <base build> <caches> P.fss`, and `compile P.fss` then `run P`; `bin/fortress` for the new code (`link` for Pfx, which imports an api).
7. **The homes.** Rows 133 and 5: home 1, the four tests. The report's defects 3 and 4: home 3, row 1004 and row 42's new line, as written.
8. **The ledger.** `ledger.py find` on the signs gives rows 5, 42, 65 and 904; 65 (Fortify) is not reached, and 904 is why a compiled program prints `?` for a sign in a string, on both trees.
9. **The report and the record.** The cited lines say what they are cited for (`Symbol.rats:175-181`, `:255-260`; `NodeUtil.java:1455`, `:1471`; `Operators.java:2080-2082`; `Expression.rats:45-49`; `concrete-syntax.tex:737-740`). The suites are those the skill asks of a parser edit, at `285255aa77`: `ant testQuick`, `BUILD SUCCESSFUL`; `ant testSystem`, one red of 832, row 985's expected failure passing once. No sentence of the specification is made false. One omission: fix 2.
10. **Names.** `ApiPostfixExponentOpLib` is the only new name on the source path; nothing else in the tree declares it.
11. **A loud failure made quiet.** None. The other way: a program's own prefix `∑` or `∏` with an operator after its operand changes its value without a message (O6). Fork P1 gives it: the sign begins a reduction, whose body is the whole expression. No line of the tree is such a program.

## Fixes

1. **`88200d7cc4`, a correction.** Finding: the four tests carried a header of three comment lines, and `ProjectFortress/tests/SumSignAccumulator.fss` seven more; the skill's tests-writing.md, "Names, comments, citations", gives a test one comment line. Each now has one. No assertion changed. The final files, through the harness:

       FORTRESS_HOME=/home/user/fortress-base33 /home/user/fortress-base33/explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> ProjectFortress/tests/ApiPostfixExponentOp.fss ProjectFortress/tests/SumSignAccumulator.fss
       SumSignAccumulator.fss:18:13:
           Syntax Error
       Tests run: 2,  Failures: 2,  Errors: 0

   On the base the api test stops there at its import, since the base build has no helper api; run directly on the old code with the helpers beside it, it gives `ApiPostfixExponentOpLib.fsi:8:1: Syntax Error`, column 1 of the line after the trait's declaration.

       old-fortress.sh /home/user/fortress-base33 <caches> junit ProjectFortress/compiler_tests/ApiPostfixExponentOpCompiled.test ProjectFortress/compiler_tests/SumSignAccumulatorCompiled.test
       File ApiPostfixExponentOpCompiled.fss has 1 error.
       Tests run: 6,  Failures: 6,  Errors: 0

   On this branch, the worker's two commands: `OK (2 tests)` and `OK (6 tests)`.
2. **`452f70b224`, a correction.** Finding: REPORT.md, "Programs run old against new", and record.md, finding 2, named what an infix sign and a sign in an import meet, and not that a program's own prefix sign changes its value quietly (O6), nor that `opr BIG ∑` and the infix form ran before. One sentence added to each, marked as the skeptic's.

No whole suite was run: neither fix changes code.

## Points to report

Those of the worker's list stand. Added: the quiet change of O6, and `BIG ∑`, under "what a program that declares or applies U+2211 or U+220F as an operator of its own meets". No reserved point is reached by a line of the tree: no model line, no library line and no existing test writes either sign outside a string, and ASCII `SUM` and `PROD` parse as before. The worker lists `except { opr ∑ }` under the reserved point; no program or library line holds it, so it is a point to report and holds nothing.
