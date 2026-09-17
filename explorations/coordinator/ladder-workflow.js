// Autonomous ladder climb: runtime fixes, then library rungs on the compiler path, test-first, gated, committed.
// Run with the Workflow tool ({scriptPath: this file}) after explorations/compile-ladder/REPORT.md exists.
// Boundary (widened 2026-09-17 on Pavol's word): any source in the tree may be edited under the test-first gate; only design forks stop the climb.
export const meta = {
  name: 'ladder-climb',
  description: 'Climb the compile-path ladder: one rung at a time (library, checker or codegen), each test-first, gated green, skeptic-verified, committed',
  phases: [
    { title: 'Baseline', detail: 'read the ladder report and the rung records' },
    { title: 'Climb', detail: 'one rung at a time: test, edit, gate, verify, commit' },
    { title: 'Re-run', detail: 'full ladder again, CLIMB.md' },
  ],
}

const MAX_RUNGS = (args && args.maxRungs) || 8
const BRANCH = 'claude/handover-reading-vn8zgr'
const FOOTER = 'Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01LjDz79rDLErtnSKpovMDpX'

const RULES = `
Repo root /home/user/fortress, branch ${BRANCH}. Read explorations/coordinator/PLAN.md first (the rule for every edit, the stop conditions), then explorations/coordinator/FACTS.md and explorations/coordinator/map/README.md §5-6 as needed.
Environment: cd /home/user/fortress && source experiment/env.sh before any fortress or ant command. Before and after any long run: rm -rf /tmp/fortress*rats ProjectFortress/test-tmp; check df -h /; stop and say so if under 500 MB.
Never run two ant targets at once; the Bash tool has a 10-minute ceiling, so run ant testFast and ant testSystem as separate calls with timeout 600000, and ant compileAll only when a Java or Scala file changed. Green means the ant output shows zero failures and zero errors for every suite; grep it, do not assume.
Edits are allowed anywhere in the source tree (the checker under scala_src/, the disambiguator and codegen under compiler/, the runtime, the libraries, the test corpora), with these exceptions: never rewrite git history; never touch the session's own configuration files, the project instructions file, explorations/protocol.md, or anything under research/decks/; never hand-edit generated sources (nodes/, the generated parsers, Operators.java; regenerate with ant if a .ast or .rats source changes). Every edit is as small as its failing test needs. A design fork is not yours to take, stop and report it: choosing the array representation (boxed against double[]/int[] backing), choosing between the interpreter's library as the compiler prelude and growing the compiler library beyond what one rung needs, changing the language's semantics against Specification/, or deleting a test to get green (moving a test into not_working_* the team's way is allowed only for a test added in this run). Shadow first (perf-probes/template-check/run-all.sh is the recipe) when a Java or Scala edit's outcome is uncertain. After ant compileAll the next fortress compile clears bytecode_cache: rebuild the compiler-world library jars in the repo-internals order before running anything (compile-ladder/rung0/REPORT.md).
Register for every file you write: plain, one line per paragraph, no flourishes, no time estimates, no model names anywhere in committed files except the mandated commit footer.
Commit format: a one-line subject, a blank line, a body, a blank line, then exactly these two lines:
${FOOTER}
Push with: git push -u origin ${BRANCH} && git push origin ${BRANCH}:main (retry a failed push up to 4 times with 2,4,8,16 s waits; never force, never rewrite history).
Ledger rows in explorations/fortress-gap-ledger.md are never renumbered or re-kinded; a row a commit closes gets "fixed <short hash> (<date>)" appended inside its last column. FACTS.md gets one line per established fact, with its source, in the same commit; explorations/microgpt-run-c-handover.md gets its "State on" paragraph extended by one sentence.
Your final text is data for the orchestrator, not a message to a person.`

const BASELINE = { type: 'object', properties: {
  reportPath: { type: 'string' },
  passCount: { type: 'integer' },
  perPhase: { type: 'string' },
  topNames: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, files: { type: 'integer' }, where: { type: 'string' } }, required: ['name', 'files'] } },
  driver: { type: 'string' },
  notes: { type: 'string' } }, required: ['reportPath', 'passCount', 'topNames', 'driver'] }

const RUNG_PLAN = { type: 'object', properties: {
  feasible: { type: 'boolean' },
  name: { type: 'string' },
  description: { type: 'string' },
  testFiles: { type: 'array', items: { type: 'string' } },
  filesExpectedToMove: { type: 'array', items: { type: 'string' } },
  designFork: { type: 'boolean' },
  reason: { type: 'string' } }, required: ['feasible', 'description'] }

