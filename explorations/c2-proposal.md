# C2 proposal: final commit messages, drops, and the `ladder/*` tags

Status: **proposal for Pavol's review — nothing here is executed.** This
document is the review artifact for the C2 history pass (rebuild-plan
step C2) plus the tag-namespace step that was decided in
`readme-plan.md` but omitted from the rebuild-plan checklist (now added
there). Sequence after approval: byte-identical replay with these
messages → force-push clean-ladder (only on explicit authorization) →
annotated `ladder/*` tags on the final SHAs → Pavol pushes tags and
renames the branch to `main` from his machine.

Review shorthand: commits are named below by their plan id and current
clean-ladder SHA. Both are process vocabulary and appear only in this
document — the proposed messages themselves contain neither.

## 1. Conventions applied (what got stripped, what stayed)

Stripped everywhere:

- Plan-step ids: `(rung RN)` subject suffixes, and B1/B4/B8-style
  references inside bodies. In-history references stay, but by
  description ("the classpath-SSOT commit", "the JDK 11 rung") — the
  ladder itself is the public story; the lettered plan is not.
- First-ascent and working-branch SHAs, "re-apply of X" lines, and every
  "deviations from the first ascent" paragraph. The rebuilt history has
  to stand alone; the working branch remains the process record.
- Gate wall-clock timings. The gate *result* stays as one closing
  paragraph per gated commit — "full gate on JDK N, fully green:
  compileAll; testFast 1,377 tests / 47 suites / 0F / 0E; testSystem
  382 / 0F / 0E; working tree clean" — because "every rung was gated
  green" is part of the exhibit's claim. **One exception: the
  test-speedup commit keeps its before/after timing table — the timing
  is that commit's payload, not process noise.**

Kept everywhere:

- The technical narrative: what changed, why, what broke without it.
- Attribution content (pluckyporcupine credits, the 2018-migration
  accounting, research/authorship.md pointers).
- SHAs of *pre-graft trunk* commits (e.g. `5a68404`, the 2012-07-19
  import) — those are stable ancestors, not churned by any replay.
- The standard footer on every commit (not repeated in the texts below):

  ```
  Co-Authored-By: Claude <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01LjDz79rDLErtnSKpovMDpX
  ```

One factual repair C2 must make regardless of style: **B2's current
message still says the generated trees "land next-but-one, at B4" and
that "the determinism claim is proven at B4"** — written before B4 was
dropped. Both claims are now false in this history; the proposed B2 text
recasts the determinism rationale without them.

## 2. Structural proposals (merges / drops)

**Drop R4 (`d4698e811`) and R7 (`18178fa5c`), the two empty
verification commits.** Their entire content is "zero changes, gate
green on JDK X" — exactly what an annotated tag message is for. R4
verified JDK 17 and 21 on R3's tree, so tags `ladder/jdk17` and
`ladder/jdk21` on R3's commit carry those records in the right place;
R7 verified JDK 25 on R6's tree, so its record folds into the
`ladder/scala-2.13` tag message. Dropping empty commits changes no tree,
so the replay stays byte-identical in content. The history then contains
only commits that change something, and the verification story moves to
the tag namespace — the stable public interface. (Alternative, if you
prefer every verification to be a commit: keep both and tag them
directly; the messages below include rewritten versions for that case.)

**Keep B7a + B7b separate.** Considered merging them as one "fix the
seven 2012 failures" commit, but they are two unrelated bugs with
unrelated diagnoses (api-shadowing design flaw vs. a hand-tuned constant
invalidated by correctly-rounded exp). Two commits, each telling one
story, read better; B7b's message already marks the joint milestone
(first fully green suite).

**Keep R2 + R3 separate.** Both are JDK-11-era work but distinct
concerns: platform enablement vs. retiring the vendored jsr166y (with
its own STM-hazard story). No other merge candidates: E3+E4 were already
squashed and B4 dropped in earlier rewrites.

Result: 21 commits → 19.

## 3. Proposed messages, commit by commit

Unchanged commits are listed by subject only; for rewritten ones the
full proposed text follows, with a one-line note of what changed.

### E1 `78e9dfcc5` — unchanged

`README: introduce the repository and the revival`

### E2 `c571a3fe1` — unchanged

`Fortify: define the six operator-name macros fortify.el emits`

### E3 `17d0a29d2` — unchanged

`Commit rendered PDFs from first successful LaTeX builds; repair draft spec`

### E5 `a8dd74348` — reworded

Changed: "Folds in the later corrections" (working-branch process
framing) becomes plain statements.

```
research: add authorship map of the 2007-2012 history

Identity key for the three naming eras (Sun employee IDs, SVN usernames,
real names), per-subsystem attribution from --full-history path counts,
2026 affiliations from public sources, and the open identity questions.

Two caveats shape the counts: the pre-2007 design years (and
Tobin-Hochstadt's and Hallett's contributions) predate the git record
entirely; and the hg->git conversion behind the GitHub mirror severed
146 parent links — plain `git log -- <path>` and `git blame` dead-end at
phantom roots, so all counts use --full-history.
```

### B1 `ffca9f7ec` — reworded

Changed: "(B3)" and "landing at B8" replaced by descriptions; "the
exhibit block's .gitignore" (plan jargon) replaced.

