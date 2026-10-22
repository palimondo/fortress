<!-- The skill writer's task of 2026-10-22 after the FACTS consolidation: the record's entries carry no planning or status references, so the planning terms leave the fortress-repo glossary; the gap ledger's new ledger.py commands and landing check in the skills and the batch manual; three stale quotes. -->

# Your task: the record without planning references, and the ledger's new commands

Three changes, each with the curator's word behind it. Keep each part's form and register; a rewrite is never longer than the text it replaces, except by the new rule's own sentences.

## 1. Entries carry no planning or status references

The curator's rule of 2026-10-22, condensed from his words: POSITIONS and FACTS are timeless or describe the present. The future lives in PLAN, and what waits for his review lives in the review queue. Each PLAN item or queue item points to the entry it concerns; an entry does not point back. A worker reads FACTS and POSITIONS and should meet nothing of the coordinator's planning there. "row N" always means a row of the gap ledger. A scrape of the record by these rules is landing now.

- `.claude/skills/coordinator/references/record.md`, "What an entry is": the POSITIONS bullet says an entry holds "what is still to build, with its PLAN item" and that its "Built." or "Still to build:" line stays. Replace that with the rule above: no state words, no PLAN phase or item, no queue item, no "waits for his review"; a part of a decision that the tree lacks is a row of the gap ledger, which the entry may name as "row N" with a few words; PLAN and the queue name the entries. Say the same for FACTS where the part needs it, and add to the pass (its step 3 or a step of its own) that the pass keeps entries to this rule at each landing.
- `.claude/skills/fortress-repo/SKILL.md`, the glossary: commit `a898e1baf` moved the coordinator's working terms into it at the curator's word of 09:30 UTC. At his word of about 11:03 UTC they go back, because the skills lint (`explorations/coordinator/tools/skills-lint.py`) keeps the coordinator's records out of the worker skill on purpose, and the entries no longer need them. Move **PLAN**, **review queue**, **default**, **Built.**/**Still to build:**, **batch**, **rung** and **distance** back to `.claude/skills/coordinator/SKILL.md`'s glossary (or `references/batch.md`, where a term only a batch uses lived before, as `git show a898e1baf` shows); move **count stage** back to `fortress-repo/references/compiler.md`, where it was. **model program** and **one library** stay in the `fortress-repo` core. If a remaining `fortress-repo` sentence uses a term that moved, reword it so that it does not need the term.
- Run `python3 explorations/coordinator/tools/skills-lint.py` on every file you change: it must print no hit for them.

## 2. The gap ledger's new commands and its landing check

`explorations/coordinator/tools/ledger.py` gained, at `1ac7028b4`: `rewrite N FILE` (a whole new line for a row, checked by the template, the old line in the history); `close --settled TEXT` for a `CONTESTED` row, and `close --test` taking a file under `explorations/coordinator/tools/` or `none` with a `--note` reason; `note` inserting before the row's "full text: history, row N" marker and linting only the cells it changes; and `landing-check BASE`, which fails on the template, an `XXX` test deleted or renamed while an open row names it, a commit that says it fixed an open row, and a FACTS or POSITIONS entry that disagrees with a row's status. The tool's header gives the detail. The batch workflow runs `landing-check` in the gather and the review at `c9b5beb36`, and a rung hands over a changed row's whole new line for `rewrite`. The reason, from `explorations/coordinator/ledger-health-2026-10-22/REPORT.md`: with no command to edit a row, 117 notes were refused in batches 11 to 20 and rows kept claims that a batch had made false.

- `.claude/skills/fortress-repo/references/records.md`, "The gap ledger" and "Writing to the record": its "Three limits of `ledger.py`" and "To change a row" are now false. State the commands as they are, including that a row states its gap as it stands now: a change of what a row says goes through `rewrite`, not a note that tells the repair.
- `.claude/skills/coordinator/references/batch.md`, "The landing": the landing check, and that a landing fails on any finding.
- `explorations/coordinator/climb-batch-workflow.md`, lines 160, 164 and 176: the manual's ledger steps, to match the script.

## 3. Three stale quotes

- `.claude/skills/fortress-repo/references/compiler.md:54` queries `positions:Storage is`; P-84's title has changed. Use a key that `facts-extract.sh 'positions:WORDS'` finds in P-84's present title.
- `explorations/coordinator/climb-batch-workflow.md:248` quotes P-30's old title, "The microGPT walk check is quick."; quote it as POSITIONS has it now, or name it by its subject.
- `explorations/coordinator/lineage.md`, "Files that still repeat it": bring the list to match commit `a4e266faa`.

Write the provenance lines in each skill's `references/sources.md`, dated 2026-10-22. Commit by named paths, and report as your standing order asks: each change, the lint's result, and any sentence you could not place.
