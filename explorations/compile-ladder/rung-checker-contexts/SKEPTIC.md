# Skeptic: climb batch 12, rung C (`rung-checker-contexts`)

Head judged: `7572db348`, the worker's. My commits: `e6deb7947` (the worker's REPORT.md and record.md, written from the run's journal), `eb02ed48c` (corrections), `b73143297` (a contested fix) and the commit of this file.

**Verdict: contested.** The rung's three repairs are right and its record honest, with the corrections below. One defect of the change, a crash where the base gave the refusal the text asks for, is fixed in `b73143297`, which is contested because it changes `AtomicChecker`, outside the label and exit case the section names.

The report's count and distance tables are those of the worker's head. No count or distance stage ran after my fix: the gate's tables on the merged tree are the record.

## 1. What I checked

**The tables (check 1).** The count is the batch-11 gate's: `diff explorations/compile-ladder/climb-batch-11/gate/checker-count.txt tmp/rung-checker-contexts/checker-count-postedit.txt` prints nothing (`#total 1`, `FortressLibrary 2`, `#crash none`). The distance:

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-11/gate/distance.txt tmp/rung-checker-contexts/distance-postedit.txt
    DISTANCE DOWN   207 -> 206 (-1)
        kind typecheck              156 -> 155    (-1)
        unit component String         1 -> 0      (-1)

By site, `diff <(tail -n +2 explorations/compile-ladder/gate/distance-sites.tsv | cut -f6,7 | sort) <(tail -n +2 tmp/rung-checker-contexts/dist-post/errors.tsv | cut -f6,7 | sort)` prints one line, `< String.fss:431	Function body has type Any, but declared return type is ().` The class moves come from `9d24290fb` ("Distance classes: classify.py finds its library places by declaration (row 577)"), which `git merge-base --is-ancestor 9d24290fb 7fa767d48` shows is in the base. The report's tables hold.

**Test first (check 2)**, in the worker's transcript (`agent-a8c9eab23fd2a6709.jsonl`):
- Call `gX8vkJ`, 11:26:46Z to 11:26:52Z, `junit.sh basefail` on the seeded base build with only the promoted tests: the four lines that `recordedFailure` quotes, and `Tests run: 10,  Failures: 10,  Errors: 0`.
- The first Scala edit is call `wBajjZ` at 11:28:33Z, the build call `n2NX6Q` at 11:29:12Z. The failing run ended first.
- Call `N6AbB2`, 11:32:32Z, `junit.sh fix1`: `OK (10 tests)`. The last code edit was at 11:28:59Z (`eMZHUB`).
- Call `sekSBw`, 11:35:00Z, `ant testQuick`; its log ends `Tests run: 1084, Failures: 0` (compiler), `86` (library), `263` (othercompiler), `BUILD SUCCESSFUL`, `Total time: 8 minutes 58 seconds`.

The order holds.

**The diff (check 3)** against the section, `label.tex` "Label and Exit", `chained-multifix.tex` "Chained and Multifix Operators", `method-invocation.tex` "Dotted Method Invocations" and POSITIONS, "A `label` body takes the expected type of the whole `label` (item 48, row 642).":
- `SAmbiguousMultifixOpExpr` (`impls/Operators.scala:379-393`) decides the multifix reading without the expected type and then gives the type to the multifix application or to the outer binary one. This is the loose juxtaposition's form (`:170-197`) and keeps `chained-multifix.tex:45-46`, "If so, that definition is used".
- The label (`impls/Misc.scala:702-722`) checks its body with its expected type, which `checkExpr(e, expected)` passes without forcing (`STypeChecker.scala:418`, against the forcing overloading at `:475-496`). Each exit takes the label's expected type, not that of its own position (`:733-739`). A nested exit to an outer label takes the outer label's type (program 4 below).
- `staticArgsMatchStaticParamsForApp` (`useful/STypesUtil.scala:771-800`) substitutes every written argument into each `extends` and `dominates` bound. This is `TypeWellFormedChecker.scala:157-162`'s form.

