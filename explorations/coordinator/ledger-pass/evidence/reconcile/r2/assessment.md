# Chunk r2 (reconcile): assessment

Marks, in order: scope, present meaning, evidence, comprehension, ownership, consistency. Pairs from `tmp/ledger-pass/c-run1/c28/final.pairs` (293/371), `c-run2/c13/final.pairs` (414/489), `c-run3/c21/final.pairs` (706/510), `c-run3/c33/final.pairs` (97/416). Read beyond the evidence: `ProjectFortress/tests/XXXNatSizeExclusionWalk.fss`; `Specification/basic/overloading.tex:333-350` (the `revival-dispatch` callout); `explorations/compile-ladder/rung-exclusion-relax/REPORT.md`, "The three homes"; the three run-c4 vocabulary probes at `11bf69c39^`; `climb-batch-19/RECORD.md:132`, `climb-batch-18/RECORD.md:152`; `c-run2/c22` and `c-run3/c33` assessments. No build, test or program run; no tracked file changed.

## Pair 414 / 489: siblings (both rewritten, siblings fields only)
Both rows already name each other in prose; the `Odd[\T\]` example shows both gaps at once (414's two instantiations of `Box`, hidden by 489's name capture; the rename to `Odd[\V\]` is 489's verdict change). It stays in 414, where it shows 414's gap; 489 gets it named concretely.

### 414: rewrite
- scope P; present meaning P; evidence P (`XXXNatExtendsTwice`, compiled, not re-run; cited line `TypeHierarchyChecker.scala:297` holds); comprehension P; ownership F: "Through row 489's name capture" names 489 but `siblings: 406, 790` omits it; consistency P (FACTS.md:45, :185, :248).
- Change: `siblings: 406, 489, 790`; "Through" -> "With". Dropped nothing.

### 489: rewrite
- scope P; present meaning P (`:333`, `:327` hold at c124c6b65, unchanged); evidence P; comprehension F: "It also hides a false clause in row 414's gap" does not say which; ownership F: siblings omit 414; consistency P (F-171 at FACTS.md:252 describes, does not say fixed; the signal is false).
- Change: `siblings: 414, 487, 490`; the sentence becomes "So it also accepts row 414's `Odd[\T\]`, refused as `Odd[\V\]`." Dropped nothing.

## Pair 706 / 510: siblings (510 rewritten, 706 kept)
Both are a static argument that only a call's result mentions, which walk does not fix: 510 at a typed binding, 706 at dispatch. 706 lists 510; 510 did not list 706.

### 706: keep
- All six P. The callout's claim checked: `overloading.tex:340-349` states the interpreter's departure and names only rows 538 and 496, so "names no row" holds. Reproducer `XXXGenericInstanceReturnOnlyWalk` green as an expected failure under holding gate a12ab5c60.

### 510: rewrite
- scope P; present meaning P (gated `XXXInferExpectedTypeRungK`, gate holds); evidence P; comprehension P (the batch-17 refused note, the method form, is already in the claim); ownership F: siblings omit 706; consistency P (F-55 at FACTS.md:52 agrees; the "record-says-fixed" signal is false).
- Change: `siblings: 705, 706`; "by the expected type" cut from the compiled sentence for room. Dropped: "by the expected type", which the sentence implies; history keeps it.

## Pair 97 / 416: a half moved (416 rewritten, 97 kept)
c-run3 rewrote 97 to keep its `Array` pair only as a pointer to 416, and handed 416 the instance and the compiled acceptance of `Tag[\ZZ32\]` beside `Tag[\String\]`, which 416 lacked.

### 97: keep
- All six P after c-run3's rewrite: claim keeps the two unrelated pairs; the `Array` pair points to 416 with `r01_native.fss` (tracked); probes gone but read from history as the template says; `OverloadedFunction.java:603` holds the message.

### 416: rewrite
- scope P; present meaning P (gated `XXXNatSizeExclusionWalk`, gate holds); evidence P; comprehension P; ownership F: lacks sibling 97 and row 97's `Array` instance and the compiled acceptance of the type form (`rung-exclusion-relax/REPORT.md`, "The three homes", item 5); consistency P (FACTS.md:41, :88, :185, :211, :232).
- Change: `siblings: 97`; adds both facts; the rationale sentence shortened; the pin's path shortened to `OverloadedFunction.java:589-604`; the Range sentence cut to its point.
- Dropped: "so the pair is a valid overloading" wording (kept as "Instantiation exclusion makes the pair valid"); `checkSelection2D`/`3D` names and "walk refuses one name over `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]`": home F-91 (FACTS.md:88 holds it) and the history.

## Pair 293 / 371: a half moved (both rewritten)
293's notes carried walk's unchecked `excludes` on a `Matrix` and `MultiplicativeRing` carrier and its broken inherited `+`; FACTS.md:230 places that at row 371. The failure moves to 371; 293 keeps the design limit and a pointer, and its probes (the carrier's probe among them).

### 293: rewrite
- scope F: the walk carrier and its `+` failure are row 371's defect; present meaning P (`FortressLibrary.fsi:1647`, `:1759` hold `excludes { AnyMultiplicativeRing }`); evidence P (probes gone, read from `11bf69c39^`); comprehension P; ownership F (as scope); consistency F against FACTS.md:230, which names row 371 for the carrier.
- Change: the carrier sentence becomes "A carrier extending both ... is no way out: the compiled checker refuses it, and walk loads it and its inherited `+` fails (row 371)"; the probe list names `v02_ring_excluded.fss` as the carrier's.
- mech.py's last line: "MECH: 6 lines, 0 failing, every check passes."
- Dropped: "`h h` is the ring's elementwise product", "(two `AdditiveGroup` instantiations)": home the history (old line whole); the `+` error text: home row 371.

### 371: rewrite
- scope P; present meaning P; evidence P (reproducer none, probes named in history); comprehension P; ownership F: lacks the carrier form and sibling 293; consistency F against FACTS.md:230 (it names row 371 for the carrier's `+` failure, which the row did not hold).
- Change: `siblings: 293, 551`; the carrier form added, with its error's tail 'has neither body nor def instanceof Method'; the row-414 parenthesis shortened to "(row 414)"; small rewordings for room ("refusing with", "or one where", "its object an `Object`").
- Dropped: the `O[\nat n\]` program in the parenthesis: home row 414's claim; the error's `** bug! MethodClosure +(…) …` head: home the history (293's old line). The batch-19 refused note (the `Tx` form) is already in the row.
