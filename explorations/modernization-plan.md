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
- Generated-source churn (regeneration timestamps in `nodes/`, parser,
  `FortressAst*`, `Operators.java`): revert, never commit.
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
   to explicit `encoding="UTF-8"`. Note: 7 vendored `org/apache/bcel`
   files carry pre-existing literal U+FFFD mojibake in comments
   (StackMap, ObjectType, ReturnaddressType, ReferenceType,
   InstConstraintVisitor, Pass2Verifier, GraphicalVerifier) — damage was
   committed to the tree long ago, left as-is pending Pavol's call.
5. **Retire jsr166y** — port `runtimeSystem/` from the vendored 2007
   fork-join backport (`third_party/jsr166y`) to `java.util.concurrent`
   (ForkJoin is stdlib since JDK 7). Deletes a vendored lib; touches the
   heart of the work-stealing runtime — good archaeology, needs care.
6. **JDK 17, then 21** — after rung 5, expect incidental breakage only.
7. **ASM 3.1 → 9.x** — the big refactor (`CodeGen.java` & friends use ASM 3
   API heavily). Prerequisite for raising -source/-target above 8 and for
   the Fortress compiler to emit newer than V1_6 bytecode. Gateway to
   bytecode-compiler work (project goal #4).
8. **Scala 2.13 evaluation** — real source migration (collections rewrite
   across the 75 scala_src files); re-evaluate cost/benefit at that point.

Cross-cutting: **GitHub Actions CI** — **ON HOLD until after the
modernization ladder** (Pavol, 2026-08-19). The session's GitHub App token
lacks `workflows` permission (both git push and the contents API 403), so
the workflow must be pushed from Pavol's machine. The ready-to-use workflow
file is parked at `explorations/ci/gate.yml`; to activate, move it to
`.github/workflows/gate.yml` and bump its JDK to the then-current rung.

Delegation: use background workers/subagents for parallelizable read-only
work (surveys, triage of large error logs, doc drafts); keep build/test/
commit actions in the main session to avoid cache and working-tree races.

## State snapshot (2026-08-19, after the UTF-8 rung)

- Branches: `main` (default) and working branch
  `claude/handover-reading-vn8zgr` both at the UTF-8 rung tip
  (build.xml `encoding="UTF-8"`, 5f2461096 + doc update), pushed.
  Current rung's toolchain: **JDK 11 + Scala 2.12.20, UTF-8** (JDK 8
  still works too; -source/-target stay 1.8). Next up: rung 5,
  retire jsr166y.
  `master` deleted. Old hg-era branches surveyed (12 branches; only `John`
  and `bird_count` have zero unique commits). **Decided** (Pavol,
  2026-08-19): historical branches stay as they are — no tagging, no
  pruning. Closed.
- Suite history: JDK 8 + Scala 2.10.7 fully green after two fixes
  (System-api shadowing e700b442d, e-constant 36d160799 — details in
  `test-baseline-jdk8.md`); 2.12.5 fully green; 2.12.20 gate in flight.
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
