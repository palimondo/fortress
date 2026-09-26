<!-- Review written 2026-09-26 by a delegated worker session, for Pavol: in what form the revised specification shows that the revival changed a passage, and where the original text and the reasoning live. Built fresh from Specification/, its build, its git history and peer language specifications; the revival's planning notes on this question were not read. No other file in the tree was changed, and no PDF was built. -->

# How a revival change should show in the specification

## The question, and the words used

The revival will change a rule of the language. The compiled type checker keeps the
*multiple instantiation exclusion*: a type may not be a subtype of two different
instantiations of one generic type (for example, of both `List⟦ZZ32⟧` and `List⟦String⟧`).
Some sentences of the specification, the language definition kept as LaTeX sources in
`Specification/` (the "July 2012 draft"), allow exactly that, and some of its examples rely
on it. Those sentences will be edited. The question here is only the *form* of that edit:
how the rebuilt `Specification/fortress.pdf` shows that a passage was changed by the
revival, and where the original wording and the reasoning are kept.

Pavol's requirement (2026-09-24), split into the five things it asks for:

- **D1** "update the spec with the change that we do";
- **D2** "somehow properly record why we decided that way";
- **D3** "no open discrepancy between the spec and our implementation that would be confusing to people";
- **D4** "preserve the original historic record somewhere in a document with our reasoning why we did the switch";
- **D5** "preserve the option to go the route C".

*Route C* is not defined in the brief. I read it as the route that keeps the
specification's permission and makes the implementation support a type extending two
instantiations. If that reading is wrong, only the wording of the route-C remarks in § 8
changes, not the costs.

Two words recur. *Normative* text is the text that defines the language: a program is
right or wrong by it. *Informative* text explains and binds nothing. Standards put
informative material in *annexes*, which are appendices of a standard.

## First: every way to show a change

### Ways the specification's own sources, macros and build offer

1. **Draft note at the passage.** `\note{...}` prints a tinted box labelled "Draft note"
   in the *draft build* (the PDF made with the release switch off) and prints nothing in
   the *release build* (the PDF made with it on, as the 1.0 PDF was)
   (`Specification/fortress/fortress.tex:35-36` for release,
   `:58-62` for draft). It carries 230 notes in 77 source files.
2. **Margin note.** `\marginnote{...}` puts tiny text in the 0.7-inch margin, draft build
   only (`fortress.tex:37`, `:66-72`). 19 uses.
3. **The draft/release switch.** `\ifrelease` (`fortress.tex:24-29`) selects text at
   build time; one source gives two PDFs. Outside the master file it is used once, to
   leave the internal appendix out of a release build (`appendices/appendices.tex:24-27`).
4. **The changes appendix.** `appendices/changes.tex:12-16`, a chapter titled "Changes
   Since Fortress 1.0 Specifications", printed in both builds (`appendices.tex:23`, outside
   the switch). It is Appendix I, page 575 of the committed PDF. Its whole content is one
   draft note pointing at `projectfortress.sun.com/.../changeset/1444`, a host that no
   longer resolves (checked 2026-09-26). Its label `app:spec-changes` is referenced nowhere.
5. **The internal appendix.** Appendix J, "Internal Document", draft build only
   (`appendices/internal-document.tex:12-15`), holding worked examples, a list of things to
   check (`:645`), a question-and-answer section (`appendices/FAQ.tex:12`) and "Proposed
   Features" (`appendices/future.tex:12-16`: "technical issues that are proposed but not yet
   fully discussed"). Proposals there record the options and who favoured which
   (`future.tex:61-73`: "There were three options ... Jan and Guy were for the option 3").
6. **The front matter.** A full-page figure after the title page
   (`fortress/preamble.tex:12-52`) says how this draft relates to 1.0 and to the
   implementation; a second figure lists the features not yet implemented
   (`preamble.tex:55-97`).
7. **Superseded text kept as a LaTeX comment.** The 1.0 front-matter text survives, commented
   out, under `%% Description in F1.0 -- Sukyoung` (`preamble.tex:99-155`); commit `44e03b176`
   did the same for one sentence of `basic/expressions/aggregate.tex`. Invisible in both
   builds.
8. **The title-page date line.** `fortress.tex:110-117` prints "Working Draft" and a date
   (draft) or "Version 1.0" (release). The revival already changed it once (`414b790e3`).