Each edit does what the report says, at the scope the section gives, apart from the one defect in section 2.

**Precedents (check 4).** Each one is the right one. `LabelExitTypes` (`impls/Misc.scala:991-996`) is a subclass of the set the checkers already share per label. The report lists the alternatives it did not take, and the library has no other device for this.

**Messages and names (check 5).** Every citation names a file and a section. One message claimed more than its program shows: correction 2.2.

**Competing declarations (check 10).** `grep -rn LabelExitTypes ProjectFortress/src/` finds only `impls/Misc.scala`. No file in `ProjectFortress/` or `Library/` declares `InferRepeatedOperatorContext`, `MethodStaticArgsBoundNamesOther`, `MethodStaticArgsBoundNamesOtherSameName`, `InferResultOnlyLabelBody`, `XXXInferTightJuxtContext` or `XXXSpawnInAtomicExitValue` but their own files.

**The report (check 9).**
- Every provenance line's citations open at the lines named.
- The second `deviation:` line was false: correction 2.3.
- The three sentences of `changes.tex` that the report lists as made false are the ones, and all three are amended.
- `grep -rn 'row~642\|row~644\|row~651' Specification/` at the base finds only `changes.tex:2044` and `:2051`.
- The LaTeX builds after my edit: `./ant genSource` and `./ant tex` both end `BUILD SUCCESSFUL`, and `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply\|^! Undefined control sequence" Specification/fortress/fortress.log` prints 0.
- record.md's FACTS line numbers open at what they name. I moved `:994` to `:996` after my fix shifted `LabelExitTypes`.

**Failure modes (check 11).**
- Row 651's crash, 'R is not in the kind env', becomes a value only where the bound holds. Where it does not, the call is refused, 'No such method O.gen.', as for any inapplicable method; that refusal is not a quiet value.
- Rows 642 and 644 turn refusals into the instances that the text gives.
- My fix turns a crash into a refusal.

## 2. Findings, each with its fix

### 2.1 A spawn as an exit's `with` value inside an atomic block crashes the checker (defect; contested fix `b73143297`)

`AtomicChecker` (`impls/Misc.scala:960-989`) refused a `spawn` only by overriding `checkExpr(e)`, the overloading without an expected type. The rung checks an exit's `with` value through `checkExpr(e, expected)` (`:739`), which the override never saw. So the refusal the base gave there turned into a crash. Program: `f(): Any = atomic do label l exit l with spawn 3 end l end`.

    bin/fortress typecheck SkAtomicSpawnExit.fss                       # the worker's head
    Exception in thread "main" java.lang.RuntimeException: Not in the trait table: CompilerBuiltin.Thread
    old-fortress.sh /home/user/fortress-base12 <tree>/tmp/old-caches typecheck SkAtomicSpawnExit.fss   # the base
    SkAtomicSpawnExit.fss:7:19-25:
        A 'spawn' expression must not occur inside an 'atomic' do block.

`spawn.tex`, section "Spawn Expressions": "A \KWD{spawn} expression cannot be run within the body of an \KWD{atomic} expression". The team's `XXX1am`, `XXX1ap` and `XXX9i` refuse it statically.

The ways:
1. `AtomicChecker` overrides `checkExpr(e, expected)`, the overloading every check goes through, the one without an expected type included.
2. The exit case checks a `with` value that is a `spawn` through `checkExpr(e)`, and anything else with the label's type. This is a device that restores the base at the exit alone.
3. The exit's value loses the label's type. This undoes Q48(a)'s exits.

I took way 1, where the defect's cause is.

The test, `compiler_tests/XXXSpawnInAtomicExitValue` (compile, `compile_err_contains=A 'spawn' expression must not occur inside an 'atomic' do block.`). Before the fix, on the worker's head:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh workerhead ProjectFortress/compiler_tests InferRepeatedOperatorContext.test XXXInferTightJuxtContext.test XXXSpawnInAtomicExitValue.test
    . compile ProjectFortress/compiler_tests/XXXSpawnInAtomicExitValue
     Did not satisfy compile_err_contains; expected
    A 'spawn' expression must not occur inside an 'atomic' do block.
    java.lang.RuntimeException: Not in the trait table: CompilerBuiltin.Thread

