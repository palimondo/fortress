# C2 proposal: final commit messages and the `modernization/*` tags

Status: **proposal for Pavol's review — nothing here is executed.** This
document is the review artifact for the C2 history pass (rebuild-plan
step C2) plus the tag step. Sequence after approval: replay clean-ladder
onto the same base with these 14 commits → force-push clean-ladder
(only on explicit authorization) → annotated `modernization/*` tags on
the final SHAs → Pavol pushes tags and renames the branch to `main`
from his machine.

**Revision 3**, applying the whole revision-2 review round:

- **14 commits** (was 19): R4/R7 dropped (empty verification commits),
  five merges — E2+E3, B1+B2, B5+B6, R2+R3, C1 folded into R8.
  Merge set conditionally approved; this document is the preview that
  the final approval is conditioned on.
- **Terse messages.** Every body trimmed to the essential what/why.
- **No hard-wrapped bodies.** Only the subject line stays short (git
  treats line 1 as the title); bodies are fluent paragraphs that the
  viewer reflows. Line breaks appear only as content: bullet lists and
  paragraph breaks.
- **Tags renamed `ladder/*` → `modernization/*`** — "ladder" was
  internal jargon; the new name self-describes and matches
  `explorations/modernization-plan.md`. "Rung"/"floor" vocabulary is
  swept from the tag messages too.
- **Two content changes** ride the replay: B1's .gitignore re-authored
  (no migration references) and E5's authorship.md loses the
  mirror-provenance bullet — decided 2a, drop the whole bullet.

Earlier settled conventions still in force: messages are written for
someone examining this repository as a historic exhibit — what changed
and why, nothing about the modernization campaign. All verification
records live exclusively in the annotated tags (§4). No references to
the 2018 GitHub migration anywhere: nothing in this history derives
from it; the .gitignore is authored from the trunk's own .hgignore plus
what this tree emits. One deliberate remnant: B8 keeps one sentence of
speedup numbers (its whole point) — veto if unwanted.

Review shorthand: commits are named by their plan ids (merged ones as
e.g. "B1+B2") and current clean-ladder SHAs. Both are process
vocabulary and appear only in this document. Every commit carries the
standard footer (not repeated below):

```
Co-Authored-By: Claude <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01LjDz79rDLErtnSKpovMDpX
```

## 1. The 14 commits

### 1. E1 `78e9dfcc5` — trimmed

The forward-references paragraph shrinks to one sentence; body
unwrapped.

```
README: introduce the repository and the revival

Kickoff of the revival: a README that introduces Fortress -- Sun Labs' 2003-2012 experimental language for high-performance computation, designed under Guy L. Steele Jr. and Eric Allen -- and maps this repository for a modern reader: what the language was, where the implementation lives, how to build and run it, and where the primary sources are.

The hero image is the heart of the original buffons.fss demo, typeset as mathematics the way Fortress was meant to be read. The light/dark SVGs are committed alongside so the README's first screen renders; their source, explorations/fortify/buffons-excerpt.tic, is the exact excerpt fed through Fortify (the project's own Emacs-and-LaTeX typesetter, in Fortify/ in this tree).

The README links Specification/fortress.pdf, the rendered Papers PDFs, and research/authorship.md; those files are added in the next few commits.
```

### 2. E2+E3 `c571a3fe1`+`17d0a29d2` — merged, trimmed + content change

One commit: the spec-toolchain repairs and the PDFs they produce.

**Content change (decided 2026-08-23):** the six fortify.el
operator-name macros render with Steele's arrow notation (arrow over
the operator, per his 2015 TechTalk and 2016 JuliaCon slides) instead
of the placeholder small-caps tags, and Specification/fortress.pdf is
the rebuild with that rendering — already committed on the working
branch (`9622f9db3`); the replay puts it into this commit.

```
Render the spec and papers; repair what blocked the builds

Specification/fortress.pdf is the post-1.0 Working Draft specification (599 pages) built from the in-repo LaTeX -- richer in places than any published PDF. It replaces the committed fortress.1.0.pdf, a byte-identical duplicate of the frozen 1.0 render. Alongside it: the Fortify literate-programming example (buffons_doc.pdf) and the four in-repo research papers.

Three repairs feed those renders. Fortify gains \providecommand definitions for the six operator-name macros fortify.el emits (\inclusiveprefix &c.) but which were never committed anywhere in the 2007-2012 history -- the spec build died on them. The draft spec's editorial \note boxes -- bare frameboxes that overflowed the page edge and read as normative text -- are restyled as manuscript notes that break across pages (draft mode only; the release build is untouched). And the three Perl reserved-words table generators opened their output in append mode while "ant tex" re-runs them every build, so each rebuild without a clean appended another copy of every table; they now truncate and are idempotent. The only other edit is the draft title page: the sources' snapshot date (July 19, 2012) instead of the build date.

Also ignores the regenerable LaTeX build exhaust (aux/log/toc/..., fortify.el backups, .tex generated from .tick sources, the build-dir PDF) so builds don't pollute git status.
```

