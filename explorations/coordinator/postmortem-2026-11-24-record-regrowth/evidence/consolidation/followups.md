<!-- What the chunk writers of the FACTS consolidation of 2026-11-24 handed back for the coordinator: the skill sentences to change, the pointers to repoint, and the entries to investigate, chunk by chunk; evidence of the run, worked off after the last chunk. -->

# Follow-ups of the consolidation, by chunk

## harness (applied `b1149bfbdb`)

Skill sentences to change (`fortress-repo`):
- `interpreter.md:109`: "On one core, the order is fixed for a given library" becomes "With three JVM flags set together, `-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1`, the order is fixed for a given library, but a library edit can change it; which flag fixes it is not known." Then F-108 leaves, and row 430's note "F-108's three JVM flags" points to the skill.
- `build-and-caches.md:113`: "At its end, the build keeps each of the three caches folders, `default_repository/caches`, `default_repository/caches-one` and `local_repository/caches`, only if the build's sources and build are as the last build left them and the folder holds that build's stamp, and empties it if not."
- `build-and-caches.md:114`: "`ant cleanCache` deletes the three folders, whatever their stamp, and starts each again, empty, with the build's stamp." After both, F-100 leaves.
- `tests-running.md:24`: "runs 130 of the specification's 135 extracted examples (...) under walk; the five of `SpecData/examples/library/` run in no suite." F-114 stays (P-124 points to it).

Pointers:
- `review-queue.md:1067`: "built (F-97)" is false now.
- `BOOT.md:48`: F-404 is gone; `worktrees.md`, "Seeding a worktree", holds its claim.
- `tools/orientation/regression/key.md:112-113`: F-99 becomes P-125 and `tests-running.md`, "The two suites".
- `tools/seed-worktree.sh:20`: the comment cites F-404.
- `fortress-repo` `sources.md:140` and `:1630` cite F-97 for step 7; `:618` F-105; `:1435` F-383; `:1610`, `:1619`, `:1635` F-404; lines 70, 113, 116, 145, 154, 164, 182, 183 cite entries by title.

Open:
- P-124 says every example must pass; the five of `SpecData/examples/library/` run in no suite. A ledger row or the curator.
- F-114's cut sentence on five examples that pass by walk's open parameter was not checked again (they may pass by F-228's join now).
- F-97 would sit better beside F-58.

## checker-1 (applied `9c3a9fe03a`)

Skill (`fortress-repo` `sources.md`): line 812 cites F-42, should cite `StaticChecker.checkCompilationUnit`; lines 802, 1318, 1334 cite F-59 for the reductions rule, should cite F-364 and P-78, and F-285 for the library's own sites; line 1305 cites F-58 for `1.0 s`, should cite F-366.

Pointers:
- PLAN lines 62, 63, 68, 69, 70 cite F-61's three steps and F-32's 449 classes (A to D2, the 36, the numeral bindings): now in the history and `CLIMB-BATCH-23.md`, "Where the natives stand".
- PLAN 109 cites F-58's 17: now in `switch-rehearsal.md`. PLAN 112 cites F-58's APL 54 sites and crash: now in `model-closure-check.md`.
- review-queue 298 and 302 cite F-45: should cite F-46. review-queue 761 and 765, and F-240, cite F-54 for `Char`: should cite F-334.
- F-288 cites F-54 for '#crash none': should cite F-53. F-90's "(F-53, which lists the five)" is stale.
- P-39 cites F-53 for "the distance counts every error": now in `compiler.md`'s glossary entry "distance stage".

Investigate:
- F-57: on today's one library, does `x + 1` under `T extends Integral[\T\]` still fail the checker and run under walk? Do `cast[\T\]`, `asif` and `widen` still fail? Measured before the numeral types were redesigned.
- F-58: do the 42 sites, 23 of them the index bound, still hold after the four library commits since `c0c35b4f9e`?
- F-20: "no optimization uses a size" rests only on a code reading of 2026-09-24.
- F-44's probe `ProbeMIEPick` and F-49's probe `FillBoxAny` are not in the tree.

## exec (applied `dcb017e045`)

Skill sentences to change (`fortress-repo`):
- `interpreter.md`, "What walk checks", first bullet. Now: "It accepts them if `comprises` clauses cover the overlap." Should read: "It accepts two top-level functions without static parameters, not methods, if declarations without static parameters below both cover the overlap through `comprises` clauses."
- `revival-changes.md`, "Dispatch and overloading". Now: "It compares declared domains where one lies strictly inside the other. Otherwise it compares the instances that the call makes." Should read: "Where one of the two declarations has static parameters of its own, it compares declared domains where one lies strictly inside the other. Otherwise, as for two functional methods of a generic trait or object, it compares the instances that the call makes."
- Optional, `SKILL.md`, "The phases": "as a failed dispatch" becomes "as a failed dispatch or another run-time error, such as an `if` on a non-`Boolean` (F-239)".

Pointers:
- P-162's "(F-301, F-301)": done.
- F-253's "(F-252)" for the instance comparison should name F-26.
- F-24 is kept short only because F-306 and F-312 cite it; it can leave once they cite `interpreter.md`, "Natives".
- Skill `sources.md` lines 933 and 1521 (F-24), 1652 (F-26, row 780) and 824 (F-350, row 982) cite claims now only in the history.

Not re-checked: F-19's "walk makes each block a task"; F-348's two clauses on top-level initializers and unnamed imports.
