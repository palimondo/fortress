// Recovered verbatim on 2026-09-18 from the Workflow tool_use record of
// 2026-09-17T19:26:42Z in the dead coordinating session's transcript
// (`transcripts` branch, session bdff267d-..., part 001.jsonl): the script that
// launched `fortress-repair-batch`, the run that died with its container.
//
// INCOMPLETE BY DESIGN AS LAUNCHED. It ends at the scatter: per rung it runs
// rung -> skeptic -> repair -> skeptic2 and returns. The four stages that were
// to follow (gather, gate, commit, ledger) were to be added by resuming the run
// from its run ID, which cannot be done from another session. Write them into
// this file before launching it again. Standard: explorations/coordinator/REPAIR-BATCH.md.
export const meta = {
  name: 'fortress-repair-batch',
  description: 'Two Fortress repair rungs in isolated worktrees, each judged by its own skeptic before the merge',
  phases: [
    { title: 'Rung', detail: 'test-first repair in an isolated worktree; never runs the full gate' },
    { title: 'Skeptic', detail: 'independent judgement with its own walk-vs-compiled differential; one repair round allowed' },
  ],
}

// ---------------------------------------------------------------------------
// The shared prefix. batched-climb-plan.md section 8: every agent in a batch
// opens with the same block, byte-identical and in the same order. No backticks
// anywhere in these strings; code is indented instead.
// ---------------------------------------------------------------------------

