<!-- What the next ladder climb can actually contain, written 2026-09-17 by an Opus worker on Pavol's question of whether the next climb's rungs can be batched or whether parallelism is the wrong shape for this work. Every candidate is traced from the ladder re-run in `explorations/compile-ladder/after/` to a declaration in the interpreter world, a spelling in the specification, and what the compiler world has of it today. Nothing was edited: the source tree, the corpora and the ladder data are as they were. One line per paragraph. -->

# The next climb: what is in it, and whether it can be batched

## 0. The short answer

Fourteen candidate rungs are free of the array-representation fork and the library-route fork, and all fourteen of them together clear the disambiguate wall for **38 of the 139 `tests/` files that stop there**, computed from `compile-ladder/after/raw/tests/`.

**104 of the 303 non-passing `tests/` files** are gated directly on the array representation, the `nat` static parameters that the array types need, or the generic generator and reduction tower: 82 of the 139 at `disambiguate` and 22 of the 133 at `typecheck` (method in §1).

The last climb's own record says what a name rung at the disambiguate wall buys: of the 22 new passes, **none** came from a rung that added a missing name to clear a disambiguate error — the eight `codegen`→`pass` moves were rung 3, the eight `typecheck`→`pass` moves were rung 4, and the five `run`→`pass` moves were rungs 6 and 7 (`compile-ladder/CLIMB.md`, "Every file that moved up"). Rungs 1, 2, 5 and 8, which are the name rungs, moved files `disambiguate`→`typecheck` and changed 48 files' first error without moving them.

So the next climb is small, its rungs are mutually independent because they are small, and the coupling that would make batching wrong is not among the candidates — it is in the work the candidates are avoiding. **Batching fits this set mechanically and is the wrong thing to be proud of**: the fork is the real gate, and §6 says so plainly.

## 1. Method, and one correction to how the ranking is read

The ranking at the head of `compile-ladder/after/REPORT.md` counts each file once, under the **first** name its output reports. That is the right way to rank a wall, and it is the wrong way to predict what a rung unblocks, because the disambiguator reports **every** unresolved name in the file in one pass, not just the first.

`tests/CharacterTest.fss` reports seventeen `Char is undefined.` errors and nothing else (`after/raw/tests/CharacterTest.fss.compile`); `tests/CovCollTest.fss` reports `ImmutableArray` first and also `Array`, `BigReduction`, `Char`, `Comprehension`, `LexicographicOrder`, `Maybe` and `MonoidReduction`.

Every count below therefore comes from re-reading `after/raw/tests/*.compile` for the 139 files at `disambiguate` and collecting the **whole** set of names each file names, under four patterns: `X is undefined.`, `Function X is not defined.`, `Variable X is not defined.`, `Operator X is not defined.`; anything else in the file is counted as a residual error that a name rung cannot clear.

A rung is credited with a file only when the rung's names cover that file's **entire** set and the file has no residual error. That is the condition under which the file leaves `disambiguate`; it is not a claim that the file then passes, and §5 is explicit that it usually does not.

One further correction to the pass count as a target: **55 of the 381 `tests/` files are `XXX`-prefixed negative tests** (`after/ladder.tsv`), written to fail with a stated message. The ladder's pass criterion is exit 0 with no `fail` in the output, so a correctly behaving negative test cannot score a pass; three of them currently do, which is itself worth a look. The reachable ceiling on `tests/` is therefore about 326, not 381, and 52 of the 303 non-passing files are negative tests.

## 2. The head of the ranking, name by name

### `ImmutableArray`, 26 files — behind the array fork, and not by itself

`ImmutableArray` is declared in the interpreter world at `Library/FortressLibrary.fss` as part of the array family that `Array`, `Array1`, `ImmutableArray1`, `ReadableArray` and the `array`/`array1`/`matrix`/`vector` factory functions belong to; the compiler prelude has none of them, and its one array-shaped declaration is `trait Matrix[\T, nat s0, nat s1\] extends Object end` at `Library/CompilerLibrary.fsi:267`, a header with no body.

It is behind the fork for the reason rung 2's report already gave and this survey confirms: what an `ImmutableArray[\T,nat n\]` *is* — boxed elements or a `double[]`/`int[]` backing — is fixed by its declaration and its natives (map README §5 step 2), and the declaration cannot be written without answering that.

