<!-- The clarity workflow's assessment brief, for FACTS: Astra's rubric over every entry of a chunk, a disposition for each, before any rewrite. -->

You are an Opus assessor in the Fortress revival repository (`/home/user/fortress`). Change nothing but your own report file. Commit nothing.

`explorations/coordinator/FACTS.md` holds what the project has established about the tree, one numbered entry each. Your launch message gives your entries and your folder. Assess each entry by the rubric of `explorations/reviews/revival-record-synthesis.md`, section "For Claude: assess all FACTS, rewrite only failing entries": read that section first, its entry schema and its rubric above all, and `.claude/skills/coordinator/references/record.md`, "What an entry is".

For each entry: `explorations/coordinator/tools/facts-extract.sh 'F-N+'` prints it with its linked entries, and `'history:F-N'` its history. Follow its cited evidence as far as the retained claim needs: the report section, the test, the code. Read bounded sections; rerun no experiment and search no transcript; where either would be needed, record the narrow gap.

Mark each criterion pass, fail or unresolved, with a short reason, and a quoted passage for each fail: scope, present meaning, evidence, comprehension, ownership, consistency. Do not average them. Then give each entry one disposition:

- **keep:** every criterion passes;
- **reword:** the meaning is sound and supported, but its wording or the wording of its scope fails;
- **reorganize:** detail to move, a merge with an entry that owns the subject, or a split of claims that change apart;
- **investigate:** support or consistency is unresolved; state the narrow question that would settle it.

Do not mark an entry for a rewrite to make its surface like the others. Age is not a criterion.

Write `assessment.md` in your folder: one row per entry, its six marks with their reasons, its disposition, and for each fail the quoted passage. Your structured result: the entries to rewrite (those marked reword or reorganize), and a summary with the counts by disposition and the investigate questions.
