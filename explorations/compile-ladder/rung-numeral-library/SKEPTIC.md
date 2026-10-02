# Skeptic, rung Q (rung-numeral-library), second judgement

**Verdict: approved, with required corrections.** The repair round did what the judge's ruling asked. `IntLiteral` now declares the members that a numeral no longer reaches through `ZZ32`. `ZZ`'s api states its arithmetic. The two new tests fail where they should and pass at the head, and the `XXX` test is a real check. The Appendix I Effect, the test messages and the provenance block now say what the tree does.

My own probes found two more kinds of numeral call that the compiled checker over the one library accepted on the base and refuses at the head:
- a numeral `IN` a range built with `#` or `:`;
- `(3).minimum` and `(3).maximum`.

Neither can be repaired with this rung's declarations:
- The `IN` refusal comes from a Meet Rule gap in the ranges that predates the rung. Section 4 of the record gives the ranges' `IN` to no rung of this batch.
- The getters are `ZZ32`'s range bounds, which a numeral has no reason to have. The compiler library's `IntLiteral` does not declare them either.

Each takes a ledger row (recommendedRows), and the report and the FACTS entry must name them. The rung is not wrong for this: its change follows the decision, and the specification settles the `IN` case against the library's ranges, not against the rung.

## What I ran

All runs used one thread. The repair round adds declarations and api lines; it touches no mutable state.

