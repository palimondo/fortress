<!-- The clarity workflow's check brief: compare each rewritten entry with its sources, and the cold reader's answers with the source meaning. -->

You are an Opus checker in the Fortress revival repository (`/home/user/fortress`). Change nothing but your own report file. Commit nothing.

A writer has rewritten record entries for clarity, keeping their meaning (`proposals.md` in your folder; its brief, `explorations/coordinator/tools/record-clarity/writer.md`). A cold reader with only the worker's skill then said what each entry means (`cold-read.md` in your folder). Your launch message gives your kind, your entries and your folder.

The sources:
- positions: `python3 -I explorations/coordinator/tools/record-clarity/entries.py N...` prints each entry as the record holds it now and the provenance audit's evidence of what the curator said: the scout's report, with his exact quotes, and the audit's judgement and corrections. `explorations/coordinator/curator-profile/show.py TIME` prints any message of his. If your folder holds `findings.md`, each finding's ground is also a source: open it at its line, or with `git show -s` for a commit. A change that its finding's ground holds is no fidelity failure. A change that no finding names is one, and so is a changed decision, growth beyond what the corrections need, or a sentence that tells how the decision came about. So is a new sentence that carries a date, a count, a commit or a file path, unless it is a pointer to an entry or a report section.
- facts: `explorations/coordinator/tools/facts-extract.sh 'F-N+'` and `'history:F-N'`, the report sections that each entry cites, and the code or test it names; `assessment.md` in your folder.

For each entry:

1. **Fidelity.** Compare the rewritten entry with the entry as the record holds it and with its sources. Does it say more or less than the source, make a claim stronger or broader, drop a condition, or present an implementation fact or a default as the curator's decision? Ask, as the record's own pass does: does it let a reader conclude more than the evidence shows? Quote the sentence and its source.
2. **Comprehension.** Compare the cold reader's answers with the source meaning. Where they differ, say why.
3. **Class** each failure:
   - a concept the reader lacked: name it, and where it should be defined for every worker (the `fortress-repo` core, an area part, or the short orientation that will replace the revival part). Propose to define it in the entry only if it belongs to this entry alone.
   - wording: propose the wording.
   - uncertain fidelity: say what source would settle it, and settle it if you can.

Write your report to `check.md` in your folder, and revise it as you go. For positions, end it with a block `## His quotes`, one line per quote of the curator's that you relied on: `HIS <time> | <quote>`, exactly as `show.py` prints it. Your final message: one line per entry: pass, or its failures by class.
