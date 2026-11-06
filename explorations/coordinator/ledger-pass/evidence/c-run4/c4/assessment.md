# Assessment, chunk c4 (run c-run4, base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency (pass/fail).

## 325: keep
- scope pass; present meaning pass: `Misc.scala:468-470` still gives `Types.INT_LITERAL` (the file changed below the pin by 054c4bcfd and 27cb9e93b, which add expected types, not a numeral type); `CompilerBuiltin.fsi:390-396` unchanged, `IntLiteral` has no static parameter.
- evidence pass: `XXXNumeralBeyondZZ32Range.test` is an `XXX` compiled test while the spec settles it. comprehension pass; ownership pass; consistency pass (FACTS.md:54 and :196 agree).
- Disposition: keep. Read beyond evidence: none.

## 330: rewrite
- present meaning FAIL: the claim "the float types' `floor` and `ceiling` return a float where the specification returns an integer" states as a gap what P-68 decided to keep (POSITIONS.md:76: "`floor` and `ceiling` return the same float type"). The gap now is the brackets, `round` and `truncate` not returning `ZZ`.
- evidence FAIL: the reproducer `RR64FunctionsRungF.fss:75-82` is a plain test that passes and asserts today's values (`floor(twoHalf) = rt(2.0)`), so it does not reproduce the gap. Set to `none`, with the reason in the notes; the cited declarations are the evidence.
- consistency FAIL against P-68 (the claim); P-68's own sentence ("today `truncate` is `ZZ64` on both paths, the brackets are `ZZ64` under walk and `RR64` compiled, and `round` is `ZZ64`, but `ZZ` in ... `trait RR64`") is what the new claim states.
- notes: pins moved; re-pointed at c124c6b65 (`FortressLibrary.fsi:379-382`, `FortressBuiltin.fss:184-191`, `FortressLibrary.fss:498-502`, `CompilerBuiltin.fsi:457-458`, `:470-471`, the latter now also citing `round`/`truncate`). Added `siblings: 795` (P-54 ties QQ to this ruling).
- Read beyond evidence: POSITIONS.md:76, `RR64FunctionsRungF.fss:60-94`, `FortressBuiltin.fss:180-193`, `CompilerBuiltin.fsi:450-472`, `FortressLibrary.fsi:376-386, 439` (439 is QQ's `round`, not RR64's).
- Dropped: "P-68's rung makes the brackets, `round` and `truncate` `ZZ`" (a plan; home: P-68 itself). `floor`/`ceiling` at `RR64` kept as one sentence.

## 360: rewrite
- present meaning pass (gated `XXXRoundNearTieNumeral.fss`, newest gate holds). evidence pass.
- comprehension FAIL: pin `FortressBuiltin.fss:194` now reads `end`; `object FloatLiteral extends RR64` is at :196. `FFloatLiteral.java` was ambiguous (two classes); now the interpreter's path with `:39-40`.
- ownership/form FAIL: "Repair, a fork:" phrasing, and "Related: rows 325, 330, 361" not as `siblings:` first. Now `siblings: 330, 361, 862` (862 names 360 as its sibling); the fix design keeps its pointer (`compile-ladder/rung-round-half-even/REPORT.md`).
- Dropped: "Related: row 325" (325 is the integer-numeral range gap, a related but distinct row; home: row 325 and the history).
- Read beyond evidence: `FortressBuiltin.fss:194-203`, `FFloatLiteral.java:20-45`.

## 361: rewrite
- present meaning pass (gated `XXXRadixTenPointNumeral.fss`). evidence pass.
- comprehension FAIL: `Evaluator.java:1503` now reads `types.add(...)`; the `new FFloatLiteral(x.getText(), x.getIntPart(), ...)` call is at :1632.
- ownership FAIL: "Row 360's repair (a) reads the same kept text" is a repair-design reference; now "A fix of row 360 reads the same kept text".
- Added: `siblings: 360, 862`, workaround (write the numeral without `_10`, which is radix ten by default and runs as row 360 says). Probe kept as an old path in the parent of ab067d9b6.
- Read beyond evidence: `Evaluator.java` grep, `FFloatLiteral.java:20-45`.

## 362: rewrite
- present meaning pass: `compiler/runtimeValues/FFloatLiteral.java:52-54` still `return null`. evidence pass (`XXXNumeralPrintRungR.test`).
- comprehension FAIL: `FIntLiteral.java` ambiguous; now `compiler/runtimeValues/FIntLiteral.java:57-61` (checked: it returns `FJavaString.make(this.toString())`, the null commented out).
- ownership FAIL: "Rung S's compiled `Object.asString` default (row 321)" names a rung; now "The compiled `Object.asString` default (row 321)".
- Added `siblings: 321, 862` and the workaround the claim implies (a typed `RR64` binding prints on both paths).

