# Cold read: c-run4/c44 (rows 187, 202, 203, 207, 210, 242, 244, 269, 273, 274)

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its references (not `revival-changes.md` or `sources.md`).

Terms that every row here uses, and that the skill does not resolve:

- `NEGATIVE-VERIFIED`: `records.md` lists it as one of seven status words and says "the row template defines each", but the template lives in the ledger, which a cold reader may not read. I read it as "the gap is confirmed to exist, by a run", and, since it does not close the row, as open. I cannot tell from it whether a worker should fix it or leave it. Unclear wording (missing definition).
- `Reproducer: none` with probes "in the parent of 1ee3b0bc5" (or 7c3218956): I read this as "the probe files were deleted by that commit, so print them with `git show 1ee3b0bc5^:PATH`". That is an inference. The rows never say the files are gone or give the command. Unclear wording.
- `Found by: apl rung 1 / 2b / 4 / feasibility`: labels for stages of the APL experiment. They tell a worker nothing to act on. Unclear but harmless.
- `full text: history, row N`: I read this as pointing to `explorations/fortress-gap-ledger-history.md` (named in `records.md`). Clear enough.
- `siblings: N`: I read it as related rows. Clear enough.
- "gap" in the DSL sense (an `Id` gap, a `*`-bound gap, a `Maybe`-typed gap): the skill defines a DSL grammar (`build-and-caches.md`) but not gaps, pattern variables, templates or splices. Row 274's notes suggest a gap is a bound pattern variable of a grammar production, used in its template. That is a language concept the skill lacks.
- Path: no row says walk, the compiled path or both. `SKILL.md` puts grammar expansion (phase 3) among the phases both paths share, and every probe here seems to have run under walk, so I take "both" as likely but unstated. `compiler.md:91` says the compiled path parses DSL importers with other code (`GraphRepository.syntaxExpand`), so "both" is not certain.

## Row 187

- **Defect:** A `NOT` predicate inside a group that is repeated (`{ NOT ⦈ _ }*`, meaning "any character other than `⦈`, repeated") does not stop the repetition. The generated parser consumes the rest of the file, and the macro's phrase never ends, so the parse fails with a Syntax Error one line past the end of the use.
- **Where:** The parser for user grammars (DSL grammars), in `ProjectFortress/src/com/sun/fortress/parser/Syntax.rats` (`:249-265` for `NOT`, `:281-287` for `*`, `:325-326` for groups). Path not stated (see above).
- **Reproduce:** Probe `explorations/apl/v1-probes/p09_comment.fss`, with its captured failure `.out.0`, as of the parent of 1ee3b0bc5. Expect `Error occurred while instantiating and executing a temporary parser: … Syntax Error`.
- **Status:** Open, confirmed. Nothing says to wait on a question, so a parser fix seems in scope. A workaround exists (a right-recursive nonterminal, `NOT ⦈ _ t:AplCmt | NOT ⦈ _`), so the fix is not urgent.
- **Could not resolve:**
  - "the expander never closes": I could read it as "the expansion does not terminate" or as "the sub-language's closing bracket is never matched". Unclear wording.
  - "Verified on the retired first library, in a worktree of `0ff5eae27~1`": the skill names no "first library" and no retirement. It could be an earlier APL library or an earlier Fortress library. It also names a different commit from the probe's "parent of 1ee3b0bc5", and I cannot tell which tree a worker should use to reproduce. A concept I lack, and unclear wording.
  - "the book's comment": an APL book, not named. Unclear wording.
  - "(works; `.out.0` the failure)": I read it as "the probe as tracked has the workaround and works, and `.out.0` holds the output of the failing form". Two readings are possible. Unclear wording.

## Row 202

