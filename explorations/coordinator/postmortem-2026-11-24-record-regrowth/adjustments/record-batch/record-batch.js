export const meta = {
  name: 'record-batch',
  description: 'The batch mode of the record consolidation, around the clarity workflow: the sorting (the claims of each chunk of the record as it stands, then one map), a scout for each chunk, the pilot in two rounds and then the chunks, each as a child run of the clarity workflow, the test of decisions, the step in which whole entries leave, and a sweep that only deletes; a run ends where the curator or the coordinator acts, and nothing is applied to the record',
  whenToUse: 'A consolidation of the whole record by the method of October 2026; its README gives the ways in',
  phases: [
    { title: 'Claims', detail: 'the sorting, step 1: the claims of each entry by subject and kind, one file for each chunk of the record as it stands', model: 'opus' },
    { title: 'Map', detail: 'the sorting, step 2: one map of subjects, overlaps and dispositions, the chunks for the writers and the pilot', model: 'opus' },
    { title: 'Scouts', detail: 'one scout for each chunk of the run: scout.md in the chunk folder', model: 'sonnet' },
    { title: 'Pilot 1', detail: 'the clarity workflow on the mix of cases that the map names; then the curator\'s go', model: 'opus' },
    { title: 'Pilot 2', detail: 'the clarity workflow on one whole chunk; then the curator\'s go', model: 'opus' },
    { title: 'Chunks', detail: 'the clarity workflow on this run\'s share of the chunks; the coordinator applies each', model: 'opus' },
    { title: 'Test', detail: 'the record test: two copies, two readers, one grader', model: 'opus' },
    { title: 'Leave', detail: 'the entries that are not about the project leave whole, as an apply file', model: 'opus' },
    { title: 'Sweep', detail: 'state words and planning pointers deleted, as an apply file checked by words-subset.py', model: 'opus' },
  ],
}

// args (README.md, "How to run it"):
//   out        the batch folder, absolute, inside an evidence/ folder, ending in /; every stage writes under it
//   from, to   the run's first and last stage, of ORDER; a run ends at the first stop in its range in any case
//   kind       'facts' (default) or 'positions', for the scouts and the clarity runs; the sorting reads FACTS only
//   base       the commit of main whose record the scouts read
//   record     claims: the record as it stands, in chunks [{ name, entries }]
//   checks     claims: files of earlier checks of those entries (optional)
//   asked      map: entries that the curator asked about (optional)
//   scenarios  map and test: the folder of the test's scenarios, ending in /
//   pilot      pilot-1, when the map does not run in this run: the entries of the mix of cases
//   chunks     pilot-2: the one chunk of the second round; chunks: this run's share [{ name, entries }]
//   stream     the clarity child's writer stream; give each run side by side its own
//   scouts     false: no scouts before the writing stage, because an earlier run wrote each scout.md
//   test       { p, q or applies, x }: the commit of the old entries; the commit of the new ones, or the apply
//              files that make them in a copy of p; which copy the grader sees as X, 'new' (default) or 'old'
//   leave      the entries that leave (optional; by default those that the map marks not about the tree)
// The briefs are in B; each agent reads its brief, and its launch message gives the brief's placeholders.
// The clarity workflow runs as a child (one level deep); its agents share this run's two at once.
const B = '/home/user/fortress/explorations/coordinator/postmortem-2026-11-24-record-regrowth/adjustments/record-batch/briefs/'
const RC = '/home/user/fortress/explorations/coordinator/tools/record-clarity/record-clarity.js'
const KIT = '/home/user/fortress/explorations/coordinator/process-engineering/record-test/'
const ORDER = ['claims', 'map', 'scouts', 'pilot-1', 'pilot-2', 'chunks', 'test', 'leave', 'sweep']
const STOPS = ['pilot-1', 'pilot-2', 'chunks', 'leave', 'sweep']
const WRITES = { 'pilot-1': 'Pilot 1', 'pilot-2': 'Pilot 2', chunks: 'Chunks' }
if (!args || !/^\/.+\/$/.test(args.out || '')) throw new Error('args.out: the batch folder, absolute, ending in /; README.md, "How to run it"')
const at = (s) => { const i = ORDER.indexOf(s); if (i < 0) throw new Error('unknown stage ' + s + '; the stages: ' + ORDER.join(', ')); return i }
const FROM = at(args.from || 'claims')
const TO = Math.min(ORDER.findIndex((s, i) => i >= FROM && STOPS.includes(s)), args.to ? at(args.to) : ORDER.length)
if (TO < FROM) throw new Error('args.to comes before args.from')
const runs = (s) => at(s) >= FROM && at(s) <= TO
const OUT = args.out, SORT = OUT + 'sorting/', CH = OUT + 'chunks/'
const KIND = args.kind || 'facts', FILE = KIND === 'facts' ? 'FACTS' : 'POSITIONS'
const ok = (xs) => (xs || []).filter(e => /^[FP]-\d+$/.test(e))
const cut = (s, n) => (s ? String(s).slice(0, n) : null)
const fill = (file, vals, extra) => 'Your brief is the file ' + file + '. Read it whole and follow it. Each placeholder in it stands for its value here:\n' +
  Object.keys(vals).map(k => '@' + k + '@ = ' + vals[k]).join('\n') + (extra ? '\n\n' + extra : '')
