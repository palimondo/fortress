// workflow-scenarios.js [SCRIPT] [--sizes RUN_DIR] [--dump DIR] [--skill SKILL_DIR]
//
// The scenario checker of the batch workflow script, explorations/coordinator/climb-batch-workflow.js
// (its manual: explorations/coordinator/climb-batch-workflow.md; the practice it builds:
// explorations/coordinator/process-engineering/batch-redesign.md). SCRIPT defaults to the working copy.
// Nothing is launched and nothing is built: the script runs as the Workflow harness runs it, its text with
// "export const meta" made "const meta" as the body of an async function, its globals (args, agent,
// pipeline, parallel, log) stubbed, once per scenario; each run's agents, in the order they are called,
// and its result are compared with what the scenario expects. Its last line counts the problems; exit 1 if
// any.
//
// Before the runs: node --check, and the harness's parse (FACTS.md, "node --check does not check the batch
// script as the Workflow harness parses it ..."); no backtick but the gate's awk line's, and no non-ASCII
// character. The scenarios name rungs by their place in the manifest the script carries (R0 is the first
// rung of RUNGS, R1 the second; S0 the first in the scatter's order), so they run on any batch's block of
// the redesigned form.
//
// The scenarios (rewritten for the redesign of 2026-10-08; the earlier checker's are in git at
// cd2393a08): every agent approving; a skeptic that fixes and approves (no judge); a fix contested and
// upheld, contested and repaired, a refusal ruled to stand, repaired, dropped; a worker that stops; the
// merged tree's paths carried over from the earlier checker (the review routing, a code finding repaired
// with and without a second gate, a red gate and its repair, a review that returns nothing, the judge's
// land, the paths no gate stage reads); the push held by a step that cannot be undone and not by a
// reversible point; no skill text written and no cold read in any run (the batch's revival-change material
// goes into its RECORD.md for the skill writer: reviews/skills-agenda-audit.md), a path under .claude/ that
// changed listed as skill-touched, and a gather's stray deltaEntries routed nowhere; testSpecData in the gate
// when the rung that brings it lands, and not when it is dropped; the stops on a usage limit and the resumes.
// And in every scenario, each brief: no undefined, NaN or object rendered; the head and the skill named; the
// skill's revival-changes part named by none; the worker's "Revival change" section in its two labelled parts,
// the gather's copy of it into RECORD.md, the review's check of it, the commit stage's check of .claude/; no
// global.map restore, no copy of the base, no one-thread pin, no
// stopsMet, no run_bg (the permission check refuses it; the literal nohup form instead), no person named but
// in PLAN.md's heading; the worker's seed command; the skeptic's old-code tool, journal command and "You
// build nothing to check"; no skeptic brief carrying the worker's report text; the commit's three pushes and
// the quick microGPT check.
//
// With --sizes RUN_DIR (a batch run's directory, journal.jsonl and agent transcripts beside it, such as
// climb batch 10's): renders every role's brief with that run's real agent results as the stubs' returns
// (mapped onto the script's rungs in order, their fields renamed to the redesign's), and prints each brief's
// size in characters beside that run's own first message of the same role, and the first call's tokens by
// the fit of process-engineering/checking-roles-cost.md (41.7K + 0.425 tokens a character of brief).
const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const crypto = require('crypto')

const ROOT = process.env.FORTRESS_HOME || path.resolve(__dirname, '../../..')
const argv = process.argv.slice(2)
const sizesAt = argv.indexOf('--sizes'), dumpAt = argv.indexOf('--dump'), skillAt = argv.indexOf('--skill')
const SIZES_DIR = sizesAt >= 0 ? argv[sizesAt + 1] : null
const DUMP_DIR = dumpAt >= 0 ? argv[dumpAt + 1] : null   // writes every brief of every scenario there, one file each, for reading
const SKILL_DIR = skillAt >= 0 ? argv[skillAt + 1] : path.join(ROOT, '.claude/skills/fortress-repo')   // the skill whose sections the script cites
const valued = new Set([sizesAt, dumpAt, skillAt].filter(i => i >= 0).map(i => i + 1))
const target = argv.filter((a, i) => !/^--(sizes|dump|skill)$/.test(a) && !valued.has(i))[0] || path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const BASE_BUILD = '/home/user/fortress-base'
const orig = fs.readFileSync(target, 'utf8')

let bad = 0
const say = (ok, line) => { if (!ok) bad++; console.log((ok ? 'ok   ' : 'BAD  ') + line) }
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
{
  const r = cp.spawnSync('node', ['--check', target], { encoding: 'utf8' })
  say(r.status === 0, 'node --check: exit ' + r.status + (r.stderr.trim() ? ' ' + r.stderr.trim().slice(0, 300) : ''))
  let err = null
  try { new AsyncFunction('args', 'agent', 'pipeline', 'parallel', 'log', orig.replace(/^export const meta/m, 'const meta')) } catch (e) { err = e }
  say(!err, 'the harness\'s parse: ' + (err ? 'refused, ' + err.message : 'accepted as an async function body, its export made const'))
  const ticks = orig.split('\n').filter(l => l.indexOf('mg_phases ()') < 0).join('\n').match(/\x60/g) || []
  say(!ticks.length && !/[^\x00-\x7f]/.test(orig), 'the script holds ' + ticks.length + ' backtick(s) outside the gate\'s mg_phases line and ' + ((orig.match(/[^\x00-\x7f]/g) || []).length) + ' non-ASCII character(s)')
}
const body = orig.replace(/^export const meta/m, 'const meta')

