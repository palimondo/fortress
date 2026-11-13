<!-- Climb batch 30's orientation admission: for each FACTS and POSITIONS entry the landing added or changed, whether it changes the fortress-repo skill's orientation (references/revival-changes.md), the reason, and where a finding that is not admitted belongs. -->

# Climb batch 30: admission to the orientation

The standard is `explorations/reviews/revival-record-synthesis.md`, "A small change to the existing process" and "Recovered admission rule, workflow runs and transcript search pointers": an entry is admitted only if it corrects a default assumption of a worker, prevents a consequential mistake, and the mistake has evidence. The orientation read is `.claude/skills/fortress-repo/references/revival-changes.md` as it stands on `main` after `f78da2650a`. What each entry changed in this landing is from that commit's message and its diff of `FACTS.md` and `POSITIONS.md`; the rungs' changes are from `explorations/compile-ladder/climb-batch-30/RECORD.md`, "Revival changes, for the skill writer" and "Left for the coordinator and the skill writer".

One entry is admitted: F-341. It makes one sentence of the orientation false.

## Admitted

| Entry | Section it changes | Default assumption | Correction | Mistake prevented | Evidence |
|---|---|---|---|---|---|
| F-341 | "Numbers", the rule "A numeral converts where it stands (P-173)": the sentence "Walk gives `Infinity` for the second (row 967)." | The orientation itself tells a worker that under walk a numeral that rounds to an infinity at a typed place of `RR32` or `RR64` binds as `Infinity`, a known departure. | Walk now refuses it when the place runs, with 'Type mismatch binding', as it refuses a numeral out of range. Both paths follow the rule; only the time differs (the checker statically, walk when the place runs). Row 967 is `FIXED` at `f36a65124`. Where nothing fixes a type, a numeral with a radix point that rounds to an infinity is still `Infinity` on both paths (row 980, per the gather record). | A worker who reads the sentence writes a walk program or test that binds such a numeral and expects it to run, or meets walk's refusal and records it as a new defect, or keeps a workaround for a departure that is gone. | The gather record names this sentence as made false (`RECORD.md`, "Left for the coordinator and the skill writer", fourth item); ledger row 967, `FIXED`; tests `tests/NumeralRoundsToInfinityWalk`, `NumeralPointRoundsToInfinityWalk`, `NumeralPointRoundsToInfinityAtParameterWalk`, `NumeralFoldedRoundsToInfinityWalk`. |

The edit is a rewrite of that one sentence, not a new entry: drop the departure, and say that walk refuses both cases when the binding runs.

## Not admitted

