export const meta = {
  name: 'ledger-rewrite',
  description: 'Rewrite the gap ledger to its row template in topic sections: build ledger.py, group the rows, check candidate duplicates, rewrite each group, merge and verify',
  phases: [
    { title: 'Tool', detail: 'build ledger.py and print every row head' },
    { title: 'Group', detail: 'sort rows into topic sections and groups; list candidate duplicates' },
    { title: 'Duplicates', detail: 'check each group candidate duplicate sets against the full rows' },
    { title: 'Rewrite', detail: 'one rewriter per group writes its rows to the template' },
    { title: 'Merge', detail: 'assemble the ledger and its history, run the checks, commit' },
  ],
}

const BASE = args.base
const DATE = args.date
const DIR = args.dir

const COMMON = `You work in the Fortress revival repository at /home/user/fortress, on \`main\`, in one step of a workflow that rewrites the gap ledger (\`explorations/fortress-gap-ledger.md\`, 638 rows, about 1.25M characters) to a row template, sorted into topic sections. The workflow started from commit ${BASE}. Load the \`fortress-repo\` skill first.

Never read the ledger whole and never print whole matching lines from it (one row can be 12K characters). Read a row with \`explorations/coordinator/tools/facts-extract.sh 'ledger:N'\` or, once it exists, \`python3 explorations/coordinator/tools/ledger.py show N\`.

The proposal behind the rewrite is \`explorations/coordinator/process-engineering/gap-ledger-archaeology.md\` section 4 (4.1 the row template, 4.2 the consolidation, 4.3 the tool). The curator's decisions on it, which override the proposal where they differ (POSITIONS entry "The gap ledger's form."):
- Status: exactly one word of seven: POSITIVE-VERIFIED, NEGATIVE-VERIFIED, NEGATIVE-BOUNDED, CONTESTED, RETIRED, FIXED, DUPLICATE. No second status, nothing in brackets. A row with one half fixed stays NEGATIVE-VERIFIED and its notes say which half is fixed.
- Class: \`kind (area)\`; kind one of the legend's seven (implementation gap, library gap vs spec, library bug, design limit, deliberate, typesetter, packaging); area one of parser, walk, checker, codegen, runtime, library, prelude, specification, tests, tools; \`—\` only for POSITIVE-VERIFIED and RETIRED.
- Specification citation: the file and the section heading; a line number only against \`Specification-1.0-frozen/\`; \`silent\` where the specification does not say.
- Limits: the whole row at most 1,200 characters; claim at most 300 (its first 150 name the defect); reproducer at most 200; found by at most 60; notes at most 700.
- A pipe inside a cell is written \`\\|\`.
- The full earlier line of every changed row goes, unchanged, to one history file, \`explorations/fortress-gap-ledger-history.md\`, so nothing is lost.
- The rows are sorted into topic sections; every row keeps its number. Row 83, today in a seven-cell table of its own, becomes an eight-cell row in its section.

Do not write a model identifier string anywhere. Commit only the paths your step names, in one command (\`git add -- <paths> && git commit -m '<message>' -- <paths>\`), the message ending with the two footer lines the skill gives. Other agents commit other paths in this tree: if git reports an \`index.lock\`, wait a few seconds and retry. Do not push.`

phase('Tool')
const TOOL_SCHEMA = {
  type: 'object',
  properties: {
    commit: { type: 'string' },
    heads: { type: 'string' },
    rows: { type: 'array', items: { type: 'integer' } },
    check_summary: { type: 'string' },
  },
  required: ['commit', 'heads', 'rows', 'check_summary'],
}
const tool = await agent(`${COMMON}

Your step: build the ledger's tool.

1. Write \`explorations/coordinator/tools/ledger.py\` as section 4.3 of the proposal describes, with these changes:
   - The file is sorted into topic sections. \`add FILE --section TITLE\` inserts the row into that section's table in number order (the template checked, a lock on \`explorations/.ledger.lock\`, the number max + 1). \`sections\` lists the section titles with their row counts. \`section TITLE\` prints the heads of that section's rows.
   - \`heads\` prints one tab-separated line per row: number, status, class, the claim's first 150 characters, and the paths the row cites in backticks.
   - \`show N [--short]\`, \`find WORDS [--open] [--cites FILE]\`, \`note\`, \`close\`, \`duplicate\` and \`count\` as section 4.3 says, all writes checking the template.
   - \`check\` lints every row against the template; \`check --rows FILE\` lints a file holding only row lines; \`check --base COMMIT\` also verifies that every row at that commit is the same line now or has its full earlier line in the history file, and that the set of row numbers is unchanged (rows may sit in other sections). It must parse today's ledger (row 83's seven-cell table, rows whose cells hold unescaped pipes) and report today's failures without crashing.
   - The parser splits cells only at a pipe that is not escaped as \`\\|\`.
   - Leave out \`fold\` and \`add --draft\`: numbering during parallel batches is still open.
2. Make the \`ledger:\` and \`ledger-find:\` queries of \`explorations/coordinator/tools/facts-extract.py\` call ledger.py's parser, printing what they print today.
3. Write a small test over a temporary copy of the ledger (for example \`explorations/coordinator/tools/test_ledger.py\`) and run it. Do not change the ledger itself.
4. Commit the tool, its test and the facts-extract change.
5. Write the heads of every row to \`${DIR}/heads.tsv\` (under \`tmp/\`, which git ignores; create the folder).

Return the commit, the heads path, every row number in the ledger, and the output of \`ledger.py check\` on today's ledger summarized as counts by rule.`, { label: 'tool', phase: 'Tool', schema: TOOL_SCHEMA })
if (!tool) throw new Error('the tool step returned nothing')
const ALL = tool.rows
log(`tool ${tool.commit}: ${ALL.length} rows; ${tool.check_summary.slice(0, 200)}`)

