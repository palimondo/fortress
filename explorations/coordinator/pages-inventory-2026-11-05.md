<!-- The inventory of the pages that the project published on claude.ai, written 2026-11-05 at the curator's ask of 12:5x UTC that day (HELD.md, "Held in chat (2026-11-05)"), for his later review of which to delete, which to keep and which to publish under docs/. Read-only: no page was changed or deleted. -->

# The published pages, 5 November 2026

The curator asked, at 12:5x UTC on 5 November, for a sort of the pages that this project published on claude.ai before his own review of them: which are one-offs, which are candidates for a permanent record, and which are current or obsolete (`HELD.md`, "Held in chat (2026-11-05)"). This note is that sort. It changes nothing: no page was edited or deleted.

## How this was done

The Artifact tool's list action, run on 5 November during this work, shows 65 pages. The brief named 64. The 65th is "Worker skill changes", the page of the `fortress-repo` skill's changes, published on 5 November.

For each page, the source was found in this order:

1. The coordinating session's own record of its Artifact calls up to 28 October, `<scratchpad>/arts.json`, which gives for each page the local file that it was published from. The scratchpad is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`.
2. The boot note and its history, which name the pages that the coordinator kept and their sources after 28 October.
3. The notes that cite a page's link, and `INDEX.md`.
4. A read of the page itself, where nothing above matched. Eleven pages were read this way, all of them from August and early September: "The Probe and the Pin", "The Snowman and the Gear", "Seventeen Findings", "The Honest Loss Curve", "A GPT You Can Read", "microGPT in Fortress: a transformer written as mathematics", "Matrix-Level microGPT in Fortress", "Who Wrote Fortress", the two pages named "fortress-readme.md", and "microgpt.fss". Only the first part of each was read, except for the four small pages, which the tool returned whole.

One finding goes against the brief. The source files of 24 pages published from 8 October onwards are still in the coordinating session's scratchpad, at the paths named below, and the revival page's HTML is in the tree. They are the files as last published from that folder. A page's live version can differ from them, and the scratchpad is lost with the container, so the live page stays the authority. The sources of the pages before 8 October are gone.

Each entry gives the page's title and link, its last update, what it is, the note that holds its content, whether that content is current, and a proposal with its reason. The three proposals are these:

- **Delete**: a one-off whose content lives in a note, or which later work overtook.
- **Keep**: a page still in use.
- **Publish**: a page worth a permanent record under `docs/`, served openly at https://palimondo.github.io/fortress/.

A page that holds the curator's comments loses them when it is deleted. The entries name the pages that the record says hold his comments. Other pages may hold some too.

## Keep: 6 pages

### Coordinator Rewrite Plan
- Link: https://claude.ai/artifact/FoTnH7KzXt5MtGk3tTcZ8W. Last updated 2026-10-13.
- What it is: the plan of the coordinator skill's rewrite of 13 October, step by step with each step's cost. It is also the house style's reference page: the coordinator skill gives every page this page's CSS and its Select button's script (`.claude/skills/coordinator/SKILL.md`, line 203).
- Note: `explorations/coordinator/process-engineering/coordinator-rewrite-plan.md`. Source file: `<scratchpad>/rewrite-plan/page.html`.
- Current or obsolete: the plan is obsolete, because the rewrite landed. The style is current, and the closing docket's item on the Select script is still open (`closing-docket-2026-11-03.md`, line 182).
- Proposal: keep while the skill names it. A small page made only for the house style could replace it, and then this page could go.

### Type decisions review
- Link: https://claude.ai/artifact/WELD6kRbiHPPzq7hLb8G4Z. Last updated 2026-10-30.
- What it is: the Fable judgement on his type decisions read as one chain, in plain words, with six asks for him.
- Note: `explorations/reviews/type-decisions-review/judgement.md` and `evidence.md`. Source file: `<scratchpad>/type-decisions-page/page.html`.
- Current or obsolete: partly current. P-156's tuple rule was settled on 11-02, but the other asks stay open until the review that leans on walk re-reads them after climb batch 25 (closing docket, section 1, item 9).
- Proposal: keep, because its asks still wait on him.

### Foundations Corrections Baseline
- Link: https://claude.ai/artifact/5noPHbJmZg41UWT74HGxno. Last updated 2026-11-02.
- What it is: the corrections of POSITIONS drafted on 30 October, at version 16, each new text beside the old one. It holds his 17 comments of 29 October.
- Note: `explorations/conversations/02-phase3-exit-foundations.md` tells how it came about, and `explorations/reviews/foundations/` holds its evidence. Source file: `<scratchpad>/foundations/baseline-page.html`.
- Current or obsolete: partly current. Most of the corrections landed at `8c99e258e` and `a58b0a2c4`, but the two questions on P-42 in part 1 are still open (closing docket, section 1, items 3 and 7).
- Proposal: keep until the P-42 questions are answered. Then save his comments and delete it.

### Fortress Revival So Far
- Link: https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5. Last updated 2026-11-05.
- What it is: the revival page, at version 27, for outside readers and for him.
- Note: `explorations/coordinator/process-engineering/revival-story.md` and its HTML `revival-story.html`, both in the tree. `explorations/coordinator/tools/revival-page/update.py` keeps the page current and writes the copy at `docs/revival-story/index.html`, which https://palimondo.github.io/fortress/revival-story/ serves.
- Current or obsolete: current. It was rebuilt and landed on 11-05 (boot note).
- Proposal: keep. It is already published under `docs/`. He may later prefer to read the GitHub Pages copy only, and then the claude.ai page would no longer need its republish at each landing.

