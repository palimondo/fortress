<!-- Leads on the earlier editions of the Fortress specification, for the curator's idea of showing the specification at its milestones: what an outside search of 2026-11-10, run by the curator, found, what this repository's git confirms, and what is still missing. Kept by the coordinating session. Nothing here was fetched into the tree. -->

# The specification's earlier editions: leads

## The editions and where a copy is

- **1.0α, 2006-09-19.** A PDF at the University of Jena: https://psc.informatik.uni-jena.de/languages/HPCS/fortress-1.0alpha.pdf (the curator's search; not opened from this container).
- **1.0β, 2007-03-06.** A PDF at UCLA: https://web.cs.ucla.edu/~palsberg/course/cs239/papers/fortress1.0beta.pdf (the same search); cited in papers as a Sun Microsystems technical report of 2007.
- **1.0, 2008-03-31.** `Specification-1.0-frozen/fortress.1.0.pdf` in this tree; the tag `1.0` (`0e8ede7e7f`) holds it as `Specification/fortress.1.0.pdf` and no LaTeX. The search also found it on Sam Tobin-Hochstadt's site, and a post of 2008-04-05 that names the release archive `fortress-1.0.zip`; a report of June 2008 gives release 1.0 as Subversion changeset 1450.
- **The working draft, to 2011-02-02.** LaTeX in this tree: `Specification-1.0-frozen/`, byte for byte the team's `Specification/` of that day (F-163). The LaTeX entered the repository on 2009-10-20 and 2009-11-05 (`5da7257089`, `d26c347121`, Sukyoung Ryu). Its `fortress/preamble.tex:130-146` keeps the 1.0 release's preface as a comment.
- **The revival's text.** `Specification/`.

## Confirmed in this tree on 2026-11-10

- The public repository of 2008 was Subversion, not Mercurial: the tag's `README.txt` opens "PROJECT FORTRESS SUBVERSION REPOSITORY" and gives `svn checkout https://projectfortress.sun.com/svn/Community/trunk PFC`; its `.hgignore` lists `.svn`. The coordinator's lead of 16:5x, that it was a Mercurial repository, was wrong.
- The tag's `README.txt` describes `SpecData/` as the machine-readable files and examples of the specification; the specification's LaTeX is not in that snapshot.

## Not found

- The LaTeX sources of 1.0α, 1.0β and 1.0. The search's reading, and the coordinator's: they were kept outside the public trunk until 2009.

## Where to look next, from the search

- An inventory of the Internet Archive's captures of `projectfortress.sun.com` (`/Projects/Community/downloads/`, `/Projects/Community/browser/trunk/`, `/svn/Community/`) and of `research.sun.com/projects/plrg/`; release archives named `fortress-1.0.zip` or `fortress_*.zip`. This container cannot reach the Internet Archive.
- The authors: Sukyoung Ryu, whose commits brought the LaTeX in, and Sam Tobin-Hochstadt, who hosts the 1.0 PDF. A draft letter to Prof. Ryu is `explorations/coordinator/ryu-letter-2026-11-10-draft.md`.