phase('Group')
const GROUP_SCHEMA = {
  type: 'object',
  properties: {
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          scope: { type: 'string' },
          groups: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                rows: { type: 'array', items: { type: 'integer' } },
              },
              required: ['id', 'title', 'rows'],
            },
          },
        },
        required: ['title', 'scope', 'groups'],
      },
    },
    candidates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          group: { type: 'string' },
          rows: { type: 'array', items: { type: 'integer' } },
          why: { type: 'string' },
        },
        required: ['group', 'rows', 'why'],
      },
    },
  },
  required: ['sections', 'candidates'],
}
function problems(g) {
  const seen = new Map()
  const groupOf = new Map()
  for (const s of g.sections) for (const gr of s.groups) for (const r of gr.rows) {
    seen.set(r, (seen.get(r) || 0) + 1)
    groupOf.set(r, gr.id)
  }
  const missing = ALL.filter(r => !seen.has(r))
  const twice = [...seen].filter(([r, c]) => c > 1).map(([r]) => r)
  const unknown = [...seen.keys()].filter(r => !ALL.includes(r))
  const split = g.candidates.filter(c => !c.rows.every(r => groupOf.get(r) === c.group)).map(c => c.rows)
  const out = []
  if (missing.length) out.push(`rows in no group: ${missing.join(', ')}`)
  if (twice.length) out.push(`rows in two groups: ${twice.join(', ')}`)
  if (unknown.length) out.push(`row numbers that are not in the ledger: ${unknown.join(', ')}`)
  if (split.length) out.push(`candidate sets not inside their named group: ${split.map(x => x.join('/')).join('; ')}`)
  return out
}
const GROUP_PROMPT = `${COMMON}

Your step: sort every row of the ledger into topic sections and groups, and list candidate duplicates.

Read \`${DIR}/heads.tsv\` (every row's head: number, status, class, the claim's first 150 characters, the files it cites), section 3 of the proposal (its 7 duplicate groups and 59 sibling groups) and the ledger's current section titles (\`python3 explorations/coordinator/tools/ledger.py sections\`).
- Make 10 to 18 topic sections, each a subject a worker would look up when working in one area of the language or the implementation; choose them from the rows.
- Inside each section, make groups of 10 to 25 rows that one rewriter can hold together: rows that cite the same files or describe the same mechanism side by side. Keep every sibling group and duplicate group of section 3 inside one group.
- Every row is in exactly one group. Number the groups g01, g02, ... in reading order.
- List the candidate duplicate sets: two or more rows that may record the same defect at the same site. Include the 7 groups of section 3.2 and any others the heads suggest. A candidate set lies inside one group.
- Read a row in full only to settle a doubtful placement (\`ledger.py show N --short\`).
Write nothing to the repository.

Return the sections in reading order, each with its title, a one-sentence scope and its groups (id, a short title, the row numbers), and the candidate duplicate sets, each with its group and why.`
let grouping = await agent(GROUP_PROMPT, { label: 'group', phase: 'Group', schema: GROUP_SCHEMA })
for (let attempt = 0; attempt < 2 && grouping && problems(grouping).length; attempt++) {
  const p = problems(grouping)
  log(`grouping needs correction: ${p.join(' | ').slice(0, 300)}`)
  grouping = await agent(`${GROUP_PROMPT}

An earlier attempt returned the result below, which has these problems: ${p.join('; ')}. Return the corrected whole result.

${JSON.stringify(grouping)}`, { label: `group-fix-${attempt + 1}`, phase: 'Group', schema: GROUP_SCHEMA })
}
if (!grouping || problems(grouping).length) throw new Error('grouping did not cover every row once: ' + (grouping ? problems(grouping).join('; ') : 'no result'))
const GROUPS = grouping.sections.flatMap(s => s.groups.map(g => ({ ...g, section: s.title })))
log(`${grouping.sections.length} sections, ${GROUPS.length} groups, ${grouping.candidates.length} candidate duplicate sets`)

