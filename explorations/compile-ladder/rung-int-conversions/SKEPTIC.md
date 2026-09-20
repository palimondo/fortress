<!-- First judgement of rung W of explorations/coordinator/CLIMB-BATCH-2.md, written 2026-09-20 by the skeptic.  The worker's account is in REPORT.md; this is a check of it, not a summary.  One line per paragraph. -->

# Skeptic, rung W (`rung-int-conversions`)

**Verdict: approved, with five required corrections.** Four are sentences in `REPORT.md`; the fifth is one gated expected-failure test, because one of the defects I measured is settled by the specification and deferred, which is home 2 and not a ledger row alone. None of the five touches the rung's source, its test or the rows it opens. The edit is right, minimal and agrees with the interpreter everywhere the interpreter has an answer; I ran nine differential programs of my own and the four conversions matched `walk` on all sixteen in-range and reinterpretation cases. Four of the corrections close the record: one fact the failure-mode question requires and the report does not carry, one change to the test made after the failure was captured and not disclosed, one specification passage the report quotes without noticing that the lines it counts contradict it, and one citation that is false of the tree it points at. The fifth gives that specification passage's defect the gated home the batch assigns it.

## 0. The provenance block

Five line kinds, all present: `problem`, `spec`, `precedent`, `deviation` (four of them) and `historical`. I opened every `file:line` with `sed -n` and every one says what the block says.

- `problem` — `ProjectFortress/tests/fib13.fss:30` is `assert(fib13[\NN32\](unsigned(20)),6765,"fib(20) wrong")`. ✓
- `spec` — `Specification/basic/operators/opr-overview.tex:155` is exactly "For integer results, overflow throws an \TYP{IntegerOverflow}." with `:154` the sentence it depends on. ✓ The line does not cite `Specification/library/apis/` anywhere, which rule 3 forbids.
- `precedent` — `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:576` is `getter asZZ32(): ZZ32 = jLongOverflowingToInt(self)`. ✓
- `deviation` 1 — `interpreter/glue/prim/UnsignedLong.java:59-60` is `public final FValue applyMethod(FObject x) { return FLong.make(f(x.getNN64())); }` inside `abstract class U2L`, and `ToLong extends U2L` at `:224-228`. ✓ The glue does return a `ZZ64`.
- `deviation` 2 — `ProjectFortress/tests/UnsignedTest.fss:210-211` are `assert(widen(narrow(-x1)),(x1 LSHIFT 32)-1)` and `assert(widen(narrow(x1 LSHIFT 63)),x0)`. ✓ Exactly two lines, and `:212` at 2^31 is in range and survives the rung's choice, so the report's count of the cost is right and not rounded up.
- `deviation` 3 — `CompilerBuiltin.fss:86` is the added `simpleUnsignedIntArith.toLong => jUnsignedIntToLong`. ✓
- `deviation` 4 — `CompilerBuiltin.fss:816` is `coerce(x: NN32) = jMakeNN64FromZZ64(jUnsignedIntToLong(jMakeZZ32FromNN32(x)))`. ✓
- `historical` — `CompilerBuiltin.fsi` and `CompilerBuiltin.fss`. Those are the only two files of the 2012 tree the diff edits (`git diff 8590d7a9e...HEAD --stat`); nothing is omitted.

## 1. The recorded failure

It exists and it is genuine. Commit `afdfee382`, "rung W: the failing test and its recorded pre-edit failure", carries `library_tests/IntConversionsRungW.fss`, its `.test`, and the two captures, and touches no file under `LibraryBuiltin/` — I checked with `git show --name-only afdfee382 | grep -c CompilerBuiltin`, which is `0`.

`raw/IntConversionsRungW.compile.before.txt` ends `File IntConversionsRungW.fss has 69 errors.` with `compile exit=255`, and my own count over that capture gives `widen` 22, `unsigned` 21, `narrow` 16, `signed` 10, which is 69 with nothing else in it. `raw/IntConversionsRungW.junit.before.txt` ends `Tests run: 2,  Failures: 2,  Errors: 0`.

