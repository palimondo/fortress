# Cold read: positions p6 (P-69 to P-78)

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its permitted references (`library.md`, `compiler.md`, `interpreter.md`, `tests-writing.md`, `records.md`). P-74, P-38, F-60, PLAN and the ledger rows were not read, by the brief's rule.

## P-69, "`LSHIFT` and `RSHIFT` are bit operators on the fixed-width integer types"

- **Decided:** On `ZZ32`, `ZZ64`, `NN32` and `NN64`, `LSHIFT` and `RSHIFT` are plain bit shifts: bits shifted out are dropped with no `IntegerOverflow`. A count of the width or more gives 0 (or -1 for `RSHIFT` of a negative signed value); a negative count shifts the other way. The count can be of any integer type, and the shift is done at the width of the left operand. On `ZZ`, `shift(x, k)` is exact: ⌊x·2^k⌋ for any k. On the compiled path a fixed-width shift is done on the JVM's `int` or `long`, never by going through `ZZ`, for speed.
- **Applies:** Both paths, the fixed-width types for `LSHIFT`/`RSHIFT`, `ZZ` for `shift`. Built under walk entirely; built on the compiled path only for `ZZ32` and `ZZ64` with a count of the same type as the value.
- **Requires:** A worker must not raise `IntegerOverflow` from a fixed-width shift, must not route a compiled fixed-width shift through `ZZ`, and must not repair the compiler's prelude for the missing cases before the switch-over (P-38).
- **Unfinished:** At the switch-over: compiled `NN32`/`NN64` shifts (refused today, row 442); `shift` on the compiled path (row 383); a count of another type than the value's on the compiled path, which today is either refused or, for a `ZZ64` count on a `ZZ32` value, computed at 64 bits (row 381).
- **Could not resolve:**
  - Whether `LSHIFT`/`RSHIFT` exist on `ZZ` at all, and whether `shift` exists on the fixed-width types: the entry gives each operator only for one group of types. Unclear wording (scope).
  - "`shift` (row 383)" in the still-to-build list: I read it as `ZZ`'s `shift` on the compiled path, but the entry does not say which type or path. Unclear wording.
  - "a count of another type, which the compiled path refuses, or for a `ZZ64` count on a `ZZ32` computes at 64 bits": the second clause has no subject; I read it as "or, for a `ZZ64` count on a `ZZ32` value, the compiled path computes at 64 bits", but it took two passes. Unclear wording.
  - "as in every peer language": which languages are the peers is not said; harmless.

## P-70, "`GCD` and `LCM` give nonnegative results"

- **Decided:** `GCD` and `LCM` always return a nonnegative value (`0 GCD -4` is 4, `1 LCM -5` is 5). `LCM` raises `IntegerOverflow` when the least common multiple does not fit the type (on `ZZ32`, `(2^31 - 1) LCM 2` raises). Reason: the specification says both results are nonnegative, and its general rule raises `IntegerOverflow` for an integer result that does not fit.
- **Applies:** Both paths. Built under walk on the five integer types (I take these as `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`); built on the compiled path on `ZZ32` and `ZZ64` only.
- **Requires:** Implement and test the sign and overflow rule as stated; no prelude work for the other compiled types before the switch-over.
- **Unfinished:** `GCD` and `LCM` on the compiled path's other integer types, at the switch-over; row 442 records those missing on `NN32` and `NN64`.
- **Could not resolve:**
  - Whether `GCD` can raise: on `ZZ32`, the GCD of the most negative value and 0 (or itself) is 2^31, which does not fit. The entry names only `LCM` as raising, while P-71 lists a guard in `GCD`. Unclear wording (the two entries read two ways together).
  - "the compiled path's other integer types": `NN32` and `NN64` have row 442; whether `ZZ` on the compiled path is also missing, and which row holds it, is not said. Unclear wording.
  - "the five integer types" is not listed in the entry; I took it from the skill's list of number types. Minor.

## P-71, "An overflow guard tests for the type's most negative value, not for `a = -a`"

- **Decided:** On a signed fixed-width type, the only overflowing case of negation, absolute value and division by -1 is the most negative value. A guard must test for that value, not `a = -a`, because `a = -a` is also true for 0; so `|0|`, `-0` and `0 DIV -1` do not overflow. Reason: no reading of the specification makes those three overflow.
- **Applies:** Signed fixed-width types (`ZZ32`, `ZZ64`). The entry names the compiled path's natives: negation, absolute value and division, plus the same guard in multiplication, `REM`, `MOD`, `GCD` and `LCM`. Built.
- **Requires:** Write any new overflow guard as a test for the most negative value; never `a = -a`.
- **Unfinished:** Nothing.
- **Could not resolve:**
  - Whether walk follows the rule too: the title is general, but the body lists only the compiled path's natives. Unclear wording.
  - What "the same guard" does in `REM` and `MOD`: the most negative value `REM -1` is 0 mathematically and fits, so it is unclear whether the guard raises there or only avoids a wrong result. In `GCD`, it suggests that `GCD` can overflow, which P-70 does not say. Unclear wording.

