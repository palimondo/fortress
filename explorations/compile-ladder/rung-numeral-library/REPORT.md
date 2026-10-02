# Rung Q (climb batch 8): the numeral's own type in the one library; NN32 into RR64 held

*The gather of climb batch 8 corrected the provisional row numbers to the final ones: 559 is row 575, 560 row 576, 562 row 577, 563 row 578 and 564 row 579; the first pass's provisional 561 was never opened, and the final row 561 is another rung's. The second skeptic's two refusals are rows 580 and 581.*

problem: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:169` on the base (`object IntLiteral extends { ZZ32 }`, its arithmetic withheld at `:177-198`), with row 517's reproduction `ProjectFortress/tests/XXXIntegerMaxNumRungM.fss:20` on the base
spec: `Specification/basic/expressions/literals.tex:132-148`; `Specification/basic/conversions-coercions.tex:405-410`, `:473-575`; `Specification/basic-lib/basic-integers.tex:625-645`
precedent: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390-431` with its `coerce(x: IntLiteral)` lines `:104`, `:148`, `:211`, `:274`, `:333` and its `even` and `odd` at `:429-430`; `Library/FortressLibrary.fsi:574-579` on the base (ZZ64's own comparisons); `Library/FortressLibrary.fss:712-715` on the base (rung M's per-type MIN, MAX, MINMAX); `Library/FortressLibrary.fss:671-673` (Integral's `floor`, `ceiling`, `truncate` bodies) and `:711-712` (ZZ32's `zero` and `one`)
deviation: IntLiteral stays an `object` (the team's native constructor, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java:34-37`) where the compiler library declares a trait; QQ, RR64 and AnyIntegral also coerce from it; it declares `zero`, `one`, `TIMES`, `^(self, b: IntLiteral)`, `DIVIDES`, `floor`, `ceiling` and `truncate` beyond the model's `even` and `odd` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:179-180`, `:199`, `:213-219`); each integer type adds `^(self, b: IntLiteral)` and NN32, NN64 and ZZ's api state their comparisons, and ZZ's api its arithmetic (`Library/FortressLibrary.fsi:657-666`), beyond the record's ZZ32 (section 6); `unsigned` moved by two api lines, Integral's removed (base `Library/FortressLibrary.fsi:466`) and ZZ64's stated (`Library/FortressLibrary.fsi:635`) (section 7); `Library/ReflectiveQuickCheck.fss:147`, a file outside the record's list (section 7); NN32 into RR64 (R9) is not built (section 8)
historical: Library/FortressLibrary.fsi, Library/FortressLibrary.fss, Library/ReflectiveQuickCheck.fss, ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi, ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java, Specification/basic/expressions/literals.tex, Specification/basic/conversions-coercions.tex, Specification/appendices/changes.tex

## 0. What was inherited

The first pass: the worktree was made fresh at `493b4076f`, and every result of sections 1 to 16 not marked as the repair round's was measured then. The harness refused its Write of this file ("Subagents should return findings as text, not write report files"); its text was taken from the worker's structured result into scratch, and this text is that one corrected. The harness refused the repair round's Write of this file too; `record.md` was written and committed (`32ba2ab5e`).

The repair round (after the skeptic's refusal, `SKEPTIC.md` beside this file, and the judge's ruling, `JUDGE.md`): the branch held the first pass's commits through `9d75bb063`, the skeptic's `3ab32e5a9` and the judge's `ffe0a21a3`, and the build of the skeptic's `ant compileAll` on `9d75bb063`; no Java or Scala file changed after it, so the repair round ran no `ant compileAll`. It re-ran the skeptic's `SkqCk2` and `SkqCk3` over the `base` and `edit2` library copies (the same tallies as `SKEPTIC.md`: 10 and 4, 2 and 7), took the first pass's count, distance and edit pass on `608c4e91f` as the intermediate state, and measured the rest anew. Its commits: `79910dcdf` (the two new tests alone), `1887abecb` (`IntLiteral`'s own declarations, `ZZ`'s api, the new members' assertions), `f447a4be4` (the pin messages and the Appendix I entry's Effect), `32ba2ab5e` (`record.md`).

## 1. Where the fix belongs

The record names the files (section 3, "Files it may touch") and section 4 the declarations: the number types of `Library/FortressLibrary.fsi`/`.fss`, `IntLiteral` and `NN32` in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`/`.fss`, and the glue `interpreter/glue/prim/IntLiteral.java`. The checker types an integer numeral `IntLiteral` (`scala_src/typechecker/impls/Misc.scala:467-473`), resolved in the builtin library in scope (`compiler/Types.java:61-62`), so the library's declaration is what the checker reads; walk's numeral is made by the evaluator (`interpreter/evaluator/values/FIntLiteral.java:40-56`) and stays an `Int`, `Long` or `BigNum` (Q-walk's). One file outside the record's list had to change, `Library/ReflectiveQuickCheck.fss` (section 7). The repair round's declarations are `IntLiteral`'s and `ZZ`'s, both this rung's (`explorations/coordinator/CLIMB-BATCH-8.md`, section 4: "Q alone: ... `ZZ` ...", and `FortressBuiltin.fsi`/`.fss`).

## 2. Precedent search

- The model: the compiler library's `trait IntLiteral extends { Number, Equality[\IntLiteral\] } excludes {ZZ32, ZZ64, NN32, RR64, RR32, Character, Boolean, String, NN64, ZZ}`, getters `asZZ32`, `asZZ64`, `asNN32`, `asZZ`, `asNN64`, `asRR64`, its arithmetic and its own `even` and `odd` (`CompilerBuiltin.fsi:390-431`, `:429-430`); `coerce(x: IntLiteral)` on `ZZ` (`:104`), `ZZ64` (`:148`), `ZZ32` (`:211`), `NN32` (`:274`), `NN64` (`:333`); its `RR64` coerces from `FloatLiteral` and `RR32` only (`:434-435`). The first pass took the team's block as written and missed the model's `even` and `odd`; the skeptic found it (`SKEPTIC.md`, finding 11), and the repair round adds them.
- Probe Q's patches (`git show ab067d9b6^:explorations/compile-ladder/plan-n/probe-q/lib-switch.patch`, `lib-r.patch`, `lib-r1.patch`, `lib-eq1.patch`, `java-switch.patch`), read as a measurement: every declaration below follows their shape except section 6's additions.
- The comparisons: `ZZ64` states `=`, `<`, `>`, `>=`, `<=` and `CMP` itself (`Library/FortressLibrary.fsi:574-579` on the base), its bodies under the team's comment "Argh! Due to method ambiguities with ZZ, these definitions must be given explicitly here." (`Library/FortressLibrary.fss:791-799` on the base). The same defect elsewhere, counted on the base: `CMP` missing on 4 of the 5 integer types (`ZZ32`, `NN32`, `NN64` in api and body; `ZZ` in its api, its body has it at `Library/FortressLibrary.fss:952`); `>`, `>=`, `<=` missing on `ZZ32`, `NN32`, `NN64` (and from `ZZ`'s api); `MAXNUM`, `MINNUM` on all five inherited from `Integral` (`Library/FortressLibrary.fss:666-667` on the base). `ZZ`'s api also left out the ten additive and multiplicative operators its body declares (`Library/FortressLibrary.fss:997-1016`), which `ZZ64`'s api states for `ZZ64` (`Library/FortressLibrary.fsi:609-618`).
- The members of `Integral[\I\]` (`Library/FortressLibrary.fsi:443-480`) that the sibling `IntLiteral` does not declare, counted by the judge (`JUDGE.md`, section 1): 16, and the getters `zero` and `one` beside them (section 6).
- Per-type `MIN`, `MAX`, `MINMAX`: climb batch N's rung M (`2770550c3`, row 484), `StandardTotalOrder`'s bodies at the type; `MAXNUM` and `MINNUM` take `Integral`'s bodies at the type the same way, and `IntLiteral`'s `floor`, `ceiling` and `truncate` take `Integral`'s (`Library/FortressLibrary.fss:671-673`) at `IntLiteral`.
- The natives: the team's classes in `glue/prim/IntLiteral.java:48-111`; the out-of-range error is walk's own for a numeral that does not fit, `ProgramError(errorMsg("Value ", value, " does not fit in ZZ32."))` (`interpreter/evaluator/values/FIntLiteral.java:62-68`); the compiled runtime throws "Not in range for ZZ32" (`compiler/runtimeValues/FIntLiteral.java:63-95`).
- The `exactValue` arm: its siblings' form, `z: NN64 => do q: QQ = z; q end` (`Library/FortressLibrary.fss:384` on the base).
- Reading a numeral as a `ZZ`: `QQ`'s `coerce(x: IntLiteral) = Ratio(x.asZZ, 1)` (`Library/FortressLibrary.fss:566`), the form `IntLiteral`'s `DIVIDES`, `even` and `odd` take.
- `unsigned`: the compiler library declares it per type, `ZZ64`'s returning `NN64`, `ZZ32`'s `NN32`, none on a supertype (`CompilerBuiltin.fsi:207`, `:270`).
- A reflective generator per number type: `ReflectiveArbitrary.genFromType`'s table, `NN64` and `NN32` mapped to `genZZ` (`Library/ReflectiveQuickCheck.fss:145-155`).

## 3. The team's warning, whole

Above the arithmetic block of `object IntLiteral` on the base (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:178-179`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:495-496`):

> Do not enable these until coercion is implemented; doing so will
> cause all our arithmetic to occur on IntLiterals.

Coercion is implemented on both paths (the checker since climb batch N's rung I; walk at its three kinds of type check, FACTS "Under `walk`, the interpreter converts by coercion at its three kinds of type check"), and the block is enabled as the team wrote it, the comment removed. Under walk the warning's case cannot arise yet: walk's numeral is never an `IntLiteral` (`FIntLiteral.make` makes one only below `Long.MIN_VALUE`, which no numeral is, `FIntLiteral.java:40-56`), so no numeral reaches the block, and no walk value of the interpreter tests moved (section 12). The one exception is a program that names the object: the name `IntLiteral` is the value `FIntLiteral.ZERO` (`glue/prim/IntLiteral.java:34-37`), and its calls reach the block and the declarations section 6 adds; its arithmetic answers a `ZZ32`, since `FIntLiteral.make` normalises the result (the skeptic's `SkqLit`, `x + x` printing `0 ZZ32`; pinned by `IntLiteralValue.fss`, section 9). Under the checker the block is what lets two numerals combine as numerals (`3 + 4` an `IntLiteral`) rather than tie among seven converted declarations.

## 4. The change, declaration by declaration, against the compiler library's model

| Declaration | Compiler library (`CompilerBuiltin.fsi`) | One library after this rung | Notes |
|---|---|---|---|
| kind, supertypes | `trait IntLiteral extends { Number, Equality[\IntLiteral\] }` (`:390`) | `object IntLiteral extends { Number }` (`FortressBuiltin.fsi:178`, `.fss:483`) | object: decision 1 |
| exclusions | `excludes {ZZ32, ZZ64, NN32, RR64, RR32, Character, Boolean, String, NN64, ZZ}` | none written: an object excludes every type it does not extend, `QQ` among them, under walk (`interpreter/evaluator/types/FType.java:236-257`) and the checker | `XXXextendIntLiteral` stays an expected failure |
| Number's `comprises` | the compiler library's `Number` lists none | `{ RR64, RR32, QQ, AnyIntegral, IntLiteral }` (`FortressLibrary.fsi:284`, `.fss:361`) | `ZZ32`'s gives it up, `{ Int }` (`.fsi:530`, `.fss:709`) |
| getters | `asZZ32`, `asZZ64`, `asNN32`, `asZZ`, `asNN64`, `asRR64` | `asZZ32`, `asZZ64`, `asNN32`, `asNN64`, `asZZ` (`FortressBuiltin.fsi:181-185`, `.fss:486-495`) over natives `ToZZ32` to `ToZZ` (`IntLiteral.java:258-302`) | `asRR64`'s place is `Number`'s `asFloat(self): RR64`, native already |
| `zero`, `one` | none | `IntLiteral`, `0` and `1` (`.fsi:179-180`, `.fss:484-485`), ZZ32's form | repair round; the base's bodies returned `big(0)`, a `ZZ` (the distance's two errors at the base's `FortressBuiltin.fss:473-474`), and the first pass removed them |
| `|self|` | `IntLiteral` | `IntLiteral` (`.fsi:186`, `.fss:504`) | was `ZZ32` |
| comparisons | `<`, `<=`, `>`, `>=`, `=`, `=/=` | `=`, `<`, `<=`, `>`, `>=`, `CMP`, unchanged | `=/=` is the library's top-level one |
| arithmetic | `-`, `+`, `-` with BOX and DOT variants, `juxtaposition`, `DOT`, CROSS variants, `DIV`, `BITNOT`, `BITAND`, `BITOR`, `BITXOR`, `MIN`, `MAX`, `MINMAX`, `CHOOSE` | the team's block: `-`, `+`, `-`, `DOT`, `juxtaposition`, `TIMES`, `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `BITAND`, `BITOR`, `BITXOR`, `LSHIFT`, `RSHIFT`, `BITNOT`, `^(self, b: AnyIntegral)` | `TIMES`'s api line added in the repair round (`.fsi:199`; its body `.fss:525`) |
| `even`, `odd` | `even(self)`, `odd(self)` (`:429-430`) | `even(self) = even(self.asZZ)`, `odd(self) = odd(self.asZZ)` (`.fsi:218-219`, `.fss:558-559`) | repair round |
| beyond the model | none | `^(self, b: IntLiteral): RR64 = self^(b.asZZ32)`, `DIVIDES = self.asZZ DIVIDES b.asZZ`, `floor`, `ceiling`, `truncate` `= self` (`.fsi:213-217`, `.fss:553-557`) | repair round, section 6 |
| coercions from it | into `ZZ`, `ZZ64`, `ZZ32`, `NN32`, `NN64` | into `ZZ32` (`x.asZZ32`), `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ` (`Ratio(x.asZZ, 1)`), `RR64` (`asFloat(x)`), `AnyIntegral` (section 5) | the record's list, with `AnyIntegral` |
| `exactValue` | n/a | `z: IntLiteral => do q: QQ = z; q end` (`FortressLibrary.fss:386`) | reached under walk only through the object; `IntLiteralValue.fss` asserts it |

Besides `IntLiteral`: `CMP` on `ZZ32`, `NN32`, `NN64` and in `ZZ`'s api; `>`, `>=`, `<=` on `ZZ32`, `NN32`, `NN64` (`ZZ64`'s bodies) and `<`, `<=`, `>`, `>=` in `ZZ`'s api; `MAXNUM` and `MINNUM` on all five, ten declarations with `Integral`'s bodies at the type (`FortressLibrary.fss:732-733`, `:824-825`, `:907-908`, `:992-993`; `FortressBuiltin.fss:413-414`; the api beside each); `TIMES` in `ZZ32`'s api and `/` in the four fixed widths' apis, as their bodies declare them; `^(self, b: IntLiteral): RR64 = self^(b.asZZ32)` on each integer type (section 5); in the repair round, `ZZ`'s api states the ten additive and multiplicative operators its body declares (`FortressLibrary.fsi:657-666`); `unsigned` moved (section 7).

