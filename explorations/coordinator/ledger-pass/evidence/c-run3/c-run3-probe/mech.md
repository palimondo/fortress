# Mechanical check of c-run3-probe, the writer's files, base c124c6b65

## Row 77, rewritten (795 characters)
- lengths: row 795 of 1,200, claim 236 of 300, notes 425 of 700
- reproducer `none`: exists
- citations:
  - `explorations/compiler-probes/p20.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 78, rewritten (757 characters)
- lengths: row 757 of 1,200, claim 239 of 300, notes 364 of 700
- reproducer `none`: exists
- citations:
  - `explorations/compiler-probes/p10.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 83, rewritten (851 characters)
- lengths: row 851 of 1,200, claim 95 of 300, notes 630 of 700
- reproducer `none`: exists
- citations:
  - `explorations/run-c/probes/api/`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `.fsi`, `.fss`
- every check passes

## Row 184, rewritten (914 characters)
- lengths: row 914 of 1,200, claim 137 of 300, notes 687 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:896` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): no word to check; reads: bug("Expect all oprefs to be top level " + op);
  - `explorations/apl/v1-probes/p06_cross.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/apl/v1-probes/p10_eqv.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `0ff5eae27~1`, `explorations/apl/v1/base`, `p10_eqv.fss`
- every check passes

## Row 30, rewritten (1008 characters)
- lengths: row 1008 of 1,200, claim 204 of 300, notes 664 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:3448` (Library/FortressLibrary.fss): holds join(a: T, b: T): T = a + b; reads: join(a: T, b: T): T = a + b
  - `explorations/gap-ledger-probes/g10.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `6.0`, `RR64`, `W(6.0)`
- every check passes

## Row 145, rewritten (1063 characters)
- lengths: row 1063 of 1,200, claim 169 of 300, notes 695 of 700
- reproducer `explorations/apl/rung-3/t03_and.fss`: exists
- citations:
  - `Specification-1.0-frozen/basic/operators/conditionalops.tex:13-27` (Specification-1.0-frozen/basic/operators/conditionalops.tex): no word to check; reads: \seclabel{conditional-operators}
  - `Library/FortressLibrary.fsi:2649` (Library/FortressLibrary.fsi): words moved: IndexOutOfBounds at :1172; opr AND(a:Boolean, b:()->Boolean) at :2651; reads: opr AND(a:Boolean, b:Boolean):Boolean
  - `Library/FortressLibrary.fsi:2651` (Library/FortressLibrary.fsi): words moved: IndexOutOfBounds at :1172; opr AND(a:Boolean, b:Boolean) at :2649; reads: opr AND(a:Boolean, b:()->Boolean):Boolean
  - `Library/FortressLibrary.fsi:2648` (Library/FortressLibrary.fsi): no word to check; reads: opr  OR(a:Boolean, b:Boolean):Boolean
  - `Library/FortressLibrary.fsi:2650` (Library/FortressLibrary.fsi): no word to check; reads: opr  OR(a:Boolean, b:()->Boolean):Boolean
  - `explorations/run-c/probes/g145_and.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Index of dimension 1 out of bounds`, `Library/FortressLibrary.fsi:2607-2609`, `while (j > 0) AND (v[idx[j-1]] > v[idx[j]])`
- every check passes

