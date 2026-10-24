// check23.js for climb batch 23, made from plan-22/manifest/check22.js.
// Checks the MANIFEST block of climb batch 23 (gen23.py's output, $OUT23/manifest23.js) spliced into a scratch copy
// of the workflow script, and with --write splices it into
// the tracked script. As check20.js: node --check on the original and the spliced copy; both parsed as the body of an
// async function, as the Workflow harness parses them, their export made const; every line outside the block
// byte-identical; the block evaluated with the script's own load checks and scatter order; the batch's rungs (C and
// W, in that order, less any that --without names, and never C without W), their fields, no rung bringing a gate step, declaring a
// checker count, a crash or a ladder move; W landing only with C and C with no rung; each section equal to the rung's
// section 3 of the record (backticks dropped, the ellipsis character as three full stops); briefing, reasons and checks
// equal to lists23.py's, one reason per key, checks a sub-list of the briefing; neither rung's test the stage; every
// section naming the count stage and the distance stage; every section saying it makes no speed pass and naming no
// P-148, since no rung changes the checker; no backtick or non-ASCII character in any string the agents read; no text
// asking a skeptic to see a failure again or a stage re-run without a code change (the coordinator skill's
// references/batch.md, "The workflow"); no LEDGER_FROM; the record holding no copy of the block. Its last lines say
// whether the tracked script's block equals the generated one, and count the problems.
//   node check23.js [--without <rung>] [--write] [RECORD]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-23.md
// --without <rung> checks the block that gen23.py writes with the same argument: the batch's rungs less that one.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || path.resolve(__dirname, '../../../..')
const HERE = process.env.OUT23 || path.join(ROOT, 'tmp')
const SRC = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const argv = process.argv.slice(2)
const WRITE = argv.includes('--write')
const WITHOUT = argv.map((a, i) => argv[i - 1] === '--without' ? a : null).filter(a => a !== null)
const BATCH_NAME = '23'
const RUN_IDS = ['C', 'W'].filter(x => !WITHOUT.includes(x))
if (WITHOUT.some(x => !'CW'.includes(x))) { console.log('--without names a rung not in the batch'); process.exit(2) }
if (WITHOUT.includes('C') && !WITHOUT.includes('W')) { console.log('W lands only with C: --without C needs --without W too'); process.exit(2) }
const STAGE_RUNGS = []
const CHECKER_RUNGS = []
const LANDS_ONLY_WITH = { C: [], W: ['C'] }
const REC = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--without')[0] || path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-23.md')
const block = fs.readFileSync(path.join(HERE, 'manifest' + BATCH_NAME + '.js'), 'utf8')
const orig = fs.readFileSync(SRC, 'utf8')
let bad = 0
const say = (ok, text) => { if (!ok) bad++; console.log((ok ? 'ok   ' : 'BAD  ') + text) }

function bounds(text) {
  const ls = text.split('\n')
  const m = ls.findIndex(l => l.startsWith('// MANIFEST - the coordinator replaces'))
  if (m < 1 || !/^\/\/ =+$/.test(ls[m - 1])) throw new Error('no rule above the MANIFEST line')
  const e = ls.findIndex(l => l.startsWith('// =========================== END MANIFEST'))
  if (e < m) throw new Error('no END MANIFEST line after the MANIFEST line')
  return { ls, start: m - 1, end: e }
}
const o = bounds(orig)
const pre = o.ls.slice(0, o.start).join('\n'), post = o.ls.slice(o.end).join('\n')
const current = o.ls.slice(o.start, o.end).join('\n') + '\n'
const spliced = pre + '\n' + block + post
const out = path.join(HERE, 'wf-spliced-' + BATCH_NAME + '.js')
fs.writeFileSync(out, spliced)
console.log('the script\'s MANIFEST block is lines ' + (o.start + 1) + ' to ' + o.end + ' of ' + o.ls.length + '; the generated block has ' + block.split('\n').length + ' lines')
say(spliced.startsWith(pre + '\n') && spliced.endsWith(post) && block.endsWith('\n') && !block.split('\n').some(l => l.startsWith('// =========================== END MANIFEST')), 'every line outside the block is byte-identical, and the block ends before END MANIFEST')