## 5. Kind A's device, and the way not taken

A numeral at an `AnyIntegral` parameter (a shift count, an exponent) is no longer an `AnyIntegral`. Two devices: `AnyIntegral`'s own `coerce(x: IntLiteral)` reading the numeral as the inference chapter reads a tie, `ZZ32`, else `ZZ64`, else `ZZ` by magnitude (`FortressLibrary.fsi:438-440`, `.fss:655-660`), 2 api and 5 body lines; or per-type overloads, an `IntLiteral` overload of each declaration with an `AnyIntegral` parameter (`LSHIFT`, `RSHIFT`, `^` on five types, 15 api and 15 body lines). Decision: the coerce, the smaller, for every `AnyIntegral` parameter, and the per-type overload for `^` alone, the reason measured: with the coerce alone, `z^2` for a `ZZ32` `z` was "Ambiguous coercion in call to operator ^ ... (Integral[\ZZ32\], AnyIntegral)->RR64; ((RR64 & {Float, FloatLiteral}), RR64)->RR64; (QQ, ZZ64)->QQ" (section 6's probe), since `AnyIntegral` does not coerce into `RR64` and so no declaration with an `AnyIntegral` parameter is more specific than `RR64`'s or `QQ`'s `^`. `w LSHIFT 3` checks with the coerce alone, no other type declaring a shift. With `^(self, b: IntLiteral)` the call is applicable without coercion, on all five types. The per-type `^(self, b: IntLiteral)` left a numeral to the power of a numeral tied with `IntLiteral`'s `^(self, b: AnyIntegral)`, which the repair round's `IntLiteral` `^(self, b: IntLiteral)` settles (section 6).

