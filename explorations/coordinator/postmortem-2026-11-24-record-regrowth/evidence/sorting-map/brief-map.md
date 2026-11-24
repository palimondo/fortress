<!-- The brief of the worker that joined the claims files into one sorting map of FACTS by subject (MAP.md and map.json), the second step of the sorting for the batch mode of the record's consolidation; the prompt of the coordinator's Agent call "Sorting map from the claims" of 22:22:57 UTC on 2026-11-24 (Opus, xhigh effort), copied word for word from line 36456 of the session's transcript fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl. -->

You work in the Fortress revival repository, `/home/user/fortress`. Load the `fortress-repo` skill (Skill tool) and read its parts `references/records.md` and `references/committing.md`; then read the `coordinator` skill's `references/record.md` (`/home/user/fortress/.claude/skills/coordinator/references/record.md`). You only read, and you write the two files named below. Change no entry of the record, no tool and no skill. Keep every wait under 240 s.

## The problem

`explorations/coordinator/FACTS.md` holds 339 entries. It is to be consolidated by the method that worked in October 2026, in chunks, one writer for each chunk. One thing is different now: an entry was written by one task of a batch and holds what that task found, whatever the subject. So before the chunks are cut, the record must be sorted by subject. The model is the sorting of the gap ledger on 2026-10-08, with the duplicates found first and each group of one topic given to one writer (`explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/sorting-by-topic.md`, its sections on the ledger).

The first step is done. Six workers listed, for each of the 339 entries, its claims by subject and by kind, and which entries overlap: twelve files `claims-<chunk>.md` in `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/sorting-map/`, written by the brief `brief-claims.md` in that folder. Read that brief first, so that you know the files' form. Each file ends with three lists: its subject labels with their entries, its groups of overlap, and what it could not settle. The six workers chose their labels apart from each other, so the same subject has different labels in different files.

Your task is the second step: one map of the whole record by subject, from those twelve files. You rewrite no entry. The map is for the curator, the person in charge, who reads its summary in the morning, and for the writers of the chunks.

The twelve files are large. Do not read them all whole at once. Start from the three lists at the end of each file, build the subjects from those, and open an entry's block only where the lists do not settle where its claims go. Use scripts to collect and count.

## What the map holds

Write `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/sorting-map/MAP.md`, with a header comment whose first sentence says what it is. Plain short sentences; define each term where you first use it; this file's first two sections are read by the curator.

1. **The numbers,** in a few lines: entries by shape (one subject, several subjects, mostly a defect, mostly history or plan, not about the tree); claims by kind (property, defect, history, plan, choice, detail, tests, pointer), summed over the twelve files; how many entries take part in a group of overlap; how many claims of the kind defect name a ledger row and how many name none.
2. **What the sorting means for the consolidation,** in at most fifteen lines: how many entries can stay as one entry; how many are to be merged into another; how many are to be split, and into how many parts on average; the ten largest subjects, each with the number of entries that speak to it today.
3. **The subjects.** One list of subjects for the whole record, with one label for each subject, grouped by area (the checker, the code generator, the compiled runtime, walk, both paths, the library, the specification, the harness and the gate, the tools, the repository, the model program). For each subject: the entries that speak to it, each with the numbers of its claims on that subject as the claims file numbers them; and the entry that states the subject best today, as the proposed owner. Where no entry owns it, say "a new entry".
4. **The groups of overlap,** joined across the twelve files: each group once, with its entries and what they share.
5. **Each entry's disposition,** one line for each of the 339, in the order of FACTS: stays as it is; is rewritten in place (one subject, with claims of the kinds history, plan, detail or tests to move out); is merged into F-n; is split, with each part's subject and the entry that owns it; holds a defect whose description goes to ledger row N; is not about the tree. Add the finding of today's checks where one exists (false today, beyond its support, cites a thing that is gone, unsettled), as the claims file gives it.
6. **The chunks for the batch mode:** the record cut into chunks of 20 to 32 entries, so that all entries of one subject and of one group of overlap are in the same chunk and no claim has to move between two writers. Give each chunk a short name, its subjects and its entries. Where a group is larger than a chunk, say how it is cut and which chunk must be applied first.
7. **The pilot.** The curator reads a pilot before any chunk runs. Its first round is a mix: one case of each kind, so that he sees what the method does to each. Name five to seven cases, each with the entries that it needs:
   - an entry with several subjects that is split, with the entries that own its parts;
   - two or three entries that say the same and are merged;
   - an entry that describes a defect beside its property, with its ledger row;
   - an entry that today's checks found false or stale;
   - an entry that is mostly history, or whose subject the work has passed;
   - a sound entry with one subject, which should change little;
   - one whole subject that several entries speak to, shown as it would stand after the sorting.
   Prefer entries that the new scenarios of the test of decisions rest on, so that the test can check the pilot: `explorations/coordinator/process-engineering/record-test/2026-11-24/README.md` lists them by scenario. Include F-63 if it fits a case, since the curator asked about it.
   Its second round is one whole chunk. Name the chunk of your list that holds the most kinds of case, and say why.
8. **What could not be settled,** joined from the twelve files, each once.

Also write `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/sorting-map/map.json`: the same subjects, groups, dispositions and chunks as data, so that a script can cut the chunks and a writer's brief can be filled from it.

Commit both files yourself, by their paths, with the skill's footer, and push the three refs as the committing part says for work on `main`. The folder is an evidence folder, so it needs no INDEX line. If `git log origin/main..main` shows only your own commits and those of other finished workers of this folder, push them together.

Your final message, at most 20 lines: the commit; the numbers of sections 1 and 2; the chunks, one line each; the pilot's cases, one line each, with their entries; the chunk for the second round; and what could not be settled.
