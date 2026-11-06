# Check of c38 (run c-run3, base c124c6b65)

`mech.py` rerun: `MECH: 10 lines, 0 failing, every check passes.` Every cited `file:line` read at `c124c6b65` (`git show c124c6b65:...`; the working tree is at `ba03acb76`); every gone probe confirmed in the parent of the commit its line names. Nothing built or run.

Lengths below are of the corrected line, measured as `mech.md` measures (row / claim / notes).

## Row 5 (rewrite): FAIL
1. Cold read, "the message says prefix SUM, yet `∑` is not `SUM`". The line does not say why the message names `SUM`. Source: `parser_util/precedence_resolver/Operators.java:2082` maps `∑` to the operator name `SUM` (`Literal.rats:401` is the reverse alias). Correction, in Notes, replace `so `∑` is read as a prefix operator.` with `so `∑`, an operator named `SUM` (`ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/Operators.java:2082`), is read as a prefix operator.`
2. Cold read, "which character the specification requires". The Specification cell quotes Greek `Σ`/`Π`; the source is `$\sum$ $|$ $\prod$` (`Specification/basic/expressions/reductions.tex:20`), that is U+2211. Correction, Specification cell: replace `(`Accumulator ::= Σ ∣ Π ∣ BIG (Encloser ∣ Op)`)` with `(`:20`, `Accumulator ::= $\sum$ ∣ $\prod$ ∣ BIG (Encloser ∣ Op)`)`.
Corrected: 894 / 98 / 572. Fidelity otherwise holds: `Symbol.rats:252` is `transient Op SUM = "SUM"`, `:260-261` the `Accumulator` rule with `SUM` first; parser untouched since the row. Nothing lost.

## Row 6 (keep): pass
`concrete-syntax.tex:971-974` holds `FlowExpr`, unchanged since `ae4f8e38a`; no commit touches it; probe `g07.fss` is in the parent of `e879b6a44`.

## Row 81 (rewrite): pass
`CodeGen.java:1675-1676` `defaultCase` throws `sayWhat`; `:1558-1561` builds `"Can't compile " + x`; no `forLabel`/`forExit` in `CodeGen.java`; `forWhile` exists (`:6351`), so the workaround compiles. `p31.fss` in the parent of `c69cb2064` is `label L` round `for i <- seq(1#10)` exiting `with i`, as stated. Dropped "canonical sayWhat; bounds how far codegen gets": an opinion, in the history.

## Row 92 (rewrite, absorbs 168): FAIL
1. Fidelity / nothing lost from row 168. Row 168's notes, and the run's own source (`explorations/run-c3/gaps.md` row 164, in the parent of `a0a0c7c99`: "the component in the reproducer carries the same clash, so the probe shows the rule applies in the api file, not that the api is checked first"), bound the api case. The new line drops that bound, so it claims more than the probe shows. Correction, in Notes, replace `at the api's own line 3, columns 6-8 (` with `at the api's line 3, columns 6-8; its component has the same clash, so the api is not shown checked alone (`.
2. Nothing lost / cold read, "met in which program". The guard's line says "the model's loop variable `step`"; the new line drops "model's". Correction (also pays for item 1's length): replace `Met for the loop variable `step`, and `model` and `rows`.` with `Met by the model program's `step`, `model` and `rows`.`
Corrected: 1142 / 189 / 699. Otherwise holds: `ExprDisambiguator.scala:745-762` is `checkForShadowingVar` (variable or function names in scope), its message at `:761` the only source of `Variable X is already declared.`; `G164.fsi` in the parent of `a0a0c7c99` is `rows(n)` line 2, `area(rows, cols)` line 3. Dropped tokens: `object Adam(epsilon: RR64)`, `c16_model_spellings.fss` (case 7) have their home in the history (row 92) and the spec cell's `:482`; `row 168` is now its duplicate.

## Row 147 (rewrite): FAIL
1. Nothing lost / cold read, "a grep of which api". The guard's line names the file: "grep `Library/FortressLibrary.fsi` for a name before choosing it"; the new "after a grep of the api for the name" loses it (`mech.md` misses it because the path still appears elsewhere in the line). Correction, in Notes, replace `after a grep of the api for the name.` with `after a grep of `Library/FortressLibrary.fsi` for the name.`
Corrected: 1118 / 245 / 663. Otherwise holds: `FortressLibrary.fsi:590` and `:648` are `big(self):ZZ` in `trait ZZ32` (`:536`) and `trait ZZ64` (`:593`); `:1767` is `t(): Matrix[\T,s1,s0\]` in `trait Matrix` (`:1757`); `g29.fss` (parent of `e879b6a44`) is `f(x: ZZ32)` with `big: ZZ32 = 10 x`; `g147_param_t.fss` in the parent of `4ebf80aec`. Dropped: `6:9`, `7:9`, `8:11` (history, row 147), `:580`, `:636` (moved pins), `row 168` (duplicate).

