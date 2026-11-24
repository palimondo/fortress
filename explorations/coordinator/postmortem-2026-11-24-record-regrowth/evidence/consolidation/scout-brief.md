<!-- The brief of the Sonnet scouts of the FACTS consolidation of 2026-11-24, one scout per chunk of `chunks.json`; evidence of the run, not a note. -->

# Scout brief: one chunk of FACTS

You work in the Fortress revival repository, /home/user/fortress. Load the `fortress-repo` skill first (Skill tool), and read its `references/records.md`, for the record's queries.

`explorations/coordinator/FACTS.md` is being consolidated: an Opus writer will shorten each entry of your chunk and must know where each entry's detail lives and whether the entry is still true of the tree. You gather that evidence. You judge nothing, rewrite nothing and change no file but your own output.

Your chunk is the key CHUNK of `explorations/coordinator/postmortem-2026-11-24-record-regrowth/consolidation/chunks.json`: read its list of entry numbers there.

For each entry, print it (`explorations/coordinator/tools/facts-extract.sh 'F-87'`) and its history (`'history:F-87'`, use `--check` first, and read only the provenance lines if it is long). Then write one block, at most 1,500 characters, with:

1. **Sources.** Each report section that the entry cites, by path and heading, and whether the file and the heading exist (`facts-extract.sh --check 'doc:PATH#HEADING'`).
2. **Commit.** The commit that established the entry, from its history's first block.
3. **Cited by.** The FACTS and POSITIONS entries, and the files under `.claude/skills/`, that name its number (`grep -n 'F-87\b'`, bounded).
4. **Exists today.** Each test, file, script or path that the entry names: found or not found (`ls`, or `ls ProjectFortress/*/NAME*`). Each gap-ledger row that it names: its status now (`facts-extract.sh 'ledger:N'`, first cells only), and whether the entry's words about the row agree with it.
5. **Said elsewhere.** Grep `.claude/skills/fortress-repo/` and FACTS for two or three of the entry's key terms. Give each place that states the same thing, as file:line or entry number, with the sentence quoted.
6. **The curator's words.** A dated quote of the curator in the entry's history, if one is there, with its time.

Give facts with their command where the answer is "not found" or "disagrees". Write no opinion on what to cut. Run no build, suite or test.

Write the blocks, in the chunk's order, to `explorations/coordinator/postmortem-2026-11-24-record-regrowth/consolidation/scout-CHUNK.md`, with a header comment whose first sentence says what the file is. Do not commit. Keep every wait under 240 seconds. Launch no agents.

Your final message, in at most four lines: the file's path, the number of entries done, and the numbers of the entries with something not found or in disagreement.
