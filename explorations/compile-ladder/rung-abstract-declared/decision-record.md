<!-- The decision record of climb batch 22c's rung A: the specification's export rule revised so that a component declares each method its api declares abstract (P-158), with the original, the new text, the reason and the way back. -->
# Decision record: an abstract method of an exported trait

The decision is P-158 (`explorations/coordinator/POSITIONS.md`), confirmed against this passage by the curator's answer to climb batch 22c's question 3, option 1 (`explorations/coordinator/CLIMB-BATCH-22c.md`, section 2). Its ground is P-26, the type group's later word over the specification's early text. The Appendix I entry is `Specification/appendices/changes.tex`, "An abstract method of an exported trait", `\seclabel{revival-export-abstract}`; the box at the passage cites it.

## 1. The rule, in short

A trait or object declaration of a component that satisfies an exported one declares each method that the exported declaration declares `abstract`, at its header, apart from the `abstract` modifier, with a body or without one. The compiled export check refuses a component that leaves such a method out ("missing members of the trait/object in the component") or declares it at another header ("different method f"); the type checker then checks, as for any trait, that each object defines it.

## 2. Why: the three sources, read in P-26's order

- **The text** (the Working Draft of February 2011, `Specification-1.0-frozen/basic/components/source-code.tex:380-385`, the same in the base's `Specification/basic/components/source-code.tex:380-385`) asks a satisfying declaration only "for each field declaration and non-abstract method declaration in the exported declaration", and allows "a concrete declaration" for an abstract one. So it asks no declaration of an abstract method. `apis.tex:252-256` ("includes definitions for all declarations other than the methods or fields declared abstract in d") asks no body; it is silent on the declaration.
- **The compiler's library**, the type group's later work: its api declares `abstract loop(body:ZZ32->()): ()` and the other generator methods of `GeneratorZZ32` (`Library/CompilerLibrary.fsi:110-120`), and its component restates each without a body (`Library/CompilerLibrary.fss:301-312`).
- **The team's compiled export check**: in `edb516dba` (Sukyoung Ryu, 2009-03-10) `equalListMembers` compared the api's and the component's members one by one, `left.length == right.length`, each method by `equalFnHeaders(headerL, headerR, true)`, the `abstract` modifier ignored; in the parentless snapshots from `26718e298` (2011-12-06) to `5a68404fd` (2012-07-19) it refused a component trait with fewer members than its api's, `inAPI.length > inComp.length`, and matched each api member by `exists`. The revival's `031c38bbc` (climb batch 21b, rung E) made it skip every api member written `abstract`, reading `apis.tex` as asking no member where it asks no body (`explorations/conversations/02-phase3-exit-foundations.md`, section 3).
- **The interpreter's library**, written for walk, which finds a method on the object by name and never needed the declaration, left 12 such methods out of its component's traits (`String`'s 7, `Range`'s `isEmpty`, `ReadableArray`'s `opr[_:TrivialOpenRange]`, `ActualReduction`'s `empty` and `join`, `AnyMaybe`'s `holds`).

The cost of the text's reading: a compiled client's call of such a method is an `invokeinterface` on the component's trait interface, so it dies with `NoSuchMethodError` even where every object defines the method (row 816; `explorations/perf-probes/export-abstract-codegen/REPORT.md`, "In short" and section 5: 9 of the library's 12 die, 3 resolve through a parent trait that declares them at the same descriptor).

## 3. The passage

### 3.1 The satisfying trait or object declaration (`basic/components/source-code.tex`, subsection "Export Statements")

Original (`Specification-1.0-frozen/basic/components/source-code.tex:380-385`; the base's `Specification/basic/components/source-code.tex:380-385`, the same):

```latex
and contains,
for each field declaration and non-abstract method declaration
in the exported declaration,
a satisfying declaration (or a set of declarations).
When a trait has an abstract method declared,
a satisfying trait declaration is allowed to provide a concrete declaration.
```

New (`Specification/basic/components/source-code.tex:381-399`):

```latex
and contains,
for each field declaration and non-abstract method declaration
in the exported declaration,
a satisfying declaration (or a set of declarations),
and, for each abstract method declaration in the exported declaration,
a method declaration with the same header,
apart from the modifier \KWD{abstract},
with a body or without one.
When a trait has an abstract method declared,
a satisfying trait declaration is allowed to provide a concrete declaration.
```

followed by the box `\revision{revival-export-abstract}{...}`, which says what the Working Draft asked, what the revival decided on 25 October 2026, and that a compiled call of such a method names the satisfying trait's declaration of it. The subsection gains `\seclabel{export-statements}` (`source-code.tex:289`), so that Appendix I can cite it.

Reason: section 2. "The same header, apart from the modifier abstract" is the team's `ignoreAbstract` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:606-619`), the reading of their 2009 member comparison and of P-158's "with a body or without one". The team's 2012 snapshot compared the modifiers whole; under it the components' bodies for `Indexed`'s `size` and `Equality`'s `=`, which the api writes `abstract`, are refused (`explorations/coordinator/CLIMB-BATCH-22c.md`, section 4, run `as`), and so is the guard `ProjectFortress/compiler_tests/ExportAbstractMemberDefined`.

The sentence "When a trait has an abstract method declared, a satisfying trait declaration is allowed to provide a concrete declaration" stands: the new clause's "with a body" says the same, and the sentence keeps the team's words.

Way back: restore the original sentence ending "a satisfying declaration (or a set of declarations)." and remove the clause, the box and the label; return `equalListMembers` to skipping an api member written `abstract` (`031c38bbc`'s form). The 12 declarations of `Library/FortressLibrary.fss` would then be unnecessary and harmless. The other way to keep a compiled call alive without the declaration, the code generator declaring an api's abstract method in the component's trait interface (`explorations/perf-probes/export-abstract-codegen/REPORT.md`, section 3, about 30 lines), leaves the absent member with no object defining it, the other header, a narrower return type and a functional method dying at run time, and lets the checker refuse none of them.

### 3.2 What stays true

- `Specification/basic/components/apis.tex:252-256`: a matching definition includes definitions for all declarations other than the abstract ones; no body is asked, and the revised rule asks none.
- `Specification/basic/components/apis.tex:160-162`: whether a declaration includes `abstract` "has a significant effect on its meaning": it still decides whether the component must give a body.
- `Specification/basic/components/source-code.tex:352-354`: an abstract function declaration in the form of a variable declaration in an api "need not be replicated in a component": a top-level declaration, not a trait's method; unchanged.
- The team's notes after the passage (`source-code.tex:443` and `:447`): note 2 speaks of a method abstract in the component and not in the api, the other direction; note 4 of top-level abstract function declarations.
- `Specification/fortress/preamble.tex:54-64`: the front matter's paragraph speaks of the revisions in general; it stays true.

## 4. Departures

- Walk compares no component with the apis it exports: its check of missing exported names is commented out (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildApiEnvironment.java:48-136`), and it never compares a trait's members. So it loads and runs a component that leaves such a method out, or declares it at another header, where each object defines it (row 841; `explorations/compile-ladder/rung-abstract-declared/REPORT.md`, section 7). Its home is P-12's step, walk running the checker.
- The compiled path, corrected after climb batch 22c's merged-diff review (`explorations/compile-ladder/climb-batch-22c/JUDGE-review.md`): the check meets the clause on abstract methods, but departs from the rest of the revised sentence, each departure named with its row in the entry's Effect: it compares no name of an object's value parameter (row 839, the team's `equalParams`); it takes only a field as satisfying an api trait's field, not a getter (row 842, `ProjectFortress/compiler_tests/XXXExportFieldByGetter`); it takes a method that is not abstract only at the api's header, its return type included (row 834, `CONTESTED`); and, after rung L, it compares an object's value parameter less `var` (row 844, `CONTESTED`, the gather's).