// Every section that the script cites by name, of a fortress-repo part ("the skill's tests-writing.md, "The
// order"") or of the batch workflow's manual or the redesign's synthesis, is a heading of that file, its
// backticks and any section number dropped, equal to the name or opening with it. The parts are read from
// SKILL_DIR.
{
  const refs = path.join(SKILL_DIR, 'references')
  const files = {}
  if (fs.existsSync(refs)) for (const f of fs.readdirSync(refs)) if (/\.md$/.test(f) && f !== 'sources.md') files[f] = path.join(refs, f)
  files['climb-batch-workflow.md'] = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.md')
  files['batch-redesign.md'] = path.join(ROOT, 'explorations/coordinator/process-engineering/batch-redesign.md')
  const text = orig.replace(/\n\s*\/\/ ?/g, ' ')
  const cited = new Map()
  const re = /\b([a-z][a-z-]*\.md)(?:\s+says)?(?:,\s*|\s*\()((?:"[^"]+"(?:;\s*|\s+and\s+|,\s*)?)+)/g
  let m
  while ((m = re.exec(text))) {
    if (!files[m[1]]) continue
    for (const q of m[2].match(/"[^"]+"/g)) { const name = q.slice(1, -1).replace(/\\'/g, "'"); cited.set(m[1] + ' "' + name + '"', [m[1], name]) }
  }
  const missing = []
  for (const [key, [file, name]] of cited) {
    const heads = fs.existsSync(files[file]) ? fs.readFileSync(files[file], 'utf8').split('\n').filter(l => /^#+ /.test(l)).map(l => l.replace(/^#+\s+/, '').replace(/^\d+(\.\d+)*\.?\s+/, '').replace(/\x60/g, '')) : []
    if (!heads.some(h => h === name || h.startsWith(name))) missing.push(key)
  }
  say(Object.keys(files).length > 2 && !missing.length, 'the sections the script cites by name, ' + cited.size + ' of them, are headings of their files (the skill at ' + SKILL_DIR + ')' + (missing.length ? '; not found: ' + missing.join('; ') : ''))
}

// The manifest's rungs, in order, and the one that brings a gate step.
const runsLine = (orig.match(/^const RUNGS = \[([^\]]*)\]/m) || [])[1] || ''
const IDS = runsLine.split(',').map(s => s.trim()).filter(Boolean).map(e => (orig.match(new RegExp('^const ' + e + ' = \\{ id: \'([A-Za-z0-9]+)\'', 'm')) || [])[1])
const JOINS = IDS.filter(id => new RegExp('^const ' + id + '_ENTRY = [^\\n]*\\n[^\\n]*gateJoins: \\["testSpecData"\\]', 'm').test(orig))
say(IDS.length >= 2 && IDS.every(Boolean), 'the manifest\'s rungs: ' + IDS.join(', ') + (JOINS.length ? '; ' + JOINS.join(', ') + ' brings testSpecData into the gate' : ''))
const R = (i) => IDS[i]
const subst = (s) => s.replace(/\bR(\d)\b/g, (m, d) => IDS[Number(d)])

// ---------------------------------------------------------------------------
// The stubs.
const REPORT_SENTINEL = 'REPORTTEXT-SENTINEL', RECORD_SENTINEL = 'RECORDTEXT-SENTINEL'
const worker = (x) => () => Object.assign({ slug: 's', landed: true, stopped: false, filesChanged: [], recordedFailure: 'r', decisions: ['d'], pointsReached: [], forCurator: [], reportText: REPORT_SENTINEL, recordText: RECORD_SENTINEL, summary: 'stub' }, x || {})
const skeptic = (x) => () => Object.assign({ slug: 's', verdict: 'approved', fixes: [], contested: [], failureWasRecorded: true, differentialsRun: [], pointsReached: [], forCurator: [], headJudged: 'abc1234', skepticText: 'committed', summary: 'stub' }, x || {})
const FIX = { commit: 'f1x0001', finding: 'stub finding', kind: 'defect', settledBy: '', test: 't', paths: ['ProjectFortress/src/X.java'] }
const contested = skeptic({ verdict: 'contested', fixes: [FIX], contested: [{ commit: 'f1x0001', finding: 'stub finding', why: 'worker-argued', workerArgument: 'w', skepticArgument: 's' }] })
const refused = skeptic({ verdict: 'refused', refusalReason: 'stub refusal', fixes: [] })
const judge = (decision, x) => () => Object.assign({ kind: 'k', decision, rulings: [], instructions: decision === 'repair' ? ['1. stub instruction'] : [], ruling: 'stub ruling', forCurator: [], summary: 's' }, x || {})
const RUN_OK = { file: 'ProjectFortress/compiler_tests/XXXStub.test', paths: ['ProjectFortress/compiler_tests/XXXStub.test', 'ProjectFortress/compiler_tests/XXXStub.fss'], suite: 'fast-compiler/CompilerJUTest', cases: 1, verdict: 'pass', capture: 'tmp/gate-batch-x/stub.txt' }
const TESTS_ONLY = ['ProjectFortress/compiler_tests/XXXStub.test', 'ProjectFortress/compiler_tests/XXXStub.fss', 'explorations/compile-ladder/climb-batch-x/REPAIR-review.md']
const CODE = TESTS_ONLY.concat(['ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Stub.scala'])
const repairStub = (paths, runs, answered, extra) => () => Object.assign({ slug: 'm', landed: true, stopped: false, filesChanged: [], recordedFailure: 'r', decisions: [], summary: 'stub', pointsReached: [], forCurator: [], curatorItems: [], headBefore: 'a', headAfter: 'b', pathsChanged: paths, testRuns: runs, failingAnswered: answered || [] }, extra || {})
const review = (x) => () => Object.assign({ approved: true, blockingCode: [], routed: [], fixed: [], fixesChecked: [], pathsOutsideExplorations: [], pointsReached: [], forCurator: [], curatorItems: [], summary: 's' }, x)
const codeFinding = { review: review({ approved: false, blockingCode: ['stub code finding'] }), 'judge:review': () => ({ decision: 'repair', forCurator: [], instructions: ['1. fix'], ruling: 'r', kind: 'review', summary: 's' }) }
const red = (lines) => () => ({ green: false, failing: lines || ['XXXStub.test: stub'], countsDown: [], stopped: false, summary: 's' })
const gatherStub = (x) => () => Object.assign({ unresolved: false, summary: 'stub', commits: [], conflicts: [], curatorItems: [], curatorUnrouted: [] }, x || {})
const SKILL_PATH = '.claude/skills/fortress-repo/references/revival-changes.md'
const commitStub = (x) => () => Object.assign({ mainHead: 'h', pushed: ['main', 'claude/worker-brief-fable-vnnuv8', 'blinded-fable'], pushHeld: false, microgptWalk: MG_PASS, skillTouched: [], summary: 's' }, x || {})
const nul = () => null
const LIMIT_MESSAGE = 'You\'ve hit your weekly limit, resets Oct 2, 10am (UTC)'

// after: the agents after the scatter, in order. agentsPrefix: every agent, in order (S<n> is the n-th rung of the
// scatter). landed, held, items, states: the result.
const SCEN = [
  { name: 'R1 every agent approves; no skill text, no cold read', over: {}, after: 'gather, gate, review, commit', landed: true, states: { R0: 'approved', R1: 'approved' }, itemsLack: ['microgpt-walk.1', 'skill-touched.1'] },
  { name: 'M1 the microGPT walk check fails one program: listed, the push not held', over: { commit: (p) => ({ mainHead: 'h', pushed: ['main'], pushHeld: false, microgptWalk: MG_PASS.split('\n')[0] + '\nVERDICT: 6 PASS, 1 FAIL of 7 -- FAILED\nrc=0', summary: 's' }) },
    after: 'gather, gate, review, commit', landed: true, items: ['microgpt-walk.1'] },
  { name: 'M2 the microGPT walk check did not finish: listed', over: { commit: (p) => ({ mainHead: 'h', pushed: ['main'], pushHeld: false, microgptWalk: 'the run was refused', summary: 's' }) },
    after: 'gather, gate, review, commit', landed: true, items: ['microgpt-walk.1'] },
  { name: 'F1 R0\'s skeptic fixes two findings, none contested: no judge, no repair', over: { 'skeptic:R0': skeptic({ fixes: [FIX, Object.assign({}, FIX, { commit: 'f1x0002', kind: 'correction' })] }) },
    agentsHas: ['skeptic:R0'], agentsLack: ['judge:R0', 'repair:R0'], after: 'gather, gate, review, commit', landed: true, states: { R0: 'approved' } },
  { name: 'F2 a contested fix the judge upholds: the rung stands, no repair', over: { 'skeptic:R0': contested, 'judge:R0': judge('stands', { rulings: [{ commit: 'f1x0001', ruling: 'uphold', why: 'w' }] }) },
    agentsHas: ['judge:R0'], agentsLack: ['repair:R0', 'skeptic2:R0'], after: 'gather, gate, review, commit', landed: true, states: { R0: 'approved-after-ruling' }, contestedBrief: 'R0' },
  { name: 'F3 a contested fix the judge rules a repair for: one repair round, no second skeptic', over: { 'skeptic:R1': contested, 'judge:R1': judge('repair') },
    agentsHas: ['judge:R1', 'repair:R1'], agentsLack: ['skeptic2:R1'], after: 'gather, gate, review, commit', landed: true, states: { R1: 'approved-after-repair' } },
  { name: 'F4 a refusal the judge drops: the rung does not land, the others do', over: { 'skeptic:R1': refused, 'judge:R1': judge('drop') },
    after: 'gather, gate, review, commit', landed: true, states: { R1: 'dropped' }, notLanded: ['R1'] },
  { name: 'F5 a refusal the judge rules wrong: the rung stands', over: { 'skeptic:R0': refused, 'judge:R0': judge('stands') },
    after: 'gather, gate, review, commit', landed: true, states: { R0: 'approved-after-ruling' } },
  { name: 'F6 a refusal repaired, the repair not landing: dropped', over: { 'skeptic:R0': refused, 'judge:R0': judge('repair'), 'repair:R0': worker({ landed: false }) },
    after: 'gather, gate, review, commit', landed: true, states: { R0: 'dropped' } },
  { name: 'S1 a worker that stops, the judge rules it no stop, the continuation lands', over: { 'rung:R1': worker({ stopped: true, stopReason: 'stub' }), 'judge:R1:stop': judge('repair') },
    agentsHas: ['judge:R1:stop', 'resume:R1', 'skeptic:R1'], after: 'gather, gate, review, commit', landed: true, states: { R1: 'approved' } },
  { name: 'S2 a worker that stops on a step that cannot be undone', over: { 'rung:R1': worker({ stopped: true, stopReason: 'stub' }), 'judge:R1:stop': judge('stop', { forCurator: ['the fork'] }) },
    after: 'gather, gate, review, commit', landed: true, states: { R1: 'stopped' }, items: ['R1.judge-stop.1'] },
  { name: 'A3 every rung dropped: nothing to gather', over: Object.fromEntries(IDS.map(id => ['skeptic:' + id, refused]).concat(IDS.map(id => ['judge:' + id, judge('drop')]))),
    after: '', landed: false },
  { name: 'C1 a gather that still returns deltaEntries, folded or not: no cold read, nothing routed from them', over: { gather: gatherStub({ deltaEntries: [{ rung: 'R0', title: 't', folded: true }, { rung: 'R1', title: 't', folded: false }] }) },
    after: 'gather, gate, review, commit', landed: true, itemsLack: ['coldread.1', 'delta-unfolded.1', 'skill-touched.1'] },
  { name: 'C2 the commit stage finds two paths under .claude/ changed since the base: each listed as skill-touched, the push not held', over: { commit: commitStub({ skillTouched: [SKILL_PATH, '.claude/skills/fortress-repo/references/sources.md'] }) },
    after: 'gather, gate, review, commit', landed: true, held: false, items: ['skill-touched.1', 'skill-touched.2'] },
  { name: 'C3 the commit stage returns no skillTouched: nothing listed, the batch lands', over: { commit: () => { const c = commitStub()(); delete c.skillTouched; return c } },
    after: 'gather, gate, review, commit', landed: true, itemsLack: ['skill-touched.1'] },
  { name: 'G1 the rung that brings testSpecData lands: the gate runs it', over: {}, after: 'gather, gate, review, commit', landed: true, specData: true },
  { name: 'G2 the rung that brings testSpecData is dropped: the gate runs it only if the landed summary has it', over: JOINS.length ? { ['skeptic:' + JOINS[0]]: refused, ['judge:' + JOINS[0]]: judge('drop') } : {},
    after: 'gather, gate, review, commit', landed: true, specData: false },
  { name: 'H1 a worker took a step that cannot be undone: the push is held', over: { 'rung:R0': worker({ pointsReached: [{ point: 'a test deleted', evidence: 'x:1', holdsPush: true }] }) },
    after: 'gather, gate, review, commit', landed: false, held: true },
  { name: 'H2 a reversible point to report: listed, the push not held', over: { 'skeptic:R0': skeptic({ pointsReached: [{ point: 'a value walk prints changed', evidence: 'x:1', holdsPush: false }] }) },
    after: 'gather, gate, review, commit', landed: true, held: false },
  { name: 'H3 a malformed point holds the push', over: { review: review({ pointsReached: ['not an object'] }) },
    after: 'gather, gate, review, commit', landed: false, held: true },
  // The merged tree's paths, as the earlier checker had them.
  { name: 'R2 the review routes a tests-only finding, no judge', over: { review: review({ routed: ['XXXFoo owed'] }) }, after: 'gather, gate, review, commit', landed: true, items: ['review-routed.1'] },
  { name: 'R5 a code finding, its repair changes a checker source: the gate runs again', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(CODE, [RUN_OK]) }), after: 'gather, gate, review, judge:review, repair:review, gate:after-review, commit', landed: true },
  { name: 'A5 a red gate the judge cannot answer (stop)', over: { gate: red(), 'judge:gate': () => ({ decision: 'stop', forCurator: ['fork'], instructions: [], ruling: 'r', kind: 'gate', summary: 's' }) },
    after: 'gather, gate, review, judge:gate', landed: false, items: ['judge-gate.1'] },
  { name: 'A6 a red gate whose judge returns nothing three times: the run stops', over: { gate: red(), 'judge:gate': nul },
    after: 'gather, gate, review, judge:gate, judge:gate:attempt2, judge:gate:attempt3', halts: 'judge:gate' },
  { name: 'A7 a code finding whose repair turns the gate red; the gate repair fixes code; the second gate is green', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(CODE, [RUN_OK]), 'gate:after-review': red(['CompilerJUTest: Foo failed']), 'judge:gate': () => ({ decision: 'repair', forCurator: [], instructions: ['1. fix'], ruling: 'r', kind: 'gate', summary: 's' }), 'repair:gate': repairStub(CODE, [RUN_OK]) }),
    after: 'gather, gate, review, judge:review, repair:review, gate:after-review, judge:gate, repair:gate, gate2, commit', landed: true, gateJudgeTier: 'fable' },
  { name: 'A8 as A7 but the second gate is red too', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(CODE, [RUN_OK]), 'gate:after-review': red(['CompilerJUTest: Foo failed']), 'judge:gate': () => ({ decision: 'repair', forCurator: [], instructions: ['1. fix'], ruling: 'r', kind: 'gate', summary: 's' }), 'repair:gate': repairStub(CODE, [RUN_OK]), gate2: red(['still']) }),
    after: 'gather, gate, review, judge:review, repair:review, gate:after-review, judge:gate, repair:gate, gate2', landed: false },
  { name: 'A9 a red gate beside a code finding, its tests-only repair answers the line', over: Object.assign({}, codeFinding, { gate: red(), 'repair:review': repairStub(TESTS_ONLY, [RUN_OK], [{ failing: 'XXXStub.test: stub', file: RUN_OK.file }]) }),
    after: 'gather, gate, review, judge:review, repair:review, commit', landed: true, step1a: true },
  { name: 'A11 the review repair returns nothing three times: lands, its finding listed', over: Object.assign({}, codeFinding, { 'repair:review': nul }),
    after: 'gather, gate, review, judge:review, repair:review, repair:review:attempt2, repair:review:attempt3, gate:after-review, commit', landed: true, items: ['review-unrepaired.1'] },
  { name: 'A13 the review returns nothing three times: lands on its gate, listed', over: { review: nul },
    after: 'gather, gate, review, review:attempt2, review:attempt3, commit', landed: true, items: ['review-missing.1'] },
  { name: 'A14 the review fixes a test file itself: the gate runs again', over: { review: review({ pathsOutsideExplorations: ['ProjectFortress/compiler_tests/Foo.fss'], fixed: ['Foo.fss'] }) },
    after: 'gather, gate, review, gate:after-review, commit', landed: true },
  { name: 'A15 routed and code findings, the judge rules land', over: { review: review({ approved: false, blockingCode: ['c'], routed: ['r1', 'r2'] }), 'judge:review': () => ({ decision: 'land', forCurator: [], instructions: ['1. step'], ruling: 'r', kind: 'review', summary: 's' }) },
    after: 'gather, gate, review, judge:review, commit', landed: true, items: ['review-routed.1', 'review-routed.2', 'judge-review-land.1'] },
  { name: 'A16 the gather is unresolved', over: { gather: gatherStub({ unresolved: true }) }, after: 'gather', landed: false },
  { name: 'A20 the gate cannot run', over: { gate: () => ({ green: false, failing: [], stopped: true, countsDown: [], summary: 's' }) }, after: 'gather, gate, review', landed: false },
  { name: 'D1 a code finding whose repair changes only the specification\'s text: no second gate, recorded beside it', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(['Specification/appendices/changes.tex', 'explorations/compile-ladder/climb-batch-x/REPAIR-review.md'], []) }),
    after: 'gather, gate, review, judge:review, repair:review, commit', landed: true, step1a: true, ungatedIn1a: 'Specification/appendices/changes.tex' },
  { name: 'D2 the repair changes a library source: the gate runs again', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(['Library/CompilerLibrary.fss'], []) }),
    after: 'gather, gate, review, judge:review, repair:review, gate:after-review, commit', landed: true },
  { name: 'D4 the review\'s corrections touch the specification\'s text and, against its brief, the skill: the gate stands, the text recorded beside it, the skill path listed', over: { review: review({ pathsOutsideExplorations: ['Specification/basic/types.tex', SKILL_PATH], fixed: ['types.tex'], headBefore: 'h1', headAfter: 'h2' }), commit: commitStub({ skillTouched: [SKILL_PATH] }) },
    after: 'gather, gate, review, commit', landed: true, step1a: true, ungatedIn1a: 'Specification/basic/types.tex', notIn1a: '.claude/', items: ['skill-touched.1'] },
  { name: 'B1 launched without args.baseBuild', over: {}, args: { base: 'BASE' }, agents: '', threwWith: 'args.baseBuild is required' },
  { name: 'L1 the weekly limit as a null from the second rung\'s skeptic on', over: {}, limitAt: 'skeptic:S1', limitAs: 'null',
    agentsPrefix: 'rung:S0, skeptic:S0, rung:S1, skeptic:S1, skeptic:S1:attempt2, skeptic:S1:attempt3', halts: 'skeptic:S1' },
  { name: 'L2 a usage limit thrown at a skeptic: no second attempt', over: {}, limitAt: 'skeptic:S1', limitAs: 'throw',
    agentsPrefix: 'rung:S0, skeptic:S0, rung:S1, skeptic:S1', halts: 'skeptic:S1' },
  { name: 'L3 a usage limit thrown at the gate, beside the review', over: {}, limitAt: 'gate', limitAs: 'throw', after: 'gather, gate, review', halts: 'gate' },
  { name: 'A19 the first worker returns nothing three times: the run stops', over: { 'rung:S0': nul }, agentsPrefix: 'rung:S0, rung:S0:attempt2, rung:S0:attempt3', halts: 'rung:S0' },
]

