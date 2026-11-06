# Cold read, c43 (rows 181, 183, 196, 213, 229, 235, 236, 239, 250, 287)

Read with CLAUDE.md, `.claude/skills/fortress-repo/SKILL.md` and `references/` (not revival-changes.md or sources.md) only.

Terms common to all rows, checked against the skill:
- `NEGATIVE-VERIFIED`: `references/records.md` lists it as one of seven status words and says only that the row template defines it; the template is in the ledger, which I may not read. I read it as "the gap is confirmed to exist and is open" (it is not one of the three closing words), but whether it means "build a fix" or "known, leave it" I cannot tell from the skill. For the `design limit` rows I read the class as "no fix intended, use the workaround"; that reading is my guess, the skill defines no class names.
- "in the parent of 1ee3b0bc5": I read it as "the file was removed by commit 1ee3b0bc5; print it with `git show 1ee3b0bc5^:PATH`", by analogy with `references/library.md`'s `git show ab067d9b6^:...`. Unclear wording, but resolvable.
- "full text: history, row N": the row's earlier text in `explorations/fortress-gap-ledger-history.md` (`references/records.md`). Clear.
- "apl rung N" (Found by): the APL experiment under `explorations/apl/`, stage N. "Rung" is not defined in the skill; it only appears in test and folder names. Unclear wording, harmless.
- "siblings: N": I read it as related rows. Not defined; harmless.
- Macro / grammar vocabulary (gap, expander, template, macro bracket `⦇ ⦈`, production, nonterminal, `SPACE`, preparser): the skill says only that a `grammar` declaration in an api adds DSL syntax and is expanded by a generated Rats! parser (`references/build-and-caches.md`). The syntax-abstraction language itself is a language concept I lack and could not find in the skill; I read "gap" as a typed pattern variable such as `a:Expr` in a production and "expander" as the keyword that opens a use of the grammar (`apl⦇ … ⦈`).

## Row 181
- **Defect:** in a grammar api, the backtick escape for the macro language's special characters (needed for APL's `+` and `*`) is taken by the preparser as an opening quote that wants a closing `'`, so the api is rejected with "Unmatched delimiter" errors; inside `⦇ ⦈` it also breaks their pairing.
- **Where:** the parser's preparser, before walk or the compiled path: `PreCompilation.rats:115` (backtick in `Opening`), `PreParserState.java:256` (pairs it only with `'` or `’`).
- **Reproduce:** no reproducer; probes `explorations/apl/v1-probes/p08a_g.fsi` (fails), `p08b_g.fsi` (works), `p08d_g.fsi`, from the parent of 1ee3b0bc5. How to run a `.fsi` probe is not said.
- **Status:** open gap in the parser; the workaround is to put an APL glyph above the escape so the preparser's token loop stops before it and never reports (`explorations/apl/base/AplSyntax.fsi` does so). Whether to fix it now: see the status-word note above.
- **Could not resolve:** the workaround works because of another defect (the token loop with "no end-of-file anchor" silently stops): clear once read twice, but a worker should know that fixing the token loop would break the workaround. "the api" means the grammar api file; clear. The paths `PreCompilation.rats` and `PreParserState.java` carry no directory (unclear wording; presumably under `ProjectFortress/src/com/sun/fortress/parser/`).

## Row 183
- **Defect:** a gap of the host type `Expr` that no delimiter closes is greedy: it consumes a following terminal that the host Fortress grammar knows as an operator (`≡`, `⋄`, `∘`), and Rats never backtracks into the nonterminal for a shorter match, so the use misparses or the expander itself fails to parse.
- **Where:** the parser (DSL grammar expansion), host operator tokens in `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:428` (`DIAMOND`) and `:403-405` (`RING`).
- **Reproduce:** no reproducer; probes `explorations/apl/v1-probes/p03b_escape.fss` and `probes-4b/y01_named.fss`, from the parent of 1ee3b0bc5. Expected symptoms: `Variable esc2 is not defined`, `Variable y4 is not defined.`, or a parse such as `aplDy("rho", v EQV (1 4), v)`.
- **Status:** design limit: use a workaround, bracket the gap (`⍎(v)`) or follow it with a sub-language nonterminal or a terminal in no host operator table.
- **Could not resolve:** `probes-4b/y01_named.fss` gives no parent directory (I assume `explorations/apl/probes-4b/`, as in row 287). The example `y⦇ … ⦈` gives `Variable y4 is not defined.`, not `y`: the `4` is unexplained (unclear wording, or the name is mangled). "row 284" is cited but its relation is not said. `aplDy("rho", …)` is an internal helper name I take on trust.

## Row 196
- **Defect:** a template whose expansion is a declaration with a gap left of `=` (or `:=`) fails: the template parser reads the left side with its `AssignLeft` production, the gap's text arrives null, and `IdOrOp`'s constructor throws, reported as `MacroError: Could not parse …`.
- **Where:** the parser, syntax abstractions: `TemplateParser3.pNoNewlineExpr$AssignLeft`, wrapped by `parseTemplate` in `ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/TemplateParser.java:100-121`.
- **Reproduce:** probe `explorations/apl/v1-probes/p16_decl.fss`, from the parent of 1ee3b0bc5; look for the `IllegalArgumentException: Parameter 'text' to the IdOrOp constructor was null`.
- **Status:** open implementation gap; meanwhile APL's `←` is a workspace call (row 195), not a Fortress binding. With row 186 no gap may stand left of `=` or `:=` at all.
- **Could not resolve:** the `<!@#$%^&*<Id t >*&^%$#@!>` markers are, I assume, the template parser's internal gap placeholders: unclear but readable. "a workspace call" is APL-experiment vocabulary not explained here (unclear wording). Rows 186 and 195 are cited without their content.

