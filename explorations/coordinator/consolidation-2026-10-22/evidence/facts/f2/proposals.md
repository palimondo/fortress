<!-- The FACTS clarity pass, chunk f2, 2026-10-22: F-25, F-26, F-27, F-29, F-32, F-34, F-35, F-37 and F-39 rewritten from the chunk's assessment and fixed from its cold read and check, each with its change of meaning, the source of each sentence and its questions. -->

# FACTS chunk f2: the rewrite

The base is `main` as `assessment.md` read it. The assessment keeps F-28 and F-38 and sends F-36 to investigation, so this file holds the other nine. Each sentence's source was read again for this pass. A section number is that of the report named. Concepts that the entries use and that every worker needs are in `concepts.md`.

The second round follows `check.md` and `cold-read.md`. Each entry's "Second round" line says what changed. The record holds one line per entry, so the entries keep their lists inline.

The nine entries hold 5,957 bytes in the record and 13,275 here. The growth is the names that replace the batches' short forms, the words that say what each pointer holds, and the conditions that the old text left to the reader.

## F-25

> - F-25 **On the compiled path, the class loader loads each class under the JDK's class-loading lock, so the first load of an instantiation's class is safe on four threads at once.** `InstantiatingClassloader.loadClass` holds `getClassLoadingLock(name)` for the whole load, as the JDK's own `ClassLoader.loadClass` does. Without the lock, two threads that first loaded such classes at the same time could race, and the run died with a `NullPointerException` (row 417, fixed). The test `compiler_tests/FirstLoadThreadsRungG` calls the generic overload `f[\T\](v: Vt[\T\])` at eight instantiations, `Vt[\A1\]` to `Vt[\A8\]`, from a parallel `for` loop of 800 iterations. Observed: at four threads it failed 5 runs of 5 before the lock, and passed 5 of 5 after. It is one of the gate's atomic runs, which run each program at four threads (`gate.md`). Detail: `compile-ladder/rung-generic-runtime/REPORT.md` sections 1 (the runs) and 12 (why this lock).

Meaning: unchanged. "A generic arm's first load" is now the first load of an instantiation's class, the term of the `fortress-repo` skill's "The compiled run time".

Second round: "eight instances" is now the test's eight instantiations, named from the test file, as the check proposes. The title keeps "four threads", since that is the measured case.

Sources:
- Title and the lock: `InstantiatingClassloader.java:178-183`; report section 1, item 1.
- The race and its exception: report section 1 (`NullPointerException ... "cl" is null`); gap-ledger row 417, FIXED.
- The test's shape: `compiler_tests/FirstLoadThreadsRungG.fss`.
- The runs: report section 1, item 1 (`threads-before.txt`, `threads-after.txt`).
- The atomic runs: the `fortress-repo` skill's `gate.md`, "The atomic runs"; the assessment's reading of the batch workflow script.

Questions for the curator: none.

## F-26

> - F-26 **Under walk, when one of two applicable declarations has static parameters of its own, the call chooses on their declared domains where exactly one lies inside the other, not by the order in which they are written.** It builds P-45, the choice among overloads by declared parameter types, under walk. A declaration has static parameters of its own if it is a generic function or constructor, or a functional method with static parameters in a trait or object without any. Its declared domain, walk's symbolic instance, is its parameter types with each type parameter standing for itself under its bounds. Where neither declared domain lies inside the other, where each lies inside the other, or where neither declaration has static parameters of its own, walk compares the domains of the instances that the call makes. So a functional method of a generic trait or object is compared on its instance, and a generic dotted method is chosen by F-253 (a generic method at a dotted call, also chosen on declared domains). If the chosen declaration is generic and its instance takes an argument only by a conversion, walk converts the argument and dispatches the converted arguments again, so the most specific declaration for the converted values runs. In two cases walk keeps the chosen instance, with no second dispatch: an overloaded dotted method, and a position whose conversion `Coercions.coercionFor` does not find, such as a tuple converted element by element. Two generic overloads whose static parameters agree in name, kind and bounds share one symbolic instance, even if their `where` clauses differ; no test or library declaration has such a pair (row 478). Gated by `tests/DispatchDeclaredDomain.fss` and `DispatchConvertedAgain.fss`. Detail: `compile-ladder/rung-walk-dispatch/REPORT.md` sections 5.1, 5.2 (the second dispatch) and 5.5 (the symbolic instance).

