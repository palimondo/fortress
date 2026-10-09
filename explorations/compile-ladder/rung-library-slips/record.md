# Climb batch 12, rung S (rung-library-slips): the record lines

## FACTS

In the section of the library's slips, beside "The string components' slips are repaired in the library's own spelling …" and "The one library's numbers, orderings, List and natives answer their declared types …":

- **The one library's storing objects, immutable factory and subarray, matrix product and transpose, `SUFFIX_SUM`, `String`'s `left` and `right`, and `QQ`'s `ceiling` and `truncate` answer their declared types** (`compile-ladder/rung-library-slips/REPORT.md`; rows 606, 635).
  - `__DefaultVector`, `__DefaultMatrix` and `TransposedMatrix` take `T extends Number`, the bound of `Vector` and `Matrix`.
  - `__immutableFactory1` declares `ImmutableArray1`, as `__builtinFactory1` declares `Array1`.
  - `__ImmutableSubArray1` declares no `put`, as `PrimImmutableArray` declares none.
  - `Matrix`'s `mul` runs its halves as `do … also do … end`.
  - `TransposedMatrix`'s `add`, `subtract` and `negate` call `Matrix`'s `+`, `-` and prefix `-`.
  - `SUFFIX_SUM` loops over `seq((0 # (|x| - 1)).reverse)`.
  - `String`'s `left` and `right` answer `Just` of the character (item 42).
  - `QQ`'s `ceiling` and `truncate` throw `DivisionByZero` at +∞, −∞ and 0/0, and so do `floor`, `round` and the two brackets (item 44; Appendix I, "The rounding of an infinite or indefinite rational").

  On the rung's tree the distance falls by exactly these 32 sites, none new, and the count stays 1 (REPORT section 6). Left nearby: `__immutableFactory1`'s body joining two sizes and its typecase arm (fork 1), the products' arithmetic on `T` (fork 2), and the strided `:` declared `Range` (row NEW-S-1). Gated by `tests/TransposedMatrixAndFreeze.fss`, `StringPieces.fss` and `NumberOrderListDeclarations.fss`.

## Ledger notes

- **Row 606:** fixed by `a64169be9`, test `StringPieces`. Close it at the landing with the landed hash: `ledger.py close 606 --commit <hash> --test StringPieces`.
- **Row 635:** fixed by `a64169be9`, test `NumberOrderListDeclarations`. Close it at the landing: `ledger.py close 635 --commit <hash> --test NumberOrderListDeclarations`.
- **Row 336**, text to append (the row's notes are at 692 of 700 characters, so room must be made first): "The unbounded `ZZ` too: `big(1) DIV big(0)` ends the run, 'BigInteger divide by zero' (`BigNum.java:158-160` at 7fa767d48; batch 12 rung S)."
- **Row 514**, text to append: "sibling: NEW-S-1, the one library's own strided `:`, declared `Range[\ZZ32\]`, no generator."
- **Row 577**, text to append: "again: rung-library-slips, section 6"

## New row

NEW-S-1, in section "8. Generators, reductions and ranges" (checked with `ledger.py check --rows` with a number in place of the placeholder: 0 rules broken):

| NEW-S-1 | against the one library a strided range `a:b:c` is declared `Range[\ZZ32\]`, which is no generator, so the compiled checker refuses `seq(a:b:c)` where walk runs it: 'Could not check call to function seq ... not applicable to an argument of type Range[\ZZ32\]' | NEGATIVE-VERIFIED | library gap vs spec (library) | `basic/expressions/ranges.tex`, "Ranges" | none | climb batch 12 rung S | siblings: 514. `opr :[\I\](r: Range[\I\], stride:I): Range[\I\]` (`Library/FortressLibrary.fsi:2391` at 7fa767d48), under the team's comment that a `FullRange` form "doesn't obey the subtyping rule"; `Range` extends no `Generator` (`:2163`), while walk builds a strided full range, which `RangeInternals` gives `seq`. Measured at `SUFFIX_SUM` (`Library/FortressLibrary.fss:4686`, `explorations/compile-ladder/gate/distance-sites.tsv` at f9d3ec826), which batch 12 rung S rewrote over `(0 # n).reverse`; `Library/Shuffle.fss:23` writes one outside the distance's units. No program compiles against the one library yet. Workaround: `seq((0 # n).reverse)`. |

## Handover

Batch 12 rung S (`wip/rung-library-slips`, `a64169be9`, `78f858735`): the one library's 32 slip sites are repaired in its own spelling. These are the storing objects' bound, the immutable factory and subarray, `mul`, the transposed matrix and `SUFFIX_SUM`, together with rows 606 (`String`'s `left`/`right` → `Just`) and 635 (`QQ`'s `ceiling`/`truncate` throw `DivisionByZero`, numbers.tex revised, Appendix I "The rounding of an infinite or indefinite rational"). On the rung's tree the distance is 207 → 175, exactly those 32 by site, and the count stays 1. One team declaration was removed, `__ImmutableSubArray1.put`. There is a new row, NEW-S-1 (the strided `:` declared `Range`), and two questions for the curator: `TransposedMatrix`'s three methods, and NEW-S-1's form.

## Revival change

Two entries for `.claude/skills/fortress-repo/references/revival-changes.md`.

Under "Numbers are siblings, not a tower":

**Rounding a rational at an infinity**

- Original: the Working Draft types `QQ`'s `floor`, `ceiling`, `round` and `truncate` ℤ, and its next sentence says they return the argument at +∞, −∞ and 0/0, a rational. The interpreter's library returned the argument, and its `round` stopped walk there.
- Resolution: these methods and the brackets ⌊ ⌋ and ⌈ ⌉ throw `DivisionByZero` at those three values.
- Reason: the curator kept the declared integer result. A division by zero whose result is an integer throws `DivisionByZero` (`opr-overview.tex`).

No point of `SKILL.md` fits the second entry; the nearest is "Traits and objects, no classes". The gather places it:

**A string's `left` and `right`**

- Original: the interpreter's library declared `String`'s `left` and `right` `Maybe[\Char\]` but answered the character itself, so walk printed `a` for `"abc".left`. The specification is silent.
- Resolution: they answer `Just` of the character, and `Nothing` for the empty string, as `List`'s and the ranges' do.
- Reason: the declared type, which the checker enforced by refusing both bodies.

The array slips change no rule of the language: walk either stopped on them before, or gives the same values before and after.