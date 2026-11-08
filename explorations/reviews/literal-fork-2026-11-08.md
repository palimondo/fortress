<!-- What type a numeral has at a place that fixes no type: two coherent readings, A (the numeral keeps its own type) and B (a default), measured on both paths at `157323e5` and costed by reading, for the curator, by an Opus worker for the coordinator, 2026-11-08. Read-only: nothing under /home/user/fortress or base28 was changed, built or committed. -->

# A numeral where nothing fixes a type: two readings, measured

**Base, tools and files.**
- Base: `157323e5`. Walk ran from `/home/user/fortress-base28` through `explorations/coordinator/tools/old-fortress.sh` with a private caches folder in the scratchpad.
- The compiled path ran in a worktree seeded at the base, `/home/user/fortress-probe-literal`, against the compiler's prelude (`bin/fortress compile`, `run`).
- The checker against the one library ran through the count stage's driver, `explorations/coordinator/tools/checker-count/WorldFlip.java`, with `-stop check` on each program (24 s each). It gives static types only: no compiled program runs on the one library before the switch-over.
- Programs and logs: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/literal-fork/` (`LitFork*.fss`; `tmp/walk2.txt`, `tmp/comp1.txt`, `tmp/one1.txt` to `one3.txt`, `tmp/tv.txt`). The worktree and the caches folders are removed.
- Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`, at the base. Main has moved past the base; where a count differs on main, I say so.
- "By reading" marks every claim about code that was not built. Neither reading is built.

## 1. The question, and the two readings

### 1.1 The places that fix no type

A place fixes a type when it declares one: a typed binding or assignment, a parameter of a number type, a field, a return type, a written static argument (`revival-changes.md`, "Numbers"; P-172). These places fix none:
- a binding with no declared type, `x = 3`, `y = 0.5`. The variable's static type is the initializer's (`Specification/basic/variables.tex:75`);
- a parameter of type `Any` (or `Object`, `Number`, an unbounded type parameter);
- a static argument that only the numeral fixes: `Cell(3)`, `<|1, 2, 3|>`;
- the operands of `SEQV`, and of `=` where the declaration that fits is the one over `Any`;
- a tie among coercions: `1.0 s` for `s: ZZ32`. The checker reads a tied integer numeral as `ZZ32` (F-73; `Specification/basic/inference.tex:299-317`). No rule exists for a float numeral.

### 1.2 Reading A: the numeral keeps its own type until a type is fixed

- An integer numeral is an `IntLiteral` (P-76), a numeral with a radix point a `FloatLiteral` (P-172). Each holds the exact value.
- At a typed place the library's coercion converts it once: exactly into an integer type or `QQ`, with one rounding into `RR64` or `RR32`.
- Elsewhere it stays a value of its own type at run time. `x = 3` gives `x` the type `IntLiteral`. `Cell(3)` is a `Cell[\IntLiteral\]`. `3 SEQV z` is `false` for `z: ZZ32 = 3`. `1/2 = 0.5` is `true`, because `QQ` converts from both and declares the `=` pair (P-172).
- This is what the record holds today: P-76, and P-172's clause "Where nothing fixes a type ... the numeral stays an exact `FloatLiteral`: `Cell(0.5)` is a `Cell[\FloatLiteral\]` on both paths".

### 1.3 Reading B: a default where nothing fixes a type

- The numeral has its own type only while the checker types the program. At a typed place it converts exactly, once.
- At a place that fixes no type it becomes `ZZ32`, or `ZZ64` or `ZZ` by its value, and with a radix point `RR64`.
- `x = 3` gives `x` the type `ZZ32`. `Cell(3)` is a `Cell[\ZZ32\]`. `3 SEQV z` is `true`.
- No value of type `IntLiteral` or `FloatLiteral` exists at run time. The conversions become constants that the code generator emits.
- `1/2 = 0.5` depends on one sub-choice of B (section 3.6).

## 2. Where the team's sources split

Four sources speak, and they give three designs. The papers say nothing on numeral types (the study, `explorations/reviews/literals-2026-11-08.md` §1.2).

