# Cold read: p-run1/p1 (rows 349, 381, 383, 441, 502, 523, 524, 525, 581, 856)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and look-ups in its `references/` (records.md, compiler.md, library.md, interpreter.md, tests-writing.md, gate.md). One gap common to every row: the skill names the seven status words (`records.md`, "The gap ledger") but says "the row template (below) defines each", and the template lives in the ledger, which a cold reader may not open. So `NEGATIVE-VERIFIED` is read here only as "a gap, confirmed, not closed"; what it asks a worker to do comes from the notes alone. `P-NN` numbers are POSITIONS decisions (`records.md`); their content is known only as far as each row restates it. "full text: history, row N" is read as a pointer to `explorations/fortress-gap-ledger-history.md`. "siblings: N" is read as "related rows"; the skill does not define it.

## Row 349

- **Defect:** On the compiled path, the compiler's prelude lacks integer conversions that walk's library has: `ZZ64` has no `widen`, and `ZZ` has neither `widen` nor `narrow`. A compiled program that calls `widen` on a `ZZ64`, or `narrow` on a `ZZ`, is refused with "Could not check call to function widen", where walk runs it. `narrow` of a `ZZ32` does compile: the `ZZ32` is coerced to `ZZ64`, whose `narrow` runs, and both paths answer 43.
- **Where:** Compiled path, the library. The prelude's `trait ZZ` (`CompilerBuiltin.fsi:103-145`) and `trait ZZ64` (`:147-208`), against walk's `Library/FortressLibrary.fsi:646`, `:698-699`. The coercion is at `CompilerBuiltin.fss:580`.
- **Reproduce:** Run `ProjectFortress/compiler_tests/XXXZZNarrowRungP.test` through the harness, or compile a program that calls `widen(z)` with `z: ZZ64`.
- **Status:** Leave it. Do not add the declarations to the prelude (compiler.md: the prelude is deleted at the switch-over). The `narrow` half closes by P-161, which deletes `ZZ`'s `narrow`/`widen` and moves the test onto `.asZZ32`. The `widen` half closes at the switch-over, together with row 442.
- **Could not resolve:**
  - "gives 43": the claim does not give the input, so a worker cannot tell what 43 is the narrowing of. Unclear wording.
  - "with row 442": row 442 is not in this file. I cannot tell whether it is the same gap on another type or a precondition. Unclear wording: a reference that does not stand on its own.
  - Whether P-161 has already been carried out ("deletes" reads as either done or decided). If it is done, the `narrow` half no longer holds and the claim is out of date. It reads two ways: unclear wording.
  - siblings 502, 859, but row 502 names 349 and 858. I cannot tell whether 859 against 858 is a typo or two different rows. Unclear wording.

## Row 381