### Held rule drafts
- Link: https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr. Last updated 2026-11-05.
- What it is: the coordinator skill's drafts page, recreated with a fresh history on 11-05. It shows the landed changes as diffs with their reasons, and the proposed changes.
- Note: the coordinator skill's commits, and `explorations/coordinator/process-engineering/skill-drafts-2026-11-02.md` for the earlier drafts. Source file: `<scratchpad>/skill-drafts-page/page-2.html`.
- Current or obsolete: current. A worker updates it after each change to the coordinator skill lands (`SKILL.md`, "The curator's role and decisions").
- Proposal: keep. It is one of the small, stable set of pages that he asked for at 12:3x on 11-05.

### Worker skill changes
- Link: https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3. Last updated 2026-11-05.
- What it is: the `fortress-repo` skill's changes since climb batch 25 landed, as diffs with their reasons.
- Note: the skill's commits only, with no note. Source file: `<scratchpad>/fortress-repo-page/page.html`.
- Current or obsolete: current. A worker updates it after each change to that skill (boot note, "Pages").
- Proposal: keep. It is in the same stable set.

## Publish: 13 pages

Each of these would get its own folder under `docs/`. Two of them need a refresh before they can go out, and the entries say so.

### The Probe and the Pin
- Link: https://claude.ai/artifact/CfVtisWfgU3T8PysY4ohMB. Last updated 2026-08-19.
- What it is: a debugging report of the JDK 11 rung, step by step. It traces 458 compiler-path test failures to the missing `target=` attribute of the javac tasks in `build.xml`, and draws the general debugging habits from that.
- Note: none holds it whole. Its facts are in `explorations/modernization-plan.md` and `explorations/repo-internals.md`, and its commits are `fdd4a57c2` and `3246e0aee`. Read this time.
- Current or obsolete: current as history. Later rungs to ASM 9 and `java.util.concurrent` overtook the fix, and the page says so itself.
- Proposal: publish, from the page itself, because no note holds this account. It is written for a reader from outside the project, and it shows how the toolchain was revived.

### The Snowman and the Gear
- Link: https://claude.ai/artifact/AaCcYjFnxGiaMLTTLMEUpC. Last updated 2026-08-21.
- What it is: an explainer of how the 2012 compiler compiles a generic declaration as a template, and how its class loader writes the class of each instantiation, with the team's papers on it.
- Note: none holds it whole. Its facts are in `explorations/repo-internals.md` and in the `fortress-repo` skill's compiler part. Read this time.
- Current or obsolete: mostly current, because it describes the team's code, which the revival kept (F-18). It is dated at commit `c4c90f9`.
- Proposal: publish, from the page itself, because it is the one explainer of the compiled path's design for an outside reader. A writer should check its claims against the tree first.

### The Honest Loss Curve
- Link: https://claude.ai/artifact/G9hH3ZhxTSFVcRB3ARGEtD. Last updated 2026-08-27.
- What it is: Python-side experiments on microGPT's nano configuration. It shows why the training loss that the loop prints misleads, what a held-out measurement shows, and where stopping makes sense. It has its chart.
- Note: `explorations/training-dynamics.md`, with `explorations/training-dynamics-chart.svg`.
- Current or obsolete: current. It is about Karpathy's Python program, which nothing since has changed.
- Proposal: publish, because its measurement of the model's training stays true and outside readers can use it.

### A GPT You Can Read
- Link: https://claude.ai/artifact/WDLocbMbyY6McHbHe1ngxc. Last updated 2026-09-08.
- What it is: the revival's first executable paper, typeset by Fortify: microGPT rebuilt in Fortress until each block of the transformer is one line beside the papers' formula.
- Note: `explorations/microgpt2.fss` and `explorations/microgpt2-memo.md`, with the design journal `explorations/microgpt-native.md` (its entries of 2026-08-24 onwards). The page's HTML is in no file of the tree. Read this time.
- Current or obsolete: obsolete as the model program, since C4 and the APL program took that role. It is still true of the program that it shows.
- Proposal: publish, as a historical exhibit dated to its version. It is one of the three typeset showcases of the language's founding claim, that a program can be written in the notation of its paper, and its figures exist only in this page.

### microGPT in Fortress: a transformer written as mathematics
- Link: https://claude.ai/artifact/2qwJEHRKrc42sCjA2yfnGe. Last updated 2026-09-08.
- What it is: the blinded Fable run's article. It presents a complete GPT, typeset by Fortify, and checked against Karpathy's microGPT to machine precision.
- Note: `explorations/blinded-fable/` (its `notes/04-final.md`, `src/` and `figures/`), and the review `explorations/reviews/blinded-fable-phase1.md`. Read this time.
- Current or obsolete: obsolete as the model program, and true of its own run.
- Proposal: publish, as a historical exhibit beside "A GPT You Can Read". He may prefer to publish only one of the three articles in this group.

