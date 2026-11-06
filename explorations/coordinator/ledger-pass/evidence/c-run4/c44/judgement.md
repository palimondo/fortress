# Judgement of chunk c44 (c-run4, base c124c6b65)

Applied 12 (10 rewrites, 2 keeps), held 0. No duplicates, closes or pairs proposed or upheld.

- **187: apply (rewrite).** Check passes: `parser/Syntax.rats:249-265`, `:281-287`, `:325-326` hold at the base; probe and output in `1ee3b0bc5^`.
- **202: apply (rewrite).** Check passes: `Transform.java:122-124` is `forVarRef`; row 182 is a DUPLICATE of 202 at the base.
- **203: apply (rewrite).** Check passes: `ItemDisambiguator.java:109-122`, `ParserMaker.java:296-316` hold; probes q04-q06 in `1ee3b0bc5^`.
- **207: apply (rewrite, corrected).** Check failed on fidelity: the tracked `q01_bind.fss` runs; its failing form is `q01_bind.fss.0`. Correction made: "(at 14:38 of `explorations/apl/v1-probes/q01_bind.fss`)" became "(at 14:38 of `explorations/apl/v1-probes/q01_bind.fss.0`, output `q01_bind.out.0`)". Verified: `git show 1ee3b0bc5^:explorations/apl/v1-probes/q01_bind.fss.0` line 14 is the `qbind⦇ v ← 5 ⋄ v ⦈` use, and `q01_bind.out.0` holds "Variable v is already declared."
- **210: apply (rewrite).** Check passes: `parser/Spacing.rats:92`, `ComposingSyntaxDefTranslator.java:147-148` hold; `q11_nlform.out` in `1ee3b0bc5^` shows `1 2 3 4`; `siblings: 244`.
- **242: apply (rewrite).** Check passes: `Identifier.rats:52-54` / `:62-65` labelled by reading; `u18_gram.out.1` holds `u18_gram.fss:27:34: Syntax Error`.
- **244: apply (rewrite, corrected).** Check failed on the reproducer: with reproducer `none` the error was not quoted. Corrections made: after "`.out.4`" inserted ", `Syntax Error` at 51:77 and 70:39 of the failing forms" (the check's wording, "at `u17_gram.fss:51:77` and `:70:39`", failed `mech.py --final` as a citation past the end of the tracked 73-line probe; positions as in row 207's form) (verified: `.out.0`, `.out.1` hold `u17_gram.fss:51:77`, `.out.4` holds `u17_gram.fss:70:39`, in `1ee3b0bc5^`); dropped ", however wide" to keep the notes within 700.
- **261: apply (keep).** Check passes; no line change.
- **267: apply (keep).** Check passes; no `ExternalSyntax` in `ProjectFortress/src` or `astgen` at the base; no line change.
- **269: apply (rewrite, corrected).** Check failed on fidelity: the implemented `grammar` declaration (`GrammarDef`, `parser/Declaration.rats:92`) is not the specification's `ExternalSyntax` (`syntax OpenExpander Id CloseExpander = Expr`, `Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:434-435`). Correction made: the claim became "a `grammar` declaration is accepted only in an api, never in a component; the frozen specification's component-level syntax declaration, `ExternalSyntax` (`syntax … = Expr`), is a different form, unimplemented (row 267)". Class, status and notes unchanged.
- **273: apply (rewrite).** Check passes: `ComposingSyntaxDefTranslator.java:489-490` `forListDepth` / `return source;`; `siblings: 274`.
- **274: apply (rewrite, corrected).** Check failed on fidelity: the commented-out body is `:510-522` (eleven lines), `:525-529` being `addCodeLine`. Correction made: "with twenty lines of implementation commented out beneath (`:510-529`)" became "with eleven lines of implementation commented out beneath (`:510-522`)". Verified at c124c6b65: `:508` `forOptionDepth`, `:509` the throw, `:510` `/*` to `:522` `*/`.

final.silent: silent.txt as written (187, 273, 274 defect; 203, 210, 244 choice); each `NEGATIVE-VERIFIED` beside `silent` keeps its status (item 265). The check passes it.