const PREFIX = [
'# Fortress repair batch - shared prefix',
'',
"You are an agent in the Fortress revival's repair batch (@palimondo's revival of Sun's Fortress programming language). This batch repairs two defects that the conformance review of 2026-09-17 found in the eight ladder rungs landed that day. Read explorations/coordinator/REPAIR-BATCH.md in your worktree first: it is the decision record this brief executes, and it names both repairs.",
'',
'## The batch manifest',
'',
'Two rungs, run in parallel in separate worktrees, gated once together after the merge:',
'',
'- R1, slug repair-r1-atomic-static, worktree /home/user/fortress-r1, branch repair/r1-atomic-static: a top-level mutable variable compiled by rung 3 is outside the transaction. Edits VarCodeGen.java and CodeGen.java around :5862.',
'- R2, slug repair-r2-literal-wrap, worktree /home/user/fortress-r2, branch repair/r2-literal-wrap: the code generator wraps an integer literal of bit length exactly 32 or exactly 64 negative. Edits CodeGen.java at :3864 and :3874, and runtimeValues/FIntLiteral.java.',
'',
'Both branches are off 3d675af85 on claude/handover-reading-vn8zgr. Both rungs touch CodeGen.java, in regions far apart; the merge is the coordinator, not yours.',
'',
'## Your worktree',
'',
'Work ONLY in the worktree your tail names. The other rung is running at the same time in its own worktree; never read or write outside your own. Never touch /home/user/fortress, which is the main tree.',
'',
'Set up every shell (substitute your worktree path for WORKTREE):',
'',
'    cd WORKTREE',
'    source experiment/env.sh',
'    export TMPDIR=WORKTREE/tmp',
'    export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=WORKTREE/tmp"',
'',
'env.sh sets FORTRESS_HOME from its own location, so check that echo $FORTRESS_HOME prints your worktree and not /home/user/fortress. It also runs rm -rf /tmp/fortress*rats; source it once per shell and never mid-run, because the other agent\'s Rats! temp directories live there too.',
'',
'ProjectFortress/build has been copied in so javac is incremental, but ant compileAll\'s scalac step has no uptodate guard (build.xml:547-568) and is a full rebuild wherever it runs; budget for that. Your default_repository/caches/ starts empty and cannot be warmed from the main tree, because the analysed-cache key hashes the source path (NamingCzar.deCaseName, compiler/NamingCzar.java:243-245). So after ant compileAll you must rebuild the bytecode cache in library order:',
'',
'    cd ProjectFortress',
'    ../bin/fortress compile LibraryBuiltin/AnyType.fss',
'    ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss',
'    ../bin/fortress compile ../Library/CompilerLibrary.fss',
'    ../bin/fortress compile ../Library/CompilerAlgebra.fss',
'    ../bin/fortress compile ../Library/CompilerSystem.fss',
'',
'about 145 s cold: AnyType 21, CompilerBuiltin 104, CompilerLibrary 17, CompilerAlgebra 2, CompilerSystem 1. Two operational traps measured in rung 7: a fortress compile whose source has not changed writes nothing and exits 0; and a change to a native helper\'s signature leaves a stale class in default_repository/caches/nativewrapper_cache that must be deleted or the old signature is what the run links against.',
'',
'The Bash tool has a 10-minute ceiling. Run ant compileAll and any long step in the background and poll it; never pipe ant through tail, because the summary you need is at the end and you will have to re-run to see it (that mistake cost 21.7 minutes of the last climb). Capture full output to a file and grep the file.',
'',
'## The territory map - read the parts your task needs, do not go looking',
'',
'In 36 agents of the last climb not one of these was opened, and that is the direct cause of what the conformance review found. They are in explorations/coordinator/map/:',
'',
'- README.md - the synthesis: the gaps on the path in dependency order, the development loop\'s slow spots, and a touch-this-affects-that map.',
'- modules-and-phases.md - the repository\'s architecture and both pipelines phase by phase, with a table of where the interpreter and compiler paths diverge.',
'- spec-to-implementation.md - per language feature: its parser rule, checker class, interpreter site, codegen site and prelude location. This is how you answer "where does this fix belong".',
'- test-coverage.md - what each corpus and each gate target actually covers, and what is dark.',
'- design-intent-sources.md - where the design intent is written down: the papers, the spec\'s note boxes, the suppressed appendices. Section 6 is a table by design area.',
'- dormant-code.md - code that is present and switched off, with the reason and the repair.',
'',
'## Four rules this batch exists to enforce',
'',
'1. "Where does this fix belong" is a required step, answered before any edit. Use spec-to-implementation.md and modules-and-phases.md. Rung 7 is the case in point: it wrote a run-time implementation without finding that INTEGERLITERALFOLDING is already wired before TYPECHECK (compiler/phases/PhaseOrder.java:57,142), and without engaging the team\'s comment three lines below the block it cited: "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals" (LibraryBuiltin/FortressBuiltin.fss:483-485).',
'',
'2. Precedent search before writing code. Ask "has the team solved this here already, and in how many ways", and answer it by citation. Rung 3 is the case in point: the right shape existed twice in VarCodeGen.java and the wrong shape once, and it copied the wrong one.',
'',
'3. The specification\'s prose chapters are the standard; the api renderings are not. Specification/library/structure.tex:25-31 says Part Library "is largely automatically generated from the API code for the libraries themselves", so citing Specification/library/apis/*.tex to justify an edit to the matching .fsi is circular, and two rung reports did exactly that. Cite Specification/basic/ and Specification/basic-lib/.',
'',
'4. The interpreter is evidence, not an oracle. The static type checker runs only on the compile path and walk turns it off, so the interpreter accepts programs the language does not and reports what would be type errors as run-time dispatch failures; 55 ledger rows record its own defects. When walk and the compiled run disagree, that is a question and the specification answers it. Three real outcomes: the specification settles it against the compiled run, so repair; it settles it against the interpreter, so the compiled side may be right and a ledger row is owed against the interpreter; or the specification is silent. A silent specification is NOT a reason to stop - it is the reason to think harder: review the architecture around the construct, derive the candidate behaviours with what each costs and what else it touches, decide holistically which is right for the language, execute that one, and write the reasoning down. (R2 has one named exception, in its tail.)',
'',
'A fourth case exists and is legitimate: the specification settles the divergence but the repair lies outside this rung\'s scope. Then the rung lands and opens a verified ledger row naming the defect, the specification clause, the probes both ways, the location of the fix and what the fix is. That is what rungs 6 and 7 did with row 317 and it was right.',
'',
'## What you write, and what you must not touch',
'',
'Everything you produce goes under explorations/compile-ladder/SLUG/ in your own worktree, where SLUG is in your tail:',
'',
'- REPORT.md - what you found, what changed and why, every citation as file:line, the recorded failure and the recorded pass, the precedent search, the specification derivation, every differential you ran.',
'- record.md - the record lines the coordinator will fold at merge time: the FACTS.md line or lines this rung earns, the ledger note (which row, and exactly what to append - rows are never renumbered or moved, they are cited from thirty-five reports), and the handover state line. Write them as finished prose, ready to paste.',
'- probes/ - your probe programs and their captured outputs.',
'',
'Do NOT edit explorations/coordinator/FACTS.md, the gap ledger, PLAN.md, POSITIONS.md, INDEX.md, the handover document, CLAUDE.md, explorations/protocol.md, or anything under .claude/. Parallel rungs conflict on every one of those - 28 of 28 replayed pairs conflict on FACTS.md and on the handover - which is the whole reason the record leaves you and is folded centrally.',
'',
'Do NOT run ant testFast or ant testSystem. The batch is gated once, after the merge, by the coordinator. Running the gate here costs 582 s and buys nothing: across nine skeptic runs of the last climb, not one of the 26 findings was load-bearing on a suite failure.',
'',
'Do NOT commit and do NOT push. Leave your worktree dirty. The coordinator reviews every line before anything is committed.',
'',
'## Register',
'',
'Plain sentences, no self-congratulation - we are humble custodians here and deserve no credit. No unactionable comments in the source tree: provenance and rationale belong in your report, not in code. Verify against primary sources before asserting, and cite file:line. If you make a decision, say in your report that it was a decision and what the alternatives were: a decision buried in a report is a decision not made. No estimates in days or weeks.',
'',
].join('\n')

