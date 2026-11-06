# c44 check (base c124c6b65)

`mech.py` rerun: `MECH: 10 lines, 0 failing, every check passes.` Applied on copies: 10 applied, `ledger.py check` exit 0 with and without `--base`. Every pinned probe and output exists: `p09_comment.fss`/`.out.0`, `q01_bind.fss`(`.0`), `q02b_g.fsi`, `q03_g.fsi`-`q06_g.fsi`, `q07_rebind.fss`, `q11_nlform.fss`/`.out`, `u18_gram.out.1`, `u17_gram.out.0/.1/.4` in `1ee3b0bc5^`; `b06b_repeat.fss`, `b07a_option.fss`, `b07b_optvar.fss`, `b11_gram_in_component.fss` in `7c3218956^`. `git log c124c6b65` over `syntax_abstractions/` and the cited `parser/*.rats` shows only 2ed045233 and 8fe1daa8f, neither touching the cited lines. No closes, duplicates or pairs to check.

## 187: pass
`parser/Syntax.rats:249-265` is `SyntaxSymbol` with `Not w a1:SymbolMod` through `/ SymbolMod;`, `:281-287` is `/ a1:Single star` to `RepeatSymbol`, `:325-326` is `GroupSymbol`. Dropped tokens are the short cites, replaced by the full path. Cold read: "retired first library" is unclear but the probe imports only `p09_g`, so a worker can reproduce from `1ee3b0bc5^`; not a failure.

## 202: pass
`Transform.java:122-124` is `forVarRef` and `syntaxEnvironment.lookup(that.getVarId())`. Row 182 at the base is `DUPLICATE`, "duplicate of row 202". Dropped `TemplateGapId`: now "a gap", wording, old line in the history. `q03_g.fsi` kept at full path. Observation, not a failure: "The paper's Fig. 5" names no paper (none of `Papers/` is the macro paper; the whole of section 13 says "the paper"); a section-level fix, not this line's.

## 203: pass
`ItemDisambiguator.java:109-122` is `nameResolution`, `validId` to `makeKeywordSymbol`, else `makeTokenSymbol`; `ParserMaker.java:296-316` holds the `FORTRESS_KEYWORDS` loop (mech). `q06_g.fsi` kept as "the two after it, q05 and q06"; all three exist in `1ee3b0bc5^`.

## 207: fail (fidelity, reproducer)
- Passage: "a host local of the binder's name collides at the use site (at 14:38 of `explorations/apl/v1-probes/q01_bind.fss`)".
- Source: in `1ee3b0bc5^`, line 14 of `explorations/apl/v1-probes/q01_bind.fss` is a comment, "REJECTED at 14:38 of q01_bind.fss.0 -- \"Variable v is already declared\". Kept as q01_bind.out.0"; the failing form is `q01_bind.fss.0` (its line 14 is `v ", block -> " (qbind⦇ v ← 5 ⋄ v ⦈)))`), and `q01_bind.out.0` reports `rung-2b/q01_bind.fss:14:38: Variable v is already declared.` The tracked `q01_bind.fss` runs.
- Correction: replace "(at 14:38 of `explorations/apl/v1-probes/q01_bind.fss`)" with "(at 14:38 of `explorations/apl/v1-probes/q01_bind.fss.0`, output `q01_bind.out.0`)", and "Both probes in the parent of 1ee3b0bc5" stays. The 16:62 of `q07_rebind.fss` holds (`q07_rebind.out`: `q07_rebind.fss:16:62: Variable v is already declared.`, line 16 `qsix⦇ v ← 1 ⋄ v ← 2 ⋄ v ⦈`).
- Nothing lost otherwise: `Rung2b.out` and `q06_block.out.0` (a third witness, `q06_block.fss:19:38`) have the history as home.

## 210: pass
`parser/Spacing.rats:92` `transient void w  = Whitespace*;`, `ComposingSyntaxDefTranslator.java:147-148` `forWhitespaceSymbol` adds `NonTerminal("w")`. `q11_nlform.out` in `1ee3b0bc5^`: `c2. aply 1 2 / 3 4 on two lines -> 1 2 3 4` (probe lines 40-41). Reproducer `none` is right: `t06_break.fss` is row 238's case (a DUPLICATE of 210) and questions.md gives the command. Dropped `AplLn` (row 227), `AplTName`, "a line break above a name", "in a dfn too": homes rows 227, 253 and the history. `siblings: 244` fits.

