<!-- Row 488's probe, before batch N: is the trait table's clause cache (fortress.analyzer.clauses.cache, TraitTable.scala:81-97) the cause of the compiled checker's errors in big operators' bodies that move with its earlier queries? Asked by the batch 7C review's finding 4 (reviews/batch-7C-review.md:109-114) and PLAN.md's "Work that can start now" (PLAN.md:191 at 581356f32); ledger row 488. For the coordinator, then the planner of batch N, whose rung I works in the compiled checker. Written 2026-09-28 from 17:20 to 20:05 UTC by an Opus worker on main, 7a9d6fb73 at the start (batch 6.5's fd5cb4864 and 581356f32 landed on main while it ran; the runs that count predate their effect, runs.txt). The gate's own tools, one JVM at a time, no ant, no tracked file touched outside explorations/reviews/row-488-probe.md and explorations/reviews/row-488-probe/. -->

# Row 488's probe: the trait table's clause cache, on and off

## The answer

1. No, on the landed build. With the clause cache off, the distance stage gives the same 626 errors as with it on and as batch 7C's gate, site for site. The count stage gives the same 75, line for line.
2. All three sites read the same both ways. The error at `Library/FortressLibrary.fss:1535` is there, `:304` and `:314` keep the landed spelling, and the `Comprehension` site stays at `:3416`. If the cache were the cause, the cache-off list would be the no-queries list, and it is not.
3. So row 488's history dependence lives outside the trait table's two memos. The base build's half of the test was stopped when batch 6.5 changed the library under it; by reading, the memo gives the same answers there too. With the cache off the runs took 4,718 s and 1,149 s, against 801 s and 112 s with it.

## What was run

- **The tree.** Main, with the checker, library and shadow sources unchanged since `0f00db11a`, the commit batch 7C's gate ran on. `ProjectFortress/build` was compiled at 16:17 UTC from those sources and was not recompiled until 19:47, after run 5.
- **The tools.** Both stages ran through the gate's own tools, `explorations/coordinator/tools/checker-count/run.sh` and `explorations/coordinator/tools/distance/run.sh`, each run with a private scratch directory that was deleted once captured.
- **The switch.** The cache was switched off with `FORTRESS_ANALYZER_CLAUSES_CACHE=false` in the environment. This is the environment form of the property that `ProjectProperties` reads for `TraitTable.scala:82`. The running JVM's `/proc/<pid>/environ` showed it.
- **The environment.** `explorations/experiment/env.sh`'s settings were exported by hand, without its `rm -rf /tmp/fortress*rats`, because batch 6.5's runs share the machine.
- **The machine**, for every run: nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz; openjdk 25.0.4; `FORTRESS_THREADS=1`. The load at start differed from run to run, as listed below.

The runs, in order (`row-488-probe/runs.txt` has each run's full machine line and the per-target seconds):
1. Count stage, cache on. The tool as tracked; load at start 2.77. It took 112 s and printed `#total 75`.
2. Count stage, cache off. The tool as tracked; load at start 1.62. The tool's 900-second timeout (`run.sh:69`) killed the run in the `FortressLibrary` api's overloading check, and it printed no table (`count-off-gate-tool.txt`).
3. Distance stage, cache on. The tool as tracked; load at start 3.21. It took 801 s, 515 of them on `FortressLibrary`, and printed `#total 626`.
4. Distance stage, cache off. A scratch copy of the tool whose only change is the timeout, 5,400 → 43,200 s; load at start 3.31, with 6.10 over five minutes. It took 4,718 s, 3,836 on `FortressLibrary`, and printed `#total 626`.
5. Count stage, cache off. A scratch copy whose only change is the timeout, 900 → 21,600 s; load at start 0.83. It took 1,149 s and printed `#total 75`.

Where I departed from the brief:
- **The two copies.** The tracked count tool cannot finish with the cache off, which is run 2. The skeptic's cache-off rate, 50 declarations in 30 minutes, put the distance tool's 5,400-second cap at risk. The two copies' diffs are in `runs.txt`. In the event, run 4 would have fitted under the tracked cap at this load.
- **Whole stages, not three declarations.** PLAN.md's line names "the declarations of row 488's three sites". I ran whole stages, as the brief asks. The variable under test is what the checker queried earlier, and a run restricted to three declarations would change that. The tools have no declaration filter either, and the per-declaration counts still give the three sites' declarations.
- **A sixth run, stopped.** I started the distance stage with the base's `TypeHierarchyChecker` and the cache off, the other half of the test. It would show whether the base's own list moves with the cache. I stopped it before its first component declaration: batch 6.5's `fd5cb4864` had rewritten `Library/FortressLibrary.fss` in this tree at 19:28 UTC, and the build was recompiled at 19:47 while the run went on. Neither change touched runs 1 to 5, and `runs.txt` gives the evidence.

## Site by site

The four sites that row 488 names (the three the review names, plus the `Comprehension` site the same edit moved). The lines are errors.py's, from each run's per-site list.
- **Without the queries.** This is the skeptic's broad form: the landed hierarchy verdicts without `everyKnownSubtypeListed`'s subtype queries. The base's list is this list plus the two H2 errors (`rung-comprises-checker/probes/skeptic/distance-attribution.txt`).
- **The other three columns** are the 7C gate and today's two runs.

| site | without the queries | 7C gate | today, cache on | today, cache off |
|---|---|---|---|---|
| `:1535`, unary `opr BIG SQCAP[\T\](g)` | no error | "Function body has type UniqueItem[\T\], but declared return type is BigReduction[\UniqueItem[\T\],UniqueItem[\T\]\]." | the same | the same |
| `:304`, `BIG \|\|` | second arm "[\T\]Generator[\T\]->String is not applicable to an argument of type Any." | second arm "[\T\]Generator[\T\]->Comprehension[\Any,String,String,String\] is not applicable to an argument of type Any." | the same | the same |
| `:314`, `BIG \|\|` | as `:304` | as `:304` | the same | the same |
| the `Comprehension` site | at `:3436`: "Function body has type String, but declared return type is Comprehension[\Any,String,String,AnyMaybe\]." | at `:3416`: "... Comprehension[\Any,String,String,String\]." | `:3416`, the same | `:3416`, the same |

**The whole distance lists** (`row-488-probe/sites.txt`):
- **The sorted per-site lists.** The gate's list, today's cache-on list and today's cache-off list all hash to `f9f0f402377252b3`: 626 errors plus the header line. That is also the hash of the rung's post-edit run and the skeptic's landed run. Diffing each of today's lists against the gate's, before the scratch was deleted, gave nothing.
- **The no-queries list.** The broad form's list is rebuilt from the gate's list and the skeptic's diff, and it hashes to `fcbfd744395f02e1`, the skeptic's own hash for it. So the list the cache would have produced if it were the cause was in hand, and the cache-off run did not produce it.
- **The tables.** Today's two tables are identical except for their `#seconds` and `#machine` rows (`distance-on.txt`, `distance-off.txt`). The same holds against the gate's `distance.txt`, and errors.py's tallies agree too.
- **Per declaration.** The error counts of all 647 declaration records (639 checked, 8 crashed), in the order checked, are identical with the cache on and off (`distance-decls.tsv`). Row 488's sites are `FortressLibrary`'s declarations 35, 38 and 89, and 290 and 294 for the `Comprehension` pair. With the cache off, declaration 89 (`:1534-1535`) had already counted its one error 24 minutes into the run.

**The count stage.**
- The two tables, `count-on.txt` and `count-off.txt`, are identical: `#total 75`, `FortressLibrary` 132, `RangeInternals` 18, no crash.
- errlist.py's two 75-line lists are identical, and each equals the rung's `probes/checker-count-postedit-errors.txt` line for line.
- None of the count stage's errors is at the three sites. All of them are api errors.

**What the cache costs.** With the cache off, `FortressLibrary` took 3,836 s against 515 s, and every target that took a second or more was slower (`runs.txt`). The count stage took 1,149 s against 112 s. The loads differed, so these are not a timing pair. Still, FACTS's 22.3-22.6 s against 9.5-12.4 s was measured on the tree of 2026-09-23. Today the count stage's `FortressLibrary` api reaches its overloading check, and the overloading memo is off. A stack sample of run 2 at about 600 s found it in that check (`count-off-gate-tool.txt`).

## What it means for batch N's rung I

- **Rung I may edit `TraitTable.scala`** for its coercion lookup without owing row 488 anything about the memo. The memo stays on. Switching it off is no control for anything: it changes no answer, and it makes the count stage outrun its own cap.
- **Row 488 stays open, with its mechanism unknown, and the effect is real.**
  - It is caused: the hierarchy pass's extra queries produce it (the skeptic's three builds).
  - It is deterministic: five runs of the landed build now agree site for site. They are the rung's post-edit run, the skeptic's landed run, the 7C gate, and today's two runs, one of them with the cache off.
  - Rung I's inference adds subtype queries of its own. So after rung I's edit, a move in the BR family or its neighbours is the edit's until shown otherwise.
  - `compare.sh:16-18` would read such a move as run-to-run variation of 2 to 4 errors. No such variation has appeared on this build.
  - The attribution control on file is the skeptic's: the stage on a build with the edit's queries removed and its verdicts kept (`distance-attribution.txt`, the broad form). A second run of the same build separates variation from cause.
- **Where the mechanism may be: leads, none measured here.**
  - The type analyzer's other memos, each with its own switch: subtype, excludes and five normalize memos (`fortress.analyzer.subtype.cache`, `.excludes.cache`, `.normalize.*.cache`; `TypeAnalyzer.scala:63-69`, the memos at `:97`, `:392`, `:517-521`).
  - The schema analyzer's memos (`fortress.schema.subtype.cache`, `TypeSchemaAnalyzer.scala:53`, `:90`, `:148`).
  - These memos belong to each analyzer instance, not to the trait table. The open question is whether the hierarchy pass queries the same instance that the body check later reads.
  - The technique used here tests each one: the whole distance stage once per switch turned off, with the lists compared. The stage takes about 13 minutes on an idle machine.
  - This belongs to row 488's repair on batch 8's line, unless the planner wants the mechanism before N.
- **The unrun half.** This probe shows that the cache does not produce the landed build's moves. It does not show that the base build's list is free of the cache.
  - By reading, it is, up to source positions.
    - `parents` and `excludesClause` read only the trait table and the key (`TypeAnalyzer.scala:721-723`, `:735-740`, `:760-775`).
    - The key's `equals` compares the name, the arguments and the static parameters (`ProjectFortress/src/com/sun/fortress/nodes/TraitType.java:74-95`). It leaves out only the source position (the span) and whether the type was written in parentheses, which `TypeInfo.equals` skips (`ProjectFortress/src/com/sun/fortress/nodes/TypeInfo.java:58-72`).
    - So a memo hit can hand back types that carry another occurrence's spans, but it cannot hand back a different type.
  - The measured check is the stopped sixth run, made in a worktree at `7a9d6fb73` with its own `ant compileAll`, because main's library has moved. It is one run, about 80 minutes at the loads above.

## For the record

This is for the coordinator; this probe edits neither file.
- **FACTS.md:70** (at 581356f32; :69 when the review cited it). The line's "no answer of the checker changed" now has a distance-stage measurement behind it: this probe, 626 errors site for site. Its timings describe the tree of 2026-09-23. On today's tree the count stage takes 112 s with the cache and 1,149 s without, and the distance stage's `FortressLibrary` takes 515 s with it and 3,836 s without, at the loads in `runs.txt`.
- **Row 488.** The candidate cause, the memos keyed by `TraitType`, is ruled out on the landed build. The sentence "A stage run with `-Dfortress.analyzer.clauses.cache=false` on both builds would settle it" is answered for the landed build, with the base build's half open as above.
