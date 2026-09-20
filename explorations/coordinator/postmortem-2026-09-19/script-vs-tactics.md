# The batch-2 script changes against the change of tactics

One timeline, two threads. Thread **S** is the batch-2 process work: the six process
decisions, the generalised workflow script, the gate summary, the thread pin, the harness key.
Thread **T** is the tactics: the cold-cache failure, the FlatArrays review, and Pavol's
evening rulings that made the array fork and the `nat` fork the path.

Sources: `assistant-text.md`, `user-messages.md` and `agents.md` in this directory, and
`git log` in `/home/user/fortress`. Times are UTC. **P:** is Pavol, verbatim. This file lays
out the order and the costs; it does not answer whether the script work was still needed.

## What the five pieces of thread S are

- **The six process decisions** — gated assertions for measured defects; the eight script
  changes plus a gate summary and no committed logs; the one-thread pin plus gating four-thread
  `atomic` runs; implementing the dead check keyword; a ladder-regression stage; the reviewer's
  six gaps. Recorded in POSITIONS at `24a7da450`.
- **The generalised script** — `explorations/coordinator/climb-batch-workflow.js`, 702 lines
  changed (+514 net) in `a0fcf0a96`, plus 54 lines of `climb-batch-workflow.md`.
- **The gate summary** — `explorations/compile-ladder/gate-baseline/summary.txt`, 59 lines, the
  ~5 KB file each gate writes and the next gate diffs against.
- **The thread pin** — `FORTRESS_THREADS=1` written into the `fastTrack` macro in `build.xml`
  (6 lines), with `gate-baseline/pin-proof.txt` as its evidence.
- **The harness key** — `run_out_WIcontains`, a whitespace-insensitive "output contains" check,
  10 lines in `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`, with the
  throwaway `wiprobe/` suite as its negative proof.

## Timeline

