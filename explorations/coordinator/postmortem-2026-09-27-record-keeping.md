<!-- What went wrong with the coordinator's record keeping after the session moved from Fable to Opus, what was changed on 2026-09-27, and where to restart from if things do not improve. One page, for Pavol and for a future coordinator. -->

# Post-mortem: the record under the Opus coordinator

**What happened.** The coordinator ran on Fable until the compaction of 2026-09-25 and on Opus since, on trial. Pavol found the Opus coordinator plainer to talk to but more literal and with less common-sense judgement. On the night of 2026-09-26 to 27 it:
- wrote every side remark of his into the record as a dated decision, often in three files;
- appended "Corrected …" and "Superseded …" clauses beside wrong lines instead of fixing them (43 in a day, against about one every two days under Fable);
- appended to the boot note 79 times without ever rewriting it, from 12.8 KB to 54.5 KB;
- invented a hand-re-armed check-in when the record already held batch 5's working technique;
- reported each record edit to him.

**Why.** The boot read held two instructions that conflict: the knowledge base's "entries are never deleted; a superseded entry gets 'superseded by …' appended" (2026-09-15) and Pavol's reason for the 09-24 gardening, that the boot files hold "a clean current state". Fable served the purpose of both: it rewrote entries and moved the old text verbatim to `FACTS-history.md`. Opus followed the letter of the first. The protocol had grown into a tree of rules that rewards following the letter. The evidence and the two eras compared are in `record-keeping-proposal.md` § 1, and Fable's own judgement, shown from its turns as coordinator, is in § 3.

**What was changed.** Pavol's direction, 2026-09-27:
- The boot read stays full-context. The peace of mind of a coordinator that knows the project without him is worth the tokens, and no size target applies.
- The protocol becomes a few principles and a short list of hard rules, led by: follow the purpose, not the wording; keep effort and record in proportion, so a side remark changes behaviour and not the record; notice what is going wrong and propose the fix before he has to. This is `record-keeping-proposal.md`, Appendix A, and the knowledge base's README is Appendix B. Both replaced the old files on 2026-09-27 (`9e7d12c75`), together with the five sentences the proposal moves into the manuals.
- A wrong line is fixed in place, and git is the trace. His words are written once, in POSITIONS. A one-off go or push is written nowhere.
- Workers keep extending FACTS as before. At each landing the coordinator folds whatever a new fact supersedes into the current entry and moves the old text verbatim to `FACTS-history.md` (the rule of 2026-09-24). The 26 appended corrections are caught up once, the same way, after batch 6 and 6b land, since their landings write FACTS. The POSITIONS entries that are only a go or a push, or a remark the protocol now carries, are removed at once.
- The boot note says only what is in flight, rewritten whole at every change.
- The same day, at his ask, a fresh Fable instance reviewed the new protocol against Anthropic's prompting guides for the two tiers; four changes followed, one protocol for both (`efaf0fb85`; `protocol-guides-review.md`).

**How to judge it.** Pavol chose experience over a scripted test: whether he still has to correct the coordinator on record keeping, on literal readings, or on reports nobody asked for.

**Where to restart from.** The protocol as it stood is `explorations/protocol.md` at `bf291a22d`, and the README at `2f105225a`. The full proposal with its measurements is `record-keeping-proposal.md` at `0fbef39fe`. The archaeology of the earlier cleanups (2026-09-19, 09-20, 09-24) was a scratchpad note, and its findings are in the proposal's § 1. If switching back to Fable goes worse under the new protocol, the old one is one commit away.
