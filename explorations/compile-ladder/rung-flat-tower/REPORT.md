# Rung F (`rung-flat-tower`): the flat tower

problem: the compiled checker refuses the one library's nested number tower under instantiation exclusion (FACTS.md, "The compiled checker's exclusion rule is the designers' multiple instantiation exclusion"): the hierarchy errors the flattening removes are `explorations/compile-ladder/rung-flat-tower/probes/checker-count/diff-before-after.txt:4-7`, of the stage's `#total 125` at `explorations/compile-ladder/rung-flat-tower/probes/checker-count/table-before.txt:14`; and the new test fails in each of its five groups on the base, `explorations/compile-ladder/rung-flat-tower/probes/failure-preedit.txt:8-12`
spec: `Specification/basic/types-vals-vars.tex:218-237` (instantiation exclusion); `Specification/basic/conversions-coercions.tex:78-83`, `:127-132`, `:176-187`, `:224-227` (a coercion is declared on the wider type, applies at a parameter of exactly that type, does not chain, is not inherited); `Specification/basic/operators/opr-overview.tex:156`, `:197` ("Rational computations do not overflow"); `Specification/basic-lib/numbers.tex:371-372` (rationals compared numerically: the exact half of `Number`'s `=` only); `Specification/basic-lib/basic-integers.tex:79` (`ZZ` a commutative ring, totally ordered); `Specification/basic/expressions/reductions.tex:15-26` and `Specification/advanced/parallelism-locality/defining-generators.tex:147-157` (a sum is `SUM[\N\]` over `SumReduction[\N\]`, its static arguments optional)
precedent: the team's flat compiler prelude, one `coerce` per pair on the wider type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103-108`, `:147-149`, `:332-334`); `array1`'s `() -> T` witness `typecase` (`Library/FortressLibrary.fss:2342-2346`, `:2282-2286` at `e5414f5bf`); the judgement's option-A library copy, identity functions ending in `else => 0` (`explorations/reviews/sum-replacement-judgement/variants/sumlib.py:22-37`)
deviation: `Number` keeps one numeric `opr =` beyond route A's "Number without its catch-all operators" (decision D1, `Library/FortressLibrary.fss:358-365`); integer `/` always answers a `Ratio` (`Library/FortressLibrary.fss:958`, reached from `ZZ32` and `ZZ64` through `:757` and `:841`), which prints without `/1` (`:629`), decision D3; the witness's `else` branch answers the integer `0` or `1`, as the precedent does (D8, `:3117`, `:3130`); the Max/Min-Sum fusion pairs are restated over `T` rather than dropped (D9, `:3138-3157`); `genZZ.perturb` keeps the base's 64-bit shift (D10, `Library/QuickCheck.fss:322`)
historical: Library/FortressLibrary.fsi, Library/FortressLibrary.fss, Library/ChunkedSparseArray.fss, Library/Format.fss, Library/PrefixMap.fss, Library/PrefixSet.fss, Library/QuickCheck.fss, Library/Random.fss, Library/ReflectiveQuickCheck.fss, Library/SkipList.fss, Library/Sparse.fss, Library/String.fss, Library/Timing.fss, ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi, ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, and 21 team tests in ProjectFortress/tests/ (ArrayListQuick, BitTwiddle, CovCollTest, CovariantTest, Generator2Test, ListNullPointer, PureListQuick, ReflectTest, ReflectiveQuickCheckTest, TransactionalArrayShakedown, WordCountSmall, asifTest, expTest, fib13, generatorTest, longPrim, sequivTest, setSum, simpleBig, simpleSum, vectorOps; each `.fss`), each present at `a874948ac`

**How this text was written.** The harness refused both workers' writes of this file, so the gather writes it from the structured result's `reportText`. The first worker's `reportText` reached the judge but is not in the worktree, and the repair worker did not have it. This text is therefore recomposed from the branch: the milestones' commits and messages, `record.md`, the captures under `probes/`, `SKEPTIC.md` and `JUDGE.md`, every figure re-read from its capture. It keeps the section numbers the skeptic and the judge cite (sections 1, 2, 6, 9, 10, 12-15, 17) and the decision numbers they cite (D1, D3, D7, D8, D9, D10); D2, D4, D5 and D6 are numbered here for decisions the diff and the commit messages show. The judge's amendments are in place (the provenance block, sections 2, 6, 10 and 17), and section 20 is the repair round. Where the first worker's text said more than the captures do, that is not reproduced here; for a section this text does not amend, the gather may prefer the first `reportText`.

## 1. For Pavol

- **The tower is flat, with exactly the record's coercions** (section 5). `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ` and `RR64` are siblings under `Number`; thirteen `coerce` declarations, each a pair of the table; nothing else converts.
- **Decision D1, `Number` keeps one numeric `=`** (section 6). Without it the library's `=` over `(Any, Any)` would answer `3 = 3.0` with `false` and no error. Its exact half compares as rationals, as `numbers.tex:371-372` says. Its float half is the base's comparison kept, after `asFloat`, and it is not transitive: `1/3 = asFloat(1/3)` is `true` (`explorations/compile-ladder/rung-flat-tower/probes/skeptic/sk-exprs-equality.txt:19-26`). The specification is silent on comparing a float with an exact number (provisional row 434, home 3). The alternative, comparing a float by its exact rational value, is transitive and needs a float-to-rational conversion the library lacks; it is Pavol's decision.
- **The changed outputs** (section 11): of 407 interpreter tests, 383 print the same, 4 the same once normalised, 17 vary on their own; 3 changed, each with its cause (`Region`, a coercion now applied; `simpleBig`, a respelled line; `XXXArrayLiteralArgRungC`, the overload list its message prints). No exit code changed.
- **89 team-test lines respelled** (section 9): 24 of the 25 approved (`WordCountSmall.fss:89` needs none) and 65 under Q1 = (a), each keeping the value it checks, no assertion deleted (`explorations/compile-ladder/rung-flat-tower/probes/test-lines.txt`).
- **The two microGPT checks** pass 40 of 40 with the same printed values on both libraries (section 10), and `diag_fwd`, which no check program runs, prints its golden with the approved lines, line 50 now written at its element type (section 10).
- **The capability table and the body-level check** (sections 12, 13): every operation of `Vector`, `Matrix` and the scalar-extension block runs for all seven leaves except `matrix(v)` for `NN32` and `NN64`, as on the base (provisional row 437); no bound on `Vector` or `Matrix` narrowed.
- **Row 388's consequence** (section 16): with an `RR64` matrix or array and a `ZZ32` scalar, `m.scale(i)` runs; `m i`, `i m`, `m DOT i`, `a + i`, `i + a`, `a - i`, `i - a`, `a MIN i` and `i MAX a` ran on the nested tower and are refused on the flat one. None is in C4 or the APL program.
- **The checker count is 62, from 125** (section 14); the prediction was 44.
- **The compile ladder loses `CoercionRedispatchRungC.fss`** to its approved `SUM[\ZZ32\]` line until the switch-over, and `expTest`'s first error moves to `asFloat` (section 15). No spelling serves both libraries.
- **Bare big operators over numeral list literals are refused under `walk`** on the flat tower (row 432, section 17).
- **The restated fusion pairs are ill-formed to the checker** until `where` clauses exist (row 433, D9).
- **The demos** (section 20, item 7): of the 24 demos with unwritten clause-form sums, 21 ran on the base, and all 21 fail on the flat library: 18 at row 424, and 3 (`mg`, `wordcount`, `wordcount2`) earlier, dividing a `ZZ64` time by a float, which answer 8 makes explicit. The demos are not gated; none was edited.
- **Rule 2's count** (section 2): of 192 declared-return headers, 12 can yield another leaf. Three of them, the `^` of `ZZ64`, `NN64` and `ZZ`, answer the specification's integer while their declaration says `RR64`, so their use as a float is refused on the flat library by answer 8. The judge's remedy, converting in the body, would contradict `basic-integers.tex:506-509`, so no body was changed; the declaration is provisional row 438. `NN64.signed`, declared `NN64` and answering a `ZZ64`, is row 439.

## 2. Where the fix belongs, and the precedent search

**Where.** The nesting, the catch-all operators and the reductions are declarations of the one library (`Library/FortressLibrary.fsi`, `.fss`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `.fss`), which `explorations/coordinator/map/spec-to-implementation.md` places in the prelude for numbers and reductions. `walk` already converts by coercion at a parameter, at an overloaded call and at a typed binding (FACTS.md, "Under `walk`, the interpreter converts by coercion at its three kinds of type check"), so the flat tower needs no Java, and none was written. The compiler's own prelude files (`Library/CompilerLibrary.*`, `CompilerAlgebra.*`, `CompilerSystem.*`) take no declaration before the switch-over (`POSITIONS.md:46`) and are untouched.

**Precedents, and which was followed.**
- The flat tower: the team's compiler prelude declares the leaves as siblings with one `coerce` per pair on the wider type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103-108` for `ZZ`, `:147-149` for `ZZ64`, `:332-334` for `NN64`). Followed, with the record's table in place of the prelude's, which also coerces from `IntLiteral`, a class the one library keeps below `ZZ32`.
- The identity by static argument: `array1`'s typecase over a `() -> T` witness (`Library/FortressLibrary.fss:2342-2346`; `:2282-2286` at `e5414f5bf`), the library's one device for choosing on a static argument with no element in hand. Followed, as answer 7 prescribes.
- The reduction's shape: the specification's `SumReduction[\N\]` (`defining-generators.tex:147-157`) and the judgement's library copy of option A (`explorations/reviews/sum-replacement-judgement/variants/sumlib.py:22-37`), whose identity functions end in `else => 0`. Followed; the copy tested three leaves, and the landed functions test eight (section 7).
- The explicit conversion into `RR64`: `asFloat`, which every number leaf already implements. Published on `Number` in the api (D2).
- `QQ`'s arithmetic: no new text. The rational operators (`Library/FortressLibrary.fss:587-607`) already compute in `ZZ`, and a `Ratio`'s fields are declared `ZZ` (`:628`); on the flat tower `ZZ`'s coercions convert every part at construction (D6).

**Rule 2's count: other sites of the shape rows 146 and 428 repaired** (the repair round's instruction 6; `explorations/compile-ladder/rung-flat-tower/probes/rule2-return-sites.txt`). The first report said "I did not count"; this is the count. The shape is a declaration whose result is `ZZ64`, `ZZ`, `NN64`, `NN32`, `QQ` or `RR64` and whose body can yield another number leaf with no conversion. On the nested tower such a value was a subtype of the declared type; on the flat one it is not, and `walk` neither converts nor checks at a return (row 387).
- Scope: `Library/*.fss` except `CompilerLibrary.fss`, `CompilerAlgebra.fss` and `CompilerSystem.fss`; every header matched by `grep -nE '\)\s*:\s*(ZZ64|ZZ|NN64|NN32|QQ|RR64)\s*='`. The grep prints 192 lines, 174 in `FortressLibrary.fss`. The judge counted 189 and 171 at the same library; two of the 192 are anonymous functions (`FortressLibrary.fss:3214`, `:3221`), and the table lists every line the grep prints.
- Classes, each body read: **N 79**, a native whose Java class answers the declared type (read from the `make` call of its base class in `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/*.java`); **T 101**, a conversion, a float literal, `self` or a field of that type, or an operator or call of the declared type; **S 12**, can yield another leaf. By file: `FortressLibrary.fss` 174 (N 79, T 84, S 11); `QuickCheck.fss` 5 (T 4, S 1); `IntMap.fss` 3, `Random.fss` 3, `Timing.fss` 4, `StatDigest.fss` 2 and `Pairs.fss` 1, all T.
- The 12 S sites, each run as its own program under `walk` at one thread on both libraries (`explorations/compile-ladder/rung-flat-tower/rule2-probe.sh` over `rule2-sites.txt`; `probes/rule2-return-probe-flat.txt`, `probes/rule2-return-probe-base.txt`), print the site's result with its run-time class, then its use as the declared type. One program per site rather than one `try`/`catch` per site, because `walk`'s dispatch failure is a Java `ProgramError` that a Fortress `try` does not catch (shown at the end of the flat capture).
  - **Nine answer the same on both libraries.**
    - `RR64`'s default `round`, for a float literal (`FortressLibrary.fss:469`), answers `2 : Long` where `ZZ` is declared, and `+ big(1)` gives `3 : BigNum` on both. Row 387's shape: on the flat tower `ZZ` declares the coercion from `ZZ64` that a converting return would apply.
    - `QQ.ceiling` and `QQ.truncate` of `1/0` (`:615`, `:620`) answer `1/0`, the specification's answer ("simply return the argument if it is +∞, −∞, or 0/0", `Specification/basic-lib/numbers.tex:479-481`).
    - `ZZ32`'s `^` (`:746`) answers `9 : Int` where `RR64` is declared, and `+ 0.5` gives `9.5` on both, on the flat tower by `RR64`'s coercion from `ZZ32`: row 387's shape.
    - `ZZ64.minimum`, `ZZ64.maximum` and `ZZ.zero` (`:767`, `:768`, `:918`) answer their declared type.
    - `NN64.signed` (`:903`) answers `3 : Long` where `NN64` is declared, and `+ widen(unsigned(1))` gives `4 : BigNum` on both: provisional row 439.
    - `genZZ.generate` (`Library/QuickCheck.fss:300`) answers a `Long` where `ZZ` is declared (a random value from a system-seeded generator), and `+ big(1)` answers a `BigNum` on both: row 387's shape.
  - **Three answer differently, and none is converted.** `ZZ64`'s, `NN64`'s and `ZZ`'s `^` (`:830`, `:897`, `:987`) answer `9 : Long`, `9 : UnsignedLong` and `9 : BigNum` on both libraries, where `RR64` is declared. Used as an `RR64`, `r + 0.5` is `9.5 : Float` on the base, through `Number`'s catch-all, and "Failed to find any matching overload" on the flat library, where `ZZ64`, `NN64` and `ZZ` reach `RR64` only by `asFloat` (answer 8, `POSITIONS.md:159`).
    - The judge's instruction for such a site is to convert in the body. That is wrong against the specification: "Exponentiation of an integer to a nonnegative integer power produces an integer result" (`Specification/basic-lib/basic-integers.tex:506-509`), and the natives already answer that integer.
    - Converting with `asFloat` would make `widen(3)^2` answer `9.0`, and would break `QQ`'s exact `^`, whose body divides two integer powers (`FortressLibrary.fss:607-611`).
    - The site's value is the specification's, and the refusal of its use as a float is answer 8's. What is wrong is the declared type `RR64`: provisional row 438, with the fix and why it is not this rung's.
