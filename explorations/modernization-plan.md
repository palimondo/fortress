# Modernization plan (approved 2026-08-19)

Approved by Pavol (@palimondo) 2026-08-19: "Continue autonomously. Delegate to
workers where it makes sense." This document is the durable statement of the
plan, the working rules, and the in-flight state — written so a fresh or
compacted session can resume without the conversation history. Read alongside
root `CLAUDE.md` and `explorations/repo-internals.md`.

## Standing orders

- **The gate**: a rung is done only when `ant testSystem` (382/382) and
  `ant testFast` (zero failures) are both green on a clean build
  (`ant clean && ant compileAll`, wipe `default_repository/caches/*` before
  suites). Environment: `JAVA_HOME` set per rung, `unset JAVA_TOOL_OPTIONS`,
  `FORTRESS_HOME=<repo root>`.
- **Commit and push as you go** to branch `claude/handover-reading-vn8zgr`;
  after each *gated* rung, fast-forward `main`
  (`git push origin claude/handover-reading-vn8zgr:main`).
- **Edits under the original Fortress tree** (anything outside
  `explorations/`, `research/`, docs): make them when the task requires, but
  flag them explicitly to Pavol in the report — rule agreed after the
  System-api fix.
- Generated-source churn: **fixed 2026-08-21** in two steps. (1) 3c4dcdabc
  removed build timestamps from ASTGen node headers and Rats! parser
  headers. (2) Its "two builds byte-identical" proof turned out incomplete:
  a later clean build re-shuffled the `combine*` helper order in the five
  `*CollectingVisitor.java` files — `CollectingVisitorGenerator` emitted
  them by iterating a `HashMap<TypeName,String>` entrySet, whose order
  varies between JVM runs (the original proof's second build evidently
  reproduced the same hash order by luck). Fixed by sorting entries by
  type name at emission; re-proven with two regenerations that were each
  verified (via the build log's "Moving 1071 files") to have actually
  re-run ASTGen. A clean build must leave the working tree untouched; if
  generated files show as modified again, that is a regression to
  investigate, not noise to revert.
  Archaeology: the timestamp was a CVS-era accident — ASTGen (Rice, 2003)
  put a build date in the `@version` javadoc slot where hand-written
  sources carried `$Id$` CVS keywords, assuming generated files would
  never be checked in; Fortress checked them in from 2007 on without
  revisiting that. Four emitters: three in-repo (TemplateGapClass,
  EllipsesNode, TransformationNode — edited directly) plus
  edu.rice.cs.astgen.NodeClass inside the vendored astgen.jar and
  xtc.util.Tool for Rats! (both normalized by post-generation
  `<replaceregexp>` steps in build.xml rather than forking the jars).
- One variable per step; when a suite is running, do not touch `build/`,
  caches, or `build.xml`.

## The ladder (rungs in order; each gated)

1. ~~Scala 2.10.7 → 2.12.5~~ DONE (commit 22c059ef5; the whole 2012 blocker
   was the missing scala-parser-combinators jar).
2. ~~Scala 2.12.20~~ DONE (flip ac517a5ce; gate green 2026-08-19:
   testSystem 382/0 in 2m19s, testFast 0 failures in 13m39s).
3. ~~JDK 11~~ DONE (gate green 2026-08-19: testSystem 382/0, testFast 0).
   Three fixes were needed, all JDK-internals drift, none in tools.jar as
   predicted: (a) build.xml javac tasks never set `target=` → v55 bytecode
   with indy string-concat that ASM 3.1 can't parse (fdd4a57c2);
   (b) ClassLoadChecker didn't delegate `jdk.*` → IllegalAccessError on
   JDK 9+ reflection accessors (62dbd760b); (c) FortressMethodAdapter
   copied NestHost/NestMembers with dangling cp indices into native/*
   wrappers → ClassFormatError (62dbd760b). Details: repo-internals.md.
4. ~~UTF-8~~ DONE (5f2461096; gate green 2026-08-19: testSystem 382/0,
   testFast 0 failures in 13m54s). No transcoding was needed — iconv
   shows every .java/.scala is already valid UTF-8; the ISO-8859-1
   attributes merely mis-decoded a handful of comments (all non-ASCII
   bytes are comments-only, audited). Flipped build.xml's 8 javac tasks
   to explicit `encoding="UTF-8"`. Note: 8 vendored `org/apache/bcel`
   files carried 23 literal U+FFFD mojibake characters in comments
   (StackMap, ObjectType, ReturnaddressType, ReferenceType, Const,
   InstConstraintVisitor, Pass2Verifier, GraphicalVerifier). Provenance
   established 2026-08-21: the corruption is *upstream Apache's own* —
   the released bcel-6.2 and even bcel-6.10.0 sources jars carry the
   identical U+FFFD bytes, so pluckyporcupine vendored it faithfully and
   Apache never fixed it. Fixed here (Pavol, 2026-08-21): the 17 `�`
   preceding JVMS/vmspec section numbers restored to `§`; the 6 in
   GraphicalVerifier's German comments (JBuilder GUI-designer
   boilerplate, auto-generated in German locale by the JustIce author's
   IDE, describing plain Swing `pack()`/`validate()` calls — about GUI
   window frames, not JVM stack frames) removed as non-actionable noise
   along with the third, undamaged German line (`Das Fenster
   zentrieren`).
5. ~~Retire jsr166y~~ DONE (2ed045233 port + bf23583ad STM fix; gate
   green 2026-08-19: testSystem 382/0 in 141s, testFast 0 failures in
   13m55s). Ported 13 sources + build.xml + 6 bin scripts + nbproject to
   `java.util.concurrent`, deleted `third_party/jsr166y/`. Three API
   deltas: no `ForkJoinPool(int, factory)` ctor → 4-arg form; no
   `helpJoin()` → `join()` (helps from worker threads, so
   `FORTRESS_HELP_JOIN` is now a no-op); CodeGen's emitted
   `ForkJoinPool.invoke` descriptor changes package only. **Trap
   found the hard way**: j.u.c. `join()` *helps* (runs other queued
   tasks on the joining thread) where jsr166y's default join blocked
   with compensation threads — generated task `compute()` bodies set
   the worker's current-task pointer and never restore it, and the
   compiled runtime's STM statics resolve the current transaction
   through that pointer, so helping corrupted transaction state
   (nestedTransactions1/2 failed ~30% of standalone runs: escaped
   TransactionAbortException, non-rolled-back writes). Fix: save/
   restore the pointer across `join()` in `runtimeSystem/BaseTask.
   joinOrRun`, mirroring the interpreter Evaluator's existing
   `setCurrentTask(currentTask)` restore after `TupleTask.invokeAll`.
6. ~~JDK 17, then 21~~ DONE (gate green on each, 2026-08-19: testSystem
   382/0, testFast 0 failures across 47 suites on JDK 17.0.19 and again
   on JDK 21.0.10). **Zero source changes needed** — the jsr166y
   retirement (rung 5) was the last JDK-version coupling. New on 21:
   javac warns `source/target value 8 is obsolete`; stays until the
   ASM 9 rung lets -source/-target rise.
7. ~~ASM 3.1 → 9.10.1~~ DONE (2f1fdbf2e code + docs commit; gate green
   2026-08-19: compileAll 47s, testSystem 382/0 in 2m10s, testFast 0
   failures in 13m34s, all on JDK 21). Compiler-path smoke also green
   (library chain + hello.fss compile/run through the ASM 9 pipeline).
   17 Java sources edited + build.xml, 4 bin scripts, test/testText,
   .classpath, DOT_idea library, THIRDPARTYLICENSEREADME. Vendored
   asm/asm-util/asm-tree/asm-analysis 9.10.1 (+sources, SHA-1 verified);
   asm-commons not needed (only EmptyVisitor was used — replaced with
   ASM 9 idioms). API migration patterns and traps, for the record:
   visitor interfaces → abstract classes with `(int api[, delegate])`
   ctors; ClassAdapter/MethodAdapter gone; ClassWriter's visit* are
   final, which forced ManglingClassWriter to become a ClassVisitor
   delegating to an internal ClassWriter (getCommonSuperClass fallback
   kept on a nested subclass) — call sites that took `ClassWriter`
   params were retyped to `ClassVisitor` (CodeGen, VarCodeGen,
   InstantiatingClassloader — verified bodies only call
   visitMethod/visitField); TraceMethodVisitor is final with text on a
   Printer, so CodeGenMethodVisitor wraps one and re-exposes getText();
   **gotcha**: Fortress's own `asmbytecodeoptimizer.Opcodes` shadows
   `org.objectweb.asm.Opcodes` inside that package — ASM constants
   there must be written fully qualified; 4-arg visitMethodInsn emit
   sites (~195) left as-is (the deprecated forwarder computes `itf`
   correctly on the same object), only genuine overrides re-signed to
   5-arg. Emitted classfile version stays V1_6 and -source/-target stay
   1.8 this rung — ASM 9 *unblocks* raising both as a later step.
8. ~~**Scala 2.13 evaluation**~~ DONE 2026-08-19 — the feared "collections
   rewrite across 75 scala_src files" turned out to be ~20 source sites in
   9 files (pre-migration survey found no Stream/Traversable/CanBuildFrom/
   breakOut/symbol-literal usage anywhere, and no Java↔Scala collection
   crossing). Toolchain now **Scala 2.13.18** + parser-combinators_2.13
   1.1.2 (Apache-2.0; license README updated). Migration patterns:
   `JavaConversions` (removed) → `scala.jdk.javaapi.CollectionConverters.
   asScala(...)` 1:1 (Lists/Maps/Sets/Iterators/ASTGenHelper);
   `mapValues` → `.view.mapValues{...}.toMap` (OverloadingChecker);
   parameterless `Iterable.iterator` override loses its `()` (TraitTable);
   postfix operators are now errors — 4 sites fixed directly
   (STypesUtil `filterNot (xs.contains(_))`, TypeParser `""".r`) rather
   than enabling `-language:postfixOps`. Build: Scala 2.13 dropped the
   `scala.tools.ant` tasks entirely (verified against both jars), so
   build.xml now invokes `scala.tools.nsc.Main` via `<java fork="true">`
   with an @argfile; joint Java+Scala compilation preserved by feeding
   scalac the .java sources for signatures. The astgen `<scalac>` call was
   a no-op (zero .scala files there) and is retired. Gate on JDK 21:
   compileAll 46 s, testSystem 382/0/0 (2 m 15 s), testFast 0 failures
   (13 m 42 s), 1,759 junit tests total, 0 UNEXPECTED. Commit 668e689f7
   (+ docs). Follow-up cleanup: the 2.9.0/2.10.7/2.12.5-era graveyard
   jars were removed from third_party/scala (only the 2.13.18 toolchain
   + parser-combinators_2.13 remain). `bin/fortress_leaks` had been dead
   since rung 7 (it hard-coded scala-2.9.0 and asm-3.1 jars); revived
   2026-08-21 (Pavol's call) by delegating its classpath to
   `bin/fortress_classpath`, mirroring `bin/fortress`, keeping its one
   difference: `-Dfortress.test.leaks=t`. `bin/fortress-old` (2.8.0-era)
   stays dead intentionally.

9. ~~JDK 25~~ DONE (gate green 2026-08-21: compileAll 46 s, testSystem
   382/0/0 in 2 m 05 s, testFast 0 failures across 1,759 junit tests, all
   on JDK 25.0.3; interpreter and fortress_leaks smokes green). One fix
   needed (13b5a92d1): **JDK 25 removed the `-Xfuture` JVM flag**
   (deprecated since JDK 9), so every compiled-test `run` phase — which
   forks a fresh JVM through `bin/run` — died at startup with
   `Unrecognized option: -Xfuture` (223 testFast failures; testSystem was
   unaffected because the interpreter runs in-process). `-Xfuture`
   ("force strictest class-file format checks") is semantically obsolete:
   the strict checks it enabled became the JVM default for classfiles
   ≥ V50. Removed from all 9 launcher scripts (bin/run, runOpt,
   runOptCollect, runCollect, debugOpt, BytecodeOptimize, comp/frun,
   comp/rewrite, comp/tlink). Zero source or build.xml changes.

**The ladder is complete.** All rungs gated green, through JDK 25. Remaining
project goals (complex numbers, bytecode-compiler completion — including
the now-unblocked raise of -source/-target and emitted classfile version —
research corpus, spec build) proceed from this toolchain.

Cross-cutting: **GitHub Actions CI** — **ON HOLD until after the
modernization ladder** (Pavol, 2026-08-19). The session's GitHub App token
lacks `workflows` permission (both git push and the contents API 403), so
the workflow must be pushed from Pavol's machine. The ready-to-use workflow
file is parked at `explorations/ci/gate.yml`; to activate, move it to
`.github/workflows/gate.yml` and bump its JDK to the then-current rung.

Delegation: use background workers/subagents for parallelizable read-only
work (surveys, triage of large error logs, doc drafts); keep build/test/
commit actions in the main session to avoid cache and working-tree races.

## State snapshot (2026-08-21, after rung 9 — ladder complete)

- Branches: `main` (default) and working branch
  `claude/handover-reading-vn8zgr` both at the JDK 25 rung tip,
  pushed. Final ladder toolchain: **JDK 25 + Scala 2.13.18, UTF-8,
  stdlib ForkJoin, ASM 9.10.1** (JDK 8/11/17/21 all still gated green;
  -source/-target stay 1.8 and emitted classfiles stay V1_6, but ASM 9
  unblocks raising both — the -source/-target raise is the approved next
  rung; the V1_6 raise stays bundled with bytecode-compiler work since
  it needs stack-map frame generation through the rewriting pipeline).
  Next up: activate CI (Pavol), then post-ladder goals.
  `master` deleted. Old hg-era branches surveyed (12 branches; only `John`
  and `bird_count` have zero unique commits). **Decided** (Pavol,
  2026-08-19): historical branches stay as they are — no tagging, no
  pruning. Closed.
- Suite history: JDK 8 + Scala 2.10.7 fully green after two fixes
  (System-api shadowing e700b442d, e-constant 36d160799 — details in
  `test-baseline-jdk8.md`); fully green on every rung since, through
  JDK 25 + Scala 2.13.18 + ASM 9.10.1.
- Both execution paths work; compiler path needs the ordered library compile
  recipe (`repo-internals.md`).
- Research corpus: `research/README.md` (committed index),
  `research/extracts/` (committed notes), `research/decks/` gitignored —
  PDFs must be re-uploaded by Pavol per session (JuliaCon 2016 deck was
  uploaded and extracted; Four Solutions slides don't exist on the open web).
- Later project goals beyond modernization: complex numbers (§4d roadmap in
  the handover; seed `explorations/complex_ring.fss`), bytecode-compiler
  completion, Steele corpus growth, Specification LaTeX build (untested).

## Conventions

- Docs: `CLAUDE.md` = terse quick reference; `repo-internals.md` = living
  deep mechanics (extend it when new techniques are learned); dated reports
  (like `test-baseline-jdk8.md`) get postscripts, not rewrites.
- Commit messages carry the full reasoning (they are the project log);
  attribution footer `Co-Authored-By: Claude <noreply@anthropic.com>`; no
  model identifiers in committed artifacts.
- HANDOVER.md and uploaded ZIP contents stay uncommitted.
