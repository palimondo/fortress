# Check of reconcile r2, base aa6e4ebee

`mech.py`: "MECH: 6 lines, 0 failing, every check passes." Closes, duplicates, pairs and silent are empty; questions.md measures nothing. Rewritten: 414, 489, 510, 416, 371, 293. Kept: 97, 706.

## Row 414: pass
- Fidelity: `TypeHierarchyChecker.scala:297` reads `if ( new_analyzer.definitelyExcludes(st, other) )`; `079f54ea9`'s skeptic section holds the `Odd[\T\]` acceptance and the `Odd[\V\]` refusal (`SkCrossedSameName.fss`, `SkCrossedRenamed.fss`). The edits (sibling 489, "Through" to "With") claim nothing new.
- Nothing lost: mech lists nothing dropped. Present, reproducer (`XXXNatExtendsTwice.test` exists, `run_out_contains=REACHED`), status, form: pass. Cold read: the doubts ("the type twin", the hash as subject) a worker resolves from the claim and the commit.

## Row 489: fail
- Passage: "is refused ('immediate subtype Marked is not eligible'), and accepted spelled `Paired[\T\]`" together with the new "So it also accepts row 414's `Odd[\T\]`, refused as `Odd[\V\]`."
- Source: the cold read's first "Could not resolve" item (which verdict is right; `Marked`'s declaration not given; "subtrait" and "extender" not tied to the names). `ProjectFortress/compiler_tests/XXXComprisesGenericRenamed.fss:7` declares `trait Marked[\T, U\] extends Crate[\T\]`, so `Paired[\S\]` reaches only `Crate[\S\]` and its refusal is the error (the test is an `XXX` expected failure; `079f54ea9`'s skeptic says the local repair "accepts the renamed program"). For `Odd[\T\]` the acceptance is the error (`079f54ea9`: "a value of `Box[\ZZ32\]` that belongs to no listed type"). The new "So it also accepts" reads as the same direction as the `Paired` case, which it is not.
- Correction (three replacements in the new line; measured: row 1146, claim 230, notes 694):
  1. "under `Crate[\T\] comprises { Filled[\T\] }`, is refused ('immediate subtype Marked is not eligible')" -> "under `Crate[\T\] comprises { Filled[\T\] }` and `Marked[\T, U\] extends Crate[\T\]`, is wrongly refused ('Marked is not eligible')"
  2. "checks the extender against `subst_comprises` (`:327`), in the subtrait's variables, not substituting the extender's arguments to the subtrait." -> "checks `Paired` against `subst_comprises` (`:327`), in `Marked`'s variables, not `Paired`'s arguments."
  3. "So it also accepts row 414's" -> "The same capture wrongly accepts row 414's"
- Otherwise pass: `:333` and `:327` hold; sibling 414 is right; nothing dropped.

## Row 510: pass
- Fidelity: unchanged claim; only sibling 706 added and "by the expected type" cut, which the sentence implies (history keeps it). `XXXInferExpectedTypeRungK.fss` asserts `3 : ZZ64` for `a: BoxK[\ZZ64\] = wrapK(3)`; `ProjectFortress/tests/XXXExpectedTypeFixRungT.fss` exists; F-228 (FACTS.md:206) is the "clause form" the row means; P-12 (POSITIONS.md:12) says walk is not changed for this before the switch-over, consistent with "is the curator's".
- Cold read: `Int`, "clause form", the test's folder resolve from the error text, F-228 and the tests folder; not failures.

## Row 416: fail
- Passage 1 (notes): "Two generic declarations that differ only in an element type load (F-155). So `checkSelection` is named by rank (`Library/RangeInternals.fss:125-172`; F-91)."
- Source: the cold read calls it "the hardest passage in the file": with "walk refuses one name over `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]`" cut, "So" follows nothing. F-91 (FACTS.md:88) gives the reason: "named by rank since walk refuses overloads of one name over two instantiations of `Range` (row 416)". The cut tokens' home is F-91, but the remaining sentence no longer says why it is in the row.
- Passage 2 (claim): "and overloads on two traits extending `Tg[\3\]` and `Tg[\4\]`" reads as walk accepting them; the history's form (fortress-gap-ledger-history.md:2497) is "it refuses ... and overloads on two traits that extend".
- Correction (two replacements; measured: row 1177, claim 280, notes 700):
  1. "and overloads on two traits" -> "and refuses overloads on two traits"
  2. "Two generic declarations that differ only in an element type load (F-155). So `checkSelection` is named by rank (`Library/RangeInternals.fss:125-172`; F-91)." -> "Generic pairs load (F-155). The refusal over `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]` is why `checkSelection` is named by rank (`Library/RangeInternals.fss:125-172`; F-91)."
- Otherwise pass: the new compiled claim holds (`rung-exclusion-relax/REPORT.md:104`, item 5; its probe `ProbeMIEOverload.fss`, at `9269f7bd2^`, prints "f on Tag[ZZ32]" and "f on Tag[String]" with `-Dprobe.rungP=off`); row 97's `Array` pair holds (`explorations/apl/rung-1/r01_native.fss` tracked). Dropped tokens: the full `OverloadedFunction.java` path has its home in row 97 (sibling, full path at `:603`), `checkSelection2D`/`3D` in F-91.

## Row 371: fail
- Passage: "Walk skips `TypeHierarchyChecker` (`.../StaticChecker.java:166-190`), refusing with 'Types A and B exclude each other'"; and "its object an `Object`".
- Source: the old line read "which refuses with" and "whose object is an `Object`"; the rewrite's participle makes walk the subject of "refusing", which the cold read reports ("on a first read it seems to say walk refuses"); walk runs the program, as the claim says.
- Correction (measured: row 1145, notes 696): "`), refusing with 'Types" -> "`), which refuses with 'Types"; "its object an `Object`;" -> "whose object is an `Object`;".
- Otherwise pass: the carrier form holds (`v02_ring_excluded.fss` and `.out.0` at `11bf69c39^`: the object `HMat` extends `Matrix[\RR64,r,c\]` and `MultiplicativeRing[\HMat[\r,c\]\]`, loads, `×` prints, `h + h` fails "has neither body nor def instanceof Method"); F-152 (FACTS.md:230) places it at row 371. Dropped: the `O[\nat n\]` program is in row 414's claim; the error's head is in the history.

## Row 293: pass
- Fidelity: `FortressLibrary.fsi:1647`, `:1759` read `excludes { AnyMultiplicativeRing }`; the carrier probe at `11bf69c39^` shows walk loading it and `+` failing; "the compiled checker refuses it" is the old line's "The checker refuses such a type".
- Nothing lost: `** bug! MethodClosure +(...)` text: home row 371 (tail) and the history; `h h` (elementwise, `v02b_ring_juxt.out`) and "its `×` works", `AdditiveGroup`: home the history. Present, reproducer `none` with probes and how to read them, status, form: pass. Cold read: `NEGATIVE-VERIFIED` on a design limit is as the template defines it; `AnyMultiplicativeRing` resolves from the library.

## Row 97 (keep): pass
- `OverloadedFunction.java:603` holds "are unrelated (neither subtype, excludes, nor equal)"; the frozen specification's cited lines are unchanged since the row's commit; no commit touches its files; the probes are read from the parents of `ed6dafb52` and `22ea0cd90` as the row says; `r01_native.fss` tracked.

## Row 706 (keep): pass
- `Specification/basic/overloading.tex:333-349`, the `revival-dispatch` callout, states the interpreter's departure and names only rows 538 and 496, both of the compiled path, so "names no row" for walk's departure holds. The two later commits touching cited material move the POPL papers only. Reproducer `XXXGenericInstanceReturnOnlyWalk.fss` exists.
