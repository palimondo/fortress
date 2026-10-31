<!-- The evidence for one decision of the curator, what `widen` does with a `ZZ` too large for `ZZ64` (gap-ledger row 502, review-queue item 20, PLAN item 31), gathered 2026-10-31 by an Opus evidence worker, with no way chosen: the specification and its Working Draft, the team's library, interpreter and compiler prelude with their history, the record's rows, decisions and judgement, microGPT's use, the peer languages, and runs under walk, then the ways with what each changes, costs and gives up. Tree: `main` at `40f08d22e`; its implementation is that of `640acb4a1`, built 2026-10-30 06:40 UTC. Nothing in the original tree was edited: the probes ran in a scratch folder with private caches, and their programs are quoted here whole. -->

# `widen` of a `ZZ` too large for 64 bits: the evidence

## 0. The question

`widen(self): ZZ64` on `trait ZZ` (`Library/FortressLibrary.fsi:699`) converts the unbounded integer to the signed 64-bit one. For a value outside -2^63 to 2^63-1 there are two readings:

- keep the low 64 bits, as walk does today (row 502);
- raise `IntegerOverflow`, by the specification's general sentence on integer results (`Specification/basic/operators/opr-overview.tex:154-155`).

PLAN's natives line (`explorations/coordinator/PLAN.md:53`), PLAN item 31 (`:127`) and review-queue item 20 (`explorations/coordinator/review-queue.md:259-264`) hold the question with no default on record. The phase 3 exit judgement recommends the low 64 bits (section 4.3).

One citation to correct: PLAN's line, PLAN item 31 and the brief put "(row 349)" after the general sentence. Row 349 records that the compiler prelude's `trait ZZ` has neither `widen` nor `narrow`. The general sentence is cited by row 502 (section 4.1).

## 1. The specification

### 1.1 `widen` itself: not named

- No chapter of `Specification/` names `ZZ`'s `widen`. `grep -rnw widen Specification/` finds two other things only. One is a user function `widen[\T, S extends T\](c: C[\S\]): C[\T\]`, the revival's example for the exclusion rule (`Specification/basic/trait-parameters.tex:433-443`, commit `3924e7ec3`). The other is the revival's Appendix I entry on the natives, which lists `ZZ32`'s `widen` among the 21 bindings moved onto helpers (`Specification/appendices/changes.tex:4467-4472`). `ZZ32`'s `widen` is exact, so it raises the question nowhere.
- The Working Draft of February 2011 names no `widen` (`grep -rnw widen Specification-1.0-frozen/`: nothing). Its integer chapter has no fixed-size integer type at all: it lists `ZZ`, `ZZ*` and their refinements by sign (`Specification-1.0-frozen/basic-lib/basic-integers.tex:16-68`).
- The team's later restart has no `widen` either (`grep -rnw widen Documentation/`: nothing).
- Row 349's citation column and row 502's history give the same finding: "no prose chapter names `widen`" (`explorations/fortress-gap-ledger-history.md`, row 502).

### 1.2 Overflow: the general sentence and how far it reaches

The sentence, as the revised text has it:

    The handling of overflow depends on the type of the number produced.
    For integer results, overflow throws an \TYP{IntegerOverflow}.
    Rational computations do not overflow.

- Where it stands. It appears twice, in the subsections "Multiplication, Division, Modulo, and Remainder Operators" (`Specification/basic/operators/opr-overview.tex:113`, sentence at `:154-155`) and "Addition and Subtraction Operators" (`:190`, sentence at `:195-196`). Both are about operators. The Working Draft has it word for word at the same lines (`Specification-1.0-frozen/basic/operators/opr-overview.tex:154-155`, `:195-196`). So does the team's later restart (`Documentation/Specification/Prose/Language/Operators/operator-overview.tick:154-155`, `:195-196`).
- Wrapping has its own spelling. Each of the two subsections then says: "Wraparound addition and subtraction on fixed-size integers are expressed by ∔ and ∸. Saturating addition and subtraction ... by ⊞ and ⊟. These operations do not overflow." (`opr-overview.tex:205-209`; for multiplication, ⨰, and ⊡ or ⊠, `:172-176`). Both texts have these sentences.
- How far the revival has read it. The revised text applies "the rule for integer results above" to `GCD` and `LCM` (`opr-overview.tex:262-270`, callout `revival-gcd`). It also applies it to a `ZZ` shift too large to represent (`Specification/basic-lib/basic-integers.tex:738-739`) and to an integer power that is no integer (`:537`). P-73 reads it under walk as covering "every operation whose result can leave its type" (section 5).
- No passage applies it to a conversion, or exempts conversions from it.

### 1.3 Conversions between integer types, and `narrow`

The revised integer chapter, lines the revival wrote:

    An integer type coerces from each other integer type all of whose values it holds,
    as listed above; every other conversion between integer types is written explicitly.

    Among the explicit conversions, the method \VAR{narrow} converts a value of
    \EXP{\mathbb{Z}64} or \EXP{\mathbb{Z}} to \EXP{\mathbb{Z}32}, and a value of
    \EXP{\mathbb{N}64} to \EXP{\mathbb{N}32}, by keeping its low 32 bits ...
    A value that the narrower type holds is unchanged; any other wraps, and no
    \TYP{IntegerOverflow} is thrown.

(`Specification/basic-lib/basic-integers.tex:36-37`, `:39-45`.)

