// Splices climb batch 6.5's MANIFEST block into a scratch copy of the workflow script and checks it: node --check,
// the launch values (RUN, LEDGER_FROM, CHECKER_BASE) refused when unset or wrong, each run's rungs and scatter, each
// tail equal to its rung's section of the record followed by its briefing's reasons, one per key in order, and no
// backtick or non-ASCII character in any string the agents read. Its last line counts the problems. RUN65=second
// (or first, all) sets the block's RUN before the splice, so the spliced copy is the one that run would launch with.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || '/home/user/fortress'
const HERE = process.env.OUT65 || path.join(ROOT, 'tmp')   // gen65.py's output and this check's scratch copy; tmp/ is ignored
const SRC = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const REC = process.argv[2] || path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-6.5.md')
let block = fs.readFileSync(path.join(HERE, 'manifest65.js'), 'utf8')
if (process.env.RUN65) {
  if (!/^const RUN = 'first'/m.test(block)) throw new Error('the generated block does not set RUN to first')
  block = block.replace(/^const RUN = 'first'/m, "const RUN = '" + process.env.RUN65 + "'")
}
console.log("the spliced block sets RUN = '" + /^const RUN = '([a-z]+)'/m.exec(block)[1] + "'")
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
function evalWith(run, ledger, base = 75) {
  let m = run === null ? manifest : manifest.replace(/^const RUN = '[a-z]+'/m, "const RUN = '" + run + "'")
  if (ledger !== null) m = m.replace(/^const LEDGER_FROM = null/m, 'const LEDGER_FROM = ' + ledger)
  if (base !== null) m = m.replace(/^const CHECKER_BASE = null/m, 'const CHECKER_BASE = ' + base)
  const f = new Function(m + '\n' + validation + '\n' + scatterLine + '\nreturn { BATCH, BATCH_RECORD, RUNGS, SCATTER, BATCH_INTRO, BATCH_OVERLAPS, LEDGER_FROM }')
  return f()
}
try { evalWith('first', null); console.log('LEDGER_FROM unset: did NOT throw (bad)') } catch (e) { console.log('LEDGER_FROM unset: throws:', e.message) }
try { evalWith('first', 493, null); console.log('CHECKER_BASE unset: did NOT throw (bad)') } catch (e) { console.log('CHECKER_BASE unset: throws:', e.message) }
try { evalWith('bogus', 493); console.log('RUN bogus: did NOT throw (bad)') } catch (e) { console.log('RUN bogus: throws:', e.message) }
const REASONS_HEAD = "**Your briefing, entry by entry.**"
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
{ const r = evalWith(null, 493); console.log('as spliced: batch ' + r.BATCH + ', rungs ' + r.RUNGS.map(x => x.id).join(', ') + ', scatter ' + r.SCATTER.map(x => x.id).join(', ')) }
for (const run of ['first', 'second', 'all']) {
  const r = evalWith(run, 493)
  const ids = r.RUNGS.map(x => x.id).join(', ')
  console.log('RUN ' + run + ': batch ' + r.BATCH + ', rungs ' + ids + ', scatter ' + r.SCATTER.map(x => x.id).join(', ') + ', intro ' + r.BATCH_INTRO.length + ' chars, overlaps ' + r.BATCH_OVERLAPS.length + ' chars')
  for (const x of r.RUNGS) {
    const tl = x.tail.split('\n')
    const rh = tl.findIndex(l => l.startsWith(REASONS_HEAD))
    if (rh < 0) { bad++; console.log('  tail ' + x.id + ' has no reasons block') ; continue }
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
  }
  for (const [name, text] of [['intro', r.BATCH_INTRO], ['overlaps', r.BATCH_OVERLAPS]]) {
    if (/[^\x00-\x7f]/.test(text) || /`/.test(text)) { bad++; console.log('  ' + name + ' holds a backtick or non-ASCII') }
  }
}
console.log('tail/section or character problems:', bad)
