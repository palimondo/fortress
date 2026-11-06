# Check of c4 (run c-run4, base c124c6b65)

mech.md: 8 lines, 0 failing. All citations below were opened at c124c6b65 with `git show c124c6b65:PATH`.

## 325 (keep): pass
`Misc.scala:468-470` still assigns `Types.INT_LITERAL`; `CompilerBuiltin.fsi:390-396` is still `trait IntLiteral` with no static parameter. The two commits since (054c4bcfd, 27cb9e93b) add expected types; they do not give a numeral a new type.

## 330 (rewrite): fail
The citations hold: `FortressLibrary.fsi:379-382`, `FortressBuiltin.fss:184-191` (`Float`, with `round(self):ZZ64` at :192), `FortressLibrary.fss:498-502`, `CompilerBuiltin.fsi:457-458` and `:470-471`. The claim agrees with P-68's own sentence (POSITIONS.md:76). The NaN and saturation sentence holds by reading: `simpleDoubleArith.doubleRound`/`doubleTruncate` are `(long)` casts.
1. Reproducer. The passage "Reproducer: none ... No test reproduces it: `library_tests/RR64FunctionsRungF.fss:75-94` passes on today's types." gives no command and no output (check.md, "Reproducer"; writer.md:21). Correction: add a measurement question to questions.md. Under walk and compiled, for `x: RR64 = 2.5` and for the numeral `2.5`, print the `ilkName` of `|\x/|`, `|/x\|`, `round(x)` and `truncate(x)`. If the output matches the claim, the notes get the command and its output in place of that sentence. If it does not, the claim is corrected to match it.
2. Cold read: "`round` a `ZZ64` except in walk's `trait RR64`" does not tell a worker which values get which `round`. Source: `FortressBuiltin.fss:54` `value object Float extends RR64` declares `round(self):ZZ64` (:192). `object FloatLiteral extends RR64` (:196) declares none, so a radix-point numeral runs `trait RR64`'s `round(self): ZZ` (`FortressLibrary.fss:502`). Correction to the claim: "`round` a `ZZ64`, declared `ZZ` only in walk's `trait RR64`, whose body a radix-point numeral runs".
3. Cold read: the row does not say when the fix is built. P-68 (POSITIONS.md:76) says "one library rung after the switch-over". Correction: "Decision: P-68." becomes "Decision: P-68, built on the one library after the switch-over." If the notes then run over 700 characters, shorten the NaN sentence to "At NaN, ±∞ and past `2^63` both paths' `round` and `truncate` give `0` or saturate."

## 360 (rewrite): fail
The citations hold: `FortressBuiltin.fss:196`, the interpreter's `FFloatLiteral.java:39-40` and `CompilerBuiltin.fss:932`.
1. Fidelity and the cold read. The claim says "`floor(2.99999999999999999)` is `3.0`, not 3 and 2". By P-68 (POSITIONS.md:76), `floor` returns the float type, so the right answer is `2.0`, not `2`. The reproducer `tests/XXXRoundNearTieNumeral.fss` also asserts only `round`, never `floor`. Correction to the claim: "`round(2.50000000000000001)` is 2 and `round(3.49999999999999999)` is 4, not 3 and 3". The test asserts both (its lines asserting `round(2.50000000000000001), 3` and `round(3.49999999999999999), 3`).
2. Cold read: "Fix: `compile-ladder/rung-round-half-even/REPORT.md`" can be read as a landed fix, and the path lacks `explorations/`. Correction: "Fix design, not built: `explorations/compile-ladder/rung-round-half-even/REPORT.md`." The file exists at the base. This also restores the dropped token. The other dropped token, "row 325", has its home in row 325 and the history.

## 361 (rewrite): pass
`FFloatLiteral.java:28` (`if (denomBase == 10) value = s;`), `:40` (`return Double.valueOf(value);`) and `Evaluator.java:1632` hold. The test asserts `round(2.5_10)` = 2. The probe `Sk2RadixTen.fss` is at `ab067d9b6^`. The dropped tokens are re-pointed paths.

## 362 (rewrite): pass
The compiled `FFloatLiteral.java:52-54` is `return null;` and `FIntLiteral.java:57-61` returns `FJavaString.make(this.toString())`. A grep of `runtimeValues` finds no other null `asString`, so "the last null `asString`" holds. The prelude's `trait FloatLiteral` (`CompilerBuiltin.fsi:479-482`) declares no `asString`. The tokens `return null` and the `FJavaString.make` text are kept in the new line.