9. **Footnote.** Plain LaTeX `\footnote`, 23 uses, printed in both builds.
10. **A source comment on a revival edit.** `% 2026 revival styling (draft-mode rendering
    only, not historical): ...` at `fortress.tex:39-45`; the same form in
    `Fortify/fortify.sty` (commit `9622f9db3`), the macros of Fortify, the tool that
    typesets Fortress code for LaTeX.
11. **The commit message.** Every edit has one; the team's were one line tagged `[spec]`, the
    revival's run to a page.
12. **A whole-tree snapshot.** `Specification-1.0-frozen/` (commit `c02fa44d0`, Guy Steele,
    2012-01-04, "Cloned Specification directory into Specification-1.0-frozen"), and the 1.0
    release PDF inside it (`fortress.1.0.pdf`, first committed in `403afbe0b`, 2008-03-31).
13. **A fresh document beside the old one.** In May 2012 Steele and Luchangco began a
    restructured specification in `Documentation/Specification/` (`37d7e5619`, `e86881099`,
    `61f60e5fe`, `275b90773`, `56f7dce8f`). Its macros print notes in every build and add
    `\redundant` (`Documentation/Specification/Support/macros.tex:17-22`); its appendix plan
    lists "Differences from previous versions" and a commented-out
    `\input{\appendixdir/changes}` (`Prose/Appendices/appendices.tick:29`, `:45`).

The build adds a constraint rather than a way. Many code examples are not written in the
LaTeX: `Specification/fortress/build.xml:121-157` generates them from the tested programs in
`SpecData/examples/` and from the library interface files (`Library/*.fsi`,
`ProjectFortress/LibraryBuiltin/*.fsi`), and `:161-170` runs the examples through the
interpreter. The generated files are not committed (`.gitignore:57` and neighbours). A mark
written in the hand-kept LaTeX cannot reach generated text.

No change-bar or inserted/deleted-text package is loaded (`fortress.tex:19-22`, `:46`).
The TeX Live 2023 in this container has `changebar`, `changes`, `ulem` and `soul`
installed (`kpsewhich`), so either kind of mark could be added. That was not tried.

### Further ways the peers use

14. **A changes annex with one entry per change and a reason in each.** The C++ standard's
    Annex C.
15. **Change bars in the margin.** A *change bar* is a vertical rule beside changed lines.
    Steele's own *Common Lisp: the Language*, 2nd edition, uses one kind of rule for new
    text and another for old text that is now outdated.
16. **Inserted and deleted text shown in place.** Underlined insertions and struck-through
    deletions, sometimes with a version tag on each paragraph (Ada).
17. **A labelled callout at the passage.** A short boxed or headed paragraph saying what
    changed, and in which version (Rust, Python, Go).
18. **A distinguishing typeface for outdated material.** Fortran prints obsolescent
    features in smaller type.
19. **An annotated edition built from the same source.** One source gives both the clean
    normative text and a second document with the same text plus annotations (Ada).
20. **A separate rationale or commentary, organised like the specification.** For C and
    for Standard ML.
21. **Decision records outside the text, cross-referenced from it, that keep the
    alternatives.** The issue write-ups of X3J13, the committee that made the ANSI Common Lisp
    standard; Java's JEPs (JDK Enhancement Proposals); Python's PEPs (Python Enhancement
    Proposals); Rust's RFCs (requests for comments).
22. **A separate change document** that shows the difference against the current text
    and explains it in boxes. The Java Language Specification's per-feature change documents.

The sources for 14 to 22 are in step 6.

## The nine steps of protocol § 6, adapted to a question of form

### 1. The refresher: what each form is

- A **changes annex** is a chapter, usually informative, that lists what differs from the
  previous edition. The fuller kind gives each change a clause reference, the reason and
  the effect on old programs. The short kind is a bulleted summary.
- An **annotated edition** prints the whole normative text and adds labelled commentary
  between the paragraphs: why a rule is there, what it rules out, what changed since the
  previous edition. The normative edition is the same text without the commentary.
- **Inline marking** changes how the text itself is printed: bars or rules in the margin,
  underline and strike-through, a smaller typeface, or a labelled callout paragraph. The
  reader sees the change where they read the rule.
- **History outside the text** keeps the specification clean and puts the reasons, the
  alternatives and the old wording in separate records (proposals, issue write-ups, change
  documents, version control). The specification may or may not point to them.
- **Two builds from one source** is not a family of its own. It is the mechanism the
  Fortress sources already have (`\ifrelease`), and it can carry any of the four: marks in
  one build and none in the other.

