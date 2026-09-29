# Rung V: `RR32` a sibling of `RR64` (`rung-rr32-sibling`)

- problem: under `walk`, `narrow(1.5) + 2.5` ends the run with "InterpreterBug: getRR32 not implemented for FFloatLiteral" (row 435), `explorations/compile-ladder/rung-rr32-sibling/probes/expr/XAddLit.base.txt:2-3`; the gated expected failure at the base, `ProjectFortress/tests/XXXRR32MixedRungF.fss:8`, promoted to `ProjectFortress/tests/RR32MixedRungF.fss:8`
- spec: "These types are mutually exclusive; no value has more than one of them", `Specification/basic/types-vals-vars.tex:536`, kept by the later Types chapter, `Documentation/Specification/Prose/Language/types.tick:977-978`; an `RR32` with an `RR64` is computed by `RR64`'s declaration after a coercion from `RR32`, two `RR32` values by `RR32`'s own, `Specification/basic/conversions-coercions.tex:904-912`
- precedent: `RR64`'s own header, coercion and operators at its own type, `Library/FortressLibrary.fsi:291-378`, with `RR64`'s coercion from `RR32` as the compiler library declares it, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:435`, and a native value object of the same file declaring its operators in its api, `NN32`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:131-164`
- deviation: `RR32`'s integer power is `narrow((asFloat(self))^b)` where `RR64`'s is `(asFloat(self))^b`, because `RR32`'s own native reads its exponent as an `RR32`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:294-298` through `:94-99`
- deviation: `RR64`'s coercion from `RR32` is written without the specification's `widens`, `Specification/basic/conversions-coercions.tex:895`, as `RR64`'s coercion from `ZZ32` is, `Library/FortressLibrary.fss:391`
- deviation: `RR64` names `RR32` in its `excludes` clause, which the rule for object types already implies, `Specification/basic/types-vals-vars.tex:256-258`
- deviation: `RR32`'s api lists its operators in its component's order, with `=/=` and `round`, which `RR64`'s api does not list, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:69-116`
- historical: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fss`, `Specification/basic-lib/numbers.tex`, `Specification/appendices/changes.tex` (the first line the rung edits, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47`)

## 1. What changed

`RR32` stops being a subtype of `RR64`. It becomes a sibling of the other number types under `Number`, carrying its own algebra, and `RR64` converts from it by coercion (route A, POSITIONS 2026-09-24; answer 8, POSITIONS 2026-09-26). Line numbers are on this rung's tree unless they say the base (`382b9fe7f`).

- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47-48`: `value object RR32 extends { Number, StandardPartialOrder[\RR32\], StandardMinMax[\RR32\], AdditiveGroup[\RR32\], MultiplicativeRing[\RR32\] }`. This is the header `RR64` has at its own type (`Library/FortressLibrary.fsi:291-292`).
- `FortressBuiltin.fsi:69-116`: 48 lines that declare in the api the operators `RR32`'s component defines, each at `RR32`. They are `|self|`, `=`, `=/=`, `<`, `<=`, `>`, `>=`, `CMP`, `MIN`, `MAX`, `MINMAX`, unary and binary `-`, `+`, `DOT`, `TIMES`, juxtaposition, `/`, `SQRT`, the eight `_UP`/`_DOWN` forms, the eight `IEEE_` forms, `^(self, b:Float):RR64`, `^(self, b:AnyIntegral):RR32`, `floor`, `|\\self/|`, `ceiling`, `|/self\\|`, `truncate` and `round`. Before, the api declared the getters, `^(self, b:RR32)`, `MINNUM` and `MAXNUM` only.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:203-206`: the same header. `zero` and `one` are declared `: RR32`; they were `: Number`.
- `FortressBuiltin.fss:242`: `opr |self| : RR32`; it was `: Number`.
- `FortressBuiltin.fss:244-322`: the 32 declarations that took `b:RR64` now take `b:RR32`. Thirty of them are natives that read the argument with `getRR32()` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:86-99`); the other two are `CMP` and `MINMAX`. `MIN`, `MAX` and `MINMAX` answer `RR32` and `(RR32,RR32)`; they answered `RR64` and `(RR64,RR64)`. This is row 435's second fix.
- `FortressBuiltin.fss:328`: `opr ^(self, b:AnyIntegral):RR32 = narrow((asFloat(self))^b)` replaces three base lines (`:327-330`): `opr ^(self, b:Number):RR64 = self^asFloat(b)`, its comment "Shouldn't need this extra declaration.", and `opr ^(self, b:ZZ64):RR32 = builtinPrimitive("...RR32$Pow")`. `^(self, b:RR32):RR32` and `^(self, b:Float):RR64` stay.
- `Library/FortressLibrary.fsi:282` and `.fss:359`: `Number comprises { RR64, RR32, QQ, AnyIntegral }`.
- `Library/FortressLibrary.fss:364-373`: `Number`'s `=` tests for a float with `RR32` beside `RR64`, in both arms of its `typecase` (`:367`, `:370`).
- `Library/FortressLibrary.fsi:293-294` and `.fss:389-390`: `RR64 excludes { QQ, AnyIntegral, RR32 } comprises { Float, FloatLiteral }`; it was `excludes { QQ, AnyIntegral } comprises { Float, FloatLiteral, RR32 }`.
- `Library/FortressLibrary.fsi:296` and `.fss:392`: `coerce(x: RR32)`, with the body `asFloat(x)`.
- The specification:
  - `Specification/basic-lib/numbers.tex:31`, `:43` and `:50-56`: the passage names `ℝ32` among the number types and among `ℝ64`'s coercions, with a callout.
  - `Specification/appendices/changes.tex:485-487`: batch 6's sentence on `ℝ32` is revised.
  - `Specification/appendices/changes.tex:1714-1790`: the new entry "The single-precision floating-point type".
  - The reasoning is in `explorations/compile-ladder/rung-rr32-sibling/decision-record.md`.
- The tests:
  - `ProjectFortress/tests/RR32SiblingRungV.fss` is new, with 37 assertions.
  - `ProjectFortress/tests/XXXRR32MixedRungF.fss` is promoted by `git mv` to `RR32MixedRungF.fss`. Its component line is renamed to match; no assertion changed.
  - Two expected failures of defects this rung measured and does not repair (section 11): `ProjectFortress/library_tests/XXXRR32EqualityRungV.fss` with `XXXRR32EqualityRungV.test` and `RR32EqualityRungVLink.test`, and `ProjectFortress/tests/XXXStringAvFlatRungV.fss`.
  - Six test files are re-anchored, messages only (section 8).

No Java or Scala changed. No team test line changed (section 7).

## 2. The recorded failure and the recorded pass

- **The failure, before the edit.** `explorations/compile-ladder/rung-rr32-sibling/probes/test/RR32SiblingRungV.base-prefail.txt` holds the test as first written (commit `76f4829b3`), run under `walk` from a private cache. The library was at the base; only the two specification files differed. The output is `FAIL: J7/0:an RR64 =/= J7/0:an RR32; types-vals-vars.tex:536: an RR32 is not an RR64`, `rc=1`. The later cases fail on the base too, as the base's single-expression probes show (section 5): every mixed case ends the run with row 435's `InterpreterBug`.
- **The pass, after the edit.** `explorations/compile-ladder/rung-rr32-sibling/probes/test/RR32SiblingRungV.edit-pass.txt` holds the final test on the final edit: `PASS`, `rc=0`.
- **The promoted test.** It passes in the edit pass (`RR32MixedRungF`, section 7). The base's `XXXRR32MixedRungF` failed as expected, with row 435's `InterpreterBug`, `rc=1` in both base passes.

Two cases were added to the test after its failure was recorded: `a^w` for a `ZZ64` `w` (`:42`) and `a^2.5` (`:54`). They were added once the base's probes had measured the two exponent defects they assert (section 11). On the base both end the run (`probes/expr/XPowZZ64.base.txt:2-3`, `XPowFloatLit.base.txt:2-3`).

## 3. Where the fix belongs

`explorations/coordinator/map/spec-to-implementation.md`, section 4 (the number tower), puts the interpreter's number types in the one library's declarations:
- `RR64` in `Library/FortressLibrary.fsi` and `.fss`;
- the native value objects (`Float`, `RR32`, `NN32`) in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` and `.fss`, whose `builtinPrimitive` bodies name the natives in `interpreter/glue/prim/`.