After the fix, built with `ant compileAll` ('Caches ... started again, empty'), then the library order (`EXIT=0`, five jars):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skfix ProjectFortress/compiler_tests InferRepeatedOperatorContext.test XXXInferTightJuxtContext.test XXXSpawnInAtomicExitValue.test XXX1am.test XXX1ap.test XXX9i.test InferResultOnlyLabelBody.test MethodStaticArgsBoundNamesOther.test MethodStaticArgsBoundNamesOtherSameName.test
    . compile ProjectFortress/compiler_tests/XXXSpawnInAtomicExitValue ...XXXSpawnInAtomicExitValue.fss:7:21-27:
        A 'spawn' expression must not occur inside an 'atomic' do block.
     Saw expected failure
    OK (15 tests)

The whole suite after the fix, the only one my fix needed, on the code of `b73143297`:

    ant testQuick        # 13:16:38Z
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0
    [junit] Tests run: 1086, Failures: 0, Errors: 0, Skipped: 0
    BUILD SUCCESSFUL

1086 is the worker's 1084 plus my two compile cases. 'Saw expected failure' appears 373 times against the worker's 371. `XXXInferContextDrops`, `XXXLooseJuxtMultifixExpectedType`, `Compiled1.am`, `Compiled1.ap` and `Compiled9.i` still report it.

Way 1 reaches further than the exit. A `spawn` that ends an atomic block, `g(): Any = atomic do spawn 3 end`, crashed the same way on both codes ('Not in the trait table: CompilerBuiltin.Thread'). Now it is refused at `6:5-11`. A function expression made in an atomic block, `k(): Any = atomic do g = fn (): Any => spawn 3; g end`, crashed on both codes. Now it is refused at `6:23-29`. That last program is one the text may allow, since its `spawn` is not run within the atomic body: a point to report (section 4).

### 2.2 The repeated-operator test asserted the inner application's throw, not the outer's instance (correction `eb02ed48c`)

`InferRepeatedOperatorContext`'s `binary()` asserted that `1 OPLUS 2 OPLUS 3` threw. But the inner `1 OPLUS 2` throws before the outer application runs, so the value did not depend on the instance, and the message's "whose outer application is instantiated at ZZ64 and throws" said more than the program shows. The test now has a fieldless `BoxV[\T\]()` and `tag` overloads on `BoxV[\ZZ64\]` and `BoxV[\String\]`. It asserts by dispatch that the binary shape is `BoxV[\ZZ64\]` and the multifix shape `BoxV[\String\]`.

On the base:

    old-fortress.sh /home/user/fortress-base12 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/InferRepeatedOperatorContext.test ...
    ...InferRepeatedOperatorContext.fss:12:31-23:
        Right-hand side has type BoxV[\Object\], but declared type is BoxV[\ZZ64\].
    ...InferRepeatedOperatorContext.fss:14:34-25:
        Right-hand side has type BoxV[\Object\], but declared type is BoxV[\String\].
    Tests run: 5,  Failures: 3,  Errors: 0

On the worker's head (`junit.sh workerhead`, above): `. run ProjectFortress/compiler_tests/InferRepeatedOperatorContext (824ms) PASS`.

### 2.3 REPORT.md's second deviation line was false (correction `eb02ed48c`)

It said that the label's type is a join where `label.tex:66-70` says union. `TypeAnalyzer.join` is `normalize(makeUnionType(x))` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:81`), so the label's type is that union. The line now says so. Its `changes.tex` citations follow the entry's new length.

### 2.4 A tight juxtaposition of non-function items gets no expected type (correction `eb02ed48c`: home 2, row NEW-C-1, Appendix I)