One thing the report does not say and should. The test was written with `.asString` and changed to `.asZZ.asString` in fifteen places **after** the failure was captured — `git diff afdfee382 HEAD -- ProjectFortress/library_tests/IntConversionsRungW.fss`. The change is defensible and the report argues for it on its merits (open row 326), but it is presented as an a-priori decision rather than as an adjustment made between the capture and the pass, and a reader comparing the capture to the file that now passes finds fifteen lines that differ. The 69 errors are all name-resolution errors at disambiguate and cannot be affected by a getter chain, and the assertion count is 47 in both versions, so nothing material moved — which is exactly what the record should say. **Required correction 1.**

## 2. The diff

Read line by line against the report. It is eight declarations, eight one-line bodies, one native binding and one token changed in an existing body, and nothing else: no `.java`, no `.scala`, no renamed or removed declaration, no change to a declared type the prelude already had. The eight bodies are what the report's table says they are, at `.fss:654-655`, `:745-746`, `:810-811`, `:874-875`, and the eight declarations at `.fsi:206-207`, `:269-270`, `:328-329`, `:386-387`. The two extras are each needed by something the test asserts: `jUnsignedIntToLong` by `NN32.widen`, and the `coerce` token by the three `takesNN64` assertions. It is as small as the test needs.

The natives do what the bodies assume. `simpleUnsignedIntArith.toLong` (`:19-23`) masks with `0x00000000FFFFFFFFL`, so it zero-extends. `toUnsignedIntOverflow` (`:25-29`) throws when `l & 0xFFFFFFFF00000000L` is non-zero, which is exactly the representable range of an `NN32` read out of the `long` that carries an `NN64`'s bits, so `NN64.narrow` throws for every out-of-range value and for no in-range one. `simpleIntArith.longOverflowingToInt` (`:94-98`) throws when `(int)l != l`. `simpleLongArith.intToLong` is `(long) i`, so the old `coerce` did sign-extend.

## 3. The precedent search

It is answered by citation inside the file being edited, and I re-counted every number in it.

- Seven `ZZ64`→`ZZ32` natives bound at `:33`, `:40`, `:41`, `:42`, `:43`, `:51`, `:58`. ✓ exactly those seven lines.
- Three `NN64`→`NN32` natives bound at `:86`, `:94`, `:101`. ✓ exactly those three. `jLongWrappingToUnsignedInt` and `jLongSaturatingToUnsignedInt` are still called nowhere past the import block (count 0), so the reserved-and-unused claim holds for two of the three.
- `jLongLowHalfToInt` is used sixteen times past the import block. ✓
- `jLongOverflowingToInt` is used twice in the landed tree, `asZZ32` at `:576` and the rung's own `ZZ64.narrow` at `:654`, so once before the edit. ✓
- "Thirteen plainly-named members of `NN32`/`NN64` take an Overflowing native; nineteen more in `ZZ32`/`ZZ64`." I counted `Overflowing` per trait range in the landed tree: `ZZ64` 11, `ZZ32` 9, `NN32` 7, `NN64` 7. Subtract the rung's own two new bodies and that is 19 signed and 13 unsigned. ✓ The numbers are the pre-edit counts and they are right.
- The one site that was wrong: `jIntToLong` applied to `NN32` bits appeared once, at the old `:809`. I confirmed it: `jIntToLong` is now at `:575` (`ZZ64.coerce(x: ZZ32)`) and `:745` (`ZZ32.widen`), neither with an `NN32` on the other side. The site count rule 2 asks for is given and it is one.

The right precedent was followed in each case: `asZZ32`'s Overflowing native for `narrow`, the four `bitsAs*` getters' natives for `unsigned`/`signed`, the interpreter's glue (not its api) for `widen`'s two extension kinds, and the interpreter's api placement for where the declarations go.

One citation is false of the tree it points at. The precedent section says of `:86`, `:94`, `:101` that "none is called anywhere in the file" — true before the edit, and `:86` is called by the rung's own `NN64.narrow` in the tree the line numbers belong to. The report is careful about exactly this for `jIntToLong` one paragraph earlier and not here. **Required correction 3.**