- The callout `revival-shifts` says: "The Working Draft of February 2011 named neither `narrow` nor `LSHIFT` and `RSHIFT`, ... the two paragraphs above state the rules the revival decided for them" (`basic-integers.tex:63-66`).
- The Appendix I entry "Shifts and narrowing on the integer types" (`Specification/appendices/changes.tex:1723` onward) gives the reason. `narrow` "keeps the low 32 bits as the team's own test asserts at the values 2^64-1 and 2^63 (`ProjectFortress/tests/UnsignedTest.fss`, lines 210-211), on the signed types as on the unsigned" (`changes.tex:1760-1762`).
- So `ZZ`'s `narrow`, the sibling of `widen` in the same trait, is stated to wrap. `ZZ`'s `widen` is the one explicit conversion out of `ZZ` that the text leaves unstated. The rung that wrote the paragraph left it out on purpose: "`ZZ`'s `widen`, which walk also truncates to 64 bits (`BigNum.java:292-296`), is not stated: no decision covers it and its name promises no truncation; it is reported here and not chosen" (`explorations/compile-ladder/rung-spec-integer-rules/decision-record.md:42`).
- The coercion chapter's revision callout gives the revival's rule for the number types: "a conversion between number types is a coercion where it is exact and stays explicit where it can lose precision" (`Specification/basic/conversions-coercions.tex:74-80`). It says which conversions are written out. It does not say what a written-out conversion does with a value that does not fit.

### 1.4 A conversion that the specification declares as throwing

- The binary-words chapter declares a conversion from a word to an integer with a `throws` clause: `signedIndex(): IndexInt throws { IntegerOverflow }` and `unsignedIndex(): IndexInt throws { IntegerOverflow }`. They are in `trait BasicBinaryOperations`, at `Specification/advanced-lib/binary.tex:1230-1231`, `:1292-1293` and `:1478-1479`. The Working Draft has them at the same lines.
- Their description is "[Description to be supplied.]", and the library does not build them.
- They are the specification's only conversion into an integer type that says what happens when the value does not fit, and what they say is `IntegerOverflow`.

### 1.5 Where the Working Draft differs

- The Working Draft has no fixed-size integer types in its integer chapter, and no `narrow`, `widen`, coercion between integer types or shift rule. All of section 1.3 is the revival's text.
- The general sentence (1.2) and the binary-words declarations (1.4) are the same in both texts.
- `IntegerOverflow` appears in the Working Draft only at the general sentence, the binary words and one method entry (`Specification-1.0-frozen/basic-lib/basic-integers.tex:777`).

## 2. The team's library and interpreter code

### 2.1 The declaration and its binding

- Api: `narrow(self): ZZ32` and `widen(self): ZZ64` on `trait ZZ` (`Library/FortressLibrary.fsi:698-699`).
- Component, `trait ZZ` (`Library/FortressLibrary.fss:991` onward):

      narrow(self):ZZ32 =
          builtinPrimitive("com.sun.fortress.interpreter.glue.prim.BigNum$ToZZ32")
      (* This routine, named for consistency, converts to a ZZ64 *)
      widen(self):ZZ64 =
          builtinPrimitive("com.sun.fortress.interpreter.glue.prim.BigNum$ToZZ64")

  (`Library/FortressLibrary.fss:1080-1084`.) The comment is the team's, from 2009 (section 3).
- The two other `widen`s are exact. `ZZ32`'s binds the helper `simpleLongArith.intToLong` (`FortressLibrary.fss:805-806`, moved by climb batch 23). `ZZ64`'s is `widen(self):ZZ64 = self` (`:906`), which the revival added in `d846e3644` when `ZZ64` stopped being a subtype of `ZZ`. Before that, a `ZZ64` inherited `ZZ`'s `widen`.

### 2.2 The glue class behind `widen`

    public static final class ToZZ64 extends Z2L {
        protected long f(BigInteger x) {
            return x.longValue();
        }
    }

(`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java:292-296`.) Java's `BigInteger.longValue()` returns the low 64 bits. `ToZZ32` beside it is `x.intValue()` (`:286-290`), the low 32 bits. The revival has not changed either class (`git diff a874948ac` on the file touches neither).

### 2.3 The prelude's compiled helper: none

- The compiler prelude's `trait ZZ` declares no conversion out of `ZZ`: no `widen`, `narrow` or `asZZ64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103-145`; row 349).
- `nativeHelpers/` has no `BigInteger`-to-`long` helper. `simpleArbitraryPrecisionArith.java` holds the `ZZ` helpers: parse, print, arithmetic, comparisons, bit operations, `shiftLeft` and the conversions into `ZZ` (`:22-124`). The compiled `FZZ` class has no conversion to `long` either (`compiler/runtimeValues/FZZ.java`).
- The record classifies the binding as class C, "need a new helper" (`explorations/compile-ladder/plan-23/probes/classified-base.tsv:115`: `FortressLibrary.fss 1083 ZZ widen widen(self):ZZ64 BigNum$ToZZ64 C`). PLAN gives class C to N3 (`PLAN.md:54`).
- PLAN's batch 24 is "N1's next families", the bindings that can already name a helper (`PLAN.md:46`). So whether batch 24 reaches `ZZ`'s `widen` is its planner's call. The planner's folder (`explorations/compile-ladder/plan-24/`) names no `widen` yet.
- Whichever way is taken, the helper is new, and both paths will run it after the switch-over (P-58).
- A helper beside it already raises: `simpleArbitraryPrecisionArith.shiftLeft` throws `Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow")` (`:93-102`). Walk turns such a raise into the library's own catchable `IntegerOverflow` (`interpreter/glue/StaticNativeApp.java:184`; F-24).

### 2.4 The team's other narrowing conversions, at their last commit `a874948ac`

