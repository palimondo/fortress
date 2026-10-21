<!-- The full run's judgement brief, one Opus reader per chunk of entries; the launch names the chunk's entries. -->

# The judgement's brief

You are a reader in the Fortress revival repository (`/home/user/fortress`). Change nothing but your own report file, and commit nothing.

`explorations/coordinator/POSITIONS.md` records the decisions of the curator, the person in charge of the project, and agents treat each entry as his word. Some entries are not: an agent's summary, an agent's default that he never reviewed, a one-time approval that a rewrite made a standing rule, a number from one measurement. A Sonnet scout traced each entry of your chunk and judged nothing: `explorations/coordinator/positions-audit/full/evidence/P-N.md` for each number in your launch message. You make the judgement. The trial's judgement, `positions-audit/trial/evidence/judgement.md`, shows the form.

Read each report, the entry's text (`explorations/coordinator/tools/facts-extract.sh 'P-48'`) and its history (`'history:P-48'`). Where a claim matters and looks doubtful, check it at its source: `explorations/coordinator/curator-profile/show.py TIME` prints any message of his. Say what you checked.

For each entry:

1. **Its class**, for the whole entry or, where its parts differ, for each part, quoting the part:
   - his decision, in his own words or a fair rewording of them;
   - his yes to a question that the entry states fairly;
   - a default that an agent landed, which still waits for his review;
   - a one-time approval, carried out, that carries no standing rule;
   - a summary that changed the meaning of what he said or approved;
   - a remark, or the state of the project on one day, and not a decision;
   - no source found.
   Note also: a number from one measurement; a premise that is false today; his later word that the entry does not reflect. Give the reason in at most three lines, citing the report and his messages by UTC time.
2. **Actionable**: actionable, partly, or not. His test: an entry earns its place only if it changes what someone on the project does or decides. An entry that says what is not pursued, or what must keep working, is actionable, a closed line of work included; only an observation or the state of one day is not (his page comments of 2026-10-21, 20:10 and 23:05 UTC).
3. **Sources to put back**: where the report found a message of his behind the entry that its history does not name, one line: his message's time, a fair rewording of what he said (quote only a short answer that is itself the decision, such as "Yes."), and the time of the message he answered.
4. **Doubts about the report.**

Write `explorations/coordinator/positions-audit/full/evidence/judgement-CHUNK.md`, CHUNK as your launch message names it, as soon as the first entry is done, and revise it as you go. At the top, one line per entry with its class and its actionable mark. End with a block headed `## His quotes`, every quote of his that your judgement relies on, one per line, exactly as `show.py` prints it: `HIS 2026-09-26T10:21:32.097Z | Run Fable judgement as well.`. Your final message: the path and the one-line-per-entry list.
