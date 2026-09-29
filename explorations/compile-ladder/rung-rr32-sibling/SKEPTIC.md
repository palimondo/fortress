# Skeptic, first judgement: rung V, `RR32` a sibling of `RR64` (`rung-rr32-sibling`)

*Gather's note (climb batch 6.5b, 2026-09-29): the rows this file numbers provisionally are the ledger's 528 (519, the compiled prelude's `RR32` without `=`), 529 (520, the compiled `RR32` with `RR32` answering `RR64`), 530 (521, the integer-power natives) and 531 (522, `String`'s `avFlat`); the recommended row on `ReflectiveQuickCheckTest`'s run time is 532. The `numbers.tex` citations of `FACTS.md` named in section 8 are re-anchored at the fold.*

**Verdict: approved, with three required corrections** (section 12). The claim holds. `RR32` is a sibling of `RR64` under `Number` in the one library. `RR64` converts from it by `coerce(x: RR32)`. `RR32`'s natives take the `RR32` they read, which closes row 435. The recorded failure exists and is honest. The corrections are to the record's words, not to the library.

I did not write this work. I read the diff line by line (`git diff 382b9fe7f...HEAD`), re-ran the rung's gated tests on the edit and on a copy of the base, and wrote 11 probe programs of my own. Each ran under walk on the edit, and where it matters on the base; the construct-level ones also ran on the compiled path. They are under `explorations/compile-ladder/rung-rr32-sibling/probes/skeptic/`.

Machine for every capture: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`. Each capture's first line gives its load; the load was 4.58 when this review started.

## 1. How the probes ran

- `probes/skeptic/sk-walk.sh` runs one program under walk, from an empty private cache, on one of two trees:
  - the rung's tree (`edit`);
  - `tmp/skbase`, a `git archive` of the base's `bin/`, `Library/` and `ProjectFortress/LibraryBuiltin/`, with this worktree's `build/` and `third_party/` linked in (`base`).
- The base tree needs `FORTRESS_AUTOHOME` set to it. Without it the interpreter resolves the linked `build/` to the worktree, and reads the edit's library (`ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java`, `fortressAutoHome`, the `getCanonicalPath` of the class path's `../ProjectFortress`).
  - My first base run of `SkOps` did exactly that, and printed the edit's answers.
  - The script now sets it. Every base capture committed here was taken after the fix, and each shows row 435's `InterpreterBug` or the base's own values where the edit differs.
- `probes/skeptic/sk-comp.sh` compiles and runs one program on the compiled path. It uses a private cache seeded from `tmp/sk-libcache`, which `probes/skeptic/sk-libcache.sh` built in the brief's library order (`probes/skeptic/sk-libcache-build.txt`, 12:58 to 13:00 UTC). The compiled world reads none of the rung's files, so that cache serves the edit and the base alike.

## 2. The provenance block

I checked every citation of the five kinds of line with `sed -n`. There are four `deviation:` lines. All hold:
- **problem:**
  - `probes/expr/XAddLit.base.txt:2-3` is "getRR32 not implemented for FFloatLiteral".
  - `ProjectFortress/tests/XXXRR32MixedRungF.fss:8` at the base and `RR32MixedRungF.fss:8` are `a = asFloat(narrow(1.5) + 2.5)`.
- **spec:** all three passages say what the block says:
  - `Specification/basic/types-vals-vars.tex:536` is "These types are mutually exclusive; no value has more than one of them".
  - `Documentation/Specification/Prose/Language/types.tick:977-978` has the same sentence.
  - `Specification/basic/conversions-coercions.tex:904-912` is the example's bottom-up analysis.

  None of the three is an api rendering.
- **precedent:**
  - `Library/FortressLibrary.fsi:291-378` is `RR64`'s header, coercions and operators.
  - `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:435` is `coerce(x: RR32)`.
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:131-164` is `NN32`'s api on the rung's tree.
- **deviation:**
  - `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:294-298` is `Pow extends FF2F`, and `:94-99` is `FF2F`, which reads `y.getRR32()`.
  - `conversions-coercions.tex:895` is `coerce(x: ℝ32) widens`.
  - `Library/FortressLibrary.fss:391` is `coerce(x: ZZ32) = asFloat(x)`.
  - `types-vals-vars.tex:256-258` is the object-trait exclusion rule.
  - `FortressBuiltin.fsi:69-116` are the 48 lines.
