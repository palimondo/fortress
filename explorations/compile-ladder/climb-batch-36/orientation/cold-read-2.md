# Cold read 2 of the orientation (climb-batch-36)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `explorations/compile-ladder/climb-batch-36/orientation/orientation.md`. Nothing else was opened. Line numbers below are the orientation's.

## 1. What I would do differently, section by section

### Opening (lines 1-7)

- Read each bold sentence as this tree's rule, a sentence that names P-N as the curator's decision (citable as one), and any other sentence as something to build on but not cite as a decision.
- Treat a sentence that cites a ledger row, or an F-N in place of one, as unsettled. If the rules decide the case, assert their answer in an `XXX` test. If they do not, assert today's behaviour in a plain test and cite the row.
- Treat a sentence that opens "Until the switch-over" as a limit of the compiler's library, and never fix it in the compiler's prelude.
- Search FACTS and POSITIONS before I call a disagreement a conflict.
- Distrust old notes, team tests and my own training on three points: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- Where `Specification/` and `Papers/` disagree, follow the later papers (P-26). The Working Draft is `Specification-1.0-frozen/`, and Appendix I keeps any text that a rule replaced.

Limits: the section does not say how to tell a departure from an undecided case when a sentence cites a row but names no rule. It does not say what to cite for a rule that has no P-N. It does not say whether the "Until the switch-over" limits still apply under `FORTRESS_LIBRARY=one` (see 2.A, 2.D).

### Dispatch and overloading (9-24)

- Overloads that differ only in the bounds of their static parameters are allowed. The more specific one's return type must fit at every instance, not at one.
- For generic overloads, read exclusion over the whole tuple: a shared generic type at one position ties the parameters together. A pair whose exclusion needs a parameter left free is refused on both paths.
- Never rely on declaration order.
- Never take walk's load check as the verdict. Before changing code to get past it, look the case up in `interpreter.md`, "What walk checks".
- Do not declare `f(self, y: S)` beside `f(x: S, self)`. Do not put an abstract and a concrete method with the same parameter types in one trait. When an object inherits an abstract functional method from one trait and its body from another, declare the method in the object.
- Count abstract functional methods as overloads under the Meet Rule.
- Give a program's trait that declares its own functional `+`, `-`, `MIN` or `MAX` the clause `excludes { Number }`, or `excludes { HasRank }` if it extends `Number`. Or declare the operator in an object. A compile that passes is no evidence here, because the checker accepts the overlap with the library's `+` (row 918) while walk refuses it at load.

Limit: for `h(self)` beside `h(x: String)` the section gives only the checker's verdict, not walk's.

### Traits and objects (26-64)

- Never let a type extend two instantiations of one generic trait, and do not copy the Working Draft examples marked "Not allowed". Under walk, avoid overloads that differ only by instantiation, such as `Tg[\3\]` against `Tg[\4\]` (row 416).
- A `comprises` clause is about values. A generic trait below a listed type need not be listed itself, and several declarations together can cover a meet.
- Use `override` only to widen the parameter types. To replace an inherited declaration at the same types, redeclare it without `override`. A Java-style `override` in the library stops every program under walk.
- An object must cover each inherited abstract method. The checker does not accept several narrower bodies when static parameters are involved (row 725), and walk skips the check for generic objects (row 665).
- In a self-typed trait, `self` is `T[\X\]` met with `X`, so return `self` at `X` without a cast. The object must be an `A` for every `T[\A\]` it extends. In a `typecase` that mixes `self` with another value, bind it first as `do r: X = self; r end` (row 1070). Before a compiled program relies on a call from a `T` body to a method on `X` in a generic object, write a compiled test of it (row 1052).
- When an object redeclares an abstract dotted method of `T`, use `T`'s return type with the object's type for `X`, or declare both as getters (row 1094).
- In a generic over an indexed type, write `I extends Index`. Only `ZZ32` indexes, so convert a `ZZ64` index with `asZZ32`. `m[i, j]` passes one pair index, and `()` is not an `Index`. The checker refuses a tuple expression at an `Index` parameter (row 805), so make that parameter `I extends Index`.
- Compare pairs and triples only when every element type has `StandardPartialOrder`. Under walk, never compare tuples whose elements at one position are numbers of two run-time types (row 511). The checker gives a list of `RR64` no order.
- Equality: a value object without its own `=` compares by `SEQV`, so its string fields compare by identity. Tuples of four or more elements fall back to `SEQV` (row 923). Give such value objects an `=`. Use `SEQV` or `===` for identity, never `EQV`, which is boolean equivalence only.

