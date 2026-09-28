// Splices climb batch 7C's MANIFEST block (gen7c.py's output, $MANIFEST_OUT or tmp/manifest7c.js)
// into scratch copies of the workflow script and checks it: node --check; the block evaluated with the
// script's own key validation and scatter order, with LEDGER_FROM and COUNT_BASE each unset and with
// two values of COUNT_BASE; the tails against the record's section 3; and the whole spliced script run
// as the body of an async function with the workflow globals stubbed (args, agent, pipeline, log),
// every agent approving, and again with rung Y stopping. Nothing is launched. The form is batch 7R's
// check7r.js. Scratch copies go to $CHECK_TMP, by default tmp/ (ignored).
// Usage: node check7c.js [script ...]; with no argument it checks the script as committed at HEAD
// and the working copy.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || '/home/user/fortress'
const TMP = process.env.CHECK_TMP || path.join(ROOT, 'tmp')
const BLOCK = process.env.MANIFEST_OUT || path.join(ROOT, 'tmp', 'manifest7c.js')
const REC = path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-7C.md')
const block = fs.readFileSync(BLOCK, 'utf8')
const lists = JSON.parse(cp.execFileSync('python3', ['-c',
  'import sys, json; sys.path.insert(0, sys.argv[1]); from lists7c import LISTS; print(json.dumps(LISTS))',
  path.join(ROOT, 'explorations/compile-ladder/plan-7c/manifest')], { encoding: 'utf8' }))

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

