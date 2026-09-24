<!-- What route A's flat numeric tower means for the programs users write, made concrete on C4, on the tests and on a complex number: written 2026-09-24 by a delegated worker for Pavol's question of that day, by reading only. Sources: `../exclusion-design-brief.md` (§ 1, 2.4, 2.5, 2.8, 3 route A); `price-keep-the-rule.md` ("keep") and its captures in `keep/`, among them the flat library sketch `keep/flat-tower-sketch.fsi` ("the sketch") and the survey `keep/nestprobe/`; `coordinator/FACTS.md:93-102`; `explorations/complex_ring.fss`, the two Mandelbrot programs and `swift-vs-fortress-explainer.md`; C4's sources in `explorations/run-c4/src/`. Nothing was run. The one count made here re-derives a split of the survey's test sites from `keep/nestprobe/survey-sites.tsv`, and says so where used. A citation names a file and line, or a note by basename and section. "(i)" is remedy i, the interpreter taught coercion; "(ii)" is remedy ii, each site converted by hand. -->

# The flat world for users: C4, the tests and a complex number under route A

## 1. The flat world in five lines

- The flat world is route A. Today every number sits on one chain, `ZZ32 <: ZZ64 <: ZZ <: AnyIntegral <: QQ <: RR64 <: Number` (keep, terms). Under A the links go: `ZZ32` is no longer a `ZZ64`, nor `ZZ64` a `ZZ`, nor an integer a `QQ`, nor `QQ` an `RR64`; the integer types, `QQ` and `RR64` become siblings under `Number`, and `AnyIntegral` stays the integers' common parent (keep § 1; the sketch :69-71).
- Each type keeps its algebra at its own type: `Equality`, the orders and `Integral` on the integers, and `AdditiveGroup` and `MultiplicativeRing` on `QQ` and `RR64`, which today have them only at `Number` (keep § 1; the sketch :39-40, :54-55, :77-78).
- Where a narrower number meets a wider one, a `coerce` declared on the wider type converts it: `ZZ64` from `ZZ32`, `ZZ` from the fixed widths, `QQ` and `RR64` from every integer, `RR64` from `QQ` (keep § 1, "Widening"). It is tried only when no declaration fits without it (`Specification/basic/conversions-coercions.tex:454-458`), and it does not chain (`:127-132`).
- `Number` stays the type every number belongs to, so `T extends Number` stays valid (keep § 4). It loses its algebra and its 52 declared operators and functions, the catch-alls such as `opr +(self, b: Number): RR64 = asFloat(self) + asFloat(b)` (`Library/FortressLibrary.fss:379`; keep § 1).
- The catch-alls cannot stay beside coercion: they fit every mixed call without coercion, so `x + 1` with `x: ZZ64` would run in floating point, and the compiled checker would refuse their `RR64` result beside each integer's own `+` (keep § 1).

## 2. C4, concretely

The 37 microGPT sites the keep note counts are in `explorations/microgpt.fss`, the scalar-autodiff port, not in C4: the survey ran that one program for 50 of its 250 steps (keep § 4; `keep/nestprobe/showcase-microgpt-summary.txt:1-6`). C4 (`MicroGptFlat.fss`, `FlatArrays.fss`, `FlatData.fss`) was never surveyed. The lines below are C4's, found by reading, each set beside the surveyed `microgpt.fss` record of the same shape where there is one (`keep/nestprobe/showcase-microgpt-sites.tsv`).