- **The Working Draft of February 2011.** Numerals "are not directly converted to any of the number types because ... we expect them to be polymorphic ... converting it immediately to a floating-point number may lose precision"; "numerals have their own types"; the library defines coercions to integers and rationals (`Specification-1.0-frozen/basic/expressions/literals.tex:132-148`). A compound numeral is a rational, "3.125 has the rational value 3125/1000" (`:163`). Its numeral types were never declared (F-169). It supports A.
- **The compiler's prelude, the type group's library, 2009 to 2012** (the later word of P-26).
  - It declares `trait IntLiteral ... excludes {ZZ32, ZZ64, NN32, RR64, RR32, ...}` with its own arithmetic (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:883-929`), and `trait FloatLiteral excludes {RR32, RR64}` (`:996`), which `RR64` and `RR32` coerce from (`:932`, `:993`).
  - Measured (§3.3): at every untyped place the compiled path keeps `IntLiteral` and `FloatLiteral`.
  - The type group moved there from a numeral that acted as a `ZZ32`. A team test of 2009 says "IntLiteral <: ZZ32 has + that returns ZZ32" (`compiler_tests/Compiled10.Comprehensions4.fss:21`). Another of 2009 says "Currently fails because IntLiteral <!: ZZ32" (`compiler_tests/Compiled6.bo.fss:27`).
  - It supports A.
- **The interpreter's library and walk.**
  - Before P-76 the library declared its integer numeral type as an object that extends `ZZ32`. Its arithmetic was held back by the comment "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals." (`Specification/appendices/changes.tex:3747-3750`).
  - It still declares `value object FloatLiteral extends RR64` (`LibraryBuiltin/FortressBuiltin.fsi:44`).
  - Walk evaluates an integer numeral to `Int`, `Long` or `BigNum` by its value (`interpreter/evaluator/values/FIntLiteral.java:40-56`).
  - So a numeral computes as its default type wherever it goes. But a float numeral keeps its own type in generics and under `SEQV` (`Cell(0.5)` is a `Cell[\FloatLiteral\]`: the probe, R364A 5; the study, N10).
  - It supports B at run time for integers, and is half-way for floats. By P-26's terms, the held-back comment marks the `ZZ32` design as one that worked around a limit, the missing coercion.
- **The 2012 restart.** "The type of a numeric literal is `QQ` if it contains a '.' character, and otherwise is `NN`." (`Documentation/Specification/Prose/Language/Expressions/literals.tick:25`). P-25 gives the restart weight for its Types chapter only, so this is context.
  - Like A, it keeps the value exact where nothing fixes a type. `3 SEQV z` would be `false` (`NN` against `ZZ32`).
  - Like B, it gives the numeral an ordinary number type, not a literal type.
  - It supports neither reading as stated.

So the split is: the Working Draft and the prelude against the interpreter's library and walk, with the restart apart. The revival's own texts follow A. The `IntLiteral` box is at `Specification/basic/expressions/literals.tex:149-165`. `id(3)` "instantiates `id` at the numeral's own type" (`basic/inference.tex:186`). A numeral at an `Any` parameter is not coerced, since coercion happens only where the declared type "is exactly the type U" (`basic/conversions-coercions.tex:100`; that sentence is the team's).

## 3. Measurements at `157323e5`

### 3.1 How they were run

- Walk: `old-fortress.sh /home/user/fortress-base28 <scratch>/walk-caches P.fss`, with the setup lines of `references/build-and-caches.md`, `FORTRESS_THREADS=1`.
- Compiled: `../bin/fortress compile <scratch>/P.fss` and `../bin/fortress run P` from the seeded worktree's `ProjectFortress/`.
- The checker on the one library: `java -Xmx4g -Xss64m -Dfortress.caches=<private> -cp <classes>:$CP WorldFlip -stop check <scratch>/P.fss`, with `WorldFlip.java` compiled against the worktree's class path. A static type is read from a refused binding `sx: String = x`.
- I took the study's (§2.1 to §2.3) and the row 364 probe's (`explorations/reviews/row-364-walk-generics-2026-11-08.md` §0) measurements as findings, and did not run them again.

### 3.2 Walk (new: untyped bindings, displays, `f(x)`, ties)

`LitForkWalk.fss` declares `x = 3`, `y = 0.5`, `z: ZZ32 = 3`, `w: RR64 = 0.5`, `object Cell[\T extends Any\](v: T)`, `f(a: Any)` returning the ilk, and `kind` over `Cell[\ZZ32\]` and `Any`. The run ended with rc=0:

    W1 x ilk ZZ32 ilkName ZZ32 typeOf Int; y ilk FloatLiteral ilkName FloatLiteral typeOf FloatLiteral
    W2 x SEQV 3 true; x SEQV z true; y SEQV w true; y SEQV 0.5 true; x = z true; y = w true
    W3 Cell(x) prints Cell[\ZZ32\] typeOf Cell[\Int\] kind Any decl
    W4 <|1,2,3|> ilk ArrayList[\ZZ32\] typeOf ArrayList[\Int\]; prints <|1, 2, 3|>
    W5 f(3) ZZ32; f(x) ZZ32; f(0.5) FloatLiteral; f(y) FloatLiteral
    W7 x + 1 = 4 ilk ZZ32 typeOf Int; y + 0.25 = 0.75 ilk RR64 typeOf Float
    W8 bigN ilk ZZ64 typeOf Long; bigN + 1 = 3000000001 ilk ZZ64

- `y SEQV w` is `true` only because `w: RR64 = 0.5` stays a `FloatLiteral` under walk (row 943). P-172's walk conversion turns it `false`.
- `big` is a functional method of the library, so the program names the variable `bigN`.

`LitForkWalkQQ.fss` (`y = 0.5`, then `q: QQ = y`) stopped with rc=1:

    RHS expression type FloatLiteral is not assignable to LHS type QQ

`LitForkWalkTie.fss` (`b = 0.9`, `s: ZZ32 = 3`) ended with rc=0:

    WT1 1 - b = 0.09999999999999998 ilk RR64 typeOf Float; asExprString 0.09999999999999998
    WT2 b^2 = 0.81 ilk RR64 typeOf Float
    WT3 1.0 s = 3.0 ilk RR64 typeOf Float
    WT4 y01 + 0.2 = 0.30000000000000004; (y01 + 0.2) = 0.3 false

No tie arises under walk today: `FloatLiteral` extends `RR64`, and `QQ` converts from neither.

### 3.3 Compiled, against the compiler's prelude

`LitForkComp.fss` (the same bindings; `sEq` binds `equality.sEquiv`, `tName` binds `stringOps.typeName`) compiled with rc=0 and ran with rc=0:

    K1 x ilk IntLiteral; y ilk FloatLiteral
    K2 sEq(x, 3) true; sEq(x, z) false; sEq(y, w) false; x === z false; y === w false
    K3 Cell(x) Cell[\IntLiteral\]; Cell(3) Cell[\IntLiteral\]; Cell(y) Cell[\FloatLiteral\]
    K5 f(3) IntLiteral; f(x) IntLiteral; f(y) FloatLiteral
    K7 x + 1 = 4 ilk IntLiteral
    K8 bigN ilk IntLiteral

`LitForkCompY.fss` gave `K7b y + 0.25 = 0.75 ilk RR64`.

The checker's static types, from `LitForkCompStatic.fss` (`sx: String = x` and so on; compile rc=255):

    LitForkCompStatic.fss:7:16:  Right-hand side has type IntLiteral, but declared type is String.
    LitForkCompStatic.fss:8:16:  Right-hand side has type FloatLiteral, but declared type is String.
    LitForkCompStatic.fss:9:16-18:  Right-hand side has type IntLiteral, but declared type is String.   (bigN)

The prelude refuses these (compile rc=255):
- `<|1, 2, 3|>`: "Operator <|_|> is not defined." The prelude has no lists.
- `1/2 = 0.5`: "(RR64, RR64)->RR64 is not applicable to an argument of type (IntLiteral, IntLiteral)." The prelude has no `QQ`, and no coercion from `IntLiteral` into `RR64`.
- `1 - b`: "... is not applicable to an argument of type (IntLiteral, FloatLiteral)", for every declaration of `-`.
- `1.0 s`: "... is not applicable to an argument of type (FloatLiteral, ZZ32)". The prelude has no coercion from `ZZ32` into `RR64`.

`b^2` compiled and ran: `KT2 b^2 = 0.81 ilk RR64`.

So `x + 1` computes on `IntLiteral`s at run time, through `nativeHelpers/simpleIntLiteralArith.java`. That helper reads each operand back with `new BigInteger(a.toString())` (`:12-14`).

### 3.4 The checker against the one library (what the switch-over gives as the library stands)

`LitForkOneLib.fss` (rc=-1, 9 errors, 24 s):

    :17  Right-hand side has type IntLiteral, but declared type is String.          (x)
    :18  Right-hand side has type FloatLiteral, but declared type is String.        (y)
    :19  Right-hand side has type IntLiteral, but declared type is String.          (bigN)
    :20  Right-hand side has type List.List[\IntLiteral\], but declared type is String.   (<|1, 2, 3|>)
    :21  Right-hand side has type Cell[\IntLiteral\], but declared type is String.  (Cell(3))
    :22  Right-hand side has type Cell[\IntLiteral\], but declared type is String.  (Cell(x))
    :23  Right-hand side has type Cell[\FloatLiteral\], but declared type is String.(Cell(y))
    :24  Right-hand side has type IntLiteral, but declared type is String.          (x + 1)
    :25  Right-hand side has type RR64, but declared type is String.                (y + 0.25)

The ties, each in its own program (`LitForkOneLibT1` to `T3`, 23 to 24 s each). Each was accepted, with the result typed `RR64`:

    T1  1 - b   ->  Right-hand side has type RR64, but declared type is String.
    T2  b^2     ->  Right-hand side has type RR64, but declared type is String.
    T3  1.0 s   ->  Right-hand side has type RR64, but declared type is String.

`LitForkOneLibQ.fss`:

    :5   Right-hand side has type QQ, but declared type is String.        (1/2)
    :7   Right-hand side has type FloatLiteral, but declared type is QQ.  (q: QQ = y)

`h = (1/2 = 0.5)` raised no error. By reading, it reaches the `=` over `Any`, so it answers `SEQV`, `false`, as walk does (study Q1).

Two tests under the same driver:
- `tests/XXXNestedComprehensionDeclaredTypeWalk.fss` is refused: "Right-hand side has type List.List[\Any\], but declared type is List.List[\ZZ32\]." The cause is the reduction's static argument (row 731), not the numerals. So this test does not tell the readings apart on the checker.
- `tests/LongStringTests.fss` stops on errors in `Library/File.fsi` ("multiple declarations of FileReadStream"), before its own lines. So I could not check `:121`, `:141` there.

### 3.5 Taken from the study and the probe

- Walk: `3 SEQV z` is `true`, `3 SEQV w` (`w: ZZ64`) is `false`, `3 = w` is `true` (study N1). `1/2 = 0.5` is `false` (Q1). `VCell(3) SEQV VCell(z)` is `true` (N11).
- Walk: `Cell(3)` prints `Cell[\ZZ32\]` but is a `Cell[\Int\]`, and `kind` picks the `Any` declaration (probe R364A 1). `Just(3) = Just[\ZZ32\](3)` is `false` (R364I I3).
- Compiled: `3 === z` is `false`, and `3` at `Any` is an `IntLiteral` (study C6). `Cell(3)` is a `Cell[\IntLiteral\]` (C10).

### 3.6 Each case, side by side

"Today" is measured. "A" and "B" are each reading when built, by reading. A assumes P-172 built, and a float tie rule that reads `RR64`, which A needs (§4.1).

- **Static type of `x = 3`.** Walk: `ZZ32` (class `Int`). Compiled and the one library: `IntLiteral`. A: `IntLiteral`. B: `ZZ32`.
- **Static type of `y = 0.5`.** Walk, compiled and the one library: `FloatLiteral`. A: `FloatLiteral`, apart from `RR64`. B: `RR64`.
- **`x SEQV 3`.** Walk: `true`. Compiled: `true`. A: `true`. B: `true`.
- **`x SEQV z`.** Walk: `true`. Compiled: `false`. A: `false`. B: `true`.
- **`y SEQV w`.** Walk: `true` (row 943). Compiled: `false`. A: `false`. B: `true`.
- **`Cell(x)`, `Cell(3)`.** Walk: a `Cell[\Int\]`. Compiled and the one library: `Cell[\IntLiteral\]`. A: `Cell[\IntLiteral\]`. B: `Cell[\ZZ32\]`.
- **`<|1, 2, 3|>`.** Walk: `ArrayList[\Int\]`. The one library: `List[\IntLiteral\]`. A: `List[\IntLiteral\]`. B: `List[\ZZ32\]`.
- **`f(3)`, `f(x)` at `Any`.** Walk: `ZZ32`. Compiled: `IntLiteral`. A: `IntLiteral`. B: `ZZ32`.
- **`q: QQ = y`.** Walk and the one library: refused. A: `1/2`, exact. B: a static error, because `y` is an `RR64` and `QQ` declares no coercion from `RR64` (`Library/FortressLibrary.fsi:399-404`).
- **`1/2 = 0.5`.** Walk: `false`. The one library: accepted, `false` by reading. A: `true`, through `QQ`'s `=` pair over `FloatLiteral` (P-172). B depends on one sub-choice:
  - B with no declaration over a literal type (no literal value can then reach run time): only the `=` over `Any` fits without conversion (P-49). The numeral at it takes `RR64`, and a `QQ` and an `RR64` are never `SEQV`: `false`. `3 = w` for `w: ZZ64` turns `false` the same way, where walk answers `true` today (N1).
  - B keeping the `=` pairs over the literal types: `true`. But the numeral then sits at a parameter of its own type, so a literal value reaches the pair's body at run time, unless the compiler folds the pair's conversion too.
- **`x + 1`.** Walk: `ZZ32` 4. Compiled and the one library: `IntLiteral` 4, computed on `IntLiteral`s at run time. A: the same. B: `ZZ32` 4.
- **`y + 0.25`.** Today: `RR64` 0.75 on every path. A: a tie between `QQ`'s and `RR64`'s `+`, which the tie rule reads as `RR64` 0.75. B: `RR64` 0.75, with no tie.
- **`bigN = 3000000000`.** Walk: `ZZ64`. Compiled and the one library: `IntLiteral`. A: `IntLiteral`. B: `ZZ64`.
- **`1 - b`, `b^2` for `b = 0.9`.** Today: `RR64` (walk, the one library). The prelude refuses `1 - b`. A: a tie, which the rule reads as `RR64` (one-picture review, Appendix A, "The float tie"). B: `RR64`, with no tie, because `b` is an `RR64`.
- **`1.0 s`.** Today: `RR64` 3.0 (walk, the one library); the prelude refuses it. A: a tie, read as `RR64`. B: a tie too, since `1.0` is a numeral there, and the default `RR64` breaks it. So both readings need one float tie rule.

### 3.7 A defect found on the way

`LitForkTieValue.fss` declares `g` over `ZZ32`, `NN32` and `ZZ64`, then `bigN = 3000000000`. Compiled (rc=1):

    TV1 g(3000000000) g ZZ64
    java.lang.Error: java.lang.Error: Not in range for ZZ32: 3000000000

Walk on the same program (rc=0): `TV1 g(3000000000) g ZZ64`, `TV2 g(bigN) g ZZ64`.

- The cause, by reading. `isNumeral` counts any expression of type `IntLiteral` as a numeral (`scala_src/typechecker/impls/Functionals.scala:418-421`). `numeralReading` reads values only from `IntLiteralExpr` nodes, so for a variable its list is empty and reads `ZZ32` (`:428-436`).
- Under A this holds for every name or expression of type `IntLiteral`. Under B the variable is a `ZZ64` at its binding, and no tie arises.
- No ledger row held it. It is filed as row 946 (the appendix).

## 4. What each reading changes (by reading)

### 4.1 Reading A

**The checker** (`scala_src/typechecker/`).
- A float tie rule. `isNumeral` and `numeralReading` (`impls/Functionals.scala:418-436`) and the two tie sites (`:400-410`, `:784-802`) learn `FloatLiteral`, read as `RR64`. About 10 to 20 lines.
- It is needed as soon as P-172's library half makes `FloatLiteral` a type apart from `RR64`. Then `QQ` and `RR64` both convert from it, and `1 - beta1` finds two declarations, neither more specific: "Ambiguous coercion" (`:942`; F-73).
- The defect of §3.7 needs a design of its own, not sized. Three ways: look through an immutable binding to its numeral, choose by the value at run time, or refuse the tie.
- No other checker change. Today's checker is A at every untyped place (§3.3, §3.4).

**The code generator** (`compiler/codegen/CodeGen.java`).
- One rounding (row 862, P-172). `forFloatLiteralExpr` (`:1998-2009`) builds a `double` from three parts. To hold the exact value as P-172 asks, it must pass the text or the rational to `FFloatLiteral`. About 10 to 20 lines.
- Optional: emit the converted constant where the checker coerces a numeral (the study's way I-e, 30 to 60 lines). It is a speed change only. Untyped places keep boxing `FIntLiteral` and `FFloatLiteral` (`:4170-4210`).

**The library.**
- P-172's half: `FloatLiteral` apart, with coercions from it in `QQ` (exact), `RR64` and `RR32`, and their `=` pairs (P-165). About 15 to 30 lines (the one-picture review's rung 2).
- The numeral glue bindings must name compiled helpers before the switch-over (P-169): at the base `IntLiteral`'s 29 and `FloatLiteral`'s 3 (`grep -c` over `FortressBuiltin.fss`); on main 21 and 3 (F-299). Compiled code reaches them, as `x + 1` does (K7).
- Their carrier is "not designed" (P-169: "at the names batch after a reading review designs their carrier").
- About 24 helpers of 3 to 5 lines each, by `simpleIntLiteralArith.java`'s shape, plus the carrier.

**Walk** (`interpreter/evaluator/`). Before P-12:
- P-172's walk half: convert a `FloatLiteral` at a typed binding, parameter and field (the study's way F-d), about 20 lines in `LHSEvaluator` and the parameter binding.
- A float tie rule in `values/OverloadedFunction.bestMatchWithCoercion`, about 15 to 30 lines. Without it, walk stops `1 - beta1` with "Ambiguous coercion" once `FloatLiteral` is apart, since walk's `1` is an `Int`, which both `QQ` and `RR64` convert.
- Row 364's way A (40 to 50 lines in 3 files). Under A this is interim for numerals, and final for computed values (the probe, way E).

After P-12, P-76's walk half: walk's integer numeral becomes an `IntLiteral` at run time, and `Cell(3)` becomes a `Cell[\IntLiteral\]`.
- Probe Q measured this alone: 59 verdicts changed. With four devices, 24 passing tests failed: 6 by design, 9 for want of static types (rows 364, 510), and 9 walk gaps with a device each (F-74; `explorations/reviews/numeral-switch-judgement.md` §3).
- It waits for walk to run the checker, a step not designed. Walk has no case for the checker's `CoercionInvocation` nodes (F-9).
- Walk's 21 `IntLiteral` glue bindings then carry real values (`interpreter/glue/prim/IntLiteral.java`, 327 lines, exists).

### 4.2 Reading B

**The checker: one default, applied at each kind of place.** It needs a helper that coerces an expression of a literal type to its default, elementwise in a tuple, using `numeralReading` and `coercions.buildCoercion`. About 25 lines.
- At an untyped binding: the four sites where the checker gives an untyped variable the initializer's type. Those are top level at `impls/Decls.scala:250-251` and `:287-304`, and local at `:340-341` and `:376-397`. About 12 lines.
- At `Any` and at other parameter types that the literal fits without conversion. Today `checkApplicableWithoutInference` keeps such an argument as it is (`impls/Functionals.scala:452-458`), and so does the inference attempt (`:385-387`). Under B each coerces it to the default. About 10 lines.
- At an unfixed static argument. `named(n)` lists the arguments' own types among the candidates (`:345-353`), which is why `pick(3, 4)` gives `IntLiteral,IntLiteral` today. Under B the literal types leave that list, so the existing reading by numerals (`:400-410`) instantiates at `ZZ32`, `ZZ64`, `ZZ` or `RR64`. About 5 to 10 lines.
- At a tie: the same float rule as A's, which B's default supplies (about 10 to 20 lines).
- At a dotted receiver, `(3).asZZ64`, and in an `if` or `case` join: the default once the type is known not to be fixed. Not sized.
- Total, by reading: about 80 to 120 lines of Scala in `Decls.scala` and `Functionals.scala`, perhaps `Misc.scala`. A change of the checker also needs its timing smoke test (`references/compiler.md`, "The checker's time").
- One more sub-choice. Can a program write `IntLiteral` as a type, as the team's gated `compiler_tests/Compiled5.ah.fss:17` (`x:IntLiteral = 5`) and six other `AfterTypeChecking` tests do (§4.3)? If yes, a literal value exists at run time at that place. If no, the type becomes unwritable, as `Bottom` is (P-25), and those team tests break.

**The fold and the run-time `IntLiteral` arithmetic.**
- The fold. `CoercionDesugarer.desugarTraitCoercion` (`compiler/desugarer/CoercionDesugarer.scala:58-65`) turns a coercion whose argument is a numeral into the numeral typed at the target. About 15 to 25 lines.
- The code generator then emits that type's constant in `forIntLiteralExpr` and `forFloatLiteralExpr`: `FZZ32.make(int)` and so on, `RR64` and `RR32` by one rounding of the exact value, and `QQ` through `ZZ` constants and the library's `/`. About 50 to 80 lines.
- The fold replaces every run-time literal *value*. It does not replace the literal *arithmetic*.
  - Under B an untyped binding is already a `ZZ32`, so `blockSize + 1` is `ZZ32` arithmetic.
  - An operation whose operands are all numerals written inline, as `3 + 4` or `2^40`, still fits `IntLiteral`'s own declarations without conversion (P-49), and its result is an `IntLiteral` at run time.
  - So B must take one of two more steps:
    - drop `IntLiteral`'s own arithmetic, the block the team held back ("Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals", `changes.tex:3747-3750`). Then `3 + 4` ties and reads `ZZ32`, and `2147483647 + 1` raises `IntegerOverflow` where A gives `2147483648`;
    - or fold numeral expressions exactly into one numeral before the checker, the Working Draft's static expressions (`Specification-1.0-frozen/basic/expressions/literals.tex:163-173`; the one-picture review's rung 6, not sized). Today the compiled path folds only a `prefix -` on a numeral (`compiler/desugarer/IntegerLiteralFoldingVisitor.java`; F-262).
  - With either step, no literal arithmetic is left at run time.
- Under A, by contrast, every untyped binding of a numeral, and every expression over such bindings, computes on `IntLiteral`s at run time (K7). That is the outcome the team's comment named.

**The 24 glue bindings.**
- Under B with a complete fold, nothing at run time is an `IntLiteral` or a `FloatLiteral`. Walk's numerals are already `Int`, `Long` and `BigNum` (§3.2), and with B's float change an `RR64`.
- So `IntLiteral`'s 21 and `FloatLiteral`'s 3 (on main; 29 and 3 at the base) become dead. They leave the library with the two objects, which become traits that only the checker reads, as in the prelude (`CompilerBuiltin.fss:883`, `:996`).
- The glue bindings that block the switch-over fall from 52 to 28, `Reflect`'s (F-299). P-169's numeral carrier needs no design.
- Two walk tests use the object `IntLiteral` as a value and break: `tests/IntLiteralValue.fss:20` and `tests/NumberMixedEqualityWalk.fss:7`.

**Walk.**
- Floats: give a float numeral the type `RR64` where nothing fixes a type. There are two ways.
  - The study's F-c: one line in `Evaluator.forFloatLiteralExpr` (`interpreter/evaluator/Evaluator.java:1631-1633`), returning an `FFloat`. Typed `QQ` and `RR32` places then lose exactness under walk until P-12 (rows 944, 454).
  - Or keep the `FFloatLiteral` until its first place, and convert it there: at typed places by the declared type, otherwise to `RR64`, at an untyped binding, an `Any` parameter and an inferred static argument, with walk's tie rule. About 40 to 60 lines.
- Integers: walk's numeral by value is already B's default. Row 364's way A (40 to 50 lines in 3 files) makes `Cell(3)` a `Cell[\ZZ32\]`. Under B that is final, not interim (the probe, §2, way E). Typed-place exactness beyond `ZZ32` (rows 443, 454) waits for P-12, or for the second float way extended to integers.
- After P-12: walk builds each numeral at the type that the checker gave it, about 20 to 30 lines in `forIntLiteralExpr` and `forFloatLiteralExpr`. Walk turns off the coercion desugarer (`references/interpreter.md`, "Where a fix of walk belongs"), so walk needs this case of its own.
- P-76's walk half and probe Q's 24 failures do not arise.

**The library, besides the 24.**
- P-172's `FloatLiteral` apart, with the coercions into `QQ`, `RR64` and `RR32`: needed under B too, because a typed place still converts the exact value.
- The `=` pairs over the literal types: kept or dropped by the sub-choice of §3.6.
- The one library binds a numeral without a type at one place only: `maxFib = 46` in `Library/String.fss:21`, used in `seq(2:maxFib)`. So B's default at untyped bindings barely touches the library's text. Its default at `Any` and at static arguments may touch more. The count and distance stages would show it (§5.2).

### 4.3 Tests that flip or break

The team's tests:
- `tests/NumberPrintTest.fss:16`, `assert("" 3.1415926535897932384000000000001, "3.1415926535897932384000000000001")`. The numeral reaches `opr juxtaposition(a:String, b:Any)` (`Library/FortressLibrary.fsi:2626`), a place that fixes no type. A: it passes, since a `FloatLiteral` prints as written (P-172). B: it breaks, since an `RR64` prints `3.141592653589793`. Its `yelp foo` (`:40`, not asserted) prints `IntLiteral` under A after P-76's walk half and `ZZ64` under B. Its `IntLiteral =>` arm (`:31`) is a static error under B if the type becomes unwritable.
- `tests/LongStringTests.fss:121`, `:141`, `identity⟦Generator⟦Int⟧⟧(⟨7, 9, ...⟩)`. It passes today only because walk builds displays at `Int` (the probe's fact 3). Both readings break it, and both respell it `Generator⟦ZZ32⟧`. Under B the display is a `List[\ZZ32\]`. Under A, row 364's way A breaks it now. A's final `List[\IntLiteral\]` is no `Generator[\Int\]` either, but at `Generator⟦ZZ32⟧` P-51's second typing converts the numerals (by reading). The checker could not reach these lines (§3.4).
- `tests/sequivTest.fss`: every variable is typed. `:58` and `:94` turn back to the team's `equiv` by P-172's walk half, under both readings alike. No line separates A from B.
- `compiler_regressions/seqv.fss`: strings only. P-171 restores `:22`. Neither reading touches it.
- The team's `AfterTypeChecking` tests that write `IntLiteral` as a type: `Compiled5.ah`, `5.aj`, `5.ak`, `6.az`, `9.g`, `9.j`, `9.p`. A: unchanged. B: they break only if the type becomes unwritable.

The revival's tests:
- `tests/StrictEquivalenceRuleWalk.fss`: every numeral is typed. `:32` flips by P-172's walk half under both readings. No line separates them.
- `compiler_tests/StrictEquivalenceRuleCompiled.fss`: every numeral is typed. Unchanged by either reading.
- `compiler_tests/InferCoercionShapes.fss:72`, `pick(3, 4)` asserted `"IntLiteral,IntLiteral"`: B flips it to `"ZZ32,ZZ32"`. `:79`, `c: ZZ64 = idt(3)`, still passes, but its message ("at the numeral's own type") becomes false.
- `compiler_tests/InferO2Num.fss:20`, `op(1, 2)` asserted `"op generic[IntLiteral,IntLiteral]"`: B flips it.
- `compiler_tests/InferO2Pos.fss:18`, `gg(5, w)` asserted `"gg plain[IntLiteral,ZZ64]"` at `gg(x: Any, y: Any)`: B flips it to `ZZ32`.
- `compiler_tests/XXXApplicationErrors.test:19-21` pins "No such method IntLiteral.foo." and "x: IntLiteral after argument inference" for a function parameter inferred from a numeral. B changes the pinned text.
- `tests/FlatTowerRungF.fss:100-113`, five asserts of `"0.0 : FloatLiteral"`, where a library numeral is returned at a declared `RR64`. B with walk's F-c flips all five. Under A they flip only if P-172's walk conversion covers a return, which P-172 does not name (the one-picture review, Appendix A, rung 3).
- `tests/TupleOrderMixedRefused.test:1` pins `(Int,FloatLiteral)`. B with F-c changes it to `(Int,Float)` (the study, F-c).
- `tests/IntLiteralValue.fss` and `tests/NumberMixedEqualityWalk.fss` (`:7`, `:39-108`) bind the object `IntLiteral`. B breaks them. A keeps them.

The `XXX` tests the two reviews name:
- `XXXInferredIntBindingRungT`, `XXXArrayInferredElementVectorWalk` and `XXXOpenRangeInferredIndexWalk` infer from a typed `z: ZZ32`, not from a numeral. Row 364's way A flips all three under both readings.
- `XXXNestedComprehensionDeclaredTypeWalk` binds displays of numerals. Under walk, way A flips it under both readings. On the checker it is refused today for the reduction's static argument (§3.4), so it does not separate them.
- `XXXInferExpectedTypeRungK` and `XXXExpectedTypeFixRungT`: the expected type fixes the static argument, a typed place. Row 510's repair flips them under both readings.
- `XXXInferredStaticArgRungS` and `XXXPureListStridedSubscriptWalk` are about strings (row 364's string half). Neither reading touches them.

## 5. microGPT, the switch-over and the specification

### 5.1 microGPT

The model's untyped numeral bindings:
- flat `explorations/run-c4/src/MicroGptFlat.fss:17-18` and APL `explorations/apl/mg/MicroGptApl.fss:26-27`, at top level;
- `bsz = 1` (flat `:87`, APL `:116`);
- APL `:112`, `sf = 1.0 s`.

**Meaning.** No line changes meaning under either reading, provided a float tie reads `RR64`. The tie sites, by reading:
- On a variable bound from a numeral: `1 - beta1`, `1 - beta2`, `beta1^t`, `beta2^t` (flat `:77-79`; APL `:106`). Under A they tie between `QQ` and `RR64` once P-172's library half lands (the one-picture review, Appendix A). Under B they do not tie: `beta1` and `beta2` are `RR64`.
- On a numeral written in the line: `10.0^(-5)` and `10.0^(-8)` (flat `:18`; APL `:27`), `-(10.0^10)` (flat `:29`), `1.0 headDim` (flat `:59`, `:66`, two sites the one-picture review does not list), `1.0 s` (flat `:82`; APL `:112`). Under both readings these tie, and the one rule reads `RR64`.
- A tie read as `QQ` would make `epsilon` the rational `1/100000`. Then `epsilon + (x DOT x) / |x|` (flat `:27`) would add a `QQ` and an `RR64`, which do not convert. So both readings need the rule at `RR64`.

**Bits.** Unchanged under both. `Double.valueOf` of the text is walk's conversion today (the study, §6). A or B with one rounding gives the same double. The three powers keep today's bits (one-picture review, Appendix A: `Math.pow(10.0, -5.0) == 1e-5` is `true`). The integer results are equal under both.

**Speed.** Not measured. Compiled microGPT does not run yet, and walk is not timed (`references/interpreter.md`, "Running a program"). By reading:
- Under A, on the compiled path after the switch-over, and on walk after P-76's walk half, the hyperparameters are `IntLiteral` and `FloatLiteral` values. Each use at a typed parameter is a coercion call.
- I count, by reading, about 100 to 150 such calls a step. The heaviest are `view(p, i)` (9 a step), each calling `matShape` with its tuple of numerals (flat `:41`) and `matOffset`'s sum over `matShape`. Then `heads(m, blockSize, nHead, headDim)` (`:54`, 4 a step), `onehot` (3), `SQRT (1.0 headDim)` (2), `adam`'s `beta1`, `beta2` and `epsilon_A`, and `learningRate`.
- `4 nEmbd` (flat `:41`) and `blockSize + 1` (`:86`) compute on `IntLiteral`s, each operand read back through `BigInteger` from its text (§3.3).
- All of these sit outside the element loops. A step's array work is on a 4,192-element parameter vector (by the shapes at `:41`). So, by reading, the cost is under one per cent.
- Under B none of these calls exist.

**Points to report.** No line of either model program needs a change under either reading.

### 5.2 The switch-over

At climb batch 28's gate the distance is 0 and the checker count is 0 (F-53). The switch-over also waits for walk's natives: every binding must name something the compiled path runs (`SKILL.md`, "The phases"; P-169).

What must land first:
- **Under A.**
  - The numeral glue bindings' compiled carrier (P-169), since compiled code reaches `IntLiteral`'s arithmetic (K7).
  - P-172's library half with the float tie rule in the checker. Otherwise the compiled path takes `FloatLiteral` below `RR64`, and `y SEQV x` turns `false` (the one-picture review, "The switch-over and microGPT").
  - One rounding (row 862) can land on either side.
- **Under B.**
  - If B's checker default and the fold land first, the 24 glue bindings are dead, and the carrier need not be designed.
  - If B lands after the switch-over, the carrier is built for the interim and then deleted.
  - P-172's library half is needed under B as well.

Which stage reads each change (`references/compiler.md`: the count stage checks the `FortressLibrary` component and its apis, and only that component's bindings; the distance stage checks fourteen components, every stage):
- A's and B's library edits to `FortressBuiltin.fsi` and `FortressLibrary.fsi`: both stages.
- Edits to `FortressBuiltin.fss`'s bindings (A's carrier, B's removal of the 24): the distance stage only.
- A's float tie rule and B's checker default: both stages. B's default retypes the library's own numerals at untyped bindings (one site, §4.2), at `Any` parameters and at inferred static arguments. Either stage could rise.
- The fold and any `CodeGen` change: neither stage, since both stop at the checker (`checker-count/run.sh`, `-stop check`).
- Walk's changes: neither stage.

### 5.3 The specification text

**Reading A.**
- The literals chapter: the Working Draft's sentence that numerals "are not directly converted" (`Specification/basic/expressions/literals.tex:132-148`) stands. The `IntLiteral` box (`:149-165`) stands. It gains P-172's `FloatLiteral` sentence, and a sentence that a numeral where nothing fixes a type stays a value of its own type, with `Cell(3)` as its example.
- The coercion chapter: no change. A numeral at `Any` is not coerced (`basic/conversions-coercions.tex:100`). `basic-lib/numbers.tex:43` gains `FloatLiteral` among the sources of `RR64`'s coercion (P-172).
- The inference chapter: `basic/inference.tex:183-187` stands ("at the numeral's own type"). `:299-317` (`numeral-default`) gains the float tie rule.
- The restart: a sentence of the Appendix I entry says that A does not take `literals.tick:25`'s `QQ`/`NN`.
- Appendix I: P-172's entry, in the revision form (P-96), and a line for the float tie rule in `revival-inference`'s entry.
- Kind of change: a revision that resolves a conflict in the team's sources. It takes the Working Draft's and the prelude's side against the interpreter's library (§2).

**Reading B.**
- The literals chapter: a new revision. Where nothing fixes a type, a numeral is converted to `ZZ32`, `ZZ64` or `ZZ` by its value, or to `RR64`. The Working Draft's "not directly converted" then holds only at typed places. `variables.tex:75` holds as written, since the initializer's static type is the default.
- The coercion chapter: a sentence that a numeral takes its default before the rule of "exactly the type U" (`conversions-coercions.tex:100`) applies, at a parameter that fixes no number type.
- The inference chapter: `inference.tex:186` changes from "at the numeral's own type" to the default. `:299-317` widens from ties to every place that fixes no type.
- The restart: B departs from `literals.tick:25` too (`RR64`, not `QQ`).
- Appendix I: a new entry, in the revision form (P-96). It revises the revival's own text in `revival-numeral-type` (its effect on untyped places) and in `revival-inference`. It reverses P-172's clause on places that fix no type, and replaces P-76's walk half.
- Kind of change: a change of the team's design at the places that fix no type. No team text asks for a default there. It rests on the interpreter's library and walk (§2) and on the peers.

## 6. Exactness, and the rungs

### 6.1 Where B loses exactness that A keeps

- `y = 0.1`, then `q: QQ = y`. A: `q` is `1/10`. B: a static error, since no coercion from `RR64` into `QQ` is declared (`FortressLibrary.fsi:399-404`). The programmer writes `q: QQ = 0.1` or declares `y: QQ = 0.1`, and both are exact under both readings.
- `y = 0.1`, then `r: RR32 = y`. A: one rounding to `RR32`. B: `y` is already a double, and `RR64` to `RR32` is a written conversion (P-74). So two roundings, which can differ from one in rare cases.
- `k = 5`, then `u: NN32 = k`. A: converts. B: a static error. `NN32` coerces only from `IntLiteral` (`LibraryBuiltin/FortressBuiltin.fsi:134`), not from `ZZ32` (P-74).
- `n = 3000000000`, then `r: RR64 = n`. A: converts (`RR64` from `IntLiteral`, `FortressLibrary.fsi:297`). B: `n` is a `ZZ64`, so `asFloat(n)` must be written (P-74).
- A bare numeral printed: A prints its text (P-172; `NumberPrintTest.fss:16`). B prints the double. B also ends the case P-172 left open, `2.5` and `2.50` being `SEQV` but printing apart (the study, E1).

What the peers do at `y = 0.1; q = y` with an exact type (from their specifications as I know them, not run here):
- Swift, Scala, Java and Kotlin fix the type at the binding: a `Double`.
  - Swift refuses `let q: Decimal = y`.
  - Java refuses `BigDecimal q = y`. `new BigDecimal(y)` gives the double's 55-digit expansion, and `BigDecimal.valueOf(y)` gives `0.1` from the shortest decimal text.
  - Scala's implicit conversion to `BigDecimal` goes through the double's decimal text and gives `0.1`.
- Rust and Haskell type the binding from its later uses in the same scope, and default only where none fixes it.
  - Rust's `let k = 5; let u: u32 = k;` compiles with `k: u32`.
  - Haskell, under its monomorphism restriction (the default in a module), gives `y` the type `Rational` from `q :: Rational`, so `q` is `1 % 10`. Without the restriction (GHCi's default since 7.8) `y` stays polymorphic, converting at each use, which is A's behaviour at a binding.
- So B as stated is Swift's, Scala's and Java's rule. A variant B′, which lets a later use in the scope fix the binding's type before the default, would keep the four cases above exact as Rust and Haskell do. B′ is not costed here; its checker work exceeds §4.2's.

### 6.2 Rungs for Reading A, in order

1. **One rounding of a compiled float numeral** (row 862). `CodeGen` passes the exact text: 10 to 20 lines, compiled path. It promotes `XXXFloatNumeralOneRounding`.
2. **`FloatLiteral` apart** (P-172's library half) with the float tie rule on both paths: the library 15 to 30 lines, the checker 10 to 20, walk's dispatch 15 to 30. It needs the count and distance stages and the checker's timing.
3. **Walk converts a `FloatLiteral` at typed places** (P-172's walk half), about 20 lines. It flips `StrictEquivalenceRuleWalk:32` and `sequivTest:58`, `:94`.
4. **Row 364's way A** under walk, 40 to 50 lines in 3 files. It flips the four `XXX` tests and respells `LongStringTests:121`, `:141`.
5. **The numerals' compiled carrier** (P-169's names batch): a carrier design and about 24 helpers. It must land before the switch-over.
6. **The §3.7 defect**: a design, not sized.
7. **Optional: the fold at typed places** (the study's way I-e), 30 to 60 lines of `CodeGen`, for speed.
8. **After P-12: P-76's walk half.** Walk's numerals become `IntLiteral` values (probe Q's 24 failures, F-74). Several rungs, waiting on F-9's step.

One batch can hold 1 to 4: two compiled rungs, one library and checker rung, and two walk rungs, in different areas. 5 goes in the names batch. 7 fits anywhere. 8 comes after P-12.

### 6.3 Rungs for Reading B, in order

1. **One rounding**, as A's rung 1.
2. **`FloatLiteral` apart, with the float tie rule**: as A's rung 2, without walk's tie rule if walk takes F-c. The `=` pairs over the literal types are kept or dropped by the sub-choice of §3.6.
3. **The checker's default** at untyped bindings, `Any` parameters, unfixed static arguments, receivers and joins: 80 to 120 lines of Scala, with the count and distance stages and the timing.
   - It flips `InferCoercionShapes:72`, `InferO2Num:20`, `InferO2Pos:18` and the text of `XXXApplicationErrors`. It resolves §3.7.
   - It needs a decision on whether `IntLiteral` stays writable.
4. **The fold**: `CoercionDesugarer` 15 to 25 lines and `CodeGen` 50 to 80, plus one of the two steps of §4.2 for inline numeral arithmetic.
   - With it, the 24 glue bindings and the two objects leave the library.
   - It breaks `IntLiteralValue` and `NumberMixedEqualityWalk`'s `IntLiteral` lines.
5. **Walk's float default**: F-c, one line, or the place-by-place way, 40 to 60 lines. It flips `StrictEquivalenceRuleWalk:32`, `sequivTest:58`, `:94` and `FlatTowerRungF:100-113`. It changes `TupleOrderMixedRefused.test`'s key, and breaks the team's `NumberPrintTest:16`.
6. **Row 364's way A** under walk, 40 to 50 lines, final for numerals. It respells `LongStringTests:121`, `:141`.
7. **After P-12**: walk builds each numeral at the checker's type, 20 to 30 lines, inside P-12's step.

One batch can hold 1 to 3 and 5 to 6: library and checker, compiled, and walk, in different areas. 4 can join that batch, since no stage reads it, or follow it. Landing 3 and 4 before the switch-over removes A's rung 5.

## 7. How the readings weigh

**By the team's later word (P-26).**
- The type group's prelude, 2009 to 2012, keeps the numeral's own type at every untyped place (§3.3). It moved there from a numeral that acted as a `ZZ32` (§2). The Working Draft keeps numerals "polymorphic" and unconverted.
- Both are A.
- The restart, the latest text, gives an exact type at every place. That is A's exactness under B's kind of type. P-25 makes it context only.
- The record already decided A (P-76, P-172).

**By the library as the team wrote it.**
- The interpreter's library and walk make a numeral compute as `ZZ32`, `ZZ64`, `ZZ` or `RR64` wherever it goes (§2). That is B's run-time behaviour for integers.
- But it keeps `FloatLiteral` visible in generics and under `SEQV`. The team's own comment marks the `ZZ32` design as waiting for coercion.
- The compiler's prelude is also the team's library, and it is A.

**By the peers, where the team's word splits.**
- Every peer named defaults where nothing fixes a type, and none keeps a run-time value of a literal type. That is B.
- Rust and Haskell first let later uses fix the type (B′, §6.1).
- Haskell without its monomorphism restriction keeps a binding polymorphic, which is A's behaviour at a binding.

**By cost.**
- **A.**
  - Checker: smallest, the float tie rule only.
  - Library: P-172's half, which B also needs.
  - Natives: the 24 bindings' carrier is still to be designed and built before the switch-over.
  - Run time: values of the literal types remain, with `IntLiteral` arithmetic read back through `BigInteger` from text on the compiled path.
  - Walk: a float tie rule now, and later P-76's walk half, which waits on an undesigned step of P-12 and broke 24 passing tests in probe Q.
  - Also: the §3.7 defect to design.
  - Kept: every team test; `NumberPrintTest:16` passes; exactness at untyped bindings.
  - Revision: specification text resolving a conflict.
- **B.**
  - Checker: larger, about 80 to 120 lines at several kinds of place, with three compiled test lines and one pinned text flipped.
  - Fold: a required fold of 65 to 105 lines, plus a step for inline numeral arithmetic.
  - Natives: no carrier for the 24 bindings. They leave, and the switch-over's glue falls from 52 to 28.
  - Run time: no literal values.
  - Walk: about final for integers after row 364's way A; floats change by one line or by 40 to 60.
  - Broken: the team's `NumberPrintTest:16`, and the seven team tests that write `IntLiteral` if the type becomes unwritable.
  - Lost exactness: at an untyped binding later used at `QQ`, `RR32`, `NN32`, `NN64` or `RR64` from `ZZ64` (§6.1).
  - `1/2 = 0.5`: `false` unless the `=` pairs over the literal types stay.
  - Revision: a change of the team's design at the places that fix no type. It reverses P-172's clause on them and P-76's walk half, and revises the revival's text in three places.
- **Both.**
  - microGPT: the same meaning and bits, by reading, if a float tie reads `RR64`, a rule that both need.
  - Speed: under A, under one per cent of a step by reading.
  - Unchanged by either: `sequivTest`, `seqv.fss`, `StrictEquivalenceRuleWalk` and `StrictEquivalenceRuleCompiled`, beyond what P-171 and P-172 already flip.

**The sentence each reading would put into the specification.**
- **A:** "A numeral has a type of its own, `IntLiteral` or, with a radix point, `FloatLiteral`, which holds its exact value; it is converted, exactly or with one rounding, only where its context fixes a number type, and elsewhere, as at a parameter of type `Any` or a static argument that only it fixes, it remains a value of its own type."
- **B:** "A numeral has a type of its own only while a program is checked: where its context fixes a number type it is converted to that type, exactly or with one rounding, and where nothing fixes one it is converted to `ZZ32`, or to `ZZ64` or `ZZ` when its value does not fit, or, with a radix point, to `RR64`, so that no value of a numeral type exists when the program runs."

## Summary

The open question is what type a numeral has where nothing fixes one: an untyped binding, an `Any` parameter, a static argument that only the numeral fixes, the operands of `SEQV`, a tie. Measured at `157323e5`:
- **The compiled path** (prelude) and the checker against the one library are Reading A today.
  - `x = 3` is an `IntLiteral` and `y = 0.5` a `FloatLiteral`.
  - `Cell(3)` is a `Cell[\IntLiteral\]`, and `<|1, 2, 3|>` is a `List[\IntLiteral\]`.
  - `f(3)` at `Any` prints `IntLiteral`, and `x SEQV z` is `false`.
  - `x + 1` computes on `IntLiteral`s at run time.
- **Walk** is Reading B for integers: `ZZ32` by value, `x SEQV z` `true`. But it builds generics at its class `Int`, and keeps `FloatLiteral` for floats.
- **Ties.** `1 - b`, `b^2` and `1.0 s` are `RR64` today on walk and on the one library. The prelude refuses two of them.
- **A defect.** A variable bound from `3000000000` reads as `ZZ32` at a numeral tie on the compiled path. The run dies with "Not in range for ZZ32". It is row 946.

The team's sources split. The Working Draft and the type group's prelude keep a numeral's own type, which is A. The interpreter's library and walk compute it as its default, which is B at run time. The restart gives `QQ` or `NN`, which is neither.

The costs, by reading:
- **A** keeps every team test and the exact value. It needs a float tie rule on both paths, a compiled carrier for the 24 numeral glue bindings before the switch-over, and, after P-12, P-76's walk half (probe Q: 24 tests).
- **B** needs a larger checker change (80 to 120 lines) and a fold (65 to 105 lines). It deletes the 24 bindings, so the switch-over's glue falls to 28, and walk is nearly final.
- **B also costs:**
  - the team's `NumberPrintTest:16` breaks;
  - three compiled test lines flip;
  - untyped bindings later used at `QQ`, `NN32` or `RR32` lose exactness or are refused;
  - `1/2 = 0.5` is `false` unless the literal `=` pairs stay;
  - P-172's clause and P-76's walk half are reversed.

microGPT keeps its meaning and bits under both readings if a float tie reads `RR64`, a rule that both need. Its speed differs by under one per cent, by reading.

## Appendix: for the record

**Defects.** One new, filed as row 946 by `ledger.py add`, in section 7, "Numerals, floats and comparisons":

    | 946 | on the compiled path a variable bound from an integer numeral reads as a `ZZ32` at a numeral tie whatever its value: for `bigN = 3000000000` and `g` over `ZZ32`, `NN32`, `ZZ64`, `g(bigN)` picks `g(ZZ32)` and dies at run time, where `g(3000000000)` picks `g(ZZ64)` | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/inference.tex`, "A Numeral Whose Conversions Tie" | none | review literal-fork-2026-11-08 | siblings: 325, 391. `isNumeral` takes any expression of type `IntLiteral` (`scala_src/typechecker/impls/Functionals.scala:418-421` at 157323e5), but `numeralReading` reads values only from `IntLiteralExpr` nodes, so a variable's list is empty and reads `ZZ32` (`:428-436`); the coercion then raises `java.lang.Error: Not in range for ZZ32: 3000000000`, which no `catch` sees. Walk answers `g ZZ64`. Probe: the review's section 3.7 program, compiled and run: 'TV1 g(3000000000) g ZZ64', then the error. Workaround: declare the variable's type. |

**Sentences of the specification made false:** none. Nothing was changed.

**Decisions** (mine; no decision of the curator covers them):
- I read "the 24 glue bindings" at main's count (F-299: 21 and 3). The base holds 29 and 3, since batch 28 moved 8 conversions to Fortress text (F-331).
- I counted the one library's untyped numeral bindings with a grep (`^\s+name = numeral`), which finds one. Other forms, numerals at `Any` and inside calls, I did not count.
- I gave B the sub-choice on `=` pairs over the literal types, and on whether `IntLiteral` stays writable, rather than choosing one.

**Points to report:** no line of the model programs changes under either reading (§5.1).

**For FACTS** (hand-over):
1. The compiled checker, against the one library as it stands, gives `x = 3` the type `IntLiteral`, `y = 0.5` `FloatLiteral`, `<|1, 2, 3|>` `List[\IntLiteral\]`, `Cell(3)` and `Cell(x)` `Cell[\IntLiteral\]`, `x + 1` `IntLiteral`, and `1 - b`, `b^2`, `1.0 s` `RR64`. It refuses `q: QQ = y`. This is what the switch-over gives untyped places. Evidence: `LitForkOneLib`, `T1` to `T3`, `Q` (§3.4).
2. On the compiled path, `x + 1` for `x = 3` computes on `IntLiteral`s at run time, and `f(x)` at `Any` is an `IntLiteral`. Evidence: `LitForkComp` K5, K7 (§3.3).
3. Under walk, `<|1, 2, 3|>` is an `ArrayList[\Int\]` whose ilk prints `ArrayList[\ZZ32\]`, and an untyped `y = 0.5` is a `FloatLiteral` at `Any`. Evidence: `LitForkWalk` W4, W5 (§3.2).
4. The defect of §3.7. Evidence: `LitForkTieValue` (§3.7).

**Commands I worked out:**
- To run the compiled checker on a program with the interpreter's library in scope: compile `explorations/coordinator/tools/checker-count/WorldFlip.java` against `$(bin/fortress_classpath | tail -1)`, then `java -Xmx4g -Xss64m -Djava.io.tmpdir=<tree>/tmp -Dfortress.caches=<empty private folder> -cp <classes>:$CP WorldFlip -stop check P.fss`. It takes 24 s, and a refused `s: String = e` names `e`'s static type.
- Under walk, a program's own top-level binding of `stringOps.typeName` over `Any` is refused at load: "Arity of type 1 does not match native arity 0". Walk answers that name with its own operation, a method (F-299). Use `x.ilkName` under walk.

**Questions for the curator** (a decision not taken):
- **The question:** at a place that fixes no type, does a numeral keep its own type (A) or take a default (B)?
- **The sources:** §2, with their dates. The prelude is a late position of the type group (P-26). The restart is context only (P-25).
- **The ways:** A, B, and B′ (§6.1, not costed). B has two sub-choices: the `=` pairs over the literal types (§3.6), and whether `IntLiteral` stays writable (§4.2).
- **What each changes:** sections 4 to 6.
- **Today's behaviour:** A on the compiled path, as P-76 and P-172 decide. Walk is B for integers and A for floats.

**What I could not measure:**
- Any run on the one library compiled (the switch-over is not done).
- Either reading built.
- microGPT's speed, since compiled microGPT does not run and walk is not timed.
- `LongStringTests:121`, `:141` under the checker, which stops on `Library/File.fsi` first.
- The tie under P-172's `FloatLiteral` apart, which is by reading (F-73, the one-picture review), since the library half is not built.
