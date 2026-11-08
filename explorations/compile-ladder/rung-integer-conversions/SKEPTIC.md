# Rung V, the integer conversions: the skeptic's verdict

Climb batch 28, rung V (rung-integer-conversions), branch wip/rung-integer-conversions. Judged at the worker's head 16f09c2a, on base 157323e51. Verdict: **approved**, with two corrections (616d1a23, b9ef9982), none contested.

The worker's REPORT.md and record.md were already on the branch (8857b01e, c726d6a0, 16f09c2a), so the journal tool wrote nothing and no journal commit was made.

## What I checked

1. **The stages.** Both ran on the code of 2d49a587: the count stage at 03:08:22Z and the distance stage at 03:10:46Z (worker transcript, calls `X43Tx1` and `5vWU3v`), after the last code change at 02:50:37Z (call `JeetCj`) and after the build of the helper at 02:46:02Z; nothing after them changed code (227979aa and later are prose). The worker's count table, read and diffed against `explorations/compile-ladder/climb-batch-27/gate/checker-count.txt`, is identical (`#total 0`, `#crash none`). Its distance table reads `#total 0`, `#crash none`, and `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-27/gate/distance.txt <the worker's distance table>` prints:

        DISTANCE SAME   0
            crash gone   decl	ObjectDecl FortressBuiltin.fss:661:1-773:2	IllegalArgumentException	Comparison method violates its general contract!
            crash gone   stage	component FortressBuiltin leftover	InterpreterBug	** bug! Result of typechecking still contains intermediate nodes. Component at FortressBuiltin.fss:12.1
            crash new    none

   The stage's full output holds `@@TC DECL-OK ObjectDecl .../FortressBuiltin.fss:669:1-781:2 errors=0` for value object Char. The report's tables are those of the worker's head; I ran no stage (my commits change two tests' text and prose only).
2. **Test first.** IntegerConversionsWalk and IntLiteralTextWalk were written at 02:42:45Z and 02:42:56Z, IntegerConversionHelpersCompiled at 02:43:47Z; the harness ran them on the base's code at 02:44:03Z to 02:44:13Z (call `WS2npQ`, 'Cannot find definition for method asZZ32 given receiver -2147483648: ZZ32', 'Tests run: 2,  Failures: 1,  Errors: 0') and junit.sh at 02:44:25Z ('builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleArbitraryPrecisionArith.bigOverflowingToLong', 'Tests run: 3,  Failures: 2'), before the helper's edit (02:45:55Z), its build (02:46:02Z) and the first library edit (02:46:15Z). The last walk pass is in the same call as the last code change (`JeetCj`, harness at 02:50:38Z, 'OK (2 tests)'), and junit.sh passed at 02:50:55Z ('OK (3 tests)'). XXXZZNarrowRungP was rewritten at 02:44:41Z, shown green (02:44:49Z) and red on a deliberate fix (02:44:59Z). The rule of tests-writing.md, "The order", holds.
3. **The diff against P-161, P-169 and forks V1 to V6.** The 25 getters are as P-161 counts them: 5 identities, 7 coercions (each the coercion's own body: ZZ32's `widen(self)`, `big(self)`; NN32's `signed(widen(self))` as ZZ64's `coerce(x: NN32)`, `Library/FortressLibrary.fss:871`; NN32's big as ZZ's `coerce(x: NN32)`, `:1087`), 13 that can raise. The nine low-bits names are exactly option 1's nine (`explorations/reviews/integer-conversions-2026-11-06.md`, "Option 1"). ZZ's narrow and widen are gone from the component and the api; ZZ32's big names makeZZfromZZ32 (`Library/FortressLibrary.fss:860-861`); IntLiteral's 8 are as fork V2 and V3 give them (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:544-551`, `:557`, `:570-574`), their api lines unchanged. No prelude, walk or checker file is in the diff. The Appendix I entry's Effect matches the prelude: its getters at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:150-152`, `:212-214`, `:275-277`, `:335-337` and its methods at `:206-207`, `:269-270`, `:328-329`, `:386-387`, none on `trait ZZ` (`:103-145`), no big. The overflow sentence it cites is in the Working Draft too (`Specification-1.0-frozen/basic/operators/opr-overview.tex:155`). P-161 is dated 2026-11-06 in its history, as the entry says.
4. **Where the fix belongs.** The precedents the report cites are right: QQ's `ceiling` and `truncate` with `throw DivisionByZero` (`Library/FortressLibrary.fss:635`, `:640`); the prelude's checked `asZZ32` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:581`); powerCount32's `signed(c)` arms (`Library/FortressLibrary.fss:747-751`); the prelude's `trait IntLiteral` (`CompilerBuiltin.fss:883-889`). The new helpers follow P-162 and the review's option 3 reading of helpers for "ZZ to ZZ64 and to NN64"; the compiled test binds at the Java types, as `compiler_tests/NativeHelperFamilyNN64Compiled.fss` does.
5. **The tests.** They exercise rows 858, 859 and 502 (widen of the NN64 2^64-1, the nine names, asZZ64 of 2^63 and 2^64+5). Two defects of form, corrected (below): IntegerConversionsWalk carried fourteen comment lines, and IntLiteralTextWalk cited `literals.tex`, section "Literals", for values that section does not state. The citations of `basic-integers.tex`, section "Integers", say what the revised section says.
6. **My programs** (below): the moved callers old against new under walk at one and four threads, the getters' further edges on the new code, and the helpers bound at NN32 and NN64 on the compiled path, old against new.
7. **The homes.** Rows 858, 859, 502: home 1, IntegerConversionsWalk. Row 856: its notes say it closes when the checked getters land; they do. Row 349: home 2, XXXZZNarrowRungP, its whole new line in record.md, checked against the prelude's lines above. QuickCheck's perturb beyond ZZ64: row 431 rewritten, home 3, a row with no reproducer since no gated walk run reaches it (row 387 is the generator's limit the worker names).
8. **Sibling sites.** `git grep -n -E '\b(narrow|widen)\b'` over the one library, the demos, the test library, the model and the other test folders, each argument's type read: every other call is on a ZZ32, ZZ64, NN32, NN64 or RR64 (`Library/Random.fss:213`, `:239`, `:245`, `:387` take a ZZ64 or an N that `linearCongruential` fixes at ZZ64, `Library/Random.fss:256-260`; `Library/QuickCheck.fss:43` a ZZ64 random; the demos' `narrow(truncate(random(...)))` and `narrow(|\SQRT(...)/|)` a ZZ64, `random(a:RR64):RR64` at `Library/FortressLibrary.fsi:2676`). No XXX walk test calls them on a ZZ, and no harness-skipped test calls them. Rows found with `ledger.py find` on narrow, widen, asZZ32, asZZ64, unsigned and signed: 328, 318, 578, 700 bear on the touched code and none changes.
9. **The report.** Each cited line of the provenance lines and of "What changed" opens to what it claims. The bindings' counts recount: builtinPrimitive strings in the one library's .fss files 418 (340 helpers, 78 glue) at the base and 413 (346, 67) at the head. One FACTS entry made false was missing, F-32, and record.md's "Revival change" said the team's walk library had no checked conversion; both corrected (below). The suites: `ant testSystem` and `ant testQuick` ran after the code commit on its code ('BUILD SUCCESSFUL', 188, 199, 192, 201 and 1449, 86, 263 tests, 0 failures).
10. **Competing declarations.** No test corpus or `ProjectFortress/src/com/sun/fortress/` file declares a getter named asZZ32, asZZ64, asNN32, asNN64, asZZ or bitsAs…, or a method bigOverflowingToLong or bigOverflowingToUnsignedLong; simpleArbitraryPrecisionArith has one method of each name, so the rewrite adds its transfer helpers.
11. **The failure-mode question.** No loud failure becomes a quiet wrong value. The changes of mode: narrow of an NN32 ('Ambiguous coercion') and big of an NN64 or a ZZ ('Failed to find any matching overload') now answer, as P-161 asks; widen of an NN64 answers the NN64 itself, not the ZZ64 -1; narrow and widen of a ZZ, which kept the low bits quietly, now find no declaration; and QuickCheck's genZZ.perturb, which kept the low 64 bits of a ZZ beyond ZZ64, now raises IntegerOverflow there (the worker's question for the curator).

## My programs

**The moved callers, old against new, under walk.** `SkCallersBoth.fss`: Format's radix at the ends of ZZ64 and digitSeparator in both forms; ZZ32, NN32 and ZZ64 shifts and ZZ32, NN32 and ZZ powers by a ZZ count or exponent (shiftCount32, powerCount32, countNN32, exponentNN32); ZZ32's big at 0, 1, -1 and its ends; genZZ.perturb at fourteen values from 0 to 2^70+7. New: `FORTRESS_CACHES=<private> bin/fortress SkCallersBoth.fss`, at FORTRESS_THREADS=1 and =4 (the same 41 lines). Old: `old-fortress.sh /home/user/fortress-base28 <worktree>/tmp/old-caches SkCallersBoth.fss`. `diff` of the two runs prints only:

    < perturb 2^63: 1543497436
    < perturb -2^63-1: 1724079282
    < perturb 2^70+7: 1001751898
    ---
    > perturb 2^63: IntegerOverflow
    > perturb -2^63-1: IntegerOverflow
    > perturb 2^70+7: IntegerOverflow

   The other 38 lines agree, among them 'radix16 min: -8000000000000000', 'sep4 1234567.891011: 1,234,567.891,011', 'ZZ32 -8 LSHIFT ZZ -2^40: -1', 'NN32 2 ^ ZZ 31: 2147483648', 'ZZ32 -1 ^ ZZ 2^70+1: -1', 'big ZZ32 0, 1, -1, max, min: 0 1 -1 2147483647 -2147483648', 'perturb 2^63-1: 1724079282' and 'perturb -2^63: 1543497436'.

**The getters' further edges, new code, under walk.** `SkGettersNew.fss` (`bin/fortress SkGettersNew.fss`, private caches), each as the revised `basic-integers.tex` states:

    ZZ 2^40 asZZ32 = IntegerOverflow
    ZZ 2^40 asNN64 = 1099511627776 : NN64
    ZZ 2^128 asZZ64 = IntegerOverflow
    NN64 2^64-5 asZZ32 = IntegerOverflow
    NN32 2^32-5 narrow = 4294967291 : NN32
    numeral 3000000000 asNN32 = 3000000000 : NN32
    numeral -1 asNN64 = IntegerOverflow
    IntLiteral asZZ32 = 0 : ZZ32

**The helpers on the compiled path, at the library's own types.** `SkHelpersAtNN.fss` binds bigOverflowingToUnsignedLong with result NN64 and longOverflowingToUnsignedInt with result NN32, as the library does, so the rewrite passes them through the transfer helpers (the worker's test binds at ZZ64 and ZZ32). New: `bin/fortress compile SkHelpersAtNN.fss && bin/fortress run SkHelpersAtNN`:

    NN64 of ZZ 2^63 = 9223372036854775808
    NN64 of ZZ 2^64-1 = 18446744073709551615
    NN64 of ZZ 2^64 = IntegerOverflow
    NN32 of ZZ64 2^32-1 = 4294967295
    big of ZZ32 max, min = 2147483647, -2147483648

   Old: the compile stops, 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleArbitraryPrecisionArith.bigOverflowingToUnsignedLong'; its copy without the two new helpers compiles and runs on the old code with the same three NN32 and big lines.

## Fixes

1. **616d1a23, a correction of the rung's tests.** `ProjectFortress/tests/IntegerConversionsWalk.fss` carried thirteen interior comment lines beside its topic line (`grep -c '(\*'` printed 14); a test carries one comment line (fortress-repo skill, tests-writing.md, "Names, comments, citations": "Give it one comment line that says what it checks"; the brief's check 5, "the file carries at most one comment line"). They are removed. `ProjectFortress/tests/IntLiteralTextWalk.fss:18-22` cited `literals.tex, section "Literals"` for "the object IntLiteral as a ZZ32 is 0" and its four siblings; that section says that a numeral has the type IntLiteral and that the integer types coerce from it (`Specification/basic/expressions/literals.tex:149-153`), not what the object's getters answer. The five now read "pins the library", as the file's other eight do (settled by the brief's check 5, "the section says what the message says"). No assertion or value changes. Through the harness: on the head, `harness-one.sh <scratch> ProjectFortress/tests/IntegerConversionsWalk.fss ProjectFortress/tests/IntLiteralTextWalk.fss` at 06:06:10Z, tree 16f09c2a with the edit, 'OK (2 tests)'; on the old code, `FORTRESS_HOME=/home/user/fortress-base28 /home/user/fortress-base28/explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> <the two files>` at 06:06:29Z, 'Cannot find definition for method asZZ32 given receiver -2147483648: ZZ32', 'Tests run: 2,  Failures: 1,  Errors: 0', IntLiteralTextWalk 'PASS'.
2. **b9ef9982, a correction of the record.** record.md's "Revival change" said that the team's walk library "declared no checked conversion" on the integer types; at the team's last commit ZZ64's narrow raised "Overflow of ZZ32", which the revival made keep the low 32 bits (P-72; `explorations/reviews/integer-conversions-2026-11-06.md`, "3.2 The library as the team wrote it"). The sentence now says so. F-32 ("The compiled path cannot reuse walk's glue classes …") holds the counts 102 of 443 and the 341 of F-299, and says that none of object IntLiteral's 29 can move yet; the rung changes both, and record.md's "FACTS entries made false" and REPORT.md's "Sentences made false" now list it.

No fix is contested. No suite ran for them: they change no Java, Scala, walk or shared phase, and no library source.

## Where I differ from the worker

- Decision 1 (two new helpers for ZZ's asZZ64 and asNN64) is sound: fork V1's default wraps a low-bits form, and ZZ has none after the deletion that P-161 orders. It departs from fork V1, a default of the batch record, not a decision on record; the worker's question for the curator stands.
- Decision 4 (QuickCheck.fss:322 onto `.asZZ64`): the review's option 6, which P-161 adopts whole, names `.asZZ64` for this line, but P-161's "with their values unchanged" fails for a ZZ beyond ZZ64, and a program reaches that value by calling a generated function of a ZZ at it (the probe's random function at 2^70+7 does). The worker's question for the curator stands; the change is reversible.
- The report says the perturb change is "unreachable under walk (row 387)"; the generator makes no such value, but a property that calls a generated function at one reaches it.

## Verdict

Approved. The change does what P-161, P-169's numerals and forks V2 to V6 ask, with fork V1 departed from for ZZ only and reported; the tests failed on the base before the edit and pass after; the stages equal climb batch 27's 0 and 0, with row 929's two Char crash rows gone on this tree; the record is honest after the two corrections.