It is also not a single-name block. Of the 26 files, only `ParamRef.fss` and `setMakerTest0.fss` name `ImmutableArray` alone; the other 24 name between six and thirty-three further undefined names, and the recurring companions are `Array`, `Maybe`, `Comprehension`, `BigReduction`, `MonoidReduction`, `ZeroIndexed` and `CommutativeMonoidReduction`.

Those companions are reported inside the imported interpreter-world apis, chiefly `Library/List.fsi` and `Library/Set.fsi`, not in the test: `after/REPORT.md`'s cascade cut counts `Maybe` 50, `Comprehension` 48, `BigReduction` 48, `MonoidReduction` 48. So what these 26 files are waiting for is not a name but **the interpreter's collection apis compiling against the compiler prelude**, which is the library route, Pavol's second reserved fork.

### `LexicographicOrder`, 20 files — the same fork, seen from `List.fsi`

`LexicographicOrder` is `Library/FortressLibrary.fss:1735`, `trait LexicographicOrder[\T extends LexicographicOrder[\T,E\],E\]`, and the site the ladder reports is `Library/List.fsi:67`, `trait List[\E\] extends { AnyList, LexicographicOrder[\List[\E\],E\] }`.

Not one of the 20 files names it alone: every one of them also names `BigReduction`, `Comprehension`, `Maybe` and `MonoidReduction`, and `RandomTest.fss` and `RangePrototype.fss` name twenty-odd more plus eighteen residual `Incorrect number of static arguments for type 'CompilerLibrary.Range': provided 1, expected 0` errors.

That residual error is worth naming: the compiler prelude's `trait Range` (`CompilerLibrary.fsi:141`) takes **no** static parameters while the interpreter's `Range[\I\]` takes one, so even a complete set of added names leaves those files erroring until `Range` is redesigned. `Range` is also why `IndexOutOfBounds[\I\](range:Range[\I\],index:I)` is commented out at `CompilerLibrary.fss:192-196` (`map/dormant-code.md` §1.1).

So `LexicographicOrder` is behind the library route and, for two of its files, behind a `Range` redesign as well. It is not writable as one rung.

### `Array1` 7, `Array` 5, `array1` 4, `Array2` 3, `array` 2, `matrix` 3, `vector`, `Vector`, `ReadableArray`, `Indexed`, `Rank` — all the array fork

Two of the seven `Array1` files name it alone (`arrayTest0.fss`, `primOverloadTest.fss`); three of the five `Array` files name it alone (`TransactionalArrayShakedown.fss`, `anyLenArray.fss`, `atomicArrayOps.fss`); three of the four `array1` files and two of the three `matrix` files likewise.

Every one of them is the same declaration decision. `AfterTypeChecking.fss`, `ColonOperator.fss` and `wrongOverload.fss` have already crossed into `typecheck` and stop there on `Unbound type: CompilerLibrary.Array1` / `Array2` / `Not in the trait table: CompilerLibrary.Array2`, which is the same absence one phase later.

### `Char`, 6 files — free of the fork, but it is a naming fork of its own