- **Defect:** In a DSL template, a pattern variable of type `Id` can be substituted only where it is the argument of a call. Used as the whole template, inside parentheses or in a juxtaposition, the expansion crashes or fails to parse. So a sub-language cannot read an arbitrary name through one gap. It needs one grammar alternative per name, a fixed set of names.
- **Where:** The macro template parser and `Transform.forVarRef` (`ProjectFortress/src/com/sun/fortress/.../Transform.java:122-124`), which looks a `VarRef`'s id up in the hygiene environment and never substitutes a gap inside it. Generated `TemplateParser4.pExpression$AssignLeft`. Path not stated.
- **Reproduce:** Probes `explorations/apl/v1-probes/q02b_g.fsi` and `q03_g.fsi`, as of the parent of 1ee3b0bc5. Expect, by form: `Parameter 'text' to the IdOrOp constructor was null` (whole template); `Parameter 'apiName' to the IdOrOpOrAnonymousName constructor was null` (juxtaposed, `<[ q03ref n ]>`); `MacroError: Could not parse '( <!@#$%^&*<Id i >*&^%$#@!> ) + 1 '` (parenthesised).
- **Status:** Open, confirmed, and the specification's DSL chapter is cited, with a paper whose Fig. 5 substitutes into any term position, so the intended behaviour seems settled: build a fix. Not stated outright.
- **Could not resolve:**
  - "read" in bold: I take it as "used as a value", against bound. Unclear but guessable.
  - "The paper's Fig. 5": which paper is not said (`Papers/` has several). Unclear wording.
  - "row 182, its duplicate": I read it as "row 182 is a duplicate of this row and supplied the parenthesised case". Clear enough.
  - "workaround `⍎(v)`": I do not know what `⍎` does in this sub-language, or how it avoids the gap. A concept I lack (APL execute?).
  - "the hygiene environment": hygiene is not defined in the skill. A concept I lack, but guessable from macro systems in general.
  - The full path of `Transform.java` is not given. Unclear wording, minor.

## Row 203

- **Defect:** If a grammar production uses as a terminal a string that is a valid identifier (for example `v`), that string becomes a keyword of the whole language. Then `v` can no longer be parsed as a name anywhere, in templates too.
- **Where:** `ItemDisambiguator.java:109-122` makes the terminal a `KeywordSymbol`. `ParserMaker.java:296-316` adds every keyword of a user grammar to `FORTRESS_KEYWORDS`, which the `Id` rule excludes. Path not stated.
- **Reproduce:** Probes `explorations/apl/v1-probes/q04_g.fsi`, `q05` and `q06`, as of the parent of 1ee3b0bc5. Expect `MacroError: Could not parse '(v) '`. `q05` shows that the template `<[ (v) ]>` alone parses.
- **Status:** Open, confirmed, the specification silent and the paper silent ("any sequence of Unicode characters", §4). I cannot tell whether a worker should fix it (a terminal should not reserve a name) or leave it, since there is a verified workaround (`[v]`, a character class). Leave it unless a brief asks, I would guess.
- **Could not resolve:**
  - "The paper": not named. Unclear wording.
  - "the two after it, q05 and q06": their extensions (`.fsi` or `.fss`) are not given. Minor.
  - Otherwise clear.

## Row 207

- **Defect:** In the APL sub-language, when a name is bound by expanding to a lambda (the "lambda route"), each name can be bound only once per block. A second `←` to the same name, or a host local that has the same name as the binder, gives `Variable v is already declared`. Every indexed assignment counts as a rebinding, because `AplArr` is a `value object`.
- **Where:** Fortress's own scoping (`Specification/basic/declarations.tex`, "Reach and Scope of Declarations"), not the macro system. The APL library under `explorations/apl/`. Path not stated.
- **Reproduce:** `explorations/apl/v1-probes/q07_rebind.fss` (error at 16:62) and `q01_bind.fss` (error at 14:38), as of the parent of 1ee3b0bc5.
- **Status:** A design limit of the specification, so leave it. Work around it by binding a cell, so that a later `←` is a `put`.
- **Could not resolve:**
  - "the lambda route": not defined. I infer that the sub-language turns `x ← e; rest` into a lambda applied to `e`, with parameter `x`. A concept I lack, and unclear wording.
  - "binder" and "host local of the binder's name": I read "binder" as the name that `←` binds, and "host" as the Fortress code around the `apl⦇ ⦈` phrase. Two readings are possible. Unclear wording.
  - "a **cell**": no cell type is named in the skill or the row. A concept I lack.
  - "Ex 5, 37, 38": exercises of an unnamed chapter. Unclear wording.
  - "pattern variables are never renamed": what this implies for the defect is not said. Unclear wording.

