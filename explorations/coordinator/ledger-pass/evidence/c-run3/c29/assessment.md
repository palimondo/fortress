# c29 assessment (c-run3, base c124c6b65)

Marks, in order: scope, present meaning, evidence, comprehension, ownership, consistency. Read beyond the evidence files: `IndexBuilder.scala:180-190`, `TypeAnalyzer.scala:695-708` and `:1075-1077`, `impls/Dispatch.scala:60-73`, `impls/Misc.scala:157,199`, `impls/Decls.scala:76,313`, `EvalType.java:318-321`, `Fcn.java:55-72`, `FValue.java:130-145`, `GenericFunctionOrConstructor.java:40-58`, `EvaluatorBase.java:570-590,895-940`, `TypeLatticeOps.java:34-42`, `NamingCzar.java:1454-1466` (and its text at `ae4f8e38a`), `Functionals.scala:296-385`, the three `XXX` `.test` files, `PreParserState.java:173`, `NonPrimitive.java:216`, `LocalDecl.rats:241`, `Evaluator.java:893-900`, `explorations/aliases-units-report.md:95-101`, `perf-probes/transactions/run.sh` and REPORT.md header, F-182, F-265, the deleted probe `p06_cross.fss` from `1ee3b0bc5^`; `git log` of the cited walk files since `ae4f8e38a`. No tracked file changed; no build, test or program run.

## 18: rewrite
- scope pass; present meaning FAIL: "Expansion is written (`TypeAnalyzer.scala:554`)" — line 554 is now `pOr(...)`, the expansion is `TypeAliasIndex` at `:703`; claim "specified and unimplemented" does not say what fails or where (both paths, the index builder, F-182); evidence pass (aliases-units-report runs on all three commands); comprehension pass; ownership pass; consistency pass (F-182 agrees).
- New line: the claim names the stop and the paths; pins `IndexBuilder.scala:187` and `TypeAnalyzer.scala:703`; output with its report line. Nothing dropped.

## 26: rewrite
- (Probe paths written whole, as mech.py asks; the `TaggedDimType` message kept as one token.)
- present meaning FAIL: "the typechecker throws on the declaration" with no pin; the index builder reads a `dim` (`IndexBuilder.scala:184`), so the throw is the checker's `checkMisc` default (`Misc.scala:199`), reached by `Dispatch.scala:73`; evidence: probes gone, explained; comprehension FAIL: the three messages had no site. Others pass.
- New line: claim names walk and the compiled checker; pins `EvalType.java:320`, `Misc.scala:199`, `Dispatch.scala:73`; probes' folder named once. Dropped: nothing (the probe paths shortened, folder given).

## 156: rewrite
- present meaning: mechanism holds at the base (code unchanged since the row: `Fcn.java:67-71` returns null `ftype`, its comment naming this case; `EvaluatorBase.java:939`; `FValue.java:141`; `GenericFunctionOrConstructor.java:52`); comprehension FAIL: `FValue.java` is ambiguous (two files); the mechanism ("has no `FType`") had no pinned line; consistency FAIL: siblings 165 and 758 not named; evidence: probes gone (`q02*`, `lift_g2.fss`) — the "probe and full text: history, row 156" marker holds them.
- Dropped: the probe names `q02b_arrow.fss`, `q02c5_plainarrow_generic`, `q02c4_genericgeneric`, `lift_g2.fss`, `q02c1_plainplain` (home: history, row 156, whose earlier line lists all seven with their paths `run-c/probes/`, `run-c3/probes/`).
- Not re-run: walk's inference files changed since (`20474c144`, `9879d4386`, `5262a2412`, `369982d85` touch `EvaluatorBase.java`), but none touches the null `type()` of a generic function value or the two checks it fails; the claim stands by reading.

## 396: rewrite
- comprehension FAIL: `NamingCzar.java:1415-1419` moved (+46): the unboxed tuple branch is now `forTupleType` at `compiler/NamingCzar.java:1454-1466`. All else passes; `VarCodeGen.java:547`, `:730` hold; the XXX test asserts `run_err_contains=java.lang.ClassFormatError`.
- New line: only the pin. Nothing dropped.

