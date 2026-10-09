# Climb batch 12, rung R (rung-range-kinds): the record lines

## FACTS

In the section "The checker and the one library", after "The one library's range types provide a declaration on the meet ...":

- **The one library's `narrowToRange` and its bounds check are declared at the range kinds over `ZZ32` of rank 1 to 3** (`compile-ladder/rung-range-kinds/REPORT.md`; rows 654 to 658 and 608 fixed). `Range`, `BoundedRange` and `FullRange` declare `narrowToRange(other: Range[\I\])` abstract (`Library/FortressLibrary.fsi:2180`, `:2235`, `:2265`). The range kinds of each rank hold the team's bodies at their index type (`Library/RangeInternals.fss:192`, `:249`, `:319`, `:594`, `:647`, `:660`, `:1086`, `:1174`, `:1252`). The bodies call `checkSelection`, `checkSelection2D` and `checkSelection3D` (`:125-172`), named by rank because walk refuses overloads of one name over two instantiations of `Range` (row 416). Each kind, the open kinds and `TrivialOpenRange` also declare the meet `narrowToRange(other: OpenRange[\…\])`, without which the checker refuses every kind. At rank 2 and 3 the check compares corner by corner with `PCMP` (Q50): `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` raises `IndexOutOfBounds`, and so do the arrays' range subscripts and subarrays of rank 2 and 3 with a corner outside on one axis, which call it (`Library/FortressLibrary.fss:2534`, `:2586`, `:2929`): `a[(1,-1):(2,2)]` on a 3-by-3 array was cut to its lower two rows, and `a.subarray[\0,1,0,4,0,0\](1,1)` read `a`'s `(1,0)` as its `(0,3)`. `TrivialOpenRange`'s `truncL`, `truncR`, `every`, `imposeStride` and `atMost` fail (Q49's default, way (a)), and so do `(:):s` and `(:)#n`, which call two of them. The count stays 1, and the distance falls by these nine sites, one hidden site showing (NEW-R-1). Gated by `tests/RangeNarrowKinds.fss`, `RangeKindBodies.fss`, `ArrayRangeCornerBounds.fss`, `TrivialOpenRange{TruncL,TruncR,Every,ImposeStride,AtMost}Stop.fss`, `PrefixSetIndices.fss` and `ImmutableArrayRangeSubscript.fss`.

Two entries are amended:

- "The one library's range types provide a declaration on the meet for each of their Meet Rule pairs ...". Its clause "the range sites left are `FullRange.narrowToRange` over an `OpenRange`, `checkSelection` and `TrivialOpenRange`'s five methods (rows 654 to 656 ...)" is now false. It reads: "the range sites of rows 654 to 656 are gone (the entry on `narrowToRange`, below)".
- "The one library's scalar ranges are over `ZZ32` alone". `checkSelection` no longer stays generic: drop it from the list of declarations that stay generic, and add "`checkSelection` is declared at `ZZ32`, with `checkSelection2D` and `checkSelection3D` beside it (`Library/RangeInternals.fsi:42-46`)".

## Ledger notes and closes

Close each at the landing, with the landed hash of the edit (`a121ab660` and `7425daa51` on the branch):

- **Row 655**: `ledger.py close 655 --commit <hash> --test RangeNarrowKinds`.
- **Row 657**: `ledger.py close 657 --commit <hash> --test RangeKindBodies`. `ArrayRangeCornerBounds` gates it too, at the arrays' subscripts and subarrays.
- **Row 654**: `ledger.py close 654 --commit <hash> --test RangeNarrowKinds`.
- **Row 656**, under Q49's default way (a): `ledger.py close 656 --commit <hash> --test TrivialOpenRangeTruncLStop`. The four sibling stop tests gate it too.
- **Row 658**: `ledger.py close 658 --commit <hash> --test PrefixSetIndices`.
- **Row 608**: before the close, append "Walk stopped too, on every strided subscript of an immutable array of rank 1: 'Cannot find definition for method lower given receiver StridedFullParScalarRange' (`f[2:8:3]`; batch 12 rung R)". Then `ledger.py close 608 --commit <hash> --test ImmutableArrayRangeSubscript`.

Notes to append:

