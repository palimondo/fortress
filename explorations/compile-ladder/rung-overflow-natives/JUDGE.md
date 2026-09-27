# Rung O (`rung-overflow-natives`, climb batch 6b): the judge's ruling on the skeptic's refusal

**Decision: repair.** The skeptic is right on both refusal grounds. The reserved stop "a library
body found to rely on wrapping" is met: three range bodies of the one library answer right at the
integer bounds only because an intermediate wraps, and after this rung they raise `IntegerOverflow`
under `walk`. The record says the stop was not met. The provenance block also cites a line that does
not say what it claims. The code is right and is not reopened. The stop is reversible, so it does not
hold the push: it lands and is listed for Pavol (`explorations/coordinator/POSITIONS.md:120`;
`explorations/protocol.md:17-20`).

The repair round:
- corrects the record and the report;
- gives the skeptic's measured defects their homes: four expected-failure tests, three under `walk`
  and one compiled pair;
- adds four rows and three notes to `record.md`.

No Java, library or team-test file changes. The numbered instructions are in section 7.

The judge read:
- the net change `git diff 5c368175f...HEAD` and the milestones `0e4d3214d` to `4ec893bb8`;
- `record.md` and `SKEPTIC.md`;
- the worker's structured result, including its `reportText` (`REPORT.md` is not on the branch,
  because the harness refused the worker's write);
- the skeptic's captures under `probes/skeptic/` that the rulings below cite;
- the batch record's section 1 and section 3, O (`explorations/coordinator/CLIMB-BATCH-6.md:181-209`);
- the briefing's slice (POSITIONS 2026-09-24 row 379, 2026-09-26 rung O of climb batch 4, the fifth
  batch-5 answer, rung D's stop; ledger rows 379 and 427; FACTS.md, "The compiled path's integer
  rules"), plus POSITIONS.md:120, ledger rows 325 and 403, and `explorations/reviews/wrap-dependent-code.md`
  sections 6 and 9;
- every specification passage cited below, ten lines either side.

Nothing was built or run for this ruling.

## 1. Refusal ground 1: the reserved stop is met

**The skeptic is right.**

- **The stop.** The batch record reserves for O: "A library body found to rely on wrapping: the
  library is not this rung's, and the site is reported, as batch 4's rung O reported its four"
  (`explorations/coordinator/CLIMB-BATCH-6.md:203`). The shared prefix of this run repeats it among
  the stops reserved for Pavol.
- **The sites, read by the judge.**
  - `Library/RangeInternals.fss:1423`: `sized1Range` builds `lo # ex` as
    `CompactFullParScalarRange[\I\](lo,lo+ex-1)`. For `MAX # 1`, `lo+ex` wraps to the minimum and
    `-1` wraps back to the maximum.
  - `Library/RangeInternals.fss:989-990`: `CompactFullScalarRange.size` computes
    `res = narrow(r-l+1)` before it tests emptiness. For `1:MIN`, `r-l` wraps and `+1` wraps back.
  - `Library/FortressLibrary.fss:3877`: `CompactFullRange`'s `|self|` computes
    `0 MAX ((u - l') + 1)`, the same shape.
- **The measurements.** Base classes against the edited build, both under `walk` on this branch:
  - `probes/skeptic/SkTopHash-walk-stock.txt:2`: "MAX # 1 built; its size is 1". The edit raises at
    `RangeInternals.fss:1423:39` (`SkTopHash-walk-edit.txt:2-3`).
  - `probes/skeptic/SkEmptySize-walk-stock.txt:3-4`: size 0. The edit raises at
    `RangeInternals.fss:989:22`.
  - `probes/skeptic/SkEmptyAbs-walk-stock.txt:2`: `|1:MIN|` is 0. The edit raises at
    `FortressLibrary.fss:3877:28`.
  - The table in `SkRangeEdges-walk-stock.txt` against `SkRangeEdges-walk-edit.txt`: E04, E05, E06,
    E09 and E18 are right on the base and raise on the edit.
- **What the specification says.**
  - "The range `a#n` is the set of `max(0,n)` integers `{a, …, a+n-1}`"
    (`Specification/basic/expressions/ranges.tex:64-65`), so `MAX # 1` is `{MAX}`.
  - "The range `a:b` is the set of `n=max(0,b-a+1)` integers" (`:47`), so `1:MIN` is empty.
  - `|…|` gives "the number of integers in the set" (`:103-106`).
  - Every element of these ranges fits its type. No integer result the specification defines
    overflows here; only an intermediate the library chose to compute does.
- **This is reliance on wrapping.** It is the same kind as the strided distance that the wrap review
  classed as must-avoid code and that Pavol had reordered with the checked operators kept
  (`explorations/reviews/wrap-dependent-code.md:155`, case (c); `POSITIONS.md:81`).
