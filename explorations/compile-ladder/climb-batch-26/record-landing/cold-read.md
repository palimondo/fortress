# Cold read: climb batch 26, record landing (clean.txt)

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and in its `references/`: `compiler.md` (definitions, "Natives", "What the compiled path cannot compile yet", the checker's rules), `interpreter.md` ("Natives", walk's load check), `records.md` and `gate.md` (greps). One grep over the references also printed four lines of `revival-changes.md` (lines 24, 36, 39); I did not use them. Thirteen entries: F-34, F-240, F-299, F-320, F-321, F-252, F-257, F-318, F-319, F-181, P-160, P-159, F-?1.

## F-34

- **Established:** With the compiled checker run as the distance stage runs it, the code generator still refuses 38 declarations of the fourteen components that the distance stage checks. They fall into 10 kinds of refusal (walls), and the checker accepts every one of them. Before local functions compiled, the count was 47 in 11 kinds. So the code generator, not the checker, is now what stands between the one library and bytecode.
- **Conditions:** One measurement, on the code of `dbf4825e0`, by the probe `compile-ladder/plan-25/probes/codegen.sh`, with the library's 288 helper strings put back on their glue classes. Each declaration is counted only at its first wall; no emitted class was run, so a declaration that "emits" is not known to run. The kinds that F-315 removes (`Any` in `extends`, `forbid`, the `test` modifier) and local functions (F-320) no longer occur. Separately, on `aa5c67d48` the dispatch generator refused none of `FortressLibrary`'s 178 overload sets.
- **Consequence:** The switch-over alone does not give compiled programs over the one library; the remaining walls must be removed first. Each kind has a ledger row or plan line; named: varargs (row 624), `asif` (row 818), "Not in the trait table" (row 733). No test guards the count, because the gate's distance stage runs no code generation, so a worker who wants the number must rerun the probe.
- **Evidence:** One probe run; reports `rung-codegen-local-functions/REPORT.md` section 5, `rung-codegen-walls/REPORT.md` section 5, `reviews/phase3-exit/zero-audit.md` Part C item 4, `perf-probes/codegen-distance/REPORT.md` sections 2-6.
- **Could not resolve:**
  - "the bound `Any`" as part of the setting: the bound of what (an unbounded type parameter? a static argument?) and as opposed to what (`Object`, as the compiler's prelude uses?). Unclear wording; F-53 is not in the context.
  - "with its 288 helper strings put back on their glue classes": why the probe must undo the helper bindings, and whether that changes which declarations reach the code generator. Unclear wording (the number matches F-299's 306 less the string family's 18, which suggests the probe predates the string helpers, but the entry does not say so).
  - Only three of the 10 kinds are named; the other seven are not listed.
  - "No test checks it": "it" can be the 38, or the dispatch generator's result just before. Unclear wording.

## F-240

- **Established:** At the last landed gate (climb batch 26) the count stage took about 180 s and the distance stage 246 s. At climb batch 15b they took 325 s and 1,075 s; the solver's memos (F-235) made most of that fall. The count stage rose from about 90 s at climb batch 21b because `FortressLibrary`'s check now runs past its former type errors into the export check. Checking every symbolic operator (F-281) costs the count stage 15-25 %. From batch 22 to batch 26 the count stage stayed at about 150-180 s with no measured change by any batch. The distance stage fell from 271 s at batch 25 to 246 s at batch 26 with no known cause.
- **Conditions:** One run per gate. Count-stage time is read from the file times of the gate's log (the table records none). Both gates ran the distance stage about 10 s before `testFast` began, its four JVMs beside it. Start loads 0.34 (batch 26) and 0.59 (batch 25). Load can more than double a stage (217 s at load 3.3 against 574 s at 4.6-5.3 for nearly the same code at batch 16).
- **Consequence:** Compare a stage time only with one taken under like load; a single time difference between gates is not evidence of a speed change. A worker timing the count stage should expect about 150-180 s.
- **Evidence:** File times of the gate's log; `compile-ladder/climb-batch-26/gate/distance.txt`; batch reviews 16, 17, 21b, 22, 22c, 23, 24, 25, 26 (section 2, or 1 for 17).
- **Could not resolve:**
  - "Its rise from about 90 s ... is the ... check now run to its end ..., not load" and "Since climb batch 21b ... costs the count stage about 15 to 25 %": both changes date from batch 21b, and the entry gives the whole rise to the first and also a share to the second. How the rise splits is unclear wording.
  - "`FortressLibrary` 182 s" and "271 s (205 s)": I read the parenthesis as `FortressLibrary`'s share of the stage at batch 25, by analogy, but the entry does not say so. Unclear wording.
  - "Its rise": "its" most likely the count stage, but the sentence before speaks of both stages.

## F-299

- **Established:** Walk lets a `builtinPrimitive` string name a static helper method in `nativeHelpers/`, besides a glue class; 306 of the one library's 449 live bindings now name a helper, the other 143 a glue class. The loader (`StaticNativeApp.java`) picks the overload whose Java types carry the declared Fortress types, `self` first, and turns a helper's `fortress.<Api>$<Name>` exception into the library's `<Name>`. At load it refuses a string naming no helper, a helper that fits no overload, and a declared type (including `self`'s, taken from the declaring type) that no Java type carries. The library's own `FlatString` (recognised by its declaring component) carries `self` in a Java `String`; a program's own type of that name does not. A helper parameter declared `String` is refused ("no Java type carries the declared type of parameter"), because a non-flat string cannot be a Java `String`; parameters declared `FlatString`/`JavaString` and results declared `String` are carried in `String`.
- **Conditions:** Departures: a generic owner's dotted method is checked only when an instance is made (row 864); the declaring type, not the value's, decides, so a program object extending a carried trait against its `comprises` passes an uncarried value (row 551); a glue class bound over `String`, or a helper in a method of `String` as `self`, receives a non-flat string's type name (row 846; the library binds no such helper). The 306 break down by type as listed (they sum to 306), each family with its own fact.
- **Consequence:** A new helper binding must use carried types; declare a string parameter `FlatString` (and flatten at the call, or overload over `String` with a `typecase` that flattens, as the five `System`-style natives do), never `String`. Test any helper on both paths. Carriers and messages are in `interpreter.md`, "Natives".
- **Evidence:** Tests named (binding, raise, division by zero, family, carried `self` `FlatString`, rope, the compiled string family, and five refusal tests); three rung reports, "What changed and why".
- **Could not resolve:**
  - "live bindings": not defined (not commented out? reachable? not inside a test?). Unclear wording.
  - "P-58, 'Every native binding is a ...'": the decision's text is cut off, so I cannot say what this entry builds. Unclear wording.
  - "11 of `FlatString`'s 13 methods, all but `=` and `flatConcat` at a `Char`": reads two ways, the two left out being `=` and the `flatConcat` overload over a `Char`, or `=` and `flatConcat`, both "at a `Char`". Unclear wording.
  - The skill's `interpreter.md` contradicts this entry in two places: it lists `String` among the types carried in a Java `String` (the entry refuses a parameter declared `String`), and it says "a binding in a method of the library's `FlatString` cannot name a helper yet" (the entry says 11 do, with `self` carried). I take the entry as newer, but a worker with only the skill would be misled.
  - "told by its declaring component": I read "identified by"; plausible but odd wording.

