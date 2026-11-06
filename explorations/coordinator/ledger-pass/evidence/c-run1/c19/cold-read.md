# Cold read: c19 (rows 565, 594, 724, 539, 550, 723, 744, 760, 779, 780)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its references `records.md`, `interpreter.md`, `tests-writing.md`, `build-and-caches.md`, `compiler.md` (by grep).

Terms common to every row, said once here:
- `NEGATIVE-VERIFIED`: `records.md` lists it among seven status words but says the row template defines each, and the template is in the ledger, which I may not read. I read it as "the defect is confirmed and open" (it is not one of the three closing words). The skill alone does not define it: a lacking definition, not unclear wording.
- "full text: history, row N": read as "the earlier text of this row is in `explorations/fortress-gap-ledger-history.md`" (`records.md`). Clear once looked up.
- "siblings: N, M": read as related ledger rows; the row does not say how each relates. Unclear wording, minor.
- "Found by: climb batch N rung X('s skeptic)": provenance only; "climb", "rung", "skeptic" are not defined in the skill. Not needed to act.
- `F-NNN` cites a FACTS entry, printable with `facts-extract.sh 'F-NNN'` (`records.md`). Clear.

## Row 565
- **Defect:** compiling a generic trait whose functional method has static parameters of its own, overridden in a generic subtrait or in an object that extends an instance of the trait, makes the code generator emit the same wrapper class twice; the jar write fails with `ZipException: duplicate entry: ...$gen...`.
- **Where:** compiled path only (walk runs both shapes, row 567); `CodeGen.functionalMethodWrapper`, which names the wrapper via `NamingCzar.genericMethodName`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3212` at c124c6b65.
- **Reproduce:** run `ProjectFortress/compiler_tests/XXXGenericTraitFunctionalMethodOverride.test` through the harness (green = expected failure); or compile a program of `Gen[\E\]`, `Cond[\E\] extends Gen[\E\]` both declaring `gen[...](self, x: E, f: E -> ...)`, and an object extending `Cond[\ZZ32\]`. Second shape: `Holder[\E\]` abstract `conv[\R\](self, ...)` overridden in `object Hstr extends Holder[\String\]` (probe `SkFnMeth`, `explorations/compile-ladder/rung-walk-instance/SKEPTIC.md` section 4).
- **Status:** open, confirmed: build a fix in the code generator's wrapper naming, then promote the `XXX` test.
- **Could not resolve:** "in an object of an instance" (claim): I read "an object that extends an instance of the generic trait", but the phrase is garbled (unclear wording). `gen[...]` elides the static parameters, so the exact program must come from the test file. "Not row 315": says this is not row 315's defect, but not what 315 is or why a reader would confuse them (unclear wording). Probe `SkFnMeth`: a program name, found only through the cited SKEPTIC.md, which a worker may read but the row does not say whether the probe file exists in the tree.

## Row 594
- **Defect:** compiled, a generic functional method whose `self` is not its first parameter links but dies at run time with `NoSuchMethodError` on a mangled method name; with `self` first it runs.
- **Where:** compiled path only (walk runs it); not located; first suspect `CodeGen.functionalMethodWrapper`, which names the method by its self index (`CodeGen.java:3212` at c124c6b65, shared with row 565).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXGenericFunctionalMethodSelfSecond.test`; or `trait Shape` with `tag[\R extends Any\](x: R, self): R = x`, `object Ci extends Shape end`, call `tag("t", Ci)`: the run dies with the quoted `NoSuchMethodError` (probe `SkFnMethPlain`, same SKEPTIC.md section 4). `build-and-caches.md` confirms such an error on one's own mangled name is a compiled-path defect.
- **Status:** open, confirmed: locate, then fix; the row says where to start.
- **Could not resolve:** whether the reproducer is a run-time pair (`tests-writing.md` says a run-time defect needs a plain `...Link.test` beside the `XXX` one); the row names only the `XXX` file (unclear, minor). Otherwise clear.