let SCATTER_IDS = []
const subst2 = (s) => subst(s).replace(/\bS(\d)\b/g, (m, d) => SCATTER_IDS[Number(d)])

function mkAgent(sc, calls, journal, replay) {
  let prevKey = 'root'
  return async (prompt, opts) => {
    const L = opts.label
    const key = crypto.createHash('sha256').update(prevKey + '\0' + prompt + '\0' + JSON.stringify(opts)).digest('hex').slice(0, 16)
    prevKey = key
    if (replay && replay.has(key)) { calls.push({ label: L, prompt, opts, fromJournal: true }); return replay.get(key) }
    calls.push({ label: L, prompt, opts })
    const lim = sc.limitAt && subst2(sc.limitAt)
    if (lim && !replay && (L === lim || L.startsWith(lim + ':'))) sc.limited = true
    if (sc.limited && !replay) {
      if (sc.limitAs === 'throw') throw new Error(LIMIT_MESSAGE)
      return null
    }
    const over = sc.overResolved
    let r
    if (over[L]) r = over[L]()
    else if (/:attempt\d$/.test(L) && over[L.replace(/:attempt\d$/, '')]) r = over[L.replace(/:attempt\d$/, '')]()
    else if (/^repair:(review|gate)/.test(L)) r = repairStub([], [])()
    else if (/^(rung|resume|repair):/.test(L)) r = worker()()
    else if (L.startsWith('judge:')) r = judge('stop')()
    else if (L.startsWith('skeptic')) r = skeptic()()
    else if (L === 'gather') r = gatherStub()()
    else if (L.startsWith('gate')) r = { green: true, failing: [], stopped: false, countsDown: [], summary: 's' }
    else if (L.startsWith('review')) r = review({})()
    else if (L.startsWith('commit')) {
      if (sc.killAt === 'commit' && !replay) { sc.killed = true; return new Promise(() => {}) }
      r = /Do NOT push/.test(prompt) ? commitStub({ pushed: [], pushHeld: true })() : commitStub()()
    }
    else r = {}
    if (journal && r !== null && r !== undefined) journal.set(key, r)
    return r
  }
}