### 3. E5 `a8dd74348` — trimmed + content change

**Content change (decided 2a):** `research/authorship.md` drops the
open-questions bullet on the GitHub mirror's provenance — the tree's
last pluckyporcupine mention. The message below already carries the
useful fact from it (the severed parent links).

```
research: add authorship map of the 2007-2012 history

Identity key for the three naming eras (Sun employee IDs, SVN usernames, real names), per-subsystem attribution from --full-history path counts, 2026 affiliations from public sources, and the open identity questions.

Two caveats shape the counts: the pre-2007 design years (and Tobin-Hochstadt's and Hallett's contributions) predate the git record entirely, and the hg->git conversion behind the GitHub mirror severed 146 parent links -- plain `git log -- <path>` and `git blame` dead-end at phantom roots, so all counts use --full-history.
```

### 4. B1+B2 `ffca9f7ec`+`d7ae70df8` — merged, trimmed + content change

**Content change:** the .gitignore is re-authored — port the last
still-useful .hgignore entries (`*.tfi`, `*~`, `*.orig`, `*.hprof`),
reword "Compiler-path caches missing from the imported ignore list" to
plain "Compiler-path caches". Everything else in .hgignore is already
covered, dead paths, or reversed policy. This also retires the stale
B2 claims about B4 ("the generated trees land next-but-one") — B4 no
longer exists.

```
Repo hygiene: complete .gitignore, deterministic regeneration

The 2012 trunk shipped only an .hgignore, and the ignore entries added with the rendered PDFs cover just LaTeX byproducts. Extend .gitignore into the full ignore file -- the trunk's .hgignore entries that still apply, plus everything the current tree and toolchain emit: build output and editor noise, the interpreter and compiler-path caches under default_repository/caches/, the generated sources ant rebuilds from Fortress.ast and the grammar (the ASTGen node trees, the four Rats! parsers, Operators.java -- the same list the trunk's .hgignore excluded), transient test-run artifacts, private caches of the parallel test harness a later commit introduces, local-only research/decks/, and OS noise. `git status` stays clean after every build and test run.

With the generated trees untracked, make their regeneration deterministic too: the in-repo ASTGen generators stop stamping a build date into every emitted class and emit the CollectingVisitor helpers in sorted order, and build.xml normalizes the timestamp headers written by the two generators vendored as jars (astgen.jar and the Rats! parser generator). Regeneration is byte-identical run to run, so a regenerated tree can be diffed to prove a toolchain bump changed nothing it shouldn't.
```

### 5. B3 `e9aaa8e7d` — trimmed

```
Revive the 2012 build on JDK 8: Scala 2.10.7, five files

The pure 2012 trunk no longer builds anywhere installable here: Scala 2.9.0's classfile parser cannot read the Java 8 rt.jar, and no JDK 7 exists for this platform. Scala 2.10.7 is the minimal bridge -- the earliest release that runs on JDK 8 and compiles the entire 2012 Scala tree with zero source edits.

The revival touches five files. The vendored Scala jars swap 2.9.0 for 2.10.7 (compiler, library, and reflect -- a new runtime dependency of the 2.10 compiler). build.xml bumps the scala-version property, adds scala-reflect to the classpath, and sets encoding="UTF-8" on the javac tasks: every source file is valid UTF-8, and the trunk merely relied on a platform default that here is ASCII. bin/fortress_classpath bumps SV. And FTypeTuple.java passes the existing FType.listComparer to two bare TreeSet constructors: JDK 8's TreeMap invokes the comparator on the very first insert, so a natural-ordering TreeSet of List<FType> now throws ClassCastException -- it worked on JDK 6/7 only because the first insert skipped the compare.

This restores exactly the 2012 state: the only test failures are the seven the mainline itself ended with, all fixed later in this history.
```

### 6. B5+B6 `1b21a090a`+`f9eb1e814` — merged, trimmed

