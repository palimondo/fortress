<!-- The POSITIONS audit's scripts, second round (2026-10-21): the message he answered by the reply chain, pointers.py, homes.py, his page comments, hischeck.py, later.py, one leads command, a cache, struck entries and pinned tests; the Opus worker's two reports, word for word. -->

# The audit's scripts, second round: the Opus worker's reports

The Opus worker launched at 22:25 UTC on 2026-10-21 at the curator's word of 22:24 UTC (what a script can fetch, a script fetches), with item 8 added at 22:29 UTC (his later words). Its first report, then its follow-up after P-86 was struck (`93b7c921e`), word for word. The coordinator reran `tests.py` after the follow-up: 0 failed; one `leads.py 85 --out` took 2.5 s.

## First report

All eight items are done and tested. `tools/tests.py` passes 41 of 41 (it was 18). Nothing is committed; the only edits are in `explorations/coordinator/positions-audit/tools/`. The scratch outputs (timings, sample leads files) are in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/positions-audit/tools2/.

**Changed:** `tlib.py`, `near.py`, `leads.py`, `plib.py` (cache only), `quote.py` (one line), `tests.py`. **New:** `pointers.py`, `homes.py`, `comments.py`, `hischeck.py`, `later.py`.

**1. Reply chain (tlib/near).** It walks back along `parentUuid` (and `logicalParentUuid` across compactions) from his message.
- **Passed over:** Stop-hook replies, task and agent notifications, check-ins and system reminders. Tool results, compaction summaries and restart notices are passed through.
- **Printed:** the coordinator's whole turn after his previous message, every text of it, whole by default. It also gives one line per passed-over turn, the by-time answer when it differs, and the last lines of the three turns to him further back. A queued message starts where it was delivered.
- **Against the scouts:**
  - 10-14 19:06:22.989: 19:04:27.473. Agrees.
  - 09-26 10:21:32.097: 10:14:55.886 (001.jsonl:6723). Agrees.
  - 09-22 07:17:57.713: the turn holding 07:06:49.525 plus its 132-character closing line 07:07:10.631. Agrees; the 07:10:02 status line is passed over.
  - 10-16 16:42:39.606: **the chain disagrees.** It gives 16:34:05.053, the reply to his 16:33:47 message about the profile's grading. The scout's 15:55:06.719 is the second turn back, and the tool lists it ending "Recommendation: 3." By my reading the scout is right on meaning: "3 for the where clauses." picks option 3 of 15:55:06. 16:34:05 is just the last thing before it, on another topic.
- **Where the brief's rule fails:** passing over notification turns is sometimes wrong.
  - In 81 of the 346 messages whose nearest passed-over turn answers a task notification, that turn ends with an ask to him. Example: 10-10 21:13:24 "Go." answers 09:44:51, which ends "when you say go".
  - So the tool marks such turns and prints the newest one whole.
  - When he quotes lines ("> ..."), it finds the text he quoted on the chain. Of 315 such messages: 55 quote the answer, 22 a passed-over turn, 148 a text further back, and 90 quotes are not found.
  - Overall, the chain and the time method disagree for 534 of the 2,035 messages in the coordinating sessions.

**2. `pointers.py N [--at REV]`.** It searches the six coordinator files, `reviews/open-asks-*.md` and `.claude/skills/`, and leaves out the history files. It matches P-86 but not P-860, P-186 or xP-86, and marks ranges like "P-85 to P-88". Test at fa3931f42: P-86 is in 6 lines, as expected.

**3. `homes.py N [--at REV]`.** It splits the entry into clauses at top-level semicolons and finds the status clauses. For each, it ranks review-queue items and PLAN lines by shared terms (row, item, review-queue item, fork, way, batch, rung, backtick names, P-numbers, judge-review.1), with a bonus for naming the entry. Shared terms are printed. Test at fa3931f42: all five homes the writer found rank first (P-55 → items 30 and 31, P-85 `RR32` → 37, P-151 → 188 and 177).

**4. `comments.py N`, used by leads.** It matches the number, also as dictated (PE66 matches), or a quote of the title. Tests: P-66's 20:18 thread is found; a title-only heading and a "PE66" comment are matched; P-86 has none.

**5. `hischeck.py FILE...`.** `judgement.md` gives EXACT 45. A test file got one each of EXACT, NORMALISED, NO MATCH, NO MESSAGE and BAD FORM, with the 3 failing lines printed.

**6. `leads.py N --out PATH`.** One file with ten sections: the trail, his messages near each change with the whole answer, the block times, his later messages (item 8), pointers, homes and comments. P-86's file is about 91K characters (was 44K), because answers are now whole.

**7. Speed.** The old `leads.py 86` took 8.8–9.5 s and 664 MB here; I could not reproduce 71 s, and a cold disk read of the 637 MB of transcripts is the likely cause. The new run takes:

| Case | Time | Memory |
|---|---|---|
| Cache warm | 2.0–2.4 s | 192 MB |
| Live transcript changed | 3.3 s | 196 MB |
| All caches empty | 11.5 s | 619 MB |
| Six at once | 4.4 s in all | 191 MB each |

- **The cache:** one entry per transcript file, keyed by path, size and mtime (blob id for the `transcripts` branch). Writes are atomic, and an unreadable entry is rebuilt.
- **Why it is safe:** a test checks that the cached list equals `show.load()` (2,090 messages, same order).
- **The `plib` cache:** each new HEAD used to write a fresh 68 MB pickle. The key is now the last commit that touched the two POSITIONS files, and old entries are pruned. `cache/` went from 385 MB to 149 MB.

**8. `later.py N`, leads section 7.** It ranks his messages in the coordinating sessions from the entry's creation on, leaving out those leads already prints.
- **Terms:** title words beyond common ones and backtick names. They count whole in his own words and half in the exchange around his message.
- **Two bonuses:** naming the entry's number, and falling within 30 minutes before a commit that changed a file the entry names, in lines that hold a title term.
- **Test:** with P-148's text before tonight's rewrite (36f7db77c) and messages up to 20:54, his 10:28:25 and 10:29:05 rank 4 and 5 of 21; his 10:30:48 "smoke test" message ranks 2.
- **Candidates in leads at HEAD (15 printed at most):**

| Entry | Candidates | Printed |
|---|---|---|
| P-148 | 22 | 15 |
| P-150 | 1 | 1 |
| P-86 | 31 | 15 |

**What I could not do, or what is weak:**
- The chain cannot tell which question a short answer addresses when he answers an older one (the 16:42 case). It lists the earlier turns instead of choosing.
- The status words in `homes.py` are a phrase list, so expect some false hits, such as "left for".
- `later.py`'s commit bonus fires only for file names with an extension, so a folder name like `fortress-repo` does not trigger it. The two coordinating sessions (fe616d40, bdff267d) are hard-coded.
- The tests pin commits fa3931f42 and 36f7db77c, so they keep passing as the record changes.
- `scripts-report.md` is outside `tools/` and was not updated.

## Follow-up, after P-86 was struck

The scripts now handle a struck entry, and `tests.py` passes 44 of 44 (0 failed), pinned to 93b7c921e. Edits are only in `tools/`; nothing is committed.

**(1) Struck entries**
- **The trail:**
  - It now starts from the last commit that held the number. For P-86 that is b39657798, POSITIONS.md:93.
  - Its newest event is a new kind, `struck`, at the commit that removed it (93b7c921e). That event carries the reason from the history block the removal wrote (POSITIONS-history.md:1450), and says that the text stands word for word in the history file.
  - The new function is `plib.find_entry`. `head_entry` is unchanged.
- **`trail.py`:** a struck entry opens with "P-86: STRUCK. It is not in POSITIONS.md at HEAD … Removed by 93b7c921e … traced from b39657798 …", then the reason. Section 1 becomes "The text as it last stood, at b39657798".
- **`leads.py`:** it shows the same top lines. Section 5 now also prints his messages in the 30 minutes before the strike.
- **`later.py` and `homes.py`:** both read the entry as it last stood and say STRUCK.
- **`comments.py`:** it takes the title from the last text.
- **`sort.py`:** the marks start with `struck`, and the removal's own history block is not counted as a source. For P-86: struck, doc, bulk.
- **Renumbered elsewhere:** if a struck number's text still stands under another number, the trail says so.

**(2) Pinning**
- `plib.World(rev=…)` builds the record as one commit holds it.
- `trail.py`, `leads.py`, `pointers.py` and `homes.py` take `--at REV`. With `leads.py --at`, his messages are cut off at that commit's time.
- In `tests.py`, every check on the record is pinned:
  - the trail, history-block and sort checks, and P-48, P-79, P-69 and P-37, at 93b7c921e;
  - pointers at fa3931f42;
  - the homes checks at fa3931f42, plus the P-86 struck read at 93b7c921e;
  - the comments checks to the 2026-10-21 comments file and titles at 93b7c921e;
  - P-148's later messages at the old text 36f7db77c;
  - `leads.py --at 93b7c921e`.
- The P-86 trail check now expects the six commits and then the strike, with "others" 0 for it.
- The remaining checks read the transcript backups and evidence files, which do not change.

**(3) Tests**
- **Result:** 44 PASS, 0 failed. The six new checks cover the struck P-86 trail and its reason, its marks, the STRUCK top lines, the homes read, and leads at the pinned commit.
- **Cache:** the pinned commit and HEAD share one cached copy of the record's parsed history while HEAD's last change to POSITIONS is 93b7c921e.
- **Stray file:** running `sort.py` to check it wrote `tools/sort.txt`, which is its normal output; I deleted it.
