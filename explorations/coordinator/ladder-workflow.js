// Autonomous ladder climb: runtime fixes, then library rungs on the compiler path, test-first, gated, committed.
// Run with the Workflow tool ({scriptPath: this file}) after explorations/compile-ladder/REPORT.md exists.
// Boundary: edits only under Library/, ProjectFortress/LibraryBuiltin/, the two named runtime files, the test corpora and explorations/.
export const meta = {
  name: 'ladder-climb',
  description: 'Climb the compile-path ladder: two runtime fixes, then library rungs, each test-first, gated green, committed',
  phases: [
    { title: 'Baseline', detail: 'read the ladder report' },
    { title: 'Runtime fixes', detail: 'ledger 302 and 303, timed and gated' },
    { title: 'Climb', detail: 'one library rung at a time: test, edit, gate, verify, commit' },
    { title: 'Re-run', detail: 'full ladder again, CLIMB.md' },
  ],
}

const MAX_RUNGS = (args && args.maxRungs) || 6
const BRANCH = 'claude/handover-reading-vn8zgr'
const FOOTER = 'Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01LjDz79rDLErtnSKpovMDpX'

const RULES = `
Repo root /home/user/fortress, branch ${BRANCH}. Read explorations/coordinator/PLAN.md first (the rule for every edit, the stop conditions), then explorations/coordinator/FACTS.md and explorations/coordinator/map/README.md §5-6 as needed.
Environment: cd /home/user/fortress && source experiment/env.sh before any fortress or ant command. Before and after any long run: rm -rf /tmp/fortress*rats ProjectFortress/test-tmp; check df -h /; stop and say so if under 500 MB.
Never run two ant targets at once; the Bash tool has a 10-minute ceiling, so run ant testFast and ant testSystem as separate calls with timeout 600000, and ant compileAll only when a Java or Scala file changed. Green means the ant output shows zero failures and zero errors for every suite; grep it, do not assume.
Edits are allowed only under Library/, ProjectFortress/LibraryBuiltin/, ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java, the float-literal runtime value class named in the boxing report, ProjectFortress/library_tests/, ProjectFortress/compiler_tests/, and explorations/. Anything else: stop and report why.
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
  needsOutsideBoundary: { type: 'boolean' },
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
Task: read explorations/compile-ladder/REPORT.md and the driver script beside it. If the report does not exist or the ladder run is still in progress (a driver process alive, or the report incomplete), say so in notes with passCount -1 and topNames empty. Otherwise return: the pass count, the per-phase counts as one string, the missing names ranked by files blocked (name, count, and where in the interpreter library the declaration lives, file:line, found by grep in Library/ and ProjectFortress/LibraryBuiltin/), and the exact command that re-runs the driver on a subset of files (read the script; if it has no subset mode, describe how to run it on a list).`, { label: 'baseline:read', phase: 'Baseline', schema: BASELINE, model: 'opus' })

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

phase('Runtime fixes')
const rt = await agent(`${RULES}
Task: the two one-line runtime defects, test-first. Read explorations/coordinator/FACTS.md (execution model section), explorations/perf-probes/boxing/REPORT.md and explorations/perf-probes/kernels/REPORT.md for the measurements and the exact sites: ledger row 302, ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:246-249, inATransaction() builds its debug string before the debug flag is consulted; ledger row 303, the compiled float literal keeps its value as a String and re-parses it per iteration (find the runtime value class the boxing report names).
Test first: record the timing of the compiled scalar loop from perf-probes/boxing (its own recipe; rerun it as it was run, save the output under explorations/compile-ladder/rung0/before.out). Then make the two smallest edits that remove the waste (guard the debug string behind the flag; parse the literal once). ant compileAll. Rerun the timing, save after.out, and require a measurable drop. Then ant testFast and ant testSystem as separate calls; both must be green. Update the ledger rows 302 and 303 notes, FACTS, and the handover as the rules say. Do not commit. Return what changed, the two timings, and the gate result.`, { label: 'rung0:implement', phase: 'Runtime fixes', schema: RESULT, model: 'opus' })

