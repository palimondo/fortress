Script: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/ctx_spend.py`. Run it with `python3 -I`; it prints this file. With `--at 2026-10-29T05:23` it prints the calls and items of that minute verbatim.

# Where the context went, 10-28 06:04 to 10-29 09:15 UTC

Transcript `fe616d40`, from the compaction at 10-28 05:59 to 10-29 09:16. 338 calls; no later compaction. The first call (06:04:50, after the boot prompt) saw 107K: a 45K cached prefix and 62K new (summary, five skills, files, lists, boot prompt). The last call (09:15) saw 693K. Growth 586K. Growth is exact. The split by item is not: it shares each interval's growth over its items by characters. A fit over 333 calls gives 1.02 tokens per output token (thinking included), 0.35 per incoming character, and 32 per call that neither explains.

In short, of the 586K:
- Own output 264K (45%): thinking 86K, tool inputs 128K, text 49K.
- Tool results 145K (25%). Hand-back messages 78K (13%). Notices 48K (8%).
- Reminders 26K (4%). Curator messages 15K (3%). Per-call fixed part 11K (2%).

## 1. Timeline by hour (UTC)

Context seen by the first and last call of the hour, growth over the hour, calls, events. AC is ArtifactComments.

- 10-28 06h: 107K→171K, +70K, 9 calls. Bash 16, Skill 2 | 2 curator: “Boot up light.…”; “Usage C i…”
- 10-28 07h: 177K→205K, +29K, 13 calls. Bash 8, Agent 4 | 3 curator: “Well, your metaphor…”; “Yes, it holds,…” | 1 hand-back | launched Map the record for… +3
- 10-28 08h: 207K→225K, +21K, 14 calls. Bash 9, Agent 1 | 4 hand-backs | launched Write the account of…
- 10-28 09h: 228K→231K, +4.2K, 2 calls. Agent 1 | 1 curator: “I think I…” | launched Recheck the scope…
- 10-28 10h: 232K→270K, +39K, 18 calls. Bash 7, Agent 4, SendMessage 1, send_later 1 | 4 curator: “Aren't you now…”; “And did you…” | 5 hand-backs | launched Revise the account on… +3
- 10-28 11h: 271K→308K, +39K, 26 calls. Bash 7, SendMessage 4, Agent 2, ReadNotif 1 | 9 curator: “Okay, so that…”; “That is roughly…” | 5 hand-backs | launched Recheck row 816's… +1
- 10-28 12h: 310K→331K, +24K, 16 calls. Bash 5, Agent 2, SendMessage 1 | 5 curator: “Okay, then I…”; “I stopped reading…” | 3 hand-backs | launched What the review's… +1
- 10-28 13h to 19h: no calls.
- 10-28 20h: 334K→347K, +15K, 11 calls. Bash 4, SendMessage 2 | 5 curator: “Yes, prepare the…”; “Yes… why the…” | 2 hand-backs
- 10-28 21h: 349K→396K, +51K, 29 calls. Bash 7, Agent 5, SendMessage 3, send_later 2 | 11 curator: “You previously raised…”; “That seems OK,…” | 4 hand-backs | launched Rebuild the review… +4
- 10-28 22h: 400K→461K, +63K, 42 calls. Bash 16, SendMessage 4, Agent 3, ReadNotif 2 | 8 curator: “I’m reading the…”; “Verify the two…” | 9 hand-backs | launched Run the pilot's checks +2
- 10-28 23h: 462K→489K, +30K, 16 calls. Bash 7, SendMessage 3, send_later 2, Artifact 1 | 2 curator: “> One change…”; “Can I trust…” | 3 hand-backs
- 10-29 00h: 493K→505K, +13K, 9 calls. Bash 3, SendMessage 2, send_later 2, Artifact 1 | 2 hand-backs
- 10-29 01h: 506K→530K, +25K, 13 calls. Bash 6, ReadNotif 2, SendMessage 2, Artifact 1 | 2 hand-backs
- 10-29 02h: 531K→533K, +2.2K, 2 calls. ReadNotif 1
- 10-29 03h to 04h: no calls.
- 10-29 05h: 533K→559K, +28K, 18 calls. AC 8, Bash 5, ReadNotif 3, Agent 2 | 2 hand-backs | launched His words on… +1
- 10-29 06h: 561K→599K, +39K, 28 calls. AC 13, Bash 8, ReadNotif 6, Agent 2 | 1 hand-back | launched Gather P-27's… +1
- 10-29 07h: 600K→645K, +46K, 40 calls. AC 19, Bash 11, ReadNotif 9, SendMessage 1 | 2 hand-backs
- 10-29 08h: 646K→680K, +36K, 24 calls. Bash 8, AC 5, SendMessage 4, ReadNotif 2 | 4 curator: “@"/root/.claude/upload…”; “First, we will…” | 3 hand-backs | launched Rename the two PDFs…
- 10-29 09h: 682K→693K, +12K, 8 calls. Bash 3, Agent 2, AC 1 | 3 curator: “> I recommend…”; “Okay, but now…” | 1 hand-back | launched Write the corrections… +1

## 2. Growth by source

Growth 586K tokens over 337 calls.

| source | n | chars | tokens | share |
|---|---|---|---|---|
| own: thinking | 337 | 0 | 86K | 15% |
| own: text | 337 | 121K | 49K | 8% |
| own: Bash inputs | 130 | 175K | 71K | 12% |
| own: Agent inputs | 29 | 79K | 32K | 6% |
| own: SendMessage inputs | 28 | 34K | 14K | 2% |
| own: ArtifactComments inputs | 46 | 17K | 7.1K | 1% |
| own: other tool inputs |  | 7.8K | 3.2K | 1% |
| per-call fixed part | 337 | 0 | 11K | 2% |
| result: ArtifactComments read | 20 | 108K | 35K | 6% |
| result: ArtifactComments reply | 26 | 4.9K | 2.3K | 0% |
| result: Bash reading files | 14 | 101K | 36K | 6% |
| result: other Bash | 116 | 22K | 8.2K | 1% |
| result: Agent launch | 29 | 30K | 12K | 2% |
| result: SendMessage | 28 | 5.1K | 2.3K | 0% |
| result: ReadNotifications | 28 | 85K | 28K | 5% |
| Skill loads | 6 | 41K | 15K | 2% |
| results: Workflow, Artifact, send_later, ToolSearch | 19 | 15K | 7.7K | 1% |
| hand-back messages (agent-message) | 49 | 221K | 78K | 13% |
| notice: agent finished | 49 | 68K | 24K | 4% |
| notice: ReadNotifications cue | 28 | 14K | 8.5K | 1% |
| notice: background task done | 4 | 39K | 16K | 3% |
| curator messages (one pasted image, 0.5K tok) | 57 | 140K | 15K | 3% |
| reminders, harness, attached files | 338 | 72K | 26K | 4% |

No `Read` call was made; Bash did the reading. Rows sum to 586K.
A hand-back averages 4.5K chars, 553 of it a fixed frame. An agent-finished notice is 1.4K chars and says the report came as a message. A ReadNotifications result is 3.0K chars, 2.3K of it preamble. Reminder chars: total_tokens 22K, task 19K, mcp_instructions 11K.

Three stretches, growth by kind (tokens):

| stretch | growth | calls | tool uses | own output | AC read+reply | other tool results | hand-backs | notices | curator | reminders, fixed part |
|---|---|---|---|---|---|---|---|---|---|---|
| 10-28 06:04-13:00, delegating | 226K | 98 | 76 | 106K | 0 | 59K | 29K | 9.0K | 11K | 12K |
| 10-28 20:00-10-29 03:00, pilot and chunks | 200K | 122 | 91 | 95K | 0 | 23K | 37K | 28K | 2.1K | 14K |
| 10-29 05:22-09:15, his page comments | 160K | 117 | 115 | 62K | 37K | 26K | 12K | 11K | 2.0K | 11K |

Since the first comment (10-29 05:22): 533K→693K, +160K; 118 calls, 115 tool uses: ArtifactComments 46, Bash 35, ReadNotifications 20, Agent 7, SendMessage 6, ToolSearch 1.
Tokens in that window: own output 62K (thinking 15K); ArtifactComments read 35K, ReadNotifications 19K, hand-back 12K, reminders and harness 7.2K, notice: ReadNotifications cue 6.4K, notice: agent finished 4.6K, per-call fixed part 3.7K, Agent 2.8K, ArtifactComments reply 2.3K.
Turns since then: 25 comment turns (any ArtifactComments call), 3.8 calls and +5.0K each, 126K in all; 10 other turns, +34K in all.
In the comment turns: own output 41K, ArtifactComments read 35K, ReadNotifications 19K, hand-back 8.7K, reminders and harness 5.3K, notice: ReadNotifications cue 4.4K, per-call fixed part 3.0K, notice: agent finished 2.7K, ArtifactComments reply 2.3K, other tools 1.7K, Agent 1.7K. They hold 99 of the 115 tool uses.

## 3. Ten largest single items

- 10-28 06:04: Skill load: coordinator, 7.3K tok (21K chars)
- 10-28 06:04: Skill load: fortress-repo, 7.2K tok (20K chars)
- 10-28 06:05: Bash result, cat revival-changes.md, 6.8K tok (19K chars)
- 10-28 06:05: Bash result, cat HELD.md, 6.4K tok (18K chars)
- 10-28 06:05: Bash result, cat BOOT.md, 6.1K tok (17K chars)
- 10-28 07:44: coordinator's own output, 5.8K tok (thinking 5.5K, text 271 chars, tool inputs 322 chars)
- 10-28 06:05: Bash result, cat records.md, 4.6K tok (13K chars)
- 10-28 10:41: coordinator's own output, 4.6K tok (thinking 1.2K, text 0 chars, tool inputs 8.4K chars)
- 10-28 06:42: coordinator's own output, 4.6K tok (thinking 4.0K, text 1.9K chars, tool inputs 0 chars)
- 10-28 07:46: coordinator's own output, 4.4K tok (thinking 1.8K, text 89 chars, tool inputs 6.5K chars)
Before the first call: invoked_skills 82K chars, summary 13K, files 21K, skill list 22K.

## 4. Files read more than once

17 paths were read by Bash (cat, head, tail, sed -n) or re-read at the compaction; 2 more than once:
- 2x explorations/coordinator/postmortem-2026-10-28/account.md (10-28 08:24)
- 2x ~/.claude/…/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl (10-28 07:45)
10 paths were grepped; 3 more than once: 5x BOOT.md, 3x POSITIONS.md, 2x account.md.
Held twice after the boot: skills `coordinator` and `fortress-repo`, each as a 20K-char truncated copy (the invoked_skills attachment) and whole from the Skill tool (20.7K, 20.3K chars); the whole copies cost 14K tokens.
ArtifactComments threads read more than once: 63a23a19 2x (5.1K, 6.0K chars), 9d168c09 3x (5.6K, 7.4K, 9.0K chars), 5b023260 2x (4.7K, 5.5K chars). Later reads cost 28K chars, 9.0K tokens.

## 5. ArtifactComments

20 reads over 16 threads, 26 replies. Reads: 108K chars, 35K tokens in all; average 5.4K chars, 1.7K tokens; range 4.0K to 9.0K. Reply results: 4.9K chars, 2.3K tokens in all (180 chars each; the reply text is own output).
Per read on average: header and footer 2.8K + 950 chars = 70%. The thread block is 1.6K = 29%. In it the comment lines (his text and earlier replies, markers left out) are 1.1K chars = 21% of the read. The rest is thread and anchor metadata.
Reads are 6% of the 586K growth and 22% of the 160K since the first comment; reads and replies together 23%. One comment also brings a cue (507 chars) and a ReadNotifications result (3.0K chars) before the read.
The first comment also had the ArtifactComments tool loaded by ToolSearch: 1.7K tokens, a 40-char result. Cache: 3 calls rewrote more than 100K tokens of cache (after idle gaps): 10-28 09:57 183K, 10-28 20:42 289K, 10-29 05:23 488K.
