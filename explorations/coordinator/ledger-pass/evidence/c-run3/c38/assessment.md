# c38 assessment (run c-run3, base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. Beyond the evidence files I read: `parser/Symbol.rats:248-266`, `Literal.rats:401`; `CodeGen.java:1555-1576`, `:1670-1676`, `:1736-1764`, `:5014-5038`, `grep forLabel|forExit|forTry`; `ExprDisambiguator.scala:740-812`; `runtimeSystem/Transaction.java:140-170`, `BaseTask.java:55-62,78-90,144-178`; `Library/FortressLibrary.fsi:590,648,1747,1767`; `compiler_tests/XXXTryInArmRungG.fss`, `XXXTaskArmLocalSlot.test`, `XXXTryOperandRungE.test`, `AtomicTopLevelVar.fss`; FACTS F-134; `git log --diff-filter=D` for the gone probes. Nothing was built or run.

## Row 5: rewrite
- scope pass; present meaning pass (parser untouched since the row: `git log ae4f8e38a..c124c6b65 -- parser/` empty); evidence pass (probe's old path given); comprehension FAIL: no mechanism, no pinned line; ownership pass; consistency pass.
- Change: mechanism added, `Symbol.rats:252`, `:260-261` (the `Accumulator` rule takes the ASCII keyword `SUM` only); workaround stated. Nothing dropped.

## Row 6: keep
- All pass: the grammar lines hold and are unchanged; the workaround and the probe's old path are in the notes; the mechanism is the grammar itself (`FlowExpr`), a design limit the spec cell pins.

## Row 81: rewrite
- comprehension FAIL: "The canonical `sayWhat`; bounds how far codegen gets" is a judgement, not a mechanism; evidence FAIL: "Probe `explorations/compiler-probes/p31.fss`, gone" names no commit to read it from.
- Change: mechanism `CodeGen.java:1674-1676` (`defaultCase` throws `sayWhat`, `:1558-1561`; no `forLabel`/`forExit` in `codegen/`); probe read from the parent of `c69cb2064`, its shape stated; workaround added. Dropped: the "canonical / bounds" sentence (an opinion; history keeps it).

## Row 92: rewrite (absorbs row 168)
- comprehension FAIL: no mechanism; consistency: names sibling 168, which states this row's rule at an api parameter (168's own claim: "row 92's rule holds inside api files too").
- Change: mechanism `ExprDisambiguator.scala:745-762` (`checkForShadowingVar`); the api case from row 168 with its message and probe; siblings now 147, 167. Dropped: the field-shadowing example (`object Adam(epsilon: RR64)`, case 7 of `explorations/run-b/probes/c16_model_spellings.fss`): home, the history (row 92's old line) and the spec cell's `:482`.

## Row 147: rewrite
- present meaning FAIL: `Library/FortressLibrary.fsi:580`, `:636` no longer hold `big(self):ZZ` (now `:590`, `:648`); comprehension: mechanism only by reference to row 92.
- Change: pins moved; `t()` pinned at `FortressLibrary.fsi:1767`; check pinned; sibling 168 removed (now a duplicate of 92). Dropped: the probe's three positions (`6:9`, `7:9`, `8:11`): home, history row 147.

## Row 167: rewrite
- comprehension FAIL: no pinned mechanism; consistency: sibling 168 becomes a duplicate.
- Change: the message's site `ExprDisambiguator.scala:761`; siblings 92, 147. Nothing dropped.

## Row 168: duplicate of 92
- scope FAIL: its claim is row 92's rule ("row 92's rule holds inside api files too"), the same check at one more site, on the same path, and its notes say the probe cannot show the api is checked apart from the component. Its facts (message `G164.fsi:3:6-8: Variable rows is already declared.`, probe path and commit) are written into row 92's new line, so `dups.txt` adds no text. Its workaround ("name a parameter so that no function of the component, its api or its imports has that name") is folded into 92's "rename"; the full sentence stays in the history.

## Row 322: rewrite
- present meaning FAIL: `CodeGen.java:4753-4761` now points at an `asmName` override; the code is at `:5028-5036`; `forAtomicBlock` at `:1736-1764`, not `:1733-1761`. evidence FAIL: `SK13LocalArmAtomic.fss`, `SK7TaskNest.fss` cited bare, gone (unexplained).
- Change: pins moved; the bare probe names replaced by "probes and full text: history, row 322" (they were under `explorations/compile-ladder/repair-r1-atomic-static/probes/skeptic/`, deleted by `ab067d9b6`); workaround added (an `atomic` in a called function, as `compiler_tests/AtomicTopLevelVar.fss`).

## Row 324: rewrite
- evidence FAIL: `SK29ThrowLocalAsString.fss`, `SQ7ObjThrow.fss`, `SQ6OrphanTx.fss` bare and gone; `Transaction.java`, `BaseTask.java` ambiguous (walk's and the run time's); `CodeGen.java:1739-1742` shifted by 3.
- Change: full run-time paths (lines hold: `Transaction.java:144-149,159-168`, `BaseTask.java:83-86`); `CodeGen.java:1742-1745`; workaround added; probes to the history (same folder, parent of `ab067d9b6`). Status stays: the mechanism is by reading, the wrong value was measured.

## Row 497: keep
- All pass: written 2026-11-05; pin `CodeGen.java:5014` holds and is unchanged; `XXXTaskArmLocalSlot.test` is the reproducer; FACTS F-134 agrees ("rows 497, 322").

## Row 526: rewrite
- present meaning FAIL: "Row 322's fix, in `forAtomicBlock` and `generateTaskCompute`, does not reach it" speaks of a fix that has not landed (row 322 is open); `forTry` is at `:2022`, not `:2019`. comprehension: "Fix: save the operand stack to locals…" is a repair design.
- Change: pin moved; full path; the two sentences dropped (home: history row 526); link test named.

## Row 876: rewrite (status CONTESTED kept)
- present meaning FAIL: `CodeGen.java:4753-4757` (pin `1f5c49b4f`) moved to `:5028-5033`; `BaseTask.java` twice bare and ambiguous.
- Change: pins to the base (`c124c6b65`), full run-time paths. Its question is not settled, so it is not closed.

## Pairs and silent
- No cross-chunk pair: 147's overlaps 349 and 859 share only a line of `FortressLibrary.fsi`; 526's overlap 340 another defect.
- No `NEGATIVE-VERIFIED` row beside `silent` (876 is CONTESTED).

## mech.py
- Last line: `MECH: 10 lines, 0 failing, every check passes.` The tokens it lists as lost are moved pins, full paths in place of bare names, the probes moved to the history (322, 324), the field example and row 168 (row 92, above), and the probe positions (row 147, history).