- `MicroGptFlat.fss:27`, `rmsn`: `x / SQRT (epsilon + (x DOT x) / |x|)`; the same at `:31` and `:32`.
  - Today: a float divided by the vector's length, a `ZZ32` (`FortressLibrary.fss:1676`). `Float`'s own `/` takes only a `Float` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:114`), so `Number`'s catch-all `/` runs (`FortressLibrary.fss:385`), reached because an integer is a `Number`; the mirror of `microgpt.fss:63`.
  - (i): the text stands. `|x|` goes through `RR64`'s `coerce(x: ZZ32)` (the sketch :46), which the interpreter already lifts into a callable `coerce_RR64` (keep § 3), and `RR64`'s own `/` runs.
  - (ii): `(x DOT x) / asFloat(|x|)`.
- `:59` and `:66`: `SQRT (1.0 headDim)`.
  - Today: `1.0 headDim` is the program's own way of saying "this integer as a float". A float literal has no arithmetic of its own (`FortressBuiltin.fss:194-201`), so `Number`'s catch-all juxtaposition runs (`FortressLibrary.fss:383-384`). `microgpt.fss:208`'s `SQRT(hd 1.0)` is the surveyed twin, one of its 7 mixed sites.
  - (i): the text stands; `headDim` is coerced into `RR64`'s juxtaposition.
  - (ii): the idiom itself goes: `SQRT asFloat(headDim)`.
- `:77`, Adam: `m' = beta1 m + (1 - beta1) g`; the same `1 - …` at `:78` and `:79`.
  - Today: an integer literal minus a float. No integer `-` takes a float, so `Number`'s `-` runs (`FortressLibrary.fss:380`).
  - (i): the integer is the left operand, the `self` of `-`. It is covered if the dispatch pass coerces that operand like any argument; whether the compiled checker coerces a `self` is not measured (keep § 4).
  - (ii): `(1.0 - beta1) g`.
- `:82`: `learningRate(s: ZZ32): RR64 = lr0 (1 - (1.0 s) / nSteps)`.
  - Today: three mixed operations in one line, `1.0 s`, `/ nSteps` and `1 - …`, all through `Number`'s catch-alls; `microgpt.fss:243` writes the same schedule and is a surveyed site.
  - (i): the text stands, with three coercions of an integer into `RR64`.
  - (ii): `lr0 (1.0 - asFloat(s) / asFloat(nSteps))`.
- `:95`: `((nanoTime() - t0) DIV 1000000)`.
  - Today: `nanoTime()` is a `ZZ64` (`FortressLibrary.fsi:2394`) and the literal a `ZZ32`; `ZZ64`'s `DIV` takes it because `ZZ32 <: ZZ64`. It is C4's one integer-width dependence, by reading.
  - (i): `ZZ64`'s `coerce(x: ZZ32)` (the sketch :99; the prelude has it, `CompilerBuiltin.fss:575-576`).
  - (ii): `DIV widen(1000000)`.
- `:43`: `matOffset(i: ZZ32): ZZ32 = SUM[j <- 0#i] matCount(j)`; also `SUM e` (`:28`), `SUM vm` (`:52`) and `SUM[m <- ms] |m|` (`FlatArrays.fss:178`).
  - Today: every `SUM` of numbers runs `SumReduction`, the library's "Hack to permit any Number to work non-parametrically", with `empty(): Number = 0` and `join(a: Number, b: Number): Number = a+b` (`FortressLibrary.fss:3030-3040`, `:3051-3055`). `matOffset(0)`, the offset of the first matrix, is a sum over an empty range and is `0` by that `empty()`.
  - Under A the hack goes under either remedy, and its replacement is open (keep § 2c). With one reduction per number type, C4's text stands. With the identity passed by the caller, all four lines change. With the sum lifted to `Maybe`, an empty sum has no value and `matOffset(0)` breaks.
- `FlatArrays.fss:15` and `:25`: `zeros(n) = array[\RR64\](n).fill(0.0)`, then the elementwise product `e b[i]`.
  - Today: `fill(0.0)` stores float literals, as `var grad: RR64 := 0.0` does in `microgpt.fss:17`, and `Float`'s own juxtaposition takes only a `Float` (`FortressBuiltin.fss:111-112`), so a literal meeting a `Float` goes through `Number`'s catch-alls. That is the float-only kind, 30 of microGPT's 37 (keep § 4).
  - Under A, `RR64` gets its own arithmetic in the library (keep § 6), and neither remedy touches these lines.
- Unchanged under A: `gather[\T extends Number, …\]` (`FlatArrays.fss:166`) and the library's `Vector[\T extends Number, …\]` (`coordinator/FACTS.md:95`) stay valid (keep § 4); `beta1^t` (`:79`) and `10.0^(-5)` (`:18`) take the integer exponent as an `AnyIntegral` (`FortressLibrary.fss:349`, `:407`), which every integer still is.

