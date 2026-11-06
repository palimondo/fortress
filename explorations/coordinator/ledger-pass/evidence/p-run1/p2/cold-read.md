# Cold read: p-run1/p2 (rows 327, 348, 350, 429, 431, 500, 501, 700, 792)

Read with `CLAUDE.md`, the `fortress-repo` skill core and its `references/` (records, library, compiler, interpreter, tests-writing, tests-running), nothing else.

General, applies to every row: the skill names the seven status words (`records.md`, "The gap ledger") but defines them only in the row template, which a worker does not hold. I read `NEGATIVE-VERIFIED` as "the gap is confirmed to exist" and `CONTESTED` as "an open question"; neither word says by itself whether to build, wait or leave, so for each row the notes must say it. The Class kinds (`library bug`, `library gap vs spec`, `implementation gap`, `design limit`) are likewise undefined in the skill; I read them from their English. "siblings: N" I read as "related rows", undefined. "full text: history, row N" I read as a pointer to `explorations/fortress-gap-ledger-history.md`.

## Row 327

- **Defect:** `library_tests/ChooseTest3.fss:125` means to test the `ZZ64` choose algorithm at its fast/slow boundary (comment at `:122-123`), but writes `verifyChoose(3037000500+j, 2)`. `j` is `ZZ32`, so the numeral is taken at `ZZ32`, cannot hold it, and wraps to `-1257966796`. The test therefore computes a binomial coefficient of a negative number, and since both sides of each assertion use the same argument it still passes. The boundary goes untested.
- **Where:** the compiled path (`library_tests/` is the compiler's library's tests, `tests-writing.md`); file `ProjectFortress/library_tests/ChooseTest3.fss:125`. Model of the fix: `library_tests/IntegerChoose2.fss:56`, `:115`.
- **Reproduce:** read the line; the wrapped value was measured on the compiled call. Not runnable through the harness: no `.test` file names `ChooseTest3.fss`, and `LibraryJUTest.java:36` runs only `.test` files, so no gate runs it.
- **Status:** build a fix: bind the constant as `fastSlowBoundary: ZZ64` first, as `IntegerChoose2.fss` does. The row does not say whether the fix should also add a `.test` file so the test is gated, nor how the test-first rule applies to fixing a test.
- **Could not resolve:**
  - Why an out-of-range numeral wraps silently rather than raising `IntegerOverflow` or a static error (the skill says overflow raises `IntegerOverflow`, and that the compiler folds literals); is that itself a defect with its own row? Language concept I lack (literal coercion/folding rules), not in the skill.
  - "the file's own idiom": the idiom is quoted from a different file, `IntegerChoose2.fss`; I read it as "the folder's idiom". Unclear wording.
  - Whether walk shows the same wrap: the row names only the compiled measurement. Unclear wording (paths not stated).
  - Class `library bug (tests)`: the area is the test file, the kind says library. Unclear wording, minor.

## Row 348

- **Defect:** the compiler's prelude swaps the specification's spellings on `ZZ32`, `ZZ64`, `NN32`, `NN64`: the BOX operators (`BOXPLUS`, `BOXMINUS`, `BOXDOT`, `BOXCROSS`) wrap and the DOT operators (`DOTPLUS`, `DOTMINUS`, `DOTCROSS`) saturate, where the specification has DOT wrap and BOX saturate (consistent with `library.md`: ∔ ∸ ⨰ wrap). The prelude has no `DOTTIMES` at all. Example: `NN32` max `BOXPLUS 1` is 0, `DOTPLUS 1` is 4294967295.
- **Where:** compiled path only; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:587-599` (ZZ64), `:672-684` (ZZ32), `:766-778` (NN32), `:832-844` (NN64), at de6d905f5. Walk's library is already right (`tests/WrapOperatorsRungD.fss`).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXBoxDotSpellingsRungW.test` (with its `BoxDotSpellingsRungWLink.test`, the run-time `XXX` pair `tests-writing.md` cites).
- **Status:** leave it. P-38: the compiled tests are respelled at the switch-over (and `compiler.md` forbids editing the prelude); P-73: saturation is a separate step (row 797). The status word alone would suggest a confirmed gap to fix; only the P-38/P-73 note tells a worker not to.
- **Could not resolve:**
  - P-38 and P-73 are cited by number only; their gist is given in a clause, which suffices, but "respell them" could mean the tests change their operators or the tests' expectations change. Unclear wording, minor.
  - `BOXDOT` and `BOXCROSS` wrap, but the row names no DOT counterpart of `BOXDOT`; whether the spec has a `DOTDOT`-like spelling or only `DOTTIMES`/`DOTCROSS` is not said. Language concept (the operator table), not in the skill.
  - "Walk's half is fixed": fixed by the revival or never broken? Unclear wording, minor.

