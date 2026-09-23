# Dating five spec sentences against the type group's 2010-2012 implementation work

Method: `git log --all -- <path>` (no `--follow` — it drags in unrelated
commits here; `--all --follow` returned 152 commits for a file with one real
edit, because rename-detection latches onto content in the ~146 parentless
full-tree snapshots this conversion created). Every path below shows only
5-6 such snapshots reachable from `--all` (2011-12-06 to 2012-07-19), each a
byte-identical re-add of the same blob — spurious "touched" credits, not
revisions (`explorations/repo-internals.md:90-96`). The real incremental
edits, where any exist, sit only in the severed pre-2011 island reachable
from `0f49d8698` (2009-11-06, Sukyoung Ryu, "Added the entire spec files").
Dating is by direct blob diff between that commit and HEAD (`a874948ac`).

**Caution on `Specification-1.0-frozen/`**: for `basic/overloading.tex`,
`basic/trait-parameters.tex` and `advanced/overloading.tex`, the file there
is byte-identical to the final 2012 HEAD copy (including HEAD's 2010
copyright bump on `advanced/overloading.tex`) — not an independent 2008
snapshot for these three, whatever its name claims. Only
`basic/types-vals-vars.tex` differs there from HEAD (missing later,
unrelated additions), so only for that one file does frozen corroborate.

**1. `types-vals-vars.tex`, the subtype/exclusion "smallest ones" paragraph
(:147-227).** Byte-identical between `0f49d8698` (2009-11-06, Sukyoung Ryu)
and HEAD (2012-08-31) — confirmed by direct diff, not just presence — and
present at the same lines in the (here genuine) frozen copy. Never revised
after 2010, or after 2009. No clause about "instantiations of one generic"
was ever added: the file's only match for "instantiation" is an unrelated
sentence on type aliases (line 606) — the multiple-instantiation-exclusion
rule was never written into this section.

**2. `trait-parameters.tex:339-351,365-367,383-397`** ("extend other
instantiations of themselves", the `C extends D[\T\]` and `Empty extends
List[\T\]` examples). Byte-identical `0f49d8698` (2009-11-06, Sukyoung Ryu)
to HEAD. The file's only diff across that whole span is a copyright reword
(Sun→Oracle) and one unrelated note added elsewhere. Never revised after 2010.

**3. `overloading.tex` (basic) :100-108** — "it is an error for their static
parameters to differ... static parameters do not enter into the
determination of which declarations are applicable." Byte-identical
`0f49d8698` (2009-11-06, Sukyoung Ryu) to HEAD; the only diff in the file is
the same copyright reword. **Not touched by the 2010-2012 work.** It
predates the 2010-05-28/2010-07-26 exclusion-checker commits named in the
brief and was never revised after.

`overloading.tex` (advanced), the Meet Rule preamble (:227-238, next to the
Meet Rule itself at :247-262): this one *did* change. Copyright reads "2009"
at `0f49d8698` and "2009,2010" at every later snapshot including HEAD, and
the disambiguating-declaration paragraph was reworded (old: "for every call
to which both declarations are applicable, there must be a third, more
specific declaration"; new: "we require a \emph{disambiguating
declaration}: for any possible arguments..."). The Meet/Return-Type Rule
formulas themselves are unchanged 2009 text. The rewrite is self-dated to
2010 by its own copyright line, but no commit can be named for it: path-
scoped `-S` on either phrasing, and an unrestricted repo-wide `-S`, both
return only the same handful of parentless snapshots — the edit sits in the
cut part of the graph.

**4. `trait-parameters.tex:374`** ("It must be possible to infer which
method is referred to at the call site") — same paragraph as item 2, same
result: byte-identical `0f49d8698` (2009-11-06, Sukyoung Ryu) to HEAD,
never revised.

**5.** Four of the five are 2008/2009 text the git record shows untouched
straight through the type group's 2010-2012 implementation push: the
exclusion-relation "smallest ones" paragraph (item 1), both
`trait-parameters.tex` passages (items 2 and 4), and — decisively for the
question this was asked to settle — the `overloading.tex` (basic) sentence
that static parameters must not differ and "do not enter into the
determination of which declarations are applicable" (item 3). That sentence
was last touched, per git, by Sukyoung Ryu no later than 2009-11-06, a year
before the multiple-instantiation-exclusion rule entered the checker
(2010-05-28), and it was never revised afterward: it is early thinking, not
a post-hoc rationalization of the checker rule. The one passage that
genuinely moved in this window is the *advanced* overloading chapter's Meet
Rule preamble, not item 3's sentence — rewritten and copyright-dated to
2010 by whoever did it, but git cannot name who: that commit is one of the
~146 severed links, absent from `--follow`, path-scoped `-S`, and an
unrestricted repo-wide `-S` alike.
