# Research: the Guy Steele Fortress corpus

Index of primary sources on the design and history of Fortress, maintained as
part of the revival effort. **Links and metadata only** — the documents
themselves are copyrighted (Oracle's notice permits personal/classroom copies
but not redistribution), so PDFs live in `decks/`, which is gitignored and
local-only: drop the files in manually each session; they are never committed.
`extracts/` holds committed working notes on the sources — our own summaries
and commentary with brief attributed quotations, never document reproductions.

## Talks and decks

- **JuliaCon 2016 keynote — "Fortress Features and Lessons Learned"**
  - Video: https://www.youtube.com/watch?v=EZD3Scuv02g
  - Slides: originally on the Oracle Labs APEX document server as `DOC_ID:952`
    (host `labs.oracle.com` found dead/NXDOMAIN in 2026 checks; possibly
    intermittently back — a search index shows
    `https://labs.oracle.com/pls/apex/f?p=94065:10:2849938467431:5316`).
    Recovered from the Wayback Machine (identical digest across ~100 captures
    2021–2026); raw-bytes download:
    `https://web.archive.org/web/20260416152624id_/https://labs.oracle.com/pls/apex/f?p=LABS:0:100315543614648:APPLICATION_PROCESS=GETDOC_INLINE:::DOC_ID:952`
    (fallback, earliest capture:
    `https://web.archive.org/web/20211209023131id_/https://labs.oracle.com/pls/apex/f?p=LABS:0:101713034580486:APPLICATION_PROCESS=GETDOC_INLINE:::DOC_ID:952`)
  - Local copy: `decks/SteeleJuliaCon2016.pdf`; committed working extract:
    `extracts/SteeleJuliaCon2016-extract.md`.
  - Key slides: 9 (histogramWater ∑), 14 (`trait ℤ extends {Ring⟦ℤ,+,×⟧, …}`),
    15–16 (algebraic traits with `property` laws; BooleanAlgebra), 27–29
    (whitespace, juxtaposition, nontransitive precedence), 34 (∑ over Monoid),
    38–40 (hierarchy, excludes/partitioned), 44 (where the type system got
    stuck), 45 (lessons), 47 (project started 2003), 48 (Swift optional
    binding as a Fortress descendant).
  - The deck cites **Archivist 2012-0104 and 2012-0284** — presumably further
    DOC_IDs on the same APEX host; not yet recovered.

- **JAOO 2008 — "Fortress: programming for supercomputers"** — InfoQ, Jan 2008.

- **April 2005 Sun deck** (v1.02) — live mirror:
  https://www.cs.tufts.edu/~nr/cs257/archive/neal-glew/mcrt/Fortress/1.02_steele.pdf
  ("Asterisks are for accountants"; units as free-abelian-group metaclasses.)

- **Google Tech Talk — "Four Solutions to a Trivial Problem"** (cited on
  JuliaCon slide 9) — video: https://www.youtube.com/watch?v=ftcIcn8AmSY
  (recorded 2015-12-01). **No slide PDF on the open web** (verified
  2026-08-18); as a 2015 Oracle Labs talk the deck is presumably another
  Archivist DOC_ID on the dead APEX host. Recovery routes:
  1. One-shot enumeration of every distinct archived Archivist PDF — each row
     is one recoverable document, DOC_ID in the URL:
     `https://web.archive.org/cdx/search/cdx?url=labs.oracle.com/pls/apex/f*&filter=mimetype:application/pdf&collapse=digest&fl=timestamp,original,digest&limit=2000`
  2. Browse the archived publications app capture (the `p=94065` page) for the
     title, take its GETDOC link, prefix `web.archive.org/web/<timestamp>id_/`.
  3. Fallback if never crawled: the slides are full-frame in the video — frame
     extraction (local task). Note JuliaCon slides 4–9 already reproduce the
     talk's opening toy problem.

- Adjacent canon: ICFP 2009 foldl/foldr keynote; Strange Loop 2010 "How to
  Think about Parallel Programming: Not!"; "Growing a Language" (OOPSLA 1998).

## Recovery technique (Wayback CDX)

The APEX server serves documents by DOC_ID under per-session URLs, so filename
searches find nothing. Enumerate what the crawler touched with CDX:

    https://web.archive.org/cdx/search/cdx?url=labs.oracle.com/pls/apex/f*&filter=original:.*GETDOC.*

Append `id_` after the capture timestamp in a Wayback URL to get raw bytes.
Note: Claude Code cloud containers currently cannot reach web.archive.org or
labs.oracle.com (network policy); the CDX/browser legwork has to happen on an
unrestricted machine.

## Open hunts

- Archivist 2012-0104 and 2012-0284 (see above).
- Pre-2007 project record: all GitHub mirrors' git history starts 2007-01-04,
  but the project began in 2003 (confirmed by JuliaCon slide 47). The earlier
  record lived on Sun-internal systems and java.net SVN (shut down 2017);
  survival of archives unverified.
- Pre-1.0 spec drafts (2005–2007) with whimsical version numbers (0.618 ≈ 1/φ,
  0.707 ≈ 1/√2 — unverified recollection; confirm before citing).
- The 1.0 specification PDF (March 2008) as published — the richer working
  LaTeX (with editorial notes) is already in this repo under `Specification/`
  and `Specification-1.0-frozen/`.