The interpreter declares `value object Char extends { StandardTotalOrder[\Char\] }` at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:574`; the specification spells it `Char` too (`Specification/library/apis/FortressBuiltin.tex:204`).

The compiler world has the same type under a different name: `trait Character extends Equality[\Character\] excludes { String, Number, Boolean }` at `CompilerBuiltin.fsi:483`, with 40 methods and the full comparison set — everything `CharacterTest.fss` asks for except the name.

Three of the six files name `Char` alone (`CharacterTest.fss`, `TransitiveImportMethodLookup.fss`, `formatTest.fss`); `FileReadWrite.fss` and `XXXnonBooleanCond.fss` name `Char` and `Maybe`; `LongStringTests.fss` is in the `List.fsi` cascade.

It is not blocked by the array fork, but `Character` is wired into `.java` by name: `NamingCzar.java:198` builds `internalFortressCharacter` from the string `"Character"`, `:460` resolves `ss(fortLib, "Character")`, `:542` maps it to `FCharacter`, and `:454-455` records that Fortress `Character` values are Java `int`s. So the rung is not "add a declaration"; it is one of three choices, and the choice is Pavol's:

**Fork (Char).** Rename `Character` to `Char` through the compiler prelude and the three `NamingCzar` sites, which is the spec's spelling and touches `.java`; or declare `trait Char` and make `Character extends Char`, which is library-only but leaves `opr =(self, other:Char)` undeclared so the comparison-heavy half of `CharacterTest.fss` still fails; or leave the divergence and mark these files out of reach. The first is the spec-faithful one and it is the one that costs a `.java` edit.

### `Thread`, 6 files — free of the library fork, and not a library rung

`object Thread[\T\](fcn:()->T)` with `val`, `wait`, `ready`, `stop` is `FortressBuiltin.fss:688-698` over four `builtinPrimitive` glue classes, declared in `FortressBuiltin.fsi:209-214`; the compiler world has nothing named `Thread`.

All six `Spawn*.fss` files name `Thread` and nothing else, so a declaration would clear their disambiguate wall — and then stop, because `spawn` parses to a `Spawn(Expr body)` node (`ProjectFortress/astgen/Fortress.ast:666`) and `CodeGen.java` has no `forSpawn`: the node falls to `defaultCase` at `:1668-1670` and throws.

So a `Thread` rung is a library declaration **plus** a codegen visitor **plus** a runtime binding to `runtimeSystem/`'s task machinery. That is map README §5 step 5, parallelism on the compiled path, not a rung of this climb. Adding the declaration alone moves six files from `disambiguate` to `codegen` and produces no passes.

### `builtinPrimitive`, 5 files — out of reach of any library rung

`builtinPrimitive("com.sun.fortress.interpreter.glue.prim.…")` is the interpreter's native-binding mechanism, resolved inside the evaluator; a grep of `ProjectFortress/src/com/sun/fortress/compiler/` finds no occurrence of the name at all.

The compiler world's equivalent is `nativeHelpers/` plus a `NamingCzar` clause, which is exactly what rung 7 added for `simpleIntLiteralArith`. There is no way to declare `builtinPrimitive` as a prelude function, because its argument is a class name interpreted at evaluation time.

`XXXarityTestFn.fss`, `XXXfailTestFn.fss`, `XXXnoclassNativeFn.fss`, `nativeTestFn.fss` and `testPrim.fss` are therefore permanently outside the compiler path as written; four of the five are negative tests in any case. This is a corpus-boundary fact for the ladder's denominator, not a rung.

### `Nothing` 4, `Maybe` 2, `Just` — free of both forks, and the largest single cascade lever

The interpreter has `value trait Maybe[\T\]` at `FortressLibrary.fss:1306`, `value object Nothing[\T\] extends Maybe[\T\]` at `:1342`, and `Just[\T\]`.

The compiler world has the **same protocol already implemented under different names**: `value trait Option[\E19\] extends Condition[\E19\] comprises { NoneObject[\E19\], Some[\E19\] }` with `Some`, `NoneObject` and a marker `None`, declared at `CompilerBuiltin.fsi:649-661` and implemented at `CompilerBuiltin.fss:1309-1367`, over the `Condition`/`SequentialGenerator`/`Generator` traits that the compiler prelude already carries.

A grep of `compiler/` and `runtimeSystem/` for `"Option"`, `"Some"`, `"None"` and `NoneObject` finds nothing, so nothing in Java or Scala special-cases these names: this is a **pure library rung**.

Two files clear on it alone — `ExceptionScoping.fss` (`Nothing[\ZZ32\].get`) and `oddJuxt.fss` — but it appears in **59 of the 139** disambiguate files' name sets, more than any other single name, so it is the one rung that makes every later collection rung smaller.

**Fork (Maybe).** The 2012 team's own draft for the compiler world, commented at `CompilerLibrary.fsi:217-229` and mirrored in the published `Specification/library/apis/CompilerLibrary.tex:196-206`, spells the empty case `NothingObject[\T\]` and keeps a separate unparameterised `object Nothing` for `coerce`. The interpreter, the spec's `FortressLibrary` and every test in the corpus write `Nothing[\T\]`. Both spellings cannot coexist. Whether the rung follows the team's compiler-world draft or the corpus is a decision, not a detail.

### `TryAtomicFailure`, 3 files — free of both forks, already written, one `(* *)` away

`object TryAtomicFailure extends CheckedException` with its `asString` sits commented out at `Library/CompilerLibrary.fss:283-285`, inside the block of ten exception objects that `map/dormant-code.md` §1.1 judges **finished, unwired**; the interpreter's is `FortressLibrary.fss:1566`.

`abortTest.fss`, `nestedTransactions3.fss` and `tryatomicTest.fss` each name it and nothing else at `disambiguate`.

They will not pass: `tryatomic` parses to `TryAtomicExpr(Expr expr)` (`Fortress.ast:678`) and `CodeGen.java` has no visitor for it, so the three move `disambiguate`→`typecheck`→`codegen` and stop. `abortTest.fss` additionally calls `abort()` and `printThreadInfo`, which the disambiguator does not report because they are applications, not type references.

### `recordTime` and `printTime`, 3 files — free of both forks, and the best pass candidates in the whole set

The interpreter writes them at `FortressLibrary.fss:4109-4118` over `nanoTime():ZZ64` and a top-level mutable `__globalTimeInformation: ZZ64 := 0`.

The compiler world already has the native: `nanoTime(): RR64` is declared at `CompilerBuiltin.fsi:23` and implemented at `CompilerBuiltin.fss:335` as `jNanoTime()` over `simpleDoubleArith.doubleNanoTime`.

The top-level mutable variable that the body needs is exactly what **rung 3 landed** (`compile-ladder/CLIMB.md`: the singleton field emitted without `ACC_FINAL`, `VarCodeGen.MutableStaticBinding`). This rung is therefore unlocked by the last climb and needs no new mechanism.

`nestedTransactions1.fss`, `nestedTransactions2.fss` and `nestedTransactions4.fss` name `recordTime` and `printTime` and nothing else. Reading `nestedTransactions1.fss`, the rest of it is `atomic do … end` (which `CodeGen.forAtomicBlock` at `:1729` handles), a `for i <- 1 # 5` generator, `assert(count, 25, "test1 failed")` (a comparing form rung 4 added), and `println`. These three are the candidates most likely to convert into passes rather than phase moves.