if (rt && rt.done && !rt.blocked) {
  const v = await gateAndVerify('rung0:verify', rt.summary, 'not applicable for the runtime fixes; instead re-run the boxing timing once more and confirm the drop is real, and run ../bin/fortress junit other_compiler_tests/atomic*.test if such files exist')
  if (v && v.approved) {
    const c = await commit('rung0:commit', 'Runtime: guard the inATransaction debug string, parse float literals once (ledger 302, 303)', rt.summary)
    log(`Rung 0 committed: ${c && c.hash}`)
  } else {
    await revert('rung0:revert', (v && v.reasons) || 'verifier failed')
    log('Rung 0 refused and reverted.')
  }
} else {
  log(`Rung 0 not done: ${rt && (rt.reason || rt.summary)}`)
}

phase('Climb')
const history = []
for (let i = 1; i <= MAX_RUNGS; i++) {
  const plan = await agent(`${RULES}
Task: plan library rung ${i}. Baseline: ${base.passCount} pass; missing names ranked: ${JSON.stringify(base.topNames.slice(0, 12))}. Rungs already landed: ${JSON.stringify(history)}.
Choose the smallest library addition that moves the most files: the highest-ranked name not yet landed whose declaration can be written in Library/CompilerLibrary.fss or ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss (or by uncommenting CompilerAlgebra at ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:124, which is outside the boundary and therefore must be reported, not done). Read the interpreter's declaration of the name (grep Library/ and LibraryBuiltin/), the team's drafts (explorations/coordinator/map/dormant-code.md §1), and the ledger rows for it. If the name needs the checker (nat, int or bool static parameters, where clauses) or a new codegen visitor, set needsOutsideBoundary true and explain. Otherwise write the failing test(s) now: a ProjectFortress/library_tests/<Name>Rung${i}.fss that uses the name the way the blocked interpreter tests do and prints PASS, and a .test file in the format of library_tests/Boolean.test; confirm it fails today with ../bin/fortress junit. Return the plan and the list of baseline files expected to move.`, { label: `rung${i}:plan`, phase: 'Climb', schema: RUNG_PLAN, model: 'opus' })

  if (!plan || !plan.feasible || plan.needsOutsideBoundary) {
    log(`Stopping at rung ${i}: ${plan ? plan.reason || plan.description : 'no plan'}`)
    history.push({ rung: i, stopped: true, reason: plan && (plan.reason || plan.description) })
    break
  }

  let impl = await agent(`${RULES}
Task: implement library rung ${i}: ${plan.description}. Tests: ${JSON.stringify(plan.testFiles)}. Write the declaration in the spec's spelling (Specification/ is the reference; the interpreter's Library/FortressLibrary.fss is the model), as small as the test needs, in Library/CompilerLibrary.fss or CompilerBuiltin.fss with the matching .fsi. The new test must pass (../bin/fortress junit). Then ant testFast and ant testSystem as separate calls, both green; if a library test elsewhere now fails, fix the declaration, not the test. Update the ledger row(s) it closes, FACTS, and the handover. Do not commit. Return what changed and the gate result.`, { label: `rung${i}:implement`, phase: 'Climb', schema: RESULT, model: 'opus' })

  const subsetHint = `re-run the ladder driver (${base.driver}) on these baseline files: ${JSON.stringify(plan.filesExpectedToMove)}`
  let verdict = impl && impl.done ? await gateAndVerify(`rung${i}:verify`, impl.summary, subsetHint) : null

  if (!(verdict && verdict.approved) && impl && impl.done) {
    impl = await agent(`${RULES}
Task: repair library rung ${i}. The skeptic refused it: ${verdict ? verdict.reasons : 'implementation did not finish'}; regressions: ${JSON.stringify(verdict ? verdict.regressions : [])}. Fix the cause with the smallest change inside the boundary, re-run the new test, ant testFast and ant testSystem. Do not commit. Return what changed and the gate result.`, { label: `rung${i}:repair`, phase: 'Climb', schema: RESULT, model: 'opus' })
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
