export const meta = {
  name: 'record-landing',
  description: 'The record brought in line with a landed batch, in a worktree of its own: the evidence script and an Opus sort by home and weight; the entries and routing writers as two headless Opus streams with the mechanical checks; a checker and a cold read; one fix round; a judge who applies or holds each change once, makes two commits on the branch and writes diff.md; then, past the judge\'s checks, the commits landed on main and pushed, the worktree and branch removed, and the orientation update run as a child workflow on the entries the landing changed',
  phases: [
    { title: 'Sort', detail: 'prepare.sh makes the worktree and the evidence; the sorter writes owed.md, one line per change', model: 'opus' },
    { title: 'Write', detail: 'a Sonnet driver starts the entries and routing writers, two headless Opus streams, then checks.sh 1', model: 'sonnet' },
    { title: 'Check', detail: 'the checker and the clarity cold reader, side by side', model: 'opus' },
    { title: 'Fix', detail: 'both writers once more, in the same streams, then checks.sh 2', model: 'sonnet' },
    { title: 'Judge', detail: 'apply or hold each change once; final.sh checks and commits twice on the branch; diff.md', model: 'opus' },
    { title: 'Land', detail: 'the two commits onto main (a fast-forward, or a cherry-pick if main moved), the checks on main, the three pushes, the worktree and branch removed; then the orientation update, a child workflow', model: 'sonnet' },
  ],
}

// args: { batch: '24', base: 'b0f6cd6b7', landing: '25238e60c', at: '43cd61b62' }
//   batch, the climb batch's number; base, its base; landing, its landing commit; at, for a replay only, the commit
//   that the worktree is made at (without it, main's head at the launch).
// The rest follows from them. The worktree /home/user/fortress-landing-N on the branch record/landing-N, or for a
// replay /home/user/fortress-landing-N-replay on record/landing-N-replay; the run's folder in it,
// explorations/compile-ladder/climb-batch-N/record-landing/, as prepare.sh derives it too; the two streams
// landing-N-entries and landing-N-routing, kept in the worktree's tmp/. There is no text argument: a run gives the
// workflow data, never rules of its own. Every agent up to the judge works in the worktree. The judge commits twice
// on the branch; the lander, only when the judge's checks pass, puts the two commits on main, checks main, pushes
// it and removes the worktree and the branch; then the orientation workflow runs in update mode, as a child, on
// the entries the landing changed (README.md, "Landing its result"). A replay lands nothing and runs no update.
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

