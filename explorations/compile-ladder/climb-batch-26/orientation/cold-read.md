# Cold read: climb-batch-26 orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `explorations/compile-ladder/climb-batch-26/orientation/orientation.md`. Nothing else was opened. Line numbers are lines of `orientation.md`.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)
- I would treat a bold sentence as this tree's rule. I would cite a sentence as the curator's decision only when it names a P-N entry. Limit: I may build on a sentence with no P-N, but I may not cite it as a decision.
- I would not assert in a test any behaviour that a sentence ties to a ledger row. That sentence describes a departure that a fix can remove.
- I would not fix an "Until the switch-over" limit in the compiler's prelude.
- I would search FACTS and POSITIONS before I call a disagreement a conflict.
- I would distrust old notes, the team's tests and my own training on three points: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- I would read the Working Draft (`Specification-1.0-frozen/`) as the unrevised text. Where the two disagree, I would follow `Specification/` and the later papers.

### Dispatch and overloading (lines 9-24)
- I would allow two overloads that differ only in the bounds of their static parameters (P-45). I would judge specificity on declared domains, and require the more specific return type to be a subtype at every instance.
- With generic parameters, I would test exclusion over the whole parameter tuple (P-152). I would expect a pair to be refused when a static parameter is left untied (the `U` example).
- I would not take walk's load check as the verdict, in either direction. Before changing code to satisfy walk, I would look the case up in `interpreter.md`, "What walk checks".
- I would treat `f(self, y: S)` and `f(x: S, self)` as duplicates. The same goes for an abstract and a concrete method at the same types in one trait, and for an object that inherits the abstract method from one trait and the body from another without declaring it itself (P-149).
- I would count an abstract functional method under the Meet Rule. So a trait method `h(self)` next to a top-level `h(x: String)` needs a cover or an `excludes`.

### Traits and objects (lines 26-53)
- I would never make a type extend two instantiations of one generic trait (P-43, P-97), and I would not copy the specification examples marked "Not allowed".
- I would read `comprises` as a statement about values (P-60). It need not list every direct subtype.
- I would not write `override` in the Java way. It applies only when the declaration widens the inherited parameter types. To replace an inherited declaration at the same types, I would redeclare it without `override`. In compiled code I would avoid `override` entirely, because the code generator refuses it (row 650).
- An object must cover each inherited abstract method with one body or with several narrower bodies (P-147). In compiled code I would not rely on a cover by several bodies when generics are involved (row 725).
- In a self-typed trait, I would write `floor(self): I = self` without a cast. I would not compile a body of such a trait that returns `self` (row 695).
- In generics over indexed types I would write `I extends Index` (P-156). I would pass a `ZZ32`, never a numeral or a `ZZ64`, where an `Index` is expected. I would not use `Index` in compiled programs before the switch-over.
- I would order tuples only when every element type is a `StandardPartialOrder`. I would order lists only when `E extends StandardTotalOrder[\E\]` (P-154), so a list of `RR64` has no order.

### Static parameters, `where` clauses and sizes (lines 55-74)
- I would expect an unfixed type parameter to take its bound, not `Nothing` (P-48). I would recognise `OPEN` in walk's output, and know the three cases that still give `Bottom` (rows 591, 612, 587).
- Under walk I would write static arguments on a call nested as an argument (`mk[\ZZ64\]()`), because only the checker passes context to it (P-51).
- I would use only the three `where` forms that are built (P-151). In compiled code I would not rely on a `where` condition being checked, and would not call anything whose own clause introduces a variable such as `where [\nat n\]` (row 867).
- I would compare sizes by written form after numeral arithmetic. A static size is never known to differ from a numeral.
- I would not compile a call that uses `reflect` or `NatParam`. I would not give my own trait a `comprises` that lists a type at a `where`-clause size if it must run compiled (row 307).

### Numbers (lines 76-86)
- I would read "the tower" and "route A" in the record as flat siblings (P-43).
- Under walk I would expect numerals to be `Int`, `Long` or `BigNum`, so `Box[\Int\]` is not `Box[\ZZ32\]`. I would write the static argument on `array1` and `array2`.
- I would expect coercion at calls, bindings and assignments (P-59), and promotion to the narrowest common type (P-74). I would expect no promotion inside tuples or varargs under walk.
- I would write `2.0^(-1)` or a `QQ` base for a non-integer power (P-153). I would not use negative integer exponents compiled before the switch-over.
- I would expect `7 / 2` to be a `QQ`. I would truncate with `DIV`, and get a float with `(1.0 s) / n` or with `asFloat`. In compiled code before the switch-over I would use `/` only at `RR64`.

### Reductions and comprehensions (lines 88-98)
- I would write the static argument on every `SUM`, `PROD`, `BIG MAX` and `BIG MIN` in clause form (row 731).
- Under walk, I would know that only a local variable's type or a function's return type directs the instance. An error in `__bigOperator` "body param 1" would tell me an element failed to convert.
- I would not trust an empty `SUM` without a declared type (row 716).
- I would not declare `simpleJoin` at `Any` or leave it untyped, and I would not copy the team's tests that do so.

### Implementation limits (lines 100-104)
- I would never write a `Maybe` as an `if` condition, even though walk accepts one.
- I would write every parameter type, including on local functions, because the compiled path refuses a missing one.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

