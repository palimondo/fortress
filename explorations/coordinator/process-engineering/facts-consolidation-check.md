<!-- The check of FACTS's consolidation, slices 2 to 7 and the file whole, written 2026-10-13 in the curator's stead: the verdict, the sizes, the fixes, the seven checks, the rulings on the six workers' points, the questions for the curator, the coordinator's follow-ups, and what the brief for POSITIONS should change. -->

# FACTS consolidated: the check of slices 2 to 7 and of the file whole

**Verdict: pass with the fixes listed.** In slices 2 to 7 nothing a decision rests on is lost; the lens is applied evenly, with the entries named below out of line; every citation of a changed title in a live file is updated, and what is left is in a history file, a batch record, a review, a report, `BOOT.md` or `.claude/skills/`; the sentences the workers added and the line references they corrected hold against the tree in a sample of about ninety; every test and every file a new entry names exists; no two entries contradict each other; FACTS's header comment and `README.md:68-73` state the same title rule; `check-verbatim.py` exited 0 before the fixes and exits 0 after them. The fixes are thirteen pointers in slice 1's entries to capture files and directories that `84aef6a4f` and `fc89ee7a5` removed, which the first slice's check let stand before the brief had its rule; slices 2 to 7 have none.

## The size

| | Bytes | Entries |
|---|---|---|
| Before the consolidation, at `49d78c8cd` | 302,622 | 209 |
| After slice 7, at `1558a22ed` | 258,669 | 195 |
| After this check's fixes | 257,770 | 195 |

## The fixes

Each in slice 1's section, "The checker and the one library"; each replaced text is verbatim in `FACTS-history.md` under "Rewritten 2026-10-13, the consolidation checked", after a comment line. Nothing else in the entries changed.

- Line 32, the natives: the per-binding list `count/classified.tsv` dropped; the note's section 2 kept.
- Line 36, `FnNameInfo.boundsFor`: the shadow patch and the captures under `java/` dropped.
- Line 38, the size-generic dispatch arm: the captures under `size-probes/` dropped.
- Line 40, what a size costs: the captures under `size-cost/` dropped; the `ldc 8` fact cited to `size-cost.md`, "The answers".
- Line 41, `DOT`'s shared size: the captures under `size-rung-probes/` dropped.
- Line 42, the early return: the captures under `zero/` dropped.
- Line 43, the overloading memo: the captures under `triage/` dropped.
- Line 46, Route C: the captures under `route-c/` dropped; the flat count cited to `route-c-experiment.md`.
- Line 47, the specification's refused examples: the captures under `spec-refused-examples/` dropped; `AltEmptyCoerce` cited to the note's "Idea 1".
- Line 49, walk's value form and function form: the captures under `fill-overloads-ways/` dropped.
- Line 50, overloads differing in static parameters: the captures under `overload-static-params-ways/` dropped.
- Line 52, the flattening's three questions: the captures under `flattening-questions-ways/` dropped.
- Line 53, the true distance: the captures under `switch-over-distance-flat/` dropped; the run-to-run variation cited to `compile-ladder/rung-exclusion-remainder/REPORT.md` section 9 and `compile-ladder/rung-tabulate/REPORT.md` section 5.

## The seven checks