- **historical:** it names the six files of the 2012 tree that the diff edits, and nothing is missing. The other edited files are the revival's own tests.

## 3. The recorded failure

- `probes/test/RR32SiblingRungV.base-prefail.txt` holds the test as committed in `76f4829b3`. I checked that commit against the base: it changes no library file, only the tests, the two specification files and `library_tests/` (`git diff --stat 382b9fe7f 76f4829b3`).
- The capture prints "FAIL: J7/0:an RR64 =/= J7/0:an RR32; types-vals-vars.tex:536", `rc=1`.
- I re-ran the final test on my base tree. It fails the same way (`probes/skeptic/gated/RR32SiblingRungV.base.txt:2`, `rc=1`). On the edit it prints `PASS` (`gated/RR32SiblingRungV.edit.txt:2`).
- The promoted `RR32MixedRungF` shows the same contrast: the base ends with "getRR32 not implemented for FFloatLiteral" (`gated/RR32MixedRungF.base.txt:3-4`), and the edit prints `PASS`.

Two cases were added after the failure was recorded: `a^w` and `a^2.5`. Each has its own base capture, which ends the run (`probes/expr/XPowZZ64.base.txt:2-3`, `XPowFloatLit.base.txt:2-3`). That is disclosed in REPORT section 2, and it is acceptable.

## 4. The diff against the specification

The edit does what the report says, and only that:
- **`RR32`'s header.** It is `RR64`'s own, at `RR32` (`FortressBuiltin.fsi:47-48`, `.fss:203-204`).
- **The 32 retyped declarations.** Thirty are natives, and `CMP` and `MINMAX` are the other two. Each now declares `b:RR32`, the argument its native reads. I counted the natives in `RR32.java` that read `getRR32()` on their argument through `FF2B`/`FF2F`, and matched them against the component: the count is 30.
- **`Number comprises`, `RR64 excludes`/`comprises` and the one new `coerce`.**
- **The two `typecase` clauses in `Number`'s `=`** (`Library/FortressLibrary.fss:367`, `:370`).
  - Without them, `a = f` falls to `exactValue`, which answers `Ratio(0, 0)` for a float.
  - I grepped the library for every other `typecase` clause on `RR64` that used to catch an `RR32` as a subtype. There are two, both in `Number`'s `=`, which the rung extended. There are also two witness clauses, `() -> RR64 =>` at `:3154` and `:3171`, beside which `() -> RR32 =>` already stands, and one in `Library/ReflectiveQuickCheck.fss:153` (`theType[\RR64\]`), beside `theType[\RR32\]` at `:152`. Nothing else.
- **The api's 48 declarations.** They follow the planner's probe's second shape line for line (`explorations/compile-ladder/plan-6.5/probes/rr32/rr32-sibling-api.patch`).
- **The exponent.** The edit's one departure from the probe's shape is `opr ^(self, b:AnyIntegral):RR32 = narrow((asFloat(self))^b)` in place of the probe's `builtinPrimitive("...RR32$Pow")`.
  - The probe's form reads the exponent with `getRR32()`. `probes/expr/XPowZZ64.base.txt:3` shows that the base's `ZZ64` form did exactly that.
  - I checked the mis-parse claim for the base's `self^asFloat(b)`. The overload failure in `probes/expr/XPowFloatLit.base.txt:2-3` lists `asFloat`'s own overloads as the exponent's value, which is `(self^asFloat)(b)`. My own first probe fell into the same parse with `a^big(3)` before I parenthesised it, which confirms that the reading is the parser's.

The specification is applied rightly:
- **Mutual exclusion.** `types-vals-vars.tex:536` excludes an `RR32` that is also an `RR64`.
- **Mixed operands.** `conversions-coercions.tex:904-912` computes an `RR32` with an `RR64` by `RR64`'s declaration after a coercion from `RR32`, and two `RR32` values by `RR32`'s own.
- **The coercion contexts.** They are `:115-122`: variable declarations, arguments, and bodies with declared return types. Walk converts at the first two and at assignment. It does not convert at the third (row 387; section 9).
- **`widens`.** Its deferral follows answer 8.
- **The integer power.** With `MultiplicativeRing[\T\]`'s `^(self, other:AnyIntegral): T` (`Library/FortressLibrary.fss:354-355`), an `RR32`'s integer power answers an `RR32`, which the edit gives for every integral type of exponent (section 10).