## Row 350

- **Defect:** an `IntegerOverflow` exception carries no value or message on either path, so a handler cannot tell which number overflowed.
- **Where:** both. Compiled: every throw in `nativeHelpers/simpleIntArith.java`, `simpleLongArith.java` and the unsigned twins (e.g. `simpleIntArith.java:97`) calls the one-argument `Utility.makeFortressException(name)` (`compiler/runtimeValues/Utility.java:45`); the two-argument form at `:28` takes a message. Walk: `interpreter/glue/prim/Int.java:258`, `Int.overflow()`.
- **Reproduce:** recover the probe `explorations/compile-ladder/rung-int-conversions/probes/skeptic/SK4Bounds.fss` from the parent of ab067d9b6 (`git show ab067d9b6^:...`); compiled it prints only "IntegerOverflow caught". No test.
- **Status:** unclear. Specification is silent, no position is cited, and the row gives no fix. It reads as a confirmed gap a worker could build, but without a spec word or decision it may equally be a design question for the curator.
- **Could not resolve:**
  - What the exception should carry: the operand(s), a message string, or a field the library's `IntegerOverflow` object would have to declare. The two-argument `makeFortressException` passes a message, which would not let a program "say which number" except by parsing text. Unclear (no target behaviour).
  - "the no-argument constructor": of the Fortress exception object, or of a Java class? I read the former. Unclear wording.
  - "in the parent of ab067d9b6": means the probe was deleted in ab067d9b6. Readable, but the git step is left to the reader.
  - Class says `(runtime)` while walk's glue is also cited. Minor.

## Row 429

- **Defect:** the one library has no unary ∔ (`DOTPLUS`), no unary `+`, and no unary ⊞ on the integer types. The specification says unary `+` returns its argument, and ⊞ and ∔ do the same (`Specification/basic-lib/basic-integers.tex:391-392`). The library has unary `DOTMINUS` and binary `DOTPLUS` (`Library/FortressLibrary.fsi:561-563`, on `ZZ32`).
- **Where:** walk's library (the one library): `Library/FortressLibrary.fsi`, `Library/`, `ProjectFortress/LibraryBuiltin/`.
- **Reproduce:** `grep -rn -E 'opr (\+|DOTPLUS|BOXPLUS|∔|⊞) ?\(self ?\)' Library/ ProjectFortress/LibraryBuiltin/` prints nothing.
- **Status:** unclear. "P-73 names the binary wrapping operators only" says the decision does not cover the unary ones, which leaves open whether a worker may add unary `+` and ∔ now or must wait. Unary ⊞ waits on saturation (row 797). I would read it as: unary `+`/∔ buildable, ⊞ wait; but the row does not say so.
- **Could not resolve:**
  - "lists on `ZZ`": `ZZ` the arbitrary-precision type, or the integers generally (all five types)? The library citation is on `ZZ32`. Two readings; unclear wording.
  - "⊞ is a saturating spelling": as a unary operator it is the identity, so why it must wait on saturation is not explained. Unclear wording / language concept (the operator families) not in the skill.
  - Whether a unary `+` prefix parses at all, i.e. whether the gap is the library alone or also the grammar. Language concept, not in the skill.
  - "binary `DOTPLUS` only": `DOTTIMES` is also declared (row 700 uses it), so "only" means only among the plus/minus forms. Unclear wording, minor.

## Row 431

