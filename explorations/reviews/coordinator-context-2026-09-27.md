<!-- What the compaction the harness reported as "787.1k tokens saved" actually compacted, and whether it is tied to the
     session's process restart at 12:09:17 UTC, 2026-09-27. Measured from
     /root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl (this session's own
     transcript). Scripts in coordinator-context-2026-09-27/. Read-only: no file outside explorations/ was written.

     CORRECTED 2026-09-27, same day: the first version picked the wrong "previous compaction" (03:28:58) because it
     trusted line position as a proxy for time. This transcript contains byte-identical replays of earlier chunks of
     history, re-inserted at LATER line positions on resume (proven by matching `uuid`s). The true previous
     compaction is a manual one at 08:40:07, between 03:28:58 and the latest (12:11:24); the whole analysis below is
     redone on the 08:40:07-12:11:24 segment, found by deduplicating the transcript by `uuid` before filtering by
     timestamp. This also retracts two claims the first version made: an "unexplained drop" (an artifact of reading
     the wrong, replay-duplicated lines) and "no manual compaction followed the 71% reading" (one did, 36 minutes
     later: this is that compaction). It also retracts calling the restart's cache-miss the cause of the rise in
     total tokens; a cache miss only changes how tokens already in the prompt are billed, not the total. -->

# The 12:11 compaction: what the restart actually added, corrected

## The answer