- **Why the worker's pass missed it.** The logging pass reached no such site
  (`probes/overflow-probe-summary-base.txt`). Its claim is true of what it reached (reportText
  section 9, last paragraph). But section 15 ("not met"), the summary ("No library body relies on
  wrapping") and `record.md:62` ("No reserved stop was met beyond the two standing ones") state it
  without that limit, and they are wrong.
- **The stop does not hold the push.**
  - Pavol, 2026-09-27, on "the stops a batch record reserves for him": "These don't need me now.
    They are reversible things I can review later. Don't block start of next batches on these."
    The coordinator's record of it: "A reversible stop lands, the push and the next batch go ahead,
    and it is listed for his review" (`POSITIONS.md:120`).
  - The protocol's first hard rule states it for every stop a batch record reserves, "when it can be
    undone" (`explorations/protocol.md:17-20`).
  - This one can be undone. The change behind it is four Java classes, revertible by one commit, and
    nothing is deleted.
  - Nothing measured reaches these sites. That covers the 413 tests, the 62 demos and both microGPT
    checks (`probes/overflow-probe-summary-edit.txt`).
  - So the shared prefix's "a stop that a rung meets and that is not lifted holds the commit stage's
    push" does not apply: this stop is lifted, and it is listed (section 8).
- **The library stays unrepaired in this rung.** The record says "the library is not this rung's,
  and the site is reported" (`CLIMB-BATCH-6.md:203`), and O's files do not include `Library/`
  (`:195`). This is the prefix's legitimate fourth case: land, and open a verified row with its
  gated expected failure. The alternative is in section 8.
- **Two more sites have the same shape**, by reading:
  - `RangeInternals.fss:1426` and `:1429` (`sized2Range`, `sized3Range`);
  - `FortressLibrary.fss:3878-3879` (the 2-D and 3-D `|…|`).
- **One site the skeptic lists is not the same kind.** `RangeInternals.fss:1158` (the strided size)
  has a like shape. But its wrapped answer was already wrong on the base: `res` above 1 is returned
  even when the range is empty (`:1158-1160`, by reading). So the row lists it by reading as a
  pre-existing defect, not as reliance.

## 2. Refusal ground 2: one provenance citation

**The skeptic is right.**
- **The error.** The deviation line of the provenance block cites `opr-overview.tex:162-163` for
  division by zero. Line 162 is "according to the rules of IEEE 754." (underflow), and line 163 is
  blank.
- **The right line.** The sentence "For integer results, division by zero throws a DivisionByZero"
  is at `Specification/basic/operators/opr-overview.tex:164-165` (read `:150-170`).
- **Only that line needs the fix.** Section 6 of the report says "Division by zero is not touched
  (row 336)" and cites no line.

## 3. The skeptic's other corrections

- **The count on row 427's note.** `record.md:42` cites
  `probes/demo/HeapShakedown-base-logshadow.txt` for "11,940 lines", but that capture's line 2 reads
  `OVERFLOW-PROBE lines: 11952`. The 11,940 comes from `probes/overflow-probe-summary-base.txt:11`,
  1,068 `Int$Add` and 10,872 `Int$Mul`: `probe-summary.py:26` keeps only lines that start with the
  tag, and 12 tags follow the demo's progress dots. The skeptic is right. No file-level verdict
  changes (the skeptic's substring recount).
- **The stop in the record.** The skeptic asks for the correction in the FACTS "Measured" line
  (`record.md:13`), in the row 403 note (`:48`) and in the handover line (`:62`). It is right on
  all three.
- **The test's comment line.** `ProjectFortress/tests/FixedWidthOverflowRungB.fss:1` points at a
  `REPORT.md` that is not on the branch, so the report must be written. Instruction 7 does this.
- **The skeptic's hedge on POSITIONS.md:120.** It says that if the coordinator reads `:120` as not
  covering this stop, the push holds. This ruling settles that reading (section 1), so the hedge
  no longer applies.

## 4. The skeptic's other findings: one home each

The shared prefix gives every defect anyone in the rung measures exactly one of three homes
(`explorations/coordinator/climb-batch-workflow.js:774-778`). F's judge in this batch applied it
the same way to its skeptic's findings (`explorations/compile-ladder/rung-flat-tower/JUDGE.md`
section 3). The skeptic's structured result leaves several homes to "recommended". The judge
assigns them here, so that the second skeptic sees them in place.

- **A. The wrap-reliant range sites (section 1): home 2.**
  - **Why home 2.** The specification settles the answers (`ranges.tex:47`, `:64-65`, `:103-106`),
    and the repair is outside this rung.
  - **The test.** One `XXX` walk test, the first this rung adds, so it is shown red on a deliberate
    local fix of the three bodies and then restored (instruction 1).
  - **An extra assertion.** It includes `|MAX:MIN| = 0`. The base answers 2 there (E08), so the file
    also stays an expected failure if the natives are ever reverted.
- **B. A sequential range steps past its last element: home 2.** A separate file, because it is a
  separate fix.
  - **The sites.** `CompactFullSeqScalarRange.generate` and `loop` step `i += 1` after the last
    element (`RangeInternals.fss:1073`, `:1081`, read `:1060-1083`), and the strided generator
    steps `i += str` (`:1298`, `:1304`, `:1314`, `:1320`, read `:1290-1322`).
  - **Both builds are wrong.** On the base, `for i <- seq((MAX-2):MAX)` passes the maximum
    (`SkSeqTop-walk-stock.txt:5-6`, element 4 is the minimum). After the edit it raises after the
    third element (`SkSeqTop-walk-edit.txt:2-5`).
  - **What the specification says.** The range has exactly those elements (`ranges.tex:47`, and
    `:54-56` for the strided range).
  - **Not part of the stop.** The base was wrong too. A hang becomes a loud failure, the skeptic's
    loud-to-quiet reading (its `loudToQuiet`), which the judge accepts.
- **C. `|r|` of a `ZZ64` range fails under walk: home 2.**
  - **The defect.** `FortressLibrary.fss:3874-3880` has `typecase` arms for `ZZ32` and its pairs and
    triples only, so `|widen(1):widen(3)|` ends the run with "typecase match failure given Long",
    while `.size` answers 3 (`SkWideSize-walk-edit.txt:2-3`). It predates the rung
    (`SkRangeEdges-walk-stock.txt`, the E07 failure).
  - **Where the specification settles it.** `ranges.tex:103-106`, where `|…|` is the number of
    integers. The skeptic cited only `:47`.
- **D. The compiled prelude's range split overflows at `lo+hi`: home 2.**
  - **The defect.** It is `z = lo+hi` at `Library/CompilerLibrary.fss:363`, `:377`, `:387`, `:395`,
    `:404` and `:414`, each under the team's own "Danger of overflow here", and `#` as
    `lo : (lo+sz-1)` at `:446`. `for i <- seq(1073741824:1073741826)` raises before its first element
    (`SkMidRange-compiled.txt`, through `countedseqloop` at `:377`), where walk visits three
    (`SkMidRange-walk-edit.txt`).
  - **What the specification says.** It settles this against the compiled run (`ranges.tex:47`).
  - **The team's fix.** Steele's overflow-free `floorAverage` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:746-747`
    for `ZZ32`), noted and never applied (`explorations/reviews/wrap-dependent-code.md:82`).
  - **The test.** A run-time defect in `compiler_tests/`, so it takes the two-file shape (FACTS.md,
    "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a
    compile-stage failure only, and a run-time defect needs two `.test` files"), whose template is
    `ProjectFortress/compiler_tests/BoxDotSpellingsRungWLink.test` and `XXXBoxDotSpellingsRungW.test`.
  - **When it goes green.** When the prelude's split is fixed, or when the one library replaces the
    prelude at the switch-over. Either way the gate then says so.
  - **The judge's decision.** The skeptic's structured result gives this defect "a new ledger row
    (fourth case)" in one field and "Home. 2" in another. The judge takes home 2, as the prefix
    requires for a settled answer.
- **E. The compiled path's numeral folding: a note on row 325. The skeptic is wrong that the
  specification is silent.**
  - **What the specification says.** An expression composed of numerals and `+` is a numeric
    constant expression whose type encodes its value: "the type of a constant expression `3+5` …
    encodes the value of the expression" (`Specification/basic/expressions/constant.tex:44-51`).
    Numeric static expressions combined with `+`, `-` and `·` give a numeric constant expression
    "as long as the constant traits provided by the library can encode the value" (`:123-133`).
  - **So the compiled side's value is right.** `2147483647 + 1` is exactly 2147483648.
  - **So the declaration is row 325's static error.** Declaring that value `ZZ32` is the static
    error row 325 already names (its citation, `literals.tex:83-86`).
  - **Both paths report it at run time.** The compiled path raises the uncatchable `java.lang.Error`
    of row 325 (`SkLitFold32a-compiled.txt`). Walk, which checks nothing statically (the prefix's
    rule 4), raises the catchable `IntegerOverflow` (`SkLitFold32a-walk-edit.txt`).
  - **So it is a measurement of an existing row.** It gets a note on row 325 citing
    `constant.tex:44-51`, `:123-133`. It is not a home-3 probe, since the specification is not silent
    here.
- **F. Row 315's duplicate closure class through a numeral-bodied thunk: a note on row 315**, as the
  skeptic says (`SkLitThunk-compiled.txt`).
- **G. Row 326 met again.** The worker's six lines (`probes/bounds/OverflowBounds-differential.txt`)
  and the skeptic's ten (`SkRoutes-differential.txt`) belong to the existing row: a note, as the
  worker wrote it.
- **H. The worker's row 449 and its decision against an `XXX` test.** Both stand. The skeptic
  accepted them. Row 427 is the precedent: the defective code is a demo that no suite runs, and an
  `XXX` copy would gate the copy.

## 5. What each side got right and wrong

**The worker was right on the substance.**
- **The natives.** The eighteen natives equal exact arithmetic: 0 mismatches in 9,133,632 checks
  on the edit, against 3,816,131 on the base classes (`SkNativeCheck-edit.txt`,
  `SkNativeCheck-stock.txt`).
- **The two halves.** The signed half is `natives.patch` hunk for hunk. The unsigned half is the
  compiled helpers' tests written with the vendored `Unsigned` (read against
  `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java:103-129` and
  `UnsignedLong.java:104-130`).
- **The recorded failure.** It precedes the edit (`0e4d3214d`).
- **The tests.** The renamed test passes on both paths, and `intPrim` and `longPrim` add without
  restating.
- **The comparison and the checker count.** The comparison's zero stands, and the checker count is
  62.
- **The worker's seven decisions** stand as decisions (reportText section 14). Among them are the
  sixteen non-throwing guards, the test's second text for the compiled prelude, and no row for the
  seventeen run-to-run files, as rungs D and F judged them.

**The worker was wrong on three points.**
- It stated that no library body relies on wrapping, beyond what its logging pass reached.
- It cited `:162-163` for division by zero.
- It cited 11,940 against a capture that says 11,952.

**The skeptic was right on both refusal grounds and on every correction.**

**The skeptic was wrong on two points.**
- It called numeral-only arithmetic silent in the specification (section 4, E).
- It gave D two different homes.

**One detail of the skeptic's is loose.** It lists `RangeInternals.fss:1158` among the wrap-reliant
sites, where the base's answer was already wrong (section 1). It changes no instruction beyond the
row's wording.

## 6. What the gather must know

- **The test counts.** The repair adds three files to `ProjectFortress/tests/`, so the `testSystem`
  sum rises by three, where the manifest said "the renamed test keeps the testSystem count". It
  adds two `.test` files and one `.fss` to `ProjectFortress/compiler_tests/`, one of them an
  expected failure. The gate compares the shards by their sum (FACTS.md, "`testSystem`'s four
  shards are one suite split by sorted index").
- **The new files are outside O's named files** (`CLIMB-BATCH-6.md:195`). That meets the record's
  stop "An edit to any file not named above" (`:203`). They are required by the prefix's home rule,
  reversible, and listed (section 8). The same lifting as section 1.
- **The rows.** Four new rows follow the worker's provisional 449, provisionally 450 to 453 in the
  order A, B, C, D. The gather assigns the final numbers. The tests carry specification lines only,
  so no row number needs changing in a test.

## 7. The repair round's instructions

Work only in `/home/user/fortress-overflow` on `wip/rung-overflow-natives`. Set up each shell as the
shared prefix says. If other workers are on the box, set `env.sh`'s variables by hand without its
`rm -rf /tmp/fortress*rats`, as `probes/skeptic/run-sk.sh:6-11` does.

Rules for the whole round:
- **What not to run or change.** Do not run `ant testFast`, `ant testSystem` or `ant compileAll`:
  no Java changes, and the branch's build is the edited one the skeptic ran.
- **Captures.** Every capture is a `.txt` under `explorations/compile-ladder/rung-overflow-natives/probes/repair/`,
  headed by `explorations/compile-ladder/rung-overflow-natives/machine.sh <label>`.
- **Caches.** Every direct `walk` run uses a fresh private cache directory, in the shape of
  `run-sk.sh`'s `walk-edit` branch (`probes/skeptic/run-sk.sh:19-25`).
- **The shape of each new test file.**
  - It carries exactly one comment line, `(*) explorations/compile-ladder/rung-overflow-natives/REPORT.md`,
    as `ProjectFortress/tests/FixedWidthOverflowRungB.fss:1` does.
  - Then the component, `export Executable`, and `run(): () = do println("REACHED")`, then the
    asserts in the Boolean form `assert(cond, msg)`, then `println("PASS")`.
  - Each assert message carries its specification line and nothing else. New rows are numbered at
    the gather, so no row number goes in a test.
  - Bind each range and each size to a name before asserting on it.

1. **Row A, home 2, and the red demonstration.**
   - **The test.** Add `ProjectFortress/tests/XXXRangeBoundsRungO.fss`. It declares
     `one: ZZ32 = 1`, `three: ZZ32 = 3`, `zMax: ZZ32 = 7FFFFFFF_16`, `zMin: ZZ32 = -zMax - 1`, and
     `lMax: ZZ64 = 7FFFFFFFFFFFFFFF_16`. It asserts:

     | expression | expected | message |
     |---|---|---|
     | `\|zMax # one\|` | 1 | `ranges.tex:64-65, :103-106` |
     | `\|(zMax - 2) # three\|` | 3 | `ranges.tex:64-65, :103-106` |
     | `((lMax - widen(2)) # widen(three)).size` | 3 | `ranges.tex:64-65, :103-106` |
     | `r.size`, with `r = one:zMin` | 0 | `ranges.tex:47, :103-106` |
     | `\|r\|` | 0 | `ranges.tex:47, :103-106` |
     | `\|zMax:zMin\|` | 0 | `ranges.tex:47, :103-106` |

   - **Capture the failure.** Capture it under `walk` at `FORTRESS_THREADS=1` and `=4`: it must
     stop with `IntegerOverflow` at `Library/RangeInternals.fss:1423`. Then capture it through
     `explorations/compile-ladder/rung-interp-coercion/harness-one.sh tmp/h-A ProjectFortress/tests/XXXRangeBoundsRungO.fss`:
     the expected failure is reported and there is no failure count.
   - **The deliberate local fix.** Make exactly these three edits:
     - at `Library/RangeInternals.fss:1423`, `lo+ex-1` becomes `lo+(ex-1)`;
     - at `Library/RangeInternals.fss:989-990`, the two lines `res = narrow(r-l+1)` and
       `if res <= 1 AND: l>r then 0 else res end` become one line,
       `if l > r then 0 else narrow(r-l+1) end`;
     - at `Library/FortressLibrary.fss:3877`, `0 MAX ((u - l') + 1)` becomes
       `if u < l' then 0 else (u - l') + 1 end`.
   - **Run it on the fix.** Put `git diff Library` in the capture. Run the file under `walk` with a
     fresh cache: it must print `PASS`. If an assertion fails under the fix, remove it from the file,
     rerun, and say in REPORT.md which one and why.
   - **Show it red.** Run `harness-one.sh tmp/h-A-fix …`: it must print "Missing expected failure"
     and a failure count of 1 (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:400`).
   - **Restore.** Run `git checkout -- Library/RangeInternals.fss Library/FortressLibrary.fss`,
     confirm that `git status --short Library` prints nothing, and run `harness-one.sh tmp/h-A2 …`
     again: the expected failure must be back.
   - **The capture file.** All of it goes, in order and with the commands, into
     `probes/repair/xxx-range-bounds-goes-red.txt`.

2. **Row B, home 2.**
   - **The test.** Add `ProjectFortress/tests/XXXSeqRangeTopRungO.fss` with three loops. Each loop
     counts its elements in its own `var` and asserts that count after the loop, message
     `ranges.tex:47`, with `ranges.tex:54-56` for the strided loop. The loops:
     - `for i <- seq((zMax - 2):zMax)`, which must count 3;
     - the same over `ZZ64`, `seq(lLo:lMax)` with `lLo = lMax - widen(2)`, which must count 3;
     - `for i <- seq((zMax - 4):zMax:2)`, which must count 3.
   - **The guard.** Inside each body, assert that `i` is at least the loop's lower bound, message
     `ranges.tex:47`. This guard reads only `i`, never the counter, so the file cannot hang if the
     natives are ever reverted: on the base, a wrapped `i` is the minimum.
   - **The control.** First run a scratch control, `probes/repair/SeqRangeControl.fss`, committed
     with its capture. It is the same three loops over `seq(1:3)`, `seq(widen(1):widen(3))` and
     `seq(1:5:2)`, and it must print `PASS` under `walk`. This shows the file fails for the
     generators alone.
   - **Capture the failure.** Capture the `XXX` file under `walk` at 1 and 4 threads: it stops with
     `IntegerOverflow` at `RangeInternals.fss:1073` or `:1081`. Then capture it through
     `harness-one.sh` as an expected failure. Everything goes into `probes/repair/xxx-seq-range-top.txt`.
   - **No library edit.**

3. **Row C, home 2.**
   - **The test.** Add `ProjectFortress/tests/XXXRangeSizeZZ64RungO.fss`. It binds
     `r = widen(one):widen(three)` and asserts `r.size = 3` first, as the in-file control that
     passes today, and then `|r| = 3`. Both messages are `ranges.tex:103-106`.
   - **Capture the failure.** Under `walk` at 1 and 4 threads it must fail with
     "typecase match failure given Long" at `FortressLibrary.fss:3876-3880`, after the first assert.
     Then capture it through `harness-one.sh` as an expected failure
     (`probes/repair/xxx-range-size-zz64.txt`).

4. **Row D, home 2, the compiled pair.**
   - **The program.** Add `ProjectFortress/compiler_tests/XXXSeqMidpointRungO.fss`. It prints
     `REACHED`, binds `lo: ZZ32 = 1073741824` and `hi: ZZ32 = 1073741826`, counts
     `for i <- seq(lo:hi)` in a `var n: ZZ32`, asserts `n = 3` (message `ranges.tex:47`), and prints
     `PASS`.
   - **The two `.test` files.** Beside it, in the shape of `BoxDotSpellingsRungWLink.test` and
     `XXXBoxDotSpellingsRungW.test`:
     - `SeqMidpointRungOLink.test` holds `tests=XXXSeqMidpointRungO` and `link`;
     - `XXXSeqMidpointRungO.test` holds `tests=XXXSeqMidpointRungO`, `run` and
       `run_out_contains=REACHED`.
   - **The control.** Compile and run a scratch control, `probes/repair/SeqMidpointControl.fss`,
     committed with its capture. It is the same program with `lo = 1` and `hi = 3`, run on the
     compiled path against a private copy of the caches, as `run-sk.sh`'s `compiled` branch does
     (`probes/skeptic/run-sk.sh:26-31`). It must print `PASS`. This shows that the counted `var`
     works on the compiled path, so the file fails for the split alone. If it does not print `PASS`,
     rewrite the count so that it does, and say how in REPORT.md.
   - **The harness.** From `ProjectFortress`, remove `*SeqMidpointRungO*` from
     `../default_repository/caches` as `explorations/compile-ladder/rung-unknown-size-arm/probes/rung-tests.sh:5-6`
     does. Then run `../bin/fortress junit compiler_tests/SeqMidpointRungOLink.test`, which must
     pass, and `../bin/fortress junit compiler_tests/XXXSeqMidpointRungO.test`, which must report
     the expected failure. The run output must show `REACHED` and then `IntegerOverflow` from
     `Library/CompilerLibrary.fss:377`.
   - **The capture.** Everything goes into `probes/repair/xxx-seq-midpoint-compiled.txt`.
   - **The tracked cache file.** If `git status --short` then shows
     `default_repository/caches/global.map`, restore it with `git checkout --`.

5. **Competing declarations.** Grep the four component names across `ProjectFortress/` and
   `Library/` (`.fss`, `.fsi`, `.test`, `.java`, `.scala`, the build directory excluded), as
   `probes/competing-declarations.txt` did. Each must occur only in its own files. Capture the
   result in `probes/repair/competing-declarations.txt`.

   **Commit and push** instructions 1 to 5: the four test files, the two `.test` files, the two
   controls and the captures. End the message with the prefix's two footer lines, and push to
   `wip/rung-overflow-natives`.

6. **`record.md`.** Make each change as finished prose.
   - **The FACTS "Measured" line** (`:13`). After the logging pass's sentence, add that it reached
     no range body at the integer bounds. Then add that the skeptic's probes found three library
     bodies that answer right there only by wrapping and now raise `IntegerOverflow`:
     `RangeInternals.fss:1423`, `:989` and `FortressLibrary.fss:3877`. Cite
     `compile-ladder/rung-overflow-natives/probes/skeptic/SkTopHash-walk-edit.txt`,
     `SkEmptySize-walk-edit.txt` and `SkEmptyAbs-walk-edit.txt`, and row 450.
   - **The FACTS "Still open" line** (`:14`). Add rows 450 to 453, one clause each.
   - **Row 427's note** (`:42`). "against 11,940 lines on the base, `…HeapShakedown-base-logshadow.txt`"
     becomes "against 11,952 probe tags on the base
     (`probes/demo/HeapShakedown-base-logshadow.txt:2`; `probes/overflow-probe-summary-base.txt:11`
     counts the 11,940 that start a line, because 12 follow the demo's progress dots)".
   - **Row 403's note** (`:47-50`). Add a bullet: the logging pass reached no range body at the
     integer bounds. The skeptic's probes found three that relied on wrapping and now raise. They are
     row 450 (provisional), the reserved stop met and lifted as reversible (`coordinator/POSITIONS.md`,
     2026-09-27, on the stops a batch record reserves for him).
   - **New row 450 (A).** Section 10, after 449.
     - **Claim:** under `walk` after rung O, a range at the integer bounds whose base answer was right
       only by wrapping raises `IntegerOverflow`. The cases are:
       - `MAX # 1` and `(MAX-2) # 3` on `ZZ32` and `ZZ64`, at `Library/RangeInternals.fss:1423`;
       - `(1:MIN).size`, at `:989`;
       - `|1:MIN|`, at `Library/FortressLibrary.fss:3877`;
       - `|MAX:MIN|`, which raises where the base answered 2, itself wrong.
     - **By reading, the same shape** at `RangeInternals.fss:1426`, `:1429` and
       `FortressLibrary.fss:3878-3879`. Also by reading, the strided size at `RangeInternals.fss:1158`
       overflows on a large span, but there the base's answer was already wrong.
     - **Status and class:** NEGATIVE-VERIFIED; library bug.
     - **Spec:** `Specification/basic/expressions/ranges.tex:47`, `:64-65`, `:103-106`.
     - **Reproducer:** `compile-ladder/rung-overflow-natives/probes/skeptic/SkRangeEdges.fss` (E04-E06,
       E08-E10, E18), `SkTopHash`, `SkEmptySize` and `SkEmptyAbs`, each with `-walk-stock.txt` and
       `-walk-edit.txt`.
     - **Found by:** ours (climb batch 6b, rung O's skeptic).
     - **Notes:**
       - The fix is to reorder and keep the checked operators, as Pavol decided for the strided
         distance (`coordinator/POSITIONS.md`, 2026-09-26, rung O of climb batch 4). That is
         `lo+(ex-1)`, and emptiness tested before the distance. By reading, `lo # 0` with `lo` the
         minimum still overflows under the reorder, so the fix also builds that empty range without
         `lo-1`.
       - It is gated as an expected failure by `ProjectFortress/tests/XXXRangeBoundsRungO.fss`,
         shown red on that fix (`probes/repair/xxx-range-bounds-goes-red.txt`).
       - It is the reserved stop "a library body found to rely on wrapping", met, lifted as
         reversible, and listed for Pavol.
   - **New row 451 (B).**
     - **Claim:** a sequential range steps past its last element. The sites are
       `CompactFullSeqScalarRange.generate` and `loop` (`RangeInternals.fss:1073`, `:1081`) and
       `StridedFullSeqScalarRange` (`:1298`, `:1304`, `:1314`, `:1320`). On the base,
       `for i <- seq((MAX-2):MAX)` never ends (its fourth element is the minimum). After rung O it
       raises after the third. The same holds for `ZZ64` and for `seq((MAX-4):MAX:2)`.
     - **Spec:** `ranges.tex:47`, `:54-56`.
     - **Fix:** step only while `i < r` (for the strided form, while the next element is within the
       range), or count the elements.
     - **Gated by:** `XXXSeqRangeTopRungO.fss`.
     - **Probes:** `SkSeqTop` (stock and edit), `SkRangeEdges` E11, E14, E16, and `probes/repair/xxx-seq-range-top.txt`.
   - **New row 452 (C).**
     - **Claim:** under walk, `|r|` of a `ZZ64` range ends the run with "typecase match failure given
       Long". `Library/FortressLibrary.fss:3874-3880` has only `ZZ32` arms, while `.size` answers 3.
       This predates rung O.
     - **Spec:** `ranges.tex:103-106`.
     - **Fix:** add the `ZZ64` arms, or answer through the `size` getter.
     - **Gated by:** `XXXRangeSizeZZ64RungO.fss`.
     - **Probes:** `SkWideSize-walk-edit.txt`, and `SkRangeEdges-walk-stock.txt` (the E07 failure).
   - **New row 453 (D), compiled path.**
     - **Claim:** the compiler prelude's range generators split at `z = lo+hi`
       (`Library/CompilerLibrary.fss:363`, `:377`, `:387`, `:395`, `:404`, `:414`, under the team's
       "Danger of overflow here"), and its `#` is `lo : (lo+sz-1)` (`:446`). So a range whose bounds
       sum beyond `ZZ32` raises `IntegerOverflow` before its first element:
       `for i <- seq(1073741824:1073741826)` does, where walk visits three.
     - **Spec:** `ranges.tex:47`.
     - **Fix:** Steele's `floorAverage` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:746-747`;
       `CompilerBuiltin.fsi` exports it for `ZZ`, `ZZ64`, `NN32` and `NN64` only, at `:143`, `:204`,
       `:324`, `:383`, so the fix exports the `ZZ32` one or writes its body in place;
       `reviews/wrap-dependent-code.md:82`). And `#` becomes `lo : (lo+(sz-1))`.
     - **Gated by:** `ProjectFortress/compiler_tests/XXXSeqMidpointRungO.fss` with its two `.test`
       files. It goes green when the split is fixed or the prelude leaves at the switch-over.
     - **Probes:** `SkMidRange` (compiled and walk-edit), `SkSeqTop-compiled.txt`, and
       `probes/repair/xxx-seq-midpoint-compiled.txt`.
   - **A note on row 325.** Numeral-only arithmetic whose exact value does not fit is folded exactly
     by the compiled path, which then dies at run time with the uncatchable
     `Not in range for ZZ32: 2147483648` (and `4294967296`, and `ZZ64` `9223372036854775808`). Walk
     after rung O raises the catchable `IntegerOverflow`; it wrapped before.
     - **Spec:** such an expression is a constant expression carrying its exact value
       (`Specification/basic/expressions/constant.tex:44-51`, `:123-133`), so this is this row's
       static error measured again.
     - **Probes:** `probes/skeptic/SkLitFold32a`, `SkLitFold32b` and `SkLitFold64`, with their
       `-walk-stock`, `-walk-edit` and `-compiled` captures.
   - **A note on row 315.** It uses the skeptic's recommended text, with `probes/skeptic/SkLitThunk.fss`
     and `SkLitThunk-compiled.txt`.
   - **Row 326's note.** Add the skeptic's ten lines (`probes/skeptic/SkRoutes-differential.txt`)
     beside the worker's six.
   - **The handover line** (`:62`). Replace "No reserved stop was met beyond the two standing ones …"
     with:
     - the reserved stop "a library body found to rely on wrapping", met through the skeptic's
       probes at three range bodies and lifted as reversible (Pavol, 2026-09-27), with row 450 and
       its expected failure;
     - the four new expected-failure tests and rows 450 to 453;
     - "The `testSystem` count rises by three and the compiler suite gains two `.test` files".

     Also remove "The `testSystem` count is unchanged (a rename)".
   - **A line for the gather.** Add section 6 of this ruling, in one paragraph.

7. **REPORT.md.** Write it from the first worker's `reportText` with these amendments. If the harness
   refuses the write, say so and carry the amended sections in the structured result, each keyed to
   the section it replaces, for the gather.
   - **The provenance block.** In the deviation line, `opr-overview.tex:162-163` becomes
     `opr-overview.tex:164-165`.
   - **Section 1.** "No reserved stop was met, apart from the two standing stops …" becomes: the
     reserved stop "a library body found to rely on wrapping" was met, through the skeptic's probes,
     and is lifted as reversible (`POSITIONS.md:120`; `explorations/protocol.md:17-20`). Say the
     same in the summary.
   - **Section 9's last paragraph.** Keep its limit ("anywhere the tests, the reachable demos or the
     microGPT checks go"), and add that outside that reach the skeptic found three bodies (section 1
     of this ruling).
   - **Section 13.** Add A to G of section 4 above, each with its home and its test or note.
   - **Section 14.** Add the judge's decisions as decisions of the repair round. They are:
     - home 2 now for A to D, rather than a library repair in this rung;
     - D's home 2, rather than a row alone;
     - separate files per row;
     - `|MAX:MIN|` and the `ZZ64` size added to A's file.
   - **Section 15.**
     - The library stop is met. Name the sites, measured and by reading, and the captures. It is
       lifted as reversible and listed.
     - The new test files are outside the named files (`CLIMB-BATCH-6.md:195`, `:203`). The same
       lifting applies, and they are listed.
     - "A site whose value would change" stays not met. The rung edits no library site, and the
       changed range results are the library stop, not a second one.
   - **Section 16.** Add the stop with its three sites and the four new tests.
   - **Section 17.** Add the six new files and the two controls.
   - **A new section 18, "The repair round".** It covers:
     - what this ruling decided;
     - each instruction's result and capture;
     - the red demonstration;
     - the machine lines;
     - that no Java, library or team-test file changed.

8. **Check and commit.**
   - **Tracked paths.** Run the shared prefix's tracked-paths loop over `REPORT.md` (or its carried
     text) and `record.md`. Fix or explain every line it prints.
   - **The diff.** `git diff 5c368175f...HEAD --stat` must show, beyond the rung's first pass, only
     the six new files under `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/` and
     files under `explorations/compile-ladder/rung-overflow-natives/`.
   - **Commit and push** instructions 6 and 7 with the footer.

