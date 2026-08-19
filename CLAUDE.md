# Fortress revival

This is @palimondo's revival of Sun/Oracle's **Fortress** programming language
(Guy Steele's HPC language, 2003–2012; interpreter + partial JVM compiler,
BSD-licensed). The repo carries the full available git history (5397 commits,
root 2007-01-04, HEAD Aug 2012) with pluckyporcupine's Scala 2.10.7/Java 9
migration grafted on top as a tree overlay — see the commit messages of the
graft commits for lineage and attribution. Working mode: Claude explains the
codebase and produces documentation and experiments as we go; Pavol decides
what gets committed.

## Build and run (verified: Ubuntu 24.04 container, JDK 21 — current rung)

```bash
apt-get install -y openjdk-21-jdk-headless ant  # JDK 8/11/17 also still work (all gated green)
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=<repo root>
unset JAVA_TOOL_OPTIONS                          # proxy trust-store options confuse ant's JVM forks
cd $FORTRESS_HOME && ant compileAll              # ~80 s
./bin/fortress explorations/claude_demo.fss      # interpreter ("walk") — this works
```

Toolchain (2026-08-19): Scala 2.12.20, `-source/-target 1.8` (pinned in
build.xml — ASM 3.1 must keep seeing v52 classfiles), sources compiled as
UTF-8 (all sources were already valid UTF-8; the old ISO-8859-1 javac
attributes just mis-decoded comments), work-stealing runtime on stdlib
`java.util.concurrent` ForkJoin (vendored jsr166y retired); see
`explorations/modernization-plan.md` for the ladder and current rung.

Facts that save time:

- **Both execution paths work.** `fortress <file>.fss` interprets directly.
  The bytecode compiler path (`fortress compile` + `fortress run`) also works
  on JDK 8 — pluckyporcupine's "compiled programs don't run" is wrong here —
  but has two traps: imported library components (`System`,
  `CompilerSystem`) must be explicitly `fortress compile`d into the cache
  first, and **stale caches** cause a misleading
  `NoSuchMethodError: fortress.CompilerBuiltin.println(...)` — wipe
  `default_repository/caches/*` and recompile in library order (recipe in
  `explorations/repo-internals.md`). The compiler is incomplete (some
  constructs still `sayWhat`), not broken. See
  `explorations/test-baseline-jdk8.md`.
- **`ProjectFortress/hello.fss` runs only via the compiler path** — its July
  2012 upgrade imports `System.getProperty`/`CompilerSystem.args`, which the
  interpreter can't resolve. Use `explorations/*.fss` as interpreter smoke
  tests.
- **Test suite (2026-08-19): fully green.** `ant testFast` (~1,400 tests
  incl. the full compiler suite) and `ant testSystem` (382 interpreter
  tests) both pass with zero failures — the first fully green suite in this
  lineage (the 2012 mainline ended with 7 red). History and the two fixes:
  `explorations/test-baseline-jdk8.md`.
- The interpreter requires filename (sans `.fss`) == component name.
- If scalac fails with arity errors in `S*Pattern` nodes, the generated AST
  sources are stale relative to `ProjectFortress/astgen/Fortress.ast`:
  `touch ProjectFortress/astgen/Fortress.ast && ant compileAll` regenerates.
- Interpreter caches live in `default_repository/caches/` (gitignored); wipe
  them if library edits seem to have no effect.
- Architecture map, name-resolution rules, cache anatomy, test-harness
  mechanics, and git-archaeology techniques: `explorations/repo-internals.md`
  — read it before diving into the source.

## Layout

- Original Fortress tree: everything not listed below — do not modify
  casually; it is the historical artifact being revived.
- `explorations/` — revival-era experiments and writeups (ours; verified
  running programs).
- `research/` — the Guy Steele corpus: `research/README.md` is a committed
  links-only index; `research/extracts/` holds committed working notes;
  `research/decks/` is **gitignored** (copyrighted PDFs, dropped in per
  session, never committed).
- `Specification/` + `Specification-1.0-frozen/` — the language spec LaTeX
  (in-repo, richer than the published PDF; building it is untested).

## Project goals (rough order)

1. ~~Baseline the 2012 test suite~~ DONE — fully green on JDK 8 (see above).
2. Modernization ladder — **approved plan, standing orders, and current rung:
   `explorations/modernization-plan.md`** (Scala 2.12 ✓ → JDK 11 → UTF-8 →
   jsr166y→j.u.c. → JDK 17/21 → ASM 9 → Scala 2.13 eval; each rung gated on
   the fully green suite; CI early).
3. Complex numbers: the spec promises ℂ but zero complex arithmetic shipped;
   seed is `explorations/complex_ring.fss`.
4. Fix the bytecode compiler path (see above).
5. Grow the Steele research corpus (`research/README.md` lists open hunts).

Claims in old READMEs (root `README.txt`, pluckyporcupine's `README.md`,
`NOTES.md`) describe *their* eras, not the current tree — verify against the
code before acting on them.
