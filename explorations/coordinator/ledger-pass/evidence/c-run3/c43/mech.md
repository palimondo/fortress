# Mechanical check of c43, the writer's files, base c124c6b65

## Row 181, rewritten (952 characters)
- lengths: row 952 of 1,200, claim 216 of 300, notes 644 of 700
- reproducer `none`: exists
- citations: none with lines
- in the old line, not in the new: `. Workaround: an APL glyph above the escape: the preparser cannot tokenise it, its token loop (`, `; probes`, `it also breaks their pairing. Retired first library, worktree of`
- every check passes

## Row 183, rewritten (976 characters)
- lengths: row 976 of 1,200, claim 196 of 300, notes 694 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:428` (ProjectFortress/src/com/sun/fortress/parser/Literal.rats): words moved: RING at :33,297,298; reads: / "DIAMOND" { yyValue = "\u22C4"; }
  - `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:403-405` (ProjectFortress/src/com/sun/fortress/parser/Literal.rats): words moved: DIAMOND at :428; reads: / "CIRC" { yyValue = "\u2218"; }
  - `explorations/apl/v1-probes/p03b_escape.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `probes-4b/y01_named.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Literal.rats`, `Literal.rats:428`, `explorations/apl/probes-4b/y01_named.fss`, `⍎ ( SPACE e:Expr SPACE )`
- every check passes

## Row 196, rewritten (892 characters)
- lengths: row 892 of 1,200, claim 189 of 300, notes 611 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/TemplateParser.java:100-121` (ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/TemplateParser.java): holds parseTemplate; reads: 
  - `explorations/apl/v1-probes/p16_decl.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `TemplateParser.java`, `TemplateParser.java:106-137`
- every check passes

