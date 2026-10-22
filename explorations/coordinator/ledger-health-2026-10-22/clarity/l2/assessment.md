<!-- Ledger clarity pass, chunk l2: the twelve open rows 336, 340, 355, 364, 369, 371, 374, 405, 407, 416, 430 and 436 assessed by the record rubric at d4d454f9d, with each row's disposition and the evidence read. -->

# Chunk l2: assessment

Tree: `d4d454f9d`. Nothing was built or run. Every claim about the tree below comes from reading it, its git history, the batch records and the record. P = pass, F = fail, U = unresolved. Sc scope, Pr present meaning, Ev evidence, Co comprehension, Ow ownership, Cn consistency.

All twelve rows are in `flagged-rows.tsv` (refused note, or text after the history marker). All twelve are **rewrite**; the new lines are in `rows.rewrite`, and `ledger.py check --rows rows.rewrite` reports "12 rows, 0 fail the template". No row is fixed in the tree, and none needs a run before its new line can be written.

Each block ends with "Cut", the text of the old line that the new line drops. History keeps it.

## Row 336, walk's integer division by zero

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| F | F | P | P | F | F |

- Sc: the claim names `ZZ32` and `ZZ64` only. The refused note at `compile-ladder/climb-batch-12/RECORD.md:154` measured `ZZ` too: "`big(1) DIV big(0)` ends the run, 'BigInteger divide by zero'". `BigNum.java:160` is still a bare `x.divide(y)`.
- Pr: "Fix: a zero test raising `DivisionByZero` as `Int.overflow()` (`:258`) raises `IntegerOverflow`". The helper exists now: `Int.divisionByZero()` (`Int.java:263-266`), and the powers throw it at a base of 0 (`:291`). This is the refused note at `climb-batch-20/RECORD.md:134`.
- Ev: `Int.java:126` and `:132`, and `Long.java:140` and `:146`, hold at `d4d454f9d`. `Int.mod`'s `xi % yi` moved from `:357` to `:389`; `Long$Mod` calls it (`Long.java:172`). Compiled: `nativeHelpers/simpleIntArith.java:43` tests for zero and throws `DivisionByZero`.
- Ow: "Fixed half: `0 LCM 0` is `0` (d6faad28f, c9faa7df4)". That is row 385, which is `FIXED`, and `siblings: 385` names only that closed row.
- Cn: the claim says "raise a raw `java.lang.ArithmeticException`". F-24 says "Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes". The code agrees with F-24: `FunctionClosure.java:191-192` wraps the exception, "Wrapped exception".
- **Disposition: rewrite.** The claim now covers `ZZ` and says that the compiled path raises `DivisionByZero`. The notes are pinned at `d4d454f9d`, the fix names the helper, and the fixed sibling is gone.
- Cut: the fixed half and `siblings: 385`.

## Row 340, the code generator crash at a `typecase` body

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | P | P | P | P | F |

- Ev: `git diff --stat 052a7c3fe HEAD -- .../codegen/CodeGen.java` is empty, so `:3425-3427` and `:2820-2821` hold. The reproducer `XXXTypecaseBodyCoerceRungG.test` holds `compile_exception_contains=Error trying to close method scope`. `XXXTupleClauseSpreadRungG` and `XXXTryCompareCoerceRungE` exist.
- Cn: the refused note at `climb-batch-11/RECORD.md:135` is not in the row: "the same crash for a `try` as the body of a function returning `ZZ32` whose `catch` value is a numeral … on `83b1cae78`". No commit has touched `CodeGen.java` since `83b1cae78`. F-37 and F-134 agree with the row.
- **Disposition: rewrite.** The new line adds the `try`-body shape, pinned at `83b1cae78`. The other shapes keep their words, shortened to fit.
- Cut: "tests one-element tuples, has no `else`", about the coercion desugarer's union `typecase`. It was cut for length; row 498 keeps the pattern-name half.

## Row 355, `PureList`'s ill-formed `List` header

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | F | P | P | F | F |

- Pr: "The sibling `Library/List.fsi:67` reads `LexicographicOrder[\List[\E\],E\]`". Since `372b9bf6a`, `List.fsi:67-68` reads `{ AnyList, ZeroIndexed[\E\], LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] } }`. The same commit rewrote the component's header (`PureList.fss:41-42`) but not the api's (`PureList.fsi:41`), so the api and its component now disagree.
- Ev: `PureList.fsi:41` and `:75` are unchanged since the team. `PureList.fss` has no `zip`. `default_repository/configuration:44` and the two dormant copies hold.
- Ow: "which rung L deleted from `List.fsi`" tells a repair.
- Cn: F-225 says the self-type rule refuses "`PureList`'s `List` (row 355)", but the row quotes only the bound message. This is the refused note at `climb-batch-14/RECORD.md:158`. The message is at `TypeHierarchyChecker.scala:123`.
- **Disposition: rewrite.** The claim gives both refusals. The notes give the component's header and the repair "`:41` as the component's header".
- Cut: the dormant `zip` copies (`CompilerLibrary/List.fsi:99`, `ProjectFortress/BirdyLib/PureList.fsi:76`) and the source-path citation, for length.

