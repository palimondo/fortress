# Mechanical check of c44, the judge's files, base c124c6b65

## Row 187, rewritten (936 characters)
- lengths: row 936 of 1,200, claim 178 of 300, notes 666 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/parser/Syntax.rats:249-265` (ProjectFortress/src/com/sun/fortress/parser/Syntax.rats): words moved: NOT at :34,245,426; reads: SyntaxSymbol SyntaxSymbol =
  - `ProjectFortress/src/com/sun/fortress/parser/Syntax.rats:281-287` (ProjectFortress/src/com/sun/fortress/parser/Syntax.rats): words moved: NOT at :34,245,426; reads: / a1:Single star
  - `ProjectFortress/src/com/sun/fortress/parser/Syntax.rats:325-326` (ProjectFortress/src/com/sun/fortress/parser/Syntax.rats): words moved: NOT at :34,245,426; reads: SyntaxSymbol GroupSymbol =
  - `explorations/apl/v1-probes/p09_comment.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:276-283`, `:324-326`, `Syntax.rats`, `Syntax.rats:248-262`
- every check passes

## Row 202, rewritten (1084 characters)
- lengths: row 1084 of 1,200, claim 213 of 300, notes 689 of 700
- reproducer `none`: exists
- citations:
  - `Transform.java:122-124` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/Transform.java): holds VarRef; reads: public Node forVarRef(VarRef that) {
  - `explorations/apl/v1-probes/q02b_g.fsi`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/apl/v1-probes/q03_g.fsi`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `TemplateGapId`, `Transform.java:122-135`, `q03_g.fsi`
- every check passes

