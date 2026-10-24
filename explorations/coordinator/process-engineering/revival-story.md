<!-- The Fortress revival from 2026-08-19 to 2026-10-24 told in plain words for the curator: the exploring era, the unsealed tree and the climb batches through 22 with their decisions and the checker's errors, phase 3's end and phase 4's first batch, how the record grew, the skills and process work since 10-04 with the record's post-mortem of 10-20 to 22 and the type-decisions review of 10-23, what changed in Fortress for a programmer, and, for each of the skill's language points, whether the revival left the team's Fortress as it was or resolved a contradiction, with the custodians' principle and the three sources the team left. First written 2026-10-08. Updated 2026-10-13 in the first version's framing, order and voice; 2026-10-19 through climb batch 18; 2026-10-24 through climb batch 22's landing and climb batch 23's draft, from the record to d6e087190. Read-only, from the record and git; the same text is the curator's page "Fortress Revival So Far". -->

# The revival so far, in plain words

Written 2026-10-08, updated 2026-10-24, for the curator. Dates without a year are 2026, times UTC. Each part ends with its sources.

Words used throughout:

- **team**: Sun Labs designers of Fortress. Their last commit is `a874948ac` (2012-08-31).
- **walk**: Interpreter. It runs a program with no static types.
- **compiled path**: Path that compiles a program to JVM bytecode and runs it: `fortress compile`, then `fortress run`.
- **checker**: Static type checker. It runs on the compiled path only.
- **library**: Fortress code that every program loads. There were two. The interpreter's is **the one library**. The compiler's own smaller one is **the prelude**.
- **switch-over**: Point at which the compiled path moves onto the one library and the prelude is deleted. It comes when the checker accepts the one library.
- **gap ledger**: File with one numbered row for each known gap or defect.

## 1. The start and the exploring era (08-19 to 09-16)

### The 2012 tree builds and runs again

- 08-18 and 08-19: the tree built on JDK 8, and the team's tests ran: about 1.4K in `testFast`, 382 in `testSystem`.
- 08-19: the first toy programs ran under walk: a small demo, a Mandelbrot set ported from Swift and rewritten in plain Fortress style, and a ring of complex numbers.
- To 08-21: the build moved to current Java and Scala. These 21 commits change nothing a Fortress programmer sees. The suites ran in parallel, 13 minutes down to 7.5.

**The microGPT rounds (08-23 to 08-30).** microGPT is Karpathy's small GPT in Python. Each round wrote it in Fortress and ran it under walk. A golden check compared its numbers with the Python program's.

- Round 1 (08-23): a direct port. A training step took 10.9 s, against 22 ms in Python.
- 08-24 to 08-30: rewrites in plain Fortress style and in a paper's mathematical style, then a second iteration. The session began to use worker agents.

**Other assistants (09-07 to 09-11).** Astra, an OpenAI model running in Codex, wrote its own port outside this session, with no transcript. Later Astra and Sol, a second OpenAI model, joined a discussion of notation.

### Blinded and informed runs (09-08 to 09-15)

- The blinded run (09-08): a fresh session that could not read the earlier ports. It worked alone for 1.5 hours and wrote 15 gap rows.
- Run B (09-09) could read the earlier work: 25 gap rows. Run B2, the coordinating session's own attempt: 39 rows.
- Runs C to C4 (09-14) used a "flat" layout, after Hsu's data design for array languages. C4 merged C2 and C3: a 71-line model passing 40 of 40 checks.
- The APL side quest (to 09-15): APL notation turned into Fortress code by a grammar extension, then microGPT written in it. The curator closed the quest there.

**The ledger's first 309 rows.** Each run wrote a gap table. A merge worker re-ran every reproducer, numbered the rows and folded repeats: 83 rows on 09-08, 139 after Runs B and B2, 265 after the APL merge, rows 288 to 310 on 09-16. Row 148 is empty on purpose. `FACTS.md` (what is established) and `POSITIONS.md` (the curator's decisions) began on 09-15.

**The territory map (09-16).** Before the revival edited the team's language, five surveys described the system: modules, what of the specification is built, tests, dormant code, and the designers' reasons. Two of its facts: the interpreter's tests and the compiler's tests share no program; `Specification-1.0-frozen/` is the team's Working Draft as of 2011-02-02, and `Specification/` is the text the revival revises.

**The sealed tree.** The tag `sealed-tree` (`75cca6683`, 09-16) marks the map's last commit. After it, the revival edits the team's language, library and specification.

Sources: `explorations/process-records/01-microgpt-port.md` to `14-apl-rung-4b.md`; `explorations/microgpt-run-c-handover.md`; `explorations/microgpt-run-c-handover-history.md`; `explorations/coordinator/map/README.md`; `explorations/coordinator/process-engineering/gap-ledger-archaeology.md` section 1.1; `explorations/coordinator/process-engineering/fortress-changes-chronology.md` A0, A1, A10; `explorations/notation-collaboration/README.md`.

