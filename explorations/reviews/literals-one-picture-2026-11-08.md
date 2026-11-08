# Literals in revived Fortress: one picture

## The shape the curator saw

Strict equivalence, `SEQV` (also `===` or `≣`), asks "one value?", not "same text?". Three cases surprised him:

```
"ab" SEQV "ab"            (* false on both paths *)
y: RR64 = 0.5
x: RR64 = 0.25 + 0.25
y SEQV x                  (* false under walk *)
z: ZZ32 = 3
3 SEQV z                  (* walk true, compiled false *)
```

One cause: each path lets its storage of a literal decide what a program sees.
- Strings: each evaluation makes a new object, on both paths.
- Floats: the interpreter's library puts its numeral type below `RR64`; a typed place converts nothing.
- Integers: walk stores `3` as its class `Int`; `Cell(3)` is a `Cell[\Int\]`, apart from `Cell[\ZZ32\]`.

He named it "the representation of literals" and "the interpreter's internals leaking out to user land". The fix: one rule on both paths.

## The rule, for every kind of literal

1. **A literal names one value, fixed by its text.** Each evaluation gives that value.
2. **Its type holds that value exactly.** `String` holds every text. No number type holds every numeral (`ZZ32` misses `3000000000`, `RR64` misses `0.1`), so a numeral has its own type: `IntLiteral` (P-76), or `FloatLiteral` with a radix point (P-172).
3. **It converts once, where a type is fixed**, by the library's conversions. Elsewhere it keeps its own type.
4. **`SEQV` and `=` follow the value** (P-168). Values of two types are never `SEQV`. Numbers compare by value; a string by being the same object. `=` is each type's own equality.
5. **An expression of literals alone is a literal.** The team's Working Draft of 2011 folds `"foo" || "bar"` and computes numeral arithmetic exactly: "at most one floating-point rounding error".

## Where the kinds differ by nature

- A number is a value object, with no identity; a string a reference object, with one (P-168). Rule 1 serves both: one literal text is one object (P-171).
- A string converts into no other type; a numeral into several. Strings are not the odd one: their own type is a library type.

## Where a literal converts

A place fixes a type when it declares one: a typed binding or assignment, a parameter, a field, a return type, a written static argument.

A parameter of type `Any` fixes none, nor does a static argument that only the literal fixes: `Cell(3)` is a `Cell[\IntLiteral\]`. The coercion chapter agrees.

Where an integer numeral's conversions tie, it reads as `ZZ32`, or wider by size; no float rule exists.

- Compiled today: the checker converts at typed places.
- Walk today: no static types; it converts by the run-time value (P-59). Its float numeral is below `RR64`; its integer numeral is a `ZZ32`.
- After the switch-over: one library (P-37); walk runs the checker and uses its conversions (P-12).

## `SEQV` and `=` after the two decisions

Strings (P-171):
```
b = "b"
"ab" SEQV ("a" || "b")    (* true: folded *)
"ab" SEQV ("a" || b)      (* false: built at run time *)
"ab" = ("a" || b)         (* true *)
```

Floats (P-172):
```
y SEQV x                  (* true *)
0.5 SEQV x                (* false: FloatLiteral, RR64 *)
0.5 = x                   (* true *)
```

Integers (P-76), compiled today:
```
3 SEQV z                  (* false: IntLiteral, ZZ32 *)
3 = z                     (* true *)
```

## The team's sources

