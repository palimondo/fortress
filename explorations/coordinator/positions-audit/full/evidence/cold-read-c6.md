# Cold read, chunk c6 (P-71 to P-80)

Read only `rewritten-c6.txt`. For each entry: (1) what it tells a worker to do or not do; (2) what it decides and why; (3) what is unclear.

## P-71

1. A guard that detects overflow in negation, absolute value or division must compare the operand with the type's most negative value. It must not use the test `a = -a`, which is also true of 0. The compiled natives that used the wrong test have been fixed.
2. Decides that `|0|`, `-0` and `0 DIV -1` do not overflow. Why: `a = -a` holds for 0 as well as for the minimum, so it flags 0 wrongly.
3. Unclear:
   - For `DIV`, the overflow case is the minimum divided by -1, so the guard needs to look at the divisor too. "Tests for the most negative value itself" names only the operand. Is a guard on the dividend alone enough?
   - "Their siblings with that guard" could mean other compiled natives that share the guard, or walk's versions of the same operations. Was walk checked?
   - The headline reads as a standing rule for new guards, while the body reads as a record of a finished fix. It is unclear whether a worker writing a new native must follow it.

## P-72

1. When `narrow` gets a value outside the target range, it keeps the low 32 bits and does not raise. This holds for signed and unsigned types, on walk and on the compiled path.
2. Decides that an out-of-range `narrow` truncates instead of raising. Why: the team's `tests/UnsignedTest.fss` asserts this for the unsigned case.
3. Unclear:
   - P-73 says fixed-width overflow raises `IntegerOverflow`. A worker has to infer that an out-of-range `narrow` does not count as overflow because it is an explicit conversion. Neither entry says so.
   - The team's test covers only unsigned. The entry does not say what grounds the signed case: analogy, or another source.
   - "Low 32 bits" assumes a 64-to-32 narrowing. Narrowing to other widths, if any exists, is not covered.
   - Together with P-77, which allows ranges over `ZZ32` only, there is a trap: narrowing a `ZZ64` bound to build a range truncates silently. The entry gives no warning.

## P-73

1. Fixed-width integer overflow, `NN32` and `NN64` included, raises `IntegerOverflow` under walk, as it already does when compiled. Code that wants wrap-around must use ∔, ∸ and ⨰ and parenthesise them fully. Do not add the saturating operators yet.
2. Decides that walk follows the specification and the compiled path on overflow. Why: the specification says so.
3. Unclear:
   - "Fully parenthesised, since their precedence is stated only among themselves" can be read two ways. One reading: wrap every use. The other: add parentheses only where these operators mix with other operators. If their precedence among themselves is stated, "fully" seems stronger than the reason requires.
   - Whether going below zero on `NN32` or `NN64` (for example `0 - 1`) counts as "overflow" here is not said.
   - The entry does not say whether the wrapping operators exist on the compiled path as well as under walk.
   - See the tension with P-72 noted above.

## P-74

1. Each wider number type declares a `coerce` from each narrower one, as the compiler prelude does. Only exact conversions are implicit: `ZZ32` and integer numerals go to `RR64` implicitly, and `ZZ64` to `RR64` must be written out. A generic call over mixed widths takes the narrowest type that both arguments coerce into. Do not use the specification's `widens`.
2. Decides on declared coercions, with exactness as the test for implicitness, instead of `widens`. Why: it matches the compiler prelude, and lossy conversions should be visible in the code.
3. Unclear:
   - The headline says "integer widths", but the examples are integer-to-float. Whether `RR64` counts as "wider" than a given integer type is not defined. The exactness rule seems to stand in for "wider", but that is left to inference.
   - "The narrowest type that both sides coerce into" assumes the candidates can be ordered. P-75 shows that `RR64` and `ZZ64` cannot be ordered for `ZZ32` with `NN32`. The rule also speaks of "both sides", so calls with three or more arguments are not covered.
   - "Integer numerals coerce into `RR64`" sits beside P-76, where a numeral's type is `IntLiteral`. Is the numeral or the `IntLiteral` what coerces? Large numerals beyond 2^53 are not exact in `RR64`, so the exactness test fails for them.
   - "An exact conversion is implicit" implies `NN32` to `RR64` is implicit. P-75 says that coercion is not built. So P-74's "Built" overstates what holds.
   - "The specification's `widens` is deferred" gives no condition or time for its return.

## P-75

1. The intended rule is that `NN32` coerces into `RR64` implicitly, but it is not built. Adding it makes `ZZ32` with `NN32` ambiguous between `RR64`'s and `ZZ64`'s operators. Until PLAN item 37 settles it, such mixed arithmetic resolves to `ZZ64`.
2. Decides that `NN32` to `RR64` should be implicit. Why: the conversion is exact (P-74). Held back because it creates an ambiguity.
3. Unclear:
   - The headline states the coercion as present fact, and only the body says it is not built. A worker who reads only the headline would assume it works.
   - "Where P-74 gives `ZZ64`": P-74 never names `ZZ64` for this case. The result has to be derived from the "narrowest" rule, and that rule is exactly what fails to choose here.
   - If no candidate resolves the ambiguity, does the decision stand or fall? The candidates are not named.