## Row 210

- **Defect:** A sub-language phrase that has no terminator can silently go on onto the next line whenever that line can extend it. A space between symbols in a production becomes the optional whitespace `w`, and `w` crosses line breaks. So `aply 1 2` above a line `3 4` prints `1 2 3 4`.
- **Where:** `ProjectFortress/src/com/sun/fortress/parser/Spacing.rats:92` (`w = Whitespace*`), which `ComposingSyntaxDefTranslator.java:147-148` emits for a space. The APL grammar under `explorations/apl/`. Path not stated.
- **Reproduce:** `explorations/apl/v1-probes/q11_nlform.fss`, as of the parent of 1ee3b0bc5.
- **Status:** A design limit of the parser, specification silent: leave it, and separate statements with `⋄`, a trailing `⍝` comment, a break before a glyph with no dyadic rule, or row 209's `AND NEWLINE`.
- **Could not resolve:**
  - `aply`: not explained. I take it as a probe's production. Unclear wording.
  - "a numeral (row 228), a dyadic glyph (238), a dfn's operand (241), or a name under a strand rule over names (253)": four other rows that I cannot read. "dfn" and "strand" are APL concepts that the skill lacks.
  - "row 209's `AND NEWLINE`": what `AND NEWLINE` is, a grammar construct or an APL rule, is not said. A concept I lack.
  - "A regex is safe: a slash closes it": I could not tell which regex is meant (a sub-language of regexes? a regex terminal in a grammar?). Unclear wording.
  - "siblings: 244": clear.

## Row 242

- **Defect:** An `Id` gap does not accept `_`. So APL's throw-away name, `_ ← e`, is a Syntax Error, where the same line with an ordinary name runs.
- **Where:** `ProjectFortress/src/com/sun/fortress/parser/Identifier.rats:52-54` (`Id`, no `_`); `:62-65` (`BindId`, which adds `_`). Path not stated; under walk, `_` is otherwise accepted as a lambda parameter.
- **Reproduce:** `explorations/apl/rung-4/u18_gram.fss` with `x` replaced by `_` at line 27, for the line `{a ← 3 3⍴1 ⋄ _ ← {a[1;1] ← 0}⍬ ⋄ a} 0`. Expect `u18_gram.fss:27:34: Syntax Error`, three tokens early. Captured: `explorations/apl/rung-4/u18_gram.out.1`, as of the parent of 1ee3b0bc5.
- **Status:** Open, confirmed, with a specification section cited ("Do Expressions"), so I read it as a fix to build (let an `Id` gap, or the gap a binder uses, take `BindId`). The cause is "by reading, not run", so a worker should confirm it first. Workaround: an ordinary name.
- **Could not resolve:**
  - Why "Do Expressions" is the cited section: I guess it says `_` binds in a block. Unclear wording.
  - "Ex 23": an exercise of an unnamed chapter. Unclear wording.
  - "the furthest-failure position": a Rats! concept, guessable.

## Row 244

- **Defect:** A line break inside a production's sequence of symbols is not optional whitespace. It becomes a required line break at the use site, so a production written across two lines never matches a use written on one line.
- **Where:** `ComposingSyntaxDefTranslator.java:147-149` maps `SPACE` and a literal space to `w`; a newline becomes `br` (`:152-153`). The APL grammars `explorations/apl/rung-4/u17_gram.fss` and `explorations/apl/base/AplSyntax.fsi`. Path not stated.
- **Reproduce:** Split `(a,b,c)⍴x`'s production between `)` and `SPACE ⍴`, or put the `NOT [A:Za:z0:9]` of `AplFnName`'s `MyFirstFunction` alternative on the next line, in `u17_gram.fss`. Captured: `explorations/apl/rung-4/u17_gram.out.0`, `.out.1`, `.out.4`, as of the parent of 1ee3b0bc5. The tracked file has both on one line.
- **Status:** A design limit of the parser, specification silent: leave it. Write each production on one line. A break before `=>` is harmless.
- **Could not resolve:**
  - `br`: not defined (I guess a required line-break nonterminal of `Spacing.rats`). A concept I lack, guessable.
  - "siblings: 210, 208": I cannot read row 208. Minor.
  - Which error the `.out` files hold is not quoted. A worker would not know what to look for. Unclear wording.

