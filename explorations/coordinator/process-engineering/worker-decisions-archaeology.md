<!-- What a rung or probe worker was told to do when a design question came up and what workers actually did, found in the batch script, its manual, the batch 10 record, the reviews and two chains from a flagged conflict to a decision; read-only archaeology of 2026-10-07 for the coordinating session, which will draft the standard procedure for workers from it. -->

# Worker decisions: what workers were told, and what they did

Reader: the coordinating session. It will draft a standard procedure for the `fortress-repo` skill. This note proposes no wording.

## Scope and method

- Read-only. Main at `dbefd39a5`.
- Part A reads the batch script at its batch 10 splice (`9c9e823d5`, 2026-10-03; unchanged since), the script as batch 7 ran it (`ff1649cea`, 2026-09-27), the manual, `CLIMB-BATCH-10.md` and `facts-extract.sh --help`.
- Part B starts from the reviews, then opens the reports (`REPORT.md`, `SKEPTIC.md`, `JUDGE.md`) they cite.
- Transcripts opened: batch 10's rung W and rung C workers (their tool calls only) and batch 8's rung Q worker (the time of one probe). Nothing else.
- The record calls the curator Pavol. Quotes keep that.
- Part E (added at the coordinator's request) is about where a worker searches first when it meets an open question. It reads `reviews/worker-context-cost.md`, the map and INDEX counts of the batch reviews, and a count I made over batch 10's 21 transcripts.
- The five situations are numbered as in the brief:
  1. Implementing a decision on record.
  2. New evidence that contradicts a decision on record.
  3. Two sources in conflict, no decision settles it.
  4. A small choice the record does not settle.
  5. More evidence needed before acting.

## A. How a rung worker's instructions were assembled

### A1. Batch 10: the prompt, and the order of reading

The prompt is three parts joined: `PREFIX + rungRole(rung) + rung.tail` (`climb-batch-workflow.js:2494`).

1. The shared prefix (`:893-1060`), the same bytes for every agent. In order:
   - the batch intro and manifest;
   - "Your worktree" and its seed command (`:906-915`);
   - "After an edit", "The old code beside the new", "Long commands";
   - "Your briefing - read it before you search the tree" (`:983-985`);
   - the territory map (`:987-996`);
   - "Four rules every batch enforces" (`:998-1008`);
   - the three homes of a defect (`:1010-1018`);
   - "Register" (`:1020-1022`);
   - "What you write, and what you must not touch" (`:1024-1039`).
2. The rung role, "Your role: rung worker" (`:1101-1147`). Step 1 is the briefing command (`:1112`; text of `briefingStep` at `:850`). Then: the test first and seen failing, the edit, the build, the rerun, a grep for competing declarations, the ladder subset, the three homes (step 9), the provenance block (step 10), ledger rows (step 11), the report.
3. The tail: the rung's section of `CLIMB-BATCH-10.md`, word for word. It says of itself: "It is the whole of what the record asks of this rung, so you need not open the record" (`:127`; the record says the same at `CLIMB-BATCH-10.md:84`). It opens with the answers line (`:129`) and ends with the briefing entry by entry (`:170-219`).

What the prefix says about the record: "Read the record's sections 1 and 2 only where your brief points you there, and never the whole file." (`:896`).

What a worker did first. Rung W's first calls in the transcript (`wf_d5ec6194-bcc/agent-ac7f17fcef729d710.jsonl`):
- 07:18:51 to 07:19:08: the worktree checks, the seed command, the first push.
- 07:19:22 to 07:19:42: the briefing, printed in five parts and read.
- Then the tests.

The order a worker is told to read in, as the prompt gives it:
1. Make the worktree "before its step 1" (`:910`).
2. Step 1, "Before anything else": run the briefing command and read all it prints (`:850`).
3. The record only where the brief points: "sections 1 and 2 only where your brief points you there, and never the whole file" (`:896`). The tail makes this rare (`:127`).
4. For a topic the briefing does not cover: INDEX.md, FACTS.md, POSITIONS.md, the ledger and the maps, "before the tree" (`:854`).
5. The tree: the precedent search and "where does this fix belong" (`:1000`, `:1002`), then the test.

The skill and its parts are not in that order, because they were not in the prompt:
- `grep -i skill` over `climb-batch-workflow.js` and `climb-batch-workflow.md` finds nothing.
- `fortress-repo` was created on 2026-10-04 (`70736a81d`), the day after batch 10's splice.
- `coordinator/references/delegation.md:33` says every brief tells the worker to load `fortress-repo`. The script has no such line.
- `CLAUDE.md` at batch 10's base (`9c9e823d5`) told a session to read `explorations/protocol.md` at session start. The tool calls of rung W and rung C hold no read of it. I did not check what the harness puts in a worker's system prompt; the transcripts show no read of what `CLAUDE.md` names.
- So a batch 10 worker knew what to do about a design question from the prefix, the role, the tail and the briefing, and from nothing else.

The mission briefing. It is one `facts-extract.sh` command per rung, whose keys the planner lists (`:90-94`, "in reading order, decisions first"). The order inside a rung's list (rung W's, `:171-219`):
- `positions:` entries first (the curator's decisions, 14 of them);
- then `ledger:` rows;
- then `doc:` notes (PLAN, a decision record, specification sections, a paper extract);
- then `code:` declarations (the precedents and the sites);
- then FACTS entries by bold title;
- last a `map:` section.

Each entry has one line saying what it is for. Examples:
- "positions:Conversions never change which declaration runs: No change of yours may alter which declaration runs for a set walk loads today." (`:176`)
- "ledger:585: String's four symbolic families, item 38, Pavol's: leave their shape; a refusal of them at load is a stop, not a library edit." (`:189`)
- "ledger:592: Decision D3, a departure kept and listed for Pavol; your repairs leave it as it is." (`:194`)

The curator's own words on the briefing (`POSITIONS.md:99`): it is in neutral words ("the decisions on record"), and it sets the worker "no required questions about its search": the briefing says "this is not a Java, this is not a Scala", and then the worker "should focus on its tasks". The script's prose still names Pavol (`:985`, `:680`, `:1145`).

### A2. What changed since batch 7

- Who had a briefing. Batch 7 had briefings for rungs H, A and B only. Rungs S, C, W and L carried a `facts` field "data the script does not read", and their step 1 said "This rung has no briefing" (batch 7's script, `:92-96`, `:805-807`). From batch 7b (`811053f15`, 2026-09-29) every rung has one.
- "Read first". Batch 7's tails opened with a hand-written paragraph: "**Read first.** Most of the knowledge base is not this rung's. explorations/coordinator/FACTS.md, the entries ...; explorations/coordinator/INDEX.md, the notes ..." (batch 7's script, `:135`). Batch 10's tails have none. `CLIMB-BATCH-10.md` has no "Read first" line either. Since 2026-09-28 (`b797d8037`, `bce66f1fa`) each briefing key carries its one-line reason: "Each line names an entry, then says why it is there and what you do with it; read the line before the entry and act on it." (`:170`).
- Stops. Batch 7: "A stop that a rung meets and that is not lifted holds the commit stage's push" (batch 7's script, `:630`). Batch 10: "a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it." (`:682`). The curator's ruling is of 2026-09-27 (`POSITIONS.md:101`; `POSITIONS-history.md:738`). The script took it at batch 8's splice (`493b4076f`, 2026-10-02).
- The skeptic's check 12 (decisions on record). Batch 7: "a landed text that contradicts a decision is a ground to refuse" (`:1069`). Batch 10 adds: "but for a departure the batch record reserves as a reversible stop, which goes in stopsMet" (`:1266`), and the refusal rule at `:1268`. Added on 2026-10-03 (`2360baf6c`) after batch 9's review, finding 1 (`reviews/batch-9-review.md:86-92`: rung W was refused for three departures, 0.73M, where a required correction would have cost about 0.2M).
- A mismatch the decisions do not settle, at the gather. Batches 7, 7R, 7C and N told the gather to report it "to the review as blocking" (manual `:181`). Since `3c36c7ba1` (2026-09-29) the gather files it: the text stands, a ledger row, a gated `XXX` test on the path that departs, the row named in the text's Appendix I entry, and an item for Pavol (`:1647`).
- Home 3 (the specification is silent). Batch 7: a probe file under `probes/`. Batch 10: a plain test that pins today's behaviour, and a ledger row (`:1018`).
- How to cite. Batch 7: a POSITIONS decision "by its date and entry name" (batch 7's script, `:636`). Batch 10: "by its bold title" (`:689`).
- Unchanged since batch 1 (`cb242a2d8`, 2026-09-19, found by pickaxe): rule 4 on a silent specification (`:1006`), the Register line on decisions (`:1022`), "Do NOT edit ... POSITIONS.md" (`:1033`), and the `forPavol` field.

### A3. Workers outside the batch script

Probe workers and clean workers are not briefed by the script. The coordinator briefs them by hand under `coordinator/references/delegation.md:24-33` and `protocol.md` principles 2 and 5. What those texts tell such a worker:
- A brief "names its reader and its question, and states the problem, never the expected answer"; it "points at the research and documents on file instead of restating them"; it hands over measurements "as findings to cite" (`delegation.md:26-28`).
- On a design fork the worker "reads its question first, lists every way the language and the library offer, answers a rule that blocks an option with how the library gets around it, and measures only where no record answers" (`delegation.md:29`; `protocol.md:75-77`: "a worker that has not read our notes lists every way the language offers before a fork reaches him").
- A clean worker reads the record itself, unlike a rung worker. The header of `reviews/comprises-type-level-ways.md` (`:1`): "Read: CLAUDE.md, protocol.md, POSITIONS.md whole, the two FACTS entries on `comprises`, ledger rows 487-492 ...". Its result is "no recommendation but its reading, marked".
- A probe inside a batch record gets its instruction in the record. Batch N's probe Q: "What it changes: Q's expected outputs, ... and any real choice, which goes to Pavol before run 2 launches." (`CLIMB-BATCH-N.md:454`). The probe's own header says: "It measures; the forks it meets are in section 9, not decided." (`compile-ladder/plan-n/probe-q/PROBE-Q.md:1`).

### A4. The lines in the batch script, situation by situation

Situation 1, implementing a decision on record.

- The briefing exists for it: "the agents of the early climbs went wrong on decisions made locally, where what they missed was on record: a decision of Pavol's in explorations/coordinator/POSITIONS.md, a row of the gap ledger ..." (`:985`).
- Step 1: "the decisions on record and earlier rulings, the facts established so far ... Learn from it how Fortress does things, then do the rung: design in the library's own way, with the ledger and the decisions on record in mind." (`:850`).
- Each tail has a paragraph "The decisions" that names the entries by title (rung W's, `:140`: "The specification stays the standard (POSITIONS): walk refuses at load what the overloading chapter refuses ...").
- The skeptic checks it after: "check that the landed text says what the decision says, in its scope and its words" (`:1266`).
- No line: nothing in the prefix, the role, the tails or the manual tells a worker not to reopen, re-argue or re-ask a decision on record. A grep for reopen, re-ask, relitigate, closed decision and settled question over the script and the manual finds nothing.

Situation 2, new evidence against a decision.

- The planner handles it before the launch, per rung. Rung W's answers line: "if that way would reverse a decision of Pavol's, that part waits and this line says so" (`:129`).
- A reserved stop is the tail's way to name a decision that must not be departed from. Rung W's: "A parameter nothing fixes bound to anything but its declared bound; the F-bounded case changed without P1's answer" (`:162`).
- A worker that meets a reserved stop does not stop: "finishes as its section says, lists it in stopsMet ... and lands" (`:682`). The result field: "every stop the batch record's intro reserves for Pavol that was met, including one met on part of the work while the rest lands" (`:1516`); in batch 7 a stop without `liftedBy` held the push (batch 7's script, `:630`).
- `forPavol`: "a decision taken here on a question that was his, a fork with its candidates and costs, a defect or divergence that lands unrepaired and needs his word" (`:1145`).
- The skeptic: a landed text that contradicts a decision is a ground to refuse, except a departure the record reserves as a reversible stop (`:1266`, `:1268`).
- No line: nothing says what counts as new evidence, whether a worker builds the departure or holds it when the record reserved no stop, or what form the evidence takes.

Situation 3, two sources in conflict, no decision settles it.

- Rule 3: "The specification's prose chapters are the standard; the api renderings are not." (`:1004`).
- Rule 4, for walk against the compiled path: "When walk and the compiled run disagree, that is a question and the specification answers it." If the specification is silent: "A silent specification is NOT a reason to stop - it is the reason to think harder: review the architecture around the construct, derive the candidate behaviours with what each costs and what else it touches, decide holistically which is right for the language, execute that one, and record the decision in your report" (`:1006`).
- The fourth case: the specification settles it but the repair is outside the rung: "the rung lands and opens a verified ledger row" (`:1008`).
- The provenance block asks for `spec:` and `deviation:` lines (`:1139`). The result has a field `divergences`: "each walk-vs-compiled divergence found, with which side the specification favours" (`:1537`).
- The gather, for a text against another rung's code: a mismatch the decisions settle is fixed on the side they settle; one they do not settle is "not blocking", lands, and goes to the curator through the ledger row, the `XXX` test, the Appendix I entry and `forPavol` (`:1647`; manual `:181`).
- A judge on a stop: "genuinely one of the reserved forks that reach Pavol ... or a silent specification that rule 4 says to think harder about" (`:1401`). And: "If you take a decision under a silent specification, say that you did and what the alternatives were: it is reported to Pavol out of the loop." (`:1428`).
- Per rung, the record can say it in advance. Batch 7C's rung X: "A passage of the list whose new text neither the decision nor Y's section settles: the rung reports it and does not choose." (`CLIMB-BATCH-7C.md:160`).
- The later-word entry reaches a worker only where the planner has applied it to one named conflict. Batch 10's rung C: "Where the text names a type the library does not declare, the implementers' code weighs (POSITIONS, 'The type group's late positions outweigh the early text'): the varargs parameter is the team's ImmutableArray[\T, ZZ32\], and the text keeps HeapSequence with a callout." (`:244`); and its briefing line: "their later word weighs; the text gets a callout, not a rewrite." (`:276`). The record offered that reading to the curator as a default he could change by one word ("Read from the record, not asked", `CLIMB-BATCH-10.md:24-25`).
- No line: no line says in general that a later paper, a later implementation or a later text outweighs an earlier one; the script's standard is the specification (`:1004`, `:1006`, `:140`). No line covers a conflict between two sources neither of which is walk or the compiled path (a paper against the library, the library against the checker), except where a tail names it.

Situation 4, a small choice the record does not settle.

- "Every choice a rung makes that its section leaves to it is reported as a decision, with the alternatives considered and the evidence that settled it." (`:684`).
- "If you make a decision, say in your report that it was a decision and what the alternatives were: a decision buried in a report is a decision not made." (`:1022`).
- The result field `decisions`: "decisions taken inside the rung, each with the alternative rejected" (`:1539`).
- The record sorts the rung's choices before the launch. `CLIMB-BATCH-10.md:272-293` has five headings: "Decided on record", "Read from the record and flagged", "Open for Pavol", "Open for a probe and a top-tier judgement before the launch", and "The rungs' own choices, reported as decisions, each with the alternatives considered and the evidence that settled it". The last is the worker's own territory (`CLIMB-BATCH-10.md:282`: "W: where the Meet Rule check for functional methods runs at load and how it reads a covering set; ...").
- The skeptic's scope: "a decision the rung took on a question that was his" goes to `forPavol` (`:1290`).
- No line: no line says how to tell a choice that is the worker's from a "question that was his". The only boundary is the planner's per-rung list.

Situation 5, more evidence needed.

- Briefing: "Where the rung takes you past what the briefing covers, look in the same places before you choose." (`:850`); "For a topic the briefing does not cover, search INDEX.md ... before the tree" (`:854`).
- Rule 1 "Where does this fix belong", answered before any edit (`:1000`). Rule 2, the precedent search: "has the team solved this here already, and in how many ways" (`:1002`).
- The tail's "What the tree already does. Evidence, not the brief; list every way before you choose." (rung W's, `:142`).
- No re-measuring of what the record holds: "A rung that measures the checker count or the distance stage takes as its before the last landed gate's table" (`:677`).
- If the evidence cannot be had inside the rung, the only worker-side route is `stopped` and `stopReason` (`:1529-1530`), which sends it to a judge on a stop (`:1401`). The prompt does not say when to stop. The "standing" stops (`:680-681`) are never listed for a worker; the nearest list is in the judge's prompt (`:1401`).
- A fork that needs research before the curator can rule is handled outside the worker, before the launch: the record's heading "Open for a probe and a top-tier judgement before the launch" (`CLIMB-BATCH-10.md:280`, P1).

## B. What workers did

Ten cases, grouped by the four behaviours the brief names. Each gives the situation it shows.

### Relitigating, or contradicting, a decision on record

1. Rung T, batch 6 (answer 8). Situations 1 and 3.
   - The brief quoted answer 8. The worker wrote the narrower rule the interpreter's representation gives. Its skeptic argued for keeping it. The judge ruled from POSITIONS: the skeptic's reading "makes the interpreter's representation the standard, against rule 4 of the brief" (`compile-ladder/rung-spec-numbers/JUDGE.md:57-66`).
   - Source: `reviews/worker-global-decisions.md:222-226`. The same review counts five cases of a decision contradicted, twice with the decision in the brief (`:9`, `:214-250`).
2. The same question asked again, three batches running (6.5, N, 6.5b). Situation 1.
   - Batch 6.5: the gather wrote item 30 as "No default on record" after the curator's 19:06 decision had settled it (committed at 19:07, in the plan the gather read). He caught it at 19:54, after the clean list (0.40M) and the top-tier judgement (0.30M) had started (`reviews/batch-6.5-review.md:243-246`).
   - Batch N: item 33's second half was filed with "No default is on record for these", where decision 2 and the specification give one: "This is batch 6.5's item 88 again." (`reviews/batch-N-review.md:174-177`).
   - Batch 6.5b: rung V's point for the curator on row 528 offered a prelude declaration as one of two ways, with "no default on record", against the library-route decision of 2026-09-21. Its skeptic, the gather, both reviews and both judges passed it. The review: "the third batch running in which an item says 'no default on record' where the record gives one" (`reviews/batch-6.5b-review.md:229-233`, `:372`).
   - What the cases show: the decision was in the record and in the briefing; it was not applied when the question was written.
3. The same rejected argument, twice in two days (batches 6b, 7R). Situation 1.
   - A judge rejected "the prelude leaves at the switch-over" as a reason to leave a settled defect without its test. The next day another skeptic and the gather used it again. The ruling sat in a `JUDGE-review.md` that no briefing carried (`reviews/process-review-6b-7-7R.md:89`, `:107`, `:180-186`).

### Deciding alone what should have reached the curator

4. The forks of batches 1 and 2 (Opus 5 era). Situation 4, wrongly.
   - `floor` and `ceiling` returning a float, the specification's non-parametric `Nothing`, masked shift counts, and `narrow` throwing where the team's own boundary test asserts truncation. Each was named in a rung's record and approved by its skeptic. Each reached the curator only through the docket of 2026-09-20. He reversed each (`reviews/worker-global-decisions.md:198-208`).
   - The measure that followed: forks are probed and decided before the batch is briefed (`POSITIONS.md:97`, "never a decision left to a worker and reviewed after the fact"), and "A decision made inside a worker's report and recorded in one line is a decision not made; flag it to him at the time" (`POSITIONS.md:127`).
5. Rung S's where-clause sentence, batch 5. Situation 4, not seen as a choice.
   - The landed sentence forbids the gate the curator set for row 331. The skeptic, the judge and the merged-diff review did not see it as a choice. Only the later conformance review did (`reviews/worker-global-decisions.md:227-232`).

### Flagging an unsettled conflict

6. Rung Q, batch 8: R9, `NN32` into `RR64`. Situations 2 and 3.
   - The worker added `coerce(x: NN32)` to a copy of the library and probed both paths about 8 to 12 minutes after its first call (transcript `wf_603242ca-111/agent-a56223983843b6350.jsonl`, 13:03 to 13:07; first call 12:55). It found every operator both `RR64` and `ZZ64` declare ambiguous for an `NN32` with a `ZZ32`.
   - Its report: "Pavol's two decisions cannot both hold under the coercion rule as written; the choice is his. Candidates and costs:" four candidates with costs, and "R9 not built ... This rung's state." (`rung-numeral-library/REPORT.md:146-162`). The skeptic confirmed it on its own copy of the library.
   - It landed without R9. The batch 8 review: "Returning it as a fork rather than choosing is what POSITIONS asks", and "The conflict was knowable before the batch ... The record wrote R9 as 'One api line, one body line, a test' and ran no probe." (`reviews/batch-8-review.md:203-204`).
   - Route: `PLAN.md:234` (item 37, default "not built"). Not yet decided.
7. Rung W, batch 10: what a type provides (decision W2). Situation 3.
   - The traits chapter and the compiled checker read "provides" differently. The worker's first build followed the checker and refused the team's `tests/disp0.fss` at load. It chose the chapter's reading.
   - Its decision record gives the form: "Chosen", "Considered" (with the build that failed), "Consequence: the compiled checker refuses `disp0`, so walk and the checker now differ there and the text favours walk. Row 610." (`rung-walk-meet/decision-record.md:29-34`). The report lists it under "For Pavol" with the checker repair owed (`rung-walk-meet/REPORT.md:269-296`, items 2 and 5). The gather placed the compiled `XXX` test (`rung-walk-meet/REPORT.md:289`); the review lists W2 among W's decisions (`reviews/batch-10-review.md:195`).
   - A related miss: W's stop met on part of its work (a bound that mentions another parameter keeps `BottomType`) was in its report and in the review's `stopsMet`, and not on the curator's list (`reviews/batch-10-review.md:311`).
8. The judge of rung N, batch 10: a tension inside the record. Situations 2 and 3.
   - The record's stop (`CLIMB-BATCH-10.md:244`) and its own directions (`:230`, `:232`) pull apart for three walk value changes. The judge kept the repairs: "This is the judge's decision on a tension inside the record, and it goes to Pavol." (`rung-number-order-slips/JUDGE.md:25-36`). It lists its other choices as "DECISIONS TAKEN HERE (reported to Pavol)", each with the alternatives, e.g. `shouldRaise` with "No section of Specification/ defines shouldRaise" (`:47`).

### New evidence against a decision on record

9. Rung A, batch 7 (answer 10's placement), and rung W, batch 9 (decision D3). Situation 2, built and flagged.
   - A: answer 10 says to redeclare `fill` in the four leaf traits. The worker measured that the leaf placement leaves the diamond's own check refusing both methods, and put the declarations at the meet. It named it in the provenance block (`rung-tabulate/REPORT.md:6`, "deviation:") and as decision D1. The skeptic: "The landed text follows the decision's measured content, and departs from its placement words. The worker flagged it (D1). It is his to confirm, and it is in `forPavol`." (`rung-tabulate/SKEPTIC.md:142-144`). Landed; a parked PLAN line for him to confirm (`reviews/process-review-6b-7-7R.md:102`).
   - W (batch 9): the instance rule says a parameter nothing fixes takes its bound, "never the value's type alone". D3 keeps the arguments' type for a parameter that only a bound of a fixed parameter mentions, because `CovariantCollection`'s `APPCOV` would otherwise build its result at `Any` and `booleanGuard` and `RangePrototype` fail (`rung-walk-instance/decision-record.md:53`; ledger row 592). The worker reported D3 and listed it. The skeptic refused because the three departures had no home and no sentence in the boxes; the review says the findings were right and none needed code, and that the script made a refusal of what a required correction would have settled (`reviews/batch-9-review.md:86-92`). Batch 10's briefing carries it: "a departure kept and listed for Pavol" (`:194`).
10. Probe Q, the numeral switch (batch N, 2026-09-29). Situation 2, a probe worker.
    - The decision (2026-09-27): a numeral gets a type of its own, "walk needs to be corrected and switched to using IntLiteral" (`POSITIONS.md:66`). Probe Q measured the switch under walk first: "80 outputs and 59 verdicts change" (`compile-ladder/plan-n/probe-q/PROBE-Q.md:12`).
    - Its brief said a real choice goes to the curator (A3); the probe reported its fork in section 9 and decided nothing (`PROBE-Q.md:97`). It did not argue against the decision. The top-tier judgement: "The decision itself is not in question. What is in question is how walk is brought to it, and when." (`reviews/numeral-switch-judgement.md:9`); "nothing in probe Q argues against the decision. What it shows is where walk cannot follow it yet." (`:50`).
    - Ruling: "the split option three makes most sense. So, yes to that" (`POSITIONS-history.md:813`).

Also seen (not counted above):
- Rung H, batch 7: the worker and the skeptic called typecase's binding form settled, against a conflict between the section's revision note and the implementers' grammar that two POSITIONS entries settle toward the implementers, one of them in H's briefing. The merged-diff review missed it too; the review's judge caught it (`reviews/process-review-6b-7-7R.md:100`, `:172`).
- Rung U, batch 7R: put its `nat` question to the curator without his decision of 2026-09-27 on a size's range, which its briefing printed (`:109`).
- Rung C, batch 10: the planner had settled a specification-against-code conflict toward the team's code (the varargs type is `ImmutableArray`, not the text's `HeapSequence`; "Read from the record, not asked", `CLIMB-BATCH-10.md:24-25`), and the compiler's library declares no `ImmutableArray`. The worker met the wall on its first test run on the edit; the judge moved the refusal; the compiled path now refuses every varargs use until the switch-over, listed (`reviews/batch-10-review.md:144-150`, `:302`).
- The opposite failure: rung C's stop (batch 4) and rung D's stop (batch 5) put output noise to the curator. He said rung D's "didn't need to be raised up to me" (`POSITIONS-history.md:320`; `reviews/worker-global-decisions.md:273`).

What the cases show together:
- Workers that found a conflict and marked it (cases 6, 7 and 9, and rung X in chain 1) did not stop the batch. They built the part the record settled, left the rest, and wrote the evidence in the report, a ledger row and `forPavol`.
- The failures were at the two ends of the chain: a decision in hand not applied when the question was written (1, 2, 3), and a choice not seen as a choice (4, 5). The review of batches 6b to 7R counted 5 of 17 local misses as items printed in the rung's own briefing (`reviews/process-review-6b-7-7R.md:11`).
- The route after the mark was lossy more than once: a stop missing from the list (7), items that never reached PLAN before the routing step (`reviews/process-review-6b-7-7R.md:132-143`), a parked line with the wrong default (2).

## C. From a flagged conflict to a decision, and back into a brief

### Chain 1: PLAN item 26, row 491 (the `comprises` passages)

1. The instruction. Batch 7C's record gave rung X a stop that names the form: "A passage of the list whose new text neither the decision nor Y's section settles: the rung reports it and does not choose." (`CLIMB-BATCH-7C.md:160`).
2. The worker's report. Rung X (a specification rung) edited the traits chapter to the 2012 reading of `comprises`, and found four other passages that read a clause at the level of types and no longer follow. Its report: "**Left and reported, not chosen (P1 to P4)**" (`compile-ladder/rung-spec-comprises/REPORT.md:57`). Its decision record: "The four the decision does not settle are reported and not chosen ... they go to Pavol." with the candidates (`decision-record.md:30-40`). Its skeptic ended with "14. For Pavol" (`SKEPTIC.md:145-149`). The ledger row: 491, "found by: ours (climb batch 7C, rung X, 2026-09-28)" (`fortress-gap-ledger.md` row 491).
3. The queue. PLAN item 26: "No default on record; neither the rung nor its skeptic recommends a way." (`PLAN.md:198`). The post-batch review moved it from "before batch 8" to "before batch 7b", since rung S rewrites the chapter that holds the Meet Rule's example (`reviews/batch-7C-review.md:97-100`). `review-queue.md` was built later (2026-10-02); it mentions this item only as decided (`review-queue.md:315`).
4. The research.
   - A clean worker's nine steps, 2026-09-28, no recommendation but its reading, marked: `reviews/comprises-type-level-ways.md`. The fixed order of its sections: 1 the mathematics, 2 what each path does today (measured), 3 what the specification says under every spelling, 4 what the library does in the same family, 5 where the designers departed from Java, 6 what the peers do, 7 what the commits say, 8 the ways (six), 9 the derivation and its reading. It opens with a "For Pavol" section.
   - A top-tier (Fable) judgement on that note, same day, recommending option 1: `reviews/comprises-type-level-judgement.md` (its "For Pavol" at `:133`).
   - Later, at the curator's request, a separate analysis session's proof addendum: `reviews/comprises-type-level-proof-addendum.md`. He had said he was "super scared that we are touching type theoretical things that I am totally unequipped to handle".
5. The ruling. 2026-09-29, 11:25 UTC: "Yes" to option 1, with the addendum's three points built into batch 7b's briefs (`POSITIONS-history.md:408`; the earlier ask and his "Carry on overnight ... take the Fable's recommendation" at `:382`).
6. The position. `POSITIONS.md:50`, "The `comprises` passages read at the level of values (PLAN item 26, row 491)". It records the boundary the addendum drew, and lists two rows (543, 551) as open and listed for review.
7. The next briefs.
   - Batch 7b's record: "Item 26, decided: ..." (`CLIMB-BATCH-7.md:69`, `:155`, `:190`). Its rungs' briefing keys include `doc:explorations/reviews/comprises-type-level-judgement.md#4. The recommendation` and `#5. The specification change, in the S1 form` (batch 7b's script, `811053f15:climb-batch-workflow.js:221-223`).
   - Batch 10: section 2 of the record (`CLIMB-BATCH-10.md:64`), rung W's decisions paragraph (`climb-batch-workflow.js:140`) and its briefing line "The Meet Rule's covering declarations and its closed-trait case: a set that covers the meet satisfies it, and your check must accept it." (`:173`).

Time from the worker's mark to the ruling: about one day (2026-09-28 to 2026-09-29). The ruling came before the batch that would have repeated the question.

### Chain 2: row 484, `MIN` and `MAX` per integer type

1. The worker's report. Rung U (batch 7R) met `b MAX 1` for a `ZZ64` `b` refused by walk. The specification does not settle the call, so home 3: a probe and a row (`compile-ladder/rung-spec-ranges/REPORT.md:47`, `:75`, `:106`). Ledger row 484, "found by: ours (climb batch 7R, rung U, 2026-09-28)" (`fortress-gap-ledger.md` row 484).
2. The queue. PLAN item 24, asked as "Question B" (`reviews/before-n-questions.md:35`).
3. The research. Probe K's item 9 (question A) was widened by the curator's request for one global rule on conversions and overloading; the judgement covers row 484 as its decision 2. A clean worker's nine steps (`reviews/conversion-overloading-ways.md`), then the top-tier judgement (`reviews/conversion-overloading-judgement.md`, decision 2 at `:75`).
4. The ruling. 2026-09-28, 19:06 UTC: "Both recommendations for batch N accepted." Decision 2: each integer type declares its own `MIN`, `MAX` and `MINMAX` (`POSITIONS-history.md:779`).
5. The position. `POSITIONS.md:46`, "Each integer type declares its own `MIN`, `MAX` and `MINMAX`". The companion, `POSITIONS.md:45`, "Conversions never change which declaration runs".
6. The next brief. Batch N's record added a fifth rung for it: "the library rung your decision on row 484 added" (`CLIMB-BATCH-N.md:11`, `:15`). Built as fifteen declarations; ledger row 484 closed in place (`fortress-gap-ledger.md` row 484). A later row of the same shape became PLAN item 33 (`PLAN.md:214`).

### Chain 3, short: the numeral switch (probe Q)

Probe Q's evidence (Part B, case 10) went to a top-tier judgement (`reviews/numeral-switch-judgement.md`), the curator's "yes to that" (`POSITIONS-history.md:813`), `POSITIONS.md:66`, and batch 8's rung Q, whose first briefing command carries `positions:The numeral switch ...` (transcript `wf_603242ca-111/agent-a56223983843b6350.jsonl`, 12:55:56).

### An open chain: R9

Part B case 6 stops at `PLAN.md:234`. No ruling yet. This shows the middle of the chain: the worker's mark reaches PLAN with a default ("not built") and waits for the curator's turn.

## D. What the current skills say

Skills read: `.claude/skills/fortress-repo/SKILL.md` and `references/records.md`, `specification.md`, `library.md`, `tests-writing.md`; `.claude/skills/coordinator/references/delegation.md` and `decisions.md`; `explorations/protocol.md`.

### Situation 1, implementing a decision on record

- Says: "`POSITIONS.md`: what the curator has decided and already knows. Do not reopen a closed decision." (`records.md:20`). Five library decisions are listed under "These points are decisions on record. Do not reopen them" (`library.md:18-24`). "Before you choose, search the decisions on record" (`library.md:15`). The tool: `$T 'positions:WORDS OF A TITLE'` (`records.md:11`). "A closed decision is not reopened or re-asked" (`decisions.md:38`, the coordinator's side); "Closed decisions are not revisited and settled questions are not re-asked" (`protocol.md:112-113`).
- Agrees with practice: the intent of the briefing; cases 1 to 3 show the lapse the rule targets.
- Differs from practice: the batch script has no such line (A4). The skill is where "do not reopen" first reaches a worker.
- Silent: the skill does not say the decisions come first, or that a rung's brief lists them.

### Situation 2, new evidence against a decision

- Says: "If a step cannot be undone, or would reverse a decision on record, do not take it. Put it in your report as a decision not taken, with its alternatives." and "Then finish the work." (`records.md:65-66`). "Put a question for the curator in it as a decision not taken" (`SKILL.md:44`); "Questions for the curator" (`records.md:77`). "A decision made inside a worker's report is not made until he has seen it" (`protocol.md:105`).
- Agrees with practice: case 6 (R9: not built, fork, finish).
- Differs from practice: case 9, D3 (the worker built a reversible departure and listed it) and the script's reversible stops (`:682`: "finishes as its section says ... and lands"). The skill says "do not take it" for a step that would reverse a decision; the batch lands a departure the record reserved as a reversible stop. The two apply to different things, and the skill does not say which.
- Silent: what counts as new evidence; the form of the evidence (R9's: both paths measured, a skeptic's confirmation, candidates with costs, a default); that a departure the record did not reserve can be a refusal ground for the skeptic.
- In tension: "Do not reopen a closed decision" (`records.md:20`) has no exception for new evidence. `decisions.md:25` holds work for "a default that would reverse a decision of the curator's", which is about a batch record's default, not a worker's finding.

### Situation 3, two sources in conflict

- `SKILL.md:38`: "If the team's own sources disagree, follow the later one. The team learned as it built, so a later paper, implementation or text outweighs an earlier one, the specification included. Revise the specification to match the later word, in the revision form".
- `specification.md:3`: the specification "says what the language means, except where a later source of the team's says otherwise". `specification.md:9`: "The type group ... Their late positions outweigh the early text." (five named positions).
- `specification.md:40-47`, "When the text and an implementation disagree": "If the decisions on record settle it, fix the side that they settle. If they do not settle it: Leave the text as it is. Write a ledger row ... Write a gated `XXX` test ... name the row among the departures". `library.md:16` sends a library-against-specification conflict there. `tests-writing.md:72-73` homes by "the specification settles it" and "the specification is silent".
- `protocol.md:60-63`: "where they conflict, the type group's later, implementation-informed word weighs more". `POSITIONS.md:25`: "The specification stays the standard, the Types chapter beside it". `POSITIONS.md:26`: "The type group's late positions outweigh the early text".
- `records.md:75`: "If the record holds no position, do not invent one: say which reading you acted on."
- Agrees with practice: `specification.md:40-47` is the gather's rule (`:1647`) and chain 1's route (X reported and did not choose; the ruling came from the curator); case 7 (W2) follows it in spirit.
- Contradicts practice and itself: `SKILL.md:38` against `specification.md:42-47`, against rule 3 and rule 4 of the script (`:1004`, `:1006`), and against `POSITIONS.md:25`. In the batch tails the standard is "The specification stays the standard (POSITIONS)" (rung W's `:140`, rung C's `:244`). The later word was applied by the planner to named conflicts and offered to the curator as a default (rung C's varargs type, above), or by the curator's own ruling after research (the exclusion rule, the flat tower, `comprises`: `POSITIONS.md:26`, `:42`, `:50`). The cases where a worker followed one source over another alone (rung H, "also seen"; rung T, case 1) were corrected. I found no batch tail that left the choice of the later source to the worker.
- Contradicts itself in a second way: `specification.md:32` allows an Appendix I entry to give "its own reason" in place of a decision on record; the batch tails make "Normative text beyond the passages named" a stop (rung W's, `:162`).
- Silent: a conflict that is not specification against implementation (a paper against the library; the library against the checker; two papers). `SKILL.md:38` is the only line, and it is the one to be replaced. Silent on the route to the curator: where the conflict is written (report, ledger row, `forPavol`), who researches it, how it comes back. Silent on a worker's own choice meanwhile: the script says "decide holistically ... execute that one" for a silent specification (`:1006`); `records.md:75` says "say which reading you acted on".

### Situation 4, a small choice

- Says: report "Each choice that you made among alternatives, as a decision apart from the findings: what you chose, the alternatives, and the evidence, cited. ... A decision left as a line inside the findings counts as not made." (`records.md:75`).
- Coordinator side: a decision is consequential when it reverses or bends a decision on record, changes a model line, touches two of specification, library and implementation, opens a fork, or cannot be undone (`decisions.md:11-17`). The rest is "listed for later review". "A choice found inside the findings and not named as a decision is sorted as one." (`decisions.md:7`).
- Agrees with practice: the `decisions` field, the Register line (`:1022`), W's decision record (W1 to W10).
- Silent for the worker: the criteria of "consequential" are in the coordinator skill, which is "Not for workers". A worker sees no line that separates a choice that is its own from a fork that is the curator's.
- In tension: `delegation.md:9`, "A decision is never left to a worker to be reviewed after the fact" (for a fork a probe can settle), against `decisions.md:24`, "Landed, then reviewed ... A consequential decision taken inside the work that can be undone does not hold a push", and `records.md:75`, which lets the worker act on a reading. The first is about forks known in advance, the others about forks that appear in the work, but no line says so.

### Situation 5, more evidence needed

- Says: "Reproduce a behaviour before you explain it, unless your brief cites such a run." (`SKILL.md:34`); "Check every claim against a primary source" (`SKILL.md:39`); the library's own way first (`SKILL.md:37`, `library.md:13-16`); no re-run of a result already in hand (`SKILL.md:32`, `records.md:39`). For the clean worker on a design fork: lists every way, answers a blocking rule with how the library gets around it, measures only where no record answers (`delegation.md:29`). `protocol.md:78-79`: "When something goes wrong or is undecided, the answer is a deeper pass, never a halt".
- Agrees with practice: rules 1 and 2 of the script, "list every way before you choose" (`:142`), R9's two-path probe.
- Silent: what a worker does when the evidence is out of its reach (a probe the rung cannot afford, a judgement only the top tier can give). The skill has no equivalent of rule 4's procedure (derive the candidates, their costs, decide, record). The skill has no line for `stopped` and no list of the standing stops.
- Note for the design of any worker procedure: `POSITIONS.md:99` rejects "required questions about its search" and "side quests".

### Disagreements between the skills, collected

1. `SKILL.md:38` against `specification.md:42-47` and `specification.md:3, :9`, as above.
2. `SKILL.md:38` against `POSITIONS.md:25` and the script's rule 3 and rule 4.
3. `records.md:66` ("do not take it") against the script's reversible stops (`:682`) and the D3 practice.
4. `decisions.md:31`, "What reaches the curator are the forks already reserved in PLAN, not new ones invented at the point of difficulty", against the practice of chains 1 and 2 and R9, where a worker's new conflict became a PLAN item and reached him. Read as a rule for the coordinator it bars inventing forks; read for a worker's finding it would bar surfacing one.
5. `delegation.md:9` against `decisions.md:24`.
6. `delegation.md:33` (every brief names `fortress-repo`) against the batch script, which names no skill.
7. `specification.md:32` ("or its own reason") against the stops in the tails.

## E. Where workers searched when they met an open question

The question: the record first (POSITIONS, FACTS, INDEX, the ledger, by `facts-extract.sh` or grep), or straight into the original tree, the specification, the papers and git history.

### E1. What the batch text sets as a search order

- The prefix: "For a topic it does not cover, search explorations/coordinator/INDEX.md (one line per standalone note), FACTS.md, POSITIONS.md, the ledger and the relevant map below before the tree. Cite a FACTS entry by its bold title." (`climb-batch-workflow.js:985`).
- Step 1 of the worker, after the briefing: "For a topic the briefing does not cover, search [INDEX.md, FACTS.md and POSITIONS.md beside it, the gap ledger and the maps] before the tree." (`:854`; the list is `SEARCH_FIRST`, `:841`). The same line closes the skeptic's and the judges' step 1 (`:874`).
- Step 1's own words: "Where the rung takes you past what the briefing covers, look in the same places before you choose." (`:850`).
- The map: "read the parts your task needs, do not go looking", and "In 36 agents of the last climb not one of these was opened, and that is the direct cause of what the conformance review found." (`:987-989`). Rule 1 sends the worker to the map's `spec-to-implementation.md` and `modules-and-phases.md` before any edit (`:1000`).
- Rule 2, the precedent search, is a search of the tree and the library: "has the team solved this here already, and in how many ways" (`:1002`). The tail's "What the tree already does. Evidence, not the brief; list every way before you choose." (rung W's, `:142`).
- So the order the text sets is one line long: the record before the tree, for a topic the briefing does not cover. It does not order the record's files among themselves. It does not order the record against the specification, the papers or git history, except by "before the tree". The briefing itself is ordered: decisions, ledger rows, notes, code, FACTS, map (A1).
- The curator limits it: the briefing sets no "required questions about its search", no "side quests" (`POSITIONS.md:99`).

### E2. What `fortress-repo` says now

- "Read only the slice of the record that you need. Do not read the big files whole." and the tool's seven query forms (`records.md:5-15`).
- "`explorations/coordinator/INDEX.md`: one line for each standalone note. Search it before you say that anything is absent." (`records.md:21`).
- "Before you choose, search the decisions on record" (`library.md:15`); "find how the library already writes that kind of thing, and do the same" (`library.md:14`).
- "If your brief or this skill says how to do a thing, do it that way." (`records.md:40`).
- Removed on 2026-10-06 (`8a9384532`, the curator's option 1): "Before you do something in a new way, search the record for how it was done last time", because it "asked for an unbounded search an agent cannot make". The same search rule stays on the coordinator's side (`coordinator/references/delegation.md:8`; `decisions.md:38`; `coordinator/README.md:28`, "searched before any fact is called absent").
- Silent: where to look first when a topic is open (the skill gives no order among INDEX, FACTS, POSITIONS, the ledger and the tree); and whether a worker's "absent" is a claim about the record or about the tree. `records.md:21` bounds the search by its tool (`index:WORDS`, at most 10 lines), but it is the one search rule left that is not bounded to the brief.

### E3. What workers did: the counts

- Before the briefing (batches repair to 6, 78 agents): 5,094 of 9,900 tool calls "read the tree, the specification, the library, the tests or the records to learn something", a quarter of the cost (`reviews/worker-context-cost.md:7`). FACTS, INDEX and the maps were 6% of that. "The agents grep the record for a line; they do not read it." (`:10`).
- By batch, the share of agents whose gathering opened a map: 100%, 90%, 83%, 68%, 43%, 55%, 29%, 25%. FACTS: 67%, 20%, 17%, 47%, 43%, 91%, 86%, 58%. INDEX: 17%, 30%, 50%, 5%, 14%, 0%, 0%, 0% (`:84`). "The maps gave way to FACTS from batch 4 on, and INDEX went out of use."
- What the record already held: 9% of the gathering cost on eight agents read by hand; 22% was "not on record" and 38% primary text the agent had to read anyway (`:118-122`).
- After the briefing (batches 6b, 7, 7R): FACTS 17 of 17 agents, POSITIONS 16, the ledger 17, `Library/` 17, against 37, 38, 56 and 53 of 58 before; map 11 of 17 (65%); INDEX 5 of 17 (29%) against 2 of 58 (`reviews/process-review-6b-7-7R.md:56-57`). What the agents still opened directly: the batch record 52K bytes, "other records (the ledger, reports, reviews, POSITIONS)" 58K, FACTS, INDEX and the maps 5K, source 19K, the library 28K (`:60-63`).
- Later batches, INDEX opened by: 1 of 4 (6.5, through an `index:` key; `reviews/batch-6.5-review.md:177`), 0 of 4 (7C; `batch-7C-review.md:130`), 0 of 6 (6.5b; `batch-6.5b-review.md:315`), 0 of 14 (N; `batch-N-review.md:198`), none (batch 8, `batch-8-review.md:287`; batch 9, `batch-9-review.md:272`). Batches 7C, 6.5b and N give the reason: "No briefing carried an `index:` key".
- Batch 10 (my count, over the tool-call text of the 21 transcripts of `wf_d5ec6194-bcc`; a call counts if its command or path names the file): the 14 rung workers, first skeptics, repair rounds and judges ran `facts-extract.sh` (1 to 3 commands each: the briefing or its slice); the second skeptics, the gather, the review, the gate and the commit did not. `INDEX.md` is named by 1 of the 21 agents (rung G); `POSITIONS.md` by 13, 1 to 6 calls each; the ledger by 17; `Specification/`, `Papers/` or `research/` by 19 (the four rung workers 18 to 27 calls each; rung W 24); `git log`, `git show` or `git blame` by all 21. These count calls that name a path, not reads, and the git calls include a worker's own branch.
- So: after the briefing, workers have the record's decisions, ledger rows and FACTS in hand through one command, and go to the specification and the tree from there. Direct use of the record's index (INDEX, the maps) stayed rare. The ledger is the record file they open themselves.

### E4. Cases

1. The record held it and the worker went into the tree (batches 2 and 6).
   - Batch 2's rung X spent 40K ITE finding that `ant compileAll` wipes the cache, which "FACTS line 79 already said". Batch 6's rung R read `FileTests.java` in eight calls (about 100K ITE) "for rules FACTS lines 72-73 state" (`reviews/worker-context-cost.md:118`).
   - The same note's reading: it shows the agents "worked with a searchlight in a dark room", the local view that `worker-global-decisions.md` measures, which is the curator's reason for the briefing (`:14`).
2. A worker called something absent, or new, and the record held it (batches 7 and 6.5).
   - Rung B (batch 7) wrote that three variation sites were shown by no distance table before its edit, and reported a reserved stop; the tables are in `perf-probes/prelude/distance-triage/`, whose note was in its briefing. "The record not searched, partly in hand." Its skeptic withdrew it before it reached the curator (`reviews/process-review-6b-7-7R.md:91`, `:176-178`).
   - Rung H (batch 7) opened a ledger row that repeats row 407 (`:96`), and its list of ways for `AnyIntegral` left out the team's 2008 clause, which a FACTS entry in its briefing names (`:97`).
   - The batch 6.5 gather wrote item 30 as "No default on record" when the 19:06 decision was committed a minute before in the plan it read; the curator caught it (`reviews/batch-6.5-review.md:243-246`). This is the claim `records.md:21` guards, said of POSITIONS rather than INDEX.
3. A batch 10 worker at an open question (rung W, 07:46 to 07:47).
   - After its suite run refused the team's `tests/disp0.fss` at load, it ran `cat ProjectFortress/tests/disp0.fss; git log ... -- ProjectFortress/tests/disp0.fss` and then `grep -n "disp0\|override" explorations/fortress-gap-ledger.md` (transcript `wf_d5ec6194-bcc/agent-ac7f17fcef729d710.jsonl`, 07:46:42 and 07:47:29). The traits chapter's passages, which it then chose (W2), had come from its briefing.
   - It searched the tree, git history and the ledger by name, in that order, and did not query INDEX, FACTS or POSITIONS for the question.
   - The one INDEX use of the run is rung G's, at 07:02:57: `grep -n 'one file\|single file\|a probe file\|probe component' explorations/coordinator/INDEX.md`, for how to run the checker on one file, a tooling question.

## What the evidence supports

This section is my reading, not a finding.

- The practice that grew over batches 4 to 10 is already close to the curator's intent for situations 2 to 4. A worker implements what the record settles, marks what it does not (a decision with its alternatives, a ledger row, `forPavol`, `stopsMet`), keeps going, and the curator rules after research. Cases 6, 7 and 9 and chain 1 are that practice working.
- The batch script's standard for a worker is the specification. Where a later word prevailed over it, the planner had applied the curator's weighing to one named conflict and offered it to him as a default (the varargs type), or the curator had ruled first. `SKILL.md:38` is a newer rule than any batch ran under, and it matches `POSITIONS.md:26` read as a rule for workers, which the entry is not: it records how the curator weighs, in his own decisions.
- The weak points were not the marking. They were (a) a decision in the brief not applied when the question was written (cases 1 to 3), (b) a choice nobody saw as a choice (4, 5), and (c) the routes after the mark (a stop missing from his list, a parked line with the wrong default, items that stopped in a rung's files).
- Three forms worked and can be named from the cases: the stop line in a tail that says "reports it and does not choose" (X); R9's fork (measure both paths, four candidates with costs, a default that changes nothing, finish); W2's decision-record entry (Chosen, Considered, Consequence, plus a row, a test, a line in "For Pavol").
- Four things no text gives a worker today: what counts as genuinely new evidence; how to tell its own choice from the curator's fork; what to do when it cannot get the evidence in its task; and any line that says not to reopen a decision, which only the skill (not the batch script) says.
- On search (E): the text sets one order, the record before the tree for a topic the briefing does not cover. Workers do the briefing's reading and then go to the specification, the tree, git history and the ledger by grep; INDEX and the maps are opened directly by almost no one (0 of 14 in batch N, 1 of 21 agents in batch 10). The failures that matter are the claims of absence and novelty made without a search of the record (E4, case 2), more than the reading of the tree the record already held (E4, case 1).
- The chain from a mark to a ruling worked when a clean worker's list, then a top-tier judgement, then one ask was used (chains 1 and 2: about a day). It waited longest where the mark reached PLAN with a default and no one asked (R9, item 37).

## What I did not do

- I did not read `FACTS.md` or `INDEX.md` whole, and used `facts-extract.sh` queries and bounded greps.
- I did not read the transcripts of the other 19 batch 10 agents, or of batches 6 to 9, beyond the one batch 8 probe time.
- I did not check what the harness shows a workflow worker as project instructions.
- I did not verify the reviews' counts (the 5 of 17, the five contradicted decisions) against the transcripts.
- I did not look for cases in batches 1 to 3 beyond what `worker-global-decisions.md` reports.
