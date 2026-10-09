<!-- Every way to type the one library's tuple comparisons and `LexicographicOrder`, whose bodies compare values of an unbounded type parameter (PLAN item 43, ledger row 634, class G1, 18 of the 153 sites of the distance), written 2026-10-09 by an Opus ways worker reading only, for a Fable judge who recommends one way to Pavol. Base: `main` at `0bf0c0a4c`, whose `Library/`, `ProjectFortress/` and `Specification/` are those of `32b88cd3b`, climb batch 12's landing, at which the per-site list was taken (`git diff --stat 32b88cd3b 0bf0c0a4c -- Library ProjectFortress Specification` is empty). Nothing built, run or measured; the peers' pages for Haskell, Rust, Scala and Swift read on 2026-10-09, Julia and C++ from the worker's knowledge, marked. Cited and not re-gathered: `coordinator/PLAN.md` item 43; `compile-ladder/rung-number-order-slips/REPORT.md` section 5 (its probe `ProbeTuples`); ledger row 634; FACTS, "The specification's own declaration of `Nothing` compiles on neither path ..." and the codegen line after it; POSITIONS, "The library's own practice is the standard." and "The implicit bound of an unbounded type parameter is `Any`". -->

# Tuple comparisons and `LexicographicOrder`: every way

## In short

