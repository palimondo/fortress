<!-- Climb batch 19, rung S: the three String sites of the distance by the library's own conversion and FlatString's api made its component's, with row 743 repaired beside in the pre-disambiguation desugaring both paths run. Base 612869b4a; branch wip/rung-string-conversion. -->

# Rung S: the three `String` sites, with row 743 beside

- problem: the distance's three `String` sites, `FortressLibrary.fss:4393` and `:4394` ('Any has no getter called asString', class NM) and `FlatString.fss:12` (FlatString's export error, class X1), in climb batch 18's per-site list, `explorations/compile-ladder/gate/distance-sites.tsv:3`, `:5`, `:6`; and row 743, by which the conversion alone would stop the team test `extendAny`, `explorations/fortress-gap-ledger.md:301`
- spec: every trait except `Any` and `Object` implicitly extends `Object` if it does not do so explicitly; the library's `String` code has no passage (`ls Specification/basic-lib/` lists no strings chapter, and `grep -ln '\\|\\|' Specification/basic-lib/*.tex` prints nothing): `Specification/basic/traits.tex:186-188`
- precedent: `print(a:Any):() = print("" a)`, "because the formulation with concat also works for tuples" (`Library/FortressLibrary.fss:4494-4495`), with `cast` at the bottom (`Library/FortressLibrary.fss:33-37`); the desugaring's empty clause made `{Object}` (base `:62-72`) and `Any`'s own declaration told by name: `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:111`
- deviation: the bottom of `opr ||(self, b:Any)` is `cast[\Object\]`, which no other body of the library calls; the library's `assert` writes the same typecase inline: `Library/FortressLibrary.fss:306-316`
- deviation: the clause's `Any` is told by its name's text, so `AnyType.Any` counts, where `Any`'s own declaration is told by `Id` equality: `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:123`
- historical: `Library/FortressLibrary.fss:4393-4394`, `Library/FlatString.fsi:16-20`, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:62-72`

## 1. What changed and why

Three edits in three files, commit `7ba1a846d`; the tests are in `9710c20de` and `84a17f4bd`.

- **Row 743, in the pre-disambiguation desugaring both paths run.** `rewriteExtendsClause` gave an empty `extends` clause `{Object}` and left any other clause as written, so an object or trait declared `extends Any` was not an `Object` on either path. Now a clause each of whose types is a named type `Any` is treated as the empty one and gets `{Object}`: a new helper `namesOnlyAny` (`PreDisambiguationDesugaringVisitor.java:59-68`), called at `:76`. The trait case leaves `Object`'s own declaration as it already left `Any`'s (`:123-124`, with a new `objectTypeId` at `:57`), so `trait Object extends Any` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32`, `FortressBuiltin.fss:37`, `CompilerBuiltin.fsi:17`, `CompilerBuiltin.fss:354`) keeps its clause. The class comment says so (`:40`), and so does the method's (`:71`). The object-expression, trait and object cases call the one method (`:109`, `:126`, `:141`).
- **The conversion (the probe's way C).** In `trait String`, `opr ||(a:Any, self):String = ("" || a) || self` and `opr ||(self, b:Any):String = self || cast[\Object\](b).asString` (`Library/FortressLibrary.fss:4393-4394`), where the team's bodies called `asString` on an `Any`.
- **FlatString's api.** `object FlatString extends { String, DelegatedIndexed[\Char, ZZ32\] }`, its component's header (`Library/FlatString.fss:34`), and `opr ||(a:FlatString, self): String` dropped, which its component does not declare (`Library/FlatString.fsi:16-22`).

With the conversion in place and the edit of the desugaring not yet built, the team test `extendAny` stops with `CastError`, as F-246 says; with both, it prints `Infinity` (section 2).

## 2. The failing runs and the passing runs

**Row 743 under walk, on the base's code** (the seeded base build, before any edit; 2026-10-20T00:50:21Z to 00:50:35Z):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-string-conversion/h-base ProjectFortress/tests/ExtendsAnyIsObjectWalk.fss ProjectFortress/tests/extendAny.fss ProjectFortress/tests/extendObject.fss

    Inf: not an Object
    InTany: not an Object
    Plain: an Object
    FAIL: J13/0:not an Object =/= J9/0:an Object; object Inf extends Any
    Tests run: 3,  Failures: 1,  Errors: 0

**Row 743 compiled, on the base's code** (00:50:41Z to 00:50:47Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests ExtendsAnyIsObject.test

    . run ProjectFortress/compiler_tests/ExtendsAnyIsObject (295ms) Inf: not an Object
    InTany: not an Object
    FAIL:  not an Object =/= an Object; object Inf extends Any
    Tests run: 2,  Failures: 1,  Errors: 0

**The conversion without the row's repair** (library edited, the base's Java still built; 00:51:52Z to 00:52:03Z):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-string-conversion/h-conv ProjectFortress/tests/ExtendsAnyIsObjectWalk.fss ProjectFortress/tests/extendAny.fss ProjectFortress/tests/extendObject.fss ProjectFortress/tests/XXXFnRenderRungS.fss ProjectFortress/tests/XXXTupleSevenRungS.fss ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss ProjectFortress/tests/XXXFunctionalMethodMeetOperator.test

    . interpret tmp/rung-string-conversion/h-conv/tests/extendAny
     UNEXPECTED exception
    FortressException: CastError
    Tests run: 6,  Failures: 2,  Errors: 0

