# Rung F (`rung-flat-tower`): the judge's ruling on the skeptic's refusal

**Decision: repair.** The skeptic is right on its refusal ground: row 424's defect, which this
rung makes live on the one library, has no gated home, and the specification settles its answer,
so it is owed an `XXX` expected-failure walk test (home 2). The skeptic is also right on each of
its four further corrections. The approach of the rung is right and is not reopened: the tower,
the coercion table, the reductions, the drop and the respelled lines all stand as landed. The
repair round adds the owed homes, corrects the record and the report, and completes two
measurements the rung owed and did not make (rule 2's count, and the demos count that answer 7's
judgement asked of this rung). It is a small round: three new test files, one approved line
respelled, one doc comment rewritten, text and captures. The numbered instructions are in
section 6.

The judge read: the branch from `e5414f5bf` to `5c6c49fba` (eleven milestones), `record.md`,
`SKEPTIC.md`, the worker's structured result (its `reportText`; `REPORT.md` is not on the branch,
because the harness refused the worker's write), the skeptic's captures under `probes/skeptic/`,
the batch record's section 3 F (`explorations/coordinator/CLIMB-BATCH-6.md:60-117`), POSITIONS
answers 7 and 8 (`explorations/coordinator/POSITIONS.md:165`, `:159`), ledger rows 387, 423,
424, 426 and 430, and every specification passage cited below, ten lines either side. Nothing was
built or run for this ruling.

## 1. The refusal ground: row 424 has no home

**The skeptic is right.**

- **The defect is measured in this rung, and the rung makes it live.** Row 424
  (`explorations/fortress-gap-ledger.md` row 424) was measured on a private library copy and says
  "today's `SUM` escapes only because its reduction is typed `Number`". This rung lands that
  reduction in the one library, so an unwritten clause-form sum now fails under `walk` where the
  base computed it: the worker's own capture (`probes/unwritten-sum-flat.txt`: `SUM[j <- 0#0] j`
  is `CastError`, `SUM[j <- 0#3] j` a join unification error with `a:BOTTOM`) and the skeptic's
  two-path program (`probes/skeptic/two-path-mix-sums.txt:67-130`, `probes/skeptic/SkSumC.fss`:
  `CastError` on the flat library at 1 and 4 threads, `0`, `45`, `49995000` on the base under
  `walk` and on the compiled path).
- **The specification settles the answer.** A reduction expression "corresponds to a call to the
  BIG Op operator", its static arguments optional (`Specification/basic/expressions/reductions.tex:22-30`);
  its values are combined "as with reduction variables" and "the value of a reduction expression
  is this combined value" (`:49-52`); a sum with a generator list "is equivalent to" a loop
  accumulating into `result` from `0` (`:58-80`); and the advanced chapter's desugaring of
  `SUM[gs] e` is `SUM[\N\]` over `SumReduction[\N\]` with `N` the type of the body
  (`Specification/advanced/parallelism-locality/defining-generators.tex:147-157`, the figure at `:141-170`). So
  `SUM[j <- 0#4] j` is `6`, and the empty one in a function declared `ZZ32` is `0`. What the
  specification leaves open is how an implementation infers `N` (the inference chapter is a stub,
  row 21), not what the value is. Row 424's own specification column already says so.
- **Answer 7 defers the repair, not the home.** Pavol's answer 7 has a clause form whose element
  type nothing fixes write its static argument, and calls teaching `walk` the unwritten form
  "later work, not a condition of the rung" (`POSITIONS.md:165`). A home-2 test repairs nothing;
  it is the gated record of a deferred defect whose answer is known, which is exactly what the
  shared prefix's home 2 is (`explorations/coordinator/climb-batch-workflow.js:540`). The batch
  record's "Notes appended: rows 135 and 424" (`CLIMB-BATCH-6.md:116`) asks for a note; it does
  not waive the prefix's rule that every defect measured in the rung has exactly one of three
  homes (`climb-batch-workflow.js:536`). Rung T's S1 note at `reductions.tex:23-25` marks the
  unwritten form as unimplemented design with this row; the `XXX` file is its gated twin.
- **The worker's omission is plain in its own text.** REPORT.md section 17 lists every defect
  measured and does not list row 424; `record.md:25` gives it a note only.

