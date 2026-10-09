# Skeptic's review: climb batch 13, rung V (`rung-array-bound`)

Head judged: `816251130` (the worker's last commit). The worker's `REPORT.md` and `record.md` were written from the run's journal in `1df6a1700`. The skeptic's correction is `5773dbfbd`. Verdict at the end.

## What was checked

1. **The tables.** The count and distance tables the report declares match the worker's own files of the final code, read as files. The count table equals batch 12's gate table byte for byte ('FortressLibrary 2', '#total 1', '#crash none'). The distance table differs from batch 12's only in its `#seconds` and `#machine` lines: '#total 153', '#seconds 1177 FortressLibrary 666'. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-12/gate/distance.txt <the worker's table>` prints 'DISTANCE SAME   153'. The per-site list, keyed by location and whole message, equals `explorations/compile-ladder/gate/distance-sites.tsv` (154 lines each, no difference). The two timing runs of the held library half are as the report says: the progress log shows `checkApi FortressLibrary` from '18:45:37' to '19:02:38', and the run ends '@@PROBE checkApi FortressLibrary -> errors=2', 'File FortressLibrary.fss has 1 error.' Those runs, like the stage, had the overloading memo off (`explorations/coordinator/tools/checker-count/run.sh:54`, `:70`). The report did not say so, and row 688's claim read as if a compile took 18 minutes. Corrected (below).

2. **Test first.** The worker's transcript shows the failures on the base's code before the edit was built. The edits came at 16:50:33 (`TypeSchemaAnalyzer.scala`) and 16:52:01 (`Operators.scala`), and the first build after them at 16:52:45.
   - `InferTightJuxtContext` failed at 16:48:33 (call `GN4Pwr`): 'Right-hand side has type BoxV[\Object\], but declared type is BoxV[\ZZ64\].' and '... BoxV[\String\].'
   - `OverloadTwoBoundsClosedTrait` failed at 16:49:41 (call `xArE9p`): 'java.lang.ClassCastException: class com.sun.fortress.nodes.UnionType cannot be cast to class com.sun.fortress.nodes.BaseType', 'Tests run: 3,  Failures: 3'.
   - Both passed at 18:08:02 (call `HMPcUX`, 'OK (16 tests)'), after the last code edit (17:33:07) and its build (17:33:33).
   - `ArrayElementAlgebra` failed on the base at 16:49:24, on its `NN32` `matrix(v)` assertion. Since the hold it is a test with no fix, and it was seen passing at 18:05:38 on the base's library.
   - `ant testQuick` on the final code (18:08:45): 'BUILD SUCCESSFUL', compiler 1093, library 86, othercompiler 263.
   - The unit test of the edited class, `TypeSchemaAnalyzerJUTest`, runs in testFast's misc track, which testQuick leaves out. On the head's built classes, `java -cp "$(bin/fortress_classpath | tail -1)" junit.textui.TestRunner com.sun.fortress.scala_src.types.TypeSchemaAnalyzerJUTest` prints 'OK (4 tests)'.

3. **The diff.**
   - `boundsSubstitution` keeps each image variable's bounds as a list. It drops `Any` and duplicates, as the base's `conjuncts` did (`useful/STypesUtil.scala:581-585`). It checks each variable bound by bound.
   - The `declared` shortcut holds only for an image that is a variable given that bound. There the base's own check was also true by that variable's bounds, so the check stays sound.
   - The `SMathPrimary` fallback copies the loose juxtaposition and the repeated operator (`impls/Operators.scala:176-196`, `:396-403`). The multifix is decided without the expected type. Then the multifix application, or the outermost binary one, gets it.
   - The Appendix I amendment follows the dated form of row 644's sentence just above it (`Specification/appendices/changes.tex:2076`).
   - The library is the base's: `git diff a1a75716a 816251130 -- Library` is empty.

4. **Where the fix belongs.** The crash's site is the cast at `TypeSchemaAnalyzer.scala:474-477` (base). The precedent for keeping a bound list element by element is real (`OverloadingChecker.scala:212`, `AbstractMethodChecker.scala:143`). The checker's Scala has eight casts to `BaseType` at the base (`git grep -n 'asInstanceOf\[BaseType\]' a1a75716a -- '*.scala'`). Only `:477` casts the conjuncts of a meet. The tight juxtaposition was the last of the three multifix sites with no expected type. `:511`, a subscripted assignment's right-hand side, is an argument (row 455).

5. **The tests** exercise their defects, carry one comment line each, cite sections, not lines, and are named by topic. As the worker found, the brief's crash shape without `C` compiles and runs on the base (program 1 below), so the added `object C` is needed.

6. **The differential** is below.

7. **Homes.** Every defect the report names has its home. The skeptic's programs measured three more, and each now has one (below).

8. **The ledger.** `ledger.py find --cites` on the two Scala files gives rows 488, 455, 660, 320 and 290. Only 455 and 660 bear on the rung, and the record treats both. Row 29 (walk's multifix) gains a note for the tight juxtaposition.

9. **The report.**
   - The provenance lines were opened. `trait-parameters.tex:44-50`, `overloading.tex:531-559` and `inference.tex:149-151` say what the report says. So do `Operators.scala:176-197` and `:390-403`, `OverloadingChecker.scala:212`, `AbstractMethodChecker.scala:143`, `FortressLibrary.fss:3262`, `TypeAnalyzer.scala:224` and `:647-656`, and `TypeSchemaAnalyzer.scala:370`, `:194` and `:198`.
   - The one sentence of the specification made false is `changes.tex:2077-2081` at the base, amended.
   - The whole-suite run is `ant testQuick` on `816251130`'s code state.
   - The FACTS rewrite of the expected-type entry matches FACTS.md:93 and the head's line numbers (`:362-386`, `:390-403`).
   - `matrix[\RR32,2,2\](narrow(2.0))` is refused on the old code under walk, as the record's row 437 note says: 'Unification error: Closure/Constructor for init0 param 2 (v:RR32) got arg 0: ZZ32 of type Int'.

10. **Competing declarations.** The five test names the rung adds and the two the skeptic adds occur nowhere else in the test corpora, `ProjectFortress/src/` or `Library/`. No other rung branch of the batch touches them or the two Scala files. N and W touch other entries of `changes.tex`.

11. **The failure mode.** Two loud failures became something else; see "Findings", 4 and 5.

## The differential

The diff shows no mutable variable, field, atomic block or library state, so the programs ran at `FORTRESS_THREADS=1` only.
- **Old code:** `/home/user/fortress-base13/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base13 /home/user/fortress-arraybound/tmp/old-caches compile P.fss`, then `... run P`, and `... P.fss` for walk.
- **New code:** the rung tree's `bin/fortress compile P.fss` and `bin/fortress run P`, and `bin/fortress P.fss` for walk, with `FORTRESS_HOME` set to the rung tree and `FORTRESS_CACHES` to a private copy of its caches.

Every program declares `trait R[\T extends R[\T\]\]` and objects `A`, `B` below `K` and `R`. All but the first also declare `object C extends K` outside `R`, with `K comprises { A, B, C }`.

| program | compiled, old | compiled, new | walk |
|---|---|---|---|
| 1. the brief's shape, `K comprises { A, B }`, two `f` on ZZ32 and String | 'ZZ32 String' | 'ZZ32 String' | (not run) |
| 2. the brief's `g(x: T) = h(x)` | '** bug! Applied a substitution to an And and got an Or' | the same | 'PASS' (as the XXX test's program) |
| 3. a generic `f` beside `f(x: A)` and `f(x: C)` | 'ClassCastException ... UnionType cannot be cast' | 'AgenC' | (not run) |
| 4. two generic `f` with the same bound list | the cast | 'Invalid overloading of f in component SkOverDup' | (not run) |
| 5. generic `f: ZZ32` beside `f(x: K): String` | the cast | '... T->ZZ32 ... should be a subtype of the return type of K->String' (right) | (not run) |
| 6. generic `f: String` beside `f(x: K): String` | the cast | 'the return type of [\T extends K R[\T\]\]T->String ... should be a subtype of the return type of K->String' (wrong) | 'PASS' |
| 6'. the same with `K` open, or with no `C` | 'gengenK' / 'gengen' | the same | (not run) |

The tight juxtaposition and its neighbours ran on the compiled path, old and new, and under walk:
- **Numerals and strings, the same.** `a: ZZ64 = 2(3)`, `x(x)`, `x(x)(x)`, `1.5(2.0)`, `"a"("b")` and an exponent before a juxtaposition (`x^2(x)`, `2 x^2`) print the same old and new.
- **A non-generic overload, the same.** `t: ZZ64 = x(k)` with `juxtaposition` declared on `ZZ32` and on `ZZ64` prints '1   1   1' old and new. The expected type does not move the call to the `ZZ64` declaration.
- **A generic juxtaposition whose result type is its first argument's, the same.** It prints '3   3   3   s' old and new.
- **The expected type does not pick a less specific declaration.** A `(K, K): String` beside a generic `(Any, K): BoxV[\T\]` is refused old and new, tight and loose: 'Right-hand side has type String, but declared type is BoxV[\ZZ64\].'
- **What the rung repairs.** With a generic binary and a generic ternary `juxtaposition` returning `BoxV[\T\](n)`, the old code refuses `y: BoxV[\ZZ64\] = a(a)(a)` and `z: BoxV[\String\] = a(a)(a)(a)` ('Right-hand side has type BoxV[\Object\] ...'). The new code runs them: 'ZZ64: 3   String: 3   String: 2'. The `z` of four items gets the ternary's 3 (finding 4).
- **The arities, without expected types.** With `K(10 a.i + b.i)` and `K(900 + 100 a.i + 10 b.i + c.i)`, `a(b)(c)`, `a(b)(c)(d)`, `a b c` and `a b c d` print '1023   1234   123   1234' compiled, old and new. Walk prints '123 1234 123 1234': its multifix is absent, row 29.
- **The same arities, generic.** With both declarations generic the compiled path prints '1023   1023   123   1234', old and new. The four-item tight juxtaposition runs the ternary on `a`, `b`, `c` and drops `d`.
- **A call with an extra argument.** `g(a, a, a, a)` for `g[\T\](a: K, b: K, c: K)` compiles and prints '1011', old and new. The non-generic `g` is refused: '(K, K, K)->ZZ32 is not applicable to an argument of type (K, K, K, K).' Walk stops: '** bug! The number of parameters (3) does not match with the number of arguments (4).'

## Findings

1. **The brief's second test is not the one on file.** The brief asked for `g[\T extends { K, R[\T\] }\](x: T): T = h(x)` "refused on the base as `:2483` is". That form is not refused: it crashes in `Formula.slv`, on the base and on the head (program 2; the worker's probe `ProbeGH` at 16:44:12 showed the same). The worker's `XXXInferCallerTwoBoundsClosedTrait` takes the argument as `Box[\T\]`, and the report called it "the brief's second test" without saying that the brief's form crashes. Its stack is row 687's (`Formula.scala:593`, `STypesUtil.scala:1036`, `impls/Functionals.scala:371`, `:379`), with no numeral in the program, so row 687's claim did not cover it. Home 2: `XXXCallerParamTwoBoundsClosedTrait`, row 689.

