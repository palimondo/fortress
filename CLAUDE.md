# Fortress revival

This is @palimondo's revival of Sun/Oracle's **Fortress** programming language
(Guy Steele's HPC language, 2003–2012; interpreter + partial JVM compiler,
BSD-licensed). The repo is a 2018 GitHub fork of `sirinath/fortress`, a git
conversion of the project's java.net Mercurial repository: 5,397 trunk commits
from 2007-01-04 to 2012-08-31 (`a874948ac`), twelve old branches and the `1.0`
tag. The conversion cut 146 parent links, so a history walk from HEAD stops
early; see `research/authorship.md`. Everything after `a874948ac` is the
revival's own work (2026). Working mode: Claude explains the
codebase and produces documentation and experiments as we go; Pavol decides
what gets committed. The full collaboration protocol — roles, tone, how work
is presented, commit discipline, delegation — is in
`explorations/protocol.md`; read it at session start.
The coordinator's knowledge base — `explorations/coordinator/` (`FACTS.md`: what is
established, with sources; `POSITIONS.md`: what Pavol has decided and already knows) — is
read at session start and after every compaction, and updated in the same commit as the
work that establishes a fact or takes a decision; the current state of the work is in
`explorations/microgpt-run-c-handover.md`.

## Build and run

```bash
apt-get install -y openjdk-25-jdk-headless ant  # JDK 8, 11, 17 and 21 also build and gate green
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=<repo root>
unset JAVA_TOOL_OPTIONS                          # proxy trust-store options confuse ant's JVM forks
cd $FORTRESS_HOME && ant compileAll              # ~80 s
./bin/fortress explorations/claude_demo.fss      # interpreter ("walk")
```

Toolchain traps: `build.xml` drives scalac through `scala.tools.nsc.Main`
directly, because Scala 2.13 dropped the `scala.tools.ant` tasks; ASM is
vendored in `ProjectFortress/third_party/asm/`, and Fortress's own
`asmbytecodeoptimizer.Opcodes` shadows `org.objectweb.asm.Opcodes` in that
package; sources are compiled as UTF-8. The versions, the emitted classfile
level and the runtime's ForkJoin pool are in
`explorations/modernization-plan.md`.

Facts that save time:

- **Both execution paths work.** `fortress <file>.fss` interprets directly.
  The bytecode compiler path (`fortress compile` + `fortress run`) has two
  traps: imported library components (`System`, `CompilerSystem`) must be
  explicitly `fortress compile`d into the cache first, and **stale caches**
  cause a misleading `NoSuchMethodError: fortress.CompilerBuiltin.println(...)`
  — wipe `default_repository/caches/*` and recompile in library order (recipe
  in `explorations/repo-internals.md`). The compiler is incomplete (some
  constructs still `sayWhat`), not broken.
- **`ProjectFortress/hello.fss` runs only via the compiler path** — its July
  2012 upgrade imports `System.getProperty`/`CompilerSystem.args`, which the
  interpreter can't resolve. Use `explorations/*.fss` as interpreter smoke
  tests.
- **The test suite is fully green and is the gate for every change:** `ant
  testFast` (the compiler suite among others) and `ant testSystem` (the
  interpreter tests), zero failures. The current counts are in the last
  landed gate summary (`explorations/compile-ladder/climb-batch-*/gate/summary.txt`);
  how the suite first went green is in `explorations/test-baseline-jdk8.md`.
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

## Project goal

Finish what the designers intended, judged by the latest committed
specification (`Specification/`, the July 2012 draft), not redesign the
language; the measuring stick is one program, microGPT, compiled to bytecode
and running fast (Pavol, 2026-09-16, `explorations/coordinator/POSITIONS.md`).
`Specification/` stays the standard; where the Types chapter of the team's
later, unfinished restart of the specification
(`Documentation/Specification/Prose/Language/types.tick`, 2012) covers a
topic, it is cited beside it as the designers' later word (Pavol, 2026-09-26;
`explorations/coordinator/spec-lineage.md`).
The plan is `explorations/coordinator/PLAN.md`; where the work stands is the
first section of `explorations/microgpt-run-c-handover.md`; every known gap,
defect and design limit is a row of `explorations/fortress-gap-ledger.md`.

Claims in the 2012 tree's own READMEs (root `README.txt` among them) describe
their era, not the current tree — verify against the code before acting on
them.