const rec = fs.readFileSync(REC, 'utf8')
const s3 = rec.slice(rec.indexOf('\n## 3. The rungs\n'), rec.indexOf('\n## 4. '))
function section(id) {
  const m = new RegExp('^### ' + id + '\\. .*$', 'm').exec(s3); if (!m) throw new Error('no section ' + id)
  const rest = s3.slice(m.index + m[0].length)
  const nx = rest.search(/^### [A-Z]\. /m)
  return (nx < 0 ? rest : rest.slice(0, nx)).replace(/^\n+|\n+$/g, '').replace(/`/g, '')
}

// the keys a role's step 1 renders, read back from its prompt
function renderedKeys(prompt) {
  const ls = prompt.split('\n')
  const i = ls.findIndex(l => /^ {8}explorations\/coordinator\/tools\/facts-extract\.sh \\$/.test(l))
  if (i < 0) return null
  const keys = []
  for (let j = i + 1; j < ls.length && /^ {12}"/.test(ls[j]); j++) keys.push(ls[j].trim().replace(/ \\$/, '').replace(/^"|"$/g, ''))
  return keys
}

async function stubbedRun(spliced, scenario) {
  const body = spliced.replace(/^export const meta/m, 'const meta')
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
  const calls = [], logs = []
  const agent = async (prompt, opts) => {
    const L = opts.label
    calls.push({ label: L, prompt })
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

async function main() {
  const targets = process.argv.slice(2).length
    ? process.argv.slice(2).map(p => [p, fs.readFileSync(p, 'utf8')]) : sources()
  let bad = 0
  fs.mkdirSync(TMP, { recursive: true })
  for (const [name, orig] of targets) {
    console.log('== ' + name)
    const { spliced, start, end, total } = splice(orig)
    console.log('MANIFEST block of the original: lines ' + start + ' to ' + end + ' of ' + total + '; every line outside it byte-identical in the splice')
    const f0 = path.join(TMP, 'wf7c-orig.js'), f1 = path.join(TMP, 'wf7c-spliced.js')
    fs.writeFileSync(f0, orig); fs.writeFileSync(f1, spliced)
    for (const f of [f0, f1]) {
      const r = cp.spawnSync('node', ['--check', f], { encoding: 'utf8' })
      console.log('node --check ' + path.basename(f) + ': exit ' + r.status + (r.stderr.trim() ? ' ' + r.stderr.trim().slice(0, 300) : ''))
      if (r.status) bad++
    }
    // the block with the script's key validation and scatter line
    const sl = spliced.split('\n')
    const s2 = sl.findIndex(l => l.startsWith('// MANIFEST - the coordinator replaces')) - 1
    const e2 = sl.findIndex(l => l.startsWith('// =========================== END MANIFEST'))
    const manifest = sl.slice(s2, e2).join('\n')
    const vs = sl.findIndex(l => l.startsWith('const LOOKUP_TOOL = ')), ve = sl.findIndex(l => l.startsWith('const keysOf = '))
    const validation = sl.slice(vs, ve + 1).join('\n')
    const scatterLine = sl.find(l => l.startsWith('const SCATTER = '))
    const evalWith = (ledger, countBase) => {
      let m = manifest.replace(/^const LEDGER_FROM = \d+/m, 'const LEDGER_FROM = ' + ledger)
      m = m.replace(/^const COUNT_BASE = \d+/m, 'const COUNT_BASE = ' + countBase)
      return new Function(m + '\n' + validation + '\n' + scatterLine
        + '\nreturn { BATCH, BATCH_RECORD, RUNGS, SCATTER, BATCH_INTRO, BATCH_OVERLAPS, LEDGER_FROM, COUNT_BASE }')()
    }
    for (const [what, lf, cb] of [['LEDGER_FROM unset', 'null', '22'], ['COUNT_BASE unset', '476', 'null']]) {
      try { evalWith(lf, cb); console.log(what + ': did NOT throw (bad)'); bad++ } catch (e) { console.log(what + ': throws: ' + e.message) }
    }
    for (const cb of [22, 10]) {
      const y = evalWith(476, cb).RUNGS.find(x => x.id === 'Y')
      const want = cb + 65
      if (y.expectedCheckerCount !== want) bad++
      console.log('COUNT_BASE ' + cb + ': Y expectedCheckerCount ' + y.expectedCheckerCount + (y.expectedCheckerCount === want ? '' : ' (bad, want ' + want + ')'))
    }
    const r = evalWith(476, 22)
    console.log('block: batch ' + r.BATCH + ', record ' + r.BATCH_RECORD + ', LEDGER_FROM ' + r.LEDGER_FROM + ', COUNT_BASE ' + r.COUNT_BASE + ', rungs ' + r.RUNGS.map(x => x.id + (x.landsOnlyWith ? ' (lands only with ' + x.landsOnlyWith.join(', ') + ')' : '')).join(', ')
      + ', scatter ' + r.SCATTER.map(x => x.id).join(', ') + ', intro ' + r.BATCH_INTRO.length + ' chars, overlaps ' + r.BATCH_OVERLAPS.length + ' chars')
    for (const x of r.RUNGS) {
      const tl = x.tail.split('\n')
      if (tl.slice(7, tl.length - 1).join('\n') !== section(x.id)) { bad++; console.log('  tail ' + x.id + ' differs from its section') }
      for (const [n, t] of [['tail ' + x.id, x.tail], ['blurb ' + x.id, x.blurb]]) if (/[^\x00-\x7f]/.test(t) || /`/.test(t)) { bad++; console.log('  ' + n + ' holds a backtick or non-ASCII') }
      if (JSON.stringify(x.briefing) !== JSON.stringify(lists[x.id][0]) || JSON.stringify(x.checks) !== JSON.stringify(lists[x.id][1])) { bad++; console.log('  lists of ' + x.id + ' differ from lists7c.py') }
      console.log('  ' + x.id + ': ' + x.slug + ', ' + x.path + ', ' + x.branch + ', expectedMinutes ' + x.expectedMinutes + ', testIsStage ' + x.testIsStage + ', writesState ' + x.writesState
        + ', expectedCheckerCount ' + x.expectedCheckerCount + ', briefing ' + x.briefing.length + ' keys, checks ' + x.checks.length + ', tail ' + tl.length + ' lines')
    }
    for (const [n, t] of [['intro', r.BATCH_INTRO], ['overlaps', r.BATCH_OVERLAPS]]) if (/[^\x00-\x7f]/.test(t) || /`/.test(t)) { bad++; console.log('  ' + n + ' holds a backtick or non-ASCII') }
    // the whole script, globals stubbed
    for (const scenario of [{ name: 'every agent approves' }, { name: 'Y stops, its judge rules stop', stop: 'Y' }]) {
      const { result, calls, logs } = await stubbedRun(spliced, scenario)
      console.log('stubbed run, ' + scenario.name + ':')
      console.log('  ' + logs[0])
      console.log('  agents in order: ' + calls.map(c => c.label).join(', '))
      console.log('  rungs: ' + result.rungs.map(x => x.rung + ' ' + x.state + (x.withheldReason ? ' (' + x.withheldReason + ')' : '')).join('; ') + '; landed ' + result.landed + (result.reason ? ', reason: ' + result.reason : ''))
      for (const c of calls) {
        const m = /^(rung|skeptic):([YX])$/.exec(c.label); if (!m) continue
        const keys = renderedKeys(c.prompt)
        const want = lists[m[2]][m[1] === 'rung' ? 0 : 1]
        const ok = keys && JSON.stringify(keys) === JSON.stringify(want)
        if (!ok) bad++
        console.log('  ' + c.label + ' step 1 renders ' + (keys ? keys.length : 0) + ' keys, ' + (ok ? 'its ' + (m[1] === 'rung' ? 'briefing' : 'checks') + ' in order' : 'NOT its list'))
      }
      const g = calls.find(c => c.label === 'gather')
      if (g) console.log('  gather: ledger numbering ' + (/provisional \(from 476\)/.test(g.prompt) ? 'from 476' : '?') + ', manifest order ' + ((/MANIFEST order \(([^)]*)\)/.exec(g.prompt) || [])[1] || '?'))
      const gate = calls.find(c => c.label === 'gate')
      if (gate) console.log('  gate: the declared count ' + (/Y: 87/.test(gate.prompt) ? 'Y: 87 in its prompt' : 'not found in its prompt'))
    }
  }
  console.log('problems: ' + bad)
  process.exit(bad ? 1 : 0)
}
main().catch(e => { console.log('ERROR ' + (e && e.stack || e)); process.exit(2) })
