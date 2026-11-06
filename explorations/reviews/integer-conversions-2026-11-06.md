<!-- A design review for the curator's decision on the conversions between the integer types `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` (`narrow`, `widen`, `unsigned`, `signed`, `big` and the checked `as…` getters), written 2026-11-06 by an Opus review worker from the evidence of 2026-10-31 and checked against `main` at `36ce6e303`: a primer with runs on both paths, where each conversion is built today, the team's sources with their authors and dates, the peers, microGPT's exposure measured with an instrumented library, eight options numbered from the ask of 2026-10-31, how they weigh, and the recommendation. Nothing in the original tree was edited; the runs used a private caches folder. -->

# The integer conversions: the design for your decision

This review is for you, the curator. It sets out one open question of the natives' work, so that you can decide it. It also teaches how Fortress does its integers, from `ZZ32` up.

- **Tree.** `main` at `36ce6e303`. Its original tree (`Library/`, `ProjectFortress/`, `Specification/`, `build.xml`, `bin/`) is that of `b88d26f52`, the head named in the brief: `git diff --stat b88d26f52 36ce6e303` over those paths is empty. The tree was built at that code, and its caches were warm.
- **What it builds on.** Two evidence files of 2026-10-31, `explorations/reviews/integer-conversions-evidence.md` (cited below as "the evidence") and `explorations/reviews/widen-evidence.md` ("the widen evidence"), and the coordinator's ask to you of 2026-10-31 at 10:29 UTC ("the ask"). You have not answered the ask.
- **What is new here.** Climb batches 24 to 26 landed after the evidence. Batch 24 moved seven conversions onto Java helpers. This review ran them again, ran the primer's edges on both paths, and measured one point that the evidence left open: whether microGPT's run reaches a lossy conversion inside the library.

**Words used in this review**

- **Walk**: the interpreter, `bin/fortress P.fss`.
- **The compiled path**: `bin/fortress compile P.fss`, then `bin/fortress run P`, which runs JVM bytecode.
- **The one library**: the interpreter's library, `Library/FortressLibrary.fss` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` with their api files (`.fsi`). Walk uses it today.
- **The compiler's prelude**: the compiled path's own library today, mainly `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`.
- **The switch-over**: the step at which the compiled path moves onto the one library and the prelude is deleted (P-37).
- **A native binding**: a library body `builtinPrimitive("…")`. Its string names Java code that does the work.
- **A glue class**: Java code of walk's, under `interpreter/glue/prim/`. Only walk can run it.
- **A helper**: a public static Java method under `nativeHelpers/`. Both paths can run it. Your decision P-58 moves every native binding onto a helper.
- **Keeps the low bits**: the result is the value of the target type that is equal to the argument modulo 2^n, where n is the target's width. For a change of sign at one width, this is the same bit pattern read with the other sign.
- **Raises**: throws `IntegerOverflow`, which a `catch` sees.
- **Exact**: every value of the source type is a value of the target type.
- **A rung**: one task of a climb batch, which agents build and check, and which lands with the batch (P-39).
- **P-N**, **F-N**: an entry of POSITIONS (your decisions) or of FACTS. **Row N**: a row of the gap ledger. **Item N**: an item of the review queue.

## 1. The question, and a primer

**The question.** Which conversions between the five integer types does the one library offer, and what does each one do with a value that its target type cannot hold: keep the low bits, raise `IntegerOverflow`, or not exist? [1]

### 1.1 The five integer types

From the bottom up, with the names that you know:

- **`ZZ32`** is a signed 32-bit integer: Swift's `Int32`, Java's `int`. Its range is -2^31 to 2^31 - 1, that is, -2147483648 to 2147483647. It is the everyday integer. Arrays and ranges are indexed by `ZZ32` only [2].
- **`ZZ64`** is a signed 64-bit integer: Swift's `Int64`, Java's `long`.
- **`NN32`** is an unsigned 32-bit integer: Swift's `UInt32`. Its range is 0 to 2^32 - 1.
- **`NN64`** is an unsigned 64-bit integer: Swift's `UInt64`. Its range is 0 to 2^64 - 1, that is, 0 to 18446744073709551615.
- **`ZZ`** is the unbounded integer: Java's `BigInteger`.

Arithmetic on the four fixed widths raises `IntegerOverflow` when the result leaves its type (P-73). So `ZZ32` 2147483647 + 1 raises [11]. Java's `int` wraps there, to -2147483648 [14]. In Fortress a program can catch the error. Code that wants the wrap writes it with its own operators: ∔ (`DOTPLUS`), ∸ and ⨰ [3]. Keep this in mind: arithmetic raises, and the question below is whether a written conversion does too.

### 1.2 Siblings, not a tower

- All five types are subtypes of `Number` and of no other number type [4]. So `ZZ32` is not a subtype of `ZZ64`, "unlike Haskell's classes or Java's widening" [6]. Your decision P-43 made the number types siblings.
- In its place, each wider type declares a `coerce` from each narrower type all of whose values it holds [4]. A coercion is a conversion that walk or the compiler inserts by itself, when a value of one type is used where another type is expected. Seven of the twenty ordered pairs of types are exact, and each of the seven has a coercion [5].
- "Every other conversion between integer types is written explicitly" [4]. P-74 says the same: an exact conversion is implicit, and a conversion that can lose precision is written out. So Fortress writes out only the conversions that can lose the value.

A short example:

```
a: ZZ32 = 5
b: ZZ64 = a          (* exact: ZZ64's coerce from ZZ32 runs by itself *)
c: ZZ32 = narrow(b)  (* can lose the value: you write the conversion *)
```

### 1.3 A conversion is a function, not a cast

- `narrow`, `widen`, `unsigned`, `signed` and `big` are functional methods. A functional method is declared in a type's trait, has `self` among its parameters, and is called like a function: `narrow(b)`, not `b.narrow()` [6].
- The call chooses its declaration by the run-time type of the argument, as Julia does [6]. So `narrow(b)` runs `ZZ64`'s `narrow` when `b` holds a `ZZ64`, and `NN64`'s when it holds an `NN64`.
- A functional method's name is reserved in every program that imports the library. A local variable named `narrow` is refused: "Variable narrow is already declared." [7]
- A getter is the other form. It is dotted and has no parentheses, as `x.asZZ32`. A getter reserves no name: a local variable named `asZZ32` runs [7].
- A conversion computes a new value of another type. It is not a cast. The library's `cast[\T\]` keeps the value and only checks its type; it raises `CastError` when the type does not fit [8].

### 1.4 The names, on a small value

Each name gives its target, not a direction [9]:

- `narrow(x)`: to the 32-bit type of the same sign. `narrow` of the `ZZ64` 7 is the `ZZ32` 7 [10].
- `widen(x)`: to the 64-bit type of the same sign. `widen` of the `ZZ32` -2147483648 is the `ZZ64` -2147483648 [11].
- `unsigned(x)`: to the unsigned type of the same width. `unsigned` of the `ZZ64` 7 is the `NN64` 7 [10].
- `signed(x)`: to the signed type of the same width.
- `big(x)`: to `ZZ`. `big` of the `ZZ32` -2147483648 is the `ZZ` -2147483648 [11].

On a value that the target holds, every conversion gives the same number. The question is only about the edges.

### 1.5 At an edge, on both paths

These are the three edges of the question. Each result is from a run of today's tree [11] [12] [13].

1. **A `ZZ64` of 2^40 narrowed to `ZZ32`.** 2^40 is 1099511627776. Its low 32 bits are all zero.
   - Walk: `narrow` gives 0. `narrow` of 2^40 + 7 gives 7. `narrow` of 2^31 gives -2147483648: a positive value becomes negative. Nothing raises [11].
   - The compiled path: `narrow` gives the same 0, 7 and -2147483648. The prelude also has the getter `asZZ32`, which raises `IntegerOverflow` at 2^40 and at 2^31, and gives 7 for the `ZZ64` 7 [12].
2. **A negative `ZZ64` made unsigned.** On both paths `unsigned` of -1 gives the `NN64` 18446744073709551615, that is, 2^64 - 1, and `unsigned` of -5 gives 2^64 - 5. Nothing raises [11] [12].
3. **A `ZZ` too large for `ZZ64` widened.**
   - Walk: `widen` of 2^64 + 5 gives 5. `widen` of 2^63, a positive value, gives the negative -9223372036854775808. `widen` of 2^63 - 1, which fits, gives 2^63 - 1. Nothing raises [11]. Ledger row 502 records the first case.
   - The compiled path: the program does not compile. The prelude's `ZZ` declares no `widen`: "Could not check call to function widen" [13]. Row 349 records this.

By contrast, in the same walk run, `ZZ32` 2147483647 + 1 and `ZZ64` 9223372036854775807 + 1 raise `IntegerOverflow` [11].

So today, in the one library, a written conversion never raises, and arithmetic always raises. The compiler's prelude has one conversion that raises, `ZZ64`'s getter `asZZ32`.

**References for section 1**

