# Cold read: record-landing, climb batch 34

File read: `explorations/compile-ladder/climb-batch-34/record-landing/clean.txt`, seven entries, all facts (F-34, F-325, F-392, F-393, F-394, F-395, F-225).
Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and the skill's `references/compiler.md`, `interpreter.md` and `library.md`, plus searches of `records.md`, `tests-writing.md` and `gate.md` for terms. Nothing else.

## 1. F-34

**Established:** On commit `285efad802`, run over the one library, the code generator refuses no declaration in the fourteen components that the distance stage checks: 754 emitted, 0 refused, no component failing. The count can only be taken on a patched tree. Without the patch, the code generator stops `FortressLibrary`, `FortressBuiltin` and `FlatString` as whole components at the wrappers it generates for their helper classes (row 874). The patch is needed because a table in `NamingCzar.java:606-614` has no entries for the one library's seven number types. On the earlier commit `ba3c7c876d`, the script refused 1 of 754 (`__bigOperator2`, row 1076, since fixed by F-392). There, a real compile refused 2, because `String` stopped at two calls with a type assumption at one argument (row 818). On `285efad802`, a real compile of `String` without the patch is clean, and both calls reach the `(String, String)` body (F-325).

**Conditions:** Measured once on each commit, against the one library only, in the distance stage's setting (F-53). The script first patches a scratch worktree. It also edits `NN32`'s two getters, which now has no effect. It skips dispatch methods, so it never reaches calls such as `String`'s two (`Library/String.fss:67`, `:69`); a real compile covered those. A declaration is counted once, at its first wall, though some have a second wall behind it. The measure does not load or run any emitted class, so a class that is emitted and then fails at load goes unseen. No test checks the count, and the gate's distance stage does no code generation, so a regression would not be caught.

**Consequence:** A worker cannot read "0 refused" as "the one library compiles and runs". Without the patch, a real compile of `FortressLibrary`, `FortressBuiltin` and `FlatString` still stops at the helper wrappers, until `NamingCzar`'s table covers the seven number types. Nothing has loaded or run the emitted classes, and dispatch methods were not generated. So after the switch-over, the code generator is still work standing between the library and bytecode. To repeat the measure, run `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>` on a scratch worktree, not on a real tree.

**Evidence:** One run of the measure on each commit (`plan-34/probes/measure-285efad802.txt`, `plan-33/probes/measure-ba3c7c876d.txt`). The patch and the measure are in `plan-31/PROBES.md`, section 3, and the walls in `plan-34/probes/rehearsal.md`, section 3, item 1. Rows 874, 1076 and 818; F-53, F-325 and F-392.

