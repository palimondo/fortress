# Mechanical check of c29, the writer's files, base c124c6b65

## Row 18, rewritten (919 characters)
- lengths: row 919 of 1,200, claim 169 of 300, notes 574 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/fortress/preamble.tex:81` (Specification-1.0-frozen/fortress/preamble.tex): no word to check; reads: \item type aliases
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/IndexBuilder.scala:187` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/IndexBuilder.scala): no word to check; reads: case d:TypeAlias => bug("Not yet implemented: " + d)
  - `TypeAnalyzer.scala:703` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): holds TypeAliasIndex; reads: case ti: TypeAliasIndex =>
  - `explorations/aliases-units-report.md:97-101` (explorations/aliases-units-report.md): no word to check; reads: 
  - `explorations/alias-units-probes/p1_alias_basic.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `IndexBuilder`, `TypeAnalyzer.scala:554`
- every check passes

## Row 26, rewritten (987 characters)
- lengths: row 987 of 1,200, claim 173 of 300, notes 604 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/dimensions.tex:15-17` (Specification-1.0-frozen/basic/dimensions.tex): no word to check; reads: \note{Dimensions and units are not yet supported.
  - `Specification-1.0-frozen/fortress/preamble.tex:79` (Specification-1.0-frozen/fortress/preamble.tex): no word to check; reads: \item dimensions and units
  - `interpreter/evaluator/EvalType.java:320` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java): no word to check; reads: return bug(n, errorMsg("Can't EvalType this node type " + n.getClass()));
  - `explorations/alias-units-probes/q18_in_operator.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/alias-units-probes/q16_dimcheck.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `impls/Misc.scala:199` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala): words moved: typecheck at :12,32,33; checkMisc at :157; reads: case _ => throw new Error(errorMsg("Not yet implemented: ", node.getClass))
  - `Dispatch.scala:73` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Dispatch.scala): words moved: typecheck at :12,16; reads: case _ => checkMisc(node)
  - `explorations/alias-units-probes/q8_dimtype_parse.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 156, rewritten (1157 characters)
- lengths: row 1157 of 1,200, claim 285 of 300, notes 678 of 700
- reproducer `none`: exists
- citations:
  - `interpreter/evaluator/values/Fcn.java:67-71` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Fcn.java): words moved: applyInnerPossiblyGeneric at :101,106,124; reads: public FType type() {
  - `EvaluatorBase.java:939` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java): no word to check; reads: return error(errorMsg("Argument ", a, " has no type information"));
  - `interpreter/evaluator/values/FValue.java:141` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FValue.java): no word to check; reads: int c = x.get(i).type().compareTo(y.get(i));
  - `GenericFunctionOrConstructor.java:52` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericFunctionOrConstructor.java): words moved: applyInnerPossiblyGeneric at :51,57; reads: Simple_fcn foo = cache.get(args);
- in the old line, not in the new: `:52`, `FType`, `FValue.java`, `FValue.java:141`, `GenericFunctionOrConstructor.applyInnerPossiblyGeneric`, `explorations/run-c3/probes/lift_g2.fss`, `q02b_arrow.fss`, `q02c1_plainplain`, `q02c4_genericgeneric`, `q02c5_plainarrow_generic`
- every check passes

