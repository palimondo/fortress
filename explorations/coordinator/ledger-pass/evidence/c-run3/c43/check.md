# Check, chunk c43 (base c124c6b65)

mech.py: `MECH: 10 lines, 0 failing, every check passes.` Form passes on every new line. Sources read at the base unless said: the cited parser lines, `explorations/apl/base/AplSyntax.fsi`, the rung probes and REPORTs, `explorations/apl/probes-4b/PROBES.md`, and the deleted outputs from `1ee3b0bc5^` (`u20_free.out.0`, `s07_chain.out`, `Rung2.out.0`, `t02_gram.out`, `t02_gram.out.5`, `t07_juxt.out.0`, `v02_term.out.0`, `.out.1`, `y01_named.fss`). Every probe the lines place "in the parent of 1ee3b0bc5" is there, and `1ee3b0bc5` is in the base's history.

## 181 (rewrite): FAIL
- Fidelity. Passage: "`explorations/apl/base/AplSyntax.fsi` keeps `⌿ ⍬ ⍎` above its escaped `+`". Source: at the base that file has no `⍬` or `⍎` at all; its first `⌿` is at `:419`, below its first escapes (`` `: `` at `:107`, `` `[ `` at `:170`, `` `+ `` at `:336`). The glyph above every escape is `⍝` at `:44`; the header says the rule at `:32-34`. `⌿ ⍬ ⍎` were the retired library's (`0ff5eae27~1:explorations/apl/v1/base/AplSyntax.fsi:86,117-118`). The dropped "Retired first library, worktree of `0ff5eae27~1`" set the scope of that clause, so cutting it made the clause false. Correction: replace "`explorations/apl/base/AplSyntax.fsi` keeps `⌿ ⍬ ⍎` above its escaped `+`" with "`explorations/apl/base/AplSyntax.fsi` keeps `⍝` (`:44`) above its first escape (`` `: ``, `:107`)". Notes come to 668 of 700, row 976.
- The other claims hold: `PreCompilation.rats:115` (backtick in `Opening`), `:56` (`Program = (Token w)+`), `PreParserState.java:256`. The dropped tokens' home is history, row 181. Status, reproducer and cold read pass.

## 183 (rewrite): FAIL
- Fidelity. Passage: "In `y⦇ a:Expr ⋄ b:Expr ⦈` (row 284) … leaving a call of an undefined `y` (`Variable y4 is not defined.`)". Source: `1ee3b0bc5^:explorations/apl/probes-4b/PROBES.md` (Q1, "the separator") gives the rule as `y4⦇ x:Expr ⋄ y:Expr ⦈`, with the bracket "left as a call to an undefined `y4`". The cold read could not resolve the `y`/`y4` mismatch.
- Nothing lost / cold read. Passage: "`probes-4b/y01_named.fss`". Source: the old line had `explorations/apl/probes-4b/y01_named.fss`. After `explorations/apl/v1-probes/p03b_escape.fss` the short form reads as `v1-probes/probes-4b/`, and the cold read could not place it.
- Correction: replace "In `y⦇ a:Expr ⋄ b:Expr ⦈` (row 284) the first gap takes `a ⋄ b` as the host's `DIAMOND`" with "In `y4⦇ x:Expr ⋄ y:Expr ⦈` (row 284) the first gap takes `x ⋄ y` as `DIAMOND`". Replace ", leaving a call of an undefined `y` (`Variable y4 is not defined.`)" with ", so the rule never matches (`Variable y4 is not defined.`)". Replace "`probes-4b/y01_named.fss`" with "`explorations/apl/probes-4b/y01_named.fss`". Notes come to 692 of 700, row 974.
- `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:428` (`DIAMOND`) and `:403-405` (`CIRC`/`RING`/`COMPOSE`) hold. The long gap spelling's home is history, row 183.

## 186 (keep): pass
The row's words are unchanged, and no commit since ae4f8e38a touches it. The probes `explorations/apl/v1-probes/p07_assign.fss` and `p07d_cell.fss` are in `1ee3b0bc5^`, and the template's history recipe reads them. NEGATIVE-BOUNDED fits: the spellings tried are named.

## 196 (rewrite): FAIL
- Fidelity. Passage: "wrapped by `parseTemplate` (`ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/TemplateParser.java:100-121`)". Source: at the base, `parseTemplate` runs from `:101` (line 100 is blank) to `:123`, and the wrapping `throw new MacroError("Could not parse '" + stuff + "'", e)` is at `:116`. The range starts on a blank line and stops inside the method. Correction: replace "`…/TemplateParser.java:100-121`" with "`ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/TemplateParser.java:116`". Notes come to 607, row 888.
- The rest passes: the story is cut, the fact is kept with row 186, and the probe `p16_decl.fss` is in `1ee3b0bc5^`.

## 211 (keep): pass
`PreCompilation.rats:56`, `:47-54` and `Regex.fsi:93` hold, unchanged since ae4f8e38a. The probes are given with "in the parent of 1ee3b0bc5".

## 213 (rewrite): FAIL
- Cold read. Passage: "The paper disagrees: §1 …". The section header and the row never name the paper, and the cold read could not resolve it. A worker checking the specification column would stumble too, because the chapter (`Specification/advanced/domain-specific-languages.tex`) only `\cite{fool09}`s it. The paper is "Growing a Syntax" (FOOL 2009). Its extract `research/extracts/growing-a-syntax.md:94-95` holds the quoted §1 sentence.
- Correction: replace "Every undefined name gets a span in the grammar, not the user's file: " with "An undefined name's span is in the grammar: ". Delete " (the book's Ex 14)", which the cold read also could not resolve and which is u20's provenance. Replace "The paper disagrees: §1 has a syntax error at a use site refer to the unexpanded use site;" with "The chapter's paper, `research/extracts/growing-a-syntax.md`, disagrees: §1 has syntax errors at use sites refer to the unexpanded use site;". Notes come to 691 of 700, row 998.
- Fidelity otherwise holds. `u20_free.fss` at the base is the version with `g` bound (its header says so). `1ee3b0bc5^:explorations/apl/rung-4/u20_free.out.0` shows `explorations/apl/base/AplSyntax.fsi:1:2: Variable g is not defined.` The `none` reproducer, with the edit named in the notes, is right. The dropped instances' home is history.

## 229 (rewrite): FAIL
- Cold read. Passage: "The paper the chapter defers to disagrees:". The paper goes unnamed, as in 213. Correction: replace it with "The chapter's paper, `research/extracts/growing-a-syntax.md`, disagrees:". Notes come to 659, row 1088.
- The rest holds. `s07_chain.fss:8` is live, and `1ee3b0bc5^:…/rung-2/s07_chain.out` gives `s07_chain.fss:8:51-59: Variable apl is not defined.` `Rung2.out.0` gives `Syntax Error` at `Rung2.fss:137:42`. The REPORT's "How to run" sets `explorations/apl/base` on `FORTRESS_SOURCE_PATH` (`rung-2/REPORT.md:59`).

## 235 (rewrite): pass
`T02Syn.fsi:30` (TExp gaps) stands above `:32` (TAtom gaps). `t02_gram.fss:136` asks `(2,3)⍴5`, `:97` prints `TA gaps: `, and `1ee3b0bc5^:…/t02_gram.out:42` reads `(2,3)⍴5 = TA gaps: 5 5 5`. `AplSyntax.fsi:212` holds the quoted rule. The setup is named, and nothing is dropped.

## 236 (rewrite): pass
`T02Syn.fsi:26-29` records the corrected order, so `none` is right. Rules `:30-33` stand above `:34`. `1ee3b0bc5^:…/t02_gram.out.5:43` holds the quoted `Failed to find any matching overload, args = (__DefaultVector[\RR64,2\],5.0:RR64)` for `aplReshapeV`, against `T02Syn.fsi:1:1-76`. `AplSyntax.fsi:212` is above `:220-221`.

## 239 (rewrite): pass
`t07_juxt.fss:22` holds the commented case (d). `1ee3b0bc5^:…/t07_juxt.out.0` gives `Variable apl is not defined.` The old span `20:24-25` no longer fits the line, so dropping it is right. The parenthesise workaround is confirmed by PROBES.md (y06, trap 1).

## 250 (rewrite): pass
`Syntax.rats:395-398` (SpecialChars, quoted exactly) and `:400` hold. `V02Syn.fsi:78` and `:91` hold. `v02_term.out.0` gives `V02Syn.fsi:78:13: Syntax Error` and `.out.1` gives `:91:26`, both in `1ee3b0bc5^`.

## 287 (rewrite): pass
The line matches PROBES.md (base) y06, traps 1 and 3: `Variable s6 is not defined.`, the bracket backtracking over `⦈`, and the nonterminal committing to its first alternative. The probe is in `1ee3b0bc5^`. PROBES.md is also in the base, so "its record is" reads correctly.

## Silent, closes, duplicates, questions, pairs
- The nine NEGATIVE-VERIFIED rows beside `silent` keep their status (item 265): pass.
- No closes, duplicates or pairs. The sibling reasoning in the assessment holds.
- `questions.md` has no measure. Its two confirmation runs are narrow, run from the main tree with the REPORT's source path, and map each outcome to keep or rewrite: pass.