The owed test is instruction 1. It is the first `XXX` file this rung adds, so it is shown red on
a deliberate local fix. The fix used is the base library (the 15 library files at `e5414f5bf`,
checked out and restored), under which the unwritten forms compute; that is the one fix available
without Java, since the defect is in `walk`'s erasure (`EvaluatorBase.java:224-226`, `:245`, the
row's notes), and a precedent overlay of that kind changed nothing for this bound (the row's
`walk-shadow.sh` note).

## 2. The skeptic's four further corrections

Each was checked against the file it cites. All four stand.

- **Correction 2, two provenance citations.** `probes/checker-count/table-before.txt:4-5`, `:14`
  are the per-api counts (`FortressBuiltin 18`, `FortressLibrary 110`) and `#total 125`; no
  hierarchy error is named there. The hierarchy errors are `probes/checker-count/diff-before-after.txt:3-8`.
  And `Library/FortressLibrary.fss:628-629` are `Ratio`'s header and its `asString` (the printing
  without `/1`); the division that always answers a `Ratio` is `ZZ`'s `/` at `:958`, which `ZZ32`
  and `ZZ64` reach through `:757` and `:841`. The second citation recurs in D3 (section 6) and
  must be corrected there too.
- **Correction 3, `explorations/apl/mg/diag_fwd.fss:50`.** `dz`'s parameters are
  `Array[\ZZ32,ZZ32\]` (`diag_fwd.fss:49`), so the maximum is over `ZZ32` values and answer 7's
  rule writes `ZZ32`. The worker wrote `BIG MAX[\RR64\]`. Every other changed line of C4 and the
  APL program writes its element type (read in the full diff). This is not a stop: the line is on
  the approved list (`explorations/reviews/sum-replacement-judgement.md:210-212` names
  `diag_fwd.fss:50`), and the approval prescribes a static argument, not `RR64` for this line (the
  explicit `RR64` spellings it gives are the check program's, `:210`). The skeptic ran the
  corrected line and it prints the golden (`probes/skeptic/diag-fwd-line50-zz32.txt`); the repair
  round lands it and captures its own run.
- **Correction 4, `Number`'s `=`.** The doc comment (`Library/FortressLibrary.fsi:280-282`,
  `Library/FortressLibrary.fss:355-357`) opens "Two numbers of different types are equal when their
  values are", but the float half compares after `asFloat` (`.fss:360`, `:362`), so `1/3 =
  asFloat(1/3)` is `true` (`probes/skeptic/sk-exprs-equality.txt:19-26`). `numbers.tex:371-372`
  ("allow any rational value to be compared numerically to any other rational value", read
  `:355-395`) covers the exact half only, and `record.md:9` cites it for both. The api comment is
  rendered into Part Library when the gather rebuilds the specification, so it must say what the
  code does. And `record.md:11` lists the 18 remaining hierarchy errors at `TotalComparison`,
  `AnyMaybe`, `Maybe`, `Just` and `Nothing`; the eighteenth is
  `RelationalPredicateCondition[\E\] excludes FortressLibrary.Condition`
  (`probes/skeptic/checker-count-rerun.txt:42`).
- **Correction 5, row 146's note and rule 2's count.** Row 146 is closed at a typed binding, a
  parameter, a tuple binding, an array element and an assignment, and open at a declared return:
  `ret(): ZZ64 = 2147483647; ret() + 1` is `-2147483648` under `walk` on both libraries and
  `2147483648` compiled (`probes/skeptic/two-path-row146.txt:8-10`, `:13-15`, `:31-33`). That
  position is row 387's (`conversions-coercions.tex:104-105`, read `:68-110`), whose home 2 is
  `ProjectFortress/tests/XXXCoercionReturnRungC.fss`; the same repair at the return check
  (`Simple_fcn.java:42-54`) closes both. The note must say so. And the report's section 2 says "I
  did not count the library's other sites of the shape by reading", which is rule 2 left undone.
  The skeptic's "no library site of that form below 2^31" is a finding without a method on file,
  and it covers `ZZ64` returns only; on the flat tower the shape that matters more is a narrower
  leaf returned where `RR64`, `QQ` or `ZZ` is declared, since that value is no longer a subtype of
  the declared type (the tests' own case is `simpleBig`'s `body(x:ZZ32): RR64`, REPORT.md section
  9). The count is instruction 6.

## 3. The skeptic's recommended rows: one home each

The shared prefix gives every defect anyone in the rung measures exactly one home, and the record
says which (`climb-batch-workflow.js:536`). The skeptic measured four things beside the refusal
and left their homes to the gather. The judge assigns them here, so that the second skeptic sees
them done.

- **Row 424's reach into the demos.** Not a defect of its own: a measurement the approved
  judgement asked of this rung ("the 137 lines in 24 demos are not gated, and the rung counts which
  of them run today", `sum-replacement-judgement.md:169-172`; again at `:405-406`), which the
  report does not make. It tells Pavol what the rung costs outside the gate. Instruction 7; no
  demo is edited, since the demos are not this rung's files (`CLIMB-BATCH-6.md:96`).
- **`Number`'s `=` between a float and an exact number is not transitive.** Home 3. The
  specification is silent on comparing a float with an exact number: `numbers.tex:371-372` speaks
  of rational values, and `grep -n -i numerically Specification/basic-lib/*.tex` finds only
  `numbers.tex:372` and `basic-integers.tex:591`. The behaviour is the base's comparison kept
  (`git show e5414f5bf:Library/FortressLibrary.fss:360`, `asFloat(self) = asFloat(b)`), so the
  rung did not introduce it. Probe: `probes/skeptic/sk-exprs-equality.txt:19-26`. It is D1's
  float half and goes to Pavol with D1 (section 7).
- **An empty `SUM` over a non-number additive group dies.** Home 2. `SUM[\M7\][i <- 0#0] M7(i)`,
  with `M7` a user `AdditiveGroup`, and the same over `Vector[\RR64,3\]`, end in "Unification
  error ... unlift param 1 (r:M7) got arg 0: ZZ32 of type Int" on the flat library, because the
  witness's `else => 0` (D8, `Library/FortressLibrary.fss:3117`) supplies an `Int`
  (`probes/skeptic/sk-exprs-reductions.txt:67-78`); the base answered `0 : Int`, quietly wrong.
  The specification settles the value: a reduction combines "as with reduction variables"
  (`reductions.tex:49-52`), and a reduction variable starts from `Identity[\⊕\]`
  (`Specification/basic/evaluation/reduction.tex:66-74`), the unique identity of the operator on
  `T` (`Specification/advanced-lib/algebraic-constraints.tex:794-797`); for `M7` that is its
  `zero`. The repair needs that identity device, which needs `where` clauses
  (`Specification/basic/functions.tex:15-19`), so it is deferred. Instruction 3.
- **`RR32`'s binary natives die on a float argument.** Home 2. `narrow(1.5) + 2.5` and
  `narrow(1.5) + 2` end in `InterpreterBug: getRR32 not implemented for FFloatLiteral` (or
  `FFloat`) on both libraries (`probes/skeptic/sk-exprs-rationals.txt:47-50`, `probes/skeptic/sk-exprs-equality.txt:59-62`), because the glue
  reads its argument with `getRR32()` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:90-98`)
  while D7 declares it `RR64`. The specification settles the value: its own worked example
  computes an `RR32` with an `RR64` by `RR64`'s declaration
  (`Specification/basic/conversions-coercions.tex:844-881`), so the sum is `4.0` (and `3.5`),
  exact in either precision. Decision, the judge's: home 2 now, not a home-1 repair in this round.
  The alternative is a library-only repair in this rung's own files, retyping `RR32`'s 32 binary
  natives to take `b: RR32`, their actual contract, which would pass `walk`'s overload rule
  (`RR32` is below `RR64` and so is its result) and route mixed arithmetic to `RR64`'s operators
  as the specification's example does. It is not taken here because it changes 32 declarations
  after the three-pass comparison and would reopen that comparison, the four-thread differential
  and the microGPT checks, for a defect the base already had; the ledger row names both fixes.
  Instruction 2.
- **`matrix(v)` for `NN32` and `NN64` is refused on both libraries** (the worker's capability
  probe, `probes/capability-base.txt`, `probes/capability-flat.txt`; REPORT.md section 12). No
  home is recorded for it. Home 3: its numeral `0` reaches `T` only by a coercion from `ZZ32`,
  which `NN32` and `NN64` do not declare, and the specification leaves a numeral's relation to the
  integer types open (`Specification/basic/expressions/literals.tex:83-95`, the note "We need to
  describe the Numeral type hierarchy"). Instruction 8 records it.

## 4. What else the two got right and wrong

**The worker was right** on the substance, and the skeptic confirmed each point by its own
reading and runs: the tower is flat with exactly the record's coercions (`FortressLibrary.fss:383`,
`:548-552`, `:763-764`, `:847`, `:911-917` and their api twins; no other `coerce` in `Library/`
or `FortressBuiltin`); `Vector` and `Matrix` keep `T extends Number` (`:2292`, `:2600`); the drop
is complete; only approved lines of C4 and the APL program change; the recorded failure precedes
the edit (`252639598` before `f1fe07dc9`); the new test passes at 1 and 4 threads; the checker
count is 62, a declared total, not a stop (the 44 is a prediction, `CLIMB-BATCH-6.md:100`). D1,
keeping one numeric `=` on `Number`, is a flagged decision and not a reserved stop: the stops the
intro reserves for F are the Q1 (b) lines, lines of C4 or the APL program beyond the approved
ones, a coercion beyond the table and an integer-excluding bound on `Vector` or `Matrix`
(`CLIMB-BATCH-6.md:104-110`), and `=` answers a `Boolean`, not a float, so it is not what route A
removes ("take any number and answer in floating point", `CLIMB-BATCH-6.md:64`). The row 433 route
is the prefix's legitimate fourth case: the specification settles it, the repair (method `where`
clauses) is out of scope, and no `walk` test can express a checker refusal of the one library
before the switch-over. The citation `conversions-coercions.tex:78-83` for longPrim's respelling
holds (read `:68-110`).

**The worker was wrong** on four things: row 424's home (section 1); rule 2's count, not made;
the demos count owed by the approved judgement, not made; and three text slips (the two
provenance citations and the float half of `=`). And the report's section 10 claims the approved
APL lines are exercised by the check programs, while six of them are in `diag_fwd.fss`, which no
check program runs; the skeptic's `diag_fwd` run is the first on file.

**The skeptic was right** on all five corrections. Two details of its text are loose and change
nothing: its section 9 writes "`widen(3) =/= big(3)` ... answer as on the base" where its capture
has `widen(3) = big(3)` true on both (`sk-exprs-equality.txt:7-10`); and it calls row 424's home
"the refusal's one thing" while its own list of recommended rows holds three more defects without
a home, which section 3 above gives them.

## 5. What the gather must know

F now adds four files to `ProjectFortress/tests/` (`FlatTowerRungF.fss` and the three `XXX`
files of instructions 1 to 3), where the batch record counted one for F and three for the batch
(`CLIMB-BATCH-6.md:37`, "the interpreter test count to rise by three"). With R's two, the
`testSystem` sum rises by six. The gate compares the shards by their sum (`POSITIONS.md:103`).

## 6. The repair round's instructions

Numbered for the repair worker. Work only in `/home/user/fortress-flat` on
`wip/rung-flat-tower`; set up the shell as the shared prefix says; do not run `ant testFast`
or `ant testSystem`. Every capture is a `.txt` under `explorations/compile-ladder/rung-flat-tower/probes/`,
headed by `explorations/compile-ladder/rung-flat-tower/machine.sh <label>`. Private caches for
every run; wipe them before any run that reads an edited library file. Each new test file carries
exactly one comment line, `(*) explorations/compile-ladder/rung-flat-tower/REPORT.md`, in the
form of `ProjectFortress/tests/XXXCoercionReturnRungC.fss:1-27` (component, `export Executable`,
`println("REACHED")`, asserts, `println("PASS")`), and each assert message carries a
specification line, or row 424 for the existing row, and nothing else (new rows are numbered at
the gather, so their numbers stay out of the tests).

1. **Row 424, home 2.** Add `ProjectFortress/tests/XXXUnwrittenSumRungF.fss`: a top-level
   `emptySum(n: ZZ32): ZZ32 = SUM[j <- 0#n] j`; in `run()`, bind and assert
   `emptySum(0)` is `0`, `SUM[j <- 0#4] j` is `6` and `PROD[j <- 1#3] j` is `6`, none with a
   static argument, each message "row 424; reductions.tex:49-52, :58-80;
   defining-generators.tex:147-157". Run it under `walk` on the flat library at
   `FORTRESS_THREADS=1` and `=4` and capture the failure (`probes/xxx-unwritten-sum-flat.txt`).
   Then show it red on the deliberate local fix: check out the base library
   (`git checkout e5414f5bf -- $(git diff --name-only e5414f5bf HEAD -- Library ProjectFortress/LibraryBuiltin)`),
   run it under `walk` (it must print `PASS`), then through the harness with
   `explorations/compile-ladder/rung-interp-coercion/harness-one.sh tmp/h-424 ProjectFortress/tests/XXXUnwrittenSumRungF.fss`
   (it must print "Missing expected failure" and a failure count of 1); restore with
   `git checkout HEAD -- Library ProjectFortress/LibraryBuiltin`, confirm
   `git status --short Library ProjectFortress/LibraryBuiltin` prints nothing, and run the
   harness again (it must report the expected failure and no failure count). All three steps go
   into `probes/xxx-unwritten-sum-goes-red.txt`, in order, with the commands.

2. **`RR32`'s natives, home 2.** Add `ProjectFortress/tests/XXXRR32MixedRungF.fss` asserting
   `asFloat(narrow(1.5) + 2.5)` is `4.0` and `asFloat(narrow(1.5) + 2)` is `3.5`, message
   "conversions-coercions.tex:844-881". First run a scratch control (not committed as a test,
   captured) showing `asFloat(narrow(1.5) + narrow(2.5))` is `4.0` on the flat library, so that
   the file fails for the native alone. Capture the `XXX` file failing under `walk` at 1 thread
   and through `harness-one.sh` as an expected failure (`probes/xxx-rr32-mixed.txt`). No library
   or Java edit.

3. **The empty sum over a non-number group, home 2.** Add
   `ProjectFortress/tests/XXXEmptyGroupSumRungF.fss` declaring
   `object M7(v: ZZ32) extends AdditiveGroup[\M7\]` with `getter zero(): M7 = M7(0)`,
   `opr +(self, o: M7): M7 = M7((v + o.v) MOD 7)` and `opr -(self): M7 = M7((7 - v) MOD 7)`
   (the skeptic's `M7`, `probes/skeptic/sk-exprs.sh:25-28`, with its `zero` written), and assert
   `(SUM[\M7\][i <- 0#0] M7(i)).v` is `0`, message "reductions.tex:49-52;
   evaluation/reduction.tex:66-74; algebraic-constraints.tex:794-797". In a scratch control,
   captured, show `SUM[\M7\][i <- 0#10] M7(i)` is `M7(3)` on the flat library. Capture the `XXX`
   file failing under `walk` at 1 and 4 threads and through `harness-one.sh` as an expected
   failure (`probes/xxx-empty-group-sum.txt`). D8's `else => 0` stays.

4. **`explorations/apl/mg/diag_fwd.fss:50`**: change `BIG MAX[\RR64\]` to `BIG MAX[\ZZ32\]` and
   nothing else in the file. Run it with
   `explorations/compile-ladder/rung-flat-tower/probes/skeptic/diag.sh explorations/apl/mg <private cache> 1`,
   capture it (`probes/diag-fwd-line50.txt`), and show with `diff` against
   `explorations/apl/mg/checks/diag_fwd_flatarrays2.out` that the printed lines are the golden's,
   masking only what the skeptic's capture masked (timings and the Rats! temp path). Put the
   one-line before and after in REPORT.md section 10, for Pavol's eye.

5. **`Number`'s doc comment** at `Library/FortressLibrary.fsi:280-282` and
   `Library/FortressLibrary.fss:355-357`: replace it, in exactly three lines in each file so that
   no library line moves (the comparison normalised library positions by the edit's line map), by
   `(** Two exact numbers of different types compare as rationals; a float` /
   `compares with any number after %asFloat%, so an exact value equals` /
   `its nearest float. **)`, indented as now. `git diff -U0` of the two files must show only
   those lines. Wipe the caches and re-run `ProjectFortress/tests/FlatTowerRungF.fss` under
   `walk` at 1 and 4 threads (`probes/pass-repair-threads1.txt`, `probes/pass-repair-threads4.txt`).

6. **Rule 2's count, the declared-return sites.** Over `Library/*.fss` except
   `CompilerLibrary.fss`, `CompilerAlgebra.fss` and `CompilerSystem.fss`, list every declaration
   whose declared return type is `ZZ64`, `ZZ`, `NN64`, `NN32`, `QQ` or `RR64`
   (`grep -nE '\)\s*:\s*(ZZ64|ZZ|NN64|NN32|QQ|RR64)\s*='`: 189 header lines at `5c6c49fba`, 171
   of them in `FortressLibrary.fss`). Read each body and classify it: N, a native
   (`builtinPrimitive`); T, a body whose value is of the declared type by construction (a
   conversion such as `widen`, `big`, `asFloat`, `unsigned` or `Ratio`, a float literal for
   `RR64`, `self` or an operator of the declared type); S, a body that can yield a value of
   another number leaf with no conversion (a bare numeral where the type is not `ZZ32`, a
   `ZZ32` expression, a native answering `Int`). Commit the table, one line per site with its
   class, and the counts (`probes/rule2-return-sites.txt`). For the S sites, write one probe
   program per library that calls each in its own `try`/`catch` and uses the result as its
   declared type (an operation only that type has, or `+` with a value of that type), run it
   under `walk` at 1 thread on the flat library and on the base (git-show copies of the 15 base
   library files beside the probe, the worker's shadowing technique), and capture both
   (`probes/rule2-return-probe-flat.txt`, `probes/rule2-return-probe-base.txt`). A site that
   answers the same on both is row 387's shape and gets no edit. A site that ran on the base and
   fails or answers differently on the flat library is a regression of this rung: add an
   assertion for it to `FlatTowerRungF.fss` in a new sixth group run through `group()`, capture
   it failing (`probes/failure-rule2.txt`), then convert in the body (`widen`, `big`, `asFloat`
   or a typed binding) and re-run the test at 1 and 4 threads. If any library body changes in
   this step, then also re-run the comparison's edit pass on the landed library
   (`count-run.sh` over `count-list.txt`, `FORTRESS_THREADS=1`) and `compare-normalised.py`
   against base A and base B, and both microGPT checks with `mg-run.sh`, and report the result
   beside the earlier pass. Give the counts in REPORT.md section 2 in place of "I did not count".

7. **The demos count** (row 424's reach; `sum-replacement-judgement.md:169-172`). For the 24
   files that `grep -rlE '(SUM|PROD|∑|∏)\s*\[[^\\]' ProjectFortress/demos --include='*.fss'`
   lists (137 lines; 17 `BirdCount*`, `BiCGSTAB`, `aStar`, `mg`, `npbft`, `posFeedback`,
   `wordcount`, `wordcount2`), run each under `walk` at `FORTRESS_THREADS=1` with a 180-second
   timeout and a private cache, from a scratch copy of `ProjectFortress/demos` (so relative input
   paths hold), once on the flat library and once on the base (the 15 base library files as
   git-show copies in the base scratch copy), four JVMs at a time. Record per demo: base exit
   code and first error line or `timeout`; flat exit code and first error line or `timeout`;
   and whether the flat failure is row 424's (a join or unlift unification error naming `BOTTOM`,
   or `CastError` from the identity functions at `FortressLibrary.fss:3107-3131`). Commit it as
   `probes/demos-count.txt` with a summary line: how many ran on the base, how many of those fail
   on the flat library, and how many of those at row 424. Edit no demo.

8. **`record.md`**:
   - The FACTS entry "The one library's number tower is flat" (`record.md:9`): cite
     `numbers.tex:371-372` for the exact half only; name the float half as the base's `asFloat`
     comparison kept, not transitive, citing `probes/skeptic/sk-exprs-equality.txt:19-26`; add
     the three `XXX` files as the gated expected failures of row 424, of the `RR32` natives and of
     the empty non-number sum.
   - The appendix to "The true distance to the switch-over" (`record.md:11`): the 18 hierarchy
     errors are at `TotalComparison` and its three objects, at `AnyMaybe`, `Maybe`, `Just` and
     `Nothing`, and at `RelationalPredicateCondition` (`probes/skeptic/checker-count-rerun.txt:25-42`).
   - Row 146's note (`record.md:23`): append that the declared-return position stays open under
     row 387, `ret(): ZZ64 = 2147483647; ret() + 1` being `-2147483648` under `walk` and
     `2147483648` compiled (`probes/skeptic/two-path-row146.txt`), gated by row 387's
     `XXXCoercionReturnRungC.fss`.
   - Row 424's note (`record.md:25`): add its home 2, `ProjectFortress/tests/XXXUnwrittenSumRungF.fss`,
     shown red on the base library (`probes/xxx-unwritten-sum-goes-red.txt`), and the demos count
     of instruction 7 with its summary line.
   - New provisional rows, after 433, each in the ledger's column form with its home: 434, the
     float half of `Number`'s `=` (home 3, specification silent as section 3 says, probe the
     skeptic's); 435, `RR32`'s binary natives (home 2, `XXXRR32MixedRungF.fss`; fix either in
     `RR32.java:90-98`, converting a non-`RR32` argument, or by retyping the 32 natives to
     `b: RR32` in `FortressBuiltin.fsi`/`.fss`, which routes mixed arithmetic to `RR64`'s
     operators as `conversions-coercions.tex:844-881` does; pre-existing on the base with
     `b: Number`); 436, the empty `SUM` over a non-number additive group (home 2,
     `XXXEmptyGroupSumRungF.fss`; fix: the identity device of `algebraic-constraints.tex:772-797`
     once `where` clauses work, or a library identity that asks the element type for its `zero`);
     437, `matrix(v)` for `NN32` and `NN64` (home 3, `literals.tex:83-95`, probes the capability
     captures; goes to phase 3 with `tabulate`). A row for any rule-2 site of instruction 6 that
     fails on both libraries and is not row 387's.
   - A line for the gather: F adds four files to `ProjectFortress/tests/`, and with R's two the
     `testSystem` sum rises by six, not three.
   - The handover line: the three `XXX` files, rows 431-437, the demos count.

9. **REPORT.md.** If `REPORT.md` is still absent, write it from the first worker's `reportText`
   with the amendments below; if the harness refuses the write, say so and carry the amended
   sections in the structured result, each keyed to the section it replaces, for the gather.
   - The provenance block: `problem` cites `probes/checker-count/diff-before-after.txt:3-8` beside
     `probes/checker-count/table-before.txt:14`; `deviation` cites `Library/FortressLibrary.fss:958`
     (reached through `:757` and `:841`) for integer `/` answering a `Ratio`, and `:629` for its
     printing. The same fix in section 6, D3.
   - Section 2: instruction 6's counts, by class, and each S site's result, in place of "I did
     not count".
   - Section 6, D1: the float half named as the base's comparison kept, with its non-transitive
     cases and row 434; `numbers.tex:371-372` for the exact half only; the alternative not taken,
     comparing a float by its exact rational value (transitive, and needing a float-to-rational
     conversion the library lacks), stated as a decision for Pavol.
   - Section 10: that six approved lines are in `diag_fwd.fss`, which no check program runs; the
     corrected line 50 and its run (instruction 4).
   - Section 17 and the structured result's `defectHomes`: add row 424 (home 2), the `RR32`
     natives (home 2), the empty non-number sum (home 2), the float half of `=` (home 3),
     `matrix(v)` for `NN32`/`NN64` (home 3), and any rule-2 site, each with its test or probe.
   - A new section 20, "The repair round": what the judge ruled (this file), what changed, the
     red demonstration, every capture of instructions 1 to 7, the machine lines, and that no
     library body changed or, if instruction 6 changed one, the re-runs it caused.

10. **Check and commit.** Run the shared prefix's tracked-paths loop over `REPORT.md` (or its
    carried text) and `record.md`, and fix or explain every line it prints. Commit after
    instructions 1 to 3 (the tests and their captures), after 4 to 7 (the edits and the
    measurements), and after 8 and 9, each with the protocol's footer, and push each commit to
    `wip/rung-flat-tower`.

## 7. For Pavol, out of the loop

- **D1, `Number`'s `=`.** The rung keeps one numeric `=` on `Number`, one declaration beyond
  route A's "`Number` without its catch-all operators" (`POSITIONS.md:92`), because without it
  the library's `=` over `(Any, Any)` would answer every mixed comparison by `SEQV`, `3 = 3.0`
  false with no error. Its exact half compares as rationals, as `numbers.tex:371-372` says. Its
  float half is the base's comparison kept, after `asFloat`, and is not transitive (`1/3 =
  asFloat(1/3)` is `true`); the specification is silent there (row 434, home 3). The alternative,
  comparing a float by its exact value, is transitive and needs a conversion the library lacks.
- **The compiled path loses `CoercionRedispatchRungC.fss`** to its approved line
  `SUM[\ZZ32\]` until the switch-over, and `expTest`'s first error moves to `asFloat`
  (REPORT.md section 15); no spelling serves both libraries.
- **The demos.** Instruction 7 counts how many of the 24 demos with unwritten clause-form sums
  ran on the base and fail on the flat library; the demos are not gated and none is edited.
- **The judge's decisions under this ruling**: the homes of section 3 for the skeptic's four
  recommended rows; and for `RR32`'s natives, home 2 now rather than retyping the 32 natives to
  `b: RR32` in this rung, which the row records as the library-side fix.
- **The count of interpreter tests** rises by six in this batch, not three (section 5).
