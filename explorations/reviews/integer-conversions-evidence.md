<!-- The evidence for a design decision the curator is weighing, a consistent set of conversions between the library's integer types with a checked form and a named truncating form, gathered 2026-10-31 by an Opus evidence worker, with no way chosen: every conversion between `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` in the one library and in the compiler prelude, each read from its glue class or body and run on a value that does not fit, laid out by pair of types; the history of each name, with its authors and what the specification and the Working Draft say of it; the authors' commit counts, periods and areas; the peers' pattern; and the ways, with the members, decisions and rungs each touches and microGPT's use. Tree: `main` at `6cc2bcd7b`, whose `Library/`, `ProjectFortress/LibraryBuiltin/`, `ProjectFortress/src/` and `Specification/` are those of `1f5c49b4f` (`git diff --stat 1f5c49b4f HEAD` over them is empty). The runs used a worktree seeded from `/home/user/fortress-base23` (`1f5c49b4f`) with private caches folders, removed afterwards; nothing in the original tree was edited. It builds on `explorations/reviews/widen-evidence.md` (row 502) and does not repeat what that note holds. -->

# Conversions between the integer types: the evidence

## 0. The question, and what this note holds

The question is the curator's, from the brief and the held list (`explorations/coordinator/HELD.md`, 09:2x, 09:3x and 09:5x of 2026-10-31):

- `narrow` and `widen` should behave alike across the integer types, by internal consistency and symmetry. Both forms, a checked one and a low-bits one, should exist under consistent names, with the gaps filled.
- He leans to Steele's later word, the checked `asZZ32` of 2011 (`9ce7d8189`), over Crink's naming of 2009 (`e1567d62f`, "named for consistency").
- He weighs provenance: who wrote a text, in what role, when, and whether anyone reviewed it.
- At 09:5x he leaned to deleting `ZZ`'s `narrow` and `widen` now, as incorrect code, rather than redesigning them. Explicit conversions out of `ZZ`, each in a low-bits form and a raising form, would come later.

The decisions near the question are these:

- P-72: `narrow` keeps the low 32 bits on `ZZ64` and `NN64`.
- P-73: fixed-width arithmetic raises `IntegerOverflow`, for "every operation whose result can leave its type".
- P-74: an exact conversion is implicit, and a conversion that can lose precision is written out.
- P-153: an integer power raises where the type cannot hold the result.

The questions still open:

- Row 502 (`widen` of a `ZZ`; review-queue item 20; PLAN item 31).
- PLAN's "Asked: a checked narrowing" (`explorations/coordinator/PLAN.md:71`).
- Row 856 (`signed` above the signed half wraps).

This note sets out the inventory (section 1), the history by name (2), the authors (3), the peers (4), the ways (5), what is missing (6) and what is new to the record (7). It recommends nothing.

Words used below:

- **Keeps the low bits.** The result is the value of the target type that is congruent to the argument modulo 2^n, where n is the target's width. For a change of sign at the same width, this is the same bit pattern read with the other sign, as with `unsigned(-1)`.
- **Raises.** The conversion throws `IntegerOverflow`, which a `catch` sees.
- **Exact.** Every value of the source type is a value of the target type.

## 1. The inventory

### 1.1 The one library, by owner type

Under "Not fitting" the table gives the behaviour read from the glue class or body. Under "Walk" it gives the result of the runs in 1.6, each on a value that the target does not hold where one exists. "fsi" is `Library/FortressLibrary.fsi` and "fss" is `Library/FortressLibrary.fss`, unless a row names `FortressBuiltin`. The glue classes are in `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`, and the helpers in `.../nativeHelpers/`.

