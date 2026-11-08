# Cold read: climb-batch-28 orientation

I read `CLAUDE.md`, the `fortress-repo` core (`.claude/skills/fortress-repo/SKILL.md`) and `explorations/compile-ladder/climb-batch-28/orientation/orientation.md`. I opened nothing else. Line numbers below are those of `orientation.md`.

## 1. What I would do differently, by section

### Preamble (lines 1-7)

- I would take a bold sentence as the rule of this tree. I would cite a sentence with a P-N as a curator decision. I would build on a sentence without a P-N, but not cite it as a decision.
- I would read a sentence that cites a ledger row as a departure of one path, and not assert that behaviour as correct in a test. Limit: the passage does not say what to do instead (see 2.6).
- When a sentence opens "Until the switch-over", I would leave the compiler's prelude alone and not fix the limit there.
- Before I call a disagreement a conflict, I would search FACTS and POSITIONS.
- I would stop trusting old notes, team tests and my training on three points: the number types do not nest, fixed-width arithmetic raises instead of wrapping, and walk converts arguments.
- On a question about the specification, I would treat `Specification-1.0-frozen/` (the Working Draft) as the team's unrevised text, and let the later type papers win over the early specification (P-26).

### Dispatch and overloading (lines 9-24)

- I would accept overloads that differ only in the bounds of their static parameters (P-45). I would judge them on declared domains, and require the more specific declaration's return type to be a subtype of the other's at every instance.
- For generic overloads, I would read exclusion over the whole tuple of parameter types (P-152):
  - a generic type shared by both declarations forces their static arguments to be equal;
  - a pair that leaves a static parameter free is refused on both paths.
- In its test of exclusion, the checker puts the meet of a parameter's bounds in place of a parameter that stands as a whole type, a tuple element, or a member of an intersection or union. It does not do this inside a static argument (P-157).
- Under walk, I would never rely on the order of declarations. I would read "Cannot unify" on a trait's generic method as a bound violation.
- I would not take walk's load check, refusing or accepting, as the verdict. Before I change code to satisfy it, I would look up the case in `interpreter.md`, "What walk checks".
- I would not write two functional methods with the same parameter types and `self` at different positions. I would not pair an abstract and a concrete method at the same types.
- In an object that inherits an abstract functional method from one trait and its body from another, I would declare the method in the object itself (P-149), unlike Scala.
- When a program's trait declares its own functional `+`, `-`, `MIN` or `MAX`, I would add `excludes { Number }` or `excludes { HasRank }`, or declare the operator in an object.
  - Without that, walk refuses the program at load with "fails the Meet Rule", and the checker does not catch the case across components (row 918).
  - Limit: whether this applies to a self-typed trait is unclear (see 2.3).

### Traits and objects (lines 26-62)

- Generic instantiations:
  - I would never let a type extend two instantiations of one generic trait. The checker refuses it; walk runs it.
  - In code that runs under walk, I would avoid overloads on two instantiations, such as `Tg[\3\]` and `Tg[\4\]`. They are valid, but walk refuses them (row 416).
  - I would not copy specification examples marked "Not allowed".
- `comprises`: I would write the clause about values and not list every subtype. I would not rely on walk to catch an illegal extender of a trait outside the main component (row 551).
- `override`:
  - I would use `override` only to widen: the inherited parameter types must be strictly narrower than mine. To replace an inherited declaration at the same types, I would declare it again without `override`.
  - I would never write a Java-style `override` in the library: under walk it stops every program.
  - In a program that will be compiled, I would write no `override` at all (row 650).
- Implementing an abstract method in an object: the bodies must together cover its parameter types. Where the abstract method or a covering method is generic, I would give one body at the abstract's types (row 725). I would not count on walk to check a generic object (row 665).
- Self-typed traits:
  - In a self-typed trait, I would return `self` without a cast, and extend `T[\A\]` only from an `A`.
  - In compiled code, I would expect a body that returns `self` to fail verification (row 695). The `floor` example is such a body.
- `Index`:
  - I would bound index parameters with `I extends Index` in the library, and in code that runs under walk or is checked against the interpreter's library. I would not write the bound in compiled programs until the switch-over.
  - I would pass a `ZZ32` value, not a numeral, to a parameter of type `Index`.
  - A tuple of `Index` types is an `Index`, and `()` is not. `f(Index)` and `f((Index, Index))` do not exclude each other.