1. **Nothing needed is lost.** Each slice was read as a per-entry word diff built from the report's old-to-new mapping (`git show <commit>^:FACTS.md` against `git show <commit>:FACTS.md`), so a merged or moved entry was compared with the entry that took its facts. Every cut sentence that a worker could act on is stated by the entry it moved to or by the note the entry cites: checked for the written bound `Object` (old 55 into new 70), the shim (old 62 into new 61), the permuted override (old 71 into new 75 and 174), the `NN64` printing (old 119 into new 118), the wrapping sites (old 127 into new 130), the overflow check (old 131 into new 130 and 132), the family's bound (old 156 into new 151), row 24 (old 159 into new 152), and the three interrupt entries (old 200 to 202 into new 200). Three cuts are borderline and left: old 112's 18 line-number citations in exploration programs outside the corpora (not gated; only the history holds them now), old 55's "the compiler library's ranges are `ZZ32` only" (the prelude goes at the switch-over), and old 93's list of what `|g|` and `cond` answer under walk (the rule in the title covers them; REPORT section 6 holds the list).
2. **The lens, applied evenly.** The claim of slices 3, 4 and 5 holds: their entries were written in batches 8 to 13b and state behaviour, tests and rows; their cuts (superseded "Left" lists, removed probes, the gate sentence, measurement narrative) were offset by rows named, tests sorted by kind and whole-declaration line ranges. Out of line with the rest, and left as they are: line 81's "23 declarations are retyped" and line 84's "25 one-off slips", measurement counts; line 12's list of the loop's four representational costs and line 101's three timings, which a performance decision may rest on; line 166, 4.1K characters of the POPL 2019 paper's rules; line 54's pointer into `FACTS-history.md` for the rung that cleared each class; line 121's pointer to a process report for the open `comprises` question; lines 203 and 204's pointers into `.claude/skills/fortress-repo/references/`. The last three are questions of form for the curator (below).
3. **Titles and citations.** 48 distinctive fragments of the changed titles were searched with `git grep -F` across `explorations/` and `.claude/`. Every hit in a live file is one the reports list: `.claude/skills/fortress-repo/references/sources.md:46`, `:70`, `:287`, `:311`, `:312` ("deletes a tracked file"), `:426` ("from the arguments alone"), `:101` and `:289`; `.claude/skills/coordinator/references/sources.md:36` and `:64`; `.claude/skills/cloud-container/references/sources.md:47` and `:55`; `BOOT.md:22`, which names the old title "deletes a tracked file" inside the coordinator's own note of slice 5's skill citations. Every other hit is a history file, a batch record or manifest, a review, a report (`fortress-changes-chronology.md`, `coordinator-shape.md`, `coordinator-rewrite-plan.md`), or data under `record-growth/` and `postmortem-2026-09-19/`. The two untitled entries that slice 2 gave bold titles were cited by no live file.
4. **What the workers added.** Sampled against the tree and holding: slice 2's `classify.py:17-21`, `TypeSchemaAnalyzer.scala:487-488`, `:141`, `:194`, `topIvars` at `STypesUtil.scala:2099-2103`, `Formula.scala:630`, `NatReflect.fsi:22-23`, `FortressBuiltin.fsi:178`, `MaxReduction` at `FortressLibrary.fss:3320-3327` with `:3126-3146` and `:3343-3355`, `InferCoercionShapes.fss:74-82`, the six `extends Any` lines of the api, rows 560 (fixed), 595 and 596; the `idK(3)` answer `3 : ZZ64` is row 510's and `tests/XXXInferExpectedTypeRungK.fss:20`'s. Slice 3's `Functionals.scala:712-728`, `:757-812`, `:702-709`, `OverloadingOracle.scala:83-152`, `:161-175`, `:177-239`, `OverloadingChecker.scala:631-654`, `FortressLibrary.fsi:2427-2428`, `.fss:4060-4065`, `:122-123`, `:2979`, `FlatString.fsi:20`, `BaseEnv.java:628-631`, `RangeInternals.fsi:265-281`, `Misc.scala:694-722`, `:733-739`, and `distance-sites.tsv`'s two `return-type` rows, both `distribute`, with no positional-rule row. Slice 4's `CodeGen.java:3889-3923`, `FIntLiteral.java:85-95`, `simpleIntLiteralArith.java:19-22`, `FortressLibrary.fss:380-381`, `:675`, `:752-753`, `:793-796`, `:1067-1068`, `.fsi:574-575`, `:675`, `KindEnv.scala:117-131`, `TypeAnalyzer.scala:781-797`, `TypeHierarchyChecker.scala:237-245`, `List.fsi:56`, `Random.fss:222`, `:252-253`, `OverloadedFunction.java:1477`, `conversions-coercions.tex:510-517`, `RTTI.java:20`, `RTTIsize.java:24-33`, row 326. Slice 5's `genericOverlapCovered` (`OverloadedFunction.java:773-815`, which reads a type that names no static parameter as itself, so new 27's wording is the code's), `:507-510`, `:730-759`, `:851-862`, `:880-940`, `:1570-1575`, `:1710-1717`, `FunctionClosure.java:191-196`, `InstantiatingClassloader.java:180`, `climb-batch-workflow.js:720-721`, `:885`, `:1304`, `BuildEnvironments.java:1153`, `Driver.java:227`, `:247-249`, `FileTests.java:155-163`, `:181-188`, `:482-515`, `:841-863`, `:870-879`, the root `build.xml:132`, `:357`, `:504`, `:956`, `:1167-1169`, `:1210`, `:1361`, `:1395-1438`, `RepoState.java:174`, `ProjectProperties.java:304-314`, `harness-one.sh:7-13`, `env.sh:1-21`, `Shell.java:453-458`, `SystemJUTest.java:42`, `SpecDataJUTest.java:29-38`, `trait-parameters.tex:97`, `convenience.tex:58-73`, batch 13b's `summary.txt:50` and `:62`, `climb-batch-workflow.md:216`, `FortressLibrary.fsi:1417`, `:1468`, `CompilerLibrary.fss:373-381`, row 17, and rung 0's 0.74 s against 13.06 s. Slice 6's `FortressLibrary.fss:2198`, `:2409-2410`, `:2461`, `:2838`, `:2626`, `:2790`, `:3013`, `:3230`, `.fsi:1612`, `:1730`, `changes.tex:443`, `:1077`, `:1120`, `:1297`, `:1456`, `:1663`, `numbers.tex:19-25`, `:75-79`, `numbers-advanced.tex:32-36`, `literals.tex:93-94`, `:149-165`, `inference.tex:263-283`, `:348-349`, `traits.tex:235-283`, batch 13b's `#seconds` row and `RECORD.md:52`, `run-c4/probes/vocabulary/REPORT.md`, row 64 (Fortify's typesetting, rightly dropped). Slice 7's `env.sh:9-21`, `RatsUtil.java:138-145`, `skill-writer.sh:29-40`, `protocol.md:32-36`, `session.md:34-36` (`wait_for`, at most 270 s). Every `XXX` test and every file under a tests directory that FACTS names exists (a scan of the whole file), and every file path FACTS cites resolves in the tree, the removed captures of slice 1 apart (fixed) and `Specification/library/apis/CompilerBuiltin.tex`, which line 112 names as a generated file not in the tree.
5. **The whole file.** No contradiction across slices on the facts that several entries state: the `comprises` spelling (lines 62, 121, 146, 171 all leave it open and give the checker's `where`-clause handling the same way); the last landed gate (85, count 1, V1 2, no class RG, at lines 53, 54, 61, 72, 94, 140, 151); the numeral (`object IntLiteral extends { Number }` at 57, 79, 119, 131; walk's an `Int` at 57, 74, 79); rows 351, 455, 541, 560, 642 given one status each; the two `XXXComprisesMeetUncovered` tests, walk's renamed with `Walk` at line 27 and the checker's at 76; `testSpecData` a gate step at 114 and 170; the coordinator's push after every commit at 194 and 211. No entry names an older gate as the last landed one. The dates left are the team's commit dates (line 52), the specification's (163 to 166) and path or section names. The header comment and `README.md:68-73` state the same rule for titles.
6. **The script.** `python3 explorations/coordinator/tools/check-verbatim.py 0de455f22 explorations/coordinator/FACTS.md explorations/coordinator/FACTS-history.md` exits 0 before the fixes (206 entries at the base; 41 verbatim in the file, 165 in the history, none in both, none in neither) and after them (30 in the file, 176 in the history, none in both, none in neither).
7. **The workers' points.** Ruled on below.

