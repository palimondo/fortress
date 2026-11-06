# Cold read, c17

Read with `CLAUDE.md`, the `fortress-repo` skill's core and `references/records.md`, `compiler.md`, `interpreter.md` (looked-up terms only). `NEGATIVE-VERIFIED` is read as "the failure is reproduced; the row is open" (records.md lists the seven status words, but their definitions are in the row template, which a cold reader may not open).

## Row 305

- **Defect:** the compiled path's prelude has no general array type. `Array`, `Array1`, `Array2`, `Array3`, `Vector` and the generic constructor `array[\T\]` do not exist there; only `ZZ32Vector` and `StringVector` are shipped. Any program using arrays fails to compile.
- **Where:** compiled path, the compiler's prelude (`CompilerBuiltin.fsi:563`, `:582` for the two vectors); the missing support is the interpreter library's `FortressLibrary` array part and `NativeArray.fss`.
- **Reproduce:** `bin/fortress compile explorations/run-c4/src/FlatArrays.fss`; it stops in DISAMBIGUATE with about 77 'X is undefined.' errors (`Array` 60, `Array3` 11, `Vector` 6). `array[\RR64\](4)` gives 'Function array is not defined.'
- **Status:** open, verified. No small shim is possible; the fix is the array protocol of `FortressLibrary` plus `NativeArray.fss` (about 1,000 lines), which ties to row 310 and, as I read it, to the switch-over. A worker builds it only under a brief for that; otherwise leaves it.
- **Could not resolve:** "full text: history, row 305": read as "the longer earlier text is in the ledger's history file"; unclear wording, but guessable. "three microGPT-shaped kernels, whose `SQRT`, `^` and `RR64` juxtaposition compile": read as "those parts compile, the arrays alone stop them"; slightly ambiguous. "siblings: 310": a related row, not defined in the skill (unclear wording / project convention).

## Row 733

- **Defect:** the code generator throws a RuntimeException 'Not in the trait table: C' when an object extends, first, a trait from an imported api, and later another trait that defines a method of the same name as one the api trait declares, even when the two methods are valid overloads (different parameter types). Walk runs the same program.
- **Where:** compiled path, code generator: `CodeGen.dumpMethodChaining` (`CodeGen.java:1009` at c124c6b65), which looks up the api trait's type in a trait table that does not hold it. Construct: object with several supertraits, method overloading across supertraits.
- **Reproduce:** no test file. Write api `Q1ApiC` with `trait C abstract tag(self, n: ZZ32): String end`; a component importing it with `trait D tag(self, s: String): String = s end` and `object O extends { C, D } tag(self, n: ZZ32): String = "c" end`; `fortress compile` stops with the exception; walk prints `cd`.
- **Status:** open, verified, no workaround. A worker may build a fix (and should first write the reproducer as an `XXX` test).
- **Could not resolve:** "also where the two overload validly": read as "even when the two methods are valid overloads"; clumsy but clear. "Q1 probe", "climb batch 16": provenance only. "walk prints `cd`": the program's main body is not given, so what prints `cd` must be guessed (presumably calls of `tag` with a `ZZ32` and with a `String`); the reproducer is incomplete (unclear wording).

## Row 837