## 4. The test

It exercises what the rung's tail names. 47 assertions; every direction on every type; `widen` of a negative `ZZ32`, of the `ZZ32` minimum and of an `NN32` above 2^31; `narrow` in range at 2^31-1, -2^31 and 2^32-1 and out of range on both sides in the `shouldOverflow` shape of `library_tests/Integer3.fss:17-24`; `unsigned`/`signed` round trips at -1 and at both minima; and `NumberPrintTest.fss:54-55`'s two identities, asserted equal to each other and then again at -1 where they part.

It carries one comment line, `:14`, pointing at `REPORT.md`, and nothing else; the nine-line header is the same Oracle boilerplate every file in `library_tests/` carries. No provenance essay.

I ran it myself: `../bin/fortress junit library_tests/IntConversionsRungW.test` gives `. run library_tests/IntConversionsRungW (447ms) PASS` and `OK (2 tests)`, captured as `probes/skeptic/skeptic-junit-IntConversionsRungW.txt`. The `.test` is the form of `library_tests/IntegralOpsRungN.test`, which I opened: same four keys, same order.

## 5. The competing-declaration grep

Run myself over both corpora and over `ProjectFortress/src/com/sun/fortress/` whole.

Corpora: `grep -rnE '(widen|narrow|unsigned|signed) *\( *self'` over `tests/`, `compiler_tests/`, `library_tests/`, `not_working_library_tests/`, `not_passing_yet/`, `not_working_static_tests/` and `static_tests/` returns exactly two lines, `not_working_static_tests/BuiltinTest.fss:68` and `:72`, in a corpus no gate target sweeps. ✓ No `library_tests/` or `compiler_tests/` collision.

Preludes: the eighteen interpreter-side declarations the report lists are there, plus `RR64.narrow` at `FortressLibrary.fsi:365` / `.fss:471` / `FortressBuiltin.fss:77`. ✓

`src/com/sun/fortress/` whole: no string literal `"widen"`, `"narrow"`, `"unsigned"` or `"signed"` anywhere. Every `widen` token is `widens` (82 occurrences, no others). Every bare `narrow` token is inside `downarrow`, `updownarrow`, `gconarrow` or `gcongenarrow` — `parser_util/precedence_resolver/operators.txt:575-576` and `interpreter/glue/prim/Reflect.java`. ✓ The worker's claim holds.

## 6. `record.md`

The four FACTS lines are true as written and each is sourced to a line I opened.

- The eight declaration and body line numbers are right, checked one by one.
- The convention line's counts are the pre-edit counts and they are right (section 3 above).
- The `NN64.coerce` line: `simpleLongArith.java:302-304` is `intToLong`, `AverageTest.fss:119` and `:121` declare `unsignedLongSeed: NN64` and `unsignedIntMult: NN32`, `:138` is the `BOXCROSS` that coerces the `NN32`, and `:110` is `testUnsignedLongAverage(i.bitsAsNN32, j.bitsAsNN32)` with `i, j <- 0:7`. ✓ Both coerced operands are below 2^31, so the repair is value-neutral there, and `AverageTest` is the ninth component of `library_tests/Integer.test:10`. ✓
- The harness line: `FileTests.java:932` is `boolean shouldFail = s.startsWith("XXX");` inside `suiteFromListOfFiles`; `:768` is `interpreterSuite("tests", true, false)` against the signature at `:772`, whose third parameter is `expect_failure`; `:825-829` hands that `false` to each `InterpreterTest`; `:346` is `if (f.contains("XXX"))` inside a `catch (Throwable ex)` block, which tolerates a failure and cannot turn red on a success. ✓ The conclusion — an interpreter-only defect has no gated expected-failure home in this tree — is established. Note that the worker re-anchored these line numbers rather than copying the shared prefix's (`:922`, `:577`, `:644`, `:841`), which do not match this tree; the worker's do.

