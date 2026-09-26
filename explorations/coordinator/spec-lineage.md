<!-- Written 2026-09-26 by a delegated worker session, for Pavol: what each of the tree's three specification artefacts is, who made it, when, why, and how they relate — read-only git archaeology, commissioned partly because the batch-4 specification rung (S1, `explorations/coordinator/POSITIONS.md:109`) needs to know what to call the unrevised copy in its citations. -->

# The three specification artefacts: what each one is, and how they relate

## Summary

- `Specification-1.0-frozen/fortress.1.0.pdf` is the real 1.0 release artefact: added
  2008-03-31 by the team (`403afbe0b`). The LaTeX **sources** sitting next to it in
  `Specification-1.0-frozen/` are not 1.0 text — they are a January 2012 clone of the
  then-current working draft, made by Guy Steele, and they are still today the working
  draft in 202 of 208 tracked files.
- `Specification/` is that same working draft, carried forward. The team's last edit to
  its text is 2010-12-09. Nobody touched it again until the revival built and committed
  a rendered PDF from it in 2026, under the label "July 19, 2012" — a date the revival
  chose, not the team, and not the date of any edit.
- `Documentation/Specification/` is a separate, later, unfinished restart: begun
  2012-02-20 by Victor Luchangco, restructured and substantially written by Steele and
  Luchangco through May 2012, abandoned on 2012-05-31 with a 65-page draft PDF and most
  chapters still empty skeletons. Two of its finished chapters (Types, and part of
  Lexical Structure) are, by date, newer team prose than anything in `Specification/`.

## 1. `fortress.1.0.pdf`: origin

