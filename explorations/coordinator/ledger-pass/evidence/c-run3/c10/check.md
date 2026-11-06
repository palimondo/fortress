# Check of c-run3/c10 (base c124c6b65)

`mech.py` rerun: 9 lines, 0 failing; apply and `ledger.py check` (with and without `--base`) exit 0. No closes, duplicates or pairs. Silent: 900, 901, both `defect`, reasons hold (`Library/File.fsi:102`, `:131` against `Library/File.fss:66-94`).

Counts: 5 pass (106, 107, 135, 142, 901), 7 fail (49, 104, 343, 344, 747, 841, 900).

## Row 135 (measure): pass
`20474c144` is in the base's history; the probe's text is at `22ea0cd90^:explorations/run-b2/probes/g1e_bigunion1.fss`; the question is narrow, runs under walk from the main tree, and each of the three outcomes maps to a close or a line.

## Row 900 (rewrite): fail
- Fidelity. Passage: "Fix: extend `WriteStream`, which the review's option (b) does". Source: `explorations/reviews/io-objects-carrier-2026-11-06.md:362` (option (b), point 16): "`FileWriteStream` can extend `WriteStream` ... this changes `File.fsi:102` and is a step the rung may leave out". Option (b) allows the step; it does not take it. Cold read also could not find "the review". Correction: replace "which the review's option (b) does" with "a step that option (b) of `explorations/reviews/io-objects-carrier-2026-11-06.md` (point 16) allows and its rung may leave out".
- Otherwise holds: `File.fsi:102`, `File.fss:66`, `:79` (`write(x:String):() = x.writeOn(self)`), `Stream.fsi:64`; no commit after `c141e7f6a` touches the three files; dropped tokens (`File.fss`, `s.writeOn(self)`, `write(s:String)`) are false (parameter is `x`) or kept with the full path.

## Row 901 (rewrite): pass
`File.fsi:131` `flush():()`; `File.fss:66-94` defines no `flush`; `Stream.fsi:64` `abstract flush():()`. Dropped `tmp/review-rows/flush-out.txt`: scratch path, no home needed.

## Row 344 (rewrite): fail
- Cold read, "the prelude takes no new declaration" uncited, and it decides the status. Source: `.claude/skills/fortress-repo/references/compiler.md:34` ("Do not add a declaration to the three prelude files"). Correction: after "the prelude takes no new declaration" add "(`references/compiler.md`, \"The compiler's prelude, until the switch-over\")".
- Cold read, "the switch-over breaks it" does not say how. Correction: replace "the switch-over breaks it" with "the switch-over brings the library's `shared` into its reach, the clash of row 343".
- Otherwise holds: `FortressLibrary.fsi:45,47,49`, `.fss:65,67,69` at the base; the prelude declares none (`Library/CompilerLibrary.fss:56` is a commented-out `isShared`); `ExportVarRungXApi.fsi:5` is `var shared: ZZ32`; probe at `ab067d9b6^`. Dropped `.fss:65`: kept as the full path.

## Row 747 (measure): fail
- The question's command does not run from the main tree: it asks for an edit of `Library/FortressLibrary.fss:4597` and the count stage "in a seeded worktree, not the main tree"; and its second outcome needs an open bisect over `0856f3e6a` and `2b1cd8e63`, so it is not narrow. Source: `questions.md`, row 747; `references/compiler.md:174` (count stage, about 150 s, on the tree's own library). Correction: drop the question; rewrite row 747 now, status NEGATIVE-BOUNDED kept: the claim names the shape ("the compiled checker typed `fail`'s result-only `T` at its bound `Any` in the `else` of an `if` with a generator clause inside a reduction's body, 'ZZ32->ZZ32 is not applicable to an argument of type Any'"), the notes say the one site, `strToInt`, now writes `fail[\ZZ32\]` (`Library/FortressLibrary.fss:4597`, at c124c6b65) so no stage shows it, that the measure is the count stage on a copy with `fail(` there in a seeded worktree, not run since `0856f3e6a`, and the workaround `fail[\T\]` written; drop "(distance 44 to 43)" (home: history, row 747) and keep "Variable __cond is not defined" with `compiler_tests/XXXIfGeneratorClause.test`.

