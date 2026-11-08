<!-- A probe of ledger row 364 (walk builds a generic inferred from a number value at the value's class, `Int`, not at the trait, `ZZ32`), by an Opus worker for the coordinator, 2026-11-08, on the curator's thread on change 40 of the page of `fortress-repo` changes (07:20 UTC). Read-only; measured at `157323e5`. -->

## Row 364: should walk build a generic inferred from a number value at the trait?

The probe's programs, `R364*.fss`, were scratch and are not kept. Nothing in `/home/user/fortress` or `/home/user/fortress-base28` was changed or built.

I read `/home/user/fortress-base28` at `157323e5`. Its `ProjectFortress/` and `Library/` match main's `2b5cc182` (`git diff --stat` between them prints nothing). Each probe ran under walk through `old-fortress.sh` with the per-call setup. No fix was built, so every claim about what a fix would do is marked "(by reading)".

### 0. What walk does today (measured)

`R364A.fss` (rc=0). It declares `object Cell[\T extends Any\](v: T)` and the overloads `kind(Cell[\ZZ32\])`, `kind(Cell[\RR64\])`, `kind(Any)`:
```
1 Cell(3) prints Cell[\ZZ32\]; kind Any decl; typecase arm else
2 Cell(z) prints Cell[\ZZ32\]; kind Any decl
3 Cell[\ZZ32\](3) kind Cell[ZZ32] decl; typecase arm Cell[ZZ32]
4 Cell(r) prints Cell[\RR64\]; kind Any decl          (r: RR64 = 0.25+0.25)
5 Cell(0.5) prints Cell[\FloatLiteral\]; kind Any decl
6 Cell((1,2)) prints Cell[\(ZZ32,ZZ32)\]
8 instanceOf Cell[ZZ32] of Cell(3): false
9 list display <|1,2|> ...; lk Any decl               (lk(l: List[\ZZ32\]) beside lk(Any))
10 list comprehension lk Any decl
11 filled(z) is vector false; written true             (row 721)
13 typecase 3: Int arm                                 (typecase x of Int => ...)
```

`R364J.fss` uses `import Reflect.{...}`; `typeOf` prints walk's own type text, not the ilk:
```
J3 just(3) typeOf Just[\Int\]; Just(3) Just[\Int\]
J4 typeOf(<|1|>) ArrayList[\Int\] typeOf(<|x|x<-1#2|>) ArrayList[\Int\]
J5 typeOf({1,2}) NodeSet[\ZZ32\] typeOf({x|x<-1#2}) NodeSet[\ZZ32\]
J6 typeOf((1,2.5)) (Int,FloatLiteral)
```
Sets already come out at the trait, because walk's recheck of an F-bound reads the supertypes (row 646). Lists do not.

`R364M.fss` is the control: the same operations with `ZZ32` written. Every one gives the target answer: `lk` picks the `List[ZZ32]` declaration, `SUM <|[\ZZ32\] 1,2,3|>` is 6, `Just[\ZZ32\](3) = Just[\ZZ32\](3)` is true, `openAt[\ZZ32\](z)` is an `OpenRange[\ZZ32\]`, the nested `BIG CONCAT` gives `<|2, 4, 6|>`, and the list `<` is true.

### 1. Where walk instantiates at a run-time class

**The source of the class.** `FValue.type()` of a `ZZ32` value is `value object Int extends ZZ32` (`LibraryBuiltin/FortressBuiltin.fsi:127`), returned by `FNativeObject.java:38-40`. The traits pair with the objects as follows (`Library/FortressLibrary.fsi`):
- `ZZ32 comprises { Int }` (`:551-553`)
- `ZZ64 comprises { Long }` (`:618-620`)
- `ZZ comprises { BigNum }` (`:686-688`)
- `NN64 comprises { UnsignedLong }` (`:495-497`)
- `RR64 comprises { Float, FloatLiteral }` (`:291-294`)

**The sites.**
1. **Generic functions, constructors and generic dotted methods.** All go through `EvaluatorBase.inferAndInstantiateGenericFunction` (`interpreter/evaluator/EvaluatorBase.java:72-94`). It reads the value's type at four places:
   - `FType at = a.type();` at `:602` (unmoved since d4d454f9d);
   - the varargs unification, `:606-611`;
   - the unification of a parameter type that mentions `T` inside it, `:634-637`;
   - the lone-`T` pass, `narrowest` at `:645` (unmoved), whose candidates are `v.type()` at `:782-785`. The fallback `inferByUnification` reads `a.type()` again at `:936`.
2. **Reductions and comprehensions with no declared type.** `Evaluator.bigOperatorByElements` (`Evaluator.java:799-815`) calls `__elemsOf`. That builds each element with `__ElemsOne(x)` through `__elemsOne(x: Any)` (`Library/FortressLibrary.fss:1428`, object at `:1408`): a constructor inference from the class. `__elemsJoin` (`:1411`) joins them, and `EvaluatorBase.elementsType` (`:267-271`) hands the join to the big operator.
3. **List displays.** `opr <|[\E\] xs: E... |>` (`Library/List.fsi:114`) is a varargs inference (rows 20 and 432).
4. **The array factories and `openRange`.** `array1` and `array2` (`FortressLibrary.fss:2692-2703`) and `openRange` (`:4327-4332`) typecase over a witness that puts `T` inside an invariant generic. At `T = Int`, `array1` gives a plain array (row 721) and `openRange`'s `cast` throws `CastError` (row 722). A witness over `T` itself still matches, because an arrow's range is covariant (`additiveIdentity`, `:3496`).
5. **Tuple types.** A tuple's type holds the classes (J6), so any mapping must look inside tuples.

**Not a site.** An untyped array literal is refused: "Can't infer element type for array construction" (`LHSEvaluator.java:145`).

### 2. The ways (item 1)

**A. Inference reads a number value at its trait.** This is possible before the switch-over.
- **Change.** A helper returns each of the five objects' single `extends` entry, also inside tuples, and the inference sites call it: `EvaluatorBase.java:602`, `:782-785` and `:936`. The test of which objects count already exists as `ObjectPrims.traitOf` (`glue/prim/ObjectPrims.java:52-77`); it would move to `evaluator/types/` and return an `FType`.
- **Size.** About 40-50 lines in 3 files.
- **Rows (by reading).**
  - Closes 364 for numbers; the string half (`XXXInferredStaticArgRungS`) stays.
  - Closes 721 except for float numerals, and closes 722.
  - Closes the integer cases of 717, 432 and 20. Row 20's own float example stays.
  - Closes the number half of 824. Its string half keeps `XXXPureListStridedSubscriptWalk` failing.
  - Row 510 keeps its claim; only its message changes, to `BoxK[\ZZ32\]`.
  - Unblocks 774 for integer lists only (see section 4). Leaves 729 alone.
- **Tests that flip (by reading).** `XXXInferredIntBindingRungT`, `XXXArrayInferredElementVectorWalk`, `XXXOpenRangeInferredIndexWalk` and `XXXNestedComprehensionDeclaredTypeWalk` would pass and need promoting.
- **Test that breaks: `LongStringTests.fss`, a team test.** Lines `:121` and `:141` write `identity⟦Generator⟦Int⟧⟧`. It passes at base: I ran a copy and it completed with rc=0. With displays built at `ZZ32`, `R364H2` shows the failure:
  ```
  Unification error: Closure/Constructor for identity param 1 (x:Generator[\Int\]) got arg ArrayList[\ZZ32\] of type ArrayList[\ZZ32\]
  ```
  So those two team-test lines would become `Generator⟦ZZ32⟧`.
- **At risk, by reading.** `ReflectiveQuickCheckTest`, the SpecData examples and the demos should be run in the rung.
- **microGPT.** No change.
- **Cost.** One walk rung. It does not move the checker's count or distance. F-74, F-328 and F-229 each need a sentence rewritten, and so does the skill's `revival-changes.md:89`.

**B. Every instance is made at the trait, at the factories.**
- **Change.** Replace the five objects before the memo in `FTypeGeneric.make` (`types/FTypeGeneric.java:298`), `GenericConstructor.make` (`values/GenericConstructor.java:69`), `FGenericFunction.make` (`:122`) and `GenericMethod.make` (`:82`), using A's helper.
- **Size.** About 50-70 lines in 6 files.
- **Reach.** Everything A reaches, plus a written `X[\Int\]`, so `LongStringTests` keeps passing, plus `Reflect`'s `apply`. The team's `Library/ReflectiveQuickCheck.fss:233-239` already converts `Float` to `RR64` by hand to work around this same mismatch.
- **Against it.** It identifies two types a program can name. The specification says two types are identical only if "their names and static arguments ... are identical" (`types-vals-vars.tex:51-52`). The checker, once it reads `FortressBuiltin`, would still refuse `LongStringTests:121`.
- **Cost.** One rung, with a larger review. Same flips as A; microGPT unchanged.

**C. Treat `G[\Int\]` and `G[\ZZ32\]` as equal in walk's subtyping.**
- **Change.** `FType.subtypeOf`, instance equality, and `OverloadedFunction`'s `argsMayBeEqual` sites (`:1033`, `:1125`, `:1384`, `:1451`, `:1468`, `:1548`). The instances stay distinct objects, so `SEQV` and `typeOf` still tell them apart.
- **Size.** Not sized; large.
- **Against it.** The same identity sentence, more deeply than B. Not recommended.

**D. The value's run-time type becomes the trait.**
- **Change.** `FInt.type()` and the others return the trait. This changes every number dispatch, including microGPT's arithmetic, and how natives carry `self`.
- **Breaks (by reading).** `NativeHelperFloatCarriedWalk.fss:5-6`, whose parameters are declared `Float`.
- **Against it.** F-74 (a fact) and the spirit of P-169. Costs several rungs. Not recommended.

**E. After the switch-over (P-12 with P-76's walk half).**
- **How it closes the gap.** The checker's inferred static arguments would reach walk; the checker records them at `scala_src/typechecker/impls/Functionals.scala:229-269`, but whether walk would read them is not checked. Then `Cell(z)` arrives as `Cell[\ZZ32\]`.
- **The numeral case differs.** `Cell(3)` takes the numeral's own type: row 364 records the compiled run printing `Cell[\IntLiteral\]`, and `inference.tex:183-186` agrees. Even on the checker, `kind(Cell(3))` picks `kind(Any)`, because the call is accepted as written (`inference.tex:190-203`).
- **Cost.** No rung of its own; it waits on P-12 (F-9, row 833 give the distance).
- **A or B is not wasted.** Walk keeps instantiating at run time where dispatch picks a generic declaration (P-48, row 538), and A's helper never touches `IntLiteral`.

**F. The expected type directs walk's inference (row 510's repair).**
- **Change.** `LHSEvaluator` and `BuildEnvironments` pass the declared type into inference.
- **Reach.** Typed bindings only. `XXXInferredIntBindingRungT` and `XXXInferExpectedTypeRungK` flip; `XXXExpectedTypeFixRungT` flips if every form is covered. It does nothing for dispatch, `typecase`, arguments, or rows 721 and 722.
- **Cost.** One rung. It complements A or B.

**G. Write the static argument.** This is today's workaround. It costs nothing, and the model already does it everywhere.

**Sub-choices for A and B.**
- **FloatLiteral, the sixth native number object.** Today the checker and walk agree on it: both give `Cell(0.5)` as `Cell[\FloatLiteral\]` (F-57, F-328). Mapping it to `RR64` would close row 20's example, row 432's float `SUM` and row 721's float numerals, but it would create a split from the checker where none exists. My reading: leave it out.
- **Strings (S).** Row 364's asserted half is `Cell("s")` coming out as `Cell[\FlatString\]`. `String` has no `comprises` clause. Its objects are `FlatString`, `CatString`, `EmptyString` and `SubString` (`Library/FlatString.fss:34`; `Library/String.fss:75`, `:282`, `:353`), so mapping them needs a string-specific table.

**microGPT: no line of either program builds a generic from a numeral or a number value (by reading).** No way except D changes either program. The lines that come closest:
- **Flat** (`MicroGptFlat.fss`):
  - `:17-18` are tuples of numerals.
  - `:28` (`BIG MAX z`, `SUM e`) and `:52` (`SUM vm`) fix `T` through an `Array[\RR64,ZZ32\]`; `:43` writes `SUM[\ZZ32\]`.
  - The scalars at `:60`, `:64` and `:77-79` meet operators whose `T` the array fixes (`FortressLibrary.fsi:2798`, `FlatArrays.fsi:15-21`).
  - Its vocabulary writes `array[\RR64\]` and `array[\ZZ32\]` (`FlatArrays.fss:14-17`, `:130-162`); `:171` takes `T` from a matrix.
- **APL** (`MicroGptApl.fss`):
  - `:26-27` are tuples; `:42` is as Flat `:28`; `:59` writes `SUM[\ZZ32\]`.
  - `:43` uses `iota`, whose type is written (`AplMg.fsi:13`); `:82` expands `+/vm` to `SUM vm`.
  - `:87` and `:90` reach `FlatArrays2.fsi:68-70`, where the array fixes `T`; `:106` is scalars over arrays.
- **Quick checks.** They write `[\RR64\]` and `[\ZZ32\]` (`MicroGptFlatQuick.fss:29`, `:38-40`, `:49`; the APL quick check alike).

### 3. What else still shows the five to a program (item 2)

**Error messages.** They print `FType.toString`, which is the class name (`types/FType.java:115-117`, `types/FTraitOrObject.java:183-191`).

| Message | Code | Measured output |
|---|---|---|
| RHS not assignable | `LHSEvaluator.java:224-227` | `R364B`: "RHS expression type Cell[\Int\] is not assignable to LHS type Cell[\ZZ32\]". `R364D` and `R364G`: "RHS expression type Int is not assignable to LHS type String". A and B do not fix this scalar case. |
| No matching overload | `values/OverloadedFunction.java:2285-2289` (also "Ambiguous coercion", `:2351`) | `R364C`: "args = (Cell[\Int\])". `R364F`: `SUM <\|1,2,3\|>` gives "args = (ArrayList[\Int\])". Values print through `FObject.getString` (`:33-38`) and `FTupleLike.toString` (`:67-68`). |
| Unification error | `values/NonPrimitive.java:155-164`, `:178`, `:258-270` | `R364K`: "Closure/Constructor for g param 1 (x:String) got arg 3: ZZ32 of type Int" |
| Unify messages (by reading) | `types/FType.java:553`, `:576-583`, `:595`, `:616`, `:626` | These also print Java class names. |
| Others (by reading) | `Evaluator.java:106`, `:115` (ascription); `BuildEnvironments.java:230`, `:764`, `:785`; `BaseEnv.java:317`; `LHSEvaluator.java:102`; `values/Coercions.java:227`; `glue/prim/ReflectMethod.java:93` | — |

Three gated revival tests pin the class text in their keys: `tests/TupleOrderNestedRefused.test:1`, `TupleOrderMixedRefused.test:1` and `TupleOrderUnitRefused.test:1`, for example `(1,2): (Int,Int),(1,2.5): (Int,FloatLiteral)`. Climb batch 27's carrier rung chose not to change `FType.toString` (`compile-ladder/rung-any-carrier/REPORT.md:187`). That was a worker's choice, not a POSITIONS entry.

**Reflection.** `Reflect$ToString` returns `ty.toString()` (`glue/prim/Reflect.java:434-437`), and `typeOf` returns the run-time type (`:210-213`). `R364I` printed:
```
I4 typeOf(3): Int; typeOf(VCell(3)): VCell[\Int\]; typeOf(2.5): FloatLiteral
I5 theType[ZZ32] = typeOf(3): false
```

**Equality.** `SEQV` holds two instantiations unequal. `R364I` printed:
```
I1 VCell(3) SEQV VCell[ZZ32](3): false
I2 VCell(3) = VCell[ZZ32](3): false
I3 Just(3) = Just[ZZ32](3): false
```
A and B would make all three true (`R364M` M3 shows the written form is true).

**Types a program names.** The five are nameable types:
- `typecase 3 of Int =>` takes the `Int` arm (A:13).
- `NumberPrintTest.fss:32` and `:36` (a team test) have `BigNum` and `UnsignedLong` arms.
- `NativeHelperFloatCarriedWalk.fss:5-6` declares `Float` parameters.

**Dispatch, bindings, `instanceOf`, factories, `SUM`.** These are in section 0. A and B fix them, except for `FloatLiteral` and strings.

**Already fixed** (F-328): `ilkName`, `asString` and `asDebugString` print the trait (`R364I` I6 prints "a VCell[\ZZ32\]: VCell[\ZZ32\]").

### 4. Conflicts with decisions (item 3)

- **P-12.** Its "not changed for this" is about running the checker. A, B, F and G give walk no static types, so none conflicts. Row 364's own text does not say it waits on P-12; the record's ground is F-74's title, "it stays so until walk has the checker's static types". That title is about a numeral's type, and A and B keep it.
- **P-59 and P-74.** No conflict: an `Int` value's coercions are `ZZ32`'s, and `narrowest` still gives `ZZ64` for a `ZZ32` with a `ZZ64` (by reading).
- **P-76.** No conflict. `literals.tex:159-165` says walk "gives such a numeral the type ℤ32", and A agrees with it. A's answer for numerals is interim (E later gives `IntLiteral`); its answer for computed values lasts.
- **P-48 — needs your reading.** It says "Under walk ... dispatch takes the value's type". If that means walk's class, A's wording departs; if it means the specification's type, which knows no `Int`, A holds.
- **P-154 — only partly met.** It makes row 774's walk half wait for "P-12 ... or row 364". A meets that for integer lists only. By reading, `<|"a","b"|>` is an `ArrayList[\FlatString\]`, and `FlatString` is no `StandardTotalOrder[\FlatString\]`. So once walk reads `List`'s `where { E extends StandardTotalOrder[\E\] }` (`List.fsi:69-70`), a display of string literals loses `<`. Row 774 needs S or P-12 as well.
- **P-167.** A and B build it for instances. B goes further and reads a written `Int` as the trait.
- **P-169.** D conflicts in spirit.
- **P-91.** Unaffected.
- **Against non-decision sources.** B and C contradict `types-vals-vars.tex:51-52`; D contradicts F-74.
- **Specification sentences A makes false: none found.** The boxes at `inference.tex:233-275`, `:384-405` and `reductions.tex:27-43` say "run-time types" and never split `Int` from ℤ32.

### Defects

No new row is needed. The measured items below are row 364's mechanism, and each could go into its notes:
- `Just(3) = Just[\ZZ32\](3)` is false, and so is `SEQV` of two value-object instances.
- `typeOf(3)` prints `Int`.
- The scalar message "RHS expression type Int is not assignable to LHS type String".
- The message "got arg 3: ZZ32 of type Int".

### Decisions

- I counted `FloatLiteral` outside "the five", following the brief's list, F-328 and F-57.
- I treated the string half of row 364 as a separate sub-choice.
- Every effect of a fix is by reading; nothing was built.

### For FACTS

1. **The five are visible beyond dispatch and binding.** Under walk at `157323e5`, an instance inferred from a number value is at the class: `Just(3) = Just[\ZZ32\](3)` is false, `VCell(3) SEQV VCell[\ZZ32\](3)` is false, `instanceOf[\Cell[\ZZ32\]\](Cell(3))` is false, and `typeOf(3)` prints `Int`. The ilk alone does not meet P-167's "stop being types a program sees". Evidence: no test; `R364A` and `R364I`.
2. **Lists stay at the class while sets get the trait.** Displays and comprehensions with no declared type are `ArrayList[\Int\]`; sets are `NodeSet[\ZZ32\]`, through the F-bound recheck. Evidence: `R364J` J4 and J5.
3. **`LongStringTests` passes only because displays are built at `Int`.** Its lines `:121` and `:141` write `Generator⟦Int⟧`, and it passes at base (rc=0). `R364H2` shows a `ZZ32` list fails there.
4. **The team's library already works around this.** `Library/ReflectiveQuickCheck.fss:233-239` converts `Float` to `RR64` by hand for this reason.
5. **The record overstates how far the fix reached.** F-74 and F-328 stand, but messages and `typeOf` still print the class, and three revival tests pin `(Int,Int)` in their keys.

### Commands

`import Reflect.{...}` with `typeOf(x)` prints walk's own run-time type text, which `ilkName` hides since F-328.

### Questions for the curator (decisions not taken)

1. **Close row 364's number half now?** The options are A (one rung; respell `LongStringTests:121` and `:141` as `Generator⟦ZZ32⟧`), B (one rung; no team-test line; but it identifies two written types), F (typed bindings only), or G (keep writing the argument until E). A conflicts with no decision.
2. **Map `FloatLiteral` too?** It closes row 20's example and the float cases of 432 and 721, but splits walk from the checker.
3. **Map the library's string objects to `String` (S)?** It closes the asserted half of 364 and keeps string lists ordered once row 774's walk half lands.
4. **The message half.** Render the five by their trait in walk's error messages and in `Reflect$ToString`, and move the three `TupleOrder*Refused.test` keys, or leave the messages as they are?

### Summary (under 400 words)

**The gap.** Walk infers a static argument from `FValue.type()`, which is the class `Int`, `Long`, `BigNum`, `Float` or `UnsignedLong`. The reads are at `EvaluatorBase.java:602`, `:645` (`narrowest`, candidates `:782-785`) and `:936`. Generic calls, constructors, dotted methods, list displays (varargs) and comprehensions (`__ElemsOne`) all take that path. Sets already get the trait, through the F-bound recheck. The array factories and `openRange` then fail through their witness (rows 721, 722).

**Visible to a program today** (measured at `157323e5`):
- dispatch past `Cell[\ZZ32\]`, typed-binding refusals, and `typecase` and `instanceOf` misses;
- `Just(3) = Just[\ZZ32\](3)` is false, and `typeOf(3)` prints `Int`;
- messages such as "RHS expression type Int…", "got arg 3: ZZ32 of type Int" and "args = (Cell[\Int\])";
- `typecase` arms that name the five.

**The ways.**
- **A**, reading the five at their trait in inference, is about 40-50 lines in 3 files and one walk rung. It closes 364's number half, 721 and 722, and the integer cases of 717, 432, 20 and 824, and four expected-failure tests flip. It breaks the team's `LongStringTests` (`Generator⟦Int⟧` at `:121` and `:141`).
- **B**, canonicalizing at the four instance factories, is about 50-70 lines in 6 files and one rung. It reaches the same rows and changes no team-test line, but it identifies two types a program can name, against `types-vals-vars.tex:51-52`.
- **C** and **D** are large and against the specification or F-74 and P-169.
- **E** (P-12 with P-76) gives `Cell(z)` `ZZ32` from the checker, but `Cell(3)` becomes `Cell[\IntLiteral\]`. A or B remains useful after it.
- **F** (expected type, row 510) fixes typed bindings only. **G** is writing the argument.

**microGPT.** No line of either program builds a generic from a numeral or a number value; no way except D changes them.

**Conflicts.** None with a decision for A. P-48's "the value's type" needs your reading. P-154's condition for row 774 is met for integer lists only: string-literal lists, `List[\FlatString\]`, would lose `<` unless strings are mapped too.

**Open.** `FloatLiteral` (mapping it would split walk from the checker), strings, and the message half, which three revival tests pin.
