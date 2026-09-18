<!-- The decision record for the repair batch, written 2026-09-17 by the coordinating session on Pavol's instruction after the conformance review of the eight landed rungs found one specification violation and one unargued deviation. It is written to be executed by a session that was not present for the conversation: everything needed to run it is here or cited from here. One line per paragraph. -->

# The repair batch

## Why this exists

The conformance review (`reviews/rung-conformance-1-4.md`, `-5-8.md`) found that the climb of 2026-09-17 made local fixes without global awareness.

Pavol's reading of it, which is the instruction this file serves: "we have been doing some local fixes without global awareness and therefore committing spec violations or other suboptimal things", and the repair is to be done now.

Two repairs are owed. Everything else the review found is a record defect, a proposed ledger row, or a fork, and none of those is urgent.

## The two repairs

### R1. A top-level mutable variable is outside the transaction

**Verdict: violates the specification.** `Specification/basic/expressions/atomic.tex:37-42` ("All reads and all writes ... will appear to occur simultaneously in a single atomic step") and `:65-67` ("Any variable reverts to the value it held before evaluation of the `atomic` expression began"); the missing `volatile` separately contradicts `Specification/basic/memory-model.tex:34-42`.

**What is wrong.** `VarCodeGen.MutableStaticBinding`, landed by rung 3 (`4d419c9e8`), reads and writes with a bare `GETSTATIC`/`PUTSTATIC` (`VarCodeGen.java:309,314`) on a non-final, non-volatile static field (`CodeGen.java:5862`). `atomic do ... end` compiles on this path with a real retry loop (`CodeGen.forAtomicBlock`, `CodeGen.java:1729-1757`, `startOver` at `:1753`), so such a variable is not in the transaction's write set, is not rolled back on abort, and is written again by the retry.

**The shape of the fix is already in the tree, twice.** `LocalMutableVar` (`VarCodeGen.java:371-473`) and `MutableTaskVarCodeGen` (`:529-655`) both call `BaseTask.inATransaction()` and route through `TXRead`/`TXWrite` over a `volatile` cell (`runtimeValues/MutableFValue.java:18`); the interpreter stores the same construct in a transactional `ReferenceCell` (`BaseEnv.java:599-601`). Rung 3 followed the one wrong precedent in the file, `MutableFieldVar` (`:197-230`, bare `PUTFIELD`), rather than the two right ones.

**Scope question the fix must answer rather than assume:** `atomic.tex:37-42` does not distinguish a variable from a field, so whether `MutableFieldVar` is repaired in the same rung is part of the design, not a separate decision to escalate.

**Why the gate never saw it:** every compiled atomic test uses a local variable (`other_compiler_tests/atomic0.fss:16`) and every `testSystem` shard pins `FORTRESS_THREADS=1` (`build.xml:1184`). **So the rung's test must be a new one that would fail today**: a top-level `var` mutated inside an `atomic` block with more than one thread.

### R2. The integer literal wrap in the code generator

**Verdict: a specification violation predating the ladder, correctly deferred by rungs 6 and 7, recorded as ledger row 317.** `Specification/basic/expressions/literals.tex:83-85` gives a digits-only numeral the value of the numeral interpreted in radix ten with nothing bounding it; `Specification/basic-lib/basic-integers.tex:369-370,400-401` give wrapping and saturating their own operator spellings and say ordinary operations "never need to wrap or saturate".

**What is wrong.** `CodeGen.forIntLiteralExpr` (`CodeGen.java:3859-3893`) branches on `BigInteger.bitLength()`, so a non-negative literal of bit length exactly 32 or exactly 64 wraps negative: `4294967295` and `18446744073709551615` both become `-1`.

**The fix, and why it is not a typo fix.** `l <= 32` → `l <= 31` at `:3864` and `l <= 64` → `l <= 63` at `:3874` are exact for both signs, and rung 7's own new code already uses the correct form (`simpleIntLiteralArith.java:29`). But `FIntLiteral.asNN32` (`:80-85`) and `asNN64` (`:86-91`) currently **depend** on the wrap — the two's-complement pattern is the right unsigned value — so they must learn to read `largerVal` in the same rung or they begin throwing. The team's own comment points at exactly this: "This is a cheap fix. Problem in codeGen.forIntLiteral" (`FIntLiteral.java:79`).

