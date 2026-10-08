export const meta = {
  name: 'fortress-repo-skill-rewrite',
  description: 'Rewrite every part of the fortress-repo skill by the outline and the seven principles, cold-read it, fix it, and compare the three approved parts with their approved versions under Fable',
  phases: [
    { title: 'Write', detail: 'one writer per file, two at a time' },
    { title: 'Consolidate', detail: 'moves between files, sources.md, one commit' },
    { title: 'ColdRead', detail: 'three cold readers, each walking different workers' },
    { title: 'Fix', detail: 'one fixer applies the findings' },
    { title: 'Compare', detail: 'Fable compares the three approved parts with the approved versions', model: 'fable' },
  ],
}

const APPROVED = args.approved
const SK = '.claude/skills/fortress-repo'
const FOOTER = 'Co-Authored-By: Claude <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB'
const APPROVED_PARTS = ['build-and-caches', 'tests-writing', 'tests-running']
const UNITS = [
  { file: `${SK}/SKILL.md`, outline: 'What `SKILL.md` preloads', kind: 'skill' },
  { file: `${SK}/references/compiler.md`, outline: 'compiler.md' },
  { file: `${SK}/references/records.md`, outline: 'records.md' },
  { file: `${SK}/references/interpreter.md`, outline: 'interpreter.md' },
  { file: `${SK}/references/library.md`, outline: 'library.md' },
  { file: `${SK}/references/specification.md`, outline: 'specification.md' },
  { file: `${SK}/references/revival-changes.md`, outline: 'revival-changes.md (new)', kind: 'new' },
  { file: `${SK}/references/gate.md`, outline: 'gate.md' },
  { file: `${SK}/references/worktrees.md`, outline: 'worktrees.md' },
  { file: `${SK}/references/session.md`, outline: 'session.md' },
  { file: `${SK}/references/committing.md`, outline: 'committing.md' },
  { file: `${SK}/references/exploring.md`, outline: 'exploring.md' },
  { file: `${SK}/references/toolchain.md`, outline: 'toolchain.md' },
  { file: `${SK}/references/build-and-caches.md`, outline: 'build-and-caches.md', kind: 'approved' },
  { file: `${SK}/references/tests-writing.md`, outline: 'tests-writing.md', kind: 'approved' },
  { file: `${SK}/references/tests-running.md`, outline: 'tests-running.md (the writer\'s trial)', kind: 'approved' },
]

const COMMON = `You are a skill writer for the Fortress revival repository, /home/user/fortress. First read, and then follow throughout:
- your standing brief, explorations/coordinator/skill-writer-brief.md (ignore its parts about being a resumed headless session and about committing: here you do not commit);
- the seven writing principles, explorations/reviews/skills-writing-principles.md, which the curator has read and judged safe for every rewrite;
- the outline, explorations/reviews/fortress-repo-outline.md: its list "What SKILL.md preloads" and the section for your file. Its decisions are settled at their defaults, and its decision 7 as marked there.
Read the whole skill (${SK}/SKILL.md and every file under ${SK}/references/ except sources.md) before you write, so that your file states each fact once and points to where another file states it.

Rules for this task:
- Edit only your own file. Where something belongs in another file, put it in your result's "moves" with the target file and the exact text; the consolidation step applies it.
- Do not edit ${SK}/references/sources.md. Put the provenance lines your file needs (what each change rests on: a record entry, a report, a commit) in your result's "sources", in that file's form.
- Do not commit, push or run builds. Read source files when a fact needs checking; verify every fact you write against the record or the tree.
- Keep the file no longer than its content needs: where a rewrite adds a sentence, remove one where it can.
- Put in "points_for_curator" only what changes a rule's meaning or adds a new rule; settle everything else yourself.`

