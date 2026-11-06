# Assessment, chunk c43 (base c124c6b65)

Read beyond the evidence: the cited parser lines at the base (`PreCompilation.rats:56,115`, `PreParserState.java:256`, `Literal.rats:403-405,428`, `Syntax.rats:395-400`, `syntax_abstractions/phases/TemplateParser.java:100-137`, `Expression.rats:96-104`); `git log a874948ac..c124c6b65` over `parser/preparser`, `Syntax.rats`, `syntax_abstractions/`, `parser/templateparser/` (only 8fe1daa8f, 2ed045233, 3c4dcdabc: toolchain and generated-source changes, no grammar change since the probes ran); the probe sources `rung-2/s07_chain.fss`, `rung-3/t02_gram.fss`, `T02Syn.fsi:26-34`, `t07_juxt.fss`, `rung-4/u20_free.fss`, `rung-5/v02_term.fss`, `V02Syn.fsi:15-24,75-91`; `explorations/apl/base/AplSyntax.fsi:33,199-221,336,387-391,423`; the rung REPORTs' "How to run"; the deletion commit of each gone probe (all `1ee3b0bc5`).

Cross-cutting: the evidence's runs of every probe reproducer (213, 229, 235, 236, 239, 250) stopped with exit 255 at `import AplCore`: the run's source path lacked `explorations/apl/base`, which each rung REPORT's "How to run" sets. That is a setup failure, not the claim's run; no claim below changes on a program's output. The claims rest on parser code unchanged since the probes. The rewrites name the run's setup, and `questions.md` gives the prober the two runs that would confirm 229 and 235.

## 181
Scope pass. Present meaning pass (lines 115, 256, 56 hold). Evidence pass: `none` with messages and probes, gone in 1ee3b0bc5. Comprehension pass. Ownership pass. Consistency fail: "Retired first library, worktree of `0ff5eae27~1`" is provenance story. Disposition **rewrite**: the story cut. Dropped: the retired-library provenance; home: history, row 181.

## 183
Present meaning fail: `Literal.rats:428`, `:403-405` resolve to `Specification/appendices/grammars/rats/Literal.rats` (93 lines), past its end; the intended file is `ProjectFortress/src/com/sun/fortress/parser/Literal.rats` (`DIAMOND` at 428, `CIRC/RING/COMPOSE` at 403-405). Evidence: probes "gone" with no route; now "in the parent of 1ee3b0bc5". Others pass. Disposition **rewrite**. Dropped: the long gap spelling `⍎ ( SPACE e:Expr SPACE )` (the short `⍎(v)` stays) and "`⍤` separates"; home: history, row 183.

## 186
All six pass: claim states what fails now; `none` with both messages and the gone probes (the template's history recipe reads them); workaround and siblings; no story beyond provenance. NEGATIVE-BOUNDED fits (spellings tried named). Disposition **keep**.

## 196
Present meaning fail: `TemplateParser.java:106-137` is ambiguous (two files); the throwing code is `syntax_abstractions/phases/TemplateParser.java:100-121`, `parseTemplate`. Consistency fail: "The declaration was the last plausible spelling after rung 1's three of `:=`, which is why…" is a search story. Disposition **rewrite**: path pinned; the story replaced by the fact (no gap left of `=` or `:=`, with row 186). Dropped: "the last plausible spelling after rung 1's three"; home: history, row 196.

## 211
All six pass: pins `PreCompilation.rats:56`, `:47-54`, `Regex.fsi:93` hold, unchanged since the row's commit; probes "in the parent of 1ee3b0bc5"; workaround; sibling 181; paper silent. Disposition **keep**.

## 213
Evidence fail: the reproducer `explorations/apl/rung-4/u20_free.fss` is the version that runs ("THIS VERSION IS THE ONE THAT RUNS: `g` bound first"); the claim needs `g`'s binding removed, so the cell names a passing program. Disposition **rewrite**: reproducer `none`, the probe and its edit in the notes, the run's setup named. Dropped: the `AplSyntaxB.fsi:1:2` and `q08_g.fsi:1:2` instances (gone probes, same span); home: history, row 213 (and its earlier line).

## 229
Present meaning fail: "`s07_chain.fss:8:51-59: …`" reads as lines 51-59 of a 9-line file (signal line-past-end); it is line 8, columns 51-59, and the line holds. Evidence: the probe is live (line 8 not commented) and reproduces with the rung's source path; the evidence run lacked it. Comprehension: "Worse than row 213's misplaced span" is comparison, kept as fact. Disposition **rewrite**: span written as line and columns; `Rung2.out.0` given its history route; setup named.

## 235
All checks pass but evidence: the evidence's run of the reproducer failed at the import, and the row did not say what the run needs. Disposition **rewrite**: setup named; `T02Syn.fsi:30`/`:32` and `AplSyntax.fsi:212` pinned; sibling 287 added (it names 235). Nothing dropped.

## 236
Evidence fail: the reproducer `t02_gram.fss` now has the corrected order (`T02Syn.fsi:26-29`: the rules stand above), so it prints the working result, not the claim's `Failed to find any matching overload`. Disposition **rewrite**: reproducer `none`; the edit that reproduces (rules at `T02Syn.fsi:30-33` moved below `:34`) and the old output's history route in the notes; workaround pinned at `AplSyntax.fsi:212` vs `:220-221`.

## 239
Evidence fail: the reproducer `t07_juxt.fss` has the failing case (d) commented out (line 22) and runs only the three working positions. Consistency fail: "as row 287 found when it met this again" and "Row 209 measured this boundary" are story. Disposition **rewrite**: reproducer `none`, the case and its old output in the notes; row 209's fact kept as fact; siblings 229, 287. Dropped: the old span `20:24-25` (the case has moved to line 22); home: history, row 239.

## 250
Evidence fail: `v02_term.fss` with `V02Syn.fsi` runs the bare spellings (`V02Syn.fsi:76-77`: "the bare and escaped spellings are v02_term.out.0 and .out.1"), so the reproducer passes. Disposition **rewrite**: reproducer `none`; the escaped edits at `V02Syn.fsi:78`, `:91` and their messages in the notes; `Syntax.rats:395-398`, `:400` hold. Dropped: `+⍀` from the workaround list (⍀ is a plain glyph, no escape question) and the long form of `EscapedSpecialChars`; home: history, row 250, and `Syntax.rats:400` itself.

## 287
Consistency fail: "Every rule order tried before that was found failed for that reason" is a debugging story; "Row 239 met again" restates row 239's defect inside this row. Disposition **rewrite**: story cut; the 239 fact kept only as a caution for a probe, pointing to row 239 (which holds the parenthesise workaround). Dropped: the story; home: history, row 287.

## Silent rows
Nine NEGATIVE-VERIFIED rows beside `silent`; words in `silent.txt`. Status kept on each (review-queue item 265).

## Pairs, duplicates, closes
None. 181/211 (escape rejected; check dead after `**`), 186/196 (assignment; declaration), 183/235 (undelimited; delimited greed), 236/287 (ordering inside a nonterminal: 236 the paren case, 287 the bracket-vs-nonterminal rule) are siblings, each naming the other. 250's overlap with 257 (chunk c25, `[_]` class) is a different character and rule: not a pair.

mech.py: `MECH: 10 lines, 0 failing, every check passes.`
