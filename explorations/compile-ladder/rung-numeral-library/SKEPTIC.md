# Skeptic, rung Q (rung-numeral-library), first judgement

**Verdict: refused.** The one thing that must change: the sibling `IntLiteral` makes the compiled checker over the one library refuse eight numeral-only calls it accepted on the base (`odd(3)`, `even(4)`, `2^3`, `2^(-1)`, `floor(3)`, `ceiling(3)`, `truncate(3)`, `3 DIVIDES 6`). The rung gives them no home, and its report says no checker refusal is new. They are siblings of the 15 ties the rung did repair (REPORT section 6, decision 4). Each needs a home. Where the library has a device, repair it: `IntLiteral`'s own `even` and `odd`, which the compiler library's model declares (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:429-430`), and an `IntLiteral` declaration for the `^` tie that the per-type `^(self, b: IntLiteral)` creates. Use a re-run of the checker probe as the evidence. Where a refusal is not repaired, open a ledger row that quotes the probe lines.

Everything else either holds or is a correction listed below. Both tests failed on the test-only commit and pass at the head. I re-measured walk's values on base and head. The measurement accounts for every changed output. I confirmed R9's conflict with answer 8 on my own library copy.

## What I ran

All runs used one thread (`FORTRESS_THREADS=1`). The diff touches no mutable state, no field and no atomic block.

**The failure, on the test-only commit.** `git checkout 4a8c27003`, `ant compileAll`, then `bash explorations/compile-ladder/rung-inference-walk/harness-one.sh .../skeptic/hb ProjectFortress/tests/IntegerMaxNumMinNum.fss ProjectFortress/tests/IntegerOrderNumerals.fss <ReflectiveNumberTypes.fss>`:

    # harness-one 2026-10-02T15:53:57Z; tree 4a8c27003; ...
    Ambiguous coercion, args = (3: ZZ64,1: ZZ32), applicable with coercion = {coerced MAXNUM(self:(FortressLibrary.QQ & {Ratio}),...
    Tests run: 3,  Failures: 2,  Errors: 0

`IntegerOrderNumerals` fails at `:48` (`w MAXNUM 1`). `ReflectiveNumberTypes` passes on the base, as the report says.

**The pass, at the head.** `git checkout wip/rung-numeral-library` (`9d75bb063`), `ant compileAll`, then the same harness over the three tests and `XXXextendIntLiteral.fss`:

    # harness-one 2026-10-02T15:55:14Z; tree 9d75bb063; ...
    OK Saw expected exception
    OK (4 tests)

**The guard test, shown both ways.** The head's library was copied, with `Library/ReflectiveQuickCheck.fss` taken back to the base (`tmp/.../skeptic/walkwith.sh rqbase p/ReflectiveNumberTypes.fss`):

    FAIL: literals.tex, section "Literals": a numeral's type IntLiteral extends Number; the reflective generator finds a generator for it

With the tree's own library the test prints `PASS`, rc=0.

## Differentials (my own programs, under `tmp/rung-numeral-library/skeptic/p/`)

1. **`SkqCmp`: comparisons, `CMP`, `MAXNUM` and `MINNUM`, mixed widths, `/`, `^`, `LSHIFT`, `TIMES`, `unsigned`.** It includes `NN32`'s maximum against 1 (`A1`-`A8`: `true true false GT LT EQ`, `4294967295 NN32`, `1 NN32`).
   - Walk, head: every line answers.
   - Walk, base: the run dies at `B5` (`w MAXNUM z`, row 517).
   - `SkqCmpB`, the same program without the four `MAXNUM`/`MINNUM` lines on mixed widths: walk gives byte-identical output on the base library and the head library (`walkwith.sh base` against `walkwith.sh tree`). No comparison answers differently.
   - Compiled (`SkqCmpC`, the subset the compiler library can check): the same as walk except `D1`/`D2`, where compiled prints `-1 NN64` and `-1 NN32` and walk prints `18446744073709551615` and `4294967295`. That is row 326, the compile path rendering unsigned values signed. It is not this rung's.
2. **`SkqLit`: the object `IntLiteral` (`FIntLiteral.ZERO`, `glue/prim/IntLiteral.java:35-37`), the one `IntLiteral` value a walk program can name.**
   - Head: the seven typed bindings print `0 ZZ32`, `0 ZZ64`, `0 ZZ`, `0 QQ`, `0.0 RR64`, `0 NN32`, `0 NN64`. `x = (w - w)` is `true` (Number's `=` with the new `exactValue` arm), `x = 1/2` and `x = 0.5` are `false`, and `|x|` is `0 IntLiteral`. `x + x` prints `0 ZZ32`: `FIntLiteral.make` normalises the result, so the declared `IntLiteral` is not kept.
   - Base: the run dies at the `ZZ64` binding with `Value 0 does not fit in ZZ32.`
   - This is a loud failure that became the correct value. The compiled path cannot express it, because there `IntLiteral` is a trait.
3. **`SkqNN`: an `NN32` with a numeral.**
   - Walk, head: `u MAX 1` is `5 ZZ64`, `u + 1` is `6 ZZ64`, `u - 1` is `4 ZZ64`, `u MAXNUM 1` is `5 ZZ64`.
   - Walk, base: the same, except `u MAXNUM 1` was `5 QQ`.
   - Compiled (`SkqNNC`): `5 NN32`, `6 NN32`, `4 NN32`.
   - The specification settles this against walk. A numeral has its own type (`literals.tex`, section "Literals"), `NN32` coerces from it, and `NN32`'s own declaration is the unique most specific (`conversions-coercions.tex`, section "Coercion Resolution"). The repair is Q-walk's. Its home is 2 (correction 5).
4. **`SkqR9`, under walk on my own copy of the head's library with `RR64`'s `coerce(x: NN32)` (one api line and one body line).** The `NN32` binding and argument at `RR64` work (`2.0 RR64`, `1.0`). `z + u` stops the run: `Ambiguous coercion, args = (5: ZZ32,2: NN32), applicable with coercion = {coerced +(self:(FortressLibrary.RR64 ...`. This confirms the report's section 8. On the head the binding is refused (`RHS expression type NN32 is not assignable to LHS type RR64`).
5. **`SkqC1`/`SkqC1w`: candidate 1 of section 8, built for `+` only on a copy (R9, `NN32`'s `+(self, b: ZZ32): ZZ64`, `ZZ32`'s `+(self, b: NN32): ZZ64`).**
   - Walk: `z + u`, `u + z` and `u + 1` all answer at `ZZ64`.
   - Checker: it now types `u + 1` at `ZZ64`: `check.sh SkqC1 c1`, "SkqC1.fss:3:21: Function body has type ZZ64, but declared return type is NN32". On the head's library it is `NN32`: `check.sh SkqC1 edit2` reports only the R9 binding.
   - The numeral default reads the tied numeral as a `ZZ32`. So candidate 1 has a cost the report does not name: an `NN32` with a numeral leaves `NN32` on the checker.
6. **`SkqResolve`, a model of `Number`'s catch-all `=` against `ZZ32`'s own.** In the model, `Num` declares `EQV(self, other: Num): String`, and `I32` declares `EQV(self, other: I32): ZZ32` and a `coerce` from `Lit`. `fortress compile` reports "Function body has type String, but declared return type is ZZ32". The checker takes the declaration that applies without coercion, as the specification's coercion resolution does. With `IntLiteral` under `Number`, `z = 0` for a `ZZ32` `z` therefore resolves on the checker to `Number`'s `=` (`Library/FortressLibrary.fss:366`). The judgement assumed `ZZ32`'s own `=` (`explorations/reviews/numeral-switch-judgement.md`, section 4.5). See For Pavol.

**The compiled checker over the one library**, with the rung's own driver copied to `skeptic/check/` and the worker's library copies `base` and `edit2` (`edit2` byte-equal to the head's four files):
- `SkqCk`, 32 calls of a typed integer with a numeral and of the library's numeral sites: 10 errors on the base, 3 on the head. One of the head's three is new: `odd(3)`. The other two are a `SUM` refusal on both and my own `y +=` slip.
- `SkqCk2`, 25 numeral-with-numeral calls: the head refuses `2^3`, `odd(3)` and `even(4)`. The base refuses none of the three. Its 10 errors are only the numeral arithmetic typed `ZZ32` where I declared `IntLiteral`.
- `SkqCk3`, 15 calls: the head refuses `floor(3)`, `ceiling(3)`, `truncate(3)`, `3 DIVIDES 6`, `2^(-1)`, `|\3/|` and `round(3)`'s `ZZ`. The base refuses only the last two.

The head's lines:

    SkqCk2.fss:3:15-17: Ambiguous coercion in call to operator ^: ... (IntLiteral, IntLiteral) only by coercion, none is more specific than every other: (IntLiteral, AnyIntegral)->RR64; (NN32, IntLiteral)->RR64; ((ZZ32 & {Int}), IntLiteral)->RR64.
    SkqCk2.fss:5:18-22: Could not check call to function odd - Integral[\I\]->Boolean is not applicable to an argument of type IntLiteral.
    SkqCk3.fss:3:15-21: Ambiguous coercion in call to function floor: ... IntLiteral only by coercion ...: (RR64 & {Float, FloatLiteral})->RR64; QQ->ZZ.
    SkqCk3.fss:7:18: Could not check call to operator ? - (Integral[\I\], I)->Boolean is not applicable to an argument of type (IntLiteral, IntLiteral).

My probes also confirm what the rung built. `n + 1`, `n - 1`, `2 n`, `n DIV 2`, `n MOD 2` and `n = 0` check at `NN32` for an `NN32` `n`. `n + 1` checks at `NN64` for an `NN64` `n`. `unsigned(5)`, `unsigned(w)`, `widen(0)`, `0 MAX (z - 1)`, `2^z`, `r + 1`, `q + 1`, `3 MAX 4`, `3 / 4` and `3 MAXNUM 4` all check.

## Findings

1. **Unhomed checker regressions.** This is the refusal above. The `^` tie is the rung's own device colliding with the block it enabled. With the per-type `^(self, b: IntLiteral)` (decision 3), `IntLiteral`'s `^(self, b: AnyIntegral)` and `ZZ32`'s and `NN32`'s `^(self, b: IntLiteral)` each need one coercion for two numerals, and none is more specific. The base accepted all eight calls, because there `IntLiteral` was below `ZZ32`. The library has no such site, so the distance cannot show them. The microGPT programs have none either: I grepped `explorations/run-c4/src/` and `explorations/apl/mg/`.
2. **Not every test message cites a section that says what it checks** (check 6):
   - `IntegerOrderNumerals.fss`'s `widen` message cites `basic-integers.tex`, section "Integers". That chapter declares no `widen`: `grep -n widen Specification/basic-lib/basic-integers.tex` prints nothing.
   - Its three empty-product messages, and its `ZZ64` and `NN32` empty-sum messages, cite `reductions.tex`, section "Summations and Other Reduction Expressions". That section gives only the sum's equivalent code, from `var result: ZZ32 = 0`. It says nothing of a product's start or of another width.
3. **The provenance block.** I opened each cited line, and each says what the block says, with two exceptions:
   - The `spec:` line cites `basic-integers.tex:633-645` for `CMP` (specCitations also says "CMP; MAX, ..."). `CMP` is at `:625-629`.
   - The `deviation:` line leaves out `Library/ReflectiveQuickCheck.fss`, a file outside the record's list, and `unsigned`'s two-line device.
   - The `historical:` line names every file of the 2012 tree that the diff edits.
4. **`unsigned`.**
   - The record's stop reads: "A repair of `unsigned` that needs more than the one declaration or changes a value: then the slip is left with a row". The rung met it and repaired anyway: `Integral`'s api line was removed (base `Library/FortressLibrary.fsi:466`) and `ZZ64`'s was added (`Library/FortressLibrary.fsi:635`).
   - A one-declaration device existed, which the rung itself names: widen `Integral`'s return type to `AnyIntegral`.
   - No value moved: `unsigned` of `ZZ32` and `ZZ64` -1 prints the same on base and head (`SkqCmpB`).
   - It is listed below. Whether the landed form stays is Pavol's.
5. **REPORT section 3 says "no walk call reaches the block".** A program that names the object `IntLiteral` reaches it (`SkqLit` `N2`, `x + x`). The block's results come back as a `ZZ32` through `FIntLiteral.make`.
6. **The Appendix I entry's Effect** (`Specification/appendices/changes.tex`, "The type of an integer numeral") says of the interpreter that "its calls reach the declarations they reached before". That is false for `MAXNUM` and `MINNUM`, whose walk calls now reach each type's own declaration (row 517 is a walk repair; `SkqNN` `u MAXNUM 1` went from `QQ` to `ZZ64`). Under walk, `CMP` and the comparisons that `ZZ32`, `NN32` and `NN64` now state also take those types' own declarations.
7. **`IntLiteral`'s `TIMES`** has a body in the enabled block (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:523`) and no api line. So `3 TIMES 4` checks at `ZZ32`, through the `TIMES` the rung added to `ZZ32`'s api, while every other operator of the block answers `IntLiteral` (`SkqCk2.fss:16`).
8. **Check 8, record.md.** The worker's write was refused, so I read its `recordText` from its structured result. The cited lines are right: I opened `Library/FortressLibrary.fsi:299`, `:400`, `:486`, `:531`, `:588`, `:646`, `FortressBuiltin.fsi:132`, and the `MAXNUM`/`MINNUM` lines. One sentence of the FACTS entry is false: "Walk reaches none of it". Walk reaches the per-type `MAXNUM`, `MINNUM`, `CMP` and comparisons; it does not reach `IntLiteral`'s declarations. The entry's "6 after" is scoped to the 135 calls and does not name the numeral-only refusals.
9. **Check 10.**
   - `tmp/rung-numeral-library/stages2/checker-count.txt` reads `#total 58` and `stages2/distance.txt` reads `#total 596`. These agree with REPORT section 11, the record's handover line (59 to 58, 598 to 596) and the structured summary.
   - Against the landed `climb-batch-7b/gate/` tables the class rows move as the report says: R3 -1, I1 +2, V1 -8, G1 -5, BR +1, OT +9.
   - `classify.py:24-25` uses fixed site ranges, as the report says.
   - `git log b0eb41516..493b4076f -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing.
10. **The measurement** (`tmp/.../edit-pass/compare2.txt`): `tests 469 same 438 normalised 9 changed 3 unstable 18 (exit code changed in 0) missing 0 new 3 gone 1`.
    - The three changed outputs are as the report gives them: two overload listings now name `IntLiteral`'s `-`, and `XXXInheritedOverload` lists its declarations in the other order.
    - The pass's `pass.txt` says `changed=3 tracked files differ from the commit` at `608c4e91f`. Those three are the specification and test-message edits committed at `9d75bb063`; `git diff --stat 608c4e91f 9d75bb063` shows no library or code file. The measurement therefore holds for the head.
    - The microGPT logs read `VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS`, rc=0, both. Their losses match the goldens within the checks' 1e-12 tolerance.
    - `git show --stat 1ee3b0bc5` confirms that the cleaning removed `explorations/apl/reference/dzaima/docs.txt` and `w/`.
11. **Precedent.** The model and the comparisons' precedent are found and cited correctly, and the count of sites lacking `CMP` and the comparisons is given. The miss is in the model itself. The compiler library's `IntLiteral` declares `even` and `odd` (`CompilerBuiltin.fsi:429-430`), but the rung took "the team's block as written, nothing added", which is the cause of finding 1's `odd`/`even`.
12. **Check 7.** `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ` occur elsewhere only as the compiler library's getters, in compiled and library tests and in `compiler/runtimeValues/FIntLiteral.java`. The three test components' names occur nowhere else.
13. **Decisions** (check 12):
    - The numeral switch's Q-lib is built as worded, except that R9 is absent beside it.
    - Answer 8 holds: `ZZ32` with `NN32` gives `ZZ64` (`SkqCmp` `B10`).
    - Each type's own `MAXNUM` and `MINNUM` follows the `MIN`/`MAX` decision.
    - The compiler library is untouched.
    - R9 ("`NN32` coerces into `RR64`") is not built. I confirmed the conflict, and each of the three building candidates changes a decided behaviour. Candidate 1 is the `u + 1` type above; candidate 2 drops answer 8 for `NN32` with `ZZ32`; candidate 3 is lossy. So the fork is his, not one the rung could settle by a deeper pass.
    - The coercion chapter's callout still gives the old reason, "since that decision names only \EXP{\mathbb{Z}32} and the numerals" (`Specification/basic/conversions-coercions.tex:81-82`). The decision on record now names `NN32`.
14. **Scratch.** While setting up my probe directory I created, and removed at once, a stray link `check/libs/c1` in the worker's scratch. `check/libs/` again holds only `base`, `edit`, `edit2` and `r9`.

## Required corrections (the repair round closes these with the refusal)

1. **The refusal.** Give the eight numeral-only checker refusals a home: repair them, or open a ledger row with the probe lines. Correct REPORT sections 6 and 14, the summary and the FACTS entry, which say no checker refusal is new.
2. **`IntegerOrderNumerals.fss`'s messages.**
   - The `widen` message cites a section that declares no `widen`.
   - The `PROD` messages, and the `ZZ64` and `NN32` `SUM` messages, cite a section that states only the `ZZ32` sum's start.
   - Reword each to what the cited section says, or cite a section that says it.
3. **Provenance.** `spec:` and specCitations: `basic-integers.tex:625-645`, not `:633-645`, where `CMP` is claimed. `deviation:` must name `Library/ReflectiveQuickCheck.fss` and `unsigned`'s two-line device.
4. **`Specification/appendices/changes.tex`, entry "The type of an integer numeral", Effect.** The interpreter's calls do not all reach the declarations they reached before. Say that walk's `MAXNUM`, `MINNUM`, `CMP` and comparisons on the integer types now take each type's own declaration.
5. **A home-2 test.** The rung measured walk answering `ZZ64` for an `NN32` with a numeral (decision 10, its divergence 2) where the specification answers `NN32`. An XXX test in `ProjectFortress/tests/` is owed, asserting `u MAXNUM 1`, `u MAX 1` and `u + 1` at `NN32` for an `NN32` `u`, with a `.test` file if the harness needs one. Show it through `harness-one.sh` as an expected failure.
6. **record.md's FACTS entry.** Replace "Walk reaches none of it" with what walk reaches.
7. **REPORT section 3's "no walk call reaches the block".** Add the object-name exception.

## Stops met

- **The `unsigned` stop**, met and repaired anyway: `Library/FortressLibrary.fsi:635` with base `Library/FortressLibrary.fsi:466`. It is lifted by POSITIONS.md:98, "Reversible stops do not hold a batch". The section's own outcome for this stop was a row.

No other reserved stop is met:
- The changed walk outputs of the corpus are accounted for.
- No comparison of equal values answers differently (`SkqCmpB` byte-identical).
- No team test line changed, and no team expected failure turned green.
- The compiler library, the checker and walk's evaluator are untouched.
- `Number`'s `=` body is unchanged.
- No declaration of rung M's is touched.

## For Pavol

- **R9 against answer 8.** R9 makes `z + u` ambiguous on both paths (my `SkqR9`, as the report's section 8 says). The cheapest way to keep answer 8, candidate 1, makes the checker type an `NN32` with a numeral at `ZZ64` (`SkqC1`: "SkqC1.fss:3:21: Function body has type ZZ64, but declared return type is NN32"). Every way to build R9 changes a decided behaviour. Evidence: `Library/FortressLibrary.fsi:296-299`; `Specification/basic/conversions-coercions.tex:81-82`.
- **`z = 0` and `Number`'s catch-all `=`.** With `IntLiteral` under `Number`, the checker over the one library resolves `z = 0` for a `ZZ32` `z` to `Number`'s catch-all `=`, which applies without coercion (`Library/FortressLibrary.fss:366-376`), not to `ZZ32`'s own. This is the specification's resolution order (`Specification/basic/conversions-coercions.tex:473-480`), shown on a model (`SkqResolve`). The numeral-switch judgement's section 4.5 expected the static coercion to send it to `ZZ32`'s `=`. So the 13x `exactValue` path is what a compiled `i = 0` would run once the one library is the compiler's.
- **The `unsigned` stop.** It was repaired with two api lines where the record said to leave a row. A one-line device was available (`Library/FortressLibrary.fsi:466` on the base, widened to `AnyIntegral`).

## Recommended rows

- **The eight refusals, if not repaired.** "Against the one library the compiled checker refuses numeral-only calls it accepted while `IntLiteral` was below `ZZ32`: `odd(3)` and `even(4)` (Integral's generic self is not applicable to `IntLiteral`), `2^3` and `2^(-1)` (`IntLiteral`'s `^(self, b: AnyIntegral)` ties with `ZZ32`'s and `NN32`'s `^(self, b: IntLiteral)`), `floor(3)`, `ceiling(3)`, `truncate(3)` (`RR64`'s and `QQ`'s tie), `3 DIVIDES 6`." The specification's numeral default reads such a numeral as a `ZZ32` (`inference.tex`, section "A Numeral Whose Conversions Tie"). Probe: `skeptic/check/SkqCk2.fss` and `SkqCk3.fss`, `check.sh <name> edit2` against `base`.
- **The object name `IntLiteral` under walk.** "Under walk the object name `IntLiteral` is the value `0 : IntLiteral` (`glue/prim/IntLiteral.java:35-37`). Its enabled arithmetic answers a `ZZ32` (`FIntLiteral.make` normalises), against its declared `IntLiteral`, so `x + x` prints `0 ZZ32`." Probe: `skeptic/p/SkqLit.fss`, `walkwith.sh tree`. The specification is silent on a numeral type's value; the compiler library declares a trait.
- **Candidate 1's cost, as a note on the provisional R9 row 559.** With a mixed-width pair declared for `+`, the checker reads `u + 1` for an `NN32` `u` at `ZZ64` (`SkqC1`, `check.sh SkqC1 c1` against `edit2`).
- **`IntLiteral`'s `TIMES`,** declared in the body and not in the api (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:523`, absent from `.fsi:178-209`), unless the repair round adds the api line.
