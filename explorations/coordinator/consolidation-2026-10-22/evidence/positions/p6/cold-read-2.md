<!-- Cold read 2 of positions slice p6 (P-69 to P-78): what each entry means to a reader with only CLAUDE.md and the fortress-repo skill. -->

# Cold read 2: `p6/clean.txt` (P-69 to P-78)

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and from `references/`: `library.md`, `compiler.md`, `records.md`, `interpreter.md` (first part), plus a grep of the other allowed references for the entries' terms. Nothing else.

Three record names recur in the slice and are not defined in that context: **PLAN** (P-73, P-75, P-76, P-78), the **review queue** (P-75), and **Pavol** (P-75). From the way the entries use them, I take PLAN to be a planning file of the record, with phases and lines, the review queue to be a list of items waiting for the curator, and Pavol to be the curator. That is a guess. The skill never names the curator or these files.

---

## P-69 `LSHIFT` and `RSHIFT` are bit operators on the fixed-width integer types, and `ZZ`'s `shift` is exact

- **Decided:** On `ZZ32`, `ZZ64`, `NN32` and `NN64`, `LSHIFT` and `RSHIFT` act like machine shifts. Bits shifted out are lost and no `IntegerOverflow` is raised. A count at or beyond the width gives 0, except that `RSHIFT` of a negative value gives -1. A negative count shifts the other way. The count can have any integer type, and the shift is done at the width of the value shifted. On `ZZ`, `shift(x, k)` = ⌊x·2^k⌋ for any `k`, `x LSHIFT k` = `shift(x, k)` and `x RSHIFT k` = `shift(x, -k)`, so nothing is lost. On the compiled path, a fixed-width shift works on JVM `int`/`long` and never goes through `ZZ`, for speed.
- **Applies:** Both paths, the four fixed-width types and `ZZ`. Shifts are an exception to the overflow rule of P-73.
- **Requires:** A worker must not route a compiled fixed-width shift through `ZZ`. A shift must not raise on lost bits. The worker must not repair the compiler's prelude to fill the gaps below before the switch-over (P-38).
- **Unfinished:** Done under walk. Done on the compiled path for `ZZ32`/`ZZ64` when the count has the shifted value's own type. Left for the switch-over: the compiled `NN32`/`NN64` shifts, refused today (row 442); `ZZ`'s `shift` on the compiled path (row 383); counts of another integer type on the compiled path. Today that path refuses a `ZZ`, `NN32` or `NN64` count, and it shifts a `ZZ32` by a `ZZ64` count at 64 bits (row 381).
- **Could not resolve:**
  - Whether `RSHIFT` on a signed type fills with the sign bit for counts below the width. The -1 case suggests it does, but the entry says so only for counts at or beyond the width. *Unclear wording.*
  - "computes a `ZZ64` count on a `ZZ32` at 64 bits": I read this as a wrong result width, against "works at the width of the value shifted". It does not say whether the result's type is `ZZ64` or a `ZZ32` that was computed wrongly. *Unclear wording, minor.*
  - "as in every peer language": the entry does not name the peers (later it names Swift and Julia for negative counts). This does not block anything. *Unclear wording, minor.*

## P-70 `GCD` and `LCM` give nonnegative results, and `LCM` raises `IntegerOverflow` when the multiple does not fit its type