Meaning: two corrections of scope and one exception restored, all from the code.
- The title is bounded. The old title, "Walk chooses between a generic declaration and another on their declared domains", held for every generic. The code compares declared domains only when one declaration has static parameters of its own, and only where exactly one domain lies inside the other (`OverloadedFunction.moreSpecificDeclaration`, `:2536-2543`; `ownGeneric`, `:2439-2451`).
- "A generic trait's functional method" is now "a functional method of a generic trait or object", as `ownGeneric`'s comment, P-45 and F-252 have it.
- The second exception to the second dispatch is restored: `convertedCall` returns the first instance where `Coercions.coercionFor` finds no conversion (`:2432`; report section 5.2).
- The generic dotted method's rule restated F-253; it is now a pointer to F-253, which names the test `MethodStaticArgDeclaredDomain`.
- The cache-key sentence gains its consequence from row 478's notes, "a `where` clause is still not in the cache key ..., reached by no test or library declaration".

Second round:
- The second dispatch is bounded again to a chosen generic declaration, as the old text had it. The first round had dropped that condition. Source: `bestMatchInternal`, `if (reinstantiate && best_generic != null)` (`:2331`); report section 5.2.
- "In every other case" now names its cases: neither domain inside the other, each inside the other, or no declaration with static parameters of its own.
- The two exceptions now say what walk does: it keeps the chosen instance, with no second dispatch. `convertedCall` returns `inst` for an `OverloadedMethod` (`:2421`) and where `coercionFor` returns null (`:2432`).
- The pointer to F-253 says what F-253 holds.

Sources:
- Title, the two conditions and the cases that fall to the instances: `moreSpecificDeclaration` and its fall-through to `FTypeTuple.moreSpecificThan`; report section 5.1, "Where the declared domains do not order two candidates, the instances decide as before".
- P-45's words: P-45, "Walk chooses among overloads by the parameter types that each declaration declares".
- Static parameters of its own: `ownGeneric` and its comment.
- Declared domain: report section 5.1, "A generic declaration's declared domain is its symbolic instantiation"; the comment above `ownGeneric`'s neighbour at `:2453-2456`.
- F-253's gloss: F-253's title, "the method is chosen on its declared domain".
- The second dispatch and its exceptions: report section 5.2; `bestMatchInternal`, `:2331`; `convertedCall`, `:2416-2436`.
- The symbolic instance's key: report section 5.5; gap-ledger row 478.
- Tests: the old entry; the files exist in `ProjectFortress/tests/`.

Questions for the curator: none.

## F-27

> - F-27 **Walk's load check reads again two kinds of overload pair that its parameter-by-parameter check refuses, and accepts those that pass: a generic declaration beside a plain one, read on their declared domains, and two plain top-level functions, not methods, whose overlap other declarations cover through `comprises` clauses.** To test a cover, the check cuts the overlap of the two domains, position by position, into parts by the `comprises` clauses. Each combination of parts must lie inside the domain of one declaration without static parameters that lies below both. So several such declarations may together cover the overlap. A search that does not settle refuses. A generic declaration beside a plain one passes where one declared domain lies strictly inside the other and the inner one's return type lies below the outer one's. Where neither lies inside the other, the pair needs the same cover, or declared domains that exclude each other read whole (F-258, exclusion over the whole parameter type). Equal declared domains are refused. It builds under walk P-46, by which a conversion never changes which declaration runs when one already fits, and P-60, by which several declarations below both may cover a meet. Two generic declarations are read on their declared domains too (F-252: the No Duplicates, Return Type and Meet Rules, each over its own instances). Walk still refuses the valid example of the POPL 2019 paper on symmetric multiple dispatch (`research/extracts/ParkPOPL2019-extract.md`, p. 11:13), a set of three generic declarations (row 539). Gated by `tests/ComprisesMeetWalk.fss` and `GenericBesidePlain*.fss`, among others. Detail: `compile-ladder/rung-walk-dispatch/REPORT.md` sections 5.3 (generic beside plain) and 5.4 (the cover).

