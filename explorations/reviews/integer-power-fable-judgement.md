<!-- The Fable judgement on PLAN item 58, answering the curator's question of 2026-10-19: whether a combination of declarations can rebuild, in the flat number tower, what the Working Draft's tower gave an integer raised to a negative power, case by case (an unsigned exponent, a signed computed one, a numeral, a float or rational base); every way the language and the library offer, with its cases, cost and evidence; the least bad mix; and what each way reverses or reads anew among his decisions. Written on `main` at `3f463d3b5`; it measures one thing (section 8) and cites the rest. -->

# The Fable judgement on item 58: can a combination rebuild the tower's power?

**Answer in five lines.** No, not whole. An unsigned exponent and a float or rational base are rebuilt already, by the declarations the library has. A signed computed exponent can be rebuilt by type, as contract R, at R's cost; it rebuilds the Working Draft's rule, which the team's own code and tests never followed, so the premise he took excludes it. A numeral exponent cannot be rebuilt: a numeral's sign never reaches a type on either path, and under walk a numeral has no type of its own until Q-walk, so no overload can split `10^16` from `10^(-16)`. That is the only case the team's tests reach at a negative exponent, so the hole is where the tests are.

**Recommendation and default.** E, as PLAN item 58's default: the integer's own type at every exponent, `IntegerOverflow` where the result is not an integer, `DivisionByZero` at a base of 0, ±1 exact; a float or rational base for a fraction, as the library already does; `fail[\ZZ32\]` in `strToInt`; the three team tests and the two demos written with a float base. It is itself the combination he is looking for, split on the other operand: the base's type says whether a negative exponent has a value, and the sign of the exponent, a value, is tested at run time, as the library tests every such subset (P-80). He can take it without reading on. Nothing in it reverses a decision on record.

Short names: REPORT is `explorations/perf-probes/integer-power/REPORT.md`; the review is `explorations/reviews/integer-power-negative-exponent.md`; the digest is `explorations/reviews/digest-2026-10-19.md`; B.2 is section B.2 of `explorations/coordinator/postmortem-2026-10-19-haiku/fable-judgement.md`; `P-` is a POSITIONS entry, `F-` a FACTS entry, "row" a gap-ledger row; a bare `fss:N` is `Library/FortressLibrary.fss` and `fsi:N` its api; `Builtin.fss:N` is `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`; the Working Draft is `Specification-1.0-frozen/`.

## 0. Words, for a reader who knows Swift and the JVM

- `ZZ32`, `ZZ64` are `Int32` and `Int64`; `NN32`, `NN64` are `UInt32` and `UInt64`; `ZZ` is a `BigInteger`; `QQ` is an exact fraction of two `ZZ`; `RR64` is a `Double`; `IntLiteral` is the type of a numeral such as `16` before it converts into one of them (F-79; `Builtin.fss:484`).
- **Flat.** None of these is a subtype of another, as Swift's integer types are not. Each wider type declares a `coerce` from each narrower one, and the conversion is applied for you, but only when no declaration fits the argument as it is (P-74; F-131; `Specification/basic/conversions-coercions.tex:474-478`). `Number` is above them all and has no operators of its own (P-43; `fss:380-396`).
- **The tower** is the Working Draft's design, where ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ were subtypes (section 2).
- **Overloading** chooses, among the declarations of one name, the most specific that applies to the arguments. Fortress does this at run time by the arguments' run-time types, as Julia does, besides the checker's static choice (`Specification/basic/overloading.tex:298-310`; the `fortress-repo` skill, "Dispatch is on every argument, at run time"). A declaration is chosen by types, never by values.
- **A numeral** has one type on the compiled path, `IntLiteral`, whatever its value (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:468-469`). Under walk it is an `Int`, a `ZZ32` value (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1635-1637`; `.../evaluator/values/FIntLiteral.java:40-50`; F-74). **Q-walk** is the step that gives walk's numeral the type `IntLiteral`; it waits for the switch-over and is not designed (P-76; `explorations/coordinator/PLAN.md:86`; digest, section 5, item 3).
- **The distance** is the count of the compiled checker's errors over the interpreter's library, 34 today, six of them at integer powers (digest, sections 1 and 2; F-241). **The quick pair** is microGPT's walk check, two programs, 7 checks each (the review, "Words used here").
- **E, Z, R, X** are the four contracts of the ask: an error, zero, a rational typed by the exponent, an exponent typed so that it cannot be negative (REPORT, section 3).

