# Clean-ladder rebuild plan

Status: **approved for execution** (Pavol, 2026-08-22); independently
adversarially reviewed 2026-08-22, all findings folded in. This file is the
execution contract: it is written to be executable cold, after any number
of context compactions or container losses, by reading this file alone plus
the referenced commits.

## Goal

Replace the first ascent — pluckyporcupine's graft overlay plus the 63
revival commits on top of it — with a curated linear history built directly
on the pure 2012 trunk. Each modernization rung is one gated commit whose
message carries the full reasoning. The new branch is `clean-ladder`
(temporary name; Pavol renames it to `main` via the GitHub UI when done).
The current working branch `claude/handover-reading-vn8zgr` is untouched and
keeps the full first-ascent record.

Primary sources this plan distills:

- `explorations/modernization-plan.md` § "Clean-ladder rebuild: hindsight
  ordering (2026-08-21)" — the lessons and the first-draft ordering.
- The working branch's commit history (all hashes below are on
  `claude/handover-reading-vn8zgr`, tip `3595f511d` at time of writing;
  63 commits in `a874948ac..3595f511d`, every one either transplanted,
  re-executed, or deliberately left behind by this plan).
- Branch `spike/scala-upgrade`, single commit `73f598202` on top of
  `a874948ac` — the executed de-risking spike for B3 (2026-08-23): the
  exact five-file revival diff, gated where it lands (testFast 1,377
  tests / 47 suites fully green; testSystem 382 tests with exactly the
  seven known 2012 failures). B3 re-lands this commit.

## Decisions already made by Pavol (do not re-litigate)

- Branch name `clean-ladder`, pushed to `origin clean-ladder`. Temporary;
  renamed to `main` later by Pavol.
- Exhibit block **first**, ladder after. The kickoff commit is a README
  whose only ladder-dependent sentence is deferred to a closing amendment.
- **No CI in the base block.** CI stays a goal on the working branch only
  (`explorations/ci/gate.yml` parked; Pavol pushes it much later — token
  lacks `workflows` scope). This deliberately overrides the hindsight
  section's item 10 / rung 0.9.
- The test-suite speedup (working-branch commits `4b1e500ca` +
  `e0f550094`) **is** part of the base block, gated once against a
  full-speed run, placed after the tree is fully green so its gate has a
  meaningful baseline.
- Not transplanted (stay working-branch-only): `explorations/protocol.md`,
  `explorations/repo-internals.md`, `explorations/modernization-plan.md`,
  `explorations/readme-plan.md`, `explorations/test-baseline-jdk8.md`,
  `explorations/test-suite-speedup.md`,
  `explorations/swift-vs-fortress-explainer.md`, `explorations/ci/`,
  `research/README.md`, both Steele talk extracts,
  `research/extracts/fortress-websites-wayback.md`, and this plan file
  itself. Clean-branch `research/` holds **only** `authorship.md`.
  `CLAUDE.md` is also not transplanted for now (it references
  working-branch-only files); a clean-branch variant is a later decision.
- Commit conventions (from `modernization-plan.md` § Conventions +
  protocol): messages carry the full reasoning; every commit ends with
  the footer
  `Co-Authored-By: Claude <noreply@anthropic.com>` +
  `Claude-Session: https://claude.ai/code/session_01LjDz79rDLErtnSKpovMDpX`;
  **no model identifiers** anywhere in committed artifacts.
- Pavol decides what gets committed; this plan was reviewed and approved as
  a whole, so execution proceeds commit by commit without further
  per-commit approval, but any *deviation* discovered during execution is
  reported back before improvising.

## Base point