## Row 213, rewritten (993 characters)
- lengths: row 993 of 1,200, claim 125 of 300, notes 686 of 700
- reproducer `none`: exists
- citations:
  - `AplSyntax.fsi:1` (explorations/apl/base/AplSyntax.fsi): no word to check; reads: (* AplSyntax -- the grammar half of the APL sub-language.  Same sub-language
  - `AplSyntax.fsi:2` (explorations/apl/base/AplSyntax.fsi): no word to check; reads: apl⦇ … ⦈ as v1/base/AplSyntax.fsi, same strictly right-to-left evaluation, same
  - `AplSyntax.fsi:1` (explorations/apl/base/AplSyntax.fsi): no word to check; reads: (* AplSyntax -- the grammar half of the APL sub-language.  Same sub-language
  - `AplSyntax.fsi:1-107` (explorations/apl/base/AplSyntax.fsi): no word to check; reads: (* AplSyntax -- the grammar half of the APL sub-language.  Same sub-language
- in the old line, not in the new: `AplSyntaxB.fsi`, `AplSyntaxB.fsi:1:2: Variable a is not defined.`, `q08_g.fsi`, `q08_g.fsi:1:2:`
- every check passes

## Row 229, rewritten (1058 characters)
- lengths: row 1058 of 1,200, claim 213 of 300, notes 629 of 700
- reproducer `explorations/apl/rung-2/s07_chain.fss`: exists
- citations: none with lines
- in the old line, not in the new: `s07_chain.fss`, `s07_chain.fss:8:51-59: Variable apl is not defined.`
- every check passes

## Row 235, rewritten (942 characters)
- lengths: row 942 of 1,200, claim 236 of 300, notes 586 of 700
- reproducer `explorations/apl/rung-3/t02_gram.fss`: exists
- citations:
  - `explorations/apl/rung-3/T02Syn.fsi:30` (explorations/apl/rung-3/T02Syn.fsi): no word to check; reads: ( SPACE a:TExp SPACE , SPACE b:TExp SPACE ) SPACE ⍴ SPACE r:TExp
  - `explorations/apl/rung-3/T02Syn.fsi:32` (explorations/apl/rung-3/T02Syn.fsi): no word to check; reads: | ( SPACE a:TAtom SPACE , SPACE b:TAtom SPACE ) SPACE ⍴ SPACE r:TExp
  - `explorations/apl/base/AplSyntax.fsi:212` (explorations/apl/base/AplSyntax.fsi): holds ( SPACE a:AplAtom SPACE , SPACE b:AplAtom SPACE ) SPACE ⍴ SPACE r:AplE; reads: | ( SPACE a:AplAtom SPACE , SPACE b:AplAtom SPACE ) SPACE ⍴ SPACE r:AplE
- in the old line, not in the new: nothing
- every check passes

## Row 236, rewritten (988 characters)
- lengths: row 988 of 1,200, claim 213 of 300, notes 689 of 700
- reproducer `none`: exists
- citations:
  - `explorations/apl/rung-3/T02Syn.fsi:30-33` (explorations/apl/rung-3/T02Syn.fsi): words moved: (a,b)⍴ at :13,27,40; l:TAtom SPACE ⍴ at :34; t02_gram.out.5 at :29; reads: ( SPACE a:TExp SPACE , SPACE b:TExp SPACE ) SPACE ⍴ SPACE r:TExp
  - `explorations/apl/rung-3/T02Syn.fsi:34` (explorations/apl/rung-3/T02Syn.fsi): words moved: (a,b)⍴ at :13,27,40; t02_gram.out.5 at :29; reads: | l:TAtom SPACE ⍴ SPACE r:TExp => <[ aplReshapeV((l), (r)) ]>
  - `explorations/apl/base/AplSyntax.fsi:212` (explorations/apl/base/AplSyntax.fsi): no word to check; reads: | ( SPACE a:AplAtom SPACE , SPACE b:AplAtom SPACE ) SPACE ⍴ SPACE r:AplE
  - `explorations/apl/base/AplSyntax.fsi:220-221` (explorations/apl/base/AplSyntax.fsi): no word to check; reads: | a:AplNum SPACE b:AplNum SPACE ⍴ SPACE r:AplE => <[ aplReshapeM((a), (b), (r)) ]>
- in the old line, not in the new: `explorations/apl/rung-3/t02_gram.out.5`
- every check passes

## Row 239, rewritten (982 characters)
- lengths: row 982 of 1,200, claim 245 of 300, notes 645 of 700
- reproducer `none`: exists
- citations:
  - `t07_juxt.fss:22` (explorations/apl/rung-3/t07_juxt.fss): words moved: Variable apl is not defined. at :20; t07_juxt.out.0 at :19,23; reads: println(("five = " apl⦇ 5 ⦈)) *)
- in the old line, not in the new: `t07_juxt.fss:20:24-25: Variable apl is not defined.`
- every check passes

## Row 250, rewritten (998 characters)
- lengths: row 998 of 1,200, claim 217 of 300, notes 695 of 700
- reproducer `none`: exists
- citations: none with lines
- in the old line, not in the new: `are Syntax Errors where the bare characters parse and match | NEGATIVE-VERIFIED | design limit (parser) | silent |`, `for`, `with the bare character; row 181's glyph-above rule does not apply to them.`, `| apl rung 5 |`
- every check passes

## Row 287, rewritten (951 characters)
- lengths: row 951 of 1,200, claim 276 of 300, notes 588 of 700
- reproducer `none`: exists
- citations:
  - `explorations/apl/probes-4b/y06_fold.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 181: row 181: rewritten (952 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 183: row 183: rewritten (976 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 196: row 196: rewritten (892 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 213: row 213: rewritten (993 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 229: row 229: rewritten (1058 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 235: row 235: rewritten (942 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 236: row 236: rewritten (988 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 239: row 239: rewritten (982 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 250: row 250: rewritten (998 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 287: row 287: rewritten (951 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 10 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 10 lines, 0 failing, every check passes.