## 6. What the sibling `IntLiteral` left tied or unreachable on the checker, and its repair

The record gives `ZZ32` its own `>`, `>=`, `<=` and `CMP` because a numeral beside a `ZZ32` converts for every candidate and an operator inherited from a generic trait then ties with `ZZ64`'s, `QQ`'s and `RR64`'s own (item 33). The same holds for every operator any integer type inherits. Measured on 135 one-call functions, 27 operators by 5 types, each a typed integer with a numeral (`tmp/rung-numeral-library/check/NumeralCk2.fss`; the compiled checker with `-stop typecheck` over a copy of each library, the driver of the removed `explorations/reviews/numerics-plan-coordinator/probes-B/check.sh`):

    ./check.sh NumeralCk2 base   -> 48 errors: NN32 and NN64 arithmetic answering ZZ64 and QQ, MAXNUM ties, ZZ's own operators
    ./check.sh NumeralCk2 edit   -> 26 errors on 8fc2fdfde's library, 15 new: ZZ32 TIMES, / and ^; ZZ64 ^; NN32 and NN64 >, >=, <=, / and ^; ZZ ^
    ./check.sh NumeralCk2 edit2  -> 6 errors on 608c4e91f's library: ZZ's +, 1 + x, -, juxtaposition, DOT, TIMES, refused on the base too
    ./check.sh NumeralCk2 edit3  -> 0 errors on the repair round's library (ZZ's api states its arithmetic)

Each repair is a declaration the type's body already has, stated in its api, or `ZZ64`'s body at the type (decision 3). Under walk the new comparison bodies equal the inherited ones (`StandardPartialOrder`'s `>` is `other < self`, `StandardTotalOrder`'s `>=` and `<=` are `NOT (self < other)` and `NOT (other < self)`, `Library/FortressLibrary.fss:228`, `:285-286`), and no comparison's output moved (section 12).

The first pass said no checker refusal was new; that held for those 135 calls only. Numerals alone met more (the skeptic's `SkqCk2` and `SkqCk3`, `SKEPTIC.md`, "The compiled checker over the one library"). The repair round enumerated them: one zero-parameter function per call, declared `: Any`, for each member of `Integral[\I\]` and its supertraits that `IntLiteral` did not declare, with `MIN`, `MAX`, `MINMAX`, `CMP`, `unsigned`, `widen`, `signed`, `MOD`, `DIV`, `2^3` and `2^(-1)` beside them (`tmp/rung-numeral-library/check/NumeralOnly.fss`, 29 calls), over the library copies `base`, `edit2` (the first pass's, byte-equal to `9d75bb063`'s four library files) and `edit3` (this round's), with the skeptic's probes:

| Probe | base | edit2 | edit3 |
|---|---|---|---|
| `NumeralOnly`, 29 numeral-only calls | 1 refused (`signed(3)`) | 10 refused | 0 |
| `SkqCk2`, 25 | 10 errors, the numeral arithmetic typed `ZZ32` where the probe declares `IntLiteral` | 4 | 0 |
| `SkqCk3`, 15 | 2 (`round(3)` typed `ZZ`, `|\3/|`) | 7 | 2, the base's two |
| `NumeralCk`, 27 typed bindings and calls | 11 | 0 | 0 |
| `NumeralCk2`, 135 | 48 | 6 | 0 |
| `SkqR2b`, the second skeptic's ten numeral `IN` calls (added at the gather) | 0 | not run | 5 |
| `SkqR2g`, `4 IN (2:6)` among six more (added at the gather) | 0 | not run | 1 |
| `SkqR2f`, `(3).minimum` and `(3).maximum` among ten getters and calls (added at the gather) | 0 | not run | 2 |