## Row 724
- **Defect:** in an object, a functional method with its own static parameter overloaded beside a plain functional method of the same name: the checker accepts, then the code generator crashes with `ClassCastException: FunctionalMethod cannot be cast to Method` in `OverloadSet.getFunctionToCall`. Same when the pair is in a trait an object extends.
- **Where:** compiled path, code generator: `OverloadSet$ForTraitOrObject.getFunctionToCall` casts any member with static parameters to `Method`, as if the overload set were of dotted methods (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2574-2578` at c124c6b65), reached from `CodeGen.forObjectDeclPrePass` (`CodeGen.java:4375`) via `generateTopLevelOverloads` (`:4666`, declared `:6897`). Walk stops earlier, at load (row 723).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXGenericFunctionalMethodBesidePlain.test` (a compile-time wall, so one `XXX` compile test suffices).
- **Status:** open, confirmed: fix the cast in `OverloadSet` (handle `FunctionalMethod`).
- **Could not resolve:** the Specification cell reads `advanced/overloading.tex` without the `Specification/` prefix the other rows use (inconsistent wording, resolvable). "The same in a trait that an object extends." is a fragment: I read "the same crash", but it could mean "the same pair" with an unstated result (unclear wording). No program is spelled out in the row; the claim's shape is clear enough to write one.

## Row 539
- **Defect:** walk refuses at load a valid overload set from the POPL 2019 paper: `m[\P\](x: ArraySeq[\P\])`, `m[\Q extends Num\](y: Seq[\Q\])`, `m[\R extends Num\](z: ArraySeq[\R\])`. It refuses the first two as "fails the Meet Rule", though the third declaration covers their overlap. The other two pairs load (F-252).
- **Where:** walk only (compiled: row 537); `OverloadedFunction.java` under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/`: `matchApart` (`:1374`), called from `genericMeetCovered` (`:1251`), only matches positions that are equal types, a static parameter, or instances of the same generic type, and reads no supertype; so `ArraySeq[\P\]` vs `Seq[\Q\]` finds no meet, and `domainsExcludeTogether` (`:1006`) finds no exclusion. All at c124c6b65. `interpreter.md` lists this departure ("overlap ... only through an instance of a supertype").
- **Reproduce:** `ProjectFortress/tests/XXXOverloadExistentialMeetWalk.fss` under walk; it is refused at load with "fails the Meet Rule".
- **Status:** open, confirmed: fix `matchApart` to read supertypes when seeking the covering third declaration. Appendix I's entry "Overloading with static parameters" names the departure, so a fix also touches that entry.
- **Could not resolve:** "an array list and a list" (claim) does not match `ArraySeq` / `Seq` by name; I read ArraySeq = array-backed sequence, Seq = sequence (unclear wording, minor). "Existential" in the test's name: not explained (language concept from the paper, not in the skill). "Compiled: row 537" does not say whether the compiled path accepts or refuses (unclear wording). "Appendix I's ... names it": I read it as "Appendix I records this departure"; whether a fix must rewrite that entry is not said.

## Row 550
- **Defect:** walk refuses at load, "fails the Return Type Rule", a plain declaration whose domain lies inside a generic one returning its type parameter: `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64`. The rule holds at every instance (any instance whose domain holds two `ZZ64` has `T` at or above `ZZ64`), so the set is valid.
- **Where:** walk only; `validOnDeclaredDomains` (`OverloadedFunction.java:772` at c124c6b65) compares the plain range with the generic range with `T` standing for itself, and `ZZ64` is not below `T`. For two generics walk already checks per instance (`returnRuleAtEveryInstance`, `:1165`), the model for a fix.
- **Reproduce:** `ProjectFortress/tests/XXXGenericBesidePlainReturnParam.fss` under walk. Guard: `ProjectFortress/tests/XXXGenericBesidePlainReturnRule.fss`, an invalid pair, must stay refused.
- **Status:** open, confirmed: build a fix that checks the generic-beside-plain pair at the instances holding the plain domain, as for two generics.
- **Could not resolve:** the guard test is named `XXX...` yet the row says walk refuses it soundly; under `tests-writing.md` an `XXX` test is an expected failure, so either walk's refusal is the failure (the test asserts it should load?) or it carries a `.test` refusal key. Two readings; I cannot tell whether that program is valid or invalid by the specification (unclear wording). "a plain declaration inside a generic one": "inside" = domain contained; resolvable from `interpreter.md`'s use but not defined.

## Row 723
- **Defect:** under walk, an object that overloads a functional method with its own static parameter, `g[\T extends Ping\](self, x: T)`, beside a plain `g(self, x: Pong)`, stops at load with "Missing type T". Alone, the generic method loads and runs. In a trait that an object extends, it stops instead with "InterpreterBug ... This should have been an environment with a Top Level".
- **Where:** walk; `GenericMethod.finishInitializing` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java:149`, TODO at `:144-145`, at c124c6b65) reads the parameter types in an environment lacking the method's own static parameters; called from `OverloadedFunction.finishInitializingFirstPart` (`:163`) only when the name is overloaded. Compiled: row 724. Dotted version: row 760 (same site).
- **Reproduce:** `ProjectFortress/tests/XXXGenericFunctionalMethodBesidePlainWalk.fss` under walk.
- **Status:** open, confirmed: fix `finishInitializing` to bind the method's static parameters (the TODO marks the spot); likely fixes 760 too.
- **Could not resolve:** "`Ping` and `Pong` objects": the relation between them is not given; the overload makes sense only if they relate (e.g. `Pong` extends `Ping`) or exclude, and which one changes what a fixed walk must then accept (unclear wording). Whether the trait-form "InterpreterBug" needs the same fix or a second one is not said.

