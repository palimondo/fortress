# Mechanical check of c30, the writer's files, base c124c6b65

## Row 27, rewritten (858 characters)
- lengths: row 858 of 1,200, claim 195 of 300, notes 476 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/advanced/defining-dimensions.tex:23-25` (Specification-1.0-frozen/advanced/defining-dimensions.tex): no word to check; reads: &$|$&
  - `ProjectFortress/src/com/sun/fortress/parser/OtherDecl.rats:75-83` (ProjectFortress/src/com/sun/fortress/parser/OtherDecl.rats): words moved: default at :32,65; null at :106,140,150; reads: if ( a3 instanceof Id ) {
  - `explorations/alias-units-probes/q3_bare_dim.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `OtherDecl.rats`, `OtherDecl.rats:73-78`, `null is not a valid unit name.`
- every check passes

## Row 387, rewritten (1139 characters)
- lengths: row 1139 of 1,200, claim 247 of 300, notes 693 of 700
- reproducer `ProjectFortress/tests/XXXCoercionReturnRungC.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Simple_fcn.java:45` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Simple_fcn.java): no word to check; reads: if (true || t.typeMatch(x)) return x;
- in the old line, not in the new: `:45`, `Library/String.fss`, `Library/String.fss:529`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Simple_fcn.java:42-54`, `avFlat(): RR32`, `if (true \|\| t.typeMatch(x))`, `row 531`
- every check passes

## Row 486, rewritten (969 characters)
- lengths: row 969 of 1,200, claim 236 of 300, notes 431 of 700
- reproducer `ProjectFortress/tests/XXXNatValueNN32RungK.fss`: exists
- citations:
  - `Specification-1.0-frozen/basic/trait-parameters.tex:83-86` (Specification-1.0-frozen/basic/trait-parameters.tex): words moved: Int at :68,296; reads: A \KWD{nat} parameter may be used to instantiate other
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java:218-226` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java): words moved: Int at :16; reads: Type t = NodeUtil.optTypeOrPatternToType(type).unwrap();
- in the old line, not in the new: `differential2.txt`, `differential2.txt:58-97`, `explorations/compile-ladder/rung-spec-ranges/probes/skeptic/SkNatType.fss`, `row 485`
- every check passes

## Row 509, rewritten (992 characters)
- lengths: row 992 of 1,200, claim 270 of 300, notes 630 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1887-1906` (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java): holds joinStackNoUnion; reads: private void joinStackNoUnion(MethodVisitor mv, Label lookahead) {
  - `explorations/reviews/option-2-soundness/O2Wide.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `O2Lone.fss`, `compiler/OverloadSet.java`, `compiler/OverloadSet.java:1609`, `explorations/reviews/conversion-overloading-judgement.md`
- every check passes

## Row 527, rewritten (1036 characters)
- lengths: row 1036 of 1,200, claim 248 of 300, notes 685 of 700
- reproducer `none`: exists
- citations:
  - `PrimitiveArray.java:40` (ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/PrimitiveArray.java): holds getInt(); reads: s0 = self_env.getLeafValue("s0").getInt();
  - `PrimImmutableArray.java:43` (ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/PrimImmutableArray.java): holds getInt(); reads: s0 = self_env.getLeafValue("s0").getInt();
  - `PrimImmutableRR64Array.java:36` (ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/PrimImmutableRR64Array.java): holds getInt(); reads: s0 = self_env.getLeafValue("s0").getInt();
  - `FLong.java:23-26` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FLong.java): words moved: ZZ64 at :51; reads: public int getInt() {
  - `explorations/compile-ladder/rung-size-range/probes/skeptic/SkArraySize.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 575, rewritten (1122 characters)
- lengths: row 1122 of 1,200, claim 235 of 300, notes 690 of 700
- reproducer `none`: exists
- citations:
  - `UnsignedTest.fss:51` (ProjectFortress/tests/UnsignedTest.fss): no word to check; reads: assert(DOTMINUS xfoo,1+BITNOT xfoo)
  - `fib13.fss:17` (ProjectFortress/tests/fib13.fss): words moved: NN32 at :30,31; reads: fib13[\I\](n:I): I requires { n >= 0 } = do
  - `IntegerMinMaxRungM.fss:59` (ProjectFortress/tests/IntegerMinMaxRungM.fss): holds u MAX z; reads: assert(shown(u MAX z), "5 : ZZ64", "row 484, conversions-coercions.tex, section \"Coercion Resolution\": NN32 MAX ZZ32 at ZZ64, answer 8")
- in the old line, not in the new: `pick(z, u)`
- every check passes

## Row 683, rewritten (1032 characters)
- lengths: row 1032 of 1,200, claim 243 of 300, notes 595 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNatTwoParamArmChecker.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:137` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala): no word to check; reads: case (x: IntRef, y: IntRef) => !sameSize(x, y) && !isOpenedSize(x) && !isOpenedSize(y)
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:135-139`, `XXXNatTwoParamArmChecker`, `row 681`
- every check passes

## Row 767, rewritten (1178 characters)
- lengths: row 1178 of 1,200, claim 292 of 300, notes 676 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNatArithInferFromSum.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:402-409` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): no word to check; reads: protected def pEqv(x: IntExpr, y: IntExpr)(implicit negate: Boolean): CFormula = (foldSize(x), foldSize(y)) match {
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/IntNat.java:133-146` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/IntNat.java): no word to check; reads: if (val instanceof IntArg) {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:390-397`, `row 681`
- every check passes

## Row 153, a duplicate of row 387
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 27: row 27: rewritten (858 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 387: row 387: rewritten (1139 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 486: row 486: rewritten (969 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 509: row 509: rewritten (992 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 527: row 527: rewritten (1036 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 575: row 575: rewritten (1122 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 683: row 683: rewritten (1032 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 767: row 767: rewritten (1178 characters); its earlier line is in fortress-gap-ledger-history.md
    applied duplicate 153: row 153: DUPLICATE of row 387; earlier lines in fortress-gap-ledger-history.md
    apply.py: 9 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 9 lines, 0 failing, every check passes.
