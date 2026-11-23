<!-- Climb batch 35, rung O: the modifier override on the compiled path. The code generator compiles it, by the checker's own table of what an override keeps from being inherited, and the checker refuses an override that overrides nothing (rows 650 and 653). -->
# Rung O: the modifier `override` compiled, and the checker's refusal of one that overrides nothing

- problem: rows 650 and 653 measured on the base, and the second wall once the modifier was let through: `explorations/compile-ladder/plan-35/probes/fixes-35.md:41-42`, `:50-57`
- spec: `Specification/basic/traits.tex:673-683` (section "Method Declarations", the modifier `override` and its static error)
- precedent: the code generator's own narrowing forwarder, a method at the inherited declaration's signature that forwards to the type's narrower one (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1675`, `dumpOverloadedMethodChaining`); the checker's check of an overriding return type, which reads the same table (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:421-423`); walk's refusal and its words (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:677-701`)
- deviation: the class of a type holds, for each declaration that its own override hides, a method at that declaration's JVM signature that runs the override (a bridge), and no method that runs the hidden declaration: `CodeGen.java:1476-1480`, `:1224-1237`
- deviation: two forms stay code-generator walls with messages of their own, an override of or by a method with static parameters of its own, and one in a generic trait or object whose parameter types name a static parameter (row NEW-O-1): `CodeGen.java:1204-1213`
- deviation: the checker's message names the declaration by its arrow type and span, as its other messages do, where walk prints the unparsed header: `OverloadingChecker.scala:785-787`
- deviation: the typecheck test of row 653 has the `XXX` prefix, since a compiled test without it is red on any refusal (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:383-386`, `:419`): `ProjectFortress/compiler_tests/XXXOverrideNothingCompiled.test:1`
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3458-3461`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:410-424`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1787-1812`, `Specification/appendices/changes.tex:6422`

One launch worked this rung: the worktree did not exist at its start, and the branch had no commit past the base.

## What changed and why

**The code generator (fork O1).** `fnDeclCompilableModifiers` holds `Modifiers.Override` (`CodeGen.java:3458-3461`), so `forFnDecl` no longer refuses the modifier. With that alone the object's class held the override and a second method of its JVM name for the pair with the hidden declaration, and failed to load (PRB section 3). The code generator now reads what an override keeps from being inherited from the checker's own table: `STypesUtil.overriddenNotProvided` (`STypesUtil.scala:1787-1812`) calls `providedAndOverridden` (`:1698`) over `allMethods`, with `paramsWithoutSelfApart` as the reading of parameter types, the reading that `allMethodsNotReplaced` already uses, and gives each declaration p that an override o keeps a type of the walk from inheriting and that the type does not provide, with o. Where no gathered declaration has the modifier it returns at once, so a type without an override (every type of both libraries) costs one pass over its gathered declarations.

- `dumpOverloadedMethodChaining` (`CodeGen.java:1353-1354`, `:1476-1480`): a hidden p is no overload of its name. Where o is the type's own, p is treated as a narrowing to o: a method at p's signature forwards to o (the precedent's `generateForwardingFor(..., true)`), and no dispatch method of the name is written. Where o is a supertrait's, p is skipped.
- `dumpMethodChaining` (`CodeGen.java:1097-1099`, `:1115`, `:1165`): a hidden p gets no forwarder to its trait's body; `overrideBridges` (`:1224-1237`) writes the bridge from p's signature to o where o is a supertrait's that the class does not reach through its first supertrait (an object `extends { X, W }` with `W`'s override), once for each p.
- `checkOverrideCompilable` (`:1204-1213`) stops two forms that the bridge cannot serve yet (row NEW-O-1): a generic method compiles to a closure finder, which a bridge does not reach; and at an instance of a generic trait or object that makes p's and o's parameter types equal, as `G[\Any\]` for `override f(x: Any)` over `A[\T\]`'s `f(x: T)`, the instance class held both under one signature, 'ClassFormatError: Duplicate method name "f" with signature "(Lfortress.AnyType$Any;)..."' (a probe before the wall).

The methods of the promoted test's object class, on the final code (`javap -p -c 'OverrideModifierCodeGeneration$B.class'` after `bin/fortress compile compiler_tests/OverrideModifierCodeGeneration.fss`):

    public fortress.CompilerBuiltin$String g(com.sun.fortress.compiler.runtimeValues.FZZ32);
         2: invokevirtual #14                 // Method g:(Lfortress/CompilerBuiltin$Number;)Lfortress/CompilerBuiltin$String;
    public fortress.CompilerBuiltin$String f?0(com.sun.fortress.compiler.runtimeValues.FZZ32);
         2: invokevirtual #17                 // Method "f?0":(Lfortress/CompilerBuiltin$Number;)Lfortress/CompilerBuiltin$String;
    public fortress.CompilerBuiltin$String f?0(fortress.CompilerBuiltin$Number);
    public fortress.CompilerBuiltin$String f?0?(fortress.CompilerBuiltin$Number);    (body: "f PASS")
    public fortress.CompilerBuiltin$String g(fortress.CompilerBuiltin$Number);
    public fortress.CompilerBuiltin$String g?(fortress.CompilerBuiltin$Number);      (body: "g PASS")

`f?0?` and `g?` are the bodies, and `f?0(Number)` and `g(Number)` the plain-named entries, as for any object method (a plain `object B extends A` that redeclares `f` and `g` at `ZZ32` gets the same pair). The two methods at `FZZ32` are the bridges at `A`'s signatures. The bridge is what makes the promoted test pass: the checker resolves `f(B, 17)` to the wrapper of `A`'s `f(A, FZZ32)`, which calls the interface method `A.f?0(FZZ32)`, and `B.g(17)` to `B.g(FZZ32)`, the numerals taking `A`'s declaration at their default type (row 694's territory). The run with the verifier on prints both lines: `bin/fortress run OverrideModifierCodeGeneration` gives `f PASS` and `g PASS` (verification is HotSpot's default for the class loader's classes; `bin/run` passes no flag that turns it off).

