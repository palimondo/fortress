export const meta = {
  name: 'record-clarity',
  description: 'Clarity pass over record entries, POSITIONS or FACTS: per chunk, for FACTS an assessment first, then the stream\'s headless Opus writer, a cold read, a check, the writer\'s fix round, a second cold read and a judge; nothing applied',
  phases: [
    { title: 'Assess', detail: 'FACTS only: the rubric over every entry, a disposition each', model: 'opus' },
    { title: 'Write', detail: 'one writer per chunk, the standing brief and writer.md', model: 'opus' },
    { title: 'ColdRead', detail: 'a reader with only the worker skill', model: 'opus' },
    { title: 'Check', detail: 'fidelity against the sources, and the reader against the meaning', model: 'opus' },
    { title: 'Fix', detail: 'the writer\'s second round', model: 'opus' },
    { title: 'Reread', detail: 'a second cold read of the fixed entries', model: 'opus' },
    { title: 'Judge', detail: 'apply or hold each entry, once', model: 'opus' },
  ],
}

// args: { kind: 'positions' | 'facts', out: '/abs/folder/', chunks: [{ name: 'c1', entries: ['P-7', 'P-8'] }],
//         stream: 'name' (the writer stream, default the first chunk's name), from: 'judge' (only judge chunks already written),
//         extra: 'text' (a run's own brief, given to the writer, the fix round, the checker and the judge; the cold reader never sees it) }
// The writer and its fix round run in the stream's headless Opus session (writer-stream.sh), driven by a
// Sonnet step that only runs the command and waits; the stream resumes its session while the context is small.
// Every agent writes its own files into out + chunk name + '/'. The judge writes final.apply and queue.md;
// the coordinator applies final.apply with record.py, files queue.md and commits. Nothing here touches the record.
const T = '/home/user/fortress/explorations/coordinator/tools/record-clarity/'
const KIND = args.kind
const OUT = args.out
const cut = (s, n) => (s ? String(s).slice(0, n) : null)
const ASSESS = {
  type: 'object',
  properties: { rewrite: { type: 'array', items: { type: 'string' } }, summary: { type: 'string' } },
  required: ['rewrite', 'summary'],
}
const STREAM = args.stream || args.chunks[0].name
const FROM = args.from || 'assess'
const EXTRA = args.extra ? String(args.extra) : ''
const drive = (x, n, brief) => {
  const task = `Read your brief and follow it: ${T}${brief}.${EXTRA ? ' ' + EXTRA : ''} Your kind: ${KIND}. Your chunk: ${x.name}. Your entries: ${x.write.join(', ')}. Your folder: ${x.dir}`
  const log = `${x.dir}writer-${n}.log`, done = `${x.dir}writer-${n}.done`
  return agent(`You drive a long command and report its output; you judge nothing and write nothing else. The folder ${x.dir} may not exist yet: create it with mkdir -p.
1. If ${done} exists, skip to step 3.
2. Run this in the background with the Bash tool's run_in_background, exactly:
   ${T}writer-stream.sh ${STREAM} "${task}" > ${log} 2>&1; touch ${done}
3. Run \`python3 ${T}wait.py ${done} 540\` in the foreground, with a timeout of 600000 ms. If it exits 1, run it again; repeat until it exits 0.
4. Your final message: the last 60 lines of ${log}, verbatim.`, { label: `${n === 1 ? 'write' : 'fix'} ${x.name}`, phase: n === 1 ? 'Write' : 'Fix', model: 'sonnet' })
}
const tell = (x) => `Your kind: ${KIND}. Your chunk: ${x.name}. Your entries: ${x.write.join(', ')}. Your folder: ${x.dir}` + (EXTRA ? '\n' + EXTRA : '')

const res = await pipeline(args.chunks,
  async (c) => {
    const dir = OUT + c.name + '/'
    if (FROM === 'judge') return { name: c.name, dir, write: c.entries, judgeOnly: true }
    if (KIND !== 'facts') return { name: c.name, dir, write: c.entries }
    const a = await agent(`Read your brief and follow it: ${T}assess.md\n\nYour chunk: ${c.name}. Its entries: ${c.entries.join(', ')}. Your folder: ${dir}`,
      { label: `assess ${c.name}`, phase: 'Assess', model: 'opus', schema: ASSESS })
    return { name: c.name, dir, write: a ? a.rewrite : [], assess: a ? cut(a.summary, 1200) : 'assessment failed' }
  },
  async (x) => {
    if (!x.write.length) return { ...x, skipped: 'nothing to rewrite' }
    if (x.judgeOnly) return x
    const w = await drive(x, 1, 'writer.md')
    return { ...x, writer: cut(w, 1500) }
  },
  async (x) => {
    if (x.skipped || x.judgeOnly) return x
    const r = await agent(`Read your brief and follow it: ${T}coldread.md\n\nThe file to read: ${x.dir}clean.txt\nYour report: ${x.dir}cold-read.md`,
      { label: `cold read ${x.name}`, phase: 'ColdRead', model: 'opus' })
    return { ...x, coldread: cut(r, 1000) }
  },
  async (x) => {
    if (x.skipped || x.judgeOnly) return x
    const r = await agent(`Read your brief and follow it: ${T}check.md\n\n` + tell(x),
      { label: `check ${x.name}`, phase: 'Check', model: 'opus' })
    return { ...x, check: cut(r, 1500) }
  },
  async (x) => {
    if (x.skipped || x.judgeOnly) return x
    const r = await drive(x, 2, 'fix.md')
    return { ...x, fix: cut(r, 1500) }
  },
  async (x) => {
    if (x.skipped || x.judgeOnly) return x
    const r = await agent(`Read your brief and follow it: ${T}coldread.md\n\nThe file to read: ${x.dir}clean.txt\nYour report: ${x.dir}cold-read-2.md`,
      { label: `reread ${x.name}`, phase: 'Reread', model: 'opus' })
    return { ...x, reread: cut(r, 1000) }
  },
  async (x) => {
    if (x.skipped) return x
    const r = await agent(`Read your brief and follow it: ${T}judge.md\n\n` + tell(x),
      { label: `judge ${x.name}`, phase: 'Judge', model: 'opus' })
    return { ...x, judge: cut(r, 1200) }
  },
)
return res