// ---------------------------------------------------------------------------
// The rung worker's role block and the two tails.
// ---------------------------------------------------------------------------

const RUNG_ROLE = [
'',
'---',
'',
'# Your role: rung worker',
'',
'## The order of work - test first, and the failure observed',
'',
'From explorations/coordinator/PLAN.md, and this is the part Pavol called load-bearing:',
'',
'1. Write the failing test FIRST, into ProjectFortress/compiler_tests/ (checker and codegen rungs) or ProjectFortress/library_tests/ (library rungs): a .fss component that prints PASS, plus a .test file in the format of ProjectFortress/library_tests/Boolean.test (a tests= line naming the components, then link, run, run_out_WIcontains=PASS).',
'2. Run it and capture the failure output to a file BEFORE the edit exists. A report with no recorded failure is refused by your skeptic. The process this rules out is the one-off validation script: proving once by hand that something works and going ahead without leaving a permanent check in the corpus.',
'3. Make the edit, as small as the test needs.',
'4. Rebuild: ant compileAll if you touched .java or .scala, then the library-order bytecode-cache rebuild.',
'5. Run the test again and capture the pass.',
'6. Grep BOTH corpora - ProjectFortress/tests/ and every *_tests/ directory - for a competing declaration of every name you add. Rung 1 lost a full cycle to library_tests/MaybeTest9.fss declaring its own trait Equality, which only a full run revealed; this grep costs seconds and covers it.',
'7. Run the ladder subset for any files your change affects, before and after, if your repair has one. The driver is explorations/compile-ladder/run-ladder.sh; give it a ladder root inside your own worktree, because its default root is shared and its cache pruning would corrupt a parallel run.',
'',
'Report at the end in the structured form the tool requires, and write the full detail into REPORT.md.',
'',
].join('\n')

