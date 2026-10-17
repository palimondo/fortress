# Rung W (climb batch 17): record lines

## FACTS entry

**Under walk, a dotted call that writes no static argument infers a generic method's own static arguments, and the method is chosen on its declared domain.** Walk takes the instance from the arguments' run-time types, as at a call of a generic function, whether the method is alone under its name or among its receiver's overloads. Against another method of the set it is compared on its declared domain where exactly one of the two declared domains lies inside the other, as an own generic is. Rung L's generic `distribute` then runs the nested reductions under walk (F-248). Gated by `tests/MethodStaticArgInference.fss`, `MethodStaticArgOverloadedReceiver.fss`, `MethodStaticArgDeclaredDomain.fss` and `NestedReductionFusion.fss`. Detail: `compile-ladder/rung-walk-method-sargs/REPORT.md` sections 1 and 2.

Corrections to existing entries:
- F-248: its stop of a nested reduction holds only without this change. On the merged tree with rung L's library, `NestedReductionFusion`'s SUM of SUMs over `inits` is 11 under walk.
- F-26: "A generic trait's functional method and a generic dotted method are still compared by their instances." now holds of the functional method only. A generic dotted method is compared on its declared domain where exactly one of the two declared domains lies inside the other (`MethodStaticArgDeclaredDomain`).

## Ledger: close

- Row 21: close with the commit of this change (74c928e7e on `wip/rung-walk-method-sargs`, its landed hash after the gather) and the test `MethodStaticArgInference`. Its notes' cases have homes of their own: the expected type is row 510; a generic method beside a plain one is NEW-W-1; `bool` is rows 307 and NEW-W-2; sizes, mixed widths and the nested reductions of `Generator2.fss:73` run.

## Ledger: notes

- Row 744 (266 characters of room): "With climb batch 17 rung W, the call that writes no static argument to such a receiver infers the generic's (`MethodStaticArgOverloadedReceiver`); the written form still stops in `typeApply`."
- Row 567 (804 of room): "The dotted sibling, a trait's generic dotted method bounded by the trait's parameter, is NEW-W-3 (climb batch 17 rung W)."
- Row 510 (9 of room, cannot take it; for RECORD.md): "The method form, `a: BoxT[\ZZ64\] = Fac.mk()` for `mk[\T\](): BoxT[\T\]` in an object, takes `T`'s bound, `BoxT[\Any\]`, and is refused (`XXXExpectedTypeFixRungT`, re-cited from row 21 by climb batch 17 rung W)."
- Row 364 (11 of room, cannot take it): "A generic dotted method's lone `T` too: `O.wrap(z)` for `wrap[\T\](x: T): Box[\T\]` and `z: ZZ32` gives `Box[\Int\]` (climb batch 17 rung W)."
- Row 723 (15 of room, cannot take it): "The dotted sibling is NEW-W-1."
- Row 307 (6 of room, cannot take it): "Walk's method form stops at load, NEW-W-2; the compiled path's written forms stop, NEW-W-4 and NEW-W-5."

## Ledger: new rows

Section "4. Operators and overloading under walk":

| NEW-W-1 | under walk, an object that declares a generic dotted method beside a plain one of the same name stops at load, 'Missing type T': `genericFirst[\T extends Shape\](x: T)` beside `genericFirst(x: Circle)` in `object Describer` | NEGATIVE-VERIFIED | implementation gap (walk) | `advanced/overloading.tex`, "Declarations with Static Parameters" | `ProjectFortress/tests/XXXDispatchGenericMethodBesidePlain.fss` | climb batch 7b rung W | siblings: 21, 723. `GenericMethod.finishInitializing` reads the parameter types in an environment without the method's own static parameters (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java:137` at 3aea3da53), reached from `OverloadedFunction.finishInitializingFirstPart` (`:161`) when the name is overloaded. Declared in a trait that an object extends, the pair stops with 'InterpreterBug ... This should have been an environment with a Top Level'. One inherited and one the object's own loads and runs (`MethodStaticArgDeclaredDomain`). The compiled path runs the test: PASS. |

Section "2. Types: generics, static parameters, inference and coercion":

| NEW-W-2 | under walk, an object or trait whose method has a parameter type with a `bool` static argument stops at load, 'subtypeCompareTo(BoolArg, BoolArg) is not implemented': `unflag[\bool b\](f: Flag[\b\])` or `unflagTrue(f: Flag[\true\])` in `object O`, for `object Flag[\bool b\](v: ZZ32)` | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/trait-parameters.tex`, "Bool Parameters" | `ProjectFortress/tests/XXXBoolStaticArgMethod.fss` | walk-generic-static probe | siblings: 307, NEW-W-4, NEW-W-5. `NodeComparator.subtypeCompareTo(StaticArg, StaticArg)` has its `BoolArg` case commented out (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeComparator.java:410-428` at 3aea3da53), reached when `FTraitOrObjectOrGeneric.initializeFunctionalMethods` sorts the declarations (`:78`). A top-level function or a field of such a type runs, and so does a method's own `bool` parameter that no parameter type mentions. The compiled path stops otherwise (NEW-W-4, NEW-W-5). |