## The rulings on the workers' points

Slice 2:

1. Agreed; new 62, 121 and 171 state the revised text the same way and leave the question open; it is the curator's (below).
2. Agreed; each fact of old 55, 62 and 71 was found at the entry the comment names.
3. Agreed; no live file cited "Therefore" or "Rung L repaired".
4. Accepted; both titles hold as statements, and FACTS:52 cites old 60's.
5. Accepted; the claims stand as their notes and rows give them, and re-measuring is the coordinator's call.
6. Checked; the sampled sentences hold (check 4).
7. Accepted; the pointer names where the account lives, and the base text pointed there too.
8. Accepted; new 94 states the ground cache, and row 488's notes hold the leads.
9. Agreed; a row for the coordinator.

Slice 3:

1. Accepted; the counts at lines 81 and 84 are the one kind of thing the lens cuts, minor and left.
2. Agreed.
3. Accepted; the overloading kind's 0 at batch 13b's gate is the evidence that counts.
4. Verified against the per-site list.
5. Accepted; each holds as a statement; whether "no longer" wording needs the rule is the curator's (below).
6. Agreed.
7. Accepted.
8. Checked; the sampled sentences hold.
9. Agreed.

Slice 4:

1. Accepted; the three candidates for further cuts each state a path's behaviour.
2. Agreed.
3. Accepted; the pointer's form is the curator's question (below).
4. Accepted.
5. Agreed; the figures are stated by lines 53 and 66.
6. Agreed; a row for the coordinator.
7. Accepted.
8. Verified: batch 13b's table has no class RG and the per-site list has no `opr ::` site.
9. Accepted; POSITIONS cites both.

