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

## The two PDFs, fetched on 2026-11-10, in the tree since that day

Fetched at 17:4x UTC into the session's scratchpad, both whole and readable:

- 1.0α: 411 pages, 2,356,414 bytes, made 2006-09-19 (`pdfinfo`), sha256 `93d7edd59a12ac01d68409d310d6cdd5cebeae3a2d9f1f7d09d7932182b0e24b`.
- 1.0β: 441 pages, 1,975,153 bytes, made 2007-03-06, sha256 `8f275267c3992a90a6925d5d5100a5d8e0b656e910a79caccc3d43424d751ead`.

Each title page names the same eight authors (Allen, Chase, Hallett, Luchangco, Maessen, Ryu, Steele, Tobin-Hochstadt) and five additional contributors, and carries "© Sun Microsystems, Inc." with its date. Neither holds a licence statement anywhere in its text. The 1.0 PDF in the tree carries the same notice and no licence either; the team itself put it into the repository whose `LICENSE` is the BSD licence of 2007. The curator asked for the two to be committed and linked from the README; told of the missing licence, he confirmed it ("I am doing this."). They are in `Specification-history/`, with a README on where they came from, and `README.md` links to them there. `Specification-1.0-frozen/` is not the place for them: it is kept byte for byte equal to the team's working draft (F-163).

Sam Tobin-Hochstadt's public page (https://samth.github.io/) gives him as a professor of computer science at Indiana University, with the address samth@iu.edu.

## Where the editions were published, from the git history (added at 18:0x UTC on 2026-11-10)

- The history starts on 2007-01-04 (`72ae6881b1`); `b3d64f3261` of 2007-01-05 merges the licences into one file.
- No `.pdf`, `.ps` or `.tex` file is added before 2008-03-31, when `403afbe0b9` adds `Specification/fortress.1.0.pdf`. The tree of 2007-03-10 (`5ee788b346`) holds only `ProjectFortress/`, and in it a `.hgignore` file.
- `ProjectFortress/README` in that tree sends readers to `http://research.sun.com/projects/plrg/fortress.pdf` for the specification, to `http://research.sun.com/projects/plrg/` for other materials, and has a section "SYNTAX CHANGES SINCE FORTRESS LANGUAGE SPECIFICATION v.1.0 ALPHA".
- So 1.0α (2006-09-19) is earlier than the opened code and 1.0β (2007-03-06) is later, and both were published as a PDF on the research group's site, not in this history. One address served the current edition, so the Internet Archive's captures of that address, by date, are the place to look for each edition and for the drafts before 1.0α. Not checked from here: the archive is blocked in this container; whether the public Subversion server held folders other than `Community/trunk`.
