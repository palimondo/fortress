# Fortress revival

This is @palimondo's revival of Sun/Oracle's **Fortress** programming language
(Guy Steele's HPC language, 2003–2012; interpreter + partial JVM compiler,
BSD-licensed). The repo carries the full available git history (5397 commits,
root 2007-01-04, HEAD Aug 2012) with pluckyporcupine's Scala 2.10.7/Java 9
migration grafted on top as a tree overlay — see the commit messages of the
graft commits for lineage and attribution. Working mode: Claude explains the
codebase and produces documentation and experiments as we go; Pavol decides
what gets committed.

## Build and run (verified: Ubuntu 24.04 container, JDK 8)

```bash
apt-get install -y openjdk-8-jdk-headless ant   # JDK 8 exactly: Scala 2.10 breaks on 9+
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=<repo root>
unset JAVA_TOOL_OPTIONS                          # proxy trust-store options confuse ant's JVM forks
cd $FORTRESS_HOME && ant compileAll              # ~80 s
./bin/fortress explorations/claude_demo.fss      # interpreter ("walk") — this works
```

Facts that save time:

- **Use the interpreter, not the compiler.** `fortress <file>.fss` interprets
  and works. `fortress compile` + `fortress run` emits bytecode but compiled
  programs die at runtime (`NoSuchMethodError:
  fortress.CompilerBuiltin.println(...)`) — reproduced identically on JDK 8
  and pluckyporcupine's Java 9; unfinished since 2012. Getting it to work is
  an open project goal, not a regression you caused.
- **`ProjectFortress/hello.fss` does not run on the interpreter** — its July
  2012 upgrade imports `System.getProperty`/`CompilerSystem.args`, which only
  the compiler path provides. Use `explorations/*.fss` as smoke tests.
- The interpreter requires filename (sans `.fss`) == component name.
- If scalac fails with arity errors in `S*Pattern` nodes, the generated AST
  sources are stale relative to `ProjectFortress/astgen/Fortress.ast`:
  `touch ProjectFortress/astgen/Fortress.ast && ant compileAll` regenerates.
- Interpreter caches live in `default_repository/caches/` (gitignored); wipe
  them if library edits seem to have no effect.

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

1. Baseline the 2012 test suite on JDK 8 (never yet run on the grafted tree).
2. Modernization ladder: finish the staged Scala 2.12 migration
   (`third_party/scala/` already has 2.12.5 jars) → JDK 11 → 2.13 → 17/21,
   each rung gated on the test baseline.
3. Complex numbers: the spec promises ℂ but zero complex arithmetic shipped;
   seed is `explorations/complex_ring.fss`.
4. Fix the bytecode compiler path (see above).
5. Grow the Steele research corpus (`research/README.md` lists open hunts).

Claims in old READMEs (root `README.txt`, pluckyporcupine's `README.md`,
`NOTES.md`) describe *their* eras, not the current tree — verify against the
code before acting on them.