- **Row 600**: "Its last sites, rows 654 to 656, fixed by climb batch 12's rung R."
- **Row 599**: "Its last site, row 654, fixed by climb batch 12's rung R."
- **Row 634**: "Under Q50, `narrowToRange` of rank 2 and 3 compares with `PCMP` (`Library/RangeInternals.fss:140-172`) and no longer reaches the tuples' `<` and `>`; the 18 sites are unchanged (batch 12 rung R)."
- **Row 659**: "Unchanged by batch 12's rung R: `((0,0)#).every(-1,1)` still stops with the same message."
- **Row 416**: "Met again: the one library's bounds check at three index types is three functions named by rank (`checkSelection`, `checkSelection2D`, `checkSelection3D`, `Library/RangeInternals.fss:125-172`), because walk refuses `checkSelection` overloaded on `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]` (batch 12 rung R)."
- **Row 488**: "again: batch 12 rung R's distance run lost the site at `BIG LEXICO`'s body (`Library/FortressLibrary.fss:130`), which the rung does not touch."
- **Row 577**: "again: rung-range-kinds, section 3"

## New row

NEW-R-1, in section "9. Arrays, vectors and matrices". It was checked with `ledger.py check --rows`, with a number in place of the placeholder: 0 fail the template.

| NEW-R-1 | the range subscripts of `ImmutableArray1` and `Array1` pass `reflect`'s sizes, typed `NatParam`, to `__subarrayI` and `__subarray`, which take `N[\s\]`, so the compiled checker over the one library refuses both calls | NEGATIVE-VERIFIED | design limit (library) | silent | `explorations/compile-ladder/gate/distance-sites.tsv` | climb batch 12 rung R | `Library/FortressLibrary.fss:2257` and `:2315` at 7425daa51, after `s = reflect( \|r'\| )` and `l = reflect(r'.left.get)`: 'Could not check call to function __subarrayI ... not applicable to an argument of type (ImmutableArray1[\T,b0,s0\], NatReflect.N[\0\], NatReflect.NatParam, NatReflect.NatParam, ZZ32)'. The immutable site showed once row 608's `r'.lower` typed; the mutable one is on the landed per-site list, class V2. `reflect` answers the trait `NatParam`, no `N[\n\]` (`ProjectFortress/LibraryBuiltin/NatReflect.fsi:31`; its `comprises` a comment, `:23`): the array forks' fork 4 (`explorations/reviews/array-design-ways.md` section 4). Walk binds the size at dispatch and answers. |

## Handover

Batch 12 rung R (`wip/rung-range-kinds`; commits `44f6651a5`, `a121ab660`, `7425daa51`) moves the ranges' last generic bodies to the `ZZ32` kinds. `narrowToRange` is abstract in the generic traits. Its bodies, with the per-rank `checkSelection`, `checkSelection2D` and `checkSelection3D`, sit at the nine kinds, beside the meets over an open range that the checker asks for. Ranges of rank 2 and 3 check their bounds corner by corner (Q50). `(:)`'s five methods fail (Q49's default, pending). A prefix set's index-value pairs have indices, and `ImmutableArray1` reads `r'.left.get`.

On the rung's tree the distance goes 207 → 198: the nine sites are gone, a hidden twin shows (NEW-R-1), and row 488's `BIG LEXICO` site drops out. The count stays 1. Values that walk prints change: four raises at rank 2 and 3, and the raises of the arrays' range subscripts and subarrays of rank 2 and 3 with a corner outside on one axis; seven stops; and two stops that now answer.

## Revival change

Two entries for `.claude/skills/fortress-repo/references/revival-changes.md`, under "Numbers are siblings, not a tower", after "Bounded ranges of rank 2 and 3":

**Checking a range of rank 2 or 3 against bounds**

- Original: the interpreter's library checked a range against an array's bounds (`narrowToRange`) with its index type's `<` and `>`, which compare pairs and triples lexicographically. `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` answered `(2,0):(5,5)` and reported no bound outside, so an array's range subscript of rank 2 or 3 with a corner outside on a later axis was cut to the bounds, and a subarray read past them.
- Resolution: the check compares corner by corner, by the ranges' own point order `PCMP`, and that call raises `IndexOutOfBounds`, as do such subscripts and subarrays. The check and `narrowToRange`'s bodies are declared at the range types over `ZZ32` of each rank.
- Reason: the curator's answer to Q50. The lexicographic order serves sorting, and a corner outside the bounds on any axis is outside them.

**The trivial open range `(:)`**

- Original: `(:)` is a range over `Any`. The interpreter's library gave its `truncL`, `truncR`, `every`, `imposeStride` and `atMost` bodies that answer ranges over `ZZ32`: `(:).truncL(3)` was `3#`.
- Resolution: the five fail with a message that names `(:)`, and so do `(:):s` and `(:)#n`, which call two of them. `(:)` as a whole subscript, `a[:]`, is unchanged. This is Q49's default, and his answer is pending.
- Reason: generics are invariant, so a range over `ZZ32` is no range over `Any`, and no body that the five declared types allow answers a range.

The other repairs change no rule of the language. Walk either stopped before (rows 608 and 658) or answers the same values (rows 654 and 655).
