// check33.js for climb batch 33, made from plan-31/manifest/check31.js.
// Checks the MANIFEST block of one run of climb batch 33 (gen33.py's output under $OUT33: manifest33.js for run 1,
// manifest33b.js for run 2) spliced into a scratch copy of the workflow script, $OUT33/wf-spliced-33.js or
// wf-spliced-33b.js, and with --write splices it into the tracked script. As check31.js: node --check on the original
// and the spliced copy; both parsed as the body of an async function, as the Workflow harness parses them, their
// export made const; the block evaluated with the script's own load checks and scatter order; the run's rungs
// (lists33.py's RUNS, in that order, less any that --without names), their fields, no rung bringing a gate step,
// landing only with another, or declaring a checker count, a crash or a ladder move; each section equal to the
// rung's section of the record (backticks dropped, the ellipsis character as three full stops, the minus sign as a
// hyphen-minus); briefing, reasons and checks equal to lists33.py's, one reason per key, checks a sub-list of the
// briefing; no rung's test the stage; no backtick in any string the agents read; no text asking a skeptic to see a
// failure again or a stage re-run without a code change (the coordinator skill's references/batch.md, "The
// workflow"); no LEDGER_FROM; the record holding no copy of the block; the slug, path, expected minutes, blurb and
// points of each rung against section 1; no string the agents read, nor the spliced script, holding a character
// outside ASCII; the briefings against section 1's bullets key by key, each key in order (a key that lists33.py's
// KEY_FIXES holds in another form read through it), its (check) mark and its reason (its first letter either case),
// and the bullet's counts; no string the agents read naming a path under .claude/skills/ or revival-changes.md, which
// tools/workflow-scenarios.js refuses in every brief.
// Changed from check31.js for this record (CLIMB-BATCH-33.md, section 6, "The generator"):
// - The runs: run 1 is BATCH 33, rungs S, D, V, Q, I, C; run 2 is BATCH 33b, rungs N, W, G, R; both of the record
//   CLIMB-BATCH-33.md and the lists lists33.py, under $OUT33 (manifest33.js and manifest33b.js, spliced into the
//   scratch copies wf-spliced-33.js and wf-spliced-33b.js). The common fields are the "Fields common to the ten
//   rungs". The abbreviations of a key are REC, PRB, PY, REH, CW, SPEC and SRC.
// - The atomic runs: unchanged, 24 programs (the record's "The gate, and what it should show"), so every line
//   outside the block stays byte-identical, the atomic lists among them.
// - S's track and the gate's comparand: the record names run 1's comparand, climb batch 31b's gate, with its figures,
//   which are checked against that summary; last_landed_summary of tools/gate-functions.sh, which the gate role
//   compares with, names it (for run 2, climb batch 33's); the record's testFast line names S's track as the one new
//   suite; and gate_compare, run on the comparand and on the comparand with one new suite, finds the new suite not
//   red, as the gate role's text says.
// - Section 4's rule: in run 1 S, D and C share no file with any other rung, and V, Q and I share CodeGen.java by
//   declaration, in the manifest's order V, Q, I; in run 2 N, W and G share NamingCzar.java, N, G and R CodeGen.java,
//   the order N, W, G, R. Each section's "Overlaps by file." names only rungs that share a file with it, or none; a
//   sharing rung that a section does not name is a note, not a problem.
// - The stages (section 1's common fields; section 6, "The generator"): S, D, V, C, N and R name the two stages in a
//   numbered step of their sections, "once on your final tree", and say "Both, once" under "The stages."; C with
//   P-148's timing; Q, I, W and G open "The stages." with "None" and list their files (STAGE_BLIND); V, Q, I, N, W,
//   G and R name the distance stage's shadow patch, and S, D and C do not.
// - The intro is the run's part of section 6's "What every agent reads first": it names the run's batch and rungs,
//   and the gather's order; in run 2, which rungs run the two stages.
// The script's paths built from the batch's name (BATCH_DIR climb-batch-33 or climb-batch-33b, GATE_DIR, LOG_DIR,
// GATE_OUT, SPEC_PDF) take the name whole, and every other use of BATCH after the block is a concatenation or a
// field, never a number; the record and the lists the block names are on disk. Its last lines say whether the
// tracked script's block equals the generated one, and count the problems; it exits 1 on any, and --write then
// writes nothing.
//   node check33.js --run 1|2 [--without <rung>]... [--write] [RECORD]
// --without <rung> checks the block that gen33.py writes with the same argument: the run's rungs less that one.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || path.resolve(__dirname, '../../../..')
const HERE = process.env.OUT33 || path.join(ROOT, 'tmp')
const SRC = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const argv = process.argv.slice(2)
const WRITE = argv.includes('--write')
const WITHOUT = argv.map((a, i) => argv[i - 1] === '--without' ? a : null).filter(a => a !== null)
const RUN = argv[argv.indexOf('--run') + 1]
if (!argv.includes('--run') || !['1', '2'].includes(RUN)) { console.log('usage: node check33.js --run 1|2 [--without <rung>]... [--write] [RECORD]'); process.exit(2) }
const BATCH_NAME = { 1: '33', 2: '33b' }[RUN]
const RECORD_PATH = 'explorations/coordinator/CLIMB-BATCH-33.md'
const LISTS_PATH = 'explorations/compile-ladder/plan-33/manifest/lists33.py'
const idsPy = cp.spawnSync('python3', ['-B', '-c', 'import json, sys; sys.path.insert(0, sys.argv[1]); from lists33 import IDS, RUNS, KEY_FIXES; print(json.dumps({"ids": IDS, "runs": RUNS, "fixes": {k: v[0] for k, v in KEY_FIXES.items()}}))', __dirname], { encoding: 'utf8' })
if (idsPy.status !== 0) { console.log('lists33.py not read: ' + idsPy.stderr.trim().slice(0, 300)); process.exit(2) }
const ALL_IDS = JSON.parse(idsPy.stdout).ids
const RUNS = JSON.parse(idsPy.stdout).runs
const KEY_FIXES = JSON.parse(idsPy.stdout).fixes
const THIS_RUN = RUNS[RUN]
const RUN_IDS = THIS_RUN.filter(x => !WITHOUT.includes(x))
if (WITHOUT.some(x => !THIS_RUN.includes(x))) { console.log('--without names a rung not in the run'); process.exit(2) }
const STAGE_RUNGS = []
// The rungs that run the count stage and the distance stage once on their final trees (section 1's common fields):
// S, D, V, C, N and R; C with P-148's timing. Q, I, W and G run neither and list their files. The rungs whose
// section names the distance stage's shadow patch: V, Q, I, N, G and R, and W if it edits CodeGen.java.
const STAGES_RUNGS = ['S', 'D', 'V', 'C', 'N', 'R']
const TIMED_RUNGS = ['C']
const SHADOW_RUNGS = ['V', 'Q', 'I', 'N', 'W', 'G', 'R']
// The rungs of each run that share a file, by section 4's "The rule the rungs keep".
const SHARERS = { 1: { V: ['Q', 'I'], Q: ['V', 'I'], I: ['V', 'Q'] }, 2: { N: ['W', 'G', 'R'], W: ['N', 'G'], G: ['N', 'W', 'R'], R: ['N', 'G'] } }[RUN]
// The characters outside ASCII that a section keeps from the record, as gen33.py's KEPT: none.
const KEPT = ''
const nonAscii = (t, keep) => [...t].filter(c => c.charCodeAt(0) > 127 && !(keep || '').includes(c))
// No rung lands only with another (section 1's common fields: "lands only with: none").
const LANDS_ONLY_WITH = Object.fromEntries(ALL_IDS.map(x => [x, []]))
const REC = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--without' && argv[i - 1] !== '--run')[0] || path.join(ROOT, RECORD_PATH)
const block = fs.readFileSync(path.join(HERE, 'manifest' + BATCH_NAME + '.js'), 'utf8')
const orig = fs.readFileSync(SRC, 'utf8')
const recText = fs.readFileSync(REC, 'utf8')
let bad = 0
const say = (ok, text) => { if (!ok) bad++; console.log((ok ? 'ok   ' : 'BAD  ') + text) }
const note = (text) => console.log('note ' + text)

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
{
  const a = orig.split('\n'), z = spliced.split('\n')
  const head = a.slice(0, o.start), tail = a.slice(o.end)
  say(JSON.stringify(z.slice(0, o.start)) === JSON.stringify(head) && JSON.stringify(z.slice(z.length - tail.length)) === JSON.stringify(tail) && block.endsWith('\n') &&
    !block.split('\n').some(l => l.startsWith('// =========================== END MANIFEST')),
    'every line outside the block is byte-identical, the atomic lists among them; the block ends before END MANIFEST')
}

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

