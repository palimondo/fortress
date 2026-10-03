// workflow-scenarios.js [SCRIPT]
//
// The scenario checker of the batch workflow script, explorations/coordinator/climb-batch-workflow.js
// (its manual: explorations/coordinator/climb-batch-workflow.md). SCRIPT defaults to the working copy. Nothing
// is launched and nothing is built: the script runs as the Workflow harness runs it, its text with
// "export const meta" made "const meta" as the body of an async function, with the harness's globals (args,
// agent, pipeline, log) stubbed, once per scenario, and each run's agents, in the order they are called, and
// its result are compared with what the scenario expects. Its last line counts the problems; exit 1 if any.
//
// Before the runs: node --check, and the harness's parse (FACTS.md, "node --check does not check the batch
// script as the Workflow harness parses it ..."), on SCRIPT and on the spliced copy below; no backtick in the
// script but the gate's awk line's one, and no non-ASCII character.
//
// The scenarios name climb batch 7b's rungs, S, C, W and L. So the script's MANIFEST block is replaced, in a
// scratch copy under tmp/ (ignored), by the block of the script as batch 7b launched (BLOCK_REV, launch values
// set), and every line outside the block is checked byte-identical: the code under test is SCRIPT's, whatever
// batch's block it carries. The stubbed pipeline runs one item at a time, each through both stages, and, as
// the harness's does, drops to null an item whose stage throws.
//
// Its scenarios: batch N's checkn.js (compile-ladder/plan-n/manifest/, removed from the tree at ab067d9b6;
// it expected the second review, which the post-mortem of 2026-09-29 removed), then the script review's
// scen.js of 2026-09-29 (postmortem-2026-09-29/script-review.md, "The scenarios run"; run in a scratchpad and
// not committed), whose 22 paths and one resume are carried here with the landings the fixes of that night
// give A10 to A13 (climb-batch-workflow.md, "Measured, and not"), and the scenarios of the stop on a usage
// limit (reviews/batch-7b-review.md, finding 1): L1 to L3 and L5, the resume L4, A6's judge and A19's worker that
// return nothing;
// and in every scenario, each skeptic's brief carrying the worker's report text and not its record text (finding 4),
// and every brief the whole-suite rule and the recovery text on logs, the skeptic's its reading of the result (finding 5),
// and the command that makes the rung's worktree, no brief saying the build was copied in (finding 9); and,
// since the strip of line numbers from the tests (dc0eee2fe), the prefix's rule that a test cites the specification
// by file and section, no role asking for tests re-anchored, and the skeptic's check of a citation's section.
// Since 2026-10-02 (POSITIONS.md, "Test first, the test kept." and "Nothing is built or run twice on the same
// code."; coordinator/skeptic-scope-judgement.md; coordinator/build-cache-exploration.md): every brief makes the
// worktree by seed-worktree.sh from the base build that args.baseBuild names; no skeptic's role text asks for a
// build, an ant target, a rebuild or a checkout (its rung's paragraph for the skeptic, the record's words, aside),
// and each carries that paragraph, the transcript commands and the rung's copy of the base; a second skeptic's
// brief is its own short one (S1); the gate after a repair reruns only for a path it reads (D1 to D4); and the
// script refuses to start without args.baseBuild (B1). And, the same day: a second skeptic's text that the harness
// refused to write, beside a first skeptic's committed SKEPTIC.md, reaches the gather as a command of its own (G1; none
// when the second committed its file, S1); every brief caps wait_for's bound at 270; the stage-blind paths name the test
// harness's sources; the skeptic's check 8 is the review's check 3.
// Since 2026-10-03, climb batch 9's review (reviews/batch-9-review.md, findings 1 to 4, 6 and 7): every brief carries the
// prefix's rule against a partial stage run before the full one, REPORT.md's list of the specification's sentences a change
// makes false, and the lines that find and read a resumed worker's predecessor's transcript; each first skeptic refuses
// only where the repair touches code, a reserved reversible stop going in stopsMet; each repair on the merged tree reads
// the slices of the rungs its instructions name only; the gather corrects the sentences a rung makes false; and the
// commit stage writes FACTS' landed count and distance.
const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const crypto = require('crypto')

const ROOT = process.env.FORTRESS_HOME || path.resolve(__dirname, '../../..')
const SCRIPT_PATH = 'explorations/coordinator/climb-batch-workflow.js'
const BLOCK_REV = '811053f15'   // the script as climb batch 7b launched: rungs S, C, W and L, LEDGER_FROM 534, CHECKER_BASE 75, Q4 1
const BASE_BUILD = '/home/user/fortress-base'   // args.baseBuild in every scenario but B1
const SEED_CMD = BASE_BUILD + '/explorations/coordinator/tools/seed-worktree.sh ' + BASE_BUILD + ' WORKTREE BRANCH BASE'
const TMP = path.join(ROOT, 'tmp', 'workflow-scenarios')
const target = process.argv[2] || path.join(ROOT, SCRIPT_PATH)
const orig = fs.readFileSync(target, 'utf8')
const pinned = cp.execFileSync('git', ['-C', ROOT, 'show', BLOCK_REV + ':' + SCRIPT_PATH], { encoding: 'utf8', maxBuffer: 1 << 26 })

