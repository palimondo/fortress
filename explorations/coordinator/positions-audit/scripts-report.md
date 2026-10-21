<!-- The POSITIONS audit's scripts (tools/: an entry's trail, his messages near a time, a quote check, an entry's leads, the sort of the 85 entries): the Opus worker's report of 2026-10-21, word for word, with its tests on P-86, its three hand checks and the sort's counts. -->

# The audit's scripts: the Opus worker's report

The report of the Opus worker that wrote the scripts now in `tools/`, launched at about 18:26 UTC on 2026-10-21 from `scout-search-study.md`, returned at about 18:52 UTC. Word for word. Its paths name the session's scratch folder, where it wrote; the scripts were copied unchanged into `tools/`, and `tests.py` passed there too (0 failed). The sort it names is `sort-2026-10-21.txt`.

All four scripts and the sort are written and pass every test on P-86's known answers (tests.py: 18 PASS, 0 FAIL). P-86 comes out marked doc and bulk. Nothing in the repository was edited.

Everything is in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/provenance/opus/. Each script runs as `python3 -I <script>` and prints help with `--help`. The library is plib.py for the record and tlib.py for the transcripts; tlib imports show.py read-only. The cache is in cache/.

**1. trail.py N [--short]**
- Prints the entry's text at HEAD.
- Prints its blocks in POSITIONS-history.md, each with the commit that wrote it: the oldest commit whose history file holds the block's provenance line. P-86's :858 block was written by ab933086b, not by fbc4c4954, which it cites.
- Then the commits, oldest first. The commit list comes from `git log --full-history --parents`, and each commit's own tree is read, so side branches and merges count.
- Per commit: hash, UTC author time (commit time too if it differs), subject, and one of created, changed, moved to history, archived, re-created, restored, removed, renumbered or section moved.
- It also shows how the commit was linked to the text before it. Three ways are exact: same P-number, line n became P-n at the numbering, or a history comment the commit added names the new bold title. The fourth is similarity, printed with its score, the threshold, the next-best candidate, whether it is in the same place in the file, and the longest run of shared words.
- It gives the other entries the commit changed, and the reasons: the blocks it wrote, the comments and notes above copies of the text, and the first 8 lines of the commit message plus any line naming the entry.
- It ends by checking the numbering block's "earlier texts" lines. All 15 such pointers across the 85 entries are texts of their trails.
- P-86 gives exactly fbc4c4954 created, 892687076 changed (similarity 0.90), 03f215fe4 moved to history, bc8902f47 re-created (0.75), a88e52bf7 renumbered, ab933086b changed (by number). Other entries changed: 0, 19, 13, 135, 23, 27. The study has 134 for bc8902f47 because it counted max(added, removed); I count new + removed − pairs.

**2. near.py TIME [WINDOW] [--cut N]** (window default 60m)
- Lists his messages in the window, using show.py's own loader, with time, source, session and full text.
- Under each, it prints the coordinator's last text in the same session before it, with the file:line of its first copy (duplicates removed by uuid).
- It skips the coordinator's replies to Stop-hook feedback. Without that, the "." at 10:15:11.977 would have been taken for the message he answered.
- Test: before 10:22:23Z it gives his 10:14:05.953 and his "Yes. … Run Fable judgement as well." at 10:21:32.097. Before the Yes it gives the coordinator's ask at 10:14:55.886 (backup copy 001.jsonl:6723, ending "I recommend yes"). His queued 05:24:08.253 message (2512 characters) is found too.

**3. quote.py "QUOTE" TIME**
- Answers EXACT, NORMALISED (whitespace collapsed, U+2019 made a straight apostrophe, nothing else) or NO MATCH. For NO MATCH it prints the longest run of the quote's words found.
- "Run Fable judgement as well." at 10:21:32: EXACT. "Yes.  Run Fable…": NORMALISED. "We don't have a link to those slides" at 2026-08-18T23:33:18: NORMALISED (apostrophe). "Yes, keep the checks as a standing rule…": NO MATCH, 1 of 13 words.