- **The segment is 08:40:07 to 12:11:24, not 03:27 to 12:11.** A manual `/compact` was queued at 08:38:30.132Z ("Boot up. Tell me where we are." followed at 08:40:22); its boundary landed at 08:40:07.487Z, `preTokens: 752,246`, `postTokens: 10,709`, 97.4s. The final compaction (2026-09-27T12:11:24.920Z, `trigger: auto`, `preTokens: 804,656`, `postTokens: 15,561`) compacted the segment that starts there.
- **Context size:** 67,904 tokens at the first call after the boot (08:40:25.451Z) → 244,658 tokens by 08:44:27.846Z, matching the coordinator's own `/context` reading of "245k / 1m (25%)" at 08:44:46.727Z → 420,850 tokens at 12:09:16.053Z, the last call before the restart → **802,090 tokens at 12:09:38.256Z**, the first call after it → compacted to 15,561 at 12:11:24.920Z. No drop occurs anywhere in this corrected segment; growth is otherwise smooth (the largest non-restart jump is +26,942 tokens, during the boot's KB re-reads at 08:40:36-39).
- **The restart's jump is real, and a cache miss does not explain it.** `cache_read_input_tokens + cache_creation_input_tokens + input_tokens` is the exact size of the prompt sent for that call, cache status aside; a cache miss only moves tokens from the `cache_read` column to the `cache_creation` column, it cannot change that sum. Something the resumed process sent at 12:09:38 was **381,240 tokens larger** than what the live process had been sending, with nothing of that size visible in the chat. Two things this transcript does show, neither one a direct catch of the extra content itself: (1) **this transcript demonstrably contains byte-identical replays of earlier records, re-appended at later file positions with their original `uuid`s intact** — e.g. the 03:28:58 `compact_boundary` (uuid `1ceac316-…`) appears at both line 25826 and line 32220; an 08:33:29 assistant call (uuid `00b41421-…`) appears at both line 28597 and line 34000; around the transcript's own 10:55:08-10:55:22 timestamps, records dated 08:31-08:37 (before the 08:40:07 compaction) reappear after `frame-link` records, immediately preceding the point where growth resumes cleanly toward 12:09. (2) **The final compaction's own bookkeeping is inconsistent with the 08:40:07 compaction having happened at all.** Every compaction's `cumulativeDroppedTokens` in this session equals the previous one's plus its own `preTokens − postTokens` — except the last: `8,736,418 + (804,656 − 15,561) = 9,525,513`, but the recorded value is `8,783,976`, short by exactly `741,537` — which is exactly the 08:40:07 compaction's own `preTokens − postTokens`. **Inferred, not directly witnessed in a single record:** together, (1) and (2) point to the resumed process having rebuilt some of its state from a point before the 08:40:07 compaction, resurfacing pre-08:40:07 content into the live conversation; this fits both the size and the direction of the jump, but no single record in the 12:09-12:11 window was found holding a `uuid` duplicate of pre-08:40:07 content the way the 08:40/10:55 case shows one directly, so the exact resurfaced content is not pinned down.
- **Where the tokens went (chars ÷ 4; cross-checked against usage, see Method):** Read tool results 82,288 tok (9 calls: `FACTS.md` ×5, `INDEX.md` ×2, `POSITIONS.md` ×2 — no `CLIMB-BATCH` or handover read this time); Bash results 50,776 tok (101 calls, none dominant); the two `prompt_snapshot` attachments 58,815 tok; `task_reminder` check-ins on the two background runs 50,463 tok (15 occurrences); the coordinator's own tool-call parameters 28,691 tok (133 calls); its own reply text 7,509 tok (39 blocks); system-reminders/hook feedback injected as text 7,817 tok (16); the segment's boundary summaries (its own seed plus the final compaction's output) 14,404 tok; `deferred_tools_record`/`deferred_tools_delta`/`mcp_instructions_delta`/skill-listing/CLAUDE.md/file-attachment bookkeeping ≈29,700 tok; other tool results (`Agent`, `ReadNotifications`, `Workflow`, `send_later`, `TaskUpdate`) ≈4,300 tok; **Pavol's own 25 chat messages: 2,367 tok** — smaller still than the first version found, and still a small fraction of everything else. Thinking is not retained as text (0 chars across 107 blocks; 2 `thinking_drop` bookkeeping records confirm it is dropped on purpose).
- **The ten largest single items**, eight of them inside the boot's first 26 seconds:

  | rank | ~tokens | timestamp (UTC) | item |
  |---|---|---|---|
  | 1 | 51,692 | 08:40:28.021 | harness `prompt_snapshot` |
  | 2 | 14,488 | 08:40:30.606 | Read `FACTS.md` (chunk) |
  | 3 | 12,040 | 08:40:48.511 | Read `INDEX.md` (chunk) |
  | 4 | 11,701 | 08:40:32.987 | Read `FACTS.md` (chunk) |
  | 5 | 10,627 | 08:40:46.796 | Read `INDEX.md` (chunk) |
  | 6 | 9,454 | 08:40:36.913 | Read `FACTS.md` (chunk) |
  | 7 | 8,970 | 08:40:45.001 | Read `POSITIONS.md` (chunk) |
  | 8 | 8,028 | 08:40:42.987 | Read `POSITIONS.md` (chunk) |
  | 9 | 7,543 | 12:11:24.872 | the final compaction's own summary (its output, not growth) |
  | 10 | 7,123 | 08:40:22.522 | harness `prompt_snapshot` |

- **What took the most, plainly:** the restart's ~381,240-token addition is still the single largest driver of this compaction's size, but the reason is not a cache miss — it is, on the evidence above, most likely the resumed process resurfacing content from before the immediately preceding (08:40:07) compaction, which this same transcript independently shows happening (with a direct record match) for an earlier resume. Nothing else in the segment comes close: the next-largest jump is two orders of magnitude smaller. The two retracted findings from the first version (an "unexplained drop"; "no manual compaction followed the 71% reading") are removed outright rather than replaced, since the corrected segment shows no drop and does show a manual compaction 36 minutes after that reading.

## Method

- **Deduplicate before filtering by time.** This transcript's line order is not a reliable proxy for chronological order across a resume: a resume can re-append an earlier stretch of history verbatim, at a new file position, keeping every record's original `uuid`. `dedup_segment.py` and `full_corrected.py` read the whole file once, keep only the first-seen occurrence of each `uuid`, and only then filter to `[2026-09-27T08:40:07.483Z, 2026-09-27T12:11:24.920Z]`. `find_seams.py` is the tool that surfaced the phenomenon: it walks a line range and flags every place the timestamp drops behind the running maximum by more than 60 seconds, which is how the 08:31-08:37-after-10:55 splice was found. `full_corrected.py` also lists every compaction in the session, deduplicated, with the `cumulativeDroppedTokens` arithmetic check.
- **Context size and categories** are computed exactly as before (usage fields for size; chars÷4 for categories, `tool_use_id` pairing for naming tool results), just over the corrected, deduplicated record set.
- **What this does not settle:** the exact content that made the 12:09:38 call 381,240 tokens larger than the 12:09:16 one. The bookkeeping mismatch and the demonstrated replay mechanism both point the same way, but no single duplicated record was found inside the 12:09-12:11 window itself; this is stated as inferred, not shown, and is worth another pass if it matters (starting from the resumed process's own reconstruction logic, which is outside this transcript).
