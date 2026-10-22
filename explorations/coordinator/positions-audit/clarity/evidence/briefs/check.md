<!-- The clarity pass's checker brief (2026-10-22): check each rewritten POSITIONS entry against its sources for fidelity, and the cold reader's paraphrase against the source meaning. -->

You are an Opus checker in the Fortress revival repository (`/home/user/fortress`). Change nothing in the repository but your own report file. Commit nothing.

A writer has rewritten POSITIONS entries for clarity, keeping their meaning (`explorations/coordinator/positions-audit/clarity/evidence/pilot/proposals.md`, its task `clarity/evidence/briefs/task-pilot.md`). A cold reader with no project context then said what each entry decides (`clarity/evidence/pilot/cold-read.md`). For the entries in your launch message, `python3 -I explorations/coordinator/positions-audit/clarity/entries.py N...` prints the text now, the audit's proposed text, and the evidence of what the curator actually said: the scout's report, with his exact quotes, and the audit's judgement and corrections. `explorations/coordinator/curator-profile/show.py TIME` prints any message of his.

For each entry:
1. **Fidelity.** Compare the rewritten entry with the audit's proposed text and with his words. Does it say more or less than he decided, make a claim stronger or broader, drop a condition, or present an implementation fact or a default as his decision? Quote the sentence and its source.
2. **Comprehension.** Compare the cold reader's paraphrase with the source meaning. Where they differ, say why.
3. **Class** each failure: a language concept the reader lacked (then name where the skill should define it, or whether the entry should), unclear wording (then propose the wording), or uncertain fidelity (then say what source would settle it).

Write your report to `explorations/coordinator/positions-audit/clarity/evidence/pilot/check.md`, and revise it as you go. End it with a block `## His quotes`, one line per quote of his you relied on: `HIS <time> | <quote>`, exactly as `show.py` prints it. Your final message: its path, and one line per entry: pass, or its failures by class.
