# Check of c24 (base c124c6b65)

`mech.md`: 10 lines, 0 failing; the chunk applies on copies, `ledger.py check` and `check --base` exit 0. No closes, duplicates, questions to measure or pairs. One keep (815).

## 400: FAIL
- Fidelity. Passage: "Walk: ... runs the sized arm with `n` unbound; it waits on E3, the library's dead sizes." E3 is decision E's diff, the api's 17 vector and matrix operators losing their unused sizes (`explorations/coordinator/CLIMB-BATCH-20.md:15,150`), and it has landed at the base: FACTS F-35 ("the 17 vector and matrix operators have lost their sizes since (P-40)"), P-40 ("The 17 vector and matrix operators of the `FortressLibrary` api declare only the sizes that their types use"), and `Library/FortressLibrary.fsi:1648-1650` at c124c6b65 (`opr +(self, v:Vector[\T,s0\])`, no `nat m`). The cold read also could not resolve "E3". Correction: delete "; it waits on E3, the library's dead sizes", so the sentence ends "runs the sized arm with `n` unbound."
- Otherwise pass: `Functionals.scala:257` at the base holds `hasSizeInferenceVars(sargs) && !hasInferenceVars(resultArrow.getDomain)`, and `hasInferenceVars` (`STypesUtil.scala:840-851`) counts `_InferenceVarInt`, so `Box[\$n\]` blocks the refusing candidate, as the line says. `XXXNatUnknownSizeArm` is in `compiler_tests/`. The probe is at `ab067d9b6^` and matches the claim's program. Dropped tokens: `d65892d34` (fixed half: history row 400, FACTS F-69), `052a7c3fe` (old pin, replaced), the repair report (still in the tree, its section on row 400 at line 15; history). Status kept.

## 446: pass
`MethodInstantiater.java:227` at the base reads the size between oxfords with `new BigInteger(...)`, as stated; probe `SkDynZZ32Val.fss` at `ab067d9b6^` (its function is `ev`, the line's `ee` with body `= n` is the same program). P-40 replaces the false title "POSITIONS, \"Sizes.\"". Dropped: `052a7c3fe` (pin, replaced), the repair report (in the tree; history). The cold read's question of the fix's site is answered by P-40 ("A call that cannot fix a size of the declaration that it would choose is refused, also inside an overload set"); not a defect of the line.

## 682: pass
`TypeAnalyzer.scala:287-300` at the base is the `opensSizes` case, as stated; only the pin moved (`:285-298` dropped as replaced). CONTESTED kept. "Opening" is defined by F-270, which the line cites.

## 713: pass
`OverloadedFunction.java:901` is the Meet Rule message inside `ruleFailure` (`:885`); the walk test's `.test` asserts `load_exception_contains=fails the Meet Rule`, and its program is the claim's. `compiler_tests/OverloadTwoBoundsClosedTraitExclusion` exists. Dropped: `:835` (old pin, replaced). CONTESTED kept.

## 770: FAIL
- Cold read. Passage: "A trait inherits no method whose parameter type equals that of one it declares." The reader could not tell which trait is meant or why it bears on the defect, and a worker fixing the api's set needs it: it is why the pair is one method, not two overloads. Source: `Specification/basic/traits.tex:583-589` at c124c6b65 (a trait declaration does not inherit a method declaration whose parameter type, not counting the self parameter, equals that of one it declares). Correction: replace the sentence with "`R` does not inherit `Q`'s `num`, whose parameter type equals its own (`basic/traits.tex`)." (about 8 characters longer; notes about 681 of 700).
- Otherwise pass: at the base `toFunctionArrows` returns unfiltered at `OverloadingChecker.scala:139` when not `onlyConcrete`, and the filter is `:140-162`; the twin and the reproducer exist. Dropped: `:137` and `:138-160` (old pins, replaced). 815 a sibling, not a duplicate.

## 786: pass
`mayBeEqual` is at `OverloadedFunction.java:1539` at the base (`:1420` dropped as replaced); `GenericPairExcludingWalk.fss` holds the `tint` pair; `XXXExclusionExcludingBoundsBox` exists. CONTESTED kept. Not blocking: "P-26 points to the checker's refusal" reads two ways for the cold reader; the judge may write "(by P-26, the type group's later code, the checker's refusal would stand)".

## 803: pass
At the base `Formula.scala:282` holds `pu1.exists(t1 => primImp(p, ta.excludes(e2, t1)))`, `:287-292` is `primImp`, `:308-314` is `forall` with `stackLevel`; `TypeAnalyzer.scala:805` is `normConjunct`'s `!isTrue(sub(a, x))` (`:779` dropped as replaced). The probe report holds `shadow.py ... bounds keepvar` (line 199) and `VecPairsLeft` (line 150); `ExclusionBoundsScalarLeft` exists. NEGATIVE-BOUNDED kept.

## 894: pass
`checkFancyRule` is `OverloadingChecker.scala:413-424` at the base, and refuses any top-level function `lteq` a functional method of the name. Only "since rung W" dropped. CONTESTED kept.

## 752: FAIL
- Cold read. The example works only with `AnyBox`'s `comprises` clause, which the line never gives, and `F` is not introduced; a worker reproducing or fixing it would stumble on both. Source: `ProjectFortress/compiler_tests/XXXOpenTypeThroughSubtraitChecker.fss` at c124c6b65 (`trait AnyBox comprises { Box[\E\] } where [\E extends Object\]`, `count[\F extends Object\](b: Box[\F\])`, `viaMid(x: Mid[\ZZ32\]) = count(x)`). Correction: begin the notes "`AnyBox comprises { Box[\E\] } where [\E\]`; `count[\F\](b: Box[\F\])` called on an `x: Mid[\ZZ32\]`: " before the message (about 95 characters; notes about 660 of 700).
- Otherwise pass: `throughParent` is `TypeAnalyzer.scala:308-317` at the base (`:306-315` dropped as replaced); NEGATIVE-VERIFIED beside `silent` kept (item 265), `silent.txt` gives `choice` with its reason.

## 893: pass
`selfTypeParameter` is `OverloadedFunction.java:845-867` at the base; `changes.tex:4105-4110` holds the extender rule's message, and `:4111-4112` names row 893. The dropped message at `4d27fbcc5` has its home in the history and row 804 (FIXED). Status kept.

## 815 (keep): pass
No commit since the row touches its code (the three code-generator commits since `08c95c708` concern closures, `extends Any`, `forbid`, `test` and where clauses); the reproducer asserts `run_out_contains=REACHED`; the report's section 8 exists.