| Owner | Member (api) | Target | Binding | Not fitting | Walk |
|---|---|---|---|---|---|
| `ZZ32` | `widen(self)` (fsi:586) | `ZZ64` | helper `simpleLongArith.intToLong`, `(long)i` (fss:805-806; `simpleLongArith.java:286-288`) | cannot happen | `widen(-1)` = -1, `widen(MIN)` = -2147483648 : `ZZ64` |
| `ZZ32` | `unsigned(self)` (fsi:588) | `NN32` | helper `simpleUnsignedIntArith.makeNN32FromZZ32WithSpecialCompilerHackForNN32ResultType`, which returns its `int` (fss:809-810; `simpleUnsignedIntArith.java:230`) | keeps the bits | `unsigned(-1)` = 4294967295, `unsigned(MIN)` = 2147483648 : `NN32` |
| `ZZ32` | `narrow(self)` (fsi:589) | `ZZ32` | `= self` (fss:811) | identity | `narrow(MAX)` = 2147483647 |
| `ZZ32` | `big(self)` (fsi:590) | `ZZ` | glue `Long$ToBigNum`, `BigInteger.valueOf` (fss:812-813; `Long.java:256-260`) | cannot happen | `big(MIN)` = -2147483648 : `ZZ` |
| `ZZ64` | `narrow(self)` (fsi:645) | `ZZ32` | glue `Long$FromLong`, `(int) x` (fss:900-901; `Long.java:250-254`) | keeps the low 32 bits (P-72) | 2^32+5 → 5; -(2^31)-1 → 2147483647; MAX → -1; MIN → 0 |
| `ZZ64` | `widen(self)` (fsi:646) | `ZZ64` | `= self` (fss:906) | identity | MAX → MAX |
| `ZZ64` | `unsigned(self)` (fsi:647) | `NN64` | glue `Long$ToUnsignedLong`, which returns its `long` (fss:902-903; `Long.java:244-248`) | keeps the bits | -1 → 18446744073709551615; MIN → 9223372036854775808 : `NN64` |
| `ZZ64` | `big(self)` (fsi:648) | `ZZ` | glue `Long$ToBigNum` (fss:904-905) | cannot happen | MIN → -9223372036854775808 : `ZZ` |
| `NN32` | `widen(self)` (`FortressBuiltin.fsi:171`) | `NN64` | glue `NN32$ToUnsignedLong`, `Unsigned.toLong`, zero-extending (`FortressBuiltin.fss:465-466`; `NN32.java:245-249`) | cannot happen | 2^32-1 → 4294967295 : `NN64` |
| `NN32` | `signed(self)` (`FortressBuiltin.fsi:173`) | `ZZ32` | glue `NN32$ToInt`, which returns its `int` (`FortressBuiltin.fss:469-470`; `NN32.java:239-243`) | keeps the bits (row 856) | 2^32-1 → -1; 2^31 → -2147483648 : `ZZ32` |
| `NN64` | `narrow(self)` (fsi:532) | `NN32` | glue `UnsignedLong$FromLong`, `(int) x` (fss:983-984; `UnsignedLong.java:245-249`) | keeps the low 32 bits (P-72) | 2^64-1 → 4294967295; 2^32+5 → 5 : `NN32` |
| `NN64` | `signed(self)` (fsi:533) | `ZZ64` | glue `UnsignedLong$ToLong`, which returns its `long` (fss:985-986; `UnsignedLong.java:239-243`) | keeps the bits (row 856) | 2^64-1 → -1; 2^63 → -9223372036854775808 : `ZZ64` |
| `ZZ` | `narrow(self)` (fsi:698) | `ZZ32` | glue `BigNum$ToZZ32`, `x.intValue()` (fss:1080-1081; `BigNum.java:286-290`) | keeps the low 32 bits | 2^32+5 → 5; 2^64+5 → 5; -(2^63)-1 → -1 |
| `ZZ` | `widen(self)` (fsi:699) | `ZZ64` | glue `BigNum$ToZZ64`, `x.longValue()` (fss:1082-1084; `BigNum.java:292-296`) | keeps the low 64 bits (row 502) | 2^64+5 → 5; -(2^63)-1 → 9223372036854775807 |
| all five | `numerator(self)` (fsi:531, :585, :644, :697; `FortressBuiltin.fsi:170`) | `ZZ` | `do z: ZZ = self; z end`, or `= self` on `ZZ` (fss:815, :908, :988, :1005; `FortressBuiltin.fss:472`) | cannot happen | `ZZ32` -1 → -1 : `ZZ`; `NN64` 2^64-1 → 18446744073709551615 : `ZZ` |
| `IntLiteral` | getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64`, `asZZ` (`FortressBuiltin.fsi:182-186`) | each | glue `IntLiteral$ToZZ32` and its siblings (`FortressBuiltin.fss:489-498`; `IntLiteral.java:262-298`) | the four fixed-width getters end the run with a `ProgramError`, "Value … does not fit in ZZ32.", which no `catch` sees; `asZZ` cannot fail | not run: under walk no numeral is an `IntLiteral` (P-76) |

The coercions, which convert implicitly (P-74), are all exact and declared on the wider type:

- `ZZ64` from `ZZ32` (`widen(x)`), from `NN32` (`signed(widen(x))`) and from `IntLiteral` (`x.asZZ64`) (fsi:596-598; fss:821-823).
- `NN64` from `NN32` (`widen(x)`) and from `IntLiteral` (fsi:492-493; fss:914-915).
- `ZZ` from `ZZ32` and `ZZ64` (`big(x)`), from `NN32` (`big(signed(widen(x)))`), from `NN64` (`big(signed(x))`, plus 2^64 when the result is negative) and from `IntLiteral` (fsi:654-658; fss:994-1001).
- `ZZ32` and `NN32` coerce only from `IntLiteral` (fss:733; `FortressBuiltin.fss:388`).
- Measured at typed bindings (1.6): `NN32` 2^32-1 into `ZZ64`, `NN64` and `ZZ`; `NN64` 2^64-1 into `ZZ` (18446744073709551615); the `ZZ32` minimum into `ZZ64`; the `ZZ64` minimum into `ZZ`. Every result was exact.
- Three coercion bodies go through `signed`, and `ZZ`'s coercion from `NN64` corrects `signed`'s change of sign by adding 2^64 (fss:822, :996-1000). A change to what `signed` does changes these bodies too (5.2, way B).

No conversion raised. In the same run the control `ZZ32 MAX + 1` raised a caught `IntegerOverflow`, so the probe's `catch` worked.

The name `narrow` is also used outside the integers. `RR64`'s `narrow(self): RR32` rounds to the 32-bit float (fss:527; `FortressBuiltin.fss:77`, glue `Float$Narrow`).

### 1.2 Calls on a type that lacks the member

Walk chooses by run-time type and converts an argument by coercion (P-59). So a conversion called on a type that does not declare it goes to whichever declaration the argument coerces into, or the call fails. Each call below ran as its own program (1.6).

| Call, under walk | Result | Route |
|---|---|---|
| `big` of the `NN32` 2^32-1 | 4294967295 : `ZZ` | `NN32` coerces into `ZZ64`, then `ZZ64`'s `big` |
| `big` of an `NN64` | "Failed to find any matching overload" | `NN64` coerces into neither `ZZ32` nor `ZZ64` |
| `big` of a `ZZ` | the same refusal | `ZZ` declares no `big` |
| `unsigned` of the `NN32` 2^32-1 | 4294967295 : `NN64` | `NN32` coerces into `ZZ64`, then `ZZ64`'s `unsigned`: a widening |
| `unsigned` of an `NN64`, of a `ZZ` | refusal | |
| `signed` of a `ZZ32`, a `ZZ64`, a `ZZ` | refusal | |
| `narrow` of an `NN32` | "Ambiguous coercion" among `ZZ64`'s, `NN64`'s and `ZZ`'s `narrow` | three declarations apply by coercion and none is more specific (`revival-changes.md`, "Arguments convert") |
| `widen` of the `NN64` 2^64-1 | -1 : `ZZ64` | `NN64` coerces into `ZZ`, then `ZZ`'s `widen` keeps the low 64 bits: a silent change of sign |
| `numerator` of the `NN64` 2^64-1 | 18446744073709551615 : `ZZ` | declared |

Ledger row 858 records `widen` of an `NN64`, and row 859 the conversions that the five types do not all declare.

For each call except `narrow` of an `NN32`, a single declaration applies by coercion. So, by reading, the checker's static choice would be the same declaration. This was not run compiled, because the compiler prelude has none of these routes and the one library compiles only after the switch-over.

### 1.3 By pair of types, in the one library

The rows are the source types and the columns the target types:

| from \ to | `ZZ32` | `ZZ64` | `NN32` | `NN64` | `ZZ` |
|---|---|---|---|---|---|
| `ZZ32` | — | coercion; `widen` (exact) | `unsigned` (bits) | **none** | coercion; `big`; `numerator` (exact) |
| `ZZ64` | `narrow` (low 32) | — | **none** | `unsigned` (bits) | coercion; `big`; `numerator` (exact) |
| `NN32` | `signed` (bits) | coercion (exact); `big` and `unsigned` reach it only by coercion | — | coercion; `widen` (exact) | coercion; `numerator` (exact); `big` by coercion |
| `NN64` | **none** | `signed` (bits); `widen` by coercion through `ZZ` (low 64) | `narrow` (low 32) | — | coercion; `numerator` (exact) |
| `ZZ` | `narrow` (low 32) | `widen` (low 64) | **none** | **none** | — |

The counts:

- Of the 20 ordered pairs, 7 are exact. Each of the 7 has a coercion, which is the revised integer chapter's list (`Specification/basic-lib/basic-integers.tex:23-37`), and four of them also have an explicit name (`widen` twice, `big` twice).
- The other 13 pairs can lose the value, and 8 of them have a member:
  - 4 keep the low bits by width: three `narrow`s, and `ZZ`'s `widen`;
  - 4 keep the bits across a change of sign: two `signed`s and two `unsigned`s.
- The other 5 have no member: `ZZ32` → `NN64`, `ZZ64` → `NN32`, `NN64` → `ZZ32`, `ZZ` → `NN32` and `ZZ` → `NN64`.
- All 8 members keep the low bits. None raises. The one library has no checked conversion between integer types, apart from `IntLiteral`'s run-ending numeral checks.

A missing pair has to be written as a composition, and the order changes the value. `ZZ32` → `NN64` is `unsigned(widen(x))`, the low 64 bits (-1 gives 2^64-1). It is also `widen(unsigned(x))`, the zero-extension of the 32 bits (-1 gives 2^32-1). Rung W's test asserts both at -1, "where they part company (4294967295 against 18446744073709551615)" (`explorations/compile-ladder/rung-int-conversions/REPORT.md`, "The failing test, and the pass").

### 1.4 What each name means, type by type

| Name | `ZZ32` | `ZZ64` | `NN32` | `NN64` | `ZZ` | `RR64` |
|---|---|---|---|---|---|---|
| `narrow` | identity | → `ZZ32`, low 32 | none (ambiguous by coercion) | → `NN32`, low 32 | → `ZZ32`, low 32 (past `ZZ64`) | → `RR32`, rounds |
| `widen` | → `ZZ64`, exact | identity | → `NN64`, exact | none (by coercion → `ZZ64`, low 64) | → `ZZ64`, low 64: a narrowing | — |
| `big` | → `ZZ`, exact | → `ZZ`, exact | none (by coercion, exact) | refused | refused | — |
| `signed` | refused | refused | → `ZZ32`, bits | → `ZZ64`, bits | refused | — |
| `unsigned` | → `NN32`, bits | → `NN64`, bits | none (by coercion → `NN64`, exact) | refused | refused | — |

So the names mean these targets:

- `narrow`: the 32-bit type of the same sign.
- `widen`: the 64-bit type of the same sign. It widens from `ZZ32` and `NN32` and narrows from `ZZ`, and from an `NN64` by coercion. The comment on `ZZ`'s declaration says as much: "This routine, named for consistency, converts to a ZZ64" (fss:1082).
- `big`: `ZZ`.
- `signed` and `unsigned`: the other sign at the same width.

All five are functional methods, so every program that imports the library has their names reserved. A local variable named `narrow` is refused with "Variable narrow is already declared.", and so is one named `truncate`, which `Integral` and the float types already declare. A local named `asZZ32` runs, because a getter is dotted and reserves nothing (1.6).

### 1.5 The compiler prelude

The bodies are in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, cited as "prelude:N", and the api lines in `CompilerBuiltin.fsi`. The compiled results are from the run in 1.6.

| Owner | Member | Target | Body | Not fitting | Compiled run |
|---|---|---|---|---|---|
| `ZZ64` (prelude:578-661) | `coerce(x: ZZ32)` (:580), `coerce(x: IntLiteral)` (:579) | — | `jIntToLong(x)`, `x.asZZ64` | cannot happen | |
| `ZZ64` | getter `asZZ32` (:581) | `ZZ32` | `jLongOverflowingToInt(self)` (`simpleIntArith.java:94-98`) | **raises** | 2^32+5 and -(2^31)-1 raise; -1 → -1 |
| `ZZ64` | getter `asZZ` (:582) | `ZZ` | `jMakeZZfromZZ64` | cannot happen | 2^32+5 → 4294967301 |
| `ZZ64` | getter `bitsAsNN64` (:583) | `NN64` | `jMakeNN64FromZZ64` | keeps the bits | |
| `ZZ64` | `narrow(self)` (:659) | `ZZ32` | `jLongWrappingToInt(self)` | keeps the low 32 bits | 2^32+5 → 5; -(2^31)-1 → 2147483647 |
| `ZZ64` | `unsigned(self)` (:660) | `NN64` | `jMakeNN64FromZZ64(self)` | keeps the bits | -1 → 18446744073709551615 |
| `ZZ32` (prelude:663-752) | `coerce(x: IntLiteral)` (:664); getter `asZZ32` (:665) | — | `x.asZZ32`; `self` | identity | |
| `ZZ32` | getter `asZZ64` (:666) | declared `ZZ32` | `self` | identity | in the component only, not in the api (fsi:210-213), and typed `ZZ32` |
| `ZZ32` | getter `asZZ` (:667), getter `bitsAsNN32` (:668) | `ZZ`, `NN32` | `jMakeZZfromZZ32`, `jMakeNN32FromZZ32` | exact; keeps the bits | |
| `ZZ32` | `widen(self)` (:750), `unsigned(self)` (:751) | `ZZ64`, `NN32` | `jIntToLong`, `jMakeNN32FromZZ32` | exact; keeps the bits | `unsigned(-1)` = 4294967295; `signed(unsigned(-1))` = -1 |
| `NN32` (prelude:754-817) | `coerce(x: IntLiteral)`; getters `asNN32` (= `self`), `asZZ`, `bitsAsZZ32` (:755-758) | — | | exact; keeps the bits | |
| `NN32` | `widen(self)` (:815), `signed(self)` (:816) | `NN64`, `ZZ32` | zero-extends; `jMakeZZ32FromNN32` | exact; keeps the bits | |
| `NN64` (prelude:819-881) | `coerce(x: IntLiteral)`, `coerce(x: NN32)`; getters `asNN64` (= `self`), `asZZ`, `bitsAsZZ64` (:820-824) | — | | exact; keeps the bits | |
| `NN64` | `narrow(self)` (:879), `signed(self)` (:880) | `NN32`, `ZZ64` | `jLongWrappingToUnsignedInt`; `jMakeZZ64FromNN64` | keeps the low 32 bits; keeps the bits | |
| `ZZ` (prelude:517-; fsi:103-145) | `coerce` from `IntLiteral`, `ZZ32`, `ZZ64`, `NN32` and `NN64` (:518-522) | — | `x.asZZ` | cannot happen | no conversion out of `ZZ` (row 349) |
| `IntLiteral` (fsi:390-395) | getters `asZZ`, `asZZ32`, `asZZ64`, `asNN32`, `asNN64` | each | run time `FIntLiteral.java:63-95` | Java `Error` "Not in range for ZZ32: …" | |

Pairs in the prelude:

| from \ to | `ZZ32` | `ZZ64` | `NN32` | `NN64` | `ZZ` |
|---|---|---|---|---|---|
| `ZZ32` | — | coercion; `widen` | `unsigned`; `bitsAsNN32` | none | coercion; `asZZ` |
| `ZZ64` | `narrow` (low 32); **`asZZ32` (raises)** | — | none | `unsigned`; `bitsAsNN64` | coercion; `asZZ` |
| `NN32` | `signed`; `bitsAsZZ32` | none (row 442) | — | coercion; `widen` | coercion; `asZZ` |
| `NN64` | none | `signed`; `bitsAsZZ64` | `narrow` (low 32) | — | coercion; `asZZ` |
| `ZZ` | none | none | none | none | — |

What the prelude shows:

- `ZZ64` → `ZZ32` has two members with two behaviours: `narrow` keeps the low bits and `asZZ32` raises.
- Each change of sign has two names with one behaviour: `signed` and `unsigned` from 2026, `bitsAs…` from 2012.
- At the team's last commit `a874948ac`, the prelude declared no `narrow`, `widen`, `signed` or `unsigned` (`git show a874948ac:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, 0 such declarations). Rung W added them (`d98024425`).
- So the team's own last prelude had a raising conversion under a plain name (`asZZ32`) and the changes of sign under a name about bits (`bitsAs…`). It gave no Fortress name to the low bits.

