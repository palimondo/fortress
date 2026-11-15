// check32.js for climb batch 32, made from plan-31/manifest/check31.js.
// Checks the MANIFEST block of climb batch 32 (gen32.py's output, $OUT32/manifest32.js) spliced into a scratch copy
// of the workflow script, $OUT32/wf-spliced-32.js, and with --write splices it into the tracked script. As
// check31.js: node --check on the original and the spliced copy; both parsed as the body of an async function, as
// the Workflow harness parses them, their export made const; the block evaluated with the script's own load checks
// and scatter order; the run's rungs (lists32.py's IDS, in that order, less any that --without names), their
// fields, no rung bringing a gate step, landing only with another, or declaring a checker count, a crash or a
// ladder move; each section equal to the rung's section of the record (backticks dropped, the ellipsis character
// as three full stops, the minus sign as a hyphen-minus); briefing, reasons and checks equal to lists32.py's, one
// reason per key, checks a sub-list of the briefing; no rung's test the stage; no backtick in any string the agents
// read; no text asking a skeptic to see a failure again or a stage re-run without a code change (the coordinator
// skill's references/batch.md, "The workflow"); no LEDGER_FROM; the record holding no copy of the block; the slug,
// path, expected minutes, blurb and points of each rung against section 1; no string the agents read, nor the
// spliced script, holding a character outside ASCII; the briefings against section 1's bullets key by key, each
// key in order, its (check) mark and its reason (its first letter either case), and the bullet's counts; no string
// the agents read naming a path under .claude/skills/ or revival-changes.md, which tools/workflow-scenarios.js
// refuses in every brief.
// Changed from check31.js:
// - One run: BATCH 32, rungs P, S, C, F, B, N, D, of the record CLIMB-BATCH-32.md and the lists lists32.py, under
//   $OUT32; no --run. The common fields are the "Fields common to the seven rungs". The abbreviations of a key are
//   REC, REV, PRB, NEQ, MCC, SPEC and SRC.
// - Rungs N and D moved here from climb batch 31's record on 2026-11-15, and --fork-w a|b with them, as check31.js
//   has it: at (b) the record that is checked is the one gen32.py --fork-w b wrote, and the block is
//   manifest32-fork-w-b.js.
// - The atomic runs: this batch adds no program to the gate's atomic runs. The splice changes no line outside the
//   block, and one check says that the spliced script's two atomic lists are the tracked script's.
// - Section 4's rule: P and S share parser/Expression.rats by production, C and N Functionals.scala by declaration,
//   N and F OverloadedFunction.java by member; each of those sections' "Overlaps by file." names the other and the
//   rule; B and D say "None with" the other six.
// - The stages (section 1's common fields; section 6, "The generator"): P, S, C, N and D name the count stage and
//   the distance stage in a step of their sections, "once on your final tree", C, N and D with P-148's runs; F and B
//   open "The stages." with "None" and list their files (STAGE_BLIND), and name neither stage nor P-148. No rung
//   runs the distance stage's shadow patch: F and B edit files under interpreter/ only, and D, which edits
//   CodeGen.java, runs the distance stage itself.
// - The intro is the whole of section 6's "What every agent reads first": it names the batch, says which rungs run
//   the two stages and which run neither, and that the gather applies the rungs in the script's order.
// The script's paths built from the batch's name (BATCH_DIR climb-batch-32, GATE_DIR, LOG_DIR, GATE_OUT, SPEC_PDF)
// take the name whole, and every other use of BATCH after the block is a concatenation or a field, never a number;
// the record and the lists the block names are on disk. Its last lines say whether the tracked script's block
// equals the generated one, and count the problems; it exits 1 on any, and --write then writes nothing.
//   node check32.js [--fork-w a|b] [--without <rung>]... [--write] [RECORD]
// --without <rung> checks the block that gen32.py writes with the same argument: the run's rungs less that one.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || path.resolve(__dirname, '../../../..')
const HERE = process.env.OUT32 || path.join(ROOT, 'tmp')
const SRC = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const argv = process.argv.slice(2)
const WRITE = argv.includes('--write')
const WITHOUT = argv.map((a, i) => argv[i - 1] === '--without' ? a : null).filter(a => a !== null)
const FORK_W = argv.includes('--fork-w') ? argv[argv.indexOf('--fork-w') + 1] : 'a'
if (!['a', 'b'].includes(FORK_W)) { console.log('usage: node check32.js [--fork-w a|b] [--without <rung>]... [--write] [RECORD]'); process.exit(2) }
const BATCH_NAME = '32'
const SUFFIX = FORK_W === 'b' ? '-fork-w-b' : ''
const RECORD_PATH = 'explorations/coordinator/CLIMB-BATCH-32.md'
const LISTS_PATH = 'explorations/compile-ladder/plan-32/manifest/lists32.py'
const idsPy = cp.spawnSync('python3', ['-B', '-c', 'import json, sys; sys.path.insert(0, sys.argv[1]); from lists32 import IDS; print(json.dumps({"ids": IDS}))', __dirname], { encoding: 'utf8' })
if (idsPy.status !== 0) { console.log('lists32.py not read: ' + idsPy.stderr.trim().slice(0, 300)); process.exit(2) }
const ALL_IDS = JSON.parse(idsPy.stdout).ids
const THIS_RUN = ALL_IDS
const RUN_IDS = THIS_RUN.filter(x => !WITHOUT.includes(x))
if (WITHOUT.some(x => !THIS_RUN.includes(x))) { console.log('--without names a rung not in the run'); process.exit(2) }
const STAGE_RUNGS = []
// The rungs that run the count stage and the distance stage once on their final trees (section 1's common fields):
// P and S, which edit the parser that both measures read the library through, and C, N and D, which edit the
// checker, each with P-148's runs. F and B edit files under interpreter/ only, run neither and list their files.
const STAGES_RUNGS = ['P', 'S', 'C', 'N', 'D']
const TIMED_RUNGS = ['C', 'N', 'D']
// The characters outside ASCII that a section keeps from the record, as gen32.py's KEPT: none.
const KEPT = ''
const nonAscii = (t, keep) => [...t].filter(c => c.charCodeAt(0) > 127 && !(keep || '').includes(c))
// No rung lands only with another (section 1's common fields: "lands only with: none").
const LANDS_ONLY_WITH = Object.fromEntries(ALL_IDS.map(x => [x, []]))
// At fork W (b) the record that is checked is the one gen32.py --fork-w b wrote, the record with W_B_RECORD's changes.
const REC = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--without' && argv[i - 1] !== '--fork-w')[0] ||
  (FORK_W === 'b' ? path.join(HERE, 'CLIMB-BATCH-32-fork-w-b.md') : path.join(ROOT, RECORD_PATH))
