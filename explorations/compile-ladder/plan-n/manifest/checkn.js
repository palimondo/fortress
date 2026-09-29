// Splices climb batch N's MANIFEST block (genn.py's tmp/manifestn.js) into scratch copies of the
// workflow script and checks it: node --check; the launch values (RUN, LEDGER_FROM, CHECKER_BASE)
// refused when unset or wrong; the block evaluated with the script's own key validation and scatter
// order under each RUN; each tail equal to its rung's section of the record's section 3 followed by its
// briefing's reasons, one line per key in order; the lists against listsn.py; no backtick or non-ASCII
// character in any string the agents read; and the whole spliced script run as the body of an async
// function with the workflow globals stubbed (args, agent, pipeline, log): the first run with every
// agent approving, the first run with rung I stopping (T must be withheld), the second run, and six
// first runs through the merged-tree repairs (MERGED below: a repair of tests and records only does not
// rerun the gate and the commit records its runs beside the summary; one that changes source, or leaves a
// changed test unrun, reruns it; Pavol, 2026-09-29, POSITIONS.md), each against its expected agents. The
// launch values are unset in the block (the coordinator sets them at launch), so the evaluations and
// the stubbed runs set LEDGER_FROM to 500 and CHECKER_BASE to 75, placeholders. Nothing is launched.
// The form is batch 7R's check7r.js with batch 6.5's checks of the reasons and the launch values
// (explorations/compile-ladder/plan-6.5/manifest/check65.js). Its last line counts the problems.
// Usage: node checkn.js [script ...]; with no argument it checks the script as committed at HEAD and
// the working copy.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || '/home/user/fortress'
const TMP = path.join(ROOT, 'tmp')   // ignored
const REC = path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-N.md')
const block = fs.readFileSync(path.join(TMP, 'manifestn.js'), 'utf8')
const py = JSON.parse(cp.execFileSync('python3', ['-c',
  'import sys, json; sys.path.insert(0, sys.argv[1]); from listsn import LISTS, REASONS; print(json.dumps({"lists": LISTS, "reasons": REASONS}))',
  path.join(ROOT, 'explorations/compile-ladder/plan-n/manifest')], { encoding: 'utf8', cwd: ROOT }))
const lists = py.lists, reasons = py.reasons
const LEDGER = 500, BASE_TOTAL = 75   // placeholders for the two launch values
const REASONS_HEAD = "**Your briefing, entry by entry.**"

