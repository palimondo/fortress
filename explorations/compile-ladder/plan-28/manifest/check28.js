// check28.js for climb batch 28, made from plan-27/manifest/check27.js.
// Checks the MANIFEST block of climb batch 28 (gen28.py's output, $OUT28/manifest28.js) spliced into a scratch copy
// of the workflow script, $OUT28/wf-spliced-28.js, and with --write splices it into the tracked script. As
// check27.js: node --check on the original and the spliced copy; both parsed as the body of an async function, as the
// Workflow harness parses them, their export made const; every line outside the block byte-identical; the block
// evaluated with the script's own load checks and scatter order; the batch's rungs (lists28.py's IDS, V, R, A, K, H,
// S and T, in that order, less any that --without names), their fields, no rung bringing a gate step, declaring a
// checker count, a crash or a ladder move, or landing only with another; each section equal to the rung's section of
// the record (backticks dropped, the ellipsis character as three full stops, the minus sign as a hyphen-minus);
// briefing, reasons and checks equal to lists28.py's, one reason per key, checks a sub-list of the briefing; no
// rung's test the stage; no backtick in any string the agents read; no text asking a skeptic to see a failure again
// or a stage re-run without a code change (the coordinator skill's references/batch.md, "The workflow"); no
// LEDGER_FROM; the record holding no copy of the block; the slug, path, expected minutes, title, blurb and points of
// each rung against section 1; the strings the agents read holding no character outside ASCII but those a section
// keeps from the record (KEPT), and the spliced script none, those being \u escapes.
// Changed from check27.js: the batch's values (28, CLIMB-BATCH-28.md, lists28.py, $OUT28, manifest28.js); seven
// rungs, none landing only with another, and the "Fields common to the seven rungs" as the record gives them; KEPT
// the left arrow of T's stack alone; the stages (fork 3): V's "The stages." paragraph gives the two stages' commands,
// R's, A's, H's and S's say "Both, once each on your final tree, as rung V's section gives the commands with your
// slug (fork 3)", K's "The measure." names P-148's three count runs, base, change and pass, and the distance once on
// its final tree, and T's opens "Neither"; P-148 named in K's section, in T's only in its sentence for a fix that must
// change the checker (fork T1), and in no other, and the intro naming P-148 and a speed pass only beside K; the
// briefings against section 1's bullets key by key, a bullet's key being a code span, REC or PROBES and a code span,
// a ledger row or an entry's number: each key in order, its (check) mark and its reason (its first letter either
// case), and the bullet's counts. The record's one forks key, REC "Forks the batch takes, none consequential", stands
// in each briefing for its forks keys, read here from the record, not from lists28.py: the key of section 3's bold
// lead "For the whole batch", the rung's own lead, then the lead of each rung of the block, in the manifest's order,
// that section 4's "The files that two rungs share" lists beside it, each lead's words held by that lead alone, the
// own key with the record's reason and each other rung's reason naming the files they share. No string the agents
// read names a path under .claude/skills/ or revival-changes.md, which tools/workflow-scenarios.js refuses in every
// brief. Its last lines say whether the tracked script's block equals the generated one, and count the problems;
// it exits 1 on any.
//   node check28.js [--without <rung>]... [--write] [RECORD]      RECORD defaults to explorations/coordinator/CLIMB-BATCH-28.md
// --without <rung> checks the block that gen28.py writes with the same argument: the batch's rungs less that one.
const fs = require('fs')
const cp = require('child_process')
const path = require('path')
const ROOT = process.env.FORTRESS_HOME || path.resolve(__dirname, '../../../..')
const HERE = process.env.OUT28 || path.join(ROOT, 'tmp')
const SRC = path.join(ROOT, 'explorations/coordinator/climb-batch-workflow.js')
const argv = process.argv.slice(2)
const WRITE = argv.includes('--write')
const WITHOUT = argv.map((a, i) => argv[i - 1] === '--without' ? a : null).filter(a => a !== null)
const BATCH_NAME = '28'
const idsPy = cp.spawnSync('python3', ['-B', '-c', 'import sys; sys.path.insert(0, sys.argv[1]); from lists28 import IDS; print(",".join(IDS))', __dirname], { encoding: 'utf8' })
if (idsPy.status !== 0) { console.log('lists28.py not read: ' + idsPy.stderr.trim().slice(0, 300)); process.exit(2) }
const ALL_IDS = idsPy.stdout.trim().split(',')
const RUN_IDS = ALL_IDS.filter(x => !WITHOUT.includes(x))
if (WITHOUT.some(x => !ALL_IDS.includes(x))) { console.log('--without names a rung not in the batch'); process.exit(2) }
const STAGE_RUNGS = []
// K changes the checker's checking code: its measure is P-148's, the count stage three times and the distance once.
const CHECKER_RUNGS = ['K']
// The rungs whose "The stages." paragraph runs the count stage and the distance stage once each on their final tree
// (fork 3), each changing text that both stages read; V's gives the commands. K's measure runs them (above); T changes
// only the code generator, which neither stage runs, and says "Neither".
const STAGES_RUNGS = ALL_IDS.filter(x => x !== 'K' && x !== 'T')
// The characters outside ASCII that a section keeps from the record, as gen28.py's KEPT: written as \u escapes.
const KEPT = '\u2190'
const nonAscii = (t, keep) => [...t].filter(c => c.charCodeAt(0) > 127 && !(keep || '').includes(c))
// No rung lands only with another (the record's fork 1, section 1's common fields).
const LANDS_ONLY_WITH = Object.fromEntries(ALL_IDS.map(x => [x, []]))
const REC = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--without')[0] || path.join(ROOT, 'explorations/coordinator/CLIMB-BATCH-28.md')
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
  say(r.BATCH === BATCH_NAME && r.BATCH_RECORD === 'explorations/coordinator/CLIMB-BATCH-28.md' && r.BRIEFING_LISTS === 'explorations/compile-ladder/plan-28/manifest/lists28.py' && ids === RUN_IDS.join(', ') && r.SCATTER.map(x => x.id).join('') === order, 'batch ' + BATCH_NAME + ', its record and lists, the rungs ' + RUN_IDS.join(', ') + ' and the scatter by expected minutes, ' + order)
  say(r.ledgerFrom === 'undefined', 'no LEDGER_FROM: the gather numbers the new rows through ledger.py')
  say(r.RUNGS.every(x => Array.isArray(x.gateJoins) && !x.gateJoins.length), 'no rung brings a gate step: testSpecData runs from the last landed summary')
  say(r.RUNGS.every(x => JSON.stringify(x.landsOnlyWith || []) === JSON.stringify(LANDS_ONLY_WITH[x.id])), 'no rung lands only with another: ' + r.RUNGS.map(x => x.id + ' [' + (x.landsOnlyWith || []).join(', ') + ']').join(', '))
  say(r.RUNGS.every(x => x.expectedCheckerCrash === undefined && Array.isArray(x.expectedMoves) && !x.expectedMoves.length), 'no rung declares a crash or a ladder move')
  say(r.RUNGS.every(x => x.expectedCheckerCount === undefined), 'no rung declares a checker count: it is reported, never red')

  // The record's section 4, rung by rung, as gen28.py reads it.
  const rec = fs.readFileSync(REC, 'utf8')
  const s4 = rec.slice(rec.indexOf('\n## 4. The rungs\n'), rec.indexOf('\n## 5. '))
  const asAscii = (t) => t.replace(/`/g, '').replace(/…/g, '...').replace(/−/g, '-')
  const REC_KEY = 'doc:explorations/coordinator/CLIMB-BATCH-28.md#'
  const PROBES_KEY = 'doc:explorations/compile-ladder/plan-28/PROBES.md#'
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
    const keys = br ? br.items.map(it => {
      const k = /^(`[^`]+`|REC `[^`]+`|PROBES `[^`]+`|ledger:[0-9]+|[PF]-[0-9]+)( \(check\))?: (.*)$/.exec(it)
      if (!k) return { bad: it }
      const key = k[1].startsWith('REC `') ? REC_KEY + k[1].slice(5, -1) : k[1].startsWith('PROBES `') ? PROBES_KEY + k[1].slice(8, -1) : k[1].replace(/`/g, '')
      return { key, check: !!k[2], reason: k[3] }
    }) : []
    return { slug: field('slug'), worktree: field('worktree'), section: field('section'), blurb: field('blurb'), landsOnlyWith: field('lands only with'),
      points: pts ? pts.items.map(p => asAscii(p.trim())) : [], counts: cm ? [+cm[1], +cm[2]] : null, keys }
  }
  const common = (() => { const a = s1.indexOf('\nFields common to the seven rungs:\n'); return a < 0 ? '' : s1.slice(a, s1.indexOf('\n### ', a)) })()
  say(/\*\*writes state:\*\* no\./.test(common) && /\*\*its test is the stage:\*\* no\./.test(common) && /\*\*joins the gate:\*\* none\./.test(common) &&
    /\*\*expected moves:\*\* none\./.test(common) && /\*\*lands only with:\*\* none: no rung builds on another/.test(common) && /\*\*expected checker count:\*\* none declared/.test(common) &&
    /\*\*expected checker crash:\*\* none declared\./.test(common), 'the record\'s fields common to the seven rungs: no state, no stage as the test, no gate step, no move, none landed only with another, no count or crash declared')
  // lists28.py's briefings, reasons and checks, for the rungs of the block.
  const py = cp.spawnSync('python3', ['-B', '-c', 'import json, sys; sys.path.insert(0, sys.argv[1]); from lists28 import lists; ' +
    'L, R = lists(tuple(sys.argv[2].split(","))); print(json.dumps({r: {"briefing": L[r][0], "checks": L[r][1], "reasons": [x for _, x in R[r]]} for r in L}))', __dirname, RUN_IDS.join(',')], { encoding: 'utf8' })
  const lists = py.status === 0 ? JSON.parse(py.stdout) : null
  say(!!lists, 'lists28.py read' + (lists ? '' : ': ' + py.stderr.trim().slice(0, 300)))
  // Section 3's forks: the bold leads of its "Forks the batch takes, none consequential", each a key's words, and
  // section 4's files that two rungs share, which give each rung the forks of the rungs beside it.
  const FORKS_HEAD = 'Forks the batch takes, none consequential'
  const FORKS_KEY = REC_KEY + FORKS_HEAD
  const fs3 = (() => { const a = rec.indexOf('\n### ' + FORKS_HEAD + '\n'); if (a < 0) return ''; const rest = rec.slice(a + 1); const e = rest.search(/\n#{1,3} /); return e < 0 ? rest : rest.slice(0, e) })()
  const leads = fs3.split('\n').filter(l => l.startsWith('**')).map(l => { const c = l.indexOf('**', 2); return c > 2 ? l.slice(2, c) : l })
  // As facts-extract.sh matches WORDS: whole words, case and backticks ignored.
  const fold = (t) => t.replace(/[`"]/g, '').replace(/\s+/g, ' ').trim().toLowerCase()
  const holdsAll = (words, t) => words.split(' ').every(w => new RegExp('(?<!\\w)' + w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\w)').test(fold(t)))
  const leadWords = (id) => id === 'batch' ? 'For the whole batch' : 'Rung ' + id
  for (const id of ['batch'].concat(RUN_IDS)) {
    const hits = leads.filter(l => holdsAll(leadWords(id), l))
    say(hits.length === 1 && (id === 'batch' ? hits[0] === 'For the whole batch' : new RegExp('^Rung ' + id + '(,|$)').test(hits[0])),
      'section 3: the words "' + leadWords(id) + '" are held by one bold lead of its forks, ' + (hits.length ? hits.map(h => '"' + h + '"').join(', ') : 'none'))
  }
  const shareLines = (() => { const a = s4.indexOf('\n- The files that two rungs share'); if (a < 0) return []; const ls = s4.slice(a + 1).split('\n'); const out = []; for (let i = 1; i < ls.length && ls[i].startsWith('  - '); i++) out.push(ls[i]); return out })()
  const shared = shareLines.map(l => { const m = /^  - `([^`]+)`: (.*)$/.exec(l); return m ? { file: m[1], rungs: m[2].split('; ').map(p => p.trim().charAt(0)) } : null })
  say(shared.length > 0 && shared.every(f => f && f.rungs.length > 1 && f.rungs.every(x => ALL_IDS.includes(x))),
    'section 4: the files that two rungs share, ' + shared.map(f => f ? path.basename(f.file) + ' ' + f.rungs.join('') : 'an unread line').join(', '))
  const sharedFiles = (id, o) => shared.filter(f => f && f.rungs.includes(id) && f.rungs.includes(o)).map(f => path.basename(f.file))
  const forksOf = (id) => [FORKS_KEY + '@' + leadWords('batch'), FORKS_KEY + '@' + leadWords(id)].concat(
    RUN_IDS.filter(o => o !== id && sharedFiles(id, o).length).map(o => FORKS_KEY + '@' + leadWords(o)))
  const rerun = /sees? it fail again|re-?run by the skeptic|skeptic re-?runs|run the stage yourself|skeptic rebuilds|re-anchor/i
  const vSection = section('V')
  say(!!vSection && /\*\*The stages\.\*\* Both, once each on your final tree \(fork 3\), from the tree's root after ant compileAll:/.test(vSection) &&
    /checker-count\/run\.sh tmp\/rung-integer-conversions\//.test(vSection) && /distance\/run\.sh tmp\/rung-integer-conversions\//.test(vSection),
    'the record\'s V section gives the stages\' commands, which the other sections cite')
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
      JSON.stringify(x.reasons) === JSON.stringify(l.reasons.map(asAscii)), x.id + ': briefing ' + x.briefing.length + ' keys, reasons ' + x.reasons.length + ', checks ' + x.checks.length + ', as lists28.py has them')
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
    const stages = /\*\*The stages\.\*\* (Both, once each on your final tree \(fork 3\), from the tree's root after ant compileAll:|Both, once each on your final tree, as rung V's section gives the commands with your slug \(fork 3\))/
    if (STAGES_RUNGS.includes(x.id)) say(stages.test(x.section) && !/run neither/.test(x.section), x.id + ': its section names the count stage and the distance stage as stages its rung runs once on its final tree' + (x.id === 'V' ? ', with their commands' : ', by rung V\'s commands'))
    else if (CHECKER_RUNGS.includes(x.id)) say(/\*\*The measure\.\*\* P-148's/.test(x.section) && /the count stage on the base build and on your change, base and change, then pass after the second pass/.test(x.section) &&
      /Then the distance stage once on your final tree, as rung V's section gives the command with your slug/.test(x.section) && !/run neither/.test(x.section) && !/no speed pass/.test(x.section),
      x.id + ': a rung that changes the checker, its measure P-148\'s: the count stage three times, base, change and pass, and the distance once on its final tree')
    else say(/\*\*The stages\.\*\* Neither[:,] /.test(x.section) && !stages.test(x.section), x.id + ': its section says it runs neither stage (fork 3)')
    if (CHECKER_RUNGS.includes(x.id)) say(/P-148/.test(x.section), x.id + ': its section names P-148')
    else if (x.id === 'T') say(!/speed pass/.test(x.section) && (x.section.match(/P-148/g) || []).length === 1 && /If the fix must change the checker's trait table, it is a change of checking code: take P-148's measure/.test(x.section), x.id + ': its section names no speed pass, and P-148 only for a fix that must change the checker (fork T1)')
    else say(!/P-148/.test(x.section) && !/speed pass/.test(x.section), x.id + ': a rung outside the checker, its section names no speed pass and no P-148')
    // The record's section 1: the rung's briefing bullets, key by key, and their counts; its one forks key stands for
    // the rung's forks keys, made above from the record.
    const bk = b ? b.keys : []
    const fi = bk.findIndex(k => k.key === FORKS_KEY)
    const fk = forksOf(x.id)
    say(fi >= 0 && bk.filter(k => k.key === FORKS_KEY).length === 1 && !bk[fi].check, x.id + ': the record\'s briefing names the forks once, not as a check; its forks keys: ' + fk.map(k => k.split('@').pop()).join(', '))
    const wantKeys = fi < 0 ? bk : bk.slice(0, fi).concat(fk.map(k => ({ key: k, check: false, fork: true })), bk.slice(fi + 1))
    say(!!b && !!b.counts && b.counts[0] === bk.length && b.counts[1] === bk.filter(k => k.check).length && x.briefing.length === wantKeys.length && x.checks.length === b.counts[1],
      x.id + ': the record\'s briefing gives ' + (b && b.counts ? b.counts[0] + ' keys and ' + b.counts[1] + ' checks' : 'no counts') + ', lists ' + bk.length + ' and marks ' + bk.filter(k => k.check).length + ' (check); lists28.py ' + x.briefing.length + ' and ' + x.checks.length + ', its one forks key as ' + fk.length)
    const lc = (t) => t.charAt(0).toLowerCase() + t.slice(1)
    const diff = []
    if (bk.some(k => k.bad)) diff.push('unread bullets: ' + bk.filter(k => k.bad).map(k => k.bad.slice(0, 80)).join(' | '))
    if (JSON.stringify(wantKeys.map(k => k.key)) !== JSON.stringify(x.briefing)) diff.push('the keys differ: ' + x.briefing.filter((k, i) => !wantKeys[i] || wantKeys[i].key !== k).map(k => k.slice(0, 80)).join(' | '))
    if (JSON.stringify(wantKeys.filter(k => k.check).map(k => k.key)) !== JSON.stringify(x.checks)) diff.push('the checks differ')
    wantKeys.forEach((k, i) => {
      const got = x.reasons[i]
      if (got === undefined || k.bad) return
      if (!k.fork) { if (lc(k.reason) !== lc(got)) diff.push(k.key.slice(0, 60) + ' -> ' + got); return }
      const o = k.key.split('@Rung ')[1]
      if (k.key === FORKS_KEY + '@' + leadWords(x.id)) { if (fi >= 0 && lc(bk[fi].reason) !== lc(got)) diff.push('its own forks -> ' + got) }
      else if (o && !(got.startsWith('Rung ' + o + '\'s defaults') && JSON.stringify((got.match(/[A-Za-z]+\.(fss|fsi|java)/g) || []).sort()) === JSON.stringify(sharedFiles(x.id, o).sort()))) diff.push('rung ' + o + '\'s forks: the reason names other files than ' + sharedFiles(x.id, o).join(', ') + ' -> ' + got)
      else if (!o && !/whole batch/.test(got)) diff.push('the batch\'s forks -> ' + got)
    })
    say(!!b && !diff.length, x.id + ': every key, its (check) mark and its reason are the record\'s, in its order, its forks keys in place of its one' + (diff.length ? '; ' + diff.join('; ') : ''))
  }
  say(!/[^\x00-\x7f]|`/.test(r.BATCH_INTRO) && !rerun.test(r.BATCH_INTRO) && !/revival-changes\.md|\.claude\/skills\//.test(r.BATCH_INTRO), 'the intro: ASCII, no backtick, no re-run, no skill path')
  const introSentences = r.BATCH_INTRO.split(/(?<=[.;])\s+|\n+/)
  say(/Only K changes the checker's checking code, and it makes P-148's speed pass\./.test(r.BATCH_INTRO) && introSentences.filter(t => /P-148|speed pass/.test(t)).every(t => /\bK\b/.test(t)),
    'the intro says only K changes the checker\'s checking code and makes P-148\'s speed pass, and names P-148 and a speed pass only beside K')
  say(/Every rung but T changes text that the stages read, so each runs the count stage and the distance stage once on its final tree/.test(r.BATCH_INTRO), 'the intro: every rung but T runs the two stages once on its final tree')
  const paths = r.RUNGS.map(x => x.path), slugs = r.RUNGS.map(x => x.slug)
  say(new Set(paths).size === paths.length && new Set(slugs).size === slugs.length, 'every rung has its own worktree and branch')
  say(!/[^\x00-\x7f]/.test(spliced) && !/[^\x00-\x7f]/.test(block), 'the block and the spliced script hold no character outside ASCII: the kept ones are \\u escapes')
  say(!rec.includes('const RUNGS') && !rec.includes('_ENTRY = {') && rec.includes('gen28.py') && rec.includes('check28.js'), 'the record names gen28.py and check28.js and holds no copy of the block')
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
