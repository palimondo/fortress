# APL in Fortress — can it be a library, and can it be a sublanguage?

Walk interpreter, JDK 25, `FORTRESS_THREADS=1`, tree as built (nothing rebuilt,
no test suite run, nothing outside this directory touched). Every probe here
was run; its transcript is the `.out` file beside it, failures kept.

## Verdicts

- **A — does the syntax-extension mechanism run on this tree?**
  **POSITIVE-VERIFIED.** The shipped example `ProjectFortress/syntax_abstraction_tests/ForUse.fss`
  (a user `grammar` that adds a whole `for` loop to `Expr`) runs unchanged and
  prints its full expected output (`a01_existing_ForUse.out`). My own grammar —
  an api declaring `grammar Twice extends { Expression }` with
  `Expr |:= twice⦇ a:Expr ⦈ => <[ (a) + (a) ]>`, used from a separate component —
  worked on the first spelling and printed `42` / `6` (`a02_twice.fss`,
  `a02_twice.out`). All 21 non-`SXX` tests in
  `ProjectFortress/syntax_abstraction_tests/` pass (`existing-tests/*.out`).
- **B — what subset of the mechanism is implemented?** **Mixed, all probed; see
  the table in §B.** New nonterminals, extension of `Expr`, pattern variables,
  ordered alternatives, `<[ ]>` templates, `{ }` groups, character classes,
  repetition `*`/`+` with the `**` splice, `?` on an *unbound* symbol,
  grammar-extends-grammar with `Expr from G` / `private` / `without`, and
  `case … of Cons/Empty` all work. Three things do not: a **bound** `?` variable
  (`MacroError: not supported now`, code commented out at
  `ComposingSyntaxDefTranslator.java:509`), a `*`-bound gap used **without**
  `**` (raw `ClassCastException` from the generated parser), and `case … of` over
  **AST constructor names** (`Unrecognized constructor name: IntLiteralExpr` —
  only `Cons`/`Empty` exist, `TemplateVarRewriter.java:127-146`). A grammar may
  only be declared in an **api**, never in a component.
- **C — can a grammar lex the APL glyph block?** **POSITIVE-VERIFIED for the
  sub-grammar; NEGATIVE-VERIFIED for ordinary Fortress.** APL functional symbols
  are ordinary terminals inside a user grammar: `b09a_glyph.fss` discriminates
  `⍳ ⍴ ⍵ ⍺ ⌽ ⍉` (U+2373, 2374, 2375, 237A, 233D, 2349) as terminals, and
  `b09b_charclass.fss` matches the character *interval* `[⍳:⍺]`. At the ordinary
  Fortress level `opr ⍳(x)` is a `Syntax Error` and `⍳` is not an identifier
  character either; this is settled by the specification, not only by the
  implementation — `basic/lexical-structure.tex:301-303` says the operator
  characters are *enumerated* in `appendices/operators.tex`, and the only
  U+23xx codepoints that appendix enumerates are U+2308–U+230B. The shared
  glyphs do work: `∘ ⊂ ⊃ ⊖ × ÷` as user operators, monadic and dyadic of the
  same symbol coexisting (`c13_shared_glyphs.fss`), and `⌈ ⌉` / `⌊ ⌋` as user
  **bracketing** operators (`c12b`) — `⌈` is a left encloser, not an infix
  operator, so `opr ⌈(x)` fails.
- **D — the library half.** **POSITIVE-VERIFIED.** `d20_apl.fss`: a
  `value object AplArr(shape: List[\ZZ32\], data: List[\RR64\])` with eleven
  primitives — `IOTA`, monadic and dyadic `RHO`, `+ - × ÷ MAX MIN` elementwise
  with scalar extension, `⊖` reverse, `^T` transpose, `∘` outer product,
  `opr BIG APLUS` (a genuine Fortress big operator) and `PLUSRED` (`+/`) — all
  run. `PLUSRED IOTA 5` = `15.0`; `(vecA(<|2.0,3.0|>)) RHO (IOTA 6)` prints the
  2×3 matrix.
- **E — the grammar half.** **POSITIVE-VERIFIED.** `e30_aplg.fsi` declares
  `apl⦇ … ⦈`, a right-to-left APL parsed over the library of D, with strand
  notation, monadic/dyadic primitives and `+/`. Twelve expressions run
  (`e30_apl.out`), including `apl⦇ +/ ⍳ 5 ⦈` = `15.0`,
  `apl⦇ 2 3 ⍴ ⍳ 6 ⦈` = the 2×3 matrix, `apl⦇ ⍉ 2 3 ⍴ ⍳ 6 ⦈`,
  `apl⦇ 3 4 ⌈ 4 3 ⦈` = `4.0 4.0` (the glyph the main lexer calls a left
  encloser, used here as a dyadic function), and `apl⦇ 2 × 3 + 4 ⦈` = `14.0`,
  i.e. right-to-left, not Fortress precedence.

---

## A. The mechanism

### What the specification actually says