## Row 396, rewritten (1138 characters)
- lengths: row 1138 of 1,200, claim 268 of 300, notes 658 of 700
- reproducer `ProjectFortress/compiler_tests/XXXTupleLocalVarCompiledRungC.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java:547` (ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java): no word to check; reads: mv.visitTypeInsn(Opcodes.CHECKCAST, NamingCzar.jvmTypeDesc(fortressType, ifNone, false));
  - `compiler/NamingCzar.java:1454-1466` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): words moved: fortress run at :410; reads: public String forTupleType(TupleType t) {
  - `VarCodeGen.java:730` (ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java): no word to check; reads: mv.visitTypeInsn(Opcodes.CHECKCAST, NamingCzar.jvmTypeDesc(fortressType, ifNone, false));
- in the old line, not in the new: `NamingCzar.java`, `NamingCzar.java:1415-1419`
- every check passes

## Row 471, rewritten (1173 characters)
- lengths: row 1173 of 1,200, claim 296 of 300, notes 692 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/types-vals-vars.tex:135-136` (Specification-1.0-frozen/basic/types-vals-vars.tex): no word to check; reads: type and of every supertype of its runtime type; immediate subtypes of
  - `EvaluatorBase.java:905` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java): holds abm.meetPut; reads: abm.meetPut(name, tt);
  - `TypeLatticeOps.java:42` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/TypeLatticeOps.java): no word to check; reads: if (s.size() != 1) bug(errorMsg("Meet(", x, ", ", y, ") not a singleton: ", s));
- in the old line, not in the new: `EvaluatorBase.java:358-366`
- every check passes

## Row 506, rewritten (1037 characters)
- lengths: row 1037 of 1,200, claim 243 of 300, notes 570 of 700
- reproducer `ProjectFortress/compiler_tests/XXXInferComboCap.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:370` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): holds combos.size > 64; reads: if (combos.size > 64) return notApplicable
  - `Functionals.scala:379-381` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): no word to check; reads: def constraint(inf: ArrowType, ops: Map[Op, Op]): CFormula =
- in the old line, not in the new: `Functionals.scala:360-368`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:358`, `row 401`
- every check passes

## Row 507, rewritten (944 characters)
- lengths: row 944 of 1,200, claim 243 of 300, notes 450 of 700
- reproducer `ProjectFortress/compiler_tests/XXXInferLambdaArg.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:296` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): words moved: args.exists(_.isRight) at :305; checkApplicableWithInference at :167,181; reads: def checkApplicableWithCoercion(
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:305` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): words moved: checkApplicableWithCoercion at :165,296; checkApplicableWithInference at :167,181; reads: if (args.exists(_.isRight)) return notApplicable
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:181` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): words moved: checkApplicableWithCoercion at :165,296; args.exists(_.isRight) at :305; reads: def checkApplicableWithInference(
- in the old line, not in the new: `:296`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:305`
- every check passes

## Row 758, rewritten (940 characters)
- lengths: row 940 of 1,200, claim 226 of 300, notes 510 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:1077` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): no word to check; reads: env.staticParam(x).getOrElse(bug(x, x + " is not in the kind env " + env)) }
- in the old line, not in the new: `TypeAnalyzer.scala`, `TypeAnalyzer.scala:981`
- every check passes

## Row 165, rewritten (1001 characters)
- lengths: row 1001 of 1,200, claim 168 of 300, notes 680 of 700
- reproducer `none`: exists
- citations:
  - `parser/preparser/PreParserState.java:173` (ProjectFortress/src/com/sun/fortress/parser/preparser/PreParserState.java): holds Operator declarations are not allowed in block expressions.; reads: log(span, "Operator declarations are not allowed in block expressions.");
  - `values/NonPrimitive.java:216` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/NonPrimitive.java): no word to check; reads: "The number of parameters (" + params.size() + ") does not match with the number of arguments (" +
  - `explorations/run-c3/probes/lift_g3.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-c3/probes/lift_g3c.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `InterpreterBug: ** bug! The number of parameters (2) does not match with the number of arguments (0).`, `OpRef`, `lift_g3b.fss`, `lift_g3c.fss`, `lift_g3d.fss`
- every check passes

## Row 108, rewritten (773 characters)
- lengths: row 773 of 1,200, claim 55 of 300, notes 573 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/parser/LocalDecl.rats:241` (ProjectFortress/src/com/sun/fortress/parser/LocalDecl.rats): holds Matrix unpasting is not yet implemented.; reads: log(span, "Matrix unpasting is not yet implemented.");
  - `explorations/run-b/probes/c02_pasting.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b2/probes/g1d_unpaste1.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b2/probes/g1d_unpaste2.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `g1d_unpaste2.fss`
- every check passes

## Row 641, rewritten (875 characters)
- lengths: row 875 of 1,200, claim 256 of 300, notes 472 of 700
- reproducer `explorations/perf-probes/transactions/run.sh`: exists
- citations:
  - `compiler/codegen/VarCodeGen.java:483-546` (ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java): no word to check; reads: Label end = new Label();
  - `compiler/codegen/VarCodeGen.java:620-726` (ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java): no word to check; reads: "Lcom/sun/fortress/compiler/runtimeValues/MutableFValue;",
- in the old line, not in the new: `explorations/perf-probes/transactions/TxArray.fss`, `row 302`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 18: row 18: rewritten (919 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 26: row 26: rewritten (987 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 156: row 156: rewritten (1157 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 396: row 396: rewritten (1138 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 471: row 471: rewritten (1173 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 506: row 506: rewritten (1037 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 507: row 507: rewritten (944 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 758: row 758: rewritten (940 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 165: row 165: rewritten (1001 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 108: row 108: rewritten (773 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 641: row 641: rewritten (875 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 11 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 11 lines, 0 failing, every check passes.