The verdict for C4:
- Under (i) the model's text does not change, as the brief says for `microgpt.fss` (brief § 4, the case for A), with one condition that does not arise in `microgpt.fss`, which has no `SUM`: the `SUM` replacement must keep an identity.
- Outputs: each coercion above turns a small integer into a float, as the catch-alls' `asFloat` does today (`FortressLibrary.fss:379-385`), so the losses should print the same digits. This is reading, not a run. No C4 value is bound to a wider integer type, so § 3's overflow change does not arise.
- Under (ii), by reading, 11 lines change: `MicroGptFlat.fss:27, 31, 32, 59, 66, 77, 78, 79, 82, 95` and `FlatData.fss:26` (`10.0 m + (c.codePoint - '0'.codePoint)`). And C4 cannot start until the library's `FortressLibrary.fss:4121` is converted, because every run reaches it (keep § 2b; `showcase-microgpt-summary.txt:31`).

## 3. The tests

The 207 test sites that certainly need a conversion are in 35 files (`keep/nestprobe/survey-summary.txt:55-56`). Under (i) none of their text changes; under (ii) all 207 do, plus up to 129 float sites whose partner is an integer, after the library's 160 (keep § 3). By why they need one (`survey-summary.txt:51`):
- **120: a value reaches a declared type wider than its own.** Re-derived here from `survey-sites.tsv` with the analyzer's own rule (`keep/nestprobe/analyze.py:192-199`): 112 at a parameter, an integer passed where a wider type (`ZZ64`, `ZZ`, `NN64`, `QQ`, `RR64`) is declared, in 15 files; 8 at a typed binding, each an integer literal bound to `ZZ64` (`BitTwiddle`, `expTest`, `litCoercion`, `longPrim`, `varTest`); none at a `typecase`.
- **58: a mixed call answered by the wider type's method**: an `Int` on one side, a `Long`, `BigNum` or `Ratio` on the other, and the wider type's operator runs; 40 of them in `RationalTest`.
- **29: `Number`'s catch-all with an integer**: mixed integer-float arithmetic, or a float function of an integer such as `SQRT 5`. The re-derivation gives 28, and 130 for the note's 129 float-only sites, because the table keeps only each site's three most frequent records (`analyze.py:149`).
- Not among the 207: the 129 float-only sites, answered by `RR64`'s own arithmetic where both operands are floats, and 658 sites that need only a method restated on an integer type, 599 of them `RationalTest`'s integer `/`; library work, no test text (keep § 2b).

Five lines before and after under (ii), with the keep note's spellings, `widen` for `ZZ64`, `big` for `ZZ`, `0.0` for `RR64` (keep § 3):
- Binding, `litCoercion.fss:19`: `x: ZZ64 := 0` becomes `x: ZZ64 := widen(0)`. Now `x` really is a `ZZ64`, so `x += 1` at `:23` becomes `x += widen(1)`: converting by hand moves the dependence to the next use (reading). The test, named for literal coercion, then no longer exercises it.
- Parameter, `BitTwiddle.fss:45`: `doit(n,32)` becomes `doit(n,widen(32))`, for `sz: ZZ64` (`:15`).
- Generic binding, `BitTwiddle.fss:17`: `z : I = 0` in `doit[\I extends Integral[\I\]\]`, reached with `I = ZZ64` from `:47`. No literal spelling fits a type parameter; `z : I = n.zero` does, through `Integral`'s getter (`FortressLibrary.fss:616`). `8 n` at `:32` has no spelling in the note's list.
- Wider type's method, `NumberPrintTest.fss:46`: `assert("" (0 + 78236427658757685), "78236427658757685")` becomes `(widen(0) + 78236427658757685)`; `:47`'s `0 + 3856…` becomes `big(0) + 3856…`.
- Catch-all with an integer, `fib13.fss:15`: `phi = (1 + SQRT 5) / 2` becomes `phi = (1.0 + SQRT 5.0) / 2.0`.