| Entry | What the landing changed in it | Reason | Where it belongs |
|---|---|---|---|
| F-19 | Compiled, a call's arguments fork where the analyzer marked the tuple; walk's `ZZ32` range splits into chunks of at most 16; rows 982 and 987. | `SKILL.md`, "Parallelism and mutable state", already tells a worker that arguments and operands can run at once and that a passing run proves no absence of a race. The new parts are a path's and the library's mechanics, which area parts own. | The grain size, and that a test of parallelism under walk needs a range of more than 16 elements: `library.md` (ranges) and `tests-writing.md`. The compiled forks and rows 982, 987: `compiler.md`. Neither part holds the grain size yet (grep for "grain" in the skill finds nothing). |
| F-53 | The distance and the checker count at batch 30's gate, both 0. | A measurement of the gate. No worker acts differently on a language rule. | `compiler.md`, the count stage; the `coordinator` skill's `references/batch.md`. |
| F-57 | Walk refuses a numeral that rounds to an infinity when the place runs. | The same correction as F-341, which owns it. The rest of F-57 (a numeral's type by path, generic code) is unchanged and the orientation's "Numbers" states what a worker needs. | Covered by the admitted edit for F-341. |
| F-134 | Its open half rewritten: locals and a named `catch` in a later `do … also` arm compile. | A limit of the code generator that is now gone; the orientation never stated it. | `compiler.md`, the code generator's limits, if it still lists the arm case. |
| F-175 | Cited lines re-anchored. | No change of content. The orientation states the rule ("A `comprises` clause speaks of values"). | None. |
| F-240 | The count and distance stages' times at batch 30's gate. | A measurement; no worker acts differently. | `compiler.md`, the checker's time; the `coordinator` skill. |
| F-268 | Cited lines re-anchored. | No change of content. | None (`compiler.md` owns row 889). |
| F-283 | A pointer to row 986: one `IntegerOverflow` stop of `Generator2Demo` is not a regression. | It changes what a worker who runs the demos concludes, but the demos are owned by an area part. | `tests-running.md`, "Outside the gate", beside the demo driver. |
| F-302 | Cited lines re-anchored. | No change of content; a performance measurement. | None. |
| F-315 | Cited lines re-anchored. | No change of content. | None (`compiler.md:106` owns `forbid` and `finally`). |
| F-337 | Cited lines re-anchored. | No change of content. | None (`compiler.md`, "Natives"). |
| F-347 | Row 971 left its body: a coercion that spawns a task now runs, in place, at the component class's initialization. | The orientation states the rule a worker needs ("one value for each place ... each run of that place reuses it (P-176)"). The mechanics are the compiled path's. | `compiler.md:109` states row 971's failure and its workaround as current; that sentence is now false and is the compiler part's to rewrite. |
| F-348 | New in its detail: every used component's class is initialized before `run`, in a root task on a pool of one thread; about 40 ms at the start; a top-level variable's initializer runs at first use. | The compiled runtime's start. `compiler.md:65` already says that a program's numeral coercion runs in the static initializer, before `run()`. | `compiler.md`, beside line 65: the imported components, and that the coercion's side effects come before the program's first output. |
| F-349 | Row 958 left its body: walk chooses among declarations applicable with coercion by specificity read through other applicable ones. | The orientation's sentence, "Where several declarations apply only by coercion and none is more specific, both paths stop", stays true, and walk now agrees with the rule. A departure of walk closed. | `interpreter.md:20` states row 958 as current and gives a workaround; that sentence is now false and is the interpreter part's to remove. |
| F-350 | Compiled groups join every forked arm before an exception leaves; arguments fork; the one library's range splits only above 16 elements; microGPT's reductions fork nothing, by reading. | The compiled path now does what the specification and walk do, so a worker's default is right. The grain size is the library's. | `compiler.md` (the group's joins, row 982, `XXXAtomicBlockLaterArgument`'s workaround); `library.md` (the grain size); the model's widths against the grain: the coordinator's record. |
| F-351 | The compiled transaction: own writes, validation with ancestors, which block an abort restarts, the handler takes every exception, the inner `try` matched first. | The compiled path now follows the specification's `atomic` and `try`, as walk did; the orientation holds no sentence on either. | `compiler.md`: line 106's sentence that the outer `try`'s `catch` clause is matched first is now false (the gather record names it); row 984 as the open departure. |
| P-174 | The rows where the tree departs are now 960 and 981. Decision unchanged. | The orientation states the decision whole ("Numbers", both paragraphs that cite P-174). Row 981 is a departure of walk. | `interpreter.md:25` states row 974 as current (walk loads a numeral type as a static argument or an extended type); walk now refuses both at load, and only a `comprises` clause loads (row 981). The interpreter part's to rewrite. |
| P-175 | Four clauses of its account of the tree put in the past. Decision unchanged. | The decision is about the compiled path and the library's range; `SKILL.md` already gives the language-level rule. See F-19 and F-350. | `compiler.md` and `library.md`, as for F-350. |
| P-176 | The row where the tree departs is now 957 alone. Decision unchanged. | The orientation states it ("The coercion gives one value for each place ... (P-176)"), and `compiler.md:108` holds row 957. | `compiler.md:109`, as for F-347. |

## Outside the orientation, for the skill writer

The landing leaves these sentences of area parts false. They are not the orientation's, so this admission does not cover them, but the reasons above rest on their being rewritten:

- `references/interpreter.md:20` (row 958, `FIXED`), `:24` (row 967, `FIXED`) and `:25` (row 974, `FIXED`; row 981 is what remains).
- `references/compiler.md:109` (row 971, `FIXED`), `:110` (row 442's numeral half: the prelude's `RR64` and `RR32` now take a numeral without a radix point; a `ZZ32` value is still refused), and `:106` (the nested `try`, row 888, closed).
- No part states the one library's grain size of 16 under walk.
