<!-- The clarity pass, chunk p8 of the consolidation of 2026-10-22: the review-queue items that its judge drafted, in the queue's own form, for the held entry (P-150) and for the two questions on applied entries (P-95, P-124), which are already items 225 and 227; nothing is written into review-queue.md. -->

# Review-queue items drafted for chunk p8

Three items for `explorations/coordinator/review-queue.md`. The first is new, and the coordinator numbers it. The other two are already in the queue as items 225 and 227. Item 225 needs no change. Item 227 needs its quotes of P-124 brought to the applied text. "The folder" is `explorations/coordinator/consolidation-2026-10-22/evidence/positions/p8/`.

## For "(c) Routine", "How batches run"

This item is routine by the `coordinator` skill's test. Either answer keeps the decision that no resident compiler is built, and it touches no code.

Q-?p8.1. **Does P-150's "not taken up again" also rule out measuring what a resident compiler could save inside the suites and builds?** A resident compiler is a JVM that stays running in the background and serves each Fortress command, as Scala 2's `fsc` did. On 2026-10-16 at 08:56 UTC the coordinator summed up a measurement over 267 worker transcripts and concluded that one is not worth building. At 09:15 UTC he asked that this be recorded "so that we do not reattempt it unless something significant changes". The measurement counted only the Fortress commands that workers run one at a time, each in a fresh JVM. They took 6.4 % of the workers' time, and their start-up at most 1.8 %. It did not look inside the suites, builds and stages, which took 47.8 % of the command time. On that part the report wrote that "the bound would change by a factor I did not measure", and it left the choice to look to his word. The summary he read named the 47.8 % but did not say that it was left unexamined. The clarity pass rewrote P-150's reason to say what was measured and what was not. A cold reader of the new text could not tell whether a worker may propose to measure the rest. Keep the reason as it reads, or take the new text? And does "not taken up again" also cover that measurement?
   - Landed: The entry as it reads: "A background JVM that serves Fortress commands, as Scala 2's `fsc` did, would save too little of the workers' time to be worth building (F-234), so the speed work goes to the checker itself (P-148). It is not tried again unless something significant changes." Default: as it reads, until he answers.
   - The other way: The clarity pass's text, the block for P-150 in the folder's `proposals.apply`. Its reason ends: "The suites already run many tests in each of their JVMs, and what a resident compiler could save inside the suites and builds was not measured." It would stand with his answer: either that measurement is also not taken up, or a worker may propose it.
   - Its cost: The wording of one entry. A measurement inside the suites would need a read of the stage scripts and the ant targets (the report, "Decisions not taken").
   - Home: POSITIONS P-150; F-234; `coordinator/process-engineering/fresh-jvm-commands.md`, "Summary" and "Decisions not taken"; `coordinator/positions-audit/trial/evidence/corrections.md`, "P-150"; the folder's `proposals.md`, `check.md`, `cold-read-2.md` and `judgement.md`, "P-150"
   - Needed by: never; no PLAN item builds or measures a resident compiler, and the speed work goes to the checker (P-148).

## Item 225, "Is "`Specification-1.0-frozen/` is never touched" his standing rule (P-95)?"

The clarity pass applies P-95 with the question carried from the audit (the folder's `proposals.md`, "P-95", question 1). It is item 225 word for word. The applied text keeps P-95's title and its sentence "The unrevised copy, `Specification-1.0-frozen/`, is never touched." So item 225's quotes stay true, and it needs no change.
   - Landed: P-95 as the clarity pass applies it. Default: the sentence kept, until he answers.
   - The other way: Strike it, as item 225 says.
   - Its cost and its need: as item 225 says.
   - Home: item 225; POSITIONS P-95; the folder's `proposals.md`, "P-95", question 1

## Item 227, its quotes brought to the applied P-124

The clarity pass applies P-124 with the question carried from the audit (the folder's `proposals.md`, "P-124", question 1). It is item 227. The applied text changes the sentence that item 227 asks about, so its title, its body's quote and its other way change with it. The new text of item 227:

227. **Is "the example is not respelled to get around a gap in walk" a rule for every specification example (P-124)?** `ant testSpecData` runs the examples extracted from the specification under walk. On 2026-10-04 at 20:27 UTC he chose that it joins the gate once its five red examples are green ("Yep. Option one."). He did not take the way that respelled the five, "a text change in the revision form, to cover a gap in walk". Nor did he take a list of known red names. P-124 makes his refusal of the respelling a rule for every example: "When an example fails, the implementation is fixed: the example is not respelled to get around a gap in walk, and no list of examples allowed to fail is kept." The consolidation of 2026-10-13 (`ab933086b`) wrote the general form and gave no reason. Keep it as a rule for every example, strike it as done with the five, or let it wait in this list?
   - Landed: The entry as it reads. Default: the rule for every example, until he answers. No example has failed since `369982d85` (130 of 130).
   - The other way: The rule covers only the five of 2026-10-04, and a later failure is decided when it comes. Or the respelling clause leaves P-124 for this list, and P-124 keeps the rest: the gate step, the gate failing if any example fails, no list of examples allowed to fail, and "Built.".
   - Its cost: One clause; no code. P-124 is the rule's only home: no skill states it.
   - Home: POSITIONS P-124; `coordinator/positions-audit/full/evidence/corrections-c8.md`, "P-124", "Questions for him", question 1; `coordinator/positions-audit/full/evidence/review-queue-items-c8.md`, the item drafted for the case where the sentence waits here; the folder's `proposals.md`, "P-124"
   - Needed by: never; no example fails today, and a failing example stops the gate, so the question comes back then.