```
Repo hygiene: extend .gitignore to cover everything this tree emits

The 2012 trunk shipped only an .hgignore; the ignore entries added with
the rendered PDFs cover just LaTeX byproducts. Before the build revives
and the gates start checking for a clean tree, extend it into the full
ignore file so `git status` stays clean after every build and test run:

- Build output and editor noise -- /ProjectFortress/build/*, *.tfs,
  *.swp. These entries (and the interpreter cache list below) come from
  pluckyporcupine's 2018 migration .gitignore, credited here.
- Interpreter and compiler-path caches under default_repository/caches/
  (every *_cache directory plus logs/, and the top-level cache index
  global.map the repository writes alongside them) and the ant <depend>
  task cache ProjectFortress/.dependencies/ -- all machine-local,
  regenerated on demand; neither was ever tracked by the trunk.
- Generated sources: the ASTGen node classes (nodes/,
  scala_src/nodes/FortressAst.scala, Library/FortressAst.fsi/.fss), the
  four Rats!-generated parsers, and Operators.java -- ant regenerates
  all of them from Fortress.ast and the grammar on every clean build,
  and nobody reads machine output; the readable sources are Fortress.ast
  and the grammar modules themselves. The trunk's .hgignore excluded
  exactly this list, mirrored here.
- Transient test-run artifacts: TEST-RESULTS/, test-tmp/,
  junit-results/, ant-junit scratch property files, and testFile.txt
  (scratch output of the file-IO interpreter tests).
- /ProjectFortress/test-caches/ -- used by the parallel test harness a
  later commit introduces; ignored now so that diff stays pure.
- research/decks/ -- copyrighted Steele decks (Oracle's notice permits
  personal/classroom copies only), dropped in locally per session and
  never committed.
- OS noise (.DS_Store, Thumbs.db).

No build gate: the untouched trunk does not compile until the JDK 8
revival. The standing check is a clean `git status` after every later
build.
```

### B2 `d7ae70df8` — rewritten

Changed: the stale B4 claims (factual fix), the three working-branch
SHAs, the "explainer comment briefly carried" aside, and the B3/B4
letters; the determinism rationale is recast for a history where
generated trees are never committed.

```
Generated-source determinism: timestamp-free generators, sorted emission

Make AST/parser regeneration byte-identical run to run. The generated
trees themselves are ignored as machine output (ant regenerates them
from Fortress.ast and the grammar on every clean build), but determinism
still pays: it makes the generated tree a pure function of its inputs,
so regenerations can be diffed byte-for-byte across toolchain rungs to
prove a compiler or JDK bump changed nothing it shouldn't.

- EllipsesNode, TemplateGapClass, TransformationNode: stop stamping
  "@version  Generated automatically by ASTGen at <new Date()>" into
  every emitted node class; emit "... from Fortress.ast" instead. The
  timestamp is a 2003 Rice CVS-era accident — a build-time substitute
  for a CVS $Id$ that generated files never had — read by nothing.

- CollectingVisitorGenerator: emit the combine* helper methods in
  sorted order instead of hash-iteration order, so the five
  *CollectingVisitor classes do not reshuffle across toolchains.

Plus two build.xml hunks covering the generators we do NOT control
in-repo:

- makeAST gains a <replaceregexp> post-step normalizing the same
  @version timestamp header emitted by edu.rice.cs.astgen.NodeClass
  inside the vendored astgen.jar (the alternative was forking the jar).

- the buildparser macrodef normalizes the locale-formatted generation
  date that xtc.util.Tool.printHeader stamps into the four Rats!
  parsers.

No gate here by design: the untouched trunk cannot yet build on any
installable JDK (Scala 2.9.0 cannot read the Java 8 rt.jar); the
revival lands next.
```

### B3 `e9aaa8e7d` — reworded

Changed: dropped the spike sentence, the first-ascent ISO-8859-1
mis-diagnosis story (kept as a plain statement of why UTF-8 is right),
"(per Pavol)", the "preserved first-ascent branch" pointer, and the
lettered forward references; gate keeps JDK version, counts, and the
seven named failures, drops wall times.

