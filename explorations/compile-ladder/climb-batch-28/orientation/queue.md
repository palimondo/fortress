<!-- The orientation workflow's review-queue items from climb batch 28's update, in the form of `explorations/coordinator/review-queue.md`: none, because the judge held no section of orientation.md; the points that are not items, for the coordinator. -->

# Climb batch 28's update of the orientation: items for the review queue

The judge held no section (`judgement.md` in this folder), so this run files no item for `coordinator/review-queue.md`. Two sections install:
- **"Numbers"**: P-161's rule. An integer converts to another integer type by a checked getter (`asZZ32`, `asZZ64`, `asNN32`, `asNN64`, `asZZ`), which keeps the value or raises `IntegerOverflow`, or by a low-bits function (`narrow`, `widen`, `signed`, `unsigned`, `big`), which never raises. `ZZ` has only `big`, so write `z.asZZ32`. The rule also gives the compiler prelude's limits until the switch-over (row 349).
- **"Dispatch and overloading"**: the fix round's "because" in the Meet Rule paragraph. An object excludes every trait that it does not extend, because no other type can extend it (`Specification/basic/types-vals-vars.tex:285-288`).

The opening, "Traits and objects", "Static parameters", "Reductions" and "Implementation limits" are unchanged.

`judgement.md` records these points, which are not items, because none is a held section:
- **The lint hit at line 93.** "8 of the 25 getters" matches the skills lint's stale pattern. Neither writer could run the lint.
  - Default: the skill writer fixes it at the install as "has only 8 of the getters", which lints clean, with one item that shows the fix alone (`coordinator/references/skill-rewrite.md:22`).
  - The other way: an `ALLOW` entry in `skills-lint.py`, since the count does not move until the prelude goes.
  - See "Numbers: install".
- **The install's conditions.**
  - In the same commit, `sources-mapping.md` goes into `sources.md`, with the specification's lines for the "because".
  - The skill update takes the admission's "Elsewhere" list. It also takes row 348, which both quiz gradings found in no part: the prelude's `DOTPLUS` saturates, its `BOXPLUS` wraps, and it has no `DOTTIMES`.
  - The quiz's uncommitted `key.md` and `questions.md` go with this folder: cases 6, 16 and 17 read again, and case 30 added.
  - See "The install".
- **The size exception.** The part grows from 24,152 to 25,121 characters against a budget of 8,000 to 12,000. The exception is accepted for this install, the fourth update in a row to accept it, and nothing was cut to make room.
  - The batch 27 judge asked for the conflict to be settled before this update. The record shows no settlement.
  - The curator's word of 2026-11-02, 06:51, in the held list, calls a consolidation pass of the skills overdue, after the plan's consolidation, by this workflow and the cold reads.
  - The coordinator settles it before the next update adds to the part: a consolidation run, or a new budget.
  - See "Size".
- **Findings on unchanged text.** There are ten, for the next update.
  - The highest is `cold-read-2.md` item 2.8 (80%). Line 55's "`SEQV` follows the specification on both paths" comes before its exception until the switch-over, the prelude's `===` (row 908), which the paragraph gives only at its end.
  - The opening's conventions, batch 27's findings 1, 2 and 5, are still open.
  - So are the batch 26 judge's findings on `override` (row 650), departures that cite no row, and row 578.
  - See that section of `judgement.md`.