const UNIT_PROMPT = (u) => {
  let extra = ''
  if (u.kind === 'skill') extra = `Your file is ${u.file}, the skill's entry point, which every agent reads. Its section "How a program runs" was written today and approved by the curator ("LGTM"); keep its substance and change it only for the principles or the preload list. Bring the rest of the file to the outline's preload list, and add the line for the new part references/revival-changes.md to the parts list, as the outline gives it.`
  else if (u.kind === 'new') extra = `Your file is ${u.file}, a new part: create it as the outline's section "${u.outline}" describes, from the sources it names (explorations/coordinator/process-engineering/revival-story.md part 6 and explorations/coordinator/process-engineering/fortress-changes-chronology.md among them). Each change: the original contradiction, the revival's resolution, its reason, in one or two sentences each.`
  else if (u.kind === 'approved') extra = `Your file is ${u.file}. The curator read and approved it today as it stands at commit ${APPROVED}. Give it the same pass as every other file, by the principles and the outline: expect few or no changes. The curator asked whether it needs a short glossary of its terms at its top; add one only if the principles call for it.${u.file.endsWith('build-and-caches.md') ? ' The curator marked its opening line, the pointer back to SKILL.md\'s "How a program runs", as a useless back reference: remove it, and every other pointer to SKILL.md that gives the reader nothing to do.' : ''}`
  else extra = `Your file is ${u.file}. Rewrite it by the outline's section "${u.outline}" and the principles, as a whole part at once.`
  return COMMON + '\n\n' + extra + '\n\nYour final result: the structured result (file, a short summary of what changed, words before and after, moves, sources, points_for_curator).'
}

const WRITE_SCHEMA = { type: 'object', properties: {
  file: { type: 'string' }, summary: { type: 'string' },
  words_before: { type: 'number' }, words_after: { type: 'number' },
  moves: { type: 'array', items: { type: 'object', properties: { to: { type: 'string' }, text: { type: 'string' } }, required: ['to', 'text'] } },
  sources: { type: 'array', items: { type: 'string' } },
  points_for_curator: { type: 'array', items: { type: 'string' } },
}, required: ['file', 'summary', 'moves', 'sources', 'points_for_curator'] }

phase('Write')
const written = (await parallel(UNITS.map(u => () =>
  agent(UNIT_PROMPT(u), { label: 'write:' + u.file.split('/').pop(), phase: 'Write', schema: WRITE_SCHEMA })))).filter(Boolean)
log(`written: ${written.length} of ${UNITS.length}`)

phase('Consolidate')
const consolidated = await agent(`You consolidate a rewrite of the fortress-repo skill in /home/user/fortress. Sixteen writers each rewrote one file under ${SK}/ and did not commit. Their results, as JSON:

${JSON.stringify(written, null, 1)}

Do this:
1. Apply every "moves" entry to its target file, where the target does not already state it. Where two moves conflict or a move duplicates text, keep one.
2. Add the "sources" lines to ${SK}/references/sources.md, in its form, under a heading for this rewrite of 2026-10-08.
3. Check that SKILL.md's parts list names every file under ${SK}/references/ and that no file points to a section that no longer exists.
4. Commit every changed file under ${SK}/ in one commit: git add -- ${SK} && git commit -m "fortress-repo: every part rewritten by the outline and the seven principles" -- ${SK}, the message ending with these two lines exactly:
${FOOTER}
Do not push. Return the commit hash and what you changed in steps 1 to 3.`, { label: 'consolidate', phase: 'Consolidate', schema: { type: 'object', properties: { commit: { type: 'string' }, changes: { type: 'string' } }, required: ['commit', 'changes'] } })

phase('ColdRead')
const WALKS = [
  'a worker fixing a defect in walk\'s Java code; a worker editing the library (Library/*.fss) under walk; a worker revising a passage of the specification after a decision',
  'a worker fixing a compiled-path defect that fails at run time (an XXX test first, promoted after the fix); a worker running the gate on a merged tree; a worker committing and pushing its change',
  'a worker exploring a question the record does not settle and adding what it found to the record; a worker who only adds tests; a worker starting in a fresh worktree on a fresh machine',
]
const READ_SCHEMA = { type: 'object', properties: {
  findings: { type: 'array', items: { type: 'object', properties: { file: { type: 'string' }, line: { type: 'string' }, what: { type: 'string' }, consequence: { type: 'string' }, confidence: { type: 'string' } }, required: ['file', 'what', 'consequence', 'confidence'] } },
  assumptions: { type: 'array', items: { type: 'object', properties: { assumed: { type: 'string' }, why: { type: 'string' }, source: { type: 'string' }, confidence: { type: 'string' }, acts_wrongly_without: { type: 'boolean' } }, required: ['assumed', 'why', 'acts_wrongly_without'] } },
  terms: { type: 'array', items: { type: 'string' } },
}, required: ['findings', 'assumptions', 'terms'] }
const reads = (await parallel(WALKS.map((w, i) => () => agent(`You are a cold reader of a skill: a reader new to this repository who has only the skill. Read only the files under /home/user/fortress/${SK}/ (SKILL.md and every file under references/ except sources.md). Open no other file, run nothing, and do not load any skill through the Skill tool.

Walk these workers through the skill, step by step, with the lines each acts on: ${w}.

Return:
- findings: every passage that would send one of them wrong, cost it time, or make it search; that reads two ways; that contradicts another; or that comes in an order that makes a worker act before it has read what it needs. Each with its file, line, what it says, what it would make a worker do, and your confidence (high, medium or low). Most costly first.
- assumptions: everything you had to assume, or recall from your own knowledge, that the skill did not tell you, to make the walks work: what, why you needed it, where it came from (prior knowledge or a guess), your confidence, and whether a worker would act wrongly without it.
- terms: terms used before they are defined or never defined, and words used for two things.`, { label: 'coldread:' + (i + 1), phase: 'ColdRead', schema: READ_SCHEMA })))).filter(Boolean)