## Row 213
- **Defect:** a static error that arises inside an expansion (an undefined name, a failed overload) is reported at the grammar api's line 1 rather than at the use site, and kills the whole component.
- **Where:** DSL expansion's source spans; the error itself is from the static checks after expansion; the file seen is `AplSyntax.fsi:1:2` or `:1:1-107`. Which code assigns the span is not named.
- **Reproduce:** run `explorations/apl/rung-4/u20_free.fss` with `g`'s binding removed, as `explorations/apl/rung-4/REPORT.md`, "How to run", says; expect `Variable g is not defined.` at `AplSyntax.fsi:1:2`. A missing rank overload gives a unification error at `AplSyntax.fsi:1:1-107`.
- **Status:** open implementation gap, with the specification's DSL chapter cited.
- **Could not resolve:** "the book's Ex 14": which book is not said (unclear wording; perhaps an APL text the experiment follows). "The paper disagrees: §1 …": which paper is not named here (row 229 says "the paper the chapter defers to", still unnamed; I could not find it in the skill). The last sentence, "a name error is no syntax error, but its span is the definition site", reads two ways: that the paper does not strictly cover name errors, so the span rule is an inference, or that the paper's span is the definition site. Unclear wording. "rank overload" is APL vocabulary (overload per array rank), understandable.

## Row 229
- **Defect:** a use of the expander whose bracketed text matches no production is not a syntax error: the text is left unparsed and the keyword is read as an ordinary identifier, so the message is `Variable apl is not defined.`, naming neither the sub-language nor the wrong line. A partial match does give `Syntax Error` at the right column.
- **Where:** the parser, DSL expansion of a use site; the file of the use (`s07_chain.fss`, line 8, columns 51 to 59).
- **Reproduce:** run `explorations/apl/rung-2/s07_chain.fss` as `explorations/apl/rung-2/REPORT.md`, "How to run", says, with `explorations/apl/base` on the source path; the use is `apl⦇ a ← b ← 1 2 ⋄ a ⦈`. Contrast `explorations/apl/rung-2/Rung2.out.0` from the parent of 1ee3b0bc5.
- **Status:** open implementation gap; the specification chapter defers to a paper that requires syntax errors at use sites to refer to the unexpanded program.
- **Could not resolve:** "the paper the chapter defers to": unnamed (unclear wording; the skill does not name it). "on the source path": how to set it (an environment variable, a flag) is not in the skill as far as I found; REPORT.md presumably says. A reproducer kept in `explorations/apl/rung-2/` while its output file is only in the parent of 1ee3b0bc5: I read it as the `.fss` still in the tree and the `.out` removed; unclear.

## Row 235
- **Defect:** gaps are greedy even inside a rule with explicit delimiters: in `( a:AplE SPACE , SPACE b:AplE ) ⍴ r`, the first gap parses `a , b` as one catenation once the grammar has a catenate rule, PEG does not retry it shorter, and the rule never matches; the closing parenthesis does not stop the gap.
- **Where:** the parser (PEG / Rats! semantics of DSL productions); `explorations/apl/rung-3/T02Syn.fsi:30` (`TExp` gaps) above `:32` (`TAtom` gaps).
- **Reproduce:** run `explorations/apl/rung-3/t02_gram.fss` per `explorations/apl/rung-3/REPORT.md`, "How to run", with `explorations/apl/base` on the source path; it printed `TA gaps: 5 5 5`, showing the atom rule fired instead.
- **Status:** design limit: use atom gaps, as `explorations/apl/base/AplSyntax.fsi:212` does; enough for microGPT's `(n,NE)⍴x`, not for `(2+1,3)⍴x`.
- **Could not resolve:** `AplE`, `AplAtom`, `TExp`, `TAtom` are the experiment's nonterminals (expression vs atom); readable from context. `SPACE` as an item of a production is a macro-language concept I lack (I read it as required whitespace). "`TA gaps: 5 5 5`, the atom rule firing": why that output shows it is not explained; I take it on trust.

