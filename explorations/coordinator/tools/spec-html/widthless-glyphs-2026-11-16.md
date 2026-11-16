<!-- Every place in the two editions of the specification reader where a display holds a glyph of no width (the slash of `\not`, the bar of `\mapsto`), by page and section, with what the page showed on the curator's phone before the repair of 2026-11-16 and what it shows now; the cause and the repair are in `curator-notes.md` (2026-11-16) and in the README ("The glyphs of no width"). -->

# The glyphs of no width in the displays, 2026-11-16

TeX sets two glyphs of the symbol font (cmsy) with no width, so that the next sign is set over them: the slash of `\not` (code 54), which with `=` makes ≠, and the bar of `\mapsto` (code 55), which with → makes ↦. No other font that the displays use has a glyph of no width that a display uses (stmary has five, the pieces of its long arrows; no display sets one).

What each column means:

- **Slash alone.** The sign under the slash is in another font (`=` and `<` are in cmr, the slash in cmsy), or dvisvgm wrote it as a separate piece of text. The slash was then the only character of its `<text>`, a piece of text of no width. This is the kind that the curator's phone did not paint: the page showed the sign without its slash, `=` for ≠.
- **Slash beside its sign, bar of ↦.** The next sign is in the same font (∈, ≡, ⊂, →), and dvisvgm wrote the two in one `<text>`. On the phone the ↦ of section E.2.3, which is of this kind, was right. Whether every one of these was painted there is not known: no browser but Chromium runs in the container, and Chromium painted all of them.
- **Now.** All of both kinds are drawn as paths from the glyph's own outline, at the same place. In Chromium the pictures before and after are the same; `check.js` fails if a display leaves one to the text.

The lists are made from the pages as they were before the repair (commit `14f2c50b39`), by reading each display's text: sorted by the number of lost slashes.

## The Working Draft of February 2011 (`docs/specification/`)

161 glyphs of no width in 43 sections of 20 pages: 68 slashes alone in their text (the lost kind; 45 of them stand over `=`), 37 slashes beside their sign, 56 bars of ↦.

