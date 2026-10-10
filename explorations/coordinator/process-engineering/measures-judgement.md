<!-- Whether the four corrective measures of 2026-10-08 (the batch workflow's redesign, the rewritten fortress-repo skill, the record kept as an optimized build and a debug build, the build-efficiency work) did what the record says each was for, judged on climb batches 8 to 13 from skill-effect.md's measurements, the six post-batch reviews and a few new cuts of the same transcripts and of git; the skill's knock-on effect on the reports' register measured; the "write-only repository" question; the next corrective steps priced; written 2026-10-10 at the curator's request, re-judging skill-effect.md at a higher tier; read-only, nothing built or run but read-only scripts. -->

# The corrective measures of 2026-10-08, judged

Written 2026-10-10 for the curator and the coordinating session. It re-makes the judgement of `skill-effect.md`, whose measurements it uses as evidence. Nothing was built, and no Fortress program, suite, stage or agent was run. The new figures come from read-only scripts over git and over the transcripts; section 6 lists them.

## Words used

- **Measure**: one of the four corrective measures that landed before climb batch 11: the redesigned batch workflow, the rewritten `fortress-repo` skill, the record kept as an optimized build and a debug build, and the build-efficiency work.
- **Before** and **after**: climb batches 8, 9 and 10 (2026-10-02 and 03), and climb batches 11, 12 and 13 (2026-10-08 to 10).
- **Written**: input tokens plus cache-creation tokens, each message counted once (`labor.md`'s measure, `tools/batch-measures.py`). The project's cost unit. M is millions, K thousands.
- **ITE**: input-token equivalents, the cost model of `testing-practices.md` (a cache write 1.25, a cache read 0.05 for each later turn). It weighs text that stays in a long context.
- **Rung**: one change to Fortress that a batch makes, with its worker, skeptic and share of the fixed roles; 1.1M to 1.4M written in batches 11 to 13.
- **Relearning**: calls that read a script, a driver or a build file to find out how to run something, or that write a shell script to run it (`testing-practices.md`'s practices).
- **Handle**: a short internal reference that a reader without the record cannot resolve: "row 582", "item 43", "Q4", "NEW-W-1", "coldread.2", a commit hash.
- **Curator's queue**: what the batches list for the curator's word, in `PLAN.md`'s "listed for his review" sections and "Pavol's answers".

## 1. The verdicts in short

- **The batch redesign met its aim.** The refusal chain is gone (25 %, 20 %, 28 % of a batch before; 2.7 %, 5.4 %, 6.3 % after), a batch writes 15 % less and a rung 27 % less, and nothing measured shows a loss of quality. Sure of the mechanism, less sure of the size.
- **The skill met one of its aims and missed its price.** Agents stopped relearning what the skill covers (calls per agent down 70 %) but not what it leaves out by decision (stage drivers, down 17 %). It costs 0.47M to 0.65M written a batch, two to three times its price, and about ten times the relearning it measurably removed. Its main aim, a correct model of Fortress, has never been measured.
- **The record's form met its aim for the gap ledger, not yet for the rest.** The ledger fell 57 % and grows 19K characters a batch instead of 46K. FACTS grows back about 15K a batch, and the consolidation no longer shrinks it. `PLAN.md`, where the curator's items go, never got the form: 464K characters, growing 17K to 53K a batch.
- **The build-efficiency work is unmeasured.** No tool measured time after it, and the one rough proxy, the length of a `harness-one.sh` call, did not move.
- **The knock-on on the reports is small.** Rung reports have shorter sentences, but none defines its terms, internal handles are as dense as before, and the gather's record got denser. What reaches the curator was already plain.

## 2. Each measure against its own aim

### 2.1 The batch workflow's redesign

**Its aim.** Take the waste out of the checking chain: the skeptic fixes what it finds, a judge rules only on a contested fix, no second skeptic, briefs a third to a ninth of the old size; batch 11 at about 5.2M against batch 10's 6.26M (`batch-redesign.md:12-16`, `:30-34`, `:221`). The curator's reason for the order of the work: the batches "re-ran their costly parts", and batch 11 "is to show the better shape against the wasteful runs before it" (POSITIONS, "The order of the work after batch 10.", `POSITIONS.md:132`). Behind both, the post-mortem's rule: "Every step spends the fewest workers the step needs and measures nothing the record already holds." (POSITIONS, "The new batch practice, and what he expects of it.", `POSITIONS.md:122`).

**What the evidence shows.**

- Written per batch: 7.72M, 6.88M, 6.26M before; 5.03M, 5.43M, 7.22M after; 15 % less on the means, 6.73M to 5.69M without the agents that VM restarts killed (`skill-effect.md:10`, `:56-57`).
- Per rung: 1.93M, 1.72M, 1.57M before; 1.26M, 1.09M, 1.44M after (`skill-effect.md:59`). The means fall 1.74M to 1.26M, 27 %; with the restarts' agents left out, 1.68M to 1.22M, also 27 %.
- The refusal chain: 25.0 %, 20.4 %, 27.9 % of the batch before; 2.7 %, 5.4 %, 6.3 % after (`skill-effect.md:80`). Batch 11 came within 2 % of its prediction once its one ruling and no repair are put in (`batch-11-review.md:22-48`). Batch 13 wrote 25 % over its record's 5.8M: 0.61M of two skeptic runs a VM restart stopped, 0.39M of rung V's measurement, and a third ruling (`batch-13-review.md:36-55`).
- Quality held, as far as the reviews can tell: every rung "in the spirit" in all six batches; no wrong value landed; a blocking review finding in batches 8 and 9 (0.53M and 0.39M) and none after; the gate green at its first run in batches 11 to 13; 57 skeptic fixes, all sound and test first; six rulings, all upheld, none reverted (`skill-effect.md:90-104`; `batch-11-review.md:227`; `batch-12-review.md:232`; `batch-13-review.md:259`).
- Two costs grew. A skeptic now writes about 400K against batch 10's 298K, and the checking roles' share of a batch rose from 30 % to 37 % before to 34 % to 42 % after (`skill-effect.md:80`). The six rulings cost 0.14M, 0.30M and 0.455M and reverted nothing; five of them were sent to a judge by clause (c) of the contested rule alone (`batch-13-review.md:255-259`). The curator narrowed the clause on 2026-10-09 (`a1902d0d4`; POSITIONS, "The judge's rulings.", `POSITIONS.md:118`).

**How sure.** Sure that the saving is the second round's removal: its roles are gone, and their cost before (1.40M to 1.93M a batch) is on file. Less sure of the size per rung, since the rungs differ. Quality: the counts are one or two events per batch, so "no loss" is the most they can say.

### 2.2 The rewritten `fortress-repo` skill

**Its aims**, from POSITIONS, "The skills are written for a reader new to the repository, and checked against what the workers did." (`POSITIONS.md:134`):

1. Distil "the best practices found by every worker in this repository, for a reader new to it".
2. Correct "the assumptions an agent brings from pre-training, so that it forms a correct model of Fortress as a language".
3. A register "about halfway toward ASD-STE100", "without bloating the skills, whose token count matters, a rewrite never longer than what it replaces".
4. From the redesign: let each brief point to the skill "for how", at about 0.2M a batch to load and a net 5K less for a rung worker (`batch-redesign.md:68`, `:210`).

**What the evidence shows, aim by aim.**

1. **Distilled practice: met where the skill covers it.** Calls that read a suite, harness, `env.sh` or probe source to learn how it runs fell from 254 to 60; shell scripts to run suites and `env` set-ups from 21 to 1; the two traps the skill names from 28 events to 2 (`skill-effect.md:79`). Per agent of the batch (64 agents before, 51 after) the covered reading falls from 4.0 to 1.2 calls, 70 %. Where the curator's decision keeps the practice out of the skill, the checker count and the distance stage, reading the stage drivers fell from 1.77 to 1.47 calls an agent (113 to 75), 17 %, and stage scripts from 72 to 41. One piece of a worker's own discovery made the trip: the `-debug stacktrace` flag, which batch 10's rung C found by hand and no record held (`context-study.md:36`), is in three parts of the skill and batch 13's workers used it 13 times (`skill-effect.md:79`). In tokens the gain is small: the reading to learn fell from 0.59M, 0.49M, 0.67M ITE a batch to 0.19M, 0.17M, 0.17M (`skill-effect.md:79`), about 0.4M ITE a batch.
2. **A correct model of Fortress: not measured.** No figure on file tests it. The pre-training quiz and its grading exist (`reviews/fortress-pretraining-quiz.md`; `reviews/skills-distillation-audit.md`, section B), but the quiz was never run with the skill in hand. The reviews' quality counts cannot stand in for it (sections 2.1 and 2.5).
3. **Register and size: the register was already there; the size grew.** By the script of section 6, the skill's prose averages 12.1 words a sentence before the rewrite (at `24af7743b^`) and 12.6 after (`cae2a0ad5`), with 0.7 % and 1.1 % of sentences over 30 words: the parts written from 2026-10-04 on were already in that register. Without `sources.md` (never loaded for a task) and the new `revival-changes.md`, the parts went from 108.5K to 118.0K bytes, 9 % longer (`git ls-tree -r -l` at the two commits). Rewritten parts with no new content did shrink (`build-and-caches.md` 12.5K to 12.2K, `compiler.md` 10.0K to 9.5K); the parts that took new facts grew (`gate.md` 6.7K to 8.7K, `records.md` 6.1K to 9.0K). `revival-changes.md` grew from 8.1K to 28.3K bytes in three batches, by design, and is already the part read most.
4. **Its price: missed by two to three times.** Every one of the 51 agents loaded it. Load text and parts read: 0.47M, 0.58M, 0.65M written a batch, 9.2 %, 10.7 %, 9.0 % of the writes, and 4.0M, 4.4M, 5.4M ITE, about 12 % (`skill-effect.md:11`, `:34-40`; re-run in section 6). A rung worker: a net 19K more, not 5K less (`skill-effect.md:46`). First calls and skill together fell 9 % in tokens written and rose 17 % in ITE (`skill-effect.md:12`).

**How sure.** Sure of the cost (exact, re-run). Sure of the direction of the relearning: the covered and uncovered practices moved differently in the same batches, under the same redesign, which is the nearest thing to a control these batches hold. Nothing at all on aim 2.

**Its own new risk.** One wrong sentence reaches every agent. The skill's `run_bg` was refused at its every use in batch 11, nine calls in eight agents (`batch-11-review.md:71`). The batches left 6, 1 and 4 skill sentences false, plus omissions, each needing a writer task after the review (`batch-11-review.md:333-345`; `batch-12-review.md:296-311`; `batch-13-review.md:321-338`).

### 2.3 The record as an optimized build and a debug build

**Its aim.** FACTS and POSITIONS state "what is true about the repository snapshot at this moment in time", timelessly; the history files keep the provenance. "I don't want you to be searching with a flashlight in a dark room. I want to give you a map of the territory." FACTS is consolidated before each batch, "since workers read it and pay the cost", and "the files read at every boot hold a clean current state" (POSITIONS, "The record's form: an optimized build and a debug build.", `POSITIONS.md:130`). For the ledger: one status word, rows of at most 1,200 characters, the earlier text in one history file (POSITIONS, "The gap ledger's form.", `POSITIONS.md:133`).

**A correction to the brief's dates.** The form was decided on 2026-09-30 (`POSITIONS-history.md:448-452`) and applied to FACTS and POSITIONS on 09-30 and 10-02. What landed on 2026-10-08 was its extension to the gap ledger (`ae4f8e38a`, 14:06 UTC). So for FACTS the "before" batches already ran on the form.

**What the evidence shows.**

- **The ledger: met.** 1,246,580 to 540,693 characters in the rewrite, the mean row 1,863 to 832; since then it grows 19K characters a landing against 46K before (`record-growth/README.md:17-19`).
- **FACTS: the form holds, the shrinking stopped.** 352K characters at batch 7b, 227K at batch 8's landing, then 234K, 245K, 266K, 280K, 294K; the consolidations before batches 12 and 13 changed it by +2.2K and +0.2K (`record-growth/README.md:21`). At each landing the commit stage lists the FACTS sentences the landing made false: 4, 6 and 10 in batches 11 to 13 (`batch-11-review.md:364`; `batch-12-review.md:85`; `batch-13-review.md:107`).
- **Reading it.** The briefing slice that workers read fell from 5.6 %, 6.7 %, 5.5 % of the batch to 4.3 %, 4.3 %, 3.6 %, but the redesign trimmed the briefings in the same hour (`batch-redesign.md:66`; `skill-effect.md:67`, `:76`). The record read directly stayed at about 4.5 % (`skill-effect.md:76`).
- **Misses of the record did not fall.** "A premise of the record that does not hold": 5, 4, 4 before, 3, 2, 5 after; "text or a record claiming more than the paths do": 6, 5, 4 and 6, 7, 4 (`skill-effect.md:99-100`, `:115`).
- **`PLAN.md` is outside the form.** It holds dated entries, answered items and one "listed for his review" list per batch, and it grew from 330K characters at batch 11's base to 464K now: +17K, +43K, +53K for batches 11 to 13 (`git show <landing>:explorations/coordinator/PLAN.md | wc -c`, section 6).

**How sure.** Sure for the ledger (exact sizes). For whether the map prevents misses: no evidence either way; the counts are flat and small.

### 2.4 The build-efficiency work

**Its aim.** Builds and test runs that keep the Fortress caches unless the implementation changed: `ant compileAll` with nothing changed 20 s to 4 s, a warm `harness-one.sh` JVM about 3 s against 17.6 s cold, the suites at four threads (`build-efficiency.md:11-23`). It answered `harness-cache-cost.md`: 120 test runs in batches 8 to 10 started with an empty cache, about 248 minutes of wall time (`harness-cache-cost.md:13`). The cost it targets is time, not tokens (`process-engineering/README.md:17`).

**What the evidence shows.**

- No tool measured time after it. `harness-cache-cost.md`'s scripts were not recovered (`tools/transcript-study/README.md:29`).
- The one proxy did not move. By the study's `cost.py` run over the six batches, rung workers' `harness-one.sh` calls took 50 minutes in 87 calls before (about 34 s a call) and 32 minutes in 62 calls after (about 31 s); a warm run is about 3 s plus the tests (section 6).
- The build counts in `skill-effect.md:71` (13, 13, 10 workers' builds before; 7, 5, 2 after) are not usable: `batch-measures.py` counts refused calls and misses builds run under `nohup` (`batch-11-review.md:68-70`; `batch-12-review.md:73`). The reviews' own hand counts are 11 and 13 builds, each on a new code state; repeated builds were already down to one in batch 10, before this work (`batch-11-review.md:70`; `batch-10-review.md:392`).
- The four-thread suites ran green in all three gates (`batch-11-review.md:79`; `batch-13-review.md:105`).

**How sure.** Not measured. The proxy is weak: the skill sends long commands to the background, so a call's length no longer measures what it ran.

### 2.5 What the evidence cannot separate

- **The redesign and the skill landed in the same hour.** No batch ran the skill under the old workflow, or the new workflow without the skill (`skill-effect.md:119-120`). Every quality figure, and every figure that depends on what a brief carries or on the number of roles, belongs to both.
- **There was no "old skill".** Batches 8 to 10 ran with no skill and a 39K to 47K character procedure prefix in every brief (`skill-effect.md:9`).
- **The ledger's rewrite and the leaner briefings** came the same day as the skill, so a change in reading the record has three possible causes.
- **The work differs.** Walk's Meet Rule and the checker's defects before; the checker's expected type, ranges, sizes and orders after; four rungs a batch before, four or five after, one of them "about one and a half rungs" (`skill-effect.md:121`).
- **Restarts and refills.** Batch 9's two killed workers (0.68M), batch 13's two stopped skeptics (0.61M), one refill each in batches 8 and 13 (`skill-effect.md:122`).
- **The skill changed between batches** (`7b3226bb2`, `38def33a9`, `6c021c983`).
- **Small counts.** Six batches, four or five rungs each; most quality differences are one or two events.
- **Test first is measured differently.** After the redesign a skeptic fixes "a test not seen failing first" itself (`batch-redesign.md:91`). The reviews read the workers' order of work in their transcripts in all six batches (`batch-12-review.md:246`; `batch-13-review.md:261-263`), so the count stays comparable, but the brief also dropped the separate test commit (`batch-redesign.md:76`).

## 3. The skill in particular: the knock-on effects and the cost

**The curator's reading.** The batch reports now carry the skill's structure and register, define their terms first, and read as plain language instead of agent shorthand.

**What was measured.** The prose of every rung report, skeptic report, judge report and gather record, at each batch's landing commit, and of the six reviews, with a script that leaves out code, tables and headings (section 6). The per-report means:

- **Sentence length fell.** A rung report's mean sentence went from 21.3 to 17.7 words (medians 21.8 and 16.1). Sentences over 30 words fell from 20.9 % to 11.2 % of a report (medians 23.6 % and 8.1 %). Semicolons fell from 1.7 to 1.3 per 100 words. Over 12 and 14 reports these differences are larger than the spread (rank test, p about 0.01 to 0.05).
- **Reports got shorter.** 5.3K prose words a rung report before, 3.9K after.
- **Handles did not fall.** 1.34 and 1.29 per 100 words. Citations 3.6 and 3.6 per 100 words, parentheses 4.0 and 4.2.
- **No report defines its terms.** None of the 26 rung reports, the six gather records or the six reviews opens with a terms section or uses the skill's dictionary form, before or after.
- **The gather's record got denser.** Its median sentence went from 16 to 24 words, and sentences over 30 words from 22 % to 35 %.
- **Skeptic and judge reports did not change** (about 15 words a sentence throughout).
- **What reaches the curator was already plain.** The reviews' "For Pavol" sections average 12 to 14 words a sentence, with no sentence over 30 words, in batch 8 as in batch 13.
- **The study notes show no trend.** Notes that open with a terms section were common from 2026-10-05 on, in the coordinator's briefs, before the rewrite (`checking-roles-cost.md`, `context-study.md`, `testing-practices.md`, `harness-cache-cost.md`). `skill-effect.md` itself, written after, is the densest of the study's notes: 27.5 words a sentence, 35 % over 30.

**What carried the shift.** The old brief had a register paragraph ("Plain sentences, no self-congratulation ...", `git show 9c9e823d5:explorations/coordinator/climb-batch-workflow.js`, lines 1020-1022); the redesign removed it, and neither the new brief nor the skill gives reports a register rule (`git show 83b1cae78:explorations/coordinator/climb-batch-workflow.js`, lines 576-604 and 686; `references/records.md`, "What every report holds"). The batch records that the briefs carry word for word did not get plainer (25 to 28 words a sentence before, 22 to 27 after). So the shorter sentences came with less instruction, which points to the text the agents read: the skill, or the leaner brief written in the same register. The two cannot be separated.

**Judgement.** The evidence supports a small change in register in the rung reports. It does not support "define their terms first" or "plain language instead of agent shorthand": the handles that make a report unreadable without the record are as dense as before. Against the cost, the knock-on weighs little. The skill costs 0.47M to 0.65M written and 4.0M to 5.4M ITE a batch. The relearning it measurably removed is about 0.4M ITE a batch, and the whole relearning before it was about 1M ITE a batch (`testing-practices.md`: about 3M of 119.5M over three batches). On the measured figures the skill does not pay for itself in tokens. Its case rests on what is not measured: that a correct model of Fortress prevents wrong changes, and that it let the briefs shrink. The first can be measured cheaply (section 5, step 5). The cost can be cut without cutting the skill (step 2).

## 4. The "write-only repository"

**What a batch writes.** The rung reports, skeptic and judge reports, decision records and the gather's record hold 53.6K, 41.1K, 42.6K prose words in batches 8 to 10, and 25.2K, 31.8K, 45.2K in batches 11 to 13, plus a review of 7K to 9K words (section 6). Read aloud at 150 words a minute, a batch is three to six hours. The record under `explorations/` is 1,655 files and 37.8M characters (`git ls-files explorations`). FACTS, PLAN, the ledger and INDEX together grew by about 45K, 80K and 95K characters in batches 11 to 13 (`record-growth/README.md:19`; section 6).

**What workers still learn on their own.** What the skill covers, they mostly no longer relearn (section 2.2). What it leaves out, they still do: stage drivers read 75 times and 41 stage scripts written in three batches. Rung V ran a stage in the foreground for 600 s because its brief said the stage takes 20 s, and the next call rewrote 309K of cache (`batch-13-review.md:98`). Whether workers still rediscover facts the record holds is not measured after batch 10. There, 35 % of 43 facts a worker established were on record whole, and the rediscovery weighed 4 % of the workers' ITE (`context-study.md:33`). Those were hand labels; nobody repeated them.

**What they read from the record.** The briefing slice (3.6 % to 4.3 % of a batch), record files read directly (3.6 % to 5.2 %), and the reports and transcripts of their own rung (7 % to 8 %) (`skill-effect.md:67-68`, `:76`). Between the briefing and the fix edit, batch 10's workers queried no POSITIONS entry, ran no second briefing and opened INDEX once (`context-study.md:34`). The skill's part on what the revival changed is the one distilled record that reaches them: 13 of 14 rung workers read it, 29 calls; of its 138 reads, 105 are the gather, the cold reader and the review maintaining it (skill-load re-run, section 6).

**Whether misses of the record fell.** No (section 2.3). The skill added a new kind: false skill sentences, 6, 1 and 4 a batch.

**The curator's side.** The distillation serves workers. Nothing distils for the curator except the review's short "For Pavol" section (240 to 384 words). The items a batch hands him: 24 in batch 11, 22 in batch 12, 53 in batch 13 (`batch-11-review.md:315-323`; `batch-12-review.md:317`; `batch-13-review.md:344-346`). Of the 47 of batch 13's items that reached PLAN, every one but one "states a default, or says it is for information or holds nothing" (`batch-13-review.md:346`, `:351`): under POSITIONS, "Reversible stops do not hold a batch.", those defaults have already landed. `PLAN.md`'s "listed for his review" sections hold 202 entries over nine batches, and the reviews find answered items still standing as open in every batch (`batch-11-review.md:362`; `batch-13-review.md:380-387`).

**Has the distillation paid off?** For workers, partly: the skill carries procedure and the revival's changes to every agent, and the relearning it covers stopped. The price is high for what is measured, and no one has measured whether it prevents wrong changes. For the curator, no: the record has no distilled path for him, and his queue grows by tens of items a batch, almost all of which need nothing from him.

**A reader's path through the record.**

- **For the curator**, in this order:
  1. Each batch's landing message, which is the review's "For Pavol" section, under 400 words.
  2. One short queue: only the items that need his word. That means an item with no default, a step that cannot be undone, or a change against one of his decisions. Batch 13 had one such item among the 47 it put in PLAN.
  3. When he wants to know what Fortress now is: `SKILL.md`, "Fortress as a language", and the skill's part on what the revival changed (`references/revival-changes.md`). It is the one record kept current and cold-read after every batch.
  4. A report only where an item in his queue points to one section of it.
- **For a worker**, the path the evidence says works: the brief, then `SKILL.md`, then the parts for its area, then its briefing slice, then the ledger rows by query, then the code, the library and the specification. It reads a report only through a FACTS entry or a ledger row that cites it. INDEX is not on its path: workers do not open it (`context-study.md:23`).
- **For the coordinator**, a note: its boot reads FACTS, POSITIONS and INDEX whole (`coordinator/README.md:5-11`), about 575K bytes now. At FACTS' and INDEX's growth that is several K tokens more at every boot for every batch. Querying INDEX instead of reading it whole would save about 73K tokens a boot at `facts-extract.sh`'s 0.41 tokens a byte. The boot read is "full context by Pavol's word", so this is his to change.

## 5. What to improve next

Each step gives its evidence, its expected effect, its cost in tokens written (with rungs for scale, a rung being about 1.2M across its roles), and how a later review measures it. In order of value for the cost.

1. **One short queue for the curator.**
   - Evidence: batch 13 listed 53 items, and of the 47 that reached PLAN, 46 carry a landed default or are for information; PLAN holds 202 "listed for his review" entries and grows 17K to 53K characters a batch; answered items stay open (section 4).
   - Effect: a queue of the few items that need his word, a handful a batch; PLAN stops growing. The rest goes to a history file, as FACTS' and POSITIONS' history does (the debug build).
   - Cost: about 0.4M once, a third of a rung, for an Opus pass over the 202 entries; under 0.02M a batch after, for one routing clause in the gather's and the review's briefs.
   - Measure: `record-growth/measure.py` with `PLAN.md` added to its four files; items per batch from the run's `forCurator` and the review's routing part; his answers per batch in `POSITIONS-history.md`.
2. **Serve the skill's standing text from the prompt cache.**
   - Evidence: the skill is 0.47M to 0.65M written a batch, read the same by every agent (`skill-effect.md:78`). A project agent type's system prompt is written once and read from the cache by the next agents of the type (FACTS, "The Workflow harness runs two agents at once on this box", `FACTS.md:206`: 17,250 read and 3,820 written by each later agent).
   - Effect: `SKILL.md` and the standing set of parts in the type's system prompt; about 0.35M to 0.5M less written a batch, 6 % to 8 %, with the same text in every agent.
   - Cost: a probe first, about 0.1M, to learn whether a changed type file is read without a restart of the session's process (FACTS says a new type needs one). Then a generator for the type file and one restart. If every change needs a restart, only the parts that rarely change go in, and `revival-changes.md` stays loaded on demand.
   - Measure: `batch-measures.py` first calls (cache reads against writes); `skill-load.py` (the skill's load and part reads per agent).
3. **Keep the skill true at each landing.**
   - Evidence: 6, 1 and 4 sentences false after batches 11 to 13; the gather folds only its own part, so other sentences that a change makes false stay (`batch-11-review.md:329-345`); one false sentence, `run_bg`, failed for every agent of batch 11 that followed it.
   - Effect: no batch runs on a false sentence, and no writer task after each review.
   - Cost: about 0.03M a batch. A worker's report lists each skill sentence its change makes false, as it already lists the specification's; the gather fixes them; the cold reader reads every changed skill line, not only the new entries.
   - Measure: the review's "Skill sentences the batch made false" count, which should be 0; `practices.py`'s refused-call count (`fail:auto-check-refusal`).
4. **Say how to run the stages in the briefs that run them.**
   - Evidence: stage-driver reading fell 17 % an agent while the covered practices fell 70 %; 41 stage scripts in three batches; rung V's 309K refill after a 600 s foreground stage (section 4). POSITIONS assigns this to the workflow's prompts (`POSITIONS.md:134`, "The checker count and the distance ...").
   - Effect: about 0.3M ITE a batch of stage relearning, and the occasional refill of 0.3M.
   - Cost: a paragraph of about 1K tokens in the briefs of the roles that run stages, about 0.01M written a batch.
   - Measure: `run-study.py testing-practices` (`read:stage`, `make-script:stage`); `batch-measures.py` refills.
5. **Measure the skill's main aim with the quiz, not with a batch.**
   - Evidence: the language aim is unmeasured; the reviews count one or two quality events a batch, so the A/B test of `skill-effect.md:144` (two rungs, one with the skill and one with the old prefix) has one pair and cannot answer a quality question.
   - Effect: a direct count of the wrong and outdated claims a fresh agent makes about Fortress with `SKILL.md` and without it, graded against `skills-distillation-audit.md` section B.
   - Cost: about 0.15M, against a rung's 1.2M or more for the A/B test.
   - Measure: the graded count itself, repeated after each change of "Fortress as a language". No recovered tool does this; the quiz's prompt is in `reviews/fortress-pretraining-quiz.md`.
6. **Make the build count trustworthy.**
   - Evidence: `batch-measures.py` counts refused calls and misses builds run under `nohup`; routed by batch 11's review and still not built at batch 12's (`batch-11-review.md:281`; `batch-12-review.md:73`).
   - Effect: the build figures of every later review can be used again.
   - Cost: about 0.05M, a tool change.
   - Measure: its counts agree with a review's hand count (11 in batch 11, 13 in batch 12).
7. **Measure the build-efficiency work once.**
   - Evidence: no tool measured time after it (section 2.4).
   - Effect: a figure for the cold cache fills left, against batches 8 to 10's 120 runs and about 248 minutes.
   - Cost: about 0.15M on Sonnet, a counting task: rebuild `harness-cache-cost.md`'s count from `testing-practices/parse.py` and `dump.py` (a first test of more than 10 s is a cold fill).
   - Measure: the count and its minutes per batch.
8. **Already taken: clause (c) narrowed** (`a1902d0d4`). Batch 14 should show about 0.25M to 0.3M less in judges than batches 12 and 13, the cost of their clause-(c) rulings (`batch-12-review.md:241`; `batch-13-review.md:255-259`). Measure: `batch-measures.py`, the judge role.

**The study's "Waiting on Pavol"** (`process-engineering/README.md:50-54`):

- **Settled by the evidence: keep the fixed workflow.** The redesigned fixed workflow wrote 5.0M to 7.2M a batch; the ultracode designs were priced at 31M and 37M (`design-pricing.md`). Nothing in batches 11 to 13 shows a shortfall that more agents would fix: no wrong value, no blocking finding, and what slips through is record, not code. The question can close at his word.
- **Settled by the evidence: do not run the A/B test of the skill.** One pair of rungs cannot measure quality at one or two events a batch; step 5 measures the skill's aim for about a tenth of the cost.
- **Not settled, newly priced: an agent type per role (item 14).** The skill's shared reading gives it a concrete use worth about 0.35M to 0.5M a batch; step 2 is the probe that decides it.
- **Not settled: the gate, the commit and the microGPT measure on Sonnet (item 13).** The gate and the commit write 0.12M to 0.15M each a batch, and the commit stage makes a judgement (it lists the FACTS sentences a landing made false). The stake is small and the choice is his.
- **Not an evidence question: the rule on engineering taste.** The build-efficiency work and the cache-sharing test are consistent with it; it waits for his one line.
- **Not an evidence question: the whole-project designs.** Nothing in batches 11 to 13 calls for them.

## 6. The new figures and the numbers checked

- **The register measures** (sections 3 and 4). A Python script in the session's scratchpad, not committed: for each file it removes fenced code, comments, table lines and headings; turns inline code into one word; splits list items and sentences (a `.`, `!` or `?` before a capital); and counts words, sentences, sentences over 30 words, parentheses, semicolons, handles (`rows? N`, `items? N`, `Q`/`D` and a number, nine-digit hashes, `NEW-`, a word, a dot and a number), and file:line citations (`:N` or `:N-M`). The texts are read with `git show <landing>:<path>` at the landings `6416d216f`, `cec70988b`, `ec718967a`, `f9d3ec826`, `32b88cd3b`, `738904f9a`, for the rung folders that each landing's rung commits add (four, four, four, four, five, five). Two lines of its output:

      B8-10 REPORT.md pooled (12)          63982 words, median sentence 17 words, 19.8 % over 30
      B11-13 REPORT.md pooled (14)         31534 words, median sentence 15 words, 13.2 % over 30

  The per-report figures of section 3 are means over the reports, which a few very long list lines distort less than the pooled mean.
- **The skill's reading by role** (sections 2.2 and 4): `skill-load.py --repo . <run>` on runs `wf_88561d30-63b`, `wf_7814a5bc-549`, `wf_33c4de68-284` (the backup copy of the transcripts). Re-run for a new cut, not out of doubt. Its run totals equal `skill-effect.md:36-40`:

      run total  agents 14  load text 106K (2.1%)  parts read: 203 calls, 359K (7.1%)
      run total  agents 17  load text 130K (2.4%)  parts read: 245 calls, 453K (8.3%)
      run total  agents 20  load text 153K (2.1%)  parts read: 248 calls, 494K (6.8%)

  `revival-changes.md` by role over the three: cold reader 49 calls, gather 31, rung workers 29 (13 of 14 workers), review 25, skeptics 4.
- **The relearning counts** (section 2.2), checked, not re-run: `skill-effect.md:79`'s figures equal the per-batch counts of the study's own `run-study.py testing-practices` run over batches 8 to 13, for example `read:suite` 44, 37, 47 against 16, 13, 7, and `read:stage` 54, 23, 36 against 18, 21, 36. The per-agent figures divide by 64 and 51 agents.
- **The `harness-one.sh` call lengths** (section 2.4): the rung lines of the same run's `cost.py` output, `harness-one:16c/8m`, `50c/28m`, `21c/14m` before and `13c/7m`, `22c/11m`, `27c/14m` after. Minutes are rounded to whole minutes.
- **The build counts doubted** (section 2.4): `skill-effect.md:71`'s row comes from `batch-measures.py`, which batch 11's and 12's reviews show to count refused calls and to miss `nohup` builds. Not re-run; the reviews' hand counts are used instead.
- **Sizes:** `git ls-tree -r -l <commit> .claude/skills/fortress-repo/` at `24af7743b^`, `cae2a0ad5`, `738904f9a`; `git show <commit>:explorations/coordinator/PLAN.md | wc -c` at the base of batch 11 (`83b1cae78`: 329,694) and the landings (`f9d3ec826`: 346,564; `32b88cd3b`: 389,197; `738904f9a`: 442,362) and `HEAD` (464,142); the same for FACTS (256,777; 265,785; 279,899; 293,783) and INDEX (159,997; 159,997; 164,115; 173,047), with the ledger's growth of its commits from `record-growth/README.md:19` (about 19K a landing).
- **The model**: every agent of batches 8, 10, 11 and 13 ran on the same Opus model (the `model` field of their transcripts), so the tier is not a confound.