Limit: equality, tuple ordering and `Index` sit under "Traits and objects". I would have looked for `=` under "Numbers".

### Static parameters, `where` clauses and sizes (66-85)

- A type parameter that a call does not fix takes its bound, not `Nothing`. Under walk, a self-bounded parameter stays `OPEN`. Where walk gives `Bottom` (rows 591, 612, 587), write the static arguments.
- Under walk, write the static arguments of a generic call that is itself an argument, as `mk[\ZZ64\]()` (row 705).
- Use only the three `where` forms that are built. Do not rely on a conditional extension's condition, or on a method's own `where`, being checked at run time. On the compiled path, avoid calls whose own `where` introduces a variable (row 867).
- Write each size in one canonical form, since `s0 s1` is not `s1 s0`. Keep size exponents at 4096 or below and never negative.
- Sizes known only at run time, from `reflect`, work under walk only, even after the switch-over. Keep them out of compiled code.

Limit: the `OPEN` passage reads two ways (2.O).

### Numbers (87-116)

- Never write `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong`. Write a catch-all `typecase` arm as `x: Any =>`. Check the spelling of the types in a tuple arm: under walk, a misspelled name matches anything (row 1064).
- Never extend a number type. Declare a program's own number type below `Number`, as a value object with a numeral coercion that is generic over the numeral's numbers and bounded by a `where` clause. Add a coercion from the default type (`QQ`, `ZZ32`) if folded constants must reach the type. `array1` and `array2` give only a plain array at such a type.
- Type each binding that should not take the default: `lr: RR64 = 1/1000`, because an untyped `1/1000` is a `QQ` under walk. Do not count on `x = 0.1` becoming a `QQ` later.
- An expression of numerals alone folds exactly: `2147483647 + 1` does not overflow, and `0.1 + 0.2 = 0.3` is `true`. In a test of run-time arithmetic, give the expression a variable operand.
- Convert between integer types with `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ` (checked), or with `narrow`, `widen`, `signed`, `unsigned` and `big` (wrapping). `ZZ` has only `big`.
- Convert to `RR64` with `asFloat(x)` (one library). `ZZ32` coerces to `RR64` implicitly, but `ZZ64` does not.
- `/` on two integers gives a `QQ`. `DIV` truncates toward zero. For a float quotient, make one operand a float.
- At a negative exponent, an integer power raises `IntegerOverflow` (or `DivisionByZero` at base 0) except at bases 1 and -1. Write `10.0^(-k)`.
- `=` across number types holds only where a coercion exists. Otherwise it answers `false` silently, for example a `ZZ64` against an equal `RR64`. At known types, compare through `asFloat`.
- A numeral argument can choose a narrower overload through its coercion: `k(5)` runs `k(x: NN32)`. Do not rely on `g(5)` beside a generic `g` (row 1017).
- Keep numeral coercion bodies pure: each place computes its value once, and on the compiled path before `run()`.

Limits: the section does not say how compiled code with today's prelude converts to `RR64`. It does not say whether a folded constant written with radix points defaults to `RR64` or to `QQ` (2.G, 2.I).

### Reductions and comprehensions (118-130)

