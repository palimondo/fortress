<!-- The briefs of the workers of the 2026-10-13 record consolidation, copied from the transcript because their scratch folder is gone. -->
# October briefs

Transcript: `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-11-07T23-09.jsonl.parts/001.jsonl`. Times are UTC on 2026-10-13. Each file starts with a one-sentence HTML comment, then the brief byte for byte.

## Files

- `01-record-rule-trial-brief.md`: the trial's brief, "Draft record rule and trial" (scratch `record-rule/brief.md`); 09:03; line 966.
- `02-pairs-trial-brief.md`: the brief of the pairs trial, FACTS and POSITIONS on one ground (as first written; an Edit of 10:24:30, line 1499, followed and is not applied); 10:24; line 1471.
- `03-scouts-template.md`: the scouts' template `brief-scout.md`; 17:45; line 3305.
- `04-scouts-chunk-script-pilot.md`: script text that filled the scouts' template for chunks F2b and P2; its briefs are `scouts-filled/04-scout-F2b.md` and `-P2.md`; 17:45; line 3314.
- `04-scouts-chunk-script-rest.md`: script text that filled the scouts' template for F1, F2a, F2c, F3, F4, P1, P3; its briefs are the other seven files of `scouts-filled/`; 18:00; line 3418.
- `05-writers-template-as-written.md`: the writers' template `brief-writer.md` as first written; 17:45; line 3322.
- `05b-writers-template-after-edit.md`: the writers' template after the two sentences added (the template's first python script of the Bash call, which also edited BOOT.md, not copied); 18:02; line 3523.
- `06-writers-chunk-script-pilot.md`: script text that filled the writers' template (as first written) for F2b and P2; its briefs are `writers-filled/06-writer-F2b.md` and `-P2.md`; 18:01; line 3483.
- `06-writers-chunk-script-rest.md`: script text that filled the writers' template (after the edit) for the seven other chunks; its briefs are the other seven files of `writers-filled/`; 18:24; line 3878.
- `07-step12-brief-as-written.md`: the brief of "Step 12: retire the old homes" as first written; 19:46; line 4546.
- `07b-step12-brief-as-edited.md`: the same brief after the edit; 19:49; line 4715.

The filled briefs are the text that the scripts produced. The scratch folder is gone, so they were rebuilt by running the transcript's own commands, line 3314, 3418, 3483 and 3878, on the saved templates (the writers' template as first written for the pilot, as edited at line 3523 for the rest). The scouts' filled briefs `scouts-filled/04-scout-<chunk>.md` come from lines 3314 (F2b, P2) and 3418 (the others). The writers' filled briefs `writers-filled/06-writer-<chunk>.md` come from lines 3483 (F2b, P2) and 3878 (the others).

## The record test of that day

Not copied: its files are in the repository, in `explorations/coordinator/process-engineering/record-test/`: `README.md`, `questions.md`, `key.md`, `brief-reader.md`, `brief-grader.md`, `fill.py` and the grades. The transcript also holds the Write calls of `record-test/brief-scenarios.md` (line 1410, 10:18 UTC) and `brief-scenarios-2.md` (line 1603, 10:42 UTC), the briefs that wrote the scenarios; they are not in the repository and were not copied, since the files above are.

## Texts of the method still in the repository (no copy)

- The definition and its worked examples: `explorations/coordinator/process-engineering/record-rule-draft.md`, lines 117 to 256.
- The tool: `explorations/coordinator/tools/record.py`.
- The clarity rewrite's briefs: `explorations/coordinator/tools/record-clarity/` (`writer.md`, `assess.md`, `check.md`, `coldread.md`, `fix.md`, `judge.md`); the version that its run on FACTS used is commit `913ba1cbfc`.

## Check

A script compared each saved brief with the transcript: the Write contents (01, 02, 03, 05, 07), the Bash commands (the four script files), and the templates and brief with their edit applied (05b, 07b). All 11 files are identical to the transcript text. The 18 filled briefs were checked to hold the template's text around every placeholder, in order, with no placeholder left. The check passed; nothing differs.