## P-76

1. An integer numeral has type `IntLiteral`, and each number type converts from it. This is live in the library now. Under walk it waits until walk gets the checker's static types (PLAN phase 4), so do not build walk's half now. The team's held-back `IntLiteral` arithmetic is now enabled.
2. Decides to adopt the compiler library's `IntLiteral` design over the specification's numeral types. Why: the specification's numeral types are unfinished.
3. Unclear:
   - "In the library now" against "under walk once walk has static types": is the library shared by both paths? If walk runs the same library without static types, it is unclear what the library half means while running under walk today.
   - "Split by where the static types are" only makes sense after the rest of the entry has been read. As an opening it is hard to parse.
   - Only integer numerals are covered. Float numerals such as `10.0` (used in P-79) are not mentioned.
   - Whether "`IntLiteral` arithmetic" means numerals combine with each other before conversion (such as `2 + 3` staying an `IntLiteral`) is not explained. A worker would not know what it does to typing.

## P-77

1. Write scalar ranges with `ZZ32` bounds only. A range over any other integer type is a static error. To count in a wider type, loop over `ZZ32` and widen the index inside the loop. Rank 2 and 3 ranges are tuples of `ZZ32` ranges. The public range traits keep a generic index type.
2. Decides on ranges over `ZZ32` only. Why: `ZZ32` matches the JVM's largest array size, and the compiler library declares ranges that way.
3. Unclear:
   - "The public range traits stay generic in their index type" seems to clash with "a range over another integer type is a static error". The error may apply only to the built-in scalar range syntax, or user types might also be barred from implementing the traits over `ZZ64`. Two readings.
   - "A wider counter is a `ZZ32` loop that widens its index" does not cover a count beyond 2^31. Such a loop cannot be written this way, and the entry does not say what to do instead.
   - The JVM-array-size reason fits ranges used as array indices. Ranges used for plain loops are not covered by that reason.
   - See P-72 for the silent-truncation hazard when bounds are narrowed.

## P-78

1. `SUM` and `PROD` are each one generic reduction over the library's algebraic traits, and each takes its identity from the static argument. When nothing at the call fixes the element type of a clause form, write the static argument out. `BIG MAXN`, `BIG MINN` and `BIG MINMAXN` are removed. `MAX` and `MIN` have no identity on the integers or the floats.
2. Decides on a generic reduction with its identity taken from the type, instead of a `Number` catch-all. Why: the identity depends on the type.
3. Unclear:
   - "`SUM e` and `DOT` keep their text" could mean the library definitions are unchanged, or that call sites need no static argument. Two readings.
   - What `BIG MAX` or `BIG MIN` does over an empty generator, given no identity, is not said: an error, or no such form. What replaces `BIG MAXN` and the others is also not said.
   - "Writes its static argument": who writes it, the programmer at the call site or the library? The sentence's subject ("a clause form") cannot write anything.
   - P-79 cites "the static arguments a reduction needs under P-48", while this entry states that rule itself. Which entry governs the static arguments of a reduction?

## P-79

1. Keep every team demo running. If your change breaks a demo and the fix is known, rewrite the demo in the same batch, for example by giving a float base to `^` with a negative exponent. If a demo fails for lack of a feature, leave it until the feature is built. Still to do: measure which demos run, and add a rung that fixes the ones whose fix is known.
2. Decides that the team's demos serve as a standing regression set, and that rewriting them is allowed. Why: not stated.
3. Unclear:
   - "So the demos that fail today are respelled where the way is known" reads as already done. "Still to build: … a rung for those with a known way" says it is still to do. A worker cannot tell whether the four listed cases are fixed.
   - "Where the way is known": known to whom, and who decides? If the way is not known, does the breaking change still land, or is it blocked?
   - "Kept running" does not name the path: walk, compiled, or both.
   - Rewriting the team's demo text seems at odds with the care P-80 takes to keep the team's text word for word. The entry does not say how far a demo may be changed.
   - The headline states as fact what is an aim, since some demos fail today.

## P-80

1. Do not use or build the sign-refined number types. A program tests the sign by comparison, and a float's finiteness by `check` or `check*` on `RR64`. Leave `advanced-lib/numbers-advanced.tex` word for word apart from the S1 "superseded" marking.
2. Decides that run-time tests replace the sign-refined types. Why: not stated beyond "superseded". The original text is kept so that the design stays on record.
3. Unclear:
   - The entry never says which types are "sign-refined". P-73 and P-75 use `NN32` and `NN64` as live types. Are unsigned types excluded from this entry? A cold reader could read "sign-refined" as covering them.
   - "Their return with covariance is P-62's" suggests the types may come back. That softens "superseded": abandoned for good, or deferred until covariance? Two readings.
   - "The number chapters test a value's sign by comparison" could describe the specification's chapters as rewritten, or instruct how library code should test. Who does the testing is unclear.
   - "Built" does not say what was built: the marking, the chapter edits, or library changes.
