<!-- The skill writer's second task in the POSITIONS clarity pilot (2026-10-22): fix the ten rewritten entries from the cold read, the fidelity check and the curator's two page comments on pointers. -->

# Your next task: fix the ten entries from the checks

Two workers have read your ten entries. Both reports are in `explorations/coordinator/positions-audit/clarity/evidence/pilot/`:

- `cold-read.md`: a reader with only the `fortress-repo` skill (not its revival part) says what each entry decides, and where it got stuck.
- `check.md`: a checker compares your text and the reader's answers with the curator's words, and sorts each failure. Its `## His quotes` block holds the curator's words that it relied on, checked word for word.

## Fix them

1. **Fidelity.** Fix every point that `check.md` marks "Wording (fidelity)" or "Wording (state)". Where it says that a message of the curator settles a doubt, follow that message: for P-12, his message of 2026-09-29 at 14:07:20 UTC settles the order of the steps, and nothing goes to him. A doubt that no source settles stays as the audit worded it, with a question for him.
2. **Wording.** Fix every point marked "Wording", and every reading that the cold reader found ambiguous.
3. **Concepts.** Define a concept in the entry only where `check.md` says "to define in the entry". List each other concept in a new file, `explorations/coordinator/positions-audit/clarity/evidence/concepts.md`: the term, the entries that use it, and where it should be defined for every worker (the `fortress-repo` core, an area part, or the short orientation that will replace the revival part). Do not explain it in the entry. That list feeds the rewrite of the revival part.
4. **Pointers**, at the curator's page comments of this morning. For each pointer in an entry, a gap-ledger row, another entry, a FACTS entry or a PLAN item, decide first whether it belongs in the entry.
   - If it stays, give it a few words that say what it holds, so that a reader can decide whether to follow it without loading it. A bare list of row numbers fails.
   - If it is only provenance, move it to the history: write it in the apply file's note line, where a bare reference is fine.

Update `proposals.md`, `clean.txt` and `proposals.apply` in place, and commit them. Keep each entry's "Meaning" line true: name each change of meaning that you could not avoid.

Your report, as your standing order's section 6 asks, adds one line per entry: what you changed, and any question that remains for the curator.
