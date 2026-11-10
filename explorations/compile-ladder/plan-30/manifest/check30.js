// check30.js for climb batch 30, made from plan-29b/manifest/check29b.js.
// Checks the MANIFEST block of one run of climb batch 30 (gen30.py --run's output, $OUT30/manifest30.js for run 1 or
// manifest30b.js for run 2) spliced into a scratch copy of the workflow script, $OUT30/wf-spliced-30.js or
// wf-spliced-30b.js, and with --write splices it into the tracked script. As check29b.js: node --check on the
// original and the spliced copy; both parsed as the body of an async function, as the Workflow harness parses them,
// their export made const; every line outside the block byte-identical; the block evaluated with the script's own
// load checks and scatter order; the run's rungs (lists30.py's RUNS, in that order, less any that --without names),
// their fields, no rung bringing a gate step, landing only with another, or declaring a checker count, a crash or a
// ladder move; each section equal to the rung's section of the record (backticks dropped, the ellipsis character as
// three full stops, the minus sign as a hyphen-minus); briefing, reasons and checks equal to lists30.py's, one
// reason per key, checks a sub-list of the briefing; no rung's test the stage; no backtick in any string the agents
// read; no text asking a skeptic to see a failure again or a stage re-run without a code change (the coordinator
// skill's references/batch.md, "The workflow"); no LEDGER_FROM; the record holding no copy of the block; the slug,
// path, expected minutes, blurb and points of each rung against section 1; no string the agents read, nor the
// spliced script, holding a character outside ASCII; the briefings against section 1's bullets key by key, each key
// in order, its (check) mark and its reason (its first letter either case), and the bullet's counts; no string the
// agents read naming a path under .claude/skills/ or revival-changes.md, which tools/workflow-scenarios.js refuses in
// every brief.
// Changed from check29b.js: --run 1|2 chooses the run, as check21.js did: run 1 is BATCH 30, rungs N, P, X; run 2 is
// BATCH 30b, rungs Y, C; both of the record CLIMB-BATCH-30.md and the lists lists30.py, under $OUT30. Section 1's
// table has a run column, checked against lists30.py's RUNS; a table title is the rung's short name, and the
// block's title is the section 4 heading. The common fields are the "Fields common to the five rungs": no rung lands
// only with another, and the gate's none but the specification's build at the gather of each run. The abbreviations
// of a key are REC, PAR, REV, SNAP and SPEC, read from section 1's opening paragraph. The forks: the record's one
// forks key, REC "Forks the batch takes", in each briefing once and whole, with its (check) mark as section 1 gives
// it. Section 4's rule: in run 1 N shares no file with P or X, and P and X share CodeGen.java and BaseTask.java by
// declaration, each section's "Overlaps by file." saying so, and the gather applies N, then P, then X; in run 2 Y
// and C share CodeGen.java only, and the gather applies Y, then C. The stages (section 1's common fields; section 6,
// "The generator"): P and C name the count stage and the distance stage in a step of their sections, "once on your
// final tree", C with P-148's runs; N, X and Y open "The stages." with "None", list their files (STAGE_BLIND) and
// name neither stage nor P-148. The intro is the run's part of section 6's "What every agent reads first": it names
// the run's batch, says which rung runs the two stages and which run neither, and how many new programs the gate's
// atomic runs hold. The script's two lists of atomic programs hold the names that section 2, "The atomic runs",
// gives for this run and the run before it, and the gate role's count of their lines is three for each program.
// The script's paths built from the batch's name (BATCH_DIR climb-batch-30 or climb-batch-30b, GATE_DIR, LOG_DIR,
// GATE_OUT, SPEC_PDF) take the name whole, and every other use of BATCH after the block is a concatenation or a
// field, never a number; the record and the lists the block names are on disk. Its last lines say whether the
// tracked script's block equals the generated one, and count the problems; it exits 1 on any, and --write then
// writes nothing.
//   node check30.js --run 1|2 [--without <rung>]... [--write] [RECORD]   RECORD defaults to explorations/coordinator/CLIMB-BATCH-30.md
// --without <rung> checks the block that gen30.py writes with the same argument: the run's rungs less that one.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || path.resolve(__dirname, '../../../..')
const HERE = process.env.OUT30 || path.join(ROOT, 'tmp')
const SRC = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const argv = process.argv.slice(2)
const WRITE = argv.includes('--write')
const WITHOUT = argv.map((a, i) => argv[i - 1] === '--without' ? a : null).filter(a => a !== null)
const RUN = argv[argv.indexOf('--run') + 1]
if (!argv.includes('--run') || !['1', '2'].includes(RUN)) { console.log('usage: node check30.js --run 1|2 [--without <rung>]... [--write] [RECORD]'); process.exit(2) }
const BATCH_NAME = { 1: '30', 2: '30b' }[RUN]
const RECORD_PATH = 'explorations/coordinator/CLIMB-BATCH-30.md'
const LISTS_PATH = 'explorations/compile-ladder/plan-30/manifest/lists30.py'
const idsPy = cp.spawnSync('python3', ['-B', '-c', 'import json, sys; sys.path.insert(0, sys.argv[1]); from lists30 import IDS, RUNS; print(json.dumps({"ids": IDS, "runs": RUNS}))', __dirname], { encoding: 'utf8' })
if (idsPy.status !== 0) { console.log('lists30.py not read: ' + idsPy.stderr.trim().slice(0, 300)); process.exit(2) }
const ALL_IDS = JSON.parse(idsPy.stdout).ids
const RUNS = JSON.parse(idsPy.stdout).runs
const THIS_RUN = RUNS[RUN]
const RUN_IDS = THIS_RUN.filter(x => !WITHOUT.includes(x))
if (WITHOUT.some(x => !THIS_RUN.includes(x))) { console.log('--without names a rung not in the run'); process.exit(2) }
const STAGE_RUNGS = []
// The rungs that run the count stage and the distance stage once on their final trees (section 1's common fields):
// P, which edits the one library, and C, which edits the parser and the checker, with P-148's runs for its checker
// edit. N, X and Y run neither and list their files.
const STAGES_RUNGS = ['P', 'C']
const TIMED_RUNGS = ['C']
// The characters outside ASCII that a section keeps from the record, as gen30.py's KEPT: none.
const KEPT = ''
const nonAscii = (t, keep) => [...t].filter(c => c.charCodeAt(0) > 127 && !(keep || '').includes(c))
// No rung lands only with another (section 1's common fields: "lands only with: none").
const LANDS_ONLY_WITH = Object.fromEntries(ALL_IDS.map(x => [x, []]))
const REC = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--without' && argv[i - 1] !== '--run')[0] || path.join(ROOT, RECORD_PATH)
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