## 5. The precedent search

- The worker found the right precedents and followed them:
  - `RR64`'s header, and the api of `RR64` and `NN32`;
  - the one library's `coerce(x: ZZ32) = asFloat(x)` form;
  - `RR64`'s `(asFloat(self))^b` composed with `narrow`;
  - rung M's `MIN`/`MAX`/`MINMAX` at the type's own type.
- Where the edit's precedent repaired a defect, the sites of that defect were counted, not only the edit's own:
  - the base had 31 declarations in `RR32`'s component whose native reads narrower than declared, and all 31 were retyped or replaced;
  - `Float`'s natives declare `b:Float` and read `getFloat()`, which every number value implements;
  - `git grep` finds the operator-on-bare-name mis-parse at one site.
- I found no device the rung invented where the library already has one.

One precedent claim is wrong in its history. It is correction 1 (section 12).
- REPORT section 4 and the structured precedent search attribute the compiler library's `coerce(x: RR32) = jFloatToDouble(x)` to "Chase's cut of the subtype (`6896886fb`, 2009-08-31)". The Appendix I entry says the same in the specification (`Specification/appendices/changes.tex:1740-1743`), as does `decision-record.md:16`.
- Chase's commit made `RR32` a sibling and added no coercion. It declares `trait RR32 extends Number` and `trait RR64 extends Number comprises {FloatLiteral}`, with no `coerce` line in either file, and its message ends "this would be a good time to get coercion working" (`probes/skeptic/coerce-history.txt`).
- The earliest version of `CompilerBuiltin.fsi` that history still holds with `coerce(x: RR32)` is `26718e298` (2011-12-06). That commit adds the whole file, because the conversion cut the file's parent link (`research/authorship.md`). The coercion therefore dates from some time between 2009-08-31 and 2011-12-06, and the record cannot say when.

## 6. The test

`ProjectFortress/tests/RR32SiblingRungV.fss` exercises the defect. It carries every case the rung's section names:
- the `typecase`;
- `RR32` with `RR32`, both by an algebra operator and by `/` and `SQRT`;
- `RR32` with an `RR64`, a float numeral and a `ZZ32`;
- an `RR32` bound to an `RR64` variable, and passed to an `RR64` parameter;
- `=`, `<` and `CMP` against an `RR64`.

Its assertions test by value and by run-time class, through one helper, as `IntSemanticsRungI.fss` does.

It has one comment line (`:4`), pointing at the REPORT, and no provenance essay. So do `XXXStringAvFlatRungV.fss:4` and `library_tests/XXXRR32EqualityRungV.fss:4`.

The messages cite passages that I opened and that say what they are cited for: `inference.tex:83-93`, `opr-overview.tex:70-72` and `:243-244`, `FortressLibrary.fsi:285-288`, and `conversions-coercions.tex:117-120`.

## 7. The competing-declaration grep

**The library and the tests.** `git grep -nE '(opr|coerce).*RR32'` over `Library/`, `ProjectFortress/LibraryBuiltin/`, `ProjectFortress/tests/`, `compiler_tests/`, `library_tests/`, `explorations/apl/` and `explorations/run-c4/` finds:
- `RR32`'s own declarations;
- `Float`'s `^(self, b:RR32):RR64` (`FortressBuiltin.fss:156`), which takes an `RR32` exponent on `Float$Pow`. It reads `getFloat()`, which `FRR32` implements, so it is not a competitor;
- the compiler library's `coerce(x: RR32)` and `coerce(x: FloatLiteral)`, and `CompilerLibrary.fss:67`'s `===`, all in the compiled world.

No test declares an operator or a coercion on `RR32`. The model programs name no `RR32`: the two `explorations/apl/` probes that grep `narrow(` call it on integers.