1. **Lines 1 and 3, the file's identity (high).** The core sends the worker to `references/revival-changes.md`, a part to "read whole, after this file". This file calls itself "This part", repeats that same instruction, and carries the matching title. The core cites it too: `revival-changes.md`, "Static parameters", matches the heading at line 55. Nothing says whether this orientation replaces that reference, sits beside it, or is the same text. A worker cannot tell which one to read, or whether to read both.
2. **Line 7, the row convention, with its unmarked exceptions (high).** By line 7, a sentence with no row states the rule of this tree. Several sentences read as departures but cite no row:
   - lines 43-46: "Walk still refuses the pair in two cases";
   - line 57: walk reads a type that holds `OPEN` as if it held `Bottom` (`pick(x: (T,T))` takes no `(1, 2)`);
   - line 70: "The checker reads an `extends` entry with any other `where` clause as unconditional, without a message", and "the compiled run time does not check it";
   - line 98: "A generic one stops at its first join";
   - line 15: "fails with 'Cannot unify'".

   By the convention, a worker could assert any of these in a test as correct behaviour.
3. **Line 102, walk and the checker (medium-high).** "until it runs the checker after the switch-over (P-12)". In the core, the switch-over moves the compiled path onto the interpreter's library, and walk switches the type check off. Nothing in the core says walk turns the checker on at the switch-over. This reads as a second meaning of "switch-over", or as a new plan the core does not state.
4. **Line 28, "Walk applies no instantiation exclusion ... and refuses overloads on two instantiations" (medium).** One reading: walk does not treat `Tg[\3\]` and `Tg[\4\]` as excluding each other, so it refuses the pair as ambiguous. The other reading: walk refuses such overloads on purpose. "Exclusion" is also used here in two senses: the exclusion rule (no type extends two instantiations) and `excludes`/exclude between domains. The core gives only the first.
5. **Line 32, `override` (medium).** "only where the inherited parameter types are strictly narrower than its own" inverts the Java intuition, and the sentence is easy to misread. The section also does not say what to do about the library's own `override`s, given that "the code generator refuses every `override` modifier".
6. **Line 39, "or by a self-typed trait that `T` extends at `X`" (medium).** It reads two ways. Is `X` bounded by `U[\X\]` where `T extends U[\X\]`? Or does `T` extend `U` at some other argument? An example would settle it.
7. **Line 53, ordering (medium).** "Walk refuses another element type at the call" names walk only. It does not say whether this is the rule on both paths or a departure of walk. The row (511) is attached only to the next sentence. The checker's behaviour for tuples is not given.
8. **Line 80, "Walk answers `IntLiteral`'s arithmetic as a `ZZ32` (row 578)" (medium).** The same paragraph says that under walk a numeral is `Int`, `Long` or `BigNum`, not `IntLiteral`. It is unclear what `IntLiteral` arithmetic means under walk. The paragraph's second half (`array1`/`array2`) falls outside its bold heading.
9. **Line 82, "Where the tied declarations differ only where the call passes a numeral" (low-medium).** It is unclear whether this means they differ only at the numeral's position, or only when a numeral is passed.
10. **Line 98 (medium).** "BIG MAX over a generator still answers `R`" does not say what an empty `BIG MAX` gives. "The team's tests do so" could refer to either of the two preceding sentences.
11. **Line 70, "compiles a declaration's own `where` clause and emits no code for it" (low).** "Compiles" reads as code being generated. "Accepts" is what seems to be meant.
12. **Terms the core does not give:**
    - "Meet Rule" (line 24): the core says only "a third covers their meet".
    - "meet" itself: the core defines "join" but not "meet".
    - "count stage" (line 48): the core uses it once without defining it.
    - "P-N" numbering: the core names POSITIONS but not the P- labels.
    - "row N": the core says the ledger has rows, but not that they are cited by number.
    - "route A/C", "the tower" (line 78): defined here, but only as record vocabulary.
    - "descriptor" (line 72): from the core, unexplained.
    - "declared domain": defined at line 11, then used.
    - "Ambiguous coercion" (line 82): fine, it is a message.
13. **Line 48, row 364 (low).** Row 364 is cited here for walk accepting `f(3)`, and at line 80 for `Box[\Int\]`. That is plausibly one cause, but the text never says so.
14. **Line 7, "fixed-width arithmetic does not wrap" (low).** The core's list of parts says `library.md` covers "wrapping". A worker who needs wrapping arithmetic gets no pointer here.
15. **Line 48, density (low).** One paragraph holds about fifteen separate rules about `Index`. The two that matter most (pass a `ZZ32`, write `I extends Index`) are easy to lose.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

- **Line 78:** "Route C is the way not chosen: a checker rule under which the number types could nest again." This is history of a choice. The decoding of "route A" and "the tower" does prevent misreading the record, so keep that part.
- **Line 22:** "The Scala language accepts it." This is a comparison that changes no action, though it does warn against carrying Scala habits over. Borderline.
- **Line 43:** "the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own". This is the evidence that motivated the rule, not a rule a worker applies.
- **Line 13, last two sentences:** the meet-of-bounds substitution and "Inside a static argument ... the parameter stays". This is how the checker works inside. A worker writing overloads cannot act on it without an example of a pair that it admits or refuses.
- **Line 74:** "After the switch-over, such a call still fails, for a second reason ...". This is forward-looking causal detail. The action is only "do not compile `reflect` calls, or `comprises` at a `where` size". The two-reasons story could shrink to that.
- **Line 72:** "The checker refuses a size power above the exponent 4096, except of 0, 1 or -1." This is a limit almost no task meets. The class loader's Java exception (row 675) is similar.
- **Line 84:** the compiler-library power details ("At a base of 0 it throws a Java exception that no `catch` sees"). This is pre-switch-over detail that matters only to someone testing compiled powers, but it does prevent a misread failure. Borderline.
- **Line 5:** "Most rules follow the team's later type papers ... (P-26; `exploring.md`)". This is the rationale for the rules. It is useful only when exploring, and could move to `exploring.md`.