- In a program for both paths, write the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` wherever the value lands at a method's return type, a field, a top-level variable or an assignment, as in `SUM[\RR64\][...]` (row 1008).
- Write both static arguments of `BIG MIN_MAX` (row 1007).
- Under walk, give an empty `SUM` a declared type.
- For a reduction of my own without an identity, extend `AssociativeReduction[\R\]` and declare `simpleJoin` at `R`, never at `Any` or untyped. Do not copy the team's tests.

Limits: the section does not say what an empty `BIG MAX` answers, or which reductions have a bound that does not name their parameter (2.P, 2.Q).

### Implementation limits (132-136)

- Never use a `Maybe` as an `if` condition.
- Write every parameter type, even where walk runs without one. Write the return type unless the api gives it.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

**A. Line 5 against the core's "Cite a source for each claim" (medium-high).** "Build on a sentence without one, but do not cite it as a decision." The orientation is a skill file outside `explorations/`, so it is not part of the record. That leaves a worker with no source it may cite for a rule without a P-N. It will either cite the skill, which is not a listed source, or go and reproduce the rule.

**B. Line 5, "Each bold rule states the rule of this tree" (medium).** Several bold sentences describe an implementation, not a rule:
- line 15: "Walk chooses by declared parameter types…"
- line 17: "Walk's load check is not the verdict…"
- line 74: "Only the checker gives…"
- line 122: "the two paths fix an unwritten static argument from different places"
- line 134: "Walk has no static types."

At line 122 the "rule" is that the two paths differ. Under line 7 a worker cannot tell what an `XXX` test of row 1008 should assert.

**C. Line 7, the "Until the switch-over" marker, is not applied consistently (medium).**
- Line 89, "The compiler's prelude declares no QQ.", is such a limit but lacks the opener.
- Line 85, "runs only under walk, also after the switch-over", is a compiled-path limit that never ends and cites no row.

Read by the line 7 key, line 89 is not a limit and line 85 is a settled rule.

**D. "Compiled path" never names a library (medium-high).** The core says `FORTRESS_LIBRARY=one` already compiles against the interpreter's library. The orientation never mentions that variable. Lines 48, 64, 110, 112, 114 and 116 give prelude limits ("no `QQ`", "no `Index`", "no `asFloat`", "`/` only at `RR64`"), and other lines make compiled-path claims (e.g. 41, 81, 85) without saying which library they hold for. A worker compiling with `FORTRESS_LIBRARY=one`, as switch-over work does, cannot tell which statements apply to it.

**E. "Compiler's library" against "compiler's prelude" (low-medium).** "Compiler's library" appears at lines 3, 7, 64 and 114. "Compiler's prelude" appears at lines 7, 48, 89, 110, 112 and 116. The core defines the prelude as three files of the compiler's library. A reader cannot tell whether "the prelude declares no `Index`" leaves room for the rest of that library to declare it.

**F. "The one library" (112, 116) against "the interpreter's library" (everywhere else) (low-medium).** The core makes them the same library. A new reader may still take "the one library" to mean only what `FORTRESS_LIBRARY=one` compiles, and so think `asFloat` is missing under walk.

**G. Line 112, `asRR64` against `asFloat` (medium-high).** "Each of the eight number types converts into `RR64` by its own getter, `x.asRR64`" is stated as the rule. As far as the text says, no library has that getter: the one library departs (F-324), and the prelude has no `asFloat`, with `asRR64` not mentioned. A program compiled against today's prelude has no stated way to convert to `RR64`. By line 7, a worker may also conclude that it should write an `XXX` test of `x.asRR64`, or add `asRR64` to the library.

**H. Line 48, `I extends Index` (medium).** The text says to write the bound in code "that runs under walk", yet walk runs it without the bound. It also says that until the switch-over a program that names `Index` does not compile. A program meant to run under walk and also compile today gets two instructions that conflict. "The count stage" is a term the core names (line 80) but never defines.

**I. Lines 97 and 101, the type of folded constants written with radix points (medium; the stakes are high for microGPT).** The text says "A quotient that is not whole stays n / d in lowest terms and defaults to a QQ", and that "Any other result … takes its default". The core's phase 4 says the fold yields "a numeral, a quotient of two numerals or a boolean". Neither says whether an untyped `1.0 / 100000.0` or `0.1 + 0.2` is an `RR64` (radix-point default) or the quotient `1/100000`, which would be a `QQ`. A model-program constant such as `eps = 1.0 / 100000.0` could silently be a `QQ`.

**J. Line 101, "under walk `lr = 1/1000` is a `QQ`" (low-medium).** The qualifier implies that the compiled path differs. By the fold rule the constant is a `QQ` before the checker runs on either path, and with today's prelude there is no `QQ` at all.

**K. Line 116, the reason given for "a compiled `7 / 2` is a static error" (low-medium).** The stated cause is that `/` is declared only at `RR64`. But `7 / 2` folds into a `QQ` constant before the checker (line 101). The passage also leaves open what compiled code with today's prelude does with `n / m` for `ZZ32` variables. Coercion to `RR64` would give 3.5 where walk gives `7/2`.

**L. Line 91, an undefined name in a tuple arm (medium).** The text says the name "is still read as a binder that takes any element, on both paths". It then says the compiled checker refuses that arm as "unreachable". A pattern that takes any element would not be unreachable, so the two statements read as a contradiction. The useful action, to check the spelling of type names in tuple arms, is never stated.

**M. Line 43, "such a pair" and "the valid pair" (medium).** These have no clear antecedent. They may mean the library's array-and-number `+` beside `AdditiveGroup`'s, or any pair that the exclusion test accepts through the intersection reading. That decides whether the two walk cases at row 999 can hit a program's own code.

**N. Line 43, "Declare the object's method at T's return type, with the object's type for X" (low-medium).** This reads two ways: substitute the object's type for `X` in `T`'s return type, or pass the object's type as the static argument `X`. Without an example a reader has to work it out.

**O. Line 68, `OPEN` (low-medium).** "Every value passes `OPEN` itself" is followed by "a type that holds `OPEN` admits only what it admits at `Bottom`". This reads as a contradiction until one guesses that the first sentence is about `OPEN` as a whole parameter type and the second about `OPEN` inside a compound type when walk compares overloads. The text does not say so.

**P. Line 122, "A reduction whose bound does not name its parameter takes its bound, or the expected type where the bound does not fit" (low-medium).** The text names no such reduction and does not say what the bound fails to fit.

**Q. Line 130, an empty `BIG MAX` (medium).** "Lifts its elements to `Maybe[\R\]`" and "still answers `R`" do not say what an empty `BIG MAX` or `BIG MIN` answers. A reader primed by `Maybe` may expect `Nothing`. The model program's softmax takes a max.

**R. Line 7, "assert their answer in an `XXX` test" (low).** It reads either as a duty for every row-citing sentence a worker reads, or as a duty only for the cases its work meets.

**S. Line 17 against line 7 (low).** Line 17 says a case in `interpreter.md` that cites a row "is a departure of walk". Line 7 says a row-citing sentence is either a departure or an undecided case.

**T. Line 24 (low).** It gives only the checker's verdict on `h(self): ZZ32` beside `h(x: String): ZZ32`, not walk's.

**U. Terms (low).**
- Line 32 uses "self-typed" before line 36 defines it.
- "Extenders" (line 30) is undefined.
- "Meet" is used throughout (the Meet Rule, the meet of bounds), but the core defines only "join".
- "`BIG //`" (line 130) is not glossed.
- "Load" and "at load" are used as if defined; the core only says "its checks at load".

