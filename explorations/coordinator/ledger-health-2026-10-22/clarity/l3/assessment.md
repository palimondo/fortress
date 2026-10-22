# Chunk l3: assessment

Rows 441, 457, 463, 465, 470, 495, 510, 511, 514, 523, 533, 537 of `explorations/fortress-gap-ledger.md`, read at `d4d454f9d`. P = pass, F = fail, U = unresolved. Checks: Sc scope, Pr present meaning, Ev evidence, Co comprehension, Ow ownership, Cn consistency. Nothing was built or run. Every claim about the tree comes from reading it and its history. All twelve rows are in `flagged-rows.tsv`.

Counts: rewrite 11 (441, 457, 463, 465, 470, 495, 510, 511, 514, 523, 537); investigate 1 (533); close 0; keep 0. The new lines are in `rows.rewrite`; `ledger.py check --rows rows.rewrite` reports "11 rows, 0 fail the template".

## 441: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| F | F | F | P | F | F |

- Sc, Pr: "a negative power of an integer has no specified result, and the paths differ: on `ZZ32` `2^(-1)` is `0.5` (an `RR64`) under walk ... `0^(-1)` is `Infinity` under walk". P-153 decided the contract, the specification now gives it (`Specification/basic-lib/basic-integers.tex:534-537`), and walk follows it (`Int.java:220-229` calls `negativePow`; `tests/IntegerPowerContractWalk.fss`, commit `5ad4a9957`). The claim keeps a fixed half; only the compiled half stands.
- Ev: reproducer `none`, though `compiler_tests/XXXIntegerPowerContractCompiled.test` (with `IntegerPowerContractCompiledLink.test`) asserts the contract on the compiled path. Spec cell `silent` and class `design limit (specification)` are past: the text settles it. Notes: "By reading, `NN32$Pow`'s negative branch sign-extends (`NN32.java:232`)": `:232` now calls `UnsignedLong.negativePow`.
- Ow: "The curator chooses a rational, a throw, or `RR64`": the choice is made (P-153).
- Cn: F-263 and P-153 name row 441 as the compiled half only; Appendix I (`changes.tex:943`) does too. The batch-20 refused note (`climb-batch-20/RECORD.md:131`) holds and is folded in: the contract and its compiled test.
- Change: the claim becomes the compiled `ZZ32` power at a negative exponent (`2^(-1)` gives 0, `0^(-1)` a raw `RuntimeException`); spec `basic-integers.tex`, "Integers"; class `implementation gap (runtime)`, the class of siblings 523 to 525; reproducer the `XXX` test; notes give the binding (`CompilerBuiltin.fss:744`, `simpleIntArith.java:400-406`), why the unbound `intToIntPower` is not the contract either (`:380-398`; `perf-probes/integer-power/REPORT.md` §7), and the float-base workaround.
- Evidence read: `ledger.py show 441`; P-153, F-263; `compile-ladder/rung-integer-power/REPORT.md` (lines 159-195, 281-290); `perf-probes/integer-power/REPORT.md` §7; `CompilerBuiltin.fss:75`, `:744`; `simpleIntArith.java:380-406`; `Int.java`, `NN32.java` `Pow`; `Specification/basic-lib/basic-integers.tex:315-323`, `:528-542`; `git show --stat 5ad4a9957`; `refused-notes.tsv`; `signals.tsv`.

## 457: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| F | P | P | P | P | P |

- The defect stands: `Library/FortressLibrary.fss:138` is still `opr LEXICO(self, other:Comparison): Comparison = Unordered`, `TotalComparison` declares `LEXICO` only at `TotalComparison` and at thunks (`:177-179`), and `XXXLexicoUnorderedRungH` is unchanged since `dc0eee2fe`. The prelude's body is unchanged (`CompilerBuiltin.fss:1494-1497`).
- Sc (minor): the claim and notes do not bound the defect to the strict form. "Only `Comparison.LEXICO(self, other:Comparison) = Unordered` applies" stands beside the library's lazy `LEXICO(self, other:()->Comparison) = Unordered` (`:139`). A reader takes the lazy `LEXICO:` as covered, but it follows the table (`TotalComparison`'s `:179`, `EqualTo`'s `:214`; `tests/ComparisonLazyLexico.fss`). The batch-13 refused note (`climb-batch-13/RECORD.md:174`) says so. The row is at 1,191 characters, so it has no room for a note. A rewrite is the only way to fold that note in.
- Change: notes re-pinned at `d4d454f9d`, the lazy form's verdict and the workaround (`LEXICO:`) added, the probe-output path cut (the `XXX` test is the reproducer). Claim, status, spec and reproducer are unchanged.
- Evidence read: `ledger.py show 457`; `FortressLibrary.fss:100-215`; `CompilerBuiltin.fss:1474-1545`; `tests/XXXLexicoUnorderedRungH.fss`, `ComparisonLazyLexico.fss`, `TupleOrderBounds.fss`; `climb-batch-13/RECORD.md:174`; `signals.tsv` (pinned-file-changed: the pinned line is unchanged).