### Matrix-Level microGPT in Fortress
- Link: https://claude.ai/artifact/HmmVMSeXQCkETqYSprPDgj. Last updated 2026-09-10.
- What it is: Run B2's article. It presents microGPT with differentiation on whole matrices, checked to the last digit against the pinned Python program.
- Note: `explorations/run-b2/article.md` and `explorations/run-b2/figures/`. The record says that Run B's own article was never published (`explorations/microgpt-run-c-handover.md`, line 53). Read this time.
- Current or obsolete: obsolete as a design, because the flat layout of runs C to C4 replaced matrix-level autodiff. It is true of its run.
- Proposal: publish, as the third historical exhibit. If he takes only one article, this one is the weakest candidate.

### Run C4 tour
- Link: https://claude.ai/artifact/FyUD5p9Tzd91rD9ixb8iTm. Last updated 2026-09-14.
- What it is: the tour of the flat program, C4, which is the model program: 28 rows, each with a formula beside the Fortress line that computes it.
- Note: `explorations/run-c4/tour.md`, and the record `explorations/process-records/12-run-c4.md`.
- Current or obsolete: partly obsolete. C4's sources changed after the tour, on 09-24, 09-25, 09-27, 09-28 and 10-08 (`git log -- explorations/run-c4/src/`).
- Proposal: publish, after the tour's rows are checked against the program as it is now. It is the outside reader's best view of the model program by which the revival is measured.

### Fortress, Characterized
- Link: https://claude.ai/artifact/Jk2FvveWzwDJmaq6wJFux8. Last updated 2026-09-15.
- What it is: what Fortress is in this tree, area by area, for a reader who knows Scala, Swift, Kotlin and Rust, with every claim citing a row of the gap ledger.
- Note: `explorations/reviews/fortress-characterized.md`.
- Current or obsolete: obsolete in its details. It was written over 286 rows of the ledger, which now has more than 600, and before the number types became siblings (`d846e3644`, 09-27) and before climb batches 7 to 25.
- Proposal: publish, after a writer refreshes it against FACTS and the current ledger. No other text tells an outside reader what the language is now.

### Numerics plan, Fable
- Link: https://claude.ai/artifact/TTAis3nzyNuyAE1LAyhwUq. Last updated 2026-09-27.
- What it is: the plan, written blinded to the coordinator's, for his question whether the numeric problems are one issue and what moves microGPT toward the compiled path. It finds one root: the specification never wrote how a value meets a type that the program did not write.
- Note: `explorations/reviews/numerics-plan-fable.md`, and its folder `numerics-plan-fable/`.
- Current or obsolete: obsolete as a plan, because climb batches 7 to 22c carried it out (PLAN.md, "Where we stand"). Its diagnosis is still the ground of the integer conversions that wait on him before climb batch 26 (review-queue items 331 and 332).
- Proposal: publish, with the next two pages, as the record of how the revival settled its numbers. He said on 11-05 that the numerics pages will come up again.

### Numerics plan, Opus
- Link: https://claude.ai/artifact/KELHJNNbZFVLy8Pe1kxRuj. Last updated 2026-09-27.
- What it is: the coordinator's plan on the same question, written in parallel. It finds two knots on the library's error count: range code that is generic over its integer type, and type parameters that nobody writes.
- Note: `explorations/reviews/numerics-plan-coordinator.md`, and its folder `numerics-plan-coordinator/`.
- Current or obsolete: obsolete as a plan, for the same reason as the Fable plan.
- Proposal: publish, in the numerics set.

### Numerics synthesis
- Link: https://claude.ai/artifact/6bxk3BmEunKq1WER4tschP. Last updated 2026-09-27.
- What it is: Fable's synthesis of the two plans: the cheap levers first, then the inference rule with the switch for numerals as batch N, with his decisions.
- Note: `explorations/reviews/numerics-plan-synthesis.md`, and its folder `numerics-plan-synthesis/`.
- Current or obsolete: obsolete as a plan and carried out. Its decision 4, decision D, is still open (below, "Sized arrays in C4").
- Proposal: publish, as the head page of the numerics set.

### Conversion and overloading
- Link: https://claude.ai/artifact/M6Adr1D1mzoD8W7pPduTFe. Last updated 2026-09-28.
- What it is: the Fable judgement on how a conversion meets overloading. A conversion makes a call possible and never changes which declaration runs, and the defaults it took are listed for his review.
- Note: `explorations/reviews/conversion-overloading-judgement.md` and `conversion-overloading-ways.md`.
- Current or obsolete: current. The rule is in force (the `fortress-repo` skill, "Numbers are siblings, not a tower"), and the integer conversions still to be put to him build on it.
- Proposal: publish, in the numerics set, because it states a lasting rule of the revived language.

### Record Post-mortem Report
- Link: https://claude.ai/artifact/F3Gz2ynXQSKEjKXqhNT5is. Last updated 2026-10-23.
- What it is: the report of the record's post-mortem and consolidation of 20 to 22 October, rewritten at his word in a neutral register for researchers who train later models.
- Note: `explorations/coordinator/postmortem-2026-10-20-record/REPORT.md`. Source file: `<scratchpad>/pmreport/index.html`.
- Current or obsolete: current as history. The record changed after it, at the consolidations of 10-22 and 11-03.
- Proposal: publish, because it was written for readers outside the project. Before it goes out, check it for names and session details that should not be public.