const R1_TAIL = [
'',
'## Your repair: R1 - a top-level mutable variable is outside the transaction',
'',
'SLUG is repair-r1-atomic-static. WORKTREE is /home/user/fortress-r1, branch repair/r1-atomic-static.',
'',
'The verdict, already established (explorations/reviews/rung-conformance-1-4.md, REPAIR-BATCH.md section R1): rung 3 (commit 4d419c9e8) landed VarCodeGen.MutableStaticBinding, which reads with a bare GETSTATIC and writes with a bare PUTSTATIC (ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java:309,314) on a static field emitted non-final and non-volatile (CodeGen.java:5862). atomic do ... end does compile on this path with a real retry loop (CodeGen.forAtomicBlock, CodeGen.java:1729-1757, startOver at :1753). So a top-level var mutated inside atomic is not in the transaction\'s write set, is not rolled back on abort, and is written again by the retry.',
'',
'This violates Specification/basic/expressions/atomic.tex:37-42 ("All reads and all writes ... will appear to occur simultaneously in a single atomic step") and :65-67 ("Any variable reverts to the value it held before evaluation of the atomic expression began"). The missing volatile separately contradicts Specification/basic/memory-model.tex:34-42. Read all three passages yourself rather than taking them from this brief.',
'',
'The precedent is in the same file, twice. LocalMutableVar (VarCodeGen.java:371-473) and MutableTaskVarCodeGen (:529-655) both call BaseTask.inATransaction() and route through TXRead/TXWrite over a volatile cell (runtimeValues/MutableFValue.java:18). The interpreter stores the same construct in a transactional ReferenceCell (interpreter/env/BaseEnv.java:599-601). Rung 3 followed the one wrong precedent in that file, MutableFieldVar (:197-230, bare PUTFIELD).',
'',
'Why the gate never saw it, and therefore what your test must be: every compiled atomic test uses a LOCAL variable (ProjectFortress/other_compiler_tests/atomic0.fss:16) and every testSystem shard pins FORTRESS_THREADS=1 (build.xml:1184). Your new test must exercise a top-level var mutated inside an atomic block with more than one thread, and it must fail on today\'s tree. Establish how a test in the gated corpora can set the thread count. If it cannot, say so plainly and say where such a test belongs instead; do not quietly write a single-threaded test that would pass either way, because that is exactly the hole this repair exists to close. If a genuinely concurrent test cannot be gated, a second, weaker but gateable check - for example that the emitted field carries ACC_VOLATILE, or that the read and write go through the transaction helpers - is acceptable IN ADDITION TO recording that limitation, never instead of it.',
'',
'One question is yours to answer rather than to escalate: atomic.tex:37-42 does not distinguish a variable from a field, so whether MutableFieldVar (:197-230) is repaired in the same rung is part of your design. Decide it, argue it from the specification, and say in your report that it was a decision and what the alternative was.',
'',
'Context you should not have to rediscover. BaseTask.inATransaction() was itself repaired in rung 0 (BaseTask.java:248, an eagerly built debug string that held 88.9% of samples in a compiled loop) and you are on the repaired tree, so do not fix it again. Tasks and transactions are implemented twice and independently, interpreter/evaluator/ and runtimeSystem/ (map/modules-and-phases.md B.11); yours is the compiled world\'s copy. CodeGen refuses atomic used as an expression (no visitor) while atomic do ... end compiles (map/spec-to-implementation.md section 3); if that bears on your test, say so. TransactionJUTest\'s multi-threaded half is commented out (TestTask.java:43-44) and cannot be restored as it stands because TupleTask.forkJoin was commented out by b1344d278; that is context for where a concurrent test can live, not an invitation to restore it.',
'',
'Your edit is in .java, so ant compileAll is required before your test can pass.',
'',
].join('\n')

