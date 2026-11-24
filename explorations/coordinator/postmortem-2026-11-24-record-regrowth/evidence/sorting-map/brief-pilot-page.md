<!-- The brief of the Opus worker that builds and publishes the page of the consolidation's pilot for the curator, 2026-11-24. -->

# The pilot's page

Load the `fortress-repo` skill, then the `artifact-design` skill. From the `coordinator` skill read only `SKILL.md`, the sections "Talking to the curator" and "Pages": the page follows them. You write no file in the repository and nothing to FACTS, POSITIONS or the gap ledger. Your working folder is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/pilot-page/`.

## What the page is for

The curator ordered a consolidation of the whole of FACTS (339 entries, 427K characters), the file of what is established about the tree. The method: each entry holds one subject that can be kept up to date on its own; a claim that another entry owns becomes a pointer to that entry; what is history, plan, a defect's description or detail of the work moves to its home (the history file, the gap ledger's row, the report). Before the whole record is rewritten, he reads a pilot in two rounds: round 1, a mix with one case of each kind that the sorting found; round 2, one whole chunk, the 30 entries on inference. He reads the page in the morning, on a phone, mostly by listening, and then says go or no for the whole record. His question to the page: does the consolidation work on each kind of entry? Is the result smaller, clear, and is nothing lost?

The pilot was written twice, and the page shows both ways side by side for each case:

- **by the workflow**: the batch mode's workflow script on its first run, which runs the clarity workflow (an assessor, a writer, two cold readers, a checker, one fix round, a judge) on the entries named;
- **by hand**: one Opus writer for each round, briefed by the coordinator to follow the sorting map's disposition for each entry, then checked by a cold reader and a checker, and fixed once.

## The material (all under `explorations/coordinator/postmortem-2026-11-24-record-regrowth/`)

- The sorting: `evidence/sorting-map/MAP.md`, sections 1 and 2 (the numbers and what they mean), section 5 (each entry's disposition) and section 7 (the pilot's cases and their kinds); `map.json` beside it.
- By hand: `evidence/pilot-2/round-1.md` and `round-2.md` (each case with its new texts, the sizes, where each claim went, where the writer did not follow the map and why, and "After the checks"); `round-1.apply`, `round-2.apply`; the checks `checks-coldread.md` and `checks-check.md`.
- By the workflow: `evidence/pilot-workflow/chunks/pilot-1/` and `chunks/inference/`: `assessment.md` (each entry's disposition by the assessor, the entries marked keep among them), `proposals.md`, `final.apply`, `check.md`, `cold-read.md`, `cold-read-2.md`, `judgement.md`, `queue.md`.
- What the workflow could not do, by design: `adjustments/record-batch/README.md`, "How the map reaches the writer" and the points after it. In short: its writer cannot move a claim to an entry outside its chunk; it does not rewrite an entry that its assessor marks keep; its checker compares an entry only with its own old text; no file of its output lists where each claim went; and the map reaches the writer only as data, since no brief of the clarity workflow tells the writer to follow a disposition.
- The old texts: FACTS on `main`, which is unchanged: `explorations/coordinator/tools/facts-extract.sh 'F-N'`.
- The house style: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/landing-restatement/build.py` is the source of the page that he reads now. Take its CSS, its Select script (a Select button beside each section's heading and beside each item) and its helpers. Write your own `build.py` in your folder, which writes `page.html`.

## The page

Title: "Consolidation pilot". Sections, each with a Select button; each case and each entry an item with its own Select button:

1. **What this page shows**: three or four sentences, and how to read an item.
2. **The numbers**: the sorting's numbers in a few lines (the claims by kind, how many entries stay, are split, are merged, are not about the tree); then one table: for each round and each way, the entries before and after and the characters before and after. For the hand rounds give also the characters that wait for other chunks. Count the workflow's sizes yourself from `final.apply` against the old texts.
3. **Round 1, case by case**: for each case, its kind in plain words and what the sorting said to do with it. Then each entry of the case as an item: the entry's number with its subject in a few words; the new text by hand, whole; the new text by the workflow, whole, or the sentence that the workflow's assessor kept the entry as it is; one or two sentences on how the two differ; where each claim that left the entry went (a short list: the claim in a few words, then its new home); the old text, folded (`<details>`). Where a hand writer did not follow the map, say so in the item, with its reason.
4. **Round 2, the chunk on inference**: the merges first (which entry went into which, for each way), then each entry as an item in the same form. The seven entries that the hand round merged away appear under their owner.
5. **What the checks found**: for the hand rounds, the counts and each failure in one line with what the writer did; for the workflow, what its checker and cold readers raised and what its judge ruled. One finding to state plainly: the entry on the overloading check's memo (F-43) is false today, since a fix of 2026-10-02 changed what it describes; the hand writer reworded it to what is true, and one scenario of the test rests on the old text.
6. **Where the two ways differ, as a whole**: what the workflow did not do that the map asked (name the cases: the parts that should move to an entry outside the chunk, the entries that it kept), what the hand writers did that the map did not ask, and what each way leaves for later (ledger rows whose text must change, claims that wait for other chunks, claims to investigate). Facts only: no recommendation.
7. **The test of decisions**: a short section that says what the test is (fresh readers decide twelve scenarios from the old entries and from the new ones, and a grader scores them blind) and that its result is added when it ends. Give this section the id `test` and keep its body in one function of `build.py`, since the coordinator adds the result later.

Rules for the text:

- The page names "the coordinator" and "the curator", never "you" and never "we".
- Plain short sentences, halfway to ASD-STE100. Define each term where it is used. An entry number never stands alone: give its subject in a few words at its first use in each section.
- No file name, path, commit hash or rule number inside a sentence. Put a section's references at its bottom, numbered by item, outside the Select range.
- A table is fine where it helps. Entry texts keep their own words and code formatting.
- Put no question to the curator on the page. The writers' and the judge's questions for him go in your final message, not on the page.
- The page must work at a width of 400 px with no sideways scroll of the body, in the light and the dark theme. Check it with Playwright (the house style's `check.js` shows how), and look at one screenshot.

## Publishing

Publish `page.html` with the Artifact tool as a new page (no `url`), with the icon word "document". Then give in your final message: the page's URL; the table of sizes; the questions for the curator that the writers and the judge raised, each in one line; and anything in the material that contradicts another part of it.