What (i) covers (keep § 3):
- Parameters and typed bindings: yes, at the nine sites the note names, with `FlatCall` and `FlatBind` as the failing probes it makes pass (`keep/FlatCall.walk.txt:4-5`, `keep/FlatBind.walk.txt:4`).
- Mixed calls and catch-alls: yes, by the second pass at `OverloadedFunction.bestMatch`, the team's "TODO add checks for COERCE" (`OverloadedFunction.java:791`); in `0 + 7823…` and `1 + SQRT 5` the integer is the `self`, the open point of § 2.
- `typecase`: no, it is not a coercion context (`conversions-coercions.tex:98-110`). No test's own text has one; the one site in the survey is the library's `cast[\T\]` (`FortressLibrary.fss:35`, a `ZZ64` tested against `ZZ` 92 times, `survey-sites.tsv`), converted in the library under either remedy (keep § 6).
- Outputs where a wide binding really widens: these change. `x: ZZ64 = 2147483647; x + 1` prints `-2147483648` today because the value stays a 32-bit `Int` (`keep/NestedWidth.walk.txt:2-3`); coerced, it is a `Long` and the sum is 2147483648. In the suite, `longPrim.fss:20-21` binds `a:ZZ64 = 0` and checks `a.minimum - 1` against `a.maximum`: today `a` is an `Int`, so that "ZZ64" test checks the 32-bit bounds (`FortressLibrary.fss:649-650`); under (i) it checks the 64-bit ones (`:707-708`). By reading it passes both ways. How many tests print a value that really widens was not measured (keep § 6).

## 4. The complex-number test

What `complex_ring.fss` declares and gets:
- It declares `object C(re: RR64, im: RR64) extends MultiplicativeRing[\C\]` and nothing else (`complex_ring.fss:8`), and writes `one`, `+`, unary `-`, `TIMES` and `^` (`:9-15`).
- From the trait's defaults it gets juxtaposition, `z z` as `z TIMES z` (`FortressLibrary.fss:347`), binary minus as `self + (-other)` (`:334`), and `zero` as `self - self` (`:332`), through `MultiplicativeRing` extending `AdditiveGroup` (`:343-344`). Its run shows them in `w - w` and `w.zero` (`complex_ring.fss:26-27`; `swift-vs-fortress-explainer.md:59-63`; `explorations/README.md:23`).
- The library's `Vector` and `Matrix` get their `+`, `-`, unary `-` and `zero` the same way (`coordinator/FACTS.md:96`).

Where it comes from: the self-typed algebra traits, not the numeric chain. `C` is not a `Number` and is on no chain, so cutting the chain does not reach it; A keeps these traits and puts them on `RR64` and `QQ` at their own type (the sketch :39-40, :54-55).

The lines of `complex_ring.fss` that change under A: none, by reading.
- `:9`, `:21`, `:24-25` build a `C` only from float literals, which are `RR64` under both towers (keep, terms). `C(2, 0)` would lean on the chain today (`keep/FlatExplicit.walk.txt:4`, `k(3)` for `k(x: RR64)`) and need a coercion or `C(2.0, 0.0)` under A; the file never writes it.
- `:10` and `:13` do float arithmetic on the fields. Where a float literal meets a `Float`, it runs `Number`'s catch-alls today and `RR64`'s own under A, with the same text (keep § 4).
- `:14-15`, `opr ^(self, other: AnyIntegral)`: `i^2` and `(C(1.0, 1.0))^4` pass an integer as an `AnyIntegral`, which every integer still is (the sketch :69-71). Under walk `other <= 0` and `other - 1` run the integer's own methods, as today. No static checker has run this file under either tower.

The Mandelbrot experiments are a different case. Their `C` declares no trait: `mandelbrot_canonical.fss:9-15` writes its own juxtaposition (`:14`), and `mandelbrot_swifty.fss:13-18` has only `+` and `TIMES`. What they took from the tower is `-2.0 + k dx` (`mandelbrot_canonical.fss:31`), an integer from `0#64` times a float with no conversion, which the explainer credits to subtyping: "A 32-bit integer *is* a real number, so mixed arithmetic is ordinary dispatch, not coercion" (`swift-vs-fortress-explainer.md:100`). The body that runs is `Number`'s catch-all `asFloat(self) asFloat(b)` (`FortressLibrary.fss:383-384`). It needs only that an integer is a `Number`, which A keeps, and the catch-all itself, which A removes. That is reading, and the survey records the same shape as `Number.juxtaposition<-ZZ32` at `buffons.fss:28` and `microgpt.fss:86`. Under (i) the line stands and `k` is coerced; under (ii) it becomes `-2.0 + asFloat(k) dx`.