**The failure, seen.** I checked out the test-only commit `4a8c27003` (the base library with the first pass's two tests), put the repair round's two tests beside them, ran `ant compileAll` (the glue back to the base), and ran the harness:

    bash explorations/compile-ladder/rung-inference-walk/harness-one.sh .../skeptic/r2/h-base ProjectFortress/tests/IntLiteralValue.fss ProjectFortress/tests/XXXNumeralWithNN32.fss
    # harness-one 2026-10-02T18:00:40Z; tree 4a8c27003; ...
    FAIL: J14/0:0 : IntLiteral =/= J8/0:0 : ZZ32; literals.tex, section "Literals": the libraries define a coercion from the numeral type IntLiteral to ZZ32; IntLiteral at a ZZ32 binding is the ZZ32 zero
     OK Saw expected exception
    Tests run: 2,  Failures: 1,  Errors: 0

The four assertions on `IntLiteral`'s new members fail on the first pass's library. I checked out `9d75bb063`, whose Java equals the head's, with the head's `IntLiteralValue.fss` beside it:

    # harness-one 2026-10-02T17:59:03Z; tree 9d75bb063; ...
    Failed to find any matching overload, args = (0:IntLiteral), overload = { ... odd(self:Integral[\I\]) ... (Library/FortressLibrary.fss:676:5-40)
    Tests run: 2,  Failures: 1,  Errors: 0

**The pass, at the head** (`32ba2ab5e`, the code of `f447a4be4` plus `record.md`), all six tests of the rung:

    # harness-one 2026-10-02T17:59:31Z; tree 32ba2ab5e; ...
    . interpret .../XXXNumeralWithNN32
     OK Saw expected exception
    . interpret .../XXXextendIntLiteral
     OK Saw expected exception
    OK (6 tests)

**The home-2 test, shown red on a deliberate fix.** I made my own copy of `XXXNumeralWithNN32.fss` with the three answers set to walk's `ZZ64`:

    # harness-one 2026-10-02T18:29:26Z; tree 32ba2ab5e; ...
    PASS
     Missing expected failure
    Tests run: 1,  Failures: 1,  Errors: 0

**The library copies.** The worker's probe libraries are byte-equal to the commits they claim:
- `check/libs/base` to `493b4076f`;
- `edit2` to `9d75bb063`;
- `edit3` to the head.

This holds for all five library files (`cmp` against `git show`).

**The suites.** The rung's one whole-suite run is the edit pass on `f447a4be4`, "changed=0 tracked files differ from the commit". The head adds only `record.md`, so its code state is the edit pass's. Its comparison (`edit-pass/compare3.txt`) reads `tests 469  same 439  normalised 9  changed 2  unstable 18 (exit code changed in 0)  missing 0  new 5  gone 1`. The two changed outputs are the overload listings that name `IntLiteral`'s `-`, each with its exit code unchanged. I did not run it again.

**The stages.** `tmp/rung-numeral-library/stages3/checker-count.txt` reads `#total 58`, and `stages3/distance.txt` reads `#total 596`. These agree with the report, `record.md`'s handover line and the structured summary.

**The `unsigned` cost.** `check/libs/widen` differs from `base` only at `Library/FortressLibrary.fsi:466` (`unsigned(self):AnyIntegral`). `UnsignedCk.widen.check.txt` reads "UnsignedCk.fss:3:20-29: Function body has type AnyIntegral, but declared return type is NN64."; `base` and `edit3` read rc=0.

**The specification build.** `specbuild/build3.log` reads "Output written on fortress.pdf (549 pages, 2010652 bytes)." on both passes.

**A trap I met.** My `ant compileAll` runs emptied `default_repository/caches/bytecode_cache` but left the analysed `.tfi` files. So the library-order `fortress compile` wrote no jar until I wiped the caches. In between, the compiled probes died with `NoSuchMethodError` on `CompilerBuiltin.odd(IntLiteral)` and `coerce_ZZ(IntLiteral)`. Every compiled result below is from after the wipe and the rebuild.

## Differentials (my own programs, under `tmp/rung-numeral-library/skeptic/r2/p/`)

1. **`SkqR2w`, under walk: numeral-only calls of the members `IntLiteral` now declares, and the object `IntLiteral`'s new members.**
   - Lines `A1` to `A8` (`odd(3)`, `even(4)`, `3 TIMES 4`, `2^3`, `2^(-1)`, `3 DIVIDES 6`, `0 DIVIDES 0`, `floor(3)`, `ceiling(-3)`, `truncate(7)`, `(3).zero`, `(3).one`) are byte-identical on the base library and the head: `true true`, `12 ZZ32`, `8 ZZ32`, `0.5 RR64`, `true false false`, `3 ZZ32 -3 ZZ32 7 ZZ32`, `0 ZZ32 1 ZZ32`. Walk's numeral is an `Int` and reaches none of them.
   - The object, at the head:
     - `x DIVIDES x` is `false` (`Integral`'s body gives `false` for a zero divisor, as for the numeral 0);
     - `x TIMES x` is `0 ZZ32`;
     - `x^x` and `2^x` are `1 ZZ32`;
     - `x.zero` and `x.one` are `0 ZZ32` and `1 ZZ32`;
     - `floor(x)` is `0 IntLiteral`;
     - `odd(x)` is `false`.
   - The object, on the base: the run dies at its first use, "Value 0 does not fit in ZZ64.".
   - The `ZZ32` answers are row 563 (home 3, pinned).
2. **`SkqR2c` and `SkqR2c2`, compiled (the compiler library).**
   - `odd(3)` compiles and throws `CompilerFailureDetectedAtRunTime` at run time; walk answers `true`. The specification settles this against the compiled run. The compiler library's `IntLiteral` declares `even` and `odd` with no implementation, which ledger row 318 lists among its stubbed family. That library is deleted at the switch-over, so this is not this rung's.
   - So the model the repair round followed for `even` and `odd` (`CompilerBuiltin.fsi:429-430`) exists only in its api.
   - `3 4` at `ZZ32` is `12 ZZ32` on both paths.
3. **`ZZ` arithmetic.**
   - Walk (`SkqR2wz`): `g + h`, `g - h`, `-g`, `g TIMES h`, `g DOT h`, `g h`, `g + 1`, `1 + g`, `g 2`, `g DOTPLUS h`, `g DOTMINUS h`, `DOTMINUS g`, `g DOTTIMES h`, `g + w` and `w + g` print `7 ZZ`, `-1 ZZ`, `-3 ZZ`, `12 ZZ` (three times), `4 ZZ`, `4 ZZ`, `6 ZZ`, `7 ZZ`, `-1 ZZ`, `-3 ZZ`, `12 ZZ`, `8 ZZ`, `8 ZZ`. The output is byte-identical on base and head.
   - Compiled (`SkqR2c2`, the compiler library's `ZZ`): the same values wherever that library declares the operator (`7 -1 -3 ZZ`, `12 12`, `4 4 6`, `7 -1 -3`). The paths agree.
4. **`SkqR2in`, a numeral `IN` a range.**
   - Walk: `3 IN (0#5)`, `3 IN (1:5)`, `7 IN (0#z)` and `(3 + 1) IN (0#5)` print `true true false true`, the same on base and head.
   - Compiled: `false` four times. That is row 479: the compiler library's `IN` is always `false`, so it is not this rung's.
   - The checker over the one library (5 below): refused at the head, accepted on the base.
5. **The compiled checker over the one library** (the worker's `check.sh`, `-stop typecheck`, with the libraries `base` and `edit3`):
   - `SkqR2b`, ten `IN` calls. On `base`: no error. On `edit3`: five errors, `3 IN r` for `r: CompactFullRange[\ZZ32\]` or `FullRange[\ZZ32\]`, `3 IN (1:5)`, `3 IN (0#z)` and `(3 + 1) IN (0#5)`:

         ./check.sh SkqR2b edit3
         SkqR2b.fss:7:18: Ambiguous coercion in call to operator IN: of the declarations applicable to an argument of type (IntLiteral, CompactFullRange[\ZZ32\]) only by coercion, none is more specific than every other: (ZZ32, Range[\ZZ32\])->Boolean; (ZZ32, Generator[\ZZ32\])->Boolean.

     Accepted on both: a typed `z IN (0#5)`, and `3 IN r` for `r` a `Range[\ZZ32\]`, a `Generator[\ZZ32\]` or an `Array`.
   - `SkqR2g`. `4 IN (2:6)`, the form of `ProjectFortress/tests/RangeZZ32RungJ.fss:71`, is refused on `edit3` only, with the same message. Accepted on both: `5 IN (1:10:2)`, `3 IN Just(3)`, `3 IN l` for a `List`, `3 IN <|1, 2, 3|>`, `3 IN m` for a `Maybe` and `3 IN r` for a `Range`.
   - `SkqR2f`. `(3).minimum` and `(3).maximum` are "IntLiteral has no getter called minimum" (and `maximum`) on `edit3` only. Accepted on both: `big(3)`, `narrow(3)`, `partitionL(3)`, `asFloat(3)`, `(3).asString`, `|3|`, `3 =/= 4` and `z.zero + 3`.
   - `SkqR2c`, 27 operators by `RR64` and `QQ`, each with a numeral. Both libraries give the same two errors: `x^2` and `x^(-1)` for an `RR64` `x` tie `RR64`'s `^` with `MultiplicativeRing`'s, which is row 533. `QQ` checks throughout.
   - `SkqR2d`: no error on either library. It covers generic functions bounded by `Integral[\I\]`, `AnyIntegral`, `Number` or nothing, applied to a numeral at `ZZ32`; the array-and-scalar operators with a numeral; the tuple comparisons; `a[0] := 1`; `a.fill(0)`; `vector[\RR64,3\](0)`; and `+3`.
   - `SkqR2e`, indexing with a numeral on strings, ranges, arrays, vectors and matrices, and string juxtaposition and power: the same on both libraries, only my own slip (`r.shift`).
   - `SkqR2a`: the half-open ranges `3#`, `3:`, `#3` and `:3` at `ZZ32` ranges, `Just(3)`, `(3, 4)`, `"a" || 3`, `array[\ZZ32\](3)`, `3 DOTTIMES 4`, `3 TIMES z` and `7 REM 2` are accepted on both. Only `3 IN (0#5)` is new.

**Which outcome each divergence is in.**
- Walk against the checker on a numeral `IN` a full range is the first outcome, settled against the library.
  - `FullRange[\I\]` provides `Range[\I\]`'s `opr IN(n: I, self)` (`Library/FortressLibrary.fsi:2179`) and `Generator[\I\]`'s, through `Indexed` (`Library/FortressLibrary.fsi:828`, `:1245`). It declares none on their meet (`Library/FortressLibrary.fsi:2254-2262`).
  - The coercion chapter relies on the overloading restrictions for a unique most specific declaration (`Specification/basic/conversions-coercions.tex`, section "Coercion Resolution": "The restrictions given in ... guarantee that such a T exists and that it is unique").
  - The Meet Rule for functional methods asks a declaration of a type that provides both (`Specification/advanced/overloading.tex`, "Meet Rule").
  - So the specification settles that the library owes a declaration of `IN` on `FullRange`. With it, the call resolves.
  - The base hid the gap because a numeral was a `ZZ32` and took the checker's no-coercion path.
  - Section 4 of the record names the ranges' `IN` as no rung's ("Neither: the ranges' `FORWARD_CMP` and `IN`"), so this is the fourth case: it lands, with a row.
- `(3).minimum` is the third outcome. The specification's prose names no getter of a numeral's type; the only prose mentions of `IntLiteral` are this rung's own sentences (`grep -rn IntLiteral Specification/basic Specification/basic-lib`: `literals.tex`, the `conversions-coercions.tex` callout, and the grammar nonterminal `IntLiteralExpr` in `comprehensions.tex:42`). So it takes a row. No gated program observes the checker over the one library, so the row is the whole home.

## Findings

1. **Two more numeral calls that the checker over the one library refuses at the head and accepted on the base, with no home** (differential 5).
   - The repair round's enumeration covered the members of `Integral[\I\]` and a few top-level functions (`NumeralOnly.fss`, 29 calls). It reached neither of these two kinds:
     - a numeral `IN` a `#` or `:` range (five calls of `SkqR2b`, and `4 IN (2:6)` in `SkqR2g`);
     - `ZZ32`'s getters `minimum` and `maximum` on a numeral.
   - The structured summary says "NumeralOnly, SkqCk2, NumeralCk and NumeralCk2 report no error". That is true and scoped to those probes.
   - The FACTS entry's title, "declares the members a numeral no longer reaches through `ZZ32`", reads as complete, and is not.
   - The `IN` case is the one that matters at the switch-over. An interpreter test of the corpus writes it (`ProjectFortress/tests/RangeZZ32RungJ.fss:71-75`, `4 IN (2:6)` among them, the `:` range form that `SkqR2g` refuses). The checker over the one library will meet it there when the switch-over compiles those programs.
2. **The dormant-code map goes stale.**
   - `explorations/coordinator/map/dormant-code.md:44` lists `IntLiteral`'s 19 operators as "finished, unwired" under the team's warning, and ledger row 318's note says the same arithmetic "stays open" under that note.
   - This rung enables the block.
   - The map is the document every agent is told to read. `record.md` should carry the line for the gather.
3. **Checked and holding.**
   - The provenance block. I opened every line: base `FortressBuiltin.fsi:169` and `:177-198`; base `XXXIntegerMaxNumRungM.fss:20`; `CompilerBuiltin.fsi:390-431`, `:104`, `:148`, `:211`, `:274`, `:333` and `:429-430`; base `FortressLibrary.fsi:574-579` and `.fss:712-715`; `FortressLibrary.fss:671-673` and `:711-712`; `FortressBuiltin.fsi:179-180`, `:199` and `:213-219`; `FortressLibrary.fsi:635` and `:657-666`; base `:466`; `ReflectiveQuickCheck.fss:147`; `literals.tex:132-165`; `conversions-coercions.tex:405-410` and `:473-575`; `basic-integers.tex:524-527` and `:625-645`.
     - Each says what the block says. `glue/prim/IntLiteral.java:34-37` holds the native constructor at `:35-37`.
     - The `historical:` line names every file of the 2012 tree that the diff edits.
   - The test messages:
     - `IntLiteralValue.fss` and `XXXNumeralWithNN32.fss` carry one comment line each.
     - Their citations name sections whose text says what the message says: `literals.tex`, section "Literals" (`:146-153`); `conversions-coercions.tex`, section "Principles of Coercion" (integer numerals convert to `RR64`); section "Coercion Resolution"; and `basic-integers.tex`, section "Integers" (`opr ^`: "If the power is 0, then the result is always 1, even if the base is 0"; `MAXNUM`).
     - The six reworded messages of `IntegerOrderNumerals.fss:70-75` say what they pin, with no citation.
   - `record.md`. Its cited lines are right (`FortressLibrary.fss:732-733`, `:824-825`, `:907-908`, `:992-993`; `FortressBuiltin.fss:413-414`, `:553`; `FortressLibrary.fsi:299`, `:400`, `:486`, `:531`, `:588`, `:646`; `FortressBuiltin.fsi:132`; `FortressLibrary.fss:702-704`). Row 561 is dropped as the judge allowed. Row 563 states that the specification is silent, and my grep above confirms it.
   - The Appendix I Effect now says what walk reaches. Its "or answered at Q" wording matches my first round's `SkqNN` on the base (`u MAXNUM 1` gave `5 QQ`).
   - The precedent. `zero` and `one` take `ZZ32`'s form (`Library/FortressLibrary.fss:711-712`). `floor`, `ceiling` and `truncate` take `Integral`'s bodies (`:671-673`). `DIVIDES`, `even` and `odd` read through `asZZ`, as `QQ`'s coercion does (`:566`). The `TIMES` api line matches its body. `ZZ`'s api lines take `ZZ64`'s form (`Library/FortressLibrary.fsi:609-618`). The same api omission elsewhere is counted: `Integral`'s floor brackets and `round`, row 564.
   - The decisions. The numeral switch's Q-lib is built as worded and the compiler library is untouched. Answer 8 holds (first round, `SkqCmp` `B10`). R9 remains a fork for Pavol, as the judge ruled.
   - Check 7. The repair round adds no top-level name. `IntLiteral`'s and `ZZ`'s members are members of types this rung owns.

## Required corrections (the commit stage closes these)

1. **Homes for finding 1.**
   - REPORT section 6 (the table and the paragraph after it) and section 14 add the two kinds of call, with the probe lines above:
     - a numeral `IN` a `#` or `:` range, refused at the head with "Ambiguous coercion in call to operator IN ... (ZZ32, Range[\ZZ32\])->Boolean; (ZZ32, Generator[\ZZ32\])->Boolean";
     - `(3).minimum` and `(3).maximum`, "IntLiteral has no getter called minimum".
   - Each gets a provisional row: recommendedRows 1 and 2 of this judgement, whose text the gather opens.
   - `record.md`'s FACTS entry scopes its title to "the members of `Integral[\I\]` and the getters `zero` and `one`" and names the two refusals left, with their rows.
   - The structured summary says the same.
2. **`record.md` carries a line for the gather.**
   - `explorations/coordinator/map/dormant-code.md:44`, the row of `IntLiteral`'s operators "finished, unwired", is wired by this rung (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:194-219`, `.fss:515-559`).
   - Ledger row 318's sentence that the interpreter's arithmetic "stays open" under the team's note gets a note saying the same.

## Stops met

- **The `unsigned` stop**, as in the first judgement, kept by the judge. Evidence: `Library/FortressLibrary.fsi:635` with base `Library/FortressLibrary.fsi:466`. It is lifted by POSITIONS.md:98, "Reversible stops do not hold a batch".

No other reserved stop is met by the repair round:
- Its changed walk outputs are accounted for: two overload listings and the five new and one gone test.
- It adds no comparison.
- It touches no team test line, the compiler library, the checker, walk's evaluator, `Number`'s `=` or a declaration of rung M's.
- The microGPT checks were not re-run, as the judge ruled: no walk numeral reaches `IntLiteral`'s members, and `ZZ`'s api lines change no body.

## For Pavol

- **A numeral `IN` a `#` or `:` range** is refused by the compiled checker over the one library since the numeral became a sibling. Evidence: `SkqR2b`, `SkqR2g`; `Library/FortressLibrary.fsi:2179`, `:828`, `:2254-2262`; `ProjectFortress/tests/RangeZZ32RungJ.fss:71`.
  - The repair is a declaration of `IN` on `FullRange`, the meet the functional-method Meet Rule asks for. Section 4 of the record gives the ranges' `IN` to no rung, so it waits for whoever takes the ranges' Meet Rule pairs.
  - Until then the switch-over meets it in interpreter tests like `RangeZZ32RungJ`.
- The judge's and the worker's entries stand unchanged: R9 against answer 8, the `unsigned` stop, `IntLiteral`'s own declarations, `z = 0` and `Number`'s catch-all, `Library/ReflectiveQuickCheck.fss:147`, and the microGPT inputs.

## Recommended rows

1. **Under the compiled checker over the one library, a numeral `IN` a range built with `#` or `:` is refused since climb batch 8's rung Q made `IntLiteral` a sibling under `Number`.**
   - The calls: `3 IN (0#5)`, `3 IN (1:5)`, `4 IN (2:6)`, `3 IN (0#z)`, `(3 + 1) IN (0#5)`, and `3 IN r` for an `r` of type `CompactFullRange[\ZZ32\]` or `FullRange[\ZZ32\]`. The message: "Ambiguous coercion in call to operator IN: of the declarations applicable to an argument of type (IntLiteral, CompactFullRange[\ZZ32\]) only by coercion, none is more specific than every other: (ZZ32, Range[\ZZ32\])->Boolean; (ZZ32, Generator[\ZZ32\])->Boolean."
   - The base accepted all of them, and a typed `z IN (0#5)` is still accepted.
   - The cause: `FullRange[\I\]` provides `Range[\I\]`'s `IN` and `Generator[\I\]`'s through `Indexed` (`Library/FortressLibrary.fsi:2179`, `:828`, `:1245`) and declares none on their meet (`:2254-2262`). That is a Meet Rule gap the base hid, because a numeral was a `ZZ32` there and the call needed no coercion.
   - Specification: `Specification/advanced/overloading.tex`, "Meet Rule" (functional methods); `Specification/basic/conversions-coercions.tex`, section "Coercion Resolution" (the restrictions guarantee a unique most specific declaration).
   - Probe: the skeptic's `SkqR2b.fss` and `SkqR2g.fss`, `check.sh <Name> base` against `edit3`. Walk prints `true` for each, on base and head alike (`SkqR2in`), and the compiled run prints `false` (row 479).
   - The repair: an `opr IN(n: I, self)` on `FullRange`. It is in the ranges' declarations, which climb batch 8 gives to no rung.
   - Status: NEGATIVE-VERIFIED, library gap vs spec. The row is the home, since no gated program observes the checker over the one library before the switch-over. `ProjectFortress/tests/RangeZZ32RungJ.fss:71` is the corpus line the switch-over will meet.
2. **Under the compiled checker over the one library, `(3).minimum` and `(3).maximum` are refused, "IntLiteral has no getter called minimum".**
   - These are `ZZ32`'s getters (`Library/FortressLibrary.fsi:534-535`), which a numeral reached as a `ZZ32` on the base. The one library's `IntLiteral` does not declare them, and neither does the compiler library's (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390-431`).
   - The specification is silent on a numeral type's getters.
   - Probe: the skeptic's `SkqR2f.fss`, `check.sh SkqR2f base` (no error) against `edit3` (2 errors).
   - Home 3, the row alone. The open question is whether a numeral has range bounds at all, which its own type, being unbounded, suggests it has not.

---

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