**`src/com/sun/fortress/`.** `RR32` appears in:
- the interpreter's `FRR32`;
- `FBigNum.java:63`, where `seqv` accepts an `FRR32` beside `FFloat`;
- `Util.java` and `Float.java` in `glue/prim`;
- the compiler's naming tables and runtime values.

No Java or Scala site treats an `FRR32` as an `RR64` by type. The interpreter's type of an `RR32` comes from the library's `value object RR32` declaration, so no Java site competes with it.

## 8. The record fragment

The FACTS lines are true as written, with the one sentence about the compiler library's history corrected (correction 1), and sourced to lines that say what they are cited for. I checked each against the tree:
- `FortressBuiltin.fsi:47-48`, `.fss:203-204`, `:328`;
- `FortressLibrary.fsi:282`, `:291-296`;
- `.fss:359`, `:367`, `:370`, `:387-392`.

The ledger notes cite existing rows (435, 434, 430, 387) and number the new ones provisionally from 519 without renumbering anything. They cite captures that exist and are tracked; I ran the prefix's tracked-path check over every path in the carried REPORT and record texts, and it printed nothing.

Two things are missing from the record.
- **The fold's re-anchoring list is incomplete (correction 2).**
  - The callout moves every line of `numbers.tex` after `:49` by +7, and the record asks the gather to re-anchor only "The specification's number chapters describe the flat library" (`FACTS.md:147`).
  - Two other live entries cite moved lines:
    - "The one library's number tower is flat" (`FACTS.md:116`) cites `numbers.tex:362-363`, now `:369-370`.
    - "The specification states the integer rules of 2026-09-22 and 2026-09-24, the coercion example with the exclusions its definition needs, and the rational type's library algebra" (`FACTS.md:151`) cites `:92-94`, `:145-147` and `:217-224`, now `:99-101`, `:152-154` and `:224-231`.
  - I checked each map against `git show 382b9fe7f:Specification/basic-lib/numbers.tex`; the texts are identical.
- **A precision for the reader of the FACTS entry: walk converts an `RR32` at a variable, a field, an assignment and an argument, not at a body whose return type is `RR64`.** This is row 387 (section 9). The entry's words ("bound to an `RR64` variable or parameter converts") are true as written, so this is a recommended note, not a correction.

## 9. The three homes

I ran each test myself.
- **Row 435, and the subtype: home 1.** `RR32SiblingRungV` passes on the edit, and so does `RR32MixedRungF`. Both fail on the base (section 3).
- **The integer-power natives, provisional row 521: home 1.** `RR32SiblingRungV.fss:42` covers `a^w` and `:54` covers `a^2.5`. Both pass on the edit.
- **Row 519: home 2, and the harness treats it as expected to fail.**
  - The files are `library_tests/XXXRR32EqualityRungV.fss` with `XXXRR32EqualityRungV.test` (`run`, `run_out_contains=PASS`) and `RR32EqualityRungVLink.test` (`link`). `FileTests.java:932` reads `shouldFail` from the `.test` file's name, so the link test must pass and the run test must fail.
  - It is compiled and fails today: `REACHED`, then `java.lang.AbstractMethodError`, `run rc=1` (`probes/skeptic/gated/XXXRR32EqualityRungV.comp.txt`).
  - The worker's local fix shows it going red (`probes/comp/XXXRR32EqualityRungV.localfix.txt` prints `PASS`).
  - The same form is batch N's (`compiler_tests/XXXNumeralBeyondWidthMax.test`, `NumeralBeyondWidthMaxLink.test`) and rung B's (`library_tests/ClauseBindingRungBLink.test`).
  - `library_tests/` runs in `testFast`, through `LibraryJUTest` (`build.xml:960`, `:972`).
- **Row 520: home 3.** The captures are `probes/comp/RR32Comp.comp.txt` and `RR32Comp3.comp.txt`. The report states that the specification is silent and shows the passage: the example's declarations "might look something like this", `conversions-coercions.tex:876`.
  - I read `opr-overview.tex` for the arithmetic operators. It says that they are "supported by ... floating-point types", and nowhere which type an `RR32` operation answers. So I agree that it is silent.
  - My probes add four operators to the row's evidence (section 10).
