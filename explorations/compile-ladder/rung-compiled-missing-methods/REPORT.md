# Rung M of climb batch 35b: two compiled calls that the checker accepts and that die at run time (rows 1053 and 815)

- problem: the planner's probes, compiled on the base, die with `NoSuchMethodError` at a setter's call and at an overload method (`explorations/compile-ladder/plan-35/probes/fixes-35.md:46-47`)
- spec: assigning a field calls its setter, with a right-hand side of a subtype of the field's type (`Specification/basic/expressions/bindings.tex:60-61`, `:86-87`); a functional method is a top-level function overloaded with the others, and a call runs the most specific declaration applicable at run time (`Specification/basic/traits.tex:616-626`; `Specification/basic/overloading.tex:302-311`)
- precedent: the two other sites that build an overload set before they use it split it with its subsets, `os.split(true)` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7457`, `:8817`); a method's parameter type at the receiver's instance as `callTakesTupleBoxed` reads it (`CodeGen.java:7700-7726`); the cast below self's trait at a call's one argument (`CodeGen.java:8239`, `castToTypeBelow` at `:8255`)
- deviation: a call at an arrow other than the principal member's gets a second method that passes its arguments on (`forwardToPrincipal`, `CodeGen.java:8739-8771`), which no other site writes; none from the specification's spelling
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` (`CodeGen.java:7521-7526`, `:7728-7775`, `:8707-8771`)

Provenance lines cite the final tree, after the skeptic's fix `35116d1ffb`; the sections below cite `CodeGen.java` as at the worker's commit `7cf79900c2`, where a line after `setterParamType` stands sixteen lines earlier than in the final tree.

One launch worked this rung. The worktree was seeded from the base build, `seed-worktree.sh` exit 0.

## 1. What changed and why