// The stubbed pipeline runs one item at a time, each through all its stages, and drops to null an item
// whose stage throws, as the harness's does.
const pipeline = async (items, ...stages) => {
  const out = []
  for (const it of items) {
    let v
    try { for (const [i, st] of stages.entries()) v = await (i ? st(v, it) : st(it)) } catch (e) { v = null }
    out.push(v)
  }
  return out
}

async function run(sc, journal, replay) {
  const calls = [], logs = []
  sc.overResolved = Object.fromEntries(Object.entries(sc.over || {}).map(([k, v]) => [subst2(k), v]))
  const agent = mkAgent(sc, calls, journal, replay)
  let result, threw = null
  try {
    const pr = new AsyncFunction('args', 'agent', 'pipeline', 'parallel', 'log', body)(sc.args || { base: 'BASE', baseBuild: BASE_BUILD }, agent, pipeline, null, (s) => logs.push(String(s)))
    result = await Promise.race([pr, new Promise(res => setTimeout(() => res(sc.killed ? '__STOPPED__' : '__HUNG__'), 300))])
    if (result === '__STOPPED__') { threw = new Error('process stopped in the commit stage'); result = null }
    else if (result === '__HUNG__') { threw = new Error('the run did not finish (a stall)'); result = null }
  } catch (e) { threw = e }
  return { result, calls, logs, threw }
}