The report counted this sibling of row 644 (`impls/Operators.scala:362-374`) and did not measure it. Program: `opr juxtaposition[\T\](a: Any, b: K): BoxV[\T\] = BoxV[\T\]()`, with `y: BoxV[\ZZ64\]` given `a b`, `a(b)`, `a b c` and `a(b)(c)`:

    bin/fortress compile SkTightJuxt.fss                                    # head; the base prints the same
    SkTightJuxt.fss:19:23-25:
        Right-hand side has type BoxV[\Object\], but declared type is BoxV[\ZZ64\].
    SkTightJuxt.fss:23:25-30:
        Right-hand side has type BoxV[\Object\], but declared type is BoxV[\String\].

The loose shapes, at lines 11 and 15, check. `juxtameaning.tex`, "Juxtaposition", makes a juxtaposition whose left item is not a function an application of the juxtaposition operator. The sentence after the chapter's list gives an operator application the expected type. So the text settles it, and its home is 2: `compiler_tests/XXXInferTightJuxtContext`.

- As it is, on the head: 'Saw expected failure'.
- Written loosely for one run (`a a`), then restored: red, 'Saw wrong failure. compile'.
- On the base: 'Saw expected failure'.

Row NEW-C-1 is in record.md (`ledger.py check --rows`: 0 rows fail the template). Appendix I's entry "The contexts that give a call an expected type" names the departure in its Effect (`Specification/appendices/changes.tex:2076-2080`).

### 2.5 Row 470 and the function path (correction `eb02ed48c`, record)

The method path checks a written static argument against its bound, now with the other arguments put in. The function path checks no bound at all, the defect of row 470:

    bin/fortress compile SkBoundTopPlain.fss && bin/fortress run SkBoundTopPlain    # f[\Cell[\ZZ32\]\](...) for f[\Q extends Cell[\String\]\]; both codes
    1
    bin/fortress compile SkBoundMethPlain.fss                                       # O.m[\Cell[\ZZ32\]\](...) for m[\Q extends Cell[\String\]\]; both codes
        No such method O.m.

The same holds for `gen[\String, Cell[\ZZ32\]\](...)` against `gen[\R, Q extends Cell[\R\]\]`: 1 on both codes and under walk. Row 470's note in record.md says which path checks.

### 2.6 A non-last block element takes `()`, which the chapter's list does not name (question for the curator)

The checker gives every non-last element of a block the expected type `()` (`impls/Misc.scala:433-434`), as `blocks.tex:49-50` requires of its type. On the base, `do stop("s"); 3 end` already checks, with `stop[\T extends Any\](s: String): T`.

The rung's label inherits this. A label in a non-last position, whose exit's value is `stop("s")`, was refused on the base, 'Non-last expression in a block has type Any, but it must have () type.', and checks on the head. Walk prints 3 for both.

The inference chapter's list does not name the context (`Specification/basic/inference.tex:128-148`), and its item calls every other context "not yet described" (`:277-278`). So the text is silent, not contrary. This is not a point to report. It goes to the curator in the result.

## 3. Programs run, old against new

The commands, from `<tree>/tmp/rung-checker-contexts/skeptic/`, each with the setup lines and `FORTRESS_THREADS=1`:
- The new code: `/home/user/fortress-checkctx/bin/fortress compile P.fss && .../bin/fortress run P`, `.../bin/fortress typecheck P.fss` and `.../bin/fortress P.fss`.
- The old code: `/home/user/fortress-base12/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base12 /home/user/fortress-checkctx/tmp/old-caches` followed by the same subcommands.