### `printThreadInfo` 2 and `printTaskTrace` 2 — free of both forks, one small native away

`printTaskTrace():()` is `FortressLibrary.fss:4109` and `printThreadInfo(a:String)`/`(a:Number)` are `:4214-4215`, all three over `StringPrim` glue; the compiler world has neither.

`taskTrace2.fss`, `taskTrace3.fss` and `atomic5.fss` name only these; `abortBlock.fss` names `abort` as well and so needs the transaction runtime, not a print.

The shape is rung 7's exactly: a new file under `ProjectFortress/src/com/sun/fortress/nativeHelpers/`, one clause in `NamingCzar.java`, and two declarations in the prelude. It is the one candidate in the batch of §4 that touches `.java`.

**Fork (diagnostics).** The interpreter's `printThreadInfo` prints the interpreter evaluator's own task state; the compiled world's tasks are the independent implementation in `runtimeSystem/` (map README, twelve facts). Whether the compiler-side function prints the `runtimeSystem` task or merely the JVM thread is a semantics question, small but real, and the three tests only check that it does not fail.

### `ceiling`/`floor` on `RR64`, 1 file — free of both forks, and the cheapest rung available

`ceiling(self):RR64` and `floor(self):RR64` are commented out in `trait RR64` at `CompilerBuiltin.fsi:439-440`; the natives they need are already bound, `simpleDoubleArith.doubleFloor => jDoubleFloor` and `doubleCeiling => jDoubleCeiling` at `CompilerBuiltin.fss:212-213`, and `opr SQRT(self):RR64 = jDoubleSQRT(self)` at `:900` is the model for the two bodies.

`buffons.fss` names `ceiling` and `floor` and nothing else. `realArith.fss` and `testRR32.fss` also want them, among twenty-odd other names each.

### The named integral operators, 2 files — free of both forks, pure Fortress

`MOD`, `REM`, `GCD`, `LCM`, `LSHIFT` and `RSHIFT` are declared in the interpreter inside `trait Integral[\I\]` at `FortressLibrary.fss:624-634` and implemented per concrete type at `:668-674` (`ZZ32`), `:736-742` (`ZZ64`) and `:790-796` (`NN64`).