## Row 167 (rewrite): FAIL
1. Fidelity / cold read, "are these static parameters or ordinary ones". "Met twice more by functions named `rows` and `block` against parameters of the same name" counts as this row's case what its source calls row 92's: `explorations/run-c3/gaps.md` row 163 (parent of `a0a0c7c99`) says "a component's `rows`/`block` functions against parameters named `rows`/`block`", and row 164 there (now row 92) says the api clash "cost this run three compile rounds (`rows`, `block`, `blk`)". Correction, in Notes, replace `Met twice more by functions named `rows` and `block` against parameters of the same name.` with `The run's `rows` and `block` clashes, functions against parameters of those names, are row 92's (`explorations/run-c3/gaps.md`, row 163, in the parent of `a0a0c7c99`).`
Corrected: 1135 / 233 / 691. Otherwise holds: `:761` is the message; probe in the parent of `a0a0c7c99`. Dropped `att_g_staticname.fss:6:38: ...`: the same facts stay in the line ("reported at 6:38"); `row 168` is a duplicate.

## Row 168 (duplicate of 92): pass, with row 92's correction 1
Both state one check (`checkForShadowingVar`), on one path (the shared disambiguator); 168's message, probe and commit are in 92's new line. Its bound (the component carries the same clash) is lost unless row 92's correction 1 is made.

## Row 322 (rewrite): FAIL
1. Cold read, "`compiler.md` lists `atomic` used as an expression as a wall". The row's case is the block form that `forAtomicBlock` compiles (`CodeGen.java:1736-1764`; the probe `SK13LocalArmAtomic.fss`, parent of `ab067d9b6`, writes `atomic do g := g + 1 end`), not the wall's `atomic e`. Correction, Claim: replace `` `atomic` as the trailing expression`` with `an `atomic do … end` block as the trailing expression`.
2. Cold read, "with row 497: relation not said". `XXXTryInArmRungG.fss:21` asserts "rows 322 and 497": one test meets both defects. Correction, in Notes, replace `(`XXXTryInArmRungG`, with row 497)` with `(`compiler_tests/XXXTryInArmRungG`, which also meets row 497)`.
Corrected: 1104 / 200 / 686. Otherwise holds: `:5028-5036` is `ALOAD this; DUP; setTask; x.accept; PUTFIELD`, `:1736-1764` `forAtomicBlock`, `startOver` at `:1744`, handler `POP` and `GOTO startOver` at `:1754`, `:1760`. Workaround: `AtomicTopLevelVar.fss` puts `atomic` in `bump()`, called from both arms, and is not `XXX`. Dropped: `SK13LocalArmAtomic.fss`, `SK7TaskNest.fss` (history row 322 names them and their folder), moved pins.

## Row 324 (rewrite): FAIL
1. Cold read, "derived from code, not measured contradicts the measured values". The guard's history line says the values are measured and the mechanism derived. Correction, in Notes, replace `Derived from code, not measured:` with `The mechanism, by reading, not measured:`
2. Fidelity. "Workaround: throw after the block" leaves the block committed with its writes, the very result the row calls wrong (`atomic.tex`: writes are discarded on a throw). Correction, in Notes, replace `Workaround: throw after the block.` with `Workaround: throw before the block.`
Corrected: 1070 / 224 / 699. Otherwise holds: `CodeGen.java:1742-1745` registers one handler, for `TransactionAbortException`; `runtimeSystem/Transaction.java:144-149` `AncestrialWrite`, `:159-168` `TXRead` returns it; `runtimeSystem/BaseTask.java:83-86` child takes `parent.transaction`. Dropped probe names (`SK29…`, `SQ6…`, `SQ7…`): history row 324 names them and their folder; bare `Transaction.java`/`BaseTask.java` replaced by full run-time paths.

## Row 497 (keep): pass
Written by `d96242f0a` (2026-11-05); `CodeGen.java:5014` is `generateTaskCompute`, unchanged since; no `reserveSlot0` in it (`:5014-5038`); `XXXTaskArmLocalSlot.test`, `TaskArmLocalSlotLink.test`, `LocalFunctionGenericContextCompiled.test` exist; FACTS line 190 agrees.

## Row 526 (rewrite): pass
`CodeGen.java:2022` is `forTry`, its handler label `l2` emitted inline; `XXXTryOperandRungE.test` and `TryOperandRungELink.test` exist. Dropped "Row 322's fix … does not reach it" (no such fix has landed) and the repair design: history row 526. `forAtomicBlock`, `generateTaskCompute` tokens belonged to that sentence.

## Row 876 (rewrite, CONTESTED kept): pass
`DeterministicRandom.java:52-56`, `runtimeSystem/BaseTask.java:108-111` (`makeNewRandom`), `:146-177` (`joinOrRun` restores only round `join()`), `:57-61` (pedigree comment), `CodeGen.java:5028-5033` (`setTask`, never restored) all hold at `c124c6b65`. Status kept, question unsettled.

## Closes, questions, pairs
- No closes. Questions: none to measure; the three `XXX` tests stand by reading (`generateTaskCompute`, `forTry` unchanged). Pairs: none; agreed (147's overlaps 349, 859 share a library line only; 526's 340 another defect). No `NEGATIVE-VERIFIED` row beside `silent`.

Counts: pass 6 (6, 81, 168, 497, 526, 876), fail 6 (5, 92, 147, 167, 322, 324).
