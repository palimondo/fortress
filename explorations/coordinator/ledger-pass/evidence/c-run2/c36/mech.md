# Mechanical check of c36, the writer's files, base c124c6b65

## Row 122, rewritten (890 characters)
- lengths: row 890 of 1,200, claim 76 of 300, notes 685 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/IndexBuilder.scala:189` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/IndexBuilder.scala): no word to check; reads: case d:PropertyDecl => bug("Not yet implemented: " + d)
  - `IndexBuilder.scala:349` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/IndexBuilder.scala): holds NI.nyi; reads: case d:PropertyDecl => NI.nyi; ()
  - `explorations/run-b/probes/c07_contracts_tests.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/parser/OtherDecl.rats`, `ProjectFortress/src/com/sun/fortress/parser/OtherDecl.rats:132`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/IndexBuilder.scala:349`
- every check passes

## Row 124, rewritten (969 characters)
- lengths: row 969 of 1,200, claim 94 of 300, notes 674 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1561-1566` (ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java): no word to check; reads: } else if ( isFieldLike(d) ) {
  - `explorations/run-b/probes/c14_lazy_grad_generators.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `explorations/run-b2/probes/g4g_field_after.fss`, `g4g_getter_after.fss`, `g4g_getter_before.fss`
- every check passes

## Row 125, rewritten (1012 characters)
- lengths: row 1012 of 1,200, claim 184 of 300, notes 628 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1533` (ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java): words moved: checkMembers at :1552,1573; reads: d instanceof PropertyDecl );
  - `ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1561-1566` (ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java): words moved: PropertyDecl at :1003,1528,1533; checkMembers at :1552,1573; reads: } else if ( isFieldLike(d) ) {
  - `explorations/run-b2/probes/g4g_prop_after.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 354, rewritten (1182 characters)
- lengths: row 1182 of 1,200, claim 233 of 300, notes 688 of 700
- reproducer `ProjectFortress/compiler_tests/XXX3q.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:338-341` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds isApi; reads: if ( isApi && NodeUtil.isComprisesEllipses(si.ast) )
  - `ProjectFortress/test_library/Compiled3.q.fsi:12-15` (ProjectFortress/test_library/Compiled3.q.fsi): no word to check; reads: api Compiled3.q
- in the old line, not in the new: `TypeHierarchyChecker.scala`, `TypeHierarchyChecker.scala:247-250`, `XXX`, `comprisesContains`
- every check passes

## Row 357, rewritten (1132 characters)
- lengths: row 1132 of 1,200, claim 226 of 300, notes 681 of 700
- reproducer `none`: exists
- citations:
  - `Library/IntMap.fsi:20-22` (Library/IntMap.fsi): words moved: trait NonEmptyIntMap[\Val\] extends IntMap[\Val\] at :64; reads: trait IntMap[\Val\]
  - `Library/IntMap.fsi:64` (Library/IntMap.fsi): holds trait NonEmptyIntMap[\Val\] extends IntMap[\Val\]; reads: trait NonEmptyIntMap[\Val\] extends IntMap[\Val\] comprises { ... }
  - `Library/IntMap.fsi:64` (Library/IntMap.fsi): holds trait NonEmptyIntMap[\Val\] extends IntMap[\Val\]; reads: trait NonEmptyIntMap[\Val\] extends IntMap[\Val\] comprises { ... }
  - `Library/IntMap.fss:26` (Library/IntMap.fss): holds { EmptyIM[\Val\], NonEmptyIntMap[\Val\] }; reads: comprises { EmptyIM[\Val\], NonEmptyIntMap[\Val\] }
  - `explorations/coordinator/tools/checker-count/run.sh:76` (explorations/coordinator/tools/checker-count/run.sh): no word to check; reads: TARGET=Library/FortressLibrary.fss
  - `explorations/compile-ladder/rung-library-defects/probes/skeptic/intmap-api-run.txt`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:19-21`, `:63`, `explorations/coordinator/tools/checker-count/run.sh:51`
- every check passes

## Row 762, rewritten (1027 characters)
- lengths: row 1027 of 1,200, claim 249 of 300, notes 588 of 700
- reproducer `ProjectFortress/tests/XXXTraitBoundGenericMethod.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:216` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java): holds SingleFcn.createSymbolicInstantiation; reads: List<FType> instantiationTypes = SingleFcn.createSymbolicInstantiation(bte, ap, getAt());
  - `SingleFcn.java:215` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/SingleFcn.java): no word to check; reads: st.setExtendsAndExcludes(eval_type.getFTypeListFromList(oext), null);
- in the old line, not in the new: nothing
- every check passes

## Row 838, rewritten (1050 characters)
- lengths: row 1050 of 1,200, claim 227 of 300, notes 691 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:154-157` (ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java): holds ApiFldMod; reads: } else {
  - `Specification/basic/components/apis.tex:87-88` (Specification/basic/components/apis.tex): words moved: var at :129,227; reads: \emph{AbsObjectDecl} &::=& \option{\emph{AbsObjectMods}}
  - `Specification/basic/objects.tex:104-109` (Specification/basic/objects.tex): words moved: ObjectHeader at :81,84; reads: \emph{ObjectParam} &::=&
- in the old line, not in the new: nothing
- every check passes

## Row 839, rewritten (1028 characters)
- lengths: row 1028 of 1,200, claim 300 of 300, notes 564 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:690-702` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): words moved: equalOptListParams at :372,710,735; reads: private def equalParams(left: Param, right: Param): Boolean =
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:372-374` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): words moved: equalParams at :690,707; reads: } else if (! equalOptListParams(toOptList(NodeUtil.getParams(declInAPI)),
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:710` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala): words moved: equalParams at :690,707; reads: private def equalOptListParams(left: Option[List[Param]],
- in the old line, not in the new: `:703-704`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:658-669`
- every check passes

## Row 870, rewritten (1036 characters)
- lengths: row 1036 of 1,200, claim 291 of 300, notes 541 of 700
- reproducer `ProjectFortress/tests/XXXGenericMethodTraitWhereWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/SingleFcn.java:231` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/SingleFcn.java): holds ge.getLeafType(we_name); reads: SymbolicInstantiatedType st = (SymbolicInstantiatedType) ge.getLeafType(we_name); // leaf
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:216` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java): holds SingleFcn.createSymbolicInstantiation; reads: List<FType> instantiationTypes = SingleFcn.createSymbolicInstantiation(bte, ap, getAt());
- in the old line, not in the new: `Constructor.java`, `Constructor.java:216`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 122: row 122: rewritten (890 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 124: row 124: rewritten (969 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 125: row 125: rewritten (1012 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 354: row 354: rewritten (1182 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 357: row 357: rewritten (1132 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 762: row 762: rewritten (1027 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 838: row 838: rewritten (1050 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 839: row 839: rewritten (1028 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 870: row 870: rewritten (1036 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 9 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 9 lines, 0 failing, every check passes.