## P-72, "`narrow` keeps the low 32 bits"

- **Decided:** `narrow` (`ZZ64` to `ZZ32`, `NN64` to `NN32`) leaves a value that fits unchanged and otherwise gives the value of the narrower type with the same low 32 bits; it never raises `IntegerOverflow`. Reason: the specification is silent on `narrow`; the team's test `tests/UnsignedTest.fss` asserts the low 32 bits for `NN64`; keeping low bits is a bit operation like a shift; the signed `narrow` is made to match.
- **Applies:** Both paths, signed and unsigned. Built.
- **Requires:** Do not make `narrow` raise or saturate; keep `tests/UnsignedTest.fss`'s answers.
- **Unfinished:** Nothing.
- **Could not resolve:** Nothing that blocks. `tests/UnsignedTest.fss` gives no root; I take it as `ProjectFortress/tests/`.

## P-73, "Under walk, fixed-width integer arithmetic raises `IntegerOverflow`"

- **Decided:** Under walk, an arithmetic result on `ZZ32`, `ZZ64`, `NN32` or `NN64` that does not fit raises `IntegerOverflow`, also on the unsigned types (a subtraction below 0 on `NN32` raises). Wrapping arithmetic is written with ∔ `DOTPLUS`, ∸ `DOTMINUS` and ⨰ `DOTTIMES`, fully parenthesised, because the specification gives their precedence only among themselves. The saturating operators, such as ⊞ `BOXPLUS`, are not declared yet. Reason: the specification's rule, and the compiled path already raised for `+`, `-`, `*`, division, negation and absolute value on `ZZ32` and `ZZ64`.
- **Applies:** Walk, all four fixed-width types. Built.
- **Requires:** Do not wrap silently in ordinary arithmetic; use the wrapping operators, fully parenthesised, where wrapping is meant; do not use or add the saturating operators as part of other work.
- **Unfinished:** The saturating operators, "in a later step of their own".
- **Could not resolve:**
  - The compiled path's `NN32` and `NN64` arithmetic is not covered: the entry says only what the compiled path does on `ZZ32` and `ZZ64`. Whether the rule binds the compiled unsigned types (at the switch-over, presumably) is not said. Unclear wording (scope).
  - "a later step of their own": step of what (PLAN? a phase?) is not said. Unclear wording.
  - Which operations "arithmetic" covers under walk (does it include `DIV`, `REM`, `MOD`, `^`, negation of a nonzero `NN32`?): the list is given only for the compiled path. Unclear wording.

## P-75, "`NN32` coerces into `RR64` implicitly"

- **Decided:** `NN32` is to coerce into `RR64` implicitly, because every `NN32` value converts exactly, and P-74's rule makes a conversion that fits implicit. How to build it is not decided.
- **Applies:** Mixed-type arithmetic involving `NN32` and the floats, on both paths. Not built.
- **Requires:** Do not build the coercion until the curator chooses how (PLAN, "Pavol's answers, in the order they are needed", item 37; review-queue item 21). Meanwhile, `ZZ32` with `NN32` resolves to `ZZ64` under P-74's narrowest-common-type rule (row 575).
- **Unfinished:** The coercion itself, and the curator's choice of how to avoid the ambiguity it creates: with it, an operator declared on both `RR64` and `ZZ64` becomes ambiguous for a `ZZ32` with an `NN32`, since both arguments then coerce into both, and neither result type coerces into the other.
- **Could not resolve:**
  - "since neither of the two types coerces into the other": the nearest pair is `RR64` and `ZZ64`, but `ZZ32` and `NN32` are also two types of which neither coerces into the other. I read it as `RR64` and `ZZ64` (that is what makes P-74's "narrowest" fail), but the referent can be read both ways. Unclear wording.
  - What the "ways" are that the choice is among: not in the entry, only in PLAN, which a worker reading the entry cannot see. Whether the coercion itself is settled while only its building waits, or the coercion could still be dropped by that choice, is unclear. Unclear wording.
  - "Pavol": not defined in the entry or the skill; I take Pavol to be the curator. Unclear wording.
  - P-74's rule is given only in two fragments ("a conversion that fits is implicit", "the narrowest type into which both arguments coerce"); enough to follow.

## P-76, "An integer numeral has a type of its own, `IntLiteral`"

- **Decided:** A numeral's type is `IntLiteral`, and each number type declares a conversion from it, following the compiler's prelude's working design in place of the specification's unfinished numeral types. It is done in two halves: the interpreter's library now, walk later, because walk without static types would type a list of numerals as a list of `IntLiteral`, having no declared type to convert to.
- **Applies:** The library half is built: the interpreter's library declares `IntLiteral`, conversions into `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ` and `RR64`, and `IntLiteral`'s own arithmetic. Walk's output is unchanged: it still types a numeral `ZZ32`, or `ZZ64` or `ZZ` when it does not fit.
- **Requires:** Do not switch walk's numeral typing to `IntLiteral` before walk has the checker's static types; until then, live with the listed walk gaps (e.g. write `unsigned(5)` for an `NN32`, as `tests-writing.md` says).
- **Unfinished:** Walk's half, in the step that gives walk the checker's static types (PLAN, phase 4). Waiting with it: a numeral matched as `ZZ32` in a `typecase` or overload (row 79); a numeral bound at `NN32`, `NN64`, or an out-of-range `RR64` (rows 454, 443); a `nat` parameter used as a value (row 486); coercion through tuple and varargs parameters (rows 395, 511).
- **Could not resolve:**
  - "each number type converts from" `IntLiteral`, but the built list omits `RR32`, one of the skill's number types. Whether `RR32` is still to build or excluded is not said. Unclear wording.
  - "the step of the switch-over that gives walk the checker's static types": the skill defines the switch-over as the compiled path moving onto the interpreter's library; this entry makes it a sequence of steps that also gives walk static types. That walk gets static types at all is new to me and not in the skill. Concept I lack (the plan's phases).
  - "out-of-range `RR64` binding": out of the range of what, `ZZ32` (so walk types the numeral `ZZ64` or `ZZ`, which does not coerce into `RR64`) or of `RR64` itself? I read the former. Unclear wording.
  - "which the team had left commented out until coercion existed": I read "which" as `IntLiteral`'s own arithmetic only. Minor.

