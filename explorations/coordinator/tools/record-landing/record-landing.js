export const meta = {
  name: 'record-landing',
  description: 'The record brought in line with a landed batch, in a worktree of its own: the evidence script and an Opus sort by home and weight; the entries and routing writers as two headless Opus streams with the mechanical checks; a checker and a cold read; one fix round; a judge who applies or holds each change once, makes two commits on the branch and writes diff.md; nothing on main',
  phases: [
    { title: 'Sort', detail: 'prepare.sh makes the worktree and the evidence; the sorter writes owed.md, one line per change', model: 'opus' },
    { title: 'Write', detail: 'a Sonnet driver starts the entries and routing writers, two headless Opus streams, then checks.sh 1', model: 'sonnet' },
    { title: 'Check', detail: 'the checker and the clarity cold reader, side by side', model: 'opus' },
    { title: 'Fix', detail: 'both writers once more, in the same streams, then checks.sh 2', model: 'sonnet' },
    { title: 'Judge', detail: 'apply or hold each change once; final.sh checks and commits twice on the branch; diff.md', model: 'opus' },
  ],
}

// args: { batch: '24', base: 'b0f6cd6b7', landing: '25238e60c', at: '43cd61b62' }
//   batch, the climb batch's number; base, its base; landing, its landing commit; at, for a replay only, the commit
//   that the worktree is made at (without it, main's head at the launch).
// The rest follows from them. The worktree /home/user/fortress-landing-N on the branch record/landing-N, or for a
// replay /home/user/fortress-landing-N-replay on record/landing-N-replay; the run's folder in it,
// explorations/compile-ladder/climb-batch-N/record-landing/, as prepare.sh derives it too; the two streams
// landing-N-entries and landing-N-routing, kept in the worktree's tmp/. There is no text argument: a run gives the
// workflow data, never rules of its own. Every agent works in the worktree; the main tree is not written. The
// judge commits twice on the branch; the coordinator reads diff.md and lands the branch (README.md).
const T = '/home/user/fortress/explorations/coordinator/tools/record-landing/'
const RC = '/home/user/fortress/explorations/coordinator/tools/record-clarity/'
if (!args || !args.batch || !args.base || !args.landing) throw new Error('args: { batch, base, landing, at (a replay only) }')
const N = String(args.batch)
const BASE = String(args.base)
const LANDING = String(args.landing)
const AT = args.at ? String(args.at) : 'main'
const TAG = args.at ? N + '-replay' : N
const WT = '/home/user/fortress-landing-' + TAG
const BRANCH = 'record/landing-' + TAG
const RUN = WT + '/explorations/compile-ladder/climb-batch-' + N + '/record-landing/'
const cut = (s, n) => (s ? String(s).slice(0, n) : null)
const where = `Your batch: climb batch ${N}, its base ${BASE}, its landing commit ${LANDING}. Your worktree: ${WT}. The run's folder: ${RUN}`
const SORT = {
  type: 'object',
  properties: {
    counts: { type: 'array', items: { type: 'object', properties: { home: { type: 'string' }, changes: { type: 'integer' } }, required: ['home', 'changes'] } },
    orientation: { type: 'array', items: { type: 'string' } },
    curator: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
  required: ['counts', 'orientation', 'curator', 'summary'],
}

// One write round: drive.sh starts both streams in the background, waits for both, and runs checks.sh.
const drive = (n) => {
  const log = `${RUN}drive-${n}.log`, done = `${RUN}drive-${n}.done`
  return agent(`You drive a long command and report its output; you judge nothing and write nothing else.
1. If ${done} exists, skip to step 3.
2. Run this in the background with the Bash tool's run_in_background, exactly:
   ${T}drive.sh ${RUN} ${n} > ${log} 2>&1; touch ${done}
3. Run \`python3 ${RC}wait.py ${done} 540\` in the foreground, with a timeout of 600000 ms. If it exits 1, run it again; repeat until it exits 0.
4. Your final message: the last 80 lines of ${log}, verbatim.`, { label: n === 1 ? 'write' : 'fix', phase: n === 1 ? 'Write' : 'Fix', model: 'sonnet' })
}

phase('Sort')
const s = await agent(`Read your brief and follow it: ${T}sort.md\n\n${where}\nFirst run, exactly: ${T}prepare.sh ${N} ${BASE} ${LANDING} ${AT} ${WT} ${BRANCH}`,
  { label: 'sort', phase: 'Sort', model: 'opus', schema: SORT })
if (!s) return { batch: N, worktree: WT, branch: BRANCH, run: RUN, stopped: 'the sort returned nothing: read owed.md in the run folder and the agent transcript before a resume' }
log(`sorted: ${s.counts.map(c => c.home + ' ' + c.changes).join(', ')}`)

phase('Write')
const w1 = await drive(1)

phase('Check')
const checks = await parallel([
  () => agent(`Read your brief and follow it: ${T}check.md\n\n${where}`, { label: 'check', phase: 'Check', model: 'opus' }),
  () => agent(`Read your brief and follow it: ${RC}coldread.md\n\nThe file to read: ${RUN}clean.txt\nYour report: ${RUN}cold-read.md`, { label: 'cold read', phase: 'Check', model: 'opus' }),
])

phase('Fix')
const w2 = await drive(2)

phase('Judge')
const j = await agent(`Read your brief and follow it: ${T}judge.md\n\n${where}`, { label: 'judge', phase: 'Judge', model: 'opus' })
log(`judged: ${cut(j, 200)}`)

return {
  batch: N, worktree: WT, branch: BRANCH, run: RUN, diff: RUN + 'diff.md',
  sort: { counts: s.counts, orientation: s.orientation, curator: s.curator, summary: cut(s.summary, 1200) },
  write: cut(w1, 1500), checks: checks.map(c => cut(c, 800)), fix: cut(w2, 1500), judge: cut(j, 2000),
}