## F-320

- **Established:** The code generator compiles a block's local functions: each becomes a closure class, like a function expression's, bound under its name in the block's environment, so calls and uses as values both go through the closure. Recursion uses the closure's own `this`; mutual recursion uses a field per sibling that the block sets once, after the whole group is built and before the body runs, so no mutable cell is needed (`compiler/codegen/CodeGen.java`).
- **Conditions:** Refused, each with its own message after the checker passes: a local function with its own static parameters; two local functions of one name in a block; the `atomic` modifier (row 304). A varargs local function stops at "Can't compile VarArgs yet" (row 624). Under the switch-over setting, measured once, all nine library declarations that stopped at "Can't compile LetFn" now emit (consistent with F-34's 47 to 38).
- **Consequence:** A compiled program may use local functions, recursive or not, capturing or not, also inside a generic context, except in those four forms. The three refusals are recorded as `XXX` tests.
- **Evidence:** Compiled tests `LocalFunctionCall/Value/Recursive/Capture/GenericContextCompiled`, the walk guards `tests/LocalFunction*Walk`, the expected failures `XXXLocalFunctionGeneric/Overloaded/AtomicCompiled`; `rung-codegen-local-functions/REPORT.md` sections 1 and 5.
- **Could not resolve:** Nothing blocking. "a block's local functions ... the group": I read the group as all local functions of one block; clear enough. No test for the varargs stop is named, which may be deliberate (row 624 covers it).

## F-321

- **Established:** When checking against the interpreter's library, the checker reads every method of a helper class that a binding names. `systemOps.getArgs` returns an `FStringVector`, which `NamingCzar` maps to `FortressBuiltin.StringVector`, a type the interpreter's `FortressBuiltin` lacks. So any component with a binding into `systemOps` stops with "FortressBuiltin.StringVector is undefined." (row 895).
- **Conditions:** Only against the interpreter's (one) library; compiled tests check against the compiler's prelude, which declares `StringVector`, so no test sees it. Observed once, by the distance stage on `19e9dbda5`, when `FlatString.fss`'s `natLineSeparator` named `systemOps.lineSeparator` ("File FlatString.fss has 1 error."). `System`'s `getEnvironment` and `getProperty` name `systemOps`; neither stage reads `System`, so the stages do not show it.
- **Consequence:** A binding may name only a helper class every method of which maps to the one library's types (this is why the line separator uses `stringOps.lineSeparator`). `System` will stop wherever the checker does read it, e.g. after the switch-over, unless `systemOps` or the mapping changes.
- **Evidence:** One observed distance-stage failure; row 895 gives the code lines; `rung-string-natives/REPORT.md`, "A site that came, and went".
- **Could not resolve:**
  - "Against the interpreter's prelude": the skill defines only the compiler's prelude. I read "the interpreter's library" (or its `FortressBuiltin`), but the term is new. Unclear wording.

## F-252

- **Established:** Walk's load check first compares two overloads parameter by parameter. Where that check refuses two declarations that have their own static parameters (a generic function, a generic object's constructor, or a functional method declaring static parameters in a non-generic owner), or one such beside a functional method of a generic trait, walk reads the pair again on its declared domains by the No Duplicates, Return Type and Meet Rules, and loads it if it meets them. The parameter check also over-finds exclusion: it compares two generics of one name and one static-parameter list at one shared symbolic instantiation, so `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])` with `P[\T\] excludes { Q[\T\] }` "excludes" though a type extending `P[\ZZ32\]` and `Q[\String\]` is in both. Walk now re-reads such an exclusion over all instances and withdraws it where instances do not exclude; a withdrawn pair is then read on its declared domains like a refused one.
- **Conditions:** When an exclusion stands: instances of one generic type exclude only if their static arguments cannot be equal; any other exclusion stands if it holds with the static parameters renamed apart, or at the shared instantiation where every generic type both extend forces equal static arguments (so `Array` and `ImmutableArray` exclude through `ReadableArray`). A pair the parameter check orders is re-read only for No Duplicates (F-274); the Return Type Rule is F-275's. Limits: plain declarations at `Tg[\3\]` and `Tg[\4\]` are refused (row 416), while own-generic declarations whose instances are apart load (F-155, F-258). The Meet Rule search looks for a covering third declaration only where, at each position, the types are equal, one is a static parameter, or both are instances of one generic with matching arguments (row 539). A pair whose domains exclude read whole also loads when neither has its own `where` clause (F-258, row 787). A varargs pair keeps the refusal (F-257). Generic dotted methods: F-253.
- **Consequence:** Under walk, generic overload pairs that the specification's rules allow mostly load and dispatch; some valid ones are still refused (row 539, the expected failure), and plain declarations at distinct ground static arguments are still refused (row 416). A worker writing generic overloads for walk should check them against these limits.
- **Evidence:** Load-and-dispatch tests `DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk`, `GenericPairNestedBoundsWalk`; `XXXOverloadExistentialMeetWalk`; withdrawal refusals and loads as listed (incl. `ShuffleTest`); two rung reports.
- **Could not resolve:**
  - Headline "one beside a functional method of a generic trait that declares none of its own": "that declares none" can refer to the trait or to the method (the body suggests the method; F-318 confirms). Unclear wording.
  - "Any other exclusion stands where ... renamed apart. Or, read at the shared instantiation, it stands where ...": I cannot tell whether these are two alternative conditions (either suffices) or the second is a restatement for a different kind of pair. Unclear wording.
  - "This search reads a bound that names its own parameter from the declarations, so two such bounds meet": I cannot tell what "reads ... from the declarations" means (takes the F-bound from the declarations rather than leaving the parameter open?). Language concept partly (F-bounds are in the skill), mostly unclear wording.
  - "A pair whose domains exclude when read whole": "read whole" (the whole parameter tuple rather than position by position?) is not defined here. Unclear wording.
  - "At a call, walk compares a functional method of a generic trait or object on the instance that the call makes": compares with what, and to what end (dispatch specificity?). Unclear wording.
  - The headline omits the own-generic-beside-plain-declaration case that F-257 lists (via F-27); a reader of F-252 alone would think it is not re-read.
  - The entry is long and dense enough that I could not be sure I had every rule's scope right.