## P-77, "Scalar ranges are over `ZZ32` only"

- **Decided:** A scalar range's elements are `ZZ32`, as in the compiler's prelude (`Library/CompilerLibrary.fsi`), because the JVM's array sizes fit in an `int`. A range over another integer type is a static error. A wider counter is written as a `ZZ32` range whose element is widened (`j: ZZ64 = i`). Ranges of rank 2 and 3 are tuples of `ZZ32` scalar ranges. The public range traits such as `Range[\I\]` stay generic in the index type; ranks 2 and 3 extend them at pairs and triples of `ZZ32`.
- **Applies:** Both paths, the interpreter's library. Built.
- **Requires:** Do not add ranges over `ZZ64`, `NN32` etc.; do not de-generify `Range[\I\]`; write wide loops by widening.
- **Unfinished:** Nothing.
- **Could not resolve:**
  - "A range over another integer type is a static error": walk has no static types, so how walk reports it is not in the entry; the skill's `library.md` says walk stops when it builds one. Minor, resolved from the skill.
  - "`ZZ32` is the JVM's largest array size": a type is not a size; I read it as "the JVM's largest array size fits in a `ZZ32`". Minor wording.

## P-78, "`SUM` and `PROD` are one generic reduction each"

- **Decided:** `SUM` is one reduction generic over `AdditiveGroup`, `PROD` one generic over `MultiplicativeRing`, replacing the team's catch-all over `Number`; each takes its identity (zero, one) from its static argument. A generator form writes the static argument where nothing fixes the element type: `SUM[\ZZ32\][j <- 0#n] f(j)`. `SUM e` over a collection, and `DOT`, take no static argument. `BIG MAXN`, `BIG MINN` and `BIG MINMAXN` are removed. `MAX` and `MIN` have no identity on integers or floats, so an empty `BIG MAX` raises `EmptyReduction`, because a maximum's identity (the type's least value) is not preserved by coercion into a wider type (F-60).
- **Applies:** The interpreter's library, both paths. Built.
- **Requires:** Write the static argument on a generator-form `SUM`/`PROD` whose element type nothing fixes; do not reintroduce a `Number` catch-all or `BIG MAXN`/`MINN`/`MINMAXN`; do not give `MAX`/`MIN` an identity.
- **Unfinished:** Nothing in the entry. The skill's `library.md` names open rows on the same design (731: the checker refuses a call without the static argument; 716: an empty `SUM` with no static argument and no declared type gives the integer 0 whatever the body's type; 436: `CastError` for a non-number static argument) that the entry's "Built" does not mention.
- **Could not resolve:**
  - "where nothing at the call fixes the element type": whether a declared type that receives the value counts as fixing it. The skill says write it there too (the checker refuses otherwise, row 731), while walk uses the declared type. The entry reads both ways. Unclear wording.
  - `DOT`: what it is (a dot product big operator? an infix operator?) is not in the entry or the skill. Concept I lack.
  - `BIG MAXN`, `BIG MINN`, `BIG MINMAXN`: what they did, and what replaces them, is not said. Concept I lack.
  - Whether an empty `BIG MIN` also raises `EmptyReduction`: the entry names only `BIG MAX`; I assume yes. Minor.
