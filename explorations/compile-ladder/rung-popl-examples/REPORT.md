# Rung P (climb batch 14, `rung-popl-examples`): the POPL 2019 examples as tests, the No Duplicates Rule restated, walk's power in a size

- problem: the POPL 2019 examples note's test list (`explorations/reviews/popl2019-examples.md:276-298`); row 696, whose rule refuses no pair (`Specification/advanced/overloading.tex:548-549` at the base); row 676, walk's stop on a power (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:475` at the base)
- spec: `Specification/basic/expressions/constant.tex:26-29` (a static expression's value is determined once its static parameters are instantiated), with the grammar's power at `Specification/appendices/grammars/concrete-syntax.tex:546` and the kinds at `Specification/basic/trait-parameters.tex:98-105`. The overloading rules are at `Specification/advanced/overloading.tex:531-569`, outside `basic/` (`grep -n "No Duplicates" Specification/basic/*.tex` prints nothing)
- precedent: `Int.powExact`, walk's exact power of a value by repeated squaring (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:369-383`), placed beside the exact cases of `forIntBinaryOp` (`EvalType.java:472-474`); the callout after a list, `Specification/basic/inference.tex:285-286`
- deviation: a negative exponent gets a refusal of its own, where `Naming.sizeOp` returns null and the checker calls such a power out of range (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1216`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:45-48`, `:71`); an overflow of a long goes to the existing out-of-range catch, not to the `IntegerOverflow` that `Int.powExact` raises (`Int.java:380-382`)
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java`, `Specification/advanced/overloading.tex`, `Specification/appendices/changes.tex`, `Specification/basic/expressions/constant.tex`

## 1. What changed and why

There are three commits on `wip/rung-popl-examples`, each pushed.

**`1cae01899`: the POPL 2019 paper's and talk's worked examples as tests.** 39 files, with no code change.

Green on the base:
- the correct compiled refusals of A1 (`XXXDottedMethodMeetBothBodies.test`), A3 (`XXXTwoTraitsNoMeet.test`), A4 (`XXXReturnRuleMeetCrossing.test`) and A6 (`XXXGenericBoundsNoMeet.test`);
- A3 under walk (`TwoTraitsNoMeetWalk`);
- A5's dispatch on both paths (`DispatchCrossingMeetWalk`, `DispatchCrossingMeet`);
- A10 without the two-argument `ZZ32` declaration on both paths (`DispatchSymmetricSortedWalk`, `DispatchSymmetricSorted`), and A10's whole set under walk (`OverloadZZ32BesideUserTraitWalk`);
- A-B2 under walk (`GenericBoundsMeetWalk`);
- B4's pair, refused by the checker (`XXXNoDuplicatesRule.test`, the test that row 696's close names).

Expected failures, each seen failing as written first:
- under walk: A1 (`XXXDottedMethodMeetBothBodiesWalk`, row 444), A4 (`XXXReturnRuleObjectParamWalk`, row 697), A6 (`XXXGenericBoundsNoMeetWalk`, row 373), B4 (`XXXNoDuplicatesRuleWalk`, row 373), A-C4 (`XXXGenericInstanceReturnOnlyWalk`, new row NEW-P-1) and row 693's generic object (`XXXOverrideNothingConditionalExtensionWalk`);
- compiled: A10's whole set (`XXXOverloadZZ32BesideUserTrait.test`, row 698), A-C4 (`XXXGenericInstanceReturnOnly` with `GenericInstanceReturnOnlyLink.test`, row 699) and A-B2 (`XXXGenericBoundsMeet` with `GenericBoundsMeetLink.test`, row 537).

**`dcad9f75a`: row 676.** `EvalType.forIntBinaryOp` gains a fourth case, the power (`EvalType.java:475-484`):
- A negative exponent is refused: "Static argument 2^e has the negative exponent -1, and a power in a size takes an exponent of 0 or above".
- Otherwise the power is computed exactly on longs by repeated squaring with `Math.multiplyExact`. An overflow falls to the method's existing catch, the out-of-range refusal that a sum gets (`:486-488`).
- A value that fits a long but not the parameter's kind is refused at binding (`EvalType.java:256-273`).

`XXXNatArithPowerWalk` is promoted to `NatArithPowerWalk`. It asserts `2^3`; an exponent of 0 (`7^0`, `0^0`); powers of 0, 1 and -1 (`0^7`, `1^100000`, `(0 - 1)^100001`, `(0 - 1)^100000`); a negative base; precedence; `2^32 - 1` exactly; and a static parameter as the exponent and as the base.

Three programs of their own gate the refusals at load:
- `NatPowerNegativeExponentWalk`, keyed "has the negative exponent -1";
- `NatPowerOutOfRangeWalk`, keyed "Static argument 4294967296 is out of range for a nat parameter";
- `NatPowerOverflowWalk`, `2^64`, keyed "is out of range for a nat parameter".

**`98e8ff979`: the specification.**
- The No Duplicates Rule is restated on the non-strict relation (`Specification/advanced/overloading.tex:548-549`), with a callout (`:561-569`).
- Appendix I's entry "Overloading with static parameters" is amended in its change (`Specification/appendices/changes.tex:2306-2308`), rationale (`:2365-2383`), effect (`:2404-2408`), original text (`:2456-2460`) and route C (`:2461-2463`).
- The note at the head of "Static Expressions" (`Specification/basic/expressions/constant.tex:15-17`) and the effect of "When two sizes are the same" (`changes.tex:3313-3315`) no longer say that walk stops on a power.

## 2. The tests: the failing runs and the passing runs

Every failing run below ended before the edit was first built. The build of the edit started at 2026-10-14T02:24:41Z (`ant compileAll`, which printed "Caches /home/user/fortress-popl/default_repository/caches started again, empty"). An earlier build at 02:24:16Z ran before the edit was saved and compiled nothing ("Caches ... kept", 10 seconds).

**The six walk examples that fail today**, plain-named as written, on the base's code (02:16:25Z):

`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h-base1 ...`

    . interpret tmp/h-base1/tests/GenericBoundsNoMeetWalk
    SortedListI[\C\]
    ran
     Missing expected refusal at load
    Tests run: 6,  Failures: 6,  Errors: 0

`GenericInstanceReturnOnlyWalk` printed `REACHED`, then 'Unification error: Closure/Constructor for merge param 1 (x:Sorted[\Any\]) got arg Sorted[\A\] of type Sorted[\A\]'. The five with a `.test` file each reported "Missing expected refusal at load", having printed `ran`, `1`, `1`, `H` and `SortedListI[\C\]`.

**The three compiled examples that fail today**, plain-named with `link`, `run` and `run_out_contains=PASS` (02:20:29Z):

`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base-fail ProjectFortress/compiler_tests OverloadZZ32BesideUserTrait.test GenericInstanceReturnOnly.test GenericBoundsMeet.test`

        Invalid overloading of add in component OverloadZZ32BesideUserTrait:
    F. run ProjectFortress/compiler_tests/GenericInstanceReturnOnly (305ms) Exception in thread "main" java.lang.VerifyError: Bad return type
    F. run ProjectFortress/compiler_tests/GenericBoundsMeet (372ms) REACHED
    java.lang.Error: java.lang.Error: Unable to read serialized data for GenericBoundsMeet?$\=sort{...
    Tests run: 6,  Failures: 4,  Errors: 0

**Row 676's four tests** on the base's code (02:22:34Z to 02:22:45Z):

`harness-one.sh $PWD/tmp/h-base3 ProjectFortress/tests/NatArithPowerWalk.fss ProjectFortress/tests/NatPower{NegativeExponent,OutOfRange,Overflow}Walk.{fss,test}`

The first run, at 02:18:37Z, found that `square` is reserved and that row 681 needs the static arguments written. The two programs were respelled and run again:

     Refused at load, but did not satisfy load_exception_contains; expected
    has the negative exponent -1
    EvalType: class com.sun.fortress.nodes.IntBinaryOp is not yet implemented.
    Tests run: 4,  Failures: 4,  Errors: 0

**The gated expected failures and the green examples**, on the base's code:
- `harness-one.sh $PWD/tmp/h-base2` over the eleven walk files printed `OK (11 tests)`. Each `XXX` file reported " Saw expected failure: loaded and ran, not refused at load" or " OK Saw expected exception".
- `ONE_JVM=1 junit.sh base-all ProjectFortress/compiler_tests` over the twelve compiled `.test` files printed `OK (14 tests)`, each `XXX` file "Saw expected failure".

**The first `XXX` test added, shown red on a deliberate fix.** `XXXDottedMethodMeetBothBodiesWalk` had its two methods made functional (`m(self, x: Number)`) and its call changed to `m(C, 0)`; walk refuses that shape by the Meet Rule for Functional Methods. The file was then restored (`git diff --no-index` empty). `harness-one.sh $PWD/tmp/h-red1`:

    Invalid overloading of m in C: C provides the functional methods m(self, Number) of A and m(self, Number) of B, whose parameter types are unrelated ...
    1) ...XXXDottedMethodMeetBothBodiesWalk...AssertionFailedError: Refused at load as its keys name, in an XXX test.
    Tests run: 1,  Failures: 1,  Errors: 0

**The passing run** after the edit, the last code change (02:26:03Z): `harness-one.sh $PWD/tmp/h-edit1` over row 676's four tests printed `OK (4 tests)`. The suites in section 8 then ran every new test again on the same code state.

## 3. Row 676: where the fix belongs, and the precedent

The row names its place. Walk evaluates a size in `EvalType`'s visitor of an `IntArg` (`EvalType.java:438-496`). Its `forIntBinaryOp` computed `+`, `-` and juxtaposition and called any other operator "not yet implemented" (`EvalType.java:468-480` at the base). The team's form, at `a874948ac` (`EvalType.java:457-464`), computed the three in wrapping longs. `explorations/coordinator/map/spec-to-implementation.md:188` maps types to `evaluator/EvalType.java`.

The parser makes the power an `IntBinaryOp` whose operator text is `^` and whose exponent is a numeral or a name (`ProjectFortress/src/com/sun/fortress/parser/MayNewlineHeader.rats:284-290`). So a negative exponent reaches walk only through a static parameter, as in `pow2[\0 - 1\]()`.

**Precedent search.**
- Walk already computes an exact power of a value: `Int.powExact` (`glue/prim/Int.java:369-383`), repeated squaring with `Math.multiplyExact`. `Int.pow` and `Long.pow` (`Int.java:385-395`, `Long.java:354-364`) are its wrapping siblings.
- The compiled path's size power is `Naming.sizeOp` (`Naming.java:1212-1222`): 1 at the exponent 0, a power of 0, 1 or -1 at any exponent, another base up to the exponent 4096, and null for a negative exponent.
- The edit follows `powExact`'s loop inside `forIntBinaryOp`, beside the three exact cases. It gives every power the value that `sizeOp` gives whenever that value fits a long; `0^0` is 1 on both.
- The file has one other site that computes a size, `forIntBase` (`EvalType.java:449-455`), which reads a numeral exactly. No other site computes an operation.

The ways are in decision 1 below: the loop inline; a call of `Naming.sizeOp` from walk; `Int.powExact` itself; a plain multiplication loop; `BigInteger.pow`.

## 4. Row 696: the specification's change, passage by passage

This is the S1 form's full reasoning (the fortress-repo skill's `specification.md`, part 4), kept here rather than in a separate record (decision 6).

**The rule.** `Specification/advanced/overloading.tex`, "Declarations with Static Parameters", the first of the three rules.

- **Original.** The revival's text of 30 September 2026, `576b4c287`: "The *No Duplicates Rule*: $d_1$ and $d_2$ are not each more specific than the other." The Working Draft of February 2011 has no such section.
- **New** (`:548-549`): "The *No Duplicates Rule*: $d_1$ and $d_2$ are not each applicable to every call to which the other is applicable."
- **Callout** (`:561-569`, `revival-overloading`): the earlier wording, why it refused no pair, the papers' relation, and the pair it now refuses, `dup[\T\](x: Box[\T\])` beside `dup[\U\](x: Box[\U\])`.
- **Reason.**
  - The section defines more specific strictly, "when $d_2$ is applicable to every call to which $d_1$ is applicable, and not the other way round" (`:539-541`). So no two declarations are each more specific than the other, and the rule held for every pair (row 696).
  - The type group's paper of 2011 defines its relation without strictness: "$d_1$ is more specific than $d_2$ (written $d_1 \ms d_2$) if $d_1 \in \Df(T)$ implies $d_2 \in \Df(T)$ for every well-formed type $T$" (`Papers/Types/rules.tick:97-108`; `\ms` is `\preceq`, `Papers/Types/paper.tick:10`). Its rule asks $d_1 = d_2$ when each is more specific than the other (`rules.tick:158-162`), "forbid[ding] distinct declarations from being equally specific" (`:184-185`).
  - The paper of 2019 says "Distinct method declarations must have different applicable sets" (`research/extracts/ParkPOPL2019.txt:262-263`, p. 11:6). Its [No-Dup-Not-Less] and [No-Dup-Not-Gtr] admit a pair only where one domain is not below the other (`:609-611`, `:630-641`, Fig. 5, p. 11:13). Its Theorem 4.1 rests on the rule making the relation antisymmetric (`:786`).
  - The new sentence is the first half of the section's own definition, so it needs no new term.
  - POSITIONS P-26 (the late positions, the POPL 2019 paper among them) governs. P-95 and P-96 give the form. (Corrected by the skeptic: this line also cited P-25 as saying that a wording which refuses nothing is the text's defect; P-25 says that the specification stays the standard with the 2012 Types chapter cited beside it, and that chapter states no No Duplicates Rule.)
- **The checker** already applies the rule as restated. `OverloadingChecker.checkOverloading` refuses a declaration whose arrow is `oracle.equiv` to an earlier one's at the same self position (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:439-446`). `equiv` is `lteq` both ways, the subtype relation of the existential domains (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:68-74`). So B4's pair is refused, "There are multiple declarations of dup with the same parameter type: Box[\T\]" (section 2's `junit.sh base-all`), and no compiled behaviour changes. (Added by the skeptic: the condition "at the same self position" leaves out two functional methods whose `self` parameters stand at different positions, `f[\T extends S\](self, y: T)` beside `f[\U extends S\](x: U, self)`; the checker passes that pair and the code generator stops the compile, "Likely bug in static analysis, apparently malformed overload set not rejected", row NEW-P-2 in `record.md`, gated by `compiler_tests/XXXNoDuplicatesRuleSelfPositions.test`; SKEPTIC.md gives the run.)
- **The way back:** restore the one sentence and drop the callout and the entry's four additions. The Meet Rule then refuses an equivalent pair unless declarations of the set, each more specific than both, together cover every argument to which both are applicable (the section's paragraph after the rules), and accepts it beside them, which the papers refuse. (Corrected by the skeptic: this sentence said that one third declaration more specific than both makes the Meet Rule accept the pair, which the strict sense of more specific rules out; SKEPTIC.md gives the reasoning and `SkDupCover`.)
- **Route C:** the same; the No Duplicates Rule does not read the rule on instantiations.

**The entry.** `Specification/appendices/changes.tex`, "Overloading with static parameters":
- the change (`:2306-2308`);
- the rationale (`:2365-2383`), with both papers' rules, row 696, and the decision of 23 September 2026 (P-26's date, `POSITIONS-history.md:690`; the same words as `changes.tex:3091`);
- the effect (`:2404-2408`): the checker applies the rule, and walk loads such a pair (row 373);
- the revival's earlier wording, under the original text (`:2456-2460`);
- route C (`:2461-2463`).

The front matter's paragraph (`Specification/fortress/preamble.tex:54-64`) stays true.

**Row 676's two sentences.**
- `constant.tex:15-17` said "the interpreter computes a sum, a difference and a product, and stops on a power (row~676 ...)". It now says "computes a sum, a difference, a product and a power exactly, and refuses a power at a negative exponent".
- `changes.tex:3313-3315` said "The interpreter computes a sum, a difference and a product exactly when it instantiates a type and refuses a size outside its kind; it stops on a power (row~676)." It now says "computes a sum, a difference, a product and a power exactly when it instantiates a type, refuses a power at a negative exponent, and refuses a size outside its kind."

Each clause was checked against `forIntBinaryOp` (`EvalType.java:472-484`) and the binding check (`:256-273`), and run: `NatArithPowerWalk`, `NatPowerNegativeExponentWalk`, `NatPowerOutOfRangeWalk`. No normative sentence changes for row 676: the grammar already gives `IntExpr ^ IntVal` (`concrete-syntax.tex:546`).

**The build.** `( cd Specification/fortress && ./ant genSource && ./ant tex )` ended `BUILD SUCCESSFUL` twice and `EXIT=0`.
- `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log` printed 41. Every match is a line of a macro's definition dumped into the log ("x@warning {Reference `#1' on page \thepage \space undefined}}{}"), not a warning.
- `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply\|^! Undefined control sequence"` printed 0.
- The PDF's text shows the rule and its box. The ignored files were removed (`git clean -fXq -- Specification`).

## 5. What the specification settles

- **The examples.** Each test's expected outcome is the note's (`popl2019-examples.md`, group A), and each cites its rule: "Meet Rule" (A1, A3), "Subtype Rule" (A4), "Overloading Resolution" (A5, A10, A-C4), "Declarations with Static Parameters" (A6, A-B2, B4), "Incompatibility Rule" (A10's whole set).
- **Row 693.** `Specification/basic/traits.tex:603-604`: "It is a static error if a declaration with the modifier override does not override any inherited declaration."
- **Row 676.** The power is given by the grammar and by `constant.tex:26-29`. Its range is given by `trait-parameters.tex:98-105`: a `nat` parameter appears where an `NN32` variable may, an `int` one where a `ZZ32` may. The text does not say what a power at a negative exponent denotes. Such a power is no integer for a base other than 1 and -1, and the compiled path computes none (`Naming.java:1216`). Walk refuses every negative exponent, as the compiled path computes none (decision 2; a question for the curator).

## 6. Old against new

Old is the base's code: section 2's runs in this tree before the build, and `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base14 <tree>/tmp/old-caches P.fss` for the probes. New is this tree after `dcad9f75a`. The compiled column is the compiled path, which the edit does not touch.

| program | old walk | new walk | compiled |
|---|---|---|---|
| `NatArithPowerWalk` (as probe `CPow`) | 'EvalType: class com.sun.fortress.nodes.IntBinaryOp is not yet implemented.' | `PASS` | `PASS` |
| `NatPowerNegativeExponentWalk` (`CPowNeg`): `2^e` at e = -1, from a top-level variable | the same stop | 'Static argument 2^e has the negative exponent -1, and a power in a size takes an exponent of 0 or above' | compiles; the run stops, 'java.lang.ExceptionInInitializerError', 'Caused by: java.lang.NumberFormatException: Illegal embedded sign character' |
| `NatPowerOutOfRangeWalk` (`CPowRange`): `Box[\2^32\]` | the same stop | 'Static argument 4294967296 is out of range for a nat parameter, whose values are those of NN32, 0 to 4294967295' | refused at compile: 'The static argument 4294967296 is out of range for a nat parameter, whose values are those of NN32, 0 to 4294967295.' |
| `NatPowerOverflowWalk` (`CPow64`): `Box[\2^64\]` | the same stop | 'Static argument 2^64 is out of range for a nat parameter, ... and for an int parameter, ...' | refused at compile: 'The static argument 18446744073709551616 is out of range for a nat parameter, ...' |
| probe `CPowLoad`: `pow2[\nat e\](): ZZ64 = sz64[\2^e\](Box[\2^e\](0))`, then `pow2[\32\]()` and `pow2[\5000\]()` | `REACHED`, then the same stop | `REACHED`, then 'Static argument 4294967296 is out of range for a nat parameter, ...'; with `pow2[\5000\]` first, 'Static argument 2^e is out of range ...' | `REACHED`, `4294967296`, then 'java.lang.NumberFormatException: For input string: "2?5000?^"' |

The compiled runs used `bin/fortress compile P.fss` and `bin/fortress run P`, with `FORTRESS_CACHES` set to a private copy of the caches, from `tmp/rung-popl-examples/probe/`. Without the static arguments written, the checker refuses `sz(Box[\2^e\](0))` with 'is not applicable to an argument of type Box[\2^e\]' (row 681), so the tests write them.

## 7. Sentences the change makes false

- `Specification/basic/expressions/constant.tex:15-17` and `Specification/appendices/changes.tex:3313-3315`, both corrected in `98e8ff979` (section 4).
- The fortress-repo skill's `references/revival-changes.md:114`, "Arithmetic in a size": "Walk computes a sum, a difference and a product, and stops on a power (ledger row 676)." It is skill text, which this rung does not edit; `record.md`'s revival change is the material for it.
- (Added by the skeptic.) Two FACTS entries, which the gather rewrites: F-146 (`explorations/coordinator/FACTS.md:138`), "Open: ... walk stops on a power in a size (row 676)", and F-176 (`FACTS.md:166`), "Walk computes `+`, `-` and juxtaposition at instantiation, stops on a power (row 676)". `record.md` lists them.
- No other sentence of the specification is made false:
  - `grep -rn "row~676\|stops on a power" Specification Documentation` prints nothing after the commit.
  - `grep -rn "No Duplicates" Specification` finds only the rule, its callout and the entry.
  - The dispatch callout (`Specification/basic/overloading.tex:333-345`) says that both implementations take the dynamic type of an argument where the value does not fix the parameter. For a parameter that only the return type mentions, walk takes the bound `Any`, which the callout does not cover and names no row for. NEW-P-1 gives it one, for the gather to cite if it chooses.

## 8. Suites, stages, ladder, names

**`ant testSystem`**, once, on the code state of `dcad9f75a`: `BUILD SUCCESSFUL`, `Total time: 3 minutes 36 seconds`.
- The four shards ran 159, 140, 151 and 144 tests, 594 in all, with 0 failures and 0 errors.
- Climb batch 13b's gate ran 580 (`explorations/compile-ladder/climb-batch-13b/gate/summary.txt`). The 14 more are 15 new walk `.fss` files less the renamed `XXXNatArithPowerWalk`.
- Every test the brief asks to keep keeps its verdict. `XXXOverloadExistentialMeetWalk` reported "OK Saw expected exception"; `XXXoverloadTest5`, `NatReflectTest`, the `Nat*Walk` tests, `XXXOverrideObjectExpressionOverParamWalk` and the `Override*Walk` tests are among the 594 with no failure.

**`ant testQuick`**, once, on the same code state: `BUILD SUCCESSFUL`, `Total time: 9 minutes 45 seconds`.
- `CompilerJUTest` ran 1132 tests with 0 failures: 1118 at 13b's gate plus the 14 new ones (section 2's `OK (14 tests)`).
- `LibraryJUTest` (86) and `OtherCompilerJUTest` (263) are unchanged, with 0 failures. So `XXXOverloadExistentialMeet` and `XXX2f.test` keep their verdicts.

**The checker count and the distance:** neither was run. Every changed path is under `ProjectFortress/tests/`, `ProjectFortress/compiler_tests/`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `Specification/` or `explorations/`. `git diff --name-only 5bf8a7c84` lists `EvalType.java`, three `.tex` files, and 45 new test files plus one renamed.

**The ladder subset is empty.** The ladder compiles, and walk's `EvalType` is never on its path. `grep -iE "EvalType|IntBinaryOp"` over `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` and over `explorations/compile-ladder/climb-batch-13b/gate/ladder/ladder.tsv` prints nothing, and `grep -l "EvalType\|IntBinaryOp" -r explorations/compile-ladder/baseline-2026-09-19/raw` lists no file. The new tests are in no ladder corpus.

**Names.**
- Each new component name, with and without `XXX`, `Walk` and `Link`, was grepped in `ProjectFortress/tests`, every `ProjectFortress/*_tests`, `ProjectFortress/test_library`, `ProjectFortress/src/com/sun/fortress` and `Library`. No other file holds any of them.
- The test programs' top-level names were checked against the library's apis: only `merge` and `add` occur, in `Heap`, `SkipList`, `Map`, `PrefixMap` and `PrefixSet`, which no test imports.
- `square` is reserved: `square[\int c\]()` is a syntax error at the bracket (a probe), so the test says `secondPower`.

## 9. Points to report

Reached:
- **Each row filed and each note written, and row R4.** R4 is filed as NEW-P-1 (`record.md`), so that `XXXGenericInstanceReturnOnlyWalk` has a row its promotion can be found by, and walk's departure in the dispatch callout has a number. Notes are written for rows 373, 537, 675, 693, 698 and 699, and rows 676 and 696 are closed. Rows 444 and 697 have no room for a note (683 and 681 of 700 characters in their notes cells), so their tests are named in `record.md` and in the questions. Evidence: `record.md`; `python3 explorations/coordinator/tools/ledger.py check --rows` over the noted rows printed "6 rows, 0 fail the template".
- **A power in a size whose value or refusal differs between walk and the compiled path.** At class load the compiled path makes `2^32` (4294967296, row 675) and stops with `NumberFormatException` on `2^e` at e = -1 or e = 5000, where walk refuses each with a message (section 6). The note on row 675 records the negative exponent.
- **Each sentence on walk's power in a size corrected:** `constant.tex:15-17` and `changes.tex:3313-3315` (section 4). No normative text changed beyond the No Duplicates Rule and its entry.

Not reached:
- No example behaved otherwise than the note says (section 2's runs give each outcome the note gives).
- No walk or compiled test changed its verdict, except `XXXNatArithPowerWalk`'s promotion (section 8).
- No walk edit beyond `forIntBinaryOp`, and no checker, library or code-generator edit.

## 10. Decisions

1. **The power, inline in `forIntBinaryOp`, by `powExact`'s repeated squaring.** The loop squares only while bits remain, so no needed square overflows before the result does. Not taken:
   - calling `Naming.sizeOp` (`Naming.java:1212-1222`), which would make walk depend on the compiled run time, where the two paths share almost no code (the skill's `SKILL.md`, "How a program runs"), and would still need a long;
   - `Int.powExact` itself (`Int.java:369-383`), which raises the Fortress `IntegerOverflow`, built from the library at run time (`Int.java:380-382`), so a size would get an arithmetic exception instead of the out-of-range refusal; it would also be a glue edit beyond the brief's one function;
   - a plain multiplication loop, which takes as many steps as the exponent for a base of 0, 1 or -1 (`(0 - 1)^2147483647`);
   - `BigInteger.pow`, which is unbounded at such exponents.
2. **A negative exponent gets a refusal of its own.** Evidence: the compiled path computes no negative power, and walk's refusal now names the exponent. Not taken:
   - the out-of-range message, which the checker gives a power it does not compute (`TypeWellFormedChecker.scala:45-48`, `:71`), but which states the kinds' ranges, not the cause;
   - computing `1^(-1)` and `(-1)^(-1)` as integers, which `sizeOp` does not do (`Naming.java:1216`).
3. **Three refusal programs where the brief names two.** `NatPowerOutOfRangeWalk` keys the exact value, `4294967296`, so it checks the computation too. `NatPowerOverflowWalk` (`2^64`) checks that a power is never read modulo 2^64, as `Int.pow` would read it (0). Not taken: only one of the two.
4. **The No Duplicates Rule restated on applicability, in the rule's own sentence.** Evidence: section 4. Not taken:
   - defining "as specific as" beside the strict relation, a new term used once;
   - making "more specific" non-strict throughout, which would change the Meet and Return Type Rules' sentences and the references in `\secref{resolving-overloading}`.
5. **The callout after the list**, as `inference.tex:285-286` places one. Not taken: inside the item.
6. **The full reasoning in this report** (section 4), which the entry points to. Not taken: a separate `decision-record.md`, which the brief allows only where the section asks for one. The section asks for the S1 form, and section 4 is its fourth part.
7. **A4 under walk as the talk's three declarations** (`m1` at `(B, C)`, `(C, B)`, `(C, C)`): the note's Fortress form, and the same program as the compiled `ReturnRuleMeetCrossing`. Not taken: the smallest form, `f(x: B): C` beside `f(x: C): B`, which row 697's claim states. Both load today (the note's A4).
8. **A10's whole set under walk as `OverloadZZ32BesideUserTraitWalk`**: the compiled `XXXOverloadZZ32BesideUserTrait`'s program as a plain walk test, beside `DispatchSymmetricSortedWalk` without the two-argument declaration. Not taken: one walk test holding the whole set.
9. **B4 under walk as an expected failure, `XXXNoDuplicatesRuleWalk`**: row 373's second reproducer, which the note names. Evidence: the skill's `tests-writing.md`, "How a defect is recorded", home 2: the specification settles it, and a measured defect gets its test in the change that measured it. Not taken: only the note on row 373.
10. **Compiled refusals as `XXX<Name>.test` over a plain `<Name>.fss`**, as `XXX2f.test` (`tests=Compiled2.f`) and `XXXCoverageReturnBad.test` (`tests=CoverageReturnBad`) are written. Compiled defects are `XXX` in both files, the skill's form. Not taken: `XXX` in both files for a correct refusal.
11. **Row 693's test as `XXXOverrideNothingConditionalExtensionWalk`**: the review's `object H[\T\](y: T) extends A[\T\] where { T extends ZZ32 }`, named after `OverrideConditionalExtensionWalk` (its positive twin) and the `OverrideNothing*Walk` tests. Not taken: a trait form, which the review did not probe.
12. **Static arguments written where a size names a parameter** (`sz[\2^e\](Box[\2^e\](0))`), so that the checker accepts the programs (row 681). Walk runs both spellings.
13. **Row R4 filed as NEW-P-1, `design limit (walk)`**, with the note's claim: walk has no static types (the skill's `SKILL.md`, "The phases"), so its instance is the bound. Not taken: leaving the walk test without a row.
14. **Rows closed:** 676 by `dcad9f75a` with `NatArithPowerWalk`; 696 by `98e8ff979` with `XXXNoDuplicatesRule`, a test green on the base, as the batch review leaves it (`explorations/coordinator/climb-batch-14-review.md:65`).

## 11. Defects and their homes

- **Row 676**, walk stops on a power in a size: home 1, `NatArithPowerWalk` and the three refusal programs.
- **Row 696**, the No Duplicates Rule refuses no pair: a defect of the text, repaired in the text. `XXXNoDuplicatesRule.test` shows the checker's refusal and is green on the base.
- **Home 2**, the `XXX` tests of section 1, each asserting the specification's answer:
  - under walk: rows 444 (A1), 697 (A4), 373 (A6 and B4), and 693 (the generic object);
  - compiled: rows 698 (A10), 699 (A-C4) and 537 (A-B2).
- **A-C4 under walk**, where walk runs a return-only type parameter at its bound: home 2 and a new row, NEW-P-1, with `XXXGenericInstanceReturnOnlyWalk`.
- **The compiled class loader stops on a negative exponent** with `NumberFormatException`: row 675's family, recorded by a note on row 675, as that row's notes already record `2^k` at k = 5000.

## 12. For FACTS, commands, questions

- **For FACTS:** the two entries in `record.md`.
- **Commands:** none beyond the skill's, except linting a row note before the gather appends it. The row with the note appended is written to a scratch file and checked with `python3 explorations/coordinator/tools/ledger.py check --rows FILE`.
- **Questions for the curator:**
  1. `ledger.py` can only append notes; it sets no reproducer cell (`explorations/coordinator/tools/ledger.py:778-792`). Rows 373, 444, 697, 698 and 699 read `none` though tests now gate them, and rows 444 and 697 have no room left for a note. How are their tests to be named on the rows?
  2. Is a power in a size at a negative exponent refused, or does `1^(-1)` denote 1? The text is silent (`constant.tex:26-29`, `trait-parameters.tex:98-105`). The rung follows the compiled path (`Naming.java:1216`).