Chapter 27, `Specification/advanced/domain-specific-languages.tex`, is **a
stub**, byte-identical in `Specification-1.0-frozen/`:

```
\chapter{Support for Domain-Specific Languages}
\chaplabel{syntax-expanders}

\note{This chapter will include the Fortress syntactic abstraction mechanism
described in ~\cite{fool09}.}
```

So there is no chapter-27 feature list in this tree to classify against. The
spec's other three mentions are: `basic/declarations.tex:113-118`
(`Decl ::= … | ExternalSyntax`, footnoted "these declarations do not introduce
named entities"), `basic/lexical-structure.tex:629-634` (scanning is described
"only for programs that use the standard Fortress syntax without using this
facility"), and the one piece of concrete syntax,
`appendices/grammars/concrete-syntax.tex:434-448`:

```
ExternalSyntax ::= syntax OpenExpander Id CloseExpander = Expr
OpenExpander   ::= Id | LeftEncloser | Encloser
CloseExpander  ::= Id | RightEncloser | Encloser | end
```

**That form is not implemented** (`b12_spec_syntax_form.fss`); there is no
`ExternalSyntax` production and no such AST node anywhere under
`ProjectFortress/src/com/sun/fortress/parser/`. What `syntax twice e end = (e) + (e)`
produces is:

```
/home/user/fortress/explorations/apl-probes/b12_spec_syntax_form.fss:9:16-27:
    Unmatched delimiters "(" and "end".
/home/user/fortress/explorations/apl-probes/b12_spec_syntax_form.fss:9:29:
    Unmatched delimiter ")".
/home/user/fortress/explorations/apl-probes/b12_spec_syntax_form.fss:11:1-3:
    Unmatched delimiter "end".
```

The implementation instead has the FOOL'09 `grammar … end` form, whose full
grammar is `ProjectFortress/src/com/sun/fortress/parser/Syntax.rats` (434
lines); the nonterminals it may extend are listed in `Library/FortressSyntax.fsi`
as `native grammar` blocks (`Expression.Expr`, `Literal.LiteralExpr`,
`Identifier.Id`, `Symbol.Op`, `Type.Type`, …), and the corresponding spec text
is `Specification/library/apis/FortressSyntax.tex` — the one place the spec does
show `grammar`, and it shows only the native grammars, never a user one.

Reading the implementation's grammar is mandatory, because most of the shipped
examples are written in an **older, dead spelling**. `Syntax.rats:139-143` fixes
`SyntaxDef ::= SyntaxSymbols => PreTransformerDecl`, with the transformer being
`<[ … ]>` or `case … of`. Every file in
`ProjectFortress/syntax_abstraction_tests/transformer/` still uses the
pre-`=>` spelling (`Expr |Expr:=` plus a bare `do … end` transformer) and all
eight of them fail to parse — e.g.
`SyntaxHelloWorld.fsi:18:11:\n    Syntax Error`
(`existing-tests/b_Syntax*.out`). They are never run by the build:
`SyntaxAbstractionJUTestAll.java:38` globs `*Use.fss` in the **top** directory
only, and `build.xml:1260` (`testsyntax`) is reached only from `testNightly`, not
from `testFast`/`test`/`testSystem` — which is why the green suite says nothing
about syntax abstraction either way.

### The smallest working existing example

`ProjectFortress/syntax_abstraction_tests/For.fsi` + `For.fss` + `ForUse.fss`.
Run in place, unchanged: full expected output, exit 0 (`a01_existing_ForUse.out`).
Two Rats! parser generations happen at run time (~40 s), visible in the
transcript; a JDK with `javac` on the classpath is therefore a hard requirement
for any program that uses a grammar.

### My own, smallest working spelling

`a02_twice_g.fsi`:

```
api a02_twice_g
import FortressSyntax.{Expression}
grammar Twice extends { Expression }
    Expr |:= twice⦇ a:Expr ⦈ => <[ (a) + (a) ]>
end
end
```

plus a one-line `a02_twice_g.fss` stub component exporting the api, and
`a02_twice.fss` doing `import a02_twice_g.{...}` / `println(twice⦇ 21 ⦈)`.
Output `42`, `6`.

Notes on the spelling, each the thing that would otherwise cost a run:

- `⦇` U+2987 and `⦈` U+2988 are **free**: they appear nowhere in the operator
  table, the Rats! grammar or the library, so they can open and close an
  expander. They are not privileged by the mechanism — a terminal is just
  `ItemText`, "any run of characters that are not the macro language's own
  special characters" (`Syntax.rats:390-404`). Any glyph pair works.
- The extension spelling is `Expr |:= …` (`NonterminalExtensionDef`,
  `Syntax.rats:85-90`). The `Expr |Expr:= …` of the `transformer/` directory is
  the dead spelling.
- The macro language's special characters are
  `space : ? # + * [ ] | _ { } ` `` ` `` (`Syntax.rats:406-410`); a terminal
  containing one must be escaped with a backtick, so APL's `+` and `+/` are
  written `` `+ `` and `` `+/ ``.
- An api that defines its own nonterminals **must** `import FortressAst.{...}`,
  or every AST-type annotation fails:
  `b06a_repeat_g.fsi:5:10-12:\n    Expr is undefined.` — my first spelling of
  four probes at once. `For.fsi` imports it; nothing says why.
- Free identifiers in a `<[ ]>` template resolve **at the use site**, not in the
  grammar's api: `b05_hygiene.fss` defines `mydouble` only in the using
  component and `dbl⦇ 21 ⦈` prints `42`. This is what makes E possible at all
  without exporting operators across an api boundary (ledger row 30).
  Pattern-variable names *are* hygienic against template identifiers — that is
  what `GrammarComposition.fsi`'s `UseC`/`RefuseA` test, and all four pass.

## B. The implemented subset

| feature | status | probe | evidence |
|---|---|---|---|
| extend an existing nonterminal (`Expr \|:=`) | works | `a02_twice` | `42` |
| new user nonterminals with an AST type (`N :Expr:=`) | works | `e30_aplg.fsi` (5 of them) | `e30_apl.out` |
| pattern variables (`a:Expr`, `n:LiteralExpr`) | works | `a02_twice`, `e30_apl` | |
| ordered alternatives (`\|`) | works | `e30_aplg.fsi` (8-way `AplDy`) | |
| `<[ … ]>` templates | works | all | |
| templates resolve free names at the **use site** | works | `b05_hygiene` | `42` |
| repetition `*` / `+`, spliced with `**` | works, **needs an explicit static type on the list literal** | `b06c_repeat` | `10`, `7` |
| the same `**` splice into an untyped `<\| … \|>` | fails | `b06a_repeat` | `Unification error: Closure/Constructor for sumOf param 1 (xs:List[\ZZ32\]) got arg ArrayList[\Int\] of type ArrayList[\Int\]` |
| a `*`-bound gap passed **without** `**` | fails (internal) | `b06b_repeat` | `Error occurred while instantiating and executing a temporary parser: com.sun.fortress.parser.templateparser.TemplateParser15 (class java.util.LinkedList cannot be cast to class com.sun.fortress.nodes.Node …)` |
| `?` on an unbound symbol | works | `b07a_option` | `7`, `7` |
| `?` on a **bound** pattern variable (`Maybe`-typed gap) | unimplemented | `b07b_optvar` | `Exception in thread "main" com.sun.fortress.exceptions.MacroError: not supported now` |
| `case g of Cons(h,t) / Empty` over a repetition | works | `b08_caseof` | `exactly one`, `more than one` |
| `case g of <AST constructor>` | unimplemented | `b08_caseof` (first spelling) | `com.sun.fortress.exceptions.MacroError: … Unrecognized constructor name: IntLiteralExpr` |
| character classes, incl. intervals over the APL block | works | `b09b_charclass` | prints `⍳`, `⍵` |
| APL-block glyphs as terminals | works | `b09a_glyph` | six glyphs discriminated |
| `{ }` groups, `SPACE`, `#` (no-whitespace), `NOT`/`AND` predicates | present in the grammar; `SPACE` exercised | `e30_aplg.fsi`, `Sql.fsi` | `Syntax.rats:258-340` |
| grammar extends a **user** grammar; `Expr from G`, `private Expr from G`, `without Expr from G` | works | existing `GrammarCompositionUse{A,B,C,D}` | `A okay` … `D okay` |
| grammar imported across apis | works | existing `ImportEmptyApiWhichImportsNonEmptyApiUse`, `ImportApiEmptyApiWhichImportsNonEmptyApiUse` | exit 0 |
| grammar declared in a **component** | unimplemented | `b11_gram_in_component` | `Error occurred while instantiating and executing a temporary parser: … (b11_gram_in_component.fss:8:8:\n    Syntax Error)` |
| the spec's `syntax Open Id Close = Expr` form | unimplemented | `b12_spec_syntax_form` | see §A |
| transformer as expansion-time Fortress code building AST with `FortressAst` constructors | gone | `existing-tests/b_SyntaxTestUse.out` family | not in `PreTransformer` (`Syntax.rats:175-188`); every example using it fails to parse |

Mechanisms, for the three that fail:

- `?` on a bound variable: `ComposingSyntaxDefTranslator.java:509`,
  `public String forOptionDepth(OptionDepth d) { throw new MacroError("not supported now"); /* … */ }`
  — twenty lines of implementation sit commented out directly beneath.
- `*` without `**`: the neighbouring `forListDepth` (`:488`) returns the raw Java
  `List` (`return source;` with its conversion likewise commented out), so the
  generated parser hands a `java.util.LinkedList` where a `Node` is expected.
- `case … of`: `TemplateVarRewriter.extendWithCaseBindings` (`:122-147`) and
  `Transform.matchClause` (`:751-762`) each recognise exactly `Cons` with two
  parameters and `Empty` with none, with the comment
  `// Nothing else implemented yet`.

Grammars being api-only is a grammar fact, not a bug:
`Declaration.rats:32-51` lists `Decl` without `GrammarDef`; `:59-92` lists
`AbsDecl` *with* it.

## C. The APL glyph block

### Inside a sub-grammar: yes

`b09a_glyph.fss` prints

```
U+2373 iota
U+2374 rho
U+2375 omega
U+237A alpha
U+233D circle stile
U+2349 circle backslash
```

from a grammar whose only distinguishing terminals are `⍳ ⍴ ⍵ ⍺ ⌽ ⍉`, and
`b09b_charclass.fss` matches the interval `[⍳:⍺]` (`CharacterInterval`,
`Syntax.rats:364-370`; `:` is the interval separator, because `-` is a legal
character and `:` is a special one). The sub-grammar never goes through the
Fortress lexer: a generated Rats! parser matches raw characters.

### At the ordinary Fortress level: no, and the spec settles it

`c10_opr_iota.fss`, `opr ⍳(n: ZZ32): ZZ32 = n + 1`:

```
null/home/user/fortress/explorations/apl-probes/c10_opr_iota.fss:6:5:
    Syntax Error
```

`c16_glyph_identifier.fss`, `⍳(n: ZZ32): ZZ32 = n + 1` (i.e. as a plain function
name, which would have given `⍳ 5` by juxtaposition):

```
null/home/user/fortress/explorations/apl-probes/c16_glyph_identifier.fss:6:1:
    Syntax Error
```

Where the set is fixed: a single-character operator is
`singleOp` in `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:175-179` —

```
transient private String singleOp =
     !(encloser / leftEncloser / rightEncloser / multiOp / compOp / match)
     a1:_ !("*") &{ PrecedenceMap.ONLY.isOperator("" + a1) }
```

`PrecedenceMap.isOperator` (`parser_util/precedence_resolver/PrecedenceMap.java:176-179`)
is a lookup in the generated table
`parser_util/precedence_resolver/Operators.java` (3303 lines), produced by
`unicode/OperatorStuffGenerator.java` from the hand-written list
`parser_util/precedence_resolver/operators.txt` (1093 lines) against
`third_party/unicode/UnicodeData.500.txt`. The only `\u23xx` escapes in
`Operators.java` are `⌈ ⌉ ⌊ ⌋`; the whole APL functional-symbol
block U+2336–U+237A is absent. And this is not merely an implementation
omission: `Specification/basic/lexical-structure.tex:301-303` says the ordinary
operator characters are "enumerated (along with the special operator characters)
in `\appref{operator-precedence}`", and the only U+23xx codepoints
`Specification/appendices/operators.tex` enumerates are the same four
(U+2308 LEFT CEILING at `:67` and its three neighbours). Adding `⍳` would mean
editing `operators.txt` and regenerating `Operators.java` — i.e. changing the
language, not using it.

### The shared glyphs: yes

`c13_shared_glyphs.fss` (exit 0):

```
infix  ring  : Cell(5)
prefix ring  : Cell(-3)
subset       : true
supset       : false
prefix ominus: Cell(30)
infix  ominus: Cell(6)
times        : Cell(42)
divide       : Cell(6)
```

so `opr ∘(a, b)` and `opr ∘(a)`, and `opr ⊖(a)` and `opr ⊖(a, b)`, coexist —
monadic and dyadic of one symbol, which is the APL idiom. The spec allows this
explicitly: `advanced/operator-definitions.tex:24-27`, "These overloadings may
be of the same or differing fixities."

`⌈ ⌊` are a different shape. They canonicalise to the ASCII enclosers `|/` and
`|\` (`Operators.java:2161`, `encodedAliases`), so `isOperator` excludes them
(it returns false for anything in `bracket`/`rbracket`) and `opr ⌈(x)` gives, in
`c11_opr_ceiling_prefix.out`:

```
/home/user/fortress/explorations/apl-probes/c11_opr_ceiling_prefix.fss:5:5:
    Unmatched delimiter "|/".
```

The right spelling is a **bracketing** declaration, `opr [BIG]? LeftOp Params
RightEncloser` with the parameters *unparenthesised*
(`MethodParam.rats:64-67`; spec example
`advanced/examples/OprDecl.Bracketing.tex`). `opr ⌈(b: Box)⌉` is
`c12_opr_ceiling_bracket.fss:8:8:\n    Syntax Error`; `opr ⌈ b: Box ⌉: ZZ32` is
`c12b_opr_ceiling_bracket.fss`, printing `107` and `-93`. So a user may
overload the library's own ceiling and floor brackets, but cannot have `⌈` as
APL's dyadic maximum at the ordinary level — it is `MAX` there, and a terminal
of the sub-grammar inside `apl⦇ … ⦈` (which `e30_apl` does use).

## D. The library half

`d20_apl.fss`, one self-contained component, 130 lines. Carrier:

```
value object AplArr(shape: List[\ZZ32\], data: List[\RR64\])
    getter rank(): ZZ32 = |self.shape|
    getter asString(): String = aplShow(self)
end
```

Display is the library's own big operators: `BIG |||` (space-separated
concatenation, `FortressLibrary.fss:3329-3334`) for a row and `BIG //`
(newline-separated, `:3338`) for the rows of a rank-2 array — APL's default
display falls out of Fortress's reduction machinery with no formatting code.

The spellings, and why each had to be what it is:

| APL | Fortress spelling here | why |
|---|---|---|
| `⍳` | `opr IOTA(n: ZZ32)` prefix | `⍳` is not an operator character (§C). An all-caps word of ≥2 distinct letters *is* an operator (`basic/lexical-structure.tex:1167-1172`; ledger row 7), which is the only unicode-free way to get a new prefix symbol. |
| `⍴` monadic and dyadic | `opr RHO(x)` and `opr RHO(s, x)` | same; the two fixities coexist, as in `c13`. |
| `+ - × ÷` elementwise, with scalar extension | `opr +(a,b)`, `opr -(a,b)`, `opr ×(a,b)`, `opr ÷(a,b)` plus `RR64`/`AplArr` mixed pairs | `× ÷` are in the operator table (aliases `BY`, `DIV`); `+ -` are ASCII. Scalar extension is a length-1 test inside one `zipA` helper. |
| `⌈ ⌊` dyadic max/min | `opr MAX(a,b)`, `opr MIN(a,b)` | `⌈ ⌊` are enclosers, not infix operators (§C). |
| `+/` reduce | `opr BIG APLUS` + `opr PLUSRED(a)` prefix | `BIG APLUS` is a real Fortress big operator, built in the library's two-declaration `embiggen` / `__bigOperatorSugar` form (ledger rows 39-40, 137); `PLUSRED` then reduces a vector through it and uses `SUM` per row for rank 2. |
| `⌽` reverse | `opr ⊖(a)` prefix | `⌽` U+233D is absent; `⊖` U+2296 is present and is APL's own "reverse along the first axis", which is exactly the implemented semantics. |
| `⍉` transpose | `opr (a: AplArr)^T` postfix | `⍉` U+2349 is absent; `^T` is Fortress's own `ExponentOp` (`Symbol.rats:104-106`) and is what `run-b2/src/MicroGPT.fss:38` already uses for matrices. |
| `∘.×` outer product | `opr ∘(a, b)` infix | `∘` U+2218 is in the table (alias `CIRC`). |
| strand `1 2 3` | *not expressible* — `vecA(<\|[\RR64\] 1.0, 2.0, 3.0 \|>)` | juxtaposition of numeric literals is multiplication, and `opr juxtaposition` cannot be declared for `RR64`. This is the one thing only the grammar can buy, and it is why E is worth doing. |

Output (`d20_apl.out`, exit 0), abbreviated:

```
iota 5                    : 1.0 2.0 3.0 4.0 5.0
rho iota 5  (shape)       : 5.0
+/ iota 5                 : 15.0
2 3 rho iota 6            :
1.0 2.0 3.0
4.0 5.0 6.0
+/ that  (row sums)       : 6.0 15.0
transpose                 :
1.0 4.0
2.0 5.0
3.0 6.0
outer product iota3 o iota3:
1.0 2.0 3.0
2.0 4.0 6.0
3.0 6.0 9.0
BIG APLUS over a list     : 10.0
```

`2 3 ⍴ ⍳ 6` is `(vecA(<|[\RR64\] 2.0, 3.0 |>)) RHO (IOTA 6)`: the prefix `IOTA`
binds tighter than the infix `RHO`, so the parentheses around `IOTA 6` are
needed only for clarity, but those around the left operand are required because
a bare `vecA(…) RHO …` would make the shape vector the left operand of a
juxtaposition.

One incidental defect found on the way, pinned separately in `d21_narrow.fss`:
there is no working `RR64 → ZZ32` conversion. `|\ v /|` (the floor bracket,
`FortressLibrary.fss:415`, declared `: ZZ`) yields a `ZZ64` at run time, and

```
Cannot find definition for method narrow given receiver 3: ZZ64
```

although `narrow(self): ZZ32` is declared for `ZZ64` at
`Library/FortressLibrary.fss:762` and `Library/FortressLibrary.fsi:529`. The
library half works around it by counting up.

## E. The grammar half

`e30_aplg.fsi` — 5 nonterminals, 24 alternatives, no Fortress-level operator
declarations at all:

```
grammar Apl extends { Expression, Literal }
    Expr |:= apl⦇ e:AplE ⦈ => <[ (e) ]>

    AplE :Expr:=
        l:AplStrand SPACE f:AplDy SPACE r:AplE => <[ aplDy((f), (l), (r)) ]>
      | f:AplMon SPACE r:AplE                  => <[ aplMon((f), (r)) ]>
      | s:AplStrand                            => <[ (s) ]>

    AplStrand :Expr:=
        n:AplNum SPACE s:AplStrand => <[ aplCat(aplScalar((n)), (s)) ]>
      | n:AplNum                   => <[ aplScalar((n)) ]>

    AplNum :Expr:= n:LiteralExpr => <[ 1.0 (n) ]>

    AplDy  :Expr:= `+ … | - … | × … | ÷ … | ⌈ … | ⌊ … | ⍴ … | , …
    AplMon :Expr:= `+/ … | ⍳ … | ⍴ … | ⌽ … | ⍉ … | - … | ⌈ …
end
```

Three design points worth recording:

1. **Right-to-left comes from the shape of the productions, not from
   precedence.** The dyadic alternative takes a *strand* on the left and the
   *whole rest of the expression* on the right; there is no precedence table to
   fight, so Fortress's own precedence simply does not apply inside `apl⦇ … ⦈`.
2. **Strand notation needs the PEG's ordered choice and nothing else.**
   `AplStrand` is right-recursive over `LiteralExpr`; on `2 3 ⍴ ⍳ 6` the inner
   recursion fails at `⍴`, backtracks to the one-number alternative, and the
   strand stops at `2 3` — no lookahead predicate required.
3. **The glyph is carried as a `String` to the desugaring, not as a
   production per glyph.** `AplDy`/`AplMon` reduce each glyph to
   `<[ "plus" ]>`, `<[ "iota" ]>`, …, and the two dispatchers `aplDy`/`aplMon`
   live in the *using* component. This is only legal because templates resolve
   free names at the use site (`b05_hygiene`); it keeps the glyph table in one
   place and means a grammar api never has to export an operator (ledger row 30).

`e30_apl.out`, exit 0, verbatim:

```
apl( +/ iota 5 )          : 15.0
apl( 2 3 rho iota 6 )     :
1.0 2.0 3.0
4.0 5.0 6.0
apl( +/ 1 2 3 4 )         : 10.0
apl( 2 times iota 5 )     : 2.0 4.0 6.0 8.0 10.0
apl( reverse iota 5 )     : 5.0 4.0 3.0 2.0 1.0
apl( rho 2 3 rho iota 6 ) : 2.0 3.0
apl( +/ 2 3 rho iota 6 )  : 6.0 15.0
apl( transpose 2 3 rho iota 6 ):
1.0 4.0
2.0 5.0
3.0 6.0
apl( 3 4 max 4 3 )        : 4.0 4.0
apl( 1 2 , 3 4 )          : 1.0 2.0 3.0 4.0
apl( +/ 1 2 + 10 20 )     : 33.0
right to left: 2 times 3 + 4 = 14, not 10 : 14.0
```

The last line is the load-bearing one: `2 × 3 + 4` is `14`, so the sub-language
really has its own evaluation order, and `3 4 ⌈ 4 3` is the glyph the host lexer
calls an unmatched delimiter.

---

## What an APL-in-Fortress would look like

It would be three files and no changes to the historical tree: a library api
and component holding one `value object` with a shape vector and a flat
`List[\RR64\]`, carrying the primitives as functional methods (so they cross the
api boundary — ledger row 132 — rather than as top-level `opr`s, which do not —
row 30); a grammar api declaring `apl⦇ … ⦈` whose terminals are the real APL
glyphs, reducing each to a name and delegating to two dispatchers; and the
user's component, which imports both and writes APL inline wherever an
expression is expected. The division of labour is clean and is forced by the
language, not chosen: the **glyphs and the evaluation order must live in the
grammar**, because the operator-character set is closed by enumeration in the
spec's own appendix and Fortress has precedence where APL has none; the
**semantics must live in the library**, because a transformer is a template, not
a computation. The two halves are also separately useful — the library alone,
with `IOTA`/`RHO`/`MAX`/`⊖`/`^T`/`∘`/`BIG APLUS`, is already idiomatic Fortress
and reads about as well as APL transliterated into words, which is roughly how
Steele's own array notation in the spec reads. What would stay out of reach
without touching `Library/` or `ProjectFortress/`: APL's `⍺`/`⍵` dfns (they need
a *binding* form, and a template can introduce one only by expanding to a
`fn`, which is fine — but `⍵` itself can only be a sub-grammar terminal, never a
Fortress variable), operator-valued arguments like `f/` for arbitrary `f` (the
`?`-bound gap needed to make `/` optional is `not supported now`), and display
of the glyphs in Fortify, which has no APL block either. The honest ceiling is
high: everything in questions D and E worked, and the only mechanism failures
met were one unimplemented `?`-gap, one missing list-gap conversion, and
`case … of` restricted to `Cons`/`Empty`.