// The writing stage that this run reaches (at most one, since each is a stop), and the scouts before it.
const W = ['pilot-1', 'pilot-2', 'chunks'].find(s => at(s) >= Math.max(FROM, at('scouts')))
const writing = Boolean(W) && runs(W)
const scouting = Boolean(W) && (runs('scouts') || writing) && args.scouts !== false
const mapHere = runs('map') && (scouting || writing)
const given = W === 'pilot-1' ? [{ name: 'pilot-1', entries: ok(args.pilot) }] : (args.chunks || []).map(c => ({ name: c.name, entries: ok(c.entries) }))
const bad = (cs) => !cs.length || cs.some(c => !c.name || !c.entries.length)

// Every argument is checked here, before the first agent.
const need = []
if ((runs('claims') || runs('map')) && KIND !== 'facts') need.push('kind: the sorting reads FACTS only')
if (runs('claims') && !(args.record || []).length) need.push('record: the record as it stands, in chunks [{ name, entries }]')
if ((runs('map') || runs('test')) && !/^\/.+\/$/.test(args.scenarios || '')) need.push('scenarios: the folder of the test scenarios, absolute, ending in /')
if (scouting && !args.base) need.push('base: the commit of main whose record the scouts read')
if ((scouting || writing) && !mapHere && bad(given)) need.push(W === 'pilot-1' ? 'pilot: the entries of the mix of cases' : 'chunks: each with a name and its entries')
if (runs('test') && !(args.test && args.test.p && (args.test.q || (args.test.applies || []).length))) need.push('test: { p, q or applies, x }')
if (need.length) throw new Error('args, for the stages ' + ORDER.slice(FROM, TO + 1).join(', ') + ': ' + need.join('; ') + '. README.md, "How to run it".')

const result = { out: OUT, stages: ORDER.slice(FROM, TO + 1) }
const end = (next) => Object.assign(result, { next })
log('stages: ' + result.stages.join(', ') + (scouting && !runs('scouts') ? ', with the scouts of ' + W : ''))

