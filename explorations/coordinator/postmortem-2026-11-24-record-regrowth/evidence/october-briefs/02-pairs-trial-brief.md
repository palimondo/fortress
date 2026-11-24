<!-- The brief of the pairs trial (FACTS and POSITIONS on one ground), as first written, 10:24 UTC on 2026-10-13, copied from transcript line 1471. -->
You are an Opus worker. You edit files in one folder only, `/home/user/record-test-q`, a git worktree of the Fortress revival repository that holds a trial of a draft record rule. You build nothing and run no Fortress program. You make no commit and push nothing. You do not touch `/home/user/fortress` or `/home/user/record-test-p`, and you read no session transcripts. Load the `fortress-repo` skill and read its part `references/records.md`.

## The rule

The draft rule is Part 2 of `/home/user/fortress/explorations/coordinator/process-engineering/record-rule-draft.md`; read it, and Part 3's entries for FACTS 53 and POSITIONS 48 as worked examples. In short: an entry states what is true now; it keeps the one number a decision rests on, the test that gates it (one name or a name pattern) and a pointer to the report section that holds the rest; under about 600 characters; the default is to cut. FACTS holds what the tree does; POSITIONS holds what the curator decided and why.

## Your task: one home for what FACTS and POSITIONS both tell

In the folder's `explorations/coordinator/POSITIONS.md`, lines 48 ("A type parameter the arguments do not fix takes its bound, never `Bottom` ...") and 60 ("The `comprises` passages read at the level of values ...") are already rewritten by the rule. Four FACTS entries tell the same ground from the side of the tree:
- line 78, "The compiled checker instantiates a type parameter that nothing at a call fixes ...";
- line 141, "Under `walk`, a type parameter that nothing at a call fixes takes its declared bound ...";
- line 175, "The specification gives the run-time instance of a dispatched declaration by the POPL 2019 paper's rule ...";
- line 76, "The compiled checker accepts the Meet Rule's `comprises` example ...".

1. Rewrite those four FACTS entries by the rule. Each states what the tree does, its test and its report, and names the decision it builds by the POSITIONS entry's bold title, in the form the record uses (`POSITIONS, "<title>"`), without restating the decision or its reason.
2. Give POSITIONS 48 and 60 each a pointer by title to the FACTS entries that say what is built and where, in the same form, and change nothing else in them. They may then pass 600 characters; say by how much.
3. Keep the opening words of each title that citations quote. Run `explorations/coordinator/tools/facts-extract.sh --check` in the folder and confirm that every key still resolves.
4. Append each FACTS entry's earlier text to the folder's `explorations/coordinator/FACTS-history.md`, and POSITIONS 48's and 60's texts before your edit to its `POSITIONS-history.md`, at the end of the section `## Rewritten 2026-10-13, the record rule applied` that is already there, each with a comment line in the form of that section's lines. Then run, in the folder, `python3 explorations/coordinator/tools/check-verbatim.py HEAD explorations/coordinator/FACTS.md explorations/coordinator/FACTS-history.md`. It compares against the commit the folder was made from, so it lists the ten trial entries too; it must exit 0. Do the same for POSITIONS.
5. Check with one bounded `grep` that each cut fact lives in the report or the FACTS or POSITIONS entry you point to.

Write your report to `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/record-test/pairs-report.md`: for each of the six entries the new text, its size before and after, and what was cut with where it lives; the two scripts' results; and, for each pair, whether the duplication you removed did any work a reader would miss, in a line. Your final message is short: the sizes, the scripts' results, and that line per pair.