## Row 164, rewritten (1141 characters)
- lengths: row 1141 of 1,200, claim 201 of 300, notes 672 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/overloading.tex:170-175` (Specification-1.0-frozen/basic/overloading.tex): no word to check; reads: A declaration $\f(\Ps)$ is \emph{applicable} to a call $\f(\Cs)$
  - `Specification-1.0-frozen/basic/expressions/function.tex:28-31` (Specification-1.0-frozen/basic/expressions/function.tex): no word to check; reads: \begin{Grammar}
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java:257` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java): holds BottomType; reads: FType ft = EvalType.getFTypeFromOption(rt, env, BottomType.ONLY);
  - `explorations/run-c3/probes/g158_untyped_overload/G158.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `G158.fss`, `G158.fss:7`
- every check passes

## Row 444, rewritten (1056 characters)
- lengths: row 1056 of 1,200, claim 206 of 300, notes 686 of 700
- reproducer `none`: exists
- citations:
  - `interpreter/evaluator/values/Constructor.java:383-388` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java): holds OverloadedMethod; reads: for (Map.Entry<String, Set<MethodClosure>> ent : namesToSignatureSets.entrySet()) {
  - `compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2InheritedPlain.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Constructor.java`, `Constructor.java:383-388`, `OverloadedFunction.java`, `OverloadedFunction.java:1761-1773`, `Sk2Inherited.fss`, `XXXDottedMethodMeetInheritedWalk`
- every check passes

## Row 258, rewritten (1097 characters)
- lengths: row 1097 of 1,200, claim 256 of 300, notes 683 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/types-vals-vars.tex:263-264` (Specification-1.0-frozen/basic/types-vals-vars.tex): no word to check; reads: Every tuple type is a subtype of \TYP{Any}.
  - `explorations/apl/base/AplCore.fss:1726-1731` (explorations/apl/base/AplCore.fss): holds aplTup; reads: aplTup(rs: Array[\Any,ZZ32\]): Object
  - `explorations/apl/base/AplCore.fss:1743` (explorations/apl/base/AplCore.fss): holds aplTup; reads: elif aplAllMat(rs) then aplTup(rs)
  - `explorations/apl/microgpt/probes/x03_lib.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/apl/microgpt/probes/x04_gram.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `aplAllMat`, `x04_gram.fss`
- every check passes

## Row 307, rewritten (1199 characters)
- lengths: row 1199 of 1,200, claim 226 of 300, notes 683 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNatBoolChecker.test`: exists
- citations:
  - `STypesUtil.scala:585-606` (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala): holds makeInferenceArg; reads: def makeInferenceArg(sparam: StaticParam): StaticArg = sparam.getKind match {
- in the old line, not in the new: `9d323883f`, `a1a75716a`
- every check passes

## Row 499, rewritten (1150 characters)
- lengths: row 1150 of 1,200, claim 261 of 300, notes 666 of 700
- reproducer `ProjectFortress/compiler_tests/XXXGenericPositionalBox.test`: exists
- citations:
  - `OverloadSet.java:1342-1353` (ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java): no word to check; reads: private StaticTypeReplacer atTemplateParams(TaggedFunctionName f) {
  - `scala_src/typechecker/impls/Functionals.scala:824-832` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): no word to check; reads: val head: Option[Ranked] =
- in the old line, not in the new: `ProjectFortress/compiler_tests/XXXGenericPositionalBox.fss`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1342-1353`, `e2f1aa7e8`, `row 159`, `scala_src/typechecker/impls/Functionals.scala:741-749`
- every check passes

## Row 235, rewritten (1004 characters)
- lengths: row 1004 of 1,200, claim 236 of 300, notes 682 of 700
- reproducer `none`: exists
- citations:
  - `explorations/apl/rung-3/T02Syn.fsi:30` (explorations/apl/rung-3/T02Syn.fsi): no word to check; reads: ( SPACE a:TExp SPACE , SPACE b:TExp SPACE ) SPACE ⍴ SPACE r:TExp
  - `explorations/apl/rung-3/T02Syn.fsi:32` (explorations/apl/rung-3/T02Syn.fsi): no word to check; reads: | ( SPACE a:TAtom SPACE , SPACE b:TAtom SPACE ) SPACE ⍴ SPACE r:TExp
  - `explorations/apl/base/AplCore.fss:1209` (explorations/apl/base/AplCore.fss): holds opr ×(a: RR64, b: RR64); reads: opr ×(a: RR64, b: RR64): RR64 = a b
  - `Library/FortressLibrary.fss:462` (Library/FortressLibrary.fss): no word to check; reads: opr TIMES(self,b:RR64):RR64 = asFloat(self) TIMES asFloat(b)
  - `explorations/apl/base/AplSyntax.fsi:212` (explorations/apl/base/AplSyntax.fsi): holds ( SPACE a:AplAtom SPACE , SPACE b:AplAtom SPACE ) SPACE ⍴ SPACE r:AplE; reads: | ( SPACE a:AplAtom SPACE , SPACE b:AplAtom SPACE ) SPACE ⍴ SPACE r:AplE
- in the old line, not in the new: nothing
- every check passes

## Row 135, closed by 20474c144, test none
- commit: 20474c144 2026-10-14 Walk instantiates the big operator of a reduction or comprehension that writes no static argument by the declared type of its value, else b
- test: none
- every check passes

## Row 240, closed by 8f7e183d4, test ProjectFortress/tests/GenericReturningAny.fss
- commit: 8f7e183d4 2026-09-30 Walk chooses between a generic declaration and a plain one on their declared domains, dispatches a converted call again, and loads the over
- test: ProjectFortress/tests/GenericReturningAny.fss
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 77: row 77: rewritten (795 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 78: row 78: rewritten (757 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 83: row 83: rewritten (851 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 184: row 184: rewritten (914 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 30: row 30: rewritten (1008 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 145: row 145: rewritten (1063 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 164: row 164: rewritten (1141 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 444: row 444: rewritten (1056 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 258: row 258: rewritten (1097 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 307: row 307: rewritten (1199 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 499: row 499: rewritten (1150 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 235: row 235: rewritten (1004 characters); its earlier line is in fortress-gap-ledger-history.md
    applied close 135: row 135: FIXED by 20474c144, test none; its earlier line is in fortress-gap-ledger-history.md
    applied close 240: row 240: FIXED by 8f7e183d4, test ProjectFortress/tests/GenericReturningAny.fss; its earlier line is in fortress-gap-ledger-history.md
    apply.py: 14 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 14 lines, 0 failing, every check passes.