| time | thread | event |
|---|---|---|
| 06:54:03 | S | **P:** "We should do the next climb using the new pipelining script we used for the repair. Uh, while that runs, we would review its efficiency uh, and quality some more because we had hopes that it would improve the failures that led to the need of repair." |
| 07:14:31 | S | `cb242a2d8`: climb batch 1's decision record and workflow script committed; batch launched 07:15:15. |
| 07:50:58 | S | Agent 2 launched: review the repair batch's process and where its time went. |
| 08:20:43 | S | Relay: "**Eight changes proposed for the next batch's script, all free.** … The eight script changes from the review wait for your word." |
| 10:15:56 | S | Agent 6 launched: audit test discipline across all three campaigns. |
| 10:26:56 | S | Relay with four open items, among them the gate's thread count and whether a skeptic-found defect must become an assertion. |
| 11:33-11:56 | S | Batch 1 gated green and landed; its record closed (`6b788f0cc`, `227c0b9b3`). |
| 12:40:23 | S | The ten open decisions, ordered; items 1-4 are the process ones. Item 9: "The array representation and `nat` checking, the two reserved forks. The fork-free library rungs are nearly spent". |
| 12:50:41 | S | **P:** "can you recap the decisions, their consequences, and maybe attack them? Attack them. Like adversarial review? … we need to have a fresh fable agent, just get that brief for an unbiased perspective." |
| 12:51:55 | S | Agent 10 launched: attack the four process decisions, "given the decisions and the sources but not my arguments". |
| 13:11:05 | S | `ff7d7a319`: `process-decisions-review-1.md`, 259 lines. One decision overturned (the scheduling change), three amended, six further gaps found. |
| 14:51:07 | S | **P:** "this is a wall of text that I cannot absorb at this moment. Are there strong recommendations and clear wins changes … Were you convinced … pick a good default?" |
| 14:53:20 | S | **P:** "again, you were writing in the smart alloc register. If you wrote it in plain English, that would be helpful. But I still don't understand what decisions are we taking and what are the impacts." |
| 14:53:40 | S | "Plain version. Six decisions." Each as what we do / what it changes. Ends: "Say 'go' and I start all six." |
| 14:54:15 | S | **P:** "I am not reading this, but go." — **the decision point for all six.** |
| 14:56:29 | S | `24a7da450`: POSITIONS records the six decisions and how decisions are to be presented. |
| 16:25:23 | T | Agent 13 launched: investigate C4's cold-cache overload failure. |
| 16:26:07 | S | **Agent 14 launched: apply the six decisions to the script and the harness.** Brief 9,211 chars. |
| 16:26:24 | T | The measurement relay; item 5: "**A hidden bug: C4 only runs on a warm cache.** From a clean cache the first run is rejected by the interpreter's overload rule". |
| 16:43:19 | T | **P:** "I don't care how slow the interpreter is … interpreter of Fortress … is irrelevant for any performance discussions." The tuple edit is withdrawn. |
| 16:53:26 | T | `f4dc02009`: ledger rows 341 and 342 — C4's `MAX` overloading is illegal, the cache hides the check. |
| 16:55:30 | T | The `MAX` explanation, ending "**The fix.** Rename C4's function so it is no longer a version of the library's `MAX`". |
| 17:01:32 | T | **P:** "I don't think the fix is a rename. The fix is to compose the algorithm using the standard array operations. What am I missing? Can you have a separate uh, Fable worker, have a look at this." |
| 17:02:43 | T | Agent 15 launched: review C4's FlatArrays against the standard arrays, his question verbatim. |
| 17:06:26 | both | Compaction (416,266 tokens before). The boot lists a worker's directory. |
| 17:06:54 | S | **`a0fcf0a96`: the script generalised, the thread pin, `run_out_WIcontains`, the gate summary baseline.** Agent 14 ends 17:07:59 after 41.9 minutes. |
| 17:10:56 | S | **P:** "What was that worker doing for 40 minutes? And also, as you boot it up, you listed its working directory and flooded your contacts with that bullshit." |
| 17:12:47 | S | `3cda0c60f`: the harness evidence committed by explicit file list. |
| 17:13:00 | S | The 42-minute answer: "About 25 minutes were test runs: the full gate on the committed tree, then a second `testFast` with the pin lifted". |
| 17:16:22 | S | **P:** "Okay. I'll let it stand for now. … You tell me whether there are other open decisions or reviews that we must do before uh, we go to the next stage. … give me the list of what needs to be discussed for the next run. I want to run one more run". |
| 17:17:19 | S | `3e8061c04`: protocol — a boot reads worker state from the harness notice and one path, never a directory listing. |
| 17:18:08 | S | Agent 16 launched: assemble the open decisions before climb batch 2. |
| 17:29:29 | S | `2aad855c2` + the twelve-item relay (list 11 in `decision-lists.md`). |
| 17:35:00 | T | `88cf9833a`: the FlatArrays review, 191 lines, with 95 probe files. |
| 17:35:20 | T | **The turn in the tactics.** The review's four options and its closing note: "After it, `+`, `-` and `MAX` still rest on the interpreter's accident, not on the specification's letter. The letter-correct fix is a scalar-extension block for float arrays in the sealed library, **which belongs with the compiler-world array type, step 5 of the plan**." |
| 17:46:57 | S | **P:** "What does it mean when you are talking about forks?" |
| 17:52:43 | S | **P:** "I cannot work in this way. You are not communicating clearly. … Not presenting any hierarchy of the decisions, not, not a decision tree with consequences. This is fucking bullshit." |
| 17:53:39 | both | The three yes-or-no questions: run the small batch now, **start the array design now**, fix C4's cold-cache bug now. "Everything else is mine … I should not have put them in front of you." |
| 18:02:13 | T | **P:** "Um, yes, we need to start the array design. And if we found a minimal fix for the C4, like just show it to me." |
| 18:04:59 | T | Agent 17 launched: write the array design document. |
| 18:05:37 | T | Agent 18 launched: land the minimal C4 repair. |
| 18:06:05 | S | Agent 19 launched: prepare the batch-2 record and manifest. |
| 18:08:05 | T | The one model line the repair changes is shown (`mask + …` → `planeSum(mask, …)`). |
| 18:13:00 | T | **P:** "NO. NO! NOOOOO! That's not Fortress!" |
| 18:15:56 | T | Agent 20 launched: probe three routes that keep the line, "so that you see the diffs before anything is done". |
| 18:16:07 | T | `bd84d76d9`: POSITIONS — the model's notation is not changed to satisfy the interpreter's check. |
| 18:21:22 | T | **P:** "Isn't the defining feature of Fortress this special type of dispatch? … We, we are, in Fortress we are defining this whole numeric tower and the basic types and we must be able to compose them in, in normal mathematical ways. That, that, that is the whole purpose of the language." |
| 18:24:08 | T | `c227cbe55`: `array-design.md`, 154 lines. |
| 18:25:11 | S | `7366a65dd`: climb batch 2 prepared, three rungs, **not launched**. |
| 18:31:44 | T | **P:** "all, all of the extensions that it invented need to go directly to the standard library in the spirit of the standard library … the worker that does it should like study the existing parts of the fortress library meticulously, and use those patterns for extending the standard library in the native way." → `219920545` (18:32:22). |
| 18:32:48 | T | **P:** "for the arrays, like I don't know we can sidestep the net NAT uh, issue. That is a central design point that they are using. And yes, we must go to double array for performance. There is again no question about this. If this should have been high performance language, it cannot be boxed." → `ccd5fed01` (18:33:29). **His last message for eleven hours.** |
| 18:44:18 | T | `d55aa91a6`: the design revised under the two rulings, 203 lines, the `nat` plan added. |
| 19:05:07 | T | `19179d27a`: the three routes probed, the adjudication, the library and C4 diffs as evidence. |
| 19:05:49 | T | Agent 21 launched: land the library scalar-extension repair under the sealed tree. |
| 20:24:34 | T | `02d09a39f`: the library edit and two gated tests. Gate green (`testSystem` 384, `testFast` 1,409). |
| 20:39:46 | T | `8590d7a9e`: C4 and the APL base drop what the library now serves; both check programs cold-green. |
| 05:24:41 (09-20) | S | **P:** "Can I compact you nave before starting batch 2 or do we start that run and compact you during it?" |
| 05:28:00 | S | Batch 2's four objectives, the fourth being "**Prove the rebuilt batch machinery.** The gate summary diffed against the last landed one, the four-thread atomic runs, the ladder regression stage, the review beside the gate: all written yesterday, none run yet. The array rungs that follow are large. Three cheap rungs are the shakedown." |
| 05:29:30 | S | **P:** "Go" → 05:29:38 batch 2 launched as `wf_d1628adb-2ee` from `8590d7a9e`, on the generalised script; the three `wip/` branches are created. |

