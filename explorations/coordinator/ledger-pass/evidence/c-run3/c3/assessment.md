# Assessment, chunk c3 (base c124c6b65)

## Row 94 (NEGATIVE-VERIFIED): `pi` not in the default library

- scope: pass. One defect: the spec's `pi` (`literals.tex`, "Pi", heading at :231; `RationalValueTimesPi` at :238) has no default binding.
- present meaning: pass. No commit since ae4f8e38a touches `Library/Constants.fss`; `Constants.fss:15` still reads `pi : FloatLiteral = 3.141592653589793`. A grep of `Library/` and `ProjectFortress/LibraryBuiltin/` finds `pi` declared only in `Constants.fss`/`.fsi`, so neither walk's library nor the compiler's prelude binds it.
- evidence: pass. Reproducer `none`; the notes give the outputs and the probes' old paths "in the parent of ed6dafb52", the form the template allows. path-gone signals are all probe-explained.
- comprehension: pass. The notes hold the workaround with a pinned line and its output.
- ownership: pass. Status and class follow the template; spec cell is a section heading, not `silent`.
- consistency: pass. No FACTS or POSITIONS line names row 94.
- Disposition: keep.
- Beyond the evidence: grep of the library and prelude for `pi`/`π`; headings of `literals.tex`; `git log ae4f8e38a..c124c6b65` over `FortressLibrary.fss`/`.fsi` and the parser (no commit adds `pi`).

## Row 95 (NEGATIVE-VERIFIED): `∞` not implemented

- scope: pass. Sibling of 94, named in `siblings:`; row 7 cited only for why all-caps words are operator words.
- present meaning: pass. `Constants.fss:17` unchanged: `infinity : RR64 = 1.0 / 0.0`. No `∞`, `INFINITY` or `INF` declared in `Library/*.fss|fsi` or the prelude (only comments in `SkipList.fss:668,678`).
- evidence: pass. Reproducer `none` with outputs and the probes' old paths "in the parent of 22ea0cd90".
- comprehension: pass.
- ownership: pass. Spec cell `literals.tex`, "Infinity and Zero" (heading at :243).
- consistency: pass. No FACTS or POSITIONS line names it.
- Disposition: keep.
- Beyond the evidence: as for row 94.

## Row 863 (CONTESTED): float division by zero, NaN in the spec vs infinity in both paths

- scope: pass. One question, which clause of `opr-overview.tex` governs.
- present meaning: pass. 3eabf8435 changed the file (the comparison sentences, row 672), but :157-158 (overflow gives an infinity) and :167-168 (division by zero produces a NaN) read as the row quotes. `simpleDoubleArith.java:36-38` is still `return a / b;`; walk's Float binds it at `FortressBuiltin.fss:115`, and the compiled `RR64` at `CompilerBuiltin.fss:947` through `jDoubleDiv` (:206). `Constants.fss:17` unchanged since a874948ac (only line 16, `e`, changed); `realArith.fss:78` still asserts `infinity.isInfinite`.
- evidence: pass. `realArith.fss` is a gated walk test and the newest gate a12ab5c60 holds for the base; the compiled half rests on the binding cited.
- comprehension: pass. Mechanism with pinned lines; 0/0 noted as NaN on either reading.
- ownership: pass. CONTESTED with the reason ("Which clause governs is open"); no POSITIONS entry settles it (grep of POSITIONS for 863 and "division by zero": none), so it stays open and is not closed.
- consistency: pass. No FACTS or POSITIONS line names row 863. Overlap with row 792 (integer `throws IntegerDivisionByZero`, outside this run) is a different defect: not a pair.
- Disposition: keep.
- Beyond the evidence: `opr-overview.tex:150-170`; `git show 3eabf8435 --stat`; `Constants.fss` at a874948ac and at the base; `realArith.fss:70-80`; grep of the libraries for `doubleDiv`.