for (const f of [SRC, out]) {
  const r = cp.spawnSync('node', ['--check', f], { encoding: 'utf8' })
  say(r.status === 0, 'node --check ' + path.basename(f) + ': exit ' + r.status + (r.status ? ' ' + r.stderr.trim().slice(0, 300) : ''))
}
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
for (const [name, text] of [['original', orig], ['spliced', spliced]]) {
  try { new AsyncFunction('args', 'agent', 'pipeline', 'parallel', 'log', 'phase', 'budget', 'workflow', text.replace(/^export const meta/m, 'const meta')); say(true, 'the harness\'s parse: ' + name + ' accepted as an async function body, its export made const') }
  catch (e) { say(false, 'the harness\'s parse: ' + name + ' refused: ' + e.message) }
}

// The block, evaluated with the script's load checks (const LOOKUP_TOOL ... const keysOf) and its scatter line.
const s = bounds(spliced)
const manifest = s.ls.slice(s.start, s.end).join('\n')
const vStart = s.ls.findIndex(l => l.startsWith('const LOOKUP_TOOL = '))
const vEnd = s.ls.findIndex(l => l.startsWith('const keysOf = '))
const validation = s.ls.slice(vStart, vEnd + 1).join('\n')
const scatter = s.ls.find(l => l.startsWith('const SCATTER = '))
let r = null
try {
  r = new Function("const TOOLS = 'explorations/coordinator/tools'\n" + manifest + '\n' + scatter + '\n' + validation +
    '\nreturn { BATCH, BATCH_RECORD, BRIEFING_LISTS, RUNGS, SCATTER, BATCH_INTRO, ledgerFrom: typeof LEDGER_FROM }')()
  say(true, 'the block passes the script\'s own load checks')
} catch (e) { say(false, 'the block fails the script\'s load checks: ' + e.message) }