## Row 236
- **Defect:** a rule whose left argument is parenthesised must stand above the plain rule for the same glyph; placed below, `AplAtom`'s own `( AplE )` alternative consumes the parenthesis first, the special rule is never tried, and `(2,3)⍴5` becomes a plain dyadic `⍴` on a vector, failing in the library with `Failed to find any matching overload … for aplReshapeV`, reported against the grammar api.
- **Where:** the parser (rule order in a DSL grammar), failing at run time in the APL library; `explorations/apl/rung-3/T02Syn.fsi:30-34`; `explorations/apl/base/AplSyntax.fsi:212`, `:220-221`.
- **Reproduce:** `explorations/apl/rung-3/t02_gram.fss` with the two `(a,b)⍴` rules of `T02Syn.fsi:30-33` moved below `:34`; output `t02_gram.out.5` in the parent of 1ee3b0bc5.
- **Status:** design limit; the notes say rule order is the whole fix, so leave it and order rules this way.
- **Could not resolve:** "row 230's shape": the shape of what (the error message's form, the span against the api?) is not said; unclear wording. The run instructions are not repeated here (presumably as row 235). Walk or compiled path not said; I assume walk, since DSL use runs under walk in the APL experiments, but the skill does not confirm it.

## Row 239
- **Defect:** a bracketed use of the expander cannot be an operand of a juxtaposition: `("" apl⦇ 5 ⦈)` gives `Variable apl is not defined.`, though the same use parses as a function argument, as a binding's right-hand side, and as an argument inside a juxtaposition.
- **Where:** the parser, juxtaposition with a DSL use; `explorations/apl/rung-3/t07_juxt.fss:22`.
- **Reproduce:** uncomment case (d) at `t07_juxt.fss:22` (`println(("five = " apl⦇ 5 ⦈))`) and run per `explorations/apl/rung-3/REPORT.md`, "How to run"; old output `t07_juxt.out.0` in the parent of 1ee3b0bc5.
- **Status:** open implementation gap; workarounds: bind the use first, wrap it in a call, or parenthesise the use itself.
- **Could not resolve:** "an operand of a juxtaposition" vs "an argument inside a juxtaposition": the distinction (operand of the juxtaposition operator itself vs an argument of a call that sits in a juxtaposition) reads two ways; Fortress juxtaposition is a language concept the skill's core names only in CLAUDE.md. "The newline-terminated form" (row 209) is a second form of use I do not know; language concept, not in the skill.

## Row 250
- **Defect:** `\` and `.` are not among the macro language's SpecialChars, so they cannot take the backtick escape: `` `\ `` and `` `. `` in a production are Syntax Errors, while the bare characters parse and match.
- **Where:** the parser, `ProjectFortress/src/com/sun/fortress/parser/Syntax.rats:395-398` (`SpecialChars`) and `:400` (`EscapedSpecialChars`); seen in `explorations/apl/rung-5/V02Syn.fsi:78` and `:91`.
- **Reproduce:** run `explorations/apl/rung-5/v02_term.fss` (bare spellings work); escape `\` at `V02Syn.fsi:78` or `.` at `:91` to get `V02Syn.fsi:78:13: Syntax Error` or `:91:26`; outputs `v02_term.out.0`, `.out.1` in the parent of 1ee3b0bc5.
- **Status:** design limit: write `+\`, `∘.×`, `+.×` with the bare character. Row 181's glyph-above rule does not apply. `¨ ⍀ ⍣ ⌷` work as plain items.
- **Could not resolve:** how to run is not given (no REPORT.md cited, unlike the rung-2 and rung-3 rows); I assume `explorations/apl/rung-5/REPORT.md`. Otherwise clear.

## Row 287
- **Defect:** rule order matters only inside an ordinary nonterminal: alternatives of one macro bracket name each include the closing `⦈`, so a failed shorter one backtracks and a longer one below can still match; inside a nonterminal PEG commits to the first success, so the folded reduction `+/l×r` must stand above the plain `+/v`.
- **Where:** the parser (PEG semantics of DSL productions); probe `explorations/apl/probes-4b/y06_fold.fss`.
- **Reproduce:** the probe, from the parent of 1ee3b0bc5; its record is `explorations/apl/probes-4b/PROBES.md` (y06). A probe must not juxtapose a bare macro bracket as an argument (row 239).
- **Status:** design limit: put the pair in a nonterminal with the folded rule first.
- **Could not resolve:** "macro bracket name" (an expander keyword such as `apl`?) and "a bare macro bracket": language concept of the macro language I lack. "a shorter one above a longer one still lets the longer match" contradicts nothing but needs "because the shorter one fails at `⦈`" to be read in; unclear wording. "`Variable s6 is not defined.`" names an `s6` that appears nowhere else; unexplained. Whether `PROBES.md` is in the tree or only in the parent of 1ee3b0bc5 reads two ways.
