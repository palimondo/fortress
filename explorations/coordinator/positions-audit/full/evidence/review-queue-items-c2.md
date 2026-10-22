<!-- The POSITIONS audit's full run, chunk c2: the review-queue items drafted for the parts that leave POSITIONS and that review-queue.md does not already hold (from P-29, P-30 and P-40), in the queue's own form, and the changes the chunk's corrections propose to items the queue already holds (30, 36, 50 and 99); nothing is written into review-queue.md. -->

# Review-queue items drafted for chunk c2

Rule 2 of the writer's brief: a part that is an agent's default, landed and waiting for his review, leaves POSITIONS, and gets an item if `explorations/coordinator/review-queue.md` does not already hold it. Five parts of the chunk leave on that ground:
- P-29's "it compiles them and records the phase that each reaches" and "A run of them, once possible, goes to a stage that does not gate.": no item holds them. They are drafted below as one item, **Q-?1**, since one exchange of 2026-09-19 made both.
- P-30's "The full check programs run only when asked.": no item holds it. Drafted below as **Q-?2**.
- P-40's "How the checker represents it is not his choice.": no item holds it. Drafted below as **Q-?3**. It is spent, since the checker is built, so the coordinator may file it at once under (a), "Information only".
- P-40's "The other unused sizes of the 25 go only by a diff shown to him.": **item 36** holds it ("the other 8 dead sizes ... not built"; "Each is put to him as a diff with the switch-over's design"). No new item.

"The corrections" is `positions-audit/full/evidence/corrections-c2.md`. Each draft ends with the queue's "Needed by" line. The coordinator numbers them.

## For "(c) Routine", "How batches run"

Routine by the `coordinator` skill's test. Neither reverses or reads anew a decision of his: both keep his "too long running to be tests" and his "Not a full training that takes ages". Neither touches the specification, the library, the implementation or a line of the model. Each is a default of the gate or of a script, and can be undone at any batch.

Q-?1. **The gate compiles the two microGPT programs, and a run of them, once possible, goes to a stage that does not gate.** It is decision 6 of the coordinator's six process decisions of 2026-09-19T14:53:40.072Z ("The two microGPT programs will be part of the ladder check"). He answered that text at 14:54:15.024Z with "I am not reading this, but go." At 16:39:48.865Z he quoted decision 6. He wrote that the two programs did not yet compile, so he did not understand the idea. Once the compiled path runs, a ladder check makes sense to him, but not with the microGPT programs, which are too long running to be tests. The coordinator's 16:39:58.548Z answered that the stage only compiles them and never runs them, and that once they compile and run, the run belongs to a separate stage that does not gate. He did not reply. P-29 stated both until this audit.
   - Landed: The ladder-regression stage compiles the eighteen components of the two programs in every gate and holds them at the phase disambiguate (F-97; the `fortress-repo` skill, `references/gate.md`, "The ladder regression"). No stage runs them.
   - The other way: The gate leaves the two programs out until they compile. Or, once they run, a run of them gates.
   - Its cost: One gate step either way. A gating run would add the programs' run time to every gate.
   - Home: POSITIONS P-29, its former sentences on the stage (POSITIONS-history, P-29; the corrections, "P-29"); F-97; `.claude/skills/fortress-repo/references/gate.md`, "The ladder regression"; `compile-ladder/baseline-2026-09-19/microgpt-phase.md`
   - Needed by: before microGPT compiles; once its components compile, a run becomes possible, and its stage is built then (PLAN, phase 5).

Q-?2. **The full microGPT check programs run only when asked.** The batch's walk check runs the quick pair, two forward-and-backward passes each (P-30). The full pair, 40 checks each, runs only when a brief asks for it. It is the coordinator's wording, in its worker brief of 2026-10-08T17:49:42.994Z ("The full 40-check programs stay as they are, for when someone asks for them") and its reply of 17:49:58.927Z. He answered neither. It keeps his "Not a full training that takes ages." of 16:20:06.948Z. P-30 stated it until this audit.
   - Landed: `coordinator/tools/mg-run.sh` runs the quick pair by default, with a 600 s limit, and the full pair only with the word `full`, with a 5,400 s limit. The skill says the same: "Add the word `full` only if your brief asks for it" (`.claude/skills/fortress-repo/references/interpreter.md`).
   - The other way: Run the full pair at set points, such as the end of a phase. Or retire it.
   - Its cost: About 11 minutes a program under walk (668 s and 691 s after batch 10; scout P-30, section 1).
   - Home: POSITIONS P-30, its former sentence (POSITIONS-history, P-30; the corrections, "P-30"); `coordinator/tools/mg-run.sh`; `.claude/skills/fortress-repo/references/interpreter.md`, the model program
   - Needed by: never; a default of the script, which can change at any time.

## For "(c) Routine", "The checker's typing and inference"

Routine: a choice inside the checker's code, which reverses no decision of his and touches no other area. It is built, and nothing waits on it.

Q-?3. **How the checker represents a size that inference leaves unknown.** It was decision two of the coordinator's "Lesson two" (2026-09-21T03:09:13.588Z). At 16:57:37.256Z he wrote that he did not understand decision two, and asked what decision he was making. The coordinator's 16:58:52.471Z answered that it was a choice inside the checker's code, how to represent an unknown size while solving. The clean way adds a new node to the syntax tree's definition and regenerates generated code. The other way reuses an existing node with a reserved name. The choice was his only if he cared about that regenerated diff; otherwise it was the coordinator's. He did not reply. P-40 stated "How the checker represents it is not his choice." until this audit.
   - Landed: A new node, `_InferenceVarInt(Object id)`, as the checker's other inference variables are nodes, with 26 generated files changed and 4 new: the checker rung's decision 1 ("Pavol left this to the rung", `compile-ladder/rung-nat-checker/REPORT.md`, "Decision 1: the unknown size is a node, `_InferenceVarInt(Object id)`, not a reserved name.").
   - The other way: The shadow's reserved name, an `IntRef` named `$nat$k`, with no regenerated code (`reviews/nat-checking-plan.md`, option B).
   - Its cost: Undoing it regenerates the generated files again and changes the checker's solver.
   - Home: POSITIONS P-40, its former sentence (POSITIONS-history, P-40; the corrections, "P-40"); the coordinator's text of 2026-09-21T16:58:52.471Z; `compile-ladder/rung-nat-checker/REPORT.md`, decision 1
   - Needed by: never; built and gated, and no later work builds on the choice.

## Changes proposed to items the queue already holds

These are not new items. Each is a line that the corrections make incomplete, for the coordinator to write when he approves them.

- **Item 36**, "Home": "P-40, "Sizes are checked ..."". The words still open P-40's title. But P-40 no longer states that the other unused sizes go only by a diff shown to him. The home could add "POSITIONS-history, P-40, its former last sentence". The item's "Landed" and "The other way" lines need nothing.
- **Item 50** (the library-extension bullet in the skill): P-27's proposed first sentence takes up his later word, as the item's "The other way" does. If he approves P-27, the skill's current bullet is the one text left against his position, and the item's home could add "POSITIONS P-27".
- **Item 99** (row 527, an array of a size from 2^31 under walk): "Needed by: never; no PLAN item names row 527". P-40 keeps his decision that a JVM array length over 2^31-1 is refused where storage is made, and the ledger row's fix is that refusal. The home could add "POSITIONS P-40". Whether his decision moves its "Needed by" is the coordinator's call.
- **Item 30**, "Home": "P-40, "Sizes."", the title of 2026-09-30, stale before this audit. It could read "P-40, "Sizes are checked ..."".