```
Revive the 2012 build on JDK 8: Scala 2.10.7, five files

The pure 2012 trunk does not build on any JDK installable here: Scala
2.9.0's classfile parser cannot read the Java 8 rt.jar ("bad constant
pool tag 18" loading java.util.Comparator, then 116 cascade errors),
and no JDK 7 exists for this platform (Ubuntu 24.04), so the true 2012
baseline is unreproducible. Scala 2.10.7 — the last of the 2.10 line,
and the earliest release that both runs on JDK 8 and compiles the
entire 2012 Scala tree unmodified (zero Scala source edits) — is the
minimal bridge.

The complete revival is five files:

- Scala jars (ProjectFortress/third_party/scala/): 2.9.0 compiler and
  library out, 2.10.7 compiler, library, and reflect in — same commit,
  no jar graveyards.
- build.xml: scala-version property 2.9.0 -> 2.10.7; scala-reflect jar
  added to scala.classpath (a new runtime dependency of the 2.10
  compiler); encoding="UTF-8" on the eight javac tasks. The trunk set
  no encoding and relied on a Latin-1-ish platform default; this
  container's default is ASCII, which rejects the non-ASCII bytes in
  Instantiater.java's comments. UTF-8 is correct: every source file is
  in fact valid UTF-8, and the old platform default merely mis-decoded
  comments. The tools.jar pathelement stays: on JDK 8 it is required
  (syntax_abstractions/rats/JavaC.java calls
  com.sun.tools.javac.Main.compile and every javac task has
  includeantruntime="false"); it is dropped at the JDK 11 rung, where
  it dangles harmlessly.
- bin/fortress_classpath: SV=2.10.7.
- FTypeTuple.java: pass the existing FType.listComparer to the two bare
  TreeSet constructors in meet/join. JDK 8's TreeMap invokes the
  comparator on the very first insert, so inserting a List<FType> into
  a natural-ordering TreeSet now throws ClassCastException (Lists are
  not Comparable); it happened to work on JDK 6/7 only because the
  first insert skipped the compare. Using the lexicographic
  ListComparer the neighboring memo table already uses preserves the
  2012 ordering semantics — deliberately not the everything-compares-
  equal wrapper type the 2018 migration introduced for the same crash.

Accounting for the 2018 migration's other hand-edits, so their absence
here is deliberate, not overlooked: the four "import xtc.parser.Module"
additions and the MethodInstantiater BCEL-import repoint are JDK 9+
material and land at the JDK 11 rung; its NamingCzar, NodeFactory,
STypeChecker, and TypeParser edits were whitespace, @Deprecated, or
warning cosmetics and are dropped. This commit carries no attribution
to that migration: the diff was derived independently and shares only
the 2.10.7 target version; the migration's real contribution —
demonstrating the project could be revived at all — is on the record in
research/authorship.md.

Known cosmetic debt, deliberately left for the classpath-SSOT commit:
bin/debugOpt, bin/fortress.bat, bin/fortress_leaks, and bin/runOptCollect
still name scala-*-2.9.0 jars — verified not gate-relevant (the test
targets use the compile.classpath refid, not those scripts).

Gate, all on JDK 8 (OpenJDK 1.8.0_492): ant clean compileAll green;
ant testFast 1,377 tests across 47 suites, 0 failures, 0 errors — fully
green; ant testSystem 382 tests, 7 failures, 0 errors — exactly the
seven known 2012-trunk failures (ParamRef, WordCountSmall, setMakerTest0,
LongStringTests, CovCollTest, FileConversion: the six System-api-
shadowing tests; realArith: the e-constant digit) and nothing else.
Both bug groups are fixed later in this history.
```

### B5 `1b21a090a` — gate line trimmed only

Changed: wall times dropped from the gate line; body untouched.

```
Drop -Xfuture from the 9 launcher scripts

The bin scripts that fork a JVM to run compiled Fortress code (run,
runOpt, runOptCollect, runCollect, debugOpt, BytecodeOptimize,
comp/frun, comp/rewrite, comp/tlink) all passed -Xfuture, the 2005-era
"force strictest class-file format checks, anticipating future
defaults" flag. Those strict checks stopped being "future" long ago:
they became the JVM default for classfiles of version 50 (V1_6) and up
-- exactly what Fortress emits -- so on every JDK this ladder targets
the flag adds nothing. It was deprecated in JDK 9 and removed in
JDK 25, where a forked JVM dies at startup with "Unrecognized option:
-Xfuture", killing every compiled-code test in testFast. Deleting it
now, while still on JDK 8, is behavior-neutral (the same checks apply
by default) and defuses that landmine before the ladder climbs.

Verified: these nine scripts are the only -Xfuture carriers in the
tree; the test targets reach the flag via bin/run's forked JVM, so the
suite exercises the change.

Gate (cheap, JDK 8): ant compileAll green; ant testFast 1,377 tests /
47 suites / 0 failures / 0 errors.
```

### B6 `f9eb1e814` — reworded

Changed: the first-ascent SHAs (fdd4a57c2, ef45a91ca) and "gated green
throughout the first ascent" removed — the target-pinning rationale now
states the JDK 11 failure mode directly; gate times dropped.

```
Normalize build.xml and make bin/fortress_classpath the classpath SSOT

build.xml:

- All eight javac tasks now pin source and target to
  ${javaSourceVersion}, bumped from 1.5 to 1.8. Before, three tasks set
  neither attribute (so javac silently defaulted to the running JDK's
  level) and five set only source=1.5. Pinning target as well pre-empts
  a real failure mode waiting at the JDK 11 rung: with target unpinned,
  javac 11 emits v55 classfiles whose invokedynamic string
  concatenation ASM 3.1's ClassReader cannot parse. 1.8 is the
  toolchain floor at this point of the ladder. Verified: javac output
  is now v52 classfiles.
- Jar names are derived from version properties where scala/asm jars
  are referenced: new scala-reflect.jar property replaces the one inline
  scala-reflect path (matching the existing compiler/library
  properties), and a new asm-version property feeds compile.classpath's
  asm-all jar. Future toolchain rungs edit one property per component.
  The stale "2.8.0 / 2.9.0RC1" comment over the Scala block is dropped.
- -Xlint:unchecked verified already consistent: active only in the two
  dedicated lint targets (compileLint, compileCommonLint), commented
  out elsewhere; left as-is.
- The tools.jar pathelement is deliberately untouched: still required
  on JDK 8 (syntax_abstractions/rats/JavaC.java calls
  com.sun.tools.javac.Main with includeantruntime="false"); it drops at
  the JDK 11 rung. Encoding attributes were already UTF-8.

bin scripts: debugOpt, fortress_leaks, and runOptCollect now delegate
their tool-jar lists to bin/fortress_classpath -- the single source of
truth that already served bin/fortress, run_classpath, and
BytecodeOptimize -- instead of each carrying a private copy. This
retires their stale scala-*-2.9.0 jar names (left behind by the Scala
2.10.7 revival commit; not gate-relevant, since the test targets use
build.xml's compile.classpath, but wrong), including debugOpt's and
runOptCollect's scala-library-{SV}.jar entries whose missing $ made
them literal nonsense paths. While in there:

- fortress_leaks gains bin/fortress's JAVA_FLAGS defaults and UTF-8
  file.encoding, plus a comment explaining what the script is for.
- runOptCollect's FORTRESS_HOME self-location is fixed: it stripped
  ${0%runOpt}, which never matches the script's own name, yielding a
  broken .../runOptCollectfortress_home invocation.
- debugOpt no longer prepends a redundant relative-path asm jar to its
  java -cp (the SSOT classpath carries the asm jar absolutely).

fortress.bat cannot source a bash script, so it keeps its own jar
list; its SV is bumped 2.9.0 -> 2.10.7 with a note to keep it in sync
with the SSOT. Residue: that one Windows-only duplicate, and
bin/fortress-old (a 2.8.0-era relic explicitly named -old), are the
remaining hardcoded jar lists in bin/.

Script smoke tests: bash -n clean on the three edited shell scripts;
bin/fortress and bin/fortress_leaks print Shell usage, bin/debugOpt
reaches CheckClassAdapter through the SSOT classpath, bin/runOptCollect
resolves FORTRESS_HOME and classpath and stops only at the absent Sun
Studio collect binary.

Gate (cheap, JDK 8): ant clean compileAll green; ant testFast 1,377
tests / 47 suites / 0 failures / 0 errors.
```

