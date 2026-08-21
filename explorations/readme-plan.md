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

## Open questions (awaiting Pavol)

1. **Audience.** Proposed: a stranger landing on GitHub — what Fortress
   was, what this revival is, build-and-run in 5 minutes. CLAUDE.md
   stays the working-mode doc; the README doesn't duplicate it.
2. **Fate of the old files.** Proposed: delete `README.md` (its claims
   are wrong for this tree); keep `README.txt` as part of the historical
   artifact, linked from the new README as "Sun's original repository
   notes". Same cleanup could take the stray root files
   (`compile_error*.txt`, `NOTES.md`).
3. **Content spine.** Proposed: one paragraph what-Fortress-was (Steele,
   HPC, 2003–2012) → what this repo is (full history + graft overlay +
   revival, fully green suite, modernized toolchain) → build/run
   quickstart → pointers (`explorations/`, `research/`,
   `Specification/`, `LICENSE`) → attribution/lineage → ladder tags.
4. **Timing.** Land now on the current tip, or as the clean-rebuild base
   block's repo-hygiene commit — or both (write now, rebuild inherits).