- **Decided:** `GCD` and `LCM` always return a value ≥ 0 (`0 GCD -4` = 4, `1 LCM -5` = 5). `LCM` raises `IntegerOverflow` when the result does not fit its type (`(2^31 - 1) LCM 2` on `ZZ32`). By the specification's general overflow rule, `GCD` also raises when its result does not fit: `-2^31 GCD 0` on `ZZ32`, whose result 2^31 does not fit.
- **Applies:** Both paths, all five integer types (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`). On `ZZ` and the unsigned types, part of the rule can never fire.
- **Requires:** Implementations return the absolute value and check that the result fits, on both paths.
- **Unfinished:** Done under walk on the five types, and on the compiled path for `ZZ32`/`ZZ64`. Left for the switch-over: compiled `NN32`, `NN64` (row 442) and `ZZ`.
- **Could not resolve:**
  - "where the divisor does not fit": "divisor" here means the greatest common divisor, the result. It could also be read as an operand, as in division. *Unclear wording.*
  - The title states only `LCM`'s overflow. The body adds `GCD`'s overflow as part of the same rule. Clear on a full read, but the title is narrower than the decision. *Unclear wording, minor.*

## P-71 An overflow guard tests for the type's most negative value, not for `a = -a`, so `|0|`, `-0` and `0 DIV -1` do not overflow

- **Decided:** On a signed fixed-width type, negation, absolute value and division by -1 overflow only for the most negative value. The guard must compare with that value. Testing `a = -a` is wrong, because it is also true for 0. So `|0|`, `-0` and `0 DIV -1` give 0.
- **Applies:** Signed fixed-width types (`ZZ32`, `ZZ64`), both paths. Walk was already right. The compiled natives for negation, absolute value and division on `ZZ32`/`ZZ64` now use the right test. The `ZZ64` multiplication, which `REM`, `MOD`, `GCD` and `LCM` go through, had the same faulty test (so `0 · 5`, `3 REM 5`, `12 GCD 18` raised). It now raises only when the exact product does not fit.
- **Requires:** Write overflow guards as a comparison with the most negative value, or as an exact check that the product fits. Never use `a = -a`.
- **Unfinished:** Nothing ("Built").
- **Could not resolve:**
  - Which path's `ZZ64` multiplication had the fault. From the sentence order I read it as the compiled path, but the entry does not say. Nor does it say whether `ZZ32`'s multiplication was ever affected. *Unclear wording, minor.*
  - Much of the body is narrative ("already gave", "sat", "raised", "now raises"). The rule itself is clear. Only the fixed multiplication is told as history. *Unclear wording, minor.*

## P-72 `narrow` keeps the low 32 bits of a value that the narrower type cannot hold, signed and unsigned, on both paths, and raises no `IntegerOverflow`

- **Decided:** `narrow` from `ZZ64` to `ZZ32`, and from `NN64` to `NN32`, never raises. A value that fits is unchanged. Any other value becomes the narrower value with the same low 32 bits (truncation, read in two's complement for the signed case). The reason: the specification is silent, the team's `ProjectFortress/tests/UnsignedTest.fss` asserts low-32-bit results for `NN64`, and the signed case follows the unsigned one for consistency.
- **Applies:** Only those two conversions, on both paths. It is an exception to P-73's overflow rule. Other narrowings, such as `ZZ` to `ZZ64` or `ZZ64` to `NN32`, are not covered.
- **Requires:** `narrow` must truncate and must not raise.
- **Unfinished:** Nothing ("Built").
- **Could not resolve:**
  - "the signed `narrow` gets the same answer": I read this as "follows the same rule (keep the low bits)", not "returns the same numeric value as the unsigned one". *Unclear wording, minor.*
  - The entry does not say how `narrow` is called (a functional method, a dotted method, or a function) or where it is declared. That is not needed to understand the decision. *Language/library detail I lack, not in the skill.*

## P-73 Under walk, fixed-width integer arithmetic raises `IntegerOverflow` when its result does not fit, on the unsigned `NN32` and `NN64` too

- **Decided:** Under walk, every fixed-width integer operation whose result can leave its type raises `IntegerOverflow` when it does, including `^`, `CHOOSE` and `LCM`, and on the unsigned types too (subtraction below 0 on `NN32` raises). Code that means to wrap uses ∔ `DOTPLUS`, ∸ `DOTMINUS`, ⨰ `DOTTIMES`, fully parenthesised. The specification's saturating operators (e.g. ⊞ `BOXPLUS`) are not in the interpreter's library and are not scheduled.
- **Applies:** Walk, the four fixed-width types. The compiled path already raised for `+`, `-`, `·`, division, negation and absolute value on `ZZ32`/`ZZ64`. F-132 lists what is built and its tests.
- **Requires:** Do not make fixed-width arithmetic wrap silently. Wrapping code must use the dotted operators, fully parenthesised. Do not build the saturating operators within this decision.
- **Unfinished:** The rule is built ("Built"). The saturating operators are left for a later step that no PLAN line holds yet.
- **Could not resolve:**
  - "every operation whose result can leave its type": read literally, this covers `LSHIFT` (P-69 says bits are lost silently) and `narrow` (P-72 says it raises nothing). The entry names neither exception. A worker reading P-73 alone would make a shift or a `narrow` raise. *Unclear wording. This is the main ambiguity of the slice.*
  - Scope on the compiled path: the title says "Under walk". The entry does not say whether the decision also binds the compiled path (P-70 says "both paths" for `LCM`) or what is left there: `^`, `CHOOSE`, and `NN32`/`NN64`, which other entries say the compiled path refuses today. *Unclear wording.*
  - "no PLAN line holds yet": PLAN is not defined in the worker's context. *Record term missing from the context.*

## P-75 `NN32` coerces into `RR64` implicitly, since every `NN32` value converts to `RR64` exactly

- **Decided:** `NN32` is to coerce implicitly into `RR64`, by P-74's rule that a conversion that fits is implicit. The specification's sentences that keep it explicit are to be reworded. How to build it is not decided. Building it makes an operator that both `RR64` and `ZZ64` declare ambiguous for a `ZZ32` with an `NN32` argument, on both paths. Today, without the coercion, P-74's narrowest-common-type rule gives `ZZ64` (row 575).
- **Applies:** The `NN32` → `RR64` conversion, both paths. It is blocked until the curator chooses a way to build it.
- **Requires:** Do not build the coercion, or reword the specification's sentences, until the curator chooses (review-queue item 21 lists the ways; PLAN item 37). For now, a `ZZ32`-with-`NN32` call resolves to `ZZ64`.
- **Unfinished:** All of it: the coercion and the edits to `Specification/basic/conversions-coercions.tex` ("Principles of Coercion") and `Specification/basic-lib/numbers.tex` ("Rational Numbers").
- **Could not resolve:**
  - "Each way to build it changes a decided behaviour": the entry does not say which decided behaviour. Perhaps P-74's narrowest-type rule, or the `ZZ64` result of `ZZ32` with `NN32`, or something else. A worker cannot tell what is at stake. *Unclear wording.*
  - Whether the decision counts as made (the title says the coercion is implicit) or as open (how to build it, and possibly whether, if every way breaks a decided behaviour). I read it as made in principle and blocked in practice. *Unclear wording.*
  - "Review-queue item 21", "PLAN ... item 37 of its list of the curator's answers, 'Pavol's answers, in the order they are needed'": the review queue, PLAN and Pavol are not defined in the worker's context (I take Pavol to be the curator). *Record terms missing from the context.*

## P-76 An integer numeral has a type of its own, `IntLiteral`, which each number type converts from: in the interpreter's library now, and under walk once walk has the checker's static types

- **Decided:** Integer numerals get their own type, `IntLiteral`, with conversions into the number types. This is the compiler's prelude's working design, used in place of the specification's unfinished numeral types. The interpreter's library carries it now. Walk will give numerals that type only after it has static types, because without them walk would type a list of numerals by the join of run-time types, so its element type would be `IntLiteral`.
- **Applies:** The library part is done. Walk still types a numeral `ZZ32` (`ZZ64` or `ZZ` when the value does not fit), so `IntLiteral`'s declarations are never reached under walk today.
- **Requires:** Leave walk's numeral typing as it is until the step that gives walk static types. Leave the listed walk gaps waiting with that step: rows 79, 454, 443, 486, 395, 511.
- **Unfinished:** Walk's half, after the switch-over step that gives walk the checker's static types. That step is not designed yet (PLAN, phase 4). The walk gaps listed above go with it.
- **Could not resolve:**
  - "which each number type converts from" against the built list "the five integer types, `QQ` and `RR64`": `RR32` is missing from that list. It is unclear whether `RR32` is meant to convert from `IntLiteral`, or whether "each" overstates. *Unclear wording.*
  - "the step of the switch-over that gives walk the checker's static types": the skill describes the switch-over only as the compiled path moving onto the interpreter's library. Nothing in it says walk gets static types. I cannot place this step. *Missing from the context / unclear.*
  - The compiled path's state is implied but not stated. Since the design is the prelude's "working one", I take it that compiled numerals already have type `IntLiteral`. *Unclear wording, minor.*
  - "PLAN, phase 4, the line on the numeral switch's walk half": PLAN is not defined in the context. *Record term missing from the context.*

## P-77 Scalar ranges are over `ZZ32` only, as the compiler's prelude declares them (`Library/CompilerLibrary.fsi`)

- **Decided:** Every scalar range has `ZZ32` elements, because a JVM array cannot hold more elements than the largest `ZZ32`. A range over another integer type is an error. Wider counters loop over a `ZZ32` range and widen each element (`j: ZZ64 = i`). Ranges of rank 2 and 3 are tuples of `ZZ32` ranges. The public range traits, such as `Range[\I\]`, stay generic, and the rank-2 and rank-3 ranges extend them at pairs and triples of `ZZ32`.
- **Applies:** Both libraries and both paths.
- **Requires:** Do not create a range over `ZZ64`, `NN32` and so on. Write a `ZZ32` loop and widen inside it. Do not narrow the generic range traits to `ZZ32`.
- **Unfinished:** Nothing ("Built").
- **Could not resolve:**
  - "a static error" under walk, which has no static check: `library.md` settles this ("walk stops when it builds one"), but the entry alone does not. *Unclear wording, resolved through the skill.*
  - Whether a type such as `Range[\ZZ64\]`, written as a type and never built, is also an error. The traits "stay generic", so the type looks allowed and only the construction is refused. *Unclear wording, minor.*

## P-78 `SUM` and `PROD` are one generic reduction each over the library's algebra, in place of the team's catch-all over `Number`, and take their identity from the static argument

- **Decided:** `SUM` is one reduction generic over `AdditiveGroup`, and `PROD` one generic over `MultiplicativeRing`. Each takes its identity (0 or 1) from its static argument. They replace the team's `Number` catch-all. A generator form writes the static argument when the generators and body do not fix the element type (`SUM[\ZZ32\][j <- 0#n] f(j)`), even when a declared type receives the value, because the compiled checker refuses it otherwise (row 731). A form without generators (`SUM e` over a collection, `x DOT y`) takes no static argument. `BIG MAXN`, `BIG MINN` and `BIG MINMAXN` are removed. `MAX`/`MIN` have no identity on integers or floats, so an empty `BIG MAX`/`BIG MIN` raises `EmptyReduction` (F-60).
- **Applies:** The number types, both paths. Under walk, an empty `SUM` or `PROD` over another algebra, such as a user `AdditiveGroup`, still fails (row 436).
- **Requires:** Write the static argument on generator reductions whose element type the generators and body do not fix. Do not reintroduce `MAXN`-style operators or give `MAX`/`MIN` an identity.
- **Unfinished:** Empty reductions over non-number algebras under walk wait for the specification's `HasIdentity` (PLAN, phase 3, the line on `where` clauses).
- **Could not resolve:**
  - "where its generators and body do not fix the element type": the entry gives no test for when they do. Its example's body `f(j)` might have a declared return type and so seem to fix the type, yet the example writes `[\ZZ32\]`. A worker cannot tell when the argument may be left out. *Unclear wording. This blocks applying the rule confidently.*
  - "take their identity from the static argument": the entry does not say where the identity comes from in the forms with no static argument (`SUM e`, `x DOT y`). `library.md` says an empty `SUM` with no static argument and no declared type gives the integer 0. *Unclear wording, partly resolved through the skill.*
  - The F-60 parenthetical ("a maximum's identity is its type's least value, which a coercion into a wider type does not carry"): I read it as saying that `ZZ32`'s least value stops being the least value once it is coerced to `ZZ64`, so it cannot serve as the identity. That reading took effort. *Unclear wording, minor.*
  - `HasIdentity`: a specification trait that is not in the skill. Its role is inferable from the name. *Language concept I lack.*
  - `library.md` says row 436 covers an empty *or filtered* `SUM` with a non-number static argument. The entry says only "empty". This is a scope difference between the entry and the skill. *Unclear wording, minor.*
  - "PLAN, phase 3": PLAN is not defined in the context. *Record term missing from the context.*