- **The 18 sites are one message in five shapes**, all "Could not check call to operator CMP ... is not applicable to an argument of type (X, X)" where X is an unbounded type parameter: the pair order operators 4, the pair `CMP` 2, the triple order operators 8, the triple `CMP` 3, `LexicographicOrder`'s `CMP` 1 (section 1).
- **Behind them sit at least 8 more comparisons the checker has not read**: a `typecase` whose scrutinee fails to type returns before its clauses are checked (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:661`), so each order operator's `EqualTo => b1 < b2` (or `c1 < c2`) is unread. Under a partial order, the seven `LEXICO:` calls would surface too. No way's count below is a measured count.
- **The root is in the type system, not the library's spelling.** A tuple type excludes every trait type (`Specification/basic/types-vals-vars.tex:299`, `:306`; the later Types chapter, `Documentation/Specification/Prose/Language/types.tick:341`, `:424`), so no bound on a trait, whether written as a bound or as a `where` clause, admits a pair of pairs. The lexicographic order is conditional on the elements' order (section 3, step 1). Every typed peer states it as a conditional instance (Haskell, Rust, Scala). The one with nominal bounds and tuples outside its protocols, Swift, gives up nested tuples, as way 1 does.
- **The ways**, the library's own first:
  1. bound each element type, as the team bounded its own tuple point comparison `PCMP`: (a) by `StandardTotalOrder`, (b) by `StandardPartialOrder`, (c) the same on `LexicographicOrder`'s element, which forces `List`'s;
  2. take lists' order off the trait and put it on bounded top-level operators, `Set`'s shape;
  3. conditional extension, `List[\E\] extends LexicographicOrder[\...\] where {E extends ...}`, the team's own unbuilt feature;
  4. conditional members, a method's `where` clause on its trait's parameter, the specification's own form in the binary-word library;
  5. tuples ordered structurally by a language rule;
  6. run-time dispatch through an `Any` fallback, the library's own device for `=`: (a) public, (b) a private helper;
  7. monomorphic tuple comparisons at concrete element types;
  8. an explicit comparator;
  9. drop the tuple comparisons;
  10. a checker that defers or re-checks per instance;
  11. leave them.
- **No way changes a line of the model program.** Neither model program declares a `List` or compares a tuple (`grep -c 'List\['` gives 0 in `explorations/apl/microgpt/*.fss` and `explorations/run-c4/src/*.fss`).

## 1. The 18 sites, by shape

All are in `Library/FortressLibrary.fss` and appear in `explorations/compile-ladder/gate/distance-sites.tsv` as `typecheck` sites of `component FortressLibrary`. The count is the class G1 line of `explorations/compile-ladder/climb-batch-12/gate/distance.txt:22`. The hidden column is by reading `Misc.scala:658-664` (`val checkedType = getType(checkedExpr).getOrElse(return expr)`, before `clauses.map(checkClause(...))`) and the api's `Comparison` (`Library/FortressLibrary.fsi:100-106`, a strict `LEXICO` only; the thunk form `LEXICO(self, other:()->TotalComparison)` is on `TotalComparison`, `:133`, and `EqualTo`, `:164`).

| Shape | Declaration | Site lines (count) | Argument types read | Unread behind the sites |
|---|---|---|---|---|
| S-a. Pair `<`, `<=`, `>`, `>=` | `:4456`, `:4466`, `:4476`, `:4486` (api `Library/FortressLibrary.fsi:2625-2628`) | `:4459`, `:4469`, `:4479`, `:4489` (4) | `(A, A)` in `typecase a1 CMP a2 of` | the `EqualTo` clause's `b1 < b2`, `b1 <= b2`, `b1 > b2`, `b1 >= b2` (`:4461`, `:4471`, `:4481`, `:4491`) |
| S-b. Pair `CMP` | `:4496` (api `:2629`) | `:4499` ×2 (2) | `(A, A)`, `(B, B)` in `(a1 CMP a2) LEXICO: (b1 CMP b2)` | the `LEXICO:` call |
| S-c. Triple `<`, `<=`, `>`, `>=` | `:4508`, `:4518`, `:4528`, `:4538` (api `:2631-2634`) | `:4511`, `:4521`, `:4531`, `:4541`, ×2 each (8) | `(A, A)`, `(B, B)` in the scrutinee `(a1 CMP a2) LEXICO: (b1 CMP b2)` | the scrutinee's `LEXICO:`; the clause's `c1 < c2` etc. (`:4513`, `:4523`, `:4533`, `:4543`) |
| S-d. Triple `CMP` | `:4548` (api `:2635`) | `:4551` ×3 (3) | `(A, A)`, `(B, B)`, `(C, C)` | the two `LEXICO:` calls |
| S-e. `LexicographicOrder`'s `CMP` | `trait LexicographicOrder[\T extends LexicographicOrder[\T,E\],E\]` `:1927`, its `CMP` `:1929` (api `:1333-1339`) | `:1932` (1) | `(E, E)` in `fn(a:E,b:E): TotalComparison => a CMP b` | the `generate` call and the `LEXICO (|self| CMP |other|)` after it |

The tuple `=` operators (`:4450`, `:4502`) and `LexicographicOrder`'s `=` (`:1935-1937`) raise no site. They compare through `opr =(a:Any, b:Any):Boolean = a SEQV b` (`Library/FortressLibrary.fss:96`, api `.fsi:69`), which every value fits. Under walk, dispatch picks the more specific `=` of a tuple or a list.

The walk pins on these declarations are at `ProjectFortress/tests/NumberOrderListDeclarations.fss`, a gated test:
- `:40`, `(1,2) < (1,3)`;
- `:41`, `((1,2),3) < ((1,3),0)`, the pair of pairs;
- `:42`, `(1,2,3) CMP (1,2,2)` is `GreaterThan`;
- `:43`, `(1.5, 2) < (2.5, 1)`, a float in a pair;
- `:44`, `<|1,2|> < <|1,3|>`.

The lists at tuple, arrow, `()` and object element types are pinned at `ProjectFortress/tests/ResultBoundsRungB.fss:48-59`, and lists of pairs at `NumberOrderListDeclarations.fss:48`. A grep of `ProjectFortress/tests`, `demos`, `library_tests` and `compiler_tests` for a tuple or list literal compared by `<`, `<=`, `>`, `>=` or `CMP` finds only these pins. The range tests' `CMP` lines compare ranges, not tuples.

## 2. The ways

Each way gives what it changes in the library, the checker, walk and the specification; the sites it clears, of the 18, with what would surface behind them by reading; the values walk prints that it changes; and the one measurement that would settle it. "Distance stage" means the gate's report-only distance measurement over the twelve components, run on a tree with the way's edit.

### Way 1. Bound each element type: the library's own way for a tuple comparison it typed

**The precedent.**
- The team wrote its tuple point and stride comparisons unbounded in 2007 (`PCMP[\A,B\]`, Maessen, `91ab8926a`). It bounded them per element and per arity when it moved them into `RangeInternals` in 2008: `opr PCMP[\I extends Integral[\I\], J extends Integral[\J\]\](a:(I,J), b:(I,J))` (Maessen, `0948c2b1c`; the team's last text at `git show a874948ac:Library/RangeInternals.fss`, lines 87-122). The revival narrowed them to `ZZ32` (`Library/RangeInternals.fss:87-120`).
- The tuple reductions bound each component: `BIG MIN_MIN[\T extends StandardMinMax[\T\], U extends StandardMinMax[\U\]\]` (`Library/FortressLibrary.fsi:2011-2027`).
- The ordered containers bound their element by `StandardTotalOrder[\E\]`: `Set`'s component (`Library/Set.fss:25`), `Avl` (`Library/Avl.fss:16`), `quicksort` (`Library/QuickSort.fsi:18`), `PrefixMap` (`Library/PrefixMap.fss:37`).

**1a. Total bounds.** Write `[\A extends StandardTotalOrder[\A\], B extends StandardTotalOrder[\B\]\]`, with `C` likewise, on the ten order operators, in the api and the component. The two `=` operators stay unbounded.
- *Library*: 20 headers.
- *Checker*: none.
- *Walk*: none; it reads the bounds at dispatch.
- *Specification*: none. It is silent on tuples (`Specification/basic/operators/opr-overview.tex:276-295`), and nothing in it is made false.
- *Clears*: S-a to S-d, 17. By reading, nothing surfaces behind them. `StandardPartialOrder` declares `<`, `>`, `<=`, `>=` (`.fsi:174-179`), which the clauses' `b1 < b2` find, and a total `CMP` answers `TotalComparison` (`.fsi:229`), whose thunk `LEXICO:` exists (`.fsi:133`). S-e stays unless 1c, 2, 3, 4 or 6 is taken for lists.
- *Walk values*: `:41` stops at dispatch. A pair is no `StandardTotalOrder`; the record's probe met the same refusal with a `StandardPartialOrder` bound: 'Unification error: ... Cannot unify (Int,Int) ... with StandardPartialOrder[\A\]' (REPORT section 5). `:43` stops too, because `RR64` is only a `StandardPartialOrder[\RR64\]` (`.fsi:293`); `QQ` is the same (`.fsi:391`). Pairs of integers, `Char`, `String` and `Boolean` are unchanged, since `Boolean` is a `StandardTotalOrder` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:224-225`). So are pairs of lists, because `List` claims a total order at every element type (S-e). `:40` and `:42` are unchanged.
- *One measurement*: the distance stage. It gives the count with whatever surfaces. The walk changes are known from the probe and the declarations.

**1b. Partial bounds.** Write `StandardPartialOrder[\A\]` and so on, which keeps floats and rationals.
- *Library*: the 20 headers. The `LEXICO:` calls need a thunk form on `Comparison`. The type group's compiler prelude has one, `opr LEXICO(self, other:()->Comparison): Comparison` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:704`, Steele, `b3c2e1342`, 2011-07-15). Maessen's 2007 spelling of the same idea was `PARTIAL_LEXICO:` (`91ab8926a`). Each `typecase` needs an `Unordered` clause or an `else`; today an unordered element falls out of the three clauses, and the checker does not refuse a non-exhaustive `typecase` ("TODO: A nonexhaustive typecase is an error.", `Misc.scala:676`).
- *Checker, walk, specification*: none.
- *Clears*: 17. By reading, 7 `LEXICO:` calls surface behind S-b to S-d unless `Comparison` gains the thunk form.
- *Walk values*: `:41` stops; `:43` unchanged. What an unordered element gives (a NaN, or `1/0` in a `QQ`) changes to whatever the new clause answers. Today's answer is not on record.
- *One measurement*: the distance stage with the thunk overload added.

**1c. The same bound on `LexicographicOrder`'s element.** Write `trait LexicographicOrder[\T extends LexicographicOrder[\T,E\], E extends StandardTotalOrder[\E\]\]`. This is the team's design in its unreachable advanced library, where the element type `X` is bounded by `TotalOrderOperators[\X,...\]` (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`; `Specification/advanced-lib/algebraic-constraints.tex:494-560`).
- *Library*: `List[\E\] extends LexicographicOrder[\List[\E\],E\]` must then bound its own `E`, or its extends clause is ill-formed (`Library/List.fsi:67`, `Library/List.fss:112`, `Library/PureList.fss:41`). So lists of tuples, functions and `()` cannot be written, nor lists of floats or rationals under the total bound. This is the PLAN's "bounds that give up ... lists of unordered elements". It contradicts POSITIONS, "The implicit bound of an unbounded type parameter is `Any`": "the library's generic containers are instantiated at tuples".
- *Checker, walk, specification*: none. The list sentence (`opr-overview.tex:294-295`) is not made false, but its "whose elements support" becomes "only such lists exist".
- *Clears*: S-e, 1. Every library declaration that builds a `List` at a type outside the bound would surface; the count is not measured.
- *Walk values*: `ResultBoundsRungB.fss:48-56` and `NumberOrderListDeclarations.fss:48` stop. `:44` is unchanged.
- *One measurement*: the distance stage with `List`'s `E` bounded. It counts the library's own lists at unordered types.

### Way 2. Lists' order on bounded top-level operators: `Set`'s shape

**The precedent.** The library already declares a container unbounded and its ordered operations bounded at top level. `Set`'s api trait is `Set[\E\]`, while its builders and reductions take `[\T extends StandardTotalOrder[\T\]\]` (`Library/Set.fsi:24`, `:56-60`). The tuple operators are top-level functions already, so for tuples this way is way 1.

**What it changes.**
- *Library*: `List[\E\]` stops extending `LexicographicOrder`. Its order becomes top-level operators such as `opr CMP[\E extends StandardTotalOrder[\E\]\](a: List[\E\], b: List[\E\]): TotalComparison`, with `<` and the rest. `LexicographicOrder` either loses its last unbounded user and takes 1c's bound, or goes. `List` must keep an `=` of its own. Without one, `<|1|> = <|1|>` falls to `opr =(a:Any, b:Any) = a SEQV b` (`:96`), and the answer becomes identity. That would be a value change in every list assertion; today the `=` comes from `LexicographicOrder` (`:1935-1937`). `PureList.fss:41` follows.
- *Checker, walk, specification*: none.
- *Clears*: S-e, 1. The new operators' overloading against `StandardPartialOrder`'s functional methods and the tuple operators is unmeasured. `AnyList` and `List` exclude `{ Number, HasRank, String }` (`List.fsi:55`, `:68`), and tuples exclude every trait type.
- *Walk values*: `:44` unchanged. A list stops being a `StandardTotalOrder`. So a list of lists has no order, a `Set`, `Avl` or `quicksort` over lists is refused at its bound, and comparing two lists of an unordered element type fails at the outer call, not inside it.
- *One measurement*: the distance stage, plus walk on the team's list tests for the kept `=`.

### Way 3. Conditional extension: the team's own unbuilt feature

**What it is.** Write `trait List[\E\] extends { AnyList, LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] } }`, with 1c's bound on `LexicographicOrder`. A list is ordered exactly when its elements are. A second entry, `where { E extends StandardPartialOrder[\E\] }`, would give lists of floats a partial order, the specification's "partial or total depending on whether the ordering of the elements is partial or total" (`algebraic-constraints.tex:520-523`).

**The team's record of it.**
- The grammar has a `where` clause on each extends entry: `TraitTypeWhere ::= TraitType Where?` (`Specification/appendices/grammars/concrete-syntax.tex:465`, `Specification/basic/traits.tex:83`, `ProjectFortress/src/com/sun/fortress/parser/NoNewlineHeader.rats:42-54`).
- The team's test `ProjectFortress/tests/conditionalExtension.fss` declares `RationalQuantity` extending `PartialOrderAndBoundedLattice[\...\] where { ninf AND pinf AND NOT nan }` and prints "Conditional extension with where clauses can be parsed."
- The front matter lists "where clauses and conditional extension" among the features not yet supported (`Specification/fortress/preamble.tex:95`).
- The July 2012 wind-down post names "conditional inheritance via `where` clauses" among the three things the team wished it had explored further (`research/extracts/fortress-websites-wayback.md:124-127`).
- The Internal Document warns that "With conditional subtyping (or conditional methods), we may also not be able to tell whether a trait has a particular method" (`Specification/appendices/internal-document.tex:556-560`).
- The checker's hierarchy check skips them: "TODO: Extend to handle non-empty where clauses." (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:127`, and `:163`, `:210`).

**What it changes.**
- *Library*: two headers and 1c's bound.
- *Checker*: subtyping, ancestors, inherited-method lookup, the exclusion rule and the Meet Rule must all hold under a condition. Today the kind environment takes a `where` clause's new variables and drops its constraints (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:117-127`).
- *Walk*: it must read the condition at dispatch. How walk reads an extends entry's clause is not on record.
- *Code generator*: it refuses a header's `where` clause (FACTS, the codegen line; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5027` at this base). What it does with an extends entry's clause is not on record. The class loader makes one class per instantiation, so it could choose a list class's interfaces per element type.
- *Specification*: the text gives a trait-level `where` clause only (`traits.tex:128-156`; `trait-parameters.tex:295-480`). Conditional extension needs a section in the S1 form with an Appendix I entry, and the front matter's list of unsupported features (`preamble.tex:95`) changes. POSITIONS puts `where` clauses that bind in an extends clause behind a gate ("`Maybe`'s empty case": "future work gated on `where` clauses ... not attempted before that gate opens"). PLAN's `where`-clause line already names "item 43's first way" with rows 433, 636 and 436 (`coordinator/PLAN.md:112`).

**Effect.**
- *Clears*: S-e, 1. With 1a for tuples, 18.
- *Walk values*: `:44` unchanged. Lists of tuples lose their order under 1a unless way 5 is taken too.
- *One measurement*: a two-path probe of one conditional supertype, to see whether either path reads the clause at all. The team's test only parses one.

### Way 4. Conditional members: a method's `where` clause on its trait's parameter

**The precedent.** The specification's binary-word library writes members that exist under a condition on the trait's own parameter: `multiplyLow(other: T): T where { b <= maxMultiplyBitLog }` (`Specification/advanced-lib/binary.tex:1503-1515`, commented out in the text). The Internal Document names "conditional methods" beside conditional subtyping (`:556`).

**What it changes.**
- *Library*: `LexicographicOrder`'s `CMP(self, other:T): TotalComparison where { E extends StandardTotalOrder[\E\] }`. But `LexicographicOrder` extends `StandardTotalOrder[\T\]` unconditionally (`.fsi:1333-1334`). A list of functions would then claim an order and lack its operation. So this way needs way 3 for the supertype, or `LexicographicOrder` must stop extending `StandardTotalOrder`, which is way 2's loss.
- *Tuples*: a `where` clause on a top-level function constrains its own static parameters exactly as a bound does. For tuples this way is way 1. It cannot admit a pair of pairs.
- *Checker*: it must read method `where` constraints (`KindEnv.scala:117-127`).
- *Walk*: its symbolic instantiation ignores `where` clauses ("TODO This is not quite right ...", `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FGenericFunction.java:49-51`).
- *Code generator*: it refuses the declaration (FACTS).
- *Specification*: the semantics of a member constraint on an enclosing parameter, in the S1 form.
- *Row 433*: its `SumReduction[\T\]`'s `distribute(r: MaxReduction[\T\])`, which needs `T extends StandardMax[\T\]` (`Library/FortressLibrary.fss:3278-3281`), has the same shape. The construct would serve it.

**Effect.**
- *Clears*: S-e, 1, with the supertype resolved.
- *Walk values*: as way 3.
- *One measurement*: a two-path probe of one conditional method.

### Way 5. Tuples ordered structurally: a language rule

**What it is.** A tuple type satisfies an order bound when its element types do: `(A, B)` is a `StandardTotalOrder[\(A,B)\]` when `A` and `B` are. These are Haskell's tuple instances, Rust's tuple impls and Scala's implicit tuple orderings (section 3, step 6).

**What it changes.**
- *Specification*: it makes false "Tuple types cannot be extended by trait types" and "A tuple type excludes any non-tuple type other than `Any`" (`types-vals-vars.tex:299`, `:306`). It contradicts the designers' later word, "Every trait type excludes \Void, \Bottom and every tuple type" (`types.tick:341`, `:424`).
- *Checker*: subtyping and bound checks.
- *Walk*: the subtype test at dispatch.
- *Run time*: the run-time types of tuples.
- *Library*: way 1's bounds.

**Effect.**
- *Clears*: with 1a, 17, and with 3, 18. It keeps the pair of pairs and, with 3, lists of pairs.
- *Walk values*: `:43` stops under 1a's total bound. None stops under 1b.
- *One measurement*: a checker shadow that lets a tuple meet an F-bounded order bound element by element, then the distance stage. It is a type-system change in every area.

### Way 6. Run-time dispatch through an `Any` fallback: the library's own device for `=`

**The precedent.** The library makes equality total by `opr =(a:Any, b:Any):Boolean = a SEQV b` (`:96`). Under walk, the more specific `=` of a tuple, list or number is chosen by dispatch, which is why the tuple `=` operators raise no site. `ActualReduction` keeps a `distribute(r: Any)` default beside specific overloads, "a hack to avoid the error of overloaded methods" (`:3089-3091`). This is how walk runs the 18 today, and Julia's way (section 3).

**6a. Public.** Declare `opr CMP(a:Any, b:Any): Comparison`, answering by a throw or `fail` for values with no order (or `Unordered`, which changes the meaning).
- *Library*: also `<`, `<=`, `>`, `>=` on `Any`, or the bodies rewritten to read the `CMP` result, for the 8 unread clauses. The thunk `LEXICO:` on `Comparison` is needed (1b). The fallback must answer `Comparison`, not `TotalComparison`: the Return Type Rule needs `RR64`'s `Comparison` (`.fsi:327`) to fit the less specific arm. So `LexicographicOrder`'s body, whose function is declared `TotalComparison` and which feeds `LexicographicReduction`, must narrow or use `LexicographicPartialReduction` (`.fsi:78-84`).
- *Checker*: none, but every program's `x CMP y` now typechecks at every type. A refusal becomes a run-time failure program-wide, as it already is for `=`. The specification's "If there is no such declaration, then the call is undefined, which is a static error" (`Specification/basic/overloading.tex:305-306`) never fires for `CMP` again.
- *Walk*: none. A new overload can make walk refuse programs at load (its Meet Rule per providing type); unmeasured.
- *Specification*: no sentence made false. The comparisons subsection lists the types that support the operators.
- *Clears*: 18, plus the unread 8 if `<` and its kin get fallbacks. A `LEXICO:` and a return-type site surface otherwise.
- *Walk values*: none of the pins. An unordered element's failure changes from a dispatch error to the fallback's throw.
- *One measurement*: the distance stage, which also shows the overloading stage's answer to the new arm.

**6b. A private helper.** `private elemCMP` is overloaded:
- `[\T extends StandardTotalOrder[\T\]\](a:T, b:T)`;
- `[\T extends StandardPartialOrder[\T\]\](a:T, b:T)`;
- pair and triple arms that call the tuple `CMP`;
- `(a:Any, b:Any)`, which throws.

The tuple operators and `LexicographicOrder` call it; programs get no catch-all.
- *Library*: the helper, the body changes of 6a, and the `LEXICO:` thunk.
- *Checker, walk, specification*: none.
- *Clears*: 18 under 6a's conditions. Tuples of unordered elements still typecheck statically, as the team's unbounded headers intend today.
- *Walk values*: none of the pins.
- *Risk*: on the compiled path, the dispatch method must choose among F-bounded generic arms at run time. Row 537's two-generic dispatcher defect is gated for phase 5 (POSITIONS, "Conversions never change which declaration runs.").
- *One measurement*: compile and run one probe that calls the helper at `((1,2),3)`, `1.5` and `"a"`.

**6c. A variant.** A `typecase` that enumerates the library's ordered types, the `additiveIdentity` device (row 436). It loses every program's own ordered types.

### Way 7. Monomorphic tuple comparisons at concrete element types

**What it is.** Declare `opr <(t1:(ZZ32,ZZ32), t2:(ZZ32,ZZ32))` and so on, as the revival narrowed `PCMP` and `SCMP` to `ZZ32` (`3be1fecd7f`; POSITIONS, "Scalar ranges are over `ZZ32` only").
- *Library*: one declaration per element-type combination, combinatorial.
- *Checker, walk, specification*: none.
- *Clears*: 17.
- *Walk values*: every combination not written stops: `:41` unless written, `:43` unless `(RR64, ZZ32)` is written.
- *One measurement*: none needed beyond the distance stage.

### Way 8. An explicit comparator

**What it is.** The peers' dictionary passing by hand: Scala's explicit `Ordering`, Java's `Comparator`. A function that takes a comparison per element, such as `lexCMP[\A,B\](t1, t2, ca: (A,A)->Comparison, cb: (B,B)->Comparison)`.
- An infix operator cannot carry the extra argument, so `<` and `CMP` on tuples go.
- A `List` would carry its element comparison in its value or take it at each call.
- *Clears*: 18 by removing the generic operator bodies.
- *Walk values*: the pins stop as written.
- No precedent among the library's operators. Listed for completeness.

### Way 9. Drop the tuple comparisons

The text is silent on tuples (`opr-overview.tex:276-295`; the skeptic and judge of rung N, `rung-number-order-slips/SKEPTIC.md:136`, `JUDGE.md:18`).
- *Library*: delete 10 declarations from the api and the component.
- *Checker, walk, specification*: none.
- *Clears*: 17.
- *Walk values*: `:40` to `:43` stop at dispatch.
- The team wrote these operators (2007), and the 2008 comment asks for bounds, not removal.
- *One measurement*: none; the stops follow from dispatch.

### Way 10. A checker that defers, or re-checks per instance

**What it is.** Either the checker accepts a call on an unbounded parameter's values and leaves it to run-time dispatch, which is walk's way, or it checks a generic body at each instantiation, C++'s templates' way, natural where the compiled path specialises each instance anyway.
- *Checker*: a change against its modular check of a generic declaration under its bounds, and against `overloading.tex:305-306`.
- *Specification*: that sentence revised.
- *Clears*: 18.
- *Walk values*: none.
- *One measurement*: a checker shadow.

### Way 11. Leave them

- Row 634 stays, pinned by `NumberOrderListDeclarations.fss`, and the 18 stay in the distance. Phase 3's true zero is not reached at these sites until a later construct, such as PLAN's `where`-clause line, opens.
- *Walk values*: none.

## 3. The nine steps, in short

**1. The mathematics.**
- The lexicographic order on a product A × B: (a1, b1) < (a2, b2) when a1 < a2, or a1 = a2 and b1 < b2.
- On sequences, the shorter prefix is less (`algebraic-constraints.tex:527-533`, which the library's `LEXICO (|self| CMP |other|)` builds).
- It is a total order when both factors are total and a partial order when they are partial.
- It exists exactly when the components' orders exist. It is a construction on ordered sets, and it composes: (A × B) × C is ordered when A, B and C are.
- So the order of a tuple or a list is conditional on its elements by nature. A formulation by a nominal bound that tuples cannot meet loses the composition at tuples.

**2. What each path does today (cited, not run).**
- *Walk*: it runs all five shapes by dispatch on the values. The pins pass (section 1).
- *A bounded copy*: under walk, a copy of `<` bounded by `StandardPartialOrder` stops on a pair of pairs (REPORT section 5, probe `ProbeTuples`).
- *Compiled checker*: on the one library, it refuses 18 sites (section 1).
- *Compiled path today*: it checks programs against its own prelude, which declares no tuple or list comparison. Its `StandardTotalOrder[\T\]` is the self-type idiom (`Library/CompilerAlgebra.fsi:16-22`). Its `Comparison` has the thunk `LEXICO` (`CompilerBuiltin.fsi:703-704`).
- *`where` clauses*: they do not bind on either path (FACTS, "The specification's own declaration of `Nothing` compiles on neither path ..."). The code generator refuses a declaration that carries one (FACTS, the line after it).

**3. The specification, under every spelling.**
- Lists compare lexicographically "when used to compare lists whose elements support these same comparison operators" (`opr-overview.tex:294-295`), a conditional.
- The advanced library: lexicographic order "may be partial or total depending on whether the ordering of the elements is partial or total" (`algebraic-constraints.tex:520-523`), with `LexicographicPartialOrder` and `LexicographicTotalOrder` bounding the element type (`:494-560`).
- `TotalComparison`'s `LEXICO` is "useful for supporting lexicographic comparison of ordered sequences" (`Specification/advanced-lib/comparison.tex:19-24`).
- Tuples: silent on their order. They cannot be extended by trait types and they exclude every non-tuple type but `Any` (`types-vals-vars.tex:297-310`; `Specification/basic-lib/objects.tex:175-189`). The later Types chapter says the same (`types.tick:341`, `:424`).
- `where` clauses: a trait-level clause (`trait-parameters.tex:295-480`, its syntax note "out of date", `:299`). An extends entry's clause in the grammar only (`concrete-syntax.tex:465`). Conditional extension is listed as not supported (`preamble.tex:95`). Members under a condition appear in the binary-word library (`binary.tex:1503-1515`).
- An undefined call is a static error (`overloading.tex:305-306`).

**4. Where it sits in the type hierarchy.**
- *The order traits*: `StandardPartialOrder[\T extends StandardPartialOrder[\T\]\]` with `CMP` answering `Comparison`, and `StandardTotalOrder[\T\]` below it with `CMP` answering `TotalComparison` (`.fsi:172-230`). Both are F-bounded and nominal.
- *Comparison*: `Comparison` comprises `Unordered` and `TotalComparison`, and `TotalComparison` comprises `LessThan`, `EqualTo` and `GreaterThan` (`.fsi:100-165`).
- *Total orders*: integers (through `Integral`, `.fsi:443`), `String` (`:2419`), `Char` and `Boolean` (`FortressBuiltin.fsi:224-228`).
- *Partial orders*: `RR64` (`.fsi:293`) and `QQ` (`:391`).
- *Tuples*: under `Any`, beside `Object`, outside every trait.
- *Lists*: `LexicographicOrder[\T,E\] extends { StandardTotalOrder[\T\], ZeroIndexed[\E\] }` (`.fsi:1333-1334`), and `List[\E\]` extends it at every `E` (`List.fsi:67`). So every list claims a total order statically.

**5. What the library does in the same family.**
- Equality: total through the `Any` fallback (`:96`), the device of way 6.
- The tuple point and stride comparisons: bounded per element and arity since 2008, the device of way 1.
- The tuple reductions: bounded per component (`.fsi:2011-2027`).
- The ordered containers: bounded by `StandardTotalOrder` (`Set.fss:25`, `Avl.fss:16`, `QuickSort.fsi:18`, `PrefixMap.fss:37`), so on their components' terms a tuple is no set element or sort key today.
- `Set`'s api trait is unbounded and its builders are bounded (`Set.fsi:24`, `:56-60`), the device of way 2.
- The team's unreachable advanced library bounds the element type of a lexicographic order (`Fortress.PartialTotalOrders.fss:117-140`).
- The team's comments mark the conditional forms as "NOT YET" (`comprises Integral[\I\] where [\I\]`, `FortressLibrary.fss:678`; `comprises List[\E\] where [\E\]`, `List.fsi:56`).
- Where the designers departed from Java: the library does not use Java's single `Comparable` with an erased comparator. It types the order by F-bounded traits and dispatches on both arguments.

**6. The peers, by family.**
- *Haskell (functional, unbounded)*: "All tuples are instances of Eq, Ord, Bounded, Read, and Show (provided, of course, that all their component types are)", required up to size 15 (Haskell 2010 Report, section 6.1.4). Lists are `Ord` when their elements are. The instance context is conditional extension; nested tuples compose.
- *Rust (close to the metal)*: `PartialEq`, `Eq`, `PartialOrd` and `Ord` are implemented for tuples "of arity 12 or less", "any trait bound expressed on `T` applies to each element of the tuple independently", "compared sequentially until the first non-equal set is found" (`std` docs, primitive `tuple`). It has two levels, partial and total, as Fortress has. A conditional impl.
- *Scala (JVM)*: `implicit def Tuple2[T1, T2](implicit ord1: Ordering[T1], ord2: Ordering[T2]): Ordering[(T1, T2)]`, through `Tuple9` (`scala.math.Ordering`, 2.13 api). Sequences get theirs from `Ordering.Implicits`, and the `Iterable` one is deprecated. A conditional member by evidence, `List.sorted[B >: A](implicit ord: Ordering[B])`, from the worker's knowledge.
- *Swift (close to the metal, nominal protocols)*: SE-0015 (implemented in Swift 2.2) adds `<`, `<=`, `>`, `>=` for tuples "up to arity 6", each element `Comparable`. Tuples do not conform to protocols, so a tuple element does not meet the constraint, which is way 1 with its loss. Its conditional conformance (SE-0143) and `Sequence.lexicographicallyPrecedes` on `Element: Comparable` (from knowledge) are ways 3 and 4.
- *Julia (scientific, multiple dispatch; from knowledge)*: `isless` on tuples and vectors is lexicographic by dispatch on the elements, with a `MethodError` at run time for an element with no order. That is walk today, and way 6.
- *C++ (from knowledge)*: `std::tuple`'s and `std::vector`'s `operator<` are templates checked at each instantiation. That is way 10.

**7. The history in the commits.**
- 2007-12-06, Maessen, `91ab8926a`, "Equality, partial ordering, and total ordering.": the F-bounded order traits and, in the same commit, the tuple operators unbounded, with `CMP` declared `Boolean`, and an unbounded tuple `PCMP`.
- 2007-12-08, Maessen, `b103e5537`: `LexicographicOrder`, and the list at every element type extending it.
- 2008-05-22, Maessen, `98aa8b653`: `CMP`'s result type fixed.
- 2008-08-20, Beckman, a type-checker developer, `b714f9c9e`, in a disambiguator commit for the static tests: "Shouldn't these operators have to extend something? A,B,C?"
- 2008-10-07, Maessen, `0948c2b1c`: `PCMP` and `SCMP` moved into `RangeInternals`, bounded `Integral` per element.
- 2010-07-17, Ryu, `f879200c8`: the bodies rewritten to the `typecase` form while the checker's typecase was built.
- 2011-07-15, Steele, `b3c2e1342`: the compiler prelude's `Comparison` with the thunk `LEXICO`, and no tuple comparison.
- 2012-07: the wind-down post wishes conditional inheritance had been explored.
- The revival has not touched the tuple operators or `LexicographicOrder` (`git diff a874948ac HEAD -- Library/FortressLibrary.fss` shows none of their lines).
- The first-parent history stops at the parentless import `5a68404fd`. These dates come from `git log a874948ac --full-history -S... -- Library/FortressLibrary.fss ProjectFortress/FortressLibrary.fss`.

**8. Pavol's principles, case by case.**
- *"The library's own practice is the standard."*: ways 1 (`PCMP`, `BIG MIN_MIN`, the ordered containers), 2 (`Set`) and 6 (`=`, `distribute`) each have a precedent in the same family. Ways 3 and 4 are the team's own unbuilt design, ways 5 and 10 no part of it, and ways 8 and 9 have no precedent among its operators.
- *"A fork resting on a rule that refuses something says what the library does instead"* (the same entry): the rule that refuses nested tuples is tuple exclusion. The library's answer for equality is way 6, and for ranges and containers it is way 1.
- *"The implicit bound of an unbounded type parameter is `Any`"* (containers at tuples): way 1c goes against it, and the others do not.
- *The type group's late positions*: the exclusion rule and the later Types chapter keep tuples out of traits, which counts against way 5. The type group never wrote tuple comparisons. Their prelude's thunk `LEXICO` on `Comparison` serves 1b and 6.
- *POSITIONS on `where` clauses*: `Nothing` and `covariant` are future work behind the `where`-clause gate, which puts ways 3 and 4 with PLAN's `where`-clause line.
- *Fast code a JVM can specialise* (the conversions entry): bounded generics (1, 2, 3, 4) give each instance a direct call. Way 6 dispatches per element. But microGPT compares no tuple or list, and interpreter speed is irrelevant (POSITIONS), so speed does not decide this.

**9. What a decision needs.** His choice of way or ways: one for tuples (1a, 1b, 5, 6, 7, 9 or 11) and one for lists (1c, 2, 3, 4, 6 or 11). The pins it changes, each listed before and after. If it is 3 or 4, the construct joins PLAN's `where`-clause line and the specification gets an S1 entry. If it is 5, the tuple-types section is revised against the later Types chapter. No default is on record (PLAN item 43).

## 4. A reading, marked as the worker's own

*The worker's reading, not a recommendation.*
- For tuples, the choice is between keeping what walk compares and keeping what the checker can prove.
- Way 6b keeps every pinned value and clears all 18 with the library's own device for `=`, at the cost of a run-time check on the compiled path, row 537's risk.
- Way 1a is Swift's answer and the team's own for `PCMP`. It clears 17 cleanly but changes two pins.
- For lists, way 3 is the only one that gives the specification's sentence its meaning, a list ordered exactly when its elements are, and it is what the team said it wished to build. It cannot land before the `where`-clause line.
- So a split reading, 1a or 6b for tuples now and 3 for lists with the `where` clauses, would leave S-e's one site until then.

## 5. What is not on record

Each item is settled by the way's one measurement above:
- what surfaces behind the 18 under each way;
- what walk answers today for a tuple or list with an unordered element (a NaN, `1/0`, a function);
- how either path reads an extends entry's `where` clause, or a method's `where` constraint on its trait's parameter;
- whether the compiled dispatcher handles 6b's generic arms;
- whether walk refuses 6a's new arm at load.