## 1. His question, and the three facts the coordinator gave him

His words, as the coordinator cleaned them (the brief holds the raw text):

> I need more context to make an informed decision. This seems like a consequence of flattening the numeric tower, and much of the existing library design depends on this tower. None of the options seem to fit, because it's not a one-size-fits-all kind of solution that can cover all cases. I feel we likely need a combination of several options to rebuild the original behavior of the numeric tower, but at the same time I worry that might not be possible in the current design. I would like Fable to weigh in on this. Can't we somehow use clever overloads to split the negative exponents away from the positive ones? But I guess there's no way to attempt a coercion to NN when the exponents are already ZZ… Before asking Fable: do you see where I am going with this? Is that an unreasonable direction?

The direction is reasonable, and it is the right instinct: split by type. The answer below says which types can carry the split in the flat design (the base's type, and for the exponent only an unsigned width) and which cannot (the sign of a `ZZ32`, and the sign of a numeral). The three facts the coordinator told him are checked:

1. **Overloading picks by the arguments' types, never by their values, on both paths.** Confirmed. The specification dispatches "the declarations that are applicable to that call at run time" by the arguments' dynamic types (`Specification/basic/overloading.tex:298-310`); walk dispatches on run-time classes (`.claude/skills/fortress-repo/references/interpreter.md`, "How walk evaluates a program"); the checker on static types. The one place the Working Draft put a value into a type was the numeral: `NaturalNumeral[\n,10,v\]`, with the value `v` a static parameter (`Specification-1.0-frozen/basic/expressions/literals.tex:83-85`). The revival's `IntLiteral` carries none (P-76; `Misc.scala:468-469`).
2. **Nothing converts a `ZZ32` into an `NN32` implicitly.** Confirmed, and stronger than stated. `NN32` declares one coercion, from `IntLiteral` (`Builtin.fss:386`); `NN64` from `NN32` and `IntLiteral` (`fss:911-912`). The explicit conversion, `unsigned(self): NN32` on `ZZ32` (`fss:806`), reinterprets the bits: `unsigned(-1)` is `4294967295`, measured (section 8). And since a coercion is chosen by type, like an overload (`conversions-coercions.tex:474-478`), a declared `ZZ32` to `NN32` coercion could not refuse a negative value either: it would convert it as `unsigned` does. So "attempt a coercion to NN" cannot be a sign test, as he guessed.
3. **R is already a split by type.** Confirmed: an unsigned or numeral exponent gives the base's type and a signed one gives `QQ`, six declarations per integer type (REPORT, section 3.2).

One more point on his premise, "much of the existing library design depends on this tower". It does, in one sense and not in another. The library as the team wrote it rested on the integers being floats: in 2008, `trait Integral extends { StandardTotalOrder[\Integral\], RR64 }`, so the declared `RR64` of every integer power held both the integer of a nonnegative power and the float of a negative one (REPORT, section 6; row 438). It never rested on ℤ ⊂ ℚ for the power: no native ever produced a rational (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:222-231`). The flat tower removed the first (d846e3644, 2026-09-27), and the six sites are the residue (F-241). So the question is which leg of the tower, if any, to put back, and section 2 names the legs.

## 2. What the tower gave, and what it rested on

### 2.1 The Working Draft, case by case

- **An unsigned exponent.** ℕ was a synonym for ℤ≥, the nonnegative integers (`Specification-1.0-frozen/basic-lib/basic-integers.tex:65`), itself a subtype of ℤ and of ℚ≥ (`:37-38`). ℤ declared `opr ^(self, power: ℕ): ℤ`, "Exponentiation of an integer to a nonnegative integer power produces an integer result" (`:137`; `git show 5a68404fd:Specification/basic-lib/basic-integers.tex`, lines 506-510). The result: an integer.
- **A signed computed exponent.** ℤ's power does not apply to a ℤ exponent. But ℤ extended ℚ (`Specification-1.0-frozen/basic-lib/basic-integers.tex:195-196`), and ℚ declared `opr ^(self, power: ℤ): ℚ#`, "Exponentiation of a rational number to an integer power produces a rational result", with `x^y = 1/(x^(-y))` (`Specification-1.0-frozen/basic-lib/numbers.tex:344-355`). So `2^n` with `n: ℤ` was a rational, by type, also when `n` held 3. To get an integer back, a program wrote a run-time check: `check≥(self): ℤ≥ throws CastError` (`basic-integers.tex:181-192`, the twelve check methods).
- **A numeral.** A numeral is digits and letters, with no sign (`Specification/basic/lexical-structure.tex:1053-1080`). A digits-only numeral had the type `NaturalNumeral[\n,10,v\]` (`literals.tex:83-85`), so `2^3` chose ℤ's power and stayed an integer. `-16` is the prefix operator `-` applied to the numeral `16`, a ℤ, so `10^(-16)` chose ℚ's power and gave the rational 1/10^16; and `7.07 10^(-1)` was ℝ times ℚ, fine because ℚ ⊂ ℝ (`numbers.tex:36-37`).
- **A float or rational base.** ℝ's and ℚ's own powers, at any integer exponent.

### 2.2 The three legs, and where each went

The tower's answer rested on three things, and the revival set each aside by a decision of his:

- **L1, subtyping among the number types**, ℤ ⊂ ℚ ⊂ ℝ, so that a ℤ exponent reached ℚ's method and a ℚ result flowed into ℝ code. Gone with the flat tower, by the exclusion rule (P-43).
- **L2, a numeral type that carries its value**, hence its sign. Set aside for the compiler library's `IntLiteral` (P-76, "taken over the specification's unfinished numeral types").
- **L3, sign-refined types with run-time checks**, ℤ≥ and `check≥`; in the later chapter, the refinements are boolean static parameters of one trait, which the exclusion rule refuses, and "the way back is the later chapter's declaration-site variance: each flag a covariant static parameter" (`Specification/advanced-lib/numbers-advanced.tex:14-31`, `:34-45`). Superseded (P-80: "a program tests such a subset at run time"); their return waits on covariance (P-62; row 404).

### 2.3 The team's later word: the code

The code never ran the Working Draft's rule. The interpreter's library typed every integer power `RR64`, on a tower where every integer was an `RR64`, with natives that answer the integer for a nonnegative exponent and a float for a negative one (REPORT, section 6; `Int.java:222-231`). The compiled prelude typed `ZZ32 ^ ZZ32 : ZZ32`, `NN32 ^ NN32 : NN32` and `NN64 ^ NN64 : NN64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:267`, `:326`, `:385`; `.fss:744`): the exponent's type is the base's, signed where the base is, and the result is the base's type at every exponent; its negative case is the cast of `Math.pow`, 0 (row 523; row 441). Steele's `intToIntPower` is bound nowhere (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:380-398`). And the team's own tests use a signed computed exponent as an integer: `p = 2^(k-1)` then `p BITOR (p-1)` (`ProjectFortress/library_tests/ShiftTest2.fss:19-20`), `d = 2^n'` compared with a `ZZ32` (`ProjectFortress/tests/zeno.fss:57`), and the library's `strToInt`, `d radix^(n-i)` summed in a `SUM[\ZZ32\]` (`fss:4540-4541`). Under the Working Draft's rule each of these is a rational.

So the later word, which outweighs the earlier text (P-26), is: an integer `^` gives the integer's own type at a signed exponent. That is the premise he took (PLAN item 58; B.2, first point). On the value at a negative exponent the code is silent, as B.2 found: a cast's by-product and an unbound helper are not a position.

## 3. The answer, case by case

| case | the tower gave | the flat design can give | by which way | at what cost |
|---|---|---|---|---|
| 1. unsigned exponent (`NN32`, `NN64`) | the integer | the integer | any contract; the natives answer it today (REPORT, section 1.1; row 438) | item 58's text, nothing more |
| 2. signed computed exponent (`ZZ32`, `ZZ64`, `ZZ`) | a rational, by type, also at a nonnegative value | the rational, as R; or the integer with an error or a zero at a negative value (E, Z); or a static refusal (X) | R: `opr ^(self, b:ZZ32):QQ` and two siblings (REPORT, section 3.2) | R: 16 of 26 walk tests fail, the quick pair stops in `strToInt`, Q-walk first, 21 edits, about 32 sites of 34 (section 4.1); and it rebuilds a rule the team's code and tests never followed (section 2.3) |
| 3. numeral exponent (`16`, `-16`) | an integer for `2^3`, a rational for `10^(-16)` | one answer for both: the numeral's sign is not in its type, and under walk the numeral has no type of its own | none in the library; a signed numeral type (section 4.6, F2) plus Q-walk | reverses P-76 in part; waits for Q-walk; even then `RR64 × QQ` has no overload, so the three tests still need a float base (section 4.6) |
| 4. float or rational base | ℝ or ℚ, any exponent | the same, today | `Float`'s and `QQ`'s own `^` (section 4.2) | none |

So the whole cannot be rebuilt. The hole is case 3, and case 3 is where the team's tests are: all 11 negative-exponent sites in walk's suite write a decimal scale as `10^(-k)`, a numeral base to a numeral exponent (REPORT, section 1.3; F-247), and the two demos do the same (`ProjectFortress/demos/BiCGSTAB.fss:211`). Under the interpreter the team ran, those gave a float, by the natives (REPORT, section 1.1), which is neither the Working Draft's rational nor an integer.

## 4. The ways

Each way: the cases it covers and how; its cost in edits, the distance's sites (34 today), the quick pair, the team tests, and whether it waits for Q-walk; its evidence. The site and test figures for E, Z, R and X are the probe's, measured on the tree of 2026-10-16 at distance 49 and carried to today's 34 by subtraction (the review, section 5, lead); none was measured again here, since no way below changes the probe's text.

### 4.1 Overloads on the exponent's type

The types an exponent can have: the five integer types, of which two are unsigned, and `IntLiteral`. An overload can separate an unsigned exponent from a signed one, and a numeral from both. It cannot separate a negative `ZZ32` from a nonnegative one (section 1, fact 1).

- **R**, the Working Draft's split: unsigned and numeral exponents give the base's type, signed ones `QQ` (REPORT, section 3.2). Covers case 2 as the tower did; case 1; case 3 only after Q-walk, and then wrongly for a negative numeral, since the numeral overload is `self^(b.asNN64)` and `asNN64` refuses a negative value with "does not fit" (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java:291-296`). Cost: 21 edits, 91 lines in and 29 out; `MultiplicativeRing`'s power at `NN64`, with a natural-power body on `Float`, `FloatLiteral`, `RR32` and `QQ`, or walk refuses the library at load; sites 34 to about 32, with two new ones in `FortressBuiltin` until row 445's api fix; the quick pair stops in `strToInt`, "got arg Ratio"; 10 of 26 walk tests pass; waits for Q-walk (REPORT, section 3.2; the review, section 5.3; F-247).
- **X**, Rust's way: only unsigned and numeral exponents are declared, so `2^e` with `e: ZZ32` is a static error, and every caller with a signed exponent converts it (REPORT, section 3.3). Covers cases 1 and 3; case 2 by refusal. Cost: 23 edits, 57 in and 31 out; the ring's `NN64` power and the four bodies, as R; `strToInt`, `strToFloat`, `Format.fss:95` and `:97` converted; the compiled `ZZ32 ^ ZZ32` and three compiled tests go; sites 34 to about 29, about 28 with `fail[\ZZ32\]`; the quick pair passes; 10 of 26 walk tests pass until Q-walk, 14 of them on "Ambiguous coercion"; waits for Q-walk (REPORT, section 3.3; the review, section 5.4). One cost the probe did not price: the only conversion the library has, `unsigned`, reinterprets the bits, so a caller's `radix^(unsigned(n-i))` at a negative `n-i` computes `radix^4294967295` and raises `IntegerOverflow` (section 8). X moves the sign error from the checker to a misleading overflow at run time wherever a caller converts. A checked conversion, the Working Draft's `check≥` that throws on a negative value (`Specification-1.0-frozen/basic-lib/basic-integers.tex:185`), is not in the library and would be new text.

### 4.2 Overloads on the base's type

Already there, and the split he is looking for, on the other operand. `Float` declares `opr ^(self, b:AnyIntegral):RR64` and `opr ^(self, b:Number):RR64` (`Builtin.fss:158-161`); `QQ` declares `opr ^(self, other:AnyIntegral):QQ`, with its sign test inside (`fss:641-646`). So a float or rational base takes any exponent of any sign: microGPT's own negative power is `10.0^(-5)` (REPORT, section 1.6), and `(2/3)^(-1)` is `3/2`, measured under E (REPORT, section 3.1). Covers case 4 whole. For an integer value that must be raised to a negative power, the program writes a float or rational base, `2.0^(-1)` or `(2/1)^(-1)`. Haskell makes the same split as two operators, `^` for any base at a nonnegative exponent and `^^` for a fractional base at any exponent (the review, section 4.6); Fortress has it in the base's type. Cost: no edit; the three team tests and the two demos write their scale as `10.0^(-k)` under E, Z and X alike (REPORT, section 3.1, "Cost"; the review, section 5). Does not wait for Q-walk.

### 4.3 The numeral's own declarations

Each integer type declares `opr ^(self, b:IntLiteral)` beside its `AnyIntegral` one, today `self^(b.asZZ32)` (`fss:801`; `Builtin.fss:462`, `:554`; F-79). The numeral's sign does not reach this overload: the checker types every `IntLiteralExpr` `IntLiteral` (`Misc.scala:468-469`); the compiled path folds `prefix -` on a literal into a literal of the negated value and the same type before the checker runs (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:152-153`; `.../compiler/phases/PhaseOrder.java:137-146`), and does not fold `^` itself (`IntegerLiteralFoldingVisitor.java:58-107`); unfolded, `opr -(self): IntLiteral` gives the same type (`Builtin.fss:516`). Under walk the overload is never chosen, since a numeral is an `Int` (F-74). So this way covers case 3 only as a copy of what the signed overload does: the integer under E and Z, a `QQ` under R (and a refusal of a negative numeral by accident, section 4.1). Cost: none now; after Q-walk, its body must agree with the signed one. Waits for Q-walk to matter at all.

### 4.4 The witness `typecase`, `cast`, and the run-time sign test

The library chooses by a type with `typecase`: by a static argument alone, through the witness `__thrower[\T\]` and `cast[\T\]` (`additiveIdentity`, `fss:3362-3377`; `cast`, `fss:33-37`), or by a value's run-time type over the comprised integer types (`exactValue`, `fss:398-408`; `Number`'s `=`, `fss:386-395`). Inside an arm, a sign is tested by comparison, which is the library's rule for a sign-refined subset (P-80): `QQ`'s power tests `-other > 0` (`fss:642`), the probe's `QQ` body tests `e < 0` inside each signed arm (REPORT, section 4), and the natives test `exp < 0` (`Int.java:226`). These devices give a sign-dependent value, not a sign-dependent type: the checker types a `typecase` as the join of its arms (REPORT, section 4), which for a `ZZ32` arm and a `QQ` arm is `Number`, which has no operators (section 4.5). Covers: the negative branch of E and Z, and `QQ`'s body, 4 of the 6 sites, 8 lines for 6. Does not wait for Q-walk. This is the way E and Z are built (REPORT, sections 3.1 and 4).

### 4.5 A result type wider than the base

- **`Number`**, the team's first design: until 2008-05-08 the powers answered `Number` (REPORT, section 6). On the flat tower `Number` declares `asFloat` and `=` and nothing else (`fss:380-396`; P-43), so every arithmetic use of a power would need a `cast` or `typecase`, and `strToInt`'s `SUM[\ZZ32\]` would be refused. By reading, it adds sites rather than clearing them. Not measured.
- **`QQ` at every exponent**: exact, holds 8 and 1/2 both, drops the premise; `2^3` is `8 : QQ` (REPORT, section 8, "R's shape"); every failure of R and more.
- **`RR64`**, today's text, the team's 2008 choice when integers were floats: holds neither every `ZZ64` (P-74 keeps `ZZ64` into `RR64` explicit as lossy, P-66) nor the integer the natives answer (row 438); it is the six sites.
- **`ZZ64` or `ZZ` for a `ZZ32` base** holds `2^31` but not `2^(-1)`: no bearing on the sign.

None covers a case the others do not, and each costs more than E. None waits for Q-walk.

### 4.6 A sign-refined type brought forward in part

Three partial forms, from the narrowest:

- **F1, the unsigned widths as the exponent's type.** `NN32` and `NN64` are the only types in the flat library whose every value is nonnegative, and they carry it in the run-time object (`FNN32`), so both paths can dispatch on them. That is X (section 4.1). It reverses nothing.
- **F2, a nonnegative numeral type.** A digits-only numeral gets a type of its own, the Working Draft's `NaturalNumeral` in some form, and `-16` keeps `IntLiteral`. It is the only way to make case 3's sign reach a type. It needs the checker's literal typing changed (`Misc.scala:468-469`), the folder to give a folded negative literal the signed type (`IntegerLiteralFoldingVisitor.java:152-153`), a second numeral object in the library beside `IntLiteral` (`Builtin.fss:484`), and Q-walk first, since walk has no numeral type at all. What it buys: under E, nothing a program can see, since E already gives the integer for `10^16` and an error for `10^(-16)`; under R, the Working Draft's case 3, `10^16` an integer and `10^(-16)` a rational. Even then `compoundArray`'s `7.07 10^(-1)` fails, since `RR64 × QQ` has no overload (REPORT, section 3.2) and a lossy `QQ` into `RR64` conversion is explicit by P-74. It reverses P-76 in part: the specification's numeral types, which P-76 set aside as unfinished, come back for the sign.
- **F3, a nonnegative subtype of a signed type**, `ZZ32≥ extends ZZ32`. The exclusion rule allows it, since it inherits `Integral[\ZZ32\]` and no second instantiation. But a value's run-time type is its object's, and both paths dispatch on it (section 1, fact 1); `ZZ32` comprises the one object `Int` (`fss:729`). So a refined type needs an object of its own, a check that makes one from a `ZZ32`, and covariance for its values to flow where a `ZZ32` is expected on both paths, which is P-62's work and row 404's hole. Without covariance it is X with `check≥` in place of `unsigned`: the same conversions at the same callers, a raise instead of a reinterpretation. It reads P-80 anew, by putting a sign-refined type back into the library, and takes P-62's work early. Waits for Q-walk as X does.

### 4.7 The devices for a result a fixed width cannot hold

- `IntegerOverflow` (`fss:1839`; `Int.java:258-261`): the specification's rule, "a result that the type cannot hold throws an IntegerOverflow" (`Specification/basic-lib/basic-integers.tex:567-568`; P-73), tested at `2^31` by `ProjectFortress/tests/PowChooseLcmRungE.fss:58`. 1/2 is a result no integer type holds. This is E.
- `DivisionByZero` (`fss:1782`): what `QQ` throws where a quotient has no value (`fss:649`), and what `intToIntPower` names (`simpleIntArith.java:383`). This is E at a base of 0.
- The wrapping operators ∔, ∸, ⨰ (P-73): a wrapped 1/2 has no meaning. Not a way.
- Widening, `widen` and `big` (`fss:802`, `:810`), and `ZZ`: no width holds 1/2. Not a way.

So this family offers exactly E's two exceptions. Covers cases 1 to 3 at a negative value; does not wait for Q-walk.

### 4.8 Ways outside the library, listed and set aside

Two ways exist that the team did not write, so principle 2 sets them aside; they are here so that the list is whole.

- **A compile-time refusal of a negative folded literal exponent on an integer base**, in the folder or the checker. The team's folder refuses one negative-literal operation at compile time, a factorial, with a `CompilerError` (`IntegerLiteralFoldingVisitor.java:38-40`), but it does not fold `^`, and that refusal is a compiler's internal error, not a Fortress error; walk would have no such check. Julia's `literal_pow` is this kind of device (the review, section 4.1). It would make `10^(-16)` a static error on one path only.
- **A second operator** for the rational power at any exponent, Haskell's `^^` (the review, section 4.6). No team text declares one; the library's split is by the base's type (section 4.2).

## 5. The least bad mix, and how it weighs

The mix: E's contract for an integer base (section 4.7's two exceptions, inside the run-time sign test of section 4.4), the float and rational bases for a fraction (section 4.2), `fail[\ZZ32\]` in `strToInt` (row 747), and the three team tests and two demos written with a float base. It is PLAN item 58's default, word for word. By the three principles:

1. **The team's later word** (P-26) gives the type: an integer `^` has the integer's type at a signed exponent (section 2.3), so R is out; a numeral's type is `IntLiteral` (P-76), so case 3 cannot split; the tower is flat (P-43), so no `QQ` result flows into float code. It is silent on the value (B.2).
2. **The library as the team wrote it** gives the value's shape: it tests a sign inside a body by comparison (`fss:642`; P-80), raises `IntegerOverflow` for a result the width cannot hold (`PowChooseLcmRungE.fss:58`; P-73), and gives a fraction from a float or rational base (`Builtin.fss:160`; `fss:641`). The one thing E changes in the library's own behaviour is the float that the natives answer today at a negative exponent (REPORT, section 1.1), which the flat tower already made untypable (row 438) and which no contract keeps.
3. **The peers**, where the first two are silent, between an error and a zero: Julia, Java's `BigInteger.pow` and Haskell's `^` raise; Rust types the exponent unsigned; X10 answers a float; none answers 0 (the review, section 4). The revival's own precedent refuses a negative exponent in a size (F-222).

Against the others: Z moves six printed values of a team test without a sign and is "what the compiled cast happens to do" (B.2); R and X wait for Q-walk, which is not designed, while their sites are needed before the switch-over (the review, section 6, item 4; digest, section 5), and X's conversion hides a sign error as an overflow (section 4.1). F2 buys nothing under E and reverses P-76 in part; F3 is X at a higher price.

