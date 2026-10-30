# Rung O (`rung-export-operators`) of climb batch 22c: record lines for the gather

Written by the rung worker for the gather's fold. The branch is `wip/rung-export-operators`:
- `5046b1619`, the change with its two tests (`<O>` below);
- `95f31de40`, its speed pass.

The harness refused the worker's write of this file and of `REPORT.md`, so their text is in the run's journal. The detail is in `REPORT.md`, by section.

## Findings

1. **The export check reads every top-level operator of an api, under its declared name only.**
   - The claim: it admits a name by the overloading check's `isCheckedName`, and only a key under which a declared function is filed by its own name (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:275`, `:597-606`). So the span key that `IndexBuilder.buildFunction` also files each function under (`scala_src/typechecker/IndexBuilder.scala:444-446`) is never read.
   - Conditions: the compiled checker (`fortress compile`, the count and distance stages), from `<O>`. For identifiers, it admits exactly what `isDeclaredName` admitted.
   - Evidence:
     - `compiler_tests/XXXExportOperatorHeader` compiles on the base ('Saw wrong failure') and is refused after the change ('Missing declarations: {#(a:String,b:String):XXXExportOperatorHeader.A ...}', 'Saw expected failure').
     - `compiler_tests/ExportOperatorMatch` passes on both. It turns red under a check that admits operators and reads the span keys ('Missing declarations: {#(a:String,b:String):String at .../ExportOperatorMatch.fsi:4:1-6:1}').
   - What it means: the export zero now covers the operators (P-155, read to cover the export check).
2. **The twelve components match their apis with the operators read.**
   - The distance stage on `95f31de40` (setting any, twelve components): '#total 0', '#kind export 0', '#crash none'. Every component's export stage reads 'errors=0'.
   - `compare.sh` against climb batch 22's table: 'DISTANCE SAME 0'. `compare-sites.py`: 'landed 0 now 0', no site.
   - The count stage: '#total 0', '#locations 0', '#crash none', with one more row, 'CovariantCollection 0', since `List`'s api imports it.
   - What it means: rows 782 and 827 close with `<O>`.
3. **The 9 headers are stated once on both sides, by the library's rule.**
   - The component's `#` ×3 and `:` ×3 answer the api's `CompactFullRange[\ZZ32\]`, `[\(ZZ32,ZZ32)\]` and `[\(ZZ32,ZZ32,ZZ32)\]` (`Library/FortressLibrary.fss:4164-4178`).
   - The api's `BIG ||` and `BIG |||` over a generator are `[\T\](g: Generator[\T\]): String` (`Library/FortressLibrary.fsi:2128`, `:2135`), as its `BIG //` is (`:2142`).
   - `List`'s api imports `CovariantCollection.{AnyCovColl}` and states `Comprehension[\T,List[\T\],AnyCovColl,AnyCovColl\]` (`Library/List.fsi:14`, `:116`).
   - Walk: `ant testSystem` 683 and `ant testSpecData` 130, no failure.
   - What it means: Part IV renders `BIG ||` and `BIG |||` generic, and `List`'s new comprehension type.
4. **Reading the operators costs the export check about 3.8 s of the count stage, after a speed pass that halved it.**
   - The profile, on `5046b1619`: 696 of 12,719 samples under `ExportChecker`, 692 of them in `OverloadingChecker.coverOverloading`. The operators' loop took 7,638 ms over 67 names, the identifiers' 152 ms. `juxtaposition` alone took 3,265 ms (19 functions, 11 of them declared).
   - The pass: `uncoveredDeclarations` (`ExportChecker.scala:608-621`) makes the cover test only for the declared functions that the answer keeps.
   - The audit, on one full run: 144 names, 144 answers equal. The loop then took about 3.8 s.
   - The count stage, one run each: base 163.0 s, change 170.1 s, pass 168.7 s. `pass`'s table and output equal `change`'s.
   - What it means: P-148's pass is done, and a reading of the trait members' operators can expect a cost of the same order.