The prelude imports these `long`-to-`int` natives (prelude:33-58, :86-103):

| Native | Use past the import |
|---|---|
| `jLongOverflowingToInt` | once, `asZZ32` |
| `jLongWrappingToInt` | once, `narrow` |
| `jLongWrappingToUnsignedInt` | once, `NN64`'s `narrow` |
| `jLongLowHalfToInt` | shift counts, 17 occurrences |
| `jLongToInt`, `jLongHighHalfToInt`, `jLongMaskedToInt`, `jLongSaturatingToInt`, `jLongOverflowingToUnsignedInt`, `jLongSaturatingToUnsignedInt` | none: each occurs once, at its import (`grep -c` over the file) |

### 1.6 The runs

- **Setup.** The `fortress-repo` skill's setup lines, with `FORTRESS_THREADS=1`. The worktree `/home/user/fortress-convinv` was made by `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base23 /home/user/fortress-convinv -` (detached at `1f5c49b4f`). The probes were in its `tmp/probe/`, and each run had a private caches folder under its `tmp/` (`FORTRESS_CACHES=$PWD/tmp/pcaches`). The worktree was removed afterwards.
- **The values (1.1).** `ConvValues.fss` binds each value by type and calls each conversion through `show`. `show` prints the result with its run-time type, or "-> IntegerOverflow":

      kind(v: Any): String =
        typecase v of
          ZZ32 => "ZZ32"
          ZZ64 => "ZZ64"
          NN32 => "NN32"
          NN64 => "NN64"
          ZZ => "ZZ"
          else => "other"
        end

      show(what: String, f: () -> Any): () =
        try
          v = f()
          println(what " = " v " : " kind(v))
        catch e
          IntegerOverflow => println(what " -> IntegerOverflow")
        end

  - The values are made this way, because walk refuses a numeral at an `NN32` or `NN64` binding (row 454): `zMOne: ZZ32 = -1`, `zMin: ZZ32 = -2147483647 - 1`, `lMin: ZZ64 = -9223372036854775807 - 1`, `l2p32p5: ZZ64 = 4294967301`, `nAll: NN32 = unsigned(zMOne)`, `mAll: NN64 = unsigned(widen(zMOne))`, `mHalf: NN64 = unsigned(lMin)`, `b2p64p5: ZZ = 18446744073709551621` (a `ZZ` under walk, P-76) and `bBelow: ZZ = -9223372036854775809`.
  - The calls are of the form `show("narrow(ZZ64 2^32+5)", fn () => narrow(l2p32p5))`, with one call for each row of 1.1. The coercions are typed bindings such as `c3: ZZ = mAll`.
  - `cd tmp/probe && ../../bin/fortress ConvValues.fss` gave rc=0. From its 35 result lines:

        narrow(ZZ64 MAX) = -1 : ZZ32
        unsigned(ZZ64 -1) = 18446744073709551615 : NN64
        signed(NN64 2^64-1) = -1 : ZZ64
        narrow(ZZ -(2^63)-1) = -1 : ZZ32
        widen(ZZ -(2^63)-1) = 9223372036854775807 : ZZ64
        ZZ binding of NN64 2^64-1 = 18446744073709551615 : ZZ
        ZZ32 MAX + 1 -> IntegerOverflow
- **The calls of 1.2.** One program per call. Each was run as `bin/fortress <Name>.fss` from the probe folder, with the private caches folder. The whole program for `widen` of an `NN64`, `RWidenNN64.fss`:

      component RWidenNN64
      export Executable
      kind(v: Any): String =
        typecase v of
          ZZ32 => "ZZ32"
          ZZ64 => "ZZ64"
          NN32 => "NN32"
          NN64 => "NN64"
          ZZ => "ZZ"
          else => "other"
        end
      run() = do
        zMOne: ZZ32 = -1
        zMin: ZZ32 = -2147483647 - 1
        lMOne: ZZ64 = widen(zMOne)
        lMin: ZZ64 = -9223372036854775807 - 1
        nAll: NN32 = unsigned(zMOne)
        mAll: NN64 = unsigned(lMOne)
        b2p64p5: ZZ = 18446744073709551621
        bSmall: ZZ = big(zMOne)
        v = widen(mAll)
        println("widen(mAll) = " v " : " kind(v))
      end
      end

  The other programs differ only in the component's name and in the call on the line `v = …` and in the printed text: `RUnsignedNN32` with `unsigned(nAll)`, `RNarrowNN32` with `narrow(nAll)`, `RBigNN32` with `big(nAll)`, `RBigNN64` with `big(mAll)`, `RBigZZ` with `big(bSmall)`, and the same for `signed` and the rest of 1.2. From the outputs (the refusals end with rc=1, the others rc=0):

      widen(mAll) = -1 : ZZ64
      unsigned(nAll) = 4294967295 : NN64
      big(nAll) = 4294967295 : ZZ
      RNarrowNN32.fss:21:7-17: Ambiguous coercion, args = (4294967295: NN32), applicable with coercion = {coerced narrow ... ZZ64->ZZ32, coerced narrow ... NN64->NN32, coerced narrow ... ZZ->ZZ32}
      RBigNN64.fss:21:7-14: Failed to find any matching overload, args = (18446744073709551615: NN64), overload = { big(...) ZZ32->ZZ ..., big(...) ZZ64->ZZ ...}
      RBigZZ.fss:21:7-16: Failed to find any matching overload, args = (-1:ZZ), overload = { big(...) ZZ32->ZZ ..., big(...) ZZ64->ZZ ...}
