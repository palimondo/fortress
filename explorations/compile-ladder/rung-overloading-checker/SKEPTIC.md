# Rung O, second skeptic: approved, with required corrections

**Verdict: approved, with the required corrections of section 9.** Both grounds of my first refusal are repaired and gated, each repair is seen failing before its edit and passing after, and the change does what the judge's ruling says and nothing else. The per-provider check now reads every functional method a component's type inherits from an api, and it compares the meet without the self parameter wherever it sits. My own programs of both shapes give the verdicts the specification gives.

The judgement found three defects the rung does not name and one false premise in its report:
- **A code-generation defect the rung's acceptance newly reaches** (section 3): an object that declares the meet of two functional methods whose self parameter is not first, narrower than each in a different parameter, now passes the checker and dies at class load, "ClassFormatError: Duplicate method name". The specification makes the program valid, so its home is 2; I wrote the test pair and showed it through the harness.
- **The premise of the judge's decision 1 is false** (section 4): an object need not declare its own implementation of an abstract functional method. The compiled checkers accept an object that inherits an abstract and a concrete declaration of one name from two traits and declares none, and run the concrete one. This is older than the rung (the base does the same), so it is a row and a correction of the report's reasoning, not a refusal.
- **An older code-generation defect** (section 5): `ClassCastException` on a call to a functional method overloaded in an object with self last.
- **The rest of the self-first assumption** (section 6): one site is left, an error message, older than the rung, and two precedents for dropping self at its position were missed.

None of these makes the change wrong. Each is a required correction or a recommended row.

Tree: `wip/rung-overloading-checker` at `027efdeb3`, base `493b4076f`, the repair's test-only commit `35c7f177d`, the pre-repair code `bf759afcb`, and the repair's code `0a3350fa2`, unchanged since: `git diff 0a3350fa2 HEAD -- ProjectFortress/src Library ProjectFortress/LibraryBuiltin` is empty.

I built each state from scratch: the base twice, the pre-repair once and the head twice. Each build was `git checkout <commit> -- ProjectFortress/src`, then `bash tmp/rung-overloading-checker/repair/rebuild.sh`, which runs `ant compileAll`, restores `global.map`, wipes the caches and does the library-order rebuild. Every build ended "BUILD SUCCESSFUL" with each of the five library compiles `rc=0`. The source was restored with `git checkout HEAD -- ProjectFortress/src` after each, and the worktree is clean.

My programs are under `tmp/rung-overloading-checker/skeptic/r2/`. In what follows:
- "compiled" means `bin/fortress compile` then `bin/fortress run`, with the component's cache entries removed first (`r2/run.sh`, `r2/run2.sh`);
- "walk" means `bin/fortress X.fss`.

Everything ran at one thread. The diff touches no mutable variable, field, atomic block or library write.

## 1. The failure, seen by me (check 3)

The repair's seven new tests, through `bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> ProjectFortress/compiler_tests <the seven .test files>`, run on three code states:
- the base: `r2/phases.sh`, label `sk2-base`, the src at `493b4076f`;
- the pre-repair: the same script, label `sk2-prerepair`, the src at `bf759afcb`;
- the head: `r2/junit-head.sh`, label `sk2-head`.

| test | base | pre-repair | head |
|---|---|---|---|
| `XXXFunctionalMethodMeetInheritedFromApi` | "Invalid overloading of pick in API FunctionalMethodPairApi", "Saw failure, but did not satisfy compile_err_contains", "Tests run: 1,  Failures: 1" | clean compile, "Saw failure, but did not satisfy compile_err_contains; expected / Invalid overloading of pick in trait Z", "Tests run: 1,  Failures: 1" | "Invalid overloading of pick in trait Z:", "Saw expected failure", "OK (1 test)" |
| `FunctionalMethodMeetInheritedFromApi` | the api refused, "Tests run: 3,  Failures: 3" | "OK (3 tests)" | ". run ... (451ms) PASS", "OK (3 tests)" |
| `FunctionalMethodMeetSelfSecond` | refused at the top level and "Invalid overloading of pick in trait C:", "... of IN in trait C:", "Tests run: 3,  Failures: 3" | "Invalid overloading of pick in trait C:", "Invalid overloading of IN in trait C:", "Tests run: 3,  Failures: 3" | ". run ... (479ms) PASS", "OK (3 tests)" |
| `XXXFunctionalMethodMeetSelfSecondNoMeet` (guard) | "Saw expected failure" | "Saw expected failure" | "Saw expected failure" |
| `XXXFunctionalMethodMeetJoinOfClosedTraits` (the memo) | clean compile, "Saw failure, but did not satisfy compile_err_contains; expected / Invalid overloading of side in trait Join", "Tests run: 1,  Failures: 1" | "Saw expected failure" | "Invalid overloading of side in trait Join:", "Saw expected failure" |
| `InheritedFunctionalMethodStaticParamSameName` (`typecheck`) | "Invalid overloading of gen in trait Pair: ... [\R extends Object\](Gen[\Pair[\R\]\], Pair[\R\], Pair[\R\]->R)->R", "Tests run: 1,  Failures: 1" | "OK (1 test)" | ". typecheck ... OK", "OK (1 test)" |
| `XXXFunctionalMethodMeetObjectExpression` (row 568) | "Invalid overloading of pick in component XXXFunctionalMethodMeetObjectExpression", "Saw failure, but did not satisfy compile_exception_contains", "Tests run: 1,  Failures: 1" | "OK Saw expected exception" | "OK Saw expected exception", "OK (1 test)" |

That is what the report quotes, in every cell.
- Finding 1's test fails on the pre-repair head and passes on the repair; so does finding 2's.
- The memo's test and the capture's functional-method test fail on the base and pass on both edits.

In the same head run, these keep their verdicts:
- the first pass's three: `FunctionalMethodMeetPerProvider`, `GenericTraitExcludesKindEnv` and `InheritedMethodStaticParamSameName` each end ". run ... PASS", "OK (3 tests)";
- `XXXFunctionalMethodMeetBetweenTraits` and `XXXComprisesMeetFunctionalMethodUncovered`: "Saw expected failure";
- `ComprisesMeetGenericTraitLink`: "OK (1 test)";
- `XXXComprisesMeetGenericTrait`: "Saw expected failure (Exit code != 0)".

The whole-suite run was the worker's, once, on the head's code state, and I read it rather than repeat it:
- `tmp/rung-overloading-checker/tracks/head.txt` is `0a3350fa2`;
- `compiler.txt` ends "OK (983 tests)", "EXIT_compiler=0";
- `library.txt` ends "OK (86 tests)", "EXIT_library=0".

I also re-ran the first skeptic's programs at the head with the worker's script (`bash tmp/rung-overloading-checker/repair/probes.sh sk2-head`):
- `SkFmUse`, `SkFmUse2` and `SkFmUse3`: "Invalid overloading of pick in trait Z";
- `SkSelfAtOne`: `C`, `A`;
- `SkInAtOne`: `true`;
- `SkNoMeetSelfAtOne` and `SkNoMeetTwoParams`: refused "in trait D";
- `SkMixedTop`: refused as on the base;
- `SkUnrelatedOnly`: `A B`.

These are the report's claims.

## 2. Differentials (my own programs)