**The checker (fork O2).** `checkOverridesSomething` (`OverloadingChecker.scala:763-789`), called for each trait and object beside the return-type check of the same table (`:424`), refuses each declaration with the modifier that the type declares and that appears in no pair of `providedAndOverridden` as an override (`equal` false): it overrides no inherited declaration of its name and kind, with self at the same position, whose parameter types without self are strictly below its own. Equal parameter types override nothing (review-queue item 73's default, "strict"). A declaration whose parameter types, or those of an inherited one of its name and kind, have a missing type is not judged, since that type has its own error. The message, with walk's words:

    Invalid override of f in object B:
        (B, String)->String @ .../XXXOverrideNothingCompiled.fss:9:3-37 has the modifier override and does not override any inherited declaration.

**The specification.** Appendix I's entry "The features not yet supported, in the preface and the introduction" (`\seclabel{revival-supported}`) no longer names the code generator's refusal of `override` in its effect (`Specification/appendices/changes.tex:6422`).

## The runs

The tests first, on the base's code, before the first build of the edit (the build started after 10:03 UTC):

    $ echo "Expected failure: OverrideModifierCodeGenerationLink red, CompilerError ... Don't know how to compile this kind of FnDecl. node = f(self:B,other:Number):String; ..."
    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests OverrideModifierCodeGenerationLink.test OverrideModifierCodeGeneration.test OverrideNothingCompiled.test    (10:02:51Z)
    . link ProjectFortress/compiler_tests/OverrideModifierCodeGeneration
     UNEXPECTED exception
        Don't know how to compile this kind of FnDecl. node = f(self:B,other:Number):String
    3) ProjectFortress/compiler_tests/OverrideNothingCompiled(...)AssertionFailedError: Must satisfy typecheck_err_contains; expected
    Tests run: 4,  Failures: 4,  Errors: 0

After the fix, `OverrideNothingCompiled` was red for its plain name: a compiled test without the `XXX` prefix fails on any non-zero exit ('Must satisfy FAIL or fail should not appear in output typecheck'), so a refusal test is named `XXX`, as `XXXOverrideReturnTypeNotSubtype` is. Renamed `XXXOverrideNothingCompiled`, it was run on the old code (`old-fortress.sh`), first with an expectation that named the wrong message ('Missing expected failure'; the harness checks the key first), then again:

    $ echo "Expected failure: on the base's code, XXXOverrideNothingCompiled red, 'Saw wrong failure': its typecheck_err_contains key is unmet, ..."
    $ explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base42 .../tmp/old-caches junit .../compiler_tests/XXXOverrideNothingCompiled.test    (10:10:05Z)
     Saw failure, but did not satisfy typecheck_err_contains; expected
    does not override any inherited declaration
    1) .../XXXOverrideNothingCompiled(...)AssertionFailedError: Saw wrong failure. typecheck

The first `XXX` test, shown red on a deliberate change: its override widened to `Any`, so that it overrides `A`'s `f`, the checker accepts the program, and `junit.sh red ... XXXOverrideNothingCompiled.test` printed 'Saw wrong failure. typecheck'; restored, it reads 'Saw expected failure'.