- **Reserved names (1.4).** Each program has a single line `<name>: ZZ32 = 3` in `run`, followed by a print. For `asZZ32` the run printed "a local named asZZ32 = 3". For `narrow` and `truncate` the run was refused: "Variable narrow is already declared.", "Variable truncate is already declared."
- **The compiled run of the prelude (1.5).** `CompiledConv.fss` was run with the worktree's caches copied to a private folder (`FORTRESS_CACHES=$PWD/tmp/ccaches`): `bin/fortress compile CompiledConv.fss` (rc=0), then `bin/fortress run CompiledConv` (rc=0). The checked getter is called through `overflowsZZ32(f: () -> ZZ32)`, in the `try … catch e IntegerOverflow => true; Exception => false end` form of `library_tests/Integer3.fss:17-24`:

      narrow(ZZ64 2^32+5) = 5
      narrow(ZZ64 -(2^31)-1) = 2147483647
      unsigned(ZZ64 -1) as ZZ = 18446744073709551615
      unsigned(ZZ32 -1) as ZZ = 4294967295
      signed(unsigned(ZZ32 -1)) = -1
      (ZZ64 2^32+5).asZZ32 overflows: true
      (ZZ64 -(2^31)-1).asZZ32 overflows: true
      (ZZ64 -1).asZZ32 = -1
      (ZZ64 2^32+5).asZZ = 4294967301
- **Who reaches `ZZ`'s `narrow` and `widen` in a gated test (5.2, way E).**
  - Method: copies of `Library/FortressLibrary.fss` and `.fsi` were put in a scratch folder, because walk's source path reads the current directory first. In the copy, `ZZ`'s two bindings were renamed `zzNarrowRaw` and `zzWidenRaw`, and `narrow(self):ZZ32 = do println("ZZ-NARROW " self); zzNarrowRaw(self) end` was put beside them, with the same form for `widen`.
  - The run: the gated `ProjectFortress/tests/formatTest.fss` was run from that folder with its own private caches. The cached tree of `FortressLibrary` named the copy's path.
  - Result: 60 `ZZ-WIDEN` lines (values from -214748364 to 0), 16 `ZZ-NARROW` lines (values 0 to 3), `EXIT=0`. The calls come from `Library/Format.fss:70` (`widen(|/(val / base)\|)`) and `:117`, `:122` (`narrow(|\((|num|)-1) / nth/|)`), where the bracket of a `QQ` answers `ZZ` (fsi:435).

## 2. The history, by name

### 2.1 Method

