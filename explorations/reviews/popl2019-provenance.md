<!-- This file is the evidence record of when and why the Fortress revival found, consulted and sought the extended report of Park, Hong, Steele and Ryu, "Polymorphic Symmetric Multiple Dispatch with Variance" (PACMPL 3, POPL 2019, Article 11), written 2026-10-12 by a Sonnet archaeology worker at the coordinating session's brief, for the coordinating session and the curator, Pavol, who is about to answer Prof. Sukyoung Ryu. Evidence only: nothing here is a judgement or a recommendation. Every time is UTC, read from a transcript's `timestamp` field or from git (committer date, `%cI`, unless "author date" is said). No fresh fetch of the carrying page or of the Drive URL was made for this note: the coordinating session withdrew that part of the brief during the work, because the curator said that the inaccessibility is already established. Models are named by tier only. -->

# The POPL 2019 paper and its extended report: where the record found them, used them and lost them

## Source key

- `TB` is `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/`.
- `PARTS` is `TB/fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-10-08T15-41.jsonl.parts/`. Its files `000` to `003` are the coordinating session from 2026-09-08T16:43Z to 2026-10-08T15:41Z.
- `SUB/<id>` is `TB/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/agent-<id>.jsonl`, one worker's transcript. The worker's tier and description are in the `.meta.json` file beside it.
- `LIVE` is `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`, the coordinating session from 2026-10-08T12:53Z on. The backup holds a copy under `TB`.
- `file:N` is the JSON line number N of that file. Repository paths and line numbers are those of the tree on 2026-10-12.
- Speech-to-text artefacts in the curator's messages are quoted as they stand.
- The transcripts held for this note begin on 2026-09-08 (the coordinating session) and 2026-09-09 (the earliest other file). Nothing earlier is in the backup.

## 1. When the paper was first found or named, by whom, for what question

### 1.1 The earliest naming anywhere in the record