```
Build-script cleanup: drop -Xfuture, pin javac targets, classpath SSOT

Drop -Xfuture from the nine launcher scripts that fork a JVM for compiled code. The 2005-era "strictest classfile checks" flag became the JVM default for v50+ classfiles (exactly what Fortress emits), was deprecated in JDK 9, and is removed in JDK 25, where it kills the forked JVM at startup.

In build.xml, all eight javac tasks now pin source and target to ${javaSourceVersion}, bumped 1.5 -> 1.8. Before, three tasks pinned neither and five only source, silently deferring to the running JDK; with target unpinned, javac 11 would emit v55 classfiles whose invokedynamic string concatenation ASM 3.1 cannot parse. Jar names are derived from version properties, so future toolchain upgrades edit one property per component. The tools.jar pathelement stays -- still required on JDK 8, removed with the later move to JDK 11.

In bin/, debugOpt, fortress_leaks, and runOptCollect delegate their jar lists to bin/fortress_classpath -- the single source of truth already serving bin/fortress -- instead of carrying private, partly broken copies (stale 2.9.0 jar names, ${SV} entries missing their $, a FORTRESS_HOME self-location that never matched the script's own name). fortress.bat cannot source a bash script and keeps its own list, bumped to 2.10.7 with a note to stay in sync.
```

### 7. B7a `1cdb900ca` — trimmed

```
Fix System api shadowing: move compiler getProperty into CompilerSystem

The 2012-07-19 import (5a68404) added a minimal compiler-path api System (getProperty only) to LibraryBuiltin, which precedes Library on fortress.source.path -- shadowing the interpreter's full api System and breaking six interpreter tests with "FortressBuiltin.JavaString/StringVector is undefined". The two worlds cannot share one api name: the interpreter's System declares args as an ImmutableArray, which does not exist for the compiler.

The compiler world now gets getProperty through its own api: the shadow LibraryBuiltin/System.fsi/fss is deleted (the interpreter resolves api System to Library/System again), Library/CompilerSystem gains getProperty as a foreign import of the same native, and hello.fss imports CompilerSystem.{args, getProperty}.
```

### 8. B7b `3d94b13a8` — trimmed

```
Correct the e constant to the double nearest e

Library/Constants.fss pinned e = 2.7182818284590455, hand-tuned to match Math.exp(1.0) on the 2012-era JDK, which returned a value 1 ulp above the correctly rounded double. Modern JDKs compute exp(1.0) correctly rounded, so realArith's assert(exp 1.0, e) failed. The correctly rounded 2.718281828459045 restores the test's intent (exp 1.0 = e, log e = 1.0) and is the mathematically right constant.

With this and the System-shadowing fix, all seven failures the 2012 mainline ended with are gone.
```

### 9. B8 `ebddd773a` — trimmed

Keeps the one-sentence speedup numbers (the deliberate remnant).

```
Speed up the test suite: single cache wipe, parallel tracks and shards

CompilerJUTest and LibraryJUTest each reset the shared repository cache in suite(), so every testFast run paid two cold library rebuilds. The per-suite resets are now gated on fortress.junit.reset (default true, so standalone suite runs are unchanged); the harness disables it and starts each track in a fresh private cache instead.

testFast runs as 4 parallel tracks (the three big suites each dominate a track, everything else shares the fourth) and testSystem as 4 shards. Each junit JVM is forked with a private cache tree under ProjectFortress/test-caches -- redirected via the fortress.caches sysproperty and the FORTRESS_CACHES environment variable, honored by Shell.resetRepository and the bin scripts -- so tracks cannot corrupt each other or the tracked caches; failures aggregate through a shared write-once property.

The harness changes how tests are scheduled and where their caches live, not what they test. testFast drops from ~13 to ~6.5 minutes, testSystem from ~3 to ~2.5.
```

### 10. R1 `a92f1b736` — trimmed

```
Bump Scala from 2.10.7 to 2.12.20

Straight to the final release of the binary-compatible 2.12 line, which runs on JDK 8 through 21. The entire 2012 Scala tree compiles under 2.12 unmodified; only the toolchain wiring moves: the vendored jars (plus scala-parser-combinators, which left the standard library after 2.10 and which TypeParser depends on), build.xml's version properties and classpaths, and the runtime classpath in bin/fortress_classpath (scala-reflect is a runtime dependency since 2.12). The astGenerators scalac task drops a 2.9-era incremental-builder debug flag that 2.12 rejects.
```

### 11. R2+R3 `9a2e947f7`+`96c507c53` — merged, trimmed