- **Defect:** `genZZ.perturb` in QuickCheck splits a large `ZZ` into 32-bit pieces by shifting it left by 32 where it must shift right, so only the low 32 bits of a big `ZZ` reach the generator. Under walk a random function of a `ZZ` gives the same answer for 2^40+7, 2^50+7 and 2^70+7. The current line `perturb(big(widen(obj) LSHIFT 32), ...)` terminates only because `widen` keeps it in 64 bits; the team's `obj LSHIFT 32` never terminated on a `BigNum` (`OutOfMemoryError` in `BigInteger.shiftLeft`, seen in `ReflectiveQuickCheckTest`).
- **Where:** walk (the one library); `Library/QuickCheck.fss:322` at de6d905f5.
- **Reproduce:** no test, probes removed; detail in `explorations/reviews/quickcheck-widen.md`, sections 3 and 7.3. A worker would build a random function of `ZZ` and compare its results at 2^40+7, 2^50+7, 2^70+7 under walk, constructing the values directly since `genZZ.generate` makes nothing beyond 64 bits under walk (row 387).
- **Status:** build a fix: `perturb(obj RSHIFT 32, ...)`. Warned that it changes every QuickCheck test's generated data.
- **Could not resolve:**
  - `widen`, `big`, `perturb`, "a random function of a `ZZ`": library names and a QuickCheck concept (generators that build functions from perturbed seeds) not in the skill; readable from context, but what "answers alike" measures needs the source.
  - "changes every QuickCheck test's generated data": whether that is acceptable, or needs expected outputs revisited or a decision, is not said. Unclear wording.
  - Whether the fix should drop `widen`/`big` too (the proposed text drops them). Readable as yes; minor.

## Row 500

- **Defect:** three `property` lines of the specification's integer chapter that use `shift` are wrong: `countBits(shift(x,1)) = countBits(x)` fails for every negative `x` (measured under walk at -1, -2, -3: left side one more), the next line adds 1 to both sides (so it says nothing new), and `countFactorsOfTwo(shift(x,1)) + 1 = 0` is false for every `x`.
- **Where:** specification only: `Specification/basic-lib/basic-integers.tex:801-802`, `:823` at de6d905f5 (Working Draft `:760-761`, `:782`). No program runs a `property`; the library declares none of `countBits`, `countFactorsOfTwo`, `integerLength`.
- **Reproduce:** read the lines; probe `explorations/compile-ladder/rung-spec-integer-rules/probes/skeptic/SkCountBits.fss`, recovered from the parent of ab067d9b6, with `countBits` written as the chapter defines it, under walk.
- **Status:** leave it / wait: "nothing settles the intended properties", so the repair needs a decision. A suggested reading exists (a garbled case split: equal for `x >= 0`, `countBits(x) + 1` for `x < 0`) but is not adopted.
- **Could not resolve:**
  - "the next adds 1 to both its sides": adds 1 relative to the first line, or the line itself is `a + 1 = b + 1`? Two readings; unclear wording.
  - Whether `countFactorsOfTwo(shift(x,1)) + 1 = 0` is meant as `countFactorsOfTwo(shift(x,1)) = countFactorsOfTwo(x) + 1` with a garbled right side; the row does not offer a reading for `:823`. Unclear wording.
  - Class `design limit`: undefined; I read "the design (spec text) is wrong, no code to fix". Concept not in the skill.
  - Who decides: the curator (by `exploring.md`, a choice not mine), but the row names no question or queue item.

## Row 501

- **Defect:** the specification lists `GCD` and `LCM` among the idempotent (semilattice) operators, but they are idempotent only on nonnegative integers: `-4 GCD -4` and `-4 LCM -4` give `4` on `ZZ32` and `ZZ64`, on both paths. The results are nonnegative by the integer chapter's own rule.
- **Where:** specification: `Specification/advanced-lib/algebraic-constraints.tex:1159-1160`; related `Specification/basic-lib/basic-integers.tex:554-560`, `:562-564` (already says "strictly positive integers"). Behaviour under walk on the five integer types: F-316, `tests/IntSemanticsRungI.fss`.
- **Reproduce:** evaluate `-4 GCD -4` on either path; probe `explorations/compile-ladder/rung-spec-integer-rules/probes/skeptic/SkGcdIdem.fss` in the parent of ab067d9b6.
- **Status:** a text repair, e.g. 'on the natural numbers'; no test (spec edits have none). Whether a worker should make it now is not said: "for example" suggests the wording is not decided, and NEGATIVE-VERIFIED plus `design limit` does not say build.
- **Could not resolve:**
  - Whether the repair is decided or only proposed ("for example"). Unclear wording.
  - "the five integer types": I read `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`; the skill lists these plus others, so the count is inferable but not stated. Minor.
  - "No program gates a passage of the specification": I read "no test can check this", consistent with `tests-writing.md`. Clear enough.