The ledger note cites row 326, which exists at `explorations/fortress-gap-ledger.md:337` and says what the amendment says it says, and it renumbers nothing. The three new rows are numbered provisionally 343-345 from the ledger's highest row, which I confirmed is 342, and the note says in as many words that the gather assigns the final numbers. A reader six months out can check every one: each row names its probe by path, and all three probes and their captures are committed.

One overstatement, not required to change: the amendment says "the fix named in this row is incomplete on the `NN64` side", where row 326 already reads "plus whatever `NN32.asString` and `NN64.asString` reach in the prelude". The amendment's real contribution is the two *mechanisms* — the shadowing `FNN32.asString` and the signed `simpleUnsignedLongArith.unsignedLongToString` — and that contribution is new and worth having.

## 7. The three homes

- **D1, home 1, verified.** The repair of `NN64.coerce(x: NN32)` is gated by three assertions, `IntConversionsRungW.fss:115-117`, which reach the coercion through `takesNN64(x: NN64)` at `:34`. They were in the file before the edit existed (`git show afdfee382:…` shows all three) and they pass now: I ran the test myself, `OK (2 tests)`. The assert messages carry `conversions-coercions.tex:73-75`, which I opened — it is the "a value of type `T` can be used to 'stand in' for a value of type `U`" sentence, which is the clause the repair rests on. The citation lands on real text.
- **D2, D3, D4, home 3.** Each has a committed `.txt` capture (`probes/probe-NarrowUnsigned.txt`, `probe-NarrowSigned.txt`, `probe-SignedType.txt`, all tracked) and a provisional row that cites it. The report shows the grep that establishes the silence and lists all five hits it returns; I re-ran it and got the same five, and I confirmed `basic-lib/basic-integers.tex` has one `\section{Integers}` at `:13` and no section for any of the four fixed-size types. D2's row says in as many words that it is there because the specification is silent.
- **D5** is open row 326 and takes an amendment, not a home. The report's reason for not gating it — `asString` appears nowhere in the specification — I checked, and it is right.
- **No home 2.** The report does not manufacture an `XXX` file and gives the harness citations for why it cannot; I verified all four of them (section 6). That is the honest answer, and I agree with it.
- **From my own findings:** none of the three defects I add is repairable inside a library rung, so none takes home 1. They take rule 4's fourth case — land, and open a row. They are in `recommendedRows`.

## My own differentials

Nine programs the worker did not write, under `probes/skeptic/`, each run under `bin/fortress FILE.fss` and under `bin/fortress compile` + `bin/fortress run`. The rung touches no mutable state, no field, no `atomic` block and nothing that writes into `CompilerLibrary`'s state — the diff is eight pure conversions over immutable values and one changed coercion — so one thread is enough and I ran at the default.