Slice 5:

1. Moot; `57cb374e6` made the script compare whole entries, and it exits 0 from `0de455f22`.
2. Accepted.
3. Accepted.
4. Accepted; line 22's "the repository's, not codegen's" is the report's finding, and row 320's class `implementation gap (codegen)` disagrees with it: the coordinator reconciles the row with the report.
5. Accepted.
6. Accepted.
7. Checked; the sampled sentences hold.
8. Accepted; the `git show` path is a pointer to the only copy, not provenance.
9. Gathered below.

Slice 6:

1. Accepted; line 166's sentences are each a rule a decision can rest on, and it is named above as out of line.
2. Agreed.
3. Accepted; `dot` reduces with `SUM[\T\]` at `.fss:2409-2410`; a test of an empty `RR64` `dot` is for the coordinator to add if wanted.
4. Accepted; the entry says so.
5. Agreed; row 64 is Fortify's typesetting.
6. Agreed.
7. Accepted.
8. Agreed.
9. Checked; the sampled sentences hold.
10. Agreed; a row for the coordinator.

Slice 7:

1. Agreed; new 200 holds each merged fact, the compaction's "agents keep writing" among them.
2. Accepted; the ratios are what a boot estimate uses.
3. Accepted; the sentence is conditional on both registrations, and whether both hold now is the coordinator's to read in `~/.claude/settings.json`.
4. Agreed.
5. Accepted; the curator's question (below).
6. Checked; `RatsUtil.java:138-145`, `env.sh:9-21`, `skill-writer.sh:29-40` and `protocol.md:32-36` hold.
7. Accepted.
8. Accepted; the entry gives the version the slip was measured on.
9. Accepted.
10. Accepted; a follow-up for the coordinator.

## For the curator

1. Since `7fd8fddc8` the specification lets a listed type in a `comprises` clause hold a `where`-clause variable of the trait's declaration (`traits.tex:238-246`), and the checker opens only `nat` and `int` ones (row 636). Is the team's `comprises Integral[\I\] where [\I\]` a valid clause now, and does `AnyIntegral`'s `NOT YET` comment stand?
2. Three entries now point from FACTS to a place outside the record: lines 203 and 204 into `.claude/skills/fortress-repo/references/` (where a worker's setup lines and `wait_for` are defined), and line 121 to `process-engineering/facts-slice-2.md` for the open question above. Under "one home per thing", may FACTS point into a skill or a process report, or should each fact be restated in the entry?
3. Titles that mark a change still stand under the rule: "no longer answers across contexts" (line 80), "unbounded again" (84), "no longer crashes it" (94), "now reads" (68), "no longer decides" (26), "no longer deletes" (101). Should the rule also retitle these to the present?
4. `map/README.md:17` cites `perf-probes/nat/java.md` section 3 for what a shadow is, which no FACTS entry states since old 36 was retitled. Is a sentence under The harness and the gate wanted?
5. The array family's bound `T extends { Number, MultiplicativeRing[\T\] }` stands at fork 2's default with your answer pending (line 151; PLAN item 52).

## For the coordinator

Ledger rows to open:

- the overloading check's run of over 15 minutes in the exclusion test of an intersection type (line 54; `distance-triage.md` section 3.4);
- the overloading checker's instantiation that does not avoid capture (line 43; slice 1's point 8);
- `LinearCongruential`'s wrong numbers for a modulus that is not a power of two (line 130; `reviews/wrap-dependent-code.md` section 11);
- codegen's refusal of a declaration with a where clause or a contract (line 181);
- the parser-generation temp directories never deleted (line 192; `RatsUtil.getTempDir`).

Ledger rows to close or correct:

- row 642, `CONTESTED`, is fixed by `054c4bcfd` and its reproducer `XXXInferResultOnlyLabelBody.test` is now `InferResultOnlyLabelBody.test`: `ledger.py close 642 --commit 054c4bcfd --test InferResultOnlyLabelBody`;
- row 455's claim still names the loose juxtaposition, which the checker now reaches; its open half is an argument of another call (lines 56, 73, 78, 87);
- drifted lines in the notes of row 455 (`Operators.scala:203`, `:351`), row 487 (`TypeHierarchyChecker.scala`, `TraitTable.scala:119-130`) and row 490 (`:321`);
- row 320's class, `implementation gap (codegen)`, against line 22's "the repository's, not codegen's" and `rung-export-var/REPORT.md`;
- row 577 is open while `classify.py` finds its places by declaration (`classify.py:17-21`; `reviews/batch-12-review.md` section 1): review whether it is fixed.