const R2_TAIL = [
'',
'## Your repair: R2 - the integer literal wrap in the code generator',
'',
'SLUG is repair-r2-literal-wrap. WORKTREE is /home/user/fortress-r2, branch repair/r2-literal-wrap.',
'',
'The verdict, already established (gap ledger row 317, REPAIR-BATCH.md section R2): CodeGen.forIntLiteralExpr (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3859-3893) branches on BigInteger.bitLength(), which for a non-negative value carries no sign bit, so a literal of bit length exactly 32 or exactly 64 is stored wrapped negative: 4294967295 and 18446744073709551615 each become -1. The author\'s own comment above the split is "This might not work."',
'',
'This violates Specification/basic/expressions/literals.tex:83-85, where a numeral of digits has the value of the numeral interpreted in radix ten with nothing bounding it, and Specification/basic-lib/basic-integers.tex:369-370 and :400-401, which give wrapping and saturating their own operator spellings and say ordinary operations never need to wrap or saturate. Read both passages yourself.',
'',
'The edit, and why it is not a typo fix. Changing l <= 32 to l <= 31 at :3864 and l <= 64 to l <= 63 at :3874 is exact for both signs, and rung 7\'s own new code already uses the correct form (nativeHelpers/simpleIntLiteralArith.java:29). But FIntLiteral.asNN32 (runtimeValues/FIntLiteral.java:80-85) and asNN64 (:86-91) currently DEPEND on the wrap - the two\'s-complement bit pattern is the right unsigned value - so they must learn to read largerVal in the same rung or they begin throwing. The team\'s own comment points at exactly this: "This is a cheap fix. Problem in codeGen.forIntLiteral" (FIntLiteral.java:79). Read FIntLiteral.java whole before changing anything in it.',
'',
'Existing evidence to reproduce rather than re-derive: explorations/compiler-probes/p37.fss and p37a.fss with outputs under explorations/compile-ladder/rung6/probes/, and explorations/compile-ladder/rung7/probes/p39.fss, where a = 4294967295, b = 1, println (a + b) gives walk 4294967296 and compiled 0.',
'',
'Row 317 is also to be amended, and your record.md carries the amendment. Four things are missing from it and one citation is stale. Verify each yourself before writing it down; three are claims about behaviour and want a probe.',
'- The ZZ half: ZZ.coerce is x.asZZ (LibraryBuiltin/CompilerBuiltin.fss:501) and renders the wrapped value, so a: ZZ = 4294967295 is -1 in the type the specification defines as all finite integers.',
'- The defeated ZZ32 diagnostic: asZZ32\'s range check passes on -1, so a: ZZ32 = 4294967295 silently becomes -1 instead of raising "Not in range for ZZ32".',
'- The second specification citation, basic-integers.tex:369-370 and :400-401.',
'- The coupling to asNN32 and asNN64 described above.',
'- The citation CompilerBuiltin.fss:557 in the existing row is stale; it is now :562.',
'',
'The one stop in this batch is yours. literals.tex:132-148 puts the operation after coercion at a number type, and the specification is silent on WHICH number type. The compiler world folds exactly and before typecheck (desugarer/IntegerLiteralFoldingVisitor.java, wired at compiler/phases/PhaseOrder.java:57,142) and throws IntegerOverflow on ZZ32; the interpreter computes at the narrowest applicable type and wraps silently, which basic-integers.tex:369-370 says should not happen at all. The two mechanisms already disagree today: println (4294967295 + 1) folds to the correct 4294967296 while the same arithmetic through two variables gives 0. If your repair forces a choice of which number type an untyped literal\'s arithmetic happens at, STOP and report it: that is a change of semantics against the specification under PLAN.md\'s stop conditions and it is Pavol\'s call, not yours. It is the one case in this batch where a silent specification is a stop rather than a deeper pass, because the silence falls exactly on the point at issue. If your repair does not force that choice - and it may well not, since restoring the literal\'s true value is a different question from what type its arithmetic happens at - say so explicitly and carry on.',
'',
'Your edit is in .java, so ant compileAll is required before your test can pass.',
'',
].join('\n')

// ---------------------------------------------------------------------------
// The skeptic's role block. batched-climb-plan.md section 3.
// ---------------------------------------------------------------------------