Meaning: two corrections. First, the old text, "An overlap passes only if one declaration below both covers all of it", is the reverse of the code. Coverage is per part: each combination of parts lies inside one declaration, so several declarations together cover the overlap. The text of 2026-10-13 19:03Z still had it ("Both need every part of the overlap inside one declaration below both"); the text of 2026-10-17 19:33Z lost "part". The entry now agrees with P-60. Second, the generic-beside-plain rule is given whole, from the code. Report section 5.3 was written before `domainsExcludeTogether`, so the old text and the first round omitted that a pair whose declared domains exclude each other also passes.

Second round:
- The title no longer says that the check accepts every pair of the two kinds. It reads them again, and accepts those that pass.
- The rule for a generic beside a plain declaration now holds its three cases: one domain inside the other with the Return Type Rule; neither inside, with a cover or an exclusion read whole; equal domains refused. Source: `validOnDeclaredDomains`, `OverloadedFunction.java:787-795`; F-258.
- The cover is bounded to top-level functions. `overlapCovered` returns false for a dotted method (`:1606`) and for a functional method (`:1610`). Report section 5.4: "The search is not used for functional or dotted methods, whose Meet Rule is another."
- P-46's gloss was P-45's content. It now states P-46's decision. This check is that decision's item 4 (report section 5.3, "(the conversion decision's item 4)").
- The pointer to F-252 says what it holds. The POPL 2019 paper is named, with its extract and page.

Sources:
- Title: the old title; report sections 5.3 and 5.4; `overlapCovered`, `:1602-1612`.
- The parts and the cover: `overlapCoveredBy`'s comment, `OverloadedFunction.java:1623-1632`; report section 5.4, "a covering family, not one declaration that handles part of the overlap".
- A search that does not settle refuses: the same comment; report section 5.4.
- Generic beside plain: `validOnDeclaredDomains`, `:787-795` (`NO_DUPLICATES`, `returnTypeRule`, `genericOverlapCovered`, `domainsExcludeTogether`); report section 5.3; F-252; F-258.
- P-46 and P-60: P-46, "A conversion only makes a call possible: it never changes which declaration runs when one already fits"; P-60, "several declarations below both serve, if together they cover the meet".
- Two generic declarations: the old entry; F-252's title.
- Row 539 and the paper: gap-ledger row 539 ("the POPL 2019 paper (p. 11:13)"); the `fortress-repo` skill's `references/exploring.md`, which names the extract.
- Tests and detail: the old entry.

Questions for the curator: none.

## F-29

> - F-29 **Under walk, the load check refuses a trait or object that extends a closed trait of the program's main component where the trait's `comprises` clause does not allow it.** A closed trait is one with a `comprises` clause. The check reads every trait and object of every component of the program, the library's included, as a possible extender. An extender is allowed in three cases: it lies below a listed type; it is a trait whose own `comprises` clause lists only types that are allowed in turn; or it is a generic trait that some trait or object extends, and each of those extenders lies below a listed type (`Specification/basic/traits.tex`, "Trait Declarations"). The check does not yet read a clause declared outside the main component, the library's among them (row 551), or an object expression's `extends` clause (row 597). Nor does it check that each listed type extends the trait at every instantiation (row 598). A check that read the library's clauses would refuse at load every program that imports the library's `Reflect` (row 595), and four team tests and two demos whose objects extend `Number` or `Exception` directly (row 596). Their repairs come before that check and are the curator's. Gated by `tests/ComprisesUnlistedExtender` and `ComprisesGenericChildUnlistedExtender`, refused at load, and by the `XXX` tests of rows 487 (a type of another component below a generic subtrait of a closed trait), 551, 597 and 598, which stay green while walk still loads their programs. Detail: `compile-ladder/rung-walk-load-check/REPORT.md` section 5.

Meaning: two corrections, one sentence moved out.
- Rows 595 and 596 are not the gap "the library's clauses". They are breaches of closed traits by the library's `Reflect` and by team tests and demos. A check that reads the library's clauses would refuse those programs, so their repairs come first. Row 551 is the gap: walk does not check a clause declared outside the main component.
- Row 549 is dropped from the `XXX` list. It is FIXED, and its test is now the plain `tests/GenericBesidePlainSameDomain`, which gates a refusal of a generic beside a plain declaration, not a `comprises` clause.
- The harness key, "a `.test` file beside a test of `tests/` names its expected refusal by `load_exception_contains`", leaves the entry. The `fortress-repo` skill owns it (`references/tests-writing.md:44`). F-102 points to F-29 for it: see "For the coordinator".

