# Climb batch 15, rung O (rung-duplicates-coverage): record lines

## For FACTS

F-145 is now wrong in two sentences, and needs rewriting (`set`). Its new text:

**Walk refuses at load an object that leaves an inherited abstract method uncovered, an `override` that overrides nothing, and a generic type that breaks the Meet Rule for Functional Methods.** Bodies at narrower parameter types define an abstract method only where together they cover its parameter types, with `comprises` clauses read, as P-147 decides: each position is split through the clauses, and every combination of parts must lie inside one body. A search that does not settle refuses the object: a cycle, a symbolic or unreadable type, 10,000 steps or 4,096 combinations. A generic object is not checked (row 665), and an object whose one covering definition has a static parameter of its own is refused (row NEW-O-6). The compiled checker covers the same way, within the same bounds, except where a method has static parameters of its own (row NEW-O-3). F-147 gives the `override` check and F-142 the Meet Rule's. Gated by `tests/AbstractMethod*Walk` (`AbstractMethodCoverUnsettledWalk` among them), `OverrideNothing*Walk` and `compiler_tests/AbstractMethodCoveredPairs`. Detail: `compile-ladder/rung-walk-coverage/REPORT.md` sections 1 and 6; `compile-ladder/rung-duplicates-coverage/REPORT.md` sections 1 and 8.

F-223 is now wrong in its title and one sentence. Its new text:

**The specification's No Duplicates Rule is the papers' non-strict rule, and the compiled checker applies it, to functional methods wherever their `self` parameters stand.** Two declarations of one name may not each be applicable to every call to which the other is, as in the type group's papers of 2011 and 2019 (P-26). The checker refuses such a pair, two functional methods at different `self` positions among them: "There are multiple declarations of f with the same parameter type", naming the domain of the declaration written first. It checks no symbolic operator (row 584) and reads no abstract functional method of a trait the component declares (row NEW-O-5); such a pair passes it and stops the code generator (rows NEW-O-4 and NEW-O-5). Walk runs one of such a pair in two shapes (rows 373 and 549). Gated by `compiler_tests/XXXNoDuplicatesRule`, `XXXNoDuplicatesRuleSelfPositions` and `XXXNoDuplicatesRuleSelfPositionsPlain`, the checker's departures by `XXXNoDuplicatesRuleSelfPositionsOperator` and `XXXNoDuplicatesRuleAbstract`, and walk's departure by `tests/XXXNoDuplicatesRuleWalk`. Detail: `compile-ladder/rung-popl-examples/REPORT.md` section 4, its `SKEPTIC.md` section 2, and `compile-ladder/rung-duplicates-coverage/REPORT.md` sections 1 and 8.

No new entry: the rung's facts are these two entries, made true again.

## Ledger notes

- Row 707: `close 707 --commit 317fc0ef5 --test XXXNoDuplicatesRuleSelfPositions`, with the note "the compiled checker counts two functional methods as duplicates wherever their self parameters stand (climb batch 15 rung O); the plain pair is `XXXNoDuplicatesRuleSelfPositionsPlain`; the message names the first-written declaration's domain since f537abed8; a symbolic operator's pair is NEW-O-4, and a component's own abstract functional method beside a concrete one NEW-O-5".
- Row 708: `close 708 --commit 317fc0ef5 --test AbstractMethodCoverUnsettledWalk`, with the note "walk's definedBelow refuses where its search does not settle, and counts an unreadable body as no cover (climb batch 15 rung O)".
- Row 709: `close 709 --commit 317fc0ef5 --test AbstractMethodCoveredPairs`, with the note "AbstractMethodChecker.coveredByParts splits each position through comprises clauses within walk's bounds (climb batch 15 rung O); a method with static parameters of its own is NEW-O-3".
- Row 584: the note would be "climb batch 15 rung O: a symbolic operator's duplicate pair at two self positions, `FlatString`'s `||` among them (`Library/FlatString.fsi:17`, `:20`), stops the code generator, NEW-O-4". The row has 1,181 characters and its notes 691, so it takes this note only if the gather makes room.
- Row 665: no note. Walk's coverage check still skips generic objects, and its expected failures keep their verdicts.
- Row 577: the note would be "climb batch 15 rung O edits no library file; its distance per-site list equals the landed one by location and message, 54 to 54". The row's notes are at 697 of 700 characters, so it takes no note unless the gather makes room.