### 2. What the specification does today, measured

- The committed `Specification/fortress.pdf` (599 pages, built 2026-08-23) is a draft
  build. Its title page reads "Working Draft / July 19, 2012" (the draft branch of
  `fortress.tex:112-116`); `\releasetrue` is commented out (`:31-33`). The revival has never
  made a release build.
- Draft notes: 230 in the sources, and 230 "DRAFT NOTE" labels in the PDF's extracted text,
  so every note prints. By place: 189 in the basic-language part, 22 in the advanced part,
  9 in the appendices, 7 in the preliminaries, 3 in the library parts. 99 open a section
  (a heading within the three non-blank lines before the note). 54 state implementation status ("not yet supported",
  "not tested nor run"), 46 of them at a section's start, as the front matter promises.
  13 carry a date, 61 name a team member (by a pattern search), 44 contain a question. The notes are the team's working remarks, not a record of revisions.
- Margin notes: 19, mostly review questions (for example
  `basic/expressions/literals.tex:45`, `:61`, `:151`).
- The changes appendix: 16 lines, one note, a dead link, no references to it (way 4).
- The internal appendix: 699 lines plus 235 (FAQ) plus 756 (Proposed Features), printed
  as Appendix J. It already holds the team's own worry about this very rule: "Weirdness with
  Multiple Inheritance and Polymorphism", "We noticed that you can get some fairly odd
  behavior if you allow inheriting from the same trait multiple times with different static
  arguments" (`internal-document.tex:363-365`, PDF page 593), with an example whose
  `badChild extends { Parent⟦ZZ32⟧, Parent⟦String⟧ }`. It was in the October–November
  2009 import (`cec470a34`); its origin is older than the git record.
- The passage most plainly affected, "Trait declarations are allowed to extend other
  instantiations of themselves" (`basic/trait-parameters.tex:339-367`, PDF page 115), is in
  the "Where Clauses" section, whose opening note already says "The where clause syntax in
  this section is out of date" (`trait-parameters.tex:287`). Its two examples are written as
  Fortify output in the LaTeX, with the Fortress source in comments above them, not
  generated from `SpecData/`.
  The sentence is not in the 1.0 release PDF's text.
- The revival's marks so far: a source comment (way 10) and long commit messages. Nothing in
  the PDF says the revival touched it, apart from the restyled "Draft note" label, which
  names the authors' notes, and the title date, which the revival set.

### 3. What the specification's prose says about its own revisions

- The front matter describes the specification as tracking an implementation: "In order to
  synchronize the specification with the implementation, it was necessary both to add
  features to the implementation and to drop features from the specification"
  (`preamble.tex:24-26`), and "This specification is a working draft ... it may include wild
  ideas" (`:42-48`).
- It names its own marking conventions: "descriptions of unimplemented features in boxes at
  the beginning of sections, and informal comments and notes in boxes in the margin"
  (`preamble.tex:49-51`). Those are ways 1 and 2. There is no convention for "this rule was
  changed".
- It lists the features not yet implemented (`preamble.tex:55-97`, "widening coercion"
  first). This is the specification's place for what the implementation does, kept apart
  from what the language is. If the interpreter learns coercion, that list changes, which
  is a separate edit of the same kind.
- A handful of notes speak of the text's own history: "From here, copied from F1.0β"
  (`basic/expressions/literals.tex:28`; also
  `advanced/parallelism-locality/early-termination.tex:29`, `defining-generators.tex:232`);
  "This section was not in F1.0β nor in F1.0" (`basic/expressions/reductions.tex:98`);
  "SOLIDUS ... was an ordinary operator character in 1.0b but it is a special operator
  character in 1.0. Why is it so?" (`basic/lexical-structure.tex:219`).
- The 1.0 release said where it departed from its predecessor, in the front matter: "Contrary
  to the Fortress Language Specification, Version 1.0β, inference of static parameter
  instantiations is based on the runtime types of the arguments" (`fortress.1.0.pdf` page 2;
  kept as a comment at `preamble.tex:125-127`).
- The changes appendix promises, by its title, the changes since 1.0, and delivers only a link.

### 4. The numeric tower

This step does not apply to a question of form, with one exception. The library chapters of
Part V are generated from the interpreter library's interface files
(`library/default-libraries.tex:27`, `:39` input `FortressLibrary.tex` and
`FortressBuiltin.tex`, made by `build.xml:129-139`, `:153-156`). If the tower is flattened by
editing those `.fsi` files, the chapters change at the next build with no mark in any text.
Only an appendix entry or an outside record can cover generated chapters. The hand-kept tower
chapter (`basic-lib/numbers.tex`) can carry inline marks like any other.