PLAN lines:

- `PLAN.md:422` says the clause-binding form "is not read compiled"; row 351 is fixed and the compiled run reads it;
- `PLAN.md:385` names `FACTS.md:66` and `:78` as the neighbours that repeat the gate's figures; they are lines 54, 61 and 72 now;
- "PLAN item 25" (line 140) is named in PLAN only in passing (`PLAN.md:71`, `:511`); POSITIONS-history holds its definition.

`BOOT.md`:

- `:22` says the record's claim that the team's spelling "is no valid clause may no longer hold"; line 121 no longer makes that claim, and the same line names "deletes a tracked file" as a skill citation to fix.

`.claude/skills/`, for the skill writer:

- `fortress-repo/references/sources.md:46`, `:70`, `:287`, `:311`, `:312` cite "`ant compileAll` deletes a tracked file", now "`ant compileAll` deletes the caches folder, the linker's untracked `global.map` with it, when the implementation changed, and keeps it otherwise"; `:426` cites "Static arguments are inferred from the arguments alone ...", now "Static arguments are inferred with coercion on both paths ..."; `:101` cites old 200 and 201, merged into "Stopping a turn kills every background agent alive at that moment ..."; `:289` cites "The push loop pushes `main` every 4 minutes ...", now "No push loop runs ..."; `:122` says "Outside the gate" of `testSpecData`, a gate step; `:393` names the removed scripts' old paths (now `git show ab067d9b6^:...`); `:155` cites `FileTests.java:455-480`, `:836-860`, now `:460-515`, `:841-863`; `:389` cites `FortressLibrary.fsi:1431-1432`, `:1567-1568`, `.fss:2183-2190`, now `.fsi:1439-1440`, `:1575-1576`, `.fss:2190-2197`;
- `coordinator/references/sources.md:36` cites "A boot after a compaction costs about 285K tokens ...", now "... about 74K tokens of context before it reads the record ..."; `:64` cites old 200, 201 and 202, merged; `coordinator/references/roles-and-records.md:34` states the old title rule ("the entry says so and states the present");
- `cloud-container/references/sources.md:47` cites "registered twice in a container set up by `setup.sh`", now "... registered in the tracked `.claude/settings.json`, and `setup.sh` adds it to `~/.claude/settings.json` only when ..."; `:55` cites the push loop's title.

Other:

- `process-engineering/coordinator-rewrite-plan.md:128`, a plan still to run, quotes "costs about 285K tokens";
- whether `~/.claude/settings.json` still registers the backup hook beside the tracked file (line 199's two passes);
- not run and worth one run each: `WayASpec`'s pair under walk's load check (line 159), an empty `RR64` `dot` (line 151), and `comprises Integral[\I\] where [\I\]` through the checker (question 1).

## For the next consolidation, of POSITIONS

The five sentences the first slice's check added to the brief did their work: no entry of slices 2 to 7 cites a removed capture, every `XXX` test is sorted by its `.test` file, and the rows the old texts described without a number are named. Keep them. Add these:

- "POSITIONS holds the curator's decisions in his words, written once. Do not reword a decision. Cut only the provenance around it: a date, a rung's or batch's name, an account of what it replaced or who relayed it. Keep every quoted sentence of his verbatim, and keep the item numbers (item 15, answer 7, Q49) that FACTS and PLAN cite."
- "Where a decision names a FACTS entry by a title that the FACTS consolidation changed, cite the new title. The titles changed are in the tables of `process-engineering/facts-slice-1.md` to `-7.md`. `POSITIONS.md:44`, `:45`, `:57`, `:73` and `:124` cite FACTS titles."
- "Where a decision is marked decided and not built, read the tree before you leave it so: name the test that gates it if it is built, or say it is not built and which PLAN item builds it."
- "Do not add a pointer from the record into a skill file or a process report unless the curator has answered question 2 of `process-engineering/facts-consolidation-check.md`."
- "Report every entry over 3,000 characters after the rewrite, with what in it a decision rests on."