## New rows

Section "4. Operators and overloading under walk":

| NEW-O-1 | under walk, an object that overloads a functional method with a static parameter of its own beside a plain one of the same name stops at load, 'Missing type T': `g[\T extends Ping\](self, x: T)` beside `g(self, x: Pong)` in an object, `Ping` and `Pong` objects | NEGATIVE-VERIFIED | implementation gap (walk) | `advanced/overloading.tex`, "Declarations with Static Parameters" | `ProjectFortress/tests/XXXGenericFunctionalMethodBesidePlainWalk.fss` | climb batch 15 rung O | siblings: 567, NEW-O-2. `GenericMethod.finishInitializing` reads the parameter types in an environment without the method's own static parameters (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java:137`, its TODO at `:133-134`, at 317fc0ef5), reached from `OverloadedFunction.finishInitializingFirstPart` (`OverloadedFunction.java:161`) when the name is overloaded; alone, the generic method loads and runs. The same on the base. The compiled path stops in its code generator (NEW-O-2). In a trait that an object extends, the pair stops walk with 'InterpreterBug ... This should have been an environment with a Top Level'. |

Section "5. Overloading on the compiled path: checker and dispatch":

| NEW-O-2 | the code generator stops on an object that overloads a functional method with a static parameter of its own beside a plain one of the same name: `ClassCastException: FunctionalMethod cannot be cast to Method` in `OverloadSet.getFunctionToCall` | NEGATIVE-VERIFIED | implementation gap (codegen) | `advanced/overloading.tex`, "Declarations with Static Parameters" | `ProjectFortress/compiler_tests/XXXGenericFunctionalMethodBesidePlain.test` | climb batch 15 rung O | siblings: NEW-O-1, 594. The checker accepts the pair; `OverloadSet$ForTraitOrObject.getFunctionToCall` casts a member with static parameters to `Method`, assuming a dotted method's overload set (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2575-2578` at 317fc0ef5), reached from `CodeGen.forObjectDeclPrePass` (`CodeGen.java:4391`) through `generateTopLevelOverloads` (`:6652`). The same on the base. Walk stops at load (NEW-O-1). The same in a trait that an object extends. |

| NEW-O-4 | the code generator stops on two functional methods of a symbolic operator with the same parameter types at two `self` positions, which the checker does not check (row 584): `opr \|\|(self, y: S)` beside `opr \|\|(x: S, self)` in one trait | NEGATIVE-VERIFIED | implementation gap (checker) | `advanced/overloading.tex`, "Declarations with Static Parameters" | `ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositionsOperator.test` | climb batch 15 rung O's skeptic | siblings: 584, 707, NEW-O-5. 'Likely bug in static analysis, apparently malformed overload set not rejected' (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:409-411`): `isDeclaredName` admits no symbolic operator to the duplicate check (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:723-727` at f537abed8). The same on the base. Walk refuses the pair at load. `FlatString`'s api declares this pair (`Library/FlatString.fsi:17`, `:20`); its component lacks the second (row 585). |

| NEW-O-5 | the compiled checker reads no abstract functional method of a trait the component declares, so one beside a concrete method of the same name and parameter types passes it and the code generator stops: `f(self, y: S): ZZ32` beside `f(self, y: S): ZZ32 = 2` in one trait | NEGATIVE-VERIFIED | implementation gap (checker) | `advanced/overloading.tex`, "Declarations with Static Parameters" | `ProjectFortress/compiler_tests/XXXNoDuplicatesRuleAbstract.test` | climb batch 15 rung O's skeptic | siblings: 572, 707, NEW-O-4. 'Likely bug in static analysis, apparently malformed overload set not rejected' (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:409-411`). In a component the top-level set reads only declarations with a body (`getFunctions`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:83`) and a type's set no bodiless functional method of its own (`:139-141` at f537abed8), row 572's mechanism. An abstract `f(self, y: S)` beside a concrete `f(x: S, self)` stops the same way. The same on the base. Walk refuses both at load. |