The compiler prelude's `trait ZZ32` (`CompilerBuiltin.fsi:202-256`) has `DIV`, `<<`, `>>`, `<<<`, `BITAND`, `BITOR`, `BITXOR`, `CHOOSE`, `MIN`, `MAX` and no `MOD`, `REM`, `GCD`, `LCM`, `LSHIFT` or `RSHIFT`; `simpleIntArith.java` has no native for any of them either.

They do not need one: `REM` and `MOD` are writable over the existing `DIV`, `-` and `juxtaposition`, `GCD` recursively over `REM`, `LCM` over `GCD` and `DIV`, and `LSHIFT`/`RSHIFT` are names for the `<<`/`>>` that are already there. This stays inside the compiler world's flat design and never mentions `Integral`, so it does not touch the tower.

`chain0.fss` (`GCD`, `LCM`, `MOD`) and `rshiftbug.fss` (`RSHIFT`) clear on it; `intPrim.fss`, `longPrim.fss`, `UnsignedTest.fss`, `NumberPrintTest.fss` and `simpleSum.fss` each need it plus `widen`/`narrow`/`unsigned`/`signed` or a residual error.

### The rest of the fork-free tail

`round`/`truncate` on `RR64` clears `roundBug.fss`; the transcendental functions (`sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`, `log`, `exp`, present in the interpreter at `FortressBuiltin.fss:162-190` and absent from `simpleDoubleArith.java`, so a new native file) clear `juxtTwice.fss` and `oprTests.fss`; `widen`/`narrow`/`unsigned`/`signed` clear `fib13.fss` and `naiveSeq.fss`; `IndexOutOfBounds` clears `stringJuxt.fss` but needs the `Range` redesign named in §2.

`sequential` (`FortressLibrary.fss:1242`, `= seq(g)`) clears `BadBounds.fss` alone, but the compiler's `Generator.seq` is itself commented out at `CompilerBuiltin.fsi:594`, so it is really a generator-tower rung wearing one file's clothes.

`big`, `Integral`, `AnyIntegral`, `SumReduction`, `VoidReduction`, `ActualReduction` and `Rank` are tower names; each blocks one file and none is writable without the route decision.

## 3. The two corpora the ranking does not cover

`not_working_library_tests` did not move at all in the climb (`after/REPORT.md`), and its 26 non-passing files split into two causes, neither of which is a missing name.

**Fourteen at `parse`**, on `comprises Self` / `comprises T` — an unbraced `comprises` clause naming a static parameter. The grammar does admit an unbraced form (`NoNewlineHeader.rats:99-110`, `ComprisingTypes` at `:127-132`), so the refusal is narrower than "no unbraced comprises" and the exact cause is not settled by reading; the error is at the end of `trait Equality[\Self\] comprises Self` in `MaybeTest1.fss:15:38`. A rung here edits `parser/*.rats`, and per the map's touch-table the same rule must change in `templateparser/` as well and the checked-in generated parsers are regenerated. It is heavy, it is shared by both paths, and it is off the microGPT path.

**Eight at `disambiguate`**, and on **ambiguity, not absence**: `Type name may refer to: Generator, CompilerBuiltin.Generator` and `Type name may refer to: ComparisonLibrary.Comparison, CompilerBuiltin.Comparison`. A component that declares or imports its own `Generator` or `Comparison` collides with the implicitly imported prelude.

This is the same class of problem rung 1 met and worked around by **deleting** the private `trait Equality` from `library_tests/MaybeTest9.fss` (`CLIMB.md`, rung 1). Fixing it would retire that workaround and close eight files at once, and it is entirely free of both forks — but `Specification/basic/declarations.tex:476-533` enumerates the permitted shadowings and ends "No other shadowing is permitted in a Fortress program", and a top-level declaration shadowing an implicitly imported library name is not among them.

**Fork (shadowing).** Either the disambiguator is right and these eight test files are ill-formed under the spec, in which case the ladder should record them as out of reach and rung 1's deletion was correct; or the spec's list is incomplete and `disambiguator/TopLevelEnv.java` should let a local declaration win. That is a semantics question against the spec and is reserved.

## 4. A first batch of four

Under `batched-climb-plan.md` §5 — rule 1 disjoint declarations, rule 2 no content dependency, rule 3 at most one rung touching `.java` or `.scala`, rule 4 k = 4.

