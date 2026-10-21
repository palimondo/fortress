export const meta = {
  name: 'positions-audit-full',
  description: 'POSITIONS audit, full run: per chunk, Sonnet scouts, an Opus judgement, an Opus writer on a copy of the record, a cold read and a takeaway check',
  phases: [{ title: 'Scout' }, { title: 'Judge' }, { title: 'Write' }, { title: 'Check' }],
}
const B = '/home/user/fortress/explorations/coordinator/positions-audit/full/evidence/briefs/'
const E = '/home/user/fortress/explorations/coordinator/positions-audit/full/evidence/'
const cut = (s, n) => (s ? String(s).slice(0, n) : null)
const names = (c) => c.entries.map((n) => 'P-' + n).join(', ')
const res = await pipeline(
  args.chunks,
  async (c) => {
    const scouts = await parallel(c.entries.map((n) => () =>
      agent(`Read your brief and follow it: ${B}scout.md\n\nYour entry: P-${n}.`,
        { label: `scout P-${n}`, phase: 'Scout', model: 'sonnet' })))
    return { name: c.name, entries: c.entries, scouts: scouts.map((s) => cut(s, 300)) }
  },
  async (x) => {
    const j = await agent(`Read your brief and follow it: ${B}judgement.md\n\nYour chunk: ${x.name}. Its entries: ${names(x)}. Where a scout's report is missing from ${E}, say so for that entry and judge it from the record alone.`,
      { label: `judge ${x.name}`, phase: 'Judge', model: 'opus' })
    return { ...x, judge: cut(j, 1500) }
  },
  async (x) => {
    const w = await agent(`Read your brief and follow it: ${B}writer.md\n\nYour chunk: ${x.name}. Its entries: ${names(x)}.`,
      { label: `writer ${x.name}`, phase: 'Write', model: 'opus' })
    return { ...x, writer: cut(w, 1500) }
  },
  async (x) => {
    const cr = await agent(`Read your brief and follow it: ${B}coldread.md\n\nYour chunk: ${x.name}. The file to read: ${E}rewritten-${x.name}.txt`,
      { label: `cold read ${x.name}`, phase: 'Check', model: 'opus' })
    const tk = await agent(`Read your brief and follow it: ${B}takeaway.md\n\nYour chunk: ${x.name}.`,
      { label: `takeaway ${x.name}`, phase: 'Check', model: 'opus' })
    return { ...x, coldread: cut(cr, 800), takeaway: cut(tk, 800) }
  },
)
return res
