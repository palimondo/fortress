<!-- The clarity pass's check of chunk p6 (P-69 to P-78, without P-74): each rewritten entry compared with the record and its sources, and the cold reader's answers with the source meaning, each failure classed as a missing concept, wording or uncertain fidelity. -->

# Check of the clarity pass, chunk p6

Sources read for every entry: `entries.py 69 70 71 72 73 75 76 77 78` (the record now and the audit's evidence: scout reports, `judgement-c5/c6.md`, `corrections-c5/c6.md`, `takeaway-c5/c6.md`); the coordinator's asks whole, read from the transcript lines the scouts cite (`backup/fe616d40-...until-2026-10-08T15-41.jsonl.parts/000.jsonl:10972, 11220, 11306, 11337, 11349, 12758`; `001.jsonl:1243, 1261, 1334, 6457, 17786`; `002.jsonl:12237`); his messages through `show.py` (block at the end); the code, specification and ledger rows each finding names. Nothing was run but the record's read-only tools.

## P-69

**Fidelity.** The rule, the count rule, the Why and the any-type count match their sources:
- "A count at or beyond the width gives 0, or -1 for `RSHIFT` of a negative value, and a negative count shifts the other way": the revision of 2026-09-22T07:32:20.148Z ("a count at or beyond the width gives 0 or minus one, and a negative count reverses direction") and `Specification/basic-lib/basic-integers.tex:57-60`.
- "as Swift's and Julia's shifts do": the coordinator's 07:18:38.151Z ("Julia's ordinary `<<` is the same "smart shift" as Swift's ... a negative count shifts the other way"). The "not certain" in that text is about X10, not Julia.
- "the shift works at the width of the value shifted": 2026-09-24T09:30:15.820Z ("the receiver `x`, whose width decides the answer"; "answers in the receiver's own type").

One failure:
- "and a count of another type, which the compiled path refuses, or for a `ZZ64` count on a `ZZ32` computes at 64 bits (row 381)". Row 381 says less: "a `ZZ`, `NN32` or `NN64` count is refused compiled". A `ZZ32` count on a `ZZ64` value is not refused. `ZZ64`'s `LSHIFT(self, other:ZZ64)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:647-648`) takes it through `coerce(x: ZZ32)` (`:579`). That is from reading the code; I did not run it. So the sentence is broader than the row, and its second clause has no subject.
  - Class: uncertain fidelity, settled by row 381's claim. Wording: "... `shift` (row 383), and a count of another integer type: compiled, a `ZZ`, `NN32` or `NN64` count is refused, and a `ZZ64` count on a `ZZ32` is computed at 64 bits (row 381)."

**Comprehension.** The reader's rule, scope and what is still to build all match. Its three doubts:
1. Whether `LSHIFT` and `RSHIFT` exist on `ZZ`, and `shift` on the fixed widths. The decision did not cover this. The revision names `LSHIFT` and `RSHIFT` as "the bit operators the library added on the fixed widths". The specification defines them on `ZZ` as `shift(x, k)` and `shift(x, -k)` (`basic-integers.tex:47-51`), and the library declares them there (`Library/FortressLibrary.fss:1068-1070`). `shift` is declared on `ZZ` only (`Library/FortressLibrary.fsi:679`).
   - Class: wording, optional, and stated as the specification's rule, not his: "On `ZZ`, `LSHIFT` and `RSHIFT` are `shift(x, k)` and `shift(x, -k)`, as the specification states."
   - An aside: the revision also said that on the fixed widths `shift` follows the ordinary overflow rule. Neither the record before this pass nor the rewrite keeps that, and the built `shift` returns `ZZ`, so no case can arise. Nothing is owed.
2. "`shift` (row 383)" names neither the type nor the path.
   - Class: wording: "`ZZ`'s `shift`, which the compiler's prelude does not declare (row 383)".
3. The subjectless last clause: fixed by the wording under Fidelity.

## P-70

**Fidelity.** Pass.
- The examples match their sources: `0 GCD -4` and `1 LCM -5` come from the ask of 19:26:01.176Z, and `(2^31 - 1) LCM 2` is the specification's (`Specification/basic/operators/opr-overview.tex:262-268`).
- The built state matches the code. Walk declares `GCD` and `LCM` on five types (`Library/FortressLibrary.fss:783-786`, `:876-879`, `:959-962`, `:1056-1059`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:442-445`). The compiled prelude declares them on `ZZ32` and `ZZ64` only (`CompilerBuiltin.fsi:178-179`, `:241-242`).
- The Why is the ground of the ask that he approved.

**Comprehension.** The reader's rule matches. Its doubts:
1. Whether `GCD` can raise. The title names only `LCM`, as the ask did. But the entry's own Why, the general rule, makes `-2^31 GCD 0` on `ZZ32` raise. The specification says so in the same paragraph ("the greatest common divisor of -2^31 and 0 is 2^31 ... neither of which ℤ32 holds", `opr-overview.tex:264-267`). Walk raises there too (`interpreter/glue/prim/Int.java:136-141`, `if (g > Integer.MAX_VALUE) throw overflow()`).
   - Class: wording, stated as the specification's example, not as a decision of his: "By the same rule, `GCD` raises it for the one result that does not fit, `-2^31 GCD 0` on `ZZ32`, the specification's example." This also removes the clash that the reader saw with P-71's mention of `GCD`.
2. Which of the compiled path's types lack the operators.
   - Class: wording: "on the compiled path's `NN32`, `NN64` and `ZZ`; gap-ledger row 442 records the first two". The writer's note to the coordinator, that no row records `ZZ`, stands.
3. "The five integer types" is not listed.
   - Class: concept, the integer types by width: the `fortress-repo` core, the bullet "Numbers are siblings" (as `concepts.md`, row 1, proposes).

## P-71

**Fidelity.** One failure:
- "The compiled path's natives follow the rule: the guards of negation, absolute value and division on `ZZ32` and `ZZ64`, and the same guard in multiplication, `REM`, `MOD`, `GCD` and `LCM`." This tells the reader that each of the last five tests for the most negative value, on both widths. The sources say otherwise:
  - Rider 1 (2026-09-23T23:58:01.153Z) said that the faulty guard "also sits in four more compiled natives, in multiply, remainder, modulo and the multiple under GCD and LCM. Measured on compiled `ZZ64`".
  - `ce0c7f453` replaced `ZZ64`'s multiplication guard with `Math.multiplyExact` (`nativeHelpers/simpleLongArith.java:70-76`, saturating `:239-241`), not with a test for the minimum. Its message: "twelve testing the minimum and the two long multiplies using Math.multiplyExact".
  - `REM`, `MOD`, `GCD` and `LCM` are Fortress bodies in the prelude, with no guard of their own (`CompilerBuiltin.fss:601-623`). They reach that multiplication: `REM` through `other (self DIV other)`, `MOD` and `GCD` through `REM`, and `LCM` through `DOT`.
  - The record's "and their siblings with that guard are fixed" was true. The rewrite states an implementation fact that the code does not bear out.
  - Class: wording: "On the compiled path, the natives of negation, absolute value and division on `ZZ32` and `ZZ64` test for that value. The same faulty test sat in `ZZ64`'s multiplication, through which its `REM`, `MOD`, `GCD` and `LCM` compute, so `0 · 5`, `3 REM 5` and `12 GCD 18` raised; that multiplication now checks the exact product."

**Comprehension.** The rule and the three cases match. Its doubts:
1. Whether walk follows the rule. The ask says: "The interpreter answers 0 for all three" (2026-09-22T21:17:28.215Z).
   - Class: wording: add "Walk already gave 0 in the three cases."
2. What the guard does in `REM` and `MOD`, and whether `GCD` overflows: the wording above answers the first; P-70's wording answers the second.

## P-72

**Fidelity.** Two small failures:
- "`narrow` converts a `ZZ64` to a `ZZ32`, and an `NN64` to an `NN32`." This reads as what `narrow` is, and `narrow` is wider than that. The ask he took says that `narrow` "is declared on the unsigned 64-bit type, the signed 64-bit type, the unbounded integers, and the 64-bit float" (21:35:51.674Z), and the specification states the rule for `ZZ` to `ZZ32` too (`basic-integers.tex:39-45`; F-172). The decision's scope is the two that the sentence names; the sentence just reads as a definition.
  - Class: wording: "The decision covers `narrow` from a `ZZ64` to a `ZZ32` and from an `NN64` to an `NN32`."
- "Keeping the low bits is a bit operation, like a shift." The ask's reason has a condition that the sentence drops: "On the unsigned types a narrowing that keeps the low bits is a bit operation, the same family as the shifts". The signed case was its own reason: "the signed sibling has the same question and should get the same answer".
  - Class: wording: "On the unsigned types, keeping the low bits is a bit operation, like a shift, and the signed `narrow` gets the same answer."

**Comprehension.** Match.
- The test's path has no root. Class: wording: `ProjectFortress/tests/UnsignedTest.fss`.

## P-73

**Fidelity.** Pass.
- The six compiled operations are the ask's (2026-09-24T09:00:30.281Z: "an addition, subtraction, negation, absolute value, division or multiplication ... The compiled path throws a catchable `IntegerOverflow` for every one of those cases since rung B").
- The unsigned types come from the ask of 09:44:55.507Z.
- The parentheses come from the note's point 12, and the saturating family's wait from its section 10, option 1.
- The ASCII names match the interpreter's library (`Library/FortressLibrary.fss:701-709`) and `references/library.md:24`.

**Comprehension.** Match on the rule. Its doubts:
1. Whether the rule binds the compiled `NN32` and `NN64`. That is outside the entry, whose title says "Under walk". The compiled `NN32`'s `+` already raises (09:44:55.507Z; `CompilerBuiltin.fss:768`). No change.
2. "A later step of their own": a step of what?
   - Class: wording: "wait for a later step of their own, which no PLAN line holds yet". The writer's own meaning note says so; row 348's note holds the wait.
3. Which operations "arithmetic" covers under walk. F-132 answers: "Every fixed-width operation whose result can leave its type raises it, `^`, `CHOOSE` and `LCM` included".
   - Class: wording, optional: after the title, "every operation whose result can leave its type, `^`, `CHOOSE` and `LCM` included (F-132)".
4. Not raised by the reader, but met here: on the compiled path today, `DOTPLUS`, `DOTMINUS` and `DOTCROSS` saturate, and `BOXPLUS` wraps (`CompilerBuiltin.fss:588-599`, row 348). So a compiled test that spells ∔ `DOTPLUS` gets saturation.
   - Class: concept, the prelude's reversed spellings: `references/library.md`, the bullet on wrapping, as `concepts.md`, row 3, proposes. It is not this entry's alone.

## P-75

**Fidelity.** Pass on the rule and the conflict. Two omissions that leave the reader to conclude more than the sources:
- "How to build it waits for the curator's choice among the ways that PLAN lists ...". PLAN-history's item 37 lists four candidates, the fourth "(4) not built, the landed state and the default" (`PLAN-history.md:244`). Review-queue item 21 says "Every way to build it changes a decided behaviour". The reader asked whether that choice could drop the coercion.
  - Class: wording: "... review-queue item 21 holds the same choice. Each way changes a decided behaviour, and the coercion stays unbuilt until he chooses."
- The state line does not say that the specification still states the opposite. `Specification/basic/conversions-coercions.tex:81-82`: "The conversion from ℕ32, though exact, stays explicit, since that decision names only ℤ32 and the numerals". `basic-lib/numbers.tex:46-49` says the same ("explicit, written asFloat"). PLAN-history's item 37 says so ("the coercion chapter's callout still gives answer 8's reason"), and option 1 of the origin's item 9 had "the callout reworded". A worker who reads the specification meets the opposite of the title.
  - Class: wording: "Still to build: the coercion, and the specification's sentences that keep it explicit (`basic/conversions-coercions.tex`, "Principles of Coercion"; `basic-lib/numbers.tex`, "Numbers")."

**Comprehension.** Match on the rule and the state. Its doubts:
1. "Since neither of the two types coerces into the other" has an unclear referent.
   - Class: wording: "since neither `ZZ64` nor `RR64` coerces into the other" (row 575's note).
2. What "the ways" are: the first wording above, and the concept below.
3. "Pavol" is not defined.
   - Class: concept, the curator's name, which PLAN's list "Pavol's answers, in the order they are needed" carries: the short orientation that replaces the revival part, beside "PLAN and its lists" (`concepts.md`, row 5).

## P-76

**Fidelity.** Two failures:
- "It changes no output under walk, which still gives a numeral the type `ZZ32` ...". This is the ask's prediction ("It changes no walk output", 2026-09-29T14:51:12.334Z). The built library half did change walk's output:
  - `MAXNUM` and `MINNUM` of an `NN32` with a numeral answer `5 ZZ64` where the base answered `5 QQ`: row 517, repaired with the library half (`compile-ladder/rung-numeral-library/REPORT.md`, sections 13 and 14).
  - Two expected failures' messages now list `IntLiteral`'s `-` (section 12).
  - The same rung had to correct the specification's Appendix I sentence "The interpreter is unchanged", "false for `MAXNUM`, `MINNUM`, `CMP` and the comparisons" (section 13).
  - What holds is that no numeral reaches `IntLiteral` under walk (section 3; F-74).
  - Class: wording: "Walk still gives an integer numeral the type `ZZ32`, or `ZZ64` or `ZZ` when its value does not fit, so no numeral reaches `IntLiteral`'s declarations under walk."
- "Still to build: walk's half, in the step of the switch-over that gives walk the checker's static types". The option that he took says "after": "Later: walk's switch comes after the switch-over's step that gives walk static types" (14:51:12.334Z). PLAN's line says "in the batch whose step gives walk the checker's static types, or the one after", and "That step ... is not yet designed" (`PLAN.md`, phase 4, the Q-walk line).
  - Class: wording: "Still to build: walk's half, after the step of the switch-over that gives walk the checker's static types, a step not yet designed (PLAN, phase 4, ...)".

Question 1 (`RR32`) stands, and the sources do not settle it:
- The 09-27 ask said "one type, `IntLiteral`, which each integer type converts from" (2026-09-27T09:53:35.889Z).
- The 09-29 refresher said "each number type converts from it" (14:51:12.334Z).
- The specification's callout repeats "from which each number type converts", while its sentence lists the five integer types, `QQ` and `RR64` (`Specification/basic/expressions/literals.tex:149-158`).
- Class: uncertain fidelity. The question would gain these two quotes, so that he sees where "each number type" came from.

**Comprehension.** Match on the decision, the split and the gaps. Its doubts:
1. `RR32`: question 1.
2. That a step of the switch-over gives walk static types: the reader met this here for the first time.
   - Class: concept, walk running with the checker's static types after the switch-over, which several walk gaps wait for (PLAN, phase 4): the `fortress-repo` core, "How a program runs", in the paragraph on the switch-over. `concepts.md` does not list it.
3. "Out-of-range `RR64` binding" can be read two ways.
   - Class: wording: "an integer numeral beyond `ZZ32`'s range at an `RR64` binding (row 443)".

## P-77

**Fidelity.** Pass.
- The rule, the static error and the widening loop are the ask of 2026-09-27T18:46:10.100Z. The Why is his 15:24:22.608Z.
- The ranks are `Library/RangeInternals.fsi:66-68` and `:98-101`, and the prelude is `Library/CompilerLibrary.fsi:173-174`.
- Question 1 rightly carries the audit's open question.

**Comprehension.** Match. Its doubts:
1. How walk reports the static error: minor, and `references/library.md` answers it.
2. "`ZZ32` is the JVM's largest array size": a type is not a size.
   - Class: wording: "Why: a JVM array has at most `ZZ32`'s largest value of elements."

## P-78

**Fidelity.** Two failures:
- "take their identity from the static argument" and "Built". Option A, as he took it, makes the identity by a `typecase` over the number types with `else => 0` (`reviews/sum-replacement-judgement.md:122-135`; `Library/FortressLibrary.fss:3380-3412`). For any other additive group, an empty or filtered `SUM` dies under walk: "`SUM[\M7\][i <- 0#0] M7(i)` ... ends in `unlift param 1 (r:M7) got arg 0: ZZ32`" (row 436, open, whose repair is the specification's `HasIdentity`, held in PLAN, phase 3, the `where` clauses' line). "Built" is true of option A, but the title lets a reader conclude that a user group's empty sum works.
  - Class: uncertain fidelity, settled by option A's code and row 436. Wording: "Built for the number types. An empty `SUM` or `PROD` over another algebra, such as a user `AdditiveGroup`, still fails under walk (row 436), until the specification's `HasIdentity`, which waits for `where` clauses (PLAN, phase 3, the line on `where` clauses)." This is a state line. It also gives his condition of 16:21:41.705Z its home without stating it as his rule, which keeps to the audit's decision.
- "Other reductions are written as before: `SUM e` over a collection `e`, and `DOT`, take none." `DOT` is the infix dot product (`x DOT x`, `explorations/run-c4/src/MicroGptFlat.fss:27`), not a reduction. The ask: "Most sums stay as written. `SUM e`, `SUM vm` and `DOT` don't change."
  - Class: wording: "A sum without generators is written as before, with no static argument: `SUM e` over a collection `e`, and the dot product `x DOT y`."

**Comprehension.** The reader's rule matches. Its doubts:
1. Whether a declared type that receives the value counts as fixing the element type. It does not: the checker refuses the call even then (row 731; `references/library.md:25`: "also where a declared type receives the value").
   - Class: wording: "... writes its static argument where its generators and body do not fix the element type; the checker refuses it otherwise, even where a declared type receives the value (row 731)."
2. `DOT`: the wording above. It belongs to this entry alone.
3. What `BIG MAXN`, `BIG MINN` and `BIG MINMAXN` were. They were the team's three `Number`-typed big operators, built on an identity carried across types. They had "no caller anywhere", and "the library's own `BIG MAX`, `BIG MIN`, `BIG MINMAX` ... and `BIG MAXNUM`, `BIG MINNUM` ... cover every use" (`reviews/max-min-identities-judgement.md:30-37`).
   - Class: wording, in the entry: "`BIG MAXN`, `BIG MINN` and `BIG MINMAXN`, the team's `Number`-typed maximum and minimum with an identity, are gone; no program called them."
4. Whether an empty `BIG MIN` raises too. It does: `ProjectFortress/tests/simpleSum.fss:56-59` asserts `EmptyReduction` for an empty `BIG MIN`.
   - Class: wording: "so an empty `BIG MAX` or `BIG MIN` raises `EmptyReduction`".

## Concepts for every worker, beyond `concepts.md`

- Walk running with the checker's static types after the switch-over (P-76; F-74; PLAN phase 4, "not yet designed"): the `fortress-repo` core, "How a program runs", in the switch-over paragraph.
- The curator's name, Pavol, as PLAN's list title carries it (P-75): the short orientation, beside "PLAN and its lists".

`concepts.md`'s five rows hold. Its row on the wrapping operators also covers P-73's point 4.

## His quotes

HIS 2026-09-22T07:28:15.772Z | we do not want to have a big int uh, shift everywhere if the JVM is not able to eliminate it on its own
HIS 2026-09-22T17:12:42.160Z | agreed with the above
HIS 2026-09-24T09:33:32.071Z | yes
HIS 2026-09-22T21:16:39.079Z | Row 29 approved as recommended, next row
HIS 2026-09-22T21:32:27.487Z | Row 31 approved as recommended
HIS 2026-09-24T00:06:11.079Z | With the above recommendations you proposed (go, yes, no), launch Batch 3.5 workflow
HIS 2026-09-22T21:49:15.497Z | Row 43 approved as recommended.
HIS 2026-09-24T09:14:36.395Z | Agreed with the recommendation. Next
HIS 2026-09-26T07:48:29.318Z | Note from O looks solid to me.
HIS 2026-09-26T09:54:34.008Z | Agreed, option 1
HIS 2026-09-29T14:10:36.799Z | if it fits, then there should be direct conversion. No question about it.
HIS 2026-09-29T14:10:36.799Z | Is that the option one?
HIS 2026-09-27T09:45:13.353Z | walk needs to be corrected and switched to using in literal
HIS 2026-09-29T15:18:44.154Z | So, I think with the int literal, I think the split option three makes most sense. So, yes to that
HIS 2026-09-27T19:23:07.996Z | Option 1, ZZ32
HIS 2026-09-27T15:24:22.608Z | ranges can realistically have only ever be ZZ32 because that's the largest array size on JVM
HIS 2026-09-26T14:05:27.854Z | Agreed, option A
HIS 2026-09-26T16:21:41.705Z | I accept the recommendation
HIS 2026-09-26T16:21:41.705Z | when the where clause is available, it needs to be revisited