```
Move to JDK 11; retire jsr166y for java.util.concurrent

JDK 11 enablement, four changes: InstantiatingClassloader delegates jdk.* classes to the system loader (JDK 9 moved reflection's generated accessors to jdk.internal.reflect, and without the delegation Constructor.newInstance re-entered loadClass and threw IllegalAccessError); FortressMethodAdapter drops the NestHost/NestMembers attributes when rewriting native wrappers (ASM 3.1 copies them as opaque bytes, leaving constant-pool indices dangling); four parser files import xtc.parser.Module explicitly (unqualified Module is ambiguous against java.lang.Module since JDK 9); and the dead tools.jar pathelement and a dead JDK-internal BCEL import go.

With the platform floor at 11, the 2007-era vendored jsr166y fork-join backport retires for the JDK's own java.util.concurrent: both work-stealing runtimes (the interpreter's evaluator/tasks/* and the compiled runtimeSystem/*), LocalRandom, and the FibTests harness port over, and the jar is deleted. The three API deltas are handled explicitly: ForkJoinPool's (int, factory) constructor becomes the 4-arg form with the same defaults; helpJoin() callers use join(), which in j.u.c. already helps; and CodeGen emits the j.u.c. descriptor for the pool invoke in generated main() (previously compiled jars in bytecode_cache are stale after this).

j.u.c.'s helping join() exposed a latent STM hazard that jsr166y's blocking join masked: generated task bodies point the worker thread's current-task field at themselves and never restore it, so a helping join can run unrelated tasks on the joining thread and leave transaction state corrupted (nestedTransactions1/2 failed intermittently). BaseTask.joinOrRun now saves and restores the field across join(), mirroring the interpreter's existing restore in Evaluator -- the 2008-era code already knew this invariant.
```

### 12. R5 `0d62594b4` — trimmed

```
Upgrade ASM 3.1 to 9.10.1

Replaces the vendored asm-all-3.1.jar with the four ASM 9.10.1 modules (asm, asm-util, asm-tree, asm-analysis; asm-commons is not needed -- the only thing used from it was EmptyVisitor, gone in ASM 4+).

The ASM 4+ API turned the visitor interfaces into abstract classes and made ClassWriter's visit* methods final, so the 17 touched sources follow a few patterns: adapters extend ClassVisitor/MethodVisitor with super(Opcodes.ASM9, delegate); ManglingClassWriter becomes a ClassVisitor delegating to a private ClassWriter subclass that keeps the load-bearing getCommonSuperClass fallback, and signatures that took it as ClassWriter now take ClassVisitor; TraceMethodVisitor wraps a Textifier (its text moved to the Printer API); EmptyVisitor uses become anonymous visitor stand-ins; and the nest attributes are dropped via the new first-class visitNestHost/visitNestMember events. In the asmbytecodeoptimizer package the ASM9 constant is fully qualified: the package's own Opcodes class shadows ASM's.

The ~195 four-arg visitMethodInsn emit sites stay as-is: ASM 9's deprecated forwarder computes the itf flag identically for every Fortress emit; the overrides re-signed to five args pass it through, and MethodInstantiater recomputes it from the possibly retargeted opcode. Emitted classfiles stay V1_6 and -source/-target 1.8; raising them is now unblocked (ASM 9 parses through v69).
```

### 13. R6 `4d00c4738` — trimmed

```
Upgrade Scala 2.12.20 to 2.13.18

Scala 2.13 no longer ships the scala.tools.ant tasks, so build.xml drives scala.tools.nsc.Main directly via <java fork="true"> with an @argfile. Joint Java+Scala compilation is preserved by feeding scalac the .java sources too -- it reads their signatures and emits nothing; the javac step that follows compiles them as before. The astGenerators scalac call was a no-op (zero .scala files there) and is retired.

The source migration is 9 files, all mechanical: JavaConversions (removed in 2.13) becomes scala.jdk.javaapi.CollectionConverters; OverloadingChecker adds .view/.toMap around a now-lazy mapValues; TraitTable drops the empty parens on a now-parameterless iterator override; STypesUtil and TypeParser lose postfix operator syntax.
```

### 14. R8+C1 `27aab6a85`+`1871c3c02` — merged, trimmed

```
Raise javac -source/-target from 1.8 to 25

Flip the single javaSourceVersion knob in build.xml (feeding all eight javac tasks) from 1.8 to 25, the latest LTS. Every intermediate toolchain state remains in this history, tagged modernization/*, for anyone who needs an older compilation floor.

Emitted Fortress classfiles are untouched and stay V1_6 -- raising them is bundled with future bytecode-compiler work, since it requires stack-map frame generation through the class-rewriting pipeline.

The README's build section now notes that the build and the full test suite run on modern JDKs.
```

## 2. Structural summary

- **Dropped:** R4 `d4698e811` and R7 `18178fa5c`, the empty
  verification commits — their records move into the tags (§3).
