<!-- A design review for the curator's decision on how a number compared by `=` with a numeral of the same value comes to answer `true` on both paths under the static numerals (ledger rows 973 and 966, F-346, F-341, review-queue item 487), written 2026-11-10 by a Fable review worker on the code of `9a0f69e01a` (base build `/home/user/fortress-base31`, a worktree seeded from it): a primer, where each path stands with runs, one measurement of the compiled checker against the one library, how the library avoids the question for `+` and `<`, why it declares `=` over `Any`, the team's sources, the peers, six ways with what each changes, sees, keeps, bends and costs, how they weigh, and the recommendation. Nothing in the original tree and no entry of the record was edited; every run used a worktree of its own. -->

# A number `=` a numeral: the ways to `true`, for your decision

This review is for you, the curator. The result is not in question: your design gives `u = 0` the answer `true` for a zero `u: NN32` (`explorations/coordinator/postmortem-2026-11-09-numerals/design-snapshot.md`, section 11). The question is by which rule or which library text both paths get there.

- **Tree.** The code of `9a0f69e01a`. `main` moved while I worked, but `git diff --stat 9a0f69e01a HEAD -- ProjectFortress Library` is empty at `0a6abca6f0`.
- **What it builds on.** Rows 973 and 966, F-346, F-341, the static numerals probe's question 1 (`explorations/compile-ladder/plan-30/probes/draft-numerals.md`, section 13), climb batch 29b's point for you (`explorations/coordinator/CLIMB-BATCH-29b.md`, "The point for him in the morning") and its review (`explorations/reviews/batch-29b-review.md`, section 2).
- **What is new here.** One measurement that the record held only by reading: what the compiled checker does with `u = 0` against the one library (section 2.3). Three kin cases run on both paths: a program's own number type, a value typed `Any` or `Number`, a `case` clause. Two probes of ways: the library without its `=` over `Any` (way A), and a generic fallback (way E).

**Words used in this review**

- **Walk**: the interpreter, `bin/fortress P.fss`. **The compiled path**: `bin/fortress compile P.fss`, then `bin/fortress run P`.
- **The one library**: the interpreter's library (`Library/FortressLibrary.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`). **The prelude**: the compiled path's own library today (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`). **The switch-over**: the step at which the compiled path moves onto the one library and the prelude is deleted (P-37).
- **The checker**: the compiled path's static type checker. Walk does not run it until after the switch-over (P-12).
- **A numeral**: a number written in digits, as `0` or `0.5`. **Its default**: the type it takes where nothing fixes one: `ZZ32` (or `ZZ64`, `ZZ` by its value), and `RR64` with a radix point (P-173).
- **The fallback `=`**: the one library's top-level `opr =(a:Any, b:Any):Boolean = a SEQV b` (`Library/FortressLibrary.fss:96`). **`SEQV`**: strict equivalence, which is `false` for two values of different types (P-168).
- **A type's own `=`**: the `=` that a type declares on itself, as `NN32`'s `opr =(self, b:NN32)` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:449`).
- **A pair**: an `=` between two different number types, as `ZZ64`'s `opr =(self, b:ZZ32)` (F-324).
- **Promotion**: a generic call `f[\T\](a: T, b: T)` runs at the narrowest type into which both arguments convert (P-74, P-46).
- **A rung**: one task of a climb batch. **P-N**, **F-N**, **row N**: an entry of POSITIONS, of FACTS, a row of the gap ledger.

## 1. The question, and a primer

**The question.** Under the static numerals, by which rule of the language or which text of the library does `u = 0` answer `true`, and `u =/= 0` answer `false`, for a number `u` equal to the numeral, on both paths, before and after the switch-over?

### 1.1 Why the question exists at all

A numeral has no value of its own when a program runs (P-174). Before the program runs, it becomes a value of some number type. Which type depends on where it stands (P-173):

    u: NN32 = 0      (* the place fixes NN32: the numeral becomes the NN32 zero *)
    x = 0            (* nothing fixes a type: the numeral takes its default, the ZZ32 zero *)
    a: Any = 0       (* Any fixes no type either: the ZZ32 zero *)

The number types are siblings. An `NN32` zero and a `ZZ32` zero are two different values, and `SEQV` says so: `false`.