## Row 364, walk's inference from the run-time class

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| F | F | P | F | P | P |

- Sc: the claim covers only a generic object's constructor. The refused note at `climb-batch-17/RECORD.md:192` adds a generic dotted method's lone `T`: `O.wrap(z)` gives `Box[\Int\]`.
- Pr: "The site … is not located; rung K's inference keeps it for arguments of one class". The site can be read: `EvaluatorBase.java:601-602` unifies each argument's `a.type()` with its parameter type. That is a reading, not a run.
- Co: "rung K's inference" names a batch's work, not a property of the tree.
- Ev: `XXXInferredStaticArgRungS.fss` asserts `Cell[\String\]`. `XXXInferredIntBindingRungT.fss` exists.
- Cn: F-74, F-123 and F-229 agree. The second refused note (`climb-batch-18/RECORD.md:153`, "left it as it was") is a story, and the new line leaves it out.
- **Disposition: rewrite.**
- Cut: the rung K clause, and "`Box[\Number\]`" from the dispatch list. F-74 keeps the dispatch.

## Row 369, the tuple separator

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | F | F | P | P | F |

- Pr: "Seven elements fall to `opr \|\|(self, b:Any)` (`:4263`): `ProgramError` 'Non-object receiver … trying to invoke method asString'". Since `4190069c4`, that member is `cast[\Object\](b).asString` (`FortressLibrary.fss:4412`), so seven elements end in `CastError` (`climb-batch-19/RECORD.md:134`).
- Ev: the line pins `:4253-4261`, `:4364` and `:4263` with no commit. They are now `:4402-4410`, `:4513` and `:4412`. `FTupleLike.java:60` and `CompilerBuiltin.fss:471` hold. Row 76 is open.
- Cn: the text after the marker, "Seven elements: now `CastError`.", contradicts the body.
- **Disposition: rewrite.** The claim and the notes now say `CastError`, and the lines are pinned.
- Cut: the old `ProgramError` text.

## Row 371, walk does not check `excludes` against `extends`

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | P | F | P | P | F |

- Ev: `Shell.java:419-423`, `TypeHierarchyChecker.scala:216-219` and `:225-227` carry no commit. The checker file has 128 more lines since `052a7c3fe`, and the messages are now at `:298-300` and `:307-308`. `TypeHierarchyChecker` runs only from `StaticChecker.checkCompilationUnit`, under `Shell.getTypeChecking()` (`StaticChecker.java:166-190`). `FTraitOrObject.java:236-251` is unchanged.
- Cn: the refused note at `climb-batch-19/RECORD.md:132` is not in the row: "under walk `trait Tx extends Any excludes { Object }` loads and its object is now an `Object` … the compiled checker refuses both". F-152 agrees with the row.
- **Disposition: rewrite.**
- Cut: the exact messages' trailing sentences, and the full `object O[\nat n\] extends { Vec[\n\], Vec[\3\] }` example. Row 414 holds it, and the new line points there.

## Row 374, printing a function value

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | F | F | P | P | F |

- Pr: "raise `ProgramError` under walk". Since `4190069c4`, walk ends in `CastError` at `cast[\Object\]` (`climb-batch-19/RECORD.md:134`).
- Ev: `:4364` and `:4263` carry no commit and are now `:4513` and `:4412`. `FortressBuiltin.fss:37-41` and `CompilerBuiltin.fss:460` hold.
- Cn: the text after the marker, "Walk: now `CastError` at `cast[\Object\]`.", contradicts the claim.
- **Disposition: rewrite.**
- Cut: nothing beyond the old mechanism.

## Row 405, a parameter written without a type

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | F | F | F | F | F |