The tests written after the first fix, on the old code: `OverrideBridgesCompiledLink` and `OverrideBridgesCompiled` red at the link ('Don't know how to compile this kind of FnDecl. node = f(self:B,other:Number):String', 10:25:15Z); `XXXOverrideOverStaticParameterCompiled` and `XXXOverrideGenericMethodCompiled` red, 'Did not satisfy compile_exception_contains' (the base's message is the FnDecl refusal, 10:22:37Z); `XXXOverrideConditionalExtensionChecker` green on the base, 'Saw expected failure' (row NEW-O-2 was there before this rung).

The passing run, after the last change of code (`c5c2bd6d7a`, the tree's code at 10:25):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh fix3 ProjectFortress/compiler_tests <the 7 new tests and the 12 compiled tests that write override or test it>
    . run ProjectFortress/compiler_tests/OverrideModifierCodeGeneration (288ms) f PASS
    . run ProjectFortress/compiler_tests/OverrideBridgesCompiled (288ms) PASS
    OK (26 tests)

`OverrideBridgesCompiled` then took a case more, a generic object's override called through its trait's type (`07617087a6`, a test edit only): on the old code it is red at the link as before ('Don't know how to compile this kind of FnDecl', 'Tests run: 3,  Failures: 3', 10:45Z), and on `c5c2bd6d7a`'s code `junit.sh fix4 ... OverrideBridgesCompiledLink.test OverrideBridgesCompiled.test` prints '. run ProjectFortress/compiler_tests/OverrideBridgesCompiled (623ms) PASS' and 'OK (3 tests)' (10:44:46Z).

`ant testQuick` once on `c5c2bd6d7a`, after the last edit of code (before that test edit): 'BUILD SUCCESSFUL', 'Total time: 8 minutes 39 seconds'; `CompilerJUTest` 'Tests run: 1794, Failures: 0, Errors: 0', `OtherCompilerJUTest` 263, `LibraryJUTest` 86, each with 0 failures (climb batch 34b's gate: 1785, 263, 86; the 9 more are this rung's new commands).

## Where the fix belongs, and the precedent search

The map gives the place: the modifier's refusal is in `forFnDecl`, and an object's inherited methods are gathered in `dumpMethodChaining` and `dumpOverloadedMethodChaining` (the brief's `:1096` and `:1287`). The rung's fork O1 names the source of the hiding, the checker's table, not a second reading of the rule; `allMethodsNotReplaced` (`STypesUtil.scala:1762`) is the precedent for a code-generator view of that table, and the narrowing forwarder (`CodeGen.java:1675`) for a method at an inherited signature that runs the type's own declaration. The checker's refusal sits beside the return-type check of the same pairs (`OverloadingChecker.scala:421-423`). No earlier rung repaired an `override` in the code generator; the one precedent of a bridge in a class for another declaration's signature is the narrowing branch, one site in `CodeGen.java` (`:1675`), with its generic variant beside it.

## What the specification settles

The traits chapter states the rule: an `override` overrides each inherited declaration whose parameter type without self is a strict subtype of its own, and it is a static error if it overrides none (`Specification/basic/traits.tex:673-683`). A type inherits no overridden declaration (`:584-590`). It settles every form tested here; the forms that stay walls (NEW-O-1) and the checker's refusal under a conditional extension (NEW-O-2) are departures from it, each with its `XXX` test.

## Old against new

- Walk's override programs under `fortress typecheck` (the compiler's prelude), copied from `tests/`, old and new: refused now with the new message alone, where the base accepted them: `OverrideNothingWalk`, `OverrideEqualTypesWalk`, `OverrideNothingInTraitWalk`, `OverrideNothingGenericWalk`, `OverrideNothingGenericTraitWalk` (walk refuses each at load). Accepted on both: `OverrideInTraitWalk`, `OverrideGenericInstanceEqualTypesWalk`, `OverrideObjectExpressionWhereBoundWalk`, `disp0`, `disp1`, `FunctionalMethodMeetProvided`. Refused on the base by the overloading check and now also by the override check: `OverrideAfterWhereBoundWalk` (walk refuses it), `OverrideConditionalExtensionWalk` (walk runs it; row NEW-O-2), `XXXOverrideNothingConditionalExtensionWalk` (walk loads it; row 693). Refused by a call's error, on both, before any override check: `OverrideNothingGenericObjectExpressionWalk`, `XXXOverrideObjectExpressionOverParamWalk`; an object expression's override is not checked (row NEW-O-3).
- Compiled and run, new only (the base refuses every override): `disp0` prints `f PASS`, `g PASS`; `OverrideInTraitWalk` prints `PASS`; `disp1` and `OverrideGenericInstanceEqualTypesWalk` stop at the new wall.
- Row 694's form after the fix, `B.f(3, 4)` with `B`'s `override f(x: Number, y: NN32): String` over `A`'s `f(x: NN32, y: NN32): Any`, `bin/fortress typecheck` on `c5c2bd6d7a`, rc=255, unchanged: 'Ambiguous coercion in method invocation B.f: of the declarations applicable to an argument of type (NaturalNumeral[\1,10,3\], NaturalNumeral[\1,10,4\]) only by coercion, none is more specific than every other: (NN32, NN32)->Any; (Number, NN32)->String.' Walk prints `B`. The row stays open.

## The stages, and the checker's time (P-148)

The machine: nproc 4, Intel Xeon @ 2.30GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`.

- The count stage, timed. Base, on the base build (`295c215c2c`, whose code is the base's: `git diff --stat 295c215c2c 13f4fdea75 -- ProjectFortress Library` prints nothing), load 0.24 at start: 'real 1m26.350s'. Change, on `c5c2bd6d7a`, load 1.16 at start: 'real 1m13.606s'. The two tables are equal (`diff` prints nothing), and equal to climb batch 34b's gate table (`#total 0`, `#locations 0`, `#crash none`); the two `run.txt` files are equal once each run's tree and scratch paths are replaced by one word.
- The second pass: a JFR profile of the count stage on the change (`-XX:StartFlightRecording`, `settings=profile`) took 4384 execution samples, 4 of them with `checkOverridesSomething` on the stack; the top frames are the generated walker's (`Walker.walkCases7$` 7.50%, `walkCases5` 4.43%, `List.prependedAll` 3.85%, `walkCases4` 3.67%, `walkCases2` 3.51%). No gain to take, so the pass changed no code, and no `pass` run or second `ant testQuick` was made; the change's results stand for it. The pass made before the timing: the check visits only declarations with the modifier, and the code generator's table returns at once for a type without one.
- The distance stage, on `c5c2bd6d7a`: `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-34b/gate/distance.txt tmp/.../distance-postedit.txt` prints 'DISTANCE SAME   0'; the tables are equal but for `#seconds` and `#machine`; the per-site list (`dist-post/errors.tsv`) is equal to `explorations/compile-ladder/gate/distance-sites.tsv`, its header alone. No site moved.
- The ladder subset, the two files of the ladder's corpora that write `override` (`tests/disp0.fss`, `tests/disp1.fss`), run after the edit with the gate's drivers under `tmp/`: `disp0.fss` reaches `pass` (`f PASS`, `g PASS`) and `disp1.fss` `codegen` ('Can't compile an override in a trait or object with static parameters, ...'), each above the baseline's `typecheck` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`); the gate does not run them.

## Sentences of the specification made false

- `Specification/appendices/changes.tex:6422-6423`, before: "The code generator refuses the modifier \KWD{override} (row~650); nothing checks \KWD{io}, and nothing reads \KWD{atomic} on a function." After (`:6422`): "Nothing checks \KWD{io}, and nothing reads \KWD{atomic} on a function." The forms that stay walls (row NEW-O-1) are not named there; with its number filed, the gather can add "The code generator refuses an \KWD{override} with static parameters of its own or over a static parameter of a generic type (row~N)."
- `Specification/fortress/preamble.tex:87-88`, the preface's list, "some modifiers (\KWD{override} in compiled code, \KWD{io}, \KWD{atomic} on a function, ...)": false in part; by its entry's rule an item that works in part names the part that does not, as "\KWD{override} in compiled code where a static parameter is involved". Not edited: the section has the gather correct it.
- `Specification/basic/traits.tex:15-16`, the team's draft note "Where clauses, the \KWD{override} modifier, value traits, method contracts, and abstract functional declarations are not yet supported.": its clause on `override` is false on both paths. A team note; not changed.
- `grep -rn '~650\|~653' Specification --include=*.tex` printed the one line above on the base and prints nothing now; `~694` prints nothing on either.

## Points to report

- Where the code generator now reads the override's hiding: `CodeGen.java:1097-1099`, `:1115`, `:1165` (`dumpMethodChaining`), `:1353-1354`, `:1476-1480` (`dumpOverloadedMethodChaining`), `:1224-1237` (`overrideBridges`), from `STypesUtil.scala:1798-1812`; the class of the promoted test's object, above.
- Where the checker now refuses an override that overrides nothing: `OverloadingChecker.scala:424`, `:763-789`, its message above, and walk's cases above ("Old against new").
- The tests, each failing on the base and passing after (above); row 694's form after the fix, unchanged (above).
- Lines of the libraries or the tests that the checker now refuses: none in either library (the count stage's table equal, `#total 0`; `grep -n '^\s*override ' Library/*.fss ProjectFortress/LibraryBuiltin/*.fss` prints nothing); no test (`ant testQuick` 0 failures). One test comment became false and was respelled: `ProjectFortress/compiler_tests/XXXOverrideGenericReturnTypeNotSubtype.fss:6`, before "...under the implicit bound Any the two domains are equal, B's f overrides nothing, and the checker does not refuse that (row 653 of the gap ledger).", after "...under the implicit bound Any the two domains are equal, and B's f overrides nothing, which the checker refuses in place of its return type." Its checked value, two errors, is unchanged; a revival test, not the team's.
- The two stages' tables against the comparand, and the checker's timing before and after: above.
- Each sentence of the specification made false: above.
- Files edited beyond those named: `ProjectFortress/compiler_tests/XXXOverrideGenericReturnTypeNotSubtype.fss:6` (a comment line). In `CodeGen.java`, three members beside the named ones: `overriddenNotProvided` (`:1188`), `checkOverrideCompilable` (`:1204`), `overrideBridges` (`:1224`); `forAtomicBlock` is untouched.

## Decisions

1. The bridge: a hidden declaration's signature forwards to the override, by the narrowing forwarder. Ways not taken: no method at that signature, which leaves the interface method to the trait's default body, so a call through the trait's type, and the promoted test's own calls (which the checker resolves to `A`'s declarations), runs the overridden body; a dispatch method over the override alone. Evidence: the class listing above, and the bytecode of `run()`, which calls the wrapper `f(A, FZZ32)`, which invokes the interface method `A.f?0(FZZ32)`: without the bridge, `B`'s class inherits that method from `A$DefaultTraitMethods`, whose body answers "f FAIL" (read from the bytecode, not run).
2. A supertrait's override that the class does not reach through its first supertrait gets a bridge in the class (`overrideBridges`). Ways not taken: leaving it out, which gave 'AbstractMethodError: Receiver class ...$Wx does not define or inherit an implementation of the resolved method ... tag?0(...FZZ32)' in a probe (`object Wx extends { X, W }`); bridging every hidden declaration in every class, which repeats what the first supertrait's class already holds. Test: `OverrideBridgesCompiled`.
3. Two forms stop with their own messages (row NEW-O-1). Ways not taken: compiling them as they came, which gave 'ClassFormatError: Duplicate method name' at the equal instance and, for a generic method, bridges to the wrong method ('f FAIL' through the trait's type); repairing the class loader or the closure finders, outside the rung's files. The wall refuses only forms that the base refused.
4. The table: `providedAndOverridden` with `paramsWithoutSelfApart`, the reading of `allMethodsNotReplaced`. Way not taken: the checker's `paramsWithoutSelf`, a private member of the checker over its extended type analyzer; the code generator already compares the instance's parameter types so.
5. The checker's refusal reads the `overridden` pairs of the table it already builds. Ways not taken: a second walk over the supertypes, as walk's `checkOverrides` does; following walk's gaps (row 693, generic declarations unchecked), which fork O2 rules out.
6. The refusal test is `XXXOverrideNothingCompiled`, not the plain name the section gives, since the harness fails a plain test on any refusal (`FileTests.java:383-386`, `:419`).
7. Row 694 is not touched: the brief keeps it open, and its form gives the same message.
8. The object-expression gap (NEW-O-3) and the conditional-extension refusal (NEW-O-2) are recorded, not repaired: each is in a loop or a reading that other rows hold (570, 773), outside this rung's change.

## Defects and their homes

- Row 650, the code generator's refusal of `override`: home 1, repaired; `OverrideModifierCodeGeneration` with its link test, and `OverrideBridgesCompiled`.
- Row 653, the checker's acceptance of an override that overrides nothing: home 1, repaired; `XXXOverrideNothingCompiled`.
- NEW-O-1, the two forms of `override` that the code generator refuses: home 2 (the traits chapter settles them, walk runs them); `XXXOverrideOverStaticParameterCompiled`, `XXXOverrideGenericMethodCompiled`.
- NEW-O-2, the checker's refusal of an override under a conditional extension, present on the base as an overloading error: home 2; `XXXOverrideConditionalExtensionChecker`.
- NEW-O-3, no check of an override in an object expression: home 2 with no test, since no compiled test can be green while the checker accepts a program, and the code generator refuses an object expression: the row alone, its command in its notes.
- Row 694, unchanged: its row.
- A compile after a `typecheck` of the same file wrote no jar during the probes: row 757 holds it.
