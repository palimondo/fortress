# c44 assessment (base c124c6b65)

Common evidence beyond the evidence files: `git log --since=2026-08-01` over `ProjectFortress/src/com/sun/fortress/syntax_abstractions` and `parser/` shows only 3c4dcdabc (timestamps), 2ed045233 (jsr166y) and d2fe4e1d9 (node hash codes): the macro system is untouched since these rows were found (rungs of 2026-09). `git ls-tree 1ee3b0bc5^` for the deleted probes and outputs. Every row of the chunk is in section 13.

## 187: rewrite
- scope, present meaning, comprehension, ownership, consistency: pass. evidence: fail, "Sites: `Syntax.rats:248-262` (`NOT`), `:276-283` (`*`)": the name is ambiguous (two `Syntax.rats`), and in `parser/Syntax.rats` (unchanged since import) `NOT` is `:249-265`, `*` `:281-287`.
- New line: full path, re-pinned lines. Nothing dropped. silent: defect.

## 202: rewrite
- scope, present meaning, ownership: pass. evidence: fail, "Probes `explorations/apl/v1-probes/q02b_g.fsi`, `q03_g.fsi`, gone" (unpinned; they are in `1ee3b0bc5^`). consistency: fail, "Row 182's case": 182 is now a DUPLICATE pointing at this row. comprehension: pass.
- New line: probes pinned to the parent of 1ee3b0bc5 by full path; 182 named as this row's duplicate; `Transform.java:122-124` pinned to the lookup. Dropped: `TemplateGapId` (now "a gap") and the probe `q02a_g.fsi`: home, the history, which keeps the old line whole.

## 203: rewrite
- scope, present meaning (`ItemDisambiguator.java:109-122`, `ParserMaker.java:296-316` hold, unchanged), comprehension, ownership, consistency: pass. evidence: fail, "Probes `explorations/apl/v1-probes/q04_g.fsi` to `q06_g.fsi`, gone".
- New line: probes pinned to the parent of 1ee3b0bc5; the `apl` terminal sentence shortened. Dropped: "program-wide" wording: the claim's "keyword of the whole language" carries it. silent: choice.

## 207: rewrite
- scope, present meaning, comprehension, ownership, consistency: pass. evidence: fail, "Probes `explorations/apl/v1-probes/q07_rebind.fss`, `q01_bind.fss`, gone" and the `Rung2b.out` citation, a file not in the tree.
- New line: probes pinned to the parent of 1ee3b0bc5, `q06_block.fss` named. The error positions are kept, written as 16:62 and 14:38 of the probes' full paths. Dropped: `q06_block.out.0` and the probe `q06_block.fss` as a third witness: home, the history. Dropped: `Rung2b.out` as the citation of Ex 5, 37, 38 (it lives only at `0ff5eae27~1` in `explorations/apl/v1/rung-2b/`): home, the history.

## 210: rewrite
- scope, comprehension, ownership: pass. present meaning: pass by reading (`parser/Spacing.rats:92` `w = Whitespace*` and `ComposingSyntaxDefTranslator.java:147-148` hold, unchanged). evidence: fail, reproducer `explorations/apl/rung-3/t06_break.fss` ran to "Could not find an implementation for API AplCore" (exit 255, no `FORTRESS_SOURCE_PATH`), and the tracked file holds only the `⋄` workarounds, its failures being `.out.0`/`.out.1` in `1ee3b0bc5^`; "`Spacing.rats:92`" resolved to the 88-line spec copy. consistency: fail, no `siblings:` for row 244, which shares the translator's whitespace mapping.
- New line: reproducer `none`; full `Spacing.rats` path; probe `q11_nlform.fss` named (the row named its grammar `q11_g.fsi`); `siblings: 244`. Dropped: "in a dfn too", "a line break above a name", "`AplLn`", "a strand over a closed name set (`AplTName`), where the trap stays": homes, rows 227 and 253 and the history.