1. The ask: the coordinating session's transcript, `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`, line 73434, 2026-10-31T10:29:19Z, "**The question:** what set of conversions between the five integer types does the one library offer, and what does each do with a value that does not fit?"
2. The `fortress-repo` skill, `references/revival-changes.md`, "Traits and objects" ("Of the integer types, only `ZZ32` extends `Index`"); `references/library.md`, "The curator's decisions on the library" (ranges over `ZZ32` only).
3. P-73; `Specification/basic/operators/opr-overview.tex:154-155` and `:205-209`.
4. `Specification/basic-lib/basic-integers.tex:23-37`; `Library/FortressLibrary.fsi:596-598` (`ZZ64` from `ZZ32`, `NN32`, `IntLiteral`), `:492-493` (`NN64`), `:654-658` (`ZZ`).
5. The evidence, 1.3, "The counts".
6. The `fortress-repo` skill, `SKILL.md`, "Fortress as a language" ("Numbers are siblings, not a tower", "Functional methods", "Dispatch is on every argument, at run time"); `Library/FortressLibrary.fsi:645` (`narrow(self):ZZ32` in `trait ZZ64`).
7. The evidence, 1.4 and 1.6, "Reserved names".
8. The evidence, 5.3; `Library/FortressLibrary.fss:3399-3421`.
9. The evidence, 1.4.
10. `ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss:71` and `:76` (`assert(narrow(s7), 7, …)`, `assert(unsigned(s7).asString, "7", …)`).
11. **Run W**, walk, at `36ce6e303`. Setup: the `fortress-repo` skill's setup lines, `FORTRESS_THREADS=1`, and `FORTRESS_CACHES` set to a private copy of `default_repository/caches`. Command, from the probe's folder: `bin/fortress IntConvPrimerWalk.fss`, rc=0, 40 s. The program, whole:

        component IntConvPrimerWalk
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

        show(what: String, f: () -> Any): () =
          try
            v = f()
            println(what " = " v " : " kind(v))
          catch e
            IntegerOverflow => println(what " -> IntegerOverflow")
          end

        run() = do
          l40: ZZ64 = 1099511627776
          l40p7: ZZ64 = 1099511627783
          l31: ZZ64 = 2147483648
          lMOne: ZZ64 = -1
          lMFive: ZZ64 = -5
          b2p63: ZZ = 9223372036854775808
          b2p64p5: ZZ = 18446744073709551621
          b2p63m1: ZZ = big(9223372036854775807)
          show("narrow(ZZ64 2^40)", fn () => narrow(l40))
          show("narrow(ZZ64 2^40+7)", fn () => narrow(l40p7))
          show("narrow(ZZ64 2^31)", fn () => narrow(l31))
          show("unsigned(ZZ64 -1)", fn () => unsigned(lMOne))
          show("unsigned(ZZ64 -5)", fn () => unsigned(lMFive))
          show("widen(ZZ 2^63)", fn () => widen(b2p63))
          show("widen(ZZ 2^64+5)", fn () => widen(b2p64p5))
          show("widen(ZZ 2^63-1)", fn () => widen(b2p63m1))
          zMOne: ZZ32 = -1
          zMin: ZZ32 = -2147483647 - 1
          lMax: ZZ64 = 9223372036854775807
          lMin: ZZ64 = -9223372036854775807 - 1
          nAll: NN32 = unsigned(zMOne)
          nHalf: NN32 = unsigned(zMin)
          mAll: NN64 = unsigned(lMOne)
          l2p32p5: ZZ64 = 4294967301
          m2p32p5: NN64 = unsigned(l2p32p5)
          show("narrow(ZZ64 MAX)", fn () => narrow(lMax))
          show("narrow(ZZ64 MIN)", fn () => narrow(lMin))
          show("unsigned(ZZ64 MIN)", fn () => unsigned(lMin))
          show("big(ZZ64 MIN)", fn () => big(lMin))
          show("narrow(NN64 2^64-1)", fn () => narrow(mAll))
          show("narrow(NN64 2^32+5)", fn () => narrow(m2p32p5))
          show("signed(NN64 2^64-1)", fn () => signed(mAll))
          show("signed(NN32 2^31)", fn () => signed(nHalf))
          show("signed(NN32 2^32-1)", fn () => signed(nAll))
          show("widen(NN32 2^32-1)", fn () => widen(nAll))
          show("unsigned(NN32 2^32-1), by coercion", fn () => unsigned(nAll))
          show("big(NN32 2^32-1), by coercion", fn () => big(nAll))
          show("widen(NN64 2^64-1), by coercion", fn () => widen(mAll))
          show("unsigned(ZZ32 -1)", fn () => unsigned(zMOne))
          show("widen(ZZ32 MIN)", fn () => widen(zMin))
          show("big(ZZ32 MIN)", fn () => big(zMin))
          show("narrow(ZZ 2^64+5)", fn () => narrow(b2p64p5))
          zMax: ZZ32 = 2147483647
          show("ZZ32 MAX + 1", fn () => zMax + 1)
          show("ZZ64 MAX + 1", fn () => lMax + 1)
        end
        end

    Its output lines, each cited below by its text:

        narrow(ZZ64 2^40) = 0 : ZZ32
        narrow(ZZ64 2^40+7) = 7 : ZZ32
        narrow(ZZ64 2^31) = -2147483648 : ZZ32
        unsigned(ZZ64 -1) = 18446744073709551615 : NN64
        unsigned(ZZ64 -5) = 18446744073709551611 : NN64
        widen(ZZ 2^63) = -9223372036854775808 : ZZ64
        widen(ZZ 2^64+5) = 5 : ZZ64
        widen(ZZ 2^63-1) = 9223372036854775807 : ZZ64
        narrow(ZZ64 MAX) = -1 : ZZ32
        narrow(ZZ64 MIN) = 0 : ZZ32
        unsigned(ZZ64 MIN) = 9223372036854775808 : NN64
        big(ZZ64 MIN) = -9223372036854775808 : ZZ
        narrow(NN64 2^64-1) = 4294967295 : NN32
        narrow(NN64 2^32+5) = 5 : NN32
        signed(NN64 2^64-1) = -1 : ZZ64
        signed(NN32 2^31) = -2147483648 : ZZ32
        signed(NN32 2^32-1) = -1 : ZZ32
        widen(NN32 2^32-1) = 4294967295 : NN64
        unsigned(NN32 2^32-1), by coercion = 4294967295 : NN64
        big(NN32 2^32-1), by coercion = 4294967295 : ZZ
        widen(NN64 2^64-1), by coercion = -1 : ZZ64
        unsigned(ZZ32 -1) = 4294967295 : NN32
        widen(ZZ32 MIN) = -2147483648 : ZZ64
        big(ZZ32 MIN) = -2147483648 : ZZ
        narrow(ZZ 2^64+5) = 5 : ZZ32
        ZZ32 MAX + 1 -> IntegerOverflow
        ZZ64 MAX + 1 -> IntegerOverflow

12. **Run C**, the compiled path, at `36ce6e303`, with the same private caches folder, which holds the five library jars of the compiler's library. Commands, from `ProjectFortress/`: `../bin/fortress compile <probe>/IntConvPrimerCompiled.fss` (rc=0), then `../bin/fortress run IntConvPrimerCompiled` (rc=0). The program, whole:

        component IntConvPrimerCompiled
        export Executable

        overflowsZZ32(f: () -> ZZ32): Boolean =
          try
            ignore f()
            false
          catch e
            IntegerOverflow => true
            Exception => false
          end

        run(): () = do
          l40: ZZ64 = 1099511627776
          l40p7: ZZ64 = 1099511627783
          l31: ZZ64 = 2147483648
          lMOne: ZZ64 = -1
          lMFive: ZZ64 = -5
          lSeven: ZZ64 = 7
          zMOne: ZZ32 = -1
          println("narrow(ZZ64 2^40) = " narrow(l40))
          println("narrow(ZZ64 2^40+7) = " narrow(l40p7))
          println("narrow(ZZ64 2^31) = " narrow(l31))
          println("(ZZ64 2^40).asZZ32 overflows: " overflowsZZ32(fn () => l40.asZZ32))
          println("(ZZ64 2^31).asZZ32 overflows: " overflowsZZ32(fn () => l31.asZZ32))
          println("(ZZ64 7).asZZ32 = " lSeven.asZZ32)
          println("unsigned(ZZ64 -1) = " unsigned(lMOne))
          println("unsigned(ZZ64 -5) = " unsigned(lMFive))
          println("unsigned(ZZ64 -1).asZZ = " (unsigned(lMOne)).asZZ)
          println("(ZZ64 -1).bitsAsNN64 = " lMOne.bitsAsNN64)
          println("unsigned(ZZ32 -1) = " unsigned(zMOne))
          println("signed(unsigned(ZZ64 -1)) = " signed(unsigned(lMOne)))
          println("narrow(unsigned(ZZ64 -1)) = " narrow(unsigned(lMOne)))
        end
        end

    Its output:

        narrow(ZZ64 2^40) =  0
        narrow(ZZ64 2^40+7) =  7
        narrow(ZZ64 2^31) =  -2147483648
        (ZZ64 2^40).asZZ32 overflows:  true
        (ZZ64 2^31).asZZ32 overflows:  true
        (ZZ64 7).asZZ32 =  7
        unsigned(ZZ64 -1) =  18446744073709551615
        unsigned(ZZ64 -5) =  18446744073709551611
        unsigned(ZZ64 -1).asZZ =  18446744073709551615
        (ZZ64 -1).bitsAsNN64 =  18446744073709551615
        unsigned(ZZ32 -1) =  4294967295
        signed(unsigned(ZZ64 -1)) =  -1
        narrow(unsigned(ZZ64 -1)) =  4294967295