- For each name and each of the files `Library/FortressLibrary.fss`, `.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `.fsi`, `CompilerBuiltin.fss`, `.fsi`, and `ProjectFortress/FortressLibrary.fss` and `.fsi` (the library's place before `1d2680d4d`):
  - The search: `git log --full-history -S <name> --format='%h' a874948ac -- <file>`, with the 147 parentless snapshots (`git rev-list --max-parents=0 a874948ac`) set aside.
  - Each commit's added and removed lines holding the name were then read (`git show --format= <commit> -- <file>`).
- `-S` counts occurrences, so it misses a commit that moves a declaration. The declaration forms were therefore searched too, as `-S 'narrow(a:ZZ64)'` and `-S 'widen(self):ZZ64'`, and the contents compared.
- A merge whose second parent the conversion cut, such as `f85e96424`, shows its new lines as its own. For such lines, the snapshots were searched by content for the first that holds them: `git show <snapshot>:<file> | grep -c <text>` over the snapshots in date order.
- The revival's commits come from `git log -S <name> a874948ac..HEAD` on the same files.
- Names: the commit's author field, and for the user names of the SVN era the identity key of `research/authorship.md:34-70`.

### 2.2 The one library

| Name, owner → target | Declared by | Later changes |
|---|---|---|
| `narrow`, `ZZ64` → `ZZ32` | Present in the record's first commit, `72ae6881b` (2007-01-04, `jm143038`, Jan-Willem Maessen), as the top-level `narrow(a:ZZ64):ZZ32` bound to `Int$FromLong`, which was `Int.rc(x)`. `Int.rc` threw `ProgramError("Overflow of ZZ32 "+i)` (`72ae6881b:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:162-168`). The record begins in 2007-01, so the declaration may be older. | Moved into the traits by Maessen, `dc0f919ce` (2008-05-08). Still checked, with a run-ending error, at `a874948ac` (`Long.java:237-241`, `Int.java:239-245` there). The revival made the error catchable (`413f36ac0`, row 347), then made the conversion keep the low 32 bits by P-72 (`d6faad28f`, 2026-09-24). |
| `narrow`, `NN64` → `NN32` | Steele, `dc41d5000` (2008-07-21, `gls`; his first commit in the record), glue `(int) x`. The same commit's `ProjectFortress/tests/UnsignedTest.fss:210-211` asserts the low 32 bits at 2^64-1 and 2^63. | Glue unchanged. Its helper is known (`simpleUnsignedIntArith.longWrappingToUnsignedInt`, `explorations/compile-ladder/plan-23/probes/classified-base.tsv`), and climb batch 24's record names no rung for it. |
| `narrow`, `ZZ` → `ZZ32` | Crink, `e1567d62f` (2009-09-10), reverted by Crink as `02e648434` the same day, reinstated as `8d2eb48f5` (2009-09-11); `x.intValue()`. | Unchanged to today. |
| `narrow`, `ZZ32` → `ZZ32` (identity) | The revival, `d846e3644` (2026-09-27). Before it, `ZZ32` extended `ZZ64` and inherited `ZZ64`'s `narrow` (`a874948ac:Library/FortressLibrary.fsi:461`). | |
| `widen`, `ZZ32` → `ZZ64` | Present in `72ae6881b` (2007-01-04), the top-level `widen(a:ZZ32):ZZ64`, glue `Long$ToLong`. Maessen's doc comment "widen converts a ZZ32 into a valid ZZ64 quantity." came in `29765a8e4` (2008-03-28) and went with the move into the traits (`dc0f919ce`). | A method of `trait ZZ32` from `fca589bbb` (Maessen, 2008-07-15). Moved onto a helper by climb batch 23 (`640acb4a1`). |
| `widen`, `NN32` → `NN64` | Steele, `dc41d5000`. | |
| `widen`, `ZZ` → `ZZ64` | Crink, in the same three commits as `ZZ`'s `narrow`, with the comment "This routine, named for consistency, converts to a ZZ64". | Unchanged to today. |
| `widen`, `ZZ64` → `ZZ64` (identity) | The revival, `d846e3644`. Before it, `ZZ64` extended `ZZ` and inherited `ZZ`'s `widen` (`widen-evidence.md`, 2.1). | |
| `big`, `ZZ64` → `ZZ` | Christine Flood (`chf`), `25acd32f7` (2008-07-10, "Oh Man: Rest of bignum putback"), glue `Long$ToBigNum`. `ZZ32`, then a subtype of `ZZ64`, inherited it. | `ZZ32`'s own `big` came with the revival's `d846e3644`. |
| `signed`, `NN32` → `ZZ32` and `NN64` → `ZZ64` | Steele, `dc41d5000`. `NN64`'s was declared `: NN64` while its glue answered a `ZZ64`. | The revival corrected the declaration (`a1b5c253d`; rows 345 and 439). The binding is to move onto a helper in climb batch 24's rung S; row 856 holds the change of sign. |
| `unsigned`, `ZZ32` → `NN32` and `ZZ64` → `NN64` | Steele, `dc41d5000` (`ZZ64`'s was declared on `trait Integral` in the api, `a874948ac:Library/FortressLibrary.fsi:431`). | `ZZ32`'s moved onto a helper (`640acb4a1`). |
| the coercions between integer types | The revival: `d846e3644` (the flat tower, P-43, P-74), and `9d2e4c856` for those from `IntLiteral` (P-76). Before them the integer types nested, `ZZ32` under `ZZ64` under `ZZ` and `NN32` under `NN64` under `ZZ` (`a874948ac:Library/FortressLibrary.fsi:434`, `:461`, `:495`, `:533`), and needed no coercion. | |
| `IntLiteral`'s `asZZ32`, `asZZ64`, `asNN32`, `asNN64`, `asZZ` | The revival, `9d2e4c856` (2026-10-02), after the prelude's names. The team's `object IntLiteral extends ZZ32` declared none (`a874948ac:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:461`). | |
| `narrow`, `RR64` → `RR32` | Sukyoung Ryu, `dbab4b661` (2008-07-09, "Implemented RR32 with Guy"). | |

### 2.3 The compiler prelude

| Name, owner → target | Declared by | Later changes |
|---|---|---|
| `asZZ32`, `ZZ64` → `ZZ32` | Maessen, `8bcdc8756` (2009-08-18), the method `asZZ32(): ZZ32 = jLongToInt(self)`. `longToInt` is `(int)l` (`simpleIntArith.java:55-57`), which keeps the low bits. A getter from `128f313b5` (Maessen, 2009-11-17). | Steele, `9ce7d8189` (2011-09-08, "New test Integer3 (has try-catch problems)"), changed the body to `jLongOverflowingToInt(self)`: it raises. The same commit wrote `longOverflowingToInt`, `longWrappingToInt` and `longSaturatingToInt` in `simpleIntArith.java`, imported all three, and bound only the Overflowing one. It made `+`, `-`, `·`, `DIV`, negation and absolute value on `ZZ32` and `ZZ64` checked, and added `library_tests/Integer3.fss` with its `shouldOverflow`. |
| `asZZ`, on `ZZ32`, `ZZ64`, `NN32`, `NN64` | Steele, `304f2743a` (2012-06-12, "… getter asZZ for ZZ32, ZZ64, NN32, NN64, and coercions from those four types to ZZ"). | |
| `IntLiteral`'s `asZZ32`, `asZZ64`, `asNN32`, `asZZ` | Maessen, `128f313b5` (2009-11-17, "ZZ32 now coerces IntLiteral as described in the spec"). | `asNN64`: Jean-Baptiste Tristan, `b22c4ac56` (2012-01-03, "Adds data types ZZ and NN64"). |
| `bitsAsNN32`, `bitsAsNN64`, `bitsAsZZ32`, `bitsAsZZ64` | First present in Steele's snapshot `e177c3e2c` (2012-05-22). They are absent from Claire Alvis's `971c013f4` of the same day and from every earlier snapshot. They reached the trunk through Karl Naden's merge `f85e96424` (2012-05-30), whose second parent the conversion cut, so `-S` names that merge. | Used by Steele's `ShiftTest2` (`e6f04f2b1`, 2012-05-23) and `library_tests/AverageTest.fss:109-110`. |
| `asZZ64(): ZZ32 = self` on `ZZ32` | First in the same snapshot `e177c3e2c`, by the same route. | |
| coercions | `ZZ32` from `IntLiteral`: Maessen, `128f313b5`. `ZZ64` from `ZZ32` and from `IntLiteral`: Eric Allen, `2ef730c88` (2010-01-06, "Added numeric coercions to libraries."). `NN32`, with its coercion from `IntLiteral`: first in Tristan's snapshot `25f7cf913` (2011-11-23, "Implementation of NN32"). `NN64` and `ZZ` with theirs from `IntLiteral`: Tristan, `b22c4ac56`. `NN64` from `NN32`: first in Steele's snapshot `e177c3e2c`. It sign-extended; rung W repaired it (its D1). `ZZ` from the four fixed widths: Steele, `304f2743a`. | |
| `widen`, `narrow`, `signed`, `unsigned` | The revival's rung W, `d98024425` (2026-09-20). Its `narrow` raised. | `ce0c7f453` made `narrow` keep the low bits (P-72). |

### 2.4 Each period's answer for a value that does not fit

| When | Who | Where | What a conversion does with a value that does not fit |
|---|---|---|---|
| By 2007-01-04 | in the first commit (`jm143038`) | walk | `ZZ64` → `ZZ32` `narrow` ends the run with "Overflow of ZZ32" |
| 2008-07-21 | Steele | walk | `NN64` → `NN32` `narrow` keeps the low bits; `signed` and `unsigned` keep the bits; his test asserts both (`UnsignedTest.fss:210-211`, `:219`) |
| 2009-08 and 2009-11 | Maessen | prelude | `asZZ32` keeps the low bits (`(int)l`) |
| 2009-09-10/11 | Crink | walk | `ZZ`'s `narrow` and `widen` keep the low bits; "The nomenclature needs work, in my opinion." |
| 2011-09-08 | Steele | prelude | `asZZ32` raises; the Wrapping and Saturating forms have natives and no Fortress name |
| 2012-05-22 | Steele (snapshot) | prelude | changes of sign named `bitsAs…` |
| `a874948ac` (2012-08-31) | — | walk | `ZZ64` → `ZZ32` raises (run-ending); `NN64` → `NN32`, `ZZ` → `ZZ32` and `ZZ` → `ZZ64` keep the low bits; changes of sign keep the bits |
| `a874948ac` | — | prelude | `ZZ64` → `ZZ32` raises (`asZZ32`); changes of sign by `bitsAs…`; no conversion out of `ZZ`; no name for the low bits |
| 2026 | the revival | both | every lossy conversion keeps the low bits (P-72; rung W); the prelude also keeps the checked `asZZ32` |

Steele's word on the question is in three places, and they differ by pair:

- 2008: in walk's library and its test, the unsigned narrowing keeps the low bits and a change of sign keeps the bits.
- 2011: in the type group's prelude, the plain-named signed narrowing raises, and the low-bits and saturating forms have natives but no names.
- 2012: in the prelude, a change of sign is named for its bits.

### 2.5 What the specification and the Working Draft say of each name

| Name | Revised specification | Working Draft (`Specification-1.0-frozen/`) |
|---|---|---|
| `narrow` | Keeps the low 32 bits from `ZZ64` or `ZZ` to `ZZ32` and from `NN64` to `NN32`; "no `IntegerOverflow` is thrown" (`basic-lib/basic-integers.tex:39-45`). Callout `revival-shifts` (`:63-66`); Appendix I, "Shifts and narrowing on the integer types" (`appendices/changes.tex:1723-1762`). | Nothing (`grep -rlw narrow`: no file). |
| `widen` | Not described. It is named only in Appendix I's list of the natives moved (`changes.tex:4467-4472`) and in an unrelated user example (`basic/trait-parameters.tex:433-443`). `widens` and "Automatic Widening" are another mechanism (`widen-evidence.md`, 1.1). | Nothing. |
| `big` | Not named; every hit of the word is a big operator. | Not named. |
| `signed`, `unsigned` | Not named as methods; the words appear only as adjectives (`basic-integers.tex:29`, `:31`). The binary words declare `signedIndex(): IndexInt throws { IntegerOverflow }` and `unsignedIndex()` the same, "[Description to be supplied.]" (`advanced-lib/binary.tex:1230-1231`, `:1292-1293`, `:1478-1479`). | The same, at the same lines. |
| `asZZ32` and the `as…` family, `bitsAs…` | Not named. | Not named. |
| coercions | `basic-integers.tex:23-37` lists them: each integer type coerces from each one all of whose values it holds, "every other conversion between integer types is written explicitly". `basic/conversions-coercions.tex:74-80`, callout `revival-int-float`: a coercion where exact, explicit where it can lose precision. | The integer chapter has no fixed-size integer type (`widen-evidence.md`, 1.5). The types chapter lists `ZZ8` to `ZZ128` and `NN8` to `NN128` and says "These types are mutually exclusive; no value has more than one of them" (`basic/types-vals-vars.tex:502-515`). |
| what a lossy conversion does | The general sentence "For integer results, overflow throws an `IntegerOverflow`" is about operators (`basic/operators/opr-overview.tex:154-155`, `:195-196`). No passage applies it to a conversion or exempts one, except `narrow`'s sentence above (`widen-evidence.md`, 1.2). | The same sentence; no conversion. |

## 3. The authors

The commit counts are `git log a874948ac --author=<pattern>`, with the parentless snapshots counted apart. "Areas" are the top directories of the files touched in the author's commits that are not snapshots. The library counts use `--full-history` over `Library/` and `ProjectFortress/LibraryBuiltin/`, over the interpreter prelude's files (`Library/FortressLibrary.*`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.*` and the earlier `ProjectFortress/FortressLibrary.*`), and over the compiler prelude (`CompilerBuiltin.*`). The record holds 5,397 commits in all (`research/authorship.md:3`).

