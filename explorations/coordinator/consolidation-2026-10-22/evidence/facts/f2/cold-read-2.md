# Cold read 2 of `facts/f2/clean.txt`

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these references for terms: `compiler.md`, `interpreter.md`, `gate.md`, `records.md`, `library.md`, `tests-writing.md` (definitions at the top, and `XXX`). All nine entries are facts.

---

## F-25 "On the compiled path, the class loader loads each class under the JDK's class-loading lock"

- **Established:** The compiled path's class loader, `InstantiatingClassloader.loadClass`, takes the JDK's per-name lock, `getClassLoadingLock(name)`, and holds it for the whole load, as the JDK's own `ClassLoader.loadClass` does. So when several threads use a new instantiation of a generic for the first time, the class is made and loaded once, and nothing races. Before the lock, such a race ended the run with a `NullPointerException` (ledger row 417, now fixed).
- **Conditions:** The compiled path only, at the first load of an instantiation's class (a class the loader makes from a template). It was observed at four threads. The test is `compiler_tests/FirstLoadThreadsRungG`: a parallel `for` loop of 800 iterations that calls a generic `f[\T\](v: Vt[\T\])` at eight instantiations, `Vt[\A1\]` to `Vt[\A8\]`.
- **Consequence:** A worker can count on concurrent first loads being safe. A change to the class loader must keep the lock for the whole load. A change near the class loader's first load needs the four-thread atomic runs (`compiler.md`, "Testing an edit here"), which run this test.
- **Evidence:** At four threads the test failed 5 of 5 runs without the lock and passed 5 of 5 with it. It is one of the gate's atomic runs, which run each program at four threads (`gate.md`). Detail: `compile-ladder/rung-generic-runtime/REPORT.md` sections 1 and 12.
- **Could not resolve:**
  - "the generic overload `f[\T\](v: Vt[\T\])`" (wording). "Overload" suggests that `f` has other declarations in the test. The entry does not say which, or whether that matters to the race. Read as "the generic function `f`".
  - "safe on four threads at once" (wording). It could mean "safe at any number of threads, as tested at four" or "shown safe only at four". The lock argument supports the first reading and the evidence only the second. The entry also does not say whether a per-name lock covers a race between two *different* instantiations that share loader state. The test's eight instantiations suggest it does, but the entry does not say so.

## F-26 "Under walk, when one of two applicable declarations has static parameters of its own, the call chooses on their declared domains"

- **Established:** At a call under walk where two declarations apply and at least one of them has static parameters of its own, walk compares their declared domains. If exactly one domain lies strictly inside the other, the inner declaration wins. Source order no longer decides. This builds the curator's P-45 (choose among overloads by declared parameter types) under walk. Definitions:
  - A declaration has static parameters of its own if it is a generic function, a generic constructor, or a functional method with static parameters inside a trait or object that has none.
  - Its declared domain, which walk calls its symbolic instance, is its parameter types, with each type parameter standing for itself under its bounds.
  - Fallback: if neither domain lies inside the other, if the two are equal, or if neither declaration has static parameters of its own, walk compares the domains of the instances that this call makes. So a functional method of a generic trait or object is compared on its instance. A generic dotted method is chosen under F-253 (also on declared domains).
  - After the choice: if the chosen declaration is generic and its instance accepts some argument only through a conversion, walk converts that argument and dispatches again on the converted values, so the most specific declaration for them runs. There is no second dispatch for an overloaded dotted method, or at an argument position whose conversion `Coercions.coercionFor` does not find (for example, a tuple converted element by element).