const DUP_SCHEMA = {
  type: 'object',
  properties: {
    sets: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          rows: { type: 'array', items: { type: 'integer' } },
          duplicates: {
            type: 'array',
            items: {
              type: 'object',
              properties: { row: { type: 'integer' }, of: { type: 'integer' }, add: { type: 'string' } },
              required: ['row', 'of', 'add'],
            },
          },
          note: { type: 'string' },
        },
        required: ['rows', 'duplicates', 'note'],
      },
    },
  },
  required: ['sets'],
}
const REWRITE_SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    changed: { type: 'array', items: { type: 'integer' } },
    unchanged: { type: 'array', items: { type: 'integer' } },
    duplicates: { type: 'array', items: { type: 'object', properties: { row: { type: 'integer' }, of: { type: 'integer' } }, required: ['row', 'of'] } },
    concerns: { type: 'string' },
  },
  required: ['file', 'changed', 'unchanged', 'duplicates', 'concerns'],
}

const results = await pipeline(
  GROUPS,
  async (g) => {
    const cands = grouping.candidates.filter(c => c.group === g.id)
    if (!cands.length) return { sets: [] }
    const r = await agent(`${COMMON}

Your step: decide which candidate duplicate sets of group ${g.id} ("${g.title}") are true duplicates. A duplicate records the same defect at the same site as another row. A sibling, the same mechanism at another site, is not a duplicate. For each set, read its rows whole (\`python3 explorations/coordinator/tools/ledger.py show N\`) and decide. For each true duplicate, name the row that keeps the content (usually the earlier one, but the one that holds more wins) and the one sentence the keeper lacks, or an empty string if it lacks nothing. Write nothing to the repository.

The sets:
${cands.map(c => `- rows ${c.rows.join(', ')}: ${c.why}`).join('\n')}

Return each set with its duplicates and a one-line note.`, { label: `dup:${g.id}`, phase: 'Duplicates', model: 'sonnet', schema: DUP_SCHEMA })
    return r || { sets: [], failed: true }
  },
  async (dups, g) => {
    const verdicts = (dups.sets || []).flatMap(s => s.duplicates)
    const prompt = `${COMMON}

Your step: rewrite the rows of group ${g.id} ("${g.title}", in the section "${g.section}") to the template. The rows: ${g.rows.join(', ')}.

Duplicate verdicts for this group (from the step before you): ${verdicts.length ? verdicts.map(d => `row ${d.row} is a duplicate of row ${d.of}${d.add ? `; the keeper gains: ${d.add}` : ''}`).join('. ') : 'none'}.${dups.failed ? ' (The duplicate check failed for this group: treat no row as a duplicate.)' : ''}

The ledger check of today, \`explorations/coordinator/process-engineering/ledger-check.md\`, lists mismatches between the batch records and the ledger; search it for your row numbers and fix any that concern your rows (a cell split on an unescaped pipe; a sentence a record says the row holds and it does not, if the record's sentence is still true).

For each row, read it whole (\`python3 explorations/coordinator/tools/ledger.py show N\`) and write its new line:
- A row that already fits the template stays byte for byte as it is.
- A closed row (its status FIXED, or its fix recorded in its status or notes, with no part left open) becomes the one-line form of section 4.2 step 1: \`| N | <the claim's first sentence, at most 150 characters> | FIXED | <class> | <spec> | <test> | <found by> | fixed <hash> (<batch, rung>); full text: history, row N |\`. The test is the one that checks the fix today: take it from the row, or from the fixing commit (\`git show --stat <hash>\`), and check that it exists (\`git ls-files\`). A row with a part still open stays NEGATIVE-VERIFIED and its notes say which half is fixed.
- A true duplicate becomes \`| N | <its claim, shortened> | DUPLICATE | <class> | <spec> | <reproducer> | <found by> | duplicate of row M; full text: history, row N |\`, and the keeper's notes gain the sentence the verdict names.
- Every other row is rewritten to the template. The claim is one sentence in the present tense. The notes keep the mechanism with its file:line, the workaround, and \`siblings: N, M\` first if there are any. What section 4.1's second table says does not go in a row leaves it: the design of the repair, test bookkeeping, the batch's story, the curator's words, dates and the hashes of the run that found it. When anything was cut, the notes end \`full text: history, row N\`.
- Keep every fact a worker needs to act on an open row: its mechanism, its reproducer, its workaround. Do not invent: everything in a new line is in the old line or in the files it cites.

Write the group's new lines to \`${DIR}/groups/${g.id}.md\`: one line per row, in number order, nothing else. Run \`python3 explorations/coordinator/tools/ledger.py check --rows ${DIR}/groups/${g.id}.md\` and fix what it reports. Write nothing to the repository.

Return the file path, the rows changed and unchanged, the duplicates applied, and anything you could not fit without losing a fact an open row needs.`
    let r = await agent(prompt, { label: `rewrite:${g.id}`, phase: 'Rewrite', schema: REWRITE_SCHEMA })
    if (!r) r = await agent(prompt + `\n\nAn earlier attempt at this step returned nothing. Check \`${DIR}/groups/${g.id}.md\`: if it holds every row and passes the check, return it; otherwise finish it.`, { label: `rewrite:${g.id}:retry`, phase: 'Rewrite', schema: REWRITE_SCHEMA })
    return r ? { ...r, id: g.id } : { id: g.id, failed: true }
  },
)