## Row 744
- **Defect:** under walk, a dotted call that writes explicit static arguments, on a method name the receiver overloads, stops with "Don't actually resolve overloading of generic methods yet.": `Sm[\ZZ32\].distribute[\Lifted[\ZZ32\]\](Mx[\ZZ32\])`, where `distribute[\K\]` is inherited and a plain `distribute(r: Mx[\T\])` sits beside it. One declaration of the name runs, and the same call without static arguments runs. It also hits the library's generic `distribute` (`2b1cd8e63`): `SumReduction[\ZZ32\].distribute[\Maybe[\ZZ32\]\](MaxReduction[\ZZ32\])`.
- **Where:** walk; `DottedMethodApplication.typeApply` refuses any `OverloadedMethod` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:130` at c124c6b65). A team limit: they met it in 2009 (`Library/Generator2.fss:75-76`), and the team's tree stops the same way.
- **Reproduce:** no reproducer; program and output in `explorations/perf-probes/generic-distribute/REPORT.md` sections 3, 5, 7, or the library call above.
- **Status:** open, confirmed: build a fix (resolve overloading among generic methods in `typeApply`); a fix should first write the reproducer test, since none exists.
- **Could not resolve:** "Compiled, the call runs the plain method": with an explicit `[\Lifted[\ZZ32\]\]` the generic one seems the one named, so this reads as either "compiled works" or a second, compiled defect (wrong declaration chosen); two readings (unclear wording). `Sm`, `Mx`, `Lifted` are not defined in the row (only in the report). `MethodStaticArgOverloadedReceiver`: read as a test name, folder not given. "stops so" / "stops so too": read as "stops with the same message" (wording). Spec cell `basic/overloading.tex` lacks the `Specification/` prefix.

## Row 760
- **Defect:** under walk, an object declaring a generic dotted method beside a plain one of the same name, `genericFirst[\T extends Shape\](x: T)` and `genericFirst(x: Circle)` in `object Describer`, stops at load with "Missing type T". Declared in a trait an object extends: "InterpreterBug ... This should have been an environment with a Top Level". One inherited plus one the object's own loads and runs (`MethodStaticArgDeclaredDomain`).
- **Where:** walk only (the compiled path passes the test); same site as row 723: `GenericMethod.finishInitializing` (`GenericMethod.java:149` at c124c6b65), via `OverloadedFunction.finishInitializingFirstPart` (`:163`).
- **Reproduce:** `ProjectFortress/tests/XXXDispatchGenericMethodBesidePlain.fss` under walk.
- **Status:** open, confirmed: fix with row 723 (one fix site).
- **Could not resolve:** `Shape`/`Circle` relation assumed (`Circle` extends `Shape`), not stated. `MethodStaticArgDeclaredDomain`: a test name, folder not given. "The compiled path runs the test: PASS": read as the same program passing compiled. Clear otherwise.

## Row 779
- **Defect:** under walk, two generic functional methods of a trait or object without static parameters, with one declared domain inside the other, `which[\T extends Shape\](self, x: T)` beside `which[\U extends Round\](self, x: U)`, are refused at load, "fails the Meet Rule"; as top-level functions the same pair loads. Same if `T` is unbounded. In a generic trait the pair loads but a call fails (row 780).
- **Where:** walk; `genericPairValid` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:960` at c124c6b65), whose `instanceHolding` (`:2573`, called `:967-968`) finds neither domain inside the other; not traced further. `interpreter.md` lists the departure. Compiled: stops at compile with row 724's `ClassCastException`.
- **Reproduce:** `ProjectFortress/tests/XXXGenericFunctionalMethodsNestedWalk.fss` under walk.
- **Status:** open, confirmed: investigate why `instanceHolding` fails on functional methods (but not top-level functions), then fix.
- **Could not resolve:** "The two are own generics": I read "both have static parameters of their own" (unclear wording). "The same declared in an object": read as "the same refusal when declared in an object" though the claim already says "trait or object" (redundant, minor). Relation `Round` / `Shape` assumed (`Round` extends `Shape`). Sibling 765 unexplained.

## Row 780
- **Defect:** under walk, the same nested pair as row 779 in a generic trait `trait Holds[\S\]` loads, but a call on a `Circle` fails "Cannot find definition for method", naming the declaration over `T` and the receiver `H[\ZZ32\]`. Either declaration alone runs (with `U`'s removed, the call gives "shape"). The team's base shows it too.
- **Where:** walk; walk compares a generic trait's functional methods at each call on the call's instance (F-26; `interpreter.md` says so); the site is not traced. Compiled: row 724's `ClassCastException` at compile.
- **Reproduce:** `ProjectFortress/tests/XXXGenericTraitFunctionalMethodsNestedWalk.fss` under walk.
- **Status:** open, confirmed: trace the call-time comparison, then fix.
- **Could not resolve:** receiver named `H[\ZZ32\]` while the trait is `Holds[\S\]`: the same type abbreviated, or a different object extending `Holds[\ZZ32\]`? (unclear wording). The expected output with both declarations (presumably the `U` one, "round"?) is not stated. "The same on the base db8fecd22": read as "the defect also shows at commit db8fecd22", but what that commit is (the team's tree? an earlier revival base?) is not said (unclear wording).
