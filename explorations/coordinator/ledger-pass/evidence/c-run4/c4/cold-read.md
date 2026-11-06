# Cold read: c-run4 / c4 (rows 330, 360, 361, 362, 443, 454, 529, 862)

Read with only `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md`, and greps of `references/records.md`, `library.md`, `compiler.md`, `tests-writing.md`, `interpreter.md`.

Terms common to all rows, read once here:

- `NEGATIVE-VERIFIED`: `records.md` lists it among the seven status words and says only that `FIXED`, `RETIRED` and `DUPLICATE` close a row; the definition is in the row template, which I may not read. I read it as "a gap, confirmed, open". Language-of-the-record concept I lack.
- `siblings: N`: not defined in the skill; I read it as "related rows to read with this one". Unclear wording, but the reading is safe.
- `full text: history, row N`: the earlier text in `explorations/fortress-gap-ledger-history.md` (`records.md`). Clear.
- `at c124c6b65`: the commit the file:line citations hold at. Clear.
- `in the parent of ab067d9b6`: the probe file exists in that commit's parent (so it was deleted by ab067d9b6); `git show ab067d9b6^:PATH`. Clear, though the skill does not say so.
- `P-68`, `P-76`: POSITIONS entries; a worker prints them with `facts-extract.sh 'P-68'`. Their content is not in the row, which matters where the row leans on them (below).

## Row 330

- **Defect:** On the float types, `⌊x⌋`, `⌈x⌉`, `round` and `truncate` should answer `ZZ` (decision P-68) but answer other types: the brackets answer `ZZ64` under walk and `RR64` compiled; `truncate` answers `ZZ64` on both paths; `round` answers `ZZ64`, except the one in walk's `trait RR64`, which answers `ZZ`. Named functions `floor` and `ceiling` answer `RR64` and are not part of the gap.
- **Where:** both paths. Walk: `Library/FortressLibrary.fsi:379-382`, `LibraryBuiltin/FortressBuiltin.fss:184-191` (`Float`), `Library/FortressLibrary.fss:498-502` (`trait RR64`). Compiled: `LibraryBuiltin/CompilerBuiltin.fsi:457-458`, `:470-471`.
- **Reproduce:** no reproducer. `library_tests/RR64FunctionsRungF.fss:75-94` passes on today's types; a worker writes a test that asserts the result type `ZZ` (e.g. a typed binding `n: ZZ = round(2.5)` or a dispatch test) and sees it fail.
- **Status:** open, decided (P-68): build the fix, presumably in the one library only (`compiler.md` forbids editing the prelude), with the compiled half closing at the switch-over. The row does not say this.
- **Could not resolve:**
  - "`round` a `ZZ64` except in walk's `trait RR64`": which `round` runs for an `RR64` value under walk, `Float`'s (`ZZ64`) or the trait's (`ZZ`)? The worker cannot tell what walk answers today. Unclear wording.
  - Whether the compiled half is to be fixed now or waits for the switch-over: not said. Unclear wording.
  - The NaN/±∞/saturation sentence: is it a defect too (what should `round(NaN)` be once it is `ZZ`?) or only a description? Read two ways.
  - The cited section, "Rational Numbers", for float functions: plausible but surprising. Minor.

## Row 360

- **Defect:** A radix-point numeral passed to `round`, `floor`, `ceiling` or `truncate` is first turned into its nearest double, so the result is that of the double, not of the exact rational the numeral denotes. `2.50000000000000001`, `2.49999999999999999` and `2.5` are one double; they should round to 3, 2, 2 (half-even for the exact 2.5).
- **Where:** both paths. Walk: `object FloatLiteral extends RR64` (`LibraryBuiltin/FortressBuiltin.fss:196`) declares none of the four, so `RR64`'s bodies run on `asFloat(self)` (`interpreter/evaluator/values/FFloatLiteral.java:39-40`). Compiled: `RR64`'s `coerce(x: FloatLiteral)` (`LibraryBuiltin/CompilerBuiltin.fss:932`).
- **Reproduce:** `ProjectFortress/tests/XXXRoundNearTieNumeral.fss` (an `XXX` expected failure, walk). `round(2.50000000000000001)` gives 2.
- **Status:** open: build a fix, on walk at least; the compiled half has no rational in its prelude, so it presumably waits for the switch-over. A negated or summed numeral is a `Float` already, so it is out of scope.
- **Could not resolve:**
  - "Fix: `compile-ladder/rung-round-half-even/REPORT.md`": a fix design to follow, or a fix that landed? The status says open, so I read a design. Read two ways; the path also lacks `explorations/`.
  - The claim says `floor(2.99999999999999999)` is `3.0`, "not ... 2": should it be `2.0` (an `RR64`) or `2` (a `ZZ`, with row 330)? Read two ways.
  - Whether the compiled half is in scope now: not said.