13. **Run Z**, the compiled path, the same setup. The program `IntConvZZWidenCompiled.fss`, whole: `component IntConvZZWidenCompiled export Executable run(): () = do b: ZZ = 18446744073709551621; println("widen(ZZ 2^64+5) = " widen(b)) end end`, written on six lines. `../bin/fortress compile <probe>/IntConvZZWidenCompiled.fss`, rc=255:

        IntConvZZWidenCompiled.fss:6:33-39:
            Could not check call to function widen
            - NN32->NN64 is not applicable to an argument of type ZZ.
            - ZZ32->ZZ64 is not applicable to an argument of type ZZ.
        File IntConvZZWidenCompiled.fss has 1 error.

14. `jshell -q add.jsh`, OpenJDK 25.0.4.1, with the one line `System.out.println("Java  Integer.MAX_VALUE + 1 = " + (Integer.MAX_VALUE + 1));`: `Java  Integer.MAX_VALUE + 1 = -2147483648`.

## 2. Where the conversions are built today

### 2.1 How a member is built

A conversion member has one of three kinds of body:

- `= self`, an identity, where the type converts to itself.
- A Fortress body, such as a coercion's `big(x)`.
- A native binding, whose string names a glue class or a helper. Of the one library's 449 native bindings, 306 name a helper (F-299) and 143 still name a glue class (F-32). The compiled path cannot run a glue class, so every binding must name a helper before the switch-over (P-58).

### 2.2 The one library, member by member

Each item gives the declaration, its binding, and its answer at an edge, from Run W [1]. "fss" is `Library/FortressLibrary.fss` and "fsi" its api, unless an item names `FortressBuiltin`.

**`ZZ32`**

- `widen(self):ZZ64` (fsi:586; fss:805-806): helper `simpleLongArith.intToLong`, `(long) i` [2]. Exact. `widen` of -2147483648 is -2147483648. Moved onto the helper by climb batch 23 (`640acb4a1`, 2026-10-30).
- `unsigned(self):NN32` (fsi:588; fss:809-810): helper `simpleUnsignedIntArith.makeNN32FromZZ32WithSpecialCompilerHackForNN32ResultType`, which returns its `int` unchanged [2]. Keeps the bits: `unsigned` of -1 is 4294967295. Climb batch 23.
- `narrow(self):ZZ32` (fsi:589; fss:811): `= self`, the identity. The revival's (`d846e3644`, 2026-09-27).
- `big(self):ZZ` (fsi:590; fss:812-813): glue class `Long$ToBigNum`, `BigInteger.valueOf` [3]. Exact. **Still a glue class.** Climb batch 25 left it with item 331's group, though the helper `simpleArbitraryPrecisionArith.makeZZfromZZ32` fits it exactly [4].

**`ZZ64`**

- `narrow(self):ZZ32` (fsi:645; fss:900-901): helper `simpleIntArith.longWrappingToInt`, `(int) l` [2]. Keeps the low 32 bits (P-72). The maximum gives -1 and the minimum 0. Moved by climb batch 24's rung Z (`3308aad55`, 2026-10-31).
- `unsigned(self):NN64` (fsi:647; fss:902-903): helper `simpleUnsignedLongArith.makeNN64FromZZ64WithSpecialCompilerHackForNN64ResultType`, which returns its `long` unchanged [2]. Keeps the bits: the minimum gives 9223372036854775808. Rung Z.
- `big(self):ZZ` (fsi:648; fss:904-905): helper `simpleArbitraryPrecisionArith.makeZZfromZZ64` [2]. Exact. Rung Z.
- `widen(self):ZZ64` (fsi:646; fss:906): `= self`. The revival's (`d846e3644`).

**`NN32`** (in `FortressBuiltin`)

- `widen(self):NN64` (`FortressBuiltin.fsi:171`; `FortressBuiltin.fss:465-466`): helper `simpleUnsignedIntArith.toLong`, which extends with zeros [2]. Exact: 2^32 - 1 gives 4294967295. Moved by climb batch 24's rung H (`b71495ca4`, 2026-10-31).
- `signed(self):ZZ32` (`FortressBuiltin.fsi:173`; `FortressBuiltin.fss:469-470`): helper `simpleUnsignedIntArith.makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType`, which returns its `int` unchanged [2]. Keeps the bits: 2^31 gives -2147483648 and 2^32 - 1 gives -1 (row 856). Moved by rung S (`ca1498628`, 2026-10-31).

**`NN64`**

- `narrow(self):NN32` (fsi:532; fss:983-984): helper `simpleUnsignedIntArith.longWrappingToUnsignedInt`, `(int) l` [2]. Keeps the low 32 bits: 2^64 - 1 gives 4294967295, and 2^32 + 5 gives 5. Rung H.
- `signed(self):ZZ64` (fsi:533; fss:985-986): helper `simpleUnsignedLongArith.makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType` [2]. Keeps the bits: 2^64 - 1 gives -1 (row 856). Rung S.

**`ZZ`**

- `narrow(self): ZZ32` (fsi:698; fss:1080-1081): glue class `BigNum$ToZZ32`, `x.intValue()` [3]. Keeps the low 32 bits: 2^64 + 5 gives 5. **Still a glue class.**
- `widen(self): ZZ64` (fsi:699; fss:1082-1084), under the comment "This routine, named for consistency, converts to a ZZ64": glue class `BigNum$ToZZ64`, `x.longValue()` [3]. Keeps the low 64 bits: 2^63 gives -2^63, and 2^64 + 5 gives 5 (row 502). **Still a glue class.**

**The others**

- `numerator(self): ZZ` on all five types is exact (fss:815, :908, :988, :1005; `FortressBuiltin.fss:472`) [5].
- `IntLiteral`, the type of a numeral under the checker, has the getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ` (`FortressBuiltin.fsi:182-186`; `FortressBuiltin.fss:489-498`), on glue classes. Out of range, they end the run with a `ProgramError` that no `catch` sees. Walk never reaches them, since under walk a numeral is a `ZZ32`, `ZZ64` or `ZZ` (P-76) [5]. They wait for the literals' work (N5) [6].
- The coercions (fss:821-823, :914-915, :994-1001) are exact. Three of their bodies go through `NN64`'s `signed`, and `ZZ`'s coercion from `NN64` corrects its change of sign by adding 2^64 [5].

**In sum.** Of the twelve conversion members that have a native binding, nine name a helper and three name a glue class: `ZZ32`'s `big` and `ZZ`'s `narrow` and `widen`. Seven of the nine moved in climb batch 24, after the evidence was gathered. Their values did not change: every value of Run W equals the evidence's table at the same input [1] [5]. Climb batches 25 and 26 moved no conversion; batch 26 lists `ZZ`'s two as "the integer conversions", left for your answer [6].

### 2.3 A call on a type that lacks the member

No name is declared on all five types. So a call on a type without the member goes by coercion to another type's member, or fails (row 859). Run W ran again the three calls whose route crosses a member that batch 24 moved [1]:

- `unsigned` of the `NN32` 2^32 - 1 gives the `NN64` 4294967295. It goes through `ZZ64`'s coercion from `NN32` and then `ZZ64`'s `unsigned`, so `unsigned` here widens.
- `big` of the `NN32` 2^32 - 1 gives the `ZZ` 4294967295, through `ZZ64`.
- `widen` of the `NN64` 2^64 - 1 gives the `ZZ64` -1. It goes through `ZZ`'s coercion from `NN64` and then `ZZ`'s `widen`: a silent change of sign (row 858).

The three refusals are the evidence's, and their ground has not changed: `narrow` of an `NN32` is an "Ambiguous coercion" among three `narrow`s, and `big` of an `NN64` or a `ZZ` finds no overload [7].

The 13 pairs that can lose the value still have 8 members and 5 gaps: no member converts `ZZ32` to `NN64`, `ZZ64` to `NN32`, `NN64` to `ZZ32`, `ZZ` to `NN32` or `ZZ` to `NN64` [8]. A gap is written as two conversions, and for a widening with a change of sign the order changes the value. `unsigned(widen(x))` of the `ZZ32` -1 is 2^64 - 1, the low 64 bits; `widen(unsigned(x))` is 2^32 - 1 [8].

### 2.4 The compiler's prelude

The prelude has not changed since the evidence: `git log --since=2026-10-31` over `CompilerBuiltin.fss` and `.fsi` prints nothing. Its members, in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` [9]:

- `ZZ64`: the coercions from `IntLiteral` and `ZZ32` (:579-580); the getter `asZZ32() = jLongOverflowingToInt(self)` (:581), which **raises**; the getter `asZZ` (:582), exact; the getter `bitsAsNN64` (:583), which keeps the bits; `narrow` (:659), which keeps the low bits; `unsigned` (:660), which keeps the bits.
- `ZZ32`: the getters `asZZ32 = self`, `asZZ64 = self` typed `ZZ32` and missing from the api, `asZZ` and `bitsAsNN32` (:665-668); `widen` and `unsigned` (:750-751).
- `NN32`: the getters `asNN32`, `asZZ` and `bitsAsZZ32` (:756-758); `widen` and `signed` (:815-816).
- `NN64`: the coercion from `NN32` (:821); the getters `asNN64`, `asZZ` and `bitsAsZZ64` (:822-824); `narrow` and `signed` (:879-880).
- `ZZ`: coercions from the four fixed widths and `IntLiteral` (:518-522), and no conversion out (row 349; Run Z).
- The prelude imports three forms of each narrowing native: Overflowing, Wrapping and Saturating (:40, :51, :58 for `long` to `int`; :88, :96, :103 for `long` to unsigned `int`). It binds no Saturating one [9].