| program | what it is | walk | compiled, base | compiled, pre-repair | compiled, head | verdict |
|---|---|---|---|---|---|---|
| `SkMidUse` (api `SkMidApi`) | object extends two api traits, `pick(n: ZZ32, self, s: String)`, no meet | `a` | api refused (function rule) | runs `a` | "Invalid overloading of pick in trait Z" | compiled right (Meet Rule for Functional Methods); walk is row 544 |
| `SkMidUseMeet` | the same with the object's own `pick` | `z`, `a` | api refused | `z`, `a` | `z`, `a` | agree |
| `SkMidMix` | api trait beside a local trait, no meet | `a` | api refused | crash "Not in the trait table: Fa" | refused "in trait Z" | compiled right |
| `SkMidMixMeet` | the same with the meet | `a`, `z` | (not run) | (not run) | `a`, `z` | agree |
| `SkGenUse` | generic api trait `Fg[\ZZ32\]` beside `Fh`, `tag(self, x)`, no meet | `h` | api refused | runs `h` | refused "in trait Z" | compiled right |
| `SkSelfMid` | self second of three, `C` declares the meet, narrower than each parent in a different parameter | `C`, `A` | refused at the top level and in trait C | refused in trait C | compiles; run dies at class load, `ClassFormatError: Duplicate method name "pick?1"` | the checker is right, code generation wrong: section 3 |
| `SkSelfMidWide` | `C`'s own `pick` wider than `A`'s in `s` | refused | refused | refused | refused "in trait C" (two errors) | agree |
| `SkSelfMidNoMeet` | no meet | refused | refused | refused | refused "in trait C" | agree |
| `SkNarrowFirst`, `SkNarrowOne`, `SkNarrowSecond`, `SkSelfMidSame`, `SkSelfMidOneSide`, `SkDotNarrow` | the narrowing meet with self first; one parameter; self second of two; self in the middle with equal types; one parent; dotted | as compiled | `SkNarrowFirst` refused at the top level | (not run) | each `REACHED` and the right declarations (`A`/`C`) | agree |
| `SkNarrowLast` | as `SkSelfMid`, self last of three | `REACHED`, `A`, `C` | (not run) | (not run) | `ClassFormatError: Duplicate method name "pick?2"`, before `REACHED` | section 3 |
| `SkAbsConc` | `A` declares abstract `pick(self)`, `B` a concrete one, `object O extends { A, B }` declares none | `InterpreterBug: ... MethodClosure pick(self:A) ... has neither body nor def` | compiles, `b`, `b` | `b`, `b` | `b`, `b` | specification refuses; both compiled states accept: section 4 |
| `SkAbsConcDot` | the same with a dotted `m()` | `InterpreterBug` (same) | "Invalid overloading of m in trait O" | refused | refused | compiled right |
| `SkAbsTrait` | `trait Z extends { A, B }` over two abstract `pick(self)`, object below declares its own | `o` | `o` | `o` | `o` | specification refuses `Z`; no run-time ambiguity (section 4) |
| `SkAbsApiUse` | object extends an api trait (concrete there) and a local trait with an abstract `pick`, none of its own | `a`, `a` | api refused | `a`, `a` | `a`, `a` | as `SkAbsConc` |
| `SkNarrowLastOld` | `A`'s `pick(n: N0, s: S1, self)`, `object C extends A` declaring `pick(n: N1, s: S0, self)` and the meet `pick(n: N1, s: S1, self)` | `REACHED`, `C1`, `C0` | `REACHED`, `C1`, then `ClassCastException: class SkNarrowLastOld$C cannot be cast to class SkNarrowLastOld$N1` | (not run) | the same | older code-generation defect: section 5 |
| `SkDupSelfSecond` | two `pick(n: N1, self)` in one trait | refused "their parameter lists have the same types" | "same parameter type: (B)" in the trait, "(N1, B)" at the top level | (not run) | the same | message defect, older: section 6 |

The commands:
- the `api` and `SkAbs*`/`SkSelfMid*` rows: `bash tmp/rung-overloading-checker/skeptic/r2/run.sh <label> [walk]`, run by `phases.sh` for base and pre-repair and by `junit-head.sh` for the head;
- the others: `bash tmp/rung-overloading-checker/skeptic/r2/run2.sh <label> walk <names>`;
- the second base build for `SkNarrowLastOld`, `SkDupSelfSecond` and `SkNarrowFirst`: `r2/phases2.sh`.

The head lines that the findings rest on:
```
########## [head] run SkSelfMid
java.lang.ClassFormatError: Duplicate method name "pick?1" with signature "(LSkSelfMid$N1;LSkSelfMid$S0;)Lfortress.CompilerBuiltin$String;" in class file SkSelfMid$C
Exception in thread "main" java.lang.NoClassDefFoundError: SkSelfMid$C
########## [base] run SkAbsConc
b
b
########## [head] run SkAbsConc
b
b
########## [base] run SkNarrowLastOld
REACHED
C1
Caused by: java.lang.ClassCastException: class SkNarrowLastOld$C cannot be cast to class SkNarrowLastOld$N1 (...)
```

## 3. Finding A: a valid meet with self not first now dies at class load (home 2, owed)

`SkSelfMid` (`r2/loc/SkSelfMid.fss`) has:
- `A`'s `pick(n: N0, self, s: S1)` and `B`'s `pick(n: N1, self, s: S0)`, with `N1 extends N0` and `S1 extends S0`;
- `object C extends { A, B }` declaring `pick(n: N1, self, s: S1)`.

`C`'s declaration is the meet of the two without the self parameter, and `C <: A ∩ B`. So the overloading is valid (`Specification/advanced/overloading.tex`, section "Meet Rule", the Meet Rule for Functional Methods). A call runs its most specific applicable declaration (`Specification/basic/overloading.tex`, section "Overloading Resolution"). Walk prints `C`, `A`.

On the two compiled states before the head:
- the base refused it at the top level and in trait C;
- the pre-repair head refused it in trait C (finding 2).

The repair's checker accepts it, rightly. Code generation then writes two methods `pick?1` with `B`'s erased signature into `SkSelfMid$C`, and the class fails to load before the run prints anything.

What decides the failure:
- self first (`SkNarrowFirst`) and a one-parameter narrowing with self second (`SkNarrowSecond`) run;
- equal parameter types with self in the middle run, as `FunctionalMethodMeetSelfSecond` does;
- self last with the same two-parameter narrowing fails the same way (`SkNarrowLast`, "pick?2").

So the defect needs the self parameter after the first position and a meet narrower than each inherited declaration in a different parameter.

This is a code-generation defect that the rung's correct acceptance newly reaches. It belongs with rows 562 to 564, which the worker homed the same way, but it is not among them. A program the checker accepts that then fails JVM verification at run time has its home in 2 (the shared prefix), and the test is owed in this batch.

I wrote the pair, under names by topic, in `tmp/rung-overloading-checker/skeptic/r2/jt/`:
- `XXXFunctionalMethodMeetNarrowedSelfNotFirst.fss`: one comment line, `println("REACHED")`, then two asserts citing `overloading.tex` sections "Meet Rule" and "Overloading Resolution", then `PASS`;
- `FunctionalMethodMeetNarrowedSelfNotFirstLink.test`: `link`;
- `XXXFunctionalMethodMeetNarrowedSelfNotFirst.test`: `run`, `run_out_does_not_contain=REACHED`, since it dies before any output.

Through the harness on the head (`junit.sh sk2-cfe tmp/rung-overloading-checker/skeptic/r2/jt FunctionalMethodMeetNarrowedSelfNotFirstLink.test XXXFunctionalMethodMeetNarrowedSelfNotFirst.test`):
```
. link tmp/rung-overloading-checker/skeptic/r2/jt/XXXFunctionalMethodMeetNarrowedSelfNotFirst  OK (time = 5058ms)
OK (1 test)
. run tmp/rung-overloading-checker/skeptic/r2/jt/XXXFunctionalMethodMeetNarrowedSelfNotFirst (276ms) java.lang.ClassFormatError: Duplicate method name "pick?1" ...
Saw expected failure (Exit code != 0)
OK (1 test)
```

As a stand-in for a fix I used its copy with the self parameter first (`r2/jtfix/`, `junit.sh sk2-cfe-fix ...`). That copy prints "REACHED" and "PASS", and the XXX run test goes red: "Failed to satisfy run_out_does_not_contain; expected / REACHED", "Tests run: 1,  Failures: 1,  Errors: 0". Required correction 1.