5. **No operator of the compiler's prelude or of a compiled test is refused.** The library order compiles all five, rc 0, with `CompilerLibrary.fsi`'s 14 top-level operators read. `ant testQuick` on `95f31de40`: 1318, 86 and 263, no failure.
6. **`List`'s api's new import moves the first error of every compiled program that imports `List`, but not its phase.**
   - On the old code against the new, the 20 such files of the ladder subset stay at disambiguate. Their first error goes from 'ZeroIndexed is undefined.' to 'ImmutableArray is undefined.', the first of `CovariantCollection.fsi`'s names that the compiler's prelude lacks.
   - `ListTest` reports 11 errors where it reported 6.
   - This holds until the switch-over only.
   - What it means: row 71's notes, as rewritten below.

## FACTS.md

**F-287, rewritten:**

- F-287 **The export check reads every top-level operator of an api under its declared name, and the 157 top-level operator declarations of the twelve apis match their components.**
  - It admits a name by `isCheckedName`, and only a key under which a declared function is filed by its own name, so the span key that the index also files each function under is never read (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:275`, `:597-606`).
  - The 9 that differed are stated once on both sides, by the library's rule: the component's `#` and `:` at the api's `CompactFullRange` types, the api's `BIG ||` and `BIG |||` generic, and `List`'s api at its component's comprehension type.
  - A narrower return type in the component is refused at the api's header, which the text accepts (NEW-O-1).
  - Gated by `compiler_tests/XXXExportOperatorHeader`, `ExportOperatorMatch` and the distance stage's per-site list.
  - Detail: `compile-ladder/rung-export-operators/REPORT.md` sections 1, 2 and 5.3.

**F-282:** its clause "it skips every top-level operator (F-287)" becomes "it reads every top-level operator under its declared name (F-287)".

**F-281:** its clause "the export check still reads `isDeclaredName`, so it skips every top-level operator and hides 9 differences between the api and its component (row 782; F-287)" becomes "the export check reads every operator too, each under its declared name only (F-287)".

## Ledger

- **Row 782**: close, `--commit <O> --test XXXExportOperatorHeader` (`ProjectFortress/compiler_tests/XXXExportOperatorHeader.test`).
- **Row 827**: close, `--commit <O> --test explorations/coordinator/tools/distance/run.sh`.
- **Row 71**, rewritten: its notes' error count, first error and lines moved with `List`'s new import. The whole line, checked with `ledger.py check --rows` (0 fail):

| 71 | `import List` fails on the compiled path: the compiler's prelude has no `ZeroIndexed`, `LexicographicOrder`, `Comprehension`, `BigReduction`, `MonoidReduction`, `Indexed`, `ImmutableArray` or `Array`, which `Library/List.fsi` and the `Library/CovariantCollection.fsi` that it imports name | NEGATIVE-VERIFIED | library gap vs spec (prelude) | `Specification/library/optional-libraries.tex`, "List" | none | ours | The refusals (11 errors, rc=255, `tests/ListTest.fss` at `95f31de40`) are raised inside the two apis: `CovariantCollection.fsi`'s first, `ImmutableArray` (`:23`), `Array` (`:24`, `:25`), `MonoidReduction` (`:45`), `Comprehension` (`:53`), then `List.fsi`'s `ZeroIndexed` (`:69`), `LexicographicOrder` (`:70`), `Comprehension` (`:116`), `BigReduction` (`:119`), `Indexed` (`:126`) and `MonoidReduction` (`:137`); walk runs the same file to `PASS`. `HasRank` and `Maybe` are declared (`Library/CompilerLibrary.fsi:272`, `:221`). The prelude is deleted at the switch-over. full text: history, row 71 |

- **NEW-O-1**, new, in section "3. Traits, objects and components". Checked with `ledger.py check --rows`: only the placeholder number fails.

| NEW-O-1 | the compiled export check asks a component's top-level function or method at its api declaration's own header, where the text accepts a declaration whose return type is a subtype: a component's `opr #(a: String, b: String): B`, `B` extending `A`, does not satisfy its api's `#` answering `A` | CONTESTED | design limit (specification) | `basic/components/source-code.tex`, "Export Statements" | `ProjectFortress/compiler_tests/XXXExportOperatorHeader.test` | climb batch 22c's planner | siblings: 768, 769, 827. `existsMatching` asks one component declaration with an equal header, return type included (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:431-437` at 95f31de40); the text asks only that each return type be a subtype (`source-code.tex:355-360`, methods `:399-404`). A compiled call names the api's header, so a narrower one dies: row 827's probe, `NoSuchMethodError: 'P782Api$A P782Api.#(...)'`. Not decided: the check's rule, or the text's with the code generator emitting a bridge at the api's descriptor, which no probe has designed. The library states one header on both sides, so either rule passes it. |

- **For the gather, a comment made false** in a file this rung does not edit: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:768-769`, "the export check reads isDeclaredName itself". It now reads `isCheckedName` and `isDeclarationName`.

## Handover line

Climb batch 22c, rung O (the export check reads top-level operators), is on `wip/rung-export-operators`:
- the check admits every operator under its declared name (`5046b1619`), and its speed pass (`95f31de40`) halves the operators' cost;
- the library's 9 headers match: `#` and `:` at the api's `CompactFullRange` types, `BIG ||` and `BIG |||` generic in the api, and `List`'s api at its component's comprehension type;
- `XXXExportOperatorHeader` and `ExportOperatorMatch` pass;
- distance 0 over the twelve, '#crash none'; count 0, with the new row `CovariantCollection 0`;
- testQuick 1318/86/263, testSystem 683 and testSpecData 130, no failure;
- rows 782 and 827 to close, NEW-O-1 open (question 4), row 71 rewritten.

## Revival change

**The change.**
- **The team's check.** The team's export check compared an api's top-level function with its component's only when the function's name was an identifier or an operator named by a word of capitals (`isDeclaredName`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:275` at `a874948ac`). A symbolic operator such as `#`, `:`, `+` or `BIG ||` was never compared, so a component could declare one at another header than its api's.
- **What the tree does now.** The tree compares every top-level operator by the rule it applies to any function: one component declaration at the api declaration's header, its return type included.
  - A component's `opr #(a: String, b: String): B`, with `B` extending `A`, against its api's `#` answering `A`, is refused: 'does not define all declarations' (`ProjectFortress/compiler_tests/XXXExportOperatorHeader`).
  - An operator at its api's header links and runs (`ProjectFortress/compiler_tests/ExportOperatorMatch`).
- **Against the specification.** The specification lets a component's declaration answer a subtype of the exported return type (`Specification/basic/components/source-code.tex:355-360`). So for operators, as for named functions before, the check is stricter than the text.
- **The library.** The library states one header on both sides:
  - the component's `#` and `:` answer the api's `CompactFullRange` types (`Library/FortressLibrary.fss:4164-4178`);
  - the api's `BIG ||` and `BIG |||` over a generator are generic, as the team's component and the api's `BIG //` are (`Library/FortressLibrary.fsi:2128`, `:2135`, `:2142`);
  - `List`'s api imports `CovariantCollection.{AnyCovColl}` and states its component's comprehension type (`Library/List.fsi:14`, `:116`), where the team's api named `List[\T\]` (`Library/List.fsi:110` at `a874948ac`).
- **The reason.** A compiled call names the api's header, so a component that answers a narrower type dies at the call. A two-file program whose component's `#` answers `B`, where its api's answers `A`, compiles and links, and its client's run ends `java.lang.NoSuchMethodError: 'P782Api$A P782Api.#(fortress.CompilerBuiltin$String, fortress.CompilerBuiltin$String)'`. Answering `A`, it prints `PASS`. The skipped operators hid 9 such differences in the library's twelve apis.

**Provenance.**
- P-155, "The compiled checker checks symbolic operators before the switch-over", read to cover the export check: climb batch 22c's question 2, answered option 1 by the curator ("Of course, it's option one.").
- The check's rule against the text's: question 4, built at its default (the check's rule), with NEW-O-1 `CONTESTED`.
- The double key fixed in the check rather than the index: fork 5's default. The headers by the library's rule: fork 6's default.
- Climb batch 22c, rung O.