## 242: pass
`Identifier.rats:52-54` `Id Id = <FIRST> a1:IdText`, `:62-65` `BindId` adds `/ a1:"_"`, labelled "by reading, not run". `u18_gram.out.1` in `1ee3b0bc5^` holds `u18_gram.fss:27:34: Syntax Error`; tracked `u18_gram.fss:27` has `x ← 0`. `u01_name.fss` at the base has `fn (_: ZZ32, _: ZZ32)`. Dropped tracked-probe path is kept as "the tracked `u18_gram.fss`".

## 244: fail (reproducer)
- Passage: "(`explorations/apl/rung-4/u17_gram.out.0`, `.out.1`, `.out.4`, in the parent of 1ee3b0bc5)".
- Source: with reproducer `none`, the notes must give the output; the cold read's "Which error the `.out` files hold is not quoted. A worker would not know what to look for." In `1ee3b0bc5^` the three hold `Error occurred while instantiating and executing a temporary parser: … (…/u17_gram.fss:51:77: Syntax Error)` (`.out.0`, `.out.1`) and `…:70:39: Syntax Error` (`.out.4`).
- Correction: after "`.out.4`" insert ", `Syntax Error` at `u17_gram.fss:51:77` and `:70:39`"; to stay within 700 characters of notes, drop ", however wide" after "a long production on one line".
- The rest holds: `:147-149` `forWhitespaceSymbol` to `w`, `:152-153` `forBreaklineSymbol` to `br`. The rung-2 sentence dropped has row 208 and the history as home; dropping it fixes a story.

## 261: keep, pass
Probe `explorations/apl/microgpt/probes/x04_gram.fss` and `.out.0`, `.out.1` exist in `1ee3b0bc5^`; no commit touches the macro code.

## 267: keep, pass
`git grep ExternalSyntax c124c6b65 -- ProjectFortress/src ProjectFortress/astgen` is empty; the cited spec lines hold.

## 269: fail (fidelity, cold read)
- Passage (claim): "a grammar may be declared only in an api, never in a component, though the specification lists its `ExternalSyntax` declaration among a component's declarations".
- Source: `Specification-1.0-frozen/basic/declarations.tex:113-118` lists `ExternalSyntax`, whose footnote is "declarations of syntax expanders"; `concrete-syntax.tex:434` defines `ExternalSyntax` as the `syntax OpenExpander Id CloseExpander = Expr` form, which row 267 records as not implemented. The implemented `grammar` declaration (`GrammarDef`, `parser/Declaration.rats:92`) is not that form, so "its `ExternalSyntax` declaration" claims more than the source shows. The cold read stumbles on exactly this ("Whether `ExternalSyntax` is the same thing as a grammar declaration"; "design limit" against a specification that allows the form: "A worker cannot tell whether to fix the parser").
- Correction: claim to "a `grammar` declaration is accepted only in an api, never in a component; the frozen specification's component-level syntax declaration, `ExternalSyntax` (`syntax … = Expr`), is a different form, unimplemented (row 267)". Class and status stay. Line pins hold: `Decl` `:42-51` has no `GrammarDef`, `AbsDecl` `:70-92`, `GrammarDef` at `:92`.

## 273: pass
`ComposingSyntaxDefTranslator.java:489-490` `forListDepth` / `return source;`, `:491` `//throw new MacroError(...)`, commented conversion `:492-505`. Nothing dropped. `siblings: 274` fits.

## 274: fail (fidelity)
- Passage: "with twenty lines of implementation commented out beneath (`:510-529`)".
- Source: at the base, `ComposingSyntaxDefTranslator.java:508` `forOptionDepth`, `:509` `throw new MacroError("not supported now");`, the comment is `:510` `/*` to `:522` `*/` (eleven lines of code), `:523` `}`; `:525-529` is the unrelated `addCodeLine` helper. Unchanged since the row was written (the old line had the same error); the cold read repeats it.
- Correction: "with eleven lines of implementation commented out beneath (`:510-522`)".
- Dropped `b07b_optvar.fss` is kept at full path.

## Writer's other files
- silent.txt: each `NEGATIVE-VERIFIED` beside `silent` keeps its status (item 265): pass.
- questions.md: nothing sent; the optional confirmation for 210 is narrow, its command runs from the main tree, and its outcome (`c1`/`c2` printing `1 2 3 4`) maps to a keep: pass. Its text says "`c1` printing `1 2 3 4`"; the line that prints it is `c2` (`q11_nlform.out`), a slip in the question, not in a row.

Totals: 8 pass (187, 202, 203, 210, 242, 261, 267, 273), 4 fail (207, 244, 269, 274).
