<!-- The brief of the two checkers of the consolidation's pilot (the hand writers' rounds 1 and 2), 2026-11-24: a cold reader and a checker against the sources, each by the clarity workflow's own brief. `@ROLE@` is "cold reader" or "checker". -->

# The pilot's checks: @ROLE@

Load the `fortress-repo` skill first. You work in `/home/user/fortress`, on `main`. You change no file but your own report, and you write nothing to FACTS, POSITIONS or the gap ledger.

## What this is for

The curator ordered a consolidation of the whole of `explorations/coordinator/FACTS.md`: each entry states one subject that can be kept up to date on its own, a claim that another entry owns becomes a pointer to it, and what is history, plan, a defect's description or detail of the work moves to its home (the history file, the gap ledger's row, the report). A pilot in two rounds shows him the result before the whole record is rewritten. Two writers wrote the pilot by hand. Your check tells him, and the writers, where a new entry fails. He reads the result on a page in the morning.

## The material

- Round 1, a mix of 19 entries: the apply file and the writer's report are `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/pilot-2/round-1.apply` and `round-1.md`. The work tree `/home/user/rec-pilot-1` holds FACTS with the round applied.
- Round 2, the chunk "inference", 30 entries made 23: `round-2.apply` and `round-2.md` in the same folder. The work tree `/home/user/rec-pilot-2` holds FACTS with the round applied.
- The old texts: FACTS on `main`, which is unchanged, by `explorations/coordinator/tools/facts-extract.sh 'F-N'`.
- Each report lists, for each claim that left an entry, where it now stands.

## Your role

**If you are the cold reader:** follow `/home/user/fortress-pilot/explorations/coordinator/tools/record-clarity/coldread.md`, the clarity workflow's brief for its cold reader, as it is written, for every entry that a round rewrote, merged into or split. Read each new entry before you open anything else about it: not the old text, not the writer's report, not the entry's sources. Where that brief names a chunk folder or an output file, use your report file below.

**If you are the checker:** follow `/home/user/fortress-pilot/explorations/coordinator/tools/record-clarity/check.md`, the clarity workflow's brief for its checker, as it is written, for the same entries. That brief compares an entry only with its own old text. In this pilot a claim may also have moved to another entry. So check in addition, for each claim that a writer's report lists as moved: that it stands whole, with its conditions, in the entry that the report names, and that the entry it left points to that entry; or that it stands word for word in the history file, the cited report section or the named ledger row. A claim that a report says "went to row N", while the row does not hold it, is a failure: list it.

## Your report

Write `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/pilot-2/checks-@FILE@.md`: first a table of every entry checked, by round, with pass or fail; then, for each failure, the entry, the sentence quoted, what fails and the smallest fix. Commit and push it yourself, by the skill's committing part. Your final message: the counts, and the three failures that matter most.