## Delete: 46 pages

### fortress-readme.md (first)
- Link: https://claude.ai/artifact/M9Ftx9PZPyc3MvvEgjtZhi. Last updated 2026-08-21.
- What it is: the first draft of the new README.
- Note: `README.md`, and `explorations/readme-plan.md`. Read this time.
- Current or obsolete: obsolete. The README was revised from batched feedback and an adversarial review (`3595f511d`, 08-22) and has changed since.
- Proposal: delete, because the README in the tree replaces it.

### fortress-authorship.md
- Link: https://claude.ai/artifact/4RyE4UmSbtRucMyLQZ1Udf. Last updated 2026-08-21.
- What it is: the authorship map's Markdown, published as it was.
- Note: `research/authorship.md`.
- Current or obsolete: obsolete. The note had corrections after it (`6beb45ec7`, `796ae4bfb`).
- Proposal: delete, because the note holds its content and "Who Wrote Fortress" is the same text formatted.

### Who Wrote Fortress
- Link: https://claude.ai/artifact/ATBiCfvep5rQxdngqbzCx7. Last updated 2026-08-22.
- What it is: the authorship map of the 2007 to 2012 history, formatted, at commit `6eea09644`. Read this time.
- Note: `research/authorship.md`.
- Current or obsolete: current in substance, since it is history, but it may lag the note.
- Proposal: delete. The note holds the content, and GitHub already renders the Markdown for outside readers. If he wants a formatted page, it should be built again from the note.

### SteeleGoogleTechTalk2015-extract.md
- Link: https://claude.ai/artifact/7y9bbTpKJV1LK9KDHQ8SNQ. Last updated 2026-08-22.
- What it is: the draft extract of Steele's 2015 Google TechTalk.
- Note: `research/extracts/SteeleGoogleTechTalk2015-extract.md` (`6d3c23044`).
- Current or obsolete: the note is the current text.
- Proposal: delete, because the note holds it.

### Seventeen Findings
- Link: https://claude.ai/artifact/CKbWpi379ne4EwQGN2RwfY. Last updated 2026-08-22.
- What it is: an independent reader's adversarial review of the draft README, with seventeen findings in order of severity. Read this time.
- Note: none. Its fixes went into the README's revision `3595f511d`.
- Current or obsolete: obsolete, because that draft was revised.
- Proposal: delete. It was a one-off review that the revision overtook.

### fortress-readme.md (second)
- Link: https://claude.ai/artifact/FHEA7ePUS6fALjbzVy74n2. Last updated 2026-08-22.
- What it is: the revised draft of the README. Read this time.
- Note: `README.md`.
- Current or obsolete: obsolete, because the README in the tree changed after it.
- Proposal: delete.

### C2 Proposal
- Link: https://claude.ai/artifact/MFah44WyQR8hBGNr23d8ei. Last updated 2026-08-23.
- What it is: the proposal for the C2 history pass and its tags.
- Note: `explorations/c2-proposal.md`.
- Current or obsolete: obsolete. It was carried out (`d73415020`, 08-23).
- Proposal: delete.

### microgpt.fss
- Link: https://claude.ai/artifact/MNUg26izZWXgU2ieWtwfWw. Last updated 2026-08-23.
- What it is: the first feasibility map of porting microGPT: what the 2012 tree had, what was missing, and the first measurements. Read this time.
- Note: `explorations/microgpt-port.md`.
- Current or obsolete: obsolete. The port was done on 08-24.
- Proposal: delete.

### The Expressiveness Audit
- Link: https://claude.ai/artifact/1quusPdcRtSTPpM987ojNR. Last updated 2026-08-27.
- What it is: the specification audit made during the microGPT native exploration.
- Note: `explorations/expressiveness-review.md`, with probes in `explorations/spec-probes/`.
- Current or obsolete: obsolete. The gap ledger and the climb batches took over its findings.
- Proposal: delete.

### Astra microGPT Review
- Link: https://claude.ai/artifact/WYRR3MRwSvyCVUzFdYL4PL. Last updated 2026-09-08.
- What it is: the first-phase review of Astra's microGPT.
- Note: `explorations/reviews/astra-phase1.md`, and `astra-vs-ours.md`.
- Current or obsolete: obsolete, because the experiment ended with Run C4.
- Proposal: delete.

### Blinded Fable microGPT Review
- Link: https://claude.ai/artifact/XPg9WWNsRbxuxhfrDnHZPG. Last updated 2026-09-08.
- What it is: the first-phase review of the blinded Fable run.
- Note: `explorations/reviews/blinded-fable-phase1.md`.
- Current or obsolete: obsolete, for the same reason.
- Proposal: delete.

### Phase 2 — Run B vs Run B2
- Link: https://claude.ai/artifact/HBnvSidq7osUSzQX2zykrP. Last updated 2026-09-09.
- What it is: the second-phase comparison of Runs B and B2, figure pair by figure pair.
- Note: `explorations/reviews/run-b-vs-run-b2.md`.
- Current or obsolete: obsolete, because the runs that followed replaced the matrix-level design.
- Proposal: delete.

### Run B Brief
- Link: https://claude.ai/artifact/GpRBHc7KJXkhpfBiSVdBZ2. Last updated 2026-09-09.
- What it is: the brief of Run B.
- Note: `explorations/experiment/RUN_B_BRIEF.md`.
- Current or obsolete: obsolete. The run is done.
- Proposal: delete.

