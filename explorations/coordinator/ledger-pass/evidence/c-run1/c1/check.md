# Check of chunk c1, run c-run1, base c124c6b65

`mech.py`: "MECH: 4 lines, 0 failing, every check passes." Form passes for 188, 283, 866 and 698.

## Row 188 (rewrite to RETIRED): FAIL, 1

Fidelity holds: `Library/FortressLibrary.fsi:382` is `truncate(self):ZZ64` inside `trait RR64` (`:298`); `git show 1ee3b0bc5^:explorations/apl/v1-probes/p01_numfmt.fss` writes `v.truncate()` (`:18`) and `v.truncate().narrow()` (`:19`), and its `.out` beside it ends 'Cannot find definition for method truncate given receiver 7.0'; `0ff5eae27~1:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:188` defines `truncate(self):ZZ64`; `rung-export-last/REPORT.md` section 6 prints 'truncate 7.0 7 ZZ64'; `NativeHelperFamilyFloatWalk.fss:240` asserts `truncate(a)` on `a: RR64`. `Specification/basic/traits.tex:424` "Method Declarations", `:607-617`, and `function-calls.tex:21-34` make a functional method a naked invocation. Dropped tokens: the `narrow` half and `p01c_numfmt.fss` are row 283's (the probe is at `1ee3b0bc5^:explorations/apl/v1-probes/p01c_numfmt.fss`); `0ff5eae27~1`, `explorations/apl/v1/base`, `:332`: the history. Present, reproducer `none` with the commands in the notes, cold read: pass. The status change is sound: item 265 (`review-queue.md:19`, :661) asks which status a *defect* takes where the specification is silent; this line withdraws a falsified claim and the spec cell is no longer `silent`, so the item-265 keep does not bind it.

- Failure: `silent.txt` lists `188	choice`. The new line is beside no `silent` cell and records no choice: it is RETIRED. The design applies the curator's item-265 answer by script from these records (`ledger-pass-design-2026-11-06.md:36`, `:233`), so a "choice" entry could later turn this RETIRED row into `POSITIVE-VERIFIED`. Correction: delete the line `188	choice` from `silent.txt` (the row leaves item 265's set because its spec cell changes to `basic/traits.tex`, "Method Declarations").

## Row 283 (rewrite to RETIRED): FAIL, 3

Fidelity holds otherwise: `Library/FortressLibrary.fsi:645` is `narrow(self):ZZ32` in `trait ZZ64` (`:593`), `:379` is `opr |\self/| : ZZ64` in `trait RR64`; `git show 7c3218956^:explorations/apl-probes/d21_narrow.fss:7,9` writes `f: ZZ = |\ v /|` and `f.narrow()`; `NativeHelperFamilyIntegersWalk.fss:71` asserts `narrow(s7)` on `s7: ZZ64` (`:20`). Dropped tokens: the `while` workaround and "row 281": history (no longer needed); `old-fortress.sh`: in `rung-export-last/REPORT.md` section 6, which the line cites; `fsi:529`, `fss:762`, `:415`, `narrow(self): ZZ32`, `opr \|\self/\| : ZZ`: stale, history.

- Failure 1 (silent rule record): `silent.txt` lists `283	choice`; as row 188. Correction: delete the line `283	choice` from `silent.txt`.
- Failure 2 (fidelity): "At 64386618b, under walk `narrow` of the floor bracket of 7.5 is the `ZZ32` 7 (`...REPORT.md`, section 6)": section 6 prints 'narrow floor-bracket 7 ZZ32' and names no input; 7.5 appears nowhere in the rung's report (the skeptic's `SKEPTIC.md:78` prints 'narrow floorb = 9 : ZZ32' on another input). Correction: replace "`narrow` of the floor bracket of 7.5 is the `ZZ32` 7" with "`narrow` of a floor bracket prints 'narrow floor-bracket 7 ZZ32'".
- Failure 3 (cold read): the reader could not resolve "the floor bracket" (never spelled) nor what `f` is in the claim's "`narrow(f)`"; a worker reproducing it must write the operator. Correction: in the claim, replace "`narrow(f)`" with "`narrow(f)` on `f = |\ v /|`"; in the notes, replace "and `RR64`'s floor bracket answers `ZZ64` (`:379`)" with "and `RR64`'s floor bracket `|\ v /|` answers `ZZ64` (`:379`)". (Claim 232 and notes 642 have the room.)