- **Row 522: home 2.** `XXXStringAvFlatRungV` fails today with "8.0 : RR64 =/= 8.0 : RR32" (`gated/XXXStringAvFlatRungV.edit.txt:3`).
  - The specification settles it: `numbers.tex:46` gives no coercion into `RR32`, and `conversions-coercions.tex:121-122` makes a body with a declared return type a coercion context.
  - `LongStringTests.fss:107` asserts `avFlat` only in a `test` declaration, `statsTest` (`:100`), which `run()` does not call, as the record says.
- **Row 387, a new instance of an existing row: already home 2.** It is one of my findings, not one of the worker's.
  - `retR64(x: RR32): RR64 = x` answers `1.5 : RR32` under walk (`probes/skeptic/SkCtx.edit.txt:2`, `SkDiffW.edit.txt:21`) and `RR64` compiled (`SkDiffC.comp.txt:24`).
  - Before the edit this was type-correct, because an `RR32` was an `RR64` (`SkCtx.base.txt:2`). Now an `RR64`-declared function answers a value that is not an `RR64`.
  - It is row 387's defect, since walk's return check is switched off (`Simple_fcn.java:45`), and its gated home already exists: `ProjectFortress/tests/XXXCoercionReturnRungC.fss`. So it needs no new test, only a note on row 387 (recommended rows).

## 10. The differentials

These are my own programs, run at one thread: the rung touches no mutable state, field or transaction, and the one mutable variable in `SkCtx` and `SkDiff*` is local.

**Walk, edit against base.**
- **`SkOps`: 47 expressions, `rc=0` on the edit.**
  - Its base run ends at line 24, `a DOT f`, with row 435's `InterpreterBug` (`SkOps.base.txt:25`). Lines 1-23 match the edit except for line 14: `a^(-1)` is `0.6666666666666666 : RR64` on the base and `0.6666667 : RR32` on the edit (`SkOps.base.txt:15`, `SkOps.edit.txt:15`).
  - On the edit:
    - `a =/= f` is `true` and `a =/= 1.5` is `false`, by the library's `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98`) over `Number`'s `=`;
    - `a = (3/2)` and `(3/2) = a` are `true`;
    - `a MINNUM f`, `a PLUS_UP f` and `atan2(a, f)` answer `RR64`;
    - `n = n`, `n CMP a` and `n MIN a` for a NaN `n` give `false`, `Unordered` and `NaN : RR32`.
- **`SkCtx`: a variable, an assignment, a field and an array element of type `RR64` each convert an `RR32` on the edit, where the base kept it an `RR32` as a subtype** (`SkCtx.edit.txt:5,6,15` against `SkCtx.base.txt:5,6,15`).
  - `SUM[\RR32\]`, `PROD[\RR32\]` and `BIG MAX[\RR32\]` answer `RR32` on both.
  - A body declared `RR64` does not convert (row 387, section 9).
- **`SkBound64`: `bound64[\T extends RR64\](a)` answers `1.5 : RR64` on the edit and `1.5 : RR32` on the base.**
- **`SkAddZZ64`, `SkZZ64Add`, `SkAddQQ` and `SkAddNN32` end with the same overload failure on both trees.** No coercion goes from `ZZ64`, `QQ` or `NN32` into `RR64` (answer 8), and none goes into `RR32`. This is the specification's answer (`numbers.tex:46-49`), and the edit does not change it.
- **`SkPow`: `a^0`, `a^(-2)`, `a^(big(3))`, `a^(unsigned(2))` and `a^(widen(unsigned(2)))` answer `RR32` on the edit and `RR64` on the base.**
  - `narrow(3.0E38)^2` is `Infinity : RR32` on the edit and `9.000000032986535E76 : RR64` on the base (`SkPow.edit.txt:8`, `SkPow.base.txt:8`).

**Walk against compiled, on the same program** (`SkDiffW.fss` and `SkDiffC.fss`, which differ only in how `a` and `b` are initialised).
- **Agreement.**
  - `a DOT f`, `f a`, `a MAX f` and `a MIN 2.5` answer `RR64` with the same values on both.
  - The four comparisons with an `RR64` agree.
  - `gen(f, a)` and `gen3(a, b, f)` are `RR64`, and `gen3(a, b, b)` is `RR32`, on both paths. That is answer 8's promotion as batch N built it.
  - `m: RR64 := f; m := a` gives `RR64` on both.
  - `num(a)`, with a `Number` parameter, keeps an `RR32` on both.
