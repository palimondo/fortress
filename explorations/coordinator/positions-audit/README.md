<!-- The POSITIONS provenance audit of 2026-10-21 and 22: what it is, where its parts are, and how to run its mining workflow again. -->

# The POSITIONS provenance audit

The audit asks of each POSITIONS entry whether it is the curator's decision, faithfully recorded, or an agent's summary or default that readers took as his word. It ran as a trial on ten entries (`trial/`) and then on the other 75 (`full/`); its corrections are applied at `6b560762f`. Its evidence feeds the clarity workflow (`explorations/coordinator/tools/record-clarity/`).

## The mining workflow

`full/evidence/workflow.js`: per chunk of ten entries, a Sonnet scout per entry (archaeology only), an Opus judgement, an Opus writer on a copy of the record, a cold read and a takeaway check. Its briefs are `full/evidence/briefs/` (the writer's rules 0 to 12); its scripts are `tools/` (`leads.py N` gathers an entry's trail in about 2.5 seconds; `tests.py` checks them; `hischeck.py` checks a report's block of the curator's quotes).

To run it again on entries it has not traced, copy the briefs to a new evidence folder and change the report paths in them, then run the script with that folder and `args: { chunks: [{ name, entries: [numbers] }] }`; at most two agents run at once in one Workflow, so run several side by side. Its results: `full/RESULTS.md`. Today's clarity workflow merges the writer's two passes: the correction by the audit's rules and the rewrite for clarity can be one writer stage when the mining runs again.