## Row 442 (keep): PASS

`CompilerBuiltin.fsi:433-435` and `:147-149` hold their words and are unchanged since `ae4f8e38a`; `5ad4a9957` touches `Library/FortressLibrary.fsi` and `FortressBuiltin.fsi`, not the prelude; `74b28e9d4` the one library's arrays. The refused batch-21 note (`expTest.fss`, 'Variable asFloat is not defined.') is covered by the claim's `asRR64`/`asFloat` gap as the writer says. FACTS:194, :254 and POSITIONS:77-78 agree. No change hidden.

## Row 866 (rewrite): FAIL, 1

Fidelity holds: `CompilerBuiltin.fsi:210` is `trait ZZ32 ... excludes { ZZ64, RR32, RR64 }` with no `comprises`; `FZZ32.java:14` is `public final class FZZ32 extends ...DefaultTraitMethods`, unchanged since `5a68404fd`; `d1228e1f0` is not an ancestor of the base, so the pin to `c124c6b65` is right; `FortressLibrary.fsi:536-538` holds `comprises { Int }`; `XXXObjectExtendsZZ32Compiled.test` (`run`, `run_out_contains=REACHED`) and `ObjectExtendsZZ32CompiledLink.test` exist. Nothing dropped.

- Failure (cold read, a worker stumbles): "Fix: refuse the extender." conflicts with sibling 698's "Ends at the switch-over; the prelude takes no new declaration", for the one cause; the reader could not tell whether to build a checker fix now. The row's own "so the checker takes the extender" and `TypeHierarchyChecker.scala:61` (`checkDeclComprises`, which refuses an extender outside a trait's `comprises`, `:263-267`) show that the checker refuses it once it reads the one library's `comprises { Int }`. The reader also could not tell what "the line" is. Correction (net length about -1, row at 1199): replace "Fix: refuse the extender." with "Ends at the switch-over, when the checker reads the one library's `comprises`."; delete ", and the specification makes `ZZ32` the 32-bit integers" (the spec cell holds it); replace "the run prints the line before `MyNum`'s first use" with "the run prints 'REACHED' before `MyNum`'s first use".

## Row 698 (rewrite): PASS

`CompilerBuiltin.fsi:210`, `FortressLibrary.fsi:536-538` and `FortressBuiltin.fsi:125` (`value object Int extends ZZ32`) hold; `XXXOverloadZZ32BesideUserTrait.test` is `compile` with `compile_err_contains=Invalid overloading of add`, so it is the reproducer; `ProjectFortress/tests/OverloadZZ32BesideUserTraitWalk.fss` exists. Dropped tokens: `:531-533` stale (history); the two test paths kept in full. The spec cell "Incompatibility Rule" is right: it is the rule that a `comprises` would satisfy (`overloading.tex:210`, `:262`). The cold read's "the talk's slide 2 set" resolves in the cited `popl2019-examples.md:12` ("the talk's opening `add` set ... (slide 2)"). With 866 corrected as above, the two rows agree.

## Row 772 (measure): PASS

The question is narrow (one value since `1bc0a9083`, which bounds an unbounded type parameter by `Any` under `fortress compile`); the command runs from the main tree (`cd tmp/probe772`, `../../bin/fortress`); each outcome maps to a keep, a rewrite or a close. The reproducer cell naming a report is a real defect the writer names, and the rung-W sentence's fact is in the claim and `TraitGenericMethodInference.fss`. The 442 sibling waiting on room is sound.

## Pairs: PASS

442 and 349: 442's "`narrow` on `ZZ`" is 349's defect (the prelude's `trait ZZ` declares no `narrow`); they share a half.

## Counts

3 pass (442, 698, 772), 3 fail (188, 283, 866).