### C2 against C3
- Link: https://claude.ai/artifact/9FE3N2zPmBwh5vKevQ77Z3. Last updated 2026-09-14.
- What it is: the second-phase comparison of rounds two and three of Run C.
- Note: `explorations/reviews/run-c2-vs-run-c3.md`, and `run-c2-vs-run-c3-pairs/pairs.md`.
- Current or obsolete: obsolete. C4 merged the two (`explorations/microgpt-run-c-handover.md`, line 26).
- Proposal: delete.

### Run C3 tour
- Link: https://claude.ai/artifact/4hDs4RCHdpGvsr1XStQLdP. Last updated 2026-09-14.
- What it is: the tour of Run C3's program.
- Note: `explorations/run-c3/tour.md`.
- Current or obsolete: obsolete, since C4 replaced it.
- Proposal: delete.

### Run C round two tour
- Link: https://claude.ai/artifact/DTNH6y8LB4hzf1tDazrioY. Last updated 2026-09-14.
- What it is: the tour of Run C2's program.
- Note: `explorations/run-c/tour.md`.
- Current or obsolete: obsolete, since C4 replaced it.
- Proposal: delete.

### Tears in the Rain, Kept
- Link: https://claude.ai/artifact/2BxPgBDP6o9juUevEqoBLi. Last updated 2026-09-15.
- What it is: the dialogue around the close of the APL side quest and rung 4b, written so that it is not lost.
- Note: `explorations/conversations/01-apl-close-and-rung-4b.md`.
- Current or obsolete: current as history.
- Proposal: delete, because the note holds it word for word.

### Checking Sized Types
- Link: https://claude.ai/artifact/MfPfY1F2HWQD8AeCKRGyLh. Last updated 2026-09-16.
- What it is: the plan for checking sizes, the `nat` static parameters, in the compiled checker, with a guide for the reader.
- Note: `explorations/reviews/nat-checking-plan.md`.
- Current or obsolete: obsolete. It was built by the nat-checker rung (`explorations/compile-ladder/rung-nat-checker/REPORT.md`; F-20).
- Proposal: delete.

### Checking Grammar Templates
- Link: https://claude.ai/artifact/VyHw7JbVyPXHAvadKWaCGc. Last updated 2026-09-16.
- What it is: the plan for checking the DSL grammar templates in the type checker.
- Note: `explorations/reviews/template-checking-plan.md`.
- Current or obsolete: obsolete as a plan of 16 September. The record names no build of it, and the grammars' known gaps are in the gap ledger's section 13, "Syntax extension: grammars, templates and sub-languages".
- Proposal: delete, because the note holds it and the ledger holds the gaps.

### Fortress Revival Plan
- Link: https://claude.ai/artifact/3CKVcCdTRC5SJA2hz5Fk5C. Last updated 2026-09-26.
- What it is: the plan that he approved on 26 September (P-33).
- Note: `explorations/coordinator/PLAN.md`, with its history in `PLAN-history.md` and its inventory `explorations/coordinator/open-items-2026-09-26.md`.
- Current or obsolete: obsolete. PLAN has been rewritten and consolidated since.
- Proposal: delete.

### Sized arrays in C4
- Link: https://claude.ai/artifact/AVgmYY7qHT7sPbd7EgXbcn. Last updated 2026-09-27.
- What it is: decision D's diff, which gives every array that C4 computes a sized type.
- Note: `explorations/reviews/decision-d-diff.md`.
- Current or obsolete: obsolete. Decision D is still open (PLAN.md, "The model's sized types (decision D)"; review-queue item 37), but PLAN asks for it from the diff re-based since, 21 model lines out and 29 in, and not from this page's diff.
- Proposal: delete. When decision D comes to him, a new page from the re-based diff serves it.

### AnyIntegral comprises clause
- Link: https://claude.ai/artifact/QacjMrh2u5BfnihHkA4pPg. Last updated 2026-09-28.
- What it is: the judgement on how the compiled checker reads `AnyIntegral`'s `comprises` clause.
- Note: `explorations/reviews/anyintegral-comprises-judgement.md` and `anyintegral-comprises-ways.md`.
- Current or obsolete: obsolete as a question. It is built and recorded (P-44, F-62). The team's commented clause is a separate open item (F-121; review-queue item 284).
- Proposal: delete.

### Fortress Decisions Audit
- Link: https://claude.ai/artifact/PTmiCvuVBg2gY39MCbUsWW. Last updated 2026-09-29.
- What it is: the Fable review of his decisions up to 29 September, with options for each.
- Note: `explorations/reviews/decisions-review/judgement.md`.
- Current or obsolete: obsolete. He answered all its items on 09-29 (`PLAN-history.md`, line 298), and the POSITIONS audit and the foundations review came after it.
- Proposal: delete.

### Batch 10 Blind Designs
- Link: https://claude.ai/artifact/Wy1hJLharoRXVa2uZsr2m6. Last updated 2026-10-03.
- What it is: an explainer comparing the six blind designs of batch 10's workflow with the pipeline and its token measurement.
- Note: `explorations/coordinator/process-engineering/design-batch10-*.md` and `README.md`.
- Current or obsolete: obsolete. `batch-redesign.md` settled it, and the README says that the page was not updated.
- Proposal: delete.