**Could not resolve:**
- "the checker's failures caught per declaration" (unclear wording): this is a code-generation measure, yet the phrase names the checker. It can mean the checker's errors are caught per declaration so that code generation goes on for the rest, or that the code generator's failures are caught per declaration. The skill's distance stage carries on per checker step, not per declaration. F-53, which would settle it, is outside my context.
- "and the bound `Any`" (unclear wording, maybe a concept): which bound is `Any` is not said. It could be the bound of an unbounded type parameter (SKILL.md says it is `Any`, where the prelude's printing uses `Object`), or a static argument (compiler.md: "compiles with `Any` as the static argument").
- "the code generator's table of payload objects" (a concept I lack; not in the skill): what a payload object is, and what one row of the table maps.
- "the script's edit of `NN32`'s two getters changes nothing now" (unclear): why it now has no effect, and since which change. F-394 hints that `NN32`'s `zero` and `one` now answer their inherited types, but this entry does not link the two.
- "`String`'s real compile under the selector" (unclear wording): "the selector" is defined neither here nor in the skill. It might be `FORTRESS_LIBRARY=one`, which selects the library, or another tool or option.
- "The real compile refused 2, since `String` stopped at those two calls" (two readings): the 2 could be `__bigOperator2` plus `String`, or `String`'s two calls. It is also unclear whether a real compile counts declarations or components, since a real compile stops a component at its first wall.
- "The measure sees no class that is emitted and fails when it loads" (two readings): the measure cannot see such classes (a limit), or it found none (a result). The next sentence, that no emitted class is run, points to a limit.
- "after the switch-over the code generator still stands between the library and bytecode" (two readings): the code generator still blocks, since whole components stop without the patch, or it is only the remaining unverified step.

## 2. F-325

**Established:** The code generator compiles `e asif T` in four places:
1. At a dotted call's receiver, `(e asif T).m(args)`: the call runs the body that `T` gives `m`, as a static method of the trait's `DefaultTraitMethods` class, with `self` first. So an override in the object does not run.
2. At a call where every dispatched argument is an assumption: it calls the declaration that the checker resolved, directly, with no dispatch.
3. At a call of an overloaded function or operator of the component, where only some dispatched arguments are assumptions. The candidates are the declarations at or below the resolved one that take each assumed argument at its assumed type, minus any that the other arguments' static types exclude. The call dispatches among them on the other arguments' run-time types, as walk does. With one candidate it calls that declaration directly. Otherwise it uses the resolved declaration's dispatch method where that method covers the same set, or else a new dispatch method in a class `<component>$asif@<span>`.
4. Anywhere else, the assumption is the value at `T`.

Refused with 'Can't compile a dispatched call whose arguments are not all type assumptions':
- a partial call of a functional method;
- an assumption at an assumed receiver of an overloaded method, or at a dotted call's argument;
- a partial call whose own dispatch would include a functional method.

Refused with messages of their own: a generic declaration at or below the resolved one, a generic method on an assumed receiver, and an overloaded generic function.

Under walk, an assumption stays on a value bound from it (row 919), a tuple under an assumption cannot be taken apart (row 920), and a generic method on an assumed receiver stops (row 922). An overloaded method on an assumed receiver runs.

**Conditions:** Partial calls compile only for overloaded functions or operators "of its component". Functional methods and dotted methods are not covered, and a generic declaration among the candidates is refused. The three walk limits are walk's own defects and do not affect the compiled path.

**Consequence:** In compiled code, a worker may put an assumption at a receiver, at every dispatched argument, at some arguments of the component's own overloaded function or operator, or anywhere as a value. The refused forms must be avoided, or written as `XXX` tests (row 818's notes name each form's test). Under walk, a worker must not rely on a bound assumed value, on taking apart an assumed tuple, or on a generic method on an assumed receiver. This entry supersedes the list in `compiler.md`, "What the compiled path cannot compile yet", which still calls every partial call of an overloaded function refused.

**Evidence:** Source in `compiler/codegen/CodeGen.java` (`forAsIfExpr`, `assumedReceiverCall`, `assumedArgumentsCall`, `partiallyAssumedCall`) and `compiler/OverloadSet.java` (`membersUnderAssumptions`, `generateDispatchAmong`). Tests `compiler_tests/AsIfCallsCompiled`, `AsIfPartialCallCompiled`, `AsIfPartialDispatchCompiled`, `tests/AsIfCallsWalk` and `tests/AsIfOverloadedMethodWalk`. Reports `rung-partial-assumption/REPORT.md` and `rung-codegen-asif/REPORT.md`. Rows 818, 919, 920 and 922.

**Could not resolve:**
- "dispatched argument" (a concept I lack; compiler.md says "every argument"): which arguments count as dispatched is not said. It could be all of them (SKILL.md: dispatch is on every argument), only those at positions where the overloads' parameter types differ, or every argument except a dotted call's receiver.
- "an overloaded function or operator of its component" (two readings): declared in the component that holds the call, or also imported into it. I read the first. On that reading, the entry does not say which message refuses a partial call of an imported overloaded function.
- "that take each assumed argument at its assumed type" (two readings): the declaration's parameter type there equals `T`, or it is a supertype of `T`, so that it accepts a `T`.
- "the resolved declaration's dispatch method where that holds the same declarations" (unclear): compiler.md gives one dispatch method per overloaded name, so it is unclear what belongs to a single declaration. It could be the name's whole dispatch method, or one over the declarations at or below the resolved one.
- "a partial call of a functional method, at an assumed receiver of an overloaded method or at a dotted call's argument" (unclear wording): the commas allow one form (a partial call of a functional method, at one of those places) or three. "At an assumed receiver of an overloaded method" also seems to clash with the first sentence, which says a receiver assumption compiles. Perhaps the refusal covers only an overloaded method whose receiver is assumed and some argument is not.
- "the body that `T` gives `m` ... its trait's `DefaultTraitMethods` class" (limit not stated): nothing says what happens when `T` is an object, or when `T` gives `m` no body.
- "the assumption stays on a bound value (row 919)" (unclear wording): I read it as: after `x = e asif T`, later calls on `x` still dispatch as at `T`. That would be a defect, since the specification gives the assumption only to the call around it.

## 3. F-392

**Established:** When compiled code calls a generic method on a receiver whose static type is a type variable, the code generator casts the receiver to that variable's bound that declares or inherits the method, the most specific bound if several do. The call then runs the receiver object's own method, its override included. The bounds read include `where` clauses, also a `where` clause on a method without static parameters that bounds its trait's or object's parameter. A bound that is itself a type variable is not read, because the checker refuses such a call first (row 1093).

**Conditions:** Compiled path. Generic methods only, called on a receiver typed by a type variable whose bound is a type, not another variable.

**Consequence:** A worker can write such calls in compiled programs and in the library; this is what cleared `__bigOperator2` (F-34, row 1076). A call through a variable bounded by another type variable must not be expected to compile: the checker refuses it.

**Evidence:** Test `compiler_tests/TypeVariableReceiverGenericMethod`. Report `rung-type-variable-receiver/REPORT.md`, "What changed and why". Row 1093.

**Could not resolve:**
- "also one on a method without static parameters of its own that bounds its trait's or object's parameter" (unclear wording): "a method without static parameters" can be read as the method called, which contradicts "generic method" in the title, or as the method whose body makes the call. I read the second.
- "the most specific where several do" (limit not stated): nothing says what happens when two bounds declare the method and neither is more specific.
- "since the checker refuses the call first (row 1093)" (unclear): whether that refusal is right, or a defect that the row records and that may later be fixed. If it is fixed, the code generator's handling of a variable bound is unspecified.

## 4. F-393

**Established:** The code generator now scopes a local variable to the rest of its own block: `CodeGen.forLocalVarDecl` adds the bindings to the environment of the declaration's body only, after the initializer. So a closure or task written after an `if` arm, or after another nested block, no longer captures the JVM slot of a variable bound inside that block.

Before the fix, a later closure or task whose body used a name first bound in an arm captured the arm's slot. That held even when the closure bound the name itself, or when the name was a numeral coercion's parameter `r` (row 983). The slot was unset on any path that skipped the arm, so the class failed with 'VerifyError: Bad local variable type' (row 1078).

After the fix, in one run on the planner's rehearsal tree, which carries the rehearsal's hacks, `Hello` runs against the one library with the verifier on. ASM's verifier refused none of `FortressLibrary`'s 4,694 methods, and 2 methods in all, both in `RangeInternals` (row 1054). It skipped 1,092 template classes.

**Conditions:** The verification figures come from one run, on a tree with hacks rather than the base, and only `Hello` was run. Template classes, and so the generic code that runs through instantiations, were not verified.

**Consequence:** A worker can put closures and tasks after nested blocks in compiled code without this `VerifyError`. The verifier figures are not a gate result. `RangeInternals` still has 2 methods that fail verification, under row 1054 (compiler.md: an object's method overloaded at a pair and at another type).

**Evidence:** Source `compiler/codegen/CodeGen.java:4822-4828`. Test `compiler_tests/BlockBindingScopeCompiled`. Report `rung-label-local-verify/REPORT.md`, "The cause, by the bytecode" and "The repair in the scratch copy". Rows 983, 1078 and 1054. The figures come from one run.

**Could not resolve:**
- "the planner's rehearsal tree, which holds the rehearsal's hacks" (unclear; not in the skill): the entry does not say which tree this is, who or what "the planner" is, what the rehearsal is, or what its hacks change. Without that, the run can be neither judged nor repeated.
- "with the verifier on" (two readings): the JVM's bytecode verifier while `Hello` runs, or ASM's verifier, which the next sentence names. It is also unclear whether one run produced both results.
- "refuses none of `FortressLibrary`'s 4,694 methods, and 2 methods in all" (unclear wording): I read "in all" as across every component verified, but the entry does not say which components those were.
- "as a numeral's coercion parameter `r`" (partly a concept): I read it as the parameter, named `r`, of a `coerce` from a numeral. The skill does not say what that parameter is named, or where.

## 5. F-394

**Established:** The compiled checker checks a getter declared in a trait or object against the inherited getter it overrides, by the Return Type Rule, as for a pair of methods. The new getter's return type must be a subtype of the inherited one, or the message contains 'should be a subtype of the'. Each getter's receiver is read as the plain type that declares it, not as a self-typed intersection. So below a self-typed trait, a getter that narrows its return type compiles, and one that widens it is refused, also when its return type is inferred.

A dotted method redeclared the same way is still read with the intersection receiver, and is refused where it narrows (row 1094). Getters and dotted methods of an object expression are not checked (row 1097), but the code generator stops at 'Can't compile ObjectExpr' (row 375), so no compiled program reaches that gap.

No getter widens in the one library's fourteen distance-stage components: `NN32`'s `zero` and `one`, and thirteen other getters, return their inherited types. So the count and the distance stay 0. The library's other components still hold widening getters (row 1095).

**Conditions:** Getters of traits and objects, not object expressions, and only in pairs "at the same parameter types". Dotted methods redeclared below a self-typed trait keep the intersection reading.

**Consequence:** A worker must not widen a getter's return type in a trait or object, but may narrow it. In compiled code, a worker must not narrow the return type of a dotted method redeclared below a self-typed trait (row 1094). Components outside the fourteen still hold widening getters (row 1095), and these must be fixed before those components check clean.

**Evidence:** Tests `compiler_tests/XXXGetterReturnTypeNotSubtype` and `XXXInferredGetterReturnTypeNotSubtype`, which expect the refusal, and `compiler_tests/SelfTypedGetterNarrowedReturn`. Reports `rung-widening-getter/REPORT.md`, "What changed and why", and `rung-widening-getter/SKEPTIC.md`, "My programs, old code against new". Rows 1094, 1095, 1097 and 375; P-146 and P-157.

**Could not resolve:**
- "the getter that it keeps from being inherited" (unclear wording, resolvable): I read it as the inherited getter that this one overrides.
- "At the same parameter types, a pair of getters" (unclear): a getter has no parameters but its receiver, so I cannot tell what "the same parameter types" rules out. Perhaps a getter beside an inherited method of the same name that has parameters.
- "(P-146, P-157)" (unclear): compiler.md cites P-157 for the meet of static-parameter bounds in the exclusion test, so it is unclear what P-157 adds to reading a getter's receiver.
- "still reads the trait's receiver as the intersection and is refused where it narrows (row 1094)" (unclear): "still" suggests a defect to be fixed, but the entry does not say whether the refusal is wrong or is the rule. F-225 states it without judging it.

## 6. F-395

**Established:** Under walk, in the first pass over a component, walk applies the constructor of each native singleton as it binds it. That covers each singleton of a native component (`FlatString`, `Boolean`, `Char`, `NN32`, `RR32`, through `BuildNativeEnvironment.forObjectDecl1`) and each native number object of `FortressLibrary` (`ZZ32`, `ZZ64`, `ZZ`, `NN64`, `RR64`, through `BuildEnvironments.forObjectDecl1`). Applying the constructor registers it with the Java class of its values. This happens after the run resets the native constructors and before any top-level variable is initialised. So a value made before anything reads the object's name, such as a string that a native function returns, already has its type. No library line has to name a native object as a value to force the registration. `Library/FlatString.fss` has no `ignore(FlatString)`, and so holds no site for the compiled path's refusal of a number type named as a value (row 1082). The constructor objects `ReflectCollection()` and `ReflectMethod()` still register only when called, and `Library/Reflect.fss:365-367` calls them.

**Conditions:** Walk only. It covers the singletons of native components and the five native number objects of `FortressLibrary`, not objects with a parameter list, even an empty one like the two `Reflect` objects, which register only when called.

**Consequence:** A worker must not add a line like `ignore(FlatString)` to force registration. Walk does not need one, and on the compiled path such a line would meet the row 1082 refusal. A native object with a parameter list registers only when called, so call it before its values are needed, as `Reflect.fss` does.

**Evidence:** Source `BuildNativeEnvironment.java:161-163` and `BuildEnvironments.java:531-533`. Test `ProjectFortress/tests/NativeStringsReadyAtLoadWalk.fss`. Report `rung-flatstring-name/REPORT.md`, "1. What changed and why". Row 1082.

**Could not resolve:**
- "native singleton", "native component", "registers a native singleton's constructor with its values' class" (concepts I lack): interpreter.md, "Natives", covers `builtinPrimitive` bindings, not native components or the registration of constructors. So what makes a component native, and what the registration is for (presumably so that walk can give a Java value its Fortress object type), I take from the entry alone.
- "each singleton of a native component, `FlatString`, `Boolean`, `Char`, `NN32` and `RR32`" (two readings): the five names can be the native components or the singletons in them. F-34 names `FlatString` as a component, which suggests both.
- "so no line of a library names a native object as a value for walk" (two readings): no line needs to, or, as a fact, none does. The `FlatString.fss` sentence supports both.
- "the compiled path's refusal of a number type named as a value (row 1082) has no site there" (unclear): `FlatString` is not among the number types that compiler.md gives for row 1082 (`ZZ32` and the like). The entry does not say why `ignore(FlatString)` would meet a refusal of number types; perhaps the refusal covers every native object.
- "The constructor objects" (concept not in the skill): I read it as objects declared with a parameter list, here an empty one, as opposed to singletons.

## 7. F-225

**Established:** A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]` (its F-bound). In such a trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` inside method bodies as `C[\X\] & X`, the trait met with the implementing type. In the methods' signatures, `self` stays the plain `C[\X\]`, with two exceptions:
- the overloading check's exclusion test (F-277);
- the Return Type check of a dotted method that an object redeclares at the same parameter types. There `self` is the intersection, so a narrower return type is refused (row 1094). A getter redeclared the same way reads the plain type and compiles (F-394).

The checker refuses an extender at another type: `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. It also accepts a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are; this is a default of the coordinator's. Where the `comprises` clause lists types, `self` is instead the trait met with the union of those types, and the exclusion test reads the signatures plain.

The rule builds P-146. It accepts every self-typed body of the library except `Integral`'s `numerator`, which each integer type declares instead. Walk has no such rule, and loads what the checker refuses. On the compiled path:
- A default body that returns `self` at the self-type parameter runs, also where the parameter is an object type (row 695, fixed). F-377 gives the cast, also at a conditional's arm and a closure's result (rows 1051 and 1050).
- A default body that calls a method on a value of the self-type parameter runs, also where the object lists the trait first (row 1052, fixed). F-385 gives how, and a generic object for which this may not hold.
- The rule rightly refuses the team's `PureList`'s `List` (row 355).

The compiler's prelude writes the self type as `comprises T` on `StandardTotalOrder` and `Equality`. That spelling does not bind the one library: Naden's last text puts the self-type idiom only in bounds, not as a first-class type. Steele's message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound instead.

**Conditions:** The compiled checker only; walk does not apply the rule. The intersection typing applies to traits with no `comprises` clause or only `...`. A `comprises` clause that lists types uses the union instead. `Integral`'s `numerator`, the generic object of F-385, and row 1094's dotted methods are the stated limits.

**Consequence:**
- A worker must make each extender of `C[\X\]` an `X`. interpreter.md says the same for walk, which does not enforce it.
- A worker must not narrow the return type of a dotted method redeclared below a self-typed trait, but may narrow a getter's.
- In the one library, a worker should write the self type as an F-bound, not as the prelude's `comprises T`.
- A worker should give `Integral` no default `numerator`.
- Before relying, in a generic object, on a default body that calls a method of the self-type parameter, a worker must read F-385.

**Evidence:** Tests `compiler_tests/SelfType*` and `XXXSelfType*`. Reports `rung-self-type/REPORT.md`, sections 1, 2, 4 and 7, and `rung-self-type-exclusion/REPORT.md`, section 1. Sources `Library/CompilerAlgebra.fsi:16`, `:24`, `Papers/Types/journal/justificationOfRTR.tex:626-630` and the message of commit `655e65d53`. Rows 1094, 695, 1051, 1050, 1052 and 355; P-146; F-277, F-377, F-385 and F-394.

**Could not resolve:**
- "or one that lists only `...`" (a concept I lack; not in the skill): what `...` means in a `comprises` clause. I take it to be an open list, one that lets other types extend the trait.
- "the checker refuses an extender at another type" (unclear wording, resolved by the example): I read "at another type" as with a static argument that the extender itself is not.
- "The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter" (unclear wording): "takes" could mean that the checker accepts such a declaration, or that it treats that parameter as the self type and gives `self` the meet with it. Which "trait" is which is also unclear. I read it as: `D[\Y extends C[\Y\]\] extends C[\Y\]` is treated as self-typed in `Y`.
- "a default of the coordinator's" (unclear): the skill does not define the coordinator for a worker. It is unclear whether this default carries the weight of a curator's decision, or whether a worker who meets evidence against it may treat it as open.
- "F-385 gives how, and the generic object for which it may not hold" (not self-contained): the limit lives in another entry, and this one does not say which generic object, or which shape of object, it may fail for.
- "that spelling does not bind the one library" (two readings): "bind" as in "oblige", meaning the prelude is no precedent, or as in name binding. I read the first.
- "in the Return Type check of a dotted method redeclared below the trait (row 1094)" (unclear): the entry does not say whether reading `self` as the intersection here is meant or is the defect that row 1094 records. F-394's "still" suggests a defect.