| Page | Section | Slash alone: the page showed the sign without it | of which `=` for ≠ | Slash beside its sign | Bar of ↦ |
|---|---|---|---|---|---|
| Chapter 33 (`lib-numbers-basic.html`) | 33.1 Rational Numbers | 25 | 17 | – | – |
| Chapter 41 (`lib-numbers-advanced.html`) | 41.1 The Trait Fortress.Standard.RationalQuantity | 9 | 6 | – | – |
| Appendix A (`calculi.html`) | A.4.3 Static Semantics | 5 | 4 | 2 | 2 |
| Appendix A (`calculi.html`) | A.3.3 Static Semantics | 4 | 3 | – | – |
| Appendix A (`calculi.html`) | A.2.2 Dynamic Semantics | 3 | 3 | 2 | – |
| Chapter 29 (`default-libraries.html`) | Numeric hierarchy | 2 | 2 | – | – |
| Appendix F (`operator-precedence.html`) | F.5.2 Plain Comparison Operators | 2 | – | – | – |
| Appendix F (`operator-precedence.html`) | F.5.5 Curly Comparison Operators | 2 | – | – | – |
| Chapter 16 (`operators.html`) | 16.2 Operator Precedence and Associativity | 2 | – | 2 | – |
| Appendix B (`overloaded-functional.html`) | B.2 Proof of Overloading Resolution for Functions | 2 | – | – | – |
| Appendix E (`ascii-unicode.html`) | E.2.2 Converting Restricted Words | 1 | 1 | – | – |
| Appendix E (`ascii-unicode.html`) | E.2.3 Converting ASCII Symbol Sequences | 1 | 1 | – | 1 |
| Chapter 29 (`default-libraries.html`) | Equality and ordering | 1 | 1 | – | – |
| Chapter 9 (`functions.html`) | 9.4 Function Contracts | 1 | 1 | – | – |
| Appendix J (`internal-document.html`) | J.3.11 where Clauses on Methods | 1 | 1 | – | – |
| Chapter 40 (`lib-algebraic-constraints.html`) | 40.5 Monoids, Groups, Rings, and Fields | 1 | 1 | – | – |
| Chapter 43 (`lib-binary.html`) | 43.7 The Trait Fortress.Core.BasicBinaryOperations | 1 | 1 | – | – |
| Appendix F (`operator-precedence.html`) | F.5.1 Equivalence and Inequivalence Operators | 1 | 1 | 4 | – |
| Appendix F (`operator-precedence.html`) | F.7 Other Operators | 1 | – | – | 1 |
| Chapter 16 (`operators.html`) | 16.9.13 Logical Operators | 1 | 1 | – | – |
| Appendix B (`overloaded-functional.html`) | B.1 Proof of Coercion Resolution for Functions | 1 | – | – | – |
| Chapter 2 (`overview.html`) | 2.4 Rendering | 1 | 1 | 4 | – |
| Appendix A (`calculi.html`) | A.1.2 Dynamic Semantics | – | – | 1 | – |
| Appendix A (`calculi.html`) | A.1.3 Static Semantics | – | – | 2 | – |
| Appendix A (`calculi.html`) | A.2.3 Static Semantics | – | – | 3 | – |
| Appendix A (`calculi.html`) | A.4.2 Dynamic Semantics | – | – | 1 | 20 |
| Appendix G (`concrete-syntax.html`) | G.8 Parameters | – | – | – | 2 |
| Appendix G (`concrete-syntax.html`) | G.10 Method Parameters | – | – | – | 2 |
| Appendix G (`concrete-syntax.html`) | G.13 Expressions | – | – | – | 1 |
| Appendix G (`concrete-syntax.html`) | G.14 Expressions Enclosed by Keywords or Symbols | – | – | – | 3 |
| Chapter 29 (`default-libraries.html`) | Generator support | – | – | 1 | – |
| Chapter 29 (`default-libraries.html`) | 29.2.1 FortressBuiltin | – | – | 1 | – |
| Chapter 13 (`expressions.html`) | 13.29.2 Map Expressions | – | – | – | 3 |
| Chapter 13 (`expressions.html`) | 13.30 Comprehensions | – | – | – | 11 |
| Chapter 4 (`lexical-structure.html`) | 4.1 Characters | – | – | – | 1 |
| Chapter 32 (`lib-booleans.html`) | 32.2 The Trait Fortress.Standard.BooleanInterval | – | – | 5 | – |
| Appendix F (`operator-precedence.html`) | F.5.3 Set Comparison Operators | – | – | 2 | – |
| Appendix F (`operator-precedence.html`) | F.5.4 Square Comparison Operators | – | – | 2 | – |
| Appendix F (`operator-precedence.html`) | F.5.8 Miscellaneous Relational Operators | – | – | 1 | – |
| Chapter 25 (`operatordefs.html`) | Sections | – | – | – | 2 |
| Chapter 30 (`optional-libraries.html`) | 30.6 Map | – | – | – | 4 |
| Chapter 2 (`overview.html`) | 2.11 Aggregate Expressions | – | – | – | 3 |
| Chapter 34 (`lib-negated-relational-operators.html`) | the headings of four sections | – | – | 4 | – |

## The revised edition (`docs/specification/revival/`)

177 glyphs of no width in 46 sections of 20 pages: 84 slashes alone in their text (the lost kind; 55 of them stand over `=`), 37 slashes beside their sign, 56 bars of ↦.

