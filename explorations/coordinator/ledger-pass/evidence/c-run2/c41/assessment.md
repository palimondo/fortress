# Chunk c41 (run c-run2), base c124c6b65

## Row 359 (NEGATIVE-BOUNDED): keep

- scope: pass; one defect (span runs over trailing comments), one site (`createSpan`), its effect bounded to diagnostics and location-derived names.
- present meaning: pass; `Fortress.rats:145-157` unchanged since ae4f8e38a, and no commit since touches it. ad2b0220a only moves a held-list paragraph to wait on the fix.
- evidence: pass; the cited `createSpan` lines hold (`while ( i >= 0 && yyData[i] == ' ' )`). The reproducer is `none` and the probe has left the tree (`explorations/compile-ladder/rung-library-comments/probes/` is gone); the notes point to it, "probe and full text: history, row 359", and give the observed spans, as the template allows.
- comprehension: pass; "which productions consume it was not traced" is the bound that NEGATIVE-BOUNDED requires.
- ownership: pass; class `implementation gap (parser)`.
- consistency: pass; FACTS.md:17 states the same mechanism and names row 359.
- Not in silent.txt: status is NEGATIVE-BOUNDED, not NEGATIVE-VERIFIED.
- Read beyond the evidence: `ls` of the rung folder (probes gone; REPORT.md stays).

## Row 376 (NEGATIVE-VERIFIED): rewrite

- scope, present meaning, comprehension, ownership, consistency: pass. No commit since touches the parser files; no FACTS or POSITIONS line names it.
- evidence: fail as written. The citations "`Symbol.rats:222`", "`Literal.rats:365-366`", "`MayNewlineHeader.rats:462-490`" name no folder, and resolve first to the specification's grammar copies under `Specification/appendices/grammars/rats/`, where all six are past the end. In `ProjectFortress/src/com/sun/fortress/parser/` all hold at the base: `Symbol.rats:222` `IMPLIES = "IMPLIES":op / "→":op`, `:226` `rightarrow = "->" / "→"`; `Literal.rats:365-366` map `->` and `IMPLIES` to U+2192; `MayNewlineHeader.rats:462-490` is `StaticArg`, the `BoolExpr` choice before `Type`, its lookahead at `:474-476` with `w rightarrow`; `:347-351` the `( w BoolExpr w )` front. Spec headings checked: concrete-syntax.tex `\section{Headers}` (:452), operators.tex `\section{Boolean Operators}` (:817).
- Change: the parser folder written on each citation; "wrong under either reading" cut, and two sentences on the spec's two readings joined into one, to stay under the limit. Dropped: "wrong under either reading" (implied: neither reading should crash walk; the history keeps it).

## Row 852 (CONTESTED): measure

- scope, ownership: pass.
- present meaning: pass; the cited lines unchanged since pin 501140f96 and the row's commit. The `:776-777` "moved" signal is only that `checkForShadowingVars` stands at `:766`, the loop bounds `0 until vars.size - 2`, `i + 1 until vars.size -1` are at `:776-777` as cited.
- evidence: fail by design: "By reading, not run"; "whether `f(x: ZZ32, x: ZZ32)` or `g[\T, T\](x: T)` loads is not established". Only a run settles it; question in questions.md. Status stays CONTESTED until the run (and, for a close, the curator's word).
- comprehension, consistency: pass; no FACTS or POSITIONS line names it.

## Row 898 (NEGATIVE-VERIFIED): keep

- scope: pass; one production, `UnicodeHexChar`.
- present meaning: pass; `Literal.rats:460-464` unchanged since pin c141e7f6a; the "moved" signal is only `10FFF` appearing in the error message at `:469`. The ordered choice as cited: `[0-9A-F]{4}[0-9A-F]?` first, so `10FFFF` commits at `10FFF` and `1000a` at `1000`.
- evidence: pass; the notes carry the command and its output ("'Syntax Error' twice, rc=1; 'RrHexUpper 65546', rc=0"). Spec: `basic/lexical-structure.tex` `\section{Character Literals}` (:797) says "a sequence of four or more hexadecimal digits", so the spec settles it; not silent, so no silent.txt line.
- comprehension, ownership, consistency: pass.
- Read beyond the evidence: `Literal.rats:455-472`, `lexical-structure.tex:797-870`.

Row 376, line numbers: the old `MayNewlineHeader.rats` citations were two lines early at the base (`:462` is `| UnitExpr` of the comment; `StaticArg` starts at `:464`, ends `:492`; the `BoolExpr` choice's lookahead is `:475-477`; `:347-351` is the comment above `BoolPrimaryFront`, whose parenthesized choice `openparen w a1:OpBool w closeparen` is `:360-363`). The new line cites those.