The defect of row 435 is a declared parameter type wider than what the native reads. `RR32$Add` and its 29 siblings read their argument with `getRR32()` (`RR32.java:86-99`), which only `FRR32` implements (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FValue.java:77-78`, `FRR32.java:27-29`).

Row 435 names two fixes. The first converts the argument in the native (`RR32.java:90-98`); it keeps `RR32` below `RR64`, so it cannot carry route A, and it is Java. The second retypes the parameters to `RR32`, in the declarations, where route A and answer 8 put the tower. So the fix belongs in the declarations, with no Java, as the brief expected.

The coercion is a library declaration, `RR64`'s `coerce`. Walk applies it at its three kinds of type check since climb batch 4's rung C (FACTS.md, "Under `walk`, the interpreter converts by coercion"), and batch N's rungs I and K read it in their inference with coercion. The compiled path uses its own prelude, where `RR32` is a sibling already (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435`, `:475-477`); nothing there is this rung's.

## 4. Precedent search

Has the team solved this here already, and in how many ways?
- **A number type at its own type, a sibling under `Number`.** `RR64` (`Library/FortressLibrary.fsi:291-292`) and `QQ` (`:382-383`) extend `Number`, `StandardPartialOrder`, `StandardMinMax`, `AdditiveGroup` and `MultiplicativeRing` at their own type. The integer types reach the same through `Integral[\I\]`. `RR32` now takes `RR64`'s header word for word, at `RR32`.
- **A native value object that declares its operators in its api.** `NN32`, in the same two files, declares its operators in its api (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:131-164`) and defines them on natives in its component (`.fss:385` on). `RR64`'s api declares its own (`Library/FortressLibrary.fsi:319-378`). `RR32`'s api declared four. Without the rest, an operator that `RR32` shares with `RR64` outside the algebra traits reaches a program only as `RR64`'s. The probe measured those answering an `RR64` for `/`, `SQRT`, `SLASH_UP` and `PLUS_UP` (`explorations/compile-ladder/plan-6.5/probes/rr32/RR32Div2.sibling.txt`). The rung declares them as `NN32` and `RR64` do; this is the probe's second shape.
- **The coercion from `RR32`.** It is spelled three ways:
  - the compiler library's `RR64` declares `coerce(x: RR32) = jFloatToDouble(x)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:435`, `.fss:933`); the two types have been siblings there since Chase's cut of the subtype (`6896886fb`, 2009-08-31), whose message ends "this would be a good time to get coercion working" and which added no coercion, and the coercion is first seen in `26718e298` (2011-12-06), where the file reappears whole after the conversion's cut of its parent links (`probes/skeptic/coerce-history.txt`);
  - the one library's `RR64` declares `coerce(x: ZZ32) = asFloat(x)` (`Library/FortressLibrary.fss:391`);
  - the specification's example declares `coerce(x: ℝ32) widens` (`Specification/basic/conversions-coercions.tex:895`).

  The rung writes `coerce(x: RR32) = asFloat(x)`, the one library's form; `widens` is deferred (answer 8).
- **`MIN`, `MAX` and `MINMAX` at the type's own type.** `RR64` (`Library/FortressLibrary.fss:430-432`), `QQ` and `Float` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:95-99`) declare them; so do the four integer types since batch N's rung M (decision 2 of 2026-09-28). `RR32`'s were typed at `RR64` since rung F (`d846e3644`), which held only while an `RR32` was an `RR64`. Rung M's precedent search counted them as declared (`explorations/compile-ladder/rung-integer-minmax/REPORT.md`, section 3). They now answer `RR32`.
- **A float's integer power through `asFloat`.** `RR64` declares `opr ^(self, b:AnyIntegral):RR64 = (asFloat(self))^b`, with the parentheses (`Library/FortressLibrary.fss:463`), and `narrow(self): RR32 = narrow(asFloat(self))` (`:503`). `RR32`'s power is the two composed.
- **`Number`'s `=`.** The rung extends its own `typecase ... RR64 =>` (`Library/FortressLibrary.fss:364-373`) by one clause in each arm. The probe's first shape did the same (`explorations/compile-ladder/plan-6.5/NOTES.md`, section 6).