## 471: rewrite
- comprehension FAIL: `EvaluatorBase.java:358-366` is the comment and signature of `instanceOf`, not the bound's installation; the generic-function path installs it with `abm.meetPut` at `:905` and `TypeLatticeOps.java:42` is the `bug`; consistency FAIL: "(climb batch 21 rung B)" is a batch name in the notes. FACTS F-265 agrees (row open); the `record-says-fixed` signal is F-265's own text, not a fix.
- Dropped: "climb batch 21 rung B" (home: history, row 471, and the found-by of the batch's record). The row is at about 1,190 characters; a later note needs a cut.

## 506: rewrite
- comprehension FAIL: "`Functionals.scala:358` at 052a7c3fe" and "`:360-368`" moved (+12): the cap is `combos.size > 64` at `:370`, the coupling by the expected type is `context` in `constraint` at `:379-381`; ownership/consistency FAIL: found-by "rung I's skeptic" names a role; `siblings: 401` names a closed row.
- Dropped: sibling 401 (FIXED; home: history, row 506, and row 507's line, which names 401's shape); "'s skeptic" (history).

## 507: rewrite
- comprehension FAIL: "`:305` at 052a7c3fe" pins an old commit (the line holds at the base: `if (args.exists(_.isRight)) return notApplicable`); "the repair is the argument-inference loop …" is a repair design, rewritten as the mechanism (the loop at `:181` does not run inside the coercion attempt at `:296`); found-by names the skeptic; `siblings: 401` names a closed row. F-51/F-78 lines (FACTS.md:70, :75) agree.
- Dropped: sibling 401 as a sibling (kept as "the shape of row 401 (closed)"); "'s skeptic".

## 758: rewrite
- present meaning FAIL: "On the base (3aea3da53) and since rung A" is a batch story; comprehension FAIL: `TypeAnalyzer.scala:981` moved (+96), the `bug` is at `:1077`; found-by names the skeptic. Others pass.
- Dropped: "On the base (3aea3da53) and since rung A" (history, row 758, which keeps the line whole).

## 165: rewrite
- comprehension FAIL: no pinned line for either message; now `PreParserState.java:173` (parse time) and `NonPrimitive.java:216` (walk). The "implementation gap (walk)" sentence folded into "walk applies the declaration to no arguments". Others pass; probes explained.
- Dropped, for the 700-character notes limit: the words "an implementation gap (walk)", the `InterpreterBug: ` prefix of the walk message (the claim still says `InterpreterBug`), "(no `OpRef` in it)" (the evidence for the grammar sentence; `grep -c OpRef Specification/appendices/grammars/concrete-syntax.tex` prints 0), and the `.fss` of `lift_g3b`, `lift_g3d`, now named as beside `lift_g3.fss`. Home of each: history, row 165, which keeps the old line whole.

## 184: measure
- present meaning FAIL: "Verified on the retired first library only, in a worktree of `0ff5eae27~1`": never run on the present library, and the original stop fired inside an `apl⦇ ⦈` expansion; evidence FAIL: probes gone, no run; silent: `defect` (silent.txt). The bug site still exists (`Evaluator.java:896`). Question in `questions.md`.

## 108: rewrite
- comprehension FAIL: no pinned line for the refusal: `parser/LocalDecl.rats:241`. Probe sentences merged into one. Nothing dropped.

## 641: rewrite
- evidence FAIL: the reproducer `TxArray.fss` is a compiled probe, and the evidence's walk run stops at load, `ZZ32Vector is undefined.` (exit 255); the probe's command is `run.sh` beside it (compiled path, base against shadow); consistency FAIL: `siblings: 302`, all closed (FIXED).
- New line: reproducer `explorations/perf-probes/transactions/run.sh`; notes say compiled only and give walk's refusal. Dropped: `siblings: 302` (home: history, row 641; REPORT.md, which cites the fixed debug message).

## Pairs, duplicates, closes
- No duplicate: 156 (walk) and 758 (compiled checker) state one capability on two paths; made siblings both ways. 165 and 156 siblings both ways.
- No pair for the reconcile run: the other-chunk overlaps (18/850, 396/624, 507/764, 471/591) name different defects.
- No close.