### B7a `1cdb900ca` — one line removed

Changed: only the "(re-apply of e700b442d from the working branch)"
line is dropped. The trunk SHA `5a68404` stays — it names a stable
pre-graft ancestor.

```
Fix System api shadowing: move compiler getProperty into CompilerSystem

The 2012-07-19 import (5a68404) added a minimal compiler-path api
System (getProperty only) to LibraryBuiltin, which precedes Library on
fortress.source.path — shadowing the interpreter's full api System and
breaking six interpreter system tests (ParamRef, WordCountSmall,
setMakerTest0, LongStringTests, CovCollTest, FileConversion) with
"FortressBuiltin.JavaString/StringVector is undefined". The two worlds
cannot share one api name: the interpreter's System declares
args : ImmutableArray[\String,ZZ32\], and ImmutableArray does not
exist for the compiler (which is why the shadow api was created
instead of reusing Library/System.fsi).

Resolution: the compiler world gets getProperty through its own api.

- Delete LibraryBuiltin/System.fsi/fss (the shadow); the interpreter
  resolves api System to Library/System again, whose surface already
  includes getProperty.
- Add getProperty to Library/CompilerSystem.fsi/fss (foreign import of
  the same systemOps.getProperty native).
- hello.fss: import CompilerSystem.{args, getProperty} instead of
  System.getProperty + CompilerSystem.args.

Verified: all six failing interpreter tests pass; hello.fss compiles
and runs end-to-end on the bytecode compiler path with a cleanly
ordered cache (compile AnyType, CompilerBuiltin, CompilerLibrary,
CompilerAlgebra, CompilerSystem, then the program).
```

### B7b `3d94b13a8` — re-apply line removed, gate trimmed

```
Correct the e constant to the double nearest e

Library/Constants.fss pinned e : FloatLiteral = 2.7182818284590455,
hand-tuned (per its comment "exp(1.0)") to match Math.exp(1.0) on the
2012-era JDK, which returned a value 1 ulp above the correctly rounded
double for e. Modern JDKs (8+) compute exp(1.0) correctly rounded, so
realArith's assert(exp 1.0, e) failed. Use the correctly rounded value
2.718281828459045, which restores the test's intent (exp 1.0 = e; also
log e = 1.0) and is the mathematically right constant. Sole user of
the old literal was this definition.

Gate (JDK 8, full): ant clean compileAll green; testFast 1,377 tests /
47 suites / 0 failures / 0 errors; testSystem 382 tests / 0 failures /
0 errors. With this commit and the System-shadowing fix before it, all
seven failures the 2012 mainline ended with are gone — the first fully
green full suite on the pure trunk lineage.
```

### B8 `ebddd773a` — re-apply parenthetical removed; timings kept

Changed: the opening parenthetical (working-branch SHAs, excluded md
edits, B1 note) is dropped. The before/after timing table stays — the
speedup is the commit's point.

