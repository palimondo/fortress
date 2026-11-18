# Cold read: record-landing/clean.txt

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its references (not `revival-changes.md`, not `sources.md`). Entries cited by number that the file does not hold (F-53, F-381, F-45, F-58, F-255, F-290, F-293, F-341, F-384, P-12, P-17, P-37, P-59, P-160, P-164, P-167) were not readable; where an entry leans on one, that is noted. "Row N" is read as gap-ledger row N (`records.md`); a row's content is known only from what the entries say of it.

## F-34

- **Established:** On commit `ba3c7c876d`, with the code generator run over the fourteen components that the distance stage checks, against the interpreter's (one) library, the code generator refuses exactly 1 declaration that the checker passes, emits 753, and no component fails whole. The one refused is `FortressLibrary`'s `__bigOperator2`, a generic method called on a receiver whose type is a type variable (row 1076). Earlier codes: `d3747846c1` had 13 refused (4 kinds) and 745 emitted, the 12 others being varargs (row 624) and a closure class written twice (row 315), both now fixed; `c3b16ef2d1` had 17 refused (5 kinds), 742 emitted.
- **Conditions:** Only on a patched scratch worktree: unpatched, the code generator stops `FortressLibrary`, `FortressBuiltin` and `FlatString` whole at the wrappers of their helper classes (row 874). Taken in the distance stage's setting (F-53). A declaration counts once, at its first wall. Dispatch methods are not counted; a class that emits but fails when it loads is not seen; nothing emitted is run. Measured once per code.
- **Consequence:** A clean checker is not enough: after the switch-over the code generator is still a barrier between the library and bytecode, now at one known declaration (plus row 874 unpatched, plus whatever fails at load). No test or gate stage watches this count, so a worker who changes the code generator must rerun the script to know the number.
- **Evidence:** One run per code of `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`; the patch in `compile-ladder/plan-31/PROBES.md`; the per-code outputs `measure-ba3c7c876d.txt`, `measure-d3747846c1.txt`, `measure-c3b16ef2d1.txt`.
- **Could not resolve:**
  - "the bound `Any`" in the setting: which bound, set where, on what (type parameters without a bound? the static argument of a generic supertrait?). Unclear wording; F-53 not readable.
  - "the checker's failures caught per declaration": read as "a checker failure stops only its declaration, not the component", but this is a guess.
  - "13 in 4 kinds": only three kinds are named (varargs, closure written twice, and `__bigOperator2`'s). Either the fourth kind is unnamed or kinds count second walls too ("some hold a second"). Unclear wording.
  - The totals differ between codes (1+753=754, 13+745=758, 17+742=759) with no reason given (library changed? declarations counted differently?). Unclear.
  - "wrappers of their helper classes": partly resolved by `compiler.md`, "Natives" (the wrapper generator); what fails in row 874's terms here is not said.
  - Whether `ba3c7c876d` is the current base or already behind `main`: not stated.

## F-86

- **Established:** The compiled checker gives a varargs parameter the type `ImmutableArray[\T, ZZ32\]` (the original team's type) and resolves calls to a varargs declaration by the specification's expansion rule: the declaration acts as one declaration per possible argument count. Under the interpreter's library a body can use the parameter as that array. Under the compiler's prelude, which has no `ImmutableArray`, the checker refuses each use of such a parameter (row 604) and the code generator refuses a varargs declaration with a message naming the missing type; under the one-library selection the code generator compiles it (F-390).
- **Conditions:** The array typing works only where the library in use declares `ImmutableArray` (the one library); with the prelude, the checker refuses uses and the code generator refuses declarations.
- **Consequence:** A compiled test against the prelude must not use a varargs parameter's value; one that does is an `XXXVarargs*` refusal. Varargs code that needs to compile belongs under `FORTRESS_LIBRARY=one`.
- **Evidence:** `compiler_tests/Varargs*` (the typing and expansion) and `compiler_tests/XXXVarargs*` (the refusals); `compile-ladder/rung-checker-defects/REPORT.md` section 4; `Specification/basic/overloading.tex`, "Applicability for Functionals with Varargs and Keyword Parameters".
- **Could not resolve:**
  - The second static argument `ZZ32` of `ImmutableArray[\T, ZZ32\]`: read as the index type, but the skill does not say. Language concept I lack.
  - "refuses each use of such a parameter": does a declaration whose body never uses the parameter pass the checker under the prelude? Can be read two ways.
  - What `compiler_tests/Varargs*` actually exercise, given that under the prelude the checker refuses uses and the code generator refuses the declaration (checker-only tests? calls of declarations that ignore the parameter?). Unclear.
  - The refusal's message: here it "names the missing type"; F-320 gives 'Can't compile VarArgs yet' for a varargs local function. Whether these are two messages or one is not clear.

## F-128

- **Established:** Walk applies coercions at three kinds of type check: binding a parameter (varargs parameters included); an overloaded call that no declaration fits without coercion, after which walk dispatches again on the coerced values; and a typed binding or assignment. Walk picks the coercion from the run-time value (P-59). Walk does not coerce, as measured: a non-numeral value at a declared return type (row 387; a numeral is converted there, F-341); through a `coerce` that has static parameters of its own, unless it is a numeral coercion (row 513); at an overloaded function's tuple parameter or a tuple-typed field (row 395); a function argument through the arrow coercion, where the call fails with 'Unification error' (row 1083). The compiled path does the arrow coercion, except to a function type with no parameters (row 1084). By reading the code (not measured), walk also does not convert a varargs or keyword element under the specification's tuple coercion.
- **Conditions:** Walk only, except the stated compiled-path behaviour of the arrow coercion. The listed gaps are each a ledger row, so they are defects, not intended behaviour.
- **Consequence:** A walk program can rely on coercion at parameters, retried overloaded calls and typed bindings or assignments, and must not rely on it in the listed places; in a test for both paths, the arrow-coercion case differs between paths.
- **Evidence:** `tests/Coercion*RungC.fss`; `compile-ladder/rung-interp-coercion/REPORT.md` sections 1, 5 and 9; for the arrow coercion, `compile-ladder/rung-closure-name-once/SKEPTIC.md`, "3. My programs".
- **Could not resolve:**
  - "the arrow coercion": read as coercing a function value from one arrow type to another through coercions of its parameter and result types; the skill does not define it. Language concept I lack.
  - "a varargs or keyword element of the specification's tuple coercion": the tuple coercion and tuple types with varargs or keyword elements are not in the skill. Language concept I lack.
  - "a tuple-typed field": not converted when? At construction, at assignment to the field, or both? Can be read two ways.
  - "a coercion with its own static parameter": read as a `coerce` declaration with static parameters of its own (as against the enclosing type's); plausible but not certain.

## F-301

- **Established:** On the compiled path a call of a native helper goes through a generated wrapper class `native.pkg.Class.method` (written into `nativewrapper_cache/`), called by `invokestatic`, which unboxes each argument with `getValue`, calls the helper, and boxes the result with `make`, a new box each time. A `builtinPrimitive("pkg.Class.method")` binding and an `import java` alias give the same bytes. When the loop is hot, C2 inlined the whole chain (dispatcher, interface call, springboard, the trait's static body, wrapper, helper, `make`, the box's constructors), and escape analysis then removed every temporary box, leaving one box per assignment to a mutable variable per iteration (16 bytes for `ZZ32`, 24 for `RR64`). So the call adds no cost of its own.
- **Conditions:** Observed once, on one small program, while the prelude declared the number types as traits. Not checked since they became value objects (F-388), and `make` itself has since changed to go through a method handle. Shown by `javap`, C2's inlining log and JFR's allocation count; no timing; on a shared machine at load 20 to 25. No test.
- **Consequence:** A worker can expect native-helper calls in a hot compiled loop to cost about the helper itself, and allocations to come mainly from assignments to `var` variables; but this is not established for the current value-object form, so a performance claim that relies on it must be measured again.
- **Evidence:** `perf-probes/helper-calls/HelperCalls.fss`; `perf-probes/helper-calls/REPORT.md` sections 2 to 5; code at `compiler/nativeInterface/FortressMethodAdapter.java:303-327` and `compiler/runtimeValues/FZZ32.java:40-48`.
- **Could not resolve:**
  - "springboard" and "the trait's static body": how the code generator lays out a trait's methods is not in the skill. Concept I lack (code-generator design, not language).
  - "The library's form and the prelude's allocate the same": which two forms? The interpreter's library's way of declaring the operator versus the prelude's, or the `builtinPrimitive` form versus the `import java` form? And how was "the library's form" run, when no program runs on the one library (row 1062)? Unclear wording.
  - "costs nothing of its own": read as "no overhead beyond the helper's work and the one remaining box", not as "free".

## F-302

- **Established:** In the loops of F-301, C2 inlined the number operator's chain down to a depth of 12 frames from the loop, while by default it inlines to 16; a temporary box whose constructor chain lies beyond the limit is not removed. With the trait form, `+` reached `Object.<init>` under its result box at depth 12 in a loop, 10 in a top-level binding. Lowering the limit to 8 raised a loop of two nested helper calls from 33 to 96 bytes per iteration. So an operator called from more than 4 further inlined frames would keep its temporary boxes. The long chain came from the box extending its trait's springboard, which extends the springboard of the trait's first `extends` entry (`CodeGen.java:5956-5963`). Now the box is the value object's class over the payload class `FZZ32`, which extends `FValue` and no springboard, so the chain no longer follows `extends` entries; its depth is not measured.
- **Conditions:** JDK 25, default `MaxInlineLevel=15`; the trait form of the prelude's number types only; observed once, as F-301.
- **Consequence:** The margin of 4 frames was a property of the old trait form; for the current value-object form the margin is unknown and probably larger, but a worker cannot rely on either without measuring. Deep call chains around arithmetic in hot loops could bring boxes back.
- **Evidence:** The run of F-301; `perf-probes/helper-calls/REPORT.md` sections 3 and 4; `compiler/runtimeValues/FZZ32.java:22`; `CodeGen.java:5956-5963`.
- **Could not resolve:**
  - "At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16": why a level of 15 admits depth 16 (counting from 0 or 1? the loop frame counted?) is not said. Unclear wording.
  - "a top-level binding at 10": the `+` of a top-level binding, inlined into what? Unclear wording.
  - "more than 4 further inlined frames": further than what, the loop body? Derived as 16 minus 12, but the frame from which the 4 are counted is not stated. Unclear wording.
  - "springboard": as in F-301, a code-generator concept I lack.

## F-315

- **Established:** The code generator compiles three things: a trait or object that extends a generic trait with `Any` as static argument; a `try` with a `forbid` clause, where an exception of a listed type that no `catch` took is thrown again wrapped in a `ForbiddenException` (made by the library's constructor, with the original as cause) and the `finally` clause does not run (row 890); and a function or method with the `test` modifier, which the shared modifier guard admits. Still refused: `Bottom`, `Self` or an abbreviated type as the static argument of an extended generic trait, a tuple holding `Any` there (row 889), and `override` (row 650). The library's `test stringifyChars`, once stopped by a varargs call, now emits in F-34's measure.
- **Conditions:** The `test` method case is shown by one probe only; the guard by reading the code. `finally` skipped after a forbidden exception is a defect (row 890).
- **Consequence:** A compiled program can use these three forms, but must not rely on `finally` running after a forbidden exception; to see what else the code generator refuses in the library, go to F-34.
- **Evidence:** `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; `XXXFinallyOnEscape.test` for row 890; `CodeGen.java:3373-3375`; `compile-ladder/rung-codegen-walls/REPORT.md` sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.
- **Could not resolve:**
  - "a method declared `test` compiled and ran in one probe, and no test gates it", beside the listed `TestModifierCompiled.test`: read as "the function form is gated and the method form is not", but it can also read as "the `test` modifier is not gated at all". Can be read two ways.
  - "a tuple that holds `Any` (row 889) ... are still refused": `compiler.md` says the code generator crashes on that form rather than refusing it. The two texts disagree in wording.
  - "made by the library's own constructor": which library, the prelude or the one in use? Unclear wording.

## F-320

- **Established:** The code generator compiles a block's local functions as closures: each is a closure class like a function expression's, bound under its name in the block's environment, so both calls and uses as values go through the closure. Recursion and mutual recursion need no mutable cell: a function reaches itself as `this`, and each sibling through a field that the block sets once, after all closures of the block exist and before the body runs. Three forms the specification allows are refused after the checker passes them, each with its own message: own static parameters, two of one name in a block, and `atomic` (row 304). A varargs local function stops at 'Can't compile VarArgs yet' under the prelude and compiles under the one-library selection (F-390). On `dbf4825e0`'s code, under the switch-over's setting, all nine library declarations that used to stop at 'Can't compile LetFn' emit.
- **Conditions:** The library result was measured once, by F-34's probe, on `dbf4825e0`.
- **Consequence:** A compiled program can use local functions, also recursive and mutually recursive ones, but none of the three refused forms; a varargs one only under `FORTRESS_LIBRARY=one`. Matches `compiler.md`, "What the compiled path cannot compile yet".
- **Evidence:** `compiler_tests/LocalFunctionCallCompiled`, `LocalFunctionValueCompiled`, `LocalFunctionRecursiveCompiled`, `LocalFunctionCaptureCompiled`, `LocalFunctionGenericContextCompiled`, with `tests/LocalFunction*Walk` guards; refusals `XXXLocalFunctionGenericCompiled`, `XXXLocalFunctionOverloadedCompiled`, `XXXLocalFunctionAtomicCompiled`; `compile-ladder/rung-codegen-local-functions/REPORT.md` sections 1 and 5.
- **Could not resolve:**
  - "Under the switch-over's setting": F-34 speaks of "the distance stage's setting" and a patched tree. Are these the same setting? Unclear wording.
  - "before the body runs": the block's remaining statements, or the local function's own body? Read as the block's; can be read two ways.
  - 'Can't compile VarArgs yet' against F-86's "naming the missing type" for a varargs declaration under the prelude: one message for local functions and another for top-level ones, or the same? Unclear.
  - `dbf4825e0` beside F-34's `ba3c7c876d`: which is later is not said, so whether these nine are among F-34's 753 is a guess. Unclear.

## F-338

- **Established:** The code generator compiles an object or trait whose first supertrait is a trait from an imported api, also when a later supertrait has a method of the same name. `dumpMethodChaining` gets the first supertrait's methods through `CodeGen.firstSupertraitMethods`, which labels each of that trait's own declarations with the trait's name as the `extends` clause spells it; since `STypesUtil.allMethods` already labels them so (F-391), this relabelling changes nothing.
- **Conditions:** The first supertrait comes from an imported api; one test.
- **Consequence:** A worker can rely on this form compiling; the relabelling in `firstSupertraitMethods` is now redundant, so a change there should not expect it to matter.
- **Evidence:** `TraitTableApiTraitCompiled`; `compile-ladder/rung-codegen-trait-table/REPORT.md` sections 1, 2 and 6.
- **Could not resolve:**
  - `dumpMethodChaining` and "method chaining": what the code generator emits there (forwarding methods from inherited traits into the class?) is not in the skill. Concept I lack.
  - "also where a later supertrait gives a same-named method": it compiles, but which method the object then has is not said. Unclear.
  - F-338 names `STypesUtil.allMethods`, F-391 names `STypesUtil.gatherMethods`: one function or two? Unclear.
  - "the trait's name as the extends clause writes it": read as the api-qualified name (for example `Api.T`) as against the declaring component's name; a guess.

## F-388

- **Established:** The compiler's prelude (`CompilerBuiltin`) declares `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`, `RR32` and `RR64` as `value object`s. The code generator makes each object's class extend an abstract payload class `compiler/runtimeValues/F<T>` (such as `FZZ32`) that holds the JVM value. Descriptors, names of generic instances and the RTTI's `className()` use the payload class's name; the RTTI's class is still the object's, so at run time the type sits below its traits. `F<T>.make` builds a value through the object class's `make`, found by a name from `LibraryNames`, for the prelude only: the one library's seven are not yet compiled over payload classes. Results: a program's object below a number type is refused at compile; an overload at `ZZ32` beside one at a program's trait is valid; a `typecase` clause at such a program trait over a number is refused as unreachable (row 1081); a number type named as a value does not compile (row 1082).
- **Conditions:** Prelude only; under the one library `make` does not work this way (F-390 says it raises an `Error` there).
- **Consequence:** A compiled program cannot extend a number type, can overload at a number type beside its own traits, and must avoid the two forms of rows 1081 and 1082. Work that compiles the one library's number types still has to put them over the payload classes.
- **Evidence:** `compiler_tests/NumberObjectsCompiled.test`, `XXXNumberTypeExtendRefusedCompiled.test`, `ComprisesMeetGenericTrait.test`; `compile-ladder/rung-number-payload-objects/REPORT.md`, "The design as built (a point to report)".
- **Could not resolve:**
  - "RTTI", "the RTTI's class" and `className()`: the compiled run time's type objects are not in the skill. Concept I lack.
  - "so the type lies below its traits at run time": read as "run-time subtype tests see `ZZ32` under `Number` and its other traits", a guess.
  - Rows 1081 and 1082 are ledger rows, so they are gaps; but they are listed under "So", as consequences of the design. Whether refusing the `typecase` clause and the value use is the intended behaviour or a defect to fix is not said. Can be read two ways.
  - "a number type named as a value": writing `ZZ32` as an expression (the singleton object)? Unclear wording.
  - What `ComprisesMeetGenericTrait.test` checks for this fact is not said.

## F-389

- **Established:** The class of a function expression or local function is named from its component and its source span; when a second closure has a span already used, it gets the name with `#2`, then `#3`, in the order the code generator meets them. Three forms make closures share a span: a conditional operator's thunk for its right operand together with the outer `fn (reduction, unit) => ...` of a reduction that is that operand; a binding `if`'s thunk for its else part when that is a reduction; and the wrapper that an arrow coercion puts around a function-expression argument. In each, the thunk or wrapper is met first and keeps the plain name. Names are made once per compile of a component, so they are stable from compile to compile and under another hash mode. So F-34's measure now emits the one library's `LexicographicOrder` (row 315, a closure class written twice, fixed).
- **Conditions:** Per compile of one component; the three listed forms are the known span-sharing cases.
- **Consequence:** A worker can rely on closure class names being unique and reproducible; a new form that shares a span is handled by the same suffixing.
- **Evidence:** `compiler_tests/ConditionalReductionCompiled.test`, `compiler_tests/ArrowCoercionFnExprCompiled.test`, `one_library_tests/OneLibraryConditionalReduction.test`; `NamingCzar.gensymArrowClassName`, `CodeGen.closureClassNames`; `compile-ladder/rung-closure-name-once/REPORT.md`, "4. The naming as built".
- **Could not resolve:**
  - "a conditional operator": read as a short-circuit operator such as `AND` or `OR` that makes a thunk of its right operand; not in the skill. Language concept I lack.
  - "a binding `if`": not in the skill (an `if` whose condition binds a name? an `if` used as a value in a binding?). Language concept I lack.
  - "under another hash mode": what a hash mode is, and where it is set, is not in the skill. Concept I lack.
  - "the arrow coercion": as in F-128.

## F-390

- **Established:** The code generator passes a varargs parameter's arguments as one `ImmutableArray[\T, ZZ32\]` of the library in use, as one JVM parameter after the plain ones (`NamingCzar.varargsParamType`). The array is built at the call, or in a dispatch method's branch when another declaration of the name takes as many arguments, and filled in order with `init`, as walk builds it; a single argument of tuple type supplies its elements. Calls reach the declaration by the specification's expansion rule (`OverloadSet.VarargsExpansion`). Against the prelude, which has no such type, the declaration is refused. Under the one-library selection it still stops on a varargs method, or a varargs function with static parameters, beside another declaration of its name with as many parameters (row 1086); a spread argument is dropped on both paths (row 1085). By reading the code, a run under the selection would fail at the array, because each index is made by `FZZ32.make`, which raises an `Error` there (F-388).
- **Conditions:** Compiles only under `FORTRESS_LIBRARY=one`; never run, since no program runs on the one library yet (row 1062). The failure at the array is by reading only.
- **Consequence:** Under the selection, varargs declarations that programs reach (`println`, `assert`) compile; nothing shows them running. Before compiled varargs can run, `FZZ32.make` must work under the one library. Tests of varargs under the one library are compile-only.
- **Evidence:** The five `one_library_tests/OneLibraryVarargs*.test`; the prelude's `compiler_tests/XXXVarargsCodeGeneration.test` and `XXXVarargsMethodCodeGeneration.test`; `CodeGen.evalVarargsArgs`, `emitVarargsArray`; `compile-ladder/rung-varargs/REPORT.md`, "The convention as built".
- **Could not resolve:**
  - "a spread argument" and "dropped": spreading (for example `f(xs...)`) is not in the skill, and "dropped" can mean the argument is silently left out of the call or that the form is refused. Language concept I lack, and unclear wording.
  - "beside another declaration of its name with as many parameters": as many as what, the varargs declaration counting the varargs part as one? Unclear wording.
  - "varargs compiles on a program's path (`println`, `assert`)": read as "the library's varargs declarations that a program's calls reach"; can also read as "a program's own varargs declarations". Can be read two ways.
  - "each index is made by `FZZ32.make`": the index of each element as it is put into the array? A guess.
  - The second static argument `ZZ32`: as in F-86.

## F-391

- **Established:** The code generator collects a trait's methods under the name by which the trait table looked the trait up, so a method of a trait from an imported api is found under that api. `STypesUtil.gatherMethods` names the trait of a type's own declarations by the name the table was asked for, and the special arrow of a functional method names its trait with the api of its self type (`STypesUtil.nameBySelfType`). This makes these compile: an object's overload beside a method inherited from an api's trait, a call at an `asif` assumption of such a trait, and the one library's `Array1`. A call at an assumption runs the assumed trait's body, also when the object overrides it (`CodeGen.hasBodyInItsTrait`). Still stops: a generic trait whose method has a parameter of the trait's type parameter (row 1088). The trait table's search by the prelude's names remains in the code, and no compiled test reaches it.
- **Conditions:** Traits reached through an imported api.
- **Consequence:** A compiled program can overload beside, and call through `asif` at, an api's trait; it must avoid the row 1088 form. The prelude-name search is untested code, which the switch-over will have to keep or remove knowingly.
- **Evidence:** `compiler_tests/ApiTraitOverloadCompiled`, `ApiTraitShadowedNameCompiled`, `AsIfApiTraitCompiled`, `AsIfApiTraitOverrideCompiled`, `IntersectionApiTraitCompiled`, `one_library_tests/OneLibraryArray1`; `compile-ladder/rung-api-method-index/REPORT.md`, "What changed and why" and "The trait table's search by the prelude's names".
- **Could not resolve:**
  - "the trait table": the code generator's lookup of traits by name is not in the skill. Concept I lack.
  - "the special arrow of a functional method": not in the skill (the arrow type the code generator gives a functional method, with `self` placed among the parameters?). Concept I lack.
  - "a call at an assumption": resolved by `compiler.md` as a call whose receiver or arguments use `e asif T`.
  - "runs the assumed trait's body, also where the object overrides it": stated as built behaviour; whether that is what the specification asks is not said, though no row marks it as a defect.

## F-352

- **Established:** A compiled program has run against the interpreter's library only in a scratch tree with twelve marked hacks, on `832f7d0d91`'s code. There, two lines of `Shell.useCompilerLibraries()` pointed the compiled path at the one library; the library's fourteen components were compiled to bytecode by name (about 200 s); and three programs ran with walk's output: printing a line, building and reading an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: rank-2 or rank-3 arrays (row 992), the library's `DOT` and `SUM` (row 732), and microGPT, which the checker stops (F-58). Sixteen walls of two kinds were met. Those a test against the prelude can show: varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732; all fixed since but 624, which is fixed under the selection (F-390). Those only a switched tree shows: which run-time class carries each built-in type, which reaches the code generator's naming (rows 874, 995; done for the seven number types, row 866 fixed, F-388); the trait table's search by the prelude's api names (row 942, fixed; the search stays, F-391); the dispatch method's package (row 994); `NN32`'s two getters (row 993). On `main` the compile reads the prelude unless `FORTRESS_LIBRARY=one` (F-381).
- **Conditions:** Every run had the JVM verifier off; measured once; nothing landed; no test holds the runs.
- **Consequence:** On `main`, no compiled program runs on the one library. The walls still open of the second kind are rows 874, 995, 994 and 993; each must be met on `main` (as P-33 asks). How many emitted methods the verifier would refuse is unknown, so more walls may follow once the verifier is on.
- **Evidence:** `compile-ladder/plan-31/probes/switch-rehearsal.md`, sections 2, 4 and 6; `compile-ladder/plan-31/probes/model-closure-check.md`, section 4.
- **Could not resolve:**
  - "sixteen walls": the rows named are twelve (seven of the first kind, five of the second, not counting row 866). Whether some rows hold several walls, or some walls are unnamed, is not said. Unclear wording.
  - "which run-time class carries each built-in type": read as the choice of Java class that represents each built-in type (such as `String` or `Boolean`) at run time; how that reaches the naming is not said. Partly unclear.
  - "row 866 is fixed": a third row for that wall, or a separate wall? Unclear.
  - Whether "fixed since" means fixed on `main` today: read so.

## F-136

- **Established:** On the compiled path, when a generic top-level function is one arm of a template dispatcher, it is called at the dispatcher's own static parameters, matched by position, provided it has as many static parameters as the dispatcher and each of the dispatcher's is a type. Otherwise, by reading `OverloadSet`, the dispatcher still takes the arm's static arguments from the argument's run-time value, as before the change. The arm's own kinds are not checked, so an arm with a `nat` parameter at the dispatcher's type parameter is not excluded (by reading). When one arm is more specific than another but does not match the dispatcher position by position, the dispatcher tests both at the call's static arguments, so the less specific arm can run: through `viaT[\T\](x: T) = f(x)`, a `Box` runs `f[\T\](x: T)`, not `f[\U\](x: Box[\U\])`, and the checker accepts such arms when their return types agree (row 499). Generic dotted methods (row 495), and a generic declaration beside a plain one reached through an argument of static type `Any` at a program's object (row 496), still die with `ClassCastException`, because an arm's static parameter is not rewritten. At `ZZ32` the second form runs (F-388).
- **Conditions:** Not measured for a different count of static parameters, nor for a dispatcher with a `nat`, `int`, `bool` or `opr` parameter (F-45).
- **Consequence:** A compiled program must not rely on the more specific generic arm running where it does not line up with the dispatcher (row 499), and must avoid generic dotted methods and the row 496 form at a program's object.
- **Evidence:** `compiler_tests/Dispatch*ArmRungG`; `compiler_tests/GenericBesidePlainZZ32.test`; `compile-ladder/rung-generic-runtime/REPORT.md` sections 7 and 9.
- **Could not resolve:**
  - "template dispatcher" and "arm": read as a dispatch method compiled as a template class (one per instantiation, as `SKILL.md`'s "The compiled runtime" describes for generics) and one overload among those it chooses; not defined in the skill. Concept I lack.
  - "as before the change": which change is not named. Unclear wording.
  - "For template dispatchers both are fixed (rows 493 and 494)", right after "still die": read as "rows 495 and 496 are the same two forms at a dispatcher that is not a template dispatcher, and rows 493 and 494, their template-dispatcher forms, are fixed". But the sentence before speaks of arms of template dispatchers throughout, so it can be read as contradicting itself. Can be read two ways.
  - "the second form runs": "at `ZZ32`" read as "where the object is `ZZ32` rather than a program's object"; a guess.
  - Whether the `Box` example is a defect or accepted behaviour: row 499 suggests a defect, but the entry does not say what the right result is.

## F-353

- **Established:** In F-352's scratch tree, one build served the compiled path with either library: the prelude's thirteen run-time value classes stayed, and a second set with the same names, in a second class folder placed first on the class path, served the one library. Nine of the hacks sat behind a selector set by one environment variable at compile and at run; one JVM serves one library. The one-line program ran on both libraries, and the `Array1` and dot-loop programs on the one library, by hand and through `fortress junit`. A sample of 137 of `compiler_tests`'s 876 files showed no test disturbed; the full compiled tracks and walk were not run. The second set's sources equalled the first's under a map of eight names, since the classes differed only in the generated classes they extend. In the build, the classes that link to a prelude class by name are those thirteen, `FValue`, `MutableFValue`, `Utility`, `FException`, `FZZ32Vector` and `FStringVector`; every other mention of the prelude in the run time and helpers is a string, 105 of them raise strings (read from the constant pools of `ProjectFortress/build`). `main` has its own selector (F-381) and one set of run-time classes; its seven number types need no second set, since their run-time classes are payload classes over `FValue`, under object classes the code generator writes (F-388).
- **Conditions:** The scratch tree only; a sample of the compiled tests; nothing landed; no test.
- **Consequence:** A two-library build is feasible with a shadowing class folder; on `main`, the number types already avoid the duplication. A worker touching the run-time classes that link to the prelude by name (the list above) should expect the switch-over to affect them.
- **Evidence:** `compile-ladder/plan-31/probes/probe-y.md`, sections 1, 2 and 5; the constant pools of `ProjectFortress/build`.
- **Could not resolve:**
  - "the prelude's thirteen run-time value classes": not listed. Seven are presumably the number types; what the other six are, and whether `main` will still need a second set for them, is not said. Unclear.
  - "105 raise strings": read as string constants that name exception types the run time raises; not defined. Unclear wording.
  - "a map of eight names": which names, and why eight while thirteen classes differ: not said. Unclear.

## F-181

- **Established:** The code generator compiles a function, method, object or trait whose own header has a `where` clause, emitting nothing for the clause (only the checker uses its constraints), and refuses every function or method with a contract (row 701). A trait's or object's contract never reaches that refusal, because the disambiguator drops it (row 781). Walk checks a function's `requires` clause and raises `CallerViolation`. An array comprehension has no code-generator case, besides those of `compiler.md`. Local functions compile as closures except the forms of F-320. A trait whose `comprises` clause lists a type at a `where`-clause size, the `NatParam` shape, compiles, but a call that opens its value to the size fails verification (row 307); a member whose body a listed generic type gives compiles (row 812, fixed; F-384). A function's or method's own clause that introduces a `where`-clause variable compiles, and the compiled call dies with `NoClassDefFoundError` (row 867).
- **Conditions:** The `where` clause of an `extends` entry is in F-255 (not readable); `compiler.md` says such a declaration compiles too.
- **Consequence:** A compiled program can carry `where` clauses but gets no run-time check from them; it must not carry contracts on functions or methods, and must copy `XXXWhereVariableCallCompiled`'s form for a call that introduces a `where` variable. A trait's or object's contract is silently unchecked on both paths.
- **Evidence:** `compiler_tests/WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`; `XXXFunctionContractCodeGeneration`; the `XXXNatOpenRun` pair; the `XXXWhereVariableCallCompiled` pair; `compile-ladder/rung-codegen-where/REPORT.md` sections 1, 2 and 5.
- **Could not resolve:**
  - "a call that opens its value to the size": `compiler.md` (on row 307) says a call that passes a value of such a trait where a listed type is expected; "opens" alone would not have told me. Resolved by the skill, unclear wording in the entry.
  - "Where a generic type that such a clause lists gives a member's body": read as "a listed generic type supplies the body of a member declared in the trait"; plausible.
  - "a `where`-clause size" versus "a `where`-clause variable": the first read as a size variable, `nat n`; the second as any variable a clause introduces. Can be read two ways.

## P-33

- **Decided:** The work to compile microGPT goes through numbered phases of the project's work (not compiler phases): 3, the compiled checker reports no error on the interpreter's library's apis and components that the distance counts (F-53); 4, the switch-over, first the natives (the library's `builtinPrimitive` bindings run on the compiled path), then the compiled path reads the interpreter's library and the prelude is deleted; 5, microGPT compiles (its static types, the array design, the code generator's open gaps); 6, microGPT runs fast. The library's other components are not part of phase 3: each is cleared before the first program needing it, at the latest before walk runs the checker (P-12), so `System` by the switch-over (F-293). The rest of phase 4 takes microGPT's slice first: with the compile command able to select the one library beside the prelude in one build (F-381), each wall that only a switched tree shows is met as its own rung, with its own test on `main`, under the gate, alongside the code generator's walls; moving the compiled tests and deleting the prelude come last. Why: the walls stand one behind another (F-352), and this gates each one separately instead of landing the whole switch-over as one unchecked piece.
- **Applies:** To the ordering of work toward compiled microGPT; code-generator work runs beside it under either library (P-37). Row 320 (an api implemented by a component of another name does not link) belongs to the switch-over's design.
- **Requires:** A worker must meet each one-library-only wall as a separate rung with its own test on `main`, gated; must not land the switch-over in one piece; must not move the compiled tests or delete the prelude before the slice's walls are done; must clear a non-counted library component before the first program that needs it.
- **Unfinished:** Phase 4's natives (`SKILL.md` says the switch-over waits for them), the remaining one-library walls (F-352's open rows), the move of the compiled tests and the prelude's deletion, then phases 5 and 6. Phase 3 looks done (`SKILL.md`: the checker finds no error in the interpreter's library), but the entry does not say.
- **Could not resolve:**
  - "microGPT's slice": not defined (the library components and walls that microGPT's compile needs?). Unclear wording.
  - "rung": used here and in test names, not defined in the skill (a unit of work with its own test, on the compile ladder?). Concept I lack.
  - "first the natives ... The rest of phase 4 takes microGPT's slice first": do the natives still come before the slice's walls, or does slice work run beside the natives? Can be read two ways.
  - "Row 320 ... is part of the switch-over's design": that the switch-over must design a fix for it, or that the behaviour is accepted by design? Can be read two ways.
  - "before walk runs the checker (P-12)": P-12 not readable; that walk is to switch the checker on is inferred.

## P-178

- **Decided:** Each built-in number type becomes one `value object` under its own name, and walk's native number objects `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` are removed. `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` become value objects, as `NN32` and `RR32` already are, replacing the form of a trait with one native object below it (such as `trait ZZ32 comprises { Int }` with `value object Int extends ZZ32`). Since an object is a leaf, no program type extends a built-in number type; a program's own number type extends `Number` (P-160). Why: two names per type is a duality the revival would make for itself; the second names are walk's internals, which programs are not to see (P-167); and the prelude's open trait let a program's object extend `ZZ32`, which a bare `int` cannot hold (row 866).
- **Applies:** To both libraries, before the switch-over: the one library by "the merge", the prelude by an exception to P-37 like that for the numerals, which ends with the prelude. For number types it replaces the pattern that P-164's reason names.
- **Requires:** A worker must declare these types as `value object`s, not as a trait with a native object; must not let a program type extend a number type; must not use or expose the native object names.
- **Unfinished:** The prelude's part is built (F-388). The one library's merge is not said to be done here; F-388 says the one library's seven are not yet compiled over payload classes. Holding the value as a bare JVM `int`, `long` or `double` (P-17) is enabled, not built (`compiler.md`: the `value` modifier does not unbox).
- **Could not resolve:**
  - "the merge": read as merging each trait with its one native object in the one library; whether it has landed is not said. Unclear.
  - "Each built-in number type": `SKILL.md` also lists `QQ` among the number siblings; whether `QQ` is covered is not said. Can be read two ways.
  - "as for the numerals, which goes with the prelude": "which" read as the exception, which disappears when the prelude is deleted; it could also attach to "the numerals". Unclear wording.
  - "the pattern that P-164's reason names": P-164 not readable, though the entry restates the pattern.
