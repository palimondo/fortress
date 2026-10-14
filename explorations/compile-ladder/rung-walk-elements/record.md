# Record lines: climb batch 15, rung B (`rung-walk-elements`)

## FACTS

A new entry in "Landed semantics", after F-143:

- **Under walk, a reduction or a comprehension that writes no static argument instantiates its big operator by the declared type of its value, else by the join of its elements' run-time types, else at its bound; so `__bigOperator`'s `body(i: I)` is typed** (`compile-ladder/rung-walk-elements/REPORT.md`, sections 1 and 5; P-48, by the coordinator's call of the walk probe's way 6 + 7; rows 703, 646, 662 and 645 closed).
  - The declared type is a local variable's, or a function's declared return type. It is found also where the clause form ends a `do` block, or a block after local declarations (`Evaluator.evalAt`). It is unified with the result type `O` of the operator's declared `BigReduction`, `Comprehension` or `BigOperator`. Where it fixes the instance, the clauses run as written.
  - Otherwise:
    - the clauses run once into the library's collector (`__elemsOf`, `Library/FortressLibrary.fss:1318-1437` on rung B's tree after the skeptic's fix), which joins the elements at their run-time join, as `APPCOV` does;
    - the operator is instantiated with that join as its element type `I`;
    - the reduction runs over the collected elements (`__bigOperatorElements`).
  - With neither, a plain-bounded static parameter takes its bound (decision D2 is lifted), and an F-bounded one stays open (F-143).
  - The hint is an argument to the operator's own instantiation, outside the per-argument caches (`EvaluatorBase.instantiateBigOperator`); no other evaluation reads it.
  - Left open:
    - an empty reduction or comprehension that no declared type directs is instantiated at its operator's bound: a sum takes `ZZ32`'s identity, a list comprehension is a `List[\Any\]` (row NEW-B-2, `tests/XXXUnwrittenEmptyFloatSumUntypedWalk`);
    - a big operator whose declared result is a trait other than `BigReduction`, `Comprehension` and `BigOperator` is instantiated at its bound, and an element that bound does not admit stops the reduction (row NEW-B-4, `tests/XXXUserBigOperatorResultTraitWalk`);
    - a comprehension that no declared type reaches is built at its elements' run-time join (rows 20 and NEW-B-3, `tests/XXXNestedComprehensionDeclaredTypeWalk`);
    - an argument of a call (rows 510 and 705).
  - Gated by `tests/UnwrittenListMapComprehensionWalk`, `UnwrittenComprehensionElementsWalk`, `UnwrittenComprehensionDeclaredTypeWalk`, `ComprehensionTypedBindingWalk`, `UnwrittenSetBigOperatorsWalk`, `UnwrittenEmptyFloatSumWalk`, `IntMapComprehensionTypedWalk` and `NestedListComprehensionWalk`.

Rewrite in place:
- **F-141** (`FACTS.md:136`):
  - Its departure "a big operator's plain-bounded ones keep `BottomType` (D2)" becomes "a big operator's, at a clause form that writes no static argument, is fixed first by the declared type of its value or by its elements' join (the entry 'Under walk, a reduction or a comprehension that writes no static argument ...')".
  - Its source note gains `compile-ladder/rung-walk-elements/REPORT.md`.