function bounds(text) {
  const lines = text.split('\n')
  const start = lines.findIndex(l => l.startsWith('// MANIFEST - the coordinator replaces')) - 1
  const end = lines.findIndex(l => l.startsWith('// =========================== END MANIFEST'))
  if (start < 0 || !/^\/\/ =+$/.test(lines[start]) || end < start) throw new Error('no MANIFEST block')
  return { lines, start, end }
}
const t = bounds(orig), p = bounds(pinned)
const pre = t.lines.slice(0, t.start).join('\n'), post = t.lines.slice(t.end).join('\n')
const spliced = pre + '\n' + p.lines.slice(p.start, p.end).join('\n') + '\n' + post

let bad = 0
const say = (ok, line) => { if (!ok) bad++; console.log((ok ? 'ok   ' : 'BAD  ') + line) }
fs.mkdirSync(TMP, { recursive: true })
const splicedFile = path.join(TMP, 'spliced.js')
fs.writeFileSync(splicedFile, spliced)
say(spliced.startsWith(pre + '\n') && spliced.endsWith(post), 'the script\'s MANIFEST block is lines ' + (t.start + 1) + ' to ' + t.end + ' of ' + t.lines.length + '; the spliced copy carries ' + BLOCK_REV + '\'s block, every line outside it byte-identical')
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
for (const [name, file, text] of [['the script', target, orig], ['the spliced copy', splicedFile, spliced]]) {
  const r = cp.spawnSync('node', ['--check', file], { encoding: 'utf8' })
  say(r.status === 0, 'node --check, ' + name + ': exit ' + r.status + (r.stderr.trim() ? ' ' + r.stderr.trim().slice(0, 300) : ''))
  let err = null
  try { new AsyncFunction('args', 'agent', 'pipeline', 'parallel', 'log', text.replace(/^export const meta/m, 'const meta')) } catch (e) { err = e }
  say(!err, 'the harness\'s parse, ' + name + ': ' + (err ? 'refused, ' + err.message : 'accepted as an async function body, its export made const'))
}
const ticks = orig.split('\n').filter(l => l.indexOf('mg_phases ()') < 0).join('\n').match(/\x60/g) || []
say(!ticks.length && !/[^\x00-\x7f]/.test(orig), 'the script holds ' + ticks.length + ' backtick(s) outside the gate\'s awk line (mg_phases), whose two are allowed, and ' + ((orig.match(/[^\x00-\x7f]/g) || []).length) + ' non-ASCII character(s)')

const body = spliced.replace(/^export const meta/m, 'const meta')

// ---------------------------------------------------------------------------
// The stubs.
const RUN_OK = { file: 'ProjectFortress/compiler_tests/XXXStub.test', paths: ['ProjectFortress/compiler_tests/XXXStub.test', 'ProjectFortress/compiler_tests/XXXStub.fss'], suite: 'fast-compiler/CompilerJUTest', cases: 1, verdict: 'pass', capture: 'tmp/gate-batch-7b/repair-review-tests/stub.txt' }
const TESTS_ONLY = ['ProjectFortress/compiler_tests/XXXStub.test', 'ProjectFortress/compiler_tests/XXXStub.fss', 'explorations/compile-ladder/climb-batch-7b/REPAIR-review.md']
const CODE = TESTS_ONLY.concat(['ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Stub.scala'])
const repairStub = (paths, runs, answered, extra) => () => Object.assign({ landed: true, stopped: false, summary: 'stub', stopsMet: [], forPavol: [], pavolItems: [], headBefore: 'a', headAfter: 'b', pathsChanged: paths, testRuns: runs, failingAnswered: answered || [] }, extra || {})
const review = (x) => () => Object.assign({ approved: true, blockingCode: [], routed: [], fixed: [], pathsOutsideExplorations: [], stopsMet: [], forPavol: [], pavolItems: [], summary: 's' }, x)
const codeFinding = { review: review({ approved: false, blockingCode: ['stub code finding'] }), 'judge:review': () => ({ decision: 'repair', forPavol: [], instructions: ['1. fix'] }) }
const red = (lines) => () => ({ green: false, failing: lines || ['XXXStub.test: stub'], countsDown: [], stopped: false })
const REPORT_SENTINEL = 'REPORTTEXT-SENTINEL', RECORD_SENTINEL = 'RECORDTEXT-SENTINEL'
const worker = (x) => () => Object.assign({ landed: true, stopped: false, summary: 'stub', stopsMet: [], forPavol: [], reportText: REPORT_SENTINEL, recordText: RECORD_SENTINEL }, x || {})
const refuse = () => ({ approved: false, refusalReason: 'stub refusal', stopsMet: [], forPavol: [], findings: ['f'], requiredCorrections: [], recommendedRows: [], judgedHead: 'abc1234', skepticText: 'committed' })
const nul = () => null
// What agent() gave the script at the weekly limit in climb batch 7b: null, the harness logging
// "[skeptic:C] failed: You've hit your weekly limit" (run wf_61521277-479, its result's logs).
const LIMIT_MESSAGE = 'You\'ve hit your weekly limit, resets Oct 2, 10am (UTC)'