const RESULT = { type: 'object', properties: {
  done: { type: 'boolean' },
  summary: { type: 'string' },
  filesChanged: { type: 'array', items: { type: 'string' } },
  gate: { type: 'string' },
  blocked: { type: 'boolean' },
  reason: { type: 'string' } }, required: ['done', 'summary'] }

const VERDICT = { type: 'object', properties: {
  approved: { type: 'boolean' },
  reasons: { type: 'string' },
  regressions: { type: 'array', items: { type: 'string' } } }, required: ['approved', 'reasons'] }

const COMMIT = { type: 'object', properties: { committed: { type: 'boolean' }, hash: { type: 'string' }, pushed: { type: 'boolean' }, note: { type: 'string' } }, required: ['committed'] }

phase('Baseline')
const base = await agent(`${RULES}
Task: read explorations/compile-ladder/REPORT.md, the driver script beside it, and every explorations/compile-ladder/rung*/REPORT.md (rung 0 landed: the two runtime fixes; rung 1, Equality, was refused under the old stop condition and its findings are the first rung now: the prelude list is duplicated at compiler/WellKnownNames.java:124 and disambiguator/TopLevelEnv.java:967-976, the checker rejects `comprises T` in Library/CompilerAlgebra.fsi:24 at scala_src/types/TypeAnalyzer.scala:764-766, library_tests/MaybeTest9.fss declares its own Equality, and the parked test is not_working_library_tests/EqualityRung1). If the report does not exist yet, or a run-ladder.sh process is still alive (pgrep -f run-ladder.sh), the baseline worker is still running: wait for it with the Monitor tool (an until-loop on: the report file exists and no run-ladder.sh process is alive), up to two hours; foreground sleep is not available. If after that the report still does not exist, say so in notes with passCount -1 and topNames empty. Otherwise return: the pass count, the per-phase counts as one string, the missing names ranked by files blocked (name, count, and where in the interpreter library the declaration lives, file:line, found by grep in Library/ and ProjectFortress/LibraryBuiltin/), and the exact command that re-runs the driver on a subset of files (read the script; if it has no subset mode, describe how to run it on a list).`, { label: 'baseline:read', phase: 'Baseline', schema: BASELINE, model: 'opus' })

if (!base || base.passCount < 0) {
  log('Ladder baseline not available; nothing done.')
  return { stopped: 'no baseline', notes: base && base.notes }
}
log(`Baseline: ${base.passCount} pass; top names: ${base.topNames.slice(0, 5).map(n => `${n.name}(${n.files})`).join(', ')}`)

async function gateAndVerify(label, implementSummary, subsetHint) {
  return agent(`${RULES}
You are the skeptic for the change described below. Your default is to refuse. Do not edit source files.
Change: ${implementSummary}
Checks, all of them: (1) git diff --stat and read the full diff; refuse anything outside the allowed boundary or larger than the test needs. (2) The new test(s) pass by ../bin/fortress junit <dir>/<name>.test from ProjectFortress. (3) The gate is green: read the newest outputs under ProjectFortress/TEST-RESULTS/ for testFast and testSystem, confirm they are from after the edit (timestamps) and show zero failures; if they are missing or stale, run ant testFast and ant testSystem yourself as separate calls. (4) The ladder subset: ${subsetHint}; every file in the subset reaches at least the phase it reached in the baseline, and at least one moves up. (5) The ledger, FACTS and handover edits are present and in the plain register. List every regression you find. Approve only if all five hold.`, { label, phase: 'Climb', schema: VERDICT, model: 'opus' })
}

async function commit(label, subject, what) {
  return agent(`${RULES}
Task: commit and push the approved change. git status must show only files inside the boundary. Subject line: "${subject}". Body: ${what}. Then push as the rules say. Return the short hash and whether the push succeeded.`, { label, phase: 'Climb', schema: COMMIT, model: 'opus' })
}

async function revert(label, why) {
  return agent(`${RULES}
Task: the change was refused (${why}). Revert every uncommitted edit: git checkout -- . and git clean -fd limited to the boundary paths, then confirm git status is clean. Append one paragraph to explorations/coordinator/PLAN.md under a heading "Refused rungs" saying what was tried and why it was refused, commit that paragraph alone with subject "Ladder: refused rung recorded", and push.`, { label, phase: 'Climb', schema: COMMIT, model: 'opus' })
}