---

## New ledger rows

| claim | status | class | spec citation | reproducer | notes |
|---|---|---|---|---|---|
| the Fortress **syntax-abstraction mechanism works on this tree**: a user `grammar` in an api adds a new `Expr` form that a separate component uses | POSITIVE-VERIFIED | — | `advanced/domain-specific-languages.tex:15-16` is a stub referring to FOOL'09; the only `grammar` text in the spec is `library/apis/FortressSyntax.tex` | `apl-probes/a02_twice.fss`, `a02_twice_g.fsi`; existing `ProjectFortress/syntax_abstraction_tests/ForUse.fss` (`a01_existing_ForUse.out`) | `twice⦇ 21 ⦈` → `42`. Two Rats! parser generations at run time (~40 s); `javac` must be on the classpath. All 21 non-`SXX` tests in `syntax_abstraction_tests/` pass (`existing-tests/`). |
| the spec's **only** normative DSL declaration form, `syntax OpenExpander Id CloseExpander = Expr`, is not implemented | NEGATIVE-VERIFIED | implementation gap | `appendices/grammars/concrete-syntax.tex:434-448`; `basic/declarations.tex:113-118` | `apl-probes/b12_spec_syntax_form.fss` | `Unmatched delimiters "(" and "end".` No `ExternalSyntax` production or AST node exists. The implemented form, `grammar … end`, is specified nowhere but `Syntax.rats`. |
| every example in `ProjectFortress/syntax_abstraction_tests/transformer/` uses a **dead spelling** (`Expr \|Expr:=` and a bare `do … end` transformer) and fails to parse; the build never runs them | NEGATIVE-VERIFIED | packaging | `Syntax.rats:85-90`, `:139-143`, `:175-188` give the live spelling | `apl-probes/existing-tests/b_Syntax*.out` | `SyntaxHelloWorld.fsi:18:11:` `Syntax Error` ×8. `SyntaxAbstractionJUTestAll.java:38` globs only the top directory; `build.xml:1260` (`testsyntax`) hangs off `testNightly` alone. Nothing in the green suite covers syntax abstraction. |
| a grammar may be declared **only in an api**, never in a component | NEGATIVE-VERIFIED | design limit | `Declaration.rats:32-51` (`Decl`, no `GrammarDef`) vs `:59-92` (`AbsDecl`, with it); `basic/declarations.tex:115` lists `ExternalSyntax` under `Decl`, so the spec disagrees | `apl-probes/b11_gram_in_component.fss` | `Error occurred while instantiating and executing a temporary parser: … (…:8:8: Syntax Error)`. Any DSL therefore ships as an api + stub component + user component. |
| free identifiers in a `<[ … ]>` template resolve **at the use site**, not in the grammar's api | POSITIVE-VERIFIED | — | — | `apl-probes/b05_hygiene.fss` | `mydouble` defined only in the using component; `dbl⦇ 21 ⦈` → `42`. Pattern-variable names *are* hygienic against template identifiers (existing `GrammarCompositionUse{C,D}`). This is what lets a grammar desugar to library calls without exporting operators (row 30's workaround). |
| an api that defines its own grammar nonterminals must `import FortressAst.{...}`, or every AST-type annotation is undefined | NEGATIVE-VERIFIED | design limit (undocumented) | — | `apl-probes/b06a_repeat_g.fsi` (first spelling), `b09b_charclass_g.fsi` | `b06a_repeat_g.fsi:5:10-12:` `Expr is undefined.` No diagnostic names the missing import. |
| repetition `*`/`+` works, spliced into a template with `**`, but **only** into a list literal carrying an explicit static type | POSITIVE-VERIFIED | — | — | `apl-probes/b06c_repeat.fss` (works), `b06a_repeat.fss` (untyped, fails) | `sumc⦇ 1 2 3 4 ⦈` → `10`. Untyped: `Unification error: … param 1 (xs:List[\ZZ32\]) got arg ArrayList[\Int\] of type ArrayList[\Int\]`. |
| a `*`-bound gap used **without** `**` crashes the generated parser with a raw Java cast error | NEGATIVE-VERIFIED | implementation gap | — | `apl-probes/b06b_repeat.fss` | `class java.util.LinkedList cannot be cast to class com.sun.fortress.nodes.Node`. `ComposingSyntaxDefTranslator.java:488` `forListDepth` returns the raw Java list, its conversion commented out. |
| `?` works on an unbound symbol but a **bound** `?` pattern variable is unimplemented | NEGATIVE-VERIFIED | implementation gap | — | `apl-probes/b07a_option.fss` (works), `b07b_optvar.fss` (fails) | `MacroError: not supported now` — `ComposingSyntaxDefTranslator.java:509`, twenty lines of implementation commented out below it. |
| `case g of … end` in a transformer dispatches **only** on `Cons(h,t)` and `Empty` over a repetition-bound list, not on AST constructor names | NEGATIVE-VERIFIED | implementation gap | — | `apl-probes/b08_caseof.fss` (Cons/Empty works), same file's first spelling (fails) | `exactly one` / `more than one`; and `MacroError: … Unrecognized constructor name: IntLiteralExpr`. `TemplateVarRewriter.java:122-147`, `Transform.java:751-762`, commented `// Nothing else implemented yet`. |
| a sub-grammar's terminals and character classes may be **any** characters, including the APL functional-symbol block U+2336–U+237A, which the host lexer rejects | POSITIVE-VERIFIED | — | `Syntax.rats:390-404` (`ItemText`), `:364-370` (`CharacterInterval`) | `apl-probes/b09a_glyph.fss`, `b09b_charclass.fss`, `e30_aplg.fsi` | Six glyphs discriminated as terminals; the interval `[⍳:⍺]` matches. A generated Rats! parser sees raw characters, never operator tokens. `:` is the interval separator because `-` is an ordinary character. |
| `⦇` U+2987 / `⦈` U+2988 are unused anywhere in the tree and serve as expander delimiters; the mechanism privileges no particular pair | POSITIVE-VERIFIED | — | — | `apl-probes/a02_twice_g.fsi`, `e30_aplg.fsi` | Any glyph run that contains none of the macro language's special characters (``space : ? # + * [ ] \| _ { } ` ``, `Syntax.rats:406-410`) works; `+` and `+/` need a backtick escape. |
| the APL functional-symbol block U+2336–U+237A is **not** an operator character set, by specification as well as by implementation; `⍳` is not an identifier character either | NEGATIVE-VERIFIED | design limit | `basic/lexical-structure.tex:301-303` ("enumerated … in `\appref{operator-precedence}`"); `appendices/operators.tex` enumerates only U+2308-U+230B in that range (`:67`) | `apl-probes/c10_opr_iota.fss`, `c16_glyph_identifier.fss` | Both give a bare `Syntax Error`. Mechanism: `singleOp` (`Symbol.rats:175-179`) gates on `PrecedenceMap.isOperator` (`PrecedenceMap.java:176`), a lookup in the generated `Operators.java`, generated by `unicode/OperatorStuffGenerator.java` from the hand-written `operators.txt`. Adding a glyph means regenerating that table, i.e. changing the language. |
| monadic and dyadic declarations of the **same** shared glyph coexist: `∘ ⊂ ⊃ ⊖ × ÷` all work as user operators | POSITIVE-VERIFIED | — | `advanced/operator-definitions.tex:24-27` ("These overloadings may be of the same or differing fixities") | `apl-probes/c13_shared_glyphs.fss` | `∘` prefix and infix, `⊖` prefix and infix, in one component, over a user object. |
| `⌈ ⌉ ⌊ ⌋` are **enclosers**, not infix operators: `opr ⌈(x)` fails, `opr ⌈ x: T ⌉` (parameters unparenthesised) works | NEGATIVE-VERIFIED for the prefix form, POSITIVE-VERIFIED for the bracketing form | design limit | `appendices/operators.tex:52-71` ("Bracket Pairs for Enclosing Operators"); `advanced/operator-definitions.tex:208-209` ("The value parameter list, rather than being surrounded by parentheses, is surrounded by the brackets being defined") + `advanced/examples/OprDecl.Bracketing.tex`; `MethodParam.rats:64-67` | `apl-probes/c11_opr_ceiling_prefix.fss`, `c12_opr_ceiling_bracket.fss` (parenthesised, fails), `c12b_opr_ceiling_bracket.fss` (works) | `Unmatched delimiter "\|/".` for the prefix form — `⌈` canonicalises to the ASCII encloser `\|/` (`Operators.java:2161`) and `isOperator` excludes brackets. `opr ⌈(b: Box)⌉` is a bare `Syntax Error`; `opr ⌈ b: Box ⌉: ZZ32` prints `107`. So APL's dyadic `⌈` must be `MAX` at the ordinary level. |
| a complete APL array library — dynamic shape, eleven primitives including a user `BIG` reduction — runs on the walk interpreter | POSITIVE-VERIFIED | — | `basic/expressions/reductions.tex:27` (the two-declaration big-operator form, rows 39-40, 137); `basic/lexical-structure.tex:1167-1172` (all-caps operator words) | `apl-probes/d20_apl.fss` | `IOTA`, `RHO` mon+dy, `+ - × ÷ MAX MIN` with scalar extension, `⊖` reverse, `^T` transpose, `∘` outer product, `opr BIG APLUS`, `PLUSRED` (`+/`). Display is free: `BIG \|\|\|` per row, `BIG //` per matrix. Strand `1 2 3` is the one thing the library cannot buy. |
| a right-to-left APL sublanguage with strand notation, real APL glyphs and `+/` reduce can be added as a user grammar and desugared to that library | POSITIVE-VERIFIED | — | as above | `apl-probes/e30_aplg.fsi`, `e30_apl.fss` | 12 expressions run. `apl⦇ 2 × 3 + 4 ⦈` = `14.0` (right to left, Fortress precedence suspended); `apl⦇ 3 4 ⌈ 4 3 ⦈` = `4.0 4.0` (a host encloser used as a dyadic function); `apl⦇ 2 3 ⍴ ⍳ 6 ⦈` = the 2×3 matrix. |
| there is no working `RR64 → ZZ32` conversion: `\|\ v /\|` yields a `ZZ64` whose declared `narrow` cannot be found | NEGATIVE-VERIFIED | library bug | — (`Library/FortressLibrary.fss:415` declares `opr \|\self/\| : ZZ`; `:762` and `FortressLibrary.fsi:529` declare `narrow(self): ZZ32` for `ZZ64`) | `apl-probes/d21_narrow.fss` | `Cannot find definition for method narrow given receiver 3: ZZ64`. Workaround: count up with a `while`. |
