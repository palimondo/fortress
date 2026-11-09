// check29b.js for climb batch 29b, made from plan-29/manifest/check29.js.
// Checks the MANIFEST block of climb batch 29b (gen29b.py's output, $OUT29B/manifest29b.js) spliced into a scratch
// copy of the workflow script, $OUT29B/wf-spliced-29b.js, and with --write splices it into the tracked script. As
// check29.js: node --check on the original and the spliced copy; both parsed as the body of an async function, as the
// Workflow harness parses them, their export made const; every line outside the block byte-identical; the block
// evaluated with the script's own load checks and scatter order; the batch's rungs (lists29b.py's IDS, A and T, in
// that order, less any that --without names), their fields, no rung bringing a gate step, declaring a checker count, a
// crash or a ladder move; each section equal to the rung's section of the record (backticks dropped, the ellipsis
// character as three full stops, the minus sign as a hyphen-minus); briefing, reasons and checks equal to
// lists29b.py's, one reason per key, checks a sub-list of the briefing; no rung's test the stage; no backtick in any
// string the agents read; no text asking a skeptic to see a failure again or a stage re-run without a code change
// (the coordinator skill's references/batch.md, "The workflow"); no LEDGER_FROM; the record holding no copy of the
// block; the slug, path, expected minutes, title, blurb and points of each rung against section 1; no string the
// agents read, nor the spliced script, holding a character outside ASCII (the record's sections hold none, so KEPT is
// empty); the briefings against section 1's bullets key by key, each key in order, its (check) mark and its reason
// (its first letter either case), and the bullet's counts; no string the agents read naming a path under
// .claude/skills/ or revival-changes.md, which tools/workflow-scenarios.js refuses in every brief.
// Changed from check29.js: the batch's values (29b, CLIMB-BATCH-29b.md, lists29b.py, $OUT29B, manifest29b.js); two
// rungs, A and T; landsOnlyWith T with A, in the "Fields common to the two rungs" and in T's block alike; the common
// fields as the record gives them, the gate's none but T's specification build at the gather; the abbreviations of
// a key, REC, PROBE and SNAP, read from section 1's opening paragraph; the forks: the record's one forks key, REC
// "Forks the batch takes", in each briefing once and whole, as section 1 gives it with its (check) mark, since the
// record's forks are a numbered list led by the fork's label (A1 to A8, T1 to T3), with none of the leads climb batch
// 29's way read ("For the whole batch", "Rung <id>"), which this checker prints; section 4's rule that A and T share no
// file, and each section's "Overlaps by file." none; the stages (section 6, "The generator"): A's "The stages." is
// its step 9, the count stage and the distance stage once each on its final tree, and P-148's change run if it edits
// the checker (scala_src/) beyond the patch, with no pass for speed named; T's opens "None" and lists its files
// (STAGE_BLIND), and names neither stage nor P-148; the intro saying A runs the two stages once on its final tree,
// naming P-148 only beside A, and T landing only with A; the script's paths built from the batch's name (BATCH_DIR
// climb-batch-29b, GATE_DIR, LOG_DIR, GATE_OUT, SPEC_PDF) taking 29b whole, and every other use of BATCH after the
// block (the brief's head, the commit titles, the labels) a concatenation or a field, never a number; the record and
// the lists the block names present on disk. Its last lines say whether the
// tracked script's block equals the generated one, and count the problems; it exits 1 on any, and --write then
// writes nothing.
//   node check29b.js [--without <rung>]... [--write] [RECORD]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-29b.md
// --without <rung> checks the block that gen29b.py writes with the same argument: the batch's rungs less that one.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || path.resolve(__dirname, '../../../..')
const HERE = process.env.OUT29B || path.join(ROOT, 'tmp')
const SRC = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const argv = process.argv.slice(2)
const WRITE = argv.includes('--write')
const WITHOUT = argv.map((a, i) => argv[i - 1] === '--without' ? a : null).filter(a => a !== null)
const BATCH_NAME = '29b'
const RECORD_PATH = 'explorations/coordinator/CLIMB-BATCH-' + BATCH_NAME + '.md'
const LISTS_PATH = 'explorations/compile-ladder/plan-' + BATCH_NAME + '/manifest/lists' + BATCH_NAME + '.py'
const idsPy = cp.spawnSync('python3', ['-B', '-c', 'import sys; sys.path.insert(0, sys.argv[1]); from lists29b import IDS; print(",".join(IDS))', __dirname], { encoding: 'utf8' })
if (idsPy.status !== 0) { console.log('lists29b.py not read: ' + idsPy.stderr.trim().slice(0, 300)); process.exit(2) }
const ALL_IDS = idsPy.stdout.trim().split(',')
const RUN_IDS = ALL_IDS.filter(x => !WITHOUT.includes(x))
if (WITHOUT.some(x => !ALL_IDS.includes(x))) { console.log('--without names a rung not in the batch'); process.exit(2) }
const STAGE_RUNGS = []
// The rung that runs the count stage and the distance stage once each on its final tree, changing what both read
// (section 6, "The generator"): A, whose step 9 gives them, with P-148's change run if it edits the checker beyond
// the patch. T edits only Specification/ and runs neither.
const STAGES_RUNGS = ['A']
const TIMED_RUNGS = ['A']
// The characters outside ASCII that a section keeps from the record, as gen29b.py's KEPT: none.
const KEPT = ''
const nonAscii = (t, keep) => [...t].filter(c => c.charCodeAt(0) > 127 && !(keep || '').includes(c))
// T lands only with A, A on its own (section 1's common fields, T's block; section 4, "The rule the rungs keep";
// section 6, "The generator").
const LANDS_ONLY_WITH = Object.assign(Object.fromEntries(ALL_IDS.map(x => [x, []])), { T: ['A'] })
const REC = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--without')[0] || path.join(ROOT, RECORD_PATH)
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
// each takes 29b whole, as 22c's did; BATCH is only ever concatenated, never read as a number.
{
  const afterBlock = s.ls.slice(s.end)
  const pathLines = ['const BATCH_DIR = ', 'const GATE_DIR = ', 'const LOG_DIR = ', 'const GATE_OUT = ', 'const SPEC_PDF = '].map(p => afterBlock.find(l => l.startsWith(p)))
  const mainLine = s.ls.find(l => l.startsWith('const MAIN = '))
  let p = null
  try { p = new Function("const BATCH = '" + BATCH_NAME + "'\n" + mainLine + '\n' + pathLines.join('\n') + '\nreturn { BATCH_DIR, GATE_DIR, LOG_DIR, GATE_OUT, SPEC_PDF }')() } catch (e) { p = null }
  say(!!p && p.BATCH_DIR === 'explorations/compile-ladder/climb-batch-29b' && p.GATE_DIR === 'explorations/compile-ladder/climb-batch-29b/gate' && p.LOG_DIR === 'tmp/gate-batch-29b' &&
    p.GATE_OUT === 'tmp/gate-batch-29b/out' && p.SPEC_PDF === '/home/user/fortress/tmp/gather/fortress-batch-29b.pdf',
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

  // The record's section 4, rung by rung, as gen29b.py reads it.
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
  for (const m of s1.slice(0, s1.indexOf('\n|')).matchAll(/\b(REC|PROBE|SNAP|SRC) (?:stands )?for `([^`]+)`/g)) ABBR[m[1]] = m[2]
  say(['REC', 'PROBE', 'SNAP'].every(k => ABBR[k] && /^doc:[^#]+#$/.test(ABBR[k])) && ABBR.REC === 'doc:' + RECORD_PATH + '#',
    'section 1 spells out REC, PROBE and SNAP: ' + Object.entries(ABBR).map(([k, v]) => k + ' ' + v).join(', '))
  const REC_KEY = ABBR.REC || 'doc:' + RECORD_PATH + '#'
  const rungNames = (t) => t.replace(/\s*\(.*?\)\.?$/, '').replace(/\.$/, '').split(/,\s*|\s+and\s+/).map(s => s.trim()).filter(Boolean)
  function tableRow(id) {
    const m = new RegExp('^\\| ' + id + ' \\| `([a-z0-9-]+)` \\| (.*) \\| ([0-9]+) \\|$', 'm').exec(s1)
    return m ? { slug: m[1], title: asAscii(m[2]), minutes: +m[3] } : null
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
      const k = /^(`[^`]+`|(REC|PROBE|SNAP) `([^`]+)`|ledger:[0-9]+|[PF]-[0-9]+)( \(check\))?: (.*)$/.exec(it)
      if (!k || (k[2] && !ABBR[k[2]])) return { bad: it }
      const key = k[2] ? ABBR[k[2]] + k[3] : k[1].replace(/`/g, '')
      return { key, check: !!k[4], reason: k[5] }
    }) : []
    return { slug: field('slug'), worktree: field('worktree'), section: field('section'), blurb: field('blurb'), landsOnlyWith: field('lands only with'),
      points: pts ? pts.items.map(p => asAscii(p.trim())) : [], counts: cm ? [+cm[1], +cm[2]] : null, keys }
  }
  const common = (() => { const a = s1.indexOf('\nFields common to the two rungs:\n'); return a < 0 ? '' : s1.slice(a, s1.indexOf('\n### ', a)) })()
  // The common lands-only-with field: "T lands only with A; A lands on its own (...)", every rung named once.
  const lowLine = (/^- \*\*lands only with:\*\* (.*)$/m.exec(common) || [, ''])[1].replace(/\s*\([^()]*\)\.?$/, '').replace(/\.$/, '')
  const commonLow = {}, alone = [], unread = []
  for (const part of lowLine.split('; ')) {
    const m = /^([A-Z]) lands only with (.*)$/.exec(part), o = /^(.*) lands? on (?:its|their) own$/.exec(part)
    if (m) commonLow[m[1]] = rungNames(m[2]); else if (o) alone.push(...rungNames(o[1])); else unread.push(part)
  }
  say(/\*\*writes state:\*\* no\./.test(common) && /\*\*its test is the stage:\*\* no\./.test(common) && /\*\*joins the gate:\*\* none(, but T's specification build at the gather)?\./.test(common) &&
    /\*\*expected moves:\*\* none\./.test(common) && /\*\*expected checker count:\*\* none declared/.test(common) && /\*\*expected checker crash:\*\* none\./.test(common) &&
    !unread.length && Object.keys(commonLow).concat(alone).sort().join('') === ALL_IDS.slice().sort().join('') && ALL_IDS.every(x => JSON.stringify(commonLow[x] || []) === JSON.stringify(LANDS_ONLY_WITH[x])),
    'the record\'s fields common to the two rungs: no state, no stage as the test, no gate step (T\'s specification build at the gather), no move, no count or crash declared, and ' +
    (Object.entries(commonLow).map(([k, v]) => k + ' lands only with ' + v.join(', ')).join('; ') || 'none landing only with another') + '; ' + alone.join(', ') + ' on its own' + (unread.length ? '; unread: ' + unread.join(' | ') : ''))
  // lists29b.py's briefings, reasons and checks, for the rungs of the block.
  const py = cp.spawnSync('python3', ['-B', '-c', 'import json, sys; sys.path.insert(0, sys.argv[1]); from lists29b import lists; ' +
    'L, R = lists(tuple(sys.argv[2].split(","))); print(json.dumps({r: {"briefing": L[r][0], "checks": L[r][1], "reasons": [x for _, x in R[r]]} for r in L}))', __dirname, RUN_IDS.join(',')], { encoding: 'utf8' })
  const lists = py.status === 0 ? JSON.parse(py.stdout) : null
  say(!!lists, 'lists29b.py read' + (lists ? '' : ': ' + py.stderr.trim().slice(0, 300)))
  // Section 3's forks: the record's one forks key, whole, for every rung. Climb batch 29's way read the bold leads
  // "For the whole batch" and "Rung <id>"; this record's leads are the forks' labels, so none of those is held by
  // one lead, and the record's key stands as section 1 gives it.
  const FORKS_HEAD = 'Forks the batch takes'
  const FORKS_KEY = REC_KEY + FORKS_HEAD
  const fs3 = (() => { const a = rec.indexOf('\n### ' + FORKS_HEAD + '\n'); if (a < 0) return ''; const rest = rec.slice(a + 1); const e = rest.search(/\n#{1,3} /); return e < 0 ? rest : rest.slice(0, e) })()
  const leadOf = (l) => { const t = l.replace(/^[0-9]+\. /, ''); if (!t.startsWith('**')) return null; const c = t.indexOf('**', 2); return c > 2 ? t.slice(2, c) : null }
  const leads = fs3.split('\n').map(leadOf).filter(Boolean)
  const labels = leads.map(l => (/^([A-Z][0-9]+)\. /.exec(l) || [])[1]).filter(Boolean)
  const lead29 = ['For the whole batch'].concat(RUN_IDS.map(x => 'Rung ' + x)).filter(w => leads.some(l => l === w || l.startsWith(w + ',')))
  say(!!fs3 && labels.length === leads.length && labels.length > 0, 'section 3\'s "' + FORKS_HEAD + '": ' + leads.length + ' forks led by their labels, ' + labels.join(', ') + '; climb batch 29\'s leads held: ' + (lead29.length ? lead29.join(', ') : 'none') + ', so every rung reads the record\'s one forks key whole')
  // Section 4's rule: the two rungs share no file, and each section says so.
  const rule = (() => { const a = s4.indexOf('\n### The rule the rungs keep'); return a < 0 ? '' : s4.slice(a) })()
  say(/^- A and T share no file\./m.test(rule) && RUN_IDS.every(id => /\*\*Overlaps by file\.\*\* None[.:]/.test(section(id) || '')),
    'section 4: A and T share no file, and each section\'s "Overlaps by file." says none')
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
    say(!!b && b.section === heading(x.id) && x.title === heading(x.id).slice(3) && x.title.startsWith(row.title), x.id + ': its section field and title are its section 4 heading, the table\'s title its start')
    const l = lists && lists[x.id]
    say(!!l && JSON.stringify(x.briefing) === JSON.stringify(l.briefing) && JSON.stringify(x.checks) === JSON.stringify(l.checks) &&
      JSON.stringify(x.reasons) === JSON.stringify(l.reasons.map(asAscii)), x.id + ': briefing ' + x.briefing.length + ' keys, reasons ' + x.reasons.length + ', checks ' + x.checks.length + ', as lists29b.py has them')
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
      const step = stages && /^Step ([0-9]+)\.$/.exec(stages[1].trim())
      const stepText = step ? ((new RegExp('^' + step[1] + '\\. (.*)$', 'm').exec(x.section) || [])[1] || '') : ''
      say(!!step && /^\*\*The suites and the stages,\*\* once each on your final tree:/.test(stepText) && /the count stage and the distance stage/.test(stepText) && !/run neither|\*\*The stages\.\*\* None/.test(x.section),
        x.id + ': its section names the count stage and the distance stage as stages it runs once on its final tree' + (step ? ' (its "The stages." is step ' + step[1] + ')' : ''))
    } else say(!!stages && /^None[.:]/.test(stages[1]) && /STAGE_BLIND/.test(x.section) && !/count stage|distance stage/.test(x.section), x.id + ': its section says it runs neither stage and lists its files (STAGE_BLIND)')
    if (TIMED_RUNGS.includes(x.id)) say(/If you edit scala_src\/ beyond the patch, P-148's change run of the count stage on your final tree/.test(x.section) && !speed.test(x.section),
      x.id + ': its section names P-148\'s change run of the count stage if it edits the checker beyond the patch, and no pass for speed')
    else say(!/P-148/.test(x.section) && !speed.test(x.section), x.id + ': a rung outside the checker\'s timing, its section names no pass for speed and no P-148')
    // The record's section 1: the rung's briefing bullets, key by key, and their counts; its one forks key stands whole.
    const bk = b ? b.keys : []
    const fi = bk.findIndex(k => k.key === FORKS_KEY)
    say(fi >= 0 && bk.filter(k => k.key === FORKS_KEY).length === 1 && x.briefing.filter(k => k === FORKS_KEY).length === 1 && x.checks.includes(FORKS_KEY) === bk[fi].check,
      x.id + ': the record\'s briefing names the forks once, ' + (fi >= 0 && bk[fi].check ? 'as a check' : 'not as a check') + ', and the block holds that key whole, ' + FORKS_HEAD)
    const wantKeys = bk
    say(!!b && !!b.counts && b.counts[0] === bk.length && b.counts[1] === bk.filter(k => k.check).length && x.briefing.length === wantKeys.length && x.checks.length === b.counts[1],
      x.id + ': the record\'s briefing gives ' + (b && b.counts ? b.counts[0] + ' keys and ' + b.counts[1] + ' checks' : 'no counts') + ', lists ' + bk.length + ' and marks ' + bk.filter(k => k.check).length + ' (check); lists29b.py ' + x.briefing.length + ' and ' + x.checks.length)
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
  say(introSentences.filter(t => /P-148|speed pass|pass for speed/.test(t)).every(t => /\bA\b/.test(t)), 'the intro names P-148 only beside A')
  say(/A changes what the stages read, so it runs the count stage and the distance stage once on its final tree/.test(r.BATCH_INTRO) && /T edits only Specification\//.test(r.BATCH_INTRO),
    'the intro: A runs the two stages once on its final tree, and T edits only Specification/')
  say(/^- T, [^\n]*it lands only with A[.;]?$/m.test(r.BATCH_INTRO), 'the intro: T lands only with A')
  const paths = r.RUNGS.map(x => x.path), slugs = r.RUNGS.map(x => x.slug)
  say(new Set(paths).size === paths.length && new Set(slugs).size === slugs.length, 'every rung has its own worktree and branch')
  say(!/[^\x00-\x7f]/.test(spliced) && !/[^\x00-\x7f]/.test(block), 'the block and the spliced script hold no character outside ASCII: the kept ones are \\u escapes')
  say(!rec.includes('const RUNGS') && !rec.includes('_ENTRY = {') && rec.includes('gen29b.py') && rec.includes('check29b.js'), 'the record names gen29b.py and check29b.js and holds no copy of the block')
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