// The paths and names the script builds from the batch's name, evaluated from its own lines with the block's BATCH:
// each takes the name whole, 30 or 30b, as 22c's did; BATCH is only ever concatenated, never read as a number.
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
}

if (r) {
  const ids = r.RUNGS.map(x => x.id).join(', ')
  const order = r.RUNGS.slice().sort((a, b) => b.expectedMinutes - a.expectedMinutes).map(x => x.id).join('')
  console.log('batch ' + r.BATCH + ', rungs ' + ids + ', scatter ' + r.SCATTER.map(x => x.id).join('') + ', intro ' + r.BATCH_INTRO.length + ' characters')
  say(r.BATCH === BATCH_NAME && r.BATCH_RECORD === RECORD_PATH && r.BRIEFING_LISTS === LISTS_PATH && ids === RUN_IDS.join(', ') && r.SCATTER.map(x => x.id).join('') === order, 'batch ' + BATCH_NAME + ', its record and lists, the rungs ' + RUN_IDS.join(', ') + ' and the scatter by expected minutes, ' + order)
  say(fs.existsSync(path.join(ROOT, r.BATCH_RECORD)) && fs.existsSync(path.join(ROOT, r.BRIEFING_LISTS)), 'the record and the lists the block names are on disk: ' + r.BATCH_RECORD + ', ' + r.BRIEFING_LISTS)
  say(r.ledgerFrom === 'undefined', 'no LEDGER_FROM: the gather numbers the new rows through ledger.py')
  say(r.RUNGS.every(x => Array.isArray(x.gateJoins) && !x.gateJoins.length), 'no rung brings a gate step: testSpecData runs from the last landed summary')
  say(r.RUNGS.every(x => JSON.stringify(x.landsOnlyWith || []) === JSON.stringify(LANDS_ONLY_WITH[x.id])), 'landsOnlyWith as section 1 gives it: ' + r.RUNGS.map(x => x.id + ' [' + (x.landsOnlyWith || []).join(', ') + ']').join(', '))
  say(r.RUNGS.every(x => x.expectedCheckerCrash === undefined && Array.isArray(x.expectedMoves) && !x.expectedMoves.length), 'no rung declares a crash or a ladder move')
  say(r.RUNGS.every(x => x.expectedCheckerCount === undefined), 'no rung declares a checker count: it is reported, never red')

  // The record's section 4, rung by rung, as gen30.py reads it.
  const rec = fs.readFileSync(REC, 'utf8')
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
  for (const m of s1.slice(0, s1.indexOf('\n|')).matchAll(/\b(REC|PAR|REV|SNAP|SPEC|SRC) (?:stands )?for `([^`]+)`/g)) ABBR[m[1]] = m[2]
  say(['REC', 'PAR', 'REV', 'SNAP'].every(k => ABBR[k] && /^doc:[^#]+#$/.test(ABBR[k])) && ABBR.REC === 'doc:' + RECORD_PATH + '#' && ABBR.SPEC === 'doc:Specification/',
    'section 1 spells out REC, PAR, REV, SNAP and SPEC: ' + Object.entries(ABBR).map(([k, v]) => k + ' ' + v).join(', '))
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
      const k = /^(`[^`]+`|(REC|PAR|REV|SNAP|SPEC) `([^`]+)`|ledger:[0-9]+|[PF]-[0-9]+)( \(check\))?: (.*)$/.exec(it)
      if (!k || (k[2] && !ABBR[k[2]])) return { bad: it }
      const key = k[2] ? ABBR[k[2]] + k[3] : k[1].replace(/`/g, '')
      return { key, check: !!k[4], reason: k[5] }
    }) : []
    return { slug: field('slug'), worktree: field('worktree'), section: field('section'), blurb: field('blurb'), landsOnlyWith: field('lands only with'),
      points: pts ? pts.items.map(p => asAscii(p.trim())) : [], counts: cm ? [+cm[1], +cm[2]] : null, keys }
  }
  const common = (() => { const a = s1.indexOf('\nFields common to the five rungs:\n'); return a < 0 ? '' : s1.slice(a, s1.indexOf('\n### ', a)) })()
  say(/\*\*writes state:\*\* no\./.test(common) && /\*\*its test is the stage:\*\* no\./.test(common) && /\*\*joins the gate:\*\* none, but the specification's build at the gather of each run, for N's and C's text\./.test(common) &&
    /\*\*expected moves:\*\* none\./.test(common) && /\*\*expected checker count:\*\* none declared/.test(common) && /\*\*expected checker crash:\*\* none\./.test(common) &&
    /^- \*\*lands only with:\*\* none\. In each run every rung lands on its own\./m.test(common) &&
    /\*\*the stages:\*\* P and C run the count stage and the distance stage once on their final trees, [^\n]*N, X and Y run neither and list their files \(`STAGE_BLIND`\)\./.test(common),
    'the record\'s fields common to the five rungs: no state, no stage as the test, no gate step (the specification\'s build at the gather of each run), no move, no count or crash declared, no rung landing only with another, P and C running the two stages')
  say(ALL_IDS.every(x => { const t = tableRow(x); return t && RUNS[t.run].includes(x) }), 'section 1\'s table gives each rung its run as lists30.py has it: ' + ALL_IDS.map(x => x + ' in run ' + (tableRow(x) || {}).run).join(', '))
  // lists30.py's briefings, reasons and checks, for the rungs of the block.
  const py = cp.spawnSync('python3', ['-B', '-c', 'import json, sys; sys.path.insert(0, sys.argv[1]); from lists30 import lists; ' +
    'L, R = lists(tuple(sys.argv[2].split(","))); print(json.dumps({r: {"briefing": L[r][0], "checks": L[r][1], "reasons": [x for _, x in R[r]]} for r in L}))', __dirname, RUN_IDS.join(',')], { encoding: 'utf8' })
  const lists = py.status === 0 ? JSON.parse(py.stdout) : null
  say(!!lists, 'lists30.py read' + (lists ? '' : ': ' + py.stderr.trim().slice(0, 300)))
  // Section 3's forks: the record's one forks key, whole, for every rung; a numbered list led by each fork's label.
  const FORKS_HEAD = 'Forks the batch takes'
  const FORKS_KEY = REC_KEY + FORKS_HEAD
  const fs3 = (() => { const a = rec.indexOf('\n### ' + FORKS_HEAD + '\n'); if (a < 0) return ''; const rest = rec.slice(a + 1); const e = rest.search(/\n#{1,3} /); return e < 0 ? rest : rest.slice(0, e) })()
  const leadOf = (l) => { const t = l.replace(/^[0-9]+\. /, ''); if (!t.startsWith('**')) return null; const c = t.indexOf('**', 2); return c > 2 ? t.slice(2, c) : null }
  const leads = fs3.split('\n').map(leadOf).filter(Boolean)
  const labels = leads.map(l => (/^([A-Z][0-9]+)\. /.exec(l) || [])[1]).filter(Boolean)
  say(!!fs3 && labels.length === leads.length && labels.length > 0 && ALL_IDS.every(x => labels.some(l => l.startsWith(x))), 'section 3\'s "' + FORKS_HEAD + '": ' + leads.length + ' forks led by their labels, ' + labels.join(', ') + ', some for every rung; every rung reads the record\'s one forks key whole')
  // Section 4's rule, and each section's "Overlaps by file.", for this run.
  const rule = (() => { const a = s4.indexOf('\n### The rule the rungs keep'); return a < 0 ? '' : s4.slice(a) })()
  const overlaps = (id) => (/\*\*Overlaps by file\.\*\* ([^\n]*)/.exec(section(id) || '') || [, ''])[1]
  if (RUN === '1') {
    say(/^- \*\*Run 1\.\*\* N shares no file with P or X\. P and X share two files, by declaration:$/m.test(rule) && /^  - `compiler\/codegen\/CodeGen\.java`: P has /m.test(rule) && /^  - `runtimeSystem\/BaseTask\.java`: P has /m.test(rule) && /^  - The gather applies N, then P, then X: /m.test(rule),
      'section 4\'s rule for run 1: N shares no file with P or X; P and X share CodeGen.java and BaseTask.java by declaration; the gather applies N, then P, then X, by the lowest edited line in a shared file')
    say(/^None with P or X\.$/.test(overlaps('N')) && /^X edits CodeGen\.java and BaseTask\.java too: "The rule the rungs keep"\.$/.test(overlaps('P')) && /^P edits CodeGen\.java and BaseTask\.java too: "The rule the rungs keep"\.$/.test(overlaps('X')),
      'each section\'s "Overlaps by file.": N none with P or X; P and X each name the two shared files and the rule')
  } else {
    say(/^- \*\*Run 2\.\*\* Y and C share `CodeGen\.java` only, [^\n]* The gather applies Y, then C, /m.test(rule), 'section 4\'s rule for run 2: Y and C share CodeGen.java only; the gather applies Y, then C')
    say(/^C edits CodeGen\.java in its numeral sites/.test(overlaps('Y')) && /^Y edits CodeGen\.java outside the numeral sites\.$/.test(overlaps('C')), 'each section\'s "Overlaps by file.": Y and C each name CodeGen.java and the other\'s part')
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
      JSON.stringify(x.reasons) === JSON.stringify(l.reasons.map(asAscii)), x.id + ': briefing ' + x.briefing.length + ' keys, reasons ' + x.reasons.length + ', checks ' + x.checks.length + ', as lists30.py has them')
    say(x.checks.every(k => x.briefing.includes(k)), x.id + ': checks a sub-list of the briefing')
    say(x.branch === 'wip/' + x.slug && /^\/home\/user\/fortress-[a-z0-9-]+$/.test(x.path) && x.expectedMinutes > 0, x.id + ': ' + x.path + ' on ' + x.branch + ', ' + x.expectedMinutes + ' minutes')
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
    say(x.testIsStage === STAGE_RUNGS.includes(x.id), x.id + ': its test is the stage: ' + x.testIsStage + (STAGE_RUNGS.includes(x.id) ? ', its every edit is library text that only the checker reads differently' : ', a test first'))
    const speed = /speed pass|pass for speed/
    const stages = /\*\*The stages\.\*\* ([^\n]*)/.exec(x.section)
    if (STAGES_RUNGS.includes(x.id)) {
      const step = /^([0-9]+)\. \*\*The stages(?: and the timing)?,\*\* once on your final tree: ([^\n]*)$/m.exec(x.section)
      say(!!step && /the count stage and the distance stage/.test(step[2]) && !stages && !/run neither/.test(x.section),
        x.id + ': its section names the count stage and the distance stage as stages it runs once on its final tree' + (step ? ' (its step ' + step[1] + ')' : ''))
    } else say(!!stages && /^None[.:]/.test(stages[1]) && /STAGE_BLIND/.test(x.section) && !/count stage|distance stage/.test(x.section), x.id + ': its section says it runs neither stage and lists its files (STAGE_BLIND)')
    if (TIMED_RUNGS.includes(x.id)) say(/\*\*The stages and the timing,\*\* once on your final tree: [^\n]*P-148's runs\./.test(x.section) && !speed.test(x.section),
      x.id + ': its section names P-148\'s runs with the stages, for its checker edit, and no pass for speed')
    else say(!/P-148/.test(x.section) && !speed.test(x.section), x.id + ': a rung outside the checker\'s timing, its section names no pass for speed and no P-148')
    // The record's section 1: the rung's briefing bullets, key by key, and their counts; its one forks key stands whole.
    const bk = b ? b.keys : []
    const fi = bk.findIndex(k => k.key === FORKS_KEY)
    say(fi >= 0 && bk.filter(k => k.key === FORKS_KEY).length === 1 && x.briefing.filter(k => k === FORKS_KEY).length === 1 && x.checks.includes(FORKS_KEY) === bk[fi].check,
      x.id + ': the record\'s briefing names the forks once, ' + (fi >= 0 && bk[fi].check ? 'as a check' : 'not as a check') + ', and the block holds that key whole, ' + FORKS_HEAD)
    const wantKeys = bk
    say(!!b && !!b.counts && b.counts[0] === bk.length && b.counts[1] === bk.filter(k => k.check).length && x.briefing.length === wantKeys.length && x.checks.length === b.counts[1],
      x.id + ': the record\'s briefing gives ' + (b && b.counts ? b.counts[0] + ' keys and ' + b.counts[1] + ' checks' : 'no counts') + ', lists ' + bk.length + ' and marks ' + bk.filter(k => k.check).length + ' (check); lists30.py ' + x.briefing.length + ' and ' + x.checks.length)
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
    say(!!b && !diff.length, x.id + ': every key, its (check) mark and its reason are the record\'s, in its order' + (diff.length ? '; ' + diff.join('; ') : ''))
  }
  say(!/[^\x00-\x7f]|`/.test(r.BATCH_INTRO) && !rerun.test(r.BATCH_INTRO) && !/revival-changes\.md|\.claude\/skills\//.test(r.BATCH_INTRO), 'the intro: ASCII, no backtick, no re-run, no skill path')
  const introSentences = r.BATCH_INTRO.split(/(?<=[.;])\s+|\n+/)
  // Section 2's "The atomic runs": the names each run adds, and the script's two lists, which the gate role reads.
  const atomicText = (() => { const a = rec.indexOf('\n### The atomic runs\n'); if (a < 0) return ''; const rest = rec.slice(a + 1); const e = rest.search(/\n#{1,3} /); return e < 0 ? rest : rest.slice(0, e) })()
  const atomicOf = (n) => { const m = new RegExp('^- \\*\\*Run ' + n + ':\\*\\* ([^\\n]*)$', 'm').exec(atomicText); return m ? [...m[1].matchAll(/`([A-Za-z0-9]+)`/g)].map(k => k[1]) : [] }
  const NEW_ATOMIC = { 1: atomicOf(1), 2: atomicOf(2) }
  const listOf = (name) => { const l = s.ls.find(l => l.startsWith('const ' + name + ' = ')); const m = l && /= '([^']*)'/.exec(l); return m ? m[1].split(' ').filter(Boolean) : [] }
  const atomicCompiler = listOf('ATOMIC_COMPILER'), atomicOther = listOf('ATOMIC_OTHER')
  const wantAtomic = RUN === '1' ? NEW_ATOMIC[1] : NEW_ATOMIC[1].concat(NEW_ATOMIC[2])
  const notYet = RUN === '1' ? NEW_ATOMIC[2].filter(n => atomicCompiler.includes(n)) : []
  const programs = atomicCompiler.length + atomicOther.length
  const words = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']
  say(NEW_ATOMIC[1].length === 8 && NEW_ATOMIC[2].length === 3 && wantAtomic.every(n => atomicCompiler.includes(n)) && !notYet.length && new Set(atomicCompiler.concat(atomicOther)).size === programs && programs === 14 + wantAtomic.length,
    'the script\'s atomic lists hold the ' + wantAtomic.length + ' programs that section 2, "The atomic runs", names up to this run, among ' + programs + ' programs' + (wantAtomic.filter(n => !atomicCompiler.includes(n)).length ? '; missing: ' + wantAtomic.filter(n => !atomicCompiler.includes(n)).join(', ') : '') + (notYet.length ? '; run 2\'s before its run: ' + notYet.join(', ') : ''))
  const atomicLine = s.ls.find(l => l.includes('Run atomic_runs ')) || ''
  say(atomicLine.includes("(3 * (ATOMIC_COMPILER + ' ' + ATOMIC_OTHER).split(' ').length) + ' lines."), 'the gate role counts the atomic runs\' lines from the two lists, three for each program: ' + 3 * programs + ' here')
  say(introSentences.filter(t => /P-148|speed pass|pass for speed/.test(t)).length === 0, 'the intro names no P-148 and no pass for speed')
  if (RUN === '1') {
    say(/^This run is climb batch 30, the first of the two runs of the record CLIMB-BATCH-30\.md/.test(r.BATCH_INTRO) && /^- N, /m.test(r.BATCH_INTRO) && /^- P, /m.test(r.BATCH_INTRO) && /^- X, /m.test(r.BATCH_INTRO) && !/Run 2|climb batch 30b/.test(r.BATCH_INTRO),
      'the intro: run 1 of the record, its three rungs, nothing of run 2')
    say(/P runs the count stage and the distance stage once on its final tree; N and X run neither\./.test(r.BATCH_INTRO) && /The gather applies N, P, then X/.test(r.BATCH_INTRO),
      'the intro: P runs the two stages once on its final tree, N and X run neither; the gather applies N, P, then X')
  } else {
    say(/^This run is climb batch 30b, the second of the two runs of the record CLIMB-BATCH-30\.md/.test(r.BATCH_INTRO) && /^- Y, /m.test(r.BATCH_INTRO) && /^- C, /m.test(r.BATCH_INTRO),
      'the intro: run 2 of the record, its two rungs')
    say(/C runs the count stage and the distance stage once on its final tree, with the checker's timing; Y runs neither\./.test(r.BATCH_INTRO) && /The gather applies Y, then C/.test(r.BATCH_INTRO),
      'the intro: C runs the two stages once on its final tree, Y runs neither; the gather applies Y, then C')
  }
  say(new RegExp("The gate's atomic runs hold " + words[NEW_ATOMIC[RUN].length] + (RUN === '1' ? ' new programs\\.' : ' more programs\\.')).test(r.BATCH_INTRO), 'the intro: the gate\'s atomic runs hold ' + words[NEW_ATOMIC[RUN].length] + ' new programs, as section 2 names them')
  const paths = r.RUNGS.map(x => x.path), slugs = r.RUNGS.map(x => x.slug)
  say(new Set(paths).size === paths.length && new Set(slugs).size === slugs.length, 'every rung has its own worktree and branch')
  say(!/[^\x00-\x7f]/.test(spliced) && !/[^\x00-\x7f]/.test(block), 'the block and the spliced script hold no character outside ASCII: the kept ones are \\u escapes')
  say(!rec.includes('const RUNGS') && !rec.includes('_ENTRY = {') && rec.includes('compile-ladder/plan-30/manifest/'), 'the record names the generator\'s folder, compile-ladder/plan-30/manifest/, and holds no copy of the block')
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