| Page | Section | Slash alone: the page showed the sign without it | of which `=` for ≠ | Slash beside its sign | Bar of ↦ |
|---|---|---|---|---|---|
| Appendix I (`spec-changes.html`) | I.1.11 The number types | 26 | 15 | – | – |
| Chapter 41 (`lib-numbers-advanced.html`) | 41.1 The Trait Fortress.Standard.RationalQuantity | 9 | 6 | – | – |
| Appendix I (`spec-changes.html`) | I.1.12 The rational trait | 9 | 7 | – | – |
| Appendix A (`calculi.html`) | A.4.3 Static Semantics | 5 | 4 | 2 | 2 |
| Appendix A (`calculi.html`) | A.3.3 Static Semantics | 4 | 3 | – | – |
| Appendix I (`spec-changes.html`) | I.1.13 The integer trait | 4 | 2 | – | – |
| Appendix A (`calculi.html`) | A.2.2 Dynamic Semantics | 3 | 3 | 2 | – |
| Appendix I (`spec-changes.html`) | I.1.25 The algebra of the rational trait | 3 | 3 | – | – |
| Appendix F (`operator-precedence.html`) | F.5.2 Plain Comparison Operators | 2 | – | – | – |
| Appendix F (`operator-precedence.html`) | F.5.5 Curly Comparison Operators | 2 | – | – | – |
| Chapter 16 (`operators.html`) | 16.2 Operator Precedence and Associativity | 2 | – | 2 | – |
| Appendix E (`ascii-unicode.html`) | E.2.2 Converting Restricted Words | 1 | 1 | – | – |
| Appendix E (`ascii-unicode.html`) | E.2.3 Converting ASCII Symbol Sequences | 1 | 1 | – | 1 |
| Chapter 29 (`default-libraries.html`) | Equality and ordering | 1 | 1 | – | – |
| Chapter 29 (`default-libraries.html`) | Numeric hierarchy | 1 | 1 | – | – |
| Chapter 29 (`default-libraries.html`) | 29.2.1 FortressBuiltin | 1 | 1 | 1 | – |
| Chapter 9 (`functions.html`) | 9.4 Function Contracts | 1 | 1 | – | – |
| Appendix J (`internal-document.html`) | J.3.11 where Clauses on Methods | 1 | 1 | – | – |
| Chapter 40 (`lib-algebraic-constraints.html`) | 40.5 Monoids, Groups, Rings, and Fields | 1 | 1 | – | – |
| Chapter 43 (`lib-binary.html`) | 43.7 The Trait Fortress.Core.BasicBinaryOperations | 1 | 1 | – | – |
| Appendix F (`operator-precedence.html`) | F.5.1 Equivalence and Inequivalence Operators | 1 | 1 | 4 | – |
| Appendix F (`operator-precedence.html`) | F.7 Other Operators | 1 | – | – | 1 |
| Chapter 16 (`operators.html`) | 16.9.13 Logical Operators | 1 | 1 | – | – |
| Appendix B (`overloaded-functional.html`) | B.1 Proof of Coercion Resolution for Functions | 1 | – | – | – |
| Appendix B (`overloaded-functional.html`) | B.2 Proof of Overloading Resolution for Functions | 1 | – | – | – |
| Chapter 2 (`overview.html`) | 2.4 Rendering | 1 | 1 | 4 | – |
| Appendix A (`calculi.html`) | A.1.2 Dynamic Semantics | – | – | 1 | – |
| Appendix A (`calculi.html`) | A.1.3 Static Semantics | – | – | 2 | – |
| Appendix A (`calculi.html`) | A.2.3 Static Semantics | – | – | 3 | – |
| Appendix A (`calculi.html`) | A.4.2 Dynamic Semantics | – | – | 1 | 20 |
| Appendix G (`concrete-syntax.html`) | G.8 Parameters | – | – | – | 2 |
| Appendix G (`concrete-syntax.html`) | G.10 Method Parameters | – | – | – | 2 |
| Appendix G (`concrete-syntax.html`) | G.13 Expressions | – | – | – | 1 |
| Appendix G (`concrete-syntax.html`) | G.14 Expressions Enclosed by Keywords or Symbols | – | – | – | 3 |
| Chapter 29 (`default-libraries.html`) | Generator support | – | – | 1 | – |
| Chapter 13 (`expressions.html`) | 13.29.2 Map Expressions | – | – | – | 3 |
| Chapter 13 (`expressions.html`) | 13.30 Comprehensions | – | – | – | 11 |
| Chapter 4 (`lexical-structure.html`) | 4.1 Characters | – | – | – | 1 |
| Chapter 32 (`lib-booleans.html`) | 32.2 The Trait Fortress.Standard.BooleanInterval | – | – | 5 | – |
| Appendix F (`operator-precedence.html`) | F.5.3 Set Comparison Operators | – | – | 2 | – |
| Appendix F (`operator-precedence.html`) | F.5.4 Square Comparison Operators | – | – | 2 | – |
| Appendix F (`operator-precedence.html`) | F.5.8 Miscellaneous Relational Operators | – | – | 1 | – |
| Chapter 25 (`operatordefs.html`) | Sections | – | – | – | 2 |
| Chapter 30 (`optional-libraries.html`) | 30.6 Map | – | – | – | 4 |
| Chapter 2 (`overview.html`) | 2.11 Aggregate Expressions | – | – | – | 3 |
| Chapter 34 (`lib-negated-relational-operators.html`) | the headings of four sections | – | – | 4 | – |