## 242: rewrite
- scope, present meaning, comprehension, ownership, consistency: pass. evidence: fail, reproducer `explorations/apl/rung-4/u18_gram.fss` stops at load (AplCore, exit 255), and "the committed probe has `x` in place of `_` and runs": it never shows the failure, which is `u18_gram.out.1` in `1ee3b0bc5^` ("u18_gram.fss:27:34: Syntax Error", read). Notes held no mechanism.
- New line: reproducer `none`, the failing output pinned; a mechanism by reading, labelled as such: `Identifier.rats:52-54` `Id` vs `:62-65` `BindId`. Nothing dropped.

## 244: rewrite
- scope, present meaning (`ComposingSyntaxDefTranslator.java:147-153` hold, unchanged), comprehension, ownership: pass. evidence: fail, reproducer `u17_gram.fss` stops at load (AplCore) and holds the one-line forms, not the failure. consistency: fail, no siblings for 210 and 208. Notes: "Hence rung 2's two spellings of every statement rule" is a rung story.
- New line: reproducer `none`, failing outputs pinned to `1ee3b0bc5^`, `siblings: 210, 208`. Dropped: the rung 2 sentence: home, row 208 (line breaks and `⋄` as separators) and the history. silent: choice.

## 261: keep
- All six pass: probe and outputs pinned to the parent of 1ee3b0bc5 (`x04_gram.fss`, `.out.0`, `.out.1` are in `1ee3b0bc5^`); NEGATIVE-BOUNDED with the bisection bounds named; no repair story.

## 267: keep
- All six pass: `concrete-syntax.tex:434-451` and `declarations.tex:113-118` hold; `grep -rl ExternalSyntax ProjectFortress/src ProjectFortress/astgen` is empty at the base, so "No `ExternalSyntax` production or AST node" still holds; probe pinned to the parent of 7c3218956. Overlap with 269 is a sibling, named from 269's side (267 at 1,106 characters is left as it is).

## 269: rewrite
- scope, present meaning, comprehension, ownership: pass. evidence: fail, "`Declaration.rats:32-51` … `:59-92` … `:92`" resolved to the 39-line spec copy; in `parser/Declaration.rats` `Decl` is `:42-51` and `AbsDecl` `:70-92`, `GrammarDef` at `:92` (read). consistency: no sibling for 267.
- New line: full path, re-pinned lines, `siblings: 267`. Nothing dropped.

## 273: rewrite
- present meaning (`:489-490` `forListDepth` `return source;`, `:491-504` commented conversion, unchanged), evidence (probe pinned), scope, comprehension, ownership: pass. consistency: fail, no sibling for 274, the same translator's `DepthConvertVisitor` leaving its option depth unimplemented.
- New line: `siblings: 274`. Nothing dropped. silent: defect.

## 274: rewrite
- As 273: all pass but the missing `siblings: 273`. New line adds it and names `forOptionDepth` at `:508-509`. Nothing dropped. silent: defect.

## mech.py
Last line: `MECH: 10 lines, 0 failing, every check passes.` Tokens of old lines that the new lines lack, each with its home: 187's short `Syntax.rats` cites (replaced by the full path); 202's `TemplateGapId` (now "a gap"; history) and bare `q03_g.fsi` (now full path), and `q02a_g.fsi` is not named (history); 203's bare `q06_g.fsi` (now "the two after it"); 207's bare probe names and `Rung2b.out`, `q06_block.out.0` (history); 210's `AplLn`, `AplTName`, `q11_g.fsi`, `t06_break.fss` (rows 227, 253, history; the failing run of `t06_break` is row 238's case); 242's and 244's tracked probe paths (they show only the workaround; named in the notes as "the tracked `u18_gram.fss`" and "`u17_gram.fss`"); 269's probe name inside the message (the probe's path is in the notes); 274's bare `b07b_optvar.fss` (now full path).