- Tuple order: I would compare tuples only where every element type extends `StandardPartialOrder`. Under walk, I would not mix numeric run-time types at one position (row 511). I would not order a `List[\RR64\]`.
- Equality:
  - A type without its own `=` compares by `SEQV`, so I would give a value object its own `=` to compare by content.
  - For boolean equivalence I would write `<->`, never `≡`/`EQV`.
  - For a type that does not extend `Equality`, I would write `assert(x = y, msg)`, not `assert(x, y, msg)`.
  - I would compare strings with `=`.

### Static parameters, `where` clauses and sizes (lines 64-83)

- I would expect a type parameter that a call does not fix to take its bound. Under walk, a parameter whose bound names itself prints as `OPEN`.
- I would write the static arguments where walk still gives `Bottom` (rows 591, 612, 587). Under walk, I would also write them on an inner call that needs its enclosing call's context, as in `mk[\ZZ64\]()` (row 705).
- I would use only the three built `where` forms. Any other form on an `extends` entry is silently read as unconditional.
- I would not rely on any run-time check of a `where` condition. In compiled code, I would avoid functions and methods whose own clause introduces a variable, such as `where [\nat n\]` (row 867).
- Two sizes are equal only when they are written alike after numeral arithmetic. The checker refuses a size power above the exponent 4096.
- I would keep `reflect`/`NatParam`, and any trait whose `comprises` clause lists a type at a `where`-clause size, out of compiled code, both now and after the switch-over (row 307).

### Numbers (lines 85-99)

- I would read "route A" and "the tower" in the record as flat siblings.
- Under walk:
  - I would write `Cell[\ZZ32\](3)` where I need a `Cell[\ZZ32\]`, because a numeral instantiates a generic at `Int`.
  - I would read `Int` in walk's error messages as `ZZ32`.
  - I would always write the static arguments of `array1` and `array2` (row 721).
- I would rely on coercion and on promotion of generic calls. I would expect "Ambiguous coercion" when tied declarations apply only by coercion.
- To convert an integer, I would use the checked getters (`asZZ32`, ...) or the low-bits functions (`narrow`, ...), which wrap. On a `ZZ`, I would use only `z.asZZ32` and the other getters.
- I would never call a number operation in generic code over `T extends Number`; I would declare the function once for each number type. To compare across types, I would write `asFloat(x) = y`.
- For a negative exponent, I would write `2.0^(-1)` or a `QQ` base, never `10^(-k)`.
- I would expect `7 / 2` to be a `QQ`. I would truncate with `DIV`. For a float quotient, I would make one `ZZ32` operand a float, and convert each `ZZ64` operand with `asFloat`.

### Reductions and comprehensions (lines 101-111)

- I would write the static argument on every `SUM`, `PROD`, `BIG MAX` and `BIG MIN` clause form.
- Under walk, only a local variable's type, or a top-level or local function's return type, directs a reduction without a static argument. A method's return type, a field and an assignment do not.
- I would read `__bigOperator`, "body param 1", as an element that does not convert to the instance.
- In my own reduction, I would declare `simpleJoin` at `R`, never at `Any` or untyped, and I would not copy the team's tests.

### Implementation limits (lines 113-117)

- I would never write a `Maybe` as an `if` condition.
- I would write the type of every parameter, for compiled code and for a method that implements an abstract one.

## 2. Passages that send a worker wrong, read two ways, or use a term the core does not give

**2.1. Line 62, "Both false answers are the rule's: assert them as correct."** (Reads two ways. High that it is ambiguous; medium that it misleads.)
- The paragraph gives four `false` answers: `V(s) = V(t)`, `"ab" SEQV "ab"`, `V("ab") = V("ab")` and `(s, 1, 2, 3) = (t, 1, 2, 3)`. "Both" does not say which two may be asserted.
- `"ab" SEQV "ab"` being `false` rests on "Under walk, each evaluation of a string literal makes a new string". The passage does not say whether the compiled path interns literals. If it does, a test that asserts this `false` holds only under walk.

**2.2. Line 62, "Under walk a float numeral is a `FloatLiteral` ... so it is not equivalent to a computed `RR64`."** (Medium.)
- The passage does not say whether `x = 0.5` is true for a computed `x: RR64`, by `RR64`'s own `=` and a coercion. Line 95 makes `=` across types depend on a coercion, but never says that `FloatLiteral` coerces to `RR64`.
- `assert(x = 0.5, ...)` is a common test line, so a worker may avoid it needlessly, or misread a `false`.
- The case that does follow, a value object holding an `RR64` field compared by `SEQV`, is not spelled out.