| Conversion | Path | Out of range | Source | Who, when |
|---|---|---|---|---|
| `ZZ` to `ZZ64`, `widen` | walk | low 64 bits | `BigNum.java` `ToZZ64`, `x.longValue()` | Crink, 2009-09-10/11 (section 3) |
| `ZZ` to `ZZ32`, `narrow` | walk | low 32 bits | `BigNum.java` `ToZZ32`, `x.intValue()` | Crink, same commit |
| `ZZ64` to `ZZ32`, `narrow` | walk | run-ending error "Overflow of ZZ32" | `Long$FromLong` was `Int.rc(x)`; `Int.rc` calls `error("Overflow of ZZ32 " + i)` (`git show a874948ac:.../Int.java`, lines 239-245) | checked since at least the reorganisation `1d2680d4d` (jmaessen, 2008-03-24), where `narrow(a:ZZ64):ZZ32` bound `Int$FromLong`, which called `Int.rc` |
| `NN64` to `NN32`, `narrow` | walk | low 32 bits | `UnsignedLong$FromLong`, `(int) x`; asserted by `ProjectFortress/tests/UnsignedTest.fss:210-211` | Steele (`gls`), `dc41d5000`, 2008-07-21 |
| `ZZ64` to `ZZ32`, `asZZ32` | compiled prelude | `IntegerOverflow` | `getter asZZ32(): ZZ32 = jLongOverflowingToInt(self)` (`CompilerBuiltin.fss:581` now) | Steele, `9ce7d8189`, 2011-09-08, "New test Integer3 (has try-catch problems)": the commit changed `jLongToInt(self)` to `jLongOverflowingToInt(self)`, in the same diff that made `+`, `-`, `·`, `DIV`, negation and absolute value on `ZZ32` and `ZZ64` checked |
| numeral to `ZZ64`, `asZZ64` | compiled run time | Java `Error` "Not in range for ZZ64" | `compiler/runtimeValues/FIntLiteral.java:63-77` | team code at `a874948ac` |

- The compiler prelude's import block binds seven `long`-to-`int` natives: `longToInt`, `longOverflowingToInt`, `longLowHalfToInt`, `longHighHalfToInt`, `longMaskedToInt`, `longWrappingToInt` and `longSaturatingToInt`. At rung W's base (climb batch 2, 2026-09-20), past the import block, only the overflowing one was used for a conversion, by `asZZ32`, and the low-half one only for shift counts; the other five were used nowhere (`explorations/compile-ladder/rung-int-conversions/REPORT.md`, "Precedent search").
- Rung W counted the convention of the prelude's integer traits: "thirty-two plainly-named members of the four numeric traits take an Overflowing native, and the wrapping and saturating spellings take the other two" (same report, "The specification, and the decision it does not make").
- The revival changed two of these rows. P-72 made walk's `ZZ64` `narrow` keep the low 32 bits (`d6faad28f`). It also added a wrapping `narrow` to the prelude (`d98024425`, then `ce0c7f453`, `CompilerBuiltin.fss:659`). The checked `asZZ32` stays.
- The one library's numeral conversions now refuse a numeral that does not fit. `IntLiteral$ToZZ64` throws `ProgramError` "Value ... does not fit in ZZ64" (`interpreter/glue/prim/IntLiteral.java:262-277`, `9d2e4c856`).

### 2.5 The library's own calls of `ZZ`'s `widen`

These are found by reading. Each call's argument is typed `ZZ`.

- `Library/QuickCheck.fss:322`, in `genZZ.perturb(obj: ZZ, ...)`, is `perturb(big(widen(obj) LSHIFT 32), ...)`, on the branch where `obj` is outside `ZZ32`.
  - The revival wrote this line in `d846e3644`, decision D10 of `explorations/compile-ladder/rung-flat-tower/REPORT.md:105`, "keeping the base's 64-bit behaviour". The team's line was `perturb(obj LSHIFT 32, ...)`.
  - Row 431 holds the bug: the line should shift right. Its fix, `perturb(obj RSHIFT 32, ...)`, removes this `widen`.
  - Measured, section 8.2: the gated team test `ProjectFortress/tests/ReflectiveQuickCheckTest.fss` reaches the line about 360 times a run. In two runs it never passed a value outside `ZZ64`.
- `Library/Format.fss:70`, in `radixHelper(base: ZZ64, val: ZZ64)`, is `n = widen(|/(val / base)\|)`.
  - `val / base` is a `QQ`, and `QQ`'s bracket answers `ZZ` (`FortressLibrary.fsi:437`). So the call is `ZZ`'s `widen`.
  - For any base of magnitude 2 or more, the quotient fits in `ZZ64`.
- `Library/Random.fss:203`, `random(): ZZ64 = widen(|\ asFloat(9007199254740992) __systemRandom() /|)`. Today the bracket on `RR64` answers `ZZ64` (`FortressLibrary.fsi:379`), so the `widen` is `ZZ64`'s identity.
  - P-68 makes the float brackets, `round` and `truncate` answer `ZZ` (row 330, one rung after the switch-over). From then on this call, and any program's `widen(⌊x⌋)` or `widen(round(x))`, goes through `ZZ`'s `widen`. This one stays below 2^53.
- No test in `ProjectFortress/` calls `widen` on a `ZZ`. Of the distinct `widen(...)` calls in its `.fss` files (`grep -rhoE 'widen\([^()]*(\([^()]*\))?[^()]*\)' ProjectFortress --include=*.fss | sort | uniq -c`), each argument is a numeral or a `ZZ32` or `NN32` value. The rung P skeptic's probe, `SkZZWiden.fss`, was removed in `ab067d9b6`.

## 3. What the team said later: the history

Method. `git log --full-history -S widen a874948ac` on each file. The conversion cut parent links, and the parentless full-tree snapshots it left were set aside (`research/authorship.md:14-22`). `-S` matches the substring, so hits on `widenUpper` and on the specification's `widens` were read and set aside.