They agree: a literal denotes one fixed value (the Working Draft, the 2012 restart); a string literal is a `String`; a numeral has its own type, converted by the library (the draft and the compiler's library, the later word, P-26).

Uneven in four places:
- Three numeral designs: own type, converted (draft, compiler); below a default, `FloatLiteral extends RR64` (interpreter's library); `QQ` or `NN` (restart).
- The compiler's `IntLiteral` is a `Number`, its `FloatLiteral` not; it has no `QQ`.
- No source says whether a string literal is one object.
- The draft folds strings and numerals; the team built only the integer fold, on the compiled path.

The papers say nothing.

## What is not yet uniform

- **Float ties.** `1.0 s`, for `s: ZZ32`, fits `QQ`'s and `RR64`'s product by conversion; a float tie rule, `RR64`, picks one.
- **Float folds.** Without rule 5, `(0.25 + 0.25) SEQV 0.5` is false.
- **Printing and rounding.** `2.5` and `2.50` are `SEQV` but print apart; `round` rounds the double. The float decision left both open; rule 1 says: the exact value.
- **Walk's types.** Walk builds generics at `Int` and `FlatString`; he asked for a fix now.
- **Walk's integer numeral** is a `ZZ32` until walk runs the checker.

**The one fork** is a place that fixes no type. Does a numeral keep its own type there, or take a default, as in Swift? He took "keeps it" for floats (P-172). The rule asks the same for integers, as the integer decision says: `3 SEQV z` is false. His words of 08:03 lean to a default; his rule of 12:36 named only typed places. A default for integers alone splits the numeral kinds; for both, it reverses a clause of the float decision. No team source asks for it.

## The plan

Seven rungs, sized by reading; tests on both paths unless marked.
1. **One object per string literal** (P-171): walk interns; both paths compare the carried Java strings by `==`; a shared phase folds `||` of two literals. About 3 and 4 lines; fold not sized. Asserts the string lines.
2. **`FloatLiteral` apart** (P-172): `QQ`, `RR64`, `RR32` convert from it, with their `=`; ties read `RR64`; compiled numerals round once. 15 to 30 library lines; the rest not sized. Asserts `q: QQ = 0.5`, `1/2 = 0.5`, `Cell(0.5)` a `Cell[\FloatLiteral\]`, `1.0 s` an `RR64`.
3. **Walk converts a `FloatLiteral` at each typed place** and breaks float ties. About 20 lines. Asserts `y SEQV x`, walk.
4. **Walk shows only language types**: inference reads `Int` as `ZZ32` and its strings as `String`; messages print traits. 40 to 50 lines for numbers, the rest not sized. Asserts `Just(z) = Just[\ZZ32\](z)`, and `Cell("s")` a `Cell[\String\]`, walk.
5. **A float numeral prints and rounds by its value.** Not sized. Asserts `"" 2.50 = "2.5"`; the team's print test passes. Needs his word.
6. **Numeral expressions fold exactly**, in a shared phase. Not sized. Asserts `(0.25 + 0.25) SEQV 0.5`. Needs his word.
7. **Walk's integer numeral becomes an `IntLiteral`** once walk runs the checker (P-12). Asserts `3 SEQV z` false, walk. Done early, a probe failed 24 passing tests, 9 for want of static types (F-74).

## The switch-over and microGPT

- At the last gate the distance to the switch-over is 0 errors, the checker count 0 (F-53). Rung 2 and the folds of rungs 1 and 6 change what the checker reads, so both stages measure them.
- The switch-over should follow rung 2; else the compiled path takes `FloatLiteral` below `RR64`, and `y SEQV x` turns false.
- No line of microGPT changes if float ties read `RR64`. Else, by reading, `1 - beta1`, `beta1^t` and `1.0 s` tie (flat lines 77 to 82, APL lines 106 and 112). Neither program uses `SEQV`.

## Where the coordinator's framing departed from what the curator asked

**What he asked for**, in chat at 08:03 UTC, after his page comments of 07:20 and 07:51:
- "I'm seeing a pattern that the literals are interfering with equivalence in a way that's surprising to me."
- "why would the compiler's representation of literals in the source code not directly convert into the value type so that they are all equivalent?"
- "if the declarations are inferred ... as just a string, they should be interchangeable from the user's point of view."
- "we need a complementary [study] that ... tries to resolve the internal representation of literals ... numeric literals and string literals."
- Of the skill's changes 39 to 44: "I was getting the feeling that this is the same pattern, which gives me wrong vibes."
- On the page: "I didn't want the interpreter's internals leaking out to user land"; "it is still worth fixing ... the behavior of the interpreter now".

**What the brief asked the worker for**, at 08:04:
- It quoted his words almost whole, and asked one question for all literals.
- Its deliverable split them: "list every way forward ... for numerals and for string literals apart"; "Name each finding that would change a decision of the curator's, and give options for those only."
- It did not ask what the three cases share, or for one rule.

**What the study gave**, at 08:39:
- Each kind measured on both paths, and the skill's pattern found: three of changes 39 to 44, and a fourth in its example, record one path's behaviour as if the language gave it.
- 17 ways in three groups, strings, floats and integers, weighed per kind. Its summary keeps the split.

**Where the three asks departed**, at 11:58, 12:26 and 13:25:
- They were asks 1 to 3 of seven, one per kind. Each was a menu, with keeping today's behaviour among the options.
- Ask 1 moved strings in generics, `Cell("s")` a `Cell[\FlatString\]`, to "the row 364 ask", the ask on walk's generics. Ask 3 was that ask, and it left strings out.
- The float clause for a place that fixes no type came from the coordinator: ask 2 ("exact where nothing is declared") and its reply of 12:37 ("Where nothing fixes a type, as in `Cell(0.5)`, it stays exact"). He accepted it: "I think we are aligned on 1A". His own words named only `QQ` and floats of fixed size.
- Ask 3 came after a compaction. It did not say that this clause settles the integer case. It offered a default type for integers alone, which splits the numeral kinds, and did not say so.
- Ask 3 offered "No walk fix now" as option 1a, though at 07:51 the coordinator had agreed with him: "Fixing walk is the right move."
- He answered asks 1 and 2 with principles, not options: "If I was implementing this, I would ..."; "I don't know which design ... achieves this from the options that you offered, but that is my reading of the intention behind the specification's word." The coordinator mapped each back onto an option.

**His complaint**, at 14:21: "I wanted a holistic re-evaluation of the literals, and I'm getting piecewise proposal for fixes, and I'm not seeing the unified holistic vision that I was asking for."

**What his words changed above:**
- The shape is stated in his words: the representation of literals, and internals leaking.
- Rung 4 is his request of 07:51, and its string half his words of 08:03. Neither is offered as an option.
- The fork sets his two statements side by side: a numeral "directly" in "the value type" (08:03), and exact until a fixed-size type (12:36).

## Appendix A: citations and detail

**The record's reviews.** The study, `explorations/reviews/literals-2026-11-08.md`: measurements S1, S2, C1, C2 (strings), N1, C6 (`3 SEQV z`), N4, C7 (floats), E1 (`2.5`, `2.50`). The probe of walk's generics, `explorations/reviews/row-364-walk-generics-2026-11-08.md`: R364A, R364I, way A, `LongStringTests.fss:121`, `:141`. The strings review, `explorations/reviews/string-equivalence-2026-11-06.md`. The scout's file of his words, `literals-recovery/evidence.md` in the scratchpad.

**Specification.**
- Working Draft, `Specification-1.0-frozen/basic/expressions/literals.tex`: `:25-26` "Literals are values"; `:31-33` `BooleanLiteral[\true\]`; `:40` `Character`; `:57` `String`; `:132-148` numerals "not directly converted", "their own types", library coercions; `:163` "3.125 has the rational value 3125/1000"; `:173` "at most one floating-point rounding error".
- `Specification/basic/expressions/constant.tex`: `:44-74` literal, constant and static traits; `:81-87` concatenation makes a new literal; `:90-92` every literal is a constant.
- Revised `literals.tex:149-165`: the `IntLiteral` box, the chapter's one revision. The text of the string and float decisions is not written yet: no `FloatLiteral` in `Specification/` outside Appendix I.
- Appendix I, "Which objects are value objects": its Effect names walk's float numeral at `RR64` and the integer split as departures.
- `basic/objects.tex:24-56`: the kinds of objects; "numeric literals" are value objects.
- `basic/conversions-coercions.tex:98-101`: coercion only where the declared type "is exactly the type U".
- `basic/inference.tex:183-187`: `id(3)` "at the numeral's own type"; `:299-317`: a tied integer numeral reads as `ZZ32`.
- The 2012 restart, `Documentation/Specification/Prose/Language/Expressions/literals.tick:14-29`. P-25 gives the restart weight for its Types chapter only.

**Libraries and code** (Java under `ProjectFortress/src/com/sun/fortress/`).
- Compiler's library: `LibraryBuiltin/CompilerBuiltin.fss:883` `IntLiteral extends { Number, Equality[\IntLiteral\] }`; `:996` `trait FloatLiteral excludes {RR32, RR64}`; `:932`, `:993` its coercions; `Library/CompilerLibrary.fss:68` strings' `===` by `=`.
- Interpreter's library: `LibraryBuiltin/FortressBuiltin.fsi:44` `value object FloatLiteral extends RR64`; `:127` `value object Int extends ZZ32`; `:199` `IntLiteral`; `Library/FortressLibrary.fsi:291-297` `RR64 comprises { Float, FloatLiteral }`; `:395-404` `QQ` converts from `IntLiteral`, not `FloatLiteral`. Its earlier integer numeral type extended `ZZ32`, its arithmetic held back "until coercion is implemented" (Appendix I, "revival-numeral-type").
- Checker: `scala_src/typechecker/impls/Misc.scala:461-480` types literals `String`, `Character`, `IntLiteral`, `FloatLiteral`, `Boolean`. The team's integer fold, 2012: `compiler/desugarer/IntegerLiteralFoldingVisitor.java`, compiled only.
- Walk: `interpreter/evaluator/Evaluator.java:1018-1020`, a new `FString` per evaluation; `:1631-1637`, `FFloatLiteral` with its text, `FIntLiteral.make` to `Int`, `Long` or `BigNum`. Compiled: `compiler/codegen/CodeGen.java:2035`, `:4207`, `:5268`.

**The float tie, by reading.** After rung 2, `QQ` and `RR64` each convert from `FloatLiteral` and from `ZZ32`, and `QQ` excludes `RR64`. So `1.0 s`, `1 - beta1` and `beta1^t` find two declarations, neither more specific: "Ambiguous coercion". A tie given to `QQ` would make `beta1^t` an exact rational. A numeral tie on these lines stopped the checker before: `10.0^(-5)` (F-58, row 533). `beta1`, `beta2`, `lr0` and `epsilon_A` are bound without a type (flat `:18`, APL `:27`), so they stay `FloatLiteral` and convert at each use: a few times a step, outside the element loops (flat `:77-79`).

**Measured for this page.** `javac` and `java` on `literals-recovery/powcheck/PowCheck.java` in the scratchpad: `Math.pow(10.0, -5.0) == 1e-5`, `(10.0, -8.0) == 1e-8` and `(10.0, 10.0) == 1e10` print `true`; `0.1 + 0.2 == 0.3` prints `false`. So rung 6 keeps microGPT's three numeral powers on today's bits, and changes `0.1 + 0.2`.

**Rungs.**
- 1: the study's prototypes, protoS (walk, about 3 lines; 51 walk tests unchanged) and protoC (compiled, about 4); the team's `compiler_regressions/seqv.fss:22` passes again.
- 2: the study's ways F-b (`FloatLiteral` apart) and F-e (`QQ` converts from it): 10 to 20 lines, and 5 to 10 for the exact `QQ` helper. One rounding ends the compiled path's two or three (F-304).
- 3: the study's way F-d (walk converts at declared places), about 20 lines in `LHSEvaluator` and the parameter binding. P-172 names binding, parameter and field; the rule adds assignment and return. It flips `StrictEquivalenceRuleWalk.fss:32`, `sequivTest.fss:58` and `:94` back to the team's `equiv`, and F-326's walk sentence.
- 4: the probe's way A (inference reads the five number classes at their traits) and sub-choice S (the string objects at `String`); messages at the probe's `FType.toString` sites; three `TupleOrder*Refused.test` keys move. Until rung 7, walk's `Cell(3)` is then a `Cell[\ZZ32\]`, the revised text's interim answer.
- 5: `values/FFloatLiteral.java:26-33` prints the text. The shortest exact decimal keeps `tests/NumberPrintTest.fss:16`, which has no trailing zero. PLAN's default is the team's printing (`PLAN.md:155`).
- 6: the Working Draft's static rational expressions; it can move the integer fold to a shared phase too.
- 7: walk cannot yet run the checker: it has no case for the checker's conversion nodes (F-9). Probe Q made every walk integer numeral an `IntLiteral` (F-74): 59 verdicts changed alone; with four devices, 24 passing tests failed: 6 by design, 9 for want of static types (walk's generics at its classes, its inference without the declared type), 9 walk gaps.

## Appendix B: the record's entries on literals and equivalence

Fetch each with `facts-extract.sh 'P-n+'` and `'history:P-n'`. "History" marks a history that holds his words or a reversal. A scan of `FACTS-history.md` finds his words in no FACTS entry below.

**Decisions (POSITIONS).**
- P-12: walk runs the checker after the switch-over and uses its conversions; why walk's integer numeral waits (rung 7). History.
- P-25: the 2012 restart counts for its Types chapter only, so its literals text is context. History.
- P-26: the team's later word wins; it ranks the compiler's `FloatLiteral` above the interpreter's. History.
- P-37: one library, the interpreter's; the switch-over carries its `FloatLiteral` to the compiled path. History.
- P-38: the compiler's library is not repaired; its `===` by `=` (row 908) lasts until it goes.
- P-43: the number types are flat siblings, so every numeral needs a conversion. History: the route not taken.
- P-46: a conversion never changes which declaration runs; why a numeral at `Any` stays itself. History.
- P-48: an unfixed type parameter takes its bound; "under walk, dispatch takes the value's type" needs a reading for rung 4. History.
- P-49: the checker tries a call by subtyping first; so `Cell(3)` keeps `IntLiteral`.
- P-51: only the checker gives an inner call its context; walk lacks it (row 705).
- P-59: walk converts by the run-time value until it runs the checker. History.
- P-74: exact conversions are implicit, lossy ones written; mixed widths promote.
- P-76: an integer numeral's own type, `IntLiteral`; walk's half waits for P-12. History: his "walk needs to be corrected and switched to using IntLiteral", and his doubt on the split.
- P-91: what an object without `asString` prints; it does not cover numerals (rung 5).
- P-96: the revision form, for the specification text of P-171 and P-172.
- P-154: list order; walk's half waits for P-12 or a fix of walk's generics, and string lists need rung 4's string half. History.
- P-165: `=` across number types only where a conversion carries one into the other; gives `3 = z` and `0.5 = x`.
- P-166: `ZZ` and `QQ` values are value objects. History.
- P-167: the ilk prints the trait; walk's objects are to "stop being types that a program sees or prints". Printing is built, seeing is not (rung 4). History.
- P-168: `SEQV` by the specification's rule; strings are reference objects. History: his "natives should go down to Java `==`"; it overrules the team's code; its recorded cost is removed by P-171.
- P-169: the runtime's own natives, the numerals' among them. History.
- P-171: one object per string literal, and the fold of `||`. History: his answer.
- P-172: `FloatLiteral` apart, exact, one rounding. History: his answer; his words are in `HELD.md:22`.

**Facts (FACTS).**
- F-9: walk cannot run the checker as it stands; the step P-12 needs is not designed.
- F-53: the distance 0 and the checker count 0 at climb batch 28's gate.
- F-55: the checker infers static arguments from static types, walk from run-time types: the root of walk's `Int`.
- F-57: a numeral's type depends on the path and the library.
- F-58: microGPT's `10.0^(-5)` once tied (row 533).
- F-73: the checker infers a static argument at the narrowest type every argument converts into.
- F-74: walk's integer numeral by its size; probe Q's cost.
- F-79: `IntLiteral` in the interpreter's library, on the compiler's model.
- F-111: what the count and distance stages read.
- F-118: a numeral's value reaches the compiled path intact.
- F-128: walk converts at its three kinds of type check.
- F-131: the one library's number types are flat.
- F-137: walk infers static arguments with conversion, by promotion.
- F-139: `RR32` is a sibling of `RR64`.
- F-169: the Working Draft never named a library type for an integer numeral.
- F-173: the checker chooses the declaration first, then its static arguments.
- F-249, F-276: the string concatenation operators, where rung 1's fold meets `||`.
- F-262: a numeral's sign does not reach its type.
- F-304: compiled float numerals round two or three times (row 862).
- F-324: `Number` declares nothing; each number type declares `=` at each type it converts from or into.
- F-326: `SEQV` by the rule on both paths; its walk float sentence turns false at rung 3.
- F-328: walk prints traits, but builds generics at its classes.