**2.3. Lines 24 and 43, a program's own functional `+`.** (Reads two ways, possibly a contradiction. Medium.)
- Line 24 says that a program's trait with its own functional `+` overlaps the library's array-number `+`, and that walk refuses it at load unless the trait gets an `excludes` clause.
- Line 43 says that, for a self-typed trait, walk "loads such a pair in the library and in a program's own component".
- Unless line 24 means only traits that are not self-typed, the two contradict. A worker who writes `trait G[\X extends G[\X\]\]` with `+` cannot tell whether `excludes { Number }` is needed.
- "such a pair" (line 43) also has no clear antecedent.

**2.4. Line 89, "Walk answers `IntLiteral`'s arithmetic as a `ZZ32` (row 578)."** (Medium.)
- The sentences just before say that walk has no `IntLiteral`: a numeral is an `Int`, a `Long` or a `BigNum`.
- So it is unclear what "IntLiteral's arithmetic" is under walk: arithmetic on numerals, such as `2147483647 + 1` overflowing at 32 bits, or arithmetic that the checker would type as `IntLiteral`.

**2.5. Line 48, the order of the `Index` instructions.** (Would send wrong on a partial read. Medium.)
- "In the library, and in your own generic over such a type, write `I extends Index`" comes first.
- Nine sentences later comes the limit: "write the bound only in code that runs under walk or is checked against the interpreter's library".
- The model programs are compiled, so a worker who acts on the first sentence breaks the compile. The limit belongs beside the instruction.

