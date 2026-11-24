<!-- The brief of the writers of the pilot of the whole record's consolidation (round 1, a mix of cases; round 2, one whole chunk), written by the coordinator on 2026-11-24 from the October writers' brief, the definition of an entry, the clarity writer's rules and the curator's rules of that day; kept in the repository so that the step can be run again. -->

# Brief: a writer of the consolidation's pilot

You are an Opus writer in the Fortress revival repository, `/home/user/fortress`, branch `main`. You rewrite a set of entries of the project's record of facts, `explorations/coordinator/FACTS.md`, as a pilot that the curator, the person in charge, reads before the whole record is consolidated. You run no Fortress program. Load the `fortress-repo` skill (Skill tool) and read its parts `references/records.md` and `references/committing.md`. Keep every wait under 240 s.

## The goal

The curator's words (2026-10-13): "I really hope that the consolidated record is significantly smaller than before. Like that is a goal. That's why we define the multi-layer system with the optimized build and the debug build that has the provenance. So that must pay off. That when the facts and positions get loaded. We have saved a significant amount of space, but not lost any reasoning capabilities from the status quo. We want to have better performance and much lower memory cost. That's the goal."

His words of 2026-11-24, which bound it: "We are not supposed to be cutting for cutting. ... Facts can be larger than 600. That's not a problem on its own. It is a problem when the sum is too large. So if the sources for growth are like duplication and restatement of the same things between facts, that must go. We must use reference pointing." And: "the workers and you as a coordinator have been pre-trained on some knowledge about Fortress, and facts are recording the deviations from your knowledge. Like, this is for in-context learning."

So the record gets small by saying each thing once, under the entry that owns its subject. It does not get small by cutting words out of an entry.

## What you read first

1. The definition of an entry: the `coordinator` skill's `references/record.md` (`/home/user/fortress/.claude/skills/coordinator/references/record.md`), sections "What an entry is" and "A consolidation", and the five worked examples that it names (`explorations/coordinator/tools/facts-extract.sh 'doc:explorations/coordinator/process-engineering/record-rule-draft.md#Worked examples'`). Follow them exactly. Its six questions decide where a sentence goes. A sentence moves to its home; it is never lost.
2. The October writers' brief, `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/october-briefs/05b-writers-template-after-edit.md` (or the file `05b-*` of that folder): its rules for an entry's line, its provenance line, its pointers and its merges hold for you.
3. The clarity writer's rules for writing an entry: `/home/user/rec-adjust/explorations/coordinator/tools/record-clarity/writer.md`, its section "How to write each entry". Every condition, exception and limit of a claim stays. Clarity comes first. 600 characters is a check, not a cap.
4. The sorting map: `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/sorting-map/MAP.md`, its sections 3 (the subjects and their owners), 4 (the groups of overlap), 5 (each entry's disposition) and 7 (the pilot); `map.json` beside it holds the same as data. For each of your entries, its claims by subject and kind are in the file `claims-<chunk>.md` of that folder that holds the entry (`grep -l` for its number).
5. For each of your entries, what today's checks found: `evidence/stale-claims.md` in the post-mortem folder, and the scout's file that holds the entry, `evidence/consolidation/scout-<chunk>.md` (for entries of the section "The harness and the gate", `pilot/chunk-harness-gate.md`).

## The rules

- **One subject for each entry.** Where the map splits an entry, each part goes to the entry that owns its subject, and the entry keeps the part that its title states. Where no entry owns a subject, write a new entry for it.
- **Merge where one home is right.** Where two entries say the same, one keeps the claim whole and the other points to it, or the two become one entry.
- **A claim leaves an entry only in one of these ways:** it stands whole, with its conditions, in an entry that this one points to; or it goes word for word to the history (the tool does this with the old line), to the report that the entry cites, or to the gap ledger row of its defect. If none of these holds a claim that a reader needs, the claim stays.
- **A defect's description belongs to its ledger row.** The entry keeps the row's number with a few words on what the row holds. Check with `explorations/coordinator/tools/facts-extract.sh 'ledger:N'` that the row holds what you take out of the entry; if it does not, write the row's new text as a proposal in your report (below), and keep the claim in the entry until then.
- **A fact never cites a skill,** and that a skill says a thing is never a reason to cut it from a fact.
- **A fact does not point back at the decision that it builds.** Leave out a sentence such as "It builds P-45". A pointer to another fact stays.
- **Tests:** where a test guards the fact, the entry names that one test, or one name pattern, not a list. Before another test name leaves, check that the report that the entry cites names it; list those that no report names in your report.
- **History, plans and status leave the entry:** dates, batches, repairs, what is built or still to build. The tool keeps the old line in the history.
- **Detail that is needed only while doing the work** stays in the report, and the entry names the section.
- **A claim that today's checks found false, stale or beyond its support:** reword it to what its support holds, where the finding shows that plainly. Where it does not, keep the claim and list it under "to investigate". Delete no fact silently.
- **Remove no entry** unless the map merges it into another; then say where each of its claims went.
- **Write halfway to ASD-STE100:** plain short sentences, one word for one thing, each term explained where a reader new to the project would need it. Each entry is one line with a bold title that states the fact. A pointer is the other entry's number with a few words on what it holds.
- **Length:** no entry is cut to reach a size. For each entry over 600 characters, name in your report the question of the definition that keeps its extra sentences.

## What you do

1. Make a work tree of your own: `git worktree add /home/user/rec-pilot-@KEY@ HEAD` (detached; create and push no branch). Work only there.
2. Write the apply file for `explorations/coordinator/tools/record.py` (its usage is in its header): each entry that changes, rewritten as one line with its provenance line under it, each new entry, and each merge.
3. In your work tree, run `record.py apply` with your file and then `record.py check --base HEAD`. Fix the file until the check passes. **Change nothing in the main tree's record, and do not commit in your work tree.** Leave the work tree in place with your file applied: the coordinator runs a test on it.
4. Copy your apply file to `/home/user/fortress/explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/pilot-2/round-@KEY@.apply`, and write beside it `round-@KEY@.md`, with a header comment that says in one sentence what it is. It holds:
   - for each case or entry, in the map's order: the entry's number; its old text; its new text; and **for each claim that left it, where the claim now stands**: the entry (with the sentence), the history, the report section, or the ledger row. This list is what the curator checks, so no claim may be missing from it;
   - each new entry, with the subject that it owns and the entries that its claims came from;
   - the size of your entries before and after, in characters, each entry and the sum;
   - each entry over 600 characters, with the question that keeps its length;
   - the ledger rows whose text must change so that a defect's description has its home, each as a proposal with the words to add; and the defects that have no row;
   - the test names that no cited report holds;
   - the claims to investigate;
   - each place where the map's disposition was wrong or could not be followed, and what you did.
5. Commit the two files in the main tree, by their paths, with the skill's footer, and push the three refs as the committing part says for work on `main`. The folder is an evidence folder, so it needs no INDEX line. If `git log origin/main..main` shows only your own commits and those of other finished workers of the post-mortem folder, push them together.

Your final message, at most 15 lines: the two files and their commit; the number of entries before and after; the size before and after; what the check showed; the splits, the merges and the new entries, one line each; and what you could not do.

## Your set

@SET@