## F-257

- **Established:** When walk re-reads a pair on its declared domains and still refuses it, the message names the broken rule: "fails the Return Type Rule: ...", "fails the Meet Rule: ...", or walk's No Duplicates message "fails because their parameter lists have the same types". The first two contain "not found" because walk's reading is narrower than the rules; rows 539, 550 and 779 hold valid pairs walk refuses.
- **Conditions:** Re-read pairs: those the parameter check refuses where both have own static parameters, or one has them and the other is a plain declaration or a functional method of a generic trait without own static parameters (F-252, F-27, F-318); ordered pairs only for No Duplicates (F-274). Not re-read, keeping the parameter check's message (e.g. "with generic type, at least one pair of parameters must have excluding types"): pairs with varargs, with parameter lists of different lengths, that raise an error while instances are read, of none of those kinds (e.g. two functional methods of generic traits), or the instance pair made by an explicit instantiation `f[\A, B\]` (`XXXGenericOverload2`).
- **Consequence:** A test may match the rule's message where the pair is re-read; the message says nothing about which pairs load, so do not infer load behaviour from the message.
- **Evidence:** Return Type tests (three), Meet tests (three), No Duplicates tests (two); `rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.
- **Could not resolve:**
  - "The first two say 'not found'": I read that the message text contains "not found" (e.g. "no covering declaration found"), but whether it is the quoted words or a description of their content is not certain. Unclear wording; "the report gives them whole" defers it.

## F-318

- **Established:** Where the parameter check refuses an own generic function beside a functional method of a generic trait (the method declaring no own static parameters), walk re-reads the pair as two own generics, the trait's static parameters standing for the method's. In the exclusion test, `self` of a directly self-typed trait `C[\X\]` (its `X` bounded by `C[\X\]`, with no `comprises` or one listing only `...`) is read as `C[\X\] & X`: it excludes a type where the trait's instance or `X` does (`OverloadedFunction.java`). So a program's generic operators between an array of numbers and a number, beside a self-typed additive group's own operator, load and run under walk as on the compiled path. This builds P-157 and P-152.
- **Conditions:** Not for a trait self-typed only through another self-typed trait, nor a method with own static parameters; they keep the refusal. In a scratch copy with `Number`'s `comprises` removed, at `2fd5d653e`, once: walk loads and runs `BooleanOps`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, `extendNumber`. Walk applies no extender rule of P-146: it loads an object extending a self-typed trait at a type it is not a subtype of, and where two declarations fit a call it runs one of them (row 893); the checker refuses a generic more specific than such a method that walk loads (row 894).
- **Consequence:** P-160's first step (walk reading the library's array/number operators beside `AdditiveGroup`'s) is satisfied; removing `Number`'s clause no longer breaks walk's loading for those programs. Remaining path differences are rows 893 and 894.
- **Evidence:** Tests `ExclusionVectorScalarWalk`, `ExclusionArrayScalarLibraryShapeWalk`, `GenericBesideTraitMethodInsideWalk`, `GenericInsideTraitMethodWalk`, refusals `ExclusionVectorScalarOverlapWalk`, `GenericInsideTraitMethodReturnRuleWalk`; one scratch measurement; `rung-walk-vector-scalar/REPORT.md` sections 1, 2, 4.
- **Could not resolve:**
  - "own generic": defined only implicitly by F-252 ("declaration with static parameters of its own"); readable with F-252, not alone.
  - "no extender rule of P-146": P-146 is cited by the skill for the self-typed trait form, but which "extender rule" is meant (that an extender of `T[\X\]` must be a subtype of `X`?) is not stated. Language concept I lack / unclear wording.
  - "a call that two declarations fit runs one of them": I read it as walk silently picks one instead of reporting ambiguity, but it could mean something else. Unclear wording.

## F-319

- **Established:** The specification (as it stands now) says `<`, `<=`, `>`, `>=` answer `false` at a NaN and at the rational 0/0; the overview says `CMP` returns `Unordered` at a NaN, and -1/0 and 1/0 are ordered below and above every finite rational. Walk behaves so; the compiled path does so at a NaN (its library has no rational type and no float `CMP`). Nothing raises `FloatingComparisonError` or `RationalComparisonError`, which stay declared. This builds P-159.
- **Conditions:** Walk departs at 0/0 compared with itself: `=`, `<=`, `>=` give `true` and `CMP` gives `EqualTo` (row 440). The team's later restart document still says both comparisons raise.
- **Consequence:** Programs and tests may rely on `false`/`Unordered` at a NaN on both paths; do not rely on 0/0 self-comparison under walk.
- **Evidence:** `opr-overview.tex`, "Comparisons Operators"; Appendix I; `tests/ComparisonAtNaNWalk`; the NaN asserts of the compiled Float and RR32 family tests; `rung-spec-nan-comparison/REPORT.md` sections 1 and 2.
- **Could not resolve:**
  - "The specification says": the entry does not say that this is the revival's edited text (P-159 says the overview said the comparison throws, and is revised). Read alone, it suggests the team's specification said so, which the last sentence about the restart then seems to contradict. Unclear wording.
  - The departure lists `=` at 0/0, but the specified answer for `=` at 0/0 is not given, so I cannot tell what `=` should answer. Unclear wording.

## F-181

- **Established:** The code generator compiles a function, method, object or trait declaration whose own header has a `where` clause, emitting nothing for the clause (the checker enforces it). It refuses every function or method with a contract (row 701). A trait's or object's contract never reaches it, as the disambiguator drops it (row 781). Walk checks a function's `requires` and raises `CallerViolation`.
- **Conditions:** `where` on an `extends` entry: F-255, row 774. Other walls and missing cases: `compiler.md`, "What the compiled path cannot compile yet"; an array comprehension has no case either. Local functions compile except F-320's four forms. A trait whose `comprises` lists a type at a `where`-clause size (`NatParam`'s shape) compiles, but a call that opens a value to the size fails JVM verification (row 307); a generic listed type giving a member's body crashes the code generator (row 812). A function's or method's own clause introducing a `where`-clause variable compiles, but the call dies with `NoClassDefFoundError` (row 867).
- **Consequence:** A compiled program may carry `where` clauses but no function or method contracts; avoid calls of functions whose own clause introduces a variable, and copy the `XXX` forms for such cases.
- **Evidence:** Compiled tests `WhereBoundFunction/Method/Object/TraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`; `XXXFunctionContractCodeGeneration`; the `XXXNatOpenRun` pair; the `XXXWhereVariableCallCompiled` pair; `rung-codegen-where/REPORT.md` sections 1, 2, 5.
- **Could not resolve:**
  - "a call that opens its value to the size": "opens" (passing a value of the trait where a listed type is expected, as `compiler.md` puts it?) is not defined. Unclear wording, resolved only by the skill.
  - "the `XXXNatOpenRun` pair", "the `XXXWhereVariableCallCompiled` pair": a pair of what (the `.fss` and `.test` files, or two tests)? Unclear wording.
  - "the four forms that F-320 names": F-320 names three refusals plus a varargs stop; I count four only by including varargs. Minor.

## P-160

- **Decided:** The one library's `Number` loses its `comprises` clause, so a program may declare its own number type below `Number`, as the team's compiler prelude, the specification and the team's `tests/extendNumber.fss` have it.
- **Applies:** `Number` only; `AnyIntegral`'s clause stays (P-44). Two steps: first walk must read the library's scalar `+`/`-` between an array and a number beside `AdditiveGroup`'s operator, as the compiled checker does (P-152, row 804 walk half); then the clause is removed from `Library/FortressLibrary.fss` and `.fsi`.
- **Requires:** Do not remove the clause before the first step (otherwise walk refuses the library's array operators and most programs). With the removal: give the reflective QuickCheck generator a way to generate a `Number`, give `Number`'s `=` an answer for a type outside the library's number types, and repair the tests that rely on the clause. Why: the clause does no work for the checker (count and distance 0 either way), and vectors and matrices of a program's own complex numbers need it gone.
- **Unfinished:** The second step: the removal, the QuickCheck generator, `Number`'s `=`, and the test repairs. The first step has landed (F-318).
- **Could not resolve:**
  - Whether the second step is still to do: "It goes in two steps" and "The clause stayed until the first step landed" read as if the clause may already be gone, while F-318 measured the removal only in a scratch copy. I read it as not yet done, but the tense leaves it open. Unclear wording.
  - "the reflective QuickCheck generator": not in the skill; what it is, and where it lives, I cannot tell. Missing concept.

## P-159

- **Decided:** On `RR64` and `RR32`, `<`, `<=`, `>`, `>=` answer `false` when either side is a NaN, and `CMP` answers `Unordered`, on both paths, as the team built them. `FloatingComparisonError` stays declared and is never raised. The specification overview's two sentences (float comparison throws `FloatingComparisonError`; rational comparison at 1/0 or 0/0 throws `RationalComparisonError`, `opr-overview.tex:283-288`) are revised, in Appendix I's form, to the rationals chapter's reading: 0/0 compares `false`, the infinities are ordered (F-319).
- **Applies:** Float comparisons at a NaN, and the specification's rational comparisons at 1/0 and 0/0. Why: a software NaN test would slow comparison (noise on today's boxed compiled path, 15-20 % per comparison on unboxed doubles in Java, vectorisation effect open), the team never raised the error, and Java, Swift, Python, Julia and Haskell all answer `false`.
- **Requires:** Do not add a NaN check that raises; do not raise `FloatingComparisonError`; keep it declared.
- **Unfinished:** Nothing for floats; row 672 closed with the specification edit. Walk's 0/0 self-comparison departure (row 440, in F-319) remains.
- **Could not resolve:**
  - "`CMP` gives `Unordered`, on both paths": F-319 says the compiled path's library has no `CMP` on floats. So on the compiled path this holds only after the switch-over, or not yet; the decision does not say. Unclear wording.

## F-?1

- **Established:** When the compiled checker checks the one library (as the count and distance stages do), it reads a helper's Java `String` parameter as the one library's `String` (table `oneLibraryForeignJavaTranslations` in `NamingCzar.java`), while walk refuses at load a helper parameter declared `String` (F-299). So the two stages pass a binding that walk refuses.
- **Conditions:** Only for helper bindings of the one library checked by the compiled checker; in a compile the checker reads Java `String` as `JavaString` (`compiler.md`). Established by reading the code, not by a run.
- **Consequence:** A clean count or distance stage does not show that walk will load the library's helper bindings; a binding with a `String` parameter must be tested under walk. The difference matters for the switch-over's design, when the compiled checker reads the one library's bindings.
- **Evidence:** Code reading of `NamingCzar.java`; `rung-string-natives/REPORT.md`, "Decisions", item 2; `reviews/string-natives-2026-11-05.md`.
- **Could not resolve:**
  - The id "F-?1" is a placeholder, not a number; other entries cannot cite it yet.
  - "In walk's world": I read it as "when the checker checks the interpreter's (one) library rather than the compiler's prelude", which matches `compiler.md`'s note, but the phrase is not defined. Unclear wording.
  - What a worker should do about it (change the table, or match walk) is not said; "bears on the design" leaves it open, which may be intended.