## The order, stated plainly

1. The script/process work was proposed in pieces from 08:20 to 12:40, attacked by an
   independent reviewer 12:51-13:10, decided in one word at 14:54:15, and built 16:26-17:06.
2. The cold-cache failure surfaced at 16:26 — the same minute the script worker was launched —
   from a worker launched 44 seconds earlier.
3. The tactics turned between 17:35 (the review names the sealed library as the letter-correct
   fix and ties it to "step 5 of the plan", the compiler-world array type) and 18:33 (the two
   rulings: `double[]` unboxed, `nat` sizes not sidestepped, the two forks taken together).
   That is 28 to 87 minutes **after** the script commit landed.
4. The reserved forks were on the table before both: at 12:40, item 9 of the ordered list said
   "the fork-free library rungs are nearly spent", and at 17:29, item 5 said the batch "touches
   nothing behind the array representation or `nat` checking" and that the array sketch and the
   `nat` prototype start "now as worker sessions beside the batch".
5. Batch 2 was prepared at 18:25 with three fork-free rungs, held overnight, and launched at
   05:29:38 on the rebuilt script. None of the five pieces of thread S had been exercised by a
   real batch when the region ends; the 05:28 message calls batch 2 their shakedown.
6. One of the six decisions was applied inside thread T before any batch ran: decision 1, the
   gated assertion. The library repair wrote two tests into the interpreter's corpus first,
   verified them red on the old library, then made the edit, then ran the full gate
   (`array-work-brief.md` section 2). Those two tests use the corpus's default pass rule, not
   the new `run_out_WIcontains` key. The other pieces of thread S — the generalised script, the
   gate summary diff, the four-thread `atomic` runs, the ladder-regression stage, the
   review-beside-the-gate, the thread pin in `fastTrack`, the harness key — were exercised by
   nothing in the region.