if (r) {
  const ids = r.RUNGS.map(x => x.id).join(', ')
  const order = r.RUNGS.slice().sort((a, b) => b.expectedMinutes - a.expectedMinutes).map(x => x.id).join('')
  console.log('batch ' + r.BATCH + ', rungs ' + ids + ', scatter ' + r.SCATTER.map(x => x.id).join('') + ', intro ' + r.BATCH_INTRO.length + ' characters')
  say(r.BATCH === BATCH_NAME && r.BATCH_RECORD === 'explorations/coordinator/CLIMB-BATCH-23.md' && r.BRIEFING_LISTS === 'explorations/compile-ladder/plan-23/manifest/lists23.py' && ids === RUN_IDS.join(', ') && r.SCATTER.map(x => x.id).join('') === order, 'batch ' + BATCH_NAME + ', its record and lists, the rungs ' + RUN_IDS.join(', ') + ' and the scatter by expected minutes, ' + order)
  say(r.ledgerFrom === 'undefined', 'no LEDGER_FROM: the gather numbers the new rows through ledger.py')
  say(r.RUNGS.every(x => Array.isArray(x.gateJoins) && !x.gateJoins.length), 'no rung brings a gate step: testSpecData runs from the last landed summary')
  say(r.RUNGS.every(x => JSON.stringify(x.landsOnlyWith || []) === JSON.stringify(LANDS_ONLY_WITH[x.id])), 'W lands only with C, and C with no rung: ' + r.RUNGS.map(x => x.id + ' [' + (x.landsOnlyWith || []).join(', ') + ']').join(', '))
  say(r.RUNGS.every(x => x.expectedCheckerCrash === undefined && Array.isArray(x.expectedMoves) && !x.expectedMoves.length), 'no rung declares a crash or a ladder move')
  say(r.RUNGS.every(x => x.expectedCheckerCount === undefined), 'no rung declares a checker count: it is reported, never red')

  // The record's section 3, rung by rung, as gen23.py reads it.
  const rec = fs.readFileSync(REC, 'utf8')
  const s3 = rec.slice(rec.indexOf('\n## 3. The rungs\n'), rec.indexOf('\n## 4. '))
  const asAscii = (t) => t.replace(/`/g, '').replace(/…/g, '...')
  function section(id) {
    const m = new RegExp('^### ' + id + '\\. .*$', 'm').exec(s3)
    if (!m) return null
    const rest = s3.slice(m.index + m[0].length)
    const nx = rest.search(/^### /m)
    return asAscii((nx < 0 ? rest : rest.slice(0, nx)).replace(/^\n+|\n+$/g, ''))
  }
  // lists23.py's briefings, reasons and checks.
  const py = cp.spawnSync('python3', ['-B', '-c', 'import json, sys; sys.path.insert(0, sys.argv[1]); from lists23 import LISTS, REASONS, IDS; ' +
    'print(json.dumps({r: {"briefing": LISTS[r][0], "checks": LISTS[r][1], "reasons": [x for _, x in REASONS[r]]} for r in IDS}))', __dirname], { encoding: 'utf8' })
  const lists = py.status === 0 ? JSON.parse(py.stdout) : null
  say(!!lists, 'lists23.py read' + (lists ? '' : ': ' + py.stderr.trim().slice(0, 300)))
  const rerun = /sees? it fail again|re-?run by the skeptic|skeptic re-?runs|run the stage yourself|skeptic rebuilds|re-anchor/i
  for (const x of r.RUNGS) {
    const want = section(x.id)
    say(want !== null && x.section === want, x.id + ': its section is the record\'s section 3 for ' + x.id + ' word for word (' + x.section.length + ' characters)')
    const l = lists && lists[x.id]
    say(!!l && JSON.stringify(x.briefing) === JSON.stringify(l.briefing) && JSON.stringify(x.checks) === JSON.stringify(l.checks) &&
      JSON.stringify(x.reasons) === JSON.stringify(l.reasons.map(asAscii)), x.id + ': briefing ' + x.briefing.length + ' keys, reasons ' + x.reasons.length + ', checks ' + x.checks.length + ', as lists23.py has them')
    say(x.checks.every(k => x.briefing.includes(k)), x.id + ': checks a sub-list of the briefing')
    say(x.branch === 'wip/' + x.slug && /^\/home\/user\/fortress-[a-z0-9-]+$/.test(x.path) && x.expectedMinutes > 0, x.id + ': ' + x.path + ' on ' + x.branch + ', ' + x.expectedMinutes + ' minutes')
    say(Array.isArray(x.pointsToReport) && x.pointsToReport.length > 0 && x.pointsToReport.every(p => typeof p === 'string' && p.trim()), x.id + ': ' + x.pointsToReport.length + ' points to report')
    const texts = [x.title, x.blurb, x.section].concat(x.pointsToReport, x.reasons, x.briefing)
    say(!texts.some(t => /[^\x00-\x7f`]/.test(t) || /`/.test(t)), x.id + ': no backtick or non-ASCII character')
    say(!texts.some(t => rerun.test(t)), x.id + ': nothing asks a skeptic to see a failure again, rebuild, re-run or re-anchor')
    say(x.testIsStage === STAGE_RUNGS.includes(x.id), x.id + ': its test is the stage: ' + x.testIsStage + (STAGE_RUNGS.includes(x.id) ? ', its every edit is library text that only the checker reads differently' : ', a test first'))
    say(/distance stage/.test(x.section) && /count stage/.test(x.section), x.id + ': its section names the count stage and the distance stage')
    if (CHECKER_RUNGS.includes(x.id)) say(/P-148/.test(x.section) && /speed pass/.test(x.section) && !/no speed pass/.test(x.section), x.id + ': a rung that changes the checker, its section names P-148 and its speed pass')
    else say(/no speed pass/.test(x.section) && !/P-148/.test(x.section), x.id + ': a rung outside the checker, its section says it makes no speed pass')
  }
  say(!/[^\x00-\x7f]|`/.test(r.BATCH_INTRO) && !rerun.test(r.BATCH_INTRO), 'the intro: ASCII, no backtick, no re-run')
  const paths = r.RUNGS.map(x => x.path), slugs = r.RUNGS.map(x => x.slug)
  say(new Set(paths).size === paths.length && new Set(slugs).size === slugs.length, 'every rung has its own worktree and branch')
  say(!rec.includes('const RUNGS') && !rec.includes('_ENTRY = {') && rec.includes('gen23.py') && rec.includes('check23.js'), 'the record names gen23.py and check23.js and holds no copy of the block')
}

const same = current === block
console.log((same ? 'the tracked script\'s block equals the generated one' : 'the tracked script\'s block differs from the generated one') + (WRITE ? '' : '; --write splices it'))
if (WRITE) {
  if (bad) console.log('not written: ' + bad + ' problem(s)')
  else if (same) console.log('nothing to write')
  else { fs.writeFileSync(SRC, spliced); console.log('wrote the block into ' + path.relative(ROOT, SRC)) }
}
console.log('problems: ' + bad)
