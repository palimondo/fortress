<!-- The FACTS clarity pass, chunk f7, 2026-10-22: F-90, F-220, F-225, F-226 and F-227 rewritten from the chunk's assessment, so that a reader without the batches behind them can tell what is established, under which conditions and on what evidence, with each entry's changes of meaning, the source of each sentence, and the points left for the coordinator. -->

# FACTS chunk f7: the rewrite

The base is `main` at `5ca623461`, as in `assessment.md`. The assessment keeps F-88, F-89, F-91, F-92, F-93 and F-221, and sends F-94 to investigation, so this file holds five entries: F-225, F-226 and F-227 to reword, F-90 and F-220 to reorganize. A section number is that of the report named. `clean.txt` holds the clean entries alone, and `concepts.md` the concepts that every worker needs. I could not run `record.py`, which needs approval in this session, so `record.py apply` of `proposals.apply` on a scratch copy and `record.py check` are still to run.

## F-90

- F-90 **In the interpreter's library, several array and matrix declarations and `SUFFIX_SUM` are written so that the compiled checker accepts them: the default vector and matrix and `TransposedMatrix` declare the array family's bound (F-151), `__immutableFactory1` answers an `ImmutableArray1`, `__ImmutableSubArray1` has no `put`, `Matrix`'s `mul` writes its parallel halves as `do … also do … end`, and `TransposedMatrix`'s `add`, `subtract` and `negate` call `Matrix`'s operators.** `SUFFIX_SUM` loops over `seq((0 # (|x| - 1)).reverse)`, since a strided range `a:b:c` is declared `Range[\ZZ32\]`, which is no generator, so the checker refuses `seq(a:b:c)` (row 661, open). The same work built P-53 (`String`'s `left` and `right` answer `Just(c)`) and P-54 (`QQ`'s `ceiling` and `truncate` raise at the infinities and 0/0). Gated by `tests/TransposedMatrixAndFreeze.fss`; the `String` and `QQ` parts by `tests/StringPieces.fss` and `tests/NumberOrderListDeclarations.fss`. Detail: `compile-ladder/rung-library-slips/REPORT.md` sections 1 and 6.

Meaning: narrower and corrected, as the assessment asks.
- The title claimed that "the array and matrix objects" answer their declared types. The rung repaired named declarations, and other array bodies got their type later through `cast` (F-264). The title now names the repairs and the check they pass.
- "`__immutableFactory1`'s body …, a site of the distance" is no longer true. The per-site list (`compile-ladder/gate/distance-sites.tsv`) has five sites, none of them the factory, and F-264 gives the factory's `cast`. The clause is dropped. Row 661 stays, joined to `SUFFIX_SUM`, whose `#` range it explains (report section 1, item 6).
- The bound now points to F-151, which owns it, not F-94. The library now declares F-151's bound on the three objects (`FortressLibrary.fss:2547`, `:2935`, `:2943`), not the `Number` alone that the rung wrote.
- `String`'s `left` and `right` and `QQ`'s rounding become the decisions that the work built, P-53 and P-54, with a few words each.

Sources: each repair, report section 1, items 1 to 6, checked in the library (`:2572`, `__ImmutableSubArray1` at `:2509-2520` with no `put`, the `also do` blocks at `:2874-2910`, `:2951-2953`, `SUFFIX_SUM` at `:4894-4898`); row 661's text; the tests, report section 2.

## F-220
- F-220 **The compiled checker accepts `__bigOperator`'s local `body`, typed `body(i: I): L` (`Library/FortressLibrary.fss`), so it is no error of the checker count (F-53).** F-228 holds how walk runs it: walk instantiates a big operator's static parameters from a declared type or the elements, not at `BottomType`. Gated under walk by `tests/UnwrittenListMapComprehensionWalk`. Detail: `compile-ladder/rung-walk-elements/REPORT.md` section 6.

Meaning: unchanged; the walk half is left to F-228. F-228's title already ends "so `__bigOperator`'s `body(i: I)` is typed", gated by the same test, so F-220 keeps only what F-228 does not hold: the compiled checker accepts the line.

Sources: the line, `Library/FortressLibrary.fss:1316`; the count's three errors, F-53, which do not include it.

The assessment prefers a merge into F-228. I did not merge, because F-228 is in chunk f12 or f13, and a merge here would rewrite another writer's entry. See "For the coordinator".

## F-225
- F-225 **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as also the implementing type, read from the trait's F-bound; it keeps the signatures plain, and refuses an extender at another type.** It builds P-146. A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. In a trait whose `comprises` clause lists types, `self` is instead the trait met with the union of those types. For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146); when it landed it cleared 29 sites of the distance, one measurement. Walk has no such rule and loads what it refuses. A compiled body that returns `self` fails verification when the parameter is an object type (row 695). The rule refuses the team demo `trips.fss`'s `generator` (row 710) and `PureList`'s `List` (row 355). Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7.

Meaning: narrower, as the code runs, and restored from the text of 2026-10-14 06:09Z. The rule holds in a trait with no `comprises` clause, or one that lists only `...`. With listed types, `self` is the trait met with their union (`scala_src/disambiguator/SelfParamDisambiguator.scala:77-83`, `:101-103`). "The library's 29 self-typed bodies check" becomes P-146's wording, with its exception `Integral`'s `numerator`, and the 29 are said as the distance sites that the rule cleared when it landed, one measurement (`rung-self-type/REPORT.md:3`, `:75`, `:132`).

Sources: the definition and the example of a refused extender, P-146; the rest unchanged, with "Walk loads what the rule refuses" said as walk having no such rule; rows 695, 710 and 355.

## F-226
- F-226 **The compiled checker renames an inherited method's own static parameters apart before it uses them: from its trait's in the overloading check, and from the receiver's static arguments at a call.** So `Generator.generate[\R\]`, inherited by `PossibleReductionPair[\R\]`, keeps its own `R` (row 561). At a call, each method that `commonInheritedMethods` returns is instantiated with those of its own static parameters whose names the arguments mention renamed to `name$i`, the form that the checker's messages print (row 627). So a method invocation and a call by name inside a trait get the same renaming. Gated by `compiler_tests/InheritedMethodStaticParamSameName`, `InheritedMethodByNameStaticParamSameName` and `MethodStaticArgReceiverSameName`. Detail: `compile-ladder/rung-overloading-checker/REPORT.md` section 6 (the overloading check); `compile-ladder/rung-checker-expected-type/REPORT.md` section 1 (the call).

Meaning: unchanged. The detail now cites the reports that hold each fix: `rung-overloading-checker/REPORT.md` section 6, "The capture", for row 561 (climb batch 8 rung O), and `rung-checker-expected-type/REPORT.md` section 1 for row 627 and `instantiateMethodApart` (climb batch 11 rung E). The old citations were a triage that only classifies the capture, and the report of row 651's bound check. "Are repaired alike" becomes "get the same renaming". `name$i` is said as the form that the checker's messages print.

Sources: rows 561 and 627, both fixed; `STypesUtil.scala:1838-1868`; `OverloadingChecker.scala:225`; the tests, the assessment's check.

## F-227
- F-227 **The compiled checker keeps an intersection that names a type or inference variable as written, and reads a variable below a union through the whole union or through its bound.** It expands a closed trait into its listed types only against a conjunct that names no variable (`normConjunct` and `pSubInner` in `scala_src/types/TypeAnalyzer.scala`). So a call through a parameter bounded by a closed trait and a bound that excludes a listed type checks, and the Return Type Rule accepts a valid overloading beside such a declaration (rows 686, 687, 689, 690 and 711). A `Box[\T\]` argument under a ground second bound stays refused (row 712). An overloading that the checker accepted through the expansion before this change is now refused, on a question that Appendix I lists as not settled (row 713, contested; `XXXOverloadTwoBoundsClosedTraitExclusion`). Gated by `compiler_tests/*TwoBoundsClosedTrait` and `*TwoGroundBounds*ClosedTrait`. Detail: `compile-ladder/rung-checker-bounds/REPORT.md` sections 1 and 6.

Meaning: one restoration, as the assessment asks. Row 713 is contested: Appendix I lists as unsettled whether two parameter types exclude where only static arguments that a bound rules out could meet them. The text of 2026-10-14 14:58Z said so, and the clean text says it again, with the gate that pins the refusal. "The base" becomes "the checker … before this change", the tree `ee1aa1a95` that rung-checker-bounds started from. The stale line numbers become the functions' names: `normConjunct` (now `TypeAnalyzer.scala:762-789`) and `pSubInner` (`:165-180`, the union cases). The Return Type Rule clause gets its verb: it accepts a valid overloading beside such a declaration (row 690).

Sources: report section 1 for the normal form and the union cases; rows 686, 687, 689, 690 and 711 (fixed), 712 and 713 from the ledger; the tests, `ls compiler_tests/`.

## For the coordinator

- F-220 and F-228: the assessment prefers to merge F-220 into F-228, adding to F-228 that the compiled checker accepts the typed line (F-53). I reduced F-220 instead, since F-228 belongs to another chunk. If the writer of F-228 adds that clause, `merge F-220 into F-228` removes F-220; no entry points to F-220.
- F-94 is under investigation and outside this file. F-90 no longer points to it. F-94's subject, after the investigation, is the trait table's memo alone.
- Run `record.py apply` and `record.py check`; this session could not.

No question for the curator.