- **Conditions:** Walk only. It applies to the pairwise comparison of applicable declarations. Known limit: two generic overloads whose static parameters agree in name, kind and bounds share one symbolic instance even when their `where` clauses differ (row 478). No test or library declaration has such a pair today.
- **Consequence:** Under walk, a worker can rely on the more specific declared domain winning, whatever the source order, and on a second dispatch after a conversion into a generic. Do not expect either for an overloaded dotted method or for an element-by-element tuple conversion. Do not write two generic overloads that differ only in their `where` clauses.
- **Evidence:** Gated by `tests/DispatchDeclaredDomain.fss` and `DispatchConvertedAgain.fss`. Detail: `compile-ladder/rung-walk-dispatch/REPORT.md` sections 5.1, 5.2 and 5.5.
- **Could not resolve:**
  - "a functional method with static parameters in a trait or object without any" (wording, two readings). Does a functional method with its own static parameters inside a *generic* trait count as having "static parameters of its own"? The definition read literally says no. That leaves such a method compared only on its instance, but the entry does not say so outright.
  - "If the chosen declaration is generic" (wording). It could mean "has static parameters of its own", the term just defined, or any generic declaration, a functional method of a generic trait included. The second dispatch depends on which one is meant.
  - "share one symbolic instance" (wording). The entry does not say what goes wrong when two overloads share one, for example whether one overload's `where` clause is applied to the other, or whether the pair is wrongly ranked as equal. So I cannot tell what a worker would see if such a pair appeared.
  - "So ... a generic dotted method is chosen by F-253" (wording). The "So" ties this to the definition, which leaves out dotted methods, but that is left to the reader. F-253 is known only by its gloss.
  - "applicable" (wording). Read as "whose parameter types accept the call's arguments, with or without a conversion". The entry does not say whether a declaration that fits only through a conversion counts as applicable in the first choice.

## F-27 "Walk's load check reads again two kinds of overload pair that its parameter-by-parameter check refuses"

- **Established:** Walk's load check has a first, parameter-by-parameter test of overload pairs. When that test refuses a pair, a second test looks again at two kinds of pair and accepts those that pass:
  - (a) A generic declaration beside a plain one, judged on their declared domains. It passes if one declared domain lies strictly inside the other and the inner one's return type lies below the outer one's. If neither domain lies inside the other, it passes only with the cover in (b), or if the two declared domains exclude each other as whole parameter types (F-258). Equal declared domains are refused.
  - (b) Two plain top-level functions (not methods) whose overlap other declarations cover through `comprises` clauses. The check splits the overlap, position by position, into parts by the `comprises` clauses. Each combination of parts must lie inside the domain of some declaration without static parameters that lies below both of the pair. Several such declarations together can cover the overlap. If the search does not settle, the pair is refused.

  Two generic declarations are also judged on their declared domains, under F-252's rules (No Duplicates, Return Type, Meet). This builds P-46 and P-60 under walk.