What the mix gives up, said plainly: `2^(-1)` has no value when `2` is an integer. The program that wants 1/2 writes `2.0^(-1)` or a rational base, as microGPT does.

## 6. The recommendation and the default

E, as PLAN item 58's default and B.2's: each integer type's `^` answers its own type, on `Integral` too, in the component and the api; a negative exponent raises `IntegerOverflow` where the result is not an integer, `DivisionByZero` at a base of 0, and the bases ±1 give their exact power; `QQ`'s body takes the `typecase` of REPORT section 4; `fail[\ZZ32\]` in `strToInt`; `realArith`, `compoundArray`, `simpleExp`, `BiCGSTAB` and `BiCGSTAB2` write their scale with a float base. Cost: 15 library edits, 29 lines in and 27 out, 11 lines of walk natives, one line in the compiled helper of phase 4, one sentence in the specification; sites 34 to about 28; the quick pair passes with every value line equal; 23 of 26 walk tests pass, the other three after their respelling; no wait on Q-walk (REPORT, section 3.1; the review, sections 5.1 and 7).

**The default he can take without reading the argument:** E, as PLAN item 58 states it.

## 7. What it needs from him

- **E itself** reverses nothing on record. It carries three choices the ask left inside it (PLAN item 58; REPORT, section 11): E's exceptions, `IntegerOverflow` and `DivisionByZero` with ±1 exact, against refusing every negative exponent as F-222 does for sizes; row 747's `fail[\ZZ32\]` in the same rung; and a changed line in each of three team tests and two demos, a point to report (`.claude/skills/fortress-repo/references/records.md`, "What every report holds"). Each has its default in PLAN item 58.
- **If he wants case 3 rebuilt**, the numeral's sign in its type (F2): it reverses P-76 in part and waits for Q-walk. My answer is no, since under E it buys nothing a program can see.
- **If he wants X**: it waits for Q-walk, removes the compiled `ZZ32 ^ ZZ32` and three compiled tests, and needs a checked conversion that the library lacks, or `unsigned`'s reinterpretation stands in every converted caller. It reverses nothing, but F3's form of it reads P-80 anew and takes P-62's work early.
- **If he wants R**: it sets aside the premise he took under P-26, the compiled prelude's integer type at a signed exponent, for the Working Draft's earlier text, and waits for Q-walk.
- **Nothing here touches P-43, P-62, P-74 or P-80** unless he chooses F2 or F3.

