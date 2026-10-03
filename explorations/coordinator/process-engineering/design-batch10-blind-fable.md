# Batch 10, designed blind: one workflow for pieces W, C, G and N

A design experiment, 2026-10-03. Written from `blind-brief/content.md`,
`requirements.md` and `machine.md`, the source, the specification, the ledger
and `repo-internals.md` alone; nothing under `explorations/coordinator/`,
`compile-ladder/` or `reviews/` was read, and nothing was run. The reader is
the director. Sections: (1) the design in plain words; (2) the script
skeleton, every agent with its tier, reading, prompt and output; (3) how
correctness is assured and where checking is not worth its cost; (4) the
estimate; (5) what to measure or decide before running it.

## 1. The design in plain words

**Shape.** One Workflow run. Four *chains*, one per piece, each in its own
worktree seeded from the built base in 3 s (`seed-worktree.sh`) on its own
branch (`batch10/W`, `batch10/C`, `batch10/G`, `batch10/N`). A chain is a
sequence of *sub-pieces*; each sub-piece is one implementer agent followed by
one checklist verifier (and a fixup when the verifier objects), and W and
C's sub-pieces get one semantic reviewer besides. The chains run through
`pipeline()` so the box's two agent slots are always busy; no barrier until
all four chains have ended. A chain ends with a small *gate runner* that runs
the suites the chain can affect (`testSystem` for all, `testFast` for C) and,
for C, G and N, the distance measurement, and a *reader* that reads the
per-site list by declaration with lines mapped through the diff (the row 577
caution). Then one *integrator* cherry-picks the four branches in the order W,
C, G, N onto `main`'s tip in a fifth worktree, applies every chain's ledger
delta in one pass, builds once, hands to the *merged gate* (`testFast`,
`testSystem`, checker-count, distance), a *report writer* assembles the
batch report, a *final check* reads rule 4 over the landing commit, and the
tip is fast-forwarded onto `main` and pushed.

**Why chains and not one agent per piece.** C has six rows, four crash
traces and a specification passage; G has 57 sites, N 60 plus the drop. One
context for each would pass 300,000 tokens, where quality drops and every
cache miss rewrites the whole context. Nine implementers of 25 to 35 sites
or two to three rows each stay near 150,000 to 250,000 tokens. Sub-pieces of
a chain run in sequence in *one* worktree, so the two pieces that share
`FortressLibrary` (G and N) are each one branch and the only merge of that
file is the integrator's, where the ownership map of the brief's section 3
decides every hunk.

**Why a build is never redone (rule 3).** The base is built once in
`/home/user/fortress` (`ant compileAll`, `global.map` restored, the five
library components compiled; about 200 s); every worktree is a 3 s copy of
it and runs both paths without building. G's and N's edits need no build at
all (wipe `default_repository/caches/*_cache` after a library edit). W's and
C's implementers rebuild after their own Java/Scala edits (25 to 40 s), and
their gate runner is told the worktree is built at HEAD and runs the suites
only (`testFast` and `testSystem` have no `depends`). A test is seen failing
by running it *in the worktree before the first edit* (the worktree then is
the state before the fix, 8 s for a walk run, 5 s for a compile), and its
output is kept in a records directory outside the repository; a verifier
reads that record and never re-runs it. The integrator builds the merged
tree once more, a new state.