Branch from `a874948acb5b4b6aa7791e8d735657437910d879` — the final original
trunk commit (karl.naden, 2012-08-31 15:12:23 -0400, "initial writeup of
instantiation stuff using small theory instead of welterweight"). Verified
in HEAD lineage.

Facts about this tree that the hindsight ordering (written against the
*graft* tree) got wrong, verified 2026-08-22:

- **Scala 2.9.0**, not 2.10.7. `ProjectFortress/third_party/scala/` holds
  `scala-{compiler,library}-2.9.0.jar`. The 2.10.7 toolchain arrived with
  the graft overlay — which this rebuild *replaces*, so the migration is
  re-landed as the spike-verified minimal commit (B3 below). Spike
  baseline check (2026-08-23): the untouched trunk does **not** build on
  JDK 8 — Scala 2.9.0's classfile parser cannot read the Java 8 rt.jar
  ("bad constant pool tag 18" loading `java.util.Comparator`, 116 cascade
  errors), and no JDK 7 is installable on Ubuntu 24.04 — confirming that
  B1/B2 land un-gated by design, not by neglect.
- **No vendored BCEL.** Trunk's
  `runtimeSystem/MethodInstantiater.java:27` imports the *JDK-internal*
  `com.sun.org.apache.bcel.internal.generic.INVOKEINTERFACE` (satisfied by
  rt.jar on JDK 8; dead code — sole use site line 212 compares against the
  ASM `Opcodes` constant). The graft repointed that import to
  `org.apache.bcel.*` and vendored BCEL 6.2 (378 files + bcel.jar) to
  satisfy it. So there is no "delete BCEL" base commit here, and BCEL
  never lands at all; the dead import line is deleted at R2 (what
  `2f1fdbf2e` eventually did), where JDK 11's removal of
  `com.sun.org.apache.bcel.internal` makes it an error. On JDK 8 it is
  merely a warning — spike-verified: the base block gates green with the
  import untouched. This also disposes of the hindsight mojibake concern
  (`ef45a91ca`) entirely.
- **No `.gitignore`** (only `.hgignore`). `default_repository/caches/global.map`
  and `ProjectFortress/.dependencies/` are **not tracked** — both were
  added by the overlay. So the hindsight "untrack" items vanish; the
  hygiene commit *creates* a fresh `.gitignore` instead.
- **No tracked generated sources.** The graft first committed
  `ProjectFortress/src/com/sun/fortress/nodes/` (~1,071 files), the four
  Rats!-generated parser `.java` files, `Library/FortressAst.{fsi,fss}`,
  and `scala_src/nodes/FortressAst.scala`. On the clean branch these are
  first committed at B4, freshly generated under the B2 determinism fixes.
- `bin/fortress_classpath` already exists at the base (the overlay only
  modified it).
- `ProjectFortress/demos/buffons.fss`, `Fortify/`, `README.txt`,
  `Specification/fortress.1.0.pdf` all present (kickoff README links and
  the PDF-commit deletion both resolve).
- The `tools.jar` pathelement in build.xml is **required** on JDK 8:
  `syntax_abstractions/rats/JavaC.java:39` calls
  `com.sun.tools.javac.Main.compile`, and every javac task has
  `includeantruntime="false"`. It stays through the whole base block and
  is dropped at R2 (JDK 11), where it dangles harmlessly.

## Worktree and environment mechanics

- Work in a second worktree sharing the same `.git`:
  `git worktree add ../fortress-clean a874948ac` then
  `cd /home/user/fortress-clean && git checkout -b clean-ladder`.
  The session cwd stays `/home/user/fortress`; the working-branch checkout
  is never disturbed mid-gate.
- All builds/gates run with `FORTRESS_HOME=/home/user/fortress-clean` and
  `unset JAVA_TOOL_OPTIONS`. Env vars do not persist between shell calls —
  export them inside every command.
- JDKs (all verified installed): `/usr/lib/jvm/java-{8,11,17,21,25}-openjdk-amd64`.
  If the container was recycled, reinstall via
  `apt-get install -y openjdk-{8,11,17,21,25}-jdk-headless ant`.
- Disk is a fixed allowance: before starting, `ant clean` in
  `/home/user/fortress` and wipe its `default_repository/caches/*` to free
  space; do the same in the clean worktree between rungs if space runs low.
- Push: `git push -u origin clean-ladder` after the exhibit block, then
  after every gated commit (network retries per standing orders: 2s/4s/8s/16s).
- **Never** commit this plan, or any working-branch-only file, on
  `clean-ladder`. Never force-push `clean-ladder` once published except to
  fix a same-session mistake.

## Gate definitions

- **Full gate**: `ant clean compileAll` + `ant testFast` + `ant testSystem`
  all green on the stated JDK, run in the clean worktree.
- **Cheap gate**: `ant compileAll` + `ant testFast` (used only where stated).
- Gate results (suite counts, JDK, wall time) go into the commit message of
  the gated commit — that is the project log.
- Until the speedup commit (B8) lands, testFast/testSystem run at 2012
  speed (slow; budget accordingly).

## Commit sequence

### Exhibit block (content from the working branch, no build claims)

E1. **Kickoff README + hero SVGs.** New commit adding:
  - `README.md` — the approved README (working-branch `3595f511d`
    version) with exactly one edit: in "Building, walking and running",
    the sentence "Fortress needs only a JDK and Apache Ant; the build has
    been kept working on modern JDKs." loses its second half — kickoff
    text: "Fortress needs only a JDK and Apache Ant." (The ladder hasn't
    happened yet at this point in history; the closing bookend C1 restores
    the clause.)
  - `explorations/fortify/buffons-excerpt-light.svg`,
    `buffons-excerpt-dark.svg`, and their source
    `explorations/fortify/buffons-excerpt.tic` — the hero image must ride
    in the same commit or the README's first screen is broken.
  - Known and accepted: the README's links to `Specification/fortress.pdf`,
    the Papers PDFs, and `research/authorship.md` are dead for the next
    2–3 commits; the README's "Generated code is committed; `ant makeAST`
    regenerates" claim is false until B4 commits the generated trees.

E2. **Cherry-pick `3b9cf3e39`** — "Fortify: define the six operator-name
  macros fortify.el emits" (`Fortify/fortify.sty`, +14 lines). Prerequisite
  of E3: without it the committed PDFs are not rebuildable from the tree,
  and E3's own message references this repair. Verified: spec-land
  (`Fortify/`, `Specification/`, `Papers/`) is otherwise byte-identical
  between the base and the working-branch tip, so this and E3 apply clean.

E3. **Cherry-pick `414b790e3`** — "Commit rendered PDFs from first
  successful LaTeX builds; ignore byproducts" (spec Working Draft
  `Specification/fortress.pdf` 591 pp, `buffons_doc.pdf`, four Papers
  PDFs, deletion of the duplicate `Specification/fortress.1.0.pdf`,
  `fortress.tex` draft-mode fixes, +23 `.gitignore` lines). One expected
  conflict (verified the only one): the base has **no `.gitignore`**, so
  the cherry-pick's `.gitignore` hunk won't apply — resolve by creating
  `.gitignore` containing exactly the LaTeX-byproduct block from that
  commit (take the 23 lines from `git show 414b790e3 -- .gitignore`),
  nothing else.