- No site answers differently because of a fault of this rung, so no assertion was added to the test, no body changed, and no re-run of the comparison or the microGPT checks was owed (the judge's condition, instruction 6).
- Row 146's shape outside declared returns, from the skeptic's probes: the flat library holds 64 bits at a typed binding, a declared parameter, a tuple binding, an array element and an assignment (`explorations/compile-ladder/rung-flat-tower/probes/skeptic/sk-exprs-rationals.txt:27-46`, `probes/skeptic/two-path-row146.txt`); a declared return stays open under row 387 (section 17).

## 3. The specification derivation

- **The shape.** Two instantiations of one generic trait exclude each other unless their static arguments agree, and no type is below two that differ (`types-vals-vars.tex:218-237`). The nested tower puts `ZZ32` below the ordered and algebraic traits at `ZZ32`, `ZZ64`, `ZZ`, `QQ` and `Number` at once, which the checker refuses (section 14). Siblings, each with its algebra at its own type, are the one shape the rule allows that keeps each leaf's algebra; route A (`POSITIONS.md:92`) chose it.
- **The conversions.** A coercion is declared in the wider trait with the narrower type as its parameter (`conversions-coercions.tex:176-187`), applies only where the declared parameter type is exactly the wider type (`:78-83`), does not chain (`:127-132`) and is not inherited (`:224-227`). So each pair of the table is its own declaration, and a conversion the table leaves out is written as `asFloat`, `widen` or `big` at its site. Answer 8 (`POSITIONS.md:159`) settles which pairs: the exact integer pairs, the integers into `QQ`, `ZZ32` into `RR64`, and nothing lossy.
- **The rationals.** "Rational computations do not overflow" (`opr-overview.tex:156`, `:197`); comparisons are numerical over any two rationals (`numbers.tex:371-372`). With `ZZ` parts, which the coercions guarantee, `QQ`'s own text computes exactly.
- **The reductions.** A reduction expression is a call of the big operator, its static arguments optional (`reductions.tex:15-26`); its value is the operands combined as with reduction variables (`:49-52`), which start from the operator's identity (`Specification/basic/evaluation/reduction.tex:66-74`), the unique identity of the operator on `T` (`Specification/advanced-lib/algebraic-constraints.tex:794-797`). A sum over generators desugars to `SUM[\N\]` over `SumReduction[\N\]`, `N` the body's type (`defining-generators.tex:147-157`). Answer 7 (`POSITIONS.md:165`) is that design with the identity chosen by the static argument; the unwritten form, whose `N` `walk` cannot infer, is row 424.
- **Equality.** Section 6, D1.

## 4. The test, the recorded failure and the recorded pass

`ProjectFortress/tests/FlatTowerRungF.fss`: one comment line (`:4`); a component exporting `Executable` whose `run()` runs five groups through `group()` and asserts that none failed (`:193-200`); each value checked by value and run-time class through `shown()` (`:6`), each message citing its source.
1. `shape()`: a `ZZ32` is not a `ZZ64`, `ZZ`, `QQ` or `RR64`; a `ZZ64` is not a `ZZ`; an `NN32` is not an `NN64`; a `ZZ` is not a `QQ`; a `QQ` is not an `RR64`; every leaf is a `Number`.
2. `coercions()`: the table edge by edge, row 146 (`:41-42`), and `Number`'s `=` across types (`:73-76`).
3. `identities()`: the verdict's three outcomes with run-time classes, the zero and the one of each of the eight leaves (all sixteen identity branches, `:98-126`), and `strToFloat`'s explicit conversion (`:128`).
4. `rational()`: row 428's two comparisons and exact `+`, `DOT` and `/` beyond 32 bits (`:131-138`).
5. `products()`: the flat view's product against an ordinary matrix, an integer matrix and an integer-keyed array as controls, `BIG MAX z` over an `RR64` array, and the norms of a `ZZ64` and a `QQ` vector (`:183-190`).

**Recorded failure** (`explorations/compile-ladder/rung-flat-tower/probes/failure-preedit.txt`, committed at `252639598` before the library edit at `f1fe07dc9`): on `e5414f5bf` each group fails: `FAIL: route A, POSITIONS.md:92: a ZZ32 is not a ZZ64` (`:8`); row 146's `-2147483648 : Int =/= 2147483648 : Long` (`:9`); the empty `RR64` sum `0 : Int` (`:10`); row 428 (`:11`); and `BIG MAX z` "Failed to find any matching overload" (`:12-13`). Two later assertions were captured failing on the flat library before their edits: `probes/failure-strtofloat.txt`, `probes/failure-norm.txt`.

**Recorded pass**: `rc=0` at `FORTRESS_THREADS=1` and `=4` on the landed library (`probes/pass-postedit-threads1.txt`, `probes/pass-postedit-threads4.txt`), again by the skeptic (`probes/skeptic/flat-tower-test-t1.txt`, `probes/skeptic/flat-tower-test-t4.txt`), and again after the repair round's doc comment (`probes/pass-repair-threads1.txt`, `probes/pass-repair-threads4.txt`); at the gather, with the second skeptic's corrections 2 and 3 in the file (nine identity assertions and two messages), `rc=0` at both thread counts from empty private caches (`probes/gather-pass-threads1.txt`, `probes/gather-pass-threads4.txt`), and a scratch copy with one expected value changed fails (`probes/gather-pass-control.txt`).

It is not an `XXX` file and needs no `.test` file (FACTS.md, "An `XXX*.fss` in the interpreter corpus IS a gated expected-failure test").

## 5. The edit: the tower and the coercions

- `Number` (`Library/FortressLibrary.fsi:276-284`, `.fss:352-366`): `extends { AnyAdditiveGroup, AnyMultiplicativeRing } comprises { RR64, QQ, AnyIntegral }`; it declares `asFloat(self): RR64` and one `opr =` (D1). The 52 api and 57 component catch-all declarations are gone.
- `RR64 extends { Number, StandardPartialOrder[\RR64\], StandardMinMax[\RR64\], AdditiveGroup[\RR64\], MultiplicativeRing[\RR64\] } excludes { QQ, AnyIntegral } comprises { Float, FloatLiteral, RR32 }` (`.fss:379-495`), its operators at `(self, b: RR64)` with bodies through `asFloat`; `RR32` stays below it (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47`).
- `QQ extends { Number, StandardPartialOrder[\QQ\], StandardMinMax[\QQ\], AdditiveGroup[\QQ\], MultiplicativeRing[\QQ\] } excludes { RR64, AnyIntegral }` (`.fss:544-626`).
- `AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }`; `Integral[\I\] extends { StandardTotalOrder[\I\], MultiplicativeRing[\I\], AnyIntegral }` (`.fss:641-686`); `ZZ32`, `ZZ64`, `NN64`, `ZZ` and, in `FortressBuiltin`, `NN32` extend `{ AnyIntegral, Integral[\X\] }`, and the ten pairs of the five integer types exclude each other.
- **The coercions, edge by edge against the table:** `RR64` from `ZZ32` (`.fss:383`, `asFloat(x)`); `QQ` from `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ` (`:548-552`, `Ratio(x, 1)`); `ZZ64` from `ZZ32` (`:763`, `widen`) and `NN32` (`:764`, `signed(widen(x))`); `NN64` from `NN32` (`:847`, `widen`); `ZZ` from `ZZ32`, `ZZ64`, `NN32`, `NN64` (`:911-917`, `big`; the `NN64` case adds 2^64 to a negative signed value). With their api twins, nothing else: `e5414f5bf` declares no `coerce` in `Library/` or `FortressBuiltin`, and the skeptic's grep of every `coerce` found exactly these (`SKEPTIC.md` section 2).
- `NN32` into `RR64`, exact but not named by answer 8, stays explicit; no site needed it. Sites that relied on another link of the old chain write `asFloat`, `widen` or `big` (section 8).

## 6. Decisions

- **D1. `Number` keeps one numeric `opr =`** (`FortressLibrary.fsi:280-283`, `.fss:355-365`).
  - The alternative, no `=` on `Number`, leaves mixed comparisons to the library's `=` over `(Any, Any)`, which answers by `SEQV`: `3 = 3.0` would be `false` with no error.
  - It is one declaration beyond route A's "Number without its catch-all operators" (`POSITIONS.md:92`). It answers a `Boolean`, not a float, so it is not what route A removes ("take any number and answer in floating point", `explorations/coordinator/CLIMB-BATCH-6.md:64`).
  - Its exact half compares two exact numbers as rationals through `exactValue` (`.fss:368-377`), each clause binding its value at `QQ` so that the body is typed as written. That half is what `numbers.tex:371-372` says, and the passage covers only that half.
  - Its float half is the base's comparison kept: `asFloat(self) = asFloat(other)` (`.fss:360`, `:362`; `git show e5414f5bf:Library/FortressLibrary.fss:360`). So an exact value equals its nearest float, and the relation is not transitive: `1/3 = asFloat(1/3)` is `true`, and `((widen(1) LSHIFT 60) + widen(1)) = asFloat(widen(1) LSHIFT 60)` is `true` although the two exact values differ (`explorations/compile-ladder/rung-flat-tower/probes/skeptic/sk-exprs-equality.txt:19-26`).
  - The specification is silent on comparing a float with an exact number (`grep -n -i numerically Specification/basic-lib/*.tex` finds only `numbers.tex:372` and `basic-integers.tex:591`): provisional row 434, home 3. The doc comment now says what the code does (repair round, item 5).
  - **The alternative not taken**, comparing a float by its exact rational value, is transitive and needs a float-to-rational conversion the library lacks: a decision for Pavol.
- **D2. `asFloat` is published on `Number` in the api** (`FortressLibrary.fsi:278-279`) as the one explicit conversion into `RR64`, since answer 8 makes `ZZ64`, `NN32`, `NN64`, `ZZ` and `QQ` reach `RR64` only by it. The alternative, a conversion per leaf, repeats what every leaf implements already.
- **D3. Integer `/` always answers a `Ratio`**: `ZZ`'s `/` builds `Ratio(a, b)` (`FortressLibrary.fss:958`), and `ZZ32`'s and `ZZ64`'s reach it through `big` (`:757`, `:841`); a whole quotient prints without `/1` (`Ratio.asString`, `:629`). So `6/2` is `3 : Ratio` where the base gave `3 : Int` (`probes/skeptic/sk-exprs-equality.txt`). The specification types integer `/` as `QQ#` (`Specification/basic-lib/basic-integers.tex:239`). The alternative, an integer for a whole quotient, makes the result's class depend on the value.
- **D4. `Integral[\I\]` keeps `AnyIntegral` among its supertypes** (commit `077beba2d`), as today, because without it `walk`'s overload check refuses C4's generic array operators beside `Integral`'s generic ones.
- **D5. The restated methods live once on `Integral[\I\]`** (`FortressLibrary.fsi:459-468`: `/`, `numerator`, `denominator`, `floor`, `ceiling`, `truncate`, `MINNUM`, `MAXNUM`, `odd`, `even`), which every integer leaf inherits at its own type, rather than on each leaf; the leaves add only what differs (`ZZ32.narrow`, `ZZ32.big`, `ZZ64.widen`, `NN32`'s `/`).
- **D6. `QQ`'s exactness comes from the coercions, not from new arithmetic**: a `Ratio`'s parts are declared `ZZ`, so every part is a `BigNum` on the flat tower and `QQ`'s cross-products cannot wrap; `QQ`'s operator text is unchanged (row 428's note).
- **D7. `RR32`'s comparisons and binary operators take `b: RR64`, where the base had `b: Number`** (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:243-322`), **and `Float`'s `MIN`, `MAX` and `MINMAX` answer `RR64` where the base declared `Number`** (`:95-99`), since `Number` no longer offers the operators the natives stood behind. The pre-existing defect that `RR32`'s natives read their argument with `getRR32()` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:90-98`) is untouched and fails on both libraries: provisional row 435, home 2.
- **D8. The identity witness's `else` branch answers `0` for a sum and `1` for a product** (`FortressLibrary.fss:3117`, `:3130`), as the judgement's copy does (`sumlib.py:22-37`). It is reached only by a non-number element type; for a user `AdditiveGroup` it supplies an `Int` that `walk`'s `unlift` refuses, so an empty `SUM` over such a type fails (provisional row 436, home 2). The alternative, asking the element type for its `zero`, needs a value in hand or `where` clauses.
- **D9. The Max/Min-Sum fusion pairs are restated over `T`** (`MaxSumReductionPair[\T extends { AdditiveGroup[\T\], StandardMax[\T\] }\]`, `MinSumReductionPair`, and `SumReduction`'s two `distribute` overloads, `:3138-3157`), not dropped, because `Generator2Test`'s maximum prefix sum takes the fused path (`Library/Generator2.fss:73`, `:168`). The checker finds them ill-formed, since `SumReduction`'s `T` does not meet `StandardMax[\T\]`: provisional row 433. The judgement allowed dropping them (`explorations/reviews/sum-replacement-judgement.md` section 4 A).
- **D10. `genZZ.perturb` keeps the base's 64-bit shift** (`Library/QuickCheck.fss:322`, `big(widen(obj) LSHIFT 32)`). On the flat tower `genQQ`'s parts are `BigNum`s, and the base's `obj LSHIFT 32` on a `BigNum` never terminates (`probes/perturb-base-line.txt`: `ReflectiveQuickCheckTest` dies of `OutOfMemoryError` in `BigInteger.shiftLeft`); the library bug itself is provisional row 431.

## 7. The reductions (answer 7)

`SUM[\T extends AdditiveGroup[\T\]\]` and `PROD[\T extends MultiplicativeRing[\T\]\]` (`FortressLibrary.fss:3150-3178`, and the api) reduce over `SumReduction[\T\]` and `ProdReduction[\T\]`, joined with the element type's own `+` and juxtaposition.
- The identity is `additiveIdentity[\T\]()` or `multiplicativeIdentity[\T\]()` (`:3107-3131`): a `typecase` over `__thrower[\T\]`, the `array1` device, in the order `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32`, `RR64`, each value through `cast[\T\]`. Every leaf is tested before any of its supertypes, `ZZ` and `QQ` before `RR64`, so the text is right on the nested tower too.
- The team's comment "Hack to permit any Number to work non-parametrically" is gone with the `Number`-typed reductions.
- A clause form whose element type no argument fixes writes its static argument (section 9, and the library's eleven, section 8).
- Group 3 of the test asserts all 16 identity branches, the zero and the one of each of the eight leaves, each by value and run-time class (`ProjectFortress/tests/FlatTowerRungF.fss:98-126`), and the skeptic probed each at one and four threads (`probes/skeptic/sk-exprs-reductions.txt`, `probes/skeptic/identities.txt`).

## 8. The drop, and the library sites

**The drop.** `BIG MAXN`, `BIG MINN`, `BIG MINMAXN`, `MaxReductionN`, `MinReductionN`, `MinMaxReductionN`, `MaxNSumReductionPair`, `MinNSumReductionPair`, the `distribute` overloads and the `DistributesOver` clauses that named them are removed from the api and the component (`e5414f5bf:Library/FortressLibrary.fss:3113-3150`, `.fsi:1869-1887`).
- The reason: their identity is the rational `-1/0` or `1/0`, a value no integer or float fold can hold, and a maximum's identity is not carried by a coercion (`explorations/reviews/max-min-identities-judgement.md` sections 1 and 4; `POSITIONS.md:168`).
- A grep for the eight names over `*.fss`, `*.fsi`, `*.tex`, `*.java` and `*.scala` finds them only in review probes that record what they did: `explorations/reviews/max-min-identities-judgement/*.fss`, `explorations/reviews/flattening-questions-ways/Q1SumWalk.fss`, and the excerpt `explorations/reviews/mie-probes/keep/flat-tower-sketch.fsi`. None is left in `Library/`, the tests or the demos. (The `BIG MAXNUM` of `explorations/astra/` is another operator.)

**Library sites written differently**, each with its reason:
- Static arguments written, the judgement's eleven (`sum-replacement-judgement.md:161-165`): `SUM[\T\]` in `Vector.dot`, `Matrix.rmul`, `Matrix.lmul` and `Sparse.fss:96`; `SUM[\ZZ32\]` in `strToInt`, `strToFloat`, `ChunkedSparseArray.fss:161`, `:163`, `PrefixMap.fss:380`, `PrefixSet.fss:374`, `SkipList.fss:208`.
- Explicit conversions:
  - `Timing.fss:30-32`, `asFloat(duration)`;
  - `Format.fss:70`, `widen(|/(val / base)\|)`;
  - `String.fss:508`, `asFloat(ssize) / asFloat(numFlat)`;
  - `Random.fss:199`, `asFloat(9007199254740992)`, and `MersenneTwister`'s `max` and `refresh` (`Random.fss:270`, `:278-280`), a typed `one: N = 1` in place of `1 asif N`;
  - `ChunkedSparseArray.fss:54`, `widen(0)`;
  - `QuickCheck.fss:341`, `DIV` in place of `/`, which now answers a `Ratio`, and `:371`, `asFloat(genZZ64.generate(c))`;
  - `strToFloat` and the vector norm, `asFloat` (commit `1361ba8b6`, each captured failing first);
  - `Ratio.asFloat` and `simplestRationalBetween` (commit `ebd9d34ed`).
- `ReflectiveQuickCheck.fss:149-150`: `NN64` and `NN32` map to `genZZ`, the generator they reached through the nesting on the base.
- D10's `QuickCheck.fss:322`.

## 9. The team-test lines

`explorations/compile-ladder/rung-flat-tower/probes/test-lines.txt` lists every changed line, before and after (`git diff -U0 e5414f5bf..077beba2d`, with `Generator2Test.fss` at its CRLF-restoring commit `ae77db21c`).
- **The approved 25** (answer 7, `POSITIONS.md:165`): the clause-form sums of `CoercionCallRungC.fss`, `CoercionOverloadRungC.fss`, `CoercionRedispatchRungC.fss`, `TransactionalArrayShakedown.fss`, `WordCountSmall.fss`, `XXXFlatStringSplitRungL.fss`, `setSum.fss` and `simpleSum.fss` write their static argument. 24 changed, since `WordCountSmall.fss:89` needs none.
- **Under Q1 = (a)** (`POSITIONS.md:173`): 65 lines in 20 files, each keeping the value it checks, no assertion deleted.
  - `Generator2Test.fss`, `setSum.fss`'s three `SUM[\Number\]` lines and `asifTest.fss`, which the record names.
  - `simpleBig.fss`: its `BIG STAR` restated over `AdditiveGroup[\T\]`, and `p7` written `<|[\RR64\] asFloat(body(x + y)) | ...|>`, because `body(x:ZZ32): RR64` returns the `ZZ32` for an even `x` (row 387's shape); `SUM p7` is still `605.0`.
  - `vectorOps.fss:27` and `BitTwiddle.fss:45`, `:47` (row 388); `longPrim.fss` (`conversions-coercions.tex:78-83`); the float timings of `ArrayListQuick`, `CovCollTest` and `PureListQuick` (`asFloat`); and every other line the flat tower broke, each in the capture.

## 10. C4 and the APL program; the two microGPT checks

Only the approved lines changed (`explorations/reviews/sum-replacement-judgement.md:183-212`), as the skeptic checked with `git diff -U0 e5414f5bf...HEAD -- explorations/run-c4 explorations/apl`:
- `explorations/run-c4/src/MicroGptFlat.fss:28` (`BIG MAX z`), `:43` (`SUM[\ZZ32\]`); `FlatArrays.fss:181`; `MicroGptFlatCheck.fss:27`, `:36`, `:38` (`BIG MAX[\RR64\]`), `:56` (`SUM[\ZZ32\]`), `:72` (`SUM[\RR64\]`);
- `explorations/apl/mg/MicroGptApl.fss:42`, `:59`; `FlatArrays2.fss:183`; `MicroGptAplCheck.fss:29`, `:38`, `:40`, `:58`, `:74`; `diag_fwd.fss:25`, `:34`, `:43`, `:47`, `:50`, `:52`.

**The checks** (`probes/mg-base-MicroGptFlatCheck.txt`, `probes/mg-base-MicroGptAplCheck.txt`, `probes/mg-flat-MicroGptFlatCheck.txt`, `probes/mg-flat-MicroGptAplCheck.txt`; each from an empty cache at `FORTRESS_THREADS=1`, by `mg-run.sh`): `VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS` for both checks, on the base and on the landed flat library. Their printed values, with machine lines, timings and the Rats! path masked, are identical (`probes/mg-compare.txt`, `diff rc=0` twice).

**`diag_fwd.fss`.** Six of the approved APL lines are in `diag_fwd.fss`, which no check program runs; the first report's claim that the check programs cover the approved APL lines was wrong for these six. The skeptic's run was the first on file (`probes/skeptic/diag-fwd-flat.txt`). Line 50 was also spelled wrong for its element type: `dz`'s arrays are `Array[\ZZ32,ZZ32\]` (`:49`), so answer 7's rule writes `ZZ32`. The repair round respelled it, before and after:

```
-    println tag " |" |a| "| maxdiff " (BIG MAX[\RR64\][i <- 0#|a|] |a[i] - c[i]|)
+    println tag " |" |a| "| maxdiff " (BIG MAX[\ZZ32\][i <- 0#|a|] |a[i] - c[i]|)
```

It then ran the program (`explorations/compile-ladder/rung-flat-tower/probes/diag-fwd-line50.txt`, by `probes/skeptic/diag.sh`, one thread, a private cache). Its 23 printed lines, from `Mk[0,1]` to `done`, are the golden `explorations/apl/mg/checks/diag_fwd_flatarrays2.out` (`diff rc=0`, masking only the Rats! temp path; the golden prints no timing), including `ids |16| maxdiff 0`, `tg |16| maxdiff 0` and `pos |16| maxdiff 0`, which the `RR64` spelling would print as `0.0` under the specification.

## 11. The comparison

Every file of `ProjectFortress/tests/` except the new test, under `walk`, one JVM per test, private caches, four at a time (`count-run.sh` over `count-list.txt`, 407 files), in three passes:
- base A (`probes/passes/machine-baseA.txt`);
- the edit: three edit passes as the library settled, the last on `c02b558c1` (`probes/passes/machine-edit.txt`);
- base B (`probes/passes/machine-baseB.txt`).

They were compared by `compare-normalised.py`, which masks only Java line numbers in stack frames, identity hashes, and Fortress source positions in the library files this rung edits, mapped through the edit's line map (the precedent is `explorations/compile-ladder/rung-library-comments/remap-lines.py`). `XXXInheritedOverload.fss` is listed as unstable, citing row 430.

**Result** (`probes/passes/compare-normalised.txt`): `tests 407 same 383 normalised 4 changed 3 unstable 17 missing 0`. Exit codes are 336 `rc=0`, 64 `rc=1` and 7 `rc=255` in every pass (`probes/passes/rc-distribution.txt`); no exit code changed.
- **Normalised, 4:** `XXXFnRenderRungS`, `XXXTupleSevenRungS` (library positions), `taskTrace2`, `taskTrace3` (identity hashes).
- **Unstable, 17** (base A and base B differ; `probes/passes/unstable-check.txt` shows each edit output within the A/B variation): `ArrayListQuick`, `CovCollTest`, `HeapTest`, `PureListQuick`, `QuickCheckTest`, `ShuffleTest`, `SkipListTest`, `TimingTests`, `TreapTest`, `WordCountSmall`, `abortBlock`, `buffons`, `nestedTransactions1` to `4`, `quicksortTest`.
- **Changed, 3**, each captured under `probes/changed/` (base A, base B, edit):
  - `Region`: `Just(17) at Global` becomes `Just(17.0) at Global`. Cause: a coercion now applied. `Region.fss:20` is `Just[\RR64\](17)`, and the numeral reaches `RR64`'s parameter by `RR64`'s coercion from `ZZ32`, where the base kept the `Int` below `RR64`.
  - `simpleBig`: `p7`'s list prints `2.0, 3.0, 4.0, ...` where the base printed `2, 3.0, 4, ...`. Cause: a respelled line (section 9); the checked `SUM p7` is `605.0` on both.
  - `XXXArrayLiteralArgRungC`: its expected failure's message lists the overloads of `-`, now `(RR32,RR64)`, `(RR64,RR64)` and the leaves' own, where the base listed `(RR32,Number)` and `(Number,Number)`. Cause: the restated methods and D7; the verdict (expected failure) is unchanged.

Every gated test the record names as must-stay-green keeps its verdict in these passes: `IntSemanticsRungI`, `WrapOperatorsRungD`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, rung C's expected failures, and `XXXFixedWidthOverflowRungB`.

## 12. The capability table

Each operation of `Vector`, `Matrix` and the scalar-extension block ran under `walk` for each of the seven leaves on both libraries (`capability.sh`; `probes/capability-base.txt`, `probes/capability-flat.txt`, the final library): 159 of 161 run on both.
- The two that do not are `matrix(v)` for `NN32` and `NN64`, refused on both libraries where `fill` calls its entry function (`FortressLibrary.fss:2077`), because that function's numeral `0` (`:2717-2718`) reaches `T` only by a coercion from `ZZ32` that `NN32` and `NN64` do not declare: provisional row 437, home 3. The specification leaves a numeral's relation to the integer types open (`Specification/basic/expressions/literals.tex:83-95`).
- The norm needed `asFloat` for `ZZ64`, `NN32`, `NN64`, `ZZ` and `QQ` (captured failing first, `probes/failure-norm.txt`).
- No bound on `Vector` or `Matrix` is narrowed: both keep `T extends Number` (`:2291`, `:2599`), so integer arrays keep every operation (`POSITIONS.md:153`).

## 13. The body-level check

The flat library's component bodies went through the switch-over distance driver (`distance.sh`; `probes/distance/stage-counts.txt`, `walk-base.txt`, `walk-flat.txt`, `messages-base.txt`, `messages-flat.txt`). The errors are listed and not repaired, since the repair is the array design's (PLAN.md, phase 5).
- The component total for `FortressLibrary` is 1,948 on the flat library, from 3,186 on the base (printed totals, not deduplicated).
- `Number` and `exactValue` are clean.
- The generic array bodies' arithmetic at `(T, T)` is now "Could not check call to operator juxtaposition", where the base typed it `RR64` against a declared `T`: the obligation is unchanged, its message is not.
- The restated fusion pairs account for 6 well-formedness reports at 4 sites (`probes/distance/stage-diff-wellformed-acyclic.txt`; row 433).

## 14. The checker count

`explorations/coordinator/tools/checker-count/run.sh`, before and after (`probes/checker-count/table-before.txt`, `table-after.txt`, with machine lines beside them): **`#total 62`, from 125**, `#crash none` both times.
- By api: `FortressBuiltin` 18 to 0, `FortressLibrary` 110 to 38, `RangeInternals` 78 to 42, `NativeArray` 44 unchanged.
- The flattening removes 64 errors and adds 1 (`probes/checker-count/diff-before-after.txt`): gone are the comprises error, 44 hierarchy errors (lines 4-7) and 19 overloading errors of `RangeInternals`; one `RangeInternals` overloading error appears.
- The prediction was about 44. The 18 above it are hierarchy errors the flattening does not touch: at `TotalComparison` and its three objects, at `AnyMaybe`, `Maybe`, `Just` and `Nothing`, and at `RelationalPredicateCondition[\E\] excludes Condition` (`probes/skeptic/checker-count-rerun.txt:25-42`).
- The skeptic's re-run gives 62 (`probes/skeptic/checker-count-rerun.txt:20`).

## 15. The compile ladder subset

The 25 team tests this rung edits went through the restricted driver (`run-subset.sh`, `subset.txt`; `probes/ladder-before/results.txt`, `probes/ladder-after/results.txt`, `probes/ladder-machine.txt`). The compiled path runs its own prelude, so most of these files are refused before and after. Two change:
- `CoercionRedispatchRungC.fss` compiled and ran before. With answer 7's `SUM[\ZZ32\]` at its line 43 the compiler refuses it, "Wrong number or kind of static arguments for function: BIG +", because the prelude's `SUM` takes no static argument (`Library/CompilerLibrary.fsi:180-181`), the reason `BigSumRung8` waits.
- `expTest.fss`'s first error moves from typecheck to disambiguate on `asFloat`, which the prelude does not declare.

`walk`'s gated run needs both spellings, so neither file can satisfy both paths until one library serves both (the switch-over).

## 16. Row 388's consequence, and the thread counts

**Row 388** (`row388.sh`; `probes/row388-base.txt`, `probes/row388-flat.txt`), with an `RR64` matrix `m`, an `RR64` array `a` and a `ZZ32` `i`:
- `m.scale(i)` runs on both, since a method's declared parameter converts;
- `m i`, `i m`, `m DOT i`, `a + i`, `i + a`, `a - i`, `i - a`, `a MIN i` and `i MAX a` ran on the base (`4.5`, `3.25`, `-2.75`, `2.75`, `1.5`, `3.0`) and are "Failed to find any matching overload" on the flat library;
- `a + 1.0` and `m 2.0` run on both.

None is in C4 or the APL program; `vectorOps.fss:27` and `BitTwiddle.fss:45`, `:47` were respelled for it (section 9).

**Four threads** (the manifest's `writesState`): the reduction tests ran at `FORTRESS_THREADS=4` on both libraries (`threads-run.sh`; `probes/threads4/`).
- Of 50, 40 print the same (`probes/threads4/compare-base-flat.txt`).
- The 10 that differ are:
  - the timing-dependent tests that are unstable at one thread too;
  - `FileConversion` and `RangePrototype`, whose lines are the same in another order (`probes/threads4/order-check.txt`);
  - `TransactionalArrayShakedown`, whose eight repeats on each library print the same checked lines (`probes/threads4/TransactionalArrayShakedown-repeats.txt`);
  - `simpleBig` (section 11).
- The 12 further reduction tests are the same on both (`probes/threads4/extra-compare.txt`).
- The skeptic ran every reduction differential at one and four threads, and no program answered differently.

## 17. Defects measured, and their homes

- **Row 428** (`QQ` wraps): repaired, home 1, `ProjectFortress/tests/FlatTowerRungF.fss:131-138`.
- **Row 146** (a `ZZ64` bound to a numeral holds a `ZZ32`): repaired, home 1, `FlatTowerRungF.fss:41-42`. The declared-return position stays open under row 387: `ret(): ZZ64 = 2147483647; ret() + 1` is `-2147483648` under `walk` and `2147483648` compiled (`explorations/compile-ladder/rung-flat-tower/probes/skeptic/two-path-row146.txt`), gated by `ProjectFortress/tests/XXXCoercionReturnRungC.fss`.
- **`strToFloat` and the vector norm** relied on the nesting to reach `RR64`: repaired, home 1, `FlatTowerRungF.fss:128`, `:183-190`.
- **`Number`'s `=` across types**: home 1 for its exact answers, `FlatTowerRungF.fss:73-74`.
- **Row 423** (the three `Number`-typed big operators): closed by the drop (section 8).
- **Row 424** (an unwritten clause-form `SUM` or `PROD` fails under `walk` on the one library). The specification settles the value (`reductions.tex:49-52`, `:58-80`; `defining-generators.tex:147-157`) and answer 7 defers the repair, so **home 2**: `ProjectFortress/tests/XXXUnwrittenSumRungF.fss`, failing on the flat library at one and four threads (`probes/xxx-unwritten-sum-flat.txt`) and shown red on the base library (`probes/xxx-unwritten-sum-goes-red.txt`). Its reach into the demos: 18 of the 21 demos that ran on the base fail at this row (section 20).
- **`RR32`'s binary natives die on an `RR64` argument** (`narrow(1.5) + 2.5` is `InterpreterBug: getRR32 not implemented for FFloatLiteral`), on both libraries. The specification computes an `RR32` with an `RR64` by `RR64`'s declaration (`conversions-coercions.tex:844-881`), so **home 2**: `ProjectFortress/tests/XXXRR32MixedRungF.fss` (`probes/xxx-rr32-mixed.txt`); provisional row 435.
- **An empty `SUM` over a non-number `AdditiveGroup` dies at `unlift`** (D8). Its value is the operator's identity (`reductions.tex:49-52`; `evaluation/reduction.tex:66-74`; `algebraic-constraints.tex:794-797`), so **home 2**: `ProjectFortress/tests/XXXEmptyGroupSumRungF.fss` (`probes/xxx-empty-group-sum.txt`); provisional row 436.
- **The float half of `Number`'s `=` is not transitive** (D1). The specification is silent, so **home 3**: `probes/skeptic/sk-exprs-equality.txt:19-26`; provisional row 434.
- **`matrix(v)` for `NN32` and `NN64`** is refused on both libraries. The specification leaves a numeral's relation to the integer types open (`literals.tex:83-95`), so **home 3**: `probes/capability-base.txt`, `probes/capability-flat.txt`; provisional row 437.
- **The integer `^` is declared `RR64`** (`FortressLibrary.fss:682`, `:746`, `:830`, `:897`, `:987`; `FortressBuiltin.fss:448`, `:532`), where `basic-integers.tex:506-509` gives an integer for a nonnegative power, and the natives answer that integer. The specification settles it; the repair, the operator's contract for negative powers, is outside this rung; and no `walk` test can express a declared return type, since `walk` neither converts nor checks at a return (row 387). So it is the prefix's fourth case, a verified row: provisional row 438 (`probes/rule2-return-probe-flat.txt`, `probes/rule2-return-probe-base.txt`).
- **`NN64.signed` is declared `NN64` and answers a `ZZ64`** (`FortressLibrary.fsi:502`, `.fss:903`; the native `UnsignedLong$ToLong` makes an `FLong`); the rung's own coercions into `ZZ64` and `ZZ` rely on the `Long` (`:764`, `:913`, `:915`). The specification does not describe `signed` (`grep -n signed Specification/basic-lib/*.tex` finds only `unsigned`), so **home 3**: `probes/rule2-return-probe-flat.txt`, `probes/rule2-return-probe-base.txt`; provisional row 439.
- **Row 431** (`genZZ.perturb`'s left shift): home 3, `probes/perturb-base-line.txt`; the specification does not describe `QuickCheck`.
- **Row 432** (bare big operators over numeral list literals refused under `walk`): home 3, `probes/bare-sum-base.txt`, `probes/bare-sum-flat.txt`; the specification is silent (`literals.tex:83-90`, `aggregate.tex:105`).
- **Row 433** (the restated fusion pairs are ill-formed to the checker): a verified row, the fourth case; no `walk` test can express a checker refusal of the one library before the switch-over.

## 18. Stops

No stop the batch record's intro reserves for Pavol is met:
- Q1 = (a), so its (b) stop does not apply.
- No line of C4's model, vocabulary, data or check, or of the APL program, changed beyond the approved lines. The repair round's `diag_fwd.fss:50` is an approved line (`sum-replacement-judgement.md:210-212`), now written at its element type.
- No coercion beyond the table.
- `Vector` and `Matrix` keep `T extends Number`.
- No file of T or R is edited: no path under `Specification/`, `scala_src/` or `compiler_tests/`.

The standing stops met are each lifted by Pavol's decisions: the tower's declared types and `Number`'s catch-alls (`POSITIONS.md:92`, `:159`), the three operators (`:168`), the approved test lines and C4/APL lines (`:165`), the Q1 lines (`:173`).

## 19. Inherited and re-verified

The repair round inherited the branch at `70f0a3da6` (the first worker's milestones, `SKEPTIC.md`, `JUDGE.md`), with no uncommitted edit. It re-ran the new test at one and four threads after its one library edit (`probes/pass-repair-threads1.txt`, `probes/pass-repair-threads4.txt`), `diag_fwd` with line 50 respelled, and the three new expected-failure tests. It did not re-run the comparison, the microGPT checks or the checker count, since no library body changed (section 2; the doc comment moves no line).

## 20. The repair round

**The ruling** (`explorations/compile-ladder/rung-flat-tower/JUDGE.md`): repair. The skeptic's refusal holds: row 424 is live on the one library after this rung and was owed a home-2 test. Its four further corrections stand, and the judge gave homes to its recommended rows. The tower, the coercions, the reductions, the drop and the respelled lines are not reopened.

Every run below is headed by its machine line in its capture: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, cpu MHz 2100.000, openjdk 25.0.4, with the load average and `FORTRESS_THREADS` per run (the load between 0.20 and 8.85 over the round).

1. **Row 424, home 2.** `ProjectFortress/tests/XXXUnwrittenSumRungF.fss` declares `emptySum(n: ZZ32): ZZ32 = SUM[j <- 0#n] j`; `run()` asserts `emptySum(0)` is `0`, `SUM[j <- 0#4] j` is `6` and `PROD[j <- 1#3] j` is `6`, with no static argument written.
   - Under `walk` on the flat library it ends in `CastError` through the identity (`FortressLibrary.fss:3109`) at one and at four threads. Two scratch copies show the other two assertions each failing on its own, with a join unification error naming `a:BOTTOM` (`explorations/compile-ladder/rung-flat-tower/probes/xxx-unwritten-sum-flat.txt`).
   - **Shown red** (`explorations/compile-ladder/rung-flat-tower/probes/xxx-unwritten-sum-goes-red.txt`, every command in order): the base library's 15 files checked out; `walk` prints `REACHED`, `PASS`; the testSystem harness prints "Missing expected failure" and `Tests run: 1, Failures: 1`; the flat library restored, with `git status --short Library ProjectFortress/LibraryBuiltin` printing nothing; the harness again, "OK Saw expected exception", `OK (1 test)`.
   - One deviation from the instruction: the harness's scratch directory is absolute, because `harness-one.sh` changes into `ProjectFortress` before it reads it (`explorations/compile-ladder/rung-interp-coercion/harness-one.sh:14`), so the relative `tmp/h-424` the instruction gives is not found there (the first attempt's error was "tmp/h-424/tests does not exist").
2. **`RR32`'s natives, home 2.** `ProjectFortress/tests/XXXRR32MixedRungF.fss` asserts `asFloat(narrow(1.5) + 2.5)` is `4.0` and `asFloat(narrow(1.5) + 2)` is `3.5`. The scratch control, `asFloat(narrow(1.5) + narrow(2.5))`, is `4.0 : Float`. The test ends in `InterpreterBug: getRR32 not implemented for FFloatLiteral` under `walk`, and the harness reports the expected failure (`explorations/compile-ladder/rung-flat-tower/probes/xxx-rr32-mixed.txt`). No library or Java edit.
3. **The empty non-number sum, home 2.** `ProjectFortress/tests/XXXEmptyGroupSumRungF.fss` declares `M7` with its `zero` written and asserts `(SUM[\M7\][i <- 0#0] M7(i)).v` is `0`. The scratch control `SUM[\M7\][i <- 0#10] M7(i)` is `M7(3) : M7` at one and four threads. The test ends in "Unification error: Closure/Constructor for unlift param 1 (r:M7) got arg 0: ZZ32 of type Int" at one and four threads, and the harness reports the expected failure (`explorations/compile-ladder/rung-flat-tower/probes/xxx-empty-group-sum.txt`). D8 is unchanged.
4. **`diag_fwd.fss:50`** is written `BIG MAX[\ZZ32\]`, and nothing else in the file changed; the run prints the golden (section 10; `explorations/compile-ladder/rung-flat-tower/probes/diag-fwd-line50.txt`).
5. **`Number`'s doc comment** at `Library/FortressLibrary.fsi:280-282` and `Library/FortressLibrary.fss:355-357` is replaced in three lines each, so no line moved (`git diff -U0` shows only those six lines): "Two exact numbers of different types compare as rationals; a float compares with any number after %asFloat%, so an exact value equals its nearest float." The new test passes at one and four threads with caches wiped (`explorations/compile-ladder/rung-flat-tower/probes/pass-repair-threads1.txt`, `explorations/compile-ladder/rung-flat-tower/probes/pass-repair-threads4.txt`).
6. **Rule 2's count**: section 2 (`explorations/compile-ladder/rung-flat-tower/probes/rule2-return-sites.txt`, `rule2-return-probe-flat.txt`, `rule2-return-probe-base.txt`). No regression of this rung was found, no body changed, and so no re-run of the comparison or the microGPT checks was owed. The judge's remedy for the three sites that answer differently was not applied, because `basic-integers.tex:506-509` settles against it.
7. **The demos count** (`explorations/reviews/sum-replacement-judgement.md:169-172`, `:405-406`; `explorations/compile-ladder/rung-flat-tower/probes/demos-count.txt`, by `demos-run.sh` and `demos-summary.py`). The 24 demos that the instruction's grep lists (137 lines) each ran under `walk` at one thread, with a 180-second timeout and a private cache, from a scratch copy of `ProjectFortress/demos`, on both libraries, four JVMs at a time; no run reached the timeout (the longest took 132 s).
   - **21 ran on the base, and all 21 fail on the flat library; 18 of those fail at row 424**: 5 with a join unification error naming `BOTTOM` (`BiCGSTAB`, `BirdCount1m`, `1n`, `1o`, `posFeedback`), 13 with `CastError` through the identity (`BirdCount1p` to `1w`, `1y`, `1z`, `2a` to `2c`).
   - The other 3 (`mg.fss:159`, `wordcount.fss:84`, `wordcount2.fss:106`) fail earlier, dividing a `ZZ64` time difference by a float, which answer 8 makes explicit; the team tests' timing lines got the same respelling (`asFloat`) under Q1 = (a).
   - Three demos did not run on the base either: `BirdCount2d` (its api `GenomeUtil2d` is not on the path), `aStar` (a syntax error at `aStar.fss:38`), and `npbft` (an overloading error at `npbft.fss:49`).
   - `wordcount2` reads `ProjectFortress/demos/hamlet` relative to its working directory (`wordcount2.fss:132`) and was `FileNotFound` on both libraries in the first run. The driver now links that path inside the scratch copy, and `wordcount2` was run again on both.
   - The demos are not gated, and none was edited (they are not F's files, `CLIMB-BATCH-6.md:96`).
8. **`record.md`**: the corrections of the judge's instruction 8, and provisional rows 434-439. Rows 438 and 439 come from rule 2's count; each is a defect of a declared type that no `walk` run can see.
9. **This text**: recomposed with the amendments (see its head). The harness refused the write of `REPORT.md` again.
10. **Tracked paths**: the shared prefix's loop, run over this text and `record.md` after the final commit, prints nothing.

**What the gather must know.** F adds four files to `ProjectFortress/tests/` (`FlatTowerRungF.fss` and the three `XXX` files), where the batch record counted one (`explorations/coordinator/CLIMB-BATCH-6.md:224`). With R's two, the `testSystem` sum rises by six, not three, and the gate's expected `testSystem: 411` (`CLIMB-BATCH-6.md:272`) becomes 414 (`JUDGE.md` section 5).