// The paths and names the script builds from the batch's name, evaluated from its own lines with the block's BATCH:
// each takes the name whole, 33 or 33b; BATCH is only ever concatenated, never read as a number.
{
  const afterBlock = s.ls.slice(s.end)
  const pathLines = ['const BATCH_DIR = ', 'const GATE_DIR = ', 'const LOG_DIR = ', 'const GATE_OUT = ', 'const SPEC_PDF = '].map(p => afterBlock.find(l => l.startsWith(p)))
  const mainLine = s.ls.find(l => l.startsWith('const MAIN = '))
  let p = null
  try { p = new Function("const BATCH = '" + BATCH_NAME + "'\n" + mainLine + '\n' + pathLines.join('\n') + '\nreturn { BATCH_DIR, GATE_DIR, LOG_DIR, GATE_OUT, SPEC_PDF }')() } catch (e) { p = null }
  say(!!p && p.BATCH_DIR === 'explorations/compile-ladder/climb-batch-' + BATCH_NAME && p.GATE_DIR === 'explorations/compile-ladder/climb-batch-' + BATCH_NAME + '/gate' && p.LOG_DIR === 'tmp/gate-batch-' + BATCH_NAME &&
    p.GATE_OUT === 'tmp/gate-batch-' + BATCH_NAME + '/out' && p.SPEC_PDF === '/home/user/fortress/tmp/gather/fortress-batch-' + BATCH_NAME + '.pdf',
    'the script\'s paths from the batch\'s name: ' + (p ? [p.BATCH_DIR, p.GATE_DIR, p.LOG_DIR, p.GATE_OUT, p.SPEC_PDF].join(', ') : 'not evaluated'))
  // Each use of BATCH after the block: the nearest character before it a + or the colon of an object's field, and
  // after it a +, a comma, a closing parenthesis, the line's end or a comment, so it is only ever concatenated.
  const uses = [], arith = []
  for (const line of afterBlock) {
    for (const m of line.matchAll(/\bBATCH\b/g)) {
      const before = line.slice(0, m.index).trimEnd(), after = line.slice(m.index + 5).trimStart()
      const ctx = line.slice(Math.max(0, m.index - 24), m.index + 29)
      uses.push(ctx)
      if (!/[+:]$/.test(before) || !(after === '' || /^([+,)]|\/\/)/.test(after))) arith.push(ctx)
    }
  }
  say(uses.length > 0 && !arith.length, 'outside the block BATCH is read ' + uses.length + ' times, each a string concatenation or a field, never a number' + (arith.length ? '; not: ' + arith.join(' | ') : ''))
  say(!fs.existsSync(path.join(ROOT, 'explorations/compile-ladder/climb-batch-' + BATCH_NAME)), 'the batch\'s folder, explorations/compile-ladder/climb-batch-' + BATCH_NAME + '/, does not exist yet')
}