Second round:
- The first round said that the two breaches wait for a check that reads the library's clauses. The rows say the reverse: such a check would refuse those programs, and each repair must come first and is the curator's. "Team tests" now also names the two demos.
- The rules for an allowed extender are spelled out, from `ineligible`.
- "Every trait and object of the program" now says that the library's are included.
- Row 487 says what gap it is.

Sources:
- Title and the extenders read: report section 1, "Row 551"; section 5, "The check" (`BuildEnvironments.checkComprisesClauses`; "every trait and object declaration of every component of the program"; clauses of the main component, `:1186`).
- The rules for an extender: `BuildEnvironments.ineligible` and `closedAndCovered` (`interpreter/evaluator/BuildEnvironments.java:1341-1364` today); report section 5, the three rules; `traits.tex:235-252`.
- What it does not read: gap-ledger rows 551, 597 and 598.
- The two breaches and their repairs: gap-ledger row 595, "The repair, a library edit before the check reads the library, is the curator's"; row 596, "four team tests and two demos", "The repair, a team-test edit, is the curator's".
- Tests: `ProjectFortress/tests/ComprisesUnlistedExtender.test` and `ComprisesGenericChildUnlistedExtender.test`; the `XXX` files with `.test` keys of rows 487 (`XXXComprisesGenericChildAcrossComponents`), 551, 597 and 598, named as reproducers in their rows; what a green `XXX` test with a load key means, `tests-writing.md:44`.

Questions for the curator: none.

## F-32

> - F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that the one library's native bindings name; at `e455ccd98` (2026-09-29) the library had 424 such bindings.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values. The compiled path calls static helpers over plain Java values instead, in `nativeHelpers/`. Matched against those helpers, the 424 bindings were: 147 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 61 whose helper exists, but no binding names it under that name and signature, 25 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 138 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Since the count, `9d2e4c856` (2026-10-02) made 24 more `IntLiteral` bindings in `FortressBuiltin.fss` live: the five conversions `asZZ32` to `asZZ`, and the 19 operators that had stood inside a comment. They are not classified. Every program's output needs `Writer`'s natives, among the 36 I/O methods, since `println` writes through a native `Writer`. MicroGPT also needs `nanoTime`, which needs a new helper, since the compiled one returns `RR64`; `getProgramArgsPrim`, which `System` calls as it loads; and `NativeArray`. The last two have no compiled analogue. PLAN phase 4, "The natives", moves the bindings onto helpers. The 42 with no analogue are outside its rungs: `NativeArray` waits for the array decision on how a float vector's `double[]` store goes (P-85), and `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path (PLAN.md:81). Detail: `perf-probes/prelude/natives-shape.md` section 2.

Meaning: the count is bounded to its measurement, and the bindings after it are corrected from five to 24. The old title stated 424 as current. The note's section 2 counted it at `e455ccd98`. "`nanoTime`, whose compiled helper returns `RR64`" is again "`nanoTime` needs a new helper", as the note's class C and the text of 2026-10-13 18:38Z have it. "They are PLAN's phase 4" had no clear referent; it now says what phase 4 does and what stays outside it.

Second round:
- The first round said that the count leaves out five `IntLiteral` conversions, as the text of 2026-10-13 and the assessment said. The check's recount, which strips nested comments, gives 424 at `e455ccd98` and 448 at `ef0bbbf17`. `9d2e4c856` also removed the team's comment around `IntLiteral`'s 19 operators ("Do not enable these until coercion is implemented"). So 24 bindings came after the count.
- Class A now says what "a new text" is: the binding's string, renamed to the helper that the compiler's prelude already binds.
- Class B no longer says that nothing binds the helper. The note says that nothing binds it under this name and signature.
- `Writer`'s natives are placed among the 36 I/O methods (class D1).
- "The 42 wait" now says what each waits for, from PLAN.md:81.

Sources:
- The glue classes and the helpers: natives-shape.md section 2, "The mechanisms" and "The classes"; the `fortress-repo` skill's `interpreter.md`, "Natives".
- 424 at `e455ccd98`: natives-shape.md section 2, "Recounted on `main` at `e455ccd98`".
- The classes: the same section, "The classes"; 138 is class C's 139 less the one `RR32` binding of the recount, as PLAN.md:81 has it; class B, "nothing binds it under this name and signature yet".
- The 25 and row 348: "What the classes hide", "Same name, other meaning".
- The 24 bindings after the count: `git show 9d2e4c856` (2026-10-02), its message, "enables the arithmetic the team's comment withheld"; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` today; the check's recount (`check.md`, F-32).
- `Writer`, `nanoTime`, `getProgramArgsPrim`, `NativeArray`: "What the classes hide", "Every program's output is D1" and "microGPT's path"; "The size of C", "`nanoTime` 1 (the compiled one returns `RR64`)".
- Phase 4 and what stays outside it: PLAN.md:81, "The rest, class D2, waits: `NativeArray` with decision A, `Thread`, `Reflect` and `printTaskTrace` off microGPT's path"; P-85 names decision A, "how the `double[]` store goes under a float vector".