**A value on the left of a string, on the old code** (the test written after the fix, run through the base build's harness; 01:05:22Z to 01:05:50Z):

    FORTRESS_HOME=/home/user/fortress-base19 /home/user/fortress-base19/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-string-conversion/h-old-concat $PWD/ProjectFortress/tests/ConcatAnyOnLeftWalk.fss

    com.sun.fortress.exceptions.ProgramError: com.sun.fortress.exceptions.ProgramError: Library/FortressLibrary.fss:4393:34-42:
    Non-object receiver (1,2): (Int,Int) trying to invoke method asString
    Tests run: 1,  Failures: 1,  Errors: 0

**The passing runs, after the last change of code** (`7ba1a846d`, built):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-string-conversion/h-new2 ProjectFortress/tests/ConcatAnyOnLeftWalk.fss ProjectFortress/tests/ExtendsAnyIsObjectWalk.fss ProjectFortress/tests/extendAny.fss
    OK (3 tests)

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh new ProjectFortress/compiler_tests ExtendsAnyIsObject.test
    OK (2 tests)

The walk run before it, `h-new`, over the six files of the conversion's run above, printed `OK (6 tests)`: `extendAny` prints `Infinity`; `XXXFnRenderRungS` and `XXXTupleSevenRungS` stay expected failures, now by `CastError`; `XXXFunctionalMethodMeetOperator` still loads and prints `Vo || 3 = 1`.

**The suites, once each on `7ba1a846d`** (the edit changes the Java of a phase both paths share, and the library):

    ant testQuick      Tests run: 1272 (compiler), 86 (library), 263 (othercompiler), Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 8 minutes 33 seconds
    ant testSystem     Tests run: 166, 162, 167, 163 (658: the landed 656 and the two new walk tests), Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 7 minutes 18 seconds
    ant testSpecData   Tests run: 130, Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 1 minute 16 seconds

## 3. Where the fix belongs, and the precedent

- **The place.** The phase table puts the explicit `extends Object` in PREDISAMBIGUATEDESUGAR, which both paths run first (`explorations/coordinator/map/modules-and-phases.md:261`, B.1 row 1). The feature table's row for trait declarations names no other place that adds `Object` (`explorations/coordinator/map/spec-to-implementation.md:221`). The visitor runs on every api and every component (`ProjectFortress/src/com/sun/fortress/compiler/PreDisambiguationDesugarer.java:71`, `:93`). One edit there makes both paths agree; editing walk's environments and the checker's hierarchy apart would take two edits, which could disagree.
- **The precedent in the file.** The empty clause made `{Object}` (`rewriteExtendsClause`, base `:62-72`) and `Any`'s own declaration skipped by name (base `:111`). The file has one other site that adds `Object`, `rewriteStaticParamExtendsClause` (`:89-98`), for static parameters on the compiled path only (row 412), which this rung leaves alone. The twin `rewriteExtendsClause` of `PreTypeCheckDesugaringVisitor.java:51-61` is called only from the three methods commented out from `:63` ("THESE THREE METHODS ARE SUSPECT") to "TO HERE", so it never runs, and by its phase every such clause is `{Object}` already: left.
- **The library's own way.** The library turns any value into a string by concatenating it with the empty string: `print`, `println`, `errorPrint`, `errorPrintln` (`Library/FortressLibrary.fss:4494-4497`), `|||`'s two members over `Any` (`:4404-4405`), juxtaposition's `(a:Any, b:String)` (`:4458`) and `join` (`:4436`): eight sites. The two `||` members over `Any` were the only bodies of `trait String` that called `asString` on an `Any`. At the bottom, the library's device for "an `Object`, else fail" is `assert`'s typecase (`:306-316`) and `cast` (`:33-37`, that typecase with `throw CastError`). Before this edit no body called `cast[\Object\]` (`grep -n 'cast\[\\Object\\\]' Library/*.fss` printed nothing).

## 4. The checker count and the distance

Both stages ran once, on `7ba1a846d`, built; the befores are climb batch 18's landed tables.

**The count** (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-string-conversion/checker-count-postedit.txt tmp/rung-string-conversion/cc-post`):

    diff explorations/compile-ladder/climb-batch-18/gate/checker-count.txt tmp/rung-string-conversion/checker-count-postedit.txt
    14,15c14,15
    < #total	30
    < #locations	29
    ---
    > #total	28
    > #locations	27

Every api stays at 0; `#crash none`. The full output holds no error at `FortressLibrary.fss:4393` or `:4394` and no "has no getter called asString" (`grep -c 'FortressLibrary.fss:439[34]'` on the stage's output prints 0).

**The count stage's seconds.** Before: about 68 s at climb batch 18's gate (F-240), and 60 s by the planner's run of the same change on this base. After: `real 1m2.464s` (`time` around the stage), started 2026-10-20T00:57:03Z; nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, load at start 3.23 2.33 1.17, openjdk 25.0.4.1, FORTRESS_THREADS=1, with rung P's worker running beside it. The edit changes a phase before the checker, not the checker, so there is no speed pass (the brief; fork 14).

**The distance** (`explorations/coordinator/tools/distance/run.sh tmp/rung-string-conversion/distance-postedit.txt tmp/rung-string-conversion/dist-post`; `#seconds 169`, `FortressLibrary` 123):

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-18/gate/distance.txt tmp/rung-string-conversion/distance-postedit.txt
    DISTANCE DOWN   34 -> 31 (-3)
        kind typecheck               31 -> 29     (-2)
        kind export                   3 -> 2      (-1)
        class X1                      3 -> 2      (-1)  export: component against api
        class NM                      2 -> 0      (-2)  names the api does not declare (getters and methods of Range, String, Generator)
        unit component FlatString      1 -> 0      (-1)
        unit component FortressLibrary     32 -> 30     (-2)

**Site by site**, comparing the stage's `errors.tsv` with `explorations/compile-ladder/gate/distance-sites.tsv` row by row (kind, family, subclass, unit, stage, location, message), both exactly and with numbers masked: 34 rows against 31; 3 gone, 0 new, the same both ways. The three gone:

    export     component FlatString       FlatString.fss:12        The following declarations in API FlatString are not matched by the declarations in component FlatString. Unmatched declarations: { (ObjectDecl FlatString at FlatString.fsi:16.3, due to different extends clauses, due to different extends clauses, different method || @ FlatString.fsi:20:5-38) }
    typecheck  component FortressLibrary  FortressLibrary.fss:4393 Any has no getter called asString
    typecheck  component FortressLibrary  FortressLibrary.fss:4394 Any has no getter called asString

No site came. No table is committed: the gate's tables on the merged tree are the record.

## 5. Old against new

**What moves under walk.** Twenty-one one-line programs, each declaring `object Inf extends Any end`, `object Infinity extends Any` with its own `asString`, `trait Tany extends Any`, `object InTany extends Tany`, `object Plain` and `inc(x: ZZ32): ZZ32`. Each ran once on the old code (`old-fortress.sh /home/user/fortress-base19 <tree>/tmp/rung-string-conversion/old-caches P.fss`) and once on the new (`bin/fortress P.fss`):

| Expression | Old | New |
|---|---|---|
| `(1,2) \|\| "s"` | ProgramError "Non-object receiver (1,2): (Int,Int) trying to invoke method asString", rc 1 | `(1,2)s`, rc 0 |
| `() \|\| "s"` | the same ProgramError, rc 1 | `()s`, rc 0 |
| `() // "s"` | the same ProgramError, rc 1 | `()`, a newline, `s`, rc 0 |
| `"s" \|\| inc`, `inc \|\| "s"` | ProgramError "Non-object receiver inc(...) ... asString", rc 1 | `CastError` at `cast` (`FortressLibrary.fss:36`), rc 1 |
| `"s" \|\| (1,2,3,4,5,6,7)`, `println((1,2,3,4,5,6,7))` | ProgramError "Non-object receiver (1,...,7) ... asString", rc 1 | `CastError`, rc 1 |
| `"s" \|\| Inf`, `println(Inf)` | ProgramError "Cannot find definition for method asString given receiver Inf", rc 1 | `sInf`, `Inf`, rc 0 |
| `Inf \|\| "s"` | the same, rc 1 | `Infs`, rc 0 |
| `"s" \|\| InTany` | the same, given receiver InTany, rc 1 | `sInTany`, rc 0 |

The same on both: `"s" || Infinity` (`sInfinity`), `"s" || (1,2)` (`s(1,2)`), `(1,2) ||| "s"` (`(1,2) s`), `(1,2) "s"` (`(1,2)s`), `"s" || Plain`, `Plain || "s"`, `3 || "s"`, `true || "s"`, `'c' || "s"`, `"s" || 2.5`. An object declared `extends Any` with no `asString` of its own now prints its bare type name, `Inf`, as P-91 has every object do.

**Each walk expected-failure test.** All 131 `ProjectFortress/tests/XXX*.fss` were run directly from `ProjectFortress/` on the old code and on the new, and their outputs compared with tree paths, `Operation took`, identity hashes and Java line numbers masked. 128 are the same, and every exit code is the same (16 rc 0, 108 rc 1, 7 rc 255 on both). The three that differ:

- `XXXFnRenderRungS` and `XXXTupleSevenRungS`: "ProgramError ... FortressLibrary.fss:4394:42-50: Non-object receiver ... trying to invoke method asString" becomes "FortressLibrary.fss:36:13-27: CastError", and the context gains `FortressLibrary.fss:4394:42-57`. Both stay expected failures (rows 374 and 369).
- `XXXCoercionTupleOverloadRungC`: its overload listing names its two declarations in the other order, which walk varies from run to run (the skill's `interpreter.md`, "What walk checks"); not a change.

No plain walk test can change its output. Every value of the conversion that moves stopped its program with an uncatchable `ProgramError` on the old code, and the plain walk tests pass on the base. The moves of the desugaring are quiet on both codes: for an object declared `extends Any`, `typecase` takes the `Object` arm where it took `else`, and of `f(x: Any)` beside `f(x: Object)` the second is chosen where the first was, rc 0 on both (the skeptic's programs, `SKEPTIC.md` section 3). Only a program that declares `extends Any` can show them, and the two plain tests that do, `extendAny` and `extendObject`, keep their output. `testSystem` holds every verdict (section 2).

**Compiled.** `ExtendsAnyIsObject` prints 'Inf: not an Object', 'InfBraced: not an Object' and 'InTany: not an Object' on the old code, and 'an Object' for each on the new (section 2). The conversion does not reach the compiled path, which links the compiler's own prelude. The skeptic's programs (`SKEPTIC.md` section 3) add three moves of the desugaring there: `println(Inf)` and `Inf.asString` for `object Inf extends Any end`, refused on the old code ('Inf has no getter called asString'), compile and print `Inf`; `object Oaa extends { Any, Any } end`, which died at class load on the old code (`ClassFormatError` 'Duplicate interface name "fortress/AnyType$Any"'), is an `Object`; and `trait Tx extends Any excludes { Object }` gains the refusal 'Type Tx excludes CompilerBuiltin.Object but it extends CompilerBuiltin.Object', which `trait Ty excludes { Object }` gets on both codes. Under walk that `Tx`'s object loads and is now an `Object`, as `Ty`'s is on both: walk does not check an `excludes` clause against an `extends` clause (row 371).

**The ungated `ProjectFortress/not_passing_yet/SimpleTrait.fss`** (`trait A extends {Any}`), which the rewrite reaches: rc 0 and no output on both the old code and the new, so `ant testNotPassing`'s verdict on it does not move.

## 6. What an object or trait declared `extends Any` is now, and what the rewrite reaches

- On both paths, an object, a trait, an object of such a trait and an object expression declared `extends Any` or `extends { Any }` are `Object`s. `typecase` takes the `Object` arm, `cast[\Object\]` returns the value, and the value has `Object`'s members, `asString` among them. Walk: `ExtendsAnyIsObjectWalk` and `ConcatAnyOnLeftWalk`. Compiled: `ExtendsAnyIsObject`, without the object expression, which is a code-generator wall.
- A tuple stays outside `Object` (`ExtendsAnyIsObjectWalk`, 'pair: not an Object').
- **Declarations the rewrite reaches.** A scan of `git ls-files '*.fss' '*.fsi'` for `extends Any` or `extends { Any }`, static-parameter bounds left out, finds:
  - in gated tests: `ProjectFortress/tests/extendAny.fss:18` and `ProjectFortress/tests/extendObject.fss:15` (both the team's, both green before and after), and the three new tests;
  - in ungated folders: `ProjectFortress/not_passing_yet/SimpleTrait.fss:15` (above) and `ProjectFortress/parser_tests/XXXMultipleTraitClauses.fss:15`, which no `.test` file names;
  - off the source path: `Library/incomplete/advanced/Fortress.Predicates.fsi:13`, `:18`;
  - in the one library and in the compiler's library: none. The only clauses there that name `Any` alone are `Object`'s own (`FortressBuiltin.fsi:32`, `.fss:37`, `CompilerBuiltin.fsi:17`, `.fss:354`), which the rewrite leaves. `Any`'s own declaration has no clause (`ProjectFortress/LibraryBuiltin/AnyType.fsi:14`, `.fss:15`), and the rewrite already left it.
  - The specification's algebraic constraints declare traits `extends Any` (`Specification/advanced-lib/algebraic-constraints.tex:29`, `:45`, `:595`, `:611`); the library does not ship them (row 37), and no extracted example declares one.
- **Where rung P meets it.** The desugaring runs before walk's load check and the checker's exclusion test, so a declaration written `extends Any` reaches rung P's code with `Object` among its parents. No library declaration is such a one; the gate's merged tree is the first with both changes.

## 7. The ladder

The change's own subset ran after the edit only, with gate.md's drivers copied under `tmp/rung-string-conversion/ladder/` and copies of the tree's caches (`bash run-subset.sh`, `python3 classify.py`). It holds each file whose recorded first error in the baseline names what the change touched (`Object`, `ObjectExpr`, an `extends` clause), and the two files that declare `extends Any`.

| File | Landed (climb batch 18) | Baseline | Now |
|---|---|---|---|
| `extendObject.fss` | pass | pass | pass |
| `extendAny.fss` | not in the gate | disambiguate, "Type name may refer to: Infinity, CompilerBuiltin.Infinity" | the same |
| `XXXextendObject.fss` | not in the gate | typecheck, "Invalid type in extends clause: Foo" | the same |
| `ObjectToStringTest.fss` | not in the gate | codegen, "emitDesc of type Object failed" | the same |
| `conditionalExtension.fss` | not in the gate | typecheck, "Cyclic type hierarchy ..." | the same |
| `objectCC.fss`, `objectCC_immutable.fss`, `objectCC_mutable.fss`, `objectTest7.fss`, `scopeSharing.fss` | not in the gate | codegen, "Can't compile ObjectExpr ..." | the same, apart from the tree's path |
| `ExtendsAnyIsObjectWalk.fss` (new) | not in the gate | none | typecheck, "Could not check call to function assert" (walk's `assert` over `Any`, which the compiler's prelude does not declare) |

Left out: `Brackets.fss` and `vectorOps.fss` (`||_||`), `sequivTest.fss` (`BIG ||`) and `tupleInfer.fss` (`AnyIntegral`), whose first errors name other operators or names. No ladder file, compiled test or specification example changes its verdict or output.

## 8. What the specification settles, and the sentences made false

The text settles row 743 three times. Every trait but `Any` and `Object` implicitly extends `Object` if it does not do so explicitly (`Specification/basic/traits.tex:186-188`). `Object` is the root of the type hierarchy for all user-constructed objects (`Specification/basic-lib/objects.tex:131-132`). `Any`'s immediate subtypes are tuple types, arrow types, `()` and `Object` (`Specification/basic/types-vals-vars.tex:153`). No normative sentence changes. The library's `String` code has no passage. A tuple's string is its elements' strings in parentheses (`Specification/basic-lib/objects.tex:198-222`), which a tuple on the left of a string now gets.

**Sentences of the specification made false: none.** `grep -n -i 'extends Any\|row 743\|row 726\|row 585\|row 374\|FlatString\|asString\|Non-object\|implicitly extends' Specification/appendices/changes.tex` prints only `changes.tex:423`, "Object extends Any alone and Tuple likewise", which stays true because the rewrite leaves `Object`'s own declaration. The Effect of "Overloading with static parameters" (`changes.tex:2834-2838`, row 726) states what the checker does, and stays true.

**Sentences of the record made false**, for the gather:

- F-246, "The conversion makes the team test `extendAny` stop with `CastError` (row 743)" (`explorations/coordinator/FACTS.md:105`): that holds only without row 743's repair; with it, `extendAny` prints `Infinity`.
- Row 743's claim (`explorations/fortress-gap-ledger.md:301`): an object whose `extends` clause names `Any` is now an `Object` on both paths.
- Row 726's notes, "`FlatString`'s api declares this pair (`Library/FlatString.fsi:17`, `:20`); its component lacks the second (row 585)" (`explorations/fortress-gap-ledger.md:449`).
- Row 585's notes, "FlatString's api adds `opr ||(a:FlatString, self)` (`FlatString.fsi:20`; row 726), omitting `DelegatedIndexed` (`.fss:34`): one distance export error" (`explorations/fortress-gap-ledger.md:770`).
- Row 374's notes, "`opr ||(self, b:Any)` (`:4263`) calls `asString`, declared on `trait Object` ..., which a function value is not" (`explorations/fortress-gap-ledger.md:687`): walk now raises `CastError` at `cast[\Object\]`.
- Row 369's notes, "Seven elements fall to `opr ||(self, b:Any)` (`:4263`): `ProgramError` 'Non-object receiver … trying to invoke method asString'" (`explorations/fortress-gap-ledger.md:686`): now `CastError`.

## 9. Points to report

- **The distance and count tables, site by site.** The distance goes from 34 to 31: the three sites `FortressLibrary.fss:4393`, `:4394` and `FlatString.fss:12` are gone and none is new. The count goes from 30 to 28 (section 4).
- **Each walk value that moves, and each test whose message changes.** Section 5's table. `XXXFnRenderRungS` and `XXXTupleSevenRungS` now fail by `CastError` instead of `ProgramError`; `extendAny` keeps printing `Infinity`; no verdict changes.
- **What an object or trait declared `extends Any` is now, and the declarations the rewrite reaches.** Section 6, and the moves of section 5: the `Object` arm of `typecase` taken under walk and compiled, the `Object` overload chosen under walk (compiled chose it on both codes, while its `typecase` took `else` on the old), and on the compiled path `println(Inf)` accepted, `{ Any, Any }` loaded, and `extends Any excludes { Object }` refused.
- **The team lines changed.** `Library/FortressLibrary.fss:4393-4394` (`String`'s two `||` members over `Any`); `Library/FlatString.fsi:16` and the line that was `:20` (FlatString's header and `opr ||(a:FlatString, self)`); `PreDisambiguationDesugaringVisitor.java:40` (class comment), `:71` (`rewriteExtendsClause`'s comment), `:76` (its test of the clause) and `:123-124` (the trait case); base lines `:39-40`, `:58-64`, `:111`.
- **A ladder file, compiled test or specification example whose verdict or output changes.** None (sections 2 and 7).
- **The count stage's seconds.** About 68 s before (F-240), 62.5 s after (section 4).
- **Every sentence made false.** None in the specification; six in the record (section 8).
- **A file edited beyond those named, or a checker, walk evaluator or code-generator edit.** None: only the three named files, and new test files.

## 10. Decisions

1. **The sites by the conversion alone (way C)**, not by moving the four operator families to the top level (ways J, JC, JCp, JH). Evidence: F-246 (C frees all three, nothing new); F-245 (the device answers errors only a check of symbolic operators reports); fork 10 of the batch record.
2. **The left member as `("" || a) || self`**, the library's way. Not taken: `cast[\Object\](a).asString || self`, which would stop a tuple or `()` on the left although the right side renders it; and the team's `a.asString`, which is the distance site. Evidence: `Library/FortressLibrary.fss:4494-4495`, `:4404-4405`, `:4458`.
3. **The right member's bottom as `cast[\Object\](b).asString`.** Not taken: `assert`'s typecase written inline (`:306-316`: the same test, longer); a member over `Object` in place of `Any` (then `"" || a` with `a: Any` in `print`, juxtaposition and `|||` has no applicable declaration, and the checker refuses those bodies; the symbolic-operators probe, section 2.6); and the team's `b.asString`. Evidence: `cast` is that typecase with `throw CastError` (`:33-37`); the probe's decision 3.
4. **FlatString's api: both lines**, the header and the dropped member. Not taken: the member alone, which would leave the export error's "different extends clauses" half (`distance-sites.tsv:3` names both reasons); and `opr ||(a:FlatString, self)` added to the component, which would put into it a pair at two `self` positions that walk refuses at load (row 726's notes). Evidence: `Library/FlatString.fss:34`; fork 13.
5. **Row 743 in the pre-disambiguation desugaring**, not in walk's environments and the checker's hierarchy apart. Evidence: section 3; fork 11.
6. **`Any` told by the name's text, and `Object`'s own declaration by its name**, not by the api that declares them:
   - before disambiguation a reference carries no api unless one is written, so the api is not known in this phase;
   - the inserted `Object` is itself an unbound name that the disambiguator binds later, so the rewrite already reads the two roots by name;
   - on the base, `Any`'s own declaration is told by name at `:111`;
   - told by its api, a user's trait named `Object` that extends `Any` would be rewritten to extend `Object`, which would then bind to the trait itself.
   The reference is matched by its text, not by `Id` equality, so that `AnyType.Any` counts too; the only other `Any` in the tree is off the source path (`Library/incomplete/basic/Fortress.Core.fsi:12`).
7. **`Object`'s own declaration skipped in the trait case, beside `Any`'s**, not tested inside `rewriteExtendsClause` by `whence instanceof TraitDecl` as the probe did. So the helper tests the clause only, and the trait case, where `Any`'s skip already was, is the one place that names the two roots.
8. **The whole clause replaced by `{Object}` when every type in it is `Any`**, as for the empty clause, not each `Any` replaced in place. A clause that names another trait as well already reaches `Object` through it.
9. **`PreTypeCheckDesugaringVisitor`'s twin left alone** (section 3): it is dead code, and by its phase the clause is `{Object}` already.
10. **The class comment's one line updated** to say "or only Any", not left stale.
11. **The tests.** `ExtendsAnyIsObjectWalk` (walk, with an object expression and a tuple guard) and `ExtendsAnyIsObject` (compiled, without an object expression, the code generator's wall) are the probe's program as the brief gives it. `ConcatAnyOnLeftWalk` covers the moved values. It compares a tuple's rendering on the left with its rendering on the right instead of pinning "(1,2)", so that row 369's separator repair will not turn it red. No `XXX` test: every defect measured is repaired here or already has one.
12. **The count stage's "before" seconds taken from the record** (F-240; the planner's 60 s), not from a run on the unchanged base (the brief, step 7).
13. **The ladder subset** as section 7 gives it. No microGPT phase run, since no microGPT component declares `extends Any` (the scan above) and the compiled path does not link the changed library.
14. **The old-against-new comparison of walk tests over the 131 expected failures**, not every walk test, since only an expected failure can change its message (section 5).

## 11. Defects and their homes

- **Row 743**, an object or trait declared `extends Any` is not an `Object` on either path: home 1, repaired; `ProjectFortress/tests/ExtendsAnyIsObjectWalk.fss` and `ProjectFortress/compiler_tests/ExtendsAnyIsObject.test`. The gather closes the row.
- **`String`'s two `||` members over `Any` call `asString` on an `Any`** (the distance's NM sites), so under walk a tuple, `()` or an `Any` object on the left of a string stops with `ProgramError`: home 1, repaired; the distance stage and `ProjectFortress/tests/ConcatAnyOnLeftWalk.fss`. No row held the walk face, and a repaired defect needs none.
- **FlatString's api against its component** (the X1 site; the library's instance of row 726, and row 585's note): home 1, repaired; the distance stage. Row 726's compiled test stays, since the checker gap is unchanged.
- **A function, or a tuple of seven or more elements, beside a string** (rows 374 and 369): deferred, home 2; their `XXX` tests stand, and now fail by `CastError`. The notes are in `record.md`.
- **An object whose `extends` clause lists one trait twice dies at class load on the compiled path** (`ClassFormatError` 'Duplicate interface name'), the same on the base; the rung clears only its `{ Any, Any }` instance. Deferred, home 2: `ProjectFortress/compiler_tests/XXXDuplicateExtendsEntry.test` with `DuplicateExtendsEntryLink.test`, and the new row NEW-S-1 in `record.md` (the skeptic's, `SKEPTIC.md` section 4).
- **Under walk a trait declared `extends Any excludes { Object }` loads, and its objects are now `Object`s**: row 371, whose notes are at their limit (`SKEPTIC.md` section 3).

## 12. For FACTS

- **An object or trait whose `extends` clause names `Any` alone is an `Object` on both paths, and such an object expression under walk (the compiled path compiles no object expression), and `String`'s two `||` members over `Any` convert by the library's own way.** What it means: with the conversion in place `extendAny` prints `Infinity`, so F-246's `CastError` no longer holds; the distance is 31 and the count 28. Tests: `ExtendsAnyIsObjectWalk`, `ExtendsAnyIsObject`, `ConcatAnyOnLeftWalk`, the distance stage. Detail: sections 1, 4 and 5.

## 13. Commands worked out

- **Every walk expected-failure test on the old code and the new**, one JVM each, run from `ProjectFortress/`: `old-fortress.sh <base build> <tree>/tmp/<dir>/old-caches <tree>/ProjectFortress/tests/XXX<Name>.fss` and `../bin/fortress tests/XXX<Name>.fss`. The outputs are compared with tree paths, `Operation took`, `@` hashes and `.java:N)` masked. It takes about 15 minutes per side for the 131 tests.
- **The base build's own harness on a test of this tree**: `FORTRESS_HOME=<base build> <base build>/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/<dir> <tree>/ProjectFortress/tests/X.fss`, with absolute paths.