Easier or harder to write a complex type in the flat world:
- The same: the conformance and the operations it gives, above.
- The same under (i) and on the compiled path, more text under (ii): mixing a real with a complex. Today nothing does it for free: the catch-alls want a `Number` on both sides and `C` is not one, so `2 z` finds no declaration (reading). The user writes `opr juxtaposition(a: RR64, z: C): C = C(a z.re, a z.im)`. Today that one declaration takes every integer and rational by the chain; under A it takes them by `RR64`'s coercions, one step each (the sketch :43-48), so it stays one declaration. Under (ii) each integer call writes `2.0 z` or `asFloat(n) z`.
- Harder: a `coerce(x: RR64)` inside `C`, to let `z + 2.0` work, does not carry a `ZZ32` along, since coercion does not chain (`conversions-coercions.tex:127-132`); `C` would need one coercion per number type. The interpreter has no coercion today (`coordinator/FACTS.md:52`), so this spelling is new either way.
- Easier: a complex type generic in its parts, `Complex[\T extends MultiplicativeRing[\T\]\]`, the specification's style of bound, cannot be made at `RR64` today, since `RR64` fails `T extends AdditiveGroup[\T\]` (`coordinator/FACTS.md:99`). Under A it can, at `RR64` and at `QQ` (brief § 2.8; the sketch :39-40, :54-55).

## 5. What a user loses and gains under A, with (i)

Loses:
- **`Number` as a type with arithmetic.** `fn (x: Number): RR64 => x + y` (`generatorTest.fss:28`) runs on any number today through the catch-alls. Under (i) it still runs, since dispatch looks at the values and coercion fills the gap, but no `+` on `Number` exists for a static checker (keep § 1). The library's own instance is `SUM`: its replacement is open, and one option loses the empty sum's `0` (keep § 2c; C4's `matOffset(0)`, § 2).
- **The join of mixed widths.** Where a generic's type is inferred from a `ZZ32` and a `ZZ64` together, as in `lo:hi`, the flat answer is `AnyIntegral`, and what the interpreter then does was not measured (keep § 3, § 6).
- **A value's identity when it is widened.** `q: QQ = z` keeps the `Int` 7 today and prints `7` (`keep/FlatExplicit.walk.txt:5`); under (i) it holds whatever `QQ`'s coercion builds. The sketch has `ZZ`'s `/` return `Ratio(a, 1)` where it returns `a` today (the sketch :63-64; `FortressLibrary.fss:860`), and a `Ratio` prints as `num/den` (`:600`). Whether such values print differently was not measured.
- **Wrapping outputs.** A wide binding prints the wide result (§ 3), arguably the right one: the keep note recorded the wrap as a defect (`coordinator/FACTS.md:43`).
- **The same choice on both paths.** Under (i) the interpreter picks a coercion as it runs. The specification and the compiled path pick it when the program is checked, and the specification's own example makes the two call different declarations (keep § 3; `conversions-coercions.tex:567-604`).

Gains:
- **The specification's algebraic bounds work on `RR64`**: `T extends AdditiveGroup[\T\]` and the ring bound (`coordinator/FACTS.md:99`; the sketch :39-40), the gain of § 4.
- **The specialisation shortcut stays**: a generic function may keep a special version for one instantiation, `tail(x: List[\ZZ\])` beside `tail[\X\](x: List[\X\])` (brief § 1, § 3 route A).
- **One tower shape on both paths**: the interpreter's library takes the compiler prelude's shape, whose tests already widen by coercion and never by hand (keep § 3; `ProjectFortress/library_tests/AverageTest.fss:108`).
- **Wide means wide**: a `ZZ64` variable holds a 64-bit value (§ 3).
- **Text kept**: under (i) no test text changes by design, and microGPT's changes nowhere (keep § 6; brief § 4).

## 6. In five lines

- The free operations of the complex type came from the algebra traits, which A keeps and extends to `RR64`; what came from subtyping is mixed arithmetic with no conversion written (`k dx`, `1.0 headDim`, `1 - beta1`, mostly through `Number`'s catch-alls) and one `RR64` parameter taking any integer, and A keeps both for the user only through coercion, so (i) decides whether the ergonomics survive.
- Read, not run: every line verdict on C4, `complex_ring.fss` and the Mandelbrot programs, the claim that C4's digits stay the same, and the (ii) spellings.
- Measured by the keep note and quoted: the 37 microGPT sites, the 207 test sites and their reasons, the probes' outputs in `keep/*.walk.txt`.
- Counted here from the keep note's table: the 112/8 split of the 120 and the file spreads; the table's three-record cut moves one site between the 29 and the 129.
- Open: the `SUM` replacement, which decides whether C4's text stands; the integer as `self` under coercion; the mixed-width join; how many tests print a value that really widens.