- **F-143** (`FACTS.md:138`): "Open, each with no static argument written: rows 645 (an empty reduction), 646 (a set comprehension) and 662 (`Set`'s big operators)." becomes "Rows 645, 646 and 662 are fixed by the declared type's and the elements' instance (the entry above); an empty reduction that no declared type directs still takes `ZZ32`'s identity (row NEW-B-2)."
- **F-220** (`FACTS.md:88`) no longer holds. It becomes: "**`__bigOperator`'s local `body` is typed `body(i: I): L`, which walk runs since it no longer instantiates a big operator's static parameter at `BottomType`.** The checker count's one error is then row 680's crash in `Array3`. Gated by `tests/UnwrittenListMapComprehensionWalk`. Detail: `compile-ladder/rung-walk-elements/REPORT.md` section 6."
- **F-53** (`FACTS.md:46`): "the untyped parameter of `body(i)` in `__bigOperator`, which walk does not yet let the library type (F-220). Typed, the count would stop at row 680's crash in `Array3`, still one error" becomes "row 680's crash in `Array3`", once the gate measures it. On rung B's tree at the worker's head (`ef52b7b11`) the count's stage ran 493 s and printed `#total 1`, its error at `FortressLibrary.fss:2978`; the skeptic's fix adds 65 lines above it (the crash's `FnExpr` at `:3043`), and no stage ran after it. The distance stayed 54, with no site moved.

## Ledger

Closes, after the fix lands (5dad832f3 on the branch; the gather names the commit on `main`):
- **Row 703.** `close 703 --commit 5dad832f3 --test UnwrittenListMapComprehensionWalk`. Note: "fixed 5dad832f3 (climb batch 15 rung B, P-48 by the coordinator's call, the walk probe's way 6 + 7). `body(i: I): L` at `Library/FortressLibrary.fss:1314`; walk instantiates an unwritten clause form's big operator by its declared type, its elements' join or its bound, so no element meets `BottomType`. The test is green on the base, red on the base's walk with only the line typed ('body param 1 (i:BOTTOM)'), green after."
- **Row 646.** `close 646 --commit 5dad832f3 --test ComprehensionTypedBindingWalk`. Note: "fixed 5dad832f3 (climb batch 15 rung B). The declared `Set[\ZZ32\]` instantiates the comprehension; without a declared type its elements' join does, which the F-bound's recheck takes from `Int` to `ZZ32` (`{ n^2 \| n <- -2:2 }` is `NodeSet[\ZZ32\]`). `XXXComprehensionTypedBindingWalk` promoted to `ComprehensionTypedBindingWalk`."
- **Row 662.** `close 662 --commit 5dad832f3 --test UnwrittenSetBigOperatorsWalk`. Note: "fixed 5dad832f3 (climb batch 15 rung B): `BIG UNION` and `BIG INTERSECTION` are instantiated at their elements' join, `R = ZZ32`. `XXXUnwrittenSetBigOperatorsWalk` promoted to `UnwrittenSetBigOperatorsWalk`. With no element `R` stays open (`EmptySet[\OPEN\]`)."
- **Row 645**, closed with its claim corrected to the case repaired: `close 645 --commit 5dad832f3 --test UnwrittenEmptyFloatSumWalk --claim "<the claim below>"`.
  - Claim: "under walk, an empty reduction with a generator clause list and no static argument, the value of a function declared with a type other than `ZZ32`, takes `ZZ32`'s identity: `emptyRSum(n: ZZ32): RR64 = SUM[j <- 0#n] (j / 2.0)` gives `0 : Int` at `n = 0`, not `RR64`'s `0.0`" (272 characters).
  - Note: "fixed 5dad832f3 (climb batch 15 rung B, way 7): the declared `RR64` instantiates `SUM` at `RR64`. `XXXUnwrittenEmptyFloatSumWalk` promoted to `UnwrittenEmptyFloatSumWalk`. Without a declared type the empty reduction still takes `ZZ32`'s identity: row NEW-B-2."
- **Row NEW-B-1** (below), once added: `close NEW-B-1 --commit 5dad832f3 --test IntMapComprehensionTypedWalk`. Note: "fixed 5dad832f3 (climb batch 15 rung B): declared `Comprehension[\(ZZ64,Val),IntMap[\Val\],AnyCovColl,AnyCovColl\]` as `Map`'s is (`Library/IntMap.fsi:83`, `IntMap.fss:732`), the api importing `CovariantCollection.{AnyCovColl}` (`IntMap.fsi:13`)."

Notes:
- **Row 510** (notes cell 573 characters), append: "Climb batch 15 rung B's declared type at a clause form is not its repair; this test keeps its verdict." (102 characters)
- **Row 424** is `FIXED`, and `ledger.py note` refuses a closed row, so its note naming decision D2 stays as it is. D2's lifting is recorded in F-141's rewrite and in row 703's close.
- **Row 20** has no room: its notes cell holds 692 of 700 characters. What the rung measured on it is row NEW-B-3, whose notes name row 20.
- **Row 577** has no room either: 697 of 700. The rung read the distance by row and line, mapping `FortressLibrary.fss` lines at or after `:1374` back by 56, and 0 of the 54 sites differ (`REPORT.md` section 6).

## New rows

Their numbers replace the placeholders in `Specification/basic/inference.tex:388`, `:394` and `:398`, `Specification/basic/expressions/reductions.tex:42`, and `Specification/appendices/changes.tex:1125`, `:1128`, `:1132`, `:2093`, `:2095` and `:2097` (lines after the skeptic's corrections), and in this rung's `REPORT.md` and `SKEPTIC.md`. No test cites a placeholder.

In section "10. Strings, maps and printing" (beside rows 671 and 704); closed by the rung's commit, as above:

| NEW-B-1 | the library's `IntMap` declares its comprehension operator `opr BIG {\|->[\Val\] }: IntMap[\Val\]` (`Library/IntMap.fsi:82`, `IntMap.fss:732`) while its body is a `Comprehension`, so under walk a declared result that decides the instance gives `NodeIM[\Any\]` | NEGATIVE-VERIFIED | library bug (library) | `basic/expressions/comprehensions.tex`, "Comprehensions" | `ProjectFortress/tests/IntMapComprehensionTypedWalk.fss` | climb batch 15 rung B (walk probe, section 10) | siblings: 646, 704. `Map`'s own is `Comprehension[\(Key,Val),Map[\Key,Val\],AnyCovColl,AnyCovColl\]` (`Library/Map.fsi:104`). Walk checks no declared result, so nothing observed it until walk read the declared result to instantiate an unwritten clause form (5dad832f3): with the line as it was, `m: IntMap[\ZZ32\] = { widen(k) \|-> 10 k \| k <- 0#3 }` is refused, 'RHS expression type NodeIM[\Any\] is not assignable to LHS type IntMap[\ZZ32\]'. Fixed in the same commit, declared as `Map`'s, the api importing `AnyCovColl` as `Library/PrefixSet.fsi:33` does. |

In section "8. Generators, reductions and ranges" (beside row 645):

| NEW-B-2 | under walk, an empty reduction or comprehension with no static argument, whose value no declared type directs, is instantiated at its big operator's bound: `e = SUM[j <- 0#0] (j / 2.0)` is `0 : Int`, not `RR64`'s `0.0`, and `<\| 2 k \| k <- 0#0 \|>` is a `List[\Any\]`, not a `List[\ZZ32\]` | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/expressions/reductions.tex`, "Summations and Other Reduction Expressions" | `ProjectFortress/tests/XXXUnwrittenEmptyFloatSumUntypedWalk.fss` | climb batch 15 rung B | siblings: 645, 425. What row 645 leaves after 5dad832f3: with no declared type and no element, `SUM`'s F-bounded `T` stays open and `additiveIdentity` takes its typecase's first clause (`Library/FortressLibrary.fss:3229` at ee1aa1a95); a list comprehension's `T` takes its bound `Any`. The desugaring by the type `N` gives `SUM[\RR64\]` and `BIG <\|[\ZZ32\]\|>`; walk has no static type for `N` there. `UnwrittenComprehensionElementsWalk` pins the list face as walk's answer. Workaround: write the static argument, or declare the value's type. |

In section "2. Types: generics, static parameters, inference and coercion" (beside rows 20, 510 and 646):

| NEW-B-3 | under walk, a comprehension with no static argument that is the body of another clause form whose instance a declared type fixes is built at its elements' run-time class, which the outer's element type refuses: `zs: List[\ZZ32\] = BIG CONCAT[ys <- xss] <\| 2 y \| y <- ys \|>` stops | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/expressions/comprehensions.tex`, "Comprehensions" | `ProjectFortress/tests/XXXNestedComprehensionDeclaredTypeWalk.fss` | climb batch 15 rung B | siblings: 20, 510, 705. With `xss = <\|<\|1, 2\|>, <\|3\|>\|>`: 'Unification error: Closure/Constructor for body param 1 (i:List[\ZZ32\]) got arg ArrayList[\Int\] of type ArrayList[\Int\]'. Since 5dad832f3 the declared type instantiates the outer `BIG CONCAT` at `ZZ32`, while the inner comprehension, which no declared type reaches, is built at its elements' run-time class `Int` (row 20's list face), and `List` is invariant. On the base it stopped earlier, 'lift param 1 (r:List[\BOTTOM\])'. The specification gives the inner one the type `List[\ZZ32\]` of its expression. Workaround: `<\|[\ZZ32\] 2 y \| y <- ys \|>`. |

In section "8. Generators, reductions and ranges" (beside row NEW-B-2), by the skeptic:

| NEW-B-4 | under walk, a reduction with no static argument over a user big operator whose declared result is its own trait, not `BigReduction`, `Comprehension` or `BigOperator`, is instantiated at its bound, and an element it does not admit stops it: `BIG CATOP[k <- 0#3] <\|[\ZZ32\] k\|>` throws `CastError` | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/expressions/reductions.tex`, "Summations and Other Reduction Expressions" | `ProjectFortress/tests/XXXUserBigOperatorResultTraitWalk.fss` | climb batch 15 rung B's skeptic | siblings: NEW-B-1, 424. With `opr BIG CATOP[\T\](): CatOperator[\T\]` and `trait CatOperator[\T\] extends BigOperator[\List[\T\],...\]`: walk reads the element and result types off a declared result named `BigReduction`, `Comprehension` or `BigOperator` only (`EvaluatorBase.resultArgOf`, 5dad832f3), so `T` takes its bound `Any`, and `__replay`'s cast of each `ArrayList[\ZZ32\]` to `List[\Any\]` fails. On the base it stopped at `lift`, '(r:List[\BOTTOM\])'. Repair: read the declared result's `BigOperator` supertype. Workaround: write the static argument. |

In section "8. Generators, reductions and ranges", by the skeptic; it has no reproducer, since walk crashes:

| NEW-B-5 | under walk, a comprehension over a long sequential generator overflows the stack at the suites' 32 MB: `<\| i MOD 7 \| i <- seq(0#50000) \|>` dies with `StackOverflowError`, on the base and after climb batch 15 rung B | NEGATIVE-VERIFIED | library bug (library) | `basic/expressions/comprehensions.tex`, "Comprehensions" | none | climb batch 15 rung B's skeptic | siblings: 20. `JAVA_FLAGS='-Xmx768m -Xss32m' bin/fortress P.fss` with `ys = <\| i MOD 7 \| i <- seq(0#50000) \|>` prints 'Caused by: java.lang.StackOverflowError' at ee1aa1a95 and at ef52b7b11. By reading: the sequential range joins left to right (`Library/RangeInternals.fss:1357-1367`), so `CVReduction`'s `APPCOV` builds a chain of `Append` nodes as deep as the list, which `cata` and `dirtyIAF` then recurse down (`Library/CovariantCollection.fss:128-133`). A sum over the same generator runs (`UnwrittenSequentialReductionWalk`). Workaround: the parallel generator `0#50000`. |

## Handover

Climb batch 15 rung B (`wip/rung-walk-elements`; 92b0a45fe, 5dad832f3, 81fde35ea, 169048c14, ef52b7b11; the skeptic's commits after them, `SKEPTIC.md`):
- Walk instantiates an unwritten clause form's big operator by the declared type of its value, by its elements' join or at its bound. D2 is lifted, building P-48 by the coordinator's call (the walk probe's way 6 + 7).
- The hint travels as an argument to the operator's own instantiation, outside the per-argument caches.
- `body(i: I)` is typed, and `IntMap`'s comprehension operator is declared as `Map`'s.
- Rows 703, 646, 662, 645 (its claim corrected) and NEW-B-1 are closed. NEW-B-2, NEW-B-3 and NEW-B-4 are opened, each with an expected failure, and NEW-B-5 with none.
- The skeptic's fix replays a chain of joins by a loop over its spine, so a reduction over a long sequential generator runs at the suites' stack again (`tests/UnwrittenSequentialReductionWalk`).
- `ant testSystem` is green (611) and `ant testSpecData` is green (130). microGPT's quick pair passes 7 of 7 each.
- The count is 1, row 680's crash, after 493 s. The distance is 54, and no site moved.

## Revival change

**The change.**
- **The team's sources.**
  - The specification desugars a reduction or a comprehension with the type `N` of the expression: `<| e | gs |>` of type `List[\E\]` uses `BIG <|[\E\]|>`, and `SUM[gs] e` of type `N` uses `SUM[\N\]` (`Specification/advanced/parallelism-locality/defining-generators.tex:154-197`).
  - The team's walk gave every static parameter that the arguments did not fix the type `BottomType` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:242-246` at `a874948ac`, `if (t == null) t = BottomType.ONLY;`). A big operator's parameter in a clause form that writes none is such a parameter.
  - The team's library left `__bigOperator`'s local `body(i)` untyped (`Library/FortressLibrary.fss:1120` at `a874948ac`). It also declared `IntMap`'s comprehension operator `IntMap[\Val\]` while its body is a `Comprehension` (`Library/IntMap.fsi:82`, `Library/IntMap.fss:689` at `a874948ac`).
- **What the tree now does.**
  - Under walk, the big operator of a reduction or a comprehension that writes no static argument is instantiated in this order:
    - by the declared type of the local variable, or the declared return type of the top-level or local function, whose value it is, also as a block's last expression and after local declarations;
    - otherwise by the join of its elements' run-time types, the elements being collected before they are reduced;
    - otherwise at the bound of each static parameter, or open where the bound mentions the parameter.

    `tests/UnwrittenComprehensionDeclaredTypeWalk`, `UnwrittenComprehensionElementsWalk`, `ComprehensionTypedBindingWalk`, `UnwrittenSetBigOperatorsWalk`, `UnwrittenEmptyFloatSumWalk` and `UnwrittenListMapComprehensionWalk` show it.
  - `body(i: I): L` (`Library/FortressLibrary.fss:1314` on rung B's tree). `IntMap`'s operator is declared `Comprehension[\(ZZ64,Val),IntMap[\Val\],AnyCovColl,AnyCovColl\]` (`tests/IntMapComprehensionTypedWalk`).
  - These cases still differ from the specification's answer: an empty reduction or comprehension that no declared type directs (`tests/XXXUnwrittenEmptyFloatSumUntypedWalk`, row NEW-B-2), a comprehension that no declared type reaches (`tests/XXXNestedComprehensionDeclaredTypeWalk`, rows 20 and NEW-B-3), and a user big operator whose declared result is its own trait (`tests/XXXUserBigOperatorResultTraitWalk`, row NEW-B-4).
  - The compiled path is unchanged: its checker takes the bound, or the expected type (row 425).
- **The reason.**
  - P-48: a type parameter that the arguments do not fix takes its bound, never `Bottom`, constrained by the call's static return type, which here is the declared type of the value.
  - The desugaring fixes the parameter by `N`. Walk has no static types, so it reads its elements' run-time types for `N`, as the record already read them for the open parameter (F-143; `Specification/basic/inference.tex:367-369` before this change).
  - Measured:
    - with the bound alone, 7 interpreter tests and 1 specification example went red at comprehensions built at `Any` (`explorations/perf-probes/walk-plain-bound/REPORT.md` section 5);
    - with `BottomType`, rows 645, 646, 662 and 703 stood, and with the line typed the base's walk stopped at `body param 1 (i:BOTTOM) got arg 4: ZZ32 of type Int`.

**Provenance.**
- Review-queue item 17 and PLAN item 53. The coordinator settled them under the curator's rule for forks: the walk probe's way 6 + 7 (`explorations/perf-probes/walk-plain-bound/REPORT.md`), under P-48, reading P-59 as covering the elements' run-time types. Both calls are on the curator's review list.
- Climb batch 15, rung B. It closes rows 703, 646, 662, 645 (its claim corrected) and NEW-B-1, and opens NEW-B-2, NEW-B-3, NEW-B-4 and NEW-B-5.
- The skill's entries that change:
  - `SKILL.md:126`, "Static parameters";
  - `references/revival-changes.md`, "A type parameter that a call does not fix" (`:108-109`, its first bullet), "A type parameter whose bound names itself, under walk" (`:121-125`) and "The lifted type of a reduction without an identity" (`:219`);
  - `references/library.md:25`, the `SUM` and `PROD` item.