In `u = 0`, the numeral stands as an argument of the operator `=`. The one library declares many `=`. Two of them matter here:

    opr =(a: Any, b: Any): Boolean = a SEQV b       (* the fallback, FortressLibrary.fss:96 *)
    opr =(self, b: NN32): Boolean = ...             (* NN32's own, FortressBuiltin.fss:449 *)

- For the fallback, the second parameter is `Any`. `Any` fixes no type, so the numeral takes its default and arrives as a `ZZ32`. The fallback then compares an `NN32` with a `ZZ32`: `false`.
- For `NN32`'s own `=`, the second parameter is `NN32`. That fixes a type, so the numeral arrives as the `NN32` zero: `true`.

Both declarations can take the call. The tree's rule picks the fallback, because the numeral reaches it without a coercion, and "a conversion never changes which declaration runs when one already fits" (P-46; P-49 for the checker's order). So the tree answers `false`, and your design answers `true`.

### 1.2 What does not have the problem

    u + 0        (* NN32's + : the numeral becomes an NN32 *)
    u < 0        (* NN32's < : the same *)
    z = 0        (* for z: ZZ32: the default is ZZ32, so ZZ32's own = fits as it is *)
    x = 0        (* for x: RR64: the pair =(RR64, ZZ32) fits the default as it is *)

Only a type whose own `=` the default does not fit has the problem: `NN32`, `NN64` and `RR32` beside an integer numeral, `QQ` and `RR32` beside a numeral with a radix point, and every number type of a program's own.

## 2. Where each path stands today

Each line below is a run of mine unless it cites the record. The programs are small probes, kept in my transcript and not committed.

### 2.1 Walk, on the one library

For `u: NN32 = 0`, `h: QQ = 1/2`, `y: Byte = 7` (a program's own value object with a numeral coercion and its own `=`), `a: Any = u`, `m: Number = u`, `z: ZZ32 = 0`, `x: RR64 = 0`:

    u = 0: false          0 = u: false         u =/= 0: true        h = 0.5: false
    y = 7 (Byte): false   7 = y (Byte): false
    a = 0 (Any holding NN32): false            m = 0 (Number holding NN32): false
    z = 0: true           x = 0 (RR64): true   0 = 0.0: true        1/2 = 0.5: true
    u + 0 = u: true       u < 0: false         u <= 0: true         u CMP 0: EqualTo

The first four are the record's (rows 973 and 966, F-346, F-341). The rest are new: a program's own number type has the same defect; a value typed `Any` or `Number` answers `false`; two numerals fold to `true` before anything runs (P-173); `<`, `<=`, `CMP` and `+` are right.

A kin that the record does not hold: `case u of 0 => "zero"; else => "other" end` answers `"other"` under walk. A `case` clause compares by `=`.

Walk's choice is in `OverloadedFunction.bestMatchForNumeralsInternal` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2311-2340`): it takes the best declaration that fits the numeral as it is, and tries coercion only when none does.

### 2.2 The compiled path, on the prelude

    u = 0: true    0 = u: true    u =/= 0: false    y = 7 (Byte): true    7 = y (Byte): true
    case u of 0: zero

The prelude declares no `=` over `Any` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` declares `=` only as methods of its types, `:30` to `:690`). So the only declaration is the type's own, and the numeral converts to reach it. `compiler_tests/NumeralStaticDesignCompiled.fss:135-136` asserts `u = 0`. The prelude has no `QQ`, so `h = 0.5` has no compiled answer yet.

### 2.3 The one thing measured: the checker against the one library

After the switch-over the compiled path reads the one library. I checked a component against it with the distance stage's driver (the command is in section 9) and read the checked tree that the checker writes to its cache. For each call, the tree gives the type of the operator that the checker chose and the conversion that it put around the numeral.

| the call | the declaration the checker chose | the numeral becomes |
|---|---|---|
| `u = 0`, `0 = u`, for `u: NN32` | `=` over `(Any, Any)` | `ZZ32` |
| `w = 0` for `w: NN64`; `f = 0` for `f: RR32` | `=` over `(Any, Any)` | `ZZ32` |
| `h = 0.5`, `0.5 = h`, for `h: QQ` | `=` over `(Any, Any)` | `RR64` |
| `u =/= 0`, `0 =/= u` | `=/=` over `(Any, Any)` | `ZZ32` |
| `y = 7` for `y: Byte`, a program's type | `=` over `(Any, Any)` | `ZZ32` |
| `a = 0` for `a: Any`; `m = 0` for `m: Number` | `=` over `(Any, Any)` | `ZZ32` |
| `z = 0` for `z: ZZ32` | `ZZ32`'s own `=` | `ZZ32` |
| `x = 0` for `x: RR64` | the pair `=` over `(RR64, ZZ32)` | `ZZ32` |
| `u + 0` | `NN32`'s `+` | `NN32` |
| `u < 0` | `NN32`'s `<` | `NN32` |
| `0 = 0.0` | none: folded to a boolean | |

The checker reported no error. So after the switch-over the compiled path does what walk does today: the fallback runs, the numeral arrives at its default, and `SEQV` of an `NN32` and a `ZZ32` is `false` (P-168). The batch review's reading, "it flips to `false` at the switch-over" (`batch-29b-review.md`, section 2, point 1), is now measured for the checker's choice. The run-time answer is by reading: no compiled program runs against the one library yet.

In the checker, the numeral's own type lies below `Number`, so below `Any`: the fallback applies by subtyping alone, and the numeral is then given its default at the parameter that fixes no type (`scala_src/typechecker/impls/Functionals.scala:1144`, `defaultAtUnfixed`; `:1178-1227`, `preDefault`). The coercion attempt, which would reach `NN32`'s own `=`, runs only when the first attempt is not kept (P-49).

### 2.4 Before and after the switch-over, with nothing built

- Before: walk `false`, compiled `true`. The two paths disagree (rows 973, 966).
- After: both `false`. The paths agree, against your design, and `NumeralStaticDesignCompiled`'s assertion of `u = 0` fails.

## 3. How the library avoids the question elsewhere, and why `=` is different

**`u + 0`, `u < 0`.** The one library declares `+` and `<` only as methods of self-typed traits: `opr +(self, other: T): T` in `AdditiveGroup[\T\]` (`Library/FortressLibrary.fss:361`), `opr <(self, other: T)` in `StandardPartialOrder[\T\]` (`:230`), and each number type's own. No `+` or `<` takes `Any`. So no declaration fits `(NN32, numeral at its default)` as it is, the coercion attempt runs, and the numeral converts to `NN32`. Nothing special is done for numerals: the absence of a catch-all does the work.

**`=`.** `Equality[\T\]` declares `opr =(self, other:T): Boolean = self SEQV other` in the same self-typed form (`:100-102`), and `StandardPartialOrder` extends it (`:222-223`, `:232`). But beside them stands the catch-all, the fallback over `(Any, Any)` (`:96`), and `=/=` exists only as a catch-all, `opr =/=(a:Any, b:Any):Boolean = NOT (a=b)` (`:98`), except on `QQ`, `RR32` and `Float`. A numeral at its default fits a catch-all as it is. That is the whole difference.

**Why the library declares `=` over `Any`, with its history.**

- 2007-01-04, the first import of the interpreter's library (`72ae6881b1`, git author `jm143038`): `opr =(a:Any, b:Any):Boolean = false` and `opr =/=(a:Any, b:Any):Boolean = NOT (a=b)` (`ProjectFortress/FortressLibrary.fss:64-65` there). The fallback meant: two values with no `=` of their own are unequal.
- 2008-03-04 (`d56a402b41`, git author `jmaessen`, "Preliminary (unsatisfactory) implementation of SEQUIV"): the body became `a SEQUIV b`. Two days later (`21946c933f`) the operator was respelled `SEQV`.
- The compiler's prelude, the team's later library, never had it: it declares `===` for a few types (`64e5f04dbf`, 2010-05-05, git author `dr2chase`, "Added definition of === for popular types") and `=` only on its types.
- The revival kept the fallback and gave it its meaning in P-168: "Where a type declares no `=`, `=` is strict equivalence". P-165 and F-324 lean on it: two numbers that no coercion joins compare by the fallback and answer `false` without an error.

What the fallback is for: generic code. A `List[\E\]` compares its elements by `=` with `E` unbounded; `assert(x, y, msg)` and `=/=` compare any two values (F-280); a value object without its own `=` is still comparable. Section 6, way A, measures how much of the library stands on it.

## 4. The team's sources

**The Working Draft on numerals** (`Specification-1.0-frozen/basic/expressions/literals.tex:83-148`). A numeral has a numeral type (`:83-129`). "Numerals are not directly converted to any of the number types because, as in common mathematical usage, we expect them to be polymorphic" (`:132-134`). "This approach allows library designers to decide how numerals should interact with other types of objects by defining coercion operations" (`:142-144`), and the libraries "define coercions from numerals to integers ... and rational numbers" (`:146-148`). The Draft says nothing of a numeral compared with a number. It has no default.

**The Draft on which declaration a call takes** (`Specification-1.0-frozen/basic/conversions-coercions.tex:450-456`, "Coercion Resolution"): "we first determine whether there exists a declaration that is applicable without coercion. If so, the most specific declaration is selected; if not, then coercions are explicitly added". This is the rule that P-46 and P-49 keep.

**The Draft on `=`.** It declares no `=` over `Any`. `Any` has only `===` (`basic-lib/objects.tex:22-24`). `=` is a method of a self-typed trait, `opr =(self, other: T)` in `IdentityEquality[\T\]`, with the property that it agrees with strict equivalence (`advanced-lib/algebraic-constraints.tex:134-139`), and each number type lists its own, as `opr =(self, other: ZZ)` (`basic-lib/basic-integers.tex:144`) and `opr =(self, other: QQ)` (`basic-lib/numbers.tex:133`). The operators chapter says only: "The expression `e =/= e'` is semantically equivalent to the expression `NOT (e = e')`" (`basic/operators/opr-overview.tex:262-263`), and that `<`, `<=`, `>=`, `>` "are supported by integer, rational, and floating-point types" (`:271-273`), with no word on a numeral operand.

**Put together.** In the Draft's own language, `u = 0` has no declaration that applies without coercion, because nothing takes `Any`. So the coercion is added, the numeral becomes an `NN32`, and the answer is `true`. The Draft reaches your result through the shape of its library, not through a rule about numerals. The interpreter's catch-all is what breaks it, and the catch-all is the interpreter's own, from 2007, not the Draft's.

**The revived specification** records today's state as a departure, not as the rule: "the interpreter answers `u = 0` false ... and whether `u = 0` is true is open" (`Specification/appendices/changes.tex:5278-5290`; `:3813-3825` for `=/=`). Its literals chapter already says that "the parameter types of the declaration that a call invokes" are places that fix a type (`Specification/basic/expressions/literals.tex:202-204`). Its coercion chapter says the opposite for the choice: "a numeral is applicable without coercion to a parameter of its default type and to a parameter of a type that fixes no type for it; its conversion into any other type is a coercion" (`Specification/basic/conversions-coercions.tex:111-114`). The revival wrote both.

## 5. The peers, as context only

- **Haskell, Rust, Swift.** A literal is polymorphic; `==` takes two operands of one type, so `u == 0` types the literal at `u`'s type. The default (`Integer`, `i32`, `Int`) applies only when nothing constrains the literal. None has an `==` over a top type. This is the Draft's shape (way A).
- **C#.** A constant expression converts implicitly to the other operand's type when its value fits, so `u == 0` compares two `uint`. A rule for constants at operators (way C).
- **Go.** An untyped constant takes the other operand's type in a binary operation, and its default type only where none is given. Go shows the `Any` case exactly: for `var a interface{} = uint32(0)`, `a == 0` is `false`, because the constant becomes an `int`. Every way below keeps that answer for `a: Any`.
- **Julia.** No polymorphic literals; `UInt32(0) == 0` is `true` because `==` on numbers compares values across types (way F).
- **Scala 2, Java.** `==` over the top type, with special cases for boxed numbers. Scala 3 added a restriction on `==` across unrelated types (`CanEqual`), a move toward way A.

## 6. The ways

Every way is listed before any is weighed. Each must also say what happens to `=/=`, since the one library's `=/=` is a catch-all whose body compares two run-time values (F-346). For each way, "sees" gives the cases of the brief: `u = 0`, `0 = u`, `u =/= 0`, `h = 0.5`, a program's own type `y = 7`, a value typed `Any` or `Number`, and two numerals. Two numerals fold to a boolean before the checker in every way (P-173), so that case is not repeated.

### 6.0 What every way shares

- A value typed `Any` or `Number` beside a numeral stays `false` in the checker: nothing static fixes a type there (P-173). Under walk before P-12, a way that changes dispatch answers by the run-time value, so `a = 0` can be `true` there; that is P-59's accepted limit.
- `z = 0` for a `ZZ32`, `x = 0` for an `RR64` and `w = 0` for a `ZZ64` are `true` today and stay so.
- The compiled path before the switch-over needs nothing: it is `true` on the prelude.

### Way A. The Draft's shape: no `=` over `Any`

- **Changes.** The library: strike the fallback `=` and `=/=`; each type that is compared gets its `=` from `Equality[\T\]`, and `Equality` gains `opr =/=(self, other:T): Boolean = NOT (self = other)`. Generic code that compares takes a bound, as `E extends Equality[\E\]`. No checker or walk change: `u = 0` then behaves as `u + 0` does. The specification: the library chapters, and Appendix I for P-168's fallback.
- **Sees.** `u = 0`, `0 = u`, `h = 0.5`, `y = 7`: `true`. `u =/= 0`: `false`. `a = 0` for `a: Any`: a static error, no declaration. Two values of types that no coercion joins, as a `ZZ64` and an `RR64`: a static error, where today the answer is `false`.
- **Keeps.** P-46, P-49, P-173, P-174, P-59. It is the Draft's library and the prelude's.
- **Bends.** P-168 ("Where a type declares no `=`, `=` is strict equivalence"): a value object without its own `=` is no longer comparable by `=`. P-165 and F-324: "otherwise by the fallback" becomes an error. F-280 changes form.
- **Cost.** Measured on a scratch copy of the library with only the fallback `=` struck: the checker reports 19 type errors in 13 places of the `FortressLibrary` component alone, such as `Could not check call to operator =`, and that count is a floor, since the checker stops a block at its first failing statement (row 474). The other library components, the tests and every generic program come on top. Several rungs, and a redesign of the library's generic comparisons.

### Way B. A numeral goes to the most specific declaration that takes it; the default is the last resort

- **The rule.** At a call, a numeral is applicable to a parameter that fixes no type, at its default, and to a parameter whose type declares a coercion from the numeral's type, by that coercion. Among the applicable declarations the most specific runs. Where two of them are not ordered, the one that the default fits runs (the tie rule that exists, `Specification/basic/inference.tex:302-345`). Only the numeral's own conversion ranks so; a value's coercion stays as P-46 has it. This is the probe's solution (a).
- **Changes.** The checker: where a call has a numeral argument, the attempt by subtyping and the attempt by the numeral's coercion are compared, in `Functionals.scala`. Walk: the same comparison in `bestMatchForNumeralsInternal`. The library: `=/=` must reach a type's own `=`, so `Equality[\T\]` gains `opr =/=(self, other:T)`, which the Draft's sentence on `=/=` grounds. The specification: `conversions-coercions.tex:107-117` and the Appendix I effect.
- **Sees.** `u = 0`, `0 = u`, `h = 0.5`, `y = 7`: `true`, at the type's own `=`, the numeral made once at that type (P-176). `u =/= 0`: `false`, for a type that extends `Equality[\T\]`, as the library's number types do; a program's type that does not extend it keeps the catch-all `=/=` (row 807's limit, which this way does not move). `a = 0`: `false`, the fallback at the default. Also: `k(5)` for `k(x: Any)` beside `k(x: NN32)` runs the `NN32` declaration, where today it runs `k(x: Any)`. `gg(5, w)` of P-173 still runs the `ZZ32` declaration. `x^2` is unchanged: `^` over `(RR64, RR64)` is not more specific than `^` over `(RR64, AnyIntegral)`.
- **Keeps.** P-173 (the default "where nothing fixes a type"; a parameter is a place that fixes one), P-174 (no pairs), P-176, P-168 and the fallback, P-165, F-324, P-59, P-12.
- **Bends.** P-46's sentence, for numerals: a numeral's conversion does change which declaration runs when the fallback already fits. P-49's order, for a call with a numeral: the first attempt is no longer kept as it stands.
- **Cost.** One rung: the checker and walk change, `Equality`'s `=/=`, the two expected-failure tests promoted (`tests/XXXNumeralEqualsNumberWalk.fss`, `XXXNotEqualNumeral.fss`), the specification. Its first probe must list the library's overload sets where one position has both a catch-all type and a number type other than the default's, since each of those changes its choice for a numeral. A timing choice inside it: walk can wait for P-12 and take the checker's choice then, which leaves rows 973 and 966 open under walk until P-12.

### Way C. The other operand fixes the numeral's type

- **The rule.** In an operator call, a numeral beside an operand whose static type declares a coercion from the numeral's type is converted to that type before the declaration is chosen. This is the snapshot's sentence read literally: "the checker fixes `0` at `NN32` from the other operand".
- **Changes.** The checker and walk, at operator calls; the specification's literals chapter gains one more place that fixes a type; `=/=` needs the same library edit as in way B, or the rule applied to `=/=` too.
- **Sees.** The `=` cases as in way B. But it reaches further than `=`: `x^2` for `x: RR64` would make `2` an `RR64` and run the float power, not the integer power, unless the rule falls back when no declaration fits, or is limited to named operators.
- **Keeps.** P-174, P-168, P-165. **Bends.** P-173 (a new kind of place that fixes a type), P-46 and P-49 as way B does, and it adds a rule that is about operators only, which nothing in the Draft has.
- **Cost.** One to two rungs, and a list of operators or a fallback to design. microGPT's `^` lines are exposed to that design.

### Way D. The pairs, in a static form

- **Changes.** The library: each number type declares an `=` generic over a numeral's numbers, as `opr =[\nat n, nat r, nat v\](self, other: NaturalNumeral[\n, r, v\])`, both ways round and for both numeral kinds; P-174 lets an operator's parameter type be a numeral type. A program's own number type must declare the same to compare with a numeral. `=/=` likewise.
- **Sees.** The library's types: `true`. `y = 7` for a program's type that did not declare the pairs: `false`.
- **Bends.** P-174 ("no `=` with a number type") and your word on the pairs: "It was a wrong choice and it gets deleted." This is the probe's solution (c).
- **Cost.** One rung, some twenty to forty declarations (the field numerals had eleven each way, by the snapshot's section 11), and a duty on every program's number type.

### Way E. The fallback made generic, so that promotion fixes the numeral

- **Changes.** The library: `opr =[\T\](a: T, b: T): Boolean = a SEQV b` in place of the fallback over `(Any, Any)`, and `opr =/=[\T\](a: T, b: T): Boolean = NOT (a = b)`. The declared domain is the same, every pair of values. By P-46's own example, a generic declaration that applies is instantiated by promotion: for `(NN32, numeral)` at `NN32`, the numeral converted statically. At run time both arguments are `NN32` values, and multiple dispatch runs `NN32`'s own `=`.
- **Measured**, with a program's `same[\T\](a: T, b: T): Boolean = a SEQV b`:
  - walk: `same(u, 0)`, `same(0, u)` and `same(f, 0)` for an `RR32` are `true`; `same(h, 0.5)`, `same(q, 0.1)` for `QQ` and `same(y, 7)` for `Byte` are `false`. Walk does not promote a numeral with a radix point to `QQ`, nor a numeral to a program's type.
  - the checker against the one library: it instantiates at `QQ`, `RR32` and `Byte`, with the numeral converted to that type. For `(NN32, 0)` it instantiates `T` at the union of `NN32` and `NaturalNumeral[\1,10,0\]` and converts nothing.
- **So it also changes** the checker (the union above) and walk (promotion with a numeral). Both are departures from P-74 as it stands, whatever way is chosen (section 9).
- **Sees.** As way B for the brief's cases. One more effect: two numbers of different types that share a coercion target, as an `NN32` and a `ZZ32`, both of which convert to `ZZ64`, would compare by value at that target, where today the fallback answers `false`.
- **Keeps.** P-46 and P-49 as written, P-173, P-174, P-168's meaning. **Bends.** P-165's sentence "only where a coercion carries one into the other": equality reaches wherever promotion does. F-324's 42 pair declarations become redundant.
- **Cost.** One rung for the two promotion repairs and the library text, with a risk the others lack: every comparison in generic code, as a list's element by element, then calls a generic function, which the compiled path instantiates by its class loader per type. Row 537 (two generic declarations of one name) is near it.

### Way F. `=` by value between every number type and the defaults' types

- **Changes.** The library only: each number type declares `=` with `ZZ32`, `ZZ64`, `ZZ` and `RR64`, comparing by value, so that the numeral at its default fits the type's own `=` as it is. Julia's way.
- **Sees.** `u = 0`: `true`. `h = 0.5`: `true`. But `q = 0.1` for `q: QQ = 1/10`: `false`, since the default `RR64` nearest 0.1 is not 1/10, where your design converts the numeral to `QQ` exactly. A program's type must declare the four itself.
- **Bends.** P-165 (pairs only where a coercion joins), and it does not give the design's answer for every numeral.
- **Cost.** One rung, library only. It is incomplete, so it is listed and not carried further.

### Not a way to `true`

- The probe's solution (b), `false`: your design rules it out.
- The workaround `z: NN32 = 0`, then `u = z`: it leaves `u = 0` `false`.
- A rewrite before the checker: no phase before it knows a type.

## 7. How the ways weigh

| | A: no `=` over `Any` | B: most specific, default last | C: the operand fixes | D: static pairs | E: generic fallback | F: by value |
|---|---|---|---|---|---|---|
| `u = 0`, `h = 0.5`, `y = 7` `true` | yes | yes | yes | not `y = 7` | yes | not `q = 0.1` |
| `u =/= 0` `false` | with `Equality`'s `=/=` | with `Equality`'s `=/=` | with the same | with more pairs | yes | yes |
| `a = 0` for `a: Any` | static error | `false` | `false` | `false` | `false` | by value |
| changes the checker | no | yes | yes | no | a repair | no |
| changes walk | no | yes, or waits for P-12 | yes | no | a repair | no |
| changes the library | deeply | one method | one method | 20 to 40 declarations | two declarations | up to 32 declarations |
| decisions bent | P-168, P-165, F-324, F-280 | P-46, P-49, for numerals | P-173, P-46, P-49 | P-174, your word on the pairs | P-165's sentence | P-165 |
| rungs | several | 1 | 1 to 2 | 1 | 1 | 1 |
| the Draft | its library | its result, by a rule it lacks | a rule it lacks | against "coercion operations" | its rule, kept | no ground |

**Sorted by what each needs.**

- The library alone: D and F. D is against your word; F gives a wrong answer for `q = 0.1`.
- The library deeply, no rule: A. It is the Draft's, and the largest.
- The library and two repairs of promotion: E.
- A rule in the checker and walk: B and C.

**What separates B from E.** Both give the same answers for the brief's cases. B changes a rule and says so in one sentence; its effect reaches every overload set with a catch-all beside a number type. E changes no rule but makes the library's most called fallback a generic function, and widens equality between number types as a side effect. B's cost is in the checker's numeral code, which climb batch 29b just built. E's cost is at run time in generic code, on the compiled path.

**What separates B from C.** C is B limited to operators and keyed on the operand's type, not on the declarations. It needs its own exceptions (`x^2`), and it leaves `k(5)` beside `k(x: NN32)` at the default while `u = 0` converts: two rules where B has one.

**What separates B from A.** A is the only way that changes no rule and bends nothing about numerals. It pays with P-168: your decision that every value is comparable by `=`. If that decision were open, A would be the team's answer.

## 8. microGPT's two programs

- **Lines.** The flat program (`explorations/run-c4/src/MicroGptFlat.fss`, 98 lines) and the APL program (`explorations/apl/mg/MicroGptApl.fss`, 127 lines) compare with a numeral only as `i = 0` to `i = 8` for `i: ZZ32` (`MicroGptFlat.fss:38-41`, `MicroGptApl.fss:54-57`). Neither writes `=/=`, `SEQV` or a `case`. The default `ZZ32` fits `ZZ32`'s own `=` as it is, so no way changes a line of either program.
- **Speed, by reading.** Under B, D and F those nine comparisons stay calls of `ZZ32`'s `=` with a constant. Under A the same. Under C the model's `^` and juxtaposition lines pass through the new rule and depend on its exceptions. Under E the model's own lines are unchanged, but any library code that it calls and that compares through the fallback then goes through a generic instantiation. No timing was taken.

## 9. Findings, decisions and the rest of the report

**Defects.** None repaired, by the brief. Measured and not in the ledger, for whoever files them:

1. Under walk, `case u of 0 => ...` takes the `else` clause for a zero `u: NN32`; compiled on the prelude it takes the clause. Kin of row 973, same cause.
2. Under walk, a program's own number type has row 973's defect: `y = 7` and `7 = y` are `false` for `y: Byte = 7` with a numeral coercion and its own `=`; compiled on the prelude both are `true`. Row 973 names only the library's types.
3. Under walk, a generic call does not promote a numeral with a radix point beside a `QQ`, nor a numeral beside a program's number type: `same(h, 0.5)`, `same(q, 0.1)` and `same(y, 7)` run `SEQV` on two types. P-74 gives `QQ` and `Byte`. Compiled is not measured for `QQ`.
4. Against the one library, the checker instantiates `same[\T\](a: T, b: T)` on `(u, 0)` for `u: NN32` at `T` = the union of `NN32` and `NaturalNumeral[\1,10,0\]`, and converts nothing, where it instantiates at `QQ`, `RR32` and `Byte` for those types. A static argument holds a numeral type, which P-174 does not allow. On the prelude the compiled run of the same call prints `true`.

**Sentences of the specification made false.** None: nothing was changed.

**Decisions.** One: I measured the checker's choice by reading the checked tree in the driver's private cache, not by a run, since no compiled program runs against the one library before the switch-over. No decision of yours covers it.

**Points to report.** The brief names the ways that would change a decision of yours: every way does. A: P-168, P-165. B: P-46, P-49. C: P-173, P-46, P-49. D: P-174 and the snapshot's section 11. E: P-165. F: P-165.

**For FACTS.**

- The fact: against the one library the compiled checker chooses `=` and `=/=` over `(Any, Any)` for a number beside a numeral whose default is not the number's type, and converts the numeral to its default; it chooses the type's own `+` and `<` and converts the numeral to the type.
- What it means: at the switch-over the compiled path's `u = 0` becomes `false` unless a way of this review is built first; `NumeralStaticDesignCompiled`'s assertion then fails.
- The number: 16 calls checked, 0 errors; 11 of them at the fallback.
- The command and its output: below, and the table of section 2.3.
- Detail: this file, section 2.3.

**Commands.** The distance stage's driver on one component, from a folder that holds `P.fss`, with `S` a scratch folder and `CP` the class path of `bin/fortress_classpath` without its `bytecode_cache` entry:

    python3 $D/shadow-patch.py ProjectFortress/src/com/sun/fortress $S/shadow-src && python3 $D/add-patch.py $S/shadow-src
    javac ... -d $S/shadow-classes <the seven shadow sources of run.sh> ; javac -cp "$CP" -d $S/classes $D/DistanceMulti.java
    java -Xmx4g -Xss64m -Djava.io.tmpdir=$S/jt -Dfortress.caches=$S/caches -Dprobe.tolerant=true -Dprobe.all=true \
         -Dprobe.componentOnly=true -Dfortress.analyzer.overload.cache=false \
         -cp "$S/shadow-classes:$S/classes:$CP" DistanceMulti -order check -setting any P.fss

It takes 18 s for a small component and prints `@@TC COMPONENT P errors=0`. The checked tree is then `$S/caches/analyzed_cache/P-<hash>.tfs`: each call's `OpRef` carries the chosen declaration's type in `_exprType`, and each converted numeral is a `TraitCoercionInvocation` with its `_toType`. For way A's count, the same command without `-Dprobe.componentOnly=true`, on `FortressLibrary.fss` in a folder that holds copies of `Library/FortressLibrary.fss` and `.fsi` with the fallback struck: `@@SC STAGE component FortressLibrary typecheck errors=19`, in 70 s. That copy also prints two errors per stage, 'NaturalNumeral cannot be written in a program except as a parameter's type', because the checker exempts the library's files by their path; they are the probe's, not the way's.

**Questions for the curator.** One, in the last section.

## 10. The recommendation

Way B, in one rung, on the checker and on walk together, with `=/=` given to `Equality[\T\]`.

- It is your design's sentence made a rule: the default is for a numeral "where nothing fixes a type" (P-173), and a parameter of `NN32`'s own `=` fixes one. The revived literals chapter already counts "the parameter types of the declaration that a call invokes" among the places that fix a type.
- It gives the Draft's result. The Draft gets `true` because its library has no catch-all; way B gets it with the catch-all kept, which P-168 needs.
- It keeps the pairs deleted, the numerals static, and the fallback for values that have no `=`.
- It covers a program's own number type and `case` with no word from the program.
- It costs microGPT nothing.
- Its bend is narrow and stated: P-46 and P-49 hold for every value, and give way only to a numeral's own conversion, where a more specific declaration takes the numeral.

It should be built before the switch-over, or `u = 0` turns `false` on the compiled path there. If you keep P-46 and P-49 without exception, way E is the next: it uses P-46's own promotion, and needs findings 3 and 4 repaired first.

## For the curator

**The question, in one line.** By which means should `u = 0` answer `true`, for a number `u` equal to the numeral, now that no `=` ties a numeral type to a number type?

**Why it is not automatic.** The library has a catch-all `=`, declared for any two values, which compares by strict equivalence. A numeral fits it at its default type, `ZZ32`. An `NN32` zero and a `ZZ32` zero are not strictly equivalent. The catch-all runs before `NN32`'s own `=`, because your rule P-46 says that a conversion never changes which declaration runs when one already fits.

**What I measured.** After the switch-over the compiled checker picks the catch-all too. So without a decision both paths will answer `false`.

**The options.**

1. Way A. Delete the catch-all `=`. This is the Working Draft's library. Then only `NN32`'s own `=` exists, and the numeral converts to reach it. It bends P-168, your decision that every value is comparable by `=`. It is the largest: at least 19 errors in the library's main component alone.
2. Way B. Change the rule for numerals only. A numeral goes to the most specific declaration that takes it, by its own conversion if need be. The default is the last resort. It bends P-46 and P-49, for numerals only. One rung.
3. Way C. A rule for operators: the other operand fixes the numeral's type. It bends P-173, P-46 and P-49, and it needs exceptions, as for `x^2`. One to two rungs.
4. Way D. Bring the `=` pairs back, in a static form. It is against your word that the pairs were a wrong choice. A program's own number type would have to declare them too.
5. Way E. Make the catch-all generic, `opr =[\T\](a: T, b: T)`. Promotion, the rule by which a generic call runs at the narrowest type that both arguments convert to, then fixes the numeral. It bends one sentence of P-165: two number types that share a conversion target would compare by value. It needs two repairs of promotion first. One rung.
6. Way F. Let every number type compare by value with the default types. It gives a wrong answer for `q = 0.1` with a rational `q`. Not carried further.

**What every option leaves alone.** `a = 0` for a value `a` typed `Any` stays `false`. microGPT's lines do not change.

**My recommendation.** Option 2, way B, built in the checker and in walk in one rung, before the switch-over. It is the rule that your design's own sentence states, it keeps the pairs deleted and the catch-all in place, and its bend of P-46 and P-49 is limited to numerals. If you want P-46 and P-49 kept without exception, take option 5.
