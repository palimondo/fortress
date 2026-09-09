# The Fortress project websites, recovered from the Wayback Machine

Working notes from a 2026-08-21 archive sweep of the project's public web
presence (`projectfortress.sun.com`, the java.net successor, the Oracle
blogs, and the Sun Labs PLRG pages). All quotations below are brief
attributed excerpts from archived pages; every snapshot URL was verified
against the `archive.org/wayback/available` API at sweep time.

Method note: direct `web.archive.org` page fetches are blocked from the
revival's cloud containers (the availability API works); pages were pulled
through the pure.md reader relay using URLs of the form
`https://pure.md/https://web.archive.org/web/<ts>if_/<encoded-url>`
(the `if_` suffix or `%3A%2F%2F`-encoded target is required; plain forms
404).

## How the project pitched itself

Sun-era Trac front page, "Welcome to Project Fortress"
([snapshot 2011-01-25](http://web.archive.org/web/20110125025540/http://projectfortress.sun.com/Projects/Community/)):

> "Fortress is a new programming language designed for high-performance
> computing (HPC) with high programmability. Fortress features include:
> Implicit parallelism; Transactions; Flexible, space-aware, mathematical
> syntax; Static type-checking (but with type inference); Definition of
> large parts of the language in its own libraries."

Same page: "The current implementation of Fortress is a reference
interpreter... released under a BSD License... The Sun Labs team is now
hard at work on a compiler."

The Oracle-era blog masthead carried the best short tagline the sweep
found: **"Project Fortress — Simple parallelism, beautiful code."**

java.net project blurb
([snapshot 2011-04-11](http://web.archive.org/web/20110411235320/http://java.net/projects/projectfortress)):
"Fortress is a programming language combining easy access to parallelism,
extensibility, static checking and inference, and an uncluttered syntax."
Project tags: `fortress, programming, language, parallelism,
work-stealing`. Started March 2011, owned by dr2chase (David Chase), BSD,
13 members (54 by 2016).

The famous "do for Fortran what Java did for C" line does **not** appear
on the archived project pages themselves — it is attested in press
coverage (e.g. HPCwire, JavaOne 2008 reports), so cite it as Sun press
framing, not as the site's own words.

Sun Labs PLRG page
([snapshot 2009-07-18](http://web.archive.org/web/20090718134912/http://research.sun.com/projects/plrg/)):
"Sun Labs Programming Language Research Group", principal investigators
**Guy L. Steele Jr. and Eric Allen**.

## The specification version ladder — whimsical numbers confirmed

The PLRG publications page
([snapshot 2008-03-18](http://web.archive.org/web/20080318151108/http://research.sun.com/projects/plrg/Publications/))
lists the pre-1.0 spec versions: **0.618, 0.707, 0.785, 0.866, 0.903,
0.954, 1.0α, 1.0β** (authors Allen, Chase, Hallett, Luchangco, Maessen,
Ryu, Steele, Tobin-Hochstadt). The first four are recognizable constants
converging on 1.0 — 1/φ, √2/2, π/4, √3/2 — the identities of 0.903 and
0.954 are unconfirmed (log₁₀8 ≈ 0.903 and log₁₀9 ≈ 0.954 fit numerically).

Archived draft PDFs verified in the Wayback Machine:

- [fortress0618.pdf](https://web.archive.org/web/20080516114706/http://research.sun.com/projects/plrg/fortress0618.pdf)
- [fortress0707.pdf](https://web.archive.org/web/20080509190649/http://research.sun.com/projects/plrg/fortress0707.pdf)
- [fortress0866.pdf](https://web.archive.org/web/20070221211409/http://research.sun.com/projects/plrg/fortress0866.pdf)
- the evolving `fortress.pdf`, earliest capture 2006-12-08
- the final 1.0 spec, later served from
  [labs.oracle.com](https://web.archive.org/web/20130120063452/http://labs.oracle.com/projects/plrg/Publications/fortress.1.0.pdf)

(The 1.0 title page in this repo's `Specification-1.0-frozen/` says
**March 31, 2008**; Springer's *Encyclopedia of Parallel Computing* entry
says April 2008 — the title page is authoritative. Spec co-author Sam
Tobin-Hochstadt independently hosts a byte-identical copy of the 1.0 PDF
at https://samth.github.io/fortress-spec.pdf — SHA-256 `06f3a627…`
matches ours; verified 2026-08-21.)

Items from the publications list beyond the usual citations:

- Hallett, *Semantics and Type Soundness Proof of a Core Fragment of
  Fortress with Hidden Type Variables*.
- Allen, Hallett, Luchangco, Ryu, Tobin-Hochstadt, *Ensuring Acyclicity
  of the Type Hierarchy in Core Fortress*.
- Tobin-Hochstadt, Allen, *A Core Calculus of Metaclasses* (FOOL 2005)
  and *Formal Semantics for MCJ*.
- Allen, Chase, Flood, Luchangco, Maessen, Ryu, Steele, *"Project
  Fortress: A Multicore Language for Multicore Processors"*, Linux
  Magazine, September 2007.
- Talks 2004–2007: Steele's *A Growable Language* (OOPSLA 2006, 90 min),
  *The Soul of a New Programming Language* (JAOO 2006), *Parallel
  Programming and Parallel Abstractions in Fortress* (PACT 2005, FLOPS
  2006, university/industry tour), PLDI 2006 tutorial (Maessen & Steele),
  Chase's *Fortress 0.62* (PPoPP 2005), Allen's FOOL/WOOD 2007 invited
  talk.

## The wind-down announcement (July 2012)

**"Fortress Wrapping Up"**, posted by Guy Steele ("gls"), July 20, 2012 —
[snapshot 2012-10-07](https://web.archive.org/web/20121007034544/https://blogs.oracle.com/projectfortress/entry/fortress_wrapping_up);
a [2016 capture](https://web.archive.org/web/20160924201206/https://blogs.oracle.com/projectfortress/entry/fortress_wrapping_up)
additionally preserves 17 reader comments. This post is the entire
announcement — there was no separate wind-down FAQ. Key sentences:

> "After working nearly a decade on the design, development, and
> implementation of the Fortress programming language, the Oracle Labs
> Programming Language Research Group is now winding down the Fortress
> project. Ten years is a remarkably long run for an industrial research
> project (one to three years is much more typical)..."

> "...we encountered some severe technical challenges having to do with
> the mismatch between the (rather ambitious) Fortress type system and a
> virtual machine not designed to support it (that would be every
> currently available VM, not just JVM)."

> "The Fortress source code remains open-source, and the code repository
> will remain available for the foreseeable future."

The post credits Chapel, X10, Clojure, and Scala as "friendly
competition", lists **eight aspects "we are quite pleased with"**
(generators/reducers; work-stealing implicit parallelism; nested atomic
blocks on transactional memory; non-erased parametric polymorphism;
symmetric multimethod dispatch; symmetric multiple inheritance with type
exclusion; mathematical syntax and juxtaposition; components and APIs)
and **three "wish we had explored further"** (dimensions and units;
explicit data distribution / processor assignment; conditional
inheritance via `where` clauses). Press echo: SD Times, *"Fortress
Finally Folds"*, July 24, 2012.

## Community and site mechanics

- Trac-based site with open registration; tickets doubled as
  language-change proposals; anonymous SVN
  (`svn checkout https://projectfortress.sun.com/svn/Community/trunk PFC`);
  contributions required a faxed Sun Contributor Agreement. "Project
  Fortress is led by the Programming Language Research Group of Sun
  Microsystems Labs. Our work was originally funded by the DARPA HPCS
  project, and has continued as a Sun Labs project."
- Front-page timeline (from the 2011-01-25 capture): Jan 2009 Java 1.6
  required; May 2009 MIT tutorial + reference card; Jun 2009 "fortifier"
  web service (Fortress source → rendered PDF); Oct 2009 Trac blog;
  **May 12, 2010: "Sun Labs is now part of Oracle. The Fortress project
  continues as before"**; a 2009-11-16 pre-compiled zip of "an updated
  version of Fortress 1.0" including "the first work towards a compiler".
- March 2011: migration Trac → java.net, SVN → **Mercurial**
  ([snapshot](http://web.archive.org/web/20110411185649/http://projectfortress.java.net/)).
  Compiler status there: the bytecode optimizer had brought compiled-code
  performance "to about 4x Java timings" on the test benchmark; RTTI for
  generic overload dispatch and covariant types ("necessary for the
  'right' implementation of the numeric hierarchy") in progress.
- Mailing lists (announce, builds, commits, dev, issues, users
  @projectfortress.java.net; admins dr2chase, Guy Steele, chmf, victorl,
  tristan) —
  [snapshot 2016-10-17](https://web.archive.org/web/20161017175624/https://java.net/projects/projectfortress/lists).
  No archives of the Sun-era list contents were found anywhere (open
  hunt).
- Learning resources named on the site: the Project Fortress
  [Reference Card](https://web.archive.org/web/20160304052722/https://java.net/downloads/projectfortress/reference.pdf),
  a Quick Vocabulary Guide, intern "Boot Camp" materials, "Fortress by
  Example".
- Two blogs: the Trac blog, Oct 2009 – Jun 2010
  ([snapshot](http://web.archive.org/web/20091109201341/http://projectfortress.sun.com/Projects/Community/blog);
  technical posts: treaps compile, conditional-expression/coercion rules,
  tables and graphics in rendered comments) and the Oracle blog,
  2011–2012, only five posts ending in "Wrapping Up"
  ([index](https://web.archive.org/web/20160422034012/https://blogs.oracle.com/projectfortress/)).

Other verified snapshots worth keeping:

- Earliest whole-site capture:
  [2009-01-30](http://web.archive.org/web/20090130012650/http://projectfortress.sun.com/)
- sunsource-era page:
  [2009-03-08](http://web.archive.org/web/20090308082810/http://fortress.sunsource.net/)
- Trac timeline (Wikipedia's "Active Timeline" external link):
  [2011-07-16](http://web.archive.org/web/20110716163020/http://projectfortress.sun.com/Projects/Community/timeline)
- Oracle Labs PLRG:
  [2013-01-15](http://web.archive.org/web/20130115202843/http://labs.oracle.com/projects/plrg/)
- HPCS-exit context (Nov 2006), Simon Phipps' blog:
  [2012-01-06 capture](http://web.archive.org/web/20120106124629/http://blogs.oracle.com/simons/entry/sun_not_selected_for_hpcs)
- Steele's Cornell colloquium abstract, Jan 2008 (still live:
  https://www.cs.cornell.edu/colloquium/2008sp/steele.htm): "While the
  language design was originally aimed at high-end ('petascale') parallel
  supercomputers, it appears also to be well-suited for programming
  multicore chip and multicore cluster systems."
- Lambda the Ultimate wind-down thread (preserves the type-system quote):
  https://lambda-the-ultimate.org/node/4570

## Dead ends (2026-08-21, from the cloud container)

arquivo.pt has zero captures of projectfortress.sun.com. Sun-era
mailing-list archives: not found (download.oracle.com/javaee-archive
covers Java EE only). No Wayback captures of the "Previous announcements"
wiki page, blogs.sun.com/projectfortress, `/Projects/Community/mail/`,
`/docman/`, or `frs/`. HPCwire/insideHPC articles are bot-blocked or
paywalled; their content is recoverable via Computerworld, i-programmer,
and the LtU thread instead. Relay alternatives that failed: r.jina.ai
(abuse-block), corsproxy.io (paid), allorigins/codetabs (down),
archive.today (connection reset), timetravel.mementoweb.org / bibalex
(DNS), Library of Congress webarchive (403).
