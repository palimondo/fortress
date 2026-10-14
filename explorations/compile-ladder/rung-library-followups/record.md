# Climb batch 14, rung L (`rung-library-followups`): record lines for the gather

`<L>` stands for the rung's code commit as it lands on `main` (313541641 on `wip/rung-library-followups`). `NEW-L-1` is the placeholder for the one new row.

## FACTS

Under "The checker and the one library", a new entry:

- **Under walk, `__bigOperator`'s local `body` cannot be typed `I`: an unwritten list or map comprehension gives `I` the type `BottomType`, so the checker count's error stays at the untyped `body(i)`.** With `body(i: I): L` in place of `body(i): L` (`Library/FortressLibrary.fss:1314`), walk stops `<| 2 k | k <- 0#3 |>` with 'Unification error: Closure/Constructor for body param 1 (i:BOTTOM) got arg 4: ZZ32 of type Int'. It stops `{ widen(k) |-> k | k <- 0#3 }` with '(i:(ZZ64,BOTTOM))'. Written static arguments, `SUM`, `BIG MAX`, `BIG AND` and a set comprehension run. The cause is a big operator's plain-bounded parameter kept at `BottomType` (F-141, D2), so typing `body(i)` waits on review-queue item 17. An untyped function expression in `body`'s place, `desugaredClauses(r, fn (i) => r.lift((o.body)(i)))`, runs under walk; the checker's verdict on it is not measured. No gated test can show the refusal while the line is untyped: row NEW-L-1 gives the program and the output. Detail: `compile-ladder/rung-library-followups/REPORT.md` section 2.

## Ledger

### New row

NEW-L-1, in section "8. Generators, reductions and ranges" (linted with `ledger.py check --rows`, a number in place of the placeholder: 0 fail the template):

| NEW-L-1 | under walk, `__bigOperator`'s local `body` cannot take its parameter's type `I`, as the compiled checker asks of the untyped `body(i)` (the count's one error): an unwritten list or map comprehension instantiates `I` at `BottomType`, so walk refuses each element at `body` | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/expressions/comprehensions.tex`, "Comprehensions" | none | climb batch 14 rung L | siblings: 424, 645, 662. With `body(i: I): L` at `Library/FortressLibrary.fss:1311` (at 5bf8a7c84), walk on `<\| 2 k \| k <- 0#3 \|>` stops: 'Unification error: Closure/Constructor for body param 1 (i:BOTTOM) got arg 4: ZZ32 of type Int'; on `{ widen(k) \|-> k \| k <- 0#3 }`, '(i:(ZZ64,BOTTOM)) got arg (2,2)'. Written static arguments, `SUM`, `BIG MAX`, `BIG AND` and a set comprehension run. Walk keeps a big operator's plain-bounded parameter at `BottomType` (D2; `EvaluatorBase.java:170`, `:181`). Workaround: the line stays untyped. |

### Closes, once `<L>` is on `main`

- Row 679: `ledger.py close 679 --commit <L> --test Array2SubscriptInBounds --note "the distance stage's site FortressLibrary.fss:2525 is gone"`. Its failing-then-passing test is the distance stage. `Array2SubscriptInBounds` keeps walk's values.
- Row 671: `ledger.py close 671 --commit <L> --test IntMapSymdiffSingleton`.

### Notes

- Row 680, append: "Not next yet: body(i) held, row NEW-L-1." (40 characters; the row has room for 48 in its notes).
- Row 678, append: "Ways, none taken (batch 14 L): a SubArray2 at the run-time offset, sized as Col and Row take (`Library/FortressLibrary.fss:2659` at 313541641); Col and Row over the unsized array; a typecase to the sized type; a sized subscript result." (235 characters; room 253).
- Row 639, append: "Array2's offset too: Array2SubscriptInBounds holds in-bounds only." (66 characters; room 72).
- Row 577, append: "Batch 14 L, by row: the 3 classes moved are its 3 sites gone." (61 characters; the row's notes are at 697 of 700, so `ledger.py` will refuse it: for the coordinator).
- Row 488, append: "Batch 14 L: BIG LEXICO(g) at :130 gone, untouched." (50 characters; the notes are at 684 of 700, so it will be refused: for the coordinator).

## Handover line

Climb batch 14 rung L repaired three library sites. Array2's offset (row 679) and each integer type's own numerator (P-146's thirtieth site) leave the distance, and IntMap's node SYMDIFF a singleton is right in both orders (row 671). It held `__bigOperator`'s `body(i)`, because walk refuses `body(i: I)` on an unwritten list or map comprehension, `I` being `BottomType` (row NEW-L-1, review-queue item 17). On the rung's tree the count stays 1 at `body(i)` (`:1314`, 303 s), and the distance goes 85 to 82: two sites the rung's own, one row 488's variation (`:130`). `ant testSystem` is green with 582 tests.

## Revival change

### The change

The team's library: `NodeIM`'s `opr SYMDIFF(self, other: SingletonIM[\Val\]): IntMap[\Val\] = self.seek(other.key) SYMDIFF other` (`Library/IntMap.fss:544-545` at a874948ac) kept of the many-entry map only the entry `seek` finds. So under walk `{0,1,2} SYMDIFF {5}` was `{2,5}` and `{0,1,2} SYMDIFF {1}` was empty, while the reverse orders gave `{0,1,2,5}` and `{0,2}`.

The tree now: the many-entry map is updated at the one-entry map's key (`Library/IntMap.fss:570-572`). The key is dropped if the many-entry map holds it, and given the one-entry map's value if not. Both orders give `{0,1,2,5}` and `{0,2}`, and `ProjectFortress/tests/IntMapSymdiffSingleton.fss` asserts both orders.

The reason: the library's own comment on the operator, "%SYMDIFF% returns the key/value mappings contained in exactly one input map." (`Library/IntMap.fss:568`, as at `:93` and `:360`). The one-entry map's own `SYMDIFF` (`:361-363`) already answers so in the other order. The replaced line had the shape of `INTERSECTION`'s (`:542`), where keeping one entry is right.

The tree's other two edits change no value. Array2's `offset` answers the same pair or fails the same way, and each integer type's `numerator` gives the same `ZZ` (`ProjectFortress/tests/NumeratorPerType.fss`).

### Provenance

Row 671, repaired in the library's own spelling (P-27, "The library's own practice is the standard"); no question or item; climb batch 14.