- **Divergence 1.** `a - b`, `a MAX b`, `SQRT a` and `a^2` answer `RR32` under walk and `RR64` compiled (`SkDiffW.edit.txt:2,7,16,25`, `SkDiffC.comp.txt:5,10,19,28`).
  - The cause is row 520's: the prelude's `RR32` declares no arithmetic.
  - The specification is silent on the declarations a library carries on `ℝ32` (outcome 3; `conversions-coercions.tex:876`). Home 3, row 520.
- **Divergence 2.** `retR64(a)` answers `RR32` under walk and `RR64` compiled (`SkDiffW.edit.txt:21`, `SkDiffC.comp.txt:24`).
  - The specification settles it against the interpreter (outcome 2): `conversions-coercions.tex:121-122`. It is row 387.
- **Divergence 3.** `a MINMAX f` answers `(1.5, 3.0)` as `RR64` under walk (`probes/expr-all/XAll.edit.txt`), and does not compile: the prelude declares `MINMAX` on the integer types only (`SkMinMaxC.comp.txt:4-10`).
  - The specification's operator overview does not name `MINMAX`, so it is silent (outcome 3). It is the same prelude gap as row 520's.

**One more check, on a timeout.** I ran `ReflectiveQuickCheckTest` on base and edit side by side, from 13:12:17 UTC, at load 4.51. It takes 146 s on the base and 148 s on the edit, with identical output (`probes/skeptic/rqc/`). The worker's pass took 581 s in base A and 173 s in base B, timed out in the edit pass, and took 261 s on its rerun. So the 600-second timeout was the box's load, as the report says. By rung D's rule it is a ledger row, and none was opened (recommended rows).

## 11. The failure-mode question

The rung turns row 435's loud failures into computed values. Where an `RR32` meets another number, `InterpreterBug: getRR32 not implemented for ...` becomes an `RR64` result: `a + 2.5` is `4.0`, `a = 1.5` is `true`, `a CMP f` is `LessThan`.
- Each value is what the specification's example computes, an `RR32` converted and combined by `RR64`'s declaration.
- The one bit of diagnosability lost is a stack trace that only ever reported an interpreter defect.

Two quiet changes of an existing value go with it, and both follow the specification:
- **Integer powers of an `RR32`.** Every one now answers an `RR32` where the base answered an `RR64`, since `MultiplicativeRing[\RR32\]`'s `^` answers `RR32`. So a power that overflows single precision is now `Infinity : RR32` where the base gave a finite `RR64` (`SkPow.edit.txt:8`). That is IEEE 754's single-precision overflow, as `opr-overview.tex:157-158` states for floating-point results. It is the same answer `a TIMES a` gives in `RR32`.
- **An `RR32` at an `RR64` variable, field, element or parameter.** It is now an `RR64` value where the base kept an `RR32`.

The rung also turns the base's overload failure for `a^2.5` and `a^(1/2)`, and its `InterpreterBug` for `a^w`, into values. These are `2.7556759606310752 : RR64`, `1.224744871391589 : RR64` and `3.375 : RR32`, each the specification's.

## 12. Required corrections

The commit stage must close these:
1. **The compiler library's coercion is not from 2009.**
   - What to reword:
     - `Specification/appendices/changes.tex:1740-1743`, "has declared the two types siblings, with the same coercion, since its change of 31~August 2009", in the words it lands with;
     - the same claim in `explorations/compile-ladder/rung-rr32-sibling/decision-record.md:16`;
     - REPORT section 4's attribution of `coerce(x: RR32) = jFloatToDouble(x)` to "Chase's cut of the subtype (`6896886fb`, 2009-08-31)";
     - the structured precedent search's "(CompilerBuiltin.fsi:435, .fss:933; Chase 6896886fb)".
   - What the reword must say: the 2009 change made the two types siblings, with a message that ends "this would be a good time to get coercion working". The coercion is the compiler library's declaration today (`CompilerBuiltin.fsi:435`). History does not date it more closely than between that change and `26718e298` (2011-12-06), the first surviving version of the file (`probes/skeptic/coerce-history.txt`).
   - The reword moves no line of `numbers.tex`, and no test cites a line of `changes.tex`.
