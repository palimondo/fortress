<!-- Judgement of the curator's numeral design of 2026-11-08 (machine defaults where no type is declared; the Working Draft's numeral types as fields; a program's type coerces from the numeral type once at load), for the coordinator, before it goes to POSITIONS and a batch. Read-only: nothing in the tree was changed, built or committed. Sources: the brief, the Working Draft (`Specification-1.0-frozen/`), the record, the three reviews and the prototype of 2026-11-08. -->

# Judgement: the numeral design of 2026-11-08

## 1. Coherence

The design is one rule: a numeral converts where it stands, into the declared type, else into the machine default. Six cases get two answers or none; each has a repair.

- Undefined: what "fixes a type". Point 1 lists `Any`; the fork review adds `Object`, `Number` and an unbounded `T` (§1.1); the prototype defaulted at all (probe §1, step 2). Repair: a place fixes a type when its declared type declares a coercion from the numeral type (the eight number types; a program's type by point 4) or is a numeral type; every other type, and no type, takes the default. Then `f(3)` at `Number` is a `ZZ32`, and a tuple at `Any` defaults element by element.
- Two answers: "by its value" where the value is unknown. Row 946 shows it: a variable of numeral type reads `ZZ32` whatever its value. Inside `coerce(x: RadixPointNumeral)`, `t = x` is such an expression; so is a `nat` used as a value, whose value a template does not know (probe §8). Repair: the default applies to a numeral, a literal after the fold, never to an expression of numeral type; a `nat` used as a value has the type the Draft gives, `NN32` (`trait-parameters.tex:84-86`), or `ZZ32` (P-40), chosen once.
- Two answers: the fold against the fields. Point 4 reads the written numeral's four numbers; point 5 folds `7/2`, `-3` and `0.1 + 0.2` into "one numeral", which has no written form: the prototype made `1/3` a radix-3 numeral (probe §1, step 3), and a negative result has no `nat v`. Repair: the fold yields a constant with a sign, as the Draft's `IntegerConstant[\false, 3+5\]` has one (`constant.tex:49-52`): an integer constant defaults as an integer numeral, a quotient to `QQ`, one with a radix point to `RR64`; a program's coercion sees the four numbers of a written numeral only.
- Two answers: a static argument that several numerals fix. `<|3000000000, 0.5|>` is a `List[\RR64\]` if each numeral converts exactly into one instantiation, refused if each defaults first (`ZZ64` into `RR64` is written, P-74); an `if` join likewise. Repair: the narrowest default holding every value, `RR64` where any has a radix point, each converting into it exactly: the tie rule's form (`inference.tex:313-317`).
- Two answers: a program's type with no coercion from the numeral type. The prototype chained default and own coercion (probe §10, decision 3); the Draft says coercion does not chain (`conversions-coercions.tex:407-408`). Repair: refuse, or name the chain as the one exception.
- Undefined: "once per class, at load" as a semantics. For a reference object two evaluations of `c: CC64 = 3` become one object, which `SEQV` sees (`objects.tex:51-53`), and a raising coercion fails at load. Repair: a numeral at a program's type denotes one object, as a string literal does (P-171), or hoist value types only.
- One answer, for the record: `-3` is `-` on a numeral (`lexical-structure.tex:1053-1080`); folded, `-2147483648` fits `ZZ32` and `u: NN32 = -3` is refused. `x = 3` then `x` at `ZZ64` converts (P-74), at `NN32` is refused (fork §6.1), point 1's rule. `pi: RadixPointNumeral` (`Constants.fsi:16-17`) is refused by the fifth default and becomes `RR64`. Two numeral values inside a body: by P-168 value objects compare field by field, so `2.5` and `2.50` differ there, as the Draft's types differ; elsewhere both default and are `SEQV`.

## 2. Against the record

- Revised: P-76 (the name; "walk's half" once walk has static types, which the default makes walk's rule today; `IntLiteral`'s arithmetic, which the fold retires). P-172: the name; "Where nothing fixes a type ... the numeral stays an exact `FloatLiteral`: `Cell(0.5)` is a `Cell[\FloatLiteral\]`"; "prints a bare numeral as written, as the team's `tests/NumberPrintTest.fss:16` asserts", a team test that now breaks; its two open items close.
- Facts: F-79, F-57 (the checker's two types), F-169 (the text's `IntLiteral`), F-73 (the tie reading becomes the rule, floats included), F-74 (walk's numeral by value, a gap made the rule), F-118, F-262. P-169: the 24 numeral glue bindings and their carrier fall away (probe §4.5).
- Bent: P-26. The prelude keeps the numeral's type at every untyped place (fork §3.3), code "built alike for all its types"; the Draft's types are unfinished text (F-169), the names the implementers' later word. No team word calls them temporary (scout §10). The one team word for point 4: "IntLiterals should always be transient objects with minimal lifetime" (`compiler/runtimeValues/FIntLiteral.java:21-23`, 2009). The entry should own the weighing as the curator's.
- Unchanged: P-168, P-171, P-165 (a name only), P-49, P-46, P-40, P-74.

## 3. Against the Draft

- Kept as written: `literals.tex:25-26` (literals are values); `:141-148` (library designers decide by coercions; coercions to integers and rationals); `:163` (`3.125` is `3125/1000`, at a `QQ` place); `:170-173` (one rounding); `variables.tex:75` (the variable's type is the initializer's).
- Changed in form: `:83-129`, the four numbers as fields, `Numeral` the supertype, `Literal[\v\]` and the two `WithExplicitRadix` types folded into the radix field; `constant.tex:44-74`, a folded expression is a numeral, not a constant trait; `conversions-coercions.tex:98-101`, a conversion also where no type is declared, which that list excludes: the default is a rule beside coercion.
- Contradicted: `:132-141`, "not directly converted ... polymorphic ... may lose precision", at places that fix no type: `y = 3.1415926535897932384` then `q: QQ = y` is refused, `r32: RR32 = y` rounds twice (fork §6.1); the restart's `QQ`/`NN` (`literals.tick:25`, context by P-25).
- The binary chapter (`binary.tex:1601-1602`, `:1637-1640`): a coercion from `NaturalNumeral[\m,radix,v\]` `where { radix = 2^q, q DOT m = n DOT 2^bk }`, and `opr ||` into `LinearSequence[\BinaryWord[\b\], n+k\]`. Can give: the coercion into a word of written width, reading `radix` and the digit count at load and raising on a bad radix or width. Cannot give: the width `k` from the digit count as a static size, so `||` with a numeral has no static result type; `where` over the numbers (no built form, P-151).

## 4. The sub-choices

- `=` pairs stay and fold: follows from P-165 with point 1; without them `u = 0` for `u: NN32`, `NN64`, `RR32` falls to `SEQV`, `false` (probe §5, §9). "Fold" means: the pair's conversion of its numeral runs at compile time, as at any typed place.
- `gg(5, w)` takes the `ZZ32` declaration: follows from point 1 with P-49. Flips `InferO2Pos:18-19` and `inference.tex:186`.
- `x = 7/2` a `QQ`, a comparison of literals folds: conflicts with point 5 as prototyped (`7/2` → `RR64`, decision 4); coherent with repair 3, after which `1/2 = 0.5` is `true` through the kept pair and the comparison need not fold. The Draft (`:163-166`, a rational static expression), the restart and the library's `/` favour `QQ`.
- A numeral type written only as a coercion's or operator's parameter type: follows from point 4; must also cover inferred types (repair 2). Breaks 9 team and 10 revival tests that write `IntLiteral` (probe §4.3): a point to report.
- An expression of numerals folds exactly: free. The alternative, numeral types with no arithmetic, makes `3 + 4` `ZZ32` arithmetic and `2147483647 + 1` an overflow. The Draft (`:165-173`) and P-171's string fold favour the fold; it needs repair 3 and the prototype's exceptions (`-0.0`, `1/0`; decision 5).
- Strings: P-171, decided; independent of points 1 to 4.

## 5. The test cases

The appendix lists 42 programs with the design's answer, today's, and a mark: [P] the prototype measured it, [W] a review on walk, [R] by reading. Those that separate it from today: `x SEQV z` and `Cell(3)`, where the paths first agree; `"" 2.50` and `NumberPrintTest:16`, printing the double; `q: QQ = y` refused for `y = 0.1`; `g(bigN)` (row 946 closes); `z: ZZ32 = 3000000000`, static where the prototype left it at run time; the own-type cases; `C.8_16` round-tripped, which no path gives; microGPT, no line and no bit changed, by reading only (probe §4.7).

## 6. Open for the curator

- Out-of-range at a typed place: static (point 2) or run-time (the prototype).
- A program's type with no coercion from the numeral type: refused, or default then coerce.
- "Once per class": one object per site as a rule, or value types only.
- A `nat` used as a value: `NN32` (the Draft) or `ZZ32` (P-40).
- The fold's result: a signed constant with three defaults, or the Draft's constant traits.
- A numeral-typed value inside a coercion's body: bindable by inference, or only the parameter.
- `NumberPrintTest:16` and the 9 team tests writing `IntLiteral`: respelled, or kept red.
- `SEQV` of two numeral values: by fields (P-168) or by reduced value (probe §7.1).
- Walk before P-12: the float numeral defaults at evaluation (F-c) or converts place by place.
- The binary chapter's `||` with a numeral, and `constant.tex:84-87`'s numeral `||`: dropped, folded, or given a written size.

## Appendix: the test list and citations

Marks: [P] the prototype measured it (`literal-default.md` §2, §4.3, §4.4, §6); [W] a review measured it on walk (`literals-2026-11-08.md` §2, `literal-fork` §3.2, probe §6 U1-U5); [R] by reading. "Today" is walk / compiled (the prelude), or the one library's checker where named.

The defaults:
- `x = 3`: design `ZZ32`. Today walk `ZZ32` (class `Int`, row 364), compiled `IntLiteral`. [P]
- `y = 0.5`: `RR64`. Today `FloatLiteral` on both. [P]
- `bigN = 3000000000`: `ZZ64`. Today walk `ZZ64`, compiled `IntLiteral`. [P]
- `Cell(3)`: `Cell[\ZZ32\]`. Today walk `Cell[\Int\]`, compiled `Cell[\IntLiteral\]`. [P]
- `Cell(0.5)`: `Cell[\RR64\]`. Today `Cell[\FloatLiteral\]` on both. [P]
- `<|1, 2, 3|>`: `List[\ZZ32\]`. Today walk `ArrayList[\Int\]`, one library `List[\IntLiteral\]`. [P]
- `f(3)` at `Any`: `ZZ32`. Today walk `ZZ32`, compiled `IntLiteral`. [P]
- `3 SEQV z`, `x SEQV z` for `z: ZZ32 = 3`: `true`. Today walk `true`, compiled `false`. [P]
- `y SEQV w` for `w: RR64 = 0.5`: `true`. Today walk `true` (row 943), compiled `false`. [P]
- `1/2 = 0.5`: `true`, through `=(QQ, RadixPointNumeral)`. Today walk `false` (row 944). [P as `RR64 = RR64` by the fold; the design's route by reading]
- `x = 7/2`: `QQ` (sub-choice). Today one library `QQ`; prelude refused. [P gave `RR64`, against the sub-choice]
- `1 - b`, `b^2` for `b = 0.9`: `RR64`, no tie. Today walk and one library `RR64`; prelude refused. [P]
- `1.0 s` for `s: ZZ32`: `RR64` by the tie rule. Today `RR64` (F-58 once tied). [P]
- `3 + 4` at `Any`: `ZZ32` 7. Today compiled `IntLiteral` at run time. [P]
- `2^40`: `ZZ64`. Today compiled `IntLiteral`. [P]
- `2147483647 + 1`: `ZZ64` 2147483648 by the fold. Today compiled `IntLiteral` 2147483648 (F-118), walk `IntegerOverflow`. [R]
- `g(bigN)` for `g` over `ZZ32`, `NN32`, `ZZ64`: `g ZZ64`. Today compiled dies, "Not in range for ZZ32" (row 946). [P]
- `(3).zero`: `ZZ32`. Today `IntLiteral`. [P]

The typed places:
- `q: QQ = 0.1`: `1/10` exact. Today refused (row 944). [P, `q: QQ = 0.5`]
- `r: RR64 = 0.1`: the nearest double, once; `SEQV` a computed equal. Today walk keeps `FloatLiteral` (row 943); compiled rounds two or three times (row 862). [P]
- `z: ZZ32 = 3000000000`: a static error (point 2). Today compiled run-time error (F-57), walk refused at the binding when run (row 325). [P: run-time error kept]
- `0.77425264282026984` at `RR64`: `0.7742526428202698`. Today compiled `0.7742526428202697`; walk once. [P]
- `n: NN32 = 5`: 5. Today walk refused (row 454), compiled converts. [P compiled]
- `r32: RR32 = 0.1`: one rounding. Today refused on both (row 454). [P compiled; walk two roundings]
- `y = 0.1` then `q: QQ = y`: refused (`y` is `RR64`). Today refused (`FloatLiteral`). [P]

A program's own type (`value object CC64`, `Iv`, `BF16`, `Dec`):
- `3 + 4 i`: `CC64(3, 4)`, through `coerce(x: NaturalNumeral)` reading `v`, or through `RR64` operands. Today compiled `coerce(x: IntLiteral)` exact; walk exact. [P as built: via `coerce(x: ZZ32)`]
- `3.78 + 3.243 i`: the coercion reads `v = 378, m = 2` and `v = 3243, m = 3`; one rounding if `CC64` holds `RR64` parts. Today compiled hands a double (the prelude's `FloatLiteral` has only `asRR64`); walk hands the text. [P: `3.1415926535897932384` arrived as `RR64 3.141592653589793`]
- `Iv(0.1)`: encloses `1/10` between the neighbouring doubles from `v = 1, m = 1`. Today walk `[0.09999999999999999, 0.1]` from the text (U1); compiled a point. [W, P]
- `BF16(1.00390625000000000001)`: `0x3F81`, one rounding from the exact value, where the double rounds twice to `0x3F80`. Today walk `0x3F81` (U3), through the double `0x3F80` (U4); compiled the double. [W, P]
- `Dec(3.14159)` as `Dec(314159, 5)`: passes from `v` and `m`; `3.14150` keeps scale 5. Today neither path. [R, probe §7.1]
- `C.8_16` in, `"C.8_16"` out: passes from `n = 2, m = 1, r = 16, v = 200`; the written case is not kept. Today walk keeps the nearest double's text for radix 16 (`FFloatLiteral.java:28-31`); compiled a double. [R]

Equivalence by value:
- `0.1_2 SEQV 0.5`: `true` (both `RR64` 0.5). Today walk `true` by nearest doubles. [R]
- `0.1 = 0.1_16`: `false` (0.1 against 0.0625). [R]
- `2.5 SEQV 2.50`: `true`. Today walk `true` but prints apart (E1). [W]
- `"" 2.50`: `"2.5"`. Today walk `"2.50"`; compiled throws (row 362). [P: `XXXNumeralPrintRungR` prints `2.5`]
- `"" 3.1415926535897932384000000000001` (`NumberPrintTest:16`): `"3.141592653589793"`, the team's assert fails. Today walk passes. [P, walk suite after step 1]

Strings (P-171):
- `"ab" SEQV "ab"`: `true`. Today `false` on both (row 945). [W]
- `("a" || "b") SEQV "ab"`: `true`. Today `false` on both. [W]

microGPT (`MicroGptFlat.fss`, `MicroGptApl.fss`):
- `:17-18`, `:26-27`: six `ZZ32`; `epsilon`, `lr0`, `beta1`, `beta2`, `epsilon_A` `RR64`, `nSteps` `ZZ32`; `10.0^(-5)` folds to `0.00001`, the same double as `Math.pow(10.0, -5.0)` (one-picture, Appendix A). Today walk `Int`/`FloatLiteral`, one library `IntLiteral`/`FloatLiteral`. [R; the prototype stopped before the numerals]
- `:77-79`, APL `:106`: `1 - beta1`, `beta1^t`: `RR64`, no tie. Today `RR64`. [R]
- `:82`, APL `:112`: `1.0 s`: `RR64` by the tie rule. Today `RR64`. [R]
- `:59`, `:66`: `SQRT (1.0 headDim)`: `RR64` by the tie rule. Today `RR64`. [R]
- No line changes; the bits are unchanged (fork §5.1).

Citations by section:
- §1: fork §1.1, §3.7, §6.1; probe §1 steps 2-3, §8, §10 decisions 3, 5, 7, §7.1; row 946; `Specification-1.0-frozen/basic/trait-parameters.tex:84-86`; `constant.tex:49-52`; `conversions-coercions.tex:407-408`; `Specification/basic/inference.tex:313-317`; `Specification/basic/objects.tex:51-53`; `lexical-structure.tex:1053-1080`; `Library/Constants.fsi:16-17`; P-40, P-74, P-168, P-171.
- §2: P-76, P-172, P-169, P-26, P-165, P-168, P-171, P-49, P-46, P-40; F-57, F-73, F-74, F-79, F-118, F-169, F-262; fork §3.3; probe §4.5; scout's `numeral-names/evidence.md` §1.2, §3, §10; `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java:21-23`.
- §3: `Specification-1.0-frozen/basic/expressions/literals.tex:25-26`, `:83-129`, `:132-148`, `:163-173`; `constant.tex:44-74`, `:84-87`; `conversions-coercions.tex:98-101`; `variables.tex:75`; `advanced-lib/binary.tex:1601-1602`, `:1637-1640`; `Specification/basic-lib/numbers.tex:43`; `literals.tick:25`; P-25, P-151; fork §6.1.
- §4: P-165, P-49, P-171, P-74; probe §4.3, §5, §9, §10; `InferO2Pos.fss:18-19`; `Specification/basic/inference.tex:186`; `literals.tex:163-173`; `revival-changes.md`, "Numbers".
- §5: probe §2, §4.3, §4.4, §4.7, §6; `literals-2026-11-08.md` §2; one-picture, Appendix A; rows 325, 362, 364, 454, 862, 943, 944, 945, 946; F-57, F-58, F-118.

## Summary

Verdict: coherent with the changes named below; as stated, four cases get two answers and two are undefined.

The design's one rule, convert where the numeral stands, into the declared type or else the machine default, answers the ordinary cases alike on both paths. The changes it needs: define "fixes a type" as a declared type with a coercion from the numeral type; apply the default to numerals only, never to an expression of numeral type, and give a `nat` used as a value one type; let the fold yield a signed constant whose quotient defaults to `QQ`, so that `x = 7/2` stays a `QQ` and `-2147483648` fits `ZZ32`; instantiate a type parameter that several numerals fix at the narrowest default holding them all; say whether a program's type without a coercion from the numeral type is refused or chained; and state "once per class" as a rule about objects, or hoist value types only.

It revises P-76 and P-172 (the names, the exact-where-unfixed clause, printing as written), six facts, and bends P-26, which the entry should own as the curator's weighing: the team's one word for it is that literals "should always be transient objects". Against the Draft it keeps literals as values, coercions as the library's device and one rounding; makes the four numbers fields; and contradicts "not directly converted" at untyped places and the binary chapter's static width, which fields cannot feed.

The sub-choices follow from the points, except `x = 7/2`, which needs the fold repaired, and the fold itself, which is free and which the Draft favours. Forty-two programs pin the design; the prototype measured most compiled ones; microGPT changes no line and no bit, by reading only. Ten questions stay open.
