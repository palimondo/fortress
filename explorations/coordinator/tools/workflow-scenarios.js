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
// limit (reviews/batch-7b-review.md, finding 1): L1 to L3, the resume L4, and A6's judge that returns nothing;
// and in every scenario, each skeptic's brief carrying the worker's report text and not its record text (finding 4).
const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const crypto = require('crypto')

const ROOT = process.env.FORTRESS_HOME || path.resolve(__dirname, '../../..')
const SCRIPT_PATH = 'explorations/coordinator/climb-batch-workflow.js'
const BLOCK_REV = '811053f15'   // the script as climb batch 7b launched: rungs S, C, W and L, LEDGER_FROM 534, CHECKER_BASE 75, Q4 1
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
const refuse = () => ({ approved: false, refusalReason: 'stub refusal', stopsMet: [], forPavol: [], findings: ['f'], requiredCorrections: [], recommendedRows: [] })
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
  { name: 'A19 rung W\'s worker returns nothing on all three attempts', over: { 'rung:W': nul },
    after: 'gather, gate, review, commit', landed: true, notLanded: { W: 'worker-died' } },
  { name: 'A20 the gate cannot run (stopped)', over: { gate: () => ({ green: false, failing: [], stopped: true, countsDown: [] }) },
    after: 'gather, gate, review', landed: false },
  { name: 'A17 a held push: the microGPT start and the kept worktrees', over: { 'skeptic:W': () => ({ approved: true, stopsMet: [{ stop: 'stub', evidence: 'x:1', liftedBy: '' }], forPavol: [] }) },
    after: 'gather, gate, review, commit', landed: false, held: true },
  // Climb batch 7b's review, finding 1: a usage or rate limit stops the run and decides nothing.
  { name: 'L1 the weekly limit as batch 7b met it: W done, every agent from C\'s skeptic on returns nothing', over: {}, limitAt: 'skeptic:C', limitAs: 'null',
    agents: 'rung:W, skeptic:W, rung:C, skeptic:C, skeptic:C:attempt2, skeptic:C:attempt3', halts: 'skeptic:C' },
  { name: 'L2 a usage limit that agent() throws, at C\'s skeptic: no second attempt', over: {}, limitAt: 'skeptic:C', limitAs: 'throw',
    agents: 'rung:W, skeptic:W, rung:C, skeptic:C', halts: 'skeptic:C' },
  // The review starts beside the gate before the gate's error is back, and stops on the limit too.
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
    const pr = new AsyncFunction('args', 'agent', 'pipeline', 'parallel', 'log', body)({ base: 'BASE' }, agent, pipeline, null, (s) => logs.push(String(s)))
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
  if (sc.halts) {
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
    // climb batch 7b's review, finding 4: the skeptic is given the report's text, for a branch without REPORT.md
    if (c.label.startsWith('skeptic') && !/REPORT\.md as the worker returned it[^\n]*\n\nREPORTTEXT-SENTINEL\n/.test(c.prompt)) probs.push(c.label + ' does not carry the worker\'s report text under its line')
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