Section "3. Traits, objects and components":

| NEW-O-3 | the compiled checker splits no tuple of parameter types through `comprises` clauses where the abstract method or a concrete method below it has its own static parameters: bodies `g[\T extends Side\](self, x: Ping, y: T)` and `g(self, x: Pong, y: Side)` under `g(self, x: Side, y: Side)` are refused | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/traits.tex`, "Method Declarations" | `ProjectFortress/compiler_tests/XXXAbstractMethodCoveredPairsGeneric.test` | climb batch 15 rung O | siblings: 709, NEW-O-1. `Side comprises { Ping, Pong }`. 'Domain (Side, Side) is not a subtype of OR((Pong, Side),(Ping, T$7))': `coveredByParts` splits only where neither the abstract method's domain nor a covering domain has static parameters (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:136-145` at 317fc0ef5), and the union test compares the tuple with each member alone. The same on the base. Walk cannot load the object (NEW-O-1). A body with a static parameter of its own that the cover does not need refuses the object too. |

| NEW-O-6 | under walk, an object whose one definition of an inherited abstract method has a static parameter of its own and covers it is refused at load: `g[\T extends Side\](self, x: T)` under `g(self, x: Side)`, 'does not define an abstract method declared in type H' | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/traits.tex`, "Method Declarations" | `ProjectFortress/tests/XXXAbstractMethodGenericBodyWalk.fss` | climb batch 15 rung O's skeptic | siblings: 665, 666, NEW-O-3. `Constructor.checkForDef` refuses (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:433` at f537abed8) where `definedBelow` (`:480`) finds no cover among the bodies; not located further. The same on the base. The compiled path compiles and runs it, and the two-parameter shape `g[\T extends Side\](self, x: T, y: Side)` under `g(self, x: Side, y: Side)`. Both paths refuse bodies at `(U, Ping)` and `(U, Pong)`, each with `U extends Side`, under `g[\U extends Side\](self, x: U, y: Side)` (NEW-O-3 on the compiled path). |

The three rows passed `ledger.py check --rows`, with numbers in place of the placeholders: "3 rows, 0 fail the template". The skeptic amended NEW-O-1's, NEW-O-2's and NEW-O-3's notes and NEW-O-3's claim, and added NEW-O-4, NEW-O-5 and NEW-O-6 (`SKEPTIC.md`); each set of three passed the same check: "3 rows, 0 fail the template". Where the placeholders are cited:
- NEW-O-3: `Specification/appendices/changes.tex:2899` ("row~NEW-O-3 of the revival's gap ledger"), and the commit message of `85837957a`.
- NEW-O-4 and NEW-O-5: `Specification/appendices/changes.tex:2504` ("row~NEW-O-5") and `:2507` ("rows~NEW-O-4 and~NEW-O-5"), and each other's rows.
- NEW-O-6: `Specification/appendices/changes.tex:2890` ("row~NEW-O-6 of the revival's gap ledger").
- NEW-O-1 and NEW-O-2: only each other's rows and this record.

The gather puts the numbers in at the specification's lines.

## Handover

Rung O (rung-duplicates-coverage) landed three repairs:
- the No Duplicates Rule at two self positions on the compiled checker (row 707), its message naming the first-written declaration's domain;
- coverage through comprises clauses on the checker, within walk's bounds (row 709);
- walk's refusal where its search for a cover does not settle (row 708).

The code is `317fc0ef5` and `f537abed8`. Rows 707, 708 and 709 close with `XXXNoDuplicatesRuleSelfPositions`, `AbstractMethodCoverUnsettledWalk` and `AbstractMethodCoveredPairs`. The count stays at 1 and the distance at 54; no site moved.