## Row 361

- **Defect:** Under walk, any floating-point use of a radix-point numeral with an explicit `_10` radix suffix throws `NumberFormatException` (`For input string: "2.5_10"`); the compiled path answers correctly (`round(2.5_10)` is 2).
- **Where:** walk only. `FFloatLiteral`'s constructor keeps the whole text when `denomBase == 10` (`interpreter/evaluator/values/FFloatLiteral.java:28`), and `getFloat`'s `Double.valueOf` rejects the suffix (`:40`). The parts are already available from `interpreter/evaluator/Evaluator.java:1632`.
- **Reproduce:** `ProjectFortress/tests/XXXRadixTenPointNumeral.fss` under walk; probe `explorations/compile-ladder/rung-round-half-even/probes/skeptic/Sk2RadixTen.fss` at `ab067d9b6^`.
- **Status:** open: build a fix in walk's `FFloatLiteral` (keep the text without the suffix, or build from the parts). Workaround: drop `_10`.
- **Could not resolve:**
  - "A fix of row 360 reads the same kept text": a warning that a fix of 360 inherits this bug (so fix 361 first), or that the two fixes should be made together? Read two ways; the order is not stated.

## Row 362

- **Defect:** The compiled path throws `NullPointerException` when it turns a radix-point numeral into text: `println(2.5)` and `"…" 2.5` fail; walk prints `2.5`. A numeral first bound to an `RR64` prints on both paths.
- **Where:** compiled run time: `compiler/runtimeValues/FFloatLiteral.java:52-54`, whose `asString()` is `return null; /* replaced in generated code */`; nothing replaces it, and the prelude's `trait FloatLiteral` declares no `asString`. The model to follow is `FIntLiteral.asString` (`compiler/runtimeValues/FIntLiteral.java:57-61`).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXNumeralPrintRungR.test`; compile and run `println(2.5)`.
- **Status:** open: build the fix in the Java runtime class (not in the prelude, per POSITIONS, "The library route"), copying `FIntLiteral`'s body. Workaround: bind to `RR64` first.
- **Could not resolve:**
  - "The compiled `Object.asString` default (row 321) does not reach it": does row 321 hold a fix that should have covered this, or is it a separate gap? Unclear without reading row 321; not blocking.
  - "it is the last null `asString` among the runtime values": "it" is the `FFloatLiteral` one, I take it. Clear enough.

## Row 443

- **Defect:** Under walk, an integer numeral outside `ZZ32`'s range does not convert to `RR64` at a typed binding: `s: RR64 = 3000000000` is refused (`RHS expression type Long is not assignable to LHS type RR64`); the specification makes it `3000000000.0`.
- **Where:** walk only. Walk gives large numerals a `Long` or big-integer value (`interpreter/evaluator/values/FIntLiteral.java:40-56`), and `RR64` coerces only from `ZZ32`, `RR32` and `IntLiteral` (`Library/FortressLibrary.fsi:302-304`). The fix goes in walk's conversion at a typed binding or parameter, which must know the argument came from a numeral.
- **Reproduce:** `ProjectFortress/tests/XXXNumeralFloatRungP.fss`; probe `explorations/compile-ladder/rung-spec-numbers/probes/skeptic/SkNumeralFloat.fss` at `ab067d9b6^`.
- **Status:** open: build the fix in walk, for numerals below 2^53; the question above 2^53 stays open and the test avoids it.
- **Could not resolve:**
  - "which no walk numeral is (P-76)": what P-76 decides (that walk numerals are not `IntLiteral` values? that they must become so?) is not in the row, and whether the fix should follow P-76 or work around it. A record decision I lack; the row should say its gist.
  - Whether the compiled path shows the defect: not said. The skill asks a row to name its paths; "(walk)" in the class suggests walk only, but the compiled answer is not given.
  - "Open:" whether a numeral above 2^53 converts: is this a question for the curator (wait) or a choice left to the worker? Read two ways.

## Row 454