Questions for the curator: none. Two points on PLAN are under "For the coordinator".

## F-34

> - F-34 **In single measurements of September 2026, only the checker stood between the interpreter's library and bytecode: disambiguation, desugaring and code generation refused almost nothing that the checker passed.** With `FortressLibrary` as the compiled path's prelude, disambiguation reported no error (2026-09-16, `perf-probes/prelude/REPORT.md` section 2). With the checker's failures caught per declaration, desugaring and the overload rewriting reported none (2026-09-20, `perf-probes/prelude/desugar-codegen.md` section 4.2). On 2026-09-27, on the library at `2851e5086`, after its number types became siblings, code generation on `FortressLibrary.fss` emitted 326 declarations and refused 225. Only 4 of the 225 were declarations that the checker passed: two `asif` expressions (`AsIfExpr`, `e asif T`, `Specification/basic/expressions/type-annotation.tex:36`), one local function declaration (`LetFn`) and one call on a receiver of intersection type. The other 221 were declarations that the checker failed on, and overloads that the overload rewriting made. In a second run, with dispatch generation on, the dispatch generator refused 12 of 198 overload sets as "apparently malformed"; its message names a functional method and a top-level function of the same signature as the probable cause. The gate's distance stage does not run code generation, and the record holds no later measurement of it. Compiled as an ordinary component, beside the compiler's own prelude, the library gave 1,417 disambiguation errors: an artifact of the two preludes in scope at once (`perf-probes/prelude/REPORT.md` section 1). Detail: `perf-probes/prelude/switch-over-distance-flat.md` sections 3 (code generation) and 4 (the dispatch generator).

Meaning: the claim is scoped to its measurements, and two wordings corrected.
- The old title, "Between the interpreter's library and bytecode stands the checker", was stated as current, while its body showed code generation refusing 4 declarations that the checker passes. The title now bounds the claim to its measurements and says "almost nothing".
- "All collisions between the two preludes" was too strong: 1,110 of the 1,417 are collisions, 289 are undefined names, and the report calls the whole number an artifact of both preludes in scope (prelude/REPORT.md section 1). The entry now says "an artifact".
- The shape of the 12 refused overload sets was stated as fact. It is the generator's probable cause, in its own message.
- Added from the note's section 5: the distance stage does not run code generation. That is the assessment's narrow gap, stated in the entry so that a reader does not take the measurement as current.

Second round:
- The 12 overload sets come from a second run, with dispatch generation on (note section 4). They are not among the 225. Their shape is now the generator's probable cause, as its message gives it (`compiler/OverloadSet.java:408`, "Probable cause is a functional method and top level function with same signature").
- "So nothing has measured it since" was an inference from the stage. It now says what was found: the record holds no later measurement. The check searched `explorations/` and found only the three September notes.
- `AsIfExpr` and `LetFn` are glossed in place, since only this entry uses them.