| rung | files | edit | clears at `disambiguate` | next stop |
|---|---|---|---|---|
| **A** `recordTime` / `printTime` | `Library/CompilerLibrary.fss` + `.fsi` | two functions and one top-level mutable variable over the existing `nanoTime()` | `nestedTransactions1`, `nestedTransactions2`, `nestedTransactions4` | plausibly `pass`: the rest of those files is `atomic`, `for`, comparing `assert` and `println`, all supported |
| **B** `TryAtomicFailure` | `Library/CompilerLibrary.fss:283-285` + `.fsi` | uncomment one exception object | `abortTest`, `nestedTransactions3`, `tryatomicTest` | `codegen`, no `forTryAtomicExpr` |
| **C** `ceiling` / `floor` on `RR64` | `LibraryBuiltin/CompilerBuiltin.fsi:439-440` + `.fss` near `:900` | uncomment two signatures, add two bodies over `jDoubleFloor` / `jDoubleCeiling` | `buffons` | `typecheck` |
| **D** `printThreadInfo` / `printTaskTrace` | new `nativeHelpers/*.java`, one `NamingCzar.java` clause, two declarations in `CompilerLibrary` | rung 7's shape exactly | `taskTrace2`, `taskTrace3`, `atomic5` | `typecheck` |

Ten files leave the disambiguate wall, and three of them are the climb's best chance at a pass.

**Why they do not collide.** A, B and D all edit `Library/CompilerLibrary.fss` and `.fsi`, and that is allowed: rule 1 is disjoint *declarations*, and the review's replay of the eight real rungs off a common base gave **0 conflicts in 21 source-file pairs including three rungs that all edit `CompilerLibrary.fss`** (`batched-climb-review.md` finding 3). A adds two functions and a variable, B uncomments one object, D adds two functions; no two touch the same declaration, trait body or operator. C is the only rung in `CompilerBuiltin`, and it edits `trait RR64`, where rungs 6 and 7 edited `trait IntLiteral`.

**No content dependency.** A needs `nanoTime` (present, `CompilerBuiltin.fss:335`) and mutable top-level variables (rung 3, landed); B needs `CheckedException` (present, `CompilerBuiltin.fsi:722`); C needs the two float natives (present, `CompilerBuiltin.fss:212-213`); D needs nothing from A, B or C.

**One `.java` rung.** D, and only D.

**Each rung's failing test.** A: a `library_tests` component that calls `recordTime(0)`, does work, calls `printTime(0)` and prints `PASS`, with a `.test` naming `link`, `run`, `run_out_WIcontains=PASS`. B: a component that `catch`es `TryAtomicFailure` by name. C: `assert(ceiling(1.5), 2.0, …)` and `assert(floor(1.5), 1.0, …)` in the comparing form rung 4 added. D: a component that calls `printTaskTrace()` and `printThreadInfo("x")` and prints `PASS`. Each must be **observed failing before the edit exists**, per `batched-climb-plan.md` §7.

**Two substitutions, if Pavol prefers a batch with no `.java` at all.** Replace D with the named integral operators of §2 (`MOD`, `REM`, `GCD`, `LCM`, `LSHIFT`, `RSHIFT` on `ZZ32` and `ZZ64`, pure Fortress bodies, clears `chain0` and `rshiftbug`); or with `Maybe`/`Just`/`Nothing` over the existing `Option` machinery, which clears only `ExceptionScoping` and `oddJuxt` but removes the commonest name in the whole cascade and is the prerequisite of every later collection rung — subject to the naming fork in §2.

## 5. What a whole climb of these rungs would be worth

All fourteen fork-free candidates together — A, B, C, D, the integral operators, `round`/`truncate`, the transcendentals, `Char`, the conversions, `Maybe`, `Thread`, `builtinPrimitive` and `IndexOutOfBounds` — clear the disambiguate wall for **38 files**, recomputed from `after/raw/`.

Six of those 38 are the `Spawn*` files, which then stop in codegen; five are the `builtinPrimitive` files, which cannot be reached at all; and of the 38, ten are `XXX` negative tests that cannot score a pass on this criterion.

The 139-file disambiguate wall is therefore not the place where passes come from. Passes come from `typecheck` and `codegen`, and that bucket is heterogeneous: the largest single cause at `typecheck` is an eleven-file crash, `java.util.NoSuchElementException: head of empty list` at `scala_src/typechecker/impls/Misc.scala:876`, where `dims.head` is taken on a list that is empty because the sub-expressions of an array literal failed to type — and all eleven files are array tests (`arrayTest1/2/3`, `arrayBig`, `array3test`, `arrayWithTrailingSpaces`, `compoundArray`, `NatParamOverloading`, `bogusNatParams`, `genericMethod1`, `sideEffUpdate`). Fixing the crash turns it into a message; it does not make a file compile.

