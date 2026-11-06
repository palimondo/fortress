# c30 check (base c124c6b65)

`mech.py` run first: `MECH: 9 lines, 0 failing, every check passes.` Every token it lists as dropped is accounted for below.

## Row 23: measure: pass
Question narrow (one walk run of the row's probe, which matches `git show e879b6a44^:explorations/fable-review-probes/RvwNatArray.fss` exactly); runs from the main tree; each of the three outcomes maps to a rewrite or a close. `FType.java:576` at c124c6b65 is the `unificationError(... "Cannot unify " ...)` call; `FType.java` was touched by 153887360 and 369982d85 since ae4f8e38a, so the measure is warranted.

## Row 27: rewrite: pass
`OtherDecl.rats:75-83` at c124c6b65: `a3:(w default w IdOrOpName)?`, then `if ( a3 instanceof Id ) ... else { log(span, a3 + " is not a valid unit name."); unitId = NodeFactory.bogusId(span); }` and `Option.<Id>wrap(unitId)`: the claim and the bogus-default-unit mechanism hold. Probe matches history (`dim Length`). Dropped tokens: `OtherDecl.rats`/`:73-78` kept as the full path at the right lines (the old pin resolved to the 54-line Specification copy, false); the message is kept in the claim. Cold read matches; its one item (whether to fix alone) is not a stumble.

## Row 153: duplicate of 387: pass
One defect, one site, one path: `forFnExpr` (`Evaluator.java:566`) makes a `FunctionClosure`, `FunctionClosure extends NonPrimitive` (:39), `NonPrimitive extends Simple_fcn` (:34), whose `check` (`Simple_fcn.java:45`) is jammed on and is called on every apply (`Fcn.java:101,106,124`). 387's new line carries the `fill` case and the workaround.

## Row 387: rewrite: pass
`Simple_fcn.java:45` at c124c6b65 reads `if (true || t.typeMatch(x)) return x;` (comment "Jam on, for now."); the class chain above supports "shared by function expressions". Test `XXXCoercionReturnRungC`'s assert `r().big = 3` reproduces the claim. Dropped: `Simple_fcn.java:42-54` (narrowed to :45, kept), `Library/String.fss:529`/`avFlat(): RR32`/`row 531` (531 FIXED and the line now `narrow(...)`: false at the base; home: history and row 531), "assignment" (home: FACTS.md:184). Cold read matches; `1.0 headDim` and "shared by" are mild, resolvable.

## Row 393: measure: pass
Probe matches `git show ab067d9b6^:.../SkCycle.fss`; both paths' commands run from the main tree; outcomes map to a rewrite (with the owed `XXX` compile test, correcting the old "no test can gate it"), a close, or a rewrite to the other refusal.

## Row 408: keep: pass
`FZZ32Vector.java:79` declares `RTTIv`; `MethodInstantiater.java:137` asks `Naming.stemClassToRTTIclass(owner)`; neither file touched since ae4f8e38a; `XXXVecCtorLoad.test`/`.fss` and `VecCtorLoadLink.test` exist at the base; no signal.

## Row 486: rewrite: pass
`LHSEvaluator.java:218-226` at c124c6b65: typed binding, `Coercions.coerce(outerType, value)`, else `"RHS expression type " ... " is not assignable to LHS type "`: holds. `XXXNatValueNN32RungK.fss` asserts the `NN32` case with the `z: ZZ32 = n` control the workaround names. Spec `trait-parameters.tex:83-86` holds. Dropped: `SkNatType.fss`, `differential2.txt:58-97` (gone, the XXX test reproduces; home: history), `row 485` (FIXED; home: row 485, history). Present: rung K sentence gone.

## Row 509: rewrite: FAIL (cold read)
Fidelity holds: `joinStackNoUnion` at `OverloadSet.java:1887-1906` keeps the more general of two RTTIs in a subtype relation, else jumps to `lookahead` (called at :1650, :1660); O2Wide and O2Lone exist at `84aef6a4f^:explorations/reviews/option-2-soundness/`. Dropped tokens: `compiler/OverloadSet.java:1609` (an `ALOAD`, false), `conversion-overloading-judgement.md` (replaced by P-59, its decision), `O2Lone.fss` (kept as `O2Lone`).
- Failure: "For an argument typed `Any` the compiled run takes the plain arm and walk the generic one": the row never shows the declarations, so a reader cannot tell what "the plain arm" is (cold read, "Could not resolve"). Source: O2Wide.fss at `84aef6a4f^` declares `op[\T extends Number\](a: T, b: T)` and `op(a: Any, b: Any)`. Correction: replace with "For an argument typed `Any` the compiled run takes the plain `op(a: Any, b: Any)` and walk the generic `op[\T extends Number\]`" (notes about 675 of 700).

## Row 527: rewrite: pass
The three `getInt()` reads and `FLong.getInt()` = `(int) val` hold at c124c6b65; probe matches `ab067d9b6^:.../SkArraySize.fss` (`array1[\ZZ32, 3000000000\](7)`); P-40 (POSITIONS.md:37) places the over-2^31-1 refusal with the array design and names row 527. Status beside `silent` kept (silent.txt: defect). Nothing dropped.

## Row 575: rewrite: FAIL (cold read)
Fidelity holds: P-75 (POSITIONS.md:83) decides the coercion and leaves the way to build it to the curator; P-74's rule gives `ZZ64`; `UnsignedTest.fss`, `fib13.fss`, `IntegerMinMaxRungM.fss:59`, `InferCoercionRungK.fss`, `IntegerOrderNumerals.fss` and REPORT.md exist; `basic/inference.tex:299` is "A Numeral Whose Conversions Tie"; `conversions-coercions.tex:81` says the `NN32` conversion stays explicit. Reproducer `none` with the report section (a library-copy measurement) is acceptable. Status CONTESTED kept, unsettled. Dropped `pick(z, u)`: home history, REPORT.md section 8.
- Failure: "the choice is the curator's (P-75)", beside "which P-75 decides", reads as if P-75 left the coercion itself open (cold read, "Could not resolve", first item). Source: POSITIONS.md:83, "the choice of a way is not a worker's". Correction: replace "the choice is the curator's (P-75)" with "P-75 leaves the way to the curator" (same length; notes stay 690 of 700).

## Row 683: rewrite: pass
`Formula.scala:137` at c124c6b65 is the `(IntRef, IntRef)` case of `nDiffer`; `types-vals-vars.tex:59-62` says what the notes say ("Types", the `revival-sizes` revision); `internal-document.tex:141` "Overloaded operators" exists. Dropped: `:135-139` (narrowed, kept), `XXXNatTwoParamArmChecker` (the reproducer cell), `row 681` (FIXED; history). Status CONTESTED kept, no POSITIONS entry settles it. "opened size" is glossed at `Formula.scala:146-150`; a worker can read it there.

## Row 767: rewrite: pass
`TypeAnalyzer.scala:402-409` at c124c6b65: `pEqv` binds only a bare `_InferenceVarInt`, and `nDiffer` of an operation and a numeral is false, so `$i+1` against `3` is neither true nor false: holds. `IntNat.java:133-146`: equality check for an `IntBase`, `joinPut` for a bare `IntRef`, else `super`: holds. `XXXNatArithInferFromSumWalk.fss` and the `.test` exist. "When two sizes are the same" is `Specification/appendices/changes.tex:3935`. Dropped: `:390-397` (the `Op` case at the base, false), `row 681` (FIXED). Class `(checker)` with both paths named follows the ledger's one-area convention.