- **Conditions:** Walk, at load. Cover (b) is for top-level functions only, not methods. The covering declarations must have no static parameters. Known false refusal: the valid three-generic example of the POPL 2019 paper on symmetric multiple dispatch (`research/extracts/ParkPOPL2019-extract.md`, p. 11:13), row 539.
- **Consequence:** A library or test author can rely on these pairs loading: a generic declaration strictly more specific than a plain one, with a fitting return type; a pair whose declared domains exclude each other; and plain top-level functions whose meet is covered through `comprises` by one or more plain declarations below both. Pairs outside these shapes are still refused at load and can stop every program that imports the library (`interpreter.md`). Do not rely on the POPL example's shape loading.
- **Evidence:** Gated by `tests/ComprisesMeetWalk.fss` and `GenericBesidePlain*.fss`, among others. Detail: `compile-ladder/rung-walk-dispatch/REPORT.md` sections 5.3 and 5.4.
- **Could not resolve:**
  - "plain" (wording, two readings). Read as "without static parameters". It could mean "without static parameters of its own" (F-26's term), which would count a functional method of a generic trait as plain, or "not generic in any way". The entry does not define it.
  - Does pair kind (a) also cover methods (functional methods), or only top-level functions, like (b)? "not methods" is attached only to (b), so (a) seems to include methods, but this is not stated.
  - "the pair needs the same cover" (wording). Read as the `comprises` cover of (b). But (b) is stated for top-level functions only, so it is unclear whether a generic-beside-plain pair of methods can be covered.
  - "It builds under walk P-46, by which a conversion never changes which declaration runs when one already fits" (wording). I cannot see how a load check of overload pairs builds a rule about conversions at a call. The link is not explained.
  - "(F-252: the No Duplicates, Return Type and Meet Rules, each over its own instances)" (wording). "Each over its own instances" can be read as each *rule* checked over its own set of instances, or as each *declaration* taken over its own instances. Neither reading is clear, and it seems to sit oddly with "read on their declared domains". The rule names are specification terms (`interpreter.md` names them, after `Specification/advanced/overloading.tex`), so they are not the problem.
  - "lies below both" (wording). Read as "whose domain lies below both of the pair's domains", that is, inside their meet.

## F-29 "Under walk, the load check refuses a trait or object that extends a closed trait of the program's main component"

- **Established:** At load, walk refuses a trait or object that extends a closed trait (a trait with a `comprises` clause) declared in the program's main component, unless that clause allows it. Every trait and object of every component, the library's included, is checked as a possible extender. An extender is allowed if:
  - it lies below a type that the clause lists; or
  - it is a trait whose own `comprises` clause lists only allowed types (recursively); or
  - it is a generic trait that some trait or object extends, and every one of those extenders lies below a listed type.

  This follows `Specification/basic/traits.tex`, "Trait Declarations".
- **Conditions:** Only closed traits of the main component. Not yet checked: clauses declared outside the main component, the library's included (row 551); an object expression's `extends` clause (row 597); and whether each listed type extends the trait at every instantiation (row 598). Extending the check to the library's clauses would today refuse every program that imports `Reflect` (row 595), and four team tests and two demos whose objects extend `Number` or `Exception` directly (row 596).
- **Consequence:** A worker must not extend the check to the library's clauses before rows 595 and 596 are repaired. Those repairs are for the curator to decide. A worker writing a program with a closed trait in its main component must list, or route through an allowed trait, every extender.
- **Evidence:** Gated by `tests/ComprisesUnlistedExtender` and `ComprisesGenericChildUnlistedExtender`, which walk refuses at load. The `XXX` tests of rows 487, 551, 597 and 598 stay green while walk still loads their programs. Detail: `compile-ladder/rung-walk-load-check/REPORT.md` section 5.
- **Could not resolve:**
  - Row 487, "a type of another component below a generic subtrait of a closed trait" (wording, possibly a contradiction). The entry says that the check reads every trait and object of every component as a possible extender, yet row 487's program (an extender in another component, below a generic subtrait) still loads. The entry does not say what the check gets wrong there.
  - "a generic trait that some trait or object extends" (wording). Is a generic trait that nothing extends allowed (vacuously) or refused? "some" suggests that at least one extender is required. It is also not said why only a *generic* trait gets this third case, rather than any trait without a `comprises` clause.
  - "the program's main component" (term not defined in the skill). Read as the component that the command runs.
  - "Their repairs ... are the curator's" (wording). Read as "the curator decides them", not "the curator carries them out".

## F-32 "The compiled path cannot reuse walk's glue classes"

- **Established:** The library's natives are bound by `builtinPrimitive("…")` bodies, whose string names a glue class under walk's `interpreter/glue/prim/`. Those classes take walk's boxed values, so the compiled path cannot call them. It needs static helpers over plain Java values in `nativeHelpers/`. At `e455ccd98` (2026-09-29) the library had 424 such bindings, classified against the existing helpers:
  - 147 whose operation the compiler's prelude already binds to a helper with the same owner and signature: only the binding's string needs to change (P-58);
  - 61 whose helper exists but is not bound under that name and signature, 25 of them under a name that the compiler's prelude gives to another helper (for example the 12 wrapping operators, row 348);
  - 138 that need a new helper;
  - 78 that need more: 36 methods of native I/O objects, and 42 with no compiled analogue.

  Since then, `9d2e4c856` (2026-10-02) made 24 more `IntLiteral` bindings in `FortressBuiltin.fss` live (five conversions `asZZ32` to `asZZ`, and 19 operators that had been commented out). These are not classified.
- **Conditions:** The counts hold at `e455ccd98`, plus the 24 unclassified ones since. Needs of every program and of microGPT:
  - Every program's output needs `Writer`'s natives, which are among the 36 I/O methods, because `println` writes through a native `Writer`.
  - MicroGPT also needs `nanoTime`, which needs a new helper because the compiled one returns `RR64`.
  - MicroGPT also needs `getProgramArgsPrim` (called as `System` loads) and `NativeArray`. Neither has a compiled analogue.
- **Consequence:** Moving the bindings onto helpers is PLAN phase 4's work ("The natives"). The 42 with no analogue are outside its rungs. `NativeArray` waits for the curator's array decision on a float vector's `double[]` store (P-85). `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path (PLAN.md:81). A worker should not try to reuse glue classes on the compiled path, and should classify the 24 new `IntLiteral` bindings before relying on the counts.
- **Evidence:** The classification in `perf-probes/prelude/natives-shape.md` section 2.
- **Could not resolve:**
  - "at the same owner and signature" (wording, two readings). "Owner" could be the Fortress type that declares the operation, or the Java class that holds the helper.
  - "61 whose helper exists, but no binding names it under that name and signature, 25 of them under a name that the compiler's prelude gives to another helper" (wording). I cannot parse which "binding" is meant (the library's, or the compiler's prelude's), or which "name" (the Fortress operation's or the helper's). So I cannot say what the 61 need beyond "more than a string change", or what the clash in the 25 is.
  - `getProgramArgsPrim` (wording, apparent gap). MicroGPT needs it and it has no compiled analogue, so it seems to be among the 42 "outside [phase 4's] rungs". But the entry names a plan only for `NativeArray` (P-85) and for the off-path natives. Where `getProgramArgsPrim` is to be built is not said.
  - "PLAN phase 4, 'The natives'" (wording). The skill gives phase 4 as "the switch-over". So "The natives" is presumably a part of phase 4, not its name. Minor.
  - "since the compiled one returns `RR64`" (wording). The library's `nanoTime` presumably returns an integer type, but the entry does not say which.

## F-34 "In single measurements of September 2026, only the checker stood between the interpreter's library and bytecode"

- **Established:** Single runs in September 2026 found that, with the interpreter's `FortressLibrary` as the compiled path's prelude, the phases after the checker refused almost nothing that the checker accepted:
  - Disambiguation reported no error (2026-09-16).
  - With the checker's failures caught per declaration, desugaring and the overload rewriting reported none (2026-09-20).
  - Code generation, on the library at `2851e5086` (after the number types became siblings, 2026-09-27), emitted 326 declarations and refused 225. Only 4 of those 225 had passed the checker: two `asif` expressions (`AsIfExpr`), one local function declaration (`LetFn`), and one call on a receiver of intersection type. The other 221 were declarations that the checker failed, and overloads that the overload rewriting made.
  - In a second run, with dispatch generation on, the dispatch generator refused 12 of 198 overload sets as "apparently malformed". Its message blames a functional method and a top-level function with the same signature.
  - Compiled instead as an ordinary component beside the compiler's own prelude, the library gave 1,417 disambiguation errors. This is an artifact of two preludes in scope at once, not a real defect count.
- **Conditions:** One measurement each, in September 2026, on the trees named. The gate's distance stage does not run code generation, and the record holds no later code-generation measurement. So the result may be stale for today's library.
- **Consequence:** Reaching distance zero (checker) is the main obstacle to the switch-over. A worker should still expect the four code-generator walls (`asif`, local functions, intersection receivers) and the 12 malformed overload sets to need work. A worker must not take the 1,417 errors as real, and must re-measure before relying on these numbers.
- **Evidence:** `perf-probes/prelude/REPORT.md` sections 1 and 2; `perf-probes/prelude/desugar-codegen.md` section 4.2; detail in `perf-probes/prelude/switch-over-distance-flat.md` sections 3 and 4.
- **Could not resolve:**
  - The 12 "apparently malformed" overload sets (wording). The entry does not say whether they belong to declarations that the checker passed. If they do, they count against "almost nothing", which the title does not reflect.
  - "and overloads that the overload rewriting made" (wording). Were these refused because they contain checker-failed members, or for their own reasons? The entry does not split the 221 between the two.
  - "Only 4 of the 225 were declarations ...: two `asif` expressions ..." (wording, minor). Read as declarations that *contain* these constructs.

## F-35 "The `FortressLibrary` api has 9 declarations with a dead size"

- **Established:** Nine declarations of the `FortressLibrary` api have a `nat` static parameter that appears in no parameter type or return type:
  - the three one-dimensional `subarray` methods (`nat o`);
  - the two-dimensional `subarray` (`nat o0`, `nat o1`);
  - the three-dimensional `subarray` (`nat o0` to `nat o2`);
  - the traits `Rank`, `Indexed1`, `Indexed2` and `Indexed3`, whose `nat n` appears in no member's type. It still serves to tell `Rank[\1\]` from `Rank[\2\]`, as in `Rank1 extends Rank[\1\]` (`FortressLibrary.fsi:1221`).

  The component's `subarray` bodies use the offsets as values. The api declarations check clean, because a size that reaches no type, name or value is not an error (P-40).
- **Conditions:** The api as it stands now. The census of 2026-09-21 found 25 and missed the three-dimensional `subarray`. The 17 vector and matrix operators among them have since lost their sizes (P-40), leaving the census's other 8, plus the missed one, which makes 9.
- **Consequence:** A worker must not remove these sizes on their own. Their removal goes to the curator as a diff, together with the switch-over's design (review-queue item 36; PLAN, "Pavol's answers, in the order they are needed", item 12). A worker must not drop a dead size from a component's declaration while the api keeps it: the export checker compares static-parameter lists by length, name and kind, and would report the api's declaration as missing.
- **Evidence:** `perf-probes/nat/REPORT.md` section 2 (the 25, by line) and section 7 (the export checker). FACTS form: the entry names no test that would fail if the fact stopped holding.
- **Could not resolve:**
  - "The removal of the census's other 8" (wording). Does the diff that goes to the curator include the ninth, the three-dimensional `subarray` that the census missed? Read literally, it covers only the 8.
  - "a diff with the switch-over's design, which is not drafted" (wording, two readings). Either the diff is not drafted, or the switch-over's design is not drafted.
  - The traits' `nat n` (wording). The entry calls it dead, yet says it tells `Rank[\1\]` from `Rank[\2\]`. So it does carry meaning through `extends`. Whether its removal is proposed for the traits too, and what would replace it, is not said.

## F-37 "On the compiled path, a `typecase` clause on a sized type ... tests the value's own class"

- **Established:** On the compiled path, a `typecase` clause on a type with a size, such as `Vec[\ZZ32,3\]`, compiles to one `INSTANCEOF` on the instantiation's class (`Vec⟦FZZ32,3⟧`). This holds also when the size is a static parameter of the enclosing function, because the class loader puts the size into the function's instance. So a `typecase` tells `Vec[\ZZ32,3\]` from `Vec[\ZZ32,4\]` without reading the size's descriptor (P-41).
- **Conditions:** The compiled path. Limit: a `typecase` that forms a whole function body, with clauses that need a coercion, fails in code generation, with or without a size (row 340).
- **Consequence:** A worker can rely on `typecase` distinguishing sizes on the compiled path, also in generic code, with no run-time read of a size descriptor. Avoid, or record against row 340, a whole-body `typecase` whose clauses need coercions.
- **Evidence:** Gated by `compiler_tests/NatRtCase` and `NatRtCaseGen`. The bytecode was read in `perf-probes/nat/size-probes.md` section 4.
- **Could not resolve:** nothing material. "Clauses that need a coercion" is read as clauses whose matched value must be converted to the clause's type or to the function's return type. The entry does not say which.

## F-39 "An operator static argument is a name substituted when the declaration is instantiated"

- **Established:** An `opr` static parameter (as in `object Op[\opr ODOT\]() end`) is a compile-time name. The specification and walk substitute the operator's name into the methods of the declaring trait or object. The compiled path carries it in the name of the instantiation's class. Unlike a type or a size, the operator has no run-time descriptor (P-41), and no code reads it at run time.
- **Conditions:**
  - Usage: no live declaration of the library has an `opr` static parameter. `FortressLibrary`'s two, in `embiggen` and `Monoid`, are inside comments. Nine test files in `tests/`, `compiler_tests/` and `other_compiler_tests/` declare one.
  - Open defect: compiled, `Op[\+\]()` dies with `NoSuchMethodError` on `Op❮+❯$RTTIc.factory()`, the factory of the instance's descriptor class. Walk prints `Op[\+\]` (row 366, open; expected failure `compiler_tests/XXXOprParamRungS`).
- **Consequence:** A worker need not build a run-time representation for operator static arguments. A worker fixing row 366 can start from a measured three-line change to `MethodInstantiater`. It fixes the probe `compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss`, but is not landed and was not run on the gated `XXXOprParamRungS`, so that must be done, and the `XXX` test promoted.
- **Evidence:** `perf-probes/nat/opr-kind-history.md` sections 2 and 3; the probe's measurement in `perf-probes/nat/size-probes.md` section 5.
- **Could not resolve:**
  - "substitute the operator's name into the declaring trait's or object's methods" (wording). Only traits and objects are named. Whether a generic *function* with an `opr` parameter is treated the same way is not stated, though the title's "the declaration" suggests it is.