The checked helper behind `asZZ32` raises where the narrowed value differs from the argument (`simpleIntArith.java:106-110`) [2]. The unsigned one, `longOverflowingToUnsignedInt`, raises when any of the high 32 bits is set (`simpleUnsignedIntArith.java:25-29`, `:87-89`) [2].

The prelude's `narrow`, `widen`, `signed` and `unsigned` are the revival's, from rung W of climb batch 2 (`d98024425`, 2026-09-20), and `narrow`'s low bits are P-72's (`ce0c7f453`) [10]. The `as…` and `bitsAs…` getters are the team's (section 3.3).

### 2.5 At the switch-over

At the switch-over the compiled path runs the one library's members with their helpers (P-37, P-58). The prelude's `asZZ32` and `bitsAs…` go with the prelude. Then nothing in the one library narrows with a check (`explorations/coordinator/PLAN.md:73`, "Asked: a checked narrowing", which has no answer on record). Three compiled tests call those getters [11]:

- `ProjectFortress/library_tests/RR64FunctionsRungF.fss`, the revival's (2026-09-19): 10 lines call `.asZZ32` on a `ZZ64`, such as `round(twoHalf).asZZ32` (:87).
- `ProjectFortress/library_tests/AverageTest.fss`, Steele's (first in his snapshot `e177c3e2c`, 2012-05-22): 2 lines call `.bitsAsNN32` (:109-110).
- `ProjectFortress/library_tests/ShiftTest2.fss`, Steele's (`e6f04f2b1`, 2012-05-23): 4 lines call `.bitsAsNN32` (:106, :128 among them).

**References for section 2**

1. Run W (section 1, reference 11).
2. `ProjectFortress/src/com/sun/fortress/nativeHelpers/`: `simpleLongArith.java:306` (`intToLong`); `simpleUnsignedIntArith.java:19-23` (`toLong`), `:25-29` (`toUnsignedIntOverflow`), `:87-89`, `:120-122` (`longWrappingToUnsignedInt`), `:241-242` (the two `NN32` transfer helpers, each `{return x;}`); `simpleUnsignedLongArith.java:245-246` (the two `NN64` transfer helpers); `simpleIntArith.java:106-110` (`longOverflowingToInt`), `:264-266` (`longWrappingToInt`), `:303-307` (`longSaturatingToInt`); `simpleArbitraryPrecisionArith.java:130-136` (`makeZZfromZZ32`, `makeZZfromZZ64`).
3. `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java:286-296` (`ToZZ32`, `ToZZ64`); `Long.java:256-260` (`ToBigNum`).
4. `explorations/coordinator/CLIMB-BATCH-25.md:410`, "A finding for item 331: `ZZ32`'s `big(self): ZZ` … fits an existing helper as a bare string".
5. The evidence, 1.1.
6. `explorations/coordinator/CLIMB-BATCH-26.md:316-318`.
7. The evidence, 1.2 and 1.6; ledger row 859 (`python3 explorations/coordinator/tools/ledger.py show 859`). The members that the refusals read are unchanged: fsi:532-533, :586-590, :645-648, :698-699; `FortressBuiltin.fsi:171-173`.
8. The evidence, 1.3.
9. `grep -nE` for the getters, `narrow`, `widen`, `signed`, `unsigned`, the coercions and the `jLong…To…` natives over `CompilerBuiltin.fss`, at `36ce6e303`; the evidence, 1.5.
10. `git show -s` of `d98024425` ("widen, narrow, unsigned and signed on the compiler prelude's four fixed-size integers") and `ce0c7f453` ("… narrow keeps the low 32 bits"); the evidence, 2.3.
11. `grep -cE '\.(bitsAs[A-Z0-9]+|asZZ32)\b'` over the three files: 2, 4 and 10; `git log --follow --format='%h %ad %an'` of each, first commit.

## 3. The team's sources, and which way they point

### 3.1 The specification

- **The coercion rule and "written explicitly"** (`Specification/basic-lib/basic-integers.tex:34-37`). The revival wrote these lines, in `d9c415395` (2026-09-27), when it made the number chapters describe the flat number types [1].
- **`narrow`'s sentence** (`basic-integers.tex:39-45`): `narrow` converts a `ZZ64` or `ZZ` to `ZZ32`, and an `NN64` to `NN32`, "by keeping its low 32 bits … no `IntegerOverflow` is thrown." The revival wrote it, in `581356f32` (2026-09-28), climb batch 6.5's rung P, to state your decision P-72 [1]. Its callout says: "The Working Draft of February 2011 named neither `narrow` nor `LSHIFT` and `RSHIFT` … the two paragraphs above state the rules the revival decided for them" (`:63-66`). Its Appendix I entry gives the reason: Steele's test asserts the low 32 bits at 2^64 - 1 and 2^63 (`Specification/appendices/changes.tex:1725`, the reason at `:1763-1765`).
- **What the specification leaves out.** It describes no `widen`, `big`, `signed`, `unsigned`, `as…` or `bitsAs…` [2]. Rung P left `ZZ`'s `widen` out on purpose: "its name promises no truncation" [3].
- **The team's general sentence.** "The handling of overflow depends on the type of the number produced. For integer results, overflow throws an `IntegerOverflow`." (`Specification/basic/operators/opr-overview.tex:154-155`, and again at `:195-196`). It is the team's text: the Working Draft has the same lines (`diff` of lines 150 to 210 of the two files is empty), and so has the team's 2012 restart [4]. It is about operators. No passage applies it to a conversion or exempts one [4].
- **The team's lossy spellings.** The same subsections give the wrap and the saturation their own operators: "Wraparound addition and subtraction on fixed-size integers are expressed by ∔ and ∸. … These operations do not overflow." (`opr-overview.tex:205-209`). So the team names the lossy form apart from the plain one.
- **The team's one conversion into an integer with an overflow clause.** The binary words declare `signedIndex(): IndexInt throws { IntegerOverflow }` and `unsignedIndex()` the same (`Specification/advanced-lib/binary.tex:1292-1293`, `:1478-1479`), with "[Description to be supplied.]". The Working Draft has them too. The library does not build them [5].
- **The Working Draft's integers.** Its integer chapter has no fixed-size integer type: `grep -c` for `ZZ32`, `narrow` or `\mathbb{Z}32` in `Specification-1.0-frozen/basic-lib/basic-integers.tex` prints 0 [6].

So the specification's text on these conversions is the revival's. The team's own text speaks to them only through the general sentence and the binary words, and both say: raise.

### 3.2 The library as the team wrote it

`git blame` on today's lines stops at a parentless snapshot of 2012 (`^5a68404fd`), because the conversion of the history cut its parent links. That snapshot's author field names no one who wrote these lines [7]. The authors below are the evidence's reconstruction, which searched the earlier history and the snapshots [8]. The lines of the revival are those that `git blame` gives to "Claude" [1].

- **`ZZ64` to `ZZ32`, `narrow`.** Present in the record's first commit, `72ae6881b` (2007-01-04, the account `jm143038`, Jan-Willem Maessen). It was bound to `Int$FromLong`, which called `Int.rc`, and `Int.rc` threw "Overflow of ZZ32" [9]. It stayed checked, with an error that ends the run, to the team's last commit `a874948ac`. The revival made the error catchable (`413f36ac0`, row 347), and then made it keep the low 32 bits (`d6faad28f`, 2026-09-24), by P-72 [8].
- **`NN64` to `NN32`, `narrow`; `NN32`'s `widen`; `signed` and `unsigned`.** Guy Steele, `dc41d5000` (2008-07-21, his first commit, which added `NN32`, `NN64` and `QQ`). They keep the low bits or the bits. His test asserts the low 32 bits of 2^64 - 1 and 2^63 (`ProjectFortress/tests/UnsignedTest.fss:210-211`) and that `signed` of 2^64 - 1 is below `signed` of 0 (`:219`) [8].
- **`ZZ32`'s `widen`.** In the first commit. Maessen's doc comment of 2008: "widen converts a ZZ32 into a valid ZZ64 quantity." [10]
- **`ZZ64`'s `big`.** Christine Flood, `25acd32f7` (2008-07-10) [8].
- **`ZZ`'s `narrow` and `widen`.** The account Crink, `e1567d62f` (2009-09-10): "Added methods to ZZ to convert to ZZ32 or ZZ64. The nomenclature needs work, in my opinion. Incidentally, my first ever use of Java." Reverted the same day (`02e648434`) and put back the next day (`8d2eb48f5`), unchanged to `a874948ac`, with the comment at fss:1082 [8] [11]. The history records no review. The record leaves open whose account Crink is: "likely external SCA contributor" (`research/authorship.md:68`) [10].
- **`ZZ32`'s `narrow` and `big`, `ZZ64`'s `widen`, and every coercion between integer types**: the revival, `d846e3644` (2026-09-27), when the types became siblings. Before it, `ZZ32` lay under `ZZ64` under `ZZ` and needed no coercion [8].

So at the team's last commit, walk's library was mixed [12]:

- The signed narrowing, `ZZ64` to `ZZ32`, raised.
- The unsigned narrowing and `ZZ`'s two kept the low bits.
- The changes of sign kept the bits.

### 3.3 The team's later word