- The paper is named in `research/authorship.md:172-175`, in the section "Where they went (affiliations, 2026, from public sources)" (line 169). The entry for Sukyoung Ryu says that "her group continued the Fortress dispatch line academically after 2012 (e.g. POPL 2019 *Polymorphic symmetric multiple dispatch with variance*, co-authored with Steele)".
- The line entered with the file's first commit, `957191d26` ("research: add authorship map of the 2007-2012 history"): author date 2026-08-22T00:12:42Z, committer date 2026-08-22T18:09:10Z. Two later commits to the file, `6beb45ec7` and `796ae4bfb`, carry the same committer date as `957191d26`. The file says "Compiled 2026-08-21" (line 3).
- The commit footer names `Claude-Session: https://claude.ai/code/session_01LjDz79rDLErtnSKpovMDpX`. That is not the session of the later commits (`session_01AmiXNpJxQ6TBwec4vJZHDB`).
- The file states its purpose (lines 5-7): "know who wrote which subsystem, and whom one could plausibly contact with questions about history or unrealized plans". The paper appears there as an example of where Ryu's group went, not as a source being read.
- A search of the tree at `a0617d672` (the parent of the literature note's commit) for "Polymorphic Symmetric", "3290324", "Gyunghee", "Jaemin Hong" and "Hong, Steele" finds only `research/authorship.md`. No file of the tree names the paper's title, DOI or authors before 2026-09-23 other than that one.
- A string search of every transcript in the backup (the string list: "Polymorphic Symmetric", "POPL 2019", "ParkPOPL", "3290324", "Gyunghee", "Park, Hong") finds no hit earlier than the one in 1.2.
- The transcript of the session that wrote `research/authorship.md` is not in the backup. Whether the curator, the coordinating session or a worker of that session found the paper is not recoverable here.

### 1.2 The earliest naming in a transcript, and the worker that found it

- 2026-09-23T07:29:30.429Z, the curator (`PARTS/000:12507`): "just on a hunch, is this a place where we should go and ask Nathan what his recommendation would be? Or is there a later published work of his that dealt with this problem? Can we research literature to find a solution to our conundrum? Is, is widening a net here the answer? I feel grossly unqualified to make decisions in this field." (Nathan is the speech-to-text form of Karl Naden. The "mm-hmm" fillers of the transcript are left out.)
- 2026-09-23T07:30:12.195Z, the coordinating session (`PARTS/000:12510`), no tool call between the two messages: "The type group's own later work: Ryu's group at KAIST continued the Fortress type system after 2012 and Naden went to CMU. Whether either published on this trade is the question." It announced an Opus research worker.
- 2026-09-23T07:30:41.490Z, the coordinating session launched that worker (`PARTS/000:12511`; worker `SUB/a0689478938fee59e`, description "Literature on the exclusion trade", tier Opus per its meta file). The brief did not name the paper. Its item 1 asked for "Later work by the Fortress type group and by Karl Naden. Sukyoung Ryu's group at KAIST after 2012 on Fortress's type system, overloading, multiple dispatch with parametric polymorphism (search for "Ryu Fortress overloading", "symmetric multiple dispatch parametric polymorphism", "return type rule multiple dispatch")" and "Did anyone publish a resolution of the tower conflict, or a proof that the rule is necessary?" (`SUB/a0689478938fee59e:1`).
- The question behind the brief, from the same brief: the curator "must choose between two routes on a type-system trade the Fortress designers left open" (the multiple instantiation exclusion rule against the numeric tower), and "wants to know what the field has done with the same problem since 2012".
- 2026-09-23T07:31:00.889Z and 07:31:01.221Z, the worker's first two searches (`SUB/a0689478938fee59e:45-46`): "Ryu Fortress overloading multiple dispatch parametric polymorphism KAIST", and the title of the 2011 OOPSLA paper.
- 2026-09-23T07:31:05.676Z, the first result (`SUB/a0689478938fee59e:47`) lists "Polymorphic symmetric multiple dispatch with variance | Proceedings of the ACM on Programming Languages", `https://dl.acm.org/doi/abs/10.1145/3290324`. This is the earliest transcript line that holds the paper.
- 2026-09-23T07:31:08.698Z, the worker (`SUB/a0689478938fee59e:51`): "The POPL 2019 paper (10.1145/3290324) is the key successor. Let me fetch it."
- The worker read the paper from a Wayback copy of the ACM PDF, `http://web.archive.org/web/20240415191855/https://dl.acm.org/doi/pdf/10.1145/3290324`. The download succeeded at 2026-09-23T07:46:53.337Z after a connection reset at 07:46:42Z (`SUB/a0689478938fee59e:225-233`). It then searched the text for "instantiation", "Anc-Same", "ancestor meet", "return type rule", "self", "comprises", "tower" (`:236-261`).
- Its note, `explorations/reviews/mie-probes/literature.md`, landed as `745070c87` at 2026-09-23T08:03:22Z. Section 1, first bullet (line 7), is the paper's entry; line 1 lists "Google Drive (sign-in wall)" among the sites that were refused.
- 2026-09-23T08:04:08.780Z, the coordinating session relayed it to the curator (`PARTS/000:12593`), first of four findings: "The Fortress group kept working after 2012: a POPL 2019 paper keeps the rule and specialization by checking the return type at run time, the option Naden had rejected."

## 2. Each later consultation

The list is chronological. "Decision fed" gives the curator decision that the record ties to it. Where the record states none, the entry says so.

### 2.1 2026-09-23 to 2026-09-24: through the literature note, second-hand

- 2026-09-23T08:04:44.523Z, the coordinating session briefed an Opus worker on the patents' forest rule (`PARTS/000:12594`; `SUB/a3006e759f983a1a3`). Its item 5 is "Relation to the Welterweight draft and POPL 2019".
- 2026-09-23T09:09:23Z, `a8f1c5081` ("FACTS: the exclusion fork priced three ways and dated"). The new FACTS entry holds the clause "Literature (`literature.md`): the Fortress group kept the rule after 2012 (Welterweight 2012, POPL 2019, which checks the return type at run time)".
- 2026-09-24T00:08:54Z, `24f9d3b0a`, `explorations/reviews/exclusion-design-brief.md`, written by a Fable worker (`SUB/a8a2e92c69252849b`, first transcript hit 2026-09-23T23:55:16Z). It cites the paper at lines 59, 69 and 128, all through `literature.md`. Line 128: "their last published line (POPL 2019) has no self types and no tower".
- Decision fed: the choice between the routes. See 2.2.

### 2.2 2026-09-24: the curator reads the literature note, then decides

- 2026-09-24T01:02:52Z, the curator's reaction to the brief's five open questions (`PARTS/001:92`), marked by him "I'm not deciding yet". On the patents' forest rule against Steele's flattening: "Yes, because that was the teams last record on how to do the “Fortress” way. From brief glance at literature.md, this path culminated in POPL 2019 paper? So they seemed to continue down that route?"
- 2026-09-24T01:05:02.453Z, the coordinating session (`PARTS/001:114`): "A correction: the published path did not continue the forest route. POPL 2019 keeps the rule for invariant traits, allows two instantiations only when a single minimal ancestor exists ..., keeps specialisation by checking the return type at run time (the option Naden rejected), and has no self types and no numeric tower. So on the tower, the group's last published word is "rule kept, no nesting", which is A's shape."
- 2026-09-24T01:04:18Z, `b49f6a4ef`: POSITIONS records the reaction and the correction, "not a decision".
- 2026-09-24T14:41:40.798Z, the curator (`PARTS/001:1808`): "Agreed. Route A it is." Committed as `a00710be9` at 14:43:02Z. The POSITIONS entry (`explorations/coordinator/POSITIONS.md:43`) keeps "His readings while the fork was open", among them "the route culminating in the POPL 2019 paper, which keeps the rule and specialisation by a run-time return-type check".
- Decision fed: route A, the exclusion rule kept and the numeric tower flat (POSITIONS:43). At that date the record held the paper only as `literature.md` § 1 and the coordinating session's reading of it (`reviews/decisions-review/popl-recheck.md:1`: "the record had the paper only secondhand" when the judgement of 2026-09-29 was written).
- `POSITIONS.md:26`, "The type group's late positions outweigh the early text", lists "the POPL 2019 paper" among the late positions. The curator's words in that entry are of 2026-09-23T07:26:28Z (`PARTS/000:12455`), about five minutes before the paper first appears in a transcript (07:26:28Z against 07:31:05Z). The paper's name entered that entry's parenthesis later: the earliest commit I found with it is `bc8902f47` (2026-09-30T05:37:17Z, the rewrite of POSITIONS).

### 2.3 2026-09-26 to 2026-09-29: judgements that did not read the paper

- At the tree of 2026-10-12, these judgement notes hold no mention of "POPL" except the last one, which holds one: `reviews/overloading-judgement.md` (landed 2026-09-26T10:52:02Z), `reviews/anyintegral-comprises-judgement.md` (2026-09-28T07:46:03Z), `reviews/conversion-overloading-judgement.md` (2026-09-28T16:50:24Z), `reviews/plain-beside-generic-judgement.md` and `reviews/comprises-type-level-judgement.md` (both 2026-09-28T22:16:29Z), `reviews/array-fork3-judgement.md` (2026-10-09T15:31:19Z), `reviews/array-fork2-judgement.md` (2026-10-09T15:54:47Z), and `reviews/decisions-review/judgement.md` (2026-09-29T13:06:54Z, one mention).
- `reviews/decisions-review/popl-recheck.md:1` says that "When the judgement was written the record had the paper only secondhand (`explorations/reviews/mie-probes/literature.md` § 1)".
- 2026-10-10T06:03:37.377Z, the coordinating session to the curator (`LIVE:10582`): "fork 3 ... cites Welterweight three times and POPL 2019 never; fork 2 ... cites Welterweight once and POPL 2019 never." and "Why it was missed: my briefs for those judges pointed at the ways notes and the decisions on record, not at the team's latest papers."

### 2.4 2026-09-29: the full text, the recheck of the decisions, the instance rule

- 16:03:37.149Z, the curator (`PARTS/002:12549`), about the PDFs the record had kept: "... other was the some some kind of type paper, and that is relevant for our typing work."
- 16:04:04.302Z, the coordinating session (`PARTS/002:12562`): "The one outside paper, POPL 2019 by Park, Hong, Steele and Ryu, is cited by its DOI in the literature note and isn't on disk."
- 16:05:26.749Z, the curator (`PARTS/002:12576`): "that was exactly my point that uh, Popple 2019 paper should be downloaded here and uh, extracted into text form so that you can work with it. It is relevant for the type discussion."
- 16:05:50.763Z, the coordinating session launched a worker (`PARTS/002:12579`; `SUB/a935e1d2c00265221`, "Fetch and extract the POPL 2019 paper"; the Agent call names no tier). Its brief (`SUB/a935e1d2c00265221:1`) asks for a working extract laid against: "instantiation exclusion and route A (POSITIONS 2026-09-24), answer 9's overloading rules, the return-type rule over every instance, run-time instantiation of a dispatched generic (item 30), the `covariant` keyword (row 404), and `comprises` read on values (item 26)". Its fetch attempts are in 3.3.
- 16:13:22.704Z, the curator (`PARTS/002:12698`): "can you restart the worker that did the decision audit, so that like we are sure it is not. Uh, like, what if it contains infor- important information that we should do something differently?"
- 16:40:19Z, `1fd0a52d4`: the extract, written from the passages already on record. 16:40:35.663Z, the curator uploaded the PDF (`PARTS/002:13163`): "I probably mixed my memory with the Steele presentations. There you go. Attached, downloaded from the acm.org URL you gave me: https://dl.acm.org/doi/pdf/10.1145/3290324?download=true". The extract says the PDF "was downloaded by Pavol on 2026-09-29" (`research/extracts/ParkPOPL2019-extract.md:11-14`).
- 16:41:25.711Z, the coordinating session sent the full text to the Fable worker that had written the review of the curator's decisions (`SUB/a059d4ffd647eb42d:494`, tier Fable per its meta file), with his words as the question and the list: route A, answer 9 and the positional rule, the conversion-and-overloading decision of 2026-09-28, item 26 (`comprises` on values), item 30, the implicit bound `Any`, the `covariant` keyword (row 404), and the omissions it had named.
- 16:49:27Z, `49e9b68bd`: the extract redone from the full text. 16:49:56Z, `c39a411ad`: `reviews/decisions-review/popl-recheck.md`.
- 16:52:08.446Z, the coordinating session to the curator (`PARTS/002:13298`), the recheck's result: "None of your big decisions changes." One question: "Should we adopt the paper's rule for a type parameter that the call's arguments don't pin down?" Three choices of the same day were affected: item 30's instance, the `Bottom`-typed call compiled as a `throw` (R2), and the inference chapter's union (row 516).
- 17:21:46.816Z, the curator (`PARTS/002:13526`): "I was asking uh, Fable uh, about the impact of that POPL 2019 paper on our work. And I need to check what it says because like the proof that it provided to us is maybe affected by, by that." In context the proof he means is probably the outside reviewer's proof addendum on item 26 (`reviews/comprises-type-level-proof-addendum.md`; his messages of 11:03:02Z and 11:20:08Z, `PARTS/002:11255`, `11317`, and the reply he forwarded at 17:29:19Z, which speaks of "the limited proof"). That is my reading of the context; he does not say which proof.
- 17:29:19.700Z, the curator forwarded the outside reviewer's reading of the paper (`PARTS/002:13587`): "Astra no POPL2019 impact for next batch ... We do not need to pause all of batch 7b or rewrite the limited proof." POSITIONS records it (`dd81491fd`): "no change to batch 7b, and one boundary for rung C's implementation review".
- 17:34:18.956Z, the curator's decision (`PARTS/002:13597`): "if I apply the rule that the teams work super the later teams work supersedes the previous one, and you are saying the rule is coming from the paper and it helps us cleanly resolve something, then I will trust the team's work over whatever my misunderstanding of the things are. So you can record that."
- 17:46:56Z, `dd81491fd` records it. Decision fed: `POSITIONS.md:48`, "A type parameter the arguments do not fix takes its bound, never `Bottom` (the paper's instance rule)". POSITIONS gives its replacements: item 30's instance, R2, and row 516's union.
- A worker (`SUB/a9dc3d3b175b2eafb`, "Fold the paper's rule into 7b", 17:35:16Z to 18:02:49Z) folded the rule into batch 7b's record.
- Built from it: batch 7b's record brought to the rule (`086875900`, 2026-09-29T18:00:38Z); the checker binding such a parameter "to its bounds under the expected type, never BottomType" (`f3032eed8`, 2026-10-02T19:04:50Z); FACTS "the static-arguments entry states the instance rule as built" (`3de0a9cbf`, 2026-10-02T20:50:03Z).
- 17:51:20Z, `c191ec622` and `e9e81a432` merged the recheck and the extract into main.

### 2.5 2026-10-02 and 2026-10-08: named as input, decision not stated

- 2026-10-02T21:17:59.822Z, an Opus probe, "Probe P1: F-bounded instance in walk" (`SUB/af9b2c3ba93eb9c88`), lists `research/extracts/ParkPOPL2019-extract.md` as input with the note that it "excludes a method type parameter from upper bounds, so its rule does not cover F-bounded functions".
- 2026-10-08T11:27:17.113Z, a Fable worker, "P1 judgement for the curator" (`SUB/a8f84d88deaeb0b8a`), lists "the POPL 2019 paper's rule as summarized in FACTS" as input.
- The curator decision these fed is not stated in the lines I read.
- 262 worker transcripts hold at least one of the search strings of 1.1. In those I looked at (the two above and several consolidation, review and planning workers) the paper appears in text copied from FACTS, POSITIONS or the brief. I did not read each of the 262.

### 2.6 2026-10-10 morning: the array judgements checked against the paper

- 06:03:05.265Z, the curator (`LIVE:10568`): "Before the last batch, you prepared some two reports about the arrays, and I have skimmed them. ... I worried I saw no mention of the very last paper, the POPL 2019 uh, paper. Do we still have it here extracted on the record? Why wasn't it part of that reasoning? Wasn't it relevant?"
- 06:06:06.431Z, the curator (`LIVE:10589`): "Yes. Run Fable with POPL2019 in focus". The Fable worker `SUB/a9989b2b3793b10b9` ran from 06:06:26Z to 06:19:18Z and read the extract and the recheck. The coordinating session at 06:19:38Z (`LIVE:10732`): "The judge read only our extract; the PDF isn't in this container."
- 06:19:02Z, `8aa5bbd82`: `reviews/array-judgements-popl-check.md`. Its five points: fork 2's F-bound on `Vector` and `Matrix`, the block's per-operator bounds, fork 3's opening of a size known only at run time, one ledger row (682), batch 14's self-typed rung. Verdict in the note's first lines: "Nothing reverses. Both recommendations stand ... the pending answers on items 13 and 52 can be given at their defaults."
- Decision fed: the two array decisions (fork 2 and fork 3) and row 682, which the coordinating session put to the curator at 06:19:38.781Z (`LIVE:10732`) as three options. Option 2 was "the same, but leave row 682 open until a worker rereads one figure of the paper from the full text".
- 06:44:21.578Z, the curator (`LIVE:11038`): "POPL2019 paper to follow up on array-judgements-popl-check.md. So I guess I'm picking option two. Go and check the figure. ... I would be even fine with committing this PDF into our repo, but next to the next to the extract ... let's go with the reasoning it's open access and, and necessary for this work. So maybe let's make an exception to our rule for leaving the copyrighted presentations out of the repo." He attached the PDF again.
- 06:45:07Z, `afc1d8c39`: `research/extracts/ParkPOPL2019.pdf` and `.txt` committed beside the extract. A Fable worker (`SUB/a5f3131fb2bee5666`, 06:45:30Z to 07:02:52Z) re-read the rules from the full text. 07:02:34Z, `f3444732c`: the check read against the full text, row 682 settled for the checker. 07:04:15Z, `bbcf88bdc`: the findings filed (row 696, row 682 under review item 30).
- The coordinating session's reason for the second read (06:45:54.066Z, `LIVE:11108`): the extract "was never a full-fidelity copy ... The full PDF and its text lived only in the gitignored `research/decks/`, and they were lost when the container was rebuilt."

### 2.7 2026-10-10 morning: the gap in the record's source map

- 06:09:08.402Z, the curator (`LIVE:10624`), on the coordinating session's remark that its briefs had not pointed at the late papers: "Sound like a gap in record that should be plugged in the skill or somewhere appropriate? So that the post-repo paper enter the record being used for decisions made here."
- 06:12:27Z, an Opus worker (`SUB/a541042722541b364`) began adding a section "After the repository" to `explorations/coordinator/map/design-intent-sources.md`, which lists the paper at line 126 and ties it to the design areas. It finished at 06:19:36Z.
- 06:20:06.368Z, the coordinating session (`LIVE:10764`): "Three later works are on record only by title, never read: a 2013 APLAS paper by Kim, Ryu, Luchangco and Steele; two companion patents; the POPL paper's 2018 extended report with its full proofs. They're candidates for a reading pass if you want the record complete."

### 2.8 2026-10-10 morning: the talk

- 06:44:21.578Z, the curator (`LIVE:11038`): "I also had somewhere this paper was accompanied by presentation by Ryu and I could make a transcript of it". 06:56:50.702Z (`LIVE:11382`): "Correction. It was Park presenting the paper."
- 07:27:32.650Z, the curator uploaded a transcript package of the talk (`LIVE:11778`; his words on the proofs are in 4.1).
- 07:29:30.954Z to 07:49:19Z, an Opus worker (`SUB/a06225fc1fe3cafd2`) checked the package against the captions, the slides and the paper. 07:48:53Z, `b7926cb31`. 09:23:06Z to 09:44:00Z, an Opus worker (`SUB/ae1cec70c74e0fd8e`) rebuilt the transcript from the audio with two speech models. 09:43:22Z, `37955d00c`: `research/extracts/ParkPOPL2019-talk.md`. 09:43:30Z, `2c7dd5725`: the FACTS entry gains what the talk adds.
- Decision fed: none stated. The curator's question at 21:13:24.076Z, "does the talk add anything on top of the paper? Or was the transcription of the talk a waste of time?", was answered at 21:15:08Z (`LIVE:12628`): "Not to our decisions; it was worth it for you."

### 2.9 2026-10-10: the worked examples as tests

- 09:04:13.340Z, the curator (`LIVE:12345`): "I'm thinking the examples Park gives could be useful for some tests for our test suite, or would that be a dangerous thing to use something that was not implemented?"
- 09:04:36.097Z, the coordinating session restated it (`LIVE:12348`) and proposed a sort into three groups. 21:13:24.076Z, the curator: "Go." An Opus worker (`SUB/aae9d020f9c6683ca`) ran from 21:13:59Z to 21:39:46Z.
- 21:39:23Z, `fa9a32e39`: `reviews/popl2019-examples.md` (24 examples: 11 test a rule the revival implements, 4 a rule it does differently, 9 need variance or phase 5). 21:40:18Z, `8d017c850`: "rows 697 to 699 opened, the test rung in batch 14's lists".
- Decision fed: the test rung in batch 14's lists. No curator decision on the rows is recorded in what I read.

### 2.10 The two record entries named in the brief

- `explorations/coordinator/POSITIONS.md:48`, "A type parameter the arguments do not fix takes its bound, never `Bottom` (the paper's instance rule)": first landed in `dd81491fd` (2026-09-29T17:46:56Z) as a dated entry. It has its present form since the rewrite `bc8902f47` (2026-09-30T05:37:17Z). It quotes the curator's 17:34 words (2.4).
- `explorations/coordinator/FACTS.md:177`, "The team's latest word on types and on the exclusion rule is the unfinished restart, not `Specification/`": the title first landed in `6d431bba2` (2026-09-26T07:55:30Z) with no mention of the paper. The paper's text entered in `d1c53a36d` (2026-09-29T18:31:48Z). The talk's text entered in `2c7dd5725` (2026-10-10T09:43:30Z).
- One timing difference I could not reconcile: `dd81491fd` dates the curator's answer on item 30 "11:37 UTC" on 2026-09-29, and the transcript holds no curator message at that time. The message with "it's obvious that only option one makes sense" is stamped 2026-09-29T12:02:38.077Z (`PARTS/002:11446`).

## 3. The extended report

### 3.1 The paper's reference entry, verbatim

- `research/extracts/ParkPOPL2019.txt:1437-1438` (the text wraps after "with"), on printed page 11:28, the paper's last page, under the references:
  `Gyunghee Park, Jaemin Hong, Guy L. Steele Jr., and Sukyoung Ryu. 2018. Polymorphic Symmetric Multiple Dispatch with Variance (Extended Report).`
- The entry gives no URL, no venue and no archive. The in-text key is "[Park et al. 2018]".
- Where the paper cites the report (text lines; printed page = PDF page for this article):
  - 11:3, lines 153-154: "Full proofs are available in a companion report [Park et al. 2018]."
  - 11:10, lines 515-516: "The formal rules are defined in the companion report [Park et al. 2018]." (well-formedness of types)
  - 11:15, lines 754-755: "The entire type relations are formally defined in the companion report [Park et al. 2018]."
  - 11:16, lines 827-828: "The full definitions are available in the companion report [Park et al. 2018]."
  - 11:21, lines 1092-1093: "While we state the lemmas and theorems in prose in this paper, we state them formally in the companion report [Park et al. 2018]."
- The revival's extract states it at `research/extracts/ParkPOPL2019-extract.md:28-31` and at line 256 ("Proved (sketched here, full proofs in the companion report)").
- The record's first note of the report: the extract worker's reading of the full text, 2026-09-29T16:41:22.373Z (`SUB/a935e1d2c00265221:533`). The first extract version (`1fd0a52d4`, 16:40:19Z) does not mention it. The version of 16:49:27Z (`49e9b68bd`) does.

### 3.2 The Drive link: the exact URL and the page that carries it

- The URL, verbatim as the coordinating session wrote it (`LIVE:11884`, 2026-10-10T07:30:09.188Z) and as the fetch tool returned it (`LIVE:11835`, 07:28:44.113Z):
  `https://drive.google.com/uc?export=download&id=19Fzopb-1bU-kYgX8ir9UGYdJO3BHvv7a`
  In raw HTML it is the same with `&amp;`: `href="https://drive.google.com/uc?export=download&amp;id=19Fzopb-1bU-kYgX8ir9UGYdJO3BHvv7a"` (`SUB/a0689478938fee59e:109`).
- The page that carries it, per the coordinating session: the KAIST lab's publications page, `https://plrg.kaist.ac.kr/research/publications`. The fetch tool's summary of that page (`LIVE:11835`, 2026-10-10T07:28:44.113Z) reads: "The page has one entry for this paper, under "Before 2020," in the list of 2019 publications: **Paper:** Gyunghee Park, Jaemin Hong, Guy L. Steele Jr., and Sukyoung Ryu, "Polymorphic Symmetric Multiple Dispatch with Variance," POPL, January 2019. The title is not hyperlinked. **Extended Technical Report:** https://drive.google.com/uc?export=download&id=19Fzopb-1bU-kYgX8ir9UGYdJO3BHvv7a **Video (related, not a report):** https://www.youtube.com/watch?v=eqpe-VfW3F4 The entry lists no separate appendix or proofs document."
- The same URL, without a label, appeared earlier in a raw `grep -o 'href=...drive...'` of Gyunghee Park's member page, `https://plrg.kaist.ac.kr/members/%EB%B0%95%EA%B2%BD%ED%9D%AC-gyunghee-park`, at 2026-09-23T07:32:57.027Z (`SUB/a0689478938fee59e:108-109`). The worker did not comment on it. That output holds two Drive links, in this order: `id=1QVKpg5tmD25rWkj9JOBnQF_aaJU2djMR`, then `id=19Fzopb-1bU-kYgX8ir9UGYdJO3BHvv7a`.
- The other Drive link on those pages is the paper's own PDF, not the report. Its URL is `https://drive.google.com/uc?export=download&id=1QVKpg5tmD25rWkj9JOBnQF_aaJU2djMR`. Summaries of the publications page label it "[PDF]" (2026-09-23T07:31:36.932Z, `SUB/a0689478938fee59e:66`). A raw excerpt of the page on 2026-09-29T16:07:55.076Z shows it as the link on the paper's title, followed by the YouTube link (`SUB/a935e1d2c00265221:65`).
- Two accounts of the same page differ. The 2026-09-29 raw excerpt has the title linked to `1QVK...`. The 2026-10-10 summary says "The title is not hyperlinked" and gives the report link `19Fzopb...`. I found no raw HTML of the publications page from 2026-10-10 that shows the label of the `19Fzopb...` link; its label as "Extended Technical Report" rests on that one summary.
- The earliest commit I found that carries the URL is `b9979a30d` (2026-10-10T07:29:46Z), in the boot note `explorations/coordinator/postmortem-2026-09-19/held-list.md`.
- The paper itself prints no Drive link and no URL for the report (the whole text was searched for "drive", "google", "bit.ly", "goo.gl": no match).

### 3.3 Every recorded attempt to get the report

All times UTC. Responses are as the transcript records them.

2026-10-10, the coordinating session, for the report itself:

- 07:28:19.874Z and 07:28:29.171Z, two web searches (`LIVE:11814-11829`). Results: "The search didn't turn up the extended report itself, only the published POPL 2019 paper and references to the extended report." and "I didn't find a copy of the extended report on plrg.kaist.ac.kr. The search turned up the POPL 2019 paper and its publisher pages, but no KAIST-hosted PDF."
- 07:28:28.533Z, fetch of `https://dl.acm.org/doi/10.1145/3290324`, asking for supplementary material (`LIVE:11820-11821`): "The server returned HTTP 403 Forbidden."
- 07:28:38.778Z, fetch of `https://dspace.kaist.ac.kr/handle/10203/283078?mode=full`, a KAIST thesis page found by search (`LIVE:11832-11833`): "getaddrinfo ENOTFOUND dspace.kaist.ac.kr".
- 07:28:46.718Z, `curl -sSL` of the Drive URL (`LIVE:11845-11846`, result 07:28:48.692Z). It saved 918885 bytes; `file` reports "HTML document, ASCII text, with very long lines (65536), with no line terminators"; the first bytes are `<!doctype html>...<base href="https://accounts.google.com/v3/signin/">`.
- 07:28:52.298Z, two more URLs (`LIVE:11850-11851`, result 07:28:53.812Z):
  - `https://drive.usercontent.google.com/download?id=19Fzopb-1bU-kYgX8ir9UGYdJO3BHvv7a&export=download&confirm=t` gave `200` and the final URL `https://accounts.google.com/v3/signin/identifier?continue=https://drive.usercontent.google.com/download?id%3D19Fzopb-...`, with the page title `<title>Google Drive: Sign-in</title>`.
  - `https://drive.google.com/file/d/19Fzopb-1bU-kYgX8ir9UGYdJO3BHvv7a/view` gave `401`; `file` reports "HTML document, ASCII text, with very long lines (2593)".
- 07:29:09.066Z, the download folder removed (`LIVE:11855`). 07:29:46Z, the boot note records "asks for a Google sign-in from here (401)" (`b9979a30d`).
- The record shows no Wayback Machine attempt by the coordinating session on 2026-10-10. At 07:40:52.729Z it wrote "The Wayback Machine might hold a copy of the Drive link. It's blocked from here and unlikely to have it." (`LIVE:11936`).

2026-10-10, the curator, in his browser:

- 07:40:23.008Z (`LIVE:11912`), after the coordinating session asked him at 07:30:09Z to try the link: "The KAIST lab's Google Drive link after logging in with any of my two accounts gives “403. That’s an error. We're sorry, but you do not have access to this page. That’s all we know.”"
- 07:40:52.729Z, the coordinating session's conclusion (`LIVE:11936`): "So the file is restricted, not public; the lab's link is dead for anyone outside it."
- 07:40:54.831Z (`LIVE:11939`): "Wayback machine has not archived this page either." The message does not name the URL. It follows his message about the Drive link by about 32 seconds.
- 07:54:01.761Z (`LIVE:12001`): "The kaist server is gone: Safari can't open the page because the server can't be found. Tried both URLs in Wayback machine, none were archived." The coordinating session's message of 07:40:52Z had offered two KAIST repository addresses, `https://dspace.kaist.ac.kr/handle/10203/283078` and `https://dspace.kaist.ac.kr/handle/10203/270790`, as the likely thesis; the message does not say that these are the "both URLs".
- 08:01:33.105Z, the coordinating session (`LIVE:12029`): "with KAIST gone and nothing in the Wayback Machine, the authors are the way."
- 2026-10-12T22:14:00.978Z, the curator (`LIVE:16129`): "No need to try fetch it now. It’s established it’s not accessible, which I’d want we wrote to prof. Ryu".

Earlier attempts at the paper's own Drive copy (`id=1QVK...`), the same site and the same wall. They are not attempts at the report; the report's link was not tried before 2026-10-10:

- 2026-09-23T07:31:40.926Z, `curl -sSL` (`SUB/a0689478938fee59e:70-74`). It saved 916170 bytes: "HTML document, ASCII text, with very long lines (65536)", beginning `<base href="https://accounts.google.com/v3/signin/">`. The worker: "Google Drive requires sign-in. Searching for another copy." (07:31:49.658Z).
- 2026-09-23T07:32:47.815Z, the `drive.usercontent.google.com/download?...&confirm=t` form (`:108-109`): `200 https://accounts.google.com/v3/signin/identifier?continue=...`.
- The note's header (`explorations/reviews/mie-probes/literature.md:1`): "Blocked or refused: dl.acm.org (Cloudflare challenge, 403; ACM texts below come from Wayback copies), Google Drive (sign-in wall) ...".
- 2026-09-29T16:07:59.931Z to 16:08:03.917Z (`SUB/a935e1d2c00265221:69-70`): the same two forms, `200`, final URL `https://accounts.google.com/v3/signin/identifier?continue=...`; the worker: "Google Drive wants a sign-in."

Other failures on the way to the paper (not the report), for completeness:

- `dl.acm.org`: HTTP 403 on 2026-09-23T07:31:09.688Z and 07:31:17.846Z (fetch tool, `SUB/a0689478938fee59e:53,59`); 403 with "Just a moment..." (Cloudflare) at 07:32:23Z and 07:32:30Z (`:95-98`); 403 at 2026-09-29T16:06:15.540Z (`SUB/a935e1d2c00265221:38`); 403 at 2026-10-10T07:28:28.799Z (`LIVE:11821`).
- Wayback Machine: on 2026-09-23 it answered after one retry (the success at 07:46:53.337Z above). On 2026-09-29 it failed throughout: `429 Too Many Requests` and "Recv failure: Connection reset by peer" at 16:06:36Z, three resets at 16:07:31Z, and a background retry loop that the worker reports as "Fifteen failures in a row" at 16:18:16Z (`SUB/a935e1d2c00265221:43,51,273`). The proxy log named `ws_closed_mid_exchange` for `web.archive.org:443`. The coordinating session had the loops stopped at 16:30:30Z.
- The first local copy was lost: the 2026-09-23 worker's `scratchpad/lit/popl19w.pdf` was "Gone from disk" at 2026-09-29T16:18:03Z (`SUB/a935e1d2c00265221:263`). The curator's upload of the PDF at 16:40:35.663Z supplied the paper.

### 3.4 No current attempt

None was made for this note, at the coordinating session's instruction (see the first comment).

## 4. Why the revival wanted the proofs

### 4.1 In the curator's words, with times

- 2026-10-10T07:27:32.650Z (`LIVE:11778`), when he uploaded the talk's package: "And I vaguely recall reading somewhere that the paper should come with some kind of proof, but I wasn't able to find it on the page myself. Like we had this discussion previously about the transcript transcribing this. ... when we were discussing this paper and I was asking [a model's name, elided under this note's rule] us to Astra review that paper and its implications for our work here with the type system. I, I recall that there was some, some proof supposed to be delivered along with this paper. So if we can locate it and download it as another thing to be committed to together with this, that, that would be great. I just wasn't able to find it on the page myself, but there was a reference to, to some kind of proof. Tell me if you know what I'm talking about."
- 2026-09-29T17:21:46.816Z (`PARTS/002:13526`): "I need to check what it says because like the proof that it provided to us is maybe affected by, by that." This is about the paper's effect on a proof the revival holds, probably the outside reviewer's addendum on item 26 (2.4), not about the report. By then the report was in the record (3.1).
- 2026-10-12T22:01:05.450Z (`LIVE:16064`), in his comments on the reply to Ryu: "I would like to make the proofs we’re asking her for to be made public is possible, so that I can use them in the repo, which is fully public."
- 2026-10-12T22:09:44.112Z (`LIVE:16080`), his instruction that led to this note: "... why the proofs/extended report it mentions but are no longer accessible publicly from their Google Drive link".
- The record holds no other message in which the curator says what question the proofs are to settle.

### 4.2 In the coordinating session's words

- 2026-10-10T07:30:09.188Z (`LIVE:11884`): "The proof: yes, I know what you mean. The paper gives only proof sketches. It says the full proofs are in a companion "Extended Report" (Park et al. 2018), but cites it without a link."
- 2026-10-10T06:20:06.368Z (`LIVE:10764`): the report is one of three later works "on record only by title, never read" and "candidates for a reading pass if you want the record complete".
- 2026-10-12T21:28:37Z, 21:49:53Z and 22:01:33Z, in drafts of the later reply to Ryu (not of the email in section 5): "The extended report would let us check that we've read the proofs correctly." (21:28:37, `LIVE:15965`); "The extended report would let me check my reading of the paper's proofs." (21:49:53, `LIVE:16058`); "Your POPL 2019 paper is the latest word I build on for the type system, and the extended report would let me check my reading of its proofs. Would it be possible to make the report public?" (22:01:33, `LIVE:16074`).

### 4.3 What the record says the paper's proofs cover, and where the revival goes past them

- The extract records that the paper's proofs are not mechanised and that only the method-invocation case of soundness is proved (`research/extracts/ParkPOPL2019-extract.md:254-271`). The formal rules and the formal statements of the lemmas and theorems are in the report (3.1).
- `reviews/decisions-review/popl-recheck.md:122` ("Two things to know, no decision needed"): "the paper's soundness proof does not cover the library's own reductions (`SUM`, `BIG MAX`, the `Integral` family), because it forbids a bound that names the parameter itself; and the item 26 you approved is the one place our type theory goes past the designers' last proven model, since the paper keeps a unique static winner as a theorem where we keep it only at run time."
- `reviews/array-judgements-popl-check.md:7`: the array family's bound adds 38 generic functions "outside the paper's theorem, beside the 30 F-bounded functions the api already has".
- `explorations/coordinator/FACTS.md:177`: "so the paper's soundness theorem does not cover the library's F-bounded functions, `SUM`, `BIG MAX` and those over `Integral[\I\]`" (p. 11:11), and "the team's earlier assumption, the union of the lower bounds, the authors could not prove (p. 11:25)".
- None of these notes says that the report would settle one of these points. They are the places where the record states the limit of the proofs it has seen.

## 5. The email

### 5.1 The drafts of 2026-10-10

- Context: the curator tried the link and the Wayback Machine (3.3), and at 07:54:01Z asked the coordinating session to fetch the talk's video. Its reply is the first draft.
- First draft, 2026-10-10T08:01:33.105Z (`LIVE:12029`), verbatim:

  > Subject: Extended report for "Polymorphic Symmetric Multiple Dispatch with Variance" (POPL 2019)
  >
  > Dear Dr. Park, dear Prof. Ryu,
  >
  > I am reviving the Fortress language from Sun's last source tree, and your POPL 2019 paper is the type group's last published word we build on. The paper cites a 2018 extended report with the full proofs. The lab's link to it on Google Drive is no longer accessible, and the KAIST repository is offline. Could you share a copy?
  >
  > Thank you,
  > Pavol Vaskovic

  The coordinating session wrote that it was "a draft for you to send to Gyunghee Park and Sukyoung Ryu. Their addresses are on their current pages or dblp."
- 2026-10-10T08:09:49.441Z, the curator (`LIVE:12066`): "Not seeing the addresses. Can you give them to me together with your draft as mail:// link?"
- 2026-10-10T08:10:08Z, the coordinating session found no address on Gyunghee Park's page (`LIVE:12080`) and, at 08:10:14Z, `sryu.cs [at] kaist.ac.kr` on `https://plrg.kaist.ac.kr/ryu` (`LIVE:12085`).
- Second draft, 2026-10-10T08:10:39.089Z (`LIVE:12103`), with a `mailto:` link built at 08:10:22.829Z (`LIVE:12099-12100`) and the same text for pasting, verbatim:

  > To: sryu.cs@kaist.ac.kr
  > Subject: Extended report for "Polymorphic Symmetric Multiple Dispatch with Variance" (POPL 2019)
  >
  > Dear Prof. Ryu,
  >
  > I am reviving the Fortress language from Sun's last source tree, and your POPL 2019 paper with Gyunghee Park, Jaemin Hong and Guy Steele is the type group's last published word we build on. The paper cites a 2018 extended report with the full proofs. The lab's link to it on Google Drive is no longer accessible, and the KAIST repository is offline. Could you or Gyunghee Park share a copy?
  >
  > Thank you,
  > Pavol Vaskovic

  The coordinating session's reason for the address: "Park's lab page shows no address, and the paper prints none. Sukyoung Ryu's homepage gives sryu.cs@kaist.ac.kr. She leads the lab and is the paper's senior author, so I addressed the draft to her and asked her or Park to send it."
- The tool call that built the `mailto:` link (`LIVE:12099`) has "Could you or Dr. Park share a copy?"; the message the curator saw (`LIVE:12103`) has "Could you or Gyunghee Park share a copy?".
- A statement in both drafts: "The lab's link to it on Google Drive is no longer accessible". Every response recorded for either Drive link, on 2026-09-23, 2026-09-29 and 2026-10-10, is a sign-in page, a 401 or a 403 (3.3). No transcript shows either link returning a file.
- 2026-10-10T08:18:38Z, the boot note `f0cbc0e35`: "he has a draft email to Sukyoung Ryu (sryu.cs@kaist.ac.kr, from her homepage) to send."

### 5.2 What is recorded about sending

- The record has no line that shows the act of sending: no time, no sent text, no message from the curator saying he sent it. The first line that says it was sent is the one in the fourth bullet below.
- The coordinating session's boot notes through 2026-10-12T21:17Z say "he has a draft email to Sukyoung Ryu" and "the proofs email to Sukyoung Ryu is his to send" (`explorations/coordinator/BOOT.md:23` before `1e565f9c9`; `LIVE:15493`, `15563`).
- 2026-10-12T21:27:17.248Z, the curator (`LIVE:15916`), the first line that says it went out: "Ryu replied to our email with following request: Dear Pavol Vaskovic, Thank you for your interest in our work. Could you please briefly introduce yourself and let us know where and how you plan to maintain the Fortress language work? Thank you. Best, Sukyoung. *** Help me draft the brief reply." The date and hour of her reply are not given.
- 2026-10-12T21:27:26Z, the coordinating session: "Looking up the email we sent her and what the record says about the project's home" (`LIVE:15919`). It searched the record and the transcript for the sent text (`LIVE:15920-15944`); what it found were the 2026-10-10 drafts (`LIVE:15944` prints the draft of 08:01:33Z, the curator's request of 08:09:49Z and the draft of 08:10:39Z).
- 2026-10-12T21:28:24Z, the coordinating session edited the boot note (`LIVE:15953`), committed as `1e565f9c9` at 21:28:26Z: "the proofs email to Sukyoung Ryu was sent, and on 2026-10-12 she asked him to introduce himself and say where and how he plans to maintain the Fortress work; a reply was drafted for him in chat, his to send."
- The reply drafts of 21:28:37Z, 21:33:46Z, 21:49:53Z and 22:01:33Z (`LIVE:15965`, `16022`, `16058`, `16074`) are drafts of the next message, not of the email asked about here. The last asks Ryu whether the report can be made public (4.2). I found no message saying that any of them was sent.

## 6. What I could not find

- Who found the paper before 2026-09-23, and for what. The session that wrote `research/authorship.md` (footer `session_01LjDz79rDLErtnSKpovMDpX`, 2026-08-21 to 2026-08-22) has no transcript in the backup. The file's purpose and the line's place in it are the only evidence.
- The label of the `19Fzopb...` link on the publications page. Only one fetch summary (2026-10-10T07:28:44.113Z) calls it "Extended Technical Report". The 2026-09-29 raw excerpt and the 2026-10-10 summary disagree on whether the paper's title is linked. No raw HTML of the page from 2026-10-10 is in the record, and none was fetched for this note.
- Whether the `19Fzopb...` link ever returned a file. No transcript shows it doing so.
- Which two URLs the curator tried in the Wayback Machine (`LIVE:11939`, `LIVE:12001`). The messages do not name them.
- What the thesis pages at `dspace.kaist.ac.kr` (`10203/283078`, `10203/270790`) or the entry at `koasas.kaist.ac.kr/handle/10203/270069` hold. The coordinating session's fetch of the first returned `ENOTFOUND`; the curator reports that the KAIST server cannot be found. The search result of 07:28:24.716Z describes "A KAIST master's thesis by Park (2019), advised by Ryu"; nobody opened it.
- The act, time and text of the email's sending, and the date of Ryu's reply (5.2). The text she answered is not in the record; only the draft of 2026-10-10 is.
- The exact reason the curator hoped for proofs beyond his own words in 4.1. The record holds no message of his that names a particular question for them.
- The 2026-09-29 "11:37 UTC" time that POSITIONS gives for the item 30 answer (2.10).
- A complete list of the consultations. 262 worker transcripts contain the paper's name or title; I read those I list in section 2 and the first lines of the others, not all of them. The curator's typed messages before 2026-09-23T07:29:30Z contain none of "POPL", "Ryu", "KAIST" or "Sukyoung". I did not search the coordinating session's own turns of that period for "Ryu".
- A current fetch of the carrying page or of the Drive URL, by instruction (3.4).