```
Speed up the test suite: single cache wipe, parallel tracks and shards

Two mechanisms, one commit:

1. Wipe the cache once per run, not once per suite. CompilerJUTest and
   LibraryJUTest each reset the shared repository cache in suite(), so
   every testFast run paid two cold library rebuilds. The per-suite
   resets are now gated on fortress.junit.reset (default true, so
   standalone suite runs are unchanged); the harness disables it and
   each track instead starts in a fresh private cache directory.

2. Parallelize: testFast runs as 4 tracks (the three big suites each
   dominate a track, everything else shares the fourth), testSystem as
   4 shards (FileTests honors -Dfortress.suite.shard=i/n over the
   sorted test list). The fastTrack/systemShard macrodefs fork each
   junit JVM with a private cache tree under ProjectFortress/test-caches,
   redirected via the fortress.caches sysproperty and the
   FORTRESS_CACHES environment variable, so tracks cannot corrupt each
   other or the tracked default_repository/caches; failures aggregate
   through the shared write-once tests.failed property. Enabling fixes:
   Shell.resetRepository wipes ProjectProperties.CACHES instead of the
   hardwired repository path, and bin/fortress_classpath,
   bin/run_classpath, bin/runOpt, bin/BytecodeOptimizeEverything.sh
   honor FORTRESS_CACHES with the tracked caches as default.

Safe because the gate proves green-before equals green-after: the full
suite was fully green on the parent commit and is fully green here,
with identical test totals — the harness changes how the tests are
scheduled and where their caches live, not what they test.

Full gate (JDK 8), before (parent commit) vs after (this commit):

  ant clean compileAll   1m15s  ->  1m14s   (unchanged, as expected)
  ant testFast          12m59s  ->  6m35s   1,377 tests / 47 suites / 0F / 0E
  ant testSystem         3m08s  ->  2m30s   382 tests / 0F / 0E
                                            (shards 97+97+97+96 files)
```

### R1 `a92f1b736` — gate trimmed only

```
Bump Scala from 2.10.7 to 2.12.20

One rung: 2.10.7 straight to 2.12.20, the final release of the
binary-compatible 2.12 line, which runs on JDK 8 through 21 and so
prepares the JDK 11 rung. No intermediate 2.12.x waypoint is needed —
the entire 2012 Scala tree compiles under 2.12 unmodified, with zero
source changes; only the toolchain wiring moves:

- Jars (ProjectFortress/third_party/scala/): scala-compiler, scala-library
  and scala-reflect 2.12.20 in, the 2.10.7 trio out;
  scala-parser-combinators_2.12-1.1.2 added. Parser combinators left the
  Scala standard library after 2.10, and this missing dependency was the
  entirety of what broke earlier 2.12 attempts: TypeParser.scala fails on
  scala.util.parsing and the cascade surfaces as misleading
  implicit-resolution errors in seemingly unrelated Scala sources.
- build.xml: scala-version property to 2.12.20, a
  scala-parser-combinators.jar property, and the jar added to
  scala.classpath (used by scalac and every compile/test classpath).
  The astGenerators scalac task drops addparams="-Ybuilder-debug:refined",
  a 2.9-era incremental-builder debug flag that 2.10 still tolerated but
  2.12 rejects as a bad option. The scalac ant task itself is unchanged —
  2.12 still ships scala.tools.ant.
- bin/fortress_classpath (the runtime classpath SSOT): SV to 2.12.20,
  plus scala-reflect (a runtime dependency since 2.12) and the
  parser-combinators jar. bin/fortress.bat's SV kept in sync per its
  header note.

Full gate on JDK 8, fully green: ant clean compileAll; testFast 1,377
tests / 47 suites / 0 failures / 0 errors; testSystem 382 tests /
0 failures / 0 errors. git status clean after the runs.
```

### R2 `9a2e947f7` — rewritten

Changed: subject loses "(rung R2)"; the re-apply/cherry-pick framing
(62dbd760b, fdd4a57c2, graft-overlay and B3/B6 notes) is gone — the
four changes are stated directly; gate trimmed.

```
Move to JDK 11

Everything the tree needs to build and run fully green on JDK 11:

1. Two 2012-era assumptions about JDK internals that moved:
   - InstantiatingClassloader's ClassLoadChecker delegates jdk.* to the
     system loader like sun.*: JDK 9 moved reflection's generated
     accessors to jdk.internal.reflect, and without the delegation
     Constructor.newInstance (Utility.makeFortressException, e.g.
     DivisionByZero) re-entered loadClass during MagicAccessorImpl
     superclass resolution -> IllegalAccessError (library_tests
     Integer3/Integer4).
   - FortressMethodAdapter drops non-standard class attributes when
     building native/* wrappers: JDK 11 classfiles carry
     NestHost/NestMembers, which ASM 3.1 copies as opaque bytes,
     leaving constant-pool indices dangling in the rewritten pool ->
     ClassFormatError on native/java/lang/Math (other_compiler_tests
     CompileMath). Wrappers only need the methods.

2. Drop the tools.jar pathelement from build.xml — JDK 9+ has no
   tools.jar; the reference dangled harmlessly but is dead.

3. Add explicit `import xtc.parser.Module;` to the four files that use
   Rats! Module via `import xtc.parser.*;` — InstrumentedParserGenerator,
   ParserMaker, RatsUtil, and parser_util's instrumentation Util. From
   JDK 9 on, unqualified `Module` is ambiguous against auto-imported
   java.lang.Module and javac rejects it.

4. Delete MethodInstantiater's unused
   com.sun.org.apache.bcel.internal.generic.INVOKEINTERFACE import —
   that JDK-internal BCEL copy is gone in JDK 11.

Full gate on JDK 11, fully green: ant clean compileAll; testFast 1,377
tests / 47 suites / 0 failures / 0 errors; testSystem 382 tests /
0 failures / 0 errors; git status clean afterwards.
```

### R3 `96c507c53` — reworded

Changed: subject loses "(rung R3)"; the re-derivation and
deviations-from-reference paragraph is gone; "the SSOT since B6" becomes
"the classpath SSOT"; gate trimmed.

