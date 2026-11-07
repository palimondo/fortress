// check27.js for climb batch 27, made from plan-26/manifest/check26.js.
// Checks the MANIFEST block of climb batch 27 (gen27.py's output, $OUT27/manifest27.js) spliced into a scratch copy
// of the workflow script, $OUT27/wf-spliced-27.js, and with --write splices it into the tracked script. As
// check26.js: node --check on the original and the spliced copy; both parsed as the body of an async function, as the
// Workflow harness parses them, their export made const; every line outside the block byte-identical; the block
// evaluated with the script's own load checks and scatter order; the batch's rungs (lists27.py's IDS, N, I, F, C, W,
// S, A, E, G and T, in that order, less any that --without names), their fields, no rung bringing a gate step, declaring a
// checker count, a crash or a ladder move, or landing only with another but N with F; each section equal to the rung's section of
// the record (backticks dropped, the ellipsis character as three full stops, the minus sign as a hyphen-minus);
// briefing, reasons and checks equal to lists27.py's, one reason per key, checks a sub-list of the briefing; no
// rung's test the stage; no backtick in any string the agents read; no text asking a skeptic to see a failure again
// or a stage re-run without a code change (the coordinator skill's references/batch.md, "The workflow"); no
// LEDGER_FROM; the record holding no copy of the block.
// Changed from check26.js: the batch's values (27, CLIMB-BATCH-27.md, lists27.py, $OUT27, manifest27.js); the
// record's layout, the sections in its section 4 and the manifest fields and briefings in its section 1; every
// rung's section naming the count stage and the distance stage as stages its rung runs once on its final tree
// (fork 3): N's "The stages." paragraph says "Run the count stage and the distance stage once each on your final
// tree", every other rung's says "Both, once each on your final tree, as rung N's section gives the commands (fork
// 3)", and none says "run neither", where check26.js asked three of four sections for "run neither"; no section
// naming a speed pass or P-148, and the intro saying that none makes one (fork 4); the slug, path, expected minutes,
// title, blurb and points of each rung against section 1; the briefings against section 1's bullets key by key: each
// key, in order, its (check) mark and its reason (its first letter either case), and the bullet's counts of keys and
// checks, with no OWN_REASONS, since the record gives every reason; the strings the agents read hold no character
// outside ASCII but the few that a section keeps from the record (KEPT), and the spliced script holds none, those
// being \u escapes. Then for rungs A, E, G and T: ten rungs; every section but G's and T's naming the two stages as
// above, G's and T's opening "The stages." with "Neither" (fork 3); T's section naming P-148 only in its sentence
// for a fix that must change the checker (fork T1), and no other naming it or a speed pass. Its last lines say whether the tracked script's block equals the generated one, and count the
// problems.
//   node check27.js [--without <rung>]... [--write] [RECORD]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-27.md
// --without <rung> checks the block that gen27.py writes with the same argument: the batch's rungs less that one.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || path.resolve(__dirname, '../../../..')
const HERE = process.env.OUT27 || path.join(ROOT, 'tmp')
const SRC = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const argv = process.argv.slice(2)
const WRITE = argv.includes('--write')
const WITHOUT = argv.map((a, i) => argv[i - 1] === '--without' ? a : null).filter(a => a !== null)
const BATCH_NAME = '27'
const idsPy = cp.spawnSync('python3', ['-B', '-c', 'import sys; sys.path.insert(0, sys.argv[1]); from lists27 import IDS; print(",".join(IDS))', __dirname], { encoding: 'utf8' })
if (idsPy.status !== 0) { console.log('lists27.py not read: ' + idsPy.stderr.trim().slice(0, 300)); process.exit(2) }
const ALL_IDS = idsPy.stdout.trim().split(',')
const RUN_IDS = ALL_IDS.filter(x => !WITHOUT.includes(x))
if (WITHOUT.some(x => !ALL_IDS.includes(x))) { console.log('--without names a rung not in the batch'); process.exit(2) }
const STAGE_RUNGS = []
const CHECKER_RUNGS = []
// The rungs that run the count stage and the distance stage once each on their final tree: every rung (fork 3), each
// changing text that both stages read. None names them as stages it does not run.
// G and T change only the code generator, which neither stage runs, and say "Neither".
const STAGES_RUNGS = ALL_IDS.filter(x => x !== 'G' && x !== 'T')
// The characters outside ASCII that a section keeps from the record, as gen27.py's KEPT: written as \u escapes.
const KEPT = '\u00e9\u03a3\u03bb\u2192\u2211\u2190'
const nonAscii = (t, keep) => [...t].filter(c => c.charCodeAt(0) > 127 && !(keep || '').includes(c))
// N lands only with F (the record's fork 1, N's block in section 1), as check17.js expected for rung L; no other rung
// lands only with another.
const LANDS_ONLY_WITH = Object.fromEntries(ALL_IDS.map(x => [x, x === 'N' ? ['F'] : []]))
const REC = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--without')[0] || path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-27.md')
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
  say(r.BATCH === BATCH_NAME && r.BATCH_RECORD === 'explorations/coordinator/CLIMB-BATCH-27.md' && r.BRIEFING_LISTS === 'explorations/compile-ladder/plan-27/manifest/lists27.py' && ids === RUN_IDS.join(', ') && r.SCATTER.map(x => x.id).join('') === order, 'batch ' + BATCH_NAME + ', its record and lists, the rungs ' + RUN_IDS.join(', ') + ' and the scatter by expected minutes, ' + order)
  say(r.ledgerFrom === 'undefined', 'no LEDGER_FROM: the gather numbers the new rows through ledger.py')
  say(r.RUNGS.every(x => Array.isArray(x.gateJoins) && !x.gateJoins.length), 'no rung brings a gate step: testSpecData runs from the last landed summary')
  say(r.RUNGS.every(x => JSON.stringify(x.landsOnlyWith || []) === JSON.stringify(LANDS_ONLY_WITH[x.id])), 'N lands only with F, and no other rung with another: ' + r.RUNGS.map(x => x.id + ' [' + (x.landsOnlyWith || []).join(', ') + ']').join(', '))
  say(r.RUNGS.every(x => x.expectedCheckerCrash === undefined && Array.isArray(x.expectedMoves) && !x.expectedMoves.length), 'no rung declares a crash or a ladder move')
  say(r.RUNGS.every(x => x.expectedCheckerCount === undefined), 'no rung declares a checker count: it is reported, never red')

  // The record's section 4, rung by rung, as gen27.py reads it.
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
  // The record's section 1: the table's row of one rung, and its ### block.
  const s1 = rec.slice(rec.indexOf('\n## 1. The manifest, rung by rung\n'), rec.indexOf('\n## 2. '))
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
    const REC_KEY = 'doc:explorations/coordinator/CLIMB-BATCH-27.md#'
    const keys = br ? br.items.map(it => {
      const k = /^(`[^`]+`|REC `[^`]+`|ledger:[0-9]+|[PF]-[0-9]+)( \(check\))?: (.*)$/.exec(it)
      if (!k) return { bad: it }
      const key = k[1].startsWith('REC `') ? REC_KEY + k[1].slice(5, -1) : k[1].replace(/`/g, '')
      return { key, check: !!k[2], reason: k[3] }
    }) : []
    return { slug: field('slug'), worktree: field('worktree'), section: field('section'), blurb: field('blurb'), landsOnlyWith: field('lands only with'),
      points: pts ? pts.items.map(p => asAscii(p.trim())) : [], counts: cm ? [+cm[1], +cm[2]] : null, keys }
  }
  const common = (() => { const a = s1.indexOf('\nFields common to the ten rungs:\n'); return a < 0 ? '' : s1.slice(a, s1.indexOf('\n### ', a)) })()
  say(/\*\*writes state:\*\* no\./.test(common) && /\*\*its test is the stage:\*\* no\./.test(common) && /\*\*joins the gate:\*\* none\./.test(common) &&
    /\*\*expected moves:\*\* none\./.test(common) && /\*\*lands only with:\*\* none; N's block below names F \(section 3, fork 1\)\./.test(common) && /\*\*expected checker count:\*\* none declared/.test(common) &&
    /\*\*expected checker crash:\*\* none\./.test(common), 'the record\'s fields common to the ten rungs: no state, no stage as the test, no gate step, no move, none landed only with but N\'s, no count or crash declared')
  // lists27.py's briefings, reasons and checks.
  const py = cp.spawnSync('python3', ['-B', '-c', 'import json, sys; sys.path.insert(0, sys.argv[1]); from lists27 import LISTS, REASONS, IDS, OWN_REASONS; ' +
    'print(json.dumps({r: {"briefing": LISTS[r][0], "checks": LISTS[r][1], "reasons": [x for _, x in REASONS[r]], "own": OWN_REASONS.get(r, [])} for r in IDS}))', __dirname], { encoding: 'utf8' })
  const lists = py.status === 0 ? JSON.parse(py.stdout) : null
  say(!!lists, 'lists27.py read' + (lists ? '' : ': ' + py.stderr.trim().slice(0, 300)))
  say(!!lists && Object.values(lists).every(l => !l.own.length), 'lists27.py has no OWN_REASONS: the record gives every reason')
  const rerun = /sees? it fail again|re-?run by the skeptic|skeptic re-?runs|run the stage yourself|skeptic rebuilds|re-anchor/i
  const nSection = section('N')
  say(!!nSection && /\*\*The stages\.\*\* Run the count stage and the distance stage once each on your final tree/.test(nSection), 'the record\'s N section gives the stages\' commands, which the other sections cite')
  for (const x of r.RUNGS) {
    const want = section(x.id)
    say(want !== null && x.section === want, x.id + ': its section is the record\'s section 4 for ' + x.id + ' word for word (' + x.section.length + ' characters)')
    const b = rungBlock(x.id), row = tableRow(x.id)
    say(!!b && !!row && x.slug === row.slug && b.slug === row.slug && x.path === b.worktree && x.path === '/home/user/fortress-' + x.slug.replace(/^rung-/, '') &&
      x.expectedMinutes === row.minutes && x.blurb === b.blurb && JSON.stringify(x.pointsToReport) === JSON.stringify(b.points),
      x.id + ': slug, worktree, ' + x.expectedMinutes + ' minutes, blurb and ' + x.pointsToReport.length + ' points as section 1 gives them')
    const own = b && b.landsOnlyWith !== null ? b.landsOnlyWith.replace(/\s*\(.*?\)\.?$/, '').replace(/\.$/, '').split(',').map(s => s.trim()) : []
    say(JSON.stringify(own) === JSON.stringify(LANDS_ONLY_WITH[x.id]) && JSON.stringify(x.landsOnlyWith || []) === JSON.stringify(own), x.id + ': lands only with [' + own.join(', ') + '], as its block in section 1 gives it')
    say(!!b && b.section === heading(x.id) && x.title === heading(x.id).slice(3) && x.title.startsWith(row.title), x.id + ': its section field and title are its section 4 heading, the table\'s title its start')
    const l = lists && lists[x.id]
    say(!!l && JSON.stringify(x.briefing) === JSON.stringify(l.briefing) && JSON.stringify(x.checks) === JSON.stringify(l.checks) &&
      JSON.stringify(x.reasons) === JSON.stringify(l.reasons.map(asAscii)), x.id + ': briefing ' + x.briefing.length + ' keys, reasons ' + x.reasons.length + ', checks ' + x.checks.length + ', as lists27.py has them')
    say(x.checks.every(k => x.briefing.includes(k)), x.id + ': checks a sub-list of the briefing')
    say(x.branch === 'wip/' + x.slug && /^\/home\/user\/fortress-[a-z0-9-]+$/.test(x.path) && x.expectedMinutes > 0, x.id + ': ' + x.path + ' on ' + x.branch + ', ' + x.expectedMinutes + ' minutes')
    say(Array.isArray(x.pointsToReport) && x.pointsToReport.length > 0 && x.pointsToReport.every(p => typeof p === 'string' && p.trim()), x.id + ': ' + x.pointsToReport.length + ' points to report')
    const texts = [x.title, x.blurb].concat(x.pointsToReport, x.reasons, x.briefing)
    const kept = nonAscii(x.section, '')
    say(!texts.concat([x.section]).some(t => /`/.test(t)) && !texts.some(t => nonAscii(t).length) && !nonAscii(x.section, KEPT).length,
      x.id + ': no backtick, and no character outside ASCII' + (kept.length ? ' but the section\'s ' + kept.length + ' kept from the record (' + [...new Set(kept)].map(c => 'U+' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ') + ')' : ''))
    say(!texts.concat([x.section]).some(t => rerun.test(t)), x.id + ': nothing asks a skeptic to see a failure again, rebuild, re-run or re-anchor')
    say(x.testIsStage === STAGE_RUNGS.includes(x.id), x.id + ': its test is the stage: ' + x.testIsStage + (STAGE_RUNGS.includes(x.id) ? ', its every edit is library text that only the checker reads differently' : ', a test first'))
    const stages = /\*\*The stages\.\*\* (Run the count stage and the distance stage once each on your final tree|Both, once each on your final tree, as rung N's section gives the commands \(fork 3\))/
    if (STAGES_RUNGS.includes(x.id)) say(stages.test(x.section) && !/run neither/.test(x.section), x.id + ': its section names the count stage and the distance stage as stages its rung runs once on its final tree' + (x.id === 'N' ? '' : ', by rung N\'s commands'))
    else say(/\*\*The stages\.\*\* Neither[:,] /.test(x.section) && !stages.test(x.section), x.id + ': its section says it runs neither stage (fork 3)')
    if (CHECKER_RUNGS.includes(x.id)) say(/P-148/.test(x.section) && /speed pass/.test(x.section) && !/no speed pass/.test(x.section), x.id + ': a rung that changes the checker, its section names P-148 and its speed pass')
    else if (x.id === 'T') say(!/speed pass/.test(x.section) && (x.section.match(/P-148/g) || []).length === 1 && /If the fix must change the checker's trait table, it is a change of checking code: take P-148's measure/.test(x.section), x.id + ': its section names no speed pass, and P-148 only for a fix that must change the checker (fork T1)')
    else say(!/P-148/.test(x.section) && !/speed pass/.test(x.section), x.id + ': a rung outside the checker, its section names no speed pass and no P-148')
    // The record's section 1: the rung's briefing bullets, key by key, and their counts.
    const bk = b ? b.keys : []
    say(!!b && !!b.counts && b.counts[0] === x.briefing.length && b.counts[1] === x.checks.length && bk.filter(k => k.check).length === x.checks.length,
      x.id + ': the record\'s briefing gives ' + (b && b.counts ? b.counts[0] + ' keys and ' + b.counts[1] + ' checks' : 'no counts') + ', marks ' + bk.filter(k => k.check).length + ' (check); lists27.py ' + x.briefing.length + ' and ' + x.checks.length)
    const lc = (t) => t.charAt(0).toLowerCase() + t.slice(1)
    const diff = []
    if (bk.some(k => k.bad)) diff.push('unread bullets: ' + bk.filter(k => k.bad).map(k => k.bad.slice(0, 80)).join(' | '))
    if (JSON.stringify(bk.map(k => k.key)) !== JSON.stringify(x.briefing)) diff.push('the keys differ: ' + x.briefing.filter((k, i) => !bk[i] || bk[i].key !== k).map(k => k.slice(0, 80)).join(' | '))
    if (JSON.stringify(bk.filter(k => k.check).map(k => k.key)) !== JSON.stringify(x.checks)) diff.push('the checks differ')
    bk.forEach((k, i) => { if (k.reason !== undefined && x.reasons[i] !== undefined && lc(k.reason) !== lc(x.reasons[i])) diff.push(k.key.slice(0, 60) + ' -> ' + x.reasons[i]) })
    say(!!b && !diff.length, x.id + ': every key, its (check) mark and its reason are the record\'s, in its order' + (diff.length ? '; ' + diff.join('; ') : ''))
  }
  say(!/[^\x00-\x7f]|`/.test(r.BATCH_INTRO) && !rerun.test(r.BATCH_INTRO), 'the intro: ASCII, no backtick, no re-run')
  say(/none makes a speed pass|no speed pass/.test(r.BATCH_INTRO) && !/P-148/.test(r.BATCH_INTRO), 'the intro says no rung makes a speed pass, and names no P-148')
  const paths = r.RUNGS.map(x => x.path), slugs = r.RUNGS.map(x => x.slug)
  say(new Set(paths).size === paths.length && new Set(slugs).size === slugs.length, 'every rung has its own worktree and branch')
  say(!/[^\x00-\x7f]/.test(spliced) && !/[^\x00-\x7f]/.test(block), 'the block and the spliced script hold no character outside ASCII: the kept ones are \\u escapes')
  say(!rec.includes('const RUNGS') && !rec.includes('_ENTRY = {') && rec.includes('gen27.py') && rec.includes('check27.js'), 'the record names gen27.py and check27.js and holds no copy of the block')
}

const same = current === block
console.log((same ? 'the tracked script\'s block equals the generated one' : 'the tracked script\'s block differs from the generated one') + (WRITE ? '' : '; --write splices it'))
if (WRITE) {
  if (bad) console.log('not written: ' + bad + ' problem(s)')
  else if (same) console.log('nothing to write')
  else { fs.writeFileSync(SRC, spliced); console.log('wrote the block into ' + path.relative(ROOT, SRC)) }
}
console.log('problems: ' + bad)