## 463: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | F | F | P | F | F |

- The defect stands. No compiled library declares `__cond` or `__whileCond` (grep of `Library/CompilerLibrary.fs*`, `ProjectFortress/LibraryBuiltin/`). The interpreter's library declares both (`Library/FortressLibrary.fss:1269-1273`). `PreTypeCheckDesugaringVisitor.java` is the team's (`git log`: `5a68404fd`).
- Ev: reproducer `none`, though `compiler_tests/XXXIfGeneratorClause.test` and `XXXWhileGeneratorClause.test` pin both refusals.
- Pr: "An `XXX` compiled test can hold both, the compiler library declaring `Maybe` and `Just`" and "Probe `SkMaybe.fss`, gone": the tests exist.
- Ow, Cn: text after the marker, "full text: history, row 463 Expected failures since climb batch 11 rung C: ...", contradicts the reproducer cell.
- The batch-11 condensed note (`climb-batch-11/RECORD.md:145`) holds and is folded in: the tests, and the refusal going once `__cond` is declared in the program.
- Change: reproducer `XXXIfGeneratorClause.test`; the `while` test is named in the notes; the walk declarations are pinned; the notes are reordered before the marker.
- Evidence read: `ledger.py show 463`; `PreTypeCheckDesugaringVisitor.java:240-320`; both `XXX` tests and their `.fss`; `FortressLibrary.fss:1269-1273`; `climb-batch-11/RECORD.md:145`.

## 465: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | F | F | P | F | F |

- Pr, Ev: "`array3[\ZZ32,2,2,2\](5)` runs, though the api declares only `array3()`": the api declares `array3[\T, nat s0, nat s1, nat s2\](v:T)` (`Library/FortressLibrary.fsi:1868`, added in `e487cec2d`). The example no longer reproduces the claim.
- Ow, Cn: text after the marker, "Batch 20: api has array3(v).", contradicts the claim. "Exporting `array3(v)` ... would make the call legal" is past.
- The defect stands through another case, from the batch-20 refused note (`climb-batch-20/RECORD.md:135`) and `rung-array-sites/SKEPTIC.md:66`. The component's `Array2` declares `opr[_:TrivialOpenRange, i1:ZZ32]` and `opr[i0:ZZ32, _:TrivialOpenRange]` (`FortressLibrary.fss:2707`, `:2711`). The api's `Array2` (`FortressLibrary.fsi:1695-1732`) declares neither. `tests/VectorMatrixCastsWalk.fss:158-165` runs `m[:, 1]` and `m[1, :]`.
- Change: the claim's example becomes the `Array2` subscripts. "The compiled export check lists `array3()` ..." is cut: that check was made for the old case, and no one has measured the new one. The `__thrower` contrast and its probe are kept. Reproducer stays `none`: `VectorMatrixCastsWalk` shows the calls run, but declaring them in the api would leave it green, so it does not guard the row.
- Evidence read: `ledger.py show 465`; `FortressLibrary.fsi:1695-1732`, `:1867-1868`; `FortressLibrary.fss:2677-2713`, `:3199-3204`; `VectorMatrixCastsWalk.fss:150-171`; `rung-array-sites/REPORT.md:139`, `SKEPTIC.md:66`; `git log -S'(v:T):Array3'`.

## 470: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| F | F | P | P | F | F |

- Sc, Pr: the claim "does not check a static argument written at a call against its parameter's bound" covers every call. A dotted call checks it (`staticInstantiationForApp`, `STypesUtil.scala:803-832`, called at `Functionals.scala:1034`; F-70; row 651 FIXED). The claim's examples are top-level calls, and they stand (F-70, F-250, F-256 all name row 470 for the top-level call).
- Ow, Cn: text after the marker, "Climb batch 12 rung C: a dotted call now checks it; a top-level call does not.", narrows the claim from behind the marker. "Where the fix goes was not traced": by reading, a top-level `SFunctionalRef` instantiates through `staticInstantiation` (`Functionals.scala:1191`), whose `staticArgsMatchStaticParams` matches kinds only (`STypesUtil.scala:782-801`).
- Refused notes: batch 12 (`RECORD.md:148`) is folded in as the dotted/top-level split. Batch 17 (`:197`) deferred to F-250, which is cited. Batch 18 (`:143`, constraints of `where` variables cleared) is folded in by the `where` sentence, shortened.
- Change: the claim is scoped to a top-level function call; the mechanism is pinned; the `where` constraint is added; the probe path is kept for the `none` reproducer.
- Evidence read: `ledger.py show 470`; F-70, F-250, F-256; `STypesUtil.scala:670-835`; `Functionals.scala:1020-1040`, `:1160-1195`; `climb-batch-12/RECORD.md:148`, `climb-batch-17/RECORD.md:197`, `climb-batch-18/RECORD.md:143`.