## The costs

Workers, from `agents.md` (wall time is the agent's own transcript span; tokens are the
agent's output tokens, the only token measure the record keeps per agent):

| # | thread | worker | wall | output tokens |
|---|---|---|---|---|
| 2 | S | Review the repair batch's process | 28.1 min | 81,958 |
| 6 | S | Audit test discipline across the climbs | 10.7 min | 44,897 |
| 10 | S | Attack the four process decisions | 18.2 min | 57,451 |
| 14 | S | Apply the decisions to the script and harness | 41.9 min | 130,220 |
| 16 | S | Assemble the open decisions before batch 2 | 10.6 min | 44,637 |
| 19 | S | Prepare the batch-2 record and manifest | 18.4 min | 68,083 |
| | | **thread S total, 6 workers** | **128 min** | **427,246** |
| 13 | T | Investigate C4's cold-cache overload failure | 24.2 min | 83,726 |
| 15 | T | Review C4's FlatArrays against the standard arrays | 30.4 min | 93,732 |
| 17 | T | Write the array design, then revise it | 39.2 min | 116,744 |
| 18 | T | Land the minimal C4 repair (stopped at 18:13) | 8.0 min | 23,647 |
| 20 | T | Probe three routes that keep the model's line | 47.2 min | 143,650 |
| 21 | T | Land the library repair under the sealed tree | 94.8 min | 87,549 |
| | | **thread T total, 6 workers** | **244 min** | **549,048** |

FACTS measures agent 14, the script worker, in the harness's own units and gives the fuller
figure: "361,282 subagent tokens, 169 tool calls, 42 min, of which the full gate on the
committed tree … and the second `testFast` at two threads (465 s) were about 25 min; 702 lines
of the script changed, 10 of the harness, 6 of `build.xml`, 3 of `.gitignore`"
(`coordinator/FACTS.md`). The per-agent numbers in the table above are output tokens only,
which is what `agents.md` can measure from a transcript; the subagent-token figure is three
times larger, so read the table as a ratio between the two threads, not as a bill.

Not attributed to either: agent 9, the FACTS split (7.7 min, 36,951 tokens), housekeeping that
both threads then read; agents 11 and 12, the measurement and `Maybe` workers (87.4 and 22.2
min, 82,521 and 62,969 tokens), whose results fed the 16:26 relay that opened thread T.

Coordinator side, from `context.tsv` (output tokens per API call, summed over the turns that
belong to each thread; context size is the whole session's, not a thread's):

- Thread S: 18 turns, 54 API calls, 87,473 output tokens. (Turns 6, 7, 24, 35-40, 72-76, 86,
  94-96.)
- Thread T: 21 turns, 63 API calls, 106,310 output tokens. (Turns 57-59, 61, 67-70, 77-79,
  81-85, 87-89, 91, 92.)
- Two turns sit across both and are counted in neither: turn 41 (14:55-14:57, 9,263 tokens,
  the launch that started both the measurement work and the `Maybe` probe) and turn 60
  (16:45-16:48, 11,310 tokens, the 85 MB cache-commit incident and its repair).
- Turn 2, the 06:54-07:16 boot that launched batch 1 and wrote the batch-1 record, cost 24 API
  calls and 102,335 output tokens on its own.

Compactions in the region, with the context recorded before each: 06:38 (273,551 tokens),
09:47 (436,175), 17:06 (416,266), 05:32 on 09-20 (350,420). The 17:06 one falls between the
script commit and the FlatArrays review's return; its boot pulled 156,844 characters of tool
results, 12,588 of them from directory listings, which is what Pavol objected to at 17:10:56
and what `3e8061c04` was written to prevent.
