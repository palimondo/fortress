# Design: the four-piece step in ultracode, Fable-led (blind design)

Designed from `blind-brief/content.md` and `blind-brief/requirements.md`, the project skill `.claude/skills/fortress-repo/`, the source tree at the base, the specification, the gap ledger and `repo-internals.md`; no batch record, workflow script or other design was read. The base is the commit the brief's line numbers belong to (`cec70988b`; its `changes.tex` entries sit at the brief's lines 1004, 1257, 1559 and 2127, and the ledger ends at row 609). Models are named by tier only: Fable (strongest), Opus, Sonnet. No cost is estimated here.

## 1. The design in plain words

**Shape.** Five workflows in sequence, each one resumable, with the coordinator (a Fable session) reading the results between them: *Read*, *Build*, *Review*, *Integrate and gate*, *Record and land*. The four pieces W, C, G and N each get a branch cut from the base (`step10/w`, `step10/c`, `step10/g`, `step10/n`) in a worktree seeded from one base build. Inside a piece the work is cut into *groups*: a defect or a crash for W and C, a library section for G and N (twenty-four groups in all, listed in section 2). A group is the unit of reading, of test-first implementation and of review; a piece is the unit of branch, suite run, measurement and report; the merged tree is the unit of the gate and of landing.

**Read.** Every group is diagnosed twice, independently, by two Fable readers with different starting points (one from the error and the body outward, one from the specification passage and the library's precedents inward), and a third Fable adjudicator resolves them against the code into a *work order*: the cause, the precedent at file and line, the edit as a sketch, the tests to write with their keys and asserted values, the failing text expected on the base, and the sites to leave with a ledger row because only the checker could repair them. The six hardest groups (rows 593, 604 and 597, the four crashes, and row 588) go through a judge panel instead: three independent approaches, scored by a judge on fit to the cited passage, blast radius on the "must keep its verdict" lists and testability through the harness keys. A boundary auditor then reads all twenty-four work orders at once for two pieces touching one declaration, a test name used twice, or an item the brief lists under "not this piece's". Readers run probes only against the base build through `old-fortress.sh`; they edit nothing.

**Build.** One agent per piece writes all of the piece's tests first (the promotions by `git mv` and re-key, the owed tests, the pins), commits them test-only, one commit per group, and sees them fail or pin on the unedited seeded worktree, which is the base's code; for the library sites that no walk test can see fail, the before is the error's row in the landed per-site list, cited. Then one fresh agent per group, in sequence on the piece's branch, makes its fix, builds what its edit reaches (W and C: `ant compileAll`; G and N: nothing), sees its tests pass through the harness, commits with the original-tree flag and the footer, and pushes. A finisher per piece runs the suite the piece reaches once on its final code and the measurements once (C: checker count and distance; G and N: distance; W: none, by the skill's rule), reads the per-site list with lines mapped through the diff, and writes the committed piece report. The machine runs two agents at a time, so the four pieces advance two abreast, and the script serializes the heavy runs (a whole suite, a distance, the gate) so that at most one holds the four JVMs or the 4 GB at once.

**Review.** Per piece: two Sonnet auditors for what is mechanical (paths and declarations touched against the ownership map, team test lines untouched, test commit before fix commit, no scratch, no model identifier, `global.map` intact), three lensed refuters told to refute (library practice and the cited passage: Fable; blast radius and the "not this piece's" list: Fable; the measurement's site mapping recomputed independently: Opus, a different tier for a different blind spot), and a Fable completeness critic walking the brief's "What done means" item by item. Blocking findings go to a repair agent in the piece's worktree; a repair that touches code sends the piece back through its finisher, since its suite and measurement are then stale; at most three rounds.

**Integrate and gate.** A Fable merger builds `step10/integration` from the base by merging the four branches with the ownership map in hand; a Sonnet gate runner runs the gate as `gate.md` gives it on a clean build of that tree, after an eight-second walk smoke that loads the whole library under W's new checks; red means a Fable triage, a fix on the integration branch (test-first where it edits the original tree) and a gate on the new code, at most three times. The gate's tables are committed in the landed form.

**Record and land.** A Fable records agent, alone, folds the ledger rows, the FACTS correction and the step report into the integration branch; a Sonnet verifier checks the record against the brief's lists; the coordinator fast-forwards `main`, pushes `main`, then the re-provision branch.

**Why this shape.** The pieces are independent by construction (brief section 3), so parallelism across pieces carries no merge risk beyond `FortressLibrary` at disjoint declarations and `changes.tex` at distinct entries; the two-slot harness on four cores means pipelining across pieces is the only parallelism that pays, so the fan-out goes into reading and review (which judge) rather than into implementation (which builds); rule 3 makes one base build, seeded worktrees and one gate on the merged tree the only lawful shape; rule 1 fixes the order inside every group; and the double reading, the judge panels and the refuting review are where the step's real failure mode lives: a repair that is not the library's own device, a check that reads the passage wrongly, or a measurement read off the misfiled class table instead of the per-site list.

## 2. The script, as a skeleton with every agent

Five scripts, run in order; each is relaunched with `scriptPath` and `resumeFromRunId` after a stop. Common definitions first, then the five bodies. Prompts are given in summary; every prompt begins with the preamble.

### 2.1 Common definitions

```js
// args, identical byte for byte on every launch and resume (saved under /home/user/fortress/tmp/step10/):
// { base: '<full 40-char hash of the base>', baseBuild: '/home/user/fortress-base10',
//   stepDir: 'explorations/compile-ladder/climb-batch-10',
//   wt: { W:'/home/user/step10-w', C:'/home/user/step10-c', G:'/home/user/step10-g', N:'/home/user/step10-n',
//         I:'/home/user/step10-integration' },
//   br: { W:'step10/w', C:'step10/c', G:'step10/g', N:'step10/n', I:'step10/integration' },
//   scratch: '/home/user/step10-scratch',          // readers' probes; outside every tree
//   tiers: { fable:'<resolved at launch>', opus:'<resolved at launch>', sonnet:'<resolved at launch>' } }
const T = args.tiers
const BRIEF = 'explorations/coordinator/process-engineering/blind-brief/content.md'
const REQ   = 'explorations/coordinator/process-engineering/blind-brief/requirements.md'
const SKILL = '.claude/skills/fortress-repo/SKILL.md'
const REF   = p => `.claude/skills/fortress-repo/references/${p}.md`

// The preamble every agent gets. It names the skill parts to load; it never pastes CLAUDE.md.
const PREAMBLE = (parts, tree) => `
Recover first: if ${tree} exists, read its git log, its tmp/PROGRESS.md and the EXIT lines of its tmp/*.log
before doing anything; a finished log stands; continue at the first step not done. Never start a second copy of
a run whose log has no EXIT line yet.
Load ${SKILL}, then exactly these parts: ${parts.map(REF).join(', ')}. Do not load references/sources.md.
Read ${REQ} whole and the sections of ${BRIEF} your task names, plus section 4 (the decisions) by the headings
your piece cites.
Shell: cd ${tree}; source explorations/experiment/env.sh once; export TMPDIR=${tree}/tmp and
JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=${tree}/tmp"; check echo $FORTRESS_HOME prints ${tree}; df -h / first.
Long commands: run_bg + wait_for in polls under 270 s, never ant through tail. Never wipe the caches; after every
ant compileAll run git checkout -- default_repository/caches/global.map. Stop only your own processes.
Commit only the paths you wrote (git add -- <paths> && git commit -m ... -- <paths>), with the footer the skill
gives, no model identifier anywhere; push your branch after every commit. Never touch /home/user/fortress or
the base build except through old-fortress.sh. Write tmp/PROGRESS.md after each step.
Your final text is data for the script: fill the schema; quote runs as two to five lines each with its command.`

// Groups: the unit of reading, test-first implementation and review. Sites and lines are the brief's.
const GROUPS = [
  // W: walk's evaluator only. Tests in ProjectFortress/tests/.
  { id:'W1', piece:'W', hard:false, title:'rows 544 and 534: load-time refusal of an uncovered functional-method meet and of a written-Any single parameter',
    files:['interpreter/evaluator/values/OverloadedFunction.java','interpreter/evaluator/BuildEnvironments.java'],
    tests:{ promote:['XXXFunctionalMethodMeetInherited','XXXOverloadSingleParamBoundAny'],
            owed:['meet declared and covered-by-two-declarations both load (plain, passes before and after)',
                  'no-extends type parameter beside a written Any still loads (pin)'] },
    keep:['ComprisesMeetWalk','GenericBesidePlainTwoBounds','ComprisesUnlistedExtender','String symbolic families load'] },
  { id:'W2', piece:'W', hard:true,  title:'row 588, the lone-parameter pin, the stale reductions sentence',
    files:['interpreter/evaluator/EvaluatorBase.java','types/FType.java','types/TypeLatticeOps.java',
           'Specification/basic/inference.tex','Specification/basic/expressions/reductions.tex','Specification/appendices/changes.tex'],
    tests:{ promote:['XXXInferContravariantWalk'], owed:['lone-parameter pin: Fruit,Fruit over Apple,Pear,Pear; Any,Any over Apple,Cherry,Apple'] },
    keep:['InferUnfixedBoundWalk','InferLoneUnboundedWalk','simpleSum','setSum','expected failures 549 587 589 591 592','unwritten SUM stays an expected failure'] },
  // C: the compiled checker. Tests in ProjectFortress/compiler_tests/. Each fix: ant compileAll, global.map, library order.
  { id:'C1', piece:'C', hard:false, title:'row 563: abstract-method check renames the inherited method\'s static parameters apart (note on row 561)',
    files:['scala_src/typechecker/AbstractMethodChecker.scala'], tests:{ promote:['XXXInheritedAbstractMethodStaticParamSameName'] } },
  { id:'C2', piece:'C', hard:true,  title:'row 593: a lone type parameter with a dependent bound takes the narrowest candidate',
    files:['scala_src/typechecker/impls/Functionals.scala'], tests:{ promote:['XXXInferDependentBound','InferDependentBoundLink'] } },
  { id:'C3', piece:'C', hard:true,  title:'row 604: varargs applicability (none, five, six) and the body type ImmutableArray[T, ZZ32]; functions.tex callout and a new Appendix I entry',
    files:['nodes_util/NodeUtil.java','compiler/Types.java','scala_src/typechecker/impls/Functionals.scala','Specification/basic/functions.tex','Specification/appendices/changes.tex'],
    tests:{ promote:['XXXVarargsNoTrailingArgument'], owed:['five and six varargs arguments','a varargs parameter used as a sequence in its body'] } },
  { id:'C4', piece:'C', hard:false, title:'row 605: a naked field reference reads the field, not the inherited getter',
    files:['scala_src/typechecker/ (where an object\'s names are bound for its body)'], tests:{ promote:['XXXFieldBesideInheritedGetter'] } },
  { id:'C5', piece:'C', hard:false, title:'row 574: the duplicate-domain message names the first parameter',
    files:['scala_src/typechecker/OverloadingChecker.scala (message only)'], tests:{ owed:['functional method with self second, keyed on the fixed message, failing on the base'] } },
  { id:'C6', piece:'C', hard:true,  title:'row 597, checker half: an object expression read against comprises; changes.tex entry "The traits that extend a closed trait"',
    files:['scala_src/typechecker/TypeHierarchyChecker.scala','scala_src/typechecker/AbstractMethodChecker.scala','Specification/appendices/changes.tex'],
    tests:{ owed:['compile_err_contains test of the new error, or the row note saying what blocks it'] } },
  { id:'C7', piece:'C', hard:true,  title:'crash 1: __bigOperator\'s local body(i), "Type is not inferred"' , files:['the file the trace names'], tests:{ owed:['minimal program as an XXX test keyed on the crash output, or the row alone'] } },
  { id:'C8', piece:'C', hard:true,  title:'crashes 2 and 3: untyped fn in the rank-2 and rank-3 array traits\' for loops', files:['the file the trace names'], tests:{ owed:['as C7'] } },
  { id:'C9', piece:'C', hard:true,  title:'crash 4: Stream\'s variance check, OptionUnwrapException', files:['the file the trace names'], tests:{ owed:['as C7'] } },
  // G: FortressLibrary sections. No build. Tests in ProjectFortress/tests/ (pins by topic).
  { id:'G1', piece:'G', hard:false, title:'generator support, 10 sites: __loop, __whileCond, __bigOperator2, Condition (three MB)', lines:'.fss 1061-1419, .fsi 675-939' },
  { id:'G2', piece:'G', hard:false, title:'Maybe (Just.map), Indexed and the Deleg trait, 3 sites', lines:'.fss 1454-1616, 1810-1888, 1940-1954' },
  { id:'G3', piece:'G', hard:false, title:'reductions I, 16 sites: AssociativeReduction MB, LiftedCommutativeMonoidReduction, MonoidReduction, the two identities (I3), eight simpleJoin (D1)', lines:'.fss 3022-3777 part' },
  { id:'G4', piece:'G', hard:false, title:'reductions II, 11 sites: BIG MIN, BIG MINNUM, BIG //, embiggen (BR), MIMapReduceReduction, SimpleMappedIndexed, NestedGenerator, PairGenerator, NaiveSeqGenerator', lines:'.fss 3022-3777 part' },
  { id:'G5', piece:'G', hard:false, title:'generators of generators and relational predicates, 17 sites (mostly NM)', lines:'.fss 4564-4695, .fsi 2634-2692' },
  // N: numbers, orderings, List, natives. No build. Tests in ProjectFortress/tests/.
  { id:'N7', piece:'N', hard:false, title:'row 590: MatchFailure extends UncheckedException in both files', tests:{ promote:['XXXTypecaseNoMatchUncheckedWalk'] }, keep:['TypecaseNoMatchWalk'] },
  { id:'N8', piece:'N', hard:false, title:'row 602: StridedFullRange3D\'s shiftLeft and shiftRight', tests:{ promote:['XXXStridedRange3DShiftWalk'] } },
  { id:'N1', piece:'N', hard:false, title:'the drop: builtinPrimitive, fail, nullary BIG <| back to the team\'s unbounded declaration; 18 sites; row 560 first part; FACTS line', tests:{ owed:['pins: fail, a List comprehension, a Writer call'] } },
  { id:'N3', piece:'N', hard:false, title:'numeric hierarchy, 11 sites: simplestRationalBetween, QQ, Integral (I3), ZZ64, ZZ' },
  { id:'N4', piece:'N', hard:false, title:'LexicographicOrder, partition, strToFloat, the tuples\' < and CMP (G1, 18 sites), 21 sites' },
  { id:'N5', piece:'N', hard:false, title:'List.fss, 20 sites, and its export check' },
  { id:'N6', piece:'N', hard:false, title:'FortressBuiltin (UnsignedLong, Boolean.cross, export) and Writer (export), 5 sites' },
  { id:'N2', piece:'N', hard:true,  title:'assert and deny (asDebugString on Any), shouldRaise and __thrower (throw ForbiddenException): list the library\'s ways; a site with no way is a row', tests:{ owed:['pins'] } },
]
const PIECES = ['W','C','G','N']
const groupsOf = P => GROUPS.filter(g => g.piece === P)     // the array order above is the build order
const PARTS = {
  W:['area-interpreter','build-and-caches','tests-writing','tests-running','worktrees','machine','committing','area-specification','area-records'],
  C:['area-compiler','build-and-caches','tests-writing','tests-running','worktrees','machine','committing','area-specification','area-records','checker-measurements'],
  G:['area-library','tests-writing','tests-running','worktrees','machine','committing','area-records','checker-measurements'],
  N:['area-library','tests-writing','tests-running','worktrees','machine','committing','area-records','checker-measurements'],
}

// Heavy runs (a whole suite, a distance, a gate) one at a time machine-wide, whatever the slot count.
const heavy = (() => { let q = Promise.resolve(); return fn => { const r = q.then(fn, fn); q = r.catch(() => {}); return r } })()

// One retry for a null return (the harness marks an agent failed on a safety-filter false positive).
const once = async (fn) => { const r = await fn(); return r === null ? await fn() : r }

// Schemas (JSON Schema, root object). Abbreviated here; the real script spells every property.
const DIAGNOSIS  = { type:'object', required:['group','items'], properties:{ group:{type:'string'}, items:{type:'array', items:{type:'object', required:['site','cause','precedent','edit','tests','beforeOnBase','walkValueChanges','disposition'],
  properties:{ site:{type:'string'}, cause:{type:'string'}, precedent:{type:'string'}, edit:{type:'string'}, tests:{type:'array', items:{type:'string'}}, beforeOnBase:{type:'string'}, walkValueChanges:{type:'boolean'}, disposition:{enum:['repair','row','question']}, reason:{type:'string'} } } }, questions:{type:'array', items:{type:'string'}} } }
const WORK_ORDER = { type:'object', required:['group','steps','tests','rows','questions','confidence'], properties:{ group:{type:'string'}, steps:{type:'array', items:{type:'string'}}, tests:{type:'array', items:{type:'object', required:['name','corpus','kind','keys','asserts','expectedOnBase'], properties:{ name:{type:'string'}, corpus:{type:'string'}, kind:{enum:['promote','new-failing','pin']}, keys:{type:'string'}, asserts:{type:'string'}, expectedOnBase:{type:'string'} } } }, rows:{type:'array', items:{type:'string'}}, questions:{type:'array', items:{type:'string'}}, confidence:{enum:['high','medium','low']} } }
const APPROACH   = { type:'object', required:['group','where','how','whyThisPassage','risks','tests'], properties:{ group:{type:'string'}, where:{type:'string'}, how:{type:'string'}, whyThisPassage:{type:'string'}, risks:{type:'array', items:{type:'string'}}, tests:{type:'array', items:{type:'string'}} } }
const RESULT     = { type:'object', required:['group','commits','failingRuns','passingRuns','repairs','rows','specPassages','codeChanged','blocked'], properties:{ group:{type:'string'}, commits:{type:'array', items:{type:'string'}}, failingRuns:{type:'array', items:{type:'string'}}, passingRuns:{type:'array', items:{type:'string'}}, repairs:{type:'array', items:{type:'object', required:['site','device','wayNotTaken'], properties:{ site:{type:'string'}, device:{type:'string'}, wayNotTaken:{type:'string'} } } }, rows:{type:'array', items:{type:'string'}}, specPassages:{type:'array', items:{type:'string'}}, codeChanged:{type:'boolean'}, blocked:{type:'string'} } }
const FINDINGS   = { type:'object', required:['piece','findings'], properties:{ piece:{type:'string'}, findings:{type:'array', items:{type:'object', required:['severity','where','what','how'], properties:{ severity:{enum:['blocking','note']}, where:{type:'string'}, what:{type:'string'}, how:{type:'string'} } } } } }
const GATE       = { type:'object', required:['commit','green','suites','red','distance','checkerCount','tables'], properties:{ commit:{type:'string'}, green:{type:'boolean'}, suites:{type:'object'}, red:{type:'array', items:{type:'string'}}, distance:{type:'string'}, checkerCount:{type:'string'}, tables:{type:'array', items:{type:'string'}} } }
```

### 2.2 Workflow 1: `batch10-read`

```js
export const meta = { name:'batch10-read', description:'Diagnose the 24 groups twice, adjudicate, judge the hard ones, audit boundaries',
  phases:[ {title:'Diagnose'}, {title:'Adjudicate'}, {title:'Panel'}, {title:'Boundary'} ] }

const readerPrompt = (g, stance) => PREAMBLE(PARTS[g.piece].concat(['worktrees']), args.scratch + '/' + g.id) + `
You are reader ${stance} for group ${g.id} of piece ${g.piece}: ${g.title}. Read the brief's piece ${g.piece} whole and
its sections 1, 3, 5 and 6, and the decisions it cites by heading. ${stance === 'A'
  ? 'Start from each site: the error row in the landed per-site list (explorations/compile-ladder/gate/distance-sites.tsv at the base, or the row\'s reproducer), the body at the brief\'s line, the callers; then find the library\'s precedent for the same kind of slip and the specification passage.'
  : 'Start from the cited specification passage and the decisions, then from the library\'s precedents the brief lists under "existing code to read first"; only then read the site, and check that the precedent really fits it.'}
For each site or defect: the cause; the precedent at file:line; the edit as a sketch that follows the library's own
device or the checker's existing pattern (capture-avoiding renaming, withoutSelf, makeVarargsParamType ...); the
tests (name by topic, corpus, keys, asserted value); the text the base will print when the test fails (run the probe
against the base build through old-fortress.sh with a private caches folder under ${args.scratch}/${g.id}; edit no
tree, build nothing); whether walk's printed value would change; and the disposition: repair, row (only the checker
could repair it, or a repair would change a walk value or a team test line), or question (needs Pavol). Name every
"not this piece's" item you meet and leave it. Fill the DIAGNOSIS schema.`

const adjudicatorPrompt = (g, a, b) => PREAMBLE(PARTS[g.piece], args.scratch + '/' + g.id) + `
Two independent diagnoses of group ${g.id} follow as JSON. Where they agree, confirm against the code at the brief's
lines; where they differ, read the code and the precedent and decide, saying why; where neither convinces you, mark
the site a row or a question, never a guess. Order the steps so that every test precedes the edit it fails on and the
riskiest edit comes last. Fill the WORK_ORDER schema.\nA: ${JSON.stringify(a)}\nB: ${JSON.stringify(b)}`

const approachPrompt = (g, angle) => PREAMBLE(PARTS[g.piece], args.scratch + '/' + g.id) + `
Group ${g.id}: ${g.title}. Produce one complete approach from the angle "${angle}": where the fix goes (file, method),
how, which sentence of the cited passage it implements, what on the "must keep its verdict" list it could disturb and
why it does not, and the tests that would hold it. Probe against the base build only. Fill the APPROACH schema.`
const ANGLES = ['the smallest change at the site the trace or message names',
                'the root cause in the solver or checker that the site is one face of',
                'a transplant of the pattern the checker or walk already uses elsewhere for the same problem']

const judgePrompt = (g, approaches, a, b) => PREAMBLE(PARTS[g.piece], args.scratch + '/' + g.id) + `
Three approaches and two diagnoses for ${g.id} follow. Score each approach on: fit to the cited passage (the brief's
decisions win over the early text); blast radius against the piece's "must keep its verdict" list and the "not this
piece's" list; testability through the harness keys the brief gives (section 1, "What a test can hold"). Pick the
winner, graft what the others do better, and write the WORK_ORDER. For a crash: the repair is taken only when the
trace finds a few lines in the checker and the text says what the checker should report; otherwise the row alone.
${JSON.stringify({approaches, a, b})}`

phase('Diagnose')   // 2 readers per group (48 agents), queued two at a time by the harness
const diag = await pipeline(GROUPS,
  g => parallel(['A','B'].map(s => () => once(() => agent(readerPrompt(g, s), { phase:'Diagnose', label:`${g.id} reader ${s}`, model:T.fable, effort:'max', schema:DIAGNOSIS })))),
  (ab, g) => g.hard
    ? parallel(ANGLES.map(an => () => once(() => agent(approachPrompt(g, an), { phase:'Panel', label:`${g.id} ${an.slice(0,24)}`, model:T.fable, effort:'max', schema:APPROACH }))))
        .then(aps => once(() => agent(judgePrompt(g, aps.filter(Boolean), ab[0], ab[1]), { phase:'Panel', label:`${g.id} judge`, model:T.fable, effort:'max', schema:WORK_ORDER })))
    : once(() => agent(adjudicatorPrompt(g, ab[0], ab[1]), { phase:'Adjudicate', label:`${g.id} adjudicator`, model:T.fable, effort:'max', schema:WORK_ORDER })))
const orders = diag.filter(Boolean)
log(`${orders.length}/${GROUPS.length} work orders; missing: ${GROUPS.filter(g => !orders.find(o => o.group === g.id)).map(g => g.id).join(' ') || 'none'}`)

phase('Boundary')
const boundary = await once(() => agent(PREAMBLE(['area-library','area-records'], args.scratch + '/boundary') + `
Read all work orders (JSON below) against brief section 3: no two touch one declaration, trait body or operator;
no test name is used twice across pieces; nothing listed under any piece's "not this piece's" is scheduled; every
item of every piece's "Tests promoted" and "Tests owed" appears in exactly one order; every question for Pavol is
listed once. Return FINDINGS (piece = the group id).\n${JSON.stringify(orders)}`,
  { phase:'Boundary', label:'boundary auditor', model:T.fable, effort:'max', schema:FINDINGS }))
return { orders, boundary }
```

The coordinator reads the orders and the boundary findings, fixes order collisions by hand (an order is a JSON value; the fixed set is saved as the next workflow's `args.orders`), and puts the questions to Pavol in plain text, one at a time; a group whose question blocks it is marked `row` in its order and the step goes on without it.

### 2.3 Workflow 2: `batch10-build`

```js
export const meta = { name:'batch10-build', description:'Seed four worktrees; per piece: tests first, then one agent per group, then the finisher',
  phases:[ {title:'Seed'}, {title:'Tests first'}, {title:'Fix'}, {title:'Finish'} ] }
// args as in 2.1 plus orders: the 24 work orders from batch10-read, as fixed by the coordinator.
const orderOf = id => args.orders.find(o => o.group === id)

phase('Seed')
await once(() => agent(PREAMBLE(['worktrees','build-and-caches','machine','committing'], args.baseBuild) + `
Check the base build ${args.baseBuild} is at ${args.base} and clean (an untracked file makes the seeding script refuse;
report it, do not delete it, and ask). If no base build exists, make one as worktrees.md says (the only build of the
base; about 200 s; background and poll). Then seed ${PIECES.length} worktrees with seed-worktree.sh: ${PIECES.map(P => `${args.wt[P]} on new branch ${args.br[P]} from ${args.base}`).join('; ')}.
Push each new branch (git push -u origin <branch>). Report df -h / and free -g. Return the paths and the SHA each branch is at.`,
  { phase:'Seed', label:'seed worktrees', model:T.sonnet, effort:'low' }))

const testsFirstPrompt = P => PREAMBLE(PARTS[P], args.wt[P]) + `
Piece ${P}. Your tree is the base's code, seeded and built; edit no source under the original tree. From the work
orders (JSON below), write every test of the piece: promotions by git mv of the .fss and .test to a plain name by
topic, re-keyed as the order says; new failing tests; pins that assert today's value. Cite the specification by file
and section, never by line. Commit test-only, one commit per group, message flagged as an original-tree edit with the
footer, and push. Then run all tests of one corpus together in one JVM through harness-one.sh (tests/) or junit.sh
(compiler_tests/): record, per test, the failing lines (a promoted test fails as a plain test; a pin passes) with the
command. For a library site no walk test can see fail, record its row in the landed per-site list at the base as the
before. Return RESULT per group (commits, failingRuns, passingRuns for pins).\n${JSON.stringify(groupsOf(P).map(g => orderOf(g.id)))}`

const fixPrompt = (P, g, prior) => PREAMBLE(PARTS[P], args.wt[P]) + `
Piece ${P}, group ${g.id}: ${g.title}. The tests exist and were seen failing on the base (results below). Make the fix
the work order describes, by the library's own device or the checker's existing pattern; where the order says "row",
write the row's line as finished prose and change nothing. ${P === 'C' ? 'Use the quick javac/scalac loop for iteration, then the real ant compileAll, global.map restore and the library order before junit.sh.' : P === 'W' ? 'ant compileAll and the global.map restore; no library order is needed for walk.' : 'No build: walk re-reads the library.'}
See your tests pass through the harness in your last run after your last edit; a test that must change is a new
test-only commit first, seen failing through old-fortress.sh on the base build. ${P === 'W' || P === 'C' ? 'Specification edits in the S1 form: callout at the passage, Appendix I entry, original text kept; list every sentence your change makes false.' : 'A repair that would change a value walk prints, or a team test line, is left with a row instead.'}
Commit the fix with the original-tree flag and the footer; push. Return RESULT.\nPrior results: ${JSON.stringify(prior)}`

const finishPrompt = (P, results) => PREAMBLE(PARTS[P].concat(['checker-measurements','tests-running']), args.wt[P]) + `
Piece ${P} is implemented (results below). On this final code, once: ${P === 'W' ? 'ant testSystem' : P === 'C' ? 'ant testFast, then the checker count and the distance (background, polled)' : 'ant testSystem, then the distance (background, polled)'}.
${P === 'W' ? 'Do not run the measurements: every path of this piece is one they cannot see; say so, naming the paths.' : 'Read the distance by the per-site list (tmp/dist/errors.tsv) against the landed list at the base, mapping lines through git diff ' + args.base + '..HEAD; never by the class table (row 577). Name every site cleared, every site that stayed with its row, and every error that appeared, as unmasked (behind a repaired crash) or as caused.'}
Write ${args.stepDir}/report-${P}.md in the form the newest landed piece report has (find it with git log -1 --name-only on the stepDir pattern of the skill): what done means item by item, each repair with the way not taken, the failing and passing lines with their commands, the sites left with their rows, walk values changed with before and after, the specification passages changed, and the finished prose for the ledger, FACTS and PLAN lines. Commit the report alone; push. Return RESULT (group '${P}-final').\n${JSON.stringify(results)}`

const built = await parallel(PIECES.map(P => async () => {
  phase('Tests first')
  const tf = await once(() => agent(testsFirstPrompt(P), { phase:'Tests first', label:`${P} tests first`, model:T.fable, effort:'max', schema:{ type:'object', required:['results'], properties:{ results:{ type:'array', items:RESULT } } } }))
  const results = tf ? tf.results : []
  for (const g of groupsOf(P)) {                      // sequential inside a piece: one branch, one worktree, fresh context per group
    const r = await once(() => agent(fixPrompt(P, g, results), { phase:'Fix', label:`${g.id} fix`, model:T.fable, effort:'max', schema:RESULT }))
    results.push(r || { group:g.id, blocked:'agent returned null twice', commits:[], failingRuns:[], passingRuns:[], repairs:[], rows:[], specPassages:[] })
  }
  const fin = await heavy(() => once(() => agent(finishPrompt(P, results), { phase:'Finish', label:`${P} finisher`, model:T.fable, effort:'max', schema:RESULT })))
  return { piece:P, results, final:fin }
}))
return built.filter(Boolean)
```

### 2.4 Workflow 3: `batch10-review`

```js
export const meta = { name:'batch10-review', description:'Per piece: mechanical audits, three lensed refuters, completeness critic; repair and re-finish until clean',
  phases:[ {title:'Audit'}, {title:'Refute'}, {title:'Repair'} ] }
// args as before plus built: the result of batch10-build.
const LENSES = [
  { lens:'library practice and the cited passage: is each repair the library\'s own device, each check the passage\'s sentence, each S1 callout and entry in form with the original kept? Try to show one is not.', tier:'fable' },
  { lens:'blast radius: run, under this piece\'s build, the programs of the "must keep its verdict" list and probes for every case the brief says the change must treat correctly; try to find a verdict that moved or a "not this piece\'s" item touched.', tier:'fable' },
  { lens:'the measurement: recompute the per-site mapping of tmp/dist/errors.tsv against the landed list through the diff yourself; try to find a site the report calls cleared that is only moved, or an appeared error called unmasked that is caused.', tier:'opus' },
]
const auditPrompt = (P, which) => PREAMBLE(['committing','tests-writing','area-library'], args.wt[P]) + (which === 'scope' ? `
Mechanical scope audit of ${args.br[P]} against ${args.base}: git diff --name-only must lie inside the piece's files
(brief, "Files and lines it changes") and outside its "Not" list; for G and N map every hunk of FortressLibrary.fss/.fsi
to the declaration it is in and check it against section 3's ownership; no file of the compiler's prelude, no model
line, no file under Specification-1.0-frozen, no tool, no coordinator record; git diff --diff-filter=M on the test
corpora shows only re-keyed promoted .test files; renames are renames (git log --follow); global.map not deleted; no
file under tmp/ or any log committed; no model identifier in any commit (grep the patches); the footer on every commit.` : `
Order audit of ${args.br[P]}: for every group the test-only commit precedes the fix commit; the report quotes a failing
run on the base and a passing run after the last code change, each with its command; every "Tests promoted" and "Tests
owed" item of the brief is a file in the corpus; every XXX file promoted is gone under its XXX name.`) + ` Return FINDINGS.`

const refutePrompt = (P, L, built) => PREAMBLE(PARTS[P].concat(['checker-measurements']), args.wt[P]) + `
Refute piece ${P}. Lens: ${L.lens} Default to a finding when uncertain; a finding names the file, the line and how to
show it. Return FINDINGS.\n${JSON.stringify(built)}`
const criticPrompt = (P, built) => PREAMBLE(PARTS[P], args.wt[P]) + `
Completeness critic for piece ${P}: walk the brief's "What done means" for the piece item by item (behaviour, ledger
lines, tests promoted, tests owed, must keep its verdict, specification passages, the report) and section 3's joint
conditions; each item not shown done in the tree or the report is a blocking finding. Return FINDINGS.\n${JSON.stringify(built)}`
const repairPrompt = (P, findings) => PREAMBLE(PARTS[P], args.wt[P]) + `
Repair piece ${P} for these blocking findings only; test first for any original-tree edit (new test-only commit, seen
failing through old-fortress.sh on the base build); commit and push. Say whether code under ProjectFortress/ or
Library/ changed (then the suite and measurement are stale). Return RESULT.\n${JSON.stringify(findings)}`

const reviewed = await parallel(args.built.map(b => async () => {
  let state = b, round = 0
  while (round < 3) {
    const P = b.piece
    const all = await parallel([
      () => agent(auditPrompt(P, 'scope'), { phase:'Audit', label:`${P} scope`, model:T.sonnet, effort:'low', schema:FINDINGS }),
      () => agent(auditPrompt(P, 'order'), { phase:'Audit', label:`${P} order`, model:T.sonnet, effort:'low', schema:FINDINGS }),
      ...LENSES.map(L => () => agent(refutePrompt(P, L, state), { phase:'Refute', label:`${P} ${L.lens.slice(0,18)}`, model:T[L.tier], effort:'max', schema:FINDINGS })),
      () => agent(criticPrompt(P, state), { phase:'Refute', label:`${P} critic`, model:T.fable, effort:'max', schema:FINDINGS }),
    ])
    const blocking = all.filter(Boolean).flatMap(f => f.findings).filter(f => f.severity === 'blocking')
    log(`${P} round ${round}: ${blocking.length} blocking`)
    if (!blocking.length) return { piece:P, clean:true, state }
    const rep = await once(() => agent(repairPrompt(P, blocking), { phase:'Repair', label:`${P} repair ${round}`, model:T.fable, effort:'max', schema:RESULT }))
    if (rep && rep.codeChanged) {        // a verdict stands only for the code it ran on: re-finish (finishPrompt as in 2.3)
      state = { ...state, final: await heavy(() => once(() => agent(finishPrompt(P, [...state.results, rep]), { phase:'Repair', label:`${P} re-finish ${round}`, model:T.fable, effort:'max', schema:RESULT }))) }
    }
    round++
  }
  return { piece:b.piece, clean:false, state }
}))
return reviewed.filter(Boolean)
```

(The finisher re-runs only when the repair changed code under `ProjectFortress/` or `Library/`; a report-only repair keeps the suite verdict, which is the rule the gate itself follows. `finishPrompt` is declared again in this script, as in 2.3; the scripts share no code.)

### 2.5 Workflow 4: `batch10-integrate`

```js
export const meta = { name:'batch10-integrate', description:'Merge the four branches, build once, smoke, gate; triage and fix on red, at most three gates',
  phases:[ {title:'Merge'}, {title:'Gate'}, {title:'Triage'} ] }

phase('Merge')
const merged = await once(() => agent(PREAMBLE(['worktrees','build-and-caches','committing','area-library'], args.wt.I) + `
Seed ${args.wt.I} from ${args.baseBuild} on new branch ${args.br.I} at ${args.base}. Merge, with --no-ff and in this
order, ${PIECES.map(P => args.br[P]).join(', ')}. Resolve a conflict only with brief section 3's ownership in hand: in
FortressLibrary take each side's own declarations (G and N meet at section boundaries, .fss 1060/1061 and .fsi 674/675);
in changes.tex W's entries are "The inference of a call's static arguments" and "Reductions whose element type nothing
fixes", C's are "The traits that extend a closed trait" and its new varargs entry; an add/add on a test name is renamed
on the side of the piece that owns the topic. Never edit a declaration another piece owns. Do not build (the gate does).
Push the branch. Return the merge commit and the conflicts resolved, file by file.`,
  { phase:'Merge', label:'merger', model:T.fable, effort:'max' }))

const gatePrompt = attempt => PREAMBLE(['gate','build-and-caches','tests-running','checker-measurements','machine','committing'], args.wt.I) + `
Gate attempt ${attempt} on ${args.br.I} at its head, exactly as gate.md gives it, one command per background log with
polls under 270 s: df; rm -rf ProjectFortress/TEST-RESULTS; ant compileAll and the global.map restore; then, before
anything else, the walk smoke bin/fortress ProjectFortress/tests/BooleanOps.fss (the whole library loads under W's new
checks; if it fails, stop and return red with its output); the distance stage in the background; the library order;
ant testFast; ant testSystem (never both at once); each suite's count against the newest landed summary; the four-thread
atomic runs; the ladder regression (copies of the caches taken right after the library order); the checker count;
compare.sh against the newest landed distance table. Write ${args.stepDir}/gate/summary.txt, checker-count.txt,
distance.txt and explorations/compile-ladder/gate/distance-sites.tsv in the landed form (read the newest landed ones
for the form, never their numbers as yours). Commit those files alone; push. Return GATE: green only on zero failures,
no fallen count, no atomic red, no ladder DOWN/MISSING/STDOUT not named in advance, no new checker-count crash line.`

let gate = null, attempt = 0
while (attempt < 3) {
  phase('Gate')
  gate = await heavy(() => once(() => agent(gatePrompt(attempt), { phase:'Gate', label:`gate ${attempt}`, model:T.sonnet, effort:'medium', schema:GATE })))
  if (gate && gate.green) break
  phase('Triage')
  const triage = await once(() => agent(PREAMBLE(['tests-running','tests-writing','area-interpreter','area-compiler','area-library','worktrees'], args.wt.I) + `
The gate is red (GATE below). For each red item: which piece's change it follows from (git log -S / git bisect over the
four branches' commits is allowed in a scratch worktree under tmp/), the cause, and the smallest repair that keeps the
piece's decisions; where the cause is W's new check refusing a type G or N declared, say which side the brief's
decisions put right. Return FINDINGS (piece = the owning piece).\n${JSON.stringify(gate)}`,
    { phase:'Triage', label:`triage ${attempt}`, model:T.fable, effort:'max', schema:FINDINGS }))
  await once(() => agent(PREAMBLE(['build-and-caches','tests-writing','tests-running','committing','area-specification'], args.wt.I) + `
Fix on ${args.br.I} the blocking findings below. A regression the suite shows is its own failing test; a new defect
gets a new test first, seen failing through old-fortress.sh on the base build. Run only your own tests through the
harness (the next gate runs the suites). Commit with the flag and footer; push. Return RESULT.\n${JSON.stringify(triage)}`,
    { phase:'Triage', label:`fix ${attempt}`, model:T.fable, effort:'max', schema:RESULT }))
  attempt++
}
if (!gate || !gate.green) { log('gate still red after three attempts: stop, report to Pavol'); return { gate, landed:false } }

const reading = await once(() => agent(PREAMBLE(['checker-measurements','area-records'], args.wt.I) + `
Read the merged tree's distance (its errors.tsv in the gate's scratch, and the committed distance-sites.tsv) against
the base's landed per-site list and the four piece reports: by class, what each piece cleared, what each repaired
crash unmasked, what appeared and is caused by what, and the 2-to-4 error variation the skill names. Return prose
for the step report; cite the base and the gate commit by hash.`, { label:'distance reader', model:T.fable, effort:'max' }))
return { gate, reading, landed:false }
```

### 2.6 Workflow 5: `batch10-record`

```js
export const meta = { name:'batch10-record', description:'Fold the ledger, FACTS and the step report into the integration branch; verify the record; land on main',
  phases:[ {title:'Record'}, {title:'Verify'}, {title:'Land'} ] }

phase('Record')
await once(() => agent(PREAMBLE(['area-records','committing','area-specification'], args.wt.I) + `
You work alone, so you may edit the coordinator's files. On ${args.br.I}: in the ledger close rows 544, 534, 588, 563,
593, 604, 605, 574, 590 and 602 (each when its test passes, as the piece reports show); close row 597's checker half or
note what blocks it; close row 560's first part; open rows for the lone-parameter pin, the four crashes (closed where
repaired) and every site G and N left; notes on rows 425, 561, 577 and 488 as the brief says; rows are never renumbered.
Correct the FACTS entry on the written bound Object; mark PLAN item 20 built. Write ${args.stepDir}/README.md (or the
name the newest landed step record uses) from the four piece reports, the gate summary and the distance reading below:
the aim's three lines answered, each piece's "what done means" as built, the sets walk now refuses, row 588's instance,
the revised passages, the distance by class, the questions left for Pavol. Commit the record files alone (explorations/
only, so no re-gate); push. Return the commit.\n${JSON.stringify(args.readings)}`,
  { phase:'Record', label:'records', model:T.fable, effort:'max' }))

phase('Verify')
const rec = await once(() => agent(PREAMBLE(['area-records','committing'], args.wt.I) + `
Check the record against the brief: every row the brief names is touched as the brief says; every new row has a test or
quoted output; the FACTS line is corrected; the step report cites both measurements by their committed tables; no
commit from ${args.base} to HEAD carries a model identifier, a file under tmp/, a log, or the deletion of global.map;
every commit has the footer; the gate commit's tree equals HEAD's under ProjectFortress/, Library/ and build.xml
(git diff --quiet <gate commit> HEAD -- ProjectFortress Library build.xml). Return FINDINGS.`,
  { phase:'Verify', label:'record verifier', model:T.sonnet, effort:'medium', schema:FINDINGS }))
if (rec && rec.findings.some(f => f.severity === 'blocking')) { log('record not clean; stop for the coordinator'); return { landed:false, rec } }

phase('Land')
const landed = await once(() => agent(PREAMBLE(['committing'], '/home/user/fortress') + `
In /home/user/fortress: git fetch; git merge --ff-only ${args.br.I}; git log origin/main..main must show only this
step's commits (else stop and report); git push origin main; git push origin main:claude/worker-brief-fable-vnnuv8.
Touch no other file (an untracked .claude/skills/ may be present; leave it). Return the pushed hash.`,
  { phase:'Land', label:'lander', model:T.sonnet, effort:'low' }))
return { landed:true, head:landed }
```

If Pavol has asked to see the gate before anything lands, the coordinator stops after Workflow 4 and runs Workflow 5 on his word; otherwise his yes to the step covers the landing.

### 2.7 How the results combine and reach `main`

Each piece's branch is linear: per group a test-only commit, then a fix commit; at the end a report commit. The integration branch merges the four with `--no-ff`, so `main` keeps each piece's test-before-fix order, which is the record rule 1 asks for. The gate's tables are committed on the integration branch in the landed form; the record commit follows the gate and touches only `explorations/`, which the gate rule exempts. `main` moves by fast-forward only, and both pushes follow.

## 3. Correctness, the machine's limits, the session's restarts

**Correctness, in layers.**
1. Every agent carries the binding rules and the brief's decisions by heading, loads the skill parts its area needs, and returns a schema, so nothing is passed as a paraphrase: a diagnosis names the precedent at file:line, a result quotes the failing and the passing run with their commands.
2. Diagnoses are made twice from different starting points and adjudicated against the code; a disagreement neither side settles becomes a row or a question, never a guess. The six hard groups get three independent approaches and a judge. A boundary auditor reads all orders together before anything is built, because section 3's ownership is the one thing no single piece can see.
3. Tests first, mechanically: the tests-first agent works on the unedited seeded worktree, so every failing run is the base's code without `old-fortress.sh` subtleties; any later test change goes through `old-fortress.sh`. Promotions are `git mv`, so the suite would have gone red the day the defect went without the rename.
4. Each group is a fresh agent on the piece's branch: a short context, a clean recovery point, and the previous groups' results handed in as data; the finisher is another fresh context, so the suite verdict and the measurement reading are not written by the hand that made the edits.
5. The piece's own suite runs once on its final code (W, G and N `testSystem`; C `testFast`), so a regression is attributed to a piece before the merge; the measurements run once per piece, read by the per-site list through the diff, never by the class table (row 577).
6. Review refutes rather than confirms: two mechanical audits whose checks the tree itself answers; three lenses, one of them a different tier; a completeness critic with the brief's checklist. Repairs loop at most three times, and a code repair re-runs the finisher, since a verdict stands only for the code it ran on.
7. Only the merged gate decides, once per code state: build, smoke (the whole library under W's new load-time checks, the one interaction the brief names), both suites, counts against the landed summary, the atomic runs, the ladder, the checker count, the distance. Red is triaged to a piece and fixed on the integration branch, test-first, and gated again; three reds stop the step for Pavol.
8. The record is written by one agent working alone (the parallel-edit rule of `area-records.md`) and checked by another against the brief's lists; `main` moves by fast-forward only after `git log origin/main..main` shows only the step.

**The machine.** Four cores, about 15 GB, no swap, two agents at a time. The script's `heavy()` serializes every whole-suite run, distance stage and gate, so at most four 768 MB JVMs or one 4 GB JVM hold the machine beside one building agent; two finishers never overlap. Each worktree (about 206 MB seeded) holds its own `tmp/` for scratch, parser directories and private caches; every agent checks `df -h /` first, points `TMPDIR` and `java.io.tmpdir` at its tree, sources `env.sh` once at the start of a shell and never mid-run, and stops only processes under its own path. Builds are kept to one per code state: the base once, each piece's worktree at each fix, the integration tree once per gate; no agent compiles into another's caches. Every long command runs in the background with polls under 270 s, inside the Bash tool's ceiling and the subagent's five-minute cache life.

**Restarts.** The platform stops the process about 12 h 58 min after its start, and the step will cross that line. So: five workflows rather than one, each resumed with the byte-identical script and `args` (the `args` JSON is saved under the main tree's `tmp/step10/` and reused; the base is a full hash); no `Date.now()` or randomness in a script; every agent's prompt begins with recovery from its worktree's `git log`, `tmp/PROGRESS.md` and the `EXIT` lines of its logs, so a re-run agent continues rather than redoes, and a background run still alive is waited for, not restarted; every branch is pushed after every commit, so a lost container loses nothing committed. A `null` return is retried once with the same prompt (which recovers from leftovers); a second `null` marks the group blocked and the step goes on. The coordinator keeps the session alive with `send_later` check-ins 45 minutes apart and one armed a few minutes after the predicted stop (`uptime -s` plus 12 h 58 min), and never presses stop, which would kill every live agent; a message is queued instead. After a VM restart the worktrees, logs and journals are on disk; after a new session only the pushed branches and the journal (`journal-text.py`) remain, and the coordinator rebuilds the next workflow's `args` from them. The Workflow tool's own `isolation: 'worktree'` is not used: it gives an unbuilt tree, and the caches are keyed by absolute path; the project's seeding script is.

## 4. What I would want measured or decided before running it

1. **Rule 1 for a library site no walk test can see fail.** The brief's owed tests for G and N "pass before and after", so the only before a library slip has is its row in the landed per-site list. Decision: does the pair (the landed site cited, the pin test guarding walk's value) satisfy requirement 1, or must a site without a failing test be left with a row? The design assumes the pair; it is the first question put.
2. **Whole suites per piece.** The skill says a change other than walk's or the checker's code runs only its own tests; the design runs `testSystem` once on G's and N's final code (two four-minute runs on distinct code states, so rule 3 holds) to attribute a regression before the merge. Confirm, or drop it and accept a slower triage at the gate.
3. **The record's home and form.** The step's record directory (`explorations/compile-ladder/climb-batch-10/` by the landed pattern), the piece report's file names and form, and whether `main` keeps the four `--no-ff` merges or a linearized history; the agents read the newest landed record for the form, but the names should be fixed in `args` beforehand.
4. **The base build.** `/home/user/fortress-base10` is at the base, built, and has one untracked file (`BASE_COMMIT`); the seeding script refuses an unclean base. Decide whether that file is removed or the script's notion of clean allows it, before the seed agent runs.
5. **The harness's slot count and the agent type.** Confirm two agents at a time on this machine (the harness caps at CPUs minus two). Decide whether the preamble and the skill parts common to a piece go into project agent types (`.claude/agents/`) before the run; a type written now is found only after the next process restart, so it is a decision for the start, not mid-step.
6. **The wall clock across the stop.** Time one reader and one group fix on this machine before committing to the schedule; with two slots the reading phase alone is about sixty agents, and the stop falls inside the build phase whatever the order, so the first check-in series is armed before Workflow 1 starts.
7. **"A few lines" for a crash repair.** The brief repairs a crash only where the trace finds a few lines and the text says what to report; give the judge a number (the design proposes about twenty lines in one file) or leave it to the judge and have the critic flag anything larger.
8. **Row 604's test shape for the over-acceptance.** A varargs parameter typed as its element compiles today; an expected-failure compile test cannot hold it, and the owed test "a varargs parameter used as a sequence in its body" is a positive program the fix makes compile; confirm that the over-acceptance face is held by the row until the fix, then by that test.
9. **N2's contested sites.** `assert`'s and `deny`'s `x: Any` and the bare `throw ForbiddenException`: the brief lists the ways and leaves the reading open; decide whether the adjudicator may choose among the library's devices or must list them for Pavol and leave the sites as rows for this step.
10. **Landing.** Whether Pavol wants the gate summary shown before Workflow 5 lands, or his yes to the step covers it (the protocol's "a step his yes already covers is taken without asking again").
11. **Disk and memory at start.** 10 GB free of 252 GB today; five worktrees, their caches and the gate's cache copies need a few GB; sweep `/tmp/fortress*rats` once, with no agent live, before seeding.