Sites of the same defect, counted:
- In `RR32`'s component on the base, 31 declarations admitted an argument that their native reads with `getRR32()`. They are the 30 natives declared `b:RR64` and `^(self, b:ZZ64):RR32` on `RR32$Pow`: `RR32.java:294-298` reads the exponent through `FF2F`, `:94-99`. All 31 are retyped or replaced.
- `Float`'s natives declare `b:Float` and read `getFloat()`, which `FRR32`, `FInt` and `FLong` implement. By a read of `FortressBuiltin.fss` against the `glue/prim` classes, no other number type's natives read a narrower argument than they declare.
- The base's `self^asFloat(b)` applies an operator to a bare function name. `git grep -nE '\^[a-zA-Z_][a-zA-Z_0-9]*\(' 382b9fe7f -- 'Library/*.fss' 'Library/*.fsi' 'ProjectFortress/LibraryBuiltin/*.fss'` finds that line alone, so there is no other site.

## 5. The edit's decisions

1. **The probe's second shape, not its first.** The first shape (`explorations/compile-ladder/plan-6.5/probes/rr32/rr32-sibling.patch`) leaves `RR32`'s api at four operators, so `/`, `SQRT` and the rounded forms answer `RR64` and `testRR32` fails at its line 30. The second (`rr32-sibling-api.patch`) declares them. Taken: the second, from its text, re-applied by hand on this base.
2. **`RR32`'s exponent overloads.** Once `RR32` is not an `RR64`, `^(self, b:Number):RR64` breaks the return-type rule, which requires a declaration with a more specific domain to return a subtype. It sits beside `^(self, b:RR32):RR32` and beside `MultiplicativeRing[\RR32\]`'s `^(self, other:AnyIntegral): RR32` (`Library/FortressLibrary.fss:354-355`). The probe met it (NOTES.md section 6). The candidates:
   - (a) The probe's: drop the `Number` and `ZZ64` forms and declare `^(self, b:AnyIntegral):RR32` on `RR32$Pow`. `RR32$Pow` reads its exponent with `getRR32()` (`RR32.java:294-298`), so every integer power would end the run with an `InterpreterBug`. The base's `ZZ64` form does exactly that ("getRR32 not implemented for FLong", `probes/expr/XPowZZ64.base.txt:2-3`). The probe never computed an integer power. Rejected.
   - (b) `^(self, b:AnyIntegral):RR32 = narrow((asFloat(self))^b)`. It calls `Float`'s `^(self, b:AnyIntegral)` on `Float$Pow` (`FortressBuiltin.fss:160-161`), which reads the exponent with `getFloat()`, then `narrow`. It computes `(float) Math.pow((double) x, (double) b)`, which is exactly what `RR32$Pow` computes for an `RR32` exponent, and it does so in Fortress, with no Java. Taken.
   - (c) As (b), with `RR32.java`'s `Pow` changed to read its exponent with `getFloat()`. That is one Java line and a rebuild, on a native shared with `^(self, b:RR32)`. Rejected as larger than (b) for the same result.
   - (d) Keep a float-exponent form by narrowing the `Number` form's domain to `RR64` (`^(self, b:RR64):RR64`), and add `^(self, b:QQ):RR64`. These are two more declarations for what walk's coercion already gives: `a^2.5` converts `a` to `RR64` and runs `RR64`'s `^(self, b:Number)` (`probes/expr-all/XAll.edit.txt:4-5`). That is the specification's example's order, an `RR32` with an `RR64` by `RR64`'s declaration. Rejected as not needed.

   The base's `^(self, b:Number):RR64 = self^asFloat(b)` never worked. It parses as `(self^asFloat)(b)` and ends the run with "Failed to find any matching overload" for `a^2.5` and `a^(1/2)` (`probes/expr/XPowFloatLit.base.txt:2-3`, `XPowQQ.base.txt:2-3`). With (b):
   - `a^2.5` and `a^(1/2)` answer by `RR64`'s `^`: 2.7556759606310752 and 1.224744871391589, each an `RR64`;
   - `a^2` and `a^w` answer `RR32`: 2.25 and 3.375;
   - `a^b` and `a^f` answer as before.
3. **`RR64` names `RR32` in its `excludes` clause.** The rule for object types already makes `RR32` exclude every type that is not its supertype (`Specification/basic/types-vals-vars.tex:256-258`), and walk implements it (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:214`, `:236-257`). The library states sibling exclusions on both sides where it can (`RR64 excludes { QQ, AnyIntegral }`, `QQ excludes { RR64, AnyIntegral }`); an object cannot, so `RR64` states it. The alternative, omitting it, changes no answer. Taken, for the library's own habit and the probe's measured shape.
4. **`Number`'s `=` finds an `RR32` by one more `typecase` clause in each arm.** Without it an `RR32` falls to `exactValue`, which answers `Ratio(0, 0)` for a float (`Library/FortressLibrary.fss:376-385`), so `narrow(1.5) = 1.5` would compare 0/0 with 3/2. The alternatives were a union-typed clause, which the library uses nowhere in a `typecase`, and routing through coercion, which a `typecase` does not apply. Taken: the probe's two clauses.
5. **Where `ℝ32` enters the specification, and its words.** See `explorations/compile-ladder/rung-rr32-sibling/decision-record.md`, section 4.

The shape of the result, checked under walk on the edit and against the base (`probes/expr/summary.txt` tabulates both). The edit is `probes/expr-all/XAll.edit.txt`: 40 expressions in one program, `rc=0`. The base is `probes/expr/X*.base.txt`: one program per expression, since many end the run.

| expression (`a`, `b : RR32` = 1.5, 2.5; `f : RR64` = 3.0, a `Float`; `z : ZZ64` = 3) | base | edit |
|---|---|---|
| `typecase a of RR64 => ...` | an `RR64` | not an `RR64` |
| `a + b`, `a / b`, `SQRT a`, `a MIN b`, `(a MINMAX b)` low | `RR32` 4.0, 0.6, 1.2247449, 1.5, 1.5 | `RR32` 4.0, 0.6, 1.2247449, 1.5, 1.5 |
| `a + 2.5`, `a + f`, `a + 2`, `a MIN 2.5`, `a MIN f`, `a MAX 2.5`, `a MINMAX f` | `InterpreterBug` (row 435) | `RR64` 4.0, 4.5, 3.5, 1.5, 1.5, 2.5, (1.5, 3.0) |
| `2.5 + a` | `RR64` 4.0 | `RR64` 4.0 |
| `a = 1.5`, `a = f`, `a < 2.5`, `a < f`, `a CMP 2.5`, `a CMP f` | `InterpreterBug` (row 435) | true, false, true, true, `LessThan`, `LessThan` |
| `a = b`, `f = a`, `2.5 < a` | false, false, false | false, false, false |
| `a^2`, `a^z`, `a^2.5`, `a^(1/2)`, `a^b`, `a^f` | `RR64` 2.25; `InterpreterBug`; overload failure; overload failure; `RR32` 2.755676; `RR64` 3.375 | `RR32` 2.25; `RR32` 3.375; `RR64` 2.7556759606310752; `RR64` 1.224744871391589; `RR32` 2.755676; `RR64` 3.375 |
| `x: RR64 = a` | `RR32` 1.5 (no conversion: a subtype) | `RR64` 1.5 |
| `gen(a, f)`, with `gen[\T extends Number\](x:T, y:T):T = x` | `RR32` 1.5 (`T` = `RR64` by subtyping) | `RR64` 1.5 (`T` = `RR64` by answer 8's promotion, batch N's rung K) |
| `sin(a)`, `narrow(a)`, `|a|`, `floor(a)`, `round(a)`, `a.zero` | the same as the edit | `RR64` 0.9974949866040544, `RR32` 1.5, `RR32` 1.5, `RR32` 1.0, `ZZ64` 2, `RR32` 0.0 |

## 6. What the specification settles, and the passages that settle it

- **An `RR32` value is not an `RR64` value.** `Specification/basic/types-vals-vars.tex:536` (the numeric types are mutually exclusive); `Documentation/Specification/Prose/Language/types.tick:977-978`.
- **Mixed and same-type arithmetic.** An `RR32` combined with an `RR64` is computed by `RR64`'s declaration after a coercion from `RR32`, and two `RR32` values by `RR32`'s own declaration where the library has one: `Specification/basic/conversions-coercions.tex:904-912`, the example's bottom-up analysis. The example's `widens` is deferred by answer 8.
- **An `RR32` converts where an `RR64` is declared.** The coercion contexts: `Specification/basic/conversions-coercions.tex:117-120`.
- **A generic call over an `RR32` and an `RR64` takes `T` = `RR64`.** `Specification/basic/inference.tex:83-93`.
- **Powers, `MIN`/`MAX` and comparisons of an `RR32` answer.** `Specification/basic/operators/opr-overview.tex:70-72`, `:243-244`, `:281-283`.
- **The conversion from `RR64` into `RR32` stays explicit.** Answer 8, and `Specification/basic-lib/numbers.tex:46`.

The specification is silent on which operators a library declares on `ℝ32`: the example's declarations "might look something like this" (`conversions-coercions.tex:876`). The one library's are those its component already defined; the compiled prelude declares none (section 10).

## 7. The comparison

The method is rung F's (`explorations/compile-ladder/rung-flat-tower/REPORT.md`, section 11), with its two scripts copied unchanged into this rung's directory: `count-run.sh` and `compare-normalised.py`.

**What ran.** Every file of `ProjectFortress/tests/` except the rung's new tests: 440 files, `explorations/compile-ladder/rung-rr32-sibling/count-list.txt`. Each ran under walk, one JVM per test, with private caches, four at a time, in three passes on this worktree:
- **Base A** (`probes/passes/machine-baseA.txt`, `pass-baseA.txt`), on the base before any library edit.
- **The edit** (`probes/passes/machine-edit.txt`, `pass-edit.txt`), on the tree of `e3146da6e`, whose files the list reads are those of the final tree. It ran `count-list-edit.txt`, the same list with `XXXRR32MixedRungF.fss` renamed `RR32MixedRungF.fss`. That log is copied under the old name for the comparison. A first edit pass was stopped after about eight minutes, when a syntax error in the power's body showed; the body was corrected to `RR64`'s parenthesised form and the pass began again.
- **Base B** (`probes/passes/machine-baseB.txt`, `pass-baseB.txt`). `baseB-swap.sh` put the base's versions of the rung's files back in place for it and restored the edit afterwards. Every file the list reads was checked identical to the base before the pass (`git diff --quiet 382b9fe7f`).

**How they were compared.** `compare-normalised.py` masks three things: Java line numbers in stack frames, identity hashes, and Fortress positions in the files the edit changed, mapped through the edit's line map. `XXXInheritedOverload.fss` was to be listed as unstable (row 430). It printed the same order in all three passes, and so did `XXXCoercionTupleOverloadRungC.fss`.

**Result** (`probes/passes/compare-normalised.txt`): `tests 440 same 407 normalised 9 changed 6 unstable 18 missing 0`. The exit codes (`probes/passes/rc-distribution.txt`):
- base A and base B: 347 `rc=0`, 86 `rc=1`, 7 `rc=255`;
- the edit: 347 `rc=0`, 85 `rc=1`, 1 `rc=124`, 7 `rc=255`.

**Normalised, 9.**
- Eight whose library positions moved: `XXXEmptyGroupSumRungF`, `XXXFnRenderRungS`, `XXXIntegerMaxNumRungM`, `XXXRangeBoundsRungO`, `XXXRangeEmptyHashRungO`, `XXXRangeWideRungJ`, `XXXTupleSevenRungS` and `XXXUnwrittenSumRungF`. The edit moved positions by +3 in `Library/FortressLibrary.fss` below `:366` and by +1 in `FortressBuiltin.fss` below `:203`.
- `taskTrace3`: identity hashes.

**Unstable, 18.** Base A and base B differ for each:
- the 17 of rung F's list: `ArrayListQuick`, `CovCollTest`, `HeapTest`, `PureListQuick`, `QuickCheckTest`, `ShuffleTest`, `SkipListTest`, `TimingTests`, `TreapTest`, `WordCountSmall`, `abortBlock`, `buffons`, `nestedTransactions1` to `4` and `quicksortTest`;
- `taskTrace2`, whose two base passes differ in identity hashes and which equals both once normalised.

`unstable-check.py` is rung F's, with its path mask set to this rung's work directories (`probes/passes/unstable-check.txt`). It finds 15 of the 18 within the base variation. It reports `QuickCheckTest`, `TreapTest` and `abortBlock` outside, and each was looked at by hand (`probes/passes/unstable-outside.txt`); all three have `rc=0` in all three passes, and none of the differences comes from the edit:
- **`QuickCheckTest`**: its statistics have a random number of lines, so later lines fall at different positions. Its `RR32` generator prints single-precision values in all three passes.
- **`TreapTest`**: its single-name lines are random picks.
- **`abortBlock`**: it prints one line per worker, a random number of times, interleaved.

**Changed, 6**, each captured under `probes/changed/` (base A, base B, edit), each with its cause:
1. **`XXXRR32MixedRungF`, now `RR32MixedRungF`**: `rc` 1 → 0. Row 435's expected failure passes. Base: "InterpreterBug: getRR32 not implemented for FFloatLiteral"; edit: `REACHED`, `PASS`. Cause: the edit, as intended; the file is promoted.
2. **`XXXArrayLiteralArgRungC`**: `rc` 1 → 1. Its expected failure's message lists the overloads of `-`, and three entries change:
   - `RR32`'s own `-` is `(RR32,RR32)`, where it was `(RR32,RR64)`;
   - `RR64`'s `-` is listed with a `self` type whose comprised set no longer names `RR32`;
   - `AdditiveGroup[\RR32\]`'s `-` is a new candidate.

   Cause: the retyped declarations and `RR32`'s own `AdditiveGroup`. The verdict is unchanged. The planner's probe predicted this change (NOTES.md, section 6).
3. **`XXXRationalUnorderedRungP`**: `rc` 1 → 1. Its message cites `numbers.tex:372-376`, where it cited `:365-369`. Cause: the re-anchoring (section 8).
4. **`XXXRoundNearTieNumeral`**: `rc` 1 → 1. Its message cites `numbers.tex:462-464`, where it cited `:455-457`. Cause: the re-anchoring.
5. **`XXXQQPowerExponent`**: `rc` 1 → 1. After normalising, the one difference is the script's `REWRITTEN` mark on the position of its own line 8. The re-anchoring rewrote that line's message, and the script marks a rewritten line so that it never hides a difference there. Raw, its library positions move by +3. Cause: the re-anchoring.
6. **`ReflectiveQuickCheckTest`**: `rc` 0 → 124, the pass script's 600-second limit. The test took 581 s in base A and 173 s in base B; the edit pass ran it from 11:07:52 to 11:17:53, with the box's one-minute load near 24 in that interval. Rerun on the edit with the limit at 1800 s, it prints base A's output, `rc=0`, in 261 s (`probes/rqc/ReflectiveQuickCheckTest.edit-long.txt`). Cause: the box's load, not the edit. The verdict is unchanged, so by rung D's rule this is not a stop.

No team test line changed. The rung edited no team test, and the six re-anchored files are the revival's own tests.

**Against the prediction.** The planner's probe predicted, on 414 files, 387 same, 7 normalised, 17 unstable and 3 changed (NOTES.md, section 6). On 440 files:
- of the three predicted changes, two appear: row 435's expected failure passes, and `XXXArrayLiteralArgRungC`'s candidate list changes. The third, `XXXCoercionTupleOverloadRungC`'s order, is row 430's run-to-run variation and did not flip this time;
- the other four changes are the three re-anchored messages and one timeout;
- `testRR32` passes, as the probe's second shape predicted.

## 8. The re-anchoring

The callout inserts seven lines after `Specification/basic-lib/numbers.tex:49`, so every later line of the chapter moves by 7; `:31` and `:43` are revised in place.

The tool is `explorations/compile-ladder/rung-rr32-sibling/probes/reanchor/reanchor.py`: rung P's `reanchor-own.py`, restricted to the two chapters this rung edits. It maps unchanged lines from `git show 382b9fe7f:<chapter>` to the tree and changes only the digits. It found 39 citations of `numbers.tex` and `changes.tex` in the three test directories (`probes/reanchor/reanchor-apply.txt`):
- 35 moved;
- 4 cite a line revised in place, `numbers.tex:43`: twice in `ProjectFortress/tests/XXXNumeralFloatRungP.fss:9`, `:14`, and twice in this rung's own test;
- 0 unmapped.

The moved ones, each with the same text at the old and the new lines:
- `ProjectFortress/tests/RoundHalfEvenRungR.fss`: 20 messages, `:455-457` → `:462-464` and `:455-456` → `:462-463`;
- `XXXRoundNearTieNumeral.fss`: 4;
- `XXXRadixTenPointNumeral.fss`: 2;
- `XXXQQPowerExponent.fss`: 2, `:336-341` → `:343-348`;
- `XXXRationalUnorderedRungP.fss`: 4, `:365-369` → `:372-376` and `:375-379` → `:382-386`;
- `FlatTowerRungF.fss`: 2, `:362-363` → `:369-370`.

No assertion changed, and all six files are the revival's tests. No test cites a line of `changes.tex`. `numbers.tex:43` still says what the two `XXXNumeralFloatRungP` messages cite it for: the coercion of integer numerals into `ℝ64`.

## 9. The checker count

- **Before.** The last landed gate's table, `explorations/compile-ladder/climb-batch-N/gate/checker-count.txt`. `git log 3fb0cd8c1..382b9fe7f -- Library/ ProjectFortress/` prints nothing, so the base has not changed under it (POSITIONS 2026-09-28, on rungs re-running measurements).
- **After, on the final edit.** `explorations/compile-ladder/rung-rr32-sibling/probes/checker-count-postedit.txt`, full output `probes/checker-count-postedit-run.txt`.

The two tables are identical: `FortressBuiltin 0`, `FortressLibrary 132`, `RangeInternals 18`, `#total 75`, `#locations 62`, `#crash none`. No error in the full output names `RR32` or `RR64`. The FortressBuiltin api, which the stage reaches, gains 48 declarations and a new header without an error. The manifest needs `expectedCheckerCount` 75 and no crash line.

## 10. Walk against the compiled run

The compiled path uses its own prelude, which this rung leaves unchanged. There, `trait RR32 extends { Number, Equality[\RR32\] } excludes { ZZ64, ZZ32, RR64 }` declares only `coerce(x: FloatLiteral)`, and `RR64` declares `coerce(x: RR32)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:992-994`, `:933`). The probes compile from a private library cache (`probes/comp/RR32Comp.comp.txt`, `RR32Comp2.comp.txt`, `RR32Comp3.comp.txt`). They ran on the base; the compiler library is the same on the edit.
- **Agreement with walk on the edit.**
  - `a` is an `RR32` and not an `RR64` in a `typecase`.
  - `a + 2.5` and `a + f` answer `RR64` 4.0 and 4.5.
  - `x: RR64 = a` and an `RR64` parameter convert, giving `RR64` 1.5.
  - `a < f` and `a < 2.5` are true.
  - `a MAX f` is `RR64` 3.0.
  - `gen(a, f)` is `RR64`, and `gen(a, b)` is `RR32`.
- **A divergence the specification is silent on.** `a + b`, `a / b` and `a MIN b` answer `RR64` compiled and `RR32` under walk. The prelude's `RR32` declares no arithmetic, order or `MIN`/`MAX`, so both operands convert to `RR64`. The specification is silent on the declarations a library carries on `ℝ32` (section 6), so this is home 3 (section 11, row 529, 520 provisionally).
- **A crash.** `a = b`, `a = 1.5` and `a = a` compile clean and die with `java.lang.AbstractMethodError`, because `FRR32` implements no `=` for the prelude's `Equality[\RR32\]` (`probes/comp/RR32CompEq.comp.txt`, `probes/comp/XXXRR32EqualityRungV.comp.txt`). No reading of the specification gives a clean compile and then a crash (batch N's ruling on rows 447 and 505), so this is home 2 (section 11, row 528, 519 provisionally).

**The ladder subset.** The two files whose first error in the baseline ladder names `RR32` are `ProjectFortress/tests/testRR32.fss` and `XXXextendFloatLiteral.fss` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`). They were run through the compile path by `repair-r1-atomic-static/run-subset.sh`, copied as `explorations/compile-ladder/rung-rr32-sibling/run-subset.sh` with `env-noclean.sh` in place of `env.sh`, whose `rm` of the Rats directories would have removed rung E's in flight. The ladder root was private and seeded from this rung's compiled library cache.

On the edit, both still stop in the front end (`ladder/results.tsv`, `ladder/raw/tests/*.compile.txt`):
- `testRR32` stops on the prelude's missing rounded operators, ten "Operator ... is not defined", where the baseline of 2026-09-19 stopped first on `narrow`, which the prelude has declared since `d98024425`;
- `XXXextendFloatLiteral` stops on the prelude's `FloatLiteral.asRR32`.

The compiled world reads none of the rung's files: neither capture names `FortressBuiltin` or `FortressLibrary`. So the base run is the same by construction and was not repeated, and no ladder file can move with this rung.

## 11. Every defect measured, and its home

1. **Row 435, `RR32`'s natives reading a narrower argument than they declare.** An `RR32` with any other number, by `+`, `-`, the comparisons, `MIN`, `MAX` and the rest, ends the run with an `InterpreterBug`. Repaired. Home 1: `ProjectFortress/tests/RR32SiblingRungV.fss:48-58` and `:66-75`, and the promoted `RR32MixedRungF.fss`.
2. **`RR32` below `RR64`, a value of both types** (batch 6's review, finding 3). Repaired. Home 1: `RR32SiblingRungV.fss:32` (`floatKindV(a)`), `:61` (`x: RR64 = a` converts) and `:63` (the generic call's promotion).
3. **`RR32`'s `ZZ64` power, on a native that reads its exponent as an `RR32`.** `a^w` for a `ZZ64` `w` ends the run with "getRR32 not implemented for FLong" (`probes/expr/XPowZZ64.base.txt:2-3`). Repaired by decision 2 (b). Home 1: `RR32SiblingRungV.fss:42`. A new row, opened and closed (row 530, 521 provisionally, together with 4).
4. **`RR32`'s `Number`-exponent power, mis-parsed.** `self^asFloat(b)` parses as `(self^asFloat)(b)`, so `a^2.5` and `a^(1/2)` end with "Failed to find any matching overload" (`probes/expr/XPowFloatLit.base.txt:2-3`, `XPowQQ.base.txt:2-3`). Repaired by removal: the float and rational exponents now reach `RR64`'s `^` by coercion. Home 1: `RR32SiblingRungV.fss:54`. The same row as 3.
5. **Compiled: the prelude's `RR32` has no `=`.** `a = b` compiles clean and dies with an `AbstractMethodError` (section 10). Deferred, because the prelude is not this rung's file and leaves at the switch-over; the specification settles it, since a program the checker accepts does not die in the JVM and `=` on two `RR32` values answers a `Boolean`. Home 2 is three files in `ProjectFortress/library_tests/`, in the form of batch N's pairs (`ProjectFortress/compiler_tests/XXXNumeralBeyondWidthMax.test`, `NumeralBeyondWidthMaxLink.test`):
   - the program, `XXXRR32EqualityRungV.fss`;
   - its run test, `XXXRR32EqualityRungV.test` (`run`, `run_out_contains=REACHED`); As the rung wrote it, the key was `run_out_contains=PASS`, which the harness fails outright, because a check that is not met fails a run test before `shouldFail` is read (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:583-590`); the gate went red on it, and climb batch 6.5b's review corrected it (`explorations/compile-ladder/climb-batch-6.5b/JUDGE-review.md`).
   - its link test, `RR32EqualityRungVLink.test` (`link`).

   It is this rung's first `XXX` file, and it was shown going red on a deliberate local fix:
   - The fix added `opr =(self, other:RR32): Boolean = jFloatToDouble(self) = jFloatToDouble(other)` to the prelude's `RR32` (`probes/comp/local-fix.patch`). The compiled library was rebuilt into a private cache, and the fix was undone at once with `git checkout`.
   - With the fix, the program prints `REACHED`, `PASS`, `rc=0` (`probes/comp/XXXRR32EqualityRungV.localfix.txt`). The run test's `run_out_contains=REACHED` is met and the run exits 0, so the harness reports 'Did not see expected failure' and the suite goes red (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:932`, `:583-590`), shown through the harness at climb batch 6.5b's review (`explorations/compile-ladder/climb-batch-6.5b/repair-review-tests/junit-localfix.txt`).
   - Without the fix, the program prints `REACHED`, then the `AbstractMethodError`, `rc=1` (`probes/comp/XXXRR32EqualityRungV.comp.txt`). Through the harness, placed, the link test is `OK` and the run test 'Saw expected failure (Exit code != 0)' (`explorations/compile-ladder/climb-batch-6.5b/repair-review-tests/junit-placed.txt`).

   Row 528 (519 provisionally).
6. **Compiled: `RR32` with `RR32` answers `RR64`** (section 10). The specification is silent on the declarations a library carries on `ℝ32`, so this is home 3: the probes `probes/comp/RR32Comp.comp.txt` and `RR32Comp3.comp.txt`, and row 529 (520 provisionally). It is at home 3 because the specification is silent, not because home 3 was easier. It resolves at the switch-over, when the compiled path takes the one library's `RR32`.
7. **`String`'s `avFlat`, declared `RR32`, answers an `RR64`.** `Library/String.fss:508` reads `getter avFlat(): RR32 = asFloat(ssize) / asFloat(numFlat)`. Walk returns `8.0 : RR64` (`probes/avflat/AvFlat.edit.txt:2`; on the base, `probes/avflat/AvFlat.base.txt:2`). This rung's grep for every `RR32` site found it.
   - Why the declaration is ill-typed: the body is an `RR64`, and no coercion converts an `RR64` into an `RR32` (`Specification/basic-lib/numbers.tex:46`). The body of a functional with a declared return type is a coercion context (`Specification/basic/conversions-coercions.tex:121-122`), and walk does not check a declared return type (row 387).
   - Deferred, because `Library/String.fss` is not this rung's file (any other library declaration is a stop). The specification settles it.
   - Home 2: `ProjectFortress/tests/XXXStringAvFlatRungV.fss`, which asserts that the getter's value is an `RR32`. It fails today (`probes/avflat/XXXStringAvFlatRungV.edit.txt`) and passes once the body is written `narrow(asFloat(ssize) / asFloat(numFlat))`.
   - Row 531 (522 provisionally).

## 12. What must stay green, and the microGPT checks

- **Every interpreter test's verdict** other than the rung's own is kept. The one `rc` that changed besides row 435's promotion is `ReflectiveQuickCheckTest`'s timeout under load, whose rerun passes with base A's output (section 7).
- **The named tests** (`probes/passes/stay-green.txt`): `testRR32`, `RoundHalfEvenRungR`, `FlatTowerRungF`, `IntegerMinMaxRungM` and `InferCoercionRungK` each have `rc=0` in all three passes, with the edit's output equal to base A's.
- **The two microGPT checks**, which name no `RR32`, pass 40 of 40 on the edit (`probes/mg/mg-edit-MicroGptFlatCheck.txt`, `mg-edit-MicroGptAplCheck.txt`; `mg-run.sh`, rung F's, each from an empty cache at `FORTRESS_THREADS=1`). Their printed values, with machine lines, timings and Rats paths masked, are identical to rung M's landed captures (`probes/mg/mg-compare.txt`, `diff rc=0` twice).
- **The new tests** on the edit:
  - `RR32SiblingRungV` prints `PASS` (section 2);
  - `XXXStringAvFlatRungV` fails as expected (`probes/avflat/XXXStringAvFlatRungV.edit.txt`);
  - `XXXRR32EqualityRungV` compiles and fails as expected on the compiled path (`probes/comp/XXXRR32EqualityRungV.comp.txt`).
- **The specification builds** with `./ant genSource` and `./ant tex` in `Specification/fortress/`: 639 pages, with no undefined reference in the last `pdflatex` pass (`probes/build/edit-genSource.txt`, `edit-tex.txt`; the new passages as rendered, `probes/build/edit-pdftotext-excerpt.txt`). The build's generated example files were removed from the tree afterwards. No base build was made to diff against.

## 13. Stops, and what comes back to Pavol

The rung met none of the stops the record reserves for V (`probes/stops.txt`):
- **A changed walk output its comparison does not account for.** Each of the six has its cause (section 7).
- **A team test line changed other than one that asserts `RR32` below `RR64`.** None changed.
- **A coercion beyond `RR64`'s from `RR32`.** None was added.
- **The specification's sentence stating more than the landed library.** The passage states that `ℝ32` is a sibling under `Number` and that `ℝ64` coerces from it, and both have landed (`decision-record.md`, section 3).
- **A file another rung of this run owns.** None. `Library/FortressLibrary.fss` is shared with rung E on disjoint declarations, as the record plans.

**What comes back to Pavol with the landing:** the six changed outputs with their causes (section 7). No team test line was restated.

**Points this rung does not settle** (`probes/for-pavol.txt`):
- Row 528, the compiled prelude's `RR32` without `=`: repair it now, with the measured one line in `CompilerBuiltin.fss`, or leave it to the switch-over.
- Row 531, `String`'s `avFlat`: a one-line library repair outside this rung's files.

**Decisions this rung took, each with its alternatives in section 5:**
- the api's operators, taking the probe's second shape;
- the exponent overloads, candidate (b);
- `RR64` naming `RR32` in its `excludes` clause;
- `Number`'s `=`;
- the placement of row 528's expected failure in `library_tests/`, since `compiler_tests/` is rung E's in this run, and of row 531's in `tests/`: two test files the record's list for V did not name, required by the batch's rule that every defect measured gets a home.

## 14. Machines and timings

Every pass and probe ran on this box: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`. Each capture is headed by its load (`probes/passes/machine-*.txt`, and the first line of each probe capture). Rung E ran its own passes and microGPT checks on the same box at the same time, and the load stood between 8 and 36 through this rung's passes:
- base A took 47.5 minutes (09:55:30 to 10:43:01, load 4.00 at its start);
- the edit pass took 74.5 minutes (10:54:05 to 12:08:33, load 12.05 at its start);
- base B took 25.3 minutes (12:14:58 to 12:40:13, load 9.07 at its start).

The microGPT checks took 4761 s and 4792 s (the Flat and APL checks).

## 15. What this rung inherited

Nothing. The branch held no commit beyond the base `382b9fe7f`, and the worktree held no edit, when the rung began.