## Row 269

- **Defect:** A grammar can be declared only in an api, not in a component, though the specification lists the `ExternalSyntax` declaration among a component's declarations. In a component, the preparser fails with a Syntax Error, not a named diagnostic.
- **Where:** `ProjectFortress/src/com/sun/fortress/parser/Declaration.rats:42-51` (`Decl`, no `GrammarDef`), against `AbsDecl` (`:70-92`), which has it at `:92`. Specification: `Specification-1.0-frozen/basic/declarations.tex:113-118`. Path: the parser, so both.
- **Reproduce:** `explorations/apl-probes/b11_gram_in_component.fss`, as of the parent of 7c3218956. Expect `Error occurred while instantiating and executing a temporary parser: … (…:8:8: Syntax Error)`.
- **Status:** Classed a design limit, so I read it as "leave it, and use three files: a grammar api, a stub component that exports it, and the using component". But the claim says the specification permits the declaration in a component, which reads like a conflict or an implementation gap. A worker cannot tell whether to fix the parser or not.
- **Could not resolve:**
  - Whether `ExternalSyntax` is the same thing as a grammar declaration: the claim implies so but does not say. A concept I lack.
  - The class "design limit" against a specification that allows the form: two readings. Unclear wording.
  - "preparser": not defined. I guess the pass that finds a file's imported grammars before the parse. A concept I lack.
  - "row 190 adds that the three need not sit in one directory": clear.

## Row 273

- **Defect:** A gap bound under a `*` repetition, used in a template without the `**` splice, crashes the generated parser with a raw Java `ClassCastException` (`LinkedList` cannot be cast to `Node`) and no Fortress diagnostic. `forListDepth` returns the raw Java list, with its conversion commented out.
- **Where:** `ComposingSyntaxDefTranslator.java:489-490` (`forListDepth`, `return source;`), with the commented-out conversion at `:491-504`. Generated `TemplateParser15`. Path not stated.
- **Reproduce:** `explorations/apl-probes/b06b_repeat.fss`, as of the parent of 7c3218956. Expect `Error occurred while instantiating and executing a temporary parser: com.sun.fortress.parser.templateparser.TemplateParser15 (class java.util.LinkedList cannot be cast to class com.sun.fortress.nodes.Node …)`.
- **Status:** Open, confirmed, specification silent. Either the conversion should be finished or the misuse should get a diagnostic; the row does not say which. Workaround: use the gap only in the typed splice of row 272.
- **Could not resolve:**
  - "`*`-bound gap" and "the `**` splice": concepts of the template language that the skill lacks. I read them as "a pattern variable bound under `*`" and "the template syntax that splices a list".
  - "the typed splice of row 272": row 272 cannot be read. Unclear what a worker should write.
  - Whether the fix is "implement the commented-out conversion" or "report a Fortress diagnostic": two readings. Unclear wording.

## Row 274

- **Defect:** `?` works on an unbound grammar symbol, but a bound pattern variable under `?` (a gap of type `Maybe`) is not implemented. The run stops with `MacroError: not supported now`.
- **Where:** `ComposingSyntaxDefTranslator.java:508-509` (`forOptionDepth`), with twenty lines of implementation commented out at `:510-529`. Path not stated.
- **Reproduce:** `explorations/apl-probes/b07a_option.fss` (works, prints `7` with and without the optional symbol) and `explorations/apl-probes/b07b_optvar.fss` (fails with `Exception in thread "main" com.sun.fortress.exceptions.MacroError: not supported now`), as of the parent of 7c3218956.
- **Status:** Open, confirmed, specification silent. Rows 180 and 197 depend on it (APL's optional reduce slash; the elided axis `m[1;]`), so a fix has users: I read it as "build a fix, starting from the commented-out code". Not stated outright.
- **Could not resolve:**
  - "unbound grammar symbol" against "bound `?` pattern variable": I read "bound" as "named with a pattern variable, `x:Sym?`". A concept the skill lacks, guessable.
  - "Rows 180 and 197 lean on it": I read it as "those rows' limits come from this gap". Clear enough.
