export const meta = {
  name: 'ledger-clarity',
  description: 'Bring open gap-ledger rows to the present, per chunk: an Opus writer assesses each row by the record rubric and writes its new line or close, a checker verifies them against the tree, a judge applies or holds each once; nothing written to the ledger',
  phases: [
    { title: 'Write', detail: 'assess each row, write its new line, close or question', model: 'opus' },
    { title: 'Check', detail: 'fidelity against the tree, the commits and the tests', model: 'opus' },
    { title: 'Judge', detail: 'apply or hold each row, once', model: 'opus' },
  ],
}

// args: { out: '/abs/folder/', chunks: [{ name: 'l1', rows: ['8', '20'] }] }
// Each chunk's files land in out + name + '/'. The coordinator applies final.rewrite with ledger.py rewrite and
// final.closes with ledger.py close, runs ledger.py check and landing-check, files queue.md and commits.
const T = '/home/user/fortress/explorations/coordinator/tools/ledger-clarity/'
const cut = (s, n) => (s ? String(s).slice(0, n) : null)
const tell = (x) => `Your chunk: ${x.name}. Its rows: ${x.rows.join(', ')}. Your folder: ${x.dir} (create it with mkdir -p if it does not exist).`

return await pipeline(args.chunks.map(c => ({ ...c, dir: args.out + c.name + '/' })),
  async (x) => ({ ...x, writer: cut(await agent(`Read your brief and follow it: ${T}writer.md\n\n` + tell(x), { label: `write ${x.name}`, phase: 'Write', model: 'opus' }), 1200) }),
  async (x) => ({ ...x, check: cut(await agent(`Read your brief and follow it: ${T}check.md\n\n` + tell(x), { label: `check ${x.name}`, phase: 'Check', model: 'opus' }), 1000) }),
  async (x) => ({ ...x, judge: cut(await agent(`Read your brief and follow it: ${T}judge.md\n\n` + tell(x), { label: `judge ${x.name}`, phase: 'Judge', model: 'opus' }), 1000) }),
)
