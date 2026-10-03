<!-- The six design-only workflows for climb batch 10 (the first pair, the blind pair, the ultracode pair) priced by one method on batch 10's measured cost by role (reviews/batch-10-review.md section 2, labor.md), with each self-estimate set beside its price; written 2026-10-03 by a worker reading only, nothing built or run; tokens are writes only (cache writes plus new input), models named by tier. -->

# The six batch-10 designs, priced on batch 10 as run

Batch 10 ran on the project's own workflow and wrote **6.26M over 21 agents in 5 h 33 min**, every agent on Opus (`climb-batch-workflow.js` names Opus for every role and Fable only for a judge's second ruling, which did not occur). Six designs were written for the same four pieces (W, C, G, N) and never run. This note prices each one by the same method, on that measured run, and sets the four self-estimates beside the prices.

## 1. The method

**Per agent: start, plus orientation, plus task.**

- **Start**: what the first call writes.
  - For the two designs written from the record (the first pair), it is the measured first call of the same role in batch 10. Their briefs are batch 10's, with the shared prefix, the rung text and the inlined reports.
  - For the blind and ultracode designs it is 23K plus what the prompt inlines. The 23K is the system prompt and tools (36K), written by about half the agents as in batch 10 (10 of 21 started cold), plus 6K of attachments.
  - Inlined text is counted where a design passes it: plans, diagnoses, work orders, build results as JSON. It runs from 1K to 120K.