## 4. Finding B: the judge's decision 1 rests on a premise the compiled checkers do not hold (older; report correction and a row)

The decision is to leave a component's own abstract functional methods unread by the per-provider check (`OverloadingChecker.scala:139-141`). It was argued from "An object below such a trait must implement every abstract method it inherits, and its own declaration is then the meet, so these pairs carry no run-time ambiguity" (`JUDGE.md`, decision 1 (a)). The report repeats the argument: in section 5 (3), "for pairs an object must implement anyway, where its own declaration is the meet"; in section 11; and in `forPavol`'s first entry.

The object need not declare its own, and that is what `SkAbsConc` shows:
- `A` declares an abstract `pick(self)`, `B` a concrete one, and `object O extends { A, B } end` declares none;
- it compiles on the base, the pre-repair and the head, and every run prints `b`, `b`, the second for `x: A = O`;
- walk stops with an `InterpreterBug`, picking `A`'s abstract declaration (row 100's mechanism).

**What the specification says.** The program is invalid twice over:
- `O` inherits `A`'s abstract method and "any object inheriting an abstract method must define a body expression for the method" (`Specification/basic/traits.tex:571`);
- `O` provides both declarations and no declaration on their meet (`Specification/advanced/overloading.tex`, section "Meet Rule"; "provides", `traits.tex:528-529`).

