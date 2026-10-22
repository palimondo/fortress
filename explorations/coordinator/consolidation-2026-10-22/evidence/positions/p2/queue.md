<!-- The clarity pass, chunk p2 of the consolidation of 2026-10-22: the review-queue items that its judge drafted, in the queue's own form, for the two held entries (P-27, P-38) and the two questions on applied entries (P-30, P-32); nothing is written into review-queue.md. -->

# Review-queue items drafted for chunk p2

Four items for `explorations/coordinator/review-queue.md`. The coordinator numbers them. P-27 and P-38 were already held for his answers to items 216 and 217, so their items are filed beside those and can be answered with them. "The folder" is `explorations/coordinator/consolidation-2026-10-22/evidence/positions/p2/`.

## Beside item 216, "(b) Consequential", "The library's generators, strings and comparisons"

Q-?p2.1. **Does P-27 take the clarity pass's text once he answers item 216?** P-27 is held for his answer to item 216: does the standard library take only extensions with a precedent in it? The clarity pass rewrote P-27 so that a reader who never saw the conversation can tell what it says. The new text opens with the rule: whoever extends the library first studies how it already does the same kind of thing. It names the pattern, `excludes` clauses, and what they do for overloads. It says that the refused workaround was a rename in microGPT's own code. It says what he had to find by himself: microGPT's diagonal as a subtype of the library's `Matrix` that overrides `mul`, the method that the library's matrix product calls. It keeps the sentence that item 216 asks about, in his words of 2026-09-19: "The extensions of the library that microGPT's code invented go into the standard library, in the library's own style." A cold reader took that sentence at its full breadth, and could not tell whether it is a rule or work still to do. So the new text waits with the entry.
   - Landed: The entry as it reads. Default: as it reads, until he answers item 216.
   - The other way: The clarity pass's text (the folder's `proposals.apply`, the block for P-27), with the sentence on microGPT's extensions as his answer to item 216 gives it.
   - Its cost: The wording of one entry. The rest of the new text keeps the entry's meaning (the folder's `check.md` and `judgement.md`, "P-27").
   - Home: POSITIONS P-27; item 216; the folder's `proposals.md`, "P-27", `cold-read-2.md`, "P-27", and `judgement.md`
   - Needed by: before microGPT compiles; with item 216.

## Beside item 217, "(b) Consequential", "Code generation and the run time"

Q-?p2.2. **Does P-38 take the clarity pass's text once he answers item 217?** P-38 is held for his answer to item 217: is no defect of the compiler prelude repaired before the switch-over, or only five? The clarity pass rewrote P-38's body. It names the five items that his five answers covered, each by what it is: the `Maybe` block's `Nothing` without a type parameter (row 331); the guard for a divisor of -1 in the `REM` of `ZZ64` and `ZZ32`; the wrapping and saturating spellings, swapped against the specification's (row 348); the compiled shift of a `ZZ32` value by a `ZZ64` count (row 381); and the missing `shift` (row 383). It says that the tests of the `Maybe` block and of the guard stay after the prelude is deleted. It says that `XXXShiftDeclRungI` turns red and is promoted when `shift` is defined. It keeps the title that item 217 asks about, a rule for every defect of the prelude, which no message of his says. So the new text waits with the entry.
   - Landed: The entry as it reads. Default: as it reads, until he answers item 217.
   - The other way: The clarity pass's text (the folder's `proposals.apply`, the block for P-38), with the title that his answer to item 217 gives.
   - Its cost: The wording of one entry. The new body keeps the entry's meaning; the two faults that the check found in its first draft are fixed (the folder's `check.md` and `judgement.md`, "P-38").
   - Home: POSITIONS P-38; item 217; the folder's `proposals.md`, "P-38", `cold-read-2.md`, "P-38", and `judgement.md`
   - Needed by: never; with item 217.

## For "(c) Routine", "How batches run"

Routine by the `coordinator` skill's test: it bends no decision of his, touches no code, and can change at any batch.

Q-?p2.3. **When the microGPT walk check after a batch takes more than a minute, is that a fault or a figure to look into (P-30)?** P-30 holds his words of 2026-10-08 at 17:49 UTC: the check "needs to run under a minute, okay? That's the goal. Otherwise, it's useless waste of time." They say nothing of what follows when it takes longer. Each batch's commit stage runs the check, the quick versions of microGPT's two programs, outside the gate. At climb batch 16's landing it took 65 s for one program and 58 s for the other. The coordinator listed that for his review, with the default of one idle run of the pair to find the cause. Must a batch whose check takes more than a minute repair it before it lands, or is the time reported and looked into?
   - Landed: The commit stage lists the check for the coordinator only when a program does not print `ALL PASS`; the time decides nothing. Default: P-30 keeps his words, and a check past the minute is reported and looked into, as for batch 16.
   - The other way: A check past the minute is a fault, and the batch repairs it before it lands.
   - Its cost: Under the default, a batch can land with a check that has grown slow. Under the other way, such a batch waits for a repair. The pair took about 56 s on an idle machine, so the margin is small (the `fortress-repo` skill, `references/interpreter.md`).
   - Home: POSITIONS P-30; the folder's `proposals.md`, "P-30", question 1; PLAN, "Climb batch 16, listed for his review", the quick walk check; `coordinator/climb-batch-workflow.md`, "Commit, and the push held", step 0; `coordinator/tools/mg-run.sh`
   - Needed by: never; the coordinator's default for batch 16 stands, and a rule can be added at any batch.

## For "(c) Routine", "The record, its tools and the repository"

Routine by the `coordinator` skill's test: it bends no decision of his and touches no code, and either answer can be applied at any time.

Q-?p2.4. **Does "kept current" in P-32 cover the territory map?** P-32 says that the record's maps, `FACTS.md`, `INDEX.md` and the territory map (`explorations/coordinator/map/`), are kept current and used, so that nothing that the record holds is worked out again. His words want up-to-date maps (2026-09-24 at 06:44 UTC; 2026-09-27 at 05:57 UTC, on FACTS and the index). On 2026-09-21 at 01:14 UTC he asked whether the map was out of date again, and whether scripting its refresher was delayed. The territory map's surveys are of 2026-09-16 (its README), and the `fortress-repo` skill warns that a status or a line number in them can be stale. Does the rule cover the territory map, so that its refresh is work still to build, with a place in PLAN? Or does it cover FACTS and `INDEX.md` only?
   - Landed: P-32 says "kept current" of all three maps, and adds the territory map's date as a line of state. Default: as it reads, until he answers.
   - The other way: The rule covers the territory map, and its refresh goes into PLAN as work to build. Or the rule covers FACTS and `INDEX.md` only, and P-32 says so.
   - Its cost: Under the first, a refresh of the map's five surveys (`map/README.md`, section 1) and a place for it in PLAN. Under the second, one clause of P-32.
   - Home: POSITIONS P-32; the folder's `proposals.md`, "P-32", question 1, and `check.md`, "P-32"; `coordinator/map/README.md`, its header; `.claude/skills/fortress-repo/references/compiler.md`, "Before an edit"
   - Needed by: never; P-32 and the skill both say that the map can be stale, so a worker checks a status in the ledger before relying on it.