### fortress-repo Skill
- Link: https://claude.ai/artifact/M2pe3bP62yWDQcsByhbrt1. Last updated 2026-10-04.
- What it is: the first page of the whole `fortress-repo` skill, published from the same source as "Skills Review Page".
- Note: the skill itself, `.claude/skills/fortress-repo/`.
- Current or obsolete: obsolete. The skill was rewritten on 10-08 and has changed at almost every landing since.
- Proposal: delete.

### Curator Review Style
- Link: https://claude.ai/artifact/2EvTuK2vuNaq98ZEPPNM14. Last updated 2026-10-08.
- What it is: how he reviewed the `fortress-repo` skill from 5 to 8 October, read from his comments.
- Note: `explorations/reviews/skills-review-style.md`.
- Current or obsolete: current as history. The skill writer's method took it in.
- Proposal: delete.

### Skill Parts Outline
- Link: https://claude.ai/artifact/MT9ysynYhgGsJCVXvCW9LE. Last updated 2026-10-08.
- What it is: the outline of what changed in each part of the `fortress-repo` skill.
- Note: `explorations/reviews/fortress-repo-outline.md`.
- Current or obsolete: obsolete. The rewrite was done.
- Proposal: delete.

### Build Changes Review
- Link: https://claude.ai/artifact/HBUWTwZeGxtyfEkYaVxidu. Last updated 2026-10-08.
- What it is: the build changes of 8 October, each with what it changes, for his review.
- Note: `explorations/coordinator/process-engineering/build-efficiency.md`. Source file: `<scratchpad>/build-page/build-changes.html`.
- Current or obsolete: obsolete. The changes landed (`4e0f34421`, `840368f92`), and the skill's build part holds the present.
- Proposal: delete.

### Skills Review Page
- Link: https://claude.ai/artifact/Deuc1PeTurWDLqo2KCAPSp. Last updated 2026-10-09.
- What it is: the whole `fortress-repo` skill, as it was then, on one page for his review. It was republished 80 times and holds his 68 comments in 35 threads.
- Note: the skill itself, and `explorations/reviews/skills-review-style.md` for his comments. Source file: `<scratchpad>/skill-page/index.html`.
- Current or obsolete: obsolete, for the same reason as the first skill page.
- Proposal: delete, after his comments are saved. He said at 12:3x on 11-05 that the whole-skill form was useful; if he wants it again, it should be built afresh from the current skill, not from this page.

### Corrective Measures Judged
- Link: https://claude.ai/artifact/8zgYmsZQGpasKYihA1K16c. Last updated 2026-10-10.
- What it is: whether the four corrective measures of 8 October did what each was for, judged on climb batch 11.
- Note: `explorations/coordinator/process-engineering/measures-judgement.md`. Source file: `<scratchpad>/measures-judgement/page.html`.
- Current or obsolete: current as history.
- Proposal: delete.

### Fortress Review Backlog
- Link: https://claude.ai/artifact/YMMw5hPdCDjsXycG5cDHAY. Last updated 2026-10-10.
- What it is: every item that waited for his review on 10 October, sorted into three groups.
- Note: `explorations/coordinator/review-queue.md`, which replaced it. Source file: `<scratchpad>/review-backlog/page.html`.
- Current or obsolete: obsolete. The queue was cleaned up on 11-05 (`bd06be5b8`).
- Proposal: delete.

### Coordinator Records Map
- Link: https://claude.ai/artifact/27GNUcSvdoTnHFcxmTtyjH. Last updated 2026-10-11.
- What it is: the map of the coordinator's records before the coordinator skill's rewrite.
- Note: `explorations/coordinator/process-engineering/coordinator-shape.md`.
- Current or obsolete: obsolete. The rewrite landed.
- Proposal: delete.

### Coordinator Rules Sorted
- Link: https://claude.ai/artifact/WoDrCFWNNso5YeLr9kuwvR. Last updated 2026-10-12.
- What it is: the 73 conduct rules sorted against the baseline interview into what the model does by default, what this environment needs and what this project needs. It holds his 19 comments.
- Note: `explorations/coordinator/process-engineering/rule-sort.md`. `HELD.md` (line 160) gives each of his comments in one line in the coordinator's words. Source file: `<scratchpad>/rule-sort/page.html`.
- Current or obsolete: obsolete. The coordinator skill's rewrite used it.
- Proposal: delete, after his comments are saved word for word, because `HELD.md` keeps only a summary of each.

### Rules Against Baseline
- Link: https://claude.ai/artifact/J65yvTm5iBTNasbQVhqpHp. Last updated 2026-10-12.
- What it is: the second sort of the same rules, into five groups.
- Note: `explorations/coordinator/process-engineering/rule-sort-b.md`. Source file: `<scratchpad>/rule-sort/page-b.html`.
- Current or obsolete: obsolete, for the same reason.
- Proposal: delete.

### Record Rule Draft
- Link: https://claude.ai/artifact/17GstfC5tE8dttd8wWRRS6. Last updated 2026-10-13.
- What it is: the draft of the coordinator skill's record-keeping part, at version 5. It holds his nine comments.
- Note: `explorations/coordinator/process-engineering/record-rule-draft.md`. `HELD.md` (line 150) gives his comments in one line each. Source file: `<scratchpad>/record-rule/page.html`.
- Current or obsolete: obsolete. The part landed as the coordinator skill's `references/record.md`.
- Proposal: delete, after his comments are saved word for word.

