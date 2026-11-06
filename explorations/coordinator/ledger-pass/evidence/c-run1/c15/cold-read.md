# Cold read: c15

Read with only `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md` and its `references/records.md`. One gap common to every row: the skill names the seven status words but defers their meaning to "the row template", which is in the ledger and not in the skill. I read `NEGATIVE-VERIFIED` as "the gap is real, reproduced, not fixed", so a worker may build a fix unless a note says it waits.

## Row 355

- **Defect:** The library's interface `Library/PureList.fsi` declares `List[\E\]` as extending `Equality[\E\]` and `ZeroIndexed[\E\]`. That header is ill-formed: `E` does not meet the self-type bound of `Equality`, and `List[\E\]` is not a subtype of `E`. The component `PureList.fss` and `List.fsi` declare different, well-formed headers. The error also hides a second defect: `PureList.fsi:75` declares a `zip` that neither the component nor `List.fsi` has.
- **Where:** `Library/PureList.fsi:41` (header) and `:75` (`zip`); compared with `Library/PureList.fss:41-42` and `Library/List.fsi:69-70`. Both paths read the library, but the only users are walk tests (`tests/PureListQuick.fss`, `ListNullPointer.fss`).
- **Reproduce:** No reproducer. A worker would compile or load something that imports `PureList` and look for the quoted error; the capture `explorations/compile-ladder/rung-library-defects/probes/purelist-api-run.txt` sits "in the parent of ab067d9b6", that is, in commit `ab067d9b6^`, so `git show ab067d9b6^:PATH`.
- **Status:** Build the fix the note gives: replace `:41` with `List`'s header (which one: `PureList.fss`'s or `List.fsi`'s?) and delete `:75`. A test should come first; none exists.
- **Could not resolve:**
  - "by the self-type rule (F-225)": F-225 is a FACTS entry; the row does not say what the rule is. Record lookup needed (`$T 'F-225'`), not a language concept I could find in the skill.
  - "Fix: `:41` as `List`'s header": unclear wording, since the row names two `List` headers (`PureList.fss:41-42` and `List.fsi:69-70`) and does not say which.
  - "(derived, not measured)": I take it as "found by reading, not by running"; it is unclear whether it covers only the `zip` claim or the whole sentence.
  - "full text: history, row 355": I take it to mean the earlier text is in `explorations/fortress-gap-ledger-history.md`; fine.

## Row 611

- **Defect:** Walk does not apply the Meet Rule to symbolic operators. An object that inherits two functional `||` declarations whose parameter types overlap, with no declaration at their meet, should be refused, but walk loads and runs it. The compiled checker refuses it correctly.
- **Where:** Walk only. `interpreter/evaluator/values/OverloadedFunction.java:2071-2075` (`checkedName`) at c124c6b65, which filters through `NodeUtil.validOp` so that only operator names made of capital letters are checked.
- **Reproduce:** Run `ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss` under walk: it runs instead of being refused. The compiled counterpart is `XXXFunctionalMethodMeetOperatorChecker`, which refuses. Compiled, the call also stops on 'Ambiguous coercion in call to operator ||'.
- **Status:** Build a fix in walk's check. Watch row 342: on a warm cache walk skips the check anyway, so test on a cold cache.
- **Could not resolve:**
  - "the test its skeptic": unclear wording. I guess it means the test was written by the batch's skeptic agent, but "skeptic" is not defined in the skill.
  - "a word of capitals": I read it as "an operator name spelled in capital letters, such as `RSHIFT`"; the wording is terse but resolvable.
  - Where `XXXFunctionalMethodMeetOperatorChecker` lives (which test folder, and what extension) is not given.
  - "Compiled, the call stops first": which call, the test's own `||` call? It reads as "the compiled run does not reach the Meet Rule check because coercion fails first", but this conflicts with "the compiled checker ... refuses the pair". Unclear wording.

## Row 395

- **Defect:** Under walk, coercion does not convert a tuple argument to an overloaded function's tuple-typed parameter, and does not convert a tuple assigned to a tuple-typed field. `over((NarrowOf(3), 4))` against `over(p: (Wide, ZZ32))` plus `over(s: String)` fails with "Failed to find any matching overload". The compiled path converts. Non-overloaded sites (a single function, a local, a top-level, a field initialiser) do convert under walk.
- **Where:** Walk. `OverloadedFunction.bestMatchWithCoercion` (`interpreter/evaluator/values/OverloadedFunction.java:2311` at c124c6b65) uses `Coercions.coercionFor` (`values/Coercions.java:58`), which finds only lifted `coerce_` functions of traits or objects; `Coercions.moreSpecific` (`:329`) has no tuple rule. A field setter is an overloaded method, so `h.pair := (NarrowOf(10), 11)` fails the same way.
- **Reproduce:** Run `ProjectFortress/tests/XXXCoercionTupleOverloadRungC.fss` under walk.
- **Status:** Build a fix in walk's coercion lookup: a tuple rule in `coercionFor` and `moreSpecific`. Siblings 397 and 511 are related.
- **Could not resolve:**
  - The Specification cell drops the `Specification/` prefix and gives the second heading without a file: I read both headings as being in `Specification/basic/conversions-coercions.tex`. Minor wording issue.
  - `NarrowOf`, `Wide`: test-local names, presumably a narrow type with a `coerce` into `Wide`. Clear enough from context.
  - "lifted `coerce_` functions": I take "lifted" to mean the coercion declared inside a trait or object and lifted to the top level. Not in the skill; a language-implementation concept I lack.