After that the `typecheck` bucket has nothing with more than five files: `Missing parameter type for x` 5, `Could not check call to operator juxtaposition` 4, `Could not check call to function assert` 4, the `VarType cannot be cast to IntExpr` `nat` hole 3 (ledger 307), `Function body has type ZZ32, but declared return type is ()` 3. The `codegen` bucket has `OptionUnwrapException` 4, `Can't compile ObjectExpr` 5, `Can't compile LetFn` 2 and a long tail of ones.

## 6. The verdict on parallelism

**Batching is mechanically appropriate for this set and it is measuring the wrong thing.**

Mechanically it fits: the candidates are small, they add disjoint declarations in two files, at most one of them touches `.java`, none needs another's names, and the review's replay evidence says rungs of exactly this shape merge without conflict. A batch of four costs one gate instead of four and the design's 58.2-minute saving (`batched-climb-plan.md` §9) is real.

But the reason they fit is the reason they are not worth much: **they are independent because they are small, and the rungs that would move the ladder are coupled by construction.** `ImmutableArray` needs the array representation and `nat` parameters and the generator tower; `LexicographicOrder` needs `Maybe` and the reductions and a `Range` with a static parameter; the array literal crash needs the array types to exist before its error can even be reported. Those cannot be four parallel rungs under rule 2 no matter how the batch is drawn, because each is a prerequisite of the next.

The numbers say the same thing. **104 of the 303 non-passing `tests/` files** are gated on the array representation, `nat` parameters or the generator tower — 82 of the 139 at `disambiguate` and 22 of the 133 at `typecheck`. The fourteen fork-free rungs together reach 38 files, mostly by one phase, and the last climb's record says name rungs at that wall produced zero of its 22 passes.

So, plainly: **most remaining value is behind the array fork and the library route. The next climb is small, and the fork is the real gate.**

What follows from that, as a recommendation and not a decision:

Run **one** batch of four — §4's A, B, C, D — and run it because it is the cheapest honest way to exercise the batched machinery end to end on real rungs, close the tail, and get three files that may actually pass. Not because a second and third batch of the same kind would be worth their gates.

Then put the two reserved forks in front of Pavol as the next item rather than climbing further: the array representation (boxed against `double[]`/`int[]`, map README §5 step 2, ledger 303/306), and the library route (the interpreter's library as prelude against growing the compiler library). Both are on record as his; both now have a measured price for leaving them open, which is 104 files.

And note that step 4 of `PLAN.md`, the `nat` static parameters in the checker, is the one piece of the array fork that can be started **before** the representation is chosen: `reviews/nat-checking-plan.md` exists, the symptom is the three-file `VarType cannot be cast to IntExpr` crash plus `Matrix[\T, nat s0, nat s1\]` being the compiler prelude's only `nat` declaration, and nothing in it depends on whether an array is boxed. If a single next piece of work is wanted that is larger than a batch and not blocked on a fork, that is it.

## 7. What this survey did not settle

Whether any of the 38 files that would leave the disambiguate wall reaches `pass`: only running the rungs answers that, and §2 records for each candidate the next wall that is visible from the source.

The exact cause of the `comprises Self` parse failure (§3): the grammar admits an unbraced comprises clause, so the refusal is narrower than it looks and one probe would name it.

Whether the three `XXX` files that currently score a ladder `pass` are scoring it correctly.

Whether the `ZipException: duplicate entry` that `ConditionalOpTruncation.fss` now produces in codegen (`after/REPORT.md`, "Not verified") interacts with any candidate here; nothing in §4 goes near it.

The map was right on every point this survey leaned on — the two forks, the `CompilerAlgebra` and `Maybe` dormancy, the flat compiler prelude, the missing codegen visitors — with one correction: `map/dormant-code.md` §1.4 says `WellKnownNames.java:124` is `// compilerAlgebra(),` and commented out; on the current tree that line reads `compilerAlgebra(),` and is live, which is rung 1's work (`CLIMB.md`).