function skepticRole(rung, workerReport, round) {
  return [
'',
'---',
'',
'# Your role: skeptic for ' + rung.id + ', ' + rung.slug,
'',
(round > 1
  ? 'This is the SECOND judgement of this rung. You refused it once, the worker made one repair, and this is the re-judgement. Under the design, a second refusal drops the rung from the batch: it is recorded with the reason and returned to the ranking, not retried. So refuse again only if the rung is genuinely wrong, not if it is merely improvable.'
  : 'This is the first judgement of this rung. You may refuse once; the worker then gets exactly one repair round in the same worktree.'),
'',
'You did not do this work and you are not here to be agreeable. Your job is to decide whether the claim is true and whether the record is honest. The worktree is ' + rung.path + ' and it is dirty on purpose; read the diff with git diff and git status in that worktree.',
'',
'## What the worker reported',
'',
'This is the worker\'s own account. Treat it as a claim to be checked, not as evidence.',
'',
JSON.stringify(workerReport, null, 2),
'',
'## What you must check',
'',
'1. The recorded failure. The worker was required to run the new test and capture its failure BEFORE the edit existed. Find that captured output. A rung whose report has no recorded failure is refused - this is not negotiable and it is the point of the whole discipline.',
'2. The diff, read line by line against the specification passages cited. Does the edit do what the report says, and only that? Is it as small as the test needs?',
'3. The precedent search. Did the worker find what the team already did here, and did it follow the right precedent? For R1 the precedents are LocalMutableVar and MutableTaskVarCodeGen against MutableFieldVar in the same file; for R2 they are simpleIntLiteralArith.java:29 and the team\'s own comment at FIntLiteral.java:79.',
'4. The test. Does it actually exercise the defect? For R1 in particular: a single-threaded test over a top-level var would pass before and after and would prove nothing, and the gate\'s blindness to concurrency (FORTRESS_THREADS=1 in every testSystem shard, build.xml:1184) is what let the defect land.',
'5. The competing-declaration grep across both corpora.',
'6. The record.md fragment. Are the FACTS lines true as written and sourced? Does the ledger note cite an existing row without renumbering anything? Would a reader six months from now be able to check it?',
'',
'## Your required differential - this is not optional',
'',
'For every construct the rung touches, write your OWN small program, run it under the interpreter (bin/fortress FILE.fss) and under the compiler path (bin/fortress compile then bin/fortress run), and compare the answers. Do not satisfy this by reading the rung\'s own test; write programs the worker did not write. This requirement exists because four of the 26 items the last climb\'s skeptics raised came from differential probes they invented on their own initiative, and those four were the highest-value findings of eight rungs.',
'',
'When walk and the compiled run disagree, apply rule 4 of the shared prefix: the divergence is a question and the specification answers it. Name which of the four outcomes you are in, and cite the passage.',
'',
'## The failure-mode question, asked explicitly',
'',
'Where the rung replaces a throwing stub, an error, or any other loud failure with a computed value, establish what that value is and run it against the specification. This is separate from which side is correct: a loud failure becoming a quiet answer costs diagnosability whoever turns out to be right, because the next person to meet it gets a number instead of a stack trace. It does not by itself prevent the rung from landing. It is a fact the rung must establish, record and report.',
'',
'## Your verdict',
'',
'Approve, or refuse with the one thing that must change. If you approve WITH required corrections, list them precisely: an approval carrying corrections becomes a checklist the commit stage is required to close, and two such corrections from the last climb were simply never made. Do not pad the list with preferences; name what must change and why.',
'',
'Write your findings to explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md in that worktree, and your probes under explorations/compile-ladder/' + rung.slug + '/probes/skeptic/. Do not edit the worker\'s source changes yourself, do not run ant testFast or ant testSystem, do not commit and do not push.',
'',
  ].join('\n')
}

function repairPrompt(rung, verdict) {
  return [
'',
'---',
'',
'# Your role: rung worker, repair round for ' + rung.id + ', ' + rung.slug,
'',
'You did this rung. Your skeptic refused it. This is your ONE repair round in the same worktree, ' + rung.path + '; a second refusal drops the rung from the batch.',
'',
'The skeptic\'s verdict:',
'',
JSON.stringify(verdict, null, 2),
'',
'Read its full findings in explorations/compile-ladder/' + rung.slug + '/SKEPTIC.md. Fix what it named. If you believe the skeptic is wrong, do not simply restate your position: check its claim against the primary source, and if it is wrong say so in REPORT.md with the file:line that settles it. Re-run the test and re-capture the output, update REPORT.md and record.md, and do not run the full gate.',
'',
  ].join('\n')
}

// ---------------------------------------------------------------------------

