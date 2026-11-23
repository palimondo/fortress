# Rung R (`rung-radix-point-leading-zeros`): record lines for the gather

Climb batch 35, run 1. The fix is `704d6fe747` on `wip/rung-radix-point-leading-zeros`; Appendix I's clause is removed in `535ad0a5c7`. The detail is `REPORT.md` beside this file.

## The finding

A numeral with a radix point now keeps its leading zeros in its digit count on both paths. Claim: `ExprFactory.makeFloatLiteralExpr(Span, String)` keeps the numeral's digits as written, apostrophes and U+202F removed, its leading zeros among them (`ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1637-1640`), as `makeIntLiteralExpr` does (`:609-632`); `NumeralNumbers.of(FloatLiteralExpr)` counts `n` from that text (`nodes_util/NumeralNumbers.java:78`), so `00.5` is `RadixPointNumeral[\3, 1, 10, 5\]` for the checker and for walk. Conditions: every numeral with a radix point that the parser makes; its value, `m` and `v` are unchanged (`x: RR64 = 00.5` prints '0.5' on both paths, old and new). Evidence: `ProjectFortress/tests/RadixPointLeadingZerosWalk.fss` failed on the base through `harness-one.sh`, 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; literals.tex, section "Literals": 00.5 has three digits', and passes ('OK (1 test)'); `ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.test` failed on the base through `junit.sh`, 'FAIL:  2 =/= 3; ...', and passes ('OK (3 tests)', with its link test). `ant testSystem` (879 tests) and `ant testQuick` (1788, 86 and 263) pass on the fix's code; the count stage and the distance stage are the same as the last landed gate's, total 0 each. What it means: a program's own coercion over `RadixPointNumeral[\n, m, r, v\]` reads the digit count that P-174 and `Specification/basic/expressions/literals.tex:101` give. A checker message that quotes such a numeral shows it as written ('The numeral 00.5 does not meet the where clause of the coercion to Small.'), and a folded `MIN`, `MAX` or `|x|` that answers a written radix-point operand keeps its text, so its numeral type in a checker message counts the operand's zeros (`RadixPointNumeral[\3,1,10,5\]` for `00.5 MAX 0.1`); no program and no library coercion reads a folded constant's numbers (P-174; the curator's question in `REPORT.md`).

## FACTS.md

Under "Landed semantics", a new entry:

- **A numeral with a radix point keeps its digits as written in the node that both paths read, so its digit count `n` counts its leading zeros: `00.5` is `RadixPointNumeral[\3, 1, 10, 5\]`.** `ExprFactory.makeFloatLiteralExpr` removes only apostrophes and U+202F from the numeral's text (`nodes_util/ExprFactory.java:1637-1638`), as `makeIntLiteralExpr` does, and `NumeralNumbers.of` counts `n` from that text for the checker and for walk (`nodes_util/NumeralNumbers.java:71-100`); the value, `m` and `v` are read as before. A message that quotes the numeral shows it as written. Tests: `ProjectFortress/tests/RadixPointLeadingZerosWalk.fss`, `ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.test`. Detail: `explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md`, "What changed and why" and "Every reader of the node's text, and what it now sees".

## The gap ledger

- **Row 960 closes**, after the fix lands: `ledger.py close 960 --commit <the landed commit of 704d6fe747> --test ProjectFortress/tests/RadixPointLeadingZerosWalk.fss --note "the compiled twin is ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.test"`. The line it should write, with the branch's hash, linted by `ledger.py check --rows` ('1 rows, 0 fail the template'):

      | 960 | a numeral with a radix point loses all but one of its leading zeros before its four numbers are read: `00.5`'s digit count `n` is 2, where the Working Draft counts 3; an integer numeral keeps them, `007` has 3 | FIXED | implementation gap (parser) | `Specification-1.0-frozen/basic/expressions/literals.tex:110-116`, "Literals" | `ProjectFortress/tests/RadixPointLeadingZerosWalk.fss` | climb batch 29 rung N's skeptic | fixed 704d6fe747; the compiled twin is `ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.test`; full text: history, row 960 |

  The row's reproducer named `ProjectFortress/tests/XXXRadixPointLeadingZerosWalk.fss`, which `704d6fe747` renames by `git mv` to `RadixPointLeadingZerosWalk.fss`: `ledger.py landing-check` reports it under `xxx-gone` until the close is in.
- No new row. No note on another row.

## Other entries that the change makes false

- POSITIONS.md, P-174's last sentence (`explorations/coordinator/POSITIONS.md:106`): "Rows 960 and 981 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written in a `comprises` clause." Row 960 no longer holds; the sentence names row 981 only, as "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause." The record pass writes it (`record.py set`).
- The skill's `.claude/skills/fortress-repo/references/interpreter.md:26`, under walk's departures from "Numbers": "A numeral with a radix point keeps only one of its leading zeros, so a coercion over `RadixPointNumeral[\n, m, r, v\]` gets `n` = 2 for `00.5`, not 3 (ledger row 960)." The line goes; the skill writer removes it.
- The specification's one sentence, in Appendix I's entry "The numeral types, their conversion and their default", is corrected in `535ad0a5c7` (`Specification/appendices/changes.tex:5485-5487`); `grep -rn '~960' Specification --include=*.tex` prints nothing after it.

## Handover line

- Rung R landed the digit count of a numeral with a radix point: the parser's node keeps the digits as written, so `00.5` has three digits on walk and on the compiled path; row 960 closed by the promoted `RadixPointLeadingZerosWalk` and its compiled twin `RadixPointLeadingZerosCompiled`; the count and the distance stay 0.

## Revival change

**The change.** The team's parser kept a numeral with a radix point in its syntax tree with all but one of its leading zeros deleted from the numeral's text: `ExprFactory.makeFloatLiteralExpr` trimmed `00.5` to `0.5` (`ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1640-1643` at `a874948ac`), while its integer numeral kept them (`makeIntLiteralExpr`, `:609-632`), so on both of the team's implementations the tree of `00.5` was that of `0.5`. The tree now keeps the digits as written, leading zeros among them, so a numeral's digit count `n`, which a program's coercion over `RadixPointNumeral[\n, m, r, v\]` reads, is 3 for `00.5` on walk and on the compiled path, and a compiled-path message that quotes the numeral shows `00.5`; the numeral's value is unchanged. Tests: `ProjectFortress/tests/RadixPointLeadingZerosWalk.fss`, `ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.test`. The reason: the Working Draft defines `n` as "the total number of digits" of a numeral with a radix point (`Specification-1.0-frozen/basic/expressions/literals.tex:110-111`), and the specification as revised says "the number $n$ of its digits, leading zeros among them" (`Specification/basic/expressions/literals.tex:101`); with the trim, a coercion that read `n` failed 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; literals.tex, section "Literals": 00.5 has three digits' under walk, and 'FAIL:  2 =/= 3' compiled.

**Provenance.** Rung R of climb batch 35: row 960; P-174 (a numeral's four numbers, `n` the count of its digits); fork R1 of `explorations/coordinator/CLIMB-BATCH-35.md`, "Forks the batch takes" (the node keeps its digits as written; way not taken, a count kept beside a trimmed text).