// after: the agents after the scatter, in order (rung, skeptic, resume, repair round and rung judges left out).
// agents: when given, every agent in order. landed, held, step1a, notLanded, items: the result.
// halts: the run stops with the error that says nothing was decided, naming that role.
const SCEN = [
  { name: 'R1 every agent approves', over: {}, after: 'gather, gate, review, commit', landed: true },
  { name: 'R2 the review routes a tests-only finding, no judge', over: { review: review({ routed: ['XXXFoo owed'] }) }, after: 'gather, gate, review, commit', landed: true, items: ['review-routed.1'] },
  { name: 'R5 a code finding, its repair changes a checker source', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(CODE, [RUN_OK]) }), after: 'gather, gate, review, judge:review, repair:review, gate:after-review, commit', landed: true },
  { name: 'A1 rung W: its skeptic refuses twice', over: { 'skeptic:W': refuse, 'judge:W': () => ({ decision: 'repair', forPavol: [], instructions: ['1. x'] }), 'skeptic2:W': refuse },
    after: 'gather, gate, review, commit', landed: true, notLanded: { W: 'dropped' } },
  { name: 'A2 rung C dropped by its judge; S lands only with C', over: { 'skeptic:C': refuse, 'judge:C': () => ({ decision: 'drop', forPavol: [], instructions: [] }) },
    after: 'gather, gate, review, commit', landed: true, notLanded: { C: 'dropped', S: 'withheld' } },
  { name: 'A3 every rung dropped by its judge: nothing to gather', over: { 'skeptic:S': refuse, 'skeptic:C': refuse, 'skeptic:W': refuse, 'skeptic:L': refuse, 'judge:S': () => ({ decision: 'drop' }), 'judge:C': () => ({ decision: 'drop' }), 'judge:W': () => ({ decision: 'drop' }), 'judge:L': () => ({ decision: 'drop' }) },
    after: '', landed: false },
  { name: 'A4 rung L stops, its judge rules a continuation, the resumed worker lands', over: { 'rung:L': worker({ stopped: true, stopReason: 'stub fork' }), 'judge:L:stop': () => ({ decision: 'repair', forPavol: [], instructions: ['1. go on'] }) },
    after: 'gather, gate, review, commit', landed: true },
  { name: 'A5 a red gate the judge cannot answer (stop)', over: { gate: red(), 'judge:gate': () => ({ decision: 'stop', forPavol: ['fork'], instructions: [] }) },
    after: 'gather, gate, review, judge:gate', landed: false, items: ['judge-gate.1'] },
  // Since climb batch 7b's review, finding 1: a judge that returns nothing stops the run, deciding nothing,
  // where it was read as a judge that did not order a repair.
  { name: 'A6 a red gate whose judge agent returns nothing on all three attempts', over: { gate: red(), 'judge:gate': nul },
    after: 'gather, gate, review, judge:gate, judge:gate:attempt2, judge:gate:attempt3', halts: 'judge:gate' },
  { name: 'A7 a code finding whose repair turns the gate red; the gate repair fixes code; second gate green', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(CODE, [RUN_OK]), 'gate:after-review': red(['CompilerJUTest: Foo failed']), 'judge:gate': () => ({ decision: 'repair', forPavol: [], instructions: ['1. fix'] }), 'repair:gate': repairStub(CODE, [RUN_OK]) }),
    after: 'gather, gate, review, judge:review, repair:review, gate:after-review, judge:gate, repair:gate, gate2, commit', landed: true, gateJudgeTier: 'fable' },
  { name: 'A8 as A7 but the second gate is red too', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(CODE, [RUN_OK]), 'gate:after-review': red(['CompilerJUTest: Foo failed']), 'judge:gate': () => ({ decision: 'repair', forPavol: [], instructions: ['1. fix'] }), 'repair:gate': repairStub(CODE, [RUN_OK]), gate2: red(['still']) }),
    after: 'gather, gate, review, judge:review, repair:review, gate:after-review, judge:gate, repair:gate, gate2', landed: false },
  { name: 'A9 a code finding, gate red beside the review, the review repair (tests only) answers it', over: Object.assign({}, codeFinding, { gate: red(), 'repair:review': repairStub(TESTS_ONLY, [RUN_OK], [{ failing: 'XXXStub.test: stub', file: RUN_OK.file }]) }),
    after: 'gather, gate, review, judge:review, repair:review, commit', landed: true, step1a: true },
  { name: 'A10 the review repair meets a stop no decision lifts: the push held', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(CODE, [RUN_OK], [], { stopsMet: [{ stop: 'a test whose verdict changed other than by intent', evidence: 'x:1', liftedBy: '' }] }) }),
    after: 'gather, gate, review, judge:review, repair:review, gate:after-review, commit', landed: false, held: true },
  { name: 'A11 the review repair agent returns nothing on all three attempts: lands, its finding listed', over: Object.assign({}, codeFinding, { 'repair:review': nul }),
    after: 'gather, gate, review, judge:review, repair:review, repair:review:attempt2, repair:review:attempt3, gate:after-review, commit', landed: true, items: ['review-unrepaired.1'] },
  { name: 'A12 the review repair stops with nothing changed: lands, its finding listed', over: Object.assign({}, codeFinding, { 'repair:review': repairStub([], [], [], { landed: false, stopped: true, stopReason: 'a reserved fork' }) }),
    after: 'gather, gate, review, judge:review, repair:review, commit', landed: true, items: ['review-unrepaired.1'] },
  { name: 'A13 the review agent returns nothing on all three attempts: lands on its gate, listed', over: { review: nul },
    after: 'gather, gate, review, review:attempt2, review:attempt3, commit', landed: true, items: ['review-missing.1'] },
  { name: 'A14 the review fixes a test file itself (path outside explorations/)', over: { review: review({ pathsOutsideExplorations: ['ProjectFortress/compiler_tests/Foo.fss'], fixed: ['Foo.fss'] }) },
    after: 'gather, gate, review, gate:after-review, commit', landed: true },
  { name: 'A15 routed and code findings, the judge rules land', over: { review: review({ approved: false, blockingCode: ['c'], routed: ['r1', 'r2'] }), 'judge:review': () => ({ decision: 'land', forPavol: [], instructions: ['1. step'] }) },
    after: 'gather, gate, review, judge:review, commit', landed: true, items: ['review-routed.1', 'review-routed.2', 'judge-review-land.1'] },
  { name: 'A16 the gather is unresolved', over: { gather: () => ({ unresolved: true, summary: 'conflict', commits: [], conflicts: ['x'], pavolItems: [], pavolUnrouted: [] }) },
    after: 'gather', landed: false },
  // Since the same finding, extended by Pavol's approval: a rung worker that returns nothing stops the run too.
  { name: 'A19 rung W\'s worker returns nothing on all three attempts', over: { 'rung:W': nul },
    agents: 'rung:W, rung:W:attempt2, rung:W:attempt3', halts: 'rung:W' },
  { name: 'A20 the gate cannot run (stopped)', over: { gate: () => ({ green: false, failing: [], stopped: true, countsDown: [] }) },
    after: 'gather, gate, review', landed: false },
  { name: 'A17 a held push: the microGPT start and the kept worktrees', over: { 'skeptic:W': () => ({ approved: true, stopsMet: [{ stop: 'stub', evidence: 'x:1', liftedBy: '' }], forPavol: [] }) },
    after: 'gather, gate, review, commit', landed: false, held: true },
  // 2026-10-02: the second skeptic's own short brief (POSITIONS.md, "Nothing is built or run twice on the same code.").
  { name: 'S1 rung C refused, the judge orders a repair, its second skeptic approves: the second brief is its own', over: { 'skeptic:C': refuse, 'judge:C': () => ({ decision: 'repair', forPavol: [], instructions: ['1. stub instruction'], ruling: 'stub ruling' }) },
    after: 'gather, gate, review, commit', landed: true, secondBrief: 'C', secondText: false },
  { name: 'G1 C\'s second skeptic carries its text, the harness having refused its write, beside the first one\'s committed file: the gather gets the command that writes it', over: { 'skeptic:C': refuse, 'judge:C': () => ({ decision: 'repair', forPavol: [], instructions: ['1. stub instruction'] }), 'skeptic2:C': () => ({ approved: true, stopsMet: [], forPavol: [], skepticText: 'SECOND-JUDGEMENT-SENTINEL', findings: ['the harness refused the write of SKEPTIC.md'] }) },
    after: 'gather, gate, review, commit', landed: true, secondBrief: 'C', secondText: true },
  // 2026-10-02: the gate after a repair reruns only for a path it reads (ProjectFortress/, Library/, build.xml);
  // batch 8's second gate repeated the first after a repair of one sentence of changes.tex.
  { name: 'D1 a code finding whose repair changes only the specification\'s text: no second gate, recorded beside it', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(['Specification/appendices/changes.tex', 'explorations/compile-ladder/climb-batch-7b/REPAIR-review.md'], []) }),
    after: 'gather, gate, review, judge:review, repair:review, commit', landed: true, step1a: true, ungatedIn1a: 'Specification/appendices/changes.tex' },
  { name: 'D2 the repair changes a library source: the gate runs again', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(['Library/CompilerLibrary.fss', 'Specification/appendices/changes.tex'], []) }),
    after: 'gather, gate, review, judge:review, repair:review, gate:after-review, commit', landed: true },
  { name: 'D3 the repair changes build.xml: the gate runs again', over: Object.assign({}, codeFinding, { 'repair:review': repairStub(['build.xml'], []) }),
    after: 'gather, gate, review, judge:review, repair:review, gate:after-review, commit', landed: true },
  { name: 'D4 the review\'s own corrections touch only the specification\'s text: the gate stands, recorded beside it', over: { review: review({ pathsOutsideExplorations: ['Specification/basic/types.tex'], fixed: ['types.tex'], headBefore: 'h1', headAfter: 'h2' }) },
    after: 'gather, gate, review, commit', landed: true, step1a: true, ungatedIn1a: 'Specification/basic/types.tex' },
  // 2026-10-02: the batch's one base build is a launch argument; without it the script does not start.
  { name: 'B1 launched without args.baseBuild', over: {}, args: { base: 'BASE' }, agents: '', threwWith: 'args.baseBuild is required' },
  // Climb batch 7b's review, finding 1: a usage or rate limit stops the run and decides nothing.
  { name: 'L1 the weekly limit as batch 7b met it: W done, every agent from C\'s skeptic on returns nothing', over: {}, limitAt: 'skeptic:C', limitAs: 'null',
    agents: 'rung:W, skeptic:W, rung:C, skeptic:C, skeptic:C:attempt2, skeptic:C:attempt3', halts: 'skeptic:C' },
  { name: 'L2 a usage limit that agent() throws, at C\'s skeptic: no second attempt', over: {}, limitAt: 'skeptic:C', limitAs: 'throw',
    agents: 'rung:W, skeptic:W, rung:C, skeptic:C', halts: 'skeptic:C' },
  // The review starts beside the gate before the gate's error is back, and stops on the limit too.
  { name: 'L5 the limit as a null while the last rung\'s worker runs alone, every other chain done', over: {}, limitAt: 'rung:S', limitAs: 'null',
    agents: 'rung:W, skeptic:W, rung:C, skeptic:C, rung:L, skeptic:L, rung:S, rung:S:attempt2, rung:S:attempt3', halts: 'rung:S' },
  { name: 'L3 a usage limit that agent() throws at the gate, beside the review', over: {}, limitAt: 'gate', limitAs: 'throw',
    after: 'gather, gate, review', halts: 'gate' },
]

