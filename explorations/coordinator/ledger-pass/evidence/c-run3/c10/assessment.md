# c10 assessment (c-run3, base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. Beyond the evidence files I read: the cited Java at the base (`LHSEvaluator.java`, `Evaluator.java:845-862`, `BuildEnvironments.java:731-795`, `BuildApiEnvironment.java:40-50`), `Library/File.fsi:95-135`, `Library/File.fss:60-95`, `Library/Stream.fsi:32-70`, `Library/Map.fss:190-201`, `Library/FortressLibrary.fss:4585-4612`, `compiler_tests/ExportVarRungXApi.fsi`, `git show --stat 20474c144`, the old probes of row 135 from `22ea0cd90^`, `rung-integer-power/REPORT.md` section 8, `rung-abstract-declared/REPORT.md` section 7 headings, and the deletion commits of the gone probes.

## 135: measure
- scope pass; present meaning FAIL: commit `20474c144` (walk instantiates an unwritten big operator by its value's declared type, else its elements' join) postdates the row, and the row's failing probe declares `b: Map[\String,ZZ32\]`; no run since; evidence FAIL: probes gone, no run; comprehension pass; ownership pass; consistency: "The library's eleven clause-form sums write theirs (... `d846e3644`)" is a repair note.
- Question in `questions.md`. Whatever the outcome, the d846e3644 sentence goes (home: history, row 135).

## 900: rewrite
- all pass but consistency: it does not name row 901, though the fix it names (extend `WriteStream`) asks for `abstract flush()` (`Stream.fsi:64`), the method row 901 says is missing. Also "`write(s:String)`'s `s.writeOn(self)` (`File.fss:79`)": the component's parameter is `x` and `File.fss` is ambiguous (BirdyLib). New line: `siblings: 901`, the full path, `x`, and the flush link. Nothing dropped.
- silent: `defect` (silent.txt).

## 901: rewrite
- consistency: does not name 900; reproducer text names `tmp/review-rows/flush-out.txt`, an untracked path the check reads as gone. New line: `siblings: 841, 900`, the `Stream.fsi:64` link, the file name `out`, with no path or extension. Dropped: the tmp path (a scratch output, no worker needs it).
- silent: `defect`.

## 344: rewrite
- evidence: "(bodies `.fss:65`, `:67`, `:69`)" reads as `FortressLibrary.fsi:67`, `:69` (the evidence shows those as a comment and `opr =`); consistency: "Row 343 is the interpreter's half" is a sibling not in `siblings:`; "closing this row breaks it" names a repair the prelude rule forbids (compiler.md: no new declaration in the three prelude files), so the route is the switch-over. Checked: no `shared`, `isShared` or `localize` in `CompilerLibrary.fs?`, `CompilerAlgebra.fs?`, `CompilerBuiltin.fs?`; `ExportVarRungXApi.fsi:5` is `var shared: ZZ32`. Nothing dropped; probe's old path given with its deletion commit `ab067d9b6`.

## 747: measure
- present meaning FAIL: the claim's site is gone: "`strToInt` writes `fail[\ZZ32\]`, its site gone; the gap stays" (`FortressLibrary.fss:4597`), so the claim names a fixed site; evidence FAIL: the reproducer is a report, not a program, and nothing in the tree shows the message now; consistency: siblings 560, 642, 438 all FIXED; "(distance 44 to 43)" is a stale count. Only a run on an edited copy can say whether the checker still drops the expected type there. Question in `questions.md`.

## 49: rewrite
- evidence: `Evaluator.java:725-733` now holds `unwrittenAtTail`; `forArrayElements` and its `IUOTuple` are at `:854-861`; `LHSEvaluator.java:139-145` shifted by one, to `:140-145`. Reproducer: `XXXArrayLiteralArgRungC` ran green as expected failure in gate `a12ab5c60`, which holds for the base. New line re-pins both, `at c124c6b65`. Nothing dropped.

## 104: rewrite
- evidence: `LHSEvaluator.java:178-202` shifted by one (`369982d85`), now `:179-203`; `g19.fss` given with no route to its text (deleted by `e879b6a44`); `c02e_pasting_variants.fss` likewise (`ed6dafb52`). New line re-pins and gives each probe its parent commit. Nothing dropped.

## 106: rewrite
- evidence: `run-b2/probes/g1d_hcat.fss` is not a path from the root and has no parent commit. New line: the full path beside `g1d_paste1.fss` in the parent of `22ea0cd90`, the pin `at c124c6b65` (lines unchanged since the row was written). Dropped: "is a paste and" (the claim's own word "paste" carries it) and "to hold matrices" shortened to "for matrices".

## 107: keep
- All six pass: `IndexedArrayWrapper.java:54` and `:79` still hold the quoted comment; the lines are unchanged since the row was written; both probes' old paths are given with `22ea0cd90`; sibling 106 named; the claim states only the failing half and the working square case as its contrast.

## 142: rewrite
- comprehension FAIL: "At top level the literal never reaches array construction" has no pinned mechanism. Read at the base: `BuildEnvironments.forVarDecl4` checks the evaluated value against the declared type and raises `Type mismatch binding` (`BuildEnvironments.java:780-794`); no step there builds an array from `ft`, as `LHSEvaluator.forLValue` does in a body (row 49). Only `p08a`'s path was given. New line adds the pin and the probes' range. Dropped, home the history (row 142's old line whole): `p08d`'s printed array `[0#9][ 27 16 27 16 16 16 16 64 16 ] shp[7] = 64` (now "prints the array"), and the full tuple in `p08a`'s message (abbreviated `(27,16,…)`, as the claim does).

## 343: rewrite
- consistency: the compiled half it names ("The compiled prelude has no `shared`") is row 344, not in `siblings:`; the mechanism carries no pin. `BuildApiEnvironment.java` last changed in the team's `5a68404fd`, so the lines hold. New line: `siblings: 344`, the pin, "(row 344)". Dropped: "works" in the workaround sentence.

## 841: rewrite
- evidence FAIL: the pin `733d73574` is not in the base's history (its landed form is `cc47b637d`; the file itself last changed in the team's `5a68404fd`), and `WalkAbsent.fss` is no path at all. New line pins `at c124c6b65` and names the program `WalkAbsent` in `explorations/compile-ladder/rung-abstract-declared/REPORT.md`, section 7. FACTS.md:132 ("Walk compares no component with its apis (row 841)") agrees. Nothing dropped.

## Pairs and duplicates
- None. 343/344 are two defects (walk's export collision; the prelude's missing functions), now siblings. 900/901 two defects of one object, now siblings. 49/104/142 and 106/107 already name each other. 135's overlap with row 20 (another chunk) is a different defect (list display types), so no pair.
