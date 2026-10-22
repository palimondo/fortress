export const meta = {
  name: 'orientation',
  description: 'The fortress-repo skill\'s orientation (its revival part): consolidate it whole, or update it from a landing\'s FACTS; outline or admission, the stream writer, preservation, cold read and regression quiz, a fix round, a second read, and a judge; nothing installed',
  phases: [
    { title: 'Plan', detail: 'consolidate: outline and disposition table; update: admission of the landing\'s findings', model: 'opus' },
    { title: 'Write', detail: 'the stream\'s headless Opus writer', model: 'opus' },
    { title: 'Check', detail: 'preservation, cold read, regression quiz', model: 'opus' },
    { title: 'Fix', detail: 'the writer\'s second round, in the same stream', model: 'opus' },
    { title: 'Reread', detail: 'a second cold read and the quiz again', model: 'opus' },
    { title: 'Judge', detail: 'install or hold, section by section, once', model: 'opus' },
  ],
}

// args: { mode: 'consolidate' | 'update', out: '/abs/folder/', stream: 'name', concepts: ['/abs/concepts.md', ...] (consolidate),
//         facts: ['F-261', ...] (update: the entries the landing added or changed) }
// Writes into out: outline.md and disposition.md, or admission.md; orientation.md and sources-mapping.md; the
// reports; judgement.md and queue.md. The coordinator installs a judged text through the skill writer.
const T = '/home/user/fortress/explorations/coordinator/tools/orientation/'
const RC = '/home/user/fortress/explorations/coordinator/tools/record-clarity/'
const MODE = args.mode
const OUT = args.out
const STREAM = args.stream || 'orientation'
const cut = (s, n) => (s ? String(s).slice(0, n) : null)
const ADMIT = { type: 'object', properties: { admitted: { type: 'array', items: { type: 'string' } }, summary: { type: 'string' } }, required: ['admitted', 'summary'] }

const drive = (n, task) => {
  const log = `${OUT}writer-${n}.log`, done = `${OUT}writer-${n}.done`
  return agent(`You drive a long command and report its output; you judge nothing and write nothing else. The folder ${OUT} may not exist yet: create it with mkdir -p.
1. If ${done} exists, skip to step 3.
2. Run this in the background with the Bash tool's run_in_background, exactly:
   ${RC}writer-stream.sh ${STREAM} "${task}" > ${log} 2>&1; touch ${done}
3. Run \`python3 ${RC}wait.py ${done} 540\` in the foreground, with a timeout of 600000 ms. If it exits 1, run it again; repeat until it exits 0.
4. Your final message: the last 60 lines of ${log}, verbatim.`, { label: n === 1 ? 'write' : 'fix', phase: n === 1 ? 'Write' : 'Fix', model: 'sonnet' })
}

const quiz = async (round) => {
  if (round === 1) await agent(`Read your brief and follow it: ${T}quiz-author.md\n\nYour mode: ${MODE}. Your folder: ${OUT}`, { label: 'quiz author', phase: 'Check', model: 'opus' })
  await agent(`Read your brief and follow it: ${T}quiz-reader.md\n\nThe orientation file: ${OUT}orientation.md\nThe cases file: ${OUT}quiz-cases.txt\nYour answers: ${OUT}quiz-answers-${round}.md`, { label: `quiz reader ${round}`, phase: round === 1 ? 'Check' : 'Reread', model: 'opus' })
  return agent(`Read your brief and follow it: ${T}quiz-grade.md\n\nThe answers: ${OUT}quiz-answers-${round}.md\nYour grading: ${OUT}quiz-grade-${round}.md`, { label: `quiz grade ${round}`, phase: round === 1 ? 'Check' : 'Reread', model: 'opus' })
}

phase('Plan')
let plan
if (MODE === 'consolidate') {
  plan = await agent(`Read your brief and follow it: ${T}outline.md\n\nYour folder: ${OUT}\nThe concepts lists: ${(args.concepts || []).join(', ')}`, { label: 'outline', phase: 'Plan', model: 'opus' })
} else {
  const a = await agent(`Read your brief and follow it: ${T}admission.md\n\nYour folder: ${OUT}\nThe landing's FACTS entries: ${(args.facts || []).join(', ')}`, { label: 'admission', phase: 'Plan', model: 'opus', schema: ADMIT })
  if (!a || !a.admitted.length) return { mode: MODE, admitted: [], summary: a ? a.summary : 'admission failed' }
  plan = a.summary
}

const W = `Read your brief and follow it: ${T}write.md. Your mode: ${MODE}. Your folder: ${OUT}`
const w1 = await drive(1, W)

const checks = await parallel([
  () => agent(`Read your brief and follow it: ${T}preserve.md\n\nYour mode: ${MODE}. Your folder: ${OUT}`, { label: 'preserve', phase: 'Check', model: 'opus' }),
  () => agent(`Read your brief and follow it: ${T}coldread.md\n\nThe file to read: ${OUT}orientation.md\nYour report: ${OUT}cold-read.md`, { label: 'cold read', phase: 'Check', model: 'opus' }),
  () => quiz(1),
])

const w2 = await drive(2, `${W}. This is your fix round: fix what ${OUT}preserve.md, ${OUT}cold-read.md and ${OUT}quiz-grade-1.md find, in ${OUT}orientation.md`)

const rereads = await parallel([
  () => agent(`Read your brief and follow it: ${T}coldread.md\n\nThe file to read: ${OUT}orientation.md\nYour report: ${OUT}cold-read-2.md`, { label: 'reread', phase: 'Reread', model: 'opus' }),
  () => quiz(2),
])

const j = await agent(`Read your brief and follow it: ${T}judge.md\n\nYour mode: ${MODE}. Your folder: ${OUT}\nThe quiz gradings: ${OUT}quiz-grade-1.md, ${OUT}quiz-grade-2.md`, { label: 'judge', phase: 'Judge', model: 'opus' })

return { mode: MODE, plan: cut(plan, 1200), write: cut(w1, 800), checks: checks.map(c => cut(c, 600)), fix: cut(w2, 800), rereads: rereads.map(c => cut(c, 600)), judge: cut(j, 1200) }