// The coordinator's part after each stop; the README's "After each stop" gives it in full.
const NEXT = {
  'claims': 'The claims are written; the map follows: from map (README, "After each stop").',
  'map': 'Read the map; then the pilot, first round: from scouts, with pilot from this result (README, "After each stop").',
  'scouts': 'The scouts are done; the writing stage ' + W + ' follows: from ' + W + ', with scouts false (README, "After each stop").',
  'pilot-1': 'Show the curator the round as a page from ' + CH + 'pilot-1/ and wait for his go; meanwhile the test on the pilot. Apply nothing before his go (README, "After each stop").',
  'pilot-2': 'Show the curator the chunk as a page and wait for his go; on his go apply it; then share the other chunks among runs side by side, in runs.json (README, "After each stop").',
  'chunks': 'Apply each chunk of this run, one after another, by the clarity README, "After a chunk"; when all runs are applied, the test on the result (README, "After each stop").',
  'test': 'Unblind with x below, read grade/grades.md, and report by the new and the old entries (README, "After each stop").',
  'leave': 'Apply the apply file in ' + OUT + 'leave/ on a copy, check it, then on main; commit and push (README, "After each stop").',
  'sweep': 'Apply scrape.apply in ' + OUT + 'sweep/ the same way; add the backlinks that backlinks.md lists as missing (README, "After each stop").',
}

// The sorting (FACTS only): the claims of each chunk of the record as it stands, then one map of them all.
if (runs('claims')) {
  phase('Claims')
  const rec = args.record
  const checks = (args.checks || []).length ? 'The files of earlier checks of these entries: ' + args.checks.join(', ') + '.' : 'No file of earlier checks is given for this run.'
  const r = await parallel(rec.map(c => () => agent(fill(B + 'claims.txt', { SORT, CHECKS: checks },
    'Your chunk: ' + c.name + '. Its entries: ' + ok(c.entries).join(', ') + '. Write one file for it.'), { label: 'claims ' + c.name, phase: 'Claims', model: 'opus' })))
  result.claims = r.map((x, i) => rec[i].name + ': ' + (cut(x, 600) || 'returned nothing'))
  if (r.some(x => !x)) return end('A claims worker returned nothing: read its transcript and ' + SORT + ', then resume the run.')
  if (TO === at('claims')) return end(NEXT.claims)
}
let map = null
if (runs('map')) {
  phase('Map')
  const LIST = { type: 'array', items: { type: 'string' } }
  const SCHEMA = {
    type: 'object',
    properties: {
      commit: { type: 'string' },
      chunks: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, entries: LIST }, required: ['name', 'entries'] } },
      cases: { type: 'array', items: { type: 'object', properties: { kind: { type: 'string' }, entries: LIST }, required: ['kind', 'entries'] } },
      second: { type: 'string' },
      summary: { type: 'string' },
    },
    required: ['commit', 'chunks', 'cases', 'second', 'summary'],
  }
  map = await agent(fill(B + 'map.txt', {
    SORT, CLAIMS: B + 'claims.txt', SCENARIOS: args.scenarios,
    ASKED: ok(args.asked).length ? 'Include ' + ok(args.asked).join(', ') + ' if it fits a case, since the curator asked about it.' : '',
  }, 'Return the final message that your brief asks for in summary, the commit in commit, the chunks of the map\'s section 6 in chunks, in the order in which they must be applied, the cases of its section 7 in cases, and the chunk of its second round, by name, in second.'),
  { label: 'map', phase: 'Map', model: 'opus', effort: 'xhigh', schema: SCHEMA })
  if (!map) return end('The map returned nothing: read its transcript and ' + SORT + ', then resume the run.')
  result.map = { commit: map.commit, chunks: map.chunks, cases: map.cases, second: map.second, summary: cut(map.summary, 3000) }
  if (TO === at('map')) return end(NEXT.map)
}