## 8. What I measured

One thing, since no way above changes the probe's measured text: what walk's `unsigned` does to a negative exponent, which prices X's conversion (section 4.1) and fact 2 (section 1). The probe `ProbeUnsignedPower.fss`, in the scratchpad, run under `nice -n 19` with the skill's setup lines on `main` at `3f463d3b5`, `FORTRESS_THREADS=1`, one JVM:

```
unsigned(-1) = 4294967295
unsigned(-1) > unsigned(0) = true
2^unsigned(-1) overflows = true
2^(-1) today = 0.5
```

The third line is `overflows(fn () => two^u)` with `two: ZZ32 = 2` and `u = unsigned(m1)`, `m1: ZZ32 = -1`, in the shape of `PowChooseLcmRungE.fss:6-12`. The fourth is on record already (REPORT, section 1.1). The native is `ZZ32$ToNN32`, `f(int x) { return x; }` into `FNN32.make` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ZZ32.java:54-60`, `:213-216`).

## 9. For the record

- **For FACTS, 1.** `unsigned` reinterprets the bits under walk: `unsigned(-1)` is `4294967295`, and `2^unsigned(-1)` raises `IntegerOverflow`. It means that converting a signed exponent for an unsigned power, as X does in every caller, turns a negative value into an overflow at run time, not a sign error. No test checks it; the command and output are in section 8.
- **For FACTS, 2.** A numeral's sign does not reach its type on either path: the checker types every `IntLiteralExpr` `IntLiteral` (`Misc.scala:468-469`), the compiled path folds `prefix -` on a literal into a literal of that type before the checker and does not fold `^` (`IntegerLiteralFoldingVisitor.java:58-107`, `:152-153`; `PhaseOrder.java:137-146`), the numeral itself has no sign (`Specification/basic/lexical-structure.tex:1053-1080`), and walk's numeral is an `Int` (F-74). It means that no overload on a numeral exponent's type can split `10^16` from `10^(-16)`. By reading; the lines cited show it.
- **The INDEX line owed** for this note, not written since the brief allows one file: `` - `explorations/reviews/integer-power-fable-judgement.md`: `` followed by the first sentence of this file's header comment.
- **Decisions taken here.** (1) The Working Draft's `-16` is read as the prefix operator on a numeral, a ℤ, because a numeral has no sign (`lexical-structure.tex:1053-1080`) and the Working Draft gives no literal type for a negated numeral; the alternative, that `Literal[\v\]` (`literals.tex:85`) covered negative values, has no text behind it. (2) `Number` as a result type is rejected by reading, not by measurement, since `Number` declares no operators (`fss:380-396`). (3) No new combination was measured, since the least bad mix is the probe's E text unchanged.
- **Commands worked out.** None beyond the skill's.
- **Commit:** nothing, as the brief says.
