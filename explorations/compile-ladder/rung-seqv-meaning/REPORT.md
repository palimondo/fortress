# Rung E, rung-seqv-meaning: what SEQV means on both paths

- problem: walk answers `SEQV` across number types and `true` for value objects without body fields, and the compiled helper compares every value by reference (`explorations/coordinator/CLIMB-BATCH-27.md:1333` and `:1345`, probes 16 and 17; rows 113, 906 to 911).
- spec: `Specification/basic/objects.tex:433` ("Object Equivalence"), and the list of kinds at `Specification/basic/objects.tex:22`.
- precedent: walk's own `FChar.seqv`, one class and its value (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FChar.java:108`); `FTupleLike.seqv`'s identity-first element test (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FTupleLike.java:78`); the compiled binding of a helper in a test's own declarations (`ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss:8`); the revision form of `Specification/appendices/changes.tex:4563`.
- deviation: the tuple test of `equality.sEquiv` reads a generated tuple class by its superclass's name, `AnyConcreteTuple`, and its `size()` and `get(int)` by reflection, since no fixed Java type names a tuple (`ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java:64`); none other.
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/{FInt,FLong,FBigNum,FIntLiteral,FNN32,FNN64,FFloat,FFloatLiteral,FRR32,FString,FOrdinaryObject}.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeObject.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/equality.java`, `Library/FortressLibrary.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `ProjectFortress/tests/sequivTest.fss`, `Specification/basic/objects.tex`, `Specification/appendices/changes.tex`; first edit at `ProjectFortress/tests/sequivTest.fss:49`.

Branch `wip/rung-seqv-meaning`, cut from `ed8652dc0`. Commits: `30093c7be` (the tests), `bae1e7965` (the code and library), `d66c7f3c4` (the specification, and a guard of the tuple limit in the walk test). The worktree was seeded by `seed-worktree.sh` (exit 0, 3 s).

## What changed and why

P-168: `SEQV` is the specification's rule on both paths, with no special case for any type. P-166: `ZZ`'s and `QQ`'s values are value objects, and the specification's list follows.

Walk (`interpreter/evaluator/values/`):
- `FInt.java:53`, `FLong.java:54`, `FBigNum.java:60`, `FIntLiteral.java:78`, `FNN32.java:55`, `FNN64.java:57`: each `seqv` answers `false` for a value of another class, and compares the value within its own class. Before, `FInt` and `FLong` took each other and `FFloat`/`FFloatLiteral` by `getFloat()`, `FBigNum` and `FIntLiteral` took the floats, `FNN32` took `FNN64` and `FNN64` took `FNN32` (row 909).
- `FFloat.java:42`, `FFloatLiteral.java:43`, `FRR32.java:45`: their own class only, by raw bits. Before, `FFloat` and `FFloatLiteral` took each other, and all three took the integer classes by `==` on doubles.
- `FString.java:35`: `false`; `AnyPrim.sequiv` (`interpreter/glue/prim/AnyPrim.java:23-26`) has already answered identity. Before: text equality.
- `FOrdinaryObject.java:55`: each field through `AnyPrim.sequiv`, identity first, so a value object whose field holds a reference object is equivalent to one holding the same object; one import line added (`:17`).
- `interpreter/evaluator/types/FTypeObject.java:63-67`: the value parameters join `fields` once, after the loop over the members. Before they joined only inside the `VarDecl` branch, so an object whose body declares no field compared no fields at all (row 113), and an object with two body fields got its parameters twice.

The compiled path:
- `compiler/runtimeValues/ValueObjectMark.java`, new: an empty interface.
- `compiler/codegen/CodeGen.java:4522-4529`: `forObjectDeclPrePass` passes to `cw.visit` a copy of `superInterfaces` with the mark added when the header's modifiers hold `value`. `superInterfaces` itself is unchanged, so the springboard and `dumpMethodChaining` read what they read before. `javap -p` of a probe's value object: `public final class SeqvGenP$Vtup extends fortress.CompilerBuiltin$Object$DefaultTraitMethods implements fortress.CompilerBuiltin$Object,com.sun.fortress.compiler.runtimeValues.ValueObjectMark`.
- `nativeHelpers/equality.java:16`: `sEquiv` calls `equalityRule.sEquiv`. The class keeps its one method at `(fortress.AnyType.Any, fortress.AnyType.Any)`, which the wrapper generator maps.
- `nativeHelpers/equalityRule.java`, new, package-private, named by no binding: one object is equivalent to itself; two tuples (a superclass named `AnyConcreteTuple…`) by arity and element by element; else two values of different Java classes are not; `FZZ32`, `FZZ64`, `FZZ`, `FNN32`, `FNN64`, `FBoolean`, `FCharacter` by value, `FIntLiteral` by both its fields; `FRR64`, `FRR32` and `FFloatLiteral` by raw bits; a `ValueObjectMark` object by each non-static declared field, an `Any` field through `sEquiv`; every other value, `FString` and `FJavaString` among them, by identity. A generic value object keeps its mark through the class loader's instantiation (probe below: `Vbox[\ZZ32\](3)` twice `true`, against `Vbox[\ZZ64\](3)` `false`).

The library: `Library/FortressLibrary.fss:664` `value object Ratio(num: ZZ, den: ZZ) extends { QQ }`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:196` `value object FloatLiteral extends RR64` and `:486` `value object IntLiteral extends Number`, with `FortressBuiltin.fsi:44` and `:179`. No refusal met the modifier: `ant testSystem` has no failure, the count and the distance are 0.

Tests:
- `ProjectFortress/tests/StrictEquivalenceRuleWalk.fss`, new: the review's 14 cases at the rule's answers, each value bound at a declared type, and 1/2 against 2/4, a float numeral bound to `RR64` against `1.5 + 1.5`, `VBox(p)` twice, `Just`, `char(66560)` against `char(1024)`; and the tuple limit (NEW-E-1): pairs and triples of equal strings built apart `=` `true`, a 4-tuple `false`.
- `ProjectFortress/tests/ValueObjectCC64Walk.fss`, new: the curator's `value object CC64` by `=`, `SEQV`, `=/=` and the three-argument `assert`; `object RC64` equal only to itself.
- `ProjectFortress/compiler_tests/StrictEquivalenceRuleCompiled.fss` and `.test`, new: `equality.sEquiv` bound at `Any` in the program's own declarations (fork E9), the brief's 16 cases.
- `ProjectFortress/tests/sequivTest.fss`, the team's: eight lines from `equiv` to `nequiv`.
- `ProjectFortress/tests/TransposedMatrixAndFreeze.fss`, the revival's: two 4-or-more tuples that hold the string `"(immutable)"` respelled.

## The failing runs and the passing runs

Walk, on the base's code, before any edit of code or library (the tests uncommitted, tree `ed8652dc0`), 2026-11-07T06:39:31Z:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-seqv-meaning/h1 ProjectFortress/tests/StrictEquivalenceRuleWalk.fss ProjectFortress/tests/ValueObjectCC64Walk.fss ProjectFortress/tests/sequivTest.fss ProjectFortress/tests/TransposedMatrixAndFreeze.fss

    FAIL: CC64(1,2) = CC64(1,3) is false
    FAIL: 45 SEQV 45.0: 
    FAIL: a Boolean: true =/= a Boolean: false; a ZZ32 3 and a ZZ64 3 differ in type
    Tests run: 4,  Failures: 3,  Errors: 0

(`TransposedMatrixAndFreeze`, respelled, passed: ` OK (time = 460ms)`.)

Compiled, on the base's code, 2026-11-07T06:39:51Z:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests StrictEquivalenceRuleCompiled.test NativeHelperBindingCompiled.test

    . run ProjectFortress/compiler_tests/StrictEquivalenceRuleCompiled (219ms) FAIL:  two ZZ32 3s
    FAILURES!!!
    Tests run: 4,  Failures: 1,  Errors: 0

After: the same harness-one command on `bae1e7965` with the test of `d66c7f3c4`, 2026-11-07T06:57:50Z, the last run after the last change of a test: `OK (4 tests)`. The same junit.sh command, label `after1`, on the code of `bae1e7965`: `OK (4 tests)`, both runs `PASS`. No code changed after either.

## Whole suites and stages, on the code of `bae1e7965`

- `ant testSystem`: 'BUILD SUCCESSFUL', 'Total time: 5 minutes 32 seconds'; 'Tests run: 194, Failures: 0', '194, Failures: 0', '186, Failures: 0', '184, Failures: 0': 758, the landed 756 (`explorations/compile-ladder/climb-batch-26/gate/summary.txt`) and the two new walk tests. No verdict changed but those of the four files above; the walk guards of the brief (`BooleanOps`, `ExtendsAnyIsObjectWalk`, `ResultBoundsRungB`, `SeededRandomGenAbstractMethods`, `AnyGenPerturbOtherType`, `RationalTest`, `CharAsStringSupplementaryWalk`) pass, and no `XXX` test turned.
- `ant testQuick`: 'BUILD SUCCESSFUL', 'Total time: 6 minutes 19 seconds'; library 'Tests run: 86, Failures: 0', othercompiler '263, Failures: 0', compiler '1434, Failures: 0' (landed 1432, and the new test's link and run). `NativeHelperBindingCompiled`, `EqualityTest1`, `EqualityTest5`, `MaybeTest7`, `MaybeTest8`, `Compiled17ee` and `RecursiveApiTest3c` keep their verdicts.
- The count stage (`tools/checker-count/run.sh`), on `bae1e7965`: `diff explorations/compile-ladder/climb-batch-26/gate/checker-count.txt tmp/rung-seqv-meaning/checker-count-postedit.txt` prints nothing; '#total 0', '#crash none'.
- The distance stage, on `bae1e7965`: `compare.sh explorations/compile-ladder/climb-batch-26/gate/distance.txt tmp/rung-seqv-meaning/distance-postedit.txt` prints 'DISTANCE SAME   0'; '#total 0', '#crash none', '#seconds 435 FortressLibrary 380'; `dist-post/errors.tsv` holds its header only, so no site moved. The commit after it, `d66c7f3c4`, changes `ProjectFortress/tests/` and `Specification/` only, which neither stage reads.
- The model, `explorations/coordinator/tools/mg-run.sh tmp/rung-seqv-meaning/mg rungE`: both quick checks 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', 'rc=0'.
- The specification, `cd Specification/fortress && ./ant genSource && ./ant tex`: 'BUILD SUCCESSFUL' (27 s) and 'BUILD SUCCESSFUL' (29 s); the warnings grep prints 0; the entry is I.1.40, page 657; then `git clean -fXq -- Specification`.
- The ladder subset (gate.md, "The ladder regression"): no file of the baseline's `ladder.tsv` has a first error that names `SEQV`, `===`, `sEquiv` or a value object of the code generator. I ran the 20 files of the ladder corpus that declare a `value object` or use `SEQV` or `===` (`tmp/rung-seqv-meaning/ladder/subset.txt`) through copies of `run-subset.sh` and `classify.py`. None is in the landed `climb-batch-26/gate/ladder/ladder.tsv`; against the baseline's `ladder.tsv`, 18 keep phase and first error, and two moved before this rung: `not_working_library_tests/GenTest5.fss` typecheck to pass and `tests/XXXextendOprParam2.fss` a new first error, 'Ill-formed type: Altoid[\Chicken,EGG\]'. The old code (`old-fortress.sh … compile`) gives the same two: 'GenTest5 compile rc=0', 'XXXextendOprParam2 compile rc=255' with that message. Neither reaches the code generator, so the mark cannot move them.

## Where the fix belongs, and the precedent

Walk's `SEQV` is `AnyPrim.sequiv`, identity, then the value's own `seqv` (`interpreter/glue/prim/AnyPrim.java:23-26`); the rule lives in each value class's `seqv`, as `FChar.seqv` (`FChar.java:108-111`) already holds it: its own class, its value. `FChar`, `FBool` and `FTupleLike` already followed it; the eleven named here did not. The value object's field list is FTypeObject's, read by `FOrdinaryObject.seqv`. On the compiled path the operation is the helper that P-167 names, `equality.sEquiv`; the value modifier can be read only from the generated class (fork E2). The ways: a mark interface (taken), a static field or an annotation on the class, or the class's `RTTI`; for the helper's rule, a method per class as walk has (the run time's boxes have none), or the boxes made value objects through item 371 (fork E6, not this batch).

## What the specification settles

"If the arguments have different dynamic types … the result is always false. If both arguments are value objects with the same type, then the result is true if and only if corresponding fields … are themselves equivalent …; two binary words are strictly equivalent if and only if they contain the same bit pattern. If both arguments are object references … identical reference object" (`Specification/basic/objects.tex:433-454`). Which values are value objects is the list at `:22-63`, which P-166 and P-168 revise.

## Programs run old against new

- Probe 17 (the planner's, on the base) against `StrictEquivalenceRuleWalk` on this tree: line 2 of probe 17, `true true true false true false true true true true false false true true false`, becomes the rule's `true false false false true false true true false false false false true false false`; `r SEQV s` `true` to `false`; `1/2 SEQV 2/4` `false` to `true`; `CC64(1,2) SEQV CC64(1,3)` `true` to `false`; `Just(1) SEQV Just(2)` `true` to `false`; `VBox(p) SEQV VBox(Pt(1,2))` `true` to `false`; a 4-tuple of strings built apart `=` `true` to `false`; `s1 SEQV s2` and `"cat" SEQV "cat"` (two literals) `true` to `false`.
- Probe 16 (on the base) against `StrictEquivalenceRuleCompiled`: the helper's two `ZZ32` 3s, two `(1,2)` tuples, two `VPlain(1,2)` and two equal `CC64`s turn from `false` to `true`; the other cases keep their answers.
- `compiler_regressions/seqv.fss` on this tree: compiled 'PASS P===P', "PASS 'cat'==='cat'", 'PASS P NEQV Q', "PASS 'cat' NEQV 'dog'", 'run rc=0', as on the base (the strings review, section 3): `:22` reaches the prelude's `opr ===(a:String, b:String) = a=b` (`Library/CompilerLibrary.fss:68`), which stays (P-38, fork E8). Walk: 'Operator NEQV is not defined.', rc 255, as on the base.
- `GenTest5.fss` and `XXXextendOprParam2.fss` compiled with the old code (above).
- A probe, `SeqvGenP.fss` (scratch), on this tree: 'gen same  true  other arg  false', 'tuples mixed  false'; its `Vtup((1, 2.0))` stopped with 'ClassCastException … FZZ32 cannot be cast to class AnyTuple?2?', the tuple at a one-parameter call of probe 20, the row the planner filed.

## Sentences made false

- `Specification/basic/objects.tex:15`, `\note{Value objects and properties are not yet supported.}`: false for value objects, which both paths now read for `SEQV`; the note's other boxes in the chapter (`:66`, `:68`, `:266`, `:297`, `:336`) are untouched by this change.
- The claims of rows 113, 906, 907, 909, 910 and 911 (closed by this rung) and row 908 (narrowed; record.md).
- Rung N's new Appendix I entry, `revival-asfloat`, where its effect names row 909 for a mixed `=` that no pair carries: on the merged tree such an `=` answers `false` (fork 7; the gather corrects it).
- `.claude/skills/fortress-repo/references/tests-writing.md:32`, "Otherwise they compare by identity (ledger row 807)": false for a value object, which compares field by field.
- `.claude/skills/fortress-repo/references/compiler.md:62`, "The `value` modifier has no effect on the representation.": the class now carries a mark interface; its fields are unchanged.
- `explorations/coordinator/PLAN.md:50`, "so `CC64(1,2) = CC64(1,2)` is true and `CC64(1,2) = CC64(1,3)` false, on both paths": on the compiled path the `=` is a static error until the switch-over (probe 19; fork E9), and the helper answers so now.
- The string-equivalence review's walk answers (`explorations/reviews/string-equivalence-2026-11-06.md:79-90`) and the any-carrier review's table (`explorations/reviews/any-carrier-2026-11-06.md:120-135`), as statements of today.

## Points reached

- Each walk value class's `seqv`, `FTypeObject`'s field list and `FOrdinaryObject`'s field recursion, as above, with the answers before and after.
- The mark and `equality.sEquiv`, and the compiled answers that moved (probe 16 against the compiled test).
- `Ratio`, `IntLiteral` and `FloatLiteral` declared `value`; no refusal.
- The eight lines of `sequivTest.fss` (each `equiv(` before, `nequiv(` after): `:49` `(a,b)`, `:50` `(a,c)`, `:51` `(a,d)`, `:58` `(b,c)`, `:59` `(b,d)`, `:66` `(c,d)`, `:94` `((a,b),(a,c))`, `:113` `((a,jj),(b,jj))`.
- `TransposedMatrixAndFreeze.fss`: `:19` before `assert((words.mutability, |words|, words[0], words[2]), ("(immutable)", 3, "v7", "v7"), …)`, after `:19` `assert(words.mutability, "(immutable)", …)` and `:20` `assert((|words|, words[0], words[2]), (3, "v7", "v7"), …)`; and, beyond the named line, `:22` before `assert((frozen.mutability, |frozen|, frozen[0], frozen[1], frozen[2]), ("(immutable)", 3, 0, 10, 20), …)`, after `:23` `assert(frozen.mutability, "(immutable)", …)` and `:24` `assert((|frozen|, frozen[0], (frozen[1], frozen[2])), (3, 0, (10, 20)), …)`: a 5-tuple that holds the same string, which `fail`'s stop at `:19` hid from probe 18. Every value is still checked.
- `compiler_regressions/seqv.fss:22`: unchanged on both paths, as above.
- The tests before and after, above; the 14 cases and `CC64` on each path.
- The revised lists (`Specification/basic/objects.tex:39-64`), the callout (`:56-63`) and the Appendix I entry (`Specification/appendices/changes.tex:3935-4015`), whose effect names: the walk float numeral bound to `RR64` as the numeral object (fork E1); the numeral a `ZZ32` under walk and an `IntLiteral` to the checker (F-57); the prelude's `===` family until the switch-over, with row 908; and NEW-E-1. The build: both 'BUILD SUCCESSFUL', warnings 0.
- The count and distance tables on the final code: 0 and 0, no site.
- The suites' verdicts: only the four files above changed.
- Files beyond those named: `nativeHelpers/equalityRule.java` (the class beside the helper that the brief allows), `FOrdinaryObject.java:17` (an import for `AnyPrim`), `TransposedMatrixAndFreeze.fss:22`. No edit of walk's loader, the prelude or the checker. No other line of a team test.

## Decisions

1. Walk's classes compare by `instanceof` of their own class, not by `getClass()`: none of the eleven has a subclass (`grep -rn "extends FFloat\b\|extends FInt\b…"` prints nothing). Ways not taken: `getClass() ==`; a shared helper in `FNativeObject`.
2. `FInt` compares by `getInt()` within its class; before it used `getLong()` across classes.
3. The 0.0/-0.0 case in the walk test uses computed `Float` values (`one - one`, its negation), so the two compare within one class and the bits decide; the class difference of a literal is its own case (`r` against `1.5 + 1.5`). Way not taken: the literals `0.0` and `-0.0`, whose answer would differ by class as much as by bits.
4. The mark is an interface of the run time (fork E2), added in a copy of the array, named by `org.objectweb.asm.Type.getInternalName` inline in `CodeGen.java`, so that `NamingCzar.java` is not edited. Ways not taken: a constant in `NamingCzar`; a static field or annotation; the class's `RTTI`.
5. The helper's rule lives in a package-private class beside `equality` (fork E3), since its Java types (`Object`, `Field`, `Method`) have no Fortress counterpart and the wrapper generator reads every method of a named class. Way not taken: private methods in `equality`, which would stop every compiled program's import (compiler.md, "Natives").
6. Tuples are recognised by their superclass name `AnyConcreteTuple` and read by `size()` and `get(int)`, which `InstantiatingClassloader.instantiateAnyConcreteTuple` generates (`runtimeSystem/InstantiatingClassloader.java:1705-1780`). Ways not taken: the per-arity `AnyTuple⟦N⟧` interface, a type known only at run time; the typed getters `e1…eN`.
7. A marked object's non-`Any` fields compare by `equals`, its `Any` fields by `sEquiv`; static fields are skipped.
8. `TransposedMatrixAndFreeze.fss`: the string pulled out of each long tuple and compared alone; the rest kept as a triple (`:20`) and as a triple nesting a pair (`:24`), so no tuple longer than three remains. Ways not taken: the whole 4-tuple kept and the strings compared apart (it still fails); every element asserted alone.
9. NEW-E-1's home is 3 (the specification is silent on a tuple's `=`): a row and an assertion of today's answer in `StrictEquivalenceRuleWalk`, class `design limit (library)`. Way not taken: `library gap vs spec`, which needs a passage that the library departs from.
10. The specification's list: "integers of every precision, and rational numbers are value objects", "Reference objects include strings and aggregates such as arrays, lists and sets" (forks E5, E4). Way not taken: the list silent on strings.
11. The ladder subset as the 20 corpus files with a value object or `SEQV`, since no first error names what the change touched.
12. No decision record: the section asks for none; the Appendix I entry cites the two reviews for the reasoning.

## Defects and their homes

- Row 909, walk's equivalence across types: home 1, `StrictEquivalenceRuleWalk`.
- Row 113, walk's value objects without body fields: home 1, `StrictEquivalenceRuleWalk` and `ValueObjectCC64Walk`.
- Rows 906 and 907, the compiled value modifier and tuples: home 1, `StrictEquivalenceRuleCompiled`.
- Row 908, compiled floats by `=`: the helper's half home 1 (`StrictEquivalenceRuleCompiled`); the prelude's half stays a row until the switch-over (P-38), narrowed.
- Rows 910 and 911, the literals and `Ratio`: home 1, `StrictEquivalenceRuleWalk` (the float literal and the QQ cases).
- NEW-E-1, a tuple of four or more compares by `SEQV`: home 3, a row and today's answer asserted in `StrictEquivalenceRuleWalk`.
- A value object with a tuple field, constructed with a tuple argument, fails compiled with a `ClassCastException` (probe `SeqvGenP`): the planner's second row filed by plan (probe 20), not a new row.