### 5. What the team already did when it revised the text

- **For a release (2008).** The 1.0 PDF opens with a front-matter statement of where and why
  it departs from 1.0β ("to synchronize the specification with the implementation", page 2)
  and ends with Appendix F, "Changes between Fortress 1.0 β and 1.0 Specifications" (pages
  259-260). Appendix F is a short-form changes annex. Its bullets are: features "temporarily
  dropped" to match the implementation (16 listed); libraries changed; syntax and semantics
  changed, each with its chapter or section number; features added; features eliminated.
  It gives no reason per item. Neither the internal appendix nor the "not yet supported"
  boxes appear in the 1.0 PDF's text, which fits a release build.
- **For the working draft (2009).** Sukyoung Ryu re-imported the sources part by part
  (`3ac302f43` to `0f49d8698`, 2009-10-19 to 11-06), "The next task is to integrate the
  technical decisions since 1.0." She then added the list of features not yet implemented
  (`61e28a78c`) and "the technical decisions since F1.0beta and the issues to discuss"
  (`93f5018fd`, 27 files, 39 note lines added and 6 removed, Proposed Features rewritten).
  Those decisions went in as draft notes at the passage, often dated and attributed:
  "We require a dotted field access by a “self.” prefix. (08/11/08) -- Sukyoung"
  (`basic/traits.tex:310`), "Resolve ambiguity in favor of longest API name. (07/23/09)"
  (`basic/components/intro.tex:99`). Reviewers' remarks went in as notes and margin notes
  (`178405db2`, 14 notes and 8 margin notes), and a proposal went into Proposed Features
  (`3f89470e5`).
- **For corrections.** The team edited in place, with no mark, and gave the credit in the
  commit message: "Clarification suggested by Nels Beckman" (`9ced3777d`, Victor Luchangco,
  `advanced/overloading.tex`). Once the old sentence was kept as a LaTeX comment beside the
  new one (`44e03b176`).
- **Before a large revision (2012).** Steele copied the whole directory to
  `Specification-1.0-frozen/` (`c02fa44d0`) and, four months later, began a new document
  instead of editing the old one (way 13). The copy's name suggests the 1.0 text, but it is
  not that. `git diff 2f8b4331a:Specification c02fa44d0:Specification-1.0-frozen` is empty,
  so the frozen copy is byte-for-byte the working draft as it stood on 2011-02-02. Today it
  differs from `Specification/` in five files only (`basic-lib/objects.tex`, `fortress.tex`
  and the three table scripts; `diff -rq`), plus the PDFs.
- **The revival's two specification commits.** `414b790e3` (2026-08-21) committed the first
  rendered PDF, removed a duplicate of the 1.0 PDF, and changed the title date. `4672b71cd`
  (2026-08-23) restyled the notes and fixed the table scripts. Both put the reasoning in the
  commit message and a `% 2026 revival ... not historical` comment in `fortress.tex:39-45`.
  Neither shows anything in the PDF, and both left the frozen copy untouched on purpose. A
  third commit, `9622f9db3`, changed only `Fortify/fortify.sty` and the PDF.

### 6. What the peers do, by family

**Standards with a changes annex**

