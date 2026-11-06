export const meta = {
  name: 'record-landing',
  description: 'The record brought in line with a landed batch, in a worktree of its own: the evidence script and an Opus sort by home and weight; the entries and routing writers as two headless Opus streams with the mechanical checks; a checker and a cold read; one fix round; a judge who applies or holds each change once, makes two commits on the branch and writes diff.md; then, past the judge\'s checks, the commits landed on main and pushed, the worktree and branch removed, and the orientation update run as a child workflow on the entries the landing changed; then the skill writer installs what the orientation judge accepts and brings fortress-repo in line with the landing, a cold read of its commits, the writer\'s fixes, the page of fortress-repo\'s changes, and the pushes; then the revival page\'s update script, its commit and push, and the page republished by its URL, ending in one line for the coordinator\'s chat message',
  phases: [
    { title: 'Sort', detail: 'prepare.sh makes the worktree and the evidence; the sorter writes owed.md, one line per change', model: 'opus' },
    { title: 'Write', detail: 'a Sonnet driver starts the entries and routing writers, two headless Opus streams, then checks.sh 1', model: 'sonnet' },
    { title: 'Check', detail: 'the checker and the clarity cold reader, side by side', model: 'opus' },
    { title: 'Fix', detail: 'both writers once more, in the same streams, then checks.sh 2', model: 'sonnet' },
    { title: 'Judge', detail: 'apply or hold each change once; final.sh checks and commits twice on the branch; diff.md', model: 'opus' },
    { title: 'Land', detail: 'the two commits onto main (a fast-forward, or a cherry-pick if main moved), the checks on main, the three pushes, the worktree and branch removed; then the orientation update, a child workflow', model: 'sonnet' },
    { title: 'Skills', detail: 'skills.sh writes the task from the landed diff.md and the orientation judgement; the skill writer, a headless Opus session, installs and edits fortress-repo and commits on main', model: 'sonnet' },
    { title: 'Cold read', detail: 'the changed parts read as a worker new to the repository', model: 'opus' },
    { title: 'Fixes', detail: 'the same writer fixes the cold read\'s flags and commits', model: 'sonnet' },
    { title: 'Page', detail: 'the page of fortress-repo\'s landed changes updated and published by its URL', model: 'opus' },
    { title: 'Push', detail: 'the run\'s folders committed, then the three pushes; the one line for the coordinator', model: 'sonnet' },
    { title: 'Revival page', detail: 'update.py rewrites the page\'s "Where it stands" and its chart; the files it names committed and pushed; the page republished by its URL', model: 'sonnet' },
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
// the entries the landing changed (README.md, "Landing its result"); then the skill update, its cold read, its
// fixes, the page and the pushes (README.md, "The skill update"); then the revival page's update, its commit, its
// push and its republish (README.md, "The revival page"). A replay lands nothing and runs no update.
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

// The orientation update, the child workflow (one level deep), on the entries diff.md's "Next" names. With no
// entry there, the update has nothing to judge, and the skill update below still runs on diff.md's skill lines.
const facts = (l.facts || []).filter(f => /^[FP]-\d+$/.test(f))
log('landed by ' + l.how + ': ' + l.commits.join('; ') + (facts.length ? '; the orientation update on ' + facts.join(', ') : '; diff.md, "Next", names no entry for the orientation update'))
if (facts.length) {
  try {
    result.orientation = await workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/orientation/orientation.js' },
      { mode: 'update', out: '/home/user/fortress/explorations/compile-ladder/climb-batch-' + N + '/orientation/', stream: 'orientation-b' + N, facts })
  } catch (e) {
    return Object.assign(result, { stopped: 'landed and pushed; the orientation update failed to start, and no skill update ran: ' + e.message })
  }
} else {
  result.orientation = { skipped: 'diff.md, "Next", names no entry' }
}

// The skill update (the coordinator skill's batch.md, "The landing", step 4, and skill-rewrite.md, "The method",
// step 7): the skill writer, a headless Opus session through ../skill-writer.sh, installs the sections that the
// orientation judge accepts and brings fortress-repo's other parts in line with the landing, from the landing's
// own list of the sentences it made false (skills.sh writes the task from skill-task.md and the landed files);
// a cold read of its commits; the writer's fixes of the flags, in the same session; the page of fortress-repo's
// changes; then the commits pushed as the Land stage pushes. The writer commits on main in the main tree. Its
// folder is climb-batch-N/skills/ there; the drivers' markers are under the main tree's tmp/, which git ignores.
// Each driver waits in steps of 230 s, under the five minutes of its prompt cache. No step of the coordinator's
// comes between: the result ends with one line for its chat message.
const CB = 'explorations/compile-ladder/climb-batch-' + N + '/'
const SK = MAIN + '/' + CB + 'skills/'
const OUTD = MAIN + '/' + CB + 'orientation/'
const SMARKS = MAIN + '/tmp/record-landing-' + N + '/'
const SKILLS = {
  type: 'object',
  properties: {
    nothing: { type: 'boolean', description: 'true when the log has a line that starts NOTHING' },
    exit: { type: 'string', description: 'the exit on the log line "== the writer\'s round R: exit X", or "finished before", or "none"' },
    base: { type: 'string', description: 'the hash on the log\'s BASE line' },
    commits: { type: 'array', items: { type: 'string' }, description: 'each COMMIT line, without the word COMMIT, in order' },
    parts: { type: 'array', items: { type: 'string' }, description: 'each PART line, without the word PART' },
    tail: { type: 'string', description: 'the last 60 lines of the log, verbatim' },
  },
  required: ['nothing', 'exit', 'base', 'commits', 'parts', 'tail'],
}
const skills = (n) => {
  const lg = SK + 'skills-' + n + '.log', done = SMARKS + 'skills-' + n + '.done'
  return agent(['You drive a long command and report its output; you judge nothing and write nothing else.',
    '1. If ' + done + ' exists, skip to step 3.',
    '2. Run this in the background with the Bash tool\'s run_in_background, exactly:',
    '   mkdir -p ' + SK + ' ' + SMARKS + '; ' + T + 'skills.sh ' + N + ' ' + n + ' > ' + lg + ' 2>&1; touch ' + done,
    '3. Run python3 ' + RC + 'wait.py ' + done + ' 230 in the foreground, with a timeout of 270000 ms. If it exits 1, run it again at once; repeat until it exits 0. Each wait stays under 240 s, so that your prompt cache stays warm.',
    '4. Read ' + lg + ' and return the structured result from its lines.'].join('\n'),
    { label: n === 1 ? 'skill writer' : 'skill fixes', phase: n === 1 ? 'Skills' : 'Fixes', model: 'sonnet', schema: SKILLS })
}

phase('Skills')
const s1 = await skills(1)
result.skills = s1 ? { nothing: s1.nothing, exit: s1.exit, base: s1.base, commits: s1.commits, parts: s1.parts, tail: cut(s1.tail, 1500) } : null
const changed = !!(s1 && !s1.nothing && s1.commits.length && s1.parts.length)
let s2 = null, page = null
if (!s1) result.skillsStopped = 'the skill driver returned nothing: read ' + SK + 'skills-1.log and ' + SK + 'writer-1.md'
else if (s1.nothing) log('the skill update: nothing names the skill, and the orientation judge did not run')
else if (!s1.commits.length) result.skillsStopped = 'the skill writer committed nothing: read ' + SK + 'writer-1.md'
else if (!s1.parts.length) log('the skill update changed only provenance lines: no cold read and no page item')

if (changed) {
  phase('Cold read')
  const cr = await agent('Read your brief and follow it: /home/user/fortress/explorations/coordinator/skill-cold-read-brief.md\n\n' +
    'The task. The skill: fortress-repo, read as a worker new to the repository; a part under .claude/skills/coordinator/, if one is named, read as the coordinating session. The base commit: ' + s1.base +
    '. The parts that changed: ' + s1.parts.join(', ') + '. Your report: ' + SK + 'cold-read.md. ' +
    'If that file already holds your report whole, ending with its count, write nothing and return the count. ' +
    'Write your report in parts: write the first part to the file, then add each next part to its end, one tool call for each part. So no reply runs for minutes, and your prompt cache stays warm between your calls.',
    { label: 'skill cold read', phase: 'Cold read', model: 'opus' })
  result.coldRead = cut(cr, 800)

  if (cr) {
    phase('Fixes')
    s2 = await skills(2)
    result.fixes = s2 ? { exit: s2.exit, commits: s2.commits, parts: s2.parts, tail: cut(s2.tail, 1500) } : null
    if (!s2) result.skillsStopped = 'the fix driver returned nothing: read ' + SK + 'skills-2.log and ' + SK + 'writer-2.md'
  } else result.skillsStopped = 'the cold read returned nothing: no fixes; read ' + SK + 'cold-read.md'

  phase('Page')
  const PAGE = {
    type: 'object',
    properties: {
      published: { type: 'boolean' }, url: { type: 'string' }, version: { type: 'string' }, source: { type: 'string' },
      items: { type: 'integer' }, newItems: { type: 'integer' },
      why: { type: 'string', description: 'why the page was not published; empty when it was' },
      summary: { type: 'string' },
    },
    required: ['published', 'url', 'source', 'items', 'newItems', 'why', 'summary'],
  }
  const final = (s2 && s2.commits.length ? s2 : s1).commits
  page = await agent('Read your brief and follow it: ' + T + 'page.md\n\nYour batch: climb batch ' + N + '. The skill run\'s folder: ' + SK +
    ' (task-1.md, writer-1.md, cold-read.md, task-2.md, writer-2.md). The base commit before the changes: ' + s1.base + '. The commits: ' + final.join('; ') + '.',
    { label: 'page', phase: 'Page', model: 'opus', schema: PAGE })
  result.page = page
}

// The pushes, as the Land stage's: the skill folder and the orientation's folder committed by named paths, then
// main pushed only when every commit past the skill base is the run's own.
phase('Push')
const PUSH = {
  type: 'object',
  properties: {
    committed: { type: 'string', description: 'the folders\' commit, "hash subject", or empty if nothing was left to commit' },
    commits: { type: 'array', items: { type: 'string' }, description: 'the run\'s commits past the skill base, "hash subject", in order' },
    pushed: { type: 'array', items: { type: 'string' } },
    stopped: { type: 'string', description: 'why something was not committed or pushed, with the output; empty when all went through' },
    summary: { type: 'string' },
  },
  required: ['committed', 'commits', 'pushed', 'stopped', 'summary'],
}
const SBASE = (s1 && s1.base) || l.mainBefore || 'origin/main'
const PUSHES = 'Then git push origin main, git push origin main:claude/worker-brief-fable-vnnuv8, git push origin main:blinded-fable, in that order; a push that fails on the network you retry up to four times, 2, 4, 8 and 16 seconds apart; a push refused, you push nothing more and say so in stopped.'
const p = await agent([
  'You commit and push the end of the record-landing run of climb batch ' + N + '. You run commands and report; you judge nothing and edit no file. You work in the main tree, ' + MAIN + ', on the branch main. Another agent may commit there meanwhile: on an index.lock error, wait five seconds and retry, up to four times; leave other uncommitted edits alone.',
  '',
  '1. The folders. Run ' + T + 'folders.sh ' + N + '. It commits the run\'s two folders by named paths and prints COMMITTED with the commit\'s hash and subject, which you return in committed, or NOTHING, and then committed is empty. If it fails, push nothing and return its output in stopped.',
  '2. The run\'s commits. For each hash of git -C ' + MAIN + ' log --format=%h ' + SBASE + '..main, git -C ' + MAIN + ' show --name-only --format= HASH lists its paths. The commit is the run\'s if every path is under .claude/skills/, ' + CB + 'skills/ or ' + CB + 'orientation/. Return the run\'s commits in commits, as "hash subject" from git log --format="%h %s".',
  '3. The pushes, as the fortress-repo skill\'s committing part says: git -C ' + MAIN + ' log --format="%h %s" origin/main..main must list only the run\'s commits of step 2 and the record\'s landed commits; if it lists nothing, push nothing and leave stopped empty. If it lists another agent\'s commit, run it again in a minute, and if that commit stays, push nothing and say so in stopped. ' + PUSHES,
].join('\n'), { label: 'push', phase: 'Push', model: 'sonnet', schema: PUSH })
result.push = p

// The one line for the coordinator's chat message: the commits and the page's link.
const shown = (p ? p.commits : ((s2 && s2.commits.length ? s2 : s1) || { commits: [] }).commits).filter(c => !/skill update after its landing/.test(c))
const pushedAll = !!(p && !p.stopped)
const pageLine = !s1 ? 'no page update, since the skill driver returned nothing'
  : s1.nothing ? 'no page update, since the skill did not change'
  : !s1.commits.length ? 'no page update, since the writer committed nothing'
  : !s1.parts.length ? 'no page update, since no rule of the skill changed'
  : !page ? 'the page worker returned nothing; the page is as it was'
  : page.published ? 'the page: ' + page.url + (page.version ? ' (' + page.version + ')' : '')
  : 'the page\'s source ' + page.source + ' waits to be published by its URL, ' + page.url + (page.why ? ' (' + page.why + ')' : '')
result.line = 'fortress-repo after climb batch ' + N + '\'s landing: ' + (shown.length ? shown.join('; ') : 'no skill commit') +
  (pushedAll ? (p.pushed.length ? ', pushed' : ', nothing left to push') : ', not all pushed' + (p && p.stopped ? ': ' + p.stopped : '')) + '; ' + pageLine + '.'
if (!pushedAll) result.stopped = 'landed; the skill update\'s commits are not all pushed: ' + (p ? p.stopped || 'the pusher pushed ' + p.pushed.join(', ') : 'the pusher returned nothing; read git -C ' + MAIN + ' log origin/main..main')
else if (result.skillsStopped) result.stopped = 'landed and pushed; the skill update stopped: ' + result.skillsStopped
if (!pushedAll || args.at) return result   // a replay returned after the judge already; the revival page waits on the pushes

// The revival page (README.md, "The revival page"): what the coordinator did by hand after climb batch 26's
// landing (0868faa51). update.py, run from the main tree, rewrites the page's "Where it stands" and its chart and
// prints the paths to commit and the URL to publish by; a Sonnet agent runs it, commits those paths by name with
// the committing part's footer, as folders.sh commits, and pushes as the Push stage pushes; one more agent then
// publishes the page by its URL. The landings.csv row's run start is update.py's documented proxy, --run-start
// base, the time of the base commit that the gather record names, which the row's note then states: the tree
// holds no record of the batch run's first agent line (only the transcripts do). A resume skips the script and
// the commit once the page's commit is on main, and its marker is under the main tree's tmp/, which git ignores.
phase('Revival page')
const PAGEDIR = MAIN + '/explorations/coordinator/process-engineering/'
const RLOG = SMARKS + 'revival.log', RDONE = SMARKS + 'revival.done'
const RSUBJ = 'Revival page: where it stands at the landing of climb batch ' + N + ', '
const REVIVAL = {
  type: 'object',
  properties: {
    exit: { type: 'string', description: 'the EXIT= value on the log\'s last line, or "skipped" when the page\'s commit was already on main' },
    message: { type: 'string', description: 'when exit is neither 0 nor skipped: the log\'s "update.py stops:" line, or else its last 20 lines, verbatim; otherwise empty' },
    url: { type: 'string', description: 'the url on the log\'s line "2. Artifact publish, url URL, ...", or else PAGE_URL in update.py' },
    committed: { type: 'string', description: 'the page\'s commit, "hash subject", or empty if nothing was committed' },
    paths: { type: 'array', items: { type: 'string' }, description: 'the paths committed' },
    pushed: { type: 'array', items: { type: 'string' } },
    stopped: { type: 'string', description: 'why something was not committed or pushed, with the output; empty when all went through' },
  },
  required: ['exit', 'message', 'url', 'committed', 'paths', 'pushed', 'stopped'],
}
const rv = await agent([
  'You update the revival page at the end of the record-landing run of climb batch ' + N + ': you run its script, commit the files that it names, and push. You run commands and report; you judge nothing and edit no file but the commit message\'s. You work in the main tree, ' + MAIN + ', on the branch main. Another agent may commit there meanwhile: on an index.lock error, wait five seconds and retry, up to four times; leave other uncommitted edits alone.',
  '',
  '1. A take-over. If git -C ' + MAIN + ' log --format="%h %s" -F --grep="' + RSUBJ + '" ' + l.mainBefore + '..main lists a commit, the script and the commit are done: return that commit in committed and exit "skipped", take url as step 3 says, and go to step 5.',
  '2. The script. If ' + RDONE + ' exists, go to step 3. Otherwise run this in the background with the Bash tool\'s run_in_background, exactly:',
  '   mkdir -p ' + SMARKS + '; cd ' + MAIN + ' && python3 explorations/coordinator/tools/revival-page/update.py --landing ' + N + ' --run-start base > ' + RLOG + ' 2>&1; echo EXIT=$? >> ' + RLOG + '; touch ' + RDONE,
  '   Then run python3 ' + RC + 'wait.py ' + RDONE + ' 230 in the foreground, with a timeout of 270000 ms; if it exits 1, run it again at once; repeat until it exits 0.',
  '3. Its output. Read ' + RLOG + '. Return the EXIT= value of its last line in exit (on a take-over, "skipped"), and the url on its line "2. Artifact publish, url URL, ..." in url, or, if the log or the line is missing, the URL on the line PAGE_URL = of ' + MAIN + '/explorations/coordinator/tools/revival-page/update.py. If exit is neither 0 nor skipped, commit and push nothing: return the log\'s "update.py stops:" line (exit 2: a source\'s form changed), or else its last 20 lines, in message and in stopped, and end.',
  '4. The commit, as ' + T + 'folders.sh commits. The paths: those that the log\'s line "1. git add -- PATHS && git commit ..." names after git add --, and the five data files that the note under it names (series.csv, changes.csv, by-day.csv, top-additions.csv, per-batch.csv), each under explorations/coordinator/process-engineering/record-growth/. Keep each that git -C ' + MAIN + ' status --porcelain -- PATH lists; if none is left, committed is empty: go to step 5. The message, written to ' + MAIN + '/tmp/revival-msg-' + N + '.txt: the subject inside that line\'s -m "...", a blank line, "By the climb batch ' + N + ' landing workflow.", a blank line, and the footer, the two lines that grep -E "^ *(Co-Authored-By|Claude-Session): " .claude/skills/fortress-repo/references/committing.md | sed "s/^ *//" | head -2 prints in ' + MAIN + '. Then, from ' + MAIN + ': git add -- PATHS && git commit -q -F tmp/revival-msg-' + N + '.txt -- PATHS, each path named, never -a or a folder. Return the commit, "hash subject" from git log -1 --format="%h %s", in committed, and the paths in paths.',
  '5. The pushes, as the fortress-repo skill\'s committing part says: git -C ' + MAIN + ' log --format="%h %s" origin/main..main must list only the page\'s commit of step 1 or 4; if it lists nothing, push nothing and leave stopped empty. If it lists another agent\'s commit, run it again in a minute, and if that commit stays, push nothing and say so in stopped. ' + PUSHES,
].join('\n'), { label: 'revival page', phase: 'Revival page', model: 'sonnet', schema: REVIVAL })
result.revival = rv
// a stop here adds to the skill update's, if it stopped; landed and pushed either way
const stopAlso = (m) => { result.stopped = (result.stopped ? result.stopped + '; ' : 'landed and pushed; ') + m }
const pageFiles = PAGEDIR + 'revival-story.html, with ' + PAGEDIR + 'record-growth/record-growth.png as its supporting file record-growth.png'
if (!rv) {
  result.line += ' The revival page: its agent returned nothing; read ' + RLOG + ' and git -C ' + MAIN + ' log origin/main..main.'
  stopAlso('the revival page\'s agent returned nothing: read ' + RLOG + ' and git -C ' + MAIN + ' log origin/main..main')
  return result
}
if (rv.exit !== '0' && rv.exit !== 'skipped') {
  result.line += ' The revival page: not updated, since update.py stopped (exit ' + rv.exit + '): ' + rv.message
  stopAlso('the revival page\'s script stopped (exit ' + rv.exit + '), nothing of it committed: ' + rv.message)
  return result
}
if (rv.stopped) {
  result.line += ' The revival page: ' + (rv.committed || 'nothing committed') + ', not pushed: ' + rv.stopped
  stopAlso('the revival page\'s commit is not pushed: ' + rv.stopped)
  return result
}

// The republish, as the page stage publishes fortress-repo's page: one agent, by the URL that update.py names,
// after reading the artifact's published chart, which the Artifact tool asks for before it replaces that file.
const REPUB = {
  type: 'object',
  properties: {
    published: { type: 'boolean' }, url: { type: 'string' }, version: { type: 'string' },
    why: { type: 'string', description: 'why the page was not published; empty when it was' },
  },
  required: ['published', 'url', 'why'],
}
const pub = await agent('Read your brief and follow it: ' + T + 'revival-publish.md\n\nYour batch: climb batch ' + N + '. The commit: ' + (rv.committed || 'none, the page\'s files were already as committed') +
  '. The URL: ' + rv.url + '. The page: ' + PAGEDIR + 'revival-story.html. Its chart: ' + PAGEDIR + 'record-growth/record-growth.png.',
  { label: 'revival publish', phase: 'Revival page', model: 'sonnet', schema: REPUB })
result.revivalPublish = pub
result.line += ' The revival page: ' + (rv.committed || 'no new commit') + (rv.pushed.length ? ', pushed' : '') + '; ' +
  (pub && pub.published ? 'published at ' + pub.url + (pub.version ? ', version ' + pub.version : '') + '.'
    : 'not published' + (pub && pub.why ? ' (' + pub.why + ')' : pub ? '' : ' (its agent returned nothing)') + ': publish ' + pageFiles + ', by its URL, ' + rv.url + '.')
return result
