# Extract: Allen, Culpepper, Nielsen, Rafkind & Ryu, "Growing a Syntax" (FOOL 2009)

Working notes on the recovered PDF (`research/decks/GrowingASyntax-FOOL2009.pdf`,
11 pages, "Copyright is held by Sun Microsystems, Inc. / FOOL '09 24 January,
2009, Savannah, Georgia, USA." — the PDF itself is gitignored and never
committed). These notes are our own summary and commentary with brief attributed
quotations, not a reproduction of the paper.
Source: https://www.cs.cmu.edu/~aldrich/FOOL09/allen.pdf — Jonathan Aldrich's
FOOL'09 program page at CMU, which still hosts the accepted papers; downloaded
2026-09-12, SHA-256 `3d33bd290c53f3cdbdf2d7ac48fb2f3716e9af3b5da1c3a1a65fd9c624270da3`.
Authors and affiliations as printed: Eric Allen and Sukyoung Ryu (Sun
Microsystems), Ryan Culpepper (Northeastern), Janus Dam Nielsen (Aarhus), Jon
Rafkind (Utah).

This is the paper the specification's DSL chapter defers to in full:
`Specification/advanced/domain-specific-languages.tex` is nine lines of
copyright plus `\note{This chapter will include the Fortress syntactic
abstraction mechanism described in ~\cite{fool09}.}`, and
`Specification/fortress/fortress.bib:82` is the bare `@InProceedings{fool09}`
entry with no URL. So the paper is the *only* prose design document for
`grammar`; the implemented `grammar … end` form is, as the apl-probes report
found, specified nowhere in the spec itself.

Page citations below are PDF page numbers (the workshop paper carries no printed
folios). Cross-references to this repo's probe results are marked **[repo]**.

## 1. The mechanism as designed

A **grammar** is the unit of language extension: "A grammar is a self-contained
language extension which can be composed with other grammars in a modular way"
(§4, p3). It contains nonterminal *definitions* (`NewNonterminal ::= …`) and
*extensions* (`ExistingNonterminal |:= …`), and may extend any number of other
grammars, inheriting their nonterminals — `grammar ForLoop extends {
Expression, Identifier }` is the running example (Fig. 3, p3), which is
character-for-character the shipped `ProjectFortress/syntax_abstraction_tests/
For.fsi:18`. Grammars live in APIs, not components: "Fortress macros occur only
in grammars defined in APIs" (§8.2, p9) and "the entire syntactic abstraction
system resides ultimately in the APIs" (§8.2, p10). The paper uses "macro"
throughout "to refer to a particular language extension" (§3, p2).

A nonterminal definition or extension has an "'ordered sequence' of alternative
variants", and "A variant consists of a pattern, followed by ⇒, and a
transformation expression. A transformation expression is either an expression
enclosed by `<[` and `]>`, or a case expression with branches, whose right-hand
sides are transformation expressions" (§4, p3). Figure 5 (p4) formalises this:
`Variant ::= Pattern ⇒ Action`, `Action ::= <[Term]>` (annotated *template*) `|
case PatternVar of Empty ⇒ Action; Cons(PatternVar, PatternVar) ⇒ Action end`.
So "transformer" and "template" are not two mechanisms: the template *is* the
transformer's body, and the only other thing a transformer may do is dispatch on
list structure. Figure 9's `NodeExpr` calls the runtime object a `Transformer`.

A pattern is "defined by a sequence of parts"; parts are terminals, symbol
groups in curly braces, nonterminal references optionally labelled
`name : Nonterminal`, character classes, and the PEG operators (§4, p3; Fig. 5,
p4). Two properties of the pattern notation are load-bearing for "similar syntax
for definition and use": "Tokens appear in a macro definition where they appear
in a use site of the macro", and "The whitespace between symbols represents
optional Fortress whitespace. When a space is required, the nonterminal `Space`
specifies the required space" (§4, p3). **[repo]** this is exactly gaps.md row
1's POSITIVE-VERIFIED finding about whitespace and `SPACE`, here stated as
intent.