- **Defect:** The paths choose different shift methods when a `ZZ32` is shifted by a `ZZ64` count. `3 LSHIFT c`, with `c` a `ZZ64` of 33, gives `0` under walk, since walk's `ZZ32` `LSHIFT` takes any count and shifts at width 32. Compiled, it gives `25769803776` (3·2^33): no `ZZ32` overload fits, so the receiver is coerced to `ZZ64` and `ZZ64`'s shift runs. Compiled, a `ZZ`, `NN32` or `NN64` count is refused ("Could not check call to operator LSHIFT").
- **Where:** Both paths, the library. Prelude `CompilerBuiltin.fss:647-648` (`ZZ64`), `:736-737` (`ZZ32`), coercion `:580`. Walk's `Library/FortressLibrary.fss:796`.
- **Reproduce:** There is no reproducer. Write a program that shifts a `ZZ32` by `ZZ64` 33 and run it on both paths, or recover the probes `SkCountType` and `SkShiftCountZZK` with `git show ab067d9b6^:explorations/compile-ladder/rung-shift-count/probes/...` (the skill's library.md uses the same "parent of" form).
- **Status:** Leave it until the switch-over (P-69, P-38). Workaround: use a count of the receiver's own type.
- **Could not resolve:**
  - Which answer is correct. The class says "library gap vs spec", but the row does not say what the specification answers for a `ZZ32` shifted by 33 with a wider count (0, the `ZZ64` value, or a refusal). Unclear wording: the specification's word is missing.
  - "(its `skeptic` folder)": I cannot tell whether only `SkShiftCountZZK` is in a `skeptic/` subfolder, or both are. So the exact path to pass to `git show` is unclear. Unclear wording.
  - "climb batches", "rung I/K", "skeptic": provenance words that the skill uses but does not define (gate.md names `climb-batch-` folders). They do not block the work. A concept I lack, harmless here.

## Row 383

- **Defect:** The specification's `shift(self, k: IndexInt): ZZ` exists only under walk. Compiled, `shift(3, 33)` fails with "Variable shift is not defined.". Also, a compiled program may use `shift` as a local or parameter name, which walk refuses, because a functional method's name is reserved where it is imported (SKILL.md, "Functional methods").
- **Where:** Compiled path, the prelude (it has no `shift`). Walk's `Library/FortressLibrary.fsi:700` declares it with `k: AnyIntegral`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXShiftDeclRungI.test`. The probes `SkShiftCall`, `SkShiftLocal` and `SkShiftParam` are under `ab067d9b6^:explorations/compile-ladder/rung-int-semantics-walk/probes/skeptic/`.
- **Status:** Leave it. It closes at the switch-over without adding a prelude declaration (P-69). Then promote `XXXShiftDeclRungI`; `shift` becomes a reserved name (P-38). Compiled workaround: `ZZ`'s `<<<` (`CompilerBuiltin.fss:551`).
- **Could not resolve:**
  - `IndexInt` in the claim against `AnyIntegral` in walk's declaration. The skill does not define `IndexInt`, so I cannot tell whether walk's wider parameter type is itself a difference from the specification. A language concept I lack.
  - "`shift` is a reserved name (P-38)": I cannot tell whether that is a new rule from P-38 or the general functional-method rule. It reads two ways: unclear wording.

## Row 441

- **Defect:** Compiled, the `ZZ32` `^` breaks the integer power's contract at negative exponents. `2^(-1)` gives `0` where `IntegerOverflow` is due. `0^(-1)` throws a raw `java.lang.RuntimeException` that no Fortress `catch` sees, where `DivisionByZero` is due. The bases 1 and -1 answer correctly.
- **Where:** Compiled path, the run time: `^` binds to `jIntExp` (`CompilerBuiltin.fss:744`), that is `simpleIntArith.intExp` (`nativeHelpers/simpleIntArith.java:415-421`), which casts `Math.pow` to `int`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled.test`. Walk's correct behaviour is in `IntegerPowerContractWalk`.
- **Status:** Unclear. No "closes at" is given, unlike sibling rows 523-525. compiler.md says to fix a helper's Java, not the prelude's text, when the one library binds that helper. The row does not say whether the one library binds `intExp`. So a worker cannot tell whether to build a fix in `simpleIntArith.java` now or to wait for the switch-over. The note on `intToIntPower` warns that this helper is no drop-in replacement. Workaround: a float base, `2.0^(-1)`.
- **Could not resolve:**
  - "where it throws `IntegerOverflow`" / "where it throws `DivisionByZero`": "it" reads as walk or as the contract. Taken with "Walk follows P-153", it probably means "the contract, and walk, throw". Unclear wording.
  - Why `2^(-1)` should be `IntegerOverflow` rather than 0 or `DivisionByZero`. That is P-153's contract, which the row names but does not state. A worker writing the fix needs it. Unclear wording (missing content).
  - Whether to fix now or wait (above). Unclear wording.

## Row 502

- **Defect:** Under walk, `widen` of a `ZZ` that does not fit in `ZZ64` silently keeps the low 64 bits, with no `IntegerOverflow`: `widen(2^64+5)` is `5`, and `widen(-(2^63)-1)` is `9223372036854775807`.
- **Where:** Walk, the library and its glue: `ZZ`'s `widen` (`Library/FortressLibrary.fsi:699`) is the glue `BigNum$ToZZ64`, `x.longValue()` (`interpreter/glue/prim/BigNum.java:292-296`). The compiled prelude has no `widen` on `ZZ` (row 349).
- **Reproduce:** There is no reproducer. Under walk, print `widen(2^64+5)`, or recover the probe `ab067d9b6^:explorations/compile-ladder/rung-spec-integer-rules/probes/skeptic/SkZZWiden.fss`. The values are in `explorations/reviews/integer-conversions-evidence.md`, "1.1 The one library, by owner type".
- **Status:** Do not fix `widen`. P-161 deletes `ZZ`'s `narrow` and `widen` and moves their callers onto the checked `.asZZ32`/`.asZZ64`, which raise `IntegerOverflow`. That work closes this row. Build it only as part of P-161.
- **Could not resolve:**
  - "widen" on a type that is wider than its result: `widen` here narrows `ZZ` into `ZZ64`. The name reads two ways, and the skill says nothing on the naming. A concept I lack, with confusing wording, though the claim's numbers settle what happens.
  - Specification "silent" but class "implementation gap (walk)": the row does not say what makes silent truncation a gap if the specification does not ask for a check. Probably the general rule "Overflow raises `IntegerOverflow`" (SKILL.md), but the row does not cite it. Unclear wording.
  - sibling 858 is not in this file. Harmless.

## Row 523

- **Defect:** Compiled, the `ZZ32` `^` does not check overflow. `2^31` throws a raw `RuntimeException` that no Fortress `catch` sees. `(-3)^21` and `(-2)^33` saturate to `-2147483648`. Each should raise `IntegerOverflow`, as walk does.
- **Where:** Compiled path, the run time: `jIntExp` (`CompilerBuiltin.fss:744`) → `simpleIntArith.intExp` (`simpleIntArith.java:415-421`).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXPowZZ32CompiledRungE.test`. Walk's behaviour is in `PowChooseLcmRungE`.
- **Status:** Leave it. It closes at the switch-over (P-38). `intToIntPower` (`:395-413`) checks overflow but breaks row 441's contract, so do not just rebind `^` to it.
- **Could not resolve:**
  - Same tension as row 441. This row says "closes at the switch-over", but compiler.md says to fix a helper's Java when the one library binds it. The row does not say whether the one library binds `intExp`. If it does not, waiting is right; if it does, a fix is due now. Unclear wording.
  - "unbound": read as "named by no `builtinPrimitive`". It fits interpreter.md's terms but is not defined there. Harmless.

## Row 524

- **Defect:** Compiled, the `NN32` `^` gives 2147483647 for every true result in [2^31, 2^32). `2^31`, `65535^2` and `(2^31)^1` give 2147483647, where walk gives 2147483648, 4294836225 and 2147483648. Results above 2^32-1 raise `IntegerOverflow` on both paths. The value itself is wrong, not just how it prints.
- **Where:** Compiled path, the run time: `simpleUnsignedIntArith.unsignedIntExp` (`simpleUnsignedIntArith.java:229-235`) computes in `double` and casts to `int`. It is bound at `CompilerBuiltin.fss:809`, imported at `:118`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXPowNN32CompiledRungE.test`. Under walk, write the operands with `unsigned(...)` (tests-writing.md: a numeral does not bind to `NN32` under walk).
- **Status:** Leave it until the switch-over (P-38). The note describes the fix the switch-over needs: compute in unsigned 64 bits and check before narrowing, as the compiled `NN32` multiply does.
- **Could not resolve:**
  - "Closes at the switch-over (P-38); the power it needs computes ...": it reads as either "the switch-over brings this power" or "someone must still write this power before or at the switch-over". So I cannot tell whether a worker should build the helper. Unclear wording.
  - "(row 326)": a rendering defect, not in this file. Harmless.
  - "(2^31)^1" on `NN32`: the row does not say how the operand `2^31` is formed as an `NN32` without itself hitting the saturation. Unclear wording, minor.

## Row 525

- **Defect:** Compiled, the `NN64` `^` adds instead of raising to a power: `3^2` is 5 and `2^63` is 65, where walk gives 9 and 9223372036854775808. The helper is a stub marked "NIY" that does `return a + b;`.
- **Where:** Compiled path, the run time: `simpleUnsignedLongArith.unsignedLongExp` (`simpleUnsignedLongArith.java:240-243`), bound at `CompilerBuiltin.fss:878`, imported at `:156`. Walk uses `UnsignedLong.powExact` (`interpreter/glue/prim/UnsignedLong.java:327`).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXPowNN64CompiledRungE.test`.
- **Status:** Leave it until the switch-over (P-38). The needed power is unsigned and checked, like walk's `powExact`.
- **Could not resolve:**
  - Same reading as row 524: I cannot tell whether "the power it needs" is work for a worker or comes with the switch-over. Walk's version is glue (`interpreter/glue/prim/`), which only walk runs (library.md), so the switch-over cannot simply reuse it. That points to the helper still having to be written, but the row does not say so. Unclear wording.

## Row 581

- **Defect:** When the compiled checker checks a program against the one library, it refuses `(3).minimum` and `(3).maximum` with "IntLiteral has no getter called minimum". These are `ZZ32`'s getters (`Library/FortressLibrary.fsi:542-543`). A numeral used to reach them as a `ZZ32` before rung Q. Now its type is `IntLiteral`, and neither library's `IntLiteral` declares them.
- **Where:** Compiled checker, over the one library. `IntLiteral` in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:179` (one library) and `CompilerBuiltin.fsi:390-431` (prelude).
- **Reproduce:** There is no reproducer and the probe `SkqR2f` was never committed. A worker would have to write a program using `(3).minimum` and run the checker over the one library. The skill does not say how to do that for a single program; I take it to be the count stage (compiler.md) or `fortress compile` after the switch-over. The only record of the run is `explorations/compile-ladder/rung-numeral-library/SKEPTIC.md:100`.
- **Status:** Wait on a question: does a numeral have range bounds at all? The row leans "no", since its type is unbounded. With the status `NEGATIVE-VERIFIED` and an open question, I would expect `CONTESTED` instead (records.md lists it). So the status itself confuses.
- **Could not resolve:**
  - "under the compiled checker over the one library": I cannot tell which command does this for a user program before the switch-over. Unclear wording; a concept I could not find in the skill.
  - "which a numeral reached as a `ZZ32` before rung Q": "rung Q" is an event in the project's history (a change), which the row does not explain. It reads as "rung Q changed numerals to `IntLiteral`". A concept I lack.
  - "rung Q's check of `base` (0 errors) against `edit3` (2 errors)": I cannot tell what `base` and `edit3` are (trees? library versions?) or which 2 errors. Unclear wording.
  - Class "library gap vs spec" with Specification "silent": these contradict each other. Unclear wording.
  - Status word against open question (above). Unclear wording.

## Row 856

- **Defect:** Under walk, and compiled too, `signed` of an `NN32` or `NN64` above its signed half wraps to a negative value, with no `IntegerOverflow`: `signed(unsigned(-1))` is `-1` on both widths, and `signed` of `NN32` 2^31 is `-2147483648`.
- **Where:** Both paths. The bindings are `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:469` and `Library/FortressLibrary.fss:985` (walk), and `CompilerBuiltin.fss:816`, `:880` (compiled). They name `simpleUnsignedIntArith.java:242` and `simpleUnsignedLongArith.java:246`, which return the bits as they are.
- **Reproduce:** `ProjectFortress/tests/SignedAboveSignedRangeWalk.fss`, a plain test (no `XXX`), so it asserts the wrapping as correct. A compiled probe printed '-1', '-2147483648', '-1'.
- **Status:** Leave `signed` as it is. P-161 keeps the low bits in `signed`, as the test asserts, and makes `asZZ32`/`asZZ64` the checked forms. The open work, if any, is building those checked forms under P-161.
- **Could not resolve:**
  - Whether this is a gap at all. P-161 makes the wrapping the intended behaviour and a plain test asserts it. Yet the row is `NEGATIVE-VERIFIED` with class "implementation gap (walk)". It reads either as "a gap that P-161 accepted" (so it should be closed: `RETIRED`?) or as "a gap until the checked forms exist". Unclear wording.
  - Class "(walk)", but the notes show the compiled path wraps too. Unclear wording.
  - The row has no "full text: history" pointer, unlike the others. I cannot tell whether that means it has no earlier text. Harmless.
  - sibling 858 is not in this file. Harmless.