**Why both compiled checkers accept it:**
- The abstract-method checker counts any concrete declaration that `O` inherits, whose domain without self is below, as the implementation (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:90-103`).
- On the base, `A`'s abstract declaration was in neither the component's top-level set (`onlyConcrete`, `OverloadingChecker.scala:80-83`, `:121`) nor the per-provider set.

**The team's own dotted check reads abstract declarations.** `toMethodArrows` has no body filter (`OverloadingChecker.scala:169-171`), and the dotted twin `SkAbsConcDot` is refused on the base and the head, "Invalid overloading of m in trait O". So "as 2012" holds for functional methods only.

**What it means for the rung.** The rung neither causes nor widens this; it is not a stop met, and decision (b) stays the judge's to have taken. But the report's reason for it is false as a statement of what the compiled checkers do, and the FACTS entry's "Every type that provides both must provide the meet" overstates the check. The two-unit form `SkAbsApiUse` behaves the same on the pre-repair and the head.

`SkAbsTrait` is the case decision 1 does make safe: two abstract declarations, and an object below that declares its own. It runs `o` on the base and the head; the specification refuses `Z`, but no call is ambiguous at run time.

Home: no gated test can hold an over-acceptance by the compiled checker, since an XXX compile test demands a refusal that the checker does not give. So the row alone is its home, as row 487's is. Required correction 3 and recommended row R2.

## 5. Finding C: an older code-generation defect, self last (home 2, owed)

`SkNarrowLastOld` is a single object `C extends A` with:
- `A`'s `pick(n: N0, s: S1, self)`;
- `C`'s own `pick(n: N1, s: S0, self)` and `pick(n: N1, s: S1, self)`.

The base's checker accepts it as the head's does. The run prints `REACHED` and `C1`, then dies on `pick(N1o, S0o, C)`: "ClassCastException: class SkNarrowLastOld$C cannot be cast to class SkNarrowLastOld$N1". Walk prints `C1`, `C0`, which is the specification's answer (`Specification/basic/overloading.tex`, section "Overloading Resolution": `C0` is the only applicable declaration).

The defect is not caused by the rung. I measured it in this batch, so its test is owed here.

The pair is in `tmp/rung-overloading-checker/skeptic/r2/jt2/`:
- `XXXFunctionalMethodOverloadSelfLast.fss`;
- `FunctionalMethodOverloadSelfLastLink.test`: `link`;
- `XXXFunctionalMethodOverloadSelfLast.test`: `run`, `run_out_contains=REACHED`.

Through the harness on the head (`junit.sh sk2-cce tmp/rung-overloading-checker/skeptic/r2/jt2 FunctionalMethodOverloadSelfLastLink.test XXXFunctionalMethodOverloadSelfLast.test`):
- the link test: "OK (1 test)";
- the run test: "REACHED", "java.lang.ClassCastException", "Saw expected failure (Exit code != 0)", "OK (1 test)".

The self-first copy (`r2/jt2fix/`) prints "REACHED" and "PASS", and its XXX run test goes red: "Did not see expected failure", "Tests run: 1,  Failures: 1". Required correction 2 and recommended row R3.

## 6. The self-first assumption elsewhere, and two missed precedents (check 5)

The repair removed the self-first assumption from `meetRule` (base `:516`). Of the callers of `makeDomainFromArrow(_, isMethod)` (`grep -rn "makeDomainFromArrow(" ProjectFortress/src/com/sun/fortress`), one site with the assumption is left that functional methods reach: the duplicate-declaration message at `OverloadingChecker.scala:423`. `isMeet` itself (`OverloadingOracle.scala:338-341`) is now reached with `isMethod = true` only by dotted methods, where the first element is the receiver.

`SkDupSelfSecond` shows the message, the same on the base and the head:
- in the trait, "There are multiple declarations of pick with the same parameter type: (B)";
- at the top level, "... (N1, B)".

The parameter `N1` is dropped and the self type is kept. It is a message defect, older than the rung; recommended row R4.

The report's precedent search names `makeDomainFromArrow(a, true)` as the team's way to leave the receiver out. The team also drops the self parameter at its own position, twice, in `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala`:
- `makeArrowFromFunctional(f, _, omitSelf = true, _)`, `take(selfPosition) ++ drop(selfPosition + 1)` (`:157-168`), used by the abstract-method checker through `makeArrowWithoutSelfFromFunctional` (`:134-137`; `AbstractMethodChecker.scala:95`, `:99`);
- `paramTypeWithoutSelf` (`:1764-1775`).

Both take a `Functional`, before the replacer and the capture renaming. `withoutSelf` works on the instantiated arrow and keeps `makeDomainFromArrow`'s tuple shape, which is why it gives the base's domain at position 0. So the worker's helper is justified, but the report should name these two. Required correction 4.

## 7. The rest of the checks

- **Provenance block (check 2).** I opened every line with `sed -n` at the base or the head, as each line states:
  - `XXXFunctionalMethodMeetPerProvider.fss:1` and `XXXGenericTraitExcludesKindEnv.fss:1` at the base; `triage.md:76`, `:24-27`; `distance.txt:51-55`, the five `Character` crash rows; `SKEPTIC.md:7`, `:33`;
  - `overloading.tex:469-523`, `:417-446`, `:525-529`; `traits.tex:518-529`, `:223-233`; `object.tex:35-37`, `:58-60`; `literals.tex:40`;
  - `OverloadingChecker.scala` at the base: `:282-320`, `:133`;
  - `OverloadingChecker.scala` at the head: `:80-88`, `:121`, `:227`, `:231`, `:244`, `:181-202`, `:131-166`, `:584-586`, `:594-602`;
  - `TypeSchemaAnalyzer.scala:67-72`; `SNodeUtil.scala:192-204`, `:344-356`; `STypesUtil.scala:1522-1545`;
  - `Types.java:77-88` at the base, `:65`, `:79`, `:86`; `FortressBuiltin.fsi:207`.

  Each says what the block says. The `spec:` line cites no `Specification/library/apis/`. The `historical:` line names the three 2012 files the diff edits.

  I also opened the report's library citations: `RangeInternals.fsi:46`, `:65`, `:96`, `:400`, `:475`; `FortressLibrary.fsi:781`, `:2132`, `:2153`, `:2170`, `:2178`, `:2419`, `:2421`; `RangeInternals.fss:149`, `:180`, `:182`, `:185`, `:239`, `:241`, `:245`, `:491`; `String.fss:33`, `:41`; `FortressLibrary.fss:1319`; `CompilerAlgebra.fsi:21`; `CompilerBuiltin.fsi:231`; `AbstractMethodChecker.scala:71-72`, `:95`, `:99`, `:125`, `:135`. All say what the report says.
- **The diff (check 4).** The repair's two edits:
  - **`declaredInUnit` and the filter** (`OverloadingChecker.scala:139-141`, `:159-166`) decide by `TypeConsIndex` identity whether a trait is the unit's own. `TraitTable.typeCons` resolves a component's own name, or an api name the component exports, to the unit's index, and any other api name to that api's index (`scala_src/typechecker/TraitTable.scala:34-74`). An unresolved name reads as "not the unit's", the safe side.
  - **`withoutSelf` and the `a4` change** (`:584-586`, `:594-602`) compare the meet without self at its position, and the self type by the full-domain `lteq` already at `:582-583`. At position 0 the arrows are those `makeDomainFromArrow(_, true)` builds.
  - `coverageRule` and `coversOverlap` compare full domains with self (`makeDomainWithSelfFromArrow`, `OverloadingOracle.scala:204`, `:218`), so they carry no self-first assumption.
  - The edit is as small as the six tests need.
- **The tests (check 6).**
  - Each new file has one comment line and a name by topic; the api `FunctionalMethodPairApi.fsi`/`.fss` has one each.
  - The messages cite `overloading.tex`, section "Meet Rule", which exists (`Specification/advanced/overloading.tex:259`). The section says a disambiguating declaration is what runs (`:262-275`).
  - Two messages claim what that section does not say: `FunctionalMethodMeetInheritedFromApi.fss:13` and `FunctionalMethodMeetSelfSecond.fss:21`, "an object that provides one ... declaration runs that declaration". That is `Specification/basic/overloading.tex`, section "Overloading Resolution" (`:303-305`). Required correction 5.
  - `XXXFunctionalMethodMeetObjectExpression` keys on today's code-generation stop, the only failure today's run shows. It goes red when the checker refuses (seen on the base) or when code generation passes.
- **Competing declarations (check 7).** Each of the sixteen new or promoted components is declared once across `ProjectFortress/tests/` and every `*_tests/` directory, and the api twice, as an api and as its component. The two names that required corrections 1 and 2 would add are declared nowhere. `ownStaticParamsApart`, `functionalMethodsAtOnePosition`, `staticParamsInScope`, `declaredInUnit` and `withoutSelf` occur only in `OverloadingChecker.scala`, and `withClauseParams` only in `TypeAnalyzer.scala`, over `ProjectFortress/src/com/sun/fortress/`.
- **record.md (check 8).** The ledger notes cite existing rows 556, 557, 477, 546, 547, 545, 375 and 544, and renumber nothing. The new rows 559 to 568 are provisional, which is the gather's to number. I checked their statements against my runs:
  - 566's base and head behaviour (`SkFmUse*`);
  - 567's (`SkSelfAtOne`, `SkInAtOne`, the base's refusal of `FunctionalMethodMeetSelfSecond`);
  - 560's base failure (the table above);
  - 568's red base run and expected head run (the table above);
  - 559's base message.

  The base memo key is at `:452` and the base `isMeet` call at `:516`, as cited. The FACTS entry overstates in one sentence (section 4; required correction 3).
- **The three homes (check 9).**
  - **Home 1.** I ran each and saw it pass: `FunctionalMethodMeetPerProvider`, `FunctionalMethodMeetSelfSecond`, `XXXFunctionalMethodMeetInheritedFromApi`, `GenericTraitExcludesKindEnv`, `InheritedMethodStaticParamSameName`, `InheritedFunctionalMethodStaticParamSameName` and `XXXFunctionalMethodMeetJoinOfClosedTraits`. Row 477's home is the distance stage, whose `#crash` rows have no `Character` row (`tmp/rung-overloading-checker/distance-repair/distance.txt`).
  - **Home 2.** These are XXX-named with `.test` files the harness treats as expected failures; the tracks ran them green at `0a3350fa2`, and I ran `XXXComprisesMeetGenericTrait` and `XXXFunctionalMethodMeetObjectExpression` myself:
    - `XXXInheritedAbstractMethodStaticParamSameName`;
    - `XXXComprisesMeetGenericFunctions`;
    - `XXXGenericTraitGenericFunctionalMethod` with its link test;
    - `XXXGenericTraitFunctionalMethodOverride`;
    - `XXXComprisesMeetGenericTrait` with its link test;
    - `XXXFunctionalMethodMeetObjectExpression`;
    - `ProjectFortress/tests/XXXGenericTraitGenericFunctionalMethodWalk.fss`.
  - **Mine.** My own findings A and C need their pairs, and B and the message need their rows (section 9).
- **The count table (check 10).** `tmp/rung-overloading-checker/count-repair/checker-count-off.txt` has `#total 83`, `#crash none` and `#shadow matches the tracked StaticChecker`. `tmp/rung-overloading-checker/distance-repair/distance.txt` has `#total 607`, and its rows match the report's table: overloading 125, return type 30, typecheck 392, M1 125, R3 28, BR 10, OT 147, the units 24/54/3/1/1 and 293/114/73. Both totals match `REPORT.md`, `record.md` and the structured report.

  The per-site file `sites-vs-landed.tsv` gives 103 gone and 112 new:
  - 58 new in the apis (42 + 7 + 5 + 3 + 1) and 44 in the components only (42 + 2);
  - 9 typecheck sites new (6 unmasked, 3 BR);
  - 100 overloading sites gone (78 + 22).

  These are the report's figures. The befores are batch 7b's landed tables; `git log b0eb41516..493b4076f -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` printed nothing in the first judgement.
- **The ledger and the sibling sites (check 11).**
  - I searched the ledger for "abstract", "neither body", "Duplicate method", "ClassFormatError", "self position" and "selfPosition". Row 100 is walk's choice of an inherited abstract declaration (the mechanism of walk's crash on `SkAbsConc`), and row 405 is walk's untyped parameters. No row covers findings A, B or C or the message.
  - Row 544 covers walk's acceptance of `SkMidUse`, `SkMidMix` and `SkGenUse`.
  - The sibling sites of the repaired self-first defect are counted in section 6.
- **Decisions (check 12).**
  - **"The specification stays the standard."** Followed: the rule as built is the text's. Where the build departs from the text, the report says so: a component's own abstract declarations, and object expressions.
  - **"The library route."** No prelude declaration.
  - **"The library's own practice is the standard."** No library edit.
  - **Answer 9** ("The static-parameter sentence goes"): `satisfiesReturnTypeRule`, `satisfiesPositionalRule` and `returnTypeCheck` are untouched. The top level now runs `returnTypeCheck` on the pairs it accepts, which applies the rule to more pairs without changing it.
  - **"The comprises passages read at the level of values"**: `coverageRule` and `coversOverlap` are untouched, and batch 7b's coverage tests keep their verdicts in the tracks.
  - The landed text contradicts no decision.

## 8. Stops met, as the rung stands