## 8. For Pavol, out of the loop

- **The reserved stop, met and listed.**
  - **What it is.** Three range bodies of the library answered right at the integer bounds only by
    wrapping: `Library/RangeInternals.fss:1423` (`MAX # 1`), `:989` (`(1:MIN).size`) and
    `Library/FortressLibrary.fss:3877` (`|1:MIN|`). With the natives raising, they raise
    `IntegerOverflow` under `walk`.
  - **What reaches it.** No test, demo or microGPT check.
  - **What happens now.** It lands under your rule for reversible stops (`POSITIONS.md:120`), with
    row 450 and a gated expected failure.
  - **The alternative, not taken.** Reorder the three bodies in this rung now, keeping the checked
    operators, as you decided for the strided distance. That costs an edit to the library outside
    the rung's files, and a re-run of the three-pass comparison and the logging pass.
  - **The judge's reason.** The batch record says the library is not this rung's and the site is
    reported. The fix is one small library step whose shape you already decided.
- **Four new expected-failure tests, outside the rung's named files.**
  - **What they are.** Three under `walk` (rows 450 to 452) and one compiled pair (row 453). The
    `testSystem` count rises by three, and the compiler suite gains two `.test` files.
  - **Why they are there.** The prefix's home rule requires them. They are reversible and listed.
- **A judge's reading, not a decision under silence.** The skeptic called numeral-only arithmetic
  silent in the specification. `constant.tex:44-51` and `:123-133` make it a constant expression
  with its exact value. So the compiled path's run-time `Not in range` error is row 325 measured
  again, and gets a note, not a new row.
- **Carried from the worker, unchanged.**
  - Provisional row 449: `HeapShakedown`'s timing is rational on the flat library, and the demo
    stops at `:128`.
  - No ledger row for the seventeen run-to-run files, as rungs D and F judged them.
