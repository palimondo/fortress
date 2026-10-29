# Cold read of `corrections/c1/clean.txt`

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and the skill's `references/library.md`, `records.md`, `specification.md`, `exploring.md`, `compiler.md`, `interpreter.md` (searched for terms). Nothing else.

Seven entries, all positions: P-7, P-27, P-146, P-153, P-154, P-12, P-17.

---

## P-7 "The goal is to finish what the designers intended ..."

**Decided:** The revival's aim is to complete the language the Sun Labs designers meant, not to design a new one. Success is measured by one program, microGPT, compiled to JVM bytecode and running fast. "What the designers meant" is read off `Specification/`: the February 2011 Working Draft as the revival revises it, with the Types chapter of the team's 2012 restart cited beside it (P-25). The revival changes that text only to settle contradictions: where the team's later work, in the compiler or in the type papers, contradicts the original text, the text is changed to follow the later work (P-26). The specification records each change the revival makes (P-95 says how). A pure-Java microGPT is the yardstick: its speed is the best result possible, and compiled microGPT aims at it.

**Applies:** Always. This is the project's overall goal. Limits: the specification is revised only to resolve contradictions with the team's later work; the language is not redesigned.

**Requires:** A worker judges intent by `Specification/` (plus the restart's Types chapter, which the skill locates at `Documentation/Specification/Prose/Language/types.tick`). Where the team's later work contradicts the text, the worker follows the later work and updates the text. The worker records each change in the specification (P-95; the skill's revision form in `references/specification.md`). The worker must not invent new language design. Speed is judged against the pure-Java microGPT.

**Unfinished:** Not stated in the entry. It implies the main goal is still to be reached (compiled microGPT running fast, near the Java baseline), and that the specification keeps being revised.

**Could not resolve:**
- "A pure-Java microGPT is the baseline ... the optimal result, the one to aim at": "baseline" usually means a floor to beat, but here it is a ceiling to approach. The entry also gives no target, such as being within some factor of it, and no location for the Java program. Unclear wording, not a language concept.
- "the team's later work, in the compiler or in the papers on types" against "(P-26: the type group's later word wins)": the first names the team and the second names the type group. The skill's "Weighing the sources" lists which late positions count, which mostly settles it. But the entry suggests that any compiler code counts as "later work", while the skill gives a closed list. Slightly unclear wording.
- "contradictions": the entry does not say whether a gap, where the text is silent and the compiler does something, counts as a contradiction. Unclear wording, minor.

---

## P-27 "Whoever extends the library follows the library's own practice."

**Decided:** Library extensions are written the way the library already writes things. Whatever microGPT had to define for itself goes into the standard library, in the library's style. Before extending the library, a worker studies how the library already handles the same kind of thing and copies that pattern. The library's pervasive use of exclusion is given as one example. A fix is never designed from the specification alone, or from a workaround in user code. Scope: this rule covers only how the library is extended. When two of the team's own designs differ (for example the library's source against the compiler's prelude), this rule does not decide between them; the team's later word does (P-26).

**Applies:** Whenever a worker adds to or changes the library. Limit: it does not settle a choice between two team designs.

**Requires:** Study the library's existing practice for the same kind of thing first, and follow it. Put microGPT's own inventions into the library, not into the program. Do not base a design only on the specification's text or on a user-side workaround. Do not use this rule to choose between the library and the compiler's prelude.

**Unfinished:** Not stated. The entry does not say whether microGPT's inventions have already been moved into the library.

**Could not resolve:**
- "He had to find the diagonal's override himself (P-88) because that study was skipped.": "He" has no antecedent. It could be the curator, a worker or someone else. "the diagonal's override" is not explained: it could be an override of a `diagonal` method, a matrix diagonal, or something in microGPT. The sentence tells a past event, not a rule, so a reader cannot tell what it requires. Unclear wording and missing project context, not a language concept.
- "exclusion, for one, is all over it": two readings. (a) The library uses `excludes` clauses on traits widely. (b) The library makes overloads valid by giving their parameter types excluding types (the overloading rule in SKILL.md, "Fortress as a language"). The entry does not say what a worker must copy. Unclear wording.
- "No fix is designed ... from a workaround on the user's side": two readings. (a) Do not fix a gap by working around it in the program that meets it (as `library.md` says). (b) Do not take the library's design from a workaround that a user program wrote. Unclear wording.
- "What microGPT invented": this probably means helpers that the model program defines itself. The entry does not say whether moving them changes model lines, which the skill treats as a point to report. Unclear scope.
- "the library's text": this could be confused with the specification's text. Context suggests the interpreter's library source. Minor wording.

---

## P-146 "In a self-typed trait, the compiled checker types `self` in the method bodies as also being the implementing type."

**Decided:** A self-typed trait is `C[\X\]` where `X extends C[\X\]`, such as `Integral[\I extends Integral[\I\]\]`. Inside its method bodies, the compiled checker gives `self` the intersection type `C[\X\] & X`, so a body may use `self` as an `X`. Method signatures keep the plain type `C[\X\]`, because the POPL 2019 dispatch paper's proofs assume that no declared type puts a type parameter inside an intersection. There is one exception: the overloading check's exclusion test reads `self` in a signature as `C[\X\] & X` (P-157). To keep this sound, the checker refuses an extender that gives the trait a static argument it is not a subtype of: `object Bad extends Integral[\ZZ32\]` is refused, because `Bad` is not a `ZZ32`. This is the same rule Scala has for self types. The library's source is not changed: it gets no self-type syntax and no `comprises` clause. Walk is not changed. The rule accepts every self-typed method body in the library except `Integral`'s `numerator`, which each integer type declares itself. Reason: it follows the library's own way of writing a self type, the F-bound, and peer languages do the same. The compiler's prelude writes the self type as `comprises T` instead. That form does not bind the library, because Naden's last text on the idiom, written after Steele added the clause, still writes self types as bounds only. F-225 states the built rule and holds the dates.

**Applies:** The compiled checker only, on traits of the F-bounded shape `C[\X extends C[\X\]\]`. Walk is unaffected. Signatures are unaffected, except in the exclusion test of the overloading check.

**Requires:** Do not add a self type or a `comprises T` clause to the library to get this typing. Do not write an extender that gives such a trait a static argument it is not a subtype of. Expect `self` in a body to have type `C[\X\] & X`, and in a signature `C[\X\]`. `numerator` is declared per integer type, not as an `Integral` body.

**Unfinished:** None stated. F-225 says the rule is built. "which each integer type declares instead" is in the present tense, which suggests that this is done too, but the entry does not say so outright.

**Could not resolve:**
- "The checker refuses a type that extends such a trait at another type": the limit for a generic intermediate trait is unclear. An example is a trait `D[\X extends D[\X\]\] extends C[\X\]`, or `Integral[\I\]` itself extending another self-typed trait at `I`. Here `D[\X\]` is not a subtype of `X`, so the stated test ("an extender must be a subtype of the static argument that it gives") would read as refusing it. Presumably it is accepted, because `self` there is `D[\X\] & X`, but the entry does not say. Unclear wording about a limit.
- "Naden's last text on the idiom": the skill does not introduce Naden, and it does not say which text this is (a paper, a note or code). The reasoning is understandable without it, but the evidence cannot be placed. Missing context, not a language concept.
- "keeps the self type to bounds": read as "expresses the self type only with an `extends` bound". Readable, but terse.
- "Why `numerator` is refused": not explained. That does not block the rule, but a worker who meets a similar body cannot tell what makes it fail. Unclear, minor.

---

## P-153 "The integer power splits on the base ..."

**Decided:** The behaviour of `^` depends on the type of the base. For every integer type, `^` returns that same integer type at every exponent. At a negative exponent, a base of 1 or -1 gives its exact power (1, or ±1 by parity), a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`. To get a fractional result, a program uses a float or rational base, for example `2.0^(-1)`. Reasons: the Working Draft's power, which gives a rational at a signed exponent, was never built on walk or on the compiled path. The only integer power the team built is the compiler prelude's, which gives `ZZ32`, `NN32` and `NN64` each a power of their own type. Overloads choose by type, and no type separates negative from non-negative exponents, so the choice is made on the base's type and the exponent's sign is checked at run time, as the library checks signs everywhere (P-80). Row 441 records that the compiled path does not yet follow this rule: its powers give 0 at a negative exponent and a raw Java exception at base 0. Row 523 records that they overflow silently or with a raw Java exception.

**Applies:** `^` with an integer base, on both paths (the compiled path's departures are rows 441 and 523). Float and rational bases give a fractional result instead.

**Requires:** Implement or keep an integer `^` that returns its own type, with the three negative-exponent cases above. Test the exponent's sign at run time, not by overload. Do not make an integer `^` return a rational. A program that wants a fraction must write a float or rational base.

**Unfinished:** The compiled path's powers (rows 441, 523). The entry does not say outright that walk's library already follows the rule. "Row 441: the same rule on the compiled path" implies that it does.

**Could not resolve:**
- "Row 441: the same rule on the compiled path, whose own powers give ... (row 523)": this phrase leaves out its verb. It reads either as "row 441 records the gap that the compiled path does not follow this rule" or as "row 441 states this rule for the compiled path". It is also unclear whether "(row 523)" covers only the overflow clause or the whole list. Unclear wording.
- The exponent's type: "Each integer type's `^` returns its own type at every exponent" does not say what types the exponent may have. It could have to match the base's type, or be any integer type, a numeral, or `ZZ32` only. Unclear wording about a limit.
- Overflow at a non-negative exponent: the entry implies `IntegerOverflow` (the skill says overflow raises it, and row 523 calls silent overflow a departure), but does not state it. Minor.
- Which types count as "each integer type": presumably `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`. The entry names only the prelude's three. Minor.

---

## P-154 "A list is ordered only where its element type is totally ordered."

**Decided:** `List[\E\]` gets its lexicographic order (the comparison operators) only when `E` extends `StandardTotalOrder`, through conditional extension, a `where` on the `extends` entry (P-151). Floats and `QQ` are only partially ordered: NaN, and `QQ`'s 0/0, compare with nothing. So under the compiled checker, a list of floats or of `QQ` has no `<`, `CMP` or other ordering comparison, though `=` still works. A pair (tuple) of floats is still ordered; the curator accepted that the pair and the list disagree, as a cost of the list rule. This entry does not decide the rule for tuples. No lexicographic trait over partially ordered elements is added now: the team never wrote one, and the case affects neither the distance to the switch-over nor microGPT. Reasons: the team's only lexicographic traits, in an unfinished draft (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`), both bound the element by a total order, and conditional extension is a form the team wrote (P-151). The draft is not shown to be later than the specification's text, so it is not the team's later word (P-26). Row 774 records walk's half: walk still gives every list an order.

**Applies:** The library's `List`, as the compiled checker sees it. Walk departs (row 774). Tuples are not covered.

**Requires:** Do not give a list of floats or `QQ` an order. Keep `=` on such lists. Do not add a lexicographic trait over partial orders now. Do not change tuples' ordering on the strength of this entry.

**Unfinished:** Walk's half (row 774). The tuples' rule is left open. A partial-order lexicographic trait is deferred, not ruled out.

**Could not resolve:**
- "the distance to the switch-over": not defined in the skill. It is presumably some measure of the work left before the switch-over (the checker count? the natives without a compiled binding?), but the entry does not say which. A project term I lack.
- "A pair of floats stays ordered" together with "The tuples' own rule is not decided here": two readings. (a) Keeping pairs of floats ordered is part of the decision. (b) It only describes today's behaviour, which the open tuple rule may still change. Unclear wording.
- "extends its lexicographic order": "extends" could be the trait relation (the list type extends a lexicographic-order trait) or plain English ("makes its order available"). The trait is not named. Context favours the trait relation. Minor wording.
- "`QQ`'s 0/0": that `QQ` has a 0/0 value is a language fact the skill does not give. I took it from the entry. Minor, a language concept I lack.

---

## P-12 "After the switch-over, walk runs the compiled type checker on its programs, and then uses the static coercions that the checker inserts."

**Decided:** Once the switch-over has happened (the compiled path is on the interpreter's library and the compiler's prelude is deleted), walk runs the compiled type checker on its programs. It thereby gets their static types, and it applies the coercions that the checker inserts, instead of picking a coercion from the run-time value (P-59 covers walk's run-time choice until then). The curator wants the checker usable on walk's programs. Today `fortress typecheck` checks only against the compiler's prelude, so it does not check walk's programs (F-9). Before the switch-over, walk is not changed for this. The work has three parts, and its size has not been measured:
1. walk must run with the Scala checker switched on (it is off today);
2. walk must evaluate the `CoercionInvocation` nodes that the checker inserts, which it has no case for today (F-9);
3. the components that walk's programs import must be cleared of the checker's errors (F-290 counts them).

**Applies:** After the switch-over. Before it, walk keeps choosing coercions by run-time value (P-59).

**Requires:** Do not change walk for this before the switch-over. Do not treat `fortress typecheck` as a check of a walk program. After the switch-over, do the three parts.

**Unfinished:** All three parts. The size is unmeasured.

**Could not resolve:**
- "Walk is not changed for this before the switch-over": it is unclear whether this also forbids part 3 before the switch-over. Part 3 is library work, not a change to walk. (The skill says `FortressLibrary` already counts 0, so part 3 seems to concern other imported components.) Unclear wording about a limit.
- "`CoercionInvocation` nodes": the skill does not name this node. I read it as the syntax-tree node for a coercion call that the checker inserts, which fits the skill's note that walk turns the coercion desugaring off. Minor, an implementation term I lack.

---

## P-17 "Unboxed doubles and arrays of unboxed doubles are required ..."

**Decided:** The revival must represent doubles (`RR64`) unboxed, and arrays of doubles as unboxed storage. Without this the revival fails its purpose. Reasons: a high-performance language cannot box its numbers. The specification says the same: an implementation may freely copy value objects, floats among them (`Specification/basic/objects.tex`), and a `LinearSequence` of a value type holds "unboxed" values (`Specification/advanced-lib/binary.tex`). Today the code generator boxes every number (`RR64` becomes an `FRR64` object). In Java models of microGPT's three array kernels (dot product, matrix product, row lift), boxing is the main cost (F-11). P-84 decides how arrays store doubles: as `double[]`.

**Applies:** Presumably the compiled path (the code generator), since that is what boxes today. The entry does not state a scope.

**Requires:** Treat unboxed doubles and `double[]` arrays as a must. A design that keeps doubles boxed does not meet the goal. For the array layout, follow P-84.

**Unfinished:** All of it. The code generator boxes every number today and emits no primitive `double` arithmetic (`references/compiler.md`). Unboxed arrays are not built either.

**Could not resolve:**
- Scope of "unboxed doubles": the entry does not say whether doubles must be unboxed everywhere (locals, fields, parameters, returns, generic instances), or only in the kernels and arrays. It also names doubles only, while its reason ("cannot box its numbers") covers every number type, such as `ZZ32` and `RR32`. Two readings. Unclear wording about a limit.
- Which path: compiled only, or walk too? This is implied (compiled) but not stated. Minor.
- "row lift": a microGPT kernel the skill does not describe. That does not block the rule. Missing context, minor.
