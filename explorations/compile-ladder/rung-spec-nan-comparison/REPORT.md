<!-- Rung S of climb batch 26: the operators overview's sentences on a comparison at a NaN or at 0/0 revised to the rationals chapter's reading (P-159, row 672), with walk and compiled guards of the values the text states. -->

# Rung S, rung-spec-nan-comparison: a comparison at a NaN or at 0/0 answers false

- problem: row 672 (CONTESTED), a float compared with a NaN answers `false` on both paths where the overview says it throws `FloatingComparisonError`; P-159 settles it by this edit: `Specification/basic/operators/opr-overview.tex:284-288` (base)
- spec: `Specification/basic-lib/numbers.tex:372-378` (the rationals chapter: 0/0 false "for compatibility with floating-point arithmetic", the infinities ordered); `Specification/advanced-lib/comparison.tex:119-124` (`Unordered`)
- precedent: the revival-conditional callout of the same subsection, `Specification/basic/operators/opr-overview.tex:308` (base `:296`); the Appendix I entry "The rounding of an infinite or indefinite rational", `Specification/appendices/changes.tex:3872-3928`; the walk guard's form, `ProjectFortress/tests/TupleOrderBounds.fss:1-49`
- deviation: `CMP` is named for floats only, not for rationals, as fork 5 gives the text: `Specification/basic/operators/opr-overview.tex:290-291`
- deviation: the rational infinities are written `\EXP{-1/0}` and `\EXP{1/0}`, the overview's own spelling, where the chapter writes `-\infty` and `+\infty`: `Specification/basic/operators/opr-overview.tex:287`
- historical: `Specification/basic/operators/opr-overview.tex`, `Specification/appendices/changes.tex` (both in the 2012 tree, `a874948ac`)

## 1. What changed and why

One commit, `1d109308e`, on `wip/rung-spec-nan-comparison`, pushed. No implementation, library or tool changes (P-159: both paths already answer so).