P-26 says which of the team's decisions wins: "The team's later decision wins over its earlier one, in a text or in code, where the team made it the language's rule." It adds: "Code counts as a decision where the team built it alike for all its types, or stated its rule in a commit message, a comment or the checker. Code that its author called a stub … serve[s] only the implementation." "Later" is the date of the team's work on the point at issue [13].

The team's later work on conversions is in the compiler's prelude, the type group's library:

- **2009.** Maessen's first `asZZ32` on `ZZ64` called `jLongToInt`, `(int) l`: it kept the low bits (`8bcdc8756`, 2009-08-18) [8].
- **2011.** Steele's `9ce7d8189` (2011-09-08, "New test Integer3 (has try-catch problems)") changed that body [14]:

      -    getter asZZ32(): ZZ32 = jLongToInt(self)
      +    getter asZZ32(): ZZ32 = jLongOverflowingToInt(self)

  The same commit made `+`, `-`, `·`, `DIV`, negation and absolute value on `ZZ32` and `ZZ64` checked. It wrote the Overflowing, Wrapping and Saturating natives together, and bound only the Overflowing one [8]. Rung W later counted 32 plainly named members of the prelude's four integer traits that take an Overflowing native [15]. That is a rule built alike for all the types: the plain name checks.
- **2012.** Steele's snapshot `e177c3e2c` (2012-05-22) first holds the `bitsAs…` getters on the four fixed widths, a family built alike. His `304f2743a` (2012-06-12) added the getter `asZZ` on the four fixed widths [8] [10].
- **At the team's last commit**, the prelude declared no `narrow`, `widen`, `signed` or `unsigned`. Rung W added them in 2026 [8].

So the team's later word is: a checked conversion under the plain `as…` name, the bit pattern under `bitsAs…`, and no Fortress name for the low bits. It moved one conversion from the low bits to a check.

**A correction to the ask.** The ask said: "his own pattern has three forms: `as…` checks and raises, `bitsAs…` gives the bits, and `narrow` and `widen` keep the low bits." The third form is not in Steele's prelude. The low-bits names come from walk's library: Steele's 2008 unsigned `narrow`, Crink's 2009 `ZZ` pair, and your P-72 for `ZZ64` [8] [16]. The rest of that sentence holds.

### 3.4 Which way they point

The record settles a fork by three principles: the team's later word (P-26), the library as the team wrote it, and the peers. "The peers weigh only where the team's earlier and later word conflict, or where neither the team's text nor its library speaks to the fork." [17]

- **The later word** points to a checked form under the plain `as…` name, beside the bits under `bitsAs…`.
- **The library as the team wrote it** agrees on the signed narrowing, which raised from 2007 to 2012. It keeps the low bits on the unsigned narrowing and on `ZZ`, and the bits on the changes of sign.
- **The team's word conflicts**: Maessen's 2009 `asZZ32` kept the low bits and Steele's 2011 one raised; Steele's 2008 unsigned `narrow` keeps the low bits beside his 2011 rule. The specification is silent on conversions. So the peers weigh (section 4).
- **Your decisions bind any option.**
  - P-72: `narrow` keeps the low 32 bits, signed and unsigned, on both paths. It does not cover `ZZ` [18].
  - P-73: fixed-width arithmetic raises, "every operation whose result can leave its type". It names arithmetic, not conversions.
  - P-74: an exact conversion is implicit, and a lossy one is written out. It does not say what a written one does.
  - P-66: "A hardware behaviour that bytecode can express gets its own explicit spelling, as the specification's wrapping and saturating operators do." Its peers are Julia, X10, Swift and Rust.
  - P-37: the one library takes a design of the prelude's "where it is the team's later decision".
- **What you were told for P-72.** The retrieval of 2026-10-31 found that you were not told that walk's own signed `narrow` had raised since the first commit, and that Steele's checked `asZZ32` was not named to you [19]. P-72 stands as your decision. Section 6 shows which options keep it.

**References for section 3**

1. `git blame --date=short -L 20,45 Specification/basic-lib/basic-integers.tex`: lines 34-38 `d9c4153953 (Claude 2026-09-27)`, lines 39-45 `581356f32b (Claude 2026-09-28)`; `git log -1` of `581356f32`: "The specification states the integer rules of 2026-09-22 and 24 …". The same blame on the library's lines: section 3.2, reference 7.
2. The evidence, 2.5.
3. `explorations/compile-ladder/rung-spec-integer-rules/decision-record.md:42`, quoted in the widen evidence, 1.3.
4. `diff <(sed -n 150,210p Specification/basic/operators/opr-overview.tex) <(sed -n 150,210p Specification-1.0-frozen/basic/operators/opr-overview.tex)`: no difference; the widen evidence, 1.2 (the 2012 restart, `Documentation/Specification/Prose/Language/Operators/operator-overview.tick:154-155`).
5. The widen evidence, 1.4; `Specification/advanced-lib/binary.tex:1292-1293`, `:1478-1481`.
6. `grep -c "ZZ32\|narrow\|mathbb{Z}32" Specification-1.0-frozen/basic-lib/basic-integers.tex`: `0`; the evidence, 2.5.
7. `git blame --date=short -L 805,813 -L 900,906 -L 983,986 -L 1080,1084 Library/FortressLibrary.fss`: the team's lines show `^5a68404fd (David Chase 2012-07-19 …)`; `git log -1 --format=%P 5a68404fd` is empty, a parentless snapshot; the `fortress-repo` skill, `references/records.md`, "The repository's history" (the conversion cut 146 parent links).
8. The evidence, 2.2, 2.3 and 2.4.
9. `git show 72ae6881b:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java`, lines 162-168: `if ((long) r != i) { throw new ProgramError("Overflow of ZZ32 "+i); }`.
10. The widen evidence, 3; the evidence, 3.
11. `git show -s --format='%h %ad %an | %s' e1567d62f 8d2eb48f5`.
12. The evidence, 2.4, the row for `a874948ac`.
13. P-26 (`explorations/coordinator/tools/facts-extract.sh 'P-26'`); its history, 2026-11-02 12:41Z and 16:45Z, your answer "3" to `explorations/reviews/later-word-ask.md` and your acceptance of its wording.
14. `git show 9ce7d8189 -- ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss | grep -E '^[-+].*asZZ32'`.
15. `explorations/compile-ladder/rung-int-conversions/REPORT.md`, "The specification, and the decision it does not make", quoted in the widen evidence, 2.4.
16. The ask (section 1, reference 1), "The context", third point.
17. The `coordinator` skill, `SKILL.md:95`.
18. P-72; `explorations/coordinator/positions-audit/full/evidence/P-72.md`, section 2 ("The entry omits unbounded `ZZ`"), quoted in the widen evidence, 5.
19. `explorations/coordinator/postmortem-2026-10-28/evidence/narrow-decision-context.md`, Part 2, "What you were not told, that bears on the question today"; the ask, "The context", fourth point.

## 4. The peers, as context

Each peer has two spellings for a narrowing. What matters is what each name tells a reader.

- **Java.** `(int) x` keeps the low bits. `Math.toIntExact(x)` throws `ArithmeticException`. On `BigInteger`, `longValue()` keeps the low 64 bits and `longValueExact()` throws [1]. The cast promises nothing. The word "Exact" names the check. The safe form has the longer name.
- **Swift.** `Int32(x)` traps when the value does not fit. `Int32(truncatingIfNeeded: x)` keeps the low bits. `Int32(exactly: x)` answers `nil` [2]. The plain form promises the value. The label names the loss, or the test.
- **Rust.** `x as i32` keeps the low bits. `i32::try_from(x)` answers an `Err`. `From` exists only where the conversion is exact [2]. `as` promises nothing. `try_from` names the attempt.
- **Julia.** `Int32(x)` throws `InexactError`. `x % Int32` keeps the low bits [2]. The constructor promises the value. `%` names the arithmetic: the remainder modulo 2^32.
- **Haskell.** `fromIntegral x` keeps the low bits. The Haskell 2010 Report says of its fixed-size types: "All arithmetic is performed modulo 2^n", and "For coercing between any two integer types, use fromIntegral." The checked form is `toIntegralSized`, of type `a -> Maybe b` [3]. The general name promises nothing. The checked name says "sized".

So the peers split into two patterns [2]:

- The plain form checks, and the lossy form names its loss: Swift and Julia.
- The plain form keeps the low bits, and the checked form names its check: Java, Kotlin, Rust and Haskell.

Of the peers that P-66 names, Swift and Julia check by default, and Rust's `as` keeps the low bits. X10 was not checked [2].

**What Fortress's names tell.** Fortress has no plain cast between integer types: every lossy conversion is a written name. In option 3 below, `x.asZZ32` names only its target, as Swift's `Int32(x)` does, and checks, as Swift's does. `narrow(x)` names what it does to the value, as `truncatingIfNeeded:` and `%` do, and keeps the low bits. So, by what the names tell a reader, option 3 follows Swift's pattern. The evidence filed it under the other pattern, by form: the functional names keep the low bits and the getters check [4]. Two names break the Swift reading: `widen` on `ZZ`, which names a widening and narrows; and `signed` and `unsigned`, which name only a target and keep the bits, where Swift's name for the bits is `bitPattern:`, the role of `bitsAs…`.

**References for section 4**

