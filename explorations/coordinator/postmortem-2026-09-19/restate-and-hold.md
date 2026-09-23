<!-- Written 2026-09-23 from `transcripts` (bdff267d) and `transcripts-blinded`
(fe616d40, this lineage), at Pavol's request of 2026-09-23T06:13:46Z. Companion to
`wall-of-text-spiral.md`, which covers the broader length/register failure and its
"hold" recovery; this note covers what that one left out: the restatement itself — how
the coordinator turns his remarks into a list, in what words, and how the list is
worked through afterward. -->

# The restate-and-hold process: instances, shape, failures

The name is Pavol's own, given this morning describing the process from memory: *"you
just restate what you heard from me as open points or something, and then you hold them
and we'll go through all of them in batch later"* (2026-09-23T06:13:46Z, `fe616d40`) —
asked for because it had gone unwritten and he had to describe it from memory again.

## The instances

**2026-08-21T17:22:16Z** (`transcripts:bdff267d`). The origin, already in
`wall-of-text-spiral.md`: *"From now on, just gather my feedback, sh[o]t acknowledgment
of reception... We'll process my feedback as a batch."* Replies afterward are short
acknowledgments ("Queued for the batch") but no numbered restatement appears — holding
and batching existed here without the restate step. Next morning (00:27:01), on one
item: *"Hold edits for batched update based on feedback. Acknowledge briefly."* Reply:
*"Noted — holding edits. Queued for the batch: drop '— the first in this lineage'..."* —
one item, not a running list.

**2026-09-20T08:01:00Z** (`fe616d40`). The first numbered-list instance. His words give
the mechanism's purpose: *"as I'm giving you my running feedback, we are looping over...
me partially reading your messages, then having always to go back... And the
coordinator's job is to protect me from this."* He did not say "hold" this turn. Reply:
*"Noted, holding. Your points on the list: 1. Protocol §5 as I wrote it is lawyerly...
2. Fewer rules, not more... 3. The post-mortem's one goal... 4. A dedicated session
later... No replies from me until you say you have finished reading. Anything you send
meanwhile goes on the list."* Four items, each a condensed paraphrase, no default
attached.

**2026-09-20T13:51–15:33Z** (same session). The sustained run, five explicit "hold"s
already timed in `wall-of-text-spiral.md`. The list is continuous across the whole
session (items 5 through at least 18, not restarted per "hold"). Shape held throughout:
*"Noted, on the list: 6. The 'review shapes' paragraph was too terse... 7. Aligned on
the worry... 8. The proposed order needs two shapes... Holding."* (13:51:30); *"Noted,
on the list: 9... 10... Holding."* (13:57:46). Each restatement is one short line per
item, in the order raised, no argument attached. Turns reporting a worker's finished
work run longer — that is status, not argument, and each still closes "...Holding."

**2026-09-20T15:33:19Z.** He declares the run over: *"I have now reached a point where I
told you to hold and you started to gathering the open points... Can you confirm that I
have materially responded to all relevant parts of your replies? And nothing open is
left dangling."* The reply confirms nothing is dangling, but the list was not then
worked one item per message. At 15:40:27 he pushes back that bare item numbers meant
nothing — *"The back references to items in this list meant literally nothing to me...
sentences describing them were too short"* — referring to a held item by number alone
fails; it must be spelled out again each time (now protocol.md §3's closing clause).

**2026-09-21T01:14:56Z.** A held item was carried but not acted on: *"I kept raising it
because it sat in the held list, not because it matters now. It does not."* Pavol:
*"Wrong move. Delaying and dropping a ball on this might bite yes. Read the review
behind them!"* Being on the list had become an excuse not to look at it.

**2026-09-21T21:47:23Z.** A point raised informally, not added to the list, vanished:
*"Where some raised points silently ignore[d] by me and dropped?"* The coordinator's own
admission: *"The array slices... It was not cleared because I put it to you as 'one word
on a follow-up worker' and then moved on. That was my mistake."* A remark that never
became a list item has no record and is not answered.

**2026-09-23T06:03–06:14Z** (this session, this morning). The rule is restated and used
again, unprompted by a fresh "hold": *"my reply is three lines at most, your point goes
on the list, nothing gets argued... Say 'list' to see it, 'go' to work the top item."*
Then, on the dictated turn that asks for this recovery: *"Held. Your points, as I heard
them, now in `held-list.md`... 1. Rung P... 2. The four ledger homes... 3. Before batch
4... 4. The restate-and-hold process... 5. Held from before... Nothing else until you
say you are done reading."*

## The shape that worked

1. While Pavol is reading earlier turns and replying one at a time (typically dictated,
   mobile), the coordinator does not answer each remark.
2. Each remark becomes one line on a single running list, numbered continuously for the
   session, in the order raised — a condensed paraphrase, not his transcript verbatim
   and not a re-argued position.
3. The reply is the new list line(s) plus "Holding" — three lines or fewer, no argument.
4. A listed item is referred to later by a short phrase, never by its number alone.
5. Work already running is reported when it lands, even mid-read — status, not a remark
   to hold — and still closes "...Holding."
6. When he says he is done reading, the list is worked through — but being listed is not
   being answered: an item still gets one when he asks, not a silent drop because it
   "sat in the held list"; and a remark made outside the numbered list is not tracked at
   all and is lost — so everything he says in this mode goes on the list, every time.

## Where this is already written, and what is missing

- `protocol.md` §3 (commit `c754a305b`, today, from `wall-of-text-spiral.md`) already
  carries the general rule: short replies while he reads, "every open point goes onto
  one list in the order raised... nothing else is written until he says he is done
  reading; a listed item is not settled by being listed." Covers points 1, 3, 4 and half
  of 6 below.
- Missing: that the list restates his points in short words of the coordinator's own,
  not his exact sentence and not an argument (point 2); that the trigger is the reading
  pattern itself, not only the word "hold" — §3 reads "the moment he says 'hold'", but
  09-20T08:01 and 09-23T06:03 both started the list without it; and that an unlisted
  remark is lost entirely, not just that a listed one still needs an answer (09-21).
- `POSITIONS.md` 2026-09-20 (line 63) and 2026-09-22 (lines 70–71) carry the adjacent,
  already-working rule for the batch itself — decisions one at a time, plain register,
  rows "one per message... not in groups" — not the restatement step.
- `held-list.md`'s per-boot note is the only place the mechanics were written, rewritten
  from scratch each compaction rather than carried forward — why it kept being lost.

## Proposed protocol wording, in plain words

While Pavol is reading earlier turns and replying to them one at a time, the coordinator
does not answer what he says. It puts each point he raises on one running list, in his
order, in a few plain words of its own — what he meant, not his exact sentence, no
argument about it — and says back only that list and the word "holding". This is the
default for that kind of reading, not something he has to ask for each time, whether or
not he says "hold". A point stays reachable later by a short phrase, never by its number
alone. Work already running that lands mid-read gets reported briefly, then holding
resumes. When he says he is done reading, the list is worked through with him a point at
a time, in the order raised; a point being on the list is not an answer to it, and every
point still gets one when he asks — nothing dropped because it sat there quietly, and
nothing he says in this mode is left off the list to be forgotten.
