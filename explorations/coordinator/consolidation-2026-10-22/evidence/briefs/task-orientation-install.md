<!-- The skill writer's task of 2026-10-22: install the consolidated orientation as the fortress-repo skill's revival part, with the judge's two corrections, the disposition's moves, the provenance mapping and the core's line for the part. -->

# Your task: install the consolidated orientation

The orientation workflow rewrote `fortress-repo`'s revival part, `.claude/skills/fortress-repo/references/revival-changes.md` (74K characters, 54 entries in the form Original, Resolution, Reason), as a short account of how revived Fortress differs from the original, which every worker reads whole before work. The standard is `explorations/reviews/revival-record-synthesis.md`, "Addendum: restore a whole-readable worker orientation". The run's files are in `explorations/coordinator/consolidation-2026-10-22/evidence/orientation/`: `orientation.md` (the text), `outline.md`, `disposition.md` (where each old entry goes), `sources-mapping.md`, `preserve.md`, the cold reads, the quiz and `judgement.md`. Read `judgement.md` whole first, then `disposition.md`.

The judge passed five parts and held two sections, each for one sentence, and gave the corrected sentence for each, checked against the code (`queue.md`, "The other way"). The coordinator takes those two corrections rather than keep 21K characters of old entries for one sentence each. So install the whole text, with:

1. Line 11 of `orientation.md`: delete " (row 536)" from "not at one only (row 536)." Row 536 is fixed, and line 7 reads a cited row as a known departure.
2. Line 73: replace "Until the switch-over, the compiler's library has powers only at `ZZ32`, `NN32` and `NN64`, with an exponent of the same type." with "Until the switch-over, the compiler's library has integer powers only at `ZZ32`, `NN32` and `NN64`, each with an exponent of its own type; its `RR64` power takes an `RR64` or a `ZZ32` exponent, a negative one included." (`CompilerBuiltin.fsi:433`, `:455-456`; `CompilerBuiltin.fss:955-971`.) In `explorations/coordinator/tools/orientation/regression/key.md`, case 7, say that `10.0^(-k)` compiles before the switch-over.

Then, as `judgement.md`'s "The part after the install" says, now for all seven parts:

- Replace `revival-changes.md` with the corrected text. The old text stays in git; do not keep its entries.
- Make the moves of `disposition.md` for every section: its rows 5, 6, 10, 27, 28, 31, 32 (with P15's correction: walk's row 755 goes to `interpreter.md`, "What walk checks"), 38 (the typed `fail` to `library.md`) and 44 (settle U1: `library.md`'s `SUM` bullet takes F-59's rule, as the orientation's line 79 does). Each move is a sentence or two in the area part, in its form; check each against its source before you write it.
- Update every pointer into the old part: `interpreter.md:38` names the orientation's heading, `exploring.md:41-42` as `outline.md` says, and grep the skills for the old headings.
- The core's line for the part (`.claude/skills/fortress-repo/SKILL.md`, "The parts": "What the revival changed in the team's Fortress, each change with its contradiction and reason; load it when ...") and the core's description: the part is now the short account that a worker reads whole, after `SKILL.md`, before work. Keep the description within its length.
- Add `sources-mapping.md` to `.claude/skills/fortress-repo/references/sources.md` as a dated consolidation entry of 2026-10-22, mapping each new heading to the old entries and their evidence. Keep the older entries as they are.
- Run `python3 explorations/coordinator/tools/skills-lint.py` on every file you change; it must print no hit for them.

Report the part's size, each move with its file, each pointer changed, and any sentence you could not place. Commit by named paths.