1. The widen evidence, 7: `jshell` runs ("Java BigInteger.longValue(2^64+5) = 5", "Java Math.toIntExact(2^32+5) -> ArithmeticException: integer overflow").
2. The evidence, 4: Swift read in `swiftlang/swift`, `stdlib/public/core/Integers.swift`; Julia read in `JuliaLang/julia`, `base/boot.jl` and `base/int.jl`; Rust run with rustc 1.97.0 ("Rust ((1<<32)+5) as i32 = 5", "Rust i32::try_from((1<<32)+5) = Err(TryFromIntError(PosOverflow))"); Kotlin's API pages. None of Swift, Julia or Haskell is installed here (`which swift julia ghc` prints nothing).
3. The Haskell 2010 Report, chapter 18, section 18.1, https://www.haskell.org/onlinereport/haskell2010/haskellch18.html, fetched 2026-11-06; the `base` package's `Data.Bits` page, https://hackage-content.haskell.org/package/base-4.22.0.0/docs/Data-Bits.html, fetched 2026-11-06, its synopsis: `toIntegralSized :: (Integral a, Integral b, Bits a, Bits b) => a -> Maybe b`. Not run.
4. The evidence, 5.2, way C, "What it leaves", third point.

## 5. The model program's exposure

- **Its lines name no conversion.** `grep -nwE` for `narrow`, `widen`, `unsigned`, `signed`, `big`, `numerator`, the `as…` names, `ZZ64`, `NN32`, `NN64`, `ZZ`, `truncate`, `round`, `asFloat` and `strToInt` over `explorations/run-c4/src/{MicroGptFlat,MicroGptFlatQuick,FlatArrays,FlatData}.fss` and `explorations/apl/mg/{MicroGptApl,MicroGptAplQuick,AplMg,AplMgSyntax,FlatArrays2,FlatData2}.fss` finds only `strToInt` (`FlatData.fss:34`, `FlatData2.fss:37`) and a comment (`FlatArrays.fss:6`) [1]. No model file changed since 2026-10-31 [1].
- **Its integers are all `ZZ32`.** The indices, the sizes and the parameter offsets (`MicroGptFlat.fss:37-45`; `MicroGptApl.fss:53-61`), the batch keys `(s bsz + i) MOD corpus.size()` (`MicroGptFlat.fss:93`; `MicroGptApl.fss:122`), the step counter (`MicroGptFlat.fss:75`, `:82`; `MicroGptApl.fss:103-112`), and the token ids from `strToInt`, which is `ZZ32` throughout [2].
- **Its conversions are exact coercions.** The numeral of `(nanoTime() - t0) DIV 1000000` coerces into `ZZ64` (`MicroGptFlat.fss:95`; `MicroGptApl.fss:124`) [2]. `1.0 s` coerces the `ZZ32` step into `RR64` (`MicroGptFlat.fss:82`), which P-74 makes implicit.
- So no conversion in its lines can reach an edge. An integer that leaves its range there would come from arithmetic, which raises today (P-73).
- **The library under it reaches no lossy conversion.** This was the evidence's open point [3]. I measured it with the evidence's own method. A scratch copy of `Library/FortressLibrary.fss` replaced each of its seven lossy members with a body that calls the original binding, prints once when the member is first reached, and prints every edge. An example, for `ZZ64`'s `narrow`:

      narrow(self):ZZ32 = do
          r = convRawB(self)
          if NOT convSeenB then convSeenB := true; println("CONV-REACHED ZZ64-narrow " self) end
          if widen(r) =/= self then println("CONV-EDGE ZZ64-narrow " self " -> " r) end
          r
        end
      convRawB(self):ZZ32 =
          builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.longWrappingToInt")

  The seven are `ZZ32`'s `unsigned`, `ZZ64`'s `narrow` and `unsigned`, `NN64`'s `narrow` and `signed`, and `ZZ`'s `narrow` and `widen`. The quick checks then ran from a mirror of their folders, each with an empty private caches folder [4]:
  - A control, Run W's program against the copy: 7 "CONV-REACHED" lines and 20 "CONV-EDGE" lines, with Run W's values, such as `CONV-EDGE ZZ64-narrow 1099511627776 -> 0`.
  - `MicroGptFlatQuick.fss`: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, rc=0, 120 s, and 0 "CONV-" lines.
  - `MicroGptAplQuick.fss`: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, rc=0, 66 s, and 0 "CONV-" lines.
  - Each cached tree of `FortressLibrary` names the copy's path, so the copy was the library that ran.
  - The eighth lossy member, `NN32`'s `signed`, is in `FortressBuiltin`, which cannot print. By grep, the library never calls it: its coercions call `NN64`'s `signed` (fss:822, :996, :998) [5].
  - The quick checks run two forward and backward passes. The full checks run 40 steps of the same functions; they were not run.
- **So no option touches a model line, a model value or the model's speed.** Your rule P-8, the goal of a fast compiled microGPT, does not decide this question. The principles of section 3 do.

**References for section 5**

1. The `grep` above, at `36ce6e303`; `git log --oneline --since=2026-10-31 -- explorations/run-c4/src explorations/apl/mg` prints nothing.
2. The evidence, 5.4; the widen evidence, 6 (`strToInt` at `Library/FortressLibrary.fss:4587-4603`).
3. The evidence, 6, third point.
4. **Run M**, at `36ce6e303`, on a machine with 4 CPUs (`nproc` 4), an Intel Xeon at 2.10GHz, load about 7 from the other reviewers' work, JDK 25.0.4.1, `FORTRESS_THREADS=1`. The mirror held copies of the model's files, the instrumented `FortressLibrary.fss` and the unchanged `FortressLibrary.fsi`, and links to `explorations/run-c` and `explorations/apl/reference` for the data. Commands, from each folder: `bin/fortress MicroGptFlatQuick.fss` and `bin/fortress MicroGptAplQuick.fss`; `grep -c 'CONV-'` on each output: 0 and 0; `head -c 200` of each `interpreter_cache/FortressLibrary-*` entry: `(Component @"…/run-c4/src/FortressLibrary.fss"` and `(Component @"…/apl/mg/FortressLibrary.fss"`. The timings are not a measurement of walk.
5. `grep -nE '\b(signed|unsigned|narrow|widen|big)\s*(\(|\|)'` over `Library/*.fss` and `ProjectFortress/LibraryBuiltin/*.fss`, the compiler's files left out.

## 6. The options

The starting list is the ask's five options, with their numbers [1]. They match the evidence's ways A to E, in order [2]. Options 6, 7 and 8 are ways that the library or the peers add.

### 6.0 What every option shares

- **The compiled path until the switch-over.** No option adds a declaration to the prelude (P-37) or repairs its text (P-38). So until the switch-over the compiled path answers as Run C and Run Z show. After it, the compiled path runs the one library's members and helpers.
- **`ZZ`'s low-bits members need two helpers**, `x.intValue()` and `x.longValue()`, before the switch-over, in every option that keeps them (1 to 4, 7, 8). The record files them as class C, a new helper [3].
- **`ZZ32`'s `big`** moves onto `makeZZfromZZ32` under every option. It is exact and waits only on item 331's group (section 2.2).
- **A new binding over `NN32` or `NN64`** is tested on both paths at values where a signed and an unsigned reading differ, 2^31 and up for `NN32` and 2^63 and up for `NN64` [4].
- **The six transfer helpers**, such as `makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType`, return their argument unchanged. `signed` and `unsigned` bind them, and the compiled path's rewrite also passes every value of an `NN32`, `NN64` or `Char` binding through them [4]. An option that makes `signed` or `unsigned` raise binds new helpers and leaves these six alone.
- **The model program**: no effect in any option (section 5).
- **Rows 858 and 859** close in every option that declares the names on every type (1, 2, 3, 4, 7). In option 6 they close too, except that `narrow` and `widen` of a `ZZ` are then refused on purpose: by reading, `ZZ` coerces into no type that declares them.

### Option 1. The low bits everywhere, with today's names declared on all five types

The evidence's way A [2].

- **The one library.** The 8 lossy members keep the low bits, as today. Nine members are added, each `= self` or a coercion, so that no call goes by coercion: `narrow` on `NN32`, `widen` on `NN64`, `big` on `NN32`, `NN64` and `ZZ`, `signed` on `ZZ32` and `ZZ64`, and `unsigned` on `NN32` and `NN64`. The 5 gaps stay compositions, with the order rule written down: change the width first, then the sign.
- **Results that change.** `widen` of an `NN64` gives the `NN64` itself, not the `ZZ64` -1. `unsigned` of an `NN32` gives the `NN32`, not an `NN64`. `narrow` of an `NN32` gives itself, not an "Ambiguous coercion". `big` of an `NN64` or a `ZZ` answers.
- **Helpers.** Only `ZZ`'s two (6.0).
- **The specification.** Sentences for `widen`, `big`, `signed` and `unsigned` beside `basic-integers.tex:39-45`, with an Appendix I entry.
- **Tests.** No test changes. New walk and compiled guards for the nine members and rows 858 and 859.
- **Size.** One rung [1] [2].
- **What it leaves.** Item 20: the low 64 bits, P-72 extended to `ZZ`. Item 338: the low bits. PLAN.md:73: no checked form; at the switch-over the three compiled tests of section 2.5 are respelled, two of them Steele's.

### Option 2. Swift's pattern: the plain names raise, and new names give the low bits and the bits

The evidence's way B [2].

