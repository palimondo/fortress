# Polymorphic Symmetric Multiple Dispatch with Variance

Gyunghee Park (KAIST and Oracle Labs), Jaemin Hong (KAIST), Guy L. Steele Jr.
(Oracle Labs) and Sukyoung Ryu (KAIST), *Polymorphic Symmetric Multiple
Dispatch with Variance*, Proceedings of the ACM on Programming Languages 3,
POPL, Article 11, January 2019, 28 pages, doi:10.1145/3290324
(https://dl.acm.org/doi/10.1145/3290324). The paper was presented at POPL
2019.

## The files

- `3290324-popl19w.pdf`: the paper as ACM published it, 28 pages.
- `3290324-popl19-TR.pdf`: the technical report, *Polymorphic Symmetric
  Multiple Dispatch with Variance (Extended with Formalization)*, 74 pages.
  It is the paper extended with the formalization, in appendices on the
  conditional type relations, the type matching rules, the lemmas and the
  proofs of the theorems.

The report's LaTeX sources:

- `paper.tex`: the main file, with the title, the authors and the abstract.
  It reads `macros.tex`, then the chapters below in this order.
- `intro.tex` (Introduction), `motiv.tex` (Motivation), `lang.tex`
  (Language), `rules.tex` (Overloading Rules), `resolve.tex` (Overloading
  Resolution), `related.tex` (Related Work), `conclude.tex` (Conclusion) and
  `appendix.tex` (the appendices).
- `macros.tex`: the report's own macros.
- `ref.bib`: its bibliography.
- `fortify.sty`: Sukyoung Ryu's copy of `Fortify/fortify.sty`, the Fortress
  project's macros for typesetting Fortress code, with its Oracle copyright
  notice. It differs from the project's last version of that file in two
  places: it loads no `amssymb`, and it sets type names in `\mathtt`, not
  `\mathrm`.
- `bcprules.sty`: "BCP's latex tricks for typesetting inference rules",
  version 1.4, as its header names it.
- `metanotation.sty`: macros for the notation of the rules: boxed
  expressions, repetitions with separators and bindings, and don't-care
  marks.
- `acmart.cls`: ACM's article class, version 1.43 of 2017/07/09.
- `ACM-Reference-Format.bst`: ACM's bibliography style, version 2.1 of 14
  June 2017.

## Permission and licence

The technical report and its sources are included with Sukyoung Ryu's
permission. She permitted the report on 2026-10-29: "It's okay to include it
publicly in the repository." She sent the sources on 2026-10-30.

The paper's first page prints its licence: "This work is licensed under a
Creative Commons Attribution-NonCommercial 4.0 International License. © 2019
Copyright held by the owner/author(s)." The report prints no licence of its
own.

`acmart.cls` and `ACM-Reference-Format.bst` are ACM's files and carry their
own terms, not the paper's licence. The class's header refers to its source,
`acmart.dtx`, for its copyright and its terms of distribution. The style's
header gives its licence as "public domain".

Working notes on the paper, its full text and the transcript of its talk are
in `research/extracts/`, and `research/README.md` gives their provenance.