phase('Fix')
const fixed = await agent(COMMON.replace('Edit only your own file.', 'You may edit any file of the skill except sources.md, whose lines you add at the end as below.').replace('Do not commit, push or run builds.', 'Do not push or run builds.') + `

Your task: fix what three cold readers found in the rewritten skill. Their results, as JSON:

${JSON.stringify(reads, null, 1)}

Fix every finding of high or medium confidence, and every assumption marked as making a worker act wrongly. Where a fact is missing, find it in the record or the tree before you write it. Fix a low-confidence finding where the fix is cheap. Where two readers disagree, follow the text the principles call for. Add provenance lines for your fixes to ${SK}/references/sources.md. Then commit every changed file under ${SK}/ in one commit: git add -- ${SK} && git commit -m "fortress-repo: the cold reads' fixes" -- ${SK}, the message ending with these two lines exactly:
${FOOTER}

Return the commit hash, what you fixed, what you left and why, and the points for the curator.`, { label: 'fix', phase: 'Fix', schema: { type: 'object', properties: { commit: { type: 'string' }, fixed: { type: 'string' }, left: { type: 'string' }, points_for_curator: { type: 'array', items: { type: 'string' } } }, required: ['commit', 'fixed', 'left', 'points_for_curator'] } })

phase('Compare')
const compared = await agent(`You review three parts of the fortress-repo skill in /home/user/fortress that the curator read and approved at commit ${APPROVED}: ${APPROVED_PARTS.map(p => SK + '/references/' + p + '.md').join(', ')}. Since then they went through the same rewrite pass as the rest of the skill, by the seven principles (explorations/reviews/skills-writing-principles.md), and a cold read's fixes. Compare each part as it is now with its approved version (git show ${APPROVED}:<path>).

For each part, judge whether the new version is better, the same, or a regression anywhere: lost knowledge, a changed meaning, a worse order, worse register, or growth without gain. The curator's instruction: where you find a regression, do not revert the part wholesale; write a synthesis of the two versions that keeps the best of each. Where the new version is as good or better, keep it. The curator's approval also covers one change: the removal of build-and-caches.md's opening pointer back to SKILL.md.

Edit only those three files. If you change any, commit them in one commit: git add -- <paths> && git commit -m "fortress-repo: the approved testing parts compared with their approved versions" -- <paths>, the message ending with these two lines exactly:
${FOOTER}
Do not push. Return per part your verdict (kept, synthesized) with what you changed and why, and the commit hash or "none".`, { label: 'compare:fable', phase: 'Compare', model: 'fable', schema: { type: 'object', properties: { parts: { type: 'array', items: { type: 'object', properties: { file: { type: 'string' }, verdict: { type: 'string' }, what: { type: 'string' } }, required: ['file', 'verdict', 'what'] } }, commit: { type: 'string' } }, required: ['parts', 'commit'] } })

return { written: written.map(w => ({ file: w.file, words_before: w.words_before, words_after: w.words_after, points: w.points_for_curator })), consolidated, reads: reads.map(r => ({ findings: r.findings.length, assumptions: r.assumptions.length, wrong_without: r.assumptions.filter(a => a.acts_wrongly_without).length })), fixed, compared }