Sources:
- Disambiguation with `FortressLibrary` the prelude: prelude/REPORT.md section 2, "DISAMBIGUATE: clean"; the note's creation, `a98c3d0b2`, 2026-09-16.
- Desugaring and overload rewriting: desugar-codegen.md section 4.2; its header, measured 2026-09-20; the text of 2026-10-13 18:38Z, "With the checker's failures caught per top-level declaration".
- Code generation, the 326, 225 and 4: switch-over-distance-flat.md section 3, table and "The four on declarations the checker passed"; its header, 2026-09-27 at `2851e5086`, the flat number tower beneath it.
- `asif`: `Specification/basic/expressions/type-annotation.tex:35`, the grammar `Expr asif Type`.
- The other 221: the same table, rows "on one it reported errors on", "on one it crashed on" and "synthesized by overload rewriting".
- The dispatch generator: the same note, section 4 (the second run, 325 emitted and 228 refused; the message of `OverloadSet.java:408`).
- No later measurement: the same note, section 5, "Code generation is not in it"; `tools/distance/run.sh` runs `DistanceMulti -order check`; the check's search of `explorations/`.
- The 1,417: prelude/REPORT.md section 1.

Questions for the curator: none.

## F-35

> - F-35 **The `FortressLibrary` api has 9 declarations with a dead size: a size parameter that occurs in none of the api declaration's parameter types or return type.** They are the three one-dimensional `subarray` methods, with `nat o`; the two-dimensional `subarray`, with `nat o0` and `nat o1`, and the three-dimensional one, with `nat o0` to `nat o2`; and the traits `Rank`, `Indexed1`, `Indexed2` and `Indexed3`, whose `nat n` occurs in no member's type but tells `Rank[\1\]` from `Rank[\2\]`, as `Rank1 extends Rank[\1\]` does (`FortressLibrary.fsi:1221`). The component's `subarray` bodies read their offsets as values. The api declarations check clean, since a size that reaches no type, name or value is no error (P-40). The census of 2026-09-21 found 25 and missed the three-dimensional `subarray`; the 17 vector and matrix operators have lost their sizes since (P-40). The removal of the census's other 8 is to go to the curator as a diff with the switch-over's design, which is not drafted (review-queue item 36; PLAN, "Pavol's answers, in the order they are needed", item 12). Where a component declares a function without the api's dead size, the export checker reports the api's declaration as missing, since it compares static-parameter lists by length, name and kind. Detail: `perf-probes/nat/REPORT.md` sections 2 (the 25, by line) and 7 (the export checker).

Meaning: three changes, each settled by a source.
- The count is 9, not 8. The three-dimensional `subarray` (`FortressLibrary.fsi:1850-1852`) is live, and `o0`, `o1` and `o2` occur in no parameter or return type. It stood at `:1687-1688` at `bc2f4e5c2`, the census's commit, and the report's list of 25 lacks it: its static parameters span two lines. The coordinator may take this or send it to a recount.
- "Or body" is dropped, and the entry says that the component's bodies read the offsets. The report's rule, "no domain, no range and no body", holds for the api only, which has no bodies. A diff that deletes the offsets deletes values that the component uses.
- The removal is a diff not yet drafted, not a pending one.

Chronology moved out, as in the first round:
- The origin sentence, the oldest library of 2007-01-04 (`72ae6881b`) and the 2008 fix (`32153798d`), described the six vector forms that are now gone, and read as the origin of the declarations that remain. It goes to the history.
- "They go only by a diff shown to the curator" was P-40's sentence until 2026-10-22 08:30Z. P-40 no longer states it. Its home is review-queue item 36, "Each is put to him as a diff with the switch-over's design, which is not drafted yet", and PLAN's item 12 under "Pavol's answers, in the order they are needed". The entry points there, without stating it as his ruling. That item names "the other unused sizes of the 25", so the entry bounds the removal to the census's 8.
- The bare "F-264" held the casts of the same change, not the dead sizes; it is dropped. P-40 records the 17 operators' sizes as gone.

Second round: the three changes above; the PLAN item named by its section, since PLAN.md:52 under Phase 3 is also an item 12; the traits' `nat n` explained by `Rank1 extends Rank[\1\]`, where the cold reader saw a conflict between "dead" and "part of the type's identity".