- **Orientation**: what every agent of a role reads before its task.
  - In batch 10 this was the briefing: worker 45K, skeptic 19K, judge 18K, repair 14K, second skeptic about 5K, the gather's record 58K (labor.md).
  - Blind designs: the content brief's sections, about 10K.
  - Ultracode designs: the skill's parts plus the brief's sections, 10K to 25K by the parts each loads (the files' sizes at 3.6 characters a token).
- **Task**: the measured role's writes after its first call and briefing, scaled by what the design gives the agent. The measured task parts, per agent:

| Measured role (batch 10) | Writes per agent | First call | Task part | Agent minutes |
|---|---|---|---|---|
| Worker, by rung | W 471K, C 665K, G 464K, N 526K | 37K to 77K | W 385K, C 543K, G 382K, N 442K | W 46, C 112, G 70, N 91 |
| First skeptic, by rung | W 319K, C 318K, G 253K, N 302K | 52K to 93K | W 248K, C 240K, G 178K, N 190K | 23 |
| Judge | 208K | 79K | 111K | 10 |
| Repair | 205K (N 208, C 244, G 165) | 68K | 123K | 17 |
| Second skeptic | 170K | 81K | 84K | 6 |
| Gather | 490K | 88K | 344K | 36 |
| Merged-diff review | 425K | 87K | 285K | 19 |
| Gate | 126K | 74K | 52K | 30 |
| Commit | 154K | 79K | 57K | 6 |

**Two scaling rules recur.**

- **An implementer given a share s of a rung's work** (a third of C, a cluster of G) writes the rung's task × (0.35 + 0.65 s).
  - The 0.35 does not shrink with the unit: the area's code, the harness, the build and the test-first ritual. labor.md: a worker has written a median 48% of its total before its first edit, about a third of its task part.
  - A planner or diagnoser of a unit writes half of that, the reading half, plus its plan.
  - Minutes scale the same way.
- **A checking agent with a narrower lens** writes the first skeptic's task × b:
  - 1.0 for a refuter writing probes;
  - 0.8 for a library-practice or passage refuter;
  - 0.5 for reach, measurement mapping or completeness;
  - 0.3 for a process or scope audit;
  - 0.25 for a specification-form or guard audit.
- A narrow re-check (a critic of one plan, a refuter of one finding, a checklist verifier) rests on the second skeptic instead, × 0.6 to 0.8.

**Tiers.** The tier is taken to change which pool pays, not the count: nothing measured gives Fable's or Sonnet's writes for the same task. Thinking is 27% to 32% of writes (labor.md), so the high bound adds 15% to Fable agents at maximum effort.

**Contents.** Each design is priced on what batch 10 held:

- two real defects found by the first skeptics, N's `shouldRaise` and C's varargs crash;
- G's missing assertion;
- a green gate on the first run;
- no cache refill (the longest gap was 362 s).

**Wall time on two agents at once.** It is agent-minutes over two, × 1.02, plus the stretches only one agent can run.

- The calibration is batch 10 itself. The rung phase took 261 min for 511 agent-minutes, and the tail ran alone for 72.
- Minutes are Opus's measured minutes. Fable at maximum effort is likely slower, and nothing measures by how much.

**Left out of every price**, so that all compare with the 6.26M:

- the coordinator's session (two designs counted 0.11M and 0.25M for it);
- the time Pavol takes to answer the plan's questions between workflows;
- the rerun of in-flight agents after a process stop.

**Bounds.**

- Low: warm starts (15K) and task × 0.9, plus the design's own good case: fewer refusals, findings or rounds.
- High: every start cold (the price sheet's 45K) and task × 1.1, Fable at +15%, plus the design's bad case: more refusals, rounds or red gates.
- The arithmetic is a script in the session's scratchpad (`pricing/price.py`), not committed.

## 2. The six at a glance

| Design | Agents | Written: central (low to high) | Fable | Opus | Sonnet | Wall time, two at once | Its own estimate |
|---|---|---|---|---|---|---|---|
| **Batch 10 as run** | 21 | **6.26M** | 0 | 6.26M | 0 | **5 h 33 min** | the record: 6M to 7M, 14 to 18 agents, 6 to 9 h |
| First Fable | 17 to 18 | 5.25M (4.6M to 6.7M) | 0 (0.2M if a top-tier ruling) | 4.97M | 0.28M | about 5 h 15 min (4.8 to 6.5 h) | 5.2M (4.3M to 6.8M) with 0.25M of coordinator; 13 to 14 agents; 9 to 10 h |
| First Opus | 15 | 5.16M (4.6M to 6.4M) | 0.07M | 4.97M | 0.13M | about 4 h 55 min to landing, 5 h 10 min with its measure (4.5 to 6.3 h) | about 4.45M (4.3M Opus, 0.05M Fable, 0.1M Sonnet); 12 agents; 8 to 12 h, 9.5 to 10 central |
| Blind Fable | 46 | 7.48M (5.6M to 9.5M) | 1.39M | 3.67M | 2.43M | about 10 h 15 min (8.5 to 12 h) | 7.1M (5.5M to 8.5M), Fable 1.6M; about 48 agents; about 13 h |
| Blind Opus | 18 | 4.46M (3.8M to 5.6M) | 0.35M | 3.40M | 0.71M | about 6 h 40 min (6 to 8 h) | 3.3M (2.5M to 4.5M) with 0.11M coordinator and 0.25M contingency, Fable 0.28M; 18 agents; 8.6 h |
| Ultracode Opus | about 220 | 31.0M (22M to 45M) | 5.38M | 22.66M | 2.94M | about 27 h in three workflows (22 to 35 h) | none asked |
| Ultracode Fable | about 211 | 36.8M (28M to 53M) | 32.91M | 1.63M | 2.29M | about 36 h in five workflows (30 to 46 h) | none asked |

The fixed part (start plus orientation) of each:

| | Fixed part | Share | Per agent, all told |
|---|---|---|---|
| Batch 10 | 1.96M (first calls 1.47M, briefings about 0.5M) | 31% | 298K |
| First Fable | 1.58M | 30% | 300K |
| First Opus | 1.37M | 27% | 351K |
| Blind Fable | 1.70M | 23% | 163K |
| Blind Opus | 0.67M | 15% | 244K |
| Ultracode Opus | 10.4M | 34% | 141K |
| Ultracode Fable | 11.4M | 31% | 175K |

## 3. Each design

### 3.1 First Fable (`design-batch10-fable.md`, from the leaky brief)

Four workers, four skeptics on closed grounds, one repair round with a narrowed second read, a ruling only on disagreement, a gather, a Sonnet gate and landing, no merged-diff review.

| Role | Agents | Tier | Per agent | Total | Rests on (measured) | Scaled |
|---|---|---|---|---|---|---|
| Worker | 4 | Opus | 464K to 665K | 2.13M | worker, each rung its own | none: the same job (tests first, one reach suite, the stages once) |
| Skeptic | 4 | Opus | 217K to 319K | 1.12M | first skeptic, each rung its own | G's and N's task × 0.8 (only the three programs the brief names) |
| Repair | 3 | Opus | 165K to 244K | 0.62M | repair N, C, G | none: batch 10's three refusals fall under its six grounds |
| Second read | 3 | Opus | 164K to 179K | 0.51M | second skeptic | none: batch 10's were already narrowed to the refusal |
| Ruling | 0.5 | Opus | 208K | 0.10M | judge | one chain in two disputed; in batch 10 the judges reshaped C's fix and found N's precedent |
| Gather | 1 | Opus | 490K | 0.49M | gather | none |
| Gate, landing | 2 | Sonnet | 126K, 154K | 0.28M | gate, commit | none |
| **Total** | **17.5** | | | **5.25M** | | |

- **Wall time.** 476 agent-minutes in the rung phase, then the gather, gate and landing alone (72 min): about 5 h 15 min.
- **The spread** is the refusal chains, about 0.38M each, and the rulings, 0.21M each. A red gate adds 0.53M and an hour by its own figures.
- **Its estimate beside mine:** 5.2M against 5.25M; 13 to 14 agents against 17 to 18; 9 to 10 h against about 5 h 15 min.
  - The totals agree by offsetting errors.
  - It priced the workers at 2.5M to 3.3M, with a 200K cache rewrite budgeted for each; batch 10 measured 2.13M and no refill.
  - It expected one refusal chain (0.6M); batch 10 had three, 1.13M of repairs and second reads.
  - It priced the gather at 0.25M against the measured 0.49M.
  - Its hours rest on worker spans of 2.5 to 4 h; the measured spans are 46 to 112 min.

### 3.2 First Opus (`design-batch10-opus.md`, from the leaky brief)

Four workers, three checkers (one for G and N together), a repair per refusal with no second checker, one Fable ruling for a contested finding, an integrator that runs the gate detached while it writes the records, a non-blocking review beside it, a lander, and a Sonnet measure of the run's cost.

| Role | Agents | Tier | Per agent | Total | Rests on | Scaled |
|---|---|---|---|---|---|---|
| Worker | 4 | Opus | 471K to 665K | 2.15M | worker, each rung | G and N +10K each for the `testSystem` it adds |
| Checker W, C | 2 | Opus | 318K, 319K | 0.64M | first skeptic W, C | none |
| Checker N with G | 1 | Opus | 407K | 0.41M | first skeptic G and N | both tasks × 0.85 (one library read once) |
| Repair | 3 | Opus | 165K to 244K | 0.62M | repair N, C, G | none; G's assertion is a test change, so a refusal here too |
| Ruling, second repair | 0.5, 0.2 | Fable, Opus | 137K, 205K | 0.11M | judge × 0.6 (finding, rebuttal and cited lines only), repair | |
| Integrator | 1 | Opus | 542K | 0.54M | gather plus the gate's polling | |
| Review | 1 | Opus | 425K | 0.43M | merged-diff review | none |
| Lander, measure | 2 | Opus, Sonnet | 154K, 126K | 0.28M | commit, gate | |
| **Total** | **15** | | | **5.16M** | | |

- **Wall time.** 468 agent-minutes in the rung phase; the integrator's 50 min with the review beside it; the landing 6 min. About 4 h 55 min to the landing, 5 h 10 min with the measure after it.
- **The spread** is the repairs and the ruling; a red gate adds about 0.3M.
- **Its estimate beside mine:** about 4.45M against 5.16M, so 0.7M low. It priced:
  - the refusals at 1.4 repairs × 0.28M = 0.43M, where batch 10 had three (0.62M);
  - the checkers at 0.88M against 1.05M;
  - the tail at 0.72M against 1.12M: the integrator 0.28M against a gather's measured 0.49M plus the gate's polling; the reviewer 0.25M against 0.43M; the lander 0.08M against 0.15M.
  - Its workers match (2.25M against 2.15M).
  - Its 8 to 12 h came from the record's worker guesses of 200 to 260 minutes each.

### 3.3 Blind Fable (`design-batch10-blind-fable.md`, from the content brief)

Nine implementers in four chains, each sub-piece checked by a Sonnet checklist, semantic reviewers for W and C only, a Sonnet gate runner and reader at each chain's end, then an integrator, a merged gate, a report writer and a final check.

| Role | Agents | Tier | Per agent | Total | Rests on | Scaled |
|---|---|---|---|---|---|---|
| Implementers W, C-a, C-b | 3 | Fable | 330K to 404K | 1.07M | worker W, C | W whole, × 0.95 (its suite moved to a runner); C-a and C-b one third of C each |
| Implementers C-c, G-a, G-b, N-a to N-c | 6 | Opus | 276K to 330K | 1.72M | worker C, G, N | thirds and halves of the measured rungs |
| Fixups | 4 | 2 Fable, 2 Opus | 161K | 0.64M | repair | the start without batch 10's inlined chain reports |
| Library site passes | 2 | Opus | 221K | 0.44M | worker G | a fifth of a library rung |
| Semantic reviewers W, C-a, C-b | 3 | Opus | 174K to 286K | 0.63M | first skeptic W, C | C's a third each |
| Checklist verifiers | 9 + 4 re-verifies | Sonnet | 80K to 105K | 1.27M | second skeptic | task × 0.8, a re-verify × 0.5 |
| Gate runners | 4 at chain ends + merged + 1 re-gate | Sonnet | 49K to 85K | 0.43M | gate | by the runs each holds: W 0.3, C 0.9, G and N 0.6, the merged gate 1.0 |
| Readers | 5 | Sonnet | 119K | 0.59M | first skeptic | × 0.4: the per-site list mapped through the diff, no probes |
| Base, integrator, report, final check | 4 | Sonnet, Opus, Opus, Sonnet | 49K to 368K | 0.68M | gate, gather × 0.9, gather × 0.4, commit | |
| **Total** | **46** | | | **7.48M** | | |

- **Wall time.** 1,084 agent-minutes; the integrator, the merged gate, its reader, the report and the final check run alone for about 2 h. About 10 h 15 min.
- **The spread** is the fixups and site passes (0.16M to 0.22M each), re-gates and re-verifies, and cold against warm starts over 46 agents (−0.4M to +1.0M).
- **Its estimate beside mine:** 7.1M against 7.48M; Fable 1.6M against 1.39M; about 48 agents against 46; about 13 h against about 10 h.
  - The totals agree by offsetting errors.
  - It priced its nine implementers at 400K to 450K each (3.75M), assuming 120 to 150 calls and one lapsed cache each. Split from the measured rungs they come to 2.8M.
  - It priced its thirty small agents at 40K to 80K, near the 45K floor, where batch 10's smallest agent wrote 126K (the gate). Calibrated, they come to 50K to 120K, and its Sonnet share rises from 1.9M to 2.4M.
  - Its 70 minutes per implementer compare with the split rungs' measured 37 to 44.

### 3.4 Blind Opus (`design-batch10-blind-opus.md`, from the content brief)

Six implementers (C split by file), group runs merged and launched by Sonnet beside three refuting reviewers, a fixer per group only where something was found, one gate, one squashed commit by a Sonnet finisher.

| Role | Agents | Tier | Per agent | Total | Rests on | Scaled |
|---|---|---|---|---|---|---|
| Implementers W, G, N | 3 | Opus | 409K to 467K | 1.30M | worker W, G, N | whole pieces; G and N × 0.97 (the distance moved to the group run) |
| C-infer | 1 | Fable | 353K | 0.35M | worker C | 0.4 of C (rows 593 and 604), no `testFast` |
| C-decl, C-crash | 2 | Opus | 319K | 0.64M | worker C | 0.3 of C each |
| Launchers, collectors | 4 | Sonnet | 49K to 140K | 0.31M | gate; first skeptic for L-collect | L-collect writes the line mapper: skeptic task × 0.5 |
| Reviewers W, C, library | 3 | Opus | 286K to 351K | 0.94M | first skeptic W, C, G with N | the library reviewer: G's and N's tasks × 0.85 |
| Fixers C, library, W (0.3) | 2.3 | Opus | 161K to 213K | 0.47M | repair C; N with G | |
| Gate, gate fix and re-gate (0.35) | 1.7 | Sonnet, Opus | 104K to 161K | 0.20M | gate × 1.3 (pass list, deltas), repair | |
| Finisher, status readers | 1.3 | Sonnet | 249K, 43K | 0.26M | gather × 0.6 | |
| **Total** | **18** | | | **4.46M** | | |

- **Wall time** is set by its barriers:
  - Build: six jobs longest first on two slots, about 3 h 17 min.
  - Check: 1 h 12 min. Fix: about 32 min. Gate: 45 min. Expected re-gate: 25 min. Finish: 30 min.
  - About 6 h 40 min in all.
- **The spread** is the fixers and a red gate (0.35 × 0.27M).
- **Its estimate beside mine:** 3.3M against 4.46M, so 1.2M low.
  - It priced each implementer as its final context counted from the source lines read (1.60M for six). That misses the thinking written back as input, 27% to 32% of writes, and the tool chatter. Batch 10's rung workers wrote 464K to 665K, where it assumed 220K to 320K.
  - Its reviewers at 110K to 180K compare with skeptics measured at 253K to 319K.
  - Its 8.6 h rests on 1.2 to 2.2 h per implementer.

### 3.5 Ultracode Opus (`design-batch10-ultra-opus.md`, cost no constraint, no estimate asked)

Three workflows: plan, build, integrate.

- **Plan** writes nothing: 4 audits, 22 planners, 54 lensed critics, 4 Fable piece judges, a cross-reader.
- **Build** does the following:
  - 22 implementers: Fable for the five walk and checker tasks, Opus for the rest;
  - 2 piece merges;
  - per piece and round, a Sonnet launcher of the runs and 4 to 5 lenses (Fable semantics for W and C);
  - three Opus refuters per serious finding, a fixer, and the touched lenses again, up to three rounds.
- **Integrate** merges the pieces, runs the gate in five steps, then a Fable cross-review, the gate read, a site-by-site reconciliation, a Fable final judge, the report and a final audit.

| Workflow, role | Agents | Tier | Per agent | Total | Rests on | Scaled |
|---|---|---|---|---|---|---|
| Plan: audits | 4 | Sonnet | 143K | 0.57M | first skeptic | × 0.5: every cited line read at base, no probes |
| Plan: planners | 22 | Opus | 148K to 186K | 3.57M | worker before its first edit | half a rung's task at the unit's share (W halves, C eighths, G fifths, N sevenths), +10K for the plan |
| Plan: critics | 54 | Opus | 119K | 6.44M | second skeptic | task × 0.8, the plan inlined |
| Plan: piece judges | 4 | Fable | 184K to 440K | 1.24M | judge | plans and objections inlined (30K to 120K); task × 1 (W) to × 2.5 (C) by objections settled |
| Plan: cross-reader | 1 | Opus | 246K | 0.25M | merged-diff review × 0.5 | |
| Build: implementers | 22 | 5 Fable, 17 Opus | 204K to 265K | 5.00M (Fable 1.26M) | worker | the unit's share, × 0.8 for the judged plan and no whole suite |
| Build: piece merges | 2 | Opus | 187K | 0.37M | gather × 0.4 | |
| Build: run launchers, first round | 4 | Sonnet | 46K | 0.19M | gate × 0.2 | start the runs and return |
| Build: lenses, first round | 19 | 2 Fable, 9 Opus, 8 Sonnet | 80K to 289K | 2.74M | first skeptic, each piece's own | semantics and practice × 1; reach × 0.5; measure × 0.4; process × 0.3; spec and guard × 0.25 |
| Build: refuters | 39 | Opus | 90K | 3.53M | second skeptic × 0.6 | 13 serious findings over the rounds (9, then 3, then 1), three each |
| Build: fixers | 7 | 4 Fable, 3 Opus | 174K | 1.22M | repair | four pieces fixed in round 0, two in round 1, one in round 2 |
| Build: lenses, rounds 1 and 2 | 22 + 6 launchers | 3 Fable, 13 Opus, 12 Sonnet | 46K to 285K | 3.61M | as round 0 | the lenses a fix's touched domains call back, `process` always |
| Integrate: merge-all | 1 | Opus | 405K | 0.41M | gather | |
| Integrate: gate steps | 5 | Sonnet | 48K to 59K | 0.27M | gate, split by step | |
| Integrate: cross-review | 1 | Fable | 393K | 0.39M | merged-diff review × 1.2 (probes) | |
| Integrate: gate read, reconciliation, report, three audits | 6 | Opus, Sonnet | 98K to 221K | 0.84M | gate; first skeptic × 0.8; gather × 0.5; the process lens | |
| Integrate: final judge | 1 | Fable | 360K | 0.36M | judge × 2.5, the whole brief and every result inlined | |
| **Total** | **about 220** | | | **31.0M** | | |

- **By workflow:**
  - Plan: 85 agents, 12.1M, 8.7 h.
  - Build: 121 agents, 16.6M, 14.9 h.
  - Integrate: 14 agents, 2.3M, about 2.6 h, mostly one at a time.
  - About 27 h with the hand-offs, past the 13-hour process stop at least twice.
- **The spread** is the serious findings and rounds:
  - Each finding costs 0.27M to try before anyone fixes it.
  - Each round re-runs up to 19 lenses at about 0.15M each.
  - Cold or warm starts over 220 agents move the total by −1.8M to +4.8M.
  - Low: 6 findings and one fix round. High: 23 findings and three full rounds on every piece.

### 3.6 Ultracode Fable (`design-batch10-ultra-fable.md`, cost no constraint, no estimate asked)

Five workflows, nearly every agent Fable at maximum effort.

- **Read**: 24 groups, each diagnosed by two readers and settled by an adjudicator. The eight groups marked hard get three approaches and a panel judge instead. A boundary auditor reads all 24 work orders.
- **Build**: per piece, a tests-first agent, then one fresh fixer per group in sequence, then a finisher that runs the suite and measurements and writes the report. Heavy runs are queued one at a time machine-wide.
- **Review**: per piece and round, two Sonnet audits, three refuters (two Fable, one Opus) and a Fable completeness critic, told to default to a finding. A blocking finding gets a Fable repair and, if code changed, a Fable re-finish; at most three rounds.
- **Integrate**: a merger, a Sonnet gate and a distance reader.
- **Record**: a records agent, a Sonnet verifier, a Sonnet lander.

| Workflow, role | Agents | Tier | Per agent | Total | Rests on | Scaled |
|---|---|---|---|---|---|---|
| Read: readers | 48 | Fable | 141K to 180K | 7.43M | worker before its first edit | half a rung's task at the group's share (W halves, C ninths, G fifths, N eighths), +5K for the diagnosis |
| Read: approaches, 8 hard groups × 3 | 24 | Fable | 144K to 180K | 3.97M | the same as a reader of its group | |
| Read: adjudicators | 16 | Fable | 142K to 145K | 2.28M | judge × 0.8 | two diagnoses inlined |
| Read: panel judges | 8 | Fable | 201K to 204K | 1.63M | judge × 1.2 | three approaches and two diagnoses inlined |
| Read: boundary auditor | 1 | Fable | 214K | 0.21M | merged-diff review × 0.3 | 24 work orders inlined, about 96K |
| Build: seed | 1 | Sonnet | 53K | 0.05M | gate × 0.4 | |
| Build: tests first | 4 | Fable | 168K to 245K | 0.80M | worker, its test writing and runs (task × 0.3) | the piece's work orders inlined |
| Build: fixers, one per group | 24 | Fable | 174K to 225K | 4.62M | worker at the group's share | × 0.65: work order given, tests already written and seen failing |
| Build: finishers | 4 | Fable | 161K to 300K | 0.97M | gate (runs), first skeptic × 0.4 (the site mapping), gather × 0.25 (the report) | |
| Review: audits | 20 | Sonnet | 97K | 1.94M | first skeptic × 0.3 | |
| Review: practice and blast-radius refuters | 20 | Fable | 205K to 326K | 5.28M | first skeptic, each piece's own, × 0.8 and × 1.0 | the piece's build result inlined, 10K to 40K |
| Review: measurement refuters | 10 | Opus | 104K to 206K | 1.63M | first skeptic × 0.5 (W × 0.2) | |
| Review: completeness critics | 10 | Fable | 152K to 206K | 1.78M | first skeptic × 0.5 | |
| Review: repairs, re-finishes | 7 + 7 | Fable | 161K to 300K | 3.06M | repair; finisher | rounds run: W 2, C 3, G 2, N 3 |
| Integrate and record | 6.8 | Fable, Sonnet | 58K to 378K | 1.17M | gather × 0.5 (merger), gate × 1.3, first skeptic × 0.7 (distance reader), gather × 0.9 (records), commit | a red gate at p = 0.25 |
| **Total** | **about 211** | | | **36.8M** | | |

- **By workflow:**
  - Read: 97 agents, 15.5M, 15.1 h.
  - Build: 33 agents, 6.4M, 7.3 h. C's chain alone is 6 h, inside it.
  - Review: 74 agents, 13.7M, 10.5 h.
  - Integrate and record: about 7 agents, 1.2M, about 2.4 h, mostly one at a time.
  - About 36 h with the hand-offs, past the process stop two or three times.
- **Fable's share** is 32.9M, 89%.
- **The spread** is the review rounds and maximum-effort thinking:
  - One piece-round costs 1.0M to 1.2M, plus a repair (0.18M) and a re-finish (0.16M to 0.30M).
  - Low: blocking findings in three pieces in round 0 and none after.
  - High: three blocking rounds on all four pieces, three red gates, every start cold, and Fable's thinking at +15%, about 5M on its own.

## 4. What the measured run and the six designs show together

- **The number of agents moves cost most.**
  - Every agent pays a start and an orientation before its task: 1.96M of batch 10's 6.26M (31%) over 21 agents.
  - The ultracode designs pay the same per agent about 210 times: 10.4M and 11.4M, more than all of batch 10.
  - Splitting work into units does not split the task: about a third of a rung's task (the area's code, the harness, the build, the test-first ritual) is paid again by every unit.
    - Ultracode Opus: 22 planners and 22 implementers write 8.6M for the work four rung workers did for 2.13M.
    - Ultracode Fable: 72 readers and approaches and 28 tests-first and fix agents write 16.8M.
  - Agent count also sets wall time, since two agents run at once: 15 to 18 agents take 5 to 7 h, 46 about 10 h, 210 to 220 take 27 to 36 h.
- **Checking rounds and checkers per finding come next.**
  - Batch 10's checking roles (skeptics, judges, second skeptics, review, gate) wrote 2.88M (46%), and its three refusal chains 1.75M (28%).
  - The first pair narrow that: first Opus's three repairs with no second checker and no judge cost 0.62M where batch 10's chains cost 1.75M.
  - The ultracode designs widen it:
    - Ultracode Opus spends 7.9M critiquing and judging plans, and 11.3M on lenses, refuters, fixers and re-lensing.
    - Ultracode Fable spends 15.5M reading each group twice and 13.7M on review rounds.
  - What a finding costs: in batch 10 a refusal chain cost 0.49M to 0.65M. In ultracode Opus, three refuters cost 0.27M before the fix, and every round re-runs the lenses the fix touched.
- **Tier moves the pool, not the count**, as far as anything here measures: first Fable 0% Fable, first Opus 1%, blind Opus 8%, ultracode Opus 17%, blind Fable 19%, ultracode Fable 89% (32.9M, about five batch 10s on the scarcer pool).
- **Re-reading.**
  - In batches 8 and 9, 29% of what agents read had been read by an earlier agent of the same batch (labor.md); within one agent, re-reads are 4%.
  - The designs with many agents add copies of the same text by inlining it into each agent: ultracode Fable gives each piece's build result to six reviewers a round, and its boundary auditor and the piece judges read every plan.
- **Waits cost time here, not tokens.** Batch 10 had no cache refill, and every design caps its waits under five minutes. An agent that holds a slot while a suite or the distance runs adds wall time: gate runners and collectors, and ultracode Fable's queue of heavy runs.
- **Every self-estimate overestimated the time, by 1.3 to 2 times.**
  - Each took worker spans of 1.2 to 4.3 h from a guess. Batch 10's workers took 46 to 112 min.
  - The two Fable designs' token totals came within 0.4M of mine, by offsetting errors.
  - The two Opus designs came 0.7M and 1.2M low. They priced the checking and tail roles at 0.08M to 0.33M each, where batch 10's closest roles measured 0.15M to 0.49M, and blind Opus also priced its implementers by lines read.

**Which design buys checks the measured run lacked, and at what price.**

- **First Fable** (5.25M, about 5 h): none. It drops the merged-diff review, whose records check the gather takes over.
- **First Opus** (5.16M, about 5 h):
  - a measure of its own run's cost by role (0.13M);
  - a review beside the gate that holds nothing.
  - It checks less elsewhere: one checker for both library pieces, no second check of a repair.
- **Blind Opus** (4.46M, about 6 h 40 min):
  - rule 3 kept by a run log of code states. Batch 10 repeated one partial stage run (12 min) against a written rule.
  - It found batch 10's two content risks at design time.
  - It has no second check of a fix and no judge.
- **Blind Fable** (7.48M, about 10 h):
  - a reader of the per-site list at each chain's end, inside the run. In batch 10 it was the review after the batch that found the stage's class table misfiling five sites.
  - It has no probing reviewer for G and N, the role that found N's real defect in batch 10.
- **Ultracode Opus** (31M, of which 5.4M Fable, about 27 h) buys the most:
  - the brief checked against the base before work starts (0.57M);
  - plans attacked and judged before any edit (7.9M);
  - every piece, G and N included, probed by independent lenses (2.7M a round);
  - every finding tried by three refuters (0.27M each);
  - test first and rule 3 enforced from a registry;
  - the distance reconciled site by site (0.21M);
  - a final judge walking "what done means" (0.36M). That is the check that would have caught W's stop missing from Pavol's list.
  - It costs about five times the measured run and five times its time.
- **Ultracode Fable** (37M, of which 33M Fable, about 36 h) buys:
  - two independent diagnoses of every group, and panels for the eight hard groups, before any test is written (15.5M);
  - a completeness critic and an independent recomputation of the site mapping in every review round.
- **No design buys the one check batch 10 skipped.** The two microGPT runs under walk were refused by a safety check over `mg-run.sh`'s `rm -rf`.
  - First Opus's lander starts the same script.
  - The ultracode gates compile the eighteen microGPT components and never run them (the skill's `gate.md`).

## For Pavol

- Batch 10 as run: 6.3M, 21 agents, 5 h 33 min, all Opus.
- My prices, each design's own estimate in brackets:
  - first Fable: 5.3M, 18 agents, no Fable, about 5 h (it said 5.2M, 9 to 10 h);
  - first Opus: 5.2M, 15 agents, 0.07M Fable, about 5 h (it said 4.4M, 8 to 12 h);
  - blind Fable: 7.5M, 46 agents, 1.4M Fable, about 10 h (it said 7.1M, 13 h);
  - blind Opus: 4.5M, 18 agents, 0.35M Fable, about 6 h 40 min (it said 3.3M, 8.6 h);
  - ultracode Opus: 31M, 220 agents, 5.4M Fable, about 27 h;
  - ultracode Fable: 37M, 211 agents, 33M Fable, about 36 h.
- Agent count moves cost most. Each agent pays 40K to 95K before its task; split work repeats about a third of each task. Checkers per finding and review rounds come next.
- All four self-estimates guessed the time 1.3 to 2 times too long. The two Opus designs priced checking 0.7M to 1.2M low.
- Ultracode Opus buys the most checks batch 10 lacked: the brief and plans checked before editing, the library pieces probed, a final completeness judge. It costs five times the tokens and the time.
- No design runs the skipped microGPT walk check.