## Row 203, rewritten (991 characters)
- lengths: row 991 of 1,200, claim 198 of 300, notes 700 of 700
- reproducer `none`: exists
- citations:
  - `ItemDisambiguator.java:109-122` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/ItemDisambiguator.java): holds KeywordSymbol; reads: private SyntaxSymbol nameResolution(ItemSymbol item) {
  - `ParserMaker.java:296-316` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/ParserMaker.java): holds KeywordSymbol, FORTRESS_KEYWORDS; reads: for (String keyword : keywords) {
  - `explorations/apl/v1-probes/q04_g.fsi`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `q06_g.fsi`
- every check passes

## Row 207, rewritten (1066 characters)
- lengths: row 1066 of 1,200, claim 207 of 300, notes 698 of 700
- reproducer `none`: exists
- citations:
  - `explorations/apl/v1-probes/q07_rebind.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Rung2b.out`, `q01_bind.fss`, `q01_bind.fss:14:38`, `q06_block.out.0`, `q07_rebind.fss`, `q07_rebind.fss:16:62`
- every check passes

## Row 210, rewritten (939 characters)
- lengths: row 939 of 1,200, claim 204 of 300, notes 648 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/parser/Spacing.rats:92` (ProjectFortress/src/com/sun/fortress/parser/Spacing.rats): no word to check; reads: transient void w  = Whitespace*; // whitespace optional
  - `ComposingSyntaxDefTranslator.java:147-148` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/ComposingSyntaxDefTranslator.java): no word to check; reads: public void forWhitespaceSymbol(WhitespaceSymbol that) {
  - `explorations/apl/v1-probes/q11_nlform.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `AplLn`, `AplTName`, `Spacing.rats`, `Spacing.rats:92`, `explorations/apl/rung-3/t06_break.fss`, `explorations/apl/v1-probes/q11_g.fsi`
- every check passes

## Row 242, rewritten (918 characters)
- lengths: row 918 of 1,200, claim 136 of 300, notes 634 of 700
- reproducer `none`: exists
- citations:
  - `u18_gram.fss:27` (explorations/apl/rung-4/u18_gram.fss): words moved: {a ← 3 3⍴1 ⋄ _ ← {a[1;1] ← 0}⍬ ⋄ a} 0 at :6; reads: p("{a ← 3 3⍴1 ⋄ x ← 0 ⋄ a} 0     ", aplShow(apl⦇ {a ← 3 3⍴1 ⋄ x ← 0 ⋄ a} 0 ⦈))
  - `u18_gram.fss:34` (explorations/apl/rung-4/u18_gram.fss): words moved: {a ← 3 3⍴1 ⋄ _ ← {a[1;1] ← 0}⍬ ⋄ a} 0 at :6; reads: p("{answer ← ⍵ ⋄ {⍵: 42 ⋄ ¯99} answer} 1",
  - `ProjectFortress/src/com/sun/fortress/parser/Identifier.rats:52-54` (ProjectFortress/src/com/sun/fortress/parser/Identifier.rats): no word to check; reads: Id Id =
  - `ProjectFortress/src/com/sun/fortress/parser/Identifier.rats:62-65` (ProjectFortress/src/com/sun/fortress/parser/Identifier.rats): no word to check; reads: /* BindId ::= Id | _ */
- in the old line, not in the new: `_ ← {a[1;1] ← 0}⍬`, `explorations/apl/rung-4/u18_gram.fss`
- every check passes

## Row 244, rewritten (978 characters)
- lengths: row 978 of 1,200, claim 195 of 300, notes 697 of 700
- reproducer `none`: exists
- citations:
  - `ComposingSyntaxDefTranslator.java:147-149` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/ComposingSyntaxDefTranslator.java): no word to check; reads: public void forWhitespaceSymbol(WhitespaceSymbol that) {
  - `ComposingSyntaxDefTranslator.java:152-153` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/ComposingSyntaxDefTranslator.java): no word to check; reads: public void forBreaklineSymbol(BreaklineSymbol that) {
- in the old line, not in the new: `explorations/apl/rung-4/u17_gram.fss`, `u17_gram.out.0`
- every check passes

## Row 269, rewritten (1045 characters)
- lengths: row 1045 of 1,200, claim 219 of 300, notes 659 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/declarations.tex:113-118` (Specification-1.0-frozen/basic/declarations.tex): words moved: grammar at :96,102; reads: &$|$& \emph{ExternalSyntax}
  - `ProjectFortress/src/com/sun/fortress/parser/Declaration.rats:42-51` (ProjectFortress/src/com/sun/fortress/parser/Declaration.rats): words moved: GrammarDef at :68,92; reads: List<Decl> Decl =
  - `ProjectFortress/src/com/sun/fortress/parser/Declaration.rats:70-92` (ProjectFortress/src/com/sun/fortress/parser/Declaration.rats): holds AbsDecl; reads: List<Decl> AbsDecl =
  - `ProjectFortress/src/com/sun/fortress/parser/Declaration.rats:92` (ProjectFortress/src/com/sun/fortress/parser/Declaration.rats): words moved: AbsDecl at :53,54,59; reads: / a1:GrammarDef    { yyValue = Useful.list((Decl)a1); };
  - `explorations/apl-probes/b11_gram_in_component.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:59-92`, `Declaration.rats`, `Declaration.rats:32-51`, `Error occurred while instantiating and executing a temporary parser: … (b11_gram_in_component.fss:8:8: Syntax Error)`, `b11_gram_in_component.fss`
- every check passes

## Row 273, rewritten (862 characters)
- lengths: row 862 of 1,200, claim 127 of 300, notes 638 of 700
- reproducer `none`: exists
- citations:
  - `ComposingSyntaxDefTranslator.java:489-490` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/ComposingSyntaxDefTranslator.java): holds forListDepth, return source;; reads: public String forListDepth(ListDepth d) {
  - `ComposingSyntaxDefTranslator.java:491-504` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/ComposingSyntaxDefTranslator.java): words moved: forListDepth at :489,538; return source; at :485,490; reads: //throw new MacroError("not supported now");
  - `explorations/apl-probes/b06b_repeat.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 274, rewritten (920 characters)
- lengths: row 920 of 1,200, claim 144 of 300, notes 679 of 700
- reproducer `none`: exists
- citations:
  - `ComposingSyntaxDefTranslator.java:508-509` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/ComposingSyntaxDefTranslator.java): holds forOptionDepth; reads: public String forOptionDepth(OptionDepth d) {
  - `ComposingSyntaxDefTranslator.java:510-522` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/ComposingSyntaxDefTranslator.java): words moved: forOptionDepth at :508,534; reads: /*
  - `explorations/apl-probes/b07a_option.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/apl-probes/b07b_optvar.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:510-529`, `b07b_optvar.fss`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 187: row 187: rewritten (936 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 202: row 202: rewritten (1084 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 203: row 203: rewritten (991 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 207: row 207: rewritten (1066 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 210: row 210: rewritten (939 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 242: row 242: rewritten (918 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 244: row 244: rewritten (978 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 269: row 269: rewritten (1045 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 273: row 273: rewritten (862 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 274: row 274: rewritten (920 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 10 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 10 lines, 0 failing, every check passes.