## Row 397

- **Defect:** On the compiled path, the setter of an object's `var` field whose type is a tuple fails JVM verification. `h.pair := (WideOf(10), 11)` for `var pair: (Wide, ZZ32)` compiles, then `fortress run` dies with `VerifyError: Bad type on operand stack` in `Holder.pair(Wide, FZZ32)`. No coercion is involved. Walk prints the value, and an immutable tuple field runs.
- **Where:** Code generator. `CodeGen.generateForwardingFor` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:791` at c124c6b65) takes `arity` from the Fortress parameter count (one tuple), while `from_sig` (`:834`) spreads the tuple into two JVM parameters. So the forwarding method loads `this` and only one argument before `invokevirtual pair?(Wide, FZZ32)`.
- **Reproduce:** Run `ProjectFortress/compiler_tests/XXXTupleVarFieldCompiledRungC.test`.
- **Status:** Build a fix in `generateForwardingFor`: count the spread JVM parameters.
- **Could not resolve:**
  - `pair?`: I read `?` as part of the generated setter's JVM name, but could not confirm. Unclear wording, or a name-mangling convention not in the skill.
  - "A setter takes a single argument, the value being set": its purpose is unclear. I take it to explain why the arity comes out as 1.

## Row 722

- **Defect:** Under walk, the inferred static argument of a call can be `Int` where the specification infers `ZZ32`. For `openAt[\I\](x: I) = openRange[\I\]()` called as `openAt(z)` with a `ZZ32` value, walk instantiates `I` as `Int`. `openRange` then builds a `ZZ32` range and casts it to `OpenRange[\Int\]`, which throws `CastError`. The specification gives a `ZZ32` open range.
- **Where:** Walk; the library's `openRange` in `Library/FortressLibrary.fss:4225-4230` at c124c6b65 (`typecase __thrower[\I\]`, the `cast` at `:4227:23-58`).
- **Reproduce:** Run `ProjectFortress/tests/XXXOpenRangeInferredIndexWalk.fss` under walk; expect "CastError".
- **Status:** Build a fix. The note proposes passing a witness of the result type, as `array1` does, so the library does not need a cast. A user can work around it with an explicit `openAt[\ZZ32\](z)`. Sibling: 364.
- **Could not resolve:**
  - "an `I` that walk instantiates at `Int`": `Int` is not among the number types the skill lists, and I could not find whether it is a library trait (a supertype of the integer types) or something else. A language/library concept I lack.
  - "its container `cast`": unclear wording; I read it as "the `cast` inside `openRange`".
  - "`__thrower[\I\]`" and "matches `() -> Int` against its `() -> ZZ32` arm": I read it as an idiom that dispatches on a static type by doing a typecase on a function value. The idiom is not in the skill.
  - The fix is unclear: whether to change walk's inference (the class is "walk") or `openRange` (the note's witness). They read as two different fixes.

## Row 773

- **Defect:** The compiled checker checks a member declared under a conditional extension's `where` clause assuming the condition, then lets that member be called on an instance where the condition fails. `Lst[\Fn\](Fn(inc), Fn(inc)).lt(...)` is accepted for `object Lst[\E\](a: E, b: E) extends { Ord[\Lst[\E\]\] where { E extends Ord[\E\] } }`, though `Fn` is not an `Ord`. `bin/fortress compile` exits 0; the run dies with `NoSuchMethodError: ... CondExtendMember$Fn.lt(CondExtendMember$Fn)`; walk stops with 'Cannot find definition for method lt given receiver Fn'.
- **Where:** Compiled checker, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:134-136` at c124c6b65, where `lt` is checked with `E extends Ord[\E\]` assumed; the dotted-call check reads `lt` at every instance.
- **Reproduce:** No reproducer file. The notes give enough to write one: `trait Ord[\T extends Ord[\T\]\] lt(o: T): Boolean end`, `object Fn(f: ZZ32 -> ZZ32) end`, `Lst` as in the claim with `lt(o: Lst[\E\]): Boolean = a.lt(o.a)`, then the call. The component would be named `CondExtendMember`.
- **Status:** Build a fix: at a dotted call, check the condition of the conditional extension that holds the member, as row 748 did for a method's own `where` clause. Write a test first. Sibling: 774.
- **Could not resolve:**
  - `inc`: not defined; presumably a `ZZ32 -> ZZ32` function. Minor.
  - "the dotted call reads `lt` at every instance": I read it as "the checker treats `lt` as a member of `Lst[\E\]` for every `E`". Terse, but resolvable.