The diff adds no Fortress mutable state, field or atomic write, so no four-thread run of these programs was needed. The harness runs are at four threads. Walk is not edited, and walk printed the same on both codes for every program. The programs:
1. **`a + a + a` at `ZZ64`, `a: ZZ32 = 1000000000`.** Also written `(a + a) + a`, and `a + a` with `a = 2000000000`. All four runs print `repeated overflow`, `paren overflow` and `binary overflow`. The expected type does not change which `+` runs.
2. **`OPLUS(ZZ32, ZZ32): ZZ32` beside `OPLUS(ZZ64, ZZ64): ZZ64 = a + b + 100`**, with `n: ZZ64 = a OPLUS a OPLUS a`. Both compiled codes print 3, 3 and 2; walk prints the same.
3. **A result-only generic `OPLUS` at three and four operands, observed by dispatch.** The new code prints `y ZZ64` and `z String`. The old code refuses: 'Right-hand side has type BoxV[\Object\], but declared type is BoxV[\ZZ64\].' Walk on both codes: 'RHS expression type BoxV[\Any\] is not assignable to LHS type BoxV[\ZZ64\]', row 510's walk departure.
4. **Labels.** The shapes:
   - an exit to an outer `ZZ32` label from inside an inner `String` label;
   - a numeral body at `ZZ64`;
   - an exit with no `with` value at `()`;
   - an exit with a numeral at `ZZ64`.

   The new code passes the typecheck. The old code refuses the first: 'Function body has type Any, but declared return type is ZZ32.' Walk prints 1, 5, 7, 8 and `done` on both. The outer exit takes the outer label's type, not the inner's.
5. **A label in a non-last position, and a label as an argument of an overloaded call.** Section 2.6.
6. **Written static arguments.**
   - `O.self1[\Num\]` with `T extends Ord[\T\]`, `O.later[\Cell[\String\], String\]` with the bounding parameter second, and `h.recv[\Cell[\String\]\]` whose bound names the receiver's parameter. The new code prints 1, 2 and 3. The old code stops at `later`: 'R is not in the kind env [][][]'. Walk prints 1, 2 and 3.
   - The top-level functions: section 2.5.
7. **The tight juxtaposition.** Section 2.4.
8. **`spawn` in atomic bodies.** Section 2.1. A `spawn` as an argument, `id(spawn 3)`, is refused on both codes, before and after the fix.

## 4. Points to report

**A program the text may allow that the checker now refuses, outside rows 642, 644 and 651.** It comes from my contested fix, not from the worker's change. `k(): Any = atomic do g = fn (): Any => spawn 3; g end` crashed on the base and on the worker's head ('Not in the trait table: CompilerBuiltin.Thread'). After `b73143297` it is refused at `6:23-29`, "A 'spawn' expression must not occur inside an 'atomic' do block." `spawn.tex` forbids running a `spawn` within an atomic body, and this one is only made there. The point is reversible, and it holds nothing.

The worker's change reaches none of the rung's points. Programs 1 and 2 show that the declaration an operator application chooses does not change. `XXXInferContextDrops` keeps 'Saw expected failure'. No compiled verdict changed but by the rung's intent: the worker's `testQuick`, and mine.

## 5. Where I differ from the report

- Sections 4 and 9 leave the tight juxtaposition counted and not measured. It is measured above and recorded (2.4).
- Section 11 finds no point to report. That holds for the worker's change; my contested fix reaches one (section 4).
- Section 6's probes did not try a `spawn` inside an atomic body, where the change to the exit regressed (2.1).
- The worker's decisions stand as the report gives them.

## 6. The contested fix

`b73143297`, "Skeptic's fix: an atomic body's checker refuses a spawn whether or not an expected type comes with it".

**The worker's side.** The worker made a label's exits take the label's type by checking each `with` value through `checkExpr(returnExpr, labelExpected)` (REPORT.md section 10, "An exit's `with` value takes the label's expected type, not the exit's own"). It did not argue for the `spawn` behaviour that this changes. The section gives the rung `impls/Misc.scala` for "the label at :706 and the exit case near it", not `AtomicChecker`.

**My side.**
- The fix restores at the exit the refusal the base gave and the team's tests assert (`spawn.tex`, "Spawn Expressions"). It does so where the cause is: an override of one overloading of two.
- It also refuses two shapes that crashed on both codes: a `spawn` ending an atomic block, and a `spawn` in a function expression made in one. The second may be one the text allows (section 4).
- Way 2 would keep the change to the exit alone, as a special case of `spawn` in the exit's code.
- A reversal of `b73143297` brings back the crash at an exit's `spawn` and removes `XXXSpawnInAtomicExitValue` and the record lines that name it.