How a right-hand side becomes host code: **not** by string substitution and
**not** by user computation. "Although the transformation is expressed in terms
of Fortress concrete syntax, the act of transforming a use site at parse time is
not performed on the concrete syntax. Instead, the transformation expression is
parsed into Fortress Abstract Syntax Tree (AST) nodes, containing placeholder
nodes to represent pattern variables, and the act of transforming a use site is
performed by substituting AST nodes in for the placeholders" (§4, p4). The
alternative — "a multi-staged system in which transformation expressions consist
of explicit user-defined computations of resulting AST nodes" — is considered and
rejected as "more flexible … also tedious and error prone", and §6 (p9) records
that procedural macros were tried and abandoned: "the uniform and elegant
structure of s-expressions cannot be reused in the context of Fortress … the
amount of code required to construct a Fortress AST makes them an unattractive
path to take." **[repo]** this is the design basis for the apl-probes conclusion
that "a transformer is a template, not a computation."

Expansion happens entirely at parse time, in a pipeline the paper names **syntax
normalization** = parsing + transformation (§5, p4), producing "a Fortress AST
without macros which can be interpreted by the Fortress interpreter". Parsing is
itself two steps because the program defines how it is parsed: "In the first
step, we parse all the grammars except for the action part of each variant and
the main expression. The action parts and the main expression are just parsed as
Unicode strings. … In the second step, we parse each action part and the main
expression" (§5.1, p4–5) against a PEG computed from the set of *available*
macros (§5.1.2, p5–6), from which "a PackRat parser can be generated (for example
by using Rats! …)". Transformation (§5.2, p7) is then a small-step operational
semantics over *node expressions* (Figs. 9, 10) with two environments: Υ mapping
transformer names to definitions, Γ mapping pattern variables to node
expressions. The design goals in §1 (p1) constrain the stage: "Macro definitions
must be checked for well-formedness before they are expanded", "Use sites must be
parsed along with the rest of the program and expanded directly into abstract
syntax trees", and "syntax errors at use sites of a macro must refer to the
unexpanded program at use sites, never to definition sites."

Hygiene is promised in §5.3 (p8) in one sentence: "Fortress macros are hygienic,
meaning any bindings introduced by a macro are fresh." The algorithm is "a
simplification of Clinger's algorithm", cheap because "our macro system cannot
introduce macros itself, nor can a macro be hidden through a lexically bound
variable". Mechanically: no renaming before a macro is invoked; after a macro
invocation a flag is set so renaming applies to the current node and all
children; each binding construct mints a unique identifier and chains a new
syntactic environment. The protection in the other direction is explicit:
"Pattern variables in a macro definition are never renamed since they are
syntactic entities being introduced into the macro. In this way, we prevent
variables passed to the macro from being renamed by virtue of the fact that they
share names with bound identifiers introduced by the macro." The worked example
is `Expr |:= foo e : Expr ⇒ <[ fn d ⇒ d + e ]>` used as `foo d`, which must yield
`fn d1 ⇒ d1 + d`. The abstract's promise is broader than the §5.3 algorithm:
uses must be "hygienic, composable, respecting referential transparency" (p1),
and §8.2 (p10) spells out what referential transparency means here —
"Syntactic abstractions can refer to types, variables, and functions declared in
the API, and the references they produce in client components are resolved based
on the components the client is linked to." Note what is *not* claimed: the
paper offers no escape hatch from hygiene, and remarks of Cardelli and Matthes'
system that "they have an explicit mechanism for requesting a fresh variable
name" (§8.1, p9) — a feature listed as theirs, not ours.

## 2. Names across the boundary

**DSL binds a variable: one form only, the host's lambda.** The paper's binding
example is precisely the shipped `For`: the `for` variant's identifier gap
`i : Id` is spliced into a function parameter position in the helper's template,
`<[ ((ea).loop(fn ia ⇒ (for2 ib ∗∗; eb ∗∗; do block; end)))]>` (Fig. 3, p3).
That is the whole story the paper tells about DSL-introduced bindings, and it is
the same idiom our probes found in `For.fsi` (`fn i => d`). The calculus makes
the narrowness structural rather than accidental: Core Fortress (Fig. 5, p4) is
`Expr ::= n | s | x | fn x ⇒ Expr | Expr Expr | ( Expr )` — numbers, strings,
variables, lambda, application, parentheses. There is **no declaration, no
assignment, no block and no statement in the formalism at all**, and `Term` (the
template language) mirrors it exactly plus `PatternVar` and `Term ∗∗`. So the
paper neither permits nor forbids a template expanding to a declaration or an
assignment: the question cannot be asked of the core calculus, and no example in
the paper expands to either. Every variant in every example extends `Expr`.