```
Retire vendored jsr166y for java.util.concurrent

Ports both work-stealing runtimes — the interpreter's evaluator/tasks/*
and the compiled runtime's runtimeSystem/* — plus LocalRandom and the
FibTests benchmark harness from the 2007-era jsr166y fork-join backport
to the JDK's own java.util.concurrent (stdlib since JDK 7), and deletes
the vendored third_party/jsr166y jar.

The 2012 code was written against late jsr166y, which is API-identical
to j.u.c. except for three deltas, each handled explicitly:

- ForkJoinPool has no (int, factory) constructor in j.u.c.; both
  FortressTaskRunnerGroup classes now call the 4-arg form
  (parallelism, factory, null handler, asyncMode=false — the same
  defaults jsr166y's 2-arg constructor filled in).
- ForkJoinTask.helpJoin() no longer exists. j.u.c. join() already
  helps (runs queued subtasks when called from a worker thread), so
  runtimeSystem/BaseTask.joinOrRun() now always join()s and the
  FORTRESS_HELP_JOIN env flag (default off) becomes a no-op; the two
  helpJoin FibTests benchmark variants likewise join(). All other used
  API (RecursiveAction, ForkJoinWorkerThread subclassing, fork/join,
  inForkJoinPool, getSurplusQueuedTaskCount, tryUnfork, getPool,
  pool.invoke/execute, ThreadLocalRandom.current) is unchanged.
- CodeGen emitted the pool-invoke call in generated main() with a
  jsr166y descriptor; it now emits
  (Ljava/util/concurrent/ForkJoinTask;)Ljava/lang/Object; — the exact
  erasure of j.u.c. ForkJoinPool.invoke. Previously compiled jars in
  bytecode_cache are stale after this change (cache wipe handles it).

j.u.c. join()'s helping behavior also exposes an STM hazard jsr166y's
blocking join masked: generated task compute() bodies point the worker
thread's current-task field at themselves (BaseTask.setTask) and never
restore it, and every transaction static (startTransaction, TXRead, ...)
resolves the current transaction through that field. A helping join()
can run unrelated queued tasks on the joining thread, leaving the field
pointing at a foreign task and corrupting transaction state in the
joiner's continuation (nestedTransactions1/2 flaked ~30% per run
without this). Fix, included with the port rather than as a chaser:
BaseTask.joinOrRun saves and restores the runner's task field across
join(), mirroring the interpreter's existing setCurrentTask restore
after TupleTask.invokeAll in Evaluator (the 2008-era code already knew
this invariant).

Also dropped: the jsr166y. delegation entry in
InstantiatingClassloader's ClassLoadChecker (j.u.c. is covered by the
java. prefix), the jar's property and pathelement in build.xml, its
classpath entries in bin/fortress_classpath (the classpath SSOT; the
delegating scripts need no edit), bin/fortress.bat, bin/fortress-old,
and the NetBeans project file, plus the syntax-abstractions JavaC
helper's unused import.

Full gate on JDK 11, fully green: ant clean compileAll; testFast 1,377
tests / 47 suites / 0 failures / 0 errors; testSystem 382 tests /
0 failures / 0 errors; git status clean afterwards.
```

### R4 `d4698e811` — **proposed: DROP**

The JDK 17 and JDK 21 verification records move to tags `ladder/jdk17`
and `ladder/jdk21` on R3's commit (section 4). If kept instead, the
rewrite would be the current text minus "(rung R4)", the first-ascent
reference "(7f71d3278)", and wall times.

### R5 `0d62594b4` — reworded

Changed: subject loses "(rung R5)"; first-ascent references (2f1fdbf2e,
"same jars as the first ascent", the whole differences paragraph)
removed; gate trimmed.

