// Splices climb batch 7b's MANIFEST block into a scratch copy of the workflow script and checks it, in the form of
// explorations/compile-ladder/plan-6.5/manifest/check65.js: node --check on the original and the spliced copy; the
// spliced copy parsed as the body of an async function, as the Workflow harness parses it (FACTS: node --check passed an
// apostrophe the harness refused, 70ac397dd to 2a55fa570); every line outside the block byte-identical; the three launch
// values refused when unset or wrong; the rungs, their order, the scatter and the entries' fields; each tail equal to its
// rung's section of the record followed by its briefing's reasons, one per key in order; no backtick or non-ASCII
// character in any string the agents read; each checks list a sub-list of its briefing. Its last line counts the
// problems. Reads $OUT7B/manifest7b.js (gen7b.py's output) and writes the spliced copy beside it.
//   node check7b.js [RECORD]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-7.md
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || '/home/user/fortress'
const HERE = process.env.OUT7B || path.join(ROOT, 'tmp')
const SRC = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const REC = process.argv[2] || path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-7.md')
const block = fs.readFileSync(path.join(HERE, 'manifest7b.js'), 'utf8')
const orig = fs.readFileSync(SRC, 'utf8')
const lines = orig.split('\n')
const mIdx = lines.findIndex(l => l.startsWith('// MANIFEST - the coordinator replaces'))
const start = mIdx - 1
if (!/^\/\/ =+$/.test(lines[start])) throw new Error('no rule above MANIFEST')
const end = lines.findIndex(l => l.startsWith('// =========================== END MANIFEST'))
console.log('original script: MANIFEST block is lines', start + 1, 'to', end, 'of', lines.length)
const pre = lines.slice(0, start).join('\n'), post = lines.slice(end).join('\n')
const spliced = pre + '\n' + block + post
const out = path.join(HERE, 'wf-spliced-7b.js')
fs.writeFileSync(out, spliced)
let bad = 0
if (!spliced.startsWith(pre + '\n') || !spliced.endsWith(post)) { bad++; console.log('outside the block differs') }
for (const f of [SRC, out]) {
  const r = cp.spawnSync('node', ['--check', f], { encoding: 'utf8' })
  console.log('node --check', path.basename(f), 'exit', r.status, r.stderr.trim().slice(0, 300))
  if (r.status !== 0) bad++
}
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
for (const [name, text] of [['original', orig], ['spliced', spliced]]) {
  // the harness takes the script's one export (export const meta) out before it runs the rest as a function body
  try { new AsyncFunction('args', 'agent', 'pipeline', 'parallel', 'log', text.replace(/^export const meta/m, 'const meta')); console.log('parses as an async function body, its export taken out:', name) }
  catch (e) { bad++; console.log('does NOT parse as an async function body:', name, e.message) }
}
// the manifest part, evaluated with the script's own key validation and scatter order
const sl = spliced.split('\n')
const s2 = sl.findIndex(l => l.startsWith('// MANIFEST - the coordinator replaces')) - 1
const e2 = sl.findIndex(l => l.startsWith('// =========================== END MANIFEST'))
const manifest = sl.slice(s2, e2).join('\n')
const valStart = sl.findIndex(l => l.startsWith('const LOOKUP_TOOL = '))
const valEnd = sl.findIndex(l => l.startsWith('const keysOf = '))
const validation = sl.slice(valStart, valEnd + 1).join('\n')
const scatterLine = sl.find(l => l.startsWith('const SCATTER = '))
function evalWith(ledger, base, q4) {
  let m = manifest
  if (ledger !== null) m = m.replace(/^const LEDGER_FROM = null/m, 'const LEDGER_FROM = ' + ledger)
  if (base !== null) m = m.replace(/^const CHECKER_BASE = null/m, 'const CHECKER_BASE = ' + base)
  if (q4 !== undefined) m = m.replace(/^const Q4 = 1/m, 'const Q4 = ' + q4)
  const f = new Function(m + '\n' + validation + '\n' + scatterLine + '\nreturn { BATCH, BATCH_RECORD, RUNGS, SCATTER, BATCH_INTRO, BATCH_OVERLAPS, LEDGER_FROM, CHECKER_BASE }')
  return f()
}
for (const [label, a] of [['LEDGER_FROM unset', [null, 75]], ['CHECKER_BASE unset', [500, null]], ['Q4 = 3', [500, 75, 3]]]) {
  try { evalWith(...a); bad++; console.log(label + ': did NOT throw (bad)') } catch (e) { console.log(label + ': throws:', e.message) }
}
const REASONS_HEAD = '**Your briefing, entry by entry.**'
const rec = fs.readFileSync(REC, 'utf8')
const s3 = rec.slice(rec.indexOf('\n## 3. The rungs\n'), rec.indexOf('\n## 4. '))
function section(id) {
  const re = new RegExp('^### ' + id + '\\. .*$', 'm')
  const m = re.exec(s3); if (!m) throw new Error('no section ' + id)
  const rest = s3.slice(m.index + m[0].length)
  const nx = rest.search(/^### [A-Z]\. /m)
  return (nx < 0 ? rest : rest.slice(0, nx)).replace(/^\n+|\n+$/g, '').replace(/`/g, '')
}
for (const q4 of [1, 2]) {
  const r = evalWith(500, 75, q4)
  const ids = r.RUNGS.map(x => x.id).join(', ')
  const counts = r.RUNGS.map(x => x.id + '=' + (x.expectedCheckerCount === undefined ? 'none' : x.expectedCheckerCount)).join(' ')
  const stage = r.RUNGS.filter(x => x.testIsStage).map(x => x.id).join(', ')
  const lands = r.RUNGS.filter(x => x.landsOnlyWith).map(x => x.id + ' with ' + x.landsOnlyWith.join(',')).join('; ')
  console.log('Q4 = ' + q4 + ': batch ' + r.BATCH + ', rungs ' + ids + ', scatter ' + r.SCATTER.map(x => x.id).join(', ') + ', counts ' + counts + ', testIsStage ' + stage + ', landsOnlyWith ' + lands + ', intro ' + r.BATCH_INTRO.length + ' chars, overlaps ' + r.BATCH_OVERLAPS.length + ' chars')
  if (r.BATCH !== '7b' || ids !== 'S, C, W, L' || r.SCATTER.map(x => x.id).join('') !== 'WCLS') { bad++; console.log('  batch, rungs or scatter not as the record says') }
  if (r.RUNGS.find(x => x.id === 'C').expectedCheckerCount !== 75 + (q4 === 2 ? 4 : 2)) { bad++; console.log('  C\'s prediction wrong') }
  if (q4 === 2) continue
  for (const x of r.RUNGS) {
    const tl = x.tail.split('\n')
    const rh = tl.findIndex(l => l.startsWith(REASONS_HEAD))
    if (rh < 0) { bad++; console.log('  tail ' + x.id + ' has no reasons block'); continue }
    const body = tl.slice(7, rh - 1).join('\n')
    const want = section(x.id)
    if (body !== want || tl[rh - 1] !== '') { bad++; console.log('  tail ' + x.id + ' differs from its section') }
    const reasons = tl.slice(rh + 1, tl.length - 1)
    const keys = x.briefing || []
    if (reasons.length !== keys.length || !keys.every((k, i) => reasons[i].startsWith('- ' + k + ': ') && reasons[i].length > k.length + 6)) { bad++; console.log('  tail ' + x.id + ': the reasons are not one line per briefing key, in order') }
    if (tl[tl.length - 1] !== '') { bad++; console.log('  tail ' + x.id + ' does not end with an empty line') }
    for (const [name, text] of [['tail ' + x.id, x.tail], ['blurb ' + x.id, x.blurb]]) {
      if (/[^\x00-\x7f]/.test(text) || /`/.test(text)) { bad++; console.log('  ' + name + ' holds a backtick or non-ASCII') }
    }
    if (!(x.checks || []).every(k => x.briefing.includes(k))) { bad++; console.log('  checks not a sub-list: ' + x.id) }
    console.log('  ' + x.id + ': tail ' + tl.length + ' lines, briefing ' + keys.length + ' keys, checks ' + (x.checks || []).length + ' keys')
  }
  for (const [name, text] of [['intro', r.BATCH_INTRO], ['overlaps', r.BATCH_OVERLAPS]]) {
    if (/[^\x00-\x7f]/.test(text) || /`/.test(text)) { bad++; console.log('  ' + name + ' holds a backtick or non-ASCII') }
  }
}
// the block the record carries in section 7 is the one generated
const i7 = rec.indexOf('\n## 7. The manifest\n')
const j7 = rec.indexOf('\n```js\n', i7) + '\n```js\n'.length
const k7 = rec.indexOf('\n```\n', j7 - 1)
if (rec.slice(j7, k7 + 1) !== block) { bad++; console.log('the record\'s section 7 does not carry the generated block (run gen7b.py --paste)') }
else console.log('the record\'s section 7 carries the generated block, byte for byte')
console.log('problems:', bad)