## 443 (rewrite): pass
`FortressLibrary.fsi:302-304` reads `coerce(x: ZZ32)`, `coerce(x: RR32)` and `coerce(x: IntLiteral)`. `FIntLiteral.make` (:40-56) gives `Int`, `Long` or `BigNum`. P-76 (POSITIONS.md:84) states that no numeral reaches `IntLiteral` under walk. The test asserts the binding.

## 454 (rewrite): fail
The citations hold. The probe `BwB4RR32.walk.txt` (at `84aef6a4f^`) shows walk's `RHS expression type FloatLiteral is not assignable to LHS type RR32`. `BBindCk.check.txt` beside it shows the compiled checker on the one library refusing `a: RR32 = 1.5` ("Right-hand side has type FloatLiteral, but declared type is RR32.").
1. Cold read: the claim "both paths refuse a radix-point numeral at one of `RR32`" reads as contradicting the notes' "The compiler prelude converts a radix-point numeral to `RR32` (`LibraryBuiltin/CompilerBuiltin.fss:993`)". Corrections:
   - In the claim, "and both paths refuse" becomes "and walk and the compiled checker refuse".
   - In the notes, that sentence becomes "Today's compiled runs, on the prelude, convert it (`LibraryBuiltin/CompilerBuiltin.fss:993`)."
   - Name `BBindCk` beside the probes. If the row runs over its length, drop "with BwB2NN64 and BwB4RR32 beside it" and list the folder once.
2. Cold read: "waits for Q-walk (P-76)". The term "Q-walk" is defined nowhere a worker reads. Correction: "The integer half waits for walk to have the checker's static types (P-76)." These are P-76's words, POSITIONS.md:84.

The dropped `compiler_tests/NativeHelperFamilyRR32Compiled.fss` has its home in the history, and `narrow` is kept in the workaround (`FortressLibrary.fsi:389` `narrow(self): RR32`).

## 528 (keep): pass
`CompilerBuiltin.fss:992-994` still declares only `coerce(x: FloatLiteral)`, and `XXXRR32EqualityRungV.fss:7-9` is unchanged. 031c38bbc, the one commit since, touches the export check, not these lines. The row is NEGATIVE-VERIFIED beside `silent`, so it keeps its status (item 265). Note for the judge, not a failure: its "Repair: ..., measured and not landed" is the phrasing the writer rewrote in 360.

## 529 (rewrite): fail
The citations hold: `CompilerBuiltin.fss:992-994`, `:933` and `CompilerBuiltin.fsi:479`. The probes are at `ab067d9b6^`. `RR32Comp.comp.txt` shows `a + b is RR64`, `a / b is RR64` and `a MIN b is RR64`.
1. Cold read: in "`a MINMAX f`", the name `f` is defined nowhere in the row. The cold reader could not tell whether walk's `(1.5, 3.0) : RR64` is a second walk gap. In the probe, `f` is an `RR64`: `RR32Comp.comp.txt` "a + f is RR64 4.5", and `XXXRR32EqualityRungV.fss:9` `f: RR64`. So walk's `RR64` pair is the mixed case that "agree" covers. Correction: "`a MINMAX f`, `f` an `RR64`, does not compile".

## 578 (keep): pass
`IntLiteral.java:34-37` still returns `FIntLiteral.ZERO`. 5ad4a9957, the commit since, changes `IntLiteral.Pow` to `FIntLiteral.make(BigNum.pow(u, v))`, which still normalises to `Int`, so `x^x` still answers `ZZ32`. The row is NEGATIVE-VERIFIED beside `silent` and keeps its status.

## 795 (keep): pass
`FortressLibrary.fss:649-657` holds. The commits since touch other parts of the file. The row agrees with P-54 (POSITIONS.md:51).

## 862 (rewrite): fail
`CodeGen.java:1997-2007` emits the sum into `make(double)`. In the compiled `FFloatLiteral.java`, `make(String)` is at :44-46, and a grep finds no caller. The interpreter's `FFloatLiteral.java:26-41` holds.
1. Cold read: "and, by reading, uses the same sum for another radix" leaves open whether walk shares the defect. It does, by reading: the interpreter's `FFloatLiteral.java:30-31` computes `intPart.doubleValue() + (numerator.doubleValue() / Math.pow(denomBase, denomPower))` when `denomBase != 10`. Correction: "and, by reading, computes the same sum for a radix other than ten (`:30-31`), so walk shares the defect there".
2. Form: the Specification cell is `basic/expressions/literals.tex`, where the sibling rows write `Specification/basic/expressions/literals.tex`. Correction: add the prefix.

## Closes, duplicates, questions, pairs
None proposed. The writer's reasons hold: 360, 361 and 862 are three mechanisms, and 454 is apart from 486. The one question owed is the measurement under 330.1.