E4. **`research/authorship.md`.** New commit adding the file at its
  working-branch-tip content (`git show 3595f511d:research/authorship.md`) —
  Pavol approved the current form, which already folds in the corrections
  from `6beb45ec7` and `796ae4bfb`. Message derived from `957191d26`'s,
  noting the caveat and relic-branch findings are folded in. Do **not**
  bring `research/README.md` or `research/extracts/`.

E5. **Verified experiments.** New commit adding, at working-branch-tip
  content: `explorations/claude_demo.fss`, `explorations/complex_ring.fss`,
  `explorations/mandelbrot_canonical.fss`,
  `explorations/mandelbrot_swifty.fss`. These are interpreter-verified
  running programs. `explorations/README.md` stays behind (verified: it
  references working-branch-only material).

Push `clean-ladder` after E5.

### Base block (all on JDK 8, ends fully green)

Ordering rationale, where it deviates from the hindsight section: the pure
trunk cannot build at all before B3, so commits B1–B2 carry no build gate
(B1 needs none; B2's determinism claim is proven at B4's regeneration).
Hygiene and determinism still land before the first regeneration, honoring
hindsight lesson 2. The hindsight "delete BCEL" and "untrack" items are
void on this tree (see Base point).

B1. **Repo hygiene: create the full `.gitignore`.** Extend E3's LaTeX
  block with every entry that applies to this tree, so later gates'
  `git status` stays clean:
  - build output and editor noise from the graft's own .gitignore:
    `/ProjectFortress/build/*`, `*.tfs`, `*.swp` (credit the graft in the
    message);
  - `default_repository/caches/` (and `*_cache` dirs),
    `ProjectFortress/.dependencies/`;
  - transient test-run artifacts (from working-branch commits `b598e0ec0`,
    `d2df80fb1`, `b745615eb` — testFile.txt etc.);
  - `/ProjectFortress/test-caches/` (needed by B8's parallel suites —
    landing it here keeps B8's diff pure);
  - `research/decks/` (from `01f209491`), OS noise.
  No build gate; the standing check is `git status` clean after every
  later build.

B2. **Generated-source determinism.** Bring the determinism machinery to
  its working-branch-tip state as one commit, before anything regenerates
  (hindsight lesson 2). Concretely:
  - the three generator sources under
    `ProjectFortress/src/com/sun/fortress/astgen/` from `3c4dcdabc`
    (drop build timestamps) **plus** `c4c90f936`
    (CollectingVisitorGenerator emits `combine*` helpers in sorted order)
    **plus** `760f7ea2a` (drops a stale explainer comment from three of
    those files) — i.e., simply take these files at their `3595f511d`
    content;
  - the **two build.xml hunks from `3c4dcdabc`**: the makeAST
    `replaceregexp` that normalizes the headers emitted by the vendored
    astgen.jar, and the buildparser Rats! date normalization (anchors
    verified present in trunk build.xml).
  Verify first that the base's generator sources match the graft's
  (`git diff a874948ac 8fe1daa8f -- ProjectFortress/src/com/sun/fortress/astgen`
  — note: `ProjectFortress/astgen/` is the *schema* directory, not the
  generators). Gate deferred: proven at B4 by double regeneration
  producing a byte-identical tree.

B3. **Revive the 2012 build on JDK 8** (spike-verified minimal revival).
  Re-land spike commit `73f598202` (branch `spike/scala-upgrade`, executed
  and fully gated directly on `a874948ac`, 2026-08-23): cherry-pick it,
  resolving build.xml to **preserve B2's two hunks** — the only expected
  conflict, since both touch build.xml. Five files:
  - Scala jars: `scala-{compiler,library}-2.9.0.jar` out,
    `scala-{compiler,library,reflect}-2.10.7.jar` in
    (`ProjectFortress/third_party/scala/`), same commit — no graveyards.
  - `build.xml`: `scala-version` property → 2.10.7; add the scala-reflect
    jar to `scala.classpath` (new runtime dependency of the 2.10
    compiler); `encoding="UTF-8"` on the eight javac tasks — straight to
    UTF-8, since `72716e6b0`'s `encoding="ISO-8859-1"` was a
    mis-diagnosis later reverted by `5f2461096` (all sources are valid
    UTF-8; spike-verified green). **Keep the tools.jar pathelement**
    (required on JDK 8, see Base point).
  - `bin/fortress_classpath`: `SV=2.10.7`.
  - `FTypeTuple.java`: pass the existing `FType.listComparer` to the two
    bare `TreeSet` constructors in meet/join. JDK 8's TreeMap invokes the
    comparator on the first insert, so a natural-ordering TreeSet of
    `List<FType>` now throws ClassCastException. Using the lexicographic
    comparer the neighboring memo table already uses preserves 2012
    ordering semantics — deliberately NOT the graft's FTypeArrayList
    everything-compares-equal wrapper.
  scalac 2.10.7 compiles the entire 2012 Scala tree unmodified — zero
  Scala source edits, and generation of the AST/parser sources runs
  in-build from the trunk schemas (both spike-verified; B4 then commits
  the generated outputs).
  - Accounting for the graft's other hand-edits, so their absence here is
    deliberate: the four `import xtc.parser.Module` additions and the
    MethodInstantiater BCEL import are JDK 9+ material → R2; the
    NamingCzar, NodeFactory, STypeChecker, and TypeParser edits were
    whitespace, `@Deprecated`, or warning cosmetics → dropped.
  - No graft attribution in this commit (Pavol, 2026-08-23): the diff was
    derived independently by the spike and shares only the 2.10.7 target
    version. The graft's real contribution — demonstrating the project
    could be revived at all — stays on the record via
    `research/authorship.md` (E4, which documents pluckyporcupine's 2018
    migration) and the untouched working branch.
  - Known cosmetic debt, deliberately left until B6: `bin/debugOpt`,
    `bin/fortress.bat`, `bin/fortress_leaks`, `bin/runOptCollect` still
    name `scala-*-2.9.0` jars — verified not gate-relevant (test targets
    use the `compile.classpath` refid, not those scripts). Do not "fix"
    them mid-block; B6's SSOT commit is their home.
  - Gate: `ant clean compileAll` green; run both suites and **expect
    exactly the two known 2012 failures** (6 System-shadowing failures +
    1 e-constant, all in testSystem; testFast green — per `66cdde53f`).
    Spike-confirmed counts on `a874948ac`: testFast 1,377 tests / 47
    suites / 0 failures / 0 errors; testSystem 382 tests / 7 failures
    (`ParamRef`, `WordCountSmall`, `setMakerTest0`, `LongStringTests`,
    `CovCollTest`, `FileConversion`, `realArith`) / 0 errors. Record the
    counts in the message. Any other failure stops execution →
    investigate before proceeding.

B4. **First-time commit of the generated sources**, freshly generated from
  the trunk's own schemas under the B2 determinism fixes: the `nodes/`
  tree (~1,071 files), the four Rats!-generated parser `.java` files,
  `Library/FortressAst.{fsi,fss}`, `scala_src/nodes/FortressAst.scala`.
  (`touch ProjectFortress/astgen/Fortress.ast` + `ant compileAll`
  triggers regeneration — verified real on this build system.) This is a
  large *addition*, not churn — the trunk never tracked these (see Base
  point); expect ~1,100 new files. Gate: regenerate twice, `git status`
  clean the second time (byte-identical — this also discharges B2's
  deferred gate); cheap gate green.

B5. **Delete `-Xfuture` from the 9 launcher scripts** — re-apply
  `13b5a92d1` (nine carriers verified identical at base). Safe on JDK 8
  (its checks are the JVM default for classfiles ≥ V50). Cheap gate.

B6. **build.xml normalization + classpath single source of truth.** One
  commit (or two if the diff is large): set `source`/`target` (1.8)
  consistently, consistent `-Xlint`; bin scripts delegate jar lists to
  `bin/fortress_classpath` and build.xml derives jar names from version
  properties (generalization of `ef45a91ca`'s fortress_leaks fix) — this
  retires the stale 2.9.0 references noted at B3. Encoding is already
  UTF-8 since B3; the tools.jar pathelement **stays** (dropped at R2).
  Cheap gate.

B7. **Fix the two 2012 trunk bugs** (separate commits, they are meaningful
  historical finds):
  - B7a: System api shadowing — re-apply `e700b442d` (move compiler
    `getProperty` into `CompilerSystem`).
  - B7b: e constant — re-apply `36d160799` (correct `e` to the double
    nearest e).
  - Gate after B7b: **full gate, fully green** — the base block's
    headline result. Record as the first fully green suite on the pure
    trunk lineage.

B8. **Test-suite speedup** — re-apply `4b1e500ca` (wipe the cache once per
  run, not once per suite) + `e0f550094` (testFast 4 parallel tracks,
  testSystem 4 shards) as one commit, **excluding** both commits' edits to
  `explorations/test-suite-speedup.md` (not transplanted) and noting that
  `e0f550094`'s `/ProjectFortress/test-caches/` ignore line already landed
  at B1. Gate: full gate green, wall-clock before/after in the message
  (this multiplies through the ~10 remaining gate runs).

Push after every commit from B3 on.

### Ladder (one gated commit per rung, era-correct JDK)

Each toolchain rung deletes its predecessor's jars in the same commit
(hindsight lesson 6 — no graveyards).

R1. **Scala 2.10.7 → 2.12.20** (JDK 8, full gate). Re-derive from
  `22c059ef5` + `454867392` + `ac517a5ce` collapsed: jars
  scala-{library,compiler,reflect}-2.12.20 + parser-combinators 1.1.2 —
  sourced from commit `454867392`
  (`git checkout 454867392 -- ProjectFortress/third_party/scala/<jar>`;
  the tip carries only 2.13.18 jars), source adaptations, build.xml
  scalac invocation. Skip the 2.12.5 waypoint.

R2. **JDK 11** (full gate on JDK 11). Re-apply `62dbd760b`
  (ClassLoadChecker accepts `jdk.*` internal names; FortressMethodAdapter
  nest-attribute handling), and **drop the now-dangling tools.jar
  pathelement** from build.xml. The `target=` half of `fdd4a57c2` is
  already pre-empted by B6. Also land the JDK 9+ source fixes the graft
  carried and B3 no longer does: add explicit `import xtc.parser.Module`
  to InstrumentedParserGenerator, ParserMaker, RatsUtil, and parser_util
  Util (unqualified `Module` is ambiguous against auto-imported
  `java.lang.Module` from JDK 9 on), and delete
  `MethodInstantiater.java`'s dead JDK-internal BCEL import
  (`com.sun.org.apache.bcel.internal` is gone in JDK 11; see Base
  point).

R3. **jsr166y → java.util.concurrent** (JDK 11, full gate). Re-apply
  `2ed045233` + `bf23583ad` merged — the BaseTask.joinOrRun current-task
  save/restore ships *with* the port (hindsight lesson 7: without it the
  port has a ~30% flake).

R4. **JDK 17, then 21** (full gate on 17, then on 21). Expected zero code
  changes (`7f71d3278`); the commit is the verification record. With
  -Xfuture gone since B5, no deprecation warnings.

R5. **ASM 3.1 → 9.10.1** (JDK 21, full gate). Re-apply `2f1fdbf2e`:
  vendored jar swap in `ProjectFortress/third_party/asm/`, source
  adaptations (`asmbytecodeoptimizer.Opcodes` shadows
  `org.objectweb.asm.Opcodes` — watch imports), **and the
  `bin/fortress_classpath` jar-name update** (the SSOT file carries
  `asm-all-3.1.jar`; after B6 it is the one place that needs the edit).
  No BCEL anywhere on this branch — the diff is smaller than the
  working-branch version.

R6. **Scala 2.13.18** (JDK 21, full gate). Re-apply `668e689f7` (+
  `f5c906cdc` gate record): build.xml drives `scala.tools.nsc.Main`
  directly (2.13 dropped the ant tasks), jar swap incl. parser-combinators
  `_2.13`, source adaptations.

R7. **JDK 25** (full gate on JDK 25). Expected zero changes — the
  -Xfuture landmine died at B5. Verification-record commit (`864383af4`).

R8. **javac -source/-target 1.8 → 25** (JDK 25, full gate). Re-apply
  `561064bb1`. Emitted Fortress classfiles stay V1_6 — raising them needs
  stack-map frames through the bytecode-rewriting pipeline and is
  bytecode-compiler work, **not** a ladder rung.

### Closing bookend

C1. **README amendment**: restore the deferred clause — the Building
  sentence becomes "Fortress needs only a JDK and Apache Ant; the build
  has been kept working on modern JDKs." One-line diff; message summarizes
  the ladder (JDK 8→25, Scala 2.9→2.13, ASM 9, j.u.c.) as the reason the
  claim is now true. Full gate already green from R8; no re-gate needed.

Final push; report to Pavol; he renames the branch via GitHub UI.

## Execution checklist (tick as you go; keep updated on the working branch)

- [ ] Worktree created at `/home/user/fortress-clean`, branch `clean-ladder` from `a874948ac`
- [ ] E1 kickoff README + SVGs
- [ ] E2 fortify.sty cherry-pick
- [ ] E3 PDFs cherry-pick (.gitignore conflict resolved as specified)
- [ ] E4 authorship.md
- [ ] E5 experiments; push
- [ ] B1 full .gitignore
- [ ] B2 determinism (generators to tip state + 2 build.xml hunks)
- [ ] B3 revive on JDK 8 (re-land spike `73f598202`, preserve B2 hunks, UTF-8, keep tools.jar); gate: green minus the 2 known failure groups
- [ ] B4 generated sources committed; byte-identical double-regen proven
- [ ] B5 -Xfuture deleted
- [ ] B6 build.xml normalization + classpath SSOT
- [ ] B7a System shadowing; B7b e constant; FULL GATE FULLY GREEN
- [ ] B8 speedup; before/after timings recorded
- [ ] R1 Scala 2.12.20 · [ ] R2 JDK 11 (+tools.jar drop) · [ ] R3 j.u.c. · [ ] R4 JDK 17/21
- [ ] R5 ASM 9.10.1 (+fortress_classpath) · [ ] R6 Scala 2.13.18 · [ ] R7 JDK 25 · [ ] R8 source/target 25
- [ ] C1 closing README amendment; final push
- [ ] Report to Pavol (branch rename is his)

## Known risks / stop conditions

- B3 is the riskiest step (curating a 1,506-file overlay down to a ~25-file
  whitelist). If the curated subset will not compile and the cause is not
  a missing generated file (B4 fold-in) or an obviously-missed hand edit
  from the overlay diff, stop and report rather than pulling in overlay
  content wholesale.
- Any gate failure that is not one of the two known 2012 failure groups at
  B3: stop, root-cause, report. Never skip or quarantine a test to get
  green.
- Disk exhaustion mid-ladder: free build artifacts/caches in both
  worktrees first (deletes succeed even at 0 avail); a fresh session is
  the last resort, and this plan file is the recovery contract.
- If `clean-ladder` already exists on origin with content when pushing
  (e.g., after a partial earlier run), fetch and reconcile against this
  checklist instead of force-pushing blindly.