**Why the big agents never wait on a long run.** A subagent's cache lives
five minutes; a 250,000-token implementer idling through a 10-minute
`testFast` pays 250,000 tokens at its next call. So implementers run only
their own short checks (their tests, a few programs), commit, and return;
the suites and the 20-minute distance run belong to a Sonnet gate runner
whose whole context is about 50,000 tokens and which polls every four
minutes at most (a poll within the life renews the cache and, by the
project's accounting, costs nothing). Runners take a `flock` on one lock file
around any suite, since two 4-shard suites on four cores halve each other.

**Why the ledger and the report are written once.** Four chains closing and
opening rows in a 608-row file would collide on the next free number and on
adjacent lines. Each implementer returns a *ledger delta* (rows to close with
the test that closes them, rows to open with their text, notes) in its
structured output; the integrator numbers the new rows from the first free
one in chain order and writes the ledger in the landing commit, together
with the `FACTS.md` correction N owes and the batch report. "Closes when its
test passes" is then literally true: the rows are written after the merged
gate.

**Tiers.** Fable for the three agents whose edit restates a rule every test
depends on: W (walk's load check and its interval inference), C-a (the
declaration-level checkers) and C-b (expression typing: varargs, fields, the
dependent bound). Opus for the six agents whose work is judgment over much
reading: C-c (the four crash traces) and the five library repairers. Sonnet
for everything mechanical: verification by checklist, running suites,
reading measurements, the S1-form check. About 46 agents in all.

## 2. The script

A skeleton: real Workflow API, every agent present with tier and effort,
prompts compressed to the instructions that bind them. `args` carries what
the director settles in section 5: `{ base: '/home/user/fortress',
root: '/home/user/batch10', baseSites: '<path of the base per-site TSV>',
nextRow: 609, land: false }`.

```js
export const meta = {
  name: 'batch10-four-pieces',
  description: 'Batch 10: W, C, G, N on seeded worktrees, verified, gated, integrated, landed',
  phases: [
    { title: 'Base',        detail: 'build the base once, seed four worktrees, locate the base per-site list' },
    { title: 'Implement',   detail: 'nine sub-pieces in four chains, test-first, one worktree per chain' },
    { title: 'Verify',      detail: 'checklist verifier per sub-piece; semantic review for W and C' },
    { title: 'Chain gate',  detail: 'suites per chain; distance on C, G, N read by declaration' },
    { title: 'Integrate',   detail: 'cherry-pick W, C, G, N onto main; ledger deltas; one build' },
    { title: 'Merged gate', detail: 'testFast, testSystem, checker-count, distance' },
    { title: 'Land',        detail: 'report, rule-4 check, fast-forward main, push' },
  ],
}

const BRIEF = '/home/user/blind-brief/content.md'   // in the real run: the batch brief file
const ROOT = args.root, BASE = args.base
const REC = (chain, sub) => `${ROOT}/records/${chain}/${sub}`

// An agent call can come back null (harness-failed agent). Retry once; the retry
// is told to read STATE.md first and continue, never restart (rule 3).
async function run(prompt, opts, retryNote) {
  const r = await agent(prompt, opts)
  if (r !== null) return r
  log(`${opts.label}: null result, retrying once`)
  return agent(`${prompt}\n\nRESUME: a previous attempt may have done part of this. Read STATE.md in your records directory first and continue from it; do not rebuild or re-run what it records as done.${retryNote || ''}`, opts)
}

// ---------- the chains ----------
const CHAINS = [
  { id: 'W', tier: 'fable', subs: [
    { id: 'W',  tier: 'fable', effort: 'high', build: true,
      rows: [544, 534, 588], pin: 'lone-parameter', specs: ['inference.tex box :187-201', 'reductions.tex callout :27-44', 'changes.tex :1559 and :1004'] } ] },
  { id: 'C', subs: [
    { id: 'C-b', tier: 'fable', effort: 'high', build: true, rows: [604, 605, 593],
      specs: ['functions.tex :174-183 callout', 'changes.tex new varargs entry'] },
    { id: 'C-a', tier: 'fable', effort: 'high', build: true, rows: [563, 574, 597],
      notes: [561], specs: ['changes.tex :1257 Effect :1317-1320'] },
    { id: 'C-c', tier: 'opus',  effort: 'high', build: true, crashes: 4 } ] },
  { id: 'G', subs: [
    { id: 'G-b', tier: 'opus', effort: 'high', build: false, sites: 'reductions :3022-3777 (27)' },
    { id: 'G-a', tier: 'opus', effort: 'high', build: false, sites: 'generator support :1061-1419 (10), Maybe (1), Indexed/Deleg (2), generators of generators :4564-4695 (17)' } ] },
  { id: 'N', subs: [
    { id: 'N-a', tier: 'opus', effort: 'high', build: false, sites: 'the drop (fail, builtinPrimitive, nullary BIG <|; 18 expected to clear), rows 590 and 602, FortressBuiltin (4), Writer (1)' },
    { id: 'N-b', tier: 'opus', effort: 'high', build: false, sites: 'equality/ordering (3), numeric hierarchy (11), LexicographicOrder/partition/__thrower (3), numeric primitives (18)' },
    { id: 'N-c', tier: 'opus', effort: 'high', build: false, sites: 'List.fsi/.fss (20)' } ] },
]
const MODEL = { fable: 'fable', opus: 'opus', sonnet: 'sonnet' }   // the harness's model ids

// ---------- schemas ----------
const IMPL = { type: 'object', required: ['commit', 'tests', 'ledgerDelta', 'reportMd', 'built'], properties: {
  commit: { type: 'string' }, built: { type: 'boolean' },
  files: { type: 'array', items: { type: 'string' } },
  tests: { type: 'array', items: { type: 'object', properties: {
    name: { type: 'string' }, kind: { type: 'string', enum: ['promoted', 'new-failing', 'pins-today'] },
    beforeRecord: { type: 'string' }, afterRecord: { type: 'string' } } } },
  ledgerDelta: { type: 'object', properties: {
    close: { type: 'array', items: { type: 'object', properties: { row: { type: 'integer' }, text: { type: 'string' } } } },
    open:  { type: 'array', items: { type: 'object', properties: { title: { type: 'string' }, text: { type: 'string' } } } },
    notes: { type: 'array', items: { type: 'object', properties: { row: { type: 'integer' }, text: { type: 'string' } } } } } },
  leftWithRow: { type: 'array', items: { type: 'string' } },
  factsCorrection: { type: 'string' },
  reportMd: { type: 'string' } } }
const VERDICT = { type: 'object', required: ['ok', 'issues'], properties: {
  ok: { type: 'boolean' }, issues: { type: 'array', items: { type: 'object', properties: {
    severity: { type: 'string', enum: ['blocking', 'fix', 'note'] }, where: { type: 'string' }, text: { type: 'string' } } } } } }
const GATE = { type: 'object', required: ['green'], properties: {
  green: { type: 'boolean' }, testFast: { type: 'object' }, testSystem: { type: 'object' },
  checkerCount: { type: 'integer' }, distanceTotal: { type: 'integer' }, tables: { type: 'array', items: { type: 'string' } } } }
const READING = { type: 'object', required: ['cleared', 'survivingInScope', 'appeared'], properties: {
  cleared: { type: 'array' }, survivingInScope: { type: 'array' }, appeared: { type: 'array' },
  byClass: { type: 'object' }, crashRowsGone: { type: 'array' }, tableMd: { type: 'string' } } }

// ---------- prompts (compressed) ----------
const implPrompt = (chain, sub, prevState) => `
You implement sub-piece ${sub.id} of piece ${chain.id} of the Fortress revival's batch 10, in the worktree ${ROOT}/${chain.id} (branch batch10/${chain.id}, already built and seeded; ${prevState ? 'the previous sub-piece ended at ' + prevState.commit : 'at the base'}). Records directory: ${REC(chain.id, sub.id)}; write STATE.md there after every milestone and read it first if it exists.
READ: ${BRIEF} sections 1, 3, 4 and the section "Piece ${chain.id}" (only your rows/sites: ${JSON.stringify(sub.rows || sub.sites || sub.crashes)}); the "existing code to read first" that section lists; the specification passages it cites; the ledger rows it names. Read nothing else under explorations/ but the ledger and repo-internals.md.
ORDER OF WORK (rule 1): (1) promote the XXX tests your rows name (git mv to the plain name by topic; re-key where the defect's absence changes the verdict) and write the owed tests; (2) run every test in this worktree BEFORE any other edit — ../bin/fortress tests/X.fss for walk, ../bin/fortress compile / run for compiled — and save each output to the records directory as before-<test>.txt (a promoted XXX test needs no run: cite the last green gate; a re-keyed or new test does); (3) only then edit; ${sub.build ? '(4) ant compileAll after Java/Scala edits (then git checkout -- default_repository/caches/global.map; recompile the five library components only if you need fortress compile by hand); ' : '(4) after a library edit rm -rf default_repository/caches/*_cache; '}(5) run the tests again, save after-<test>.txt; (6) run the programs the brief lists under "cases the change must treat correctly" / "must keep its verdict" that are cheap (single walk or compile runs; not the suites); (7) commit tests + fix + specification passages as ONE commit on this branch, message naming the rows and the test seen failing; no logs, no scratch, no file under explorations/.
BOUNDS: touch only the files and declarations the brief gives your piece ("Files and lines it changes", section 3's ownership); refer to declarations by name, never by the brief's line numbers after an edit; no team test line changes; no model line changes; nothing into the compiler's prelude; no cast routed round the checker (a site whose only repair is a checker change is left with a ledger row and named in leftWithRow).
SPECIFICATION (rule 5, S1 form): every passage the brief lists for you: a labelled callout that prints in every build at the passage, original text kept, and the Appendix I entry with reason, original sentences quoted with path and line in Specification-1.0-frozen/, and route C; copy the shape of a neighbouring entry.
DO NOT run ant testFast or ant testSystem or the distance measurement (a runner does, once, after you); do not wait more than four minutes between tool calls (a build is 40 s; poll anything longer).
RETURN (schema): the commit, the tests with their record files, the ledger delta (close/open/notes with full row text; do NOT edit the ledger), what you left with a row, ${chain.id === 'N' ? 'the FACTS.md correction the drop implies, ' : ''}and your report section in Markdown: each repair as built with the way not taken${sub.crashes ? '; each crash: its cause, the minimal program, repaired or not and why' : ''}.
${sub.id === 'W' ? 'W-SPECIFIC: before building the row 544 check, confirm String\'s four symbolic families have their meets (FortressLibrary.fss:4231, :4250, :4264, :4274) and that the check reads declared domains (Answer 9) and accepts covering declarations (Comprises at the level of values); for row 534 the restriction is on a WRITTEN Any only; for row 588 the upper end of the interval, never Bottom, F-bounded parameters untouched; the lone-parameter pin test passes before and after. After the build, load each of the twelve library components once by a one-line program importing it.' : ''}
${sub.id === 'C-b' ? 'C-b-SPECIFIC: the varargs body type is the team\'s ImmutableArray[\\T, ZZ32\\] (Types.java:47-49, makeVarargsParamType); applicability per functions.tex "Function Applications"; row 605: find where the checker binds an object\'s names for its body before writing; row 593: measure the location first (Functionals.scala:296-402), the fix must take the narrowest candidate and keep "Conversions". Owed tests: five and six varargs arguments; a varargs parameter used as a sequence; the Link test for 593.' : ''}
${sub.id === 'C-a' ? 'C-a-SPECIFIC: row 563 reuses ownStaticParamsApart (OverloadingChecker.scala:181-202); row 574 changes the message only, never a rule; row 597 either refuses the object expression with a message or returns a note saying what blocks it (the owed compile_err_contains test only when the error exists); note on row 561.' : ''}
${sub.id === 'C-c' ? 'C-c-SPECIFIC: for each of the four crashes write a minimal program that crashes the checker the same way (fortress compile, 5 s); trace the cause to the lines; repair ONLY where the trace finds a few lines and the text says what the checker should report; otherwise the row with the trace and an XXX test keyed on the crash output where a small program shows it.' : ''}
${chain.id === 'G' || chain.id === 'N' ? 'LIBRARY-SPECIFIC: each repair the way the library writes the same thing elsewhere (read the precedents the brief lists first); every device states a meet the exclusion rule reads; Nothing[\\T\\] parametric; a repair that would change a value walk prints is NOT made (row instead); the owed "today\'s value" test calls each repaired declaration under walk and passes before and after (keep both records). You cannot measure the checker per site here; the chain\'s distance run will, and a fixup pass follows if sites in your scope survive — so name, per site, the error message you expect to vanish.' : ''}
`

const verifyPrompt = (chain, sub, impl) => `
Checklist verifier for sub-piece ${sub.id} in ${ROOT}/${chain.id} at commit ${impl.commit}; records in ${REC(chain.id, sub.id)}. Read ${BRIEF} section 3 and the "Files and lines it changes" / "Not" lists of piece ${chain.id}. Do NOT run any build, suite or test (rule 3): read the records.
Check and report each item ok/issue: (1) git diff --name-status <parent>..HEAD lists only allowed paths; nothing under explorations/, no global.map deletion, no .out/.log/scratch. (2) team tests: git diff --diff-filter=MD <parent>..HEAD -- ProjectFortress/tests ProjectFortress/compiler_tests ProjectFortress/library_tests names only files absent from git ls-tree -r --name-only a874948ac; promotions appear as renames. (3) rule 1: every changed original-tree file is covered by a test in the commit whose before-record shows the failure its key names (promoted XXX: the citation of the last green gate suffices; 'pins-today' tests have a passing before- AND after-record). (4) ownership: every hunk in Library/*.fss|.fsi lies in a declaration section 3 gives to piece ${chain.id}. (5) no cast routed round the checker, no edit to the compiler's prelude, no model line. (6) S1 form on every .tex hunk: callout at the passage, original kept, Appendix I entry with reason, frozen path:line quotes, route C. (7) the ledger delta names every row the brief lists for these rows/sites, and leftWithRow items each have an opened row. (8) STATE.md and reportMd present and consistent with the diff.
Severity: blocking = a rule broken; fix = a brief requirement missed; note = otherwise.`

const reviewPrompt = (chain, sub, impl) => `
Semantic reviewer for ${sub.id} (${ROOT}/${chain.id} at ${impl.commit}). Read the Java/Scala diff and the specification passages the brief cites for rows ${JSON.stringify(sub.rows)} (${BRIEF}, piece ${chain.id}, "Decisions that bind it"). Do not build or run (rule 3); reason from the code and the records.
Answer: does the code state exactly the rule the passage states — not wider (over-refusal: a covered pair, an implicit-Any parameter, an F-bounded parameter, a call with as many plain arguments as plain bindings) and not narrower (over-acceptance)? For each of the brief's "cases the change must treat correctly", name the test or program in the records that covers it, or report it missing. Name any library type or team test the change would refuse at load or at compile, by reading. Report blocking/fix/note issues with file:line.`

const fixupPrompt = (chain, sub, impl, issues) => `
Fixup for ${sub.id} in ${ROOT}/${chain.id} at ${impl.commit}. Issues to resolve: ${JSON.stringify(issues)}. Same bounds as the implementer (read ${BRIEF} piece ${chain.id}). Rule 1 still holds: a new behaviour needs its test seen failing first (run it before the edit, keep the record). Rule 3: rebuild only after your own edit. Amend nothing: add one commit. Return the same structure as the implementer, with the merged ledger delta and report.`

const gatePrompt = (chain, commit, what) => `
Gate runner for chain ${chain.id} at ${ROOT}/${chain.id} (built at ${commit}; do NOT run ant compileAll). Source explorations/experiment/env.sh (clears /tmp/fortress*rats), check df. Take flock ${ROOT}/suite.lock around each suite. Run in the background and poll at most every 4 minutes: ${what.join(', ')}. Collect TEST-RESULTS/*.txt counts: ${what.includes('testSystem') ? 'the SUM of the four shards\' tests and failures; ' : ''}${what.includes('testFast') ? 'the four tracks\' tests and failures; ' : ''}${what.includes('distance') ? 'distance: run.sh to ' + ROOT + '/records/' + chain.id + '/distance/run.out with scratch there, then errors.py to sites.tsv and compare.sh against the base table; ' : ''}write a summary.txt in the records directory. Return green (zero failures) and the counts and table paths.`

const readPrompt = (chain, commit, scope) => `
Measurement reader for ${chain.id}. Inputs: the base per-site list ${args.baseSites}; this chain's ${ROOT}/records/${chain.id}/distance/sites.tsv; git diff <base>..${commit} -- Library ProjectFortress/LibraryBuiltin in ${ROOT}/${chain.id}. Map every base site's line through the diff's hunks to its new line and to the DECLARATION it is in (the class table's fixed line ranges misfile after an insertion, ledger row 577: never read the #class rows, derive the class from the declaration and message). Produce: cleared sites (in the base, not now); surviving sites IN SCOPE (${scope}); sites that appeared (unmasked behind a repaired crash or caused — say which, from the crash rows); a class table by this reading; the crash rows that went. Return the table as Markdown too.`

// ---------- Phase: Base ----------
phase('Base')
const base = await run(`
Base agent. In ${BASE} (main): confirm the tree is built at HEAD — if explorations/experiment/env.sh's build marker or default_repository/caches shows a build of this commit, do nothing (rule 3); else ant compileAll, git checkout -- default_repository/caches/global.map, compile the five library components in order (about 200 s total; poll, do not wait silently). Then seed four worktrees with seed-worktree.sh ${BASE} ${ROOT}/<X> batch10/<X> for X in W C G N, and ${ROOT}/records/. Confirm ${args.baseSites} exists (the base per-site TSV); if it does not, say so and STOP — do not run the distance on the base here. Return the base commit, the four worktree paths, and whether a walk run and a compile in ${ROOT}/W each succeed (one tiny program each).`,
  { label: 'base', model: MODEL.sonnet, effort: 'low', schema: { type: 'object', required: ['baseCommit', 'ok'], properties: { baseCommit: { type: 'string' }, ok: { type: 'boolean' }, note: { type: 'string' } } } })
if (!base?.ok) throw new Error('base not ready: ' + (base?.note || 'null'))

// ---------- Phases: Implement / Verify / Chain gate, one pipeline over the four chains ----------
const chainResults = await pipeline(CHAINS,
  // stage 1: the chain's sub-pieces in sequence, each implement -> verify -> fixup -> (review -> fixup)
  async (_, chain) => {
    const done = []; let prev = null
    for (const sub of chain.subs) {
      let impl = await run(implPrompt(chain, sub, prev), { label: `impl ${sub.id}`, phase: 'Implement', model: MODEL[sub.tier], effort: sub.effort, schema: IMPL })
      if (!impl) throw new Error(`${sub.id} failed twice`)
      let v = await run(verifyPrompt(chain, sub, impl), { label: `verify ${sub.id}`, phase: 'Verify', model: MODEL.sonnet, effort: 'medium', schema: VERDICT })
      let serious = (v?.issues || []).filter(i => i.severity !== 'note')
      if (serious.length) {
        impl = await run(fixupPrompt(chain, sub, impl, serious), { label: `fixup ${sub.id}`, phase: 'Verify', model: MODEL[sub.tier], effort: sub.effort, schema: IMPL }) || impl
        v = await run(verifyPrompt(chain, sub, impl), { label: `re-verify ${sub.id}`, phase: 'Verify', model: MODEL.sonnet, effort: 'medium', schema: VERDICT })
      }
      if (chain.id === 'W' || sub.id === 'C-a' || sub.id === 'C-b') {
        const r = await run(reviewPrompt(chain, sub, impl), { label: `review ${sub.id}`, phase: 'Verify', model: MODEL.opus, effort: 'high', schema: VERDICT })
        const rs = (r?.issues || []).filter(i => i.severity !== 'note')
        if (rs.length) impl = await run(fixupPrompt(chain, sub, impl, rs), { label: `fixup2 ${sub.id}`, phase: 'Verify', model: MODEL[sub.tier], effort: sub.effort, schema: IMPL }) || impl
      }
      log(`${sub.id} at ${impl.commit}; verifier ${v?.ok ? 'ok' : 'notes'}`)
      done.push({ sub, impl, verdict: v }); prev = impl
    }
    return { chain, done, head: prev.commit }
  },
  // stage 2: chain gate: suites once at the chain's end state; distance for C, G, N
  async (r) => {
    const what = r.chain.id === 'C' ? ['testFast', 'testSystem', 'distance'] : r.chain.id === 'W' ? ['testSystem'] : ['testSystem', 'distance']
    const gate = await run(gatePrompt(r.chain, r.head, what), { label: `gate ${r.chain.id}`, phase: 'Chain gate', model: MODEL.sonnet, effort: 'low', schema: GATE })
    return { ...r, gate }
  },
  // stage 3: read the measurement by declaration; one fixup pass for a library chain whose sites survive
  async (r) => {
    if (r.chain.id === 'W') return r
    let reading = await run(readPrompt(r.chain, r.head, `piece ${r.chain.id}'s sites`), { label: `read ${r.chain.id}`, phase: 'Chain gate', model: MODEL.sonnet, effort: 'medium', schema: READING })
    if ((r.chain.id === 'G' || r.chain.id === 'N') && reading?.survivingInScope?.length) {
      log(`${r.chain.id}: ${reading.survivingInScope.length} sites survive in scope; one fixup pass`)
      const fx = await run(fixupPrompt(r.chain, r.chain.subs[0], { commit: r.head }, reading.survivingInScope.map(s => ({ severity: 'fix', where: s.location, text: `site still reported: ${s.message}; repair by the library's device or open a row` }))),
        { label: `fixup ${r.chain.id} (sites)`, phase: 'Chain gate', model: MODEL.opus, effort: 'high', schema: IMPL })
      if (fx) {
        r.done.push({ sub: { id: `${r.chain.id}-fix` }, impl: fx }); r.head = fx.commit
        r.gate = await run(gatePrompt(r.chain, r.head, ['testSystem', 'distance']), { label: `re-gate ${r.chain.id}`, phase: 'Chain gate', model: MODEL.sonnet, effort: 'low', schema: GATE })
        reading = await run(readPrompt(r.chain, r.head, `piece ${r.chain.id}'s sites`), { label: `re-read ${r.chain.id}`, phase: 'Chain gate', model: MODEL.sonnet, effort: 'medium', schema: READING })
      }
    }
    return { ...r, reading }
  })

const chains = chainResults.filter(Boolean)
const red = chains.filter(c => !c.gate?.green)
if (red.length || chains.length < 4) throw new Error('chains not green: ' + red.map(c => c.chain.id).join(',') + (chains.length < 4 ? ' (a chain is missing)' : ''))

// ---------- Phase: Integrate (barrier: needs all four) ----------
phase('Integrate')
const deltas = chains.flatMap(c => c.done.map(d => ({ sub: d.sub.id, delta: d.impl.ledgerDelta, left: d.impl.leftWithRow, facts: d.impl.factsCorrection })))
const integ = await run(`
Integrator. Seed ${ROOT}/int from ${BASE} on branch batch10/int at main's tip (git fetch first; if main moved past ${base.baseCommit}, say so and rebase each chain branch on it before picking). Cherry-pick, in this order, every commit of batch10/W, batch10/C, batch10/G, batch10/N (git log <base>..batch10/X). Resolve conflicts only in Library/FortressLibrary.fss|.fsi (G's and N's adjacent hunks) and Specification/appendices/changes.tex (W's and C's entries) by the ownership map in ${BRIEF} section 3: keep every hunk of both sides, drop none. Then one landing commit: (a) the ledger: apply these deltas ${JSON.stringify(deltas)} — close rows with status FIXED and the test that closes them, number new rows from ${args.nextRow} in the order W, C, G, N, add the notes (rows 425, 561, 577, 488 if G says so, 560's first part per N); (b) the FACTS.md correction N returns; (c) nothing else yet (report and gate summary come after the gate). Build ONCE: ant compileAll, git checkout -- default_repository/caches/global.map, the five library components in order. Do not run any suite. Return the integration tip, the conflicts you resolved (file, declaration, how), and the row numbers assigned.`,
  { label: 'integrate', model: MODEL.opus, effort: 'high', schema: { type: 'object', required: ['tip'], properties: { tip: { type: 'string' }, conflicts: { type: 'array' }, rows: { type: 'object' } } } })

// ---------- Phase: Merged gate ----------
phase('Merged gate')
const mgate = await run(gatePrompt({ id: 'int' }, integ.tip, ['testFast', 'testSystem', 'checker-count', 'distance']) + `
Also: the testSystem shard SUM must equal the base's 504 plus the new files added to tests/ (count them with git diff --diff-filter=A); report both. Compare the distance table with the base's (340) and the checker count with the base's (1).`,
  { label: 'merged gate', model: MODEL.sonnet, effort: 'low', schema: GATE })
if (!mgate?.green) throw new Error('merged gate red: ' + JSON.stringify(mgate))
const mread = await run(readPrompt({ id: 'int' }, integ.tip, 'all four pieces\' sites and the four crashes') + `
Attribute every cleared site to its piece (W cannot move the number); separate "unmasked behind a crash repair" from "caused".`,
  { label: 'read merged', phase: 'Merged gate', model: MODEL.sonnet, effort: 'medium', schema: READING })

// ---------- Phase: Land ----------
phase('Land')
const report = await run(`
Report writer. In ${ROOT}/int write explorations/compile-ladder/climb-batch-10/REPORT.md and gate/summary.txt (counts of both suites with the shard sum, checker count, distance total and the class table BY DECLARATION, from ${JSON.stringify(mgate)} and this reading ${JSON.stringify(mread.tableMd)}); the report has one section per piece from these sections ${JSON.stringify(chains.map(c => c.done.map(d => d.impl.reportMd)))}, each piece's own distance reading, the sites left with rows, W's sets now refused and row 588's instance as built, C's crash rows with causes and what each repair unmasked, N's drop result and any walk value changed with before/after, and the revised specification passages. Commit tables and summary only — no run.out, no logs (rule 4). Amend the landing commit or add one; return the tip.`,
  { label: 'report', model: MODEL.opus, effort: 'medium', schema: { type: 'object', required: ['tip'], properties: { tip: { type: 'string' } } } })
const fin = await run(`
Final check in ${ROOT}/int at ${report.tip}: git show --stat of the landing commit(s) names only the ledger, FACTS.md, the batch report folder (REPORT.md, gate/summary.txt, small tables); git status clean; default_repository/caches/global.map present; git log origin/main..batch10/int lists only this batch's commits; both suites green per ${JSON.stringify({ tf: mgate.testFast, ts: mgate.testSystem })}. ${args.land ? 'If all hold: in ' + BASE + ' git merge --ff-only batch10/int into main and git push origin main; if main moved, stop and report.' : 'Do not push; report ready-to-land.'}`,
  { label: 'land', model: MODEL.sonnet, effort: 'low', schema: VERDICT })
return { tip: report.tip, landed: !!args.land && fin?.ok, chains: chains.map(c => ({ id: c.chain.id, head: c.head, gate: c.gate, reading: c.reading })), merged: { gate: mgate, reading: mread }, issues: fin?.issues }
```

### The agents, one line each

| Agent | Count | Tier, effort | Reads | Output |
|---|---|---|---|---|
| Base | 1 | Sonnet, low | nothing but the build state | built base, four seeded worktrees, base TSV located |
| Implementer W | 1 | Fable, high | brief piece W + sections 1, 3, 4; `OverloadedFunction.java`, `BuildEnvironments.java`, `EvaluatorBase.java`; `OverloadingChecker.scala:484-592`; `Formula.solveToBounds`; `overloading.tex`, `inference.tex`, `reductions.tex`, two `changes.tex` entries; rows 544, 534, 588, 425 | commit on `batch10/W`: 3 promoted + 2 owed tests, the two load checks, the interval change, 3 spec passages; ledger delta; report section |
| Implementers C-b, C-a | 2 | Fable, high | piece C; `Functionals.scala`, `Types.java`, `NodeUtil.java`, the field-binding site; `AbstractMethodChecker.scala`, `OverloadingChecker.scala` (message, `ownStaticParamsApart`, `withoutSelf`), `TypeHierarchyChecker.scala`; `functions.tex`, `traits.tex`, `objects.tex`, `inference.tex` | commits on `batch10/C`: promoted tests (604, 605, 593 + Link; 563), owed tests (five/six varargs, sequence body, 574 message, 597 when the error exists), fixes, `functions.tex` callout + new entry, `:1257` Effect; deltas; reports |
| Implementer C-c | 1 | Opus, high | piece C's four crashes; `FortressLibrary.fss:1285-1289`, `:2474-2588`, `:2847-2960`, `Stream`; the checker files the traces name | commit: four minimal programs (XXX where a small program shows it), repairs where few lines, four row texts, report |
| Implementers G-b, G-a | 2 | Opus, high | piece G; its sections of `FortressLibrary.fss/.fsi`; the precedents the brief lists; base per-site messages for its sites | commits on `batch10/G`: repairs, one owed walk test (today's values), delta (rows for sites left), report with the way not taken |
| Implementers N-a, N-b, N-c | 3 | Opus, high | piece N; `fail`/`builtinPrimitive`/`BIG <\|` and their team form; `MatchFailure`; `StridedFullRange2D`; its sections; `List`; `FortressBuiltin`, `Writer`, `NativeArray` | commits on `batch10/N`: the drop, promoted 590/602 tests, repairs, owed walk tests, delta (560's first part, 577 note, FACTS correction), report |
| Checklist verifier | 9 (+ re-verifies ≈ 4) | Sonnet, medium | the sub-piece's diff, records, brief section 3 and its piece's file lists | `VERDICT` |
| Semantic reviewer | 3 (W, C-a, C-b) | Opus, high | the Java/Scala diff, the cited passages, the records | `VERDICT` |
| Fixup | ≈ 4 expected (+ ≤ 2 library site passes) | the implementer's tier | the issues, the brief | `IMPL` (one more commit) |
| Gate runner | 4 chain ends + 1 merged + ≤ 2 re-gates | Sonnet, low | nothing but ant output | `GATE` with counts and table paths |
| Reader | 3 chains + 1 merged + ≤ 2 re-reads | Sonnet, medium | base TSV, chain TSV, the library diff | `READING` by declaration |
| Integrator | 1 | Opus, high | the four branches, section 3, the deltas | `batch10/int` tip, conflicts resolved, rows numbered, one build |
| Report writer | 1 | Opus, medium | the nine report sections, the readings, the gate counts | `REPORT.md`, `gate/summary.txt` committed |
| Final check / land | 1 | Sonnet, low | the landing commit, `origin/main..` | `VERDICT`; ff + push when `args.land` |

## 3. How correctness is assured, and where checking is worth its cost

**The rules are enforced by procedure, not by trust.** Rule 1 is an order of
work in every implementer's prompt (tests, run them in the untouched
worktree, keep the output, then edit) and a verifier item that opens the
before-record and matches the failure to the test's key. Rule 2 is the
merged gate, both suites, with the shard sum compared to 504 plus the files
added. Rule 3 is the seeding (no worktree is ever built from scratch), the
"built at HEAD, do not compileAll" instruction to every runner, the
verifiers' "read the records, never re-run", and the one build of the
integration tree. Rule 4 is the deferral of ledger and report to the landing
commit and the final check's `git show --stat`. Rule 5 is the S1-form item of
the verifier on every `.tex` hunk, checked against a neighbouring entry's
shape.

**Where a check is worth its cost.**
- *The checklist verifier on every sub-piece* (Sonnet, about 70,000 tokens,
  ten minutes). Its failure modes are the ones that would otherwise surface
  an hour later at the integrator (a hunk in the other library piece's
  declaration, a team test edited, a log committed, a row forgotten). Cheap,
  mechanical, high yield.
- *A semantic reviewer on W, C-a and C-b only* (Opus). These three edits
  restate a rule that every test and every library type passes through:
  W's row 544 check could refuse a covered pair or a `String` family; row 534
  could catch an implicit `Any`; row 588 could touch an F-bounded parameter;
  row 604's applicability could lose the "as many plain types" rule. A
  plausible-but-wrong version of any of these passes its own tests and fails
  only in the suite, where the diagnosis costs a Fable context. One reviewer
  with the passages in hand is the right price; a three-vote adversarial
  panel is not, because the suites are a stronger refuter than a second
  reader.
- *The chain-end suite runs* (`testSystem` 4 min for all; `testFast` 10 min
  for C only, since C's `NodeUtil` edit is shared by both paths, while G's
  and N's library files reach the compiled suites through no import — the
  one compiled test that imports a one-library api, `Compiled1.ah.fss`,
  imports `NatReflect`, which no piece edits). They
  localise a red to a chain before the merge; without them a red merged gate
  costs a 35-minute re-gate plus a bisection.
- *The distance run per library chain with one fixup pass.* The brief's
  counts are "by reading"; the measurement is the only place a library
  repair is seen to clear its site. One pass (20 min + an Opus fixup +
  4 min + 20 min) is bounded; a second is not worth its 45 minutes of the
  critical path — surviving sites then become rows, which the brief allows.
- *Reading the measurement by declaration, not by the class table.* Row 577
  says the class table misfiles after an insertion; N's lowest edit is above
  every G declaration. Reading by declaration is the only honest reading.

**Where checking is deliberately not done.**
- No adversarial votes on the 117 library sites: the owed "today's value"
  tests and the full `testSystem` already refute a repair that changes a
  value, and the measurement refutes one that does not clear its error.
- No re-running of any test a verifier doubts (rule 3 forbids it and the
  record suffices); a doubt becomes an issue for the fixup.
- No second reader of specification prose, and no LaTeX build (untested in
  this tree): the S1 shape check and the neighbouring-entry comparison are
  enough for text whose reader is the director.
- No judge panel of alternative designs: the brief has already decided every
  design; the two open locations (rows 593 and 605) are found by reading
  first, which one strong agent does better than three guessing.
- No per-sub-piece suite run inside a chain: a red at the chain's end is
  bisected by sub-piece commit by the fixup agent, and the saving is 15 to
  30 minutes of four-core time per chain.

**Failure handling.** A null agent result is retried once with a resume
note; every implementer keeps `STATE.md` so a retry or a post-restart rerun
continues instead of rebuilding. The 13-hour stop is survived by the
harness's journal (same script, same `args`); the chains' commits are on
their branches, so even a lost agent loses at most one sub-piece's uncommitted
work. A red chain gate stops the whole run before integration (the `throw`),
which is right: the director decides whether to land three pieces or fix
the fourth.

## 4. The estimate

**Agents.** 9 implementers, about 4 fixups plus up to 2 library site passes,
3 semantic reviewers, 9 to 13 checklist verifiers, 5 to 7 gate runners, 4
to 6 readers, 1 base, 1 integrator, 1 report writer, 1 final check: about
46 agents (40 to 52).

**Tokens written** (cache writes + new input; cache reads not counted).
Assumptions: 11,000 written per agent for its first message; a tool call
adds 2,000 to 2,500 new tokens on average (a 150-line read of Scala or the
library is about 2,500); an implementer makes 120 to 150 calls; despite the
four-minute rule each implementer suffers about one cache miss of its
then-context (about 150,000) during a build or a long read; verifiers make
about 40 calls, runners about 25 polls.

| Role | Agents | Tier | Written each | Total |
|---|---|---|---|---|
| Implementers W, C-a, C-b | 3 | Fable | ~450k | 1.35M |
| Implementers C-c, G-a, G-b, N-a, N-b, N-c | 6 | Opus | ~400k | 2.4M |
| Fixups (4 expected + 2 site passes) | 6 | 2 Fable, 4 Opus | ~120k | 0.7M |
| Semantic reviewers | 3 | Opus | ~130k | 0.4M |
| Checklist verifiers (with re-verifies) | 13 | Sonnet | ~70k | 0.9M |
| Gate runners (chain, merged, re-gates) | 7 | Sonnet | ~50k | 0.35M |
| Readers (chain, merged, re-reads) | 6 | Sonnet | ~80k | 0.5M |
| Base, integrator, report, final | 4 | Sonnet, Opus, Opus, Sonnet | 50k, 250k, 170k, 40k | 0.5M |
| **Total** | **~48** | | | **~7.1M** (Fable ~1.6M, Opus ~3.6M, Sonnet ~1.9M) |

A range of 5.5M to 8.5M: the lower end if the four-minute rule holds and
fixups are rare, the upper if two implementers each lose their cache twice.

**Wall time.** Agent-minutes: implementers 9 × 70 (C-b 90, N-c 45) ≈ 630;
verifiers 13 × 10 = 130; reviewers 3 × 20 = 60; fixups 6 × 30 = 180; gate
runners: W 6, G 6 + 20, N 6 + 20, C 18 + 20, merged 45 (compile is already
done; `testFast` 11, `testSystem` 4, count 2, distance 20, overheads), two
re-gates 2 × 25 ≈ 190; readers 6 × 12 = 72; base 8 (built base assumed;
+4 min if not); integrator 40 (3 s seeding, cherry-picks, ledger, one build
of 200 s); report 20; final 5. Sum ≈ 1,330 agent-minutes. With two slots
and about 85 % packing, ≈ 13 hours of wall time at the nominal timings;
with the suites running 1.5× slower beside another agent's work, the
suite-heavy runners stretch it by about half an hour. The critical path
alone (the C chain: three implementers with verifiers and reviewers ≈ 6 h,
then integration, merged gate, report ≈ 1.7 h) is about 8 hours; the
two-slot cap, not the chain, sets the total. **So the run will meet the
13-hour stop once**: the design expects it (journal resume, `STATE.md`,
committed sub-pieces), and section 5 lists the trims that bring it under
(dropping the library site pass and the chain-end `testSystem` for G and N
saves about 1.5 hours; running the three library implementers at Sonnet
would save nothing in time and is not proposed).

**Disk.** Five worktrees at 206 MB ≈ 1 GB; the distance runs' scratch;
`/tmp/fortress*rats` cleaned by every runner before a suite.

## 5. Before running it: measure or decide

Decide:
1. **Rule 1 against the library pieces.** A library repair's only failing
   observation is a site of the distance measurement; no corpus test can
   go red on it until the one library is the compiler's (the compiled tests
   use the prelude). The design treats the base per-site error plus the owed
   "today's value" walk test as rule 1's failing test for G's and N's 117
   sites, and a promoted `XXX` test as it for rows 590 and 602. Confirm or
   rule otherwise; if rule 1 is read strictly, G and N cannot start.
2. **Land automatically or stop at `batch10/int`** (`args.land`). The
   protocol has the director decide what reaches `main`; the default here is
   to stop with the gate green and the log ready.
3. **The report's home and what of the measurement is committed**: the design
   assumes `explorations/compile-ladder/climb-batch-10/` with `REPORT.md`,
   `gate/summary.txt` and the small class/kind tables, never `run.out` or
   the per-site TSV (rule 4). Name the folder and the files wanted.
4. **The base per-site list's path** (`args.baseSites`). If none exists from
   the last full run, one 20-minute run on the base precedes the chains
   (one core, in parallel with the first implementers' reading) — a single
   extra agent, not in the script above.
5. **The next free ledger row** (`args.nextRow`; 609 by the ledger as it
   stands) and that the integrator numbers rows in the order W, C, G, N.
6. **History shape**: cherry-picks (linear, one commit per sub-piece plus
   one landing commit) as designed, or four merge commits. Linear is
   bisectable by sub-piece; merges keep the branches' identity.
7. **Fable's weekly pool** must have about 1.6M written tokens free (three
   implementers and up to two fixups); if not, W moves to Opus first (its
   reviewer stays), then C-a.
8. **`assert`'s and `deny`'s `asDebugString` on `Any`**: the brief says
   narrowing to `Object` is not a repair and the devices for reading an `Any`
   are "to list". Expect N-b to leave these two with a row unless the
   director names the device beforehand.

Measure:
9. **Suite times beside another agent's work** (the factor over 243 s and
   635 s), since two slots mean a suite rarely runs alone; it sets whether
   the chain-end `testSystem` runs stay or go.
10. **Whether a four-minute poll keeps a subagent's cache alive in practice**
    (the five-minute life renewed per call); the token estimate assumes one
    miss per implementer, and the number doubles if polling does not renew.
11. **`seed-worktree.sh` and `old-fortress.sh` on this tree at HEAD** (one
    seeding, one walk run and one compile in the copy): the whole design's
    "no second build" rests on the 3-second copy running both paths.
12. **Whether `String`'s four families pass W's check by reading** before W
    is built: the meets exist (`FortressLibrary.fss:4231`, `:4250`, `:4264`,
    `:4274`), but the check must see `(self, b:String)` as covering
    `(Any, String) ∩ (String, Any)`; if not, row 585 blocks W and must be
    decided first.
13. **The harness's concurrency cap on this box** (two, per `machine.md`;
    the skill's formula gives the same) and whether a detached background
    process survives its agent's end — if it does, the base distance run and
    the chain distance runs can be launched without holding a slot.
