// Splices climb batch 6.5's MANIFEST block into a scratch copy of the workflow script and checks it.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || '/home/user/fortress'
const HERE = path.join(ROOT, 'tmp')   // gen65.py's output and this check's scratch copy; tmp/ is ignored
const SRC = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const REC = process.argv[2] || path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-6.5.md')
const block = fs.readFileSync(path.join(HERE, 'manifest65.js'), 'utf8')
const orig = fs.readFileSync(SRC, 'utf8')
const lines = orig.split('\n')
const mIdx = lines.findIndex(l => l.startsWith('// MANIFEST - the coordinator replaces'))
const start = mIdx - 1
if (!/^\/\/ =+$/.test(lines[start])) throw new Error('no rule above MANIFEST')
const end = lines.findIndex(l => l.startsWith('// =========================== END MANIFEST'))
console.log('original script: MANIFEST block is lines', start + 1, 'to', end, 'of', lines.length)
const spliced = lines.slice(0, start).join('\n') + '\n' + block + lines.slice(end).join('\n')
const out = path.join(HERE, 'wf-spliced.js')
fs.writeFileSync(out, spliced)
// outside the block, byte-identical
const pre = lines.slice(0, start).join('\n'), post = lines.slice(end).join('\n')
if (!spliced.startsWith(pre + '\n') || !spliced.endsWith(post)) throw new Error('outside the block differs')
for (const f of [SRC, out]) {
  const r = cp.spawnSync('node', ['--check', f], { encoding: 'utf8' })
  console.log('node --check', path.basename(f), 'exit', r.status, r.stderr.trim().slice(0, 300))
}
// the manifest part, evaluated with the globals it needs
const sl = spliced.split('\n')
const s2 = sl.findIndex(l => l.startsWith('// MANIFEST - the coordinator replaces')) - 1
const e2 = sl.findIndex(l => l.startsWith('// =========================== END MANIFEST'))
const manifest = sl.slice(s2, e2).join('\n')
const valStart = sl.findIndex(l => l.startsWith("const LOOKUP_TOOL = "))
const valEnd = sl.findIndex(l => l.startsWith("const keysOf = "))
const validation = sl.slice(valStart, valEnd + 1).join('\n')
const scatterLine = sl.find(l => l.startsWith('const SCATTER = '))
function evalWith(run, ledger) {
  let m = manifest.replace(/^const RUN = '[a-z]+'/m, "const RUN = '" + run + "'")
  if (ledger !== null) m = m.replace(/^const LEDGER_FROM = null/m, 'const LEDGER_FROM = ' + ledger)
  const f = new Function(m + '\n' + validation + '\n' + scatterLine + '\nreturn { BATCH, BATCH_RECORD, RUNGS, SCATTER, BATCH_INTRO, BATCH_OVERLAPS, LEDGER_FROM }')
  return f()
}
try { evalWith('first', null); console.log('LEDGER_FROM unset: did NOT throw (bad)') } catch (e) { console.log('LEDGER_FROM unset: throws:', e.message) }
try { evalWith('bogus', 449); console.log('RUN bogus: did NOT throw (bad)') } catch (e) { console.log('RUN bogus: throws:', e.message) }
const rec = fs.readFileSync(REC, 'utf8')
const s3 = rec.slice(rec.indexOf('\n## 3. The rungs\n'), rec.indexOf('\n## 4. '))
function section(id) {
  const re = new RegExp('^### ' + id + '\\. .*$', 'm')
  const m = re.exec(s3); if (!m) throw new Error('no section ' + id)
  const rest = s3.slice(m.index + m[0].length)
  const nx = rest.search(/^### [A-Z]\. /m)
  return (nx < 0 ? rest : rest.slice(0, nx)).replace(/^\n+|\n+$/g, '').replace(/`/g, '')
}
let bad = 0
for (const run of ['first', 'second', 'all']) {
  const r = evalWith(run, 449)
  const ids = r.RUNGS.map(x => x.id).join(', ')
  console.log('RUN ' + run + ': batch ' + r.BATCH + ', rungs ' + ids + ', scatter ' + r.SCATTER.map(x => x.id).join(', ') + ', intro ' + r.BATCH_INTRO.length + ' chars, overlaps ' + r.BATCH_OVERLAPS.length + ' chars')
  for (const x of r.RUNGS) {
    const tl = x.tail.split('\n')
    const body = tl.slice(7, tl.length - 1).join('\n')
    const want = section(x.id)
    if (body !== want) { bad++; console.log('  tail ' + x.id + ' differs from its section') }
    for (const [name, text] of [['tail ' + x.id, x.tail], ['blurb ' + x.id, x.blurb]]) {
      if (/[^\x00-\x7f]/.test(text) || /`/.test(text)) { bad++; console.log('  ' + name + ' holds a backtick or non-ASCII') }
    }
    if (!(x.checks || []).every(k => x.briefing.includes(k))) { bad++; console.log('  checks not a sub-list: ' + x.id) }
  }
  for (const [name, text] of [['intro', r.BATCH_INTRO], ['overlaps', r.BATCH_OVERLAPS]]) {
    if (/[^\x00-\x7f]/.test(text) || /`/.test(text)) { bad++; console.log('  ' + name + ' holds a backtick or non-ASCII') }
  }
}
console.log('tail/section or character problems:', bad)