### Record Store Design
- Link: https://claude.ai/artifact/TjJEBW5xsPP79vaEb8FVMu. Last updated 2026-10-13.
- What it is: six ways to store and write FACTS, POSITIONS and their history, with a recommendation.
- Note: `explorations/coordinator/process-engineering/record-store-design.md` and `record-store-review.md`. Source file: `<scratchpad>/record-store/page.html`.
- Current or obsolete: obsolete. The design was built as `explorations/coordinator/tools/record.py`.
- Proposal: delete.

### Coordinator Skill Outline
- Link: https://claude.ai/artifact/WbgLTmo2VXYjWHoa56BJSA. Last updated 2026-10-13.
- What it is: the outline of the new coordinator skill, a core and six parts.
- Note: `explorations/coordinator/process-engineering/coordinator-skill-outline.md`. Source file: `<scratchpad>/skill-outline/page.html`.
- Current or obsolete: obsolete. The skill was built from it and has changed since.
- Proposal: delete.

### Overnight Run, 13 October
- Link: https://claude.ai/artifact/Sy6JBLaZqhLTJnUyYXBQoA. Last updated 2026-10-13.
- What it is: the report on the night's consolidation of FACTS and POSITIONS, from 360.6K characters to 124.1K.
- Note: `explorations/coordinator/process-engineering/facts-consolidation-check.md`, and the slices `facts-slice-1.md` to `facts-slice-7.md`. Source file: `<scratchpad>/morning/page.html`.
- Current or obsolete: current as history. Later consolidations changed the record again.
- Proposal: delete.

### Batch 14 Landed
- Link: https://claude.ai/artifact/LHXrdcJVC8gcWQRR53W4fN. Last updated 2026-10-14.
- What it is: climb batch 14's final report.
- Note: `explorations/reviews/batch-14-review.md`, `explorations/coordinator/CLIMB-BATCH-14.md` and `climb-batch-14-review.md`. Source file: `<scratchpad>/batch14/page.html`.
- Current or obsolete: current as history.
- Proposal: delete. Pages per landing were dropped later (the drafts page's version 9, draft 3b).

### Batch 15 Landed
- Link: https://claude.ai/artifact/HLAZAnxuhm17f58NMzKqeu. Last updated 2026-10-14.
- What it is: climb batch 15's final report.
- Note: `explorations/reviews/batch-15-review.md`, `CLIMB-BATCH-15.md` and `climb-batch-15-review.md`. Source file: `<scratchpad>/batch15/page.html`.
- Current or obsolete: current as history.
- Proposal: delete.

### Review Item 1 Drafts
- Link: https://claude.ai/artifact/XXBj1nCCADReEGXspFG2Tg. Last updated 2026-10-20.
- What it is: four fresh drafters' texts of review-queue item 31, the element bound of `Vector` and `Matrix`, word for word.
- Note: `explorations/reviews/item31-drafts.md`. Source file: `<scratchpad>/haiku-window/page31/index.html`.
- Current or obsolete: the drafts are history. Item 31 is still in the queue with its default, "the one bound, as built" (`review-queue.md`, line 50).
- Proposal: delete. When item 31 comes to him, it comes as an ask in the current form, not from these drafts.

### POSITIONS Audit Trial
- Link: https://claude.ai/artifact/XSW5Pz56938NcmCPg4GMZb. Last updated 2026-10-22.
- What it is: the POSITIONS audit, its trial and its full run, with his comments.
- Note: `explorations/coordinator/positions-audit/` (`trial/RESULTS.md`, `full/RESULTS.md`), with his comments in `positions-audit/evidence/curator-comments-2026-10-21.md`. Source file: `<scratchpad>/auditpage/index.html`.
- Current or obsolete: obsolete. The audit was applied in the consolidation of 10-22 (`POSITIONS-history.md`).
- Proposal: delete. His comments are already saved in the record.

### Foundations Review Verdict
- Link: https://claude.ai/artifact/6VahEN8k6uySguRuxcTWJk. Last updated 2026-10-26.
- What it is: the foundations judgement's section for him, in plain words: whether the nine tenets that the revival rests on hold, and the decisions to take.
- Note: `explorations/reviews/foundations/judgement.md` and `rewrite-results.md`. Source file: `<scratchpad>/foundations/page.html`.
- Current or obsolete: overtaken. The POSITIONS rewrite after it landed, and what is still open moved to the corrections page.
- Proposal: delete.

### Revival Page Outlines
- Link: https://claude.ai/artifact/495PSP3WkiMFGVeXZp2PBq. Last updated 2026-11-03.
- What it is: the revival page as outlines, version 20 against version 24, for his choice of its shape.
- Note: `explorations/coordinator/postmortem-2026-10-28/revival-page-outlines.md`. Source file: `<scratchpad>/revivalpage/outlines-page.html`.
- Current or obsolete: obsolete. The page was rebuilt to a new shape on 11-05.
- Proposal: delete.

### Record and Skills Timeline
- Link: https://claude.ai/artifact/C84jo1st8THBQxm6aLThDi. Last updated 2026-11-03.
- What it is: the record and the skills from 17 October to 3 November, as a timeline with his words.
- Note: `explorations/coordinator/process-engineering/timeline-2026-10-17-to-11-03.md`. Source file: `<scratchpad>/timeline/page.html`.
- Current or obsolete: current as history. Its corrections to the docket were used, and the working rules it was for landed on 11-05 (`f898915bc`).
- Proposal: delete.

### Revival Page Proposal
- Link: https://claude.ai/artifact/AvjRxsrtdxDbzz9q2qQJZe. Last updated 2026-11-04.
- What it is: the proposal for the revival page's new shape, ten sections, with five open choices.
- Note: `explorations/coordinator/process-engineering/revival-page-proposal-2026-11-03.md`, and the blinded review `revival-page-blind-review-2026-11-04.md`. Source file: `<scratchpad>/revivalpage/proposal-page.html`.
- Current or obsolete: obsolete. The rebuild that it proposed landed on 11-05.
- Proposal: delete.

## Counts

- Keep: 6.
- Publish: 13, of which two need a refresh first ("Run C4 tour" and "Fortress, Characterized"), and three form one group of articles from which he may take only one.
- Delete: 46. Three of them hold his comments, which the record may keep only in summary: "Skills Review Page", "Coordinator Rules Sorted" and "Record Rule Draft". "Foundations Corrections Baseline", kept for now, holds his comments too.
- In all: 65.

Pages that the record names but the listing no longer shows were deleted earlier: the old drafts page (`LwjYdr5x6iSVVEgwKMic1m`, deleted on 11-05), the 28 October post-mortem's page (`EHHQiET94YTmEH4MNYgjKg`, deleted at his word of 19:0x on 11-03), and three pages deleted between 4 and 11 October (`Xn31FRo3USai9SMutzMHiS`, `YaxDZv482kboVsNyfQ8D9E` and `38mY2r76aRDmfjn8tME7A3`, by the coordinator's own Artifact calls in `<scratchpad>/arts.json`). The two pages that `explorations/microgpt-run-c-handover.md` cites under `claude.ai/code/artifact/` (the C2 against C3 pairs and the B against B2 comparison) are not in the listing either. They were not checked further.