- **"A compiled test whose verdict changes other than by O's intent"**, read with the record's "the expected failures of rows 543 and 546" keeping their verdict. `ProjectFortress/compiler_tests/XXXComprisesMeetGenericTrait.test:1-3` moved from a compile refusal to a run-stage `ClassCastException`, since the Meet Rule for Functional Methods makes the program valid. Reversible; lifted by POSITIONS, "Reversible stops do not hold a batch." (`explorations/coordinator/POSITIONS.md:98`).
- **"The Meet Rule dropped for a type that provides both functional methods", an object expression.** `OverloadingChecker.scala:331` (the per-provider loop visits declared traits and objects only) with `:534` (the top level accepts the pair). `XXXFunctionalMethodMeetObjectExpression.fss` is refused on the base and passed by the checker at the head, then stopped by code generation (row 375). Reversible; lifted by the same position.
- **Finding 1's form of that stop** (a component's type inheriting both declarations from an api) was met at `10d1e672b` and is no longer met: `XXXFunctionalMethodMeetInheritedFromApi` and my `SkMidUse`, `SkMidMix` and `SkGenUse` are refused at the head.
- **Not met:**
  - `SkAbsConc` is accepted by the base too, so no rule was dropped.
  - Row 545's family is refused as on the base (`SkMixedTop`).
  - There is no library edit, and no file of rung I's: `TypeAnalyzer.scala`'s edit is `pExcInner` and a private helper.

## 9. Required corrections (for the commit stage)

1. **Finding A's home 2.** Add the three files of `tmp/rung-overloading-checker/skeptic/r2/jt/` to `ProjectFortress/compiler_tests/` as they are:
   - `XXXFunctionalMethodMeetNarrowedSelfNotFirst.fss`;
   - `FunctionalMethodMeetNarrowedSelfNotFirstLink.test` (`link`);
   - `XXXFunctionalMethodMeetNarrowedSelfNotFirst.test` (`run`, `run_out_does_not_contain=REACHED`).

   They are shown through the harness in section 3. Open recommended row R1 and name it beside rows 562 to 564 in the report's defect homes and the record.
2. **Finding C's home 2.** Add the three files of `tmp/rung-overloading-checker/skeptic/r2/jt2/`:
   - `XXXFunctionalMethodOverloadSelfLast.fss`;
   - `FunctionalMethodOverloadSelfLastLink.test` (`link`);
   - `XXXFunctionalMethodOverloadSelfLast.test` (`run`, `run_out_contains=REACHED`).

   They are shown in section 5. Open recommended row R3.
3. **Decision 1's premise.** In `REPORT.md`, correct:
   - section 5 (3), "for pairs an object must implement anyway, where its own declaration is the meet";
   - section 11's second bullet;
   - `forPavol`'s first entry, "for pairs an object must implement anyway".

   Say that an object may implement an inherited abstract functional method by a concrete one inherited from another trait, which the compiled checkers accept with no meet (`SkAbsConc`, base and head; `AbstractMethodChecker.scala:90-103`), against `traits.tex:571` and the Meet Rule. In `record.md`'s FACTS entry, qualify "Every type that provides both must provide the meet" with the exception of a pair one of whose declarations is the component's own abstract one. Open recommended row R2.
4. **The precedent search.** Name the team's two ways of dropping self at its position, `makeArrowFromFunctional(_, _, omitSelf = true, _)` (`STypesUtil.scala:157-168`) and `paramTypeWithoutSelf` (`:1764-1775`), and why `withoutSelf` works on the instantiated arrow instead. Count the one self-first site left in the file, the message at `OverloadingChecker.scala:423` (recommended row R4).
5. **Two test messages** cite the section "Meet Rule" for what the section "Overloading Resolution" says. `FunctionalMethodMeetInheritedFromApi.fss:13` and `FunctionalMethodMeetSelfSecond.fss:21`, "an object that provides one ... declaration runs that declaration", should cite `overloading.tex`, section "Overloading Resolution" (`Specification/basic/overloading.tex:291-305`). No assertion changes.

## 10. Recommended ledger rows

- **R1.** The compiled path writes one method twice into an object's class when the object declares the meet of two inherited functional methods whose self parameter is not first, narrower than each in a different parameter:
  - `SkSelfMid`: `ClassFormatError: Duplicate method name "pick?1" with signature "(...N1;...S0;)..." in class file SkSelfMid$C`, at class load, before any output;
  - `SkNarrowLast`, self last: "pick?2";
  - self first, one narrowed parameter, or equal types: these run.

  Walk prints `C`, `A`. The program is valid (`Specification/advanced/overloading.tex`, section "Meet Rule"; `Specification/basic/overloading.tex`, section "Overloading Resolution"). It was reached since climb batch 8's rung O, as the base's checker refused it. Home 2: the pair of required correction 1. Codegen defect.
- **R2.** The compiled checkers accept an object that inherits an abstract functional method from one trait and a concrete one of the same name and parameter types from another, declaring none of its own, and run the concrete one: `SkAbsConc`, `b`, `b` on the base and since rung O, the second for a call typed by the abstract declaration's trait.
  - The abstract-method checker counts the inherited concrete declaration as the implementation (`AbstractMethodChecker.scala:90-103`).
  - The per-provider check reads no component-own abstract functional method (`OverloadingChecker.scala:139-141`), though it reads abstract dotted methods (`:169-171`; the dotted twin `SkAbsConcDot` is refused "Invalid overloading of m in trait O").
  - Walk: `InterpreterBug ... MethodClosure pick(self:A) ... has neither body nor def`, row 100's mechanism.

  Specification: `Specification/basic/traits.tex:571` ("any object inheriting an abstract method must define a body expression for the method"); the Meet Rule for Functional Methods with "provides" (`traits.tex:528-529`). Home: the row alone, as row 487's, since no XXX compile test can hold an over-acceptance. Checker defect.
- **R3.** The compiled call of a functional method with self last, overloaded in an object by its own declarations beside an inherited one, casts an argument to the wrong parameter type. `SkNarrowLastOld` prints `REACHED`, `C1`, then "ClassCastException: class SkNarrowLastOld$C cannot be cast to class SkNarrowLastOld$N1" on the call whose one applicable declaration is `C0`, on the base and since rung O. Walk prints `C1`, `C0`. The program is valid (`Specification/basic/overloading.tex`, section "Overloading Resolution"). Home 2: the pair of required correction 2. Codegen defect, older than climb batch 8.
- **R4.** The compiled checker's "There are multiple declarations of f with the same parameter type" message prints the domain without its first element, so for a functional method whose self is not first it names the self type in place of the first parameter (`OverloadingChecker.scala:423`, `makeDomainFromArrow(at, isMethod)`). `SkDupSelfSecond` gives "(B)" in the trait and "(N1, B)" at the top level, on the base and the head. Message defect; the specification is silent on messages; the row alone, quoting the two lines.

## 11. For Pavol

- Decision 1, what the per-provider check reads in a component, rests on a premise that the compiled checkers do not hold. An object need not declare its own implementation of an inherited abstract functional method, since the abstract-method checker accepts a concrete one inherited from another trait (`AbstractMethodChecker.scala:90-103`). So a component's own abstract declaration beside a concrete one of the same name is a pair that no check reads and that runs. `SkAbsConc` runs `b` for a call typed by the abstract declaration's trait, on the base and the head, against `traits.tex:571` and the Meet Rule.

  The rung neither causes nor widens it. The ways:
  - the per-provider check reads a component's own abstract functional methods, as its dotted check already reads abstract dotted methods (`OverloadingChecker.scala:169-171`), at the cost the judge named: each api site again in its component;
  - the abstract-method checker requires the object's own declaration where the concrete one it inherits is another trait's;
  - leave it, with row R2.

---

# Rung O, first skeptic: refused

**Verdict: refused.** The one thing that must change: the per-provider check, which now carries the Meet Rule for Functional Methods alone, must judge every trait or object that provides both declarations, at every self position. As built it skips the declarations a component's type inherits from an api, so a program the base refused now compiles and runs with no meet (finding 1), and it misjudges the meet when the self parameter is not first, so a type that declares its own meet is refused (finding 2). Each gets a home before the second skeptic: repaired with an assertion seen failing on the base, or an XXX test with a ledger row and the stop listed. The rest of the rung checks out: the three tests fail on the base and pass at the head as quoted, the capture and row 557 fixes give the verdicts the specification gives, row 477's crash rows are gone, and the tables match the report.

