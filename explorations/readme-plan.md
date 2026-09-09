# README replacement plan (2026-08-21)

Status: **goals under discussion — no draft yet** (per Pavol: don't
freestyle one before discussion). This note records what's settled and
what's still open, so the discussion survives compaction.

## Why replace

- Root `README.md` (65 lines) is pluckyporcupine's 2018 migration doc:
  Java 9/10 platform table, a to-do list long since overtaken, and the
  claim "running compiled programs does not [work]" — disproved by our
  baseline. Wrong-era claims on the repo's front page.
- `README.txt` (644 lines) is Sun's SVN-era repository doc: checkout
  instructions for projectfortress.sun.com and a subdirectory tour.
  Historically valuable, useless as a front page.
- Licensing needs only a pointer: the BSD license already lives in the
  root `LICENSE` file.

## Settled decisions

- **Ladder snapshots via annotated tags, not SHAs in prose.** The
  planned clean-ladder rebuild rewrites history, which would invalidate
  any recorded SHA. Instead, when the rebuild lands, tag each gated rung
  (e.g. `ladder/jdk8-baseline`, `ladder/scala-2.12`, `ladder/jdk11`, …
  `ladder/jdk25`), with the gate result in the tag message. The README
  then carries one stable line — "each modernization rung is tagged
  `ladder/*`; pick the newest tag whose toolchain floor fits your JDK" —
  plus optionally a small rung → tag → toolchain table. Tags are created
  only on the rebuilt history and pushed from Pavol's machine
  (`git push --tags`).

## Decisions (Pavol, 2026-08-21)

All four questions answered; drafting is authorized.

1. **Audience**: confirmed — a stranger landing on GitHub.
2. **Old files**: confirmed — delete `README.md` when the replacement
   lands; keep `README.txt` as historical artifact, linked. Root trash
   cleanup executed immediately (commit bbd34ca2a): six
   `compile_errors*` dumps, `jdeps.txt`, `NOTES.md`, `JAVA_HOME`,
   `build_fortress.sh`, `help.tex`. Still open: the IDE configs
   (`DOT_idea` is porcupine's; `PFC_DOT_iml` and `ECLIPSE` trace to
   Sun's 2012 tree).
3. **Content**: spine confirmed, expanded with:
   - a *rich history* grounded in the research corpus — the papers and
     the retrospective parts of Steele's JuliaCon 2016 keynote
     ("Fortress Features and Lessons Learned");
   - a **dedicated research-contributions section** listing the
     programming-language research that lives in this repo's papers, so
     visitors don't stumble on the `.tex` files late;
   - **build PDFs of the spec and of every paper with TeX sources in
     the repo** (`Specification/`, `Papers/Dispatch/`,
     `Documentation/Specification/`, …) and link them from the README.
     Note both `Specification*/` trees already carry a committed
     `fortress.1.0.pdf`;
   - check the Wayback record of projectfortress.sun.com (and its
     java.net successor) for front-page material not in `README.txt`
     worth migrating.
4. **Timing**: draft **now**, fine-tune on the current tip, then
   cherry-pick early into the clean ladder — possibly in stages
   depending on when the PDF builds land. Some form of README.md should
   kick off the revival work on the clean branch.

**Graft question** (answered): the clean-ladder rebuild still starts
from the porcupine graft — the Sun history plus the tree-overlay commit
stay as the base for lineage and attribution. What changes is
everything after: the base block's repo-hygiene commit (rung 0.1)
replays this trash removal and the README replacement right after the
graft, so the clean branch never shows the debris.