2. **The record's re-anchoring list for the fold.** Name, beside `FACTS.md:147`:
   - "The one library's number tower is flat" (`FACTS.md:116`): `numbers.tex:362-363` → `:369-370`;
   - "The specification states the integer rules of 2026-09-22 and 2026-09-24, ..." (`FACTS.md:151`): `:92-94` → `:99-101`, `:145-147` → `:152-154`, `:217-224` → `:224-231`.
3. **A tree line cited with the base's number.** `decision-record.md:14` cites `narrow` at `Library/FortressLibrary.fsi:378-379` under its own rule that line numbers are on the rung's tree. There it is `:379-380`; `:378-379` is the base's.

The count table matches the report. `probes/checker-count-postedit.txt` reads `#total 75`, as do the REPORT (section 9), the record ("`expectedCheckerCount: 75`") and the structured report. It is identical line for line to `explorations/compile-ladder/climb-batch-N/gate/checker-count.txt`. `git log 3fb0cd8c1..382b9fe7f -- Library/ ProjectFortress/` prints nothing, so the landed table is the rung's before, and no library file changed after `e3146da6e`, the commit that captured the after.

## 13. The decisions on record

The landed text says what each decision says:
- **Route A (POSITIONS 2026-09-24).** The number types are siblings under `Number`, each carrying its own algebra, and a `coerce` on the wider type converts from the narrower.
- **Answer 8 (2026-09-26).** An exact conversion is a coercion and a lossy one explicit; `widens` is deferred. Nothing coerces into `RR32`, and `narrow` stays explicit.
- **Answer 6, and the number chapters under S2.** The chapter names `ℝ32` in the S1 form, with a callout, an Appendix I entry that quotes the original text, and a decision record.
- **Decision 2 of the conversion judgement (2026-09-28).** `RR32` declares its own `MIN`, `MAX` and `MINMAX` at `RR32`.
- **Decision 1 of the same judgement.** A declaration that fits runs without a conversion: `a = f` runs `Number`'s `=`, and `a^f` for a `Float` `f` runs `RR32`'s own `^(self, b:Float)`.
- **Rung D's stop (2026-09-26).** The `ReflectiveQuickCheckTest` timeout keeps its verdict. It is not a stop, but it owes a ledger row, which is recommended below.
- **Rungs re-running measurements (2026-09-28).** The rung took the landed checker-count table as its before and did not re-run the stage on its base.

## 14. Rows the rung meets that it does not cite

**Row 454** (a radix-point numeral at an `RR32` binding is refused on both paths against the one library). The rung does not change it: `a: RR32 = 1.5` is still refused under walk.
- The new compiled expected failure `library_tests/XXXRR32EqualityRungV.fss:7-9` writes `a: RR32 = 1.5` on the compiled prelude's `coerce(x: FloatLiteral)` (`CompilerBuiltin.fss:993`).
- At the switch-over that line is refused with the rest of row 454's cases, and the run test then fails for a reason that is not row 519's. That belongs in row 519's note (recommended rows).

## 15. Stops

The rung met none of the stops that the batch record's intro reserves for V:
- **No walk output changed that the comparison does not account for.** Each of the six has its cause, and I confirmed the timeout (section 10).
- **No team test line changed.** The six re-anchored files are the revival's. Their `-` and `+` lines differ only in the digits of a `numbers.tex` citation, and every old and new range holds the same text.
- **No coercion was added beyond `RR64`'s from `RR32`.**
- **The chapter's sentence (`numbers.tex:31`, `:43`, callout `:50-56`) states no more than the landed library.**
- **No file another rung of this run owns was edited.** `Library/FortressLibrary.fss` is shared as planned. `compiler_tests/` was left to rung E, and `library_tests/` belongs to neither rung's list.

Two test files lie outside the list in V's section, `library_tests/` and `tests/XXXStringAvFlatRungV.fss`. They are homes the three-homes rule requires, not a stop, and the record says so.