const HALT_TEXT = /nothing decided/i
const SCATTER_LABEL = /^(rung|skeptic|resume|repair:(?!review|gate)|judge:(?!review|gate))/
// What the quick pair prints when both programs pass (MicroGptFlatQuick.fss:57, MicroGptAplQuick.fss:59).
const MG_PASS = 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS\nrc=0 secs=31\nVERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS\nrc=0 secs=33'
const PERSON = /Pavol/g
const PLAN_HEADING = /Pavol\\?'s answers, in the order they are needed/g

function check(sc, out) {
  const { result, calls, logs, threw } = out
  const probs = []
  const labels = calls.map(c => c.label)
  const after = labels.filter(l => !SCATTER_LABEL.test(l)).join(', ')
  const commit = calls.find(c => c.label === 'commit')
  if (sc.threwWith) {
    if (!threw || threw.message.indexOf(sc.threwWith) < 0) probs.push('expected the script to refuse to start with "' + sc.threwWith + '": ' + (threw ? threw.message.slice(0, 200) : 'it did not'))
  } else if (sc.halts) {
    const h = subst2(sc.halts)
    if (!threw) probs.push('the run did not stop')
    else if (!HALT_TEXT.test(threw.message) || threw.message.indexOf(h) < 0 || threw.message.indexOf('resumeFromRunId') < 0) probs.push('stopped with an error that does not name ' + h + ', say nothing was decided and name resumeFromRunId: ' + threw.message.slice(0, 200))
    if (labels.includes('gather') && !/^gather/.test(sc.after || '')) probs.push('the gather ran')
    if (logs.some(l => /\(dropped\)|takes its path for a dead agent/.test(l))) probs.push('a log line reads an empty agent as a decision')
  } else if (threw) probs.push('THREW ' + threw.message.slice(0, 300))
  if (sc.after !== undefined && after !== sc.after) probs.push('agents after the scatter: ' + (after || '(none)') + ' (expected ' + (sc.after || '(none)') + ')')
  if (sc.agents !== undefined && labels.join(', ') !== sc.agents) probs.push('agents: ' + labels.join(', ') + ' (expected ' + sc.agents + ')')
  if (sc.agentsPrefix !== undefined && labels.join(', ') !== subst2(sc.agentsPrefix)) probs.push('agents: ' + labels.join(', ') + ' (expected ' + subst2(sc.agentsPrefix) + ')')
  for (const a of (sc.agentsHas || [])) if (!labels.includes(subst(a))) probs.push('no agent ' + subst(a))
  for (const a of (sc.agentsLack || [])) if (labels.includes(subst(a))) probs.push('an agent ' + subst(a) + ' ran')
  if (sc.landed !== undefined && (!result || !!result.landed !== sc.landed)) probs.push('landed ' + (result && result.landed) + ' (expected ' + sc.landed + ')')
  if (sc.held !== undefined && result && !!result.pushHeld !== sc.held) probs.push('pushHeld ' + result.pushHeld + ' (expected ' + sc.held + ')')
  if (commit && /1a\. The gate below ran/.test(commit.prompt) !== !!sc.step1a) probs.push('step 1a ' + !sc.step1a)
  if (sc.ungatedIn1a && !(commit && commit.prompt.indexOf(sc.ungatedIn1a) >= 0 && commit.prompt.indexOf('# repair-ungated') >= 0)) probs.push('step 1a does not record ' + sc.ungatedIn1a)
  if (sc.notIn1a && commit && /"ungated": \[[^\]]*\.claude\//.test(commit.prompt)) probs.push('step 1a records ' + sc.notIn1a + ' as an ungated path')
  if (labels.some(l => /^coldread/.test(l))) probs.push('a cold reader ran: the batch writes no skill text, and the cold read follows the skill writer after the landing')
  if (sc.states) for (const [k, st] of Object.entries(sc.states)) {
    const r = (result && result.rungs || []).find(x => x.rung === subst(k))
    if (!r || r.state !== st) probs.push(subst(k) + ' state ' + (r && r.state) + ' (expected ' + st + ')')
  }
  if (sc.notLanded) { const g = calls.find(c => c.label === 'gather'); for (const k of sc.notLanded) if (!g || g.prompt.indexOf('"rung": "' + subst(k) + '"') < 0 || g.prompt.indexOf('"Not landed"') < 0) probs.push('the gather\'s prompt does not fold ' + subst(k) + ' as not landed') }
  if (sc.items) { const ids = (result && result.forCurator || []).map(i => i.id); for (const id of sc.items) if (!ids.includes(subst(id))) probs.push('item ' + subst(id) + ' not in the result (' + ids.join(', ') + ')') }
  if (sc.itemsLack) { const ids = (result && result.forCurator || []).map(i => i.id); for (const id of sc.itemsLack) if (ids.includes(subst(id))) probs.push('item ' + subst(id) + ' is in the result, where it should not be') }
  if (sc.gateJudgeTier) { const j = calls.find(c => c.label === 'judge:gate'); if (!j || String(j.opts.model) !== sc.gateJudgeTier) probs.push('judge:gate model ' + (j && j.opts.model) + ' (expected ' + sc.gateJudgeTier + ')') }
  if (sc.specData !== undefined && JOINS.length) {
    const g = calls.find(c => c.label === 'gate')
    const runs = !!(g && /Then ant testSpecData to /.test(g.prompt) && /brings it into the gate in this batch/.test(g.prompt))
    if (runs !== sc.specData) probs.push('the gate ' + (runs ? 'runs' : 'does not run') + ' testSpecData (expected ' + sc.specData + ')')
  }
  if (sc.contestedBrief) {
    const s = calls.find(c => c.label === 'skeptic:' + subst(sc.contestedBrief)), j = calls.find(c => c.label === 'judge:' + subst(sc.contestedBrief))
    if (!j || j.prompt.indexOf('git revert --no-edit') < 0 || j.prompt.indexOf('"workerArgument"') < 0) probs.push('the contested judge\'s brief lacks the revert or the contested fixes')
    if (s && j && j.prompt.length >= s.prompt.length) probs.push('the contested judge\'s brief, ' + j.prompt.length + ' characters, is not shorter than its skeptic\'s, ' + s.prompt.length)
  }
  // Every brief.
  for (const c of calls) {
    const p = c.prompt
    const m = /.{0,60}(\bundefined\b(?! name)|\[object Object\]|\bNaN\b).{0,60}/.exec(p)   // the manifest's own text speaks of an undefined name
    if (m) probs.push(c.label + ' prompt holds: ' + JSON.stringify(m[0]))
    if (/global\.map/.test(p)) probs.push(c.label + ' still restores or names global.map')
    if (/-base - |WORKTREE-base|private copy of the base/.test(p)) probs.push(c.label + ' still names a per-rung copy of the base')
    if (/pinned to one thread/.test(p)) probs.push(c.label + ' says the gate is pinned to one thread')
    if (/\brun_bg\b/.test(p)) probs.push(c.label + ' names run_bg, which the permission check refuses: the skill\'s session.md, "Long commands", gives the nohup form')
    if (/stopsMet|liftedBy|second judgement/.test(p)) probs.push(c.label + ' names the old stops or the second skeptic')
    const persons = (p.replace(PLAN_HEADING, '').match(PERSON) || []).length
    if (persons) probs.push(c.label + ' names the curator by name ' + persons + ' time(s) outside PLAN.md\'s heading')
    if (p.indexOf('# Fortress climb batch ') < 0 || p.indexOf('The fortress-repo skill says how to work in this repository') < 0 || p.indexOf('## Points to report') < 0) probs.push(c.label + ' lacks the head, its pointer to the skill, or the points to report')
    if (/revival-changes\.md|\.claude\/skills\//.test(p)) probs.push(c.label + ' names the skill\'s revival-changes part or a skill path: no stage of a batch writes skill text')
    if (/^(rung|resume|repair):/.test(c.label) && !/^repair:(review|gate)/.test(c.label)) {
      if (p.indexOf(BASE_BUILD + '/explorations/coordinator/tools/seed-worktree.sh ' + BASE_BUILD + ' ') < 0) probs.push(c.label + ' lacks the seed command')
      if (p.indexOf('NEW-') < 0 || p.indexOf('ledger.py') < 0) probs.push(c.label + ' lacks the ledger placeholders or ledger.py')
      if (p.indexOf('a section headed "Revival change"') < 0 || p.indexOf('"The change"') < 0 || p.indexOf('"Provenance"') < 0 || p.indexOf('Name no question, item, batch, rung or record file in the change, and give no decision\'s status there; provenance goes in its own part.') < 0) probs.push(c.label + ' does not ask for the "Revival change" section in its two labelled parts, with the rule on the change part')
    }
    if (/^skeptic:/.test(c.label)) {
      if (p.indexOf('## You build nothing to check') < 0 || p.indexOf(BASE_BUILD + '/explorations/coordinator/tools/old-fortress.sh ' + BASE_BUILD + ' ') < 0 || p.indexOf('/tmp/old-caches') < 0) probs.push(c.label + ' lacks "You build nothing to check" or the old-code tool with the rung\'s caches folder')
      if (p.indexOf('journal-text.py --journal "$D"/journal.jsonl') < 0) probs.push(c.label + ' lacks the command that writes the worker\'s report from the journal')
      if (p.indexOf(REPORT_SENTINEL) >= 0 || p.indexOf(RECORD_SENTINEL) >= 0) probs.push(c.label + ' carries the worker\'s report or record text')
      if (p.indexOf('## What you do with a finding: fix it') < 0 || p.indexOf('Skeptic\'s fix:') < 0) probs.push(c.label + ' does not have the skeptic fix what it finds')
      const chk = p.slice(p.indexOf('## What you check'), p.indexOf('## You build nothing to check'))
      if (/(^|[^A-Za-z])ant compileAll|rebuil|git (checkout|switch|stash|reset)/.test(chk)) probs.push(c.label + ' asks for a build or a checkout in its checks')
    }
    if (c.label === 'commit' && (p.indexOf('git diff --name-only BASE HEAD -- .claude/') < 0 || p.indexOf('skillTouched') < 0)) probs.push('the commit stage does not check .claude/ against the base or return skillTouched')
    if (c.label === 'commit') {
      if (p.indexOf('Do NOT push') < 0 && !(p.indexOf('git push origin main:claude/worker-brief-fable-vnnuv8') >= 0 && p.indexOf('git push origin main:blinded-fable') >= 0)) probs.push('the commit stage does not push to the three branches')
      const mg = p.match(/mg-run\.sh[^']*'/)   // step 0's line, to the end of its nohup bash -c '...'
      if (!mg || / full/.test(mg[0])) probs.push('the commit stage does not run the quick microGPT check')
      if (p.indexOf('<short hash>') >= 0) probs.push('the commit stage still replaces hash placeholders')
    }
    if (c.label === 'gather' && (p.indexOf('/ledger.py add FILE') < 0 || p.indexOf('/ledger.py close N --commit') < 0 || p.indexOf('"Revival changes, for the skill writer"') < 0 || p.indexOf('Write nothing under .claude/') < 0)) probs.push('the gather lacks ledger.py add, close, the copy of the revival-change material into RECORD.md, or the rule to write nothing under .claude/')
    if (/^gate/.test(c.label) && (p.indexOf('machine.sh') < 0 || p.indexOf('four threads') < 0)) probs.push(c.label + ' lacks the machine line or the four threads')
    if (c.label === 'review' && (p.indexOf('NEW-[A-Z]-[0-9]') < 0 || p.indexOf('skepticFixes') < 0)) probs.push('the review does not check the placeholders or the skeptics\' fixes')
    if (c.label === 'review' && !/revival-change material the gather copied into [^ ]*RECORD\.md, under "Revival changes, for the skill writer", true of the code as landed/.test(p)) probs.push('the review does not check the revival-change material in RECORD.md against the landed code')
  }
  return probs
}

;(async () => {
  // The scatter order, from a plain run: the order of the rung: labels.
  const plain = await run({ name: 'order', over: {} })
  SCATTER_IDS = plain.calls.filter(c => /^rung:/.test(c.label)).map(c => c.label.split(':')[1])
  if (SIZES_DIR) return sizes(SIZES_DIR)
  for (const sc of SCEN) {
    const o = await run(sc)
    if (DUMP_DIR) {
      fs.mkdirSync(DUMP_DIR, { recursive: true })
      for (const c of o.calls) fs.writeFileSync(path.join(DUMP_DIR, sc.name.split(' ')[0] + '--' + c.label.replace(/[^A-Za-z0-9-]+/g, '_') + '.txt'), c.prompt)
    }
    const probs = check(sc, o)
    const ids = (o.result && o.result.forCurator || []).map(i => i.id)
    const what = o.threw ? 'stopped: ' + o.threw.message.slice(0, 120) : 'landed ' + (o.result && o.result.landed) + (o.result && o.result.pushHeld ? '; push held' : '') + (ids.length ? '; items ' + ids.join(', ') : '')
    say(!probs.length, sc.name + ': ' + (o.calls.map(c => c.label).filter(l => !SCATTER_LABEL.test(l)).join(', ') || '(no stage after the scatter)') + '; ' + what + (probs.length ? '\n     ' + probs.join('\n     ') : ''))
  }
  // A18: the run stopped in the commit stage and resumed from its journal.
  {
    const sc = { name: 'A18', over: {}, killAt: 'commit' }
    const journal = new Map()
    const r1 = await run(sc, journal, null)
    const r2 = await run(sc, null, journal)
    const live = r2.calls.filter(c => !c.fromJournal).map(c => c.label)
    const commit = r2.calls.find(c => c.label === 'commit' && !c.fromJournal)
    const probs = []
    if (!r1.threw || !/commit stage/.test(r1.threw.message)) probs.push('run 1 did not stop in the commit stage')
    if (live.join(', ') !== 'commit') probs.push('live calls on resume: ' + live.join(', '))
    if (!(commit && /\[ -e [^\]]*microgpt-walk\.txt \] \|\| nohup bash -c /.test(commit.prompt))) probs.push('step 0 does not guard against a second microGPT start')
    say(!probs.length, 'A18 a process stop mid-commit, resumed with resumeFromRunId: ' + (r2.calls.length - live.length) + ' calls from the journal, live: ' + live.join(', ') + (probs.length ? '\n     ' + probs.join('\n     ') : ''))
  }
  // L4: L1 resumed once the limit has reset: the finished agents come back from the journal.
  {
    const sc = { name: 'L4', over: {}, limitAt: 'skeptic:S1', limitAs: 'null' }
    const journal = new Map()
    const r1 = await run(sc, journal, null)
    sc.limited = false
    const r2 = await run(sc, null, journal)
    const cached = r2.calls.filter(c => c.fromJournal).map(c => c.label)
    const live = r2.calls.filter(c => !c.fromJournal).map(c => c.label)
    const probs = []
    if (!r1.threw || !HALT_TEXT.test(r1.threw.message)) probs.push('run 1 did not stop')
    if (live[0] !== 'skeptic:' + SCATTER_IDS[1]) probs.push('the first live call is ' + live[0] + ', not skeptic:' + SCATTER_IDS[1])
    if (r2.threw || !r2.result || !r2.result.landed || r2.result.rungs.some(x => x.state !== 'approved')) probs.push('the resume did not land every rung: ' + (r2.threw ? r2.threw.message.slice(0, 120) : JSON.stringify(r2.result && r2.result.rungs.map(x => x.state))))
    say(!probs.length, 'L4 L1 resumed once the limit has reset: from the journal ' + cached.join(', ') + '; live first ' + live[0] + (probs.length ? '\n     ' + probs.join('\n     ') : ''))
  }
  console.log('problems: ' + bad)
  process.exit(bad ? 1 : 0)
})().catch(e => { console.log('ERROR ' + (e && e.stack || e)); process.exit(2) })

// ---------------------------------------------------------------------------
// --sizes: each role's brief rendered with a real run's results, against that run's own first messages.
async function sizes(dir) {
  const journal = fs.readFileSync(path.join(dir, 'journal.jsonl'), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l))
  const labelOf = {}, results = {}
  for (const e of journal) { if (e.type === 'started') labelOf[e.key] = e.label; if (e.type === 'result') results[labelOf[e.key]] = e.result }
  // That run's first messages, by role.
  const firstMsg = {}
  for (const f of fs.readdirSync(dir).filter(f => /^agent-.*\.meta\.json$/.test(f))) {
    const meta = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))
    const lines = fs.readFileSync(path.join(dir, f.replace('.meta.json', '.jsonl')), 'utf8').split('\n').filter(Boolean)
    for (const l of lines) { const e = JSON.parse(l); if (e.type === 'user' && e.message) { const c = e.message.content; firstMsg[meta.description] = typeof c === 'string' ? c.length : c.map(x => (x.text || '').length).reduce((a, b) => a + b, 0); break } }
  }
  const role = (label) => label.replace(/:.*$/, '').replace(/^gate.*/, 'gate')
  const theirs = {}
  for (const [l, n] of Object.entries(firstMsg)) (theirs[role(l)] = theirs[role(l)] || []).push(n)
  // Their results mapped onto this script's rungs, in order, fields renamed.
  const oldIds = Object.keys(results).filter(l => /^rung:/.test(l)).map(l => l.split(':')[1])
  const rename = (r) => { if (!r || typeof r !== 'object') return r; const x = Object.assign({}, r); x.forCurator = x.forPavol || []; delete x.forPavol; x.pointsReached = []; delete x.stopsMet; delete x.pavolItems; delete x.pavolUnrouted; return x }
  const over = {}
  IDS.forEach((id, i) => {
    const o = oldIds[i % oldIds.length]
    over['rung:' + id] = () => rename(results['rung:' + o])
    over['skeptic:' + id] = () => Object.assign(rename(results['skeptic:' + o]), { verdict: i === 0 ? 'contested' : 'approved', fixes: i === 0 ? [FIX] : [], contested: i === 0 ? [{ commit: 'f1x0001', finding: String(results['skeptic:' + o].refusalReason || 'f').slice(0, 600), why: 'worker-argued', workerArgument: 'w', skepticArgument: 's' }] : [], headJudged: 'abc1234' })
    over['judge:' + id] = () => Object.assign(rename(results['judge:' + o] || results['judge:' + oldIds[0]]), { decision: 'stands', rulings: [] })
  })
  over.gather = () => Object.assign(rename(results.gather), { curatorItems: [], curatorUnrouted: [] })
  over.review = () => rename(results.review)
  over.gate = () => rename(results.gate)
  over.commit = () => Object.assign(rename(results.commit), { microgptWalk: MG_PASS })
  const o = await run({ name: 'sizes', over })
  if (o.threw) { console.log('the sizes run stopped: ' + o.threw.message); process.exit(2) }
  const mine = {}
  for (const c of o.calls) (mine[role(c.label)] = mine[role(c.label)] || []).push(c.prompt.length)
  const mean = (a) => a && a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0
  const tok = (ch) => Math.round((41.7e3 + 0.425 * ch) / 1000) + 'K'
  console.log('role\tthis script: agents, mean brief in characters, first call by the fit\tthat run (' + path.basename(dir) + '): agents, mean first message, first call by the fit')
  for (const r of Array.from(new Set(Object.keys(mine).concat(Object.keys(theirs))))) {
    console.log(r + '\t' + (mine[r] ? mine[r].length + ', ' + mean(mine[r]) + ', ' + tok(mean(mine[r])) : '-') + '\t' + (theirs[r] ? theirs[r].length + ', ' + mean(theirs[r]) + ', ' + tok(mean(theirs[r])) : '-'))
  }
}
