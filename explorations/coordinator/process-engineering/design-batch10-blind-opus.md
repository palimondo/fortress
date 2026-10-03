# Batch 10, designed blind: a workflow for pieces W, C, G and N

A design written from the three files of `/home/user/blind-brief/` (`content.md`,
`requirements.md`, `machine.md`), the source (`ProjectFortress/`, `Library/`), the
specification, the ledger and `explorations/repo-internals.md`, and nothing else of
`explorations/`. Nothing was run while it was written. Tier names are those of
`machine.md` (Fable, Opus, Sonnet); the exact model strings are passed to the script at
launch. Line numbers of `content.md` are cited as `brief:N`.

## 1. The design in plain words

The step has four independent pieces. They share little: two library files (G and N,
which own disjoint declarations), Appendix I (W and C, which own disjoint entries), the
ledger, and the measurements. Three facts about the machine shape the design. It runs two
agents at a time. A full check of a tree costs about 35 minutes of machine time
(testFast 11, testSystem 4, distance 20). And rule 3 allows each build and each run only
once per code state. So the shape is: agents do their thinking in parallel, each in a
private worktree, and the expensive runs are few, shared, and timed to overlap that
thinking.

1. **Phase 0 (the coordinator, before the script, about 15 minutes).** Build one base
   worktree, or reuse a built one at the base's code. Seed six worktrees from it (3 s
   each). Reuse the last gate result and the last distance per-site list if their code is
   the base's. Otherwise run the distance once, detached. Start a run log that puts
   rule 3 into practice: a code id for every state, and one line per build or run.
2. **Build: six implementers.** W. Piece C split by file ownership into **C-infer** (rows
   593 and 604), **C-decl** (563, 574, 605 and 597's checker half) and **C-crash** (the
   four crashes). C-crash repairs only in files it owns; for any other file it hands over
   a trace and a patch. Then **G** and **N**. Each works test first. The test is added or
   promoted and committed, run once on the seeded base, and seen failing; then comes the
   fix. Each implementer runs only its own tests and the named must-keep tests, one at a
   time. W, G and N also run `ant testSystem` once on their final code: 4 minutes for the
   widest blast radius. The C agents do not run testFast (11 minutes on four cores); the
   C group runs it once, merged.
3. **Check.** Two short Sonnet agents launch the group runs. One merges the three C
   branches into tree **K**, builds once and starts testFast detached. The other merges G
   and N into tree **L**. L needs no build, since no source changes, and it runs the
   distance detached against the base's checker, as the brief asks. While those runs go,
   three Opus reviewers read the diffs of W, C and the library and try to refute them. Each
   works from a checklist drawn from the binding decisions. Then two Sonnet collectors read
   K's testFast and L's per-site delta, with the lines mapped through the diff.
4. **Fix.** There is at most one fix agent per group, and only where a run or a review
   found something. Every code change starts from a failing test. No suite is rerun,
   because the merged gate is the rerun.
5. **Gate.** One Sonnet runner merges W, K and L into tree **M** and builds it once. On
   that one build it runs everything once:
   - testFast and testSystem;
   - the 85-program pass list;
   - the checker count;
   - the distance, with deltas against the base and against L. The L delta attributes
     C's clears and the errors that the crash repairs unmask.

   If the gate is red, one Opus fix and one re-gate follow. If it is red twice, the
   script stops and the director decides.
6. **Finish and land.** A Sonnet finisher composes the reports and writes the gate
   summary. It applies every ledger change, because the pieces never edit the ledger: new
   row numbers are assigned once, against `origin/main` at that moment. It then builds one
   squashed commit on `origin/main` and checks that the commit's code id is the gated
   one. The coordinator adds the `FACTS.md` correction and pushes.

**Robustness against the machine:**

- **Restarts.** Each batch of agents is issued at once, so calls happen in a fixed order.
  A resume from the journal after the 13-hour stop then replays the same prefix. A
  `pipeline()` would not: its call order depends on timing.
- **Unfinished agents.** Every agent keeps a status file and notes, so an agent that is
  run again continues its work instead of starting over.
- **Long runs.** These are detached and polled in steps of at most 4 minutes. The 5-minute
  subagent cache never lapses, and the 10-minute Bash limit never applies.
- **Empty returns.** An empty return is read back from the status file by a Sonnet reader.
- **Blocked pieces.** A blocked piece is left out of the merges and reported, and the
  other pieces still land.

**Tiers.**

- **Fable** for C-infer only. Its rows have a decided type that collides with the
  library route, and the place to fix row 593 is unmeasured. This is where a plausible
  but wrong repair is most likely and least visible to tests.
- **Opus** for the other implementers, the reviewers and the fixers, whose work is
  judgement.
- **Sonnet** for every launch, collect, gate, finish and recovery agent. Their work is
  mechanical, their contexts are small, and their waits are long, so a lapsed cache
  costs little.

**Estimate.** 15 to 23 agents (18 expected). About 3.3 M tokens written (2.5 to 4.5 M).
About 8.5 hours of wall time (7 to 11).

## 2. The script

### Phase 0, done by the coordinator before the script (shell, not agents)

```bash
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
unset JAVA_TOOL_OPTIONS
S=<scratch>/b10; mkdir -p $S/{status,notes,runs,tools}; : >> $S/runlog.tsv
git -C /home/user/fortress fetch origin; BASE=$(git -C /home/user/fortress rev-parse origin/main)
codeid() { git -C "$1" ls-tree HEAD -- ProjectFortress Library bin lib build.xml default_repository | sha1sum | cut -c1-12; }
# 1. A built base: reuse a worktree whose codeid equals BASE's, else build one (about 200 s, recorded in runlog):
git -C /home/user/fortress worktree add /home/user/wt/b10-base $BASE
(cd /home/user/wt/b10-base && FORTRESS_HOME=$PWD ant compileAll && git checkout -- default_repository/caches/global.map \
   && <library compile in order: AnyType, CompilerBuiltin, CompilerLibrary, CompilerAlgebra, CompilerSystem>)
# 2. Base evidence: the last gate summary and the last distance per-site list are reused when their codeid is BASE's
#    (rule 3); otherwise the distance runs once, detached, on b10-base (20 min) while the Build batch reads.
# 3. Seed the six worktrees (3 s each):
for p in W C-infer C-decl C-crash G N; do
  explorations/coordinator/tools/seed-worktree.sh /home/user/wt/b10-base /home/user/wt/b10-$p b10/$p $BASE; done
# 4. Before launch: df -h /tmp /home; the session's uptime against the 46,636 s stop; Fable pool left this week.
```

### The script