if (r) {
  const ids = r.RUNGS.map(x => x.id).join(', ')
  const order = r.RUNGS.slice().sort((a, b) => b.expectedMinutes - a.expectedMinutes).map(x => x.id).join('')
  console.log('batch ' + r.BATCH + ', rungs ' + ids + ', scatter ' + r.SCATTER.map(x => x.id).join('') + ', intro ' + r.BATCH_INTRO.length + ' characters')
  say(r.BATCH === BATCH_NAME && r.BATCH_RECORD === RECORD_PATH && r.BRIEFING_LISTS === LISTS_PATH && ids === RUN_IDS.join(', ') && r.SCATTER.map(x => x.id).join('') === order, 'batch ' + BATCH_NAME + ', its record and lists, the rungs ' + RUN_IDS.join(', ') + ' and the scatter by expected minutes, ' + order)
  say(fs.existsSync(path.join(ROOT, r.BATCH_RECORD)) && fs.existsSync(path.join(ROOT, r.BRIEFING_LISTS)), 'the record and the lists the block names are on disk: ' + r.BATCH_RECORD + ', ' + r.BRIEFING_LISTS)
  say(r.ledgerFrom === 'undefined', 'no LEDGER_FROM: the gather numbers the new rows through ledger.py')
  say(r.RUNGS.every(x => Array.isArray(x.gateJoins) && !x.gateJoins.length), 'no rung brings a gate step: S\'s track runs inside testFast, and testSpecData runs from the last landed summary')
  say(r.RUNGS.every(x => JSON.stringify(x.landsOnlyWith || []) === JSON.stringify(LANDS_ONLY_WITH[x.id])), 'landsOnlyWith as section 1 gives it: ' + r.RUNGS.map(x => x.id + ' [' + (x.landsOnlyWith || []).join(', ') + ']').join(', '))
  say(r.RUNGS.every(x => x.expectedCheckerCrash === undefined && Array.isArray(x.expectedMoves) && !x.expectedMoves.length), 'no rung declares a crash or a ladder move')
  say(r.RUNGS.every(x => x.expectedCheckerCount === undefined), 'no rung declares a checker count: it is reported, never red')

  // The record's section 4, rung by rung, as gen33.py reads it.
  const rec = recText
  const s4 = rec.slice(rec.indexOf('\n## 4. The rungs\n'), rec.indexOf('\n## 5. '))
  const asAscii = (t) => t.replace(/`/g, '').replace(/…/g, '...').replace(/−/g, '-')
  function heading(id) {
    const m = new RegExp('^### (' + id + '\\. .*)$', 'm').exec(s4)
    return m ? asAscii(m[1]) : null
  }
  function section(id) {
    const m = new RegExp('^### ' + id + '\\. .*$', 'm').exec(s4)
    if (!m) return null
    const rest = s4.slice(m.index + m[0].length)
    const nx = rest.search(/^### /m)
    return asAscii((nx < 0 ? rest : rest.slice(0, nx)).replace(/^\n+|\n+$/g, ''))
  }
  // The record's section 1: the abbreviations of its opening paragraph, the table's row of one rung, and its ### block.
  const s1 = rec.slice(rec.indexOf('\n## 1. The manifest, rung by rung\n'), rec.indexOf('\n## 2. '))
  const ABBR = {}
  for (const m of s1.slice(0, s1.indexOf('\n|')).matchAll(/\b(REC|PRB|PY|REH|CW|SPEC|SRC) (?:stands )?for `([^`]+)`/g)) ABBR[m[1]] = m[2]
  say(['REC', 'PRB', 'PY', 'REH', 'CW'].every(k => ABBR[k] && /^doc:[^#]+#$/.test(ABBR[k]) && fs.existsSync(path.join(ROOT, ABBR[k].slice(4, -1)))) && ABBR.REC === 'doc:' + RECORD_PATH + '#' && ABBR.SPEC === 'doc:Specification/' && ABBR.SRC === 'code:ProjectFortress/src/com/sun/fortress/',
    'section 1 spells out REC, PRB, PY, REH, CW, SPEC and SRC, each note on disk: ' + Object.entries(ABBR).map(([k, v]) => k + ' ' + v).join(', '))
  const REC_KEY = ABBR.REC || 'doc:' + RECORD_PATH + '#'
  const rungNames = (t) => t.replace(/\s*\(.*?\)\.?$/, '').replace(/\.$/, '').split(/,\s*|\s+and\s+/).map(s => s.trim()).filter(Boolean)
  function tableRow(id) {
    const m = new RegExp('^\\| ([12]) \\| ' + id + ' \\| `([a-z0-9-]+)` \\| (.*) \\| ([0-9]+) \\|$', 'm').exec(s1)
    return m ? { run: m[1], slug: m[2], title: asAscii(m[3]), minutes: +m[4] } : null
  }
  function rungBlock(id) {
    const m = new RegExp('^### ' + id + '$', 'm').exec(s1)
    if (!m) return null
    const rest = s1.slice(m.index + m[0].length)
    const nx = rest.search(/^### /m)
    const text = nx < 0 ? rest : rest.slice(0, nx)
    const field = (k) => { const f = new RegExp('^- \\*\\*' + k + ':\\*\\*\\s*(.*)$', 'm').exec(text); return f ? asAscii(f[1].trim()) : null }
    const lines = text.split('\n')
    const sub = (head) => { const i = lines.findIndex(l => l.startsWith(head)); if (i < 0) return null; const out = []; for (let j = i + 1; j < lines.length && lines[j].startsWith('  - '); j++) out.push(lines[j].slice(4)); return { head: lines[i], items: out } }
    const pts = sub('- **points to report:**')
    const br = sub('- **briefing**')
    const cm = br && /^- \*\*briefing\*\* \(([0-9]+) keys, ([0-9]+) checks\):$/.exec(br.head)
    const keys = br ? br.items.map(it => {
      const k = /^(`[^`]+`|(REC|PRB|PY|REH|CW|SPEC|SRC) `([^`]+)`|ledger:[0-9]+|[PF]-[0-9]+)( \(check\))?: (.*)$/.exec(it)
      if (!k || (k[2] && !ABBR[k[2]])) return { bad: it }
      const recKey = k[2] ? ABBR[k[2]] + k[3] : k[1].replace(/`/g, '')
      const key = KEY_FIXES[recKey] || recKey
      return { key, recKey, check: !!k[4], reason: k[5] }
    }) : []
    return { slug: field('slug'), worktree: field('worktree'), section: field('section'), blurb: field('blurb'), landsOnlyWith: field('lands only with'),
      points: pts ? pts.items.map(p => asAscii(p.trim())) : [], counts: cm ? [+cm[1], +cm[2]] : null, keys }
  }
  const common = (() => { const a = s1.indexOf('\nFields common to the ten rungs:\n'); return a < 0 ? '' : s1.slice(a, s1.indexOf('\n### ', a)) })()
  say(/\*\*writes state:\*\* no\./.test(common) && /\*\*its test is the stage:\*\* no\./.test(common) && /\*\*joins the gate:\*\* S's test track joins `testFast` \(section 4, S\); otherwise none, but the specification's build at each run's gather\./.test(common) &&
    /\*\*expected moves:\*\* none\./.test(common) && /\*\*expected checker count:\*\* none declared/.test(common) && /\*\*expected checker crash:\*\* none\./.test(common) &&
    /^- \*\*lands only with:\*\* none\. In each run every rung lands on its own\./m.test(common) &&
    /\*\*the stages:\*\* S, D, V, C, N and R run the count stage and the distance stage once on their final trees, as a step of their sections: [^\n]*Q, I, W and G run neither and list their files \(`STAGE_BLIND`\)[^\n]*V, Q, I, N, G and R each run the distance stage's shadow patch once on their final trees, [^\n]*; W too if it edits that file\./.test(common),
    'the record\'s fields common to the ten rungs: no state, no stage as the test, S\'s track inside testFast and no other gate step (the specification\'s build at the gather of each run), no move, no count or crash declared, no rung landing only with another, S, D, V, C, N and R running the two stages, Q, I, W and G neither, the shadow patch for V, Q, I, N, G, R and W')
  say(ALL_IDS.every(x => { const t = tableRow(x); return t && RUNS[t.run].includes(x) }), 'section 1\'s table gives each rung its run as lists33.py has it: ' + ALL_IDS.map(x => x + ' in run ' + (tableRow(x) || {}).run).join(', '))
  // lists33.py's briefings, reasons and checks, for the rungs of the block.
  const py = cp.spawnSync('python3', ['-B', '-c', 'import json, sys; sys.path.insert(0, sys.argv[1]); from lists33 import lists; ' +
    'L, R = lists(tuple(sys.argv[2].split(","))); print(json.dumps({r: {"briefing": L[r][0], "checks": L[r][1], "reasons": [x for _, x in R[r]]} for r in L}))', __dirname, RUN_IDS.join(',')], { encoding: 'utf8' })
  const lists = py.status === 0 ? JSON.parse(py.stdout) : null
  say(!!lists, 'lists33.py read' + (lists ? '' : ': ' + py.stderr.trim().slice(0, 300)))
  // Section 3's forks: the record's one forks key, whole, for every rung; a numbered list led by each fork's label.
  const FORKS_HEAD = 'Forks the batch takes'
  const FORKS_KEY = REC_KEY + FORKS_HEAD
  const fs3 = (() => { const a = rec.indexOf('\n### ' + FORKS_HEAD + '\n'); if (a < 0) return ''; const rest = rec.slice(a + 1); const e = rest.search(/\n#{1,3} /); return e < 0 ? rest : rest.slice(0, e) })()
  const leadOf = (l) => { const t = l.replace(/^[0-9]+\. /, ''); if (!t.startsWith('**')) return null; const c = t.indexOf('**', 2); return c > 2 ? t.slice(2, c) : null }
  const leads = fs3.split('\n').map(leadOf).filter(Boolean)
  const labels = leads.map(l => (/^([A-Z][0-9]*)\. /.exec(l) || [])[1]).filter(Boolean)
  say(!!fs3 && labels.length === leads.length && labels.length > 0 && ALL_IDS.every(x => labels.some(l => l.startsWith(x))), 'section 3\'s "' + FORKS_HEAD + '": ' + leads.length + ' forks led by their labels, ' + labels.join(', ') + ', some for every rung; every rung reads the record\'s one forks key whole')
  // Section 4's rule, and each section's "Overlaps by file.", for this run.
  const rule = (() => { const a = s4.indexOf('\n### The rule the rungs keep'); return a < 0 ? '' : s4.slice(a) })()
  const overlaps = (id) => (/\*\*Overlaps by file\.\*\* ([^\n]*)/.exec(section(id) || '') || [, ''])[1]
  if (RUN === '1') {
    say(/^- \*\*Run 1\.\*\* S, D and C share no file with any other rung\. V, Q and I share `compiler\/codegen\/CodeGen\.java`, by declaration:$/m.test(rule) && ['V', 'Q', 'I'].every(x => new RegExp('^  - ' + x + ': ', 'm').test(rule)) &&
      /^  - The gather's order is the script's: [^\n]*The manifest's order V, Q, I is that order as this record expects it\.$/m.test(rule),
      'section 4\'s rule for run 1: S, D and C share no file with any other rung; V, Q and I share CodeGen.java by declaration, each with its line; the gather\'s order is the script\'s, V, Q, I by the lowest edited line')
  } else {
    say(/^- \*\*Run 2\.\*\* By file and member:$/m.test(rule) && ['NamingCzar.java', 'CodeGen.java', 'OverloadSet.java'].every(f => new RegExp('^  - `' + f.replace('.', '\\.') + '`: ', 'm').test(rule)) &&
      /^  - The order by the lowest edited lines: N, W, G, R\./m.test(rule),
      'section 4\'s rule for run 2: NamingCzar.java, CodeGen.java and OverloadSet.java by member; the order by the lowest edited lines N, W, G, R')
  }
  for (const x of RUN_IDS) {
    const ov = overlaps(x)
    const sharers = SHARERS[x] || []
    const named = [...new Set(((ov.split(':')[0] || '').match(/\b[A-Z]\b/g) || []))].filter(n => n !== x)
    const ok = sharers.length ? (/CodeGen\.java|NamingCzar\.java/.test(ov) && /"The rule the rungs keep"/.test(ov) && named.length > 0 && named.every(n => sharers.includes(n))) : /^None[ .]/.test(ov)
    say(ok, x + ': its "Overlaps by file." ' + (sharers.length ? 'names ' + named.join(', ') + ', each sharing a file with it, and the rule' : 'names no rung: ' + ov))
    const missing = sharers.filter(n => !named.includes(n))
    if (missing.length) note(x + ': its "Overlaps by file." does not name ' + missing.join(' and ') + ', which section 4\'s rule gives as sharing a file with it: ' + ov)
  }
  const rerun = /sees? it fail again|re-?run by the skeptic|skeptic re-?runs|run the stage yourself|skeptic rebuilds|re-anchor/i
  for (const x of r.RUNGS) {
    const want = section(x.id)
    say(want !== null && x.section === want, x.id + ': its section is the record\'s section 4 for ' + x.id + ' word for word (' + x.section.length + ' characters)')
    const b = rungBlock(x.id), row = tableRow(x.id)
    say(!!b && !!row && x.slug === row.slug && b.slug === row.slug && x.path === b.worktree && x.path === '/home/user/fortress-' + x.slug.replace(/^rung-/, '') &&
      x.expectedMinutes === row.minutes && x.blurb === b.blurb && JSON.stringify(x.pointsToReport) === JSON.stringify(b.points),
      x.id + ': slug, worktree, ' + x.expectedMinutes + ' minutes, blurb and ' + x.pointsToReport.length + ' points as section 1 gives them')
    const own = b && b.landsOnlyWith !== null ? rungNames(b.landsOnlyWith) : []
    say(JSON.stringify(own) === JSON.stringify(LANDS_ONLY_WITH[x.id]) && JSON.stringify(x.landsOnlyWith || []) === JSON.stringify(own), x.id + ': lands only with [' + own.join(', ') + '], as its block in section 1 gives it')
    say(!!b && b.section === heading(x.id) && x.title === heading(x.id).slice(3) && !!row.title, x.id + ': its section field and title are its section 4 heading; the table\'s short name: ' + row.title)
    const l = lists && lists[x.id]
    say(!!l && JSON.stringify(x.briefing) === JSON.stringify(l.briefing) && JSON.stringify(x.checks) === JSON.stringify(l.checks) &&
      JSON.stringify(x.reasons) === JSON.stringify(l.reasons.map(asAscii)), x.id + ': briefing ' + x.briefing.length + ' keys, reasons ' + x.reasons.length + ', checks ' + x.checks.length + ', as lists33.py has them')
    say(x.checks.every(k => x.briefing.includes(k)), x.id + ': checks a sub-list of the briefing')
    say(x.branch === 'wip/' + x.slug && /^\/home\/user\/fortress-[a-z0-9-]+$/.test(x.path) && x.expectedMinutes > 0 && !fs.existsSync(x.path), x.id + ': ' + x.path + ' on ' + x.branch + ', ' + x.expectedMinutes + ' minutes; the worktree does not exist yet')
    say(Array.isArray(x.pointsToReport) && x.pointsToReport.length > 0 && x.pointsToReport.every(p => typeof p === 'string' && p.trim()), x.id + ': ' + x.pointsToReport.length + ' points to report')
    const texts = [x.title, x.blurb].concat(x.pointsToReport, x.reasons, x.briefing)
    const kept = nonAscii(x.section, '')
    say(!texts.concat([x.section]).some(t => /`/.test(t)) && !texts.some(t => nonAscii(t).length) && !nonAscii(x.section, KEPT).length,
      x.id + ': no backtick, and no character outside ASCII' + (kept.length ? ' but the section\'s ' + kept.length + ' kept from the record (' + [...new Set(kept)].map(c => 'U+' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ') + ')' : ''))
    say(!texts.concat([x.section]).some(t => rerun.test(t)), x.id + ': nothing asks a skeptic to see a failure again, rebuild, re-run or re-anchor')
    // As tools/workflow-scenarios.js refuses every brief that names one (climb-batch-workflow.md, "The brief"; "No skill text").
    const skillPath = /revival-changes\.md|\.claude\/skills\//
    const named = texts.concat([x.section]).filter(t => skillPath.test(t)).map(t => { const i = t.search(skillPath); return '"' + t.slice(Math.max(0, i - 60), i + 40).replace(/\n/g, ' ') + '"' })
    say(!named.length, x.id + ': no string the agents read names a path under .claude/skills/ or revival-changes.md, which the scenario checker refuses' + (named.length ? '; the record\'s ' + named.join(' | ') : ''))
    say(!texts.concat([x.section]).some(t => /Pavol/.test(t)), x.id + ': no string the agents read names the curator by name, which the scenario checker refuses')
    say(x.testIsStage === STAGE_RUNGS.includes(x.id), x.id + ': its test is the stage: ' + x.testIsStage + ', a test first')
    const speed = /speed pass|pass for speed/
    // The section's paragraph "The stages.", at the start of a line, apart from a numbered step of that name (S has both).
    const stages = /^\*\*The stages\.\*\* ([^\n]*)/m.exec(x.section)
    if (STAGES_RUNGS.includes(x.id)) {
      const step = /^([0-9]+)\. \*\*The stages\.?\*\*[ .]([^\n]*)$/m.exec(x.section)
      say(!!step && /once on your final tree/.test(step[2]) && !!stages && /^Both, once/.test(stages[1]) && !/run neither/.test(x.section) && !/STAGE_BLIND/.test(x.section),
        x.id + ': its section names the two stages in a step it runs once on its final tree' + (step ? ' (its step ' + step[1] + ')' : '') + ', and "The stages." says ' + (stages ? '"' + stages[1].slice(0, 40) + '"' : 'nothing'))
    } else say(!!stages && /^None[.:]/.test(stages[1]) && /STAGE_BLIND/.test(stages[1]) && !/count stage/.test(x.section) && !/distance stage(?!'s shadow patch)/.test(x.section) && !/^[0-9]+\. \*\*The stages/m.test(x.section),
      x.id + ': its section says it runs neither stage and lists its files (STAGE_BLIND)')
    say(/shadow.patch/.test(x.section) === SHADOW_RUNGS.includes(x.id), x.id + ': its section ' + (SHADOW_RUNGS.includes(x.id) ? 'runs' : 'does not name') + ' the distance stage\'s shadow patch' + (SHADOW_RUNGS.includes(x.id) ? ', once' : ''))
    if (TIMED_RUNGS.includes(x.id)) say(/^[0-9]+\. \*\*The stages\*\* once on your final tree, and the checker's timing before and after \(P-148\)\.$/m.test(x.section) && !speed.test(x.section),
      x.id + ': its section names the checker\'s timing before and after (P-148) with the stages, for its checker edit, and no pass for speed')
    else say(!/P-148/.test(x.section) && !speed.test(x.section), x.id + ': a rung outside the checker\'s timing, its section names no pass for speed and no P-148')
    // The record's section 1: the rung's briefing bullets, key by key, and their counts; its one forks key stands whole.
    const bk = b ? b.keys : []
    const fi = bk.findIndex(k => k.key === FORKS_KEY)
    say(fi >= 0 && bk.filter(k => k.key === FORKS_KEY).length === 1 && x.briefing.filter(k => k === FORKS_KEY).length === 1 && x.checks.includes(FORKS_KEY) === bk[fi].check,
      x.id + ': the record\'s briefing names the forks once, ' + (fi >= 0 && bk[fi].check ? 'as a check' : 'not as a check') + ', and the block holds that key whole, ' + FORKS_HEAD)
    const wantKeys = bk
    say(!!b && !!b.counts && b.counts[0] === bk.length && b.counts[1] === bk.filter(k => k.check).length && x.briefing.length === wantKeys.length && x.checks.length === b.counts[1],
      x.id + ': the record\'s briefing gives ' + (b && b.counts ? b.counts[0] + ' keys and ' + b.counts[1] + ' checks' : 'no counts') + ', lists ' + bk.length + ' and marks ' + bk.filter(k => k.check).length + ' (check); lists33.py ' + x.briefing.length + ' and ' + x.checks.length)
    const lc = (t) => t.charAt(0).toLowerCase() + t.slice(1)
    const diff = []
    if (bk.some(k => k.bad)) diff.push('unread bullets: ' + bk.filter(k => k.bad).map(k => k.bad.slice(0, 80)).join(' | '))
    if (JSON.stringify(wantKeys.map(k => k.key)) !== JSON.stringify(x.briefing)) diff.push('the keys differ: ' + x.briefing.filter((k, i) => !wantKeys[i] || wantKeys[i].key !== k).map(k => k.slice(0, 80)).join(' | '))
    if (JSON.stringify(wantKeys.filter(k => k.check).map(k => k.key)) !== JSON.stringify(x.checks)) diff.push('the checks differ')
    wantKeys.forEach((k, i) => {
      const got = x.reasons[i]
      if (got === undefined || k.bad) return
      if (lc(asAscii(k.reason)) !== lc(got)) diff.push(k.key.slice(0, 60) + ' -> ' + got)
    })
    const fixed = bk.filter(k => k.recKey && k.recKey !== k.key)
    say(!!b && !diff.length, x.id + ': every key, its (check) mark and its reason are the record\'s, in its order' + (fixed.length ? ', ' + fixed.length + ' key read through KEY_FIXES (' + fixed.map(k => k.key).join(' | ') + ')' : '') + (diff.length ? '; ' + diff.join('; ') : ''))
  }
  say(!/[^\x00-\x7f]|`/.test(r.BATCH_INTRO) && !rerun.test(r.BATCH_INTRO) && !/revival-changes\.md|\.claude\/skills\/|Pavol/.test(r.BATCH_INTRO), 'the intro: ASCII, no backtick, no re-run, no skill path, no name')
  const introSentences = r.BATCH_INTRO.split(/(?<=[.;])\s+|\n+/)
  say(introSentences.filter(t => /P-148|speed pass|pass for speed/.test(t)).length === 0, 'the intro names no P-148 and no pass for speed')
  // The atomic runs: unchanged, 24 programs, as the record's gate section gives them, in the spliced script's two lists.
  const listOf = (name) => { const l = s.ls.find(l => l.startsWith('const ' + name + ' = ')); const m = l && /= '([^']*)'/.exec(l); return m ? m[1].split(' ').filter(Boolean) : [] }
  const atomicCompiler = listOf('ATOMIC_COMPILER'), atomicOther = listOf('ATOMIC_OTHER')
  const programs = atomicCompiler.length + atomicOther.length
  const gateSec = (() => { const a = rec.indexOf('\n### The gate, and what it should show\n'); if (a < 0) return ''; const rest = rec.slice(a + 1); const e = rest.search(/\n#{1,3} /); return e < 0 ? rest : rest.slice(0, e) })()
  say(/^- The atomic runs: unchanged, 24 programs, each three times `PASS`\.$/m.test(gateSec) && new Set(atomicCompiler.concat(atomicOther)).size === programs && programs === 24,
    'the atomic runs unchanged, as the record\'s gate section gives them: the spliced script\'s two lists hold ' + programs + ' programs')
  const atomicLine = s.ls.find(l => l.includes('Run atomic_runs ')) || ''
  say(atomicLine.includes("(3 * (ATOMIC_COMPILER + ' ' + ATOMIC_OTHER).split(' ').length) + ' lines."), 'the gate role counts the atomic runs\' lines from the two lists, three for each program: ' + 3 * programs + ' here')
  // S's track and the gate's comparand (section 6, "The generator" and "The gate, and what it should show").
  {
    const sh = (cmd) => cp.spawnSync('bash', ['-c', cmd], { encoding: 'utf8', cwd: ROOT, env: Object.assign({}, process.env, { FORTRESS_HOME: ROOT }) })
    const gf = 'explorations/coordinator/tools/gate-functions.sh'
    const last = sh('source ' + gf + ' && last_landed_summary').stdout.trim()
    const wantDir = RUN === '1' ? 'climb-batch-31b' : 'climb-batch-33'
    const named = RUN === '1' ? /^The comparands for run 1 are climb batch 31b's, in `compile-ladder\/climb-batch-31b\/gate\/`: 63 suites, 3,515 tests, `CompilerJUTest` 1,694, the system shards 871, 24 atomic programs in 72 runs, the count 0 and the distance 0 with `#crash none`\.$/m.test(gateSec)
      : /^- For run 2 the comparands are run 1's gate\.$/m.test(gateSec)
    say(named && last === 'explorations/compile-ladder/' + wantDir + '/gate/summary.txt',
      'the gate\'s comparand: the record names ' + wantDir + '\'s gate for run ' + RUN + ', and last_landed_summary, which the gate role compares with, names ' + (last || 'nothing'))
    if (RUN === '1' && fs.existsSync(path.join(ROOT, last))) {
      const sum = fs.readFileSync(path.join(ROOT, last), 'utf8').split('\n').map(l => l.split('\t')).filter(f => f.length === 5 && !f[0].startsWith('#'))
      const total = sum.reduce((a, f) => a + +f[1], 0), cjt = sum.filter(f => f[0] === 'fast-compiler/CompilerJUTest').reduce((a, f) => a + +f[1], 0)
      const sys = sum.filter(f => /^system-[0-9]+\//.test(f[0])).reduce((a, f) => a + +f[1], 0)
      const atomic = fs.readFileSync(path.join(ROOT, last), 'utf8').split('\n').filter(l => /^# atomic .* PASS$/.test(l)).length
      say(sum.length === 63 && total === 3515 && cjt === 1694 && sys === 871 && atomic === 72, 'the comparand\'s figures as the record gives them: ' + sum.length + ' suites, ' + total + ' tests, CompilerJUTest ' + cjt + ', the system shards ' + sys + ', ' + atomic + ' atomic runs PASS')
    }
    say(/^- `testFast`: [^\n]*; and one new suite, S's track, with its two compile tests and its expected failure\. In run 2, S's track gains R's, W's and G's compile tests and W's and G's run tests as expected failures\.$/m.test(gateSec) &&
      /`ProjectFortress\/one_library_tests\/`/.test(rec) && /^7\. \*\*S4\. The selector's track is a new test folder run by a new ant target inside `testFast`, so the gate runs it\.\*\*/m.test(rec),
      'S\'s track named in the record\'s gate section as testFast\'s one new suite, its folder in S\'s section and fork S4 putting its target inside testFast')
    const gateText = (s.ls.find(l => l.includes('A suite that is new in the summary is not red by itself.')) || '')
    const tmpA = path.join(HERE, 'gate-comparand-' + BATCH_NAME + '.txt'), tmpB = path.join(HERE, 'gate-with-track-' + BATCH_NAME + '.txt')
    let ok = false, said = ''
    if (fs.existsSync(path.join(ROOT, last))) {
      const base = fs.readFileSync(path.join(ROOT, last), 'utf8')
      fs.writeFileSync(tmpA, base)
      fs.writeFileSync(tmpB, base.replace(/^(fast-compiler\/CompilerJUTest\t[^\n]*\n)/m, '$1fast-one-library/OneLibraryJUTest\t3\t0\t0\t0\n'))
      const g = sh('source ' + gf + ' && gate_compare ' + JSON.stringify(tmpA) + ' ' + JSON.stringify(tmpB))
      ok = g.status === 0 && !g.stdout.trim()
      said = 'exit ' + g.status + (g.stdout.trim() ? ', ' + g.stdout.trim().slice(0, 200) : ', no line')
    }
    say(!!gateText && ok, 'gate_compare on the comparand and on the comparand with one new suite in testFast, as S\'s track will be: ' + said + '; the gate role says a new suite is not red by itself')
  }
  if (RUN === '1') {
    say(/^This run is climb batch 33, the first of the two runs of the record CLIMB-BATCH-33\.md/.test(r.BATCH_INTRO) && RUN_IDS.every(x => new RegExp('^- ' + x + ', ', 'm').test(r.BATCH_INTRO)) && !/Run 2|climb batch 33b/.test(r.BATCH_INTRO),
      'the intro: run 1 of the record, its rungs, nothing of run 2')
    say(/V, Q and I share CodeGen\.java by declaration: each keeps to its own, as its section says\./.test(r.BATCH_INTRO) && /The gather applies the rungs in the script's order, expected S, D, V, Q, I, C, and builds the specification once\./.test(r.BATCH_INTRO),
      'the intro: V, Q and I share CodeGen.java by declaration; the gather applies the rungs in the script\'s order, S, D, V, Q, I, C')
  } else {
    say(/^This run is climb batch 33b, the second of the two runs of the record CLIMB-BATCH-33\.md/.test(r.BATCH_INTRO) && RUN_IDS.every(x => new RegExp('^- ' + x + ', ', 'm').test(r.BATCH_INTRO)),
      'the intro: run 2 of the record, its rungs')
    say(/N and R run the count stage and the distance stage once; W and G run neither\./.test(r.BATCH_INTRO) && /The gather applies N, W, G, then R/.test(r.BATCH_INTRO),
      'the intro: N and R run the two stages once, W and G neither; the gather applies N, W, G, then R')
  }
  const paths = r.RUNGS.map(x => x.path), slugs = r.RUNGS.map(x => x.slug)
  say(new Set(paths).size === paths.length && new Set(slugs).size === slugs.length, 'every rung has its own worktree and branch')
  say(!/[^\x00-\x7f]/.test(spliced) && !/[^\x00-\x7f]/.test(block), 'the block and the spliced script hold no character outside ASCII: the kept ones are \\u escapes')
  say(!rec.includes('const RUNGS') && !rec.includes('_ENTRY = {') && rec.includes('compile-ladder/plan-33/manifest/'), 'the record names the generator\'s folder, compile-ladder/plan-33/manifest/, and holds no copy of the block')
}

const same = current === block
console.log((same ? 'the tracked script\'s block equals the generated one' : 'the tracked script\'s block differs from the generated one') + (WRITE ? '' : '; --write splices it'))
if (WRITE) {
  if (bad) console.log('not written: ' + bad + ' problem(s)')
  else if (same) console.log('nothing to write')
  else { fs.writeFileSync(SRC, spliced); console.log('wrote the block into ' + path.relative(ROOT, SRC)) }
}
console.log('problems: ' + bad)
process.exitCode = bad ? 1 : 0