**4. leads.py N [--window 30m] [--cut 1500]**
- Prints the trail, then near.py's output for 30 minutes before each commit that created, changed, re-created or restored the text. A message already printed is named, not repeated. Last, it lists the times of his words that the blocks name.
- On P-86 it shows 4 messages before fbc4c4954 (including the Yes) and 9 before bc8902f47 (including the queued 05:24 instruction).

**Thresholds** (calib.py prints how they were set)
- T_PAIR = 0.30, for a mutual best match within one commit. On the 226 exact links, similarity alone agrees on 219, links wrongly 0 and leaves 7 unlinked. At 0.20 it would leave 4 unlinked but would then join P-48 to the PLAN item 30 entry (0.225), which the hand check shows is wrong.
- T_RECREATE = 0.40. Of the new texts that no pair explains, only P-86 scores high against an earlier text (0.747); the next is 0.195, so any cut between 0.2 and 0.74 gives the same result.
- Near-ties within 0.05: the text that stood in POSITIONS.md last is taken.

**Hand checks**
- **P-48:** the dd81491 link the study doubted (to "PLAN item 30", score 0.225) was wrong. `git show dd81491fd` adds P-48's dated text as a new line and moves item 30's entry to the history file under "Replaced 2026-09-29 … (the paper's instance rule of 17:34 UTC replaced item 30's instance…)". That is a decision superseded, not an earlier wording. My trail shows P-48 created there and prints that note.
- **P-79:** neither file mentions demos before dd81491fd; the pickaxe gives only dd81491fd and f502f5563. Created there is correct.
- **P-17:** the diffs of 258105b3e and 886a06e1d each replace the boxed-numerics line in place. The links (0.49 and 0.70) share a 37-word run word for word; correct.
- **Bugs these exposed, now fixed:** P-69 showed that titles containing ";" were split, so the link fell back to similarity 0.59 (now exact). P-37 showed a revert and reinstatement, now traced as created 581a29510, removed 8fcca6703, restored 3e85b709c.

**The sort** (sort.txt, 85 lines: number | title | marks | commits that made the text with their counts | links | evidence phrase)

| Mark | Count | Entries |
|---|---|---|
| doc | 38 | 10 12 32 33 38 39 42 44 47 49 50 51 52 53 54 55 56 57 58 59 62 67 69 70 73 74 76 77 78 80 86 88 89 90 91 97 123 125 |
| bulk | 6 | 9 10 16 18 28 86 |
| default | 8 | 45 55 60 75 85 98 123 151 |
| msg | 18 | (clock time named) |

- "Many" is 10 other entries. At 5 the bulk list adds 49 and 98 (8 entries); at 20 only 86 is left.
- Beyond your four marks: msg-date 13 (a date only), words 10 (his words with no date), and 6 entries with no source and none of his words (66 71 72 102 103 124).
- A document's section title such as "6. For Pavol" is not read as his words.

**What I could not do, and where the evidence is thin**
- 100 links in the 85 trails rest on similarity. The weakest are P-68 at dd81491fd (0.33, not in the same place; the history note calls it a replacement decision), P-32 (0.45) and P-67 (0.51, next best 0.41). I hand-checked only those named above.
- The re-creation threshold has one true case to test against, P-86.
- doc, msg and default are phrase matches on HEAD's history blocks and HEAD text. The pre-numbering texts in a74f5a2b7's history file are not read for the marks; P-86's first text quoted his "Yes".
- bulk follows the strict chain back to the latest creation, so one small commit anywhere in it removes the mark.
- near.py finds "the message he answered" by time within the session, not by the parentUuid chain. It skips only Stop-hook replies, so other injected prompts such as task notifications are not skipped. show.py's lists include pasted reports as "his".
- Commit-message reasons are cut to 8 lines plus lines naming the entry. Pre-numbering messages rarely name the entry, so a scout should read `git show -s`.