```js
export const meta = {
  name: 'climb-batch-10',
  description: 'Batch 10: pieces W, C, G, N built test-first in seeded worktrees, reviewed, measured, merged, gated once, made ready to land',
  whenToUse: 'Once, after Phase 0 has built the base and seeded the six worktrees',
  phases: [
    { title: 'Build', detail: 'six implementers in seeded worktrees, test first' },
    { title: 'Check', detail: 'launch K (C merged, testFast) and L (library merged, distance); three reviews; collect' },
    { title: 'Fix', detail: 'at most one fix agent per group, only where something was found' },
    { title: 'Gate', detail: 'merge W, K, L into M; build once; suites, pass list, both measurements' },
    { title: 'Finish', detail: 'reports, gate summary, ledger rows, one squashed commit on origin/main' },
  ],
}

// args (identical on any resume): { base, baseCodeId, baseWt, baseBuild, mainCheckout, brief, ledger,
//   scratch, runlog, wt: { W, 'C-infer', 'C-decl', 'C-crash', G, N, K, L, M },
//   baseDistance: { sites, table, runout }, reportDir, libraryEvidence, tiers: { fable, opus, sonnet } }
const A = args, T = A.tiers, S = A.scratch, B = A.brief, R = A.reportDir   // R = explorations/compile-ladder/climb-batch-10

// ---------- result schemas ----------
const ROW = { type: 'object', properties: {
  id: { type: 'string' },                 // 'row 544', 'site FortressLibrary.fss:3089 (base line)', 'crash 2'
  outcome: { type: 'string', enum: ['fixed', 'left-with-row', 'noted', 'traced', 'blocked'] },
  test: { type: 'string' }, failedAt: { type: 'string' }, passedAt: { type: 'string' },   // runlog line ids
  how: { type: 'string' }, wayNotTaken: { type: 'string' } }, required: ['id', 'outcome', 'how'] }
const LEDGER = { type: 'object', properties: {
  close: { type: 'array', items: { type: 'object', properties: { row: { type: 'string' }, status: { type: 'string' }, note: { type: 'string' } }, required: ['row', 'status', 'note'] } },
  notes: { type: 'array', items: { type: 'object', properties: { row: { type: 'string' }, note: { type: 'string' } }, required: ['row', 'note'] } },
  newRows: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, cells: { type: 'array', items: { type: 'string' } } }, required: ['key', 'cells'] } } } }
const IMPL = { type: 'object', properties: {
  state: { type: 'string', enum: ['done', 'partial', 'blocked'] },
  branch: { type: 'string' }, head: { type: 'string' }, codeId: { type: 'string' },
  rows: { type: 'array', items: ROW }, ledger: LEDGER,
  specEdits: { type: 'array', items: { type: 'string' } },
  suite: { type: 'string' },              // e.g. 'testSystem 506 tests, 0 failures, at <codeId>'
  report: { type: 'string' },             // its report section's path on the branch
  handOver: { type: 'array', items: { type: 'string' } } },   // patches for files others own; notes for the coordinator
  required: ['state', 'branch', 'head', 'rows', 'ledger', 'report'] }
const REVIEW = { type: 'object', properties: {
  verdict: { type: 'string', enum: ['pass', 'fix'] },
  findings: { type: 'array', items: { type: 'object', properties: {
    severity: { type: 'string', enum: ['blocking', 'minor'] }, owner: { type: 'string' },
    where: { type: 'string' }, rule: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } },
    required: ['severity', 'owner', 'where', 'rule', 'problem'] } } }, required: ['verdict', 'findings'] }
const SUITE = { type: 'object', properties: { codeId: { type: 'string' }, tests: { type: 'number' }, failures: { type: 'number' },
  failed: { type: 'array', items: { type: 'string' } } } }
const DIST = { type: 'object', properties: { codeId: { type: 'string' }, total: { type: 'number' }, verdict: { type: 'string' },
  byKind: { type: 'object' }, byClass: { type: 'object' }, crashes: { type: 'array', items: { type: 'string' } },
  cleared: { type: 'array', items: { type: 'string' } },      // 'owner | base site | message'
  remaining: { type: 'array', items: { type: 'string' } },
  missed: { type: 'array', items: { type: 'string' } },       // remaining although its owner's report says cleared
  appeared: { type: 'array', items: { type: 'string' } } } }  // 'owner | site | message | caused or unmasked'
const RUN = { type: 'object', properties: {
  state: { type: 'string', enum: ['launched', 'done', 'failed'] }, worktree: { type: 'string' }, branch: { type: 'string' },
  codeId: { type: 'string' }, build: { type: 'string' }, testFast: SUITE, testSystem: SUITE,
  passList: { type: 'object', properties: { programs: { type: 'number' }, failed: { type: 'array', items: { type: 'string' } } } },
  distance: DIST, checkerCount: { type: 'string' },
  verdict: { type: 'string', enum: ['green', 'red', 'n/a'] }, problems: { type: 'array', items: { type: 'string' } } },
  required: ['state', 'worktree', 'codeId', 'verdict'] }
const FIN = { type: 'object', properties: { branch: { type: 'string' }, commit: { type: 'string' }, codeId: { type: 'string' },
  sameCodeAsGated: { type: 'boolean' }, newRows: { type: 'array', items: { type: 'string' } }, problems: { type: 'array', items: { type: 'string' } } },
  required: ['branch', 'commit', 'codeId', 'sameCodeAsGated'] }

// ---------- what every agent is told ----------
const COMMON = (label, wt) => `You are ${label}, one agent of climb batch 10 of the Fortress revival.
Worktree: ${wt}, branch b10/${label}; work only there. Never edit ${A.mainCheckout} (others work in it) or another agent's worktree; never push.
Read first: ${B}/requirements.md (five binding rules), ${B}/machine.md, ${B}/content.md lines 1-23 (terms) and 198-212 (who owns what).
Environment: JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64, PATH=$JAVA_HOME/bin:$PATH, FORTRESS_HOME=${wt}, unset JAVA_TOOL_OPTIONS.
After every ant compileAll: git checkout -- default_repository/caches/global.map; a compiled run then needs the library compiled in
order (AnyType, CompilerBuiltin, CompilerLibrary, CompilerAlgebra, CompilerSystem). After a Library/ edit wipe the interpreter caches
(rm -rf default_repository/caches/*_cache), never global.map.
Rule 3 in practice: commit code edits before any build or run. Code id = git ls-tree HEAD -- ProjectFortress Library bin lib build.xml
default_repository | sha1sum. Look up (code id, command) in ${A.runlog}: a finished result there is your result. Otherwise run and append
one line: id, code id, command, verdict, result file under ${S}/runs/. Never repeat a run to confirm it. "Before" runs of new programs
use the base build ${A.baseBuild} through old-fortress.sh with a private cache folder under ${S}.
Waits: anything that may last over 4 minutes (a suite, the distance, a library compile on a busy machine) runs detached
(nohup setsid ... > ${S}/runs/<file> 2>&1 &, pid file beside it); poll it in steps of at most 4 minutes, never one longer wait
(your prompt cache lives 5 minutes; a foreground Bash call dies at 10). Before a suite: df -h /tmp, and delete only
/tmp/fortress*rats directories older than 3 hours (younger ones may belong to a running job).
Commits: checkpoint freely on your branch (the step lands as one squashed commit), but commit nothing main is not to hold: no logs,
captures or scratch (they go under ${S}). Never edit the ledger (${A.ledger}): return its changes. Never edit the model program,
a test line of the original team, CompilerLibrary/CompilerBuiltin/CompilerAlgebra, or Specification-1.0-frozen/.
Restarts: keep ${S}/notes/${label}.md current and write your result to ${S}/status/${label}.json at each milestone and before you
return. If it already says done, return it unchanged; if partial, you were restarted: continue from your branch and notes.
`

// ---------- the six implementers' tasks (summarised where marked) ----------
const TASK = {
W: `Piece W: ${B}/content.md lines 31-75; section 4 entries Standard, Comprises at the level of values, Implicit bound Any,
Answer 9, Conversions, Instance rule, Late word, Changes recorded, S1 form. Also: repo-internals.md (two worlds, harness),
ledger rows 544, 534, 588, 425, 584, 585; OverloadingChecker.scala functionalMethodsAtOnePosition (:563-592) and checkBoundAny
(:484-490); Formula.solveToBounds; research/extracts/ParkPOPL2019-extract.md lines 170-200.
1. Before any source edit: promote XXXFunctionalMethodMeetInherited, XXXOverloadSingleParamBoundAny, XXXInferContravariantWalk
   (git mv to plain topic names, keys as the brief gives); write the owed tests (the meet declared; two declarations below both
   covering it; the lone-parameter pin, Fruit/Fruit and Any/Any); commit; run each once on the seeded base: the promoted fail,
   the owed pass. Record.
2. Rows 534 and 544 in OverloadedFunction.java and walk's load-time environment: refuse at load with the texts the keys name.
   534: a written Any only; a parameter with no extends clause stays allowed (the library's array1). 544: per providing type,
   accept a declaration on the meet or declarations that cover it. Before building, list every library type and overloaded
   symbolic operator the check reaches: String's ||, |||, //, /// pairs (row 585) must keep loading. If the only way is to scope
   the check as the checker scopes it (row 584), do so, say so, and open a row; never touch the library.
3. Row 588 in EvaluatorBase: an interval with no lower end takes its upper end, never Bottom; F-bounded parameters nothing fixes
   keep today's behaviour (line 73); the lone-parameter handling stays.
4. Build; run the promoted, owed and must-keep tests (line 68) one at a time; then ant testSystem once, detached, on your final code.
5. Specification in the S1 form: inference.tex box :187-201; reductions.tex callout :27-44; Appendix I entries and sentences per
   line 69: callout at each passage, original kept and quoted with path and line in Specification-1.0-frozen, reason, route C.
6. Report ${R}/W.md: the sets walk now refuses, row 588's instance as built, the revised passages, each test's failing and passing run.`,

'C-infer': `Piece C, rows 593 and 604 only: ${B}/content.md lines 79-118 on those rows; section 4 Standard, Late word, Instance rule,
Conversions, Library route, Count never red, Changes recorded, S1 form. You own impls/Functionals.scala, compiler/Types.java,
NodeUtil.getParamType, Specification/basic/functions.tex and a new Appendix I entry on the varargs type; for any other checker file
write the patch into handOver. Read the team's varargs type (Types.java :47-49, :99-101) and walk's value (NonPrimitive.java:229).
First, one probe on the base: Types.IMMUTABLE_HEAP_SEQ_NAME is fixed from WellKnownNames.fortressLibrary() when the class loads,
and the compiler library declares no ImmutableArray. If the decided body type cannot be named on the compiled path without adding
to the compiler's prelude (forbidden), build faces 1 and 2, hold face 3 by a plain compile_err_contains test of
k(rest: String...): String = rest that fails on the base, and report the blocker for the positive program. Do not route round it.
Order: promote XXXInferDependentBound (re-key InferDependentBoundLink's tests=) and XXXVarargsNoTrailingArgument; write the owed
tests (five and six varargs arguments; face 3); commit; see each fail on the base; repair; ant compileAll; library compile; run them
and the must-keep tests near your code (InferBigOperatorUnwritten among them). No testFast: the group runs it once, merged.
Spec: functions.tex :174-183 callout (HeapSequence kept; what both implementations bind) and the new Appendix I entry.
Report ${R}/C-infer.md: each repair as built; the twelve sites row 604 should clear, listed, not measured.`,

'C-decl': `[summary] Rows 563, 574, 605 and 597's checker half (brief lines 79-118). Owns AbstractMethodChecker, OverloadingChecker
(row 574's message only, never its rules), TypeHierarchyChecker, the file where the checker binds an object's names for its body
(named in the report), and the Appendix I entry 'The traits that extend a closed trait'. Precedents: ownStaticParamsApart and
toFunctionalMethodArrows (row 561), withoutSelf. Per row: promote or write the test, commit, see it fail on the base, repair,
rebuild, library compile, see it pass. Row 574: key the new test on the message the fix prints. Row 597: fix the error text
first, write the compile_err_contains test with it, see it fail on the base (the checker passes, codegen stops), then implement;
if object expressions cannot be read without the team's planned lifting (AbstractMethodChecker :125-141), keep no test and write
the row's note. Ledger: close 563, 574, 605 when their tests pass; note on 561; 597 closed or noted. Report ${R}/C-decl.md.`,

'C-crash': `[summary] The four crashes (brief lines 90, 109, 112, 114). Input: the base distance output ${A.baseDistance.runout}
and its crash rows; FortressLibrary.fss :1285-1289, :2474-2588 (fn at :2492), :2847-2960 (fn at :2883); Stream's variance check.
Per crash: find the cause (stack trace; a minimal program that crashes the compiled path the same way, about 5 s a compile); open
a row; repair only where the trace finds a few lines and the text says what the checker should report. Test: plain where the
text makes the program valid and you repair (fails on the base by the crash); XXX keyed on the crash output where you trace and
do not repair; the row alone where no small program shows it. Files owned by C-infer or C-decl (Functionals, Types,
NodeUtil.getParamType, which also raises 'Type is not inferred'; AbstractMethodChecker, OverloadingChecker, TypeHierarchyChecker):
do not edit; put the trace, the patch and its failing test in handOver. Report ${R}/C-crash.md: cause, row, repaired or not.`,

G: `[summary] Piece G (brief lines 122-155; section 4 Library practice, Exclusion rule flat tower, Answer 7, Maybe's empty case,
Library route, Model, Count never red). Input: the base per-site list ${A.baseDistance.sites} filtered to your 57 sites (if absent,
read code and wait for it before editing). Rule 1 for library sites as decided before launch: ${A.libraryEvidence}.
First write the walk test by topic that calls each declaration you will repair with today's value (a Condition's cond, a
reduction's simpleJoin, a generator of generators); commit; run it on the base and record its output as "before".
Per site: read the message and the declaration; find how the library writes the same thing elsewhere (the precedents of line
139); repair .fss and .fsi together by that device; never a cast routed round the checker; never remove a team declaration;
never change a value walk prints; where the only repair is a checker change, leave the site and write its row. Stay inside your
declarations (line 203): NoReductionPair, SumReduction's distribute pair, the fusion pairs, __bigOperator and the typecase at
:1077 are not yours. Then wipe caches; run the value test (same output as before) and the team's generator and reduction tests
(Generator2Test among them) one at a time; ant testSystem once, detached, on your final code.
Report ${R}/G.md: each repair with the way not taken, the sites left with their rows, and a predicted outcome (cleared or left)
per site, which the measurement that follows checks.`,

N: `[summary] Piece N (brief lines 159-195; section 4 Library practice, Instance rule, Implicit bound Any, Standard, Scalar ranges,
Answer 8, Exclusion rule, Library route, Model, Count never red). Same method as G for the 60 sites, plus: the drop (the three
written bounds go back to the team's unbounded declarations; the 18 sites are expected to clear, not predicted); rows 590 and 602
test first, by promoting XXXTypecaseNoMatchUncheckedWalk and XXXStridedRange3DShiftWalk, seen failing as plain tests on the base;
assert/deny's asDebugString on Any: list the library's own devices for reading an Any (narrowing to Object is not one);
shouldRaise and __thrower: slip or checker limit, read against ForbiddenException(chain) and the library's bare throws; the tuple
comparisons against the team's comment and the calls the library and team tests make; partition keeps ZZ32. Not yours: isLeftZero,
strToInt, row 560's second part, String, the self-typed bodies (line 195). Value test (a tuple comparison, fail, a List
comprehension). testSystem once. Report ${R}/N.md. handOver: the FACTS.md entry on the written bound Object stops holding.`,
}

const RECOVER = (label) => `Read ${S}/status/${label}.json, ${S}/notes/${label}.md and branch b10/${label}. Return the status
object as written; if it says done but the branch lacks the commits it names, return it with state 'partial'; if there is no
file, return state 'blocked' with what the branch holds. Do not edit anything.`

// ---------- helpers ----------
const IMPLS = [   // longest expected first (N 2.2 h, G 1.8, C-infer 1.5, C-crash 1.5, W 1.2, C-decl 1.2); fixed order = fixed call order
  { label: 'N', model: T.opus }, { label: 'G', model: T.opus }, { label: 'C-infer', model: T.fable },
  { label: 'C-crash', model: T.opus }, { label: 'W', model: T.opus }, { label: 'C-decl', model: T.opus },
]
const implement = (p, suffix) => agent(COMMON(p.label, A.wt[p.label]) + TASK[p.label],
  { label: p.label + (suffix || ''), phase: 'Build', model: p.model, effort: 'high', schema: IMPL })

async function settle(specs, results, schema, again) {   // after the barrier, in fixed order: deterministic on resume
  const out = []
  for (let i = 0; i < specs.length; i++) {
    let r = results[i]
    if (!r) r = await agent(RECOVER(specs[i].label), { label: specs[i].label + '-status', model: T.sonnet, effort: 'low', schema: specs[i].schema || schema })
    if (again && r && r.state === 'partial') { log(specs[i].label + ' unfinished: one continuation'); r = await again(specs[i], '-cont') }
    out.push(r)
  }
  return out
}
const blocking = (rev) => (rev && rev.findings ? rev.findings.filter(f => f.severity === 'blocking') : [])

// ---------- Build ----------
phase('Build')
const builtRaw = await parallel(IMPLS.map(p => () => implement(p)))
const built = await settle(IMPLS, builtRaw, IMPL, implement)
const done = {}
IMPLS.forEach((p, i) => { done[p.label] = built[i] && built[i].state === 'done' ? built[i] : null })
const missing = IMPLS.map(p => p.label).filter(l => !done[l])
if (missing.length) log('Left out of this step (blocked or unfinished): ' + missing.join(', '))
const CB = ['C-infer', 'C-decl', 'C-crash'].filter(l => done[l])
const LB = ['G', 'N'].filter(l => done[l])

// ---------- Check: launches first, reviews while the machine runs, collectors last ----------
phase('Check')
const K_LAUNCH = `Seed ${A.wt.K} from ${A.baseWt} as branch b10/K (seed-worktree.sh). Merge ${CB.map(b => 'b10/' + b).join(', ')}
(--no-ff, in that order). On a conflict that is not two disjoint edits of one region, stop and return state 'failed' naming it.
Commit; code id; ant compileAll (runlog); restore global.map; launch ant testFast detached and record it in the runlog as running
with its pid file and output path. Return state 'launched'.`
const L_LAUNCH = `Seed ${A.wt.L} as branch b10/L; merge ${LB.map(b => 'b10/' + b).join(', ')}. Nothing under ProjectFortress/src
changes, so the seeded build is L's build: do not rebuild (rule 3). Wipe the interpreter caches. Launch the distance measurement
detached (explorations/coordinator/tools/distance/run.sh <out> <scratch> any) and record it as running. Return state 'launched'.`
const REVIEW_COMMON = `Review, trying to refute. Read only; edit nothing; rebuild and rerun nothing (rule 3: results are in
${A.runlog}); one small probe only where no recorded run answers a question, recorded. For every test check in the runlog that it
failed at a code id before its fix (rule 1) and passed after, mapping code ids to the branch's commits.`
const REVIEW_W = COMMON('W-review', A.wt.W) + REVIEW_COMMON + `
Piece W: brief lines 31-75 and its section 4 entries; git diff ${A.base}..b10/W; ${R}/W.md. Check: the refusals follow
overloading.tex :469-529 and :134-160, cover by declarations accepted, the implicit bound not caught; nothing changes which
declaration runs for a set walk loads today (Conversions), so look for dispatch paths the edit touches beyond the load check; the
scope for symbolic operators stated and given a row; row 588 leaves F-bounded parameters alone; S1 form at every passage (a box
headed 'Revised by the 2026 revival' that prints in every build, not a \\note) and every Appendix I entry (sections, change,
rationale, effect, original text with path and line in Specification-1.0-frozen/, route C); no file outside the piece's list.`
const REVIEW_C = COMMON('C-review', A.wt.K) + REVIEW_COMMON + `
[summary] Piece C: brief lines 79-118; git diff ${A.base}..b10/K; ${R}/C-*.md. Check: repairs principled (no library names
special-cased); 563's renaming mirrors row 561's; 593 takes the narrowest candidate without moving other inferences; 604
applicability per functions.tex :245-281 and the body type as decided, the blocker reported honestly; no change to the
overloading checker's rules; crash repairs small, each with a failing test; test keys follow the harness (an XXX compile test
cannot hold an over-acceptance; a thrown CompilerError is keyed on tests= with compile_exception_contains); S1 form for functions.tex
and both Appendix I entries. Name the owner (C-infer, C-decl, C-crash) of each finding.`
const REVIEW_LIB = COMMON('Lib-review', A.wt.L) + REVIEW_COMMON + `
[summary] Pieces G and N: brief lines 122-195 and 198-212; git diff ${A.base}..b10/L; ${R}/G.md, ${R}/N.md. Check each repair
against Library practice: the precedent it cites exists and is the same device; no cast round the checker; no team declaration
removed; no exclusion false of a library type, and every device states a meet the exclusion rule reads; Nothing[\\T\\] spelling;
nothing added to the compiler's prelude; no model line; ownership (lines 203-205) respected; the value tests' before and after
outputs identical but for rows 590 and 602; exactly three bounds dropped; every site left has a row with its reason.`
const K_COLLECT = COMMON('K-collect', A.wt.K) + `Wait for K's testFast in the runlog (poll at most every 4 minutes; if the launch
is not recorded yet, wait for it). Parse ProjectFortress/TEST-RESULTS: tests, failures, and for each failure its name and first
diagnostic lines. Record the verdict in the runlog. Return RUN with testFast.`
const L_COLLECT = COMMON('L-collect', A.wt.L) + `Wait for L's distance (poll at most every 4 minutes). Write the per-site list
(errors.py). Write ${S}/tools/mapline.py, which maps a line of a library file at a given commit back to the base through the hunks of
git diff -U0 ${A.base}..<commit> -- Library ProjectFortress/LibraryBuiltin; the gate reuses it. Compare L's sites with the base's
${A.baseDistance.sites}; attribute each to G or N by owning declaration (brief lines 203-205), to C (row 604's and 563's halves) or
to none. Put in 'missed' the sites that G.md or N.md predicted cleared. Run compare.sh for the verdict. Return RUN with distance.`
const CHECKS = [
  CB.length && { label: 'K-launch', model: T.sonnet, effort: 'low', schema: RUN, prompt: COMMON('K-launch', A.wt.K) + K_LAUNCH },
  LB.length && { label: 'L-launch', model: T.sonnet, effort: 'low', schema: RUN, prompt: COMMON('L-launch', A.wt.L) + L_LAUNCH },
  done.W && { label: 'W-review', model: T.opus, effort: 'high', schema: REVIEW, prompt: REVIEW_W },
  CB.length && { label: 'C-review', model: T.opus, effort: 'high', schema: REVIEW, prompt: REVIEW_C },
  LB.length && { label: 'Lib-review', model: T.opus, effort: 'high', schema: REVIEW, prompt: REVIEW_LIB },
  CB.length && { label: 'K-collect', model: T.sonnet, effort: 'medium', schema: RUN, prompt: K_COLLECT },
  LB.length && { label: 'L-collect', model: T.sonnet, effort: 'medium', schema: RUN, prompt: L_COLLECT },
].filter(Boolean)
const checkedRaw = await parallel(CHECKS.map(c => () =>
  agent(c.prompt, { label: c.label, phase: 'Check', model: c.model, effort: c.effort, schema: c.schema })))
const checkedList = await settle(CHECKS, checkedRaw, RUN, null)
const ck = {}; CHECKS.forEach((c, i) => { ck[c.label] = checkedList[i] })

// ---------- Fix: one agent per group, only where something was found ----------
phase('Fix')
const kRun = ck['K-collect'], lRun = ck['L-collect']
const handOvers = CB.map(l => (done[l].handOver || []).map(h => l + ': ' + h)).flat()
const cNeeds = CB.length > 0 && ((kRun && kRun.testFast && kRun.testFast.failures > 0) || blocking(ck['C-review']).length > 0 || handOvers.length > 0)
const appeared = (lRun && lRun.distance && lRun.distance.appeared) || [], missedSites = (lRun && lRun.distance && lRun.distance.missed) || []
const lNeeds = LB.length > 0 && (appeared.length + missedSites.length > 0 || blocking(ck['Lib-review']).length > 0)
const wNeeds = !!done.W && blocking(ck['W-review']).length > 0
const FIX_COMMON = `Every code change starts from a failing test in the corpus: a suite test seen failing in the group run
counts; for a review finding that changes code, write the test first and see it fail. Rebuild if Java or Scala changed; run only
the tests the change touches; do not rerun a suite (the merged gate does). Update the report sections you change. Return IMPL with
the ledger changes the fixes add.`
const FIXES = [
  cNeeds && { label: 'C-fix', wt: A.wt.K,
    model: blocking(ck['C-review']).some(f => f.owner === 'C-infer') ? T.fable : T.opus,
    prompt: `In K (branch b10/K). Inputs: testFast failures ${JSON.stringify(kRun && kRun.testFast)}; blocking findings
${JSON.stringify(blocking(ck['C-review']))}; handed-over patches ${JSON.stringify(handOvers)} (apply each with the failing test its
author wrote). Minor findings: fix where cheap, else list them in the report. ` + FIX_COMMON },
  lNeeds && { label: 'Lib-fix', wt: A.wt.L, model: T.opus,
    prompt: `In L (branch b10/L). Inputs: appeared ${JSON.stringify(appeared)}; missed
${JSON.stringify(missedSites)}; blocking findings ${JSON.stringify(blocking(ck['Lib-review']))}. An appeared
error caused by a repair is a regression: undo or redo that repair. A missed site is redone by the library's device or left with a
row. Rule 1 for library sites as decided: ${A.libraryEvidence}. Rerun the value tests on the new code. ` + FIX_COMMON },
  wNeeds && { label: 'W-fix', wt: A.wt.W, model: T.opus,
    prompt: `In W (branch b10/W). Blocking findings ${JSON.stringify(blocking(ck['W-review']))}. ` + FIX_COMMON },
].filter(Boolean)
const fixedRaw = await parallel(FIXES.map(f => () => agent(COMMON(f.label, f.wt) + f.prompt,
  { label: f.label, phase: 'Fix', model: f.model, effort: 'high', schema: IMPL })))
const fixed = await settle(FIXES, fixedRaw, IMPL, null)

// ---------- Gate: one build, every run once, on the merged result ----------
phase('Gate')
const parts = [done.W && 'b10/W', CB.length && 'b10/K', LB.length && 'b10/L'].filter(Boolean)
const GATE = (tree, from) => COMMON(tree + '-gate', A.wt.M) + `${from}
Then, on that one build: ant compileAll (runlog), restore global.map, library compile in order. Launch at once, detached: the
distance (run.sh, scratch under ${S}) and ant testFast. When testFast ends: ant testSystem, then the checker count
(checker-count/run.sh), then the 85 programs of explorations/compile-ladder/baseline-2026-09-19/pass-list.txt (compile and run,
two at a time). Poll every 4 minutes at most. Collect: both suites (0 failures; counts against the base's 1,782 and 504 plus the
new tests; testSystem as the sum of its four shards); the pass list; the checker count; the distance by kind, class and crash,
with per-site deltas against the base and against L (${S}/tools/mapline.py): C's clears, and the unmasked errors inside the four
crashed declarations, apart from caused ones. Green iff both suites have no failures and the pass list holds; the measurements are
reported, never red. Return RUN.`
let gate = await agent(GATE('M', `Seed ${A.wt.M} as branch b10/M; merge ${parts.join(', ')} (--no-ff). Stop on any conflict that
is not two disjoint edits of one region (Appendix I is the likely place); commit.`),
  { label: 'M-gate', phase: 'Gate', model: T.sonnet, effort: 'medium', schema: RUN })
if (!gate) gate = await agent(RECOVER('M-gate'), { label: 'M-gate-status', model: T.sonnet, effort: 'low', schema: RUN })
if (!gate || gate.verdict !== 'green') {
  log('Gate red: one fix, one re-gate')
  await agent(COMMON('M-fix', A.wt.M) + `In M (branch b10/M). The gate: ${JSON.stringify(gate)}. Attribute each failure to its piece
(W: walk evaluator; C: checker; G, N: library) and repair it. ` + FIX_COMMON,
    { label: 'M-fix', phase: 'Gate', model: T.opus, effort: 'high', schema: IMPL })
  gate = await agent(GATE('M2', `M (branch b10/M) now holds M-fix's commits on top of the gated merge; do not merge again.`),
    { label: 'M2-gate', phase: 'Gate', model: T.sonnet, effort: 'medium', schema: RUN })
  if (!gate || gate.verdict !== 'green') return { ready: false, reason: 'gate red twice: the director decides', gate, missing }
}

// ---------- Finish ----------
phase('Finish')
const labels = IMPLS.map(p => p.label).filter(l => done[l]).concat(FIXES.map(f => f.label), ['M-fix'])
const fin = await agent(COMMON('finish', A.wt.M) + `The gate is green at code id ${gate.codeId}: ${JSON.stringify(gate)}.
1. Reports: concatenate ${R}/C-infer.md, C-decl.md and C-crash.md into ${R}/C.md; keep W.md, G.md, N.md; write ${R}/REPORT.md
   (what each piece did; distance base 340, then L, then M, by kind, class and crash, read through the per-site lists; what the
   crash repairs unmasked; the checker count; the suite counts) and ${R}/gate/summary.txt (code id, commands, counts, verdicts).
2. Ledger: from ${S}/status/{${labels.join(',')}}.json apply every close, note and new row. Take the ledger from origin/main as it
   is now (git fetch), not from the base, and number new rows from its last row.
3. Make branch b10/land at origin/main. Bring in from b10/M every path changed in ${A.base}..b10/M except the ledger, plus the
   reports and the applied ledger. If origin/main changed any of those paths since ${A.base}, stop and report it. One commit
   naming the four pieces, with the session's attribution lines.
4. sameCodeAsGated = (code id of b10/land) == ${gate.codeId}. Return FIN. Do not push.`,
  { label: 'finish', phase: 'Finish', model: T.sonnet, effort: 'medium', schema: FIN })
return { ready: !!(fin && fin.sameCodeAsGated), fin, gate, missing,
         reviews: { W: ck['W-review'], C: ck['C-review'], Lib: ck['Lib-review'] } }
```

### After the script (the coordinator)

If `ready`, the coordinator adds the `FACTS.md` correction (the written bound `Object`) to the
landing commit; it is an `explorations/` edit, so the code id does not change. Then it runs
`git push origin b10/land:main`. If `origin/main` moved before the push, it rebases. If the
rebase leaves the code id unchanged, it pushes; the gate's result is reused under rule 3.
If not, it runs the Gate and Finish phases again on the new base. It then removes the ten
worktrees and the scratch runs, after checking `git worktree list`.

### The agents at a glance

| Agent | Tier, effort | Reads | Prompt in one line | Output |
|---|---|---|---|---|
| W | Opus, high | brief W, section 4 entries, rows 544/534/588/425/584/585, OverloadedFunction, BuildEnvironments, EvaluatorBase, checker precedents, spec passages, Park extract | promote three tests, write two, see them fail; load refusals for 534 and 544 scoped to keep String loading; upper bound for 588; testSystem once; S1 text | branch b10/W, W.md, IMPL |
| C-infer | **Fable**, high | brief C (593, 604), Functionals, Types, NodeUtil, NonPrimitive:229, functions.tex, inference.tex | probe the varargs type on the compiled path first; promote two tests, write the owed ones; repair applicability, body type, inference; S1 callout and new entry | b10/C-infer, C-infer.md, IMPL |
| C-decl | Opus, high | brief C (563, 574, 605, 597), AbstractMethodChecker, OverloadingChecker, TypeHierarchyChecker, objects.tex, traits.tex | renaming apart, message, field binding, object expression against `comprises`, each test first | b10/C-decl, C-decl.md, IMPL |
| C-crash | Opus, high | base distance output, the four crashed declarations, the checker code the traces name | trace each crash, minimal program, row, repair only small and only in owned files, else hand over | b10/C-crash, C-crash.md, IMPL |
| G | Opus, high | brief G, base per-site list (57), the G sections of FortressLibrary .fss/.fsi, precedents | value test first; repair each site by the library's own device or leave it with a row; testSystem once | b10/G, G.md, IMPL |
| N | Opus, high | brief N, base per-site list (60 + 18), N's sections, List, FortressBuiltin, Writer, RangeInternals | the drop; 590, 602 promoted; the 60 sites; value test; testSystem once | b10/N, N.md, IMPL |
| K-launch | Sonnet, low | the three C branches | seed K, merge, build once, testFast detached | RUN (launched) |
| L-launch | Sonnet, low | G, N branches | seed L, merge, no build, distance detached | RUN (launched) |
| W-review | Opus, high | W diff, W.md, runlog, spec passages | refute against the overloading and inference rules, Conversions, S1 form | REVIEW |
| C-review | Opus, high | K diff, C-*.md, runlog | refute: principled repairs, harness keys, S1 form; owner per finding | REVIEW |
| Lib-review | Opus, high | L diff, G.md, N.md, runlog | refute against Library practice, exclusion rule, ownership, walk values | REVIEW |
| K-collect | Sonnet, medium | runlog, TEST-RESULTS | wait for testFast, report failures | RUN |
| L-collect | Sonnet, medium | distance output, base per-site list, diff | per-site delta with lines mapped; write the line mapper | RUN |
| C-fix / Lib-fix / W-fix | Opus, high (C-fix Fable when C-infer's work is blocked) | collector and review results, handed-over patches | repair test first, no suite rerun | IMPL |
| M-gate | Sonnet, medium | the three group branches | merge, build once, testFast, testSystem, pass list, checker count, distance with deltas | RUN |
| M-fix, M2-gate | Opus high; Sonnet medium | the red gate | only if red: one repair, one re-gate | IMPL; RUN |
| finish | Sonnet, medium | status files, reports, origin/main's ledger | reports, gate summary, ledger rows, one squashed commit, code-id check | FIN |
| *-status | Sonnet, low | one status file | only on an empty return | the stored result |

### Why this shape and not another

- **Batches, not pipelines.** The workflow guidance defaults to `pipeline()`. Here,
  though, the two-slot cap makes the total agent time the bound on wall time, whatever
  the shape. And a resume replays only the longest unchanged prefix of calls in call
  order. In a pipeline the order of later calls depends on timing, so after a restart,
  agents that had finished would run again: for a 2-hour implementer, that means hours of
  tokens and rebuilt code states. A batch issued at once fixes the order. Its cost is the
  tail of each batch, about 0.4 h in Build when the jobs are ordered longest first.
- **C in three agents, split by file.** As one agent, C would take about 4 to 5 hours and
  carry a context of more than 500 k tokens. Split by the files each part owns, the three
  merge without conflict. The one shared hot spot is `NodeUtil.getParamType`, which raises
  both row 604's type and crash 1's "Type is not inferred". It is given to C-infer, and
  C-crash hands its patch over.
- **G and N each one agent.** Their sizes are similar (about 60 sites). Splitting either
  would double the orientation reading and leave an odd number of jobs for two slots.
- **One distance run per group, not per agent.** A run takes 20 minutes. One run on L
  (the library against the base's checker) gives the attribution the brief asks for. M
  gives the rest: C's effect is M minus L, and the crash-unmasked errors fall inside
  declarations that no library piece owns. So no separate run on K is needed.
- **Ledger and row numbers in one place.** Four pieces opening rows in one table would
  collide, and other workers commit too. Rows are therefore numbered once, at landing,
  against `origin/main`.

## 3. How correctness is assured, and where checking pays

**The layers, in the order they act:**

1. **Test first, recorded, never repeated.** Each fix's test is committed before the fix
   and run on the seeded base build. The run log records its code id and verdict.
   Reviewers check the order of runs from the log; they do not rerun, which rule 3 would
   forbid. Promoted tests are seen failing as plain tests. Owed pins (the lone-parameter
   pin, G's and N's value tests) are seen passing before the change and after it.
2. **Each piece's own runs.** Each piece runs its own tests and the must-keep tests the
   brief names, one at a time (about 8 s for a walk test, about 5 s for a compile). W, G
   and N run testSystem once on their final code: 4 minutes covers every library load and
   every walk test, and those three pieces are the ones that can change them.
3. **Group runs.** K runs testFast once, because C is the only piece that touches the
   compiler. L runs the distance once, which shows each library repair's effect against the
   base's checker. It also finds the two failures that no walk test shows: a site that was
   meant to clear and did not, and an error that a repair caused.
4. **Independent review.** There are three reviews, one per group. They are adversarial
   and run on Opus, each with a checklist made from the binding decisions. They cover the
   judgement rules that no test checks:
   - the library's own device, with no cast round the checker;
   - Conversions: nothing changes which declaration runs;
   - the S1 form and Appendix I's six parts;
   - the harness's semantics of `XXX`;
   - ownership.
5. **The merged gate.** testFast and testSystem run with zero failures, and the counts
   must be the base's plus the new tests (testSystem as the sum of its shards). The
   85-program pass list must hold. The checker count and the distance are reported with
   deltas. Errors the crash repairs unmask are kept apart from errors a repair caused.
6. **Landing.** The landed commit's code id must equal the gated one. Otherwise the code
   is gated again.

**Where checking is worth its cost:**

- **The merged gate.** Required by rule 2. About 30 minutes of machine time and about
  110 k tokens.
- **testSystem in W, G and N.** About 4 minutes and a few thousand tokens of polling each.
  W's new load checks reach every type that walk loads. Without this run, a false refusal
  would surface only at the gate, where it costs a fix agent and a 30-minute re-gate.
- **testFast on K.** 11 minutes, which overlap the reviews. Changing the varargs typing
  and inference could break compiled tests in many places. Catching that before the merge
  keeps the cause attributable to C alone and avoids a red gate.
- **The distance on L.** 20 minutes, which overlap the reviews. The brief asks for this
  reading. It is also the only check on the library repairs' real target, the checker's
  error list.
- **The three reviews.** About 0.45 M tokens in all. The library rules ("the library's own
  device", "never a cast", "no walk value change") and the S1 form are what this step
  could get wrong in ways no suite would show. A wrong device lands green and becomes
  precedent.

**Where checking is not worth its cost:**

- **Panels of several skeptics per finding.** The verdicts here come from tests and
  measurements. A review finding is cheap to act on and is checked again at the gate.
- **A distance run per agent, or one on K.** 20 minutes of a core each. The L run and the
  M run attribute everything that is needed.
- **testFast per C agent.** Three times 11 minutes on four cores. Once on K is enough,
  because the three agents own disjoint files.
- **testSystem on L.** G and N each ran it, they own disjoint declarations, and M runs it
  again.
- **Reviewing the runners.** Their output is machine output with internal sums to check
  (shards add up, deltas balance). A wrong parse shows up as an inconsistency at the gate.
- **A separate S1-form checker.** The W and C reviewers read the same text; it is folded
  into their checklists.
- **Re-running anything to confirm.** Forbidden by rule 3, and the run log makes that
  mechanical.

## 4. The estimate

**Agents:** 18 expected.

- The minimum is 15: 6 implementers, 7 in Check, the gate and the finisher, with no
  fixes and no recoveries.
- The maximum is about 23: all three fixes, the re-gate pair and three status readers.

**Tokens written,** in the cost the project counts (cache writes and new input). An
agent writes about 11 k in its first message, and then roughly its final context, if its
cache never lapses.

| Role | Agents | Tokens written | Assumption |
|---|---|---|---|
| Implementers | W 220 k, C-infer 280 k (Fable), C-decl 230 k, C-crash 250 k, G 300 k, N 320 k | 1.60 M | Context sizes come from what each reads: about 12 to 15 tokens per source line (W reads about 3,500 lines; G and N about 2,500 to 3,000 library lines plus messages), plus tool output and about 40 to 60 k of its own edits and notes. |
| Reviewers | W 110 k, C 150 k, Lib 180 k | 0.44 M | Each reads a diff (about 300 to 1,200 lines), the reports and the cited passages. |
| Fixers | C 180 k, Lib 170 k, W 0.3 × 120 k | 0.39 M | C and Lib are likely needed; W only on a blocking finding (probability about 0.3). |
| Launch, collect, gate | K-launch 40 k, L-launch 35 k, K-collect 50 k, L-collect 70 k, M-gate 110 k, M2-gate 0.35 × 90 k | 0.34 M | Small prompts, polls of about 1 k each, parsing. |
| Gate fix | 0.35 × 180 k | 0.06 M | A red first gate, probability about 0.35. |
| Finisher | 100 k | 0.10 M | Composes reports, applies about 25 ledger changes. |
| Coordinator (main session) | | 0.11 M | Phase 0, the launch, reading the result, landing. |
| Contingency | | 0.25 M | One lapsed cache on a large agent (about 250 k) or a few status readers. |
| **Total** | | **≈ 3.3 M** (range 2.5 to 4.5 M) | Fable's share is 0.28 M, or 0.46 M if C-fix escalates. |

**Wall time,** at an Opus implementer's pace of about 25 to 35 s per tool round trip and
120 to 200 round trips:

| Stage | Wall | How it is reached |
|---|---|---|
| Phase 0 | 0.25 h | Seeding takes 3 s a worktree. If the base must be built: about 200 s. A base distance, if needed, runs detached during Build. |
| Build | 4.9 h | Six jobs, longest first, on two slots: N 2.2, G 1.8, C-infer 1.5, C-crash 1.5, W 1.2, C-decl 1.2. A slot sits idle about 0.4 h at the tail. A C iteration costs about 2.6 min (rebuild about 40 s, library compile 110 s, one compile 5 s). |
| Check | 1.1 h | The launchers take 10 and 5 min. The reviews take 25, 35 and 35 min. The collectors start after the reviews, when testFast (about 16 min under load) and the distance (about 24 min under load) have finished. |
| Fix | 0.75 h | Two fixers in parallel, about 45 min each. |
| Gate | 0.75 h | Build and library compile take about 3.5 min. The distance runs alongside testFast, then testSystem, the checker count and the pass list (85 × about 6 s, two at a time), about 31 min of machine time in all, plus merging and parsing. |
| Re-gate | 0.4 h expected | 1.2 h with probability 0.35. |
| Finish and land | 0.5 h | |
| **Total** | **≈ 8.6 h** (7 to 11) | The two-slot cap sets it: total agent time is about 14 h, so 14 / 2 plus the single-slot tail of the gate and finish. |

At 8.6 h, a run that starts more than about 4 hours into the session's 13-hour life will
meet the stop. The design resumes from the journal: finished agents keep their results,
and the unfinished ones continue from their status files and branches. Each restart
still costs about the in-flight agents' contexts written again (0.2 to 0.6 M tokens).

## 5. What I would want measured or decided before running it

**Decisions for the director:**

1. **Rule 1 for library slips (G and N).** Rule 1 asks for a failing test in the corpus
   before every edit of the original tree. A compiled-checker error on the one library
   cannot be held by any test the harness runs today: the compiled corpora check
   `CompilerLibrary`, and the measurements are report-only by decision ("Count never red").
   The brief's own tests for G and N pass before and after. I propose this reading: the
   base per-site list is the failing evidence for a library site, recorded by code id, and
   the walk value test is the test kept. That reading needs his word. The script passes it
   in as `libraryEvidence`.
2. **Row 604's third face against the library route.** `Types.IMMUTABLE_HEAP_SEQ_NAME` is
   resolved from `WellKnownNames.fortressLibrary()` when the class loads. On the compiled
   path that is `CompilerLibrary`, and none of `CompilerLibrary`, `CompilerBuiltin` or
   `CompilerAlgebra` declares `ImmutableArray` (checked by grep). Nothing may be added to
   the prelude. So a compiled test of the positive program (a varargs parameter used as a
   sequence in its body) probably cannot pass before the switch-over. Is the over-acceptance
   test enough for this step, with the positive program held by a row? C-infer is told to
   probe and report rather than route round it. The answer changes C-infer's scope.
3. **The scope of W's Meet Rule over symbolic operators.** `String`'s four families pair
   `(a:Any, self)` with `(self, b:Any)`, the shape the rule refuses, and the brief requires
   that they keep loading. The likely way is to skip symbolic operators as the checker does
   (row 584). That gives walk the same blind spot on purpose. Confirm, or name another way.
4. **Partial landing.** If one piece is blocked, may the other three land (the script's
   default), or does the step land whole or not at all?
5. **Commit shape.** I propose one squashed commit for the step, as the finisher builds it,
   with no untested intermediate states on `main`. The alternative is one commit per piece
   plus an integration commit: easier to read in the history, but only the last state is
   gated. Also confirm the report paths (`explorations/compile-ladder/climb-batch-10/`, with
   `gate/summary.txt` there).
6. **The Fable budget.** C-infer needs about 0.3 M tokens of Fable, or about 0.46 M if the
   C fixer escalates. Is that available this week, or should C-infer run on Opus at its
   highest effort?

**Measurements (each a few minutes, none on the critical path):**

7. **Whether a `nohup setsid` job outlives the agent that started it.** The
   launch, review and collect overlap depends on it. If it does not, the launchers must
   hold their slots until the run ends, which adds about 0.5 h.
8. **Whether the distance measurement can run on one unit** (for example `FortressLibrary`
   alone, 732 s of the 1,212). If it can, G and N could check their own sites before they
   return, and L's fix round would shrink or disappear.
9. **One C iteration on this machine:** Scala rebuild, library compile, one compiled test.
   I assumed about 2.6 minutes. If it is more than about 4 minutes, the C agents should
   batch several rows per rebuild.
10. **The base's reusable evidence.** Is there a gate summary and a distance per-site list
    (with the run's output, for C-crash's traces) whose code id is the base's? If not, one
    distance run goes into Phase 0.
11. **The session's uptime** against the stop at 46,636 s. Free disk: ten worktrees at
    206 MB each, plus parser directories at 5.8 MB per grammar-importing run.
12. **The harness's slot order.** That `parallel()` with more thunks than slots starts them
    first in, first out, in array order. Both the longest-first ordering and the
    reviews-before-collectors overlap depend on it.