**2.6. Line 7, "do not assert it as correct in a test".** (Reads two ways. Medium.)
- It does not say what to do instead: assert the bold rule and mark the test as an `XXX` expected failure (the core's term), or keep the case out of tests.

**2.7. Bold sentences that state a path difference as the rule.** (Medium.)
- These conflict with line 5, "Each bold rule states the rule of this tree", and with line 7's reading of row citations:
  - line 72, "**Only the checker gives a call written as an argument the enclosing call's context (P-51).**", yet walk's lack of it is row 705, a departure;
  - line 105, "**A reduction's static argument depends on the path.**", yet the checker's failure to infer it is row 731.
- A worker may take the difference between the paths as settled, and assert walk's side of it.

**2.8. Departures without a row or "Until the switch-over".** (Medium-low.)
- Line 79: "The code generator accepts a declaration's own `where` clause but emits no code for it, so the compiled runtime does not check it."
- Line 111: "A generic one stops at its first join."
- By lines 5-7, each is a rule to build on, but each reads as a defect. A worker could assert them.

**2.9. Line 17, "walk compares two functional methods of a generic trait or object on their declared domains only at a call (row 780)".** (Reads two ways. Medium.)
- It can mean (a): walk's load check skips such pairs, and the problem shows only when the method is called.
- It can mean (b): at a call, walk compares them only by declared domains, not at the call's instances (compare line 15).

**2.10. Line 32, "`override` widens".** (Low-medium.)
- It says when an `override` overrides, but not what overriding does under multiple dispatch. Presumably the wider body then runs at the inherited, narrower types too, where dispatch would otherwise choose the narrower one. A reader coming from Java must infer this.

**2.11. Line 66, the `pick` example.** (Low-medium.)
- The declaration of `T` is not shown, and the rule holds only where `T` stays `OPEN`, that is, where its bound names it.
- A reader may conclude that every generic `pick(x: (T,T))` loses `(1, 2)` to `pick(x: Any)`.

**2.12. Line 93, "`ZZ` has only `big`".** (Low-medium.)
- It means only `big` among the low-bits functions. Read alone, it contradicts "write `z.asZZ32`" in the same sentence.
- "because under walk `narrow(z)` finds no declaration" makes a rule that holds on both paths sound like a gap of walk.

**2.13. Line 53, where "(row 511)" applies.** (Low-medium.)
- The row closes the second sentence only. It is unclear whether walk's refusal of `(1,()) < (2,())`, where the earlier element decides, is the rule or also a departure.

**2.14. Lines 105 and 109, "Write it in every clause form" against row 436.** (Medium-low.)
- A written static argument that is not a number type ends an empty `SUM` in `CastError` under walk. So a `SUM` over vectors that may be empty fails if the worker follows the instruction, and no workaround is given.
- The passage also does not say whether a form without a clause, such as `SUM xs`, needs the static argument.

**2.15. Line 111, "lifts its elements to `Maybe[\R\]` inside the reduction".** (Low-medium.)
- It does not say what an empty `BIG MAX` or `BIG MIN` answers, or what the worker should write.

**2.16. Line 62, `≠`.** (Low-medium.)
- "Under walk, `≠` ... and `assert(x, y, msg)` reach a type's own `=` only if ..." gives a workaround for `assert` only. Nothing is said for `≠`; presumably `NOT (x = y)`.

**2.17. "the specification" (lines 3, 5, 55 and 115).** (Low.)
- Line 3 means the team's text, one of the three forms that the team left. Elsewhere it means the revised `Specification/`.
- The original text is placed both in `Specification-1.0-frozen/` and in Appendix I. It is not said which one to cite for the team's wording.

**2.18. Line 117, "(row 405)".** (Low.)
- It is unclear which behaviour is the departure: walk running a parameter without a type, or walk refusing one in a method that implements an abstract one.

**2.19. Line 24, "an object excludes every trait that it does not extend, but no other type can extend it".** (Low.)
- "but" should be "because". Read literally, the clause sounds like a limitation.

**2.20. Line 24, "An abstract functional method also counts for it".** (Low.)
- "counts" can mean as an overload under the Meet Rule, or as the covering declaration. The example settles the first meaning.

**2.21. Line 11, "at every instance, not at one only".** (Low.)
- It can mean every instance of the more specific declaration's static parameters, or every instance where both declarations apply.

**2.22. Line 21, "an abstract and a concrete method with the same parameter types in one trait".** (Low.)
- It sits under a heading about functional methods. It does not say whether dotted methods are covered too.

**2.23. Terms the core does not give.** (Low.)
- "meet" (lines 13, 24, 30): the core defines join, but uses "meet" without defining it.
- "extenders" (line 30).
- "count stage" (line 48): the core names it, but does not define it.
- "instance" (lines 11-15), for the core's "instantiation".
- "cover" as a verb (line 34).
- Appendix I: the core names it only as a part topic.
- The orientation defines its own terms: Working Draft, declared domain, Meet Rule, self-typed, `OPEN`, clause form, promotion, route A/C.

**2.24. The file's name for itself.** (Low; I could not check the intended layout.)
- Lines 3 and 5 call the file "This part" and say "Read the part whole, after `SKILL.md`". The core tells a worker to read `references/revival-changes.md` whole.
- If this file becomes the skill's orientation, the two names do not match.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

The orientation holds almost no repair history: no batch numbers, and no stories of how something came to be. The candidates below are detail.

**3.1. Line 87, "Route C is the way not chosen: a checker rule under which the number types could nest again."** (Medium.)
- This is the history of a decision, and no action depends on it.
- The glosses of "route A" and "the tower" do prevent a misreading of the record, so keep those.

**3.2. Line 93, "the compiler's prelude has 8 of the 25 getters, none on `ZZ`, and no `big` (row 349)".** (Medium-low.)
- The count does not say which 8 getters, so a worker who writes compiled code must look them up anyway.
- The actionable part is shorter: until the switch-over, a compiled program may lack a getter, has none on `ZZ`, and has no `big`.

**3.3. Line 97, "Its `ZZ32` power gives 0 at a negative exponent for other bases. At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)."** (Low.)
- This describes a prelude that will be deleted and must not be fixed. It only helps a worker read a compiled failure.

**3.4. Line 62, last sentence (the compiler's `===` compares by `=`, row 908).** (Low.)
- This is the same kind of prelude detail as 3.3.

**3.5. Line 81, "except of 0, 1 or -1", and "The class loader computes a size without checking its kind, and stops on a negative exponent with a Java exception (row 675)."** (Low.)
- These are rare cases, and neither tells a worker to do anything.

**3.6. Line 43, "With this reading and the bounds that the test reads ..., the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own."** (Low.)
- This justifies P-157 from the library's own case. It changes nothing for a worker who writes a program. For one who edits the library, it says that the pair is intended.

**3.7. Line 15, "It infers a dotted generic method's static arguments from the arguments' run-time types, as for a generic function."** (Low.)
- It reads as a note about a defect that was fixed, since it says walk does what a reader would expect. It prevents no misunderstanding, unless the reader expected otherwise.