## The mechanics, for him

**How a page relates to the repository.** A page is one HTML file that claude.ai holds, private to him unless he shares it. The coordinator or a worker writes the file, usually in the session's scratchpad, from a note in the tree, and publishes it with the Artifact tool. The tree keeps the note, not the HTML. The only exception is the revival page, whose HTML is in the tree (`process-engineering/revival-story.html`). A republish replaces the page's content at the same link, and comments stay with the page. A delete removes the page, its versions and its comments for good.

**What the read gives back.** A read of a page returns the live version, wrapped by the service in a document skeleton: a doctype, a head with the charset and the viewport, a small default style, and a body. A read with a published path, such as `index.html`, saves that file to disk and prints it only when it is small. So a large page costs almost nothing to fetch. Images are mostly embedded in the HTML as data, which is why the three articles weigh 1.5 MB to 2.9 MB. A page with separate files, as the revival page has with its chart, needs those files read as well.

**What publishing under `docs/` takes, for a page whose source is gone.**
1. Read the live page by its published path into a folder, as above.
2. Strip the service's wrapper, so that the page's own `<title>` and its body remain.
3. Wrap that in a document skeleton of its own, in `docs/<name>/index.html`. `explorations/coordinator/tools/revival-page/update.py`, in `write_pages()`, does this for the revival page: a doctype, a head with the charset, the viewport and the title, then the rest of the file unchanged as the body.
4. Fix what only works on claude.ai. Relative links to repository paths, such as `explorations/repo-internals.md`, break on GitHub Pages and should become `https://github.com/palimondo/fortress/blob/main/<path>`. The Select buttons of the house style send text to a claude.ai comment and do nothing on GitHub Pages, so they should be removed. Google Fonts and inline styles work as they are.
5. Check the text for what should not be public: people's names outside the published papers, session IDs, scratchpad paths, and his own messages.
6. Give `docs/` a real index. Today `docs/index.html` only redirects to `revival-story/`, and `update.py` writes that redirect again at each run, so the script must change before a second page can be listed.
7. Commit by name and push `main`. GitHub Pages serves `docs/` from `main`.

A page whose source is still in the scratchpad takes the same steps, but the read stays the authority, because the live page can differ from the last local file.

**What it costs.** Reads cost almost nothing, because cached reads are almost free on his plan. A copy done by a script, with no text rewritten, costs on the order of 10K to 30K tokens written for the script once, and a few thousand for each page after that. That covers 11 of the 13 pages to publish. A refresh by a writer costs much more. "Fortress, Characterized", checked against FACTS and a gap ledger of more than 600 rows, is on the order of 0.2M to 0.4M tokens written. The C4 tour, checked row by row against today's sources, is on the order of 0.05M to 0.15M. These two figures are estimates, not measurements. A published page does not update itself: if it should stay current, it needs a step at each landing, as the revival page has. Otherwise it should say on its first line that it is dated.

**Before a delete.** List the page's comment threads with the comment tool and save any of his words that the record does not hold. Then delete it on his word. A delete cannot be undone.
