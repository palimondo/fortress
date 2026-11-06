# Judgement of chunk c15, run c-run1, base c124c6b65

- **355: apply** (rewrite), with the check's correction: "Fix: `:41` as `List`'s header" replaced by "Fix: `:41` as the component's" (the earlier line's meaning; `PureList.fss:41-42`, check.md row 355).
- **611: apply** (rewrite), with the check's correction: "Compiled, the call stops first: ..." replaced by "Compiled, the test stops at `Vo \|\| 3`: ..." (`tests/XXXFunctionalMethodMeetOperator.fss:15`; the checker test has no call).
- **364: keep, passes.** The row keeps its line; nothing to apply.
- **395: apply** (rewrite), as written; the check passes it.
- **397: apply** (rewrite), as written; the check passes it.
- **511: keep, passes.** Nothing to apply.
- **722: apply** (rewrite), with the check's correction: `Int` glossed as "the one type `ZZ32` comprises, F-229" (FACTS.md:237).
- **773: apply** (rewrite), as written; the check passes it.
- **774: apply** (rewrite), with the check's three corrections: "So walk keeps the `<` of a list ..." replaced by "So walk gives `List`'s conditional `<` to a list ..."; "outside its condition" by "unconditionally"; "once walk reads it;" by "once walk reads the clause;" (P-154, POSITIONS.md:65; FACTS.md:222; `List.fsi:69-70`).
- **342: apply** (rewrite), with the check's correction: the parenthesis "(a program's `\|\|` meeting `String`'s, too)" made ", for a program's `\|\|` that can meet `String`'s too." (FACTS F-276, FACTS.md:117).
- **384: apply** (rewrite), as written; the check passes it. `final.silent` keeps `384 defect` (silent.txt, upheld by the check).
- **807: keep, passes.** Nothing to apply.

Dups, closes, pairs: none. Held: none. The optional prober question on row 342 (whether `v04_lib.fss` still shows the cold/warm split) is not needed by the applied line, whose reproducer is `none`; it is queued.