```
Upgrade ASM 3.1 to 9.10.1

Replaces the vendored asm-all-3.1.jar with the four ASM 9.10.1 modules
(asm, asm-util, asm-tree, asm-analysis, each with its -sources jar;
SHA-1s verified against Maven Central; asm-commons is not needed - the
only thing Fortress used from it was EmptyVisitor, gone in ASM 4+).

The ASM 4+ API turned the visitor interfaces into abstract classes with
(int api[, delegate]) constructors and made every ClassWriter.visit*
method final, so the 17 touched sources fall into a few patterns:

- ClassAdapter/MethodAdapter/implements-XVisitor -> extends
  ClassVisitor/MethodVisitor/FieldVisitor/AnnotationVisitor with
  super(Opcodes.ASM9[, delegate]): Instantiater, MethodInstantiater,
  FortressMethodAdapter, FortressForeignAdapter, ByteCodeVisitor,
  ByteCodeMethodVisitor, ByteCodeFieldVisitor, ByteCodeAnnotationVisitor
  (in the asmbytecodeoptimizer package the ASM9 constant is fully
  qualified: the package's own Opcodes class shadows ASM's).
- ManglingClassWriter can no longer subclass ClassWriter (final visit*
  methods), so it is now a ClassVisitor delegating to a private
  FortressClassWriter subclass that keeps the load-bearing
  getCommonSuperClass fallback; toByteArray() forwards. Signatures that
  accepted these writers as ClassWriter (InstantiatingClassloader.
  forwardingMethod x3, CodeGen.functionalForwardingMethod, VarCodeGen
  task-var constructors x4) now take ClassVisitor - they only ever
  called visitMethod/visitField.
- TraceMethodVisitor is final and its text moved to a Printer:
  CodeGenMethodVisitor now wraps a TraceMethodVisitor around a Textifier
  it owns (getText() kept for CodeGen), and the two trace sites in
  ManglingMethodVisitor read ((TraceMethodVisitor) mv).p.getText().
- EmptyVisitor (removed): anonymous new MethodVisitor(ASM9){} /
  new AnnotationVisitor(ASM9){} stand-ins.
- util.AbstractVisitor's OPCODES table moved to util.Printer.OPCODES.
- visitMethodInsn grew a 5th "itf" argument in overrides; the ~195
  4-arg emit call sites are left as-is because ASM 9's deprecated 4-arg
  forwarder passes itf = (opcode == INVOKEINTERFACE) on the same object,
  which is behavior-identical for every Fortress emit. The four
  overrides re-signed to 5 args pass itf through, and
  MethodInstantiater recomputes itf from the possibly rewritten opcode
  (its INVOKEINTERFACE -> INVOKESTATIC/INVOKEVIRTUAL retargeting).
  The optimizer's MethodInsn node carries the flag (6-arg constructor
  defaults it from the opcode, so synthesized INVOKESTATIC/VIRTUAL
  calls in AddString/DefUseChains/RemoveLiteralCoercions are unchanged).
- FortressMethodAdapter keeps dropping nest attributes in the rewritten
  native wrappers: ASM 9 surfaces NestHost/NestMembers as first-class
  visitNestHost/visitNestMember events, so those are now no-ops
  alongside the earlier visitAttribute no-op.

Emitted classfile version stays V1_6 and -source/-target stay 1.8 this
rung; raising them is now unblocked (ASM 9 parses through v69).

Classpath updates: build.xml compile.classpath (via its asm-version
property, bumped 3.1 -> 9.10.1), bin/fortress_classpath,
bin/fortress.bat, ProjectFortress/test, ProjectFortress/testText,
.classpath, DOT_idea/libraries/asm.xml. No asm-3.1 references remain
anywhere in the tree.

Full gate on JDK 21, fully green: ant clean compileAll; testFast 1,377
tests / 47 suites / 0 failures / 0 errors; testSystem 382 tests /
0 failures / 0 errors; working tree clean after all runs.
```

### R6 `4d00c4738` — reworded

Changed: subject loses "(rung R6)"; first-ascent jar/license/deviation
notes removed or restated plainly; gate trimmed.

```
Upgrade Scala 2.12.20 to 2.13.18

Build: Scala 2.13 no longer ships the scala.tools.ant tasks (the <scalac>
task and antlib.xml are gone from scala-compiler.jar), so build.xml's
<scalac> invocations are replaced by driving scala.tools.nsc.Main
directly via <java fork="true"> with an @argfile; joint Java+Scala
compilation is preserved by feeding scalac the .java sources too (it
reads their signatures, emits nothing; the javac step that follows
compiles them as before). The astGenerators <scalac> call was a no-op
(zero .scala files in the astgen source dir) and is retired with a
comment.

Source migration (9 files under scala_src/, all mechanical):
- JavaConversions (removed in 2.13) -> scala.jdk.javaapi.CollectionConverters
  in Lists, Maps, Sets, Iterators, ASTGenHelper (1:1 call swaps).
- OverloadingChecker: mapValues returns a lazy MapView in 2.13 ->
  .view.mapValues{...}.toMap to keep the strict Map the caller expects.
- TraitTable: Iterable.iterator is parameterless in 2.13 -> drop the
  empty parens on the override.
- STypesUtil, TypeParser: postfix operator syntax is an error in 2.13 ->
  sparams.contains(_) and """...""".r at the 4 sites.

Jars: vendored scala-{library,compiler,reflect}-2.13.18 and
scala-parser-combinators_2.13-1.1.2 (SHA-1s verified against Maven
Central); removed the 2.12.20 triple and parser-combinators_2.12-1.1.2.
THIRDPARTYLICENSEREADME.txt notes the active Scala toolchain is
Apache-2.0, with a historical-reference note for the retired jars.

Scripts/IDE: SV bumped to 2.13.18 in bin/fortress_classpath (the
classpath SSOT) incl. parser-combinators _2.13, and in bin/fortress.bat;
SCALAVER 2.7.4 -> 2.13.18 in ProjectFortress/test and
ProjectFortress/testText; DOT_idea/libraries/scala.xml points at the
2.13.18 set.

Full gate on JDK 21, fully green: ant clean compileAll; testFast 1,377
tests / 47 suites / 0 failures / 0 errors; testSystem 382 tests /
0 failures / 0 errors; working tree clean after all runs.
```

### R7 `18178fa5c` — **proposed: DROP**

The JDK 25 verification record (gate green on 25.0.3 with zero changes,
on the Scala 2.13 tree) moves into the `ladder/scala-2.13` tag message
(section 4). If kept instead: current text minus "(rung R7)", the
first-ascent SHAs (864383af4, 13b5a92d1) — restated as "the launcher
scripts' -Xfuture flag, which JDK 25 removes, was already deleted
earlier in this history" — and wall times.

### R8 `27aab6a85` — reworded

Changed: "Decision by Pavol" and the first-ascent deviation note
removed; the intermediate-rung sentence now points at the `ladder/*`
tags; gate trimmed (warning inventory kept — it documents the warning
retired here).