- **The one library.** `narrow`, `widen`, `signed` and `unsigned` raise `IntegerOverflow` where the value does not fit. Members for the 5 gaps raise too. New names give the low bits, one for each lossy pair that gets one; their names are yours to choose. The bits get the prelude's four `bitsAs…` getters. With option 1's nine identities and owners, that is 26 to 31 members [2]. If the low-bits names are functional methods, each reserves its name in every program; getters reserve none.
- **Members changed.** The 8 lossy members are bound to checking helpers: the six that name helpers now, and `ZZ`'s two. The coercion bodies written through `signed` (fss:822, :996-1000) are rewritten to stay exact.
- **Paths.** Until the switch-over, walk's `narrow` raises while the prelude's `narrow` keeps the low bits (Run C), so the two paths differ there.
- **Helpers.** New checking helpers for the changes of sign (four) and for `ZZ` (four or more), each a few lines that raise as `simpleArbitraryPrecisionArith.shiftLeft` does [2] [5]. An edit of Java: a rebuild and the library order.
- **Decisions.** It reverses P-72, signed and unsigned. It reads P-73's "every operation whose result can leave its type" as covering conversions. F-132, F-172 and F-124 are rewritten. `basic-integers.tex:39-45` and `changes.tex:1763-1765` are reversed [2].
- **Tests that change** [6]:
  - The team's: Steele's `UnsignedTest.fss:210-211` (the low bits at 2^64 - 1 and 2^63) and `:219` (`signed` of 2^64 - 1 below 0) move to the new names.
  - The revival's: `IntSemanticsRungI.fss:149-152` (`narrow` of 2^32, the maximum, the minimum and 2^31), `NativeHelperFamilyZZ32Walk.fss:45` (`unsigned` of -1), `NativeHelperFamilyIntegersWalk.fss:73-75`, `SignedAboveSignedRangeWalk.fss` (row 856's pin), `library_tests/IntConversionsRungW.fss`, and the compiled guards such as `NativeHelperFamilyIntegersCompiled.fss:124-126`.
  - At the switch-over, `RR64FunctionsRungF.fss`'s `.asZZ32` calls are respelled.
- **The library's own calls.** Each `narrow` or `widen` in the library raises where its value does not fit. By reading, most are in range by construction: masked values, quotients, sizes [2]. `QuickCheck.fss:322`'s `widen` of a `ZZ` beyond 64 bits would raise; row 431's fix removes that call [7].
- **Size.** About two rungs beside the class C helpers [1] [2].
- **What it leaves.** Item 20: raise. Item 338: raise, with the bits under `bitsAs…`. PLAN.md:73: answered, the plain names check.

### Option 3. Steele's pattern, made total

The evidence's way C, with option 1's nine identities and owners, as the ask stated it: "`as<Type>` getters that raise on every lossy pair, `bitsAs…` where the bit pattern is wanted, and today's names kept as the low-bits forms, declared on every type so that no call falls through a coercion" [1] [2].

- **The one library.**
  - On each of the five types, the getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ`: 25 getters. Of these, 5 are identities, 7 equal the coercions, and 13 raise where the value does not fit. So every one of the 20 pairs has a checked member.
  - The four `bitsAs…` getters on the fixed widths, which equal `signed` and `unsigned`.
  - Option 1's nine identities and owners for today's names.
  - Today's 8 lossy members are unchanged. P-72 stands.
  - In all, up to 29 getters, which reserve no name, and 9 functional bodies, whose names are already reserved.
  - `IntLiteral` already has the five `as…` getters in both libraries, so the family becomes one across the numerals and the integer types [2].
- **Results that change.** Those of option 1. No existing value changes.
- **Helpers.** Two ways, the rung's choice:
  - Java helpers in P-58's form, as Steele's `asZZ32` binds one. Three pairs have one now: `simpleIntArith.longOverflowingToInt` for `ZZ64` to `ZZ32`, and `simpleUnsignedIntArith.longOverflowingToUnsignedInt` for `NN64` to `NN32`, and by reading for `ZZ64` to `NN32`, since it raises whenever a high bit is set [8]. By reading, about four new helpers cover the rest, if the other getters are compositions: a sign check at 32 bits (`ZZ32` to `NN32`, and `NN32` to `ZZ32`), a sign check at 64 bits, and `ZZ` to `ZZ64` and to `NN64`. Up to ten, if each pair gets its own.
  - Fortress bodies, with a range test and `throw IntegerOverflow`, as `QQ`'s `truncate` throws `DivisionByZero` (fss:656). These need no Java.
- **The specification.** Sentences for the `as…` and `bitsAs…` getters and for the other names, beside `basic-integers.tex:39-45`, with an Appendix I entry.
- **Tests.** No test changes. New walk tests for each getter at its edges, and compiled tests of any new helper, as `compiler_tests/NativeHelperBindingCompiled.fss` does [4]. At the switch-over, the three compiled tests of section 2.5 compile against the one library unchanged.
- **Size.** One to two rungs [1].
- **What it leaves.** Item 20: the low 64 bits under `widen`, which stays "a documented oddity" [1], and a check under `z.asZZ64`. Item 338: the low bits under `unsigned`, and a check under `x.asNN64` or `x.asNN32`. PLAN.md:73: answered at its default, "carry the prelude's checked getters over", made total. Row 502 is decided as it behaves. `IntLiteral`'s getters still end the run out of range, which the literals' work (N5) meets.
- **Saturation**, Swift's `clamping:`, stays out: the prelude's Saturating natives are unbound, and P-73 leaves the saturating operators to a later step (row 797). It can join any option later.

### Option 4. Option 3, with the misnamed members retired by a rename

The evidence's way D [2].

- **The one library.** As option 3, plus a low-bits family named by its target type, and `bitsAs…` for the bits. `narrow`, `widen`, `big`, `signed` and `unsigned` go, or stay for a while as a second spelling of the low bits. Removing them frees 14 reserved names.
- **Uses to rewrite.** In the library: `narrow` 31, `widen` 36, `big` 15, `unsigned` 10 and `signed` 5 occurrences, declarations included. In the test folders: `narrow` 78, `widen` 348, `big` 110, `unsigned` 217 and `signed` 24. The demos: 17 calls of `narrow`. Many are in the team's tests [2].
- **Helpers.** Option 3's.
- **Size.** Several rungs [1].
- **What it leaves.** As option 3, with each low-bits form under its new name.

### Option 5. Your leaning: delete `ZZ`'s `narrow` and `widen` now, and design `ZZ`'s conversions later

The evidence's way E; your leaning of 2026-10-31, 09:5x [2] [9].

- **The one library.** The two members go (fsi:698-699; fss:1080-1084), with their glue bindings. `ZZ` then has no conversion out. The fixed widths are unchanged; P-72 stands.
- **What reaches them, and must be rewritten in the same change** [2] [7]:
  - `Library/Format.fss:70` (`widen(|/(val / base)\|)`), `:117` and `:122` (`narrow(|\…/|)`). The gated `formatTest` reaches them 76 times a run, all in range.
  - `Library/QuickCheck.fss:320`, `:322` and `:323`, which the gated `ReflectiveQuickCheckTest` reaches on each call of `genZZ.perturb`. Row 431's fix removes `:322`, not the other two.
  - The demo `ProjectFortress/demos/sudoku.fss:42-43`, `narrow(truncate(i/3))`, where a rational's `truncate` answers `ZZ`.
  - `compiler_tests/XXXZZNarrowRungP.fss`, row 349's reproducer, which asserts `narrow` of a `ZZ`.
- **Later.** When P-68's rung makes the float brackets, `round` and `truncate` answer `ZZ` (row 330), every `narrow` or `widen` of one of them needs another way to `ZZ32` or `ZZ64`. That is 4 library lines (`Shuffle.fss:24`, `FortressLibrary.fss:4538`, `Generator22D.fss:149`, `Random.fss:203`), 2 lines of the team's gated tests (`tests/quicksortTest.fss:28`, `tests/sparseMatrix.fss:29`, both of 2007) and 14 demo lines [2] [10].
- **Results that change.** `widen` of an `NN64` is refused, in place of -1. `narrow` of an `NN32` stays ambiguous, between `ZZ64`'s and `NN64`'s [2].
- **Size.** One small change [1].
- **What it leaves.** Item 20: moot. Item 338: open, at the low bits. PLAN.md:73: open. Rows 858 and 859 stay open. The ask's objection: "the formatting component and QuickCheck stop until they are rewritten, and `ZZ` has no conversion out until the design comes" [1].

### Option 6. Option 3, with option 5's deletion folded in

A way that the library adds: option 3's getters give option 5's callers somewhere to go.

- **The one library.** Option 3 whole, except that `ZZ`'s `narrow` and `widen` are deleted, and `ZZ` gets no `narrow` or `widen` among option 1's nine. `ZZ`'s conversions out are its five checked getters. Then `narrow` always goes from 64 bits to 32 bits, and `widen` from 32 bits to 64 bits or to itself.
- **Callers moved onto the checked getters**, with the same values, since each is in range:
  - `Format.fss:70` becomes `(|/(val / base)\|).asZZ64`; for any base of size 2 or more the quotient fits in `ZZ64` [11]. `:117` and `:122` become `.asZZ32` of a string length's quotient.
  - `QuickCheck.fss:320`, under the guard of `:319`, and `:323`, a value masked to 32 bits less 2^31, become `.asZZ32` [7]. `:322` goes with row 431's fix, `obj RSHIFT 32`, or becomes `.asZZ64`.
  - The demo `sudoku.fss:42-43` becomes `(truncate(i/3)).asZZ32`.
  - `XXXZZNarrowRungP.fss` is rewritten for `.asZZ32`: in range it answers, out of range it raises.
- **The low bits of a `ZZ`**, if a program wants them, by reading: `signed((z BITAND 18446744073709551615).asNN64)`. `BITAND` with 2^64 - 1 gives `z` modulo 2^64, which `asNN64` holds, and `signed` keeps the bits. This was not run.
- **Helpers.** Option 3's. `ZZ`'s two low-bits helpers are not written.
- **The specification.** Option 3's sentences, and `basic-integers.tex:39-41` drops `ZZ` from `narrow`'s sentence. That sentence is the revival's (section 3.1). P-72 does not cover `ZZ`, so no decision of yours changes. F-172 is rewritten.
- **Tests.** Option 3's, and `XXXZZNarrowRungP.fss`.
- **Later.** P-68's rung respells the same lines as in option 5, to `.asZZ32` or `.asZZ64`. A float too large then raises, where option 3 would keep its low 32 bits.
- **Size.** By reading, one to two rungs: option 3's, plus about ten library and demo lines, one test and one sentence.
- **What it leaves.** Item 20: moot; `z.asZZ64` raises. Item 338: as option 3. PLAN.md:73: as option 3. Rows 502 and 349's half on `narrow` of a `ZZ` close by the removal.

### Option 7. Option 3, with the checked form answering `Maybe`

A way that the library and the peers add [12].

- **What it is.** Each checked getter answers `Just(v)` or `Nothing`, as the library's `RR64` getter `check(): Maybe[\RR64\]` does (`Library/FortressLibrary.fsi:316`), and as Swift's `exactly:`, Rust's `try_from` and Haskell's `toIntegralSized` do.
- **Helpers.** None: each body is a range test and the low-bits member, in Fortress.
- **What it costs.** The `as…` names cannot carry it. `IntLiteral`'s `asZZ32` answers a `ZZ32`, and so does the prelude's, which `RR64FunctionsRungF.fss` calls. So the family needs other names, or those calls are respelled at the switch-over. It also parts from P-73's "raises" and from Steele's raising `asZZ32`.
- **Size.** As option 3.
- **What it leaves.** Items 20 and 338: the low bits under today's names, and `Nothing` from the checked form.

### Option 8. One generic conversion, with the target as a static argument

A way that the peers add: Julia's `T(x)` and Swift's initializers [12].

- **What it is.** One name, such as `convert[\ZZ32\](x)`, which checks, beside today's names for the low bits.
- **What the record holds.** The library's nearest form is `cast[\T\]`, a checked cast that raises `CastError`, not a conversion. The evidence did not explore this form, and I did not probe it [12]. The team's library and prelude have no such conversion.
- **Size.** Not estimated.

**References for section 6**

1. The ask (section 1, reference 1), "The options" and "How they weigh".
2. The evidence, 5.1 and 5.2, ways A to E; 5.3.
3. The widen evidence, 2.3 (`classified-base.tsv:115`, class C, which PLAN gives to N3).
4. The `fortress-repo` skill, `references/compiler.md`, "Natives"; F-298, F-308.
5. `simpleArbitraryPrecisionArith.java:111-120` (`shiftLeft` raises through `Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow")`); F-24.
6. `ProjectFortress/tests/IntSemanticsRungI.fss:149-152`; `tests/NativeHelperFamilyZZ32Walk.fss:45`; `tests/NativeHelperFamilyIntegersWalk.fss:73-75`; `tests/SignedAboveSignedRangeWalk.fss:8-10`; `compiler_tests/NativeHelperFamilyIntegersCompiled.fss:124-126`; `library_tests/IntConversionsRungW.test` (a compiled test: `link`, `run`); `tests/UnsignedTest.fss:210-211`, `:219`.
7. `explorations/reviews/quickcheck-widen.md`, lines 11, 57 and 123; `Library/QuickCheck.fss:318-325`.
8. `simpleUnsignedIntArith.java:25-29` and `:87-89`; `simpleIntArith.java:106-110`.
9. `explorations/coordinator/HELD.md`, "Held in chat (2026-10-31)", 09:5x.
10. `grep -rnE '(narrow|widen)\s*\(?\s*(\|\\|\|/|⌊|⌈|truncate|round|numerator|denominator|big\()'` over `ProjectFortress/tests`, `library_tests`, `compiler_tests` and `demos`: `quicksortTest.fss:28`, `sparseMatrix.fss:29`, and 16 demo lines: 9 in `trips.fss`, 2 in `posFeedback.fss`, 1 each in `conjGrad.fss`, `tictactoe.fss` and `newtictactoe.fss`, and the 2 of `sudoku.fss`, which reach `ZZ`'s `narrow` today through a rational's `truncate` and which option 5 rewrites at once. Today, before P-68's rung, the float brackets and `truncate` answer `ZZ64` (the widen evidence, 2.5; P-68); `git log --follow` dates both gated tests to 2007, the account `jm143038`.
11. The widen evidence, 2.5, on `Format.fss:70`.
12. The evidence, 5.3.