## 495: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | F | P | F | P | F |

- Co: "generic dotted methods keep the compiled dispatch defects of rows 493 and 494": both are FIXED, so the defect is named through two closed rows. A reader must open them to learn what fails.
- Pr, Cn: "Walk cannot run these (row 21)": row 21 is FIXED (`743eb5286`, walk infers a generic method's own static arguments), so this is no longer known. It is cut; walk is not measured.
- The defect stands: `XXXDispatchMethodArmRungG` is unchanged since `dc0eee2fe`. The method path still makes its template through `generateGenericFunctionClass` with the trait's parameters (`OverloadSet.java:2393-2414`). `OverloadSet.java` is unchanged since `fd5cb4864`.
- Change: the claim states the failures directly. The siblings drop the closed 493 and 494. "beyond rung G's call-site change for top-level functions (`fd5cb4864`)" becomes the present statement that the call-site dispatch for top-level functions (`DispatchSwappedArmRungG`) does not reach methods. The link test's name and the probe paths are cut (the `XXX` test reproduces).
- Evidence read: `ledger.py show 495`, `493`, `494`, `496`, `21`; the `XXX` test, its `.fss` and link file; `OverloadSet.java:2380-2420`; `reviews/mie-probes/scope-call-site-dispatch.md:55-62`; `perf-probes/generic-distribute/REPORT.md:263`, `:279`.

## 510: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| F | P | P | P | F | F |

- Sc: the claim names only the function form. `tests/XXXExpectedTypeFixRungT.fss` cites row 510 for the method form `a: BoxT[\ZZ64\] = Fac.mk()` and for an assignment and a field. Row 21's notes say "the expected type is row 510". The batch-17 refused note (`climb-batch-17/RECORD.md:191`) holds and is folded in.
- Ow, Cn: "siblings: 455": 455 is FIXED; the open sibling, 705, sits after the marker: "sibling at a call's argument: 705 (climb batch 14 rung A). Climb batch 15 rung B's declared type at a clause form is not its repair; this test keeps its verdict." "Repair, outside rung K's files" tells rung bookkeeping.
- The defect stands: F-55 states it, and both `XXX` tests stand.
- Change: the claim adds the method form; siblings 705; F-228's clause-form contrast is stated in the present; the repair pointer is kept with the curator's open choice (P-12); the workaround is added (`wrapK[\ZZ64\](3)`, as `revival-changes.md` advises for row 705). Found-by `ours (climb batch N, rung K)` becomes `climb batch N rung K`.
- Evidence read: `ledger.py show 510`, `705`, `21`; F-55, F-228; both `XXX` tests; `climb-batch-17/RECORD.md:191`.

## 511: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| F | F | P | P | F | P |

- Sc: the claim omits the shape's best-known effect, the pairs' order refusing mixed numbers, `(1,2) < (1,2.5)`, 'Failed to find any matching overload' (`tests/TupleOrderMixedRefused.test`). `revival-changes.md` ("Pairs and triples ...") and F-92 cite row 511 for it. The batch-13 refused note (`climb-batch-13/RECORD.md:175`) holds and is folded in.
- Pr: "(`EvaluatorBase.java:713-718` at 052a7c3fe); the repair is its varargs branch": the file grew by 285 lines. The first pass is now at `:595-637` (varargs `:606-610`, a tuple holding `T` `:634-637`). "the repair is" is a repair design.
- Ow: the repair pointer is replaced by the mechanism.
- The defect stands: `XXXInferVarargsRungK` is unchanged since `041682188`.
- Change: notes re-pinned, the order consequence added, siblings 395 (P-76 names rows 395 and 511 together), the workaround kept. The compiled sentence is kept as the row gave it; it has not been measured again. Found-by `ours (...)` is normalised.
- Evidence read: `ledger.py show 511`, `395`; `EvaluatorBase.java:590-640`; `values/Coercions.java:195-220`; `XXXInferVarargsRungK.fss`; `TupleOrderMixedRefused.{fss,test}`; P-76, F-92, F-137; `climb-batch-13/RECORD.md:175`.

## 514: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | P | P | P | F | F |

- The defect stands: `Library/CompilerLibrary.fsi:173-174` is unchanged, and the `XXX` test's key matches the claim.
- Cn: "The compiled path compiles against its own smaller library until it is built on the one library, which declares the strided forms." Row 661 says the one library's strided `:` is declared `Range[\ZZ32\]`, no generator, so `seq(a:b:c)` is refused there too. The switch-over alone does not fix it.
- Ow: text after the marker, "sibling: 661, the one library's own strided `:` ...".
- Change: 661 joins the siblings; the switch-over sentence states row 661's limit; the text after the marker is folded in.
- Evidence read: `ledger.py show 514`, `661`, `71`, `74`, `314`; `CompilerLibrary.fsi:173-174` and its `git log`; `XXXStridedRangeRungT.{fss,test}`; F-133.

## 523: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | F | P | P | F | F |

- The defect stands: `CompilerBuiltin.fss:744` binds `jIntExp` (`:75`) to `simpleIntArith.intExp` (`:400-406`), unchanged since the team (`git log -S'Math.pow(a,b)'`: `5a68404fd`). `XXXPowZZ32CompiledRungE` is unchanged.
- Pr, Cn: "its negative branch answers otherwise than walk, so binding it as it stands would decide row 441": row 441's contract is decided (P-153). `rung-integer-power/REPORT.md:195` names this sentence as past. The batch-20 refused note (`RECORD.md:132`) holds and is folded in.
- Ow: text after the marker, "Its values: integer-power probe § 7."; "Walk raises ... (row 520)" names a FIXED row as the walk evidence, where the gated walk test is `PowChooseLcmRungE`.
- Change: notes restated with P-153's contract. The walk test replaces row 520. The probe pointer goes before the marker. The claim adds the specified answer (`IntegerOverflow`).
- Evidence read: `ledger.py show 523`, `524`, `525`, `520`; `simpleIntArith.java:375-410`; `CompilerBuiltin.fss:75`, `:744`; `tests/PowChooseLcmRungE.fss:50-64`; `climb-batch-20/RECORD.md:132`.

## 533: investigate

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| F | F | U | P | P | F |

- Sc, Pr: "ties `RR64`'s `opr ^(self, b:RR64)` with `MultiplicativeRing`'s `opr ^(self, other:ZZ64)`": the ring's power is now `abstract opr ^(self, other:AnyIntegral): T` (`Library/FortressLibrary.fsi:283`). `RR64` declares `opr ^(self, b:AnyIntegral):RR64` beside its `RR64` power (`:365-366`), since `5ad4a9957`. The notes' "(`Library/FortressLibrary.fsi:359`, `:278`)" no longer point at the powers.
- Ev: U. The notes say "Not measured since batch 8's numeral library". F-58 says "Whether the powers still tie, and between which two declarations, is not measured". F-73's numeral default predicts no refusal: a tie that differs only where the call passes a numeral reads the numeral as `ZZ32`. Two readings remain open: a different tie (`RR64`'s two powers), or no refusal at all.
- Cn: the batch-20 refused note (`climb-batch-20/RECORD.md:133`) says "the tie with this text is not measured".
- Why not rewrite: the claim's whole subject, a refusal and its tie, needs a run. The question and its command are in `questions.md`.
- Evidence read: `ledger.py show 533`; F-58, F-73, F-262; `FortressLibrary.fsi` power declarations (`grep -n 'opr \^'`); `MicroGptFlat.fss:15-32`; `climb-batch-20/RECORD.md:133`; `compile-ladder/climb-batch-20/gate/distance.txt` (12 components, no ambiguous coercion; C4 is not among them); `tools/distance/run.sh:80-90`.

## 537: rewrite

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | P | P | F | F | P |

- The defect stands: `XXXOverloadTwoGenericBare` and `XXXGenericBoundsMeet` are expected failures. The second dies with the same message (`rung-popl-examples/REPORT.md:66-67`).
- Co, Ow: text after the marker, "full text: history, row 537 Also XXXGenericBoundsMeet.": a bare test name with no statement of what it shows.
- Change: `XXXGenericBoundsMeet`'s set is stated before the marker, and the long paths are shortened. Claim, status, spec and reproducer are unchanged. F-174, F-50 and P-46 agree with it.
- Evidence read: `ledger.py show 537`, `413`, `559`; F-174; P-46; the two `XXX` tests; `rung-popl-examples/REPORT.md:25`, `:62-67`; `reviews/overloading-judgement.md` §3.7; PLAN line 69.
