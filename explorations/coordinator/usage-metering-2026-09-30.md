<!-- A report for Anthropic, written 2026-09-30 by the coordinating session at Pavol's request, to go with his `/feedback`: the account's weekly usage limit reached, work served afterwards anyway, and the usage meters not moving. Facts from the session's own record and transcripts; the one hypothesis is marked as such. -->

# Usage metering on 2026-09-30: limit reached, work served, meters frozen

This is a Claude Code on the web session in the public repository `palimondo/fortress`, an open-source revival of the Fortress language and a record of agentic coding research. Session `session_01AmiXNpJxQ6TBwec4vJZHDB`, on a Max plan, the coordinator on the Opus tier, workers on the Opus, Fable and Sonnet tiers. All times are UTC. Pavol is on Central European time (UTC+2).

## What happened

1. **The weekly limit was reached at 02:16 on 2026-09-30.** The first error, "You've hit your weekly limit · resets Oct 2, 10am (UTC)", came at 02:16:44 on the session's turn. In the same minute a running Workflow had 21 agent launches refused with the same error, and it ended.
2. **Scheduled wakes then failed.** At 02:38, 03:22, 03:40 and 03:55 each scheduled check-in woke the session and failed four times, 16 errors in all. Pavol's own message at 04:02 failed once. That makes 18 errors in the session's transcript, the last at 04:02:58.
3. **From about 04:13, everything was served again, with nothing changed on the account.** Pavol did not activate the $250 promotional credit offered in the "Limit reached" panel. In the seven hours after that:
   - the session's own turns;
   - test subagents on the Opus and Sonnet tiers;
   - three Fable-tier workers;
   - the resumed Workflow, which ran to its end and landed its work at 08:08.
4. **The session record says the limit is still in force.** `get_session` reads the same from 04:16 to 11:13 (the last read):

   ```
   "rate_limit_info": {"isUsingOverage": false, "rateLimitType": "seven_day",
                       "resetsAt": 1790935200, "status": "rejected"}
   ```

   `resetsAt` is 2026-10-02 10:00 UTC. `isUsingOverage` is false throughout.
5. **The session's cost counter is frozen while its token counters grow.** The record's `usage.cost_usd` read 9999.8977415 at 04:16, at 05:10 and at 11:13. Over the same span `usage.cache_write_tokens` rose from 2,736,994,222 to 2,744,452,111 (+7.46M), and `usage.output_tokens` from 653,570,264 to 655,530,160 (+1.96M). That the value sits just under 10,000 may mean a cap is reached.
6. **The usage panel does not move.** Pavol read it at 04:02, 05:05, 05:32 and 11:08. Each time it showed:
   - all models: 100%, "Resets Fri 12:00";
   - Fable only: 24%, "Resets Fri 12:00".
   
   Between those readings the Fable-tier workers wrote 2.68M tokens.
7. **What was served after the limit, from the transcripts.** From 02:17 to about 11:10 the session and its agents wrote 7.99M tokens (cache writes plus new input), with 495.5M cache reads beside them:
   - Opus tier: 5.26M written, 1,552 calls;
   - Fable tier: 2.68M written, 71 calls;
   - Sonnet tier: 0.05M written, 5 calls.
   
   The transcripts' own output-token counts are unreliable and are left out; the session record's output counter is item 5.

## The reset before it

The launch of the Opus 5.5 tier came with a one-time offer to reset the weekly usage. Pavol used it:
- **Before the reset.** On 2026-09-27 at 19:56 his panel showed all models 81% and Fable only 40%, and he wrote that the Opus 5.5 introduction "got a usage reset option", to be timed well. Later readings: 21:14, 85% and 41%; 22:51, 91% and 43%; on 2026-09-28 at 00:07, 94% and 44%, with "I'm going to reset now".
- **The reset.** On 2026-09-28 at about 00:13 the panel read: "Usage has been reset. No usage yet. 100% of your weekly limit is available … This week Resets Friday 12:00 PM 0% used; Fable this week, Separate weekly limit for Fable, Resets Friday 12:00 PM 0% used."
- **After the reset.** On 2026-09-28 at 10:08: all models 21%, Fable 4%. At 20:13: 42% and 9%.
- **The limit.** All models reached 100% at 02:16 on 2026-09-30, about 50 hours after the reset.

The weekly limit had not run out before that reset: Pavol reset it at 94%.

**Hypothesis, not established:** the promotional reset of 2026-09-28 may have left the account in a state where the weekly limit is recorded as reached but no longer enforced, and where the Fable meter and the session's cost counter no longer take new usage.

## The container, for completeness

Once the Workflow had died and nothing kept the session busy, the environment started a fresh container at each wake: 02:37, 03:22, 03:40, 03:55, 04:13, 04:26 and 04:34, with the disk intact. A VM restart at 23:57 on 2026-09-29, before the limit, killed two of the Workflow's agents mid-work. The Workflow was resumed with `resumeFromRunId` both times and recovered every finished agent. None of this is known to be connected with the metering.

## Where the evidence is

- **The transcripts:** the session's transcript and its agents' transcripts, backed up on the repository's `transcripts-blinded` branch, under `projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d*`.
- **The workflow:** the run's journal is `subagents/workflows/wf_61521277-479/journal.jsonl` there.
- **Pavol's statement of it:** in `explorations/coordinator/POSITIONS.md`, under the entry on the night's usage limit.

## Reported

Pavol sent this report with `/feedback` on 2026-09-30; the feedback id is `41370f27-3aaa-4722-a709-55cb3b1780c2`, and the session transcript was shared with it.