| Commit | Date | Author | Message (verbatim) | What it did to `widen` |
|---|---|---|---|---|
| `1d2680d4d` | 2008-03-24 | jmaessen | "Massive library reorganization: ..." | Moved `widen(a:ZZ32):ZZ64` (glue `Long$ToLong`) and `narrow(a:ZZ64):ZZ32` (glue `Int$FromLong`, checked by `Int.rc`) into `Library/` |
| `29765a8e4` | 2008-03-28 | jmaessen | "Merged Thread into NativeSimpleTypes. ... Fiddled with some doc comments ..." | Added the doc comment "(** widen converts a ZZ32 into a valid ZZ64 quantity. **)" |
| `dc0f919ce` | 2008-05-08 | jmaessen | "Refactored libraries to move arithmetic operators from top level into the relevant traits and objects." | Moved `widen` into the traits |
| `fca589bbb` | 2008-07-15 | jmaessen | "IntLiteral is now a subtype of ZZ32 ..." | `widen(self):ZZ64` as a method of `ZZ32` |
| `e1567d62f` | 2009-09-10 | Crink | "Library, interpreter glue: Added methods to ZZ to convert to ZZ32 or ZZ64. The nomenclature needs work, in my opinion. Incidentally, my first ever use of Java." | Added `narrow` and `widen` on `ZZ`, the comment "This routine, named for consistency, converts to a ZZ64", and `BigNum$ToZZ32` and `ToZZ64` as `intValue()` and `longValue()` |
| `02e648434` | 2009-09-10 | Crink | "Reverting: Seems my r4150 was broken. Hmmmm. Seemed to test ok at work." | Removed them |
| `8d2eb48f5` | 2009-09-11 | Crink | "[library] Reinstating r4150; everything works now." | Put them back, the same 35 lines |