Accepted on the base and refused on `edit2`: `odd(3)`, `even(4)`, `2^3`, `2^(-1)`, `floor(3)`, `ceiling(3)`, `truncate(3)`, `3 DIVIDES 6` (the skeptic's eight), and `(3).zero` and `(3).one`, which no probe had reached. `3 TIMES 4` checked at `ZZ32` while the rest of the block answers `IntLiteral` (`SkqCk2.fss:16`). The other 18 calls of `NumeralOnly` checked on `edit2` as on the base (a numeral converts for each candidate and the numeral rule reads it as a `ZZ32`, `Specification/basic/inference.tex`, section "A Numeral Whose Conversions Tie"), and `signed(3)`, refused on the base, checks from `edit2` on. The head's lines (`./check.sh NumeralOnly edit2`):

Two more kinds of numeral call, which the repair round's enumeration did not reach, are refused by the checker over the one library at the head and were accepted on the base; the second skeptic found them (`SKEPTIC.md`, second judgement, differential 5), and the gather added them here, its required correction 1. Neither is repaired in this rung:
- A numeral `IN` a range built with `#` or `:`: `3 IN (0#5)`, `3 IN (1:5)`, `4 IN (2:6)`, `3 IN (0#z)`, `(3 + 1) IN (0#5)`, and `3 IN r` for `r` a `CompactFullRange[\ZZ32\]` or a `FullRange[\ZZ32\]`; a typed `z IN (0#5)` is still accepted. `FullRange[\I\]` provides `Range[\I\]`'s `IN` and `Generator[\I\]`'s, through `Indexed` (`Library/FortressLibrary.fsi:2179`, `:828`, `:1245`), and declares none on their meet (`:2254-2262`), a Meet Rule gap the base hid because a numeral was a `ZZ32` there and the call needed no coercion. The ranges' `IN` is no rung's in this batch (the record's section 4). Row 580.

      ./check.sh SkqR2b edit3
      SkqR2b.fss:7:18: Ambiguous coercion in call to operator IN: of the declarations applicable to an argument of type (IntLiteral, CompactFullRange[\ZZ32\]) only by coercion, none is more specific than every other: (ZZ32, Range[\ZZ32\])->Boolean; (ZZ32, Generator[\ZZ32\])->Boolean.

- `(3).minimum` and `(3).maximum`, "IntLiteral has no getter called minimum" (and `maximum`) over `edit3` only (`./check.sh SkqR2f edit3`, 2 errors; `base`, none): `ZZ32`'s getters (`Library/FortressLibrary.fsi:534-535`), which a numeral reached as a `ZZ32` on the base, and which neither the one library's `IntLiteral` nor the compiler library's declares. The specification is silent on a numeral type's getters. Row 581.

    NumeralOnly.fss:8:14: Could not check call to operator ? - (Integral[\I\], I)->Boolean is not applicable to an argument of type (IntLiteral, IntLiteral).
    NumeralOnly.fss:12:14-20: Ambiguous coercion in call to function floor: of the declarations applicable to an argument of type IntLiteral only by coercion, none is more specific than every other: (RR64 & {Float, FloatLiteral})->RR64; QQ->ZZ.
    NumeralOnly.fss:17:14-18: Could not check call to function odd - Integral[\I\]->Boolean is not applicable to an argument of type IntLiteral.
    NumeralOnly.fss:23:14-16: Ambiguous coercion in call to operator ^: ... (IntLiteral, AnyIntegral)->RR64; (NN32, IntLiteral)->RR64; ((ZZ32 & {Int}), IntLiteral)->RR64.
    NumeralOnly.fss:25:15-20: IntLiteral has no getter called zero

What the specification settles (`JUDGE.md`, section 1): `odd`, `even` and `DIVIDES` are declared only on `Integral[\I\]`, and no instance of them is applicable to an `IntLiteral` even with coercion, since a coercion to a type is declared by that type (`Specification/basic/conversions-coercions.tex:405-410`) and `Integral` declares none; for `floor`, `ceiling`, `truncate` and a power of numerals the declarations applicable with coercion tie, and a declaration on `IntLiteral`, applicable without coercion, is chosen before any coercion (`conversions-coercions.tex:475-480`); a getter is a member of the type, so `(3).zero` needs `IntLiteral`'s own.

The repair is `IntLiteral`'s own declaration of each refused member (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:179-180`, `:199`, `:213-219`; `.fss:484-485`, `:553-559`):
- `getter zero(): IntLiteral = 0` and `getter one(): IntLiteral = 1`, `ZZ32`'s own form (`Library/FortressLibrary.fss:711-712`);
- `opr TIMES(self, b: IntLiteral): IntLiteral`, the api line for the body the block already had (`.fss:525`);
- `opr ^(self, b: IntLiteral): RR64 = self^(b.asZZ32)`, decision 8's body;
- `opr DIVIDES(self, b: IntLiteral): Boolean = self.asZZ DIVIDES b.asZZ`, read through `asZZ` as `QQ`'s coercion reads a numeral (`Library/FortressLibrary.fss:566`);
- `floor(self)`, `ceiling(self)`, `truncate(self): IntLiteral = self`, `Integral`'s bodies at the type (`Library/FortressLibrary.fss:671-673`);
- `even(self): Boolean = even(self.asZZ)` and `odd(self): Boolean = odd(self.asZZ)`, the model's two (`CompilerBuiltin.fsi:429-430`) read through `asZZ`.

Each body checks (no distance error at any of them, section 11) and runs under walk on the object `IntLiteral` (`IntLiteralValue.fss`, section 9), so `Integral`'s body form was not needed. And `ZZ`'s api states the ten operators its body declares (`Library/FortressLibrary.fsi:657-666`), with the body's signatures, which takes `NumeralCk2`'s last six refusals (`g + 1`, `1 + g`, `g - 1`, `g 2`, `g DOT 2`, `g TIMES 2` for a `ZZ` `g`) to none. Over `edit3` (`./check.sh <Name> edit3`): `NumeralOnly`, `SkqCk2`, `NumeralCk` and `NumeralCk2` report no error (rc=0), and `SkqCk3` the base's two:

    SkqCk3.fss:6:15-21: Function body has type ZZ, but declared return type is ZZ64.
    SkqCk3.fss:8:15-18: Ambiguous coercion in call to operator |\_/|: of the declarations applicable to an argument of type IntLiteral only by coercion, none is more specific than every other: (RR64 & {Float, FloatLiteral})->ZZ64; QQ->ZZ.

Those two are not this rung's regression: on the base and after, the floor brackets and `round` of a numeral and of a typed integer are refused or typed at `QQ`'s (`tmp/rung-numeral-library/check/FloorBracketCk.fss`, 5 errors over `base` and over `edit3` alike, among them "FloorBracketCk.fss:3:20-23: Ambiguous coercion in call to operator |\_/|: of the declarations applicable to an argument of type ZZ32 only by coercion, none is more specific than every other: (RR64 & {Float, FloatLiteral})->ZZ64; QQ->ZZ." and "FloorBracketCk.fss:5:20-26: Function body has type ZZ, but declared return type is ZZ32."). `Integral`'s body declares `opr |\self/|`, `opr |/self\|` and `round(self)` (`Library/FortressLibrary.fss:702-704`) and its api does not, so only `RR64`'s and `QQ`'s apply. A provisional row (section 14).

Under walk, numerals alone answer as on the base (`walklib.sh base` and `walklib.sh tree` over the scratch probe `NumOnlyWalk.fss`, byte-identical): `even(4)` true, `odd(3)` true, `floor(3)` `3 ZZ32`, `2^3` `8 ZZ32`, `2^(-1)` `0.5 RR64`, `3 DIVIDES 6` true, `3 TIMES 4` `12 ZZ32`, `(3).zero` `0 ZZ32`, `(3).one` `1 ZZ32`: walk's numeral is an `Int` and reaches none of `IntLiteral`'s declarations. `2^3` answering an integer where the library declares `RR64` is row 438.

## 7. `unsigned`, and the one file outside the record's list

`unsigned`: `ZZ32`'s `unsigned(self): NN32` (`Library/FortressLibrary.fsi:556` on the base) against `Integral[\I\]`'s `unsigned(self): NN64` (`:466`) was the distance's one return-type error on the number types ("For unsigned, the return type of (ZZ32 & {Int, IntLiteral})->NN32 ... should be a subtype of the return type of [\I extends Integral[\I\]\]Integral[\I\]->NN64"). `NN32`, `NN64` and `ZZ` never implemented `Integral`'s; only `ZZ32` and `ZZ64` have bodies (`Library/FortressLibrary.fss:767`, `:855` on the base). Decision 2, the compiler library's per-type device: `Integral`'s declaration is removed and `ZZ64`'s api states the one its body has (`Library/FortressLibrary.fsi:635`). No body and no value changes; the error goes (section 11). The record's stop reads "A repair of `unsigned` that needs more than the one declaration or changes a value: then the slip is left with a row"; this is two api lines, so the stop was met, and the judge kept the landed form as a reversible stop (`JUDGE.md`, section 3). The one-line alternative, `Integral`'s return type widened to `AnyIntegral`, has a cost, measured in the repair round with `f(w: ZZ64): NN64 = unsigned(w)` and `g(z: ZZ32): NN32 = unsigned(z)` (the scratch probe `UnsignedCk.fss`; `widen` is the base library with `Library/FortressLibrary.fsi:466` returning `AnyIntegral`):

    ./check.sh UnsignedCk base    -> rc=0, no error
    ./check.sh UnsignedCk widen   -> UnsignedCk.fss:3:20-29: Function body has type AnyIntegral, but declared return type is NN64.
    ./check.sh UnsignedCk edit3   -> rc=0, no error

So with the widening a client's `unsigned(w)` for a `ZZ64` `w` types `AnyIntegral` on the checker, where the base and the landed form type it `NN64`, since the base's `ZZ64` api states no `unsigned`.

`Library/ReflectiveQuickCheck.fss`: with `IntLiteral` in `Number`'s `comprises` clause, `genType(Number)` picks it at random, `genFromType` has no generator for it, and `genAnyOf'(IntLiteral)` asks `genType(IntLiteral)` again until the stack overflows. The team's `ReflectiveQuickCheckTest` failed 3 of 3 runs on `8fc2fdfde` (the first edit pass and two reruns) and passed 3 of 3 on the base library (the base pass and two reruns):

    tmp/rung-numeral-library/walklib.sh tree .../reruns ProjectFortress/tests/ReflectiveQuickCheckTest.fss    (8fc2fdfde)
    propCommutativeAddition:
    Stack overflow on MethodInvocation at Library/ReflectiveQuickCheck.fss:86.13
    rc=1 secs=72

On the base `IntLiteral` was below `ZZ32` and `genFromType` gave it `genZZ32`; the repair restores that with one line in the file's own per-type table, `theType[\IntLiteral\]() => Just[\AnyGen\](genZZ32)` (`Library/ReflectiveQuickCheck.fss:147`). After it, 3 of 3 runs pass with output equal to the base pass's, and the edit passes agree. Decision 4; no rung of section 4 owns the file.

## 8. R9, NN32 into RR64: not built

`RR64` declaring `coerce(x: NN32) = asFloat(x)` makes every operator that both `RR64` and `ZZ64` declare ambiguous for an `NN32` with a `ZZ32`, on both paths: neither `ZZ64` nor `RR64` coerces into the other, so neither tuple is more specific (`Specification/basic/conversions-coercions.tex:510-518`, `:566-573`), and the inference chapter makes such a tie a static error ("Where an argument that is not a numeral leaves the declarations applicable to a call only with coercion tied, no declaration is the most specific, and the call is a static error", `Specification/basic/inference.tex:190-193`). That contradicts answer 8's `ZZ64` for an `NN32` with a `ZZ32` (POSITIONS, "Mixed widths convert by declared coercions"). Measured under walk with the coercion added to a copy of the library (`tmp/rung-numeral-library/walklib.sh r9`, the 18 tests of `ProjectFortress/tests/` that use `NN32`, besides the random `QuickCheckTest`):

    UnsignedTest.fss:51:25   Ambiguous coercion, args = (1: ZZ32,4294728819: NN32), applicable with coercion = {coerced +(self:(FortressLibrary.RR64 ...
    fib13.fss:17:31-36       Ambiguous coercion, args = (20: NN32,0: ZZ32), applicable with coercion = {coerced >=(self:(FortressLibrary.RR64 ...
    IntegerMinMaxRungM.fss:59:18  Ambiguous coercion, args = (5: NN32,3: ZZ32), ... MAX
    InferCoercionRungK       FAIL: J20/0:[3 : ZZ32, 5 : NN32] =/= J20/0:[3 : ZZ64, 5 : ZZ64]; answer 8 ...: ZZ32 with NN32 infers ZZ64

Five of the 18 go red, two of them the team's (`UnsignedTest`, `fib13`), and `IntegerOrderNumerals`'s `u CMP 0` too, walk's numeral being a `ZZ32`; with the checker over the same copy, `z + u` and `u MAX z` are "Ambiguous coercion ... ((ZZ64 & {Long}), ZZ64)->ZZ64; ((RR64 & {Float, FloatLiteral}), RR64)->RR64" (`check.sh NumeralCk r9`). The skeptic confirmed the conflict on its own copy (`SKEPTIC.md`, differential 4). Pavol's two decisions cannot both hold under the coercion rule as written; the choice is his. Candidates and costs:

1. R9 with the disambiguating declarations the Meet Rule asks for: on `NN32` each operator with a `ZZ32` operand and on `ZZ32` with an `NN32` operand, converting both to `ZZ64`, for every operator both `ZZ64` and `RR64` declare (about 16, so about 32 declarations, api and body). Keeps answer 8; a mixed-width family the library has nowhere else; and the checker then types `u + 1` for an `NN32` `u` at `ZZ64`, since the numeral rule reads the tied numeral as a `ZZ32` (`SKEPTIC.md`, differential 5: "SkqC1.fss:3:21: Function body has type ZZ64, but declared return type is NN32").
2. R9 alone: an `NN32` with a `ZZ32` becomes the specification's ambiguity error and the program writes `widen` or `asFloat`; answer 8's case for those two types goes, with the assertions above and two team test lines.
3. `ZZ64` into `RR64` as well, which makes `ZZ64` more specific than `RR64`: lossy, against answer 8's own criterion.
4. R9 not built: the conversion stays explicit, as the specification says today (`Specification/basic/conversions-coercions.tex:81-82`, `Specification/basic-lib/numbers.tex:46-49`). This rung's state.

R9's specification passages are left as they are, since the library keeps the explicit conversion they state; the coercion chapter's callout still gives answer 8's reason for it ("since that decision names only ℤ32 and the numerals", `conversions-coercions.tex:81-82`), which the later decision on `NN32` does not share, and that goes to Pavol with the fork.

## 9. The tests

Written first and committed alone (`4a8c27003`): `ProjectFortress/tests/IntegerMaxNumMinNum.fss`, `XXXIntegerMaxNumRungM.fss` promoted by `git mv` (component renamed, its comment line rewritten to say what it checks with row 517, and "ledger row 517; " and ", answer 8" dropped from its messages per the corpus rule; assertions unchanged), and `ProjectFortress/tests/IntegerOrderNumerals.fss`: `CMP` with a numeral for each integer type, `>`, `>=`, `<=`, `MAXNUM` and `MINNUM` for each type, and the pins of the library's numeral sites (`SUFFIX_SUM`'s stride `(|x| - 2):0:-1`, `shuffle`'s `(|a| - 1):-1:-1`, `0 MAX (index - 1)`, the empty `SUM` and `PROD` over `ZZ32`, `ZZ64`, `NN32`, `widen(0)`), which pass before and after. The `NN32` and `NN64` `MAXNUM`/`MINNUM` assertions take a typed operand: with a numeral, walk answers at `ZZ64` and `ZZ` (its numeral is a `ZZ32`), which Q-walk changes and `XXXNumeralWithNN32.fss` holds. Seen failing through the harness on the base:

    bash explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-numlib/tmp/rung-numeral-library/h1 ProjectFortress/tests/IntegerMaxNumMinNum.fss ProjectFortress/tests/IntegerOrderNumerals.fss
    # harness-one 2026-10-02T13:14:11Z; tree 493b4076f; ...
    Ambiguous coercion, args = (3: ZZ64,1: ZZ32), applicable with coercion = {coerced MAXNUM(self:(FortressLibrary.QQ & {Ratio}),other:FortressLibrary.QQ):...
    Tests run: 2,  Failures: 2,  Errors: 0

In the repair round, six messages of `IntegerOrderNumerals.fss` (`:70-75`) cited sections that do not say what they check: `basic-integers.tex` declares no `widen`, and `reductions.tex`, section "Summations and Other Reduction Expressions", gives only a `ZZ32` sum's start from 0 (`SKEPTIC.md`, finding 2). Each now says what it pins ("pins the library: an empty PROD over ZZ64 is the ZZ64 one", "pins the library: widen of the numeral 0 is the ZZ64 zero"), no assertion changed; the `ZZ32` sum's message (`:69`) stays.

`ProjectFortress/tests/ReflectiveNumberTypes.fss` (`ca2a0bf86`) holds section 7's repair: it passes on the base library, fails on `8fc2fdfde`'s ("FAIL: literals.tex, section "Literals": a numeral's type IntLiteral extends Number; the reflective generator finds a generator for it") and passes from `f05b4d3aa`. Its failure could not be committed before the fix: the defect arose in this rung's own edit.

The repair round's two tests, committed alone at `79910dcdf`:
- `ProjectFortress/tests/IntLiteralValue.fss`: the object `IntLiteral` bound at `ZZ32`, `ZZ64`, `ZZ`, `QQ`, `NN32`, `NN64` and `RR64`, each value and type through a typecase with an `IntLiteral` clause (`0 : ZZ32` to `0.0 : RR64`, citing `literals.tex`, section "Literals", and for `RR64` `conversions-coercions.tex`, section "Principles of Coercion"); `IntLiteral = widen(0)` true, a pin of `exactValue`'s numeral case; `shown(x + x)` `0 : ZZ32`, a pin of today's interpreter. At `1887abecb`, with the declarations, four assertions on `IntLiteral`'s new members join it: `even` and `odd`, `floor`, `ceiling` and `truncate` answering the object itself, `x^x = 1` (`basic-integers.tex`, section "Integers": a power 0 gives 1 even for the base 0), and `zero` and `one`.
- `ProjectFortress/tests/XXXNumeralWithNN32.fss`, row 484's `NN32` sentence: for `u: NN32 = unsigned(5)`, `shown(u + 1)` `6 : NN32`, `shown(u MAX 1)` `5 : NN32`, `shown(u MAXNUM 1)` `5 : NN32`, citing `literals.tex`, section "Literals", `conversions-coercions.tex`, section "Coercion Resolution", and for `MAXNUM` `basic-integers.tex`, section "Integers". An expected failure until Q-walk.

`IntLiteralValue` on the base library (`walklib.sh base`) stops at its first assertion, the `ZZ32` binding: on the base `IntLiteral` extends `ZZ32`, so the binding keeps the object, which the typecase's `IntLiteral` clause shows (the judge expected the `ZZ64` binding's "Value 0 does not fit in ZZ32.", one binding later):

    tmp/rung-numeral-library/walklib.sh base tmp/rung-numeral-library/repair/walk ProjectFortress/tests/IntLiteralValue.fss
    FAIL: J14/0:0 : IntLiteral =/= J8/0:0 : ZZ32; literals.tex, section "Literals": the libraries define a coercion from the numeral type IntLiteral to ZZ32; IntLiteral at a ZZ32 binding is the ZZ32 zero
    rc=1 secs=16

With the four new assertions, on the first pass's library (`walklib.sh edit2`), it stops at the first of them:

    ProgramError: .../ProjectFortress/tests/IntLiteralValue.fss:36:28-32:
    Failed to find any matching overload, args = (0:IntLiteral), overload = {
    	Integral[\I extends Integral[\I\]\](uninstantiated)[\I extends Integral[\I\]\].odd(self:Integral[\I\]):FortressBuiltin.Boolean...

and on the tree it prints `PASS`, rc=0.

`XXXNumeralWithNN32` through the harness, an expected failure:

    bash explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-numlib/tmp/rung-numeral-library/h6 ProjectFortress/tests/XXXNumeralWithNN32.fss
    # harness-one 2026-10-02T17:15:05Z; tree ffe0a21a3; ...
    FAIL: J8/0:6 : ZZ64 =/= J8/0:6 : NN32; literals.tex, section "Literals", and conversions-coercions.tex, section "Coercion Resolution": the numeral converts into NN32, whose + is the most specific; an NN32 5 plus the numeral 1 is the NN32 6
     OK Saw expected exception
    OK (1 test)

and a scratch copy with the three answers set to walk's `ZZ64` ones, which passes, failed by the harness as an XXX test that succeeds (the copy deleted after):

    bash explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-numlib/tmp/rung-numeral-library/h6fix tmp/rung-numeral-library/xxxfix/XXXNumeralWithNN32.fss
     Missing expected failure 
    1) .../XXXNumeralWithNN32(com.sun.fortress.tests.unit_tests.FileTests$InterpreterTest)junit.framework.AssertionFailedError: Expected failure or exception, saw none. InterpreterTest ...
    Tests run: 1,  Failures: 1,  Errors: 0

Every test of the rung on the final tree:

    bash explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-numlib/tmp/rung-numeral-library/h7 ProjectFortress/tests/IntegerMaxNumMinNum.fss ProjectFortress/tests/IntegerOrderNumerals.fss ProjectFortress/tests/ReflectiveNumberTypes.fss ProjectFortress/tests/IntLiteralValue.fss ProjectFortress/tests/XXXNumeralWithNN32.fss ProjectFortress/tests/XXXextendIntLiteral.fss
    # harness-one 2026-10-02T17:49:59Z; tree f447a4be4; ...
    . interpret tmp/rung-numeral-library/h7/tests/XXXextendIntLiteral
     OK Saw expected exception
    . interpret tmp/rung-numeral-library/h7/tests/XXXNumeralWithNN32
     OK Saw expected exception
    OK (6 tests)

`XXXextendIntLiteral.fss` stays an expected failure ("Attempt to extend object type IntLiteral"). Fourteen neighbouring tests through the same harness on the first pass's final library (`IntegerMinMaxRungM`, `UnsignedTest`, `FlatTowerRungF`, `InferCoercionRungK`, `NumeralTest`, `fib13`, `PowChooseLcmRungE`, `IntSemanticsRungI`, `FixedWidthOverflowRungB`, `WrapOperatorsRungD` among them): "OK (14 tests)"; the repair round's edit pass covers them on its library (section 12).

## 10. The checker on numerals, row 454's integer half

`tmp/rung-numeral-library/check/NumeralCk.fss`, 27 one-line calls, the compiled checker over each library copy:

    ./check.sh NumeralCk base   -> 11 errors, among them NumeralCk.fss:3:25 "Right-hand side has type IntLiteral, but declared type is NN32." and :4:25 the same for NN64
    ./check.sh NumeralCk edit2  -> 0 errors
    ./check.sh NumeralCk edit3  -> 0 errors

`a: NN32 = 3` and `a: NN64 = 3` check against the one library: row 454's integer half closes on the checker's side. Walk still refuses both, "RHS expression type Int is not assignable to LHS type NN32" (row 454), which is Q-walk's. No gated program can observe the checker over the one library on a client call before the switch-over: the compiled tests check against the compiler library, and the distance reads library sites only. These probes are the evidence.

## 11. The checker count and the distance

Before: the landed tables, `explorations/compile-ladder/climb-batch-7b/gate/checker-count.txt` (59), `distance.txt` (598) and `explorations/compile-ladder/gate/distance-sites.tsv`; `git log b0eb41516..493b4076f -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing, so the base had not changed under them.

The intermediate state, once each on `608c4e91f` (`explorations/coordinator/tools/checker-count/run.sh`, `explorations/coordinator/tools/distance/run.sh`), the first pass:
- The count: 59 to 58, `FortressLibrary` 106 to 104, locations 48 to 46: `unsigned`'s return-type error, counted twice.
- The distance: 598 to 596, return-type 29 to 28, typecheck 386 to 385. By site, line numbers mapped back to the base through the edit's diff: 5 gone and 3 new. Gone: `unsigned`'s return-type error (`FortressLibrary.fsi:466,556`), `IntLiteral`'s two old getters (`FortressBuiltin.fss:473`, `:474`, "Function body has type ZZ, but declared return type is IntLiteral."), and two BR sites (`FortressLibrary.fss:3446`, `:3466`, a `Comprehension` declared, `String` found). New: three BR sites (`FortressLibrary.fss:130`, `:1557`, `:3271`, a `BigReduction` declared, the element found). The edit's own effect is -3; the BR family's net +1 is row 488's variation, which moves under edits that touch none of its declarations (an intermediate run on `8fc2fdfde` moved it by -1 instead, total 594). 86 further rows keep their site and change their wording: `ZZ32`'s `comprises` clause printed `{Int}` where it was `{Int, IntLiteral}`, and a candidate listing that names `NN64`'s new `CMP` first.
- By class, with lines mapped back (the stage's `table.py` over the remapped run): R3 -1, OT -2, BR +1; I3 and I4 unchanged. The stage's own table reads I1 +2, V1 -8, G1 -5, OT +9 besides: an artefact of `classify.py`'s site ranges, fixed lines read on `edc815f0c` (`explorations/coordinator/tools/distance/classify.py:24-25`), which this rung's inserted lines shift. The merged tree's table will carry the same artefact.

The final library, once each on `f447a4be4` (the same commands, into `tmp/rung-numeral-library/stages3/`):
- The count: 58 (`FortressLibrary` 104, `RangeInternals` 12, locations 46, no crash), the same as on `608c4e91f`: 59 to 58 against the landed table.
- The distance: 596, every `#kind` and `#class` row equal to `608c4e91f`'s (`compare.sh stages2/distance.txt stages3/distance.txt`: "DISTANCE SAME   596"); against the landed table "DISTANCE DOWN   598 -> 596 (-2)", the rows as above. By site, lines mapped from `f447a4be4` back to `608c4e91f` through the repair's diff (`git diff -U0`, the three library files it touches): no error at any line the repair added (`FortressBuiltin.fsi:179-180`, `:199`, `:213-219`; `FortressBuiltin.fss:484-485`, `:553-559`; `FortressLibrary.fsi:657-666`), so `ZZ`'s api lines stay and the first pass's provisional row 561 is dropped. Four sites moved, all in the BR family, row 488's variation again: gone `FortressLibrary.fss:3302` and `:3309` ("Function body has type RR64, but declared return type is BigReduction[\RR64,RR64\]."), new `:3484` and `:3504` ("Function body has type String, but declared return type is Comprehension[\Any,String,String,String\].", and `...AnyMaybe\]`), lines of a file the repair did not edit. 52 further sites keep their place and differ only in wording: candidate listings that now name `ZZ`'s api operators (`RangeInternals.fss:637`, `:641`, `:751`, `:755`, `:1328`, `:1332`, `FortressLibrary.fss:306`, `:316`), a declaration list printed in another order, or the end line of an api range that spans the inserted lines.

The judgement's reading put the distance about 4 below the landed table; it is 2 below. The numeral case of `exactValue` and the coercions from `IntLiteral` into `NN32` and `NN64` reach no library site the distance reads; their evidence is section 10's probes and, under walk through the object, `IntLiteralValue.fss`.

## 12. The named measurement: walk on the interpreter tests and the two microGPT programs

One edit pass over `ProjectFortress/tests/` after the last library edit, in the repair round (`explorations/coordinator/tools/count-run/count-run.sh tmp/rung-numeral-library/edit-pass/q-edit3`, on `f447a4be4` with no tracked file differing, 473 tests, 17:34 to 17:49 UTC, under the distance stage's and another rung's load), compared with the coordinator's base pass (`9c20a62d7`, whose library, sources and specification are `b0eb41516`'s and the base's) by `compare-normalised.py 9c20a62d75b88e31e494d4169217c55cd53bd9f8 /home/user/fortress/.claude/worktrees/batch8-base/tmp/q-base tmp/rung-numeral-library/edit-pass/q-edit3`, the 18 unstable tests masked:

    tests 469  same 439  normalised 9  changed 2  unstable 18 (exit code changed in 0)  missing 0  new 5  gone 1

- Changed, each with its exit code and verdict unchanged: `XXXArrayLiteralArgRungC` and `XXXRangeTupleShiftWalk` list `IntLiteral`'s `-` ("-(native Sub)fn meth(self 0):(IntLiteral,IntLiteral)->IntLiteral") in the overload set their failure message prints, the block enabled, and `XXXRangeTupleShiftWalk` lists `NN32`'s `-` at another place in it (row 430's order). None of the repair round's declarations appears in a listing.
- Normalised: 7 expected failures whose messages cite library lines the edit moved (`XXXEmptyGroupSumRungF`, `XXXFnRenderRungS`, `XXXQQPowerExponent`, `XXXRangeWideRungJ`, `XXXStridedSpanWalk`, `XXXTupleSevenRungS`, `XXXUnwrittenSumRungF`), and `taskTrace2`, `taskTrace3`, whose output prints identity hashes.
- Unstable: the 18, no exit code changed; `ReflectiveQuickCheckTest` equal to the base once normalised.
- New: the five tests, `IntLiteralValue`, `IntegerMaxNumMinNum`, `IntegerOrderNumerals` and `ReflectiveNumberTypes` at rc 0, `XXXNumeralWithNN32` at rc 1, its expected failure. Gone: `XXXIntegerMaxNumRungM`, promoted.
- `XXXInheritedOverload`, changed in the first pass's comparison (its two declarations in the other order), equals the base's here: row 430's order, which moves with the library's contents.

The first pass's comparison on `608c4e91f` (`compare2.txt`): "tests 469  same 438  normalised 9  changed 3  unstable 18 (exit code changed in 0)  missing 0  new 3  gone 1", the same two listings and `XXXInheritedOverload`'s order. An earlier pass on `8fc2fdfde`, before the first pass's last library edits, found `ReflectiveQuickCheckTest` at rc 1 (section 7) and `XXXCoercionTupleOverloadRungC`'s listing of `pair`'s getter and setter in the other order (2 of 2 runs on the base one order, 2 of 2 on that library the other, the base's order again on the next library: their set is ordered by `FunctionClosure.hashCode`, which adds `System.identityHashCode(getEnv())`, `interpreter/evaluator/values/FunctionClosure.java:130-131`). Every changed output is accounted for; no walk value moved, and the measurement meets no stop of the record.

The microGPT checks under walk, once, on `608c4e91f`'s library, the first pass (`explorations/coordinator/tools/mg-run.sh`): `MicroGptFlatCheck` "VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS" rc=0 in 692 s, `MicroGptAplCheck` the same in 748 s; the five step losses 3.3659669475848513, 3.424272783871772, 3.177802125458053, 3.066355684224198, 3.2208830897506235 and the batch-4 loss 3.28664155669517, each equal to its golden. The checks could not run on the tree as it stands: the cleaning `1ee3b0bc5` removed their inputs, `explorations/apl/reference/dzaima/docs.txt` and `w/*.txt` (read at `explorations/run-c4/src/MicroGptFlat.fss:19`, `MicroGptFlatCheck.fss:32`, `explorations/apl/mg/MicroGptApl.fss:28`, `MicroGptAplCheck.fss:34`), and the first attempt stopped at "FileNotFound: ../../apl/reference/dzaima/docs.txt". They were restored untracked from `1ee3b0bc5^` for the run and deleted after. The last landing's printed values are not in the tree; the comparison is with the goldens the checks read. The repair round did not run them again: the record allows one run, and the repair adds members of `IntLiteral`, which no walk numeral is, and api lines of `ZZ` whose bodies already ran (`JUDGE.md`, section 3, last paragraph); the edit pass above is the check that walk still loads and dispatches as before.

## 13. The specification

In the S1 form: `Specification/basic/expressions/literals.tex:149-153`, after the passage's sentence that the libraries define coercions from numerals (`:146-148`), a new sentence that in the libraries every numeral without a radix point has the type `IntLiteral`, which extends `Number` and none of the number types, and that each of the five integer types, `QQ` and `RR64` declares a coercion from it; its callout `revival-numeral-type` (`:154-165`) says what the Working Draft said and that the interpreter gives a numeral that type once it runs with the checker's static types. In the coercion chapter's callout, the sentence on the interpreter (`Specification/basic/conversions-coercions.tex:84-88`). In Appendix I, the entry "The type of an integer numeral" after "The proof of overloading resolution" (`Specification/appendices/changes.tex:2489-2572`), with its rationale, effect, the original sentences quoted (the Working Draft's `literals.tex`, lines 146-148, and the revival's callout sentence of 26 September), and route C. Unchanged: R9's passages (section 8).

In the repair round, the entry's Effect (`changes.tex:2523-2554`): the sentence "The interpreter is unchanged: ... and its calls reach the declarations they reached before.", false for `MAXNUM`, `MINNUM`, `CMP` and the comparisons (`SKEPTIC.md`, finding 6), is replaced: the interpreter still gives an integer numeral `ZZ32`, `ZZ64` or `ZZ` by its value and reaches none of `IntLiteral`'s declarations; its calls of the comparisons, `CMP`, `MAXNUM` and `MINNUM` on an integer type reach that type's own, which answer as the inherited ones did, except that `MAXNUM` and `MINNUM` with a converted argument, which stopped at a tie with `QQ`'s or answered at `QQ`, now answer at the integer type both arguments convert to. The judge's text said "which stopped at a tie with those of QQ"; an `NN32` with a numeral answered at `QQ` on the base rather than stopping (`walklib.sh base` over the scratch probe `MaxnumWalk.fss`: "A1 u MAXNUM 1: 5 QQ", "A2 u MINNUM 1: 1 QQ"; on the tree "5 ZZ64", "1 ZZ64"; `b MAXNUM 1` for a `ZZ64` stops on the base with "Ambiguous coercion" and is "3 ZZ64" on the tree), so the sentence names both. Two sentences join the item: `ZZ` states in its api, for the same reason, the additive and multiplicative operators its body declares; and `IntLiteral` declares its own `zero`, `one`, `even`, `odd`, `floor`, `ceiling`, `truncate`, `DIVIDES`, `TIMES` and a power with a numeral exponent, which a numeral reached before as a `ZZ32`, since no member of `Integral` is applicable to a numeral of that type, even with coercion (`\secref{applicability-with-coercion}`). Built in a scratch copy, the generated example inputs replaced by empty placeholders, `pdflatex` twice: no error ("pass 1 rc=0", "pass 2 rc=0", "Output written on fortress.pdf (549 pages, 2010652 bytes)"), only the bibliography's citations undefined; the entry is I.1.34 on page 524, and `\secref{applicability-with-coercion}` resolves to 17.4. No PDF is committed.

## 14. Every defect measured, and its home

- Row 517, `MAXNUM`/`MINNUM` tying with `QQ`'s under walk: home 1, repaired; `IntegerMaxNumMinNum.fss`, `IntegerOrderNumerals.fss`.
- `ReflectiveQuickCheckTest` overflowing the stack once `IntLiteral` is in `Number`'s clause, introduced at `8fc2fdfde`, repaired at `f05b4d3aa`: home 1, `ReflectiveNumberTypes.fss`.
- The checker ties introduced by the sibling `IntLiteral` beside a typed integer and repaired at `608c4e91f` (section 6), and row 454's integer half on the checker's side (section 10): repaired; no gated program can observe the checker over the one library on a client call, so the evidence is the probes, and walk's values of the same comparisons are asserted in `IntegerOrderNumerals.fss`.
- The numeral-only calls the sibling `IntLiteral` left refused on the checker (`odd(3)`, `even(4)`, `2^3`, `2^(-1)`, `floor(3)`, `ceiling(3)`, `truncate(3)`, `3 DIVIDES 6`, `(3).zero`, `(3).one`), and `3 TIMES 4` typed `ZZ32`: home 1, repaired in the repair round by `IntLiteral`'s own declarations (section 6); the checker's evidence is the probes (`NumeralOnly`, `SkqCk2`, `SkqCk3` over `edit3`), since no gated program observes the checker over the one library, and the bodies' values under walk are asserted on the object `IntLiteral` in `IntLiteralValue.fss`.
- A numeral `IN` a `#` or `:` range, refused by the checker over the one library at the head and accepted on the base (section 6): the specification settles it against the library's ranges, which owe a declaration of `IN` on `FullRange`, the meet (`Specification/advanced/overloading.tex`, section "Meet Rule"; `Specification/basic/conversions-coercions.tex`, section "Coercion Resolution"); no gated program observes the checker over the one library before the switch-over, so row 580 alone, quoting the probe (added at the gather).
- `(3).minimum` and `(3).maximum`, refused by the checker over the one library at the head and accepted on the base (section 6): the specification is silent on a numeral type's getters, so home 3, row 581 alone, quoting the probe (added at the gather).
- `ZZ`'s api not stating `+`, `-`, `DOT`, `TIMES`, `juxtaposition` and their dotted forms, refused by the checker on the base and after the first pass (the first pass's provisional row 561): repaired in the repair round (section 6, `NumeralCk2` 6 to 0), no distance error at the added lines; no gated program can observe it, so the probe is the evidence, and row 561 is dropped.
- The object `IntLiteral`'s conversions under walk, a loud "Value 0 does not fit in ZZ32." on the base and the value the coercions give now: home 1, `IntLiteralValue.fss`.
- The object `IntLiteral`'s own arithmetic answering a `ZZ32` under walk (`x + x` `0 : ZZ32`, and `x TIMES x`, `x^x`, `x.zero` and `x.one` alike), against its declared `IntLiteral`: home 3, since the specification's prose is silent on the type a numeral type's own arithmetic answers and the `.fsi` that says `IntLiteral` is this rung's own; pinned by `IntLiteralValue.fss`, provisional row 578; Q-walk's.
- Walk's `NN32` with a numeral answering `ZZ64` (`u + 1`, `u MAX 1`, `u MAXNUM 1`), where the specification with the landed library answers `NN32`: home 2, `XXXNumeralWithNN32.fss`; Q-walk's.
- The floor brackets and `round` of a numeral or a typed integer refused or typed at `QQ`'s by the checker over the one library, on the base and after: deferred; the specification settles it (`basic-integers.tex`, section "Integers", declares `⌊self⌋`, `⌈self⌉` and `round` on `ZZ`), and no gated program can observe the checker over the one library, so provisional row 579 alone, quoting the probe.
- R9 against answer 8: not a defect of the tree, which keeps the specification's explicit conversion; provisional row 575 and a fork for Pavol; no XXX test, since no specification section says the conversion is implicit.
- The microGPT inputs removed by the cleaning (row 576), and `classify.py`'s fixed ranges (row 577): measurement hazards, provisional rows.
- The overload-listing order (`XXXInheritedOverload`, `XXXCoercionTupleOverloadRungC`, `XXXRangeTupleShiftWalk`): row 430, a note.
- `2^3` and the object's `x^x` answering an integer under walk where the library declares `RR64`: row 438, on file, a note.

## 15. Ladder subset, greps

No ladder file's recorded first error names a name this rung adds, and the record says each worker's subset is empty (section 6): none was run. Greps for each added name over `ProjectFortress/tests/`, every `ProjectFortress/*_tests/` and `ProjectFortress/src/com/sun/fortress/`: `asZZ32`, `asZZ64`, `asNN32`, `asNN64`, `asZZ` occur only as the compiler library's getters in compiled tests and its runtime (`compiler/runtimeValues/FIntLiteral.java`), and as `asZZ32K`, another name, in `tests/XXXNatValueNN32RungK.fss:13`; the five test components and their top-level names occur nowhere else. The repair round adds no top-level name: `IntLiteral`'s members and `ZZ`'s api lines are members of types this rung owns.

## 16. Decisions

1. `IntLiteral` an object, not the compiler library's trait nor a value object: the team's native constructor binds an object, and an object excludes what it does not extend, `QQ` included, as the record expects.
2. `unsigned` moved to `ZZ64`'s api (section 7); not taken: `Integral`'s return type widened to `AnyIntegral`, which types a client's `unsigned(w)` for a `ZZ64` `w` at `AnyIntegral` (measured, section 7), or the slip left with a row, the record's outcome for its stop. The stop was met; the judge kept the landed form (`JUDGE.md`, section 3), and the three go to Pavol.
3. Kind A: `AnyIntegral`'s coerce plus per-type `^(self, b: IntLiteral)` (section 5); not taken: the coerce alone (leaves `x^2` tied), per-type overloads for all shifts and powers (larger).
4. Comparisons, `/` and `TIMES` beyond the record's `ZZ32` list (section 6); not taken: the list alone (15 checker regressions), a checker change reading an inherited method's `self` at the receiver (outside this rung).
5. R9 not built (section 8), four candidates for Pavol.
6. `ReflectiveQuickCheck.fss`'s one line (section 7); not taken: `IntLiteral` left out of `Number`'s clause (a `comprises` violation), the team test left red.
7. The natives raise walk's own `ProgramError` "Value v does not fit in T."; not taken: a catchable `IntegerOverflow`, the compiled runtime's `Error`.
8. `^(self, b: IntLiteral)` reads its exponent with `b.asZZ32`; not taken: `b.asZZ`, whose `BigNum` `Int$Pow` cannot read.
9. The promoted test's comment and messages rewritten to the corpus rule, assertions unchanged.
10. Typed operands for the `NN32` and `NN64` `MAXNUM` assertions, not numerals that pin walk's interim answers; the specification's answer with a numeral is `XXXNumeralWithNN32.fss`'s.
11. The corpus pass run once per code state: the first found the regression of section 7, the second is the first pass's measurement, the third the repair round's.
12. The microGPT inputs restored untracked for the run and removed after.
13. Repair round, the judge's (`JUDGE.md`, section 1): `IntLiteral`'s own declarations for the members a numeral no longer reaches; not taken: ledger rows alone (a numeral refused where the base accepted it), per-type declarations on the five integer types (15 or more, which the checker's narrow numeral reading would then reach), a change to the checker's numeral rule (rungs I's and O's files).
14. Repair round, mine: `zero` and `one` added to the judge's list, since the enumeration found `(3).zero` and `(3).one` refused on `edit2` and accepted on the base (the judge's instruction 4 covers any such further member), with `ZZ32`'s body form (`0`, `1`); not taken: the object `IntLiteral` as the zero's body (it gives no one) or a row. Under walk the object's `x.one` answers `1 : ZZ32`, part of row 578.
15. Repair round, mine: `even` and `odd` through `asZZ`, as the judge gave them, kept over `Integral`'s body form because they check and run (section 6).
16. Repair round, the judge's: `ZZ`'s api states its body's arithmetic, kept since the distance shows no error at the lines (section 11); not taken: the row alone.
17. Repair round, mine: the floor brackets and `round`, pre-existing on the base, left with a row (section 14); not taken: stating `Integral`'s three body declarations in its api with `IntLiteral`'s own three, which would need another distance run and edit pass inside the one repair round and lies outside the judge's list, which names regressions.
18. Repair round, mine: the Appendix I Effect names `QQ`'s answer as well as its tie (section 13), against the judge's text, which named the tie alone; the base's walk output settles it.
19. Repair round, mine: `IntLiteralValue.fss` carries the assertions of the new members' values on the object `IntLiteral`, the only walk value that reaches them, in the commit of the declarations, after the tests-only commit; their failure on the first pass's library is shown (section 9).
20. Repair round, mine: `IntLiteralValue.fss`'s typecase puts the `IntLiteral` clause first, so that on the base, where `IntLiteral` extends `ZZ32`, an unconverted binding shows as `IntLiteral` and fails rather than passing as a `ZZ32`.