- C++: Annex C "Compatibility" is marked informative. It has one subclause per previous
  edition (C.1 "C++ and ISO C++ 2026" down to C.8 "C++ and C"), and every entry has the
  fields "Affected subclause", "Change", "Rationale", "Effect on original feature"
  (https://eel.is/c++draft/diff).
- ECMAScript: Annex E (informative) "Corrections and Clarifications in ECMAScript 2015 with
  Possible Compatibility Impact" and Annex F (informative) "Additions and Changes That
  Introduce Incompatibilities with Prior Editions". Entries are keyed by clause number
  ("7.1.4.1: In ECMAScript 2015, ToNumber applied to a String value now recognizes ...").
  Legacy features the language keeps but discourages sit in Annex B, marked normative
  (https://tc39.es/ecma262/multipage/additions-and-changes-that-introduce-incompatibilities-with-prior-editions.html).
- C: the Foreword, paragraph 6, "Major changes from the previous edition include: ..."
  (C11 draft N1570, https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf).
- Fortran: 4.3.3 "Fortran 2008 compatibility" and its siblings, down to FORTRAN 77, plus
  Annex B (informative) "Deleted and obsolescent features" (Fortran 2018 draft J3/18-007r1,
  https://j3-fortran.org/doc/year/18/18-007r1.pdf).
- Standard ML: *The Definition of Standard ML (Revised)*, Appendix G "What is New?": "For
  each major change, we give its rationale and an overview of its practical implications"
  (https://smlfamily.github.io/sml97-defn.pdf).
- Scheme: R7RS, section "Language changes" after Appendix B, with "Incompatibilities with
  R5RS", "Other language changes since R5RS" and "Incompatibilities with R6RS" (page 77,
  https://small.r7rs.org/attachment/r7rs.pdf).
- Haskell: the Haskell 2010 Report's Preface, "Haskell 2010: language and libraries", lists
  the new and removed features (https://www.haskell.org/onlinereport/haskell2010/haskellli2.html).
- Go: the appendix "Language versions" lists the features added in each version
  (https://go.dev/ref/spec#Language_versions).
- A caution. The Scala 2.13 specification's chapter 15 "Changelog" says "This changelog was
  no longer maintained after version 2.8.0"
  (https://scala-lang.org/files/archive/spec/2.13/15-changelog.html). Fortress's own
  Appendix I decayed the same way.

**An annotated edition beside the normative text**

- Ada: the Annotated Ada Reference Manual "contains the entire text of the Ada 2022 standard
  ..., plus various annotations ... The annotations include detailed rationale for individual
  rules" (Introduction 1.a/5, http://www.ada-auth.org/standards/22aarm/html/AA-0-2.html).
  Clauses end with headed sections such as "Extensions to Ada 95", "Wording Changes from Ada
  2005", "Inconsistencies With Ada 2005" and "Incompatibilities With Ada 2005" (clause 3.9,
  paragraphs 33.e/2 to 33.k/3, http://www.ada-auth.org/standards/22aarm/html/AA-3-9.html). The
  normative manual is the same text without the annotations.
- Standard ML: a separate *Commentary on Standard ML* (1991). The 1997 Definition's preface
  explains why: questions such as "Why were certain design choices made? ... Was there a
  good alternative meaning for some constructs, or was our hand forced?" could not be
  discussed in the Definition "without making it far too long" (same PDF as above, Preface).
- C: the *Rationale for International Standard — Programming Languages — C*, "organized to
  parallel the Standard as closely as possible"
  (https://www.open-std.org/jtc1/sc22/wg14/www/C99RationaleV5.10.pdf, Introduction).
- Common Lisp: the HyperSpec cross-references X3J13's issue write-ups from each page. They are
  "not part of the Common Lisp specification", yet "useful for understanding original
  intent", and "text in the specification always takes precedence"
  (https://www.lispworks.com/documentation/HyperSpec/Front/X3J13Iss.htm).

**Marking inside the text**

- *Common Lisp: the Language*, 2nd edition (Steele, 1990): "All new material is identified by
  solid lines in the left margin. Dotted lines in the left margin indicate material from the
  first edition that applies to the 1984 definition but that has been modified by a vote of
  X3J13." New text is worded "X3J13 voted at such-and-so time to make the following change",
  numbered references point to an index of votes at the end, and substantive errors are
  flagged by paragraphs beginning "Notice of correction". The book serves "as a reference
  both to the 1984 definition and to the language as modified" (Preface to the second
  edition, https://www.cs.cmu.edu/Groups/AI/html/cltl/clm/node2.html). This is the closest
  peer: the same author, and old and new wording kept side by side on purpose.
- Ada: a changed paragraph carries a version suffix ("73/5" means changed in the 2022
  edition), inserted text is underlined, deleted text struck through, and each changed
  paragraph cites the Ada Issue document that decided it ("{AI12-0313-1}"). A deleted paragraph keeps its number and
  reads "This paragraph was deleted" (AA-0-2.html, paragraph 73/5 and the next).
- Fortran: "The descriptions of obsolescent features appear in a smaller type size"
  (J3/18-007r1, 4.1.5 "Text conventions").
- Python's language reference: "Changed in version 3.x" and "Added in version" lines at the
  passage, written with the `versionchanged` and `versionadded` directives
  (https://devguide.python.org/documentation/markup/). The data-model chapter alone had 56
  lines carrying such a marker on 2026-09-26 (https://docs.python.org/3/reference/datamodel.html).
- Rust Reference: "The main text describes the latest stable edition. Differences to previous
  editions are separated in edition blocks" (https://doc.rust-lang.org/reference/introduction.html;
  for example "2018 Edition differences" in https://doc.rust-lang.org/reference/keywords.html).
- Go: "[Go 1.13]" tags at the passage, collected in the "Language versions" appendix.

**History kept outside the text**

- Java: the published language specification carries no change marks. A change is proposed
  in a JEP (https://openjdk.org/jeps/1) and specified in a separate change document: "New
  text is indicated like this and deleted text is indicated like this. Explanation and
  discussion, as needed, is set aside in grey boxes"
  (https://cr.openjdk.org/~gbierman/jep360/jep360-20200513/specs/sealed-classes-jls.html).
- Python: the reasons live in PEPs; the PEP template has a "Rejected Ideas" section, "Why
  certain ideas ... were not ultimately pursued" (https://peps.python.org/pep-0012/).
- Rust: RFCs, whose template has "Rationale and alternatives" and "Future possibilities"
  (https://github.com/rust-lang/rfcs/blob/master/0000-template.md).
- C: WG14's web site keeps "a Rationale for many of the decisions made during its preparation
  and a log of Defect Reports and Responses" (N1570, Foreword paragraph 5).
- Common Lisp: each X3J13 write-up has Problem Description, Proposal (sometimes several,
  with "Status: Proposal FIRST passed"), Rationale, Current Practice, Discussion and Edit
  History. The alternatives not taken stay on record
  (https://www.lispworks.com/documentation/HyperSpec/Issues/iss001_w.htm).

### 7. The history in the commits

The method first. Path-limited `git log -- Specification` from HEAD shows 4 commits;
`--full-history` shows 182 non-merge commits, of which 146 are *parentless snapshots*: commits
whose parent link the Mercurial-to-git conversion cut, so they look as if they add the whole
tree. I therefore walked all 6.1K commits in date order and compared the tree id of
`Specification/` at each one (`git cat-file --batch-check` on `<commit>:Specification`). That
walk finds 39 changes of the directory:

- `403afbe0b` 2008-03-31, Sukyoung Ryu: the 1.0 PDF alone.
- 2009-10-19 to 2010-01-24, 28 commits, almost all by Sukyoung Ryu, tagged `[spec]`: the import,
  the list of features not yet implemented, the decisions as notes, reviewers' notes, grammar
  revisions. Three are by Jan-Willem Maessen (a typo, two copyright fixes) and one by Victor
  Luchangco (`9ced3777d`).
- `5f7530cf4` 2010-04-08, a build fix; `44e03b176` 2010-12-09, the last change to the text
  itself; `0daa15c13` and `2f8b4331a` (2010-12-10, 2011-02-02), copyright notices only.
- 2012-01-04, the snapshot `c02fa44d0` (the frozen copy). By then two debug lines,
  `\tracingcommands=1\tracingmacros=1`, had appeared in `basic-lib/objects.tex:17`. They are
  absent at `2f8b4331a`; the parentless snapshot hides which commit added them. The other two
  changes that day are the date-order walk switching between the two lines of a merge.
- Nothing else until the revival: `414b790e3`, `4672b71cd`, `9622f9db3` (only the PDF in
  `Specification/`).

Two consequences for the form:

- What CLAUDE.md calls "the July 2012 draft" is the team's text as last edited on
  2010-12-09. The date "July 19, 2012" on the title page was set by the revival in
  `414b790e3` ("the sources' snapshot date"); it matches the parentless import `5a68404fd`
  (David Chase, 2012-07-19), not any edit to the text. An appendix entry that names its
  baseline should say which of these it means.
- `Specification-1.0-frozen/` already holds, byte for byte, the pre-revival wording of every
  passage the revival will change. For the text itself, D4 is met today. What is missing is
  the reasoning, and a pointer that says the frozen copy is the 2011 working draft, not the
  1.0 text.

### 8. The derivation from Pavol's requirement, case by case

Each case gives its cost in the PDF, for a reader, for keeping the original text
recoverable, and for reversing to route C.

- **Edit in place and nothing else.** Meets D1 and, for spec-against-implementation, D3.
  PDF: nothing. Reader: cannot tell the passage changed. A reader holding an older PDF sees
  two specifications that disagree and has no explanation. That moves Pavol's "confusing to
  people" from spec-against-implementation to spec-against-spec. Original: in the frozen copy
  and git only. Route C: nothing records it. Every other case adds to this one.
- **Draft note at the passage (way 1).** PDF: one box, draft build only. Reader: sees it,
  but under the label "Draft note", like the 230 remarks of 2007-2011. A revival decision
  would read as the 2009 team's. A separate macro with its own label avoids that at small
  cost. Original: can be quoted in the box. Route C: can be named. Disappears in a release
  build, so it cannot be the only record.
- **Margin note (way 2).** 0.7 inch of tiny type: enough for "changed 2026, see Appendix I",
  not for a reason. Draft build only.
- **Footnote (way 9).** PDF: one line at the foot of the page, both builds. Reader: a pointer
  at the point of use. It holds no reasoning, and a footnote per changed sentence gets noisy.
- **Labelled callout (ways 17, 1 with a new macro).** A short headed paragraph at the passage
  ("Changed by the 2026 revival: ... see Appendix I.n"), defined outside the release switch so
  it prints in both builds. PDF: a few lines per passage. Reader: told where they read the
  rule, as in Rust and Python. Original and route C: by reference to the appendix entry.
  Cost: one new macro in `fortress.tex`.
- **The changes appendix (ways 4, 14).** PDF: a few pages in Appendix I, both builds. Reader:
  finds every revival change in one place. The entry can hold D2 (the reason), D4 (the
  original sentences quoted verbatim, plus their path and line in the frozen copy) and D5
  (the alternative not taken and what reversing it takes). This is the specification's own
  designated place, and the form the team used for 1.0. C++'s fields fit the need better than
  the team's bullets, because D2 asks for the reason. Risk: it decays, as this appendix and
  Scala's did. It also sits under a title about changes since 1.0, so the revival's changes
  need their own section heading and their own baseline.
- **The front matter (way 6).** PDF: one paragraph on page 2. Reader: told up front that this
  draft departs from the 2012 text by decision, and where to look. Meets D3 at the level of
  the whole document. The 1.0 release did exactly this for 1.0β.
- **Title-page line (way 8).** One line ("with revisions of 2026, Appendix I"). It stops the
  title from claiming a 2012 text the PDF no longer is, but locates nothing.
- **The internal appendix and Proposed Features (way 5).** PDF: draft build only. Reader:
  finds the long form beside the team's own worry about the same rule
  (`internal-document.tex:363`). Route C: Proposed Features is where the team kept options
  that were not taken (`future.tex:61-73`), so a route-C entry there follows its practice.
  Invisible in a release build.
- **Superseded text as a LaTeX comment (way 7).** PDF: nothing. Original: kept beside the new
  text, so route C is an uncomment away. It conflicts with a standing rule, "(P) No
  unactionable comments in the source tree; provenance commentary belongs in commit
  messages" (`explorations/protocol.md:38-39`). The revival's own comment at
  `fortress.tex:39-45` already sits uneasily with that rule.
- **Source comment and commit message (ways 10, 11).** Needed whatever else is chosen: edits
  to the original tree are flagged at commit time (`explorations/protocol.md:126-127`;
  CLAUDE.md, "Layout"). Invisible to a PDF reader, so they carry the audit trail, not D2.
- **The snapshot (way 12).** Already there, untouched, and it already preserves the original
  wording (step 7). Cost: none. It needs one sentence wherever it is cited, saying what it
  really contains.
- **A fresh document (way 13).** Out of proportion for a handful of sentences. It is what the
  team did in 2012 for a restructuring, not for a rule change.
- **Change bars, old text kept and marked outdated (ways 15, 18: the CLtL2 way).** PDF: both
  wordings printed, with margin rules; an index of decisions at the end. Reader: can read
  either language, once the front matter explains the convention. Without that paragraph,
  printing both wordings is itself an open discrepancy. Original: kept in place, the most
  complete answer to D4. Route C: swap which wording carries the "outdated" rule, the
  cheapest reversal of the text. Cost: the `changebar` package, untested here with Fortify's
  tabbing output and with the note boxes (drawn by the `mdframed` package since `4672b71cd`).
  Every later edit near those passages must
  keep both wordings coherent.
- **Inserted and deleted text shown in place (way 16).** PDF: struck-through and underlined
  words in the main text. Reader: sees the exact difference, but struck text sits in the
  normative flow. Java prints this only in separate change documents, and Ada only in its
  annotated and change-marked editions. It fits an annotated build better than the main PDF.
- **Two builds, clean and annotated (ways 3, 19: the Ada way).** PDF: two files of about 2 MB
  each. Reader: chooses. Cost: the release switch as it stands also drops all 230 notes,
  including the 54 that say what is not yet implemented, and Appendix J. A clean build would
  therefore hide the implementation status, a discrepancy of its own (D3), unless a third
  mode is written. The release build has never been made by the revival.
- **A separate rationale, decision record or change document (ways 20, 21, 22).** PDF:
  nothing, or a pointer. Reader: one hop away, if they have the repository. Holds the full
  reasoning, the original text and route C with its reversal recipe. This is where D2, D4
  and D5 fit without limit of space. Risk: a pointer out of the PDF can die. The only content
  of Fortress's changes appendix is such a pointer, to a host that no longer resolves. So the
  PDF should carry the essentials itself and treat the outside record as the long form.
- **Where the outside record lives.** Three candidates. `explorations/` is the revival's own
  directory (CLAUDE.md, "Layout"). A new file inside `Specification/` would put revival
  material into the original tree. The gap ledger is where CLAUDE.md says every known gap,
  defect and design limit is a row, so it can serve as the index. I did not read the ledger
  or the decision logs, per the brief.

The cases sort into three layers, and no single form covers all five demands. Something at
the passage tells a reader the rule changed (D1, D3). Something in the document holds the
reason, the original wording and the alternative in brief (D2, D4, D5, readable without the
repository). Something outside holds the long form and the audit trail. The team layered it
this way twice: front matter plus Appendix F in 2008, notes at the passage plus the internal
appendix in 2009. The peers do too: C++ has its text and Annex C; Ada its manual, the
annotated edition and the issue documents; Common Lisp CLtL2's marks and the X3J13 write-ups.

### 9. The options, as they would be put to Pavol

1. **The specification's own way, layered as in 1.0 and 2009.**
   - Edit the normative sentences in place.
   - At each changed passage, a labelled callout that prints in both builds: a new macro,
     not `\note`, so it is not taken for the authors' remarks.
   - In Appendix I, a new section, "Changes made by the 2026 revival to the working draft",
     one entry per change. Each entry has C++'s four fields (affected section, change,
     rationale, effect) and two more: the original text, quoted verbatim with its path and
     line in `Specification-1.0-frozen/`, and the alternative not taken (route C), with what
     reversing to it would take.
   - One paragraph in the front-matter figure (`preamble.tex`), and a changed title-page
     line.
   - The full reasoning in a repository document, cited by the entry.
   - Optionally, route C as an entry in Proposed Features, next to the team's own note at
     `internal-document.tex:363`.

   It commits him to: one small macro; an appendix that must be kept up to date with every
   later revival change (the one place the team let decay); one repository document per
   decision; and a PDF rebuild, which every form needs anyway.

2. **Steele's CLtL2 way.** Keep the original sentences in place, marked as outdated by a
   dotted margin rule. Print the new sentences with a solid rule and a paragraph "The revival
   decided on 2026-09-24 to ...". Number each decision into an index at the end, and explain
   the convention in the front matter. It commits him to: the `changebar` package, untested
   with this document; a PDF that prints both wordings; readers who must learn the
   convention; and keeping both wordings coherent under later edits. In exchange, the original
   stays visible in place and reversing to route C is a swap of the rules.

3. **The Ada way.** One source, two PDFs: a clean normative build, and an annotated build with
   inserted and deleted text marked and a reason beside each change. It commits him to:
   reworking the release switch (today it also hides the implementation-status boxes), a first
   release build, and two committed PDFs to keep in step.

4. **Keep the history outside, the Java and Python way.** Edit in place with no mark in the
   PDF. The original text, reasoning and route C go in a repository document and the commit
   message, and the frozen copy holds the original wording. It commits him to nothing in the
   build, and to a PDF that cannot tell its reader that a rule changed or why.

What decides between them is how much of D2, D4 and D5 must be readable in the PDF itself,
without the repository. Options 1 and 2 carry all three in the PDF, option 3 carries them in
the second PDF, and option 4 carries none. Between 1 and 2 the choice is whether the original
wording should sit in the appendix (quoted once, in the entry) or in the body (printed beside
the new rule).

My reading, not a decision: option 1. It is the specification's own form (its empty Appendix I
and its front matter, used as the team used them for 1.0), it keeps the original wording
inside the PDF as well as in the untouched frozen copy, and the route-C entry states what
reversing it would take.