- **Defect:** On the one library, walk refuses an integer numeral at a typed binding of `NN32` or `NN64` (`RHS expression type Int is not assignable to LHS type NN32`), and a radix-point numeral at a binding of `RR32` is refused on both paths.
- **Where:** walk's numeral is an `Int` (`interpreter/evaluator/values/FIntLiteral.java:40-56`), and neither `NN32` nor `NN64` declares a `coerce` from it; the one library's `FloatLiteral` is an object below `RR64` (`LibraryBuiltin/FortressBuiltin.fsi:44`), and `RR32` declares no `coerce` from it.
- **Reproduce:** no reproducer in the suites; probes `explorations/reviews/numerics-plan-coordinator/probes-B/BwB1NN32.fss`, `BwB2NN64.fss`, `BwB4RR32.fss` at `84aef6a4f^`. `tests-writing.md` repeats the rule for test writers.
- **Status:** the integer half waits on a question ("Q-walk", P-76); the `RR32` half looks buildable now (add a `coerce` from `FloatLiteral` to `RR32` in the one library). Workarounds: `unsigned(3)`, `narrow(1.5)`.
- **Could not resolve:**
  - "Q-walk": not in the skill. Is it a question to the curator, a planned walk change, or a name inside P-76? A record concept I lack.
  - "both paths refuse a radix-point numeral at one of `RR32`" against "The compiler prelude converts a radix-point numeral to `RR32` (`CompilerBuiltin.fss:993`)": these read as a contradiction unless "against the one library" means the compiled path run on the one library (which it cannot yet run, `SKILL.md`). Read two ways: is the compiled path's refusal today, or after the switch-over?
  - Whether the `RR32` half is to be built now or also waits: not said.

## Row 529

- **Defect:** On the compiled path, arithmetic on two `RR32` values answers `RR64`: `+`, `-`, `/`, `MIN`, `MAX`, `SQRT` and `^2`; walk on the one library answers `RR32`. Mixed `RR32`/`RR64` agree on both paths. Two side gaps: `MINMAX` on reals does not compile (declared only on integer types), and `e: RR32 = -0.0` is refused (the prelude's `FloatLiteral` has no prefix `-`).
- **Where:** compiled path, the prelude: `RR32` declares no arithmetic, order or `MIN`/`MAX` (`LibraryBuiltin/CompilerBuiltin.fss:992-994`), so each operand converts via `RR64`'s `coerce(x: RR32)` (`:933`); `CompilerBuiltin.fsi:479`.
- **Reproduce:** no reproducer; probes `explorations/compile-ladder/rung-rr32-sibling/probes/comp/RR32Comp.comp.txt` and `probes/skeptic/SkDiffC.comp.txt` at `ab067d9b6^`.
- **Status:** leave it: closes at the switch-over (the prelude must not be edited, `compiler.md`).
- **Could not resolve:**
  - "`a MINMAX f`": what is `f`? Presumably a second `RR32` (`b`), or a float of another type. Unclear wording.
  - "walk answers `(1.5, 3.0) : RR64`": walk's `MINMAX` gives an `RR64` pair for `RR32` inputs? Then walk does not answer `RR32` here, unlike the claim's other operators; is that a second gap on walk? Read two ways.
  - The two `.comp.txt` probes are captured outputs, not programs; how to rerun them is not said.
  - "Specification: silent" with class "library gap vs spec": what the gap is measured against (walk's library, the sibling rule?) is left implicit. Minor.

## Row 862

- **Defect:** On the compiled path, a radix-point numeral becomes its `RR64` by two or three roundings, not one, so some numerals land on the wrong double: `0.9999999999999999` gives `1.0` and `1.2246467991473532` gives `1.224646799147353`. Walk gives the nearest double.
- **Where:** compiled path, code generator: `CodeGen.forFloatLiteralExpr` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1997-2007`) emits `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` into `FFloatLiteral.make(double)`; `FFloatLiteral.make(String)` (`compiler/runtimeValues/FFloatLiteral.java:44-46`) rounds once and has no caller.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXFloatNumeralOneRounding.test`; compile and print `0.9999999999999999` (bound to `RR64`, per row 362).
- **Status:** open: build the fix in `CodeGen` (emit a one-rounding conversion, e.g. through `make(String)`). Workaround: integer part zero and at most 15 digits after the point.
- **Could not resolve:**
  - "and, by reading, uses the same sum for another radix": walk, for a radix other than ten, computes the same multi-rounding sum? Then the claim "walk gives each its nearest double" holds only for radix ten, and walk has the defect too for other radixes. Unclear wording; it decides whether the row is compiled-only.
  - Specification cell `basic/expressions/literals.tex` lacks the `Specification/` prefix the other rows use. Minor.
  - Whether a fix through `make(String)` must also handle the `_10` suffix (row 361's trap): not said.