function mkAgent(sc, calls, journal, replay) {
  let prevKey = 'root'
  return async (prompt, opts) => {
    const L = opts.label
    const key = crypto.createHash('sha256').update(prevKey + '\0' + prompt + '\0' + JSON.stringify(opts)).digest('hex').slice(0, 16)
    prevKey = key
    if (replay && replay.has(key)) { calls.push({ label: L, prompt, opts, fromJournal: true }); return replay.get(key) }
    calls.push({ label: L, prompt, opts })
    if (sc.limitAt && !replay && (L === sc.limitAt || L.startsWith(sc.limitAt + ':'))) sc.limited = true
    if (sc.limited && !replay) {
      if (sc.limitAs === 'throw') throw new Error(LIMIT_MESSAGE)
      return null
    }
    let r
    if (sc.over[L]) r = sc.over[L]()
    else if (/:attempt\d$/.test(L) && sc.over[L.replace(/:attempt\d$/, '')]) r = sc.over[L.replace(/:attempt\d$/, '')]()
    else if (/^(rung|resume|repair):[SCWL]/.test(L)) r = worker()()
    else if (L.startsWith('judge:')) r = { decision: 'stop', forPavol: [], instructions: [] }
    else if (L.startsWith('skeptic')) r = { approved: true, stopsMet: [], forPavol: [] }
    else if (L === 'gather') r = { unresolved: false, summary: 'stub', commits: [], conflicts: [], pavolItems: [], pavolUnrouted: [] }
    else if (L.startsWith('gate')) r = { green: true, failing: [], stopped: false, countsDown: [] }
    else if (L.startsWith('review')) r = review({})()
    else if (L.startsWith('commit')) {
      if (sc.killAt === 'commit' && !replay) { sc.killed = true; return new Promise(() => {}) }
      r = /Do NOT push/.test(prompt) ? { pushed: [], pushHeld: true } : { pushed: ['main'] }
    }
    else r = {}
    // the harness journals a result, and an agent that came back with nothing as failed, never as a result
    if (journal && r !== null && r !== undefined) journal.set(key, r)
    return r
  }
}