| probe | `walk` | compiled | outcome |
|---|---|---|---|
| `SK1Conv` — ten cases: `widen` of -1 and of the `ZZ32` minimum, `signed(unsigned(…))` on `ZZ32` and `ZZ64` at -1 and at the `ZZ64` minimum, `NN32.widen` at 2^32-1 and 2^31, `narrow` round trips both sides | -1, -2147483648, -1, -1, -9223372036854775808, 4294967295, 2147483648, -2147483648, -1, -2147483648 | identical, all ten | agree |
| `SK2Ambig` — `unsigned(1)` and `widen(124867)` with **no expected type** | 1, 124867 | 1, 124867 | agree; the collision the batch record warned about does not happen |
| `SK2bNumberPrint` — `NumberPrintTest.fss:52-55` verbatim | 1, 1, 43, 43 | 1, 1, 43, 43 | agree |
| `SK3Tower` — `narrow` of a `ZZ32`, `widen` of a `ZZ64` | 43, 43 | `narrow` 43; **`widen` is a type error** | divergence, specification silent → recommended row S2 |
| `SK4Bounds` — `ZZ64.narrow` guarded, at 2^31-1, 2^31 and -(2^31+1) | in range fine; **2^31 kills the program with an uncatchable `ProgramError`, "Overflow of ZZ32 2147483648"**; the third case never runs | in range fine; both out-of-range cases "IntegerOverflow caught" | specification settles it against `walk` → confirms row W-3 at two values the rung did not use |
| `SK4bBounds` — `NN64.narrow` guarded, at 2^32-1 and 2^32 | 2^32-1 in range; **2^32 truncates to 0, silently** | 2^32-1 in range; 2^32 "IntegerOverflow caught" | specification silent → confirms row W-2 at the *first* out-of-range value; the rung measured 2^63 and 2^64-1 only |
| `SK5Coerce` / `SK5bCoerce` — the `NN32`→`NN64` coercion in three positions | arithmetic-operand position 4294967296; in the other two the value stays an `NN32` under `walk`, so `signed` picks the `ZZ32` overload and prints -1 | 4294967295, 4294967295, 4294967296, and `coerce = widen` true | agree wherever `walk` actually widens; confirms D1's repair in the arithmetic-operand position, which the rung's test does not cover |
| `SK7Type` — `signed` of an `NN64` and of an `NN32` passed where a `ZZ64` is wanted | -1, -1 | -1, -1, **and it typechecks** | agree, and this is the independent proof that decision 2 was necessary: with the interpreter's `signed(self):NN64` spelling the compiled call would not typecheck |
| `SK8Wrap` — `NN32` maximum `BOXPLUS` 1 and `DOTPLUS` 1 | both operators undefined in the interpreter prelude | ⊞ gives 0 (wraps), ∔ gives 4294967295 (saturates) | **specification settles it against the compiled path** → recommended row S1 |

Two of the nine were worth the trouble beyond confirmation. `SK5Coerce` found that `one: NN64 = 1` is refused under `walk` ("RHS expression type Int is not assignable to LHS type NN64"), which is the interpreter limitation row 326 already names, and is why the coercion probe had to be rewritten to reach an `NN64` through `widen`. And `SK7Type` turns decision 2 from an argument into a measurement.

## The failure-mode question

The rung does replace a loud failure with a quiet value, twice, and one of the two is unrecorded.

**The four names themselves.** Before the rung, every use of `widen`, `narrow`, `unsigned` or `signed` on the compiled path was a disambiguate-time `Variable X is not defined` and `exit 255` — the compile refused. After it, they compute. The values are established: identical to the interpreter on all ten `SK1Conv` cases, all four `SK2bNumberPrint` cases, both `SK7Type` cases and the arithmetic position of `SK5bCoerce`. This is the rung's purpose and the values are the interpreter's wherever the interpreter has one. The same shape is on record for a previous rung, ledger row 330's closing sentence about `round` and `truncate`.

**`narrow` applied to a `ZZ32`, which the record does not mention.** `narrow` is declared on `ZZ64` and `NN64` only, but `ZZ64.coerce(x: ZZ32)` exists at `.fss:575`, so on the compiled path `narrow(z)` for `z: ZZ32` now compiles and is a silent identity: `ZZ32` → coerce to `ZZ64` → `longOverflowingToInt` → `ZZ32`, which can never throw. Measured, `probes/skeptic/skeptic-SK3Tower.txt`: 43 on both paths, and `walk` agrees because its `ZZ32` inherits `ZZ64.narrow` through the tower (`Library/FortressLibrary.fsi:464`, `:532`). Before the rung this was `Variable narrow is not defined`. The value is right and both paths agree, so nothing needs repairing — but it is a loud failure that became a quiet answer, it is not in the report, no assertion or probe of the rung's own covers it, and the failure-mode question says the rung must establish, record and report exactly this. **Required correction 2.**

**A diagnosability loss inside the loud path, also unrecorded.** The report establishes that `walk`'s signed overflow is uncatchable; it does not establish what the compiled path's catchable exception says. It says nothing: `simpleIntArith.java:96` and `simpleUnsignedIntArith.java:27` both call `Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow")`, the one-argument form at `Utility.java:45-48`, which invokes the no-argument constructor, so the exception carries the class's own string "Integer overflow" and no value. `walk`'s uncatchable `ProgramError` names the value — "Overflow of ZZ32 2147483648" in my `SK4Bounds` capture. So on this path the failure is catchable but anonymous and on the other it is named but fatal, and neither gives both. That belongs in the record as a fact; it is recommended row S3 rather than a required correction, because it is a property of thirty-plus existing natives and not of this rung.