const RUNG_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    landed: { type: 'boolean', description: 'true if the edit is in place and the new test passes' },
    stopped: { type: 'boolean', description: 'true if the rung hit a stop condition and is reporting instead of landing' },
    stopReason: { type: 'string', description: 'empty unless stopped' },
    filesChanged: { type: 'array', items: { type: 'string' }, description: 'path:line-range per changed source file, plus new test files' },
    recordedFailure: { type: 'string', description: 'path to the captured pre-edit failure output, and the key line from it' },
    recordedPass: { type: 'string', description: 'path to the captured post-edit pass output, and the key line from it' },
    precedentSearch: { type: 'string', description: 'what the team already did here, by citation, and which precedent was followed' },
    specCitations: { type: 'array', items: { type: 'string' } },
    divergences: { type: 'array', items: { type: 'string' }, description: 'each walk-vs-compiled divergence found, with which side the specification favours' },
    decisions: { type: 'array', items: { type: 'string' }, description: 'decisions taken inside the rung, each with the alternative rejected' },
    notDone: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string', description: 'at most 15 lines of prose' },
  },
  required: ['slug', 'landed', 'stopped', 'filesChanged', 'recordedFailure', 'summary'],
}

const SKEPTIC_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    approved: { type: 'boolean' },
    refusalReason: { type: 'string', description: 'empty unless refused; the one thing that must change' },
    requiredCorrections: { type: 'array', items: { type: 'string' }, description: 'corrections the commit stage must close even on an approval' },
    failureWasRecorded: { type: 'boolean', description: 'whether a pre-edit captured failure actually exists' },
    differentialsRun: { type: 'array', items: { type: 'string' }, description: 'the skeptic\'s OWN probes: program, walk answer, compiled answer, verdict' },
    loudToQuiet: { type: 'string', description: 'whether a loud failure became a quiet value, and what the value is' },
    findings: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
  required: ['slug', 'approved', 'failureWasRecorded', 'differentialsRun', 'summary'],
}

const RUNGS = [
  { id: 'R1', slug: 'repair-r1-atomic-static', path: '/home/user/fortress-r1', tail: R1_TAIL },
  { id: 'R2', slug: 'repair-r2-literal-wrap',  path: '/home/user/fortress-r2', tail: R2_TAIL },
]

log('Repair batch: 2 rungs, each judged by its own skeptic before the merge. The gate runs once, later, in the main tree.')

const results = await pipeline(
  RUNGS,

  // Stage 1: the rung worker.
  (rung) => agent(PREFIX + RUNG_ROLE + rung.tail, {
    label: 'rung:' + rung.id,
    phase: 'Rung',
    schema: RUNG_SCHEMA,
  }),

  // Stage 2: the skeptic, with one repair round.
  async (worker, rung) => {
    if (!worker) return { rung: rung.id, slug: rung.slug, state: 'worker-died', worker: null, verdict: null }
    if (worker.stopped) {
      log(rung.id + ' stopped and is reporting: ' + (worker.stopReason || '(no reason given)'))
      return { rung: rung.id, slug: rung.slug, state: 'stopped', worker, verdict: null }
    }

    let verdict = await agent(PREFIX + skepticRole(rung, worker, 1), {
      label: 'skeptic:' + rung.id,
      phase: 'Skeptic',
      schema: SKEPTIC_SCHEMA,
    })

    if (verdict && verdict.approved) {
      return { rung: rung.id, slug: rung.slug, state: 'approved', worker, verdict, repaired: false }
    }

    log(rung.id + ' refused by its skeptic; one repair round: ' + ((verdict && verdict.refusalReason) || 'no reason returned'))

    const repaired = await agent(PREFIX + RUNG_ROLE + rung.tail + repairPrompt(rung, verdict), {
      label: 'repair:' + rung.id,
      phase: 'Rung',
      schema: RUNG_SCHEMA,
    })

    const verdict2 = await agent(PREFIX + skepticRole(rung, repaired || worker, 2), {
      label: 'skeptic2:' + rung.id,
      phase: 'Skeptic',
      schema: SKEPTIC_SCHEMA,
    })

    return {
      rung: rung.id,
      slug: rung.slug,
      state: (verdict2 && verdict2.approved) ? 'approved-after-repair' : 'dropped',
      worker: repaired || worker,
      verdict: verdict2,
      firstVerdict: verdict,
      repaired: true,
    }
  },
)

return {
  batch: 'repair',
  rungs: results.filter(Boolean),
}
