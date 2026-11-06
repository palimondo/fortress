# Mechanical check of c32, the writer's files, base c124c6b65

## Row 37, rewritten (853 characters)
- lengths: row 853 of 1,200, claim 144 of 300, notes 549 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:3218-3226` (Library/FortressLibrary.fss): holds trait Monoid; reads: (*************
  - `explorations/spec-probes/p5_ring.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Library/FortressLibrary.fss:3032`
- every check passes

## Row 101, rewritten (1031 characters)
- lengths: row 1031 of 1,200, claim 186 of 300, notes 686 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/overloading.tex:99-105` (Specification-1.0-frozen/basic/overloading.tex): no word to check; reads: 
  - `Library/IntMap.fss:738` (Library/IntMap.fss): no word to check; reads: opr BIG UNION[\Val\]() : BigReduction[\IntMap[\Val\],IntMap[\Val\]\] =
  - `Library/PrefixMap.fss:32` (Library/PrefixMap.fss): holds PrefixSet.{...}; reads: import PrefixSet.{...}
  - `Library/PrefixMap.fss:419` (Library/PrefixMap.fss): no word to check; reads: opr BIG UNION[\E extends StandardTotalOrder[\E\], F extends List[\E\],V\]():BigReduction[\PrefixMap[\E,F,V\],PrefixMap[\E,F,V\]\] =
  - `Library/PrefixSet.fss:425` (Library/PrefixSet.fss): no word to check; reads: opr BIG UNION[\E extends StandardTotalOrder[\E\], F extends List[\E\]\](): BigReduction[\PrefixSet[\E,F\],PrefixSet[\E,F\]\] =
  - `explorations/run-b/probes/c19_bigunion_collision.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b/probes/worker/w17_bigunion_except.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `3aea3da53`, `Overloading of BIG CUP[\Key,Val\]():…/Library/Map.fss:197 and BIG CUP[\R extends StandardTotalOrder[\R\]\]():…/Library/Set.fss:115 fails because…`, `cdd25b95d`
- every check passes

## Row 199, rewritten (970 characters)
- lengths: row 970 of 1,200, claim 225 of 300, notes 659 of 700
- reproducer `none`: exists
- citations:
  - `explorations/apl/v1/rung-2/Rung2.out`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/apl/v1-probes/p15_box.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `.out`, `Rung2.out`
- every check passes

## Row 278, rewritten (1158 characters)
- lengths: row 1158 of 1,200, claim 176 of 300, notes 669 of 700
- reproducer `none`: exists
- citations:
  - `explorations/apl-probes/c10_opr_iota.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/apl-probes/c16_glyph_identifier.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:175-178` (ProjectFortress/src/com/sun/fortress/parser/Symbol.rats): no word to check; reads: transient private String singleOp =
  - `PrecedenceMap.java:176-179` (ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/PrecedenceMap.java): no word to check; reads: public boolean isOperator(String a) {
  - `parser_util/precedence_resolver/operators.txt:490-491` (ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/operators.txt): no word to check; reads: left ceiling, |/, \u2308
  - `parser_util/precedence_resolver/operators.txt:522-523` (ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/operators.txt): no word to check; reads: right ceiling,\|, \u2309
- in the old line, not in the new: `Symbol.rats`, `Symbol.rats:175-178`, `null`, `unicode/OperatorStuffGenerator.java`
- every check passes

## Row 460, rewritten (1103 characters)
- lengths: row 1103 of 1,200, claim 244 of 300, notes 659 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/typecase.tex:55-62` (Specification-1.0-frozen/basic/expressions/typecase.tex): no word to check; reads: &::=& \KWD{typecase} \emph{TypecaseBindings} \KWD{of}
  - `ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:122` (ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats): no word to check; reads: / typecase w a1:Expr w a2:(of / do / in) w a3:TypecaseClauses
  - `ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:237-251` (ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats): no word to check; reads: /* TypecaseClause ::=
  - `typecase.tex:15` (Specification/basic/expressions/typecase.tex): no word to check; reads: \note{This section should be revised according to the changes in the pattern matching proposal.}
  - `Library/FortressLibrary.fss:33-37` (Library/FortressLibrary.fss): no word to check; reads: cast[\T extends Any\](x:Any):T =
  - `explorations/compile-ladder/rung-exclusion-remainder/probes/typecase/TcBind.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `DelimitedExpr.rats`, `DelimitedExpr.rats:43`, `TcBind.fss`, `TcTrait.fss`, `typecase (rp, rq) = (p, q) of`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 37: row 37: rewritten (853 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 101: row 101: rewritten (1031 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 199: row 199: rewritten (970 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 278: row 278: rewritten (1158 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 460: row 460: rewritten (1103 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 5 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 5 lines, 0 failing, every check passes.