## Row 700

- **Defect:** `LinearCongruential[\N\]` in the library computes `(mult DOTTIMES widen(…)) DOTPLUS add`, which wraps at N's width, and only then reduces `MOD modulus`. For a modulus that does not divide 2^w the wrapped value differs from the true one modulo `modulus`, so `random` and `perturbed` give wrong numbers whenever a step overflows. The library builds it only with modulus 2^48, where it is right.
- **Where:** walk (the one library); `Library/Random.fss:226` (the object), `:239` (`random`), `:245` (`perturbed`), `:256-257` (the only instance), at de6d905f5.
- **Reproduce:** none run; found by reading (`explorations/reviews/wrap-dependent-code.md` section 11; FACTS entry "The specification's wrapping operators ∔, ∸ and ⨰ are declared in the interpreter's library ..."). A worker would instantiate it with a fixed-width N and a non-power-of-two modulus, and compare with an exact computation in `ZZ`.
- **Status:** a confirmed (by reading) library bug, so build a fix, but the row gives no fix and no reproducer; the worker must design both. No user is affected today (only 2^48 is used), which might also mean "leave it"; the row does not say.
- **Could not resolve:**
  - The fix: compute in a wider type (`ZZ`) before `MOD`, reduce each product, or use non-wrapping operators? Not given. Unclear (no target).
  - `N`: a type parameter (the integer type) or a size? "fixed-width N" and "N's width" suggest a type. Language concept (static parameter kinds) partly in the skill; readable.
  - `widen(…)`: what it widens to, and why the product still wraps after widening. Library name not in the skill.
  - Siblings 348 and 403: 403 is not described; the link to 348 (prelude has no `DOTTIMES`) suggests the compiled path cannot run this until the switch-over, but the row does not say.

## Row 792

- **Defect:** the integer chapter's listing declares `throws IntegerDivisionByZero` on ÷, `REM`, `MOD`, `DIVREM` and `DIVMOD`, an exception that neither library declares. The operators chapter (`Specification/basic/operators/opr-overview.tex:165`), the completion chapter (`Specification/basic/evaluation/completion.tex:31`) and both libraries (`Library/FortressLibrary.fsi:1138`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:747`) name `DivisionByZero`. The specification disagrees with itself.
- **Where:** specification: `Specification/basic-lib/basic-integers.tex:246-250`, `:460-464`, `:481`. No code path is wrong.
- **Reproduce:** read the cited lines; nothing to run.
- **Status:** wait: CONTESTED, the name is not settled (review-queue item 195). Default from `explorations/reviews/batch-20-review.md`: `DivisionByZero`, written in by the next change to `basic-integers.tex`. I read this as: do not edit for this row alone; a worker who edits `basic-integers.tex` for another reason writes `DivisionByZero` in.
- **Could not resolve:**
  - "Default ... written in by the next change": whether the default may be applied before item 195 is settled, i.e. whether the default is the interim rule or the expected outcome. Two readings; unclear wording.
  - "review-queue item 195": the review queue is not in the worker's skill; a worker cannot look it up or know its state. Concept not in the skill.
  - "the method entry of the integer power names it (P-153)": "method entry" unclear (a library declaration? a spec listing entry?). Unclear wording.
  - Specification cell writes `basic-lib/basic-integers.tex` without the `Specification/` prefix, unlike the other rows. Minor.
  - Class `library gap vs spec (specification)`: the defect is in the spec and the libraries agree with the rest of it, so "library gap" reads backwards. Unclear wording.