Tree: the branch `wip/rung-overloading-checker` at `10d1e672b`, base `493b4076f`, the test-only commit `573381500`. I built each state myself (`ant compileAll`, `global.map` restored, caches wiped, the library-order rebuild), the base twice and the head twice. My programs are under `tmp/rung-overloading-checker/skeptic/`. Below, "probe.sh" means `bin/fortress compile X.fss` then `bin/fortress run X` with the component's cache entries removed first, and "walk" means `bin/fortress X.fss`. Everything ran at one thread: the rung touches no mutable state, field, atomic block or write into a library's state.

## 1. Finding 1 (refusal): a component's type that inherits both functional methods from an api is checked by nothing

`toFunctionalMethodArrows` keeps only declarations with bodies when the unit is a component (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:137-139`). The declarations of an api's traits carry no body in the index. So when a component's type extends api traits, the functional methods it inherits from them are dropped from its per-provider check. The top-level relaxation (`:523`, `:548-557`) then accepts the pair, and no check is left for the type.

My program, `api/SkFmApi.fsi` with `.fss`: `trait Fa  pick(self): String end` and `trait Fb  pick(self): String end`. Then `api/SkFmUse.fss`, `import SkFmApi.{...}`, declares `object Z extends { Fa, Fb } end`, with no `pick` of its own, and runs `println(pick(Q))` for `object Q extends Fa`.

- **Base** (`573381500`, `bash tmp/.../skeptic/apirun.sh base`). The api is refused by the function rule, so the program is refused:
  ```
  ########## [base] compile SkFmUse.fss
      Invalid overloading of pick in API SkFmApi:
       SkFmApi.Fa->String @ SkFmApi.fsi:3:3-4:1
  File SkFmUse.fss has 1 error.
  ```
- **Head** (`10d1e672b`, `apirun.sh head`). The api compiles, as the text allows. `SkFmUse` compiles and its run prints `a` (rc=0).
- **The same declarations in one component** (`SkFmLocal.fss`) are refused at the head: "Invalid overloading of pick in trait Z: Fa->String ... and Fb->String".
- **What the specification says.** The program is invalid: `Z` provides both declarations and no declaration on their meet (`Specification/advanced/overloading.tex`, "Meet Rule", the Meet Rule for Functional Methods; "provides", `Specification/basic/traits.tex:528-529`). Walk prints `a` (row 544's walk defect).
- **The failure mode, loud to quiet.** `api/SkFmUse3.fss` binds `x: Fa = Z` and `y: Fb = Z` and prints `pick(x) " " pick(y)`. At the head it compiles, and the run prints `a   a` (walk prints `a a`). A call whose static type is `Fb` runs `Fa`'s declaration. The base refused the family at compile time; the head chooses `Fa`'s declaration silently.
- **The hole is older than the rung.** Its two-api form, `Fa` and `Fb` in two apis (`api/SkFmUse2.fss`, `apirun2.sh`), compiles and runs `a` on the base and on the head. On the base nothing refused it either: the top-level set of `SkFmUse2` holds no `pick`, and its per-provider check drops both declarations. The rung's relaxation widens the hole to the one-api case, which the base refused.

**What this falsifies in the report.**
- Section 5: "No pair the base checked goes unchecked". The base refused `SkFmUse`; the head checks `Z` nowhere.
- Section 12: "the Meet Rule is kept for every type that provides both functional methods". This meets the stop "The Meet Rule dropped for a type that provides both functional methods" (section 5 below).
- The decision "(4), taken: read what the top-level set reads". In a component it also drops every declaration a type inherits from an api, not only the component's own abstract ones. The report's decision does not name that case.

User programs live in components whose types extend the one library's api traits, so after the switch-over this hole covers every functional method they inherit.

## 2. Finding 2 (refusal): the per-provider check misjudges the meet when the self parameter is not first

`meetRule` asks `oa.isMeet(ha, fa, ga, isMethod, debug)` with `isMethod = true` in the per-provider check (`OverloadingChecker.scala:575`). `makeDomainFromArrow(a, true)` drops the domain's first element (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:67-72`). For a functional method that element is the self parameter only when self comes first. The worker read this ("Read, not measured", section 11), but gave it no test and no row. I measured it.

My two programs differ only in the self position. Two traits each declare `pick`, and `object C extends { A, B }` declares its own `pick`, the meet for `C`:
- `probes/SkSelfAtZero.fss`, `pick(self, n: ZZ32)`.
  - Head, probe.sh: compiles; the run prints `C`, `A`.
  - Walk: `C`, `A`.
- `probes/SkSelfAtOne.fss`, `pick(n: ZZ32, self)`.
  - Head, probe.sh:
    ```
    ########## [head] SkSelfAtOne: compile
        Invalid overloading of pick in trait C:
         (ZZ32, A)->String @ SkSelfAtOne.fss:4:3-35
     and (ZZ32, B)->String @ SkSelfAtOne.fss:7:3-35
    File SkSelfAtOne.fss has 1 error.
    ```
  - Walk: `C`, `A`.
  - Base: both this error and the top-level one.
- `probes/SkInAtOne.fss`, the library's own shape, `opr IN(n: ZZ32, self)`.
  - Head: "Invalid overloading of IN in trait C: (ZZ32, A)->Boolean ... and (ZZ32, B)->Boolean".
  - Walk: `true`.

**What the specification says.** It settles this against the compiled run, under the one reading the rung's own test needs. The Meet Rule for Functional Methods gives the self position no role beyond `i = j`. `FunctionalMethodMeetPerProvider` is valid only if the declaration in the providing object counts as the meet for that object, and `SkSelfAtOne` is that program with the self parameter second.

**What it does to the rung's figures and to the record.**
- 26 of the 64 new per-provider api sites are `IN`, with self second:
  - 23 in `api RangeInternals`;
  - 3 in `FullRange`, `CompactFullRange` and `StridedFullRange`.
- None of those types declares its own `IN`, so the sites are real under a correct check too.
- A declaration on the meet would not clear them while this defect stands: `SkInAtOne` declares one and is refused. The report's line for Pavol, "Each wants a library device of rung M's kind", is wrong for these 26 as the checker stands.
- The same defect sits under every family of the library whose self parameter is second: `IN` in the component and in the api.

## 3. The failure, seen by me (check 3)

On `573381500`, built from scratch (`ant compileAll`, `BUILD SUCCESSFUL`, the five library compiles rc=0), I ran `bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skbase ProjectFortress/compiler_tests FunctionalMethodMeetPerProvider.test GenericTraitExcludesKindEnv.test InheritedMethodStaticParamSameName.test`:
```
    Invalid overloading of toSeq in component FunctionalMethodMeetPerProvider:
     AsFilt->String @ ProjectFortress/compiler_tests/FunctionalMethodMeetPerProvider.fss:9:5-32
Tests run: 3,  Failures: 3,  Errors: 0
I is not in the kind env [][][]
Tests run: 3,  Failures: 3,  Errors: 0
 and [\R extends Object\](Gen[\Pair[\R\]\], Pair[\R\]->R)->R @ ProjectFortress/compiler_tests/InheritedMethodStaticParamSameName.fss:6:5-7:1
Tests run: 3,  Failures: 3,  Errors: 0
```
On `10d1e672b`, rebuilt, the same command with label `skhead`:
- `. run ProjectFortress/compiler_tests/FunctionalMethodMeetPerProvider (292ms) PASS`
- `. run ProjectFortress/compiler_tests/GenericTraitExcludesKindEnv (326ms) PASS`
- `. run ProjectFortress/compiler_tests/InheritedMethodStaticParamSameName (505ms) PASS`

Each ended "OK (3 tests)". This is as the report quotes.