2. **A valid overloading is refused where the base crashed.** Take a generic declaration with the bound list beside a declaration on the closed trait, both returning `String` (program 6). The overloading check now reports a Return Type Rule error. The rule holds, since `String` is a subtype of `String` (`advanced/overloading.tex`, "Declarations with Static Parameters"), and walk runs the program. An instrumented copy of `OverloadingOracle.satisfiesReturnTypeRule`, with its commented printlns at `:119-122` turned on, compiled into a scratch folder ahead of the classpath, printed:

       fa = [\T$3 extends K R[\T$3\]\]T$3->String [T$3 extends K R[\T$3\]]
       ra = [\T$3 extends K R[\T$3\]\]AND(T$3,OR(A,B))->String [T$3 extends K R[\T$3\]]
       result = false

   The special arrow's domain is the analyzer's normal form of the meet, `normConjunct` expanding `K` (`TypeAnalyzer.scala:647-656`), and `subtypeUA` of the generic declaration against it fails. That is the inference over the caller's two-bound variable, as in row 686. It was not traced further, and the files it would need are `Formula.scala` and `TypeAnalyzer.scala`, rung N's. The rung's crash fix is right; this is the next defect behind it. Home 2: `XXXReturnRuleTwoBoundsClosedTrait`, row 690. With the held library half the api's count stayed at 1 ('errors=2', the base's two), so no library pair met this.

3. **Row 688 was measured with the overloading memo off,** as the count and distance stages run it. A compile with the memo on, `OverloadingChecker.scala:78`'s default, was not timed. The claim now says so. The FACTS entry and the report's section 7 do too.

4. **The base's generic calls take extra arguments** (row 691, home 3: a refusal cannot be an `XXX` test while the program compiles).
   - A call of a generic function with more arguments than parameters is accepted, and the code drops the extra ones. So is a tight juxtaposition of four items against a generic ternary `juxtaposition`.
   - This is the base's defect, not the rung's. But the rung's expected type removes the one refusal that stopped such a program: `z: BoxV[\String\] = a(a)(a)(a)` was refused on the base for its expected type. It now checks and runs the ternary, 'String: 3', where the specification's left-associated binary applications give 2 (`juxtameaning.tex`, "Juxtaposition"; `chained-multifix.tex`).
   - This is the failure-mode answer for the tight juxtaposition. The quiet value comes from row 691, which an untyped `z = a(a)(a)(a)` already reached on the base ('3', program `SkJuxtArity`, old code).

5. **A changed diagnostic, not a defect.** `u: String = k(k)` with `opr juxtaposition[\T extends ZZ32\](a: K, b: K): T` drew 'Right-hand side has type ZZ32, but declared type is String.' on the old code. On the new code it draws 'Could not check call to operator juxtaposition' and a list of the prelude's declarations as not applicable. The loose `k k` gave that message on the old code already. A plain operator application with an unsatisfiable expected type, `k OPLUS k`, gives it on both: 'Could not check call to operator OPLUS ... [\T extends ZZ32\](K, K)->T is not applicable to an argument of type (K, K).' The tight juxtaposition now reads as every operator application does. The program is refused either way. No compiled test pins the old message (`ant testQuick` green).

6. **Walk's multifix (row 29) for the tight juxtaposition.** Under walk, `a(b)(c)` with a ternary `juxtaposition` runs the binary ones ('123' against the compiled '1023'). A note for row 29 is in `record.md`.

7. **The hold of fork 2's library half.**
   - The worker's measurement is in its logs. With the bound, the count stage's checker spends 17 minutes in `checkApi FortressLibrary` against the stage's `timeout -k 10 900` (`explorations/coordinator/tools/checker-count/run.sh:69`). Landing the half would leave the batch's gate without a count.
   - The worker argues for the behaviour, not only the form, and the record leaves the choice to the curator. So the skeptic does not land it and does not contest the hold.
   - The rung, as it stands, reaches no walk value change. The report's point on `matrix(v)` for `NN32` and `NN64` was measured on the held half only.

## The skeptic's commit

`5773dbfbd`, "Skeptic's correction: ...". It holds corrections only, and no code.
- **`XXXCallerParamTwoBoundsClosedTrait`** (finding 1) and **`XXXReturnRuleTwoBoundsClosedTrait`** (finding 2), in `ProjectFortress/compiler_tests/`.
  - On the old code, `old-fortress.sh /home/user/fortress-base13 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/XXXCallerParamTwoBoundsClosedTrait.test <tree>/ProjectFortress/compiler_tests/XXXReturnRuleTwoBoundsClosedTrait.test` printed:

        . compile .../XXXCallerParamTwoBoundsClosedTrait ** bug! Applied a substitution to an And and got an Or
         Saw expected failure
        . compile .../XXXReturnRuleTwoBoundsClosedTrait
         Did not satisfy compile_err_contains; expected
        should be a subtype of the
        java.lang.ClassCastException: class com.sun.fortress.nodes.UnionType cannot be cast to class com.sun.fortress.nodes.BaseType
        Tests run: 2,  Failures: 1,  Errors: 0

  - On the head, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests XXXCallerParamTwoBoundsClosedTrait.test XXXReturnRuleTwoBoundsClosedTrait.test` printed 'Saw expected failure' twice and 'OK (2 tests)'.
  - The red check of the first, with `h[\T\](x)` written and then restored (`junit.sh skred`), printed 'Saw wrong failure. compile' and 'Tests run: 1,  Failures: 1'.
  - Both programs print 'PASS' under walk. The first prints 'PASS' compiled with the static argument written.
- **`record.md`.**
  - The FACTS entry now names the crash on a call through the caller's own parameter, the false Return Type Rule error and the memo-off condition.
  - Row 688's claim says the memo was off. Rows 686 and 687 list their siblings.
  - The new rows are rows 689, 690 and 691; all eight rows pass `ledger.py check --rows` apart from the placeholder number.
  - Row 29 gets a note, and the handover line is updated.
- **`REPORT.md`.** Section 2 says that the brief's form of the second test crashes. Section 7 adds the memo condition. Section 9 lists rows 689 to 691.

No code changed, so no suite ran after the commit. The rung's code state is the worker's, whose `ant testQuick` is the record, and the gate runs every suite on the merged tree. The report's tables are those of the worker's head.

## Where the skeptic differs from the worker

- **Points to report.** The rung as it stands reaches these:
  - the norm's call refused, in its test form;
  - the stage's FortressLibrary time, 666 s against 739 s;
  - fork 2's library half not landed.

  It does not reach the walk value changes: they belong to the held half.
- **Q-V2.** The skeptic's program 1 confirms the shape's measurement. It needs no decision, but it stays the worker's question.

## Verdict

Approved. The crash fix and the tight juxtaposition's expected type are right and in their place, tested first. The hold of fork 2's library half is argued with evidence and goes to the curator as Q-V1. The record is corrected where it was narrower than the measurements. Nothing is contested.