// One write round: drive.sh starts both streams in the background, waits for both, and runs checks.sh. The
// driver waits in steps of 240 s, under the five minutes that its prompt cache lives, so that no step writes its
// context again; its marker is under the worktree's tmp/, which git ignores.
const MARKS = WT + '/tmp/record-landing/'
const drive = (n) => {
  const log = `${RUN}drive-${n}.log`, done = `${MARKS}drive-${n}.done`
  return agent(`You drive a long command and report its output; you judge nothing and write nothing else.
1. If ${done} exists, skip to step 3.
2. Run this in the background with the Bash tool's run_in_background, exactly:
   mkdir -p ${MARKS}; ${T}drive.sh ${RUN} ${n} > ${log} 2>&1; touch ${done}
3. Run \`python3 ${RC}wait.py ${done} 240\` in the foreground, with a timeout of 270000 ms. If it exits 1, run it again at once; repeat until it exits 0. Each wait stays under five minutes, so that your prompt cache stays warm.
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
  () => agent(`Read your brief and follow it: ${RC}coldread.md\n\nThe file to read: ${RUN}clean.txt\nYour report: ${RUN}cold-read.md\nWrite your report in parts of five entries: write the first part to the file, then add each next part to its end, one tool call for each part. So no reply runs for minutes, and your prompt cache stays warm between your calls.`, { label: 'cold read', phase: 'Check', model: 'opus' }),
])

phase('Fix')
const w2 = await drive(2)

phase('Judge')
const j = await agent(`Read your brief and follow it: ${T}judge.md\n\n${where}`, { label: 'judge', phase: 'Judge', model: 'opus' })
log(`judged: ${cut(j, 200)}`)

const result = {
  batch: N, worktree: WT, branch: BRANCH, run: RUN, diff: RUN + 'diff.md',
  sort: { counts: s.counts, orientation: s.orientation, curator: s.curator, summary: cut(s.summary, 1200) },
  write: cut(w1, 1500), checks: checks.map(c => cut(c, 800)), fix: cut(w2, 1500), judge: cut(j, 2000),
}
if (args.at) return result   // a replay lands nothing on main
if (!j) return Object.assign(result, { stopped: 'the judge returned nothing: nothing landed; read its transcript and the run folder before a resume' })

// The landing (curator, 2026-11-03 06:2x, HELD.md): the commits go onto main in this run, and the orientation
// update follows in the same chain. A fast-forward keeps the judge's hashes when main has not moved since AT; a
// cherry-pick lands the same two commits when it has. The judge's diff.md, "Next", gives the update's entries.
const MAIN = '/home/user/fortress'
const LAND = {
  type: 'object',
  properties: {
    landed: { type: 'boolean' },
    how: { type: 'string', description: 'fast-forward, cherry-pick, or none' },
    mainBefore: { type: 'string' },
    commits: { type: 'array', items: { type: 'string' }, description: 'the landed commits on main, hash and subject, in order' },
    pushed: { type: 'array', items: { type: 'string' } },
    cleanedUp: { type: 'array', items: { type: 'string' } },
    facts: { type: 'array', items: { type: 'string' }, description: 'the facts list of the orientation call in the landed diff.md, "Next", in its order; empty if nothing landed' },
    stopped: { type: 'string', description: 'why nothing landed or nothing was pushed, with the failing output; empty when all went through' },
    summary: { type: 'string' },
  },
  required: ['landed', 'how', 'commits', 'pushed', 'facts', 'stopped', 'summary'],
}
phase('Land')
const l = await agent([
  'You land the record-landing run of climb batch ' + N + ' on main. You run commands and report; you judge nothing and write no file. You work in the main tree, ' + MAIN + ', on the branch main, and read the worktree ' + WT + ' (branch ' + BRANCH + '). AT is in ' + RUN + 'run.env. Another agent may commit in the main tree meanwhile: on an index.lock error, wait five seconds and retry, up to four times; leave other uncommitted edits in the main tree alone.',
  '',
  'If an earlier attempt of this step was stopped, take over from what it did: while the branch exists, git -C ' + MAIN + ' cherry main ' + BRANCH + ' prints a + line for each of its commits that main does not hold yet (none: skip step 2); git fetch origin, then git rev-parse main origin/main origin/claude/worker-brief-fable-vnnuv8 origin/blinded-fable shows what is pushed; git worktree list and git branch --list ' + BRANCH + ' show what step 5 removed.',
  '',
  '1. The judge\'s checks (skip on a take-over past step 2). git -C ' + WT + ' log --format="%h %s" AT..' + BRANCH + ' must list the judge\'s commits, and ' + RUN + 'mech-final.md must say "Every check passes."; git -C ' + WT + ' status --porcelain must print nothing. If any fails, stop: land nothing, keep the worktree and branch, and return landed false with what failed in stopped.',
  '2. The commits onto main. git -C ' + MAIN + ' symbolic-ref --short HEAD must print main; note git rev-parse --short=9 main as mainBefore. If mainBefore is AT, git -C ' + MAIN + ' merge --ff-only ' + BRANCH + ' (how: fast-forward). Otherwise git -C ' + MAIN + ' cherry-pick AT..' + BRANCH + ' (how: cherry-pick). If git refuses, or a pick conflicts, run git cherry-pick --abort if a pick is under way, check that main is at mainBefore again, and stop as in step 1.',
  '3. The checks on main, run from ' + MAIN + ': python3 explorations/coordinator/tools/record.py check --base mainBefore; python3 explorations/coordinator/tools/ledger.py landing-check ' + BASE + '; bash explorations/coordinator/check-index.sh. If one fails, and git log mainBefore..main lists only the run\'s commits, git -C ' + MAIN + ' reset --keep mainBefore, so that nothing of the run stays on main (if it lists another\'s commit, reset nothing and say so); then stop as in step 1, its output in stopped.',
  '4. The pushes, as the fortress-repo skill\'s committing part says: git -C ' + MAIN + ' log --format="%h %s" origin/main..main must list only the landed commits; if it lists another agent\'s commit, run it again in a minute, and if that commit stays, push nothing and say so in stopped. Then git push origin main, git push origin main:claude/worker-brief-fable-vnnuv8, git push origin main:blinded-fable, in that order; a push that fails on the network you retry up to four times, 2, 4, 8 and 16 seconds apart; a push refused, you push nothing more and say so in stopped. landed is true once the commits are on main and the checks passed, pushed or not.',
  '5. Only once all three pushes went through: git -C ' + MAIN + ' worktree remove ' + WT + ', without --force, then git -C ' + MAIN + ' branch -D ' + BRANCH + '. A worktree git refuses to remove you keep, with its branch, and name in cleanedUp with its git status --short.',
  '6. The facts list, from the landed diff.md on main, ' + MAIN + '/explorations/compile-ladder/climb-batch-' + N + '/record-landing/diff.md, section "Next": the orientation call\'s facts list. Return its entries in facts, as written (F-n and P-n), in their order; an empty list if the call or the list is missing.',
  '',
  'Return the structured result: commits as "hash subject" from git log --format="%h %s" mainBefore..main.',
].join('\n'), { label: 'land', phase: 'Land', model: 'sonnet', schema: LAND })
result.land = l
if (!l || !l.landed) return Object.assign(result, { stopped: 'nothing landed: ' + (l ? l.stopped : 'the lander returned nothing; read its transcript, git -C ' + MAIN + ' log origin/main..main and the branch before a resume') })
if (l.stopped) return Object.assign(result, { stopped: 'landed on the local main, not all pushed, no orientation update: ' + l.stopped })

// The orientation update, the child workflow (one level deep), on the entries diff.md's "Next" names.
const facts = (l.facts || []).filter(f => /^[FP]-\d+$/.test(f))
if (!facts.length) return Object.assign(result, { stopped: 'landed and pushed; no orientation update: diff.md, "Next", names no entry' })
log('landed by ' + l.how + ': ' + l.commits.join('; ') + '; the orientation update on ' + facts.join(', '))
try {
  result.orientation = await workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/orientation/orientation.js' },
    { mode: 'update', out: '/home/user/fortress/explorations/compile-ladder/climb-batch-' + N + '/orientation/', stream: 'orientation-b' + N, facts })
} catch (e) {
  result.stopped = 'landed and pushed; the orientation update failed to start: ' + e.message
}
return result