- **Crink**:
  - Author field `Crink <Crink@localhost>` (the SVN era). 26 commits, none of them a snapshot, from 2008-10-31 to 2010-04-18.
  - Areas: `Library/` (76 files), `interpreter/glue/` (3: `BigNum.java`, only in the three conversion commits), `contrib/` editor files (6), `ProjectFortress/tests/` (1, `Reversals.fss`).
  - 25 commits touched the library and 6 the interpreter prelude's files; none touched the compiler prelude.
  - What the commits are about: collections (`Map`, `Set`, `PrefixSet`, `PrefixMap`, `Containment`, `Relation`, `Lazy`); type annotations across 17 library files (`bdb9cb08d`, 2009-03-11); generator reversals (`ea281dfcf`); `String`'s `join` (`8a2f60c04`); the `ZZ` conversions, its one Java change ("Incidentally, my first ever use of Java", `e1567d62f`); editor support (`c125cd4c3`).
  - Messages that bear on the account's role: "Seemed to test ok at work." (`02e648434`); "Could anyone take pity on me and drop a hint about how to get {/ ... /} working properly?" (`f779051b9`, 2009-01-01); "Reimplementing a correction Sukyoung Ryu made a while ago. Sorry." (`b7bc46c47`).
  - Review: the history records none. The author reverted the conversion commit and reinstated it. No other commit touched those lines up to `a874948ac` (`widen-evidence.md`, 3). The only commit by another author between the revert and the reinstatement, Maessen's `318e64d60`, "Fix odd indentation", touched only `ProjectFortress/compiler_tests/Compiled9.fss`.
  - Two names appear near the account in the history:
    - The one file that Crink's last commit added, `contrib/GtkSourceView/fortress.lang`, has the header "Copyright 2010 James Cranch (jdc41[at]cam.ac.uk)" (`c125cd4c3`).
    - Maessen's test `ProjectFortress/tests/parametricManiaCompr.fss` (`89c0d66f3`, 2009-01-14) begins "Checks for comprehension parsing bug caught by James Cranch, that caused failure specifically on bracketmania brackets". It imports `PrefixSet`, whose `{/ … /}` brackets Crink's commits of 2008-12 and 2009-01 were working on.
    - The history does not say whose account Crink is. The record leaves it "Unresolved" (`research/authorship.md:68`). The specification's acknowledgments name neither Crink nor Cranch (`grep -i`).
- **Guy L. Steele Jr.**:
  - Author fields `gls <gls@localhost>` (48), `gls@…oraclecorp.com` (12) and `Guy Steele` (117): 177 commits, 31 of them snapshots, from 2008-07-21 to 2012-06-19.
  - Areas: `ProjectFortress/demos/` (248), `Documentation/Specification/` (164, the later restart of the specification), `Papers/Welterweight/` (147), `Library/` (75), `compiler_tests/` (70), `not_working_library_tests/` (66), `BirdyLib/` (51), `other_compiler_tests/` (49), `LibraryBuiltin/` (47).
  - 56 commits to the library, 10 to the interpreter prelude's files, 36 to the compiler prelude.
  - His first commit is `dc41d5000`, which added `NN32`, `NN64` and `QQ` with `signed`, `unsigned`, `NN32`'s `widen` and `NN64`'s `narrow`.
  - The record's identity key: certain (`research/authorship.md:50`).
- **Jan-Willem Maessen**:
  - `jm143038` (58) and `jmaessen` (534): 592 commits, 1 a snapshot, from 2007-01-04 to 2010-03-08.
  - Areas: `ProjectFortress/tests/` (806), the interpreter's evaluator (632), `Library/` (446), `compiler_tests/` (297), `demos/` (239), glue (227).
  - 168 commits to the library, 173 to the interpreter prelude's files, 17 to the compiler prelude.
  - The record's identity key: certain, specification co-author (`research/authorship.md:45`); the record names him the standard library's principal author (`:91`).
  - In this inventory: the first commit's `widen` and checked `narrow` and their move into the traits; the prelude's first `asZZ32` (keeping the low bits), `IntLiteral`'s getters and `ZZ32`'s coercion.
- **Christine H. Flood**:
  - `chf` (217) and `chmf` (44): 261 commits, 11 of them snapshots, from 2007-01-16 to 2012-05-31.
  - Areas: `compiler_tests/` (758), tests (571), the evaluator (377), the bytecode optimizer (220), codegen (193).
  - 24 commits to the library.
  - In this inventory: `ZZ64`'s `big` (2008).
- **Eric Allen**:
  - `EricAllen` (231) and `ea144895` (2): 233 commits, 1 a snapshot, from 2007-06-01 to 2011-07-15.
  - Areas: the evaluator (331), `compiler_tests/` (205), `useful/` (197), the type checker (105).
  - 17 commits to the library and 7 to the compiler prelude.
  - The record's identity key: certain, specification co-author, co-principal investigator with Steele (`research/authorship.md:49`).
  - In this inventory: the prelude's `ZZ64` coercions (2010).
- **Jean-Baptiste Tristan**:
  - 27 commits, 6 of them snapshots, from 2011-11-23 to 2012-01-19.
  - Areas: `compiler_tests/` (20), `library_tests/` (19), `compiler/runtimeValues/` (16), the desugarer (9), `LibraryBuiltin/` (8), `nativeHelpers/` (7).
  - 8 commits to the compiler prelude.
  - In this inventory: the prelude's `NN32` (2011-11), `NN64` and `ZZ` (2012-01), and the unsigned narrowing natives (`62b88cafe`).
- **Karl Naden**:
  - 49 commits, 8 of them snapshots, from 2011-06-01 to 2012-08-31.
  - Areas: the runtime system (46), runtime values (36), codegen (24).
  - He committed the merge `f85e96424` that carried Steele's 2012 prelude lines. He wrote none of the lines of this inventory.
- **The revival**:
  - Its commits of 2026, whose author field is "Claude", wrote the one library's coercions, `ZZ32`'s `narrow` and `big`, `ZZ64`'s `widen` (`d846e3644`), `IntLiteral`'s conversions (`9d2e4c856`), the wrap of `narrow` (`d6faad28f`, `ce0c7f453`), and the prelude's four names (`d98024425`).
  - Their weight is the curator's decisions that they carry (P-43, P-72, P-74, P-76), not the team's word.

## 4. The peers

| Language | The plain conversion | The low bits | The same bits across sign | Source |
|---|---|---|---|---|
| Swift | `Int64(x)` traps: "Not enough bits to represent the passed value". `Int64(exactly:)` gives `nil`. | `Int64(truncatingIfNeeded:)`; saturation is `Int64(clamping:)` | `Int32(bitPattern:)` | `swiftlang/swift`, `stdlib/public/core/Integers.swift:580-583`, `:203`, `:633`, `:655`, `:3405-3430`; `IntegerTypes.swift.gyb:113`, on `main`, fetched 2026-10-31; not run |
| Rust | `as` keeps the low bits; `try_from` gives `Err`; `From` exists only where exact | `as` | `as` | run with rustc 1.97.0, below |
| Julia | `Int32(x::Int64)` throws `InexactError` (`checked_trunc_sint`); `Int64(x::BigInt)` throws `InexactError` | `x % Int32`, and `x % Int64` on a `BigInt` | not read | `JuliaLang/julia`, `base/boot.jl:1055-1060`, `:1096`, `:1186`; `base/int.jl:620`; `base/gmp.jl:372`, `:396-406`, on `master`, fetched 2026-10-31; not run |
| Kotlin | `Long.toInt()`: "The resulting Int value is represented by the least significant 32 bits of this Long value." The page names no checked form. | `toInt()` | `Int.toUInt()`: "The resulting UInt value has the same binary representation as this Int value." | kotlinlang.org API pages, fetched 2026-10-31; not run |
| Java | `(int) aLong` keeps the low bits; `Math.toIntExact` throws `ArithmeticException`; `BigInteger.longValue()` keeps the low 64 bits; `longValueExact()` throws | the cast | the cast | measured, `widen-evidence.md`, 7 |

The Rust run (`rustc -O -o p p.rs && ./p`):

    Rust  (-1i32) as u32            = 4294967295
    Rust  u32::try_from(-1i32)      = Err(TryFromIntError(NegOverflow))
    Rust  ((1<<32)+5) as i32        = 5
    Rust  i32::try_from((1<<32)+5)  = Err(TryFromIntError(PosOverflow))
    Rust  i64::from(-1i32)          = -1
    Rust  (u64::MAX) as i64         = -1
    Rust  i64::try_from(u64::MAX)   = Err(TryFromIntError(PosOverflow))

The peers fall into two patterns:

- In Swift and Julia the plain conversion checks, and the low bits have a name of their own. Swift also names the bit pattern and saturation.
- In Java, Kotlin and Rust the plain cast keeps the low bits, and the checking form has the longer name (`toIntExact`, `longValueExact`, `try_from`).

P-66 names Julia, X10, Swift and Rust as the peers to compare. X10 was not checked.

## 5. The ways

### 5.1 What every way meets

- **The pairs.** 13 lossy pairs, 8 of them with a member that keeps the low bits and 5 with none (1.3). There is no checked conversion in the one library, and the prelude's one, `asZZ32`, leaves with the prelude at the switch-over (PLAN.md:71).
- **The helpers (P-58).** Each binding is to name a static helper, which both paths run.
  - Checked: `ZZ64` → `ZZ32` (`simpleIntArith.longOverflowingToInt`) and `NN64` → `NN32` (`simpleUnsignedIntArith.longOverflowingToUnsignedInt`, `:76-78` over `toUnsignedIntOverflow`, `:25-29`).
  - Low bits: `longWrappingToInt` and `longWrappingToUnsignedInt`, and the four special-name helpers for a change of sign.
  - Saturating: `longSaturatingToInt` and `longSaturatingToUnsignedInt`.
  - Missing: any helper from `BigInteger` to `int` or `long`, and any checked change of sign. The record files `ZZ`'s `narrow` and `widen` as class C, a new helper, which falls to N3 (PLAN.md:54; `widen-evidence.md`, 2.3).