The rung's expected failures, at the head through `junit.sh skhead-xxx` (link tests before their run tests):
- `ComprisesMeetGenericTraitLink` and `GenericTraitGenericFunctionalMethodLink`: "OK (1 test)".
- `XXXComprisesMeetGenericTrait`: "ClassCastException", "Saw expected failure (Exit code != 0)".
- `XXXGenericTraitGenericFunctionalMethod`: "REACHED", "NoSuchFieldError", "Saw expected failure".
- `XXXGenericTraitFunctionalMethodOverride`: "OK Saw expected exception".
- `XXXComprisesMeetGenericFunctions`, `XXXInheritedAbstractMethodStaticParamSameName` and `XXXFunctionalMethodMeetBetweenTraits`: "Saw expected failure".
- Batch 7b's `CoverageReturnGood`, `ComprisesMeetFunctionalMethod`, `XXXCoverageReturnGenericFamily` and `XXXComprisesMeetFunctionalMethodUncovered` keep their verdicts.
- The walk file, through `bash explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> ProjectFortress/tests/XXXGenericTraitGenericFunctionalMethodWalk.fss`: "OK Saw expected exception", "OK (1 test)".

The compiler and library tracks were not run again. The worker ran them once on `fff55e16b` (`tmp/rung-overloading-checker/tracks/`: "OK (973 tests)", "OK (86 tests)"). The code is unchanged since `bf759afcb`: `git diff bf759afcb 10d1e672b -- ProjectFortress/src Library ProjectFortress/LibraryBuiltin` is empty.

## 4. The memo: a test that fails on the base exists (required correction)

The report says no test file can show the memo's defect failing on the base under the harness (section 7, and the decision "The memo's test"). That is not so.

My program `probes/SkBetween.fss` has the same shape as the worker's, with other names and a different declaration order:
- `Left comprises { Mid, Both }` and `Right comprises { Both, Other }`, each declaring `side(self)`;
- `Mid extends Left excludes Other`;
- `Join extends { Left, Right } comprises { Both }`;
- `Both extends Join`, declaring `side(self)`.

**On the base** (`bash tmp/.../skeptic/memo.sh base SkBetween ...`, memo on and off by `-Dfortress.analyzer.overload.cache`):
- `SkBetween`: memo on "rc=0"; memo off "Invalid overloading of side in trait Join".
- `SkBetweenC`: the same.
- `SkBetweenB` and `SkBetweenD`: refused both ways.

**Through the harness on the base.** The program as `XXXSkBetween.fss`, with a `.test` of `compile` and `compile_err_contains=Invalid overloading of side in trait Join`, run by `junit.sh skbase-memo tmp/.../skeptic/jt2 XXXSkBetween.test`. In three runs of three:
```
 Saw failure, but did not satisfy compile_err_contains; expected
Invalid overloading of side in trait Join
Tests run: 1,  Failures: 1,  Errors: 0
```

**At the head:**
- all four orders are refused with the memo on and off;
- the harness gives "Saw expected failure", "OK (1 test)".

The worker's `XXXFunctionalMethodMeetBetweenTraits` does not fail on the base. My copy of it, through `ONE_JVM=1 junit.sh` after `CoverageReturnGood` in both orders on `573381500`, gave "Saw expected failure", "OK (4 tests)". It guards the head, but it is not the memo's failing test.

The hit still depends on hash order, so the gate's whole-suite JVM may differ on the base. On the head the verdict no longer depends on the order.

## 5. Stops met

- **"A compiled test whose verdict changes other than by this rung's intent".** The worker named this one. `ProjectFortress/compiler_tests/XXXComprisesMeetGenericTrait.test:1-3`: row 546's expected failure moved from a compile-stage refusal to a run-stage `ClassCastException`, against the record's "the expected failures of rows 543 and 546" keeping their verdict. I agree with the worker's reading. Under the Meet Rule for Functional Methods the program is valid: `V[\X\]`, the only type that provides both, provides its own `tag`. The new verdict is the specification's, and the run-time failure has its home-2 test. Reversible.
- **"The Meet Rule dropped for a type that provides both functional methods".** The worker did not name this one. `OverloadingChecker.scala:137-139` with `:523`: `SkFmUse` (finding 1) is refused on the base and compiles and runs at the head, with `Z` checked nowhere. Reversible, but it is a defect, and I refuse on it.

## 6. The diff against the specification (check 4)

- **The top-level relaxation** (`:523`, `:548-557`): two functional methods at one self position, with `!isMethod`. It matches the rule's first condition, `i = j`. A function beside a functional method is untouched. `probes/SkMixedTop.fss` is refused the same on the base and the head, "Invalid overloading of tag in component SkMixedTop: (T & {V, W})->ZZ32 ... and S->ZZ32", and walk refuses it ("first parameters s:[S] and self:[T] are unrelated"): row 545 unchanged. `probes/SkUnrelatedOnly.fss` (two unrelated traits, no type providing both) is refused on the base and runs `A B` at the head; walk prints `AB`.
- **The per-provider check still refuses a provider that lacks the meet.** `probes/SkNoMeetTwoParams.fss` (self first) and `probes/SkNoMeetSelfAtOne.fss` (self second) are refused at the head, "Invalid overloading of pick in trait D". Walk prints `A` for both (row 544). The check is sound where it reads; findings 1 and 2 are about what it does not read and how it compares.
- **The `implemented` filter** (`:149-154`) drops an abstract declaration only when a strict subtype's declaration has an equivalent arrow, self included. That is narrower than the specification's inheritance rule, which compares parameter types without self (`Specification/basic/traits.tex:520-527`), and harmless where the Subtype Rule settles the rest.
- **The capture** (`:173-191`, called at `:142` and `:162`): only clashing names are renamed, before the replacer, to the first free `R$n`. Both branches are verified against renamed copies:
  - Dotted, the worker's test.
  - Functional method, mine: `probes/SkCapFmGen.fss`, `Gen[\E\].gen[\R\](self, x: E, f: E -> R)` inherited by `Pair[\R\] extends Gen[\Pair[\R\]\]`, which declares `gen[\G\]`.
    - Base: "Invalid overloading of gen in trait Pair: ... [\R extends Object\](Gen[\Pair[\R\]\], Pair[\R\], Pair[\R\]->R)->R".
    - Head: the checker passes and code generation stops with "java.util.zip.ZipException: duplicate entry", the same verdict the renamed copy `SkCapFmGenRenamed` (`gen[\Q\]`) gives on the base and the head. That is row 563's defect.
    - Walk: "Missing type G" for both.
  - The functional-method branch has no gated assertion (required correction 3).
  - `probes/SkCapCall.fss` calls an inherited generic method through `h: Holder[\ZZ32\]`, where `Holder[\R\] extends Box[\R\]` and the method is `mapIt[\R\]`. It compiles and prints `v 5` (walk `v5`), as its renamed copy does. The `STypesUtil.inheritedMethods` site shows no capture at a call.
- **The memo** (`:481-486`, `:497-498`, `:328`, `:362`): the key holds everything `validOverloadingInner` reads. A valid answer is reused only under equal arrows, signature sets, `isMethod` and static parameters in scope. AST equality is structural (`nodes/ArrowType.java:96-111`).
- **Row 557** (`TypeAnalyzer.scala:438`, `:760-774`): the reciprocal entry's free parameters are read as rigid variables. That can only miss an exclusion, never invent one, and the forward clause finds it (`excludesClause` is transitive, `:776-791`). My variant `probes/SkKindEnvSub.fss` has a two-parameter `Rg[\I, J\] excludes { Txt0 }`, and the function's second parameter is a subtrait `Txt1` of the excluded `Txt0`.
  - Base: "I is not in the kind env [][][]".
  - Head: compiles and prints `true`, `false`.
  - Walk: `true`, `false`.