- At that time `ZZ` comprised `{ BigNum, ZZ64, NN64 }` (`8d2eb48f5`'s diff of `FortressLibrary.fsi`), so `ZZ64` and `NN64` values inherited `ZZ`'s `widen`.
- `research/authorship.md:68` leaves Crink unresolved: "editor support (GtkSourceView), library fixes 'tested at work'; likely external SCA contributor".
- From 2009-09-11 to the team's last commit, 2012-08-31, no commit changed `ZZ`'s `widen`. The search finds none, and since it is blind inside the parentless snapshots, the text was also compared: at `a874948ac` the declaration, its comment and `ToZZ64` read as `8d2eb48f5` left them (`git show a874948ac:Library/FortressLibrary.fss`, lines 886-889; `git show a874948ac:.../BigNum.java`, lines 270-274; `trait ZZ extends { Integral[\ZZ\] } comprises { BigNum, ZZ64, NN64 }` at line 533 of the api).
- No commit to `Specification/`, `Specification-1.0-frozen/` or `Documentation/Specification/` names the function. Their 12 hits are all on "widens", "widening" or "widenable", the widest-need evaluation of `Specification/basic/conversions-coercions.tex:835`, "Automatic Widening"; the last word is in `0f49d8698`, 2009-11-06, sukyoungryu: "components are widenable".
- So the team's own word on `ZZ`'s `widen` is the 2009 comment and commit message. They say the name was chosen "for consistency" with the exact `ZZ32` `widen`, and that "the nomenclature needs work". They say nothing on a value that does not fit.
- The team's later word on narrowing in general is Steele's checked `asZZ32` of 2011 (section 2.4), in the type group's compiler prelude.
- The revival's commits that changed `widen` (`git log -S widen a874948ac..HEAD`) are `d98024425`, `3924e7ec3`, `d846e3644`, `17c6052bb`, `e455ccd98`, `5ad4a9957` and `640acb4a1`. None changed `ZZ`'s `widen`.

## 4. The ledger rows, the judgement, PLAN and the queue

### 4.1 Row 502

- Claim: "under walk, `widen` of a `ZZ` outside `ZZ64`'s range keeps the low 64 bits silently: `widen(2^64+5)` is `5` and `widen(-(2^63)-1)` is `9223372036854775807`."
- Status `NEGATIVE-VERIFIED`, class `implementation gap (walk)`, spec citation "silent", found by climb batch 6.5 rung P's skeptic.
- Its notes say: "Whether it truncates as `narrow` does or throws `IntegerOverflow` by the general sentence of `Specification/basic/operators/opr-overview.tex`, 'For integer results, overflow throws an `IntegerOverflow`', is the curator's (`explorations/coordinator/PLAN.md`, item 31); the switch-over's natives meet it."
- The earlier text in the history gave the row the class "divergence, specification silent", the status "NEGATIVE-VERIFIED (walk's answer measured; the specification silent)" and "Home 3, because the specification is silent".
- The present class, a gap of walk, reads walk's answer as the defect, while the notes leave the answer open. The row text is from `$T 'ledger:502'` and `explorations/fortress-gap-ledger-history.md`, "Row 502".
- Why the row exists: rung P stated `narrow` on `ZZ` and did not state `widen` (`rung-spec-integer-rules/decision-record.md:42`, quoted in 1.3). Its skeptic measured walk and recommended "a new row, home 3, ... and a point for Pavol" (`rung-spec-integer-rules/SKEPTIC.md:52`, `:98`, `:103`).

### 4.2 Row 349

- Claim: "the compiler prelude's `trait ZZ` declares neither `widen` nor `narrow`, so `widen` of a `ZZ64` and `narrow` of a `ZZ`, which `walk` answers, are refused compiled; `narrow` of a `ZZ32` compiles by coercion and gives 43 on both paths."
- `NEGATIVE-VERIFIED`, `library gap vs spec (prelude)`, reproducer `ProjectFortress/compiler_tests/XXXZZNarrowRungP.test`. "Closes at the switch-over with row 442."
- Its notes add: "The specification is silent on `widen` (row 502)."
- Why it matters here: after the switch-over the compiled path runs the one library's binding. So the helper written for `widen` decides the compiled answer too. Today there is none.

### 4.3 The phase 3 exit judgement

- Section 5.2, "Before the names batch", says: "rq 20 (`widen` of a `ZZ` too large): default the low 64 bits, P-72's precedent and the team's `UnsignedTest.fss`; 0 rungs, decided before the natives bind `widen`." (`explorations/reviews/phase3-exit/judgement.md:158`.)
- Its "For Pavol" puts "`widen` keeping the low 64 bits" among nine items that "can take their defaults as the queue states them" (`:234`). The queue states no default for item 20 (4.4).
- Why. The evidence map it read says: "P-72's precedent keeps the low bits for `narrow`, from the team's `UnsignedTest.fss`" (`explorations/reviews/phase3-exit/decisions-evidence.md:521-523`). It also files item 20 as "the same principle's open case" beside P-67 and P-69 to P-73 (`:305`).
- What the cited test asserts. `UnsignedTest.fss:210-211` asserts `narrow` of `NN64` values; the audit of P-72 corrected the decision's reason to say so (`POSITIONS-history.md`, P-72, 2026-10-22 08:30Z). The file has no `ZZ` value and no `widen` of a `ZZ`: its 15 `widen` calls take `NN32` values. So the judgement's reason is an analogy from `narrow` to `widen`.
- The judgement is a Fable judge's, 2026-10-24, reading only (its header comment).

### 4.4 PLAN and the review queue

- PLAN's natives line: "Asked: `widen` of a `ZZ` too large for `ZZ64` (row 502), which the natives meet when they bind `widen`: keep the low 64 bits, as walk does, or raise `IntegerOverflow` by the general sentence (row 349)? No default on record; the phase 3 exit judgement recommends the low 64 bits, before the natives bind `widen`" (`PLAN.md:53`). Item 31 is the same question (`:127`).
- Review-queue item 20:
  - Landed: "Walk keeps the low 64 bits: `widen(2^64+5)` is 5. The compiled prelude has no `widen` on `ZZ`."
  - The other way: "Raise `IntegerOverflow`, by the general sentence on integer results."
  - Its cost: "No default on record. The switch-over's natives meet it."
  - Needed by: "before the switch-over" (`review-queue.md:259-264`).
- The wrap review of 2026-09-26 lists `ZZ`'s `narrow` and `widen` among the devices code uses to mean wrap. It notes: "that truncation is not a decision on record, only the tree's behaviour" (`explorations/reviews/wrap-dependent-code.md:20`). Of `narrow` it says: "The one integer decision that followed Java is `narrow`, which truncates as a Java cast does (row 346), and that is a conversion with its own name, not an arithmetic operator" (`:81`).

## 5. The record's decisions and facts

The record was read with `explorations/coordinator/tools/facts-extract.sh`, on every FACTS and POSITIONS entry that names `IntegerOverflow` or `widen`. Of those that name `ZZ64` or `ZZ`, the ones on numbers and conversions were read too. No entry decides `widen` of a `ZZ`. In POSITIONS, no entry names `widen`.

The decisions:

- **P-72**: "`narrow` keeps the low 32 bits of a value that the narrower type cannot hold, signed and unsigned, on both paths, and raises no `IntegerOverflow`."
  - It covers `ZZ64` to `ZZ32` and `NN64` to `NN32`, not `ZZ`. The audit says: "The entry omits unbounded `ZZ`" (`explorations/coordinator/positions-audit/full/evidence/P-72.md`, section 2).
  - Why, in its text: "the team's specification said nothing on `narrow`, and the team's boundary test ... asserts the low 32 bits for `NN64` values. On the unsigned types, keeping the low bits is a bit operation, like a shift, and the signed `narrow` gets the same answer."
  - Its origin: rung W (climb batch 2) had chosen the throw, under a silent specification and the prelude's convention (2.4). On 2026-09-22 the coordinator recommended "truncate on both paths, one prelude body, with the signed sibling checked to match. Rung W's choice on this point is reversed." The curator answered at 21:49:15Z: "Row 43 approved as recommended." On 2026-09-24 he extended it to the signed `narrow` (the same audit file, section 1).
  - The judgement of 2026-09-29 ruled on it: "a call following Steele's own 2008 boundary test ... against the general overflow sentence. Consistent with F2 and with what every JVM language does with a narrowing cast. Fine." (`explorations/reviews/decisions-review/judgement.md:146`).
- **P-73**: "Under walk, fixed-width integer arithmetic raises `IntegerOverflow` when its result does not fit, on the unsigned `NN32` and `NN64` too. The rule covers every operation whose result can leave its type, `^`, `CHOOSE` and `LCM` included." "Why: this is the specification's rule, and the compiled path already raised the error ..."
  - The curator's word was 2026-09-24T09:14:36Z, "Agreed with the recommendation." (`POSITIONS-history.md`, P-73).
- **P-70**: `LCM` raises `IntegerOverflow` when the multiple does not fit, and `GCD` where the divisor does not fit. "Why: ... its general rule raises `IntegerOverflow` for an integer result that does not fit."
- **P-153**: at a negative exponent, "the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`."
  - Here the revival raised `IntegerOverflow` where the integer type cannot hold the true result. Another answer was available, and the compiler prelude's `ZZ32` power gives it: 0, the quotient truncated toward zero (row 441).
  - Under its rung, walk reads a `ZZ` exponent beyond 64 bits by its sign and parity, not by its low 64 bits. Its comment: "One beyond 64 bits becomes the long of its sign and parity nearest it" (`interpreter/glue/prim/Int.java:268-283`; F-263, "including a `ZZ` exponent too large for 64 bits, such as 2^70").
  - The shift count follows the same idea: "The count is read by its value, whatever its type" (`basic-integers.tex:61-62`; P-69).
- **P-69**: on the fixed widths a shift "loses the bits that it shifts out, silently, as in every peer language"; on `ZZ`, `shift` is exact.
- **P-66**, the integer principle: "Java's and the JVM's defaults stay where they make sense, and are corrected where they fail high performance or mathematical precision. ... A hardware behaviour that bytecode can express gets its own explicit spelling, as the specification's wrapping and saturating operators do. ... The peers to compare are Julia, X10, Swift and Rust."
- **P-74**: "A conversion that is exact is implicit, and a conversion that can lose precision is written out." `widen` of a `ZZ` is written out. P-74 does not say what it does when it loses.
- **P-68**: the float brackets, `round` and `truncate` are to answer `ZZ`. This widens the reach of `ZZ`'s `widen` (2.5).
- **P-58**: every native binding becomes a `builtinPrimitive` call naming a static helper, which both paths run.
- **P-8**: where the designers' sources give no answer, the curator decides by the goal, a compiled microGPT running fast, "and he stays true to the spirit of Fortress".
- **P-26** and **P-27**, applied in order by the judgements: the type group's later positions over the specification's early text, then the library's own practice.

The facts:

- **F-132**: under walk, "Three kinds of operation raise nothing: the wrapping operators (F-130) and `narrow`, the written conversion of a `ZZ64` to `ZZ32` or an `NN64` to `NN32` (P-72), which keep the low bits; and the shifts `LSHIFT` and `RSHIFT`, which lose the bits shifted out."
- **F-172**: "The specification's integer chapter states the library's integer rules. `narrow` converts a `ZZ64` or `ZZ` to `ZZ32`, and an `NN64` to `NN32`, by keeping the low 32 bits ..."
- **F-124**: on the compiled path `narrow` keeps the low 32 bits, "and `asZZ32` throws out of range".
- **F-24**: a helper's raise of `IntegerOverflow` is the library's catchable exception under walk.
- **F-130**: the wrapping operators, and `Random`'s `LinearCongruential`, which wraps through `widen` of its state. The library builds that object only at `ZZ64` (`Library/Random.fss:256-257`), so its `widen` is `ZZ64`'s identity, not `ZZ`'s.
- **F-263**: the power rules, with the `ZZ` exponent beyond 64 bits.
- The other entries that name `IntegerOverflow` (F-118, F-133, F-261, F-180) do not bear on conversions out of `ZZ`.

## 6. microGPT

- Neither program names `widen`, `ZZ`, `big`, `ZZ64`, `narrow`, `truncate`, `round` or a floor bracket. That was checked with `grep -nw` over `explorations/run-c4/src/MicroGptFlat.fss` (98 lines) and `explorations/apl/mg/MicroGptApl.fss` (127 lines).
- The components they import beside them (`FlatArrays`, `FlatData`, `AplMg`, `AplMgSyntax`, `FlatArrays2`, `FlatData2`) name none of these either, outside one comment of `FlatArrays.fss` (line 6, "round three's survey"). Their one integer conversion from the library is `strToInt` (`FlatData.fss:34`, `FlatData2.fss:37`). It is `ZZ32` throughout (`Library/FortressLibrary.fss:4587-4603`).
- So, by reading, neither way changes a model line or the model's speed. Whether the library reaches `ZZ`'s `widen` inside a run of the model was not measured. Section 10 says how.

## 7. The peers

Each line was measured here, except where marked. Java is OpenJDK 25.0.4.1; Scala is the tree's `scala-library-2.13.18.jar`; Rust is rustc 1.97.0; Python is 3.13.16 with NumPy 2.5.3.

- **Java**: `BigInteger.longValue()` keeps the low 64 bits; `longValueExact()` throws `ArithmeticException`. The cast `(int) aLong` truncates; `Math.toIntExact` throws.
- **Scala**: `BigInt.toLong` keeps the low 64 bits. Scala has no checked conversion, only the test `isValidLong`.
- **Swift** (not run; read in `swiftlang/swift`, `stdlib/public/core/Integers.swift` on `main`, fetched 2026-10-31):
  - The plain conversion `Int64(x)` from any `BinaryInteger` traps: "If the value passed as `source` is not representable in this type, a runtime error may occur" (`:582-583`), and "Not enough bits to represent the passed value" (`:3427`).
  - The low bits are spelled `Int64(truncatingIfNeeded:)` (`:633`), saturation `Int64(clamping:)` (`:3136`), and the test `Int64(exactly:)`, which gives `nil`.
- **Rust**:
  - Primitives: `x as i64` from an `i128` keeps the low 64 bits; `i64::try_from` gives `Err(TryFromIntError(PosOverflow))`.
  - The standard library has no bignum. The `num-bigint` crate's `BigInt::to_i64` returns `Option<i64>`, `None` out of range, and its `TryFrom<&BigInt>` fails. It offers no truncating conversion (read in `rust-num/num-bigint`, `src/bigint/convert.rs:41-55`, `:107-132`, fetched 2026-10-31; not run).
- **Python**: `int` is unbounded and has no 64-bit type. At the places it narrows, `ctypes.c_int64(2**64+5).value` keeps the low bits (5). `struct.pack('<q', ...)`, `int.to_bytes(8, ..., signed=True)` and `numpy.int64(...)` raise (`struct.error`, `OverflowError`).
- **Julia**, which P-66 names (not run; by its documentation): `Int64(big(2)^64)` throws `InexactError`, and the low bits are spelled `x % Int64`. X10, which P-66 also names, was not checked.

In short: Java's `longValue` and Scala's `toLong`, the plain methods of their bignums, keep the low bits, and Java also offers the checked `longValueExact`. Rust's `as` between primitive integers keeps the low bits too. Of the languages that P-66 names, Swift (read in its source) and Julia (by its documentation) make the plain conversion checked and spell the low bits separately, and Rust's bignum crate (read in its source) offers only checked conversions. Python has no 64-bit integer of its own, and its narrowing places split: `ctypes` keeps the low bits, `struct`, `to_bytes` and NumPy raise.

The commands, and the output that matters:

    $ jshell -q --class-path ProjectFortress/third_party/scala/scala-library-2.13.18.jar peers.jsh
    Java  BigInteger.longValue(2^64+5)      = 5
    Java  BigInteger.longValueExact(2^64+5) -> ArithmeticException: BigInteger out of long range
    Java  (int) 4294967301L                 = 5
    Java  Math.toIntExact(2^32+5)           -> ArithmeticException: integer overflow
    Scala BigInt(2^64+5).toLong             = 5
    Scala BigInt(2^64+5).isValidLong        = false

    $ rustc -O -o peers_rs peers.rs && ./peers_rs
    Rust  ((1i128<<64)+5) as i64       = 5
    Rust  i64::try_from((1i128<<64)+5) = Err(TryFromIntError(PosOverflow))

    $ python3 -I peers.py
    Python ctypes.c_int64(2**64+5).value = 5
    Python struct.pack('<q', 2**64+5) -> struct.error: 'q' format requires -9223372036854775808 <= number <= 9223372036854775807
    Python (2**64+5).to_bytes(8, signed=True) -> OverflowError: int too big to convert
    Python numpy.int64(2**64+5) -> OverflowError: Python int too large to convert to C long (numpy 2.5.3)

The three scripts are a few lines each: `BigInteger.TWO.pow(64).add(BigInteger.valueOf(5))` and `scala.math.BigInt.apply(z)` in jshell, `(1i128 << 64) + 5` in Rust, `2**64 + 5` in Python.

## 8. Runs under walk

The setup lines of the `fortress-repo` skill were used, with `FORTRESS_THREADS=1`, and each run had a private caches folder (`FORTRESS_CACHES=<scratch>/caches`). The build was the tree's own, at `640acb4a1`.

### 8.1 The three-line program

    component WidenProbe
    export Executable
    run() = do
      println("widen(2^64 + 5)     = " widen(18446744073709551621))
      println("widen(-(2^63) - 1)  = " widen(-9223372036854775809))
      println("widen(2^63 - 1)     = " widen(big(9223372036854775807)))
    end
    end

Under walk the first two numerals do not fit `ZZ64`, so they are `ZZ` values (P-76), and `widen` runs `ZZ`'s binding. The third line is the control, a `ZZ` that fits.

    $ cd <scratch>/probe && FORTRESS_CACHES=<scratch>/caches bin/fortress WidenProbe.fss; echo "rc=$?"
    widen(2^64 + 5)     = 5
    widen(-(2^63) - 1)  = 9223372036854775807
    widen(2^63 - 1)     = 9223372036854775807
    rc=0

The run reproduces row 502: no error, the low 64 bits, and a negative input that comes out as the largest positive `ZZ64`.

### 8.2 Does a gated test pass `widen` a `ZZ` beyond 64 bits?

- The question is whether the raise would turn the team's QuickCheck test red through `QuickCheck.fss:322` (2.5).
- Method:
  - A copy of `Library/QuickCheck.fss` and `.fsi` went into a scratch folder. Walk's source path reads the current directory first (`fortress-repo`, `build-and-caches.md`, "Name resolution").
  - Two lines were added to the copy's `genZZ.perturb`, on the branch that calls `widen`, which became a `do` block:

        println("PERTURB-ELSE " obj)
        if |obj| > big(9223372036854775807) then println("WIDEN-OUT-OF-RANGE " obj) end

  - `ProjectFortress/tests/ReflectiveQuickCheckTest.fss` was run twice from that folder, with its own private caches.
  - The cached tree of `QuickCheck` named the copy's path, so the copy was the one loaded.
- Result: run 1 had 356 `PERTURB-ELSE` lines and 0 `WIDEN-OUT-OF-RANGE`; run 2 had 370 and 0. Both runs passed all 9 properties and exited 0.
- The values that reached the call were within 64 bits, such as `-5105303812412827606`. They come from the line's own `widen(obj) LSHIFT 32` recursion.
- Two runs of a randomised test do not prove that a value beyond 64 bits never comes. `genZZ.generate` makes values beyond 2^64 at 4 of its 12 levels (`QuickCheck.fss:300-315`).

## 9. The ways

| Way | What it changes in the tree | What it costs | What it gives up |
|---|---|---|---|
| **A. Keep the low 64 bits** (walk today; the judgement's recommendation) | The binding at `FortressLibrary.fss:1083-1084` names a new helper in `simpleArbitraryPrecisionArith.java` returning `x.longValue()`. A walk test asserts `widen(2^64+5) = 5` and `widen(-(2^63)-1) = 2^63-1`, and a compiled test binds the helper itself (as `compiler_tests/NativeHelperBindingCompiled.fss` does). The specification gains a sentence on `widen` beside `narrow` (`basic-integers.tex:39-45`), with its callout and an Appendix I entry, and P-72 or a new entry records it. Row 502 closes as decided, and row 349's `widen` half at the switch-over. Walk's behaviour, the library's calls and microGPT do not change. | One helper of three lines and two tests, inside the natives family that moves the binding: 0 rungs of its own (judgement, 5.2). | A value too large becomes a wrong value with no signal, as row 502 shows: `-(2^63)-1` comes out as `2^63-1`. The general sentence (1.2) is not applied to this conversion. The plain-named narrowings of the type group's prelude (`asZZ32`, Steele 2011) and of the team's 2008 walk (`ZZ64`'s `narrow`) stay checked, and this one does not. The revival elsewhere reads a `ZZ` beyond 64 bits by its value (P-153's exponent, P-69's counts) and refuses a numeral that does not fit (2.4). Rung P wrote that the name "promises no truncation" (1.3). |
| **B. Raise `IntegerOverflow`** (the general sentence) | The binding names a new helper that throws `Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow")` when `x.bitLength() > 63`, else returns `x.longValue()`, in the form of `shiftLeft` beside it (2.3). Walk changes: row 502 is fixed by that commit, with a walk test using the `overflows(...)` form of `tests/IntSemanticsRungI.fss` and a compiled test of the helper. The specification sentence beside `narrow` says the conversion throws, with callout, Appendix I entry and a POSITIONS entry. `QuickCheck.fss:322` would raise for an `obj` beyond 64 bits; it was not reached in two runs (8.2), and row 431's fix removes the call. | The same helper and tests, plus one bit-length test per call; the run-time cost of that test was not measured. 0 rungs of its own. | Inside `trait ZZ`, `narrow` would keep the low 32 bits (stated, `basic-integers.tex:39-45`) while `widen` raised: the two conversions out of `ZZ` would differ. P-72's reason, keeping the low bits as a bit operation, would not extend to `widen`. No spelling would be left for "the low 64 bits of a `ZZ`": `trait ZZ` has no other conversion to a fixed width, so a program reduces the value into `ZZ64`'s range itself, with `MOD` or `BITAND` and a sign correction, before `widen`. The wrap review's device "`ZZ`'s `narrow` and `widen` keep the low bits" (`wrap-dependent-code.md:20`) loses its `widen` half. |
| **B′. Raise in both conversions out of `ZZ`** (`narrow` and `widen`) | As B, and `ZZ`'s `narrow` binds a raising helper too. The sentence `basic-integers.tex:39-45` and its Appendix I entry change for `ZZ`, which rung P's decision 4 stated (`decision-record.md:42`). P-72's entry is unchanged, since it omits `ZZ`. F-172 changes. | As B, plus a second helper and a reversed sentence of the specification. | As B, without the asymmetry inside `trait ZZ`. In its place, `ZZ`'s `narrow` would differ from `ZZ64`'s and `NN64`'s, which P-72 keeps wrapping. |
| **C. Raise, and spell the low bits separately** (Swift's `truncatingIfNeeded:`, Julia's `% Int64`; the prelude's reserved `Wrapping` and `Saturating` natives, 2.4) | As B, plus a new declaration on `ZZ` for the low 64 bits, with its own helper, test, specification sentence and name. | As B, plus one api member. Its name is new: a functional method's name is reserved in every program that imports the library (`fortress-repo`, `library.md`), and the name is the curator's. | As B, except that the low-bits spelling stays. It adds a member that the team's library never declared. |

Notes on the ways:

- **Which keeps the current behaviour.** Way A. Ways B, B′ and C change walk. None changes microGPT, by reading (6).
- **What none of them changes.** The compiled path has no `ZZ`'s `widen` until the switch-over (row 349). Whichever helper is written becomes the compiled answer then (P-58). The cost of a later reversal is one helper body, its test and the specification sentence.
- **When.**
  - The question must be answered before the binding at `FortressLibrary.fss:1083-1084` moves onto a helper, because the helper fixes the answer on both paths.
  - The record files that binding as class C, a new helper (2.3), which PLAN gives to N3. Whether climb batch 24 reaches it is its planner's call.
  - P-68's rung, after the switch-over, routes the float brackets, `round` and `truncate` through `ZZ` (2.5). From then on, `widen` of their results is the way a program gets a `ZZ64` from a float, and this choice decides what `widen(round(1.0e19))` does.

## 10. What is missing, and how to get it

- **Whether microGPT's run reaches `ZZ`'s `widen`.** Not measured. One way: count calls in a scratch copy of the library's `trait ZZ`, the method of 8.2, and run `explorations/coordinator/tools/mg-run.sh` from that folder. By reading, neither program nor its components can reach it (6).
- **Swift, Rust's `num-bigint` and Julia were not run.** Swift and `num-bigint` were read in their sources, Julia from memory of its documentation. X10 was not checked.
- **The raising helper's cost per call.** Not measured. It is one `BigInteger.bitLength()` on a value that is already a `BigInteger`.
- **Whether `ReflectiveQuickCheckTest` ever passes a value beyond 64 bits to `QuickCheck.fss:322`.** Two runs passed none (8.2). More runs, or a seed sweep, would bound it further.

## 11. Findings new to the record

- `ZZ`'s `widen` and `narrow` are Crink's of 2009-09-10/11 (`e1567d62f`, reverted by `02e648434`, reinstated by `8d2eb48f5`). They were named "for consistency" with the exact `ZZ32` `widen`, "the nomenclature needs work", and left unchanged to `a874948ac` (section 3). No earlier record note names these commits.
- The prelude's checked `asZZ32` is Steele's change of `jLongToInt` to `jLongOverflowingToInt` in `9ce7d8189` (2011-09-08). It was made in the commit that made the prelude's plain arithmetic checked (section 2.4). The record cites that commit for the arithmetic (`wrap-dependent-code.md`), not for `asZZ32`.
- `ReflectiveQuickCheckTest` reaches `ZZ`'s `widen` at `QuickCheck.fss:322` about 360 times a run, with values within 64 bits in two runs (section 8.2).
- Two slips in the record's text of the question:
  - PLAN's natives line, PLAN item 31 and the brief cite row 349 for the general sentence, which row 502 cites (section 0).
  - Row 502's present class, `implementation gap (walk)`, presumes walk wrong while its notes leave the answer to the curator; its earlier class was "divergence, specification silent" (section 4.1).
- By the record's classification, `ZZ`'s `widen` is a class C binding, a new helper, which PLAN gives to N3, not to N1's next families (section 2.3).