## The specification passage the report quotes against itself

This is the one substantive thing the rung read past, and it is in the passage its whole decision rests on.

`Specification/basic/operators/opr-overview.tex:205-208` reads: "Wraparound addition and subtraction on fixed-size integers are expressed by \EXP{\dotplus} and \EXP{\dotminus}. Saturating addition and subtraction on fixed-size integers are expressed by \EXP{\boxplus} and \EXP{\boxminus}." The same chapter says it again for multiplication at `:172-175`: wraparound is `\dottimes`, saturating is "\EXP{\boxdot} or \EXP{\boxtimes}".

The compiler prelude does the opposite, in every spelling and in all four traits. `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:276` maps `BOXPLUS` to `⊞`, which is ⊞ = `\boxplus`, and `:270` maps `DOTPLUS` to `∔`, which is ∔ = `\dotplus`. And `CompilerBuiltin.fss:670-679` and `:763-773` bind `BOXPLUS`, `BOXMINUS`, `BOXDOT` and `BOXCROSS` to the **Wrapping** natives and `DOTPLUS`, `DOTMINUS` and `DOTCROSS` to the **Saturating** ones. Measured on the compiled path, `probes/skeptic/skeptic-SK8Wrap.txt`: the `NN32` maximum ⊞ 1 is 0 and the `NN32` maximum ∔ 1 is 4294967295.

The report quotes `:205-209` as its support and counts `opr BOXPLUS` at `:764` and `opr DOTPLUS` at `:765` as "the pattern", in one paragraph, without noticing that the sentence it quotes assigns those two spellings the other way round. The inference the report draws from the passage — that wrapping and saturating have their own spellings, so the plainly spelled operation is the one that may overflow — is untouched by which spelling is which, so **the decision stands and the rung lands**. But the record as written invites the next reader to take `BOXPLUS` = wrapping as the specification's pairing, and that is the third time in this campaign a grep-level reading of a specification sentence has carried a wrong implication forward. One sentence must say it. **Required correction 4**, with the row in `recommendedRows`.

`basic-lib/basic-integers.tex:369` lists "The wrapping and saturating addition operators \EXP{\boxplus} and \EXP{\dotplus}" in the prelude's order, and `:362-363` are commented-out api lines `opr BOXPLUS` and `opr DOTPLUS` in the same order. That is the weaker witness on two counts: rule 3 and `Specification/library/structure.tex:25-31` make Part Library generated from the api code, and the sentence reads as a list of two operators rather than a pairing. `Specification/basic/` states the pairing explicitly and twice. Nothing in the ledger names this: I grepped rows for `BOXPLUS`, `DOTPLUS` and `saturat` and found only rows 317, 318, 330, 333, 334 and 335, none of which is about which spelling means which.

## The ladder subset, re-checked

The before run reproduces the baseline: `before/raw-ladder/tests/fib13.fss.compile.txt` is byte-identical to `baseline-2026-09-19/raw/tests/fib13.fss.compile` except for the worktree path. The five before error counts are 4, 44, 110, 10, 26 and the five after counts are 12, 2, 4, 1, 10, each read off the capture's own last line — the report's table is right. The phase classification is right too: `classify.py:82-86` makes `Variable X is not defined.` and `Operator X is not defined.` disambiguate and `:87-95` makes `Could not check …` typecheck, and `fib13`'s after capture is twelve `Could not check` errors, none of which names any of the four. `results.tsv`'s numeric columns are exit code and seconds, not phases, which is worth saying because they read like phase codes and do not agree with the table.