- **Climb batch 24, as its record stands (`explorations/coordinator/CLIMB-BATCH-24.md`).** Its rung Z moves `ZZ64`'s `narrow` onto `longWrappingToInt`, and also its `unsigned` and `big`. Its rung S moves `NN32`'s and `NN64`'s `signed` onto their special-name helpers and pins row 856 with tests of today's values (`CLIMB-BATCH-24.md:153`, `:187-188`, `:202`). A way that changes what these members do changes what those rungs bind and assert. A way that only adds members does not.
- **The library's own calls** (`grep -E '\b(narrow|widen|big|signed|unsigned)\s*(\(|\|)'` over `Library/*.fss` and `FortressBuiltin.fss`).
  - Most are in range by construction: `widen(0)`, `unsigned(1)` and `big(0)` as constants (fss:824-825, :3399-3421); masked values (`QuickCheck.fss:43`, `:294`, `:323`); `Random.fss:213`; sizes (`RangeInternals.fss:1273`, `:1460`).
  - `ZZ`'s two are reached today by `Format.fss:70`, `:117` and `:122` (the gated `formatTest`, 1.6), by `QuickCheck.fss:322` (the gated `ReflectiveQuickCheckTest`, about 360 calls a run, `widen-evidence.md`, 8.2; row 431's fix removes the call), and by the demo `sudoku.fss:42-43` (`narrow(truncate(i/3))`, a `QQ`'s `truncate` answering `ZZ`).
  - When P-68's rung lands (row 330), the float brackets, `round` and `truncate` answer `ZZ`. Every `narrow` or `widen` of one of them then goes through `ZZ`'s member: `Shuffle.fss:24`, `FortressLibrary.fss:4538` (`randomZZ32`), `Generator22D.fss:149` and `Random.fss:203` in the library; `quicksortTest.fss:28` and `sparseMatrix.fss:29` in the gated tests; `trips`, `posFeedback`, `conjGrad`, `tictactoe` and `newtictactoe` among the demos.
- **The uses in the test folders.** Occurrences of `name(` or `name |` in `ProjectFortress/tests`, `library_tests` and `compiler_tests`, declarations included, by grep: `narrow` 78, `widen` 348, `big` 110, `unsigned` 217, `signed` 24. They are in 17, 59, 26, 31 and 4 files of `ProjectFortress/` respectively. The demos have 17 calls of `narrow`.

### 5.2 The ways

**A. One behaviour, the low bits, under today's names, with every owner declared.**

- **Names and behaviours.** `narrow` (to the 32-bit type of the same sign), `widen` (to the 64-bit), `big` (to `ZZ`) and `signed` and `unsigned` (the other sign) keep the low bits, as they do today. Row 502 and row 856 are kept as they behave.
- **Members.**
  - Added, so that no call goes by coercion: `narrow` on `NN32`, `widen` on `NN64`, `big` on `NN32`, `NN64` and `ZZ`, `signed` on `ZZ32` and `ZZ64`, and `unsigned` on `NN32` and `NN64`. That is 9 bodies of `self` or a coercion, with no helper.
  - The 5 missing pairs stay compositions, with the order rule stated, or get names that the curator chooses. No current name fits `ZZ` → `NN32`, since a name today gives either a width or a sign.
  - Results that change: `widen` of an `NN64` stops giving -1, and `unsigned` of an `NN32` stays `NN32` (1.2).
- **Decisions.** P-72 is extended to `ZZ` and to the changes of sign. P-73 is not extended to conversions. P-74 is unchanged. PLAN.md:71 stays open.
- **Specification.** Sentences for `widen`, `big`, `signed` and `unsigned` beside `basic-integers.tex:39-45`, with an Appendix I entry.
- **Cost.** One library rung (the 9 bodies, a walk guard and a compiled guard) with the sentences. `ZZ`'s two helpers stay in N3. Climb batch 24 is unchanged.
- **What it gives up.** No checked form; every narrowing stays silent.

**B. Swift's pattern under today's names: the plain names raise, and the low bits and the bits have names of their own.**

- **Names and behaviours.**
  - `narrow`, `widen`, `signed` and `unsigned`, and members for the 5 missing pairs, raise `IntegerOverflow` where the value does not fit.
  - The low bits get a name, the curator's to choose. The peers spell it `truncatingIfNeeded:`, `%` or `as`, and the prelude's natives call it Wrapping.
  - The bits get the prelude's four `bitsAs…` getters (Steele, 2012).
  - Saturation can come too, by the prelude's Saturating natives (Steele, 2011, never bound).
- **Members changed.** The 8 lossy members. The coercion bodies written through `signed` (fss:822, :996-1000) must be rewritten to stay exact.
- **Members added.** 5 raising members for the missing pairs; 8 to 13 low-bits members, one per lossy pair that gets one; the 4 `bitsAs…` getters; and way A's 9 identities and owners: 26 to 31 in all. A functional member reserves its name and a getter does not.
- **Decisions.**
  - It reverses P-72, both halves, and decides rows 502 and 856 for raising.
  - It extends P-73's "every operation whose result can leave its type" to conversions, by the general sentence of `opr-overview.tex:154-155`.
  - It agrees with P-153's raise where the type cannot hold the value, and with P-66's "A hardware behaviour that bytecode can express gets its own explicit spelling".
  - P-74 is unchanged.
  - F-132, F-172 and F-124 are rewritten, and `basic-integers.tex:39-45` and `changes.tex:1723-1762` reversed.
- **Tests.**
  - The team's `UnsignedTest.fss:210-211` (Steele, 2008: the low bits at 2^64-1 and 2^63) and `:219` (`signed` of 2^64-1 below 0) move to the new names. These are changed lines of a team test.
  - The revival's `IntSemanticsRungI.fss:149-152`, `NativeHelperFamilyZZ32Walk.fss:45` and `IntConversionsRungW.fss`. In the last, the setup bindings at `:20-27` themselves build `NN` values as `unsigned` of -1 and of the minimums, and the assertions out of range are among `:34-36`, `:43-45`, `:47-49`, `:55-57`, `:63-64` and `:66-72`.
  - Batch 24's guards for `narrow` and its pins of row 856.
- **Cost.**
  - New Java helpers: the checked changes of sign (4) and the `ZZ` conversions in both forms (4 or more), each a few lines that raise through `Utility.makeFortressException`, as `simpleArbitraryPrecisionArith.shiftLeft` does. This is an edit of Java, so a rebuild and the library order.
  - A library rung: 8 bindings changed, 26 to 31 members added, the coercion bodies, and the guards.
  - A specification rung.
  - Climb batch 24's Z and S re-scoped for their 4 bindings, or the decision taken before batch 24 launches.
  - About 2 rungs beside N3.

**C. The prelude's two families beside today's names: `as…` raises, `bitsAs…` keeps the bits, and `narrow` and `widen` keep the low bits (PLAN.md:71's default, made total).**

- **Names.** The getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ` on each of the five types: 25 getters, of which 5 are identities, 7 are equal to the coercions and 13 raise. Also the 4 `bitsAs…` getters, unless `signed` and `unsigned` stay the names for the bits. `narrow`, `widen`, `big`, `signed` and `unsigned` stay as they are.
- **Members added.** Up to 29 getters and no functional method, so no name is reserved (1.4).
  - `IntLiteral` already has the five `as…` getters in both libraries (`FortressBuiltin.fsi:182-186`; `CompilerBuiltin.fsi:391-395`), so the family becomes one across the numerals and the integer types.
  - The prelude's own `as…` and `bitsAs…` getters keep their meaning. The compiled test files that call them would compile against the one library unchanged (`reviews/batch-3.5-4-conformance.md`, finding 4, counts five).
- **Decisions.**
  - P-72 is kept, and PLAN.md:71 is answered at its default, extended to every pair.
  - Rows 502 and 856 keep the low bits under `widen` and `signed`, and the checked spelling is `asZZ64` or `asZZ32`.
  - P-73 is extended to the `as…` names. P-74 is unchanged.
- **What it leaves.**
  - A lossy pair has two members with two behaviours, as the prelude's `ZZ64` has today (1.6: `narrow` gives 5, `asZZ32` raises).
  - `widen` still narrows on `ZZ`.
  - The plain functional names are the silent ones and the getters the checked ones. That is the Java, Kotlin and Rust pattern, the opposite of Swift's.
- **Cost.** The helpers of B for the checked getters, two of which exist. One library rung with its guards and a specification sentence. Climb batch 24 is unchanged.

**D. Both forms, each one family, with today's names retired.**

- **Names.** The checked `as…` getters (as in C), a low-bits family named by the target type (names the curator chooses), and `bitsAs…` for the bits. `narrow`, `widen`, `big`, `signed` and `unsigned` go, or stay for a while as the low-bits spelling.
- **Members.** As C, plus 13 low-bits members. It removes 14 functional members (the 8 lossy ones, the 4 exact ones and the 2 identities), which frees their reserved names.
- **Uses to rewrite.** In `Library/*.fss` with `FortressBuiltin.fss`, the occurrences of `narrow` (31), `widen` (36), `big` (15), `unsigned` (10) and `signed` (5), declarations included. The test counts of 5.1. The demos. Many of these are the team's tests.
- **Decisions.** P-72 restated on the new name; the others as in C.
- **Cost.** C's rung, plus a rename across the library, the tests and the specification's mentions: several rungs. Climb batch 24's bindings of Z and S renamed.

**E. The curator's leaning of 09:5x: delete `ZZ`'s `narrow` and `widen` now, and design `ZZ`'s conversions in both forms later.**

- **Names.** The fixed widths keep `narrow`, `widen`, `big`, `signed` and `unsigned` (P-72 unchanged). `ZZ` has no explicit conversion out until the later design.
- **Members.** 2 removed (fsi:698-699; fss:1080-1084), with their glue bindings. Row 502 is answered by the removal, and so is row 349's half on `narrow` of a `ZZ`. The two bindings leave N3's class C (`CLIMB-BATCH-24.md:362`).
- **What reaches them** (5.1): the gated `formatTest` through `Format.fss:70`, `:117` and `:122` (76 calls in one run, all in range, 1.6); `ReflectiveQuickCheckTest` through `QuickCheck.fss:322` (row 431); the demo `sudoku.fss:42-43`; and, once P-68's rung lands, every `narrow` or `widen` of a float's bracket, `round` or `truncate`. Each needs its rewrite in the same change.
  - By reading, not measured: `Format`'s quotients of two `ZZ64` or `ZZ32` values can be computed by `DIV` in their own type, with care for the bracket's rounding of a negative value, and the `QuickCheck` line goes with row 431's fix.
  - P-68's rung then needs its own way from a float to `ZZ32` and `ZZ64`.
- **Results that change** (1.2). `widen` of an `NN64` is refused instead of giving -1. `narrow` of an `NN32` stays ambiguous, between `ZZ64`'s and `NN64`'s.
- **Decisions.** Row 502 is moot. P-68's rung (row 330) meets the gap. P-72 is unchanged, and PLAN.md:71 stays open.
- **Cost.** One small library change: 2 members, the callers in `Format`, and `QuickCheck` unless row 431 is fixed first. A specification sentence: `basic-integers.tex:39-41` names `ZZ`'s `narrow`. Climb batch 24 is unchanged.

### 5.3 Variants that each way can take

- **Raise, or answer a `Maybe`.** The checked form can raise `IntegerOverflow`, as the general sentence, P-73 and the prelude's `asZZ32` do. It can instead answer a `Maybe`, as `RR64`'s `getter check(): Maybe[\RR64\]` does (`FortressLibrary.fsi:315-316`), and as Swift's `exactly:` and Rust's `try_from` do. The conformance review named both (finding 4).
- **Saturation.** Swift's `clamping:`. The prelude imports `longSaturatingToInt` (Steele, 2011) and `longSaturatingToUnsignedInt` and binds neither. P-73 leaves the saturating operators to a later step (row 797).
- **One generic name with the target as a static argument**, as in Julia's `T(x)` and Swift's initializers. The library's nearest form is `cast[\T\]` (used at fss:3399-3421), a checked cast that raises `CastError`, not a conversion. This form was not explored.

### 5.4 What microGPT uses

- Neither program, nor any component of its own, names a conversion of this inventory. This was checked with `grep -nwE` for the names, `as…`, `numerator`, `ZZ64`, `NN32`, `NN64` and `ZZ` over `MicroGptFlat.fss`, `MicroGptApl.fss`, `FlatArrays`, `FlatData`, `AplMg`, `AplMgSyntax`, `FlatArrays2` and `FlatData2`.
- By reading, the one conversion between integer types on their path is a coercion: the numeral of `(nanoTime() - t0) DIV 1000000` into `ZZ64`, in each program's line that prints a step (`explorations/run-c4/src/MicroGptFlat.fss:95`, `explorations/apl/mg/MicroGptApl.fss:124`). Under walk the numeral is a `ZZ32`, and `coerce(x: ZZ32) = widen(x)` (fss:821) runs `ZZ32`'s exact `widen`. `FlatData`'s `strToInt` is `ZZ32` throughout.
- No way changes an exact conversion. So no way changes a model line or, by reading, the model's work. Whether the library's code under the model reaches a lossy conversion was not measured (6).

## 6. What is missing, and how to get it

- **Swift, Julia and Kotlin were not run**, since none is installed here. They were read in their sources or documentation (4). X10 was not checked.
- **The checker's choices for the calls of 1.2 were not run compiled.** The prelude has none of those routes, and the one library compiles only after the switch-over.
- **Whether microGPT's run reaches a lossy conversion inside the library.** The method of 1.6's instrumented copy works, put on the members of 1.1 and run with `explorations/coordinator/tools/mg-run.sh` from the copy's folder.
- **The demos' and the ungated tests' calls of `ZZ`'s `narrow` were not run.**
- **The cost per call of a raising helper was not measured.** It is one comparison on a `long`, or one `bitLength` on a `BigInteger`.

## 7. Findings new to the record

1. **Under walk, `widen` of an `NN64` reaches `ZZ`'s `widen` by coercion and changes the sign without a word:** `widen` of 2^64-1 is the `ZZ64` -1 (1.2). It is a sibling of rows 502 and 856. Ledger row 858 records it.
2. **The integer conversions are not declared on all five types.** So a call goes by coercion or fails: `unsigned` of an `NN32` answers an `NN64`, `narrow` of an `NN32` is an ambiguous coercion, `big` of an `NN32` works through `ZZ64`, and `big` of an `NN64` or a `ZZ` is refused (1.2). Ledger row 859 records it.
3. **Walk's `narrow` from `ZZ64` to `ZZ32` was checked from the record's first commit**, `72ae6881b` of 2007-01-04, to `a874948ac`. `widen-evidence.md`, 2.4, dated it "since at least `1d2680d4d`" (2008-03-24).
4. **Steele's `9ce7d8189` wrote the three `long`-to-`int` natives, Overflowing, Wrapping and Saturating, together.** It bound only the Overflowing one to a name, `asZZ32`, and left the low bits without a Fortress name (2.3).
5. **The prelude's `bitsAs…` getters and `ZZ32`'s `asZZ64` first appear in Steele's snapshot `e177c3e2c` (2012-05-22).** They reached the trunk through `f85e96424`, which a `-S` search credits with them. `ZZ32`'s `asZZ64` is typed `ZZ32` and is not in the api (1.5).
6. **The gated `formatTest` reaches `ZZ`'s `widen` 60 times and its `narrow` 16 times in a run,** through `Format.fss:70`, `:117` and `:122`, with values in range (1.6). This bears on way E.
7. **Two names stand near the account Crink in the history** (3): the copyright line of the one file that Crink's last commit added, and Maessen's 2009 test that credits a bug report on Crink's area. `research/authorship.md` holds neither. The history does not say whose account Crink is.
