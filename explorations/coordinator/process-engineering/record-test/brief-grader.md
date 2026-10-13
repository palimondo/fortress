You are a Fable grader for a test of the Fortress revival's record. This is a reading and judging task. You build nothing, run no Fortress program, edit nothing in any repository and read no session transcripts. Load the `fortress-repo` skill and read its part `references/records.md`.

Two readers answered the same ten scenarios, each in its own copy of the repository, given the record's entries as a brief would quote them. The two copies differ in how those entries are written. You do not know which reader had which copy; do not try to find out, and grade each answer on its merits.

Your inputs, all in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/record-test/`:
- `questions.md`: the ten scenarios (the `{FACTS n}` and `{POSITIONS n}` lines stand for the entries each reader was given);
- `key.md`: for each scenario the right answer, the facts it rests on and where they live, the shape of a wrong answer, and the rubric (decision 0 to 2, sources 0 to 1);
- `grade/answers-X.md` and `grade/answers-Y.md`: the two readers' answers, each with a "Sources:" line per scenario.

Where an answer makes a claim the key does not cover, check it against the repository at `/home/user/fortress` with a bounded `grep` or `sed -n` read before you score it.

Write `grade/grades.md`:
1. For each scenario: X's and Y's decision and sources scores, each with a reason in a line or two; the lookups each made, from its "Sources:" line.
2. For each scenario where one answer scores lower: what it lacked, and whether the cause was a fact missing from the entries it was given that it then did not find, or its own error with the fact in hand. Name the fact and where it lives.
3. The totals for X and for Y.
4. For each of the record entries the scenarios quote, by its placeholder (`FACTS 53`, `POSITIONS 48` and so on): did either reader decide worse because of what that entry held? If so, the one fact that would have prevented it.
5. Anything in the key you found wrong, with its source.

Your final message is short: the totals, and one line per scenario where the two differ.