`fortress.1.0.pdf` entered the tree on 2008-03-31, added whole (22,280 lines of binary
diff) by Sukyoung Ryu at `Specification/fortress.1.0.pdf`, commit message "Added the
Fortress Language Specification, Version 1.0." (`403afbe0b`). This is the team's own
2008 release artefact — the 1.0 spec that shipped with the matching interpreter release
(root `README.md:88`, "The 1.0 specification, with a matching interpreter release,
followed in March 2008") — not something the revival produced or found elsewhere. It is
262 pages (`explorations/coordinator/FACTS.md:102`).

It lived at `Specification/fortress.1.0.pdf` for almost four years. When Steele cloned
the whole `Specification/` directory into `Specification-1.0-frozen/` on 2012-01-04
(`c02fa44d0`), the clone copied this file along with everything else, so a second,
byte-identical copy came to exist at `Specification-1.0-frozen/fortress.1.0.pdf`. Both
copies sat in the tree, unedited, until the revival's `414b790e3` (2026-08-21) removed
the one at `Specification/fortress.1.0.pdf` as a duplicate — replacing it with the
revival's own freshly built `Specification/fortress.pdf` — and kept the one at
`Specification-1.0-frozen/fortress.1.0.pdf`, which is the file the tree has today
(confirmed: `find . -iname fortress.1.0.pdf` returns exactly one hit, and
`git show --stat 414b790e3` shows `Specification/fortress.1.0.pdf | 22280 -----------`
removed in that commit).

So: yes, it is the 2008 release artefact; the team committed it in 2008; the revival's
only act on it was to delete the second, redundant copy in 2026 — it did not touch the
surviving one.

## 2. Why Steele froze the draft in January 2012

`c02fa44d0` ("Cloned Specification directory into Specification-1.0-frozen", Guy Steele,
2012-01-04) sits inside a week of intense work by David Chase and Jean-Baptiste Tristan
on operator static parameters and RTTI (`b24a48a3c`, `4305f45d9`, `5d1c1b5ce`,
`30b00ab60`, all 2012-01-04 to 01-13) — none of it touching the specification. Nothing in
the surrounding commit messages states a reason for the clone.

What the record does show is what happened *after*: the team never again edited
`Specification/`'s text (confirmed by the date-order tree walk below); instead, five and
a half weeks later, Victor Luchangco started a **different, new** directory,
`Documentation/Specification/` (`166841592`, 2012-02-20), and by May 2012 Steele had
joined him in restructuring and writing it (§3). Read against that sequence, the January
clone reads as Steele setting the existing draft aside — freezing it as a fixed
reference point — just before the team began rethinking the specification from scratch
rather than continuing to edit the old one. This is a reading of the sequence, not a
stated reason; no design note, README, or mailing-list text in the tree says so in words.
(`explorations/reviews/spec-change-form.md:237-239` reaches the same reading
independently: "Before a large revision (2012). Steele copied the whole directory ... and,
four months later, began a new document instead of editing the old one.")

The name "1.0-frozen" is misleading taken literally. `git diff --quiet
2f8b4331a:Specification c02fa44d0:Specification-1.0-frozen` succeeds (verified directly)
— the clone is byte-for-byte the working draft as it stood on 2011-02-02, not the 1.0
text. Today the two source trees still differ in only 5 of 208 tracked files: the
revival's restyling of `fortress/fortress.tex` and its three `fortress/*.pl` table
generators (`4672b71cd`), and one historical stray `\tracingcommands=1\tracingmacros=1`
line at `Specification/basic-lib/objects.tex:17` that is absent from the frozen copy
(`explorations/coordinator/map/spec-to-implementation.md:109-111,117`). The only
genuinely-1.0 content near it is the PDF beside it (§1).

## 3. `Documentation/Specification/`

**Started.** Victor Luchangco, 2012-02-20, `166841592`, "Added directory structure and
skeleton files for new spec (under new Documentation directory)" — twelve files, 948
lines, under a brand-new top-level path with its own `Root`, `Support`, `Prose`, `Code`,
`Data` layout (`Documentation/Specification/README.txt:12-19` names this structure).
Victor Luchangco added more skeleton on 2012-03-30 (`efa42d03a`, "mostly empty (except
for copyright info) .tex files"). Guy Steele restructured it again on 2012-05-07
(`37d7e5619`, "New directory structure for Documentation/Specificaation") and switched
its prose format from `.tex` to a `.tick` source format (fortick-processed, like the
`Papers/` tick files) on 2012-05-09 (`e86881099`).

**Who wrote what, and how far it got.** Reading `git log --all --full-history` on this
path is unreliable exactly as `explorations/repo-internals.md:88-96` warns: 49 of its 96
listed commits are parentless full-tree snapshots that show up as "touching" every path
in the repository (verified: `5a68404fd`, `ef7b2bff5`, `0d00963c6`, `a9c625b1e` — none
has a parent, and each lists the identical set of `Documentation/Specification/Code/*`
files as newly "added," which is the phantom-root artefact, not real edits). Filtering
to commits whose diff genuinely touches the path (single-parent commits checked
individually, plus the March BNF work and the May prose additions) gives a small, real
set:

- 2012-02-20 to 03-30: skeleton and directory setup (Luchangco).
- 2012-03-13 to 03-24: Tristan King builds the BNF-grammar tooling for the appendix
  (`36a4ced34` "Setting up the build for the spec" through `cf2eba9f6` "Spec build
  fix"), including `b48e008e7` (2012-03-23), "Improved the BNF tool. Started to trim the
  BNF to define Fortress 2" — the only place in the whole history "Fortress 2" appears; a
  single remark by one committer, not corroborated elsewhere in the tree, so treat it as
  a hint of how at least one team member privately framed the effort, not a project
  decision.
- 2012-05-07 to 05-28: Steele restructures and adds the desugaring appendix, block
  expressions, and much of the Operators material (`e86881099`, `61f60e5fe`, and
  `91e71e62e`, "(1) Spec has new directory Language/Operators with many files").
- 2012-05-31: Victor Luchangco's last two commits, `275b90773` ("New types chapter
  (draft)"; "New lexical structure chapter — several sections not yet imported — change
  organization/presentation of preprocessing") and `56f7dce8f` ("Adding lexical
  preprocessing and rendering appendices (drafts)"). These are the last real edits to the
  directory found by this method.
- A build the same day: `Documentation/Specification/fortress.pdf` (tracked; still in the
  tree, 65 pages, `CreationDate: Thu May 31 13:58:12 2012` per `pdfinfo`) — the team's own
  last build of this document, unmentioned in the task's list of the directory's
  contents but present and git-tracked.

No commit after 2012-05-31 makes a real change to the directory; every later hit in a
naive path-scoped log is a parentless-snapshot artefact (checked individually for
`ef7b2bff5`, `a9c625b1e`, `0d00963c6`).

**What it covers, and how far.** Its `Prose/` tree is 6.2K lines total, but most of that
is skeleton: every file under `Prose/Language/Expressions/` (18 files: `if.tick`,
`for.tick`, `tuples.tick`, `typecase.tick`, etc.) is 12–13 lines — copyright header plus a
bare `\newchap`/`\newsec` macro call and nothing else. The substantial, genuinely-written
chapters are few: `Language/types.tick` (1,056 lines), `Language/lexical-structure.tick`
(600 lines, explicitly partial per its own commit message), the `Language/Operators/`
subtree (six files, 73–350 lines each), and `Language/overloading.tick` (302 lines,
carrying a "Copyright 2009, 2012" header, suggesting some reused older text). Everything
about static parameters, traits' generic machinery beyond a stub, exceptions beyond a
stub, components beyond a stub, memory model, and the whole numeric-tower library
chapters never got past the skeleton stage.

**Was it meant to replace `Specification/`?** No explicit statement of intent survives in
the tree — no README, no commit message, and no cross-reference in either directory says
so in words (checked: neither directory's sources mention the other by path, apart from
generic `\part{...Documentation...}` titles that are self-referential). The structural
evidence points the same way as a replacement effort would: a fresh top-level directory
(not an edit of the old one), a new build toolchain (`fortick`/`fortex`/`foreg`, per
`Documentation/Specification/Root/README.txt:24-32`, distinct from `Specification/`'s own
`build.xml`), and prose rewritten from first principles rather than copied (§ below). But
it never reached completion, was never merged back, and both documents simply sat
side by side, unreconciled, when the project wound down two months later.

**Newer text than `Specification/`, and on which topics.** On the topic of *Types*
(`Specification/basic/types-vals-vars.tex`, 623 lines, last touched no later than
2010-12-09), `Documentation/Specification/Prose/Language/types.tick` (1,056 lines,
Victor Luchangco, 2012-05-31, `275b90773`) is demonstrably fresh prose, not a copy: it
opens with a different structure (subtyping/equivalence/exclusion/coercion/covering
stated up front) and carries live authorial reasoning not present in the old chapter,
e.g. `types.tick:29-31`, "\note{Victor: This is necessary for subtyping to be a partial
order. (This is why conformance is only a pre-order in Scala.)}" This is, by date, the
team's later statement on Types. On *Lexical Structure*, the new chapter
(`lexical-structure.tick`, 600 lines) is also dated 2012-05-31 and is newer than
anything in `Specification/basic/lexical-structure.tex` (1,550 lines) on the sections it
covers, but its own commit message says it is partial ("several sections not yet
imported"), so where it is silent the older, longer chapter is still the only statement.
The Operators subtree and `overloading.tick` are dated 2012 as well, but at least the
latter carries a "Copyright 2009, 2012" header suggesting recycled older text, so I would
not claim without a closer diff that they supersede `Specification/`'s corresponding
chapters — flagged here, not asserted.

## 4. Where "the July 2012 draft" label comes from

CLAUDE.md's "Project goal" section calls `Specification/` "the July 2012 draft," citing
Pavol, 2026-09-16. That is Pavol's own phrase, recorded verbatim at
`explorations/coordinator/POSITIONS.md:24`: "the goal restated: finish what the designers
intended, judged by the latest committed spec (`Specification/`, the July 2012 draft),
not redesign the language" — CLAUDE.md simply carries this forward.

The date itself was set by the revival, not the team, in `414b790e3` (2026-08-21). Its
commit message says so directly: "the title page carries the sources' snapshot date
(July 19, 2012 — the tree is unchanged since the SVN/hg import) instead of the build
date" (full message reproduced by `git log -1 --format=%B 414b790e3`); the mechanism is
`Specification/fortress/fortress.tex:110-117`, where the title block prints a literal
date string in draft mode. The revival chose this date because it did not want the PDF's
title page to show the actual 2026 build date (LaTeX's default `\today`), and because
nothing had changed in the source text since the git history's last real edit — so it
used the date of the git commit that (re-)introduced the tree, `5a68404fd` (David Chase,
2012-07-19, a parentless full-tree import — the same phantom-root commit discussed in §3
and in `explorations/repo-internals.md:235-237`).

So the label is **not** the date of an edit; it is the date of an import/snapshot commit
that happens to carry no content change of its own. The team's actual last edit to this
text is `44e03b176`, 2010-12-09 — verified directly:
`git show --stat 44e03b176` → `Specification/basic/expressions/aggregate.tex | 3 ++-`,
message "Fixed a typo. Array4 is not yet implemented." So "the July 2012 draft" correctly
names *which tree* is meant (`Specification/` as it stands, unchanged since the import)
but is liable to mislead a reader into thinking the prose itself was written or revised
in July 2012, when the team's own last hand on it was over a year and a half earlier.
`explorations/reviews/spec-change-form.md:375-379` makes the identical finding.

## 5. What the root `README.md` and the revival's notes say — and where they're wrong

`README.md:103-112` (section "The language specification") links and describes all three
artefacts:

- `Specification-1.0-frozen/` — "the frozen **Fortress 1.0 specification** (March 2008)."
- `Specification/` — "the post-1.0 evolving specification LaTeX, a Working Draft richer
  in places than any published PDF."
- `Documentation/Specification/` — "a later, partial restart of the specification
  effort."

The second and third descriptions match everything found above. The first is the one
description that is misleading as written: the phrase "the frozen Fortress 1.0
specification" is attached to the directory link, but (per §2) the directory's own LaTeX
sources are not the 1.0 specification — they are the January-2012-frozen 2011 working
draft. Only the PDF the sentence links to a moment later
(`Specification-1.0-frozen/fortress.1.0.pdf`) is genuinely 1.0. A reader who opens the
directory expecting 1.0-era text (as its name invites) finds the same working draft as
`Specification/`, five files' worth of restyling aside. `explorations/coordinator/FACTS.md:99-102`
records the identical correction against its own earlier, wrong shorthand ("`Specification-1.0-frozen/`
is 1.0" — corrected there as "the *sources* under `Specification-1.0-frozen/` are not the
1.0 sources, only the PDF beside them is," per
`explorations/coordinator/map/spec-to-implementation.md:117`). The root README's wording
carries the same imprecision the FACTS file had already flagged and fixed for itself.

Among the revival's own working notes, `explorations/reviews/spec-change-form.md` gives
the fullest and most careful account and matches this note's findings throughout (it is,
in fact, the source most of this note's citations were checked against). CLAUDE.md's
"the July 2012 draft" (§4) is accurate as a *pointer* to the right tree but risks being
read as a claim about *when the text was written*, which is not so.

## 6. The consequence: which artefact is the team's latest statement, topic by topic

The project's goal names `Specification/` — "the July 2012 draft" — as the standard to
finish the language against. On the great majority of the language, this is simply
correct: `Specification/` is not only the largest and most complete of the three (596–599
pages against 262 for the 1.0 PDF and 65 for `Documentation/Specification/`'s last
build), it is also, on every topic `Documentation/Specification/` never got past a
12-to-30-line skeleton for, the team's only and therefore latest statement. That covers
static parameters (`trait-parameters.tex` — the exact chapter behind the multiple-
instantiation-exclusion question that prompted the batch-4 specification rung has **no**
corresponding file at all in `Documentation/Specification/Prose/`, skeleton or
otherwise), traits and objects beyond a stub, exceptions, components and APIs, the memory
model, parallelism, dimensions and units, and the entire numeric-tower library part.

On two topics, though, `Documentation/Specification/` genuinely holds later team prose
(§3): **Types**, where `types.tick` (Victor Luchangco, 2012-05-31) is a complete,
from-scratch rewrite dated a year and a half after `Specification/`'s last edit to the
matching chapter; and, more partially, **Lexical Structure**, where a newer but
admittedly incomplete chapter exists alongside the older, fuller one. On these two
topics, if "the team's latest statement of the language" is read literally, it is the
unfinished `Documentation/Specification/` text, not `Specification/` — though that text
was never finished, never checked against the rest of the language definition, and never
adopted as the specification of record before the project ended. This is offered as
evidence bearing on Pavol's decision of what to cite where; it does not by itself say
which text should govern.

## Coordinator's check (2026-09-26)

Section 6's statement that the static-parameter topic behind the batch-4 specification rung
has no counterpart in `Documentation/Specification/` is wrong. There is no
`trait-parameters` file, but `Documentation/Specification/Prose/Language/types.tick`
(Victor Luchangco, 2012-05-31, `275b90773`, "New types chapter (draft)") restates the
rule itself:

- `types.tick:353-376`: the rule is renamed "instantiation exclusion" (the comment at
  :353-354: "Multiple instantiation exclusion / Victor: I've shortened this to
  instantiation exclusion"). Two instantiations exclude each other if the arguments for
  any covariant parameter exclude each other, or if the arguments for any non-covariant
  parameter are not type equivalent. The `\note` states the stronger rule that is
  actually imposed: a trait that extends two instantiations of a generic type must
  extend an expressible instantiation that is a subtype of both.
- `types.tick:320-339`: a trait's static parameter may be declared `covariant`, and one
  instantiation is a subtype of another when the covariant arguments are subtypes and the
  others are the same. The older draft has no such modifier. It expresses covariance
  through a self-extending `where` clause (`Specification/basic/trait-parameters.tex:339-352`).
- `types.tick:173-195`: `Bottom` is uninhabited, excludes every type including itself, and
  is inexpressible: it cannot be written in a program.

So, on the rule the batch-4 specification rung revises, the team's later statement is
this unfinished chapter too. It keeps the rule and adds declared covariance. The path's
`git log` names only the parentless import `5a68404fd`. The date comes from `275b90773`,
whose diff rewrites this file (1,429 lines changed).
