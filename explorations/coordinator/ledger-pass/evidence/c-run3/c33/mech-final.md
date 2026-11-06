# Mechanical check of c33, the judge's files, base c124c6b65

## Row 29, rewritten (1111 characters)
- lengths: row 1111 of 1,200, claim 171 of 300, notes 676 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/fortress/preamble.tex:59` (Specification-1.0-frozen/fortress/preamble.tex): no word to check; reads: \item multifix operators
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:994` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): no word to check; reads: if (s <= 2 || ((Op) op).isEnclosing()) {
  - `explorations/spec-probes/p13_multifix2.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 11, rewritten (768 characters)
- lengths: row 768 of 1,200, claim 54 of 300, notes 408 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/objects.tex:66` (Specification-1.0-frozen/basic/objects.tex): no word to check; reads: \note{The \KWD{transient} modifier and varargs parameters are eliminated.}
  - `Specification-1.0-frozen/fortress/preamble.tex:63` (Specification-1.0-frozen/fortress/preamble.tex): no word to check; reads: \item keyword and varargs parameters
  - `ProjectFortress/src/com/sun/fortress/parser/TraitObject.rats:198` (ProjectFortress/src/com/sun/fortress/parser/TraitObject.rats): holds Varargs parameters of objects are not allowed.; reads: log(span, "Varargs parameters of objects are not allowed.");
  - `explorations/spec-probes/p12_multifix.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/fable-review-probes/RvwVarargsObj.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 97, rewritten (1195 characters)
- lengths: row 1195 of 1,200, claim 240 of 300, notes 700 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/advanced/overloading.tex:258-262` (Specification-1.0-frozen/advanced/overloading.tex): no word to check; reads: \begin{itemize}
  - `Specification-1.0-frozen/basic/types-vals-vars.tex:544-547` (Specification-1.0-frozen/basic/types-vals-vars.tex): no word to check; reads: Neither intersection types nor union types are first-class types;
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:603` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): no word to check; reads: " are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present");
  - `explorations/run-b/probes/c10_anyvector_dispatch.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b2/probes/g4e_meet.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `explorations/compile-ladder/rung-exclusion-relax/REPORT.md`, `f(t: Tag[\String\])`, `f(t: Tag[\ZZ32\])`, `row 159`, `row 98`, `… are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present`
- every check passes

## Row 735, rewritten (1145 characters)
- lengths: row 1145 of 1,200, claim 253 of 300, notes 698 of 700
- reproducer `ProjectFortress/tests/XXXDottedMethodMeetInheritedWalk.fss`: exists
- citations:
  - `interpreter/evaluator/values/Constructor.java:182-183` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java): words moved: putIfAbsent at :846,854,859; reads: GHashMap<SingleFcn, FTraitOrObject> signaturesToTraitsContainingMethods =
  - `interpreter/evaluator/values/Constructor.java:846-859` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java): holds putIfAbsent; reads: signaturesToTraitsContainingMethods.putIfAbsent(sfcn, ft);
  - `Library/FortressLibrary.fss:2101` (Library/FortressLibrary.fss): no word to check; reads: trait DelegatedIndexed[\E,I extends Index\] extends Indexed[\E,I\]
- in the old line, not in the new: `8dd64e8fc`
- every check passes

## Row 265, rewritten (1189 characters)
- lengths: row 1189 of 1,200, claim 252 of 300, notes 697 of 700
- reproducer `none`: exists
- citations:
  - `explorations/apl/base/AplCore.fss:1158-1163` (explorations/apl/base/AplCore.fss): words moved: topF at :1165,1183; topA at :1166,1179,1181; topO at :1167,1182; try at :1176,2109,2121; reads: push(fv: Any, av: Any, ov: Any): () = do
  - `explorations/apl/base/AplCore.fss:1165-1167` (explorations/apl/base/AplCore.fss): words moved: fstk[n] at :1159; n := n + 1 at :936,1162; try at :1176,2109,2121; reads: topF(): Any = fstk[n - 1]
  - `explorations/apl/base/AplCore.fss:1172-1177` (explorations/apl/base/AplCore.fss): words moved: fstk[n] at :1159; n := n + 1 at :936,1162; topF at :1165,1183; topA at :1166,1179,1181; topO at :1167,1182; reads: aplCall(f: Any, l: Any, r: Any): Any = do
  - `explorations/apl/microgpt/checks/threads4_crash.txt`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `AplCore.fss:1827-1837` (explorations/apl/base/AplCore.fss): holds aplEachT2, aplEachT3; reads: aplEachT2(f: Any, a: Any, b: Any): (Any, Any) = do
- in the old line, not in the new: `Index -1 out of bounds for length 1024`, `checks/model_run_threads4.out`, `threads4.txt`, `threads4_crash.txt`
- every check passes

## Row 258, rewritten (1109 characters)
- lengths: row 1109 of 1,200, claim 256 of 300, notes 695 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/types-vals-vars.tex:263-264` (Specification-1.0-frozen/basic/types-vals-vars.tex): no word to check; reads: Every tuple type is a subtype of \TYP{Any}.
  - `explorations/apl/base/AplCore.fss:1726-1731` (explorations/apl/base/AplCore.fss): holds aplTup; reads: aplTup(rs: Array[\Any,ZZ32\]): Object
  - `explorations/apl/base/AplCore.fss:1743` (explorations/apl/base/AplCore.fss): holds aplTup; reads: elif aplAllMat(rs) then aplTup(rs)
  - `explorations/apl/microgpt/probes/x03_lib.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/apl/microgpt/probes/x04_gram.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `aplAllMat`, `x04_gram.fss`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 29: row 29: rewritten (1111 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 11: row 11: rewritten (768 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 97: row 97: rewritten (1195 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 735: row 735: rewritten (1145 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 265: row 265: rewritten (1189 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 258: row 258: rewritten (1109 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 6 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 6 lines, 0 failing, every check passes.
