# Mechanical check of c27, the writer's files, base c124c6b65

## Row 20, rewritten (1175 characters)
- lengths: row 1175 of 1,200, claim 299 of 300, notes 684 of 700
- reproducer `none`: exists
- citations:
  - `Library/List.fsi:114` (Library/List.fsi): no word to check; reads: opr <|[\E\] xs: E... |>: List[\E\]
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi): holds FloatLiteral; reads: object FloatLiteral extends RR64
  - `explorations/run-b/probes/c11_object_model.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/spec-probes/p2_ascribe.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Library/List.fsi:112`
- every check passes

## Row 510, rewritten (1179 characters)
- lengths: row 1179 of 1,200, claim 279 of 300, notes 616 of 700
- reproducer `ProjectFortress/tests/XXXInferExpectedTypeRungK.fss`: exists
- citations:
  - `interpreter/evaluator/LHSEvaluator.java:218` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java): no word to check; reads: Type t = NodeUtil.optTypeOrPatternToType(type).unwrap();
- in the old line, not in the new: `LHSEvaluator`
- every check passes

## Row 705, rewritten (1111 characters)
- lengths: row 1111 of 1,200, claim 227 of 300, notes 686 of 700
- reproducer `ProjectFortress/tests/XXXInferCallArgumentWalk.fss`: exists
- citations:
  - `XXXInferCallArgumentWalk.fss:15` (ProjectFortress/tests/XXXInferCallArgumentWalk.fss): no word to check; reads: assert(takesBox64(mk()), "BoxT[ZZ64]", "takesBox64(mk()) instantiates mk at ZZ64, the parameter type of takesBox64; Specification/basic/infe
- in the old line, not in the new: nothing
- every check passes

## Row 717, rewritten (1041 characters)
- lengths: row 1041 of 1,200, claim 282 of 300, notes 546 of 700
- reproducer `ProjectFortress/tests/XXXNestedComprehensionDeclaredTypeWalk.fss`: exists
- citations: none with lines
- in the old line, not in the new: nothing
- every check passes

## Row 731, rewritten (1171 characters)
- lengths: row 1171 of 1,200, claim 288 of 300, notes 653 of 700
- reproducer `none`: exists
- citations:
  - `explorations/compile-ladder/rung-argument-context/REPORT.md:115` (explorations/compile-ladder/rung-argument-context/REPORT.md): holds BIG LAST; reads: - The same with an F-bounded big operator, `[\T extends StandardTotalOrder[\T\]\]` in place of `Number`: old and new alike, "Could not check
  - `Library/FortressLibrary.fss:4410` (Library/FortressLibrary.fss): no word to check; reads: n = BIG MIN[\ZZ32\][i <- self.indices, self[i]=c] i
  - `Library/FortressLibrary.fss:4416` (Library/FortressLibrary.fss): no word to check; reads: n = BIG MIN[\ZZ32\][i <- self.indices, self[i]=c] i
  - `Library/List.fss:151` (Library/List.fss): no word to check; reads: <|[\E\] self[i] | i <- r |>
- in the old line, not in the new: `:4402`, `Library/FortressLibrary.fss:4396`, `ProjectFortress/compiler_tests/InferBigOperatorUnwritten.fss`, `row 424`
- every check passes

## Row 825, rewritten (1094 characters)
- lengths: row 1094 of 1,200, claim 269 of 300, notes 674 of 700
- reproducer `ProjectFortress/tests/OpenParameterListComprehensionWalk.fss`: exists
- citations:
  - `Library/CovariantCollection.fss:17` (Library/CovariantCollection.fss): no word to check; reads: cast[\CovariantCollection[\R\]\](s)
  - `Library/List.fss:151` (Library/List.fss): no word to check; reads: <|[\E\] self[i] | i <- r |>
- in the old line, not in the new: `CovariantCollection.fss`, `CovariantCollection.fss:17`, `List.fss`, `List.fss:151`, `List.fss:179`, `[\E\]`, `xs[0:2:2]`
- every check passes

## Row 663, rewritten (886 characters)
- lengths: row 886 of 1,200, claim 255 of 300, notes 483 of 700
- reproducer `ProjectFortress/tests/OpenTupleDispatchWalk.fss`: exists
- citations: none with lines
- in the old line, not in the new: `MinMaxReduction.simpleJoin(a:(T,T), b:(T,T))`, `row 473`, `row 662`, `simpleJoin(a:Any, b:Any)`, `walk`
- every check passes

## Row 716, rewritten (1053 characters)
- lengths: row 1053 of 1,200, claim 290 of 300, notes 528 of 700
- reproducer `ProjectFortress/tests/XXXUnwrittenEmptyFloatSumUntypedWalk.fss`: exists
- citations:
  - `Library/FortressLibrary.fss:3395` (Library/FortressLibrary.fss): words moved: additiveIdentity at :2595,3394,3447; () -> ZZ32 at :3396,3413,4227; reads: typecase __thrower[\T\] of
- in the old line, not in the new: `Library/FortressLibrary.fss:3229`, `row 425`, `row 645`
- every check passes

## Row 824, rewritten (945 characters)
- lengths: row 945 of 1,200, claim 261 of 300, notes 482 of 700
- reproducer `ProjectFortress/tests/XXXPureListStridedSubscriptWalk.fss`: exists
- citations:
  - `Library/PureList.fss:73` (Library/PureList.fss): no word to check; reads: <| self[i] | i <- r |>
  - `Library/List.fss:151` (Library/List.fss): no word to check; reads: <|[\E\] self[i] | i <- r |>
- in the old line, not in the new: `<\|[\ZZ32\] 10, 12, 14 \|>`, `ArrayList[\FlatString\]`, `ArrayList[\Int\]`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 20: row 20: rewritten (1175 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 510: row 510: rewritten (1179 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 705: row 705: rewritten (1111 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 717: row 717: rewritten (1041 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 731: row 731: rewritten (1171 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 825: row 825: rewritten (1094 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 663: row 663: rewritten (886 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 716: row 716: rewritten (1053 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 824: row 824: rewritten (945 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 9 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 9 lines, 0 failing, every check passes.