**Row 1053.** The desugarer turns `c.t := v` into the dotted call `c.t(v)` with no arrow (`compiler/desugarer/DesugaringVisitor.java:395-418`), and `CodeGen.forMethodInvocation` then takes the argument's static type as the call's domain (the team's own note at `CodeGen.java:7498-7503`: "some method applications (particularly those introduced during getter desugaring) don't have an OverloadingType"). The object's class declares the setter at the field's type, so where the value's type is strictly below it the call names a method the class lacks. Now a call without the checker's arrow, on a trait or object type, with an argument, takes as its domain the parameter type of the receiver type's one method of that name that has no static parameters of its own, one parameter and the return type `()`, at the receiver's instance (`setterParamType`, `CodeGen.java:7728-7759`, used at `:7521-7527`). The argument then goes through `evalArg`, whose one-argument branch casts a value of self's type below its trait (`castToTypeBelow`, `:8223`), so `s.r := self` in `trait Q comprises { R }` passes `self` cast to `R`.

**Row 815, and row 390 with it.** Where the checker leaves a call several declarations, as at the tie between a trait's functional method and that of an object that the trait's `comprises` clause lists, the overload rewrite names an overload method of those declarations, `num{...}` (`compiler/OverloadRewriteVisitor.java:112-133`), and the code generator writes it in `for_RewriteFnOverloadDecl`. That method split the set with `os.split(false)`, which never sets the set's principal member (`OverloadSet.java:419-428`), and since the team's `2fb7488717` (2012-05-09) `generateAnOverloadDefinitionInner` writes nothing without one (`OverloadSet.java:2156-2157`). So no such method was written in any component, and every call that named one died. Now the set is split with its subsets, as the two other sites do (`CodeGen.java:8707`); a name is written once, since it lists the declarations (`:8691-8694`, `:8719-8721`); and where the call's arrow is not the principal member's, a method at the call's signature passes its arguments to the set's method (`forwardToPrincipal`, `:8723-8755`). The checker breaks the tie by the overloadings' order, so `num(R)` names the method at `(R)` in one compile and at `(Q)` in another: the test program's direct compile named `FunctionalMethodComprisedObject.\=num{...}(FunctionalMethodComprisedObject$R)`, a probe of the same pair with a `Q`-typed call beside it named `(FmA$Q)`, and the one library's `Ratio` names `numerator{...}` and `denominator{...}` at `(QQ)` in one compile and at `(Ratio)` in another (section 5). Row 390's call `p(NarrowOf(1))`, beside `p(x: Wide)` and `p(x: Any)`, named the never-written `\=p{...}(fortress.AnyType$Any)` too, so it now runs; its `XXX` test turned red and is promoted (section 2).

The written method dispatches on the argument's run-time type among the set, the more specific first: for `num` it tests `instanceof R`, calls `num(R)`, and else calls `Q`'s own body (javap of the compiled test program):

    0: aload_0
    1: instanceof    #40                 // class FunctionalMethodComprisedObject$R
    11: invokestatic  #43                 // Method num:(LFunctionalMethodComprisedObject$R;)Lcom/sun/fortress/compiler/runtimeValues/FZZ32;
    19: invokestatic  #48                 // Method "num?":(LFunctionalMethodComprisedObject$Q;)Lcom/sun/fortress/compiler/runtimeValues/FZZ32;

and the method at `(R)` passes its argument on: `aload_0`, `invokestatic \=num{...}(Q)`, `areturn`.

## 2. The tests, failing on the base and passing after

Promoted: `XXXVarFieldAssignedSubtypeRun` to `compiler_tests/VarFieldAssignedSubtypeRun` (with `VarFieldAssignedSubtypeRunLink`), its program now also assigning `self` at a listed type (`trait Q comprises { R }` with `putInto(s: Slot): () = do s.r := self end`, `object Slot(var r: R)`); `XXXFunctionalMethodComprisedObject` to `FunctionalMethodComprisedObject` (with `FunctionalMethodComprisedObjectLink`); and, beyond the section, row 390's `XXXCoercionAnyOverloadRungC` to `CoercionAnyOverloadRungC` (its link test `CoercionAnyOverloadRungCLink` kept). Each run test now has `link`, `run` and `run_out_contains=PASS`. `ComprisesSelfAbstractFunctionalMethodCall` asserts `s.total` is 4321, which calls the four functional methods on `self`.

Failing on the base's code, before any edit of code was built (commit `cce3634156` holds the tests, run uncommitted on `5a59551554`):

    $ echo "Expected failure: VarFieldAssignedSubtypeRun.test red, its run after REACHED dying 'NoSuchMethodError: ... FVoid VarFieldAssignedSubtypeRun$Cell.t(VarFieldAssignedSubtypeRun$High)'; FunctionalMethodComprisedObject.test red, 'NoSuchMethodError: ... FZZ32 FunctionalMethodComprisedObject.\=num{...}'; ComprisesSelfAbstractFunctionalMethodCall.test red, 'NoSuchMethodError: ... FZZ32 ComprisesSelfAbstractFunctionalMethodCall.\=width{...}'; the two link tests green"
    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests VarFieldAssignedSubtypeRunLink.test FunctionalMethodComprisedObjectLink.test VarFieldAssignedSubtypeRun.test FunctionalMethodComprisedObject.test ComprisesSelfAbstractFunctionalMethodCall.test
    # junit.sh base 2026-11-23T17:52:23Z; nproc 4; ...; FORTRESS_THREADS=4; tree 5a59551554 with the next rung applied, not yet committed
    . run ProjectFortress/compiler_tests/VarFieldAssignedSubtypeRun (382ms) REACHED
    Caused by: java.lang.NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FVoid VarFieldAssignedSubtypeRun$Cell.t(VarFieldAssignedSubtypeRun$High)'
    Caused by: java.lang.NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FZZ32 FunctionalMethodComprisedObject.\=num{_|ProjectFortress|compiler_tests|FunctionalMethodComprisedObject\,fss\!6\!5-7\!1,...
    Caused by: java.lang.NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FZZ32 ComprisesSelfAbstractFunctionalMethodCall.\=width{_|ProjectFortress|compiler_tests|ComprisesSelfAbstractFunctionalMethodCall\,fss\!15\!5-25,...
    Tests run: 9,  Failures: 3,  Errors: 0

The run stops at `c.t := High`, before the second form; that form alone died 'NoSuchMethodError: ... FVoid <component>$Cell.r(<component>$Q)' on `0a83a70498` before the launch (the section's record), and `compile-ladder/rung-comprises-cast/SKEPTIC.md:32` has the same, `SkFld`.

Row 390's promoted test failed on the old code through the harness, after the fix was in the tree (`tests-writing.md`, "The order"):

    $ echo "Expected failure: CoercionAnyOverloadRungC.test red on the old code, its run after REACHED dying 'NoSuchMethodError: ... \=p{...}(fortress.AnyType$Any)'; CoercionAnyOverloadRungCLink.test green"
    $ cd ProjectFortress && ../explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base43 <tree>/tmp/.../old-caches junit compiler_tests/CoercionAnyOverloadRungCLink.test compiler_tests/CoercionAnyOverloadRungC.test    # 2026-11-23T19:02:06Z, base build 0a83a70498
    . run compiler_tests/CoercionAnyOverloadRungC (309ms) REACHED
    Caused by: java.lang.NoSuchMethodError: 'fortress.CompilerBuiltin$String CoercionAnyOverloadRungC.\=p{...|CoercionAnyOverloadRungC\,fss\!20\!1-30,...|CoercionAnyOverloadRungC\,fss\!21\!1-29}(fortress.AnyType$Any)'
    Tests run: 3,  Failures: 1,  Errors: 0

Passing, the last run after the last change of code (the code of `7cf79900c2`; the promotion committed after it, `48f169bd40`), the rung's tests with the compiler track's tests of fields, getters, functional methods and `comprises` clauses, 93 files, in one JVM:

    $ echo "Expected: all green, the rung's four run tests (...) printing PASS; the XXX tests among them still expected failures"
    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh last ProjectFortress/compiler_tests CoercionAnyOverloadRungCLink.test CoercionAnyOverloadRungC.test $(ls *.test | grep -i 'field\|setter\|getter\|functionalmethod\|comprises')
    # junit.sh last 2026-11-23T19:02:17Z; ...; tree 7cf79900c2 with the next rung applied, not yet committed
    . run ProjectFortress/compiler_tests/CoercionAnyOverloadRungC (302ms) REACHED
    . run ProjectFortress/compiler_tests/ComprisesSelfAbstractFunctionalMethodCall (370ms) PASS
    . run ProjectFortress/compiler_tests/FunctionalMethodComprisedObject (320ms) REACHED
    . run ProjectFortress/compiler_tests/VarFieldAssignedSubtypeRun (303ms) REACHED
    OK (143 tests)

each `REACHED` followed by `PASS`. The JVM's verifier is on: no script or `bin/` file passes `-Xverify` or `-noverify`.

The onelibrary track, on the code of `7cf79900c2` (started 2026-11-23T18:15:42Z, after the build of the last edit):

    $ ant testOneLibrary
    [junit] Tests run: 40, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 179.122 sec
    BUILD SUCCESSFUL

Its `FortressLibrary` class, which every run test there loads and verifies, holds the new `numerator{...}` and `denominator{...}` methods (section 5). A first start of the track was stopped by me during its compiles of the library, because an edit of `forwardToPrincipal` (its argument count, read by `NamingCzar.parseArgs` in place of ASM's `Type`) came after the build it ran on; it is not a result.

Other runs on the final code, each in one JVM: every `XXX` run test of `compiler_tests/` (55) with its link tests, and `library_tests/XXXRR32EqualityRungV`: 'Tests run: 111, Failures: 1' and 'OK (2 tests)', the one failure `XXXCoercionAnyOverloadRungC`, 'Did not see expected failure', which led to its promotion; and the 49 compiler tests whose names hold "overload", "tie" or "dispatch": 'Tests run: 86, Failures: 1', the same test. `XXXOverloadedFnValue` (row 448) still stops in `OverloadSet.join`, 'IndexOutOfBoundsException', as recorded.

## 3. Where the fix belongs, and the precedent

The code generator (`explorations/coordinator/map/modules-and-phases.md`, B.7 and the code generator's section; the brief's files). Row 1053's arrowless call comes from `DesugaringVisitor`, which both paths run (`compiler/Desugarer.java:135-138`; `fortress.compile.desugar.getset` defaults true, `Shell.java:1288`), so the call is given its domain in `CodeGen`, the compiled path's own code. Row 815's missing method is the code generator's: the checker's tie (rows 1100, 1112, 935) is a choice between two declarations that both apply, and the call's overload method is the code generator's to write.

Precedents counted: `CodeGen.java` builds an overload set at three sites; the two others split with subsets, `os.split(true)`, before using the set (`topLevelOverloadSet`, `:7457`; `generateTopLevelOverloads`, `:8801`); the third, `for_RewriteFnOverloadDecl`, split without (`:8659` on the base), and is the one that wrote nothing. The receiver's instance of a declared parameter type is read in `callTakesTupleBoxed` (`:7700-7726`), whose replacer for the receiver's own static arguments `setterParamType` copies; the cast is `castToTypeBelow`'s (F-377), reached through `evalArg` with no new cast site.

## 4. What the specification settles

`bindings.tex`, "Assignments": "Assigning a left-hand field reference calls the corresponding setter method on the reiver object, passing the new value" (`:60-61`) and "The type of the right-hand side must be a subtype of the type of the left-hand side" (`:86-87`): the assignment calls the setter, whose parameter has the field's type (`traits.tex:570-571`), with any value of a subtype. `traits.tex`, "Method Declarations": a functional method "can be viewed as" a top-level function and is overloaded with the others (`:616-626`); `overloading.tex`, "Overloading Resolution": the call dispatches to the declaration applicable at run time than which no other is more specific (`:302-311`). So `num(R)` runs `R`'s declaration and `width(self)` in `Solid` runs `Brick`'s; walk runs both (row 815). `conversions-coercions.tex`, "Coercion Resolution", settles row 390: a declaration applicable without coercion is chosen, `p(Any)`. No passage is changed.

## 5. Programs run on the old code and on the new

- **The prelude.** The five jars of the base build (`/home/user/fortress-base43/default_repository/caches/bytecode_cache`) against this tree's, written by the library order after the build of the last edit: 571 files, 402 differing in bytes (paths), none after `javap -c -p` with the tree paths and constant-pool indices masked. The edit writes nothing new in the compiler's prelude.
- **The one library.** Its fourteen components compiled by `fortress junit one_library_tests/OneLibraryComponents.test` with `FORTRESS_LIBRARY=one`: the old code through `old-fortress.sh /home/user/fortress-base43 <private> junit ...` from this tree, and the new from a copy of `Library/` and `LibraryBuiltin/` under the scratch, so that each read its apis from its own `FORTRESS_HOME` and its components from elsewhere. 3,217 files, 2,154 classes. Sorted member lists differ in one class, `fortress/FortressLibrary`, by four methods of the new: `\=numerator{...}(QQ)`, `\=denominator{...}(QQ)`, and the two at `(Ratio)` that pass their arguments on. Method code, compared with methods sorted and paths, pool indices, offsets and padding masked, differs in 56 classes, all in the instruction sets of dispatch methods (`instanceof`, `checkcast`, `isA` of tuples and arrows, local slots) that follow the identity-hash order of a dispatch's tests (row 996), and in `Ratio`'s calls of `numerator{...}` and `denominator{...}`, at `(QQ)` in the old and at `(Ratio)` in the new (the tie's order, row 935). No setter's call changed. The overload methods call `numerator♙(QQ)`, `numerator(Ratio)` and the `denominator` pair, which the class holds.
- A first comparison, the new library from this tree itself or from ant's JVM, also showed numeral sites (`numeral$init$N`, `numeral$coercion$N`) in six of the old components and none in the new; with the new compiled from the copy, as the old was, the numeral sites are in both. So they follow where the compile reads its sources, not the edit; the cause was not traced, and no program in one tree observes it.
- **The ladder subset.** `tests/XXXGenericOverload2.fss`, the one baseline file whose recorded first error names an overload method of the rewrite (`\=f{...}`, a generic pair): after the edit it stops at `link` with the baseline's first error, 'Unable to read serialized data for XXXGenericOverload2?$\=f{...}', compared with `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` (the gate's ladder does not run it). No setter's call is a recorded first error in the baseline.

## 6. Sentences of the specification made false

None. `grep -rn '~1053\|~815' Specification --include=*.tex` and `grep -rn '~390' Specification --include=*.tex` print nothing. No `\note` or `\revision` in `bindings.tex`, `traits.tex` or `objects.tex` speaks of the compiled path's setters or functional methods. `Specification/appendices/changes.tex:4713` and `:4754` name `NoSuchMethodError` for rows 816 and 839, which this change does not touch.

The record's text that the change makes false, for the gather: F-377's sentence "An assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, fails at run time, `NoSuchMethodError`, also for `c.r := self` at a listed type (row 1053)"; row 770's notes, "Without an api, compiled, `num(R)` on the object dies at run time (row 815)"; row 1112's notes, "A call at the listed type's arrow names the overload method that row 815 finds missing"; and the skill's `compiler.md`, "Traps of the compiled path", the first and third items of "A clean link does not prove that every call has its method" (`.claude/skills/fortress-repo/references/compiler.md:172`, `:174`). `record.md` gives each new text.

## 7. Points to report

- **Each fix as made, by file and member, and where row 815's overload method is now written.** Row 1053: `CodeGen.forMethodInvocation` (`CodeGen.java:7521-7527`) and the new `CodeGen.setterParamType` (`:7728-7759`). Row 815: `CodeGen.for_RewriteFnOverloadDecl` (`:8691-8713`) and the new `CodeGen.forwardToPrincipal` with its set `rewrittenOverloadsWritten` (`:8719-8755`). The overload method is written into the component's own class by `OverloadSet.generateAnOverloadDefinition`, called from `for_RewriteFnOverloadDecl` (`:8710`), at the principal member's signature, and the method at the call's arrow by `forwardToPrincipal` (`:8733-8755`). `OverloadSet.java` is not edited.
- **The two expected failures promoted, row 1053's second form and row 815's call on self, each failing on the base and passing after.** `VarFieldAssignedSubtypeRun` holds both forms of row 1053 (the second reached only after the first, section 2); `FunctionalMethodComprisedObject` and `ComprisesSelfAbstractFunctionalMethodCall`'s `s.total` hold row 815's two calls. Failing lines and passing lines in section 2.
- **Another of that kind: a third expected failure promoted, beyond the section.** Row 390's `XXXCoercionAnyOverloadRungC` turned red on the fix and is promoted to `CoercionAnyOverloadRungC` (`48f169bd40`); row 390 closes with rows 1053 and 815.
- **The onelibrary track on the final code.** 'Tests run: 40, Failures: 0', 'BUILD SUCCESSFUL', on the code of `7cf79900c2`.
- **The files edited, for STAGE_BLIND.** `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`; `ProjectFortress/compiler_tests/VarFieldAssignedSubtypeRun.{fss,test}`, `VarFieldAssignedSubtypeRunLink.test`, `FunctionalMethodComprisedObject.{fss,test}`, `FunctionalMethodComprisedObjectLink.test`, `ComprisesSelfAbstractFunctionalMethodCall.{fss,test}` (the two `XXX` names removed); and, beyond the files named, `CoercionAnyOverloadRungC.{fss,test}` and `CoercionAnyOverloadRungCLink.test` (`XXXCoercionAnyOverloadRungC` removed), row 390's test. No library, checker, walk or model file.

## 8. Decisions

1. **Row 1053's domain is read in the code generator, from the receiver type's methods.** Ways not taken: give the call its arrow in `DesugaringVisitor.mangleLhs`, from the field reference's checked type (`DesugaringVisitor.java:395-418`), a phase that walk runs too (`Desugarer.java:135-138`), outside the section's files, and a whole-suite run for both paths; rewrite the assignment in the checker (not this rung's area). Evidence: the call reaches `forMethodInvocation` without an arrow (`CodeGen.java:7491-7503`).
2. **The setter is found by its shape:** the one method of the name with no static parameters of its own, one parameter and the return type `()`; with none or several of differing types, the call keeps today's domain. Way not taken: only a `FieldSetterMethod` of the index; an explicit `setter` declaration and the desugarer's `FnDecl` for a field both have that shape, and the specification forbids a setter's name to overlap an ordinary method's (`traits.tex:573`). Only calls without the checker's arrow are touched, which a dotted call written in the source never is.
3. **Row 815: the overload method is written (fork M2's first way), by splitting the set with its subsets as the two other sites do.** Way not taken: the call made through the trait, naming the top-level dispatch method `num` at the trait's signature from the call site; it fails where the call names the object's arrow, `(R)`, which the checker's tie gives in some compiles (section 1), and it depends on how the top-level set's subsets are named.
4. **A call at an arrow other than the principal member's gets a method at its own signature that passes its arguments on.** Ways not taken: change the call site to name the principal member's signature (the rewrite's declarations are visited after the calls, so the call site has no set to read); write the whole dispatch again at the call's signature by overriding `OverloadSet.getSignature` (its casts go to the principal's range); make the checker break the tie one way (the checker, rows 1112 and 935). Evidence: `FunctionalMethodComprisedObject`'s direct compile named `(R)`, the `FmA` probe `(Q)`, and the one library's `Ratio` `(QQ)` in one compile and `(Ratio)` in another.
5. **A rewritten set of one name is written once.** The name lists the declarations' own names, so two rewrite nodes of one name, made for calls at two arrows, would write the same methods twice, a duplicate method that fails the class's load. Way not taken: no guard, which `split(false)` never needed since it wrote nothing.
6. **Generic sets are written as the top-level path writes them; no forwarding method for a generic principal member.** Evidence: `XXXGenericOverload2`, a generic pair, compiles and stops at `link` as before (section 5). Way not taken: keep `split(false)` for sets with static parameters; nothing measured asks for it.
7. **The forwarding method counts its arguments with the tree's own descriptor reader on the mangled descriptor (`NamingCzar.parseArgs`), and loads each as a reference.** Way not taken: ASM's `Type.getArgumentTypes` on the unmangled descriptor, which an Oxford-bracketed generic type with `;` inside would miscount; my first version used it and was replaced before the final build.
8. **Row 390's test promoted by dropping the prefix only**, `CoercionAnyOverloadRungC`, to keep its link test's name; its pointer comment replaced by one line that says what it checks; its assertion kept word for word.
9. **Row 1100 gets no note.** Its line is 1,186 characters; a note that its test now also asserts the getter's value passes 1,200, and the row's claim stays true.
10. **No checker count or distance** (the section: none, STAGE_BLIND). The edit is in the code generator, which neither stage runs.

## 9. Defects and their homes

- **Row 1053**, both forms (`c.t := High`; `s.r := self` at a listed type): repaired, home 1, `VarFieldAssignedSubtypeRun`.
- **Row 815**, the call on a value typed as the object and the call on `self` in the trait: repaired, home 1, `FunctionalMethodComprisedObject` and `ComprisesSelfAbstractFunctionalMethodCall`.
- **Row 390**, the call that one declaration takes without coercion and another by a coercion: repaired by the same change, home 1, `CoercionAnyOverloadRungC`.
- The rewritten overload sets never written since `2fb7488717` are the cause of rows 815 and 390, not a defect of their own.
- The one library's numeral sites, which follow where a compile reads its apis and components (section 5): no home; nothing in one tree observes it, and it is recorded here for anyone who compares compiled output across trees.

## 10. Other checks

- Competing declarations: `setterParamType`, `forwardToPrincipal` and `rewrittenOverloadsWritten` occur nowhere else under `ProjectFortress/src/com/sun/fortress/`; the components `VarFieldAssignedSubtypeRun`, `FunctionalMethodComprisedObject` and `CoercionAnyOverloadRungC` are declared once; `object Slot` is also in `tests/TupleIndexBoundWalk.fss:17`, another component.
- Whole suites: none (`tests-running.md`, "When to run a whole suite": an edit of the code generator runs its own tests and leaves the tracks to the gate), besides the onelibrary track that the section asks for.

## 11. Commands worked out

- The one library compiled by the old code for a comparison: `cd ProjectFortress && FORTRESS_LIBRARY=one ../explorations/coordinator/tools/old-fortress.sh <base-build> <private-caches> junit one_library_tests/OneLibraryComponents.test`; the new from a copy of `Library/`, `ProjectFortress/LibraryBuiltin/` and the `.test` file under the scratch, `cd <copy>/ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_CACHES=<private> <tree>/bin/fortress junit one_library_tests/OneLibraryComponents.test`, so that both read their apis from their `FORTRESS_HOME` and their components from elsewhere. Compare member lists sorted, and method code with methods sorted, under `LC_ALL=C.UTF-8` (javap cannot open the library's class files with non-ASCII names otherwise).
