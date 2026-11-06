export const meta = {
  name: 'ledger-pass',
  description: 'The gap ledger\'s full pass, one run of a list of chunks of open rows: a script\'s evidence and mechanical checks for every row (a Sonnet driver runs it); per chunk an Opus writer who assesses each row and writes its line, close, duplicate or question, a cold reader of the rewritten lines, a checker and a judge who applies or holds each once; one Opus prober for the run\'s measure questions, whose chunk is read, checked and judged in turn; with land true, land.sh applies the judged output on main under its guard and lock, checks, commits and pushes',
  phases: [
    { title: 'Evidence', detail: 'evidence.py over the run\'s rows: cited lines, commits, tests, overlaps, record lines, refused notes, signals, reproducer runs', model: 'sonnet' },
    { title: 'Write', detail: 'per chunk: each row assessed from its evidence and given keep, rewrite, close, duplicate or measure; mech.py', model: 'opus' },
    { title: 'Read', detail: 'the cold reader: the rewritten lines with only the worker skill', model: 'opus' },
    { title: 'Check', detail: 'mech.py, fidelity against the tree, the cold read against the meaning, the keeps lightly', model: 'opus' },
    { title: 'Judge', detail: 'apply or hold each row once; the final files; mech.py --final', model: 'opus' },
    { title: 'Probe', detail: 'the run\'s measure questions run from the main tree\'s build in private caches; that chunk then read, checked and judged', model: 'opus' },
    { title: 'Land', detail: 'only with land true: land.sh, the guarded apply on main, the checks, the commit and the pushes', model: 'sonnet' },
  ],
}

// args: { name: 'c-run1', out: '/home/user/fortress/tmp/ledger-pass/c-run1/', chunks: [{ name: 'c1', rows: ['349', '381'] }],
//         probe: true (the default), land: false (the default) }
// chunks.py writes these arguments, one object per run. Every chunk writes only into out + its name + '/', the
// prober into out + name + '-probe/', and evidence.py its run files into out + 'run/'; out lies under the main
// tree's tmp/, which git ignores, so a batch's gather still finds the main tree clean. A run gives the workflow
// data, never rules: the briefs beside this script are its rules, and change only at the curator's yes.
// Without land, the coordinator lands the run with land.sh (README.md, "Landing a run"); with land, the last
// stage runs land.sh itself, which refuses to land while a gather's edits are in the main tree.
const T = '/home/user/fortress/explorations/coordinator/tools/ledger-pass/'
const RC = '/home/user/fortress/explorations/coordinator/tools/record-clarity/'
if (!args || !args.name || !args.out || !Array.isArray(args.chunks) || !args.chunks.length) throw new Error('args: { name, out, chunks: [{ name, rows }], probe, land }')
const NAME = String(args.name)
const OUT = String(args.out).endsWith('/') ? String(args.out) : String(args.out) + '/'
const PROBE = args.probe !== false
const LAND = args.land === true
const seen = new Set()
for (const c of args.chunks) {
  if (!c.name || !Array.isArray(c.rows) || !c.rows.length) throw new Error('each chunk needs a name and a list of rows')
  if (seen.has(c.name)) throw new Error('two chunks are named ' + c.name)
  seen.add(c.name)
}
const cut = (s, n) => (s ? String(s).slice(0, n) : null)
const chunks = args.chunks.map(c => ({ name: String(c.name), rows: c.rows.map(String), dir: OUT + c.name + '/' }))
const tell = (x) => 'Your run: ' + NAME + '. The run\'s folder: ' + OUT + '. Your chunk: ' + x.name + '. Its rows: ' + x.rows.join(', ') + '. Your folder: ' + x.dir
const WRITE = {
  type: 'object',
  properties: {
    keep: { type: 'integer' }, rewrite: { type: 'integer' }, close: { type: 'integer' },
    duplicate: { type: 'integer' }, measure: { type: 'integer' },
    summary: { type: 'string', description: 'each row\'s disposition and one-line change, and mech.py\'s last line' },
  },
  required: ['keep', 'rewrite', 'close', 'duplicate', 'measure', 'summary'],
}