Sources:
- The 9, by name: report section 2 (the 25 by line); 25 less the 17 of P-40; the api today, `FortressLibrary.fsi:1214-1239` (`Rank`, `Indexed1` to `Indexed3`), `:1552`, `:1574`, `:1604` (`nat o`), `:1717` (`nat o0, nat o1`), `:1850-1852` (`nat o0, nat o1, nat o2`); the check's nesting-aware scan (`check.md`, F-35).
- The traits' size: `FortressLibrary.fsi:1214` and `:1221`; report section 2, "four traits whose parameter is part of their identity".
- The bodies: `FortressLibrary.fss:2398-2400` (`boundsCheck = self.bounds.narrowToRange(o::m#s)`), `:2456-2458`, `:2729-2732`.
- Check clean: report section 2, "Decision E2, concretely"; P-40, "a declaration may declare a size that none of its types uses, and pass".
- The census of 2026-09-21: the report's creation, `bc2f4e5c2`.
- The 17 operators: P-40, "The 17 vector and matrix operators of the `FortressLibrary` api lose their unused sizes".
- The diff not drafted: review-queue item 36; PLAN.md:128, item 12 under "Pavol's answers, in the order they are needed".
- The export checker: report section 7 (`equalListStaticParams`, by length, name and kind).

Questions for the curator: none.

## F-37

> - F-37 **On the compiled path, a `typecase` clause on a sized type, such as `Vec[\ZZ32,3\]`, tests the value's own class, also when the size is a static parameter of the enclosing function.** The test is one `INSTANCEOF` on the class of the instantiation, `Vec⟦FZZ32,3⟧`. In a generic function, the class loader puts in the size when it makes the function's instance. So a `typecase` tells `Vec[\ZZ32,3\]` from `Vec[\ZZ32,4\]`, and does not read the descriptor that a size has (P-41). Limit: a `typecase` that is a whole function body, with clauses that need a coercion, fails in code generation, with a size or without (row 340). Gated by `compiler_tests/NatRtCase` and `NatRtCaseGen`; the bytecode was read in `perf-probes/nat/size-probes.md` section 4.

Meaning: one claim removed. The census, "The one library's own sizes are the literals 0 to 3", leaves the entry:
- It counted `Library/FortressLibrary.fss` only. `Library/Random.fss:359` writes `Vector[\ZZ64,624\]` and `MersenneTwister[\ZZ64,32,624\]`.
- It was one measurement, about 2026-09-23, and changes apart from the `typecase` claim.
- It costed design B's holder classes per literal. Under the design that P-41 took, no class is written per size, so it has no consequence for the work.

Its source, `reviews/size-runtime-design-brief.md` section 5, keeps it, with its file. The `typecase` claim is kept. It gains what it means: the descriptor is not consulted (size-probes.md section 4).

Second round: P-41 is now cited for the size's descriptor only, not for the claim that the `typecase` does not read it, as the check suggests.

Sources:
- Title, `INSTANCEOF`, the generic function: size-probes.md section 4, "The test is an `INSTANCEOF` on the value's own class ... the loader fills in the size when it stamps `isOfSize⟦3⟧`"; `compiler_tests/NatRtCaseGen.fss`.
- The descriptor not read: the same section, "The descriptor is not consulted".
- Row 340: the old entry; gap-ledger row 340.
- Tests: the old entry; the files exist.

Questions for the curator: none.

## F-39

> - F-39 **An operator static argument is a name substituted when the declaration is instantiated, on both paths and by the specification; no code reads it at run time.** An operator static parameter is declared `opr`, as in `object Op[\opr ODOT\]() end`. The specification and walk substitute the operator's name into the declaring trait's or object's methods. The compiled path carries it in the name of the instantiation's class; the operator has no descriptor, where a type or a size has one (P-41). No live declaration of the one library has an `opr` static parameter: `FortressLibrary`'s two, in `embiggen` and `Monoid`, are inside comments. In `tests/`, `compiler_tests/` and `other_compiler_tests/`, nine test files declare one. Compiled, `Op[\+\]()` dies with `NoSuchMethodError` on `Op❮+❯$RTTIc.factory()`, the factory of the instance's descriptor class, where walk prints `Op[\+\]` (row 366, open; its expected failure is `compiler_tests/XXXOprParamRungS`). A three-line change to `MethodInstantiater`, measured but not landed, fixes row 366's program run as a probe, `compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss`; the gated `XXXOprParamRungS` was not run with it (`perf-probes/nat/size-probes.md` section 5). Detail: `perf-probes/nat/opr-kind-history.md` sections 2 (the specification and both paths) and 3 (no reader at run time).