phase('Merge')
const failed = results.filter(r => !r || r.failed).map(r => r && r.id)
if (failed.length) log(`groups with no rewrite: ${failed.join(', ')}; their rows keep their old lines`)
const MERGE_SCHEMA = {
  type: 'object',
  properties: {
    commit: { type: 'string' },
    sizes: { type: 'string' },
    counts: { type: 'string' },
    sections: { type: 'string' },
    checks: { type: 'string' },
    remaining: { type: 'string' },
  },
  required: ['commit', 'sizes', 'counts', 'sections', 'checks', 'remaining'],
}
const plan = grouping.sections.map((s, i) => `${i + 1}. ${s.title}: ${s.scope}\n   groups: ${s.groups.map(g => `${g.id} (${g.rows.length} rows)`).join(', ')}`).join('\n')
const merge = await agent(`${COMMON}

Your step: assemble the rewritten ledger and its history, check them, and commit.

The sections, in order, with their groups (each group's new rows are in \`${DIR}/groups/<id>.md\`; the group lists are in the files themselves):
${plan}
${failed.length ? `\nGroups with no rewrite, whose rows keep their old lines from the base: ${failed.join(', ')}. Their row numbers: ${GROUPS.filter(g => failed.includes(g.id)).flatMap(g => g.rows).join(', ')}.\n` : ''}
1. Write the new \`explorations/fortress-gap-ledger.md\`:
   - a short header: what the ledger is, in three sentences, and how to use it (read with \`explorations/coordinator/tools/facts-extract.sh 'ledger:N'\` and \`'ledger-find:WORDS'\`; write only with \`explorations/coordinator/tools/ledger.py\`);
   - the legend, rewritten as the template: the cells and their rules as a list, with the decisions above;
   - the sections in the order given, each \`## N. Title\`, its one-sentence scope, the table header \`| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |\` with its separator line, and its rows in number order.
2. Write \`explorations/fortress-gap-ledger-history.md\`: a header comment saying what the file is; a section \`## Rewritten ${DATE}, to the template in topic sections\`; for every row whose line changed, \`### Row N\`, a comment line saying what became of it (\`closed by <hash>\`, \`duplicate of row M\`, \`rewritten to the template\`), and its line at the base, unchanged; then a section holding, verbatim, every part of the base file that is not a row: the old header and legend, the old section headings and their prose, the "Contested / unsettled" table's header and prose, "Disagreements resolved", the revival worklist and the counts (the counts are printed by \`ledger.py count\` from now on; the worklist was stale).
   Do both with a script from the group files and \`git show ${BASE}:explorations/fortress-gap-ledger.md\`, not by hand.
3. Run \`python3 explorations/coordinator/tools/ledger.py check --base ${BASE}\` and \`python3 explorations/coordinator/tools/ledger.py check\`. Both must pass. If a row fails the template, fix that row in place; the history already holds its old line.
4. List every citation of the ledger by line number outside the ledger and its history (\`git grep -n 'fortress-gap-ledger.md:[0-9]'\`). Fix those under \`explorations/\` except \`explorations/coordinator/FACTS.md\`, \`POSITIONS.md\`, the batch script \`explorations/coordinator/climb-batch-workflow.js\` and its manual; do not touch \`.claude/skills/\`.
5. Commit the ledger, its history and the citation fixes in one command. Do not push.

Return the commit; the ledger's size before and after and the history's size, in characters; the counts of rows changed, closed to one line, made duplicates and unchanged; the sections with their row counts; the last lines of both checks; and, as \`remaining\`, every line outside your remit that cites the ledger by line number or describes its old layout (in FACTS, POSITIONS, the skills' records part, the batch script and its manual), each with its path and line.`, { label: 'merge', phase: 'Merge', schema: MERGE_SCHEMA })

return {
  tool: tool.commit,
  groups: GROUPS.length,
  failed,
  concerns: results.filter(r => r && r.concerns && r.concerns.trim() && !/^none\.?$/i.test(r.concerns.trim())).map(r => `${r.id}: ${r.concerns}`),
  merge,
}