- **Merged:** E2+E3 (spec toolchain + its renders), B1+B2 (repo
  hygiene), B5+B6 (build-script cleanup), R2+R3 (JDK 11 + its
  consequence), C1→R8 (the README note documents what R8 did).
- **Kept separate:** B7a/B7b — two unrelated bugs with unrelated
  diagnoses; each tells one story.
- **Result: 21 commits (original clean-ladder) → 14.**
- **Content changes in the replay (the only tree edits):** E2+E3's
  arrow-notation fortify.sty and rebuilt fortress.pdf, B1+B2's
  re-authored .gitignore, and E5's authorship.md bullet removal.

## 3. The `modernization/*` tags

Annotated tags on the final (post-replay) SHAs; they carry the entire
verification story. "Min JDK" = the lowest JDK that builds and runs
that commit; the tag name records the JDK the full verification ran
on, so `git checkout modernization/jdkN` is always a verified state
for JDK N. "Full suite green" = `ant clean compileAll` + `testFast`
(1,377 tests / 47 suites) + `testSystem` (382 tests), zero failures,
zero errors, clean tree.

| Tag | Points at | Min JDK | Toolchain |
|---|---|---|---|
| `modernization/jdk8-baseline` | B8 | 8 | Scala 2.10.7, ASM 3.1, jsr166y |
| `modernization/scala-2.12` | R1 | 8 | Scala 2.12.20 |
| `modernization/jdk11` | R2+R3 | 11 | + j.u.c. runtime |
| `modernization/jdk17` | R2+R3 | 11 | 〃 |
| `modernization/jdk21` | R2+R3 | 11 | 〃 |
| `modernization/asm-9` | R5 | 11 | ASM 9.10.1 |
| `modernization/scala-2.13` | R6 | 11 | Scala 2.13.18 |
| `modernization/jdk25` | R8+C1 | 25 | -source/-target 25 |

Tag messages:

- **`modernization/jdk8-baseline`** — "The revived 2012 trunk, fully
  green on JDK 8, with the parallelized test harness. Toolchain: Scala
  2.10.7, ASM 3.1, vendored jsr166y. Full suite green (testFast 1,377
  tests, testSystem 382, zero failures) on OpenJDK 1.8.0_492."
- **`modernization/scala-2.12`** — "Scala 2.12.20. Minimum JDK: 8.
  Full suite green on JDK 8."
- **`modernization/jdk11`** — "JDK 11, with the work-stealing runtime
  on java.util.concurrent. Minimum JDK: 11. Full suite green on
  JDK 11."
- **`modernization/jdk17`** — "JDK 17 verification: zero changes
  needed — after the jsr166y retirement no JDK-version coupling
  remains. Minimum JDK: 11. Full suite green on JDK 17 (17.0.19)."
- **`modernization/jdk21`** — "JDK 21 verification, zero changes
  needed (see modernization/jdk17). Minimum JDK: 11. Full suite green
  on JDK 21 (21.0.10)."
- **`modernization/asm-9`** — "ASM 9.10.1. Minimum JDK: 11. Full
  suite green on JDK 21."
- **`modernization/scala-2.13`** — "Scala 2.13.18. Minimum JDK: 11.
  Full suite green on JDK 21; verified again on JDK 25 (25.0.3) with
  zero changes."
- **`modernization/jdk25`** — "javac -source/-target 25. Minimum JDK:
  25. Full suite green on JDK 25 (25.0.3). For an older compilation
  floor, check out an earlier modernization/* tag."

With R2+R3 merged, three tags (`jdk11`, `jdk17`, `jdk21`) point at one
commit. The symmetric set keeps "checkout the tag named after your
JDK" working without explanation; collapsing them into one tag with
three records is the alternative if three-on-one feels redundant.

## 4. Execution sequence (after final approval)

1. Pavol reads this preview; final approval (or edits).
2. Replay clean-ladder onto the same base: 14 commits, these messages,
   and the three content changes (E2+E3's fortify.sty + fortress.pdf,
   B1+B2's .gitignore, E5's authorship.md). No build impact, so no
   re-gate; verification is `git diff <old-tip> <new-tip>` showing
   exactly those file deltas, plus a commit-count/subject audit.
3. Force-push clean-ladder — **only on Pavol's explicit authorization**.
4. Create the annotated `modernization/*` tags locally; Pavol pushes
   them from his machine (`git push --tags`).
5. Branch rename to `main` — Pavol's, via GitHub.
6. Tick C2 and the tag step in rebuild-plan.md; the backup branches
   (`presquash-backup`, `pre-b1squash-backup`, `pre-b4drop-backup`)
   become deletable whenever Pavol is satisfied.