- `Specification/basic/operators/opr-overview.tex:284-300`, subsection "Comparisons Operators": the two sentences that said a rational comparison throws `RationalComparisonError` at 1/0 or 0/0 and a float comparison throws `FloatingComparisonError` at a NaN now say that a comparison of rational values by these four operators returns `false` if either argument is 0/0, for compatibility with floating-point arithmetic, that -1/0 is less than and 1/0 greater than every finite rational value (`\secref{basic-rationals}`, `numbers.tex:17`), and that a comparison of floating-point values by these four operators returns `false` if either argument is a NaN, and `CMP` returns `Unordered` (fork 5). One `\revision{revival-nan-comparison}` callout after them (`:292-300`), in the form of the revival-conditional callout below it: it quotes the original in prose, says the exception types stay declared and nothing throws them, and names walk's departure at 0/0 against itself (row 440).
- `Specification/appendices/changes.tex:4550-4622`: a new `\subsection{A comparison at a NaN or at the rational indefinite}` with `\seclabel{revival-nan-comparison}`, before "Passages not yet revised" (now `:4624`): affected section; change; rationale (P-159, dated 5 November 2026: the team's `false` and `Unordered` on both paths and no raise; the rationals chapter, the comparison chapter's `Unordered` and the overview's own `MAX`/`MIN` passage; the peers; the 15 to 20 percent cost, `explorations/perf-probes/nan-check-cost/REPORT.md:95`; the decision record); effect (no program changes; the one departure, row 440, walk's 0/0 against itself `true` for `=`, `<=`, `>=` and `EqualTo` for `CMP`; the compiled path's own library declares no rational type and no `CMP` on floats until the switch-over; the three gated tests); the original text, `Specification-1.0-frozen/basic/operators/opr-overview.tex:274-278`, quoted; route C the same, with what a reversal needs (the review's option (b): a raise from the four operators at a NaN on both paths, with a NaN test in each compiled comparison). Both exception types stay declared (`Library/FortressLibrary.fsi:1184`, `:1187`; `Library/CompilerLibrary.fsi:97`, `:99`).
- `Specification/fortress/preamble.tex:54-62`: read; not changed. It says the revival revised the draft "where a decision taken for the implementation it is completing would otherwise leave the text and the implementation in disagreement", that each revised passage carries a box, and that Appendix I lists every change with its reason, the original and the alternative: this change is such a revision, with a box and an entry, so no sentence of it is false.
- `ProjectFortress/tests/ComparisonAtNaNWalk.fss` (new, 82 lines): `RR64` (`0.0/0.0` at a declared type) and `RR32` (`z / z`, `z: RR32 = narrow(0.0)`), a NaN with a number on each side and two NaNs: `<`, `<=`, `>`, `>=` false, `CMP` `Unordered`; `QQ`: 0/0 with a finite value on each side, the four false and `CMP` `Unordered`; -1/0 and 1/0 against a finite value and each other, ordered, `CMP` `LessThan`/`GreaterThan`. 0/0 against itself is not asserted (row 440; `XXXRationalUnorderedRungP` holds the chapter's answer).
- `ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled.fss:101-112`: `NOT dLT(nan, one)`, `NOT dLT(one, nan)`, `NOT dLT(nan, nan)`, and the same for `dLE`, `dGT`, `dGE` (12 asserts).
- `ProjectFortress/compiler_tests/NativeHelperFamilyRR32Compiled.fss:256-267`: the same 12 for `fLT` to `fGE`.
- `ProjectFortress/tests/TupleOrderBounds.fss:19`: message only, value kept. Before: `assert(nan < 1.0, false, "today's value: a float compared with a NaN by < answers false, as the pairs above do")`. After: `assert(nan < 1.0, false, "a float compared with a NaN by < answers false, as the pairs above do")`.
- `explorations/compile-ladder/rung-spec-nan-comparison/decision-record.md`: the passage, the original and the new text, the reason, the way back.

## 2. The runs

The edit is of the specification and neither implementation changes, so there is no failing run (P-102; fork 6): the tests are guards that pass on the base's code, which is this tree's code. recordedFailure: none.

The walk guard on the base's code, before any edit of the specification or the other tests, through the harness:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-spec-nan-comparison/h1 ProjectFortress/tests/ComparisonAtNaNWalk.fss ProjectFortress/tests/TupleOrderBounds.fss ProjectFortress/tests/XXXRationalUnorderedRungP.fss
    # harness-one 2026-11-05T21:06:17Z; tree 4d27fbcc5; nproc=4; load 0.15 2.96 3.85; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    . interpret tmp/rung-spec-nan-comparison/h1/tests/ComparisonAtNaNWalk
    PASS
     OK (time = 596ms)
    OK (3 tests)

The guard shown able to fail: a copy with `assert(nan < one, true, ...)` (scratch, not committed), the same harness:

    . interpret tmp/rung-spec-nan-comparison/h2/tests/ComparisonAtNaNWalk
    FAIL: a Boolean: false =/= a Boolean: true; RR64: a NaN is not less than a number
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

The compiled asserts, link and run in one JVM (the implementation and the helpers are the base's, so this one run is both the base's and the after):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh nan ProjectFortress/compiler_tests NativeHelperFamilyFloatCompiled.test NativeHelperFamilyRR32Compiled.test
    . link ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled  OK (time = 7314ms)
    . link ProjectFortress/compiler_tests/NativeHelperFamilyRR32Compiled  OK (time = 7701ms)
    . run ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled (322ms) PASS
    . run ProjectFortress/compiler_tests/NativeHelperFamilyRR32Compiled (291ms) PASS
    OK (4 tests)

The last run, after the last change of any file (the message of `TupleOrderBounds.fss:19`), with the kept verdicts:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-spec-nan-comparison/h1 ProjectFortress/tests/ComparisonAtNaNWalk.fss ProjectFortress/tests/TupleOrderBounds.fss ProjectFortress/tests/XXXRationalUnorderedRungP.fss ProjectFortress/tests/TupleOrderMixedRefused.fss ProjectFortress/tests/TupleOrderMixedRefused.test ProjectFortress/tests/TupleOrderNestedRefused.fss ProjectFortress/tests/TupleOrderNestedRefused.test ProjectFortress/tests/TupleOrderUnitRefused.fss ProjectFortress/tests/TupleOrderUnitRefused.test
    # harness-one 2026-11-05T21:11:00Z; tree 4d27fbcc5; ... FORTRESS_THREADS=4; cache filled
    . interpret .../XXXRationalUnorderedRungP   OK Saw expected exception
    . interpret .../ComparisonAtNaNWalk   OK (time = 773ms)
    . interpret .../TupleOrderBounds   OK (time = 632ms)
    OK (6 tests)

(the three `TupleOrder*Refused` each "OK Saw expected refusal at load").

The specification's build, once, in this tree:

    nohup bash -c '( cd Specification/fortress && ./ant genSource && ./ant tex ) > tmp/rung-spec-nan-comparison/spec.txt 2>&1; echo EXIT=$? >> tmp/rung-spec-nan-comparison/spec.txt' >/dev/null 2>&1 &
    209:BUILD SUCCESSFUL
    210:Total time: 48 seconds
    19746:BUILD SUCCESSFUL
    19747:Total time: 48 seconds
    19748:EXIT=0

`grep -c 'LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|LaTeX Warning: There were multiply-defined labels\|^! Undefined control sequence' Specification/fortress/fortress.log` printed `0`; the log's last output line 'Output written on fortress.pdf (692 pages, 2394971 bytes).'. The typeset passage, by `pdftotext`: "Comparison of rational values by these four operators returns false if either argument is the rational indefinite 0/0 , for compatibility with floating-point arithmetic, and the rational infinities are ordered: −1/0 is less than and 1/0 is greater than every finite rational value (Section 33.1). ... REVISED BY THE 2026 REVIVAL SEE Section I.1.45". Then `git clean -fXq -- Specification`.

Not run: `ant testSpecData` (the gate's; no example of `SpecData/` reads the changed sentences, which are prose: its 130 at climb batch 25's gate stand), the suites (fork 12: S changes no code), the demos (fork 16, the gather's).

## 3. The stages and the ladder

Neither the count stage nor the distance stage: every path the rung changes is under `Specification/`, `ProjectFortress/tests/`, `ProjectFortress/*_tests/` or `explorations/` (`git diff --name-only 4d27fbcc5571f0157b3dfda3977b63430c66d701`: `ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled.fss`, `ProjectFortress/compiler_tests/NativeHelperFamilyRR32Compiled.fss`, `ProjectFortress/tests/ComparisonAtNaNWalk.fss`, `ProjectFortress/tests/TupleOrderBounds.fss`, `Specification/appendices/changes.tex`, `Specification/basic/operators/opr-overview.tex`, `explorations/compile-ladder/rung-spec-nan-comparison/*`), which neither stage reads (F-111; fork 13).

The ladder subset is empty: `grep -rl "NativeHelperFamily\|ComparisonError\|TupleOrderBounds\|ComparisonAtNaN" explorations/compile-ladder/baseline-2026-09-19/raw` lists no file, and the rung changes no code that a ladder program's compile reaches; nothing was run.

## 4. Where the fix belongs, and the precedent

The place is the specification only: P-159 keeps both implementations and the library as they are. The form is the skill's revision form (P-95, P-96): a callout at the passage, an Appendix I entry, the preamble checked, the decision record. Precedents followed: the subsection's own revival-conditional callout (`opr-overview.tex:308`, base `:296`), and the rationals' Appendix I entry "The rounding of an infinite or indefinite rational" (`changes.tex:3872-3928`), the other entry on the rational infinities, whose items (Affected section, Change, Rationale with the decision's date, Effect with rows, Original text, Route C with the reversal) this entry follows. The other sites of the same kind in the overview: `grep -n 'throws' Specification/basic/operators/opr-overview.tex` gives 5 more sentences that say an operation throws (`IntegerOverflow` twice, `DivisionByZero`, `DisjointUnionError`), none at a comparison; none is changed.

The ways the text could be written (decisions, section 8): one entry and one callout for both sentences, or two; `CMP` for floats only, or for both; the infinities as -1/0 and 1/0, or as the chapter's -infinity and +infinity.

## 5. What the specification settles

The rationals chapter settles the rational sentence (`numbers.tex:372-378`); the comparison chapter settles `CMP`'s `Unordered` at a partial order (`comparison.tex:119-124`); P-159 settles the float sentence against the overview's original. Row 440's 0/0 against itself is settled by the chapter (`false`, `Unordered`) and stays a departure of walk.

## 6. Old against new

None: no program's behaviour changes, and the code is the base's. The walk guard ran on the base's code first (section 2).

## 7. Sentences made false

None in `Specification/` beyond the two revised. Elsewhere:

- `Documentation/Specification/Prose/Language/Operators/operator-overview.tick:274-278`, the team's later restart, carries the same two sentences ("Comparison of rational values throws \TYP{RationalComparisonError} ... if either argument is a \TYP{NaN}."). Not in this rung's files; for the gather or the curator (forCurator).
- Row 672's claim and notes ("Which passage governs is open."): the gather closes the row.
- `explorations/coordinator/PLAN.md:388`, "Which passage governs a float compared with a NaN ... (row 672, `CONTESTED`)?", already marked closed; it reads stale once row 672 closes.

FACTS, POSITIONS and the skill: `grep -rn "ComparisonError\|today's value" explorations/coordinator/FACTS.md .claude/skills/` finds no sentence on this; none made false.

## 8. Decisions

1. One Appendix I entry and one callout for both sentences, not two. Ways not taken: an entry for each sentence; the rational twin left for its own decision (the review's choice inside (a)). Evidence: P-159 names both sentences for revision; fork 5, "One callout and one Appendix I entry for both sentences".
2. `CMP` named for floats only. Way not taken: `CMP` `Unordered` at 0/0 for rationals too, which walk gives ('0/0 CMP 2 Unordered', review section 2.4). Evidence: fork 5's text; the rationals chapter gives `CMP` its own entry (`numbers.tex:382-386`).
3. The infinities written -1/0 and 1/0, the overview's spelling. Way not taken: the chapter's -infinity and +infinity. Evidence: the original sentence wrote `\EXP{1/0}`; fork 5 writes "−1/0 below and 1/0 above".
4. The callout names row 440's departure. Way not taken: the departure only in the entry's Effect. Evidence: the neighbouring revival-conditional callout names its departure, row 774 (`opr-overview.tex:312-313`).
5. The Effect names the compiled path's own library's limit (no rational type, no `CMP` on floats until the switch-over). Way not taken: silence. Evidence: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:35`, `:231` declare `CMP` only at `String` and `ZZ32`; the review's reference 4 ('... is not applicable to an argument of type (RR64, FloatLiteral).'). It is a limit that ends at the switch-over, not a departure of a path from the rule, so it gets no row.
6. The entry's rationale cites the comparison chapter by its trait's name, `Comparison`, not by `\secref`: `Specification/advanced-lib/comparison.tex` has no `\seclabel` (`grep -n 'label' Specification/advanced-lib/comparison.tex | head` prints none in its head).
7. The walk test asserts both sides of a NaN, two NaNs, and `CMP` both ways, at both float types; the compiled asserts the same three shapes for each of the eight helpers. Way not taken: one side only, the review's "a NaN on each side" read as one assert. Evidence: fork 6; the brief's "at a not-a-number value on each side".
8. Row 440's change as a whole new line, not a note. Way not taken: a note, which the brief asks for. Evidence: the row's notes cell is 676 of 700 characters (`ledger.py` header: notes 700), so the note would not fit; the new line states `<=` and `>=` in the claim and cuts the notes; `ledger.py check --rows` on it: '1 rows, 0 fail the template'.
9. The preamble not changed (section 1). Way not taken: a sentence naming this revision. Evidence: the paragraph speaks of revisions in general, and names only the first.

## 9. Points to report

- The revised sentences and the callout: `Specification/basic/operators/opr-overview.tex:284-300`. The Appendix I entry with row 440's departure in its Effect: `Specification/appendices/changes.tex:4550-4622` (the departure at `:4596-4599`). The preamble checked, unchanged: `Specification/fortress/preamble.tex:54-62`.
- The walk test and the compiled asserts on the base and after: section 2; the code is the base's throughout.
- The specification's build: both 'BUILD SUCCESSFUL', the warnings grep `0` (section 2).
- Every sentence made false: section 7, one in `Documentation/`.
- A file edited beyond those named, or any edit of the library or an implementation: none.

## 10. Defects and their homes

- Row 672 (the overview's raise against both paths' `false`): home 1, repaired by this change (the text now says what both paths do), its test `ProjectFortress/tests/ComparisonAtNaNWalk.fss`; the gather closes the row, settled by P-159.
- Row 440 (walk's 0/0 against itself, now also `<=` and `>=`): home 2, deferred, settled by the chapter; its `XXX` test `ProjectFortress/tests/XXXRationalUnorderedRungP.fss` stands; the row's new line is in `record.md`.
- No new defect.

## 11. Commands worked out

- `pdftotext Specification/fortress/fortress.pdf tmp/.../spec.txtout` and a grep of the revised sentence, to read the typeset passage before the clean.
- `python3 explorations/coordinator/tools/ledger.py check --rows FILE`, to lint a row line without writing the ledger.
