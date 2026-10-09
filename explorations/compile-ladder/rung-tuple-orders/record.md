# Record lines: climb batch 13, rung O (`rung-tuple-orders`)

The harness refused the write of this file; the text is the record.

## FACTS

Add to "The checker and the one library":

- **The one library's order operators on pairs and triples bound each element by `StandardPartialOrder`. Walk refuses, at the call, a pair or triple with an element of another type, also where earlier elements decide, and answers `false` (or `Unordered` for `CMP`) where the deciding elements are unordered** (`compile-ladder/rung-tuple-orders/REPORT.md`; row 634's tuple half).
  - Where it lives: `Library/FortressLibrary.fss:4457-4566`, api `.fsi:2628-2638`.
  - `Comparison` declares the lazy `LEXICO` with `TotalComparison`'s and `EqualTo`'s arms (`.fss:139`, `:179`, `:214`), whose answers are the specification's table (`Specification/advanced-lib/comparison.tex:168-180`).
  - Walk's refusal is "Failed to find any matching overload, args = ...": `((1,2),3) < ((1,3),0)` and `(1,()) < (2,())` are both refused.
  - Walk also refuses a pair or triple whose elements at one position are numbers of two run-time types, since it takes the element type at their join, which is no `StandardPartialOrder` (row 511): `(1,2) < (1,2.5)` and `(1,2) < (widen(1),2)`. Operands declared with one type, such as `p: (ZZ32,RR64) = (1,2)`, are converted at the declaration and compare as before.
  - Walk types a function expression without a declared return type as `()->BOTTOM` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java:239`), so a thunk fits every `()->T` arm and walk takes the most specific; only `Unordered` on the left reaches `Comparison`'s lazy default.
  - Gated by `tests/TupleOrderBounds.fss`, `TupleOrderNestedRefused.fss`, `TupleOrderUnitRefused.fss` and `TupleOrderMixedRefused.fss`.

Rewrite in place two entries of the same section:
- The entry "The one library's numbers, orderings, List and natives answer their declared types ...": its "Left with rows: the tuples' comparisons and `LexicographicOrder` (634)" becomes "Left with rows: `LexicographicOrder` (634's list half; the tuples' comparisons repaired by `compile-ladder/rung-tuple-orders/REPORT.md`)".
- The entry "The one library's Meet Rule pairs inside one type are repaired by declarations on the meet ...": its "Left: `isLeftZero` (row 582) and `distribute` (row 433)" becomes "Left: `distribute` (row 433); `isLeftZero` is declared over `TotalComparison` (row 582, `compile-ladder/rung-tuple-orders/REPORT.md`)".

## Ledger

- **Row 634.** Append, and leave the row open:
  "The tuple half is repaired by climb batch 13 rung O (636d687b3), under item 43's default, way 1b:
  - the ten operators bound each element by `StandardPartialOrder` (`Library/FortressLibrary.fss:4457-4566`, `.fsi:2628-2638`);
  - the eight `typecase`s answer `Unordered => false`;
  - `Comparison` gains the lazy `LEXICO` with its `TotalComparison` and `EqualTo` arms;
  - the 17 sites are gone.
  Walk refuses `((1,2),3) < ((1,3),0)` and `(1,()) < (2,())` at the call with 'Failed to find any matching overload, args = ...', not 'Cannot unify' (`TupleOrderNestedRefused`, `TupleOrderUnitRefused`); it refuses `(1,2) < (1,2.5)` too, a pair whose second elements are numbers of two types, which it answered `true` (`TupleOrderMixedRefused`; row 511); and the pin `NumberOrderListDeclarations.fss:41` went. `Reflect`'s `members` built a set of triples whose third element is no partial order, so it now builds a list (`Library/Reflect.fss:137-146`). Left: `LexicographicOrder`'s `a CMP b` (`FortressLibrary.fss:1935` at 636d687b3), for the `where`-clause line."
- **Row 582.** Append this note, then close it: `ledger.py close 582 --commit 636d687b3 --test LibraryMeetDeclarations`.
  Note: "Following the curator's decision (POSITIONS, '`LexicographicReduction.isLeftZero` takes `TotalComparison` ...'), climb batch 13 rung O declares `isLeftZero(_:TotalComparison)` (`Library/FortressLibrary.fss:123`, `.fsi:93` at 636d687b3). `LessThan` and `GreaterThan` answer `true` and `EqualTo` `false`, as `Specification/advanced-lib/comparison.tex`, trait `Fortress.Standard.TotalComparison`, method `isLeftZero`, gives them. The two sites are gone, and the count's api rows are all 0."
- **Row 667.** Append this note, then close it: `ledger.py close 667 --commit 636d687b3 --test IntMapCombine`.
  Note: "Climb batch 13 rung O writes `genComb` in each object (`Library/IntMap.fss:213-220`, `:386-403`, `:633-648` at 636d687b3), in the shapes of `Map`'s `combine` (`Library/Map.fss:260-266`, `:427`) and `IntMap`'s own `addU`, `add`, `UNION` and `intersectionOp` (`IntMap.fss:300-302`, `:455-457`, `:488-489`, `:514-521` at a1a75716a). `IntMapCombine` checks each result's structure against the map built directly."
- **Row 665.** Append: "Row 667's objects now define `genComb` (climb batch 13 rung O, 636d687b3), so checking each generic instance for a body would no longer refuse `IntMap`; `SeededRandomGenWithDistribution` (row 668) remains."
- **Row 488.** Append: "On climb batch 13 rung O's tree (636d687b3), which adds the lazy `LEXICO` to `Comparison`, `TotalComparison` and `EqualTo`, the site `BIG LEXICO(g)` at `Library/FortressLibrary.fss:130` ('Function body has type TotalComparison, but declared return type is BigReduction[\..\]') is gone from the distance, BR 4 to 3 (one run)."
- **Row 457.** Append: "The lazy `LEXICO` added by climb batch 13 rung O follows the specification's table: `Unordered LEXICO: EqualTo` is `Unordered`, where walk stopped (`TupleOrderBounds`). Under walk a thunk is typed `()->BOTTOM`, so a total comparison on the left keeps the team's `()->TotalComparison` arms, and `LessThan LEXICO: Unordered` is `LessThan` as before the rung. The strict form this row names is unchanged, and `XXXLexicoUnorderedRungH` still saw its expected failure."
- **Row 511.** Append: "The tuple shape now reaches the order operators on pairs and triples, whose elements climb batch 13 rung O bounds by `StandardPartialOrder` (row 634's tuple half): walk takes the element type of `(1,2) < (1,2.5)` at the join of `ZZ32` and `RR64`, which is no partial order, and refuses the call, 'Failed to find any matching overload, args = ((1,2): (Int,Int),(1,2.5): (Int,FloatLiteral))', where it answered `true`; `(1,2) < (widen(1),2)` likewise, where it answered `false` (`ProjectFortress/tests/TupleOrderMixedRefused.fss`). Operands declared with one type are converted at the declaration and compare as before."

## New rows

Section "10. Strings, maps and printing":

| NEW-O-1 | the library's `IntMap` `SYMDIFF` of a many-entry map and a one-entry map keeps only the singleton nearest the other key: under walk `{0,1,2} SYMDIFF {5}` is `{2,5}` and `{0,1,2} SYMDIFF {1}` is `{}` | NEGATIVE-VERIFIED | library bug (library) | silent | `ProjectFortress/tests/IntMapSymdiffSingleton.fss` | climb batch 13 rung O | `NodeIM`'s `opr SYMDIFF(self, other: SingletonIM[\Val\]) = self.seek(other.key) SYMDIFF other` (`Library/IntMap.fss:544-545` at a1a75716a) keeps of `self` only the singleton `seek` finds. The reverse order, `SingletonIM`'s `other.updateWith(...)` (`:353-355`), answers what the library's own comment says, "the key/value mappings contained in exactly one input map" (`:352`): `{5} SYMDIFF {0,1,2}` is `{0,1,2,5}`. `IntMapTest` checks no node against a singleton. Probe `ProbeSymdiff.fss` on the old code. Workaround: put the one-entry map on the left. |

Section "7. Numerals, floats and comparisons":

| NEW-O-2 | a float compared with a NaN by `<`, `<=`, `>` or `>=` answers `false` on both paths, where `opr-overview.tex` says the comparison throws `FloatingComparisonError`; the specification's `QQ` gives `false` at 0/0 "for compatibility with floating-point arithmetic" | CONTESTED | library gap vs spec (library) | `basic/operators/opr-overview.tex`, "Comparisons Operators"; `basic-lib/numbers.tex`, "Rational Numbers" | `ProjectFortress/tests/TupleOrderBounds.fss` | climb batch 13 rung O | siblings: 440, 634. Walk's `RR64` compares through `asFloat` (`Library/FortressLibrary.fss:442-445` at 636d687b3), Java's comparison; compiled, `nan < 1.0` and `nan >= 1.0` print `false` (probe `NanLess.fss` on 4f84f330a). Both libraries declare `FloatingComparisonError` (`Library/FortressLibrary.fsi:1154`, `Library/CompilerLibrary.fsi:99`) and nothing throws it. The tuples' `Unordered => false` (row 634's tuple half, item 43's default) agrees with the elements' `false`. Which passage governs is open. |

Both rows pass `python3 explorations/coordinator/tools/ledger.py check --rows`, apart from the placeholder number ("2 rows, 0 fail the template"). `IntMapSymdiffSingleton.fss`, `TupleOrderBounds.fss:19` and the rung's commit messages cite them as NEW-O-1 and NEW-O-2; the gather puts the numbers in.

## Handover

Climb batch 13 rung O (`wip/rung-tuple-orders`; 636d687b3, 069f2f0b4):
- What changed:
  - The tuple order operators bound each element by `StandardPartialOrder` (item 43, way 1b, the default), and `Comparison` has the lazy `LEXICO`.
  - `isLeftZero` takes `TotalComparison` (row 582).
  - `IntMap`'s objects define `genComb` (row 667).
  - `Reflect`'s `members` is a list.
- Measurements: the distance fell 153 to 133, with the 19 sites and row 488's `:130` gone and none come. The count's api rows are all 0, and its total stays 1, at item 47's crash `FortressLibrary.fss:1307`, which the clean api now lets the component check reach.
- `ant testSystem` is green (558).
- Values changed: walk refuses a pair or triple with an element that is no partial order, or whose elements at one position are numbers of two types, and answers `false` or `Unordered` where an unordered element decides.
- Open: two new rows (NEW-O-1, `IntMap`'s `SYMDIFF`; NEW-O-2, a NaN comparison against `opr-overview.tex`), and the count's reading at the component.

## Revival change

Add under "Static parameters" in `.claude/skills/fortress-repo/references/revival-changes.md`:

**Comparing pairs and triples**

- Original:
  - The interpreter's library compared pairs and triples lexicographically with `<`, `<=`, `>`, `>=` and `CMP` over element types with no bound, under the team's comment "Shouldn't these operators have to extend something? A,B,C?".
  - Walk compared an element only when the elements before it were equal, so `((1,2),3) < ((1,3),0)` and `(1,()) < (2,())` were `true`.
  - A pair whose first elements were unordered, such as a NaN against a float, stopped walk.
- Resolution:
  - Each element type extends `StandardPartialOrder`, and walk refuses a pair or triple with an element of another type at the call, whatever the elements before it decide.
  - Walk also refuses a pair whose elements at one position are numbers of two run-time types, such as `(1,2) < (1,2.5)`, which it answered `true`: it takes the element type at their join, which is no partial order (ledger row 511).
  - A pair or triple whose deciding elements are unordered answers `false` to `<`, `<=`, `>` and `>=`, and `Unordered` to `CMP`.
  - `Reflect`'s `members` is a list in the order the type declares its members, not a set sorted by name.
  - This is the default of Q43 (way 1b) in `explorations/coordinator/CLIMB-BATCH-13.md`, which the curator has not answered.
- Reason: the checker refused the ten operators' bodies at 17 sites. The team bounded the range points' comparisons `PCMP` and `SCMP` per element in 2008, and `false` is what `RR64`'s own comparisons answer for a NaN.

The rung's other changes need no entry:
- `isLeftZero`'s answers now agree with the team's library text and with `Specification/advanced-lib/comparison.tex` (method `isLeftZero`).
- `genComb`'s bodies and the lazy `LEXICO` fill what the team declared, or what its compiler prelude has (`CompilerBuiltin.fsi:704`), and the specification's `LEXICO` table.