- **Row 477** (`Types.java:65`, `:79`, `:86`): `Shell` switches `WellKnownNames` before `Types` (`Shell.java:375-376`, `:384-385`). The worker's after-table has no `Character` row; the four other crash rows remain. The six new errors are in bodies the crashes hid (`String.fss:325-331`, `FortressLibrary.fss:4309`, `:4325`): `assert` on two strings, and `ZZ32->ZZ32` applied to an `RR64`. None of them names `Char`. `probes/SkCharLit.fss` (compiler world) prints `q` and `char  q` on the base and the head; walk prints `char q`. The extra space is row 76.

## 7. The rest of the checks

- **Provenance block (check 2).** Every cited line says what the block says (opened with `sed -n` at the base or the head as each line states):
  - `triage.md:76`, `:24-27`; `distance.txt:51-55`;
  - `overloading.tex:465-529`, `traits.tex:220-235`, `:518-532`, `literals.tex:40`;
  - `OverloadingChecker.scala:79-82`, `:120`, base `:133`, `:282-320`;
  - `SNodeUtil.scala:192-204`, `:239`, `:344-356`; `STypesUtil.scala:1522-1545`;
  - base `Types.java:77-88`; `FortressBuiltin.fsi:207`.

  One citation is off by a line: "`OverloadingChecker.scala:201` at the base" is `:200`. The `historical:` line names all three 2012 files the diff edits.
- **The tests (check 6).** Each new file has one comment line, a name by topic and no specification line number. The messages state the check in plain words and cite no section. The walk test sits in `ProjectFortress/tests/`, which section 4 gives to Q and M. It is a new, distinct file, so it is no stop (no file section 4 names), but it is outside O's file list. The worker reports this as a decision, on the three-homes rule.
- **Competing declarations (check 7).** Each of the nine new components is declared once across `ProjectFortress/tests/` and every `*_tests/`. `ownStaticParamsApart`, `functionalMethodsAtOnePosition` and `staticParamsInScope` occur only in `OverloadingChecker.scala`, and `withClauseParams` only in `TypeAnalyzer.scala`, over `src/com/sun/fortress/`.
- **record.md (check 8).** Not checked: the branch carries no `record.md`, and its text (`recordText`) was not in my brief.
- **Count table (check 10).**
  - `tmp/rung-overloading-checker/count/checker-count-off.txt:14` and `checker-count-on.txt:14`: `#total 89`.
  - `distance/distance.txt:2`: `#total 568`.
  - Both match the report's 89 and 568.
  - Before: the landed `climb-batch-7b/gate/checker-count.txt` 59 and `distance.txt` 598. `git log b0eb41516..493b4076f -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing.
  - Both stages must run again after the repair.
- **Ledger and sibling sites (check 11).** No existing row covers finding 1 or finding 2: I searched for "isMeet", "self position", "functional method" and "api". Row 544 is walk's acceptance in both. Row 547's shape is `SkBetween`'s; my one-JVM base run did not reproduce its acceptance with the worker's program. The worker's provisional rows 559 to 565 are new. Row 21 is walk's generic-method inference, near 565 but not it.
- **Decisions (check 12).**
  - "The specification stays the standard": followed in what the rung reads. The rule as built still departs from the text in findings 1 and 2.
  - "The library route.": no prelude declaration.
  - "The library's own practice is the standard.": no library edit, and no workaround in the library for the capture.
  - Answer 9 and the coverage check: untouched (`satisfiesReturnTypeRule`, `satisfiesPositionalRule`, `coverageRule` and `coversOverlap` are not in the diff). The top level now runs `returnTypeCheck` on pairs of functional methods it accepts, which is answer 9's rule applied to more pairs, not changed.

## 8. Differentials

| program | walk | compiled, base | compiled, head | verdict |
|---|---|---|---|---|
| `SkSelfAtZero` | C, A | refused at top level | C, A | agree; specification valid |
| `SkSelfAtOne` | C, A | refused, top level and trait C | refused in trait C | specification against compiled: finding 2 |
| `SkInAtOne` | true | refused, both | refused in trait C | finding 2 |
| `SkNoMeetTwoParams`, `SkNoMeetSelfAtOne` | A | refused, both | refused in trait D | compiled right; walk is row 544 |
| `SkUnrelatedOnly` | AB | refused at top level | A B | agree; specification valid |
| `SkFmUse` (one api) | a | refused in the api | runs `a` | compiled head wrong: finding 1 |
| `SkFmUse2` (two apis) | a | runs `a` | runs `a` | both wrong, pre-existing |
| `SkFmUse3` | a a | refused in the api | `a   a` | loud to quiet |
| `SkFmLocal` | a | refused, both | refused in trait Z | compiled right |
| `SkCapFmGen`, renamed | Missing type G | refused (captured), renamed ZipException | ZipException, both | capture fixed; row 563 |
| `SkCapDot`, `SkCapCall`, renamed | v5 | v 5 | v 5 | unchanged controls |
| `SkKindEnvSub` | true, false | I is not in the kind env | true, false | agree |
| `SkCharLit` | q, char q | q, char  q | q, char  q | unchanged; row 76 |
| `SkMixedTop` | refused | refused | refused | unchanged; row 545 |
| `SkBetween`, `SkBetweenC` | B | memo on accepted, off refused | refused both | memo fixed; finding in section 4 |

## 9. Required corrections (besides the refusal's one thing)

1. Findings 1 and 2: each needs a home before the second skeptic.
   - Repaired (home 1): an assertion that fails on `573381500` and passes at the head. Finding 1's api form fails on the base with "in API", finding 2's with "in trait C".
   - Deferred (home 2): an XXX test, a ledger row, the stop "The Meet Rule dropped ..." in stopsMet, and Pavol's line.
   - Either way, the count and distance stages run again.
2. The memo's gated test: add a program the memo hid on the base under the harness (section 4), seen failing on `573381500` through `junit.sh` and passing at the head. Correct the report's sentence that none exists, and the defectHomes line for the memo.
3. The capture's functional-method branch (`OverloadingChecker.scala:142-146`): an assertion seen failing on the base, for example `SkCapFmGen`'s program keyed on what the head gives.
4. In the report and forPavol:
   - section 5's "No pair the base checked goes unchecked";
   - section 12's "the Meet Rule is kept for every type that provides both functional methods";
   - "Each wants a library device of rung M's kind", wrong for the 26 `IN` sites while finding 2 stands;
   - `:201` should be `:200`.
5. The gather writes `record.md` from `recordText`. No skeptic has checked it.

## 10. Recommended ledger rows (if not repaired in the repair round)

- **A component's type that inherits two functional methods of one name from apis, with no meet, is not checked by the compiled overloading checker.** `toFunctionalMethodArrows` keeps only declarations with bodies in a component, and an api's declarations carry none. `SkFmUse2`, two apis, compiles and runs `a` on the base and the head. The one-api `SkFmUse` is refused on the base and runs at the head. Specification: the Meet Rule for Functional Methods, and "provides" (`traits.tex:528-529`).
- **The per-provider check compares the meet without the domain's first element, which is the self parameter only when self is first.** `SkSelfAtOne` and `SkInAtOne` are refused "in trait C" though `C` declares the meet. `SkSelfAtZero` is accepted. Walk runs all three. Cause: `OverloadingChecker.scala:575`, `TypeSchemaAnalyzer.scala:67-72`.

## 11. For Pavol

- Finding 1's case, as a decision of the rule's scope: in a component, the per-provider check reads declarations with bodies only. That leaves out a component's own abstract declarations, which the worker listed, and every declaration inherited from an api, which is finding 1. User programs, microGPT among them, are such components.
- Finding 2's consequence for the library: the 26 `IN` per-provider api sites cannot be cleared by declarations on the meet until the check reads the self position.