## 2. The unsealed tree and the batches (09-17 to 10-24)

**How a batch works.** A batch is one run of a workflow script.

- A **rung** is one piece of work, done by a worker in its own checkout of the tree.
- A **skeptic** checks each rung. Up to batch 10, if it refused, a **judge** ruled, a **repair** agent fixed, and a second skeptic checked. Since batch 11 the skeptic fixes what it finds, and a judge rules only on a contested fix.
- The **gather** folds each rung's notes into the record. A **merged-diff review** reads the combined change.
- The **gate** is the full check before landing: the build, both suites, compiled `atomic` programs at four threads, the ladder (below), and the checker's error counts. To **land** is to commit to `main` and push.
- After each batch, one reviewer checks it against the decisions and the designers' intent.

**The first climbs (09-17 to 09-20).** The ladder is 410 of the team's test programs pushed through the compiled path. On the sealed tree 59 passed.

- The ladder climb (09-17): eight rungs added names to the prelude and compiled a top-level `var`. 81 passed. A review found one rung against the specification and one departing from it without a reason.
- The repair batch (09-18 to 09-19) fixed those two.
- Batches 1 and 2 (09-19, 09-20) added more prelude names: `RR64`'s functions, `Maybe`, `GCD`, shifts, integer conversions. 85 passed, and 85 still pass.

**Batches 3 to 10 (09-22 to 10-03).** From 09-21 every batch worked to make the checker accept the one library: 16 landings in 12 days. Names such as 3.5, 6b, 7R, N or 7b are batches split from or added to a plan. Batches 8 to 10 repaired checker defects and the library's one-off slips. The decisions below say which batch built each one. Batches 11, 12 and 13 landed on 10-09, and 13b on 10-10 (part 4). Batches 14 to 22 followed from 10-14 to 10-24 (below).

### The main decisions, in plain words

- **The goal** (09-16). Finish what the designers intended, judged by the specification as revised. The measure is microGPT compiled and running fast. The tree was unsealed on 09-17.
- **Test first** (09-17). Every edit starts from a failing test that stays in the suite. Expected-failure tests in the interpreter's suite (files named `XXX…`) grew from 56 to 120.
- **One library** (09-21). The interpreter's library becomes the only one. The prelude gets no new declaration and goes at the switch-over. The rungs that added prelude names stopped, and the checker's errors on the one library became the measure.
- **The flat number tower** (09-24). The checker keeps the team's rule that no type extends two instantiations of one generic trait. The one library's nested number types broke it, so they became siblings that convert by declared coercions, as in the prelude. Walk learned coercion in batch 4; the library was flattened in batch 6. The checker's errors fell from 125 to 62.
- **Sizes at run time** (09-24). A size parameter (`nat`) gets the run-time descriptor a type argument has. Since batch 5, a sized program compiles and runs.
- **Overflow** (09-26). Fixed-width overflow raises `IntegerOverflow` under walk too. Code meant to wrap uses the specification's operators ∔ ∸ ⨰. Batches 5 and 6b.
- **The plan** (09-26). Six phases: 1 and 2, decided work and the flattening; 3, the checker at zero errors; 4, the switch-over; 5, microGPT compiles; 6, microGPT fast. Phase 3 reached its exit at batch 22 (below). Phases 4 to 6 have not started.
- **Ranges over `ZZ32` only**, because a JVM array index is a 32-bit integer. Batch 7R.
- **The inference rule.** When a generic call mixes number types, the type parameter takes the narrowest type all arguments convert into. A parameter that nothing in a call fixes is inferred at its bound, not at the empty type `Bottom`, on both paths, with a few cases left under walk; at run time the rule is only partly built (part 6). Batches N, 8, 9 and 11.
- **The overloading model.** Overloads may differ in static parameters, the type and size parameters such as `T` in `Box[\T\]`. The return-type rule is checked for every instance. Walk chooses by declared types, not by order in the file. Batch 7b.
- **`fill` takes a value, `tabulate` a function.** Batch 7.
- **Arrays become unboxed `double[]`** (09-19). Decided, not built.
- **Each change to the specification** gets a callout at the passage and an Appendix I entry with the original text and the reason.
- **Exclusion over the whole parameter types** (10-17). Two generic declarations may stand side by side when no value fits both, also where no single parameter rules out its counterpart. Batch 19.
- **The integer power** (10-20) answers its base's type, and raises an error where the result is no integer. Batch 20.
- **A list is ordered only where its elements are totally ordered** (10-20). Batches 13 and 18.
- **Symbolic operators checked** (10-20): the checker checks the overloads of `+`, `^`, `||` and every other operator, not only names in capitals such as `MAX`. Batches 21 and 21b.
- **The `Index` bound** (10-23). An array's index type extends a trait `Index`, which `ZZ32` extends and the ranges exclude. Batch 21.
- **Vectors stay additive groups** (10-23), as the team had them. The checker's exclusion test reads `self` in a self-typed trait as also the implementing type. A self-typed trait is one whose type parameter stands for the type that implements it, as `I` in `Integral[\I\]`. Batch 21.