- **Defect:** the compiled checker rejects an object field declared without a type (`sz = a + b`) with 'Must provide type for initializer', though the grammar allows a field to omit its type. In the distance stage's run, which continues past errors, the object is then left unchecked ('Cannot handle (LValue ...').
- **Where:** compiled path, the Scala checker: `scala_src/typechecker/Thunker.scala:91` (team's code), for an object's `SVarDecl` whose lvalue has no type. Walk is unaffected (prints PASS).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXObjectFieldWithoutType.test`: `object Pair(a: ZZ32, b: ZZ32)` with field `sz = a + b`; compile fails with 'Must provide type for initializer List(sz)'.
- **Status:** open, verified. A worker may fix the checker to infer the field's type; meanwhile write the type (`sz: ZZ32 = |a| + |b|`, as `Library/CovariantCollection.fss:135`).
- **Could not resolve:** "the distance driver's tolerant run": not a term in the skill; I read it as the distance stage (compiler.md: "runs each of the checker's steps ... whatever the earlier steps report"), but "driver" and "tolerant" are not defined (unclear wording). The notes' "(row 828)" and "whose field now has its type" refer to a past case, fine. The workaround's `|a| + |b|` differs from the test's `a + b`; harmless but reads as a different expression.

## Row 840

- **Defect:** in a component whose name starts with `Tuple`, a call of a generic function taking one parameter of a generic type of that component (`count[\T\](b: Box[\T\]): ZZ32 = 1`, called `count(Box[\ZZ32\](7))`) fails JVM verification: 'VerifyError: Bad type on operand stack', a `Tuple⟦FZZ32⟧` where `Box⟦FZZ32⟧` is expected. The same program under another component name runs.
- **Where:** compiled path, code generator / run time naming: probably the `Tuple⟦` prefix check (`Naming.TUPLE_OX`, `runtimeSystem/Naming.java:1196`) taking the component's types for tuples; not traced.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXTupleNamedComponentGenericParam.test`. Controls: renaming the component to `PairBoxCount` passes; two parameters, or `id[\T\](x: T)`, pass.
- **Status:** open, verified, cause not traced. A worker may trace and fix; workaround: do not name a component `Tuple...`.
- **Could not resolve:** "at a pair alike": unclear wording; I read it as "a pair argument fails the same way", but cannot tell whether it means a `Box` of a pair or a pair-typed parameter. "The bound at `Any` of an unbounded parameter is not its cause: it fails the same without it": "without it" is ambiguous (with an explicit bound other than `Any`?); unclear wording. "the tree tests no `Tuple` prefix by name" is clear enough: no grep hit for a test named with the prefix.

## Row 845

- **Defect:** under walk, a component that imports a `nativeHelpers` method with `import java` cannot call it: the call ends in `InterpreterBug` 'Non-top-level reference to imported com.sun.fortress.nativeHelpers.simpleIntArith.intLT', after walk prints one line per method of the helper class (55 for `simpleIntArith`).
- **Where:** walk: `interpreter/evaluator/BaseEnv.java:535-537` (the `bug` call) and `interpreter/env/ClosureMaker.java:99` (the printed lines); construct `import java`.
- **Reproduce:** no test file. `bin/fortress` on a program with `import java com.sun.fortress.nativeHelpers.{simpleIntArith.intLT => jLT}` and `println(jLT(1, 2))`; rc 1.
- **Status:** open, verified, specification silent. Nothing in the library or tests uses it, so a worker leaves it unless a brief needs it; workaround: bind the helper with a `builtinPrimitive` body (interpreter.md, "Natives").
- **Could not resolve:** "F-180's gap 3" and "passes gap 1, 'FortressBuiltin.ZZ32 is undefined.'": F-180 is a FACTS entry I may not read, so "gap 1" and "gap 3" are opaque; I read that the foreign-type reading at `NamingCzar.java:369-372` gets past an earlier failure, but not what gap 2 is (missing context). "as P-58 takes for the library": a POSITIONS entry; I read it as "the curator's decision P-58 binds library natives this way"; not checkable from the skill.

## Row 890

- **Defect:** on the compiled path a `finally` clause does not run when an exception escapes the `try`: an exception no `catch` takes is rethrown, and one listed in `forbid` is thrown on as `ForbiddenException`, both before `finally` runs. Walk runs `finally`.
- **Where:** compiled path, code generator `CodeGen.forTry` (`CodeGen.java:2078-2089` at c124c6b65): the `finally` block is emitted only after the normal-completion / caught label; `ATHROW` and `throwForbiddenException` come before it.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXFinallyOnEscape.test` (a missed `catch` and a `finally` that appends to a log leave the log empty); walk's counterpart `tests/FinallyOnEscapeWalk.fss`; link test `compiler_tests/FinallyOnEscapeLink.test`.
- **Status:** open, verified, no workaround. A worker may build the fix (emit `finally` on the escape paths), together with row 891, which touches the same code.
- **Could not resolve:** "Link test": not defined in the core; tests-writing.md's example (`XXX...RungW.test` and `...RungWLink.test`) suggests a passing companion test that ties the `XXX` test to the row, but its role is unclear to me (project convention not explained in what I read). `tests/FinallyOnEscapeWalk.fss`: path relative to `ProjectFortress/`, I assume.

## Row 891

- **Defect:** on the compiled path a function with `try ... finally` and neither `catch` nor `forbid`, whose block can throw, fails verification at class load: 'VerifyError: Bad return type', with the handler's `FException` left on the stack where `FVoid` is expected.
- **Where:** compiled path, `CodeGen.forTry` (`CodeGen.java:2081-2089` at c124c6b65): the handler is installed always, but with no clauses no rethrow is emitted, so the handler falls into the `finally` block with the exception still on the stack.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXTryFinallyNoCatch.test`; walk counterpart `tests/TryFinallyNoCatchWalk.fss` (walk rethrows after `finally`); link test `compiler_tests/TryFinallyNoCatchLink.test`.
- **Status:** open, verified. A worker may build the fix with row 890. Workaround: add a `catch` clause, though that then falls under row 890 (finally skipped on escape).
- **Could not resolve:** "Workaround: a `catch` clause, under row 890": read as "the workaround is subject to row 890's defect"; terse but resolvable. "Link test" as in row 890.

## Row 719

- **Defect:** under walk, a comprehension over a long sequential generator overflows the stack at the suites' 32 MB thread stack: `<| i MOD 7 | i <- seq(0#50000) |>` dies with `StackOverflowError`. A sum over the same generator runs.
- **Where:** walk, library: the sequential range joins left to right (`Library/RangeInternals.fss:1357-1367`), so `CVReduction`'s join `APPCOV` (`Library/CovariantCollection.fss:146-149`) builds a chain of `Append` nodes as deep as the list, which `cata` and `dirtyIAF` (`:138-143`) recurse down. Cause by reading, not traced.
- **Reproduce:** no test file. `JAVA_FLAGS='-Xmx768m -Xss32m' bin/fortress` on a program with `ys = <| i MOD 7 | i <- seq(0#50000) |>`; prints 'Caused by: java.lang.StackOverflowError' (at ee1aa1a95).
- **Status:** open, verified. A worker may fix the library (balanced join or non-recursive traversal); workaround: the parallel generator `0#50000`.
- **Could not resolve:** "siblings: 20": a related row, unknown content. `UnwrittenSequentialReductionWalk`: a test name with no path or extension; I guess `ProjectFortress/tests/UnwrittenSequentialReductionWalk.fss` (unclear wording). `dirtyIAF`: a library name I do not know; fine as a pointer.

## Row 294

- **Defect:** a user type ("carrier") that extends the library's `Matrix` and a user trait loses its type through the library's matrix algebra: `t()` and the products `mul`, `rmul`, `lmul` return plain library matrices, so a user operator on the carrier fails on a product's result. With `replica` overridden, the type survives `map`, `ivmap`, `+` and scalar scaling.
- **Where:** library, walk (compiled path has no arrays, row 305): `Library/FortressLibrary.fss:2874-2875` (`mul` allocates with `matrix[\T,s0,s2\]()`), `:2933-2942` (`rmul`/`lmul`), `:2943`, `:2955-2971` (`t()` builds a `TransposedMatrix`).
- **Reproduce:** no test file. Probe `explorations/run-c4/probes/vocabulary/v03_carrier_shed.fss`; its `.out.2` lines 4-5 keep the type, 6-8 shed it; the probe exists only in the parent of `11bf69c39`.
- **Status:** open, verified, class design limit, specification silent. Read as: leave it; the workaround is row 161's wrapper (a wrapper type rather than extending `Matrix`), at the price of re-wrapping every allocating library operation and every loaded value.
- **Could not resolve:** "carrier": not a Fortress term in the skill; inferred as "user type that carries the user's operators" (unclear wording / project term). "Row 161's wrapper alternative quantified": refers to a row I may not read; what the wrapper is must be guessed. "in the parent of `11bf69c39`": read as "check out that commit's parent to see the probe"; acceptable. "full text: history, row 294" as in row 305.

## Row 798

- **Defect:** the library declares no read-only two-dimensional array trait: `Array1` extends `ReadableArray1`, but `Array2` extends no `ReadableArray2` (none exists), so a read-only matrix such as microGPT's diagonal `Diag` must extend the mutable `Matrix`.
- **Where:** library, `Library/FortressLibrary.fsi:1621-1623` (`Array1` extends `ReadableArray1`, declared at `:1575`), `:1715-1717` (`Array2` extends `Indexed1`, `Indexed2`, `Rank2`, `StandardMutableArrayType`). `Diag` at `explorations/run-c4/src/FlatArrays.fss:36`.
- **Reproduce:** `grep -n ReadableArray2 Library/FortressLibrary.fsi` prints nothing (at c124c6b65).
- **Status:** open, verified, but "Decided: P-88" says the curator has decided; a worker follows P-88 rather than designing its own shape. What P-88 decided (a `ReadableArray2`, the standalone `ImmutableArray2` of the immutable-arrays probe, or leaving it) the row does not say.
- **Could not resolve:** "Decided: P-88": the decision's content is not in the row; a worker must print P-88 to know whether to build or leave (missing content, the main gap of this row). "siblings: 299": unknown related row.

## Row 808

- **Defect:** under walk, a shifted `Array2` reads wrong elements on every subscript of a slice of it, and shifting a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`. Example: for `s = a.shift((1,1))` of a 0-based `a`, `(s[(1,2)#(2,2)])[0,0]` is `a[1,2]` instead of `a[0,1]`.
- **Where:** library, walk: `SubArray2.subarray` (`Library/FortressLibrary.fss:2828`, team's code) subtracts the output's base `index(on0 - bo0, on1 - bo1)` where it should subtract its own base `b0`, `b1`, as `__SimpleSubArray1.subarray` does (`:2515`). `Array2.shift` (`:2727-2734`) makes such a view; `Array1.shift` of a `Col`/`Row` (`:2448-2453`) asks for an output based above zero.
- **Reproduce:** `ProjectFortress/tests/XXXArray2ShiftedSlice.fss`; also `(m[:,1]).shift(5)` raises 'Index -11 out of bounds for length 6'.
- **Status:** open, verified, fix known: `index(on0 - b0, on1 - b1)` makes the test pass. A worker builds the fix (promote the `XXX` test). Workaround: slice the unshifted array, or shift a `copy()` of a view.
- **Could not resolve:** the claim's first clause, "every subscript of a shifted `Array2` reads the wrong elements", reads two ways: every subscript of the shifted array itself, or of a slice of it (the example and the notes support the latter, through `subarray`); unclear wording. "`Array3` has no such override": read as "`Array3` has no `shift` override, so not affected (or not tested)"; ambiguous.

## Summary

- Row 305: clear.
- Row 733: clear; reproducer omits the program's main body behind "walk prints `cd`".
- Row 837: clear; "distance driver's tolerant run" undefined.
- Row 840: mostly clear; "at a pair alike" and "without it" ambiguous.
- Row 845: clear on the defect; "F-180's gap 3/gap 1" and P-58 opaque.
- Row 890: clear; "Link test" not explained.
- Row 891: clear.
- Row 719: clear; test `UnwrittenSequentialReductionWalk` has no path.
- Row 294: mostly clear; "carrier" and row 161's wrapper need outside context.
- Row 798: blocked on status: "Decided: P-88" does not say what was decided.
- Row 808: clear; claim's "every subscript of a shifted `Array2`" reads two ways.