- Pr: the local function's refusal (`STypeEnv.scala:72-75`, from `2d22d3a35`) is missing. It is the refused note at `climb-batch-11/RECORD.md:144`.
- Ev: "`STypeEnv.scala:192-193`" carries no commit. The refusal is now at `:200`. `MethodClosure.java:88` and `SpecData/examples/basic/Object.Decl.Cons.fss:24-25` hold.
- Co: "(row 21)" refers to a `FIXED` row about a dotted method's static arguments. The history line shows that it meant the inference chapter as a stub, and that chapter is no longer a stub.
- Ow: "siblings: 620, 621, 622". All three are closed: the local-function crashes are now the refusal.
- Cn: Appendix I, "The type of a parameter that a declaration leaves out" (`Specification/appendices/changes.tex:3750-3762`), states the refusal at top level, in traits and objects, and in local functions. The row does not cite it. The second refused note (`climb-batch-12/RECORD.md:156`, `MinReduction`'s `simpleJoin` typed by `1410a62de`) tells a repair, and the new line leaves it out.
- **Disposition: rewrite.** The status stays `NEGATIVE-VERIFIED` beside spec `silent`, the template question of REPORT section 7, item 1.
- Cut: the closed siblings, the "(row 21)" sentence, "whether or not the method implements anything" (the claim's "wherever it appears" says it), and the message's `MethodClosure cons(_:T):List[\T\]` prefix.

## Row 407, `comprises` a type parameter overflows walk

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | F | F | P | P | F |

- Pr: "Validity is unsettled: the traits chapter allows only trait identifiers in a clause, and a team note there questions the term". The chapter now reads a clause by values (`Specification/basic/traits.tex:235-258`), and the team's draft note sits in a revision box.
- Ev: "`SymbolicType.java:74`" carries no commit and is now `:80` (refused note, `climb-batch-13/RECORD.md:189`). `FType.java:209` and `:288-294` hold. `CompilerAlgebra.fsi:16` and `:24` hold.
- Cn: F-171 says "The text does not say whether a bare type variable may be listed; walk overflows its stack on one (row 407)", and the row says otherwise. The refused note at `climb-batch-14/RECORD.md:156` (P-146: a self-typed trait needs no `comprises T` on the compiled path) is not in the row.
- **Disposition: rewrite.** Spec `silent` stays, as for row 405.
- Cut: the old validity sentence, replaced by F-171.

## Row 416, walk applies no instantiation exclusion

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | F | P | P | F | F |

- Pr: "the site of the fix is not located beyond that check". By reading, `FType.excludesOther` (`FType.java:197-209`) has no case for two instances of one generic type, and `GenericTypeInstance` does not override it. The refusal moved from `OverloadedFunction.java:556-571` to `:587-602`; the old line pins its lines at `052a7c3fe`, which the template allows.
- Ow: the text after the marker tells a story: "Met again: … (batch 12 rung R)". Sibling 402 is `FIXED`.
- Cn: F-155 and F-257 name row 416 for the generic form, "fails the Meet Rule", which the row does not hold (refused note, `climb-batch-18/RECORD.md:152`). F-44, F-91 and F-252 agree with the row. `RangeInternals.fss:125-172` holds.
- **Disposition: rewrite.**
- Cut: sibling 402, and "The compiled run of the test prints PASS", which the claim's "the compiled run prints 3 and 4" already says.

## Row 430, the order of the ambiguity message

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| P | P | P | P | P | F |

- Ev: the old line pins its lines at `052a7c3fe`. At `d4d454f9d` the map is built at `Constructor.java:182-183` and iterated at `:287-288` and `:348-349`. The counter is at `FType.java:96-101`. `SingleFcn.java:87-95` and `FunctionClosure.java:130-131` hold.
- Cn: "one core fixes it for a given library". F-108 says three flags fix the order, "set together, so which of them fixes the order is not known". The refused note at `climb-batch-16/RECORD.md:158` is not in the row; it names the identity hash that F-232 points to.
- **Disposition: rewrite.**
- Cut: the `:182-183` citation.

## Row 436, the empty `SUM` over a user group

| Sc | Pr | Ev | Co | Ow | Cn |
|---|---|---|---|---|---|
| F | F | F | P | P | F |

- Sc: "nonempty sums run". A filtered `SUM` joins the identity, so `SUM[\M5\][i <- 1#4, i > 2] M5(i)` ends in `CastError` too (`compile-ladder/rung-library-distribute/REPORT.md` section 5).
- Pr: "dies at `unlift`: the identity's fallback answers the numeral `0`", and "ends in `unlift param 1 (r:M7) got arg 0: ZZ32 of type Int`". Since `2b1cd8e63`, the fallback is `else => cast[\T\](0)` (`FortressLibrary.fss:3393`), and `XXXEmptyGroupSumRungF` ends in `FortressException: CastError` (same report, section 2's run and section 12, item 4).
- Ev: the row quotes a failure that its own reproducer no longer shows.
- Cn: the `fortress-repo` skill's `revival-changes.md` says "a written static argument that is not a number type ends an empty `SUM` in `CastError` (row 436)". P-78 and F-131 agree that it fails. The health sample marked this row Keep; the change since `2b1cd8e63` makes it stale. The refused text of `climb-batch-17/RECORD.md:197` went into F-250 instead.
- **Disposition: rewrite.**
- Cut: "one over `Vector[\RR64,3\]`". It was measured before the cast and has not been measured since. Also cut: the F-243 sentence, which the report pointer replaces.