Meaning: two corrections. First, "Only two tests declare an `opr` static parameter" is false. `git grep` finds nine test files in the three folders:
- `tests/XXXextendOprParam2` and `conditionalExtension`;
- `compiler_tests/OpParam3`, `OpParam4`, `Compiled10.m` and `XXXOprParamRungS`;
- `other_compiler_tests/OprPa1`, `OprPa2` and `OprPa3`.

Outside them, `not_passing_yet/` has four and `parser_tests/` one, so the entry bounds the count to the three folders. Second, the fix was measured on a probe program, not on the gated test.

The text of 2026-10-13 18:38Z also said "Neither library declares an `opr` static parameter". That holds for live code, and the entry says so. The assessment named the library's `embiggen[\T,opr OP\]` as a live declaration. It is not: it is inside `(* ... *)` in both the api (`FortressLibrary.fsi:2157-2159`) and the component (`.fss:3724-3727`). `Monoid[\T, opr OPLUS\]` (`.fss:3206-3214`) is inside a comment too. The check confirms both by a nesting-aware scan.

Second round:
- "Fixes that reproducer" read as the gated `XXXOprParamRungS`. size-probes.md section 5 measured the change on `SkOprParam.fss` and says "The gated `XXXOprParamRungS` was not run." The entry now says so.
- "Its descriptor class" now names the class, from row 366.
- "Known only at compile time" did not fit walk, which has no compile step. The title now says when the name is substituted.
- The folders now bound the count of nine.

Sources:
- Title and the two paths: opr-kind-history.md sections 2 and 3, "a compile-time synonym, substituted into the declaring trait's own method names at instantiation" (walk's `FTypeOpr` and `OprInstantiaterVisitor`; the compiled class name and `isOprKind`; a null in a descriptor factory's operator slot, "Push nulls for opr parameters in the factory call", which nothing reads).
- `Op` and the failure: gap-ledger row 366, "`NoSuchMethodError` on `Op❮+❯$RTTIc.factory()`".
- No live library declaration, nine tests: `git grep` over `Library/`, `ProjectFortress/LibraryBuiltin/` and the three test folders; `Library/incomplete/` is not loaded.
- The fix and its probe: size-probes.md section 5, "Row 366's program (`compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss` ...)" and "The gated `XXXOprParamRungS` was not run"; "not landed": row 366 is open.

Questions for the curator: none.

## For the coordinator

- **F-102's pointer.** F-102 says a `.test` file is needed "unless it names a refusal at load (F-29)". F-29 no longer holds that rule. Repoint F-102 to the `fortress-repo` skill's `tests-writing.md`, which owns it. F-102 is not in this chunk, so `proposals.apply` does not change it.
- **One owner for the native count.** PLAN.md:81 repeats F-32's counts (424, 147, 61, 138, 78) as current, and says "424 live native bindings on `main` after rung V". Both are one measurement at `e455ccd98`. Today's tree has 448, by the check's recount: the 24 of `9d2e4c856`. One of PLAN and F-32 could point to the other.
- **`getProgramArgsPrim` has no home.** PLAN.md:81 puts class D2 outside phase 4's rungs, and names a home for `NativeArray` only. But microGPT needs `getProgramArgsPrim`, which is in D2 (natives-shape.md section 2, "microGPT's path"). F-32 states what PLAN says and does not fill this gap.
- **F-35: the census missed one declaration.** The entry now says 9. This is a change of meaning settled by the check's scan of the api. Take it, or send it to a recount.
- **F-27 and report section 5.3.** The section predates `domainsExcludeTogether` (F-258). Any other entry that restates its rule for a generic beside a plain declaration may omit the exclusion read whole.
- **F-39's probe file.** `compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss` is named by size-probes.md section 5, but a search of the tree does not find it. The entry names it as the note does.
- **F-39 and the assessment.** The assessment's note that the switch-over's compiled path will meet the library's `embiggen` does not hold: the declaration is inside a comment.
- **Not run.** `record.py apply` and `record.py check` were not run on `proposals.apply`: this session's permissions refused `record.py` in the first round. The file follows `f0/proposals.apply`'s form.