**A DSL introducing a name visible after the extension form ends: never
discussed, and the design points the other way.** Hygiene's one-line promise is
that "any bindings introduced by a macro are fresh" (§5.3, p8), with the single
exception carved out for pattern variables, i.e. for names flowing *in*. Nothing
in §5.3 or §8.2 contemplates a name flowing *out* of an expansion into
subsequent host code. Because extensions in all examples are `Expr` variants,
a use site is an expression and its bindings cannot outlive it; the nearest
scoping remark is about the extensions themselves, not the names they bind:
"Syntax extensions are imported at the component level, and so we do not support
lexically scoped syntax extensions like Scheme … or OMeta … does. Support for
lexical scoping could be added later" (§7, p8).

**Host variable referenced from DSL code: by a nonterminal-reference gap, with
no escape delimiter anywhere in the design.** The way host material enters a DSL
phrase is `e : Expr` — "a binding part where the pattern variable `e` gets bound
to the result of parsing `Expr`" (§5.1.3, p7) — and the host expression is
bounded only by the surrounding terminals of the rule and by PEG matching order.
The paper proposes no quasiquote/unquote marker, no `⍎(…)`-style escape, and no
delimiter convention for host expressions embedded in new syntax; where its own
examples need bracketing they simply use Fortress parentheses at the use site
(`macro1 (macro2 7)`, §3, p2). It is aware of the underlying hazard in the
abstract — "In a PEG, the second alternative of the former would never succeed
because the first alternative is always taken if the input string to be
recognized starts with `a`" (§5.1.1, p5) — but never connects that to an
undelimited `Expr` gap swallowing following host tokens. **[repo]** gaps.md row
5 is the concrete bill for this silence.

## 3. Escaping, literal terminals, and the pre-parser