The report's claim that `fib13` shows the names doing their work is stronger than it says: at `:30-31` the argument type reaching `assert` is `(NN32, IntLiteral, String)` and at `:32-33` it is `(NN64, IntLiteral, String)`, so `unsigned(20)` resolved to `NN32` under `fib13[\NN32\]` and to `NN64` under `fib13[\NN64\]` from the type argument alone. My `SK2Ambig` and `SK2bNumberPrint` add what those captures cannot show, because the other four files never reach typecheck: `unsigned(1)` and `widen(124867)` resolve with no expected type at all, so `NumberPrintTest.fss:52-55` and `longPrim.fss:23-30` will typecheck when their own blockers are lifted.

## The required corrections

Five. Four are one-sentence edits to `REPORT.md`; the fifth is one `XXX` file with a `.test` beside it.

1. `REPORT.md` must say that `IntConversionsRungW.fss` was changed from `.asString` to `.asZZ.asString` in fifteen places after the pre-edit failure was captured, and that the 69 errors are name-resolution errors at disambiguate and so unaffected. The recorded failure is honest; the record must not leave a reader to discover the fifteen-line difference by diffing.
2. `REPORT.md` must record the rung's second loud-to-quiet transition with its value: `narrow(z)` for `z: ZZ32` was `Variable narrow is not defined` and is now a silent identity reached through `ZZ64.coerce(x: ZZ32)` (`.fss:575`), 43 on both paths, `probes/skeptic/skeptic-SK3Tower.txt`. The failure-mode question requires the rung to establish and record this and it does not.
3. The precedent section's sentence that `:86`, `:94` and `:101` are bound and "none is called anywhere in the file" must be marked as the pre-edit state, since `:86` is called by the rung's own `NN64.narrow` in the tree those line numbers belong to. The report already does this for `jIntToLong` one paragraph earlier.
4. `REPORT.md` must say, where it quotes `opr-overview.tex:205-209`, that the same sentence assigns ∔ to wraparound and ⊞ to saturation while `CompilerBuiltin.fss:764-765` binds `BOXPLUS` to the Wrapping native and `DOTPLUS` to the Saturating one, so the prelude's spellings are inverted relative to the chapter the report is citing — and that this does not disturb the plain-name inference the decision rests on. Recommended row S1 carries the defect itself.
5. The box/dot inversion needs **home 2**, not a ledger row alone, because the specification settles it and the rung defers it: a gated expected-failure test `ProjectFortress/compiler_tests/XXXBoxDotSpellingsRungW.fss` with a `.test` beside it, asserting what `opr-overview.tex:205-208` says — that the `NN32` maximum ⊞ 1 saturates to 4294967295 and ∔ 1 wraps to 0 — which fails today and turns the suite red the day anyone inverts the bindings without closing the row. All 224 `XXX*.test` files in the tree are in `compiler_tests/`, which is the corpus `compilerSuite` (`FileTests.java:865`, `:879`) drives through `suiteFromListOfFiles` where `shouldFail = s.startsWith("XXX")` lives (`:932`); `library_tests/` has eighteen `.test` files and no `XXX`, so the file belongs in `compiler_tests/`. This is rung W's first `XXX` file, so per the harness author's own warning at `FileTests.java:853` — "WARNING: expect_failure  is not treated consistently" (and `:851`, the suite's own phrase "XXX tests that succeed") — it must be shown to go red on a deliberate local fix, and the commit stage must say it was shown.

## What I am not asking for

The out-of-range decision. It is argued from the file's own convention, counted correctly, from `asZZ32`'s existing behaviour, from three reserved and unused natives and from a specification sentence that does say what the report says it says. Its cost — `UnsignedTest.fss:210-211` — is measured both ways, named, and carried as a row rather than hidden, and I checked that it is exactly two lines and not more. The alternative is a real alternative and the report says so. I would have decided the same way, and either way the record lets Pavol overrule it.

`NN64.signed: ZZ64`. `SK7Type` settles it: the compiled call typechecks with `ZZ64` and could not with `NN64`.

The absence of an `XXX` test. The harness citations are correct and the report says so rather than manufacturing a file.

The operational error the report records at the end. It is disclosed, the lesson is stated, and it is the batch prefix's to absorb.