**V. Line 95 against line 103 (low).** Line 95 lists "a declared return type" among the places where walk converts a numeral. Line 103 says walk does not convert other values at a return type (row 387). The text never contrasts the two, so a reader can carry one over to the other.

**W. Placement (low).** `SEQV` and `=`, tuple ordering and `Index` sit under "Traits and objects", while cross-type `=` sits under "Numbers". Equality is split across two sections.

**X. Line 99 against line 24 (low).** A program's number type that is a trait and declares `+` needs `excludes { HasRank }` (line 24). The "Numbers" section does not repeat this, and its `Byte` example, an object with no `+`, does not show it.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

1. **Line 41 (medium).** "A compiled body of T that returns self at X runs, also from an arm of a conditional or a `case` expression, a function expression or a local function." This lists shapes that now work. A reader would not doubt them. Keep only the shape that fails (row 1070).
2. **Line 43 (medium).** "With the reading of the exclusion test …, the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own." This justifies the library's design and gives a program writer nothing to do.
3. **Line 130 (medium).** "lifts its elements to `Maybe[\R\]` inside the reduction" is mechanism, and "still answers `R`" is a trace of history. The only action is to declare `simpleJoin` at `R`.
4. **Line 32 (medium).** "The code generator refuses some forms where static parameters take part (`compiler.md`, row 1106)." It names no form, so it changes no action.
5. **Line 13, last two sentences (low).** Where the checker substitutes the meet of bounds, and that `T` in `Box[\T\]` stays: these are checker internals that a program writer cannot apply without an example.
6. **Lines 89 and 95, error-message strings (low).** "Attempt to extend object type ZZ32", "Invalid type in extends clause", "Type mismatch binding" and "got arg" help a worker recognise an error, but each rule already states the refusal. Keep them only if workers grep for them.
7. **Line 99, timing of numeral coercions (low).** "walk computes it at the place's first run, the compiled path when the class loads, before run() … Each run of that place reuses it" is implementation timing. The action behind it, to keep coercions pure and to expect their errors before `run()`, is not stated.
8. **Line 114, the prelude's `^` defects (low).** That it gives 0 at a negative exponent and throws an uncatchable Java exception at base 0 are limits not to be fixed in the prelude. "Avoid negative integer exponents on the compiled path" would suffice.
9. **Line 110, last sentence (low).** It lists every getter the prelude has. "Only `asZZ` is complete; the rest are partial" would serve.
10. **Line 22, "The Scala language accepts it." (low).** It mildly warns Scala readers.
11. **Line 134, "Walk has no static types." (low).** It restates the core (line 76).