## 443: rewrite
- present meaning pass (gated `XXXNumeralFloatRungP.fss`). evidence pass.
- comprehension FAIL: `FortressLibrary.fsi:297-299` is now a blank line and `trait RR64`'s header; its coercions are at :302-304, and now include `coerce(x: IntLiteral)`, so "`RR64` coerces from no wider integer type" is restated as "coerces only from `ZZ32`, `RR32` and `IntLiteral`, which no walk numeral is (P-76)".
- Dropped: "(not measured)" after the fix site (the fix site is a design note; home: history).
- consistency pass: FACTS.md:54 and POSITIONS.md:84 (P-76) agree.

## 454: rewrite
- present meaning pass. evidence FAIL: reproducer `none`, and the latest write dropped the probes' old paths (the template asks for the command and output or the probe's old path); restored from the earlier line (`BwB1NN32.fss` by full path, with BwB2NN64 and BwB4RR32 named beside it, in the parent of 84aef6a4f; mech.py refuses the bare file names as citations).
- comprehension: short path `interpreter/evaluator/values/FIntLiteral.java` and `LibraryBuiltin/CompilerBuiltin.fss:993` kept as resolvable suffixes.
- Changed: "Walk's integer half waits for Q-walk (POSITIONS, the numeral switch)" → "(P-76)", the entry that lists row 454 (POSITIONS.md:84). Workaround now also `narrow(1.5)` for `RR32` (the old line said a one-library program "needs `narrow`").
- Dropped: the name `compiler_tests/NativeHelperFamilyRR32Compiled.fss` as the test that would need `narrow` at the switch-over (home: the history, row 454's current line; a worker moving that test meets it at the switch-over).

## 528: keep
- scope pass; present meaning pass: `CompilerBuiltin.fss:992-994` still declares only `coerce(x: FloatLiteral)`; evidence pass (`XXXRR32EqualityRungV.test`); comprehension pass; ownership: "measured and not landed" is a status of the fix design, not a batch story; pass. consistency pass (FACTS.md:195).
- silent: NEGATIVE-VERIFIED beside `silent`, kept; `silent.txt` says defect.

## 529: rewrite
- present meaning pass (cited lines unchanged). evidence FAIL: reproducer `none`, and the note on `-0.0` displaced the probes' old paths; restored (`compile-ladder/rung-rr32-sibling/probes/comp/RR32Comp.comp.txt`, `probes/skeptic/SkDiffC.comp.txt`, parent of ab067d9b6).
- comprehension: pin "At 052a7c3fe" re-pinned at c124c6b65 (unchanged lines). Form: "Full text" → "full text".
- Dropped for length: the checker's message text 'Right-hand side has type RR64, but declared type is RR32.' (home: history, row 529's current line); "on both paths" after "Mixed `RR32` and `RR64` agree" (implied by the claim's comparison).
- silent: kept NEGATIVE-VERIFIED; `silent.txt` says defect.

## 578: keep
- present meaning pass: `IntLiteral.java:34-37` still returns `FIntLiteral.ZERO`, `FIntLiteral.make` unchanged (:40-56). evidence pass: the spec cell is `silent`, so a plain test pinning today's `0 : ZZ32` is allowed, and the notes say it pins it. ownership pass; consistency pass (FACTS.md:30, :81, :218).
- silent: `silent.txt` says defect.

## 795: keep
- present meaning pass: `FortressLibrary.fss:649-657` holds at the base; `NumberOrderListDeclarations.fss:22-31` still pins the six raises (read). Class `deliberate (library)`: the reproducer pins the decided present behaviour; the row records the unbuilt part of P-54. consistency pass (POSITIONS.md:51).

## 862: rewrite
- present meaning pass (`XXXFloatNumeralOneRounding.test`). comprehension FAIL: `CodeGen.java:1994-2004 at b0f6cd6b7` shifted +3; now `:1997-2007` at c124c6b65 (read: same sum, `visitLdcInsn(val)` into `make(double)`). Nothing dropped.

## Pairs, duplicates, closes
- No duplicates: 360/361/862 are three mechanisms (walk's double, walk's `_10` text, compiled's sum); named as siblings.
- No pairs across chunks: 454 vs 486 (a `nat` parameter as a value, another mechanism); 362 vs 321 (toString recursion).
- No closes, no measurements.