Literal terminals get one sentence, and it is maximally permissive: "A terminal
is any sequence of Unicode [33] characters that is not the name of a nonterminal
available in the containing grammar" (§4, p3); Figure 5 has `BasePart ::= NTName
| Terminal | [Char:Char]` with "`Terminal`, and `Char` range over Unicode
strings" (p4); and matching is literal — "The first part is a terminal part
which must be matched verbatim in the input sequence" (§5.1.3, p7). Character
classes use `:` as the range separator, with an example class that itself
contains punctuation: "We also allow character classes to be specified(e.g. the
character class of ';' and the lowercase letters from 'a' to 'z' `[;a:z]`)"
(§5.1.1, p5). **[repo]** this matches the probes' finding that `:` separates an
interval because `-` is an ordinary character.

**The paper says nothing whatsoever about escaping.** A full-text search finds
no occurrence of "escape", "backquote", "backtick", "reserved", or "special
character" in any sense relevant to terminals; "special" appears only in the
passage rejecting bracketed macro uses, and "verbatim" only in the sentence just
quoted. The metasyntax of Figure 5 does reserve `? * + ¬ ∧ { } : [ ] ⇒ ∗∗`, so
the collision with literal terminals is real; the paper simply never faces it,
and its typeset notation hides part of the problem by writing the predicates as
`¬`/`∧` rather than as ASCII words. What the implementation actually does — a
backtick before `+`, `*`, `?`, `{`, `}`, `|`, `[`, `:`, `#` — is visible all over
`syntax_abstraction_tests/Regex.fsi:100-150` (`` `? ``, `` `{ ``, `` `| ``,
`` `[# ``, `` `: ``), i.e. the escape was unavoidable in practice within months
of the paper, and the `#` no-whitespace marker those files use is likewise absent
from the paper (which has only the positive `Space`).

**The pre-parser is not described.** The paper's only pre-pass is the
grammar/action-part split of §5.1 (p4–5), which is a *parsing* step — grammars
parsed first, action parts and the main expression held as Unicode strings — not
a delimiter-matching scan. §6 (p8) describes the implementation as Rats! module
composition plus the two logical stages, with "A new parser is generated for each
modified or defined nonterminal in an extension grammar" and per-template parser
generation and caching; it mentions no bracket-matching pass and no `Opening`/
`Closing` delimiter table. So the pass in which the backtick actually breaks
(`PreCompilation.rats`, `PreParserState.java`) has no counterpart in the design
at all. **[repo]** gaps.md row 3 is therefore a collision between the paper's
"any sequence of Unicode characters" and a component the paper does not know
exists.

## 4. Gaps, options, repetition, splicing, and case

**Pattern variables** may label any base part, not just a nonterminal: `SimplePart
::= PatternVar : BasePart | BasePart` over `BasePart ::= NTName | Terminal |
[Char:Char]` (Fig. 5, p4). **Optional and repeated parts** are `Part ::=
SimplePart ? | SimplePart ∗ | SimplePart + | SimplePart | ¬ Part | ∧ Part`
(Fig. 5), with the prose adding symbol groups: "A symbol group is a sequence of
symbols inside curly braces. A symbol or a symbol group may be followed by an
option operator `?` or a repetition operator `+` (one or more repetition) or `∗`
(zero or more repetition)" (§4, p3). Because `?`/`∗`/`+` apply to a `SimplePart`
and a `SimplePart` may carry a pattern variable, **a bound optional gap is
grammatical in the paper's own calculus** — and the for-loop pattern puts a
*group* under a repetition with an optional terminal inside it: `for { i : Id ←
e : Expr , ? Space }∗ do block : Expr end`. **Predicates** are PEG semantic
predicates, "∧ (must match) and ¬ (must not match), both of which do not consume
input" (§4, p3), and are `Part`s, so they nest inside groups.

**Splicing** is the "syntax-unfold operator, `∗∗`", which "is similar to the
ellipsis operator … found in Scheme …, and expands into the syntax matched by its
arguments" (§4, p3); in the template grammar it is simply `Term ::= Term ∗∗`
(Fig. 5, p4), and in the for-loop template it splices into an *argument position*
of a helper variant, `<[ for2 i ∗∗; e ∗∗; do block ; end ]>` — no list literal,
no type ascription. Its semantics are the `Ellipses(n, n′)` node of Figure 9 with
the [Ellipses First/Middle/Last] rules of Figure 10 (p7): "the first argument of
the node is replicated by the number of times equal to the length of a pattern
variable within the first argument", and §6 (p8) adds "The replicated nodes are
then spliced into the parent node." The paper's candid limitation here is the
one our probes met from the other side: "the for loop cannot be written directly
because when the ellipses are expanded the intermediate commas are missing and so
the parser would not recognize the syntax as a for loop macro … This generally
means that most macros will need two forms" — with the proposed fix being "to add
operations over lists, so that the identifiers and the corresponding expressions
… could be zipped, and expanded with the commas in place" (§7, p8).

**Matching on kinds of syntax tree nodes: the paper specifies none.** `case`
dispatches on list structure and nothing else, in all three presentations —
prose ("The actual value bound to a pattern variable is compared to the
left-hand side of each case clause: an empty list is matched to `Empty` and a
nonempty list is matched to `Cons`", §4, p3), abstract syntax (`Action ::= … |
case PatternVar of Empty ⇒ Action; Cons(PatternVar, PatternVar) ⇒ Action end`,
Fig. 5), and semantics ([Case Empty] and [Case Cons], Fig. 10). There is no
constructor pattern, no node-kind test, no guard; §7 (p8) even notes that
semantic predicates of the Rats!/OMeta kind were deliberately left out ("in our
exprience we haven't had any need for implementing any of our examples yet").

## 5. Paper vs. the 2012 implementation, row by row

Verdict vocabulary: **agrees** = the implementation does what the paper
designed; **disagrees** = the implementation falls short of (or contradicts) the
paper; **silent** = the paper does not address the point. `R*` rows are the "New
ledger rows" table at the end of `explorations/apl-probes/REPORT.md`, in file
order; `G*` rows are `explorations/apl/gaps.md`.

| row | the paper's design | verdict |
|---|---|---|
| R1 a user `grammar` in an api adds a new `Expr` form a separate component uses | the entire point: §4's `ForLoop` extends `Expr`, and "the entire syntactic abstraction system resides ultimately in the APIs" (p10) | **agrees** |
| R2 the spec's only normative form, `syntax OpenExpander Id CloseExpander = Expr`, is unimplemented | the paper's form is `grammar … Nt \|:= pattern ⇒ <[…]> … end` — the *implemented* form (live `Syntax.rats:85-90`, `:139` separator `=>`), modulo typesetting. The paper, not the spec, is the `grammar` form's documentation | **agrees with the implementation; the spec is the outlier** |
| R3 the `syntax_abstraction_tests/transformer/` examples use a dead spelling (`Expr \|Expr:=`, bare `do … end`) | silent on spellings-over-time, but its `\|:=` + `⇒` is the surviving one | **silent** |
| R4 a grammar may be declared only in an api, never in a component | "Fortress macros occur only in grammars defined in APIs" (§8.2, p9); modularity is argued from the component system | **agrees** (so the ledger's "the spec disagrees" stands: the paper sides with the code) |
| R5 free identifiers in a `<[ … ]>` template resolve at the **use site** | the abstract requires uses to respect "referential transparency" (p1), and §8.2 (p10) says abstractions "refer to types, variables, and functions declared in the API" and are "resolved based on the components the client is linked to" — definition-site scope closed through linking, not use-site capture | **disagrees**: the convenience our probes rely on (`mydouble` supplied by the client) is a referential-transparency hole, not a designed feature. The hygiene half (pattern variables never renamed) **agrees** |
| R6 an api defining nonterminals must `import FortressAst.{...}` or every AST annotation is undefined | nonterminal availability comes from the `extends` clause alone (`extends { Expression, Identifier }`, §4 p3; §5.1.2) — no AST-node import in any example | **silent** (an undocumented extra requirement; the paper's model is `extends`) |
| R7 `**` splices only into a list literal carrying an explicit static type | `Term ::= Term ∗∗` (Fig. 5) splices into any term position; Fig. 3 splices into a variant's argument list with no literal and no type | **disagrees** (implementation narrower) |
| R8 a `*`-bound gap used without `**` crashes with a raw Java cast error | the calculus gives no meaning to a repetition-bound variable outside an `Ellipses` node, but §1 (p1) demands "Macro definitions must be checked for well-formedness before they are expanded" | **disagrees on the diagnosis** (a Java `ClassCastException` is precisely the unchecked-definition failure the paper forbids); **silent** on the form itself |
| R9 `?` works unbound; a **bound** `?` pattern variable is `not supported now` | `Part ::= SimplePart ?` over `SimplePart ::= PatternVar : BasePart` (Fig. 5) — a bound optional is grammatical by construction | **disagrees** (implementation falls short; `ComposingSyntaxDefTranslator.java:509`'s commented-out block is the unfinished paper feature) |
| R10 `case … of` dispatches only on `Cons`/`Empty`, never on AST constructor names | that *is* the design, in prose, grammar and semantics (§4 p3; Figs. 5, 9, 10) | **agrees** — so this row is a **design limit, not an implementation gap**; the ledger's class should be revised |
| R11 a sub-grammar's terminals and character classes may be any characters, incl. U+2336–U+237A | "A terminal is any sequence of Unicode characters that is not the name of a nonterminal available in the containing grammar" (§4, p3); PEGs "integrate lexing with parsing" (§5.1, p5) | **agrees** (and explains the mechanism: the generated parser never sees operator tokens) |
| R12 `⦇`/`⦈` serve as expander brackets; `+` and `*` need a backtick escape | §3 (p2) **argues against the bracket premise**: "We could have chosen to enclose all macro uses in special brackets … However, the result would have been a language in which extensions stand out conspicuously from core syntax, reminiscent of user-defined function definitions in APL". On escaping: nothing | **disagrees on brackets** (the paper's goal is an unbracketed `apl …` form); **silent on the backtick** |
| R13 the APL glyph block is not an operator character set, by spec and implementation | host lexical structure, outside the paper's scope | **silent** |
| R14–R16, R18 (shared monadic/dyadic glyphs; `⌈⌉` as enclosers; the APL array library; missing `RR64→ZZ32 narrow`) | ordinary-level Fortress, not the macro mechanism | **silent** |
| R17 a right-to-left APL sublanguage with real glyphs can be added as a user grammar and desugared to a library | §7 (p8) reports exactly this shape of result: "a grammar that recognizes regular expressions and one recognizing XML … These examples show that the system is suitable for language extensions and domain specific languages" | **agrees** |
| G3 the backtick escape is read by the **preparser** as an opening quote, and the api is rejected | terminals are "any sequence of Unicode characters"; no escape mechanism and no pre-parser appear anywhere in the paper | **silent** — and the silence is the finding: the component that breaks is undesigned |
| G4 an `Id` gap cannot be spliced into an **expression** position, only a binder | `Term ::= … \| x` and pattern variables substitute into any term position (Fig. 5), so an `Id` gap in expression position is grammatical; but the paper's **only** identifier-gap example is the binder `fn ia ⇒ …` (Fig. 3), exactly as our probe said of `For.fsi:19` | **disagrees** (the design admits it, the paper never exercises it, the implementation rejects it) |
| G5 an undelimited `Expr` gap is greedy and swallows a following host operator | PEG prioritized choice with no re-entry for shorter matches is stated as a property (§5.1.1, p5) and chosen deliberately for unlimited lookahead (§1, p2); the consequence for gaps is never discussed | **silent** (the cause is endorsed, the hazard unmentioned) |
| G8 a template cannot expand to an **assignment** (no gap position left of `:=`) | Core Fortress has no assignment at all: `Expr ::= n \| s \| x \| fn x ⇒ Expr \| Expr Expr \| ( Expr )` (Fig. 5, p4), and `Term` mirrors it. No example expands to an assignment or a declaration | **silent** — the formalism cannot express the question, so the ledger's "implementation gap" is better read as *unspecified territory* |
| G9 a `NOT` predicate inside a group under a repetition does not bound the repetition | `¬` is a PEG not-predicate that "does not consume input" (§4, p3) and is a `Part`; groups may be repeated (Fig. 3's `{ … }∗`). Under PEG semantics `(¬e _)∗` terminates | **disagrees** (implementation gap against stated PEG semantics) |

## 6. The intended way to write a sublanguage with its own variables

Read as a design document, the paper's answer is: *you do not give the
sublanguage variables of its own — you spend the host's one binding form.* A
sub-language's variable is an `Id` gap spliced into a host binder, and the only
binder in the calculus (and in the paper's only binding example) is `fn x ⇒ e`;
hygiene then guarantees the introduced binding is fresh, pattern variables are
exempt from renaming so a name handed in keeps its identity, and scope ends where
the extension form ends because the extension form is an `Expr`. That is the
`For` idiom our probes found and nothing more: there is no declaration, no
assignment, no statement, no `gensym`, and no mechanism for a DSL name to outlive
its use site anywhere in the paper. The example set confirms the shape rather
than widening it — §7 (p8) names exactly three: the `for` loop of Figure 3, "a
grammar that recognizes regular expressions and one recognizing XML" (the
ancestors of the tree's `Regex.fsi` and `Xml.fsi`). There is **no SQL example**,
and **none of the three is statement-level**: every variant in the paper extends
`Expr`, regular expressions and XML are pure expression languages producing
library values, and the `for` loop — the one construct that looks like a
statement — is realised as an expression desugaring to `e.loop(fn i ⇒ …)`. Even
the paper's own boast that "various language constructs can be moved from the
core language syntax into libraries" (§9, p10) is demonstrated only on a
construct whose meaning is a method call taking a closure. So the workspace-object
trick of `explorations/apl` rung 2 (APL's `←` expanding to `aplSet(…)` on a
mutable object rather than to a Fortress binding) is not a workaround for a
missing implementation: it is a workaround for a question the design never
answered.

## 7. What else the paper adds to this repo's picture

- Performance shape, stated in 2009 and still what we measure: a parser is
  generated per extension nonterminal, "there is the overhead of generating a
  grammar and invoking Rats! on that grammar for each transformation expression,
  which currently slows down the parsing first time a macro is used. The
  following times are for free because the generated parser is cached" (§6, p8–9)
  — our ~20–40 s first-run cost, by design. Also: "The size of the transformed
  Core Fortress program is in worst case exponential in the size of the input"
  (§6, p9).
- Grammar composition is specified in detail (§5.1.2, pp. 5–6) and is the part
  the implementation apparently got right (`GrammarCompositionUse{A..D}` pass):
  no re-export by default (Fig. 7: `macroA` is *not* available in a grammar that
  extends only `B`), explicit propagation by naming `B.Nt`, and for diamonds
  (Fig. 8) macros collected "along the paths till the lowest common ancestor …
  and then recursively", ordered by "the order in which the extended grammars
  appear in the extends clause" so that neither branch's macros are shadowed by
  the common ancestor's.
- Claimed first: "To our knowledge, ours is the first implementation of a modular
  hygienic macro system based on parsing expression grammars" (abstract, p1).
- Future work named but never shipped: type-checking macros — "if a macro
  definition is well typed then there is no type error at the use sites of the
  macro" (§9, p10) — lexically scoped extensions, separation of syntax from
  transformation, and list operations (zip) for `∗∗` (§7, p8).