| NEW-W-5 | the compiled checker stops on a method's own `bool` static parameter written at the call, 'ClassCastException: TraitType cannot be cast to BoolExpr': `O.unflag[\true\](Flag[\true\](7))` for `unflag[\bool b\](f: Flag[\b\])` in `object O` | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/trait-parameters.tex`, "Bool Parameters" | `ProjectFortress/compiler_tests/XXXBoolStaticArgMethodWritten.test` | climb batch 17 rung W | siblings: 307, NEW-W-4. `FnNameInfo.normalizedSchema` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java:190-206` at 3aea3da53), called from `Functionals.checkExprFunctionals` (`scala_src/typechecker/impls/Functionals.scala:1094`), replaces each static parameter by `boundsFor`, a type argument for a `bool` parameter (`:168-182`, F-36), so the `BoolRef` `b` in `Flag[\b\]` becomes a `TraitType` (`StaticTypeReplacer.java:121-131`). A generic function's written `[\true\]` passes the checker (NEW-W-4). |

Section "3. Traits, objects and components":

| NEW-W-3 | under walk, an object that extends a generic trait whose dotted method has a static parameter of its own bounded by the trait's stops, 'Missing type R': `pick[\K extends R\](x: K)` in `trait Picker[\R\]`, `object ShapePicker extends Picker[\Shape\]` | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/traits.tex`, "Method Declarations" | `ProjectFortress/tests/XXXTraitBoundGenericMethod.fss` | walk-generic-static probe | siblings: 567, 21. `Constructor.finishInitializing` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:216` at 3aea3da53) makes the method's symbolic instance by `SingleFcn.createSymbolicInstantiation` (`SingleFcn.java:215`), which evaluates the bound `R` without the trait's static parameters: at load for an object, at its first instance for a generic object. A bound that names no trait parameter, `N extends Number`, loads and runs. The dotted sibling of row 567, fixed for functional methods by 669b77d03. The compiled path runs the test: PASS. |

Section "12. The compiled path: constructs, crashes and the switch-over":

| NEW-W-4 | on the compiled path, a value whose type has a `bool` static argument does not run: `unflagTrue(Flag[\true\](8))`, for `unflagTrue(f: Flag[\true\])` and `object Flag[\bool b\](v: ZZ32)`, compiles and stops at run time, 'NoClassDefFoundError: true$RTTIc' | NEGATIVE-VERIFIED | implementation gap (codegen) | `basic/trait-parameters.tex`, "Bool Parameters" | `ProjectFortress/compiler_tests/XXXBoolStaticArgRun.test` | climb batch 17 rung W | siblings: 406, NEW-W-2, NEW-W-5. The instance `Flag[\true\]` names `true` as a class, where a size takes its descriptor from `RTTIsize.of` (F-129); the code generator gives a `bool` static parameter a type argument (F-36). The same in a method's parameter type and at a generic function's written `[\true\]`, `unflagF[\true\](Flag[\true\](7))`. Not traced further. Walk runs the test's program. |

Each row was linted with `python3 explorations/coordinator/tools/ledger.py check --rows FILE` with a number in place of the placeholder: "1 rows, 0 fail the template".

## Handover line

Climb batch 17 rung W: walk infers a generic dotted method's own static arguments, alone or among its receiver's overloads, and compares it on its declared domain (row 21; the probe's fd7056abf with a declared-domain comparison added). It lands only with rung L, whose library it unblocks under walk; `NestedReductionFusion` guards the pair. Five rows filed, NEW-W-1 to NEW-W-5, each with an expected failure. testSystem 637 tests, 0 failures; testSpecData 130, 0 failures; no stage run, since no path either stage reads moved.

## Revival change

**The change.** The team's walk applied a generic method's symbolic instance when a dotted call wrote no static argument (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:166` at a874948ac, `return cl.applyMethod(self, args);`), so such a call failed, and an overloaded method set never chose the generic method. The team's library says so: "without explicit static type parameter, distribute[\L\](r : ActualReduction[\R, L\]) is not dispatched to distribute(SomeReduction) when distribute is not overloaded for the SomeReduction" (`Library/Generator2.fss:81`). The tree now infers the method's own static arguments from the arguments' run-time types, as walk does at a generic function's call, alone under its name or among the receiver's overloads, and chooses such a method against the set's other methods on its declared domain. Tests: `ProjectFortress/tests/MethodStaticArgInference.fss`, `MethodStaticArgOverloadedReceiver.fss`, `MethodStaticArgDeclaredDomain.fss`, `MethodStaticArgCases.fss`. Reason: the specification says "most method invocations do not include them; the static arguments are statically inferred from the context of the method invocation" (`Specification-1.0-frozen/basic/expressions/method-invocation.tex:49-52`), and chooses a declaration on the parameter types it declares (`Specification/basic/inference.tex:47-75`). The measured failure on the base: 'Unification error: Closure/Constructor for get param 1 (b:Box[\T@...\]) got arg Box[\ZZ32\] of type Box[\ZZ32\]', and 'Failed to find any matching overload, args = (Sm[\ZZ32\])' beside a plain overload.

**Provenance.** Ledger row 21; P-45 (walk dispatches on declared domains and infers a generic declaration's static arguments at dispatch); the curator's word of 12:38 UTC on 2026-10-17, item 57's way (a), row 21 repaired in walk before rung L's library; the probe `explorations/perf-probes/walk-generic-static/REPORT.md` and its commit fd7056abf; climb batch 17, rung W.