function sources() {
  const out = []
  const head = cp.execFileSync('git', ['-C', ROOT, 'show', 'HEAD:explorations/coordinator/climb-batch-workflow.js'], { encoding: 'utf8', maxBuffer: 1 << 26 })
  const rev = cp.execFileSync('git', ['-C', ROOT, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
  out.push(['script at ' + rev, head])
  const wc = fs.readFileSync(path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js'), 'utf8')
  out.push([wc === head ? 'working copy (identical to HEAD)' : 'working copy (differs from HEAD)', wc])
  return out
}

function splice(orig) {
  const lines = orig.split('\n')
  const mIdx = lines.findIndex(l => l.startsWith('// MANIFEST - the coordinator replaces'))
  const start = mIdx - 1
  if (!/^\/\/ =+$/.test(lines[start])) throw new Error('no rule above MANIFEST')
  const end = lines.findIndex(l => l.startsWith('// =========================== END MANIFEST'))
  const pre = lines.slice(0, start).join('\n'), post = lines.slice(end).join('\n')
  const spliced = pre + '\n' + block + post
  if (!spliced.startsWith(pre + '\n') || !spliced.endsWith(post)) throw new Error('outside the block differs')
  return { spliced, start: start + 1, end, total: lines.length }
}
const withRun = (text, run) => text.replace(/^const RUN = '[a-z]+'/m, "const RUN = '" + run + "'")
const withValues = (text, ledger, base) => {
  let t = text
  if (ledger !== null) t = t.replace(/^const LEDGER_FROM = null/m, 'const LEDGER_FROM = ' + ledger)
  if (base !== null) t = t.replace(/^const CHECKER_BASE = null/m, 'const CHECKER_BASE = ' + base)
  return t
}

const rec = fs.readFileSync(REC, 'utf8')
const s3 = rec.slice(rec.indexOf('\n## 3. The rungs\n'), rec.indexOf('\n## 4. '))
function section(id) {
  const m = new RegExp('^### ' + id + '\\. .*$', 'm').exec(s3); if (!m) throw new Error('no section ' + id)
  const rest = s3.slice(m.index + m[0].length)
  const nx = rest.search(/^### [A-Z]\. /m)
  return (nx < 0 ? rest : rest.slice(0, nx)).replace(/^\n+|\n+$/g, '').replace(/`/g, '')
}

function renderedKeys(prompt) {
  const ls = prompt.split('\n')
  const i = ls.findIndex(l => /^ {8}explorations\/coordinator\/tools\/facts-extract\.sh \\$/.test(l))
  if (i < 0) return null
  const keys = []
  for (let j = i + 1; j < ls.length && /^ {12}"/.test(ls[j]); j++) keys.push(ls[j].trim().replace(/ \\$/, '').replace(/^"|"$/g, ''))
  return keys
}

async function stubbedRun(spliced, scenario) {
  const body = withValues(withRun(spliced, scenario.run), LEDGER, BASE_TOTAL).replace(/^export const meta/m, 'const meta')
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
  const calls = [], logs = []
  const agent = async (prompt, opts) => {
    const L = opts.label
    calls.push({ label: L, prompt })
    if (scenario.over && scenario.over[L]) return scenario.over[L](calls.filter(c => c.label === L).length)
    if (L.startsWith('rung:') || L.startsWith('resume:') || L.startsWith('repair:')) {
      const id = L.split(':')[1]
      if (L.startsWith('rung:') && scenario.stop === id) return { stopped: true, stopReason: 'stub stop', landed: false, summary: 'stub', stopsMet: [], forPavol: [] }
      return { landed: true, stopped: false, summary: 'stub', stopsMet: [], forPavol: [] }
    }
    if (L.startsWith('judge:')) return { decision: 'stop', forPavol: [] }
    if (L.startsWith('skeptic')) return { approved: true, stopsMet: [], forPavol: [] }
    if (L === 'gather') return { unresolved: false, summary: 'stub', pavolItems: [], pavolUnrouted: [] }
    if (L.startsWith('gate')) return { green: true, failing: [], stopped: false }
    if (L.startsWith('review')) return { approved: true, blocking: [], pathsOutsideExplorations: [], stopsMet: [], forPavol: [], pavolItems: [] }
    if (L === 'commit') return { pushed: ['main'] }
    return {}
  }
  const pipeline = async (items, s1, s2) => {
    const out = []
    for (const it of items) { const w = await s1(it); out.push(await s2(w, it)) }
    return out
  }
  const log = (s) => logs.push(String(s))
  const result = await new AsyncFunction('args', 'agent', 'pipeline', 'log', body)({ base: 'BASE' }, agent, pipeline, log)
  return { result, calls, logs }
}

// The merged-tree repairs, stubbed: the review blocks once and its judge orders a repair, or the gate is
// red once and its judge orders one; the repair returns the paths it changed and its tests' runs.
const RUN_OK = { file: 'ProjectFortress/compiler_tests/XXXStub.test', paths: ['ProjectFortress/compiler_tests/XXXStub.test', 'ProjectFortress/compiler_tests/XXXStub.fss'], suite: 'fast-compiler/CompilerJUTest', cases: 1, verdict: 'pass', capture: 'explorations/compile-ladder/climb-batch-N/repair-review-tests/stub.txt' }
const TESTS_ONLY = ['ProjectFortress/compiler_tests/XXXStub.test', 'ProjectFortress/compiler_tests/XXXStub.fss', 'explorations/compile-ladder/climb-batch-N/REPAIR-review.md']
const repairStub = (paths, runs, answered) => () => ({ landed: true, stopped: false, summary: 'stub', stopsMet: [], forPavol: [], pavolItems: [], headBefore: 'a', headAfter: 'b', pathsChanged: paths, testRuns: runs, failingAnswered: answered || [] })
const blockingOnce = { review: () => ({ approved: false, blocking: ['stub finding'], pathsOutsideExplorations: [], stopsMet: [], forPavol: [], pavolItems: [] }), 'judge:review': () => ({ decision: 'repair', forPavol: [] }) }
const redOnce = { gate: () => ({ green: false, failing: ['XXXStub.test: stub'], countsDown: [], stopped: false }), 'judge:gate': () => ({ decision: 'repair', forPavol: [] }) }
const MERGED = [
  { name: 'first run, the review blocks, its repair changes tests and records only', run: 'first', over: Object.assign({}, blockingOnce, { 'repair:review': repairStub(TESTS_ONLY, [RUN_OK]) }),
    after: 'gate, review, judge:review, repair:review, review2, commit', step1a: true, landed: true },
  { name: 'first run, the review blocks, its repair changes a checker source', run: 'first', over: Object.assign({}, blockingOnce, { 'repair:review': repairStub(TESTS_ONLY.concat(['ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Stub.scala']), [RUN_OK]) }),
    after: 'gate, review, judge:review, repair:review, review2, gate:after-review, commit', step1a: false, landed: true },
  { name: 'first run, the review blocks, its repair adds a test it did not run', run: 'first', over: Object.assign({}, blockingOnce, { 'repair:review': repairStub(TESTS_ONLY, []) }),
    after: 'gate, review, judge:review, repair:review, review2, gate:after-review, commit', step1a: false, landed: true },
  { name: 'first run, the review still blocks after a repair of tests only', run: 'first', over: Object.assign({}, blockingOnce, { review2: () => ({ approved: false, blocking: ['stub finding'], pathsOutsideExplorations: [], stopsMet: [], forPavol: [], pavolItems: [] }), 'repair:review': repairStub(TESTS_ONLY, [RUN_OK]) }),
    after: 'gate, review, judge:review, repair:review, review2, commit', step1a: true, landed: true },
  { name: 'first run, the gate is red, its repair changes a test only and answers the line', run: 'first', over: Object.assign({}, redOnce, { 'repair:gate': repairStub(TESTS_ONLY, [RUN_OK], [{ failing: 'XXXStub.test: stub', file: RUN_OK.file }]) }),
    after: 'gate, review, judge:gate, repair:gate, commit', step1a: true, landed: true },
  { name: 'first run, the gate is red, its repair changes a library source', run: 'first', over: Object.assign({}, redOnce, { 'repair:gate': repairStub(['Library/FortressLibrary.fss'], [], [{ failing: 'XXXStub.test: stub', file: '' }]) }),
    after: 'gate, review, judge:gate, repair:gate, gate2, commit', step1a: false, landed: true },
]

async function main() {
  const targets = process.argv.slice(2).length
    ? process.argv.slice(2).map(p => [p, fs.readFileSync(p, 'utf8')]) : sources()
  let bad = 0
  for (const [name, orig] of targets) {
    console.log('== ' + name)
    const { spliced, start, end, total } = splice(orig)
    console.log('MANIFEST block of the original: lines ' + start + ' to ' + end + ' of ' + total + '; every line outside it byte-identical in the splice')
    const f0 = path.join(TMP, 'wfn-orig.js'), f1 = path.join(TMP, 'wfn-spliced.js'), f2 = path.join(TMP, 'wfn-spliced-second.js')
    fs.writeFileSync(f0, orig); fs.writeFileSync(f1, spliced); fs.writeFileSync(f2, withRun(spliced, 'second'))
    for (const f of [f0, f1, f2]) {
      const r = cp.spawnSync('node', ['--check', f], { encoding: 'utf8' })
      console.log('node --check ' + path.basename(f) + ': exit ' + r.status + (r.stderr.trim() ? ' ' + r.stderr.trim().slice(0, 300) : ''))
      if (r.status) bad++
    }
    const sl = spliced.split('\n')
    const s2 = sl.findIndex(l => l.startsWith('// MANIFEST - the coordinator replaces')) - 1
    const e2 = sl.findIndex(l => l.startsWith('// =========================== END MANIFEST'))
    const manifest = sl.slice(s2, e2).join('\n')
    const vs = sl.findIndex(l => l.startsWith('const LOOKUP_TOOL = ')), ve = sl.findIndex(l => l.startsWith('const keysOf = '))
    const validation = sl.slice(vs, ve + 1).join('\n')
    const scatterLine = sl.find(l => l.startsWith('const SCATTER = '))
    const evalWith = (ledger, base, run) => new Function(withValues(withRun(manifest, run), ledger, base)
      + '\n' + validation + '\n' + scatterLine + '\nreturn { BATCH, BATCH_RECORD, RUNGS, SCATTER, BATCH_INTRO, BATCH_OVERLAPS, LEDGER_FROM, CHECKER_BASE, RUN }')()
    try { evalWith(null, null, 'first'); console.log('as generated, both launch values unset: did NOT throw (bad)'); bad++ } catch (e) { console.log('as generated, both launch values unset: throws: ' + e.message) }
    try { evalWith(null, BASE_TOTAL, 'first'); console.log('LEDGER_FROM unset: did NOT throw (bad)'); bad++ } catch (e) { console.log('LEDGER_FROM unset: throws: ' + e.message) }
    try { evalWith(LEDGER, null, 'first'); console.log('CHECKER_BASE unset: did NOT throw (bad)'); bad++ } catch (e) { console.log('CHECKER_BASE unset: throws: ' + e.message) }
    try { evalWith(LEDGER, BASE_TOTAL, 'all'); console.log('RUN all: did NOT throw (bad)'); bad++ } catch (e) { console.log('RUN all: throws: ' + e.message) }
    for (const run of ['first', 'second']) {
      const r = evalWith(LEDGER, BASE_TOTAL, run)
      console.log('block, RUN ' + run + ' (LEDGER_FROM ' + LEDGER + ', CHECKER_BASE ' + BASE_TOTAL + ' set for the check): batch ' + r.BATCH + ', record ' + r.BATCH_RECORD + ', rungs ' + r.RUNGS.map(x => x.id + (x.landsOnlyWith ? ' (lands only with ' + x.landsOnlyWith.join(', ') + ')' : '') + (x.expectedCheckerCount !== undefined ? ' (predicts ' + x.expectedCheckerCount + ')' : '')).join(', ')
        + ', scatter ' + r.SCATTER.map(x => x.id).join(', ') + ', intro ' + r.BATCH_INTRO.length + ' chars, overlaps ' + r.BATCH_OVERLAPS.length + ' chars')
      for (const x of r.RUNGS) {
        const tl = x.tail.split('\n')
        const rh = tl.findIndex(l => l.startsWith(REASONS_HEAD))
        if (rh < 0) { bad++; console.log('  tail ' + x.id + ' has no reasons block'); continue }
        if (tl.slice(7, rh - 1).join('\n') !== section(x.id) || tl[rh - 1] !== '') { bad++; console.log('  tail ' + x.id + ' differs from its section') }
        const rs = tl.slice(rh + 1, tl.length - 1)
        const keys = x.briefing || []
        const want = reasons[x.id].map(([k, why]) => '- ' + k + ': ' + why)
        if (rs.length !== keys.length || JSON.stringify(rs) !== JSON.stringify(want) || !keys.every((k, i) => rs[i].startsWith('- ' + k + ': '))) { bad++; console.log('  tail ' + x.id + ': the reasons are not one line per briefing key, in order') }
        if (tl[tl.length - 1] !== '') { bad++; console.log('  tail ' + x.id + ' does not end with an empty line') }
        for (const [n, t] of [['tail ' + x.id, x.tail], ['blurb ' + x.id, x.blurb]]) if (/[^\x00-\x7f]/.test(t) || /`/.test(t)) { bad++; console.log('  ' + n + ' holds a backtick or non-ASCII') }
        if (JSON.stringify(x.briefing) !== JSON.stringify(lists[x.id][0]) || JSON.stringify(x.checks) !== JSON.stringify(lists[x.id][1])) { bad++; console.log('  lists of ' + x.id + ' differ from listsn.py') }
        if (!(x.checks || []).every(k => x.briefing.includes(k))) { bad++; console.log('  checks not a sub-list: ' + x.id) }
        console.log('  ' + x.id + ': ' + x.slug + ', ' + x.path + ', ' + x.branch + ', expectedMinutes ' + x.expectedMinutes + ', testIsStage ' + x.testIsStage + ', writesState ' + x.writesState + ', briefing ' + x.briefing.length + ' keys with ' + rs.length + ' reasons, checks ' + x.checks.length + ', tail ' + tl.length + ' lines')
      }
      for (const [n, t] of [['intro', r.BATCH_INTRO], ['overlaps', r.BATCH_OVERLAPS]]) if (/[^\x00-\x7f]/.test(t) || /`/.test(t)) { bad++; console.log('  ' + n + ' holds a backtick or non-ASCII') }
    }
    for (const scenario of [{ name: 'first run, every agent approves', run: 'first' }, { name: 'first run, I stops, its judge rules stop', run: 'first', stop: 'I' }, { name: 'second run, every agent approves', run: 'second' }].concat(MERGED)) {
      const { result, calls, logs } = await stubbedRun(spliced, scenario)
      console.log('stubbed run, ' + scenario.name + ':')
      console.log('  ' + logs[0])
      console.log('  agents in order: ' + calls.map(c => c.label).join(', '))
      console.log('  rungs: ' + result.rungs.map(x => x.rung + ' ' + x.state + (x.withheldReason ? ' (' + x.withheldReason + ')' : '')).join('; ') + '; landed ' + result.landed + (result.reason ? ', reason: ' + result.reason : ''))
      if (scenario.after) {
        // The merged-tree stages (Pavol, 2026-09-29, a repair of tests and records only does not rerun the gate)
        const g = calls.findIndex(c => c.label === 'gather')
        const got = calls.slice(g + 1).map(c => c.label).join(', ')
        const k = calls.find(c => c.label === 'commit')
        const step1a = !!(k && /\n1a\. /.test(k.prompt) && /# repair-tests/.test(k.prompt))
        const ok = got === scenario.after && step1a === scenario.step1a && result.landed === scenario.landed
        if (!ok) bad++
        for (const l of logs.filter(l => /gate runs again|does not run again|still blocks/.test(l))) console.log('  log: ' + l)
        console.log('  after the gather: ' + got + '; commit step 1a ' + (step1a ? 'present' : 'absent') + (ok ? ', as expected' : ', NOT as expected (' + scenario.after + '; step 1a ' + scenario.step1a + '; landed ' + scenario.landed + ')'))
      }
      for (const c of calls) {
        const m = /^(rung|skeptic):([IKTMQ])$/.exec(c.label); if (!m) continue
        const keys = renderedKeys(c.prompt)
        const want = lists[m[2]][m[1] === 'rung' ? 0 : 1]
        const ok = keys && JSON.stringify(keys) === JSON.stringify(want)
        if (!ok) bad++
        console.log('  ' + c.label + ' step 1 renders ' + (keys ? keys.length : 0) + ' keys, ' + (ok ? 'its ' + (m[1] === 'rung' ? 'briefing' : 'checks') + ' in order' : 'NOT its list'))
      }
      const g = calls.find(c => c.label === 'gather')
      if (g) console.log('  gather: ledger numbering ' + (new RegExp('provisional \\(from ' + LEDGER + '\\)').test(g.prompt) ? 'from the LEDGER_FROM set' : '?') + ', manifest order ' + ((/MANIFEST order \(([^)]*)\)/.exec(g.prompt) || [])[1] || '?'))
      const k = calls.find(c => c.label === 'commit')
      if (k) console.log('  commit: the gate tables land under ' + (['N', 'Nb'].filter(b => k.prompt.includes('explorations/compile-ladder/climb-batch-' + b + '/gate')).map(b => 'explorations/compile-ladder/climb-batch-' + b + '/gate/').join(', ') || '?'))
    }
  }
  console.log('problems: ' + bad)
  process.exit(bad ? 1 : 0)
}
main().catch(e => { console.log('ERROR ' + (e && e.stack || e)); process.exit(2) })
