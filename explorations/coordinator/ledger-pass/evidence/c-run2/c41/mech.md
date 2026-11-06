# Mechanical check of c41, the writer's files, base c124c6b65

## Row 376, rewritten (1121 characters)
- lengths: row 1121 of 1,200, claim 168 of 300, notes 682 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:222` (ProjectFortress/src/com/sun/fortress/parser/Symbol.rats): holds IMPLIES; reads: transient String IMPLIES = "IMPLIES":op / "\u2192":op;
  - `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:226` (ProjectFortress/src/com/sun/fortress/parser/Symbol.rats): words moved: IMPLIES at :222; reads: transient String rightarrow = "->" / "\u2192";
  - `parser/Literal.rats:365-366` (ProjectFortress/src/com/sun/fortress/parser/Literal.rats): words moved: Type at :179,487; reads: / "->" { yyValue = "\u2192"; }
  - `parser/MayNewlineHeader.rats:464-492` (ProjectFortress/src/com/sun/fortress/parser/MayNewlineHeader.rats): no word to check; reads: StaticArg StaticArg =
  - `parser/MayNewlineHeader.rats:475-477` (ProjectFortress/src/com/sun/fortress/parser/MayNewlineHeader.rats): no word to check; reads: / !(QualifiedName (w closedoublesquare / w closesquare / w comma /
  - `parser/MayNewlineHeader.rats:360-363` (ProjectFortress/src/com/sun/fortress/parser/MayNewlineHeader.rats): no word to check; reads: / openparen w a1:OpBool w closeparen
- in the old line, not in the new: `:347-351`, `:474-476`, `Literal.rats`, `Literal.rats:365-366`, `MayNewlineHeader.rats`, `MayNewlineHeader.rats:462-490`, `Symbol.rats`, `Symbol.rats:222`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 376: row 376: rewritten (1121 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 1 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 1 lines, 0 failing, every check passes.