**What row 317 still lacks and the repair should add:** the `ZZ` half (`ZZ.coerce = x.asZZ`, `CompilerBuiltin.fss:501`, renders the wrapped value, so `a: ZZ = 4294967295` is `-1` in the type the spec defines as all finite integers); the defeated `ZZ32` diagnostic (`asZZ32`'s range check passes on `-1`, so `a: ZZ32 = 4294967295` silently becomes `-1` instead of raising "Not in range for ZZ32"); the second spec citation; the coupling above; and the stale `:557` citation, now `:562`.

## How it is run: the batched machinery's first trial

`coordinator/batched-climb-plan.md` is the design and this batch is its first use. Run it as written, with the exceptions below recorded rather than silently taken.

**Rule 3 is relaxed for this batch, deliberately.** The rule permits at most one `.java` rung per batch because `compileAll`'s scalac step has no uptodate guard. Both repairs are `.java`, so both worktrees pay a build. The relaxation is taken because these two repairs are the work that must happen now, and because a two-rung batch is the cheapest honest trial of the machinery. It is not a precedent: the rule stands for ordinary batches.

**k = 2** here, which also matches the harness's concurrency cap, so this batch runs as one wave and the cap is exercised rather than assumed.

**The gate is the full pair.** Both rungs are `.java`, so clause 1 of the `testSystem` drop rule in `next-climb.md` §5 fails outright. No saving is available and none should be attempted.

**Both rungs touch `CodeGen.java`** — R1 at `:5862` and around `forAtomicBlock`, R2 at `:3864,3874` — so the merge is the one thing to watch. The regions are far apart and `batched-climb-review.md` measured 0 conflicts in 21 pairs of the last climb's rungs, but this is the first real test of the gather stage.

**Shadow first**, per `PLAN.md`: both edits are in Java, so `perf-probes/template-check/run-all.sh` is the recipe.

**The first launch died with its container** on 2026-09-17, mid-scatter, with every worktree dirty and uncommitted; the four agents' work was lost (`remote-container.md` § The 2026-09-17 incident). The re-run of 2026-09-18 is `coordinator/repair-batch-workflow.js`, whole: workers commit and push to `wip/repair-r1-atomic-static` and `wip/repair-r2-literal-wrap` as they go; a judge on the session's model is escalated only on a refusal, a stop or a red gate; gather, review, gate and commit are stages of the script. The design is in `batched-climb-plan.md` § 3, "Revised 2026-09-18". Launch: the two worktrees created from the commit `main` is at (recipe in `remote-container.md`), then `Workflow({scriptPath: 'explorations/coordinator/repair-batch-workflow.js', args: {base: '<that commit>'}})`, on Pavol's word.

## What the briefs must carry that the last climb's did not

This is the systemic fix Pavol asked for, and it is the reason the review found what it found.

**The territory map goes in the shared prefix, not left to be found.** In 36 agents of the last climb, `map/design-intent-sources.md` was never opened once, nor was `map/test-coverage.md` or `map/modules-and-phases.md`. Hand all five parts by name with one line each on what they hold, and point each agent at the parts its task needs. This was done for the surveys that produced `next-climb.md` and it worked.

**Where does this fix belong is a required step, answered before the edit.** `map/modules-and-phases.md` has both pipelines phase by phase and a table of where the two paths diverge; `map/spec-to-implementation.md` gives each feature its parser rule, checker class, interpreter, codegen and prelude locations. Rung 7's failure is the case in point: it wrote a run-time implementation without finding `INTEGERLITERALFOLDING`, already wired before `TYPECHECK` (`phases/PhaseOrder.java:57,142`), and without engaging the team's comment three lines below the block it had cited — "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals" (`FortressBuiltin.fss:483-485`).

**Precedent search before writing code.** R1 is the case in point: the right shape existed twice in the same file and the wrong shape once, and the rung took the wrong one. The required question is "has the team solved this here already, and in how many ways", answered by citation.

**The specification's prose chapters are the standard; the api renderings are not.** `Specification/library/structure.tex:25-31` says Part Library "is largely automatically generated from the API code", so citing `library/apis/CompilerBuiltin.tex` to justify an edit to `CompilerBuiltin.fsi` is circular, and two rung reports did exactly that. Cite `Specification/basic/` and `basic-lib/`.

**The interpreter is evidence, not an oracle, and the ladder's criterion must stop saying otherwise.** 55 ledger rows concern the interpreter; the checker never runs on that path. The ladder's success criterion is "output byte-identical to `walk`", which bakes the oracle assumption into the instrument itself rather than into any brief. Where the specification settles a divergence, the specification wins and the ladder's criterion does not. **This wording is to be corrected in the ladder driver's own documentation as part of this batch.**

## What is NOT in this batch

No further library name rungs. `next-climb.md` §0: 104 of the 303 non-passing tests are gated on the reserved forks, while all fourteen fork-free rungs together move 38 files, so more small rungs are not where the value is.

No repair of the record defects the review found (the wrong reasons written into `CompilerLibrary.fsi:41-43`, the `48 suites` miscount in `FACTS.md:84`, the never-written ledger sentence). They are real and they are cheap; they belong in the batch after this one, or folded into it if a worker is idle.

No decision on the two reserved forks. The array representation and the library route remain Pavol's, and `next-climb.md` §3a says what a sketch that lets him decide would contain.

## The one fork this batch may surface

What type an untyped integer literal's arithmetic happens at. `literals.tex:132-148` puts the operation after coercion at a number type; the spec is silent on **which** number type. The compiler world folds exactly before typecheck and throws `IntegerOverflow` on `ZZ32`; the interpreter computes at the narrowest applicable type and wraps silently, which `basic-integers.tex:369-370` says should not happen at all.

R2 may make this unavoidable. If it does, it stops and reports to Pavol under `PLAN.md:47`, "any change of semantics against the spec" — this is the one case in this batch where the rule is a stop rather than a deeper pass, because the specification's silence is on the point at issue.