async function run(sc, journal, replay) {
  const calls = [], logs = []
  const agent = mkAgent(sc, calls, journal, replay)
  // One item at a time, each through both stages; a stage that throws drops its item to null and skips the
  // stages after it, as the harness's pipeline does. The resume keys depend on this order.
  const pipeline = async (items, ...stages) => {
    const out = []
    for (const it of items) {
      let v = undefined
      try { for (const [i, st] of stages.entries()) v = await (i ? st(v, it) : st(it)) } catch (e) { v = null }
      out.push(v)
    }
    return out
  }
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
const RESUME_TEXT = /resumeFromRunId/

function check(sc, out) {
  const { result, calls, logs, threw } = out
  const probs = []
  const labels = calls.map(c => c.label)
  const after = labels.filter(l => !/^(rung|skeptic|resume|repair:[SCWL]|judge:[SCWL])/.test(l)).join(', ')
  const commit = calls.find(c => c.label === 'commit')
  if (sc.threwWith) {
    if (!threw || threw.message.indexOf(sc.threwWith) < 0) probs.push('expected the script to refuse to start with "' + sc.threwWith + '": ' + (threw ? threw.message.slice(0, 200) : 'it did not'))
  } else if (sc.halts) {
    if (!threw) probs.push('the run did not stop: ' + (result ? 'landed ' + result.landed + (result.reason ? ' (' + result.reason + ')' : '') : 'no result'))
    else if (!HALT_TEXT.test(threw.message) || !RESUME_TEXT.test(threw.message) || threw.message.indexOf(sc.halts) < 0) probs.push('stopped with an error that does not name ' + sc.halts + ', say that nothing was decided and name resumeFromRunId: ' + threw.message.slice(0, 300))
    if (!logs.some(l => HALT_TEXT.test(l) && l.indexOf(sc.halts) >= 0)) probs.push('no log line says the run stops on ' + sc.halts)
    const decided = logs.filter(l => /\(dropped\)|\(worker-died\)|\(withheld\)|takes its path for a dead agent/.test(l))
    if (decided.length) probs.push('a log line reads an empty agent as a decision: ' + decided.join(' | ').slice(0, 300))
    if (labels.some(l => l === 'gather') && !/^gather/.test(sc.after || '')) probs.push('the gather ran')
  } else if (threw) probs.push('THREW ' + threw.message.slice(0, 300))
  if (sc.after !== undefined && after !== sc.after) probs.push('agents after the scatter: ' + (after || '(none)') + ' (expected ' + (sc.after || '(none)') + ')')
  if (sc.agents !== undefined && labels.join(', ') !== sc.agents) probs.push('agents: ' + labels.join(', ') + ' (expected ' + sc.agents + ')')
  if (sc.landed !== undefined && (!result || !!result.landed !== sc.landed)) probs.push('landed ' + (result && result.landed) + ' (expected ' + sc.landed + ')')
  if (sc.held !== undefined && result && !!result.pushHeld !== sc.held) probs.push('pushHeld ' + result.pushHeld + ' (expected ' + sc.held + ')')
  if (commit && /1a\. The gate below ran/.test(commit.prompt) !== !!sc.step1a) probs.push('step 1a ' + !sc.step1a)
  if (sc.ungatedIn1a && !(commit && commit.prompt.indexOf('# repair-ungated') >= 0 && commit.prompt.indexOf(sc.ungatedIn1a) >= 0)) probs.push('step 1a does not record ' + sc.ungatedIn1a + ' under # repair-ungated')
  if (sc.secondText !== undefined) {
    const g = calls.find(c => c.label === 'gather')
    let entry = null
    try { const i = g.prompt.indexOf('The rungs and their verdicts:'), j = g.prompt.indexOf('[', i); entry = JSON.parse(g.prompt.slice(j, g.prompt.indexOf('\n]\n', j) + 2)).find(x => x.rung === sc.secondBrief) } catch (e) { probs.push('the gather\'s list of rungs does not parse: ' + e.message) }
    const cmd = entry && entry.textCommands && entry.textCommands['SKEPTIC.md, when the branch carries it']
    if (!!cmd !== sc.secondText) probs.push('the gather ' + (cmd ? 'has' : 'lacks') + ' the second judgement\'s command for ' + sc.secondBrief)
    if (cmd && !(cmd.indexOf('skepticText skeptic2:' + sc.secondBrief) >= 0 && cmd.indexOf('grep -q \'^# Second judgement\'') >= 0 && cmd.indexOf('## First round') >= 0 && !/["\\]/.test(cmd))) probs.push('the second judgement\'s command is not the one built: ' + cmd)
    if (sc.secondText && g.prompt.indexOf('when the branch carries it" had a second skeptic whose write the harness refused') < 0) probs.push('the gather\'s step 1 does not say when to run it')
  }
  if (sc.secondBrief) {
    const r = (result && result.rungs || []).find(x => x.rung === sc.secondBrief)
    if (!labels.includes('skeptic2:' + sc.secondBrief)) probs.push('no second skeptic ran for ' + sc.secondBrief)
    if (!r || r.state !== 'approved-after-repair') probs.push(sc.secondBrief + ' state ' + (r && r.state) + ' (expected approved-after-repair)')
  }
  if (sc.items) {
    const ids = (result && result.forPavol || []).map(i => i.id)
    for (const id of sc.items) if (!ids.includes(id)) probs.push('item ' + id + ' not in the result (' + ids.join(', ') + ')')
  }
  if (sc.notLanded) {
    const g = calls.find(c => c.label === 'gather')
    for (const [id, st] of Object.entries(sc.notLanded)) {
      const r = (result && result.rungs || []).find(x => x.rung === id)
      if (!r || r.state !== st) probs.push(id + ' state ' + (r && r.state) + ' (expected ' + st + ')')
      if (g && !new RegExp('"rung": "' + id + '"[^}]*"state": "' + st + '"').test(g.prompt)) probs.push('the gather\'s prompt does not list ' + id + ' as ' + st)
    }
  }
  if (sc.gateJudgeTier) {
    const j = calls.find(c => c.label === 'judge:gate')
    if (!j || String(j.opts.model) !== sc.gateJudgeTier) probs.push('judge:gate model ' + (j && j.opts.model) + ' (expected ' + sc.gateJudgeTier + ')')
  }
  for (const c of calls) {
    const m = /.{0,60}(undefined|\[object Object\]|NaN).{0,60}/.exec(c.prompt)
    if (m) probs.push(c.label + ' prompt holds: ' + JSON.stringify(m[0]))
    if (c.label.startsWith('skeptic') && c.prompt.indexOf(RECORD_SENTINEL) >= 0) probs.push(c.label + ' carries the worker\'s record text')
    // climb batch 7b's review, finding 5: the whole-suite rule in the prefix, the skeptic's reading of its result
    if (c.prompt.indexOf('at most once per code state in the rung\'s chain') < 0 || c.prompt.indexOf('A check whose log is complete') < 0) probs.push(c.label + ' lacks the prefix\'s whole-suite rule or its recovery text')
    if (c.label.startsWith('skeptic') && c.prompt.indexOf('nor a whole suite another way') < 0) probs.push(c.label + ' lacks the skeptic\'s whole-suite sentence')
    // climb batch 7b's review, finding 9: the rung worker makes its worktree by the prefix's one command
    // 2026-10-02: wait_for caps its bound at 270 (reviews/batch-8-review.md, finding 5); the stage-blind paths name the
    // harness's sources (CLIMB-BATCH-9.md, section 8, item 2); the skeptic's check 8 is the review's check 3 (item 4)
    if (c.prompt.indexOf('[ "$max" -gt 270 ] && max=270') < 0) probs.push(c.label + ' lacks wait_for\'s cap at 270')
    if (c.prompt.indexOf('explorations/, Specification/, Documentation/, ProjectFortress/tests/') >= 0 && c.prompt.indexOf('ProjectFortress/*_tests/, ProjectFortress/src/com/sun/fortress/tests/, ') < 0) probs.push(c.label + ' renders the stage-blind paths without the harness\'s sources')
    if (/^skeptic:/.test(c.label) && c.prompt.indexOf('8. Not yours: the record.md fragment') < 0) probs.push(c.label + ' still checks the record.md fragment')
    if (c.label === 'review' && c.prompt.indexOf('its check 8 moved here') < 0) probs.push('the review\'s check 3 does not take the skeptic\'s check 8')
    // 2026-10-03, climb batch 9's review (reviews/batch-9-review.md), findings 1 to 4, 6 and 7
    const pre = c.prompt.slice(0, c.prompt.indexOf('\n# Your role') >= 0 ? c.prompt.indexOf('\n# Your role') : c.prompt.length)
    if (pre.indexOf('Nor run a stage\'s driver on part of the library') < 0) probs.push(c.label + ' lacks the prefix\'s rule against a partial stage run before the full one (finding 4)')
    if (pre.indexOf('And each sentence of the specification your change makes false, an Appendix I Effect') < 0) probs.push(c.label + ' lacks REPORT.md\'s list of the sentences a change makes false (finding 3)')
    if (pre.indexOf('xargs grep -lE \'"description":"(rung|resume|repair):X(:attempt[0-9]+)?"\'') < 0 || pre.indexOf('| .label + "  " + .key[3:15] + "  " + .agentId\' "$D"/journal.jsonl') < 0 || pre.indexOf('    jq -r \'select(.type == "assistant") | .timestamp as $t') < 0) probs.push(c.label + ' lacks the lines that find and list a resumed worker\'s predecessor\'s transcript (finding 7)')
    if (/^skeptic:/.test(c.label) && (c.prompt.indexOf('Refuse only for the change or its test, where the repair touches code') < 0 || c.prompt.indexOf('is a stopsMet entry, not a refusal') < 0 || c.prompt.indexOf('but for a departure the batch record reserves as a reversible stop, which goes in stopsMet') < 0)) probs.push(c.label + ' keeps the old refusal grounds (finding 1)')
    if (/^repair:(review|gate)/.test(c.label) && (c.prompt.indexOf('First, before the ruling below, for the rungs its instructions name and no other, run these commands') < 0 || c.prompt.indexOf('none where the instructions name no rung') < 0)) probs.push(c.label + ' reads every rung\'s slice, not only those its instructions name (finding 2)')
    if (c.label === 'gather' && c.prompt.indexOf('Correct, too, each sentence of the specification that the rung\'s REPORT.md lists as made false by its change, and each Appendix I Effect') < 0) probs.push('the gather does not correct the sentences a rung makes false (finding 3)')
    if (/^commit/.test(c.label) && !/write the landed figures into explorations\/coordinator\/FACTS\.md, numbers only, from explorations\/compile-ladder\/climb-batch-7b\/gate\/distance\.txt[^\n]*"The true distance to the switch-over"[^\n]*"The checker-count stage's table"/.test(c.prompt)) probs.push(c.label + ' does not write FACTS\' landed count and distance (finding 6)')
    // since 2026-10-02 the command seeds the worktree from the base build (build-cache-exploration.md)
    if (c.prompt.indexOf(SEED_CMD) < 0 || c.prompt.indexOf('copied in') >= 0) probs.push(c.label + ' lacks the prefix\'s worktree command, or still says the build was copied in')
    // the strip of line numbers from the tests (dc0eee2fe): tests cite a section, and no brief asks for a re-anchoring of tests
    // (a batch's tail, from its record, is the planner's: batch 7b's rung S's asks for a re-anchoring, and is left)
    if (c.prompt.indexOf('never by a line, as every test of the corpora has cited it since the one-time strip') < 0 || /messages and comments of tests re-anchored|test files whose change is a message or a comment/.test(c.prompt)) probs.push(c.label + ' lacks the citation rule, or its role asks for tests re-anchored')
    if (c.label.startsWith('skeptic') && c.prompt.indexOf('never a line, and that the named section') < 0) probs.push(c.label + ' lacks check 6\'s citation check')
    // climb batch 7b's review, finding 4: the skeptic is given the report's text, for a branch without REPORT.md
    if (/^skeptic:/.test(c.label) && !/REPORT\.md as the worker returned it[^\n]*\n\nREPORTTEXT-SENTINEL\n/.test(c.prompt)) probs.push(c.label + ' does not carry the worker\'s report text under its line')
    // 2026-10-02: a skeptic builds nothing and checks nothing out (POSITIONS.md, "Test first, the test kept." and
    // "Nothing is built or run twice on the same code."); the record's paragraph for the skeptic is the planner's words
    if (c.label.startsWith('skeptic')) {
      const role = c.prompt.slice(c.prompt.indexOf('# Your role: skeptic'))
      const own = role.split('\n').filter(l => !l.startsWith('**For the skeptic.**')).join('\n')
      const asks = /(^|[^A-Za-z])ant |rebuil|git (checkout|switch|stash|reset)|worktree add/.exec(own)
      if (asks) probs.push(c.label + ' role text asks for a build or a checkout: ' + JSON.stringify(own.slice(Math.max(0, asks.index - 60), asks.index + 60)))
      const id = c.label.split(':')[1]
      const copy = BASE_BUILD + '/explorations/coordinator/tools/seed-worktree.sh ' + BASE_BUILD + ' /home/user/'
      if (own.indexOf('## You build nothing') < 0 || own.indexOf(copy) < 0 || !/-base - BASE\n/.test(own)) probs.push(c.label + ' lacks "You build nothing" or the command for the rung\'s copy of the base')
      if (own.indexOf('"description":"' + c.label.split(':')[0] + ':' + id + '(:attempt') < 0) probs.push(c.label + ' lacks the command that finds the transcripts')
      if (/^skeptic:/.test(c.label) && role.indexOf('\n**For the skeptic.**') < 0) probs.push(c.label + ' does not carry its rung\'s paragraph for the skeptic')
      if (/^skeptic:/.test(c.label) && own.indexOf('In skepticText put the single word committed') < 0) probs.push(c.label + ' still asks for SKEPTIC.md\'s text in skepticText')
    }
    // the second skeptic's own short brief: its refusal, the ruling, the repair's diff since the refused head, one question
    if (c.label.startsWith('skeptic2')) {
      const role = c.prompt.slice(c.prompt.indexOf('# Your role: skeptic'))
      const first = calls.find(x => x.label === 'skeptic:' + c.label.split(':')[1])
      const firstRole = first ? first.prompt.slice(first.prompt.indexOf('# Your role: skeptic')) : ''
      if (!/, second judgement\n/.test(role.split('\n')[0] + '\n')) probs.push(c.label + ' is not headed as the second judgement')
      if (role.indexOf('stub refusal') < 0) probs.push(c.label + ' lacks its first refusal')
      if (role.indexOf('## The judge\'s ruling') < 0 || role.indexOf('stub instruction') < 0 && role.indexOf('"instructions"') < 0) probs.push(c.label + ' lacks the judge\'s ruling')
      if (role.indexOf('git diff abc1234..HEAD') < 0) probs.push(c.label + ' lacks the repair\'s diff since the refused head')
      if (role.indexOf('without breaking what your first judgement approved') < 0) probs.push(c.label + ' lacks the one question')
      if (/## What you must check|The provenance block under|## Your required differential|\*\*For the skeptic\.\*\*|1\. Before anything else/.test(role)) probs.push(c.label + ' carries the first judgement\'s list')
      if (firstRole && role.length >= firstRole.length) probs.push(c.label + ' brief is ' + role.length + ' characters, not shorter than the first\'s ' + firstRole.length)
    }
  }
  return probs
}

;(async () => {
  for (const sc of SCEN) {
    const out = await run(sc)
    const probs = check(sc, out)
    const { result, calls, threw } = out
    const ids = (result && result.forPavol || []).map(i => i.id)
    const what = threw ? 'stopped: ' + threw.message.slice(0, 160) : 'landed ' + (result && result.landed) + (result && result.reason ? ' (' + result.reason + ')' : '') + (result && result.pushHeld ? '; push held by ' + result.heldBy.length : '') + (ids.length ? '; items ' + ids.join(', ') : '')
    say(!probs.length, sc.name + ': ' + (sc.agents !== undefined ? calls.map(c => c.label).join(', ') : (calls.map(c => c.label).filter(l => !/^(rung|skeptic|resume|repair:[SCWL]|judge:[SCWL])/.test(l)).join(', ') || '(none)')) + '; ' + what + (probs.length ? '\n     ' + probs.join('\n     ') : ''))
  }
  // A18: the run is stopped in the commit stage and resumed from its journal.
  {
    const sc = { name: 'A18 a process stop mid-commit, resumed with resumeFromRunId', over: {}, killAt: 'commit' }
    const journal = new Map()
    const r1 = await run(sc, journal, null)
    const r2 = await run(sc, null, journal)
    const live = r2.calls.filter(c => !c.fromJournal).map(c => c.label)
    const commit = r2.calls.find(c => c.label === 'commit' && !c.fromJournal)
    const probs = []
    if (!r1.threw || !/commit stage/.test(r1.threw.message)) probs.push('run 1 did not stop in the commit stage: ' + (r1.threw && r1.threw.message))
    if (live.join(', ') !== 'commit') probs.push('live calls on resume: ' + live.join(', '))
    if (commit && /Attempt \d of/.test(commit.prompt)) probs.push('the resumed commit carries a retry head')
    const step4 = commit ? (commit.prompt.split('\n5. ')[0].split('4. Start')[1] || '') : ''
    if (!(/(exists|already)/.test(step4) && /\[ -e [^\]]*microgpt-walk\.txt \] \|\| run_bg/.test(step4))) probs.push('step 4 does not guard against a second microGPT start')
    say(!probs.length, sc.name + ': ' + r2.calls.length + ' calls, ' + (r2.calls.length - live.length) + ' from the journal, live: ' + live.join(', ') + '; landed ' + (r2.result && r2.result.landed) + (probs.length ? '\n     ' + probs.join('\n     ') : ''))
  }
  // L4: L1's run resumed with resumeFromRunId, the same script and args, once the limit has reset: the three
  // agents that finished come back from the journal, C's skeptic runs again, and the four rungs land.
  {
    const sc = { name: 'L4 L1 resumed once the limit has reset', over: {}, limitAt: 'skeptic:C', limitAs: 'null' }
    const journal = new Map()
    const r1 = await run(sc, journal, null)
    sc.limited = false
    const r2 = await run(sc, null, journal)
    const cached = r2.calls.filter(c => c.fromJournal).map(c => c.label)
    const live = r2.calls.filter(c => !c.fromJournal).map(c => c.label)
    const probs = []
    if (!r1.threw || !HALT_TEXT.test(r1.threw.message)) probs.push('run 1 did not stop: ' + (r1.threw ? r1.threw.message : 'landed ' + (r1.result && r1.result.landed)))
    if (cached.join(', ') !== 'rung:W, skeptic:W, rung:C') probs.push('from the journal: ' + cached.join(', ') + ' (expected rung:W, skeptic:W, rung:C)')
    if (live[0] !== 'skeptic:C') probs.push('the first live call is ' + live[0] + ', not skeptic:C')
    if (r2.threw) probs.push('the resume threw: ' + r2.threw.message.slice(0, 200))
    const states = r2.result ? r2.result.rungs.map(x => x.rung + ' ' + x.state).join(', ') : '(no result)'
    if (!r2.result || !r2.result.landed || r2.result.rungs.some(x => x.state !== 'approved')) probs.push('rungs ' + states + ', landed ' + (r2.result && r2.result.landed))
    say(!probs.length, sc.name + ': from the journal ' + cached.join(', ') + '; live ' + live.join(', ') + '; rungs ' + states + '; landed ' + (r2.result && r2.result.landed) + (probs.length ? '\n     ' + probs.join('\n     ') : ''))
  }
  console.log('problems: ' + bad)
  process.exit(bad ? 1 : 0)
})().catch(e => { console.log('ERROR ' + (e && e.stack || e)); process.exit(2) })