phase('Evidence')
const done = OUT + 'evidence.done', elog = OUT + 'evidence.log'
const spec = chunks.map(x => '--chunk ' + x.name + '=' + x.rows.join(',')).join(' ')
const ev = await agent(['You drive a long command and report its output; you judge nothing and write nothing else.',
  '1. If ' + done + ' exists, skip to step 3.',
  '2. Run this in the background with the Bash tool\'s run_in_background, exactly:',
  '   mkdir -p ' + OUT + ' && cd /home/user/fortress && python3 ' + T + 'evidence.py --out ' + OUT + ' ' + spec + ' > ' + elog + ' 2>&1; touch ' + done,
  '3. Run python3 ' + RC + 'wait.py ' + done + ' 230 in the foreground, with a timeout of 270000 ms. If it exits 1, run it again at once; repeat until it exits 0. Each wait stays under 240 s, so that your prompt cache stays warm.',
  '4. Your final message: the last 15 lines of ' + elog + ', verbatim.'].join('\n'),
  { label: 'evidence ' + NAME, phase: 'Evidence', model: 'sonnet' })
if (!ev || !/EVIDENCE DONE/.test(ev)) {
  return { run: NAME, out: OUT, stopped: 'the evidence step did not end with EVIDENCE DONE: read ' + elog + '; delete ' + done + ' before a resume', evidence: cut(ev, 1500) }
}
log('evidence: ' + cut(ev.split('\n').filter(l => /EVIDENCE DONE/.test(l))[0], 200))

const read = async (x) => {
  const r = await agent('Read your brief and follow it: ' + T + 'read.md\n\nThe file to read: ' + x.dir + 'clean.txt\nYour report: ' + x.dir + 'cold-read.md\n' +
    'Write your report in parts of four rows: write the first part to the file, then add each next part to its end, one tool call for each part. So no reply runs for minutes, and your prompt cache stays warm between your calls.',
    { label: 'read ' + x.name, phase: 'Read', model: 'opus' })
  return cut(r, 1000)
}
const check = async (x) => cut(await agent('Read your brief and follow it: ' + T + 'check.md\n\n' + tell(x) + '\nFirst run, exactly: python3 ' + T + 'mech.py ' + x.dir,
  { label: 'check ' + x.name, phase: 'Check', model: 'opus' }), 1200)
const judge = async (x) => cut(await agent('Read your brief and follow it: ' + T + 'judge.md\n\n' + tell(x) + '\nLast, run exactly: python3 ' + T + 'mech.py ' + x.dir + ' --final',
  { label: 'judge ' + x.name, phase: 'Judge', model: 'opus' }), 1200)

const res = await pipeline(chunks,
  async (x) => {
    const w = await agent('Read your brief and follow it: ' + T + 'writer.md\n\n' + tell(x) + '\nYour evidence: ' + x.dir + 'evidence/ and ' + x.dir + 'mech.tsv',
      { label: 'write ' + x.name, phase: 'Write', model: 'opus', schema: WRITE })
    if (!w) return { ...x, stopped: 'the writer returned nothing: read ' + x.dir + 'assessment.md before a resume' }
    return { ...x, counts: { keep: w.keep, rewrite: w.rewrite, close: w.close, duplicate: w.duplicate, measure: w.measure }, writer: cut(w.summary, 1200) }
  },
  async (x) => {
    if (x.stopped || !x.counts.rewrite && !x.counts.duplicate) return x
    return { ...x, read: await read(x) }
  },
  async (x) => (x.stopped ? x : { ...x, check: await check(x) }),
  async (x) => (x.stopped ? x : { ...x, judge: await judge(x) }),
)
const result = { run: NAME, out: OUT, evidence: cut(ev.split('\n').filter(l => /EVIDENCE DONE/.test(l))[0], 300), chunks: res.map(x => x ? { name: x.name, counts: x.counts, writer: x.writer, read: x.read, check: x.check, judge: x.judge, stopped: x.stopped } : null) }
const sum = (k) => res.filter(x => x && x.counts).reduce((a, x) => a + (x.counts[k] || 0), 0)
const tally = ['keep', 'rewrite', 'close', 'duplicate', 'measure'].map(k => k + ' ' + sum(k)).join(', ')

