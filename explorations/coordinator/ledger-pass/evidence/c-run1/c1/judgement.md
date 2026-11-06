# Judgement of chunk c1, run c-run1, base c124c6b65

Final mech (`mech.py --final`): "MECH: 4 lines, 0 failing, every check passes."

- **188: apply** (rewrite to RETIRED). The check passes the line; its one failure was the record in `silent.txt`. Correction: the line `188	choice` is dropped, so `final.silent` does not hold it (the row's spec cell is no longer silent, it leaves item 265's set). The line is `rows.rewrite`'s unchanged.
- **283: apply** (rewrite to RETIRED), with the check's three corrections: `283	choice` dropped from `final.silent`; "`narrow` of the floor bracket of 7.5 is the `ZZ32` 7" replaced by "`narrow` of a floor bracket prints 'narrow floor-bracket 7 ZZ32'" (the rung's REPORT.md:127 prints exactly that, with no 7.5); the claim's "`narrow(f)`" given "on `f = \|\ v /\|`", and the notes' "floor bracket" given its spelling "`\|\ v /\|`". The bars are written `\|`, as `ledger.py check` requires inside a cell (my own form fix after its pipe refusal; the old line wrote `opr \|\self/\| : ZZ` so).
- **442: keep, passes.** The check passes it; the row keeps its line, nothing to apply.
- **866: apply** (rewrite), with the check's three corrections: "Fix: refuse the extender." replaced by "Ends at the switch-over, when the checker reads the one library's `comprises`." (`TypeHierarchyChecker.scala:61`, `checkDeclComprises`); ", and the specification makes `ZZ32` the 32-bit integers" deleted (the spec cell holds it); "the run prints the line" replaced by "the run prints 'REACHED'" (`XXXObjectExtendsZZ32Compiled.test`: `run_out_contains=REACHED`).
- **698: apply** (rewrite), as written; the check passes it.
- **772: hold.** The writer's verdict was "measure"; no prober ran the question of `questions.md` (no `runs.md`, no `tmp/probe772`), so its value since `1bc0a9083` is unsettled. The row keeps its line; the question goes to `queue.md`.

Pairs: 442/349 upheld by the check; in `final.pairs`. Dups, closes: none. Silent: both entries dropped, `final.silent` empty.