New rows:
- NEW-O-1 and NEW-O-2: a generic functional method beside a plain one in an object stops walk at load and stops the code generator.
- NEW-O-3: the checker's split skips methods with static parameters of their own.
- NEW-O-4 and NEW-O-5 (the skeptic's): a duplicate pair of a symbolic operator, and a component's own abstract functional method beside a concrete one, pass the checker and stop the code generator.
- NEW-O-6 (the skeptic's): walk refuses an object whose one covering definition has a static parameter of its own.

F-145, F-223 and the skill's `references/interpreter.md:42` and `references/revival-changes.md:66` need their sentences on rows 707 to 709 rewritten.

## Revival change

**The change.**

1. **The No Duplicates Rule at two self positions.**
   - The team's checker: it counted two declarations as duplicates only where their parameter types were equivalent and their self parameters stood at one position (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:368` at `a874948ac`). So `f(self, y: S)` beside `f(x: S, self)` in one trait passed it, and the code generator stopped: "Likely bug in static analysis, apparently malformed overload set not rejected" (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:409-411`).
   - The tree now: the checker refuses two functional methods with equivalent parameter types wherever their self parameters stand, "There are multiple declarations of f with the same parameter type", naming the domain of the declaration written first (`OverloadingChecker.scala:441-451`). Tests: `ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositions`, `XXXNoDuplicatesRuleSelfPositionsPlain`.
   - The reason: the No Duplicates Rule refuses two declarations each applicable to every call to which the other is (`Specification/advanced/overloading.tex:548-549`). The type group's paper of 2011 states "if $d_1 \ms d_2$ and $d_2 \ms d_1$ then $d_1 = d_2$" (`Papers/Types/rules.tick:158-161`). A functional method can be viewed as a top-level function (`Specification/basic/traits.tex`, "Method Declarations"). The code generator's stop above is the measured failure.

2. **Coverage through comprises clauses in the checker.**
   - The team's checker (Steele, May 2012): it defined an inherited abstract method only where the method's parameter type was a subtype of the union of the covering definitions' parameter types (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:103` at `a874948ac`). Its subtype relation splits one trait type through its comprises clause below a union, but compares a tuple with each member alone (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:159-166`). So definitions at `(Ping, Ping)`, `(Ping, Pong)` and `(Pong, Side)` under `g(self, x: Side, y: Side)`, with `Side comprises { Ping, Pong }`, were refused: "Domain (Side, Side) is not a subtype of OR((Ping, Pong),(Pong, Side),(Ping, Ping))".
   - The tree now: the checker splits each position of the parameter types through comprises clauses and asks that every combination of parts lie inside one definition's parameter types, within 10,000 steps and 4,096 combinations, as walk does (`AbstractMethodChecker.scala:124-181`). Test: `ProjectFortress/compiler_tests/AbstractMethodCoveredPairs`. It does not split where a method has static parameters of its own (`ProjectFortress/compiler_tests/XXXAbstractMethodCoveredPairsGeneric`).
   - The reason: the traits chapter defines the method by "definitions whose parameter types are subtypes of it and together cover it" (`Specification/basic/traits.tex:627-648`). Welterweight Fortress's Covered rule counts an abstract declaration covered when it is implemented for all the types comprised (`Papers/Welterweight/fig-covered.tick`). The checker's refusal above is the measured failure.

3. **Walk refuses where its search for a cover does not settle.**
   - The team's walk: it counted any declaration with a body as defining an abstract method (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:404` at `a874948ac`). The revival's first coverage check accepted an object wherever its search did not settle.
   - The tree now: walk refuses there, at a cycle, a symbolic or unreadable type in the split, more than 10,000 steps or more than 4,096 combinations. It counts a definition whose parameter types it cannot read as no cover (`Constructor.java:462-518`). Test: `ProjectFortress/tests/AbstractMethodCoverUnsettledWalk.fss`.
   - The reason: the compiled checker refuses such an object: "Domain (D, D, D, D, D) is not a subtype of (P1, P1, P1, P1, P1)" (`ProjectFortress/compiler_tests/XXXAbstractMethodCoverUnsettled`). Walk's own Meet Rule check refuses where its search does not settle (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:890`, `:894`). The measured failure: walk loaded that object and printed `1`.

**Provenance.** Each change and the decision it follows:
- Row 707: PLAN's line for row 707, listed under "Climb batch 14, listed for his review". It follows the No Duplicates Rule as climb batch 14's rung P restated it (row 696) and the type group's late word (P-26).
- Row 709: PLAN's line for row 709, under P-147 (item 51) and P-60.
- Row 708: the coordinator's call on W.skeptic.1, listed for the curator's review, under P-147.

All three were built in climb batch 15, rung O.