// The prober: one for the run, after its chunks, on every chunk's measure questions; its folder is a chunk of its
// own, which the cold reader, the checker and the judge then take like any other.
if (PROBE && sum('measure') > 0) {
  phase('Probe')
  const P = { name: NAME + '-probe', rows: [], dir: OUT + NAME + '-probe/' }
  const PROBED = {
    type: 'object',
    properties: { rows: { type: 'array', items: { type: 'string' }, description: 'the rows you wrote an assessment for' }, summary: { type: 'string' } },
    required: ['rows', 'summary'],
  }
  const p = await agent('Read your brief and follow it: ' + T + 'probe.md\n\nYour run: ' + NAME + '. The run\'s folder: ' + OUT + '. The chunks\' folders: ' +
    chunks.map(x => x.dir).join(', ') + '. Your folder: ' + P.dir + '. The run\'s private caches folder: ' + OUT + 'run/caches',
    { label: 'probe ' + NAME, phase: 'Probe', model: 'opus', schema: PROBED })
  result.probe = p ? { rows: p.rows, summary: cut(p.summary, 1200) } : { stopped: 'the prober returned nothing: read ' + P.dir + 'runs.md before a resume' }
  if (p && p.rows.length) {
    P.rows = p.rows.map(String)
    result.probe.read = await read(P)
    result.probe.check = await check(P)
    result.probe.judge = await judge(P)
  }
} else if (sum('measure') > 0) {
  result.probe = { skipped: 'probe false: the measure questions are in each chunk\'s questions.md, and its judge filed them in queue.md' }
}

result.line = 'ledger-pass run ' + NAME + ': ' + res.filter(x => x && x.judge).length + ' of ' + chunks.length + ' chunks judged; ' + tally +
  (result.probe && result.probe.rows ? '; the prober settled ' + result.probe.rows.length + ' row(s)' : '')

// The landing, only when the run's arguments ask for it (README.md, "Landing a run"): land.sh in the main tree.
if (!LAND) {
  result.line += '; not landed: run ' + T + 'land.sh ' + OUT + ' between batches'
  return result
}
phase('Land')
const LANDED = {
  type: 'object',
  properties: {
    last: { type: 'string', description: 'the last line of the log, verbatim: it starts LANDED, NOTHING or STOPPED' },
    commit: { type: 'string', description: 'the hash and subject on the log\'s "== committed:" line, or empty' },
    tail: { type: 'string', description: 'the last 30 lines of the log, verbatim' },
  },
  required: ['last', 'commit', 'tail'],
}
const ldone = OUT + 'land.done', llog = OUT + 'land.log'
const l = await agent(['You land a ledger-pass run on main by one script and report its output; you judge nothing and edit no file.',
  '1. If ' + ldone + ' exists, skip to step 3.',
  '2. Run this in the background with the Bash tool\'s run_in_background, exactly:',
  '   cd /home/user/fortress && bash ' + T + 'land.sh ' + OUT + ' > ' + llog + ' 2>&1; touch ' + ldone,
  '3. Run python3 ' + RC + 'wait.py ' + ldone + ' 230 in the foreground, with a timeout of 270000 ms. If it exits 1, run it again at once; repeat until it exits 0.',
  '4. Read ' + llog + ' and return the structured result from its lines.'].join('\n'),
  { label: 'land ' + NAME, phase: 'Land', model: 'sonnet', schema: LANDED })
result.land = l ? { last: cut(l.last, 400), commit: l.commit, tail: cut(l.tail, 2000) } : { stopped: 'the lander returned nothing: read ' + llog }
result.line += '; ' + (l ? cut(l.last, 300) : 'the lander returned nothing: read ' + llog)
return result