```
Raise javac -source/-target from 1.8 to 25

Flip the single javaSourceVersion knob in build.xml (feeds source= and
target= of all 8 javac tasks) from 1.8 to 25 — the latest LTS. Every
intermediate rung remains in this history (tagged ladder/*) for anyone
who needs an older compilation floor. This also retires javac's
"source/target value 8 is obsolete" warning.

Emitted Fortress classfiles are untouched and stay V1_6 - raising them
is bundled with future bytecode-compiler work, since it requires
stack-map frame generation through the class-rewriting pipeline.

Full gate on JDK 25, fully green: ant clean compileAll, with the
obsolete-source warnings gone (remaining warnings unchanged: 10 javac
dep-ann/removal, 163 scalac deprecations); testFast 1,377 tests /
47 suites / 0 failures / 0 errors; testSystem 382 tests / 0 failures /
0 errors; working tree clean after all runs.
```

### C1 `1871c3c02` — unchanged

`Note in the README that the build runs on modern JDKs`

## 4. Proposed `ladder/*` tags

Annotated tags, created on the final (post-C2) SHAs, pushed from
Pavol's machine (`git push --tags`). Targets are named by rung here
since every SHA churns. "Floor" = the minimum JDK that builds and runs
that commit; the tag name records the JDK the full gate ran on, so
`git checkout ladder/jdkN` is always a verified state for JDK N. All
gates are `ant clean compileAll` + `testFast` (1,377 tests / 47 suites)
+ `testSystem` (382 tests), zero failures, zero errors, clean tree —
abbreviated below as "full gate green".

| Tag | Points at | Floor | Toolchain |
|---|---|---|---|
| `ladder/jdk8-baseline` | B8 (test speedup) | JDK 8 | Scala 2.10.7, ASM 3.1, jsr166y |
| `ladder/scala-2.12` | R1 | JDK 8 | Scala 2.12.20 |
| `ladder/jdk11` | R2 | JDK 11 | Scala 2.12.20 |
| `ladder/jdk17` | R3 | JDK 11 | + j.u.c. runtime |
| `ladder/jdk21` | R3 | JDK 11 | + j.u.c. runtime |
| `ladder/asm-9` | R5 | JDK 11 | ASM 9.10.1 |
| `ladder/scala-2.13` | R6 | JDK 11 | Scala 2.13.18 |
| `ladder/jdk25` | R8 | JDK 25 | -source/-target 25 |

Proposed tag messages:

- **`ladder/jdk8-baseline`** — "The revived 2012 trunk, fully green on
  JDK 8, with the parallelized test harness. Toolchain floor: JDK 8;
  Scala 2.10.7, ASM 3.1, vendored jsr166y. Full gate green on OpenJDK
  1.8.0_492."
- **`ladder/scala-2.12`** — "Scala 2.12.20 rung. Toolchain floor:
  JDK 8. Full gate green on JDK 8."
- **`ladder/jdk11`** — "JDK 11 rung. Toolchain floor: JDK 11 (tools.jar
  dependency removed; jdk.internal.reflect delegation and nest-attribute
  handling added). Full gate green on JDK 11."
- **`ladder/jdk17`** — "JDK 17 verification. Zero changes needed on top
  of the java.util.concurrent rung: after the jsr166y retirement no
  JDK-version coupling remains. Toolchain floor: JDK 11. Full gate
  green on JDK 17 (17.0.19)." *(carries R4's record)*
- **`ladder/jdk21`** — "JDK 21 verification, zero changes needed (see
  ladder/jdk17). Toolchain floor: JDK 11. Full gate green on JDK 21
  (21.0.10)." *(carries R4's record)*
- **`ladder/asm-9`** — "ASM 9.10.1 rung. Toolchain floor: JDK 11.
  Full gate green on JDK 21."
- **`ladder/scala-2.13`** — "Scala 2.13.18 rung. Toolchain floor:
  JDK 11. Full gate green on JDK 21, and verified again fully green on
  JDK 25 (25.0.3) with zero changes." *(carries R7's record)*
- **`ladder/jdk25`** — "JDK 25 rung: javac -source/-target 25.
  Toolchain floor: JDK 25. Full gate green on JDK 25 (25.0.3). For an
  older compilation floor, use an earlier ladder/* tag."

The README's ladder section then needs only the settled stable line
("each modernization rung is tagged `ladder/*`; pick the newest tag
whose toolchain floor fits your JDK") plus optionally this table.

Open choice: `ladder/jdk17`/`ladder/jdk21` point at the same commit, as
do `ladder/scala-2.13`'s two verification records. If two tags on one
commit feels redundant, `ladder/jdk21` alone could carry both records —
but the symmetric set makes "checkout the tag named after your JDK"
work without explanation.

## 5. Execution sequence (after Pavol's confirmation)

1. Pavol reviews this document; edits/approves the messages, the
   R4/R7 drops, and the tag set.
2. Replay clean-ladder onto the same base with the approved messages,
   skipping R4 and R7. Trees are untouched, so no re-gate; verification
   is `git diff <old-tip> <new-tip>` empty and a commit-count/subject
   audit.
3. Force-push clean-ladder — **only on Pavol's explicit authorization**
   (standing rule).
4. Create the annotated tags on the final SHAs (coordinator, locally);
   Pavol pushes them from his machine (`git push --tags`).
5. Branch rename to `main` — Pavol's, via GitHub.
6. Tick C2 and the tag step in rebuild-plan.md; the backup branches
   (`presquash-backup`, `pre-b1squash-backup`, `pre-b4drop-backup`)
   become deletable whenever Pavol is satisfied.