## Row 49 (rewrite): fail
- Fidelity, claim: "is passed on as an unfinished paste". Source: `Evaluator.java:859-861` at the base calls `paste.finish()` before it returns the `IUOTuple`. Correction: "is passed on as a paste, an `IUOTuple` never built into an array".
- Cold read, "`Array`k`[\T, 0, n0, …\]`" garbled. Source: `Specification/basic/expressions/aggregate.tex:129-131`, `\TYP{Array}k`, the library's `Array1` to `Array3` (:134-135). Correction: "`Arrayk[\T, 0, n0, …, 0, nk-1\]` (`Array1` to `Array3` in the library)".
- Cold read, "Bites `RR64` as hard as a user type." Correction: "`RR64` elements fail as a user type's do."
- Otherwise holds: `LHSEvaluator.java:140-145` (the `else`, the JOIN comment, the error at :145), `Evaluator.java:854-861`; reproducer `XXXArrayLiteralArgRungC.fss` exists and is gated. Dropped citations are the re-pinned ones.

## Row 104 (rewrite): fail
- Cold read, "It swallows even a paste that succeeds with a literal-sized type (row 107; ...)" reads two ways, one against the workaround. Source: `e879b6a44^:explorations/gap-ledger-probes/g19.fss`, `m: Array[\RR64,(ZZ32,ZZ32)\] = [ a b ; a b ]` of 2×2 blocks. Correction: "A 2×2 grid of square blocks, which pastes under a literal-sized type (row 107), binds nothing under `Array[\RR64,(ZZ32,ZZ32)\]` too (probe `explorations/gap-ledger-probes/g19.fss`, in the parent of `e879b6a44`)."
- Otherwise holds: `LHSEvaluator.java:179-203` is the `else` chain (`outerType == null`, `FTypeArray`, `FTypeMatrix`, `FTypeVector`, no final `else`); all three probes exist in the named parents.

## Row 106 (rewrite): pass
`IUOTuple.java:113` (`setLengths`), `:116-122` (fill `-1`), `:199-205` (`extentSums` branch, guard `:201`) hold at the base, unchanged since the row; both probes at `22ea0cd90^`. Dropped `run-b2/probes/g1d_hcat.fss`: kept as the full path.

## Row 107 (keep): pass
`IndexedArrayWrapper.java:54`, `:79` hold the quoted comment; no commit since `ae4f8e38a` touches it; probes at `22ea0cd90^`.

## Row 142 (rewrite): pass
`BuildEnvironments.forVarDecl4` begins at :731; `:780-794` takes the leaf value and raises `Type mismatch binding`, with no array construction; `p08a` to `p08d` exist at `4ebf80aec^`. Dropped message text and printed array: home in the history (`full text: history, row 142`).

## Row 343 (rewrite): fail
- Fidelity, claim: "and neither path reports the static error of two declarations of one name in one namespace". The line's own notes (and row 344) say the compiled prelude has no `shared`, so the compiled path has no clash to report; the old line said so ("the compiled path has no conflict"). Correction: claim "**under walk, a top-level variable exported through an api is undefined when the implicitly imported library declares its name too** (`shared`): walk fails at run time, not with the static error of two declarations of one name in one namespace"; notes: replace "The compiled prelude has no `shared` (row 344)" with "The compiled path has no clash, its prelude declaring no `shared` (row 344)".
- Cold read, the mechanism does not say which environments. Source: `BuildApiEnvironment.java:129` `exporter.getEnvironment().getValueRaw(sname)`, `:132` `bindInto.putValueRaw(sname, fv)`. Correction: "binds the name only when `getValueRaw(sname)` on the exporting component's environment (`:129`) answers a value, which `putValueRaw` copies into the api's environment (`:132`), else adds it to `api.unresolvedExports` (`:135`); which step loses the variable is not traced."
- Otherwise holds: `declarations.tex:426-431` (frozen), `FortressLibrary.fsi:45`; probes `SkKw*.fss` at `ab067d9b6^`. Dropped long path: kept as the short name, the file last changed in the team's `5a68404fd`.

## Row 841 (rewrite): fail
- Cold read, "Home: P-12's step" does not tell a worker whether to fix it now. Source: `POSITIONS.md:12`, P-12 (after the switch-over walk runs the compiled checker; walk not changed for it before). Correction: "Home: P-12: after the switch-over walk runs the compiled checker, whose export check covers this; walk is not changed for it before."
- Cold read, "where the object defines it" reads as a place. Correction: "when the object defines the method".
- Form: Specification cell `basic/components/source-code.tex` lacks the root. Correction: `Specification/basic/components/source-code.tex`, "Export Statements".
- Fidelity, minor: the second output is of the program `WalkOther`, which the line does not name. Source: `rung-abstract-declared/REPORT.md` section 7, table. Correction: "`WalkOther`, the component's `f(): String` against the api's `f(): ZZ32`, prints 'mk().f() = other header', rc 0".
- Otherwise holds: `BuildApiEnvironment.java:48-136` holds the commented-out `missingExported*` checks; `733d73574` is not in the base's history, rightly dropped; `FACTS.md:132` agrees.
