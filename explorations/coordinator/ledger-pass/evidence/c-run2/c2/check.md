# Check, chunk c2 (rows 318, 453), base c124c6b65

`mech.md`: 2 lines, 0 failing. No closes, duplicates, keeps or pairs. `questions.md` holds no question to measure (its optional prober note is not a disposition).

## Row 318: fail (3)

Holds: the 21 stub bodies at `CompilerBuiltin.fss:896-928` (counted at the base: `|self|`, unary and binary `BOXMINUS` and `DOTMINUS`, `BOXPLUS`, `DOTPLUS`, `DOT`, `BOXDOT`, `CROSS`, `BOXCROSS`, `DOTCROSS`, `DIV`, `BITNOT`, `BITAND`, `BITOR`, `BITXOR`, `MINMAX`, `CHOOSE`, `even`, `odd`); the fixed half at :897, :900, :903, :918 through the `jIntLiteral*` imports of `simpleIntLiteralArith` (:341-344); `NamingCzar.java:343` names `Lfortress/CompilerBuiltin$IntLiteral;`; `IntLiteralArithRung7.test` asserts `PASS` over the four. Status `NEGATIVE-VERIFIED` beside `silent` kept (item 265). Present: no story.

Nothing lost: `NamingCzar.fortressTypeForForeignJavaType`: history (the line `NamingCzar.java:343` kept). `ProjectFortress/library_tests/IntLiteralArithRung7.test`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntLiteralArith.java`: kept, shortened. `opr -(self)`: kept as "unary `-`". `row 19`: FIXED, history. `trait IntLiteral`: kept as `IntLiteral`. Claim's "or `ZZ64`": kept in the workaround.

1. Reproducer. Passage: reproducer `none`; notes "No test runs a stub." Source: brief, a `none` cell needs the command and its output in the notes; none is given. Correction: replace "`even`, `odd`. No test runs a stub." with "`even`, `odd`; `grep -c 'throw Compiler'` there prints 21; no test runs one." (`git show c124c6b65:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss | sed -n 896,928p | grep -c 'throw Compiler'` prints 21.)
2. Cold read, "21 operators". Passage: "`BOXMINUS`, `DOTMINUS` (unary and binary)". Source: :898-899 and :904-905, both `BOXMINUS` and `DOTMINUS` are stubbed unary and binary; the cold reader could not reach 21 from the list. Correction: replace with "`BOXMINUS` and `DOTMINUS` (each unary and binary)".
3. Cold read, Status. Passage: the line gives no fix; the reader takes `NEGATIVE-VERIFIED` as "build a fix in the prelude". Source: POSITIONS P-38 (the compiler prelude's text is not repaired; its defects go with it at the switch-over), P-37 (no declaration is added to it). Correction: replace "Workaround:" with "Fix: the switch-over (P-38). Workaround:". With 1-3 the notes are about 690 characters, under 700; recheck with `mech.py`.

## Row 453: fail (1)

Holds: the six splits `z = lo+hi` under "Danger of overflow here" at `Library/CompilerLibrary.fss:361`, `:375`, `:385`, `:393`, `:402`, `:412`; `#` at `:444` is `lo : (lo+sz-1)`; `:375` is in `countedseqloop`, which `seqloop` (:430) calls; `parloop` (:361) is the parallel form. `XXXSeqMidpointRungO.fss` loops `seq(1073741824:1073741826)` and asserts 3, its `.test` an `XXX` run with `run_out_contains=REACHED`; `XXXSeqHashBoundsRungO.fss` tests `zMin # zero` and `zMax # one`. `floorAverage` at `CompilerBuiltin.fss:746-747` is the `ZZ32` one; `CompilerBuiltin.fsi` declares it for `ZZ`, `ZZ64`, `NN32`, `NN64` only (:143, :204, :324, :383). Status kept. Role "skeptic" removed. No commit since touches the cited lines.

Nothing lost: `:377`, `:387`, `:395`, `:404`, `:414`, `:446`, `Library/CompilerLibrary.fss:363`: false at the base (moved by -2), re-pinned. `row 450`, `row 451`: FIXED rows of their own; history.

1. Fidelity and cold read, Status. Passage: "Fix: the overflow-free `floorAverage` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:746-747`, not exported for `ZZ32`), and `#` as `lo : (lo+(sz-1))` with the empty range built without `lo-1`; or the switch-over." Source: POSITIONS P-38, the compiler prelude's text is not repaired; the cold reader could not tell whether to edit the prelude or wait. Correction: replace with "Fix: the switch-over; the prelude's text is not repaired (P-38). Its overflow-free `floorAverage` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:746-747`) shows a split without `lo+hi`." (notes about 616 characters; the dropped `#` repair has its home in the history, row 453).