## 7. How the options weigh

**The three principles split** (section 3.4). The team's later word asks for a checked form under the plain `as…` name. The team's library keeps the low bits on most pairs. The peers split two ways. So the principles do not settle the fork, and it is yours [1].

**Your decisions.**

- P-72 stands in options 1, 3, 4, 5, 6, 7 and 8. Option 2 reverses it, with a line of Steele's 2008 test and the revival's own sentence of the specification.
- P-73 reaches conversions only in option 2, for the plain names. Options 3 and 6 give it the `as…` names.
- P-37's "the one library takes a design of the prelude's where it is the team's later decision" is met by options 3, 4 and 6, which carry `as…` and `bitsAs…` across. Options 1 and 5 let them lapse at the switch-over. Option 2 keeps `bitsAs…` and drops `asZZ32`.

**Your principle of 2026-10-31, 09:2x**: consistency and symmetry first; `narrow` and `widen` alike across the types; both forms, named consistently; the gaps filled [2].

- Options 3, 4, 6 and 7 give both forms. Every pair gets a checked member, and the low bits come from a member or a two-step composition.
- Options 1 and 5 give one form.
- Option 2 gives both, but names the low bits anew.
- `widen` that narrows stays in options 1, 2 and 3. Options 4 and 6 remove it.

**Your leaning of 2026-10-31, 09:5x**: `ZZ`'s two are incorrect code to delete, with both forms out of `ZZ` later [3].

- Option 5 takes it alone, and leaves `ZZ` with no conversion out and its callers broken until they are rewritten.
- Option 6 takes it with option 3. The raising form out of `ZZ` comes now, as the getters, and the callers move onto it with their values unchanged. The low-bits form out of `ZZ` is a three-step composition, or comes later.
- Option 3 keeps the two as a documented oddity.

**The switch-over.** The prelude's checked `asZZ32` and its `bitsAs…` leave with it [4]. Options 3, 4 and 6 keep both in the one library, so three compiled test files, two of them Steele's, compile unchanged. Options 1 and 5 respell all three. Option 2 respells one.

**Cost**, from least: option 5; then option 1; then options 3, 6 and 7, about alike; then option 2; then option 4. Option 6 adds to option 3 about ten lines now, and respells 20 lines in P-68's later rung: 4 in the library, 2 in the team's gated tests and 14 in the team's demos.

**What each breaks.** Option 2 changes values that the team's and the revival's tests assert. Option 4 rewrites hundreds of call sites. Option 6 changes no value that any test asserts in range, and one `XXX` test of row 349.

**The model program.** No option touches it (section 5). So the decision rests on the principles and your decisions, not on the goal.

**The choice comes down to options 3 and 6.** They are the same on the four fixed widths. On `ZZ`:

- Option 3 costs nothing more, gives the low 64 bits of a `ZZ` one name, and keeps a `widen` that can turn 2^63 into a negative number (Run W).
- Option 6 makes `ZZ`'s only conversion out the checked one. That fits the team's general sentence, Steele's later word, rung P's reading that the name "promises no truncation", and your own leaning. It costs about ten lines now and the respelling in P-68's rung.

**References for section 7**

1. The `coordinator` skill, `SKILL.md:95` and `:103` ("chooses among ways that the record does not settle, where the three principles split or are silent").
2. `explorations/coordinator/HELD.md`, "Held in chat (2026-10-31)", 09:2x.
3. The same, 09:5x.
4. `explorations/coordinator/PLAN.md:73`.

## 8. The recommendation

**Is it still option 3?** Yes, on the four fixed widths: every reason that the ask gave for option 3 holds on today's head, and climb batches 24 to 26 changed no value (section 2.2). One sentence of the ask's context is corrected: the low-bits names are walk's and yours, not Steele's prelude's (section 3.3); the reason still holds, since P-72 keeps them. Not on `ZZ`: there, option 3's getters make your leaning cheap, so option 6 adds the deletion to option 3.

**References for section 8**

1. The ask (section 1, reference 1), "My recommendation: option 3, in the batch after 24, with the checked form raising `IntegerOverflow` as your overflow rule says."
2. Sections 2.2, 6 and 7 of this review.

**Recommendation: option 6, that is, option 3 with `ZZ`'s `narrow` and `widen` deleted in the same rung and their callers moved onto the new checked getters, the checked form raising `IntegerOverflow`, before the batch that would move `ZZ`'s two bindings.**