**The checker's errors falling.** Two numbers measure the way to the switch-over.

- **The checker count**: the errors the checker reports on the one library. The checker stops at the first error of some checks, so the count misses errors behind the stop. A gate stage from batch 3.
- **The distance to the switch-over**: every error over all the library's files, with no early stop. First measured before batch 7.
- Neither makes the gate red. A fix can raise both, when it lets the checker reach code it could not reach before.

**The checker count, where it moved**

- before batch 3: 93
- after 3: 103
- after 4: 125 (a fixed crash showed 22 hidden errors)
- after 6: 62 (the flat number tower)
- after 7: 22
- after 7R: 10
- after 7C: 75 (the checker now reads a clause it used to stop at)
- after 7b: 59
- after 8: 56
- after 9 to 12: 1 (a pair in `LexicographicReduction` (row 582), left for the curator's choice)
- after 13, 13b: 1 (the pair fixed; now an untyped parameter)
- after 15b: 39 (row 680's repair let the check run to its end; these are the component's own errors)
- after 17: 31
- after 18: 30
- after 19: 28
- after 20 to 21b: 3
- after 22: 0 (the component's check runs to its end with no error)

**The distance to the switch-over, where it moved**

- before batch 7: 1.7K (first measured)
- after 7: 940
- after 7R: 627
- after 7b: 598
- after 8: 565
- after 9: 340
- after 10: 253
- after 11: 207
- after 12: 153
- after 13: 105
- after 13b: 85
- after 14: 54
- after 15, 16: 49
- after 17: 35
- after 18: 34
- after 19: 31
- after 20 to 21b: 5 (since 21b with every symbolic operator checked)
- after 22: 0

**Batches 14 to 22 (10-14 to 10-24).** Each landed with its gate green, and microGPT's quick walk check passed 7 of 7 in both programs.

- Batches 14 to 18 (10-14 to 10-18): the checker types `self` in a self-typed trait's bodies as the implementing type; closed traits and the array factories; walk's generic static arguments; conditional extension. After 15b, outside a batch at the curator's word, and 16, the checker's gate stages ran four to five times faster. Count 1 to 30, distance 85 to 34.
- Batch 19 (10-20): exclusion over the whole parameter types, on both paths, and a fix of the two `||` operators between a string and a value of any type. Count 30 to 28, distance 34 to 31. The machine restarted just after the launch, and the run resumed.
- Batch 20 (10-20): the integer power, and casts that give the vector and matrix operators and three branches of the array factories their declared types. Count 28 to 3, distance 31 to 5. Its push waited for the curator's answers (part 4).
- Batch 21 (10-23), four rungs: `String`'s four concatenation operators, the exclusion test that reads the self type, the `Index` bound, and two walk repairs, of array slices and of a list's `=`. Count 3, distance 5. With every symbolic operator checked, the errors fell from 191 to 5.
- Batch 21b (10-23): the distance stage checks every operator; the library's api, the file that states what its component provides, matches the component at more points, so the export error's entries fell from 43 to 15; all 52 team demos run to their end under walk. Count 3, distance 5.
- Batch 22 (10-24): the distance's last five errors, by library text only. The api's last differences from its component went, and three reductions now write their static argument. Count 3 to 0, distance 5 to 0.

**Tokens written, batches 14 to 22,** by the run's own count, without the preparation, batch 15b and the coordinating session: batch 14: 4.82M; 15: 4.44M; 16: 6.01M; 17: 6.52M; 18: 5.13M; 19: 3.82M; 20: 2.64M; 21: 4.75M; 21b: 3.50M; 22: 2.82M.

**Where the tokens went.** "Written" means tokens processed fresh: cache writes and new input, the measure the curator uses.

- The 15 batches from the repair batch to 6.5b used 269 agents and wrote 146M tokens. The largest: 7 (22M), N (18M), 6.5b (17M).
- 45% of all writes came after an agent waited five minutes or more. The prompt cache lives five minutes, so the agent wrote its whole context again.

### Where the records went: the post-mortem of 09-29

- Batch 6.5b changed about 280 lines of Fortress code, 90 of specification and 710 of tests. Beside them it committed 866 record files, 46K lines, most of them scratch. Nobody had asked the curator whether scratch goes to `main`.
- Two cleanings removed 4.4K files (11.7 MB) on 09-29 and 9.9K files (173 MB) on 09-30. The new practice: commit only what `main` is to hold; write the test and see it fail first; build or run nothing twice.

### Phase 3's end (10-24)

At batch 22's landing (`2bff2fe23`) the distance and the checker count are 0. So phase 3 is at its exit as the plan of 09-26 states it. Whether it is done is the curator's call; the review's default is done. The zero rests on three readings:

- The export check compares each api with its component. It asks no body for an api member written `abstract`. Under the other reading the distance is 1.
- The checker still cannot infer the element type of a reduction such as `BIG MIN` from its clauses. The library writes the static argument; user programs still meet the gap.
- The export check skips an api's top-level symbolic operators.

The distance covers the twelve library components that replace the prelude. Four more that microGPT imports had 31 errors in one report-only check.

**Phase 4's first batch**, climb batch 23, is drafted and waits for the curator's go. It builds the natives' mechanism. A native binding is a library function whose body is Java, and today only walk can call it. Each binding comes to name a static Java method that both paths can call. The batch asks the curator two questions, each with a default, and estimates about 2.4M tokens.

Sources: `explorations/microgpt-run-c-handover.md` and `-history.md`; `explorations/coordinator/PLAN.md` ("Where we stand", "The phases", items 12 to 20, "Climb batch 22, listed for his review"), `POSITIONS.md` (P-79 and P-152 to P-157 for the decisions since 10-17), `FACTS.md` (F-53, F-245, F-281 to F-283; the distance by root cause); `explorations/coordinator/postmortem-2026-09-29/README.md` and `characterization.md`; `explorations/reviews/batch-6.5-review.md` to `batch-13-review.md`; `explorations/compile-ladder/CLIMB.md` and `climb-batch-13b/RECORD.md`; `explorations/coordinator/process-engineering/README.md`; `git ls-tree` over `ProjectFortress/tests/`; for batches 14 to 18, `reviews/batch-16-review.md` section 3, `reviews/batch-17-review.md` section 5, and batch 18's run measured with `coordinator/tools/batch-measures.py`; for batches 19 to 22, `explorations/compile-ladder/climb-batch-19/RECORD.md` to `climb-batch-22/RECORD.md` and `explorations/reviews/batch-19-review.md` to `batch-22-review.md`, sections 1 and 3; phase 3's end, `reviews/batch-22-review.md` section 6; phase 4's first batch, `explorations/coordinator/CLIMB-BATCH-23.md` section 1.

## 3. How the record grew

![The gap ledger's characters and rows, and FACTS, POSITIONS and INDEX, commit by commit from 09-08 to 10-09, with each batch's landing marked](record-growth/record-growth.png)

The chart has three panels on one time axis. A vertical line marks each batch's landing. Top: the ledger's characters. Middle: its rows. Bottom: FACTS, POSITIONS and INDEX (INDEX has one line for each note under `explorations/`).

- The ledger reached `main` on 09-09 with 83 rows. It reached 638 rows and 1.25M characters at batch 10 (10-03). At batch 13 it had 694 rows and 581K characters.
- The exploring era wrote 309 rows, 0.8K characters each on average. At batch 13 they held 247K characters.
- The batches wrote 329 rows to batch 10. At entry they were two to three times as long: 2.6K on average in the first batches, 1.4K in batches 8 to 10. Later edits made them 40% to 55% longer, to 0.88M characters on 10-03. At batch 13 they held 275K. The 56 rows added since batch 10 hold 49K, 0.9K each on average.
- So most of the ledger's text still comes from the batches' rows, not from the exploring era's: 275K against 247K.
- Rows almost never shrank until 10-08: after entry they gained 308K characters and lost 0.8K. Then the ledger was rewritten. Each row was cut to 1,200 characters at most, and the ledger fell from 1.25M to 541K characters in one commit. The mean row went from 1.9K to 0.8K. The earlier text is in a history file, 1.33M characters. Closing a row cuts it too.
- From 09-17 to batch 13, batch runs took 28% of the clock (35% to batch 10; no batch ran from 10-03 to 10-08). They brought 89% of the ledger's new characters and 93% of its new rows (88% and 92% to batch 10).
- FACTS peaked at 352K at batch 7b (09-30). On 10-02 it lost 92K in one commit, when the rung entries were cut to the fact. It was 294K at batch 13.
- POSITIONS peaked at 105K (09-29) and was 94K at batch 13. To batch 13, INDEX never lost more than 324 characters in a commit; it was 175K then.
- On 10-13 a consolidation cut FACTS from 258K to 90K characters and POSITIONS from 104K to 34K. The rewrite of 10-22 (part 4) took them to 223K and 80K.
- At batch 22 (10-24) the ledger has 825 rows and 685K characters, FACTS 236K, POSITIONS 78K and INDEX 252K.

Sources: `explorations/coordinator/process-engineering/record-growth/README.md`, `per-batch.csv`, `series.csv`, `landings.csv`; `explorations/coordinator/process-engineering/gap-ledger-archaeology.md` sections 1.1 and 2.4; `explorations/fortress-gap-ledger-history.md`; `explorations/coordinator/postmortem-2026-10-20-record/REPORT.md` section 3; the ledger, FACTS, POSITIONS and INDEX at `2bff2fe23`, read with `git show` and counted as the record-growth README counts them.

## 4. Since 10-04: the skills and the process

**The process-engineering study** (opened 10-03) asks whether the weekly token pool is spent well.

- Sharing one build between checkouts had been called impossible for two weeks. Given the goal, fresh agents found the way in about 15 minutes. The waste was 245 of 425 builds, about 7.3 agent-hours.
- One probe wrote 7.0M tokens against an estimate of 0.5M. Now the coordinator watches a long run against its estimate.

**The `fortress-repo` skill**: the instructions every agent loads to work here.

- 10-04 to 10-07: three project skills written from the record. The curator's 35 comments made every file shorter. The skill gained two modes of work, building and exploring.
- 10-08: a fresh session answered a quiz on Fortress from pre-training alone; an audit graded 56 claims correct, 7 wrong, 3 outdated. The section "Fortress as a language" came from it.

**The ledger.** The curator decided its form on 10-08: one status word of seven, at most 1.2K characters a row, topic sections, the old text in a history file, and one tool, `ledger.py`, to write it. The rewrite landed that day; the 638 rows kept their numbers (part 3).

**The climb** paused from 10-03 to 10-08 while this work ran. Batch 11 began at 23:42 on 10-08.

### The record's post-mortem (10-20 to 10-22)

- 10-20: the curator did not recognize one decision in POSITIONS as his words. It paraphrased a review by Astra. He held all batches until FACTS and POSITIONS were checked again.
- An audit traced each decision to his words, changed 50 of 75 entries and struck four. A rewrite made each entry read on its own, with no plan or status in it.
- The skill's part on what the revival changed had grown from 8K to 74K characters in 12 days. It was rebuilt as a 16K account that every worker reads whole.
- Now POSITIONS holds only the curator's decisions, and a choice that an agent landed is a FACTS entry that says so. The work wrote about 64M tokens.

**A commit outside the batch** (10-20). During batch 20, a commit of the coordinator's own note took a rung's change into `main` before the gate. The push waited for the curator's answers; the history stays as it is. Since then a commit names its paths, and nothing in the main tree is edited or pushed while a batch runs.

### The type-decisions review (10-23)

- At the curator's request, a Fable judge read his decisions on types as one chain, to find where they go against the team's intent.
- It found one place: the first answer took `Vector` and `Matrix` out of the team's additive groups because of a limit of the checker. The curator took its advice the same day: keep the vectors and change the checker (part 2).
- It also found that the tuple rule of the `Index` bound departs from the team's text on tuples. The flat number tower and the overloading rules stand.

**No timing of walk** (10-23). The curator ruled it out. The batch reviews now give the walk check's verdict only.

Sources: `explorations/coordinator/process-engineering/README.md`, `batch-redesign.md`, `ledger-check.md`, `gap-ledger-archaeology.md`, `skill-effect.md` section 1; `explorations/coordinator/INDEX.md`; `explorations/coordinator/POSITIONS.md` (the ledger's form, the skills; P-157); `git show -s ae4f8e38a`; `explorations/coordinator/postmortem-2026-10-20-record/REPORT.md` sections 1 to 6; `explorations/reviews/batch-20-review.md` section 6; `explorations/reviews/type-decisions-review/judgement.md` V1 to V5 and section 2; `explorations/coordinator/PLAN-history.md` ("The timed pairs of the walk check dropped, 2026-10-23").

## 5. What the revival changed in Fortress itself

Changes a programmer writing Fortress would notice, by area.

### Numbers

- The number types are siblings under `Number`, not a tower, as the team's compiler library already had them. A wider type converts from a narrower one by a declared `coerce`.
- Fixed-width overflow raises `IntegerOverflow` under walk, as on the compiled path. To wrap on purpose, write ∔, ∸ or ⨰.
- An integer power answers its base's type. A negative exponent raises an error, except at the bases 1 and -1. For a fraction, write `2.0^(-1)`.
- `SUM` and `PROD` are generic. Under walk, a reduction whose element type nothing fixes runs. The checker still needs it written, also for `BIG MAX` and `BIG MIN`: `SUM[\ZZ32\][j <- 0#i] f(j)`.
- `QQ` is exact. A negative shift count shifts the other way. `GCD` and `LCM` are never negative. `narrow` keeps the low 32 bits. `round` sends an exact half to the even integer.
- The library's numeral type is `IntLiteral`, a sibling that the integer types, `QQ` and `RR64` convert from. Walk's numerals are unchanged for now.

**Ranges.** Ranges are over `ZZ32` only. A range over `ZZ64`, `NN32`, `NN64` or `ZZ` stops when built. A subscript of rank 2 or 3 is checked corner by corner, so a corner outside the bounds raises `IndexOutOfBounds`.

### Arrays and the rest of the library

- `fill` takes a value; `tabulate` takes a function.
- The array types bound their elements: `T extends { Number, MultiplicativeRing[\T\] }`.
- An array's index type is bounded by `Index`, which only `ZZ32` of the integer types extends. Write `I extends Index` in your own generic over one.
- `String`'s juxtaposition, and each of `||`, `|||`, `//` and `///`, is three top-level operators.
- On the checker, a list of `RR64` or `QQ` has no `<`.
- Array storage is still boxed.

### Walk

- Walk converts by coercion at calls, bindings and assignments, picking the coercion from the run-time value.
- Walk infers type arguments through coercions. A type parameter nothing fixes takes its bound, and one whose bound names itself stays open.
- Walk chooses between a generic and a plain declaration by declared types, not by order in the file.
- At load, walk refuses some programs it used to run: an object extending two closed traits without being listed; two functional methods with no declaration on their meet; an object that leaves an inherited abstract method without a body, as five of the team's demos did before they were respelled; an `override` that overrides nothing.

### The checker

- It checks `nat` and `int` size parameters, arithmetic in a size and a size known only at run time, and infers static arguments through coercions.
- Overloads may differ in static parameters. The return-type rule is checked for every instance. Two generic overloads are valid where their parameter types exclude each other as a whole, on both paths.
- The overloads of every operator are checked, the symbolic ones too.
- In a self-typed trait, `self` in a body is also of the implementing type, so `floor(self): I = self` needs no cast.
- An `extends` entry may hold only under a `where` condition, as a list's order does.
- It judges two functional methods for each type that provides both.

### The code generator and the run time

- A top-level `var` compiles, and `atomic` covers it.
- A numeral of exactly 32 or 64 bits keeps its value.
- A sized program compiles, loads and runs. Generic code dispatches correctly on four threads.
- An object with no `asString` prints its type name.

**The specification.** Appendix I has 42 entries, each with the original text and the reason.

### Size of the internal changes

- 194 commits touched the code, library or specification: 28 before the tag, 21 of them toolchain; 166 after it.
- Lines added after the tag: walk 4.8K, checker 3.4K, code generator and run time 1.0K, specification 6.7K, tests 20.9K. The library gained 4.1K lines and lost 2.6K.
- The grammar is unchanged. The suites grew from about 1.4K and 382 tests to 2.1K and 683.

Sources: `explorations/coordinator/process-engineering/fortress-changes-chronology.md` part A (to batch 10); `.claude/skills/fortress-repo/references/revival-changes.md`; `explorations/coordinator/FACTS.md` F-258, F-263, F-276 to F-281, F-285; `Specification/appendices/changes.tex` at `2bff2fe23`; `explorations/reviews/batch-22-review.md` section 1 (the suites); `git diff --numstat 75cca6683 2bff2fe23`; `git log 75cca6683..2bff2fe23` over `ProjectFortress`, `Library`, `Specification`, `bin` and `build.xml`; `git diff a874948ac 2bff2fe23` over the grammar files.

## 6. The original Fortress and the revival's resolutions

### Custodians, not authors

The first principle of the protocol the work follows reads: "We are custodians of their language, not its authors." It asks the revival to finish what the designers intended, judged by the specification and by the library's own practice. Every agent is bound by the same rules through the skill it loads.

- No committed file claims credit for the revival.
- Where git doesn't record who wrote something, the authorship is rebuilt from the history. It's never guessed.
- Reasons go into commit messages and reports, not into the team's source comments.
- Every claim is checked against a primary source: the code, the specification, the papers or a command's output.

None of the team's tests or demos was deleted, and 63 were edited, each for a reason on record. All 52 team demos run to their end under walk. A batch that breaks a demo also repairs it, where the repair is known.

### The team left three sources that disagree

The team left Fortress in three forms, with the type papers beside them:

- the specification, the text that says what Fortress is;
- the interpreter (walk) and its library;
- the compiler and its own, smaller library.

These disagree in places. The revival changes the team's Fortress for one of two reasons only: two of these sources contradict each other, or a program fails. It reconciles them. Where the team's later work, in the compiler's library or the type papers, departs from the original specification, the revival follows the later work. It then updates the specification to match what it implements. A callout marks the passage, and Appendix I keeps the original text with the reason.

### Example: the number types

- The team's interpreter library put the number types in a tower. A narrower type was a kind of the wider type: `ZZ32` was a kind of `ZZ64`, and `ZZ64` a kind of `ZZ`.
- The prelude went from siblings to a tower and back in 2009. Christine Flood declared its widths as sibling objects in March. Jan-Willem Maessen made them a tower later that month. David Chase cut the subtyping between the widths in August. Sukyoung Ryu added the first exclusion, `ZZ32 excludes ZZ64`, in October. Maessen and Eric Allen widened the exclusions and added the first coercions, from November 2009 to January 2010. Guy Steele built the comparisons and the integer operators on the flat prelude in 2011.
- In 2010 Justin Hilburn built the exclusion rule into the checker: no type may extend two instantiations of one generic trait. In the tower, `ZZ32` is both an `Integral` of `ZZ32` and, through `ZZ64`, an `Integral` of `ZZ64`, which the rule refuses. The siblings obey it.
- On 09-24 the curator chose to keep the rule. Batch 6 made the interpreter's library siblings too, on 09-27, so that the checker accepts it.

So a model that remembers the tower remembers the team's interpreter library correctly. What it doesn't know is that the team's compiler had left the tower in 2009.

### Left as the team had it

- Functional methods: a method with `self` among its parameters is called as `f(x)`.
- Juxtaposition as an operator, and the whitespace rules. The grammar is unchanged.
- Declarations: `x = e`, `var x: T = e`, `x := e`.
- Loops and reductions are library code. A `for` loop, a comprehension and `SUM` turn into calls to library objects: a generator, which produces the values, and a reduction, which combines them.
- Evaluation is parallel by default. The revival pins the suites to four threads in the build file.
- Only the compiled path checks static types. Walk checks more when it loads a program, but these aren't static types.
- What the specification describes and the team never built is still unbuilt: dimensions and units, `property` declarations, regions, reduction variables, complex numbers.

### Where the revival resolved a contradiction

#### Dispatch on every argument

- **Overloads that differ in static parameters.**
  - Original: one sentence of the Working Draft forbids this. The 1.0 release of March 2008 doesn't have it. In git, the sentence first appears in the specification's sources as Sukyoung Ryu re-imported them in November 2009. Neither implementation enforced it. The checker implements the type group's model of 2011, from their OOPSLA paper, which allows such overloads.
  - Resolution: such overloads are allowed, and the specification states the 2011 model. The implementations and the library already overload across static parameters, and enforcing the sentence would refuse about 180 pairs of declarations in the library's apis.
- **The return-type rule.**
  - Original: the 2011 paper asks for the rule on every instance of a generic declaration. The checker tested one. A pair that broke the rule then passed the checker and failed the JVM's check of the bytecode.
  - Resolution: the checker tests every instance, as the paper asks. Such a program now fails when it's compiled, not when it runs.
- **How walk chooses between a generic and a plain declaration.**
  - Original: the specification chooses by the declarations' types. Walk chose by their order in the file.
  - Resolution: walk now chooses by the declared types, as the specification says. A program's answer no longer depends on the order of its declarations.
- **Generic declarations that exclude each other only as a whole.** Both implementations refused such a pair. The 2011 paper accepts it, by reading the parameter types together. Both paths now follow the paper.
- **Symbolic operators.** The checker skipped their overloads. The team knew the gap: its appendix of proposed features calls the two subscript operators "not really a valid overloading". The checker now checks every operator.

#### Traits and objects

- **The exclusion rule.**
  - Original: the checker has enforced the rule since 2010, and the 2011 paper states it. The Working Draft doesn't, and some of its examples break it.
  - Resolution: the specification states the rule. It keeps the examples that break it, marked "Not allowed". Without the rule, the checker's return-type rule lets through programs that die with `IncompatibleClassChangeError`.
- **What a `comprises` clause says.**
  - Original: four passages of the Working Draft read it as a statement about types, and so are false for some programs it allows. The Types chapter of the 2012 restart reads it as a statement about values.
  - Resolution: every value of the closed trait is a value of a listed type. Read by values, the passages hold.
- **The vectors' algebra.** The team's vectors are additive groups, and its library also adds an array and a number. By the team's rules these overloads are valid together, but the checker could not show it. The library stays as the team wrote it, and the checker now reads the self type.

#### Static parameters

- **The bound of a type parameter with no written bound.**
  - Original: the Working Draft says `Object`. The library uses its generic containers with tuples, which `Object` doesn't hold, and writes `Any` where it states a bound.
  - Resolution: the bound is `Any`, because the library works only with `Any`.
- **A type parameter that nothing in a call fixes.**
  - Original: the implementations gave it the empty type `Bottom`, or left it unsolved, and some such compiled calls failed the JVM's check of the bytecode. The POPL 2019 paper of Park, Hong, Steele and Ryu gives such a parameter its bound, never `Bottom`.
  - Built: the specification states the paper's rule. The checker infers such a parameter at its bounds, never at `Bottom`. Walk gives it its declared bound, and leaves open one whose bound names itself, such as `SUM`'s. Walk still gives `Bottom` in three narrow cases.
  - Not built yet: at run time both implementations still run a dispatched generic declaration at the value's type where nothing fixes the parameter. The compiled path waits for phase 5, when its dispatcher will carry the call's static return type.
- **The index type of a subscript.** The team wanted an index bounded by an `Index` type that excludes the ranges, but `a[1, 2, 3]` passes a tuple, and they needed "a magic to convert that tuple argument expression to something of type Index". The bound is built, and a tuple of `Index` types is an `Index`. That tuple rule departs from the team's text on tuples, and the specification says so.
- **Sizes on the compiled path.** The specification has size parameters. The compiled path couldn't carry them, but its code generator had a slot reserved for them. The revival fills the reserved slot, in the team's pattern for type arguments, and a program with sizes now compiles and runs.

#### Numbers

- **Conversion in walk.** The specification says that a call converts its arguments when that makes it apply. Walk had a note "TODO add checks for COERCE" at that place. Walk now converts the arguments, doing the work the team's note left to do.
- **Overflow.** The specification and the compiled path raise `IntegerOverflow` when a fixed-width result doesn't fit; walk wrapped the result. Walk now raises it too. Code that means to wrap uses the specification's own wrapping operators.
- **Ranges.** The interpreter's ranges took any integer type, the prelude's only `ZZ32`. Ranges are now over `ZZ32` only, as in the prelude, since a JVM array index is a 32-bit integer.
- **The integer power.** The Working Draft gives it a rational value, which the team never built. The team's later code gives it its base's type, and the revival follows that code (part 5).
- **`SUM` and `PROD`.** `SUM` used catch-all operators on `Number`, which went with the tower. `SUM` and `PROD` are now one generic declaration each, over the element type's own algebra.

### Where the quiz was right about the original

A fresh model answered a quiz on Fortress from its training alone (part 4). The audit graded each answer against today's tree, so an answer can be right about the team's Fortress and still be graded down:

- The quiz didn't say how the number types relate. A reader who assumes a tower, narrower below wider, describes the team's interpreter library exactly.
- Its answer that overflow raises an error, graded correct, holds for the team's specification and compiler. The team's walk wrapped.

Some answers marked wrong come from the team's own specification, which describes more than the team built:

- `Monoid[\T, ⊕\]` with laws: a chapter of the specification. The library has it only in a comment and in its incomplete folder.
- `fortress run Foo.fss`: the specification's overview says this. The team's tool runs a program under walk with `fortress Foo.fss`.
- Complex numbers: named in the specification, in no library.
- Tests that state their expected output: the team's compiler tests do this. Its interpreter tests don't.

Two answers are wrong for both the team and the revival: integer types that wrap by themselves (the specification wraps only with its own operators), and an `Any` type that doesn't hold tuples. One more is wrong for the team: the guess that walk built part of the coercion rules. The team's walk had none.

Sources: `explorations/protocol.md` (principle 1); `.claude/skills/fortress-repo/references/revival-changes.md`; `explorations/coordinator/FACTS.md` and `POSITIONS.md` (the flattening, the exclusion rule, the static-parameter sentence, the instance rule; P-79, P-152, P-153, P-155 to P-157); FACTS F-283; `Specification-1.0-frozen/basic/overloading.tex` lines 100 to 108; `explorations/reviews/mie-probes/spec-sentences-dated.md`; `git diff --diff-filter=M` and `=D a874948ac 2bff2fe23` over the team's test and demo folders; `explorations/compile-ladder/rung-existential-reduction/REPORT.md` (the pair refused on the base); `Papers/Types/exc-reduction.tick`; `Specification-1.0-frozen/appendices/future.tex` lines 186 to 207; `Specification/appendices/changes.tex`, "The index type of a subscript"; `explorations/reviews/type-decisions-review/judgement.md` V1, V2 and V10; `explorations/reviews/fortress-pretraining-quiz.md`; `skills-distillation-audit.md` section B; the team's commits, read with `git show -s`: b2880c05c, 76c267f98, 6896886fb, 3e0306166, 128f313b5, 2ef730c88, d0cde7d17, b3c2e1342, da5291587, d535963cb (the prelude's numbers); 5a6b7913b, e828b44b1 (the exclusion rule in the checker); cec470a34, 0f49d8698 (the static-parameter sentence); 166841592, 275b90773 (the 2012 restart).
