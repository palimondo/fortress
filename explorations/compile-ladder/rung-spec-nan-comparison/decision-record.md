<!-- The decision record of the revision of the operators overview's sentences on a comparison at a NaN or at the rational indefinite (Appendix I, "A comparison at a NaN or at the rational indefinite"): the passage, the original and the new text, the reason, and the way back. -->

# Decision record: a comparison at a NaN or at 0/0 answers false

## 1. The passage

`Specification/basic/operators/opr-overview.tex`, subsection "Comparisons Operators", the two sentences after "are supported by integer, rational, and floating-point types." (base `:284-288`, now `:284-300` with the callout). The Appendix I entry is `Specification/appendices/changes.tex:4550-4622`, `\seclabel{revival-nan-comparison}`, before "Passages not yet revised".

## 2. The original

Base `Specification/basic/operators/opr-overview.tex:284-288`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/operators/opr-overview.tex:274-278` (the same five lines):

```latex
Comparison of rational values throws \TYP{RationalComparisonError}
if either argument is the rational infinity \EXP{1/0} or the
rational indefinite \EXP{0/0}.
Comparison of floating-point values throws \TYP{FloatingComparisonError}
if either argument is a \TYP{NaN}.
```

## 3. The new text

`Specification/basic/operators/opr-overview.tex:284-291`:

```latex
Comparison of rational values by these four operators returns \VAR{false}
if either argument is the rational indefinite \EXP{0/0}, for compatibility
with floating-point arithmetic, and the rational infinities are ordered:
\EXP{-1/0} is less than and \EXP{1/0} is greater than every finite rational
value (\secref{basic-rationals}).
Comparison of floating-point values by these four operators returns
\VAR{false} if either argument is a \TYP{NaN}, and \OPR{CMP} returns
\TYP{Unordered}.
```

and the callout `\revision{revival-nan-comparison}{...}` (`:292-300`), which quotes the original in prose, says that the text now gives the chapter on rational numbers' answers, which walk computes, and for floating-point values those of both paths; that both exception types stay declared and nothing throws them; and that walk still answers `true` for `0/0 <= 0/0` and `0/0 >= 0/0` (row 440).

"These four operators" are the paragraph's own `<`, `<=`, `>=` and `>` (`:281`). The rational sentence follows the chapter, `Specification/basic-lib/numbers.tex:372-378` ("for compatibility with floating-point arithmetic, 0/0 is unordered with respect to itself, and therefore these five comparison operators always return false if either argument is 0/0. The value -infinity is less than any finite rational value, and +infinity is greater than any finite rational value."), cited by `\secref{basic-rationals}` (`numbers.tex:17`). `CMP` is named for floats only, as the batch record's fork 5 gives the text; the rationals chapter gives `CMP` its own entry.

## 4. The reason

P-159 (POSITIONS.md, "A float compared with a NaN answers: `<`, `<=`, `>` and `>=` give `false`, and `CMP` gives `Unordered`, on both paths."), decided 2026-11-05 on the review `explorations/reviews/nan-comparison-2026-11-05.md`, its option (a), section 6:

- The team built `false` and `Unordered` for `RR64` and `RR32` on both paths and raised `FloatingComparisonError` nowhere (`Library/FortressLibrary.fsi:1187`, `Library/CompilerLibrary.fsi:99` declare it; review section 2.3, the runs on both paths).
- The rationals chapter reads so (above); the comparison chapter's `Unordered` is the fourth value of `CMP` on a partial order (`Specification/advanced-lib/comparison.tex:119-124`); the overview's own `MAX` and `MIN` subsection answers a NaN with a value (`opr-overview.tex:246-250`).
- The peers answer `false`: Java, Swift, Python's floats, Julia, Haskell (P-159).
- A NaN test in software costs 15 to 20 percent of a comparison on unboxed doubles in Java (`explorations/perf-probes/nan-check-cost/REPORT.md:95`), noise on today's boxed compiled path; whether it stops vectorisation is open.
- The rational twin: walk already gives what the chapter gives at 0/0 against a finite value and at the infinities ("-1/0 < 2 true, 2 < 1/0 true, 0/0 < 2 false, 2 >= 0/0 false, 0/0 CMP 2 Unordered", review section 2.4), except at 0/0 against itself (row 440).

The tests that guard the stated values: `ProjectFortress/tests/ComparisonAtNaNWalk.fss` (walk, `RR64`, `RR32`, `QQ`), and the NaN asserts in `ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled.fss` and `NativeHelperFamilyRR32Compiled.fss` (the helpers `doubleLT` to `doubleGE` and `floatLT` to `floatGE`).

## 5. The way back

The review's option (b): the four operators raise `FloatingComparisonError` at a NaN on both paths, and the rational ones `RationalComparisonError` at 1/0 and 0/0. It needs a NaN test in every compiled floating-point comparison helper and in walk's, at the cost above, and the rationals chapter's sentence revised to agree; then this entry's original sentences are restored and the callout removed. Under route C the same (the entry's "Route C" item): the choice does not touch the number types' nesting.