// Rung 0 (the two runtime fixes, ledger 302 and 303) landed by hand as commit 53362cb88; the climb starts at rung 1.
phase('Climb')
const history = []
for (let i = 1; i <= MAX_RUNGS; i++) {
  const plan = await agent(`${RULES}
Task: plan rung ${i}. Baseline: ${base.passCount} pass; missing names ranked: ${JSON.stringify(base.topNames.slice(0, 12))}. Rungs already landed: ${JSON.stringify(history)}.
Choose the smallest change that moves the most files up the ladder, wherever it lives: a library declaration, a checker fix, a disambiguator fix, a codegen visitor. Read the interpreter's declaration of the name (grep Library/ and LibraryBuiltin/), the team's drafts (explorations/coordinator/map/dormant-code.md §1), the map's feature table (explorations/coordinator/map/spec-to-implementation.md) for where the mechanism lives, and the ledger rows for it. Rung 1 is the Equality knot recorded in explorations/compile-ladder/rung1/REPORT.md: its test is not_working_library_tests/EqualityRung1, moved back into library_tests/. Set designFork true only for a fork the rules reserve, and explain. Otherwise write the failing test(s) now: for a library rung a ProjectFortress/library_tests/<Name>Rung${i}.fss printing PASS with its .test in the format of library_tests/Boolean.test; for a checker or codegen rung a ProjectFortress/compiler_tests/ program with its .test (link, run, run_out_WIcontains=PASS; or compile_err_equals for a negative test); confirm it fails today with ../bin/fortress junit. Return the plan and the list of baseline files expected to move.`, { label: `rung${i}:plan`, phase: 'Climb', schema: RUNG_PLAN, model: 'opus' })

  if (!plan || !plan.feasible || plan.designFork) {
    log(`Stopping at rung ${i}: ${plan ? plan.reason || plan.description : 'no plan'}`)
    history.push({ rung: i, stopped: true, reason: plan && (plan.reason || plan.description) })
    break
  }

  let impl = await agent(`${RULES}
Task: implement rung ${i}: ${plan.description}. Tests: ${JSON.stringify(plan.testFiles)}. Make the smallest edit the test needs: library code in the spec's spelling (Specification/ is the reference; Library/FortressLibrary.fss is the model), Java and Scala in the surrounding style; ant compileAll when Java or Scala changed, then rebuild the library jars in order. The new test must pass (../bin/fortress junit). Then ant testFast and ant testSystem as separate calls, both green; if another test now fails, fix the cause, not the test (a test that declared its own private copy of a name the prelude now provides is fixed by removing the private copy). Update the ledger row(s) it closes, FACTS, and the handover. Do not commit. Return what changed and the gate result.`, { label: `rung${i}:implement`, phase: 'Climb', schema: RESULT, model: 'opus' })

  const subsetHint = `re-run the ladder driver (${base.driver}) on these baseline files: ${JSON.stringify(plan.filesExpectedToMove)}`
  let verdict = impl && impl.done ? await gateAndVerify(`rung${i}:verify`, impl.summary, subsetHint) : null

  if (!(verdict && verdict.approved) && impl && impl.done) {
    impl = await agent(`${RULES}
Task: repair rung ${i}. The skeptic refused it: ${verdict ? verdict.reasons : 'implementation did not finish'}; regressions: ${JSON.stringify(verdict ? verdict.regressions : [])}. Fix the cause with the smallest change, re-run the new test, ant testFast and ant testSystem. Do not commit. Return what changed and the gate result.`, { label: `rung${i}:repair`, phase: 'Climb', schema: RESULT, model: 'opus' })
    verdict = impl && impl.done ? await gateAndVerify(`rung${i}:verify2`, impl.summary, subsetHint) : null
  }

  if (verdict && verdict.approved) {
    const c = await commit(`rung${i}:commit`, `Ladder rung ${i}: ${plan.name || plan.description.slice(0, 60)}`, impl.summary)
    history.push({ rung: i, name: plan.name, commit: c && c.hash, moved: plan.filesExpectedToMove })
    log(`Rung ${i} committed: ${c && c.hash}`)
  } else {
    await revert(`rung${i}:revert`, (verdict && verdict.reasons) || (impl && impl.reason) || 'not done')
    history.push({ rung: i, name: plan.name, refused: true })
    log(`Rung ${i} refused and reverted; stopping.`)
    break
  }
}

phase('Re-run')
const final = await agent(`${RULES}
Task: re-run the full ladder driver (${base.driver}) exactly as the baseline was run, into explorations/compile-ladder/after/, and write explorations/compile-ladder/CLIMB.md: the rungs landed (${JSON.stringify(history)}), the pass count before (${base.passCount}) and after, the per-phase counts before and after, every file that moved up and every file that moved down (there must be none; if any, say so first), and the new ranking of missing names. Extend the handover's "State on" paragraph by one sentence. Commit with subject "Ladder: climb record and re-run" and push.`, { label: 'final:rerun', phase: 'Re-run', schema: COMMIT, model: 'opus' })

return { baselinePass: base.passCount, rungs: history, final }