// The scouts, one for each chunk of the writing stage, then that stage: the clarity workflow itself, as a child.
const target = mapHere ? [{ name: 'pilot-1', entries: [...new Set(map.cases.flatMap(c => ok(c.entries)))] }] : given
if (mapHere && bad(target)) return end('The map named no entry for the pilot\'s first round: read MAP.md, section 7, and give pilot (README, "How to run it").')
if (scouting) {
  phase('Scouts')
  const r = await parallel(target.map(c => () => agent(fill(B + 'scout.txt', {
    CHUNK: FILE + ', the entries ' + c.entries.join(', ') + ' of explorations/coordinator/' + FILE + '.md (the chunk ' + c.name + '). FILE is ' + FILE + '; the history file is ' + FILE + '-history.md.',
    OUT: CH + c.name + '/scout.md', BASE: args.base,
  }), { label: 'scout ' + c.name, phase: 'Scouts', model: 'sonnet' })))
  result.scouts = r.map((x, i) => target[i].name + ': ' + (cut(x, 300) || 'returned nothing'))
  if (!writing) return end(NEXT.scouts)
}
if (writing) {
  phase(WRITES[W])
  const stream = args.stream || 'batch-' + target[0].name
  let r
  try {
    r = await workflow({ scriptPath: RC }, { kind: KIND, out: CH, stream, chunks: target })
  } catch (e) {
    return end('The clarity workflow did not start: ' + e.message)
  }
  result[W] = { stream, chunks: (r || []).map((x, i) => target[i].name + ': ' + (x ? (x.skipped || cut(x.judge, 600) || 'no judgement') : 'returned nothing')) }
  return end(NEXT[W])
}

// The test of decisions: the kit's copies and filled scenarios, two readers, one grader.
if (runs('test')) {
  phase('Test')
  const t = args.test
  const D = OUT + 'test/'
  const Q = t.q ? 'at the commit ' + t.q : 'made at the commit ' + t.p + ' as copy p is, and then each of these apply files applied in it with explorations/coordinator/tools/record.py apply FILE --root /home/user/record-test-q: ' + t.applies.join(', ')
  const prep = await agent(fill(B + 'test-copies.txt', { SCENARIOS: args.scenarios, P: t.p, Q, DIR: D, WORK: OUT.replace('/home/user/fortress/', '') }),
    { label: 'test copies', phase: 'Test', model: 'opus' })
  if (!prep) return end('The test copies returned nothing: read its transcript, then resume the run.')
  const X = t.x === 'old' ? 'p' : 'q'
  const arm = (c) => (c === X ? 'X' : 'Y')
  const readers = await parallel(['p', 'q'].map(c => () => agent(fill(KIT + 'brief-reader.md', {
    DIR: '/home/user/record-test-' + c, QUESTIONS: D + 'questions-' + c + '.md', OUT: D + 'grade/answers-' + arm(c) + '.md',
  }), { label: 'reader ' + arm(c), phase: 'Test', model: 'opus' })))
  if (readers.some(x => !x)) return end('A reader returned nothing: read its transcript, then resume the run.')
  const g = await agent(fill(B + 'test-grader.txt', { DIR: D }), { label: 'grader', phase: 'Test', model: 'fable' })
  result.test = { copies: cut(prep, 1200), grader: cut(g, 1500), x: X === 'q' ? 'X is the new entries, Y the old' : 'X is the old entries, Y the new' }
  if (!g) return end('The grader returned nothing: read its transcript, then resume the run.')
  if (TO === at('test')) return end(NEXT.test)
}

// The step in which whole entries leave, and the sweep: each writes an apply file for the coordinator.
if (runs('leave')) {
  phase('Leave')
  const which = ok(args.leave).length ? ok(args.leave).join(', ') : 'each entry that the map, ' + SORT + 'MAP.md, section 5, marks as not about the tree'
  result.leave = cut(await agent(fill(B + 'leave.txt', { LEAVE: which, OUT: OUT + 'leave/' }), { label: 'leave', phase: 'Leave', model: 'opus' }), 1500)
  return end(NEXT.leave)
}
if (runs('sweep')) {
  phase('Sweep')
  result.sweep = cut(await agent(fill(B + 'sweep.txt', { OUT: OUT + 'sweep/' }), { label: 'sweep', phase: 'Sweep', model: 'opus' }), 1500)
  return end(NEXT.sweep)
}
return end('Nothing more in this range.')
