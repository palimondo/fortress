export const meta = {
  name: 'record-clarity',
  description: 'Clarity pass over record entries, POSITIONS or FACTS: per chunk, for FACTS an assessment first, then an Opus writer, a cold read, a check, the writer\'s fix round and a second cold read; nothing applied',
  phases: [
    { title: 'Assess', detail: 'FACTS only: the rubric over every entry, a disposition each', model: 'opus' },
    { title: 'Write', detail: 'one writer per chunk, the standing brief and writer.md', model: 'opus' },
    { title: 'ColdRead', detail: 'a reader with only the worker skill', model: 'opus' },
    { title: 'Check', detail: 'fidelity against the sources, and the reader against the meaning', model: 'opus' },
    { title: 'Fix', detail: 'the writer\'s second round', model: 'opus' },
    { title: 'Reread', detail: 'a second cold read of the fixed entries', model: 'opus' },
  ],
}

// args: { kind: 'positions' | 'facts', out: '/abs/folder/', chunks: [{ name: 'c1', entries: ['P-7', 'P-8'] }] }
// Every agent writes its own files into out + chunk name + '/'. The coordinator reads them, applies each
// chunk's proposals.apply with record.py and commits; nothing here touches the record.
const T = '/home/user/fortress/explorations/coordinator/tools/record-clarity/'
const KIND = args.kind
const OUT = args.out
const cut = (s, n) => (s ? String(s).slice(0, n) : null)
const ASSESS = {
  type: 'object',
  properties: { rewrite: { type: 'array', items: { type: 'string' } }, summary: { type: 'string' } },
  required: ['rewrite', 'summary'],
}
const tell = (x, extra) => `Your kind: ${KIND}. Your chunk: ${x.name}. Your entries: ${x.write.join(', ')}. Your folder: ${x.dir}` + (extra ? '\n' + extra : '')

const res = await pipeline(args.chunks,
  async (c) => {
    const dir = OUT + c.name + '/'
    if (KIND !== 'facts') return { name: c.name, dir, write: c.entries }
    const a = await agent(`Read your brief and follow it: ${T}assess.md\n\nYour chunk: ${c.name}. Its entries: ${c.entries.join(', ')}. Your folder: ${dir}`,
      { label: `assess ${c.name}`, phase: 'Assess', model: 'opus', schema: ASSESS })
    return { name: c.name, dir, write: a ? a.rewrite : [], assess: a ? cut(a.summary, 1200) : 'assessment failed' }
  },
  async (x) => {
    if (!x.write.length) return { ...x, skipped: 'nothing to rewrite' }
    const w = await agent(`Read your brief and follow it: ${T}writer.md\n\n` + tell(x),
      { label: `write ${x.name}`, phase: 'Write', model: 'opus' })
    return { ...x, writer: cut(w, 1500) }
  },
  async (x) => {
    if (x.skipped) return x
    const r = await agent(`Read your brief and follow it: ${T}coldread.md\n\nThe file to read: ${x.dir}clean.txt\nYour report: ${x.dir}cold-read.md`,
      { label: `cold read ${x.name}`, phase: 'ColdRead', model: 'opus' })
    return { ...x, coldread: cut(r, 1000) }
  },
  async (x) => {
    if (x.skipped) return x
    const r = await agent(`Read your brief and follow it: ${T}check.md\n\n` + tell(x),
      { label: `check ${x.name}`, phase: 'Check', model: 'opus' })
    return { ...x, check: cut(r, 1500) }
  },
  async (x) => {
    if (x.skipped) return x
    const r = await agent(`Read your brief and follow it: ${T}fix.md\n\n` + tell(x),
      { label: `fix ${x.name}`, phase: 'Fix', model: 'opus' })
    return { ...x, fix: cut(r, 1500) }
  },
  async (x) => {
    if (x.skipped) return x
    const r = await agent(`Read your brief and follow it: ${T}coldread.md\n\nThe file to read: ${x.dir}clean.txt\nYour report: ${x.dir}cold-read-2.md`,
      { label: `reread ${x.name}`, phase: 'Reread', model: 'opus' })
    return { ...x, reread: cut(r, 1000) }
  },
)
return res