const block = fs.readFileSync(path.join(HERE, 'manifest' + BATCH_NAME + SUFFIX + '.js'), 'utf8')
const orig = fs.readFileSync(SRC, 'utf8')
const recText = fs.readFileSync(REC, 'utf8')
// This batch adds no program to the gate's atomic runs: the splice changes the block and nothing else.
const NEW_ATOMIC = []
const withAtomic = (text) => ({ text, changed: [] })
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
const at = withAtomic(pre + '\n' + block + post)
const spliced = at.text
const out = path.join(HERE, 'wf-spliced-' + BATCH_NAME + SUFFIX + '.js')
fs.writeFileSync(out, spliced)
console.log('the script\'s MANIFEST block is lines ' + (o.start + 1) + ' to ' + o.end + ' of ' + o.ls.length + '; the generated block has ' + block.split('\n').length + ' lines')
{
  const a = (pre + '\n' + block + post).split('\n'), z = spliced.split('\n')
  const differ = a.map((l, i) => l === z[i] ? -1 : i).filter(i => i >= 0)
  say(a.length === z.length && JSON.stringify(differ) === JSON.stringify(at.changed) && (pre + '\n' + block + post).startsWith(pre + '\n') && block.endsWith('\n') && !block.split('\n').some(l => l.startsWith('// =========================== END MANIFEST')),
    'every line outside the block is byte-identical' + ', the atomic lists among them' + '; the block ends before END MANIFEST')
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
// each takes the name whole, as 22c's did; BATCH is only ever concatenated, never read as a number.
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

  // The record's section 4, rung by rung, as gen32.py reads it.
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
  for (const m of s1.slice(0, s1.indexOf('\n|')).matchAll(/\b(REC|REV|PRB|NEQ|MCC|SPEC|SRC) (?:stands )?for `([^`]+)`/g)) ABBR[m[1]] = m[2]
  say(['REC', 'REV', 'PRB', 'NEQ', 'MCC'].every(k => ABBR[k] && /^doc:[^#]+#$/.test(ABBR[k])) && ABBR.REC === 'doc:' + RECORD_PATH + '#' && ABBR.SPEC === 'doc:Specification/' && ABBR.SRC === 'code:ProjectFortress/src/com/sun/fortress/',
    'section 1 spells out REC, REV, PRB, NEQ, MCC, SPEC and SRC: ' + Object.entries(ABBR).map(([k, v]) => k + ' ' + v).join(', '))
  const REC_KEY = ABBR.REC || 'doc:' + RECORD_PATH + '#'
  const rungNames = (t) => t.replace(/\s*\(.*?\)\.?$/, '').replace(/\.$/, '').split(/,\s*|\s+and\s+/).map(s => s.trim()).filter(Boolean)
  function tableRow(id) {
    const m = new RegExp('^\\| (1) \\| ' + id + ' \\| `([a-z0-9-]+)` \\| (.*) \\| ([0-9]+) \\|$', 'm').exec(s1)
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
      const k = /^(`[^`]+`|(REC|REV|PRB|NEQ|MCC|SPEC|SRC) `([^`]+)`|ledger:[0-9]+|[PF]-[0-9]+)( \(check\))?: (.*)$/.exec(it)
      if (!k || (k[2] && !ABBR[k[2]])) return { bad: it }
      const key = k[2] ? ABBR[k[2]] + k[3] : k[1].replace(/`/g, '')
      return { key, check: !!k[4], reason: k[5] }
    }) : []
    return { slug: field('slug'), worktree: field('worktree'), section: field('section'), blurb: field('blurb'), landsOnlyWith: field('lands only with'),
      points: pts ? pts.items.map(p => asAscii(p.trim())) : [], counts: cm ? [+cm[1], +cm[2]] : null, keys }
  }
  const common = (() => { const a = s1.indexOf('\nFields common to the seven rungs:\n'); return a < 0 ? '' : s1.slice(a, s1.indexOf('\n### ', a)) })()
  say(/\*\*writes state:\*\* no\./.test(common) && /\*\*its test is the stage:\*\* no\./.test(common) && /\*\*joins the gate:\*\* none, but the specification's build at the gather, for C's and N's text\./.test(common) &&
    /\*\*expected moves:\*\* none\./.test(common) && /\*\*expected checker count:\*\* none declared/.test(common) && /\*\*expected checker crash:\*\* none\./.test(common) &&
    /^- \*\*lands only with:\*\* none\. Every rung lands on its own\./m.test(common) &&
    /\*\*the stages:\*\* P, S, C, N and D run the count stage and the distance stage once on their final trees: [^\n]*C, N and D because they edit the checker, [^\n]*each of the three with the checker's timing \(P-148\)\. F and B edit files under `interpreter\/` only, run neither and list their files \(`STAGE_BLIND`\)\./.test(common),
    'the record\'s fields common to the seven rungs: no state, no stage as the test, no gate step (the specification\'s build at the gather), no move, no count or crash declared, no rung landing only with another, P, S, C, N and D running the two stages, C, N and D with the checker\'s timing, F and B neither')
  say(ALL_IDS.every(x => !!tableRow(x)), 'section 1\'s table gives each rung of lists32.py a row in run 1: ' + ALL_IDS.join(', '))
  // lists32.py's briefings, reasons and checks, for the rungs of the block.
  const py = cp.spawnSync('python3', ['-B', '-c', 'import json, sys; sys.path.insert(0, sys.argv[1]); from lists32 import lists; ' +
    'L, R = lists(tuple(sys.argv[2].split(",")), sys.argv[3]); print(json.dumps({r: {"briefing": L[r][0], "checks": L[r][1], "reasons": [x for _, x in R[r]]} for r in L}))', __dirname, RUN_IDS.join(','), FORK_W], { encoding: 'utf8' })
  const lists = py.status === 0 ? JSON.parse(py.stdout) : null
  say(!!lists, 'lists32.py read' + (lists ? '' : ': ' + py.stderr.trim().slice(0, 300)))
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
  say(/^- \*\*P and S share `parser\/Expression\.rats`, by production:\*\* S owns [^\n]*; P owns [^\n]* The gather's order is the script's: /m.test(rule) &&
    /^- \*\*C and N share `scala_src\/typechecker\/impls\/Functionals\.scala`, by declaration:\*\*$/m.test(rule) && /^  - C: `checkApplicableWithInference` /m.test(rule) && /^  - N: `checkApplicable` /m.test(rule) &&
    /^  - `typedApplicationOfChecked` calls both rungs' code: /m.test(rule) &&
    /^- \*\*N and F share `interpreter\/evaluator\/values\/OverloadedFunction\.java`, by member:\*\*$/m.test(rule) && /^  - N: the dispatch cache /m.test(rule) && /^  - F: the members from the inner class `Factory` /m.test(rule) &&
    /^- \*\*C alone edits `scala_src\/types\/TypeAnalyzer\.scala`\. D alone edits `scala_src\/typechecker\/Thunker\.scala` and `impls\/Decls\.scala`,\*\*/m.test(rule) &&
    /^- \*\*F and B edit different files under `interpreter\/evaluator\/`\.\*\*/m.test(rule) && /^No two rungs edit one declaration\./m.test(rule.split('\n').slice(2).join('\n')),
    'section 4\'s rule: no two rungs edit one declaration; P and S share parser/Expression.rats by production, C and N Functionals.scala by declaration, each with its line and the function that calls both, N and F OverloadedFunction.java by member; C alone edits TypeAnalyzer.scala, D alone Thunker.scala, Decls.scala and CodeGen.java; F and B edit different files of walk')
  // Each rung's "Not" list names the other's part of a shared file: no two rungs edit one declaration.
  const files = (id) => (/\*\*Files\.\*\* ([^\n]*)/.exec(section(id) || '') || [, ''])[1]
  const notOf = (id) => { const f = files(id), i = f.indexOf(' Not: '); return i < 0 ? '' : f.slice(i) }
  say(/rung P's/.test(notOf('S')) && /rung S's/.test(notOf('P')) && /rungs N's and C's/.test(notOf('S')) && /rung D's/.test(notOf('S')) &&
    /typedApplicationOfChecked with its numeralTie/.test(notOf('C')) && /rung N's/.test(notOf('C')) && /rung D's/.test(notOf('C')) &&
    /rung C's/.test(notOf('N')) && /rung D's/.test(notOf('N')) && (FORK_W === 'b' ? /Not: interpreter\//.test(notOf('N')) : /rung F's/.test(notOf('N'))) &&
    /rung N's/.test(notOf('F')) && /rungs N's and C's/.test(notOf('D')) && /Not: the compiled path/.test(notOf('B')),
    'each "Not" list names the other rungs\' parts: P and S each other\'s productions; S the declarations of N, C and D; C those of N and D; N those of C, D and ' + (FORK_W === 'b' ? 'every file of walk' : 'F') + '; F those of N; D those of N and C; B the compiled path')
  const wantOverlaps = { P: 'parser/Expression.rats with S: "The rule the rungs keep".', S: 'parser/Expression.rats with P: "The rule the rungs keep".',
    C: 'Functionals.scala with N: "The rule the rungs keep".', F: FORK_W === 'b' ? 'None with P, S, C, B, N or D.' : 'OverloadedFunction.java with N: "The rule the rungs keep".', B: 'None with P, S, C, F, N or D.',
    N: FORK_W === 'b' ? 'Functionals.scala with C: "The rule the rungs keep".' : 'Functionals.scala with C, and OverloadedFunction.java with F: "The rule the rungs keep".', D: 'None with P, S, C, F, B or N.' }
  say(RUN_IDS.every(x => overlaps(x) === wantOverlaps[x]), 'each section\'s "Overlaps by file.": P and S name each other and the rule, C and N each other, N and F each other' + (FORK_W === 'b' ? ' but at fork W (b), where N edits no file of walk' : '') + '; B and D none with the other six')
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
      JSON.stringify(x.reasons) === JSON.stringify(l.reasons.map(asAscii)), x.id + ': briefing ' + x.briefing.length + ' keys, reasons ' + x.reasons.length + ', checks ' + x.checks.length + ', as lists32.py has them')
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
    } else say(!!stages && /^None[.:]/.test(stages[1]) && /STAGE_BLIND/.test(stages[1]) && !/count stage/.test(x.section) && !/distance stage/.test(x.section),
      x.id + ': its section says it runs neither stage and lists its files (STAGE_BLIND)')
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
      x.id + ': the record\'s briefing gives ' + (b && b.counts ? b.counts[0] + ' keys and ' + b.counts[1] + ' checks' : 'no counts') + ', lists ' + bk.length + ' and marks ' + bk.filter(k => k.check).length + ' (check); lists32.py ' + x.briefing.length + ' and ' + x.checks.length)
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
  // The gate's atomic runs: the spliced script's two lists are the tracked script's, since this batch adds no program.
  const listOf = (ls, name) => { const l = ls.find(l => l.startsWith('const ' + name + ' = ')); const m = l && /= '([^']*)'/.exec(l); return m ? m[1] : null }
  say(listOf(s.ls, 'ATOMIC_COMPILER') !== null && listOf(s.ls, 'ATOMIC_COMPILER') === listOf(o.ls, 'ATOMIC_COMPILER') && listOf(s.ls, 'ATOMIC_OTHER') !== null && listOf(s.ls, 'ATOMIC_OTHER') === listOf(o.ls, 'ATOMIC_OTHER'),
    'the spliced script\'s atomic lists are the tracked script\'s: ' + ((listOf(s.ls, 'ATOMIC_COMPILER') || '') + ' ' + (listOf(s.ls, 'ATOMIC_OTHER') || '')).split(' ').filter(Boolean).length + ' programs, none new')
  say(introSentences.filter(t => /P-148|speed pass|pass for speed/.test(t)).length === 0, 'the intro names no P-148 and no pass for speed')
  say(/^This run is climb batch 32, the one run of the record CLIMB-BATCH-32\.md/.test(r.BATCH_INTRO) && RUN_IDS.every(x => new RegExp('^- ' + x + ', ', 'm').test(r.BATCH_INTRO)),
    'the intro: the one run of the record, its seven rungs')
  say(/P, S, C, N and D run the count stage and the distance stage once on their final trees, C, N and D with the checker's timing; F and B run neither\./.test(r.BATCH_INTRO) && /The gather applies the rungs in the script's order/.test(r.BATCH_INTRO),
    'the intro: P, S, C, N and D run the two stages once on their final trees, C, N and D with the checker\'s timing, F and B neither; the gather applies the rungs in the script\'s order')
  // Fork W: at (a) rung N's section holds walk's step and its promotions; at (b) it holds neither, and no file of walk.
  const nSec = (r.RUNGS.find(x => x.id === 'N') || {}).section
  if (nSec !== undefined) say(FORK_W === 'b' ? /2\. \*\*Walk: not in this rung\.\*\*/.test(nSec) && !/bestMatchForNumerals/.test(nSec) && /Rows 973, 966, 975 and 976 stay open\./.test(nSec)
    : /2\. \*\*Walk\*\* \(fork W\)\./.test(nSec) && /bestMatchForNumerals/.test(nSec) && /Close 973, 966, 975, 976 and 989\./.test(nSec),
    'fork W at (' + FORK_W + '): rung N\'s section ' + (FORK_W === 'b' ? 'strikes walk\'s step, leaves rows 973, 966, 975 and 976 open and names no member of walk' : 'holds walk\'s step, its promotions and the five rows it closes'))
  const paths = r.RUNGS.map(x => x.path), slugs = r.RUNGS.map(x => x.slug)
  say(new Set(paths).size === paths.length && new Set(slugs).size === slugs.length, 'every rung has its own worktree and branch')
  say(!/[^\x00-\x7f]/.test(spliced) && !/[^\x00-\x7f]/.test(block), 'the block and the spliced script hold no character outside ASCII: the kept ones are \\u escapes')
  say(!rec.includes('const RUNGS') && !rec.includes('_ENTRY = {') && rec.includes('compile-ladder/plan-32/manifest/'), 'the record names the generator\'s folder, compile-ladder/plan-32/manifest/, and holds no copy of the block')
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
