# c21 assessment (c-run3, base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. Beyond the evidence files I read, at c124c6b65: `OverloadSet.java:1480-1490`, `:2040-2052`, and its diff from `052a7c3fe` and from `d4d454f9d` (one comment line changed in place at `:1501`, so no cited line moved); `Functionals.scala` at `811053f15:738-750` against the base's `:820-834` (the same block, shifted by +83); `OverloadingChecker.scala:240-262` and its log since `108ab82d6`; `parser/Identifier.rats:90-104`, `parser/Parameter.rats:120-131` (at the base and at `052a7c3fe`), `parser/Compilation.rats:303-336` and their logs (no change since the team); the `.test` files of `XXXGenericInstanceReturnOnly`, `GenericInstanceReturnOnlyLink`, `XXXGenericPositionalBox`; the tree listing of every test the rows name (all present); `overloading.tex`'s `\revision{revival-dispatch}` callouts (`:333`, `:404`); FACTS F-281 and F-136; ledger rows 159 and 41. No run: every reproducer is a gated `XXX` test or a reading; the newest gate `a12ab5c60` holds for the base.

## 495: keep
- all pass. The claim no longer leans on the fixed rows 493 and 494; the pin `OverloadSet.java:2393-2414` at `d4d454f9d` still shows the generic-method closure path (the file changed by one line in place since, at `:1501`); the swapped-pair probe is a probe path read from history, as the template allows; `DispatchSwappedArmRungG` and the reproducer exist; FACTS.md:192 (F-136's neighbour) agrees.

## 496: rewrite
- scope pass; present meaning pass; evidence pass (pin re-pointed, same text at `:2048`); comprehension FAIL: "so rung G's call-site change does not reach it" names a rung for a mechanism; ownership pass; consistency FAIL: "siblings: 493, 494, 495, 538" lists two FIXED rows and omits 699, which names 496 for the same unpassed return type.
- New line: siblings 495, 538, 699; "the call-site dispatch of top-level functions does not reach it"; pin at c124c6b65. Dropped: siblings 493 and 494 (FIXED; home: the history keeps the old line, and row 495's history line names them).

## 499: rewrite
- scope pass; present meaning FAIL: "walk refuses it (row 159)": row 159 is FIXED (`6d187d069`), so walk no longer refuses such a pair at load; evidence: reproducer cell names the `.fss`, the gated test is `XXXGenericPositionalBox.test`; pins `:1342-1353` at `052a7c3fe` (same text now) and `Functionals.scala:741-749` at `811053f15`, now `:824-832`; comprehension pass; ownership pass; consistency FAIL: 538 names 499 as agreeing where the value fixes the parameter, 499 names no sibling.
- New line: siblings 538; reproducer `.test`; "walk's answer since row 159's fix is not measured"; both pins at c124c6b65, the short `OverloadSet.java` path to fit. Dropped: "walk refuses it" (false now; history keeps it). The optional walk run is in `questions.md`.

## 538: rewrite
- scope, present meaning, evidence, comprehension, ownership pass; consistency FAIL: "siblings: 496" while 699 and 706 name 538 for the same unpassed static return type (and 851, 854 name it for phase 5's design, which are questions about it, not siblings).
- New line: siblings 496, 699, 706; pin `:1484` at c124c6b65 (same text). Nothing dropped.

## 699: rewrite
- scope pass; present meaning pass; evidence FAIL: reproducer `none`, though "Gated by `compiler_tests/XXXGenericInstanceReturnOnly.test`" stands in the notes and the test is in the tree; comprehension pass; ownership pass; consistency FAIL: the sibling 706 is named in the notes' tail ("walk's side: row 706"), not in `siblings:`.
- New line: reproducer `ProjectFortress/compiler_tests/XXXGenericInstanceReturnOnly.test`; siblings 496, 538, 706; the link test kept in the notes; pin at c124c6b65. Nothing dropped.

## 813: rewrite
- scope pass; present meaning pass; evidence FAIL: the pin `ed4782762` is not in the base's history (the evidence says so); the cited lines still hold `importsOnDemand` at `:252-255`; comprehension FAIL: "on the base too" names an unnamed base; ownership pass; consistency FAIL: siblings list 811, FIXED.
- New line: siblings 814; pin at c124c6b65; "on the base too" dropped. Dropped: 811 from siblings (FIXED; history keeps it; FACTS F-281 tells the `except` repair).

## 814: rewrite
- scope pass; present meaning pass; evidence FAIL: pin `ed4782762`, not in the base's history; comprehension FAIL: "as on the base, whose check read no symbolic operator" is a repair story; ownership pass; consistency FAIL: siblings list 41 (POSITIVE-VERIFIED, a capability) and 811 (FIXED).
- New line: siblings 42, 813; pin at c124c6b65; row 41 named as the working big-operator case at the end. Dropped: "as on the base..." (history; F-281 says the check now reads every operator), 811 from siblings.

## 851: keep
- all pass. CONTESTED: the question (whether phase 5's dispatcher turns contravariance on) is the curator's and unsettled; the cited lines `ProjectProperties.java:327-328`, `OverloadSet.java:1188`, `:989`, `:1708-1709` are unchanged since the row; "by reading, not run" stated, and what settles it named. 1,192 characters, so no room to add.

## 854: keep
- all pass. CONTESTED, spec `silent`; every cited line unchanged since the row; what settles it is named (phase 5's design, row 538). Not `NEGATIVE-VERIFIED`, so nothing in `silent.txt`.

## 706: keep
- all pass. The reproducer `XXXGenericInstanceReturnOnlyWalk` ran as an expected failure in gate `a12ab5c60`, which holds for the base. The callout claim holds: `overloading.tex:333` and `:404` are the `revival-dispatch` callouts, and the specification names no ledger row. POSITIONS (P-48) agrees: walk takes the value's type. Pair 706/510 (510 in another run) in `pairs.txt`, to check 510 names 706.

## 42: rewrite
- scope pass; present meaning pass (the import grammar is the team's, unchanged); evidence FAIL: "`Parameter.rats:129`" resolves to the 69-line `Specification/appendices/grammars/rats/Parameter.rats`; the parser's `ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:129` holds the `SUM` alternative at the base and at `052a7c3fe`; the mechanism (the import's `SimpleName` has no `SUM`) cited no line; comprehension pass; ownership pass; consistency FAIL: 814 names 42 as sibling, 42 names none.
- New line: siblings 814; `Identifier.rats:95-104` (`SimpleName`) and the full `Parameter.rats` path, at c124c6b65; row 41 named for the workaround. Nothing dropped.

## 13: rewrite
- scope pass; present meaning pass (grammar unchanged since the team); evidence FAIL: "`Compilation.rats:308`" resolves to the 81-line specification copy; the parser's `ProjectFortress/src/com/sun/fortress/parser/Compilation.rats:308-336` holds `AliasedSimpleName` with `match` (`=>`); comprehension, ownership, consistency pass.
- New line: the full path at c124c6b65, two phrases shortened to fit 700. Dropped: the bare capture name `skeptic-differentials.txt:20-28`, which resolves to no file (now "its capture beside it", the probe's folder; history keeps the line numbers).