## Row 774

- **Defect:** Walk, and the compiled run time, treat an `extends` entry under a `where` clause as holding for every instance. `Box[\ZZ32\](1)` passes a type test against `Shows` for `object Box[\E\](x: E) extends { Shows where { E extends Shows } }`, though `ZZ32` does not extend `Shows`. Compiled, `typecase v of Shows => true else => false end` prints `true`, because the generated class extends `Shows` at every instance.
- **Where:** Both paths, though the class says walk. Walk: `Constructor.boundsUnread` in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:725-737` at db8fecd22. Compiled: the code generator's class for the declaration.
- **Reproduce:** Run `ProjectFortress/tests/XXXConditionalExtensionTypeTestWalk.fss` under walk.
- **Status:** Wait: "waits on P-12 or row 364". A fix also has knock-on effects: walk currently relies on this to give `<` on lists of tuples or floats, and `List`'s `=` must stay element-wise through `=/=` and `assert` once walk reads the clause.
- **Could not resolve:**
  - "waits on P-12": a POSITIONS entry not given in the row; I cannot tell what decision it awaits without `$T 'P-12'`. Record lookup.
  - "So walk keeps the `<` of a list of tuples or floats, to which the checker gives no order": unclear wording. I read it as "because of this defect, walk lets `<` work on such lists, which the checker would refuse"; the "So" does not obviously follow from the sentence before it.
  - "`List` extends `Equality[\List[\E\]\]` outside its condition (`Library/List.fsi:69`), so its `=` stays element-wise ... once walk reads it": I could not tell what "it" is (the clause?) or what the risk is. Unclear wording.
  - The class is "implementation gap (walk)" while the claim also names the compiled run time; it is unclear whether one fix covers both.
  - This row cites db8fecd22, the others c124c6b65; fine but worth noting.

## Row 342

- **Defect:** Walk writes a component to its cache before running the overload check, and skips the check for a component read back from the cache. So a declaration-time overload rejection (for example a Meet Rule failure) shows up once, on a cold cache, and never again.
- **Where:** Walk, `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java` at c124c6b65: `populateOne` caches at `:112` before the environment that checks is built at `:121`; a cache hit (`getCached`, `:53-57`) skips `:108-114`; `getFunctionals()` (`:199-203`) reads the cached tree.
- **Reproduce:** No reproducer. Clear walk's cache, load a program with an overload error (row 98's `explorations/apl/rung-5/v04_lib.fss`, refused cold against `AdditiveGroup.+`), then load it again: the second load runs. The old reproducer `explorations/run-c4/src/MicroGptFlatCheck.fss` no longer shows it. Captures are in `explorations/run-c4/cold-cache/CAPTURES.md`.
- **Status:** Build a fix: check before caching, or check on a cache hit. Until then, judge a load on a cold cache. Sibling: 611.
- **Could not resolve:**
  - "The check runs only when walk analyses the library again ... (a program's `||` meeting `String`'s, too)": unclear wording. The parenthesis seems to say that row 611's `||`/`String` case is another instance, but does not say so.
  - How to get a cold cache is not said in the row; the skill's `build-and-caches.md` presumably covers it.

## Row 384

- **Defect:** Under walk, overload resolution converts the self argument of a generic functional-method candidate to a string even when it rejects the candidate, building an error message that it then throws away. For a large `ZZ` (an `FBigNum`) that means a full decimal conversion, so an operator on a huge integer spends its time in `BigInteger.toString`. `v RSHIFT 2147483645` on `v = 3 LSHIFT 2147483645` was still in `FBigNum.toString` after about 400 s of CPU.
- **Where:** Walk. `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:876-879` at c124c6b65 builds the message eagerly; `values/FBigNum.java:40-42` is the `toString`; `values/OverloadedFunction.java:2393-2396` (`bestMatchInternal`) discards it.
- **Reproduce:** Run the probe `explorations/compile-ladder/rung-int-semantics-walk/probes/BigShiftHeapEq.fss` from commit `ab067d9b6^` (`git show ab067d9b6^:PATH`) under walk, and sample the stack or watch the CPU time.
- **Status:** Build a fix: build the message lazily, only when it is reported. Specification is silent; this is performance only. One size was measured, and the generic `RSHIFT` candidate that triggers it has not been identified.
- **Could not resolve:**
  - "For a self argument whose type is not a generic instance": this contradicts the claim's "a generic functional-method candidate" at first reading. I read it as "the candidate is generic but the argument's type is not an instance of it"; unclear wording.
  - "climb batch 3.5 rung I's repair round": provenance only; not needed to act.
